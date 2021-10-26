const { fabric } = window;

export default class LinkableShape {
  /**
   * A LinkableShape is any Fabric.Object shape on which anchors are appended so that multiple Link can be connected to it.
   * @param {Object}          options
   *
   * @param {Fabric.Canvas}   options.canvas - Fabric canvas
   * @param {String}          options.id - Unique identifier
   *
   */
  constructor(options) {
    const {
      id,
      canvas,
      shape,
      left,
      top,
      angle,
    } = options;
    this.options = options;
    this.id = id;
    this.canvas = canvas;

    // Set shape
    shape.set('type', 'linkableShape');
    shape.set({
      left, top, id, angle,
    });
    this.shape = shape;

    // Show coordinates/angle when moving/rotating object
    const modificationBox = new fabric.Rect({
      left: 0,
      top: 0,
      originX: 'center',
      originY: 'center',
      strokeWidth: 1,
      stroke: '#666',
      fill: '#fff',
      width: 70,
      height: 20,
      vented: false,
      selectable: false,
      opacity: 0,
    });
    const modificationText = new fabric.Text('0, 0', {
      left: 0,
      top: 0,
      originX: 'center',
      originY: 'center',
      fontFamily: 'Helvetica',
      fontSize: 12,
      borderStrokeWidth: 4,
      evented: false,
      selectable: false,
      opacity: 0,
    });
    const modification = this.modBox = new fabric.Group([modificationBox, modificationText], {
      left: 0,
      top: 0,
      originX: 'center',
      originY: 'center',
      evented: false,
      selectable: false,
    });
    const onMoving = () => {
      const { x, y } = shape.aCoords.tl;
      const xCoords = [shape.aCoords.tl.x, shape.aCoords.tr.x, shape.aCoords.bl.x, shape.aCoords.br.x];
      const yCoords = [shape.aCoords.tl.y, shape.aCoords.tr.y, shape.aCoords.bl.y, shape.aCoords.br.y];
      modification.left = (Math.min(...xCoords) + Math.max(...xCoords)) / 2;
      modification.top = Math.round(Math.max(...yCoords) + 30);
      modification.setCoords();
      modificationBox.set('opacity', 0.7);
      modificationText.set('opacity', 1);
      modificationText.set('text', `${Math.round(x)}, ${Math.round(y)}`);
      canvas.bringToFront(modification);
    };
    const onMoved = () => {
      modificationBox.set('opacity', 0);
      modificationText.set('opacity', 0);
    };
    const onRotating = () => {
      const xCoords = [shape.aCoords.tl.x, shape.aCoords.tr.x, shape.aCoords.bl.x, shape.aCoords.br.x];
      const yCoords = [shape.aCoords.tl.y, shape.aCoords.tr.y, shape.aCoords.bl.y, shape.aCoords.br.y];
      modification.left = (Math.min(...xCoords) + Math.max(...xCoords)) / 2;
      modification.top = Math.round(Math.max(...yCoords) + 30);
      modification.setCoords();
      modificationBox.set('opacity', 0.7);
      modificationText.set('opacity', 1);
      modificationText.set('text', `${Math.round(shape.angle > 180 ? shape.angle - 360 : shape.angle)}°`);
      canvas.bringToFront(modification);
    };
    const onRotated = () => {
      modificationBox.set('opacity', 0);
      modificationText.set('opacity', 0);
    };
    shape.on({
      moving: onMoving,
      moved: onMoved,
      rotating: onRotating,
      rotated: onRotated,
    });

    // Anchor points
    this.anchors = this.shape.anchors = {
      east: this._makeAnchorPoint('east'),
      west: this._makeAnchorPoint('west'),
      // north: this._makeAnchorPoint('north'),
      // south: this._makeAnchorPoint('south'),
      // northeast: this._makeAnchorPoint('northeast'),
      // northwest: this._makeAnchorPoint('northwest'),
      // southeast: this._makeAnchorPoint('southeast'),
      // southwest: this._makeAnchorPoint('southwest'),
    };

    // Events related to anchors
    shape.on({
      selected: () => {
        this.toggleAnchorsOpacity(0);
      },
      mouseover: () => {
        if (this.canvas.getActiveObject() !== this.shape) {
          this.toggleAnchorsOpacity(1);
        }
      },
      mouseout: () => {
        this.toggleAnchorsOpacity(0);
      },
      modifying: () => {
        this.refreshAnchorsPosition(false);
      },
      modified: () => {
        this.refreshAnchorsPosition(true);
      },
      moving: () => {
        this.refreshAnchorsPosition(false);
      },
      moved: () => {
        this.refreshAnchorsPosition(true);
      },
      rotating: () => {
        this.refreshAnchorsPosition(false);
      },
      rotated: () => {
        this.refreshAnchorsPosition(true);
      },
      scaling: () => {
        this.refreshAnchorsPosition(false);
      },
      scaled: () => {
        this.refreshAnchorsPosition(true);
      },
    });
  }

  inject() {
    const {
      id,
      canvas,
      shape,
      anchors,
      modBox,
    } = this;
    canvas.add(shape);
    canvas.add(modBox);
    Object.keys(anchors).forEach((cardinal) => {
      canvas.add(anchors[cardinal]);
      canvas.bringForward(anchors[cardinal], true);
    });
    this.refreshAnchorsPosition(true);

    canvas.linkableShapes[id] = this;

    return this;
  }

  remove() {
    const {
      id,
      canvas,
      shape,
      anchors,
      modBox,
    } = this;
    canvas.remove(shape);
    canvas.remove(modBox);
    Object.keys(anchors).forEach((cardinal) => {
      canvas.remove(anchors[cardinal]);
    });

    delete canvas.linkableShapes[id];
  }

