const { fabric } = window;

export default class CurvedLink {
  /**
   * A Link is a Fabric.Path object whose Start and End points can be connected end any anchor of two LinkableShape.
   * @param {Object}          options
   *
   * @param {Fabric.Canvas}   options.canvas - Fabric canvas
   * @param {String}          options.id - Unique identifier
   *
   * @param {Object}          [options.start] - Coordinates of the start point
   * @param {Number}          [options.start.x] - X axis coordinate of the start point
   * @param {Number}          [options.start.y] - Y axis coordinate of the start point
   * @param {Number}          [options.start.direction] -
   * @param {Number}          [options.end.x] - X axis coordinate of the end point
   * @param {Number}          [options.end.y] - Y axis coordinate of the end point
   * @param {Number}          [options.end.direction] -
   * @param {Object}          [options.custom] - Options end customize the different shapes of the Link
   *
   * @param {Object}          [options.custom.path] - bezier quadratic curve
   * @param {Object}          [options.custom.startPoint] - aka arrowTail
   * @param {Object}          [options.custom.endPoint] - aka arrowHead
   */
  constructor(options) {
    const {
      id,
      canvas,
    } = options;
    this.id = id;
    this.canvas = canvas;
    this.direction = {
      start: options && options.start && options.start.direction ? options.start.direction : 'east',
      end: options && options.end && options.end.direction ? options.end.direction : 'west',
    };
    const start = {
      x: options && options.start && options.start.x ? options.start.x : 0,
      y: options && options.start && options.start.y ? options.start.y : 0,
    };
    const end = {
      x: options && options.end && options.end.x ? options.end.x : 0,
      y: options && options.end && options.end.y ? options.end.y : 0,
    };

    // Path, a bezier cubic curve
    const { pathCoordsArray } = this.computePathCoords({
      start: {
        x: start.x,
        y: start.y,
        direction: this.direction.start,
      },
      end: {
        x: end.x,
        y: end.y,
        direction: this.direction.end,
      },
    });
    const pathOpts = this.defaultPathOptions = {
      fill: '',
      stroke: (options.custom && options.custom.path && options.custom.path.stroke) ? options.custom.path.stroke : '#999',
      strokeWidth: (options.custom && options.custom.path && options.custom.path.strokeWidth) ? options.custom.path.strokeWidth : 2,
      objectCaching: false,
      selectable: true,
      hasBorders: true,
      hasControls: false,
      perPixelTargetFind: true,
    };
    const path = new fabric.Path(pathCoordsArray, pathOpts);
    this.path = path;

    // End point (arrowHead)
    const isValidMaskOpts = {
      objectCaching: false,
      left: 0,
      top: 0,
      strokeWidth: 1,
      radius: 16,
      fill: '#57b857', // ea4f37
      stroke: '#57b857',
      originX: 'center',
      originY: 'center',
      hasBorders: false,
      hasControls: false,
      selectable: false,
      opacity: 0,
    };
    const arrowHeadOpts = {
      objectCaching: false,
      width: 10,
      height: 10,
      left: end.x,
      top: end.y,
      strokeWidth: 1,
      fill: '#ddd',
      opacity: 1,
      stroke: '#999',
      originX: 'center',
      originY: 'center',
      selectable: true,
      hasBorders: false,
      hasControls: false,
    };
    const arrowHead = this.arrowHead = new fabric.Triangle(arrowHeadOpts);
    this.isValidHeadConnectionMask = new fabric.Circle(isValidMaskOpts);
    arrowHead.on('moving', () => {
      this.updatePath({
        end: {
          x: arrowHead.left,
          y: arrowHead.top,
        },
        commit: false,
      });
      this._checkExtremityCanBeConnected('end');
    });
    arrowHead.on('moved', () => {
      this.updatePath({
        end: {
          x: arrowHead.left,
          y: arrowHead.top,
        },
        commit: true,
      });
      this.isValidHeadConnectionMask.set('opacity', 0);
      this._connectDisconnectExtremity('end');
    });
    arrowHead.on('mousedown', () => {
      this.bringToFront();
      this.toggleAllAnchorsOpacity(1);

      arrowHead.on('mouseup', () => {
        this.toggleAllAnchorsOpacity(0);
      });
    });
    arrowHead.on('mouseover', () => {
      arrowHead.set('fill', '#78befa');
      arrowHead.set('stroke', '#78befa');
      canvas.renderAll();
    });
    arrowHead.on('mouseout', () => {
      arrowHead.set('fill', '#ddd');
      arrowHead.set('stroke', '#999');
      canvas.renderAll();
    });

    // Start point (arrowTail)
    const arrowTailOpts = {
      objectCaching: false,
      width: 10,
      height: 10,
      left: start.x,
      top: start.y,
      strokeWidth: 1,
      fill: '#ddd',
      opacity: 1,
      stroke: '#999',
      originX: 'center',
      originY: 'center',
      selectable: true,
      hasBorders: false,
      hasControls: false,
    };
    const arrowTail = this.arrowTail = new fabric.Rect(arrowTailOpts);
    this.isValidTailConnectionMask = new fabric.Circle(isValidMaskOpts);
    arrowTail.on('moving', () => {
      this.updatePath({
        start: {
          x: arrowTail.left,
          y: arrowTail.top,
        },
        commit: false,
      });
      this._checkExtremityCanBeConnected('start');
    });
    arrowTail.on('moved', () => {
      this.updatePath({
        start: {
          x: arrowTail.left,
          y: arrowTail.top,
        },
        commit: true,
      });
      this.isValidTailConnectionMask.set('opacity', 0);
      this._connectDisconnectExtremity('start');
    });
    arrowTail.on('mousedown', () => {
      this.bringToFront();
      this.toggleAllAnchorsOpacity(1);

      arrowTail.on('mouseup', () => {
        this.toggleAllAnchorsOpacity(0);
      });
    });
    arrowTail.on('mouseover', () => {
      arrowTail.set('fill', '#78befa');
      arrowTail.set('stroke', '#78befa');
      canvas.renderAll();
    });
    arrowTail.on('mouseout', () => {
      arrowTail.set('fill', '#ddd');
      arrowTail.set('stroke', '#999');
      canvas.renderAll();
    });
  }

