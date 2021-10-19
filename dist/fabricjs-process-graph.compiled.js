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
    key: "_onAnchorRightClick",
    value: function _onAnchorRightClick(options) {
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
    key: "_onAnchorLeftClick",
    value: function _onAnchorLeftClick(options) {
      var _this2 = this;

      var ap = options.target;
      var canvas = this.canvas; // Disable the multi selection when moving mouse

      this.canvas.selection = false;
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
        // Enable back the multi selection when moving mouse
        _this2.canvas.selection = true;
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
    controlLine2.on('mouseout', this.onLinkMouseOut.bind(this)); // End point (arrowHead)

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
    this.isValidHeadConnectionMask = new fabric.Circle(isValidMaskOpts);
    arrowHead.on('moving', function () {
      _this.updatePath('to', arrowHead.left, arrowHead.top, false);

      _this._checkExtremityCanBeConnected('to');
    });
    arrowHead.on('moved', function () {
      _this.updatePath('to', arrowHead.left, arrowHead.top, true);

      _this.isValidHeadConnectionMask.set('opacity', 0);

      _this._connectDisconnectExtremity('to');
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
    this.isValidTailConnectionMask = new fabric.Circle(isValidMaskOpts);
    arrowTail.on('moving', function () {
      _this.updatePath('from', arrowTail.left, arrowTail.top, false);

      _this._checkExtremityCanBeConnected('from');
    });
    arrowTail.on('moved', function () {
      _this.updatePath('from', arrowTail.left, arrowTail.top, true);

      _this.isValidTailConnectionMask.set('opacity', 0);

      _this._connectDisconnectExtremity('from');
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
          isValidTailConnectionMask = this.isValidTailConnectionMask,
          isValidHeadConnectionMask = this.isValidHeadConnectionMask;
      canvas.add(controlPoint);
      canvas.add(controlLine1);
      canvas.add(controlLine2);
      canvas.add(isValidTailConnectionMask);
      canvas.add(isValidHeadConnectionMask);
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
        newPath.on('moving', this.onLinkMoving.bind(this));
        newPath.on('moved', this.onLinkMoved.bind(this));
        var toBind = [this.arrowHead, this.arrowTail, this.controlPoint, this.controlLine1, this.controlLine2];
        var bossTransform = newPath.calcTransformMatrix();
        var invertedBossTransform = fabric.util.invertTransform(bossTransform);
        toBind.forEach(function (o) {
          var desiredTransform = fabric.util.multiplyTransformMatrices(invertedBossTransform, o.calcTransformMatrix()); // eslint-disable-next-line no-param-reassign

          o.relationship = desiredTransform;
        });
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
      }); // const promises = [];
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

      for (var a = 0; a < anchors.length; a += 1) {
        // if (lock !== undefined) anchors[a].lockOpacity = lock;
        anchors[a].set('opacity', opacity);
      }

      this.canvas.renderAll();
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
  }, {
    key: "onLinkMoving",
    value: function onLinkMoving() {
      var _this3 = this;

      // Move start, end, control points altogether with the Path
      var toUpdate = [this.arrowHead, this.arrowTail, this.controlPoint, this.controlLine1, this.controlLine2];
      toUpdate.forEach(function (o) {
        if (!o.relationship) {
          return;
        }

        var relationship = o.relationship;
        var newTransform = fabric.util.multiplyTransformMatrices(_this3.path.calcTransformMatrix(), relationship);
        var opt = fabric.util.qrDecompose(newTransform);
        o.set({
          flipX: false,
          flipY: false
        });
        o.setPositionByOrigin({
          x: opt.translateX,
          y: opt.translateY
        }, 'center', 'center');
        o.set(opt);
        o.setCoords();
      }); // Finally, check the start or end points can be connected.

      this._checkExtremityCanBeConnected('from');

      this._checkExtremityCanBeConnected('to');
    }
  }, {
    key: "onLinkMoved",
    value: function onLinkMoved() {
      // Reupdate the Path according to the new coordinates of all elements
      var pathCoords = {
        M: {
          x: this.arrowTail.left,
          y: this.arrowTail.top
        },
        Q: {
          x1: this.controlPoint.left,
          y1: this.controlPoint.top,
          x2: this.arrowHead.left,
          y2: this.arrowHead.top
        }
      };
      var pathStr = "M ".concat(pathCoords.M.x, " ").concat(pathCoords.M.y, " Q ").concat(pathCoords.Q.x1, ", ").concat(pathCoords.Q.y1, ", ").concat(pathCoords.Q.x2, ", ").concat(pathCoords.Q.y2);
      var caca = new fabric.Path(pathStr, {});
      this.updatePath('from', caca.path[0][1], caca.path[0][2], false);
      this.updatePath('to', caca.path[1][3], caca.path[1][4], false);
      this.updatePath('control', caca.path[1][1], caca.path[1][2], true); // Connect or Disconnect depending on extremities positions

      this.isValidTailConnectionMask.set('opacity', 0);
      this.isValidHeadConnectionMask.set('opacity', 0);

      this._connectDisconnectExtremity('from');

      this._connectDisconnectExtremity('to');
    }
    /**
     * Helper to display a valid circle mask on specific conditions.
     * If the extremity is touching an anchor of a LinkableShape from which it is not yet connected => show GREEN
     * If the extremity is touching an anchor of a LinkableShape from which it is already connected by the other extremity => show RED
     * @param direction
     * @private
     */

  }, {
    key: "_checkExtremityCanBeConnected",
    value: function _checkExtremityCanBeConnected(direction) {
      var canvas = this.canvas;
      var extremity;
      var mask;

      if (direction === 'from') {
        extremity = this.arrowTail;
        mask = this.isValidTailConnectionMask;
      } else if (direction === 'to') {
        extremity = this.arrowHead;
        mask = this.isValidHeadConnectionMask;
      }

      mask.left = extremity.left;
      mask.top = extremity.top;
      mask.setCoords();
      mask.set('opacity', 0); // Check if intersects with anchor

      var anchors = canvas.getObjects().filter(function (o) {
        return o.type === 'anchor';
      });
      extremity.set('stroke', '#000');

      for (var a = 0; a < anchors.length; a += 1) {
        if (extremity.intersectsWithObject(anchors[a])) {
          mask.set('opacity', 0.5);

          if (this.isValidConnection(direction, anchors[a].shapeId, anchors[a].cardinal)) {
            mask.set({
              stroke: '#57b857',
              fill: '#57b857'
            });
            extremity.set('stroke', '#5f5');
          } else {
            mask.set({
              stroke: '#ea4f37',
              fill: '#ea4f37'
            });
            extremity.set('stroke', '#ea4f37');
          }
        }
      }
    }
    /**
     * Helper to execute connect/disconnect depending on specific conditions.
     * If the extremity was connected AND it is NOT touching the anchor anymore => disconnect it.
     * If the extremity was disconnected AND it is touching the anchor => connect it.
     * @param direction
     * @private
     */

  }, {
    key: "_connectDisconnectExtremity",
    value: function _connectDisconnectExtremity(direction) {
      var canvas = this.canvas;
      var extremity;

      if (direction === 'from') {
        extremity = this.arrowTail;
      } else if (direction === 'to') {
        extremity = this.arrowHead;
      } // Check if intersects with anchor


      var anchors = canvas.getObjects().filter(function (o) {
        return o.type === 'anchor';
      });

      for (var a = 0; a < anchors.length; a += 1) {
        if (extremity.intersectsWithObject(anchors[a])) {
          this.connectLink(direction, anchors[a].shapeId, anchors[a].cardinal); // anchors[a].set('stroke', '#000');

          extremity.set('stroke', '#000');
        } else if (this[direction] && anchors[a] === this[direction].shape.anchors[this[direction].anchor]) {
          // If this link was connected to this anchor and it doesn't intersect anymore
          this.disconnectLink(direction);
        }
      }
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
      ap.on('mousedown', function (options) {
        switch (options.button) {
          case 3:
            _this2._onAnchorRightClick.call(_this2, options);

            break;

          case 2:
            _this2._onAnchorMiddleClick.call(_this2, options);

            break;

          case 1:
          default:
            _this2._onAnchorLeftClick.call(_this2, options);

            break;
        }
      });
      return ap;
    } // Should be implemented by Extending Classes

    /* eslint-disable class-methods-use-this */

  }, {
    key: "_onAnchorLeftClick",
    value: function _onAnchorLeftClick() {}
  }, {
    key: "_onAnchorMiddleClick",
    value: function _onAnchorMiddleClick() {}
  }, {
    key: "_onAnchorRightClick",
    value: function _onAnchorRightClick() {}
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
    canvas.set('preserveObjectStacking', true); // canvas.set('renderOnAddRemove', false);

    canvas.set('fireRightClick', true);
    canvas.set('fireMiddleClick', true);
    canvas.set('stopContextMenu', true);

    if (typeof options.grid === 'number') {
      this.setGrid({
        grid: options.grid
      });
    } // fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';


    fabric.Object.prototype.toggleOpacity = function toggleOpacity(opacity
    /* , timeout */
    ) {
      // this.animate('opacity', opacity, {
      //   duration: timeout !== undefined ? timeout : 300,
      //   onChange: this.canvas.renderAll.bind(this.canvas),
      // });
      this.set('opacity', opacity);
      this.canvas.renderAll();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsInNyYy9Db250YWluZXIuanMiLCJzcmMvTGluay5qcyIsInNyYy9MaW5rYWJsZVNoYXBlLmpzIiwic3JjL1Byb2Nlc3NHcmFwaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxNQUFNLENBQUMsRUFBUCxHQUFZO0FBQ1YsRUFBQSxZQUFZLEVBQVosd0JBRFU7QUFFVixFQUFBLFNBQVMsRUFBVCxxQkFGVTtBQUdWLEVBQUEsSUFBSSxFQUFKLGdCQUhVO0FBSVYsRUFBQSxhQUFhLEVBQWI7QUFKVSxDQUFaOzs7Ozs7Ozs7Ozs7QUNMQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsY0FBc0IsTUFBdEI7QUFBQSxJQUFRLE1BQVIsV0FBUSxNQUFSO0FBQUEsSUFBZ0IsQ0FBaEIsV0FBZ0IsQ0FBaEI7O0lBRXFCLFM7Ozs7O0FBQ25CO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0UscUJBQVksT0FBWixFQUFxQjtBQUFBOztBQUFBOztBQUNuQixRQUFNLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFYLENBQWdCO0FBQzNCLE1BQUEsSUFBSSxFQUFFLENBRHFCO0FBRTNCLE1BQUEsR0FBRyxFQUFFLENBRnNCO0FBRzNCLE1BQUEsT0FBTyxFQUFFLE1BSGtCO0FBSTNCLE1BQUEsT0FBTyxFQUFFLEtBSmtCO0FBSzNCLE1BQUEsV0FBVyxFQUFFLENBTGM7QUFNM0IsTUFBQSxNQUFNLEVBQUUsTUFObUI7QUFPM0IsTUFBQSxJQUFJLEVBQUUsTUFQcUI7QUFRM0IsTUFBQSxFQUFFLEVBQUUsRUFSdUI7QUFTM0IsTUFBQSxFQUFFLEVBQUUsRUFUdUI7QUFVM0IsTUFBQSxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQVIsR0FBZ0IsT0FBTyxDQUFDLEtB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QWxCLEVBQTZCO0FBQ2xDLGtCQUFBLEtBQUssQ0FBQyxNQUFOLEdBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTCxHQUFjLE1BQU0sQ0FBQyxHQUF0QixJQUE2QixNQUFNLENBQUMsTUFBbkQ7QUFDQSxrQkFBQSxLQUFLLENBQUMsTUFBTixHQUFnQixLQUFLLENBQUMsTUFBTixHQUFlLE1BQU0sQ0FBQyxNQUF2QixHQUFpQyxNQUFNLENBQUMsTUFBdkQ7QUFDRDs7QUFDRDtBQS9ESjs7QUFpRUEsWUFBQSxNQUFNLENBQUMsR0FBUCxDQUFXLEtBQVg7QUFDQSxZQUFBLE1BQU0sQ0FBQyxTQUFQO0FBQ0Q7QUE1R2tCLFNBQXJCOztBQThHQSxZQUFJLEtBQUksQ0FBQyxJQUFMLEdBQVksQ0FBaEIsRUFBbUI7QUFDakIsVUFBQSxNQUFNLENBQUMsRUFBUCxDQUFVLEtBQUksQ0FBQyxRQUFMLENBQWMsSUFBeEI7QUFDRDtBQUNGLE9BNUhEO0FBNkhEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IENvbnRhaW5lciBmcm9tICcuL3NyYy9Db250YWluZXIuanMnO1xyXG5pbXBvcnQgUHJvY2Vzc0dyYXBoIGZyb20gJy4vc3JjL1Byb2Nlc3NHcmFwaC5qcyc7XHJcbmltcG9ydCBMaW5rIGZyb20gJy4vc3JjL0xpbmsuanMnO1xyXG5pbXBvcnQgTGlua2FibGVTaGFwZSBmcm9tICcuL3NyYy9MaW5rYWJsZVNoYXBlLmpzJztcclxuXHJcbndpbmRvdy5wZyA9IHtcclxuICBQcm9jZXNzR3JhcGgsXHJcbiAgQ29udGFpbmVyLFxyXG4gIExpbmssXHJcbiAgTGlua2FibGVTaGFwZSxcclxufTtcclxuIiwiaW1wb3J0IExpbmthYmxlU2hhcGUgZnJvbSAnLi9MaW5rYWJsZVNoYXBlLmpzJztcclxuaW1wb3J0IExpbmsgZnJvbSAnLi9MaW5rLmpzJztcclxuXHJcbmNvbnN0IHsgZmFicmljLCBfIH0gPSB3aW5kb3c7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250YWluZXIgZXh0ZW5kcyBMaW5rYWJsZVNoYXBlIHtcclxuICAvKipcclxuICAgKiBBIENvbnRhaW5lciBpcyBhIFJlY3Qgd2l0aCBhbiBJVGV4dC4gQ2FuIGJlIGV4cGFuZGVkIHRvIHJldmVhbCBjb250YWluZWQgU2hhcGVzLlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBvcHRpb25zXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0ZhYnJpYy5DYW52YXN9ICAgb3B0aW9ucy5jYW52YXMgLSBGYWJyaWMgY2FudmFzXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG9wdGlvbnMuaWQgLSBVbmlxdWUgaWRlbnRpZmllclxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBvcHRpb25zLndpZHRoXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIG9wdGlvbnMuaGVpZ2h0XHJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG9wdGlvbnMubGFiZWxcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICBjb25zdCByZWN0ID0gbmV3IGZhYnJpYy5SZWN0KHtcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBvcmlnaW5YOiAnbGVmdCcsXHJcbiAgICAgIG9yaWdpblk6ICd0b3AnLFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgc3Ryb2tlOiAnIzAwMCcsXHJcbiAgICAgIGZpbGw6ICcjZmZmJyxcclxuICAgICAgcng6IDEwLFxyXG4gICAgICByeTogMTAsXHJcbiAgICAgIHdpZHRoOiBvcHRpb25zLndpZHRoID8gb3B0aW9ucy53aWR0aCA6IDIwMCxcclxuICAgICAgaGVpZ2h0OiBvcHRpb25zLmhlaWdodCA/IG9wdGlvbnMuaGVpZ2h0IDogMTAwLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCB0ZXh0ID0gbmV3IGZhYnJpYy5UZXh0Ym94KG9wdGlvbnMubGFiZWwsIHtcclxuICAgICAgbGVmdDogcmVjdC53aWR0aCAvIDIsXHJcbiAgICAgIHRvcDogcmVjdC5oZWlnaHQgLyAyLFxyXG4gICAgICBzdHlsZXM6IHsgfSxcclxuICAgICAgZm9udFNpemU6IDE0LFxyXG4gICAgICBmb250RmFtaWx5OiAnSGVsdmV0aWNhJyxcclxuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICB3aWR0aDogMTkwLFxyXG4gICAgICBoZWlnaHQ6IDkwLFxyXG4gICAgICBzcGxpdEJ5R3JhcGhlbWU6IHRydWUsXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGdyb3VwID0gbmV3IGZhYnJpYy5Hcm91cChbcmVjdCwgdGV4dF0sIHtcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBvcmlnaW5YOiAnbGVmdCcsXHJcbiAgICAgIG9yaWdpblk6ICd0b3AnLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBuZXdPcHRpb25zID0gXy5jbG9uZURlZXAoXy5vbWl0KG9wdGlvbnMsIFsnY2FudmFzJywgJ3NoYXBlJ10pKTtcclxuICAgIG5ld09wdGlvbnMuY2FudmFzID0gb3B0aW9ucy5jYW52YXM7XHJcbiAgICBuZXdPcHRpb25zLnNoYXBlID0gZ3JvdXA7XHJcbiAgICBzdXBlcihuZXdPcHRpb25zKTtcclxuXHJcbiAgICBncm91cC5vbih7XHJcbiAgICAgIHNjYWxpbmc6ICgpID0+IHtcclxuICAgICAgICAvLyBXaGVuIHNjYWxpbmcsIGtlZXAgdGV4dCBzYW1lIHNpemUgYXMgaW5pdGlhbFxyXG4gICAgICAgIGlmIChncm91cC5zY2FsZVggPCAxKSB7XHJcbiAgICAgICAgICB0ZXh0LnNjYWxlWCA9IDEgKyAoMSAtIGdyb3VwLnNjYWxlWCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRleHQuc2NhbGVYID0gMSAvIChncm91cC5zY2FsZVgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZ3JvdXAuc2NhbGVZIDwgMSkge1xyXG4gICAgICAgICAgdGV4dC5zY2FsZVkgPSAxICsgKDEgLSBncm91cC5zY2FsZVkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0ZXh0LnNjYWxlWSA9IDEgLyAoZ3JvdXAuc2NhbGVZKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jYW52YXMucmVuZGVyQWxsKCk7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIF9vbkFuY2hvclJpZ2h0Q2xpY2sob3B0aW9ucykge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBpZCwgbGVmdCwgdG9wLCBhbmdsZSwgY2FudmFzLCB3aWR0aCwgaGVpZ2h0LFxyXG4gICAgfSA9IHRoaXMuc2hhcGU7XHJcbiAgICBjb25zdCBhcCA9IG9wdGlvbnMudGFyZ2V0O1xyXG4gICAgY29uc3QgeyBjYXJkaW5hbCB9ID0gYXA7XHJcbiAgICBjb25zdCBzcGFjaW5nID0gNTA7XHJcblxyXG4gICAgY29uc3QgbmV4dENvbnRhaW5lciA9IG5ldyBDb250YWluZXIoe1xyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIGlkOiBgJHtpZH1fbmV4dF8ke2NhcmRpbmFsfV8ke01hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMSl9YCxcclxuICAgICAgbGVmdCxcclxuICAgICAgdG9wLFxyXG4gICAgICBhbmdsZSxcclxuICAgICAgbGFiZWw6IGAke2lkfV9uZXh0XyR7Y2FyZGluYWx9YCxcclxuICAgIH0pO1xyXG4gICAgbmV4dENvbnRhaW5lci5pbmplY3QoKTtcclxuXHJcbiAgICBjb25zdCBuZXdPcHRpb25zID0ge307XHJcbiAgICBsZXQgdGFyZ2V0Q2FyZGluYWw7XHJcbiAgICBzd2l0Y2ggKGNhcmRpbmFsKSB7XHJcbiAgICAgIGNhc2UgJ2Vhc3QnOiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnd2VzdCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gdG9wO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IGxlZnQgKyB3aWR0aCArIHNwYWNpbmc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnd2VzdCc6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICdlYXN0JztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSB0b3A7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gbGVmdCAtIHdpZHRoIC0gc3BhY2luZztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aCc6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICdzb3V0aCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gdG9wIC0gaGVpZ2h0IC0gc3BhY2luZztcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSBsZWZ0O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRoJzoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ25vcnRoJztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSB0b3AgKyBoZWlnaHQgKyBzcGFjaW5nO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IGxlZnQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnbm9ydGhlYXN0Jzoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ3NvdXRod2VzdCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gdG9wIC0gaGVpZ2h0IC0gc3BhY2luZztcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSBsZWZ0ICsgd2lkdGggKyBzcGFjaW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRod2VzdCc6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICdzb3V0aGVhc3QnO1xyXG4gICAgICAgIG5ld09wdGlvbnMueCA9IHRvcCAtIGhlaWdodCAtIHNwYWNpbmc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gbGVmdCAtIHdpZHRoIC0gc3BhY2luZztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aGVhc3QnOiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnbm9ydGh3ZXN0JztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSB0b3AgKyBoZWlnaHQgKyBzcGFjaW5nO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IGxlZnQgKyB3aWR0aCArIHNwYWNpbmc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnc291dGh3ZXN0JzpcclxuICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ25vcnRoZWFzdCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gdG9wICsgaGVpZ2h0ICsgc3BhY2luZztcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSBsZWZ0IC0gd2lkdGggLSBzcGFjaW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBuZXh0Q29udGFpbmVyLm1vdmUobmV3T3B0aW9ucyk7XHJcbiAgICAvLyBuZXh0Q29udGFpbmVyLnJvdGF0ZShhbmdsZSk7XHJcblxyXG4gICAgY29uc3QgbmV3TGluayA9IG5ldyBMaW5rKHtcclxuICAgICAgY2FudmFzLFxyXG4gICAgICBzdGFydDoge1xyXG4gICAgICAgIHg6IGFwLmxlZnQsXHJcbiAgICAgICAgeTogYXAudG9wLFxyXG4gICAgICB9LFxyXG4gICAgICBlbmQ6IHtcclxuICAgICAgICB4OiBuZXh0Q29udGFpbmVyLmFuY2hvcnNbdGFyZ2V0Q2FyZGluYWxdLmxlZnQsXHJcbiAgICAgICAgeTogbmV4dENvbnRhaW5lci5hbmNob3JzW3RhcmdldENhcmRpbmFsXS50b3AsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICAgIG5ld0xpbmsuaW5qZWN0KGNhbnZhcyk7XHJcbiAgICBuZXdMaW5rLmNvbm5lY3RMaW5rKCdmcm9tJywgYXAuc2hhcGVJZCwgYXAuY2FyZGluYWwpO1xyXG4gICAgbmV3TGluay5jb25uZWN0TGluaygndG8nLCBuZXh0Q29udGFpbmVyLmFuY2hvcnNbdGFyZ2V0Q2FyZGluYWxdLnNoYXBlSWQsIG5leHRDb250YWluZXIuYW5jaG9yc1t0YXJnZXRDYXJkaW5hbF0uY2FyZGluYWwpO1xyXG4gIH1cclxuXHJcbiAgX29uQW5jaG9yTGVmdENsaWNrKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGFwID0gb3B0aW9ucy50YXJnZXQ7XHJcbiAgICBjb25zdCB7IGNhbnZhcyB9ID0gdGhpcztcclxuXHJcbiAgICAvLyBEaXNhYmxlIHRoZSBtdWx0aSBzZWxlY3Rpb24gd2hlbiBtb3ZpbmcgbW91c2VcclxuICAgIHRoaXMuY2FudmFzLnNlbGVjdGlvbiA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0IG5ld0xpbmsgPSBuZXcgTGluayh7XHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgc3RhcnQ6IHtcclxuICAgICAgICB4OiBhcC5sZWZ0LFxyXG4gICAgICAgIHk6IGFwLnRvcCxcclxuICAgICAgfSxcclxuICAgICAgZW5kOiB7XHJcbiAgICAgICAgeDogYXAubGVmdCxcclxuICAgICAgICB5OiBhcC50b3AsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICAgIG5ld0xpbmsuaW5qZWN0KGNhbnZhcyk7XHJcbiAgICBuZXdMaW5rLmNvbm5lY3RMaW5rKCdmcm9tJywgYXAuc2hhcGVJZCwgYXAuY2FyZGluYWwpO1xyXG4gICAgbmV3TGluay5hcnJvd0hlYWQuZmlyZSgnbW91c2Vkb3duJyk7XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZU1vdmUgPSAoZXZlbnQpID0+IHtcclxuICAgICAgbmV3TGluay5hcnJvd0hlYWQubGVmdCA9IGV2ZW50LnBvaW50ZXIueDtcclxuICAgICAgbmV3TGluay5hcnJvd0hlYWQudG9wID0gZXZlbnQucG9pbnRlci55O1xyXG4gICAgICBuZXdMaW5rLmFycm93SGVhZC5maXJlKCdtb3ZpbmcnKTtcclxuICAgIH07XHJcbiAgICBjYW52YXMub24oJ21vdXNlOm1vdmUnLCBvbk1vdXNlTW92ZSk7XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZUNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAvLyBFbmFibGUgYmFjayB0aGUgbXVsdGkgc2VsZWN0aW9uIHdoZW4gbW92aW5nIG1vdXNlXHJcbiAgICAgIHRoaXMuY2FudmFzLnNlbGVjdGlvbiA9IHRydWU7XHJcblxyXG4gICAgICBuZXdMaW5rLmFycm93SGVhZC5maXJlKCdtb3ZlZCcpO1xyXG4gICAgICBuZXdMaW5rLmFycm93SGVhZC5maXJlKCdtb3VzZXVwJyk7XHJcbiAgICAgIGNhbnZhcy5vZmYoJ21vdXNlOm1vdmUnLCBvbk1vdXNlTW92ZSk7XHJcbiAgICAgIGNhbnZhcy5vZmYoJ21vdXNlOnVwJywgb25Nb3VzZUNsaWNrKTtcclxuICAgICAgbmV3TGluay5yZXNldEN1cnZhdHVyZSgpO1xyXG4gICAgfTtcclxuICAgIGNhbnZhcy5vbignbW91c2U6dXAnLCBvbk1vdXNlQ2xpY2spO1xyXG4gIH1cclxufVxyXG4iLCJjb25zdCB7IGZhYnJpYyB9ID0gd2luZG93O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGluayB7XHJcbiAgLyoqXHJcbiAgICogQSBMaW5rIGlzIGEgRmFicmljLlBhdGggb2JqZWN0IHdob3NlIFN0YXJ0IGFuZCBFbmQgcG9pbnRzIGNhbiBiZSBjb25uZWN0ZWQgdG8gYW55IGFuY2hvciBvZiB0d28gTGlua2FibGVTaGFwZS5cclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgb3B0aW9uc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtGYWJyaWMuQ2FudmFzfSAgIG9wdGlvbnMuY2FudmFzIC0gRmFicmljIGNhbnZhc1xyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICBvcHRpb25zLmlkIC0gVW5pcXVlIGlkZW50aWZpZXJcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBbb3B0aW9ucy5zdGFydF0gLSBDb29yZGluYXRlcyBvZiB0aGUgc3RhcnQgcG9pbnRcclxuICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgW29wdGlvbnMuc3RhcnQueF0gLSBYIGF4aXMgY29vcmRpbmF0ZSBvZiB0aGUgc3RhcnQgcG9pbnRcclxuICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgW29wdGlvbnMuc3RhcnQueV0gLSBZIGF4aXMgY29vcmRpbmF0ZSBvZiB0aGUgc3RhcnQgcG9pbnRcclxuICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgW29wdGlvbnMuZW5kLnhdIC0gWCBheGlzIGNvb3JkaW5hdGUgb2YgdGhlIGVuZCBwb2ludFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBbb3B0aW9ucy5lbmQueV0gLSBZIGF4aXMgY29vcmRpbmF0ZSBvZiB0aGUgZW5kIHBvaW50XHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLmN1c3RvbV0gLSBPcHRpb25zIHRvIGN1c3RvbWl6ZSB0aGUgZGlmZmVyZW50IHNoYXBlcyBvZiB0aGUgTGlua1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLmN1c3RvbS5wYXRoXSAtIGJlemllciBxdWFkcmF0aWMgY3VydmVcclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuY3VzdG9tLmNvbnRyb2xQb2ludF0gLSBiZXppZXIgcXVhZHJhdGljIGN1cnZlIGNvbnRyb2wgcG9pbnRcclxuICAgKiBAcGFyYW0ge0xpbmV9ICAgICAgICAgICAgW29wdGlvbnMuY3VzdG9tLmNvbnRyb2xMaW5lXSAtIHZpc3VhbCBsaW5lcyBmcm9tIHRoZSBjb250cm9sIHBvaW50IHRvIHRoZSBzdGFydCZlbmQgcG9pbnRzXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLmN1c3RvbS5zdGFydFBvaW50XSAtIGFrYSBhcnJvd1RhaWxcclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuY3VzdG9tLmVuZFBvaW50XSAtIGFrYSBhcnJvd0hlYWRcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGlkLFxyXG4gICAgICBjYW52YXMsXHJcbiAgICB9ID0gb3B0aW9ucztcclxuICAgIGNvbnN0IHgxID0gb3B0aW9ucyAmJiBvcHRpb25zLnN0YXJ0ICYmIG9wdGlvbnMuc3RhcnQueCA/IG9wdGlvbnMuc3RhcnQueCA6IDA7XHJcbiAgICBjb25zdCB5MSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5zdGFydCAmJiBvcHRpb25zLnN0YXJ0LnkgPyBvcHRpb25zLnN0YXJ0LnkgOiAwO1xyXG4gICAgY29uc3QgeDIgPSBvcHRpb25zICYmIG9wdGlvbnMuZW5kICYmIG9wdGlvbnMuZW5kLnggPyBvcHRpb25zLmVuZC54IDogMDtcclxuICAgIGNvbnN0IHkyID0gb3B0aW9ucyAmJiBvcHRpb25zLmVuZCAmJiBvcHRpb25zLmVuZC55ID8gb3B0aW9ucy5lbmQueSA6IDA7XHJcbiAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuXHJcbiAgICAvLyBQYXRoLCBhIGJlemllciBxdWFkcmF0aWMgY3VydmVcclxuICAgIGNvbnN0IHBhdGhDb29yZHMgPSB7XHJcbiAgICAgIE06IHtcclxuICAgICAgICB4OiB4MSwgLy8gZnJvbSB4XHJcbiAgICAgICAgeTogeTEsIC8vIGZyb20geVxyXG4gICAgICB9LFxyXG4gICAgICBROiB7XHJcbiAgICAgICAgeDE6ICh4MSArIHgyKSAvIDIsIC8vIGNvbnRyb2wgeFxyXG4gICAgICAgIHkxOiAoeTEgKyB5MikgLyAyLCAvLyBjb250cm9sIHlcclxuICAgICAgICB4MiwgLy8gdG8geFxyXG4gICAgICAgIHkyLCAvLyB0byB5XHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgY29uc3QgcGF0aE9wdHMgPSB0aGlzLmRlZmF1bHRQYXRoT3B0aW9ucyA9IHtcclxuICAgICAgZmlsbDogJycsXHJcbiAgICAgIHN0cm9rZTogKG9wdGlvbnMuY3VzdG9tICYmIG9wdGlvbnMuY3VzdG9tLnBhdGggJiYgb3B0aW9ucy5jdXN0b20ucGF0aC5zdHJva2VXaWR0aCkgPyBvcHRpb25zLmN1c3RvbS5wYXRoLnN0cm9rZSA6ICcjMDAwJyxcclxuICAgICAgc3Ryb2tlV2lkdGg6IChvcHRpb25zLmN1c3RvbSAmJiBvcHRpb25zLmN1c3RvbS5wYXRoICYmIG9wdGlvbnMuY3VzdG9tLnBhdGguc3Ryb2tlV2lkdGgpID8gb3B0aW9ucy5jdXN0b20ucGF0aC5zdHJva2VXaWR0aCA6IDIsXHJcbiAgICAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgICBoYXNCb3JkZXJzOiB0cnVlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAgIHBlclBpeGVsVGFyZ2V0RmluZDogdHJ1ZSxcclxuICAgIH07XHJcbiAgICBjb25zdCBwYXRoU3RyID0gYE0gJHtwYXRoQ29vcmRzLk0ueH0gJHtwYXRoQ29vcmRzLk0ueX0gUSAke3BhdGhDb29yZHMuUS54MX0sICR7cGF0aENvb3Jkcy5RLnkxfSwgJHtwYXRoQ29vcmRzLlEueDJ9LCAke3BhdGhDb29yZHMuUS55Mn1gO1xyXG4gICAgY29uc3QgcGF0aCA9IG5ldyBmYWJyaWMuUGF0aChwYXRoU3RyLCBwYXRoT3B0cyk7XHJcbiAgICB0aGlzLnBhdGggPSBwYXRoO1xyXG5cclxuICAgIC8vIENvbnRyb2wgcG9pbnQgYW5kIGxpbmVzIGZvciB0aGUgcXVhZHJhdGljIGN1cnZlXHJcbiAgICBjb25zdCBjb250cm9sUG9pbnQgPSB0aGlzLmNvbnRyb2xQb2ludCA9IG5ldyBmYWJyaWMuQ2lyY2xlKHtcclxuICAgICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAgIGxlZnQ6IHBhdGhDb29yZHMuUS54MSxcclxuICAgICAgdG9wOiBwYXRoQ29vcmRzLlEueTEsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICByYWRpdXM6IDYsXHJcbiAgICAgIGZpbGw6ICcjNzhiZWZhJyxcclxuICAgICAgc3Ryb2tlOiAnIzc4YmVmYScsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgICAgb3BhY2l0eTogMCxcclxuICAgIH0pO1xyXG4gICAgY29udHJvbFBvaW50Lm9uKCdtb3VzZW92ZXInLCB0aGlzLm9uTGlua01vdXNlT3Zlci5iaW5kKHRoaXMpKTtcclxuICAgIGNvbnRyb2xQb2ludC5vbignbW91c2VvdXQnLCB0aGlzLm9uTGlua01vdXNlT3V0LmJpbmQodGhpcykpO1xyXG4gICAgY29udHJvbFBvaW50Lm9uKCdtb3ZpbmcnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aCgnY29udHJvbCcsIHRoaXMuY29udHJvbFBvaW50LmxlZnQsIHRoaXMuY29udHJvbFBvaW50LnRvcCwgZmFsc2UpO1xyXG4gICAgfSk7XHJcbiAgICBjb250cm9sUG9pbnQub24oJ21vdmVkJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhdGgoJ2NvbnRyb2wnLCB0aGlzLmNvbnRyb2xQb2ludC5sZWZ0LCB0aGlzLmNvbnRyb2xQb2ludC50b3AsIHRydWUpO1xyXG4gICAgfSk7XHJcbiAgICBjb250cm9sUG9pbnQub24oJ21vdXNlZG93bicsICgpID0+IHtcclxuICAgICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcclxuICAgIH0pO1xyXG4gICAgY29uc3QgY29udHJvbExpbmVPcHRzID0ge1xyXG4gICAgICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgICAgc3Ryb2tlRGFzaEFycmF5OiBbNSwgNV0sXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICBzdHJva2U6ICcjNzhiZWZhJyxcclxuICAgICAgc2VsZWN0YWJsZTogZmFsc2UsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAgIGV2ZW50ZWQ6IGZhbHNlLFxyXG4gICAgICBvcGFjaXR5OiAwLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGNvbnRyb2xMaW5lMSA9IHRoaXMuY29udHJvbExpbmUxID0gbmV3IGZhYnJpYy5MaW5lKFtjb250cm9sUG9pbnQubGVmdCwgY29udHJvbFBvaW50LnRvcCwgeDEsIHkxXSwgY29udHJvbExpbmVPcHRzKTtcclxuICAgIGNvbnRyb2xMaW5lMS5vbignbW91c2VvdmVyJywgdGhpcy5vbkxpbmtNb3VzZU92ZXIuYmluZCh0aGlzKSk7XHJcbiAgICBjb250cm9sTGluZTEub24oJ21vdXNlb3V0JywgdGhpcy5vbkxpbmtNb3VzZU91dC5iaW5kKHRoaXMpKTtcclxuICAgIGNvbnN0IGNvbnRyb2xMaW5lMiA9IHRoaXMuY29udHJvbExpbmUyID0gbmV3IGZhYnJpYy5MaW5lKFtjb250cm9sUG9pbnQubGVmdCwgY29udHJvbFBvaW50LnRvcCwgeDIsIHkyXSwgY29udHJvbExpbmVPcHRzKTtcclxuICAgIGNvbnRyb2xMaW5lMi5vbignbW91c2VvdmVyJywgdGhpcy5vbkxpbmtNb3VzZU92ZXIuYmluZCh0aGlzKSk7XHJcbiAgICBjb250cm9sTGluZTIub24oJ21vdXNlb3V0JywgdGhpcy5vbkxpbmtNb3VzZU91dC5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAvLyBFbmQgcG9pbnQgKGFycm93SGVhZClcclxuICAgIGNvbnN0IGlzVmFsaWRNYXNrT3B0cyA9IHtcclxuICAgICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAgIGxlZnQ6IHBhdGhDb29yZHMuUS54MixcclxuICAgICAgdG9wOiBwYXRoQ29vcmRzLlEueTIsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICByYWRpdXM6IDE2LFxyXG4gICAgICBmaWxsOiAnIzU3Yjg1NycsIC8vIGVhNGYzN1xyXG4gICAgICBzdHJva2U6ICcjNTdiODU3JyxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICBoYXNCb3JkZXJzOiBmYWxzZSxcclxuICAgICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgICBzZWxlY3RhYmxlOiBmYWxzZSxcclxuICAgICAgb3BhY2l0eTogMCxcclxuICAgIH07XHJcbiAgICBjb25zdCBhcnJvd0hlYWRPcHRzID0ge1xyXG4gICAgICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgICAgd2lkdGg6IDEwLFxyXG4gICAgICBoZWlnaHQ6IDEwLFxyXG4gICAgICBsZWZ0OiBwYXRoQ29vcmRzLlEueDIsXHJcbiAgICAgIHRvcDogcGF0aENvb3Jkcy5RLnkyLFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgZmlsbDogJyMwMDAnLFxyXG4gICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICBzdHJva2U6ICcjMDAwJyxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgICBoYXNCb3JkZXJzOiBmYWxzZSxcclxuICAgICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGFycm93SGVhZCA9IHRoaXMuYXJyb3dIZWFkID0gbmV3IGZhYnJpYy5UcmlhbmdsZShhcnJvd0hlYWRPcHRzKTtcclxuICAgIHRoaXMuaXNWYWxpZEhlYWRDb25uZWN0aW9uTWFzayA9IG5ldyBmYWJyaWMuQ2lyY2xlKGlzVmFsaWRNYXNrT3B0cyk7XHJcbiAgICBhcnJvd0hlYWQub24oJ21vdmluZycsICgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVQYXRoKCd0bycsIGFycm93SGVhZC5sZWZ0LCBhcnJvd0hlYWQudG9wLCBmYWxzZSk7XHJcbiAgICAgIHRoaXMuX2NoZWNrRXh0cmVtaXR5Q2FuQmVDb25uZWN0ZWQoJ3RvJyk7XHJcbiAgICB9KTtcclxuICAgIGFycm93SGVhZC5vbignbW92ZWQnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aCgndG8nLCBhcnJvd0hlYWQubGVmdCwgYXJyb3dIZWFkLnRvcCwgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuaXNWYWxpZEhlYWRDb25uZWN0aW9uTWFzay5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgICAgdGhpcy5fY29ubmVjdERpc2Nvbm5lY3RFeHRyZW1pdHkoJ3RvJyk7XHJcbiAgICB9KTtcclxuICAgIGFycm93SGVhZC5vbignbW91c2Vkb3duJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLmJyaW5nVG9Gcm9udCgpO1xyXG4gICAgICB0aGlzLnRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KDEpO1xyXG5cclxuICAgICAgYXJyb3dIZWFkLm9uKCdtb3VzZXVwJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudG9nZ2xlQWxsQW5jaG9yc09wYWNpdHkoMCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU3RhcnQgcG9pbnQgKGFycm93VGFpbClcclxuICAgIGNvbnN0IGFycm93VGFpbE9wdHMgPSB7XHJcbiAgICAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgICB3aWR0aDogMTAsXHJcbiAgICAgIGhlaWdodDogMTAsXHJcbiAgICAgIGxlZnQ6IHBhdGhDb29yZHMuTS54LFxyXG4gICAgICB0b3A6IHBhdGhDb29yZHMuTS55LFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgZmlsbDogJyNmZmYnLFxyXG4gICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICBzdHJva2U6ICcjMDAwJyxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgICBoYXNCb3JkZXJzOiBmYWxzZSxcclxuICAgICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGFycm93VGFpbCA9IHRoaXMuYXJyb3dUYWlsID0gbmV3IGZhYnJpYy5SZWN0KGFycm93VGFpbE9wdHMpO1xyXG4gICAgdGhpcy5pc1ZhbGlkVGFpbENvbm5lY3Rpb25NYXNrID0gbmV3IGZhYnJpYy5DaXJjbGUoaXNWYWxpZE1hc2tPcHRzKTtcclxuICAgIGFycm93VGFpbC5vbignbW92aW5nJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhdGgoJ2Zyb20nLCBhcnJvd1RhaWwubGVmdCwgYXJyb3dUYWlsLnRvcCwgZmFsc2UpO1xyXG4gICAgICB0aGlzLl9jaGVja0V4dHJlbWl0eUNhbkJlQ29ubmVjdGVkKCdmcm9tJyk7XHJcbiAgICB9KTtcclxuICAgIGFycm93VGFpbC5vbignbW92ZWQnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aCgnZnJvbScsIGFycm93VGFpbC5sZWZ0LCBhcnJvd1RhaWwudG9wLCB0cnVlKTtcclxuICAgICAgdGhpcy5pc1ZhbGlkVGFpbENvbm5lY3Rpb25NYXNrLnNldCgnb3BhY2l0eScsIDApO1xyXG4gICAgICB0aGlzLl9jb25uZWN0RGlzY29ubmVjdEV4dHJlbWl0eSgnZnJvbScpO1xyXG4gICAgfSk7XHJcbiAgICBhcnJvd1RhaWwub24oJ21vdXNlZG93bicsICgpID0+IHtcclxuICAgICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcclxuICAgICAgdGhpcy50b2dnbGVBbGxBbmNob3JzT3BhY2l0eSgxKTtcclxuXHJcbiAgICAgIGFycm93VGFpbC5vbignbW91c2V1cCcsICgpID0+IHtcclxuICAgICAgICB0aGlzLnRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KDApO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5qZWN0KCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHBhdGgsXHJcbiAgICAgIGNvbnRyb2xQb2ludCxcclxuICAgICAgY29udHJvbExpbmUxLFxyXG4gICAgICBjb250cm9sTGluZTIsXHJcbiAgICAgIGFycm93SGVhZCxcclxuICAgICAgYXJyb3dUYWlsLFxyXG4gICAgICBpc1ZhbGlkVGFpbENvbm5lY3Rpb25NYXNrLFxyXG4gICAgICBpc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrLFxyXG4gICAgfSA9IHRoaXM7XHJcbiAgICBjYW52YXMuYWRkKGNvbnRyb2xQb2ludCk7XHJcbiAgICBjYW52YXMuYWRkKGNvbnRyb2xMaW5lMSk7XHJcbiAgICBjYW52YXMuYWRkKGNvbnRyb2xMaW5lMik7XHJcbiAgICBjYW52YXMuYWRkKGlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2spO1xyXG4gICAgY2FudmFzLmFkZChpc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrKTtcclxuICAgIGNhbnZhcy5hZGQoYXJyb3dIZWFkKTtcclxuICAgIGNhbnZhcy5hZGQoYXJyb3dUYWlsKTtcclxuXHJcbiAgICBjYW52YXMuYWRkKHBhdGgpO1xyXG4gICAgdGhpcy51cGRhdGVQYXRoKCdmcm9tJywgcGF0aC5wYXRoWzBdWzFdLCBwYXRoLnBhdGhbMF1bMl0sIHRydWUpO1xyXG4gICAgdGhpcy51cGRhdGVQYXRoKCd0bycsIHBhdGgucGF0aFsxXVszXSwgcGF0aC5wYXRoWzFdWzRdLCB0cnVlKTtcclxuICAgIHRoaXMudXBkYXRlUGF0aCgnY29udHJvbCcsIHBhdGgucGF0aFsxXVsxXSwgcGF0aC5wYXRoWzFdWzJdLCB0cnVlKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGNvbm5lY3RMaW5rKGxpbmtQb2ludCwgc2hhcGVJZCwgY2FyZGluYWwpIHtcclxuICAgIC8vIENoZWNrIG5vdCBhbHJlYWR5IGNvbm5lY3RlZFxyXG4gICAgaWYgKCF0aGlzLmlzVmFsaWRDb25uZWN0aW9uKGxpbmtQb2ludCwgc2hhcGVJZCwgY2FyZGluYWwpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHNoYXBlID0gdGhpcy5jYW52YXMuZ2V0T2JqZWN0cygpXHJcbiAgICAgIC5maW5kKChvKSA9PiBvLmlkID09PSBzaGFwZUlkKTtcclxuXHJcbiAgICAvLyBEaXNjb25uZWN0IGV4aXN0aW5nIG9iamVjdFxyXG4gICAgdGhpcy5kaXNjb25uZWN0TGluayhsaW5rUG9pbnQpO1xyXG5cclxuICAgIC8vIENvbm5lY3RcclxuICAgIHRoaXNbbGlua1BvaW50XSA9IHtcclxuICAgICAgc2hhcGUsXHJcbiAgICAgIGFuY2hvcjogY2FyZGluYWwsXHJcbiAgICAgIGhhbmRsZXJzOiB7XHJcbiAgICAgICAgb25BbmNob3JQb3NpdGlvbk1vZGlmeWluZzogKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVQYXRoKGxpbmtQb2ludCwgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ubGVmdCwgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0udG9wLCBmYWxzZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkFuY2hvclBvc2l0aW9uTW9kaWZpZWQ6ICgpID0+IHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlUGF0aChsaW5rUG9pbnQsIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLmxlZnQsIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLnRvcCwgdHJ1ZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgICBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5vcGFjaXR5ID0gMDtcclxuICAgIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLm9uKCdwZzpwb3NpdGlvbjptb2RpZnlpbmcnLCB0aGlzW2xpbmtQb2ludF0uaGFuZGxlcnMub25BbmNob3JQb3NpdGlvbk1vZGlmeWluZyk7XHJcbiAgICBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5vbigncGc6cG9zaXRpb246bW9kaWZpZWQnLCB0aGlzW2xpbmtQb2ludF0uaGFuZGxlcnMub25BbmNob3JQb3NpdGlvbk1vZGlmaWVkKTtcclxuXHJcbiAgICAvLyBVcGRhdGUgTGlua1xyXG4gICAgdGhpcy51cGRhdGVQYXRoKGxpbmtQb2ludCwgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ubGVmdCwgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0udG9wLCB0cnVlLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBkaXNjb25uZWN0TGluayhsaW5rUG9pbnQpIHtcclxuICAgIGlmICh0aGlzW2xpbmtQb2ludF0pIHtcclxuICAgICAgdGhpc1tsaW5rUG9pbnRdLnNoYXBlLmFuY2hvcnNbdGhpc1tsaW5rUG9pbnRdLmFuY2hvcl0ub2ZmKCdwZzpwb3NpdGlvbjptb2RpZnlpbmcnLCB0aGlzW2xpbmtQb2ludF0uaGFuZGxlcnMub25BbmNob3JQb3NpdGlvbk1vZGlmeWluZyk7XHJcbiAgICAgIHRoaXNbbGlua1BvaW50XS5zaGFwZS5hbmNob3JzW3RoaXNbbGlua1BvaW50XS5hbmNob3JdLm9mZigncGc6cG9zaXRpb246bW9kaWZpZWQnLCB0aGlzW2xpbmtQb2ludF0uaGFuZGxlcnMub25BbmNob3JQb3NpdGlvbk1vZGlmaWVkKTtcclxuICAgICAgZGVsZXRlIHRoaXNbbGlua1BvaW50XTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlc2V0Q3VydmF0dXJlKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBjb250cm9sUG9pbnQsXHJcbiAgICAgIHBhdGgsXHJcbiAgICB9ID0gdGhpcztcclxuICAgIGNvbnRyb2xQb2ludC5sZWZ0ID0gKHBhdGgucGF0aFswXVsxXSArIHBhdGgucGF0aFsxXVszXSkgLyAyO1xyXG4gICAgY29udHJvbFBvaW50LnRvcCA9IChwYXRoLnBhdGhbMF1bMl0gKyBwYXRoLnBhdGhbMV1bNF0pIC8gMjtcclxuICAgIGNvbnRyb2xQb2ludC5zZXRDb29yZHMoKTtcclxuICAgIGNvbnRyb2xQb2ludC5maXJlKCdtb3ZlZCcpO1xyXG4gIH1cclxuXHJcbiAgYnJpbmdUb0Zyb250KCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHBhdGgsXHJcbiAgICAgIGNvbnRyb2xQb2ludCxcclxuICAgICAgYXJyb3dIZWFkLFxyXG4gICAgICBhcnJvd1RhaWwsXHJcbiAgICB9ID0gdGhpcztcclxuICAgIGNhbnZhcy5icmluZ1RvRnJvbnQocGF0aCk7XHJcbiAgICBjYW52YXMuYnJpbmdUb0Zyb250KGNvbnRyb2xQb2ludCk7XHJcbiAgICBjYW52YXMuYnJpbmdUb0Zyb250KGFycm93SGVhZCk7XHJcbiAgICBjYW52YXMuYnJpbmdUb0Zyb250KGFycm93VGFpbCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVQYXRoKGxpbmtQb2ludCwgeCwgeSwgY29tbWl0LCByZXNldEN1cnYpIHtcclxuICAgIGNvbnN0IHBhdGggPSB7XHJcbiAgICAgIE06IHtcclxuICAgICAgICB4OiBsaW5rUG9pbnQgPT09ICdmcm9tJyA/IHggOiB0aGlzLnBhdGgucGF0aFswXVsxXSxcclxuICAgICAgICB5OiBsaW5rUG9pbnQgPT09ICdmcm9tJyA/IHkgOiB0aGlzLnBhdGgucGF0aFswXVsyXSxcclxuICAgICAgfSxcclxuICAgICAgUToge1xyXG4gICAgICAgIHgxOiBsaW5rUG9pbnQgPT09ICdjb250cm9sJyA/IHggOiB0aGlzLnBhdGgucGF0aFsxXVsxXSxcclxuICAgICAgICB5MTogbGlua1BvaW50ID09PSAnY29udHJvbCcgPyB5IDogdGhpcy5wYXRoLnBhdGhbMV1bMl0sXHJcbiAgICAgICAgeDI6IGxpbmtQb2ludCA9PT0gJ3RvJyA/IHggOiB0aGlzLnBhdGgucGF0aFsxXVszXSxcclxuICAgICAgICB5MjogbGlua1BvaW50ID09PSAndG8nID8geSA6IHRoaXMucGF0aC5wYXRoWzFdWzRdLFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICAgIGlmIChjb21taXQpIHtcclxuICAgICAgY29uc3QgcGF0aFN0ciA9IGBNICR7cGF0aC5NLnh9ICR7cGF0aC5NLnl9IFEgJHtwYXRoLlEueDF9LCAke3BhdGguUS55MX0sICR7cGF0aC5RLngyfSwgJHtwYXRoLlEueTJ9YDtcclxuICAgICAgY29uc3QgbmV3UGF0aCA9IG5ldyBmYWJyaWMuUGF0aChwYXRoU3RyLCB0aGlzLmRlZmF1bHRQYXRoT3B0aW9ucyk7XHJcbiAgICAgIHRoaXMuY2FudmFzLnJlbW92ZSh0aGlzLnBhdGgpO1xyXG4gICAgICB0aGlzLmNhbnZhcy5hZGQobmV3UGF0aCk7XHJcblxyXG4gICAgICBuZXdQYXRoLm9uKCdtb3VzZW92ZXInLCB0aGlzLm9uTGlua01vdXNlT3Zlci5iaW5kKHRoaXMpKTtcclxuICAgICAgbmV3UGF0aC5vbignbW91c2VvdXQnLCB0aGlzLm9uTGlua01vdXNlT3V0LmJpbmQodGhpcykpO1xyXG4gICAgICBuZXdQYXRoLm9uKCdtb3VzZWRvd24nLCB0aGlzLmJyaW5nVG9Gcm9udC5iaW5kKHRoaXMpKTtcclxuICAgICAgbmV3UGF0aC5vbignbW92aW5nJywgdGhpcy5vbkxpbmtNb3ZpbmcuYmluZCh0aGlzKSk7XHJcbiAgICAgIG5ld1BhdGgub24oJ21vdmVkJywgdGhpcy5vbkxpbmtNb3ZlZC5iaW5kKHRoaXMpKTtcclxuICAgICAgY29uc3QgdG9CaW5kID0gW1xyXG4gICAgICAgIHRoaXMuYXJyb3dIZWFkLFxyXG4gICAgICAgIHRoaXMuYXJyb3dUYWlsLFxyXG4gICAgICAgIHRoaXMuY29udHJvbFBvaW50LFxyXG4gICAgICAgIHRoaXMuY29udHJvbExpbmUxLFxyXG4gICAgICAgIHRoaXMuY29udHJvbExpbmUyLFxyXG4gICAgICBdO1xyXG4gICAgICBjb25zdCBib3NzVHJhbnNmb3JtID0gbmV3UGF0aC5jYWxjVHJhbnNmb3JtTWF0cml4KCk7XHJcbiAgICAgIGNvbnN0IGludmVydGVkQm9zc1RyYW5zZm9ybSA9IGZhYnJpYy51dGlsLmludmVydFRyYW5zZm9ybShib3NzVHJhbnNmb3JtKTtcclxuICAgICAgdG9CaW5kLmZvckVhY2goKG8pID0+IHtcclxuICAgICAgICBjb25zdCBkZXNpcmVkVHJhbnNmb3JtID0gZmFicmljLnV0aWwubXVsdGlwbHlUcmFuc2Zvcm1NYXRyaWNlcyhcclxuICAgICAgICAgIGludmVydGVkQm9zc1RyYW5zZm9ybSxcclxuICAgICAgICAgIG8uY2FsY1RyYW5zZm9ybU1hdHJpeCgpLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXHJcbiAgICAgICAgby5yZWxhdGlvbnNoaXAgPSBkZXNpcmVkVHJhbnNmb3JtO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMucGF0aCA9IG5ld1BhdGg7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhdGguc2V0KCdwYXRoJywgW1xyXG4gICAgICAgIFsnTScsIHBhdGguTS54LCBwYXRoLk0ueV0sXHJcbiAgICAgICAgWydRJywgcGF0aC5RLngxLCBwYXRoLlEueTEsIHBhdGguUS54MiwgcGF0aC5RLnkyXSxcclxuICAgICAgXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVXBkYXRlIGNvbnRyb2wgbGluZXMsIGFycm93IGhlYWRzIGFuZCB0YWlsc1xyXG4gICAgdGhpcy5jb250cm9sTGluZTEuc2V0KHtcclxuICAgICAgeDE6IHRoaXMuY29udHJvbFBvaW50LmxlZnQsXHJcbiAgICAgIHkxOiB0aGlzLmNvbnRyb2xQb2ludC50b3AsXHJcbiAgICAgIHgyOiB0aGlzLnBhdGgucGF0aFswXVsxXSxcclxuICAgICAgeTI6IHRoaXMucGF0aC5wYXRoWzBdWzJdLFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmNvbnRyb2xMaW5lMi5zZXQoe1xyXG4gICAgICB4MTogdGhpcy5jb250cm9sUG9pbnQubGVmdCxcclxuICAgICAgeTE6IHRoaXMuY29udHJvbFBvaW50LnRvcCxcclxuICAgICAgeDI6IHRoaXMucGF0aC5wYXRoWzFdWzNdLFxyXG4gICAgICB5MjogdGhpcy5wYXRoLnBhdGhbMV1bNF0sXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGFycm93SGVhZEFuZ2xlID0gKE1hdGguYXRhbjIodGhpcy5wYXRoLnBhdGhbMV1bNF0gLSB0aGlzLnBhdGgucGF0aFsxXVsyXSwgdGhpcy5wYXRoLnBhdGhbMV1bM10gLSB0aGlzLnBhdGgucGF0aFsxXVsxXSkgKiAxODApIC8gTWF0aC5QSTtcclxuICAgIHRoaXMuYXJyb3dIZWFkLmFuZ2xlID0gYXJyb3dIZWFkQW5nbGUgKyA5MDtcclxuICAgIHRoaXMuYXJyb3dIZWFkLmxlZnQgPSB0aGlzLnBhdGgucGF0aFsxXVszXTtcclxuICAgIHRoaXMuYXJyb3dIZWFkLnRvcCA9IHRoaXMucGF0aC5wYXRoWzFdWzRdO1xyXG4gICAgdGhpcy5hcnJvd0hlYWQuc2V0Q29vcmRzKCk7XHJcbiAgICB0aGlzLmFycm93VGFpbC5sZWZ0ID0gdGhpcy5wYXRoLnBhdGhbMF1bMV07XHJcbiAgICB0aGlzLmFycm93VGFpbC50b3AgPSB0aGlzLnBhdGgucGF0aFswXVsyXTtcclxuICAgIHRoaXMuYXJyb3dUYWlsLnNldENvb3JkcygpO1xyXG5cclxuICAgIHRoaXMuYnJpbmdUb0Zyb250KCk7XHJcblxyXG4gICAgLy8gUmVzZXQgY29udHJvbCBwb2ludFxyXG4gICAgaWYgKHJlc2V0Q3Vydikge1xyXG4gICAgICB0aGlzLnJlc2V0Q3VydmF0dXJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc1ZhbGlkQ29ubmVjdGlvbihsaW5rUG9pbnQsIHNoYXBlSWQsIGNhcmRpbmFsKSB7XHJcbiAgICBjb25zdCBzaGFwZSA9IHRoaXMuY2FudmFzLmdldE9iamVjdHMoKVxyXG4gICAgICAuZmluZCgobykgPT4gby5pZCA9PT0gc2hhcGVJZCk7XHJcbiAgICAvLyBDaGVjayBub3QgYWxyZWFkeSBjb25uZWN0ZWRcclxuICAgIGlmIChsaW5rUG9pbnQgPT09ICdmcm9tJykge1xyXG4gICAgICBpZiAodGhpcy5mcm9tICYmIHRoaXMuZnJvbS5zaGFwZSAmJiB0aGlzLmZyb20uc2hhcGUuaWQgPT09IHNoYXBlLmlkICYmIHRoaXMuZnJvbS5jYXJkaW5hbCA9PT0gY2FyZGluYWwpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIHRyeWluZyB0byBzZXQgdGhlIHNhbWUgYWxyZWFkeSBjb25uZWN0ZWQgYW5jaG9yXHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMudG8gJiYgdGhpcy50by5zaGFwZSAmJiB0aGlzLnRvLnNoYXBlLmlkID09PSBzaGFwZS5pZCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTsgLy8gdHJ5aW5nIHRvIHNob3J0IGNpcmN1aXQgdGhlIHJlY3RhbmdsZVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGxpbmtQb2ludCA9PT0gJ3RvJykge1xyXG4gICAgICBpZiAodGhpcy50byAmJiB0aGlzLnRvLnNoYXBlICYmIHRoaXMudG8uc2hhcGUuaWQgPT09IHNoYXBlLmlkICYmIHRoaXMudG8uY2FyZGluYWwgPT09IGNhcmRpbmFsKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyB0cnlpbmcgdG8gc2V0IHRoZSBzYW1lIGFscmVhZHkgY29ubmVjdGVkIGFuY2hvclxyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLmZyb20gJiYgdGhpcy5mcm9tLnNoYXBlICYmIHRoaXMuZnJvbS5zaGFwZS5pZCA9PT0gc2hhcGUuaWQpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIHRyeWluZyB0byBzaG9ydCBjaXJjdWl0IHRoZSByZWN0YW5nbGVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVBbGxBbmNob3JzT3BhY2l0eShvcGFjaXR5KSB7XHJcbiAgICBjb25zdCBhbmNob3JzID0gdGhpcy5jYW52YXMuZ2V0T2JqZWN0cygpXHJcbiAgICAgIC5maWx0ZXIoKG8pID0+IG8udHlwZSA9PT0gJ2FuY2hvcicpO1xyXG5cclxuICAgIC8vIGNvbnN0IHByb21pc2VzID0gW107XHJcbiAgICAvLyBjb25zdCBwcm9taXNlRmFjdG9yeSA9IGZ1bmN0aW9uIChhbmNob3IpIHtcclxuICAgIC8vICAgcmV0dXJuIGZ1bmN0aW9uIChyZXNvbHZlKSB7XHJcbiAgICAvLyAgICAgYW5jaG9yLmFuaW1hdGUoJ29wYWNpdHknLCBvcGFjaXR5LCB7XHJcbiAgICAvLyAgICAgICBkdXJhdGlvbjogMzAwLFxyXG4gICAgLy8gICAgICAgb25DaGFuZ2U6IHJlc29sdmUsXHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyAgIH07XHJcbiAgICAvLyB9O1xyXG4gICAgLy8gZm9yIChsZXQgYSA9IDA7IGEgPCBhbmNob3JzLmxlbmd0aDsgYSArPSAxKSB7XHJcbiAgICAvLyAgIGlmIChsb2NrICE9PSB1bmRlZmluZWQpIGFuY2hvcnNbYV0ubG9ja09wYWNpdHkgPSBsb2NrO1xyXG4gICAgLy8gICBwcm9taXNlcy5wdXNoKG5ldyBQcm9taXNlKHByb21pc2VGYWN0b3J5KGFuY2hvcnNbYV0pKSk7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiB7XHJcbiAgICAvLyAgIHRoaXMuY2FudmFzLnJlbmRlckFsbCgpO1xyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgZm9yIChsZXQgYSA9IDA7IGEgPCBhbmNob3JzLmxlbmd0aDsgYSArPSAxKSB7XHJcbiAgICAgIC8vIGlmIChsb2NrICE9PSB1bmRlZmluZWQpIGFuY2hvcnNbYV0ubG9ja09wYWNpdHkgPSBsb2NrO1xyXG4gICAgICBhbmNob3JzW2FdLnNldCgnb3BhY2l0eScsIG9wYWNpdHkpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jYW52YXMucmVuZGVyQWxsKCk7XHJcbiAgfVxyXG5cclxuICBvbkxpbmtNb3VzZU92ZXIoKSB7XHJcbiAgICB0aGlzLmNvbnRyb2xQb2ludC50b2dnbGVPcGFjaXR5KDEpO1xyXG4gICAgdGhpcy5jb250cm9sTGluZTEudG9nZ2xlT3BhY2l0eSgxKTtcclxuICAgIHRoaXMuY29udHJvbExpbmUyLnRvZ2dsZU9wYWNpdHkoMSk7XHJcbiAgfVxyXG5cclxuICBvbkxpbmtNb3VzZU91dCgpIHtcclxuICAgIHRoaXMuY29udHJvbFBvaW50LnRvZ2dsZU9wYWNpdHkoMCk7XHJcbiAgICB0aGlzLmNvbnRyb2xMaW5lMS50b2dnbGVPcGFjaXR5KDApO1xyXG4gICAgdGhpcy5jb250cm9sTGluZTIudG9nZ2xlT3BhY2l0eSgwKTtcclxuICB9XHJcblxyXG4gIG9uTGlua01vdmluZygpIHtcclxuICAgIC8vIE1vdmUgc3RhcnQsIGVuZCwgY29udHJvbCBwb2ludHMgYWx0b2dldGhlciB3aXRoIHRoZSBQYXRoXHJcbiAgICBjb25zdCB0b1VwZGF0ZSA9IFtcclxuICAgICAgdGhpcy5hcnJvd0hlYWQsXHJcbiAgICAgIHRoaXMuYXJyb3dUYWlsLFxyXG4gICAgICB0aGlzLmNvbnRyb2xQb2ludCxcclxuICAgICAgdGhpcy5jb250cm9sTGluZTEsXHJcbiAgICAgIHRoaXMuY29udHJvbExpbmUyLFxyXG4gICAgXTtcclxuICAgIHRvVXBkYXRlLmZvckVhY2goKG8pID0+IHtcclxuICAgICAgaWYgKCFvLnJlbGF0aW9uc2hpcCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCB7IHJlbGF0aW9uc2hpcCB9ID0gbztcclxuICAgICAgY29uc3QgbmV3VHJhbnNmb3JtID0gZmFicmljLnV0aWwubXVsdGlwbHlUcmFuc2Zvcm1NYXRyaWNlcyhcclxuICAgICAgICB0aGlzLnBhdGguY2FsY1RyYW5zZm9ybU1hdHJpeCgpLFxyXG4gICAgICAgIHJlbGF0aW9uc2hpcCxcclxuICAgICAgKTtcclxuICAgICAgY29uc3Qgb3B0ID0gZmFicmljLnV0aWwucXJEZWNvbXBvc2UobmV3VHJhbnNmb3JtKTtcclxuICAgICAgby5zZXQoe1xyXG4gICAgICAgIGZsaXBYOiBmYWxzZSxcclxuICAgICAgICBmbGlwWTogZmFsc2UsXHJcbiAgICAgIH0pO1xyXG4gICAgICBvLnNldFBvc2l0aW9uQnlPcmlnaW4oXHJcbiAgICAgICAgeyB4OiBvcHQudHJhbnNsYXRlWCwgeTogb3B0LnRyYW5zbGF0ZVkgfSxcclxuICAgICAgICAnY2VudGVyJyxcclxuICAgICAgICAnY2VudGVyJyxcclxuICAgICAgKTtcclxuICAgICAgby5zZXQob3B0KTtcclxuICAgICAgby5zZXRDb29yZHMoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEZpbmFsbHksIGNoZWNrIHRoZSBzdGFydCBvciBlbmQgcG9pbnRzIGNhbiBiZSBjb25uZWN0ZWQuXHJcbiAgICB0aGlzLl9jaGVja0V4dHJlbWl0eUNhbkJlQ29ubmVjdGVkKCdmcm9tJyk7XHJcbiAgICB0aGlzLl9jaGVja0V4dHJlbWl0eUNhbkJlQ29ubmVjdGVkKCd0bycpO1xyXG4gIH1cclxuXHJcbiAgb25MaW5rTW92ZWQoKSB7XHJcbiAgICAvLyBSZXVwZGF0ZSB0aGUgUGF0aCBhY2NvcmRpbmcgdG8gdGhlIG5ldyBjb29yZGluYXRlcyBvZiBhbGwgZWxlbWVudHNcclxuICAgIGNvbnN0IHBhdGhDb29yZHMgPSB7XHJcbiAgICAgIE06IHtcclxuICAgICAgICB4OiB0aGlzLmFycm93VGFpbC5sZWZ0LFxyXG4gICAgICAgIHk6IHRoaXMuYXJyb3dUYWlsLnRvcCxcclxuICAgICAgfSxcclxuICAgICAgUToge1xyXG4gICAgICAgIHgxOiB0aGlzLmNvbnRyb2xQb2ludC5sZWZ0LFxyXG4gICAgICAgIHkxOiB0aGlzLmNvbnRyb2xQb2ludC50b3AsXHJcbiAgICAgICAgeDI6IHRoaXMuYXJyb3dIZWFkLmxlZnQsXHJcbiAgICAgICAgeTI6IHRoaXMuYXJyb3dIZWFkLnRvcCxcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgICBjb25zdCBwYXRoU3RyID0gYE0gJHtwYXRoQ29vcmRzLk0ueH0gJHtwYXRoQ29vcmRzLk0ueX0gUSAke3BhdGhDb29yZHMuUS54MX0sICR7cGF0aENvb3Jkcy5RLnkxfSwgJHtwYXRoQ29vcmRzLlEueDJ9LCAke3BhdGhDb29yZHMuUS55Mn1gO1xyXG4gICAgY29uc3QgY2FjYSA9IG5ldyBmYWJyaWMuUGF0aChwYXRoU3RyLCB7fSk7XHJcbiAgICB0aGlzLnVwZGF0ZVBhdGgoJ2Zyb20nLCBjYWNhLnBhdGhbMF1bMV0sIGNhY2EucGF0aFswXVsyXSwgZmFsc2UpO1xyXG4gICAgdGhpcy51cGRhdGVQYXRoKCd0bycsIGNhY2EucGF0aFsxXVszXSwgY2FjYS5wYXRoWzFdWzRdLCBmYWxzZSk7XHJcbiAgICB0aGlzLnVwZGF0ZVBhdGgoJ2NvbnRyb2wnLCBjYWNhLnBhdGhbMV1bMV0sIGNhY2EucGF0aFsxXVsyXSwgdHJ1ZSk7XHJcblxyXG4gICAgLy8gQ29ubmVjdCBvciBEaXNjb25uZWN0IGRlcGVuZGluZyBvbiBleHRyZW1pdGllcyBwb3NpdGlvbnNcclxuICAgIHRoaXMuaXNWYWxpZFRhaWxDb25uZWN0aW9uTWFzay5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgIHRoaXMuaXNWYWxpZEhlYWRDb25uZWN0aW9uTWFzay5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgIHRoaXMuX2Nvbm5lY3REaXNjb25uZWN0RXh0cmVtaXR5KCdmcm9tJyk7XHJcbiAgICB0aGlzLl9jb25uZWN0RGlzY29ubmVjdEV4dHJlbWl0eSgndG8nKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhlbHBlciB0byBkaXNwbGF5IGEgdmFsaWQgY2lyY2xlIG1hc2sgb24gc3BlY2lmaWMgY29uZGl0aW9ucy5cclxuICAgKiBJZiB0aGUgZXh0cmVtaXR5IGlzIHRvdWNoaW5nIGFuIGFuY2hvciBvZiBhIExpbmthYmxlU2hhcGUgZnJvbSB3aGljaCBpdCBpcyBub3QgeWV0IGNvbm5lY3RlZCA9PiBzaG93IEdSRUVOXHJcbiAgICogSWYgdGhlIGV4dHJlbWl0eSBpcyB0b3VjaGluZyBhbiBhbmNob3Igb2YgYSBMaW5rYWJsZVNoYXBlIGZyb20gd2hpY2ggaXQgaXMgYWxyZWFkeSBjb25uZWN0ZWQgYnkgdGhlIG90aGVyIGV4dHJlbWl0eSA9PiBzaG93IFJFRFxyXG4gICAqIEBwYXJhbSBkaXJlY3Rpb25cclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9jaGVja0V4dHJlbWl0eUNhbkJlQ29ubmVjdGVkKGRpcmVjdGlvbikge1xyXG4gICAgY29uc3QgeyBjYW52YXMgfSA9IHRoaXM7XHJcblxyXG4gICAgbGV0IGV4dHJlbWl0eTtcclxuICAgIGxldCBtYXNrO1xyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2Zyb20nKSB7XHJcbiAgICAgIGV4dHJlbWl0eSA9IHRoaXMuYXJyb3dUYWlsO1xyXG4gICAgICBtYXNrID0gdGhpcy5pc1ZhbGlkVGFpbENvbm5lY3Rpb25NYXNrO1xyXG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICd0bycpIHtcclxuICAgICAgZXh0cmVtaXR5ID0gdGhpcy5hcnJvd0hlYWQ7XHJcbiAgICAgIG1hc2sgPSB0aGlzLmlzVmFsaWRIZWFkQ29ubmVjdGlvbk1hc2s7XHJcbiAgICB9XHJcblxyXG4gICAgbWFzay5sZWZ0ID0gZXh0cmVtaXR5LmxlZnQ7XHJcbiAgICBtYXNrLnRvcCA9IGV4dHJlbWl0eS50b3A7XHJcbiAgICBtYXNrLnNldENvb3JkcygpO1xyXG4gICAgbWFzay5zZXQoJ29wYWNpdHknLCAwKTtcclxuXHJcbiAgICAvLyBDaGVjayBpZiBpbnRlcnNlY3RzIHdpdGggYW5jaG9yXHJcbiAgICBjb25zdCBhbmNob3JzID0gY2FudmFzLmdldE9iamVjdHMoKVxyXG4gICAgICAuZmlsdGVyKChvKSA9PiBvLnR5cGUgPT09ICdhbmNob3InKTtcclxuICAgIGV4dHJlbWl0eS5zZXQoJ3N0cm9rZScsICcjMDAwJyk7XHJcbiAgICBmb3IgKGxldCBhID0gMDsgYSA8IGFuY2hvcnMubGVuZ3RoOyBhICs9IDEpIHtcclxuICAgICAgaWYgKGV4dHJlbWl0eS5pbnRlcnNlY3RzV2l0aE9iamVjdChhbmNob3JzW2FdKSkge1xyXG4gICAgICAgIG1hc2suc2V0KCdvcGFjaXR5JywgMC41KTtcclxuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkQ29ubmVjdGlvbihkaXJlY3Rpb24sIGFuY2hvcnNbYV0uc2hhcGVJZCwgYW5jaG9yc1thXS5jYXJkaW5hbCkpIHtcclxuICAgICAgICAgIG1hc2suc2V0KHtcclxuICAgICAgICAgICAgc3Ryb2tlOiAnIzU3Yjg1NycsXHJcbiAgICAgICAgICAgIGZpbGw6ICcjNTdiODU3JyxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgZXh0cmVtaXR5LnNldCgnc3Ryb2tlJywgJyM1ZjUnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbWFzay5zZXQoe1xyXG4gICAgICAgICAgICBzdHJva2U6ICcjZWE0ZjM3JyxcclxuICAgICAgICAgICAgZmlsbDogJyNlYTRmMzcnLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBleHRyZW1pdHkuc2V0KCdzdHJva2UnLCAnI2VhNGYzNycpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGVscGVyIHRvIGV4ZWN1dGUgY29ubmVjdC9kaXNjb25uZWN0IGRlcGVuZGluZyBvbiBzcGVjaWZpYyBjb25kaXRpb25zLlxyXG4gICAqIElmIHRoZSBleHRyZW1pdHkgd2FzIGNvbm5lY3RlZCBBTkQgaXQgaXMgTk9UIHRvdWNoaW5nIHRoZSBhbmNob3IgYW55bW9yZSA9PiBkaXNjb25uZWN0IGl0LlxyXG4gICAqIElmIHRoZSBleHRyZW1pdHkgd2FzIGRpc2Nvbm5lY3RlZCBBTkQgaXQgaXMgdG91Y2hpbmcgdGhlIGFuY2hvciA9PiBjb25uZWN0IGl0LlxyXG4gICAqIEBwYXJhbSBkaXJlY3Rpb25cclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9jb25uZWN0RGlzY29ubmVjdEV4dHJlbWl0eShkaXJlY3Rpb24pIHtcclxuICAgIGNvbnN0IHsgY2FudmFzIH0gPSB0aGlzO1xyXG5cclxuICAgIGxldCBleHRyZW1pdHk7XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSAnZnJvbScpIHtcclxuICAgICAgZXh0cmVtaXR5ID0gdGhpcy5hcnJvd1RhaWw7XHJcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ3RvJykge1xyXG4gICAgICBleHRyZW1pdHkgPSB0aGlzLmFycm93SGVhZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGVjayBpZiBpbnRlcnNlY3RzIHdpdGggYW5jaG9yXHJcbiAgICBjb25zdCBhbmNob3JzID0gY2FudmFzLmdldE9iamVjdHMoKVxyXG4gICAgICAuZmlsdGVyKChvKSA9PiBvLnR5cGUgPT09ICdhbmNob3InKTtcclxuICAgIGZvciAobGV0IGEgPSAwOyBhIDwgYW5jaG9ycy5sZW5ndGg7IGEgKz0gMSkge1xyXG4gICAgICBpZiAoZXh0cmVtaXR5LmludGVyc2VjdHNXaXRoT2JqZWN0KGFuY2hvcnNbYV0pKSB7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0TGluayhkaXJlY3Rpb24sIGFuY2hvcnNbYV0uc2hhcGVJZCwgYW5jaG9yc1thXS5jYXJkaW5hbCk7XHJcbiAgICAgICAgLy8gYW5jaG9yc1thXS5zZXQoJ3N0cm9rZScsICcjMDAwJyk7XHJcbiAgICAgICAgZXh0cmVtaXR5LnNldCgnc3Ryb2tlJywgJyMwMDAnKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzW2RpcmVjdGlvbl0gJiYgYW5jaG9yc1thXSA9PT0gdGhpc1tkaXJlY3Rpb25dLnNoYXBlLmFuY2hvcnNbdGhpc1tkaXJlY3Rpb25dLmFuY2hvcl0pIHtcclxuICAgICAgICAvLyBJZiB0aGlzIGxpbmsgd2FzIGNvbm5lY3RlZCB0byB0aGlzIGFuY2hvciBhbmQgaXQgZG9lc24ndCBpbnRlcnNlY3QgYW55bW9yZVxyXG4gICAgICAgIHRoaXMuZGlzY29ubmVjdExpbmsoZGlyZWN0aW9uKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJjb25zdCB7IGZhYnJpYyB9ID0gd2luZG93O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlua2FibGVTaGFwZSB7XHJcbiAgLyoqXHJcbiAgICogQSBMaW5rYWJsZVNoYXBlIGlzIGFueSBGYWJyaWMuT2JqZWN0IHNoYXBlIG9uIHdoaWNoIGFuY2hvcnMgYXJlIGFwcGVuZGVkIHNvIHRoYXQgbXVsdGlwbGUgTGluayBjYW4gYmUgY29ubmVjdGVkIHRvIGl0LlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBvcHRpb25zXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0ZhYnJpYy5DYW52YXN9ICAgb3B0aW9ucy5jYW52YXMgLSBGYWJyaWMgY2FudmFzXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG9wdGlvbnMuaWQgLSBVbmlxdWUgaWRlbnRpZmllclxyXG4gICAqXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBpZCxcclxuICAgICAgY2FudmFzLFxyXG4gICAgICBzaGFwZSxcclxuICAgICAgbGVmdCxcclxuICAgICAgdG9wLFxyXG4gICAgICBhbmdsZSxcclxuICAgIH0gPSBvcHRpb25zO1xyXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xyXG5cclxuICAgIC8vIFNldCBzaGFwZVxyXG4gICAgc2hhcGUuc2V0KCd0eXBlJywgJ2xpbmthYmxlU2hhcGUnKTtcclxuICAgIHNoYXBlLnNldCh7XHJcbiAgICAgIGxlZnQsIHRvcCwgaWQsIGFuZ2xlLFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNoYXBlID0gc2hhcGU7XHJcblxyXG4gICAgLy8gU2hvdyBjb29yZGluYXRlcy9hbmdsZSB3aGVuIG1vdmluZy9yb3RhdGluZyBvYmplY3RcclxuICAgIGNvbnN0IG1vZGlmaWNhdGlvbkJveCA9IG5ldyBmYWJyaWMuUmVjdCh7XHJcbiAgICAgIGxlZnQ6IDAsXHJcbiAgICAgIHRvcDogMCxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgc3Ryb2tlOiAnIzY2NicsXHJcbiAgICAgIGZpbGw6ICcjZmZmJyxcclxuICAgICAgd2lkdGg6IDcwLFxyXG4gICAgICBoZWlnaHQ6IDIwLFxyXG4gICAgICB2ZW50ZWQ6IGZhbHNlLFxyXG4gICAgICBzZWxlY3RhYmxlOiBmYWxzZSxcclxuICAgICAgb3BhY2l0eTogMCxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgbW9kaWZpY2F0aW9uVGV4dCA9IG5ldyBmYWJyaWMuVGV4dCgnMCwgMCcsIHtcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIGZvbnRGYW1pbHk6ICdIZWx2ZXRpY2EnLFxyXG4gICAgICBmb250U2l6ZTogMTIsXHJcbiAgICAgIGJvcmRlclN0cm9rZVdpZHRoOiA0LFxyXG4gICAgICBldmVudGVkOiBmYWxzZSxcclxuICAgICAgc2VsZWN0YWJsZTogZmFsc2UsXHJcbiAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IG1vZGlmaWNhdGlvbiA9IHRoaXMubW9kQm94ID0gbmV3IGZhYnJpYy5Hcm91cChbbW9kaWZpY2F0aW9uQm94LCBtb2RpZmljYXRpb25UZXh0XSwge1xyXG4gICAgICBsZWZ0OiAwLFxyXG4gICAgICB0b3A6IDAsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgZXZlbnRlZDogZmFsc2UsXHJcbiAgICAgIHNlbGVjdGFibGU6IGZhbHNlLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBvbk1vdmluZyA9ICgpID0+IHtcclxuICAgICAgY29uc3QgeyB4LCB5IH0gPSBzaGFwZS5hQ29vcmRzLnRsO1xyXG4gICAgICBjb25zdCB4Q29vcmRzID0gW3NoYXBlLmFDb29yZHMudGwueCwgc2hhcGUuYUNvb3Jkcy50ci54LCBzaGFwZS5hQ29vcmRzLmJsLngsIHNoYXBlLmFDb29yZHMuYnIueF07XHJcbiAgICAgIGNvbnN0IHlDb29yZHMgPSBbc2hhcGUuYUNvb3Jkcy50bC55LCBzaGFwZS5hQ29vcmRzLnRyLnksIHNoYXBlLmFDb29yZHMuYmwueSwgc2hhcGUuYUNvb3Jkcy5ici55XTtcclxuICAgICAgbW9kaWZpY2F0aW9uLmxlZnQgPSAoTWF0aC5taW4oLi4ueENvb3JkcykgKyBNYXRoLm1heCguLi54Q29vcmRzKSkgLyAyO1xyXG4gICAgICBtb2RpZmljYXRpb24udG9wID0gTWF0aC5yb3VuZChNYXRoLm1heCguLi55Q29vcmRzKSArIDMwKTtcclxuICAgICAgbW9kaWZpY2F0aW9uLnNldENvb3JkcygpO1xyXG4gICAgICBtb2RpZmljYXRpb25Cb3guc2V0KCdvcGFjaXR5JywgMC43KTtcclxuICAgICAgbW9kaWZpY2F0aW9uVGV4dC5zZXQoJ29wYWNpdHknLCAxKTtcclxuICAgICAgbW9kaWZpY2F0aW9uVGV4dC5zZXQoJ3RleHQnLCBgJHtNYXRoLnJvdW5kKHgpfSwgJHtNYXRoLnJvdW5kKHkpfWApO1xyXG4gICAgICBjYW52YXMuYnJpbmdUb0Zyb250KG1vZGlmaWNhdGlvbik7XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb25Nb3ZlZCA9ICgpID0+IHtcclxuICAgICAgbW9kaWZpY2F0aW9uQm94LnNldCgnb3BhY2l0eScsIDApO1xyXG4gICAgICBtb2RpZmljYXRpb25UZXh0LnNldCgnb3BhY2l0eScsIDApO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IG9uUm90YXRpbmcgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHhDb29yZHMgPSBbc2hhcGUuYUNvb3Jkcy50bC54LCBzaGFwZS5hQ29vcmRzLnRyLngsIHNoYXBlLmFDb29yZHMuYmwueCwgc2hhcGUuYUNvb3Jkcy5ici54XTtcclxuICAgICAgY29uc3QgeUNvb3JkcyA9IFtzaGFwZS5hQ29vcmRzLnRsLnksIHNoYXBlLmFDb29yZHMudHIueSwgc2hhcGUuYUNvb3Jkcy5ibC55LCBzaGFwZS5hQ29vcmRzLmJyLnldO1xyXG4gICAgICBtb2RpZmljYXRpb24ubGVmdCA9IChNYXRoLm1pbiguLi54Q29vcmRzKSArIE1hdGgubWF4KC4uLnhDb29yZHMpKSAvIDI7XHJcbiAgICAgIG1vZGlmaWNhdGlvbi50b3AgPSBNYXRoLnJvdW5kKE1hdGgubWF4KC4uLnlDb29yZHMpICsgMzApO1xyXG4gICAgICBtb2RpZmljYXRpb24uc2V0Q29vcmRzKCk7XHJcbiAgICAgIG1vZGlmaWNhdGlvbkJveC5zZXQoJ29wYWNpdHknLCAwLjcpO1xyXG4gICAgICBtb2RpZmljYXRpb25UZXh0LnNldCgnb3BhY2l0eScsIDEpO1xyXG4gICAgICBtb2RpZmljYXRpb25UZXh0LnNldCgndGV4dCcsIGAke01hdGgucm91bmQoc2hhcGUuYW5nbGUgPiAxODAgPyBzaGFwZS5hbmdsZSAtIDM2MCA6IHNoYXBlLmFuZ2xlKX3CsGApO1xyXG4gICAgICBjYW52YXMuYnJpbmdUb0Zyb250KG1vZGlmaWNhdGlvbik7XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb25Sb3RhdGVkID0gKCkgPT4ge1xyXG4gICAgICBtb2RpZmljYXRpb25Cb3guc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICAgIG1vZGlmaWNhdGlvblRleHQuc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICB9O1xyXG4gICAgc2hhcGUub24oe1xyXG4gICAgICBtb3Zpbmc6IG9uTW92aW5nLFxyXG4gICAgICBtb3ZlZDogb25Nb3ZlZCxcclxuICAgICAgcm90YXRpbmc6IG9uUm90YXRpbmcsXHJcbiAgICAgIHJvdGF0ZWQ6IG9uUm90YXRlZCxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEFuY2hvciBwb2ludHNcclxuICAgIGNvbnN0IGVhc3QgPSB0aGlzLl9tYWtlQW5jaG9yUG9pbnQoJ2Vhc3QnKTtcclxuICAgIGNvbnN0IHdlc3QgPSB0aGlzLl9tYWtlQW5jaG9yUG9pbnQoJ3dlc3QnKTtcclxuICAgIGNvbnN0IG5vcnRoID0gdGhpcy5fbWFrZUFuY2hvclBvaW50KCdub3J0aCcpO1xyXG4gICAgY29uc3Qgc291dGggPSB0aGlzLl9tYWtlQW5jaG9yUG9pbnQoJ3NvdXRoJyk7XHJcbiAgICBjb25zdCBub3J0aGVhc3QgPSB0aGlzLl9tYWtlQW5jaG9yUG9pbnQoJ25vcnRoZWFzdCcpO1xyXG4gICAgY29uc3Qgbm9ydGh3ZXN0ID0gdGhpcy5fbWFrZUFuY2hvclBvaW50KCdub3J0aHdlc3QnKTtcclxuICAgIGNvbnN0IHNvdXRoZWFzdCA9IHRoaXMuX21ha2VBbmNob3JQb2ludCgnc291dGhlYXN0Jyk7XHJcbiAgICBjb25zdCBzb3V0aHdlc3QgPSB0aGlzLl9tYWtlQW5jaG9yUG9pbnQoJ3NvdXRod2VzdCcpO1xyXG4gICAgdGhpcy5hbmNob3JzID0gdGhpcy5zaGFwZS5hbmNob3JzID0ge1xyXG4gICAgICBlYXN0LFxyXG4gICAgICB3ZXN0LFxyXG4gICAgICBub3J0aCxcclxuICAgICAgc291dGgsXHJcbiAgICAgIG5vcnRoZWFzdCxcclxuICAgICAgbm9ydGh3ZXN0LFxyXG4gICAgICBzb3V0aGVhc3QsXHJcbiAgICAgIHNvdXRod2VzdCxcclxuICAgIH07XHJcblxyXG4gICAgLy8gRXZlbnRzIHJlbGF0ZWQgdG8gYW5jaG9yc1xyXG4gICAgc2hhcGUub24oe1xyXG4gICAgICBzZWxlY3RlZDogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudG9nZ2xlQW5jaG9yc09wYWNpdHkoMCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG1vdXNlb3ZlcjogKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNhbnZhcy5nZXRBY3RpdmVPYmplY3QoKSAhPT0gdGhpcy5zaGFwZSkge1xyXG4gICAgICAgICAgdGhpcy50b2dnbGVBbmNob3JzT3BhY2l0eSgxKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG1vdXNlb3V0OiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy50b2dnbGVBbmNob3JzT3BhY2l0eSgwKTtcclxuICAgICAgfSxcclxuICAgICAgbW92aW5nOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKGZhbHNlKTtcclxuICAgICAgfSxcclxuICAgICAgbW92ZWQ6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnJlZnJlc2hBbmNob3JzUG9zaXRpb24odHJ1ZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHJvdGF0aW5nOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKGZhbHNlKTtcclxuICAgICAgfSxcclxuICAgICAgcm90YXRlZDogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbih0cnVlKTtcclxuICAgICAgfSxcclxuICAgICAgc2NhbGluZzogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbihmYWxzZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHNjYWxlZDogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbih0cnVlKTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5qZWN0KCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHNoYXBlLFxyXG4gICAgICBhbmNob3JzLFxyXG4gICAgICBtb2RCb3gsXHJcbiAgICB9ID0gdGhpcztcclxuICAgIGNhbnZhcy5hZGQoc2hhcGUpO1xyXG4gICAgY2FudmFzLmFkZChtb2RCb3gpO1xyXG4gICAgY2FudmFzLmFkZChhbmNob3JzLmVhc3QpO1xyXG4gICAgY2FudmFzLmJyaW5nRm9yd2FyZChhbmNob3JzLmVhc3QsIHRydWUpO1xyXG4gICAgY2FudmFzLmFkZChhbmNob3JzLndlc3QpO1xyXG4gICAgY2FudmFzLmJyaW5nRm9yd2FyZChhbmNob3JzLndlc3QsIHRydWUpO1xyXG4gICAgY2FudmFzLmFkZChhbmNob3JzLm5vcnRoKTtcclxuICAgIGNhbnZhcy5icmluZ0ZvcndhcmQoYW5jaG9ycy5ub3J0aCwgdHJ1ZSk7XHJcbiAgICBjYW52YXMuYWRkKGFuY2hvcnMuc291dGgpO1xyXG4gICAgY2FudmFzLmJyaW5nRm9yd2FyZChhbmNob3JzLnNvdXRoLCB0cnVlKTtcclxuICAgIGNhbnZhcy5hZGQoYW5jaG9ycy5ub3J0aGVhc3QpO1xyXG4gICAgY2FudmFzLmJyaW5nRm9yd2FyZChhbmNob3JzLm5vcnRoZWFzdCwgdHJ1ZSk7XHJcbiAgICBjYW52YXMuYWRkKGFuY2hvcnMubm9ydGh3ZXN0KTtcclxuICAgIGNhbnZhcy5icmluZ0ZvcndhcmQoYW5jaG9ycy5ub3J0aHdlc3QsIHRydWUpO1xyXG4gICAgY2FudmFzLmFkZChhbmNob3JzLnNvdXRoZWFzdCk7XHJcbiAgICBjYW52YXMuYnJpbmdGb3J3YXJkKGFuY2hvcnMuc291dGhlYXN0LCB0cnVlKTtcclxuICAgIGNhbnZhcy5hZGQoYW5jaG9ycy5zb3V0aHdlc3QpO1xyXG4gICAgY2FudmFzLmJyaW5nRm9yd2FyZChhbmNob3JzLnNvdXRod2VzdCwgdHJ1ZSk7XHJcbiAgICB0aGlzLnJlZnJlc2hBbmNob3JzUG9zaXRpb24odHJ1ZSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBtb3ZlKG9wdGlvbnMpIHtcclxuICAgIGlmIChvcHRpb25zLngpIHRoaXMuc2hhcGUuc2V0KCd0b3AnLCBvcHRpb25zLngpO1xyXG4gICAgaWYgKG9wdGlvbnMueSkgdGhpcy5zaGFwZS5zZXQoJ2xlZnQnLCBvcHRpb25zLnkpO1xyXG4gICAgdGhpcy5zaGFwZS5zZXRDb29yZHMoKTtcclxuICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgcm90YXRlKGFuZ2xlKSB7XHJcbiAgICB0aGlzLnNoYXBlLnJvdGF0ZShhbmdsZSk7XHJcbiAgICB0aGlzLnNoYXBlLnNldENvb3JkcygpO1xyXG4gICAgdGhpcy5yZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKCk7XHJcbiAgfVxyXG5cclxuICByZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKGNvbW1pdCkge1xyXG4gICAgdGhpcy5fc2V0QW5jaG9yUG9zaXRpb25SZWxhdGl2ZVRvUmVjdGFuZ2xlKCdlYXN0JywgY29tbWl0KTtcclxuICAgIHRoaXMuX3NldEFuY2hvclBvc2l0aW9uUmVsYXRpdmVUb1JlY3RhbmdsZSgnd2VzdCcsIHRoaXMuc2hhcGUsIGNvbW1pdCk7XHJcbiAgICB0aGlzLl9zZXRBbmNob3JQb3NpdGlvblJlbGF0aXZlVG9SZWN0YW5nbGUoJ3NvdXRoJywgdGhpcy5zaGFwZSwgY29tbWl0KTtcclxuICAgIHRoaXMuX3NldEFuY2hvclBvc2l0aW9uUmVsYXRpdmVUb1JlY3RhbmdsZSgnbm9ydGgnLCB0aGlzLnNoYXBlLCBjb21taXQpO1xyXG4gICAgdGhpcy5fc2V0QW5jaG9yUG9zaXRpb25SZWxhdGl2ZVRvUmVjdGFuZ2xlKCdub3J0aGVhc3QnLCB0aGlzLnNoYXBlLCBjb21taXQpO1xyXG4gICAgdGhpcy5fc2V0QW5jaG9yUG9zaXRpb25SZWxhdGl2ZVRvUmVjdGFuZ2xlKCdub3J0aHdlc3QnLCB0aGlzLnNoYXBlLCBjb21taXQpO1xyXG4gICAgdGhpcy5fc2V0QW5jaG9yUG9zaXRpb25SZWxhdGl2ZVRvUmVjdGFuZ2xlKCdzb3V0aGVhc3QnLCB0aGlzLnNoYXBlLCBjb21taXQpO1xyXG4gICAgdGhpcy5fc2V0QW5jaG9yUG9zaXRpb25SZWxhdGl2ZVRvUmVjdGFuZ2xlKCdzb3V0aHdlc3QnLCB0aGlzLnNoYXBlLCBjb21taXQpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlQW5jaG9yc09wYWNpdHkob3BhY2l0eSkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBlYXN0LFxyXG4gICAgICB3ZXN0LFxyXG4gICAgICBub3J0aCxcclxuICAgICAgc291dGgsXHJcbiAgICAgIG5vcnRoZWFzdCxcclxuICAgICAgc291dGhlYXN0LFxyXG4gICAgICBub3J0aHdlc3QsXHJcbiAgICAgIHNvdXRod2VzdCxcclxuICAgIH0gPSB0aGlzLmFuY2hvcnM7XHJcbiAgICBlYXN0LnRvZ2dsZU9wYWNpdHkob3BhY2l0eSk7XHJcbiAgICB3ZXN0LnRvZ2dsZU9wYWNpdHkob3BhY2l0eSk7XHJcbiAgICBub3J0aC50b2dnbGVPcGFjaXR5KG9wYWNpdHkpO1xyXG4gICAgc291dGgudG9nZ2xlT3BhY2l0eShvcGFjaXR5KTtcclxuICAgIG5vcnRoZWFzdC50b2dnbGVPcGFjaXR5KG9wYWNpdHkpO1xyXG4gICAgc291dGhlYXN0LnRvZ2dsZU9wYWNpdHkob3BhY2l0eSk7XHJcbiAgICBub3J0aHdlc3QudG9nZ2xlT3BhY2l0eShvcGFjaXR5KTtcclxuICAgIHNvdXRod2VzdC50b2dnbGVPcGFjaXR5KG9wYWNpdHkpO1xyXG4gIH1cclxuXHJcbiAgX3NldEFuY2hvclBvc2l0aW9uUmVsYXRpdmVUb1JlY3RhbmdsZShjYXJkaW5hbCwgY29tbWl0KSB7XHJcbiAgICBsZXQgbGVmdDtcclxuICAgIGxldCB0b3A7XHJcbiAgICBjb25zdCB7IHNoYXBlIH0gPSB0aGlzO1xyXG4gICAgY29uc3QgYXAgPSB0aGlzLmFuY2hvcnNbY2FyZGluYWxdO1xyXG4gICAgc3dpdGNoIChjYXJkaW5hbCkge1xyXG4gICAgICBjYXNlICdlYXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSAoc2hhcGUuYUNvb3Jkcy50ci54ICsgc2hhcGUuYUNvb3Jkcy5ici54KSAvIDI7XHJcbiAgICAgICAgdG9wID0gKHNoYXBlLmFDb29yZHMudHIueSArIHNoYXBlLmFDb29yZHMuYnIueSkgLyAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3dlc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IChzaGFwZS5hQ29vcmRzLnRsLnggKyBzaGFwZS5hQ29vcmRzLmJsLngpIC8gMjtcclxuICAgICAgICB0b3AgPSAoc2hhcGUuYUNvb3Jkcy50bC55ICsgc2hhcGUuYUNvb3Jkcy5ibC55KSAvIDI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnbm9ydGgnOiB7XHJcbiAgICAgICAgbGVmdCA9IChzaGFwZS5hQ29vcmRzLnRsLnggKyBzaGFwZS5hQ29vcmRzLnRyLngpIC8gMjtcclxuICAgICAgICB0b3AgPSAoc2hhcGUuYUNvb3Jkcy50bC55ICsgc2hhcGUuYUNvb3Jkcy50ci55KSAvIDI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnc291dGgnOiB7XHJcbiAgICAgICAgbGVmdCA9IChzaGFwZS5hQ29vcmRzLmJsLnggKyBzaGFwZS5hQ29vcmRzLmJyLngpIC8gMjtcclxuICAgICAgICB0b3AgPSAoc2hhcGUuYUNvb3Jkcy5ibC55ICsgc2hhcGUuYUNvb3Jkcy5ici55KSAvIDI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnbm9ydGhlYXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSBzaGFwZS5hQ29vcmRzLnRyLng7XHJcbiAgICAgICAgdG9wID0gc2hhcGUuYUNvb3Jkcy50ci55O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRod2VzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gc2hhcGUuYUNvb3Jkcy50bC54O1xyXG4gICAgICAgIHRvcCA9IHNoYXBlLmFDb29yZHMudGwueTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aGVhc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IHNoYXBlLmFDb29yZHMuYnIueDtcclxuICAgICAgICB0b3AgPSBzaGFwZS5hQ29vcmRzLmJyLnk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnc291dGh3ZXN0JzpcclxuICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgIGxlZnQgPSBzaGFwZS5hQ29vcmRzLmJsLng7XHJcbiAgICAgICAgdG9wID0gc2hhcGUuYUNvb3Jkcy5ibC55O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBhcC5sZWZ0ID0gbGVmdDtcclxuICAgIGFwLnRvcCA9IHRvcDtcclxuICAgIGFwLnNldENvb3JkcygpO1xyXG5cclxuICAgIGFwLmZpcmUoY29tbWl0ID8gJ3BnOnBvc2l0aW9uOm1vZGlmaWVkJyA6ICdwZzpwb3NpdGlvbjptb2RpZnlpbmcnKTtcclxuICB9XHJcblxyXG4gIF9tYWtlQW5jaG9yUG9pbnQoY2FyZGluYWwpIHtcclxuICAgIGxldCBsZWZ0O1xyXG4gICAgbGV0IHRvcDtcclxuICAgIGNvbnN0IHtcclxuICAgICAgc2hhcGUsXHJcbiAgICAgIGlkLFxyXG4gICAgfSA9IHRoaXM7XHJcbiAgICBzd2l0Y2ggKGNhcmRpbmFsKSB7XHJcbiAgICAgIGNhc2UgJ2Vhc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IChzaGFwZS5hQ29vcmRzLnRyLnggKyBzaGFwZS5hQ29vcmRzLmJyLngpIC8gMjtcclxuICAgICAgICB0b3AgPSAoc2hhcGUuYUNvb3Jkcy50ci55ICsgc2hhcGUuYUNvb3Jkcy5ici55KSAvIDI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnd2VzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMudGwueCArIHNoYXBlLmFDb29yZHMuYmwueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLnRsLnkgKyBzaGFwZS5hQ29vcmRzLmJsLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMudGwueCArIHNoYXBlLmFDb29yZHMudHIueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLnRsLnkgKyBzaGFwZS5hQ29vcmRzLnRyLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMuYmwueCArIHNoYXBlLmFDb29yZHMuYnIueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLmJsLnkgKyBzaGFwZS5hQ29vcmRzLmJyLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aGVhc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IHNoYXBlLmFDb29yZHMudHIueDtcclxuICAgICAgICB0b3AgPSBzaGFwZS5hQ29vcmRzLnRyLnk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnbm9ydGh3ZXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSBzaGFwZS5hQ29vcmRzLnRsLng7XHJcbiAgICAgICAgdG9wID0gc2hhcGUuYUNvb3Jkcy50bC55O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRoZWFzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gc2hhcGUuYUNvb3Jkcy5ici54O1xyXG4gICAgICAgIHRvcCA9IHNoYXBlLmFDb29yZHMuYnIueTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aHdlc3QnOlxyXG4gICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgbGVmdCA9IHNoYXBlLmFDb29yZHMuYmwueDtcclxuICAgICAgICB0b3AgPSBzaGFwZS5hQ29vcmRzLmJsLnk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhcCA9IG5ldyBmYWJyaWMuQ2lyY2xlKHtcclxuICAgICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAgIGxlZnQsXHJcbiAgICAgIHRvcCxcclxuICAgICAgc3Ryb2tlV2lkdGg6IDIsXHJcbiAgICAgIHJhZGl1czogNixcclxuICAgICAgZmlsbDogJyM3OGJlZmEnLCAvLyA0MmEyZGEgZDVlOGYyXHJcbiAgICAgIHN0cm9rZTogJyM3OGJlZmEnLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAgIHNlbGVjdGFibGU6IGZhbHNlLFxyXG4gICAgICBvcGFjaXR5OiAwLFxyXG4gICAgICBpZDogYCR7aWR9XyR7Y2FyZGluYWx9YCxcclxuICAgIH0pO1xyXG4gICAgYXAudHlwZSA9ICdhbmNob3InO1xyXG4gICAgYXAuc2hhcGVJZCA9IGlkO1xyXG4gICAgYXAuY2FyZGluYWwgPSBjYXJkaW5hbDtcclxuICAgIGFwLm9uKCdtb3VzZW92ZXInLCAoKSA9PiB7XHJcbiAgICAgIGFwLnRvZ2dsZU9wYWNpdHkoMSk7XHJcbiAgICB9KTtcclxuICAgIGFwLm9uKCdtb3VzZW91dCcsICgpID0+IHtcclxuICAgICAgYXAudG9nZ2xlT3BhY2l0eSgwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGFwLm9uKCdtb3VzZWRvd24nLCAob3B0aW9ucykgPT4ge1xyXG4gICAgICBzd2l0Y2ggKG9wdGlvbnMuYnV0dG9uKSB7XHJcbiAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgdGhpcy5fb25BbmNob3JSaWdodENsaWNrLmNhbGwodGhpcywgb3B0aW9ucyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICB0aGlzLl9vbkFuY2hvck1pZGRsZUNsaWNrLmNhbGwodGhpcywgb3B0aW9ucyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIHRoaXMuX29uQW5jaG9yTGVmdENsaWNrLmNhbGwodGhpcywgb3B0aW9ucyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gYXA7XHJcbiAgfVxyXG5cclxuICAvLyBTaG91bGQgYmUgaW1wbGVtZW50ZWQgYnkgRXh0ZW5kaW5nIENsYXNzZXNcclxuICAvKiBlc2xpbnQtZGlzYWJsZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzICovXHJcbiAgX29uQW5jaG9yTGVmdENsaWNrKC8qIG9wdGlvbnMgKi8pIHt9XHJcblxyXG4gIF9vbkFuY2hvck1pZGRsZUNsaWNrKC8qIG9wdGlvbnMgKi8pIHt9XHJcblxyXG4gIF9vbkFuY2hvclJpZ2h0Q2xpY2soLyogb3B0aW9ucyAqLykge31cclxuXHJcbiAgLyogZXNsaW50LWRpc2FibGUgY2xhc3MtbWV0aG9kcy11c2UtdGhpcyAqL1xyXG59XHJcbiIsImNvbnN0IHsgZmFicmljIH0gPSB3aW5kb3c7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9jZXNzR3JhcGgge1xyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQHBhcmFtIG9wdGlvbnNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Q2FudmFzfSBvcHRpb25zLmNhbnZhcyAtIEZhYnJpY0pTLkNhbnZhcyBpbnN0YW5jZSAtIG1hbmRhdG9yeSBpZiBvcHRpb25zLmNhbnZhc09wdHMgbm90IHByb3ZpZGVkLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuY2FudmFzT3B0cyAtIEZhYnJpY0pTLkNhbnZhcyNpbml0aWFsaXplIHBhcmFtZXRlcnMgLSBtYW5kYXRvcnkgaWYgb3B0aW9ucy5jYW52YXMgbm90IHByb3ZpZGVkXHJcbiAgICogICAgICAgICAgICAgICAgIFNlZSBodHRwOi8vZmFicmljanMuY29tL2RvY3MvZmFicmljLkNhbnZhcy5odG1sI2luaXRpYWxpemUgZm9yIGRldGFpbHNcclxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fFN0cmluZ30gb3B0aW9ucy5jYW52YXMuZWwgLSA8Y2FudmFzPiBlbGVtZW50IHRvIGluaXRpYWxpemUgaW5zdGFuY2Ugb25cclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5jYW52YXMub3B0aW9ucyAtIE9wdGlvbnMgb2JqZWN0XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZ3JpZF0gLSBkaW1lbnNpb25zIG9mIHRoZSBncmlkXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgdGhpcy5oYW5kbGVycyA9IHtcclxuICAgICAgZ3JpZDoge30sXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEluaXRpYWxpemUgQ2FudmFzXHJcbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLmNhbnZhcyA9IG9wdGlvbnMuY2FudmFzID8gb3B0aW9ucy5jYW52YXMgOiBuZXcgZmFicmljLkNhbnZhcyhvcHRpb25zLmNhbnZhc09wdHMuZWwsIG9wdGlvbnMuY2FudmFzT3B0cy5vcHRpb25zKTtcclxuICAgIGNhbnZhcy5zZXQoJ3ByZXNlcnZlT2JqZWN0U3RhY2tpbmcnLCB0cnVlKTtcclxuICAgIC8vIGNhbnZhcy5zZXQoJ3JlbmRlck9uQWRkUmVtb3ZlJywgZmFsc2UpO1xyXG4gICAgY2FudmFzLnNldCgnZmlyZVJpZ2h0Q2xpY2snLCB0cnVlKTtcclxuICAgIGNhbnZhcy5zZXQoJ2ZpcmVNaWRkbGVDbGljaycsIHRydWUpO1xyXG4gICAgY2FudmFzLnNldCgnc3RvcENvbnRleHRNZW51JywgdHJ1ZSk7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmdyaWQgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIHRoaXMuc2V0R3JpZCh7XHJcbiAgICAgICAgZ3JpZDogb3B0aW9ucy5ncmlkLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBmYWJyaWMuT2JqZWN0LnByb3RvdHlwZS5vcmlnaW5YID0gZmFicmljLk9iamVjdC5wcm90b3R5cGUub3JpZ2luWSA9ICdjZW50ZXInO1xyXG4gICAgZmFicmljLk9iamVjdC5wcm90b3R5cGUudG9nZ2xlT3BhY2l0eSA9IGZ1bmN0aW9uIHRvZ2dsZU9wYWNpdHkob3BhY2l0eS8qICwgdGltZW91dCAqLykge1xyXG4gICAgICAvLyB0aGlzLmFuaW1hdGUoJ29wYWNpdHknLCBvcGFjaXR5LCB7XHJcbiAgICAgIC8vICAgZHVyYXRpb246IHRpbWVvdXQgIT09IHVuZGVmaW5lZCA/IHRpbWVvdXQgOiAzMDAsXHJcbiAgICAgIC8vICAgb25DaGFuZ2U6IHRoaXMuY2FudmFzLnJlbmRlckFsbC5iaW5kKHRoaXMuY2FudmFzKSxcclxuICAgICAgLy8gfSk7XHJcbiAgICAgIHRoaXMuc2V0KCdvcGFjaXR5Jywgb3BhY2l0eSk7XHJcbiAgICAgIHRoaXMuY2FudmFzLnJlbmRlckFsbCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjYW52YXMuY2FsY09mZnNldCgpO1xyXG5cclxuICAgIC8vIFByZXZlbnQgbm9uIExpbmthYmxlU2hhcGUgb2JqZWN0cyB0byBiZSBncm91cGVkIGR1cmluZyBzZWxlY3Rpb25cclxuICAgIGNvbnN0IG9uU2VsZWN0aW9uID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCBhY3RpdmUgPSBjYW52YXMuZ2V0QWN0aXZlT2JqZWN0KCk7XHJcbiAgICAgIC8vIFdoZW4gbXVsdGkgc2VsZWN0aW9uLCByZW1vdmUgYW55IG5vbiBMaW5rYWJsZSBTaGFwZSBvYmplY3RzXHJcbiAgICAgIGlmIChhY3RpdmUudHlwZSA9PT0gJ2FjdGl2ZVNlbGVjdGlvbicpIHtcclxuICAgICAgICBjb25zdCBvYmplY3RzID0gYWN0aXZlLmdldE9iamVjdHMoKTtcclxuICAgICAgICBpZiAob2JqZWN0cy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICBjb25zdCBvbmx5UmVjdCA9IG9iamVjdHMuZmlsdGVyKChvKSA9PiBvLnR5cGUgPT09ICdsaW5rYWJsZVNoYXBlJyk7XHJcbiAgICAgICAgICBjYW52YXMuX2Rpc2NhcmRBY3RpdmVPYmplY3QoKTtcclxuICAgICAgICAgIGNvbnN0IHNlbCA9IG5ldyBmYWJyaWMuQWN0aXZlU2VsZWN0aW9uKG9ubHlSZWN0LCB7XHJcbiAgICAgICAgICAgIGNhbnZhcyxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgY2FudmFzLl9zZXRBY3RpdmVPYmplY3Qoc2VsKTtcclxuXHJcbiAgICAgICAgICAvLyBVcGRhdGUgYW55IGxpbmtzIGNvbm5lY3RlZCB0byB0aGUgTGlua2FibGUgU2hhcGVcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY2FudmFzLm9uKHtcclxuICAgICAgJ3NlbGVjdGlvbjpjcmVhdGVkJzogb25TZWxlY3Rpb24sXHJcbiAgICAgICdzZWxlY3Rpb246dXBkYXRlZCc6IG9uU2VsZWN0aW9uLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgY2FudmFzIHRvIGhhdmUgYSBncmlkLlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuZ3JpZCAtIGdyaWQgc3BhY2luZyAocGl4ZWxzKVxyXG4gICAqL1xyXG4gIHNldEdyaWQob3B0aW9ucykge1xyXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmdyaWQgIT09ICdudW1iZXInIHx8IG9wdGlvbnMuZ3JpZCA8IDApIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50IFwiZ3JpZFwiIGluIFByb2Nlc3NHcmFwI3NldEdyaWQuIChyZXF1aXJlZDogTnVtYmVyID4gMCknKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmdyaWQgPSBvcHRpb25zLmdyaWQ7XHJcbiAgICBjb25zdCB7IGNhbnZhcyB9ID0gdGhpcztcclxuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLW11bHRpLXN0ciAqL1xyXG4gICAgY29uc3QgZGF0YSA9IGA8c3ZnIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+IFxcXHJcbiAgICAgICAgPGRlZnM+IFxcXHJcbiAgICAgICAgICAgIDxwYXR0ZXJuIGlkPVwic21hbGxHcmlkXCIgd2lkdGg9XCIke3RoaXMuZ3JpZH1cIiBoZWlnaHQ9XCIke3RoaXMuZ3JpZH1cIiBwYXR0ZXJuVW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiPiBcXFxyXG4gICAgICAgICAgICAgICAgPHBhdGggZD1cIk0gJHt0aGlzLmdyaWR9IDAgTCAwIDAgMCAke3RoaXMuZ3JpZH1cIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImdyYXlcIiBzdHJva2Utd2lkdGg9XCIwLjVcIiAvPiBcXFxyXG4gICAgICAgICAgICA8L3BhdHRlcm4+IFxcXHJcbiAgICAgICAgICAgIDxwYXR0ZXJuIGlkPVwiZ3JpZFwiIHdpZHRoPVwiJHt0aGlzLmdyaWQgKiA1fVwiIGhlaWdodD1cIiR7dGhpcy5ncmlkICogNX1cIiBwYXR0ZXJuVW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiPiBcXFxyXG4gICAgICAgICAgICAgICAgPHJlY3Qgd2lkdGg9XCIke3RoaXMuZ3JpZCAqIDV9XCIgaGVpZ2h0PVwiJHt0aGlzLmdyaWQgKiA1fVwiIGZpbGw9XCJ1cmwoI3NtYWxsR3JpZClcIiAvPiBcXFxyXG4gICAgICAgICAgICAgICAgPHBhdGggZD1cIk0gJHt0aGlzLmdyaWQgKiA1fSAwIEwgMCAwIDAgJHt0aGlzLmdyaWQgKiA1fVwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiZ3JheVwiIHN0cm9rZS13aWR0aD1cIjFcIiAvPiBcXFxyXG4gICAgICAgICAgICA8L3BhdHRlcm4+IFxcXHJcbiAgICAgICAgPC9kZWZzPiBcXFxyXG4gICAgICAgIDxyZWN0IHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiBmaWxsPVwidXJsKCNncmlkKVwiIC8+IFxcXHJcbiAgICA8L3N2Zz5gO1xyXG4gICAgLyogZXNsaW50LWVuYWJsZSBuby1tdWx0aS1zdHIgKi9cclxuXHJcbiAgICBjb25zdCBET01VUkwgPSB3aW5kb3cuVVJMIHx8IHdpbmRvdy53ZWJraXRVUkwgfHwgd2luZG93O1xyXG4gICAgY29uc3Qgc3ZnID0gbmV3IEJsb2IoW2RhdGFdLCB7IHR5cGU6ICdpbWFnZS9zdmcreG1sO2NoYXJzZXQ9dXRmLTgnIH0pO1xyXG4gICAgY29uc3QgdXJsID0gRE9NVVJMLmNyZWF0ZU9iamVjdFVSTChzdmcpO1xyXG4gICAgZmFicmljLnV0aWwubG9hZEltYWdlKHVybCwgKGltZykgPT4ge1xyXG4gICAgICBjb25zdCBiZyA9IG5ldyBmYWJyaWMuUmVjdCh7XHJcbiAgICAgICAgd2lkdGg6IGNhbnZhcy53aWR0aCwgaGVpZ2h0OiBjYW52YXMuaGVpZ2h0LCBldmVudGVkOiBmYWxzZSwgc2VsZWN0YWJsZTogZmFsc2UsXHJcbiAgICAgIH0pO1xyXG4gICAgICBiZy5maWxsID0gbmV3IGZhYnJpYy5QYXR0ZXJuKHsgc291cmNlOiBpbWcgfSxcclxuICAgICAgICAoKCkgPT4geyBiZy5kaXJ0eSA9IHRydWU7IGNhbnZhcy5yZXF1ZXN0UmVuZGVyQWxsKCk7IH0pKTtcclxuICAgICAgYmcuY2FudmFzID0gY2FudmFzO1xyXG4gICAgICBjYW52YXMuc2V0KCdiYWNrZ3JvdW5kSW1hZ2UnLCBiZyk7XHJcblxyXG4gICAgICAvLyBTbmFwIHRvIGdyaWQgZWZmZWN0c1xyXG4gICAgICBjYW52YXMub2ZmKHRoaXMuaGFuZGxlcnMuZ3JpZCk7XHJcbiAgICAgIHRoaXMuaGFuZGxlcnMuZ3JpZCA9IHtcclxuICAgICAgICAnb2JqZWN0Om1vdmluZyc6IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgeyBncmlkIH0gPSB0aGlzO1xyXG4gICAgICAgICAgY29uc3QgeyB0YXJnZXQgfSA9IGV2ZW50O1xyXG4gICAgICAgICAgaWYgKHRhcmdldC50eXBlICE9PSAnbGlua2FibGVTaGFwZScpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZXZlbnQudGFyZ2V0LnNldCh7XHJcbiAgICAgICAgICAgIGxlZnQ6IE1hdGgucm91bmQoZXZlbnQudGFyZ2V0LmxlZnQgLyBncmlkKSAqIGdyaWQsXHJcbiAgICAgICAgICAgIHRvcDogTWF0aC5yb3VuZChldmVudC50YXJnZXQudG9wIC8gZ3JpZCkgKiBncmlkLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAnb2JqZWN0OnNjYWxpbmcnOiAoZXZlbnQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHsgZ3JpZCB9ID0gdGhpcztcclxuICAgICAgICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBldmVudDtcclxuXHJcbiAgICAgICAgICBpZiAodGFyZ2V0LnR5cGUgIT09ICdsaW5rYWJsZVNoYXBlJykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc3QgdyA9IHRhcmdldC53aWR0aCAqIHRhcmdldC5zY2FsZVg7XHJcbiAgICAgICAgICBjb25zdCBoID0gdGFyZ2V0LmhlaWdodCAqIHRhcmdldC5zY2FsZVk7XHJcbiAgICAgICAgICBjb25zdCBzbmFwID0geyAvLyBDbG9zZXN0IHNuYXBwaW5nIHBvaW50c1xyXG4gICAgICAgICAgICB0b3A6IE1hdGgucm91bmQodGFyZ2V0LnRvcCAvIGdyaWQpICogZ3JpZCxcclxuICAgICAgICAgICAgbGVmdDogTWF0aC5yb3VuZCh0YXJnZXQubGVmdCAvIGdyaWQpICogZ3JpZCxcclxuICAgICAgICAgICAgYm90dG9tOiBNYXRoLnJvdW5kKCh0YXJnZXQudG9wICsgaCkgLyBncmlkKSAqIGdyaWQsXHJcbiAgICAgICAgICAgIHJpZ2h0OiBNYXRoLnJvdW5kKCh0YXJnZXQubGVmdCArIHcpIC8gZ3JpZCkgKiBncmlkLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIGNvbnN0IHRocmVzaG9sZCA9IGdyaWQ7XHJcbiAgICAgICAgICBjb25zdCBkaXN0ID0geyAvLyBEaXN0YW5jZSBmcm9tIHNuYXBwaW5nIHBvaW50c1xyXG4gICAgICAgICAgICB0b3A6IE1hdGguYWJzKHNuYXAudG9wIC0gdGFyZ2V0LnRvcCksXHJcbiAgICAgICAgICAgIGxlZnQ6IE1hdGguYWJzKHNuYXAubGVmdCAtIHRhcmdldC5sZWZ0KSxcclxuICAgICAgICAgICAgYm90dG9tOiBNYXRoLmFicyhzbmFwLmJvdHRvbSAtIHRhcmdldC50b3AgLSBoKSxcclxuICAgICAgICAgICAgcmlnaHQ6IE1hdGguYWJzKHNuYXAucmlnaHQgLSB0YXJnZXQubGVmdCAtIHcpLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIGNvbnN0IGF0dHJzID0ge1xyXG4gICAgICAgICAgICBzY2FsZVg6IHRhcmdldC5zY2FsZVgsXHJcbiAgICAgICAgICAgIHNjYWxlWTogdGFyZ2V0LnNjYWxlWSxcclxuICAgICAgICAgICAgdG9wOiB0YXJnZXQudG9wLFxyXG4gICAgICAgICAgICBsZWZ0OiB0YXJnZXQubGVmdCxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBzd2l0Y2ggKHRhcmdldC5fX2Nvcm5lcikge1xyXG4gICAgICAgICAgICBjYXNlICd0bCc6XHJcbiAgICAgICAgICAgICAgaWYgKGRpc3QubGVmdCA8IGRpc3QudG9wICYmIGRpc3QubGVmdCA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVYID0gKHcgLSAoc25hcC5sZWZ0IC0gdGFyZ2V0LmxlZnQpKSAvIHRhcmdldC53aWR0aDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWSA9IChhdHRycy5zY2FsZVggLyB0YXJnZXQuc2NhbGVYKSAqIHRhcmdldC5zY2FsZVk7XHJcbiAgICAgICAgICAgICAgICBhdHRycy50b3AgPSB0YXJnZXQudG9wICsgKGggLSB0YXJnZXQuaGVpZ2h0ICogYXR0cnMuc2NhbGVZKTtcclxuICAgICAgICAgICAgICAgIGF0dHJzLmxlZnQgPSBzbmFwLmxlZnQ7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChkaXN0LnRvcCA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVZID0gKGggLSAoc25hcC50b3AgLSB0YXJnZXQudG9wKSkgLyB0YXJnZXQuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVYID0gKGF0dHJzLnNjYWxlWSAvIHRhcmdldC5zY2FsZVkpICogdGFyZ2V0LnNjYWxlWDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLmxlZnQgKz0gKHcgLSB0YXJnZXQud2lkdGggKiBhdHRycy5zY2FsZVgpO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMudG9wID0gc25hcC50b3A7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtdCc6XHJcbiAgICAgICAgICAgICAgaWYgKGRpc3QudG9wIDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoaCAtIChzbmFwLnRvcCAtIHRhcmdldC50b3ApKSAvIHRhcmdldC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBhdHRycy50b3AgPSBzbmFwLnRvcDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RyJzpcclxuICAgICAgICAgICAgICBpZiAoZGlzdC5yaWdodCA8IGRpc3QudG9wICYmIGRpc3QucmlnaHQgPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWCA9IChzbmFwLnJpZ2h0IC0gdGFyZ2V0LmxlZnQpIC8gdGFyZ2V0LndpZHRoO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVZID0gKGF0dHJzLnNjYWxlWCAvIHRhcmdldC5zY2FsZVgpICogdGFyZ2V0LnNjYWxlWTtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnRvcCA9IHRhcmdldC50b3AgKyAoaCAtIHRhcmdldC5oZWlnaHQgKiBhdHRycy5zY2FsZVkpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlzdC50b3AgPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWSA9IChoIC0gKHNuYXAudG9wIC0gdGFyZ2V0LnRvcCkpIC8gdGFyZ2V0LmhlaWdodDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWCA9IChhdHRycy5zY2FsZVkgLyB0YXJnZXQuc2NhbGVZKSAqIHRhcmdldC5zY2FsZVg7XHJcbiAgICAgICAgICAgICAgICBhdHRycy50b3AgPSBzbmFwLnRvcDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ21sJzpcclxuICAgICAgICAgICAgICBpZiAoZGlzdC5sZWZ0IDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVggPSAodyAtIChzbmFwLmxlZnQgLSB0YXJnZXQubGVmdCkpIC8gdGFyZ2V0LndpZHRoO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMubGVmdCA9IHNuYXAubGVmdDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ21yJzpcclxuICAgICAgICAgICAgICBpZiAoZGlzdC5yaWdodCA8IHRocmVzaG9sZCkgYXR0cnMuc2NhbGVYID0gKHNuYXAucmlnaHQgLSB0YXJnZXQubGVmdCkgLyB0YXJnZXQud2lkdGg7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsJzpcclxuICAgICAgICAgICAgICBpZiAoZGlzdC5sZWZ0IDwgZGlzdC5ib3R0b20gJiYgZGlzdC5sZWZ0IDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVggPSAodyAtIChzbmFwLmxlZnQgLSB0YXJnZXQubGVmdCkpIC8gdGFyZ2V0LndpZHRoO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVZID0gKGF0dHJzLnNjYWxlWCAvIHRhcmdldC5zY2FsZVgpICogdGFyZ2V0LnNjYWxlWTtcclxuICAgICAgICAgICAgICAgIGF0dHJzLmxlZnQgPSBzbmFwLmxlZnQ7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChkaXN0LmJvdHRvbSA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVZID0gKHNuYXAuYm90dG9tIC0gdGFyZ2V0LnRvcCkgLyB0YXJnZXQuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVYID0gKGF0dHJzLnNjYWxlWSAvIHRhcmdldC5zY2FsZVkpICogdGFyZ2V0LnNjYWxlWDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLmxlZnQgKz0gKHcgLSB0YXJnZXQud2lkdGggKiBhdHRycy5zY2FsZVgpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbWInOlxyXG4gICAgICAgICAgICAgIGlmIChkaXN0LmJvdHRvbSA8IHRocmVzaG9sZCkgYXR0cnMuc2NhbGVZID0gKHNuYXAuYm90dG9tIC0gdGFyZ2V0LnRvcCkgLyB0YXJnZXQuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdicic6XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgaWYgKGRpc3QucmlnaHQgPCBkaXN0LmJvdHRvbSAmJiBkaXN0LnJpZ2h0IDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVggPSAoc25hcC5yaWdodCAtIHRhcmdldC5sZWZ0KSAvIHRhcmdldC53aWR0aDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWSA9IChhdHRycy5zY2FsZVggLyB0YXJnZXQuc2NhbGVYKSAqIHRhcmdldC5zY2FsZVk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChkaXN0LmJvdHRvbSA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVZID0gKHNuYXAuYm90dG9tIC0gdGFyZ2V0LnRvcCkgLyB0YXJnZXQuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVYID0gKGF0dHJzLnNjYWxlWSAvIHRhcmdldC5zY2FsZVkpICogdGFyZ2V0LnNjYWxlWDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0YXJnZXQuc2V0KGF0dHJzKTtcclxuICAgICAgICAgIHRhcmdldC5zZXRDb29yZHMoKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9O1xyXG4gICAgICBpZiAodGhpcy5ncmlkID4gMCkge1xyXG4gICAgICAgIGNhbnZhcy5vbih0aGlzLmhhbmRsZXJzLmdyaWQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19
