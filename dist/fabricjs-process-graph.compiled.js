(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _Container = _interopRequireDefault(require("./src/Container.js"));

var _ProcessGraph = _interopRequireDefault(require("./src/ProcessGraph.js"));

var _Link = _interopRequireDefault(require("./src/Link.js"));

var _LinkableShape = _interopRequireDefault(require("./src/LinkableShape.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

window.pg = {
  ProcessGraph: _ProcessGraph["default"],
  Container: _Container["default"],
  Link: _Link["default"],
  LinkableShape: _LinkableShape["default"]
};

},{"./src/Container.js":2,"./src/Link.js":3,"./src/LinkableShape.js":4,"./src/ProcessGraph.js":5}],2:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _LinkableShape2 = _interopRequireDefault(require("./LinkableShape.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _window = window,
    fabric = _window.fabric,
    _ = _window._;

var Container = /*#__PURE__*/function (_LinkableShape) {
  _inherits(Container, _LinkableShape);

  var _super = _createSuper(Container);

  /**
   * A Container is a Rect with an IText. Can be expanded to reveal contained Shapes.
   * @param {Object}          options
   *
   * @param {Fabric.Canvas}   options.canvas - Fabric canvas
   * @param {String}          options.id - Unique identifier
   *
   */
  function Container(options) {
    var _this;

    _classCallCheck(this, Container);

    var rect = new fabric.Rect({
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
      height: 150
    });
    var text = new fabric.IText(options.label, {
      left: rect.width / 2,
      top: rect.height / 2,
      fontSize: 14,
      fontFamily: 'Helvetica',
      textAlign: 'center',
      originX: 'center',
      originY: 'center'
    });
    var group = new fabric.Group([rect, text], {
      left: 0,
      top: 0,
      originX: 'left',
      originY: 'top'
    });

    var newOptions = _.cloneDeep(_.omit(options, ['canvas', 'shape']));

    newOptions.canvas = options.canvas;
    newOptions.shape = group;
    _this = _super.call(this, newOptions);
    group.on({
      scaling: function scaling() {
        // When scaling, keep text same size as initial
        if (group.scaleX < 1) {
          text.scaleX = 1 + (1 - group.scaleX);
        } else {
          text.scaleX = 1 / group.scaleX;
        }

        if (group.scaleY < 1) {
          text.scaleY = 1 + (1 - group.scaleY);
        } else {
          text.scaleY = 1 / group.scaleY;
        }

        _this.canvas.renderAll();
      }
    });
    return _this;
  }

  return Container;
}(_LinkableShape2["default"]);

exports["default"] = Container;

},{"./LinkableShape.js":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _window = window,
    fabric = _window.fabric;

var Link = /*#__PURE__*/function () {
  /**
   * A Link is a Fabric.Path object whose Start and End points can be connected to any anchor of two LinkableShape.
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
   * @param {Object}          [options.custom] - Options to customize the different shapes of the Link
   *
   * @param {Object}          [options.custom.path] - bezier quadratic curve
   * @param {Object}          [options.custom.controlPoint] - bezier quadratic curve control point
   * @param {Line}            [options.custom.controlLine] - visual lines from the control point to the start&end points
   * @param {Object}          [options.custom.startPoint] - aka arrowTail
   * @param {Object}          [options.custom.endPoint] - aka arrowHead
   */
  function Link(options) {
    var _this = this;

    _classCallCheck(this, Link);

    var id = options.id,
        canvas = options.canvas;
    var x1 = options && options.start && options.start.x ? options.start.x : 0;
    var y1 = options && options.start && options.start.y ? options.start.y : 0;
    var x2 = options && options.end && options.end.x ? options.end.x : 0;
    var y2 = options && options.end && options.end.y ? options.end.y : 0;
    this.id = id;
    this.canvas = canvas; // Path, a bezier quadratic curve

    var pathCoords = {
      M: {
        x: x1,
        // from x
        y: y1 // from y

      },
      Q: {
        x1: (x1 + x2) / 2,
        // control x
        y1: (y1 + y2) / 2,
        // control y
        x2: x2,
        // to x
        y2: y2 // to y

      }
    };
    var pathOpts = this.defaultPathOptions = {
      fill: '',
      stroke: options.custom && options.custom.path && options.custom.path.strokeWidth ? options.custom.path.stroke : '#000',
      strokeWidth: options.custom && options.custom.path && options.custom.path.strokeWidth ? options.custom.path.strokeWidth : 2,
      objectCaching: false,
      selectable: true,
      hasBorders: true,
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true,
      perPixelTargetFind: true
    };
    var pathStr = "M ".concat(pathCoords.M.x, " ").concat(pathCoords.M.y, " Q ").concat(pathCoords.Q.x1, ", ").concat(pathCoords.Q.y1, ", ").concat(pathCoords.Q.x2, ", ").concat(pathCoords.Q.y2);
    var path = new fabric.Path(pathStr, pathOpts);
    this.path = path; // Control point and lines for the quadratic curve

    var controlPoint = this.controlPoint = new fabric.Circle({
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
      opacity: 0
    });
    controlPoint.on('mouseover', this.onLinkMouseOver.bind(this));
    controlPoint.on('mouseout', this.onLinkMouseOut.bind(this));
    controlPoint.on('moving', function () {
      _this.updatePath('control', _this.controlPoint.left, _this.controlPoint.top, false);
    });
    controlPoint.on('moved', function () {
      _this.updatePath('control', _this.controlPoint.left, _this.controlPoint.top, true);
    });
    controlPoint.on('mousedown', function () {
      _this.bringToFront();
    });
    var controlLineOpts = {
      strokeDashArray: [5, 5],
      strokeWidth: 1,
      stroke: '#78befa',
      selectable: false,
      hasBorders: false,
      hasControls: false,
      evented: false,
      opacity: 0
    };
    var controlLine1 = this.controlLine1 = new fabric.Line([controlPoint.left, controlPoint.top, x1, y1], controlLineOpts);
    controlLine1.on('mouseover', this.onLinkMouseOver.bind(this));
    controlLine1.on('mouseout', this.onLinkMouseOut.bind(this));
    var controlLine2 = this.controlLine2 = new fabric.Line([controlPoint.left, controlPoint.top, x2, y2], controlLineOpts);
    controlLine2.on('mouseover', this.onLinkMouseOver.bind(this));
    controlLine2.on('mouseout', this.onLinkMouseOut.bind(this)); // Mask for showing if connection is valid

    var isValidMaskOpts = {
      left: pathCoords.Q.x2,
      top: pathCoords.Q.y2,
      strokeWidth: 1,
      radius: 16,
      fill: '#57b857',
      // ea4f37
      stroke: '#57b857',
      originX: 'center',
      originY: 'center',
      hasBorders: false,
      hasControls: false,
      selectable: false,
      opacity: 0
    };
    this.isValidMask = new fabric.Circle(isValidMaskOpts); // End point (arrowHead)

    var arrowHeadOpts = {
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
      hasControls: false
    };
    var arrowHead = this.arrowHead = new fabric.Triangle(arrowHeadOpts);
    arrowHead.on('moving', function () {
      _this.updatePath('to', arrowHead.left, arrowHead.top, false);

      _this.isValidMask.left = arrowHead.left;
      _this.isValidMask.top = arrowHead.top;

      _this.isValidMask.set('opacity', 0); // Check if intersects with anchor


      var anchors = canvas.getObjects().filter(function (o) {
        return o.type === 'anchor';
      });
      arrowHead.set('stroke', '#000');

      for (var a = 0; a < anchors.length; a += 1) {
        if (arrowHead.intersectsWithObject(anchors[a])) {
          _this.isValidMask.set('opacity', 0.5);

          if (_this.isValidConnection('to', anchors[a].shapeId, anchors[a].cardinal)) {
            _this.isValidMask.set({
              stroke: '#57b857',
              fill: '#57b857'
            });

            arrowHead.set('stroke', '#5f5');
          } else {
            _this.isValidMask.set({
              stroke: '#ea4f37',
              fill: '#ea4f37'
            });

            arrowHead.set('stroke', '#ea4f37');
          }
        }
      }
    });
    arrowHead.on('moved', function () {
      _this.updatePath('to', arrowHead.left, arrowHead.top, true);

      _this.isValidMask.set('opacity', 0); // Check if intersects with anchor


      var anchors = canvas.getObjects().filter(function (o) {
        return o.type === 'anchor';
      });

      for (var a = 0; a < anchors.length; a += 1) {
        if (arrowHead.intersectsWithObject(anchors[a])) {
          _this.connectLink('to', anchors[a].shapeId, anchors[a].cardinal);

          arrowHead.set('stroke', '#000');
        } else if (_this.to && anchors[a] === _this.to.shape.anchors[_this.to.anchor]) {
          // If this link was connected to this anchor and it doesn't intersect anymore
          _this.disconnectLink('to');
        }
      }
    });
    arrowHead.on('mousedown', function () {
      _this.bringToFront();

      _this.toggleAllAnchorsOpacity(1);

      arrowHead.on('mouseup', function () {
        _this.toggleAllAnchorsOpacity(0);
      });
    }); // Start point (arrowTail)

    var arrowTailOpts = {
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
      hasControls: false
    };
    var arrowTail = this.arrowTail = new fabric.Rect(arrowTailOpts);
    arrowTail.on('moving', function () {
      _this.updatePath('from', arrowTail.left, arrowTail.top, false);

      _this.isValidMask.left = arrowTail.left;
      _this.isValidMask.top = arrowTail.top;

      _this.isValidMask.set('opacity', 0); // Check if intersects with anchor


      var anchors = canvas.getObjects().filter(function (o) {
        return o.type === 'anchor';
      });
      arrowTail.set('stroke', '#000');

      for (var a = 0; a < anchors.length; a += 1) {
        if (arrowTail.intersectsWithObject(anchors[a])) {
          _this.isValidMask.set('opacity', 0.5);

          if (_this.isValidConnection('from', anchors[a].shapeId, anchors[a].cardinal)) {
            _this.isValidMask.set({
              stroke: '#57b857',
              fill: '#57b857'
            });

            arrowTail.set('stroke', '#5f5');
          } else {
            _this.isValidMask.set({
              stroke: '#ea4f37',
              fill: '#ea4f37'
            });

            arrowTail.set('stroke', '#f55');
          }
        }
      }
    });
    arrowTail.on('moved', function () {
      _this.updatePath('from', arrowTail.left, arrowTail.top, true);

      _this.isValidMask.set('opacity', 0); // Check if intersects with anchor


      var anchors = canvas.getObjects().filter(function (o) {
        return o.type === 'anchor';
      });

      for (var a = 0; a < anchors.length; a += 1) {
        if (arrowTail.intersectsWithObject(anchors[a])) {
          _this.connectLink('from', anchors[a].shapeId, anchors[a].cardinal); // anchors[a].set('stroke', '#000');


          arrowTail.set('stroke', '#000');
        } else if (_this.from && anchors[a] === _this.from.shape.anchors[_this.from.anchor]) {
          // If this link was connected to this anchor and it doesn't intersect anymore
          _this.disconnectLink('from');
        }
      }
    });
    arrowTail.on('mousedown', function () {
      _this.bringToFront();

      _this.toggleAllAnchorsOpacity(1);

      arrowTail.on('mouseup', function () {
        _this.toggleAllAnchorsOpacity(0);
      });
    });
  }

  _createClass(Link, [{
    key: "inject",
    value: function inject() {
      var canvas = this.canvas,
          path = this.path,
          controlPoint = this.controlPoint,
          controlLine1 = this.controlLine1,
          controlLine2 = this.controlLine2,
          arrowHead = this.arrowHead,
          arrowTail = this.arrowTail,
          isValidMask = this.isValidMask;
      canvas.add(controlPoint);
      canvas.add(controlLine1);
      canvas.add(controlLine2);
      canvas.add(isValidMask);
      canvas.add(arrowHead);
      canvas.add(arrowTail);
      canvas.add(path);
      this.updatePath('from', path.path[0][1], path.path[0][2], true);
      this.updatePath('to', path.path[1][3], path.path[1][4], true);
      this.updatePath('control', path.path[1][1], path.path[1][2], true);
      return this;
    }
  }, {
    key: "connectLink",
    value: function connectLink(linkPoint, shapeId, cardinal) {
      var _this2 = this;

      // Check not already connected
      if (!this.isValidConnection(linkPoint, shapeId, cardinal)) {
        return;
      }

      var shape = this.canvas.getObjects().find(function (o) {
        return o.id === shapeId;
      }); // Disconnect existing object

      this.disconnectLink(linkPoint); // Connect

      this[linkPoint] = {
        shape: shape,
        anchor: cardinal,
        handlers: {
          onAnchorPositionModifying: function onAnchorPositionModifying() {
            _this2.updatePath(linkPoint, shape.anchors[cardinal].left, shape.anchors[cardinal].top, false);
          },
          onAnchorPositionModified: function onAnchorPositionModified() {
            _this2.updatePath(linkPoint, shape.anchors[cardinal].left, shape.anchors[cardinal].top, true);
          }
        }
      };
      shape.anchors[cardinal].opacity = 0;
      shape.anchors[cardinal].on('pg:position:modifying', this[linkPoint].handlers.onAnchorPositionModifying);
      shape.anchors[cardinal].on('pg:position:modified', this[linkPoint].handlers.onAnchorPositionModified); // Update Link

      this.updatePath(linkPoint, shape.anchors[cardinal].left, shape.anchors[cardinal].top, true, false);
    }
  }, {
    key: "disconnectLink",
    value: function disconnectLink(linkPoint) {
      if (this[linkPoint]) {
        this[linkPoint].shape.anchors[this[linkPoint].anchor].off('pg:position:modifying', this[linkPoint].handlers.onAnchorPositionModifying);
        this[linkPoint].shape.anchors[this[linkPoint].anchor].off('pg:position:modified', this[linkPoint].handlers.onAnchorPositionModified);
        delete this[linkPoint];
      }
    }
  }, {
    key: "resetCurvature",
    value: function resetCurvature() {
      var controlPoint = this.controlPoint,
          path = this.path;
      controlPoint.left = (path.path[0][1] + path.path[1][3]) / 2;
      controlPoint.top = (path.path[0][2] + path.path[1][4]) / 2;
      controlPoint.fire('moved');
    }
  }, {
    key: "bringToFront",
    value: function bringToFront() {
      var canvas = this.canvas,
          path = this.path,
          controlPoint = this.controlPoint,
          arrowHead = this.arrowHead,
          arrowTail = this.arrowTail;
      canvas.bringToFront(path);
      canvas.bringToFront(controlPoint);
      canvas.bringToFront(arrowHead);
      canvas.bringToFront(arrowTail);
    }
  }, {
    key: "updatePath",
    value: function updatePath(linkPoint, x, y, commit, resetCurv) {
      var path = {
        M: {
          x: linkPoint === 'from' ? x : this.path.path[0][1],
          y: linkPoint === 'from' ? y : this.path.path[0][2]
        },
        Q: {
          x1: linkPoint === 'control' ? x : this.path.path[1][1],
          y1: linkPoint === 'control' ? y : this.path.path[1][2],
          x2: linkPoint === 'to' ? x : this.path.path[1][3],
          y2: linkPoint === 'to' ? y : this.path.path[1][4]
        }
      };

      if (commit) {
        var pathStr = "M ".concat(path.M.x, " ").concat(path.M.y, " Q ").concat(path.Q.x1, ", ").concat(path.Q.y1, ", ").concat(path.Q.x2, ", ").concat(path.Q.y2);
        var newPath = new fabric.Path(pathStr, this.defaultPathOptions);
        this.canvas.remove(this.path);
        this.canvas.add(newPath);
        newPath.on('mouseover', this.onLinkMouseOver.bind(this));
        newPath.on('mouseout', this.onLinkMouseOut.bind(this));
        newPath.on('mousedown', this.bringToFront.bind(this));
        this.path = newPath;
      } else {
        this.path.set('path', [['M', path.M.x, path.M.y], ['Q', path.Q.x1, path.Q.y1, path.Q.x2, path.Q.y2]]);
      } // Update control lines, arrow heads and tails


      this.controlLine1.set({
        x1: this.controlPoint.left,
        y1: this.controlPoint.top,
        x2: this.path.path[0][1],
        y2: this.path.path[0][2]
      });
      this.controlLine2.set({
        x1: this.controlPoint.left,
        y1: this.controlPoint.top,
        x2: this.path.path[1][3],
        y2: this.path.path[1][4]
      });
      var arrowHeadAngle = Math.atan2(this.path.path[1][4] - this.path.path[1][2], this.path.path[1][3] - this.path.path[1][1]) * 180 / Math.PI;
      this.arrowHead.angle = arrowHeadAngle + 90;
      this.arrowHead.left = this.path.path[1][3];
      this.arrowHead.top = this.path.path[1][4];
      this.arrowHead.setCoords();
      this.arrowTail.left = this.path.path[0][1];
      this.arrowTail.top = this.path.path[0][2];
      this.arrowTail.setCoords();
      this.bringToFront(); // Reset control point

      if (resetCurv) {
        this.resetCurvature();
      }
    }
  }, {
    key: "isValidConnection",
    value: function isValidConnection(linkPoint, shapeId, cardinal) {
      var shape = this.canvas.getObjects().find(function (o) {
        return o.id === shapeId;
      }); // Check not already connected

      if (linkPoint === 'from') {
        if (this.from && this.from.shape && this.from.shape.id === shape.id && this.from.cardinal === cardinal) {
          return false; // trying to set the same already connected anchor
        }

        if (this.to && this.to.shape && this.to.shape.id === shape.id) {
          return false; // trying to short circuit the rectangle
        }
      } else if (linkPoint === 'to') {
        if (this.to && this.to.shape && this.to.shape.id === shape.id && this.to.cardinal === cardinal) {
          return false; // trying to set the same already connected anchor
        }

        if (this.from && this.from.shape && this.from.shape.id === shape.id) {
          return false; // trying to short circuit the rectangle
        }
      }

      return true;
    }
  }, {
    key: "toggleAllAnchorsOpacity",
    value: function toggleAllAnchorsOpacity(opacity) {
      var anchors = this.canvas.getObjects().filter(function (o) {
        return o.type === 'anchor';
      });

      for (var a = 0; a < anchors.length; a += 1) {
        anchors[a].toggleOpacity(opacity);
      }
    }
  }, {
    key: "onLinkMouseOver",
    value: function onLinkMouseOver() {
      this.controlPoint.toggleOpacity(1);
      this.controlLine1.toggleOpacity(1);
      this.controlLine2.toggleOpacity(1);
    }
  }, {
    key: "onLinkMouseOut",
    value: function onLinkMouseOut() {
      this.controlPoint.toggleOpacity(0);
      this.controlLine1.toggleOpacity(0);
      this.controlLine2.toggleOpacity(0);
    }
  }]);

  return Link;
}();

exports["default"] = Link;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Link = _interopRequireDefault(require("./Link.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _window = window,
    fabric = _window.fabric;

var LinkableShape = /*#__PURE__*/function () {
  /**
   * A LinkableShape is any Fabric.Object shape on which anchors are appended so that multiple Link can be connected to it.
   * @param {Object}          options
   *
   * @param {Fabric.Canvas}   options.canvas - Fabric canvas
   * @param {String}          options.id - Unique identifier
   *
   */
  function LinkableShape(options) {
    var _this = this;

    _classCallCheck(this, LinkableShape);

    var id = options.id,
        canvas = options.canvas,
        shape = options.shape,
        left = options.left,
        top = options.top,
        angle = options.angle;
    this.options = options;
    this.id = id;
    this.canvas = canvas; // Set shape

    shape.set('type', 'linkableShape');
    shape.set({
      left: left,
      top: top,
      id: id,
      angle: angle
    });
    this.shape = shape; // Show coordinates/angle when moving/rotating object

    var modificationBox = new fabric.Rect({
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
      opacity: 0
    });
    var modificationText = new fabric.Text('0, 0', {
      left: 0,
      top: 0,
      originX: 'center',
      originY: 'center',
      fontFamily: 'Helvetica',
      fontSize: 12,
      borderStrokeWidth: 4,
      evented: false,
      selectable: false,
      opacity: 0
    });
    var modification = this.modBox = new fabric.Group([modificationBox, modificationText], {
      left: 0,
      top: 0,
      originX: 'center',
      originY: 'center',
      evented: false,
      selectable: false
    });

    var onMoving = function onMoving() {
      var _shape$aCoords$tl = shape.aCoords.tl,
          x = _shape$aCoords$tl.x,
          y = _shape$aCoords$tl.y;
      var xCoords = [shape.aCoords.tl.x, shape.aCoords.tr.x, shape.aCoords.bl.x, shape.aCoords.br.x];
      var yCoords = [shape.aCoords.tl.y, shape.aCoords.tr.y, shape.aCoords.bl.y, shape.aCoords.br.y];
      modification.left = (Math.min.apply(Math, xCoords) + Math.max.apply(Math, xCoords)) / 2;
      modification.top = Math.round(Math.max.apply(Math, yCoords) + 30);
      modificationBox.set('opacity', 0.7);
      modificationText.set('opacity', 1);
      modificationText.set('text', "".concat(Math.round(x), ", ").concat(Math.round(y)));
      canvas.bringToFront(modification);
    };

    var onMoved = function onMoved() {
      modificationBox.set('opacity', 0);
      modificationText.set('opacity', 0);
    };

    var onRotating = function onRotating() {
      var xCoords = [shape.aCoords.tl.x, shape.aCoords.tr.x, shape.aCoords.bl.x, shape.aCoords.br.x];
      var yCoords = [shape.aCoords.tl.y, shape.aCoords.tr.y, shape.aCoords.bl.y, shape.aCoords.br.y];
      modification.left = (Math.min.apply(Math, xCoords) + Math.max.apply(Math, xCoords)) / 2;
      modification.top = Math.round(Math.max.apply(Math, yCoords) + 30);
      modificationBox.set('opacity', 0.7);
      modificationText.set('opacity', 1);
      modificationText.set('text', "".concat(Math.round(shape.angle > 180 ? shape.angle - 360 : shape.angle), "\xB0"));
      canvas.bringToFront(modification);
    };

    var onRotated = function onRotated() {
      modificationBox.set('opacity', 0);
      modificationText.set('opacity', 0);
    };

    shape.on({
      moving: onMoving,
      moved: onMoved,
      rotating: onRotating,
      rotated: onRotated
    }); // Anchor points

    var east = this.makeAnchorPoint('east');
    var west = this.makeAnchorPoint('west');
    var north = this.makeAnchorPoint('north');
    var south = this.makeAnchorPoint('south');
    var northeast = this.makeAnchorPoint('northeast');
    var northwest = this.makeAnchorPoint('northwest');
    var southeast = this.makeAnchorPoint('southeast');
    var southwest = this.makeAnchorPoint('southwest');
    this.anchors = this.shape.anchors = {
      east: east,
      west: west,
      north: north,
      south: south,
      northeast: northeast,
      northwest: northwest,
      southeast: southeast,
      southwest: southwest
    }; // Events related to anchors

    shape.on({
      selected: function selected() {
        _this.toggleAnchorsOpacity(0);
      },
      mouseover: function mouseover() {
        if (_this.canvas.getActiveObject() !== _this.shape) {
          _this.toggleAnchorsOpacity(1);
        }
      },
      mouseout: function mouseout() {
        _this.toggleAnchorsOpacity(0);
      },
      moving: function moving() {
        _this.refreshAnchorsPosition(false);
      },
      moved: function moved() {
        _this.refreshAnchorsPosition(true);
      },
      rotating: function rotating() {
        _this.refreshAnchorsPosition(false);
      },
      rotated: function rotated() {
        _this.refreshAnchorsPosition(true);
      },
      scaling: function scaling() {
        _this.refreshAnchorsPosition(false);
      },
      scaled: function scaled() {
        _this.refreshAnchorsPosition(true);
      }
    });
  }

  _createClass(LinkableShape, [{
    key: "inject",
    value: function inject() {
      var canvas = this.canvas,
          shape = this.shape,
          anchors = this.anchors,
          modBox = this.modBox;
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
  }, {
    key: "refreshAnchorsPosition",
    value: function refreshAnchorsPosition(commit) {
      this.setAnchorPositionRelativeToRectangle('east', commit);
      this.setAnchorPositionRelativeToRectangle('west', this.shape, commit);
      this.setAnchorPositionRelativeToRectangle('south', this.shape, commit);
      this.setAnchorPositionRelativeToRectangle('north', this.shape, commit);
      this.setAnchorPositionRelativeToRectangle('northeast', this.shape, commit);
      this.setAnchorPositionRelativeToRectangle('northwest', this.shape, commit);
      this.setAnchorPositionRelativeToRectangle('southeast', this.shape, commit);
      this.setAnchorPositionRelativeToRectangle('southwest', this.shape, commit);
    }
  }, {
    key: "setAnchorPositionRelativeToRectangle",
    value: function setAnchorPositionRelativeToRectangle(cardinal, commit) {
      var left;
      var top;
      var shape = this.shape;
      var ap = this.anchors[cardinal];

      switch (cardinal) {
        case 'east':
          {
            left = (shape.aCoords.tr.x + shape.aCoords.br.x) / 2;
            top = (shape.aCoords.tr.y + shape.aCoords.br.y) / 2;
            break;
          }

        case 'west':
          {
            left = (shape.aCoords.tl.x + shape.aCoords.bl.x) / 2;
            top = (shape.aCoords.tl.y + shape.aCoords.bl.y) / 2;
            break;
          }

        case 'north':
          {
            left = (shape.aCoords.tl.x + shape.aCoords.tr.x) / 2;
            top = (shape.aCoords.tl.y + shape.aCoords.tr.y) / 2;
            break;
          }

        case 'south':
          {
            left = (shape.aCoords.bl.x + shape.aCoords.br.x) / 2;
            top = (shape.aCoords.bl.y + shape.aCoords.br.y) / 2;
            break;
          }

        case 'northeast':
          {
            left = shape.aCoords.tl.x;
            top = shape.aCoords.tl.y;
            break;
          }

        case 'northwest':
          {
            left = shape.aCoords.tr.x;
            top = shape.aCoords.tr.y;
            break;
          }

        case 'southeast':
          {
            left = shape.aCoords.bl.x;
            top = shape.aCoords.bl.y;
            break;
          }

        case 'southwest':
        default:
          {
            left = shape.aCoords.br.x;
            top = shape.aCoords.br.y;
            break;
          }
      }

      ap.left = left;
      ap.top = top;
      ap.fire(commit ? 'pg:position:modified' : 'pg:position:modifying');
    }
  }, {
    key: "toggleAnchorsOpacity",
    value: function toggleAnchorsOpacity(opacity) {
      var _this$anchors = this.anchors,
          east = _this$anchors.east,
          west = _this$anchors.west,
          north = _this$anchors.north,
          south = _this$anchors.south,
          northeast = _this$anchors.northeast,
          southeast = _this$anchors.southeast,
          northwest = _this$anchors.northwest,
          southwest = _this$anchors.southwest;
      east.toggleOpacity(opacity);
      west.toggleOpacity(opacity);
      north.toggleOpacity(opacity);
      south.toggleOpacity(opacity);
      northeast.toggleOpacity(opacity);
      southeast.toggleOpacity(opacity);
      northwest.toggleOpacity(opacity);
      southwest.toggleOpacity(opacity);
    }
  }, {
    key: "makeAnchorPoint",
    value: function makeAnchorPoint(cardinal) {
      var _this2 = this;

      var left;
      var top;
      var shape = this.shape,
          id = this.id;

      switch (cardinal) {
        case 'east':
          {
            left = (shape.aCoords.tr.x + shape.aCoords.br.x) / 2;
            top = (shape.aCoords.tr.y + shape.aCoords.br.y) / 2;
            break;
          }

        case 'west':
          {
            left = (shape.aCoords.tl.x + shape.aCoords.bl.x) / 2;
            top = (shape.aCoords.tl.y + shape.aCoords.bl.y) / 2;
            break;
          }

        case 'north':
          {
            left = (shape.aCoords.tl.x + shape.aCoords.tr.x) / 2;
            top = (shape.aCoords.tl.y + shape.aCoords.tr.y) / 2;
            break;
          }

        case 'south':
          {
            left = (shape.aCoords.bl.x + shape.aCoords.br.x) / 2;
            top = (shape.aCoords.bl.y + shape.aCoords.br.y) / 2;
            break;
          }

        case 'northeast':
          {
            left = shape.aCoords.tl.x;
            top = shape.aCoords.tl.y;
            break;
          }

        case 'northwest':
          {
            left = shape.aCoords.tr.x;
            top = shape.aCoords.tr.y;
            break;
          }

        case 'southeast':
          {
            left = shape.aCoords.bl.x;
            top = shape.aCoords.bl.y;
            break;
          }

        case 'southwest':
        default:
          {
            left = shape.aCoords.br.x;
            top = shape.aCoords.br.y;
            break;
          }
      }

      var ap = new fabric.Circle({
        left: left,
        top: top,
        strokeWidth: 2,
        radius: 6,
        fill: '#78befa',
        // 42a2da d5e8f2
        stroke: '#78befa',
        originX: 'center',
        originY: 'center',
        hasBorders: false,
        hasControls: false,
        selectable: false,
        opacity: 0,
        id: "".concat(id, "_").concat(cardinal)
      });
      ap.type = 'anchor';
      ap.shapeId = id;
      ap.cardinal = cardinal;
      ap.on('mouseover', function () {
        ap.toggleOpacity(1);
      });
      ap.on('mouseout', function () {
        ap.toggleOpacity(0);
      });
      ap.on('mousedblclick', function () {
        var canvas = _this2.canvas;
        var newLink = new _Link["default"]({
          canvas: canvas,
          start: {
            x: ap.left,
            y: ap.top
          },
          end: {
            x: ap.left,
            y: ap.top
          }
        });
        newLink.inject(canvas);
        newLink.connectLink('from', ap.shapeId, ap.cardinal);
        newLink.arrowHead.fire('mousedown');

        var onMouseMove = function onMouseMove(event) {
          newLink.arrowHead.left = event.pointer.x;
          newLink.arrowHead.top = event.pointer.y;
          newLink.arrowHead.fire('moving');
        };

        canvas.on('mouse:move', onMouseMove);

        var onMouseClick = function onMouseClick() {
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
  }]);

  return LinkableShape;
}();

exports["default"] = LinkableShape;

},{"./Link.js":3}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _window = window,
    fabric = _window.fabric;

var ProcessGraph = /*#__PURE__*/function () {
  /**
   *
   * @param options
   *
   * @param {Canvas} options.canvas - FabricJS.Canvas instance - mandatory if options.canvasOpts not provided.
   *
   * @param {Object} options.canvasOpts - FabricJS.Canvas#initialize parameters - mandatory if options.canvas not provided
   *                 See http://fabricjs.com/docs/fabric.Canvas.html#initialize for details
   * @param {HTMLElement|String} options.canvas.el - <canvas> element to initialize instance on
   * @param {Object} options.canvas.options - Options object
   *
   * @param {Number} [options.grid] - dimensions of the grid
   */
  function ProcessGraph(options) {
    _classCallCheck(this, ProcessGraph);

    this.handlers = {
      grid: {}
    }; // Initialize Canvas

    var canvas = this.canvas = options.canvas ? options.canvas : new fabric.Canvas(options.canvasOpts.el, options.canvasOpts.options);
    canvas.set('preserveObjectStacking', true);

    if (typeof options.grid === 'number') {
      this.setGrid({
        grid: options.grid
      });
    } // fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';


    fabric.Object.prototype.toggleOpacity = function (opacity, timeout) {
      this.animate('opacity', opacity, {
        duration: timeout !== undefined ? timeout : 300,
        onChange: this.canvas.renderAll.bind(this.canvas)
      });
    };

    canvas.calcOffset(); // Prevent non LinkableShape objects to be grouped during selection

    var onSelection = function onSelection() {
      var active = canvas.getActiveObject(); // When multi selection, remove any non Linkable Shape objects

      if (active.type === 'activeSelection') {
        var objects = active.getObjects();

        if (objects.length > 1) {
          var onlyRect = objects.filter(function (o) {
            return o.type === 'linkableShape';
          });

          canvas._discardActiveObject();

          var sel = new fabric.ActiveSelection(onlyRect, {
            canvas: canvas
          });

          canvas._setActiveObject(sel); // Update any links connected to the Linkable Shape

        }
      }
    };

    canvas.on({
      'selection:created': onSelection,
      'selection:updated': onSelection
    });
  }
  /**
   * Set canvas to have a grid.
   * @param {Object} options
   * @param {Number} options.grid - grid spacing (pixels)
   */


  _createClass(ProcessGraph, [{
    key: "setGrid",
    value: function setGrid(options) {
      var _this = this;

      if (typeof options.grid !== 'number' || options.grid < 0) {
        throw new Error('Invalid argument "grid" in ProcessGrap#setGrid. (required: Number > 0)');
      }

      this.grid = options.grid;
      var canvas = this.canvas;
      /* eslint-disable no-multi-str */

      var data = "<svg width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\">         <defs>             <pattern id=\"smallGrid\" width=\"".concat(this.grid, "\" height=\"").concat(this.grid, "\" patternUnits=\"userSpaceOnUse\">                 <path d=\"M ").concat(this.grid, " 0 L 0 0 0 ").concat(this.grid, "\" fill=\"none\" stroke=\"gray\" stroke-width=\"0.5\" />             </pattern>             <pattern id=\"grid\" width=\"").concat(this.grid * 5, "\" height=\"").concat(this.grid * 5, "\" patternUnits=\"userSpaceOnUse\">                 <rect width=\"").concat(this.grid * 5, "\" height=\"").concat(this.grid * 5, "\" fill=\"url(#smallGrid)\" />                 <path d=\"M ").concat(this.grid * 5, " 0 L 0 0 0 ").concat(this.grid * 5, "\" fill=\"none\" stroke=\"gray\" stroke-width=\"1\" />             </pattern>         </defs>         <rect width=\"100%\" height=\"100%\" fill=\"url(#grid)\" />     </svg>");
      /* eslint-enable no-multi-str */

      var DOMURL = window.URL || window.webkitURL || window;
      var svg = new Blob([data], {
        type: 'image/svg+xml;charset=utf-8'
      });
      var url = DOMURL.createObjectURL(svg);
      fabric.util.loadImage(url, function (img) {
        var bg = new fabric.Rect({
          width: canvas.width,
          height: canvas.height,
          evented: false,
          selectable: false
        });
        bg.fill = new fabric.Pattern({
          source: img
        }, function () {
          bg.dirty = true;
          canvas.requestRenderAll();
        });
        bg.canvas = canvas;
        canvas.set('backgroundImage', bg); // Snap to grid effects

        canvas.off(_this.handlers.grid);
        _this.handlers.grid = {
          'object:moving': function objectMoving(event) {
            var grid = _this.grid;
            var target = event.target;

            if (target.type !== 'linkableShape') {
              return;
            }

            event.target.set({
              left: Math.round(event.target.left / grid) * grid,
              top: Math.round(event.target.top / grid) * grid
            });
          },
          'object:scaling': function objectScaling(event) {
            var grid = _this.grid;
            var target = event.target;

            if (target.type !== 'linkableShape') {
              return;
            }

            var w = target.width * target.scaleX;
            var h = target.height * target.scaleY;
            var snap = {
              // Closest snapping points
              top: Math.round(target.top / grid) * grid,
              left: Math.round(target.left / grid) * grid,
              bottom: Math.round((target.top + h) / grid) * grid,
              right: Math.round((target.left + w) / grid) * grid
            };
            var threshold = grid;
            var dist = {
              // Distance from snapping points
              top: Math.abs(snap.top - target.top),
              left: Math.abs(snap.left - target.left),
              bottom: Math.abs(snap.bottom - target.top - h),
              right: Math.abs(snap.right - target.left - w)
            };
            var attrs = {
              scaleX: target.scaleX,
              scaleY: target.scaleY,
              top: target.top,
              left: target.left
            };

            switch (target.__corner) {
              case 'tl':
                if (dist.left < dist.top && dist.left < threshold) {
                  attrs.scaleX = (w - (snap.left - target.left)) / target.width;
                  attrs.scaleY = attrs.scaleX / target.scaleX * target.scaleY;
                  attrs.top = target.top + (h - target.height * attrs.scaleY);
                  attrs.left = snap.left;
                } else if (dist.top < threshold) {
                  attrs.scaleY = (h - (snap.top - target.top)) / target.height;
                  attrs.scaleX = attrs.scaleY / target.scaleY * target.scaleX;
                  attrs.left += w - target.width * attrs.scaleX;
                  attrs.top = snap.top;
                }

                break;

              case 'mt':
                if (dist.top < threshold) {
                  attrs.scaleY = (h - (snap.top - target.top)) / target.height;
                  attrs.top = snap.top;
                }

                break;

              case 'tr':
                if (dist.right < dist.top && dist.right < threshold) {
                  attrs.scaleX = (snap.right - target.left) / target.width;
                  attrs.scaleY = attrs.scaleX / target.scaleX * target.scaleY;
                  attrs.top = target.top + (h - target.height * attrs.scaleY);
                } else if (dist.top < threshold) {
                  attrs.scaleY = (h - (snap.top - target.top)) / target.height;
                  attrs.scaleX = attrs.scaleY / target.scaleY * target.scaleX;
                  attrs.top = snap.top;
                }

                break;

              case 'ml':
                if (dist.left < threshold) {
                  attrs.scaleX = (w - (snap.left - target.left)) / target.width;
                  attrs.left = snap.left;
                }

                break;

              case 'mr':
                if (dist.right < threshold) attrs.scaleX = (snap.right - target.left) / target.width;
                break;

              case 'bl':
                if (dist.left < dist.bottom && dist.left < threshold) {
                  attrs.scaleX = (w - (snap.left - target.left)) / target.width;
                  attrs.scaleY = attrs.scaleX / target.scaleX * target.scaleY;
                  attrs.left = snap.left;
                } else if (dist.bottom < threshold) {
                  attrs.scaleY = (snap.bottom - target.top) / target.height;
                  attrs.scaleX = attrs.scaleY / target.scaleY * target.scaleX;
                  attrs.left += w - target.width * attrs.scaleX;
                }

                break;

              case 'mb':
                if (dist.bottom < threshold) attrs.scaleY = (snap.bottom - target.top) / target.height;
                break;

              case 'br':
              default:
                if (dist.right < dist.bottom && dist.right < threshold) {
                  attrs.scaleX = (snap.right - target.left) / target.width;
                  attrs.scaleY = attrs.scaleX / target.scaleX * target.scaleY;
                } else if (dist.bottom < threshold) {
                  attrs.scaleY = (snap.bottom - target.top) / target.height;
                  attrs.scaleX = attrs.scaleY / target.scaleY * target.scaleX;
                }

                break;
            }

            target.set(attrs);
            target.setCoords();
          }
        };

        if (_this.grid > 0) {
          canvas.on(_this.handlers.grid);
        }
      });
    }
  }]);

  return ProcessGraph;
}();

exports["default"] = ProcessGraph;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsInNyYy9Db250YWluZXIuanMiLCJzcmMvTGluay5qcyIsInNyYy9MaW5rYWJsZVNoYXBlLmpzIiwic3JjL1Byb2Nlc3NHcmFwaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxNQUFNLENBQUMsRUFBUCxHQUFZO0FBQ1YsRUFBQSxZQUFZLEVBQVosd0JBRFU7QUFFVixFQUFBLFNBQVMsRUFBVCxxQkFGVTtBQUdWLEVBQUEsSUFBSSxFQUFKLGdCQUhVO0FBSVYsRUFBQSxhQUFhLEVBQWI7QUFKVSxDQUFaOzs7Ozs7Ozs7Ozs7QUNMQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxjQUFzQixNQUF0QjtBQUFBLElBQVEsTUFBUixXQUFRLE1BQVI7QUFBQSxJQUFnQixDQUFoQixXQUFnQixDQUFoQjs7SUFFcUIsUzs7Ozs7QUFDbkI7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFLHFCQUFZLE9BQVosRUFBcUI7QUFBQTs7QUFBQTs7QUFDbkIsUUFBTSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBWCxDQUFnQjtBQUMzQixNQUFBLElBQUksRUFBRSxDQURxQjtBQUUzQixNQUFBLEdBQUcsRUFBRSxDQUZzQjtBQUczQixNQUFBLE9BQU8sRUFBRSxNQUhrQjtBQUkzQixNQUFBLE9BQU8sRUFBRSxLQUprQjtBQUszQixNQUFBLFdBQVcsRUFBRSxDQUxjO0FBTTNCLE1BQUEsTUFBTSxFQUFFLE1BTm1CO0FBTzNCLE1BQUEsSUFBSSxFQUFFLE1BUHFCO0FBUTNCLE1BQUEsRUFBRSxFQUFFLEVBUnVCO0FBUzNCLE1BQUEsRUFBRSxFQUFFLEVBVHVCO0FBVTNCLE1BQUEsS0FBSyxFQUFFLEdBVm9CO0FBVzNCLE1BQUEsTUFBTSxFQUFFO0FBWG1CLEtBQWhCLENBQWI7QUFhQSxRQUFN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KGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBDb250YWluZXIgZnJvbSAnLi9zcmMvQ29udGFpbmVyLmpzJztcclxuaW1wb3J0IFByb2Nlc3NHcmFwaCBmcm9tICcuL3NyYy9Qcm9jZXNzR3JhcGguanMnO1xyXG5pbXBvcnQgTGluayBmcm9tICcuL3NyYy9MaW5rLmpzJztcclxuaW1wb3J0IExpbmthYmxlU2hhcGUgZnJvbSAnLi9zcmMvTGlua2FibGVTaGFwZS5qcyc7XHJcblxyXG53aW5kb3cucGcgPSB7XHJcbiAgUHJvY2Vzc0dyYXBoLFxyXG4gIENvbnRhaW5lcixcclxuICBMaW5rLFxyXG4gIExpbmthYmxlU2hhcGUsXHJcbn07XHJcbiIsImltcG9ydCBMaW5rYWJsZVNoYXBlIGZyb20gJy4vTGlua2FibGVTaGFwZS5qcyc7XHJcblxyXG5jb25zdCB7IGZhYnJpYywgXyB9ID0gd2luZG93O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGFpbmVyIGV4dGVuZHMgTGlua2FibGVTaGFwZSB7XHJcbiAgLyoqXHJcbiAgICogQSBDb250YWluZXIgaXMgYSBSZWN0IHdpdGggYW4gSVRleHQuIENhbiBiZSBleHBhbmRlZCB0byByZXZlYWwgY29udGFpbmVkIFNoYXBlcy5cclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgb3B0aW9uc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtGYWJyaWMuQ2FudmFzfSAgIG9wdGlvbnMuY2FudmFzIC0gRmFicmljIGNhbnZhc1xyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICBvcHRpb25zLmlkIC0gVW5pcXVlIGlkZW50aWZpZXJcclxuICAgKlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHJlY3QgPSBuZXcgZmFicmljLlJlY3Qoe1xyXG4gICAgICBsZWZ0OiAwLFxyXG4gICAgICB0b3A6IDAsXHJcbiAgICAgIG9yaWdpblg6ICdsZWZ0JyxcclxuICAgICAgb3JpZ2luWTogJ3RvcCcsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICBzdHJva2U6ICcjMDAwJyxcclxuICAgICAgZmlsbDogJyNmZmYnLFxyXG4gICAgICByeDogMTAsXHJcbiAgICAgIHJ5OiAxMCxcclxuICAgICAgd2lkdGg6IDI1MCxcclxuICAgICAgaGVpZ2h0OiAxNTAsXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IHRleHQgPSBuZXcgZmFicmljLklUZXh0KG9wdGlvbnMubGFiZWwsIHtcclxuICAgICAgbGVmdDogcmVjdC53aWR0aCAvIDIsXHJcbiAgICAgIHRvcDogcmVjdC5oZWlnaHQgLyAyLFxyXG4gICAgICBmb250U2l6ZTogMTQsXHJcbiAgICAgIGZvbnRGYW1pbHk6ICdIZWx2ZXRpY2EnLFxyXG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGdyb3VwID0gbmV3IGZhYnJpYy5Hcm91cChbcmVjdCwgdGV4dF0sIHtcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBvcmlnaW5YOiAnbGVmdCcsXHJcbiAgICAgIG9yaWdpblk6ICd0b3AnLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBuZXdPcHRpb25zID0gXy5jbG9uZURlZXAoXy5vbWl0KG9wdGlvbnMsIFsnY2FudmFzJywgJ3NoYXBlJ10pKTtcclxuICAgIG5ld09wdGlvbnMuY2FudmFzID0gb3B0aW9ucy5jYW52YXM7XHJcbiAgICBuZXdPcHRpb25zLnNoYXBlID0gZ3JvdXA7XHJcbiAgICBzdXBlcihuZXdPcHRpb25zKTtcclxuXHJcbiAgICBncm91cC5vbih7XHJcbiAgICAgIHNjYWxpbmc6ICgpID0+IHtcclxuICAgICAgICAvLyBXaGVuIHNjYWxpbmcsIGtlZXAgdGV4dCBzYW1lIHNpemUgYXMgaW5pdGlhbFxyXG4gICAgICAgIGlmIChncm91cC5zY2FsZVggPCAxKSB7XHJcbiAgICAgICAgICB0ZXh0LnNjYWxlWCA9IDEgKyAoMSAtIGdyb3VwLnNjYWxlWCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRleHQuc2NhbGVYID0gMSAvIChncm91cC5zY2FsZVgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZ3JvdXAuc2NhbGVZIDwgMSkge1xyXG4gICAgICAgICAgdGV4dC5zY2FsZVkgPSAxICsgKDEgLSBncm91cC5zY2FsZVkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0ZXh0LnNjYWxlWSA9IDEgLyAoZ3JvdXAuc2NhbGVZKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jYW52YXMucmVuZGVyQWxsKCk7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiY29uc3QgeyBmYWJyaWMgfSA9IHdpbmRvdztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpbmsge1xyXG4gIC8qKlxyXG4gICAqIEEgTGluayBpcyBhIEZhYnJpYy5QYXRoIG9iamVjdCB3aG9zZSBTdGFydCBhbmQgRW5kIHBvaW50cyBjYW4gYmUgY29ubmVjdGVkIHRvIGFueSBhbmNob3Igb2YgdHdvIExpbmthYmxlU2hhcGUuXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIG9wdGlvbnNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7RmFicmljLkNhbnZhc30gICBvcHRpb25zLmNhbnZhcyAtIEZhYnJpYyBjYW52YXNcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgb3B0aW9ucy5pZCAtIFVuaXF1ZSBpZGVudGlmaWVyXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuc3RhcnRdIC0gQ29vcmRpbmF0ZXMgb2YgdGhlIHN0YXJ0IHBvaW50XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIFtvcHRpb25zLnN0YXJ0LnhdIC0gWCBheGlzIGNvb3JkaW5hdGUgb2YgdGhlIHN0YXJ0IHBvaW50XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIFtvcHRpb25zLnN0YXJ0LnldIC0gWSBheGlzIGNvb3JkaW5hdGUgb2YgdGhlIHN0YXJ0IHBvaW50XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIFtvcHRpb25zLmVuZC54XSAtIFggYXhpcyBjb29yZGluYXRlIG9mIHRoZSBlbmQgcG9pbnRcclxuICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgW29wdGlvbnMuZW5kLnldIC0gWSBheGlzIGNvb3JkaW5hdGUgb2YgdGhlIGVuZCBwb2ludFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBbb3B0aW9ucy5jdXN0b21dIC0gT3B0aW9ucyB0byBjdXN0b21pemUgdGhlIGRpZmZlcmVudCBzaGFwZXMgb2YgdGhlIExpbmtcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBbb3B0aW9ucy5jdXN0b20ucGF0aF0gLSBiZXppZXIgcXVhZHJhdGljIGN1cnZlXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLmN1c3RvbS5jb250cm9sUG9pbnRdIC0gYmV6aWVyIHF1YWRyYXRpYyBjdXJ2ZSBjb250cm9sIHBvaW50XHJcbiAgICogQHBhcmFtIHtMaW5lfSAgICAgICAgICAgIFtvcHRpb25zLmN1c3RvbS5jb250cm9sTGluZV0gLSB2aXN1YWwgbGluZXMgZnJvbSB0aGUgY29udHJvbCBwb2ludCB0byB0aGUgc3RhcnQmZW5kIHBvaW50c1xyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBbb3B0aW9ucy5jdXN0b20uc3RhcnRQb2ludF0gLSBha2EgYXJyb3dUYWlsXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLmN1c3RvbS5lbmRQb2ludF0gLSBha2EgYXJyb3dIZWFkXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBpZCxcclxuICAgICAgY2FudmFzLFxyXG4gICAgfSA9IG9wdGlvbnM7XHJcbiAgICBjb25zdCB4MSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5zdGFydCAmJiBvcHRpb25zLnN0YXJ0LnggPyBvcHRpb25zLnN0YXJ0LnggOiAwO1xyXG4gICAgY29uc3QgeTEgPSBvcHRpb25zICYmIG9wdGlvbnMuc3RhcnQgJiYgb3B0aW9ucy5zdGFydC55ID8gb3B0aW9ucy5zdGFydC55IDogMDtcclxuICAgIGNvbnN0IHgyID0gb3B0aW9ucyAmJiBvcHRpb25zLmVuZCAmJiBvcHRpb25zLmVuZC54ID8gb3B0aW9ucy5lbmQueCA6IDA7XHJcbiAgICBjb25zdCB5MiA9IG9wdGlvbnMgJiYgb3B0aW9ucy5lbmQgJiYgb3B0aW9ucy5lbmQueSA/IG9wdGlvbnMuZW5kLnkgOiAwO1xyXG4gICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcblxyXG4gICAgLy8gUGF0aCwgYSBiZXppZXIgcXVhZHJhdGljIGN1cnZlXHJcbiAgICBjb25zdCBwYXRoQ29vcmRzID0ge1xyXG4gICAgICBNOiB7XHJcbiAgICAgICAgeDogeDEsIC8vIGZyb20geFxyXG4gICAgICAgIHk6IHkxLCAvLyBmcm9tIHlcclxuICAgICAgfSxcclxuICAgICAgUToge1xyXG4gICAgICAgIHgxOiAoeDEgKyB4MikgLyAyLCAvLyBjb250cm9sIHhcclxuICAgICAgICB5MTogKHkxICsgeTIpIC8gMiwgLy8gY29udHJvbCB5XHJcbiAgICAgICAgeDIsIC8vIHRvIHhcclxuICAgICAgICB5MiwgLy8gdG8geVxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHBhdGhPcHRzID0gdGhpcy5kZWZhdWx0UGF0aE9wdGlvbnMgPSB7XHJcbiAgICAgIGZpbGw6ICcnLFxyXG4gICAgICBzdHJva2U6IChvcHRpb25zLmN1c3RvbSAmJiBvcHRpb25zLmN1c3RvbS5wYXRoICYmIG9wdGlvbnMuY3VzdG9tLnBhdGguc3Ryb2tlV2lkdGgpID8gb3B0aW9ucy5jdXN0b20ucGF0aC5zdHJva2UgOiAnIzAwMCcsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAob3B0aW9ucy5jdXN0b20gJiYgb3B0aW9ucy5jdXN0b20ucGF0aCAmJiBvcHRpb25zLmN1c3RvbS5wYXRoLnN0cm9rZVdpZHRoKSA/IG9wdGlvbnMuY3VzdG9tLnBhdGguc3Ryb2tlV2lkdGggOiAyLFxyXG4gICAgICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgICAgaGFzQm9yZGVyczogdHJ1ZSxcclxuICAgICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgICBsb2NrTW92ZW1lbnRYOiB0cnVlLFxyXG4gICAgICBsb2NrTW92ZW1lbnRZOiB0cnVlLFxyXG4gICAgICBwZXJQaXhlbFRhcmdldEZpbmQ6IHRydWUsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgcGF0aFN0ciA9IGBNICR7cGF0aENvb3Jkcy5NLnh9ICR7cGF0aENvb3Jkcy5NLnl9IFEgJHtwYXRoQ29vcmRzLlEueDF9LCAke3BhdGhDb29yZHMuUS55MX0sICR7cGF0aENvb3Jkcy5RLngyfSwgJHtwYXRoQ29vcmRzLlEueTJ9YDtcclxuICAgIGNvbnN0IHBhdGggPSBuZXcgZmFicmljLlBhdGgocGF0aFN0ciwgcGF0aE9wdHMpO1xyXG4gICAgdGhpcy5wYXRoID0gcGF0aDtcclxuXHJcbiAgICAvLyBDb250cm9sIHBvaW50IGFuZCBsaW5lcyBmb3IgdGhlIHF1YWRyYXRpYyBjdXJ2ZVxyXG4gICAgY29uc3QgY29udHJvbFBvaW50ID0gdGhpcy5jb250cm9sUG9pbnQgPSBuZXcgZmFicmljLkNpcmNsZSh7XHJcbiAgICAgIGxlZnQ6IHBhdGhDb29yZHMuUS54MSxcclxuICAgICAgdG9wOiBwYXRoQ29vcmRzLlEueTEsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICByYWRpdXM6IDYsXHJcbiAgICAgIGZpbGw6ICcjNzhiZWZhJyxcclxuICAgICAgc3Ryb2tlOiAnIzc4YmVmYScsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgICAgb3BhY2l0eTogMCxcclxuICAgIH0pO1xyXG4gICAgY29udHJvbFBvaW50Lm9uKCdtb3VzZW92ZXInLCB0aGlzLm9uTGlua01vdXNlT3Zlci5iaW5kKHRoaXMpKTtcclxuICAgIGNvbnRyb2xQb2ludC5vbignbW91c2VvdXQnLCB0aGlzLm9uTGlua01vdXNlT3V0LmJpbmQodGhpcykpO1xyXG4gICAgY29udHJvbFBvaW50Lm9uKCdtb3ZpbmcnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aCgnY29udHJvbCcsIHRoaXMuY29udHJvbFBvaW50LmxlZnQsIHRoaXMuY29udHJvbFBvaW50LnRvcCwgZmFsc2UpO1xyXG4gICAgfSk7XHJcbiAgICBjb250cm9sUG9pbnQub24oJ21vdmVkJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhdGgoJ2NvbnRyb2wnLCB0aGlzLmNvbnRyb2xQb2ludC5sZWZ0LCB0aGlzLmNvbnRyb2xQb2ludC50b3AsIHRydWUpO1xyXG4gICAgfSk7XHJcbiAgICBjb250cm9sUG9pbnQub24oJ21vdXNlZG93bicsICgpID0+IHtcclxuICAgICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcclxuICAgIH0pO1xyXG4gICAgY29uc3QgY29udHJvbExpbmVPcHRzID0ge1xyXG4gICAgICBzdHJva2VEYXNoQXJyYXk6IFs1LCA1XSxcclxuICAgICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAgIHN0cm9rZTogJyM3OGJlZmEnLFxyXG4gICAgICBzZWxlY3RhYmxlOiBmYWxzZSxcclxuICAgICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgICAgZXZlbnRlZDogZmFsc2UsXHJcbiAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgY29udHJvbExpbmUxID0gdGhpcy5jb250cm9sTGluZTEgPSBuZXcgZmFicmljLkxpbmUoW2NvbnRyb2xQb2ludC5sZWZ0LCBjb250cm9sUG9pbnQudG9wLCB4MSwgeTFdLCBjb250cm9sTGluZU9wdHMpO1xyXG4gICAgY29udHJvbExpbmUxLm9uKCdtb3VzZW92ZXInLCB0aGlzLm9uTGlua01vdXNlT3Zlci5iaW5kKHRoaXMpKTtcclxuICAgIGNvbnRyb2xMaW5lMS5vbignbW91c2VvdXQnLCB0aGlzLm9uTGlua01vdXNlT3V0LmJpbmQodGhpcykpO1xyXG4gICAgY29uc3QgY29udHJvbExpbmUyID0gdGhpcy5jb250cm9sTGluZTIgPSBuZXcgZmFicmljLkxpbmUoW2NvbnRyb2xQb2ludC5sZWZ0LCBjb250cm9sUG9pbnQudG9wLCB4MiwgeTJdLCBjb250cm9sTGluZU9wdHMpO1xyXG4gICAgY29udHJvbExpbmUyLm9uKCdtb3VzZW92ZXInLCB0aGlzLm9uTGlua01vdXNlT3Zlci5iaW5kKHRoaXMpKTtcclxuICAgIGNvbnRyb2xMaW5lMi5vbignbW91c2VvdXQnLCB0aGlzLm9uTGlua01vdXNlT3V0LmJpbmQodGhpcykpO1xyXG5cclxuICAgIC8vIE1hc2sgZm9yIHNob3dpbmcgaWYgY29ubmVjdGlvbiBpcyB2YWxpZFxyXG4gICAgY29uc3QgaXNWYWxpZE1hc2tPcHRzID0ge1xyXG4gICAgICBsZWZ0OiBwYXRoQ29vcmRzLlEueDIsXHJcbiAgICAgIHRvcDogcGF0aENvb3Jkcy5RLnkyLFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgcmFkaXVzOiAxNixcclxuICAgICAgZmlsbDogJyM1N2I4NTcnLCAvLyBlYTRmMzdcclxuICAgICAgc3Ryb2tlOiAnIzU3Yjg1NycsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgICAgc2VsZWN0YWJsZTogZmFsc2UsXHJcbiAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICB9O1xyXG4gICAgdGhpcy5pc1ZhbGlkTWFzayA9IG5ldyBmYWJyaWMuQ2lyY2xlKGlzVmFsaWRNYXNrT3B0cyk7XHJcblxyXG4gICAgLy8gRW5kIHBvaW50IChhcnJvd0hlYWQpXHJcbiAgICBjb25zdCBhcnJvd0hlYWRPcHRzID0ge1xyXG4gICAgICB3aWR0aDogMTAsXHJcbiAgICAgIGhlaWdodDogMTAsXHJcbiAgICAgIGxlZnQ6IHBhdGhDb29yZHMuUS54MixcclxuICAgICAgdG9wOiBwYXRoQ29vcmRzLlEueTIsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICBmaWxsOiAnIzAwMCcsXHJcbiAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgIHN0cm9rZTogJyMwMDAnLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIHNlbGVjdGFibGU6IHRydWUsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgYXJyb3dIZWFkID0gdGhpcy5hcnJvd0hlYWQgPSBuZXcgZmFicmljLlRyaWFuZ2xlKGFycm93SGVhZE9wdHMpO1xyXG4gICAgYXJyb3dIZWFkLm9uKCdtb3ZpbmcnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aCgndG8nLCBhcnJvd0hlYWQubGVmdCwgYXJyb3dIZWFkLnRvcCwgZmFsc2UpO1xyXG4gICAgICB0aGlzLmlzVmFsaWRNYXNrLmxlZnQgPSBhcnJvd0hlYWQubGVmdDtcclxuICAgICAgdGhpcy5pc1ZhbGlkTWFzay50b3AgPSBhcnJvd0hlYWQudG9wO1xyXG4gICAgICB0aGlzLmlzVmFsaWRNYXNrLnNldCgnb3BhY2l0eScsIDApO1xyXG5cclxuICAgICAgLy8gQ2hlY2sgaWYgaW50ZXJzZWN0cyB3aXRoIGFuY2hvclxyXG4gICAgICBjb25zdCBhbmNob3JzID0gY2FudmFzLmdldE9iamVjdHMoKVxyXG4gICAgICAgIC5maWx0ZXIoKG8pID0+IG8udHlwZSA9PT0gJ2FuY2hvcicpO1xyXG4gICAgICBhcnJvd0hlYWQuc2V0KCdzdHJva2UnLCAnIzAwMCcpO1xyXG4gICAgICBmb3IgKGxldCBhID0gMDsgYSA8IGFuY2hvcnMubGVuZ3RoOyBhICs9IDEpIHtcclxuICAgICAgICBpZiAoYXJyb3dIZWFkLmludGVyc2VjdHNXaXRoT2JqZWN0KGFuY2hvcnNbYV0pKSB7XHJcbiAgICAgICAgICB0aGlzLmlzVmFsaWRNYXNrLnNldCgnb3BhY2l0eScsIDAuNSk7XHJcbiAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkQ29ubmVjdGlvbigndG8nLCBhbmNob3JzW2FdLnNoYXBlSWQsIGFuY2hvcnNbYV0uY2FyZGluYWwpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNWYWxpZE1hc2suc2V0KHtcclxuICAgICAgICAgICAgICBzdHJva2U6ICcjNTdiODU3JyxcclxuICAgICAgICAgICAgICBmaWxsOiAnIzU3Yjg1NycsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBhcnJvd0hlYWQuc2V0KCdzdHJva2UnLCAnIzVmNScpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5pc1ZhbGlkTWFzay5zZXQoe1xyXG4gICAgICAgICAgICAgIHN0cm9rZTogJyNlYTRmMzcnLFxyXG4gICAgICAgICAgICAgIGZpbGw6ICcjZWE0ZjM3JyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGFycm93SGVhZC5zZXQoJ3N0cm9rZScsICcjZWE0ZjM3Jyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGFycm93SGVhZC5vbignbW92ZWQnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aCgndG8nLCBhcnJvd0hlYWQubGVmdCwgYXJyb3dIZWFkLnRvcCwgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuaXNWYWxpZE1hc2suc2V0KCdvcGFjaXR5JywgMCk7XHJcblxyXG4gICAgICAvLyBDaGVjayBpZiBpbnRlcnNlY3RzIHdpdGggYW5jaG9yXHJcbiAgICAgIGNvbnN0IGFuY2hvcnMgPSBjYW52YXMuZ2V0T2JqZWN0cygpXHJcbiAgICAgICAgLmZpbHRlcigobykgPT4gby50eXBlID09PSAnYW5jaG9yJyk7XHJcbiAgICAgIGZvciAobGV0IGEgPSAwOyBhIDwgYW5jaG9ycy5sZW5ndGg7IGEgKz0gMSkge1xyXG4gICAgICAgIGlmIChhcnJvd0hlYWQuaW50ZXJzZWN0c1dpdGhPYmplY3QoYW5jaG9yc1thXSkpIHtcclxuICAgICAgICAgIHRoaXMuY29ubmVjdExpbmsoJ3RvJywgYW5jaG9yc1thXS5zaGFwZUlkLCBhbmNob3JzW2FdLmNhcmRpbmFsKTtcclxuICAgICAgICAgIGFycm93SGVhZC5zZXQoJ3N0cm9rZScsICcjMDAwJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRvICYmIGFuY2hvcnNbYV0gPT09IHRoaXMudG8uc2hhcGUuYW5jaG9yc1t0aGlzLnRvLmFuY2hvcl0pIHtcclxuICAgICAgICAgIC8vIElmIHRoaXMgbGluayB3YXMgY29ubmVjdGVkIHRvIHRoaXMgYW5jaG9yIGFuZCBpdCBkb2Vzbid0IGludGVyc2VjdCBhbnltb3JlXHJcbiAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3RMaW5rKCd0bycpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBhcnJvd0hlYWQub24oJ21vdXNlZG93bicsICgpID0+IHtcclxuICAgICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcclxuICAgICAgdGhpcy50b2dnbGVBbGxBbmNob3JzT3BhY2l0eSgxKTtcclxuXHJcbiAgICAgIGFycm93SGVhZC5vbignbW91c2V1cCcsICgpID0+IHtcclxuICAgICAgICB0aGlzLnRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KDApO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFN0YXJ0IHBvaW50IChhcnJvd1RhaWwpXHJcbiAgICBjb25zdCBhcnJvd1RhaWxPcHRzID0ge1xyXG4gICAgICB3aWR0aDogMTAsXHJcbiAgICAgIGhlaWdodDogMTAsXHJcbiAgICAgIGxlZnQ6IHBhdGhDb29yZHMuTS54LFxyXG4gICAgICB0b3A6IHBhdGhDb29yZHMuTS55LFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgZmlsbDogJyNmZmYnLFxyXG4gICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICBzdHJva2U6ICcjMDAwJyxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgICBoYXNCb3JkZXJzOiBmYWxzZSxcclxuICAgICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGFycm93VGFpbCA9IHRoaXMuYXJyb3dUYWlsID0gbmV3IGZhYnJpYy5SZWN0KGFycm93VGFpbE9wdHMpO1xyXG4gICAgYXJyb3dUYWlsLm9uKCdtb3ZpbmcnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aCgnZnJvbScsIGFycm93VGFpbC5sZWZ0LCBhcnJvd1RhaWwudG9wLCBmYWxzZSk7XHJcbiAgICAgIHRoaXMuaXNWYWxpZE1hc2subGVmdCA9IGFycm93VGFpbC5sZWZ0O1xyXG4gICAgICB0aGlzLmlzVmFsaWRNYXNrLnRvcCA9IGFycm93VGFpbC50b3A7XHJcbiAgICAgIHRoaXMuaXNWYWxpZE1hc2suc2V0KCdvcGFjaXR5JywgMCk7XHJcblxyXG4gICAgICAvLyBDaGVjayBpZiBpbnRlcnNlY3RzIHdpdGggYW5jaG9yXHJcbiAgICAgIGNvbnN0IGFuY2hvcnMgPSBjYW52YXMuZ2V0T2JqZWN0cygpXHJcbiAgICAgICAgLmZpbHRlcigobykgPT4gby50eXBlID09PSAnYW5jaG9yJyk7XHJcbiAgICAgIGFycm93VGFpbC5zZXQoJ3N0cm9rZScsICcjMDAwJyk7XHJcbiAgICAgIGZvciAobGV0IGEgPSAwOyBhIDwgYW5jaG9ycy5sZW5ndGg7IGEgKz0gMSkge1xyXG4gICAgICAgIGlmIChhcnJvd1RhaWwuaW50ZXJzZWN0c1dpdGhPYmplY3QoYW5jaG9yc1thXSkpIHtcclxuICAgICAgICAgIHRoaXMuaXNWYWxpZE1hc2suc2V0KCdvcGFjaXR5JywgMC41KTtcclxuICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWRDb25uZWN0aW9uKCdmcm9tJywgYW5jaG9yc1thXS5zaGFwZUlkLCBhbmNob3JzW2FdLmNhcmRpbmFsKSkge1xyXG4gICAgICAgICAgICB0aGlzLmlzVmFsaWRNYXNrLnNldCh7XHJcbiAgICAgICAgICAgICAgc3Ryb2tlOiAnIzU3Yjg1NycsXHJcbiAgICAgICAgICAgICAgZmlsbDogJyM1N2I4NTcnLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYXJyb3dUYWlsLnNldCgnc3Ryb2tlJywgJyM1ZjUnKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNWYWxpZE1hc2suc2V0KHtcclxuICAgICAgICAgICAgICBzdHJva2U6ICcjZWE0ZjM3JyxcclxuICAgICAgICAgICAgICBmaWxsOiAnI2VhNGYzNycsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBhcnJvd1RhaWwuc2V0KCdzdHJva2UnLCAnI2Y1NScpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBhcnJvd1RhaWwub24oJ21vdmVkJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhdGgoJ2Zyb20nLCBhcnJvd1RhaWwubGVmdCwgYXJyb3dUYWlsLnRvcCwgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuaXNWYWxpZE1hc2suc2V0KCdvcGFjaXR5JywgMCk7XHJcblxyXG4gICAgICAvLyBDaGVjayBpZiBpbnRlcnNlY3RzIHdpdGggYW5jaG9yXHJcbiAgICAgIGNvbnN0IGFuY2hvcnMgPSBjYW52YXMuZ2V0T2JqZWN0cygpXHJcbiAgICAgICAgLmZpbHRlcigobykgPT4gby50eXBlID09PSAnYW5jaG9yJyk7XHJcbiAgICAgIGZvciAobGV0IGEgPSAwOyBhIDwgYW5jaG9ycy5sZW5ndGg7IGEgKz0gMSkge1xyXG4gICAgICAgIGlmIChhcnJvd1RhaWwuaW50ZXJzZWN0c1dpdGhPYmplY3QoYW5jaG9yc1thXSkpIHtcclxuICAgICAgICAgIHRoaXMuY29ubmVjdExpbmsoJ2Zyb20nLCBhbmNob3JzW2FdLnNoYXBlSWQsIGFuY2hvcnNbYV0uY2FyZGluYWwpO1xyXG4gICAgICAgICAgLy8gYW5jaG9yc1thXS5zZXQoJ3N0cm9rZScsICcjMDAwJyk7XHJcbiAgICAgICAgICBhcnJvd1RhaWwuc2V0KCdzdHJva2UnLCAnIzAwMCcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5mcm9tICYmIGFuY2hvcnNbYV0gPT09IHRoaXMuZnJvbS5zaGFwZS5hbmNob3JzW3RoaXMuZnJvbS5hbmNob3JdKSB7XHJcbiAgICAgICAgICAvLyBJZiB0aGlzIGxpbmsgd2FzIGNvbm5lY3RlZCB0byB0aGlzIGFuY2hvciBhbmQgaXQgZG9lc24ndCBpbnRlcnNlY3QgYW55bW9yZVxyXG4gICAgICAgICAgdGhpcy5kaXNjb25uZWN0TGluaygnZnJvbScpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBhcnJvd1RhaWwub24oJ21vdXNlZG93bicsICgpID0+IHtcclxuICAgICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcclxuICAgICAgdGhpcy50b2dnbGVBbGxBbmNob3JzT3BhY2l0eSgxKTtcclxuXHJcbiAgICAgIGFycm93VGFpbC5vbignbW91c2V1cCcsICgpID0+IHtcclxuICAgICAgICB0aGlzLnRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KDApO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5qZWN0KCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHBhdGgsXHJcbiAgICAgIGNvbnRyb2xQb2ludCxcclxuICAgICAgY29udHJvbExpbmUxLFxyXG4gICAgICBjb250cm9sTGluZTIsXHJcbiAgICAgIGFycm93SGVhZCxcclxuICAgICAgYXJyb3dUYWlsLFxyXG4gICAgICBpc1ZhbGlkTWFzayxcclxuICAgIH0gPSB0aGlzO1xyXG4gICAgY2FudmFzLmFkZChjb250cm9sUG9pbnQpO1xyXG4gICAgY2FudmFzLmFkZChjb250cm9sTGluZTEpO1xyXG4gICAgY2FudmFzLmFkZChjb250cm9sTGluZTIpO1xyXG4gICAgY2FudmFzLmFkZChpc1ZhbGlkTWFzayk7XHJcbiAgICBjYW52YXMuYWRkKGFycm93SGVhZCk7XHJcbiAgICBjYW52YXMuYWRkKGFycm93VGFpbCk7XHJcblxyXG4gICAgY2FudmFzLmFkZChwYXRoKTtcclxuICAgIHRoaXMudXBkYXRlUGF0aCgnZnJvbScsIHBhdGgucGF0aFswXVsxXSwgcGF0aC5wYXRoWzBdWzJdLCB0cnVlKTtcclxuICAgIHRoaXMudXBkYXRlUGF0aCgndG8nLCBwYXRoLnBhdGhbMV1bM10sIHBhdGgucGF0aFsxXVs0XSwgdHJ1ZSk7XHJcbiAgICB0aGlzLnVwZGF0ZVBhdGgoJ2NvbnRyb2wnLCBwYXRoLnBhdGhbMV1bMV0sIHBhdGgucGF0aFsxXVsyXSwgdHJ1ZSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBjb25uZWN0TGluayhsaW5rUG9pbnQsIHNoYXBlSWQsIGNhcmRpbmFsKSB7XHJcbiAgICAvLyBDaGVjayBub3QgYWxyZWFkeSBjb25uZWN0ZWRcclxuICAgIGlmICghdGhpcy5pc1ZhbGlkQ29ubmVjdGlvbihsaW5rUG9pbnQsIHNoYXBlSWQsIGNhcmRpbmFsKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBzaGFwZSA9IHRoaXMuY2FudmFzLmdldE9iamVjdHMoKVxyXG4gICAgICAuZmluZCgobykgPT4gby5pZCA9PT0gc2hhcGVJZCk7XHJcblxyXG4gICAgLy8gRGlzY29ubmVjdCBleGlzdGluZyBvYmplY3RcclxuICAgIHRoaXMuZGlzY29ubmVjdExpbmsobGlua1BvaW50KTtcclxuXHJcbiAgICAvLyBDb25uZWN0XHJcbiAgICB0aGlzW2xpbmtQb2ludF0gPSB7XHJcbiAgICAgIHNoYXBlLFxyXG4gICAgICBhbmNob3I6IGNhcmRpbmFsLFxyXG4gICAgICBoYW5kbGVyczoge1xyXG4gICAgICAgIG9uQW5jaG9yUG9zaXRpb25Nb2RpZnlpbmc6ICgpID0+IHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlUGF0aChsaW5rUG9pbnQsIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLmxlZnQsIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLnRvcCwgZmFsc2UpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25BbmNob3JQb3NpdGlvbk1vZGlmaWVkOiAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZVBhdGgobGlua1BvaW50LCBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5sZWZ0LCBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS50b3AsIHRydWUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ub3BhY2l0eSA9IDA7XHJcbiAgICBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5vbigncGc6cG9zaXRpb246bW9kaWZ5aW5nJywgdGhpc1tsaW5rUG9pbnRdLmhhbmRsZXJzLm9uQW5jaG9yUG9zaXRpb25Nb2RpZnlpbmcpO1xyXG4gICAgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ub24oJ3BnOnBvc2l0aW9uOm1vZGlmaWVkJywgdGhpc1tsaW5rUG9pbnRdLmhhbmRsZXJzLm9uQW5jaG9yUG9zaXRpb25Nb2RpZmllZCk7XHJcblxyXG4gICAgLy8gVXBkYXRlIExpbmtcclxuICAgIHRoaXMudXBkYXRlUGF0aChsaW5rUG9pbnQsIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLmxlZnQsIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLnRvcCwgdHJ1ZSwgZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgZGlzY29ubmVjdExpbmsobGlua1BvaW50KSB7XHJcbiAgICBpZiAodGhpc1tsaW5rUG9pbnRdKSB7XHJcbiAgICAgIHRoaXNbbGlua1BvaW50XS5zaGFwZS5hbmNob3JzW3RoaXNbbGlua1BvaW50XS5hbmNob3JdLm9mZigncGc6cG9zaXRpb246bW9kaWZ5aW5nJywgdGhpc1tsaW5rUG9pbnRdLmhhbmRsZXJzLm9uQW5jaG9yUG9zaXRpb25Nb2RpZnlpbmcpO1xyXG4gICAgICB0aGlzW2xpbmtQb2ludF0uc2hhcGUuYW5jaG9yc1t0aGlzW2xpbmtQb2ludF0uYW5jaG9yXS5vZmYoJ3BnOnBvc2l0aW9uOm1vZGlmaWVkJywgdGhpc1tsaW5rUG9pbnRdLmhhbmRsZXJzLm9uQW5jaG9yUG9zaXRpb25Nb2RpZmllZCk7XHJcbiAgICAgIGRlbGV0ZSB0aGlzW2xpbmtQb2ludF07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXNldEN1cnZhdHVyZSgpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgY29udHJvbFBvaW50LFxyXG4gICAgICBwYXRoLFxyXG4gICAgfSA9IHRoaXM7XHJcbiAgICBjb250cm9sUG9pbnQubGVmdCA9IChwYXRoLnBhdGhbMF1bMV0gKyBwYXRoLnBhdGhbMV1bM10pIC8gMjtcclxuICAgIGNvbnRyb2xQb2ludC50b3AgPSAocGF0aC5wYXRoWzBdWzJdICsgcGF0aC5wYXRoWzFdWzRdKSAvIDI7XHJcbiAgICBjb250cm9sUG9pbnQuZmlyZSgnbW92ZWQnKTtcclxuICB9XHJcblxyXG4gIGJyaW5nVG9Gcm9udCgpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgY2FudmFzLFxyXG4gICAgICBwYXRoLFxyXG4gICAgICBjb250cm9sUG9pbnQsXHJcbiAgICAgIGFycm93SGVhZCxcclxuICAgICAgYXJyb3dUYWlsLFxyXG4gICAgfSA9IHRoaXM7XHJcbiAgICBjYW52YXMuYnJpbmdUb0Zyb250KHBhdGgpO1xyXG4gICAgY2FudmFzLmJyaW5nVG9Gcm9udChjb250cm9sUG9pbnQpO1xyXG4gICAgY2FudmFzLmJyaW5nVG9Gcm9udChhcnJvd0hlYWQpO1xyXG4gICAgY2FudmFzLmJyaW5nVG9Gcm9udChhcnJvd1RhaWwpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlUGF0aChsaW5rUG9pbnQsIHgsIHksIGNvbW1pdCwgcmVzZXRDdXJ2KSB7XHJcbiAgICBjb25zdCBwYXRoID0ge1xyXG4gICAgICBNOiB7XHJcbiAgICAgICAgeDogbGlua1BvaW50ID09PSAnZnJvbScgPyB4IDogdGhpcy5wYXRoLnBhdGhbMF1bMV0sXHJcbiAgICAgICAgeTogbGlua1BvaW50ID09PSAnZnJvbScgPyB5IDogdGhpcy5wYXRoLnBhdGhbMF1bMl0sXHJcbiAgICAgIH0sXHJcbiAgICAgIFE6IHtcclxuICAgICAgICB4MTogbGlua1BvaW50ID09PSAnY29udHJvbCcgPyB4IDogdGhpcy5wYXRoLnBhdGhbMV1bMV0sXHJcbiAgICAgICAgeTE6IGxpbmtQb2ludCA9PT0gJ2NvbnRyb2wnID8geSA6IHRoaXMucGF0aC5wYXRoWzFdWzJdLFxyXG4gICAgICAgIHgyOiBsaW5rUG9pbnQgPT09ICd0bycgPyB4IDogdGhpcy5wYXRoLnBhdGhbMV1bM10sXHJcbiAgICAgICAgeTI6IGxpbmtQb2ludCA9PT0gJ3RvJyA/IHkgOiB0aGlzLnBhdGgucGF0aFsxXVs0XSxcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgICBpZiAoY29tbWl0KSB7XHJcbiAgICAgIGNvbnN0IHBhdGhTdHIgPSBgTSAke3BhdGguTS54fSAke3BhdGguTS55fSBRICR7cGF0aC5RLngxfSwgJHtwYXRoLlEueTF9LCAke3BhdGguUS54Mn0sICR7cGF0aC5RLnkyfWA7XHJcbiAgICAgIGNvbnN0IG5ld1BhdGggPSBuZXcgZmFicmljLlBhdGgocGF0aFN0ciwgdGhpcy5kZWZhdWx0UGF0aE9wdGlvbnMpO1xyXG4gICAgICB0aGlzLmNhbnZhcy5yZW1vdmUodGhpcy5wYXRoKTtcclxuICAgICAgdGhpcy5jYW52YXMuYWRkKG5ld1BhdGgpO1xyXG5cclxuICAgICAgbmV3UGF0aC5vbignbW91c2VvdmVyJywgdGhpcy5vbkxpbmtNb3VzZU92ZXIuYmluZCh0aGlzKSk7XHJcbiAgICAgIG5ld1BhdGgub24oJ21vdXNlb3V0JywgdGhpcy5vbkxpbmtNb3VzZU91dC5iaW5kKHRoaXMpKTtcclxuICAgICAgbmV3UGF0aC5vbignbW91c2Vkb3duJywgdGhpcy5icmluZ1RvRnJvbnQuYmluZCh0aGlzKSk7XHJcbiAgICAgIHRoaXMucGF0aCA9IG5ld1BhdGg7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhdGguc2V0KCdwYXRoJywgW1xyXG4gICAgICAgIFsnTScsIHBhdGguTS54LCBwYXRoLk0ueV0sXHJcbiAgICAgICAgWydRJywgcGF0aC5RLngxLCBwYXRoLlEueTEsIHBhdGguUS54MiwgcGF0aC5RLnkyXSxcclxuICAgICAgXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVXBkYXRlIGNvbnRyb2wgbGluZXMsIGFycm93IGhlYWRzIGFuZCB0YWlsc1xyXG4gICAgdGhpcy5jb250cm9sTGluZTEuc2V0KHtcclxuICAgICAgeDE6IHRoaXMuY29udHJvbFBvaW50LmxlZnQsXHJcbiAgICAgIHkxOiB0aGlzLmNvbnRyb2xQb2ludC50b3AsXHJcbiAgICAgIHgyOiB0aGlzLnBhdGgucGF0aFswXVsxXSxcclxuICAgICAgeTI6IHRoaXMucGF0aC5wYXRoWzBdWzJdLFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmNvbnRyb2xMaW5lMi5zZXQoe1xyXG4gICAgICB4MTogdGhpcy5jb250cm9sUG9pbnQubGVmdCxcclxuICAgICAgeTE6IHRoaXMuY29udHJvbFBvaW50LnRvcCxcclxuICAgICAgeDI6IHRoaXMucGF0aC5wYXRoWzFdWzNdLFxyXG4gICAgICB5MjogdGhpcy5wYXRoLnBhdGhbMV1bNF0sXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGFycm93SGVhZEFuZ2xlID0gKE1hdGguYXRhbjIodGhpcy5wYXRoLnBhdGhbMV1bNF0gLSB0aGlzLnBhdGgucGF0aFsxXVsyXSwgdGhpcy5wYXRoLnBhdGhbMV1bM10gLSB0aGlzLnBhdGgucGF0aFsxXVsxXSkgKiAxODApIC8gTWF0aC5QSTtcclxuICAgIHRoaXMuYXJyb3dIZWFkLmFuZ2xlID0gYXJyb3dIZWFkQW5nbGUgKyA5MDtcclxuICAgIHRoaXMuYXJyb3dIZWFkLmxlZnQgPSB0aGlzLnBhdGgucGF0aFsxXVszXTtcclxuICAgIHRoaXMuYXJyb3dIZWFkLnRvcCA9IHRoaXMucGF0aC5wYXRoWzFdWzRdO1xyXG4gICAgdGhpcy5hcnJvd0hlYWQuc2V0Q29vcmRzKCk7XHJcbiAgICB0aGlzLmFycm93VGFpbC5sZWZ0ID0gdGhpcy5wYXRoLnBhdGhbMF1bMV07XHJcbiAgICB0aGlzLmFycm93VGFpbC50b3AgPSB0aGlzLnBhdGgucGF0aFswXVsyXTtcclxuICAgIHRoaXMuYXJyb3dUYWlsLnNldENvb3JkcygpO1xyXG5cclxuICAgIHRoaXMuYnJpbmdUb0Zyb250KCk7XHJcblxyXG4gICAgLy8gUmVzZXQgY29udHJvbCBwb2ludFxyXG4gICAgaWYgKHJlc2V0Q3Vydikge1xyXG4gICAgICB0aGlzLnJlc2V0Q3VydmF0dXJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc1ZhbGlkQ29ubmVjdGlvbihsaW5rUG9pbnQsIHNoYXBlSWQsIGNhcmRpbmFsKSB7XHJcbiAgICBjb25zdCBzaGFwZSA9IHRoaXMuY2FudmFzLmdldE9iamVjdHMoKVxyXG4gICAgICAuZmluZCgobykgPT4gby5pZCA9PT0gc2hhcGVJZCk7XHJcbiAgICAvLyBDaGVjayBub3QgYWxyZWFkeSBjb25uZWN0ZWRcclxuICAgIGlmIChsaW5rUG9pbnQgPT09ICdmcm9tJykge1xyXG4gICAgICBpZiAodGhpcy5mcm9tICYmIHRoaXMuZnJvbS5zaGFwZSAmJiB0aGlzLmZyb20uc2hhcGUuaWQgPT09IHNoYXBlLmlkICYmIHRoaXMuZnJvbS5jYXJkaW5hbCA9PT0gY2FyZGluYWwpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIHRyeWluZyB0byBzZXQgdGhlIHNhbWUgYWxyZWFkeSBjb25uZWN0ZWQgYW5jaG9yXHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMudG8gJiYgdGhpcy50by5zaGFwZSAmJiB0aGlzLnRvLnNoYXBlLmlkID09PSBzaGFwZS5pZCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTsgLy8gdHJ5aW5nIHRvIHNob3J0IGNpcmN1aXQgdGhlIHJlY3RhbmdsZVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGxpbmtQb2ludCA9PT0gJ3RvJykge1xyXG4gICAgICBpZiAodGhpcy50byAmJiB0aGlzLnRvLnNoYXBlICYmIHRoaXMudG8uc2hhcGUuaWQgPT09IHNoYXBlLmlkICYmIHRoaXMudG8uY2FyZGluYWwgPT09IGNhcmRpbmFsKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyB0cnlpbmcgdG8gc2V0IHRoZSBzYW1lIGFscmVhZHkgY29ubmVjdGVkIGFuY2hvclxyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLmZyb20gJiYgdGhpcy5mcm9tLnNoYXBlICYmIHRoaXMuZnJvbS5zaGFwZS5pZCA9PT0gc2hhcGUuaWQpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIHRyeWluZyB0byBzaG9ydCBjaXJjdWl0IHRoZSByZWN0YW5nbGVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVBbGxBbmNob3JzT3BhY2l0eShvcGFjaXR5KSB7XHJcbiAgICBjb25zdCBhbmNob3JzID0gdGhpcy5jYW52YXMuZ2V0T2JqZWN0cygpXHJcbiAgICAgIC5maWx0ZXIoKG8pID0+IG8udHlwZSA9PT0gJ2FuY2hvcicpO1xyXG4gICAgZm9yIChsZXQgYSA9IDA7IGEgPCBhbmNob3JzLmxlbmd0aDsgYSArPSAxKSB7XHJcbiAgICAgIGFuY2hvcnNbYV0udG9nZ2xlT3BhY2l0eShvcGFjaXR5KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uTGlua01vdXNlT3ZlcigpIHtcclxuICAgIHRoaXMuY29udHJvbFBvaW50LnRvZ2dsZU9wYWNpdHkoMSk7XHJcbiAgICB0aGlzLmNvbnRyb2xMaW5lMS50b2dnbGVPcGFjaXR5KDEpO1xyXG4gICAgdGhpcy5jb250cm9sTGluZTIudG9nZ2xlT3BhY2l0eSgxKTtcclxuICB9XHJcblxyXG4gIG9uTGlua01vdXNlT3V0KCkge1xyXG4gICAgdGhpcy5jb250cm9sUG9pbnQudG9nZ2xlT3BhY2l0eSgwKTtcclxuICAgIHRoaXMuY29udHJvbExpbmUxLnRvZ2dsZU9wYWNpdHkoMCk7XHJcbiAgICB0aGlzLmNvbnRyb2xMaW5lMi50b2dnbGVPcGFjaXR5KDApO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgTGluayBmcm9tICcuL0xpbmsuanMnO1xyXG5cclxuY29uc3QgeyBmYWJyaWMgfSA9IHdpbmRvdztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpbmthYmxlU2hhcGUge1xyXG4gIC8qKlxyXG4gICAqIEEgTGlua2FibGVTaGFwZSBpcyBhbnkgRmFicmljLk9iamVjdCBzaGFwZSBvbiB3aGljaCBhbmNob3JzIGFyZSBhcHBlbmRlZCBzbyB0aGF0IG11bHRpcGxlIExpbmsgY2FuIGJlIGNvbm5lY3RlZCB0byBpdC5cclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgb3B0aW9uc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtGYWJyaWMuQ2FudmFzfSAgIG9wdGlvbnMuY2FudmFzIC0gRmFicmljIGNhbnZhc1xyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICBvcHRpb25zLmlkIC0gVW5pcXVlIGlkZW50aWZpZXJcclxuICAgKlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgaWQsXHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgc2hhcGUsXHJcbiAgICAgIGxlZnQsXHJcbiAgICAgIHRvcCxcclxuICAgICAgYW5nbGUsXHJcbiAgICB9ID0gb3B0aW9ucztcclxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuXHJcbiAgICAvLyBTZXQgc2hhcGVcclxuICAgIHNoYXBlLnNldCgndHlwZScsICdsaW5rYWJsZVNoYXBlJyk7XHJcbiAgICBzaGFwZS5zZXQoe1xyXG4gICAgICBsZWZ0LCB0b3AsIGlkLCBhbmdsZSxcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zaGFwZSA9IHNoYXBlO1xyXG5cclxuICAgIC8vIFNob3cgY29vcmRpbmF0ZXMvYW5nbGUgd2hlbiBtb3Zpbmcvcm90YXRpbmcgb2JqZWN0XHJcbiAgICBjb25zdCBtb2RpZmljYXRpb25Cb3ggPSBuZXcgZmFicmljLlJlY3Qoe1xyXG4gICAgICBsZWZ0OiAwLFxyXG4gICAgICB0b3A6IDAsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAgIHN0cm9rZTogJyM2NjYnLFxyXG4gICAgICBmaWxsOiAnI2ZmZicsXHJcbiAgICAgIHdpZHRoOiA3MCxcclxuICAgICAgaGVpZ2h0OiAyMCxcclxuICAgICAgdmVudGVkOiBmYWxzZSxcclxuICAgICAgc2VsZWN0YWJsZTogZmFsc2UsXHJcbiAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IG1vZGlmaWNhdGlvblRleHQgPSBuZXcgZmFicmljLlRleHQoJzAsIDAnLCB7XHJcbiAgICAgIGxlZnQ6IDAsXHJcbiAgICAgIHRvcDogMCxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICBmb250RmFtaWx5OiAnSGVsdmV0aWNhJyxcclxuICAgICAgZm9udFNpemU6IDEyLFxyXG4gICAgICBib3JkZXJTdHJva2VXaWR0aDogNCxcclxuICAgICAgZXZlbnRlZDogZmFsc2UsXHJcbiAgICAgIHNlbGVjdGFibGU6IGZhbHNlLFxyXG4gICAgICBvcGFjaXR5OiAwLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBtb2RpZmljYXRpb24gPSB0aGlzLm1vZEJveCA9IG5ldyBmYWJyaWMuR3JvdXAoW21vZGlmaWNhdGlvbkJveCwgbW9kaWZpY2F0aW9uVGV4dF0sIHtcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIGV2ZW50ZWQ6IGZhbHNlLFxyXG4gICAgICBzZWxlY3RhYmxlOiBmYWxzZSxcclxuICAgIH0pO1xyXG4gICAgY29uc3Qgb25Nb3ZpbmcgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHsgeCwgeSB9ID0gc2hhcGUuYUNvb3Jkcy50bDtcclxuICAgICAgY29uc3QgeENvb3JkcyA9IFtzaGFwZS5hQ29vcmRzLnRsLngsIHNoYXBlLmFDb29yZHMudHIueCwgc2hhcGUuYUNvb3Jkcy5ibC54LCBzaGFwZS5hQ29vcmRzLmJyLnhdO1xyXG4gICAgICBjb25zdCB5Q29vcmRzID0gW3NoYXBlLmFDb29yZHMudGwueSwgc2hhcGUuYUNvb3Jkcy50ci55LCBzaGFwZS5hQ29vcmRzLmJsLnksIHNoYXBlLmFDb29yZHMuYnIueV07XHJcbiAgICAgIG1vZGlmaWNhdGlvbi5sZWZ0ID0gKE1hdGgubWluKC4uLnhDb29yZHMpICsgTWF0aC5tYXgoLi4ueENvb3JkcykpIC8gMjtcclxuICAgICAgbW9kaWZpY2F0aW9uLnRvcCA9IE1hdGgucm91bmQoTWF0aC5tYXgoLi4ueUNvb3JkcykgKyAzMCk7XHJcbiAgICAgIG1vZGlmaWNhdGlvbkJveC5zZXQoJ29wYWNpdHknLCAwLjcpO1xyXG4gICAgICBtb2RpZmljYXRpb25UZXh0LnNldCgnb3BhY2l0eScsIDEpO1xyXG4gICAgICBtb2RpZmljYXRpb25UZXh0LnNldCgndGV4dCcsIGAke01hdGgucm91bmQoeCl9LCAke01hdGgucm91bmQoeSl9YCk7XHJcbiAgICAgIGNhbnZhcy5icmluZ1RvRnJvbnQobW9kaWZpY2F0aW9uKTtcclxuICAgIH07XHJcbiAgICBjb25zdCBvbk1vdmVkID0gKCkgPT4ge1xyXG4gICAgICBtb2RpZmljYXRpb25Cb3guc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICAgIG1vZGlmaWNhdGlvblRleHQuc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb25Sb3RhdGluZyA9ICgpID0+IHtcclxuICAgICAgY29uc3QgeENvb3JkcyA9IFtzaGFwZS5hQ29vcmRzLnRsLngsIHNoYXBlLmFDb29yZHMudHIueCwgc2hhcGUuYUNvb3Jkcy5ibC54LCBzaGFwZS5hQ29vcmRzLmJyLnhdO1xyXG4gICAgICBjb25zdCB5Q29vcmRzID0gW3NoYXBlLmFDb29yZHMudGwueSwgc2hhcGUuYUNvb3Jkcy50ci55LCBzaGFwZS5hQ29vcmRzLmJsLnksIHNoYXBlLmFDb29yZHMuYnIueV07XHJcbiAgICAgIG1vZGlmaWNhdGlvbi5sZWZ0ID0gKE1hdGgubWluKC4uLnhDb29yZHMpICsgTWF0aC5tYXgoLi4ueENvb3JkcykpIC8gMjtcclxuICAgICAgbW9kaWZpY2F0aW9uLnRvcCA9IE1hdGgucm91bmQoTWF0aC5tYXgoLi4ueUNvb3JkcykgKyAzMCk7XHJcbiAgICAgIG1vZGlmaWNhdGlvbkJveC5zZXQoJ29wYWNpdHknLCAwLjcpO1xyXG4gICAgICBtb2RpZmljYXRpb25UZXh0LnNldCgnb3BhY2l0eScsIDEpO1xyXG4gICAgICBtb2RpZmljYXRpb25UZXh0LnNldCgndGV4dCcsIGAke01hdGgucm91bmQoc2hhcGUuYW5nbGUgPiAxODAgPyBzaGFwZS5hbmdsZSAtIDM2MCA6IHNoYXBlLmFuZ2xlKX3CsGApO1xyXG4gICAgICBjYW52YXMuYnJpbmdUb0Zyb250KG1vZGlmaWNhdGlvbik7XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb25Sb3RhdGVkID0gKCkgPT4ge1xyXG4gICAgICBtb2RpZmljYXRpb25Cb3guc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICAgIG1vZGlmaWNhdGlvblRleHQuc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICB9O1xyXG4gICAgc2hhcGUub24oe1xyXG4gICAgICBtb3Zpbmc6IG9uTW92aW5nLFxyXG4gICAgICBtb3ZlZDogb25Nb3ZlZCxcclxuICAgICAgcm90YXRpbmc6IG9uUm90YXRpbmcsXHJcbiAgICAgIHJvdGF0ZWQ6IG9uUm90YXRlZCxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEFuY2hvciBwb2ludHNcclxuICAgIGNvbnN0IGVhc3QgPSB0aGlzLm1ha2VBbmNob3JQb2ludCgnZWFzdCcpO1xyXG4gICAgY29uc3Qgd2VzdCA9IHRoaXMubWFrZUFuY2hvclBvaW50KCd3ZXN0Jyk7XHJcbiAgICBjb25zdCBub3J0aCA9IHRoaXMubWFrZUFuY2hvclBvaW50KCdub3J0aCcpO1xyXG4gICAgY29uc3Qgc291dGggPSB0aGlzLm1ha2VBbmNob3JQb2ludCgnc291dGgnKTtcclxuICAgIGNvbnN0IG5vcnRoZWFzdCA9IHRoaXMubWFrZUFuY2hvclBvaW50KCdub3J0aGVhc3QnKTtcclxuICAgIGNvbnN0IG5vcnRod2VzdCA9IHRoaXMubWFrZUFuY2hvclBvaW50KCdub3J0aHdlc3QnKTtcclxuICAgIGNvbnN0IHNvdXRoZWFzdCA9IHRoaXMubWFrZUFuY2hvclBvaW50KCdzb3V0aGVhc3QnKTtcclxuICAgIGNvbnN0IHNvdXRod2VzdCA9IHRoaXMubWFrZUFuY2hvclBvaW50KCdzb3V0aHdlc3QnKTtcclxuICAgIHRoaXMuYW5jaG9ycyA9IHRoaXMuc2hhcGUuYW5jaG9ycyA9IHtcclxuICAgICAgZWFzdCxcclxuICAgICAgd2VzdCxcclxuICAgICAgbm9ydGgsXHJcbiAgICAgIHNvdXRoLFxyXG4gICAgICBub3J0aGVhc3QsXHJcbiAgICAgIG5vcnRod2VzdCxcclxuICAgICAgc291dGhlYXN0LFxyXG4gICAgICBzb3V0aHdlc3QsXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEV2ZW50cyByZWxhdGVkIHRvIGFuY2hvcnNcclxuICAgIHNoYXBlLm9uKHtcclxuICAgICAgc2VsZWN0ZWQ6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnRvZ2dsZUFuY2hvcnNPcGFjaXR5KDApO1xyXG4gICAgICB9LFxyXG4gICAgICBtb3VzZW92ZXI6ICgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5jYW52YXMuZ2V0QWN0aXZlT2JqZWN0KCkgIT09IHRoaXMuc2hhcGUpIHtcclxuICAgICAgICAgIHRoaXMudG9nZ2xlQW5jaG9yc09wYWNpdHkoMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBtb3VzZW91dDogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudG9nZ2xlQW5jaG9yc09wYWNpdHkoMCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG1vdmluZzogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbihmYWxzZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG1vdmVkOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKHRydWUpO1xyXG4gICAgICB9LFxyXG4gICAgICByb3RhdGluZzogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbihmYWxzZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHJvdGF0ZWQ6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnJlZnJlc2hBbmNob3JzUG9zaXRpb24odHJ1ZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHNjYWxpbmc6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnJlZnJlc2hBbmNob3JzUG9zaXRpb24oZmFsc2UpO1xyXG4gICAgICB9LFxyXG4gICAgICBzY2FsZWQ6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnJlZnJlc2hBbmNob3JzUG9zaXRpb24odHJ1ZSk7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGluamVjdCgpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgY2FudmFzLFxyXG4gICAgICBzaGFwZSxcclxuICAgICAgYW5jaG9ycyxcclxuICAgICAgbW9kQm94LFxyXG4gICAgfSA9IHRoaXM7XHJcbiAgICBjYW52YXMuYWRkKHNoYXBlKTtcclxuICAgIGNhbnZhcy5hZGQobW9kQm94KTtcclxuICAgIGNhbnZhcy5hZGQoYW5jaG9ycy5lYXN0KTtcclxuICAgIGNhbnZhcy5icmluZ0ZvcndhcmQoYW5jaG9ycy5lYXN0LCB0cnVlKTtcclxuICAgIGNhbnZhcy5hZGQoYW5jaG9ycy53ZXN0KTtcclxuICAgIGNhbnZhcy5icmluZ0ZvcndhcmQoYW5jaG9ycy53ZXN0LCB0cnVlKTtcclxuICAgIGNhbnZhcy5hZGQoYW5jaG9ycy5ub3J0aCk7XHJcbiAgICBjYW52YXMuYnJpbmdGb3J3YXJkKGFuY2hvcnMubm9ydGgsIHRydWUpO1xyXG4gICAgY2FudmFzLmFkZChhbmNob3JzLnNvdXRoKTtcclxuICAgIGNhbnZhcy5icmluZ0ZvcndhcmQoYW5jaG9ycy5zb3V0aCwgdHJ1ZSk7XHJcbiAgICBjYW52YXMuYWRkKGFuY2hvcnMubm9ydGhlYXN0KTtcclxuICAgIGNhbnZhcy5icmluZ0ZvcndhcmQoYW5jaG9ycy5ub3J0aGVhc3QsIHRydWUpO1xyXG4gICAgY2FudmFzLmFkZChhbmNob3JzLm5vcnRod2VzdCk7XHJcbiAgICBjYW52YXMuYnJpbmdGb3J3YXJkKGFuY2hvcnMubm9ydGh3ZXN0LCB0cnVlKTtcclxuICAgIGNhbnZhcy5hZGQoYW5jaG9ycy5zb3V0aGVhc3QpO1xyXG4gICAgY2FudmFzLmJyaW5nRm9yd2FyZChhbmNob3JzLnNvdXRoZWFzdCwgdHJ1ZSk7XHJcbiAgICBjYW52YXMuYWRkKGFuY2hvcnMuc291dGh3ZXN0KTtcclxuICAgIGNhbnZhcy5icmluZ0ZvcndhcmQoYW5jaG9ycy5zb3V0aHdlc3QsIHRydWUpO1xyXG4gICAgdGhpcy5yZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKHRydWUpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcmVmcmVzaEFuY2hvcnNQb3NpdGlvbihjb21taXQpIHtcclxuICAgIHRoaXMuc2V0QW5jaG9yUG9zaXRpb25SZWxhdGl2ZVRvUmVjdGFuZ2xlKCdlYXN0JywgY29tbWl0KTtcclxuICAgIHRoaXMuc2V0QW5jaG9yUG9zaXRpb25SZWxhdGl2ZVRvUmVjdGFuZ2xlKCd3ZXN0JywgdGhpcy5zaGFwZSwgY29tbWl0KTtcclxuICAgIHRoaXMuc2V0QW5jaG9yUG9zaXRpb25SZWxhdGl2ZVRvUmVjdGFuZ2xlKCdzb3V0aCcsIHRoaXMuc2hhcGUsIGNvbW1pdCk7XHJcbiAgICB0aGlzLnNldEFuY2hvclBvc2l0aW9uUmVsYXRpdmVUb1JlY3RhbmdsZSgnbm9ydGgnLCB0aGlzLnNoYXBlLCBjb21taXQpO1xyXG4gICAgdGhpcy5zZXRBbmNob3JQb3NpdGlvblJlbGF0aXZlVG9SZWN0YW5nbGUoJ25vcnRoZWFzdCcsIHRoaXMuc2hhcGUsIGNvbW1pdCk7XHJcbiAgICB0aGlzLnNldEFuY2hvclBvc2l0aW9uUmVsYXRpdmVUb1JlY3RhbmdsZSgnbm9ydGh3ZXN0JywgdGhpcy5zaGFwZSwgY29tbWl0KTtcclxuICAgIHRoaXMuc2V0QW5jaG9yUG9zaXRpb25SZWxhdGl2ZVRvUmVjdGFuZ2xlKCdzb3V0aGVhc3QnLCB0aGlzLnNoYXBlLCBjb21taXQpO1xyXG4gICAgdGhpcy5zZXRBbmNob3JQb3NpdGlvblJlbGF0aXZlVG9SZWN0YW5nbGUoJ3NvdXRod2VzdCcsIHRoaXMuc2hhcGUsIGNvbW1pdCk7XHJcbiAgfVxyXG5cclxuICBzZXRBbmNob3JQb3NpdGlvblJlbGF0aXZlVG9SZWN0YW5nbGUoY2FyZGluYWwsIGNvbW1pdCkge1xyXG4gICAgbGV0IGxlZnQ7XHJcbiAgICBsZXQgdG9wO1xyXG4gICAgY29uc3QgeyBzaGFwZSB9ID0gdGhpcztcclxuICAgIGNvbnN0IGFwID0gdGhpcy5hbmNob3JzW2NhcmRpbmFsXTtcclxuICAgIHN3aXRjaCAoY2FyZGluYWwpIHtcclxuICAgICAgY2FzZSAnZWFzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMudHIueCArIHNoYXBlLmFDb29yZHMuYnIueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLnRyLnkgKyBzaGFwZS5hQ29vcmRzLmJyLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICd3ZXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSAoc2hhcGUuYUNvb3Jkcy50bC54ICsgc2hhcGUuYUNvb3Jkcy5ibC54KSAvIDI7XHJcbiAgICAgICAgdG9wID0gKHNoYXBlLmFDb29yZHMudGwueSArIHNoYXBlLmFDb29yZHMuYmwueSkgLyAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRoJzoge1xyXG4gICAgICAgIGxlZnQgPSAoc2hhcGUuYUNvb3Jkcy50bC54ICsgc2hhcGUuYUNvb3Jkcy50ci54KSAvIDI7XHJcbiAgICAgICAgdG9wID0gKHNoYXBlLmFDb29yZHMudGwueSArIHNoYXBlLmFDb29yZHMudHIueSkgLyAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRoJzoge1xyXG4gICAgICAgIGxlZnQgPSAoc2hhcGUuYUNvb3Jkcy5ibC54ICsgc2hhcGUuYUNvb3Jkcy5ici54KSAvIDI7XHJcbiAgICAgICAgdG9wID0gKHNoYXBlLmFDb29yZHMuYmwueSArIHNoYXBlLmFDb29yZHMuYnIueSkgLyAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRoZWFzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gc2hhcGUuYUNvb3Jkcy50bC54O1xyXG4gICAgICAgIHRvcCA9IHNoYXBlLmFDb29yZHMudGwueTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aHdlc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IHNoYXBlLmFDb29yZHMudHIueDtcclxuICAgICAgICB0b3AgPSBzaGFwZS5hQ29vcmRzLnRyLnk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnc291dGhlYXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSBzaGFwZS5hQ29vcmRzLmJsLng7XHJcbiAgICAgICAgdG9wID0gc2hhcGUuYUNvb3Jkcy5ibC55O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRod2VzdCc6XHJcbiAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICBsZWZ0ID0gc2hhcGUuYUNvb3Jkcy5ici54O1xyXG4gICAgICAgIHRvcCA9IHNoYXBlLmFDb29yZHMuYnIueTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgYXAubGVmdCA9IGxlZnQ7XHJcbiAgICBhcC50b3AgPSB0b3A7XHJcblxyXG4gICAgYXAuZmlyZShjb21taXQgPyAncGc6cG9zaXRpb246bW9kaWZpZWQnIDogJ3BnOnBvc2l0aW9uOm1vZGlmeWluZycpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlQW5jaG9yc09wYWNpdHkob3BhY2l0eSkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBlYXN0LFxyXG4gICAgICB3ZXN0LFxyXG4gICAgICBub3J0aCxcclxuICAgICAgc291dGgsXHJcbiAgICAgIG5vcnRoZWFzdCxcclxuICAgICAgc291dGhlYXN0LFxyXG4gICAgICBub3J0aHdlc3QsXHJcbiAgICAgIHNvdXRod2VzdCxcclxuICAgIH0gPSB0aGlzLmFuY2hvcnM7XHJcbiAgICBlYXN0LnRvZ2dsZU9wYWNpdHkob3BhY2l0eSk7XHJcbiAgICB3ZXN0LnRvZ2dsZU9wYWNpdHkob3BhY2l0eSk7XHJcbiAgICBub3J0aC50b2dnbGVPcGFjaXR5KG9wYWNpdHkpO1xyXG4gICAgc291dGgudG9nZ2xlT3BhY2l0eShvcGFjaXR5KTtcclxuICAgIG5vcnRoZWFzdC50b2dnbGVPcGFjaXR5KG9wYWNpdHkpO1xyXG4gICAgc291dGhlYXN0LnRvZ2dsZU9wYWNpdHkob3BhY2l0eSk7XHJcbiAgICBub3J0aHdlc3QudG9nZ2xlT3BhY2l0eShvcGFjaXR5KTtcclxuICAgIHNvdXRod2VzdC50b2dnbGVPcGFjaXR5KG9wYWNpdHkpO1xyXG4gIH1cclxuXHJcbiAgbWFrZUFuY2hvclBvaW50KGNhcmRpbmFsKSB7XHJcbiAgICBsZXQgbGVmdDtcclxuICAgIGxldCB0b3A7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHNoYXBlLFxyXG4gICAgICBpZCxcclxuICAgIH0gPSB0aGlzO1xyXG4gICAgc3dpdGNoIChjYXJkaW5hbCkge1xyXG4gICAgICBjYXNlICdlYXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSAoc2hhcGUuYUNvb3Jkcy50ci54ICsgc2hhcGUuYUNvb3Jkcy5ici54KSAvIDI7XHJcbiAgICAgICAgdG9wID0gKHNoYXBlLmFDb29yZHMudHIueSArIHNoYXBlLmFDb29yZHMuYnIueSkgLyAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3dlc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IChzaGFwZS5hQ29vcmRzLnRsLnggKyBzaGFwZS5hQ29vcmRzLmJsLngpIC8gMjtcclxuICAgICAgICB0b3AgPSAoc2hhcGUuYUNvb3Jkcy50bC55ICsgc2hhcGUuYUNvb3Jkcy5ibC55KSAvIDI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnbm9ydGgnOiB7XHJcbiAgICAgICAgbGVmdCA9IChzaGFwZS5hQ29vcmRzLnRsLnggKyBzaGFwZS5hQ29vcmRzLnRyLngpIC8gMjtcclxuICAgICAgICB0b3AgPSAoc2hhcGUuYUNvb3Jkcy50bC55ICsgc2hhcGUuYUNvb3Jkcy50ci55KSAvIDI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnc291dGgnOiB7XHJcbiAgICAgICAgbGVmdCA9IChzaGFwZS5hQ29vcmRzLmJsLnggKyBzaGFwZS5hQ29vcmRzLmJyLngpIC8gMjtcclxuICAgICAgICB0b3AgPSAoc2hhcGUuYUNvb3Jkcy5ibC55ICsgc2hhcGUuYUNvb3Jkcy5ici55KSAvIDI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnbm9ydGhlYXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSBzaGFwZS5hQ29vcmRzLnRsLng7XHJcbiAgICAgICAgdG9wID0gc2hhcGUuYUNvb3Jkcy50bC55O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRod2VzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gc2hhcGUuYUNvb3Jkcy50ci54O1xyXG4gICAgICAgIHRvcCA9IHNoYXBlLmFDb29yZHMudHIueTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aGVhc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IHNoYXBlLmFDb29yZHMuYmwueDtcclxuICAgICAgICB0b3AgPSBzaGFwZS5hQ29vcmRzLmJsLnk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnc291dGh3ZXN0JzpcclxuICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgIGxlZnQgPSBzaGFwZS5hQ29vcmRzLmJyLng7XHJcbiAgICAgICAgdG9wID0gc2hhcGUuYUNvb3Jkcy5ici55O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYXAgPSBuZXcgZmFicmljLkNpcmNsZSh7XHJcbiAgICAgIGxlZnQsXHJcbiAgICAgIHRvcCxcclxuICAgICAgc3Ryb2tlV2lkdGg6IDIsXHJcbiAgICAgIHJhZGl1czogNixcclxuICAgICAgZmlsbDogJyM3OGJlZmEnLCAvLyA0MmEyZGEgZDVlOGYyXHJcbiAgICAgIHN0cm9rZTogJyM3OGJlZmEnLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAgIHNlbGVjdGFibGU6IGZhbHNlLFxyXG4gICAgICBvcGFjaXR5OiAwLFxyXG4gICAgICBpZDogYCR7aWR9XyR7Y2FyZGluYWx9YCxcclxuICAgIH0pO1xyXG4gICAgYXAudHlwZSA9ICdhbmNob3InO1xyXG4gICAgYXAuc2hhcGVJZCA9IGlkO1xyXG4gICAgYXAuY2FyZGluYWwgPSBjYXJkaW5hbDtcclxuICAgIGFwLm9uKCdtb3VzZW92ZXInLCAoKSA9PiB7XHJcbiAgICAgIGFwLnRvZ2dsZU9wYWNpdHkoMSk7XHJcbiAgICB9KTtcclxuICAgIGFwLm9uKCdtb3VzZW91dCcsICgpID0+IHtcclxuICAgICAgYXAudG9nZ2xlT3BhY2l0eSgwKTtcclxuICAgIH0pO1xyXG4gICAgYXAub24oJ21vdXNlZGJsY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHsgY2FudmFzIH0gPSB0aGlzO1xyXG4gICAgICBjb25zdCBuZXdMaW5rID0gbmV3IExpbmsoe1xyXG4gICAgICAgIGNhbnZhcyxcclxuICAgICAgICBzdGFydDoge1xyXG4gICAgICAgICAgeDogYXAubGVmdCxcclxuICAgICAgICAgIHk6IGFwLnRvcCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVuZDoge1xyXG4gICAgICAgICAgeDogYXAubGVmdCxcclxuICAgICAgICAgIHk6IGFwLnRvcCxcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgICAgbmV3TGluay5pbmplY3QoY2FudmFzKTtcclxuICAgICAgbmV3TGluay5jb25uZWN0TGluaygnZnJvbScsIGFwLnNoYXBlSWQsIGFwLmNhcmRpbmFsKTtcclxuICAgICAgbmV3TGluay5hcnJvd0hlYWQuZmlyZSgnbW91c2Vkb3duJyk7XHJcblxyXG4gICAgICBjb25zdCBvbk1vdXNlTW92ZSA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIG5ld0xpbmsuYXJyb3dIZWFkLmxlZnQgPSBldmVudC5wb2ludGVyLng7XHJcbiAgICAgICAgbmV3TGluay5hcnJvd0hlYWQudG9wID0gZXZlbnQucG9pbnRlci55O1xyXG4gICAgICAgIG5ld0xpbmsuYXJyb3dIZWFkLmZpcmUoJ21vdmluZycpO1xyXG4gICAgICB9O1xyXG4gICAgICBjYW52YXMub24oJ21vdXNlOm1vdmUnLCBvbk1vdXNlTW92ZSk7XHJcblxyXG4gICAgICBjb25zdCBvbk1vdXNlQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgbmV3TGluay5hcnJvd0hlYWQuZmlyZSgnbW92ZWQnKTtcclxuICAgICAgICBuZXdMaW5rLmFycm93SGVhZC5maXJlKCdtb3VzZXVwJyk7XHJcbiAgICAgICAgY2FudmFzLm9mZignbW91c2U6bW92ZScsIG9uTW91c2VNb3ZlKTtcclxuICAgICAgICBjYW52YXMub2ZmKCdtb3VzZTp1cCcsIG9uTW91c2VDbGljayk7XHJcbiAgICAgICAgbmV3TGluay5yZXNldEN1cnZhdHVyZSgpO1xyXG4gICAgICB9O1xyXG4gICAgICBjYW52YXMub24oJ21vdXNlOnVwJywgb25Nb3VzZUNsaWNrKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGFwO1xyXG4gIH1cclxufVxyXG4iLCJjb25zdCB7IGZhYnJpYyB9ID0gd2luZG93O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvY2Vzc0dyYXBoIHtcclxuICAvKipcclxuICAgKlxyXG4gICAqIEBwYXJhbSBvcHRpb25zXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0NhbnZhc30gb3B0aW9ucy5jYW52YXMgLSBGYWJyaWNKUy5DYW52YXMgaW5zdGFuY2UgLSBtYW5kYXRvcnkgaWYgb3B0aW9ucy5jYW52YXNPcHRzIG5vdCBwcm92aWRlZC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLmNhbnZhc09wdHMgLSBGYWJyaWNKUy5DYW52YXMjaW5pdGlhbGl6ZSBwYXJhbWV0ZXJzIC0gbWFuZGF0b3J5IGlmIG9wdGlvbnMuY2FudmFzIG5vdCBwcm92aWRlZFxyXG4gICAqICAgICAgICAgICAgICAgICBTZWUgaHR0cDovL2ZhYnJpY2pzLmNvbS9kb2NzL2ZhYnJpYy5DYW52YXMuaHRtbCNpbml0aWFsaXplIGZvciBkZXRhaWxzXHJcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudHxTdHJpbmd9IG9wdGlvbnMuY2FudmFzLmVsIC0gPGNhbnZhcz4gZWxlbWVudCB0byBpbml0aWFsaXplIGluc3RhbmNlIG9uXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuY2FudmFzLm9wdGlvbnMgLSBPcHRpb25zIG9iamVjdFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmdyaWRdIC0gZGltZW5zaW9ucyBvZiB0aGUgZ3JpZFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIHRoaXMuaGFuZGxlcnMgPSB7XHJcbiAgICAgIGdyaWQ6IHt9LFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBJbml0aWFsaXplIENhbnZhc1xyXG4gICAgY29uc3QgY2FudmFzID0gdGhpcy5jYW52YXMgPSBvcHRpb25zLmNhbnZhcyA/IG9wdGlvbnMuY2FudmFzIDogbmV3IGZhYnJpYy5DYW52YXMob3B0aW9ucy5jYW52YXNPcHRzLmVsLCBvcHRpb25zLmNhbnZhc09wdHMub3B0aW9ucyk7XHJcbiAgICBjYW52YXMuc2V0KCdwcmVzZXJ2ZU9iamVjdFN0YWNraW5nJywgdHJ1ZSk7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmdyaWQgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIHRoaXMuc2V0R3JpZCh7XHJcbiAgICAgICAgZ3JpZDogb3B0aW9ucy5ncmlkLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBmYWJyaWMuT2JqZWN0LnByb3RvdHlwZS5vcmlnaW5YID0gZmFicmljLk9iamVjdC5wcm90b3R5cGUub3JpZ2luWSA9ICdjZW50ZXInO1xyXG4gICAgZmFicmljLk9iamVjdC5wcm90b3R5cGUudG9nZ2xlT3BhY2l0eSA9IGZ1bmN0aW9uIChvcGFjaXR5LCB0aW1lb3V0KSB7XHJcbiAgICAgIHRoaXMuYW5pbWF0ZSgnb3BhY2l0eScsIG9wYWNpdHksIHtcclxuICAgICAgICBkdXJhdGlvbjogdGltZW91dCAhPT0gdW5kZWZpbmVkID8gdGltZW91dCA6IDMwMCxcclxuICAgICAgICBvbkNoYW5nZTogdGhpcy5jYW52YXMucmVuZGVyQWxsLmJpbmQodGhpcy5jYW52YXMpLFxyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgY2FudmFzLmNhbGNPZmZzZXQoKTtcclxuXHJcbiAgICAvLyBQcmV2ZW50IG5vbiBMaW5rYWJsZVNoYXBlIG9iamVjdHMgdG8gYmUgZ3JvdXBlZCBkdXJpbmcgc2VsZWN0aW9uXHJcbiAgICBjb25zdCBvblNlbGVjdGlvbiA9ICgpID0+IHtcclxuICAgICAgY29uc3QgYWN0aXZlID0gY2FudmFzLmdldEFjdGl2ZU9iamVjdCgpO1xyXG4gICAgICAvLyBXaGVuIG11bHRpIHNlbGVjdGlvbiwgcmVtb3ZlIGFueSBub24gTGlua2FibGUgU2hhcGUgb2JqZWN0c1xyXG4gICAgICBpZiAoYWN0aXZlLnR5cGUgPT09ICdhY3RpdmVTZWxlY3Rpb24nKSB7XHJcbiAgICAgICAgY29uc3Qgb2JqZWN0cyA9IGFjdGl2ZS5nZXRPYmplY3RzKCk7XHJcbiAgICAgICAgaWYgKG9iamVjdHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgY29uc3Qgb25seVJlY3QgPSBvYmplY3RzLmZpbHRlcigobykgPT4gby50eXBlID09PSAnbGlua2FibGVTaGFwZScpO1xyXG4gICAgICAgICAgY2FudmFzLl9kaXNjYXJkQWN0aXZlT2JqZWN0KCk7XHJcbiAgICAgICAgICBjb25zdCBzZWwgPSBuZXcgZmFicmljLkFjdGl2ZVNlbGVjdGlvbihvbmx5UmVjdCwge1xyXG4gICAgICAgICAgICBjYW52YXMsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGNhbnZhcy5fc2V0QWN0aXZlT2JqZWN0KHNlbCk7XHJcblxyXG4gICAgICAgICAgLy8gVXBkYXRlIGFueSBsaW5rcyBjb25uZWN0ZWQgdG8gdGhlIExpbmthYmxlIFNoYXBlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNhbnZhcy5vbih7XHJcbiAgICAgICdzZWxlY3Rpb246Y3JlYXRlZCc6IG9uU2VsZWN0aW9uLFxyXG4gICAgICAnc2VsZWN0aW9uOnVwZGF0ZWQnOiBvblNlbGVjdGlvbixcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IGNhbnZhcyB0byBoYXZlIGEgZ3JpZC5cclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLmdyaWQgLSBncmlkIHNwYWNpbmcgKHBpeGVscylcclxuICAgKi9cclxuICBzZXRHcmlkKG9wdGlvbnMpIHtcclxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5ncmlkICE9PSAnbnVtYmVyJyB8fCBvcHRpb25zLmdyaWQgPCAwKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudCBcImdyaWRcIiBpbiBQcm9jZXNzR3JhcCNzZXRHcmlkLiAocmVxdWlyZWQ6IE51bWJlciA+IDApJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5ncmlkID0gb3B0aW9ucy5ncmlkO1xyXG4gICAgY29uc3QgeyBjYW52YXMgfSA9IHRoaXM7XHJcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1tdWx0aS1zdHIgKi9cclxuICAgIGNvbnN0IGRhdGEgPSBgPHN2ZyB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPiBcXFxyXG4gICAgICAgIDxkZWZzPiBcXFxyXG4gICAgICAgICAgICA8cGF0dGVybiBpZD1cInNtYWxsR3JpZFwiIHdpZHRoPVwiJHt0aGlzLmdyaWR9XCIgaGVpZ2h0PVwiJHt0aGlzLmdyaWR9XCIgcGF0dGVyblVuaXRzPVwidXNlclNwYWNlT25Vc2VcIj4gXFxcclxuICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNICR7dGhpcy5ncmlkfSAwIEwgMCAwIDAgJHt0aGlzLmdyaWR9XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJncmF5XCIgc3Ryb2tlLXdpZHRoPVwiMC41XCIgLz4gXFxcclxuICAgICAgICAgICAgPC9wYXR0ZXJuPiBcXFxyXG4gICAgICAgICAgICA8cGF0dGVybiBpZD1cImdyaWRcIiB3aWR0aD1cIiR7dGhpcy5ncmlkICogNX1cIiBoZWlnaHQ9XCIke3RoaXMuZ3JpZCAqIDV9XCIgcGF0dGVyblVuaXRzPVwidXNlclNwYWNlT25Vc2VcIj4gXFxcclxuICAgICAgICAgICAgICAgIDxyZWN0IHdpZHRoPVwiJHt0aGlzLmdyaWQgKiA1fVwiIGhlaWdodD1cIiR7dGhpcy5ncmlkICogNX1cIiBmaWxsPVwidXJsKCNzbWFsbEdyaWQpXCIgLz4gXFxcclxuICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNICR7dGhpcy5ncmlkICogNX0gMCBMIDAgMCAwICR7dGhpcy5ncmlkICogNX1cIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImdyYXlcIiBzdHJva2Utd2lkdGg9XCIxXCIgLz4gXFxcclxuICAgICAgICAgICAgPC9wYXR0ZXJuPiBcXFxyXG4gICAgICAgIDwvZGVmcz4gXFxcclxuICAgICAgICA8cmVjdCB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgZmlsbD1cInVybCgjZ3JpZClcIiAvPiBcXFxyXG4gICAgPC9zdmc+YDtcclxuICAgIC8qIGVzbGludC1lbmFibGUgbm8tbXVsdGktc3RyICovXHJcblxyXG4gICAgY29uc3QgRE9NVVJMID0gd2luZG93LlVSTCB8fCB3aW5kb3cud2Via2l0VVJMIHx8IHdpbmRvdztcclxuICAgIGNvbnN0IHN2ZyA9IG5ldyBCbG9iKFtkYXRhXSwgeyB0eXBlOiAnaW1hZ2Uvc3ZnK3htbDtjaGFyc2V0PXV0Zi04JyB9KTtcclxuICAgIGNvbnN0IHVybCA9IERPTVVSTC5jcmVhdGVPYmplY3RVUkwoc3ZnKTtcclxuICAgIGZhYnJpYy51dGlsLmxvYWRJbWFnZSh1cmwsIChpbWcpID0+IHtcclxuICAgICAgY29uc3QgYmcgPSBuZXcgZmFicmljLlJlY3Qoe1xyXG4gICAgICAgIHdpZHRoOiBjYW52YXMud2lkdGgsIGhlaWdodDogY2FudmFzLmhlaWdodCwgZXZlbnRlZDogZmFsc2UsIHNlbGVjdGFibGU6IGZhbHNlLFxyXG4gICAgICB9KTtcclxuICAgICAgYmcuZmlsbCA9IG5ldyBmYWJyaWMuUGF0dGVybih7IHNvdXJjZTogaW1nIH0sXHJcbiAgICAgICAgKCgpID0+IHsgYmcuZGlydHkgPSB0cnVlOyBjYW52YXMucmVxdWVzdFJlbmRlckFsbCgpOyB9KSk7XHJcbiAgICAgIGJnLmNhbnZhcyA9IGNhbnZhcztcclxuICAgICAgY2FudmFzLnNldCgnYmFja2dyb3VuZEltYWdlJywgYmcpO1xyXG5cclxuICAgICAgLy8gU25hcCB0byBncmlkIGVmZmVjdHNcclxuICAgICAgY2FudmFzLm9mZih0aGlzLmhhbmRsZXJzLmdyaWQpO1xyXG4gICAgICB0aGlzLmhhbmRsZXJzLmdyaWQgPSB7XHJcbiAgICAgICAgJ29iamVjdDptb3ZpbmcnOiAoZXZlbnQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHsgZ3JpZCB9ID0gdGhpcztcclxuICAgICAgICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBldmVudDtcclxuICAgICAgICAgIGlmICh0YXJnZXQudHlwZSAhPT0gJ2xpbmthYmxlU2hhcGUnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGV2ZW50LnRhcmdldC5zZXQoe1xyXG4gICAgICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKGV2ZW50LnRhcmdldC5sZWZ0IC8gZ3JpZCkgKiBncmlkLFxyXG4gICAgICAgICAgICB0b3A6IE1hdGgucm91bmQoZXZlbnQudGFyZ2V0LnRvcCAvIGdyaWQpICogZ3JpZCxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJ29iamVjdDpzY2FsaW5nJzogKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB7IGdyaWQgfSA9IHRoaXM7XHJcbiAgICAgICAgICBjb25zdCB7IHRhcmdldCB9ID0gZXZlbnQ7XHJcblxyXG4gICAgICAgICAgaWYgKHRhcmdldC50eXBlICE9PSAnbGlua2FibGVTaGFwZScpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnN0IHcgPSB0YXJnZXQud2lkdGggKiB0YXJnZXQuc2NhbGVYO1xyXG4gICAgICAgICAgY29uc3QgaCA9IHRhcmdldC5oZWlnaHQgKiB0YXJnZXQuc2NhbGVZO1xyXG4gICAgICAgICAgY29uc3Qgc25hcCA9IHsgLy8gQ2xvc2VzdCBzbmFwcGluZyBwb2ludHNcclxuICAgICAgICAgICAgdG9wOiBNYXRoLnJvdW5kKHRhcmdldC50b3AgLyBncmlkKSAqIGdyaWQsXHJcbiAgICAgICAgICAgIGxlZnQ6IE1hdGgucm91bmQodGFyZ2V0LmxlZnQgLyBncmlkKSAqIGdyaWQsXHJcbiAgICAgICAgICAgIGJvdHRvbTogTWF0aC5yb3VuZCgodGFyZ2V0LnRvcCArIGgpIC8gZ3JpZCkgKiBncmlkLFxyXG4gICAgICAgICAgICByaWdodDogTWF0aC5yb3VuZCgodGFyZ2V0LmxlZnQgKyB3KSAvIGdyaWQpICogZ3JpZCxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBjb25zdCB0aHJlc2hvbGQgPSBncmlkO1xyXG4gICAgICAgICAgY29uc3QgZGlzdCA9IHsgLy8gRGlzdGFuY2UgZnJvbSBzbmFwcGluZyBwb2ludHNcclxuICAgICAgICAgICAgdG9wOiBNYXRoLmFicyhzbmFwLnRvcCAtIHRhcmdldC50b3ApLFxyXG4gICAgICAgICAgICBsZWZ0OiBNYXRoLmFicyhzbmFwLmxlZnQgLSB0YXJnZXQubGVmdCksXHJcbiAgICAgICAgICAgIGJvdHRvbTogTWF0aC5hYnMoc25hcC5ib3R0b20gLSB0YXJnZXQudG9wIC0gaCksXHJcbiAgICAgICAgICAgIHJpZ2h0OiBNYXRoLmFicyhzbmFwLnJpZ2h0IC0gdGFyZ2V0LmxlZnQgLSB3KSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBjb25zdCBhdHRycyA9IHtcclxuICAgICAgICAgICAgc2NhbGVYOiB0YXJnZXQuc2NhbGVYLFxyXG4gICAgICAgICAgICBzY2FsZVk6IHRhcmdldC5zY2FsZVksXHJcbiAgICAgICAgICAgIHRvcDogdGFyZ2V0LnRvcCxcclxuICAgICAgICAgICAgbGVmdDogdGFyZ2V0LmxlZnQsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgc3dpdGNoICh0YXJnZXQuX19jb3JuZXIpIHtcclxuICAgICAgICAgICAgY2FzZSAndGwnOlxyXG4gICAgICAgICAgICAgIGlmIChkaXN0LmxlZnQgPCBkaXN0LnRvcCAmJiBkaXN0LmxlZnQgPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWCA9ICh3IC0gKHNuYXAubGVmdCAtIHRhcmdldC5sZWZ0KSkgLyB0YXJnZXQud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoYXR0cnMuc2NhbGVYIC8gdGFyZ2V0LnNjYWxlWCkgKiB0YXJnZXQuc2NhbGVZO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMudG9wID0gdGFyZ2V0LnRvcCArIChoIC0gdGFyZ2V0LmhlaWdodCAqIGF0dHJzLnNjYWxlWSk7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5sZWZ0ID0gc25hcC5sZWZ0O1xyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlzdC50b3AgPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWSA9IChoIC0gKHNuYXAudG9wIC0gdGFyZ2V0LnRvcCkpIC8gdGFyZ2V0LmhlaWdodDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWCA9IChhdHRycy5zY2FsZVkgLyB0YXJnZXQuc2NhbGVZKSAqIHRhcmdldC5zY2FsZVg7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5sZWZ0ICs9ICh3IC0gdGFyZ2V0LndpZHRoICogYXR0cnMuc2NhbGVYKTtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnRvcCA9IHNuYXAudG9wO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbXQnOlxyXG4gICAgICAgICAgICAgIGlmIChkaXN0LnRvcCA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVZID0gKGggLSAoc25hcC50b3AgLSB0YXJnZXQudG9wKSkgLyB0YXJnZXQuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgYXR0cnMudG9wID0gc25hcC50b3A7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd0cic6XHJcbiAgICAgICAgICAgICAgaWYgKGRpc3QucmlnaHQgPCBkaXN0LnRvcCAmJiBkaXN0LnJpZ2h0IDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVggPSAoc25hcC5yaWdodCAtIHRhcmdldC5sZWZ0KSAvIHRhcmdldC53aWR0aDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWSA9IChhdHRycy5zY2FsZVggLyB0YXJnZXQuc2NhbGVYKSAqIHRhcmdldC5zY2FsZVk7XHJcbiAgICAgICAgICAgICAgICBhdHRycy50b3AgPSB0YXJnZXQudG9wICsgKGggLSB0YXJnZXQuaGVpZ2h0ICogYXR0cnMuc2NhbGVZKTtcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRpc3QudG9wIDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoaCAtIChzbmFwLnRvcCAtIHRhcmdldC50b3ApKSAvIHRhcmdldC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVggPSAoYXR0cnMuc2NhbGVZIC8gdGFyZ2V0LnNjYWxlWSkgKiB0YXJnZXQuc2NhbGVYO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMudG9wID0gc25hcC50b3A7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtbCc6XHJcbiAgICAgICAgICAgICAgaWYgKGRpc3QubGVmdCA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVYID0gKHcgLSAoc25hcC5sZWZ0IC0gdGFyZ2V0LmxlZnQpKSAvIHRhcmdldC53aWR0aDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLmxlZnQgPSBzbmFwLmxlZnQ7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtcic6XHJcbiAgICAgICAgICAgICAgaWYgKGRpc3QucmlnaHQgPCB0aHJlc2hvbGQpIGF0dHJzLnNjYWxlWCA9IChzbmFwLnJpZ2h0IC0gdGFyZ2V0LmxlZnQpIC8gdGFyZ2V0LndpZHRoO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdibCc6XHJcbiAgICAgICAgICAgICAgaWYgKGRpc3QubGVmdCA8IGRpc3QuYm90dG9tICYmIGRpc3QubGVmdCA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVYID0gKHcgLSAoc25hcC5sZWZ0IC0gdGFyZ2V0LmxlZnQpKSAvIHRhcmdldC53aWR0aDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWSA9IChhdHRycy5zY2FsZVggLyB0YXJnZXQuc2NhbGVYKSAqIHRhcmdldC5zY2FsZVk7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5sZWZ0ID0gc25hcC5sZWZ0O1xyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlzdC5ib3R0b20gPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWSA9IChzbmFwLmJvdHRvbSAtIHRhcmdldC50b3ApIC8gdGFyZ2V0LmhlaWdodDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWCA9IChhdHRycy5zY2FsZVkgLyB0YXJnZXQuc2NhbGVZKSAqIHRhcmdldC5zY2FsZVg7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5sZWZ0ICs9ICh3IC0gdGFyZ2V0LndpZHRoICogYXR0cnMuc2NhbGVYKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ21iJzpcclxuICAgICAgICAgICAgICBpZiAoZGlzdC5ib3R0b20gPCB0aHJlc2hvbGQpIGF0dHJzLnNjYWxlWSA9IChzbmFwLmJvdHRvbSAtIHRhcmdldC50b3ApIC8gdGFyZ2V0LmhlaWdodDtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYnInOlxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgIGlmIChkaXN0LnJpZ2h0IDwgZGlzdC5ib3R0b20gJiYgZGlzdC5yaWdodCA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVYID0gKHNuYXAucmlnaHQgLSB0YXJnZXQubGVmdCkgLyB0YXJnZXQud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoYXR0cnMuc2NhbGVYIC8gdGFyZ2V0LnNjYWxlWCkgKiB0YXJnZXQuc2NhbGVZO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlzdC5ib3R0b20gPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWSA9IChzbmFwLmJvdHRvbSAtIHRhcmdldC50b3ApIC8gdGFyZ2V0LmhlaWdodDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWCA9IChhdHRycy5zY2FsZVkgLyB0YXJnZXQuc2NhbGVZKSAqIHRhcmdldC5zY2FsZVg7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGFyZ2V0LnNldChhdHRycyk7XHJcbiAgICAgICAgICB0YXJnZXQuc2V0Q29vcmRzKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfTtcclxuICAgICAgaWYgKHRoaXMuZ3JpZCA+IDApIHtcclxuICAgICAgICBjYW52YXMub24odGhpcy5oYW5kbGVycy5ncmlkKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
