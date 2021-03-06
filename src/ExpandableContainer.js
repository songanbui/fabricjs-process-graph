import LinkableShape from './LinkableShape.js';
import CurvedLink from './CurvedLink.js';

const { fabric, _ } = window;

export default class ExpandableContainer extends LinkableShape {
  /**
   * A Container is a Rect with an IText. Can be expanded to reveal contained Shapes.
   * @param {Object}          options
   *
   * @param {Fabric.Canvas}   options.canvas - Fabric canvas
   * @param {String}          options.id - Unique identifier (physical id of the object)
   * @param {Number}          options.width
   * @param {Number}          options.height
   * @param {String}          options.label
   * @param {Object}          options.img
   * @param {String}          options.img.src - URL of an icon (representing the type of the object)
   * @param {Number}          options.childWidth
   * @param {Number}          options.childHeight
   * @param {Array}           options.children
   * @param {String}          options.children.$.id - Unique children identifier (physical id of the child)
   * @param {String}          options.children.$.label
   * @param {Number}          options.children.$.index
   * @paran {Object}          options.children.$.img
   * @param {String}          options.children.$.img.src - URL of an icon (representing the type of the object)
   *
   */
  constructor(options) {
    const group = new fabric.Group([], {
      left: options.left,
      top: options.top,
      originX: 'left',
      originY: 'top',
    });
    const newOptions = _.cloneDeep(_.omit(options, ['canvas', 'shape']));
    newOptions.canvas = options.canvas;
    newOptions.shape = group;
    super(newOptions);

    this.shapes = {};
    this.children = {};
    this.isExpanded = false;
  }