  inject() {
    const {
      id,
      canvas,
      path,
      arrowHead,
      arrowTail,
      isValidTailConnectionMask,
      isValidHeadConnectionMask,
    } = this;
    canvas.add(isValidTailConnectionMask);
    canvas.add(isValidHeadConnectionMask);
    canvas.add(arrowHead);
    canvas.add(arrowTail);

    canvas.add(path);

    this.updatePath({
      start: {
        x: path.path[0][1],
        y: path.path[0][2],
      },
      end: {
        x: path.path[2][5],
        y: path.path[2][6],
      },
      commit: true,
    });

    canvas.links[id] = this;

    return this;
  }

  remove() {
    const {
      id,
      canvas,
      path,
      arrowHead,
      arrowTail,
      isValidTailConnectionMask,
      isValidHeadConnectionMask,
    } = this;
    canvas.remove(isValidTailConnectionMask);
    canvas.remove(isValidHeadConnectionMask);
    canvas.remove(arrowHead);
    canvas.remove(arrowTail);
    canvas.remove(path);

    this.disconnectLink('start');
    this.disconnectLink('end');
    delete canvas.links[id];
  }

  connectLink(linkPoint, shapeId, cardinal) {
    // Check not already connected
    if (!this.isValidConnection(linkPoint, shapeId, cardinal)) {
      return;
    }
    const shape = this.canvas.getObjects()
      .find((o) => o.id === shapeId);

    // Disconnect existing object
    this.disconnectLink(linkPoint);

    // Connect
    this.direction[linkPoint] = cardinal;
    this[linkPoint] = {
      shape,
      anchor: cardinal,
      handlers: {
        onAnchorPositionModifying: () => {
          const opts = {
            commit: false,
          };
          opts[linkPoint] = {
            x: shape.anchors[cardinal].left + (cardinal === 'east' ? 10 : -10),
            y: shape.anchors[cardinal].top,
          };
          this.updatePath(opts);
        },
        onAnchorPositionModified: () => {
          const opts = {
            commit: true,
          };
          opts[linkPoint] = {
            x: shape.anchors[cardinal].left + (cardinal === 'east' ? 10 : -10),
            y: shape.anchors[cardinal].top,
          };
          this.updatePath(opts);
        },
      },
    };
    // shape.anchors[cardinal].opacity = 0;
    shape.anchors[cardinal].on('pg:position:modifying', this[linkPoint].handlers.onAnchorPositionModifying);
    shape.anchors[cardinal].on('pg:position:modified', this[linkPoint].handlers.onAnchorPositionModified);

    // Update Link
    const opts = {
      commit: true,
    };
    opts[linkPoint] = {
      x: shape.anchors[cardinal].left + (cardinal === 'east' ? 10 : -10),
      y: shape.anchors[cardinal].top,
    };
    this.updatePath(opts);
  }

