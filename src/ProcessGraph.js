const { fabric } = window;

export default class ProcessGraph {
  /**
   *
   * @param options
   *
   * @param {Canvas} options.canvas - FabricJS.Canvas instance - mandatory if options.canvasOpts not provided.
   *
   * @param {Object} options.canvasOpts - FabricJS.Canvas#initialize parameters - mandatory if options.canvas not provided
   *                 See http://fabricjs.com/docs/fabric.Canvas.html#initialize for details
   * @param {HTMLElement|String} options.canvas.el - <canvas> element to initialize instance on
   * @param {Object} options.canvas.options - Options object
   *
   * @param {Number} [options.grid] - dimensions of the grid
   */
  constructor(options) {
    this.handlers = {
      grid: {},
    };

    // Initialize Canvas
    const canvas = this.canvas = options.canvas ? options.canvas : new fabric.Canvas(options.canvasOpts.el, options.canvasOpts.options);
    canvas.set('preserveObjectStacking', true);

    if (typeof options.grid === 'number') {
      this.setGrid({
        grid: options.grid,
      });
    }

    // fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
    fabric.Object.prototype.toggleOpacity = function (opacity, timeout) {
      this.animate('opacity', opacity, {
        duration: timeout !== undefined ? timeout : 300,
        onChange: this.canvas.renderAll.bind(this.canvas),
      });
    };

    canvas.calcOffset();
    const onSelection = () => {
      const active = canvas.getActiveObject();
      // When multi selection, remove any non Rectangle objects
      if (active.type === 'activeSelection') {
        const objects = active.getObjects();
        if (objects.length > 1) {
          const onlyRect = objects.filter((o) => o.type === 'linkableShape');
          canvas._discardActiveObject();
          const sel = new fabric.ActiveSelection(onlyRect, {
            canvas,
          });
          canvas._setActiveObject(sel);
        }
      }
    };
    canvas.on({
      'selection:created': onSelection,
      'selection:updated': onSelection,
      // 'selection:cleared': onSelectionCleared
    });
  }