  async load(isChild) {
    const { options, shape } = this;

    this.isLoaded = false;

    const shapePos = {
      left: this.shape.left,
      top: this.shape.top,
    };
    const padding = 10;
    const margin = 10;
    const rectOpts = {
      left: 0,
      top: 0,
      originX: 'left',
      originY: 'top',
      strokeWidth: 1,
      stroke: '#666',
      fill: '#fff',
      rx: 4,
      ry: 4,
    };
    let imgOpts;
    if (isChild) {
      rectOpts.width = options.width ? options.width : 70;
      rectOpts.height = options.height ? options.height : 70;
      // imgOpts = {
      //   originX: 'center',
      //   originY: 'top',
      //   left: rectOpts.width / 2,
      //   top: padding,
      //   width: 22,
      //   height: 22,
      // };
      imgOpts = {
        originX: 'left',
        originY: 'top',
        left: padding,
        top: padding,
        width: 22,
        height: 22,
      };
    } else {
      imgOpts = {
        originX: 'left',
        originY: 'top',
        left: padding,
        top: padding,
        width: 22,
        height: 22,
      };
      rectOpts.width = options.width ? options.width : 200;
      rectOpts.height = options.height ? options.height : (imgOpts.height + padding * 2);
    }

    // Create Rect shape
    const rect = new fabric.Rect(rectOpts);
    this.shape.addWithUpdate(rect);
    this.shapes.rect = rect;

    let textOpts;
    if (this.options.img && this.options.img.src) {
      // Load image and create Image shape
      const oImg = await this._loadImage(this.options.img.src);
      oImg.set(imgOpts);
      this.shape.addWithUpdate(oImg);
      this.shapes.image = oImg;

      if (isChild) {
        // Align the text within the rectangle, under the image
        // Center the text in the rect
        // textOpts = {
        //   styles: { },
        //   fontSize: 14,
        //   fontFamily: 'Helvetica',
        //   textAlign: 'center',
        //   splitByGrapheme: true,
        //
        //   originX: 'center',
        //   originY: 'top',
        //   left: rect.width / 2,
        //   top: padding + imgOpts.height + margin,
        //   width: rectOpts.width - padding * 2,
        //   height: rectOpts.height - padding * 2,
        // };

        textOpts = {
          styles: { },
          fontSize: 14,
          fontFamily: 'Helvetica',
          textAlign: 'left',
          splitByGrapheme: true,
          fill: '#000',
          originX: 'left',
          originY: 'center',
          left: padding + oImg.width + margin,
          top: padding + oImg.height / 2,
          width: rect.width - padding - oImg.width - margin * 2,
          height: oImg.height,
        };
      } else {
        // Align the text with the image
        textOpts = {
          styles: { },
          fontSize: 14,
          fontFamily: 'Helvetica',
          textAlign: 'left',
          splitByGrapheme: true,
          fill: '#000',
          originX: 'left',
          originY: 'center',
          left: padding + oImg.width + margin,
          top: padding + oImg.height / 2,
          width: rect.width - padding - oImg.width - margin * 2,
          height: oImg.height,
        };
      }
    } else {
      // Center the text in the rect
      textOpts = {
        styles: { },
        fontSize: 14,
        fontFamily: 'Helvetica',
        textAlign: 'center',
        splitByGrapheme: true,
        fill: '#000',
        originX: 'center',
        originY: 'center',
        left: rect.width / 2,
        top: rect.height / 2,
        width: rectOpts.width - padding * 2,
        height: rectOpts.height - padding * 2,
      };
    }

    // Create Textbox shape
    const text = new fabric.Textbox(options.label, textOpts);
    if (!options.hideText) {
      this.shape.addWithUpdate(text);
    }
    this.shapes.text = text;

    // Reposition the group accordingly
    this.shape.left = shapePos.left;
    this.shape.top = shapePos.top;
    this.shape.setCoords();
    this.canvas.renderAll();

    // Set the shape as not selectable if it is a child
    if (isChild) {
      this.shape.selectable = false;
    }

    // Remember initial options as collapsed
    this.initialOpts = {
      rect: {
        width: rectOpts.width,
        height: rectOpts.height,
      },
      child: {
        width: options.childWidth ? options.childWidth : 70,
        height: options.childHeight ? options.childHeight : 70,
        // width: options.childWidth ? options.childWidth : 52,
        // height: options.childWidth ? options.childWidth : 52,
      },
    };

    // Construct children if this is a normal (parent) Container
    if (!isChild && Array.isArray(options.children) && options.children.length) {
      await this.addChildren(options.children);
    }

    shape.on({
      scaling: () => {
        if (text) {
          // When scaling, keep text same size as initial
          if (shape.scaleX < 1) {
            text.scaleX = 1 + (1 - shape.scaleX);
          } else {
            text.scaleX = 1 / (shape.scaleX);
          }
          if (shape.scaleY < 1) {
            text.scaleY = 1 + (1 - shape.scaleY);
          } else {
            text.scaleY = 1 / (shape.scaleY);
          }
          this.canvas.renderAll();
        }
      },
      mousedblclick: () => {
        if (this.isExpanded) {
          this.collapse();
        } else {
          this.expand();
        }
      },
    });

    this.isLoaded = true;

    return this;
  }

  async _loadImage(src) {
    const { canvas } = this;
    const url = src || this.options.img.src;

    return new Promise((resolve) => {
      if (!(url in canvas.cachedImages)) {
        fabric.Image.fromURL(url, (oImg) => {
          canvas.cachedImages[url] = oImg;
          resolve(fabric.util.object.clone(canvas.cachedImages[url]));
        });
      } else {
        resolve(fabric.util.object.clone(canvas.cachedImages[url]));
      }
    });
  }

  async addChildren(children) {
    const {
      canvas, shape, shapes, initialOpts,
    } = this;
    const existing = Object.keys(this.children);

    // Calculate new dimensions
    const padding = 10;
    const margin = 10;

    for (let c = 0; c < children.length; c += 1) {
      const child = children[c];
      if (!(child.id in this.children)) {
        const index = (typeof child.index === 'number') ? child.index : existing.length + (c + 1);
        const childContainer = new ExpandableContainer({
          canvas,
          id: child.id,
          left: shape.left + padding + (initialOpts.child.width + margin) * c + (c === children.length ? -margin : 0),
          top: shape.top + padding + shapes.image.height + margin,
          angle: 0,
          label: child.label ? child.label : index.toString(),
          img: {
            src: child.img.src,
          },
          width: initialOpts.child.width,
          height: initialOpts.child.height,
          hideText: child.hideText,
        });
        // eslint-disable-next-line no-await-in-loop
        await childContainer.load(true);
        this.children[child.id] = childContainer;
        this.children[child.id].index = index;
      }
    }
    shape.addWithUpdate();
    shape.setCoords();
    canvas.renderAll();
  }

