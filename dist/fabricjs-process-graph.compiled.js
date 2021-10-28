(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _ProcessGraph = _interopRequireDefault(require("./src/ProcessGraph.js"));

var _LinkableShape = _interopRequireDefault(require("./src/LinkableShape.js"));

var _Container = _interopRequireDefault(require("./src/Container.js"));

var _ExpandableContainer = _interopRequireDefault(require("./src/ExpandableContainer.js"));

var _Link = _interopRequireDefault(require("./src/Link.js"));

var _CurvedLink = _interopRequireDefault(require("./src/CurvedLink.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import '@babel/polyfill';
window.pg = {
  ProcessGraph: _ProcessGraph["default"],
  LinkableShape: _LinkableShape["default"],
  Container: _Container["default"],
  ExpandableContainer: _ExpandableContainer["default"],
  Link: _Link["default"],
  CurvedLink: _CurvedLink["default"]
};

},{"./src/Container.js":2,"./src/CurvedLink.js":3,"./src/ExpandableContainer.js":4,"./src/Link.js":5,"./src/LinkableShape.js":6,"./src/ProcessGraph.js":7}],2:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _LinkableShape2 = _interopRequireDefault(require("./LinkableShape.js"));

var _CurvedLink = _interopRequireDefault(require("./CurvedLink.js"));

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
            newOptions.y = top;
            newOptions.x = left + width + spacing;
            break;
          }

        case 'west':
          {
            targetCardinal = 'east';
            newOptions.y = top;
            newOptions.x = left - width - spacing;
            break;
          }

        case 'north':
          {
            targetCardinal = 'south';
            newOptions.y = top - height - spacing;
            newOptions.x = left;
            break;
          }

        case 'south':
          {
            targetCardinal = 'north';
            newOptions.y = top + height + spacing;
            newOptions.x = left;
            break;
          }

        case 'northeast':
          {
            targetCardinal = 'southwest';
            newOptions.y = top - height - spacing;
            newOptions.x = left + width + spacing;
            break;
          }

        case 'northwest':
          {
            targetCardinal = 'southeast';
            newOptions.y = top - height - spacing;
            newOptions.x = left - width - spacing;
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
            newOptions.y = top + height + spacing;
            newOptions.x = left - width - spacing;
            break;
          }
      }

      nextContainer.move(newOptions); // nextContainer.rotate(angle);

      var newLink = new _CurvedLink["default"]({
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
      newLink.connectLink('start', ap.shapeId, ap.cardinal);
      newLink.connectLink('end', nextContainer.anchors[targetCardinal].shapeId, nextContainer.anchors[targetCardinal].cardinal);
    }
  }, {
    key: "_onAnchorLeftClick",
    value: function _onAnchorLeftClick(options) {
      var _this2 = this;

      var ap = options.target;
      var canvas = this.canvas; // Disable the multi selection when moving mouse

      this.canvas.selection = false;
      var oppositeCardinal = {
        east: 'west',
        west: 'east',
        north: 'south',
        south: 'north'
      };
      var newLink = new _CurvedLink["default"]({
        canvas: canvas,
        start: {
          x: ap.left,
          y: ap.top,
          direction: ap.cardinal
        },
        end: {
          x: ap.left,
          y: ap.top,
          direction: oppositeCardinal[ap.cardinal]
        }
      });
      newLink.inject(canvas);
      newLink.connectLink('start', ap.shapeId, ap.cardinal);
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
      };

      canvas.on('mouse:up', onMouseClick);
    }
  }]);

  return Container;
}(_LinkableShape2["default"]);