  disconnectLink(linkPoint) {
    if (this[linkPoint]) {
      this[linkPoint].shape.anchors[this[linkPoint].anchor].off('pg:position:modifying', this[linkPoint].handlers.onAnchorPositionModifying);
      this[linkPoint].shape.anchors[this[linkPoint].anchor].off('pg:position:modified', this[linkPoint].handlers.onAnchorPositionModified);
      delete this[linkPoint];
    }
  }

  bringToFront() {
    const {
      canvas,
      path,
      arrowHead,
      arrowTail,
    } = this;
    canvas.bringToFront(path);
    canvas.bringToFront(arrowHead);
    canvas.bringToFront(arrowTail);
  }

  setActive(active) {
    const {
      path,
      arrowHead,
      arrowTail,
    } = this;

    if (active) {
      path.set('stroke', '#78befa');
      arrowHead.set('stroke', '#78befa');
      arrowTail.set('stroke', '#78befa');
    } else {
      path.set('stroke', '#999');
      arrowHead.set('stroke', '#999');
      arrowTail.set('stroke', '#999');
    }
  }

  computePathCoords(options) {
    // Magie magie, et vos idées ont du génie !

    const start = {
      x: options.start.x,
      y: options.start.y,
      direction: options.start && options.start.direction ? options.start.direction : this.direction.start,
    };
    const end = {
      x: options.end.x,
      y: options.end.y,
      direction: options.end && options.end.direction ? options.end.direction : this.direction.end,
    };

    // Center point
    // If Link is connected, center is calculated between the two linked shapes
    // If not, it is calculated between link start and end points
    const center = {
      x: ((start.x + end.x) / 2),
      y: ((start.y + end.y) / 2),
    };

    // COMMENTED: Doesn't work well when linked shape is rotated
    // if (this.start && this.end && start.direction !== end.direction) {
    //   center = {
    //     x: (this.start.shape.getCenterPoint().x + this.end.shape.getCenterPoint().x) / 2,
    //     y: (this.start.shape.getCenterPoint().y + this.end.shape.getCenterPoint().y) / 2,
    //   };
    // }

    const controls = {
      start: {
        x: start.x,
        y: start.y,
      },
      end: {
        x: end.x,
        y: end.y,
      },
      center1: {
        x: center.x,
        y: center.y,
      },
      center2: {
        x: center.x,
        y: center.y,
      },
    };
    switch (options.start.direction) {
      case 'north':
        controls.start.y -= Math.abs(start.y - center.y);
        break;
      case 'south':
        controls.start.y += Math.abs(start.y - center.y);
        break;
      case 'east':
        controls.start.x += Math.abs(start.x - center.x);
        break;
      case 'west':
      default:
        controls.start.x -= Math.abs(start.x - center.x);
        break;
    }
    switch (options.end.direction) {
      case 'north':
        controls.end.y -= Math.abs(end.y - center.y);
        break;
      case 'south':
        controls.end.y += Math.abs(end.y - center.y);
        break;
      case 'east':
        controls.end.x += Math.abs(end.x - center.x);
        break;
      case 'west':
      default:
        controls.end.x -= Math.abs(end.x - center.x);
        break;
    }

    if (start.direction === end.direction) {
      // const deltaX = Math.abs(start.x - end.x) / 2;
      // const deltaY = Math.abs(start.y - end.y) / 2;
      // const deltaX = 40 + Math.abs(start.x - end.x) / 4;
      // const deltaY = 40 + Math.abs(start.y - end.y) / 4;
      const deltaX = 40;
      const deltaY = 40;

      if (start.direction === 'south' || start.direction === 'north') {
        // If link is connected to two shapes
        // If shapes are horizontally aligned (i.e. on top of each other), we move the Link center point a bit to the left
        if (this.start && this.end) {
          // If shapes are vertically aligned (i.e. next to each other), we move the Link center point a bit to the top
          if (Math.abs(start.y - end.y) < 10) {
            center.x -= ((this.start.shape.width + this.end.shape.width) / 2);
          }
        }

        center.y += (start.direction === 'south' ? deltaY : -deltaY);
        controls.start.y = start.y + (start.direction === 'south' ? deltaY : -deltaY);
        controls.end.y = end.y + (start.direction === 'south' ? deltaY : -deltaY);
        controls.center1.x = center.x;
        controls.center2.x = center.x;
        controls.center1.y = controls.start.y;
        controls.center2.y = controls.end.y;
      } else if (start.direction === 'east' || start.direction === 'west') {
        // If link is connected to two shapes
        if (this.start && this.end) {
          // If shapes are vertically aligned (i.e. next to each other), we move the Link center point a bit to the top
          if (Math.abs(start.y - end.y) < 10) {
            center.y -= ((this.start.shape.height + this.end.shape.height) / 2);
          }
        }

        center.x += (start.direction === 'east' ? deltaX : -deltaX);
        controls.start.x = start.x + (start.direction === 'east' ? deltaX : -deltaX);
        controls.end.x = end.x + (start.direction === 'east' ? deltaX : -deltaX);
        controls.center1.x = controls.start.x;
        controls.center2.x = controls.end.x;
        controls.center1.y = center.y;
        controls.center2.y = center.y;
      }
    } else if (start.direction === 'south' || start.direction === 'north') {
      controls.center1.x = center.x;
      controls.center1.y = controls.start.y;
      controls.center2.x = center.x;
      controls.center2.y = controls.end.y;
    } else if (start.direction === 'east' || start.direction === 'west') {
      controls.center1.x = controls.start.x;
      controls.center1.y = center.y;
      controls.center2.x = controls.end.x;
      controls.center2.y = center.y;
    }

    // If link is connected to linked shapes and they are rotated, perform the rotation on the controls points
    // TODO: to improve
    if (this.start && this.start.shape && this.start.shape.angle) {
      const angle = ((this.start.shape.angle * Math.PI) / 180);

      const control = new fabric.Point(controls.start.x, controls.start.y);
      const origin = new fabric.Point(start.x, start.y);
      const rotatedControl = fabric.util.rotatePoint(control, origin, angle);

      controls.start.x = rotatedControl.x;
      controls.start.y = rotatedControl.y;
    }
    if (this.end && this.end.shape && this.end.shape.angle) {
      const angle = ((this.end.shape.angle * Math.PI) / 180);

      const control = new fabric.Point(controls.end.x, controls.end.y);
      const origin = new fabric.Point(end.x, end.y);
      const rotatedControl = fabric.util.rotatePoint(control, origin, angle);

      controls.end.x = rotatedControl.x;
      controls.end.y = rotatedControl.y;
    }

    // Visual debug
    // this.canvas.add(new fabric.Circle({
    //   objectCaching: false,
    //   left: controls.end.x,
    //   top: controls.end.y,
    //   strokeWidth: 1,
    //   radius: 2,
    //   fill: '#78befa',
    //   stroke: '#78befa',
    //   originX: 'center',
    //   originY: 'center',
    //   hasBorders: false,
    //   hasControls: false,
    //   selectable: true,
    //   opacity: 1,
    // }));
    // this.canvas.add(new fabric.Circle({
    //   objectCaching: false,
    //   left: center.x,
    //   top: center.y,
    //   strokeWidth: 1,
    //   radius: 2,
    //   fill: '#ff2',
    //   stroke: '#ff2',
    //   originX: 'center',
    //   originY: 'center',
    //   hasBorders: false,
    //   hasControls: false,
    //   selectable: true,
    //   opacity: 1,
    // }));
    // this.canvas.add(new fabric.Circle({
    //   objectCaching: false,
    //   left: controls.start.x,
    //   top: controls.start.y,
    //   strokeWidth: 1,
    //   radius: 2,
    //   fill: '#f22',
    //   stroke: '#f22',
    //   originX: 'center',
    //   originY: 'center',
    //   hasBorders: false,
    //   hasControls: false,
    //   selectable: true,
    //   opacity: 1,
    // }));

    const coords = {
      start: {
        x: start.x,
        y: start.y,
      },
      end: {
        x: end.x,
        y: end.y,
      },
      center,
      controls: {
        start: {
          x: controls.start.x,
          y: controls.start.y,
        },
        end: {
          x: controls.end.x,
          y: controls.end.y,
        },
        center1: {
          x: controls.center1.x,
          y: controls.center1.y,
        },
        center2: {
          x: controls.center2.x,
          y: controls.center2.y,
        },
      },
    };
    const pathCoordsArray = [
      ['M', coords.start.x, coords.start.y],
      ['C', coords.controls.start.x, coords.controls.start.y, coords.controls.center1.x, coords.controls.center1.y, coords.center.x, coords.center.y],
      ['C', coords.controls.center2.x, coords.controls.center2.y, coords.controls.end.x, coords.controls.end.y, coords.end.x, coords.end.y],
    ];
    return {
      pathCoords: coords,
      pathCoordsArray,
    };
  }

