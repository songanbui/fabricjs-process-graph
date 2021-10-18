import Link from './Link.js';

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
    const east = this.makeAnchorPoint('east');
    const west = this.makeAnchorPoint('west');
    const north = this.makeAnchorPoint('north');
    const south = this.makeAnchorPoint('south');
    const northeast = this.makeAnchorPoint('northeast');
    const northwest = this.makeAnchorPoint('northwest');
    const southeast = this.makeAnchorPoint('southeast');
    const southwest = this.makeAnchorPoint('southwest');
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

  refreshAnchorsPosition(commit) {
    this.setAnchorPositionRelativeToRectangle('east', commit);
    this.setAnchorPositionRelativeToRectangle('west', this.shape, commit);
    this.setAnchorPositionRelativeToRectangle('south', this.shape, commit);
    this.setAnchorPositionRelativeToRectangle('north', this.shape, commit);
    this.setAnchorPositionRelativeToRectangle('northeast', this.shape, commit);
    this.setAnchorPositionRelativeToRectangle('northwest', this.shape, commit);
    this.setAnchorPositionRelativeToRectangle('southeast', this.shape, commit);
    this.setAnchorPositionRelativeToRectangle('southwest', this.shape, commit);
  }

  setAnchorPositionRelativeToRectangle(cardinal, commit) {
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
        left = shape.aCoords.tl.x;
        top = shape.aCoords.tl.y;
        break;
      }
      case 'northwest': {
        left = shape.aCoords.tr.x;
        top = shape.aCoords.tr.y;
        break;
      }
      case 'southeast': {
        left = shape.aCoords.bl.x;
        top = shape.aCoords.bl.y;
        break;
      }
      case 'southwest':
      default: {
        left = shape.aCoords.br.x;
        top = shape.aCoords.br.y;
        break;
      }
    }
    ap.left = left;
    ap.top = top;

    ap.fire(commit ? 'pg:position:modified' : 'pg:position:modifying');
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

  makeAnchorPoint(cardinal) {
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
        left = shape.aCoords.tl.x;
        top = shape.aCoords.tl.y;
        break;
      }
      case 'northwest': {
        left = shape.aCoords.tr.x;
        top = shape.aCoords.tr.y;
        break;
      }
      case 'southeast': {
        left = shape.aCoords.bl.x;
        top = shape.aCoords.bl.y;
        break;
      }
      case 'southwest':
      default: {
        left = shape.aCoords.br.x;
        top = shape.aCoords.br.y;
        break;
      }
    }

    const ap = new fabric.Circle({
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
    ap.on('mousedblclick', () => {
      const { canvas } = this;
      const newLink = new Link({
        canvas,
        start: {
          x: ap.left,
          y: ap.top,
        },
        end: {
          x: ap.left,
          y: ap.top,
        },
      });
      newLink.inject(canvas);
      newLink.connectLink('from', ap.shapeId, ap.cardinal);
      newLink.arrowHead.fire('mousedown');

      const onMouseMove = (event) => {
        newLink.arrowHead.left = event.pointer.x;
        newLink.arrowHead.top = event.pointer.y;
        newLink.arrowHead.fire('moving');
      };
      canvas.on('mouse:move', onMouseMove);

      const onMouseClick = () => {
        newLink.arrowHead.fire('moved');
        newLink.arrowHead.fire('mouseup');
        canvas.off('mouse:move', onMouseMove);
        canvas.off('mouse:up', onMouseClick);
        newLink.resetCurvature();
      };
      canvas.on('mouse:up', onMouseClick);
    });
    return ap;
  }
}
