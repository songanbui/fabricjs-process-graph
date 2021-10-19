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
    const east = this._makeAnchorPoint('east');
    const west = this._makeAnchorPoint('west');
    const north = this._makeAnchorPoint('north');
    const south = this._makeAnchorPoint('south');
    const northeast = this._makeAnchorPoint('northeast');
    const northwest = this._makeAnchorPoint('northwest');
    const southeast = this._makeAnchorPoint('southeast');
    const southwest = this._makeAnchorPoint('southwest');
    this.anchors = this.shape.anchors = {
      east,
      west,
      north,
      south,
      northeast,
      northwest,
      southeast,
      southwest,
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
      canvas,
      shape,
      anchors,
      modBox,
    } = this;
    canvas.add(shape);
    canvas.add(modBox);
    canvas.add(anchors.east);
    canvas.bringForward(anchors.east, true);
    canvas.add(anchors.west);
    canvas.bringForward(anchors.west, true);
    canvas.add(anchors.north);
    canvas.bringForward(anchors.north, true);
    canvas.add(anchors.south);
    canvas.bringForward(anchors.south, true);
    canvas.add(anchors.northeast);
    canvas.bringForward(anchors.northeast, true);
    canvas.add(anchors.northwest);
    canvas.bringForward(anchors.northwest, true);
    canvas.add(anchors.southeast);
    canvas.bringForward(anchors.southeast, true);
    canvas.add(anchors.southwest);
    canvas.bringForward(anchors.southwest, true);
    this.refreshAnchorsPosition(true);

    return this;
  }

  move(options) {
    if (options.x) this.shape.set('top', options.x);
    if (options.y) this.shape.set('left', options.y);
    this.shape.setCoords();
    this.refreshAnchorsPosition();
  }

  rotate(angle) {
    this.shape.rotate(angle);
    this.shape.setCoords();
    this.refreshAnchorsPosition();
  }

  refreshAnchorsPosition(commit) {
    this._setAnchorPositionRelativeToRectangle('east', commit);
    this._setAnchorPositionRelativeToRectangle('west', this.shape, commit);
    this._setAnchorPositionRelativeToRectangle('south', this.shape, commit);
    this._setAnchorPositionRelativeToRectangle('north', this.shape, commit);
    this._setAnchorPositionRelativeToRectangle('northeast', this.shape, commit);
    this._setAnchorPositionRelativeToRectangle('northwest', this.shape, commit);
    this._setAnchorPositionRelativeToRectangle('southeast', this.shape, commit);
    this._setAnchorPositionRelativeToRectangle('southwest', this.shape, commit);
  }

  toggleAnchorsOpacity(opacity) {
    const {
      east,
      west,
      north,
      south,
      northeast,
      southeast,
      northwest,
      southwest,
    } = this.anchors;
    east.toggleOpacity(opacity);
    west.toggleOpacity(opacity);
    north.toggleOpacity(opacity);
    south.toggleOpacity(opacity);
    northeast.toggleOpacity(opacity);
    southeast.toggleOpacity(opacity);
    northwest.toggleOpacity(opacity);
    southwest.toggleOpacity(opacity);
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

    ap.on('mouseup', (options) => {
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
