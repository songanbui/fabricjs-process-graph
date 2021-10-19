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

var _Link = _interopRequireDefault(require("./Link.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
   * @param {Number}          options.width
   * @param {Number}          options.height
   * @param {String}          options.label
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
      width: options.width ? options.width : 200,
      height: options.height ? options.height : 100
    });
    var text = new fabric.Textbox(options.label, {
      left: rect.width / 2,
      top: rect.height / 2,
      styles: {},
      fontSize: 14,
      fontFamily: 'Helvetica',
      textAlign: 'center',
      originX: 'center',
      originY: 'center',
      width: 190,
      height: 90,
      splitByGrapheme: true
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

  _createClass(Container, [{
    key: "_onAnchorClick",
    value: function _onAnchorClick(options) {
      var _this$shape = this.shape,
          id = _this$shape.id,
          left = _this$shape.left,
          top = _this$shape.top,
          angle = _this$shape.angle,
          canvas = _this$shape.canvas,
          width = _this$shape.width,
          height = _this$shape.height;
      var ap = options.target;
      var cardinal = ap.cardinal;
      var spacing = 50;
      var nextContainer = new Container({
        canvas: canvas,
        id: "".concat(id, "_next_").concat(cardinal, "_").concat(Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)),
        left: left,
        top: top,
        angle: angle,
        label: "".concat(id, "_next_").concat(cardinal)
      });
      nextContainer.inject();
      var newOptions = {};
      var targetCardinal;

      switch (cardinal) {
        case 'east':
          {
            targetCardinal = 'west';
            newOptions.x = top;
            newOptions.y = left + width + spacing;
            break;
          }

        case 'west':
          {
            targetCardinal = 'east';
            newOptions.x = top;
            newOptions.y = left - width - spacing;
            break;
          }

        case 'north':
          {
            targetCardinal = 'south';
            newOptions.x = top - height - spacing;
            newOptions.y = left;
            break;
          }

        case 'south':
          {
            targetCardinal = 'north';
            newOptions.x = top + height + spacing;
            newOptions.y = left;
            break;
          }

        case 'northeast':
          {
            targetCardinal = 'southwest';
            newOptions.x = top - height - spacing;
            newOptions.y = left + width + spacing;
            break;
          }

        case 'northwest':
          {
            targetCardinal = 'southeast';
            newOptions.x = top - height - spacing;
            newOptions.y = left - width - spacing;
            break;
          }

        case 'southeast':
          {
            targetCardinal = 'northwest';
            newOptions.x = top + height + spacing;
            newOptions.y = left + width + spacing;
            break;
          }

        case 'southwest':
        default:
          {
            targetCardinal = 'northeast';
            newOptions.x = top + height + spacing;
            newOptions.y = left - width - spacing;
            break;
          }
      }

      nextContainer.move(newOptions); // nextContainer.rotate(angle);

      var newLink = new _Link["default"]({
        canvas: canvas,
        start: {
          x: ap.left,
          y: ap.top
        },
        end: {
          x: nextContainer.anchors[targetCardinal].left,
          y: nextContainer.anchors[targetCardinal].top
        }
      });
      newLink.inject(canvas);
      newLink.connectLink('from', ap.shapeId, ap.cardinal);
      newLink.connectLink('to', nextContainer.anchors[targetCardinal].shapeId, nextContainer.anchors[targetCardinal].cardinal);
    }
  }, {
    key: "_onAnchorDoubleClick",
    value: function _onAnchorDoubleClick(options) {
      var ap = options.target;
      var canvas = this.canvas;
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
    }
  }]);

  return Container;
}(_LinkableShape2["default"]);

exports["default"] = Container;

},{"./Link.js":3,"./LinkableShape.js":4}],3:[function(require,module,exports){
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
      objectCaching: false,
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
      objectCaching: false,
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
      hasControls: false
    };
    var arrowHead = this.arrowHead = new fabric.Triangle(arrowHeadOpts);
    arrowHead.on('moving', function () {
      _this.updatePath('to', arrowHead.left, arrowHead.top, false);

      _this.isValidMask.left = arrowHead.left;
      _this.isValidMask.top = arrowHead.top;

      _this.isValidMask.setCoords();

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
      hasControls: false
    };
    var arrowTail = this.arrowTail = new fabric.Rect(arrowTailOpts);
    arrowTail.on('moving', function () {
      _this.updatePath('from', arrowTail.left, arrowTail.top, false);

      _this.isValidMask.left = arrowTail.left;
      _this.isValidMask.top = arrowTail.top;

      _this.isValidMask.setCoords();

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
      controlPoint.setCoords();
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
      var _this3 = this;

      var anchors = this.canvas.getObjects().filter(function (o) {
        return o.type === 'anchor';
      });
      var promises = [];

      var promiseFactory = function promiseFactory(anchor) {
        return function (resolve) {
          anchor.animate('opacity', opacity, {
            duration: 300,
            onChange: resolve
          });
        };
      };

      for (var a = 0; a < anchors.length; a += 1) {
        promises.push(new Promise(promiseFactory(anchors[a])));
      }

      Promise.all(promises).then(function () {
        _this3.canvas.renderAll();
      });
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
      modification.setCoords();
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
      modification.setCoords();
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

    var east = this._makeAnchorPoint('east');

    var west = this._makeAnchorPoint('west');

    var north = this._makeAnchorPoint('north');

    var south = this._makeAnchorPoint('south');

    var northeast = this._makeAnchorPoint('northeast');

    var northwest = this._makeAnchorPoint('northwest');

    var southeast = this._makeAnchorPoint('southeast');

    var southwest = this._makeAnchorPoint('southwest');

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
    key: "move",
    value: function move(options) {
      if (options.x) this.shape.set('top', options.x);
      if (options.y) this.shape.set('left', options.y);
      this.shape.setCoords();
      this.refreshAnchorsPosition();
    }
  }, {
    key: "rotate",
    value: function rotate(angle) {
      this.shape.rotate(angle);
      this.shape.setCoords();
      this.refreshAnchorsPosition();
    }
  }, {
    key: "refreshAnchorsPosition",
    value: function refreshAnchorsPosition(commit) {
      this._setAnchorPositionRelativeToRectangle('east', commit);

      this._setAnchorPositionRelativeToRectangle('west', this.shape, commit);

      this._setAnchorPositionRelativeToRectangle('south', this.shape, commit);

      this._setAnchorPositionRelativeToRectangle('north', this.shape, commit);

      this._setAnchorPositionRelativeToRectangle('northeast', this.shape, commit);

      this._setAnchorPositionRelativeToRectangle('northwest', this.shape, commit);

      this._setAnchorPositionRelativeToRectangle('southeast', this.shape, commit);

      this._setAnchorPositionRelativeToRectangle('southwest', this.shape, commit);
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
    key: "_setAnchorPositionRelativeToRectangle",
    value: function _setAnchorPositionRelativeToRectangle(cardinal, commit) {
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
            left = shape.aCoords.tr.x;
            top = shape.aCoords.tr.y;
            break;
          }

        case 'northwest':
          {
            left = shape.aCoords.tl.x;
            top = shape.aCoords.tl.y;
            break;
          }

        case 'southeast':
          {
            left = shape.aCoords.br.x;
            top = shape.aCoords.br.y;
            break;
          }

        case 'southwest':
        default:
          {
            left = shape.aCoords.bl.x;
            top = shape.aCoords.bl.y;
            break;
          }
      }

      ap.left = left;
      ap.top = top;
      ap.setCoords();
      ap.fire(commit ? 'pg:position:modified' : 'pg:position:modifying');
    }
  }, {
    key: "_makeAnchorPoint",
    value: function _makeAnchorPoint(cardinal) {
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
            left = shape.aCoords.tr.x;
            top = shape.aCoords.tr.y;
            break;
          }

        case 'northwest':
          {
            left = shape.aCoords.tl.x;
            top = shape.aCoords.tl.y;
            break;
          }

        case 'southeast':
          {
            left = shape.aCoords.br.x;
            top = shape.aCoords.br.y;
            break;
          }

        case 'southwest':
        default:
          {
            left = shape.aCoords.bl.x;
            top = shape.aCoords.bl.y;
            break;
          }
      }

      var ap = new fabric.Circle({
        objectCaching: false,
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
      var timer; // workaround to differentiate single and double click

      ap.on('mousedown', function (options) {
        var event = options.e;

        if (event.detail === 1) {
          timer = setTimeout(function () {
            _this2._onAnchorClick.call(_this2, options);
          }, 300);
        }
      });
      ap.on('mousedblclick', function (options) {
        clearTimeout(timer);

        _this2._onAnchorDoubleClick.call(_this2, options);
      });
      return ap;
    } // Should be implemented by Extending Classes

    /* eslint-disable class-methods-use-this */

  }, {
    key: "_onAnchorClick",
    value: function _onAnchorClick() {}
  }, {
    key: "_onAnchorDoubleClick",
    value: function _onAnchorDoubleClick() {}
    /* eslint-disable class-methods-use-this */

  }]);

  return LinkableShape;
}();

