import Link from './Link.js';

const { fabric } = window;

/**
 * A LinkableShape is any Fabric.Object shape on which anchors are appended so that multiple Link can be connected to it.
 * @param {Object}          options
 *
 * @param {Fabric.Canvas}   options.canvas - Fabric canvas
 * @param {String}          options.id - Unique identifier
 *
 */
export default class LinkableShape {
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
      originX: 'center',
      originY: 'center',
      id,
      angle: angle || 0,
    });
    this.shape.type = 'connectableShape';

    // Anchor points
    const east = this.makeAnchorPoint('east');
    const west = this.makeAnchorPoint('west');
    const north = this.makeAnchorPoint('north');
    const south = this.makeAnchorPoint('south');
    this.anchors = this.shape.anchors = {
      east,
      west,
      north,
      south,
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
    this.refreshAnchorsPosition(true);

    return this;
  }

  refreshAnchorsPosition(commit) {
    this.setAnchorPositionRelativeToRectangle('east', commit);
    this.setAnchorPositionRelativeToRectangle('west', this.shape, commit);
    this.setAnchorPositionRelativeToRectangle('south', this.shape, commit);
    this.setAnchorPositionRelativeToRectangle('north', this.shape, commit);
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
        // left = shape.left + shape.width/2;
        // top = shape.top;
        break;
      }
      case 'west': {
        left = (shape.aCoords.tl.x + shape.aCoords.bl.x) / 2;
        top = (shape.aCoords.tl.y + shape.aCoords.bl.y) / 2;
        // left = shape.left - shape.width/2;
        // top = shape.top;
        break;
      }
      case 'north': {
        left = (shape.aCoords.tl.x + shape.aCoords.tr.x) / 2;
        top = (shape.aCoords.tl.y + shape.aCoords.tr.y) / 2;
        // left = shape.left;
        // top = shape.top - shape.height/2;
        break;
      }
      case 'south':
      default: {
        left = (shape.aCoords.bl.x + shape.aCoords.br.x) / 2;
        top = (shape.aCoords.bl.y + shape.aCoords.br.y) / 2;
        // left = shape.left;
        // top = shape.top + shape.height/2;
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
    } = this.anchors;
    east.toggleOpacity(opacity);
    west.toggleOpacity(opacity);
    north.toggleOpacity(opacity);
    south.toggleOpacity(opacity);
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
        left = shape.left + shape.width / 2;
        ({ top } = shape.top);
        break;
      }
      case 'west': {
        left = shape.left - shape.width / 2;
        ({ top } = shape.top);
        break;
      }
      case 'north': {
        ({ left } = shape.left);
        top = shape.top - shape.height / 2;
        break;
      }
      case 'south':
      default: {
        ({ left } = shape.left);
        top = shape.top + shape.height / 2;
        break;
      }
    }

    const ap = new fabric.Circle({
      left,
      top,
      strokeWidth: 4,
      radius: 8,
      fill: '#fff',
      stroke: '#666',
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