  move(options) {
    if (options.x) this.shape.set('left', options.x);
    if (options.y) this.shape.set('top', options.y);
    if (options.originX) this.shape.set('originX', options.originX);
    if (options.originY) this.shape.set('originY', options.originY);
    this.shape.setCoords();
    this.refreshAnchorsPosition();
    this.shape.fire(options.moving ? 'moving' : 'moved');
  }

  rotate(angle) {
    this.shape.rotate(angle);
    this.shape.setCoords();
    this.refreshAnchorsPosition();
  }

  refreshAnchorsPosition(commit) {
    Object.keys(this.anchors).forEach((cardinal) => {
      this._setAnchorPositionRelativeToRectangle(cardinal, commit);
    });
  }

  toggleAnchorsOpacity(opacity) {
    Object.keys(this.anchors).forEach((cardinal) => {
      this.anchors[cardinal].toggleOpacity(opacity);
    });
  }

  bringToFront() {
    const {
      canvas, shape, modBox, anchors,
    } = this;
    shape.bringToFront();
    modBox.bringToFront();
    Object.keys(anchors).forEach((cardinal) => {
      canvas.bringToFront(anchors[cardinal]);
    });
  }

  _setAnchorPositionRelativeToRectangle(cardinal, commit) {
    let left;
    let top;
    const { shape } = this;
    const ap = this.anchors[cardinal];
    switch (cardinal) {
      case 'east': {
        left = (shape.aCoords.tr.x + shape.aCoords.br.x) / 2;
        top = (shape.aCoords.tr.y + shape.aCoords.br.y) / 2;
        break;
      }
      case 'west': {
        left = (shape.aCoords.tl.x + shape.aCoords.bl.x) / 2;
        top = (shape.aCoords.tl.y + shape.aCoords.bl.y) / 2;
        break;
      }
      case 'north': {
        left = (shape.aCoords.tl.x + shape.aCoords.tr.x) / 2;
        top = (shape.aCoords.tl.y + shape.aCoords.tr.y) / 2;
        break;
      }
      case 'south': {
        left = (shape.aCoords.bl.x + shape.aCoords.br.x) / 2;
        top = (shape.aCoords.bl.y + shape.aCoords.br.y) / 2;
        break;
      }
      case 'northeast': {
        left = shape.aCoords.tr.x;
        top = shape.aCoords.tr.y;
        break;
      }
      case 'northwest': {
        left = shape.aCoords.tl.x;
        top = shape.aCoords.tl.y;
        break;
      }
      case 'southeast': {
        left = shape.aCoords.br.x;
        top = shape.aCoords.br.y;
        break;
      }
      case 'southwest':
      default: {
        left = shape.aCoords.bl.x;
        top = shape.aCoords.bl.y;
        break;
      }
    }
    ap.left = left;
    ap.top = top;
    ap.setCoords();

    ap.fire(commit ? 'pg:position:modified' : 'pg:position:modifying');
  }

  _makeAnchorPoint(cardinal) {
    let left;
    let top;
    const {
      shape,
      id,
    } = this;
    switch (cardinal) {
      case 'east': {
        left = (shape.aCoords.tr.x + shape.aCoords.br.x) / 2;
        top = (shape.aCoords.tr.y + shape.aCoords.br.y) / 2;
        break;
      }
      case 'west': {
        left = (shape.aCoords.tl.x + shape.aCoords.bl.x) / 2;
        top = (shape.aCoords.tl.y + shape.aCoords.bl.y) / 2;
        break;
      }
      case 'north': {
        left = (shape.aCoords.tl.x + shape.aCoords.tr.x) / 2;
        top = (shape.aCoords.tl.y + shape.aCoords.tr.y) / 2;
        break;
      }
      case 'south': {
        left = (shape.aCoords.bl.x + shape.aCoords.br.x) / 2;
        top = (shape.aCoords.bl.y + shape.aCoords.br.y) / 2;
        break;
      }
      case 'northeast': {
        left = shape.aCoords.tr.x;
        top = shape.aCoords.tr.y;
        break;
      }
      case 'northwest': {
        left = shape.aCoords.tl.x;
        top = shape.aCoords.tl.y;
        break;
      }
      case 'southeast': {
        left = shape.aCoords.br.x;
        top = shape.aCoords.br.y;
        break;
      }
      case 'southwest':
      default: {
        left = shape.aCoords.bl.x;
        top = shape.aCoords.bl.y;
        break;
      }
    }

    const ap = new fabric.Circle({
      objectCaching: false,
      left,
      top,
      strokeWidth: 2,
      radius: 6,
      fill: '#78befa', // 42a2da d5e8f2
      stroke: '#78befa',
      originX: 'center',
      originY: 'center',
      hasBorders: false,
      hasControls: false,
      selectable: false,
      opacity: 0,
      id: `${id}_${cardinal}`,
    });
    ap.type = 'anchor';
    ap.shapeId = id;
    ap.cardinal = cardinal;
    ap.on('mouseover', () => {
      ap.toggleOpacity(1);
    });
    ap.on('mouseout', () => {
      ap.toggleOpacity(0);
    });

    ap.on('mousedown', (options) => {
      switch (options.button) {
        case 3:
          this._onAnchorRightClick.call(this, options);
          break;
        case 2:
          this._onAnchorMiddleClick.call(this, options);
          break;
        case 1:
        default:
          this._onAnchorLeftClick.call(this, options);
          break;
      }
    });
    return ap;
  }

  // Should be implemented by Extending Classes
  /* eslint-disable class-methods-use-this */
  _onAnchorLeftClick(/* options */) {}

  _onAnchorMiddleClick(/* options */) {}

  _onAnchorRightClick(/* options */) {}

  /* eslint-disable class-methods-use-this */
}