exports["default"] = LinkableShape;

},{}],5:[function(require,module,exports){
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


    fabric.Object.prototype.toggleOpacity = function toggleOpacity(opacity, timeout) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsInNyYy9Db250YWluZXIuanMiLCJzcmMvTGluay5qcyIsInNyYy9MaW5rYWJsZVNoYXBlLmpzIiwic3JjL1Byb2Nlc3NHcmFwaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxNQUFNLENBQUMsRUFBUCxHQUFZO0FBQ1YsRUFBQSxZQUFZLEVBQVosd0JBRFU7QUFFVixFQUFBLFNBQVMsRUFBVCxxQkFGVTtBQUdWLEVBQUEsSUFBSSxFQUFKLGdCQUhVO0FBSVYsRUFBQSxhQUFhLEVBQWI7QUFKVSxDQUFaOzs7Ozs7Ozs7Ozs7QUNMQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsY0FBc0IsTUFBdEI7QUFBQSxJQUFRLE1BQVIsV0FBUSxNQUFSO0FBQUEsSUFBZ0IsQ0FBaEIsV0FBZ0IsQ0FBaEI7O0lBRXFCLFM7Ozs7O0FBQ25CO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0UscUJBQVksT0FBWixFQUFxQjtBQUFBOztBQUFBOztBQUNuQixRQUFNLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFYLENBQWdCO0FBQzNCLE1BQUEsSUFBSSxFQUFFLENBRHFCO0FBRTNCLE1BQUEsR0FBRyxFQUFFLENBRnNCO0FBRzNCLE1BQUEsT0FBTyxFQUFFLE1BSGtCO0FBSTNCLE1BQUEsT0FBTyxFQUFFLEtBSmtCO0FBSzNCLE1BQUEsV0FBVyxFQUFFLENBTGM7QUFNM0IsTUFBQSxNQUFNLEVBQUUsTUFObUI7QUFPM0IsTUFBQSxJQUFJLEVBQUUsTUFQcUI7QUFRM0IsTUFBQSxFQUFFLEVBQUUsRUFSdUI7QUFTM0IsTUFBQSxFQUFFLEVBQUUsRUFUdUI7QUFVM0IsTUFBQSxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQVIsR0FBZ0IsT0FBTyxDQUFDLEtB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b3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IENvbnRhaW5lciBmcm9tICcuL3NyYy9Db250YWluZXIuanMnO1xyXG5pbXBvcnQgUHJvY2Vzc0dyYXBoIGZyb20gJy4vc3JjL1Byb2Nlc3NHcmFwaC5qcyc7XHJcbmltcG9ydCBMaW5rIGZyb20gJy4vc3JjL0xpbmsuanMnO1xyXG5pbXBvcnQgTGlua2FibGVTaGFwZSBmcm9tICcuL3NyYy9MaW5rYWJsZVNoYXBlLmpzJztcclxuXHJcbndpbmRvdy5wZyA9IHtcclxuICBQcm9jZXNzR3JhcGgsXHJcbiAgQ29udGFpbmVyLFxyXG4gIExpbmssXHJcbiAgTGlua2FibGVTaGFwZSxcclxufTtcclxuIiwiaW1wb3J0IExpbmthYmxlU2hhcGUgZnJvbSAnLi9MaW5rYWJsZVNoYXBlLmpzJztcclxuaW1wb3J0IExpbmsgZnJvbSAnLi9MaW5rLmpzJztcclxuXHJcbmNvbnN0IHsgZmFicmljLCBfIH0gPSB3aW5kb3c7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250YWluZXIgZXh0ZW5kcyBMaW5rYWJsZVNoYXBlIHtcclxuICAvKipcclxuICAgKiBBIENvbnRhaW5lciBpcyBhIFJlY3Qgd2l0aCBhbiBJVGV4dC4gQ2FuIGJlIGV4cGFuZGVkIHRvIHJldmVhbCBjb250YWluZWQgU2hhcGVzLlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBvcHRpb25zXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0ZhYnJpYy5DYW52YXN9ICAgb3B0aW9ucy5jYW52YXMgLSBGYWJyaWMgY2FudmFzXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG9wdGlvbnMuaWQgLSBVbmlxdWUgaWRlbnRpZmllclxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBvcHRpb25zLndpZHRoXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIG9wdGlvbnMuaGVpZ2h0XHJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG9wdGlvbnMubGFiZWxcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICBjb25zdCByZWN0ID0gbmV3IGZhYnJpYy5SZWN0KHtcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBvcmlnaW5YOiAnbGVmdCcsXHJcbiAgICAgIG9yaWdpblk6ICd0b3AnLFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgc3Ryb2tlOiAnIzAwMCcsXHJcbiAgICAgIGZpbGw6ICcjZmZmJyxcclxuICAgICAgcng6IDEwLFxyXG4gICAgICByeTogMTAsXHJcbiAgICAgIHdpZHRoOiBvcHRpb25zLndpZHRoID8gb3B0aW9ucy53aWR0aCA6IDIwMCxcclxuICAgICAgaGVpZ2h0OiBvcHRpb25zLmhlaWdodCA/IG9wdGlvbnMuaGVpZ2h0IDogMTAwLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCB0ZXh0ID0gbmV3IGZhYnJpYy5UZXh0Ym94KG9wdGlvbnMubGFiZWwsIHtcclxuICAgICAgbGVmdDogcmVjdC53aWR0aCAvIDIsXHJcbiAgICAgIHRvcDogcmVjdC5oZWlnaHQgLyAyLFxyXG4gICAgICBzdHlsZXM6IHsgfSxcclxuICAgICAgZm9udFNpemU6IDE0LFxyXG4gICAgICBmb250RmFtaWx5OiAnSGVsdmV0aWNhJyxcclxuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICB3aWR0aDogMTkwLFxyXG4gICAgICBoZWlnaHQ6IDkwLFxyXG4gICAgICBzcGxpdEJ5R3JhcGhlbWU6IHRydWUsXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGdyb3VwID0gbmV3IGZhYnJpYy5Hcm91cChbcmVjdCwgdGV4dF0sIHtcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBvcmlnaW5YOiAnbGVmdCcsXHJcbiAgICAgIG9yaWdpblk6ICd0b3AnLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBuZXdPcHRpb25zID0gXy5jbG9uZURlZXAoXy5vbWl0KG9wdGlvbnMsIFsnY2FudmFzJywgJ3NoYXBlJ10pKTtcclxuICAgIG5ld09wdGlvbnMuY2FudmFzID0gb3B0aW9ucy5jYW52YXM7XHJcbiAgICBuZXdPcHRpb25zLnNoYXBlID0gZ3JvdXA7XHJcbiAgICBzdXBlcihuZXdPcHRpb25zKTtcclxuXHJcbiAgICBncm91cC5vbih7XHJcbiAgICAgIHNjYWxpbmc6ICgpID0+IHtcclxuICAgICAgICAvLyBXaGVuIHNjYWxpbmcsIGtlZXAgdGV4dCBzYW1lIHNpemUgYXMgaW5pdGlhbFxyXG4gICAgICAgIGlmIChncm91cC5zY2FsZVggPCAxKSB7XHJcbiAgICAgICAgICB0ZXh0LnNjYWxlWCA9IDEgKyAoMSAtIGdyb3VwLnNjYWxlWCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRleHQuc2NhbGVYID0gMSAvIChncm91cC5zY2FsZVgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZ3JvdXAuc2NhbGVZIDwgMSkge1xyXG4gICAgICAgICAgdGV4dC5zY2FsZVkgPSAxICsgKDEgLSBncm91cC5zY2FsZVkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0ZXh0LnNjYWxlWSA9IDEgLyAoZ3JvdXAuc2NhbGVZKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jYW52YXMucmVuZGVyQWxsKCk7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIF9vbkFuY2hvckNsaWNrKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgaWQsIGxlZnQsIHRvcCwgYW5nbGUsIGNhbnZhcywgd2lkdGgsIGhlaWdodCxcclxuICAgIH0gPSB0aGlzLnNoYXBlO1xyXG4gICAgY29uc3QgYXAgPSBvcHRpb25zLnRhcmdldDtcclxuICAgIGNvbnN0IHsgY2FyZGluYWwgfSA9IGFwO1xyXG4gICAgY29uc3Qgc3BhY2luZyA9IDUwO1xyXG5cclxuICAgIGNvbnN0IG5leHRDb250YWluZXIgPSBuZXcgQ29udGFpbmVyKHtcclxuICAgICAgY2FudmFzLFxyXG4gICAgICBpZDogYCR7aWR9X25leHRfJHtjYXJkaW5hbH1fJHtNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKS50b1N0cmluZygxNikuc3Vic3RyaW5nKDEpfWAsXHJcbiAgICAgIGxlZnQsXHJcbiAgICAgIHRvcCxcclxuICAgICAgYW5nbGUsXHJcbiAgICAgIGxhYmVsOiBgJHtpZH1fbmV4dF8ke2NhcmRpbmFsfWAsXHJcbiAgICB9KTtcclxuICAgIG5leHRDb250YWluZXIuaW5qZWN0KCk7XHJcblxyXG4gICAgY29uc3QgbmV3T3B0aW9ucyA9IHt9O1xyXG4gICAgbGV0IHRhcmdldENhcmRpbmFsO1xyXG4gICAgc3dpdGNoIChjYXJkaW5hbCkge1xyXG4gICAgICBjYXNlICdlYXN0Jzoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ3dlc3QnO1xyXG4gICAgICAgIG5ld09wdGlvbnMueCA9IHRvcDtcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSBsZWZ0ICsgd2lkdGggKyBzcGFjaW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3dlc3QnOiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnZWFzdCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gdG9wO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IGxlZnQgLSB3aWR0aCAtIHNwYWNpbmc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnbm9ydGgnOiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnc291dGgnO1xyXG4gICAgICAgIG5ld09wdGlvbnMueCA9IHRvcCAtIGhlaWdodCAtIHNwYWNpbmc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gbGVmdDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aCc6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICdub3J0aCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gdG9wICsgaGVpZ2h0ICsgc3BhY2luZztcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSBsZWZ0O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRoZWFzdCc6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICdzb3V0aHdlc3QnO1xyXG4gICAgICAgIG5ld09wdGlvbnMueCA9IHRvcCAtIGhlaWdodCAtIHNwYWNpbmc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gbGVmdCArIHdpZHRoICsgc3BhY2luZztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aHdlc3QnOiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnc291dGhlYXN0JztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSB0b3AgLSBoZWlnaHQgLSBzcGFjaW5nO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IGxlZnQgLSB3aWR0aCAtIHNwYWNpbmc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnc291dGhlYXN0Jzoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ25vcnRod2VzdCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gdG9wICsgaGVpZ2h0ICsgc3BhY2luZztcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSBsZWZ0ICsgd2lkdGggKyBzcGFjaW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRod2VzdCc6XHJcbiAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICdub3J0aGVhc3QnO1xyXG4gICAgICAgIG5ld09wdGlvbnMueCA9IHRvcCArIGhlaWdodCArIHNwYWNpbmc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gbGVmdCAtIHdpZHRoIC0gc3BhY2luZztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgbmV4dENvbnRhaW5lci5tb3ZlKG5ld09wdGlvbnMpO1xyXG4gICAgLy8gbmV4dENvbnRhaW5lci5yb3RhdGUoYW5nbGUpO1xyXG5cclxuICAgIGNvbnN0IG5ld0xpbmsgPSBuZXcgTGluayh7XHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgc3RhcnQ6IHtcclxuICAgICAgICB4OiBhcC5sZWZ0LFxyXG4gICAgICAgIHk6IGFwLnRvcCxcclxuICAgICAgfSxcclxuICAgICAgZW5kOiB7XHJcbiAgICAgICAgeDogbmV4dENvbnRhaW5lci5hbmNob3JzW3RhcmdldENhcmRpbmFsXS5sZWZ0LFxyXG4gICAgICAgIHk6IG5leHRDb250YWluZXIuYW5jaG9yc1t0YXJnZXRDYXJkaW5hbF0udG9wLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgICBuZXdMaW5rLmluamVjdChjYW52YXMpO1xyXG4gICAgbmV3TGluay5jb25uZWN0TGluaygnZnJvbScsIGFwLnNoYXBlSWQsIGFwLmNhcmRpbmFsKTtcclxuICAgIG5ld0xpbmsuY29ubmVjdExpbmsoJ3RvJywgbmV4dENvbnRhaW5lci5hbmNob3JzW3RhcmdldENhcmRpbmFsXS5zaGFwZUlkLCBuZXh0Q29udGFpbmVyLmFuY2hvcnNbdGFyZ2V0Q2FyZGluYWxdLmNhcmRpbmFsKTtcclxuICB9XHJcblxyXG4gIF9vbkFuY2hvckRvdWJsZUNsaWNrKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGFwID0gb3B0aW9ucy50YXJnZXQ7XHJcbiAgICBjb25zdCB7IGNhbnZhcyB9ID0gdGhpcztcclxuICAgIGNvbnN0IG5ld0xpbmsgPSBuZXcgTGluayh7XHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgc3RhcnQ6IHtcclxuICAgICAgICB4OiBhcC5sZWZ0LFxyXG4gICAgICAgIHk6IGFwLnRvcCxcclxuICAgICAgfSxcclxuICAgICAgZW5kOiB7XHJcbiAgICAgICAgeDogYXAubGVmdCxcclxuICAgICAgICB5OiBhcC50b3AsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICAgIG5ld0xpbmsuaW5qZWN0KGNhbnZhcyk7XHJcbiAgICBuZXdMaW5rLmNvbm5lY3RMaW5rKCdmcm9tJywgYXAuc2hhcGVJZCwgYXAuY2FyZGluYWwpO1xyXG4gICAgbmV3TGluay5hcnJvd0hlYWQuZmlyZSgnbW91c2Vkb3duJyk7XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZU1vdmUgPSAoZXZlbnQpID0+IHtcclxuICAgICAgbmV3TGluay5hcnJvd0hlYWQubGVmdCA9IGV2ZW50LnBvaW50ZXIueDtcclxuICAgICAgbmV3TGluay5hcnJvd0hlYWQudG9wID0gZXZlbnQucG9pbnRlci55O1xyXG4gICAgICBuZXdMaW5rLmFycm93SGVhZC5maXJlKCdtb3ZpbmcnKTtcclxuICAgIH07XHJcbiAgICBjYW52YXMub24oJ21vdXNlOm1vdmUnLCBvbk1vdXNlTW92ZSk7XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZUNsaWNrID0gKCkgPT4ge1xyXG4gICAgICBuZXdMaW5rLmFycm93SGVhZC5maXJlKCdtb3ZlZCcpO1xyXG4gICAgICBuZXdMaW5rLmFycm93SGVhZC5maXJlKCdtb3VzZXVwJyk7XHJcbiAgICAgIGNhbnZhcy5vZmYoJ21vdXNlOm1vdmUnLCBvbk1vdXNlTW92ZSk7XHJcbiAgICAgIGNhbnZhcy5vZmYoJ21vdXNlOnVwJywgb25Nb3VzZUNsaWNrKTtcclxuICAgICAgbmV3TGluay5yZXNldEN1cnZhdHVyZSgpO1xyXG4gICAgfTtcclxuICAgIGNhbnZhcy5vbignbW91c2U6dXAnLCBvbk1vdXNlQ2xpY2spO1xyXG4gIH1cclxufVxyXG4iLCJjb25zdCB7IGZhYnJpYyB9ID0gd2luZG93O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGluayB7XHJcbiAgLyoqXHJcbiAgICogQSBMaW5rIGlzIGEgRmFicmljLlBhdGggb2JqZWN0IHdob3NlIFN0YXJ0IGFuZCBFbmQgcG9pbnRzIGNhbiBiZSBjb25uZWN0ZWQgdG8gYW55IGFuY2hvciBvZiB0d28gTGlua2FibGVTaGFwZS5cclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgb3B0aW9uc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtGYWJyaWMuQ2FudmFzfSAgIG9wdGlvbnMuY2FudmFzIC0gRmFicmljIGNhbnZhc1xyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICBvcHRpb25zLmlkIC0gVW5pcXVlIGlkZW50aWZpZXJcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBbb3B0aW9ucy5zdGFydF0gLSBDb29yZGluYXRlcyBvZiB0aGUgc3RhcnQgcG9pbnRcclxuICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgW29wdGlvbnMuc3RhcnQueF0gLSBYIGF4aXMgY29vcmRpbmF0ZSBvZiB0aGUgc3RhcnQgcG9pbnRcclxuICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgW29wdGlvbnMuc3RhcnQueV0gLSBZIGF4aXMgY29vcmRpbmF0ZSBvZiB0aGUgc3RhcnQgcG9pbnRcclxuICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgW29wdGlvbnMuZW5kLnhdIC0gWCBheGlzIGNvb3JkaW5hdGUgb2YgdGhlIGVuZCBwb2ludFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBbb3B0aW9ucy5lbmQueV0gLSBZIGF4aXMgY29vcmRpbmF0ZSBvZiB0aGUgZW5kIHBvaW50XHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLmN1c3RvbV0gLSBPcHRpb25zIHRvIGN1c3RvbWl6ZSB0aGUgZGlmZmVyZW50IHNoYXBlcyBvZiB0aGUgTGlua1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLmN1c3RvbS5wYXRoXSAtIGJlemllciBxdWFkcmF0aWMgY3VydmVcclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuY3VzdG9tLmNvbnRyb2xQb2ludF0gLSBiZXppZXIgcXVhZHJhdGljIGN1cnZlIGNvbnRyb2wgcG9pbnRcclxuICAgKiBAcGFyYW0ge0xpbmV9ICAgICAgICAgICAgW29wdGlvbnMuY3VzdG9tLmNvbnRyb2xMaW5lXSAtIHZpc3VhbCBsaW5lcyBmcm9tIHRoZSBjb250cm9sIHBvaW50IHRvIHRoZSBzdGFydCZlbmQgcG9pbnRzXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLmN1c3RvbS5zdGFydFBvaW50XSAtIGFrYSBhcnJvd1RhaWxcclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuY3VzdG9tLmVuZFBvaW50XSAtIGFrYSBhcnJvd0hlYWRcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGlkLFxyXG4gICAgICBjYW52YXMsXHJcbiAgICB9ID0gb3B0aW9ucztcclxuICAgIGNvbnN0IHgxID0gb3B0aW9ucyAmJiBvcHRpb25zLnN0YXJ0ICYmIG9wdGlvbnMuc3RhcnQueCA/IG9wdGlvbnMuc3RhcnQueCA6IDA7XHJcbiAgICBjb25zdCB5MSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5zdGFydCAmJiBvcHRpb25zLnN0YXJ0LnkgPyBvcHRpb25zLnN0YXJ0LnkgOiAwO1xyXG4gICAgY29uc3QgeDIgPSBvcHRpb25zICYmIG9wdGlvbnMuZW5kICYmIG9wdGlvbnMuZW5kLnggPyBvcHRpb25zLmVuZC54IDogMDtcclxuICAgIGNvbnN0IHkyID0gb3B0aW9ucyAmJiBvcHRpb25zLmVuZCAmJiBvcHRpb25zLmVuZC55ID8gb3B0aW9ucy5lbmQueSA6IDA7XHJcbiAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuXHJcbiAgICAvLyBQYXRoLCBhIGJlemllciBxdWFkcmF0aWMgY3VydmVcclxuICAgIGNvbnN0IHBhdGhDb29yZHMgPSB7XHJcbiAgICAgIE06IHtcclxuICAgICAgICB4OiB4MSwgLy8gZnJvbSB4XHJcbiAgICAgICAgeTogeTEsIC8vIGZyb20geVxyXG4gICAgICB9LFxyXG4gICAgICBROiB7XHJcbiAgICAgICAgeDE6ICh4MSArIHgyKSAvIDIsIC8vIGNvbnRyb2wgeFxyXG4gICAgICAgIHkxOiAoeTEgKyB5MikgLyAyLCAvLyBjb250cm9sIHlcclxuICAgICAgICB4MiwgLy8gdG8geFxyXG4gICAgICAgIHkyLCAvLyB0byB5XHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgY29uc3QgcGF0aE9wdHMgPSB0aGlzLmRlZmF1bHRQYXRoT3B0aW9ucyA9IHtcclxuICAgICAgZmlsbDogJycsXHJcbiAgICAgIHN0cm9rZTogKG9wdGlvbnMuY3VzdG9tICYmIG9wdGlvbnMuY3VzdG9tLnBhdGggJiYgb3B0aW9ucy5jdXN0b20ucGF0aC5zdHJva2VXaWR0aCkgPyBvcHRpb25zLmN1c3RvbS5wYXRoLnN0cm9rZSA6ICcjMDAwJyxcclxuICAgICAgc3Ryb2tlV2lkdGg6IChvcHRpb25zLmN1c3RvbSAmJiBvcHRpb25zLmN1c3RvbS5wYXRoICYmIG9wdGlvbnMuY3VzdG9tLnBhdGguc3Ryb2tlV2lkdGgpID8gb3B0aW9ucy5jdXN0b20ucGF0aC5zdHJva2VXaWR0aCA6IDIsXHJcbiAgICAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgICBoYXNCb3JkZXJzOiB0cnVlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAgIGxvY2tNb3ZlbWVudFg6IHRydWUsXHJcbiAgICAgIGxvY2tNb3ZlbWVudFk6IHRydWUsXHJcbiAgICAgIHBlclBpeGVsVGFyZ2V0RmluZDogdHJ1ZSxcclxuICAgIH07XHJcbiAgICBjb25zdCBwYXRoU3RyID0gYE0gJHtwYXRoQ29vcmRzLk0ueH0gJHtwYXRoQ29vcmRzLk0ueX0gUSAke3BhdGhDb29yZHMuUS54MX0sICR7cGF0aENvb3Jkcy5RLnkxfSwgJHtwYXRoQ29vcmRzLlEueDJ9LCAke3BhdGhDb29yZHMuUS55Mn1gO1xyXG4gICAgY29uc3QgcGF0aCA9IG5ldyBmYWJyaWMuUGF0aChwYXRoU3RyLCBwYXRoT3B0cyk7XHJcbiAgICB0aGlzLnBhdGggPSBwYXRoO1xyXG5cclxuICAgIC8vIENvbnRyb2wgcG9pbnQgYW5kIGxpbmVzIGZvciB0aGUgcXVhZHJhdGljIGN1cnZlXHJcbiAgICBjb25zdCBjb250cm9sUG9pbnQgPSB0aGlzLmNvbnRyb2xQb2ludCA9IG5ldyBmYWJyaWMuQ2lyY2xlKHtcclxuICAgICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAgIGxlZnQ6IHBhdGhDb29yZHMuUS54MSxcclxuICAgICAgdG9wOiBwYXRoQ29vcmRzLlEueTEsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICByYWRpdXM6IDYsXHJcbiAgICAgIGZpbGw6ICcjNzhiZWZhJyxcclxuICAgICAgc3Ryb2tlOiAnIzc4YmVmYScsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgICAgb3BhY2l0eTogMCxcclxuICAgIH0pO1xyXG4gICAgY29udHJvbFBvaW50Lm9uKCdtb3VzZW92ZXInLCB0aGlzLm9uTGlua01vdXNlT3Zlci5iaW5kKHRoaXMpKTtcclxuICAgIGNvbnRyb2xQb2ludC5vbignbW91c2VvdXQnLCB0aGlzLm9uTGlua01vdXNlT3V0LmJpbmQodGhpcykpO1xyXG4gICAgY29udHJvbFBvaW50Lm9uKCdtb3ZpbmcnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aCgnY29udHJvbCcsIHRoaXMuY29udHJvbFBvaW50LmxlZnQsIHRoaXMuY29udHJvbFBvaW50LnRvcCwgZmFsc2UpO1xyXG4gICAgfSk7XHJcbiAgICBjb250cm9sUG9pbnQub24oJ21vdmVkJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhdGgoJ2NvbnRyb2wnLCB0aGlzLmNvbnRyb2xQb2ludC5sZWZ0LCB0aGlzLmNvbnRyb2xQb2ludC50b3AsIHRydWUpO1xyXG4gICAgfSk7XHJcbiAgICBjb250cm9sUG9pbnQub24oJ21vdXNlZG93bicsICgpID0+IHtcclxuICAgICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcclxuICAgIH0pO1xyXG4gICAgY29uc3QgY29udHJvbExpbmVPcHRzID0ge1xyXG4gICAgICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgICAgc3Ryb2tlRGFzaEFycmF5OiBbNSwgNV0sXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICBzdHJva2U6ICcjNzhiZWZhJyxcclxuICAgICAgc2VsZWN0YWJsZTogZmFsc2UsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAgIGV2ZW50ZWQ6IGZhbHNlLFxyXG4gICAgICBvcGFjaXR5OiAwLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGNvbnRyb2xMaW5lMSA9IHRoaXMuY29udHJvbExpbmUxID0gbmV3IGZhYnJpYy5MaW5lKFtjb250cm9sUG9pbnQubGVmdCwgY29udHJvbFBvaW50LnRvcCwgeDEsIHkxXSwgY29udHJvbExpbmVPcHRzKTtcclxuICAgIGNvbnRyb2xMaW5lMS5vbignbW91c2VvdmVyJywgdGhpcy5vbkxpbmtNb3VzZU92ZXIuYmluZCh0aGlzKSk7XHJcbiAgICBjb250cm9sTGluZTEub24oJ21vdXNlb3V0JywgdGhpcy5vbkxpbmtNb3VzZU91dC5iaW5kKHRoaXMpKTtcclxuICAgIGNvbnN0IGNvbnRyb2xMaW5lMiA9IHRoaXMuY29udHJvbExpbmUyID0gbmV3IGZhYnJpYy5MaW5lKFtjb250cm9sUG9pbnQubGVmdCwgY29udHJvbFBvaW50LnRvcCwgeDIsIHkyXSwgY29udHJvbExpbmVPcHRzKTtcclxuICAgIGNvbnRyb2xMaW5lMi5vbignbW91c2VvdmVyJywgdGhpcy5vbkxpbmtNb3VzZU92ZXIuYmluZCh0aGlzKSk7XHJcbiAgICBjb250cm9sTGluZTIub24oJ21vdXNlb3V0JywgdGhpcy5vbkxpbmtNb3VzZU91dC5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAvLyBNYXNrIGZvciBzaG93aW5nIGlmIGNvbm5lY3Rpb24gaXMgdmFsaWRcclxuICAgIGNvbnN0IGlzVmFsaWRNYXNrT3B0cyA9IHtcclxuICAgICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAgIGxlZnQ6IHBhdGhDb29yZHMuUS54MixcclxuICAgICAgdG9wOiBwYXRoQ29vcmRzLlEueTIsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICByYWRpdXM6IDE2LFxyXG4gICAgICBmaWxsOiAnIzU3Yjg1NycsIC8vIGVhNGYzN1xyXG4gICAgICBzdHJva2U6ICcjNTdiODU3JyxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICBoYXNCb3JkZXJzOiBmYWxzZSxcclxuICAgICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgICBzZWxlY3RhYmxlOiBmYWxzZSxcclxuICAgICAgb3BhY2l0eTogMCxcclxuICAgIH07XHJcbiAgICB0aGlzLmlzVmFsaWRNYXNrID0gbmV3IGZhYnJpYy5DaXJjbGUoaXNWYWxpZE1hc2tPcHRzKTtcclxuXHJcbiAgICAvLyBFbmQgcG9pbnQgKGFycm93SGVhZClcclxuICAgIGNvbnN0IGFycm93SGVhZE9wdHMgPSB7XHJcbiAgICAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgICB3aWR0aDogMTAsXHJcbiAgICAgIGhlaWdodDogMTAsXHJcbiAgICAgIGxlZnQ6IHBhdGhDb29yZHMuUS54MixcclxuICAgICAgdG9wOiBwYXRoQ29vcmRzLlEueTIsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICBmaWxsOiAnIzAwMCcsXHJcbiAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgIHN0cm9rZTogJyMwMDAnLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIHNlbGVjdGFibGU6IHRydWUsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgYXJyb3dIZWFkID0gdGhpcy5hcnJvd0hlYWQgPSBuZXcgZmFicmljLlRyaWFuZ2xlKGFycm93SGVhZE9wdHMpO1xyXG4gICAgYXJyb3dIZWFkLm9uKCdtb3ZpbmcnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aCgndG8nLCBhcnJvd0hlYWQubGVmdCwgYXJyb3dIZWFkLnRvcCwgZmFsc2UpO1xyXG4gICAgICB0aGlzLmlzVmFsaWRNYXNrLmxlZnQgPSBhcnJvd0hlYWQubGVmdDtcclxuICAgICAgdGhpcy5pc1ZhbGlkTWFzay50b3AgPSBhcnJvd0hlYWQudG9wO1xyXG4gICAgICB0aGlzLmlzVmFsaWRNYXNrLnNldENvb3JkcygpO1xyXG4gICAgICB0aGlzLmlzVmFsaWRNYXNrLnNldCgnb3BhY2l0eScsIDApO1xyXG5cclxuICAgICAgLy8gQ2hlY2sgaWYgaW50ZXJzZWN0cyB3aXRoIGFuY2hvclxyXG4gICAgICBjb25zdCBhbmNob3JzID0gY2FudmFzLmdldE9iamVjdHMoKVxyXG4gICAgICAgIC5maWx0ZXIoKG8pID0+IG8udHlwZSA9PT0gJ2FuY2hvcicpO1xyXG4gICAgICBhcnJvd0hlYWQuc2V0KCdzdHJva2UnLCAnIzAwMCcpO1xyXG4gICAgICBmb3IgKGxldCBhID0gMDsgYSA8IGFuY2hvcnMubGVuZ3RoOyBhICs9IDEpIHtcclxuICAgICAgICBpZiAoYXJyb3dIZWFkLmludGVyc2VjdHNXaXRoT2JqZWN0KGFuY2hvcnNbYV0pKSB7XHJcbiAgICAgICAgICB0aGlzLmlzVmFsaWRNYXNrLnNldCgnb3BhY2l0eScsIDAuNSk7XHJcbiAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkQ29ubmVjdGlvbigndG8nLCBhbmNob3JzW2FdLnNoYXBlSWQsIGFuY2hvcnNbYV0uY2FyZGluYWwpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNWYWxpZE1hc2suc2V0KHtcclxuICAgICAgICAgICAgICBzdHJva2U6ICcjNTdiODU3JyxcclxuICAgICAgICAgICAgICBmaWxsOiAnIzU3Yjg1NycsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBhcnJvd0hlYWQuc2V0KCdzdHJva2UnLCAnIzVmNScpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5pc1ZhbGlkTWFzay5zZXQoe1xyXG4gICAgICAgICAgICAgIHN0cm9rZTogJyNlYTRmMzcnLFxyXG4gICAgICAgICAgICAgIGZpbGw6ICcjZWE0ZjM3JyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGFycm93SGVhZC5zZXQoJ3N0cm9rZScsICcjZWE0ZjM3Jyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGFycm93SGVhZC5vbignbW92ZWQnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aCgndG8nLCBhcnJvd0hlYWQubGVmdCwgYXJyb3dIZWFkLnRvcCwgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuaXNWYWxpZE1hc2suc2V0KCdvcGFjaXR5JywgMCk7XHJcblxyXG4gICAgICAvLyBDaGVjayBpZiBpbnRlcnNlY3RzIHdpdGggYW5jaG9yXHJcbiAgICAgIGNvbnN0IGFuY2hvcnMgPSBjYW52YXMuZ2V0T2JqZWN0cygpXHJcbiAgICAgICAgLmZpbHRlcigobykgPT4gby50eXBlID09PSAnYW5jaG9yJyk7XHJcbiAgICAgIGZvciAobGV0IGEgPSAwOyBhIDwgYW5jaG9ycy5sZW5ndGg7IGEgKz0gMSkge1xyXG4gICAgICAgIGlmIChhcnJvd0hlYWQuaW50ZXJzZWN0c1dpdGhPYmplY3QoYW5jaG9yc1thXSkpIHtcclxuICAgICAgICAgIHRoaXMuY29ubmVjdExpbmsoJ3RvJywgYW5jaG9yc1thXS5zaGFwZUlkLCBhbmNob3JzW2FdLmNhcmRpbmFsKTtcclxuICAgICAgICAgIGFycm93SGVhZC5zZXQoJ3N0cm9rZScsICcjMDAwJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRvICYmIGFuY2hvcnNbYV0gPT09IHRoaXMudG8uc2hhcGUuYW5jaG9yc1t0aGlzLnRvLmFuY2hvcl0pIHtcclxuICAgICAgICAgIC8vIElmIHRoaXMgbGluayB3YXMgY29ubmVjdGVkIHRvIHRoaXMgYW5jaG9yIGFuZCBpdCBkb2Vzbid0IGludGVyc2VjdCBhbnltb3JlXHJcbiAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3RMaW5rKCd0bycpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBhcnJvd0hlYWQub24oJ21vdXNlZG93bicsICgpID0+IHtcclxuICAgICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcclxuICAgICAgdGhpcy50b2dnbGVBbGxBbmNob3JzT3BhY2l0eSgxKTtcclxuXHJcbiAgICAgIGFycm93SGVhZC5vbignbW91c2V1cCcsICgpID0+IHtcclxuICAgICAgICB0aGlzLnRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KDApO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFN0YXJ0IHBvaW50IChhcnJvd1RhaWwpXHJcbiAgICBjb25zdCBhcnJvd1RhaWxPcHRzID0ge1xyXG4gICAgICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgICAgd2lkdGg6IDEwLFxyXG4gICAgICBoZWlnaHQ6IDEwLFxyXG4gICAgICBsZWZ0OiBwYXRoQ29vcmRzLk0ueCxcclxuICAgICAgdG9wOiBwYXRoQ29vcmRzLk0ueSxcclxuICAgICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAgIGZpbGw6ICcjZmZmJyxcclxuICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgc3Ryb2tlOiAnIzAwMCcsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgIH07XHJcbiAgICBjb25zdCBhcnJvd1RhaWwgPSB0aGlzLmFycm93VGFpbCA9IG5ldyBmYWJyaWMuUmVjdChhcnJvd1RhaWxPcHRzKTtcclxuICAgIGFycm93VGFpbC5vbignbW92aW5nJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhdGgoJ2Zyb20nLCBhcnJvd1RhaWwubGVmdCwgYXJyb3dUYWlsLnRvcCwgZmFsc2UpO1xyXG4gICAgICB0aGlzLmlzVmFsaWRNYXNrLmxlZnQgPSBhcnJvd1RhaWwubGVmdDtcclxuICAgICAgdGhpcy5pc1ZhbGlkTWFzay50b3AgPSBhcnJvd1RhaWwudG9wO1xyXG4gICAgICB0aGlzLmlzVmFsaWRNYXNrLnNldENvb3JkcygpO1xyXG4gICAgICB0aGlzLmlzVmFsaWRNYXNrLnNldCgnb3BhY2l0eScsIDApO1xyXG5cclxuICAgICAgLy8gQ2hlY2sgaWYgaW50ZXJzZWN0cyB3aXRoIGFuY2hvclxyXG4gICAgICBjb25zdCBhbmNob3JzID0gY2FudmFzLmdldE9iamVjdHMoKVxyXG4gICAgICAgIC5maWx0ZXIoKG8pID0+IG8udHlwZSA9PT0gJ2FuY2hvcicpO1xyXG4gICAgICBhcnJvd1RhaWwuc2V0KCdzdHJva2UnLCAnIzAwMCcpO1xyXG4gICAgICBmb3IgKGxldCBhID0gMDsgYSA8IGFuY2hvcnMubGVuZ3RoOyBhICs9IDEpIHtcclxuICAgICAgICBpZiAoYXJyb3dUYWlsLmludGVyc2VjdHNXaXRoT2JqZWN0KGFuY2hvcnNbYV0pKSB7XHJcbiAgICAgICAgICB0aGlzLmlzVmFsaWRNYXNrLnNldCgnb3BhY2l0eScsIDAuNSk7XHJcbiAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkQ29ubmVjdGlvbignZnJvbScsIGFuY2hvcnNbYV0uc2hhcGVJZCwgYW5jaG9yc1thXS5jYXJkaW5hbCkpIHtcclxuICAgICAgICAgICAgdGhpcy5pc1ZhbGlkTWFzay5zZXQoe1xyXG4gICAgICAgICAgICAgIHN0cm9rZTogJyM1N2I4NTcnLFxyXG4gICAgICAgICAgICAgIGZpbGw6ICcjNTdiODU3JyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGFycm93VGFpbC5zZXQoJ3N0cm9rZScsICcjNWY1Jyk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmlzVmFsaWRNYXNrLnNldCh7XHJcbiAgICAgICAgICAgICAgc3Ryb2tlOiAnI2VhNGYzNycsXHJcbiAgICAgICAgICAgICAgZmlsbDogJyNlYTRmMzcnLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYXJyb3dUYWlsLnNldCgnc3Ryb2tlJywgJyNmNTUnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgYXJyb3dUYWlsLm9uKCdtb3ZlZCcsICgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVQYXRoKCdmcm9tJywgYXJyb3dUYWlsLmxlZnQsIGFycm93VGFpbC50b3AsIHRydWUpO1xyXG4gICAgICB0aGlzLmlzVmFsaWRNYXNrLnNldCgnb3BhY2l0eScsIDApO1xyXG5cclxuICAgICAgLy8gQ2hlY2sgaWYgaW50ZXJzZWN0cyB3aXRoIGFuY2hvclxyXG4gICAgICBjb25zdCBhbmNob3JzID0gY2FudmFzLmdldE9iamVjdHMoKVxyXG4gICAgICAgIC5maWx0ZXIoKG8pID0+IG8udHlwZSA9PT0gJ2FuY2hvcicpO1xyXG4gICAgICBmb3IgKGxldCBhID0gMDsgYSA8IGFuY2hvcnMubGVuZ3RoOyBhICs9IDEpIHtcclxuICAgICAgICBpZiAoYXJyb3dUYWlsLmludGVyc2VjdHNXaXRoT2JqZWN0KGFuY2hvcnNbYV0pKSB7XHJcbiAgICAgICAgICB0aGlzLmNvbm5lY3RMaW5rKCdmcm9tJywgYW5jaG9yc1thXS5zaGFwZUlkLCBhbmNob3JzW2FdLmNhcmRpbmFsKTtcclxuICAgICAgICAgIC8vIGFuY2hvcnNbYV0uc2V0KCdzdHJva2UnLCAnIzAwMCcpO1xyXG4gICAgICAgICAgYXJyb3dUYWlsLnNldCgnc3Ryb2tlJywgJyMwMDAnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZnJvbSAmJiBhbmNob3JzW2FdID09PSB0aGlzLmZyb20uc2hhcGUuYW5jaG9yc1t0aGlzLmZyb20uYW5jaG9yXSkge1xyXG4gICAgICAgICAgLy8gSWYgdGhpcyBsaW5rIHdhcyBjb25uZWN0ZWQgdG8gdGhpcyBhbmNob3IgYW5kIGl0IGRvZXNuJ3QgaW50ZXJzZWN0IGFueW1vcmVcclxuICAgICAgICAgIHRoaXMuZGlzY29ubmVjdExpbmsoJ2Zyb20nKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgYXJyb3dUYWlsLm9uKCdtb3VzZWRvd24nLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuYnJpbmdUb0Zyb250KCk7XHJcbiAgICAgIHRoaXMudG9nZ2xlQWxsQW5jaG9yc09wYWNpdHkoMSk7XHJcblxyXG4gICAgICBhcnJvd1RhaWwub24oJ21vdXNldXAnLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy50b2dnbGVBbGxBbmNob3JzT3BhY2l0eSgwKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGluamVjdCgpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgY2FudmFzLFxyXG4gICAgICBwYXRoLFxyXG4gICAgICBjb250cm9sUG9pbnQsXHJcbiAgICAgIGNvbnRyb2xMaW5lMSxcclxuICAgICAgY29udHJvbExpbmUyLFxyXG4gICAgICBhcnJvd0hlYWQsXHJcbiAgICAgIGFycm93VGFpbCxcclxuICAgICAgaXNWYWxpZE1hc2ssXHJcbiAgICB9ID0gdGhpcztcclxuICAgIGNhbnZhcy5hZGQoY29udHJvbFBvaW50KTtcclxuICAgIGNhbnZhcy5hZGQoY29udHJvbExpbmUxKTtcclxuICAgIGNhbnZhcy5hZGQoY29udHJvbExpbmUyKTtcclxuICAgIGNhbnZhcy5hZGQoaXNWYWxpZE1hc2spO1xyXG4gICAgY2FudmFzLmFkZChhcnJvd0hlYWQpO1xyXG4gICAgY2FudmFzLmFkZChhcnJvd1RhaWwpO1xyXG5cclxuICAgIGNhbnZhcy5hZGQocGF0aCk7XHJcbiAgICB0aGlzLnVwZGF0ZVBhdGgoJ2Zyb20nLCBwYXRoLnBhdGhbMF1bMV0sIHBhdGgucGF0aFswXVsyXSwgdHJ1ZSk7XHJcbiAgICB0aGlzLnVwZGF0ZVBhdGgoJ3RvJywgcGF0aC5wYXRoWzFdWzNdLCBwYXRoLnBhdGhbMV1bNF0sIHRydWUpO1xyXG4gICAgdGhpcy51cGRhdGVQYXRoKCdjb250cm9sJywgcGF0aC5wYXRoWzFdWzFdLCBwYXRoLnBhdGhbMV1bMl0sIHRydWUpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgY29ubmVjdExpbmsobGlua1BvaW50LCBzaGFwZUlkLCBjYXJkaW5hbCkge1xyXG4gICAgLy8gQ2hlY2sgbm90IGFscmVhZHkgY29ubmVjdGVkXHJcbiAgICBpZiAoIXRoaXMuaXNWYWxpZENvbm5lY3Rpb24obGlua1BvaW50LCBzaGFwZUlkLCBjYXJkaW5hbCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgc2hhcGUgPSB0aGlzLmNhbnZhcy5nZXRPYmplY3RzKClcclxuICAgICAgLmZpbmQoKG8pID0+IG8uaWQgPT09IHNoYXBlSWQpO1xyXG5cclxuICAgIC8vIERpc2Nvbm5lY3QgZXhpc3Rpbmcgb2JqZWN0XHJcbiAgICB0aGlzLmRpc2Nvbm5lY3RMaW5rKGxpbmtQb2ludCk7XHJcblxyXG4gICAgLy8gQ29ubmVjdFxyXG4gICAgdGhpc1tsaW5rUG9pbnRdID0ge1xyXG4gICAgICBzaGFwZSxcclxuICAgICAgYW5jaG9yOiBjYXJkaW5hbCxcclxuICAgICAgaGFuZGxlcnM6IHtcclxuICAgICAgICBvbkFuY2hvclBvc2l0aW9uTW9kaWZ5aW5nOiAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZVBhdGgobGlua1BvaW50LCBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5sZWZ0LCBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS50b3AsIGZhbHNlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQW5jaG9yUG9zaXRpb25Nb2RpZmllZDogKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVQYXRoKGxpbmtQb2ludCwgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ubGVmdCwgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0udG9wLCB0cnVlKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICAgIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLm9wYWNpdHkgPSAwO1xyXG4gICAgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ub24oJ3BnOnBvc2l0aW9uOm1vZGlmeWluZycsIHRoaXNbbGlua1BvaW50XS5oYW5kbGVycy5vbkFuY2hvclBvc2l0aW9uTW9kaWZ5aW5nKTtcclxuICAgIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLm9uKCdwZzpwb3NpdGlvbjptb2RpZmllZCcsIHRoaXNbbGlua1BvaW50XS5oYW5kbGVycy5vbkFuY2hvclBvc2l0aW9uTW9kaWZpZWQpO1xyXG5cclxuICAgIC8vIFVwZGF0ZSBMaW5rXHJcbiAgICB0aGlzLnVwZGF0ZVBhdGgobGlua1BvaW50LCBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5sZWZ0LCBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS50b3AsIHRydWUsIGZhbHNlKTtcclxuICB9XHJcblxyXG4gIGRpc2Nvbm5lY3RMaW5rKGxpbmtQb2ludCkge1xyXG4gICAgaWYgKHRoaXNbbGlua1BvaW50XSkge1xyXG4gICAgICB0aGlzW2xpbmtQb2ludF0uc2hhcGUuYW5jaG9yc1t0aGlzW2xpbmtQb2ludF0uYW5jaG9yXS5vZmYoJ3BnOnBvc2l0aW9uOm1vZGlmeWluZycsIHRoaXNbbGlua1BvaW50XS5oYW5kbGVycy5vbkFuY2hvclBvc2l0aW9uTW9kaWZ5aW5nKTtcclxuICAgICAgdGhpc1tsaW5rUG9pbnRdLnNoYXBlLmFuY2hvcnNbdGhpc1tsaW5rUG9pbnRdLmFuY2hvcl0ub2ZmKCdwZzpwb3NpdGlvbjptb2RpZmllZCcsIHRoaXNbbGlua1BvaW50XS5oYW5kbGVycy5vbkFuY2hvclBvc2l0aW9uTW9kaWZpZWQpO1xyXG4gICAgICBkZWxldGUgdGhpc1tsaW5rUG9pbnRdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVzZXRDdXJ2YXR1cmUoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGNvbnRyb2xQb2ludCxcclxuICAgICAgcGF0aCxcclxuICAgIH0gPSB0aGlzO1xyXG4gICAgY29udHJvbFBvaW50LmxlZnQgPSAocGF0aC5wYXRoWzBdWzFdICsgcGF0aC5wYXRoWzFdWzNdKSAvIDI7XHJcbiAgICBjb250cm9sUG9pbnQudG9wID0gKHBhdGgucGF0aFswXVsyXSArIHBhdGgucGF0aFsxXVs0XSkgLyAyO1xyXG4gICAgY29udHJvbFBvaW50LnNldENvb3JkcygpO1xyXG4gICAgY29udHJvbFBvaW50LmZpcmUoJ21vdmVkJyk7XHJcbiAgfVxyXG5cclxuICBicmluZ1RvRnJvbnQoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgcGF0aCxcclxuICAgICAgY29udHJvbFBvaW50LFxyXG4gICAgICBhcnJvd0hlYWQsXHJcbiAgICAgIGFycm93VGFpbCxcclxuICAgIH0gPSB0aGlzO1xyXG4gICAgY2FudmFzLmJyaW5nVG9Gcm9udChwYXRoKTtcclxuICAgIGNhbnZhcy5icmluZ1RvRnJvbnQoY29udHJvbFBvaW50KTtcclxuICAgIGNhbnZhcy5icmluZ1RvRnJvbnQoYXJyb3dIZWFkKTtcclxuICAgIGNhbnZhcy5icmluZ1RvRnJvbnQoYXJyb3dUYWlsKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVBhdGgobGlua1BvaW50LCB4LCB5LCBjb21taXQsIHJlc2V0Q3Vydikge1xyXG4gICAgY29uc3QgcGF0aCA9IHtcclxuICAgICAgTToge1xyXG4gICAgICAgIHg6IGxpbmtQb2ludCA9PT0gJ2Zyb20nID8geCA6IHRoaXMucGF0aC5wYXRoWzBdWzFdLFxyXG4gICAgICAgIHk6IGxpbmtQb2ludCA9PT0gJ2Zyb20nID8geSA6IHRoaXMucGF0aC5wYXRoWzBdWzJdLFxyXG4gICAgICB9LFxyXG4gICAgICBROiB7XHJcbiAgICAgICAgeDE6IGxpbmtQb2ludCA9PT0gJ2NvbnRyb2wnID8geCA6IHRoaXMucGF0aC5wYXRoWzFdWzFdLFxyXG4gICAgICAgIHkxOiBsaW5rUG9pbnQgPT09ICdjb250cm9sJyA/IHkgOiB0aGlzLnBhdGgucGF0aFsxXVsyXSxcclxuICAgICAgICB4MjogbGlua1BvaW50ID09PSAndG8nID8geCA6IHRoaXMucGF0aC5wYXRoWzFdWzNdLFxyXG4gICAgICAgIHkyOiBsaW5rUG9pbnQgPT09ICd0bycgPyB5IDogdGhpcy5wYXRoLnBhdGhbMV1bNF0sXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgaWYgKGNvbW1pdCkge1xyXG4gICAgICBjb25zdCBwYXRoU3RyID0gYE0gJHtwYXRoLk0ueH0gJHtwYXRoLk0ueX0gUSAke3BhdGguUS54MX0sICR7cGF0aC5RLnkxfSwgJHtwYXRoLlEueDJ9LCAke3BhdGguUS55Mn1gO1xyXG4gICAgICBjb25zdCBuZXdQYXRoID0gbmV3IGZhYnJpYy5QYXRoKHBhdGhTdHIsIHRoaXMuZGVmYXVsdFBhdGhPcHRpb25zKTtcclxuICAgICAgdGhpcy5jYW52YXMucmVtb3ZlKHRoaXMucGF0aCk7XHJcbiAgICAgIHRoaXMuY2FudmFzLmFkZChuZXdQYXRoKTtcclxuXHJcbiAgICAgIG5ld1BhdGgub24oJ21vdXNlb3ZlcicsIHRoaXMub25MaW5rTW91c2VPdmVyLmJpbmQodGhpcykpO1xyXG4gICAgICBuZXdQYXRoLm9uKCdtb3VzZW91dCcsIHRoaXMub25MaW5rTW91c2VPdXQuYmluZCh0aGlzKSk7XHJcbiAgICAgIG5ld1BhdGgub24oJ21vdXNlZG93bicsIHRoaXMuYnJpbmdUb0Zyb250LmJpbmQodGhpcykpO1xyXG4gICAgICB0aGlzLnBhdGggPSBuZXdQYXRoO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYXRoLnNldCgncGF0aCcsIFtcclxuICAgICAgICBbJ00nLCBwYXRoLk0ueCwgcGF0aC5NLnldLFxyXG4gICAgICAgIFsnUScsIHBhdGguUS54MSwgcGF0aC5RLnkxLCBwYXRoLlEueDIsIHBhdGguUS55Ml0sXHJcbiAgICAgIF0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFVwZGF0ZSBjb250cm9sIGxpbmVzLCBhcnJvdyBoZWFkcyBhbmQgdGFpbHNcclxuICAgIHRoaXMuY29udHJvbExpbmUxLnNldCh7XHJcbiAgICAgIHgxOiB0aGlzLmNvbnRyb2xQb2ludC5sZWZ0LFxyXG4gICAgICB5MTogdGhpcy5jb250cm9sUG9pbnQudG9wLFxyXG4gICAgICB4MjogdGhpcy5wYXRoLnBhdGhbMF1bMV0sXHJcbiAgICAgIHkyOiB0aGlzLnBhdGgucGF0aFswXVsyXSxcclxuICAgIH0pO1xyXG4gICAgdGhpcy5jb250cm9sTGluZTIuc2V0KHtcclxuICAgICAgeDE6IHRoaXMuY29udHJvbFBvaW50LmxlZnQsXHJcbiAgICAgIHkxOiB0aGlzLmNvbnRyb2xQb2ludC50b3AsXHJcbiAgICAgIHgyOiB0aGlzLnBhdGgucGF0aFsxXVszXSxcclxuICAgICAgeTI6IHRoaXMucGF0aC5wYXRoWzFdWzRdLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBhcnJvd0hlYWRBbmdsZSA9IChNYXRoLmF0YW4yKHRoaXMucGF0aC5wYXRoWzFdWzRdIC0gdGhpcy5wYXRoLnBhdGhbMV1bMl0sIHRoaXMucGF0aC5wYXRoWzFdWzNdIC0gdGhpcy5wYXRoLnBhdGhbMV1bMV0pICogMTgwKSAvIE1hdGguUEk7XHJcbiAgICB0aGlzLmFycm93SGVhZC5hbmdsZSA9IGFycm93SGVhZEFuZ2xlICsgOTA7XHJcbiAgICB0aGlzLmFycm93SGVhZC5sZWZ0ID0gdGhpcy5wYXRoLnBhdGhbMV1bM107XHJcbiAgICB0aGlzLmFycm93SGVhZC50b3AgPSB0aGlzLnBhdGgucGF0aFsxXVs0XTtcclxuICAgIHRoaXMuYXJyb3dIZWFkLnNldENvb3JkcygpO1xyXG4gICAgdGhpcy5hcnJvd1RhaWwubGVmdCA9IHRoaXMucGF0aC5wYXRoWzBdWzFdO1xyXG4gICAgdGhpcy5hcnJvd1RhaWwudG9wID0gdGhpcy5wYXRoLnBhdGhbMF1bMl07XHJcbiAgICB0aGlzLmFycm93VGFpbC5zZXRDb29yZHMoKTtcclxuXHJcbiAgICB0aGlzLmJyaW5nVG9Gcm9udCgpO1xyXG5cclxuICAgIC8vIFJlc2V0IGNvbnRyb2wgcG9pbnRcclxuICAgIGlmIChyZXNldEN1cnYpIHtcclxuICAgICAgdGhpcy5yZXNldEN1cnZhdHVyZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNWYWxpZENvbm5lY3Rpb24obGlua1BvaW50LCBzaGFwZUlkLCBjYXJkaW5hbCkge1xyXG4gICAgY29uc3Qgc2hhcGUgPSB0aGlzLmNhbnZhcy5nZXRPYmplY3RzKClcclxuICAgICAgLmZpbmQoKG8pID0+IG8uaWQgPT09IHNoYXBlSWQpO1xyXG4gICAgLy8gQ2hlY2sgbm90IGFscmVhZHkgY29ubmVjdGVkXHJcbiAgICBpZiAobGlua1BvaW50ID09PSAnZnJvbScpIHtcclxuICAgICAgaWYgKHRoaXMuZnJvbSAmJiB0aGlzLmZyb20uc2hhcGUgJiYgdGhpcy5mcm9tLnNoYXBlLmlkID09PSBzaGFwZS5pZCAmJiB0aGlzLmZyb20uY2FyZGluYWwgPT09IGNhcmRpbmFsKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyB0cnlpbmcgdG8gc2V0IHRoZSBzYW1lIGFscmVhZHkgY29ubmVjdGVkIGFuY2hvclxyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLnRvICYmIHRoaXMudG8uc2hhcGUgJiYgdGhpcy50by5zaGFwZS5pZCA9PT0gc2hhcGUuaWQpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIHRyeWluZyB0byBzaG9ydCBjaXJjdWl0IHRoZSByZWN0YW5nbGVcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChsaW5rUG9pbnQgPT09ICd0bycpIHtcclxuICAgICAgaWYgKHRoaXMudG8gJiYgdGhpcy50by5zaGFwZSAmJiB0aGlzLnRvLnNoYXBlLmlkID09PSBzaGFwZS5pZCAmJiB0aGlzLnRvLmNhcmRpbmFsID09PSBjYXJkaW5hbCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTsgLy8gdHJ5aW5nIHRvIHNldCB0aGUgc2FtZSBhbHJlYWR5IGNvbm5lY3RlZCBhbmNob3JcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5mcm9tICYmIHRoaXMuZnJvbS5zaGFwZSAmJiB0aGlzLmZyb20uc2hhcGUuaWQgPT09IHNoYXBlLmlkKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyB0cnlpbmcgdG8gc2hvcnQgY2lyY3VpdCB0aGUgcmVjdGFuZ2xlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlQWxsQW5jaG9yc09wYWNpdHkob3BhY2l0eSkge1xyXG4gICAgY29uc3QgYW5jaG9ycyA9IHRoaXMuY2FudmFzLmdldE9iamVjdHMoKVxyXG4gICAgICAuZmlsdGVyKChvKSA9PiBvLnR5cGUgPT09ICdhbmNob3InKTtcclxuICAgIGNvbnN0IHByb21pc2VzID0gW107XHJcbiAgICBjb25zdCBwcm9taXNlRmFjdG9yeSA9IGZ1bmN0aW9uIChhbmNob3IpIHtcclxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChyZXNvbHZlKSB7XHJcbiAgICAgICAgYW5jaG9yLmFuaW1hdGUoJ29wYWNpdHknLCBvcGFjaXR5LCB7XHJcbiAgICAgICAgICBkdXJhdGlvbjogMzAwLFxyXG4gICAgICAgICAgb25DaGFuZ2U6IHJlc29sdmUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgZm9yIChsZXQgYSA9IDA7IGEgPCBhbmNob3JzLmxlbmd0aDsgYSArPSAxKSB7XHJcbiAgICAgIHByb21pc2VzLnB1c2gobmV3IFByb21pc2UocHJvbWlzZUZhY3RvcnkoYW5jaG9yc1thXSkpKTtcclxuICAgIH1cclxuICAgIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IHtcclxuICAgICAgdGhpcy5jYW52YXMucmVuZGVyQWxsKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uTGlua01vdXNlT3ZlcigpIHtcclxuICAgIHRoaXMuY29udHJvbFBvaW50LnRvZ2dsZU9wYWNpdHkoMSk7XHJcbiAgICB0aGlzLmNvbnRyb2xMaW5lMS50b2dnbGVPcGFjaXR5KDEpO1xyXG4gICAgdGhpcy5jb250cm9sTGluZTIudG9nZ2xlT3BhY2l0eSgxKTtcclxuICB9XHJcblxyXG4gIG9uTGlua01vdXNlT3V0KCkge1xyXG4gICAgdGhpcy5jb250cm9sUG9pbnQudG9nZ2xlT3BhY2l0eSgwKTtcclxuICAgIHRoaXMuY29udHJvbExpbmUxLnRvZ2dsZU9wYWNpdHkoMCk7XHJcbiAgICB0aGlzLmNvbnRyb2xMaW5lMi50b2dnbGVPcGFjaXR5KDApO1xyXG4gIH1cclxufVxyXG4iLCJjb25zdCB7IGZhYnJpYyB9ID0gd2luZG93O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlua2FibGVTaGFwZSB7XHJcbiAgLyoqXHJcbiAgICogQSBMaW5rYWJsZVNoYXBlIGlzIGFueSBGYWJyaWMuT2JqZWN0IHNoYXBlIG9uIHdoaWNoIGFuY2hvcnMgYXJlIGFwcGVuZGVkIHNvIHRoYXQgbXVsdGlwbGUgTGluayBjYW4gYmUgY29ubmVjdGVkIHRvIGl0LlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBvcHRpb25zXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0ZhYnJpYy5DYW52YXN9ICAgb3B0aW9ucy5jYW52YXMgLSBGYWJyaWMgY2FudmFzXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG9wdGlvbnMuaWQgLSBVbmlxdWUgaWRlbnRpZmllclxyXG4gICAqXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBpZCxcclxuICAgICAgY2FudmFzLFxyXG4gICAgICBzaGFwZSxcclxuICAgICAgbGVmdCxcclxuICAgICAgdG9wLFxyXG4gICAgICBhbmdsZSxcclxuICAgIH0gPSBvcHRpb25zO1xyXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xyXG5cclxuICAgIC8vIFNldCBzaGFwZVxyXG4gICAgc2hhcGUuc2V0KCd0eXBlJywgJ2xpbmthYmxlU2hhcGUnKTtcclxuICAgIHNoYXBlLnNldCh7XHJcbiAgICAgIGxlZnQsIHRvcCwgaWQsIGFuZ2xlLFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNoYXBlID0gc2hhcGU7XHJcblxyXG4gICAgLy8gU2hvdyBjb29yZGluYXRlcy9hbmdsZSB3aGVuIG1vdmluZy9yb3RhdGluZyBvYmplY3RcclxuICAgIGNvbnN0IG1vZGlmaWNhdGlvbkJveCA9IG5ldyBmYWJyaWMuUmVjdCh7XHJcbiAgICAgIGxlZnQ6IDAsXHJcbiAgICAgIHRvcDogMCxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgc3Ryb2tlOiAnIzY2NicsXHJcbiAgICAgIGZpbGw6ICcjZmZmJyxcclxuICAgICAgd2lkdGg6IDcwLFxyXG4gICAgICBoZWlnaHQ6IDIwLFxyXG4gICAgICB2ZW50ZWQ6IGZhbHNlLFxyXG4gICAgICBzZWxlY3RhYmxlOiBmYWxzZSxcclxuICAgICAgb3BhY2l0eTogMCxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgbW9kaWZpY2F0aW9uVGV4dCA9IG5ldyBmYWJyaWMuVGV4dCgnMCwgMCcsIHtcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIGZvbnRGYW1pbHk6ICdIZWx2ZXRpY2EnLFxyXG4gICAgICBmb250U2l6ZTogMTIsXHJcbiAgICAgIGJvcmRlclN0cm9rZVdpZHRoOiA0LFxyXG4gICAgICBldmVudGVkOiBmYWxzZSxcclxuICAgICAgc2VsZWN0YWJsZTogZmFsc2UsXHJcbiAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IG1vZGlmaWNhdGlvbiA9IHRoaXMubW9kQm94ID0gbmV3IGZhYnJpYy5Hcm91cChbbW9kaWZpY2F0aW9uQm94LCBtb2RpZmljYXRpb25UZXh0XSwge1xyXG4gICAgICBsZWZ0OiAwLFxyXG4gICAgICB0b3A6IDAsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgZXZlbnRlZDogZmFsc2UsXHJcbiAgICAgIHNlbGVjdGFibGU6IGZhbHNlLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBvbk1vdmluZyA9ICgpID0+IHtcclxuICAgICAgY29uc3QgeyB4LCB5IH0gPSBzaGFwZS5hQ29vcmRzLnRsO1xyXG4gICAgICBjb25zdCB4Q29vcmRzID0gW3NoYXBlLmFDb29yZHMudGwueCwgc2hhcGUuYUNvb3Jkcy50ci54LCBzaGFwZS5hQ29vcmRzLmJsLngsIHNoYXBlLmFDb29yZHMuYnIueF07XHJcbiAgICAgIGNvbnN0IHlDb29yZHMgPSBbc2hhcGUuYUNvb3Jkcy50bC55LCBzaGFwZS5hQ29vcmRzLnRyLnksIHNoYXBlLmFDb29yZHMuYmwueSwgc2hhcGUuYUNvb3Jkcy5ici55XTtcclxuICAgICAgbW9kaWZpY2F0aW9uLmxlZnQgPSAoTWF0aC5taW4oLi4ueENvb3JkcykgKyBNYXRoLm1heCguLi54Q29vcmRzKSkgLyAyO1xyXG4gICAgICBtb2RpZmljYXRpb24udG9wID0gTWF0aC5yb3VuZChNYXRoLm1heCguLi55Q29vcmRzKSArIDMwKTtcclxuICAgICAgbW9kaWZpY2F0aW9uLnNldENvb3JkcygpO1xyXG4gICAgICBtb2RpZmljYXRpb25Cb3guc2V0KCdvcGFjaXR5JywgMC43KTtcclxuICAgICAgbW9kaWZpY2F0aW9uVGV4dC5zZXQoJ29wYWNpdHknLCAxKTtcclxuICAgICAgbW9kaWZpY2F0aW9uVGV4dC5zZXQoJ3RleHQnLCBgJHtNYXRoLnJvdW5kKHgpfSwgJHtNYXRoLnJvdW5kKHkpfWApO1xyXG4gICAgICBjYW52YXMuYnJpbmdUb0Zyb250KG1vZGlmaWNhdGlvbik7XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb25Nb3ZlZCA9ICgpID0+IHtcclxuICAgICAgbW9kaWZpY2F0aW9uQm94LnNldCgnb3BhY2l0eScsIDApO1xyXG4gICAgICBtb2RpZmljYXRpb25UZXh0LnNldCgnb3BhY2l0eScsIDApO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IG9uUm90YXRpbmcgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHhDb29yZHMgPSBbc2hhcGUuYUNvb3Jkcy50bC54LCBzaGFwZS5hQ29vcmRzLnRyLngsIHNoYXBlLmFDb29yZHMuYmwueCwgc2hhcGUuYUNvb3Jkcy5ici54XTtcclxuICAgICAgY29uc3QgeUNvb3JkcyA9IFtzaGFwZS5hQ29vcmRzLnRsLnksIHNoYXBlLmFDb29yZHMudHIueSwgc2hhcGUuYUNvb3Jkcy5ibC55LCBzaGFwZS5hQ29vcmRzLmJyLnldO1xyXG4gICAgICBtb2RpZmljYXRpb24ubGVmdCA9IChNYXRoLm1pbiguLi54Q29vcmRzKSArIE1hdGgubWF4KC4uLnhDb29yZHMpKSAvIDI7XHJcbiAgICAgIG1vZGlmaWNhdGlvbi50b3AgPSBNYXRoLnJvdW5kKE1hdGgubWF4KC4uLnlDb29yZHMpICsgMzApO1xyXG4gICAgICBtb2RpZmljYXRpb24uc2V0Q29vcmRzKCk7XHJcbiAgICAgIG1vZGlmaWNhdGlvbkJveC5zZXQoJ29wYWNpdHknLCAwLjcpO1xyXG4gICAgICBtb2RpZmljYXRpb25UZXh0LnNldCgnb3BhY2l0eScsIDEpO1xyXG4gICAgICBtb2RpZmljYXRpb25UZXh0LnNldCgndGV4dCcsIGAke01hdGgucm91bmQoc2hhcGUuYW5nbGUgPiAxODAgPyBzaGFwZS5hbmdsZSAtIDM2MCA6IHNoYXBlLmFuZ2xlKX3CsGApO1xyXG4gICAgICBjYW52YXMuYnJpbmdUb0Zyb250KG1vZGlmaWNhdGlvbik7XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb25Sb3RhdGVkID0gKCkgPT4ge1xyXG4gICAgICBtb2RpZmljYXRpb25Cb3guc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICAgIG1vZGlmaWNhdGlvblRleHQuc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICB9O1xyXG4gICAgc2hhcGUub24oe1xyXG4gICAgICBtb3Zpbmc6IG9uTW92aW5nLFxyXG4gICAgICBtb3ZlZDogb25Nb3ZlZCxcclxuICAgICAgcm90YXRpbmc6IG9uUm90YXRpbmcsXHJcbiAgICAgIHJvdGF0ZWQ6IG9uUm90YXRlZCxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEFuY2hvciBwb2ludHNcclxuICAgIGNvbnN0IGVhc3QgPSB0aGlzLl9tYWtlQW5jaG9yUG9pbnQoJ2Vhc3QnKTtcclxuICAgIGNvbnN0IHdlc3QgPSB0aGlzLl9tYWtlQW5jaG9yUG9pbnQoJ3dlc3QnKTtcclxuICAgIGNvbnN0IG5vcnRoID0gdGhpcy5fbWFrZUFuY2hvclBvaW50KCdub3J0aCcpO1xyXG4gICAgY29uc3Qgc291dGggPSB0aGlzLl9tYWtlQW5jaG9yUG9pbnQoJ3NvdXRoJyk7XHJcbiAgICBjb25zdCBub3J0aGVhc3QgPSB0aGlzLl9tYWtlQW5jaG9yUG9pbnQoJ25vcnRoZWFzdCcpO1xyXG4gICAgY29uc3Qgbm9ydGh3ZXN0ID0gdGhpcy5fbWFrZUFuY2hvclBvaW50KCdub3J0aHdlc3QnKTtcclxuICAgIGNvbnN0IHNvdXRoZWFzdCA9IHRoaXMuX21ha2VBbmNob3JQb2ludCgnc291dGhlYXN0Jyk7XHJcbiAgICBjb25zdCBzb3V0aHdlc3QgPSB0aGlzLl9tYWtlQW5jaG9yUG9pbnQoJ3NvdXRod2VzdCcpO1xyXG4gICAgdGhpcy5hbmNob3JzID0gdGhpcy5zaGFwZS5hbmNob3JzID0ge1xyXG4gICAgICBlYXN0LFxyXG4gICAgICB3ZXN0LFxyXG4gICAgICBub3J0aCxcclxuICAgICAgc291dGgsXHJcbiAgICAgIG5vcnRoZWFzdCxcclxuICAgICAgbm9ydGh3ZXN0LFxyXG4gICAgICBzb3V0aGVhc3QsXHJcbiAgICAgIHNvdXRod2VzdCxcclxuICAgIH07XHJcblxyXG4gICAgLy8gRXZlbnRzIHJlbGF0ZWQgdG8gYW5jaG9yc1xyXG4gICAgc2hhcGUub24oe1xyXG4gICAgICBzZWxlY3RlZDogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudG9nZ2xlQW5jaG9yc09wYWNpdHkoMCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG1vdXNlb3ZlcjogKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNhbnZhcy5nZXRBY3RpdmVPYmplY3QoKSAhPT0gdGhpcy5zaGFwZSkge1xyXG4gICAgICAgICAgdGhpcy50b2dnbGVBbmNob3JzT3BhY2l0eSgxKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG1vdXNlb3V0OiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy50b2dnbGVBbmNob3JzT3BhY2l0eSgwKTtcclxuICAgICAgfSxcclxuICAgICAgbW92aW5nOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKGZhbHNlKTtcclxuICAgICAgfSxcclxuICAgICAgbW92ZWQ6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnJlZnJlc2hBbmNob3JzUG9zaXRpb24odHJ1ZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHJvdGF0aW5nOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKGZhbHNlKTtcclxuICAgICAgfSxcclxuICAgICAgcm90YXRlZDogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbih0cnVlKTtcclxuICAgICAgfSxcclxuICAgICAgc2NhbGluZzogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbihmYWxzZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHNjYWxlZDogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbih0cnVlKTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5qZWN0KCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHNoYXBlLFxyXG4gICAgICBhbmNob3JzLFxyXG4gICAgICBtb2RCb3gsXHJcbiAgICB9ID0gdGhpcztcclxuICAgIGNhbnZhcy5hZGQoc2hhcGUpO1xyXG4gICAgY2FudmFzLmFkZChtb2RCb3gpO1xyXG4gICAgY2FudmFzLmFkZChhbmNob3JzLmVhc3QpO1xyXG4gICAgY2FudmFzLmJyaW5nRm9yd2FyZChhbmNob3JzLmVhc3QsIHRydWUpO1xyXG4gICAgY2FudmFzLmFkZChhbmNob3JzLndlc3QpO1xyXG4gICAgY2FudmFzLmJyaW5nRm9yd2FyZChhbmNob3JzLndlc3QsIHRydWUpO1xyXG4gICAgY2FudmFzLmFkZChhbmNob3JzLm5vcnRoKTtcclxuICAgIGNhbnZhcy5icmluZ0ZvcndhcmQoYW5jaG9ycy5ub3J0aCwgdHJ1ZSk7XHJcbiAgICBjYW52YXMuYWRkKGFuY2hvcnMuc291dGgpO1xyXG4gICAgY2FudmFzLmJyaW5nRm9yd2FyZChhbmNob3JzLnNvdXRoLCB0cnVlKTtcclxuICAgIGNhbnZhcy5hZGQoYW5jaG9ycy5ub3J0aGVhc3QpO1xyXG4gICAgY2FudmFzLmJyaW5nRm9yd2FyZChhbmNob3JzLm5vcnRoZWFzdCwgdHJ1ZSk7XHJcbiAgICBjYW52YXMuYWRkKGFuY2hvcnMubm9ydGh3ZXN0KTtcclxuICAgIGNhbnZhcy5icmluZ0ZvcndhcmQoYW5jaG9ycy5ub3J0aHdlc3QsIHRydWUpO1xyXG4gICAgY2FudmFzLmFkZChhbmNob3JzLnNvdXRoZWFzdCk7XHJcbiAgICBjYW52YXMuYnJpbmdGb3J3YXJkKGFuY2hvcnMuc291dGhlYXN0LCB0cnVlKTtcclxuICAgIGNhbnZhcy5hZGQoYW5jaG9ycy5zb3V0aHdlc3QpO1xyXG4gICAgY2FudmFzLmJyaW5nRm9yd2FyZChhbmNob3JzLnNvdXRod2VzdCwgdHJ1ZSk7XHJcbiAgICB0aGlzLnJlZnJlc2hBbmNob3JzUG9zaXRpb24odHJ1ZSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBtb3ZlKG9wdGlvbnMpIHtcclxuICAgIGlmIChvcHRpb25zLngpIHRoaXMuc2hhcGUuc2V0KCd0b3AnLCBvcHRpb25zLngpO1xyXG4gICAgaWYgKG9wdGlvbnMueSkgdGhpcy5zaGFwZS5zZXQoJ2xlZnQnLCBvcHRpb25zLnkpO1xyXG4gICAgdGhpcy5zaGFwZS5zZXRDb29yZHMoKTtcclxuICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgcm90YXRlKGFuZ2xlKSB7XHJcbiAgICB0aGlzLnNoYXBlLnJvdGF0ZShhbmdsZSk7XHJcbiAgICB0aGlzLnNoYXBlLnNldENvb3JkcygpO1xyXG4gICAgdGhpcy5yZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKCk7XHJcbiAgfVxyXG5cclxuICByZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKGNvbW1pdCkge1xyXG4gICAgdGhpcy5fc2V0QW5jaG9yUG9zaXRpb25SZWxhdGl2ZVRvUmVjdGFuZ2xlKCdlYXN0JywgY29tbWl0KTtcclxuICAgIHRoaXMuX3NldEFuY2hvclBvc2l0aW9uUmVsYXRpdmVUb1JlY3RhbmdsZSgnd2VzdCcsIHRoaXMuc2hhcGUsIGNvbW1pdCk7XHJcbiAgICB0aGlzLl9zZXRBbmNob3JQb3NpdGlvblJlbGF0aXZlVG9SZWN0YW5nbGUoJ3NvdXRoJywgdGhpcy5zaGFwZSwgY29tbWl0KTtcclxuICAgIHRoaXMuX3NldEFuY2hvclBvc2l0aW9uUmVsYXRpdmVUb1JlY3RhbmdsZSgnbm9ydGgnLCB0aGlzLnNoYXBlLCBjb21taXQpO1xyXG4gICAgdGhpcy5fc2V0QW5jaG9yUG9zaXRpb25SZWxhdGl2ZVRvUmVjdGFuZ2xlKCdub3J0aGVhc3QnLCB0aGlzLnNoYXBlLCBjb21taXQpO1xyXG4gICAgdGhpcy5fc2V0QW5jaG9yUG9zaXRpb25SZWxhdGl2ZVRvUmVjdGFuZ2xlKCdub3J0aHdlc3QnLCB0aGlzLnNoYXBlLCBjb21taXQpO1xyXG4gICAgdGhpcy5fc2V0QW5jaG9yUG9zaXRpb25SZWxhdGl2ZVRvUmVjdGFuZ2xlKCdzb3V0aGVhc3QnLCB0aGlzLnNoYXBlLCBjb21taXQpO1xyXG4gICAgdGhpcy5fc2V0QW5jaG9yUG9zaXRpb25SZWxhdGl2ZVRvUmVjdGFuZ2xlKCdzb3V0aHdlc3QnLCB0aGlzLnNoYXBlLCBjb21taXQpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlQW5jaG9yc09wYWNpdHkob3BhY2l0eSkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBlYXN0LFxyXG4gICAgICB3ZXN0LFxyXG4gICAgICBub3J0aCxcclxuICAgICAgc291dGgsXHJcbiAgICAgIG5vcnRoZWFzdCxcclxuICAgICAgc291dGhlYXN0LFxyXG4gICAgICBub3J0aHdlc3QsXHJcbiAgICAgIHNvdXRod2VzdCxcclxuICAgIH0gPSB0aGlzLmFuY2hvcnM7XHJcbiAgICBlYXN0LnRvZ2dsZU9wYWNpdHkob3BhY2l0eSk7XHJcbiAgICB3ZXN0LnRvZ2dsZU9wYWNpdHkob3BhY2l0eSk7XHJcbiAgICBub3J0aC50b2dnbGVPcGFjaXR5KG9wYWNpdHkpO1xyXG4gICAgc291dGgudG9nZ2xlT3BhY2l0eShvcGFjaXR5KTtcclxuICAgIG5vcnRoZWFzdC50b2dnbGVPcGFjaXR5KG9wYWNpdHkpO1xyXG4gICAgc291dGhlYXN0LnRvZ2dsZU9wYWNpdHkob3BhY2l0eSk7XHJcbiAgICBub3J0aHdlc3QudG9nZ2xlT3BhY2l0eShvcGFjaXR5KTtcclxuICAgIHNvdXRod2VzdC50b2dnbGVPcGFjaXR5KG9wYWNpdHkpO1xyXG4gIH1cclxuXHJcbiAgX3NldEFuY2hvclBvc2l0aW9uUmVsYXRpdmVUb1JlY3RhbmdsZShjYXJkaW5hbCwgY29tbWl0KSB7XHJcbiAgICBsZXQgbGVmdDtcclxuICAgIGxldCB0b3A7XHJcbiAgICBjb25zdCB7IHNoYXBlIH0gPSB0aGlzO1xyXG4gICAgY29uc3QgYXAgPSB0aGlzLmFuY2hvcnNbY2FyZGluYWxdO1xyXG4gICAgc3dpdGNoIChjYXJkaW5hbCkge1xyXG4gICAgICBjYXNlICdlYXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSAoc2hhcGUuYUNvb3Jkcy50ci54ICsgc2hhcGUuYUNvb3Jkcy5ici54KSAvIDI7XHJcbiAgICAgICAgdG9wID0gKHNoYXBlLmFDb29yZHMudHIueSArIHNoYXBlLmFDb29yZHMuYnIueSkgLyAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3dlc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IChzaGFwZS5hQ29vcmRzLnRsLnggKyBzaGFwZS5hQ29vcmRzLmJsLngpIC8gMjtcclxuICAgICAgICB0b3AgPSAoc2hhcGUuYUNvb3Jkcy50bC55ICsgc2hhcGUuYUNvb3Jkcy5ibC55KSAvIDI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnbm9ydGgnOiB7XHJcbiAgICAgICAgbGVmdCA9IChzaGFwZS5hQ29vcmRzLnRsLnggKyBzaGFwZS5hQ29vcmRzLnRyLngpIC8gMjtcclxuICAgICAgICB0b3AgPSAoc2hhcGUuYUNvb3Jkcy50bC55ICsgc2hhcGUuYUNvb3Jkcy50ci55KSAvIDI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnc291dGgnOiB7XHJcbiAgICAgICAgbGVmdCA9IChzaGFwZS5hQ29vcmRzLmJsLnggKyBzaGFwZS5hQ29vcmRzLmJyLngpIC8gMjtcclxuICAgICAgICB0b3AgPSAoc2hhcGUuYUNvb3Jkcy5ibC55ICsgc2hhcGUuYUNvb3Jkcy5ici55KSAvIDI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnbm9ydGhlYXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSBzaGFwZS5hQ29vcmRzLnRyLng7XHJcbiAgICAgICAgdG9wID0gc2hhcGUuYUNvb3Jkcy50ci55O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRod2VzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gc2hhcGUuYUNvb3Jkcy50bC54O1xyXG4gICAgICAgIHRvcCA9IHNoYXBlLmFDb29yZHMudGwueTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aGVhc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IHNoYXBlLmFDb29yZHMuYnIueDtcclxuICAgICAgICB0b3AgPSBzaGFwZS5hQ29vcmRzLmJyLnk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnc291dGh3ZXN0JzpcclxuICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgIGxlZnQgPSBzaGFwZS5hQ29vcmRzLmJsLng7XHJcbiAgICAgICAgdG9wID0gc2hhcGUuYUNvb3Jkcy5ibC55O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBhcC5sZWZ0ID0gbGVmdDtcclxuICAgIGFwLnRvcCA9IHRvcDtcclxuICAgIGFwLnNldENvb3JkcygpO1xyXG5cclxuICAgIGFwLmZpcmUoY29tbWl0ID8gJ3BnOnBvc2l0aW9uOm1vZGlmaWVkJyA6ICdwZzpwb3NpdGlvbjptb2RpZnlpbmcnKTtcclxuICB9XHJcblxyXG4gIF9tYWtlQW5jaG9yUG9pbnQoY2FyZGluYWwpIHtcclxuICAgIGxldCBsZWZ0O1xyXG4gICAgbGV0IHRvcDtcclxuICAgIGNvbnN0IHtcclxuICAgICAgc2hhcGUsXHJcbiAgICAgIGlkLFxyXG4gICAgfSA9IHRoaXM7XHJcbiAgICBzd2l0Y2ggKGNhcmRpbmFsKSB7XHJcbiAgICAgIGNhc2UgJ2Vhc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IChzaGFwZS5hQ29vcmRzLnRyLnggKyBzaGFwZS5hQ29vcmRzLmJyLngpIC8gMjtcclxuICAgICAgICB0b3AgPSAoc2hhcGUuYUNvb3Jkcy50ci55ICsgc2hhcGUuYUNvb3Jkcy5ici55KSAvIDI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnd2VzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMudGwueCArIHNoYXBlLmFDb29yZHMuYmwueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLnRsLnkgKyBzaGFwZS5hQ29vcmRzLmJsLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMudGwueCArIHNoYXBlLmFDb29yZHMudHIueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLnRsLnkgKyBzaGFwZS5hQ29vcmRzLnRyLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMuYmwueCArIHNoYXBlLmFDb29yZHMuYnIueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLmJsLnkgKyBzaGFwZS5hQ29vcmRzLmJyLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aGVhc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IHNoYXBlLmFDb29yZHMudHIueDtcclxuICAgICAgICB0b3AgPSBzaGFwZS5hQ29vcmRzLnRyLnk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnbm9ydGh3ZXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSBzaGFwZS5hQ29vcmRzLnRsLng7XHJcbiAgICAgICAgdG9wID0gc2hhcGUuYUNvb3Jkcy50bC55O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRoZWFzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gc2hhcGUuYUNvb3Jkcy5ici54O1xyXG4gICAgICAgIHRvcCA9IHNoYXBlLmFDb29yZHMuYnIueTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aHdlc3QnOlxyXG4gICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgbGVmdCA9IHNoYXBlLmFDb29yZHMuYmwueDtcclxuICAgICAgICB0b3AgPSBzaGFwZS5hQ29vcmRzLmJsLnk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhcCA9IG5ldyBmYWJyaWMuQ2lyY2xlKHtcclxuICAgICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAgIGxlZnQsXHJcbiAgICAgIHRvcCxcclxuICAgICAgc3Ryb2tlV2lkdGg6IDIsXHJcbiAgICAgIHJhZGl1czogNixcclxuICAgICAgZmlsbDogJyM3OGJlZmEnLCAvLyA0MmEyZGEgZDVlOGYyXHJcbiAgICAgIHN0cm9rZTogJyM3OGJlZmEnLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAgIHNlbGVjdGFibGU6IGZhbHNlLFxyXG4gICAgICBvcGFjaXR5OiAwLFxyXG4gICAgICBpZDogYCR7aWR9XyR7Y2FyZGluYWx9YCxcclxuICAgIH0pO1xyXG4gICAgYXAudHlwZSA9ICdhbmNob3InO1xyXG4gICAgYXAuc2hhcGVJZCA9IGlkO1xyXG4gICAgYXAuY2FyZGluYWwgPSBjYXJkaW5hbDtcclxuICAgIGFwLm9uKCdtb3VzZW92ZXInLCAoKSA9PiB7XHJcbiAgICAgIGFwLnRvZ2dsZU9wYWNpdHkoMSk7XHJcbiAgICB9KTtcclxuICAgIGFwLm9uKCdtb3VzZW91dCcsICgpID0+IHtcclxuICAgICAgYXAudG9nZ2xlT3BhY2l0eSgwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCB0aW1lcjsgLy8gd29ya2Fyb3VuZCB0byBkaWZmZXJlbnRpYXRlIHNpbmdsZSBhbmQgZG91YmxlIGNsaWNrXHJcbiAgICBhcC5vbignbW91c2Vkb3duJywgKG9wdGlvbnMpID0+IHtcclxuICAgICAgY29uc3QgZXZlbnQgPSBvcHRpb25zLmU7XHJcbiAgICAgIGlmIChldmVudC5kZXRhaWwgPT09IDEpIHtcclxuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5fb25BbmNob3JDbGljay5jYWxsKHRoaXMsIG9wdGlvbnMpO1xyXG4gICAgICAgIH0sIDMwMCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgYXAub24oJ21vdXNlZGJsY2xpY2snLCAob3B0aW9ucykgPT4ge1xyXG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xyXG4gICAgICB0aGlzLl9vbkFuY2hvckRvdWJsZUNsaWNrLmNhbGwodGhpcywgb3B0aW9ucyk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBhcDtcclxuICB9XHJcblxyXG4gIC8vIFNob3VsZCBiZSBpbXBsZW1lbnRlZCBieSBFeHRlbmRpbmcgQ2xhc3Nlc1xyXG4gIC8qIGVzbGludC1kaXNhYmxlIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXMgKi9cclxuICBfb25BbmNob3JDbGljaygvKiBvcHRpb25zICovKSB7fVxyXG5cclxuICBfb25BbmNob3JEb3VibGVDbGljaygvKiBvcHRpb25zICovKSB7fVxyXG4gIC8qIGVzbGludC1kaXNhYmxlIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXMgKi9cclxufVxyXG4iLCJjb25zdCB7IGZhYnJpYyB9ID0gd2luZG93O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvY2Vzc0dyYXBoIHtcclxuICAvKipcclxuICAgKlxyXG4gICAqIEBwYXJhbSBvcHRpb25zXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0NhbnZhc30gb3B0aW9ucy5jYW52YXMgLSBGYWJyaWNKUy5DYW52YXMgaW5zdGFuY2UgLSBtYW5kYXRvcnkgaWYgb3B0aW9ucy5jYW52YXNPcHRzIG5vdCBwcm92aWRlZC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLmNhbnZhc09wdHMgLSBGYWJyaWNKUy5DYW52YXMjaW5pdGlhbGl6ZSBwYXJhbWV0ZXJzIC0gbWFuZGF0b3J5IGlmIG9wdGlvbnMuY2FudmFzIG5vdCBwcm92aWRlZFxyXG4gICAqICAgICAgICAgICAgICAgICBTZWUgaHR0cDovL2ZhYnJpY2pzLmNvbS9kb2NzL2ZhYnJpYy5DYW52YXMuaHRtbCNpbml0aWFsaXplIGZvciBkZXRhaWxzXHJcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudHxTdHJpbmd9IG9wdGlvbnMuY2FudmFzLmVsIC0gPGNhbnZhcz4gZWxlbWVudCB0byBpbml0aWFsaXplIGluc3RhbmNlIG9uXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuY2FudmFzLm9wdGlvbnMgLSBPcHRpb25zIG9iamVjdFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmdyaWRdIC0gZGltZW5zaW9ucyBvZiB0aGUgZ3JpZFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIHRoaXMuaGFuZGxlcnMgPSB7XHJcbiAgICAgIGdyaWQ6IHt9LFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBJbml0aWFsaXplIENhbnZhc1xyXG4gICAgY29uc3QgY2FudmFzID0gdGhpcy5jYW52YXMgPSBvcHRpb25zLmNhbnZhcyA/IG9wdGlvbnMuY2FudmFzIDogbmV3IGZhYnJpYy5DYW52YXMob3B0aW9ucy5jYW52YXNPcHRzLmVsLCBvcHRpb25zLmNhbnZhc09wdHMub3B0aW9ucyk7XHJcbiAgICBjYW52YXMuc2V0KCdwcmVzZXJ2ZU9iamVjdFN0YWNraW5nJywgdHJ1ZSk7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmdyaWQgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIHRoaXMuc2V0R3JpZCh7XHJcbiAgICAgICAgZ3JpZDogb3B0aW9ucy5ncmlkLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBmYWJyaWMuT2JqZWN0LnByb3RvdHlwZS5vcmlnaW5YID0gZmFicmljLk9iamVjdC5wcm90b3R5cGUub3JpZ2luWSA9ICdjZW50ZXInO1xyXG4gICAgZmFicmljLk9iamVjdC5wcm90b3R5cGUudG9nZ2xlT3BhY2l0eSA9IGZ1bmN0aW9uIHRvZ2dsZU9wYWNpdHkob3BhY2l0eSwgdGltZW91dCkge1xyXG4gICAgICB0aGlzLmFuaW1hdGUoJ29wYWNpdHknLCBvcGFjaXR5LCB7XHJcbiAgICAgICAgZHVyYXRpb246IHRpbWVvdXQgIT09IHVuZGVmaW5lZCA/IHRpbWVvdXQgOiAzMDAsXHJcbiAgICAgICAgb25DaGFuZ2U6IHRoaXMuY2FudmFzLnJlbmRlckFsbC5iaW5kKHRoaXMuY2FudmFzKSxcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNhbnZhcy5jYWxjT2Zmc2V0KCk7XHJcblxyXG4gICAgLy8gUHJldmVudCBub24gTGlua2FibGVTaGFwZSBvYmplY3RzIHRvIGJlIGdyb3VwZWQgZHVyaW5nIHNlbGVjdGlvblxyXG4gICAgY29uc3Qgb25TZWxlY3Rpb24gPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGFjdGl2ZSA9IGNhbnZhcy5nZXRBY3RpdmVPYmplY3QoKTtcclxuICAgICAgLy8gV2hlbiBtdWx0aSBzZWxlY3Rpb24sIHJlbW92ZSBhbnkgbm9uIExpbmthYmxlIFNoYXBlIG9iamVjdHNcclxuICAgICAgaWYgKGFjdGl2ZS50eXBlID09PSAnYWN0aXZlU2VsZWN0aW9uJykge1xyXG4gICAgICAgIGNvbnN0IG9iamVjdHMgPSBhY3RpdmUuZ2V0T2JqZWN0cygpO1xyXG4gICAgICAgIGlmIChvYmplY3RzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgIGNvbnN0IG9ubHlSZWN0ID0gb2JqZWN0cy5maWx0ZXIoKG8pID0+IG8udHlwZSA9PT0gJ2xpbmthYmxlU2hhcGUnKTtcclxuICAgICAgICAgIGNhbnZhcy5fZGlzY2FyZEFjdGl2ZU9iamVjdCgpO1xyXG4gICAgICAgICAgY29uc3Qgc2VsID0gbmV3IGZhYnJpYy5BY3RpdmVTZWxlY3Rpb24ob25seVJlY3QsIHtcclxuICAgICAgICAgICAgY2FudmFzLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBjYW52YXMuX3NldEFjdGl2ZU9iamVjdChzZWwpO1xyXG5cclxuICAgICAgICAgIC8vIFVwZGF0ZSBhbnkgbGlua3MgY29ubmVjdGVkIHRvIHRoZSBMaW5rYWJsZSBTaGFwZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjYW52YXMub24oe1xyXG4gICAgICAnc2VsZWN0aW9uOmNyZWF0ZWQnOiBvblNlbGVjdGlvbixcclxuICAgICAgJ3NlbGVjdGlvbjp1cGRhdGVkJzogb25TZWxlY3Rpb24sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCBjYW52YXMgdG8gaGF2ZSBhIGdyaWQuXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcclxuICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5ncmlkIC0gZ3JpZCBzcGFjaW5nIChwaXhlbHMpXHJcbiAgICovXHJcbiAgc2V0R3JpZChvcHRpb25zKSB7XHJcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZ3JpZCAhPT0gJ251bWJlcicgfHwgb3B0aW9ucy5ncmlkIDwgMCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnQgXCJncmlkXCIgaW4gUHJvY2Vzc0dyYXAjc2V0R3JpZC4gKHJlcXVpcmVkOiBOdW1iZXIgPiAwKScpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZ3JpZCA9IG9wdGlvbnMuZ3JpZDtcclxuICAgIGNvbnN0IHsgY2FudmFzIH0gPSB0aGlzO1xyXG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tbXVsdGktc3RyICovXHJcbiAgICBjb25zdCBkYXRhID0gYDxzdmcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj4gXFxcclxuICAgICAgICA8ZGVmcz4gXFxcclxuICAgICAgICAgICAgPHBhdHRlcm4gaWQ9XCJzbWFsbEdyaWRcIiB3aWR0aD1cIiR7dGhpcy5ncmlkfVwiIGhlaWdodD1cIiR7dGhpcy5ncmlkfVwiIHBhdHRlcm5Vbml0cz1cInVzZXJTcGFjZU9uVXNlXCI+IFxcXHJcbiAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTSAke3RoaXMuZ3JpZH0gMCBMIDAgMCAwICR7dGhpcy5ncmlkfVwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiZ3JheVwiIHN0cm9rZS13aWR0aD1cIjAuNVwiIC8+IFxcXHJcbiAgICAgICAgICAgIDwvcGF0dGVybj4gXFxcclxuICAgICAgICAgICAgPHBhdHRlcm4gaWQ9XCJncmlkXCIgd2lkdGg9XCIke3RoaXMuZ3JpZCAqIDV9XCIgaGVpZ2h0PVwiJHt0aGlzLmdyaWQgKiA1fVwiIHBhdHRlcm5Vbml0cz1cInVzZXJTcGFjZU9uVXNlXCI+IFxcXHJcbiAgICAgICAgICAgICAgICA8cmVjdCB3aWR0aD1cIiR7dGhpcy5ncmlkICogNX1cIiBoZWlnaHQ9XCIke3RoaXMuZ3JpZCAqIDV9XCIgZmlsbD1cInVybCgjc21hbGxHcmlkKVwiIC8+IFxcXHJcbiAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTSAke3RoaXMuZ3JpZCAqIDV9IDAgTCAwIDAgMCAke3RoaXMuZ3JpZCAqIDV9XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJncmF5XCIgc3Ryb2tlLXdpZHRoPVwiMVwiIC8+IFxcXHJcbiAgICAgICAgICAgIDwvcGF0dGVybj4gXFxcclxuICAgICAgICA8L2RlZnM+IFxcXHJcbiAgICAgICAgPHJlY3Qgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIGZpbGw9XCJ1cmwoI2dyaWQpXCIgLz4gXFxcclxuICAgIDwvc3ZnPmA7XHJcbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLW11bHRpLXN0ciAqL1xyXG5cclxuICAgIGNvbnN0IERPTVVSTCA9IHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTCB8fCB3aW5kb3c7XHJcbiAgICBjb25zdCBzdmcgPSBuZXcgQmxvYihbZGF0YV0sIHsgdHlwZTogJ2ltYWdlL3N2Zyt4bWw7Y2hhcnNldD11dGYtOCcgfSk7XHJcbiAgICBjb25zdCB1cmwgPSBET01VUkwuY3JlYXRlT2JqZWN0VVJMKHN2Zyk7XHJcbiAgICBmYWJyaWMudXRpbC5sb2FkSW1hZ2UodXJsLCAoaW1nKSA9PiB7XHJcbiAgICAgIGNvbnN0IGJnID0gbmV3IGZhYnJpYy5SZWN0KHtcclxuICAgICAgICB3aWR0aDogY2FudmFzLndpZHRoLCBoZWlnaHQ6IGNhbnZhcy5oZWlnaHQsIGV2ZW50ZWQ6IGZhbHNlLCBzZWxlY3RhYmxlOiBmYWxzZSxcclxuICAgICAgfSk7XHJcbiAgICAgIGJnLmZpbGwgPSBuZXcgZmFicmljLlBhdHRlcm4oeyBzb3VyY2U6IGltZyB9LFxyXG4gICAgICAgICgoKSA9PiB7IGJnLmRpcnR5ID0gdHJ1ZTsgY2FudmFzLnJlcXVlc3RSZW5kZXJBbGwoKTsgfSkpO1xyXG4gICAgICBiZy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICAgIGNhbnZhcy5zZXQoJ2JhY2tncm91bmRJbWFnZScsIGJnKTtcclxuXHJcbiAgICAgIC8vIFNuYXAgdG8gZ3JpZCBlZmZlY3RzXHJcbiAgICAgIGNhbnZhcy5vZmYodGhpcy5oYW5kbGVycy5ncmlkKTtcclxuICAgICAgdGhpcy5oYW5kbGVycy5ncmlkID0ge1xyXG4gICAgICAgICdvYmplY3Q6bW92aW5nJzogKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB7IGdyaWQgfSA9IHRoaXM7XHJcbiAgICAgICAgICBjb25zdCB7IHRhcmdldCB9ID0gZXZlbnQ7XHJcbiAgICAgICAgICBpZiAodGFyZ2V0LnR5cGUgIT09ICdsaW5rYWJsZVNoYXBlJykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBldmVudC50YXJnZXQuc2V0KHtcclxuICAgICAgICAgICAgbGVmdDogTWF0aC5yb3VuZChldmVudC50YXJnZXQubGVmdCAvIGdyaWQpICogZ3JpZCxcclxuICAgICAgICAgICAgdG9wOiBNYXRoLnJvdW5kKGV2ZW50LnRhcmdldC50b3AgLyBncmlkKSAqIGdyaWQsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgICdvYmplY3Q6c2NhbGluZyc6IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgeyBncmlkIH0gPSB0aGlzO1xyXG4gICAgICAgICAgY29uc3QgeyB0YXJnZXQgfSA9IGV2ZW50O1xyXG5cclxuICAgICAgICAgIGlmICh0YXJnZXQudHlwZSAhPT0gJ2xpbmthYmxlU2hhcGUnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zdCB3ID0gdGFyZ2V0LndpZHRoICogdGFyZ2V0LnNjYWxlWDtcclxuICAgICAgICAgIGNvbnN0IGggPSB0YXJnZXQuaGVpZ2h0ICogdGFyZ2V0LnNjYWxlWTtcclxuICAgICAgICAgIGNvbnN0IHNuYXAgPSB7IC8vIENsb3Nlc3Qgc25hcHBpbmcgcG9pbnRzXHJcbiAgICAgICAgICAgIHRvcDogTWF0aC5yb3VuZCh0YXJnZXQudG9wIC8gZ3JpZCkgKiBncmlkLFxyXG4gICAgICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKHRhcmdldC5sZWZ0IC8gZ3JpZCkgKiBncmlkLFxyXG4gICAgICAgICAgICBib3R0b206IE1hdGgucm91bmQoKHRhcmdldC50b3AgKyBoKSAvIGdyaWQpICogZ3JpZCxcclxuICAgICAgICAgICAgcmlnaHQ6IE1hdGgucm91bmQoKHRhcmdldC5sZWZ0ICsgdykgLyBncmlkKSAqIGdyaWQsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgY29uc3QgdGhyZXNob2xkID0gZ3JpZDtcclxuICAgICAgICAgIGNvbnN0IGRpc3QgPSB7IC8vIERpc3RhbmNlIGZyb20gc25hcHBpbmcgcG9pbnRzXHJcbiAgICAgICAgICAgIHRvcDogTWF0aC5hYnMoc25hcC50b3AgLSB0YXJnZXQudG9wKSxcclxuICAgICAgICAgICAgbGVmdDogTWF0aC5hYnMoc25hcC5sZWZ0IC0gdGFyZ2V0LmxlZnQpLFxyXG4gICAgICAgICAgICBib3R0b206IE1hdGguYWJzKHNuYXAuYm90dG9tIC0gdGFyZ2V0LnRvcCAtIGgpLFxyXG4gICAgICAgICAgICByaWdodDogTWF0aC5hYnMoc25hcC5yaWdodCAtIHRhcmdldC5sZWZ0IC0gdyksXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgY29uc3QgYXR0cnMgPSB7XHJcbiAgICAgICAgICAgIHNjYWxlWDogdGFyZ2V0LnNjYWxlWCxcclxuICAgICAgICAgICAgc2NhbGVZOiB0YXJnZXQuc2NhbGVZLFxyXG4gICAgICAgICAgICB0b3A6IHRhcmdldC50b3AsXHJcbiAgICAgICAgICAgIGxlZnQ6IHRhcmdldC5sZWZ0LFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHN3aXRjaCAodGFyZ2V0Ll9fY29ybmVyKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RsJzpcclxuICAgICAgICAgICAgICBpZiAoZGlzdC5sZWZ0IDwgZGlzdC50b3AgJiYgZGlzdC5sZWZ0IDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVggPSAodyAtIChzbmFwLmxlZnQgLSB0YXJnZXQubGVmdCkpIC8gdGFyZ2V0LndpZHRoO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVZID0gKGF0dHJzLnNjYWxlWCAvIHRhcmdldC5zY2FsZVgpICogdGFyZ2V0LnNjYWxlWTtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnRvcCA9IHRhcmdldC50b3AgKyAoaCAtIHRhcmdldC5oZWlnaHQgKiBhdHRycy5zY2FsZVkpO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMubGVmdCA9IHNuYXAubGVmdDtcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRpc3QudG9wIDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoaCAtIChzbmFwLnRvcCAtIHRhcmdldC50b3ApKSAvIHRhcmdldC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVggPSAoYXR0cnMuc2NhbGVZIC8gdGFyZ2V0LnNjYWxlWSkgKiB0YXJnZXQuc2NhbGVYO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMubGVmdCArPSAodyAtIHRhcmdldC53aWR0aCAqIGF0dHJzLnNjYWxlWCk7XHJcbiAgICAgICAgICAgICAgICBhdHRycy50b3AgPSBzbmFwLnRvcDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ210JzpcclxuICAgICAgICAgICAgICBpZiAoZGlzdC50b3AgPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWSA9IChoIC0gKHNuYXAudG9wIC0gdGFyZ2V0LnRvcCkpIC8gdGFyZ2V0LmhlaWdodDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnRvcCA9IHNuYXAudG9wO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAndHInOlxyXG4gICAgICAgICAgICAgIGlmIChkaXN0LnJpZ2h0IDwgZGlzdC50b3AgJiYgZGlzdC5yaWdodCA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVYID0gKHNuYXAucmlnaHQgLSB0YXJnZXQubGVmdCkgLyB0YXJnZXQud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoYXR0cnMuc2NhbGVYIC8gdGFyZ2V0LnNjYWxlWCkgKiB0YXJnZXQuc2NhbGVZO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMudG9wID0gdGFyZ2V0LnRvcCArIChoIC0gdGFyZ2V0LmhlaWdodCAqIGF0dHJzLnNjYWxlWSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChkaXN0LnRvcCA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVZID0gKGggLSAoc25hcC50b3AgLSB0YXJnZXQudG9wKSkgLyB0YXJnZXQuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVYID0gKGF0dHJzLnNjYWxlWSAvIHRhcmdldC5zY2FsZVkpICogdGFyZ2V0LnNjYWxlWDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnRvcCA9IHNuYXAudG9wO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbWwnOlxyXG4gICAgICAgICAgICAgIGlmIChkaXN0LmxlZnQgPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWCA9ICh3IC0gKHNuYXAubGVmdCAtIHRhcmdldC5sZWZ0KSkgLyB0YXJnZXQud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5sZWZ0ID0gc25hcC5sZWZ0O1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbXInOlxyXG4gICAgICAgICAgICAgIGlmIChkaXN0LnJpZ2h0IDwgdGhyZXNob2xkKSBhdHRycy5zY2FsZVggPSAoc25hcC5yaWdodCAtIHRhcmdldC5sZWZ0KSAvIHRhcmdldC53aWR0aDtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYmwnOlxyXG4gICAgICAgICAgICAgIGlmIChkaXN0LmxlZnQgPCBkaXN0LmJvdHRvbSAmJiBkaXN0LmxlZnQgPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWCA9ICh3IC0gKHNuYXAubGVmdCAtIHRhcmdldC5sZWZ0KSkgLyB0YXJnZXQud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoYXR0cnMuc2NhbGVYIC8gdGFyZ2V0LnNjYWxlWCkgKiB0YXJnZXQuc2NhbGVZO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMubGVmdCA9IHNuYXAubGVmdDtcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRpc3QuYm90dG9tIDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoc25hcC5ib3R0b20gLSB0YXJnZXQudG9wKSAvIHRhcmdldC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVggPSAoYXR0cnMuc2NhbGVZIC8gdGFyZ2V0LnNjYWxlWSkgKiB0YXJnZXQuc2NhbGVYO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMubGVmdCArPSAodyAtIHRhcmdldC53aWR0aCAqIGF0dHJzLnNjYWxlWCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtYic6XHJcbiAgICAgICAgICAgICAgaWYgKGRpc3QuYm90dG9tIDwgdGhyZXNob2xkKSBhdHRycy5zY2FsZVkgPSAoc25hcC5ib3R0b20gLSB0YXJnZXQudG9wKSAvIHRhcmdldC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JyJzpcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICBpZiAoZGlzdC5yaWdodCA8IGRpc3QuYm90dG9tICYmIGRpc3QucmlnaHQgPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWCA9IChzbmFwLnJpZ2h0IC0gdGFyZ2V0LmxlZnQpIC8gdGFyZ2V0LndpZHRoO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVZID0gKGF0dHJzLnNjYWxlWCAvIHRhcmdldC5zY2FsZVgpICogdGFyZ2V0LnNjYWxlWTtcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRpc3QuYm90dG9tIDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoc25hcC5ib3R0b20gLSB0YXJnZXQudG9wKSAvIHRhcmdldC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVggPSAoYXR0cnMuc2NhbGVZIC8gdGFyZ2V0LnNjYWxlWSkgKiB0YXJnZXQuc2NhbGVYO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRhcmdldC5zZXQoYXR0cnMpO1xyXG4gICAgICAgICAgdGFyZ2V0LnNldENvb3JkcygpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH07XHJcbiAgICAgIGlmICh0aGlzLmdyaWQgPiAwKSB7XHJcbiAgICAgICAgY2FudmFzLm9uKHRoaXMuaGFuZGxlcnMuZ3JpZCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=
