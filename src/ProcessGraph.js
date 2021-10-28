import ExpandableContainer from './ExpandableContainer.js';
import CurvedLink from './CurvedLink.js';

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
    // canvas.set('renderOnAddRemove', false);
    canvas.set('fireRightClick', true);
    canvas.set('fireMiddleClick', true);
    canvas.set('stopContextMenu', true);
    canvas.linkableShapes = {};
    canvas.links = {};

    // Set grid
    if (typeof options.grid === 'number') {
      this.setGrid({
        grid: options.grid,
      });
    }

    // fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
    fabric.Object.prototype.toggleOpacity = function toggleOpacity(opacity/* , timeout */) {
      // this.animate('opacity', opacity, {
      //   duration: timeout !== undefined ? timeout : 300,
      //   onChange: this.canvas.renderAll.bind(this.canvas),
      // });
      this.set('opacity', opacity);
      this.canvas.renderAll();
    };

    canvas.calcOffset();

    // Prevent non LinkableShape objects to be grouped during selection
    const onSelection = () => {
      const active = canvas.getActiveObject();
      // When multi selection, remove any non Linkable Shape objects
      if (active.type === 'activeSelection') {
        const objects = active.getObjects();
        if (objects.length > 1) {
          const onlyRect = objects.filter((o) => o.type === 'linkableShape');
          canvas._discardActiveObject();
          const sel = new fabric.ActiveSelection(onlyRect, {
            canvas,
          });
          canvas._setActiveObject(sel);

          // Update any links connected to the Linkable Shape
        }
      }
    };

    canvas.on({
      'selection:created': onSelection,
      'selection:updated': onSelection,
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
          const shape = event.target;
          if (shape.type !== 'linkableShape') {
            return;
          }

          canvas.linkableShapes[shape.id].move({
            x: Math.round(shape.left / grid) * grid,
            y: Math.round(shape.top / grid) * grid,
            moving: true,
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
          target.setCoords();
        },
      };
      if (this.grid > 0) {
        canvas.on(this.handlers.grid);
      }
    });
  }

  async addContainer(options) {
    const containerOpts = {
      id: options.id,
      canvas: this.canvas,
      left: options.left || 0,
      top: options.top || 0,
      angle: 0,
      label: options.label,
      img: {
        src: options.img.src,
      },
      childWidth: 72,
      childHeight: 42,
      children: Array.isArray(options.children) ? options.children : [],
    };
    const container = new ExpandableContainer(containerOpts);
    // eslint-disable-next-line no-await-in-loop
    await container.load();
    container.collapse();
    container.inject();
    if (options.isTemporary) {
      container.shape.set('opacity', 0.5);
    }
    if (options.x && options.y) {
      container.move({
        x: options.x,
        y: options.y,
        moving: false,
      });
    }
    this.containers[options.id] = container;
    return container;
  }

  removeContainer(options) {
    if (options.id in this.containers) {
      this.containers[options.id].remove();
    }
  }

  async addLink(options) {
    const { canvas } = this;
    const linkOpts = {
      id: options.id,
      canvas,
      start: {
        x: (options.x || 0) - 50,
        y: options.y || 0,
      },
      end: {
        x: (options.x || 0) + 50,
        y: options.y || 0,
      },
    };
    const link = new CurvedLink(linkOpts);
    link.inject(canvas);

    if (!options.isTemporary) {
      link.arrowHead.fire('moved');
      link.arrowTail.fire('moved');
    }
    this.links[options.id] = link;

    return link;
  }

  removeLink(options) {
    if (options.id in this.links) {
      this.links[options.id].remove();
    }
  }

  expand(id) {
    if (id in this.containers) {
      this.containers[id].expand();
    }
  }

  collapse(id) {
    if (id in this.containers) {
      this.containers[id].collapse();
    }
  }

  setSelectedChooserType(type) {
    this.selectedChooserType = type;
  }

  async onDragEnter(event) {
    // The immersiveFrame in which this PG is injected is messing up the mouse x,y coordinates.
    const canvasAbsolutePosition = this.canvasElement.getBoundingClientRect();
    const x = event.e.x - canvasAbsolutePosition.left;
    const y = event.e.y - canvasAbsolutePosition.top;

    const type = this.selectedChooserType.id;
    switch (type) {
      case 'ProductFlow':
        this.tempDraggedObject = await this.addLink({
          id: `${Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}`,
          x,
          y,
        });
        break;
      case 'GeneralSystem':
      default: {
        this.tempDraggedObject = await this.addContainer({
          id: `${Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}`,
          label: this.selectedChooserType.label,
          img: {
            src: this.selectedChooserType.icon,
          },
          x: 0,
          y: 0,
          isTemporary: true,
        });
        break;
      }
    }
    event.e.preventDefault();
  }

  async onDragOver(event) {
    // The immersiveFrame in which this PG is injected is messing up the mouse x,y coordinates.
    const canvasAbsolutePosition = this.canvasElement.getBoundingClientRect();
    let x = event.e.x - canvasAbsolutePosition.left;
    let y = event.e.y - canvasAbsolutePosition.top;

    if (this.tempDraggedObject !== null) {
      const type = this.selectedChooserType.id;
      switch (type) {
        case 'ProductFlow':
          this.tempDraggedObject.updatePath({
            start: {
              x: x - 50,
              y,
            },
            end: {
              x: x + 50,
              y,
            },
            commit: false,
          });
          this.tempDraggedObject.arrowHead.fire('moving');
          this.tempDraggedObject.arrowTail.fire('moving');
          break;
        case 'GeneralSystem':
        default: {
          if (this.tempDraggedObject.isLoaded) {
            x -= (this.tempDraggedObject.shape.width / 2);
            y -= (this.tempDraggedObject.shape.height / 2);

            // Grid effects
            if (this.pg.grid) {
              const { grid } = this.pg;
              x = Math.round(x / grid) * grid;
              y = Math.round(y / grid) * grid;
            }

            // Move object
            this.tempDraggedObject.move({
              x,
              y,
              moving: true,
              skipCollision: true,
            });

            // Detect intersection with Links

            // Detect intersection with Containers
            const ids = Object.keys(this.containers);
            for (let c = 0; c < ids.length; c += 1) {
              const container = this.containers[ids[c]];
              if (container.id !== this.tempDraggedObject.id) {
                const cX = this.tempDraggedObject.shape.left + this.tempDraggedObject.shape.width / 2;
                const cY = this.tempDraggedObject.shape.top;
                if (container.shape.intersectsWithRect(
                  new fabric.Point(cX - 5, cY),
                  new fabric.Point(cX + 5, cY + 10),
                )) {
                  container.setActive(true);
                } else {
                  container.setActive(false);
                }
              }
            }
          }
          break;
        }
      }
    }
    event.e.preventDefault();
  }

  async onDragLeave(event) {
    if (this.tempDraggedObject !== null) {
      const type = this.selectedChooserType.id;
      switch (type) {
        case 'ProductFlow':
          this.removeLink({
            id: this.tempDraggedObject.id,
          });
          this.tempDraggedObject = null;
          break;
        case 'GeneralSystem':
        default: {
          if (this.tempDraggedObject.isLoaded) {
            this.removeContainer({
              id: this.tempDraggedObject.id,
            });
            this.tempDraggedObject = null;
          }
          break;
        }
      }
    }
    event.e.preventDefault();
  }

  async onDrop(event) {
    // The immersiveFrame in which this PG is injected is messing up the mouse x,y coordinates.
    const canvasAbsolutePosition = this.canvasElement.getBoundingClientRect();
    let x = event.e.x - canvasAbsolutePosition.left;
    let y = event.e.y - canvasAbsolutePosition.top;

    const type = this.selectedChooserType.id;
    switch (type) {
      case 'ProductFlow':
        // Remove ghost object
        if (this.tempDraggedObject !== null) {
          this.removeLink({
            id: this.tempDraggedObject.id,
          });
          this.tempDraggedObject = null;
        }

        // Instantiate new object
        await this.addLink({
          id: `${Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}`,
          x,
          y,
          isTemporary: false,
        });

        break;
      case 'GeneralSystem':
      default: {
        // Detect intersection with Containers
        const ids = Object.keys(this.containers);
        for (let c = 0; c < ids.length; c += 1) {
          const container = this.containers[ids[c]];
          if (container.id !== this.tempDraggedObject.id) {
            container.setActive(false);

            if (container.shape.intersectsWithObject(this.tempDraggedObject.shape)) {

            }
          }
        }

        // Remove ghost object
        if (this.tempDraggedObject !== null) {
          this.removeContainer({
            id: this.tempDraggedObject.id,
          });
          this.tempDraggedObject = null;
        }

        // Instantiate new object
        const opts = {
          id: `${Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}`,
          label: this.selectedChooserType.label,
          img: {
            src: this.selectedChooserType.icon,
          },
          x,
          y,
          isTemporary: false,
        };
        const newContainer = await this.addContainer(opts);

        // Calculate new position
        x -= (newContainer.shape.width / 2);
        y -= (newContainer.shape.height / 2);

        // Grid effects
        if (this.pg.grid) {
          const { grid } = this.pg;
          x = Math.round(x / grid) * grid;
          y = Math.round(y / grid) * grid;
        }

        // Move object under the mouse cursor
        newContainer.move({
          x,
          y,
          moving: true,
        });
        newContainer.move({ // for handling collisions
          moving: false,
        });

        break;
      }
    }

    event.e.preventDefault();
  }
}
