import LinkableShape from './LinkableShape.js';
import CurvedLink from './CurvedLink.js';

const { fabric, _ } = window;

export default class Container extends LinkableShape {
  /**
   * A Container is a Rect with an IText. Can be expanded to reveal contained Shapes.
   * @param {Object}          options
   *
   * @param {Fabric.Canvas}   options.canvas - Fabric canvas
   * @param {String}          options.id - Unique identifier
   * @param {Number}          options.width
   * @param {Number}          options.height
   * @param {String}          options.label
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
      width: options.width ? options.width : 200,
      height: options.height ? options.height : 100,
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

  _onAnchorRightClick(options) {
    const {
      id, left, top, angle, canvas, width, height,
    } = this.shape;
    const ap = options.target;
    const { cardinal } = ap;
    const spacing = 50;

    const nextContainer = new Container({
      canvas,
      id: `${id}_next_${cardinal}_${Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}`,
      left,
      top,
      angle,
      label: `${id}_next_${cardinal}`,
    });
    nextContainer.inject();

    const newOptions = {};
    let targetCardinal;
    switch (cardinal) {
      case 'east': {
        targetCardinal = 'west';
        newOptions.y = top;
        newOptions.x = left + width + spacing;
        break;
      }
      case 'west': {
        targetCardinal = 'east';
        newOptions.y = top;
        newOptions.x = left - width - spacing;
        break;
      }
      case 'north': {
        targetCardinal = 'south';
        newOptions.y = top - height - spacing;
        newOptions.x = left;
        break;
      }
      case 'south': {
        targetCardinal = 'north';
        newOptions.y = top + height + spacing;
        newOptions.x = left;
        break;
      }
      case 'northeast': {
        targetCardinal = 'southwest';
        newOptions.y = top - height - spacing;
        newOptions.x = left + width + spacing;
        break;
      }
      case 'northwest': {
        targetCardinal = 'southeast';
        newOptions.y = top - height - spacing;
        newOptions.x = left - width - spacing;
        break;
      }
      case 'southeast': {
        targetCardinal = 'northwest';
        newOptions.x = top + height + spacing;
        newOptions.y = left + width + spacing;
        break;
      }
      case 'southwest':
      default: {
        targetCardinal = 'northeast';
        newOptions.y = top + height + spacing;
        newOptions.x = left - width - spacing;
        break;
      }
    }
    nextContainer.move(newOptions);
    // nextContainer.rotate(angle);

    const newLink = new CurvedLink({
      canvas,
      start: {
        x: ap.left,
        y: ap.top,
      },
      end: {
        x: nextContainer.anchors[targetCardinal].left,
        y: nextContainer.anchors[targetCardinal].top,
      },
    });
    newLink.inject(canvas);
    newLink.connectLink('start', ap.shapeId, ap.cardinal);
    newLink.connectLink('end', nextContainer.anchors[targetCardinal].shapeId, nextContainer.anchors[targetCardinal].cardinal);
  }

  _onAnchorLeftClick(options) {
    const ap = options.target;
    const { canvas } = this;

    // Disable the multi selection when moving mouse
    this.canvas.selection = false;

    const oppositeCardinal = {
      east: 'west',
      west: 'east',
      north: 'south',
      south: 'north',
    };
    const newLink = new CurvedLink({
      canvas,
      start: {
        x: ap.left,
        y: ap.top,
        direction: ap.cardinal,
      },
      end: {
        x: ap.left,
        y: ap.top,
        direction: oppositeCardinal[ap.cardinal],
      },
    });
    newLink.inject(canvas);
    newLink.connectLink('start', ap.shapeId, ap.cardinal);
    newLink.arrowHead.fire('mousedown');

    const onMouseMove = (event) => {
      newLink.arrowHead.left = event.pointer.x;
      newLink.arrowHead.top = event.pointer.y;
      newLink.arrowHead.fire('moving');
    };
    canvas.on('mouse:move', onMouseMove);

    const onMouseClick = () => {
      // Enable back the multi selection when moving mouse
      this.canvas.selection = true;

      newLink.arrowHead.fire('moved');
      newLink.arrowHead.fire('mouseup');
      canvas.off('mouse:move', onMouseMove);
      canvas.off('mouse:up', onMouseClick);
    };
    canvas.on('mouse:up', onMouseClick);
  }
}
