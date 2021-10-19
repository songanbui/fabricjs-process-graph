import LinkableShape from './LinkableShape.js';
import Link from './Link.js';

const { fabric, _ } = window;

export default class Container extends LinkableShape {
  /**
   * A Container is a Rect with an IText. Can be expanded to reveal contained Shapes.
   * @param {Object}          options
   *
   * @param {Fabric.Canvas}   options.canvas - Fabric canvas
   * @param {String}          options.id - Unique identifier
   *
   */
  constructor(options) {
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
      width: 200,
      height: 100,
    });
    const text = new fabric.Textbox(options.label, {
      left: rect.width / 2,
      top: rect.height / 2,
      styles: { },
      fontSize: 14,
      fontFamily: 'Helvetica',
      textAlign: 'center',
      originX: 'center',
      originY: 'center',
      width: 190,
      height: 90,
      splitByGrapheme: true,
    });
    const group = new fabric.Group([rect, text], {
      left: 0,
      top: 0,
      originX: 'left',
      originY: 'top',
    });
    const newOptions = _.cloneDeep(_.omit(options, ['canvas', 'shape']));
    newOptions.canvas = options.canvas;
    newOptions.shape = group;
    super(newOptions);

    group.on({
      scaling: () => {
        // When scaling, keep text same size as initial
        if (group.scaleX < 1) {
          text.scaleX = 1 + (1 - group.scaleX);
        } else {
          text.scaleX = 1 / (group.scaleX);
        }
        if (group.scaleY < 1) {
          text.scaleY = 1 + (1 - group.scaleY);
        } else {
          text.scaleY = 1 / (group.scaleY);
        }
        this.canvas.renderAll();
      },
    });
  }

  _onAnchorClick(options) {
    const {
      id, left, top, angle, canvas, width, height,
    } = this.shape;
    const ap = options.target;
    const { cardinal } = ap;
    const spacing = 50;
    const newOptions = {};

    switch (cardinal) {
      case 'east': {
        newOptions.id = `${id}_next_${cardinal}`;
        newOptions.label = `${id}_next_${cardinal}`;
        newOptions.cardinal = 'west';
        newOptions.top = top;
        newOptions.left = left + width + spacing;
        newOptions.angle = angle;
        break;
      }
      case 'west': {
        newOptions.id = `${id}_next_${cardinal}`;
        newOptions.label = `${id}_next_${cardinal}`;
        newOptions.cardinal = 'east';
        newOptions.top = top;
        newOptions.left = left - width - spacing;
        newOptions.angle = angle;
        break;
      }
      case 'north': {
        newOptions.id = `${id}_next_${cardinal}`;
        newOptions.label = `${id}_next_${cardinal}`;
        newOptions.cardinal = 'south';
        newOptions.top = top - height - spacing;
        newOptions.left = left;
        newOptions.angle = angle;
        break;
      }
      case 'south': {
        newOptions.id = `${id}_next_${cardinal}`;
        newOptions.label = `${id}_next_${cardinal}`;
        newOptions.cardinal = 'north';
        newOptions.top = top + height + spacing;
        newOptions.left = left;
        newOptions.angle = angle;
        break;
      }
      case 'northeast': {
        newOptions.id = `${id}_next_${cardinal}`;
        newOptions.label = `${id}_next_${cardinal}`;
        newOptions.cardinal = 'southwest';
        newOptions.top = top - height - spacing;
        newOptions.left = left + width + spacing;
        newOptions.angle = angle;
        break;
      }
      case 'northwest': {
        newOptions.id = `${id}_next_${cardinal}`;
        newOptions.label = `${id}_next_${cardinal}`;
        newOptions.cardinal = 'southeast';
        newOptions.top = top - height - spacing;
        newOptions.left = left - width - spacing;
        newOptions.angle = angle;
        break;
      }
      case 'southeast': {
        newOptions.id = `${id}_next_${cardinal}`;
        newOptions.label = `${id}_next_${cardinal}`;
        newOptions.cardinal = 'northwest';
        newOptions.top = top + height + spacing;
        newOptions.left = left + width + spacing;
        newOptions.angle = angle;
        break;
      }
      case 'southwest':
      default: {
        newOptions.id = `${id}_next_${cardinal}`;
        newOptions.label = `${id}_next_${cardinal}`;
        newOptions.cardinal = 'northeast';
        newOptions.top = top + height + spacing;
        newOptions.left = left - width - spacing;
        newOptions.angle = angle;
        break;
      }
    }

    const nextContainer = new Container({
      canvas,
      id: newOptions.id,
      left: newOptions.left,
      top: newOptions.top,
      angle: newOptions.angle,
      label: newOptions.label,
    });
    nextContainer.inject();

    const newLink = new Link({
      canvas,
      start: {
        x: ap.left,
        y: ap.top,
      },
      end: {
        x: nextContainer.anchors[newOptions.cardinal].left,
        y: nextContainer.anchors[newOptions.cardinal].top,
      },
    });
    newLink.inject(canvas);
    newLink.connectLink('from', ap.shapeId, ap.cardinal);
    newLink.connectLink('to', nextContainer.anchors[newOptions.cardinal].shapeId, nextContainer.anchors[newOptions.cardinal].cardinal);
  }

  _onAnchorDoubleClick(options) {
    const ap = options.target;
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
  }
}