  /**
   *
   * @param options
   * @param options.start.x
   * @param options.start.y
   * @param options.end.x
   * @param options.end.y
   * @param options.commit
   */
  updatePath(options) {
    const start = {
      x: options.start && options.start.x ? options.start.x : this.path.path[0][1],
      y: options.start && options.start.y ? options.start.y : this.path.path[0][2],
      direction: options.start && options.start.direction ? options.start.direction : this.direction.start,
    };
    const end = {
      x: options.end && options.end.x ? options.end.x : this.path.path[2][5],
      y: options.end && options.end.y ? options.end.y : this.path.path[2][6],
      direction: options.end && options.end.direction ? options.end.direction : this.direction.end,
    };
    const { pathCoordsArray } = this.computePathCoords({
      start, end,
    });

    if (options.commit) {
      const newPath = new fabric.Path(pathCoordsArray, this.defaultPathOptions);
      this.canvas.remove(this.path);
      this.canvas.add(newPath);

      newPath.on('mousedown', this.bringToFront.bind(this));
      newPath.on('moving', this.onLinkMoving.bind(this));
      newPath.on('moved', this.onLinkMoved.bind(this));

      const toBind = [
        this.arrowHead,
        this.arrowTail,
      ];
      const bossTransform = newPath.calcTransformMatrix();
      const invertedBossTransform = fabric.util.invertTransform(bossTransform);
      toBind.forEach((o) => {
        const desiredTransform = fabric.util.multiplyTransformMatrices(
          invertedBossTransform,
          o.calcTransformMatrix(),
        );
        // eslint-disable-next-line no-param-reassign
        o.relationship = desiredTransform;
      });

      this.path = newPath;
    } else {
      this.path.set('path', pathCoordsArray);
    }

    // Update control lines, arrow heads and tails
    const arrowHeadAngle = (Math.atan2(this.path.path[2][6] - this.path.path[2][4], this.path.path[2][5] - this.path.path[2][3]) * 180) / Math.PI;
    this.arrowHead.angle = arrowHeadAngle + 90;
    this.arrowHead.left = this.path.path[2][5];
    this.arrowHead.top = this.path.path[2][6];
    this.arrowHead.setCoords();
    this.arrowTail.left = this.path.path[0][1];
    this.arrowTail.top = this.path.path[0][2];
    this.arrowTail.setCoords();

    this.bringToFront();
  }