  /**
   * Set canvas to have a grid.
   * @param {Object} options
   * @param {Number} options.grid - grid spacing (pixels)
   */
  setGrid(options) {
    if (typeof options.grid !== 'number' || options.grid < 0) {
      throw new Error('Invalid argument "grid" in ProcessGrap#setGrid. (required: Number > 0)');
    }

    this.grid = options.grid;
    const { canvas } = this;
    /* eslint-disable no-multi-str */
    const data = `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"> \
        <defs> \
            <pattern id="smallGrid" width="${this.grid}" height="${this.grid}" patternUnits="userSpaceOnUse"> \
                <path d="M ${this.grid} 0 L 0 0 0 ${this.grid}" fill="none" stroke="gray" stroke-width="0.5" /> \
            </pattern> \
            <pattern id="grid" width="${this.grid * 5}" height="${this.grid * 5}" patternUnits="userSpaceOnUse"> \
                <rect width="${this.grid * 5}" height="${this.grid * 5}" fill="url(#smallGrid)" /> \
                <path d="M ${this.grid * 5} 0 L 0 0 0 ${this.grid * 5}" fill="none" stroke="gray" stroke-width="1" /> \
            </pattern> \
        </defs> \
        <rect width="100%" height="100%" fill="url(#grid)" /> \
    </svg>`;
    /* eslint-enable no-multi-str */

    const DOMURL = window.URL || window.webkitURL || window;
    const svg = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
    const url = DOMURL.createObjectURL(svg);
    fabric.util.loadImage(url, (img) => {
      const bg = new fabric.Rect({
        width: canvas.width, height: canvas.height, evented: false, selectable: false,
      });
      bg.fill = new fabric.Pattern({ source: img },
        (() => { bg.dirty = true; canvas.requestRenderAll(); }));
      bg.canvas = canvas;
      canvas.set('backgroundImage', bg);

      // Snap to grid effects
      canvas.off(this.handlers.grid);
      this.handlers.grid = {
        'object:moving': (event) => {
          const { grid } = this;
          const { target } = event;
          if (target.type !== 'linkableShape') {
            return;
          }
          event.target.set({
            left: Math.round(event.target.left / grid) * grid,
            top: Math.round(event.target.top / grid) * grid,
          });
        },
        'object:scaling': (event) => {
          const { grid } = this;
          const { target } = event;

          if (target.type !== 'linkableShape') {
            return;
          }

          const w = target.width * target.scaleX;
          const h = target.height * target.scaleY;
          const snap = { // Closest snapping points
            top: Math.round(target.top / grid) * grid,
            left: Math.round(target.left / grid) * grid,
            bottom: Math.round((target.top + h) / grid) * grid,
            right: Math.round((target.left + w) / grid) * grid,
          };
          const threshold = grid;
          const dist = { // Distance from snapping points
            top: Math.abs(snap.top - target.top),
            left: Math.abs(snap.left - target.left),
            bottom: Math.abs(snap.bottom - target.top - h),
            right: Math.abs(snap.right - target.left - w),
          };
          const attrs = {
            scaleX: target.scaleX,
            scaleY: target.scaleY,
            top: target.top,
            left: target.left,
          };
          switch (target.__corner) {
            case 'tl':
              if (dist.left < dist.top && dist.left < threshold) {
                attrs.scaleX = (w - (snap.left - target.left)) / target.width;
                attrs.scaleY = (attrs.scaleX / target.scaleX) * target.scaleY;
                attrs.top = target.top + (h - target.height * attrs.scaleY);
                attrs.left = snap.left;
              } else if (dist.top < threshold) {
                attrs.scaleY = (h - (snap.top - target.top)) / target.height;
                attrs.scaleX = (attrs.scaleY / target.scaleY) * target.scaleX;
                attrs.left += (w - target.width * attrs.scaleX);
                attrs.top = snap.top;
              }
              break;
            case 'mt':
              if (dist.top < threshold) {
                attrs.scaleY = (h - (snap.top - target.top)) / target.height;
                attrs.top = snap.top;
              }
              break;
            case 'tr':
              if (dist.right < dist.top && dist.right < threshold) {
                attrs.scaleX = (snap.right - target.left) / target.width;
                attrs.scaleY = (attrs.scaleX / target.scaleX) * target.scaleY;
                attrs.top = target.top + (h - target.height * attrs.scaleY);
              } else if (dist.top < threshold) {
                attrs.scaleY = (h - (snap.top - target.top)) / target.height;
                attrs.scaleX = (attrs.scaleY / target.scaleY) * target.scaleX;
                attrs.top = snap.top;
              }
              break;
            case 'ml':
              if (dist.left < threshold) {
                attrs.scaleX = (w - (snap.left - target.left)) / target.width;
                attrs.left = snap.left;
              }
              break;
            case 'mr':
              if (dist.right < threshold) attrs.scaleX = (snap.right - target.left) / target.width;
              break;
            case 'bl':
              if (dist.left < dist.bottom && dist.left < threshold) {
                attrs.scaleX = (w - (snap.left - target.left)) / target.width;
                attrs.scaleY = (attrs.scaleX / target.scaleX) * target.scaleY;
                attrs.left = snap.left;
              } else if (dist.bottom < threshold) {
                attrs.scaleY = (snap.bottom - target.top) / target.height;
                attrs.scaleX = (attrs.scaleY / target.scaleY) * target.scaleX;
                attrs.left += (w - target.width * attrs.scaleX);
              }
              break;
            case 'mb':
              if (dist.bottom < threshold) attrs.scaleY = (snap.bottom - target.top) / target.height;
              break;
            case 'br':
            default:
              if (dist.right < dist.bottom && dist.right < threshold) {
                attrs.scaleX = (snap.right - target.left) / target.width;
                attrs.scaleY = (attrs.scaleX / target.scaleX) * target.scaleY;
              } else if (dist.bottom < threshold) {
                attrs.scaleY = (snap.bottom - target.top) / target.height;
                attrs.scaleX = (attrs.scaleY / target.scaleY) * target.scaleX;
              }
              break;
          }
          target.set(attrs);
        },
      };
      if (this.grid > 0) {
        canvas.on(this.handlers.grid);
      }
    });
  }
}