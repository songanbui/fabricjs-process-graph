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
                    fill: '#000',
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
                    fill: '#000',
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
                  fill: '#000',
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
    key: "setActive",
    value: function setActive(active) {
      if (active) {
        this.shapes.rect.set('stroke', '#78befa');
        this.shapes.text.set('fill', '#78befa');
      } else {
        this.shapes.rect.set('stroke', '#666');
        this.shapes.text.set('fill', '#000');
      }
    }
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
    value: function move(options, iter) {
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

      var iteration = iter || 0;

      if (isIntersecting && iteration < 100) {
        // eslint-disable-next-line no-param-reassign
        iteration += 1;
        this.move({
          x: left,
          y: top,
          moving: options.moving
        }, iteration);
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

var _ExpandableContainer = _interopRequireDefault(require("./ExpandableContainer.js"));

var _CurvedLink = _interopRequireDefault(require("./CurvedLink.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _window = window,
    fabric = _window.fabric,
    _ = _window._;

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
    };
    this.tempDraggedObject = null;
    this.selectedChooserType = null; // Initialize Canvas

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
      'selection:updated': onSelection,
      dragenter: this.onDragEnter.bind(this),
      dragover: this.onDragOver.bind(this),
      dragleave: this.onDragLeave.bind(this),
      drop: this.onDrop.bind(this)
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
    /**
     *
     * @param {Object} objects
     * @param {Array} objects.containers
     * @param {Array} objects.links
     * @returns {Promise<void>}
     */

  }, {
    key: "load",
    value: function () {
      var _load = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(objects) {
        var canvas, c, opts, l, _opts;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                canvas = this.canvas; // Containers

                c = 0;

              case 2:
                if (!(c < objects.containers.length)) {
                  _context.next = 10;
                  break;
                }

                opts = _.cloneDeep(objects.containers[c]);
                opts.canvas = canvas; // eslint-disable-next-line no-await-in-loop

                _context.next = 7;
                return this.addContainer(opts);

              case 7:
                c += 1;
                _context.next = 2;
                break;

              case 10:
                l = 0;

              case 11:
                if (!(l < objects.links.length)) {
                  _context.next = 19;
                  break;
                }

                _opts = _.cloneDeep(objects.links[l]);
                _opts.canvas = canvas; // eslint-disable-next-line no-await-in-loop

                _context.next = 16;
                return this.addLink(_opts);

              case 16:
                l += 1;
                _context.next = 11;
                break;

              case 19:
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
    key: "addContainer",
    value: function () {
      var _addContainer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(options) {
        var canvas, containerOpts, container;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                canvas = this.canvas;
                containerOpts = {
                  id: options.id,
                  canvas: canvas,
                  left: options.left || 0,
                  top: options.top || 0,
                  angle: 0,
                  label: options.label,
                  img: {
                    src: options.img.src
                  },
                  childWidth: 72,
                  childHeight: 42,
                  children: Array.isArray(options.children) ? options.children : []
                };
                container = new _ExpandableContainer["default"](containerOpts); // eslint-disable-next-line no-await-in-loop

                _context2.next = 5;
                return container.load();

              case 5:
                container.collapse();
                container.inject();

                if (options.isTemporary) {
                  container.shape.set('opacity', 0.5);
                }

                if (options.x && options.y) {
                  container.move({
                    x: options.x,
                    y: options.y,
                    moving: false
                  });
                }

                canvas.linkableShapes[options.id] = container;
                return _context2.abrupt("return", container);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addContainer(_x2) {
        return _addContainer.apply(this, arguments);
      }

      return addContainer;
    }()
  }, {
    key: "removeContainer",
    value: function removeContainer(options) {
      var canvas = this.canvas;

      if (options.id in canvas.linkableShapes) {
        canvas.linkableShapes[options.id].remove();
      }
    }
  }, {
    key: "addLink",
    value: function () {
      var _addLink = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(options) {
        var canvas, linkOpts, link;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                canvas = this.canvas;
                linkOpts = {
                  id: options.id,
                  canvas: canvas,
                  start: {
                    x: options.start.x || 0,
                    y: options.start.y || 0
                  },
                  end: {
                    x: options.end.x || 0,
                    y: options.end.y || 0
                  }
                };
                link = new _CurvedLink["default"](linkOpts);
                link.inject(canvas);

                if (!options.isTemporary) {
                  link.arrowHead.fire('moved');
                  link.arrowTail.fire('moved');

                  if (options.start && options.start.id && options.start.cardinal) {
                    link.connectLink('start', options.start.id, options.start.cardinal);
                  }

                  if (options.end && options.end.id && options.end.cardinal) {
                    link.connectLink('end', options.end.id, options.end.cardinal);
                  }
                }

                canvas.links[options.id] = link;
                return _context3.abrupt("return", link);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function addLink(_x3) {
        return _addLink.apply(this, arguments);
      }

      return addLink;
    }()
  }, {
    key: "removeLink",
    value: function removeLink(options) {
      var canvas = this.canvas;

      if (options.id in canvas.links) {
        canvas.links[options.id].remove();
      }
    }
  }, {
    key: "expand",
    value: function expand(id) {
      var canvas = this.canvas;

      if (id in canvas.linkableShapes) {
        canvas.linkableShapes[id].expand();
      }
    }
  }, {
    key: "collapse",
    value: function collapse(id) {
      var canvas = this.canvas;

      if (id in canvas.linkableShapes) {
        canvas.linkableShapes[id].collapse();
      }
    }
  }, {
    key: "setSelectedChooserType",
    value: function setSelectedChooserType(type) {
      this.selectedChooserType = type;
    }
  }, {
    key: "onDragEnter",
    value: function () {
      var _onDragEnter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(event) {
        var canvasAbsolutePosition, x, y, type;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                // The iframe in which this canvas is injected is messing up the mouse x,y coordinates.
                canvasAbsolutePosition = this.canvas.upperCanvasEl.getBoundingClientRect();
                x = event.e.x - canvasAbsolutePosition.left;
                y = event.e.y - canvasAbsolutePosition.top;
                type = this.selectedChooserType.id;
                _context4.t0 = type;
                _context4.next = _context4.t0 === 'link' ? 7 : _context4.t0 === 'container' ? 11 : 11;
                break;

              case 7:
                _context4.next = 9;
                return this.addLink({
                  id: "".concat(Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)),
                  x: x,
                  y: y
                });

              case 9:
                this.tempDraggedObject = _context4.sent;
                return _context4.abrupt("break", 15);

              case 11:
                _context4.next = 13;
                return this.addContainer({
                  id: "".concat(Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)),
                  label: this.selectedChooserType.label,
                  img: {
                    src: this.selectedChooserType.icon
                  },
                  x: 0,
                  y: 0,
                  isTemporary: true
                });

              case 13:
                this.tempDraggedObject = _context4.sent;
                return _context4.abrupt("break", 15);

              case 15:
                event.e.preventDefault();

              case 16:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function onDragEnter(_x4) {
        return _onDragEnter.apply(this, arguments);
      }

      return onDragEnter;
    }()
  }, {
    key: "onDragOver",
    value: function () {
      var _onDragOver = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(event) {
        var canvas, canvasAbsolutePosition, x, y, type, grid, ids, c, container, cX, cY;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                canvas = this.canvas; // The immersiveFrame in which this PG is injected is messing up the mouse x,y coordinates.

                canvasAbsolutePosition = this.canvas.upperCanvasEl.getBoundingClientRect();
                x = event.e.x - canvasAbsolutePosition.left;
                y = event.e.y - canvasAbsolutePosition.top;

                if (!(this.tempDraggedObject !== null)) {
                  _context5.next = 15;
                  break;
                }

                type = this.selectedChooserType.id;
                _context5.t0 = type;
                _context5.next = _context5.t0 === 'link' ? 9 : _context5.t0 === 'container' ? 13 : 13;
                break;

              case 9:
                this.tempDraggedObject.updatePath({
                  start: {
                    x: x - 50,
                    y: y
                  },
                  end: {
                    x: x + 50,
                    y: y
                  },
                  commit: false
                });
                this.tempDraggedObject.arrowHead.fire('moving');
                this.tempDraggedObject.arrowTail.fire('moving');
                return _context5.abrupt("break", 15);

              case 13:
                if (this.tempDraggedObject.isLoaded) {
                  x -= this.tempDraggedObject.shape.width / 2;
                  y -= this.tempDraggedObject.shape.height / 2; // Grid effects

                  if (this.grid) {
                    grid = this.grid;
                    x = Math.round(x / grid) * grid;
                    y = Math.round(y / grid) * grid;
                  } // Move object


                  this.tempDraggedObject.move({
                    x: x,
                    y: y,
                    moving: true,
                    skipCollision: true
                  }); // Detect intersection with Links
                  // Detect intersection with Containers

                  ids = Object.keys(canvas.linkableShapes);

                  for (c = 0; c < ids.length; c += 1) {
                    container = canvas.linkableShapes[ids[c]];

                    if (container.id !== this.tempDraggedObject.id) {
                      cX = this.tempDraggedObject.shape.left + this.tempDraggedObject.shape.width / 2;
                      cY = this.tempDraggedObject.shape.top;

                      if (container.shape.intersectsWithRect(new fabric.Point(cX - 5, cY), new fabric.Point(cX + 5, cY + 10))) {
                        container.setActive(true);
                      } else {
                        container.setActive(false);
                      }
                    }
                  }
                }

                return _context5.abrupt("break", 15);

              case 15:
                event.e.preventDefault();

              case 16:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function onDragOver(_x5) {
        return _onDragOver.apply(this, arguments);
      }

      return onDragOver;
    }()
  }, {
    key: "onDragLeave",
    value: function () {
      var _onDragLeave = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(event) {
        var type;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(this.tempDraggedObject !== null)) {
                  _context6.next = 10;
                  break;
                }

                type = this.selectedChooserType.id;
                _context6.t0 = type;
                _context6.next = _context6.t0 === 'link' ? 5 : _context6.t0 === 'container' ? 8 : 8;
                break;

              case 5:
                this.removeLink({
                  id: this.tempDraggedObject.id
                });
                this.tempDraggedObject = null;
                return _context6.abrupt("break", 10);

              case 8:
                if (this.tempDraggedObject.isLoaded) {
                  this.removeContainer({
                    id: this.tempDraggedObject.id
                  });
                  this.tempDraggedObject = null;
                }

                return _context6.abrupt("break", 10);

              case 10:
                event.e.preventDefault();

              case 11:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function onDragLeave(_x6) {
        return _onDragLeave.apply(this, arguments);
      }

      return onDragLeave;
    }()
  }, {
    key: "onDrop",
    value: function () {
      var _onDrop = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(event) {
        var canvas, canvasAbsolutePosition, x, y, type, ids, c, container, opts, newContainer, grid;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                canvas = this.canvas; // The immersiveFrame in which this PG is injected is messing up the mouse x,y coordinates.

                canvasAbsolutePosition = this.canvas.upperCanvasEl.getBoundingClientRect();
                x = event.e.x - canvasAbsolutePosition.left;
                y = event.e.y - canvasAbsolutePosition.top;
                type = this.selectedChooserType.id;
                _context7.t0 = type;
                _context7.next = _context7.t0 === 'link' ? 8 : _context7.t0 === 'container' ? 12 : 12;
                break;

              case 8:
                // Remove ghost object
                if (this.tempDraggedObject !== null) {
                  this.removeLink({
                    id: this.tempDraggedObject.id
                  });
                  this.tempDraggedObject = null;
                } // Instantiate new object


                _context7.next = 11;
                return this.addLink({
                  id: "".concat(Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)),
                  x: x,
                  y: y,
                  isTemporary: false
                });

              case 11:
                return _context7.abrupt("break", 25);

              case 12:
                // Detect intersection with Containers
                ids = Object.keys(canvas.linkableShapes);

                for (c = 0; c < ids.length; c += 1) {
                  container = canvas.linkableShapes[ids[c]];

                  if (container.id !== this.tempDraggedObject.id) {
                    container.setActive(false);

                    if (container.shape.intersectsWithObject(this.tempDraggedObject.shape)) {
                      console.log('add as children');
                    }
                  }
                } // Remove ghost object


                if (this.tempDraggedObject !== null) {
                  this.removeContainer({
                    id: this.tempDraggedObject.id
                  });
                  this.tempDraggedObject = null;
                } // Instantiate new object


                opts = {
                  id: "".concat(Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)),
                  label: this.selectedChooserType.label,
                  img: {
                    src: this.selectedChooserType.icon
                  },
                  x: x,
                  y: y,
                  isTemporary: false
                };
                _context7.next = 18;
                return this.addContainer(opts);

              case 18:
                newContainer = _context7.sent;
                // Calculate new position
                x -= newContainer.shape.width / 2;
                y -= newContainer.shape.height / 2; // Grid effects

                if (this.grid) {
                  grid = this.grid;
                  x = Math.round(x / grid) * grid;
                  y = Math.round(y / grid) * grid;
                } // Move object under the mouse cursor


                newContainer.move({
                  x: x,
                  y: y,
                  moving: true
                });
                newContainer.move({
                  // for handling collisions
                  moving: false
                });
                return _context7.abrupt("break", 25);

              case 25:
                event.e.preventDefault();

              case 26:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function onDrop(_x7) {
        return _onDrop.apply(this, arguments);
      }

      return onDrop;
    }()
  }]);

  return ProcessGraph;
}();

exports["default"] = ProcessGraph;

},{"./CurvedLink.js":3,"./ExpandableContainer.js":4}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsInNyYy9Db250YWluZXIuanMiLCJzcmMvQ3VydmVkTGluay5qcyIsInNyYy9FeHBhbmRhYmxlQ29udGFpbmVyLmpzIiwic3JjL0xpbmsuanMiLCJzcmMvTGlua2FibGVTaGFwZS5qcyIsInNyYy9Qcm9jZXNzR3JhcGguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0VBOztBQUVBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7O0FBVEE7QUFXQSxNQUFNLENBQUMsRUFBUCxHQUFZO0FBQ1YsRUFBQSxZQUFZLEVBQVosd0JBRFU7QUFFVixFQUFBLGFBQWEsRUFBYix5QkFGVTtBQUdWLEVBQUEsU0FBUyxFQUFULHFCQUhVO0FBSVYsRUFBQSxtQkFBbUIsRUFBbkIsK0JBSlU7QUFLVixFQUFBLElBQUksRUFBSixnQkFMVTtBQU1WLEVBQUEsVUFBVSxFQUFWO0FBTlUsQ0FBWjs7Ozs7Ozs7Ozs7O0FDWEE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLGNBQXNCLE1BQXRCO0FBQUEsSUFBUSxNQUFSLFdBQVEsTUFBUjtBQUFBLElBQWdCLENBQWhCLFdBQWdCLENBQWhCOztJQUVxQixTOzs7OztBQUNuQjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFLHFCQUFZLE9BQVosRUFBcUI7QUFBQTs7QUFBQTs7QUFDbkIsUUFBTSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBWCxDQUFnQjtBQUMzQixNQUFBLElBQUksRUFBRSxDQURxQjtBQUUzQixNQUFBLEdBQUcsRUFBRSxDQUZzQjtBQUczQixNQUFBLE9BQU8sRUFBRSxNQUhrQjtBQUkzQixNQUFBLE9BQU8sRUFBRSxLQUprQjtBQUszQixNQUFBLFdBQVcsRUFBRSxDQUxjO0FBTTNCLE1BQUEsTUFBTSxFQUFFLE1BTm1CO0FBTzNCLE1BQUEsSUFB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QUFDQSxvQkFBSSxLQUFLLElBQVQsRUFBZTtBQUNMLGtCQUFBLElBREssR0FDSSxJQURKLENBQ0wsSUFESztBQUViLGtCQUFBLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBTCxDQUFXLENBQUMsR0FBRyxJQUFmLElBQXVCLElBQTNCO0FBQ0Esa0JBQUEsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFMLENBQVcsQ0FBQyxHQUFHLElBQWYsSUFBdUIsSUFBM0I7QUFDRCxpQkF4RVAsQ0EwRU07OztBQUNBLGdCQUFBLFlBQVksQ0FBQyxJQUFiLENBQWtCO0FBQ2hCLGtCQUFBLENBQUMsRUFBRCxDQURnQjtBQUVoQixrQkFBQSxDQUFDLEVBQUQsQ0FGZ0I7QUFHaEIsa0JBQUEsTUFBTSxFQUFFO0FBSFEsaUJBQWxCO0FBS0EsZ0JBQUEsWUFBWSxDQUFDLElBQWIsQ0FBa0I7QUFBRTtBQUNsQixrQkFBQSxNQUFNLEVBQUU7QUFEUSxpQkFBbEI7QUFoRk47O0FBQUE7QUF3RkUsZ0JBQUEsS0FBSyxDQUFDLENBQU4sQ0FBUSxjQUFSOztBQXhGRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gaW1wb3J0ICdAYmFiZWwvcG9seWZpbGwnO1xyXG5cclxuaW1wb3J0IFByb2Nlc3NHcmFwaCBmcm9tICcuL3NyYy9Qcm9jZXNzR3JhcGguanMnO1xyXG5cclxuaW1wb3J0IExpbmthYmxlU2hhcGUgZnJvbSAnLi9zcmMvTGlua2FibGVTaGFwZS5qcyc7XHJcbmltcG9ydCBDb250YWluZXIgZnJvbSAnLi9zcmMvQ29udGFpbmVyLmpzJztcclxuaW1wb3J0IEV4cGFuZGFibGVDb250YWluZXIgZnJvbSAnLi9zcmMvRXhwYW5kYWJsZUNvbnRhaW5lci5qcyc7XHJcblxyXG5pbXBvcnQgTGluayBmcm9tICcuL3NyYy9MaW5rLmpzJztcclxuaW1wb3J0IEN1cnZlZExpbmsgZnJvbSAnLi9zcmMvQ3VydmVkTGluay5qcyc7XHJcblxyXG53aW5kb3cucGcgPSB7XHJcbiAgUHJvY2Vzc0dyYXBoLFxyXG4gIExpbmthYmxlU2hhcGUsXHJcbiAgQ29udGFpbmVyLFxyXG4gIEV4cGFuZGFibGVDb250YWluZXIsXHJcbiAgTGluayxcclxuICBDdXJ2ZWRMaW5rLFxyXG59O1xyXG4iLCJpbXBvcnQgTGlua2FibGVTaGFwZSBmcm9tICcuL0xpbmthYmxlU2hhcGUuanMnO1xyXG5pbXBvcnQgQ3VydmVkTGluayBmcm9tICcuL0N1cnZlZExpbmsuanMnO1xyXG5cclxuY29uc3QgeyBmYWJyaWMsIF8gfSA9IHdpbmRvdztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRhaW5lciBleHRlbmRzIExpbmthYmxlU2hhcGUge1xyXG4gIC8qKlxyXG4gICAqIEEgQ29udGFpbmVyIGlzIGEgUmVjdCB3aXRoIGFuIElUZXh0LiBDYW4gYmUgZXhwYW5kZWQgdG8gcmV2ZWFsIGNvbnRhaW5lZCBTaGFwZXMuXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIG9wdGlvbnNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7RmFicmljLkNhbnZhc30gICBvcHRpb25zLmNhbnZhcyAtIEZhYnJpYyBjYW52YXNcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgb3B0aW9ucy5pZCAtIFVuaXF1ZSBpZGVudGlmaWVyXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIG9wdGlvbnMud2lkdGhcclxuICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgb3B0aW9ucy5oZWlnaHRcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgb3B0aW9ucy5sYWJlbFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHJlY3QgPSBuZXcgZmFicmljLlJlY3Qoe1xyXG4gICAgICBsZWZ0OiAwLFxyXG4gICAgICB0b3A6IDAsXHJcbiAgICAgIG9yaWdpblg6ICdsZWZ0JyxcclxuICAgICAgb3JpZ2luWTogJ3RvcCcsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICBzdHJva2U6ICcjMDAwJyxcclxuICAgICAgZmlsbDogJyNmZmYnLFxyXG4gICAgICByeDogMTAsXHJcbiAgICAgIHJ5OiAxMCxcclxuICAgICAgd2lkdGg6IG9wdGlvbnMud2lkdGggPyBvcHRpb25zLndpZHRoIDogMjAwLFxyXG4gICAgICBoZWlnaHQ6IG9wdGlvbnMuaGVpZ2h0ID8gb3B0aW9ucy5oZWlnaHQgOiAxMDAsXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IHRleHQgPSBuZXcgZmFicmljLlRleHRib3gob3B0aW9ucy5sYWJlbCwge1xyXG4gICAgICBsZWZ0OiByZWN0LndpZHRoIC8gMixcclxuICAgICAgdG9wOiByZWN0LmhlaWdodCAvIDIsXHJcbiAgICAgIHN0eWxlczogeyB9LFxyXG4gICAgICBmb250U2l6ZTogMTQsXHJcbiAgICAgIGZvbnRGYW1pbHk6ICdIZWx2ZXRpY2EnLFxyXG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIHdpZHRoOiAxOTAsXHJcbiAgICAgIGhlaWdodDogOTAsXHJcbiAgICAgIHNwbGl0QnlHcmFwaGVtZTogdHJ1ZSxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgZ3JvdXAgPSBuZXcgZmFicmljLkdyb3VwKFtyZWN0LCB0ZXh0XSwge1xyXG4gICAgICBsZWZ0OiAwLFxyXG4gICAgICB0b3A6IDAsXHJcbiAgICAgIG9yaWdpblg6ICdsZWZ0JyxcclxuICAgICAgb3JpZ2luWTogJ3RvcCcsXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IG5ld09wdGlvbnMgPSBfLmNsb25lRGVlcChfLm9taXQob3B0aW9ucywgWydjYW52YXMnLCAnc2hhcGUnXSkpO1xyXG4gICAgbmV3T3B0aW9ucy5jYW52YXMgPSBvcHRpb25zLmNhbnZhcztcclxuICAgIG5ld09wdGlvbnMuc2hhcGUgPSBncm91cDtcclxuICAgIHN1cGVyKG5ld09wdGlvbnMpO1xyXG5cclxuICAgIGdyb3VwLm9uKHtcclxuICAgICAgc2NhbGluZzogKCkgPT4ge1xyXG4gICAgICAgIC8vIFdoZW4gc2NhbGluZywga2VlcCB0ZXh0IHNhbWUgc2l6ZSBhcyBpbml0aWFsXHJcbiAgICAgICAgaWYgKGdyb3VwLnNjYWxlWCA8IDEpIHtcclxuICAgICAgICAgIHRleHQuc2NhbGVYID0gMSArICgxIC0gZ3JvdXAuc2NhbGVYKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGV4dC5zY2FsZVggPSAxIC8gKGdyb3VwLnNjYWxlWCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChncm91cC5zY2FsZVkgPCAxKSB7XHJcbiAgICAgICAgICB0ZXh0LnNjYWxlWSA9IDEgKyAoMSAtIGdyb3VwLnNjYWxlWSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRleHQuc2NhbGVZID0gMSAvIChncm91cC5zY2FsZVkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNhbnZhcy5yZW5kZXJBbGwoKTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgX29uQW5jaG9yUmlnaHRDbGljayhvcHRpb25zKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGlkLCBsZWZ0LCB0b3AsIGFuZ2xlLCBjYW52YXMsIHdpZHRoLCBoZWlnaHQsXHJcbiAgICB9ID0gdGhpcy5zaGFwZTtcclxuICAgIGNvbnN0IGFwID0gb3B0aW9ucy50YXJnZXQ7XHJcbiAgICBjb25zdCB7IGNhcmRpbmFsIH0gPSBhcDtcclxuICAgIGNvbnN0IHNwYWNpbmcgPSA1MDtcclxuXHJcbiAgICBjb25zdCBuZXh0Q29udGFpbmVyID0gbmV3IENvbnRhaW5lcih7XHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgaWQ6IGAke2lkfV9uZXh0XyR7Y2FyZGluYWx9XyR7TWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMCkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygxKX1gLFxyXG4gICAgICBsZWZ0LFxyXG4gICAgICB0b3AsXHJcbiAgICAgIGFuZ2xlLFxyXG4gICAgICBsYWJlbDogYCR7aWR9X25leHRfJHtjYXJkaW5hbH1gLFxyXG4gICAgfSk7XHJcbiAgICBuZXh0Q29udGFpbmVyLmluamVjdCgpO1xyXG5cclxuICAgIGNvbnN0IG5ld09wdGlvbnMgPSB7fTtcclxuICAgIGxldCB0YXJnZXRDYXJkaW5hbDtcclxuICAgIHN3aXRjaCAoY2FyZGluYWwpIHtcclxuICAgICAgY2FzZSAnZWFzdCc6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICd3ZXN0JztcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSB0b3A7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gbGVmdCArIHdpZHRoICsgc3BhY2luZztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICd3ZXN0Jzoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ2Vhc3QnO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IHRvcDtcclxuICAgICAgICBuZXdPcHRpb25zLnggPSBsZWZ0IC0gd2lkdGggLSBzcGFjaW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRoJzoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ3NvdXRoJztcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSB0b3AgLSBoZWlnaHQgLSBzcGFjaW5nO1xyXG4gICAgICAgIG5ld09wdGlvbnMueCA9IGxlZnQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnc291dGgnOiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnbm9ydGgnO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IHRvcCArIGhlaWdodCArIHNwYWNpbmc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gbGVmdDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aGVhc3QnOiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnc291dGh3ZXN0JztcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSB0b3AgLSBoZWlnaHQgLSBzcGFjaW5nO1xyXG4gICAgICAgIG5ld09wdGlvbnMueCA9IGxlZnQgKyB3aWR0aCArIHNwYWNpbmc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnbm9ydGh3ZXN0Jzoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ3NvdXRoZWFzdCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gdG9wIC0gaGVpZ2h0IC0gc3BhY2luZztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSBsZWZ0IC0gd2lkdGggLSBzcGFjaW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRoZWFzdCc6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICdub3J0aHdlc3QnO1xyXG4gICAgICAgIG5ld09wdGlvbnMueCA9IHRvcCArIGhlaWdodCArIHNwYWNpbmc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gbGVmdCArIHdpZHRoICsgc3BhY2luZztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aHdlc3QnOlxyXG4gICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnbm9ydGhlYXN0JztcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSB0b3AgKyBoZWlnaHQgKyBzcGFjaW5nO1xyXG4gICAgICAgIG5ld09wdGlvbnMueCA9IGxlZnQgLSB3aWR0aCAtIHNwYWNpbmc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIG5leHRDb250YWluZXIubW92ZShuZXdPcHRpb25zKTtcclxuICAgIC8vIG5leHRDb250YWluZXIucm90YXRlKGFuZ2xlKTtcclxuXHJcbiAgICBjb25zdCBuZXdMaW5rID0gbmV3IEN1cnZlZExpbmsoe1xyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgeDogYXAubGVmdCxcclxuICAgICAgICB5OiBhcC50b3AsXHJcbiAgICAgIH0sXHJcbiAgICAgIGVuZDoge1xyXG4gICAgICAgIHg6IG5leHRDb250YWluZXIuYW5jaG9yc1t0YXJnZXRDYXJkaW5hbF0ubGVmdCxcclxuICAgICAgICB5OiBuZXh0Q29udGFpbmVyLmFuY2hvcnNbdGFyZ2V0Q2FyZGluYWxdLnRvcCxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgbmV3TGluay5pbmplY3QoY2FudmFzKTtcclxuICAgIG5ld0xpbmsuY29ubmVjdExpbmsoJ3N0YXJ0JywgYXAuc2hhcGVJZCwgYXAuY2FyZGluYWwpO1xyXG4gICAgbmV3TGluay5jb25uZWN0TGluaygnZW5kJywgbmV4dENvbnRhaW5lci5hbmNob3JzW3RhcmdldENhcmRpbmFsXS5zaGFwZUlkLCBuZXh0Q29udGFpbmVyLmFuY2hvcnNbdGFyZ2V0Q2FyZGluYWxdLmNhcmRpbmFsKTtcclxuICB9XHJcblxyXG4gIF9vbkFuY2hvckxlZnRDbGljayhvcHRpb25zKSB7XHJcbiAgICBjb25zdCBhcCA9IG9wdGlvbnMudGFyZ2V0O1xyXG4gICAgY29uc3QgeyBjYW52YXMgfSA9IHRoaXM7XHJcblxyXG4gICAgLy8gRGlzYWJsZSB0aGUgbXVsdGkgc2VsZWN0aW9uIHdoZW4gbW92aW5nIG1vdXNlXHJcbiAgICB0aGlzLmNhbnZhcy5zZWxlY3Rpb24gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdCBvcHBvc2l0ZUNhcmRpbmFsID0ge1xyXG4gICAgICBlYXN0OiAnd2VzdCcsXHJcbiAgICAgIHdlc3Q6ICdlYXN0JyxcclxuICAgICAgbm9ydGg6ICdzb3V0aCcsXHJcbiAgICAgIHNvdXRoOiAnbm9ydGgnLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IG5ld0xpbmsgPSBuZXcgQ3VydmVkTGluayh7XHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgc3RhcnQ6IHtcclxuICAgICAgICB4OiBhcC5sZWZ0LFxyXG4gICAgICAgIHk6IGFwLnRvcCxcclxuICAgICAgICBkaXJlY3Rpb246IGFwLmNhcmRpbmFsLFxyXG4gICAgICB9LFxyXG4gICAgICBlbmQ6IHtcclxuICAgICAgICB4OiBhcC5sZWZ0LFxyXG4gICAgICAgIHk6IGFwLnRvcCxcclxuICAgICAgICBkaXJlY3Rpb246IG9wcG9zaXRlQ2FyZGluYWxbYXAuY2FyZGluYWxdLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgICBuZXdMaW5rLmluamVjdChjYW52YXMpO1xyXG4gICAgbmV3TGluay5jb25uZWN0TGluaygnc3RhcnQnLCBhcC5zaGFwZUlkLCBhcC5jYXJkaW5hbCk7XHJcbiAgICBuZXdMaW5rLmFycm93SGVhZC5maXJlKCdtb3VzZWRvd24nKTtcclxuXHJcbiAgICBjb25zdCBvbk1vdXNlTW92ZSA9IChldmVudCkgPT4ge1xyXG4gICAgICBuZXdMaW5rLmFycm93SGVhZC5sZWZ0ID0gZXZlbnQucG9pbnRlci54O1xyXG4gICAgICBuZXdMaW5rLmFycm93SGVhZC50b3AgPSBldmVudC5wb2ludGVyLnk7XHJcbiAgICAgIG5ld0xpbmsuYXJyb3dIZWFkLmZpcmUoJ21vdmluZycpO1xyXG4gICAgfTtcclxuICAgIGNhbnZhcy5vbignbW91c2U6bW92ZScsIG9uTW91c2VNb3ZlKTtcclxuXHJcbiAgICBjb25zdCBvbk1vdXNlQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgIC8vIEVuYWJsZSBiYWNrIHRoZSBtdWx0aSBzZWxlY3Rpb24gd2hlbiBtb3ZpbmcgbW91c2VcclxuICAgICAgdGhpcy5jYW52YXMuc2VsZWN0aW9uID0gdHJ1ZTtcclxuXHJcbiAgICAgIG5ld0xpbmsuYXJyb3dIZWFkLmZpcmUoJ21vdmVkJyk7XHJcbiAgICAgIG5ld0xpbmsuYXJyb3dIZWFkLmZpcmUoJ21vdXNldXAnKTtcclxuICAgICAgY2FudmFzLm9mZignbW91c2U6bW92ZScsIG9uTW91c2VNb3ZlKTtcclxuICAgICAgY2FudmFzLm9mZignbW91c2U6dXAnLCBvbk1vdXNlQ2xpY2spO1xyXG4gICAgfTtcclxuICAgIGNhbnZhcy5vbignbW91c2U6dXAnLCBvbk1vdXNlQ2xpY2spO1xyXG4gIH1cclxufVxyXG4iLCJjb25zdCB7IGZhYnJpYyB9ID0gd2luZG93O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3VydmVkTGluayB7XHJcbiAgLyoqXHJcbiAgICogQSBMaW5rIGlzIGEgRmFicmljLlBhdGggb2JqZWN0IHdob3NlIFN0YXJ0IGFuZCBFbmQgcG9pbnRzIGNhbiBiZSBjb25uZWN0ZWQgZW5kIGFueSBhbmNob3Igb2YgdHdvIExpbmthYmxlU2hhcGUuXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIG9wdGlvbnNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7RmFicmljLkNhbnZhc30gICBvcHRpb25zLmNhbnZhcyAtIEZhYnJpYyBjYW52YXNcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgb3B0aW9ucy5pZCAtIFVuaXF1ZSBpZGVudGlmaWVyXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuc3RhcnRdIC0gQ29vcmRpbmF0ZXMgb2YgdGhlIHN0YXJ0IHBvaW50XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIFtvcHRpb25zLnN0YXJ0LnhdIC0gWCBheGlzIGNvb3JkaW5hdGUgb2YgdGhlIHN0YXJ0IHBvaW50XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIFtvcHRpb25zLnN0YXJ0LnldIC0gWSBheGlzIGNvb3JkaW5hdGUgb2YgdGhlIHN0YXJ0IHBvaW50XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIFtvcHRpb25zLnN0YXJ0LmRpcmVjdGlvbl0gLVxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBbb3B0aW9ucy5lbmQueF0gLSBYIGF4aXMgY29vcmRpbmF0ZSBvZiB0aGUgZW5kIHBvaW50XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIFtvcHRpb25zLmVuZC55XSAtIFkgYXhpcyBjb29yZGluYXRlIG9mIHRoZSBlbmQgcG9pbnRcclxuICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgW29wdGlvbnMuZW5kLmRpcmVjdGlvbl0gLVxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBbb3B0aW9ucy5jdXN0b21dIC0gT3B0aW9ucyBlbmQgY3VzdG9taXplIHRoZSBkaWZmZXJlbnQgc2hhcGVzIG9mIHRoZSBMaW5rXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuY3VzdG9tLnBhdGhdIC0gYmV6aWVyIHF1YWRyYXRpYyBjdXJ2ZVxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBbb3B0aW9ucy5jdXN0b20uc3RhcnRQb2ludF0gLSBha2EgYXJyb3dUYWlsXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLmN1c3RvbS5lbmRQb2ludF0gLSBha2EgYXJyb3dIZWFkXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBpZCxcclxuICAgICAgY2FudmFzLFxyXG4gICAgfSA9IG9wdGlvbnM7XHJcbiAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuICAgIHRoaXMuZGlyZWN0aW9uID0ge1xyXG4gICAgICBzdGFydDogb3B0aW9ucyAmJiBvcHRpb25zLnN0YXJ0ICYmIG9wdGlvbnMuc3RhcnQuZGlyZWN0aW9uID8gb3B0aW9ucy5zdGFydC5kaXJlY3Rpb24gOiAnZWFzdCcsXHJcbiAgICAgIGVuZDogb3B0aW9ucyAmJiBvcHRpb25zLmVuZCAmJiBvcHRpb25zLmVuZC5kaXJlY3Rpb24gPyBvcHRpb25zLmVuZC5kaXJlY3Rpb24gOiAnd2VzdCcsXHJcbiAgICB9O1xyXG4gICAgY29uc3Qgc3RhcnQgPSB7XHJcbiAgICAgIHg6IG9wdGlvbnMgJiYgb3B0aW9ucy5zdGFydCAmJiBvcHRpb25zLnN0YXJ0LnggPyBvcHRpb25zLnN0YXJ0LnggOiAwLFxyXG4gICAgICB5OiBvcHRpb25zICYmIG9wdGlvbnMuc3RhcnQgJiYgb3B0aW9ucy5zdGFydC55ID8gb3B0aW9ucy5zdGFydC55IDogMCxcclxuICAgIH07XHJcbiAgICBjb25zdCBlbmQgPSB7XHJcbiAgICAgIHg6IG9wdGlvbnMgJiYgb3B0aW9ucy5lbmQgJiYgb3B0aW9ucy5lbmQueCA/IG9wdGlvbnMuZW5kLnggOiAwLFxyXG4gICAgICB5OiBvcHRpb25zICYmIG9wdGlvbnMuZW5kICYmIG9wdGlvbnMuZW5kLnkgPyBvcHRpb25zLmVuZC55IDogMCxcclxuICAgIH07XHJcblxyXG4gICAgLy8gUGF0aCwgYSBiZXppZXIgY3ViaWMgY3VydmVcclxuICAgIGNvbnN0IHsgcGF0aENvb3Jkc0FycmF5IH0gPSB0aGlzLmNvbXB1dGVQYXRoQ29vcmRzKHtcclxuICAgICAgc3RhcnQ6IHtcclxuICAgICAgICB4OiBzdGFydC54LFxyXG4gICAgICAgIHk6IHN0YXJ0LnksXHJcbiAgICAgICAgZGlyZWN0aW9uOiB0aGlzLmRpcmVjdGlvbi5zdGFydCxcclxuICAgICAgfSxcclxuICAgICAgZW5kOiB7XHJcbiAgICAgICAgeDogZW5kLngsXHJcbiAgICAgICAgeTogZW5kLnksXHJcbiAgICAgICAgZGlyZWN0aW9uOiB0aGlzLmRpcmVjdGlvbi5lbmQsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IHBhdGhPcHRzID0gdGhpcy5kZWZhdWx0UGF0aE9wdGlvbnMgPSB7XHJcbiAgICAgIGZpbGw6ICcnLFxyXG4gICAgICBzdHJva2U6IChvcHRpb25zLmN1c3RvbSAmJiBvcHRpb25zLmN1c3RvbS5wYXRoICYmIG9wdGlvbnMuY3VzdG9tLnBhdGguc3Ryb2tlKSA/IG9wdGlvbnMuY3VzdG9tLnBhdGguc3Ryb2tlIDogJyM5OTknLFxyXG4gICAgICBzdHJva2VXaWR0aDogKG9wdGlvbnMuY3VzdG9tICYmIG9wdGlvbnMuY3VzdG9tLnBhdGggJiYgb3B0aW9ucy5jdXN0b20ucGF0aC5zdHJva2VXaWR0aCkgPyBvcHRpb25zLmN1c3RvbS5wYXRoLnN0cm9rZVdpZHRoIDogMixcclxuICAgICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAgIHNlbGVjdGFibGU6IHRydWUsXHJcbiAgICAgIGhhc0JvcmRlcnM6IHRydWUsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgICAgcGVyUGl4ZWxUYXJnZXRGaW5kOiB0cnVlLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHBhdGggPSBuZXcgZmFicmljLlBhdGgocGF0aENvb3Jkc0FycmF5LCBwYXRoT3B0cyk7XHJcbiAgICB0aGlzLnBhdGggPSBwYXRoO1xyXG5cclxuICAgIC8vIEVuZCBwb2ludCAoYXJyb3dIZWFkKVxyXG4gICAgY29uc3QgaXNWYWxpZE1hc2tPcHRzID0ge1xyXG4gICAgICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgcmFkaXVzOiAxNixcclxuICAgICAgZmlsbDogJyM1N2I4NTcnLCAvLyBlYTRmMzdcclxuICAgICAgc3Ryb2tlOiAnIzU3Yjg1NycsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgICAgc2VsZWN0YWJsZTogZmFsc2UsXHJcbiAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgYXJyb3dIZWFkT3B0cyA9IHtcclxuICAgICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAgIHdpZHRoOiAxMCxcclxuICAgICAgaGVpZ2h0OiAxMCxcclxuICAgICAgbGVmdDogZW5kLngsXHJcbiAgICAgIHRvcDogZW5kLnksXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICBmaWxsOiAnI2RkZCcsXHJcbiAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgIHN0cm9rZTogJyM5OTknLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIHNlbGVjdGFibGU6IHRydWUsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgYXJyb3dIZWFkID0gdGhpcy5hcnJvd0hlYWQgPSBuZXcgZmFicmljLlRyaWFuZ2xlKGFycm93SGVhZE9wdHMpO1xyXG4gICAgdGhpcy5pc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrID0gbmV3IGZhYnJpYy5DaXJjbGUoaXNWYWxpZE1hc2tPcHRzKTtcclxuICAgIGFycm93SGVhZC5vbignbW92aW5nJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhdGgoe1xyXG4gICAgICAgIGVuZDoge1xyXG4gICAgICAgICAgeDogYXJyb3dIZWFkLmxlZnQsXHJcbiAgICAgICAgICB5OiBhcnJvd0hlYWQudG9wLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tbWl0OiBmYWxzZSxcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuX2NoZWNrRXh0cmVtaXR5Q2FuQmVDb25uZWN0ZWQoJ2VuZCcpO1xyXG4gICAgfSk7XHJcbiAgICBhcnJvd0hlYWQub24oJ21vdmVkJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhdGgoe1xyXG4gICAgICAgIGVuZDoge1xyXG4gICAgICAgICAgeDogYXJyb3dIZWFkLmxlZnQsXHJcbiAgICAgICAgICB5OiBhcnJvd0hlYWQudG9wLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tbWl0OiB0cnVlLFxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5pc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrLnNldCgnb3BhY2l0eScsIDApO1xyXG4gICAgICB0aGlzLl9jb25uZWN0RGlzY29ubmVjdEV4dHJlbWl0eSgnZW5kJyk7XHJcbiAgICB9KTtcclxuICAgIGFycm93SGVhZC5vbignbW91c2Vkb3duJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLmJyaW5nVG9Gcm9udCgpO1xyXG4gICAgICB0aGlzLnRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KDEpO1xyXG5cclxuICAgICAgYXJyb3dIZWFkLm9uKCdtb3VzZXVwJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudG9nZ2xlQWxsQW5jaG9yc09wYWNpdHkoMCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU3RhcnQgcG9pbnQgKGFycm93VGFpbClcclxuICAgIGNvbnN0IGFycm93VGFpbE9wdHMgPSB7XHJcbiAgICAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgICB3aWR0aDogMTAsXHJcbiAgICAgIGhlaWdodDogMTAsXHJcbiAgICAgIGxlZnQ6IHN0YXJ0LngsXHJcbiAgICAgIHRvcDogc3RhcnQueSxcclxuICAgICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAgIGZpbGw6ICcjZGRkJyxcclxuICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgc3Ryb2tlOiAnIzk5OScsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgIH07XHJcbiAgICBjb25zdCBhcnJvd1RhaWwgPSB0aGlzLmFycm93VGFpbCA9IG5ldyBmYWJyaWMuUmVjdChhcnJvd1RhaWxPcHRzKTtcclxuICAgIHRoaXMuaXNWYWxpZFRhaWxDb25uZWN0aW9uTWFzayA9IG5ldyBmYWJyaWMuQ2lyY2xlKGlzVmFsaWRNYXNrT3B0cyk7XHJcbiAgICBhcnJvd1RhaWwub24oJ21vdmluZycsICgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVQYXRoKHtcclxuICAgICAgICBzdGFydDoge1xyXG4gICAgICAgICAgeDogYXJyb3dUYWlsLmxlZnQsXHJcbiAgICAgICAgICB5OiBhcnJvd1RhaWwudG9wLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tbWl0OiBmYWxzZSxcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuX2NoZWNrRXh0cmVtaXR5Q2FuQmVDb25uZWN0ZWQoJ3N0YXJ0Jyk7XHJcbiAgICB9KTtcclxuICAgIGFycm93VGFpbC5vbignbW92ZWQnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aCh7XHJcbiAgICAgICAgc3RhcnQ6IHtcclxuICAgICAgICAgIHg6IGFycm93VGFpbC5sZWZ0LFxyXG4gICAgICAgICAgeTogYXJyb3dUYWlsLnRvcCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbW1pdDogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuaXNWYWxpZFRhaWxDb25uZWN0aW9uTWFzay5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgICAgdGhpcy5fY29ubmVjdERpc2Nvbm5lY3RFeHRyZW1pdHkoJ3N0YXJ0Jyk7XHJcbiAgICB9KTtcclxuICAgIGFycm93VGFpbC5vbignbW91c2Vkb3duJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLmJyaW5nVG9Gcm9udCgpO1xyXG4gICAgICB0aGlzLnRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KDEpO1xyXG5cclxuICAgICAgYXJyb3dUYWlsLm9uKCdtb3VzZXVwJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudG9nZ2xlQWxsQW5jaG9yc09wYWNpdHkoMCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbmplY3QoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGlkLFxyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHBhdGgsXHJcbiAgICAgIGFycm93SGVhZCxcclxuICAgICAgYXJyb3dUYWlsLFxyXG4gICAgICBpc1ZhbGlkVGFpbENvbm5lY3Rpb25NYXNrLFxyXG4gICAgICBpc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrLFxyXG4gICAgfSA9IHRoaXM7XHJcbiAgICBjYW52YXMuYWRkKGlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2spO1xyXG4gICAgY2FudmFzLmFkZChpc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrKTtcclxuICAgIGNhbnZhcy5hZGQoYXJyb3dIZWFkKTtcclxuICAgIGNhbnZhcy5hZGQoYXJyb3dUYWlsKTtcclxuXHJcbiAgICBjYW52YXMuYWRkKHBhdGgpO1xyXG5cclxuICAgIHRoaXMudXBkYXRlUGF0aCh7XHJcbiAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgeDogcGF0aC5wYXRoWzBdWzFdLFxyXG4gICAgICAgIHk6IHBhdGgucGF0aFswXVsyXSxcclxuICAgICAgfSxcclxuICAgICAgZW5kOiB7XHJcbiAgICAgICAgeDogcGF0aC5wYXRoWzJdWzVdLFxyXG4gICAgICAgIHk6IHBhdGgucGF0aFsyXVs2XSxcclxuICAgICAgfSxcclxuICAgICAgY29tbWl0OiB0cnVlLFxyXG4gICAgfSk7XHJcblxyXG4gICAgY2FudmFzLmxpbmtzW2lkXSA9IHRoaXM7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICByZW1vdmUoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGlkLFxyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHBhdGgsXHJcbiAgICAgIGFycm93SGVhZCxcclxuICAgICAgYXJyb3dUYWlsLFxyXG4gICAgICBpc1ZhbGlkVGFpbENvbm5lY3Rpb25NYXNrLFxyXG4gICAgICBpc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrLFxyXG4gICAgfSA9IHRoaXM7XHJcbiAgICBjYW52YXMucmVtb3ZlKGlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2spO1xyXG4gICAgY2FudmFzLnJlbW92ZShpc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrKTtcclxuICAgIGNhbnZhcy5yZW1vdmUoYXJyb3dIZWFkKTtcclxuICAgIGNhbnZhcy5yZW1vdmUoYXJyb3dUYWlsKTtcclxuXHJcbiAgICBjYW52YXMucmVtb3ZlKHBhdGgpO1xyXG5cclxuICAgIGRlbGV0ZSBjYW52YXMubGlua3NbaWRdO1xyXG4gIH1cclxuXHJcbiAgY29ubmVjdExpbmsobGlua1BvaW50LCBzaGFwZUlkLCBjYXJkaW5hbCkge1xyXG4gICAgLy8gQ2hlY2sgbm90IGFscmVhZHkgY29ubmVjdGVkXHJcbiAgICBpZiAoIXRoaXMuaXNWYWxpZENvbm5lY3Rpb24obGlua1BvaW50LCBzaGFwZUlkLCBjYXJkaW5hbCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgc2hhcGUgPSB0aGlzLmNhbnZhcy5nZXRPYmplY3RzKClcclxuICAgICAgLmZpbmQoKG8pID0+IG8uaWQgPT09IHNoYXBlSWQpO1xyXG5cclxuICAgIC8vIERpc2Nvbm5lY3QgZXhpc3Rpbmcgb2JqZWN0XHJcbiAgICB0aGlzLmRpc2Nvbm5lY3RMaW5rKGxpbmtQb2ludCk7XHJcblxyXG4gICAgLy8gQ29ubmVjdFxyXG4gICAgdGhpcy5kaXJlY3Rpb25bbGlua1BvaW50XSA9IGNhcmRpbmFsO1xyXG4gICAgdGhpc1tsaW5rUG9pbnRdID0ge1xyXG4gICAgICBzaGFwZSxcclxuICAgICAgYW5jaG9yOiBjYXJkaW5hbCxcclxuICAgICAgaGFuZGxlcnM6IHtcclxuICAgICAgICBvbkFuY2hvclBvc2l0aW9uTW9kaWZ5aW5nOiAoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBvcHRzID0ge1xyXG4gICAgICAgICAgICBjb21taXQ6IGZhbHNlLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIG9wdHNbbGlua1BvaW50XSA9IHtcclxuICAgICAgICAgICAgeDogc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ubGVmdCxcclxuICAgICAgICAgICAgeTogc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0udG9wLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHRoaXMudXBkYXRlUGF0aChvcHRzKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQW5jaG9yUG9zaXRpb25Nb2RpZmllZDogKCkgPT4ge1xyXG4gICAgICAgICAgY29uc3Qgb3B0cyA9IHtcclxuICAgICAgICAgICAgY29tbWl0OiB0cnVlLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIG9wdHNbbGlua1BvaW50XSA9IHtcclxuICAgICAgICAgICAgeDogc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ubGVmdCxcclxuICAgICAgICAgICAgeTogc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0udG9wLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHRoaXMudXBkYXRlUGF0aChvcHRzKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICAgIC8vIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLm9wYWNpdHkgPSAwO1xyXG4gICAgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ub24oJ3BnOnBvc2l0aW9uOm1vZGlmeWluZycsIHRoaXNbbGlua1BvaW50XS5oYW5kbGVycy5vbkFuY2hvclBvc2l0aW9uTW9kaWZ5aW5nKTtcclxuICAgIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLm9uKCdwZzpwb3NpdGlvbjptb2RpZmllZCcsIHRoaXNbbGlua1BvaW50XS5oYW5kbGVycy5vbkFuY2hvclBvc2l0aW9uTW9kaWZpZWQpO1xyXG5cclxuICAgIC8vIFVwZGF0ZSBMaW5rXHJcbiAgICBjb25zdCBvcHRzID0ge1xyXG4gICAgICBjb21taXQ6IGZhbHNlLFxyXG4gICAgfTtcclxuICAgIG9wdHNbbGlua1BvaW50XSA9IHtcclxuICAgICAgeDogc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ubGVmdCxcclxuICAgICAgeTogc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0udG9wLFxyXG4gICAgfTtcclxuICAgIHRoaXMudXBkYXRlUGF0aChvcHRzKTtcclxuICB9XHJcblxyXG4gIGRpc2Nvbm5lY3RMaW5rKGxpbmtQb2ludCkge1xyXG4gICAgaWYgKHRoaXNbbGlua1BvaW50XSkge1xyXG4gICAgICB0aGlzW2xpbmtQb2ludF0uc2hhcGUuYW5jaG9yc1t0aGlzW2xpbmtQb2ludF0uYW5jaG9yXS5vZmYoJ3BnOnBvc2l0aW9uOm1vZGlmeWluZycsIHRoaXNbbGlua1BvaW50XS5oYW5kbGVycy5vbkFuY2hvclBvc2l0aW9uTW9kaWZ5aW5nKTtcclxuICAgICAgdGhpc1tsaW5rUG9pbnRdLnNoYXBlLmFuY2hvcnNbdGhpc1tsaW5rUG9pbnRdLmFuY2hvcl0ub2ZmKCdwZzpwb3NpdGlvbjptb2RpZmllZCcsIHRoaXNbbGlua1BvaW50XS5oYW5kbGVycy5vbkFuY2hvclBvc2l0aW9uTW9kaWZpZWQpO1xyXG4gICAgICBkZWxldGUgdGhpc1tsaW5rUG9pbnRdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYnJpbmdUb0Zyb250KCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHBhdGgsXHJcbiAgICAgIGFycm93SGVhZCxcclxuICAgICAgYXJyb3dUYWlsLFxyXG4gICAgfSA9IHRoaXM7XHJcbiAgICBjYW52YXMuYnJpbmdUb0Zyb250KHBhdGgpO1xyXG4gICAgY2FudmFzLmJyaW5nVG9Gcm9udChhcnJvd0hlYWQpO1xyXG4gICAgY2FudmFzLmJyaW5nVG9Gcm9udChhcnJvd1RhaWwpO1xyXG4gIH1cclxuXHJcbiAgY29tcHV0ZVBhdGhDb29yZHMob3B0aW9ucykge1xyXG4gICAgLy8gTWFnaWUgbWFnaWUsIGV0IHZvcyBpZMOpZXMgb250IGR1IGfDqW5pZSAhXHJcblxyXG4gICAgY29uc3Qgc3RhcnQgPSB7XHJcbiAgICAgIHg6IG9wdGlvbnMuc3RhcnQueCxcclxuICAgICAgeTogb3B0aW9ucy5zdGFydC55LFxyXG4gICAgICBkaXJlY3Rpb246IG9wdGlvbnMuc3RhcnQgJiYgb3B0aW9ucy5zdGFydC5kaXJlY3Rpb24gPyBvcHRpb25zLnN0YXJ0LmRpcmVjdGlvbiA6IHRoaXMuZGlyZWN0aW9uLnN0YXJ0LFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGVuZCA9IHtcclxuICAgICAgeDogb3B0aW9ucy5lbmQueCxcclxuICAgICAgeTogb3B0aW9ucy5lbmQueSxcclxuICAgICAgZGlyZWN0aW9uOiBvcHRpb25zLmVuZCAmJiBvcHRpb25zLmVuZC5kaXJlY3Rpb24gPyBvcHRpb25zLmVuZC5kaXJlY3Rpb24gOiB0aGlzLmRpcmVjdGlvbi5lbmQsXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENlbnRlciBwb2ludFxyXG4gICAgLy8gSWYgTGluayBpcyBjb25uZWN0ZWQsIGNlbnRlciBpcyBjYWxjdWxhdGVkIGJldHdlZW4gdGhlIHR3byBsaW5rZWQgc2hhcGVzXHJcbiAgICAvLyBJZiBub3QsIGl0IGlzIGNhbGN1bGF0ZWQgYmV0d2VlbiBsaW5rIHN0YXJ0IGFuZCBlbmQgcG9pbnRzXHJcbiAgICBjb25zdCBjZW50ZXIgPSB7XHJcbiAgICAgIHg6ICgoc3RhcnQueCArIGVuZC54KSAvIDIpLFxyXG4gICAgICB5OiAoKHN0YXJ0LnkgKyBlbmQueSkgLyAyKSxcclxuICAgIH07XHJcblxyXG4gICAgLy8gQ09NTUVOVEVEOiBEb2Vzbid0IHdvcmsgd2VsbCB3aGVuIGxpbmtlZCBzaGFwZSBpcyByb3RhdGVkXHJcbiAgICAvLyBpZiAodGhpcy5zdGFydCAmJiB0aGlzLmVuZCAmJiBzdGFydC5kaXJlY3Rpb24gIT09IGVuZC5kaXJlY3Rpb24pIHtcclxuICAgIC8vICAgY2VudGVyID0ge1xyXG4gICAgLy8gICAgIHg6ICh0aGlzLnN0YXJ0LnNoYXBlLmdldENlbnRlclBvaW50KCkueCArIHRoaXMuZW5kLnNoYXBlLmdldENlbnRlclBvaW50KCkueCkgLyAyLFxyXG4gICAgLy8gICAgIHk6ICh0aGlzLnN0YXJ0LnNoYXBlLmdldENlbnRlclBvaW50KCkueSArIHRoaXMuZW5kLnNoYXBlLmdldENlbnRlclBvaW50KCkueSkgLyAyLFxyXG4gICAgLy8gICB9O1xyXG4gICAgLy8gfVxyXG5cclxuICAgIGNvbnN0IGNvbnRyb2xzID0ge1xyXG4gICAgICBzdGFydDoge1xyXG4gICAgICAgIHg6IHN0YXJ0LngsXHJcbiAgICAgICAgeTogc3RhcnQueSxcclxuICAgICAgfSxcclxuICAgICAgZW5kOiB7XHJcbiAgICAgICAgeDogZW5kLngsXHJcbiAgICAgICAgeTogZW5kLnksXHJcbiAgICAgIH0sXHJcbiAgICAgIGNlbnRlcjE6IHtcclxuICAgICAgICB4OiBjZW50ZXIueCxcclxuICAgICAgICB5OiBjZW50ZXIueSxcclxuICAgICAgfSxcclxuICAgICAgY2VudGVyMjoge1xyXG4gICAgICAgIHg6IGNlbnRlci54LFxyXG4gICAgICAgIHk6IGNlbnRlci55LFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICAgIHN3aXRjaCAob3B0aW9ucy5zdGFydC5kaXJlY3Rpb24pIHtcclxuICAgICAgY2FzZSAnbm9ydGgnOlxyXG4gICAgICAgIGNvbnRyb2xzLnN0YXJ0LnkgLT0gTWF0aC5hYnMoc3RhcnQueSAtIGNlbnRlci55KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnc291dGgnOlxyXG4gICAgICAgIGNvbnRyb2xzLnN0YXJ0LnkgKz0gTWF0aC5hYnMoc3RhcnQueSAtIGNlbnRlci55KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnZWFzdCc6XHJcbiAgICAgICAgY29udHJvbHMuc3RhcnQueCArPSBNYXRoLmFicyhzdGFydC54IC0gY2VudGVyLngpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd3ZXN0JzpcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb250cm9scy5zdGFydC54IC09IE1hdGguYWJzKHN0YXJ0LnggLSBjZW50ZXIueCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICBzd2l0Y2ggKG9wdGlvbnMuZW5kLmRpcmVjdGlvbikge1xyXG4gICAgICBjYXNlICdub3J0aCc6XHJcbiAgICAgICAgY29udHJvbHMuZW5kLnkgLT0gTWF0aC5hYnMoZW5kLnkgLSBjZW50ZXIueSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3NvdXRoJzpcclxuICAgICAgICBjb250cm9scy5lbmQueSArPSBNYXRoLmFicyhlbmQueSAtIGNlbnRlci55KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnZWFzdCc6XHJcbiAgICAgICAgY29udHJvbHMuZW5kLnggKz0gTWF0aC5hYnMoZW5kLnggLSBjZW50ZXIueCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3dlc3QnOlxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbnRyb2xzLmVuZC54IC09IE1hdGguYWJzKGVuZC54IC0gY2VudGVyLngpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzdGFydC5kaXJlY3Rpb24gPT09IGVuZC5kaXJlY3Rpb24pIHtcclxuICAgICAgLy8gY29uc3QgZGVsdGFYID0gTWF0aC5hYnMoc3RhcnQueCAtIGVuZC54KSAvIDI7XHJcbiAgICAgIC8vIGNvbnN0IGRlbHRhWSA9IE1hdGguYWJzKHN0YXJ0LnkgLSBlbmQueSkgLyAyO1xyXG4gICAgICAvLyBjb25zdCBkZWx0YVggPSA0MCArIE1hdGguYWJzKHN0YXJ0LnggLSBlbmQueCkgLyA0O1xyXG4gICAgICAvLyBjb25zdCBkZWx0YVkgPSA0MCArIE1hdGguYWJzKHN0YXJ0LnkgLSBlbmQueSkgLyA0O1xyXG4gICAgICBjb25zdCBkZWx0YVggPSA0MDtcclxuICAgICAgY29uc3QgZGVsdGFZID0gNDA7XHJcblxyXG4gICAgICBpZiAoc3RhcnQuZGlyZWN0aW9uID09PSAnc291dGgnIHx8IHN0YXJ0LmRpcmVjdGlvbiA9PT0gJ25vcnRoJykge1xyXG4gICAgICAgIC8vIElmIGxpbmsgaXMgY29ubmVjdGVkIHRvIHR3byBzaGFwZXNcclxuICAgICAgICAvLyBJZiBzaGFwZXMgYXJlIGhvcml6b250YWxseSBhbGlnbmVkIChpLmUuIG9uIHRvcCBvZiBlYWNoIG90aGVyKSwgd2UgbW92ZSB0aGUgTGluayBjZW50ZXIgcG9pbnQgYSBiaXQgdG8gdGhlIGxlZnRcclxuICAgICAgICBpZiAodGhpcy5zdGFydCAmJiB0aGlzLmVuZCkge1xyXG4gICAgICAgICAgLy8gSWYgc2hhcGVzIGFyZSB2ZXJ0aWNhbGx5IGFsaWduZWQgKGkuZS4gbmV4dCB0byBlYWNoIG90aGVyKSwgd2UgbW92ZSB0aGUgTGluayBjZW50ZXIgcG9pbnQgYSBiaXQgdG8gdGhlIHRvcFxyXG4gICAgICAgICAgaWYgKE1hdGguYWJzKHN0YXJ0LnkgLSBlbmQueSkgPCAxMCkge1xyXG4gICAgICAgICAgICBjZW50ZXIueCAtPSAoKHRoaXMuc3RhcnQuc2hhcGUud2lkdGggKyB0aGlzLmVuZC5zaGFwZS53aWR0aCkgLyAyKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNlbnRlci55ICs9IChzdGFydC5kaXJlY3Rpb24gPT09ICdzb3V0aCcgPyBkZWx0YVkgOiAtZGVsdGFZKTtcclxuICAgICAgICBjb250cm9scy5zdGFydC55ID0gc3RhcnQueSArIChzdGFydC5kaXJlY3Rpb24gPT09ICdzb3V0aCcgPyBkZWx0YVkgOiAtZGVsdGFZKTtcclxuICAgICAgICBjb250cm9scy5lbmQueSA9IGVuZC55ICsgKHN0YXJ0LmRpcmVjdGlvbiA9PT0gJ3NvdXRoJyA/IGRlbHRhWSA6IC1kZWx0YVkpO1xyXG4gICAgICAgIGNvbnRyb2xzLmNlbnRlcjEueCA9IGNlbnRlci54O1xyXG4gICAgICAgIGNvbnRyb2xzLmNlbnRlcjIueCA9IGNlbnRlci54O1xyXG4gICAgICAgIGNvbnRyb2xzLmNlbnRlcjEueSA9IGNvbnRyb2xzLnN0YXJ0Lnk7XHJcbiAgICAgICAgY29udHJvbHMuY2VudGVyMi55ID0gY29udHJvbHMuZW5kLnk7XHJcbiAgICAgIH0gZWxzZSBpZiAoc3RhcnQuZGlyZWN0aW9uID09PSAnZWFzdCcgfHwgc3RhcnQuZGlyZWN0aW9uID09PSAnd2VzdCcpIHtcclxuICAgICAgICAvLyBJZiBsaW5rIGlzIGNvbm5lY3RlZCB0byB0d28gc2hhcGVzXHJcbiAgICAgICAgaWYgKHRoaXMuc3RhcnQgJiYgdGhpcy5lbmQpIHtcclxuICAgICAgICAgIC8vIElmIHNoYXBlcyBhcmUgdmVydGljYWxseSBhbGlnbmVkIChpLmUuIG5leHQgdG8gZWFjaCBvdGhlciksIHdlIG1vdmUgdGhlIExpbmsgY2VudGVyIHBvaW50IGEgYml0IHRvIHRoZSB0b3BcclxuICAgICAgICAgIGlmIChNYXRoLmFicyhzdGFydC55IC0gZW5kLnkpIDwgMTApIHtcclxuICAgICAgICAgICAgY2VudGVyLnkgLT0gKCh0aGlzLnN0YXJ0LnNoYXBlLmhlaWdodCArIHRoaXMuZW5kLnNoYXBlLmhlaWdodCkgLyAyKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNlbnRlci54ICs9IChzdGFydC5kaXJlY3Rpb24gPT09ICdlYXN0JyA/IGRlbHRhWCA6IC1kZWx0YVgpO1xyXG4gICAgICAgIGNvbnRyb2xzLnN0YXJ0LnggPSBzdGFydC54ICsgKHN0YXJ0LmRpcmVjdGlvbiA9PT0gJ2Vhc3QnID8gZGVsdGFYIDogLWRlbHRhWCk7XHJcbiAgICAgICAgY29udHJvbHMuZW5kLnggPSBlbmQueCArIChzdGFydC5kaXJlY3Rpb24gPT09ICdlYXN0JyA/IGRlbHRhWCA6IC1kZWx0YVgpO1xyXG4gICAgICAgIGNvbnRyb2xzLmNlbnRlcjEueCA9IGNvbnRyb2xzLnN0YXJ0Lng7XHJcbiAgICAgICAgY29udHJvbHMuY2VudGVyMi54ID0gY29udHJvbHMuZW5kLng7XHJcbiAgICAgICAgY29udHJvbHMuY2VudGVyMS55ID0gY2VudGVyLnk7XHJcbiAgICAgICAgY29udHJvbHMuY2VudGVyMi55ID0gY2VudGVyLnk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoc3RhcnQuZGlyZWN0aW9uID09PSAnc291dGgnIHx8IHN0YXJ0LmRpcmVjdGlvbiA9PT0gJ25vcnRoJykge1xyXG4gICAgICBjb250cm9scy5jZW50ZXIxLnggPSBjZW50ZXIueDtcclxuICAgICAgY29udHJvbHMuY2VudGVyMS55ID0gY29udHJvbHMuc3RhcnQueTtcclxuICAgICAgY29udHJvbHMuY2VudGVyMi54ID0gY2VudGVyLng7XHJcbiAgICAgIGNvbnRyb2xzLmNlbnRlcjIueSA9IGNvbnRyb2xzLmVuZC55O1xyXG4gICAgfSBlbHNlIGlmIChzdGFydC5kaXJlY3Rpb24gPT09ICdlYXN0JyB8fCBzdGFydC5kaXJlY3Rpb24gPT09ICd3ZXN0Jykge1xyXG4gICAgICBjb250cm9scy5jZW50ZXIxLnggPSBjb250cm9scy5zdGFydC54O1xyXG4gICAgICBjb250cm9scy5jZW50ZXIxLnkgPSBjZW50ZXIueTtcclxuICAgICAgY29udHJvbHMuY2VudGVyMi54ID0gY29udHJvbHMuZW5kLng7XHJcbiAgICAgIGNvbnRyb2xzLmNlbnRlcjIueSA9IGNlbnRlci55O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIElmIGxpbmsgaXMgY29ubmVjdGVkIHRvIGxpbmtlZCBzaGFwZXMgYW5kIHRoZXkgYXJlIHJvdGF0ZWQsIHBlcmZvcm0gdGhlIHJvdGF0aW9uIG9uIHRoZSBjb250cm9scyBwb2ludHNcclxuICAgIC8vIFRPRE86IHRvIGltcHJvdmVcclxuICAgIGlmICh0aGlzLnN0YXJ0ICYmIHRoaXMuc3RhcnQuc2hhcGUgJiYgdGhpcy5zdGFydC5zaGFwZS5hbmdsZSkge1xyXG4gICAgICBjb25zdCBhbmdsZSA9ICgodGhpcy5zdGFydC5zaGFwZS5hbmdsZSAqIE1hdGguUEkpIC8gMTgwKTtcclxuXHJcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSBuZXcgZmFicmljLlBvaW50KGNvbnRyb2xzLnN0YXJ0LngsIGNvbnRyb2xzLnN0YXJ0LnkpO1xyXG4gICAgICBjb25zdCBvcmlnaW4gPSBuZXcgZmFicmljLlBvaW50KHN0YXJ0LngsIHN0YXJ0LnkpO1xyXG4gICAgICBjb25zdCByb3RhdGVkQ29udHJvbCA9IGZhYnJpYy51dGlsLnJvdGF0ZVBvaW50KGNvbnRyb2wsIG9yaWdpbiwgYW5nbGUpO1xyXG5cclxuICAgICAgY29udHJvbHMuc3RhcnQueCA9IHJvdGF0ZWRDb250cm9sLng7XHJcbiAgICAgIGNvbnRyb2xzLnN0YXJ0LnkgPSByb3RhdGVkQ29udHJvbC55O1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZW5kICYmIHRoaXMuZW5kLnNoYXBlICYmIHRoaXMuZW5kLnNoYXBlLmFuZ2xlKSB7XHJcbiAgICAgIGNvbnN0IGFuZ2xlID0gKCh0aGlzLmVuZC5zaGFwZS5hbmdsZSAqIE1hdGguUEkpIC8gMTgwKTtcclxuXHJcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSBuZXcgZmFicmljLlBvaW50KGNvbnRyb2xzLmVuZC54LCBjb250cm9scy5lbmQueSk7XHJcbiAgICAgIGNvbnN0IG9yaWdpbiA9IG5ldyBmYWJyaWMuUG9pbnQoZW5kLngsIGVuZC55KTtcclxuICAgICAgY29uc3Qgcm90YXRlZENvbnRyb2wgPSBmYWJyaWMudXRpbC5yb3RhdGVQb2ludChjb250cm9sLCBvcmlnaW4sIGFuZ2xlKTtcclxuXHJcbiAgICAgIGNvbnRyb2xzLmVuZC54ID0gcm90YXRlZENvbnRyb2wueDtcclxuICAgICAgY29udHJvbHMuZW5kLnkgPSByb3RhdGVkQ29udHJvbC55O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFZpc3VhbCBkZWJ1Z1xyXG4gICAgLy8gdGhpcy5jYW52YXMuYWRkKG5ldyBmYWJyaWMuQ2lyY2xlKHtcclxuICAgIC8vICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAvLyAgIGxlZnQ6IGNvbnRyb2xzLmVuZC54LFxyXG4gICAgLy8gICB0b3A6IGNvbnRyb2xzLmVuZC55LFxyXG4gICAgLy8gICBzdHJva2VXaWR0aDogMSxcclxuICAgIC8vICAgcmFkaXVzOiAyLFxyXG4gICAgLy8gICBmaWxsOiAnIzc4YmVmYScsXHJcbiAgICAvLyAgIHN0cm9rZTogJyM3OGJlZmEnLFxyXG4gICAgLy8gICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgIC8vICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAvLyAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgLy8gICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAvLyAgIHNlbGVjdGFibGU6IHRydWUsXHJcbiAgICAvLyAgIG9wYWNpdHk6IDEsXHJcbiAgICAvLyB9KSk7XHJcbiAgICAvLyB0aGlzLmNhbnZhcy5hZGQobmV3IGZhYnJpYy5DaXJjbGUoe1xyXG4gICAgLy8gICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgIC8vICAgbGVmdDogY2VudGVyLngsXHJcbiAgICAvLyAgIHRvcDogY2VudGVyLnksXHJcbiAgICAvLyAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgLy8gICByYWRpdXM6IDIsXHJcbiAgICAvLyAgIGZpbGw6ICcjZmYyJyxcclxuICAgIC8vICAgc3Ryb2tlOiAnI2ZmMicsXHJcbiAgICAvLyAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgLy8gICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgIC8vICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAvLyAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgIC8vICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgIC8vICAgb3BhY2l0eTogMSxcclxuICAgIC8vIH0pKTtcclxuICAgIC8vIHRoaXMuY2FudmFzLmFkZChuZXcgZmFicmljLkNpcmNsZSh7XHJcbiAgICAvLyAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgLy8gICBsZWZ0OiBjb250cm9scy5zdGFydC54LFxyXG4gICAgLy8gICB0b3A6IGNvbnRyb2xzLnN0YXJ0LnksXHJcbiAgICAvLyAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgLy8gICByYWRpdXM6IDIsXHJcbiAgICAvLyAgIGZpbGw6ICcjZjIyJyxcclxuICAgIC8vICAgc3Ryb2tlOiAnI2YyMicsXHJcbiAgICAvLyAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgLy8gICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgIC8vICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAvLyAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgIC8vICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgIC8vICAgb3BhY2l0eTogMSxcclxuICAgIC8vIH0pKTtcclxuXHJcbiAgICBjb25zdCBjb29yZHMgPSB7XHJcbiAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgeDogc3RhcnQueCxcclxuICAgICAgICB5OiBzdGFydC55LFxyXG4gICAgICB9LFxyXG4gICAgICBlbmQ6IHtcclxuICAgICAgICB4OiBlbmQueCxcclxuICAgICAgICB5OiBlbmQueSxcclxuICAgICAgfSxcclxuICAgICAgY2VudGVyLFxyXG4gICAgICBjb250cm9sczoge1xyXG4gICAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgICB4OiBjb250cm9scy5zdGFydC54LFxyXG4gICAgICAgICAgeTogY29udHJvbHMuc3RhcnQueSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVuZDoge1xyXG4gICAgICAgICAgeDogY29udHJvbHMuZW5kLngsXHJcbiAgICAgICAgICB5OiBjb250cm9scy5lbmQueSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNlbnRlcjE6IHtcclxuICAgICAgICAgIHg6IGNvbnRyb2xzLmNlbnRlcjEueCxcclxuICAgICAgICAgIHk6IGNvbnRyb2xzLmNlbnRlcjEueSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNlbnRlcjI6IHtcclxuICAgICAgICAgIHg6IGNvbnRyb2xzLmNlbnRlcjIueCxcclxuICAgICAgICAgIHk6IGNvbnRyb2xzLmNlbnRlcjIueSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHBhdGhDb29yZHNBcnJheSA9IFtcclxuICAgICAgWydNJywgY29vcmRzLnN0YXJ0LngsIGNvb3Jkcy5zdGFydC55XSxcclxuICAgICAgWydDJywgY29vcmRzLmNvbnRyb2xzLnN0YXJ0LngsIGNvb3Jkcy5jb250cm9scy5zdGFydC55LCBjb29yZHMuY29udHJvbHMuY2VudGVyMS54LCBjb29yZHMuY29udHJvbHMuY2VudGVyMS55LCBjb29yZHMuY2VudGVyLngsIGNvb3Jkcy5jZW50ZXIueV0sXHJcbiAgICAgIFsnQycsIGNvb3Jkcy5jb250cm9scy5jZW50ZXIyLngsIGNvb3Jkcy5jb250cm9scy5jZW50ZXIyLnksIGNvb3Jkcy5jb250cm9scy5lbmQueCwgY29vcmRzLmNvbnRyb2xzLmVuZC55LCBjb29yZHMuZW5kLngsIGNvb3Jkcy5lbmQueV0sXHJcbiAgICBdO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcGF0aENvb3JkczogY29vcmRzLFxyXG4gICAgICBwYXRoQ29vcmRzQXJyYXksXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0gb3B0aW9uc1xyXG4gICAqIEBwYXJhbSBvcHRpb25zLnN0YXJ0LnhcclxuICAgKiBAcGFyYW0gb3B0aW9ucy5zdGFydC55XHJcbiAgICogQHBhcmFtIG9wdGlvbnMuZW5kLnhcclxuICAgKiBAcGFyYW0gb3B0aW9ucy5lbmQueVxyXG4gICAqIEBwYXJhbSBvcHRpb25zLmNvbW1pdFxyXG4gICAqL1xyXG4gIHVwZGF0ZVBhdGgob3B0aW9ucykge1xyXG4gICAgY29uc3Qgc3RhcnQgPSB7XHJcbiAgICAgIHg6IG9wdGlvbnMuc3RhcnQgJiYgb3B0aW9ucy5zdGFydC54ID8gb3B0aW9ucy5zdGFydC54IDogdGhpcy5wYXRoLnBhdGhbMF1bMV0sXHJcbiAgICAgIHk6IG9wdGlvbnMuc3RhcnQgJiYgb3B0aW9ucy5zdGFydC55ID8gb3B0aW9ucy5zdGFydC55IDogdGhpcy5wYXRoLnBhdGhbMF1bMl0sXHJcbiAgICAgIGRpcmVjdGlvbjogb3B0aW9ucy5zdGFydCAmJiBvcHRpb25zLnN0YXJ0LmRpcmVjdGlvbiA/IG9wdGlvbnMuc3RhcnQuZGlyZWN0aW9uIDogdGhpcy5kaXJlY3Rpb24uc3RhcnQsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgZW5kID0ge1xyXG4gICAgICB4OiBvcHRpb25zLmVuZCAmJiBvcHRpb25zLmVuZC54ID8gb3B0aW9ucy5lbmQueCA6IHRoaXMucGF0aC5wYXRoWzJdWzVdLFxyXG4gICAgICB5OiBvcHRpb25zLmVuZCAmJiBvcHRpb25zLmVuZC55ID8gb3B0aW9ucy5lbmQueSA6IHRoaXMucGF0aC5wYXRoWzJdWzZdLFxyXG4gICAgICBkaXJlY3Rpb246IG9wdGlvbnMuZW5kICYmIG9wdGlvbnMuZW5kLmRpcmVjdGlvbiA/IG9wdGlvbnMuZW5kLmRpcmVjdGlvbiA6IHRoaXMuZGlyZWN0aW9uLmVuZCxcclxuICAgIH07XHJcbiAgICBjb25zdCB7IHBhdGhDb29yZHNBcnJheSB9ID0gdGhpcy5jb21wdXRlUGF0aENvb3Jkcyh7XHJcbiAgICAgIHN0YXJ0LCBlbmQsXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAob3B0aW9ucy5jb21taXQpIHtcclxuICAgICAgY29uc3QgbmV3UGF0aCA9IG5ldyBmYWJyaWMuUGF0aChwYXRoQ29vcmRzQXJyYXksIHRoaXMuZGVmYXVsdFBhdGhPcHRpb25zKTtcclxuICAgICAgdGhpcy5jYW52YXMucmVtb3ZlKHRoaXMucGF0aCk7XHJcbiAgICAgIHRoaXMuY2FudmFzLmFkZChuZXdQYXRoKTtcclxuXHJcbiAgICAgIG5ld1BhdGgub24oJ21vdXNlZG93bicsIHRoaXMuYnJpbmdUb0Zyb250LmJpbmQodGhpcykpO1xyXG4gICAgICBuZXdQYXRoLm9uKCdtb3ZpbmcnLCB0aGlzLm9uTGlua01vdmluZy5iaW5kKHRoaXMpKTtcclxuICAgICAgbmV3UGF0aC5vbignbW92ZWQnLCB0aGlzLm9uTGlua01vdmVkLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgY29uc3QgdG9CaW5kID0gW1xyXG4gICAgICAgIHRoaXMuYXJyb3dIZWFkLFxyXG4gICAgICAgIHRoaXMuYXJyb3dUYWlsLFxyXG4gICAgICBdO1xyXG4gICAgICBjb25zdCBib3NzVHJhbnNmb3JtID0gbmV3UGF0aC5jYWxjVHJhbnNmb3JtTWF0cml4KCk7XHJcbiAgICAgIGNvbnN0IGludmVydGVkQm9zc1RyYW5zZm9ybSA9IGZhYnJpYy51dGlsLmludmVydFRyYW5zZm9ybShib3NzVHJhbnNmb3JtKTtcclxuICAgICAgdG9CaW5kLmZvckVhY2goKG8pID0+IHtcclxuICAgICAgICBjb25zdCBkZXNpcmVkVHJhbnNmb3JtID0gZmFicmljLnV0aWwubXVsdGlwbHlUcmFuc2Zvcm1NYXRyaWNlcyhcclxuICAgICAgICAgIGludmVydGVkQm9zc1RyYW5zZm9ybSxcclxuICAgICAgICAgIG8uY2FsY1RyYW5zZm9ybU1hdHJpeCgpLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXHJcbiAgICAgICAgby5yZWxhdGlvbnNoaXAgPSBkZXNpcmVkVHJhbnNmb3JtO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMucGF0aCA9IG5ld1BhdGg7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhdGguc2V0KCdwYXRoJywgcGF0aENvb3Jkc0FycmF5KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBVcGRhdGUgY29udHJvbCBsaW5lcywgYXJyb3cgaGVhZHMgYW5kIHRhaWxzXHJcbiAgICBjb25zdCBhcnJvd0hlYWRBbmdsZSA9IChNYXRoLmF0YW4yKHRoaXMucGF0aC5wYXRoWzJdWzZdIC0gdGhpcy5wYXRoLnBhdGhbMl1bNF0sIHRoaXMucGF0aC5wYXRoWzJdWzVdIC0gdGhpcy5wYXRoLnBhdGhbMl1bM10pICogMTgwKSAvIE1hdGguUEk7XHJcbiAgICB0aGlzLmFycm93SGVhZC5hbmdsZSA9IGFycm93SGVhZEFuZ2xlICsgOTA7XHJcbiAgICB0aGlzLmFycm93SGVhZC5sZWZ0ID0gdGhpcy5wYXRoLnBhdGhbMl1bNV07XHJcbiAgICB0aGlzLmFycm93SGVhZC50b3AgPSB0aGlzLnBhdGgucGF0aFsyXVs2XTtcclxuICAgIHRoaXMuYXJyb3dIZWFkLnNldENvb3JkcygpO1xyXG4gICAgdGhpcy5hcnJvd1RhaWwubGVmdCA9IHRoaXMucGF0aC5wYXRoWzBdWzFdO1xyXG4gICAgdGhpcy5hcnJvd1RhaWwudG9wID0gdGhpcy5wYXRoLnBhdGhbMF1bMl07XHJcbiAgICB0aGlzLmFycm93VGFpbC5zZXRDb29yZHMoKTtcclxuXHJcbiAgICB0aGlzLmJyaW5nVG9Gcm9udCgpO1xyXG4gIH1cclxuXHJcbiAgaXNWYWxpZENvbm5lY3Rpb24obGlua1BvaW50LCBzaGFwZUlkLCBjYXJkaW5hbCkge1xyXG4gICAgY29uc3Qgc2hhcGUgPSB0aGlzLmNhbnZhcy5nZXRPYmplY3RzKClcclxuICAgICAgLmZpbmQoKG8pID0+IG8uaWQgPT09IHNoYXBlSWQpO1xyXG4gICAgLy8gQ2hlY2sgbm90IGFscmVhZHkgY29ubmVjdGVkXHJcbiAgICBpZiAobGlua1BvaW50ID09PSAnc3RhcnQnKSB7XHJcbiAgICAgIGlmICh0aGlzLnN0YXJ0ICYmIHRoaXMuc3RhcnQuc2hhcGUgJiYgdGhpcy5zdGFydC5zaGFwZS5pZCA9PT0gc2hhcGUuaWQgJiYgdGhpcy5zdGFydC5jYXJkaW5hbCA9PT0gY2FyZGluYWwpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIHRyeWluZyBlbmQgc2V0IHRoZSBzYW1lIGFscmVhZHkgY29ubmVjdGVkIGFuY2hvclxyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLmVuZCAmJiB0aGlzLmVuZC5zaGFwZSAmJiB0aGlzLmVuZC5zaGFwZS5pZCA9PT0gc2hhcGUuaWQpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIHRyeWluZyBlbmQgc2hvcnQgY2lyY3VpdCB0aGUgcmVjdGFuZ2xlXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAobGlua1BvaW50ID09PSAnZW5kJykge1xyXG4gICAgICBpZiAodGhpcy5lbmQgJiYgdGhpcy5lbmQuc2hhcGUgJiYgdGhpcy5lbmQuc2hhcGUuaWQgPT09IHNoYXBlLmlkICYmIHRoaXMuZW5kLmNhcmRpbmFsID09PSBjYXJkaW5hbCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTsgLy8gdHJ5aW5nIGVuZCBzZXQgdGhlIHNhbWUgYWxyZWFkeSBjb25uZWN0ZWQgYW5jaG9yXHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuc3RhcnQgJiYgdGhpcy5zdGFydC5zaGFwZSAmJiB0aGlzLnN0YXJ0LnNoYXBlLmlkID09PSBzaGFwZS5pZCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTsgLy8gdHJ5aW5nIGVuZCBzaG9ydCBjaXJjdWl0IHRoZSByZWN0YW5nbGVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVBbGxBbmNob3JzT3BhY2l0eShvcGFjaXR5KSB7XHJcbiAgICByZXR1cm47XHJcblxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVucmVhY2hhYmxlXHJcbiAgICBjb25zdCBhbmNob3JzID0gdGhpcy5jYW52YXMuZ2V0T2JqZWN0cygpXHJcbiAgICAgIC5maWx0ZXIoKG8pID0+IG8udHlwZSA9PT0gJ2FuY2hvcicpO1xyXG5cclxuICAgIC8vIGNvbnN0IHByb21pc2VzID0gW107XHJcbiAgICAvLyBjb25zdCBwcm9taXNlRmFjdG9yeSA9IGZ1bmN0aW9uIChhbmNob3IpIHtcclxuICAgIC8vICAgcmV0dXJuIGZ1bmN0aW9uIChyZXNvbHZlKSB7XHJcbiAgICAvLyAgICAgYW5jaG9yLmFuaW1hdGUoJ29wYWNpdHknLCBvcGFjaXR5LCB7XHJcbiAgICAvLyAgICAgICBkdXJhdGlvbjogMzAwLFxyXG4gICAgLy8gICAgICAgb25DaGFuZ2U6IHJlc29sdmUsXHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyAgIH07XHJcbiAgICAvLyB9O1xyXG4gICAgLy8gZm9yIChsZXQgYSA9IDA7IGEgPCBhbmNob3JzLmxlbmd0aDsgYSArPSAxKSB7XHJcbiAgICAvLyAgIGlmIChsb2NrICE9PSB1bmRlZmluZWQpIGFuY2hvcnNbYV0ubG9ja09wYWNpdHkgPSBsb2NrO1xyXG4gICAgLy8gICBwcm9taXNlcy5wdXNoKG5ldyBQcm9taXNlKHByb21pc2VGYWN0b3J5KGFuY2hvcnNbYV0pKSk7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiB7XHJcbiAgICAvLyAgIHRoaXMuY2FudmFzLnJlbmRlckFsbCgpO1xyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgZm9yIChsZXQgYSA9IDA7IGEgPCBhbmNob3JzLmxlbmd0aDsgYSArPSAxKSB7XHJcbiAgICAgIC8vIGlmIChsb2NrICE9PSB1bmRlZmluZWQpIGFuY2hvcnNbYV0ubG9ja09wYWNpdHkgPSBsb2NrO1xyXG4gICAgICBhbmNob3JzW2FdLnNldCgnb3BhY2l0eScsIG9wYWNpdHkpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jYW52YXMucmVuZGVyQWxsKCk7XHJcbiAgfVxyXG5cclxuICBvbkxpbmtNb3ZpbmcoKSB7XHJcbiAgICAvLyBNb3ZlIHN0YXJ0LCBlbmQsIGNvbnRyb2wgcG9pbnRzIGFsdG9nZXRoZXIgd2l0aCB0aGUgUGF0aFxyXG4gICAgY29uc3QgdG9VcGRhdGUgPSBbXHJcbiAgICAgIHRoaXMuYXJyb3dIZWFkLFxyXG4gICAgICB0aGlzLmFycm93VGFpbCxcclxuICAgIF07XHJcblxyXG4gICAgY29uc3Qga2VlcEhlYWRBbmdsZSA9IHRoaXMuYXJyb3dIZWFkLmFuZ2xlO1xyXG4gICAgY29uc3Qga2VlcFRhaWxBbmdsZSA9IHRoaXMuYXJyb3dUYWlsLmFuZ2xlO1xyXG5cclxuICAgIHRvVXBkYXRlLmZvckVhY2goKG8pID0+IHtcclxuICAgICAgaWYgKCFvLnJlbGF0aW9uc2hpcCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCB7IHJlbGF0aW9uc2hpcCB9ID0gbztcclxuICAgICAgY29uc3QgbmV3VHJhbnNmb3JtID0gZmFicmljLnV0aWwubXVsdGlwbHlUcmFuc2Zvcm1NYXRyaWNlcyhcclxuICAgICAgICB0aGlzLnBhdGguY2FsY1RyYW5zZm9ybU1hdHJpeCgpLFxyXG4gICAgICAgIHJlbGF0aW9uc2hpcCxcclxuICAgICAgKTtcclxuICAgICAgY29uc3Qgb3B0ID0gZmFicmljLnV0aWwucXJEZWNvbXBvc2UobmV3VHJhbnNmb3JtKTtcclxuICAgICAgby5zZXQoe1xyXG4gICAgICAgIGZsaXBYOiBmYWxzZSxcclxuICAgICAgICBmbGlwWTogZmFsc2UsXHJcbiAgICAgIH0pO1xyXG4gICAgICBvLnNldFBvc2l0aW9uQnlPcmlnaW4oXHJcbiAgICAgICAgeyB4OiBvcHQudHJhbnNsYXRlWCwgeTogb3B0LnRyYW5zbGF0ZVkgfSxcclxuICAgICAgICAnY2VudGVyJyxcclxuICAgICAgICAnY2VudGVyJyxcclxuICAgICAgKTtcclxuICAgICAgby5zZXQob3B0KTtcclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXHJcbiAgICAgIG8uYW5nbGUgPSAobyA9PT0gdGhpcy5hcnJvd0hlYWQpID8ga2VlcEhlYWRBbmdsZSA6IGtlZXBUYWlsQW5nbGU7IC8vIHByZXNlcnZlIHByZXZpb3VzIGFuZ2xlXHJcblxyXG4gICAgICBvLnNldENvb3JkcygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gRmluYWxseSwgY2hlY2sgdGhlIHN0YXJ0IG9yIGVuZCBwb2ludHMgY2FuIGJlIGNvbm5lY3RlZC5cclxuICAgIHRoaXMuX2NoZWNrRXh0cmVtaXR5Q2FuQmVDb25uZWN0ZWQoJ3N0YXJ0Jyk7XHJcbiAgICB0aGlzLl9jaGVja0V4dHJlbWl0eUNhbkJlQ29ubmVjdGVkKCdlbmQnKTtcclxuICB9XHJcblxyXG4gIG9uTGlua01vdmVkKCkge1xyXG4gICAgLy8gUmV1cGRhdGUgdGhlIFBhdGggYWNjb3JkaW5nIGVuZCB0aGUgbmV3IGNvb3JkaW5hdGVzIG9mIGFsbCBlbGVtZW50c1xyXG4gICAgdGhpcy51cGRhdGVQYXRoKHtcclxuICAgICAgc3RhcnQ6IHtcclxuICAgICAgICB4OiB0aGlzLmFycm93VGFpbC5sZWZ0LFxyXG4gICAgICAgIHk6IHRoaXMuYXJyb3dUYWlsLnRvcCxcclxuICAgICAgfSxcclxuICAgICAgZW5kOiB7XHJcbiAgICAgICAgeDogdGhpcy5hcnJvd0hlYWQubGVmdCxcclxuICAgICAgICB5OiB0aGlzLmFycm93SGVhZC50b3AsXHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbW1pdDogdHJ1ZSxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIENvbm5lY3Qgb3IgRGlzY29ubmVjdCBkZXBlbmRpbmcgb24gZXh0cmVtaXRpZXMgcG9zaXRpb25zXHJcbiAgICB0aGlzLmlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2suc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICB0aGlzLmlzVmFsaWRIZWFkQ29ubmVjdGlvbk1hc2suc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICB0aGlzLl9jb25uZWN0RGlzY29ubmVjdEV4dHJlbWl0eSgnc3RhcnQnKTtcclxuICAgIHRoaXMuX2Nvbm5lY3REaXNjb25uZWN0RXh0cmVtaXR5KCdlbmQnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhlbHBlciBlbmQgZGlzcGxheSBhIHZhbGlkIGNpcmNsZSBtYXNrIG9uIHNwZWNpZmljIGNvbmRpdGlvbnMuXHJcbiAgICogSWYgdGhlIGV4dHJlbWl0eSBpcyB0b3VjaGluZyBhbiBhbmNob3Igb2YgYSBMaW5rYWJsZVNoYXBlIHN0YXJ0IHdoaWNoIGl0IGlzIG5vdCB5ZXQgY29ubmVjdGVkID0+IHNob3cgR1JFRU5cclxuICAgKiBJZiB0aGUgZXh0cmVtaXR5IGlzIHRvdWNoaW5nIGFuIGFuY2hvciBvZiBhIExpbmthYmxlU2hhcGUgc3RhcnQgd2hpY2ggaXQgaXMgYWxyZWFkeSBjb25uZWN0ZWQgYnkgdGhlIG90aGVyIGV4dHJlbWl0eSA9PiBzaG93IFJFRFxyXG4gICAqIEBwYXJhbSBkaXJlY3Rpb25cclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9jaGVja0V4dHJlbWl0eUNhbkJlQ29ubmVjdGVkKGRpcmVjdGlvbikge1xyXG4gICAgY29uc3QgeyBjYW52YXMgfSA9IHRoaXM7XHJcblxyXG4gICAgbGV0IGV4dHJlbWl0eTtcclxuICAgIGxldCBtYXNrO1xyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3N0YXJ0Jykge1xyXG4gICAgICBleHRyZW1pdHkgPSB0aGlzLmFycm93VGFpbDtcclxuICAgICAgbWFzayA9IHRoaXMuaXNWYWxpZFRhaWxDb25uZWN0aW9uTWFzaztcclxuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnZW5kJykge1xyXG4gICAgICBleHRyZW1pdHkgPSB0aGlzLmFycm93SGVhZDtcclxuICAgICAgbWFzayA9IHRoaXMuaXNWYWxpZEhlYWRDb25uZWN0aW9uTWFzaztcclxuICAgIH1cclxuXHJcbiAgICBtYXNrLmxlZnQgPSBleHRyZW1pdHkubGVmdDtcclxuICAgIG1hc2sudG9wID0gZXh0cmVtaXR5LnRvcDtcclxuICAgIG1hc2suc2V0Q29vcmRzKCk7XHJcbiAgICBtYXNrLnNldCgnb3BhY2l0eScsIDApO1xyXG5cclxuICAgIC8vIENoZWNrIGlmIGludGVyc2VjdHMgd2l0aCBhbmNob3JcclxuICAgIGNvbnN0IGFuY2hvcnMgPSBjYW52YXMuZ2V0T2JqZWN0cygpXHJcbiAgICAgIC5maWx0ZXIoKG8pID0+IG8udHlwZSA9PT0gJ2FuY2hvcicpO1xyXG4gICAgZm9yIChsZXQgYSA9IDA7IGEgPCBhbmNob3JzLmxlbmd0aDsgYSArPSAxKSB7XHJcbiAgICAgIGlmIChleHRyZW1pdHkuaW50ZXJzZWN0c1dpdGhPYmplY3QoYW5jaG9yc1thXSkpIHtcclxuICAgICAgICBtYXNrLnNldCgnb3BhY2l0eScsIDAuNSk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZENvbm5lY3Rpb24oZGlyZWN0aW9uLCBhbmNob3JzW2FdLnNoYXBlSWQsIGFuY2hvcnNbYV0uY2FyZGluYWwpKSB7XHJcbiAgICAgICAgICBtYXNrLnNldCh7XHJcbiAgICAgICAgICAgIHN0cm9rZTogJyM1N2I4NTcnLFxyXG4gICAgICAgICAgICBmaWxsOiAnIzU3Yjg1NycsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGNvbnN0IG9wdHMgPSB7XHJcbiAgICAgICAgICAgIGNvbW1pdDogZmFsc2UsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgb3B0c1tkaXJlY3Rpb25dID0ge1xyXG4gICAgICAgICAgICB4OiBleHRyZW1pdHkubGVmdCxcclxuICAgICAgICAgICAgeTogZXh0cmVtaXR5LnRvcCxcclxuICAgICAgICAgICAgZGlyZWN0aW9uOiBhbmNob3JzW2FdLmNhcmRpbmFsLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHRoaXMudXBkYXRlUGF0aChvcHRzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbWFzay5zZXQoe1xyXG4gICAgICAgICAgICBzdHJva2U6ICcjZWE0ZjM3JyxcclxuICAgICAgICAgICAgZmlsbDogJyNlYTRmMzcnLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIZWxwZXIgZW5kIGV4ZWN1dGUgY29ubmVjdC9kaXNjb25uZWN0IGRlcGVuZGluZyBvbiBzcGVjaWZpYyBjb25kaXRpb25zLlxyXG4gICAqIElmIHRoZSBleHRyZW1pdHkgd2FzIGNvbm5lY3RlZCBBTkQgaXQgaXMgTk9UIHRvdWNoaW5nIHRoZSBhbmNob3IgYW55bW9yZSA9PiBkaXNjb25uZWN0IGl0LlxyXG4gICAqIElmIHRoZSBleHRyZW1pdHkgd2FzIGRpc2Nvbm5lY3RlZCBBTkQgaXQgaXMgdG91Y2hpbmcgdGhlIGFuY2hvciA9PiBjb25uZWN0IGl0LlxyXG4gICAqIEBwYXJhbSBkaXJlY3Rpb25cclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9jb25uZWN0RGlzY29ubmVjdEV4dHJlbWl0eShkaXJlY3Rpb24pIHtcclxuICAgIGNvbnN0IHsgY2FudmFzIH0gPSB0aGlzO1xyXG5cclxuICAgIGxldCBleHRyZW1pdHk7XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSAnc3RhcnQnKSB7XHJcbiAgICAgIGV4dHJlbWl0eSA9IHRoaXMuYXJyb3dUYWlsO1xyXG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdlbmQnKSB7XHJcbiAgICAgIGV4dHJlbWl0eSA9IHRoaXMuYXJyb3dIZWFkO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENoZWNrIGlmIGludGVyc2VjdHMgd2l0aCBhbmNob3JcclxuICAgIGNvbnN0IGFuY2hvcnMgPSBjYW52YXMuZ2V0T2JqZWN0cygpXHJcbiAgICAgIC5maWx0ZXIoKG8pID0+IG8udHlwZSA9PT0gJ2FuY2hvcicpO1xyXG4gICAgZm9yIChsZXQgYSA9IDA7IGEgPCBhbmNob3JzLmxlbmd0aDsgYSArPSAxKSB7XHJcbiAgICAgIGlmIChleHRyZW1pdHkuaW50ZXJzZWN0c1dpdGhPYmplY3QoYW5jaG9yc1thXSkpIHtcclxuICAgICAgICB0aGlzLmNvbm5lY3RMaW5rKGRpcmVjdGlvbiwgYW5jaG9yc1thXS5zaGFwZUlkLCBhbmNob3JzW2FdLmNhcmRpbmFsKTtcclxuICAgICAgICAvLyBhbmNob3JzW2FdLnNldCgnc3Ryb2tlJywgJyMwMDAnKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzW2RpcmVjdGlvbl0gJiYgYW5jaG9yc1thXSA9PT0gdGhpc1tkaXJlY3Rpb25dLnNoYXBlLmFuY2hvcnNbdGhpc1tkaXJlY3Rpb25dLmFuY2hvcl0pIHtcclxuICAgICAgICAvLyBJZiB0aGlzIGxpbmsgd2FzIGNvbm5lY3RlZCBlbmQgdGhpcyBhbmNob3IgYW5kIGl0IGRvZXNuJ3QgaW50ZXJzZWN0IGFueW1vcmVcclxuICAgICAgICB0aGlzLmRpc2Nvbm5lY3RMaW5rKGRpcmVjdGlvbik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IExpbmthYmxlU2hhcGUgZnJvbSAnLi9MaW5rYWJsZVNoYXBlLmpzJztcclxuaW1wb3J0IEN1cnZlZExpbmsgZnJvbSAnLi9DdXJ2ZWRMaW5rLmpzJztcclxuXHJcbmNvbnN0IHsgZmFicmljLCBfIH0gPSB3aW5kb3c7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFeHBhbmRhYmxlQ29udGFpbmVyIGV4dGVuZHMgTGlua2FibGVTaGFwZSB7XHJcbiAgLyoqXHJcbiAgICogQSBDb250YWluZXIgaXMgYSBSZWN0IHdpdGggYW4gSVRleHQuIENhbiBiZSBleHBhbmRlZCB0byByZXZlYWwgY29udGFpbmVkIFNoYXBlcy5cclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgb3B0aW9uc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtGYWJyaWMuQ2FudmFzfSAgIG9wdGlvbnMuY2FudmFzIC0gRmFicmljIGNhbnZhc1xyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICBvcHRpb25zLmlkIC0gVW5pcXVlIGlkZW50aWZpZXIgKHBoeXNpY2FsIGlkIG9mIHRoZSBvYmplY3QpXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIG9wdGlvbnMud2lkdGhcclxuICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgb3B0aW9ucy5oZWlnaHRcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgb3B0aW9ucy5sYWJlbFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBvcHRpb25zLmltZ1xyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICBvcHRpb25zLmltZy5zcmMgLSBVUkwgb2YgYW4gaWNvbiAocmVwcmVzZW50aW5nIHRoZSB0eXBlIG9mIHRoZSBvYmplY3QpXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIG9wdGlvbnMuY2hpbGRXaWR0aFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBvcHRpb25zLmNoaWxkSGVpZ2h0XHJcbiAgICogQHBhcmFtIHtBcnJheX0gICAgICAgICAgIG9wdGlvbnMuY2hpbGRyZW5cclxuICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgb3B0aW9ucy5jaGlsZHJlbi4kLmlkIC0gVW5pcXVlIGNoaWxkcmVuIGlkZW50aWZpZXIgKHBoeXNpY2FsIGlkIG9mIHRoZSBjaGlsZClcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgb3B0aW9ucy5jaGlsZHJlbi4kLmxhYmVsXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIG9wdGlvbnMuY2hpbGRyZW4uJC5pbmRleFxyXG4gICAqIEBwYXJhbiB7T2JqZWN0fSAgICAgICAgICBvcHRpb25zLmNoaWxkcmVuLiQuaW1nXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG9wdGlvbnMuY2hpbGRyZW4uJC5pbWcuc3JjIC0gVVJMIG9mIGFuIGljb24gKHJlcHJlc2VudGluZyB0aGUgdHlwZSBvZiB0aGUgb2JqZWN0KVxyXG4gICAqXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgY29uc3QgZ3JvdXAgPSBuZXcgZmFicmljLkdyb3VwKFtdLCB7XHJcbiAgICAgIGxlZnQ6IG9wdGlvbnMubGVmdCxcclxuICAgICAgdG9wOiBvcHRpb25zLnRvcCxcclxuICAgICAgb3JpZ2luWDogJ2xlZnQnLFxyXG4gICAgICBvcmlnaW5ZOiAndG9wJyxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgbmV3T3B0aW9ucyA9IF8uY2xvbmVEZWVwKF8ub21pdChvcHRpb25zLCBbJ2NhbnZhcycsICdzaGFwZSddKSk7XHJcbiAgICBuZXdPcHRpb25zLmNhbnZhcyA9IG9wdGlvbnMuY2FudmFzO1xyXG4gICAgbmV3T3B0aW9ucy5zaGFwZSA9IGdyb3VwO1xyXG4gICAgc3VwZXIobmV3T3B0aW9ucyk7XHJcblxyXG4gICAgdGhpcy5zaGFwZXMgPSB7fTtcclxuICAgIHRoaXMuY2hpbGRyZW4gPSBBcnJheS5pc0FycmF5KG9wdGlvbnMuY2hpbGRyZW4pID8gb3B0aW9ucy5jaGlsZHJlbiA6IFtdO1xyXG4gICAgdGhpcy5pc0V4cGFuZGVkID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBhc3luYyBsb2FkKGlzQ2hpbGQpIHtcclxuICAgIGNvbnN0IHsgb3B0aW9ucywgc2hhcGUgfSA9IHRoaXM7XHJcblxyXG4gICAgdGhpcy5pc0xvYWRlZCA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0IHNoYXBlUG9zID0ge1xyXG4gICAgICBsZWZ0OiB0aGlzLnNoYXBlLmxlZnQsXHJcbiAgICAgIHRvcDogdGhpcy5zaGFwZS50b3AsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgcGFkZGluZyA9IDEwO1xyXG4gICAgY29uc3QgbWFyZ2luID0gMTA7XHJcbiAgICBjb25zdCByZWN0T3B0cyA9IHtcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBvcmlnaW5YOiAnbGVmdCcsXHJcbiAgICAgIG9yaWdpblk6ICd0b3AnLFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgc3Ryb2tlOiAnIzY2NicsXHJcbiAgICAgIGZpbGw6ICcjZmZmJyxcclxuICAgICAgcng6IDQsXHJcbiAgICAgIHJ5OiA0LFxyXG4gICAgfTtcclxuICAgIGxldCBpbWdPcHRzO1xyXG4gICAgaWYgKGlzQ2hpbGQpIHtcclxuICAgICAgcmVjdE9wdHMud2lkdGggPSBvcHRpb25zLndpZHRoID8gb3B0aW9ucy53aWR0aCA6IDcwO1xyXG4gICAgICByZWN0T3B0cy5oZWlnaHQgPSBvcHRpb25zLmhlaWdodCA/IG9wdGlvbnMuaGVpZ2h0IDogNzA7XHJcbiAgICAgIC8vIGltZ09wdHMgPSB7XHJcbiAgICAgIC8vICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIC8vICAgb3JpZ2luWTogJ3RvcCcsXHJcbiAgICAgIC8vICAgbGVmdDogcmVjdE9wdHMud2lkdGggLyAyLFxyXG4gICAgICAvLyAgIHRvcDogcGFkZGluZyxcclxuICAgICAgLy8gICB3aWR0aDogMjIsXHJcbiAgICAgIC8vICAgaGVpZ2h0OiAyMixcclxuICAgICAgLy8gfTtcclxuICAgICAgaW1nT3B0cyA9IHtcclxuICAgICAgICBvcmlnaW5YOiAnbGVmdCcsXHJcbiAgICAgICAgb3JpZ2luWTogJ3RvcCcsXHJcbiAgICAgICAgbGVmdDogcGFkZGluZyxcclxuICAgICAgICB0b3A6IHBhZGRpbmcsXHJcbiAgICAgICAgd2lkdGg6IDIyLFxyXG4gICAgICAgIGhlaWdodDogMjIsXHJcbiAgICAgIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpbWdPcHRzID0ge1xyXG4gICAgICAgIG9yaWdpblg6ICdsZWZ0JyxcclxuICAgICAgICBvcmlnaW5ZOiAndG9wJyxcclxuICAgICAgICBsZWZ0OiBwYWRkaW5nLFxyXG4gICAgICAgIHRvcDogcGFkZGluZyxcclxuICAgICAgICB3aWR0aDogMjIsXHJcbiAgICAgICAgaGVpZ2h0OiAyMixcclxuICAgICAgfTtcclxuICAgICAgcmVjdE9wdHMud2lkdGggPSBvcHRpb25zLndpZHRoID8gb3B0aW9ucy53aWR0aCA6IDIwMDtcclxuICAgICAgcmVjdE9wdHMuaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQgPyBvcHRpb25zLmhlaWdodCA6IChpbWdPcHRzLmhlaWdodCArIHBhZGRpbmcgKiAyKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDcmVhdGUgUmVjdCBzaGFwZVxyXG4gICAgY29uc3QgcmVjdCA9IG5ldyBmYWJyaWMuUmVjdChyZWN0T3B0cyk7XHJcbiAgICB0aGlzLnNoYXBlLmFkZFdpdGhVcGRhdGUocmVjdCk7XHJcbiAgICB0aGlzLnNoYXBlcy5yZWN0ID0gcmVjdDtcclxuXHJcbiAgICBsZXQgdGV4dE9wdHM7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmltZyAmJiB0aGlzLm9wdGlvbnMuaW1nLnNyYykge1xyXG4gICAgICAvLyBMb2FkIGltYWdlIGFuZCBjcmVhdGUgSW1hZ2Ugc2hhcGVcclxuICAgICAgY29uc3Qgb0ltZyA9IGF3YWl0IHRoaXMuX2xvYWRJbWFnZSh0aGlzLm9wdGlvbnMuaW1nLnNyYyk7XHJcbiAgICAgIG9JbWcuc2V0KGltZ09wdHMpO1xyXG4gICAgICB0aGlzLnNoYXBlLmFkZFdpdGhVcGRhdGUob0ltZyk7XHJcbiAgICAgIHRoaXMuc2hhcGVzLmltYWdlID0gb0ltZztcclxuXHJcbiAgICAgIGlmIChpc0NoaWxkKSB7XHJcbiAgICAgICAgLy8gQWxpZ24gdGhlIHRleHQgd2l0aGluIHRoZSByZWN0YW5nbGUsIHVuZGVyIHRoZSBpbWFnZVxyXG4gICAgICAgIC8vIENlbnRlciB0aGUgdGV4dCBpbiB0aGUgcmVjdFxyXG4gICAgICAgIC8vIHRleHRPcHRzID0ge1xyXG4gICAgICAgIC8vICAgc3R5bGVzOiB7IH0sXHJcbiAgICAgICAgLy8gICBmb250U2l6ZTogMTQsXHJcbiAgICAgICAgLy8gICBmb250RmFtaWx5OiAnSGVsdmV0aWNhJyxcclxuICAgICAgICAvLyAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgLy8gICBzcGxpdEJ5R3JhcGhlbWU6IHRydWUsXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICAgIC8vICAgb3JpZ2luWTogJ3RvcCcsXHJcbiAgICAgICAgLy8gICBsZWZ0OiByZWN0LndpZHRoIC8gMixcclxuICAgICAgICAvLyAgIHRvcDogcGFkZGluZyArIGltZ09wdHMuaGVpZ2h0ICsgbWFyZ2luLFxyXG4gICAgICAgIC8vICAgd2lkdGg6IHJlY3RPcHRzLndpZHRoIC0gcGFkZGluZyAqIDIsXHJcbiAgICAgICAgLy8gICBoZWlnaHQ6IHJlY3RPcHRzLmhlaWdodCAtIHBhZGRpbmcgKiAyLFxyXG4gICAgICAgIC8vIH07XHJcblxyXG4gICAgICAgIHRleHRPcHRzID0ge1xyXG4gICAgICAgICAgc3R5bGVzOiB7IH0sXHJcbiAgICAgICAgICBmb250U2l6ZTogMTQsXHJcbiAgICAgICAgICBmb250RmFtaWx5OiAnSGVsdmV0aWNhJyxcclxuICAgICAgICAgIHRleHRBbGlnbjogJ2xlZnQnLFxyXG4gICAgICAgICAgc3BsaXRCeUdyYXBoZW1lOiB0cnVlLFxyXG4gICAgICAgICAgZmlsbDogJyMwMDAnLFxyXG4gICAgICAgICAgb3JpZ2luWDogJ2xlZnQnLFxyXG4gICAgICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgICAgICBsZWZ0OiBwYWRkaW5nICsgb0ltZy53aWR0aCArIG1hcmdpbixcclxuICAgICAgICAgIHRvcDogcGFkZGluZyArIG9JbWcuaGVpZ2h0IC8gMixcclxuICAgICAgICAgIHdpZHRoOiByZWN0LndpZHRoIC0gcGFkZGluZyAtIG9JbWcud2lkdGggLSBtYXJnaW4gKiAyLFxyXG4gICAgICAgICAgaGVpZ2h0OiBvSW1nLmhlaWdodCxcclxuICAgICAgICB9O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIEFsaWduIHRoZSB0ZXh0IHdpdGggdGhlIGltYWdlXHJcbiAgICAgICAgdGV4dE9wdHMgPSB7XHJcbiAgICAgICAgICBzdHlsZXM6IHsgfSxcclxuICAgICAgICAgIGZvbnRTaXplOiAxNCxcclxuICAgICAgICAgIGZvbnRGYW1pbHk6ICdIZWx2ZXRpY2EnLFxyXG4gICAgICAgICAgdGV4dEFsaWduOiAnbGVmdCcsXHJcbiAgICAgICAgICBzcGxpdEJ5R3JhcGhlbWU6IHRydWUsXHJcbiAgICAgICAgICBmaWxsOiAnIzAwMCcsXHJcbiAgICAgICAgICBvcmlnaW5YOiAnbGVmdCcsXHJcbiAgICAgICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgICAgIGxlZnQ6IHBhZGRpbmcgKyBvSW1nLndpZHRoICsgbWFyZ2luLFxyXG4gICAgICAgICAgdG9wOiBwYWRkaW5nICsgb0ltZy5oZWlnaHQgLyAyLFxyXG4gICAgICAgICAgd2lkdGg6IHJlY3Qud2lkdGggLSBwYWRkaW5nIC0gb0ltZy53aWR0aCAtIG1hcmdpbiAqIDIsXHJcbiAgICAgICAgICBoZWlnaHQ6IG9JbWcuaGVpZ2h0LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIENlbnRlciB0aGUgdGV4dCBpbiB0aGUgcmVjdFxyXG4gICAgICB0ZXh0T3B0cyA9IHtcclxuICAgICAgICBzdHlsZXM6IHsgfSxcclxuICAgICAgICBmb250U2l6ZTogMTQsXHJcbiAgICAgICAgZm9udEZhbWlseTogJ0hlbHZldGljYScsXHJcbiAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICBzcGxpdEJ5R3JhcGhlbWU6IHRydWUsXHJcbiAgICAgICAgZmlsbDogJyMwMDAnLFxyXG4gICAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICAgIGxlZnQ6IHJlY3Qud2lkdGggLyAyLFxyXG4gICAgICAgIHRvcDogcmVjdC5oZWlnaHQgLyAyLFxyXG4gICAgICAgIHdpZHRoOiByZWN0T3B0cy53aWR0aCAtIHBhZGRpbmcgKiAyLFxyXG4gICAgICAgIGhlaWdodDogcmVjdE9wdHMuaGVpZ2h0IC0gcGFkZGluZyAqIDIsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ3JlYXRlIFRleHRib3ggc2hhcGVcclxuICAgIGNvbnN0IHRleHQgPSBuZXcgZmFicmljLlRleHRib3gob3B0aW9ucy5sYWJlbCwgdGV4dE9wdHMpO1xyXG4gICAgaWYgKCFvcHRpb25zLmhpZGVUZXh0KSB7XHJcbiAgICAgIHRoaXMuc2hhcGUuYWRkV2l0aFVwZGF0ZSh0ZXh0KTtcclxuICAgIH1cclxuICAgIHRoaXMuc2hhcGVzLnRleHQgPSB0ZXh0O1xyXG5cclxuICAgIC8vIFJlcG9zaXRpb24gdGhlIGdyb3VwIGFjY29yZGluZ2x5XHJcbiAgICB0aGlzLnNoYXBlLmxlZnQgPSBzaGFwZVBvcy5sZWZ0O1xyXG4gICAgdGhpcy5zaGFwZS50b3AgPSBzaGFwZVBvcy50b3A7XHJcbiAgICB0aGlzLnNoYXBlLnNldENvb3JkcygpO1xyXG4gICAgdGhpcy5jYW52YXMucmVuZGVyQWxsKCk7XHJcblxyXG4gICAgLy8gU2V0IHRoZSBzaGFwZSBhcyBub3Qgc2VsZWN0YWJsZSBpZiBpdCBpcyBhIGNoaWxkXHJcbiAgICBpZiAoaXNDaGlsZCkge1xyXG4gICAgICB0aGlzLnNoYXBlLnNlbGVjdGFibGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZW1lbWJlciBpbml0aWFsIG9wdGlvbnMgYXMgY29sbGFwc2VkXHJcbiAgICB0aGlzLmluaXRpYWxPcHRzID0ge1xyXG4gICAgICByZWN0OiB7XHJcbiAgICAgICAgd2lkdGg6IHJlY3RPcHRzLndpZHRoLFxyXG4gICAgICAgIGhlaWdodDogcmVjdE9wdHMuaGVpZ2h0LFxyXG4gICAgICB9LFxyXG4gICAgICBjaGlsZDoge1xyXG4gICAgICAgIHdpZHRoOiBvcHRpb25zLmNoaWxkV2lkdGggPyBvcHRpb25zLmNoaWxkV2lkdGggOiA3MCxcclxuICAgICAgICBoZWlnaHQ6IG9wdGlvbnMuY2hpbGRIZWlnaHQgPyBvcHRpb25zLmNoaWxkSGVpZ2h0IDogNzAsXHJcbiAgICAgICAgLy8gd2lkdGg6IG9wdGlvbnMuY2hpbGRXaWR0aCA/IG9wdGlvbnMuY2hpbGRXaWR0aCA6IDUyLFxyXG4gICAgICAgIC8vIGhlaWdodDogb3B0aW9ucy5jaGlsZFdpZHRoID8gb3B0aW9ucy5jaGlsZFdpZHRoIDogNTIsXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENvbnN0cnVjdCBjaGlsZHJlbiBpZiB0aGlzIGlzIGEgbm9ybWFsIChwYXJlbnQpIENvbnRhaW5lclxyXG4gICAgaWYgKCFpc0NoaWxkKSB7XHJcbiAgICAgIGF3YWl0IHRoaXMuY29uc3RydWN0Q2hpbGRyZW4oKTtcclxuICAgIH1cclxuXHJcbiAgICBzaGFwZS5vbih7XHJcbiAgICAgIHNjYWxpbmc6ICgpID0+IHtcclxuICAgICAgICBpZiAodGV4dCkge1xyXG4gICAgICAgICAgLy8gV2hlbiBzY2FsaW5nLCBrZWVwIHRleHQgc2FtZSBzaXplIGFzIGluaXRpYWxcclxuICAgICAgICAgIGlmIChzaGFwZS5zY2FsZVggPCAxKSB7XHJcbiAgICAgICAgICAgIHRleHQuc2NhbGVYID0gMSArICgxIC0gc2hhcGUuc2NhbGVYKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRleHQuc2NhbGVYID0gMSAvIChzaGFwZS5zY2FsZVgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHNoYXBlLnNjYWxlWSA8IDEpIHtcclxuICAgICAgICAgICAgdGV4dC5zY2FsZVkgPSAxICsgKDEgLSBzaGFwZS5zY2FsZVkpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGV4dC5zY2FsZVkgPSAxIC8gKHNoYXBlLnNjYWxlWSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmNhbnZhcy5yZW5kZXJBbGwoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG1vdXNlZGJsY2xpY2s6ICgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5pc0V4cGFuZGVkKSB7XHJcbiAgICAgICAgICB0aGlzLmNvbGxhcHNlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuZXhwYW5kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5pc0xvYWRlZCA9IHRydWU7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBhc3luYyBfbG9hZEltYWdlKHNyYykge1xyXG4gICAgY29uc3QgdXJsID0gc3JjIHx8IHRoaXMub3B0aW9ucy5pbWcuc3JjO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIGZhYnJpYy5JbWFnZS5mcm9tVVJMKHVybCwgKG9JbWcpID0+IHtcclxuICAgICAgICByZXNvbHZlKG9JbWcpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgY29uc3RydWN0Q2hpbGRyZW4oKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGNhbnZhcywgc2hhcGUsIHNoYXBlcywgY2hpbGRyZW4sIGluaXRpYWxPcHRzLFxyXG4gICAgfSA9IHRoaXM7XHJcblxyXG4gICAgLy8gQ2FsY3VsYXRlIG5ldyBkaW1lbnNpb25zXHJcbiAgICBjb25zdCBwYWRkaW5nID0gMTA7XHJcbiAgICBjb25zdCBtYXJnaW4gPSAxMDtcclxuXHJcbiAgICBmb3IgKGxldCBjID0gMDsgYyA8IGNoaWxkcmVuLmxlbmd0aDsgYyArPSAxKSB7XHJcbiAgICAgIGNvbnN0IGNoaWxkID0gY2hpbGRyZW5bY107XHJcbiAgICAgIGNvbnN0IGNoaWxkQ29udGFpbmVyID0gbmV3IEV4cGFuZGFibGVDb250YWluZXIoe1xyXG4gICAgICAgIGNhbnZhcyxcclxuICAgICAgICBpZDogY2hpbGQuaWQsXHJcbiAgICAgICAgbGVmdDogc2hhcGUubGVmdCArIHBhZGRpbmcgKyAoaW5pdGlhbE9wdHMuY2hpbGQud2lkdGggKyBtYXJnaW4pICogYyArIChjID09PSBjaGlsZHJlbi5sZW5ndGggPyAtbWFyZ2luIDogMCksXHJcbiAgICAgICAgdG9wOiBzaGFwZS50b3AgKyBwYWRkaW5nICsgc2hhcGVzLmltYWdlLmhlaWdodCArIG1hcmdpbixcclxuICAgICAgICBhbmdsZTogMCxcclxuICAgICAgICBsYWJlbDogY2hpbGQubGFiZWwsXHJcbiAgICAgICAgaW1nOiB7XHJcbiAgICAgICAgICBzcmM6IGNoaWxkLmltZy5zcmMsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB3aWR0aDogaW5pdGlhbE9wdHMuY2hpbGQud2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OiBpbml0aWFsT3B0cy5jaGlsZC5oZWlnaHQsXHJcbiAgICAgICAgaGlkZVRleHQ6IGNoaWxkLmhpZGVUZXh0LFxyXG4gICAgICB9KTtcclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWF3YWl0LWluLWxvb3BcclxuICAgICAgYXdhaXQgY2hpbGRDb250YWluZXIubG9hZCh0cnVlKTtcclxuICAgICAgY2hpbGQuY29udGFpbmVyID0gY2hpbGRDb250YWluZXI7XHJcbiAgICB9XHJcbiAgICBzaGFwZS5hZGRXaXRoVXBkYXRlKCk7XHJcbiAgICBzaGFwZS5zZXRDb29yZHMoKTtcclxuICAgIGNhbnZhcy5yZW5kZXJBbGwoKTtcclxuICB9XHJcblxyXG4gIHNldEFjdGl2ZShhY3RpdmUpIHtcclxuICAgIGlmIChhY3RpdmUpIHtcclxuICAgICAgdGhpcy5zaGFwZXMucmVjdC5zZXQoJ3N0cm9rZScsICcjNzhiZWZhJyk7XHJcbiAgICAgIHRoaXMuc2hhcGVzLnRleHQuc2V0KCdmaWxsJywgJyM3OGJlZmEnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2hhcGVzLnJlY3Quc2V0KCdzdHJva2UnLCAnIzY2NicpO1xyXG4gICAgICB0aGlzLnNoYXBlcy50ZXh0LnNldCgnZmlsbCcsICcjMDAwJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBleHBhbmQoKSB7XHJcbiAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggIT09IDAgJiYgdGhpcy5pc0V4cGFuZGVkID09PSBmYWxzZSkge1xyXG4gICAgICBjb25zdCB7XHJcbiAgICAgICAgY2FudmFzLCBzaGFwZSwgc2hhcGVzLCBjaGlsZHJlbiwgaW5pdGlhbE9wdHMsXHJcbiAgICAgIH0gPSB0aGlzO1xyXG5cclxuICAgICAgLy8gQ2FsY3VsYXRlIG5ldyBkaW1lbnNpb25zXHJcbiAgICAgIGNvbnN0IHBhZGRpbmcgPSAxMDtcclxuICAgICAgY29uc3QgbWFyZ2luID0gMTA7XHJcbiAgICAgIGNvbnN0IG9sZFJlY3RXaWR0aCA9IHNoYXBlcy5yZWN0LndpZHRoO1xyXG4gICAgICBjb25zdCBvbGRSZWN0SGVpZ2h0ID0gc2hhcGVzLnJlY3QuaGVpZ2h0O1xyXG5cclxuICAgICAgY29uc3QgbmV3UmVjdFdpZHRoID0gTWF0aC5tYXgocGFkZGluZyAqIDIgKyBjaGlsZHJlbi5sZW5ndGggKiBpbml0aWFsT3B0cy5jaGlsZC53aWR0aFxyXG4gICAgICAgICsgKGNoaWxkcmVuLmxlbmd0aCAtIDEpICogbWFyZ2luLCBpbml0aWFsT3B0cy5yZWN0LndpZHRoKTtcclxuICAgICAgY29uc3QgbmV3UmVjdEhlaWdodCA9IGNoaWxkcmVuLmxlbmd0aCA+IDAgPyBwYWRkaW5nICsgc2hhcGVzLmltYWdlLmhlaWdodCArIG1hcmdpblxyXG4gICAgICAgICsgaW5pdGlhbE9wdHMuY2hpbGQuaGVpZ2h0ICsgcGFkZGluZyA6IGluaXRpYWxPcHRzLnJlY3QuaGVpZ2h0O1xyXG5cclxuICAgICAgLy8gVXBkYXRlIGFsbCBvdGhlciBjb250YWluZXJzIHRoYXQgYXJlIGJlbG93IGFuZC9vciBvbiB0aGUgcmlnaHQgb2YgdGhlIGN1cnJlbnQgc2hhcGUsIHRvIGF2b2lkIGNvbGxpc2lvblxyXG4gICAgICBzaGFwZXMucmVjdC5vcGFjaXR5ID0gMC43O1xyXG4gICAgICBjb25zdCBvdGhlclNoYXBlcyA9IE9iamVjdC52YWx1ZXMoY2FudmFzLmxpbmthYmxlU2hhcGVzKTtcclxuICAgICAgaWYgKG90aGVyU2hhcGVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICBjb25zdCBkZWx0YVggPSBuZXdSZWN0V2lkdGggLSBvbGRSZWN0V2lkdGg7XHJcbiAgICAgICAgY29uc3QgZGVsdGFZID0gbmV3UmVjdEhlaWdodCAtIG9sZFJlY3RIZWlnaHQ7XHJcbiAgICAgICAgZm9yIChsZXQgbyA9IDA7IG8gPCBvdGhlclNoYXBlcy5sZW5ndGg7IG8gKz0gMSkge1xyXG4gICAgICAgICAgY29uc3Qgc2hhcGVUb01vdmUgPSBvdGhlclNoYXBlc1tvXTtcclxuICAgICAgICAgIGlmIChzaGFwZVRvTW92ZS5pZCAhPT0gdGhpcy5pZCkge1xyXG4gICAgICAgICAgICAvLyBJZiBleHBhbmRlZCBTaGFwZSBpcyBhYm92ZSBBTkQgb24gdGhlIGxlZnQgb2YgdGhlIGN1cnJlbnQgc2hhcGVcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hhcGUuYUNvb3Jkcy5ici54IDw9IHNoYXBlVG9Nb3ZlLnNoYXBlLmFDb29yZHMudGwueCAmJiB0aGlzLnNoYXBlLmFDb29yZHMuYnIueSA8PSBzaGFwZVRvTW92ZS5zaGFwZS5hQ29vcmRzLnRsLnkpIHtcclxuICAgICAgICAgICAgICBzaGFwZVRvTW92ZS5tb3ZlKHtcclxuICAgICAgICAgICAgICAgIHg6IHNoYXBlVG9Nb3ZlLnNoYXBlLmxlZnQgKyBkZWx0YVgsXHJcbiAgICAgICAgICAgICAgICB5OiBzaGFwZVRvTW92ZS5zaGFwZS50b3AgKyBkZWx0YVksXHJcbiAgICAgICAgICAgICAgICBtb3Zpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2tpcENvbGxpc2lvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNoYXBlLmFDb29yZHMuYmwueSA8IHNoYXBlVG9Nb3ZlLnNoYXBlLmFDb29yZHMudGwueSkgeyAvLyBJZiBleHBhbmRlZCBTaGFwZSBpcyBhYm92ZSB0aGUgY3VycmVudCBzaGFwZVxyXG4gICAgICAgICAgICAgIGlmICh0aGlzLnNoYXBlLmFDb29yZHMudGwueCA8IHNoYXBlVG9Nb3ZlLnNoYXBlLmFDb29yZHMudHIueCkge1xyXG4gICAgICAgICAgICAgICAgc2hhcGVUb01vdmUubW92ZSh7XHJcbiAgICAgICAgICAgICAgICAgIHk6IHNoYXBlVG9Nb3ZlLnNoYXBlLnRvcCArIGRlbHRhWSxcclxuICAgICAgICAgICAgICAgICAgbW92aW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgc2tpcENvbGxpc2lvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNoYXBlLmFDb29yZHMudHIueCA8IHNoYXBlVG9Nb3ZlLnNoYXBlLmFDb29yZHMudGwueCkgeyAvLyBJZiBleHBhbmRlZCBTaGFwZSBpcyBvbiB0aGUgbGVmdCBvZiB0aGUgY3VycmVudCBzaGFwZVxyXG4gICAgICAgICAgICAgIGlmICh0aGlzLnNoYXBlLmFDb29yZHMudGwueSA8IHNoYXBlVG9Nb3ZlLnNoYXBlLmFDb29yZHMuYmwueSkge1xyXG4gICAgICAgICAgICAgICAgc2hhcGVUb01vdmUubW92ZSh7XHJcbiAgICAgICAgICAgICAgICAgIHg6IHNoYXBlVG9Nb3ZlLnNoYXBlLmxlZnQgKyBkZWx0YVgsXHJcbiAgICAgICAgICAgICAgICAgIG1vdmluZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgIHNraXBDb2xsaXNpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFJlc2l6ZSBleGlzdGluZyBzaGFwZXNcclxuICAgICAgc2hhcGVzLnJlY3Qud2lkdGggPSBuZXdSZWN0V2lkdGg7XHJcbiAgICAgIHNoYXBlcy5yZWN0LmhlaWdodCA9IG5ld1JlY3RIZWlnaHQ7XHJcbiAgICAgIHNoYXBlcy5yZWN0LnNldENvb3JkcygpO1xyXG4gICAgICBzaGFwZXMudGV4dC53aWR0aCA9IG5ld1JlY3RXaWR0aCAtIChzaGFwZXMuaW1hZ2Uud2lkdGggKyBwYWRkaW5nICsgbWFyZ2luKTtcclxuICAgICAgc2hhcGVzLnRleHQudGV4dEFsaWduID0gJ2xlZnQnO1xyXG4gICAgICBzaGFwZXMudGV4dC5zZXRDb29yZHMoKTtcclxuXHJcbiAgICAgIC8vIEFkZCBjaGlsZHJlbiBjb250YWluZXJzXHJcbiAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgY2hpbGRyZW4ubGVuZ3RoOyBjICs9IDEpIHtcclxuICAgICAgICBjb25zdCBjaGlsZCA9IGNoaWxkcmVuW2NdO1xyXG4gICAgICAgIGNoaWxkLmNvbnRhaW5lci5zaGFwZS5sZWZ0ID0gc2hhcGUubGVmdCArIHBhZGRpbmdcclxuICAgICAgICAgICsgKGluaXRpYWxPcHRzLmNoaWxkLndpZHRoICsgbWFyZ2luKSAqIGMgKyAoYyA9PT0gY2hpbGRyZW4ubGVuZ3RoID8gLW1hcmdpbiA6IDApO1xyXG4gICAgICAgIGNoaWxkLmNvbnRhaW5lci5zaGFwZS50b3AgPSBzaGFwZS50b3AgKyBwYWRkaW5nICsgc2hhcGVzLmltYWdlLmhlaWdodCArIG1hcmdpbjtcclxuICAgICAgICBzaGFwZS5hZGRXaXRoVXBkYXRlKGNoaWxkLmNvbnRhaW5lci5zaGFwZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFVwZGF0ZSB0aGUgY29udGFpbmVyIGNvb3Jkc1xyXG4gICAgICBzaGFwZS5hZGRXaXRoVXBkYXRlKCk7XHJcbiAgICAgIHNoYXBlLnNldENvb3JkcygpO1xyXG4gICAgICB0aGlzLmJyaW5nVG9Gcm9udCgpO1xyXG4gICAgICB0aGlzLnNoYXBlLmZpcmUoJ21vZGlmaWVkJyk7XHJcblxyXG4gICAgICBjYW52YXMucmVuZGVyQWxsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pc0V4cGFuZGVkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGNvbGxhcHNlKCkge1xyXG4gICAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoICE9PSAwICYmIHRoaXMuaXNFeHBhbmRlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICBjb25zdCB7XHJcbiAgICAgICAgY2FudmFzLCBzaGFwZSwgc2hhcGVzLCBjaGlsZHJlbiwgaW5pdGlhbE9wdHMsXHJcbiAgICAgIH0gPSB0aGlzO1xyXG5cclxuICAgICAgLy8gQ2FsY3VsYXRlIG5ldyBkaW1lbnNpb25zXHJcbiAgICAgIGNvbnN0IHBhZGRpbmcgPSAxMDtcclxuICAgICAgY29uc3QgbWFyZ2luID0gMTA7XHJcbiAgICAgIGNvbnN0IG9sZFJlY3RXaWR0aCA9IHNoYXBlcy5yZWN0LndpZHRoO1xyXG4gICAgICBjb25zdCBvbGRSZWN0SGVpZ2h0ID0gc2hhcGVzLnJlY3QuaGVpZ2h0O1xyXG5cclxuICAgICAgY29uc3QgbmV3UmVjdFdpZHRoID0gaW5pdGlhbE9wdHMucmVjdC53aWR0aDtcclxuICAgICAgY29uc3QgbmV3UmVjdEhlaWdodCA9IGluaXRpYWxPcHRzLnJlY3QuaGVpZ2h0O1xyXG5cclxuICAgICAgLy8gVXBkYXRlIGFsbCBvdGhlciBjb250YWluZXJzIHRoYXQgYXJlIGJlbG93IGFuZC9vciBvbiB0aGUgcmlnaHQgb2YgdGhlIGN1cnJlbnQgc2hhcGUsIHRvIGF2b2lkIGNvbGxpc2lvblxyXG4gICAgICBzaGFwZXMucmVjdC5vcGFjaXR5ID0gMTtcclxuICAgICAgY29uc3Qgb3RoZXJTaGFwZXMgPSBPYmplY3QudmFsdWVzKGNhbnZhcy5saW5rYWJsZVNoYXBlcyk7XHJcbiAgICAgIGlmIChvdGhlclNoYXBlcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgY29uc3QgZGVsdGFYID0gbmV3UmVjdFdpZHRoIC0gb2xkUmVjdFdpZHRoO1xyXG4gICAgICAgIGNvbnN0IGRlbHRhWSA9IG5ld1JlY3RIZWlnaHQgLSBvbGRSZWN0SGVpZ2h0O1xyXG4gICAgICAgIGZvciAobGV0IG8gPSAwOyBvIDwgb3RoZXJTaGFwZXMubGVuZ3RoOyBvICs9IDEpIHtcclxuICAgICAgICAgIGNvbnN0IHNoYXBlVG9Nb3ZlID0gb3RoZXJTaGFwZXNbb107XHJcbiAgICAgICAgICBpZiAob3RoZXJTaGFwZXNbb10uaWQgIT09IHRoaXMuaWQpIHtcclxuICAgICAgICAgICAgLy8gSWYgZXhwYW5kZWQgU2hhcGUgaXMgYWJvdmUgQU5EIG9uIHRoZSBsZWZ0IG9mIHRoZSBjdXJyZW50IHNoYXBlXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNoYXBlLmFDb29yZHMuYnIueCA8PSBzaGFwZVRvTW92ZS5zaGFwZS5hQ29vcmRzLnRsLnggJiYgdGhpcy5zaGFwZS5hQ29vcmRzLmJyLnkgPD0gc2hhcGVUb01vdmUuc2hhcGUuYUNvb3Jkcy50bC55KSB7XHJcbiAgICAgICAgICAgICAgc2hhcGVUb01vdmUubW92ZSh7XHJcbiAgICAgICAgICAgICAgICB4OiBzaGFwZVRvTW92ZS5zaGFwZS5sZWZ0ICsgZGVsdGFYLFxyXG4gICAgICAgICAgICAgICAgeTogc2hhcGVUb01vdmUuc2hhcGUudG9wICsgZGVsdGFZLFxyXG4gICAgICAgICAgICAgICAgbW92aW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNraXBDb2xsaXNpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zaGFwZS5hQ29vcmRzLmJsLnkgPCBzaGFwZVRvTW92ZS5zaGFwZS5hQ29vcmRzLnRsLnkpIHsgLy8gSWYgZXhwYW5kZWQgU2hhcGUgaXMgYWJvdmUgdGhlIGN1cnJlbnQgc2hhcGVcclxuICAgICAgICAgICAgICBpZiAodGhpcy5zaGFwZS5hQ29vcmRzLnRsLnggPCBzaGFwZVRvTW92ZS5zaGFwZS5hQ29vcmRzLnRyLngpIHtcclxuICAgICAgICAgICAgICAgIHNoYXBlVG9Nb3ZlLm1vdmUoe1xyXG4gICAgICAgICAgICAgICAgICB5OiBzaGFwZVRvTW92ZS5zaGFwZS50b3AgKyBkZWx0YVksXHJcbiAgICAgICAgICAgICAgICAgIG1vdmluZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgIHNraXBDb2xsaXNpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zaGFwZS5hQ29vcmRzLnRyLnggPCBzaGFwZVRvTW92ZS5zaGFwZS5hQ29vcmRzLnRsLngpIHsgLy8gSWYgZXhwYW5kZWQgU2hhcGUgaXMgb24gdGhlIGxlZnQgb2YgdGhlIGN1cnJlbnQgc2hhcGVcclxuICAgICAgICAgICAgICBpZiAodGhpcy5zaGFwZS5hQ29vcmRzLnRsLnkgPCBzaGFwZVRvTW92ZS5zaGFwZS5hQ29vcmRzLmJsLnkpIHtcclxuICAgICAgICAgICAgICAgIHNoYXBlVG9Nb3ZlLm1vdmUoe1xyXG4gICAgICAgICAgICAgICAgICB4OiBzaGFwZVRvTW92ZS5zaGFwZS5sZWZ0ICsgZGVsdGFYLFxyXG4gICAgICAgICAgICAgICAgICBtb3Zpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICBza2lwQ29sbGlzaW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBSZXNpemUgZXhpc3Rpbmcgc2hhcGVzXHJcbiAgICAgIHNoYXBlcy5yZWN0LndpZHRoID0gbmV3UmVjdFdpZHRoO1xyXG4gICAgICBzaGFwZXMucmVjdC5oZWlnaHQgPSBuZXdSZWN0SGVpZ2h0O1xyXG4gICAgICBzaGFwZXMucmVjdC5zZXRDb29yZHMoKTtcclxuICAgICAgc2hhcGVzLnRleHQud2lkdGggPSBuZXdSZWN0V2lkdGggLSAoc2hhcGVzLmltYWdlLndpZHRoICsgcGFkZGluZyAqIDIgKyBtYXJnaW4pO1xyXG4gICAgICBzaGFwZXMudGV4dC50ZXh0QWxpZ24gPSAnbGVmdCc7XHJcbiAgICAgIHNoYXBlcy50ZXh0LnNldENvb3JkcygpO1xyXG5cclxuICAgICAgLy8gUmVtb3ZlIGNoaWxkcmVuIGNvbnRhaW5lcnNcclxuICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCBjaGlsZHJlbi5sZW5ndGg7IGMgKz0gMSkge1xyXG4gICAgICAgIGNvbnN0IGNoaWxkID0gY2hpbGRyZW5bY107XHJcbiAgICAgICAgY2hpbGQuY29udGFpbmVyLmxlZnQgPSBzaGFwZS5sZWZ0ICsgcGFkZGluZ1xyXG4gICAgICAgICAgKyAoaW5pdGlhbE9wdHMuY2hpbGQud2lkdGggKyBtYXJnaW4pICogYyArIChjID09PSBjaGlsZHJlbi5sZW5ndGggPyAtbWFyZ2luIDogMCk7XHJcbiAgICAgICAgY2hpbGQuY29udGFpbmVyLnRvcCA9IHNoYXBlLnRvcCArIHBhZGRpbmcgKyBzaGFwZXMuaW1hZ2UuaGVpZ2h0ICsgbWFyZ2luO1xyXG4gICAgICAgIHNoYXBlLnJlbW92ZShjaGlsZC5jb250YWluZXIuc2hhcGUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBVcGRhdGUgdGhlIGNvbnRhaW5lciBjb29yZHNcclxuICAgICAgc2hhcGUuYWRkV2l0aFVwZGF0ZSgpO1xyXG4gICAgICBzaGFwZS5zZXRDb29yZHMoKTtcclxuICAgICAgdGhpcy5zaGFwZS5maXJlKCdtb2RpZmllZCcpO1xyXG5cclxuICAgICAgY2FudmFzLnJlbmRlckFsbCgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pc0V4cGFuZGVkID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBhc3luYyBfb25BbmNob3JSaWdodENsaWNrKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgaWQsIGxlZnQsIHRvcCwgYW5nbGUsIGNhbnZhcywgd2lkdGgsIGhlaWdodCxcclxuICAgIH0gPSB0aGlzLnNoYXBlO1xyXG4gICAgY29uc3QgYXAgPSBvcHRpb25zLnRhcmdldDtcclxuICAgIGNvbnN0IHsgY2FyZGluYWwgfSA9IGFwO1xyXG4gICAgY29uc3Qgc3BhY2luZyA9IDEwMDtcclxuXHJcbiAgICBjb25zdCBuZXh0SWQgPSBgJHtpZH1fbmV4dF8ke2NhcmRpbmFsfV8ke01hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMSl9YDtcclxuICAgIGNvbnN0IGxhYmVsID0gYCR7aWR9X25leHRfJHtjYXJkaW5hbH1gO1xyXG4gICAgY29uc3QgbmV4dENvbnRhaW5lck9wdHMgPSBfLmNsb25lRGVlcChfLm9taXQodGhpcy5vcHRpb25zLCBbJ2NhbnZhcycsICdzaGFwZSddKSk7XHJcbiAgICBuZXh0Q29udGFpbmVyT3B0cy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICBuZXh0Q29udGFpbmVyT3B0cy5pZCA9IG5leHRJZDtcclxuICAgIG5leHRDb250YWluZXJPcHRzLmxlZnQgPSBsZWZ0O1xyXG4gICAgbmV4dENvbnRhaW5lck9wdHMudG9wID0gdG9wO1xyXG4gICAgbmV4dENvbnRhaW5lck9wdHMuYW5nbGUgPSBhbmdsZTtcclxuICAgIG5leHRDb250YWluZXJPcHRzLmxhYmVsID0gbGFiZWw7XHJcbiAgICBuZXh0Q29udGFpbmVyT3B0cy5jaGlsZHJlbiA9IFtdO1xyXG5cclxuICAgIGNvbnN0IG5leHRDb250YWluZXIgPSBuZXcgRXhwYW5kYWJsZUNvbnRhaW5lcihuZXh0Q29udGFpbmVyT3B0cyk7XHJcbiAgICBhd2FpdCBuZXh0Q29udGFpbmVyLmxvYWQoKTtcclxuICAgIG5leHRDb250YWluZXIuaW5qZWN0KCk7XHJcblxyXG4gICAgY29uc3QgbmV3T3B0aW9ucyA9IHt9O1xyXG4gICAgbGV0IHRhcmdldENhcmRpbmFsO1xyXG4gICAgc3dpdGNoIChjYXJkaW5hbCkge1xyXG4gICAgICBjYXNlICdlYXN0Jzoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ3dlc3QnO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IHRvcDtcclxuICAgICAgICBuZXdPcHRpb25zLnggPSBsZWZ0ICsgd2lkdGggKyBzcGFjaW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3dlc3QnOiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnZWFzdCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gdG9wO1xyXG4gICAgICAgIG5ld09wdGlvbnMueCA9IGxlZnQgLSB3aWR0aCAtIHNwYWNpbmc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnbm9ydGgnOiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnc291dGgnO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IHRvcCAtIGhlaWdodCAtIHNwYWNpbmc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gbGVmdDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aCc6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICdub3J0aCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gdG9wICsgaGVpZ2h0ICsgc3BhY2luZztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSBsZWZ0O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRoZWFzdCc6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICdzb3V0aHdlc3QnO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IHRvcCAtIGhlaWdodCAtIHNwYWNpbmc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gbGVmdCArIHdpZHRoICsgc3BhY2luZztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aHdlc3QnOiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnc291dGhlYXN0JztcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSB0b3AgLSBoZWlnaHQgLSBzcGFjaW5nO1xyXG4gICAgICAgIG5ld09wdGlvbnMueCA9IGxlZnQgLSB3aWR0aCAtIHNwYWNpbmc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnc291dGhlYXN0Jzoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ25vcnRod2VzdCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gdG9wICsgaGVpZ2h0ICsgc3BhY2luZztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSBsZWZ0ICsgd2lkdGggKyBzcGFjaW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRod2VzdCc6XHJcbiAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICdub3J0aGVhc3QnO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IHRvcCArIGhlaWdodCArIHNwYWNpbmc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gbGVmdCAtIHdpZHRoIC0gc3BhY2luZztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgbmV4dENvbnRhaW5lci5tb3ZlKG5ld09wdGlvbnMpO1xyXG4gICAgLy8gbmV4dENvbnRhaW5lci5yb3RhdGUoYW5nbGUpO1xyXG5cclxuICAgIGNvbnN0IG5ld0xpbmsgPSBuZXcgQ3VydmVkTGluayh7XHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgc3RhcnQ6IHtcclxuICAgICAgICB4OiBhcC5sZWZ0LFxyXG4gICAgICAgIHk6IGFwLnRvcCxcclxuICAgICAgfSxcclxuICAgICAgZW5kOiB7XHJcbiAgICAgICAgeDogbmV4dENvbnRhaW5lci5hbmNob3JzW3RhcmdldENhcmRpbmFsXS5sZWZ0LFxyXG4gICAgICAgIHk6IG5leHRDb250YWluZXIuYW5jaG9yc1t0YXJnZXRDYXJkaW5hbF0udG9wLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgICBuZXdMaW5rLmluamVjdChjYW52YXMpO1xyXG4gICAgbmV3TGluay5jb25uZWN0TGluaygnc3RhcnQnLCBhcC5zaGFwZUlkLCBhcC5jYXJkaW5hbCk7XHJcbiAgICBuZXdMaW5rLmNvbm5lY3RMaW5rKCdlbmQnLCBuZXh0Q29udGFpbmVyLmFuY2hvcnNbdGFyZ2V0Q2FyZGluYWxdLnNoYXBlSWQsXHJcbiAgICAgIG5leHRDb250YWluZXIuYW5jaG9yc1t0YXJnZXRDYXJkaW5hbF0uY2FyZGluYWwpO1xyXG4gIH1cclxuXHJcbiAgX29uQW5jaG9yTGVmdENsaWNrKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGFwID0gb3B0aW9ucy50YXJnZXQ7XHJcbiAgICBjb25zdCB7IGNhbnZhcyB9ID0gdGhpcztcclxuXHJcbiAgICAvLyBEaXNhYmxlIHRoZSBtdWx0aSBzZWxlY3Rpb24gd2hlbiBtb3ZpbmcgbW91c2VcclxuICAgIHRoaXMuY2FudmFzLnNlbGVjdGlvbiA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0IG9wcG9zaXRlQ2FyZGluYWwgPSB7XHJcbiAgICAgIGVhc3Q6ICd3ZXN0JyxcclxuICAgICAgd2VzdDogJ2Vhc3QnLFxyXG4gICAgICBub3J0aDogJ3NvdXRoJyxcclxuICAgICAgc291dGg6ICdub3J0aCcsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgbmV3TGluayA9IG5ldyBDdXJ2ZWRMaW5rKHtcclxuICAgICAgY2FudmFzLFxyXG4gICAgICBzdGFydDoge1xyXG4gICAgICAgIHg6IGFwLmxlZnQsXHJcbiAgICAgICAgeTogYXAudG9wLFxyXG4gICAgICAgIGRpcmVjdGlvbjogYXAuY2FyZGluYWwsXHJcbiAgICAgIH0sXHJcbiAgICAgIGVuZDoge1xyXG4gICAgICAgIHg6IGFwLmxlZnQsXHJcbiAgICAgICAgeTogYXAudG9wLFxyXG4gICAgICAgIGRpcmVjdGlvbjogb3Bwb3NpdGVDYXJkaW5hbFthcC5jYXJkaW5hbF0sXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICAgIG5ld0xpbmsuaW5qZWN0KGNhbnZhcyk7XHJcbiAgICBuZXdMaW5rLmNvbm5lY3RMaW5rKCdzdGFydCcsIGFwLnNoYXBlSWQsIGFwLmNhcmRpbmFsKTtcclxuICAgIG5ld0xpbmsuYXJyb3dIZWFkLmZpcmUoJ21vdXNlZG93bicpO1xyXG5cclxuICAgIGNvbnN0IG9uTW91c2VNb3ZlID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgIG5ld0xpbmsuYXJyb3dIZWFkLmxlZnQgPSBldmVudC5wb2ludGVyLng7XHJcbiAgICAgIG5ld0xpbmsuYXJyb3dIZWFkLnRvcCA9IGV2ZW50LnBvaW50ZXIueTtcclxuICAgICAgbmV3TGluay5hcnJvd0hlYWQuZmlyZSgnbW92aW5nJyk7XHJcbiAgICB9O1xyXG4gICAgY2FudmFzLm9uKCdtb3VzZTptb3ZlJywgb25Nb3VzZU1vdmUpO1xyXG5cclxuICAgIGNvbnN0IG9uTW91c2VDbGljayA9ICgpID0+IHtcclxuICAgICAgLy8gRW5hYmxlIGJhY2sgdGhlIG11bHRpIHNlbGVjdGlvbiB3aGVuIG1vdmluZyBtb3VzZVxyXG4gICAgICB0aGlzLmNhbnZhcy5zZWxlY3Rpb24gPSB0cnVlO1xyXG5cclxuICAgICAgbmV3TGluay5hcnJvd0hlYWQuZmlyZSgnbW92ZWQnKTtcclxuICAgICAgbmV3TGluay5hcnJvd0hlYWQuZmlyZSgnbW91c2V1cCcpO1xyXG4gICAgICBjYW52YXMub2ZmKCdtb3VzZTptb3ZlJywgb25Nb3VzZU1vdmUpO1xyXG4gICAgICBjYW52YXMub2ZmKCdtb3VzZTp1cCcsIG9uTW91c2VDbGljayk7XHJcbiAgICB9O1xyXG4gICAgY2FudmFzLm9uKCdtb3VzZTp1cCcsIG9uTW91c2VDbGljayk7XHJcbiAgfVxyXG59XHJcbiIsImNvbnN0IHsgZmFicmljIH0gPSB3aW5kb3c7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW5rIHtcclxuICAvKipcclxuICAgKiBBIExpbmsgaXMgYSBGYWJyaWMuUGF0aCBvYmplY3Qgd2hvc2UgU3RhcnQgYW5kIEVuZCBwb2ludHMgY2FuIGJlIGNvbm5lY3RlZCBlbmQgYW55IGFuY2hvciBvZiB0d28gTGlua2FibGVTaGFwZS5cclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgb3B0aW9uc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtGYWJyaWMuQ2FudmFzfSAgIG9wdGlvbnMuY2FudmFzIC0gRmFicmljIGNhbnZhc1xyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICBvcHRpb25zLmlkIC0gVW5pcXVlIGlkZW50aWZpZXJcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBbb3B0aW9ucy5zdGFydF0gLSBDb29yZGluYXRlcyBvZiB0aGUgc3RhcnQgcG9pbnRcclxuICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgW29wdGlvbnMuc3RhcnQueF0gLSBYIGF4aXMgY29vcmRpbmF0ZSBvZiB0aGUgc3RhcnQgcG9pbnRcclxuICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgW29wdGlvbnMuc3RhcnQueV0gLSBZIGF4aXMgY29vcmRpbmF0ZSBvZiB0aGUgc3RhcnQgcG9pbnRcclxuICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgW29wdGlvbnMuZW5kLnhdIC0gWCBheGlzIGNvb3JkaW5hdGUgb2YgdGhlIGVuZCBwb2ludFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBbb3B0aW9ucy5lbmQueV0gLSBZIGF4aXMgY29vcmRpbmF0ZSBvZiB0aGUgZW5kIHBvaW50XHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLmN1c3RvbV0gLSBPcHRpb25zIGVuZCBjdXN0b21pemUgdGhlIGRpZmZlcmVudCBzaGFwZXMgb2YgdGhlIExpbmtcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBbb3B0aW9ucy5jdXN0b20ucGF0aF0gLSBiZXppZXIgcXVhZHJhdGljIGN1cnZlXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLmN1c3RvbS5jb250cm9sUG9pbnRdIC0gYmV6aWVyIHF1YWRyYXRpYyBjdXJ2ZSBjb250cm9sIHBvaW50XHJcbiAgICogQHBhcmFtIHtMaW5lfSAgICAgICAgICAgIFtvcHRpb25zLmN1c3RvbS5jb250cm9sTGluZV0gLSB2aXN1YWwgbGluZXMgc3RhcnQgdGhlIGNvbnRyb2wgcG9pbnQgZW5kIHRoZSBzdGFydCZlbmQgcG9pbnRzXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLmN1c3RvbS5zdGFydFBvaW50XSAtIGFrYSBhcnJvd1RhaWxcclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuY3VzdG9tLmVuZFBvaW50XSAtIGFrYSBhcnJvd0hlYWRcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGlkLFxyXG4gICAgICBjYW52YXMsXHJcbiAgICB9ID0gb3B0aW9ucztcclxuICAgIGNvbnN0IHgxID0gb3B0aW9ucyAmJiBvcHRpb25zLnN0YXJ0ICYmIG9wdGlvbnMuc3RhcnQueCA/IG9wdGlvbnMuc3RhcnQueCA6IDA7XHJcbiAgICBjb25zdCB5MSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5zdGFydCAmJiBvcHRpb25zLnN0YXJ0LnkgPyBvcHRpb25zLnN0YXJ0LnkgOiAwO1xyXG4gICAgY29uc3QgeDIgPSBvcHRpb25zICYmIG9wdGlvbnMuZW5kICYmIG9wdGlvbnMuZW5kLnggPyBvcHRpb25zLmVuZC54IDogMDtcclxuICAgIGNvbnN0IHkyID0gb3B0aW9ucyAmJiBvcHRpb25zLmVuZCAmJiBvcHRpb25zLmVuZC55ID8gb3B0aW9ucy5lbmQueSA6IDA7XHJcbiAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuXHJcbiAgICAvLyBQYXRoLCBhIGJlemllciBxdWFkcmF0aWMgY3VydmVcclxuICAgIGNvbnN0IHBhdGhDb29yZHMgPSB7XHJcbiAgICAgIE06IHtcclxuICAgICAgICB4OiB4MSwgLy8gc3RhcnQgeFxyXG4gICAgICAgIHk6IHkxLCAvLyBzdGFydCB5XHJcbiAgICAgIH0sXHJcbiAgICAgIFE6IHtcclxuICAgICAgICB4MTogKHgxICsgeDIpIC8gMiwgLy8gY29udHJvbCB4XHJcbiAgICAgICAgeTE6ICh5MSArIHkyKSAvIDIsIC8vIGNvbnRyb2wgeVxyXG4gICAgICAgIHgyLCAvLyBlbmQgeFxyXG4gICAgICAgIHkyLCAvLyBlbmQgeVxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHBhdGhPcHRzID0gdGhpcy5kZWZhdWx0UGF0aE9wdGlvbnMgPSB7XHJcbiAgICAgIGZpbGw6ICcnLFxyXG4gICAgICBzdHJva2U6IChvcHRpb25zLmN1c3RvbSAmJiBvcHRpb25zLmN1c3RvbS5wYXRoICYmIG9wdGlvbnMuY3VzdG9tLnBhdGguc3Ryb2tlV2lkdGgpID8gb3B0aW9ucy5jdXN0b20ucGF0aC5zdHJva2UgOiAnIzAwMCcsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAob3B0aW9ucy5jdXN0b20gJiYgb3B0aW9ucy5jdXN0b20ucGF0aCAmJiBvcHRpb25zLmN1c3RvbS5wYXRoLnN0cm9rZVdpZHRoKSA/IG9wdGlvbnMuY3VzdG9tLnBhdGguc3Ryb2tlV2lkdGggOiAyLFxyXG4gICAgICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgICAgaGFzQm9yZGVyczogdHJ1ZSxcclxuICAgICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgICBwZXJQaXhlbFRhcmdldEZpbmQ6IHRydWUsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgcGF0aFN0ciA9IGBNICR7cGF0aENvb3Jkcy5NLnh9ICR7cGF0aENvb3Jkcy5NLnl9IFEgJHtwYXRoQ29vcmRzLlEueDF9LCAke3BhdGhDb29yZHMuUS55MX0sICR7cGF0aENvb3Jkcy5RLngyfSwgJHtwYXRoQ29vcmRzLlEueTJ9YDtcclxuICAgIGNvbnN0IHBhdGggPSBuZXcgZmFicmljLlBhdGgocGF0aFN0ciwgcGF0aE9wdHMpO1xyXG4gICAgdGhpcy5wYXRoID0gcGF0aDtcclxuXHJcbiAgICAvLyBDb250cm9sIHBvaW50IGFuZCBsaW5lcyBmb3IgdGhlIHF1YWRyYXRpYyBjdXJ2ZVxyXG4gICAgY29uc3QgY29udHJvbFBvaW50ID0gdGhpcy5jb250cm9sUG9pbnQgPSBuZXcgZmFicmljLkNpcmNsZSh7XHJcbiAgICAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgICBsZWZ0OiBwYXRoQ29vcmRzLlEueDEsXHJcbiAgICAgIHRvcDogcGF0aENvb3Jkcy5RLnkxLFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgcmFkaXVzOiA2LFxyXG4gICAgICBmaWxsOiAnIzc4YmVmYScsXHJcbiAgICAgIHN0cm9rZTogJyM3OGJlZmEnLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAgIHNlbGVjdGFibGU6IHRydWUsXHJcbiAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICB9KTtcclxuICAgIGNvbnRyb2xQb2ludC5vbignbW91c2VvdmVyJywgdGhpcy5vbkxpbmtNb3VzZU92ZXIuYmluZCh0aGlzKSk7XHJcbiAgICBjb250cm9sUG9pbnQub24oJ21vdXNlb3V0JywgdGhpcy5vbkxpbmtNb3VzZU91dC5iaW5kKHRoaXMpKTtcclxuICAgIGNvbnRyb2xQb2ludC5vbignbW92aW5nJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhdGgoJ2NvbnRyb2wnLCB0aGlzLmNvbnRyb2xQb2ludC5sZWZ0LCB0aGlzLmNvbnRyb2xQb2ludC50b3AsIGZhbHNlKTtcclxuICAgIH0pO1xyXG4gICAgY29udHJvbFBvaW50Lm9uKCdtb3ZlZCcsICgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVQYXRoKCdjb250cm9sJywgdGhpcy5jb250cm9sUG9pbnQubGVmdCwgdGhpcy5jb250cm9sUG9pbnQudG9wLCB0cnVlKTtcclxuICAgIH0pO1xyXG4gICAgY29udHJvbFBvaW50Lm9uKCdtb3VzZWRvd24nLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuYnJpbmdUb0Zyb250KCk7XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGNvbnRyb2xMaW5lT3B0cyA9IHtcclxuICAgICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAgIHN0cm9rZURhc2hBcnJheTogWzUsIDVdLFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgc3Ryb2tlOiAnIzc4YmVmYScsXHJcbiAgICAgIHNlbGVjdGFibGU6IGZhbHNlLFxyXG4gICAgICBoYXNCb3JkZXJzOiBmYWxzZSxcclxuICAgICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgICBldmVudGVkOiBmYWxzZSxcclxuICAgICAgb3BhY2l0eTogMCxcclxuICAgIH07XHJcbiAgICBjb25zdCBjb250cm9sTGluZTEgPSB0aGlzLmNvbnRyb2xMaW5lMSA9IG5ldyBmYWJyaWMuTGluZShbY29udHJvbFBvaW50LmxlZnQsIGNvbnRyb2xQb2ludC50b3AsIHgxLCB5MV0sIGNvbnRyb2xMaW5lT3B0cyk7XHJcbiAgICBjb250cm9sTGluZTEub24oJ21vdXNlb3ZlcicsIHRoaXMub25MaW5rTW91c2VPdmVyLmJpbmQodGhpcykpO1xyXG4gICAgY29udHJvbExpbmUxLm9uKCdtb3VzZW91dCcsIHRoaXMub25MaW5rTW91c2VPdXQuYmluZCh0aGlzKSk7XHJcbiAgICBjb25zdCBjb250cm9sTGluZTIgPSB0aGlzLmNvbnRyb2xMaW5lMiA9IG5ldyBmYWJyaWMuTGluZShbY29udHJvbFBvaW50LmxlZnQsIGNvbnRyb2xQb2ludC50b3AsIHgyLCB5Ml0sIGNvbnRyb2xMaW5lT3B0cyk7XHJcbiAgICBjb250cm9sTGluZTIub24oJ21vdXNlb3ZlcicsIHRoaXMub25MaW5rTW91c2VPdmVyLmJpbmQodGhpcykpO1xyXG4gICAgY29udHJvbExpbmUyLm9uKCdtb3VzZW91dCcsIHRoaXMub25MaW5rTW91c2VPdXQuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgLy8gRW5kIHBvaW50IChhcnJvd0hlYWQpXHJcbiAgICBjb25zdCBpc1ZhbGlkTWFza09wdHMgPSB7XHJcbiAgICAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgICBsZWZ0OiBwYXRoQ29vcmRzLlEueDIsXHJcbiAgICAgIHRvcDogcGF0aENvb3Jkcy5RLnkyLFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgcmFkaXVzOiAxNixcclxuICAgICAgZmlsbDogJyM1N2I4NTcnLCAvLyBlYTRmMzdcclxuICAgICAgc3Ryb2tlOiAnIzU3Yjg1NycsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgICAgc2VsZWN0YWJsZTogZmFsc2UsXHJcbiAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgYXJyb3dIZWFkT3B0cyA9IHtcclxuICAgICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAgIHdpZHRoOiAxMCxcclxuICAgICAgaGVpZ2h0OiAxMCxcclxuICAgICAgbGVmdDogcGF0aENvb3Jkcy5RLngyLFxyXG4gICAgICB0b3A6IHBhdGhDb29yZHMuUS55MixcclxuICAgICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAgIGZpbGw6ICcjMDAwJyxcclxuICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgc3Ryb2tlOiAnIzAwMCcsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgIH07XHJcbiAgICBjb25zdCBhcnJvd0hlYWQgPSB0aGlzLmFycm93SGVhZCA9IG5ldyBmYWJyaWMuVHJpYW5nbGUoYXJyb3dIZWFkT3B0cyk7XHJcbiAgICB0aGlzLmlzVmFsaWRIZWFkQ29ubmVjdGlvbk1hc2sgPSBuZXcgZmFicmljLkNpcmNsZShpc1ZhbGlkTWFza09wdHMpO1xyXG4gICAgYXJyb3dIZWFkLm9uKCdtb3ZpbmcnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aCgnZW5kJywgYXJyb3dIZWFkLmxlZnQsIGFycm93SGVhZC50b3AsIGZhbHNlKTtcclxuICAgICAgdGhpcy5fY2hlY2tFeHRyZW1pdHlDYW5CZUNvbm5lY3RlZCgnZW5kJyk7XHJcbiAgICB9KTtcclxuICAgIGFycm93SGVhZC5vbignbW92ZWQnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aCgnZW5kJywgYXJyb3dIZWFkLmxlZnQsIGFycm93SGVhZC50b3AsIHRydWUpO1xyXG4gICAgICB0aGlzLmlzVmFsaWRIZWFkQ29ubmVjdGlvbk1hc2suc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICAgIHRoaXMuX2Nvbm5lY3REaXNjb25uZWN0RXh0cmVtaXR5KCdlbmQnKTtcclxuICAgIH0pO1xyXG4gICAgYXJyb3dIZWFkLm9uKCdtb3VzZWRvd24nLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuYnJpbmdUb0Zyb250KCk7XHJcbiAgICAgIHRoaXMudG9nZ2xlQWxsQW5jaG9yc09wYWNpdHkoMSk7XHJcblxyXG4gICAgICBhcnJvd0hlYWQub24oJ21vdXNldXAnLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy50b2dnbGVBbGxBbmNob3JzT3BhY2l0eSgwKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBTdGFydCBwb2ludCAoYXJyb3dUYWlsKVxyXG4gICAgY29uc3QgYXJyb3dUYWlsT3B0cyA9IHtcclxuICAgICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAgIHdpZHRoOiAxMCxcclxuICAgICAgaGVpZ2h0OiAxMCxcclxuICAgICAgbGVmdDogcGF0aENvb3Jkcy5NLngsXHJcbiAgICAgIHRvcDogcGF0aENvb3Jkcy5NLnksXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICBmaWxsOiAnI2ZmZicsXHJcbiAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgIHN0cm9rZTogJyMwMDAnLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIHNlbGVjdGFibGU6IHRydWUsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgYXJyb3dUYWlsID0gdGhpcy5hcnJvd1RhaWwgPSBuZXcgZmFicmljLlJlY3QoYXJyb3dUYWlsT3B0cyk7XHJcbiAgICB0aGlzLmlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2sgPSBuZXcgZmFicmljLkNpcmNsZShpc1ZhbGlkTWFza09wdHMpO1xyXG4gICAgYXJyb3dUYWlsLm9uKCdtb3ZpbmcnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aCgnc3RhcnQnLCBhcnJvd1RhaWwubGVmdCwgYXJyb3dUYWlsLnRvcCwgZmFsc2UpO1xyXG4gICAgICB0aGlzLl9jaGVja0V4dHJlbWl0eUNhbkJlQ29ubmVjdGVkKCdzdGFydCcpO1xyXG4gICAgfSk7XHJcbiAgICBhcnJvd1RhaWwub24oJ21vdmVkJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhdGgoJ3N0YXJ0JywgYXJyb3dUYWlsLmxlZnQsIGFycm93VGFpbC50b3AsIHRydWUpO1xyXG4gICAgICB0aGlzLmlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2suc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICAgIHRoaXMuX2Nvbm5lY3REaXNjb25uZWN0RXh0cmVtaXR5KCdzdGFydCcpO1xyXG4gICAgfSk7XHJcbiAgICBhcnJvd1RhaWwub24oJ21vdXNlZG93bicsICgpID0+IHtcclxuICAgICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcclxuICAgICAgdGhpcy50b2dnbGVBbGxBbmNob3JzT3BhY2l0eSgxKTtcclxuXHJcbiAgICAgIGFycm93VGFpbC5vbignbW91c2V1cCcsICgpID0+IHtcclxuICAgICAgICB0aGlzLnRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KDApO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5qZWN0KCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBpZCxcclxuICAgICAgY2FudmFzLFxyXG4gICAgICBwYXRoLFxyXG4gICAgICBjb250cm9sUG9pbnQsXHJcbiAgICAgIGNvbnRyb2xMaW5lMSxcclxuICAgICAgY29udHJvbExpbmUyLFxyXG4gICAgICBhcnJvd0hlYWQsXHJcbiAgICAgIGFycm93VGFpbCxcclxuICAgICAgaXNWYWxpZFRhaWxDb25uZWN0aW9uTWFzayxcclxuICAgICAgaXNWYWxpZEhlYWRDb25uZWN0aW9uTWFzayxcclxuICAgIH0gPSB0aGlzO1xyXG4gICAgY2FudmFzLmFkZChjb250cm9sUG9pbnQpO1xyXG4gICAgY2FudmFzLmFkZChjb250cm9sTGluZTEpO1xyXG4gICAgY2FudmFzLmFkZChjb250cm9sTGluZTIpO1xyXG4gICAgY2FudmFzLmFkZChpc1ZhbGlkVGFpbENvbm5lY3Rpb25NYXNrKTtcclxuICAgIGNhbnZhcy5hZGQoaXNWYWxpZEhlYWRDb25uZWN0aW9uTWFzayk7XHJcbiAgICBjYW52YXMuYWRkKGFycm93SGVhZCk7XHJcbiAgICBjYW52YXMuYWRkKGFycm93VGFpbCk7XHJcblxyXG4gICAgY2FudmFzLmFkZChwYXRoKTtcclxuICAgIHRoaXMudXBkYXRlUGF0aCgnc3RhcnQnLCBwYXRoLnBhdGhbMF1bMV0sIHBhdGgucGF0aFswXVsyXSwgdHJ1ZSk7XHJcbiAgICB0aGlzLnVwZGF0ZVBhdGgoJ2VuZCcsIHBhdGgucGF0aFsxXVszXSwgcGF0aC5wYXRoWzFdWzRdLCB0cnVlKTtcclxuICAgIHRoaXMudXBkYXRlUGF0aCgnY29udHJvbCcsIHBhdGgucGF0aFsxXVsxXSwgcGF0aC5wYXRoWzFdWzJdLCB0cnVlKTtcclxuXHJcbiAgICBjYW52YXMubGlua3NbaWRdID0gdGhpcztcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGNvbm5lY3RMaW5rKGxpbmtQb2ludCwgc2hhcGVJZCwgY2FyZGluYWwpIHtcclxuICAgIC8vIENoZWNrIG5vdCBhbHJlYWR5IGNvbm5lY3RlZFxyXG4gICAgaWYgKCF0aGlzLmlzVmFsaWRDb25uZWN0aW9uKGxpbmtQb2ludCwgc2hhcGVJZCwgY2FyZGluYWwpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHNoYXBlID0gdGhpcy5jYW52YXMuZ2V0T2JqZWN0cygpXHJcbiAgICAgIC5maW5kKChvKSA9PiBvLmlkID09PSBzaGFwZUlkKTtcclxuXHJcbiAgICAvLyBEaXNjb25uZWN0IGV4aXN0aW5nIG9iamVjdFxyXG4gICAgdGhpcy5kaXNjb25uZWN0TGluayhsaW5rUG9pbnQpO1xyXG5cclxuICAgIC8vIENvbm5lY3RcclxuICAgIHRoaXNbbGlua1BvaW50XSA9IHtcclxuICAgICAgc2hhcGUsXHJcbiAgICAgIGFuY2hvcjogY2FyZGluYWwsXHJcbiAgICAgIGhhbmRsZXJzOiB7XHJcbiAgICAgICAgb25BbmNob3JQb3NpdGlvbk1vZGlmeWluZzogKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVQYXRoKGxpbmtQb2ludCwgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ubGVmdCwgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0udG9wLCBmYWxzZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkFuY2hvclBvc2l0aW9uTW9kaWZpZWQ6ICgpID0+IHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlUGF0aChsaW5rUG9pbnQsIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLmxlZnQsIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLnRvcCwgdHJ1ZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgICAvLyBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5vcGFjaXR5ID0gMDtcclxuICAgIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLm9uKCdwZzpwb3NpdGlvbjptb2RpZnlpbmcnLCB0aGlzW2xpbmtQb2ludF0uaGFuZGxlcnMub25BbmNob3JQb3NpdGlvbk1vZGlmeWluZyk7XHJcbiAgICBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5vbigncGc6cG9zaXRpb246bW9kaWZpZWQnLCB0aGlzW2xpbmtQb2ludF0uaGFuZGxlcnMub25BbmNob3JQb3NpdGlvbk1vZGlmaWVkKTtcclxuXHJcbiAgICAvLyBVcGRhdGUgTGlua1xyXG4gICAgdGhpcy51cGRhdGVQYXRoKGxpbmtQb2ludCwgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ubGVmdCwgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0udG9wLCB0cnVlLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBkaXNjb25uZWN0TGluayhsaW5rUG9pbnQpIHtcclxuICAgIGlmICh0aGlzW2xpbmtQb2ludF0pIHtcclxuICAgICAgdGhpc1tsaW5rUG9pbnRdLnNoYXBlLmFuY2hvcnNbdGhpc1tsaW5rUG9pbnRdLmFuY2hvcl0ub2ZmKCdwZzpwb3NpdGlvbjptb2RpZnlpbmcnLCB0aGlzW2xpbmtQb2ludF0uaGFuZGxlcnMub25BbmNob3JQb3NpdGlvbk1vZGlmeWluZyk7XHJcbiAgICAgIHRoaXNbbGlua1BvaW50XS5zaGFwZS5hbmNob3JzW3RoaXNbbGlua1BvaW50XS5hbmNob3JdLm9mZigncGc6cG9zaXRpb246bW9kaWZpZWQnLCB0aGlzW2xpbmtQb2ludF0uaGFuZGxlcnMub25BbmNob3JQb3NpdGlvbk1vZGlmaWVkKTtcclxuICAgICAgZGVsZXRlIHRoaXNbbGlua1BvaW50XTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlc2V0Q3VydmF0dXJlKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBjb250cm9sUG9pbnQsXHJcbiAgICAgIHBhdGgsXHJcbiAgICB9ID0gdGhpcztcclxuICAgIGNvbnRyb2xQb2ludC5sZWZ0ID0gKHBhdGgucGF0aFswXVsxXSArIHBhdGgucGF0aFsxXVszXSkgLyAyO1xyXG4gICAgY29udHJvbFBvaW50LnRvcCA9IChwYXRoLnBhdGhbMF1bMl0gKyBwYXRoLnBhdGhbMV1bNF0pIC8gMjtcclxuICAgIGNvbnRyb2xQb2ludC5zZXRDb29yZHMoKTtcclxuICAgIGNvbnRyb2xQb2ludC5maXJlKCdtb3ZlZCcpO1xyXG4gIH1cclxuXHJcbiAgYnJpbmdUb0Zyb250KCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHBhdGgsXHJcbiAgICAgIGNvbnRyb2xQb2ludCxcclxuICAgICAgYXJyb3dIZWFkLFxyXG4gICAgICBhcnJvd1RhaWwsXHJcbiAgICB9ID0gdGhpcztcclxuICAgIGNhbnZhcy5icmluZ1RvRnJvbnQocGF0aCk7XHJcbiAgICBjYW52YXMuYnJpbmdUb0Zyb250KGNvbnRyb2xQb2ludCk7XHJcbiAgICBjYW52YXMuYnJpbmdUb0Zyb250KGFycm93SGVhZCk7XHJcbiAgICBjYW52YXMuYnJpbmdUb0Zyb250KGFycm93VGFpbCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVQYXRoKGxpbmtQb2ludCwgeCwgeSwgY29tbWl0LCByZXNldEN1cnYpIHtcclxuICAgIGNvbnN0IHBhdGggPSB7XHJcbiAgICAgIE06IHtcclxuICAgICAgICB4OiBsaW5rUG9pbnQgPT09ICdzdGFydCcgPyB4IDogdGhpcy5wYXRoLnBhdGhbMF1bMV0sXHJcbiAgICAgICAgeTogbGlua1BvaW50ID09PSAnc3RhcnQnID8geSA6IHRoaXMucGF0aC5wYXRoWzBdWzJdLFxyXG4gICAgICB9LFxyXG4gICAgICBROiB7XHJcbiAgICAgICAgeDE6IGxpbmtQb2ludCA9PT0gJ2NvbnRyb2wnID8geCA6IHRoaXMucGF0aC5wYXRoWzFdWzFdLFxyXG4gICAgICAgIHkxOiBsaW5rUG9pbnQgPT09ICdjb250cm9sJyA/IHkgOiB0aGlzLnBhdGgucGF0aFsxXVsyXSxcclxuICAgICAgICB4MjogbGlua1BvaW50ID09PSAnZW5kJyA/IHggOiB0aGlzLnBhdGgucGF0aFsxXVszXSxcclxuICAgICAgICB5MjogbGlua1BvaW50ID09PSAnZW5kJyA/IHkgOiB0aGlzLnBhdGgucGF0aFsxXVs0XSxcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgICBpZiAoY29tbWl0KSB7XHJcbiAgICAgIGNvbnN0IHBhdGhTdHIgPSBgTSAke3BhdGguTS54fSAke3BhdGguTS55fSBRICR7cGF0aC5RLngxfSwgJHtwYXRoLlEueTF9LCAke3BhdGguUS54Mn0sICR7cGF0aC5RLnkyfWA7XHJcbiAgICAgIGNvbnN0IG5ld1BhdGggPSBuZXcgZmFicmljLlBhdGgocGF0aFN0ciwgdGhpcy5kZWZhdWx0UGF0aE9wdGlvbnMpO1xyXG4gICAgICB0aGlzLmNhbnZhcy5yZW1vdmUodGhpcy5wYXRoKTtcclxuICAgICAgdGhpcy5jYW52YXMuYWRkKG5ld1BhdGgpO1xyXG5cclxuICAgICAgbmV3UGF0aC5vbignbW91c2VvdmVyJywgdGhpcy5vbkxpbmtNb3VzZU92ZXIuYmluZCh0aGlzKSk7XHJcbiAgICAgIG5ld1BhdGgub24oJ21vdXNlb3V0JywgdGhpcy5vbkxpbmtNb3VzZU91dC5iaW5kKHRoaXMpKTtcclxuICAgICAgbmV3UGF0aC5vbignbW91c2Vkb3duJywgdGhpcy5icmluZ1RvRnJvbnQuYmluZCh0aGlzKSk7XHJcbiAgICAgIG5ld1BhdGgub24oJ21vdmluZycsIHRoaXMub25MaW5rTW92aW5nLmJpbmQodGhpcykpO1xyXG4gICAgICBuZXdQYXRoLm9uKCdtb3ZlZCcsIHRoaXMub25MaW5rTW92ZWQuYmluZCh0aGlzKSk7XHJcbiAgICAgIGNvbnN0IHRvQmluZCA9IFtcclxuICAgICAgICB0aGlzLmFycm93SGVhZCxcclxuICAgICAgICB0aGlzLmFycm93VGFpbCxcclxuICAgICAgICB0aGlzLmNvbnRyb2xQb2ludCxcclxuICAgICAgICB0aGlzLmNvbnRyb2xMaW5lMSxcclxuICAgICAgICB0aGlzLmNvbnRyb2xMaW5lMixcclxuICAgICAgXTtcclxuICAgICAgY29uc3QgYm9zc1RyYW5zZm9ybSA9IG5ld1BhdGguY2FsY1RyYW5zZm9ybU1hdHJpeCgpO1xyXG4gICAgICBjb25zdCBpbnZlcnRlZEJvc3NUcmFuc2Zvcm0gPSBmYWJyaWMudXRpbC5pbnZlcnRUcmFuc2Zvcm0oYm9zc1RyYW5zZm9ybSk7XHJcbiAgICAgIHRvQmluZC5mb3JFYWNoKChvKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZGVzaXJlZFRyYW5zZm9ybSA9IGZhYnJpYy51dGlsLm11bHRpcGx5VHJhbnNmb3JtTWF0cmljZXMoXHJcbiAgICAgICAgICBpbnZlcnRlZEJvc3NUcmFuc2Zvcm0sXHJcbiAgICAgICAgICBvLmNhbGNUcmFuc2Zvcm1NYXRyaXgoKSxcclxuICAgICAgICApO1xyXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxyXG4gICAgICAgIG8ucmVsYXRpb25zaGlwID0gZGVzaXJlZFRyYW5zZm9ybTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLnBhdGggPSBuZXdQYXRoO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYXRoLnNldCgncGF0aCcsIFtcclxuICAgICAgICBbJ00nLCBwYXRoLk0ueCwgcGF0aC5NLnldLFxyXG4gICAgICAgIFsnUScsIHBhdGguUS54MSwgcGF0aC5RLnkxLCBwYXRoLlEueDIsIHBhdGguUS55Ml0sXHJcbiAgICAgIF0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFVwZGF0ZSBjb250cm9sIGxpbmVzLCBhcnJvdyBoZWFkcyBhbmQgdGFpbHNcclxuICAgIHRoaXMuY29udHJvbExpbmUxLnNldCh7XHJcbiAgICAgIHgxOiB0aGlzLmNvbnRyb2xQb2ludC5sZWZ0LFxyXG4gICAgICB5MTogdGhpcy5jb250cm9sUG9pbnQudG9wLFxyXG4gICAgICB4MjogdGhpcy5wYXRoLnBhdGhbMF1bMV0sXHJcbiAgICAgIHkyOiB0aGlzLnBhdGgucGF0aFswXVsyXSxcclxuICAgIH0pO1xyXG4gICAgdGhpcy5jb250cm9sTGluZTIuc2V0KHtcclxuICAgICAgeDE6IHRoaXMuY29udHJvbFBvaW50LmxlZnQsXHJcbiAgICAgIHkxOiB0aGlzLmNvbnRyb2xQb2ludC50b3AsXHJcbiAgICAgIHgyOiB0aGlzLnBhdGgucGF0aFsxXVszXSxcclxuICAgICAgeTI6IHRoaXMucGF0aC5wYXRoWzFdWzRdLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBhcnJvd0hlYWRBbmdsZSA9IChNYXRoLmF0YW4yKHRoaXMucGF0aC5wYXRoWzFdWzRdIC0gdGhpcy5wYXRoLnBhdGhbMV1bMl0sIHRoaXMucGF0aC5wYXRoWzFdWzNdIC0gdGhpcy5wYXRoLnBhdGhbMV1bMV0pICogMTgwKSAvIE1hdGguUEk7XHJcbiAgICB0aGlzLmFycm93SGVhZC5hbmdsZSA9IGFycm93SGVhZEFuZ2xlICsgOTA7XHJcbiAgICB0aGlzLmFycm93SGVhZC5sZWZ0ID0gdGhpcy5wYXRoLnBhdGhbMV1bM107XHJcbiAgICB0aGlzLmFycm93SGVhZC50b3AgPSB0aGlzLnBhdGgucGF0aFsxXVs0XTtcclxuICAgIHRoaXMuYXJyb3dIZWFkLnNldENvb3JkcygpO1xyXG4gICAgdGhpcy5hcnJvd1RhaWwubGVmdCA9IHRoaXMucGF0aC5wYXRoWzBdWzFdO1xyXG4gICAgdGhpcy5hcnJvd1RhaWwudG9wID0gdGhpcy5wYXRoLnBhdGhbMF1bMl07XHJcbiAgICB0aGlzLmFycm93VGFpbC5zZXRDb29yZHMoKTtcclxuXHJcbiAgICB0aGlzLmJyaW5nVG9Gcm9udCgpO1xyXG5cclxuICAgIC8vIFJlc2V0IGNvbnRyb2wgcG9pbnRcclxuICAgIGlmIChyZXNldEN1cnYpIHtcclxuICAgICAgdGhpcy5yZXNldEN1cnZhdHVyZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNWYWxpZENvbm5lY3Rpb24obGlua1BvaW50LCBzaGFwZUlkLCBjYXJkaW5hbCkge1xyXG4gICAgY29uc3Qgc2hhcGUgPSB0aGlzLmNhbnZhcy5nZXRPYmplY3RzKClcclxuICAgICAgLmZpbmQoKG8pID0+IG8uaWQgPT09IHNoYXBlSWQpO1xyXG4gICAgLy8gQ2hlY2sgbm90IGFscmVhZHkgY29ubmVjdGVkXHJcbiAgICBpZiAobGlua1BvaW50ID09PSAnc3RhcnQnKSB7XHJcbiAgICAgIGlmICh0aGlzLnN0YXJ0ICYmIHRoaXMuc3RhcnQuc2hhcGUgJiYgdGhpcy5zdGFydC5zaGFwZS5pZCA9PT0gc2hhcGUuaWQgJiYgdGhpcy5zdGFydC5jYXJkaW5hbCA9PT0gY2FyZGluYWwpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIHRyeWluZyBlbmQgc2V0IHRoZSBzYW1lIGFscmVhZHkgY29ubmVjdGVkIGFuY2hvclxyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLmVuZCAmJiB0aGlzLmVuZC5zaGFwZSAmJiB0aGlzLmVuZC5zaGFwZS5pZCA9PT0gc2hhcGUuaWQpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIHRyeWluZyBlbmQgc2hvcnQgY2lyY3VpdCB0aGUgcmVjdGFuZ2xlXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAobGlua1BvaW50ID09PSAnZW5kJykge1xyXG4gICAgICBpZiAodGhpcy5lbmQgJiYgdGhpcy5lbmQuc2hhcGUgJiYgdGhpcy5lbmQuc2hhcGUuaWQgPT09IHNoYXBlLmlkICYmIHRoaXMuZW5kLmNhcmRpbmFsID09PSBjYXJkaW5hbCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTsgLy8gdHJ5aW5nIGVuZCBzZXQgdGhlIHNhbWUgYWxyZWFkeSBjb25uZWN0ZWQgYW5jaG9yXHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuc3RhcnQgJiYgdGhpcy5zdGFydC5zaGFwZSAmJiB0aGlzLnN0YXJ0LnNoYXBlLmlkID09PSBzaGFwZS5pZCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTsgLy8gdHJ5aW5nIGVuZCBzaG9ydCBjaXJjdWl0IHRoZSByZWN0YW5nbGVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVBbGxBbmNob3JzT3BhY2l0eShvcGFjaXR5KSB7XHJcbiAgICBjb25zdCBhbmNob3JzID0gdGhpcy5jYW52YXMuZ2V0T2JqZWN0cygpXHJcbiAgICAgIC5maWx0ZXIoKG8pID0+IG8udHlwZSA9PT0gJ2FuY2hvcicpO1xyXG5cclxuICAgIC8vIGNvbnN0IHByb21pc2VzID0gW107XHJcbiAgICAvLyBjb25zdCBwcm9taXNlRmFjdG9yeSA9IGZ1bmN0aW9uIChhbmNob3IpIHtcclxuICAgIC8vICAgcmV0dXJuIGZ1bmN0aW9uIChyZXNvbHZlKSB7XHJcbiAgICAvLyAgICAgYW5jaG9yLmFuaW1hdGUoJ29wYWNpdHknLCBvcGFjaXR5LCB7XHJcbiAgICAvLyAgICAgICBkdXJhdGlvbjogMzAwLFxyXG4gICAgLy8gICAgICAgb25DaGFuZ2U6IHJlc29sdmUsXHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyAgIH07XHJcbiAgICAvLyB9O1xyXG4gICAgLy8gZm9yIChsZXQgYSA9IDA7IGEgPCBhbmNob3JzLmxlbmd0aDsgYSArPSAxKSB7XHJcbiAgICAvLyAgIGlmIChsb2NrICE9PSB1bmRlZmluZWQpIGFuY2hvcnNbYV0ubG9ja09wYWNpdHkgPSBsb2NrO1xyXG4gICAgLy8gICBwcm9taXNlcy5wdXNoKG5ldyBQcm9taXNlKHByb21pc2VGYWN0b3J5KGFuY2hvcnNbYV0pKSk7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiB7XHJcbiAgICAvLyAgIHRoaXMuY2FudmFzLnJlbmRlckFsbCgpO1xyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgZm9yIChsZXQgYSA9IDA7IGEgPCBhbmNob3JzLmxlbmd0aDsgYSArPSAxKSB7XHJcbiAgICAgIC8vIGlmIChsb2NrICE9PSB1bmRlZmluZWQpIGFuY2hvcnNbYV0ubG9ja09wYWNpdHkgPSBsb2NrO1xyXG4gICAgICBhbmNob3JzW2FdLnNldCgnb3BhY2l0eScsIG9wYWNpdHkpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jYW52YXMucmVuZGVyQWxsKCk7XHJcbiAgfVxyXG5cclxuICBvbkxpbmtNb3VzZU92ZXIoKSB7XHJcbiAgICB0aGlzLmNvbnRyb2xQb2ludC50b2dnbGVPcGFjaXR5KDEpO1xyXG4gICAgdGhpcy5jb250cm9sTGluZTEudG9nZ2xlT3BhY2l0eSgxKTtcclxuICAgIHRoaXMuY29udHJvbExpbmUyLnRvZ2dsZU9wYWNpdHkoMSk7XHJcbiAgfVxyXG5cclxuICBvbkxpbmtNb3VzZU91dCgpIHtcclxuICAgIHRoaXMuY29udHJvbFBvaW50LnRvZ2dsZU9wYWNpdHkoMCk7XHJcbiAgICB0aGlzLmNvbnRyb2xMaW5lMS50b2dnbGVPcGFjaXR5KDApO1xyXG4gICAgdGhpcy5jb250cm9sTGluZTIudG9nZ2xlT3BhY2l0eSgwKTtcclxuICB9XHJcblxyXG4gIG9uTGlua01vdmluZygpIHtcclxuICAgIC8vIE1vdmUgc3RhcnQsIGVuZCwgY29udHJvbCBwb2ludHMgYWx0b2dldGhlciB3aXRoIHRoZSBQYXRoXHJcbiAgICBjb25zdCB0b1VwZGF0ZSA9IFtcclxuICAgICAgdGhpcy5hcnJvd0hlYWQsXHJcbiAgICAgIHRoaXMuYXJyb3dUYWlsLFxyXG4gICAgICB0aGlzLmNvbnRyb2xQb2ludCxcclxuICAgICAgdGhpcy5jb250cm9sTGluZTEsXHJcbiAgICAgIHRoaXMuY29udHJvbExpbmUyLFxyXG4gICAgXTtcclxuICAgIHRvVXBkYXRlLmZvckVhY2goKG8pID0+IHtcclxuICAgICAgaWYgKCFvLnJlbGF0aW9uc2hpcCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCB7IHJlbGF0aW9uc2hpcCB9ID0gbztcclxuICAgICAgY29uc3QgbmV3VHJhbnNmb3JtID0gZmFicmljLnV0aWwubXVsdGlwbHlUcmFuc2Zvcm1NYXRyaWNlcyhcclxuICAgICAgICB0aGlzLnBhdGguY2FsY1RyYW5zZm9ybU1hdHJpeCgpLFxyXG4gICAgICAgIHJlbGF0aW9uc2hpcCxcclxuICAgICAgKTtcclxuICAgICAgY29uc3Qgb3B0ID0gZmFicmljLnV0aWwucXJEZWNvbXBvc2UobmV3VHJhbnNmb3JtKTtcclxuICAgICAgby5zZXQoe1xyXG4gICAgICAgIGZsaXBYOiBmYWxzZSxcclxuICAgICAgICBmbGlwWTogZmFsc2UsXHJcbiAgICAgIH0pO1xyXG4gICAgICBvLnNldFBvc2l0aW9uQnlPcmlnaW4oXHJcbiAgICAgICAgeyB4OiBvcHQudHJhbnNsYXRlWCwgeTogb3B0LnRyYW5zbGF0ZVkgfSxcclxuICAgICAgICAnY2VudGVyJyxcclxuICAgICAgICAnY2VudGVyJyxcclxuICAgICAgKTtcclxuICAgICAgby5zZXQob3B0KTtcclxuICAgICAgby5zZXRDb29yZHMoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEZpbmFsbHksIGNoZWNrIHRoZSBzdGFydCBvciBlbmQgcG9pbnRzIGNhbiBiZSBjb25uZWN0ZWQuXHJcbiAgICB0aGlzLl9jaGVja0V4dHJlbWl0eUNhbkJlQ29ubmVjdGVkKCdzdGFydCcpO1xyXG4gICAgdGhpcy5fY2hlY2tFeHRyZW1pdHlDYW5CZUNvbm5lY3RlZCgnZW5kJyk7XHJcbiAgfVxyXG5cclxuICBvbkxpbmtNb3ZlZCgpIHtcclxuICAgIC8vIFJldXBkYXRlIHRoZSBQYXRoIGFjY29yZGluZyBlbmQgdGhlIG5ldyBjb29yZGluYXRlcyBvZiBhbGwgZWxlbWVudHNcclxuICAgIGNvbnN0IHBhdGhDb29yZHMgPSB7XHJcbiAgICAgIE06IHtcclxuICAgICAgICB4OiB0aGlzLmFycm93VGFpbC5sZWZ0LFxyXG4gICAgICAgIHk6IHRoaXMuYXJyb3dUYWlsLnRvcCxcclxuICAgICAgfSxcclxuICAgICAgUToge1xyXG4gICAgICAgIHgxOiB0aGlzLmNvbnRyb2xQb2ludC5sZWZ0LFxyXG4gICAgICAgIHkxOiB0aGlzLmNvbnRyb2xQb2ludC50b3AsXHJcbiAgICAgICAgeDI6IHRoaXMuYXJyb3dIZWFkLmxlZnQsXHJcbiAgICAgICAgeTI6IHRoaXMuYXJyb3dIZWFkLnRvcCxcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgICBjb25zdCBwYXRoU3RyID0gYE0gJHtwYXRoQ29vcmRzLk0ueH0gJHtwYXRoQ29vcmRzLk0ueX0gUSAke3BhdGhDb29yZHMuUS54MX0sICR7cGF0aENvb3Jkcy5RLnkxfSwgJHtwYXRoQ29vcmRzLlEueDJ9LCAke3BhdGhDb29yZHMuUS55Mn1gO1xyXG4gICAgY29uc3QgY2FjYSA9IG5ldyBmYWJyaWMuUGF0aChwYXRoU3RyLCB7fSk7XHJcbiAgICB0aGlzLnVwZGF0ZVBhdGgoJ3N0YXJ0JywgY2FjYS5wYXRoWzBdWzFdLCBjYWNhLnBhdGhbMF1bMl0sIGZhbHNlKTtcclxuICAgIHRoaXMudXBkYXRlUGF0aCgnZW5kJywgY2FjYS5wYXRoWzFdWzNdLCBjYWNhLnBhdGhbMV1bNF0sIGZhbHNlKTtcclxuICAgIHRoaXMudXBkYXRlUGF0aCgnY29udHJvbCcsIGNhY2EucGF0aFsxXVsxXSwgY2FjYS5wYXRoWzFdWzJdLCB0cnVlKTtcclxuXHJcbiAgICAvLyBDb25uZWN0IG9yIERpc2Nvbm5lY3QgZGVwZW5kaW5nIG9uIGV4dHJlbWl0aWVzIHBvc2l0aW9uc1xyXG4gICAgdGhpcy5pc1ZhbGlkVGFpbENvbm5lY3Rpb25NYXNrLnNldCgnb3BhY2l0eScsIDApO1xyXG4gICAgdGhpcy5pc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrLnNldCgnb3BhY2l0eScsIDApO1xyXG4gICAgdGhpcy5fY29ubmVjdERpc2Nvbm5lY3RFeHRyZW1pdHkoJ3N0YXJ0Jyk7XHJcbiAgICB0aGlzLl9jb25uZWN0RGlzY29ubmVjdEV4dHJlbWl0eSgnZW5kJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIZWxwZXIgZW5kIGRpc3BsYXkgYSB2YWxpZCBjaXJjbGUgbWFzayBvbiBzcGVjaWZpYyBjb25kaXRpb25zLlxyXG4gICAqIElmIHRoZSBleHRyZW1pdHkgaXMgdG91Y2hpbmcgYW4gYW5jaG9yIG9mIGEgTGlua2FibGVTaGFwZSBzdGFydCB3aGljaCBpdCBpcyBub3QgeWV0IGNvbm5lY3RlZCA9PiBzaG93IEdSRUVOXHJcbiAgICogSWYgdGhlIGV4dHJlbWl0eSBpcyB0b3VjaGluZyBhbiBhbmNob3Igb2YgYSBMaW5rYWJsZVNoYXBlIHN0YXJ0IHdoaWNoIGl0IGlzIGFscmVhZHkgY29ubmVjdGVkIGJ5IHRoZSBvdGhlciBleHRyZW1pdHkgPT4gc2hvdyBSRURcclxuICAgKiBAcGFyYW0gZGlyZWN0aW9uXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBfY2hlY2tFeHRyZW1pdHlDYW5CZUNvbm5lY3RlZChkaXJlY3Rpb24pIHtcclxuICAgIGNvbnN0IHsgY2FudmFzIH0gPSB0aGlzO1xyXG5cclxuICAgIGxldCBleHRyZW1pdHk7XHJcbiAgICBsZXQgbWFzaztcclxuICAgIGlmIChkaXJlY3Rpb24gPT09ICdzdGFydCcpIHtcclxuICAgICAgZXh0cmVtaXR5ID0gdGhpcy5hcnJvd1RhaWw7XHJcbiAgICAgIG1hc2sgPSB0aGlzLmlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2s7XHJcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ2VuZCcpIHtcclxuICAgICAgZXh0cmVtaXR5ID0gdGhpcy5hcnJvd0hlYWQ7XHJcbiAgICAgIG1hc2sgPSB0aGlzLmlzVmFsaWRIZWFkQ29ubmVjdGlvbk1hc2s7XHJcbiAgICB9XHJcblxyXG4gICAgbWFzay5sZWZ0ID0gZXh0cmVtaXR5LmxlZnQ7XHJcbiAgICBtYXNrLnRvcCA9IGV4dHJlbWl0eS50b3A7XHJcbiAgICBtYXNrLnNldENvb3JkcygpO1xyXG4gICAgbWFzay5zZXQoJ29wYWNpdHknLCAwKTtcclxuXHJcbiAgICAvLyBDaGVjayBpZiBpbnRlcnNlY3RzIHdpdGggYW5jaG9yXHJcbiAgICBjb25zdCBhbmNob3JzID0gY2FudmFzLmdldE9iamVjdHMoKVxyXG4gICAgICAuZmlsdGVyKChvKSA9PiBvLnR5cGUgPT09ICdhbmNob3InKTtcclxuICAgIGV4dHJlbWl0eS5zZXQoJ3N0cm9rZScsICcjMDAwJyk7XHJcbiAgICBmb3IgKGxldCBhID0gMDsgYSA8IGFuY2hvcnMubGVuZ3RoOyBhICs9IDEpIHtcclxuICAgICAgaWYgKGV4dHJlbWl0eS5pbnRlcnNlY3RzV2l0aE9iamVjdChhbmNob3JzW2FdKSkge1xyXG4gICAgICAgIG1hc2suc2V0KCdvcGFjaXR5JywgMC41KTtcclxuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkQ29ubmVjdGlvbihkaXJlY3Rpb24sIGFuY2hvcnNbYV0uc2hhcGVJZCwgYW5jaG9yc1thXS5jYXJkaW5hbCkpIHtcclxuICAgICAgICAgIG1hc2suc2V0KHtcclxuICAgICAgICAgICAgc3Ryb2tlOiAnIzU3Yjg1NycsXHJcbiAgICAgICAgICAgIGZpbGw6ICcjNTdiODU3JyxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgZXh0cmVtaXR5LnNldCgnc3Ryb2tlJywgJyM1ZjUnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbWFzay5zZXQoe1xyXG4gICAgICAgICAgICBzdHJva2U6ICcjZWE0ZjM3JyxcclxuICAgICAgICAgICAgZmlsbDogJyNlYTRmMzcnLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBleHRyZW1pdHkuc2V0KCdzdHJva2UnLCAnI2VhNGYzNycpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGVscGVyIGVuZCBleGVjdXRlIGNvbm5lY3QvZGlzY29ubmVjdCBkZXBlbmRpbmcgb24gc3BlY2lmaWMgY29uZGl0aW9ucy5cclxuICAgKiBJZiB0aGUgZXh0cmVtaXR5IHdhcyBjb25uZWN0ZWQgQU5EIGl0IGlzIE5PVCB0b3VjaGluZyB0aGUgYW5jaG9yIGFueW1vcmUgPT4gZGlzY29ubmVjdCBpdC5cclxuICAgKiBJZiB0aGUgZXh0cmVtaXR5IHdhcyBkaXNjb25uZWN0ZWQgQU5EIGl0IGlzIHRvdWNoaW5nIHRoZSBhbmNob3IgPT4gY29ubmVjdCBpdC5cclxuICAgKiBAcGFyYW0gZGlyZWN0aW9uXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBfY29ubmVjdERpc2Nvbm5lY3RFeHRyZW1pdHkoZGlyZWN0aW9uKSB7XHJcbiAgICBjb25zdCB7IGNhbnZhcyB9ID0gdGhpcztcclxuXHJcbiAgICBsZXQgZXh0cmVtaXR5O1xyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3N0YXJ0Jykge1xyXG4gICAgICBleHRyZW1pdHkgPSB0aGlzLmFycm93VGFpbDtcclxuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnZW5kJykge1xyXG4gICAgICBleHRyZW1pdHkgPSB0aGlzLmFycm93SGVhZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGVjayBpZiBpbnRlcnNlY3RzIHdpdGggYW5jaG9yXHJcbiAgICBjb25zdCBhbmNob3JzID0gY2FudmFzLmdldE9iamVjdHMoKVxyXG4gICAgICAuZmlsdGVyKChvKSA9PiBvLnR5cGUgPT09ICdhbmNob3InKTtcclxuICAgIGZvciAobGV0IGEgPSAwOyBhIDwgYW5jaG9ycy5sZW5ndGg7IGEgKz0gMSkge1xyXG4gICAgICBpZiAoZXh0cmVtaXR5LmludGVyc2VjdHNXaXRoT2JqZWN0KGFuY2hvcnNbYV0pKSB7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0TGluayhkaXJlY3Rpb24sIGFuY2hvcnNbYV0uc2hhcGVJZCwgYW5jaG9yc1thXS5jYXJkaW5hbCk7XHJcbiAgICAgICAgLy8gYW5jaG9yc1thXS5zZXQoJ3N0cm9rZScsICcjMDAwJyk7XHJcbiAgICAgICAgZXh0cmVtaXR5LnNldCgnc3Ryb2tlJywgJyMwMDAnKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzW2RpcmVjdGlvbl0gJiYgYW5jaG9yc1thXSA9PT0gdGhpc1tkaXJlY3Rpb25dLnNoYXBlLmFuY2hvcnNbdGhpc1tkaXJlY3Rpb25dLmFuY2hvcl0pIHtcclxuICAgICAgICAvLyBJZiB0aGlzIGxpbmsgd2FzIGNvbm5lY3RlZCBlbmQgdGhpcyBhbmNob3IgYW5kIGl0IGRvZXNuJ3QgaW50ZXJzZWN0IGFueW1vcmVcclxuICAgICAgICB0aGlzLmRpc2Nvbm5lY3RMaW5rKGRpcmVjdGlvbik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiY29uc3QgeyBmYWJyaWMgfSA9IHdpbmRvdztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpbmthYmxlU2hhcGUge1xyXG4gIC8qKlxyXG4gICAqIEEgTGlua2FibGVTaGFwZSBpcyBhbnkgRmFicmljLk9iamVjdCBzaGFwZSBvbiB3aGljaCBhbmNob3JzIGFyZSBhcHBlbmRlZCBzbyB0aGF0IG11bHRpcGxlIExpbmsgY2FuIGJlIGNvbm5lY3RlZCB0byBpdC5cclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgb3B0aW9uc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtGYWJyaWMuQ2FudmFzfSAgIG9wdGlvbnMuY2FudmFzIC0gRmFicmljIGNhbnZhc1xyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICBvcHRpb25zLmlkIC0gVW5pcXVlIGlkZW50aWZpZXJcclxuICAgKlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgaWQsXHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgc2hhcGUsXHJcbiAgICAgIGxlZnQsXHJcbiAgICAgIHRvcCxcclxuICAgICAgYW5nbGUsXHJcbiAgICB9ID0gb3B0aW9ucztcclxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuXHJcbiAgICAvLyBTZXQgc2hhcGVcclxuICAgIHNoYXBlLnNldCgndHlwZScsICdsaW5rYWJsZVNoYXBlJyk7XHJcbiAgICBzaGFwZS5zZXQoe1xyXG4gICAgICBsZWZ0LCB0b3AsIGlkLCBhbmdsZSxcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zaGFwZSA9IHNoYXBlO1xyXG5cclxuICAgIC8vIFNob3cgY29vcmRpbmF0ZXMvYW5nbGUgd2hlbiBtb3Zpbmcvcm90YXRpbmcgb2JqZWN0XHJcbiAgICBjb25zdCBtb2RpZmljYXRpb25Cb3ggPSBuZXcgZmFicmljLlJlY3Qoe1xyXG4gICAgICBsZWZ0OiAwLFxyXG4gICAgICB0b3A6IDAsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAgIHN0cm9rZTogJyM2NjYnLFxyXG4gICAgICBmaWxsOiAnI2ZmZicsXHJcbiAgICAgIHdpZHRoOiA3MCxcclxuICAgICAgaGVpZ2h0OiAyMCxcclxuICAgICAgdmVudGVkOiBmYWxzZSxcclxuICAgICAgc2VsZWN0YWJsZTogZmFsc2UsXHJcbiAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IG1vZGlmaWNhdGlvblRleHQgPSBuZXcgZmFicmljLlRleHQoJzAsIDAnLCB7XHJcbiAgICAgIGxlZnQ6IDAsXHJcbiAgICAgIHRvcDogMCxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICBmb250RmFtaWx5OiAnSGVsdmV0aWNhJyxcclxuICAgICAgZm9udFNpemU6IDEyLFxyXG4gICAgICBib3JkZXJTdHJva2VXaWR0aDogNCxcclxuICAgICAgZXZlbnRlZDogZmFsc2UsXHJcbiAgICAgIHNlbGVjdGFibGU6IGZhbHNlLFxyXG4gICAgICBvcGFjaXR5OiAwLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBtb2RpZmljYXRpb24gPSB0aGlzLm1vZEJveCA9IG5ldyBmYWJyaWMuR3JvdXAoW21vZGlmaWNhdGlvbkJveCwgbW9kaWZpY2F0aW9uVGV4dF0sIHtcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIGV2ZW50ZWQ6IGZhbHNlLFxyXG4gICAgICBzZWxlY3RhYmxlOiBmYWxzZSxcclxuICAgIH0pO1xyXG4gICAgY29uc3Qgb25Nb3ZpbmcgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHsgeCwgeSB9ID0gc2hhcGUuYUNvb3Jkcy50bDtcclxuICAgICAgY29uc3QgeENvb3JkcyA9IFtzaGFwZS5hQ29vcmRzLnRsLngsIHNoYXBlLmFDb29yZHMudHIueCwgc2hhcGUuYUNvb3Jkcy5ibC54LCBzaGFwZS5hQ29vcmRzLmJyLnhdO1xyXG4gICAgICBjb25zdCB5Q29vcmRzID0gW3NoYXBlLmFDb29yZHMudGwueSwgc2hhcGUuYUNvb3Jkcy50ci55LCBzaGFwZS5hQ29vcmRzLmJsLnksIHNoYXBlLmFDb29yZHMuYnIueV07XHJcbiAgICAgIG1vZGlmaWNhdGlvbi5sZWZ0ID0gKE1hdGgubWluKC4uLnhDb29yZHMpICsgTWF0aC5tYXgoLi4ueENvb3JkcykpIC8gMjtcclxuICAgICAgbW9kaWZpY2F0aW9uLnRvcCA9IE1hdGgucm91bmQoTWF0aC5tYXgoLi4ueUNvb3JkcykgKyAzMCk7XHJcbiAgICAgIG1vZGlmaWNhdGlvbi5zZXRDb29yZHMoKTtcclxuICAgICAgbW9kaWZpY2F0aW9uQm94LnNldCgnb3BhY2l0eScsIDAuNyk7XHJcbiAgICAgIG1vZGlmaWNhdGlvblRleHQuc2V0KCdvcGFjaXR5JywgMSk7XHJcbiAgICAgIG1vZGlmaWNhdGlvblRleHQuc2V0KCd0ZXh0JywgYCR7TWF0aC5yb3VuZCh4KX0sICR7TWF0aC5yb3VuZCh5KX1gKTtcclxuICAgICAgY2FudmFzLmJyaW5nVG9Gcm9udChtb2RpZmljYXRpb24pO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IG9uTW92ZWQgPSAoKSA9PiB7XHJcbiAgICAgIG1vZGlmaWNhdGlvbkJveC5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgICAgbW9kaWZpY2F0aW9uVGV4dC5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgIH07XHJcbiAgICBjb25zdCBvblJvdGF0aW5nID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCB4Q29vcmRzID0gW3NoYXBlLmFDb29yZHMudGwueCwgc2hhcGUuYUNvb3Jkcy50ci54LCBzaGFwZS5hQ29vcmRzLmJsLngsIHNoYXBlLmFDb29yZHMuYnIueF07XHJcbiAgICAgIGNvbnN0IHlDb29yZHMgPSBbc2hhcGUuYUNvb3Jkcy50bC55LCBzaGFwZS5hQ29vcmRzLnRyLnksIHNoYXBlLmFDb29yZHMuYmwueSwgc2hhcGUuYUNvb3Jkcy5ici55XTtcclxuICAgICAgbW9kaWZpY2F0aW9uLmxlZnQgPSAoTWF0aC5taW4oLi4ueENvb3JkcykgKyBNYXRoLm1heCguLi54Q29vcmRzKSkgLyAyO1xyXG4gICAgICBtb2RpZmljYXRpb24udG9wID0gTWF0aC5yb3VuZChNYXRoLm1heCguLi55Q29vcmRzKSArIDMwKTtcclxuICAgICAgbW9kaWZpY2F0aW9uLnNldENvb3JkcygpO1xyXG4gICAgICBtb2RpZmljYXRpb25Cb3guc2V0KCdvcGFjaXR5JywgMC43KTtcclxuICAgICAgbW9kaWZpY2F0aW9uVGV4dC5zZXQoJ29wYWNpdHknLCAxKTtcclxuICAgICAgbW9kaWZpY2F0aW9uVGV4dC5zZXQoJ3RleHQnLCBgJHtNYXRoLnJvdW5kKHNoYXBlLmFuZ2xlID4gMTgwID8gc2hhcGUuYW5nbGUgLSAzNjAgOiBzaGFwZS5hbmdsZSl9wrBgKTtcclxuICAgICAgY2FudmFzLmJyaW5nVG9Gcm9udChtb2RpZmljYXRpb24pO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IG9uUm90YXRlZCA9ICgpID0+IHtcclxuICAgICAgbW9kaWZpY2F0aW9uQm94LnNldCgnb3BhY2l0eScsIDApO1xyXG4gICAgICBtb2RpZmljYXRpb25UZXh0LnNldCgnb3BhY2l0eScsIDApO1xyXG4gICAgfTtcclxuICAgIHNoYXBlLm9uKHtcclxuICAgICAgbW92aW5nOiBvbk1vdmluZyxcclxuICAgICAgbW92ZWQ6IG9uTW92ZWQsXHJcbiAgICAgIHJvdGF0aW5nOiBvblJvdGF0aW5nLFxyXG4gICAgICByb3RhdGVkOiBvblJvdGF0ZWQsXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBBbmNob3IgcG9pbnRzXHJcbiAgICB0aGlzLmFuY2hvcnMgPSB0aGlzLnNoYXBlLmFuY2hvcnMgPSB7XHJcbiAgICAgIGVhc3Q6IHRoaXMuX21ha2VBbmNob3JQb2ludCgnZWFzdCcpLFxyXG4gICAgICB3ZXN0OiB0aGlzLl9tYWtlQW5jaG9yUG9pbnQoJ3dlc3QnKSxcclxuICAgICAgLy8gbm9ydGg6IHRoaXMuX21ha2VBbmNob3JQb2ludCgnbm9ydGgnKSxcclxuICAgICAgLy8gc291dGg6IHRoaXMuX21ha2VBbmNob3JQb2ludCgnc291dGgnKSxcclxuICAgICAgLy8gbm9ydGhlYXN0OiB0aGlzLl9tYWtlQW5jaG9yUG9pbnQoJ25vcnRoZWFzdCcpLFxyXG4gICAgICAvLyBub3J0aHdlc3Q6IHRoaXMuX21ha2VBbmNob3JQb2ludCgnbm9ydGh3ZXN0JyksXHJcbiAgICAgIC8vIHNvdXRoZWFzdDogdGhpcy5fbWFrZUFuY2hvclBvaW50KCdzb3V0aGVhc3QnKSxcclxuICAgICAgLy8gc291dGh3ZXN0OiB0aGlzLl9tYWtlQW5jaG9yUG9pbnQoJ3NvdXRod2VzdCcpLFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBFdmVudHMgcmVsYXRlZCB0byBhbmNob3JzXHJcbiAgICBzaGFwZS5vbih7XHJcbiAgICAgIHNlbGVjdGVkOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy50b2dnbGVBbmNob3JzT3BhY2l0eSgxKTtcclxuICAgICAgfSxcclxuICAgICAgbW91c2VvdmVyOiAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FudmFzLmdldEFjdGl2ZU9iamVjdCgpICE9PSB0aGlzLnNoYXBlKSB7XHJcbiAgICAgICAgICB0aGlzLnRvZ2dsZUFuY2hvcnNPcGFjaXR5KDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgbW91c2VvdXQ6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnRvZ2dsZUFuY2hvcnNPcGFjaXR5KDEpO1xyXG4gICAgICB9LFxyXG4gICAgICBtb2RpZnlpbmc6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnJlZnJlc2hBbmNob3JzUG9zaXRpb24oZmFsc2UpO1xyXG4gICAgICB9LFxyXG4gICAgICBtb2RpZmllZDogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbih0cnVlKTtcclxuICAgICAgfSxcclxuICAgICAgbW92aW5nOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKGZhbHNlKTtcclxuICAgICAgfSxcclxuICAgICAgbW92ZWQ6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnJlZnJlc2hBbmNob3JzUG9zaXRpb24odHJ1ZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHJvdGF0aW5nOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKGZhbHNlKTtcclxuICAgICAgfSxcclxuICAgICAgcm90YXRlZDogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbih0cnVlKTtcclxuICAgICAgfSxcclxuICAgICAgc2NhbGluZzogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbihmYWxzZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHNjYWxlZDogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbih0cnVlKTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5qZWN0KCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBpZCxcclxuICAgICAgY2FudmFzLFxyXG4gICAgICBzaGFwZSxcclxuICAgICAgYW5jaG9ycyxcclxuICAgICAgbW9kQm94LFxyXG4gICAgfSA9IHRoaXM7XHJcbiAgICBjYW52YXMuYWRkKHNoYXBlKTtcclxuICAgIGNhbnZhcy5hZGQobW9kQm94KTtcclxuICAgIE9iamVjdC5rZXlzKGFuY2hvcnMpLmZvckVhY2goKGNhcmRpbmFsKSA9PiB7XHJcbiAgICAgIGNhbnZhcy5hZGQoYW5jaG9yc1tjYXJkaW5hbF0pO1xyXG4gICAgICBjYW52YXMuYnJpbmdGb3J3YXJkKGFuY2hvcnNbY2FyZGluYWxdLCB0cnVlKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5yZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKHRydWUpO1xyXG5cclxuICAgIGNhbnZhcy5saW5rYWJsZVNoYXBlc1tpZF0gPSB0aGlzO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBpZCxcclxuICAgICAgY2FudmFzLFxyXG4gICAgICBzaGFwZSxcclxuICAgICAgYW5jaG9ycyxcclxuICAgICAgbW9kQm94LFxyXG4gICAgfSA9IHRoaXM7XHJcbiAgICBjYW52YXMucmVtb3ZlKHNoYXBlKTtcclxuICAgIGNhbnZhcy5yZW1vdmUobW9kQm94KTtcclxuICAgIE9iamVjdC5rZXlzKGFuY2hvcnMpLmZvckVhY2goKGNhcmRpbmFsKSA9PiB7XHJcbiAgICAgIGNhbnZhcy5yZW1vdmUoYW5jaG9yc1tjYXJkaW5hbF0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVsZXRlIGNhbnZhcy5saW5rYWJsZVNoYXBlc1tpZF07XHJcbiAgfVxyXG5cclxuICBtb3ZlKG9wdGlvbnMsIGl0ZXIpIHtcclxuICAgIGNvbnN0IHsgY2FudmFzLCBzaGFwZSB9ID0gdGhpcztcclxuXHJcbiAgICAvLyBNb3ZlIHRoZSBzaGFwZSBhbmQgdXBkYXRlIGNvb3JkcyBhbmQgYW5jaG9yc1xyXG4gICAgbGV0IGxlZnQgPSBvcHRpb25zLnggfHwgc2hhcGUubGVmdDtcclxuICAgIGxldCB0b3AgPSBvcHRpb25zLnkgfHwgc2hhcGUudG9wO1xyXG4gICAgdGhpcy5zaGFwZS5zZXQoJ2xlZnQnLCBsZWZ0KTtcclxuICAgIHRoaXMuc2hhcGUuc2V0KCd0b3AnLCB0b3ApO1xyXG4gICAgdGhpcy5zaGFwZS5zZXRDb29yZHMoKTtcclxuICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbigpO1xyXG4gICAgdGhpcy5zaGFwZS5maXJlKG9wdGlvbnMubW92aW5nID8gJ21vdmluZycgOiAnbW92ZWQnKTtcclxuXHJcbiAgICAvLyBQcmV2ZW50IExpbmthYmxlU2hhcGUgdG8gb3ZlcmxhcCB3aXRoIGVhY2ggb3RoZXJcclxuICAgIGNvbnN0IGNsZWFyYW5jZSA9IDEwO1xyXG4gICAgc2hhcGUuc2V0Q29vcmRzKCk7IC8vIFNldHMgY29ybmVyIHBvc2l0aW9uIGNvb3JkaW5hdGVzIGJhc2VkIG9uIGN1cnJlbnQgYW5nbGUsIHdpZHRoIGFuZCBoZWlnaHRcclxuICAgIGxldCBpc0ludGVyc2VjdGluZyA9IGZhbHNlO1xyXG4gICAgaWYgKCFvcHRpb25zLnNraXBDb2xsaXNpb24pIHtcclxuICAgICAgY29uc3Qgb3RoZXJTaGFwZXMgPSBPYmplY3QudmFsdWVzKGNhbnZhcy5saW5rYWJsZVNoYXBlcyk7XHJcbiAgICAgIGZvciAobGV0IG8gPSAwOyBvIDwgb3RoZXJTaGFwZXMubGVuZ3RoOyBvICs9IDEpIHtcclxuICAgICAgICBjb25zdCB0YXJnID0gb3RoZXJTaGFwZXNbb10uc2hhcGU7XHJcblxyXG4gICAgICAgIGlmICh0YXJnICE9PSBzaGFwZSkge1xyXG4gICAgICAgICAgaWYgKHNoYXBlLmludGVyc2VjdHNXaXRoT2JqZWN0KHRhcmcpKSB7XHJcbiAgICAgICAgICAgIGlzSW50ZXJzZWN0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29uc3Qgc0IgPSBzaGFwZS5hQ29vcmRzLmJsLnk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNUID0gc2hhcGUuYUNvb3Jkcy50bC55O1xyXG4gICAgICAgICAgICBjb25zdCBzUiA9IHNoYXBlLmFDb29yZHMudHIueDtcclxuICAgICAgICAgICAgY29uc3Qgc0wgPSBzaGFwZS5hQ29vcmRzLnRsLng7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0QiA9IHRhcmcuYUNvb3Jkcy5ibC55O1xyXG4gICAgICAgICAgICBjb25zdCB0VCA9IHRhcmcuYUNvb3Jkcy50bC55O1xyXG4gICAgICAgICAgICBjb25zdCB0UiA9IHRhcmcuYUNvb3Jkcy50ci54O1xyXG4gICAgICAgICAgICBjb25zdCB0TCA9IHRhcmcuYUNvb3Jkcy50bC54O1xyXG5cclxuICAgICAgICAgICAgaWYgKHNCIC0gdFQgPiBjbGVhcmFuY2UpIHtcclxuICAgICAgICAgICAgICB0b3AgPSB0VCAtIHNoYXBlLmhlaWdodCAtIGNsZWFyYW5jZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzVCAtIHRCIDwgY2xlYXJhbmNlKSB7XHJcbiAgICAgICAgICAgICAgdG9wID0gdEIgKyBjbGVhcmFuY2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc1IgLSB0TCA+IGNsZWFyYW5jZSkge1xyXG4gICAgICAgICAgICAgIGxlZnQgPSB0TCAtIHNoYXBlLndpZHRoIC0gY2xlYXJhbmNlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNMIC0gdFIgPCBjbGVhcmFuY2UpIHtcclxuICAgICAgICAgICAgICBsZWZ0ID0gdFIgKyBjbGVhcmFuY2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgaXRlcmF0aW9uID0gaXRlciB8fCAwO1xyXG4gICAgaWYgKGlzSW50ZXJzZWN0aW5nICYmIGl0ZXJhdGlvbiA8IDEwMCkge1xyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cclxuICAgICAgaXRlcmF0aW9uICs9IDE7XHJcbiAgICAgIHRoaXMubW92ZSh7XHJcbiAgICAgICAgeDogbGVmdCxcclxuICAgICAgICB5OiB0b3AsXHJcbiAgICAgICAgbW92aW5nOiBvcHRpb25zLm1vdmluZyxcclxuICAgICAgfSwgaXRlcmF0aW9uKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJvdGF0ZShhbmdsZSkge1xyXG4gICAgdGhpcy5zaGFwZS5yb3RhdGUoYW5nbGUpO1xyXG4gICAgdGhpcy5zaGFwZS5zZXRDb29yZHMoKTtcclxuICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgcmVmcmVzaEFuY2hvcnNQb3NpdGlvbihjb21taXQpIHtcclxuICAgIE9iamVjdC5rZXlzKHRoaXMuYW5jaG9ycykuZm9yRWFjaCgoY2FyZGluYWwpID0+IHtcclxuICAgICAgdGhpcy5fc2V0QW5jaG9yUG9zaXRpb25SZWxhdGl2ZVRvUmVjdGFuZ2xlKGNhcmRpbmFsLCBjb21taXQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVBbmNob3JzT3BhY2l0eShvcGFjaXR5KSB7XHJcbiAgICBPYmplY3Qua2V5cyh0aGlzLmFuY2hvcnMpLmZvckVhY2goKGNhcmRpbmFsKSA9PiB7XHJcbiAgICAgIHRoaXMuYW5jaG9yc1tjYXJkaW5hbF0udG9nZ2xlT3BhY2l0eShvcGFjaXR5KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYnJpbmdUb0Zyb250KCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBjYW52YXMsIHNoYXBlLCBtb2RCb3gsIGFuY2hvcnMsXHJcbiAgICB9ID0gdGhpcztcclxuICAgIHNoYXBlLmJyaW5nVG9Gcm9udCgpO1xyXG4gICAgbW9kQm94LmJyaW5nVG9Gcm9udCgpO1xyXG4gICAgT2JqZWN0LmtleXMoYW5jaG9ycykuZm9yRWFjaCgoY2FyZGluYWwpID0+IHtcclxuICAgICAgY2FudmFzLmJyaW5nVG9Gcm9udChhbmNob3JzW2NhcmRpbmFsXSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIF9zZXRBbmNob3JQb3NpdGlvblJlbGF0aXZlVG9SZWN0YW5nbGUoY2FyZGluYWwsIGNvbW1pdCkge1xyXG4gICAgbGV0IGxlZnQ7XHJcbiAgICBsZXQgdG9wO1xyXG4gICAgY29uc3QgeyBzaGFwZSB9ID0gdGhpcztcclxuICAgIGNvbnN0IGFwID0gdGhpcy5hbmNob3JzW2NhcmRpbmFsXTtcclxuICAgIHN3aXRjaCAoY2FyZGluYWwpIHtcclxuICAgICAgY2FzZSAnZWFzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMudHIueCArIHNoYXBlLmFDb29yZHMuYnIueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLnRyLnkgKyBzaGFwZS5hQ29vcmRzLmJyLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICd3ZXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSAoc2hhcGUuYUNvb3Jkcy50bC54ICsgc2hhcGUuYUNvb3Jkcy5ibC54KSAvIDI7XHJcbiAgICAgICAgdG9wID0gKHNoYXBlLmFDb29yZHMudGwueSArIHNoYXBlLmFDb29yZHMuYmwueSkgLyAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRoJzoge1xyXG4gICAgICAgIGxlZnQgPSAoc2hhcGUuYUNvb3Jkcy50bC54ICsgc2hhcGUuYUNvb3Jkcy50ci54KSAvIDI7XHJcbiAgICAgICAgdG9wID0gKHNoYXBlLmFDb29yZHMudGwueSArIHNoYXBlLmFDb29yZHMudHIueSkgLyAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRoJzoge1xyXG4gICAgICAgIGxlZnQgPSAoc2hhcGUuYUNvb3Jkcy5ibC54ICsgc2hhcGUuYUNvb3Jkcy5ici54KSAvIDI7XHJcbiAgICAgICAgdG9wID0gKHNoYXBlLmFDb29yZHMuYmwueSArIHNoYXBlLmFDb29yZHMuYnIueSkgLyAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRoZWFzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gc2hhcGUuYUNvb3Jkcy50ci54O1xyXG4gICAgICAgIHRvcCA9IHNoYXBlLmFDb29yZHMudHIueTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aHdlc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IHNoYXBlLmFDb29yZHMudGwueDtcclxuICAgICAgICB0b3AgPSBzaGFwZS5hQ29vcmRzLnRsLnk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnc291dGhlYXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSBzaGFwZS5hQ29vcmRzLmJyLng7XHJcbiAgICAgICAgdG9wID0gc2hhcGUuYUNvb3Jkcy5ici55O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRod2VzdCc6XHJcbiAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICBsZWZ0ID0gc2hhcGUuYUNvb3Jkcy5ibC54O1xyXG4gICAgICAgIHRvcCA9IHNoYXBlLmFDb29yZHMuYmwueTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgYXAubGVmdCA9IGxlZnQ7XHJcbiAgICBhcC50b3AgPSB0b3A7XHJcbiAgICBhcC5zZXRDb29yZHMoKTtcclxuXHJcbiAgICBhcC5maXJlKGNvbW1pdCA/ICdwZzpwb3NpdGlvbjptb2RpZmllZCcgOiAncGc6cG9zaXRpb246bW9kaWZ5aW5nJyk7XHJcbiAgfVxyXG5cclxuICBfbWFrZUFuY2hvclBvaW50KGNhcmRpbmFsKSB7XHJcbiAgICBsZXQgbGVmdDtcclxuICAgIGxldCB0b3A7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHNoYXBlLFxyXG4gICAgICBpZCxcclxuICAgICAgY2FudmFzLFxyXG4gICAgfSA9IHRoaXM7XHJcbiAgICBzd2l0Y2ggKGNhcmRpbmFsKSB7XHJcbiAgICAgIGNhc2UgJ2Vhc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IChzaGFwZS5hQ29vcmRzLnRyLnggKyBzaGFwZS5hQ29vcmRzLmJyLngpIC8gMjtcclxuICAgICAgICB0b3AgPSAoc2hhcGUuYUNvb3Jkcy50ci55ICsgc2hhcGUuYUNvb3Jkcy5ici55KSAvIDI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnd2VzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMudGwueCArIHNoYXBlLmFDb29yZHMuYmwueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLnRsLnkgKyBzaGFwZS5hQ29vcmRzLmJsLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMudGwueCArIHNoYXBlLmFDb29yZHMudHIueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLnRsLnkgKyBzaGFwZS5hQ29vcmRzLnRyLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMuYmwueCArIHNoYXBlLmFDb29yZHMuYnIueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLmJsLnkgKyBzaGFwZS5hQ29vcmRzLmJyLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aGVhc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IHNoYXBlLmFDb29yZHMudHIueDtcclxuICAgICAgICB0b3AgPSBzaGFwZS5hQ29vcmRzLnRyLnk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnbm9ydGh3ZXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSBzaGFwZS5hQ29vcmRzLnRsLng7XHJcbiAgICAgICAgdG9wID0gc2hhcGUuYUNvb3Jkcy50bC55O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRoZWFzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gc2hhcGUuYUNvb3Jkcy5ici54O1xyXG4gICAgICAgIHRvcCA9IHNoYXBlLmFDb29yZHMuYnIueTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aHdlc3QnOlxyXG4gICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgbGVmdCA9IHNoYXBlLmFDb29yZHMuYmwueDtcclxuICAgICAgICB0b3AgPSBzaGFwZS5hQ29vcmRzLmJsLnk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBjb25zdCBhcCA9IG5ldyBmYWJyaWMuQ2lyY2xlKHtcclxuICAgIC8vICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAvLyAgIGxlZnQsXHJcbiAgICAvLyAgIHRvcCxcclxuICAgIC8vICAgc3Ryb2tlV2lkdGg6IDIsXHJcbiAgICAvLyAgIHJhZGl1czogNixcclxuICAgIC8vICAgZmlsbDogJyM3OGJlZmEnLCAvLyA0MmEyZGEgZDVlOGYyXHJcbiAgICAvLyAgIHN0cm9rZTogJyM3OGJlZmEnLFxyXG4gICAgLy8gICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgIC8vICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAvLyAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgLy8gICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAvLyAgIHNlbGVjdGFibGU6IGZhbHNlLFxyXG4gICAgLy8gICBvcGFjaXR5OiAwLFxyXG4gICAgLy8gICBpZDogYCR7aWR9XyR7Y2FyZGluYWx9YCxcclxuICAgIC8vIH0pO1xyXG4gICAgY29uc3QgYXAgPSBuZXcgZmFicmljLlJlY3Qoe1xyXG4gICAgICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgICAgd2lkdGg6IDEwLFxyXG4gICAgICBoZWlnaHQ6IDEwLFxyXG4gICAgICBsZWZ0LFxyXG4gICAgICB0b3AsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICBmaWxsOiAnI2RkZCcsXHJcbiAgICAgIHN0cm9rZTogJyM5OTknLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAgIHNlbGVjdGFibGU6IGZhbHNlLFxyXG4gICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICBpZDogYCR7aWR9XyR7Y2FyZGluYWx9YCxcclxuICAgIH0pO1xyXG4gICAgYXAudHlwZSA9ICdhbmNob3InO1xyXG4gICAgYXAuc2hhcGVJZCA9IGlkO1xyXG4gICAgYXAuY2FyZGluYWwgPSBjYXJkaW5hbDtcclxuICAgIGFwLm9uKCdtb3VzZW92ZXInLCAoKSA9PiB7XHJcbiAgICAgIGFwLnNldCgnZmlsbCcsICcjNzhiZWZhJyk7XHJcbiAgICAgIGFwLnNldCgnc3Ryb2tlJywgJyM3OGJlZmEnKTtcclxuICAgICAgY2FudmFzLnJlbmRlckFsbCgpO1xyXG4gICAgfSk7XHJcbiAgICBhcC5vbignbW91c2VvdXQnLCAoKSA9PiB7XHJcbiAgICAgIGFwLnNldCgnZmlsbCcsICcjZGRkJyk7XHJcbiAgICAgIGFwLnNldCgnc3Ryb2tlJywgJyM5OTknKTtcclxuICAgICAgY2FudmFzLnJlbmRlckFsbCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYXAub24oJ21vdXNlZG93bicsIChvcHRpb25zKSA9PiB7XHJcbiAgICAgIHN3aXRjaCAob3B0aW9ucy5idXR0b24pIHtcclxuICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICB0aGlzLl9vbkFuY2hvclJpZ2h0Q2xpY2suY2FsbCh0aGlzLCBvcHRpb25zKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgIHRoaXMuX29uQW5jaG9yTWlkZGxlQ2xpY2suY2FsbCh0aGlzLCBvcHRpb25zKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTpcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgdGhpcy5fb25BbmNob3JMZWZ0Q2xpY2suY2FsbCh0aGlzLCBvcHRpb25zKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBhcDtcclxuICB9XHJcblxyXG4gIC8vIFNob3VsZCBiZSBpbXBsZW1lbnRlZCBieSBFeHRlbmRpbmcgQ2xhc3Nlc1xyXG4gIC8qIGVzbGludC1kaXNhYmxlIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXMgKi9cclxuICBfb25BbmNob3JMZWZ0Q2xpY2soLyogb3B0aW9ucyAqLykge31cclxuXHJcbiAgX29uQW5jaG9yTWlkZGxlQ2xpY2soLyogb3B0aW9ucyAqLykge31cclxuXHJcbiAgX29uQW5jaG9yUmlnaHRDbGljaygvKiBvcHRpb25zICovKSB7fVxyXG5cclxuICAvKiBlc2xpbnQtZGlzYWJsZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzICovXHJcbn1cclxuIiwiaW1wb3J0IEV4cGFuZGFibGVDb250YWluZXIgZnJvbSAnLi9FeHBhbmRhYmxlQ29udGFpbmVyLmpzJztcclxuaW1wb3J0IEN1cnZlZExpbmsgZnJvbSAnLi9DdXJ2ZWRMaW5rLmpzJztcclxuXHJcbmNvbnN0IHsgZmFicmljLCBfIH0gPSB3aW5kb3c7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9jZXNzR3JhcGgge1xyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQHBhcmFtIG9wdGlvbnNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Q2FudmFzfSBvcHRpb25zLmNhbnZhcyAtIEZhYnJpY0pTLkNhbnZhcyBpbnN0YW5jZSAtIG1hbmRhdG9yeSBpZiBvcHRpb25zLmNhbnZhc09wdHMgbm90IHByb3ZpZGVkLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuY2FudmFzT3B0cyAtIEZhYnJpY0pTLkNhbnZhcyNpbml0aWFsaXplIHBhcmFtZXRlcnMgLSBtYW5kYXRvcnkgaWYgb3B0aW9ucy5jYW52YXMgbm90IHByb3ZpZGVkXHJcbiAgICogICAgICAgICAgICAgICAgIFNlZSBodHRwOi8vZmFicmljanMuY29tL2RvY3MvZmFicmljLkNhbnZhcy5odG1sI2luaXRpYWxpemUgZm9yIGRldGFpbHNcclxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fFN0cmluZ30gb3B0aW9ucy5jYW52YXMuZWwgLSA8Y2FudmFzPiBlbGVtZW50IHRvIGluaXRpYWxpemUgaW5zdGFuY2Ugb25cclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5jYW52YXMub3B0aW9ucyAtIE9wdGlvbnMgb2JqZWN0XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZ3JpZF0gLSBkaW1lbnNpb25zIG9mIHRoZSBncmlkXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgdGhpcy5oYW5kbGVycyA9IHtcclxuICAgICAgZ3JpZDoge30sXHJcbiAgICB9O1xyXG4gICAgdGhpcy50ZW1wRHJhZ2dlZE9iamVjdCA9IG51bGw7XHJcbiAgICB0aGlzLnNlbGVjdGVkQ2hvb3NlclR5cGUgPSBudWxsO1xyXG5cclxuICAgIC8vIEluaXRpYWxpemUgQ2FudmFzXHJcbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLmNhbnZhcyA9IG9wdGlvbnMuY2FudmFzID8gb3B0aW9ucy5jYW52YXMgOiBuZXcgZmFicmljLkNhbnZhcyhvcHRpb25zLmNhbnZhc09wdHMuZWwsIG9wdGlvbnMuY2FudmFzT3B0cy5vcHRpb25zKTtcclxuICAgIGNhbnZhcy5zZXQoJ3ByZXNlcnZlT2JqZWN0U3RhY2tpbmcnLCB0cnVlKTtcclxuICAgIC8vIGNhbnZhcy5zZXQoJ3JlbmRlck9uQWRkUmVtb3ZlJywgZmFsc2UpO1xyXG4gICAgY2FudmFzLnNldCgnZmlyZVJpZ2h0Q2xpY2snLCB0cnVlKTtcclxuICAgIGNhbnZhcy5zZXQoJ2ZpcmVNaWRkbGVDbGljaycsIHRydWUpO1xyXG4gICAgY2FudmFzLnNldCgnc3RvcENvbnRleHRNZW51JywgdHJ1ZSk7XHJcbiAgICBjYW52YXMubGlua2FibGVTaGFwZXMgPSB7fTtcclxuICAgIGNhbnZhcy5saW5rcyA9IHt9O1xyXG5cclxuICAgIC8vIFNldCBncmlkXHJcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZ3JpZCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgdGhpcy5zZXRHcmlkKHtcclxuICAgICAgICBncmlkOiBvcHRpb25zLmdyaWQsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGZhYnJpYy5PYmplY3QucHJvdG90eXBlLm9yaWdpblggPSBmYWJyaWMuT2JqZWN0LnByb3RvdHlwZS5vcmlnaW5ZID0gJ2NlbnRlcic7XHJcbiAgICBmYWJyaWMuT2JqZWN0LnByb3RvdHlwZS50b2dnbGVPcGFjaXR5ID0gZnVuY3Rpb24gdG9nZ2xlT3BhY2l0eShvcGFjaXR5LyogLCB0aW1lb3V0ICovKSB7XHJcbiAgICAgIC8vIHRoaXMuYW5pbWF0ZSgnb3BhY2l0eScsIG9wYWNpdHksIHtcclxuICAgICAgLy8gICBkdXJhdGlvbjogdGltZW91dCAhPT0gdW5kZWZpbmVkID8gdGltZW91dCA6IDMwMCxcclxuICAgICAgLy8gICBvbkNoYW5nZTogdGhpcy5jYW52YXMucmVuZGVyQWxsLmJpbmQodGhpcy5jYW52YXMpLFxyXG4gICAgICAvLyB9KTtcclxuICAgICAgdGhpcy5zZXQoJ29wYWNpdHknLCBvcGFjaXR5KTtcclxuICAgICAgdGhpcy5jYW52YXMucmVuZGVyQWxsKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNhbnZhcy5jYWxjT2Zmc2V0KCk7XHJcblxyXG4gICAgLy8gUHJldmVudCBub24gTGlua2FibGVTaGFwZSBvYmplY3RzIHRvIGJlIGdyb3VwZWQgZHVyaW5nIHNlbGVjdGlvblxyXG4gICAgY29uc3Qgb25TZWxlY3Rpb24gPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGFjdGl2ZSA9IGNhbnZhcy5nZXRBY3RpdmVPYmplY3QoKTtcclxuICAgICAgLy8gV2hlbiBtdWx0aSBzZWxlY3Rpb24sIHJlbW92ZSBhbnkgbm9uIExpbmthYmxlIFNoYXBlIG9iamVjdHNcclxuICAgICAgaWYgKGFjdGl2ZS50eXBlID09PSAnYWN0aXZlU2VsZWN0aW9uJykge1xyXG4gICAgICAgIGNvbnN0IG9iamVjdHMgPSBhY3RpdmUuZ2V0T2JqZWN0cygpO1xyXG4gICAgICAgIGlmIChvYmplY3RzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgIGNvbnN0IG9ubHlSZWN0ID0gb2JqZWN0cy5maWx0ZXIoKG8pID0+IG8udHlwZSA9PT0gJ2xpbmthYmxlU2hhcGUnKTtcclxuICAgICAgICAgIGNhbnZhcy5fZGlzY2FyZEFjdGl2ZU9iamVjdCgpO1xyXG4gICAgICAgICAgY29uc3Qgc2VsID0gbmV3IGZhYnJpYy5BY3RpdmVTZWxlY3Rpb24ob25seVJlY3QsIHtcclxuICAgICAgICAgICAgY2FudmFzLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBjYW52YXMuX3NldEFjdGl2ZU9iamVjdChzZWwpO1xyXG5cclxuICAgICAgICAgIC8vIFVwZGF0ZSBhbnkgbGlua3MgY29ubmVjdGVkIHRvIHRoZSBMaW5rYWJsZSBTaGFwZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjYW52YXMub24oe1xyXG4gICAgICAnc2VsZWN0aW9uOmNyZWF0ZWQnOiBvblNlbGVjdGlvbixcclxuICAgICAgJ3NlbGVjdGlvbjp1cGRhdGVkJzogb25TZWxlY3Rpb24sXHJcbiAgICAgIGRyYWdlbnRlcjogdGhpcy5vbkRyYWdFbnRlci5iaW5kKHRoaXMpLFxyXG4gICAgICBkcmFnb3ZlcjogdGhpcy5vbkRyYWdPdmVyLmJpbmQodGhpcyksXHJcbiAgICAgIGRyYWdsZWF2ZTogdGhpcy5vbkRyYWdMZWF2ZS5iaW5kKHRoaXMpLFxyXG4gICAgICBkcm9wOiB0aGlzLm9uRHJvcC5iaW5kKHRoaXMpLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgY2FudmFzIHRvIGhhdmUgYSBncmlkLlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuZ3JpZCAtIGdyaWQgc3BhY2luZyAocGl4ZWxzKVxyXG4gICAqL1xyXG4gIHNldEdyaWQob3B0aW9ucykge1xyXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmdyaWQgIT09ICdudW1iZXInIHx8IG9wdGlvbnMuZ3JpZCA8IDApIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50IFwiZ3JpZFwiIGluIFByb2Nlc3NHcmFwI3NldEdyaWQuIChyZXF1aXJlZDogTnVtYmVyID4gMCknKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmdyaWQgPSBvcHRpb25zLmdyaWQ7XHJcbiAgICBjb25zdCB7IGNhbnZhcyB9ID0gdGhpcztcclxuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLW11bHRpLXN0ciAqL1xyXG4gICAgY29uc3QgZGF0YSA9IGA8c3ZnIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+IFxcXHJcbiAgICAgICAgPGRlZnM+IFxcXHJcbiAgICAgICAgICAgIDxwYXR0ZXJuIGlkPVwic21hbGxHcmlkXCIgd2lkdGg9XCIke3RoaXMuZ3JpZH1cIiBoZWlnaHQ9XCIke3RoaXMuZ3JpZH1cIiBwYXR0ZXJuVW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiPiBcXFxyXG4gICAgICAgICAgICAgICAgPHBhdGggZD1cIk0gJHt0aGlzLmdyaWR9IDAgTCAwIDAgMCAke3RoaXMuZ3JpZH1cIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImdyYXlcIiBzdHJva2Utd2lkdGg9XCIwLjVcIiAvPiBcXFxyXG4gICAgICAgICAgICA8L3BhdHRlcm4+IFxcXHJcbiAgICAgICAgICAgIDxwYXR0ZXJuIGlkPVwiZ3JpZFwiIHdpZHRoPVwiJHt0aGlzLmdyaWQgKiA1fVwiIGhlaWdodD1cIiR7dGhpcy5ncmlkICogNX1cIiBwYXR0ZXJuVW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiPiBcXFxyXG4gICAgICAgICAgICAgICAgPHJlY3Qgd2lkdGg9XCIke3RoaXMuZ3JpZCAqIDV9XCIgaGVpZ2h0PVwiJHt0aGlzLmdyaWQgKiA1fVwiIGZpbGw9XCJ1cmwoI3NtYWxsR3JpZClcIiAvPiBcXFxyXG4gICAgICAgICAgICAgICAgPHBhdGggZD1cIk0gJHt0aGlzLmdyaWQgKiA1fSAwIEwgMCAwIDAgJHt0aGlzLmdyaWQgKiA1fVwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiZ3JheVwiIHN0cm9rZS13aWR0aD1cIjFcIiAvPiBcXFxyXG4gICAgICAgICAgICA8L3BhdHRlcm4+IFxcXHJcbiAgICAgICAgPC9kZWZzPiBcXFxyXG4gICAgICAgIDxyZWN0IHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiBmaWxsPVwidXJsKCNncmlkKVwiIC8+IFxcXHJcbiAgICA8L3N2Zz5gO1xyXG4gICAgLyogZXNsaW50LWVuYWJsZSBuby1tdWx0aS1zdHIgKi9cclxuXHJcbiAgICBjb25zdCBET01VUkwgPSB3aW5kb3cuVVJMIHx8IHdpbmRvdy53ZWJraXRVUkwgfHwgd2luZG93O1xyXG4gICAgY29uc3Qgc3ZnID0gbmV3IEJsb2IoW2RhdGFdLCB7IHR5cGU6ICdpbWFnZS9zdmcreG1sO2NoYXJzZXQ9dXRmLTgnIH0pO1xyXG4gICAgY29uc3QgdXJsID0gRE9NVVJMLmNyZWF0ZU9iamVjdFVSTChzdmcpO1xyXG4gICAgZmFicmljLnV0aWwubG9hZEltYWdlKHVybCwgKGltZykgPT4ge1xyXG4gICAgICBjb25zdCBiZyA9IG5ldyBmYWJyaWMuUmVjdCh7XHJcbiAgICAgICAgd2lkdGg6IGNhbnZhcy53aWR0aCwgaGVpZ2h0OiBjYW52YXMuaGVpZ2h0LCBldmVudGVkOiBmYWxzZSwgc2VsZWN0YWJsZTogZmFsc2UsXHJcbiAgICAgIH0pO1xyXG4gICAgICBiZy5maWxsID0gbmV3IGZhYnJpYy5QYXR0ZXJuKHsgc291cmNlOiBpbWcgfSxcclxuICAgICAgICAoKCkgPT4geyBiZy5kaXJ0eSA9IHRydWU7IGNhbnZhcy5yZXF1ZXN0UmVuZGVyQWxsKCk7IH0pKTtcclxuICAgICAgYmcuY2FudmFzID0gY2FudmFzO1xyXG4gICAgICBjYW52YXMuc2V0KCdiYWNrZ3JvdW5kSW1hZ2UnLCBiZyk7XHJcblxyXG4gICAgICAvLyBTbmFwIHRvIGdyaWQgZWZmZWN0c1xyXG4gICAgICBjYW52YXMub2ZmKHRoaXMuaGFuZGxlcnMuZ3JpZCk7XHJcbiAgICAgIHRoaXMuaGFuZGxlcnMuZ3JpZCA9IHtcclxuICAgICAgICAnb2JqZWN0Om1vdmluZyc6IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgeyBncmlkIH0gPSB0aGlzO1xyXG4gICAgICAgICAgY29uc3Qgc2hhcGUgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgICBpZiAoc2hhcGUudHlwZSAhPT0gJ2xpbmthYmxlU2hhcGUnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjYW52YXMubGlua2FibGVTaGFwZXNbc2hhcGUuaWRdLm1vdmUoe1xyXG4gICAgICAgICAgICB4OiBNYXRoLnJvdW5kKHNoYXBlLmxlZnQgLyBncmlkKSAqIGdyaWQsXHJcbiAgICAgICAgICAgIHk6IE1hdGgucm91bmQoc2hhcGUudG9wIC8gZ3JpZCkgKiBncmlkLFxyXG4gICAgICAgICAgICBtb3Zpbmc6IHRydWUsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgICdvYmplY3Q6c2NhbGluZyc6IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgeyBncmlkIH0gPSB0aGlzO1xyXG4gICAgICAgICAgY29uc3QgeyB0YXJnZXQgfSA9IGV2ZW50O1xyXG5cclxuICAgICAgICAgIGlmICh0YXJnZXQudHlwZSAhPT0gJ2xpbmthYmxlU2hhcGUnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zdCB3ID0gdGFyZ2V0LndpZHRoICogdGFyZ2V0LnNjYWxlWDtcclxuICAgICAgICAgIGNvbnN0IGggPSB0YXJnZXQuaGVpZ2h0ICogdGFyZ2V0LnNjYWxlWTtcclxuICAgICAgICAgIGNvbnN0IHNuYXAgPSB7IC8vIENsb3Nlc3Qgc25hcHBpbmcgcG9pbnRzXHJcbiAgICAgICAgICAgIHRvcDogTWF0aC5yb3VuZCh0YXJnZXQudG9wIC8gZ3JpZCkgKiBncmlkLFxyXG4gICAgICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKHRhcmdldC5sZWZ0IC8gZ3JpZCkgKiBncmlkLFxyXG4gICAgICAgICAgICBib3R0b206IE1hdGgucm91bmQoKHRhcmdldC50b3AgKyBoKSAvIGdyaWQpICogZ3JpZCxcclxuICAgICAgICAgICAgcmlnaHQ6IE1hdGgucm91bmQoKHRhcmdldC5sZWZ0ICsgdykgLyBncmlkKSAqIGdyaWQsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgY29uc3QgdGhyZXNob2xkID0gZ3JpZDtcclxuICAgICAgICAgIGNvbnN0IGRpc3QgPSB7IC8vIERpc3RhbmNlIGZyb20gc25hcHBpbmcgcG9pbnRzXHJcbiAgICAgICAgICAgIHRvcDogTWF0aC5hYnMoc25hcC50b3AgLSB0YXJnZXQudG9wKSxcclxuICAgICAgICAgICAgbGVmdDogTWF0aC5hYnMoc25hcC5sZWZ0IC0gdGFyZ2V0LmxlZnQpLFxyXG4gICAgICAgICAgICBib3R0b206IE1hdGguYWJzKHNuYXAuYm90dG9tIC0gdGFyZ2V0LnRvcCAtIGgpLFxyXG4gICAgICAgICAgICByaWdodDogTWF0aC5hYnMoc25hcC5yaWdodCAtIHRhcmdldC5sZWZ0IC0gdyksXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgY29uc3QgYXR0cnMgPSB7XHJcbiAgICAgICAgICAgIHNjYWxlWDogdGFyZ2V0LnNjYWxlWCxcclxuICAgICAgICAgICAgc2NhbGVZOiB0YXJnZXQuc2NhbGVZLFxyXG4gICAgICAgICAgICB0b3A6IHRhcmdldC50b3AsXHJcbiAgICAgICAgICAgIGxlZnQ6IHRhcmdldC5sZWZ0LFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHN3aXRjaCAodGFyZ2V0Ll9fY29ybmVyKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RsJzpcclxuICAgICAgICAgICAgICBpZiAoZGlzdC5sZWZ0IDwgZGlzdC50b3AgJiYgZGlzdC5sZWZ0IDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVggPSAodyAtIChzbmFwLmxlZnQgLSB0YXJnZXQubGVmdCkpIC8gdGFyZ2V0LndpZHRoO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVZID0gKGF0dHJzLnNjYWxlWCAvIHRhcmdldC5zY2FsZVgpICogdGFyZ2V0LnNjYWxlWTtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnRvcCA9IHRhcmdldC50b3AgKyAoaCAtIHRhcmdldC5oZWlnaHQgKiBhdHRycy5zY2FsZVkpO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMubGVmdCA9IHNuYXAubGVmdDtcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRpc3QudG9wIDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoaCAtIChzbmFwLnRvcCAtIHRhcmdldC50b3ApKSAvIHRhcmdldC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVggPSAoYXR0cnMuc2NhbGVZIC8gdGFyZ2V0LnNjYWxlWSkgKiB0YXJnZXQuc2NhbGVYO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMubGVmdCArPSAodyAtIHRhcmdldC53aWR0aCAqIGF0dHJzLnNjYWxlWCk7XHJcbiAgICAgICAgICAgICAgICBhdHRycy50b3AgPSBzbmFwLnRvcDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ210JzpcclxuICAgICAgICAgICAgICBpZiAoZGlzdC50b3AgPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWSA9IChoIC0gKHNuYXAudG9wIC0gdGFyZ2V0LnRvcCkpIC8gdGFyZ2V0LmhlaWdodDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnRvcCA9IHNuYXAudG9wO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAndHInOlxyXG4gICAgICAgICAgICAgIGlmIChkaXN0LnJpZ2h0IDwgZGlzdC50b3AgJiYgZGlzdC5yaWdodCA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVYID0gKHNuYXAucmlnaHQgLSB0YXJnZXQubGVmdCkgLyB0YXJnZXQud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoYXR0cnMuc2NhbGVYIC8gdGFyZ2V0LnNjYWxlWCkgKiB0YXJnZXQuc2NhbGVZO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMudG9wID0gdGFyZ2V0LnRvcCArIChoIC0gdGFyZ2V0LmhlaWdodCAqIGF0dHJzLnNjYWxlWSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChkaXN0LnRvcCA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVZID0gKGggLSAoc25hcC50b3AgLSB0YXJnZXQudG9wKSkgLyB0YXJnZXQuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVYID0gKGF0dHJzLnNjYWxlWSAvIHRhcmdldC5zY2FsZVkpICogdGFyZ2V0LnNjYWxlWDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnRvcCA9IHNuYXAudG9wO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbWwnOlxyXG4gICAgICAgICAgICAgIGlmIChkaXN0LmxlZnQgPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWCA9ICh3IC0gKHNuYXAubGVmdCAtIHRhcmdldC5sZWZ0KSkgLyB0YXJnZXQud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5sZWZ0ID0gc25hcC5sZWZ0O1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbXInOlxyXG4gICAgICAgICAgICAgIGlmIChkaXN0LnJpZ2h0IDwgdGhyZXNob2xkKSBhdHRycy5zY2FsZVggPSAoc25hcC5yaWdodCAtIHRhcmdldC5sZWZ0KSAvIHRhcmdldC53aWR0aDtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYmwnOlxyXG4gICAgICAgICAgICAgIGlmIChkaXN0LmxlZnQgPCBkaXN0LmJvdHRvbSAmJiBkaXN0LmxlZnQgPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWCA9ICh3IC0gKHNuYXAubGVmdCAtIHRhcmdldC5sZWZ0KSkgLyB0YXJnZXQud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoYXR0cnMuc2NhbGVYIC8gdGFyZ2V0LnNjYWxlWCkgKiB0YXJnZXQuc2NhbGVZO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMubGVmdCA9IHNuYXAubGVmdDtcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRpc3QuYm90dG9tIDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoc25hcC5ib3R0b20gLSB0YXJnZXQudG9wKSAvIHRhcmdldC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVggPSAoYXR0cnMuc2NhbGVZIC8gdGFyZ2V0LnNjYWxlWSkgKiB0YXJnZXQuc2NhbGVYO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMubGVmdCArPSAodyAtIHRhcmdldC53aWR0aCAqIGF0dHJzLnNjYWxlWCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtYic6XHJcbiAgICAgICAgICAgICAgaWYgKGRpc3QuYm90dG9tIDwgdGhyZXNob2xkKSBhdHRycy5zY2FsZVkgPSAoc25hcC5ib3R0b20gLSB0YXJnZXQudG9wKSAvIHRhcmdldC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JyJzpcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICBpZiAoZGlzdC5yaWdodCA8IGRpc3QuYm90dG9tICYmIGRpc3QucmlnaHQgPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWCA9IChzbmFwLnJpZ2h0IC0gdGFyZ2V0LmxlZnQpIC8gdGFyZ2V0LndpZHRoO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVZID0gKGF0dHJzLnNjYWxlWCAvIHRhcmdldC5zY2FsZVgpICogdGFyZ2V0LnNjYWxlWTtcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRpc3QuYm90dG9tIDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoc25hcC5ib3R0b20gLSB0YXJnZXQudG9wKSAvIHRhcmdldC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVggPSAoYXR0cnMuc2NhbGVZIC8gdGFyZ2V0LnNjYWxlWSkgKiB0YXJnZXQuc2NhbGVYO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRhcmdldC5zZXQoYXR0cnMpO1xyXG4gICAgICAgICAgdGFyZ2V0LnNldENvb3JkcygpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH07XHJcbiAgICAgIGlmICh0aGlzLmdyaWQgPiAwKSB7XHJcbiAgICAgICAgY2FudmFzLm9uKHRoaXMuaGFuZGxlcnMuZ3JpZCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0c1xyXG4gICAqIEBwYXJhbSB7QXJyYXl9IG9iamVjdHMuY29udGFpbmVyc1xyXG4gICAqIEBwYXJhbSB7QXJyYXl9IG9iamVjdHMubGlua3NcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cclxuICAgKi9cclxuICBhc3luYyBsb2FkKG9iamVjdHMpIHtcclxuICAgIGNvbnN0IHsgY2FudmFzIH0gPSB0aGlzO1xyXG5cclxuICAgIC8vIENvbnRhaW5lcnNcclxuICAgIGZvciAobGV0IGMgPSAwOyBjIDwgb2JqZWN0cy5jb250YWluZXJzLmxlbmd0aDsgYyArPSAxKSB7XHJcbiAgICAgIGNvbnN0IG9wdHMgPSBfLmNsb25lRGVlcChvYmplY3RzLmNvbnRhaW5lcnNbY10pO1xyXG4gICAgICBvcHRzLmNhbnZhcyA9IGNhbnZhcztcclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWF3YWl0LWluLWxvb3BcclxuICAgICAgYXdhaXQgdGhpcy5hZGRDb250YWluZXIob3B0cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTGlua3NcclxuICAgIGZvciAobGV0IGwgPSAwOyBsIDwgb2JqZWN0cy5saW5rcy5sZW5ndGg7IGwgKz0gMSkge1xyXG4gICAgICBjb25zdCBvcHRzID0gXy5jbG9uZURlZXAob2JqZWN0cy5saW5rc1tsXSk7XHJcbiAgICAgIG9wdHMuY2FudmFzID0gY2FudmFzO1xyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxyXG4gICAgICBhd2FpdCB0aGlzLmFkZExpbmsob3B0cyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBhZGRDb250YWluZXIob3B0aW9ucykge1xyXG4gICAgY29uc3QgeyBjYW52YXMgfSA9IHRoaXM7XHJcbiAgICBjb25zdCBjb250YWluZXJPcHRzID0ge1xyXG4gICAgICBpZDogb3B0aW9ucy5pZCxcclxuICAgICAgY2FudmFzLFxyXG4gICAgICBsZWZ0OiBvcHRpb25zLmxlZnQgfHwgMCxcclxuICAgICAgdG9wOiBvcHRpb25zLnRvcCB8fCAwLFxyXG4gICAgICBhbmdsZTogMCxcclxuICAgICAgbGFiZWw6IG9wdGlvbnMubGFiZWwsXHJcbiAgICAgIGltZzoge1xyXG4gICAgICAgIHNyYzogb3B0aW9ucy5pbWcuc3JjLFxyXG4gICAgICB9LFxyXG4gICAgICBjaGlsZFdpZHRoOiA3MixcclxuICAgICAgY2hpbGRIZWlnaHQ6IDQyLFxyXG4gICAgICBjaGlsZHJlbjogQXJyYXkuaXNBcnJheShvcHRpb25zLmNoaWxkcmVuKSA/IG9wdGlvbnMuY2hpbGRyZW4gOiBbXSxcclxuICAgIH07XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBuZXcgRXhwYW5kYWJsZUNvbnRhaW5lcihjb250YWluZXJPcHRzKTtcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXHJcbiAgICBhd2FpdCBjb250YWluZXIubG9hZCgpO1xyXG4gICAgY29udGFpbmVyLmNvbGxhcHNlKCk7XHJcbiAgICBjb250YWluZXIuaW5qZWN0KCk7XHJcbiAgICBpZiAob3B0aW9ucy5pc1RlbXBvcmFyeSkge1xyXG4gICAgICBjb250YWluZXIuc2hhcGUuc2V0KCdvcGFjaXR5JywgMC41KTtcclxuICAgIH1cclxuICAgIGlmIChvcHRpb25zLnggJiYgb3B0aW9ucy55KSB7XHJcbiAgICAgIGNvbnRhaW5lci5tb3ZlKHtcclxuICAgICAgICB4OiBvcHRpb25zLngsXHJcbiAgICAgICAgeTogb3B0aW9ucy55LFxyXG4gICAgICAgIG1vdmluZzogZmFsc2UsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgY2FudmFzLmxpbmthYmxlU2hhcGVzW29wdGlvbnMuaWRdID0gY29udGFpbmVyO1xyXG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICB9XHJcblxyXG4gIHJlbW92ZUNvbnRhaW5lcihvcHRpb25zKSB7XHJcbiAgICBjb25zdCB7IGNhbnZhcyB9ID0gdGhpcztcclxuICAgIGlmIChvcHRpb25zLmlkIGluIGNhbnZhcy5saW5rYWJsZVNoYXBlcykge1xyXG4gICAgICBjYW52YXMubGlua2FibGVTaGFwZXNbb3B0aW9ucy5pZF0ucmVtb3ZlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBhZGRMaW5rKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHsgY2FudmFzIH0gPSB0aGlzO1xyXG4gICAgY29uc3QgbGlua09wdHMgPSB7XHJcbiAgICAgIGlkOiBvcHRpb25zLmlkLFxyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgeDogb3B0aW9ucy5zdGFydC54IHx8IDAsXHJcbiAgICAgICAgeTogb3B0aW9ucy5zdGFydC55IHx8IDAsXHJcbiAgICAgIH0sXHJcbiAgICAgIGVuZDoge1xyXG4gICAgICAgIHg6IG9wdGlvbnMuZW5kLnggfHwgMCxcclxuICAgICAgICB5OiBvcHRpb25zLmVuZC55IHx8IDAsXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgY29uc3QgbGluayA9IG5ldyBDdXJ2ZWRMaW5rKGxpbmtPcHRzKTtcclxuICAgIGxpbmsuaW5qZWN0KGNhbnZhcyk7XHJcblxyXG4gICAgaWYgKCFvcHRpb25zLmlzVGVtcG9yYXJ5KSB7XHJcbiAgICAgIGxpbmsuYXJyb3dIZWFkLmZpcmUoJ21vdmVkJyk7XHJcbiAgICAgIGxpbmsuYXJyb3dUYWlsLmZpcmUoJ21vdmVkJyk7XHJcblxyXG4gICAgICBpZiAob3B0aW9ucy5zdGFydCAmJiBvcHRpb25zLnN0YXJ0LmlkICYmIG9wdGlvbnMuc3RhcnQuY2FyZGluYWwpIHtcclxuICAgICAgICBsaW5rLmNvbm5lY3RMaW5rKCdzdGFydCcsIG9wdGlvbnMuc3RhcnQuaWQsIG9wdGlvbnMuc3RhcnQuY2FyZGluYWwpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChvcHRpb25zLmVuZCAmJiBvcHRpb25zLmVuZC5pZCAmJiBvcHRpb25zLmVuZC5jYXJkaW5hbCkge1xyXG4gICAgICAgIGxpbmsuY29ubmVjdExpbmsoJ2VuZCcsIG9wdGlvbnMuZW5kLmlkLCBvcHRpb25zLmVuZC5jYXJkaW5hbCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNhbnZhcy5saW5rc1tvcHRpb25zLmlkXSA9IGxpbms7XHJcblxyXG4gICAgcmV0dXJuIGxpbms7XHJcbiAgfVxyXG5cclxuICByZW1vdmVMaW5rKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHsgY2FudmFzIH0gPSB0aGlzO1xyXG4gICAgaWYgKG9wdGlvbnMuaWQgaW4gY2FudmFzLmxpbmtzKSB7XHJcbiAgICAgIGNhbnZhcy5saW5rc1tvcHRpb25zLmlkXS5yZW1vdmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGV4cGFuZChpZCkge1xyXG4gICAgY29uc3QgeyBjYW52YXMgfSA9IHRoaXM7XHJcbiAgICBpZiAoaWQgaW4gY2FudmFzLmxpbmthYmxlU2hhcGVzKSB7XHJcbiAgICAgIGNhbnZhcy5saW5rYWJsZVNoYXBlc1tpZF0uZXhwYW5kKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb2xsYXBzZShpZCkge1xyXG4gICAgY29uc3QgeyBjYW52YXMgfSA9IHRoaXM7XHJcbiAgICBpZiAoaWQgaW4gY2FudmFzLmxpbmthYmxlU2hhcGVzKSB7XHJcbiAgICAgIGNhbnZhcy5saW5rYWJsZVNoYXBlc1tpZF0uY29sbGFwc2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldFNlbGVjdGVkQ2hvb3NlclR5cGUodHlwZSkge1xyXG4gICAgdGhpcy5zZWxlY3RlZENob29zZXJUeXBlID0gdHlwZTtcclxuICB9XHJcblxyXG4gIGFzeW5jIG9uRHJhZ0VudGVyKGV2ZW50KSB7XHJcbiAgICAvLyBUaGUgaWZyYW1lIGluIHdoaWNoIHRoaXMgY2FudmFzIGlzIGluamVjdGVkIGlzIG1lc3NpbmcgdXAgdGhlIG1vdXNlIHgseSBjb29yZGluYXRlcy5cclxuICAgIGNvbnN0IGNhbnZhc0Fic29sdXRlUG9zaXRpb24gPSB0aGlzLmNhbnZhcy51cHBlckNhbnZhc0VsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgY29uc3QgeCA9IGV2ZW50LmUueCAtIGNhbnZhc0Fic29sdXRlUG9zaXRpb24ubGVmdDtcclxuICAgIGNvbnN0IHkgPSBldmVudC5lLnkgLSBjYW52YXNBYnNvbHV0ZVBvc2l0aW9uLnRvcDtcclxuXHJcbiAgICBjb25zdCB0eXBlID0gdGhpcy5zZWxlY3RlZENob29zZXJUeXBlLmlkO1xyXG4gICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgIGNhc2UgJ2xpbmsnOlxyXG4gICAgICAgIHRoaXMudGVtcERyYWdnZWRPYmplY3QgPSBhd2FpdCB0aGlzLmFkZExpbmsoe1xyXG4gICAgICAgICAgaWQ6IGAke01hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMSl9YCxcclxuICAgICAgICAgIHgsXHJcbiAgICAgICAgICB5LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdjb250YWluZXInOlxyXG4gICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgdGhpcy50ZW1wRHJhZ2dlZE9iamVjdCA9IGF3YWl0IHRoaXMuYWRkQ29udGFpbmVyKHtcclxuICAgICAgICAgIGlkOiBgJHtNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKS50b1N0cmluZygxNikuc3Vic3RyaW5nKDEpfWAsXHJcbiAgICAgICAgICBsYWJlbDogdGhpcy5zZWxlY3RlZENob29zZXJUeXBlLmxhYmVsLFxyXG4gICAgICAgICAgaW1nOiB7XHJcbiAgICAgICAgICAgIHNyYzogdGhpcy5zZWxlY3RlZENob29zZXJUeXBlLmljb24sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeDogMCxcclxuICAgICAgICAgIHk6IDAsXHJcbiAgICAgICAgICBpc1RlbXBvcmFyeTogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXZlbnQuZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgb25EcmFnT3ZlcihldmVudCkge1xyXG4gICAgY29uc3QgeyBjYW52YXMgfSA9IHRoaXM7XHJcbiAgICAvLyBUaGUgaW1tZXJzaXZlRnJhbWUgaW4gd2hpY2ggdGhpcyBQRyBpcyBpbmplY3RlZCBpcyBtZXNzaW5nIHVwIHRoZSBtb3VzZSB4LHkgY29vcmRpbmF0ZXMuXHJcbiAgICBjb25zdCBjYW52YXNBYnNvbHV0ZVBvc2l0aW9uID0gdGhpcy5jYW52YXMudXBwZXJDYW52YXNFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGxldCB4ID0gZXZlbnQuZS54IC0gY2FudmFzQWJzb2x1dGVQb3NpdGlvbi5sZWZ0O1xyXG4gICAgbGV0IHkgPSBldmVudC5lLnkgLSBjYW52YXNBYnNvbHV0ZVBvc2l0aW9uLnRvcDtcclxuXHJcbiAgICBpZiAodGhpcy50ZW1wRHJhZ2dlZE9iamVjdCAhPT0gbnVsbCkge1xyXG4gICAgICBjb25zdCB0eXBlID0gdGhpcy5zZWxlY3RlZENob29zZXJUeXBlLmlkO1xyXG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICBjYXNlICdsaW5rJzpcclxuICAgICAgICAgIHRoaXMudGVtcERyYWdnZWRPYmplY3QudXBkYXRlUGF0aCh7XHJcbiAgICAgICAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgICAgICAgeDogeCAtIDUwLFxyXG4gICAgICAgICAgICAgIHksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVuZDoge1xyXG4gICAgICAgICAgICAgIHg6IHggKyA1MCxcclxuICAgICAgICAgICAgICB5LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb21taXQ6IGZhbHNlLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB0aGlzLnRlbXBEcmFnZ2VkT2JqZWN0LmFycm93SGVhZC5maXJlKCdtb3ZpbmcnKTtcclxuICAgICAgICAgIHRoaXMudGVtcERyYWdnZWRPYmplY3QuYXJyb3dUYWlsLmZpcmUoJ21vdmluZycpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnY29udGFpbmVyJzpcclxuICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICBpZiAodGhpcy50ZW1wRHJhZ2dlZE9iamVjdC5pc0xvYWRlZCkge1xyXG4gICAgICAgICAgICB4IC09ICh0aGlzLnRlbXBEcmFnZ2VkT2JqZWN0LnNoYXBlLndpZHRoIC8gMik7XHJcbiAgICAgICAgICAgIHkgLT0gKHRoaXMudGVtcERyYWdnZWRPYmplY3Quc2hhcGUuaGVpZ2h0IC8gMik7XHJcblxyXG4gICAgICAgICAgICAvLyBHcmlkIGVmZmVjdHNcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ3JpZCkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IHsgZ3JpZCB9ID0gdGhpcztcclxuICAgICAgICAgICAgICB4ID0gTWF0aC5yb3VuZCh4IC8gZ3JpZCkgKiBncmlkO1xyXG4gICAgICAgICAgICAgIHkgPSBNYXRoLnJvdW5kKHkgLyBncmlkKSAqIGdyaWQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIE1vdmUgb2JqZWN0XHJcbiAgICAgICAgICAgIHRoaXMudGVtcERyYWdnZWRPYmplY3QubW92ZSh7XHJcbiAgICAgICAgICAgICAgeCxcclxuICAgICAgICAgICAgICB5LFxyXG4gICAgICAgICAgICAgIG1vdmluZzogdHJ1ZSxcclxuICAgICAgICAgICAgICBza2lwQ29sbGlzaW9uOiB0cnVlLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIERldGVjdCBpbnRlcnNlY3Rpb24gd2l0aCBMaW5rc1xyXG5cclxuICAgICAgICAgICAgLy8gRGV0ZWN0IGludGVyc2VjdGlvbiB3aXRoIENvbnRhaW5lcnNcclxuICAgICAgICAgICAgY29uc3QgaWRzID0gT2JqZWN0LmtleXMoY2FudmFzLmxpbmthYmxlU2hhcGVzKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCBpZHMubGVuZ3RoOyBjICs9IDEpIHtcclxuICAgICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSBjYW52YXMubGlua2FibGVTaGFwZXNbaWRzW2NdXTtcclxuICAgICAgICAgICAgICBpZiAoY29udGFpbmVyLmlkICE9PSB0aGlzLnRlbXBEcmFnZ2VkT2JqZWN0LmlkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjWCA9IHRoaXMudGVtcERyYWdnZWRPYmplY3Quc2hhcGUubGVmdCArIHRoaXMudGVtcERyYWdnZWRPYmplY3Quc2hhcGUud2lkdGggLyAyO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY1kgPSB0aGlzLnRlbXBEcmFnZ2VkT2JqZWN0LnNoYXBlLnRvcDtcclxuICAgICAgICAgICAgICAgIGlmIChjb250YWluZXIuc2hhcGUuaW50ZXJzZWN0c1dpdGhSZWN0KFxyXG4gICAgICAgICAgICAgICAgICBuZXcgZmFicmljLlBvaW50KGNYIC0gNSwgY1kpLFxyXG4gICAgICAgICAgICAgICAgICBuZXcgZmFicmljLlBvaW50KGNYICsgNSwgY1kgKyAxMCksXHJcbiAgICAgICAgICAgICAgICApKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5zZXRBY3RpdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBjb250YWluZXIuc2V0QWN0aXZlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXZlbnQuZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgb25EcmFnTGVhdmUoZXZlbnQpIHtcclxuICAgIGlmICh0aGlzLnRlbXBEcmFnZ2VkT2JqZWN0ICE9PSBudWxsKSB7XHJcbiAgICAgIGNvbnN0IHR5cGUgPSB0aGlzLnNlbGVjdGVkQ2hvb3NlclR5cGUuaWQ7XHJcbiAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ2xpbmsnOlxyXG4gICAgICAgICAgdGhpcy5yZW1vdmVMaW5rKHtcclxuICAgICAgICAgICAgaWQ6IHRoaXMudGVtcERyYWdnZWRPYmplY3QuaWQsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHRoaXMudGVtcERyYWdnZWRPYmplY3QgPSBudWxsO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnY29udGFpbmVyJzpcclxuICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICBpZiAodGhpcy50ZW1wRHJhZ2dlZE9iamVjdC5pc0xvYWRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNvbnRhaW5lcih7XHJcbiAgICAgICAgICAgICAgaWQ6IHRoaXMudGVtcERyYWdnZWRPYmplY3QuaWQsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnRlbXBEcmFnZ2VkT2JqZWN0ID0gbnVsbDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXZlbnQuZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgb25Ecm9wKGV2ZW50KSB7XHJcbiAgICBjb25zdCB7IGNhbnZhcyB9ID0gdGhpcztcclxuICAgIC8vIFRoZSBpbW1lcnNpdmVGcmFtZSBpbiB3aGljaCB0aGlzIFBHIGlzIGluamVjdGVkIGlzIG1lc3NpbmcgdXAgdGhlIG1vdXNlIHgseSBjb29yZGluYXRlcy5cclxuICAgIGNvbnN0IGNhbnZhc0Fic29sdXRlUG9zaXRpb24gPSB0aGlzLmNhbnZhcy51cHBlckNhbnZhc0VsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgbGV0IHggPSBldmVudC5lLnggLSBjYW52YXNBYnNvbHV0ZVBvc2l0aW9uLmxlZnQ7XHJcbiAgICBsZXQgeSA9IGV2ZW50LmUueSAtIGNhbnZhc0Fic29sdXRlUG9zaXRpb24udG9wO1xyXG5cclxuICAgIGNvbnN0IHR5cGUgPSB0aGlzLnNlbGVjdGVkQ2hvb3NlclR5cGUuaWQ7XHJcbiAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgY2FzZSAnbGluayc6XHJcbiAgICAgICAgLy8gUmVtb3ZlIGdob3N0IG9iamVjdFxyXG4gICAgICAgIGlmICh0aGlzLnRlbXBEcmFnZ2VkT2JqZWN0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICB0aGlzLnJlbW92ZUxpbmsoe1xyXG4gICAgICAgICAgICBpZDogdGhpcy50ZW1wRHJhZ2dlZE9iamVjdC5pZCxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdGhpcy50ZW1wRHJhZ2dlZE9iamVjdCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJbnN0YW50aWF0ZSBuZXcgb2JqZWN0XHJcbiAgICAgICAgYXdhaXQgdGhpcy5hZGRMaW5rKHtcclxuICAgICAgICAgIGlkOiBgJHtNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKS50b1N0cmluZygxNikuc3Vic3RyaW5nKDEpfWAsXHJcbiAgICAgICAgICB4LFxyXG4gICAgICAgICAgeSxcclxuICAgICAgICAgIGlzVGVtcG9yYXJ5OiBmYWxzZSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2NvbnRhaW5lcic6XHJcbiAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAvLyBEZXRlY3QgaW50ZXJzZWN0aW9uIHdpdGggQ29udGFpbmVyc1xyXG4gICAgICAgIGNvbnN0IGlkcyA9IE9iamVjdC5rZXlzKGNhbnZhcy5saW5rYWJsZVNoYXBlcyk7XHJcbiAgICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCBpZHMubGVuZ3RoOyBjICs9IDEpIHtcclxuICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGNhbnZhcy5saW5rYWJsZVNoYXBlc1tpZHNbY11dO1xyXG4gICAgICAgICAgaWYgKGNvbnRhaW5lci5pZCAhPT0gdGhpcy50ZW1wRHJhZ2dlZE9iamVjdC5pZCkge1xyXG4gICAgICAgICAgICBjb250YWluZXIuc2V0QWN0aXZlKGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb250YWluZXIuc2hhcGUuaW50ZXJzZWN0c1dpdGhPYmplY3QodGhpcy50ZW1wRHJhZ2dlZE9iamVjdC5zaGFwZSkpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnYWRkIGFzIGNoaWxkcmVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBnaG9zdCBvYmplY3RcclxuICAgICAgICBpZiAodGhpcy50ZW1wRHJhZ2dlZE9iamVjdCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgdGhpcy5yZW1vdmVDb250YWluZXIoe1xyXG4gICAgICAgICAgICBpZDogdGhpcy50ZW1wRHJhZ2dlZE9iamVjdC5pZCxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdGhpcy50ZW1wRHJhZ2dlZE9iamVjdCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJbnN0YW50aWF0ZSBuZXcgb2JqZWN0XHJcbiAgICAgICAgY29uc3Qgb3B0cyA9IHtcclxuICAgICAgICAgIGlkOiBgJHtNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKS50b1N0cmluZygxNikuc3Vic3RyaW5nKDEpfWAsXHJcbiAgICAgICAgICBsYWJlbDogdGhpcy5zZWxlY3RlZENob29zZXJUeXBlLmxhYmVsLFxyXG4gICAgICAgICAgaW1nOiB7XHJcbiAgICAgICAgICAgIHNyYzogdGhpcy5zZWxlY3RlZENob29zZXJUeXBlLmljb24sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgeCxcclxuICAgICAgICAgIHksXHJcbiAgICAgICAgICBpc1RlbXBvcmFyeTogZmFsc2UsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBuZXdDb250YWluZXIgPSBhd2FpdCB0aGlzLmFkZENvbnRhaW5lcihvcHRzKTtcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIG5ldyBwb3NpdGlvblxyXG4gICAgICAgIHggLT0gKG5ld0NvbnRhaW5lci5zaGFwZS53aWR0aCAvIDIpO1xyXG4gICAgICAgIHkgLT0gKG5ld0NvbnRhaW5lci5zaGFwZS5oZWlnaHQgLyAyKTtcclxuXHJcbiAgICAgICAgLy8gR3JpZCBlZmZlY3RzXHJcbiAgICAgICAgaWYgKHRoaXMuZ3JpZCkge1xyXG4gICAgICAgICAgY29uc3QgeyBncmlkIH0gPSB0aGlzO1xyXG4gICAgICAgICAgeCA9IE1hdGgucm91bmQoeCAvIGdyaWQpICogZ3JpZDtcclxuICAgICAgICAgIHkgPSBNYXRoLnJvdW5kKHkgLyBncmlkKSAqIGdyaWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBNb3ZlIG9iamVjdCB1bmRlciB0aGUgbW91c2UgY3Vyc29yXHJcbiAgICAgICAgbmV3Q29udGFpbmVyLm1vdmUoe1xyXG4gICAgICAgICAgeCxcclxuICAgICAgICAgIHksXHJcbiAgICAgICAgICBtb3Zpbmc6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbmV3Q29udGFpbmVyLm1vdmUoeyAvLyBmb3IgaGFuZGxpbmcgY29sbGlzaW9uc1xyXG4gICAgICAgICAgbW92aW5nOiBmYWxzZSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBldmVudC5lLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
