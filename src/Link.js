const { fabric } = window;

export default class Link {
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
   * @param {Number}          [options.end.x] - X axis coordinate of the end point
   * @param {Number}          [options.end.y] - Y axis coordinate of the end point
   * @param {Object}          [options.custom] - Options end customize the different shapes of the Link
   *
   * @param {Object}          [options.custom.path] - bezier quadratic curve
   * @param {Object}          [options.custom.controlPoint] - bezier quadratic curve control point
   * @param {Line}            [options.custom.controlLine] - visual lines start the control point end the start&end points
   * @param {Object}          [options.custom.startPoint] - aka arrowTail
   * @param {Object}          [options.custom.endPoint] - aka arrowHead
   */
  constructor(options) {
    const {
      id,
      canvas,
    } = options;
    const x1 = options && options.start && options.start.x ? options.start.x : 0;
    const y1 = options && options.start && options.start.y ? options.start.y : 0;
    const x2 = options && options.end && options.end.x ? options.end.x : 0;
    const y2 = options && options.end && options.end.y ? options.end.y : 0;
    this.id = id;
    this.canvas = canvas;

    // Path, a bezier quadratic curve
    const pathCoords = {
      M: {
        x: x1, // start x
        y: y1, // start y
      },
      Q: {
        x1: (x1 + x2) / 2, // control x
        y1: (y1 + y2) / 2, // control y
        x2, // end x
        y2, // end y
      },
    };
    const pathOpts = this.defaultPathOptions = {
      fill: '',
      stroke: (options.custom && options.custom.path && options.custom.path.strokeWidth) ? options.custom.path.stroke : '#000',
      strokeWidth: (options.custom && options.custom.path && options.custom.path.strokeWidth) ? options.custom.path.strokeWidth : 2,
      objectCaching: false,
      selectable: true,
      hasBorders: true,
      hasControls: false,
      perPixelTargetFind: true,
    };
    const pathStr = `M ${pathCoords.M.x} ${pathCoords.M.y} Q ${pathCoords.Q.x1}, ${pathCoords.Q.y1}, ${pathCoords.Q.x2}, ${pathCoords.Q.y2}`;
    const path = new fabric.Path(pathStr, pathOpts);
    this.path = path;

    // Control point and lines for the quadratic curve
    const controlPoint = this.controlPoint = new fabric.Circle({
      objectCaching: false,
      left: pathCoords.Q.x1,
      top: pathCoords.Q.y1,
      strokeWidth: 1,
      radius: 6,
      fill: '#78befa',
      stroke: '#78befa',
      originX: 'center',
      originY: 'center',
      hasBorders: false,
      hasControls: false,
      selectable: true,
      opacity: 0,
    });
    controlPoint.on('mouseover', this.onLinkMouseOver.bind(this));
    controlPoint.on('mouseout', this.onLinkMouseOut.bind(this));
    controlPoint.on('moving', () => {
      this.updatePath('control', this.controlPoint.left, this.controlPoint.top, false);
    });
    controlPoint.on('moved', () => {
      this.updatePath('control', this.controlPoint.left, this.controlPoint.top, true);
    });
    controlPoint.on('mousedown', () => {
      this.bringToFront();
    });
    const controlLineOpts = {
      objectCaching: false,
      strokeDashArray: [5, 5],
      strokeWidth: 1,
      stroke: '#78befa',
      selectable: false,
      hasBorders: false,
      hasControls: false,
      evented: false,
      opacity: 0,
    };
    const controlLine1 = this.controlLine1 = new fabric.Line([controlPoint.left, controlPoint.top, x1, y1], controlLineOpts);
    controlLine1.on('mouseover', this.onLinkMouseOver.bind(this));
    controlLine1.on('mouseout', this.onLinkMouseOut.bind(this));
    const controlLine2 = this.controlLine2 = new fabric.Line([controlPoint.left, controlPoint.top, x2, y2], controlLineOpts);
    controlLine2.on('mouseover', this.onLinkMouseOver.bind(this));
    controlLine2.on('mouseout', this.onLinkMouseOut.bind(this));

    // End point (arrowHead)
    const isValidMaskOpts = {
      objectCaching: false,
      left: pathCoords.Q.x2,
      top: pathCoords.Q.y2,
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
      left: pathCoords.Q.x2,
      top: pathCoords.Q.y2,
      strokeWidth: 1,
      fill: '#000',
      opacity: 1,
      stroke: '#000',
      originX: 'center',
      originY: 'center',
      selectable: true,
      hasBorders: false,
      hasControls: false,
    };
    const arrowHead = this.arrowHead = new fabric.Triangle(arrowHeadOpts);
    this.isValidHeadConnectionMask = new fabric.Circle(isValidMaskOpts);
    arrowHead.on('moving', () => {
      this.updatePath('end', arrowHead.left, arrowHead.top, false);
      this._checkExtremityCanBeConnected('end');
    });
    arrowHead.on('moved', () => {
      this.updatePath('end', arrowHead.left, arrowHead.top, true);
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

    // Start point (arrowTail)
    const arrowTailOpts = {
      objectCaching: false,
      width: 10,
      height: 10,
      left: pathCoords.M.x,
      top: pathCoords.M.y,
      strokeWidth: 1,
      fill: '#fff',
      opacity: 1,
      stroke: '#000',
      originX: 'center',
      originY: 'center',
      selectable: true,
      hasBorders: false,
      hasControls: false,
    };
    const arrowTail = this.arrowTail = new fabric.Rect(arrowTailOpts);
    this.isValidTailConnectionMask = new fabric.Circle(isValidMaskOpts);
    arrowTail.on('moving', () => {
      this.updatePath('start', arrowTail.left, arrowTail.top, false);
      this._checkExtremityCanBeConnected('start');
    });
    arrowTail.on('moved', () => {
      this.updatePath('start', arrowTail.left, arrowTail.top, true);
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
  }

  inject() {
    const {
      id,
      canvas,
      path,
      controlPoint,
      controlLine1,
      controlLine2,
      arrowHead,
      arrowTail,
      isValidTailConnectionMask,
      isValidHeadConnectionMask,
    } = this;
    canvas.add(controlPoint);
    canvas.add(controlLine1);
    canvas.add(controlLine2);
    canvas.add(isValidTailConnectionMask);
    canvas.add(isValidHeadConnectionMask);
    canvas.add(arrowHead);
    canvas.add(arrowTail);

    canvas.add(path);
    this.updatePath('start', path.path[0][1], path.path[0][2], true);
    this.updatePath('end', path.path[1][3], path.path[1][4], true);
    this.updatePath('control', path.path[1][1], path.path[1][2], true);

    canvas.links[id] = this;

    return this;
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
    this[linkPoint] = {
      shape,
      anchor: cardinal,
      handlers: {
        onAnchorPositionModifying: () => {
          this.updatePath(linkPoint, shape.anchors[cardinal].left, shape.anchors[cardinal].top, false);
        },
        onAnchorPositionModified: () => {
          this.updatePath(linkPoint, shape.anchors[cardinal].left, shape.anchors[cardinal].top, true);
        },
      },
    };
    // shape.anchors[cardinal].opacity = 0;
    shape.anchors[cardinal].on('pg:position:modifying', this[linkPoint].handlers.onAnchorPositionModifying);
    shape.anchors[cardinal].on('pg:position:modified', this[linkPoint].handlers.onAnchorPositionModified);

    // Update Link
    this.updatePath(linkPoint, shape.anchors[cardinal].left, shape.anchors[cardinal].top, true, false);
  }

  disconnectLink(linkPoint) {
    if (this[linkPoint]) {
      this[linkPoint].shape.anchors[this[linkPoint].anchor].off('pg:position:modifying', this[linkPoint].handlers.onAnchorPositionModifying);
      this[linkPoint].shape.anchors[this[linkPoint].anchor].off('pg:position:modified', this[linkPoint].handlers.onAnchorPositionModified);
      delete this[linkPoint];
    }
  }

  resetCurvature() {
    const {
      controlPoint,
      path,
    } = this;
    controlPoint.left = (path.path[0][1] + path.path[1][3]) / 2;
    controlPoint.top = (path.path[0][2] + path.path[1][4]) / 2;
    controlPoint.setCoords();
    controlPoint.fire('moved');
  }

  bringToFront() {
    const {
      canvas,
      path,
      controlPoint,
      arrowHead,
      arrowTail,
    } = this;
    canvas.bringToFront(path);
    canvas.bringToFront(controlPoint);
    canvas.bringToFront(arrowHead);
    canvas.bringToFront(arrowTail);
  }

  updatePath(linkPoint, x, y, commit, resetCurv) {
    const path = {
      M: {
        x: linkPoint === 'start' ? x : this.path.path[0][1],
        y: linkPoint === 'start' ? y : this.path.path[0][2],
      },
      Q: {
        x1: linkPoint === 'control' ? x : this.path.path[1][1],
        y1: linkPoint === 'control' ? y : this.path.path[1][2],
        x2: linkPoint === 'end' ? x : this.path.path[1][3],
        y2: linkPoint === 'end' ? y : this.path.path[1][4],
      },
    };
    if (commit) {
      const pathStr = `M ${path.M.x} ${path.M.y} Q ${path.Q.x1}, ${path.Q.y1}, ${path.Q.x2}, ${path.Q.y2}`;
      const newPath = new fabric.Path(pathStr, this.defaultPathOptions);
      this.canvas.remove(this.path);
      this.canvas.add(newPath);

      newPath.on('mouseover', this.onLinkMouseOver.bind(this));
      newPath.on('mouseout', this.onLinkMouseOut.bind(this));
      newPath.on('mousedown', this.bringToFront.bind(this));
      newPath.on('moving', this.onLinkMoving.bind(this));
      newPath.on('moved', this.onLinkMoved.bind(this));
      const toBind = [
        this.arrowHead,
        this.arrowTail,
        this.controlPoint,
        this.controlLine1,
        this.controlLine2,
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
      this.path.set('path', [
        ['M', path.M.x, path.M.y],
        ['Q', path.Q.x1, path.Q.y1, path.Q.x2, path.Q.y2],
      ]);
    }

    // Update control lines, arrow heads and tails
    this.controlLine1.set({
      x1: this.controlPoint.left,
      y1: this.controlPoint.top,
      x2: this.path.path[0][1],
      y2: this.path.path[0][2],
    });
    this.controlLine2.set({
      x1: this.controlPoint.left,
      y1: this.controlPoint.top,
      x2: this.path.path[1][3],
      y2: this.path.path[1][4],
    });
    const arrowHeadAngle = (Math.atan2(this.path.path[1][4] - this.path.path[1][2], this.path.path[1][3] - this.path.path[1][1]) * 180) / Math.PI;
    this.arrowHead.angle = arrowHeadAngle + 90;
    this.arrowHead.left = this.path.path[1][3];
    this.arrowHead.top = this.path.path[1][4];
    this.arrowHead.setCoords();
    this.arrowTail.left = this.path.path[0][1];
    this.arrowTail.top = this.path.path[0][2];
    this.arrowTail.setCoords();

    this.bringToFront();

    // Reset control point
    if (resetCurv) {
      this.resetCurvature();
    }
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

  onLinkMouseOver() {
    this.controlPoint.toggleOpacity(1);
    this.controlLine1.toggleOpacity(1);
    this.controlLine2.toggleOpacity(1);
  }

  onLinkMouseOut() {
    this.controlPoint.toggleOpacity(0);
    this.controlLine1.toggleOpacity(0);
    this.controlLine2.toggleOpacity(0);
  }

  onLinkMoving() {
    // Move start, end, control points altogether with the Path
    const toUpdate = [
      this.arrowHead,
      this.arrowTail,
      this.controlPoint,
      this.controlLine1,
      this.controlLine2,
    ];
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
      o.setCoords();
    });

    // Finally, check the start or end points can be connected.
    this._checkExtremityCanBeConnected('start');
    this._checkExtremityCanBeConnected('end');
  }

  onLinkMoved() {
    // Reupdate the Path according end the new coordinates of all elements
    const pathCoords = {
      M: {
        x: this.arrowTail.left,
        y: this.arrowTail.top,
      },
      Q: {
        x1: this.controlPoint.left,
        y1: this.controlPoint.top,
        x2: this.arrowHead.left,
        y2: this.arrowHead.top,
      },
    };
    const pathStr = `M ${pathCoords.M.x} ${pathCoords.M.y} Q ${pathCoords.Q.x1}, ${pathCoords.Q.y1}, ${pathCoords.Q.x2}, ${pathCoords.Q.y2}`;
    const caca = new fabric.Path(pathStr, {});
    this.updatePath('start', caca.path[0][1], caca.path[0][2], false);
    this.updatePath('end', caca.path[1][3], caca.path[1][4], false);
    this.updatePath('control', caca.path[1][1], caca.path[1][2], true);

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
    extremity.set('stroke', '#000');
    for (let a = 0; a < anchors.length; a += 1) {
      if (extremity.intersectsWithObject(anchors[a])) {
        mask.set('opacity', 0.5);
        if (this.isValidConnection(direction, anchors[a].shapeId, anchors[a].cardinal)) {
          mask.set({
            stroke: '#57b857',
            fill: '#57b857',
          });
          extremity.set('stroke', '#5f5');
        } else {
          mask.set({
            stroke: '#ea4f37',
            fill: '#ea4f37',
          });
          extremity.set('stroke', '#ea4f37');
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
        extremity.set('stroke', '#000');
      } else if (this[direction] && anchors[a] === this[direction].shape.anchors[this[direction].anchor]) {
        // If this link was connected end this anchor and it doesn't intersect anymore
        this.disconnectLink(direction);
      }
    }
  }
}
