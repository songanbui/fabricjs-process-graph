import LinkableShape from './LinkableShape.js';

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
      width: 250,
      height: 150,
    });
    const text = new fabric.IText(options.label, {
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
}
