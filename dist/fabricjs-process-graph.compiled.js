(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _Container = _interopRequireDefault(require("./src/Container.js"));

var _ProcessGraph = _interopRequireDefault(require("./src/ProcessGraph.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

window.pg = {
  ProcessGraph: _ProcessGraph["default"],
  Container: _Container["default"]
};

},{"./src/Container.js":2,"./src/ProcessGraph.js":5}],2:[function(require,module,exports){
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
      originX: 'center',
      originY: 'center'
    });

    var newOptions = _.cloneDeep(_.omit(options, ['canvas', 'shape']));

    newOptions.canvas = options.canvas;
    newOptions.shape = group;
    return _super.call(this, newOptions);
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
      strokeWidth: options.custom && options.custom.path && options.custom.path.strokeWidth ? options.custom.path.strokeWidth : 1,
      objectCaching: false,
      selectable: false,
      hasBorders: false,
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
      evented: true,
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
    this.id = id;
    this.canvas = canvas;
    this.shape = new fabric.Group([shape], {
      left: left,
      top: top,
      hasBorders: true,
      hasControls: true,
      originX: 'left',
      originY: 'top',
      id: id,
      angle: angle || 0
    });
    this.shape.type = 'linkableShape'; // Anchor points

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
    }; // Events

    this.shape.on('mouseover', function () {
      _this.toggleAnchorsOpacity(1);
    });
    this.shape.on('mouseout', function () {
      _this.toggleAnchorsOpacity(0);
    });
    this.shape.on('moving', function () {
      _this.refreshAnchorsPosition(false);
    });
    this.shape.on('moved', function () {
      _this.refreshAnchorsPosition(true);
    });
    this.shape.on('rotating', function () {
      _this.refreshAnchorsPosition(false);
    });
    this.shape.on('rotated', function () {
      _this.refreshAnchorsPosition(true);
    });
    this.shape.on('scaling', function () {
      _this.refreshAnchorsPosition(false);
    });
    this.shape.on('scaled', function () {
      _this.refreshAnchorsPosition(true);
    });
  }

  _createClass(LinkableShape, [{
    key: "inject",
    value: function inject() {
      var canvas = this.canvas,
          shape = this.shape,
          anchors = this.anchors;
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
        ap.toggleOpacity(1); // ap.set('stroke', '#55f');
      });
      ap.on('mouseout', function () {
        ap.toggleOpacity(0); // ap.set('stroke', '#666');
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

    canvas.calcOffset();

    var onSelection = function onSelection() {
      var active = canvas.getActiveObject(); // When multi selection, remove any non Rectangle objects

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

          canvas._setActiveObject(sel);
        }
      }
    };

    canvas.on({
      'selection:created': onSelection,
      'selection:updated': onSelection // 'selection:cleared': onSelectionCleared

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsInNyYy9Db250YWluZXIuanMiLCJzcmMvTGluay5qcyIsInNyYy9MaW5rYWJsZVNoYXBlLmpzIiwic3JjL1Byb2Nlc3NHcmFwaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7O0FBQ0E7Ozs7QUFFQSxNQUFNLENBQUMsRUFBUCxHQUFZO0FBQ1YsRUFBQSxZQUFZLEVBQVosd0JBRFU7QUFDSSxFQUFBLFNBQVMsRUFBVDtBQURKLENBQVo7Ozs7Ozs7Ozs7OztBQ0hBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLGNBQXNCLE1BQXRCO0FBQUEsSUFBUSxNQUFSLFdBQVEsTUFBUjtBQUFBLElBQWdCLENBQWhCLFdBQWdCLENBQWhCOztJQUVxQixTOzs7OztBQUNuQjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0UscUJBQVksT0FBWixFQUFxQjtBQUFBOztBQUNuQixRQUFNLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFYLENBQWdCO0FBQzNCLE1BQUEsSUFBSSxFQUFFLENBRHFCO0FBRTNCLE1BQUEsR0FBRyxFQUFFLENBRnNCO0FBRzNCLE1BQUEsT0FBTyxFQUFFLE1BSGtCO0FBSTNCLE1BQUEsT0FBTyxFQUFFLEtBSmtCO0FBSzNCLE1BQUEsV0FBVyxFQUFFLENBTGM7QUFNM0IsTUFBQSxNQUFNLEVBQUUsTUFObUI7QUFPM0IsTUFBQSxJQUFJLEVBQUUsTUFQcUI7QUFRM0IsTUFBQSxFQUFFLEVBQUUsRUFSdUI7QUFTM0IsTUFBQSxFQUFFLEVBQUUsRUFUdUI7QUFVM0IsTUFBQSxLQUFLLEVBQUUsR0FWb0I7QUFXM0IsTUFBQSxNQUFNLEVBQUU7QUFYbUIsS0FBaEIsQ0FBYjtBQWFBLFFBQU0sSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQVgsQ0FBaUIsT0FBTyxDQUFDLEtBQXpCLEVBQWdDO0FBQzNDLE1BQUEs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dkIsR0FBaUMsTUFBTSxDQUFDLE1BQXZEO0FBQ0QsaUJBSEQsTUFHTyxJQUFJLElBQUksQ0FBQyxNQUFMLEdBQWMsU0FBbEIsRUFBNkI7QUFDbEMsa0JBQUEsS0FBSyxDQUFDLE1BQU4sR0FBZSxDQUFDLElBQUksQ0FBQyxNQUFMLEdBQWMsTUFBTSxDQUFDLEdBQXRCLElBQTZCLE1BQU0sQ0FBQyxNQUFuRDtBQUNBLGtCQUFBLEtBQUssQ0FBQyxNQUFOLEdBQWdCLEtBQUssQ0FBQyxNQUFOLEdBQWUsTUFBTSxDQUFDLE1BQXZCLEdBQWlDLE1BQU0sQ0FBQyxNQUF2RDtBQUNEOztBQUNEO0FBL0RKOztBQWlFQSxZQUFBLE1BQU0sQ0FBQyxHQUFQLENBQVcsS0FBWDtBQUNEO0FBM0drQixTQUFyQjs7QUE2R0EsWUFBSSxLQUFJLENBQUMsSUFBTCxHQUFZLENBQWhCLEVBQW1CO0FBQ2pCLFVBQUEsTUFBTSxDQUFDLEVBQVAsQ0FBVSxLQUFJLENBQUMsUUFBTCxDQUFjLElBQXhCO0FBQ0Q7QUFDRixPQTNIRDtBQTRIRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBDb250YWluZXIgZnJvbSAnLi9zcmMvQ29udGFpbmVyLmpzJztcclxuaW1wb3J0IFByb2Nlc3NHcmFwaCBmcm9tICcuL3NyYy9Qcm9jZXNzR3JhcGguanMnO1xyXG5cclxud2luZG93LnBnID0ge1xyXG4gIFByb2Nlc3NHcmFwaCwgQ29udGFpbmVyXHJcbn1cclxuIiwiaW1wb3J0IExpbmthYmxlU2hhcGUgZnJvbSAnLi9MaW5rYWJsZVNoYXBlLmpzJztcclxuXHJcbmNvbnN0IHsgZmFicmljLCBfIH0gPSB3aW5kb3c7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250YWluZXIgZXh0ZW5kcyBMaW5rYWJsZVNoYXBlIHtcclxuICAvKipcclxuICAgKiBBIENvbnRhaW5lciBpcyBhIFJlY3Qgd2l0aCBhbiBJVGV4dC4gQ2FuIGJlIGV4cGFuZGVkIHRvIHJldmVhbCBjb250YWluZWQgU2hhcGVzLlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBvcHRpb25zXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0ZhYnJpYy5DYW52YXN9ICAgb3B0aW9ucy5jYW52YXMgLSBGYWJyaWMgY2FudmFzXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG9wdGlvbnMuaWQgLSBVbmlxdWUgaWRlbnRpZmllclxyXG4gICAqXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgY29uc3QgcmVjdCA9IG5ldyBmYWJyaWMuUmVjdCh7XHJcbiAgICAgIGxlZnQ6IDAsXHJcbiAgICAgIHRvcDogMCxcclxuICAgICAgb3JpZ2luWDogJ2xlZnQnLFxyXG4gICAgICBvcmlnaW5ZOiAndG9wJyxcclxuICAgICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAgIHN0cm9rZTogJyMwMDAnLFxyXG4gICAgICBmaWxsOiAnI2ZmZicsXHJcbiAgICAgIHJ4OiAxMCxcclxuICAgICAgcnk6IDEwLFxyXG4gICAgICB3aWR0aDogMjUwLFxyXG4gICAgICBoZWlnaHQ6IDE1MCxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgdGV4dCA9IG5ldyBmYWJyaWMuSVRleHQob3B0aW9ucy5sYWJlbCwge1xyXG4gICAgICBsZWZ0OiByZWN0LndpZHRoIC8gMixcclxuICAgICAgdG9wOiByZWN0LmhlaWdodCAvIDIsXHJcbiAgICAgIGZvbnRTaXplOiAxNCxcclxuICAgICAgZm9udEZhbWlseTogJ0hlbHZldGljYScsXHJcbiAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgZ3JvdXAgPSBuZXcgZmFicmljLkdyb3VwKFtyZWN0LCB0ZXh0XSwge1xyXG4gICAgICBsZWZ0OiAwLFxyXG4gICAgICB0b3A6IDAsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgbmV3T3B0aW9ucyA9IF8uY2xvbmVEZWVwKF8ub21pdChvcHRpb25zLCBbJ2NhbnZhcycsICdzaGFwZSddKSk7XHJcbiAgICBuZXdPcHRpb25zLmNhbnZhcyA9IG9wdGlvbnMuY2FudmFzO1xyXG4gICAgbmV3T3B0aW9ucy5zaGFwZSA9IGdyb3VwO1xyXG4gICAgc3VwZXIobmV3T3B0aW9ucyk7XHJcbiAgfVxyXG59XHJcbiIsImNvbnN0IHsgZmFicmljIH0gPSB3aW5kb3c7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW5rIHtcclxuICAvKipcclxuICAgKiBBIExpbmsgaXMgYSBGYWJyaWMuUGF0aCBvYmplY3Qgd2hvc2UgU3RhcnQgYW5kIEVuZCBwb2ludHMgY2FuIGJlIGNvbm5lY3RlZCB0byBhbnkgYW5jaG9yIG9mIHR3byBMaW5rYWJsZVNoYXBlLlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBvcHRpb25zXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0ZhYnJpYy5DYW52YXN9ICAgb3B0aW9ucy5jYW52YXMgLSBGYWJyaWMgY2FudmFzXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG9wdGlvbnMuaWQgLSBVbmlxdWUgaWRlbnRpZmllclxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLnN0YXJ0XSAtIENvb3JkaW5hdGVzIG9mIHRoZSBzdGFydCBwb2ludFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBbb3B0aW9ucy5zdGFydC54XSAtIFggYXhpcyBjb29yZGluYXRlIG9mIHRoZSBzdGFydCBwb2ludFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBbb3B0aW9ucy5zdGFydC55XSAtIFkgYXhpcyBjb29yZGluYXRlIG9mIHRoZSBzdGFydCBwb2ludFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBbb3B0aW9ucy5lbmQueF0gLSBYIGF4aXMgY29vcmRpbmF0ZSBvZiB0aGUgZW5kIHBvaW50XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIFtvcHRpb25zLmVuZC55XSAtIFkgYXhpcyBjb29yZGluYXRlIG9mIHRoZSBlbmQgcG9pbnRcclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuY3VzdG9tXSAtIE9wdGlvbnMgdG8gY3VzdG9taXplIHRoZSBkaWZmZXJlbnQgc2hhcGVzIG9mIHRoZSBMaW5rXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuY3VzdG9tLnBhdGhdIC0gYmV6aWVyIHF1YWRyYXRpYyBjdXJ2ZVxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBbb3B0aW9ucy5jdXN0b20uY29udHJvbFBvaW50XSAtIGJlemllciBxdWFkcmF0aWMgY3VydmUgY29udHJvbCBwb2ludFxyXG4gICAqIEBwYXJhbSB7TGluZX0gICAgICAgICAgICBbb3B0aW9ucy5jdXN0b20uY29udHJvbExpbmVdIC0gdmlzdWFsIGxpbmVzIGZyb20gdGhlIGNvbnRyb2wgcG9pbnQgdG8gdGhlIHN0YXJ0JmVuZCBwb2ludHNcclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuY3VzdG9tLnN0YXJ0UG9pbnRdIC0gYWthIGFycm93VGFpbFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBbb3B0aW9ucy5jdXN0b20uZW5kUG9pbnRdIC0gYWthIGFycm93SGVhZFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgaWQsXHJcbiAgICAgIGNhbnZhcyxcclxuICAgIH0gPSBvcHRpb25zO1xyXG4gICAgY29uc3QgeDEgPSBvcHRpb25zICYmIG9wdGlvbnMuc3RhcnQgJiYgb3B0aW9ucy5zdGFydC54ID8gb3B0aW9ucy5zdGFydC54IDogMDtcclxuICAgIGNvbnN0IHkxID0gb3B0aW9ucyAmJiBvcHRpb25zLnN0YXJ0ICYmIG9wdGlvbnMuc3RhcnQueSA/IG9wdGlvbnMuc3RhcnQueSA6IDA7XHJcbiAgICBjb25zdCB4MiA9IG9wdGlvbnMgJiYgb3B0aW9ucy5lbmQgJiYgb3B0aW9ucy5lbmQueCA/IG9wdGlvbnMuZW5kLnggOiAwO1xyXG4gICAgY29uc3QgeTIgPSBvcHRpb25zICYmIG9wdGlvbnMuZW5kICYmIG9wdGlvbnMuZW5kLnkgPyBvcHRpb25zLmVuZC55IDogMDtcclxuICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xyXG5cclxuICAgIC8vIFBhdGgsIGEgYmV6aWVyIHF1YWRyYXRpYyBjdXJ2ZVxyXG4gICAgY29uc3QgcGF0aENvb3JkcyA9IHtcclxuICAgICAgTToge1xyXG4gICAgICAgIHg6IHgxLCAvLyBmcm9tIHhcclxuICAgICAgICB5OiB5MSwgLy8gZnJvbSB5XHJcbiAgICAgIH0sXHJcbiAgICAgIFE6IHtcclxuICAgICAgICB4MTogKHgxICsgeDIpIC8gMiwgLy8gY29udHJvbCB4XHJcbiAgICAgICAgeTE6ICh5MSArIHkyKSAvIDIsIC8vIGNvbnRyb2wgeVxyXG4gICAgICAgIHgyLCAvLyB0byB4XHJcbiAgICAgICAgeTIsIC8vIHRvIHlcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgICBjb25zdCBwYXRoT3B0cyA9IHRoaXMuZGVmYXVsdFBhdGhPcHRpb25zID0ge1xyXG4gICAgICBmaWxsOiAnJyxcclxuICAgICAgc3Ryb2tlOiAob3B0aW9ucy5jdXN0b20gJiYgb3B0aW9ucy5jdXN0b20ucGF0aCAmJiBvcHRpb25zLmN1c3RvbS5wYXRoLnN0cm9rZVdpZHRoKSA/IG9wdGlvbnMuY3VzdG9tLnBhdGguc3Ryb2tlIDogJyMwMDAnLFxyXG4gICAgICBzdHJva2VXaWR0aDogKG9wdGlvbnMuY3VzdG9tICYmIG9wdGlvbnMuY3VzdG9tLnBhdGggJiYgb3B0aW9ucy5jdXN0b20ucGF0aC5zdHJva2VXaWR0aCkgPyBvcHRpb25zLmN1c3RvbS5wYXRoLnN0cm9rZVdpZHRoIDogMSxcclxuICAgICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAgIHNlbGVjdGFibGU6IGZhbHNlLFxyXG4gICAgICBoYXNCb3JkZXJzOiBmYWxzZSxcclxuICAgICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgICBsb2NrTW92ZW1lbnRYOiB0cnVlLFxyXG4gICAgICBsb2NrTW92ZW1lbnRZOiB0cnVlLFxyXG4gICAgICBwZXJQaXhlbFRhcmdldEZpbmQ6IHRydWUsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgcGF0aFN0ciA9IGBNICR7cGF0aENvb3Jkcy5NLnh9ICR7cGF0aENvb3Jkcy5NLnl9IFEgJHtwYXRoQ29vcmRzLlEueDF9LCAke3BhdGhDb29yZHMuUS55MX0sICR7cGF0aENvb3Jkcy5RLngyfSwgJHtwYXRoQ29vcmRzLlEueTJ9YDtcclxuICAgIGNvbnN0IHBhdGggPSBuZXcgZmFicmljLlBhdGgocGF0aFN0ciwgcGF0aE9wdHMpO1xyXG4gICAgdGhpcy5wYXRoID0gcGF0aDtcclxuXHJcbiAgICAvLyBDb250cm9sIHBvaW50IGFuZCBsaW5lcyBmb3IgdGhlIHF1YWRyYXRpYyBjdXJ2ZVxyXG4gICAgY29uc3QgY29udHJvbFBvaW50ID0gdGhpcy5jb250cm9sUG9pbnQgPSBuZXcgZmFicmljLkNpcmNsZSh7XHJcbiAgICAgIGxlZnQ6IHBhdGhDb29yZHMuUS54MSxcclxuICAgICAgdG9wOiBwYXRoQ29vcmRzLlEueTEsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICByYWRpdXM6IDYsXHJcbiAgICAgIGZpbGw6ICcjNzhiZWZhJyxcclxuICAgICAgc3Ryb2tlOiAnIzc4YmVmYScsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgICAgb3BhY2l0eTogMCxcclxuICAgIH0pO1xyXG4gICAgY29udHJvbFBvaW50Lm9uKCdtb3VzZW92ZXInLCB0aGlzLm9uTGlua01vdXNlT3Zlci5iaW5kKHRoaXMpKTtcclxuICAgIGNvbnRyb2xQb2ludC5vbignbW91c2VvdXQnLCB0aGlzLm9uTGlua01vdXNlT3V0LmJpbmQodGhpcykpO1xyXG4gICAgY29udHJvbFBvaW50Lm9uKCdtb3ZpbmcnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aCgnY29udHJvbCcsIHRoaXMuY29udHJvbFBvaW50LmxlZnQsIHRoaXMuY29udHJvbFBvaW50LnRvcCwgZmFsc2UpO1xyXG4gICAgfSk7XHJcbiAgICBjb250cm9sUG9pbnQub24oJ21vdmVkJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhdGgoJ2NvbnRyb2wnLCB0aGlzLmNvbnRyb2xQb2ludC5sZWZ0LCB0aGlzLmNvbnRyb2xQb2ludC50b3AsIHRydWUpO1xyXG4gICAgfSk7XHJcbiAgICBjb250cm9sUG9pbnQub24oJ21vdXNlZG93bicsICgpID0+IHtcclxuICAgICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcclxuICAgIH0pO1xyXG4gICAgY29uc3QgY29udHJvbExpbmVPcHRzID0ge1xyXG4gICAgICBzdHJva2VEYXNoQXJyYXk6IFs1LCA1XSxcclxuICAgICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAgIHN0cm9rZTogJyM3OGJlZmEnLFxyXG4gICAgICBzZWxlY3RhYmxlOiBmYWxzZSxcclxuICAgICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgICAgZXZlbnRlZDogdHJ1ZSxcclxuICAgICAgb3BhY2l0eTogMCxcclxuICAgIH07XHJcbiAgICBjb25zdCBjb250cm9sTGluZTEgPSB0aGlzLmNvbnRyb2xMaW5lMSA9IG5ldyBmYWJyaWMuTGluZShbY29udHJvbFBvaW50LmxlZnQsIGNvbnRyb2xQb2ludC50b3AsIHgxLCB5MV0sIGNvbnRyb2xMaW5lT3B0cyk7XHJcbiAgICBjb250cm9sTGluZTEub24oJ21vdXNlb3ZlcicsIHRoaXMub25MaW5rTW91c2VPdmVyLmJpbmQodGhpcykpO1xyXG4gICAgY29udHJvbExpbmUxLm9uKCdtb3VzZW91dCcsIHRoaXMub25MaW5rTW91c2VPdXQuYmluZCh0aGlzKSk7XHJcbiAgICBjb25zdCBjb250cm9sTGluZTIgPSB0aGlzLmNvbnRyb2xMaW5lMiA9IG5ldyBmYWJyaWMuTGluZShbY29udHJvbFBvaW50LmxlZnQsIGNvbnRyb2xQb2ludC50b3AsIHgyLCB5Ml0sIGNvbnRyb2xMaW5lT3B0cyk7XHJcbiAgICBjb250cm9sTGluZTIub24oJ21vdXNlb3ZlcicsIHRoaXMub25MaW5rTW91c2VPdmVyLmJpbmQodGhpcykpO1xyXG4gICAgY29udHJvbExpbmUyLm9uKCdtb3VzZW91dCcsIHRoaXMub25MaW5rTW91c2VPdXQuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgLy8gTWFzayBmb3Igc2hvd2luZyBpZiBjb25uZWN0aW9uIGlzIHZhbGlkXHJcbiAgICBjb25zdCBpc1ZhbGlkTWFza09wdHMgPSB7XHJcbiAgICAgIGxlZnQ6IHBhdGhDb29yZHMuUS54MixcclxuICAgICAgdG9wOiBwYXRoQ29vcmRzLlEueTIsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICByYWRpdXM6IDE2LFxyXG4gICAgICBmaWxsOiAnIzU3Yjg1NycsIC8vIGVhNGYzN1xyXG4gICAgICBzdHJva2U6ICcjNTdiODU3JyxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICBoYXNCb3JkZXJzOiBmYWxzZSxcclxuICAgICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgICBzZWxlY3RhYmxlOiBmYWxzZSxcclxuICAgICAgb3BhY2l0eTogMCxcclxuICAgIH07XHJcbiAgICB0aGlzLmlzVmFsaWRNYXNrID0gbmV3IGZhYnJpYy5DaXJjbGUoaXNWYWxpZE1hc2tPcHRzKTtcclxuXHJcbiAgICAvLyBFbmQgcG9pbnQgKGFycm93SGVhZClcclxuICAgIGNvbnN0IGFycm93SGVhZE9wdHMgPSB7XHJcbiAgICAgIHdpZHRoOiAxMCxcclxuICAgICAgaGVpZ2h0OiAxMCxcclxuICAgICAgbGVmdDogcGF0aENvb3Jkcy5RLngyLFxyXG4gICAgICB0b3A6IHBhdGhDb29yZHMuUS55MixcclxuICAgICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAgIGZpbGw6ICcjMDAwJyxcclxuICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgc3Ryb2tlOiAnIzAwMCcsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgIH07XHJcbiAgICBjb25zdCBhcnJvd0hlYWQgPSB0aGlzLmFycm93SGVhZCA9IG5ldyBmYWJyaWMuVHJpYW5nbGUoYXJyb3dIZWFkT3B0cyk7XHJcbiAgICBhcnJvd0hlYWQub24oJ21vdmluZycsICgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVQYXRoKCd0bycsIGFycm93SGVhZC5sZWZ0LCBhcnJvd0hlYWQudG9wLCBmYWxzZSk7XHJcbiAgICAgIHRoaXMuaXNWYWxpZE1hc2subGVmdCA9IGFycm93SGVhZC5sZWZ0O1xyXG4gICAgICB0aGlzLmlzVmFsaWRNYXNrLnRvcCA9IGFycm93SGVhZC50b3A7XHJcbiAgICAgIHRoaXMuaXNWYWxpZE1hc2suc2V0KCdvcGFjaXR5JywgMCk7XHJcblxyXG4gICAgICAvLyBDaGVjayBpZiBpbnRlcnNlY3RzIHdpdGggYW5jaG9yXHJcbiAgICAgIGNvbnN0IGFuY2hvcnMgPSBjYW52YXMuZ2V0T2JqZWN0cygpXHJcbiAgICAgICAgLmZpbHRlcigobykgPT4gby50eXBlID09PSAnYW5jaG9yJyk7XHJcbiAgICAgIGFycm93SGVhZC5zZXQoJ3N0cm9rZScsICcjMDAwJyk7XHJcbiAgICAgIGZvciAobGV0IGEgPSAwOyBhIDwgYW5jaG9ycy5sZW5ndGg7IGEgKz0gMSkge1xyXG4gICAgICAgIGlmIChhcnJvd0hlYWQuaW50ZXJzZWN0c1dpdGhPYmplY3QoYW5jaG9yc1thXSkpIHtcclxuICAgICAgICAgIHRoaXMuaXNWYWxpZE1hc2suc2V0KCdvcGFjaXR5JywgMC41KTtcclxuICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWRDb25uZWN0aW9uKCd0bycsIGFuY2hvcnNbYV0uc2hhcGVJZCwgYW5jaG9yc1thXS5jYXJkaW5hbCkpIHtcclxuICAgICAgICAgICAgdGhpcy5pc1ZhbGlkTWFzay5zZXQoe1xyXG4gICAgICAgICAgICAgIHN0cm9rZTogJyM1N2I4NTcnLFxyXG4gICAgICAgICAgICAgIGZpbGw6ICcjNTdiODU3JyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGFycm93SGVhZC5zZXQoJ3N0cm9rZScsICcjNWY1Jyk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmlzVmFsaWRNYXNrLnNldCh7XHJcbiAgICAgICAgICAgICAgc3Ryb2tlOiAnI2VhNGYzNycsXHJcbiAgICAgICAgICAgICAgZmlsbDogJyNlYTRmMzcnLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYXJyb3dIZWFkLnNldCgnc3Ryb2tlJywgJyNlYTRmMzcnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgYXJyb3dIZWFkLm9uKCdtb3ZlZCcsICgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVQYXRoKCd0bycsIGFycm93SGVhZC5sZWZ0LCBhcnJvd0hlYWQudG9wLCB0cnVlKTtcclxuICAgICAgdGhpcy5pc1ZhbGlkTWFzay5zZXQoJ29wYWNpdHknLCAwKTtcclxuXHJcbiAgICAgIC8vIENoZWNrIGlmIGludGVyc2VjdHMgd2l0aCBhbmNob3JcclxuICAgICAgY29uc3QgYW5jaG9ycyA9IGNhbnZhcy5nZXRPYmplY3RzKClcclxuICAgICAgICAuZmlsdGVyKChvKSA9PiBvLnR5cGUgPT09ICdhbmNob3InKTtcclxuICAgICAgZm9yIChsZXQgYSA9IDA7IGEgPCBhbmNob3JzLmxlbmd0aDsgYSArPSAxKSB7XHJcbiAgICAgICAgaWYgKGFycm93SGVhZC5pbnRlcnNlY3RzV2l0aE9iamVjdChhbmNob3JzW2FdKSkge1xyXG4gICAgICAgICAgdGhpcy5jb25uZWN0TGluaygndG8nLCBhbmNob3JzW2FdLnNoYXBlSWQsIGFuY2hvcnNbYV0uY2FyZGluYWwpO1xyXG4gICAgICAgICAgYXJyb3dIZWFkLnNldCgnc3Ryb2tlJywgJyMwMDAnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudG8gJiYgYW5jaG9yc1thXSA9PT0gdGhpcy50by5zaGFwZS5hbmNob3JzW3RoaXMudG8uYW5jaG9yXSkge1xyXG4gICAgICAgICAgLy8gSWYgdGhpcyBsaW5rIHdhcyBjb25uZWN0ZWQgdG8gdGhpcyBhbmNob3IgYW5kIGl0IGRvZXNuJ3QgaW50ZXJzZWN0IGFueW1vcmVcclxuICAgICAgICAgIHRoaXMuZGlzY29ubmVjdExpbmsoJ3RvJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGFycm93SGVhZC5vbignbW91c2Vkb3duJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLmJyaW5nVG9Gcm9udCgpO1xyXG4gICAgICB0aGlzLnRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KDEpO1xyXG5cclxuICAgICAgYXJyb3dIZWFkLm9uKCdtb3VzZXVwJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudG9nZ2xlQWxsQW5jaG9yc09wYWNpdHkoMCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU3RhcnQgcG9pbnQgKGFycm93VGFpbClcclxuICAgIGNvbnN0IGFycm93VGFpbE9wdHMgPSB7XHJcbiAgICAgIHdpZHRoOiAxMCxcclxuICAgICAgaGVpZ2h0OiAxMCxcclxuICAgICAgbGVmdDogcGF0aENvb3Jkcy5NLngsXHJcbiAgICAgIHRvcDogcGF0aENvb3Jkcy5NLnksXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICBmaWxsOiAnI2ZmZicsXHJcbiAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgIHN0cm9rZTogJyMwMDAnLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIHNlbGVjdGFibGU6IHRydWUsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgYXJyb3dUYWlsID0gdGhpcy5hcnJvd1RhaWwgPSBuZXcgZmFicmljLlJlY3QoYXJyb3dUYWlsT3B0cyk7XHJcbiAgICBhcnJvd1RhaWwub24oJ21vdmluZycsICgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVQYXRoKCdmcm9tJywgYXJyb3dUYWlsLmxlZnQsIGFycm93VGFpbC50b3AsIGZhbHNlKTtcclxuICAgICAgdGhpcy5pc1ZhbGlkTWFzay5sZWZ0ID0gYXJyb3dUYWlsLmxlZnQ7XHJcbiAgICAgIHRoaXMuaXNWYWxpZE1hc2sudG9wID0gYXJyb3dUYWlsLnRvcDtcclxuICAgICAgdGhpcy5pc1ZhbGlkTWFzay5zZXQoJ29wYWNpdHknLCAwKTtcclxuXHJcbiAgICAgIC8vIENoZWNrIGlmIGludGVyc2VjdHMgd2l0aCBhbmNob3JcclxuICAgICAgY29uc3QgYW5jaG9ycyA9IGNhbnZhcy5nZXRPYmplY3RzKClcclxuICAgICAgICAuZmlsdGVyKChvKSA9PiBvLnR5cGUgPT09ICdhbmNob3InKTtcclxuICAgICAgYXJyb3dUYWlsLnNldCgnc3Ryb2tlJywgJyMwMDAnKTtcclxuICAgICAgZm9yIChsZXQgYSA9IDA7IGEgPCBhbmNob3JzLmxlbmd0aDsgYSArPSAxKSB7XHJcbiAgICAgICAgaWYgKGFycm93VGFpbC5pbnRlcnNlY3RzV2l0aE9iamVjdChhbmNob3JzW2FdKSkge1xyXG4gICAgICAgICAgdGhpcy5pc1ZhbGlkTWFzay5zZXQoJ29wYWNpdHknLCAwLjUpO1xyXG4gICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZENvbm5lY3Rpb24oJ2Zyb20nLCBhbmNob3JzW2FdLnNoYXBlSWQsIGFuY2hvcnNbYV0uY2FyZGluYWwpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNWYWxpZE1hc2suc2V0KHtcclxuICAgICAgICAgICAgICBzdHJva2U6ICcjNTdiODU3JyxcclxuICAgICAgICAgICAgICBmaWxsOiAnIzU3Yjg1NycsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBhcnJvd1RhaWwuc2V0KCdzdHJva2UnLCAnIzVmNScpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5pc1ZhbGlkTWFzay5zZXQoe1xyXG4gICAgICAgICAgICAgIHN0cm9rZTogJyNlYTRmMzcnLFxyXG4gICAgICAgICAgICAgIGZpbGw6ICcjZWE0ZjM3JyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGFycm93VGFpbC5zZXQoJ3N0cm9rZScsICcjZjU1Jyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGFycm93VGFpbC5vbignbW92ZWQnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aCgnZnJvbScsIGFycm93VGFpbC5sZWZ0LCBhcnJvd1RhaWwudG9wLCB0cnVlKTtcclxuICAgICAgdGhpcy5pc1ZhbGlkTWFzay5zZXQoJ29wYWNpdHknLCAwKTtcclxuXHJcbiAgICAgIC8vIENoZWNrIGlmIGludGVyc2VjdHMgd2l0aCBhbmNob3JcclxuICAgICAgY29uc3QgYW5jaG9ycyA9IGNhbnZhcy5nZXRPYmplY3RzKClcclxuICAgICAgICAuZmlsdGVyKChvKSA9PiBvLnR5cGUgPT09ICdhbmNob3InKTtcclxuICAgICAgZm9yIChsZXQgYSA9IDA7IGEgPCBhbmNob3JzLmxlbmd0aDsgYSArPSAxKSB7XHJcbiAgICAgICAgaWYgKGFycm93VGFpbC5pbnRlcnNlY3RzV2l0aE9iamVjdChhbmNob3JzW2FdKSkge1xyXG4gICAgICAgICAgdGhpcy5jb25uZWN0TGluaygnZnJvbScsIGFuY2hvcnNbYV0uc2hhcGVJZCwgYW5jaG9yc1thXS5jYXJkaW5hbCk7XHJcbiAgICAgICAgICAvLyBhbmNob3JzW2FdLnNldCgnc3Ryb2tlJywgJyMwMDAnKTtcclxuICAgICAgICAgIGFycm93VGFpbC5zZXQoJ3N0cm9rZScsICcjMDAwJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmZyb20gJiYgYW5jaG9yc1thXSA9PT0gdGhpcy5mcm9tLnNoYXBlLmFuY2hvcnNbdGhpcy5mcm9tLmFuY2hvcl0pIHtcclxuICAgICAgICAgIC8vIElmIHRoaXMgbGluayB3YXMgY29ubmVjdGVkIHRvIHRoaXMgYW5jaG9yIGFuZCBpdCBkb2Vzbid0IGludGVyc2VjdCBhbnltb3JlXHJcbiAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3RMaW5rKCdmcm9tJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGFycm93VGFpbC5vbignbW91c2Vkb3duJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLmJyaW5nVG9Gcm9udCgpO1xyXG4gICAgICB0aGlzLnRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KDEpO1xyXG5cclxuICAgICAgYXJyb3dUYWlsLm9uKCdtb3VzZXVwJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudG9nZ2xlQWxsQW5jaG9yc09wYWNpdHkoMCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbmplY3QoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgcGF0aCxcclxuICAgICAgY29udHJvbFBvaW50LFxyXG4gICAgICBjb250cm9sTGluZTEsXHJcbiAgICAgIGNvbnRyb2xMaW5lMixcclxuICAgICAgYXJyb3dIZWFkLFxyXG4gICAgICBhcnJvd1RhaWwsXHJcbiAgICAgIGlzVmFsaWRNYXNrLFxyXG4gICAgfSA9IHRoaXM7XHJcbiAgICBjYW52YXMuYWRkKGNvbnRyb2xQb2ludCk7XHJcbiAgICBjYW52YXMuYWRkKGNvbnRyb2xMaW5lMSk7XHJcbiAgICBjYW52YXMuYWRkKGNvbnRyb2xMaW5lMik7XHJcbiAgICBjYW52YXMuYWRkKGlzVmFsaWRNYXNrKTtcclxuICAgIGNhbnZhcy5hZGQoYXJyb3dIZWFkKTtcclxuICAgIGNhbnZhcy5hZGQoYXJyb3dUYWlsKTtcclxuXHJcbiAgICBjYW52YXMuYWRkKHBhdGgpO1xyXG4gICAgdGhpcy51cGRhdGVQYXRoKCdmcm9tJywgcGF0aC5wYXRoWzBdWzFdLCBwYXRoLnBhdGhbMF1bMl0sIHRydWUpO1xyXG4gICAgdGhpcy51cGRhdGVQYXRoKCd0bycsIHBhdGgucGF0aFsxXVszXSwgcGF0aC5wYXRoWzFdWzRdLCB0cnVlKTtcclxuICAgIHRoaXMudXBkYXRlUGF0aCgnY29udHJvbCcsIHBhdGgucGF0aFsxXVsxXSwgcGF0aC5wYXRoWzFdWzJdLCB0cnVlKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGNvbm5lY3RMaW5rKGxpbmtQb2ludCwgc2hhcGVJZCwgY2FyZGluYWwpIHtcclxuICAgIC8vIENoZWNrIG5vdCBhbHJlYWR5IGNvbm5lY3RlZFxyXG4gICAgaWYgKCF0aGlzLmlzVmFsaWRDb25uZWN0aW9uKGxpbmtQb2ludCwgc2hhcGVJZCwgY2FyZGluYWwpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHNoYXBlID0gdGhpcy5jYW52YXMuZ2V0T2JqZWN0cygpXHJcbiAgICAgIC5maW5kKChvKSA9PiBvLmlkID09PSBzaGFwZUlkKTtcclxuXHJcbiAgICAvLyBEaXNjb25uZWN0IGV4aXN0aW5nIG9iamVjdFxyXG4gICAgdGhpcy5kaXNjb25uZWN0TGluayhsaW5rUG9pbnQpO1xyXG5cclxuICAgIC8vIENvbm5lY3RcclxuICAgIHRoaXNbbGlua1BvaW50XSA9IHtcclxuICAgICAgc2hhcGUsXHJcbiAgICAgIGFuY2hvcjogY2FyZGluYWwsXHJcbiAgICAgIGhhbmRsZXJzOiB7XHJcbiAgICAgICAgb25BbmNob3JQb3NpdGlvbk1vZGlmeWluZzogKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVQYXRoKGxpbmtQb2ludCwgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ubGVmdCwgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0udG9wLCBmYWxzZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkFuY2hvclBvc2l0aW9uTW9kaWZpZWQ6ICgpID0+IHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlUGF0aChsaW5rUG9pbnQsIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLmxlZnQsIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLnRvcCwgdHJ1ZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgICBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5vcGFjaXR5ID0gMDtcclxuICAgIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLm9uKCdwZzpwb3NpdGlvbjptb2RpZnlpbmcnLCB0aGlzW2xpbmtQb2ludF0uaGFuZGxlcnMub25BbmNob3JQb3NpdGlvbk1vZGlmeWluZyk7XHJcbiAgICBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5vbigncGc6cG9zaXRpb246bW9kaWZpZWQnLCB0aGlzW2xpbmtQb2ludF0uaGFuZGxlcnMub25BbmNob3JQb3NpdGlvbk1vZGlmaWVkKTtcclxuXHJcbiAgICAvLyBVcGRhdGUgTGlua1xyXG4gICAgdGhpcy51cGRhdGVQYXRoKGxpbmtQb2ludCwgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ubGVmdCwgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0udG9wLCB0cnVlLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBkaXNjb25uZWN0TGluayhsaW5rUG9pbnQpIHtcclxuICAgIGlmICh0aGlzW2xpbmtQb2ludF0pIHtcclxuICAgICAgdGhpc1tsaW5rUG9pbnRdLnNoYXBlLmFuY2hvcnNbdGhpc1tsaW5rUG9pbnRdLmFuY2hvcl0ub2ZmKCdwZzpwb3NpdGlvbjptb2RpZnlpbmcnLCB0aGlzW2xpbmtQb2ludF0uaGFuZGxlcnMub25BbmNob3JQb3NpdGlvbk1vZGlmeWluZyk7XHJcbiAgICAgIHRoaXNbbGlua1BvaW50XS5zaGFwZS5hbmNob3JzW3RoaXNbbGlua1BvaW50XS5hbmNob3JdLm9mZigncGc6cG9zaXRpb246bW9kaWZpZWQnLCB0aGlzW2xpbmtQb2ludF0uaGFuZGxlcnMub25BbmNob3JQb3NpdGlvbk1vZGlmaWVkKTtcclxuICAgICAgZGVsZXRlIHRoaXNbbGlua1BvaW50XTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlc2V0Q3VydmF0dXJlKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBjb250cm9sUG9pbnQsXHJcbiAgICAgIHBhdGgsXHJcbiAgICB9ID0gdGhpcztcclxuICAgIGNvbnRyb2xQb2ludC5sZWZ0ID0gKHBhdGgucGF0aFswXVsxXSArIHBhdGgucGF0aFsxXVszXSkgLyAyO1xyXG4gICAgY29udHJvbFBvaW50LnRvcCA9IChwYXRoLnBhdGhbMF1bMl0gKyBwYXRoLnBhdGhbMV1bNF0pIC8gMjtcclxuICAgIGNvbnRyb2xQb2ludC5maXJlKCdtb3ZlZCcpO1xyXG4gIH1cclxuXHJcbiAgYnJpbmdUb0Zyb250KCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHBhdGgsXHJcbiAgICAgIGNvbnRyb2xQb2ludCxcclxuICAgICAgYXJyb3dIZWFkLFxyXG4gICAgICBhcnJvd1RhaWwsXHJcbiAgICB9ID0gdGhpcztcclxuICAgIGNhbnZhcy5icmluZ1RvRnJvbnQocGF0aCk7XHJcbiAgICBjYW52YXMuYnJpbmdUb0Zyb250KGNvbnRyb2xQb2ludCk7XHJcbiAgICBjYW52YXMuYnJpbmdUb0Zyb250KGFycm93SGVhZCk7XHJcbiAgICBjYW52YXMuYnJpbmdUb0Zyb250KGFycm93VGFpbCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVQYXRoKGxpbmtQb2ludCwgeCwgeSwgY29tbWl0LCByZXNldEN1cnYpIHtcclxuICAgIGNvbnN0IHBhdGggPSB7XHJcbiAgICAgIE06IHtcclxuICAgICAgICB4OiBsaW5rUG9pbnQgPT09ICdmcm9tJyA/IHggOiB0aGlzLnBhdGgucGF0aFswXVsxXSxcclxuICAgICAgICB5OiBsaW5rUG9pbnQgPT09ICdmcm9tJyA/IHkgOiB0aGlzLnBhdGgucGF0aFswXVsyXSxcclxuICAgICAgfSxcclxuICAgICAgUToge1xyXG4gICAgICAgIHgxOiBsaW5rUG9pbnQgPT09ICdjb250cm9sJyA/IHggOiB0aGlzLnBhdGgucGF0aFsxXVsxXSxcclxuICAgICAgICB5MTogbGlua1BvaW50ID09PSAnY29udHJvbCcgPyB5IDogdGhpcy5wYXRoLnBhdGhbMV1bMl0sXHJcbiAgICAgICAgeDI6IGxpbmtQb2ludCA9PT0gJ3RvJyA/IHggOiB0aGlzLnBhdGgucGF0aFsxXVszXSxcclxuICAgICAgICB5MjogbGlua1BvaW50ID09PSAndG8nID8geSA6IHRoaXMucGF0aC5wYXRoWzFdWzRdLFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICAgIGlmIChjb21taXQpIHtcclxuICAgICAgY29uc3QgcGF0aFN0ciA9IGBNICR7cGF0aC5NLnh9ICR7cGF0aC5NLnl9IFEgJHtwYXRoLlEueDF9LCAke3BhdGguUS55MX0sICR7cGF0aC5RLngyfSwgJHtwYXRoLlEueTJ9YDtcclxuICAgICAgY29uc3QgbmV3UGF0aCA9IG5ldyBmYWJyaWMuUGF0aChwYXRoU3RyLCB0aGlzLmRlZmF1bHRQYXRoT3B0aW9ucyk7XHJcbiAgICAgIHRoaXMuY2FudmFzLnJlbW92ZSh0aGlzLnBhdGgpO1xyXG4gICAgICB0aGlzLmNhbnZhcy5hZGQobmV3UGF0aCk7XHJcblxyXG4gICAgICBuZXdQYXRoLm9uKCdtb3VzZW92ZXInLCB0aGlzLm9uTGlua01vdXNlT3Zlci5iaW5kKHRoaXMpKTtcclxuICAgICAgbmV3UGF0aC5vbignbW91c2VvdXQnLCB0aGlzLm9uTGlua01vdXNlT3V0LmJpbmQodGhpcykpO1xyXG4gICAgICBuZXdQYXRoLm9uKCdtb3VzZWRvd24nLCB0aGlzLmJyaW5nVG9Gcm9udC5iaW5kKHRoaXMpKTtcclxuICAgICAgdGhpcy5wYXRoID0gbmV3UGF0aDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGF0aC5zZXQoJ3BhdGgnLCBbXHJcbiAgICAgICAgWydNJywgcGF0aC5NLngsIHBhdGguTS55XSxcclxuICAgICAgICBbJ1EnLCBwYXRoLlEueDEsIHBhdGguUS55MSwgcGF0aC5RLngyLCBwYXRoLlEueTJdLFxyXG4gICAgICBdKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBVcGRhdGUgY29udHJvbCBsaW5lcywgYXJyb3cgaGVhZHMgYW5kIHRhaWxzXHJcbiAgICB0aGlzLmNvbnRyb2xMaW5lMS5zZXQoe1xyXG4gICAgICB4MTogdGhpcy5jb250cm9sUG9pbnQubGVmdCxcclxuICAgICAgeTE6IHRoaXMuY29udHJvbFBvaW50LnRvcCxcclxuICAgICAgeDI6IHRoaXMucGF0aC5wYXRoWzBdWzFdLFxyXG4gICAgICB5MjogdGhpcy5wYXRoLnBhdGhbMF1bMl0sXHJcbiAgICB9KTtcclxuICAgIHRoaXMuY29udHJvbExpbmUyLnNldCh7XHJcbiAgICAgIHgxOiB0aGlzLmNvbnRyb2xQb2ludC5sZWZ0LFxyXG4gICAgICB5MTogdGhpcy5jb250cm9sUG9pbnQudG9wLFxyXG4gICAgICB4MjogdGhpcy5wYXRoLnBhdGhbMV1bM10sXHJcbiAgICAgIHkyOiB0aGlzLnBhdGgucGF0aFsxXVs0XSxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgYXJyb3dIZWFkQW5nbGUgPSAoTWF0aC5hdGFuMih0aGlzLnBhdGgucGF0aFsxXVs0XSAtIHRoaXMucGF0aC5wYXRoWzFdWzJdLCB0aGlzLnBhdGgucGF0aFsxXVszXSAtIHRoaXMucGF0aC5wYXRoWzFdWzFdKSAqIDE4MCkgLyBNYXRoLlBJO1xyXG4gICAgdGhpcy5hcnJvd0hlYWQuYW5nbGUgPSBhcnJvd0hlYWRBbmdsZSArIDkwO1xyXG4gICAgdGhpcy5hcnJvd0hlYWQubGVmdCA9IHRoaXMucGF0aC5wYXRoWzFdWzNdO1xyXG4gICAgdGhpcy5hcnJvd0hlYWQudG9wID0gdGhpcy5wYXRoLnBhdGhbMV1bNF07XHJcbiAgICB0aGlzLmFycm93SGVhZC5zZXRDb29yZHMoKTtcclxuICAgIHRoaXMuYXJyb3dUYWlsLmxlZnQgPSB0aGlzLnBhdGgucGF0aFswXVsxXTtcclxuICAgIHRoaXMuYXJyb3dUYWlsLnRvcCA9IHRoaXMucGF0aC5wYXRoWzBdWzJdO1xyXG4gICAgdGhpcy5hcnJvd1RhaWwuc2V0Q29vcmRzKCk7XHJcblxyXG4gICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcclxuXHJcbiAgICAvLyBSZXNldCBjb250cm9sIHBvaW50XHJcbiAgICBpZiAocmVzZXRDdXJ2KSB7XHJcbiAgICAgIHRoaXMucmVzZXRDdXJ2YXR1cmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzVmFsaWRDb25uZWN0aW9uKGxpbmtQb2ludCwgc2hhcGVJZCwgY2FyZGluYWwpIHtcclxuICAgIGNvbnN0IHNoYXBlID0gdGhpcy5jYW52YXMuZ2V0T2JqZWN0cygpXHJcbiAgICAgIC5maW5kKChvKSA9PiBvLmlkID09PSBzaGFwZUlkKTtcclxuICAgIC8vIENoZWNrIG5vdCBhbHJlYWR5IGNvbm5lY3RlZFxyXG4gICAgaWYgKGxpbmtQb2ludCA9PT0gJ2Zyb20nKSB7XHJcbiAgICAgIGlmICh0aGlzLmZyb20gJiYgdGhpcy5mcm9tLnNoYXBlICYmIHRoaXMuZnJvbS5zaGFwZS5pZCA9PT0gc2hhcGUuaWQgJiYgdGhpcy5mcm9tLmNhcmRpbmFsID09PSBjYXJkaW5hbCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTsgLy8gdHJ5aW5nIHRvIHNldCB0aGUgc2FtZSBhbHJlYWR5IGNvbm5lY3RlZCBhbmNob3JcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy50byAmJiB0aGlzLnRvLnNoYXBlICYmIHRoaXMudG8uc2hhcGUuaWQgPT09IHNoYXBlLmlkKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyB0cnlpbmcgdG8gc2hvcnQgY2lyY3VpdCB0aGUgcmVjdGFuZ2xlXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAobGlua1BvaW50ID09PSAndG8nKSB7XHJcbiAgICAgIGlmICh0aGlzLnRvICYmIHRoaXMudG8uc2hhcGUgJiYgdGhpcy50by5zaGFwZS5pZCA9PT0gc2hhcGUuaWQgJiYgdGhpcy50by5jYXJkaW5hbCA9PT0gY2FyZGluYWwpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIHRyeWluZyB0byBzZXQgdGhlIHNhbWUgYWxyZWFkeSBjb25uZWN0ZWQgYW5jaG9yXHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuZnJvbSAmJiB0aGlzLmZyb20uc2hhcGUgJiYgdGhpcy5mcm9tLnNoYXBlLmlkID09PSBzaGFwZS5pZCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTsgLy8gdHJ5aW5nIHRvIHNob3J0IGNpcmN1aXQgdGhlIHJlY3RhbmdsZVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KG9wYWNpdHkpIHtcclxuICAgIGNvbnN0IGFuY2hvcnMgPSB0aGlzLmNhbnZhcy5nZXRPYmplY3RzKClcclxuICAgICAgLmZpbHRlcigobykgPT4gby50eXBlID09PSAnYW5jaG9yJyk7XHJcbiAgICBmb3IgKGxldCBhID0gMDsgYSA8IGFuY2hvcnMubGVuZ3RoOyBhICs9IDEpIHtcclxuICAgICAgYW5jaG9yc1thXS50b2dnbGVPcGFjaXR5KG9wYWNpdHkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25MaW5rTW91c2VPdmVyKCkge1xyXG4gICAgdGhpcy5jb250cm9sUG9pbnQudG9nZ2xlT3BhY2l0eSgxKTtcclxuICAgIHRoaXMuY29udHJvbExpbmUxLnRvZ2dsZU9wYWNpdHkoMSk7XHJcbiAgICB0aGlzLmNvbnRyb2xMaW5lMi50b2dnbGVPcGFjaXR5KDEpO1xyXG4gIH1cclxuXHJcbiAgb25MaW5rTW91c2VPdXQoKSB7XHJcbiAgICB0aGlzLmNvbnRyb2xQb2ludC50b2dnbGVPcGFjaXR5KDApO1xyXG4gICAgdGhpcy5jb250cm9sTGluZTEudG9nZ2xlT3BhY2l0eSgwKTtcclxuICAgIHRoaXMuY29udHJvbExpbmUyLnRvZ2dsZU9wYWNpdHkoMCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBMaW5rIGZyb20gJy4vTGluay5qcyc7XHJcblxyXG5jb25zdCB7IGZhYnJpYyB9ID0gd2luZG93O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlua2FibGVTaGFwZSB7XHJcbiAgLyoqXHJcbiAgICogQSBMaW5rYWJsZVNoYXBlIGlzIGFueSBGYWJyaWMuT2JqZWN0IHNoYXBlIG9uIHdoaWNoIGFuY2hvcnMgYXJlIGFwcGVuZGVkIHNvIHRoYXQgbXVsdGlwbGUgTGluayBjYW4gYmUgY29ubmVjdGVkIHRvIGl0LlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBvcHRpb25zXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0ZhYnJpYy5DYW52YXN9ICAgb3B0aW9ucy5jYW52YXMgLSBGYWJyaWMgY2FudmFzXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG9wdGlvbnMuaWQgLSBVbmlxdWUgaWRlbnRpZmllclxyXG4gICAqXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBpZCxcclxuICAgICAgY2FudmFzLFxyXG4gICAgICBzaGFwZSxcclxuICAgICAgbGVmdCxcclxuICAgICAgdG9wLFxyXG4gICAgICBhbmdsZSxcclxuICAgIH0gPSBvcHRpb25zO1xyXG4gICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcblxyXG4gICAgdGhpcy5zaGFwZSA9IG5ldyBmYWJyaWMuR3JvdXAoW3NoYXBlXSwge1xyXG4gICAgICBsZWZ0LFxyXG4gICAgICB0b3AsXHJcbiAgICAgIGhhc0JvcmRlcnM6IHRydWUsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiB0cnVlLFxyXG4gICAgICBvcmlnaW5YOiAnbGVmdCcsXHJcbiAgICAgIG9yaWdpblk6ICd0b3AnLFxyXG4gICAgICBpZCxcclxuICAgICAgYW5nbGU6IGFuZ2xlIHx8IDAsXHJcbiAgICB9KTtcclxuICAgIHRoaXMuc2hhcGUudHlwZSA9ICdsaW5rYWJsZVNoYXBlJztcclxuXHJcbiAgICAvLyBBbmNob3IgcG9pbnRzXHJcbiAgICBjb25zdCBlYXN0ID0gdGhpcy5tYWtlQW5jaG9yUG9pbnQoJ2Vhc3QnKTtcclxuICAgIGNvbnN0IHdlc3QgPSB0aGlzLm1ha2VBbmNob3JQb2ludCgnd2VzdCcpO1xyXG4gICAgY29uc3Qgbm9ydGggPSB0aGlzLm1ha2VBbmNob3JQb2ludCgnbm9ydGgnKTtcclxuICAgIGNvbnN0IHNvdXRoID0gdGhpcy5tYWtlQW5jaG9yUG9pbnQoJ3NvdXRoJyk7XHJcbiAgICBjb25zdCBub3J0aGVhc3QgPSB0aGlzLm1ha2VBbmNob3JQb2ludCgnbm9ydGhlYXN0Jyk7XHJcbiAgICBjb25zdCBub3J0aHdlc3QgPSB0aGlzLm1ha2VBbmNob3JQb2ludCgnbm9ydGh3ZXN0Jyk7XHJcbiAgICBjb25zdCBzb3V0aGVhc3QgPSB0aGlzLm1ha2VBbmNob3JQb2ludCgnc291dGhlYXN0Jyk7XHJcbiAgICBjb25zdCBzb3V0aHdlc3QgPSB0aGlzLm1ha2VBbmNob3JQb2ludCgnc291dGh3ZXN0Jyk7XHJcbiAgICB0aGlzLmFuY2hvcnMgPSB0aGlzLnNoYXBlLmFuY2hvcnMgPSB7XHJcbiAgICAgIGVhc3QsXHJcbiAgICAgIHdlc3QsXHJcbiAgICAgIG5vcnRoLFxyXG4gICAgICBzb3V0aCxcclxuICAgICAgbm9ydGhlYXN0LFxyXG4gICAgICBub3J0aHdlc3QsXHJcbiAgICAgIHNvdXRoZWFzdCxcclxuICAgICAgc291dGh3ZXN0LFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBFdmVudHNcclxuICAgIHRoaXMuc2hhcGUub24oJ21vdXNlb3ZlcicsICgpID0+IHtcclxuICAgICAgdGhpcy50b2dnbGVBbmNob3JzT3BhY2l0eSgxKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zaGFwZS5vbignbW91c2VvdXQnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudG9nZ2xlQW5jaG9yc09wYWNpdHkoMCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc2hhcGUub24oJ21vdmluZycsICgpID0+IHtcclxuICAgICAgdGhpcy5yZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKGZhbHNlKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zaGFwZS5vbignbW92ZWQnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbih0cnVlKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zaGFwZS5vbigncm90YXRpbmcnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbihmYWxzZSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc2hhcGUub24oJ3JvdGF0ZWQnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbih0cnVlKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zaGFwZS5vbignc2NhbGluZycsICgpID0+IHtcclxuICAgICAgdGhpcy5yZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKGZhbHNlKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zaGFwZS5vbignc2NhbGVkJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnJlZnJlc2hBbmNob3JzUG9zaXRpb24odHJ1ZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGluamVjdCgpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgY2FudmFzLFxyXG4gICAgICBzaGFwZSxcclxuICAgICAgYW5jaG9ycyxcclxuICAgIH0gPSB0aGlzO1xyXG4gICAgY2FudmFzLmFkZChzaGFwZSk7XHJcbiAgICBjYW52YXMuYWRkKGFuY2hvcnMuZWFzdCk7XHJcbiAgICBjYW52YXMuYnJpbmdGb3J3YXJkKGFuY2hvcnMuZWFzdCwgdHJ1ZSk7XHJcbiAgICBjYW52YXMuYWRkKGFuY2hvcnMud2VzdCk7XHJcbiAgICBjYW52YXMuYnJpbmdGb3J3YXJkKGFuY2hvcnMud2VzdCwgdHJ1ZSk7XHJcbiAgICBjYW52YXMuYWRkKGFuY2hvcnMubm9ydGgpO1xyXG4gICAgY2FudmFzLmJyaW5nRm9yd2FyZChhbmNob3JzLm5vcnRoLCB0cnVlKTtcclxuICAgIGNhbnZhcy5hZGQoYW5jaG9ycy5zb3V0aCk7XHJcbiAgICBjYW52YXMuYnJpbmdGb3J3YXJkKGFuY2hvcnMuc291dGgsIHRydWUpO1xyXG4gICAgY2FudmFzLmFkZChhbmNob3JzLm5vcnRoZWFzdCk7XHJcbiAgICBjYW52YXMuYnJpbmdGb3J3YXJkKGFuY2hvcnMubm9ydGhlYXN0LCB0cnVlKTtcclxuICAgIGNhbnZhcy5hZGQoYW5jaG9ycy5ub3J0aHdlc3QpO1xyXG4gICAgY2FudmFzLmJyaW5nRm9yd2FyZChhbmNob3JzLm5vcnRod2VzdCwgdHJ1ZSk7XHJcbiAgICBjYW52YXMuYWRkKGFuY2hvcnMuc291dGhlYXN0KTtcclxuICAgIGNhbnZhcy5icmluZ0ZvcndhcmQoYW5jaG9ycy5zb3V0aGVhc3QsIHRydWUpO1xyXG4gICAgY2FudmFzLmFkZChhbmNob3JzLnNvdXRod2VzdCk7XHJcbiAgICBjYW52YXMuYnJpbmdGb3J3YXJkKGFuY2hvcnMuc291dGh3ZXN0LCB0cnVlKTtcclxuICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbih0cnVlKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHJlZnJlc2hBbmNob3JzUG9zaXRpb24oY29tbWl0KSB7XHJcbiAgICB0aGlzLnNldEFuY2hvclBvc2l0aW9uUmVsYXRpdmVUb1JlY3RhbmdsZSgnZWFzdCcsIGNvbW1pdCk7XHJcbiAgICB0aGlzLnNldEFuY2hvclBvc2l0aW9uUmVsYXRpdmVUb1JlY3RhbmdsZSgnd2VzdCcsIHRoaXMuc2hhcGUsIGNvbW1pdCk7XHJcbiAgICB0aGlzLnNldEFuY2hvclBvc2l0aW9uUmVsYXRpdmVUb1JlY3RhbmdsZSgnc291dGgnLCB0aGlzLnNoYXBlLCBjb21taXQpO1xyXG4gICAgdGhpcy5zZXRBbmNob3JQb3NpdGlvblJlbGF0aXZlVG9SZWN0YW5nbGUoJ25vcnRoJywgdGhpcy5zaGFwZSwgY29tbWl0KTtcclxuICAgIHRoaXMuc2V0QW5jaG9yUG9zaXRpb25SZWxhdGl2ZVRvUmVjdGFuZ2xlKCdub3J0aGVhc3QnLCB0aGlzLnNoYXBlLCBjb21taXQpO1xyXG4gICAgdGhpcy5zZXRBbmNob3JQb3NpdGlvblJlbGF0aXZlVG9SZWN0YW5nbGUoJ25vcnRod2VzdCcsIHRoaXMuc2hhcGUsIGNvbW1pdCk7XHJcbiAgICB0aGlzLnNldEFuY2hvclBvc2l0aW9uUmVsYXRpdmVUb1JlY3RhbmdsZSgnc291dGhlYXN0JywgdGhpcy5zaGFwZSwgY29tbWl0KTtcclxuICAgIHRoaXMuc2V0QW5jaG9yUG9zaXRpb25SZWxhdGl2ZVRvUmVjdGFuZ2xlKCdzb3V0aHdlc3QnLCB0aGlzLnNoYXBlLCBjb21taXQpO1xyXG4gIH1cclxuXHJcbiAgc2V0QW5jaG9yUG9zaXRpb25SZWxhdGl2ZVRvUmVjdGFuZ2xlKGNhcmRpbmFsLCBjb21taXQpIHtcclxuICAgIGxldCBsZWZ0O1xyXG4gICAgbGV0IHRvcDtcclxuICAgIGNvbnN0IHsgc2hhcGUgfSA9IHRoaXM7XHJcbiAgICBjb25zdCBhcCA9IHRoaXMuYW5jaG9yc1tjYXJkaW5hbF07XHJcbiAgICBzd2l0Y2ggKGNhcmRpbmFsKSB7XHJcbiAgICAgIGNhc2UgJ2Vhc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IChzaGFwZS5hQ29vcmRzLnRyLnggKyBzaGFwZS5hQ29vcmRzLmJyLngpIC8gMjtcclxuICAgICAgICB0b3AgPSAoc2hhcGUuYUNvb3Jkcy50ci55ICsgc2hhcGUuYUNvb3Jkcy5ici55KSAvIDI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnd2VzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMudGwueCArIHNoYXBlLmFDb29yZHMuYmwueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLnRsLnkgKyBzaGFwZS5hQ29vcmRzLmJsLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMudGwueCArIHNoYXBlLmFDb29yZHMudHIueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLnRsLnkgKyBzaGFwZS5hQ29vcmRzLnRyLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMuYmwueCArIHNoYXBlLmFDb29yZHMuYnIueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLmJsLnkgKyBzaGFwZS5hQ29vcmRzLmJyLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aGVhc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IHNoYXBlLmFDb29yZHMudGwueDtcclxuICAgICAgICB0b3AgPSBzaGFwZS5hQ29vcmRzLnRsLnk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnbm9ydGh3ZXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSBzaGFwZS5hQ29vcmRzLnRyLng7XHJcbiAgICAgICAgdG9wID0gc2hhcGUuYUNvb3Jkcy50ci55O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRoZWFzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gc2hhcGUuYUNvb3Jkcy5ibC54O1xyXG4gICAgICAgIHRvcCA9IHNoYXBlLmFDb29yZHMuYmwueTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aHdlc3QnOlxyXG4gICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgbGVmdCA9IHNoYXBlLmFDb29yZHMuYnIueDtcclxuICAgICAgICB0b3AgPSBzaGFwZS5hQ29vcmRzLmJyLnk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGFwLmxlZnQgPSBsZWZ0O1xyXG4gICAgYXAudG9wID0gdG9wO1xyXG5cclxuICAgIGFwLmZpcmUoY29tbWl0ID8gJ3BnOnBvc2l0aW9uOm1vZGlmaWVkJyA6ICdwZzpwb3NpdGlvbjptb2RpZnlpbmcnKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUFuY2hvcnNPcGFjaXR5KG9wYWNpdHkpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgZWFzdCxcclxuICAgICAgd2VzdCxcclxuICAgICAgbm9ydGgsXHJcbiAgICAgIHNvdXRoLFxyXG4gICAgICBub3J0aGVhc3QsXHJcbiAgICAgIHNvdXRoZWFzdCxcclxuICAgICAgbm9ydGh3ZXN0LFxyXG4gICAgICBzb3V0aHdlc3QsXHJcbiAgICB9ID0gdGhpcy5hbmNob3JzO1xyXG4gICAgZWFzdC50b2dnbGVPcGFjaXR5KG9wYWNpdHkpO1xyXG4gICAgd2VzdC50b2dnbGVPcGFjaXR5KG9wYWNpdHkpO1xyXG4gICAgbm9ydGgudG9nZ2xlT3BhY2l0eShvcGFjaXR5KTtcclxuICAgIHNvdXRoLnRvZ2dsZU9wYWNpdHkob3BhY2l0eSk7XHJcbiAgICBub3J0aGVhc3QudG9nZ2xlT3BhY2l0eShvcGFjaXR5KTtcclxuICAgIHNvdXRoZWFzdC50b2dnbGVPcGFjaXR5KG9wYWNpdHkpO1xyXG4gICAgbm9ydGh3ZXN0LnRvZ2dsZU9wYWNpdHkob3BhY2l0eSk7XHJcbiAgICBzb3V0aHdlc3QudG9nZ2xlT3BhY2l0eShvcGFjaXR5KTtcclxuICB9XHJcblxyXG4gIG1ha2VBbmNob3JQb2ludChjYXJkaW5hbCkge1xyXG4gICAgbGV0IGxlZnQ7XHJcbiAgICBsZXQgdG9wO1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBzaGFwZSxcclxuICAgICAgaWQsXHJcbiAgICB9ID0gdGhpcztcclxuICAgIHN3aXRjaCAoY2FyZGluYWwpIHtcclxuICAgICAgY2FzZSAnZWFzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMudHIueCArIHNoYXBlLmFDb29yZHMuYnIueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLnRyLnkgKyBzaGFwZS5hQ29vcmRzLmJyLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICd3ZXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSAoc2hhcGUuYUNvb3Jkcy50bC54ICsgc2hhcGUuYUNvb3Jkcy5ibC54KSAvIDI7XHJcbiAgICAgICAgdG9wID0gKHNoYXBlLmFDb29yZHMudGwueSArIHNoYXBlLmFDb29yZHMuYmwueSkgLyAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRoJzoge1xyXG4gICAgICAgIGxlZnQgPSAoc2hhcGUuYUNvb3Jkcy50bC54ICsgc2hhcGUuYUNvb3Jkcy50ci54KSAvIDI7XHJcbiAgICAgICAgdG9wID0gKHNoYXBlLmFDb29yZHMudGwueSArIHNoYXBlLmFDb29yZHMudHIueSkgLyAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRoJzoge1xyXG4gICAgICAgIGxlZnQgPSAoc2hhcGUuYUNvb3Jkcy5ibC54ICsgc2hhcGUuYUNvb3Jkcy5ici54KSAvIDI7XHJcbiAgICAgICAgdG9wID0gKHNoYXBlLmFDb29yZHMuYmwueSArIHNoYXBlLmFDb29yZHMuYnIueSkgLyAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRoZWFzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gc2hhcGUuYUNvb3Jkcy50bC54O1xyXG4gICAgICAgIHRvcCA9IHNoYXBlLmFDb29yZHMudGwueTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aHdlc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IHNoYXBlLmFDb29yZHMudHIueDtcclxuICAgICAgICB0b3AgPSBzaGFwZS5hQ29vcmRzLnRyLnk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnc291dGhlYXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSBzaGFwZS5hQ29vcmRzLmJsLng7XHJcbiAgICAgICAgdG9wID0gc2hhcGUuYUNvb3Jkcy5ibC55O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRod2VzdCc6XHJcbiAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICBsZWZ0ID0gc2hhcGUuYUNvb3Jkcy5ici54O1xyXG4gICAgICAgIHRvcCA9IHNoYXBlLmFDb29yZHMuYnIueTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFwID0gbmV3IGZhYnJpYy5DaXJjbGUoe1xyXG4gICAgICBsZWZ0LFxyXG4gICAgICB0b3AsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAyLFxyXG4gICAgICByYWRpdXM6IDYsXHJcbiAgICAgIGZpbGw6ICcjNzhiZWZhJywgLy8gNDJhMmRhIGQ1ZThmMlxyXG4gICAgICBzdHJva2U6ICcjNzhiZWZhJyxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICBoYXNCb3JkZXJzOiBmYWxzZSxcclxuICAgICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgICBzZWxlY3RhYmxlOiBmYWxzZSxcclxuICAgICAgb3BhY2l0eTogMCxcclxuICAgICAgaWQ6IGAke2lkfV8ke2NhcmRpbmFsfWAsXHJcbiAgICB9KTtcclxuICAgIGFwLnR5cGUgPSAnYW5jaG9yJztcclxuICAgIGFwLnNoYXBlSWQgPSBpZDtcclxuICAgIGFwLmNhcmRpbmFsID0gY2FyZGluYWw7XHJcbiAgICBhcC5vbignbW91c2VvdmVyJywgKCkgPT4ge1xyXG4gICAgICBhcC50b2dnbGVPcGFjaXR5KDEpO1xyXG4gICAgICAvLyBhcC5zZXQoJ3N0cm9rZScsICcjNTVmJyk7XHJcbiAgICB9KTtcclxuICAgIGFwLm9uKCdtb3VzZW91dCcsICgpID0+IHtcclxuICAgICAgYXAudG9nZ2xlT3BhY2l0eSgwKTtcclxuICAgICAgLy8gYXAuc2V0KCdzdHJva2UnLCAnIzY2NicpO1xyXG4gICAgfSk7XHJcbiAgICBhcC5vbignbW91c2VkYmxjbGljaycsICgpID0+IHtcclxuICAgICAgY29uc3QgeyBjYW52YXMgfSA9IHRoaXM7XHJcbiAgICAgIGNvbnN0IG5ld0xpbmsgPSBuZXcgTGluayh7XHJcbiAgICAgICAgY2FudmFzLFxyXG4gICAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgICB4OiBhcC5sZWZ0LFxyXG4gICAgICAgICAgeTogYXAudG9wLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW5kOiB7XHJcbiAgICAgICAgICB4OiBhcC5sZWZ0LFxyXG4gICAgICAgICAgeTogYXAudG9wLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgICBuZXdMaW5rLmluamVjdChjYW52YXMpO1xyXG4gICAgICBuZXdMaW5rLmNvbm5lY3RMaW5rKCdmcm9tJywgYXAuc2hhcGVJZCwgYXAuY2FyZGluYWwpO1xyXG4gICAgICBuZXdMaW5rLmFycm93SGVhZC5maXJlKCdtb3VzZWRvd24nKTtcclxuXHJcbiAgICAgIGNvbnN0IG9uTW91c2VNb3ZlID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgbmV3TGluay5hcnJvd0hlYWQubGVmdCA9IGV2ZW50LnBvaW50ZXIueDtcclxuICAgICAgICBuZXdMaW5rLmFycm93SGVhZC50b3AgPSBldmVudC5wb2ludGVyLnk7XHJcbiAgICAgICAgbmV3TGluay5hcnJvd0hlYWQuZmlyZSgnbW92aW5nJyk7XHJcbiAgICAgIH07XHJcbiAgICAgIGNhbnZhcy5vbignbW91c2U6bW92ZScsIG9uTW91c2VNb3ZlKTtcclxuXHJcbiAgICAgIGNvbnN0IG9uTW91c2VDbGljayA9ICgpID0+IHtcclxuICAgICAgICBuZXdMaW5rLmFycm93SGVhZC5maXJlKCdtb3ZlZCcpO1xyXG4gICAgICAgIG5ld0xpbmsuYXJyb3dIZWFkLmZpcmUoJ21vdXNldXAnKTtcclxuICAgICAgICBjYW52YXMub2ZmKCdtb3VzZTptb3ZlJywgb25Nb3VzZU1vdmUpO1xyXG4gICAgICAgIGNhbnZhcy5vZmYoJ21vdXNlOnVwJywgb25Nb3VzZUNsaWNrKTtcclxuICAgICAgICBuZXdMaW5rLnJlc2V0Q3VydmF0dXJlKCk7XHJcbiAgICAgIH07XHJcbiAgICAgIGNhbnZhcy5vbignbW91c2U6dXAnLCBvbk1vdXNlQ2xpY2spO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gYXA7XHJcbiAgfVxyXG59XHJcbiIsImNvbnN0IHsgZmFicmljIH0gPSB3aW5kb3c7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9jZXNzR3JhcGgge1xyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQHBhcmFtIG9wdGlvbnNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Q2FudmFzfSBvcHRpb25zLmNhbnZhcyAtIEZhYnJpY0pTLkNhbnZhcyBpbnN0YW5jZSAtIG1hbmRhdG9yeSBpZiBvcHRpb25zLmNhbnZhc09wdHMgbm90IHByb3ZpZGVkLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuY2FudmFzT3B0cyAtIEZhYnJpY0pTLkNhbnZhcyNpbml0aWFsaXplIHBhcmFtZXRlcnMgLSBtYW5kYXRvcnkgaWYgb3B0aW9ucy5jYW52YXMgbm90IHByb3ZpZGVkXHJcbiAgICogICAgICAgICAgICAgICAgIFNlZSBodHRwOi8vZmFicmljanMuY29tL2RvY3MvZmFicmljLkNhbnZhcy5odG1sI2luaXRpYWxpemUgZm9yIGRldGFpbHNcclxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fFN0cmluZ30gb3B0aW9ucy5jYW52YXMuZWwgLSA8Y2FudmFzPiBlbGVtZW50IHRvIGluaXRpYWxpemUgaW5zdGFuY2Ugb25cclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5jYW52YXMub3B0aW9ucyAtIE9wdGlvbnMgb2JqZWN0XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZ3JpZF0gLSBkaW1lbnNpb25zIG9mIHRoZSBncmlkXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgdGhpcy5oYW5kbGVycyA9IHtcclxuICAgICAgZ3JpZDoge30sXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEluaXRpYWxpemUgQ2FudmFzXHJcbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLmNhbnZhcyA9IG9wdGlvbnMuY2FudmFzID8gb3B0aW9ucy5jYW52YXMgOiBuZXcgZmFicmljLkNhbnZhcyhvcHRpb25zLmNhbnZhc09wdHMuZWwsIG9wdGlvbnMuY2FudmFzT3B0cy5vcHRpb25zKTtcclxuICAgIGNhbnZhcy5zZXQoJ3ByZXNlcnZlT2JqZWN0U3RhY2tpbmcnLCB0cnVlKTtcclxuXHJcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZ3JpZCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgdGhpcy5zZXRHcmlkKHtcclxuICAgICAgICBncmlkOiBvcHRpb25zLmdyaWQsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGZhYnJpYy5PYmplY3QucHJvdG90eXBlLm9yaWdpblggPSBmYWJyaWMuT2JqZWN0LnByb3RvdHlwZS5vcmlnaW5ZID0gJ2NlbnRlcic7XHJcbiAgICBmYWJyaWMuT2JqZWN0LnByb3RvdHlwZS50b2dnbGVPcGFjaXR5ID0gZnVuY3Rpb24gKG9wYWNpdHksIHRpbWVvdXQpIHtcclxuICAgICAgdGhpcy5hbmltYXRlKCdvcGFjaXR5Jywgb3BhY2l0eSwge1xyXG4gICAgICAgIGR1cmF0aW9uOiB0aW1lb3V0ICE9PSB1bmRlZmluZWQgPyB0aW1lb3V0IDogMzAwLFxyXG4gICAgICAgIG9uQ2hhbmdlOiB0aGlzLmNhbnZhcy5yZW5kZXJBbGwuYmluZCh0aGlzLmNhbnZhcyksXHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBjYW52YXMuY2FsY09mZnNldCgpO1xyXG4gICAgY29uc3Qgb25TZWxlY3Rpb24gPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGFjdGl2ZSA9IGNhbnZhcy5nZXRBY3RpdmVPYmplY3QoKTtcclxuICAgICAgLy8gV2hlbiBtdWx0aSBzZWxlY3Rpb24sIHJlbW92ZSBhbnkgbm9uIFJlY3RhbmdsZSBvYmplY3RzXHJcbiAgICAgIGlmIChhY3RpdmUudHlwZSA9PT0gJ2FjdGl2ZVNlbGVjdGlvbicpIHtcclxuICAgICAgICBjb25zdCBvYmplY3RzID0gYWN0aXZlLmdldE9iamVjdHMoKTtcclxuICAgICAgICBpZiAob2JqZWN0cy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICBjb25zdCBvbmx5UmVjdCA9IG9iamVjdHMuZmlsdGVyKChvKSA9PiBvLnR5cGUgPT09ICdsaW5rYWJsZVNoYXBlJyk7XHJcbiAgICAgICAgICBjYW52YXMuX2Rpc2NhcmRBY3RpdmVPYmplY3QoKTtcclxuICAgICAgICAgIGNvbnN0IHNlbCA9IG5ldyBmYWJyaWMuQWN0aXZlU2VsZWN0aW9uKG9ubHlSZWN0LCB7XHJcbiAgICAgICAgICAgIGNhbnZhcyxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgY2FudmFzLl9zZXRBY3RpdmVPYmplY3Qoc2VsKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICBjYW52YXMub24oe1xyXG4gICAgICAnc2VsZWN0aW9uOmNyZWF0ZWQnOiBvblNlbGVjdGlvbixcclxuICAgICAgJ3NlbGVjdGlvbjp1cGRhdGVkJzogb25TZWxlY3Rpb24sXHJcbiAgICAgIC8vICdzZWxlY3Rpb246Y2xlYXJlZCc6IG9uU2VsZWN0aW9uQ2xlYXJlZFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgY2FudmFzIHRvIGhhdmUgYSBncmlkLlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuZ3JpZCAtIGdyaWQgc3BhY2luZyAocGl4ZWxzKVxyXG4gICAqL1xyXG4gIHNldEdyaWQob3B0aW9ucykge1xyXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmdyaWQgIT09ICdudW1iZXInIHx8IG9wdGlvbnMuZ3JpZCA8IDApIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50IFwiZ3JpZFwiIGluIFByb2Nlc3NHcmFwI3NldEdyaWQuIChyZXF1aXJlZDogTnVtYmVyID4gMCknKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmdyaWQgPSBvcHRpb25zLmdyaWQ7XHJcbiAgICBjb25zdCB7IGNhbnZhcyB9ID0gdGhpcztcclxuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLW11bHRpLXN0ciAqL1xyXG4gICAgY29uc3QgZGF0YSA9IGA8c3ZnIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+IFxcXHJcbiAgICAgICAgPGRlZnM+IFxcXHJcbiAgICAgICAgICAgIDxwYXR0ZXJuIGlkPVwic21hbGxHcmlkXCIgd2lkdGg9XCIke3RoaXMuZ3JpZH1cIiBoZWlnaHQ9XCIke3RoaXMuZ3JpZH1cIiBwYXR0ZXJuVW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiPiBcXFxyXG4gICAgICAgICAgICAgICAgPHBhdGggZD1cIk0gJHt0aGlzLmdyaWR9IDAgTCAwIDAgMCAke3RoaXMuZ3JpZH1cIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImdyYXlcIiBzdHJva2Utd2lkdGg9XCIwLjVcIiAvPiBcXFxyXG4gICAgICAgICAgICA8L3BhdHRlcm4+IFxcXHJcbiAgICAgICAgICAgIDxwYXR0ZXJuIGlkPVwiZ3JpZFwiIHdpZHRoPVwiJHt0aGlzLmdyaWQgKiA1fVwiIGhlaWdodD1cIiR7dGhpcy5ncmlkICogNX1cIiBwYXR0ZXJuVW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiPiBcXFxyXG4gICAgICAgICAgICAgICAgPHJlY3Qgd2lkdGg9XCIke3RoaXMuZ3JpZCAqIDV9XCIgaGVpZ2h0PVwiJHt0aGlzLmdyaWQgKiA1fVwiIGZpbGw9XCJ1cmwoI3NtYWxsR3JpZClcIiAvPiBcXFxyXG4gICAgICAgICAgICAgICAgPHBhdGggZD1cIk0gJHt0aGlzLmdyaWQgKiA1fSAwIEwgMCAwIDAgJHt0aGlzLmdyaWQgKiA1fVwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiZ3JheVwiIHN0cm9rZS13aWR0aD1cIjFcIiAvPiBcXFxyXG4gICAgICAgICAgICA8L3BhdHRlcm4+IFxcXHJcbiAgICAgICAgPC9kZWZzPiBcXFxyXG4gICAgICAgIDxyZWN0IHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiBmaWxsPVwidXJsKCNncmlkKVwiIC8+IFxcXHJcbiAgICA8L3N2Zz5gO1xyXG4gICAgLyogZXNsaW50LWVuYWJsZSBuby1tdWx0aS1zdHIgKi9cclxuXHJcbiAgICBjb25zdCBET01VUkwgPSB3aW5kb3cuVVJMIHx8IHdpbmRvdy53ZWJraXRVUkwgfHwgd2luZG93O1xyXG4gICAgY29uc3Qgc3ZnID0gbmV3IEJsb2IoW2RhdGFdLCB7IHR5cGU6ICdpbWFnZS9zdmcreG1sO2NoYXJzZXQ9dXRmLTgnIH0pO1xyXG4gICAgY29uc3QgdXJsID0gRE9NVVJMLmNyZWF0ZU9iamVjdFVSTChzdmcpO1xyXG4gICAgZmFicmljLnV0aWwubG9hZEltYWdlKHVybCwgKGltZykgPT4ge1xyXG4gICAgICBjb25zdCBiZyA9IG5ldyBmYWJyaWMuUmVjdCh7XHJcbiAgICAgICAgd2lkdGg6IGNhbnZhcy53aWR0aCwgaGVpZ2h0OiBjYW52YXMuaGVpZ2h0LCBldmVudGVkOiBmYWxzZSwgc2VsZWN0YWJsZTogZmFsc2UsXHJcbiAgICAgIH0pO1xyXG4gICAgICBiZy5maWxsID0gbmV3IGZhYnJpYy5QYXR0ZXJuKHsgc291cmNlOiBpbWcgfSxcclxuICAgICAgICAoKCkgPT4geyBiZy5kaXJ0eSA9IHRydWU7IGNhbnZhcy5yZXF1ZXN0UmVuZGVyQWxsKCk7IH0pKTtcclxuICAgICAgYmcuY2FudmFzID0gY2FudmFzO1xyXG4gICAgICBjYW52YXMuc2V0KCdiYWNrZ3JvdW5kSW1hZ2UnLCBiZyk7XHJcblxyXG4gICAgICAvLyBTbmFwIHRvIGdyaWQgZWZmZWN0c1xyXG4gICAgICBjYW52YXMub2ZmKHRoaXMuaGFuZGxlcnMuZ3JpZCk7XHJcbiAgICAgIHRoaXMuaGFuZGxlcnMuZ3JpZCA9IHtcclxuICAgICAgICAnb2JqZWN0Om1vdmluZyc6IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgeyBncmlkIH0gPSB0aGlzO1xyXG4gICAgICAgICAgY29uc3QgeyB0YXJnZXQgfSA9IGV2ZW50O1xyXG4gICAgICAgICAgaWYgKHRhcmdldC50eXBlICE9PSAnbGlua2FibGVTaGFwZScpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZXZlbnQudGFyZ2V0LnNldCh7XHJcbiAgICAgICAgICAgIGxlZnQ6IE1hdGgucm91bmQoZXZlbnQudGFyZ2V0LmxlZnQgLyBncmlkKSAqIGdyaWQsXHJcbiAgICAgICAgICAgIHRvcDogTWF0aC5yb3VuZChldmVudC50YXJnZXQudG9wIC8gZ3JpZCkgKiBncmlkLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAnb2JqZWN0OnNjYWxpbmcnOiAoZXZlbnQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHsgZ3JpZCB9ID0gdGhpcztcclxuICAgICAgICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBldmVudDtcclxuXHJcbiAgICAgICAgICBpZiAodGFyZ2V0LnR5cGUgIT09ICdsaW5rYWJsZVNoYXBlJykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc3QgdyA9IHRhcmdldC53aWR0aCAqIHRhcmdldC5zY2FsZVg7XHJcbiAgICAgICAgICBjb25zdCBoID0gdGFyZ2V0LmhlaWdodCAqIHRhcmdldC5zY2FsZVk7XHJcbiAgICAgICAgICBjb25zdCBzbmFwID0geyAvLyBDbG9zZXN0IHNuYXBwaW5nIHBvaW50c1xyXG4gICAgICAgICAgICB0b3A6IE1hdGgucm91bmQodGFyZ2V0LnRvcCAvIGdyaWQpICogZ3JpZCxcclxuICAgICAgICAgICAgbGVmdDogTWF0aC5yb3VuZCh0YXJnZXQubGVmdCAvIGdyaWQpICogZ3JpZCxcclxuICAgICAgICAgICAgYm90dG9tOiBNYXRoLnJvdW5kKCh0YXJnZXQudG9wICsgaCkgLyBncmlkKSAqIGdyaWQsXHJcbiAgICAgICAgICAgIHJpZ2h0OiBNYXRoLnJvdW5kKCh0YXJnZXQubGVmdCArIHcpIC8gZ3JpZCkgKiBncmlkLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIGNvbnN0IHRocmVzaG9sZCA9IGdyaWQ7XHJcbiAgICAgICAgICBjb25zdCBkaXN0ID0geyAvLyBEaXN0YW5jZSBmcm9tIHNuYXBwaW5nIHBvaW50c1xyXG4gICAgICAgICAgICB0b3A6IE1hdGguYWJzKHNuYXAudG9wIC0gdGFyZ2V0LnRvcCksXHJcbiAgICAgICAgICAgIGxlZnQ6IE1hdGguYWJzKHNuYXAubGVmdCAtIHRhcmdldC5sZWZ0KSxcclxuICAgICAgICAgICAgYm90dG9tOiBNYXRoLmFicyhzbmFwLmJvdHRvbSAtIHRhcmdldC50b3AgLSBoKSxcclxuICAgICAgICAgICAgcmlnaHQ6IE1hdGguYWJzKHNuYXAucmlnaHQgLSB0YXJnZXQubGVmdCAtIHcpLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIGNvbnN0IGF0dHJzID0ge1xyXG4gICAgICAgICAgICBzY2FsZVg6IHRhcmdldC5zY2FsZVgsXHJcbiAgICAgICAgICAgIHNjYWxlWTogdGFyZ2V0LnNjYWxlWSxcclxuICAgICAgICAgICAgdG9wOiB0YXJnZXQudG9wLFxyXG4gICAgICAgICAgICBsZWZ0OiB0YXJnZXQubGVmdCxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBzd2l0Y2ggKHRhcmdldC5fX2Nvcm5lcikge1xyXG4gICAgICAgICAgICBjYXNlICd0bCc6XHJcbiAgICAgICAgICAgICAgaWYgKGRpc3QubGVmdCA8IGRpc3QudG9wICYmIGRpc3QubGVmdCA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVYID0gKHcgLSAoc25hcC5sZWZ0IC0gdGFyZ2V0LmxlZnQpKSAvIHRhcmdldC53aWR0aDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWSA9IChhdHRycy5zY2FsZVggLyB0YXJnZXQuc2NhbGVYKSAqIHRhcmdldC5zY2FsZVk7XHJcbiAgICAgICAgICAgICAgICBhdHRycy50b3AgPSB0YXJnZXQudG9wICsgKGggLSB0YXJnZXQuaGVpZ2h0ICogYXR0cnMuc2NhbGVZKTtcclxuICAgICAgICAgICAgICAgIGF0dHJzLmxlZnQgPSBzbmFwLmxlZnQ7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChkaXN0LnRvcCA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVZID0gKGggLSAoc25hcC50b3AgLSB0YXJnZXQudG9wKSkgLyB0YXJnZXQuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVYID0gKGF0dHJzLnNjYWxlWSAvIHRhcmdldC5zY2FsZVkpICogdGFyZ2V0LnNjYWxlWDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLmxlZnQgKz0gKHcgLSB0YXJnZXQud2lkdGggKiBhdHRycy5zY2FsZVgpO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMudG9wID0gc25hcC50b3A7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtdCc6XHJcbiAgICAgICAgICAgICAgaWYgKGRpc3QudG9wIDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoaCAtIChzbmFwLnRvcCAtIHRhcmdldC50b3ApKSAvIHRhcmdldC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBhdHRycy50b3AgPSBzbmFwLnRvcDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RyJzpcclxuICAgICAgICAgICAgICBpZiAoZGlzdC5yaWdodCA8IGRpc3QudG9wICYmIGRpc3QucmlnaHQgPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWCA9IChzbmFwLnJpZ2h0IC0gdGFyZ2V0LmxlZnQpIC8gdGFyZ2V0LndpZHRoO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVZID0gKGF0dHJzLnNjYWxlWCAvIHRhcmdldC5zY2FsZVgpICogdGFyZ2V0LnNjYWxlWTtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnRvcCA9IHRhcmdldC50b3AgKyAoaCAtIHRhcmdldC5oZWlnaHQgKiBhdHRycy5zY2FsZVkpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlzdC50b3AgPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWSA9IChoIC0gKHNuYXAudG9wIC0gdGFyZ2V0LnRvcCkpIC8gdGFyZ2V0LmhlaWdodDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWCA9IChhdHRycy5zY2FsZVkgLyB0YXJnZXQuc2NhbGVZKSAqIHRhcmdldC5zY2FsZVg7XHJcbiAgICAgICAgICAgICAgICBhdHRycy50b3AgPSBzbmFwLnRvcDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ21sJzpcclxuICAgICAgICAgICAgICBpZiAoZGlzdC5sZWZ0IDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVggPSAodyAtIChzbmFwLmxlZnQgLSB0YXJnZXQubGVmdCkpIC8gdGFyZ2V0LndpZHRoO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMubGVmdCA9IHNuYXAubGVmdDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ21yJzpcclxuICAgICAgICAgICAgICBpZiAoZGlzdC5yaWdodCA8IHRocmVzaG9sZCkgYXR0cnMuc2NhbGVYID0gKHNuYXAucmlnaHQgLSB0YXJnZXQubGVmdCkgLyB0YXJnZXQud2lkdGg7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsJzpcclxuICAgICAgICAgICAgICBpZiAoZGlzdC5sZWZ0IDwgZGlzdC5ib3R0b20gJiYgZGlzdC5sZWZ0IDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVggPSAodyAtIChzbmFwLmxlZnQgLSB0YXJnZXQubGVmdCkpIC8gdGFyZ2V0LndpZHRoO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVZID0gKGF0dHJzLnNjYWxlWCAvIHRhcmdldC5zY2FsZVgpICogdGFyZ2V0LnNjYWxlWTtcclxuICAgICAgICAgICAgICAgIGF0dHJzLmxlZnQgPSBzbmFwLmxlZnQ7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChkaXN0LmJvdHRvbSA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVZID0gKHNuYXAuYm90dG9tIC0gdGFyZ2V0LnRvcCkgLyB0YXJnZXQuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVYID0gKGF0dHJzLnNjYWxlWSAvIHRhcmdldC5zY2FsZVkpICogdGFyZ2V0LnNjYWxlWDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLmxlZnQgKz0gKHcgLSB0YXJnZXQud2lkdGggKiBhdHRycy5zY2FsZVgpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbWInOlxyXG4gICAgICAgICAgICAgIGlmIChkaXN0LmJvdHRvbSA8IHRocmVzaG9sZCkgYXR0cnMuc2NhbGVZID0gKHNuYXAuYm90dG9tIC0gdGFyZ2V0LnRvcCkgLyB0YXJnZXQuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdicic6XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgaWYgKGRpc3QucmlnaHQgPCBkaXN0LmJvdHRvbSAmJiBkaXN0LnJpZ2h0IDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVggPSAoc25hcC5yaWdodCAtIHRhcmdldC5sZWZ0KSAvIHRhcmdldC53aWR0aDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWSA9IChhdHRycy5zY2FsZVggLyB0YXJnZXQuc2NhbGVYKSAqIHRhcmdldC5zY2FsZVk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChkaXN0LmJvdHRvbSA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVZID0gKHNuYXAuYm90dG9tIC0gdGFyZ2V0LnRvcCkgLyB0YXJnZXQuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVYID0gKGF0dHJzLnNjYWxlWSAvIHRhcmdldC5zY2FsZVkpICogdGFyZ2V0LnNjYWxlWDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0YXJnZXQuc2V0KGF0dHJzKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9O1xyXG4gICAgICBpZiAodGhpcy5ncmlkID4gMCkge1xyXG4gICAgICAgIGNhbnZhcy5vbih0aGlzLmhhbmRsZXJzLmdyaWQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19