  setActive(active) {
    if (active) {
      this.shapes.rect.set('stroke', '#78befa');
      this.shapes.rect.set('fill', '#78befa');
      this.shapes.text.set('fill', '#fff');
    } else {
      this.shapes.rect.set('stroke', '#666');
      this.shapes.rect.set('fill', '#fff');
      this.shapes.text.set('fill', '#000');
    }
  }

  expand() {
    if (Object.keys(this.children).length !== 0 && this.isExpanded === false) {
      const {
        canvas, shape, shapes, initialOpts,
      } = this;
      const children = Object.values(this.children);

      // Calculate new dimensions
      const padding = 10;
      const margin = 10;
      const oldRectWidth = shapes.rect.width;
      const oldRectHeight = shapes.rect.height;

      const newRectWidth = Math.max(padding * 2 + children.length * initialOpts.child.width
        + (children.length - 1) * margin, initialOpts.rect.width);
      const newRectHeight = children.length > 0 ? padding + shapes.image.height + margin
        + initialOpts.child.height + padding : initialOpts.rect.height;

      // Update all other containers that are below and/or on the right of the current shape, to avoid collision
      shapes.rect.opacity = 0.7;
      const otherShapes = Object.values(canvas.linkableShapes);
      if (otherShapes.length > 1) {
        const deltaX = newRectWidth - oldRectWidth;
        const deltaY = newRectHeight - oldRectHeight;
        for (let o = 0; o < otherShapes.length; o += 1) {
          const shapeToMove = otherShapes[o];
          if (shapeToMove.id !== this.id) {
            // If expanded Shape is above AND on the left of the current shape
            if (this.shape.aCoords.br.x <= shapeToMove.shape.aCoords.tl.x && this.shape.aCoords.br.y <= shapeToMove.shape.aCoords.tl.y) {
              shapeToMove.move({
                x: shapeToMove.shape.left + deltaX,
                y: shapeToMove.shape.top + deltaY,
                moving: false,
                skipCollision: true,
              });
            } else if (this.shape.aCoords.bl.y < shapeToMove.shape.aCoords.tl.y) { // If expanded Shape is above the current shape
              if (this.shape.aCoords.tl.x < shapeToMove.shape.aCoords.tr.x) {
                shapeToMove.move({
                  y: shapeToMove.shape.top + deltaY,
                  moving: false,
                  skipCollision: true,
                });
              }
            } else if (this.shape.aCoords.tr.x < shapeToMove.shape.aCoords.tl.x) { // If expanded Shape is on the left of the current shape
              if (this.shape.aCoords.tl.y < shapeToMove.shape.aCoords.bl.y) {
                shapeToMove.move({
                  x: shapeToMove.shape.left + deltaX,
                  moving: false,
                  skipCollision: true,
                });
              }
            }
          }
        }
      }

      // Resize existing shapes
      shapes.rect.width = newRectWidth;
      shapes.rect.height = newRectHeight;
      shapes.rect.setCoords();
      shapes.text.width = newRectWidth - (shapes.image.width + padding + margin);
      shapes.text.textAlign = 'left';
      shapes.text.setCoords();

      // Add children containers in index order
      const sorted = children.sort((c1, c2) => c1.index > c2.index);
      for (let c = 0; c < sorted.length; c += 1) {
        const child = sorted[c];
        child.shape.left = shape.left + padding
          + (initialOpts.child.width + margin) * c + (c === sorted.length ? -margin : 0);
        child.shape.top = shape.top + padding + shapes.image.height + margin;
        shape.addWithUpdate(child.shape);
      }

      // Update the container coords
      shape.addWithUpdate();
      shape.setCoords();
      this.bringToFront();
      this.shape.fire('modified');

      canvas.renderAll();
    }

    this.isExpanded = true;
  }