exports["default"] = Container;

},{"./CurvedLink.js":3,"./LinkableShape.js":6}],3:[function(require,module,exports){
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

var CurvedLink = /*#__PURE__*/function () {
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
  function CurvedLink(options) {
    var _this = this;

    _classCallCheck(this, CurvedLink);

    var id = options.id,
        canvas = options.canvas;
    this.id = id;
    this.canvas = canvas;
    this.direction = {
      start: options && options.start && options.start.direction ? options.start.direction : 'east',
      end: options && options.end && options.end.direction ? options.end.direction : 'west'
    };
    var start = {
      x: options && options.start && options.start.x ? options.start.x : 0,
      y: options && options.start && options.start.y ? options.start.y : 0
    };
    var end = {
      x: options && options.end && options.end.x ? options.end.x : 0,
      y: options && options.end && options.end.y ? options.end.y : 0
    }; // Path, a bezier cubic curve

    var _this$computePathCoor = this.computePathCoords({
      start: {
        x: start.x,
        y: start.y,
        direction: this.direction.start
      },
      end: {
        x: end.x,
        y: end.y,
        direction: this.direction.end
      }
    }),
        pathCoordsArray = _this$computePathCoor.pathCoordsArray;

    var pathOpts = this.defaultPathOptions = {
      fill: '',
      stroke: options.custom && options.custom.path && options.custom.path.stroke ? options.custom.path.stroke : '#999',
      strokeWidth: options.custom && options.custom.path && options.custom.path.strokeWidth ? options.custom.path.strokeWidth : 2,
      objectCaching: false,
      selectable: true,
      hasBorders: true,
      hasControls: false,
      perPixelTargetFind: true
    };
    var path = new fabric.Path(pathCoordsArray, pathOpts);
    this.path = path; // End point (arrowHead)

    var isValidMaskOpts = {
      objectCaching: false,
      left: 0,
      top: 0,
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
      hasControls: false
    };
    var arrowHead = this.arrowHead = new fabric.Triangle(arrowHeadOpts);
    this.isValidHeadConnectionMask = new fabric.Circle(isValidMaskOpts);
    arrowHead.on('moving', function () {
      _this.updatePath({
        end: {
          x: arrowHead.left,
          y: arrowHead.top
        },
        commit: false
      });

      _this._checkExtremityCanBeConnected('end');
    });
    arrowHead.on('moved', function () {
      _this.updatePath({
        end: {
          x: arrowHead.left,
          y: arrowHead.top
        },
        commit: true
      });

      _this.isValidHeadConnectionMask.set('opacity', 0);

      _this._connectDisconnectExtremity('end');
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
      hasControls: false
    };
    var arrowTail = this.arrowTail = new fabric.Rect(arrowTailOpts);
    this.isValidTailConnectionMask = new fabric.Circle(isValidMaskOpts);
    arrowTail.on('moving', function () {
      _this.updatePath({
        start: {
          x: arrowTail.left,
          y: arrowTail.top
        },
        commit: false
      });

      _this._checkExtremityCanBeConnected('start');
    });
    arrowTail.on('moved', function () {
      _this.updatePath({
        start: {
          x: arrowTail.left,
          y: arrowTail.top
        },
        commit: true
      });

      _this.isValidTailConnectionMask.set('opacity', 0);

      _this._connectDisconnectExtremity('start');
    });
    arrowTail.on('mousedown', function () {
      _this.bringToFront();

      _this.toggleAllAnchorsOpacity(1);

      arrowTail.on('mouseup', function () {
        _this.toggleAllAnchorsOpacity(0);
      });
    });
  }

  _createClass(CurvedLink, [{
    key: "inject",
    value: function inject() {
      var id = this.id,
          canvas = this.canvas,
          path = this.path,
          arrowHead = this.arrowHead,
          arrowTail = this.arrowTail,
          isValidTailConnectionMask = this.isValidTailConnectionMask,
          isValidHeadConnectionMask = this.isValidHeadConnectionMask;
      canvas.add(isValidTailConnectionMask);
      canvas.add(isValidHeadConnectionMask);
      canvas.add(arrowHead);
      canvas.add(arrowTail);
      canvas.add(path);
      this.updatePath({
        start: {
          x: path.path[0][1],
          y: path.path[0][2]
        },
        end: {
          x: path.path[2][5],
          y: path.path[2][6]
        },
        commit: true
      });
      canvas.links[id] = this;
      return this;
    }
  }, {
    key: "remove",
    value: function remove() {
      var id = this.id,
          canvas = this.canvas,
          path = this.path,
          arrowHead = this.arrowHead,
          arrowTail = this.arrowTail,
          isValidTailConnectionMask = this.isValidTailConnectionMask,
          isValidHeadConnectionMask = this.isValidHeadConnectionMask;
      canvas.remove(isValidTailConnectionMask);
      canvas.remove(isValidHeadConnectionMask);
      canvas.remove(arrowHead);
      canvas.remove(arrowTail);
      canvas.remove(path);
      delete canvas.links[id];
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

      this.direction[linkPoint] = cardinal;
      this[linkPoint] = {
        shape: shape,
        anchor: cardinal,
        handlers: {
          onAnchorPositionModifying: function onAnchorPositionModifying() {
            var opts = {
              commit: false
            };
            opts[linkPoint] = {
              x: shape.anchors[cardinal].left,
              y: shape.anchors[cardinal].top
            };

            _this2.updatePath(opts);
          },
          onAnchorPositionModified: function onAnchorPositionModified() {
            var opts = {
              commit: true
            };
            opts[linkPoint] = {
              x: shape.anchors[cardinal].left,
              y: shape.anchors[cardinal].top
            };

            _this2.updatePath(opts);
          }
        }
      }; // shape.anchors[cardinal].opacity = 0;

      shape.anchors[cardinal].on('pg:position:modifying', this[linkPoint].handlers.onAnchorPositionModifying);
      shape.anchors[cardinal].on('pg:position:modified', this[linkPoint].handlers.onAnchorPositionModified); // Update Link

      var opts = {
        commit: false
      };
      opts[linkPoint] = {
        x: shape.anchors[cardinal].left,
        y: shape.anchors[cardinal].top
      };
      this.updatePath(opts);
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
    key: "bringToFront",
    value: function bringToFront() {
      var canvas = this.canvas,
          path = this.path,
          arrowHead = this.arrowHead,
          arrowTail = this.arrowTail;
      canvas.bringToFront(path);
      canvas.bringToFront(arrowHead);
      canvas.bringToFront(arrowTail);
    }
  }, {
    key: "computePathCoords",
    value: function computePathCoords(options) {
      // Magie magie, et vos idées ont du génie !
      var start = {
        x: options.start.x,
        y: options.start.y,
        direction: options.start && options.start.direction ? options.start.direction : this.direction.start
      };
      var end = {
        x: options.end.x,
        y: options.end.y,
        direction: options.end && options.end.direction ? options.end.direction : this.direction.end
      }; // Center point
      // If Link is connected, center is calculated between the two linked shapes
      // If not, it is calculated between link start and end points

      var center = {
        x: (start.x + end.x) / 2,
        y: (start.y + end.y) / 2
      }; // COMMENTED: Doesn't work well when linked shape is rotated
      // if (this.start && this.end && start.direction !== end.direction) {
      //   center = {
      //     x: (this.start.shape.getCenterPoint().x + this.end.shape.getCenterPoint().x) / 2,
      //     y: (this.start.shape.getCenterPoint().y + this.end.shape.getCenterPoint().y) / 2,
      //   };
      // }

      var controls = {
        start: {
          x: start.x,
          y: start.y
        },
        end: {
          x: end.x,
          y: end.y
        },
        center1: {
          x: center.x,
          y: center.y
        },
        center2: {
          x: center.x,
          y: center.y
        }
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
        var deltaX = 40;
        var deltaY = 40;

        if (start.direction === 'south' || start.direction === 'north') {
          // If link is connected to two shapes
          // If shapes are horizontally aligned (i.e. on top of each other), we move the Link center point a bit to the left
          if (this.start && this.end) {
            // If shapes are vertically aligned (i.e. next to each other), we move the Link center point a bit to the top
            if (Math.abs(start.y - end.y) < 10) {
              center.x -= (this.start.shape.width + this.end.shape.width) / 2;
            }
          }

          center.y += start.direction === 'south' ? deltaY : -deltaY;
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
              center.y -= (this.start.shape.height + this.end.shape.height) / 2;
            }
          }

          center.x += start.direction === 'east' ? deltaX : -deltaX;
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
      } // If link is connected to linked shapes and they are rotated, perform the rotation on the controls points
      // TODO: to improve


      if (this.start && this.start.shape && this.start.shape.angle) {
        var angle = this.start.shape.angle * Math.PI / 180;
        var control = new fabric.Point(controls.start.x, controls.start.y);
        var origin = new fabric.Point(start.x, start.y);
        var rotatedControl = fabric.util.rotatePoint(control, origin, angle);
        controls.start.x = rotatedControl.x;
        controls.start.y = rotatedControl.y;
      }

      if (this.end && this.end.shape && this.end.shape.angle) {
        var _angle = this.end.shape.angle * Math.PI / 180;

        var _control = new fabric.Point(controls.end.x, controls.end.y);

        var _origin = new fabric.Point(end.x, end.y);

        var _rotatedControl = fabric.util.rotatePoint(_control, _origin, _angle);

        controls.end.x = _rotatedControl.x;
        controls.end.y = _rotatedControl.y;
      } // Visual debug
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


      var coords = {
        start: {
          x: start.x,
          y: start.y
        },
        end: {
          x: end.x,
          y: end.y
        },
        center: center,
        controls: {
          start: {
            x: controls.start.x,
            y: controls.start.y
          },
          end: {
            x: controls.end.x,
            y: controls.end.y
          },
          center1: {
            x: controls.center1.x,
            y: controls.center1.y
          },
          center2: {
            x: controls.center2.x,
            y: controls.center2.y
          }
        }
      };
      var pathCoordsArray = [['M', coords.start.x, coords.start.y], ['C', coords.controls.start.x, coords.controls.start.y, coords.controls.center1.x, coords.controls.center1.y, coords.center.x, coords.center.y], ['C', coords.controls.center2.x, coords.controls.center2.y, coords.controls.end.x, coords.controls.end.y, coords.end.x, coords.end.y]];
      return {
        pathCoords: coords,
        pathCoordsArray: pathCoordsArray
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

  }, {
    key: "updatePath",
    value: function updatePath(options) {
      var start = {
        x: options.start && options.start.x ? options.start.x : this.path.path[0][1],
        y: options.start && options.start.y ? options.start.y : this.path.path[0][2],
        direction: options.start && options.start.direction ? options.start.direction : this.direction.start
      };
      var end = {
        x: options.end && options.end.x ? options.end.x : this.path.path[2][5],
        y: options.end && options.end.y ? options.end.y : this.path.path[2][6],
        direction: options.end && options.end.direction ? options.end.direction : this.direction.end
      };

      var _this$computePathCoor2 = this.computePathCoords({
        start: start,
        end: end
      }),
          pathCoordsArray = _this$computePathCoor2.pathCoordsArray;

      if (options.commit) {
        var newPath = new fabric.Path(pathCoordsArray, this.defaultPathOptions);
        this.canvas.remove(this.path);
        this.canvas.add(newPath);
        newPath.on('mousedown', this.bringToFront.bind(this));
        newPath.on('moving', this.onLinkMoving.bind(this));
        newPath.on('moved', this.onLinkMoved.bind(this));
        var toBind = [this.arrowHead, this.arrowTail];
        var bossTransform = newPath.calcTransformMatrix();
        var invertedBossTransform = fabric.util.invertTransform(bossTransform);
        toBind.forEach(function (o) {
          var desiredTransform = fabric.util.multiplyTransformMatrices(invertedBossTransform, o.calcTransformMatrix()); // eslint-disable-next-line no-param-reassign

          o.relationship = desiredTransform;
        });
        this.path = newPath;
      } else {
        this.path.set('path', pathCoordsArray);
      } // Update control lines, arrow heads and tails


      var arrowHeadAngle = Math.atan2(this.path.path[2][6] - this.path.path[2][4], this.path.path[2][5] - this.path.path[2][3]) * 180 / Math.PI;
      this.arrowHead.angle = arrowHeadAngle + 90;
      this.arrowHead.left = this.path.path[2][5];
      this.arrowHead.top = this.path.path[2][6];
      this.arrowHead.setCoords();
      this.arrowTail.left = this.path.path[0][1];
      this.arrowTail.top = this.path.path[0][2];
      this.arrowTail.setCoords();
      this.bringToFront();
    }
  }, {
    key: "isValidConnection",
    value: function isValidConnection(linkPoint, shapeId, cardinal) {
      var shape = this.canvas.getObjects().find(function (o) {
        return o.id === shapeId;
      }); // Check not already connected

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
  }, {
    key: "toggleAllAnchorsOpacity",
    value: function toggleAllAnchorsOpacity(opacity) {
      return; // eslint-disable-next-line no-unreachable

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
    key: "onLinkMoving",
    value: function onLinkMoving() {
      var _this3 = this;

      // Move start, end, control points altogether with the Path
      var toUpdate = [this.arrowHead, this.arrowTail];
      var keepHeadAngle = this.arrowHead.angle;
      var keepTailAngle = this.arrowTail.angle;
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
        o.set(opt); // eslint-disable-next-line no-param-reassign

        o.angle = o === _this3.arrowHead ? keepHeadAngle : keepTailAngle; // preserve previous angle

        o.setCoords();
      }); // Finally, check the start or end points can be connected.

      this._checkExtremityCanBeConnected('start');

      this._checkExtremityCanBeConnected('end');
    }
  }, {
    key: "onLinkMoved",
    value: function onLinkMoved() {
      // Reupdate the Path according end the new coordinates of all elements
      this.updatePath({
        start: {
          x: this.arrowTail.left,
          y: this.arrowTail.top
        },
        end: {
          x: this.arrowHead.left,
          y: this.arrowHead.top
        },
        commit: true
      }); // Connect or Disconnect depending on extremities positions

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

  }, {
    key: "_checkExtremityCanBeConnected",
    value: function _checkExtremityCanBeConnected(direction) {
      var canvas = this.canvas;
      var extremity;
      var mask;

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
      mask.set('opacity', 0); // Check if intersects with anchor

      var anchors = canvas.getObjects().filter(function (o) {
        return o.type === 'anchor';
      });

      for (var a = 0; a < anchors.length; a += 1) {
        if (extremity.intersectsWithObject(anchors[a])) {
          mask.set('opacity', 0.5);

          if (this.isValidConnection(direction, anchors[a].shapeId, anchors[a].cardinal)) {
            mask.set({
              stroke: '#57b857',
              fill: '#57b857'
            });
            var opts = {
              commit: false
            };
            opts[direction] = {
              x: extremity.left,
              y: extremity.top,
              direction: anchors[a].cardinal
            };
            this.updatePath(opts);
          } else {
            mask.set({
              stroke: '#ea4f37',
              fill: '#ea4f37'
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

  }, {
    key: "_connectDisconnectExtremity",
    value: function _connectDisconnectExtremity(direction) {
      var canvas = this.canvas;
      var extremity;

      if (direction === 'start') {
        extremity = this.arrowTail;
      } else if (direction === 'end') {
        extremity = this.arrowHead;
      } // Check if intersects with anchor


      var anchors = canvas.getObjects().filter(function (o) {
        return o.type === 'anchor';
      });

      for (var a = 0; a < anchors.length; a += 1) {
        if (extremity.intersectsWithObject(anchors[a])) {
          this.connectLink(direction, anchors[a].shapeId, anchors[a].cardinal); // anchors[a].set('stroke', '#000');
        } else if (this[direction] && anchors[a] === this[direction].shape.anchors[this[direction].anchor]) {
          // If this link was connected end this anchor and it doesn't intersect anymore
          this.disconnectLink(direction);
        }
      }
    }
  }]);

  return CurvedLink;
}();

exports["default"] = CurvedLink;

},{}],4:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _LinkableShape2 = _interopRequireDefault(require("./LinkableShape.js"));

var _CurvedLink = _interopRequireDefault(require("./CurvedLink.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

var ExpandableContainer = /*#__PURE__*/function (_LinkableShape) {
  _inherits(ExpandableContainer, _LinkableShape);

  var _super = _createSuper(ExpandableContainer);

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
  function ExpandableContainer(options) {
    var _this;

    _classCallCheck(this, ExpandableContainer);

    var group = new fabric.Group([], {
      left: options.left,
      top: options.top,
      originX: 'left',
      originY: 'top'
    });

    var newOptions = _.cloneDeep(_.omit(options, ['canvas', 'shape']));

    newOptions.canvas = options.canvas;
    newOptions.shape = group;
    _this = _super.call(this, newOptions);
    _this.shapes = {};
    _this.children = Array.isArray(options.children) ? options.children : [];
    _this.isExpanded = false;
    return _this;
  }

  _createClass(ExpandableContainer, [{
    key: "load",
    value: function () {
      var _load = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(isChild) {
        var _this2 = this;

        var options, shape, shapePos, padding, margin, rectOpts, imgOpts, rect, textOpts, oImg, text;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = this.options, shape = this.shape;
                this.isLoaded = false;
                shapePos = {
                  left: this.shape.left,
                  top: this.shape.top
                };
                padding = 10;
                margin = 10;
                rectOpts = {
                  left: 0,
                  top: 0,
                  originX: 'left',
                  originY: 'top',
                  strokeWidth: 1,
                  stroke: '#666',
                  fill: '#fff',
                  rx: 4,
                  ry: 4
                };

                if (isChild) {
                  rectOpts.width = options.width ? options.width : 70;
                  rectOpts.height = options.height ? options.height : 70; // imgOpts = {
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
                    height: 22
                  };
                } else {
                  imgOpts = {
                    originX: 'left',
                    originY: 'top',
                    left: padding,
                    top: padding,
                    width: 22,
                    height: 22
                  };
                  rectOpts.width = options.width ? options.width : 200;
                  rectOpts.height = options.height ? options.height : imgOpts.height + padding * 2;
                } // Create Rect shape


                rect = new fabric.Rect(rectOpts);
                this.shape.addWithUpdate(rect);
                this.shapes.rect = rect;

                if (!(this.options.img && this.options.img.src)) {
                  _context.next = 20;
                  break;
                }

                _context.next = 13;
                return this._loadImage(this.options.img.src);

              case 13:
                oImg = _context.sent;
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
                    styles: {},
                    fontSize: 14,
                    fontFamily: 'Helvetica',
                    textAlign: 'left',
                    splitByGrapheme: true,
                    originX: 'left',
                    originY: 'center',
                    left: padding + oImg.width + margin,
                    top: padding + oImg.height / 2,
                    width: rect.width - padding - oImg.width - margin * 2,
                    height: oImg.height
                  };
                } else {
                  // Align the text with the image
                  textOpts = {
                    styles: {},
                    fontSize: 14,
                    fontFamily: 'Helvetica',
                    textAlign: 'left',
                    splitByGrapheme: true,
                    originX: 'left',
                    originY: 'center',
                    left: padding + oImg.width + margin,
                    top: padding + oImg.height / 2,
                    width: rect.width - padding - oImg.width - margin * 2,
                    height: oImg.height
                  };
                }

                _context.next = 21;
                break;

              case 20:
                // Center the text in the rect
                textOpts = {
                  styles: {},
                  fontSize: 14,
                  fontFamily: 'Helvetica',
                  textAlign: 'center',
                  splitByGrapheme: true,
                  originX: 'center',
                  originY: 'center',
                  left: rect.width / 2,
                  top: rect.height / 2,
                  width: rectOpts.width - padding * 2,
                  height: rectOpts.height - padding * 2
                };

              case 21:
                // Create Textbox shape
                text = new fabric.Textbox(options.label, textOpts);

                if (!options.hideText) {
                  this.shape.addWithUpdate(text);
                }

                this.shapes.text = text; // Reposition the group accordingly

                this.shape.left = shapePos.left;
                this.shape.top = shapePos.top;
                this.shape.setCoords();
                this.canvas.renderAll(); // Set the shape as not selectable if it is a child

                if (isChild) {
                  this.shape.selectable = false;
                } // Remember initial options as collapsed


                this.initialOpts = {
                  rect: {
                    width: rectOpts.width,
                    height: rectOpts.height
                  },
                  child: {
                    width: options.childWidth ? options.childWidth : 70,
                    height: options.childHeight ? options.childHeight : 70 // width: options.childWidth ? options.childWidth : 52,
                    // height: options.childWidth ? options.childWidth : 52,

                  }
                }; // Construct children if this is a normal (parent) Container

                if (isChild) {
                  _context.next = 33;
                  break;
                }

                _context.next = 33;
                return this.constructChildren();

              case 33:
                shape.on({
                  scaling: function scaling() {
                    if (text) {
                      // When scaling, keep text same size as initial
                      if (shape.scaleX < 1) {
                        text.scaleX = 1 + (1 - shape.scaleX);
                      } else {
                        text.scaleX = 1 / shape.scaleX;
                      }

                      if (shape.scaleY < 1) {
                        text.scaleY = 1 + (1 - shape.scaleY);
                      } else {
                        text.scaleY = 1 / shape.scaleY;
                      }

                      _this2.canvas.renderAll();
                    }
                  },
                  mousedblclick: function mousedblclick() {
                    if (_this2.isExpanded) {
                      _this2.collapse();
                    } else {
                      _this2.expand();
                    }
                  }
                });
                this.isLoaded = true;
                return _context.abrupt("return", this);

              case 36:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function load(_x) {
        return _load.apply(this, arguments);
      }

      return load;
    }()
  }, {
    key: "_loadImage",
    value: function () {
      var _loadImage2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(src) {
        var url;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                url = src || this.options.img.src;
                return _context2.abrupt("return", new Promise(function (resolve) {
                  fabric.Image.fromURL(url, function (oImg) {
                    resolve(oImg);
                  });
                }));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _loadImage(_x2) {
        return _loadImage2.apply(this, arguments);
      }

      return _loadImage;
    }()
  }, {
    key: "constructChildren",
    value: function () {
      var _constructChildren = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var canvas, shape, shapes, children, initialOpts, padding, margin, c, child, childContainer;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                canvas = this.canvas, shape = this.shape, shapes = this.shapes, children = this.children, initialOpts = this.initialOpts; // Calculate new dimensions

                padding = 10;
                margin = 10;
                c = 0;

              case 4:
                if (!(c < children.length)) {
                  _context3.next = 13;
                  break;
                }

                child = children[c];
                childContainer = new ExpandableContainer({
                  canvas: canvas,
                  id: child.id,
                  left: shape.left + padding + (initialOpts.child.width + margin) * c + (c === children.length ? -margin : 0),
                  top: shape.top + padding + shapes.image.height + margin,
                  angle: 0,
                  label: child.label,
                  img: {
                    src: child.img.src
                  },
                  width: initialOpts.child.width,
                  height: initialOpts.child.height,
                  hideText: child.hideText
                }); // eslint-disable-next-line no-await-in-loop

                _context3.next = 9;
                return childContainer.load(true);

              case 9:
                child.container = childContainer;

              case 10:
                c += 1;
                _context3.next = 4;
                break;

              case 13:
                shape.addWithUpdate();
                shape.setCoords();
                canvas.renderAll();

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function constructChildren() {
        return _constructChildren.apply(this, arguments);
      }

      return constructChildren;
    }()
  }, {
    key: "expand",
    value: function expand() {
      if (this.children.length !== 0 && this.isExpanded === false) {
        var canvas = this.canvas,
            shape = this.shape,
            shapes = this.shapes,
            children = this.children,
            initialOpts = this.initialOpts; // Calculate new dimensions

        var padding = 10;
        var margin = 10;
        var oldRectWidth = shapes.rect.width;
        var oldRectHeight = shapes.rect.height;
        var newRectWidth = Math.max(padding * 2 + children.length * initialOpts.child.width + (children.length - 1) * margin, initialOpts.rect.width);
        var newRectHeight = children.length > 0 ? padding + shapes.image.height + margin + initialOpts.child.height + padding : initialOpts.rect.height; // Update all other containers that are below and/or on the right of the current shape, to avoid collision

        shapes.rect.opacity = 0.7;
        var otherShapes = Object.values(canvas.linkableShapes);

        if (otherShapes.length > 1) {
          var deltaX = newRectWidth - oldRectWidth;
          var deltaY = newRectHeight - oldRectHeight;

          for (var o = 0; o < otherShapes.length; o += 1) {
            var shapeToMove = otherShapes[o];

            if (shapeToMove.id !== this.id) {
              // If expanded Shape is above AND on the left of the current shape
              if (this.shape.aCoords.br.x <= shapeToMove.shape.aCoords.tl.x && this.shape.aCoords.br.y <= shapeToMove.shape.aCoords.tl.y) {
                shapeToMove.move({
                  x: shapeToMove.shape.left + deltaX,
                  y: shapeToMove.shape.top + deltaY,
                  moving: false,
                  skipCollision: true
                });
              } else if (this.shape.aCoords.bl.y < shapeToMove.shape.aCoords.tl.y) {
                // If expanded Shape is above the current shape
                if (this.shape.aCoords.tl.x < shapeToMove.shape.aCoords.tr.x) {
                  shapeToMove.move({
                    y: shapeToMove.shape.top + deltaY,
                    moving: false,
                    skipCollision: true
                  });
                }
              } else if (this.shape.aCoords.tr.x < shapeToMove.shape.aCoords.tl.x) {
                // If expanded Shape is on the left of the current shape
                if (this.shape.aCoords.tl.y < shapeToMove.shape.aCoords.bl.y) {
                  shapeToMove.move({
                    x: shapeToMove.shape.left + deltaX,
                    moving: false,
                    skipCollision: true
                  });
                }
              }
            }
          }
        } // Resize existing shapes


        shapes.rect.width = newRectWidth;
        shapes.rect.height = newRectHeight;
        shapes.rect.setCoords();
        shapes.text.width = newRectWidth - (shapes.image.width + padding + margin);
        shapes.text.textAlign = 'left';
        shapes.text.setCoords(); // Add children containers

        for (var c = 0; c < children.length; c += 1) {
          var child = children[c];
          child.container.shape.left = shape.left + padding + (initialOpts.child.width + margin) * c + (c === children.length ? -margin : 0);
          child.container.shape.top = shape.top + padding + shapes.image.height + margin;
          shape.addWithUpdate(child.container.shape);
        } // Update the container coords


        shape.addWithUpdate();
        shape.setCoords();
        this.bringToFront();
        this.shape.fire('modified');
        canvas.renderAll();
      }

      this.isExpanded = true;
    }
  }, {
    key: "collapse",
    value: function collapse() {
      if (this.children.length !== 0 && this.isExpanded === true) {
        var canvas = this.canvas,
            shape = this.shape,
            shapes = this.shapes,
            children = this.children,
            initialOpts = this.initialOpts; // Calculate new dimensions

        var padding = 10;
        var margin = 10;
        var oldRectWidth = shapes.rect.width;
        var oldRectHeight = shapes.rect.height;
        var newRectWidth = initialOpts.rect.width;
        var newRectHeight = initialOpts.rect.height; // Update all other containers that are below and/or on the right of the current shape, to avoid collision

        shapes.rect.opacity = 1;
        var otherShapes = Object.values(canvas.linkableShapes);

        if (otherShapes.length > 1) {
          var deltaX = newRectWidth - oldRectWidth;
          var deltaY = newRectHeight - oldRectHeight;

          for (var o = 0; o < otherShapes.length; o += 1) {
            var shapeToMove = otherShapes[o];

            if (otherShapes[o].id !== this.id) {
              // If expanded Shape is above AND on the left of the current shape
              if (this.shape.aCoords.br.x <= shapeToMove.shape.aCoords.tl.x && this.shape.aCoords.br.y <= shapeToMove.shape.aCoords.tl.y) {
                shapeToMove.move({
                  x: shapeToMove.shape.left + deltaX,
                  y: shapeToMove.shape.top + deltaY,
                  moving: false,
                  skipCollision: true
                });
              } else if (this.shape.aCoords.bl.y < shapeToMove.shape.aCoords.tl.y) {
                // If expanded Shape is above the current shape
                if (this.shape.aCoords.tl.x < shapeToMove.shape.aCoords.tr.x) {
                  shapeToMove.move({
                    y: shapeToMove.shape.top + deltaY,
                    moving: false,
                    skipCollision: true
                  });
                }
              } else if (this.shape.aCoords.tr.x < shapeToMove.shape.aCoords.tl.x) {
                // If expanded Shape is on the left of the current shape
                if (this.shape.aCoords.tl.y < shapeToMove.shape.aCoords.bl.y) {
                  shapeToMove.move({
                    x: shapeToMove.shape.left + deltaX,
                    moving: false,
                    skipCollision: true
                  });
                }
              }
            }
          }
        } // Resize existing shapes


        shapes.rect.width = newRectWidth;
        shapes.rect.height = newRectHeight;
        shapes.rect.setCoords();
        shapes.text.width = newRectWidth - (shapes.image.width + padding * 2 + margin);
        shapes.text.textAlign = 'left';
        shapes.text.setCoords(); // Remove children containers

        for (var c = 0; c < children.length; c += 1) {
          var child = children[c];
          child.container.left = shape.left + padding + (initialOpts.child.width + margin) * c + (c === children.length ? -margin : 0);
          child.container.top = shape.top + padding + shapes.image.height + margin;
          shape.remove(child.container.shape);
        } // Update the container coords


        shape.addWithUpdate();
        shape.setCoords();
        this.shape.fire('modified');
        canvas.renderAll();
      }

      this.isExpanded = false;
    }
  }, {
    key: "_onAnchorRightClick",
    value: function () {
      var _onAnchorRightClick2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(options) {
        var _this$shape, id, left, top, angle, canvas, width, height, ap, cardinal, spacing, nextId, label, nextContainerOpts, nextContainer, newOptions, targetCardinal, newLink;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this$shape = this.shape, id = _this$shape.id, left = _this$shape.left, top = _this$shape.top, angle = _this$shape.angle, canvas = _this$shape.canvas, width = _this$shape.width, height = _this$shape.height;
                ap = options.target;
                cardinal = ap.cardinal;
                spacing = 100;
                nextId = "".concat(id, "_next_").concat(cardinal, "_").concat(Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1));
                label = "".concat(id, "_next_").concat(cardinal);
                nextContainerOpts = _.cloneDeep(_.omit(this.options, ['canvas', 'shape']));
                nextContainerOpts.canvas = canvas;
                nextContainerOpts.id = nextId;
                nextContainerOpts.left = left;
                nextContainerOpts.top = top;
                nextContainerOpts.angle = angle;
                nextContainerOpts.label = label;
                nextContainerOpts.children = [];
                nextContainer = new ExpandableContainer(nextContainerOpts);
                _context4.next = 17;
                return nextContainer.load();

              case 17:
                nextContainer.inject();
                newOptions = {};
                _context4.t0 = cardinal;
                _context4.next = _context4.t0 === 'east' ? 22 : _context4.t0 === 'west' ? 26 : _context4.t0 === 'north' ? 30 : _context4.t0 === 'south' ? 34 : _context4.t0 === 'northeast' ? 38 : _context4.t0 === 'northwest' ? 42 : _context4.t0 === 'southeast' ? 46 : _context4.t0 === 'southwest' ? 50 : 50;
                break;

              case 22:
                targetCardinal = 'west';
                newOptions.y = top;
                newOptions.x = left + width + spacing;
                return _context4.abrupt("break", 54);

              case 26:
                targetCardinal = 'east';
                newOptions.y = top;
                newOptions.x = left - width - spacing;
                return _context4.abrupt("break", 54);

              case 30:
                targetCardinal = 'south';
                newOptions.y = top - height - spacing;
                newOptions.x = left;
                return _context4.abrupt("break", 54);

              case 34:
                targetCardinal = 'north';
                newOptions.y = top + height + spacing;
                newOptions.x = left;
                return _context4.abrupt("break", 54);

              case 38:
                targetCardinal = 'southwest';
                newOptions.y = top - height - spacing;
                newOptions.x = left + width + spacing;
                return _context4.abrupt("break", 54);

              case 42:
                targetCardinal = 'southeast';
                newOptions.y = top - height - spacing;
                newOptions.x = left - width - spacing;
                return _context4.abrupt("break", 54);

              case 46:
                targetCardinal = 'northwest';
                newOptions.y = top + height + spacing;
                newOptions.x = left + width + spacing;
                return _context4.abrupt("break", 54);

              case 50:
                targetCardinal = 'northeast';
                newOptions.y = top + height + spacing;
                newOptions.x = left - width - spacing;
                return _context4.abrupt("break", 54);

              case 54:
                nextContainer.move(newOptions); // nextContainer.rotate(angle);

                newLink = new _CurvedLink["default"]({
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
                newLink.connectLink('start', ap.shapeId, ap.cardinal);
                newLink.connectLink('end', nextContainer.anchors[targetCardinal].shapeId, nextContainer.anchors[targetCardinal].cardinal);

              case 59:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _onAnchorRightClick(_x3) {
        return _onAnchorRightClick2.apply(this, arguments);
      }

      return _onAnchorRightClick;
    }()
  }, {
    key: "_onAnchorLeftClick",
    value: function _onAnchorLeftClick(options) {
      var _this3 = this;

      var ap = options.target;
      var canvas = this.canvas; // Disable the multi selection when moving mouse

      this.canvas.selection = false;
      var oppositeCardinal = {
        east: 'west',
        west: 'east',
        north: 'south',
        south: 'north'
      };
      var newLink = new _CurvedLink["default"]({
        canvas: canvas,
        start: {
          x: ap.left,
          y: ap.top,
          direction: ap.cardinal
        },
        end: {
          x: ap.left,
          y: ap.top,
          direction: oppositeCardinal[ap.cardinal]
        }
      });
      newLink.inject(canvas);
      newLink.connectLink('start', ap.shapeId, ap.cardinal);
      newLink.arrowHead.fire('mousedown');

      var onMouseMove = function onMouseMove(event) {
        newLink.arrowHead.left = event.pointer.x;
        newLink.arrowHead.top = event.pointer.y;
        newLink.arrowHead.fire('moving');
      };

      canvas.on('mouse:move', onMouseMove);

      var onMouseClick = function onMouseClick() {
        // Enable back the multi selection when moving mouse
        _this3.canvas.selection = true;
        newLink.arrowHead.fire('moved');
        newLink.arrowHead.fire('mouseup');
        canvas.off('mouse:move', onMouseMove);
        canvas.off('mouse:up', onMouseClick);
      };

      canvas.on('mouse:up', onMouseClick);
    }
  }]);

  return ExpandableContainer;
}(_LinkableShape2["default"]);

exports["default"] = ExpandableContainer;

},{"./CurvedLink.js":3,"./LinkableShape.js":6}],5:[function(require,module,exports){
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
        // start x
        y: y1 // start y

      },
      Q: {
        x1: (x1 + x2) / 2,
        // control x
        y1: (y1 + y2) / 2,
        // control y
        x2: x2,
        // end x
        y2: y2 // end y

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
      _this.updatePath('end', arrowHead.left, arrowHead.top, false);

      _this._checkExtremityCanBeConnected('end');
    });
    arrowHead.on('moved', function () {
      _this.updatePath('end', arrowHead.left, arrowHead.top, true);

      _this.isValidHeadConnectionMask.set('opacity', 0);

      _this._connectDisconnectExtremity('end');
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
      _this.updatePath('start', arrowTail.left, arrowTail.top, false);

      _this._checkExtremityCanBeConnected('start');
    });
    arrowTail.on('moved', function () {
      _this.updatePath('start', arrowTail.left, arrowTail.top, true);

      _this.isValidTailConnectionMask.set('opacity', 0);

      _this._connectDisconnectExtremity('start');
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
      var id = this.id,
          canvas = this.canvas,
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
      this.updatePath('start', path.path[0][1], path.path[0][2], true);
      this.updatePath('end', path.path[1][3], path.path[1][4], true);
      this.updatePath('control', path.path[1][1], path.path[1][2], true);
      canvas.links[id] = this;
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
      }; // shape.anchors[cardinal].opacity = 0;

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
          x: linkPoint === 'start' ? x : this.path.path[0][1],
          y: linkPoint === 'start' ? y : this.path.path[0][2]
        },
        Q: {
          x1: linkPoint === 'control' ? x : this.path.path[1][1],
          y1: linkPoint === 'control' ? y : this.path.path[1][2],
          x2: linkPoint === 'end' ? x : this.path.path[1][3],
          y2: linkPoint === 'end' ? y : this.path.path[1][4]
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

      this._checkExtremityCanBeConnected('start');

      this._checkExtremityCanBeConnected('end');
    }
  }, {
    key: "onLinkMoved",
    value: function onLinkMoved() {
      // Reupdate the Path according end the new coordinates of all elements
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
      this.updatePath('start', caca.path[0][1], caca.path[0][2], false);
      this.updatePath('end', caca.path[1][3], caca.path[1][4], false);
      this.updatePath('control', caca.path[1][1], caca.path[1][2], true); // Connect or Disconnect depending on extremities positions

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

  }, {
    key: "_checkExtremityCanBeConnected",
    value: function _checkExtremityCanBeConnected(direction) {
      var canvas = this.canvas;
      var extremity;
      var mask;

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
     * Helper end execute connect/disconnect depending on specific conditions.
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

      if (direction === 'start') {
        extremity = this.arrowTail;
      } else if (direction === 'end') {
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
          // If this link was connected end this anchor and it doesn't intersect anymore
          this.disconnectLink(direction);
        }
      }
    }
  }]);

  return Link;
}();

exports["default"] = Link;

},{}],6:[function(require,module,exports){
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

    this.anchors = this.shape.anchors = {
      east: this._makeAnchorPoint('east'),
      west: this._makeAnchorPoint('west') // north: this._makeAnchorPoint('north'),
      // south: this._makeAnchorPoint('south'),
      // northeast: this._makeAnchorPoint('northeast'),
      // northwest: this._makeAnchorPoint('northwest'),
      // southeast: this._makeAnchorPoint('southeast'),
      // southwest: this._makeAnchorPoint('southwest'),

    }; // Events related to anchors

    shape.on({
      selected: function selected() {
        _this.toggleAnchorsOpacity(1);
      },
      mouseover: function mouseover() {
        if (_this.canvas.getActiveObject() !== _this.shape) {
          _this.toggleAnchorsOpacity(1);
        }
      },
      mouseout: function mouseout() {
        _this.toggleAnchorsOpacity(1);
      },
      modifying: function modifying() {
        _this.refreshAnchorsPosition(false);
      },
      modified: function modified() {
        _this.refreshAnchorsPosition(true);
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
      var id = this.id,
          canvas = this.canvas,
          shape = this.shape,
          anchors = this.anchors,
          modBox = this.modBox;
      canvas.add(shape);
      canvas.add(modBox);
      Object.keys(anchors).forEach(function (cardinal) {
        canvas.add(anchors[cardinal]);
        canvas.bringForward(anchors[cardinal], true);
      });
      this.refreshAnchorsPosition(true);
      canvas.linkableShapes[id] = this;
      return this;
    }
  }, {
    key: "remove",
    value: function remove() {
      var id = this.id,
          canvas = this.canvas,
          shape = this.shape,
          anchors = this.anchors,
          modBox = this.modBox;
      canvas.remove(shape);
      canvas.remove(modBox);
      Object.keys(anchors).forEach(function (cardinal) {
        canvas.remove(anchors[cardinal]);
      });
      delete canvas.linkableShapes[id];
    }
  }, {
    key: "move",
    value: function move(options) {
      var canvas = this.canvas,
          shape = this.shape; // Move the shape and update coords and anchors

      var left = options.x || shape.left;
      var top = options.y || shape.top;
      this.shape.set('left', left);
      this.shape.set('top', top);
      this.shape.setCoords();
      this.refreshAnchorsPosition();
      this.shape.fire(options.moving ? 'moving' : 'moved'); // Prevent LinkableShape to overlap with each other

      var clearance = 10;
      shape.setCoords(); // Sets corner position coordinates based on current angle, width and height

      var isIntersecting = false;

      if (!options.skipCollision) {
        var otherShapes = Object.values(canvas.linkableShapes);

        for (var o = 0; o < otherShapes.length; o += 1) {
          var targ = otherShapes[o].shape;

          if (targ !== shape) {
            if (shape.intersectsWithObject(targ)) {
              isIntersecting = true;
              var sB = shape.aCoords.bl.y;
              var sT = shape.aCoords.tl.y;
              var sR = shape.aCoords.tr.x;
              var sL = shape.aCoords.tl.x;
              var tB = targ.aCoords.bl.y;
              var tT = targ.aCoords.tl.y;
              var tR = targ.aCoords.tr.x;
              var tL = targ.aCoords.tl.x;

              if (sB - tT > clearance) {
                top = tT - shape.height - clearance;
              } else if (sT - tB < clearance) {
                top = tB + clearance;
              } else if (sR - tL > clearance) {
                left = tL - shape.width - clearance;
              } else if (sL - tR < clearance) {
                left = tR + clearance;
              }
            }
          }
        }
      }

      if (isIntersecting) {
        this.move({
          x: left,
          y: top,
          moving: options.moving
        });
      }
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
      var _this2 = this;

      Object.keys(this.anchors).forEach(function (cardinal) {
        _this2._setAnchorPositionRelativeToRectangle(cardinal, commit);
      });
    }
  }, {
    key: "toggleAnchorsOpacity",
    value: function toggleAnchorsOpacity(opacity) {
      var _this3 = this;

      Object.keys(this.anchors).forEach(function (cardinal) {
        _this3.anchors[cardinal].toggleOpacity(opacity);
      });
    }
  }, {
    key: "bringToFront",
    value: function bringToFront() {
      var canvas = this.canvas,
          shape = this.shape,
          modBox = this.modBox,
          anchors = this.anchors;
      shape.bringToFront();
      modBox.bringToFront();
      Object.keys(anchors).forEach(function (cardinal) {
        canvas.bringToFront(anchors[cardinal]);
      });
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
      var _this4 = this;

      var left;
      var top;
      var shape = this.shape,
          id = this.id,
          canvas = this.canvas;

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
      } // const ap = new fabric.Circle({
      //   objectCaching: false,
      //   left,
      //   top,
      //   strokeWidth: 2,
      //   radius: 6,
      //   fill: '#78befa', // 42a2da d5e8f2
      //   stroke: '#78befa',
      //   originX: 'center',
      //   originY: 'center',
      //   hasBorders: false,
      //   hasControls: false,
      //   selectable: false,
      //   opacity: 0,
      //   id: `${id}_${cardinal}`,
      // });


      var ap = new fabric.Rect({
        objectCaching: false,
        width: 10,
        height: 10,
        left: left,
        top: top,
        strokeWidth: 1,
        fill: '#ddd',
        stroke: '#999',
        originX: 'center',
        originY: 'center',
        hasBorders: false,
        hasControls: false,
        selectable: false,
        opacity: 1,
        id: "".concat(id, "_").concat(cardinal)
      });
      ap.type = 'anchor';
      ap.shapeId = id;
      ap.cardinal = cardinal;
      ap.on('mouseover', function () {
        ap.set('fill', '#78befa');
        ap.set('stroke', '#78befa');
        canvas.renderAll();
      });
      ap.on('mouseout', function () {
        ap.set('fill', '#ddd');
        ap.set('stroke', '#999');
        canvas.renderAll();
      });
      ap.on('mousedown', function (options) {
        switch (options.button) {
          case 3:
            _this4._onAnchorRightClick.call(_this4, options);

            break;

          case 2:
            _this4._onAnchorMiddleClick.call(_this4, options);

            break;

          case 1:
          default:
            _this4._onAnchorLeftClick.call(_this4, options);

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

},{}],7:[function(require,module,exports){
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
    canvas.linkableShapes = {};
    canvas.links = {}; // Set grid

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
            var shape = event.target;

            if (shape.type !== 'linkableShape') {
              return;
            }

            canvas.linkableShapes[shape.id].move({
              x: Math.round(shape.left / grid) * grid,
              y: Math.round(shape.top / grid) * grid,
              moving: true
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsInNyYy9Db250YWluZXIuanMiLCJzcmMvQ3VydmVkTGluay5qcyIsInNyYy9FeHBhbmRhYmxlQ29udGFpbmVyLmpzIiwic3JjL0xpbmsuanMiLCJzcmMvTGlua2FibGVTaGFwZS5qcyIsInNyYy9Qcm9jZXNzR3JhcGguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0VBOztBQUVBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7O0FBVEE7QUFXQSxNQUFNLENBQUMsRUFBUCxHQUFZO0FBQ1YsRUFBQSxZQUFZLEVBQVosd0JBRFU7QUFFVixFQUFBLGFBQWEsRUFBYix5QkFGVTtBQUdWLEVBQUEsU0FBUyxFQUFULHFCQUhVO0FBSVYsRUFBQSxtQkFBbUIsRUFBbkIsK0JBSlU7QUFLVixFQUFBLElBQUksRUFBSixnQkFMVTtBQU1WLEVBQUEsVUFBVSxFQUFWO0FBTlUsQ0FBWjs7Ozs7Ozs7Ozs7O0FDWEE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLGNBQXNCLE1BQXRCO0FBQUEsSUFBUSxNQUFSLFdBQVEsTUFBUjtBQUFBLElBQWdCLENBQWhCLFdBQWdCLENBQWhCOztJQUVxQixTOzs7OztBQUNuQjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFLHFCQUFZLE9BQVosRUFBcUI7QUFBQTs7QUFBQTs7QUFDbkIsUUFBTSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBWCxDQUFnQjtBQUMzQixNQUFBLElBQUksRUFBRSxDQURxQjtBQUUzQixNQUFBLEdBQUcsRUFBRSxDQUZzQjtBQUczQixNQUFBLE9BQU8sRUFBRSxNQUhrQjtBQUkzQixNQUFBLE9BQU8sRUFBRSxLQUprQjtBQUszQixNQUFBLFdBQVcsRUFBRSxDQUxjO0FBTTNCLE1BQUEsTUFBTSxFQUFFLE1BTm1CO0FBTzNCLE1BQUEsSUFB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LENBQWMsSUFBeEI7QUFDRDtBQUNGLE9BOUhEO0FBK0hEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gaW1wb3J0ICdAYmFiZWwvcG9seWZpbGwnO1xyXG5cclxuaW1wb3J0IFByb2Nlc3NHcmFwaCBmcm9tICcuL3NyYy9Qcm9jZXNzR3JhcGguanMnO1xyXG5cclxuaW1wb3J0IExpbmthYmxlU2hhcGUgZnJvbSAnLi9zcmMvTGlua2FibGVTaGFwZS5qcyc7XHJcbmltcG9ydCBDb250YWluZXIgZnJvbSAnLi9zcmMvQ29udGFpbmVyLmpzJztcclxuaW1wb3J0IEV4cGFuZGFibGVDb250YWluZXIgZnJvbSAnLi9zcmMvRXhwYW5kYWJsZUNvbnRhaW5lci5qcyc7XHJcblxyXG5pbXBvcnQgTGluayBmcm9tICcuL3NyYy9MaW5rLmpzJztcclxuaW1wb3J0IEN1cnZlZExpbmsgZnJvbSAnLi9zcmMvQ3VydmVkTGluay5qcyc7XHJcblxyXG53aW5kb3cucGcgPSB7XHJcbiAgUHJvY2Vzc0dyYXBoLFxyXG4gIExpbmthYmxlU2hhcGUsXHJcbiAgQ29udGFpbmVyLFxyXG4gIEV4cGFuZGFibGVDb250YWluZXIsXHJcbiAgTGluayxcclxuICBDdXJ2ZWRMaW5rLFxyXG59O1xyXG4iLCJpbXBvcnQgTGlua2FibGVTaGFwZSBmcm9tICcuL0xpbmthYmxlU2hhcGUuanMnO1xyXG5pbXBvcnQgQ3VydmVkTGluayBmcm9tICcuL0N1cnZlZExpbmsuanMnO1xyXG5cclxuY29uc3QgeyBmYWJyaWMsIF8gfSA9IHdpbmRvdztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRhaW5lciBleHRlbmRzIExpbmthYmxlU2hhcGUge1xyXG4gIC8qKlxyXG4gICAqIEEgQ29udGFpbmVyIGlzIGEgUmVjdCB3aXRoIGFuIElUZXh0LiBDYW4gYmUgZXhwYW5kZWQgdG8gcmV2ZWFsIGNvbnRhaW5lZCBTaGFwZXMuXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIG9wdGlvbnNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7RmFicmljLkNhbnZhc30gICBvcHRpb25zLmNhbnZhcyAtIEZhYnJpYyBjYW52YXNcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgb3B0aW9ucy5pZCAtIFVuaXF1ZSBpZGVudGlmaWVyXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIG9wdGlvbnMud2lkdGhcclxuICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgb3B0aW9ucy5oZWlnaHRcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgb3B0aW9ucy5sYWJlbFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHJlY3QgPSBuZXcgZmFicmljLlJlY3Qoe1xyXG4gICAgICBsZWZ0OiAwLFxyXG4gICAgICB0b3A6IDAsXHJcbiAgICAgIG9yaWdpblg6ICdsZWZ0JyxcclxuICAgICAgb3JpZ2luWTogJ3RvcCcsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICBzdHJva2U6ICcjMDAwJyxcclxuICAgICAgZmlsbDogJyNmZmYnLFxyXG4gICAgICByeDogMTAsXHJcbiAgICAgIHJ5OiAxMCxcclxuICAgICAgd2lkdGg6IG9wdGlvbnMud2lkdGggPyBvcHRpb25zLndpZHRoIDogMjAwLFxyXG4gICAgICBoZWlnaHQ6IG9wdGlvbnMuaGVpZ2h0ID8gb3B0aW9ucy5oZWlnaHQgOiAxMDAsXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IHRleHQgPSBuZXcgZmFicmljLlRleHRib3gob3B0aW9ucy5sYWJlbCwge1xyXG4gICAgICBsZWZ0OiByZWN0LndpZHRoIC8gMixcclxuICAgICAgdG9wOiByZWN0LmhlaWdodCAvIDIsXHJcbiAgICAgIHN0eWxlczogeyB9LFxyXG4gICAgICBmb250U2l6ZTogMTQsXHJcbiAgICAgIGZvbnRGYW1pbHk6ICdIZWx2ZXRpY2EnLFxyXG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIHdpZHRoOiAxOTAsXHJcbiAgICAgIGhlaWdodDogOTAsXHJcbiAgICAgIHNwbGl0QnlHcmFwaGVtZTogdHJ1ZSxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgZ3JvdXAgPSBuZXcgZmFicmljLkdyb3VwKFtyZWN0LCB0ZXh0XSwge1xyXG4gICAgICBsZWZ0OiAwLFxyXG4gICAgICB0b3A6IDAsXHJcbiAgICAgIG9yaWdpblg6ICdsZWZ0JyxcclxuICAgICAgb3JpZ2luWTogJ3RvcCcsXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IG5ld09wdGlvbnMgPSBfLmNsb25lRGVlcChfLm9taXQob3B0aW9ucywgWydjYW52YXMnLCAnc2hhcGUnXSkpO1xyXG4gICAgbmV3T3B0aW9ucy5jYW52YXMgPSBvcHRpb25zLmNhbnZhcztcclxuICAgIG5ld09wdGlvbnMuc2hhcGUgPSBncm91cDtcclxuICAgIHN1cGVyKG5ld09wdGlvbnMpO1xyXG5cclxuICAgIGdyb3VwLm9uKHtcclxuICAgICAgc2NhbGluZzogKCkgPT4ge1xyXG4gICAgICAgIC8vIFdoZW4gc2NhbGluZywga2VlcCB0ZXh0IHNhbWUgc2l6ZSBhcyBpbml0aWFsXHJcbiAgICAgICAgaWYgKGdyb3VwLnNjYWxlWCA8IDEpIHtcclxuICAgICAgICAgIHRleHQuc2NhbGVYID0gMSArICgxIC0gZ3JvdXAuc2NhbGVYKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGV4dC5zY2FsZVggPSAxIC8gKGdyb3VwLnNjYWxlWCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChncm91cC5zY2FsZVkgPCAxKSB7XHJcbiAgICAgICAgICB0ZXh0LnNjYWxlWSA9IDEgKyAoMSAtIGdyb3VwLnNjYWxlWSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRleHQuc2NhbGVZID0gMSAvIChncm91cC5zY2FsZVkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNhbnZhcy5yZW5kZXJBbGwoKTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgX29uQW5jaG9yUmlnaHRDbGljayhvcHRpb25zKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGlkLCBsZWZ0LCB0b3AsIGFuZ2xlLCBjYW52YXMsIHdpZHRoLCBoZWlnaHQsXHJcbiAgICB9ID0gdGhpcy5zaGFwZTtcclxuICAgIGNvbnN0IGFwID0gb3B0aW9ucy50YXJnZXQ7XHJcbiAgICBjb25zdCB7IGNhcmRpbmFsIH0gPSBhcDtcclxuICAgIGNvbnN0IHNwYWNpbmcgPSA1MDtcclxuXHJcbiAgICBjb25zdCBuZXh0Q29udGFpbmVyID0gbmV3IENvbnRhaW5lcih7XHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgaWQ6IGAke2lkfV9uZXh0XyR7Y2FyZGluYWx9XyR7TWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMCkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygxKX1gLFxyXG4gICAgICBsZWZ0LFxyXG4gICAgICB0b3AsXHJcbiAgICAgIGFuZ2xlLFxyXG4gICAgICBsYWJlbDogYCR7aWR9X25leHRfJHtjYXJkaW5hbH1gLFxyXG4gICAgfSk7XHJcbiAgICBuZXh0Q29udGFpbmVyLmluamVjdCgpO1xyXG5cclxuICAgIGNvbnN0IG5ld09wdGlvbnMgPSB7fTtcclxuICAgIGxldCB0YXJnZXRDYXJkaW5hbDtcclxuICAgIHN3aXRjaCAoY2FyZGluYWwpIHtcclxuICAgICAgY2FzZSAnZWFzdCc6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICd3ZXN0JztcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSB0b3A7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gbGVmdCArIHdpZHRoICsgc3BhY2luZztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICd3ZXN0Jzoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ2Vhc3QnO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IHRvcDtcclxuICAgICAgICBuZXdPcHRpb25zLnggPSBsZWZ0IC0gd2lkdGggLSBzcGFjaW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRoJzoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ3NvdXRoJztcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSB0b3AgLSBoZWlnaHQgLSBzcGFjaW5nO1xyXG4gICAgICAgIG5ld09wdGlvbnMueCA9IGxlZnQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnc291dGgnOiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnbm9ydGgnO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IHRvcCArIGhlaWdodCArIHNwYWNpbmc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gbGVmdDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aGVhc3QnOiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnc291dGh3ZXN0JztcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSB0b3AgLSBoZWlnaHQgLSBzcGFjaW5nO1xyXG4gICAgICAgIG5ld09wdGlvbnMueCA9IGxlZnQgKyB3aWR0aCArIHNwYWNpbmc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnbm9ydGh3ZXN0Jzoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ3NvdXRoZWFzdCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gdG9wIC0gaGVpZ2h0IC0gc3BhY2luZztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSBsZWZ0IC0gd2lkdGggLSBzcGFjaW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRoZWFzdCc6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICdub3J0aHdlc3QnO1xyXG4gICAgICAgIG5ld09wdGlvbnMueCA9IHRvcCArIGhlaWdodCArIHNwYWNpbmc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gbGVmdCArIHdpZHRoICsgc3BhY2luZztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aHdlc3QnOlxyXG4gICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnbm9ydGhlYXN0JztcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSB0b3AgKyBoZWlnaHQgKyBzcGFjaW5nO1xyXG4gICAgICAgIG5ld09wdGlvbnMueCA9IGxlZnQgLSB3aWR0aCAtIHNwYWNpbmc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIG5leHRDb250YWluZXIubW92ZShuZXdPcHRpb25zKTtcclxuICAgIC8vIG5leHRDb250YWluZXIucm90YXRlKGFuZ2xlKTtcclxuXHJcbiAgICBjb25zdCBuZXdMaW5rID0gbmV3IEN1cnZlZExpbmsoe1xyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgeDogYXAubGVmdCxcclxuICAgICAgICB5OiBhcC50b3AsXHJcbiAgICAgIH0sXHJcbiAgICAgIGVuZDoge1xyXG4gICAgICAgIHg6IG5leHRDb250YWluZXIuYW5jaG9yc1t0YXJnZXRDYXJkaW5hbF0ubGVmdCxcclxuICAgICAgICB5OiBuZXh0Q29udGFpbmVyLmFuY2hvcnNbdGFyZ2V0Q2FyZGluYWxdLnRvcCxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgbmV3TGluay5pbmplY3QoY2FudmFzKTtcclxuICAgIG5ld0xpbmsuY29ubmVjdExpbmsoJ3N0YXJ0JywgYXAuc2hhcGVJZCwgYXAuY2FyZGluYWwpO1xyXG4gICAgbmV3TGluay5jb25uZWN0TGluaygnZW5kJywgbmV4dENvbnRhaW5lci5hbmNob3JzW3RhcmdldENhcmRpbmFsXS5zaGFwZUlkLCBuZXh0Q29udGFpbmVyLmFuY2hvcnNbdGFyZ2V0Q2FyZGluYWxdLmNhcmRpbmFsKTtcclxuICB9XHJcblxyXG4gIF9vbkFuY2hvckxlZnRDbGljayhvcHRpb25zKSB7XHJcbiAgICBjb25zdCBhcCA9IG9wdGlvbnMudGFyZ2V0O1xyXG4gICAgY29uc3QgeyBjYW52YXMgfSA9IHRoaXM7XHJcblxyXG4gICAgLy8gRGlzYWJsZSB0aGUgbXVsdGkgc2VsZWN0aW9uIHdoZW4gbW92aW5nIG1vdXNlXHJcbiAgICB0aGlzLmNhbnZhcy5zZWxlY3Rpb24gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdCBvcHBvc2l0ZUNhcmRpbmFsID0ge1xyXG4gICAgICBlYXN0OiAnd2VzdCcsXHJcbiAgICAgIHdlc3Q6ICdlYXN0JyxcclxuICAgICAgbm9ydGg6ICdzb3V0aCcsXHJcbiAgICAgIHNvdXRoOiAnbm9ydGgnLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IG5ld0xpbmsgPSBuZXcgQ3VydmVkTGluayh7XHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgc3RhcnQ6IHtcclxuICAgICAgICB4OiBhcC5sZWZ0LFxyXG4gICAgICAgIHk6IGFwLnRvcCxcclxuICAgICAgICBkaXJlY3Rpb246IGFwLmNhcmRpbmFsLFxyXG4gICAgICB9LFxyXG4gICAgICBlbmQ6IHtcclxuICAgICAgICB4OiBhcC5sZWZ0LFxyXG4gICAgICAgIHk6IGFwLnRvcCxcclxuICAgICAgICBkaXJlY3Rpb246IG9wcG9zaXRlQ2FyZGluYWxbYXAuY2FyZGluYWxdLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgICBuZXdMaW5rLmluamVjdChjYW52YXMpO1xyXG4gICAgbmV3TGluay5jb25uZWN0TGluaygnc3RhcnQnLCBhcC5zaGFwZUlkLCBhcC5jYXJkaW5hbCk7XHJcbiAgICBuZXdMaW5rLmFycm93SGVhZC5maXJlKCdtb3VzZWRvd24nKTtcclxuXHJcbiAgICBjb25zdCBvbk1vdXNlTW92ZSA9IChldmVudCkgPT4ge1xyXG4gICAgICBuZXdMaW5rLmFycm93SGVhZC5sZWZ0ID0gZXZlbnQucG9pbnRlci54O1xyXG4gICAgICBuZXdMaW5rLmFycm93SGVhZC50b3AgPSBldmVudC5wb2ludGVyLnk7XHJcbiAgICAgIG5ld0xpbmsuYXJyb3dIZWFkLmZpcmUoJ21vdmluZycpO1xyXG4gICAgfTtcclxuICAgIGNhbnZhcy5vbignbW91c2U6bW92ZScsIG9uTW91c2VNb3ZlKTtcclxuXHJcbiAgICBjb25zdCBvbk1vdXNlQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgIC8vIEVuYWJsZSBiYWNrIHRoZSBtdWx0aSBzZWxlY3Rpb24gd2hlbiBtb3ZpbmcgbW91c2VcclxuICAgICAgdGhpcy5jYW52YXMuc2VsZWN0aW9uID0gdHJ1ZTtcclxuXHJcbiAgICAgIG5ld0xpbmsuYXJyb3dIZWFkLmZpcmUoJ21vdmVkJyk7XHJcbiAgICAgIG5ld0xpbmsuYXJyb3dIZWFkLmZpcmUoJ21vdXNldXAnKTtcclxuICAgICAgY2FudmFzLm9mZignbW91c2U6bW92ZScsIG9uTW91c2VNb3ZlKTtcclxuICAgICAgY2FudmFzLm9mZignbW91c2U6dXAnLCBvbk1vdXNlQ2xpY2spO1xyXG4gICAgfTtcclxuICAgIGNhbnZhcy5vbignbW91c2U6dXAnLCBvbk1vdXNlQ2xpY2spO1xyXG4gIH1cclxufVxyXG4iLCJjb25zdCB7IGZhYnJpYyB9ID0gd2luZG93O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3VydmVkTGluayB7XHJcbiAgLyoqXHJcbiAgICogQSBMaW5rIGlzIGEgRmFicmljLlBhdGggb2JqZWN0IHdob3NlIFN0YXJ0IGFuZCBFbmQgcG9pbnRzIGNhbiBiZSBjb25uZWN0ZWQgZW5kIGFueSBhbmNob3Igb2YgdHdvIExpbmthYmxlU2hhcGUuXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIG9wdGlvbnNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7RmFicmljLkNhbnZhc30gICBvcHRpb25zLmNhbnZhcyAtIEZhYnJpYyBjYW52YXNcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgb3B0aW9ucy5pZCAtIFVuaXF1ZSBpZGVudGlmaWVyXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuc3RhcnRdIC0gQ29vcmRpbmF0ZXMgb2YgdGhlIHN0YXJ0IHBvaW50XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIFtvcHRpb25zLnN0YXJ0LnhdIC0gWCBheGlzIGNvb3JkaW5hdGUgb2YgdGhlIHN0YXJ0IHBvaW50XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIFtvcHRpb25zLnN0YXJ0LnldIC0gWSBheGlzIGNvb3JkaW5hdGUgb2YgdGhlIHN0YXJ0IHBvaW50XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIFtvcHRpb25zLnN0YXJ0LmRpcmVjdGlvbl0gLVxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBbb3B0aW9ucy5lbmQueF0gLSBYIGF4aXMgY29vcmRpbmF0ZSBvZiB0aGUgZW5kIHBvaW50XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIFtvcHRpb25zLmVuZC55XSAtIFkgYXhpcyBjb29yZGluYXRlIG9mIHRoZSBlbmQgcG9pbnRcclxuICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgW29wdGlvbnMuZW5kLmRpcmVjdGlvbl0gLVxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBbb3B0aW9ucy5jdXN0b21dIC0gT3B0aW9ucyBlbmQgY3VzdG9taXplIHRoZSBkaWZmZXJlbnQgc2hhcGVzIG9mIHRoZSBMaW5rXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuY3VzdG9tLnBhdGhdIC0gYmV6aWVyIHF1YWRyYXRpYyBjdXJ2ZVxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBbb3B0aW9ucy5jdXN0b20uc3RhcnRQb2ludF0gLSBha2EgYXJyb3dUYWlsXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLmN1c3RvbS5lbmRQb2ludF0gLSBha2EgYXJyb3dIZWFkXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBpZCxcclxuICAgICAgY2FudmFzLFxyXG4gICAgfSA9IG9wdGlvbnM7XHJcbiAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuICAgIHRoaXMuZGlyZWN0aW9uID0ge1xyXG4gICAgICBzdGFydDogb3B0aW9ucyAmJiBvcHRpb25zLnN0YXJ0ICYmIG9wdGlvbnMuc3RhcnQuZGlyZWN0aW9uID8gb3B0aW9ucy5zdGFydC5kaXJlY3Rpb24gOiAnZWFzdCcsXHJcbiAgICAgIGVuZDogb3B0aW9ucyAmJiBvcHRpb25zLmVuZCAmJiBvcHRpb25zLmVuZC5kaXJlY3Rpb24gPyBvcHRpb25zLmVuZC5kaXJlY3Rpb24gOiAnd2VzdCcsXHJcbiAgICB9O1xyXG4gICAgY29uc3Qgc3RhcnQgPSB7XHJcbiAgICAgIHg6IG9wdGlvbnMgJiYgb3B0aW9ucy5zdGFydCAmJiBvcHRpb25zLnN0YXJ0LnggPyBvcHRpb25zLnN0YXJ0LnggOiAwLFxyXG4gICAgICB5OiBvcHRpb25zICYmIG9wdGlvbnMuc3RhcnQgJiYgb3B0aW9ucy5zdGFydC55ID8gb3B0aW9ucy5zdGFydC55IDogMCxcclxuICAgIH07XHJcbiAgICBjb25zdCBlbmQgPSB7XHJcbiAgICAgIHg6IG9wdGlvbnMgJiYgb3B0aW9ucy5lbmQgJiYgb3B0aW9ucy5lbmQueCA/IG9wdGlvbnMuZW5kLnggOiAwLFxyXG4gICAgICB5OiBvcHRpb25zICYmIG9wdGlvbnMuZW5kICYmIG9wdGlvbnMuZW5kLnkgPyBvcHRpb25zLmVuZC55IDogMCxcclxuICAgIH07XHJcblxyXG4gICAgLy8gUGF0aCwgYSBiZXppZXIgY3ViaWMgY3VydmVcclxuICAgIGNvbnN0IHsgcGF0aENvb3Jkc0FycmF5IH0gPSB0aGlzLmNvbXB1dGVQYXRoQ29vcmRzKHtcclxuICAgICAgc3RhcnQ6IHtcclxuICAgICAgICB4OiBzdGFydC54LFxyXG4gICAgICAgIHk6IHN0YXJ0LnksXHJcbiAgICAgICAgZGlyZWN0aW9uOiB0aGlzLmRpcmVjdGlvbi5zdGFydCxcclxuICAgICAgfSxcclxuICAgICAgZW5kOiB7XHJcbiAgICAgICAgeDogZW5kLngsXHJcbiAgICAgICAgeTogZW5kLnksXHJcbiAgICAgICAgZGlyZWN0aW9uOiB0aGlzLmRpcmVjdGlvbi5lbmQsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IHBhdGhPcHRzID0gdGhpcy5kZWZhdWx0UGF0aE9wdGlvbnMgPSB7XHJcbiAgICAgIGZpbGw6ICcnLFxyXG4gICAgICBzdHJva2U6IChvcHRpb25zLmN1c3RvbSAmJiBvcHRpb25zLmN1c3RvbS5wYXRoICYmIG9wdGlvbnMuY3VzdG9tLnBhdGguc3Ryb2tlKSA/IG9wdGlvbnMuY3VzdG9tLnBhdGguc3Ryb2tlIDogJyM5OTknLFxyXG4gICAgICBzdHJva2VXaWR0aDogKG9wdGlvbnMuY3VzdG9tICYmIG9wdGlvbnMuY3VzdG9tLnBhdGggJiYgb3B0aW9ucy5jdXN0b20ucGF0aC5zdHJva2VXaWR0aCkgPyBvcHRpb25zLmN1c3RvbS5wYXRoLnN0cm9rZVdpZHRoIDogMixcclxuICAgICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAgIHNlbGVjdGFibGU6IHRydWUsXHJcbiAgICAgIGhhc0JvcmRlcnM6IHRydWUsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgICAgcGVyUGl4ZWxUYXJnZXRGaW5kOiB0cnVlLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHBhdGggPSBuZXcgZmFicmljLlBhdGgocGF0aENvb3Jkc0FycmF5LCBwYXRoT3B0cyk7XHJcbiAgICB0aGlzLnBhdGggPSBwYXRoO1xyXG5cclxuICAgIC8vIEVuZCBwb2ludCAoYXJyb3dIZWFkKVxyXG4gICAgY29uc3QgaXNWYWxpZE1hc2tPcHRzID0ge1xyXG4gICAgICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgcmFkaXVzOiAxNixcclxuICAgICAgZmlsbDogJyM1N2I4NTcnLCAvLyBlYTRmMzdcclxuICAgICAgc3Ryb2tlOiAnIzU3Yjg1NycsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgICAgc2VsZWN0YWJsZTogZmFsc2UsXHJcbiAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgYXJyb3dIZWFkT3B0cyA9IHtcclxuICAgICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAgIHdpZHRoOiAxMCxcclxuICAgICAgaGVpZ2h0OiAxMCxcclxuICAgICAgbGVmdDogZW5kLngsXHJcbiAgICAgIHRvcDogZW5kLnksXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICBmaWxsOiAnI2RkZCcsXHJcbiAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgIHN0cm9rZTogJyM5OTknLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIHNlbGVjdGFibGU6IHRydWUsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgYXJyb3dIZWFkID0gdGhpcy5hcnJvd0hlYWQgPSBuZXcgZmFicmljLlRyaWFuZ2xlKGFycm93SGVhZE9wdHMpO1xyXG4gICAgdGhpcy5pc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrID0gbmV3IGZhYnJpYy5DaXJjbGUoaXNWYWxpZE1hc2tPcHRzKTtcclxuICAgIGFycm93SGVhZC5vbignbW92aW5nJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhdGgoe1xyXG4gICAgICAgIGVuZDoge1xyXG4gICAgICAgICAgeDogYXJyb3dIZWFkLmxlZnQsXHJcbiAgICAgICAgICB5OiBhcnJvd0hlYWQudG9wLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tbWl0OiBmYWxzZSxcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuX2NoZWNrRXh0cmVtaXR5Q2FuQmVDb25uZWN0ZWQoJ2VuZCcpO1xyXG4gICAgfSk7XHJcbiAgICBhcnJvd0hlYWQub24oJ21vdmVkJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhdGgoe1xyXG4gICAgICAgIGVuZDoge1xyXG4gICAgICAgICAgeDogYXJyb3dIZWFkLmxlZnQsXHJcbiAgICAgICAgICB5OiBhcnJvd0hlYWQudG9wLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tbWl0OiB0cnVlLFxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5pc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrLnNldCgnb3BhY2l0eScsIDApO1xyXG4gICAgICB0aGlzLl9jb25uZWN0RGlzY29ubmVjdEV4dHJlbWl0eSgnZW5kJyk7XHJcbiAgICB9KTtcclxuICAgIGFycm93SGVhZC5vbignbW91c2Vkb3duJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLmJyaW5nVG9Gcm9udCgpO1xyXG4gICAgICB0aGlzLnRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KDEpO1xyXG5cclxuICAgICAgYXJyb3dIZWFkLm9uKCdtb3VzZXVwJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudG9nZ2xlQWxsQW5jaG9yc09wYWNpdHkoMCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU3RhcnQgcG9pbnQgKGFycm93VGFpbClcclxuICAgIGNvbnN0IGFycm93VGFpbE9wdHMgPSB7XHJcbiAgICAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgICB3aWR0aDogMTAsXHJcbiAgICAgIGhlaWdodDogMTAsXHJcbiAgICAgIGxlZnQ6IHN0YXJ0LngsXHJcbiAgICAgIHRvcDogc3RhcnQueSxcclxuICAgICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAgIGZpbGw6ICcjZGRkJyxcclxuICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgc3Ryb2tlOiAnIzk5OScsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgIH07XHJcbiAgICBjb25zdCBhcnJvd1RhaWwgPSB0aGlzLmFycm93VGFpbCA9IG5ldyBmYWJyaWMuUmVjdChhcnJvd1RhaWxPcHRzKTtcclxuICAgIHRoaXMuaXNWYWxpZFRhaWxDb25uZWN0aW9uTWFzayA9IG5ldyBmYWJyaWMuQ2lyY2xlKGlzVmFsaWRNYXNrT3B0cyk7XHJcbiAgICBhcnJvd1RhaWwub24oJ21vdmluZycsICgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVQYXRoKHtcclxuICAgICAgICBzdGFydDoge1xyXG4gICAgICAgICAgeDogYXJyb3dUYWlsLmxlZnQsXHJcbiAgICAgICAgICB5OiBhcnJvd1RhaWwudG9wLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tbWl0OiBmYWxzZSxcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuX2NoZWNrRXh0cmVtaXR5Q2FuQmVDb25uZWN0ZWQoJ3N0YXJ0Jyk7XHJcbiAgICB9KTtcclxuICAgIGFycm93VGFpbC5vbignbW92ZWQnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aCh7XHJcbiAgICAgICAgc3RhcnQ6IHtcclxuICAgICAgICAgIHg6IGFycm93VGFpbC5sZWZ0LFxyXG4gICAgICAgICAgeTogYXJyb3dUYWlsLnRvcCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbW1pdDogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuaXNWYWxpZFRhaWxDb25uZWN0aW9uTWFzay5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgICAgdGhpcy5fY29ubmVjdERpc2Nvbm5lY3RFeHRyZW1pdHkoJ3N0YXJ0Jyk7XHJcbiAgICB9KTtcclxuICAgIGFycm93VGFpbC5vbignbW91c2Vkb3duJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLmJyaW5nVG9Gcm9udCgpO1xyXG4gICAgICB0aGlzLnRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KDEpO1xyXG5cclxuICAgICAgYXJyb3dUYWlsLm9uKCdtb3VzZXVwJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudG9nZ2xlQWxsQW5jaG9yc09wYWNpdHkoMCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbmplY3QoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGlkLFxyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHBhdGgsXHJcbiAgICAgIGFycm93SGVhZCxcclxuICAgICAgYXJyb3dUYWlsLFxyXG4gICAgICBpc1ZhbGlkVGFpbENvbm5lY3Rpb25NYXNrLFxyXG4gICAgICBpc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrLFxyXG4gICAgfSA9IHRoaXM7XHJcbiAgICBjYW52YXMuYWRkKGlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2spO1xyXG4gICAgY2FudmFzLmFkZChpc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrKTtcclxuICAgIGNhbnZhcy5hZGQoYXJyb3dIZWFkKTtcclxuICAgIGNhbnZhcy5hZGQoYXJyb3dUYWlsKTtcclxuXHJcbiAgICBjYW52YXMuYWRkKHBhdGgpO1xyXG5cclxuICAgIHRoaXMudXBkYXRlUGF0aCh7XHJcbiAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgeDogcGF0aC5wYXRoWzBdWzFdLFxyXG4gICAgICAgIHk6IHBhdGgucGF0aFswXVsyXSxcclxuICAgICAgfSxcclxuICAgICAgZW5kOiB7XHJcbiAgICAgICAgeDogcGF0aC5wYXRoWzJdWzVdLFxyXG4gICAgICAgIHk6IHBhdGgucGF0aFsyXVs2XSxcclxuICAgICAgfSxcclxuICAgICAgY29tbWl0OiB0cnVlLFxyXG4gICAgfSk7XHJcblxyXG4gICAgY2FudmFzLmxpbmtzW2lkXSA9IHRoaXM7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICByZW1vdmUoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGlkLFxyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHBhdGgsXHJcbiAgICAgIGFycm93SGVhZCxcclxuICAgICAgYXJyb3dUYWlsLFxyXG4gICAgICBpc1ZhbGlkVGFpbENvbm5lY3Rpb25NYXNrLFxyXG4gICAgICBpc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrLFxyXG4gICAgfSA9IHRoaXM7XHJcbiAgICBjYW52YXMucmVtb3ZlKGlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2spO1xyXG4gICAgY2FudmFzLnJlbW92ZShpc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrKTtcclxuICAgIGNhbnZhcy5yZW1vdmUoYXJyb3dIZWFkKTtcclxuICAgIGNhbnZhcy5yZW1vdmUoYXJyb3dUYWlsKTtcclxuXHJcbiAgICBjYW52YXMucmVtb3ZlKHBhdGgpO1xyXG5cclxuICAgIGRlbGV0ZSBjYW52YXMubGlua3NbaWRdO1xyXG4gIH1cclxuXHJcbiAgY29ubmVjdExpbmsobGlua1BvaW50LCBzaGFwZUlkLCBjYXJkaW5hbCkge1xyXG4gICAgLy8gQ2hlY2sgbm90IGFscmVhZHkgY29ubmVjdGVkXHJcbiAgICBpZiAoIXRoaXMuaXNWYWxpZENvbm5lY3Rpb24obGlua1BvaW50LCBzaGFwZUlkLCBjYXJkaW5hbCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgc2hhcGUgPSB0aGlzLmNhbnZhcy5nZXRPYmplY3RzKClcclxuICAgICAgLmZpbmQoKG8pID0+IG8uaWQgPT09IHNoYXBlSWQpO1xyXG5cclxuICAgIC8vIERpc2Nvbm5lY3QgZXhpc3Rpbmcgb2JqZWN0XHJcbiAgICB0aGlzLmRpc2Nvbm5lY3RMaW5rKGxpbmtQb2ludCk7XHJcblxyXG4gICAgLy8gQ29ubmVjdFxyXG4gICAgdGhpcy5kaXJlY3Rpb25bbGlua1BvaW50XSA9IGNhcmRpbmFsO1xyXG4gICAgdGhpc1tsaW5rUG9pbnRdID0ge1xyXG4gICAgICBzaGFwZSxcclxuICAgICAgYW5jaG9yOiBjYXJkaW5hbCxcclxuICAgICAgaGFuZGxlcnM6IHtcclxuICAgICAgICBvbkFuY2hvclBvc2l0aW9uTW9kaWZ5aW5nOiAoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBvcHRzID0ge1xyXG4gICAgICAgICAgICBjb21taXQ6IGZhbHNlLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIG9wdHNbbGlua1BvaW50XSA9IHtcclxuICAgICAgICAgICAgeDogc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ubGVmdCxcclxuICAgICAgICAgICAgeTogc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0udG9wLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHRoaXMudXBkYXRlUGF0aChvcHRzKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQW5jaG9yUG9zaXRpb25Nb2RpZmllZDogKCkgPT4ge1xyXG4gICAgICAgICAgY29uc3Qgb3B0cyA9IHtcclxuICAgICAgICAgICAgY29tbWl0OiB0cnVlLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIG9wdHNbbGlua1BvaW50XSA9IHtcclxuICAgICAgICAgICAgeDogc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ubGVmdCxcclxuICAgICAgICAgICAgeTogc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0udG9wLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHRoaXMudXBkYXRlUGF0aChvcHRzKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICAgIC8vIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLm9wYWNpdHkgPSAwO1xyXG4gICAgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ub24oJ3BnOnBvc2l0aW9uOm1vZGlmeWluZycsIHRoaXNbbGlua1BvaW50XS5oYW5kbGVycy5vbkFuY2hvclBvc2l0aW9uTW9kaWZ5aW5nKTtcclxuICAgIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLm9uKCdwZzpwb3NpdGlvbjptb2RpZmllZCcsIHRoaXNbbGlua1BvaW50XS5oYW5kbGVycy5vbkFuY2hvclBvc2l0aW9uTW9kaWZpZWQpO1xyXG5cclxuICAgIC8vIFVwZGF0ZSBMaW5rXHJcbiAgICBjb25zdCBvcHRzID0ge1xyXG4gICAgICBjb21taXQ6IGZhbHNlLFxyXG4gICAgfTtcclxuICAgIG9wdHNbbGlua1BvaW50XSA9IHtcclxuICAgICAgeDogc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ubGVmdCxcclxuICAgICAgeTogc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0udG9wLFxyXG4gICAgfTtcclxuICAgIHRoaXMudXBkYXRlUGF0aChvcHRzKTtcclxuICB9XHJcblxyXG4gIGRpc2Nvbm5lY3RMaW5rKGxpbmtQb2ludCkge1xyXG4gICAgaWYgKHRoaXNbbGlua1BvaW50XSkge1xyXG4gICAgICB0aGlzW2xpbmtQb2ludF0uc2hhcGUuYW5jaG9yc1t0aGlzW2xpbmtQb2ludF0uYW5jaG9yXS5vZmYoJ3BnOnBvc2l0aW9uOm1vZGlmeWluZycsIHRoaXNbbGlua1BvaW50XS5oYW5kbGVycy5vbkFuY2hvclBvc2l0aW9uTW9kaWZ5aW5nKTtcclxuICAgICAgdGhpc1tsaW5rUG9pbnRdLnNoYXBlLmFuY2hvcnNbdGhpc1tsaW5rUG9pbnRdLmFuY2hvcl0ub2ZmKCdwZzpwb3NpdGlvbjptb2RpZmllZCcsIHRoaXNbbGlua1BvaW50XS5oYW5kbGVycy5vbkFuY2hvclBvc2l0aW9uTW9kaWZpZWQpO1xyXG4gICAgICBkZWxldGUgdGhpc1tsaW5rUG9pbnRdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYnJpbmdUb0Zyb250KCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHBhdGgsXHJcbiAgICAgIGFycm93SGVhZCxcclxuICAgICAgYXJyb3dUYWlsLFxyXG4gICAgfSA9IHRoaXM7XHJcbiAgICBjYW52YXMuYnJpbmdUb0Zyb250KHBhdGgpO1xyXG4gICAgY2FudmFzLmJyaW5nVG9Gcm9udChhcnJvd0hlYWQpO1xyXG4gICAgY2FudmFzLmJyaW5nVG9Gcm9udChhcnJvd1RhaWwpO1xyXG4gIH1cclxuXHJcbiAgY29tcHV0ZVBhdGhDb29yZHMob3B0aW9ucykge1xyXG4gICAgLy8gTWFnaWUgbWFnaWUsIGV0IHZvcyBpZMOpZXMgb250IGR1IGfDqW5pZSAhXHJcblxyXG4gICAgY29uc3Qgc3RhcnQgPSB7XHJcbiAgICAgIHg6IG9wdGlvbnMuc3RhcnQueCxcclxuICAgICAgeTogb3B0aW9ucy5zdGFydC55LFxyXG4gICAgICBkaXJlY3Rpb246IG9wdGlvbnMuc3RhcnQgJiYgb3B0aW9ucy5zdGFydC5kaXJlY3Rpb24gPyBvcHRpb25zLnN0YXJ0LmRpcmVjdGlvbiA6IHRoaXMuZGlyZWN0aW9uLnN0YXJ0LFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGVuZCA9IHtcclxuICAgICAgeDogb3B0aW9ucy5lbmQueCxcclxuICAgICAgeTogb3B0aW9ucy5lbmQueSxcclxuICAgICAgZGlyZWN0aW9uOiBvcHRpb25zLmVuZCAmJiBvcHRpb25zLmVuZC5kaXJlY3Rpb24gPyBvcHRpb25zLmVuZC5kaXJlY3Rpb24gOiB0aGlzLmRpcmVjdGlvbi5lbmQsXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENlbnRlciBwb2ludFxyXG4gICAgLy8gSWYgTGluayBpcyBjb25uZWN0ZWQsIGNlbnRlciBpcyBjYWxjdWxhdGVkIGJldHdlZW4gdGhlIHR3byBsaW5rZWQgc2hhcGVzXHJcbiAgICAvLyBJZiBub3QsIGl0IGlzIGNhbGN1bGF0ZWQgYmV0d2VlbiBsaW5rIHN0YXJ0IGFuZCBlbmQgcG9pbnRzXHJcbiAgICBjb25zdCBjZW50ZXIgPSB7XHJcbiAgICAgIHg6ICgoc3RhcnQueCArIGVuZC54KSAvIDIpLFxyXG4gICAgICB5OiAoKHN0YXJ0LnkgKyBlbmQueSkgLyAyKSxcclxuICAgIH07XHJcblxyXG4gICAgLy8gQ09NTUVOVEVEOiBEb2Vzbid0IHdvcmsgd2VsbCB3aGVuIGxpbmtlZCBzaGFwZSBpcyByb3RhdGVkXHJcbiAgICAvLyBpZiAodGhpcy5zdGFydCAmJiB0aGlzLmVuZCAmJiBzdGFydC5kaXJlY3Rpb24gIT09IGVuZC5kaXJlY3Rpb24pIHtcclxuICAgIC8vICAgY2VudGVyID0ge1xyXG4gICAgLy8gICAgIHg6ICh0aGlzLnN0YXJ0LnNoYXBlLmdldENlbnRlclBvaW50KCkueCArIHRoaXMuZW5kLnNoYXBlLmdldENlbnRlclBvaW50KCkueCkgLyAyLFxyXG4gICAgLy8gICAgIHk6ICh0aGlzLnN0YXJ0LnNoYXBlLmdldENlbnRlclBvaW50KCkueSArIHRoaXMuZW5kLnNoYXBlLmdldENlbnRlclBvaW50KCkueSkgLyAyLFxyXG4gICAgLy8gICB9O1xyXG4gICAgLy8gfVxyXG5cclxuICAgIGNvbnN0IGNvbnRyb2xzID0ge1xyXG4gICAgICBzdGFydDoge1xyXG4gICAgICAgIHg6IHN0YXJ0LngsXHJcbiAgICAgICAgeTogc3RhcnQueSxcclxuICAgICAgfSxcclxuICAgICAgZW5kOiB7XHJcbiAgICAgICAgeDogZW5kLngsXHJcbiAgICAgICAgeTogZW5kLnksXHJcbiAgICAgIH0sXHJcbiAgICAgIGNlbnRlcjE6IHtcclxuICAgICAgICB4OiBjZW50ZXIueCxcclxuICAgICAgICB5OiBjZW50ZXIueSxcclxuICAgICAgfSxcclxuICAgICAgY2VudGVyMjoge1xyXG4gICAgICAgIHg6IGNlbnRlci54LFxyXG4gICAgICAgIHk6IGNlbnRlci55LFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICAgIHN3aXRjaCAob3B0aW9ucy5zdGFydC5kaXJlY3Rpb24pIHtcclxuICAgICAgY2FzZSAnbm9ydGgnOlxyXG4gICAgICAgIGNvbnRyb2xzLnN0YXJ0LnkgLT0gTWF0aC5hYnMoc3RhcnQueSAtIGNlbnRlci55KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnc291dGgnOlxyXG4gICAgICAgIGNvbnRyb2xzLnN0YXJ0LnkgKz0gTWF0aC5hYnMoc3RhcnQueSAtIGNlbnRlci55KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnZWFzdCc6XHJcbiAgICAgICAgY29udHJvbHMuc3RhcnQueCArPSBNYXRoLmFicyhzdGFydC54IC0gY2VudGVyLngpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd3ZXN0JzpcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb250cm9scy5zdGFydC54IC09IE1hdGguYWJzKHN0YXJ0LnggLSBjZW50ZXIueCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICBzd2l0Y2ggKG9wdGlvbnMuZW5kLmRpcmVjdGlvbikge1xyXG4gICAgICBjYXNlICdub3J0aCc6XHJcbiAgICAgICAgY29udHJvbHMuZW5kLnkgLT0gTWF0aC5hYnMoZW5kLnkgLSBjZW50ZXIueSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3NvdXRoJzpcclxuICAgICAgICBjb250cm9scy5lbmQueSArPSBNYXRoLmFicyhlbmQueSAtIGNlbnRlci55KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnZWFzdCc6XHJcbiAgICAgICAgY29udHJvbHMuZW5kLnggKz0gTWF0aC5hYnMoZW5kLnggLSBjZW50ZXIueCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3dlc3QnOlxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbnRyb2xzLmVuZC54IC09IE1hdGguYWJzKGVuZC54IC0gY2VudGVyLngpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzdGFydC5kaXJlY3Rpb24gPT09IGVuZC5kaXJlY3Rpb24pIHtcclxuICAgICAgLy8gY29uc3QgZGVsdGFYID0gTWF0aC5hYnMoc3RhcnQueCAtIGVuZC54KSAvIDI7XHJcbiAgICAgIC8vIGNvbnN0IGRlbHRhWSA9IE1hdGguYWJzKHN0YXJ0LnkgLSBlbmQueSkgLyAyO1xyXG4gICAgICAvLyBjb25zdCBkZWx0YVggPSA0MCArIE1hdGguYWJzKHN0YXJ0LnggLSBlbmQueCkgLyA0O1xyXG4gICAgICAvLyBjb25zdCBkZWx0YVkgPSA0MCArIE1hdGguYWJzKHN0YXJ0LnkgLSBlbmQueSkgLyA0O1xyXG4gICAgICBjb25zdCBkZWx0YVggPSA0MDtcclxuICAgICAgY29uc3QgZGVsdGFZID0gNDA7XHJcblxyXG4gICAgICBpZiAoc3RhcnQuZGlyZWN0aW9uID09PSAnc291dGgnIHx8IHN0YXJ0LmRpcmVjdGlvbiA9PT0gJ25vcnRoJykge1xyXG4gICAgICAgIC8vIElmIGxpbmsgaXMgY29ubmVjdGVkIHRvIHR3byBzaGFwZXNcclxuICAgICAgICAvLyBJZiBzaGFwZXMgYXJlIGhvcml6b250YWxseSBhbGlnbmVkIChpLmUuIG9uIHRvcCBvZiBlYWNoIG90aGVyKSwgd2UgbW92ZSB0aGUgTGluayBjZW50ZXIgcG9pbnQgYSBiaXQgdG8gdGhlIGxlZnRcclxuICAgICAgICBpZiAodGhpcy5zdGFydCAmJiB0aGlzLmVuZCkge1xyXG4gICAgICAgICAgLy8gSWYgc2hhcGVzIGFyZSB2ZXJ0aWNhbGx5IGFsaWduZWQgKGkuZS4gbmV4dCB0byBlYWNoIG90aGVyKSwgd2UgbW92ZSB0aGUgTGluayBjZW50ZXIgcG9pbnQgYSBiaXQgdG8gdGhlIHRvcFxyXG4gICAgICAgICAgaWYgKE1hdGguYWJzKHN0YXJ0LnkgLSBlbmQueSkgPCAxMCkge1xyXG4gICAgICAgICAgICBjZW50ZXIueCAtPSAoKHRoaXMuc3RhcnQuc2hhcGUud2lkdGggKyB0aGlzLmVuZC5zaGFwZS53aWR0aCkgLyAyKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNlbnRlci55ICs9IChzdGFydC5kaXJlY3Rpb24gPT09ICdzb3V0aCcgPyBkZWx0YVkgOiAtZGVsdGFZKTtcclxuICAgICAgICBjb250cm9scy5zdGFydC55ID0gc3RhcnQueSArIChzdGFydC5kaXJlY3Rpb24gPT09ICdzb3V0aCcgPyBkZWx0YVkgOiAtZGVsdGFZKTtcclxuICAgICAgICBjb250cm9scy5lbmQueSA9IGVuZC55ICsgKHN0YXJ0LmRpcmVjdGlvbiA9PT0gJ3NvdXRoJyA/IGRlbHRhWSA6IC1kZWx0YVkpO1xyXG4gICAgICAgIGNvbnRyb2xzLmNlbnRlcjEueCA9IGNlbnRlci54O1xyXG4gICAgICAgIGNvbnRyb2xzLmNlbnRlcjIueCA9IGNlbnRlci54O1xyXG4gICAgICAgIGNvbnRyb2xzLmNlbnRlcjEueSA9IGNvbnRyb2xzLnN0YXJ0Lnk7XHJcbiAgICAgICAgY29udHJvbHMuY2VudGVyMi55ID0gY29udHJvbHMuZW5kLnk7XHJcbiAgICAgIH0gZWxzZSBpZiAoc3RhcnQuZGlyZWN0aW9uID09PSAnZWFzdCcgfHwgc3RhcnQuZGlyZWN0aW9uID09PSAnd2VzdCcpIHtcclxuICAgICAgICAvLyBJZiBsaW5rIGlzIGNvbm5lY3RlZCB0byB0d28gc2hhcGVzXHJcbiAgICAgICAgaWYgKHRoaXMuc3RhcnQgJiYgdGhpcy5lbmQpIHtcclxuICAgICAgICAgIC8vIElmIHNoYXBlcyBhcmUgdmVydGljYWxseSBhbGlnbmVkIChpLmUuIG5leHQgdG8gZWFjaCBvdGhlciksIHdlIG1vdmUgdGhlIExpbmsgY2VudGVyIHBvaW50IGEgYml0IHRvIHRoZSB0b3BcclxuICAgICAgICAgIGlmIChNYXRoLmFicyhzdGFydC55IC0gZW5kLnkpIDwgMTApIHtcclxuICAgICAgICAgICAgY2VudGVyLnkgLT0gKCh0aGlzLnN0YXJ0LnNoYXBlLmhlaWdodCArIHRoaXMuZW5kLnNoYXBlLmhlaWdodCkgLyAyKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNlbnRlci54ICs9IChzdGFydC5kaXJlY3Rpb24gPT09ICdlYXN0JyA/IGRlbHRhWCA6IC1kZWx0YVgpO1xyXG4gICAgICAgIGNvbnRyb2xzLnN0YXJ0LnggPSBzdGFydC54ICsgKHN0YXJ0LmRpcmVjdGlvbiA9PT0gJ2Vhc3QnID8gZGVsdGFYIDogLWRlbHRhWCk7XHJcbiAgICAgICAgY29udHJvbHMuZW5kLnggPSBlbmQueCArIChzdGFydC5kaXJlY3Rpb24gPT09ICdlYXN0JyA/IGRlbHRhWCA6IC1kZWx0YVgpO1xyXG4gICAgICAgIGNvbnRyb2xzLmNlbnRlcjEueCA9IGNvbnRyb2xzLnN0YXJ0Lng7XHJcbiAgICAgICAgY29udHJvbHMuY2VudGVyMi54ID0gY29udHJvbHMuZW5kLng7XHJcbiAgICAgICAgY29udHJvbHMuY2VudGVyMS55ID0gY2VudGVyLnk7XHJcbiAgICAgICAgY29udHJvbHMuY2VudGVyMi55ID0gY2VudGVyLnk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoc3RhcnQuZGlyZWN0aW9uID09PSAnc291dGgnIHx8IHN0YXJ0LmRpcmVjdGlvbiA9PT0gJ25vcnRoJykge1xyXG4gICAgICBjb250cm9scy5jZW50ZXIxLnggPSBjZW50ZXIueDtcclxuICAgICAgY29udHJvbHMuY2VudGVyMS55ID0gY29udHJvbHMuc3RhcnQueTtcclxuICAgICAgY29udHJvbHMuY2VudGVyMi54ID0gY2VudGVyLng7XHJcbiAgICAgIGNvbnRyb2xzLmNlbnRlcjIueSA9IGNvbnRyb2xzLmVuZC55O1xyXG4gICAgfSBlbHNlIGlmIChzdGFydC5kaXJlY3Rpb24gPT09ICdlYXN0JyB8fCBzdGFydC5kaXJlY3Rpb24gPT09ICd3ZXN0Jykge1xyXG4gICAgICBjb250cm9scy5jZW50ZXIxLnggPSBjb250cm9scy5zdGFydC54O1xyXG4gICAgICBjb250cm9scy5jZW50ZXIxLnkgPSBjZW50ZXIueTtcclxuICAgICAgY29udHJvbHMuY2VudGVyMi54ID0gY29udHJvbHMuZW5kLng7XHJcbiAgICAgIGNvbnRyb2xzLmNlbnRlcjIueSA9IGNlbnRlci55O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIElmIGxpbmsgaXMgY29ubmVjdGVkIHRvIGxpbmtlZCBzaGFwZXMgYW5kIHRoZXkgYXJlIHJvdGF0ZWQsIHBlcmZvcm0gdGhlIHJvdGF0aW9uIG9uIHRoZSBjb250cm9scyBwb2ludHNcclxuICAgIC8vIFRPRE86IHRvIGltcHJvdmVcclxuICAgIGlmICh0aGlzLnN0YXJ0ICYmIHRoaXMuc3RhcnQuc2hhcGUgJiYgdGhpcy5zdGFydC5zaGFwZS5hbmdsZSkge1xyXG4gICAgICBjb25zdCBhbmdsZSA9ICgodGhpcy5zdGFydC5zaGFwZS5hbmdsZSAqIE1hdGguUEkpIC8gMTgwKTtcclxuXHJcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSBuZXcgZmFicmljLlBvaW50KGNvbnRyb2xzLnN0YXJ0LngsIGNvbnRyb2xzLnN0YXJ0LnkpO1xyXG4gICAgICBjb25zdCBvcmlnaW4gPSBuZXcgZmFicmljLlBvaW50KHN0YXJ0LngsIHN0YXJ0LnkpO1xyXG4gICAgICBjb25zdCByb3RhdGVkQ29udHJvbCA9IGZhYnJpYy51dGlsLnJvdGF0ZVBvaW50KGNvbnRyb2wsIG9yaWdpbiwgYW5nbGUpO1xyXG5cclxuICAgICAgY29udHJvbHMuc3RhcnQueCA9IHJvdGF0ZWRDb250cm9sLng7XHJcbiAgICAgIGNvbnRyb2xzLnN0YXJ0LnkgPSByb3RhdGVkQ29udHJvbC55O1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZW5kICYmIHRoaXMuZW5kLnNoYXBlICYmIHRoaXMuZW5kLnNoYXBlLmFuZ2xlKSB7XHJcbiAgICAgIGNvbnN0IGFuZ2xlID0gKCh0aGlzLmVuZC5zaGFwZS5hbmdsZSAqIE1hdGguUEkpIC8gMTgwKTtcclxuXHJcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSBuZXcgZmFicmljLlBvaW50KGNvbnRyb2xzLmVuZC54LCBjb250cm9scy5lbmQueSk7XHJcbiAgICAgIGNvbnN0IG9yaWdpbiA9IG5ldyBmYWJyaWMuUG9pbnQoZW5kLngsIGVuZC55KTtcclxuICAgICAgY29uc3Qgcm90YXRlZENvbnRyb2wgPSBmYWJyaWMudXRpbC5yb3RhdGVQb2ludChjb250cm9sLCBvcmlnaW4sIGFuZ2xlKTtcclxuXHJcbiAgICAgIGNvbnRyb2xzLmVuZC54ID0gcm90YXRlZENvbnRyb2wueDtcclxuICAgICAgY29udHJvbHMuZW5kLnkgPSByb3RhdGVkQ29udHJvbC55O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFZpc3VhbCBkZWJ1Z1xyXG4gICAgLy8gdGhpcy5jYW52YXMuYWRkKG5ldyBmYWJyaWMuQ2lyY2xlKHtcclxuICAgIC8vICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAvLyAgIGxlZnQ6IGNvbnRyb2xzLmVuZC54LFxyXG4gICAgLy8gICB0b3A6IGNvbnRyb2xzLmVuZC55LFxyXG4gICAgLy8gICBzdHJva2VXaWR0aDogMSxcclxuICAgIC8vICAgcmFkaXVzOiAyLFxyXG4gICAgLy8gICBmaWxsOiAnIzc4YmVmYScsXHJcbiAgICAvLyAgIHN0cm9rZTogJyM3OGJlZmEnLFxyXG4gICAgLy8gICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgIC8vICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAvLyAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgLy8gICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAvLyAgIHNlbGVjdGFibGU6IHRydWUsXHJcbiAgICAvLyAgIG9wYWNpdHk6IDEsXHJcbiAgICAvLyB9KSk7XHJcbiAgICAvLyB0aGlzLmNhbnZhcy5hZGQobmV3IGZhYnJpYy5DaXJjbGUoe1xyXG4gICAgLy8gICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgIC8vICAgbGVmdDogY2VudGVyLngsXHJcbiAgICAvLyAgIHRvcDogY2VudGVyLnksXHJcbiAgICAvLyAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgLy8gICByYWRpdXM6IDIsXHJcbiAgICAvLyAgIGZpbGw6ICcjZmYyJyxcclxuICAgIC8vICAgc3Ryb2tlOiAnI2ZmMicsXHJcbiAgICAvLyAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgLy8gICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgIC8vICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAvLyAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgIC8vICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgIC8vICAgb3BhY2l0eTogMSxcclxuICAgIC8vIH0pKTtcclxuICAgIC8vIHRoaXMuY2FudmFzLmFkZChuZXcgZmFicmljLkNpcmNsZSh7XHJcbiAgICAvLyAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgLy8gICBsZWZ0OiBjb250cm9scy5zdGFydC54LFxyXG4gICAgLy8gICB0b3A6IGNvbnRyb2xzLnN0YXJ0LnksXHJcbiAgICAvLyAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgLy8gICByYWRpdXM6IDIsXHJcbiAgICAvLyAgIGZpbGw6ICcjZjIyJyxcclxuICAgIC8vICAgc3Ryb2tlOiAnI2YyMicsXHJcbiAgICAvLyAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgLy8gICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgIC8vICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAvLyAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgIC8vICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgIC8vICAgb3BhY2l0eTogMSxcclxuICAgIC8vIH0pKTtcclxuXHJcbiAgICBjb25zdCBjb29yZHMgPSB7XHJcbiAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgeDogc3RhcnQueCxcclxuICAgICAgICB5OiBzdGFydC55LFxyXG4gICAgICB9LFxyXG4gICAgICBlbmQ6IHtcclxuICAgICAgICB4OiBlbmQueCxcclxuICAgICAgICB5OiBlbmQueSxcclxuICAgICAgfSxcclxuICAgICAgY2VudGVyLFxyXG4gICAgICBjb250cm9sczoge1xyXG4gICAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgICB4OiBjb250cm9scy5zdGFydC54LFxyXG4gICAgICAgICAgeTogY29udHJvbHMuc3RhcnQueSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVuZDoge1xyXG4gICAgICAgICAgeDogY29udHJvbHMuZW5kLngsXHJcbiAgICAgICAgICB5OiBjb250cm9scy5lbmQueSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNlbnRlcjE6IHtcclxuICAgICAgICAgIHg6IGNvbnRyb2xzLmNlbnRlcjEueCxcclxuICAgICAgICAgIHk6IGNvbnRyb2xzLmNlbnRlcjEueSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNlbnRlcjI6IHtcclxuICAgICAgICAgIHg6IGNvbnRyb2xzLmNlbnRlcjIueCxcclxuICAgICAgICAgIHk6IGNvbnRyb2xzLmNlbnRlcjIueSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHBhdGhDb29yZHNBcnJheSA9IFtcclxuICAgICAgWydNJywgY29vcmRzLnN0YXJ0LngsIGNvb3Jkcy5zdGFydC55XSxcclxuICAgICAgWydDJywgY29vcmRzLmNvbnRyb2xzLnN0YXJ0LngsIGNvb3Jkcy5jb250cm9scy5zdGFydC55LCBjb29yZHMuY29udHJvbHMuY2VudGVyMS54LCBjb29yZHMuY29udHJvbHMuY2VudGVyMS55LCBjb29yZHMuY2VudGVyLngsIGNvb3Jkcy5jZW50ZXIueV0sXHJcbiAgICAgIFsnQycsIGNvb3Jkcy5jb250cm9scy5jZW50ZXIyLngsIGNvb3Jkcy5jb250cm9scy5jZW50ZXIyLnksIGNvb3Jkcy5jb250cm9scy5lbmQueCwgY29vcmRzLmNvbnRyb2xzLmVuZC55LCBjb29yZHMuZW5kLngsIGNvb3Jkcy5lbmQueV0sXHJcbiAgICBdO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcGF0aENvb3JkczogY29vcmRzLFxyXG4gICAgICBwYXRoQ29vcmRzQXJyYXksXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0gb3B0aW9uc1xyXG4gICAqIEBwYXJhbSBvcHRpb25zLnN0YXJ0LnhcclxuICAgKiBAcGFyYW0gb3B0aW9ucy5zdGFydC55XHJcbiAgICogQHBhcmFtIG9wdGlvbnMuZW5kLnhcclxuICAgKiBAcGFyYW0gb3B0aW9ucy5lbmQueVxyXG4gICAqIEBwYXJhbSBvcHRpb25zLmNvbW1pdFxyXG4gICAqL1xyXG4gIHVwZGF0ZVBhdGgob3B0aW9ucykge1xyXG4gICAgY29uc3Qgc3RhcnQgPSB7XHJcbiAgICAgIHg6IG9wdGlvbnMuc3RhcnQgJiYgb3B0aW9ucy5zdGFydC54ID8gb3B0aW9ucy5zdGFydC54IDogdGhpcy5wYXRoLnBhdGhbMF1bMV0sXHJcbiAgICAgIHk6IG9wdGlvbnMuc3RhcnQgJiYgb3B0aW9ucy5zdGFydC55ID8gb3B0aW9ucy5zdGFydC55IDogdGhpcy5wYXRoLnBhdGhbMF1bMl0sXHJcbiAgICAgIGRpcmVjdGlvbjogb3B0aW9ucy5zdGFydCAmJiBvcHRpb25zLnN0YXJ0LmRpcmVjdGlvbiA/IG9wdGlvbnMuc3RhcnQuZGlyZWN0aW9uIDogdGhpcy5kaXJlY3Rpb24uc3RhcnQsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgZW5kID0ge1xyXG4gICAgICB4OiBvcHRpb25zLmVuZCAmJiBvcHRpb25zLmVuZC54ID8gb3B0aW9ucy5lbmQueCA6IHRoaXMucGF0aC5wYXRoWzJdWzVdLFxyXG4gICAgICB5OiBvcHRpb25zLmVuZCAmJiBvcHRpb25zLmVuZC55ID8gb3B0aW9ucy5lbmQueSA6IHRoaXMucGF0aC5wYXRoWzJdWzZdLFxyXG4gICAgICBkaXJlY3Rpb246IG9wdGlvbnMuZW5kICYmIG9wdGlvbnMuZW5kLmRpcmVjdGlvbiA/IG9wdGlvbnMuZW5kLmRpcmVjdGlvbiA6IHRoaXMuZGlyZWN0aW9uLmVuZCxcclxuICAgIH07XHJcbiAgICBjb25zdCB7IHBhdGhDb29yZHNBcnJheSB9ID0gdGhpcy5jb21wdXRlUGF0aENvb3Jkcyh7XHJcbiAgICAgIHN0YXJ0LCBlbmQsXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAob3B0aW9ucy5jb21taXQpIHtcclxuICAgICAgY29uc3QgbmV3UGF0aCA9IG5ldyBmYWJyaWMuUGF0aChwYXRoQ29vcmRzQXJyYXksIHRoaXMuZGVmYXVsdFBhdGhPcHRpb25zKTtcclxuICAgICAgdGhpcy5jYW52YXMucmVtb3ZlKHRoaXMucGF0aCk7XHJcbiAgICAgIHRoaXMuY2FudmFzLmFkZChuZXdQYXRoKTtcclxuXHJcbiAgICAgIG5ld1BhdGgub24oJ21vdXNlZG93bicsIHRoaXMuYnJpbmdUb0Zyb250LmJpbmQodGhpcykpO1xyXG4gICAgICBuZXdQYXRoLm9uKCdtb3ZpbmcnLCB0aGlzLm9uTGlua01vdmluZy5iaW5kKHRoaXMpKTtcclxuICAgICAgbmV3UGF0aC5vbignbW92ZWQnLCB0aGlzLm9uTGlua01vdmVkLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgY29uc3QgdG9CaW5kID0gW1xyXG4gICAgICAgIHRoaXMuYXJyb3dIZWFkLFxyXG4gICAgICAgIHRoaXMuYXJyb3dUYWlsLFxyXG4gICAgICBdO1xyXG4gICAgICBjb25zdCBib3NzVHJhbnNmb3JtID0gbmV3UGF0aC5jYWxjVHJhbnNmb3JtTWF0cml4KCk7XHJcbiAgICAgIGNvbnN0IGludmVydGVkQm9zc1RyYW5zZm9ybSA9IGZhYnJpYy51dGlsLmludmVydFRyYW5zZm9ybShib3NzVHJhbnNmb3JtKTtcclxuICAgICAgdG9CaW5kLmZvckVhY2goKG8pID0+IHtcclxuICAgICAgICBjb25zdCBkZXNpcmVkVHJhbnNmb3JtID0gZmFicmljLnV0aWwubXVsdGlwbHlUcmFuc2Zvcm1NYXRyaWNlcyhcclxuICAgICAgICAgIGludmVydGVkQm9zc1RyYW5zZm9ybSxcclxuICAgICAgICAgIG8uY2FsY1RyYW5zZm9ybU1hdHJpeCgpLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXHJcbiAgICAgICAgby5yZWxhdGlvbnNoaXAgPSBkZXNpcmVkVHJhbnNmb3JtO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMucGF0aCA9IG5ld1BhdGg7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhdGguc2V0KCdwYXRoJywgcGF0aENvb3Jkc0FycmF5KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBVcGRhdGUgY29udHJvbCBsaW5lcywgYXJyb3cgaGVhZHMgYW5kIHRhaWxzXHJcbiAgICBjb25zdCBhcnJvd0hlYWRBbmdsZSA9IChNYXRoLmF0YW4yKHRoaXMucGF0aC5wYXRoWzJdWzZdIC0gdGhpcy5wYXRoLnBhdGhbMl1bNF0sIHRoaXMucGF0aC5wYXRoWzJdWzVdIC0gdGhpcy5wYXRoLnBhdGhbMl1bM10pICogMTgwKSAvIE1hdGguUEk7XHJcbiAgICB0aGlzLmFycm93SGVhZC5hbmdsZSA9IGFycm93SGVhZEFuZ2xlICsgOTA7XHJcbiAgICB0aGlzLmFycm93SGVhZC5sZWZ0ID0gdGhpcy5wYXRoLnBhdGhbMl1bNV07XHJcbiAgICB0aGlzLmFycm93SGVhZC50b3AgPSB0aGlzLnBhdGgucGF0aFsyXVs2XTtcclxuICAgIHRoaXMuYXJyb3dIZWFkLnNldENvb3JkcygpO1xyXG4gICAgdGhpcy5hcnJvd1RhaWwubGVmdCA9IHRoaXMucGF0aC5wYXRoWzBdWzFdO1xyXG4gICAgdGhpcy5hcnJvd1RhaWwudG9wID0gdGhpcy5wYXRoLnBhdGhbMF1bMl07XHJcbiAgICB0aGlzLmFycm93VGFpbC5zZXRDb29yZHMoKTtcclxuXHJcbiAgICB0aGlzLmJyaW5nVG9Gcm9udCgpO1xyXG4gIH1cclxuXHJcbiAgaXNWYWxpZENvbm5lY3Rpb24obGlua1BvaW50LCBzaGFwZUlkLCBjYXJkaW5hbCkge1xyXG4gICAgY29uc3Qgc2hhcGUgPSB0aGlzLmNhbnZhcy5nZXRPYmplY3RzKClcclxuICAgICAgLmZpbmQoKG8pID0+IG8uaWQgPT09IHNoYXBlSWQpO1xyXG4gICAgLy8gQ2hlY2sgbm90IGFscmVhZHkgY29ubmVjdGVkXHJcbiAgICBpZiAobGlua1BvaW50ID09PSAnc3RhcnQnKSB7XHJcbiAgICAgIGlmICh0aGlzLnN0YXJ0ICYmIHRoaXMuc3RhcnQuc2hhcGUgJiYgdGhpcy5zdGFydC5zaGFwZS5pZCA9PT0gc2hhcGUuaWQgJiYgdGhpcy5zdGFydC5jYXJkaW5hbCA9PT0gY2FyZGluYWwpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIHRyeWluZyBlbmQgc2V0IHRoZSBzYW1lIGFscmVhZHkgY29ubmVjdGVkIGFuY2hvclxyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLmVuZCAmJiB0aGlzLmVuZC5zaGFwZSAmJiB0aGlzLmVuZC5zaGFwZS5pZCA9PT0gc2hhcGUuaWQpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIHRyeWluZyBlbmQgc2hvcnQgY2lyY3VpdCB0aGUgcmVjdGFuZ2xlXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAobGlua1BvaW50ID09PSAnZW5kJykge1xyXG4gICAgICBpZiAodGhpcy5lbmQgJiYgdGhpcy5lbmQuc2hhcGUgJiYgdGhpcy5lbmQuc2hhcGUuaWQgPT09IHNoYXBlLmlkICYmIHRoaXMuZW5kLmNhcmRpbmFsID09PSBjYXJkaW5hbCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTsgLy8gdHJ5aW5nIGVuZCBzZXQgdGhlIHNhbWUgYWxyZWFkeSBjb25uZWN0ZWQgYW5jaG9yXHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuc3RhcnQgJiYgdGhpcy5zdGFydC5zaGFwZSAmJiB0aGlzLnN0YXJ0LnNoYXBlLmlkID09PSBzaGFwZS5pZCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTsgLy8gdHJ5aW5nIGVuZCBzaG9ydCBjaXJjdWl0IHRoZSByZWN0YW5nbGVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVBbGxBbmNob3JzT3BhY2l0eShvcGFjaXR5KSB7XHJcbiAgICByZXR1cm47XHJcblxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVucmVhY2hhYmxlXHJcbiAgICBjb25zdCBhbmNob3JzID0gdGhpcy5jYW52YXMuZ2V0T2JqZWN0cygpXHJcbiAgICAgIC5maWx0ZXIoKG8pID0+IG8udHlwZSA9PT0gJ2FuY2hvcicpO1xyXG5cclxuICAgIC8vIGNvbnN0IHByb21pc2VzID0gW107XHJcbiAgICAvLyBjb25zdCBwcm9taXNlRmFjdG9yeSA9IGZ1bmN0aW9uIChhbmNob3IpIHtcclxuICAgIC8vICAgcmV0dXJuIGZ1bmN0aW9uIChyZXNvbHZlKSB7XHJcbiAgICAvLyAgICAgYW5jaG9yLmFuaW1hdGUoJ29wYWNpdHknLCBvcGFjaXR5LCB7XHJcbiAgICAvLyAgICAgICBkdXJhdGlvbjogMzAwLFxyXG4gICAgLy8gICAgICAgb25DaGFuZ2U6IHJlc29sdmUsXHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyAgIH07XHJcbiAgICAvLyB9O1xyXG4gICAgLy8gZm9yIChsZXQgYSA9IDA7IGEgPCBhbmNob3JzLmxlbmd0aDsgYSArPSAxKSB7XHJcbiAgICAvLyAgIGlmIChsb2NrICE9PSB1bmRlZmluZWQpIGFuY2hvcnNbYV0ubG9ja09wYWNpdHkgPSBsb2NrO1xyXG4gICAgLy8gICBwcm9taXNlcy5wdXNoKG5ldyBQcm9taXNlKHByb21pc2VGYWN0b3J5KGFuY2hvcnNbYV0pKSk7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiB7XHJcbiAgICAvLyAgIHRoaXMuY2FudmFzLnJlbmRlckFsbCgpO1xyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgZm9yIChsZXQgYSA9IDA7IGEgPCBhbmNob3JzLmxlbmd0aDsgYSArPSAxKSB7XHJcbiAgICAgIC8vIGlmIChsb2NrICE9PSB1bmRlZmluZWQpIGFuY2hvcnNbYV0ubG9ja09wYWNpdHkgPSBsb2NrO1xyXG4gICAgICBhbmNob3JzW2FdLnNldCgnb3BhY2l0eScsIG9wYWNpdHkpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jYW52YXMucmVuZGVyQWxsKCk7XHJcbiAgfVxyXG5cclxuICBvbkxpbmtNb3ZpbmcoKSB7XHJcbiAgICAvLyBNb3ZlIHN0YXJ0LCBlbmQsIGNvbnRyb2wgcG9pbnRzIGFsdG9nZXRoZXIgd2l0aCB0aGUgUGF0aFxyXG4gICAgY29uc3QgdG9VcGRhdGUgPSBbXHJcbiAgICAgIHRoaXMuYXJyb3dIZWFkLFxyXG4gICAgICB0aGlzLmFycm93VGFpbCxcclxuICAgIF07XHJcblxyXG4gICAgY29uc3Qga2VlcEhlYWRBbmdsZSA9IHRoaXMuYXJyb3dIZWFkLmFuZ2xlO1xyXG4gICAgY29uc3Qga2VlcFRhaWxBbmdsZSA9IHRoaXMuYXJyb3dUYWlsLmFuZ2xlO1xyXG5cclxuICAgIHRvVXBkYXRlLmZvckVhY2goKG8pID0+IHtcclxuICAgICAgaWYgKCFvLnJlbGF0aW9uc2hpcCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCB7IHJlbGF0aW9uc2hpcCB9ID0gbztcclxuICAgICAgY29uc3QgbmV3VHJhbnNmb3JtID0gZmFicmljLnV0aWwubXVsdGlwbHlUcmFuc2Zvcm1NYXRyaWNlcyhcclxuICAgICAgICB0aGlzLnBhdGguY2FsY1RyYW5zZm9ybU1hdHJpeCgpLFxyXG4gICAgICAgIHJlbGF0aW9uc2hpcCxcclxuICAgICAgKTtcclxuICAgICAgY29uc3Qgb3B0ID0gZmFicmljLnV0aWwucXJEZWNvbXBvc2UobmV3VHJhbnNmb3JtKTtcclxuICAgICAgby5zZXQoe1xyXG4gICAgICAgIGZsaXBYOiBmYWxzZSxcclxuICAgICAgICBmbGlwWTogZmFsc2UsXHJcbiAgICAgIH0pO1xyXG4gICAgICBvLnNldFBvc2l0aW9uQnlPcmlnaW4oXHJcbiAgICAgICAgeyB4OiBvcHQudHJhbnNsYXRlWCwgeTogb3B0LnRyYW5zbGF0ZVkgfSxcclxuICAgICAgICAnY2VudGVyJyxcclxuICAgICAgICAnY2VudGVyJyxcclxuICAgICAgKTtcclxuICAgICAgby5zZXQob3B0KTtcclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXHJcbiAgICAgIG8uYW5nbGUgPSAobyA9PT0gdGhpcy5hcnJvd0hlYWQpID8ga2VlcEhlYWRBbmdsZSA6IGtlZXBUYWlsQW5nbGU7IC8vIHByZXNlcnZlIHByZXZpb3VzIGFuZ2xlXHJcblxyXG4gICAgICBvLnNldENvb3JkcygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gRmluYWxseSwgY2hlY2sgdGhlIHN0YXJ0IG9yIGVuZCBwb2ludHMgY2FuIGJlIGNvbm5lY3RlZC5cclxuICAgIHRoaXMuX2NoZWNrRXh0cmVtaXR5Q2FuQmVDb25uZWN0ZWQoJ3N0YXJ0Jyk7XHJcbiAgICB0aGlzLl9jaGVja0V4dHJlbWl0eUNhbkJlQ29ubmVjdGVkKCdlbmQnKTtcclxuICB9XHJcblxyXG4gIG9uTGlua01vdmVkKCkge1xyXG4gICAgLy8gUmV1cGRhdGUgdGhlIFBhdGggYWNjb3JkaW5nIGVuZCB0aGUgbmV3IGNvb3JkaW5hdGVzIG9mIGFsbCBlbGVtZW50c1xyXG4gICAgdGhpcy51cGRhdGVQYXRoKHtcclxuICAgICAgc3RhcnQ6IHtcclxuICAgICAgICB4OiB0aGlzLmFycm93VGFpbC5sZWZ0LFxyXG4gICAgICAgIHk6IHRoaXMuYXJyb3dUYWlsLnRvcCxcclxuICAgICAgfSxcclxuICAgICAgZW5kOiB7XHJcbiAgICAgICAgeDogdGhpcy5hcnJvd0hlYWQubGVmdCxcclxuICAgICAgICB5OiB0aGlzLmFycm93SGVhZC50b3AsXHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbW1pdDogdHJ1ZSxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIENvbm5lY3Qgb3IgRGlzY29ubmVjdCBkZXBlbmRpbmcgb24gZXh0cmVtaXRpZXMgcG9zaXRpb25zXHJcbiAgICB0aGlzLmlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2suc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICB0aGlzLmlzVmFsaWRIZWFkQ29ubmVjdGlvbk1hc2suc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICB0aGlzLl9jb25uZWN0RGlzY29ubmVjdEV4dHJlbWl0eSgnc3RhcnQnKTtcclxuICAgIHRoaXMuX2Nvbm5lY3REaXNjb25uZWN0RXh0cmVtaXR5KCdlbmQnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhlbHBlciBlbmQgZGlzcGxheSBhIHZhbGlkIGNpcmNsZSBtYXNrIG9uIHNwZWNpZmljIGNvbmRpdGlvbnMuXHJcbiAgICogSWYgdGhlIGV4dHJlbWl0eSBpcyB0b3VjaGluZyBhbiBhbmNob3Igb2YgYSBMaW5rYWJsZVNoYXBlIHN0YXJ0IHdoaWNoIGl0IGlzIG5vdCB5ZXQgY29ubmVjdGVkID0+IHNob3cgR1JFRU5cclxuICAgKiBJZiB0aGUgZXh0cmVtaXR5IGlzIHRvdWNoaW5nIGFuIGFuY2hvciBvZiBhIExpbmthYmxlU2hhcGUgc3RhcnQgd2hpY2ggaXQgaXMgYWxyZWFkeSBjb25uZWN0ZWQgYnkgdGhlIG90aGVyIGV4dHJlbWl0eSA9PiBzaG93IFJFRFxyXG4gICAqIEBwYXJhbSBkaXJlY3Rpb25cclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9jaGVja0V4dHJlbWl0eUNhbkJlQ29ubmVjdGVkKGRpcmVjdGlvbikge1xyXG4gICAgY29uc3QgeyBjYW52YXMgfSA9IHRoaXM7XHJcblxyXG4gICAgbGV0IGV4dHJlbWl0eTtcclxuICAgIGxldCBtYXNrO1xyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3N0YXJ0Jykge1xyXG4gICAgICBleHRyZW1pdHkgPSB0aGlzLmFycm93VGFpbDtcclxuICAgICAgbWFzayA9IHRoaXMuaXNWYWxpZFRhaWxDb25uZWN0aW9uTWFzaztcclxuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnZW5kJykge1xyXG4gICAgICBleHRyZW1pdHkgPSB0aGlzLmFycm93SGVhZDtcclxuICAgICAgbWFzayA9IHRoaXMuaXNWYWxpZEhlYWRDb25uZWN0aW9uTWFzaztcclxuICAgIH1cclxuXHJcbiAgICBtYXNrLmxlZnQgPSBleHRyZW1pdHkubGVmdDtcclxuICAgIG1hc2sudG9wID0gZXh0cmVtaXR5LnRvcDtcclxuICAgIG1hc2suc2V0Q29vcmRzKCk7XHJcbiAgICBtYXNrLnNldCgnb3BhY2l0eScsIDApO1xyXG5cclxuICAgIC8vIENoZWNrIGlmIGludGVyc2VjdHMgd2l0aCBhbmNob3JcclxuICAgIGNvbnN0IGFuY2hvcnMgPSBjYW52YXMuZ2V0T2JqZWN0cygpXHJcbiAgICAgIC5maWx0ZXIoKG8pID0+IG8udHlwZSA9PT0gJ2FuY2hvcicpO1xyXG4gICAgZm9yIChsZXQgYSA9IDA7IGEgPCBhbmNob3JzLmxlbmd0aDsgYSArPSAxKSB7XHJcbiAgICAgIGlmIChleHRyZW1pdHkuaW50ZXJzZWN0c1dpdGhPYmplY3QoYW5jaG9yc1thXSkpIHtcclxuICAgICAgICBtYXNrLnNldCgnb3BhY2l0eScsIDAuNSk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZENvbm5lY3Rpb24oZGlyZWN0aW9uLCBhbmNob3JzW2FdLnNoYXBlSWQsIGFuY2hvcnNbYV0uY2FyZGluYWwpKSB7XHJcbiAgICAgICAgICBtYXNrLnNldCh7XHJcbiAgICAgICAgICAgIHN0cm9rZTogJyM1N2I4NTcnLFxyXG4gICAgICAgICAgICBmaWxsOiAnIzU3Yjg1NycsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGNvbnN0IG9wdHMgPSB7XHJcbiAgICAgICAgICAgIGNvbW1pdDogZmFsc2UsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgb3B0c1tkaXJlY3Rpb25dID0ge1xyXG4gICAgICAgICAgICB4OiBleHRyZW1pdHkubGVmdCxcclxuICAgICAgICAgICAgeTogZXh0cmVtaXR5LnRvcCxcclxuICAgICAgICAgICAgZGlyZWN0aW9uOiBhbmNob3JzW2FdLmNhcmRpbmFsLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHRoaXMudXBkYXRlUGF0aChvcHRzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbWFzay5zZXQoe1xyXG4gICAgICAgICAgICBzdHJva2U6ICcjZWE0ZjM3JyxcclxuICAgICAgICAgICAgZmlsbDogJyNlYTRmMzcnLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIZWxwZXIgZW5kIGV4ZWN1dGUgY29ubmVjdC9kaXNjb25uZWN0IGRlcGVuZGluZyBvbiBzcGVjaWZpYyBjb25kaXRpb25zLlxyXG4gICAqIElmIHRoZSBleHRyZW1pdHkgd2FzIGNvbm5lY3RlZCBBTkQgaXQgaXMgTk9UIHRvdWNoaW5nIHRoZSBhbmNob3IgYW55bW9yZSA9PiBkaXNjb25uZWN0IGl0LlxyXG4gICAqIElmIHRoZSBleHRyZW1pdHkgd2FzIGRpc2Nvbm5lY3RlZCBBTkQgaXQgaXMgdG91Y2hpbmcgdGhlIGFuY2hvciA9PiBjb25uZWN0IGl0LlxyXG4gICAqIEBwYXJhbSBkaXJlY3Rpb25cclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9jb25uZWN0RGlzY29ubmVjdEV4dHJlbWl0eShkaXJlY3Rpb24pIHtcclxuICAgIGNvbnN0IHsgY2FudmFzIH0gPSB0aGlzO1xyXG5cclxuICAgIGxldCBleHRyZW1pdHk7XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSAnc3RhcnQnKSB7XHJcbiAgICAgIGV4dHJlbWl0eSA9IHRoaXMuYXJyb3dUYWlsO1xyXG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdlbmQnKSB7XHJcbiAgICAgIGV4dHJlbWl0eSA9IHRoaXMuYXJyb3dIZWFkO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENoZWNrIGlmIGludGVyc2VjdHMgd2l0aCBhbmNob3JcclxuICAgIGNvbnN0IGFuY2hvcnMgPSBjYW52YXMuZ2V0T2JqZWN0cygpXHJcbiAgICAgIC5maWx0ZXIoKG8pID0+IG8udHlwZSA9PT0gJ2FuY2hvcicpO1xyXG4gICAgZm9yIChsZXQgYSA9IDA7IGEgPCBhbmNob3JzLmxlbmd0aDsgYSArPSAxKSB7XHJcbiAgICAgIGlmIChleHRyZW1pdHkuaW50ZXJzZWN0c1dpdGhPYmplY3QoYW5jaG9yc1thXSkpIHtcclxuICAgICAgICB0aGlzLmNvbm5lY3RMaW5rKGRpcmVjdGlvbiwgYW5jaG9yc1thXS5zaGFwZUlkLCBhbmNob3JzW2FdLmNhcmRpbmFsKTtcclxuICAgICAgICAvLyBhbmNob3JzW2FdLnNldCgnc3Ryb2tlJywgJyMwMDAnKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzW2RpcmVjdGlvbl0gJiYgYW5jaG9yc1thXSA9PT0gdGhpc1tkaXJlY3Rpb25dLnNoYXBlLmFuY2hvcnNbdGhpc1tkaXJlY3Rpb25dLmFuY2hvcl0pIHtcclxuICAgICAgICAvLyBJZiB0aGlzIGxpbmsgd2FzIGNvbm5lY3RlZCBlbmQgdGhpcyBhbmNob3IgYW5kIGl0IGRvZXNuJ3QgaW50ZXJzZWN0IGFueW1vcmVcclxuICAgICAgICB0aGlzLmRpc2Nvbm5lY3RMaW5rKGRpcmVjdGlvbik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IExpbmthYmxlU2hhcGUgZnJvbSAnLi9MaW5rYWJsZVNoYXBlLmpzJztcclxuaW1wb3J0IEN1cnZlZExpbmsgZnJvbSAnLi9DdXJ2ZWRMaW5rLmpzJztcclxuXHJcbmNvbnN0IHsgZmFicmljLCBfIH0gPSB3aW5kb3c7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFeHBhbmRhYmxlQ29udGFpbmVyIGV4dGVuZHMgTGlua2FibGVTaGFwZSB7XHJcbiAgLyoqXHJcbiAgICogQSBDb250YWluZXIgaXMgYSBSZWN0IHdpdGggYW4gSVRleHQuIENhbiBiZSBleHBhbmRlZCB0byByZXZlYWwgY29udGFpbmVkIFNoYXBlcy5cclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgb3B0aW9uc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtGYWJyaWMuQ2FudmFzfSAgIG9wdGlvbnMuY2FudmFzIC0gRmFicmljIGNhbnZhc1xyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICBvcHRpb25zLmlkIC0gVW5pcXVlIGlkZW50aWZpZXIgKHBoeXNpY2FsIGlkIG9mIHRoZSBvYmplY3QpXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIG9wdGlvbnMud2lkdGhcclxuICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgb3B0aW9ucy5oZWlnaHRcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgb3B0aW9ucy5sYWJlbFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBvcHRpb25zLmltZ1xyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICBvcHRpb25zLmltZy5zcmMgLSBVUkwgb2YgYW4gaWNvbiAocmVwcmVzZW50aW5nIHRoZSB0eXBlIG9mIHRoZSBvYmplY3QpXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIG9wdGlvbnMuY2hpbGRXaWR0aFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBvcHRpb25zLmNoaWxkSGVpZ2h0XHJcbiAgICogQHBhcmFtIHtBcnJheX0gICAgICAgICAgIG9wdGlvbnMuY2hpbGRyZW5cclxuICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgb3B0aW9ucy5jaGlsZHJlbi4kLmlkIC0gVW5pcXVlIGNoaWxkcmVuIGlkZW50aWZpZXIgKHBoeXNpY2FsIGlkIG9mIHRoZSBjaGlsZClcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgb3B0aW9ucy5jaGlsZHJlbi4kLmxhYmVsXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIG9wdGlvbnMuY2hpbGRyZW4uJC5pbmRleFxyXG4gICAqIEBwYXJhbiB7T2JqZWN0fSAgICAgICAgICBvcHRpb25zLmNoaWxkcmVuLiQuaW1nXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG9wdGlvbnMuY2hpbGRyZW4uJC5pbWcuc3JjIC0gVVJMIG9mIGFuIGljb24gKHJlcHJlc2VudGluZyB0aGUgdHlwZSBvZiB0aGUgb2JqZWN0KVxyXG4gICAqXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgY29uc3QgZ3JvdXAgPSBuZXcgZmFicmljLkdyb3VwKFtdLCB7XHJcbiAgICAgIGxlZnQ6IG9wdGlvbnMubGVmdCxcclxuICAgICAgdG9wOiBvcHRpb25zLnRvcCxcclxuICAgICAgb3JpZ2luWDogJ2xlZnQnLFxyXG4gICAgICBvcmlnaW5ZOiAndG9wJyxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgbmV3T3B0aW9ucyA9IF8uY2xvbmVEZWVwKF8ub21pdChvcHRpb25zLCBbJ2NhbnZhcycsICdzaGFwZSddKSk7XHJcbiAgICBuZXdPcHRpb25zLmNhbnZhcyA9IG9wdGlvbnMuY2FudmFzO1xyXG4gICAgbmV3T3B0aW9ucy5zaGFwZSA9IGdyb3VwO1xyXG4gICAgc3VwZXIobmV3T3B0aW9ucyk7XHJcblxyXG4gICAgdGhpcy5zaGFwZXMgPSB7fTtcclxuICAgIHRoaXMuY2hpbGRyZW4gPSBBcnJheS5pc0FycmF5KG9wdGlvbnMuY2hpbGRyZW4pID8gb3B0aW9ucy5jaGlsZHJlbiA6IFtdO1xyXG4gICAgdGhpcy5pc0V4cGFuZGVkID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBhc3luYyBsb2FkKGlzQ2hpbGQpIHtcclxuICAgIGNvbnN0IHsgb3B0aW9ucywgc2hhcGUgfSA9IHRoaXM7XHJcblxyXG4gICAgdGhpcy5pc0xvYWRlZCA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0IHNoYXBlUG9zID0ge1xyXG4gICAgICBsZWZ0OiB0aGlzLnNoYXBlLmxlZnQsXHJcbiAgICAgIHRvcDogdGhpcy5zaGFwZS50b3AsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgcGFkZGluZyA9IDEwO1xyXG4gICAgY29uc3QgbWFyZ2luID0gMTA7XHJcbiAgICBjb25zdCByZWN0T3B0cyA9IHtcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBvcmlnaW5YOiAnbGVmdCcsXHJcbiAgICAgIG9yaWdpblk6ICd0b3AnLFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgc3Ryb2tlOiAnIzY2NicsXHJcbiAgICAgIGZpbGw6ICcjZmZmJyxcclxuICAgICAgcng6IDQsXHJcbiAgICAgIHJ5OiA0LFxyXG4gICAgfTtcclxuICAgIGxldCBpbWdPcHRzO1xyXG4gICAgaWYgKGlzQ2hpbGQpIHtcclxuICAgICAgcmVjdE9wdHMud2lkdGggPSBvcHRpb25zLndpZHRoID8gb3B0aW9ucy53aWR0aCA6IDcwO1xyXG4gICAgICByZWN0T3B0cy5oZWlnaHQgPSBvcHRpb25zLmhlaWdodCA/IG9wdGlvbnMuaGVpZ2h0IDogNzA7XHJcbiAgICAgIC8vIGltZ09wdHMgPSB7XHJcbiAgICAgIC8vICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIC8vICAgb3JpZ2luWTogJ3RvcCcsXHJcbiAgICAgIC8vICAgbGVmdDogcmVjdE9wdHMud2lkdGggLyAyLFxyXG4gICAgICAvLyAgIHRvcDogcGFkZGluZyxcclxuICAgICAgLy8gICB3aWR0aDogMjIsXHJcbiAgICAgIC8vICAgaGVpZ2h0OiAyMixcclxuICAgICAgLy8gfTtcclxuICAgICAgaW1nT3B0cyA9IHtcclxuICAgICAgICBvcmlnaW5YOiAnbGVmdCcsXHJcbiAgICAgICAgb3JpZ2luWTogJ3RvcCcsXHJcbiAgICAgICAgbGVmdDogcGFkZGluZyxcclxuICAgICAgICB0b3A6IHBhZGRpbmcsXHJcbiAgICAgICAgd2lkdGg6IDIyLFxyXG4gICAgICAgIGhlaWdodDogMjIsXHJcbiAgICAgIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpbWdPcHRzID0ge1xyXG4gICAgICAgIG9yaWdpblg6ICdsZWZ0JyxcclxuICAgICAgICBvcmlnaW5ZOiAndG9wJyxcclxuICAgICAgICBsZWZ0OiBwYWRkaW5nLFxyXG4gICAgICAgIHRvcDogcGFkZGluZyxcclxuICAgICAgICB3aWR0aDogMjIsXHJcbiAgICAgICAgaGVpZ2h0OiAyMixcclxuICAgICAgfTtcclxuICAgICAgcmVjdE9wdHMud2lkdGggPSBvcHRpb25zLndpZHRoID8gb3B0aW9ucy53aWR0aCA6IDIwMDtcclxuICAgICAgcmVjdE9wdHMuaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQgPyBvcHRpb25zLmhlaWdodCA6IChpbWdPcHRzLmhlaWdodCArIHBhZGRpbmcgKiAyKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDcmVhdGUgUmVjdCBzaGFwZVxyXG4gICAgY29uc3QgcmVjdCA9IG5ldyBmYWJyaWMuUmVjdChyZWN0T3B0cyk7XHJcbiAgICB0aGlzLnNoYXBlLmFkZFdpdGhVcGRhdGUocmVjdCk7XHJcbiAgICB0aGlzLnNoYXBlcy5yZWN0ID0gcmVjdDtcclxuXHJcbiAgICBsZXQgdGV4dE9wdHM7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmltZyAmJiB0aGlzLm9wdGlvbnMuaW1nLnNyYykge1xyXG4gICAgICAvLyBMb2FkIGltYWdlIGFuZCBjcmVhdGUgSW1hZ2Ugc2hhcGVcclxuICAgICAgY29uc3Qgb0ltZyA9IGF3YWl0IHRoaXMuX2xvYWRJbWFnZSh0aGlzLm9wdGlvbnMuaW1nLnNyYyk7XHJcbiAgICAgIG9JbWcuc2V0KGltZ09wdHMpO1xyXG4gICAgICB0aGlzLnNoYXBlLmFkZFdpdGhVcGRhdGUob0ltZyk7XHJcbiAgICAgIHRoaXMuc2hhcGVzLmltYWdlID0gb0ltZztcclxuXHJcbiAgICAgIGlmIChpc0NoaWxkKSB7XHJcbiAgICAgICAgLy8gQWxpZ24gdGhlIHRleHQgd2l0aGluIHRoZSByZWN0YW5nbGUsIHVuZGVyIHRoZSBpbWFnZVxyXG4gICAgICAgIC8vIENlbnRlciB0aGUgdGV4dCBpbiB0aGUgcmVjdFxyXG4gICAgICAgIC8vIHRleHRPcHRzID0ge1xyXG4gICAgICAgIC8vICAgc3R5bGVzOiB7IH0sXHJcbiAgICAgICAgLy8gICBmb250U2l6ZTogMTQsXHJcbiAgICAgICAgLy8gICBmb250RmFtaWx5OiAnSGVsdmV0aWNhJyxcclxuICAgICAgICAvLyAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgLy8gICBzcGxpdEJ5R3JhcGhlbWU6IHRydWUsXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICAgIC8vICAgb3JpZ2luWTogJ3RvcCcsXHJcbiAgICAgICAgLy8gICBsZWZ0OiByZWN0LndpZHRoIC8gMixcclxuICAgICAgICAvLyAgIHRvcDogcGFkZGluZyArIGltZ09wdHMuaGVpZ2h0ICsgbWFyZ2luLFxyXG4gICAgICAgIC8vICAgd2lkdGg6IHJlY3RPcHRzLndpZHRoIC0gcGFkZGluZyAqIDIsXHJcbiAgICAgICAgLy8gICBoZWlnaHQ6IHJlY3RPcHRzLmhlaWdodCAtIHBhZGRpbmcgKiAyLFxyXG4gICAgICAgIC8vIH07XHJcblxyXG4gICAgICAgIHRleHRPcHRzID0ge1xyXG4gICAgICAgICAgc3R5bGVzOiB7IH0sXHJcbiAgICAgICAgICBmb250U2l6ZTogMTQsXHJcbiAgICAgICAgICBmb250RmFtaWx5OiAnSGVsdmV0aWNhJyxcclxuICAgICAgICAgIHRleHRBbGlnbjogJ2xlZnQnLFxyXG4gICAgICAgICAgc3BsaXRCeUdyYXBoZW1lOiB0cnVlLFxyXG5cclxuICAgICAgICAgIG9yaWdpblg6ICdsZWZ0JyxcclxuICAgICAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICAgICAgbGVmdDogcGFkZGluZyArIG9JbWcud2lkdGggKyBtYXJnaW4sXHJcbiAgICAgICAgICB0b3A6IHBhZGRpbmcgKyBvSW1nLmhlaWdodCAvIDIsXHJcbiAgICAgICAgICB3aWR0aDogcmVjdC53aWR0aCAtIHBhZGRpbmcgLSBvSW1nLndpZHRoIC0gbWFyZ2luICogMixcclxuICAgICAgICAgIGhlaWdodDogb0ltZy5oZWlnaHQsXHJcbiAgICAgICAgfTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBBbGlnbiB0aGUgdGV4dCB3aXRoIHRoZSBpbWFnZVxyXG4gICAgICAgIHRleHRPcHRzID0ge1xyXG4gICAgICAgICAgc3R5bGVzOiB7IH0sXHJcbiAgICAgICAgICBmb250U2l6ZTogMTQsXHJcbiAgICAgICAgICBmb250RmFtaWx5OiAnSGVsdmV0aWNhJyxcclxuICAgICAgICAgIHRleHRBbGlnbjogJ2xlZnQnLFxyXG4gICAgICAgICAgc3BsaXRCeUdyYXBoZW1lOiB0cnVlLFxyXG5cclxuICAgICAgICAgIG9yaWdpblg6ICdsZWZ0JyxcclxuICAgICAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICAgICAgbGVmdDogcGFkZGluZyArIG9JbWcud2lkdGggKyBtYXJnaW4sXHJcbiAgICAgICAgICB0b3A6IHBhZGRpbmcgKyBvSW1nLmhlaWdodCAvIDIsXHJcbiAgICAgICAgICB3aWR0aDogcmVjdC53aWR0aCAtIHBhZGRpbmcgLSBvSW1nLndpZHRoIC0gbWFyZ2luICogMixcclxuICAgICAgICAgIGhlaWdodDogb0ltZy5oZWlnaHQsXHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gQ2VudGVyIHRoZSB0ZXh0IGluIHRoZSByZWN0XHJcbiAgICAgIHRleHRPcHRzID0ge1xyXG4gICAgICAgIHN0eWxlczogeyB9LFxyXG4gICAgICAgIGZvbnRTaXplOiAxNCxcclxuICAgICAgICBmb250RmFtaWx5OiAnSGVsdmV0aWNhJyxcclxuICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgIHNwbGl0QnlHcmFwaGVtZTogdHJ1ZSxcclxuXHJcbiAgICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgICAgbGVmdDogcmVjdC53aWR0aCAvIDIsXHJcbiAgICAgICAgdG9wOiByZWN0LmhlaWdodCAvIDIsXHJcbiAgICAgICAgd2lkdGg6IHJlY3RPcHRzLndpZHRoIC0gcGFkZGluZyAqIDIsXHJcbiAgICAgICAgaGVpZ2h0OiByZWN0T3B0cy5oZWlnaHQgLSBwYWRkaW5nICogMixcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDcmVhdGUgVGV4dGJveCBzaGFwZVxyXG4gICAgY29uc3QgdGV4dCA9IG5ldyBmYWJyaWMuVGV4dGJveChvcHRpb25zLmxhYmVsLCB0ZXh0T3B0cyk7XHJcbiAgICBpZiAoIW9wdGlvbnMuaGlkZVRleHQpIHtcclxuICAgICAgdGhpcy5zaGFwZS5hZGRXaXRoVXBkYXRlKHRleHQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zaGFwZXMudGV4dCA9IHRleHQ7XHJcblxyXG4gICAgLy8gUmVwb3NpdGlvbiB0aGUgZ3JvdXAgYWNjb3JkaW5nbHlcclxuICAgIHRoaXMuc2hhcGUubGVmdCA9IHNoYXBlUG9zLmxlZnQ7XHJcbiAgICB0aGlzLnNoYXBlLnRvcCA9IHNoYXBlUG9zLnRvcDtcclxuICAgIHRoaXMuc2hhcGUuc2V0Q29vcmRzKCk7XHJcbiAgICB0aGlzLmNhbnZhcy5yZW5kZXJBbGwoKTtcclxuXHJcbiAgICAvLyBTZXQgdGhlIHNoYXBlIGFzIG5vdCBzZWxlY3RhYmxlIGlmIGl0IGlzIGEgY2hpbGRcclxuICAgIGlmIChpc0NoaWxkKSB7XHJcbiAgICAgIHRoaXMuc2hhcGUuc2VsZWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbWVtYmVyIGluaXRpYWwgb3B0aW9ucyBhcyBjb2xsYXBzZWRcclxuICAgIHRoaXMuaW5pdGlhbE9wdHMgPSB7XHJcbiAgICAgIHJlY3Q6IHtcclxuICAgICAgICB3aWR0aDogcmVjdE9wdHMud2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OiByZWN0T3B0cy5oZWlnaHQsXHJcbiAgICAgIH0sXHJcbiAgICAgIGNoaWxkOiB7XHJcbiAgICAgICAgd2lkdGg6IG9wdGlvbnMuY2hpbGRXaWR0aCA/IG9wdGlvbnMuY2hpbGRXaWR0aCA6IDcwLFxyXG4gICAgICAgIGhlaWdodDogb3B0aW9ucy5jaGlsZEhlaWdodCA/IG9wdGlvbnMuY2hpbGRIZWlnaHQgOiA3MCxcclxuICAgICAgICAvLyB3aWR0aDogb3B0aW9ucy5jaGlsZFdpZHRoID8gb3B0aW9ucy5jaGlsZFdpZHRoIDogNTIsXHJcbiAgICAgICAgLy8gaGVpZ2h0OiBvcHRpb25zLmNoaWxkV2lkdGggPyBvcHRpb25zLmNoaWxkV2lkdGggOiA1MixcclxuICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgLy8gQ29uc3RydWN0IGNoaWxkcmVuIGlmIHRoaXMgaXMgYSBub3JtYWwgKHBhcmVudCkgQ29udGFpbmVyXHJcbiAgICBpZiAoIWlzQ2hpbGQpIHtcclxuICAgICAgYXdhaXQgdGhpcy5jb25zdHJ1Y3RDaGlsZHJlbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHNoYXBlLm9uKHtcclxuICAgICAgc2NhbGluZzogKCkgPT4ge1xyXG4gICAgICAgIGlmICh0ZXh0KSB7XHJcbiAgICAgICAgICAvLyBXaGVuIHNjYWxpbmcsIGtlZXAgdGV4dCBzYW1lIHNpemUgYXMgaW5pdGlhbFxyXG4gICAgICAgICAgaWYgKHNoYXBlLnNjYWxlWCA8IDEpIHtcclxuICAgICAgICAgICAgdGV4dC5zY2FsZVggPSAxICsgKDEgLSBzaGFwZS5zY2FsZVgpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGV4dC5zY2FsZVggPSAxIC8gKHNoYXBlLnNjYWxlWCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoc2hhcGUuc2NhbGVZIDwgMSkge1xyXG4gICAgICAgICAgICB0ZXh0LnNjYWxlWSA9IDEgKyAoMSAtIHNoYXBlLnNjYWxlWSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0ZXh0LnNjYWxlWSA9IDEgLyAoc2hhcGUuc2NhbGVZKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuY2FudmFzLnJlbmRlckFsbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgbW91c2VkYmxjbGljazogKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRXhwYW5kZWQpIHtcclxuICAgICAgICAgIHRoaXMuY29sbGFwc2UoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5leHBhbmQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmlzTG9hZGVkID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGFzeW5jIF9sb2FkSW1hZ2Uoc3JjKSB7XHJcbiAgICBjb25zdCB1cmwgPSBzcmMgfHwgdGhpcy5vcHRpb25zLmltZy5zcmM7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgZmFicmljLkltYWdlLmZyb21VUkwodXJsLCAob0ltZykgPT4ge1xyXG4gICAgICAgIHJlc29sdmUob0ltZyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBjb25zdHJ1Y3RDaGlsZHJlbigpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgY2FudmFzLCBzaGFwZSwgc2hhcGVzLCBjaGlsZHJlbiwgaW5pdGlhbE9wdHMsXHJcbiAgICB9ID0gdGhpcztcclxuXHJcbiAgICAvLyBDYWxjdWxhdGUgbmV3IGRpbWVuc2lvbnNcclxuICAgIGNvbnN0IHBhZGRpbmcgPSAxMDtcclxuICAgIGNvbnN0IG1hcmdpbiA9IDEwO1xyXG5cclxuICAgIGZvciAobGV0IGMgPSAwOyBjIDwgY2hpbGRyZW4ubGVuZ3RoOyBjICs9IDEpIHtcclxuICAgICAgY29uc3QgY2hpbGQgPSBjaGlsZHJlbltjXTtcclxuICAgICAgY29uc3QgY2hpbGRDb250YWluZXIgPSBuZXcgRXhwYW5kYWJsZUNvbnRhaW5lcih7XHJcbiAgICAgICAgY2FudmFzLFxyXG4gICAgICAgIGlkOiBjaGlsZC5pZCxcclxuICAgICAgICBsZWZ0OiBzaGFwZS5sZWZ0ICsgcGFkZGluZyArIChpbml0aWFsT3B0cy5jaGlsZC53aWR0aCArIG1hcmdpbikgKiBjICsgKGMgPT09IGNoaWxkcmVuLmxlbmd0aCA/IC1tYXJnaW4gOiAwKSxcclxuICAgICAgICB0b3A6IHNoYXBlLnRvcCArIHBhZGRpbmcgKyBzaGFwZXMuaW1hZ2UuaGVpZ2h0ICsgbWFyZ2luLFxyXG4gICAgICAgIGFuZ2xlOiAwLFxyXG4gICAgICAgIGxhYmVsOiBjaGlsZC5sYWJlbCxcclxuICAgICAgICBpbWc6IHtcclxuICAgICAgICAgIHNyYzogY2hpbGQuaW1nLnNyYyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHdpZHRoOiBpbml0aWFsT3B0cy5jaGlsZC53aWR0aCxcclxuICAgICAgICBoZWlnaHQ6IGluaXRpYWxPcHRzLmNoaWxkLmhlaWdodCxcclxuICAgICAgICBoaWRlVGV4dDogY2hpbGQuaGlkZVRleHQsXHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxyXG4gICAgICBhd2FpdCBjaGlsZENvbnRhaW5lci5sb2FkKHRydWUpO1xyXG4gICAgICBjaGlsZC5jb250YWluZXIgPSBjaGlsZENvbnRhaW5lcjtcclxuICAgIH1cclxuICAgIHNoYXBlLmFkZFdpdGhVcGRhdGUoKTtcclxuICAgIHNoYXBlLnNldENvb3JkcygpO1xyXG4gICAgY2FudmFzLnJlbmRlckFsbCgpO1xyXG4gIH1cclxuXHJcbiAgZXhwYW5kKCkge1xyXG4gICAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoICE9PSAwICYmIHRoaXMuaXNFeHBhbmRlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgY29uc3Qge1xyXG4gICAgICAgIGNhbnZhcywgc2hhcGUsIHNoYXBlcywgY2hpbGRyZW4sIGluaXRpYWxPcHRzLFxyXG4gICAgICB9ID0gdGhpcztcclxuXHJcbiAgICAgIC8vIENhbGN1bGF0ZSBuZXcgZGltZW5zaW9uc1xyXG4gICAgICBjb25zdCBwYWRkaW5nID0gMTA7XHJcbiAgICAgIGNvbnN0IG1hcmdpbiA9IDEwO1xyXG4gICAgICBjb25zdCBvbGRSZWN0V2lkdGggPSBzaGFwZXMucmVjdC53aWR0aDtcclxuICAgICAgY29uc3Qgb2xkUmVjdEhlaWdodCA9IHNoYXBlcy5yZWN0LmhlaWdodDtcclxuXHJcbiAgICAgIGNvbnN0IG5ld1JlY3RXaWR0aCA9IE1hdGgubWF4KHBhZGRpbmcgKiAyICsgY2hpbGRyZW4ubGVuZ3RoICogaW5pdGlhbE9wdHMuY2hpbGQud2lkdGhcclxuICAgICAgICArIChjaGlsZHJlbi5sZW5ndGggLSAxKSAqIG1hcmdpbiwgaW5pdGlhbE9wdHMucmVjdC53aWR0aCk7XHJcbiAgICAgIGNvbnN0IG5ld1JlY3RIZWlnaHQgPSBjaGlsZHJlbi5sZW5ndGggPiAwID8gcGFkZGluZyArIHNoYXBlcy5pbWFnZS5oZWlnaHQgKyBtYXJnaW5cclxuICAgICAgICArIGluaXRpYWxPcHRzLmNoaWxkLmhlaWdodCArIHBhZGRpbmcgOiBpbml0aWFsT3B0cy5yZWN0LmhlaWdodDtcclxuXHJcbiAgICAgIC8vIFVwZGF0ZSBhbGwgb3RoZXIgY29udGFpbmVycyB0aGF0IGFyZSBiZWxvdyBhbmQvb3Igb24gdGhlIHJpZ2h0IG9mIHRoZSBjdXJyZW50IHNoYXBlLCB0byBhdm9pZCBjb2xsaXNpb25cclxuICAgICAgc2hhcGVzLnJlY3Qub3BhY2l0eSA9IDAuNztcclxuICAgICAgY29uc3Qgb3RoZXJTaGFwZXMgPSBPYmplY3QudmFsdWVzKGNhbnZhcy5saW5rYWJsZVNoYXBlcyk7XHJcbiAgICAgIGlmIChvdGhlclNoYXBlcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgY29uc3QgZGVsdGFYID0gbmV3UmVjdFdpZHRoIC0gb2xkUmVjdFdpZHRoO1xyXG4gICAgICAgIGNvbnN0IGRlbHRhWSA9IG5ld1JlY3RIZWlnaHQgLSBvbGRSZWN0SGVpZ2h0O1xyXG4gICAgICAgIGZvciAobGV0IG8gPSAwOyBvIDwgb3RoZXJTaGFwZXMubGVuZ3RoOyBvICs9IDEpIHtcclxuICAgICAgICAgIGNvbnN0IHNoYXBlVG9Nb3ZlID0gb3RoZXJTaGFwZXNbb107XHJcbiAgICAgICAgICBpZiAoc2hhcGVUb01vdmUuaWQgIT09IHRoaXMuaWQpIHtcclxuICAgICAgICAgICAgLy8gSWYgZXhwYW5kZWQgU2hhcGUgaXMgYWJvdmUgQU5EIG9uIHRoZSBsZWZ0IG9mIHRoZSBjdXJyZW50IHNoYXBlXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNoYXBlLmFDb29yZHMuYnIueCA8PSBzaGFwZVRvTW92ZS5zaGFwZS5hQ29vcmRzLnRsLnggJiYgdGhpcy5zaGFwZS5hQ29vcmRzLmJyLnkgPD0gc2hhcGVUb01vdmUuc2hhcGUuYUNvb3Jkcy50bC55KSB7XHJcbiAgICAgICAgICAgICAgc2hhcGVUb01vdmUubW92ZSh7XHJcbiAgICAgICAgICAgICAgICB4OiBzaGFwZVRvTW92ZS5zaGFwZS5sZWZ0ICsgZGVsdGFYLFxyXG4gICAgICAgICAgICAgICAgeTogc2hhcGVUb01vdmUuc2hhcGUudG9wICsgZGVsdGFZLFxyXG4gICAgICAgICAgICAgICAgbW92aW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNraXBDb2xsaXNpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zaGFwZS5hQ29vcmRzLmJsLnkgPCBzaGFwZVRvTW92ZS5zaGFwZS5hQ29vcmRzLnRsLnkpIHsgLy8gSWYgZXhwYW5kZWQgU2hhcGUgaXMgYWJvdmUgdGhlIGN1cnJlbnQgc2hhcGVcclxuICAgICAgICAgICAgICBpZiAodGhpcy5zaGFwZS5hQ29vcmRzLnRsLnggPCBzaGFwZVRvTW92ZS5zaGFwZS5hQ29vcmRzLnRyLngpIHtcclxuICAgICAgICAgICAgICAgIHNoYXBlVG9Nb3ZlLm1vdmUoe1xyXG4gICAgICAgICAgICAgICAgICB5OiBzaGFwZVRvTW92ZS5zaGFwZS50b3AgKyBkZWx0YVksXHJcbiAgICAgICAgICAgICAgICAgIG1vdmluZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgIHNraXBDb2xsaXNpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zaGFwZS5hQ29vcmRzLnRyLnggPCBzaGFwZVRvTW92ZS5zaGFwZS5hQ29vcmRzLnRsLngpIHsgLy8gSWYgZXhwYW5kZWQgU2hhcGUgaXMgb24gdGhlIGxlZnQgb2YgdGhlIGN1cnJlbnQgc2hhcGVcclxuICAgICAgICAgICAgICBpZiAodGhpcy5zaGFwZS5hQ29vcmRzLnRsLnkgPCBzaGFwZVRvTW92ZS5zaGFwZS5hQ29vcmRzLmJsLnkpIHtcclxuICAgICAgICAgICAgICAgIHNoYXBlVG9Nb3ZlLm1vdmUoe1xyXG4gICAgICAgICAgICAgICAgICB4OiBzaGFwZVRvTW92ZS5zaGFwZS5sZWZ0ICsgZGVsdGFYLFxyXG4gICAgICAgICAgICAgICAgICBtb3Zpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICBza2lwQ29sbGlzaW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBSZXNpemUgZXhpc3Rpbmcgc2hhcGVzXHJcbiAgICAgIHNoYXBlcy5yZWN0LndpZHRoID0gbmV3UmVjdFdpZHRoO1xyXG4gICAgICBzaGFwZXMucmVjdC5oZWlnaHQgPSBuZXdSZWN0SGVpZ2h0O1xyXG4gICAgICBzaGFwZXMucmVjdC5zZXRDb29yZHMoKTtcclxuICAgICAgc2hhcGVzLnRleHQud2lkdGggPSBuZXdSZWN0V2lkdGggLSAoc2hhcGVzLmltYWdlLndpZHRoICsgcGFkZGluZyArIG1hcmdpbik7XHJcbiAgICAgIHNoYXBlcy50ZXh0LnRleHRBbGlnbiA9ICdsZWZ0JztcclxuICAgICAgc2hhcGVzLnRleHQuc2V0Q29vcmRzKCk7XHJcblxyXG4gICAgICAvLyBBZGQgY2hpbGRyZW4gY29udGFpbmVyc1xyXG4gICAgICBmb3IgKGxldCBjID0gMDsgYyA8IGNoaWxkcmVuLmxlbmd0aDsgYyArPSAxKSB7XHJcbiAgICAgICAgY29uc3QgY2hpbGQgPSBjaGlsZHJlbltjXTtcclxuICAgICAgICBjaGlsZC5jb250YWluZXIuc2hhcGUubGVmdCA9IHNoYXBlLmxlZnQgKyBwYWRkaW5nXHJcbiAgICAgICAgICArIChpbml0aWFsT3B0cy5jaGlsZC53aWR0aCArIG1hcmdpbikgKiBjICsgKGMgPT09IGNoaWxkcmVuLmxlbmd0aCA/IC1tYXJnaW4gOiAwKTtcclxuICAgICAgICBjaGlsZC5jb250YWluZXIuc2hhcGUudG9wID0gc2hhcGUudG9wICsgcGFkZGluZyArIHNoYXBlcy5pbWFnZS5oZWlnaHQgKyBtYXJnaW47XHJcbiAgICAgICAgc2hhcGUuYWRkV2l0aFVwZGF0ZShjaGlsZC5jb250YWluZXIuc2hhcGUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBVcGRhdGUgdGhlIGNvbnRhaW5lciBjb29yZHNcclxuICAgICAgc2hhcGUuYWRkV2l0aFVwZGF0ZSgpO1xyXG4gICAgICBzaGFwZS5zZXRDb29yZHMoKTtcclxuICAgICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcclxuICAgICAgdGhpcy5zaGFwZS5maXJlKCdtb2RpZmllZCcpO1xyXG5cclxuICAgICAgY2FudmFzLnJlbmRlckFsbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaXNFeHBhbmRlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBjb2xsYXBzZSgpIHtcclxuICAgIGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCAhPT0gMCAmJiB0aGlzLmlzRXhwYW5kZWQgPT09IHRydWUpIHtcclxuICAgICAgY29uc3Qge1xyXG4gICAgICAgIGNhbnZhcywgc2hhcGUsIHNoYXBlcywgY2hpbGRyZW4sIGluaXRpYWxPcHRzLFxyXG4gICAgICB9ID0gdGhpcztcclxuXHJcbiAgICAgIC8vIENhbGN1bGF0ZSBuZXcgZGltZW5zaW9uc1xyXG4gICAgICBjb25zdCBwYWRkaW5nID0gMTA7XHJcbiAgICAgIGNvbnN0IG1hcmdpbiA9IDEwO1xyXG4gICAgICBjb25zdCBvbGRSZWN0V2lkdGggPSBzaGFwZXMucmVjdC53aWR0aDtcclxuICAgICAgY29uc3Qgb2xkUmVjdEhlaWdodCA9IHNoYXBlcy5yZWN0LmhlaWdodDtcclxuXHJcbiAgICAgIGNvbnN0IG5ld1JlY3RXaWR0aCA9IGluaXRpYWxPcHRzLnJlY3Qud2lkdGg7XHJcbiAgICAgIGNvbnN0IG5ld1JlY3RIZWlnaHQgPSBpbml0aWFsT3B0cy5yZWN0LmhlaWdodDtcclxuXHJcbiAgICAgIC8vIFVwZGF0ZSBhbGwgb3RoZXIgY29udGFpbmVycyB0aGF0IGFyZSBiZWxvdyBhbmQvb3Igb24gdGhlIHJpZ2h0IG9mIHRoZSBjdXJyZW50IHNoYXBlLCB0byBhdm9pZCBjb2xsaXNpb25cclxuICAgICAgc2hhcGVzLnJlY3Qub3BhY2l0eSA9IDE7XHJcbiAgICAgIGNvbnN0IG90aGVyU2hhcGVzID0gT2JqZWN0LnZhbHVlcyhjYW52YXMubGlua2FibGVTaGFwZXMpO1xyXG4gICAgICBpZiAob3RoZXJTaGFwZXMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIGNvbnN0IGRlbHRhWCA9IG5ld1JlY3RXaWR0aCAtIG9sZFJlY3RXaWR0aDtcclxuICAgICAgICBjb25zdCBkZWx0YVkgPSBuZXdSZWN0SGVpZ2h0IC0gb2xkUmVjdEhlaWdodDtcclxuICAgICAgICBmb3IgKGxldCBvID0gMDsgbyA8IG90aGVyU2hhcGVzLmxlbmd0aDsgbyArPSAxKSB7XHJcbiAgICAgICAgICBjb25zdCBzaGFwZVRvTW92ZSA9IG90aGVyU2hhcGVzW29dO1xyXG4gICAgICAgICAgaWYgKG90aGVyU2hhcGVzW29dLmlkICE9PSB0aGlzLmlkKSB7XHJcbiAgICAgICAgICAgIC8vIElmIGV4cGFuZGVkIFNoYXBlIGlzIGFib3ZlIEFORCBvbiB0aGUgbGVmdCBvZiB0aGUgY3VycmVudCBzaGFwZVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zaGFwZS5hQ29vcmRzLmJyLnggPD0gc2hhcGVUb01vdmUuc2hhcGUuYUNvb3Jkcy50bC54ICYmIHRoaXMuc2hhcGUuYUNvb3Jkcy5ici55IDw9IHNoYXBlVG9Nb3ZlLnNoYXBlLmFDb29yZHMudGwueSkge1xyXG4gICAgICAgICAgICAgIHNoYXBlVG9Nb3ZlLm1vdmUoe1xyXG4gICAgICAgICAgICAgICAgeDogc2hhcGVUb01vdmUuc2hhcGUubGVmdCArIGRlbHRhWCxcclxuICAgICAgICAgICAgICAgIHk6IHNoYXBlVG9Nb3ZlLnNoYXBlLnRvcCArIGRlbHRhWSxcclxuICAgICAgICAgICAgICAgIG1vdmluZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBza2lwQ29sbGlzaW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2hhcGUuYUNvb3Jkcy5ibC55IDwgc2hhcGVUb01vdmUuc2hhcGUuYUNvb3Jkcy50bC55KSB7IC8vIElmIGV4cGFuZGVkIFNoYXBlIGlzIGFib3ZlIHRoZSBjdXJyZW50IHNoYXBlXHJcbiAgICAgICAgICAgICAgaWYgKHRoaXMuc2hhcGUuYUNvb3Jkcy50bC54IDwgc2hhcGVUb01vdmUuc2hhcGUuYUNvb3Jkcy50ci54KSB7XHJcbiAgICAgICAgICAgICAgICBzaGFwZVRvTW92ZS5tb3ZlKHtcclxuICAgICAgICAgICAgICAgICAgeTogc2hhcGVUb01vdmUuc2hhcGUudG9wICsgZGVsdGFZLFxyXG4gICAgICAgICAgICAgICAgICBtb3Zpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICBza2lwQ29sbGlzaW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2hhcGUuYUNvb3Jkcy50ci54IDwgc2hhcGVUb01vdmUuc2hhcGUuYUNvb3Jkcy50bC54KSB7IC8vIElmIGV4cGFuZGVkIFNoYXBlIGlzIG9uIHRoZSBsZWZ0IG9mIHRoZSBjdXJyZW50IHNoYXBlXHJcbiAgICAgICAgICAgICAgaWYgKHRoaXMuc2hhcGUuYUNvb3Jkcy50bC55IDwgc2hhcGVUb01vdmUuc2hhcGUuYUNvb3Jkcy5ibC55KSB7XHJcbiAgICAgICAgICAgICAgICBzaGFwZVRvTW92ZS5tb3ZlKHtcclxuICAgICAgICAgICAgICAgICAgeDogc2hhcGVUb01vdmUuc2hhcGUubGVmdCArIGRlbHRhWCxcclxuICAgICAgICAgICAgICAgICAgbW92aW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgc2tpcENvbGxpc2lvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gUmVzaXplIGV4aXN0aW5nIHNoYXBlc1xyXG4gICAgICBzaGFwZXMucmVjdC53aWR0aCA9IG5ld1JlY3RXaWR0aDtcclxuICAgICAgc2hhcGVzLnJlY3QuaGVpZ2h0ID0gbmV3UmVjdEhlaWdodDtcclxuICAgICAgc2hhcGVzLnJlY3Quc2V0Q29vcmRzKCk7XHJcbiAgICAgIHNoYXBlcy50ZXh0LndpZHRoID0gbmV3UmVjdFdpZHRoIC0gKHNoYXBlcy5pbWFnZS53aWR0aCArIHBhZGRpbmcgKiAyICsgbWFyZ2luKTtcclxuICAgICAgc2hhcGVzLnRleHQudGV4dEFsaWduID0gJ2xlZnQnO1xyXG4gICAgICBzaGFwZXMudGV4dC5zZXRDb29yZHMoKTtcclxuXHJcbiAgICAgIC8vIFJlbW92ZSBjaGlsZHJlbiBjb250YWluZXJzXHJcbiAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgY2hpbGRyZW4ubGVuZ3RoOyBjICs9IDEpIHtcclxuICAgICAgICBjb25zdCBjaGlsZCA9IGNoaWxkcmVuW2NdO1xyXG4gICAgICAgIGNoaWxkLmNvbnRhaW5lci5sZWZ0ID0gc2hhcGUubGVmdCArIHBhZGRpbmdcclxuICAgICAgICAgICsgKGluaXRpYWxPcHRzLmNoaWxkLndpZHRoICsgbWFyZ2luKSAqIGMgKyAoYyA9PT0gY2hpbGRyZW4ubGVuZ3RoID8gLW1hcmdpbiA6IDApO1xyXG4gICAgICAgIGNoaWxkLmNvbnRhaW5lci50b3AgPSBzaGFwZS50b3AgKyBwYWRkaW5nICsgc2hhcGVzLmltYWdlLmhlaWdodCArIG1hcmdpbjtcclxuICAgICAgICBzaGFwZS5yZW1vdmUoY2hpbGQuY29udGFpbmVyLnNoYXBlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gVXBkYXRlIHRoZSBjb250YWluZXIgY29vcmRzXHJcbiAgICAgIHNoYXBlLmFkZFdpdGhVcGRhdGUoKTtcclxuICAgICAgc2hhcGUuc2V0Q29vcmRzKCk7XHJcbiAgICAgIHRoaXMuc2hhcGUuZmlyZSgnbW9kaWZpZWQnKTtcclxuXHJcbiAgICAgIGNhbnZhcy5yZW5kZXJBbGwoKTtcclxuICAgIH1cclxuICAgIHRoaXMuaXNFeHBhbmRlZCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgX29uQW5jaG9yUmlnaHRDbGljayhvcHRpb25zKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGlkLCBsZWZ0LCB0b3AsIGFuZ2xlLCBjYW52YXMsIHdpZHRoLCBoZWlnaHQsXHJcbiAgICB9ID0gdGhpcy5zaGFwZTtcclxuICAgIGNvbnN0IGFwID0gb3B0aW9ucy50YXJnZXQ7XHJcbiAgICBjb25zdCB7IGNhcmRpbmFsIH0gPSBhcDtcclxuICAgIGNvbnN0IHNwYWNpbmcgPSAxMDA7XHJcblxyXG4gICAgY29uc3QgbmV4dElkID0gYCR7aWR9X25leHRfJHtjYXJkaW5hbH1fJHtNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKS50b1N0cmluZygxNikuc3Vic3RyaW5nKDEpfWA7XHJcbiAgICBjb25zdCBsYWJlbCA9IGAke2lkfV9uZXh0XyR7Y2FyZGluYWx9YDtcclxuICAgIGNvbnN0IG5leHRDb250YWluZXJPcHRzID0gXy5jbG9uZURlZXAoXy5vbWl0KHRoaXMub3B0aW9ucywgWydjYW52YXMnLCAnc2hhcGUnXSkpO1xyXG4gICAgbmV4dENvbnRhaW5lck9wdHMuY2FudmFzID0gY2FudmFzO1xyXG4gICAgbmV4dENvbnRhaW5lck9wdHMuaWQgPSBuZXh0SWQ7XHJcbiAgICBuZXh0Q29udGFpbmVyT3B0cy5sZWZ0ID0gbGVmdDtcclxuICAgIG5leHRDb250YWluZXJPcHRzLnRvcCA9IHRvcDtcclxuICAgIG5leHRDb250YWluZXJPcHRzLmFuZ2xlID0gYW5nbGU7XHJcbiAgICBuZXh0Q29udGFpbmVyT3B0cy5sYWJlbCA9IGxhYmVsO1xyXG4gICAgbmV4dENvbnRhaW5lck9wdHMuY2hpbGRyZW4gPSBbXTtcclxuXHJcbiAgICBjb25zdCBuZXh0Q29udGFpbmVyID0gbmV3IEV4cGFuZGFibGVDb250YWluZXIobmV4dENvbnRhaW5lck9wdHMpO1xyXG4gICAgYXdhaXQgbmV4dENvbnRhaW5lci5sb2FkKCk7XHJcbiAgICBuZXh0Q29udGFpbmVyLmluamVjdCgpO1xyXG5cclxuICAgIGNvbnN0IG5ld09wdGlvbnMgPSB7fTtcclxuICAgIGxldCB0YXJnZXRDYXJkaW5hbDtcclxuICAgIHN3aXRjaCAoY2FyZGluYWwpIHtcclxuICAgICAgY2FzZSAnZWFzdCc6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICd3ZXN0JztcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSB0b3A7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gbGVmdCArIHdpZHRoICsgc3BhY2luZztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICd3ZXN0Jzoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ2Vhc3QnO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IHRvcDtcclxuICAgICAgICBuZXdPcHRpb25zLnggPSBsZWZ0IC0gd2lkdGggLSBzcGFjaW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRoJzoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ3NvdXRoJztcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSB0b3AgLSBoZWlnaHQgLSBzcGFjaW5nO1xyXG4gICAgICAgIG5ld09wdGlvbnMueCA9IGxlZnQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnc291dGgnOiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnbm9ydGgnO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IHRvcCArIGhlaWdodCArIHNwYWNpbmc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gbGVmdDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aGVhc3QnOiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnc291dGh3ZXN0JztcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSB0b3AgLSBoZWlnaHQgLSBzcGFjaW5nO1xyXG4gICAgICAgIG5ld09wdGlvbnMueCA9IGxlZnQgKyB3aWR0aCArIHNwYWNpbmc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnbm9ydGh3ZXN0Jzoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ3NvdXRoZWFzdCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gdG9wIC0gaGVpZ2h0IC0gc3BhY2luZztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSBsZWZ0IC0gd2lkdGggLSBzcGFjaW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRoZWFzdCc6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICdub3J0aHdlc3QnO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IHRvcCArIGhlaWdodCArIHNwYWNpbmc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gbGVmdCArIHdpZHRoICsgc3BhY2luZztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aHdlc3QnOlxyXG4gICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnbm9ydGhlYXN0JztcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSB0b3AgKyBoZWlnaHQgKyBzcGFjaW5nO1xyXG4gICAgICAgIG5ld09wdGlvbnMueCA9IGxlZnQgLSB3aWR0aCAtIHNwYWNpbmc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIG5leHRDb250YWluZXIubW92ZShuZXdPcHRpb25zKTtcclxuICAgIC8vIG5leHRDb250YWluZXIucm90YXRlKGFuZ2xlKTtcclxuXHJcbiAgICBjb25zdCBuZXdMaW5rID0gbmV3IEN1cnZlZExpbmsoe1xyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgeDogYXAubGVmdCxcclxuICAgICAgICB5OiBhcC50b3AsXHJcbiAgICAgIH0sXHJcbiAgICAgIGVuZDoge1xyXG4gICAgICAgIHg6IG5leHRDb250YWluZXIuYW5jaG9yc1t0YXJnZXRDYXJkaW5hbF0ubGVmdCxcclxuICAgICAgICB5OiBuZXh0Q29udGFpbmVyLmFuY2hvcnNbdGFyZ2V0Q2FyZGluYWxdLnRvcCxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgbmV3TGluay5pbmplY3QoY2FudmFzKTtcclxuICAgIG5ld0xpbmsuY29ubmVjdExpbmsoJ3N0YXJ0JywgYXAuc2hhcGVJZCwgYXAuY2FyZGluYWwpO1xyXG4gICAgbmV3TGluay5jb25uZWN0TGluaygnZW5kJywgbmV4dENvbnRhaW5lci5hbmNob3JzW3RhcmdldENhcmRpbmFsXS5zaGFwZUlkLFxyXG4gICAgICBuZXh0Q29udGFpbmVyLmFuY2hvcnNbdGFyZ2V0Q2FyZGluYWxdLmNhcmRpbmFsKTtcclxuICB9XHJcblxyXG4gIF9vbkFuY2hvckxlZnRDbGljayhvcHRpb25zKSB7XHJcbiAgICBjb25zdCBhcCA9IG9wdGlvbnMudGFyZ2V0O1xyXG4gICAgY29uc3QgeyBjYW52YXMgfSA9IHRoaXM7XHJcblxyXG4gICAgLy8gRGlzYWJsZSB0aGUgbXVsdGkgc2VsZWN0aW9uIHdoZW4gbW92aW5nIG1vdXNlXHJcbiAgICB0aGlzLmNhbnZhcy5zZWxlY3Rpb24gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdCBvcHBvc2l0ZUNhcmRpbmFsID0ge1xyXG4gICAgICBlYXN0OiAnd2VzdCcsXHJcbiAgICAgIHdlc3Q6ICdlYXN0JyxcclxuICAgICAgbm9ydGg6ICdzb3V0aCcsXHJcbiAgICAgIHNvdXRoOiAnbm9ydGgnLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IG5ld0xpbmsgPSBuZXcgQ3VydmVkTGluayh7XHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgc3RhcnQ6IHtcclxuICAgICAgICB4OiBhcC5sZWZ0LFxyXG4gICAgICAgIHk6IGFwLnRvcCxcclxuICAgICAgICBkaXJlY3Rpb246IGFwLmNhcmRpbmFsLFxyXG4gICAgICB9LFxyXG4gICAgICBlbmQ6IHtcclxuICAgICAgICB4OiBhcC5sZWZ0LFxyXG4gICAgICAgIHk6IGFwLnRvcCxcclxuICAgICAgICBkaXJlY3Rpb246IG9wcG9zaXRlQ2FyZGluYWxbYXAuY2FyZGluYWxdLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgICBuZXdMaW5rLmluamVjdChjYW52YXMpO1xyXG4gICAgbmV3TGluay5jb25uZWN0TGluaygnc3RhcnQnLCBhcC5zaGFwZUlkLCBhcC5jYXJkaW5hbCk7XHJcbiAgICBuZXdMaW5rLmFycm93SGVhZC5maXJlKCdtb3VzZWRvd24nKTtcclxuXHJcbiAgICBjb25zdCBvbk1vdXNlTW92ZSA9IChldmVudCkgPT4ge1xyXG4gICAgICBuZXdMaW5rLmFycm93SGVhZC5sZWZ0ID0gZXZlbnQucG9pbnRlci54O1xyXG4gICAgICBuZXdMaW5rLmFycm93SGVhZC50b3AgPSBldmVudC5wb2ludGVyLnk7XHJcbiAgICAgIG5ld0xpbmsuYXJyb3dIZWFkLmZpcmUoJ21vdmluZycpO1xyXG4gICAgfTtcclxuICAgIGNhbnZhcy5vbignbW91c2U6bW92ZScsIG9uTW91c2VNb3ZlKTtcclxuXHJcbiAgICBjb25zdCBvbk1vdXNlQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgIC8vIEVuYWJsZSBiYWNrIHRoZSBtdWx0aSBzZWxlY3Rpb24gd2hlbiBtb3ZpbmcgbW91c2VcclxuICAgICAgdGhpcy5jYW52YXMuc2VsZWN0aW9uID0gdHJ1ZTtcclxuXHJcbiAgICAgIG5ld0xpbmsuYXJyb3dIZWFkLmZpcmUoJ21vdmVkJyk7XHJcbiAgICAgIG5ld0xpbmsuYXJyb3dIZWFkLmZpcmUoJ21vdXNldXAnKTtcclxuICAgICAgY2FudmFzLm9mZignbW91c2U6bW92ZScsIG9uTW91c2VNb3ZlKTtcclxuICAgICAgY2FudmFzLm9mZignbW91c2U6dXAnLCBvbk1vdXNlQ2xpY2spO1xyXG4gICAgfTtcclxuICAgIGNhbnZhcy5vbignbW91c2U6dXAnLCBvbk1vdXNlQ2xpY2spO1xyXG4gIH1cclxufVxyXG4iLCJjb25zdCB7IGZhYnJpYyB9ID0gd2luZG93O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGluayB7XHJcbiAgLyoqXHJcbiAgICogQSBMaW5rIGlzIGEgRmFicmljLlBhdGggb2JqZWN0IHdob3NlIFN0YXJ0IGFuZCBFbmQgcG9pbnRzIGNhbiBiZSBjb25uZWN0ZWQgZW5kIGFueSBhbmNob3Igb2YgdHdvIExpbmthYmxlU2hhcGUuXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIG9wdGlvbnNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7RmFicmljLkNhbnZhc30gICBvcHRpb25zLmNhbnZhcyAtIEZhYnJpYyBjYW52YXNcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgb3B0aW9ucy5pZCAtIFVuaXF1ZSBpZGVudGlmaWVyXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuc3RhcnRdIC0gQ29vcmRpbmF0ZXMgb2YgdGhlIHN0YXJ0IHBvaW50XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIFtvcHRpb25zLnN0YXJ0LnhdIC0gWCBheGlzIGNvb3JkaW5hdGUgb2YgdGhlIHN0YXJ0IHBvaW50XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIFtvcHRpb25zLnN0YXJ0LnldIC0gWSBheGlzIGNvb3JkaW5hdGUgb2YgdGhlIHN0YXJ0IHBvaW50XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIFtvcHRpb25zLmVuZC54XSAtIFggYXhpcyBjb29yZGluYXRlIG9mIHRoZSBlbmQgcG9pbnRcclxuICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgW29wdGlvbnMuZW5kLnldIC0gWSBheGlzIGNvb3JkaW5hdGUgb2YgdGhlIGVuZCBwb2ludFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBbb3B0aW9ucy5jdXN0b21dIC0gT3B0aW9ucyBlbmQgY3VzdG9taXplIHRoZSBkaWZmZXJlbnQgc2hhcGVzIG9mIHRoZSBMaW5rXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuY3VzdG9tLnBhdGhdIC0gYmV6aWVyIHF1YWRyYXRpYyBjdXJ2ZVxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBbb3B0aW9ucy5jdXN0b20uY29udHJvbFBvaW50XSAtIGJlemllciBxdWFkcmF0aWMgY3VydmUgY29udHJvbCBwb2ludFxyXG4gICAqIEBwYXJhbSB7TGluZX0gICAgICAgICAgICBbb3B0aW9ucy5jdXN0b20uY29udHJvbExpbmVdIC0gdmlzdWFsIGxpbmVzIHN0YXJ0IHRoZSBjb250cm9sIHBvaW50IGVuZCB0aGUgc3RhcnQmZW5kIHBvaW50c1xyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBbb3B0aW9ucy5jdXN0b20uc3RhcnRQb2ludF0gLSBha2EgYXJyb3dUYWlsXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLmN1c3RvbS5lbmRQb2ludF0gLSBha2EgYXJyb3dIZWFkXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBpZCxcclxuICAgICAgY2FudmFzLFxyXG4gICAgfSA9IG9wdGlvbnM7XHJcbiAgICBjb25zdCB4MSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5zdGFydCAmJiBvcHRpb25zLnN0YXJ0LnggPyBvcHRpb25zLnN0YXJ0LnggOiAwO1xyXG4gICAgY29uc3QgeTEgPSBvcHRpb25zICYmIG9wdGlvbnMuc3RhcnQgJiYgb3B0aW9ucy5zdGFydC55ID8gb3B0aW9ucy5zdGFydC55IDogMDtcclxuICAgIGNvbnN0IHgyID0gb3B0aW9ucyAmJiBvcHRpb25zLmVuZCAmJiBvcHRpb25zLmVuZC54ID8gb3B0aW9ucy5lbmQueCA6IDA7XHJcbiAgICBjb25zdCB5MiA9IG9wdGlvbnMgJiYgb3B0aW9ucy5lbmQgJiYgb3B0aW9ucy5lbmQueSA/IG9wdGlvbnMuZW5kLnkgOiAwO1xyXG4gICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcblxyXG4gICAgLy8gUGF0aCwgYSBiZXppZXIgcXVhZHJhdGljIGN1cnZlXHJcbiAgICBjb25zdCBwYXRoQ29vcmRzID0ge1xyXG4gICAgICBNOiB7XHJcbiAgICAgICAgeDogeDEsIC8vIHN0YXJ0IHhcclxuICAgICAgICB5OiB5MSwgLy8gc3RhcnQgeVxyXG4gICAgICB9LFxyXG4gICAgICBROiB7XHJcbiAgICAgICAgeDE6ICh4MSArIHgyKSAvIDIsIC8vIGNvbnRyb2wgeFxyXG4gICAgICAgIHkxOiAoeTEgKyB5MikgLyAyLCAvLyBjb250cm9sIHlcclxuICAgICAgICB4MiwgLy8gZW5kIHhcclxuICAgICAgICB5MiwgLy8gZW5kIHlcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgICBjb25zdCBwYXRoT3B0cyA9IHRoaXMuZGVmYXVsdFBhdGhPcHRpb25zID0ge1xyXG4gICAgICBmaWxsOiAnJyxcclxuICAgICAgc3Ryb2tlOiAob3B0aW9ucy5jdXN0b20gJiYgb3B0aW9ucy5jdXN0b20ucGF0aCAmJiBvcHRpb25zLmN1c3RvbS5wYXRoLnN0cm9rZVdpZHRoKSA/IG9wdGlvbnMuY3VzdG9tLnBhdGguc3Ryb2tlIDogJyMwMDAnLFxyXG4gICAgICBzdHJva2VXaWR0aDogKG9wdGlvbnMuY3VzdG9tICYmIG9wdGlvbnMuY3VzdG9tLnBhdGggJiYgb3B0aW9ucy5jdXN0b20ucGF0aC5zdHJva2VXaWR0aCkgPyBvcHRpb25zLmN1c3RvbS5wYXRoLnN0cm9rZVdpZHRoIDogMixcclxuICAgICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAgIHNlbGVjdGFibGU6IHRydWUsXHJcbiAgICAgIGhhc0JvcmRlcnM6IHRydWUsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgICAgcGVyUGl4ZWxUYXJnZXRGaW5kOiB0cnVlLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHBhdGhTdHIgPSBgTSAke3BhdGhDb29yZHMuTS54fSAke3BhdGhDb29yZHMuTS55fSBRICR7cGF0aENvb3Jkcy5RLngxfSwgJHtwYXRoQ29vcmRzLlEueTF9LCAke3BhdGhDb29yZHMuUS54Mn0sICR7cGF0aENvb3Jkcy5RLnkyfWA7XHJcbiAgICBjb25zdCBwYXRoID0gbmV3IGZhYnJpYy5QYXRoKHBhdGhTdHIsIHBhdGhPcHRzKTtcclxuICAgIHRoaXMucGF0aCA9IHBhdGg7XHJcblxyXG4gICAgLy8gQ29udHJvbCBwb2ludCBhbmQgbGluZXMgZm9yIHRoZSBxdWFkcmF0aWMgY3VydmVcclxuICAgIGNvbnN0IGNvbnRyb2xQb2ludCA9IHRoaXMuY29udHJvbFBvaW50ID0gbmV3IGZhYnJpYy5DaXJjbGUoe1xyXG4gICAgICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgICAgbGVmdDogcGF0aENvb3Jkcy5RLngxLFxyXG4gICAgICB0b3A6IHBhdGhDb29yZHMuUS55MSxcclxuICAgICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAgIHJhZGl1czogNixcclxuICAgICAgZmlsbDogJyM3OGJlZmEnLFxyXG4gICAgICBzdHJva2U6ICcjNzhiZWZhJyxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICBoYXNCb3JkZXJzOiBmYWxzZSxcclxuICAgICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgICBvcGFjaXR5OiAwLFxyXG4gICAgfSk7XHJcbiAgICBjb250cm9sUG9pbnQub24oJ21vdXNlb3ZlcicsIHRoaXMub25MaW5rTW91c2VPdmVyLmJpbmQodGhpcykpO1xyXG4gICAgY29udHJvbFBvaW50Lm9uKCdtb3VzZW91dCcsIHRoaXMub25MaW5rTW91c2VPdXQuYmluZCh0aGlzKSk7XHJcbiAgICBjb250cm9sUG9pbnQub24oJ21vdmluZycsICgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVQYXRoKCdjb250cm9sJywgdGhpcy5jb250cm9sUG9pbnQubGVmdCwgdGhpcy5jb250cm9sUG9pbnQudG9wLCBmYWxzZSk7XHJcbiAgICB9KTtcclxuICAgIGNvbnRyb2xQb2ludC5vbignbW92ZWQnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aCgnY29udHJvbCcsIHRoaXMuY29udHJvbFBvaW50LmxlZnQsIHRoaXMuY29udHJvbFBvaW50LnRvcCwgdHJ1ZSk7XHJcbiAgICB9KTtcclxuICAgIGNvbnRyb2xQb2ludC5vbignbW91c2Vkb3duJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLmJyaW5nVG9Gcm9udCgpO1xyXG4gICAgfSk7XHJcbiAgICBjb25zdCBjb250cm9sTGluZU9wdHMgPSB7XHJcbiAgICAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgICBzdHJva2VEYXNoQXJyYXk6IFs1LCA1XSxcclxuICAgICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAgIHN0cm9rZTogJyM3OGJlZmEnLFxyXG4gICAgICBzZWxlY3RhYmxlOiBmYWxzZSxcclxuICAgICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgICAgZXZlbnRlZDogZmFsc2UsXHJcbiAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgY29udHJvbExpbmUxID0gdGhpcy5jb250cm9sTGluZTEgPSBuZXcgZmFicmljLkxpbmUoW2NvbnRyb2xQb2ludC5sZWZ0LCBjb250cm9sUG9pbnQudG9wLCB4MSwgeTFdLCBjb250cm9sTGluZU9wdHMpO1xyXG4gICAgY29udHJvbExpbmUxLm9uKCdtb3VzZW92ZXInLCB0aGlzLm9uTGlua01vdXNlT3Zlci5iaW5kKHRoaXMpKTtcclxuICAgIGNvbnRyb2xMaW5lMS5vbignbW91c2VvdXQnLCB0aGlzLm9uTGlua01vdXNlT3V0LmJpbmQodGhpcykpO1xyXG4gICAgY29uc3QgY29udHJvbExpbmUyID0gdGhpcy5jb250cm9sTGluZTIgPSBuZXcgZmFicmljLkxpbmUoW2NvbnRyb2xQb2ludC5sZWZ0LCBjb250cm9sUG9pbnQudG9wLCB4MiwgeTJdLCBjb250cm9sTGluZU9wdHMpO1xyXG4gICAgY29udHJvbExpbmUyLm9uKCdtb3VzZW92ZXInLCB0aGlzLm9uTGlua01vdXNlT3Zlci5iaW5kKHRoaXMpKTtcclxuICAgIGNvbnRyb2xMaW5lMi5vbignbW91c2VvdXQnLCB0aGlzLm9uTGlua01vdXNlT3V0LmJpbmQodGhpcykpO1xyXG5cclxuICAgIC8vIEVuZCBwb2ludCAoYXJyb3dIZWFkKVxyXG4gICAgY29uc3QgaXNWYWxpZE1hc2tPcHRzID0ge1xyXG4gICAgICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgICAgbGVmdDogcGF0aENvb3Jkcy5RLngyLFxyXG4gICAgICB0b3A6IHBhdGhDb29yZHMuUS55MixcclxuICAgICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAgIHJhZGl1czogMTYsXHJcbiAgICAgIGZpbGw6ICcjNTdiODU3JywgLy8gZWE0ZjM3XHJcbiAgICAgIHN0cm9rZTogJyM1N2I4NTcnLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAgIHNlbGVjdGFibGU6IGZhbHNlLFxyXG4gICAgICBvcGFjaXR5OiAwLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGFycm93SGVhZE9wdHMgPSB7XHJcbiAgICAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgICB3aWR0aDogMTAsXHJcbiAgICAgIGhlaWdodDogMTAsXHJcbiAgICAgIGxlZnQ6IHBhdGhDb29yZHMuUS54MixcclxuICAgICAgdG9wOiBwYXRoQ29vcmRzLlEueTIsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICBmaWxsOiAnIzAwMCcsXHJcbiAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgIHN0cm9rZTogJyMwMDAnLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIHNlbGVjdGFibGU6IHRydWUsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgYXJyb3dIZWFkID0gdGhpcy5hcnJvd0hlYWQgPSBuZXcgZmFicmljLlRyaWFuZ2xlKGFycm93SGVhZE9wdHMpO1xyXG4gICAgdGhpcy5pc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrID0gbmV3IGZhYnJpYy5DaXJjbGUoaXNWYWxpZE1hc2tPcHRzKTtcclxuICAgIGFycm93SGVhZC5vbignbW92aW5nJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhdGgoJ2VuZCcsIGFycm93SGVhZC5sZWZ0LCBhcnJvd0hlYWQudG9wLCBmYWxzZSk7XHJcbiAgICAgIHRoaXMuX2NoZWNrRXh0cmVtaXR5Q2FuQmVDb25uZWN0ZWQoJ2VuZCcpO1xyXG4gICAgfSk7XHJcbiAgICBhcnJvd0hlYWQub24oJ21vdmVkJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhdGgoJ2VuZCcsIGFycm93SGVhZC5sZWZ0LCBhcnJvd0hlYWQudG9wLCB0cnVlKTtcclxuICAgICAgdGhpcy5pc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrLnNldCgnb3BhY2l0eScsIDApO1xyXG4gICAgICB0aGlzLl9jb25uZWN0RGlzY29ubmVjdEV4dHJlbWl0eSgnZW5kJyk7XHJcbiAgICB9KTtcclxuICAgIGFycm93SGVhZC5vbignbW91c2Vkb3duJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLmJyaW5nVG9Gcm9udCgpO1xyXG4gICAgICB0aGlzLnRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KDEpO1xyXG5cclxuICAgICAgYXJyb3dIZWFkLm9uKCdtb3VzZXVwJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudG9nZ2xlQWxsQW5jaG9yc09wYWNpdHkoMCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU3RhcnQgcG9pbnQgKGFycm93VGFpbClcclxuICAgIGNvbnN0IGFycm93VGFpbE9wdHMgPSB7XHJcbiAgICAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgICB3aWR0aDogMTAsXHJcbiAgICAgIGhlaWdodDogMTAsXHJcbiAgICAgIGxlZnQ6IHBhdGhDb29yZHMuTS54LFxyXG4gICAgICB0b3A6IHBhdGhDb29yZHMuTS55LFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgZmlsbDogJyNmZmYnLFxyXG4gICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICBzdHJva2U6ICcjMDAwJyxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgICBoYXNCb3JkZXJzOiBmYWxzZSxcclxuICAgICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGFycm93VGFpbCA9IHRoaXMuYXJyb3dUYWlsID0gbmV3IGZhYnJpYy5SZWN0KGFycm93VGFpbE9wdHMpO1xyXG4gICAgdGhpcy5pc1ZhbGlkVGFpbENvbm5lY3Rpb25NYXNrID0gbmV3IGZhYnJpYy5DaXJjbGUoaXNWYWxpZE1hc2tPcHRzKTtcclxuICAgIGFycm93VGFpbC5vbignbW92aW5nJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhdGgoJ3N0YXJ0JywgYXJyb3dUYWlsLmxlZnQsIGFycm93VGFpbC50b3AsIGZhbHNlKTtcclxuICAgICAgdGhpcy5fY2hlY2tFeHRyZW1pdHlDYW5CZUNvbm5lY3RlZCgnc3RhcnQnKTtcclxuICAgIH0pO1xyXG4gICAgYXJyb3dUYWlsLm9uKCdtb3ZlZCcsICgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVQYXRoKCdzdGFydCcsIGFycm93VGFpbC5sZWZ0LCBhcnJvd1RhaWwudG9wLCB0cnVlKTtcclxuICAgICAgdGhpcy5pc1ZhbGlkVGFpbENvbm5lY3Rpb25NYXNrLnNldCgnb3BhY2l0eScsIDApO1xyXG4gICAgICB0aGlzLl9jb25uZWN0RGlzY29ubmVjdEV4dHJlbWl0eSgnc3RhcnQnKTtcclxuICAgIH0pO1xyXG4gICAgYXJyb3dUYWlsLm9uKCdtb3VzZWRvd24nLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuYnJpbmdUb0Zyb250KCk7XHJcbiAgICAgIHRoaXMudG9nZ2xlQWxsQW5jaG9yc09wYWNpdHkoMSk7XHJcblxyXG4gICAgICBhcnJvd1RhaWwub24oJ21vdXNldXAnLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy50b2dnbGVBbGxBbmNob3JzT3BhY2l0eSgwKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGluamVjdCgpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgaWQsXHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgcGF0aCxcclxuICAgICAgY29udHJvbFBvaW50LFxyXG4gICAgICBjb250cm9sTGluZTEsXHJcbiAgICAgIGNvbnRyb2xMaW5lMixcclxuICAgICAgYXJyb3dIZWFkLFxyXG4gICAgICBhcnJvd1RhaWwsXHJcbiAgICAgIGlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2ssXHJcbiAgICAgIGlzVmFsaWRIZWFkQ29ubmVjdGlvbk1hc2ssXHJcbiAgICB9ID0gdGhpcztcclxuICAgIGNhbnZhcy5hZGQoY29udHJvbFBvaW50KTtcclxuICAgIGNhbnZhcy5hZGQoY29udHJvbExpbmUxKTtcclxuICAgIGNhbnZhcy5hZGQoY29udHJvbExpbmUyKTtcclxuICAgIGNhbnZhcy5hZGQoaXNWYWxpZFRhaWxDb25uZWN0aW9uTWFzayk7XHJcbiAgICBjYW52YXMuYWRkKGlzVmFsaWRIZWFkQ29ubmVjdGlvbk1hc2spO1xyXG4gICAgY2FudmFzLmFkZChhcnJvd0hlYWQpO1xyXG4gICAgY2FudmFzLmFkZChhcnJvd1RhaWwpO1xyXG5cclxuICAgIGNhbnZhcy5hZGQocGF0aCk7XHJcbiAgICB0aGlzLnVwZGF0ZVBhdGgoJ3N0YXJ0JywgcGF0aC5wYXRoWzBdWzFdLCBwYXRoLnBhdGhbMF1bMl0sIHRydWUpO1xyXG4gICAgdGhpcy51cGRhdGVQYXRoKCdlbmQnLCBwYXRoLnBhdGhbMV1bM10sIHBhdGgucGF0aFsxXVs0XSwgdHJ1ZSk7XHJcbiAgICB0aGlzLnVwZGF0ZVBhdGgoJ2NvbnRyb2wnLCBwYXRoLnBhdGhbMV1bMV0sIHBhdGgucGF0aFsxXVsyXSwgdHJ1ZSk7XHJcblxyXG4gICAgY2FudmFzLmxpbmtzW2lkXSA9IHRoaXM7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBjb25uZWN0TGluayhsaW5rUG9pbnQsIHNoYXBlSWQsIGNhcmRpbmFsKSB7XHJcbiAgICAvLyBDaGVjayBub3QgYWxyZWFkeSBjb25uZWN0ZWRcclxuICAgIGlmICghdGhpcy5pc1ZhbGlkQ29ubmVjdGlvbihsaW5rUG9pbnQsIHNoYXBlSWQsIGNhcmRpbmFsKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBzaGFwZSA9IHRoaXMuY2FudmFzLmdldE9iamVjdHMoKVxyXG4gICAgICAuZmluZCgobykgPT4gby5pZCA9PT0gc2hhcGVJZCk7XHJcblxyXG4gICAgLy8gRGlzY29ubmVjdCBleGlzdGluZyBvYmplY3RcclxuICAgIHRoaXMuZGlzY29ubmVjdExpbmsobGlua1BvaW50KTtcclxuXHJcbiAgICAvLyBDb25uZWN0XHJcbiAgICB0aGlzW2xpbmtQb2ludF0gPSB7XHJcbiAgICAgIHNoYXBlLFxyXG4gICAgICBhbmNob3I6IGNhcmRpbmFsLFxyXG4gICAgICBoYW5kbGVyczoge1xyXG4gICAgICAgIG9uQW5jaG9yUG9zaXRpb25Nb2RpZnlpbmc6ICgpID0+IHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlUGF0aChsaW5rUG9pbnQsIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLmxlZnQsIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLnRvcCwgZmFsc2UpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25BbmNob3JQb3NpdGlvbk1vZGlmaWVkOiAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZVBhdGgobGlua1BvaW50LCBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5sZWZ0LCBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS50b3AsIHRydWUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgLy8gc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ub3BhY2l0eSA9IDA7XHJcbiAgICBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5vbigncGc6cG9zaXRpb246bW9kaWZ5aW5nJywgdGhpc1tsaW5rUG9pbnRdLmhhbmRsZXJzLm9uQW5jaG9yUG9zaXRpb25Nb2RpZnlpbmcpO1xyXG4gICAgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ub24oJ3BnOnBvc2l0aW9uOm1vZGlmaWVkJywgdGhpc1tsaW5rUG9pbnRdLmhhbmRsZXJzLm9uQW5jaG9yUG9zaXRpb25Nb2RpZmllZCk7XHJcblxyXG4gICAgLy8gVXBkYXRlIExpbmtcclxuICAgIHRoaXMudXBkYXRlUGF0aChsaW5rUG9pbnQsIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLmxlZnQsIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLnRvcCwgdHJ1ZSwgZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgZGlzY29ubmVjdExpbmsobGlua1BvaW50KSB7XHJcbiAgICBpZiAodGhpc1tsaW5rUG9pbnRdKSB7XHJcbiAgICAgIHRoaXNbbGlua1BvaW50XS5zaGFwZS5hbmNob3JzW3RoaXNbbGlua1BvaW50XS5hbmNob3JdLm9mZigncGc6cG9zaXRpb246bW9kaWZ5aW5nJywgdGhpc1tsaW5rUG9pbnRdLmhhbmRsZXJzLm9uQW5jaG9yUG9zaXRpb25Nb2RpZnlpbmcpO1xyXG4gICAgICB0aGlzW2xpbmtQb2ludF0uc2hhcGUuYW5jaG9yc1t0aGlzW2xpbmtQb2ludF0uYW5jaG9yXS5vZmYoJ3BnOnBvc2l0aW9uOm1vZGlmaWVkJywgdGhpc1tsaW5rUG9pbnRdLmhhbmRsZXJzLm9uQW5jaG9yUG9zaXRpb25Nb2RpZmllZCk7XHJcbiAgICAgIGRlbGV0ZSB0aGlzW2xpbmtQb2ludF07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXNldEN1cnZhdHVyZSgpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgY29udHJvbFBvaW50LFxyXG4gICAgICBwYXRoLFxyXG4gICAgfSA9IHRoaXM7XHJcbiAgICBjb250cm9sUG9pbnQubGVmdCA9IChwYXRoLnBhdGhbMF1bMV0gKyBwYXRoLnBhdGhbMV1bM10pIC8gMjtcclxuICAgIGNvbnRyb2xQb2ludC50b3AgPSAocGF0aC5wYXRoWzBdWzJdICsgcGF0aC5wYXRoWzFdWzRdKSAvIDI7XHJcbiAgICBjb250cm9sUG9pbnQuc2V0Q29vcmRzKCk7XHJcbiAgICBjb250cm9sUG9pbnQuZmlyZSgnbW92ZWQnKTtcclxuICB9XHJcblxyXG4gIGJyaW5nVG9Gcm9udCgpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgY2FudmFzLFxyXG4gICAgICBwYXRoLFxyXG4gICAgICBjb250cm9sUG9pbnQsXHJcbiAgICAgIGFycm93SGVhZCxcclxuICAgICAgYXJyb3dUYWlsLFxyXG4gICAgfSA9IHRoaXM7XHJcbiAgICBjYW52YXMuYnJpbmdUb0Zyb250KHBhdGgpO1xyXG4gICAgY2FudmFzLmJyaW5nVG9Gcm9udChjb250cm9sUG9pbnQpO1xyXG4gICAgY2FudmFzLmJyaW5nVG9Gcm9udChhcnJvd0hlYWQpO1xyXG4gICAgY2FudmFzLmJyaW5nVG9Gcm9udChhcnJvd1RhaWwpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlUGF0aChsaW5rUG9pbnQsIHgsIHksIGNvbW1pdCwgcmVzZXRDdXJ2KSB7XHJcbiAgICBjb25zdCBwYXRoID0ge1xyXG4gICAgICBNOiB7XHJcbiAgICAgICAgeDogbGlua1BvaW50ID09PSAnc3RhcnQnID8geCA6IHRoaXMucGF0aC5wYXRoWzBdWzFdLFxyXG4gICAgICAgIHk6IGxpbmtQb2ludCA9PT0gJ3N0YXJ0JyA/IHkgOiB0aGlzLnBhdGgucGF0aFswXVsyXSxcclxuICAgICAgfSxcclxuICAgICAgUToge1xyXG4gICAgICAgIHgxOiBsaW5rUG9pbnQgPT09ICdjb250cm9sJyA/IHggOiB0aGlzLnBhdGgucGF0aFsxXVsxXSxcclxuICAgICAgICB5MTogbGlua1BvaW50ID09PSAnY29udHJvbCcgPyB5IDogdGhpcy5wYXRoLnBhdGhbMV1bMl0sXHJcbiAgICAgICAgeDI6IGxpbmtQb2ludCA9PT0gJ2VuZCcgPyB4IDogdGhpcy5wYXRoLnBhdGhbMV1bM10sXHJcbiAgICAgICAgeTI6IGxpbmtQb2ludCA9PT0gJ2VuZCcgPyB5IDogdGhpcy5wYXRoLnBhdGhbMV1bNF0sXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgaWYgKGNvbW1pdCkge1xyXG4gICAgICBjb25zdCBwYXRoU3RyID0gYE0gJHtwYXRoLk0ueH0gJHtwYXRoLk0ueX0gUSAke3BhdGguUS54MX0sICR7cGF0aC5RLnkxfSwgJHtwYXRoLlEueDJ9LCAke3BhdGguUS55Mn1gO1xyXG4gICAgICBjb25zdCBuZXdQYXRoID0gbmV3IGZhYnJpYy5QYXRoKHBhdGhTdHIsIHRoaXMuZGVmYXVsdFBhdGhPcHRpb25zKTtcclxuICAgICAgdGhpcy5jYW52YXMucmVtb3ZlKHRoaXMucGF0aCk7XHJcbiAgICAgIHRoaXMuY2FudmFzLmFkZChuZXdQYXRoKTtcclxuXHJcbiAgICAgIG5ld1BhdGgub24oJ21vdXNlb3ZlcicsIHRoaXMub25MaW5rTW91c2VPdmVyLmJpbmQodGhpcykpO1xyXG4gICAgICBuZXdQYXRoLm9uKCdtb3VzZW91dCcsIHRoaXMub25MaW5rTW91c2VPdXQuYmluZCh0aGlzKSk7XHJcbiAgICAgIG5ld1BhdGgub24oJ21vdXNlZG93bicsIHRoaXMuYnJpbmdUb0Zyb250LmJpbmQodGhpcykpO1xyXG4gICAgICBuZXdQYXRoLm9uKCdtb3ZpbmcnLCB0aGlzLm9uTGlua01vdmluZy5iaW5kKHRoaXMpKTtcclxuICAgICAgbmV3UGF0aC5vbignbW92ZWQnLCB0aGlzLm9uTGlua01vdmVkLmJpbmQodGhpcykpO1xyXG4gICAgICBjb25zdCB0b0JpbmQgPSBbXHJcbiAgICAgICAgdGhpcy5hcnJvd0hlYWQsXHJcbiAgICAgICAgdGhpcy5hcnJvd1RhaWwsXHJcbiAgICAgICAgdGhpcy5jb250cm9sUG9pbnQsXHJcbiAgICAgICAgdGhpcy5jb250cm9sTGluZTEsXHJcbiAgICAgICAgdGhpcy5jb250cm9sTGluZTIsXHJcbiAgICAgIF07XHJcbiAgICAgIGNvbnN0IGJvc3NUcmFuc2Zvcm0gPSBuZXdQYXRoLmNhbGNUcmFuc2Zvcm1NYXRyaXgoKTtcclxuICAgICAgY29uc3QgaW52ZXJ0ZWRCb3NzVHJhbnNmb3JtID0gZmFicmljLnV0aWwuaW52ZXJ0VHJhbnNmb3JtKGJvc3NUcmFuc2Zvcm0pO1xyXG4gICAgICB0b0JpbmQuZm9yRWFjaCgobykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRlc2lyZWRUcmFuc2Zvcm0gPSBmYWJyaWMudXRpbC5tdWx0aXBseVRyYW5zZm9ybU1hdHJpY2VzKFxyXG4gICAgICAgICAgaW52ZXJ0ZWRCb3NzVHJhbnNmb3JtLFxyXG4gICAgICAgICAgby5jYWxjVHJhbnNmb3JtTWF0cml4KCksXHJcbiAgICAgICAgKTtcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cclxuICAgICAgICBvLnJlbGF0aW9uc2hpcCA9IGRlc2lyZWRUcmFuc2Zvcm07XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5wYXRoID0gbmV3UGF0aDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGF0aC5zZXQoJ3BhdGgnLCBbXHJcbiAgICAgICAgWydNJywgcGF0aC5NLngsIHBhdGguTS55XSxcclxuICAgICAgICBbJ1EnLCBwYXRoLlEueDEsIHBhdGguUS55MSwgcGF0aC5RLngyLCBwYXRoLlEueTJdLFxyXG4gICAgICBdKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBVcGRhdGUgY29udHJvbCBsaW5lcywgYXJyb3cgaGVhZHMgYW5kIHRhaWxzXHJcbiAgICB0aGlzLmNvbnRyb2xMaW5lMS5zZXQoe1xyXG4gICAgICB4MTogdGhpcy5jb250cm9sUG9pbnQubGVmdCxcclxuICAgICAgeTE6IHRoaXMuY29udHJvbFBvaW50LnRvcCxcclxuICAgICAgeDI6IHRoaXMucGF0aC5wYXRoWzBdWzFdLFxyXG4gICAgICB5MjogdGhpcy5wYXRoLnBhdGhbMF1bMl0sXHJcbiAgICB9KTtcclxuICAgIHRoaXMuY29udHJvbExpbmUyLnNldCh7XHJcbiAgICAgIHgxOiB0aGlzLmNvbnRyb2xQb2ludC5sZWZ0LFxyXG4gICAgICB5MTogdGhpcy5jb250cm9sUG9pbnQudG9wLFxyXG4gICAgICB4MjogdGhpcy5wYXRoLnBhdGhbMV1bM10sXHJcbiAgICAgIHkyOiB0aGlzLnBhdGgucGF0aFsxXVs0XSxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgYXJyb3dIZWFkQW5nbGUgPSAoTWF0aC5hdGFuMih0aGlzLnBhdGgucGF0aFsxXVs0XSAtIHRoaXMucGF0aC5wYXRoWzFdWzJdLCB0aGlzLnBhdGgucGF0aFsxXVszXSAtIHRoaXMucGF0aC5wYXRoWzFdWzFdKSAqIDE4MCkgLyBNYXRoLlBJO1xyXG4gICAgdGhpcy5hcnJvd0hlYWQuYW5nbGUgPSBhcnJvd0hlYWRBbmdsZSArIDkwO1xyXG4gICAgdGhpcy5hcnJvd0hlYWQubGVmdCA9IHRoaXMucGF0aC5wYXRoWzFdWzNdO1xyXG4gICAgdGhpcy5hcnJvd0hlYWQudG9wID0gdGhpcy5wYXRoLnBhdGhbMV1bNF07XHJcbiAgICB0aGlzLmFycm93SGVhZC5zZXRDb29yZHMoKTtcclxuICAgIHRoaXMuYXJyb3dUYWlsLmxlZnQgPSB0aGlzLnBhdGgucGF0aFswXVsxXTtcclxuICAgIHRoaXMuYXJyb3dUYWlsLnRvcCA9IHRoaXMucGF0aC5wYXRoWzBdWzJdO1xyXG4gICAgdGhpcy5hcnJvd1RhaWwuc2V0Q29vcmRzKCk7XHJcblxyXG4gICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcclxuXHJcbiAgICAvLyBSZXNldCBjb250cm9sIHBvaW50XHJcbiAgICBpZiAocmVzZXRDdXJ2KSB7XHJcbiAgICAgIHRoaXMucmVzZXRDdXJ2YXR1cmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzVmFsaWRDb25uZWN0aW9uKGxpbmtQb2ludCwgc2hhcGVJZCwgY2FyZGluYWwpIHtcclxuICAgIGNvbnN0IHNoYXBlID0gdGhpcy5jYW52YXMuZ2V0T2JqZWN0cygpXHJcbiAgICAgIC5maW5kKChvKSA9PiBvLmlkID09PSBzaGFwZUlkKTtcclxuICAgIC8vIENoZWNrIG5vdCBhbHJlYWR5IGNvbm5lY3RlZFxyXG4gICAgaWYgKGxpbmtQb2ludCA9PT0gJ3N0YXJ0Jykge1xyXG4gICAgICBpZiAodGhpcy5zdGFydCAmJiB0aGlzLnN0YXJ0LnNoYXBlICYmIHRoaXMuc3RhcnQuc2hhcGUuaWQgPT09IHNoYXBlLmlkICYmIHRoaXMuc3RhcnQuY2FyZGluYWwgPT09IGNhcmRpbmFsKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyB0cnlpbmcgZW5kIHNldCB0aGUgc2FtZSBhbHJlYWR5IGNvbm5lY3RlZCBhbmNob3JcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5lbmQgJiYgdGhpcy5lbmQuc2hhcGUgJiYgdGhpcy5lbmQuc2hhcGUuaWQgPT09IHNoYXBlLmlkKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyB0cnlpbmcgZW5kIHNob3J0IGNpcmN1aXQgdGhlIHJlY3RhbmdsZVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGxpbmtQb2ludCA9PT0gJ2VuZCcpIHtcclxuICAgICAgaWYgKHRoaXMuZW5kICYmIHRoaXMuZW5kLnNoYXBlICYmIHRoaXMuZW5kLnNoYXBlLmlkID09PSBzaGFwZS5pZCAmJiB0aGlzLmVuZC5jYXJkaW5hbCA9PT0gY2FyZGluYWwpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIHRyeWluZyBlbmQgc2V0IHRoZSBzYW1lIGFscmVhZHkgY29ubmVjdGVkIGFuY2hvclxyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLnN0YXJ0ICYmIHRoaXMuc3RhcnQuc2hhcGUgJiYgdGhpcy5zdGFydC5zaGFwZS5pZCA9PT0gc2hhcGUuaWQpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIHRyeWluZyBlbmQgc2hvcnQgY2lyY3VpdCB0aGUgcmVjdGFuZ2xlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlQWxsQW5jaG9yc09wYWNpdHkob3BhY2l0eSkge1xyXG4gICAgY29uc3QgYW5jaG9ycyA9IHRoaXMuY2FudmFzLmdldE9iamVjdHMoKVxyXG4gICAgICAuZmlsdGVyKChvKSA9PiBvLnR5cGUgPT09ICdhbmNob3InKTtcclxuXHJcbiAgICAvLyBjb25zdCBwcm9taXNlcyA9IFtdO1xyXG4gICAgLy8gY29uc3QgcHJvbWlzZUZhY3RvcnkgPSBmdW5jdGlvbiAoYW5jaG9yKSB7XHJcbiAgICAvLyAgIHJldHVybiBmdW5jdGlvbiAocmVzb2x2ZSkge1xyXG4gICAgLy8gICAgIGFuY2hvci5hbmltYXRlKCdvcGFjaXR5Jywgb3BhY2l0eSwge1xyXG4gICAgLy8gICAgICAgZHVyYXRpb246IDMwMCxcclxuICAgIC8vICAgICAgIG9uQ2hhbmdlOiByZXNvbHZlLFxyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gICB9O1xyXG4gICAgLy8gfTtcclxuICAgIC8vIGZvciAobGV0IGEgPSAwOyBhIDwgYW5jaG9ycy5sZW5ndGg7IGEgKz0gMSkge1xyXG4gICAgLy8gICBpZiAobG9jayAhPT0gdW5kZWZpbmVkKSBhbmNob3JzW2FdLmxvY2tPcGFjaXR5ID0gbG9jaztcclxuICAgIC8vICAgcHJvbWlzZXMucHVzaChuZXcgUHJvbWlzZShwcm9taXNlRmFjdG9yeShhbmNob3JzW2FdKSkpO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCkgPT4ge1xyXG4gICAgLy8gICB0aGlzLmNhbnZhcy5yZW5kZXJBbGwoKTtcclxuICAgIC8vIH0pO1xyXG5cclxuICAgIGZvciAobGV0IGEgPSAwOyBhIDwgYW5jaG9ycy5sZW5ndGg7IGEgKz0gMSkge1xyXG4gICAgICAvLyBpZiAobG9jayAhPT0gdW5kZWZpbmVkKSBhbmNob3JzW2FdLmxvY2tPcGFjaXR5ID0gbG9jaztcclxuICAgICAgYW5jaG9yc1thXS5zZXQoJ29wYWNpdHknLCBvcGFjaXR5KTtcclxuICAgIH1cclxuICAgIHRoaXMuY2FudmFzLnJlbmRlckFsbCgpO1xyXG4gIH1cclxuXHJcbiAgb25MaW5rTW91c2VPdmVyKCkge1xyXG4gICAgdGhpcy5jb250cm9sUG9pbnQudG9nZ2xlT3BhY2l0eSgxKTtcclxuICAgIHRoaXMuY29udHJvbExpbmUxLnRvZ2dsZU9wYWNpdHkoMSk7XHJcbiAgICB0aGlzLmNvbnRyb2xMaW5lMi50b2dnbGVPcGFjaXR5KDEpO1xyXG4gIH1cclxuXHJcbiAgb25MaW5rTW91c2VPdXQoKSB7XHJcbiAgICB0aGlzLmNvbnRyb2xQb2ludC50b2dnbGVPcGFjaXR5KDApO1xyXG4gICAgdGhpcy5jb250cm9sTGluZTEudG9nZ2xlT3BhY2l0eSgwKTtcclxuICAgIHRoaXMuY29udHJvbExpbmUyLnRvZ2dsZU9wYWNpdHkoMCk7XHJcbiAgfVxyXG5cclxuICBvbkxpbmtNb3ZpbmcoKSB7XHJcbiAgICAvLyBNb3ZlIHN0YXJ0LCBlbmQsIGNvbnRyb2wgcG9pbnRzIGFsdG9nZXRoZXIgd2l0aCB0aGUgUGF0aFxyXG4gICAgY29uc3QgdG9VcGRhdGUgPSBbXHJcbiAgICAgIHRoaXMuYXJyb3dIZWFkLFxyXG4gICAgICB0aGlzLmFycm93VGFpbCxcclxuICAgICAgdGhpcy5jb250cm9sUG9pbnQsXHJcbiAgICAgIHRoaXMuY29udHJvbExpbmUxLFxyXG4gICAgICB0aGlzLmNvbnRyb2xMaW5lMixcclxuICAgIF07XHJcbiAgICB0b1VwZGF0ZS5mb3JFYWNoKChvKSA9PiB7XHJcbiAgICAgIGlmICghby5yZWxhdGlvbnNoaXApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgeyByZWxhdGlvbnNoaXAgfSA9IG87XHJcbiAgICAgIGNvbnN0IG5ld1RyYW5zZm9ybSA9IGZhYnJpYy51dGlsLm11bHRpcGx5VHJhbnNmb3JtTWF0cmljZXMoXHJcbiAgICAgICAgdGhpcy5wYXRoLmNhbGNUcmFuc2Zvcm1NYXRyaXgoKSxcclxuICAgICAgICByZWxhdGlvbnNoaXAsXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IG9wdCA9IGZhYnJpYy51dGlsLnFyRGVjb21wb3NlKG5ld1RyYW5zZm9ybSk7XHJcbiAgICAgIG8uc2V0KHtcclxuICAgICAgICBmbGlwWDogZmFsc2UsXHJcbiAgICAgICAgZmxpcFk6IGZhbHNlLFxyXG4gICAgICB9KTtcclxuICAgICAgby5zZXRQb3NpdGlvbkJ5T3JpZ2luKFxyXG4gICAgICAgIHsgeDogb3B0LnRyYW5zbGF0ZVgsIHk6IG9wdC50cmFuc2xhdGVZIH0sXHJcbiAgICAgICAgJ2NlbnRlcicsXHJcbiAgICAgICAgJ2NlbnRlcicsXHJcbiAgICAgICk7XHJcbiAgICAgIG8uc2V0KG9wdCk7XHJcbiAgICAgIG8uc2V0Q29vcmRzKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBGaW5hbGx5LCBjaGVjayB0aGUgc3RhcnQgb3IgZW5kIHBvaW50cyBjYW4gYmUgY29ubmVjdGVkLlxyXG4gICAgdGhpcy5fY2hlY2tFeHRyZW1pdHlDYW5CZUNvbm5lY3RlZCgnc3RhcnQnKTtcclxuICAgIHRoaXMuX2NoZWNrRXh0cmVtaXR5Q2FuQmVDb25uZWN0ZWQoJ2VuZCcpO1xyXG4gIH1cclxuXHJcbiAgb25MaW5rTW92ZWQoKSB7XHJcbiAgICAvLyBSZXVwZGF0ZSB0aGUgUGF0aCBhY2NvcmRpbmcgZW5kIHRoZSBuZXcgY29vcmRpbmF0ZXMgb2YgYWxsIGVsZW1lbnRzXHJcbiAgICBjb25zdCBwYXRoQ29vcmRzID0ge1xyXG4gICAgICBNOiB7XHJcbiAgICAgICAgeDogdGhpcy5hcnJvd1RhaWwubGVmdCxcclxuICAgICAgICB5OiB0aGlzLmFycm93VGFpbC50b3AsXHJcbiAgICAgIH0sXHJcbiAgICAgIFE6IHtcclxuICAgICAgICB4MTogdGhpcy5jb250cm9sUG9pbnQubGVmdCxcclxuICAgICAgICB5MTogdGhpcy5jb250cm9sUG9pbnQudG9wLFxyXG4gICAgICAgIHgyOiB0aGlzLmFycm93SGVhZC5sZWZ0LFxyXG4gICAgICAgIHkyOiB0aGlzLmFycm93SGVhZC50b3AsXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgY29uc3QgcGF0aFN0ciA9IGBNICR7cGF0aENvb3Jkcy5NLnh9ICR7cGF0aENvb3Jkcy5NLnl9IFEgJHtwYXRoQ29vcmRzLlEueDF9LCAke3BhdGhDb29yZHMuUS55MX0sICR7cGF0aENvb3Jkcy5RLngyfSwgJHtwYXRoQ29vcmRzLlEueTJ9YDtcclxuICAgIGNvbnN0IGNhY2EgPSBuZXcgZmFicmljLlBhdGgocGF0aFN0ciwge30pO1xyXG4gICAgdGhpcy51cGRhdGVQYXRoKCdzdGFydCcsIGNhY2EucGF0aFswXVsxXSwgY2FjYS5wYXRoWzBdWzJdLCBmYWxzZSk7XHJcbiAgICB0aGlzLnVwZGF0ZVBhdGgoJ2VuZCcsIGNhY2EucGF0aFsxXVszXSwgY2FjYS5wYXRoWzFdWzRdLCBmYWxzZSk7XHJcbiAgICB0aGlzLnVwZGF0ZVBhdGgoJ2NvbnRyb2wnLCBjYWNhLnBhdGhbMV1bMV0sIGNhY2EucGF0aFsxXVsyXSwgdHJ1ZSk7XHJcblxyXG4gICAgLy8gQ29ubmVjdCBvciBEaXNjb25uZWN0IGRlcGVuZGluZyBvbiBleHRyZW1pdGllcyBwb3NpdGlvbnNcclxuICAgIHRoaXMuaXNWYWxpZFRhaWxDb25uZWN0aW9uTWFzay5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgIHRoaXMuaXNWYWxpZEhlYWRDb25uZWN0aW9uTWFzay5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgIHRoaXMuX2Nvbm5lY3REaXNjb25uZWN0RXh0cmVtaXR5KCdzdGFydCcpO1xyXG4gICAgdGhpcy5fY29ubmVjdERpc2Nvbm5lY3RFeHRyZW1pdHkoJ2VuZCcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGVscGVyIGVuZCBkaXNwbGF5IGEgdmFsaWQgY2lyY2xlIG1hc2sgb24gc3BlY2lmaWMgY29uZGl0aW9ucy5cclxuICAgKiBJZiB0aGUgZXh0cmVtaXR5IGlzIHRvdWNoaW5nIGFuIGFuY2hvciBvZiBhIExpbmthYmxlU2hhcGUgc3RhcnQgd2hpY2ggaXQgaXMgbm90IHlldCBjb25uZWN0ZWQgPT4gc2hvdyBHUkVFTlxyXG4gICAqIElmIHRoZSBleHRyZW1pdHkgaXMgdG91Y2hpbmcgYW4gYW5jaG9yIG9mIGEgTGlua2FibGVTaGFwZSBzdGFydCB3aGljaCBpdCBpcyBhbHJlYWR5IGNvbm5lY3RlZCBieSB0aGUgb3RoZXIgZXh0cmVtaXR5ID0+IHNob3cgUkVEXHJcbiAgICogQHBhcmFtIGRpcmVjdGlvblxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX2NoZWNrRXh0cmVtaXR5Q2FuQmVDb25uZWN0ZWQoZGlyZWN0aW9uKSB7XHJcbiAgICBjb25zdCB7IGNhbnZhcyB9ID0gdGhpcztcclxuXHJcbiAgICBsZXQgZXh0cmVtaXR5O1xyXG4gICAgbGV0IG1hc2s7XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSAnc3RhcnQnKSB7XHJcbiAgICAgIGV4dHJlbWl0eSA9IHRoaXMuYXJyb3dUYWlsO1xyXG4gICAgICBtYXNrID0gdGhpcy5pc1ZhbGlkVGFpbENvbm5lY3Rpb25NYXNrO1xyXG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdlbmQnKSB7XHJcbiAgICAgIGV4dHJlbWl0eSA9IHRoaXMuYXJyb3dIZWFkO1xyXG4gICAgICBtYXNrID0gdGhpcy5pc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrO1xyXG4gICAgfVxyXG5cclxuICAgIG1hc2subGVmdCA9IGV4dHJlbWl0eS5sZWZ0O1xyXG4gICAgbWFzay50b3AgPSBleHRyZW1pdHkudG9wO1xyXG4gICAgbWFzay5zZXRDb29yZHMoKTtcclxuICAgIG1hc2suc2V0KCdvcGFjaXR5JywgMCk7XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgaW50ZXJzZWN0cyB3aXRoIGFuY2hvclxyXG4gICAgY29uc3QgYW5jaG9ycyA9IGNhbnZhcy5nZXRPYmplY3RzKClcclxuICAgICAgLmZpbHRlcigobykgPT4gby50eXBlID09PSAnYW5jaG9yJyk7XHJcbiAgICBleHRyZW1pdHkuc2V0KCdzdHJva2UnLCAnIzAwMCcpO1xyXG4gICAgZm9yIChsZXQgYSA9IDA7IGEgPCBhbmNob3JzLmxlbmd0aDsgYSArPSAxKSB7XHJcbiAgICAgIGlmIChleHRyZW1pdHkuaW50ZXJzZWN0c1dpdGhPYmplY3QoYW5jaG9yc1thXSkpIHtcclxuICAgICAgICBtYXNrLnNldCgnb3BhY2l0eScsIDAuNSk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZENvbm5lY3Rpb24oZGlyZWN0aW9uLCBhbmNob3JzW2FdLnNoYXBlSWQsIGFuY2hvcnNbYV0uY2FyZGluYWwpKSB7XHJcbiAgICAgICAgICBtYXNrLnNldCh7XHJcbiAgICAgICAgICAgIHN0cm9rZTogJyM1N2I4NTcnLFxyXG4gICAgICAgICAgICBmaWxsOiAnIzU3Yjg1NycsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGV4dHJlbWl0eS5zZXQoJ3N0cm9rZScsICcjNWY1Jyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG1hc2suc2V0KHtcclxuICAgICAgICAgICAgc3Ryb2tlOiAnI2VhNGYzNycsXHJcbiAgICAgICAgICAgIGZpbGw6ICcjZWE0ZjM3JyxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgZXh0cmVtaXR5LnNldCgnc3Ryb2tlJywgJyNlYTRmMzcnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhlbHBlciBlbmQgZXhlY3V0ZSBjb25uZWN0L2Rpc2Nvbm5lY3QgZGVwZW5kaW5nIG9uIHNwZWNpZmljIGNvbmRpdGlvbnMuXHJcbiAgICogSWYgdGhlIGV4dHJlbWl0eSB3YXMgY29ubmVjdGVkIEFORCBpdCBpcyBOT1QgdG91Y2hpbmcgdGhlIGFuY2hvciBhbnltb3JlID0+IGRpc2Nvbm5lY3QgaXQuXHJcbiAgICogSWYgdGhlIGV4dHJlbWl0eSB3YXMgZGlzY29ubmVjdGVkIEFORCBpdCBpcyB0b3VjaGluZyB0aGUgYW5jaG9yID0+IGNvbm5lY3QgaXQuXHJcbiAgICogQHBhcmFtIGRpcmVjdGlvblxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX2Nvbm5lY3REaXNjb25uZWN0RXh0cmVtaXR5KGRpcmVjdGlvbikge1xyXG4gICAgY29uc3QgeyBjYW52YXMgfSA9IHRoaXM7XHJcblxyXG4gICAgbGV0IGV4dHJlbWl0eTtcclxuICAgIGlmIChkaXJlY3Rpb24gPT09ICdzdGFydCcpIHtcclxuICAgICAgZXh0cmVtaXR5ID0gdGhpcy5hcnJvd1RhaWw7XHJcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ2VuZCcpIHtcclxuICAgICAgZXh0cmVtaXR5ID0gdGhpcy5hcnJvd0hlYWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgaW50ZXJzZWN0cyB3aXRoIGFuY2hvclxyXG4gICAgY29uc3QgYW5jaG9ycyA9IGNhbnZhcy5nZXRPYmplY3RzKClcclxuICAgICAgLmZpbHRlcigobykgPT4gby50eXBlID09PSAnYW5jaG9yJyk7XHJcbiAgICBmb3IgKGxldCBhID0gMDsgYSA8IGFuY2hvcnMubGVuZ3RoOyBhICs9IDEpIHtcclxuICAgICAgaWYgKGV4dHJlbWl0eS5pbnRlcnNlY3RzV2l0aE9iamVjdChhbmNob3JzW2FdKSkge1xyXG4gICAgICAgIHRoaXMuY29ubmVjdExpbmsoZGlyZWN0aW9uLCBhbmNob3JzW2FdLnNoYXBlSWQsIGFuY2hvcnNbYV0uY2FyZGluYWwpO1xyXG4gICAgICAgIC8vIGFuY2hvcnNbYV0uc2V0KCdzdHJva2UnLCAnIzAwMCcpO1xyXG4gICAgICAgIGV4dHJlbWl0eS5zZXQoJ3N0cm9rZScsICcjMDAwJyk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpc1tkaXJlY3Rpb25dICYmIGFuY2hvcnNbYV0gPT09IHRoaXNbZGlyZWN0aW9uXS5zaGFwZS5hbmNob3JzW3RoaXNbZGlyZWN0aW9uXS5hbmNob3JdKSB7XHJcbiAgICAgICAgLy8gSWYgdGhpcyBsaW5rIHdhcyBjb25uZWN0ZWQgZW5kIHRoaXMgYW5jaG9yIGFuZCBpdCBkb2Vzbid0IGludGVyc2VjdCBhbnltb3JlXHJcbiAgICAgICAgdGhpcy5kaXNjb25uZWN0TGluayhkaXJlY3Rpb24pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImNvbnN0IHsgZmFicmljIH0gPSB3aW5kb3c7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW5rYWJsZVNoYXBlIHtcclxuICAvKipcclxuICAgKiBBIExpbmthYmxlU2hhcGUgaXMgYW55IEZhYnJpYy5PYmplY3Qgc2hhcGUgb24gd2hpY2ggYW5jaG9ycyBhcmUgYXBwZW5kZWQgc28gdGhhdCBtdWx0aXBsZSBMaW5rIGNhbiBiZSBjb25uZWN0ZWQgdG8gaXQuXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIG9wdGlvbnNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7RmFicmljLkNhbnZhc30gICBvcHRpb25zLmNhbnZhcyAtIEZhYnJpYyBjYW52YXNcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgb3B0aW9ucy5pZCAtIFVuaXF1ZSBpZGVudGlmaWVyXHJcbiAgICpcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGlkLFxyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHNoYXBlLFxyXG4gICAgICBsZWZ0LFxyXG4gICAgICB0b3AsXHJcbiAgICAgIGFuZ2xlLFxyXG4gICAgfSA9IG9wdGlvbnM7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcblxyXG4gICAgLy8gU2V0IHNoYXBlXHJcbiAgICBzaGFwZS5zZXQoJ3R5cGUnLCAnbGlua2FibGVTaGFwZScpO1xyXG4gICAgc2hhcGUuc2V0KHtcclxuICAgICAgbGVmdCwgdG9wLCBpZCwgYW5nbGUsXHJcbiAgICB9KTtcclxuICAgIHRoaXMuc2hhcGUgPSBzaGFwZTtcclxuXHJcbiAgICAvLyBTaG93IGNvb3JkaW5hdGVzL2FuZ2xlIHdoZW4gbW92aW5nL3JvdGF0aW5nIG9iamVjdFxyXG4gICAgY29uc3QgbW9kaWZpY2F0aW9uQm94ID0gbmV3IGZhYnJpYy5SZWN0KHtcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICBzdHJva2U6ICcjNjY2JyxcclxuICAgICAgZmlsbDogJyNmZmYnLFxyXG4gICAgICB3aWR0aDogNzAsXHJcbiAgICAgIGhlaWdodDogMjAsXHJcbiAgICAgIHZlbnRlZDogZmFsc2UsXHJcbiAgICAgIHNlbGVjdGFibGU6IGZhbHNlLFxyXG4gICAgICBvcGFjaXR5OiAwLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBtb2RpZmljYXRpb25UZXh0ID0gbmV3IGZhYnJpYy5UZXh0KCcwLCAwJywge1xyXG4gICAgICBsZWZ0OiAwLFxyXG4gICAgICB0b3A6IDAsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgZm9udEZhbWlseTogJ0hlbHZldGljYScsXHJcbiAgICAgIGZvbnRTaXplOiAxMixcclxuICAgICAgYm9yZGVyU3Ryb2tlV2lkdGg6IDQsXHJcbiAgICAgIGV2ZW50ZWQ6IGZhbHNlLFxyXG4gICAgICBzZWxlY3RhYmxlOiBmYWxzZSxcclxuICAgICAgb3BhY2l0eTogMCxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgbW9kaWZpY2F0aW9uID0gdGhpcy5tb2RCb3ggPSBuZXcgZmFicmljLkdyb3VwKFttb2RpZmljYXRpb25Cb3gsIG1vZGlmaWNhdGlvblRleHRdLCB7XHJcbiAgICAgIGxlZnQ6IDAsXHJcbiAgICAgIHRvcDogMCxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICBldmVudGVkOiBmYWxzZSxcclxuICAgICAgc2VsZWN0YWJsZTogZmFsc2UsXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IG9uTW92aW5nID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCB7IHgsIHkgfSA9IHNoYXBlLmFDb29yZHMudGw7XHJcbiAgICAgIGNvbnN0IHhDb29yZHMgPSBbc2hhcGUuYUNvb3Jkcy50bC54LCBzaGFwZS5hQ29vcmRzLnRyLngsIHNoYXBlLmFDb29yZHMuYmwueCwgc2hhcGUuYUNvb3Jkcy5ici54XTtcclxuICAgICAgY29uc3QgeUNvb3JkcyA9IFtzaGFwZS5hQ29vcmRzLnRsLnksIHNoYXBlLmFDb29yZHMudHIueSwgc2hhcGUuYUNvb3Jkcy5ibC55LCBzaGFwZS5hQ29vcmRzLmJyLnldO1xyXG4gICAgICBtb2RpZmljYXRpb24ubGVmdCA9IChNYXRoLm1pbiguLi54Q29vcmRzKSArIE1hdGgubWF4KC4uLnhDb29yZHMpKSAvIDI7XHJcbiAgICAgIG1vZGlmaWNhdGlvbi50b3AgPSBNYXRoLnJvdW5kKE1hdGgubWF4KC4uLnlDb29yZHMpICsgMzApO1xyXG4gICAgICBtb2RpZmljYXRpb24uc2V0Q29vcmRzKCk7XHJcbiAgICAgIG1vZGlmaWNhdGlvbkJveC5zZXQoJ29wYWNpdHknLCAwLjcpO1xyXG4gICAgICBtb2RpZmljYXRpb25UZXh0LnNldCgnb3BhY2l0eScsIDEpO1xyXG4gICAgICBtb2RpZmljYXRpb25UZXh0LnNldCgndGV4dCcsIGAke01hdGgucm91bmQoeCl9LCAke01hdGgucm91bmQoeSl9YCk7XHJcbiAgICAgIGNhbnZhcy5icmluZ1RvRnJvbnQobW9kaWZpY2F0aW9uKTtcclxuICAgIH07XHJcbiAgICBjb25zdCBvbk1vdmVkID0gKCkgPT4ge1xyXG4gICAgICBtb2RpZmljYXRpb25Cb3guc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICAgIG1vZGlmaWNhdGlvblRleHQuc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb25Sb3RhdGluZyA9ICgpID0+IHtcclxuICAgICAgY29uc3QgeENvb3JkcyA9IFtzaGFwZS5hQ29vcmRzLnRsLngsIHNoYXBlLmFDb29yZHMudHIueCwgc2hhcGUuYUNvb3Jkcy5ibC54LCBzaGFwZS5hQ29vcmRzLmJyLnhdO1xyXG4gICAgICBjb25zdCB5Q29vcmRzID0gW3NoYXBlLmFDb29yZHMudGwueSwgc2hhcGUuYUNvb3Jkcy50ci55LCBzaGFwZS5hQ29vcmRzLmJsLnksIHNoYXBlLmFDb29yZHMuYnIueV07XHJcbiAgICAgIG1vZGlmaWNhdGlvbi5sZWZ0ID0gKE1hdGgubWluKC4uLnhDb29yZHMpICsgTWF0aC5tYXgoLi4ueENvb3JkcykpIC8gMjtcclxuICAgICAgbW9kaWZpY2F0aW9uLnRvcCA9IE1hdGgucm91bmQoTWF0aC5tYXgoLi4ueUNvb3JkcykgKyAzMCk7XHJcbiAgICAgIG1vZGlmaWNhdGlvbi5zZXRDb29yZHMoKTtcclxuICAgICAgbW9kaWZpY2F0aW9uQm94LnNldCgnb3BhY2l0eScsIDAuNyk7XHJcbiAgICAgIG1vZGlmaWNhdGlvblRleHQuc2V0KCdvcGFjaXR5JywgMSk7XHJcbiAgICAgIG1vZGlmaWNhdGlvblRleHQuc2V0KCd0ZXh0JywgYCR7TWF0aC5yb3VuZChzaGFwZS5hbmdsZSA+IDE4MCA/IHNoYXBlLmFuZ2xlIC0gMzYwIDogc2hhcGUuYW5nbGUpfcKwYCk7XHJcbiAgICAgIGNhbnZhcy5icmluZ1RvRnJvbnQobW9kaWZpY2F0aW9uKTtcclxuICAgIH07XHJcbiAgICBjb25zdCBvblJvdGF0ZWQgPSAoKSA9PiB7XHJcbiAgICAgIG1vZGlmaWNhdGlvbkJveC5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgICAgbW9kaWZpY2F0aW9uVGV4dC5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgIH07XHJcbiAgICBzaGFwZS5vbih7XHJcbiAgICAgIG1vdmluZzogb25Nb3ZpbmcsXHJcbiAgICAgIG1vdmVkOiBvbk1vdmVkLFxyXG4gICAgICByb3RhdGluZzogb25Sb3RhdGluZyxcclxuICAgICAgcm90YXRlZDogb25Sb3RhdGVkLFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQW5jaG9yIHBvaW50c1xyXG4gICAgdGhpcy5hbmNob3JzID0gdGhpcy5zaGFwZS5hbmNob3JzID0ge1xyXG4gICAgICBlYXN0OiB0aGlzLl9tYWtlQW5jaG9yUG9pbnQoJ2Vhc3QnKSxcclxuICAgICAgd2VzdDogdGhpcy5fbWFrZUFuY2hvclBvaW50KCd3ZXN0JyksXHJcbiAgICAgIC8vIG5vcnRoOiB0aGlzLl9tYWtlQW5jaG9yUG9pbnQoJ25vcnRoJyksXHJcbiAgICAgIC8vIHNvdXRoOiB0aGlzLl9tYWtlQW5jaG9yUG9pbnQoJ3NvdXRoJyksXHJcbiAgICAgIC8vIG5vcnRoZWFzdDogdGhpcy5fbWFrZUFuY2hvclBvaW50KCdub3J0aGVhc3QnKSxcclxuICAgICAgLy8gbm9ydGh3ZXN0OiB0aGlzLl9tYWtlQW5jaG9yUG9pbnQoJ25vcnRod2VzdCcpLFxyXG4gICAgICAvLyBzb3V0aGVhc3Q6IHRoaXMuX21ha2VBbmNob3JQb2ludCgnc291dGhlYXN0JyksXHJcbiAgICAgIC8vIHNvdXRod2VzdDogdGhpcy5fbWFrZUFuY2hvclBvaW50KCdzb3V0aHdlc3QnKSxcclxuICAgIH07XHJcblxyXG4gICAgLy8gRXZlbnRzIHJlbGF0ZWQgdG8gYW5jaG9yc1xyXG4gICAgc2hhcGUub24oe1xyXG4gICAgICBzZWxlY3RlZDogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudG9nZ2xlQW5jaG9yc09wYWNpdHkoMSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG1vdXNlb3ZlcjogKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNhbnZhcy5nZXRBY3RpdmVPYmplY3QoKSAhPT0gdGhpcy5zaGFwZSkge1xyXG4gICAgICAgICAgdGhpcy50b2dnbGVBbmNob3JzT3BhY2l0eSgxKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG1vdXNlb3V0OiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy50b2dnbGVBbmNob3JzT3BhY2l0eSgxKTtcclxuICAgICAgfSxcclxuICAgICAgbW9kaWZ5aW5nOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKGZhbHNlKTtcclxuICAgICAgfSxcclxuICAgICAgbW9kaWZpZWQ6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnJlZnJlc2hBbmNob3JzUG9zaXRpb24odHJ1ZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG1vdmluZzogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbihmYWxzZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG1vdmVkOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKHRydWUpO1xyXG4gICAgICB9LFxyXG4gICAgICByb3RhdGluZzogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbihmYWxzZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHJvdGF0ZWQ6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnJlZnJlc2hBbmNob3JzUG9zaXRpb24odHJ1ZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHNjYWxpbmc6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnJlZnJlc2hBbmNob3JzUG9zaXRpb24oZmFsc2UpO1xyXG4gICAgICB9LFxyXG4gICAgICBzY2FsZWQ6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnJlZnJlc2hBbmNob3JzUG9zaXRpb24odHJ1ZSk7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGluamVjdCgpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgaWQsXHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgc2hhcGUsXHJcbiAgICAgIGFuY2hvcnMsXHJcbiAgICAgIG1vZEJveCxcclxuICAgIH0gPSB0aGlzO1xyXG4gICAgY2FudmFzLmFkZChzaGFwZSk7XHJcbiAgICBjYW52YXMuYWRkKG1vZEJveCk7XHJcbiAgICBPYmplY3Qua2V5cyhhbmNob3JzKS5mb3JFYWNoKChjYXJkaW5hbCkgPT4ge1xyXG4gICAgICBjYW52YXMuYWRkKGFuY2hvcnNbY2FyZGluYWxdKTtcclxuICAgICAgY2FudmFzLmJyaW5nRm9yd2FyZChhbmNob3JzW2NhcmRpbmFsXSwgdHJ1ZSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbih0cnVlKTtcclxuXHJcbiAgICBjYW52YXMubGlua2FibGVTaGFwZXNbaWRdID0gdGhpcztcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHJlbW92ZSgpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgaWQsXHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgc2hhcGUsXHJcbiAgICAgIGFuY2hvcnMsXHJcbiAgICAgIG1vZEJveCxcclxuICAgIH0gPSB0aGlzO1xyXG4gICAgY2FudmFzLnJlbW92ZShzaGFwZSk7XHJcbiAgICBjYW52YXMucmVtb3ZlKG1vZEJveCk7XHJcbiAgICBPYmplY3Qua2V5cyhhbmNob3JzKS5mb3JFYWNoKChjYXJkaW5hbCkgPT4ge1xyXG4gICAgICBjYW52YXMucmVtb3ZlKGFuY2hvcnNbY2FyZGluYWxdKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlbGV0ZSBjYW52YXMubGlua2FibGVTaGFwZXNbaWRdO1xyXG4gIH1cclxuXHJcbiAgbW92ZShvcHRpb25zKSB7XHJcbiAgICBjb25zdCB7IGNhbnZhcywgc2hhcGUgfSA9IHRoaXM7XHJcblxyXG4gICAgLy8gTW92ZSB0aGUgc2hhcGUgYW5kIHVwZGF0ZSBjb29yZHMgYW5kIGFuY2hvcnNcclxuICAgIGxldCBsZWZ0ID0gb3B0aW9ucy54IHx8IHNoYXBlLmxlZnQ7XHJcbiAgICBsZXQgdG9wID0gb3B0aW9ucy55IHx8IHNoYXBlLnRvcDtcclxuICAgIHRoaXMuc2hhcGUuc2V0KCdsZWZ0JywgbGVmdCk7XHJcbiAgICB0aGlzLnNoYXBlLnNldCgndG9wJywgdG9wKTtcclxuICAgIHRoaXMuc2hhcGUuc2V0Q29vcmRzKCk7XHJcbiAgICB0aGlzLnJlZnJlc2hBbmNob3JzUG9zaXRpb24oKTtcclxuICAgIHRoaXMuc2hhcGUuZmlyZShvcHRpb25zLm1vdmluZyA/ICdtb3ZpbmcnIDogJ21vdmVkJyk7XHJcblxyXG4gICAgLy8gUHJldmVudCBMaW5rYWJsZVNoYXBlIHRvIG92ZXJsYXAgd2l0aCBlYWNoIG90aGVyXHJcbiAgICBjb25zdCBjbGVhcmFuY2UgPSAxMDtcclxuICAgIHNoYXBlLnNldENvb3JkcygpOyAvLyBTZXRzIGNvcm5lciBwb3NpdGlvbiBjb29yZGluYXRlcyBiYXNlZCBvbiBjdXJyZW50IGFuZ2xlLCB3aWR0aCBhbmQgaGVpZ2h0XHJcbiAgICBsZXQgaXNJbnRlcnNlY3RpbmcgPSBmYWxzZTtcclxuICAgIGlmICghb3B0aW9ucy5za2lwQ29sbGlzaW9uKSB7XHJcbiAgICAgIGNvbnN0IG90aGVyU2hhcGVzID0gT2JqZWN0LnZhbHVlcyhjYW52YXMubGlua2FibGVTaGFwZXMpO1xyXG4gICAgICBmb3IgKGxldCBvID0gMDsgbyA8IG90aGVyU2hhcGVzLmxlbmd0aDsgbyArPSAxKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZyA9IG90aGVyU2hhcGVzW29dLnNoYXBlO1xyXG5cclxuICAgICAgICBpZiAodGFyZyAhPT0gc2hhcGUpIHtcclxuICAgICAgICAgIGlmIChzaGFwZS5pbnRlcnNlY3RzV2l0aE9iamVjdCh0YXJnKSkge1xyXG4gICAgICAgICAgICBpc0ludGVyc2VjdGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHNCID0gc2hhcGUuYUNvb3Jkcy5ibC55O1xyXG4gICAgICAgICAgICBjb25zdCBzVCA9IHNoYXBlLmFDb29yZHMudGwueTtcclxuICAgICAgICAgICAgY29uc3Qgc1IgPSBzaGFwZS5hQ29vcmRzLnRyLng7XHJcbiAgICAgICAgICAgIGNvbnN0IHNMID0gc2hhcGUuYUNvb3Jkcy50bC54O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdEIgPSB0YXJnLmFDb29yZHMuYmwueTtcclxuICAgICAgICAgICAgY29uc3QgdFQgPSB0YXJnLmFDb29yZHMudGwueTtcclxuICAgICAgICAgICAgY29uc3QgdFIgPSB0YXJnLmFDb29yZHMudHIueDtcclxuICAgICAgICAgICAgY29uc3QgdEwgPSB0YXJnLmFDb29yZHMudGwueDtcclxuXHJcbiAgICAgICAgICAgIGlmIChzQiAtIHRUID4gY2xlYXJhbmNlKSB7XHJcbiAgICAgICAgICAgICAgdG9wID0gdFQgLSBzaGFwZS5oZWlnaHQgLSBjbGVhcmFuY2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc1QgLSB0QiA8IGNsZWFyYW5jZSkge1xyXG4gICAgICAgICAgICAgIHRvcCA9IHRCICsgY2xlYXJhbmNlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNSIC0gdEwgPiBjbGVhcmFuY2UpIHtcclxuICAgICAgICAgICAgICBsZWZ0ID0gdEwgLSBzaGFwZS53aWR0aCAtIGNsZWFyYW5jZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzTCAtIHRSIDwgY2xlYXJhbmNlKSB7XHJcbiAgICAgICAgICAgICAgbGVmdCA9IHRSICsgY2xlYXJhbmNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoaXNJbnRlcnNlY3RpbmcpIHtcclxuICAgICAgdGhpcy5tb3ZlKHtcclxuICAgICAgICB4OiBsZWZ0LFxyXG4gICAgICAgIHk6IHRvcCxcclxuICAgICAgICBtb3Zpbmc6IG9wdGlvbnMubW92aW5nLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJvdGF0ZShhbmdsZSkge1xyXG4gICAgdGhpcy5zaGFwZS5yb3RhdGUoYW5nbGUpO1xyXG4gICAgdGhpcy5zaGFwZS5zZXRDb29yZHMoKTtcclxuICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgcmVmcmVzaEFuY2hvcnNQb3NpdGlvbihjb21taXQpIHtcclxuICAgIE9iamVjdC5rZXlzKHRoaXMuYW5jaG9ycykuZm9yRWFjaCgoY2FyZGluYWwpID0+IHtcclxuICAgICAgdGhpcy5fc2V0QW5jaG9yUG9zaXRpb25SZWxhdGl2ZVRvUmVjdGFuZ2xlKGNhcmRpbmFsLCBjb21taXQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVBbmNob3JzT3BhY2l0eShvcGFjaXR5KSB7XHJcbiAgICBPYmplY3Qua2V5cyh0aGlzLmFuY2hvcnMpLmZvckVhY2goKGNhcmRpbmFsKSA9PiB7XHJcbiAgICAgIHRoaXMuYW5jaG9yc1tjYXJkaW5hbF0udG9nZ2xlT3BhY2l0eShvcGFjaXR5KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYnJpbmdUb0Zyb250KCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBjYW52YXMsIHNoYXBlLCBtb2RCb3gsIGFuY2hvcnMsXHJcbiAgICB9ID0gdGhpcztcclxuICAgIHNoYXBlLmJyaW5nVG9Gcm9udCgpO1xyXG4gICAgbW9kQm94LmJyaW5nVG9Gcm9udCgpO1xyXG4gICAgT2JqZWN0LmtleXMoYW5jaG9ycykuZm9yRWFjaCgoY2FyZGluYWwpID0+IHtcclxuICAgICAgY2FudmFzLmJyaW5nVG9Gcm9udChhbmNob3JzW2NhcmRpbmFsXSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIF9zZXRBbmNob3JQb3NpdGlvblJlbGF0aXZlVG9SZWN0YW5nbGUoY2FyZGluYWwsIGNvbW1pdCkge1xyXG4gICAgbGV0IGxlZnQ7XHJcbiAgICBsZXQgdG9wO1xyXG4gICAgY29uc3QgeyBzaGFwZSB9ID0gdGhpcztcclxuICAgIGNvbnN0IGFwID0gdGhpcy5hbmNob3JzW2NhcmRpbmFsXTtcclxuICAgIHN3aXRjaCAoY2FyZGluYWwpIHtcclxuICAgICAgY2FzZSAnZWFzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMudHIueCArIHNoYXBlLmFDb29yZHMuYnIueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLnRyLnkgKyBzaGFwZS5hQ29vcmRzLmJyLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICd3ZXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSAoc2hhcGUuYUNvb3Jkcy50bC54ICsgc2hhcGUuYUNvb3Jkcy5ibC54KSAvIDI7XHJcbiAgICAgICAgdG9wID0gKHNoYXBlLmFDb29yZHMudGwueSArIHNoYXBlLmFDb29yZHMuYmwueSkgLyAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRoJzoge1xyXG4gICAgICAgIGxlZnQgPSAoc2hhcGUuYUNvb3Jkcy50bC54ICsgc2hhcGUuYUNvb3Jkcy50ci54KSAvIDI7XHJcbiAgICAgICAgdG9wID0gKHNoYXBlLmFDb29yZHMudGwueSArIHNoYXBlLmFDb29yZHMudHIueSkgLyAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRoJzoge1xyXG4gICAgICAgIGxlZnQgPSAoc2hhcGUuYUNvb3Jkcy5ibC54ICsgc2hhcGUuYUNvb3Jkcy5ici54KSAvIDI7XHJcbiAgICAgICAgdG9wID0gKHNoYXBlLmFDb29yZHMuYmwueSArIHNoYXBlLmFDb29yZHMuYnIueSkgLyAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRoZWFzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gc2hhcGUuYUNvb3Jkcy50ci54O1xyXG4gICAgICAgIHRvcCA9IHNoYXBlLmFDb29yZHMudHIueTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aHdlc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IHNoYXBlLmFDb29yZHMudGwueDtcclxuICAgICAgICB0b3AgPSBzaGFwZS5hQ29vcmRzLnRsLnk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnc291dGhlYXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSBzaGFwZS5hQ29vcmRzLmJyLng7XHJcbiAgICAgICAgdG9wID0gc2hhcGUuYUNvb3Jkcy5ici55O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRod2VzdCc6XHJcbiAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICBsZWZ0ID0gc2hhcGUuYUNvb3Jkcy5ibC54O1xyXG4gICAgICAgIHRvcCA9IHNoYXBlLmFDb29yZHMuYmwueTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgYXAubGVmdCA9IGxlZnQ7XHJcbiAgICBhcC50b3AgPSB0b3A7XHJcbiAgICBhcC5zZXRDb29yZHMoKTtcclxuXHJcbiAgICBhcC5maXJlKGNvbW1pdCA/ICdwZzpwb3NpdGlvbjptb2RpZmllZCcgOiAncGc6cG9zaXRpb246bW9kaWZ5aW5nJyk7XHJcbiAgfVxyXG5cclxuICBfbWFrZUFuY2hvclBvaW50KGNhcmRpbmFsKSB7XHJcbiAgICBsZXQgbGVmdDtcclxuICAgIGxldCB0b3A7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHNoYXBlLFxyXG4gICAgICBpZCxcclxuICAgICAgY2FudmFzLFxyXG4gICAgfSA9IHRoaXM7XHJcbiAgICBzd2l0Y2ggKGNhcmRpbmFsKSB7XHJcbiAgICAgIGNhc2UgJ2Vhc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IChzaGFwZS5hQ29vcmRzLnRyLnggKyBzaGFwZS5hQ29vcmRzLmJyLngpIC8gMjtcclxuICAgICAgICB0b3AgPSAoc2hhcGUuYUNvb3Jkcy50ci55ICsgc2hhcGUuYUNvb3Jkcy5ici55KSAvIDI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnd2VzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMudGwueCArIHNoYXBlLmFDb29yZHMuYmwueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLnRsLnkgKyBzaGFwZS5hQ29vcmRzLmJsLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMudGwueCArIHNoYXBlLmFDb29yZHMudHIueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLnRsLnkgKyBzaGFwZS5hQ29vcmRzLnRyLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMuYmwueCArIHNoYXBlLmFDb29yZHMuYnIueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLmJsLnkgKyBzaGFwZS5hQ29vcmRzLmJyLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aGVhc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IHNoYXBlLmFDb29yZHMudHIueDtcclxuICAgICAgICB0b3AgPSBzaGFwZS5hQ29vcmRzLnRyLnk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnbm9ydGh3ZXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSBzaGFwZS5hQ29vcmRzLnRsLng7XHJcbiAgICAgICAgdG9wID0gc2hhcGUuYUNvb3Jkcy50bC55O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRoZWFzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gc2hhcGUuYUNvb3Jkcy5ici54O1xyXG4gICAgICAgIHRvcCA9IHNoYXBlLmFDb29yZHMuYnIueTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aHdlc3QnOlxyXG4gICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgbGVmdCA9IHNoYXBlLmFDb29yZHMuYmwueDtcclxuICAgICAgICB0b3AgPSBzaGFwZS5hQ29vcmRzLmJsLnk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBjb25zdCBhcCA9IG5ldyBmYWJyaWMuQ2lyY2xlKHtcclxuICAgIC8vICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAvLyAgIGxlZnQsXHJcbiAgICAvLyAgIHRvcCxcclxuICAgIC8vICAgc3Ryb2tlV2lkdGg6IDIsXHJcbiAgICAvLyAgIHJhZGl1czogNixcclxuICAgIC8vICAgZmlsbDogJyM3OGJlZmEnLCAvLyA0MmEyZGEgZDVlOGYyXHJcbiAgICAvLyAgIHN0cm9rZTogJyM3OGJlZmEnLFxyXG4gICAgLy8gICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgIC8vICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAvLyAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgLy8gICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAvLyAgIHNlbGVjdGFibGU6IGZhbHNlLFxyXG4gICAgLy8gICBvcGFjaXR5OiAwLFxyXG4gICAgLy8gICBpZDogYCR7aWR9XyR7Y2FyZGluYWx9YCxcclxuICAgIC8vIH0pO1xyXG4gICAgY29uc3QgYXAgPSBuZXcgZmFicmljLlJlY3Qoe1xyXG4gICAgICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgICAgd2lkdGg6IDEwLFxyXG4gICAgICBoZWlnaHQ6IDEwLFxyXG4gICAgICBsZWZ0LFxyXG4gICAgICB0b3AsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICBmaWxsOiAnI2RkZCcsXHJcbiAgICAgIHN0cm9rZTogJyM5OTknLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAgIHNlbGVjdGFibGU6IGZhbHNlLFxyXG4gICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICBpZDogYCR7aWR9XyR7Y2FyZGluYWx9YCxcclxuICAgIH0pO1xyXG4gICAgYXAudHlwZSA9ICdhbmNob3InO1xyXG4gICAgYXAuc2hhcGVJZCA9IGlkO1xyXG4gICAgYXAuY2FyZGluYWwgPSBjYXJkaW5hbDtcclxuICAgIGFwLm9uKCdtb3VzZW92ZXInLCAoKSA9PiB7XHJcbiAgICAgIGFwLnNldCgnZmlsbCcsICcjNzhiZWZhJyk7XHJcbiAgICAgIGFwLnNldCgnc3Ryb2tlJywgJyM3OGJlZmEnKTtcclxuICAgICAgY2FudmFzLnJlbmRlckFsbCgpO1xyXG4gICAgfSk7XHJcbiAgICBhcC5vbignbW91c2VvdXQnLCAoKSA9PiB7XHJcbiAgICAgIGFwLnNldCgnZmlsbCcsICcjZGRkJyk7XHJcbiAgICAgIGFwLnNldCgnc3Ryb2tlJywgJyM5OTknKTtcclxuICAgICAgY2FudmFzLnJlbmRlckFsbCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYXAub24oJ21vdXNlZG93bicsIChvcHRpb25zKSA9PiB7XHJcbiAgICAgIHN3aXRjaCAob3B0aW9ucy5idXR0b24pIHtcclxuICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICB0aGlzLl9vbkFuY2hvclJpZ2h0Q2xpY2suY2FsbCh0aGlzLCBvcHRpb25zKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgIHRoaXMuX29uQW5jaG9yTWlkZGxlQ2xpY2suY2FsbCh0aGlzLCBvcHRpb25zKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTpcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgdGhpcy5fb25BbmNob3JMZWZ0Q2xpY2suY2FsbCh0aGlzLCBvcHRpb25zKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBhcDtcclxuICB9XHJcblxyXG4gIC8vIFNob3VsZCBiZSBpbXBsZW1lbnRlZCBieSBFeHRlbmRpbmcgQ2xhc3Nlc1xyXG4gIC8qIGVzbGludC1kaXNhYmxlIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXMgKi9cclxuICBfb25BbmNob3JMZWZ0Q2xpY2soLyogb3B0aW9ucyAqLykge31cclxuXHJcbiAgX29uQW5jaG9yTWlkZGxlQ2xpY2soLyogb3B0aW9ucyAqLykge31cclxuXHJcbiAgX29uQW5jaG9yUmlnaHRDbGljaygvKiBvcHRpb25zICovKSB7fVxyXG5cclxuICAvKiBlc2xpbnQtZGlzYWJsZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzICovXHJcbn1cclxuIiwiY29uc3QgeyBmYWJyaWMgfSA9IHdpbmRvdztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2Nlc3NHcmFwaCB7XHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0gb3B0aW9uc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtDYW52YXN9IG9wdGlvbnMuY2FudmFzIC0gRmFicmljSlMuQ2FudmFzIGluc3RhbmNlIC0gbWFuZGF0b3J5IGlmIG9wdGlvbnMuY2FudmFzT3B0cyBub3QgcHJvdmlkZWQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5jYW52YXNPcHRzIC0gRmFicmljSlMuQ2FudmFzI2luaXRpYWxpemUgcGFyYW1ldGVycyAtIG1hbmRhdG9yeSBpZiBvcHRpb25zLmNhbnZhcyBub3QgcHJvdmlkZWRcclxuICAgKiAgICAgICAgICAgICAgICAgU2VlIGh0dHA6Ly9mYWJyaWNqcy5jb20vZG9jcy9mYWJyaWMuQ2FudmFzLmh0bWwjaW5pdGlhbGl6ZSBmb3IgZGV0YWlsc1xyXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8U3RyaW5nfSBvcHRpb25zLmNhbnZhcy5lbCAtIDxjYW52YXM+IGVsZW1lbnQgdG8gaW5pdGlhbGl6ZSBpbnN0YW5jZSBvblxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLmNhbnZhcy5vcHRpb25zIC0gT3B0aW9ucyBvYmplY3RcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5ncmlkXSAtIGRpbWVuc2lvbnMgb2YgdGhlIGdyaWRcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICB0aGlzLmhhbmRsZXJzID0ge1xyXG4gICAgICBncmlkOiB7fSxcclxuICAgIH07XHJcblxyXG4gICAgLy8gSW5pdGlhbGl6ZSBDYW52YXNcclxuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuY2FudmFzID0gb3B0aW9ucy5jYW52YXMgPyBvcHRpb25zLmNhbnZhcyA6IG5ldyBmYWJyaWMuQ2FudmFzKG9wdGlvbnMuY2FudmFzT3B0cy5lbCwgb3B0aW9ucy5jYW52YXNPcHRzLm9wdGlvbnMpO1xyXG4gICAgY2FudmFzLnNldCgncHJlc2VydmVPYmplY3RTdGFja2luZycsIHRydWUpO1xyXG4gICAgLy8gY2FudmFzLnNldCgncmVuZGVyT25BZGRSZW1vdmUnLCBmYWxzZSk7XHJcbiAgICBjYW52YXMuc2V0KCdmaXJlUmlnaHRDbGljaycsIHRydWUpO1xyXG4gICAgY2FudmFzLnNldCgnZmlyZU1pZGRsZUNsaWNrJywgdHJ1ZSk7XHJcbiAgICBjYW52YXMuc2V0KCdzdG9wQ29udGV4dE1lbnUnLCB0cnVlKTtcclxuICAgIGNhbnZhcy5saW5rYWJsZVNoYXBlcyA9IHt9O1xyXG4gICAgY2FudmFzLmxpbmtzID0ge307XHJcblxyXG4gICAgLy8gU2V0IGdyaWRcclxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5ncmlkID09PSAnbnVtYmVyJykge1xyXG4gICAgICB0aGlzLnNldEdyaWQoe1xyXG4gICAgICAgIGdyaWQ6IG9wdGlvbnMuZ3JpZCxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZmFicmljLk9iamVjdC5wcm90b3R5cGUub3JpZ2luWCA9IGZhYnJpYy5PYmplY3QucHJvdG90eXBlLm9yaWdpblkgPSAnY2VudGVyJztcclxuICAgIGZhYnJpYy5PYmplY3QucHJvdG90eXBlLnRvZ2dsZU9wYWNpdHkgPSBmdW5jdGlvbiB0b2dnbGVPcGFjaXR5KG9wYWNpdHkvKiAsIHRpbWVvdXQgKi8pIHtcclxuICAgICAgLy8gdGhpcy5hbmltYXRlKCdvcGFjaXR5Jywgb3BhY2l0eSwge1xyXG4gICAgICAvLyAgIGR1cmF0aW9uOiB0aW1lb3V0ICE9PSB1bmRlZmluZWQgPyB0aW1lb3V0IDogMzAwLFxyXG4gICAgICAvLyAgIG9uQ2hhbmdlOiB0aGlzLmNhbnZhcy5yZW5kZXJBbGwuYmluZCh0aGlzLmNhbnZhcyksXHJcbiAgICAgIC8vIH0pO1xyXG4gICAgICB0aGlzLnNldCgnb3BhY2l0eScsIG9wYWNpdHkpO1xyXG4gICAgICB0aGlzLmNhbnZhcy5yZW5kZXJBbGwoKTtcclxuICAgIH07XHJcblxyXG4gICAgY2FudmFzLmNhbGNPZmZzZXQoKTtcclxuXHJcbiAgICAvLyBQcmV2ZW50IG5vbiBMaW5rYWJsZVNoYXBlIG9iamVjdHMgdG8gYmUgZ3JvdXBlZCBkdXJpbmcgc2VsZWN0aW9uXHJcbiAgICBjb25zdCBvblNlbGVjdGlvbiA9ICgpID0+IHtcclxuICAgICAgY29uc3QgYWN0aXZlID0gY2FudmFzLmdldEFjdGl2ZU9iamVjdCgpO1xyXG4gICAgICAvLyBXaGVuIG11bHRpIHNlbGVjdGlvbiwgcmVtb3ZlIGFueSBub24gTGlua2FibGUgU2hhcGUgb2JqZWN0c1xyXG4gICAgICBpZiAoYWN0aXZlLnR5cGUgPT09ICdhY3RpdmVTZWxlY3Rpb24nKSB7XHJcbiAgICAgICAgY29uc3Qgb2JqZWN0cyA9IGFjdGl2ZS5nZXRPYmplY3RzKCk7XHJcbiAgICAgICAgaWYgKG9iamVjdHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgY29uc3Qgb25seVJlY3QgPSBvYmplY3RzLmZpbHRlcigobykgPT4gby50eXBlID09PSAnbGlua2FibGVTaGFwZScpO1xyXG4gICAgICAgICAgY2FudmFzLl9kaXNjYXJkQWN0aXZlT2JqZWN0KCk7XHJcbiAgICAgICAgICBjb25zdCBzZWwgPSBuZXcgZmFicmljLkFjdGl2ZVNlbGVjdGlvbihvbmx5UmVjdCwge1xyXG4gICAgICAgICAgICBjYW52YXMsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGNhbnZhcy5fc2V0QWN0aXZlT2JqZWN0KHNlbCk7XHJcblxyXG4gICAgICAgICAgLy8gVXBkYXRlIGFueSBsaW5rcyBjb25uZWN0ZWQgdG8gdGhlIExpbmthYmxlIFNoYXBlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNhbnZhcy5vbih7XHJcbiAgICAgICdzZWxlY3Rpb246Y3JlYXRlZCc6IG9uU2VsZWN0aW9uLFxyXG4gICAgICAnc2VsZWN0aW9uOnVwZGF0ZWQnOiBvblNlbGVjdGlvbixcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IGNhbnZhcyB0byBoYXZlIGEgZ3JpZC5cclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLmdyaWQgLSBncmlkIHNwYWNpbmcgKHBpeGVscylcclxuICAgKi9cclxuICBzZXRHcmlkKG9wdGlvbnMpIHtcclxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5ncmlkICE9PSAnbnVtYmVyJyB8fCBvcHRpb25zLmdyaWQgPCAwKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudCBcImdyaWRcIiBpbiBQcm9jZXNzR3JhcCNzZXRHcmlkLiAocmVxdWlyZWQ6IE51bWJlciA+IDApJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5ncmlkID0gb3B0aW9ucy5ncmlkO1xyXG4gICAgY29uc3QgeyBjYW52YXMgfSA9IHRoaXM7XHJcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1tdWx0aS1zdHIgKi9cclxuICAgIGNvbnN0IGRhdGEgPSBgPHN2ZyB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPiBcXFxyXG4gICAgICAgIDxkZWZzPiBcXFxyXG4gICAgICAgICAgICA8cGF0dGVybiBpZD1cInNtYWxsR3JpZFwiIHdpZHRoPVwiJHt0aGlzLmdyaWR9XCIgaGVpZ2h0PVwiJHt0aGlzLmdyaWR9XCIgcGF0dGVyblVuaXRzPVwidXNlclNwYWNlT25Vc2VcIj4gXFxcclxuICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNICR7dGhpcy5ncmlkfSAwIEwgMCAwIDAgJHt0aGlzLmdyaWR9XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJncmF5XCIgc3Ryb2tlLXdpZHRoPVwiMC41XCIgLz4gXFxcclxuICAgICAgICAgICAgPC9wYXR0ZXJuPiBcXFxyXG4gICAgICAgICAgICA8cGF0dGVybiBpZD1cImdyaWRcIiB3aWR0aD1cIiR7dGhpcy5ncmlkICogNX1cIiBoZWlnaHQ9XCIke3RoaXMuZ3JpZCAqIDV9XCIgcGF0dGVyblVuaXRzPVwidXNlclNwYWNlT25Vc2VcIj4gXFxcclxuICAgICAgICAgICAgICAgIDxyZWN0IHdpZHRoPVwiJHt0aGlzLmdyaWQgKiA1fVwiIGhlaWdodD1cIiR7dGhpcy5ncmlkICogNX1cIiBmaWxsPVwidXJsKCNzbWFsbEdyaWQpXCIgLz4gXFxcclxuICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNICR7dGhpcy5ncmlkICogNX0gMCBMIDAgMCAwICR7dGhpcy5ncmlkICogNX1cIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImdyYXlcIiBzdHJva2Utd2lkdGg9XCIxXCIgLz4gXFxcclxuICAgICAgICAgICAgPC9wYXR0ZXJuPiBcXFxyXG4gICAgICAgIDwvZGVmcz4gXFxcclxuICAgICAgICA8cmVjdCB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgZmlsbD1cInVybCgjZ3JpZClcIiAvPiBcXFxyXG4gICAgPC9zdmc+YDtcclxuICAgIC8qIGVzbGludC1lbmFibGUgbm8tbXVsdGktc3RyICovXHJcblxyXG4gICAgY29uc3QgRE9NVVJMID0gd2luZG93LlVSTCB8fCB3aW5kb3cud2Via2l0VVJMIHx8IHdpbmRvdztcclxuICAgIGNvbnN0IHN2ZyA9IG5ldyBCbG9iKFtkYXRhXSwgeyB0eXBlOiAnaW1hZ2Uvc3ZnK3htbDtjaGFyc2V0PXV0Zi04JyB9KTtcclxuICAgIGNvbnN0IHVybCA9IERPTVVSTC5jcmVhdGVPYmplY3RVUkwoc3ZnKTtcclxuICAgIGZhYnJpYy51dGlsLmxvYWRJbWFnZSh1cmwsIChpbWcpID0+IHtcclxuICAgICAgY29uc3QgYmcgPSBuZXcgZmFicmljLlJlY3Qoe1xyXG4gICAgICAgIHdpZHRoOiBjYW52YXMud2lkdGgsIGhlaWdodDogY2FudmFzLmhlaWdodCwgZXZlbnRlZDogZmFsc2UsIHNlbGVjdGFibGU6IGZhbHNlLFxyXG4gICAgICB9KTtcclxuICAgICAgYmcuZmlsbCA9IG5ldyBmYWJyaWMuUGF0dGVybih7IHNvdXJjZTogaW1nIH0sXHJcbiAgICAgICAgKCgpID0+IHsgYmcuZGlydHkgPSB0cnVlOyBjYW52YXMucmVxdWVzdFJlbmRlckFsbCgpOyB9KSk7XHJcbiAgICAgIGJnLmNhbnZhcyA9IGNhbnZhcztcclxuICAgICAgY2FudmFzLnNldCgnYmFja2dyb3VuZEltYWdlJywgYmcpO1xyXG5cclxuICAgICAgLy8gU25hcCB0byBncmlkIGVmZmVjdHNcclxuICAgICAgY2FudmFzLm9mZih0aGlzLmhhbmRsZXJzLmdyaWQpO1xyXG4gICAgICB0aGlzLmhhbmRsZXJzLmdyaWQgPSB7XHJcbiAgICAgICAgJ29iamVjdDptb3ZpbmcnOiAoZXZlbnQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHsgZ3JpZCB9ID0gdGhpcztcclxuICAgICAgICAgIGNvbnN0IHNoYXBlID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgICAgaWYgKHNoYXBlLnR5cGUgIT09ICdsaW5rYWJsZVNoYXBlJykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY2FudmFzLmxpbmthYmxlU2hhcGVzW3NoYXBlLmlkXS5tb3ZlKHtcclxuICAgICAgICAgICAgeDogTWF0aC5yb3VuZChzaGFwZS5sZWZ0IC8gZ3JpZCkgKiBncmlkLFxyXG4gICAgICAgICAgICB5OiBNYXRoLnJvdW5kKHNoYXBlLnRvcCAvIGdyaWQpICogZ3JpZCxcclxuICAgICAgICAgICAgbW92aW5nOiB0cnVlLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAnb2JqZWN0OnNjYWxpbmcnOiAoZXZlbnQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHsgZ3JpZCB9ID0gdGhpcztcclxuICAgICAgICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBldmVudDtcclxuXHJcbiAgICAgICAgICBpZiAodGFyZ2V0LnR5cGUgIT09ICdsaW5rYWJsZVNoYXBlJykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc3QgdyA9IHRhcmdldC53aWR0aCAqIHRhcmdldC5zY2FsZVg7XHJcbiAgICAgICAgICBjb25zdCBoID0gdGFyZ2V0LmhlaWdodCAqIHRhcmdldC5zY2FsZVk7XHJcbiAgICAgICAgICBjb25zdCBzbmFwID0geyAvLyBDbG9zZXN0IHNuYXBwaW5nIHBvaW50c1xyXG4gICAgICAgICAgICB0b3A6IE1hdGgucm91bmQodGFyZ2V0LnRvcCAvIGdyaWQpICogZ3JpZCxcclxuICAgICAgICAgICAgbGVmdDogTWF0aC5yb3VuZCh0YXJnZXQubGVmdCAvIGdyaWQpICogZ3JpZCxcclxuICAgICAgICAgICAgYm90dG9tOiBNYXRoLnJvdW5kKCh0YXJnZXQudG9wICsgaCkgLyBncmlkKSAqIGdyaWQsXHJcbiAgICAgICAgICAgIHJpZ2h0OiBNYXRoLnJvdW5kKCh0YXJnZXQubGVmdCArIHcpIC8gZ3JpZCkgKiBncmlkLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIGNvbnN0IHRocmVzaG9sZCA9IGdyaWQ7XHJcbiAgICAgICAgICBjb25zdCBkaXN0ID0geyAvLyBEaXN0YW5jZSBmcm9tIHNuYXBwaW5nIHBvaW50c1xyXG4gICAgICAgICAgICB0b3A6IE1hdGguYWJzKHNuYXAudG9wIC0gdGFyZ2V0LnRvcCksXHJcbiAgICAgICAgICAgIGxlZnQ6IE1hdGguYWJzKHNuYXAubGVmdCAtIHRhcmdldC5sZWZ0KSxcclxuICAgICAgICAgICAgYm90dG9tOiBNYXRoLmFicyhzbmFwLmJvdHRvbSAtIHRhcmdldC50b3AgLSBoKSxcclxuICAgICAgICAgICAgcmlnaHQ6IE1hdGguYWJzKHNuYXAucmlnaHQgLSB0YXJnZXQubGVmdCAtIHcpLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIGNvbnN0IGF0dHJzID0ge1xyXG4gICAgICAgICAgICBzY2FsZVg6IHRhcmdldC5zY2FsZVgsXHJcbiAgICAgICAgICAgIHNjYWxlWTogdGFyZ2V0LnNjYWxlWSxcclxuICAgICAgICAgICAgdG9wOiB0YXJnZXQudG9wLFxyXG4gICAgICAgICAgICBsZWZ0OiB0YXJnZXQubGVmdCxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBzd2l0Y2ggKHRhcmdldC5fX2Nvcm5lcikge1xyXG4gICAgICAgICAgICBjYXNlICd0bCc6XHJcbiAgICAgICAgICAgICAgaWYgKGRpc3QubGVmdCA8IGRpc3QudG9wICYmIGRpc3QubGVmdCA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVYID0gKHcgLSAoc25hcC5sZWZ0IC0gdGFyZ2V0LmxlZnQpKSAvIHRhcmdldC53aWR0aDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWSA9IChhdHRycy5zY2FsZVggLyB0YXJnZXQuc2NhbGVYKSAqIHRhcmdldC5zY2FsZVk7XHJcbiAgICAgICAgICAgICAgICBhdHRycy50b3AgPSB0YXJnZXQudG9wICsgKGggLSB0YXJnZXQuaGVpZ2h0ICogYXR0cnMuc2NhbGVZKTtcclxuICAgICAgICAgICAgICAgIGF0dHJzLmxlZnQgPSBzbmFwLmxlZnQ7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChkaXN0LnRvcCA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVZID0gKGggLSAoc25hcC50b3AgLSB0YXJnZXQudG9wKSkgLyB0YXJnZXQuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVYID0gKGF0dHJzLnNjYWxlWSAvIHRhcmdldC5zY2FsZVkpICogdGFyZ2V0LnNjYWxlWDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLmxlZnQgKz0gKHcgLSB0YXJnZXQud2lkdGggKiBhdHRycy5zY2FsZVgpO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMudG9wID0gc25hcC50b3A7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtdCc6XHJcbiAgICAgICAgICAgICAgaWYgKGRpc3QudG9wIDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoaCAtIChzbmFwLnRvcCAtIHRhcmdldC50b3ApKSAvIHRhcmdldC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBhdHRycy50b3AgPSBzbmFwLnRvcDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RyJzpcclxuICAgICAgICAgICAgICBpZiAoZGlzdC5yaWdodCA8IGRpc3QudG9wICYmIGRpc3QucmlnaHQgPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWCA9IChzbmFwLnJpZ2h0IC0gdGFyZ2V0LmxlZnQpIC8gdGFyZ2V0LndpZHRoO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVZID0gKGF0dHJzLnNjYWxlWCAvIHRhcmdldC5zY2FsZVgpICogdGFyZ2V0LnNjYWxlWTtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnRvcCA9IHRhcmdldC50b3AgKyAoaCAtIHRhcmdldC5oZWlnaHQgKiBhdHRycy5zY2FsZVkpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlzdC50b3AgPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWSA9IChoIC0gKHNuYXAudG9wIC0gdGFyZ2V0LnRvcCkpIC8gdGFyZ2V0LmhlaWdodDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWCA9IChhdHRycy5zY2FsZVkgLyB0YXJnZXQuc2NhbGVZKSAqIHRhcmdldC5zY2FsZVg7XHJcbiAgICAgICAgICAgICAgICBhdHRycy50b3AgPSBzbmFwLnRvcDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ21sJzpcclxuICAgICAgICAgICAgICBpZiAoZGlzdC5sZWZ0IDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVggPSAodyAtIChzbmFwLmxlZnQgLSB0YXJnZXQubGVmdCkpIC8gdGFyZ2V0LndpZHRoO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMubGVmdCA9IHNuYXAubGVmdDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ21yJzpcclxuICAgICAgICAgICAgICBpZiAoZGlzdC5yaWdodCA8IHRocmVzaG9sZCkgYXR0cnMuc2NhbGVYID0gKHNuYXAucmlnaHQgLSB0YXJnZXQubGVmdCkgLyB0YXJnZXQud2lkdGg7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsJzpcclxuICAgICAgICAgICAgICBpZiAoZGlzdC5sZWZ0IDwgZGlzdC5ib3R0b20gJiYgZGlzdC5sZWZ0IDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVggPSAodyAtIChzbmFwLmxlZnQgLSB0YXJnZXQubGVmdCkpIC8gdGFyZ2V0LndpZHRoO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVZID0gKGF0dHJzLnNjYWxlWCAvIHRhcmdldC5zY2FsZVgpICogdGFyZ2V0LnNjYWxlWTtcclxuICAgICAgICAgICAgICAgIGF0dHJzLmxlZnQgPSBzbmFwLmxlZnQ7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChkaXN0LmJvdHRvbSA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVZID0gKHNuYXAuYm90dG9tIC0gdGFyZ2V0LnRvcCkgLyB0YXJnZXQuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVYID0gKGF0dHJzLnNjYWxlWSAvIHRhcmdldC5zY2FsZVkpICogdGFyZ2V0LnNjYWxlWDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLmxlZnQgKz0gKHcgLSB0YXJnZXQud2lkdGggKiBhdHRycy5zY2FsZVgpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbWInOlxyXG4gICAgICAgICAgICAgIGlmIChkaXN0LmJvdHRvbSA8IHRocmVzaG9sZCkgYXR0cnMuc2NhbGVZID0gKHNuYXAuYm90dG9tIC0gdGFyZ2V0LnRvcCkgLyB0YXJnZXQuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdicic6XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgaWYgKGRpc3QucmlnaHQgPCBkaXN0LmJvdHRvbSAmJiBkaXN0LnJpZ2h0IDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVggPSAoc25hcC5yaWdodCAtIHRhcmdldC5sZWZ0KSAvIHRhcmdldC53aWR0aDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWSA9IChhdHRycy5zY2FsZVggLyB0YXJnZXQuc2NhbGVYKSAqIHRhcmdldC5zY2FsZVk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChkaXN0LmJvdHRvbSA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVZID0gKHNuYXAuYm90dG9tIC0gdGFyZ2V0LnRvcCkgLyB0YXJnZXQuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVYID0gKGF0dHJzLnNjYWxlWSAvIHRhcmdldC5zY2FsZVkpICogdGFyZ2V0LnNjYWxlWDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0YXJnZXQuc2V0KGF0dHJzKTtcclxuICAgICAgICAgIHRhcmdldC5zZXRDb29yZHMoKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9O1xyXG4gICAgICBpZiAodGhpcy5ncmlkID4gMCkge1xyXG4gICAgICAgIGNhbnZhcy5vbih0aGlzLmhhbmRsZXJzLmdyaWQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19
