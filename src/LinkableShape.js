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
    this.id = id;
    this.canvas = canvas;

    this.shape = new fabric.Group([shape], {
      left,
      top,
      hasBorders: true,
      hasControls: true,
      originX: 'left',
      originY: 'top',
      id,
      angle: angle || 0,
    });
    this.shape.type = 'linkableShape';

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

    // Events
    this.shape.on('mouseover', () => {
      this.toggleAnchorsOpacity(1);
    });
    this.shape.on('mouseout', () => {
      this.toggleAnchorsOpacity(0);
    });
    this.shape.on('moving', () => {
      this.refreshAnchorsPosition(false);
    });
    this.shape.on('moved', () => {
      this.refreshAnchorsPosition(true);
    });
    this.shape.on('rotating', () => {
      this.refreshAnchorsPosition(false);
    });
    this.shape.on('rotated', () => {
      this.refreshAnchorsPosition(true);
    });
    this.shape.on('scaling', () => {
      this.refreshAnchorsPosition(false);
    });
    this.shape.on('scaled', () => {
      this.refreshAnchorsPosition(true);
    });
  }

  inject() {
    const {
      canvas,
      shape,
      anchors,
    } = this;
    canvas.add(shape);
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
      // ap.set('stroke', '#55f');
    });
    ap.on('mouseout', () => {
      ap.toggleOpacity(0);
      // ap.set('stroke', '#666');
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