  collapse() {
    if (Object.keys(this.children).length !== 0 && this.isExpanded === true) {
      const {
        canvas, shape, shapes, initialOpts,
      } = this;
      const children = Object.values(this.children);

      // Calculate new dimensions
      const padding = 10;
      const margin = 10;
      const oldRectWidth = shapes.rect.width;
      const oldRectHeight = shapes.rect.height;

      const newRectWidth = initialOpts.rect.width;
      const newRectHeight = initialOpts.rect.height;

      // Update all other containers that are below and/or on the right of the current shape, to avoid collision
      shapes.rect.opacity = 1;
      const otherShapes = Object.values(canvas.linkableShapes);
      if (otherShapes.length > 1) {
        const deltaX = newRectWidth - oldRectWidth;
        const deltaY = newRectHeight - oldRectHeight;
        for (let o = 0; o < otherShapes.length; o += 1) {
          const shapeToMove = otherShapes[o];
          if (otherShapes[o].id !== this.id) {
            // If expanded Shape is above AND on the left of the current shape
            if (this.shape.aCoords.br.x <= shapeToMove.shape.aCoords.tl.x && this.shape.aCoords.br.y <= shapeToMove.shape.aCoords.tl.y) {
              shapeToMove.move({
                x: shapeToMove.shape.left + deltaX,
                y: shapeToMove.shape.top + deltaY,
                moving: false,
                skipCollision: true,
              });
            } else if (this.shape.aCoords.bl.y < shapeToMove.shape.aCoords.tl.y) { // If expanded Shape is above the current shape
              if (this.shape.aCoords.tl.x < shapeToMove.shape.aCoords.tr.x) {
                shapeToMove.move({
                  y: shapeToMove.shape.top + deltaY,
                  moving: false,
                  skipCollision: true,
                });
              }
            } else if (this.shape.aCoords.tr.x < shapeToMove.shape.aCoords.tl.x) { // If expanded Shape is on the left of the current shape
              if (this.shape.aCoords.tl.y < shapeToMove.shape.aCoords.bl.y) {
                shapeToMove.move({
                  x: shapeToMove.shape.left + deltaX,
                  moving: false,
                  skipCollision: true,
                });
              }
            }
          }
        }
      }

      // Resize existing shapes
      shapes.rect.width = newRectWidth;
      shapes.rect.height = newRectHeight;
      shapes.rect.setCoords();
      shapes.text.width = newRectWidth - (shapes.image.width + padding * 2 + margin);
      shapes.text.textAlign = 'left';
      shapes.text.setCoords();

      // Remove children containers
      for (let c = 0; c < children.length; c += 1) {
        const child = children[c];
        child.left = shape.left + padding
          + (initialOpts.child.width + margin) * c + (c === children.length ? -margin : 0);
        child.top = shape.top + padding + shapes.image.height + margin;
        shape.remove(child.shape);
      }

      // Update the container coords
      shape.addWithUpdate();
      shape.setCoords();
      this.shape.fire('modified');

      canvas.renderAll();
    }
    this.isExpanded = false;
  }

  async _onAnchorRightClick(options) {
    const {
      id, left, top, angle, canvas, width, height,
    } = this.shape;
    const ap = options.target;
    const { cardinal } = ap;
    const spacing = 100;

    const nextId = `${id}_next_${cardinal}_${Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}`;
    const label = `${id}_next_${cardinal}`;
    const nextContainerOpts = _.cloneDeep(_.omit(this.options, ['canvas', 'shape']));
    nextContainerOpts.canvas = canvas;
    nextContainerOpts.id = nextId;
    nextContainerOpts.left = left;
    nextContainerOpts.top = top;
    nextContainerOpts.angle = angle;
    nextContainerOpts.label = label;
    nextContainerOpts.children = [];

    const nextContainer = new ExpandableContainer(nextContainerOpts);
    await nextContainer.load();
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
        newOptions.y = top + height + spacing;
        newOptions.x = left + width + spacing;
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
      id: `${Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}`,
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
    newLink.connectLink('end', nextContainer.anchors[targetCardinal].shapeId,
      nextContainer.anchors[targetCardinal].cardinal);
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
      id: `${Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}`,
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
