import LinkableShape from '../src/LinkableShape.js';

const { fabric } = window;

// Utilities to create complex shapes
function createTextBox(label) {
  const rect = new fabric.Rect({
    left: 0,
    top: 0,
    originX: 'left',
    originY: 'top',
    strokeWidth: 1,
    stroke: '#000',
    fill: '#fff',
    rx: 10,
    ry: 10,
    width: 250,
    height: 150,
  });
  const text = new fabric.IText(label, {
    left: rect.width / 2,
    top: rect.height / 2,
    fontSize: 14,
    fontFamily: 'Helvetica',
    textAlign: 'center',
    originX: 'center',
    originY: 'center',
  });
  const group = new fabric.Group([rect, text], {
    left: 0,
    top: 0,
    originX: 'center',
    originY: 'center',
  });
  return group;
}

// Start app
const setGrid = function (dim, canvas) {
  /* eslint-disable no-multi-str */
  const data = `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"> \
        <defs> \
            <pattern id="smallGrid" width="${dim}" height="${dim}" patternUnits="userSpaceOnUse"> \
                <path d="M ${dim} 0 L 0 0 0 ${dim}" fill="none" stroke="gray" stroke-width="0.5" /> \
            </pattern> \
            <pattern id="grid" width="${dim * 5}" height="${dim * 5}" patternUnits="userSpaceOnUse"> \
                <rect width="${dim * 5}" height="${dim * 5}" fill="url(#smallGrid)" /> \
                <path d="M ${dim * 5} 0 L 0 0 0 ${dim * 5}" fill="none" stroke="gray" stroke-width="1" /> \
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
  });
};

const main = function main() {
  // Initialize Canvas
  const canvasOpts = {
    width: 1400,
    height: 600,
    preserveObjectStacking: true,
  };
  const canvas = new fabric.Canvas('pg-canvas', canvasOpts);
  const grid = 10;
  setGrid(grid, canvas);

  // fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
  fabric.Object.prototype.toggleOpacity = function (opacity, timeout) {
    this.animate('opacity', opacity, {
      duration: timeout !== undefined ? timeout : 300,
      onChange: this.canvas.renderAll.bind(canvas),
    });
  };
  canvas.calcOffset();
  const onSelection = () => {
    const active = canvas.getActiveObject();
    console.log(active.type);
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
    'object:moving': (options) => {
      // Snap to Grid
      const { target } = options;
      if (target.type !== 'linkableShape') {
        return;
      }
      options.target.set({
        left: Math.round(options.target.left / grid) * grid,
        top: Math.round(options.target.top / grid) * grid,
      });
    },
    'object:scaling': (options) => {
      // Snap to Grid
      const { target } = options;

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
    // 'selection:cleared': onSelectionCleared
  });

  // Create objects
  new LinkableShape({
    id: 'r1',
    canvas,
    left: 200,
    top: 50,
    angle: 0,
    shape: createTextBox('Set CPU to MB socket'),
  }).inject();
  new LinkableShape({
    id: 'r2',
    canvas,
    left: 700,
    top: 50,
    angle: 0,
    shape: createTextBox('Screw MB to Case'),
  }).inject();
  new LinkableShape({
    id: 'r3',
    canvas,
    left: 1200,
    top: 200,
    angle: 45,
    shape: createTextBox('Insert RAM'),
  }).inject();
  new LinkableShape({
    id: 'r4',
    canvas,
    left: 900,
    top: 300,
    angle: 90,
    shape: createTextBox('Insert M.2 SSD'),
  }).inject();
  new LinkableShape({
    id: 'r5',
    canvas,
    left: 600,
    top: 300,
    angle: 90,
    shape: createTextBox('Apply thermal paste to CPU'),
  }).inject();
  new LinkableShape({
    id: 'r6',
    canvas,
    left: 300,
    top: 300,
    angle: 90,
    shape: createTextBox('Screw CPU cooler'),
  }).inject();
};
window.addEventListener('load', main);