  isValidConnection(linkPoint, shapeId, cardinal) {
    const shape = this.canvas.getObjects()
      .find((o) => o.id === shapeId);
    // Check not already connected
    if (linkPoint === 'start') {
      if (this.start && this.start.shape && this.start.shape.id === shape.id && this.start.cardinal === cardinal) {
        return false; // trying end set the same already connected anchor
      }
      if (this.end && this.end.shape && this.end.shape.id === shape.id) {
        return false; // trying end short circuit the rectangle
      }
    } else if (linkPoint === 'end') {
      if (this.end && this.end.shape && this.end.shape.id === shape.id && this.end.cardinal === cardinal) {
        return false; // trying end set the same already connected anchor
      }
      if (this.start && this.start.shape && this.start.shape.id === shape.id) {
        return false; // trying end short circuit the rectangle
      }
    }
    return true;
  }

  toggleAllAnchorsOpacity(opacity) {
    return;

    // eslint-disable-next-line no-unreachable
    const anchors = this.canvas.getObjects()
      .filter((o) => o.type === 'anchor');

    // const promises = [];
    // const promiseFactory = function (anchor) {
    //   return function (resolve) {
    //     anchor.animate('opacity', opacity, {
    //       duration: 300,
    //       onChange: resolve,
    //     });
    //   };
    // };
    // for (let a = 0; a < anchors.length; a += 1) {
    //   if (lock !== undefined) anchors[a].lockOpacity = lock;
    //   promises.push(new Promise(promiseFactory(anchors[a])));
    // }
    // Promise.all(promises).then(() => {
    //   this.canvas.renderAll();
    // });

    for (let a = 0; a < anchors.length; a += 1) {
      // if (lock !== undefined) anchors[a].lockOpacity = lock;
      anchors[a].set('opacity', opacity);
    }
    this.canvas.renderAll();
  }

  onLinkMoving() {
    // Move start, end, control points altogether with the Path
    const toUpdate = [
      this.arrowHead,
      this.arrowTail,
    ];

    const keepHeadAngle = this.arrowHead.angle;
    const keepTailAngle = this.arrowTail.angle;

    toUpdate.forEach((o) => {
      if (!o.relationship) {
        return;
      }
      const { relationship } = o;
      const newTransform = fabric.util.multiplyTransformMatrices(
        this.path.calcTransformMatrix(),
        relationship,
      );
      const opt = fabric.util.qrDecompose(newTransform);
      o.set({
        flipX: false,
        flipY: false,
      });
      o.setPositionByOrigin(
        { x: opt.translateX, y: opt.translateY },
        'center',
        'center',
      );
      o.set(opt);
      // eslint-disable-next-line no-param-reassign
      o.angle = (o === this.arrowHead) ? keepHeadAngle : keepTailAngle; // preserve previous angle

      o.setCoords();
    });

    // Finally, check the start or end points can be connected.
    this._checkExtremityCanBeConnected('start');
    this._checkExtremityCanBeConnected('end');
  }

  onLinkMoved() {
    // Reupdate the Path according end the new coordinates of all elements
    this.updatePath({
      start: {
        x: this.arrowTail.left,
        y: this.arrowTail.top,
      },
      end: {
        x: this.arrowHead.left,
        y: this.arrowHead.top,
      },
      commit: true,
    });

    // Connect or Disconnect depending on extremities positions
    this.isValidTailConnectionMask.set('opacity', 0);
    this.isValidHeadConnectionMask.set('opacity', 0);
    this._connectDisconnectExtremity('start');
    this._connectDisconnectExtremity('end');
  }

  /**
   * Helper end display a valid circle mask on specific conditions.
   * If the extremity is touching an anchor of a LinkableShape start which it is not yet connected => show GREEN
   * If the extremity is touching an anchor of a LinkableShape start which it is already connected by the other extremity => show RED
   * @param direction
   * @private
   */
  _checkExtremityCanBeConnected(direction) {
    const { canvas } = this;

    let extremity;
    let mask;
    if (direction === 'start') {
      extremity = this.arrowTail;
      mask = this.isValidTailConnectionMask;
    } else if (direction === 'end') {
      extremity = this.arrowHead;
      mask = this.isValidHeadConnectionMask;
    }

    mask.left = extremity.left;
    mask.top = extremity.top;
    mask.setCoords();
    mask.set('opacity', 0);

    // Check if intersects with anchor
    const anchors = canvas.getObjects()
      .filter((o) => o.type === 'anchor');
    for (let a = 0; a < anchors.length; a += 1) {
      if (extremity.intersectsWithObject(anchors[a])) {
        mask.set('opacity', 0.5);
        if (this.isValidConnection(direction, anchors[a].shapeId, anchors[a].cardinal)) {
          mask.set({
            stroke: '#57b857',
            fill: '#57b857',
          });
          const opts = {
            commit: false,
          };
          opts[direction] = {
            x: extremity.left,
            y: extremity.top,
            direction: anchors[a].cardinal,
          };
          this.updatePath(opts);
        } else {
          mask.set({
            stroke: '#ea4f37',
            fill: '#ea4f37',
          });
        }
      }
    }
  }

  /**
   * Helper end execute connect/disconnect depending on specific conditions.
   * If the extremity was connected AND it is NOT touching the anchor anymore => disconnect it.
   * If the extremity was disconnected AND it is touching the anchor => connect it.
   * @param direction
   * @private
   */
  _connectDisconnectExtremity(direction) {
    const { canvas } = this;

    let extremity;
    if (direction === 'start') {
      extremity = this.arrowTail;
    } else if (direction === 'end') {
      extremity = this.arrowHead;
    }

    // Check if intersects with anchor
    const anchors = canvas.getObjects()
      .filter((o) => o.type === 'anchor');
    for (let a = 0; a < anchors.length; a += 1) {
      if (extremity.intersectsWithObject(anchors[a])) {
        this.connectLink(direction, anchors[a].shapeId, anchors[a].cardinal);
        // anchors[a].set('stroke', '#000');
      } else if (this[direction] && anchors[a] === this[direction].shape.anchors[this[direction].anchor]) {
        // If this link was connected end this anchor and it doesn't intersect anymore
        this.disconnectLink(direction);
      }
    }
  }
}
