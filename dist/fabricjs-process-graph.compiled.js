(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _Container = _interopRequireDefault(require("./src/Container.js"));

var _ProcessGraph = _interopRequireDefault(require("./src/ProcessGraph.js"));

var _Link = _interopRequireDefault(require("./src/Link.js"));

var _LinkableShape = _interopRequireDefault(require("./src/LinkableShape.js"));

var _CurvedLink = _interopRequireDefault(require("./src/CurvedLink.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

window.pg = {
  ProcessGraph: _ProcessGraph["default"],
  Container: _Container["default"],
  Link: _Link["default"],
  LinkableShape: _LinkableShape["default"],
  CurvedLink: _CurvedLink["default"]
};

},{"./src/Container.js":2,"./src/CurvedLink.js":3,"./src/Link.js":4,"./src/LinkableShape.js":5,"./src/ProcessGraph.js":6}],2:[function(require,module,exports){
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

},{"./CurvedLink.js":3,"./LinkableShape.js":5}],3:[function(require,module,exports){
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
      stroke: options.custom && options.custom.path && options.custom.path.stroke ? options.custom.path.stroke : '#000',
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
      var canvas = this.canvas,
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
      };
      shape.anchors[cardinal].opacity = 0;
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

  return CurvedLink;
}();

exports["default"] = CurvedLink;

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
      this.updatePath('start', path.path[0][1], path.path[0][2], true);
      this.updatePath('end', path.path[1][3], path.path[1][4], true);
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
      Object.keys(anchors).forEach(function (cardinal) {
        canvas.add(anchors[cardinal]);
        canvas.bringForward(anchors[cardinal], true);
      });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsInNyYy9Db250YWluZXIuanMiLCJzcmMvQ3VydmVkTGluay5qcyIsInNyYy9MaW5rLmpzIiwic3JjL0xpbmthYmxlU2hhcGUuanMiLCJzcmMvUHJvY2Vzc0dyYXBoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLE1BQU0sQ0FBQyxFQUFQLEdBQVk7QUFDVixFQUFBLFlBQVksRUFBWix3QkFEVTtBQUVWLEVBQUEsU0FBUyxFQUFULHFCQUZVO0FBR1YsRUFBQSxJQUFJLEVBQUosZ0JBSFU7QUFJVixFQUFBLGFBQWEsRUFBYix5QkFKVTtBQUtWLEVBQUEsVUFBVSxFQUFWO0FBTFUsQ0FBWjs7Ozs7Ozs7Ozs7O0FDTkE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLGNBQXNCLE1BQXRCO0FBQUEsSUFBUSxNQUFSLFdBQVEsTUFBUjtBQUFBLElBQWdCLENBQWhCLFdBQWdCLENBQWhCOztJQUVxQixTOzs7OztBQUNuQjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFLHFCQUFZLE9BQVosRUFBcUI7QUFBQTs7QUFBQTs7QUFDbkIsUUFBTSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBWCxDQUFnQjtBQUMzQixNQUFBLElBQUksRUFBRSxDQURxQjtBQUUzQixNQUFBLEdBQUcsRUFBRSxDQUZzQjtBQUczQixNQUFBLE9BQU8sRUFBRSxNQUhrQjtBQUkzQixNQUFBLE9BQU8sRUFBRSxLQUprQjtBQUszQixNQUFBLFdBQVcsRUFBRSxDQUxjO0FBTTNCLE1BQUEsTUFBTSxFQUFFLE1BTm1CO0FBTzNCLE1BQUEsSUFBSSxFQUFFLE1BUHFCO0FBUTNCLE1BQUEsRUFBRSxFQUFFLEVBUnVCO0FBUzNCLE1BQUEsRUFBRSxFQUFFLEVBVHVCO0FB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OztBQWlFQSxZQUFBLE1BQU0sQ0FBQyxHQUFQLENBQVcsS0FBWDtBQUNBLFlBQUEsTUFBTSxDQUFDLFNBQVA7QUFDRDtBQTVHa0IsU0FBckI7O0FBOEdBLFlBQUksS0FBSSxDQUFDLElBQUwsR0FBWSxDQUFoQixFQUFtQjtBQUNqQixVQUFBLE1BQU0sQ0FBQyxFQUFQLENBQVUsS0FBSSxDQUFDLFFBQUwsQ0FBYyxJQUF4QjtBQUNEO0FBQ0YsT0E1SEQ7QUE2SEQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgQ29udGFpbmVyIGZyb20gJy4vc3JjL0NvbnRhaW5lci5qcyc7XHJcbmltcG9ydCBQcm9jZXNzR3JhcGggZnJvbSAnLi9zcmMvUHJvY2Vzc0dyYXBoLmpzJztcclxuaW1wb3J0IExpbmsgZnJvbSAnLi9zcmMvTGluay5qcyc7XHJcbmltcG9ydCBMaW5rYWJsZVNoYXBlIGZyb20gJy4vc3JjL0xpbmthYmxlU2hhcGUuanMnO1xyXG5pbXBvcnQgQ3VydmVkTGluayBmcm9tICcuL3NyYy9DdXJ2ZWRMaW5rLmpzJztcclxuXHJcbndpbmRvdy5wZyA9IHtcclxuICBQcm9jZXNzR3JhcGgsXHJcbiAgQ29udGFpbmVyLFxyXG4gIExpbmssXHJcbiAgTGlua2FibGVTaGFwZSxcclxuICBDdXJ2ZWRMaW5rLFxyXG59O1xyXG4iLCJpbXBvcnQgTGlua2FibGVTaGFwZSBmcm9tICcuL0xpbmthYmxlU2hhcGUuanMnO1xyXG5pbXBvcnQgQ3VydmVkTGluayBmcm9tICcuL0N1cnZlZExpbmsuanMnO1xyXG5cclxuY29uc3QgeyBmYWJyaWMsIF8gfSA9IHdpbmRvdztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRhaW5lciBleHRlbmRzIExpbmthYmxlU2hhcGUge1xyXG4gIC8qKlxyXG4gICAqIEEgQ29udGFpbmVyIGlzIGEgUmVjdCB3aXRoIGFuIElUZXh0LiBDYW4gYmUgZXhwYW5kZWQgdG8gcmV2ZWFsIGNvbnRhaW5lZCBTaGFwZXMuXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIG9wdGlvbnNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7RmFicmljLkNhbnZhc30gICBvcHRpb25zLmNhbnZhcyAtIEZhYnJpYyBjYW52YXNcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgb3B0aW9ucy5pZCAtIFVuaXF1ZSBpZGVudGlmaWVyXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIG9wdGlvbnMud2lkdGhcclxuICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgb3B0aW9ucy5oZWlnaHRcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgb3B0aW9ucy5sYWJlbFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHJlY3QgPSBuZXcgZmFicmljLlJlY3Qoe1xyXG4gICAgICBsZWZ0OiAwLFxyXG4gICAgICB0b3A6IDAsXHJcbiAgICAgIG9yaWdpblg6ICdsZWZ0JyxcclxuICAgICAgb3JpZ2luWTogJ3RvcCcsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICBzdHJva2U6ICcjMDAwJyxcclxuICAgICAgZmlsbDogJyNmZmYnLFxyXG4gICAgICByeDogMTAsXHJcbiAgICAgIHJ5OiAxMCxcclxuICAgICAgd2lkdGg6IG9wdGlvbnMud2lkdGggPyBvcHRpb25zLndpZHRoIDogMjAwLFxyXG4gICAgICBoZWlnaHQ6IG9wdGlvbnMuaGVpZ2h0ID8gb3B0aW9ucy5oZWlnaHQgOiAxMDAsXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IHRleHQgPSBuZXcgZmFicmljLlRleHRib3gob3B0aW9ucy5sYWJlbCwge1xyXG4gICAgICBsZWZ0OiByZWN0LndpZHRoIC8gMixcclxuICAgICAgdG9wOiByZWN0LmhlaWdodCAvIDIsXHJcbiAgICAgIHN0eWxlczogeyB9LFxyXG4gICAgICBmb250U2l6ZTogMTQsXHJcbiAgICAgIGZvbnRGYW1pbHk6ICdIZWx2ZXRpY2EnLFxyXG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIHdpZHRoOiAxOTAsXHJcbiAgICAgIGhlaWdodDogOTAsXHJcbiAgICAgIHNwbGl0QnlHcmFwaGVtZTogdHJ1ZSxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgZ3JvdXAgPSBuZXcgZmFicmljLkdyb3VwKFtyZWN0LCB0ZXh0XSwge1xyXG4gICAgICBsZWZ0OiAwLFxyXG4gICAgICB0b3A6IDAsXHJcbiAgICAgIG9yaWdpblg6ICdsZWZ0JyxcclxuICAgICAgb3JpZ2luWTogJ3RvcCcsXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IG5ld09wdGlvbnMgPSBfLmNsb25lRGVlcChfLm9taXQob3B0aW9ucywgWydjYW52YXMnLCAnc2hhcGUnXSkpO1xyXG4gICAgbmV3T3B0aW9ucy5jYW52YXMgPSBvcHRpb25zLmNhbnZhcztcclxuICAgIG5ld09wdGlvbnMuc2hhcGUgPSBncm91cDtcclxuICAgIHN1cGVyKG5ld09wdGlvbnMpO1xyXG5cclxuICAgIGdyb3VwLm9uKHtcclxuICAgICAgc2NhbGluZzogKCkgPT4ge1xyXG4gICAgICAgIC8vIFdoZW4gc2NhbGluZywga2VlcCB0ZXh0IHNhbWUgc2l6ZSBhcyBpbml0aWFsXHJcbiAgICAgICAgaWYgKGdyb3VwLnNjYWxlWCA8IDEpIHtcclxuICAgICAgICAgIHRleHQuc2NhbGVYID0gMSArICgxIC0gZ3JvdXAuc2NhbGVYKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGV4dC5zY2FsZVggPSAxIC8gKGdyb3VwLnNjYWxlWCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChncm91cC5zY2FsZVkgPCAxKSB7XHJcbiAgICAgICAgICB0ZXh0LnNjYWxlWSA9IDEgKyAoMSAtIGdyb3VwLnNjYWxlWSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRleHQuc2NhbGVZID0gMSAvIChncm91cC5zY2FsZVkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNhbnZhcy5yZW5kZXJBbGwoKTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgX29uQW5jaG9yUmlnaHRDbGljayhvcHRpb25zKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGlkLCBsZWZ0LCB0b3AsIGFuZ2xlLCBjYW52YXMsIHdpZHRoLCBoZWlnaHQsXHJcbiAgICB9ID0gdGhpcy5zaGFwZTtcclxuICAgIGNvbnN0IGFwID0gb3B0aW9ucy50YXJnZXQ7XHJcbiAgICBjb25zdCB7IGNhcmRpbmFsIH0gPSBhcDtcclxuICAgIGNvbnN0IHNwYWNpbmcgPSA1MDtcclxuXHJcbiAgICBjb25zdCBuZXh0Q29udGFpbmVyID0gbmV3IENvbnRhaW5lcih7XHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgaWQ6IGAke2lkfV9uZXh0XyR7Y2FyZGluYWx9XyR7TWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMCkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygxKX1gLFxyXG4gICAgICBsZWZ0LFxyXG4gICAgICB0b3AsXHJcbiAgICAgIGFuZ2xlLFxyXG4gICAgICBsYWJlbDogYCR7aWR9X25leHRfJHtjYXJkaW5hbH1gLFxyXG4gICAgfSk7XHJcbiAgICBuZXh0Q29udGFpbmVyLmluamVjdCgpO1xyXG5cclxuICAgIGNvbnN0IG5ld09wdGlvbnMgPSB7fTtcclxuICAgIGxldCB0YXJnZXRDYXJkaW5hbDtcclxuICAgIHN3aXRjaCAoY2FyZGluYWwpIHtcclxuICAgICAgY2FzZSAnZWFzdCc6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICd3ZXN0JztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSB0b3A7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gbGVmdCArIHdpZHRoICsgc3BhY2luZztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICd3ZXN0Jzoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ2Vhc3QnO1xyXG4gICAgICAgIG5ld09wdGlvbnMueCA9IHRvcDtcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSBsZWZ0IC0gd2lkdGggLSBzcGFjaW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRoJzoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ3NvdXRoJztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSB0b3AgLSBoZWlnaHQgLSBzcGFjaW5nO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IGxlZnQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnc291dGgnOiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnbm9ydGgnO1xyXG4gICAgICAgIG5ld09wdGlvbnMueCA9IHRvcCArIGhlaWdodCArIHNwYWNpbmc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gbGVmdDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aGVhc3QnOiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnc291dGh3ZXN0JztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSB0b3AgLSBoZWlnaHQgLSBzcGFjaW5nO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IGxlZnQgKyB3aWR0aCArIHNwYWNpbmc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnbm9ydGh3ZXN0Jzoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ3NvdXRoZWFzdCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gdG9wIC0gaGVpZ2h0IC0gc3BhY2luZztcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSBsZWZ0IC0gd2lkdGggLSBzcGFjaW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRoZWFzdCc6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICdub3J0aHdlc3QnO1xyXG4gICAgICAgIG5ld09wdGlvbnMueCA9IHRvcCArIGhlaWdodCArIHNwYWNpbmc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gbGVmdCArIHdpZHRoICsgc3BhY2luZztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aHdlc3QnOlxyXG4gICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnbm9ydGhlYXN0JztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSB0b3AgKyBoZWlnaHQgKyBzcGFjaW5nO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IGxlZnQgLSB3aWR0aCAtIHNwYWNpbmc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIG5leHRDb250YWluZXIubW92ZShuZXdPcHRpb25zKTtcclxuICAgIC8vIG5leHRDb250YWluZXIucm90YXRlKGFuZ2xlKTtcclxuXHJcbiAgICBjb25zdCBuZXdMaW5rID0gbmV3IEN1cnZlZExpbmsoe1xyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgeDogYXAubGVmdCxcclxuICAgICAgICB5OiBhcC50b3AsXHJcbiAgICAgIH0sXHJcbiAgICAgIGVuZDoge1xyXG4gICAgICAgIHg6IG5leHRDb250YWluZXIuYW5jaG9yc1t0YXJnZXRDYXJkaW5hbF0ubGVmdCxcclxuICAgICAgICB5OiBuZXh0Q29udGFpbmVyLmFuY2hvcnNbdGFyZ2V0Q2FyZGluYWxdLnRvcCxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgbmV3TGluay5pbmplY3QoY2FudmFzKTtcclxuICAgIG5ld0xpbmsuY29ubmVjdExpbmsoJ3N0YXJ0JywgYXAuc2hhcGVJZCwgYXAuY2FyZGluYWwpO1xyXG4gICAgbmV3TGluay5jb25uZWN0TGluaygnZW5kJywgbmV4dENvbnRhaW5lci5hbmNob3JzW3RhcmdldENhcmRpbmFsXS5zaGFwZUlkLCBuZXh0Q29udGFpbmVyLmFuY2hvcnNbdGFyZ2V0Q2FyZGluYWxdLmNhcmRpbmFsKTtcclxuICB9XHJcblxyXG4gIF9vbkFuY2hvckxlZnRDbGljayhvcHRpb25zKSB7XHJcbiAgICBjb25zdCBhcCA9IG9wdGlvbnMudGFyZ2V0O1xyXG4gICAgY29uc3QgeyBjYW52YXMgfSA9IHRoaXM7XHJcblxyXG4gICAgLy8gRGlzYWJsZSB0aGUgbXVsdGkgc2VsZWN0aW9uIHdoZW4gbW92aW5nIG1vdXNlXHJcbiAgICB0aGlzLmNhbnZhcy5zZWxlY3Rpb24gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdCBvcHBvc2l0ZUNhcmRpbmFsID0ge1xyXG4gICAgICBlYXN0OiAnd2VzdCcsXHJcbiAgICAgIHdlc3Q6ICdlYXN0JyxcclxuICAgICAgbm9ydGg6ICdzb3V0aCcsXHJcbiAgICAgIHNvdXRoOiAnbm9ydGgnLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IG5ld0xpbmsgPSBuZXcgQ3VydmVkTGluayh7XHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgc3RhcnQ6IHtcclxuICAgICAgICB4OiBhcC5sZWZ0LFxyXG4gICAgICAgIHk6IGFwLnRvcCxcclxuICAgICAgICBkaXJlY3Rpb246IGFwLmNhcmRpbmFsLFxyXG4gICAgICB9LFxyXG4gICAgICBlbmQ6IHtcclxuICAgICAgICB4OiBhcC5sZWZ0LFxyXG4gICAgICAgIHk6IGFwLnRvcCxcclxuICAgICAgICBkaXJlY3Rpb246IG9wcG9zaXRlQ2FyZGluYWxbYXAuY2FyZGluYWxdLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgICBuZXdMaW5rLmluamVjdChjYW52YXMpO1xyXG4gICAgbmV3TGluay5jb25uZWN0TGluaygnc3RhcnQnLCBhcC5zaGFwZUlkLCBhcC5jYXJkaW5hbCk7XHJcbiAgICBuZXdMaW5rLmFycm93SGVhZC5maXJlKCdtb3VzZWRvd24nKTtcclxuXHJcbiAgICBjb25zdCBvbk1vdXNlTW92ZSA9IChldmVudCkgPT4ge1xyXG4gICAgICBuZXdMaW5rLmFycm93SGVhZC5sZWZ0ID0gZXZlbnQucG9pbnRlci54O1xyXG4gICAgICBuZXdMaW5rLmFycm93SGVhZC50b3AgPSBldmVudC5wb2ludGVyLnk7XHJcbiAgICAgIG5ld0xpbmsuYXJyb3dIZWFkLmZpcmUoJ21vdmluZycpO1xyXG4gICAgfTtcclxuICAgIGNhbnZhcy5vbignbW91c2U6bW92ZScsIG9uTW91c2VNb3ZlKTtcclxuXHJcbiAgICBjb25zdCBvbk1vdXNlQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgIC8vIEVuYWJsZSBiYWNrIHRoZSBtdWx0aSBzZWxlY3Rpb24gd2hlbiBtb3ZpbmcgbW91c2VcclxuICAgICAgdGhpcy5jYW52YXMuc2VsZWN0aW9uID0gdHJ1ZTtcclxuXHJcbiAgICAgIG5ld0xpbmsuYXJyb3dIZWFkLmZpcmUoJ21vdmVkJyk7XHJcbiAgICAgIG5ld0xpbmsuYXJyb3dIZWFkLmZpcmUoJ21vdXNldXAnKTtcclxuICAgICAgY2FudmFzLm9mZignbW91c2U6bW92ZScsIG9uTW91c2VNb3ZlKTtcclxuICAgICAgY2FudmFzLm9mZignbW91c2U6dXAnLCBvbk1vdXNlQ2xpY2spO1xyXG4gICAgfTtcclxuICAgIGNhbnZhcy5vbignbW91c2U6dXAnLCBvbk1vdXNlQ2xpY2spO1xyXG4gIH1cclxufVxyXG4iLCJjb25zdCB7IGZhYnJpYyB9ID0gd2luZG93O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3VydmVkTGluayB7XHJcbiAgLyoqXHJcbiAgICogQSBMaW5rIGlzIGEgRmFicmljLlBhdGggb2JqZWN0IHdob3NlIFN0YXJ0IGFuZCBFbmQgcG9pbnRzIGNhbiBiZSBjb25uZWN0ZWQgZW5kIGFueSBhbmNob3Igb2YgdHdvIExpbmthYmxlU2hhcGUuXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIG9wdGlvbnNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7RmFicmljLkNhbnZhc30gICBvcHRpb25zLmNhbnZhcyAtIEZhYnJpYyBjYW52YXNcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgb3B0aW9ucy5pZCAtIFVuaXF1ZSBpZGVudGlmaWVyXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuc3RhcnRdIC0gQ29vcmRpbmF0ZXMgb2YgdGhlIHN0YXJ0IHBvaW50XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIFtvcHRpb25zLnN0YXJ0LnhdIC0gWCBheGlzIGNvb3JkaW5hdGUgb2YgdGhlIHN0YXJ0IHBvaW50XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIFtvcHRpb25zLnN0YXJ0LnldIC0gWSBheGlzIGNvb3JkaW5hdGUgb2YgdGhlIHN0YXJ0IHBvaW50XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIFtvcHRpb25zLnN0YXJ0LmRpcmVjdGlvbl0gLVxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBbb3B0aW9ucy5lbmQueF0gLSBYIGF4aXMgY29vcmRpbmF0ZSBvZiB0aGUgZW5kIHBvaW50XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIFtvcHRpb25zLmVuZC55XSAtIFkgYXhpcyBjb29yZGluYXRlIG9mIHRoZSBlbmQgcG9pbnRcclxuICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgW29wdGlvbnMuZW5kLmRpcmVjdGlvbl0gLVxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBbb3B0aW9ucy5jdXN0b21dIC0gT3B0aW9ucyBlbmQgY3VzdG9taXplIHRoZSBkaWZmZXJlbnQgc2hhcGVzIG9mIHRoZSBMaW5rXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuY3VzdG9tLnBhdGhdIC0gYmV6aWVyIHF1YWRyYXRpYyBjdXJ2ZVxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBbb3B0aW9ucy5jdXN0b20uc3RhcnRQb2ludF0gLSBha2EgYXJyb3dUYWlsXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLmN1c3RvbS5lbmRQb2ludF0gLSBha2EgYXJyb3dIZWFkXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBpZCxcclxuICAgICAgY2FudmFzLFxyXG4gICAgfSA9IG9wdGlvbnM7XHJcbiAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuICAgIHRoaXMuZGlyZWN0aW9uID0ge1xyXG4gICAgICBzdGFydDogb3B0aW9ucyAmJiBvcHRpb25zLnN0YXJ0ICYmIG9wdGlvbnMuc3RhcnQuZGlyZWN0aW9uID8gb3B0aW9ucy5zdGFydC5kaXJlY3Rpb24gOiAnZWFzdCcsXHJcbiAgICAgIGVuZDogb3B0aW9ucyAmJiBvcHRpb25zLmVuZCAmJiBvcHRpb25zLmVuZC5kaXJlY3Rpb24gPyBvcHRpb25zLmVuZC5kaXJlY3Rpb24gOiAnd2VzdCcsXHJcbiAgICB9O1xyXG4gICAgY29uc3Qgc3RhcnQgPSB7XHJcbiAgICAgIHg6IG9wdGlvbnMgJiYgb3B0aW9ucy5zdGFydCAmJiBvcHRpb25zLnN0YXJ0LnggPyBvcHRpb25zLnN0YXJ0LnggOiAwLFxyXG4gICAgICB5OiBvcHRpb25zICYmIG9wdGlvbnMuc3RhcnQgJiYgb3B0aW9ucy5zdGFydC55ID8gb3B0aW9ucy5zdGFydC55IDogMCxcclxuICAgIH07XHJcbiAgICBjb25zdCBlbmQgPSB7XHJcbiAgICAgIHg6IG9wdGlvbnMgJiYgb3B0aW9ucy5lbmQgJiYgb3B0aW9ucy5lbmQueCA/IG9wdGlvbnMuZW5kLnggOiAwLFxyXG4gICAgICB5OiBvcHRpb25zICYmIG9wdGlvbnMuZW5kICYmIG9wdGlvbnMuZW5kLnkgPyBvcHRpb25zLmVuZC55IDogMCxcclxuICAgIH07XHJcblxyXG4gICAgLy8gUGF0aCwgYSBiZXppZXIgY3ViaWMgY3VydmVcclxuICAgIGNvbnN0IHsgcGF0aENvb3Jkc0FycmF5IH0gPSB0aGlzLmNvbXB1dGVQYXRoQ29vcmRzKHtcclxuICAgICAgc3RhcnQ6IHtcclxuICAgICAgICB4OiBzdGFydC54LFxyXG4gICAgICAgIHk6IHN0YXJ0LnksXHJcbiAgICAgICAgZGlyZWN0aW9uOiB0aGlzLmRpcmVjdGlvbi5zdGFydCxcclxuICAgICAgfSxcclxuICAgICAgZW5kOiB7XHJcbiAgICAgICAgeDogZW5kLngsXHJcbiAgICAgICAgeTogZW5kLnksXHJcbiAgICAgICAgZGlyZWN0aW9uOiB0aGlzLmRpcmVjdGlvbi5lbmQsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IHBhdGhPcHRzID0gdGhpcy5kZWZhdWx0UGF0aE9wdGlvbnMgPSB7XHJcbiAgICAgIGZpbGw6ICcnLFxyXG4gICAgICBzdHJva2U6IChvcHRpb25zLmN1c3RvbSAmJiBvcHRpb25zLmN1c3RvbS5wYXRoICYmIG9wdGlvbnMuY3VzdG9tLnBhdGguc3Ryb2tlKSA/IG9wdGlvbnMuY3VzdG9tLnBhdGguc3Ryb2tlIDogJyMwMDAnLFxyXG4gICAgICBzdHJva2VXaWR0aDogKG9wdGlvbnMuY3VzdG9tICYmIG9wdGlvbnMuY3VzdG9tLnBhdGggJiYgb3B0aW9ucy5jdXN0b20ucGF0aC5zdHJva2VXaWR0aCkgPyBvcHRpb25zLmN1c3RvbS5wYXRoLnN0cm9rZVdpZHRoIDogMixcclxuICAgICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAgIHNlbGVjdGFibGU6IHRydWUsXHJcbiAgICAgIGhhc0JvcmRlcnM6IHRydWUsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgICAgcGVyUGl4ZWxUYXJnZXRGaW5kOiB0cnVlLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHBhdGggPSBuZXcgZmFicmljLlBhdGgocGF0aENvb3Jkc0FycmF5LCBwYXRoT3B0cyk7XHJcbiAgICB0aGlzLnBhdGggPSBwYXRoO1xyXG5cclxuICAgIC8vIEVuZCBwb2ludCAoYXJyb3dIZWFkKVxyXG4gICAgY29uc3QgaXNWYWxpZE1hc2tPcHRzID0ge1xyXG4gICAgICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgcmFkaXVzOiAxNixcclxuICAgICAgZmlsbDogJyM1N2I4NTcnLCAvLyBlYTRmMzdcclxuICAgICAgc3Ryb2tlOiAnIzU3Yjg1NycsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgICAgc2VsZWN0YWJsZTogZmFsc2UsXHJcbiAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgYXJyb3dIZWFkT3B0cyA9IHtcclxuICAgICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAgIHdpZHRoOiAxMCxcclxuICAgICAgaGVpZ2h0OiAxMCxcclxuICAgICAgbGVmdDogZW5kLngsXHJcbiAgICAgIHRvcDogZW5kLnksXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICBmaWxsOiAnIzAwMCcsXHJcbiAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgIHN0cm9rZTogJyMwMDAnLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIHNlbGVjdGFibGU6IHRydWUsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgYXJyb3dIZWFkID0gdGhpcy5hcnJvd0hlYWQgPSBuZXcgZmFicmljLlRyaWFuZ2xlKGFycm93SGVhZE9wdHMpO1xyXG4gICAgdGhpcy5pc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrID0gbmV3IGZhYnJpYy5DaXJjbGUoaXNWYWxpZE1hc2tPcHRzKTtcclxuICAgIGFycm93SGVhZC5vbignbW92aW5nJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhdGgoe1xyXG4gICAgICAgIGVuZDoge1xyXG4gICAgICAgICAgeDogYXJyb3dIZWFkLmxlZnQsXHJcbiAgICAgICAgICB5OiBhcnJvd0hlYWQudG9wLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tbWl0OiBmYWxzZSxcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuX2NoZWNrRXh0cmVtaXR5Q2FuQmVDb25uZWN0ZWQoJ2VuZCcpO1xyXG4gICAgfSk7XHJcbiAgICBhcnJvd0hlYWQub24oJ21vdmVkJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhdGgoe1xyXG4gICAgICAgIGVuZDoge1xyXG4gICAgICAgICAgeDogYXJyb3dIZWFkLmxlZnQsXHJcbiAgICAgICAgICB5OiBhcnJvd0hlYWQudG9wLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tbWl0OiB0cnVlLFxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5pc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrLnNldCgnb3BhY2l0eScsIDApO1xyXG4gICAgICB0aGlzLl9jb25uZWN0RGlzY29ubmVjdEV4dHJlbWl0eSgnZW5kJyk7XHJcbiAgICB9KTtcclxuICAgIGFycm93SGVhZC5vbignbW91c2Vkb3duJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLmJyaW5nVG9Gcm9udCgpO1xyXG4gICAgICB0aGlzLnRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KDEpO1xyXG5cclxuICAgICAgYXJyb3dIZWFkLm9uKCdtb3VzZXVwJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudG9nZ2xlQWxsQW5jaG9yc09wYWNpdHkoMCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU3RhcnQgcG9pbnQgKGFycm93VGFpbClcclxuICAgIGNvbnN0IGFycm93VGFpbE9wdHMgPSB7XHJcbiAgICAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgICB3aWR0aDogMTAsXHJcbiAgICAgIGhlaWdodDogMTAsXHJcbiAgICAgIGxlZnQ6IHN0YXJ0LngsXHJcbiAgICAgIHRvcDogc3RhcnQueSxcclxuICAgICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAgIGZpbGw6ICcjZmZmJyxcclxuICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgc3Ryb2tlOiAnIzAwMCcsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgIH07XHJcbiAgICBjb25zdCBhcnJvd1RhaWwgPSB0aGlzLmFycm93VGFpbCA9IG5ldyBmYWJyaWMuUmVjdChhcnJvd1RhaWxPcHRzKTtcclxuICAgIHRoaXMuaXNWYWxpZFRhaWxDb25uZWN0aW9uTWFzayA9IG5ldyBmYWJyaWMuQ2lyY2xlKGlzVmFsaWRNYXNrT3B0cyk7XHJcbiAgICBhcnJvd1RhaWwub24oJ21vdmluZycsICgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVQYXRoKHtcclxuICAgICAgICBzdGFydDoge1xyXG4gICAgICAgICAgeDogYXJyb3dUYWlsLmxlZnQsXHJcbiAgICAgICAgICB5OiBhcnJvd1RhaWwudG9wLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tbWl0OiBmYWxzZSxcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuX2NoZWNrRXh0cmVtaXR5Q2FuQmVDb25uZWN0ZWQoJ3N0YXJ0Jyk7XHJcbiAgICB9KTtcclxuICAgIGFycm93VGFpbC5vbignbW92ZWQnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aCh7XHJcbiAgICAgICAgc3RhcnQ6IHtcclxuICAgICAgICAgIHg6IGFycm93VGFpbC5sZWZ0LFxyXG4gICAgICAgICAgeTogYXJyb3dUYWlsLnRvcCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbW1pdDogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuaXNWYWxpZFRhaWxDb25uZWN0aW9uTWFzay5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgICAgdGhpcy5fY29ubmVjdERpc2Nvbm5lY3RFeHRyZW1pdHkoJ3N0YXJ0Jyk7XHJcbiAgICB9KTtcclxuICAgIGFycm93VGFpbC5vbignbW91c2Vkb3duJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLmJyaW5nVG9Gcm9udCgpO1xyXG4gICAgICB0aGlzLnRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KDEpO1xyXG5cclxuICAgICAgYXJyb3dUYWlsLm9uKCdtb3VzZXVwJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudG9nZ2xlQWxsQW5jaG9yc09wYWNpdHkoMCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbmplY3QoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgcGF0aCxcclxuICAgICAgYXJyb3dIZWFkLFxyXG4gICAgICBhcnJvd1RhaWwsXHJcbiAgICAgIGlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2ssXHJcbiAgICAgIGlzVmFsaWRIZWFkQ29ubmVjdGlvbk1hc2ssXHJcbiAgICB9ID0gdGhpcztcclxuICAgIGNhbnZhcy5hZGQoaXNWYWxpZFRhaWxDb25uZWN0aW9uTWFzayk7XHJcbiAgICBjYW52YXMuYWRkKGlzVmFsaWRIZWFkQ29ubmVjdGlvbk1hc2spO1xyXG4gICAgY2FudmFzLmFkZChhcnJvd0hlYWQpO1xyXG4gICAgY2FudmFzLmFkZChhcnJvd1RhaWwpO1xyXG5cclxuICAgIGNhbnZhcy5hZGQocGF0aCk7XHJcblxyXG4gICAgdGhpcy51cGRhdGVQYXRoKHtcclxuICAgICAgc3RhcnQ6IHtcclxuICAgICAgICB4OiBwYXRoLnBhdGhbMF1bMV0sXHJcbiAgICAgICAgeTogcGF0aC5wYXRoWzBdWzJdLFxyXG4gICAgICB9LFxyXG4gICAgICBlbmQ6IHtcclxuICAgICAgICB4OiBwYXRoLnBhdGhbMl1bNV0sXHJcbiAgICAgICAgeTogcGF0aC5wYXRoWzJdWzZdLFxyXG4gICAgICB9LFxyXG4gICAgICBjb21taXQ6IHRydWUsXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGNvbm5lY3RMaW5rKGxpbmtQb2ludCwgc2hhcGVJZCwgY2FyZGluYWwpIHtcclxuICAgIC8vIENoZWNrIG5vdCBhbHJlYWR5IGNvbm5lY3RlZFxyXG4gICAgaWYgKCF0aGlzLmlzVmFsaWRDb25uZWN0aW9uKGxpbmtQb2ludCwgc2hhcGVJZCwgY2FyZGluYWwpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHNoYXBlID0gdGhpcy5jYW52YXMuZ2V0T2JqZWN0cygpXHJcbiAgICAgIC5maW5kKChvKSA9PiBvLmlkID09PSBzaGFwZUlkKTtcclxuXHJcbiAgICAvLyBEaXNjb25uZWN0IGV4aXN0aW5nIG9iamVjdFxyXG4gICAgdGhpcy5kaXNjb25uZWN0TGluayhsaW5rUG9pbnQpO1xyXG5cclxuICAgIC8vIENvbm5lY3RcclxuICAgIHRoaXMuZGlyZWN0aW9uW2xpbmtQb2ludF0gPSBjYXJkaW5hbDtcclxuICAgIHRoaXNbbGlua1BvaW50XSA9IHtcclxuICAgICAgc2hhcGUsXHJcbiAgICAgIGFuY2hvcjogY2FyZGluYWwsXHJcbiAgICAgIGhhbmRsZXJzOiB7XHJcbiAgICAgICAgb25BbmNob3JQb3NpdGlvbk1vZGlmeWluZzogKCkgPT4ge1xyXG4gICAgICAgICAgY29uc3Qgb3B0cyA9IHtcclxuICAgICAgICAgICAgY29tbWl0OiBmYWxzZSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBvcHRzW2xpbmtQb2ludF0gPSB7XHJcbiAgICAgICAgICAgIHg6IHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLmxlZnQsXHJcbiAgICAgICAgICAgIHk6IHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLnRvcCxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZVBhdGgob3B0cyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkFuY2hvclBvc2l0aW9uTW9kaWZpZWQ6ICgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IG9wdHMgPSB7XHJcbiAgICAgICAgICAgIGNvbW1pdDogdHJ1ZSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBvcHRzW2xpbmtQb2ludF0gPSB7XHJcbiAgICAgICAgICAgIHg6IHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLmxlZnQsXHJcbiAgICAgICAgICAgIHk6IHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLnRvcCxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZVBhdGgob3B0cyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgICBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5vcGFjaXR5ID0gMDtcclxuICAgIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLm9uKCdwZzpwb3NpdGlvbjptb2RpZnlpbmcnLCB0aGlzW2xpbmtQb2ludF0uaGFuZGxlcnMub25BbmNob3JQb3NpdGlvbk1vZGlmeWluZyk7XHJcbiAgICBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5vbigncGc6cG9zaXRpb246bW9kaWZpZWQnLCB0aGlzW2xpbmtQb2ludF0uaGFuZGxlcnMub25BbmNob3JQb3NpdGlvbk1vZGlmaWVkKTtcclxuXHJcbiAgICAvLyBVcGRhdGUgTGlua1xyXG4gICAgY29uc3Qgb3B0cyA9IHtcclxuICAgICAgY29tbWl0OiBmYWxzZSxcclxuICAgIH07XHJcbiAgICBvcHRzW2xpbmtQb2ludF0gPSB7XHJcbiAgICAgIHg6IHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLmxlZnQsXHJcbiAgICAgIHk6IHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLnRvcCxcclxuICAgIH07XHJcbiAgICB0aGlzLnVwZGF0ZVBhdGgob3B0cyk7XHJcbiAgfVxyXG5cclxuICBkaXNjb25uZWN0TGluayhsaW5rUG9pbnQpIHtcclxuICAgIGlmICh0aGlzW2xpbmtQb2ludF0pIHtcclxuICAgICAgdGhpc1tsaW5rUG9pbnRdLnNoYXBlLmFuY2hvcnNbdGhpc1tsaW5rUG9pbnRdLmFuY2hvcl0ub2ZmKCdwZzpwb3NpdGlvbjptb2RpZnlpbmcnLCB0aGlzW2xpbmtQb2ludF0uaGFuZGxlcnMub25BbmNob3JQb3NpdGlvbk1vZGlmeWluZyk7XHJcbiAgICAgIHRoaXNbbGlua1BvaW50XS5zaGFwZS5hbmNob3JzW3RoaXNbbGlua1BvaW50XS5hbmNob3JdLm9mZigncGc6cG9zaXRpb246bW9kaWZpZWQnLCB0aGlzW2xpbmtQb2ludF0uaGFuZGxlcnMub25BbmNob3JQb3NpdGlvbk1vZGlmaWVkKTtcclxuICAgICAgZGVsZXRlIHRoaXNbbGlua1BvaW50XTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGJyaW5nVG9Gcm9udCgpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgY2FudmFzLFxyXG4gICAgICBwYXRoLFxyXG4gICAgICBhcnJvd0hlYWQsXHJcbiAgICAgIGFycm93VGFpbCxcclxuICAgIH0gPSB0aGlzO1xyXG4gICAgY2FudmFzLmJyaW5nVG9Gcm9udChwYXRoKTtcclxuICAgIGNhbnZhcy5icmluZ1RvRnJvbnQoYXJyb3dIZWFkKTtcclxuICAgIGNhbnZhcy5icmluZ1RvRnJvbnQoYXJyb3dUYWlsKTtcclxuICB9XHJcblxyXG4gIGNvbXB1dGVQYXRoQ29vcmRzKG9wdGlvbnMpIHtcclxuICAgIC8vIE1hZ2llIG1hZ2llLCBldCB2b3MgaWTDqWVzIG9udCBkdSBnw6luaWUgIVxyXG5cclxuICAgIGNvbnN0IHN0YXJ0ID0ge1xyXG4gICAgICB4OiBvcHRpb25zLnN0YXJ0LngsXHJcbiAgICAgIHk6IG9wdGlvbnMuc3RhcnQueSxcclxuICAgICAgZGlyZWN0aW9uOiBvcHRpb25zLnN0YXJ0ICYmIG9wdGlvbnMuc3RhcnQuZGlyZWN0aW9uID8gb3B0aW9ucy5zdGFydC5kaXJlY3Rpb24gOiB0aGlzLmRpcmVjdGlvbi5zdGFydCxcclxuICAgIH07XHJcbiAgICBjb25zdCBlbmQgPSB7XHJcbiAgICAgIHg6IG9wdGlvbnMuZW5kLngsXHJcbiAgICAgIHk6IG9wdGlvbnMuZW5kLnksXHJcbiAgICAgIGRpcmVjdGlvbjogb3B0aW9ucy5lbmQgJiYgb3B0aW9ucy5lbmQuZGlyZWN0aW9uID8gb3B0aW9ucy5lbmQuZGlyZWN0aW9uIDogdGhpcy5kaXJlY3Rpb24uZW5kLFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDZW50ZXIgcG9pbnRcclxuICAgIC8vIElmIExpbmsgaXMgY29ubmVjdGVkLCBjZW50ZXIgaXMgY2FsY3VsYXRlZCBiZXR3ZWVuIHRoZSB0d28gbGlua2VkIHNoYXBlc1xyXG4gICAgLy8gSWYgbm90LCBpdCBpcyBjYWxjdWxhdGVkIGJldHdlZW4gbGluayBzdGFydCBhbmQgZW5kIHBvaW50c1xyXG4gICAgY29uc3QgY2VudGVyID0ge1xyXG4gICAgICB4OiAoKHN0YXJ0LnggKyBlbmQueCkgLyAyKSxcclxuICAgICAgeTogKChzdGFydC55ICsgZW5kLnkpIC8gMiksXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENPTU1FTlRFRDogRG9lc24ndCB3b3JrIHdlbGwgd2hlbiBsaW5rZWQgc2hhcGUgaXMgcm90YXRlZFxyXG4gICAgLy8gaWYgKHRoaXMuc3RhcnQgJiYgdGhpcy5lbmQgJiYgc3RhcnQuZGlyZWN0aW9uICE9PSBlbmQuZGlyZWN0aW9uKSB7XHJcbiAgICAvLyAgIGNlbnRlciA9IHtcclxuICAgIC8vICAgICB4OiAodGhpcy5zdGFydC5zaGFwZS5nZXRDZW50ZXJQb2ludCgpLnggKyB0aGlzLmVuZC5zaGFwZS5nZXRDZW50ZXJQb2ludCgpLngpIC8gMixcclxuICAgIC8vICAgICB5OiAodGhpcy5zdGFydC5zaGFwZS5nZXRDZW50ZXJQb2ludCgpLnkgKyB0aGlzLmVuZC5zaGFwZS5nZXRDZW50ZXJQb2ludCgpLnkpIC8gMixcclxuICAgIC8vICAgfTtcclxuICAgIC8vIH1cclxuXHJcbiAgICBjb25zdCBjb250cm9scyA9IHtcclxuICAgICAgc3RhcnQ6IHtcclxuICAgICAgICB4OiBzdGFydC54LFxyXG4gICAgICAgIHk6IHN0YXJ0LnksXHJcbiAgICAgIH0sXHJcbiAgICAgIGVuZDoge1xyXG4gICAgICAgIHg6IGVuZC54LFxyXG4gICAgICAgIHk6IGVuZC55LFxyXG4gICAgICB9LFxyXG4gICAgICBjZW50ZXIxOiB7XHJcbiAgICAgICAgeDogY2VudGVyLngsXHJcbiAgICAgICAgeTogY2VudGVyLnksXHJcbiAgICAgIH0sXHJcbiAgICAgIGNlbnRlcjI6IHtcclxuICAgICAgICB4OiBjZW50ZXIueCxcclxuICAgICAgICB5OiBjZW50ZXIueSxcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgICBzd2l0Y2ggKG9wdGlvbnMuc3RhcnQuZGlyZWN0aW9uKSB7XHJcbiAgICAgIGNhc2UgJ25vcnRoJzpcclxuICAgICAgICBjb250cm9scy5zdGFydC55IC09IE1hdGguYWJzKHN0YXJ0LnkgLSBjZW50ZXIueSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3NvdXRoJzpcclxuICAgICAgICBjb250cm9scy5zdGFydC55ICs9IE1hdGguYWJzKHN0YXJ0LnkgLSBjZW50ZXIueSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2Vhc3QnOlxyXG4gICAgICAgIGNvbnRyb2xzLnN0YXJ0LnggKz0gTWF0aC5hYnMoc3RhcnQueCAtIGNlbnRlci54KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnd2VzdCc6XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29udHJvbHMuc3RhcnQueCAtPSBNYXRoLmFicyhzdGFydC54IC0gY2VudGVyLngpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgc3dpdGNoIChvcHRpb25zLmVuZC5kaXJlY3Rpb24pIHtcclxuICAgICAgY2FzZSAnbm9ydGgnOlxyXG4gICAgICAgIGNvbnRyb2xzLmVuZC55IC09IE1hdGguYWJzKGVuZC55IC0gY2VudGVyLnkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdzb3V0aCc6XHJcbiAgICAgICAgY29udHJvbHMuZW5kLnkgKz0gTWF0aC5hYnMoZW5kLnkgLSBjZW50ZXIueSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2Vhc3QnOlxyXG4gICAgICAgIGNvbnRyb2xzLmVuZC54ICs9IE1hdGguYWJzKGVuZC54IC0gY2VudGVyLngpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd3ZXN0JzpcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb250cm9scy5lbmQueCAtPSBNYXRoLmFicyhlbmQueCAtIGNlbnRlci54KTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc3RhcnQuZGlyZWN0aW9uID09PSBlbmQuZGlyZWN0aW9uKSB7XHJcbiAgICAgIC8vIGNvbnN0IGRlbHRhWCA9IE1hdGguYWJzKHN0YXJ0LnggLSBlbmQueCkgLyAyO1xyXG4gICAgICAvLyBjb25zdCBkZWx0YVkgPSBNYXRoLmFicyhzdGFydC55IC0gZW5kLnkpIC8gMjtcclxuICAgICAgLy8gY29uc3QgZGVsdGFYID0gNDAgKyBNYXRoLmFicyhzdGFydC54IC0gZW5kLngpIC8gNDtcclxuICAgICAgLy8gY29uc3QgZGVsdGFZID0gNDAgKyBNYXRoLmFicyhzdGFydC55IC0gZW5kLnkpIC8gNDtcclxuICAgICAgY29uc3QgZGVsdGFYID0gNDA7XHJcbiAgICAgIGNvbnN0IGRlbHRhWSA9IDQwO1xyXG5cclxuICAgICAgaWYgKHN0YXJ0LmRpcmVjdGlvbiA9PT0gJ3NvdXRoJyB8fCBzdGFydC5kaXJlY3Rpb24gPT09ICdub3J0aCcpIHtcclxuICAgICAgICAvLyBJZiBsaW5rIGlzIGNvbm5lY3RlZCB0byB0d28gc2hhcGVzXHJcbiAgICAgICAgLy8gSWYgc2hhcGVzIGFyZSBob3Jpem9udGFsbHkgYWxpZ25lZCAoaS5lLiBvbiB0b3Agb2YgZWFjaCBvdGhlciksIHdlIG1vdmUgdGhlIExpbmsgY2VudGVyIHBvaW50IGEgYml0IHRvIHRoZSBsZWZ0XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhcnQgJiYgdGhpcy5lbmQpIHtcclxuICAgICAgICAgIC8vIElmIHNoYXBlcyBhcmUgdmVydGljYWxseSBhbGlnbmVkIChpLmUuIG5leHQgdG8gZWFjaCBvdGhlciksIHdlIG1vdmUgdGhlIExpbmsgY2VudGVyIHBvaW50IGEgYml0IHRvIHRoZSB0b3BcclxuICAgICAgICAgIGlmIChNYXRoLmFicyhzdGFydC55IC0gZW5kLnkpIDwgMTApIHtcclxuICAgICAgICAgICAgY2VudGVyLnggLT0gKCh0aGlzLnN0YXJ0LnNoYXBlLndpZHRoICsgdGhpcy5lbmQuc2hhcGUud2lkdGgpIC8gMik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjZW50ZXIueSArPSAoc3RhcnQuZGlyZWN0aW9uID09PSAnc291dGgnID8gZGVsdGFZIDogLWRlbHRhWSk7XHJcbiAgICAgICAgY29udHJvbHMuc3RhcnQueSA9IHN0YXJ0LnkgKyAoc3RhcnQuZGlyZWN0aW9uID09PSAnc291dGgnID8gZGVsdGFZIDogLWRlbHRhWSk7XHJcbiAgICAgICAgY29udHJvbHMuZW5kLnkgPSBlbmQueSArIChzdGFydC5kaXJlY3Rpb24gPT09ICdzb3V0aCcgPyBkZWx0YVkgOiAtZGVsdGFZKTtcclxuICAgICAgICBjb250cm9scy5jZW50ZXIxLnggPSBjZW50ZXIueDtcclxuICAgICAgICBjb250cm9scy5jZW50ZXIyLnggPSBjZW50ZXIueDtcclxuICAgICAgICBjb250cm9scy5jZW50ZXIxLnkgPSBjb250cm9scy5zdGFydC55O1xyXG4gICAgICAgIGNvbnRyb2xzLmNlbnRlcjIueSA9IGNvbnRyb2xzLmVuZC55O1xyXG4gICAgICB9IGVsc2UgaWYgKHN0YXJ0LmRpcmVjdGlvbiA9PT0gJ2Vhc3QnIHx8IHN0YXJ0LmRpcmVjdGlvbiA9PT0gJ3dlc3QnKSB7XHJcbiAgICAgICAgLy8gSWYgbGluayBpcyBjb25uZWN0ZWQgdG8gdHdvIHNoYXBlc1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0ICYmIHRoaXMuZW5kKSB7XHJcbiAgICAgICAgICAvLyBJZiBzaGFwZXMgYXJlIHZlcnRpY2FsbHkgYWxpZ25lZCAoaS5lLiBuZXh0IHRvIGVhY2ggb3RoZXIpLCB3ZSBtb3ZlIHRoZSBMaW5rIGNlbnRlciBwb2ludCBhIGJpdCB0byB0aGUgdG9wXHJcbiAgICAgICAgICBpZiAoTWF0aC5hYnMoc3RhcnQueSAtIGVuZC55KSA8IDEwKSB7XHJcbiAgICAgICAgICAgIGNlbnRlci55IC09ICgodGhpcy5zdGFydC5zaGFwZS5oZWlnaHQgKyB0aGlzLmVuZC5zaGFwZS5oZWlnaHQpIC8gMik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjZW50ZXIueCArPSAoc3RhcnQuZGlyZWN0aW9uID09PSAnZWFzdCcgPyBkZWx0YVggOiAtZGVsdGFYKTtcclxuICAgICAgICBjb250cm9scy5zdGFydC54ID0gc3RhcnQueCArIChzdGFydC5kaXJlY3Rpb24gPT09ICdlYXN0JyA/IGRlbHRhWCA6IC1kZWx0YVgpO1xyXG4gICAgICAgIGNvbnRyb2xzLmVuZC54ID0gZW5kLnggKyAoc3RhcnQuZGlyZWN0aW9uID09PSAnZWFzdCcgPyBkZWx0YVggOiAtZGVsdGFYKTtcclxuICAgICAgICBjb250cm9scy5jZW50ZXIxLnggPSBjb250cm9scy5zdGFydC54O1xyXG4gICAgICAgIGNvbnRyb2xzLmNlbnRlcjIueCA9IGNvbnRyb2xzLmVuZC54O1xyXG4gICAgICAgIGNvbnRyb2xzLmNlbnRlcjEueSA9IGNlbnRlci55O1xyXG4gICAgICAgIGNvbnRyb2xzLmNlbnRlcjIueSA9IGNlbnRlci55O1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHN0YXJ0LmRpcmVjdGlvbiA9PT0gJ3NvdXRoJyB8fCBzdGFydC5kaXJlY3Rpb24gPT09ICdub3J0aCcpIHtcclxuICAgICAgY29udHJvbHMuY2VudGVyMS54ID0gY2VudGVyLng7XHJcbiAgICAgIGNvbnRyb2xzLmNlbnRlcjEueSA9IGNvbnRyb2xzLnN0YXJ0Lnk7XHJcbiAgICAgIGNvbnRyb2xzLmNlbnRlcjIueCA9IGNlbnRlci54O1xyXG4gICAgICBjb250cm9scy5jZW50ZXIyLnkgPSBjb250cm9scy5lbmQueTtcclxuICAgIH0gZWxzZSBpZiAoc3RhcnQuZGlyZWN0aW9uID09PSAnZWFzdCcgfHwgc3RhcnQuZGlyZWN0aW9uID09PSAnd2VzdCcpIHtcclxuICAgICAgY29udHJvbHMuY2VudGVyMS54ID0gY29udHJvbHMuc3RhcnQueDtcclxuICAgICAgY29udHJvbHMuY2VudGVyMS55ID0gY2VudGVyLnk7XHJcbiAgICAgIGNvbnRyb2xzLmNlbnRlcjIueCA9IGNvbnRyb2xzLmVuZC54O1xyXG4gICAgICBjb250cm9scy5jZW50ZXIyLnkgPSBjZW50ZXIueTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJZiBsaW5rIGlzIGNvbm5lY3RlZCB0byBsaW5rZWQgc2hhcGVzIGFuZCB0aGV5IGFyZSByb3RhdGVkLCBwZXJmb3JtIHRoZSByb3RhdGlvbiBvbiB0aGUgY29udHJvbHMgcG9pbnRzXHJcbiAgICAvLyBUT0RPOiB0byBpbXByb3ZlXHJcbiAgICBpZiAodGhpcy5zdGFydCAmJiB0aGlzLnN0YXJ0LnNoYXBlICYmIHRoaXMuc3RhcnQuc2hhcGUuYW5nbGUpIHtcclxuICAgICAgY29uc3QgYW5nbGUgPSAoKHRoaXMuc3RhcnQuc2hhcGUuYW5nbGUgKiBNYXRoLlBJKSAvIDE4MCk7XHJcblxyXG4gICAgICBjb25zdCBjb250cm9sID0gbmV3IGZhYnJpYy5Qb2ludChjb250cm9scy5zdGFydC54LCBjb250cm9scy5zdGFydC55KTtcclxuICAgICAgY29uc3Qgb3JpZ2luID0gbmV3IGZhYnJpYy5Qb2ludChzdGFydC54LCBzdGFydC55KTtcclxuICAgICAgY29uc3Qgcm90YXRlZENvbnRyb2wgPSBmYWJyaWMudXRpbC5yb3RhdGVQb2ludChjb250cm9sLCBvcmlnaW4sIGFuZ2xlKTtcclxuXHJcbiAgICAgIGNvbnRyb2xzLnN0YXJ0LnggPSByb3RhdGVkQ29udHJvbC54O1xyXG4gICAgICBjb250cm9scy5zdGFydC55ID0gcm90YXRlZENvbnRyb2wueTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmVuZCAmJiB0aGlzLmVuZC5zaGFwZSAmJiB0aGlzLmVuZC5zaGFwZS5hbmdsZSkge1xyXG4gICAgICBjb25zdCBhbmdsZSA9ICgodGhpcy5lbmQuc2hhcGUuYW5nbGUgKiBNYXRoLlBJKSAvIDE4MCk7XHJcblxyXG4gICAgICBjb25zdCBjb250cm9sID0gbmV3IGZhYnJpYy5Qb2ludChjb250cm9scy5lbmQueCwgY29udHJvbHMuZW5kLnkpO1xyXG4gICAgICBjb25zdCBvcmlnaW4gPSBuZXcgZmFicmljLlBvaW50KGVuZC54LCBlbmQueSk7XHJcbiAgICAgIGNvbnN0IHJvdGF0ZWRDb250cm9sID0gZmFicmljLnV0aWwucm90YXRlUG9pbnQoY29udHJvbCwgb3JpZ2luLCBhbmdsZSk7XHJcblxyXG4gICAgICBjb250cm9scy5lbmQueCA9IHJvdGF0ZWRDb250cm9sLng7XHJcbiAgICAgIGNvbnRyb2xzLmVuZC55ID0gcm90YXRlZENvbnRyb2wueTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBWaXN1YWwgZGVidWdcclxuICAgIC8vIHRoaXMuY2FudmFzLmFkZChuZXcgZmFicmljLkNpcmNsZSh7XHJcbiAgICAvLyAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgLy8gICBsZWZ0OiBjb250cm9scy5lbmQueCxcclxuICAgIC8vICAgdG9wOiBjb250cm9scy5lbmQueSxcclxuICAgIC8vICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAvLyAgIHJhZGl1czogMixcclxuICAgIC8vICAgZmlsbDogJyM3OGJlZmEnLFxyXG4gICAgLy8gICBzdHJva2U6ICcjNzhiZWZhJyxcclxuICAgIC8vICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAvLyAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgLy8gICBoYXNCb3JkZXJzOiBmYWxzZSxcclxuICAgIC8vICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgLy8gICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgLy8gICBvcGFjaXR5OiAxLFxyXG4gICAgLy8gfSkpO1xyXG4gICAgLy8gdGhpcy5jYW52YXMuYWRkKG5ldyBmYWJyaWMuQ2lyY2xlKHtcclxuICAgIC8vICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAvLyAgIGxlZnQ6IGNlbnRlci54LFxyXG4gICAgLy8gICB0b3A6IGNlbnRlci55LFxyXG4gICAgLy8gICBzdHJva2VXaWR0aDogMSxcclxuICAgIC8vICAgcmFkaXVzOiAyLFxyXG4gICAgLy8gICBmaWxsOiAnI2ZmMicsXHJcbiAgICAvLyAgIHN0cm9rZTogJyNmZjInLFxyXG4gICAgLy8gICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgIC8vICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAvLyAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgLy8gICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAvLyAgIHNlbGVjdGFibGU6IHRydWUsXHJcbiAgICAvLyAgIG9wYWNpdHk6IDEsXHJcbiAgICAvLyB9KSk7XHJcbiAgICAvLyB0aGlzLmNhbnZhcy5hZGQobmV3IGZhYnJpYy5DaXJjbGUoe1xyXG4gICAgLy8gICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgIC8vICAgbGVmdDogY29udHJvbHMuc3RhcnQueCxcclxuICAgIC8vICAgdG9wOiBjb250cm9scy5zdGFydC55LFxyXG4gICAgLy8gICBzdHJva2VXaWR0aDogMSxcclxuICAgIC8vICAgcmFkaXVzOiAyLFxyXG4gICAgLy8gICBmaWxsOiAnI2YyMicsXHJcbiAgICAvLyAgIHN0cm9rZTogJyNmMjInLFxyXG4gICAgLy8gICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgIC8vICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAvLyAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgLy8gICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAvLyAgIHNlbGVjdGFibGU6IHRydWUsXHJcbiAgICAvLyAgIG9wYWNpdHk6IDEsXHJcbiAgICAvLyB9KSk7XHJcblxyXG4gICAgY29uc3QgY29vcmRzID0ge1xyXG4gICAgICBzdGFydDoge1xyXG4gICAgICAgIHg6IHN0YXJ0LngsXHJcbiAgICAgICAgeTogc3RhcnQueSxcclxuICAgICAgfSxcclxuICAgICAgZW5kOiB7XHJcbiAgICAgICAgeDogZW5kLngsXHJcbiAgICAgICAgeTogZW5kLnksXHJcbiAgICAgIH0sXHJcbiAgICAgIGNlbnRlcixcclxuICAgICAgY29udHJvbHM6IHtcclxuICAgICAgICBzdGFydDoge1xyXG4gICAgICAgICAgeDogY29udHJvbHMuc3RhcnQueCxcclxuICAgICAgICAgIHk6IGNvbnRyb2xzLnN0YXJ0LnksXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbmQ6IHtcclxuICAgICAgICAgIHg6IGNvbnRyb2xzLmVuZC54LFxyXG4gICAgICAgICAgeTogY29udHJvbHMuZW5kLnksXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjZW50ZXIxOiB7XHJcbiAgICAgICAgICB4OiBjb250cm9scy5jZW50ZXIxLngsXHJcbiAgICAgICAgICB5OiBjb250cm9scy5jZW50ZXIxLnksXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjZW50ZXIyOiB7XHJcbiAgICAgICAgICB4OiBjb250cm9scy5jZW50ZXIyLngsXHJcbiAgICAgICAgICB5OiBjb250cm9scy5jZW50ZXIyLnksXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgICBjb25zdCBwYXRoQ29vcmRzQXJyYXkgPSBbXHJcbiAgICAgIFsnTScsIGNvb3Jkcy5zdGFydC54LCBjb29yZHMuc3RhcnQueV0sXHJcbiAgICAgIFsnQycsIGNvb3Jkcy5jb250cm9scy5zdGFydC54LCBjb29yZHMuY29udHJvbHMuc3RhcnQueSwgY29vcmRzLmNvbnRyb2xzLmNlbnRlcjEueCwgY29vcmRzLmNvbnRyb2xzLmNlbnRlcjEueSwgY29vcmRzLmNlbnRlci54LCBjb29yZHMuY2VudGVyLnldLFxyXG4gICAgICBbJ0MnLCBjb29yZHMuY29udHJvbHMuY2VudGVyMi54LCBjb29yZHMuY29udHJvbHMuY2VudGVyMi55LCBjb29yZHMuY29udHJvbHMuZW5kLngsIGNvb3Jkcy5jb250cm9scy5lbmQueSwgY29vcmRzLmVuZC54LCBjb29yZHMuZW5kLnldLFxyXG4gICAgXTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHBhdGhDb29yZHM6IGNvb3JkcyxcclxuICAgICAgcGF0aENvb3Jkc0FycmF5LFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQHBhcmFtIG9wdGlvbnNcclxuICAgKiBAcGFyYW0gb3B0aW9ucy5zdGFydC54XHJcbiAgICogQHBhcmFtIG9wdGlvbnMuc3RhcnQueVxyXG4gICAqIEBwYXJhbSBvcHRpb25zLmVuZC54XHJcbiAgICogQHBhcmFtIG9wdGlvbnMuZW5kLnlcclxuICAgKiBAcGFyYW0gb3B0aW9ucy5jb21taXRcclxuICAgKi9cclxuICB1cGRhdGVQYXRoKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHN0YXJ0ID0ge1xyXG4gICAgICB4OiBvcHRpb25zLnN0YXJ0ICYmIG9wdGlvbnMuc3RhcnQueCA/IG9wdGlvbnMuc3RhcnQueCA6IHRoaXMucGF0aC5wYXRoWzBdWzFdLFxyXG4gICAgICB5OiBvcHRpb25zLnN0YXJ0ICYmIG9wdGlvbnMuc3RhcnQueSA/IG9wdGlvbnMuc3RhcnQueSA6IHRoaXMucGF0aC5wYXRoWzBdWzJdLFxyXG4gICAgICBkaXJlY3Rpb246IG9wdGlvbnMuc3RhcnQgJiYgb3B0aW9ucy5zdGFydC5kaXJlY3Rpb24gPyBvcHRpb25zLnN0YXJ0LmRpcmVjdGlvbiA6IHRoaXMuZGlyZWN0aW9uLnN0YXJ0LFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGVuZCA9IHtcclxuICAgICAgeDogb3B0aW9ucy5lbmQgJiYgb3B0aW9ucy5lbmQueCA/IG9wdGlvbnMuZW5kLnggOiB0aGlzLnBhdGgucGF0aFsyXVs1XSxcclxuICAgICAgeTogb3B0aW9ucy5lbmQgJiYgb3B0aW9ucy5lbmQueSA/IG9wdGlvbnMuZW5kLnkgOiB0aGlzLnBhdGgucGF0aFsyXVs2XSxcclxuICAgICAgZGlyZWN0aW9uOiBvcHRpb25zLmVuZCAmJiBvcHRpb25zLmVuZC5kaXJlY3Rpb24gPyBvcHRpb25zLmVuZC5kaXJlY3Rpb24gOiB0aGlzLmRpcmVjdGlvbi5lbmQsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgeyBwYXRoQ29vcmRzQXJyYXkgfSA9IHRoaXMuY29tcHV0ZVBhdGhDb29yZHMoe1xyXG4gICAgICBzdGFydCwgZW5kLFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKG9wdGlvbnMuY29tbWl0KSB7XHJcbiAgICAgIGNvbnN0IG5ld1BhdGggPSBuZXcgZmFicmljLlBhdGgocGF0aENvb3Jkc0FycmF5LCB0aGlzLmRlZmF1bHRQYXRoT3B0aW9ucyk7XHJcbiAgICAgIHRoaXMuY2FudmFzLnJlbW92ZSh0aGlzLnBhdGgpO1xyXG4gICAgICB0aGlzLmNhbnZhcy5hZGQobmV3UGF0aCk7XHJcblxyXG4gICAgICBuZXdQYXRoLm9uKCdtb3VzZWRvd24nLCB0aGlzLmJyaW5nVG9Gcm9udC5iaW5kKHRoaXMpKTtcclxuICAgICAgbmV3UGF0aC5vbignbW92aW5nJywgdGhpcy5vbkxpbmtNb3ZpbmcuYmluZCh0aGlzKSk7XHJcbiAgICAgIG5ld1BhdGgub24oJ21vdmVkJywgdGhpcy5vbkxpbmtNb3ZlZC5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgIGNvbnN0IHRvQmluZCA9IFtcclxuICAgICAgICB0aGlzLmFycm93SGVhZCxcclxuICAgICAgICB0aGlzLmFycm93VGFpbCxcclxuICAgICAgXTtcclxuICAgICAgY29uc3QgYm9zc1RyYW5zZm9ybSA9IG5ld1BhdGguY2FsY1RyYW5zZm9ybU1hdHJpeCgpO1xyXG4gICAgICBjb25zdCBpbnZlcnRlZEJvc3NUcmFuc2Zvcm0gPSBmYWJyaWMudXRpbC5pbnZlcnRUcmFuc2Zvcm0oYm9zc1RyYW5zZm9ybSk7XHJcbiAgICAgIHRvQmluZC5mb3JFYWNoKChvKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZGVzaXJlZFRyYW5zZm9ybSA9IGZhYnJpYy51dGlsLm11bHRpcGx5VHJhbnNmb3JtTWF0cmljZXMoXHJcbiAgICAgICAgICBpbnZlcnRlZEJvc3NUcmFuc2Zvcm0sXHJcbiAgICAgICAgICBvLmNhbGNUcmFuc2Zvcm1NYXRyaXgoKSxcclxuICAgICAgICApO1xyXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxyXG4gICAgICAgIG8ucmVsYXRpb25zaGlwID0gZGVzaXJlZFRyYW5zZm9ybTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLnBhdGggPSBuZXdQYXRoO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYXRoLnNldCgncGF0aCcsIHBhdGhDb29yZHNBcnJheSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVXBkYXRlIGNvbnRyb2wgbGluZXMsIGFycm93IGhlYWRzIGFuZCB0YWlsc1xyXG4gICAgY29uc3QgYXJyb3dIZWFkQW5nbGUgPSAoTWF0aC5hdGFuMih0aGlzLnBhdGgucGF0aFsyXVs2XSAtIHRoaXMucGF0aC5wYXRoWzJdWzRdLCB0aGlzLnBhdGgucGF0aFsyXVs1XSAtIHRoaXMucGF0aC5wYXRoWzJdWzNdKSAqIDE4MCkgLyBNYXRoLlBJO1xyXG4gICAgdGhpcy5hcnJvd0hlYWQuYW5nbGUgPSBhcnJvd0hlYWRBbmdsZSArIDkwO1xyXG4gICAgdGhpcy5hcnJvd0hlYWQubGVmdCA9IHRoaXMucGF0aC5wYXRoWzJdWzVdO1xyXG4gICAgdGhpcy5hcnJvd0hlYWQudG9wID0gdGhpcy5wYXRoLnBhdGhbMl1bNl07XHJcbiAgICB0aGlzLmFycm93SGVhZC5zZXRDb29yZHMoKTtcclxuICAgIHRoaXMuYXJyb3dUYWlsLmxlZnQgPSB0aGlzLnBhdGgucGF0aFswXVsxXTtcclxuICAgIHRoaXMuYXJyb3dUYWlsLnRvcCA9IHRoaXMucGF0aC5wYXRoWzBdWzJdO1xyXG4gICAgdGhpcy5hcnJvd1RhaWwuc2V0Q29vcmRzKCk7XHJcblxyXG4gICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcclxuICB9XHJcblxyXG4gIGlzVmFsaWRDb25uZWN0aW9uKGxpbmtQb2ludCwgc2hhcGVJZCwgY2FyZGluYWwpIHtcclxuICAgIGNvbnN0IHNoYXBlID0gdGhpcy5jYW52YXMuZ2V0T2JqZWN0cygpXHJcbiAgICAgIC5maW5kKChvKSA9PiBvLmlkID09PSBzaGFwZUlkKTtcclxuICAgIC8vIENoZWNrIG5vdCBhbHJlYWR5IGNvbm5lY3RlZFxyXG4gICAgaWYgKGxpbmtQb2ludCA9PT0gJ3N0YXJ0Jykge1xyXG4gICAgICBpZiAodGhpcy5zdGFydCAmJiB0aGlzLnN0YXJ0LnNoYXBlICYmIHRoaXMuc3RhcnQuc2hhcGUuaWQgPT09IHNoYXBlLmlkICYmIHRoaXMuc3RhcnQuY2FyZGluYWwgPT09IGNhcmRpbmFsKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyB0cnlpbmcgZW5kIHNldCB0aGUgc2FtZSBhbHJlYWR5IGNvbm5lY3RlZCBhbmNob3JcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5lbmQgJiYgdGhpcy5lbmQuc2hhcGUgJiYgdGhpcy5lbmQuc2hhcGUuaWQgPT09IHNoYXBlLmlkKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyB0cnlpbmcgZW5kIHNob3J0IGNpcmN1aXQgdGhlIHJlY3RhbmdsZVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGxpbmtQb2ludCA9PT0gJ2VuZCcpIHtcclxuICAgICAgaWYgKHRoaXMuZW5kICYmIHRoaXMuZW5kLnNoYXBlICYmIHRoaXMuZW5kLnNoYXBlLmlkID09PSBzaGFwZS5pZCAmJiB0aGlzLmVuZC5jYXJkaW5hbCA9PT0gY2FyZGluYWwpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIHRyeWluZyBlbmQgc2V0IHRoZSBzYW1lIGFscmVhZHkgY29ubmVjdGVkIGFuY2hvclxyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLnN0YXJ0ICYmIHRoaXMuc3RhcnQuc2hhcGUgJiYgdGhpcy5zdGFydC5zaGFwZS5pZCA9PT0gc2hhcGUuaWQpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIHRyeWluZyBlbmQgc2hvcnQgY2lyY3VpdCB0aGUgcmVjdGFuZ2xlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlQWxsQW5jaG9yc09wYWNpdHkob3BhY2l0eSkge1xyXG4gICAgY29uc3QgYW5jaG9ycyA9IHRoaXMuY2FudmFzLmdldE9iamVjdHMoKVxyXG4gICAgICAuZmlsdGVyKChvKSA9PiBvLnR5cGUgPT09ICdhbmNob3InKTtcclxuXHJcbiAgICAvLyBjb25zdCBwcm9taXNlcyA9IFtdO1xyXG4gICAgLy8gY29uc3QgcHJvbWlzZUZhY3RvcnkgPSBmdW5jdGlvbiAoYW5jaG9yKSB7XHJcbiAgICAvLyAgIHJldHVybiBmdW5jdGlvbiAocmVzb2x2ZSkge1xyXG4gICAgLy8gICAgIGFuY2hvci5hbmltYXRlKCdvcGFjaXR5Jywgb3BhY2l0eSwge1xyXG4gICAgLy8gICAgICAgZHVyYXRpb246IDMwMCxcclxuICAgIC8vICAgICAgIG9uQ2hhbmdlOiByZXNvbHZlLFxyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gICB9O1xyXG4gICAgLy8gfTtcclxuICAgIC8vIGZvciAobGV0IGEgPSAwOyBhIDwgYW5jaG9ycy5sZW5ndGg7IGEgKz0gMSkge1xyXG4gICAgLy8gICBpZiAobG9jayAhPT0gdW5kZWZpbmVkKSBhbmNob3JzW2FdLmxvY2tPcGFjaXR5ID0gbG9jaztcclxuICAgIC8vICAgcHJvbWlzZXMucHVzaChuZXcgUHJvbWlzZShwcm9taXNlRmFjdG9yeShhbmNob3JzW2FdKSkpO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCkgPT4ge1xyXG4gICAgLy8gICB0aGlzLmNhbnZhcy5yZW5kZXJBbGwoKTtcclxuICAgIC8vIH0pO1xyXG5cclxuICAgIGZvciAobGV0IGEgPSAwOyBhIDwgYW5jaG9ycy5sZW5ndGg7IGEgKz0gMSkge1xyXG4gICAgICAvLyBpZiAobG9jayAhPT0gdW5kZWZpbmVkKSBhbmNob3JzW2FdLmxvY2tPcGFjaXR5ID0gbG9jaztcclxuICAgICAgYW5jaG9yc1thXS5zZXQoJ29wYWNpdHknLCBvcGFjaXR5KTtcclxuICAgIH1cclxuICAgIHRoaXMuY2FudmFzLnJlbmRlckFsbCgpO1xyXG4gIH1cclxuXHJcbiAgb25MaW5rTW92aW5nKCkge1xyXG4gICAgLy8gTW92ZSBzdGFydCwgZW5kLCBjb250cm9sIHBvaW50cyBhbHRvZ2V0aGVyIHdpdGggdGhlIFBhdGhcclxuICAgIGNvbnN0IHRvVXBkYXRlID0gW1xyXG4gICAgICB0aGlzLmFycm93SGVhZCxcclxuICAgICAgdGhpcy5hcnJvd1RhaWwsXHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0IGtlZXBIZWFkQW5nbGUgPSB0aGlzLmFycm93SGVhZC5hbmdsZTtcclxuICAgIGNvbnN0IGtlZXBUYWlsQW5nbGUgPSB0aGlzLmFycm93VGFpbC5hbmdsZTtcclxuXHJcbiAgICB0b1VwZGF0ZS5mb3JFYWNoKChvKSA9PiB7XHJcbiAgICAgIGlmICghby5yZWxhdGlvbnNoaXApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgeyByZWxhdGlvbnNoaXAgfSA9IG87XHJcbiAgICAgIGNvbnN0IG5ld1RyYW5zZm9ybSA9IGZhYnJpYy51dGlsLm11bHRpcGx5VHJhbnNmb3JtTWF0cmljZXMoXHJcbiAgICAgICAgdGhpcy5wYXRoLmNhbGNUcmFuc2Zvcm1NYXRyaXgoKSxcclxuICAgICAgICByZWxhdGlvbnNoaXAsXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IG9wdCA9IGZhYnJpYy51dGlsLnFyRGVjb21wb3NlKG5ld1RyYW5zZm9ybSk7XHJcbiAgICAgIG8uc2V0KHtcclxuICAgICAgICBmbGlwWDogZmFsc2UsXHJcbiAgICAgICAgZmxpcFk6IGZhbHNlLFxyXG4gICAgICB9KTtcclxuICAgICAgby5zZXRQb3NpdGlvbkJ5T3JpZ2luKFxyXG4gICAgICAgIHsgeDogb3B0LnRyYW5zbGF0ZVgsIHk6IG9wdC50cmFuc2xhdGVZIH0sXHJcbiAgICAgICAgJ2NlbnRlcicsXHJcbiAgICAgICAgJ2NlbnRlcicsXHJcbiAgICAgICk7XHJcbiAgICAgIG8uc2V0KG9wdCk7XHJcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxyXG4gICAgICBvLmFuZ2xlID0gKG8gPT09IHRoaXMuYXJyb3dIZWFkKSA/IGtlZXBIZWFkQW5nbGUgOiBrZWVwVGFpbEFuZ2xlOyAvLyBwcmVzZXJ2ZSBwcmV2aW91cyBhbmdsZVxyXG5cclxuICAgICAgby5zZXRDb29yZHMoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEZpbmFsbHksIGNoZWNrIHRoZSBzdGFydCBvciBlbmQgcG9pbnRzIGNhbiBiZSBjb25uZWN0ZWQuXHJcbiAgICB0aGlzLl9jaGVja0V4dHJlbWl0eUNhbkJlQ29ubmVjdGVkKCdzdGFydCcpO1xyXG4gICAgdGhpcy5fY2hlY2tFeHRyZW1pdHlDYW5CZUNvbm5lY3RlZCgnZW5kJyk7XHJcbiAgfVxyXG5cclxuICBvbkxpbmtNb3ZlZCgpIHtcclxuICAgIC8vIFJldXBkYXRlIHRoZSBQYXRoIGFjY29yZGluZyBlbmQgdGhlIG5ldyBjb29yZGluYXRlcyBvZiBhbGwgZWxlbWVudHNcclxuICAgIHRoaXMudXBkYXRlUGF0aCh7XHJcbiAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgeDogdGhpcy5hcnJvd1RhaWwubGVmdCxcclxuICAgICAgICB5OiB0aGlzLmFycm93VGFpbC50b3AsXHJcbiAgICAgIH0sXHJcbiAgICAgIGVuZDoge1xyXG4gICAgICAgIHg6IHRoaXMuYXJyb3dIZWFkLmxlZnQsXHJcbiAgICAgICAgeTogdGhpcy5hcnJvd0hlYWQudG9wLFxyXG4gICAgICB9LFxyXG4gICAgICBjb21taXQ6IHRydWUsXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBDb25uZWN0IG9yIERpc2Nvbm5lY3QgZGVwZW5kaW5nIG9uIGV4dHJlbWl0aWVzIHBvc2l0aW9uc1xyXG4gICAgdGhpcy5pc1ZhbGlkVGFpbENvbm5lY3Rpb25NYXNrLnNldCgnb3BhY2l0eScsIDApO1xyXG4gICAgdGhpcy5pc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrLnNldCgnb3BhY2l0eScsIDApO1xyXG4gICAgdGhpcy5fY29ubmVjdERpc2Nvbm5lY3RFeHRyZW1pdHkoJ3N0YXJ0Jyk7XHJcbiAgICB0aGlzLl9jb25uZWN0RGlzY29ubmVjdEV4dHJlbWl0eSgnZW5kJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIZWxwZXIgZW5kIGRpc3BsYXkgYSB2YWxpZCBjaXJjbGUgbWFzayBvbiBzcGVjaWZpYyBjb25kaXRpb25zLlxyXG4gICAqIElmIHRoZSBleHRyZW1pdHkgaXMgdG91Y2hpbmcgYW4gYW5jaG9yIG9mIGEgTGlua2FibGVTaGFwZSBzdGFydCB3aGljaCBpdCBpcyBub3QgeWV0IGNvbm5lY3RlZCA9PiBzaG93IEdSRUVOXHJcbiAgICogSWYgdGhlIGV4dHJlbWl0eSBpcyB0b3VjaGluZyBhbiBhbmNob3Igb2YgYSBMaW5rYWJsZVNoYXBlIHN0YXJ0IHdoaWNoIGl0IGlzIGFscmVhZHkgY29ubmVjdGVkIGJ5IHRoZSBvdGhlciBleHRyZW1pdHkgPT4gc2hvdyBSRURcclxuICAgKiBAcGFyYW0gZGlyZWN0aW9uXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBfY2hlY2tFeHRyZW1pdHlDYW5CZUNvbm5lY3RlZChkaXJlY3Rpb24pIHtcclxuICAgIGNvbnN0IHsgY2FudmFzIH0gPSB0aGlzO1xyXG5cclxuICAgIGxldCBleHRyZW1pdHk7XHJcbiAgICBsZXQgbWFzaztcclxuICAgIGlmIChkaXJlY3Rpb24gPT09ICdzdGFydCcpIHtcclxuICAgICAgZXh0cmVtaXR5ID0gdGhpcy5hcnJvd1RhaWw7XHJcbiAgICAgIG1hc2sgPSB0aGlzLmlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2s7XHJcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ2VuZCcpIHtcclxuICAgICAgZXh0cmVtaXR5ID0gdGhpcy5hcnJvd0hlYWQ7XHJcbiAgICAgIG1hc2sgPSB0aGlzLmlzVmFsaWRIZWFkQ29ubmVjdGlvbk1hc2s7XHJcbiAgICB9XHJcblxyXG4gICAgbWFzay5sZWZ0ID0gZXh0cmVtaXR5LmxlZnQ7XHJcbiAgICBtYXNrLnRvcCA9IGV4dHJlbWl0eS50b3A7XHJcbiAgICBtYXNrLnNldENvb3JkcygpO1xyXG4gICAgbWFzay5zZXQoJ29wYWNpdHknLCAwKTtcclxuXHJcbiAgICAvLyBDaGVjayBpZiBpbnRlcnNlY3RzIHdpdGggYW5jaG9yXHJcbiAgICBjb25zdCBhbmNob3JzID0gY2FudmFzLmdldE9iamVjdHMoKVxyXG4gICAgICAuZmlsdGVyKChvKSA9PiBvLnR5cGUgPT09ICdhbmNob3InKTtcclxuICAgIGV4dHJlbWl0eS5zZXQoJ3N0cm9rZScsICcjMDAwJyk7XHJcbiAgICBmb3IgKGxldCBhID0gMDsgYSA8IGFuY2hvcnMubGVuZ3RoOyBhICs9IDEpIHtcclxuICAgICAgaWYgKGV4dHJlbWl0eS5pbnRlcnNlY3RzV2l0aE9iamVjdChhbmNob3JzW2FdKSkge1xyXG4gICAgICAgIG1hc2suc2V0KCdvcGFjaXR5JywgMC41KTtcclxuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkQ29ubmVjdGlvbihkaXJlY3Rpb24sIGFuY2hvcnNbYV0uc2hhcGVJZCwgYW5jaG9yc1thXS5jYXJkaW5hbCkpIHtcclxuICAgICAgICAgIG1hc2suc2V0KHtcclxuICAgICAgICAgICAgc3Ryb2tlOiAnIzU3Yjg1NycsXHJcbiAgICAgICAgICAgIGZpbGw6ICcjNTdiODU3JyxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgZXh0cmVtaXR5LnNldCgnc3Ryb2tlJywgJyM1ZjUnKTtcclxuICAgICAgICAgIGNvbnN0IG9wdHMgPSB7XHJcbiAgICAgICAgICAgIGNvbW1pdDogZmFsc2UsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgb3B0c1tkaXJlY3Rpb25dID0ge1xyXG4gICAgICAgICAgICB4OiBleHRyZW1pdHkubGVmdCxcclxuICAgICAgICAgICAgeTogZXh0cmVtaXR5LnRvcCxcclxuICAgICAgICAgICAgZGlyZWN0aW9uOiBhbmNob3JzW2FdLmNhcmRpbmFsLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHRoaXMudXBkYXRlUGF0aChvcHRzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbWFzay5zZXQoe1xyXG4gICAgICAgICAgICBzdHJva2U6ICcjZWE0ZjM3JyxcclxuICAgICAgICAgICAgZmlsbDogJyNlYTRmMzcnLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBleHRyZW1pdHkuc2V0KCdzdHJva2UnLCAnI2VhNGYzNycpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGVscGVyIGVuZCBleGVjdXRlIGNvbm5lY3QvZGlzY29ubmVjdCBkZXBlbmRpbmcgb24gc3BlY2lmaWMgY29uZGl0aW9ucy5cclxuICAgKiBJZiB0aGUgZXh0cmVtaXR5IHdhcyBjb25uZWN0ZWQgQU5EIGl0IGlzIE5PVCB0b3VjaGluZyB0aGUgYW5jaG9yIGFueW1vcmUgPT4gZGlzY29ubmVjdCBpdC5cclxuICAgKiBJZiB0aGUgZXh0cmVtaXR5IHdhcyBkaXNjb25uZWN0ZWQgQU5EIGl0IGlzIHRvdWNoaW5nIHRoZSBhbmNob3IgPT4gY29ubmVjdCBpdC5cclxuICAgKiBAcGFyYW0gZGlyZWN0aW9uXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBfY29ubmVjdERpc2Nvbm5lY3RFeHRyZW1pdHkoZGlyZWN0aW9uKSB7XHJcbiAgICBjb25zdCB7IGNhbnZhcyB9ID0gdGhpcztcclxuXHJcbiAgICBsZXQgZXh0cmVtaXR5O1xyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3N0YXJ0Jykge1xyXG4gICAgICBleHRyZW1pdHkgPSB0aGlzLmFycm93VGFpbDtcclxuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnZW5kJykge1xyXG4gICAgICBleHRyZW1pdHkgPSB0aGlzLmFycm93SGVhZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGVjayBpZiBpbnRlcnNlY3RzIHdpdGggYW5jaG9yXHJcbiAgICBjb25zdCBhbmNob3JzID0gY2FudmFzLmdldE9iamVjdHMoKVxyXG4gICAgICAuZmlsdGVyKChvKSA9PiBvLnR5cGUgPT09ICdhbmNob3InKTtcclxuICAgIGZvciAobGV0IGEgPSAwOyBhIDwgYW5jaG9ycy5sZW5ndGg7IGEgKz0gMSkge1xyXG4gICAgICBpZiAoZXh0cmVtaXR5LmludGVyc2VjdHNXaXRoT2JqZWN0KGFuY2hvcnNbYV0pKSB7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0TGluayhkaXJlY3Rpb24sIGFuY2hvcnNbYV0uc2hhcGVJZCwgYW5jaG9yc1thXS5jYXJkaW5hbCk7XHJcbiAgICAgICAgLy8gYW5jaG9yc1thXS5zZXQoJ3N0cm9rZScsICcjMDAwJyk7XHJcbiAgICAgICAgZXh0cmVtaXR5LnNldCgnc3Ryb2tlJywgJyMwMDAnKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzW2RpcmVjdGlvbl0gJiYgYW5jaG9yc1thXSA9PT0gdGhpc1tkaXJlY3Rpb25dLnNoYXBlLmFuY2hvcnNbdGhpc1tkaXJlY3Rpb25dLmFuY2hvcl0pIHtcclxuICAgICAgICAvLyBJZiB0aGlzIGxpbmsgd2FzIGNvbm5lY3RlZCBlbmQgdGhpcyBhbmNob3IgYW5kIGl0IGRvZXNuJ3QgaW50ZXJzZWN0IGFueW1vcmVcclxuICAgICAgICB0aGlzLmRpc2Nvbm5lY3RMaW5rKGRpcmVjdGlvbik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiY29uc3QgeyBmYWJyaWMgfSA9IHdpbmRvdztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpbmsge1xyXG4gIC8qKlxyXG4gICAqIEEgTGluayBpcyBhIEZhYnJpYy5QYXRoIG9iamVjdCB3aG9zZSBTdGFydCBhbmQgRW5kIHBvaW50cyBjYW4gYmUgY29ubmVjdGVkIGVuZCBhbnkgYW5jaG9yIG9mIHR3byBMaW5rYWJsZVNoYXBlLlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBvcHRpb25zXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0ZhYnJpYy5DYW52YXN9ICAgb3B0aW9ucy5jYW52YXMgLSBGYWJyaWMgY2FudmFzXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG9wdGlvbnMuaWQgLSBVbmlxdWUgaWRlbnRpZmllclxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLnN0YXJ0XSAtIENvb3JkaW5hdGVzIG9mIHRoZSBzdGFydCBwb2ludFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBbb3B0aW9ucy5zdGFydC54XSAtIFggYXhpcyBjb29yZGluYXRlIG9mIHRoZSBzdGFydCBwb2ludFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBbb3B0aW9ucy5zdGFydC55XSAtIFkgYXhpcyBjb29yZGluYXRlIG9mIHRoZSBzdGFydCBwb2ludFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBbb3B0aW9ucy5lbmQueF0gLSBYIGF4aXMgY29vcmRpbmF0ZSBvZiB0aGUgZW5kIHBvaW50XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIFtvcHRpb25zLmVuZC55XSAtIFkgYXhpcyBjb29yZGluYXRlIG9mIHRoZSBlbmQgcG9pbnRcclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuY3VzdG9tXSAtIE9wdGlvbnMgZW5kIGN1c3RvbWl6ZSB0aGUgZGlmZmVyZW50IHNoYXBlcyBvZiB0aGUgTGlua1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLmN1c3RvbS5wYXRoXSAtIGJlemllciBxdWFkcmF0aWMgY3VydmVcclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuY3VzdG9tLmNvbnRyb2xQb2ludF0gLSBiZXppZXIgcXVhZHJhdGljIGN1cnZlIGNvbnRyb2wgcG9pbnRcclxuICAgKiBAcGFyYW0ge0xpbmV9ICAgICAgICAgICAgW29wdGlvbnMuY3VzdG9tLmNvbnRyb2xMaW5lXSAtIHZpc3VhbCBsaW5lcyBzdGFydCB0aGUgY29udHJvbCBwb2ludCBlbmQgdGhlIHN0YXJ0JmVuZCBwb2ludHNcclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuY3VzdG9tLnN0YXJ0UG9pbnRdIC0gYWthIGFycm93VGFpbFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBbb3B0aW9ucy5jdXN0b20uZW5kUG9pbnRdIC0gYWthIGFycm93SGVhZFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgaWQsXHJcbiAgICAgIGNhbnZhcyxcclxuICAgIH0gPSBvcHRpb25zO1xyXG4gICAgY29uc3QgeDEgPSBvcHRpb25zICYmIG9wdGlvbnMuc3RhcnQgJiYgb3B0aW9ucy5zdGFydC54ID8gb3B0aW9ucy5zdGFydC54IDogMDtcclxuICAgIGNvbnN0IHkxID0gb3B0aW9ucyAmJiBvcHRpb25zLnN0YXJ0ICYmIG9wdGlvbnMuc3RhcnQueSA/IG9wdGlvbnMuc3RhcnQueSA6IDA7XHJcbiAgICBjb25zdCB4MiA9IG9wdGlvbnMgJiYgb3B0aW9ucy5lbmQgJiYgb3B0aW9ucy5lbmQueCA/IG9wdGlvbnMuZW5kLnggOiAwO1xyXG4gICAgY29uc3QgeTIgPSBvcHRpb25zICYmIG9wdGlvbnMuZW5kICYmIG9wdGlvbnMuZW5kLnkgPyBvcHRpb25zLmVuZC55IDogMDtcclxuICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xyXG5cclxuICAgIC8vIFBhdGgsIGEgYmV6aWVyIHF1YWRyYXRpYyBjdXJ2ZVxyXG4gICAgY29uc3QgcGF0aENvb3JkcyA9IHtcclxuICAgICAgTToge1xyXG4gICAgICAgIHg6IHgxLCAvLyBzdGFydCB4XHJcbiAgICAgICAgeTogeTEsIC8vIHN0YXJ0IHlcclxuICAgICAgfSxcclxuICAgICAgUToge1xyXG4gICAgICAgIHgxOiAoeDEgKyB4MikgLyAyLCAvLyBjb250cm9sIHhcclxuICAgICAgICB5MTogKHkxICsgeTIpIC8gMiwgLy8gY29udHJvbCB5XHJcbiAgICAgICAgeDIsIC8vIGVuZCB4XHJcbiAgICAgICAgeTIsIC8vIGVuZCB5XHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgY29uc3QgcGF0aE9wdHMgPSB0aGlzLmRlZmF1bHRQYXRoT3B0aW9ucyA9IHtcclxuICAgICAgZmlsbDogJycsXHJcbiAgICAgIHN0cm9rZTogKG9wdGlvbnMuY3VzdG9tICYmIG9wdGlvbnMuY3VzdG9tLnBhdGggJiYgb3B0aW9ucy5jdXN0b20ucGF0aC5zdHJva2VXaWR0aCkgPyBvcHRpb25zLmN1c3RvbS5wYXRoLnN0cm9rZSA6ICcjMDAwJyxcclxuICAgICAgc3Ryb2tlV2lkdGg6IChvcHRpb25zLmN1c3RvbSAmJiBvcHRpb25zLmN1c3RvbS5wYXRoICYmIG9wdGlvbnMuY3VzdG9tLnBhdGguc3Ryb2tlV2lkdGgpID8gb3B0aW9ucy5jdXN0b20ucGF0aC5zdHJva2VXaWR0aCA6IDIsXHJcbiAgICAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgICBoYXNCb3JkZXJzOiB0cnVlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAgIHBlclBpeGVsVGFyZ2V0RmluZDogdHJ1ZSxcclxuICAgIH07XHJcbiAgICBjb25zdCBwYXRoU3RyID0gYE0gJHtwYXRoQ29vcmRzLk0ueH0gJHtwYXRoQ29vcmRzLk0ueX0gUSAke3BhdGhDb29yZHMuUS54MX0sICR7cGF0aENvb3Jkcy5RLnkxfSwgJHtwYXRoQ29vcmRzLlEueDJ9LCAke3BhdGhDb29yZHMuUS55Mn1gO1xyXG4gICAgY29uc3QgcGF0aCA9IG5ldyBmYWJyaWMuUGF0aChwYXRoU3RyLCBwYXRoT3B0cyk7XHJcbiAgICB0aGlzLnBhdGggPSBwYXRoO1xyXG5cclxuICAgIC8vIENvbnRyb2wgcG9pbnQgYW5kIGxpbmVzIGZvciB0aGUgcXVhZHJhdGljIGN1cnZlXHJcbiAgICBjb25zdCBjb250cm9sUG9pbnQgPSB0aGlzLmNvbnRyb2xQb2ludCA9IG5ldyBmYWJyaWMuQ2lyY2xlKHtcclxuICAgICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAgIGxlZnQ6IHBhdGhDb29yZHMuUS54MSxcclxuICAgICAgdG9wOiBwYXRoQ29vcmRzLlEueTEsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICByYWRpdXM6IDYsXHJcbiAgICAgIGZpbGw6ICcjNzhiZWZhJyxcclxuICAgICAgc3Ryb2tlOiAnIzc4YmVmYScsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgICAgb3BhY2l0eTogMCxcclxuICAgIH0pO1xyXG4gICAgY29udHJvbFBvaW50Lm9uKCdtb3VzZW92ZXInLCB0aGlzLm9uTGlua01vdXNlT3Zlci5iaW5kKHRoaXMpKTtcclxuICAgIGNvbnRyb2xQb2ludC5vbignbW91c2VvdXQnLCB0aGlzLm9uTGlua01vdXNlT3V0LmJpbmQodGhpcykpO1xyXG4gICAgY29udHJvbFBvaW50Lm9uKCdtb3ZpbmcnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aCgnY29udHJvbCcsIHRoaXMuY29udHJvbFBvaW50LmxlZnQsIHRoaXMuY29udHJvbFBvaW50LnRvcCwgZmFsc2UpO1xyXG4gICAgfSk7XHJcbiAgICBjb250cm9sUG9pbnQub24oJ21vdmVkJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhdGgoJ2NvbnRyb2wnLCB0aGlzLmNvbnRyb2xQb2ludC5sZWZ0LCB0aGlzLmNvbnRyb2xQb2ludC50b3AsIHRydWUpO1xyXG4gICAgfSk7XHJcbiAgICBjb250cm9sUG9pbnQub24oJ21vdXNlZG93bicsICgpID0+IHtcclxuICAgICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcclxuICAgIH0pO1xyXG4gICAgY29uc3QgY29udHJvbExpbmVPcHRzID0ge1xyXG4gICAgICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgICAgc3Ryb2tlRGFzaEFycmF5OiBbNSwgNV0sXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICBzdHJva2U6ICcjNzhiZWZhJyxcclxuICAgICAgc2VsZWN0YWJsZTogZmFsc2UsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAgIGV2ZW50ZWQ6IGZhbHNlLFxyXG4gICAgICBvcGFjaXR5OiAwLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGNvbnRyb2xMaW5lMSA9IHRoaXMuY29udHJvbExpbmUxID0gbmV3IGZhYnJpYy5MaW5lKFtjb250cm9sUG9pbnQubGVmdCwgY29udHJvbFBvaW50LnRvcCwgeDEsIHkxXSwgY29udHJvbExpbmVPcHRzKTtcclxuICAgIGNvbnRyb2xMaW5lMS5vbignbW91c2VvdmVyJywgdGhpcy5vbkxpbmtNb3VzZU92ZXIuYmluZCh0aGlzKSk7XHJcbiAgICBjb250cm9sTGluZTEub24oJ21vdXNlb3V0JywgdGhpcy5vbkxpbmtNb3VzZU91dC5iaW5kKHRoaXMpKTtcclxuICAgIGNvbnN0IGNvbnRyb2xMaW5lMiA9IHRoaXMuY29udHJvbExpbmUyID0gbmV3IGZhYnJpYy5MaW5lKFtjb250cm9sUG9pbnQubGVmdCwgY29udHJvbFBvaW50LnRvcCwgeDIsIHkyXSwgY29udHJvbExpbmVPcHRzKTtcclxuICAgIGNvbnRyb2xMaW5lMi5vbignbW91c2VvdmVyJywgdGhpcy5vbkxpbmtNb3VzZU92ZXIuYmluZCh0aGlzKSk7XHJcbiAgICBjb250cm9sTGluZTIub24oJ21vdXNlb3V0JywgdGhpcy5vbkxpbmtNb3VzZU91dC5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAvLyBFbmQgcG9pbnQgKGFycm93SGVhZClcclxuICAgIGNvbnN0IGlzVmFsaWRNYXNrT3B0cyA9IHtcclxuICAgICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAgIGxlZnQ6IHBhdGhDb29yZHMuUS54MixcclxuICAgICAgdG9wOiBwYXRoQ29vcmRzLlEueTIsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICByYWRpdXM6IDE2LFxyXG4gICAgICBmaWxsOiAnIzU3Yjg1NycsIC8vIGVhNGYzN1xyXG4gICAgICBzdHJva2U6ICcjNTdiODU3JyxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICBoYXNCb3JkZXJzOiBmYWxzZSxcclxuICAgICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgICBzZWxlY3RhYmxlOiBmYWxzZSxcclxuICAgICAgb3BhY2l0eTogMCxcclxuICAgIH07XHJcbiAgICBjb25zdCBhcnJvd0hlYWRPcHRzID0ge1xyXG4gICAgICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgICAgd2lkdGg6IDEwLFxyXG4gICAgICBoZWlnaHQ6IDEwLFxyXG4gICAgICBsZWZ0OiBwYXRoQ29vcmRzLlEueDIsXHJcbiAgICAgIHRvcDogcGF0aENvb3Jkcy5RLnkyLFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgZmlsbDogJyMwMDAnLFxyXG4gICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICBzdHJva2U6ICcjMDAwJyxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgICBoYXNCb3JkZXJzOiBmYWxzZSxcclxuICAgICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGFycm93SGVhZCA9IHRoaXMuYXJyb3dIZWFkID0gbmV3IGZhYnJpYy5UcmlhbmdsZShhcnJvd0hlYWRPcHRzKTtcclxuICAgIHRoaXMuaXNWYWxpZEhlYWRDb25uZWN0aW9uTWFzayA9IG5ldyBmYWJyaWMuQ2lyY2xlKGlzVmFsaWRNYXNrT3B0cyk7XHJcbiAgICBhcnJvd0hlYWQub24oJ21vdmluZycsICgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVQYXRoKCdlbmQnLCBhcnJvd0hlYWQubGVmdCwgYXJyb3dIZWFkLnRvcCwgZmFsc2UpO1xyXG4gICAgICB0aGlzLl9jaGVja0V4dHJlbWl0eUNhbkJlQ29ubmVjdGVkKCdlbmQnKTtcclxuICAgIH0pO1xyXG4gICAgYXJyb3dIZWFkLm9uKCdtb3ZlZCcsICgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVQYXRoKCdlbmQnLCBhcnJvd0hlYWQubGVmdCwgYXJyb3dIZWFkLnRvcCwgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuaXNWYWxpZEhlYWRDb25uZWN0aW9uTWFzay5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgICAgdGhpcy5fY29ubmVjdERpc2Nvbm5lY3RFeHRyZW1pdHkoJ2VuZCcpO1xyXG4gICAgfSk7XHJcbiAgICBhcnJvd0hlYWQub24oJ21vdXNlZG93bicsICgpID0+IHtcclxuICAgICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcclxuICAgICAgdGhpcy50b2dnbGVBbGxBbmNob3JzT3BhY2l0eSgxKTtcclxuXHJcbiAgICAgIGFycm93SGVhZC5vbignbW91c2V1cCcsICgpID0+IHtcclxuICAgICAgICB0aGlzLnRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KDApO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFN0YXJ0IHBvaW50IChhcnJvd1RhaWwpXHJcbiAgICBjb25zdCBhcnJvd1RhaWxPcHRzID0ge1xyXG4gICAgICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgICAgd2lkdGg6IDEwLFxyXG4gICAgICBoZWlnaHQ6IDEwLFxyXG4gICAgICBsZWZ0OiBwYXRoQ29vcmRzLk0ueCxcclxuICAgICAgdG9wOiBwYXRoQ29vcmRzLk0ueSxcclxuICAgICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAgIGZpbGw6ICcjZmZmJyxcclxuICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgc3Ryb2tlOiAnIzAwMCcsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgIH07XHJcbiAgICBjb25zdCBhcnJvd1RhaWwgPSB0aGlzLmFycm93VGFpbCA9IG5ldyBmYWJyaWMuUmVjdChhcnJvd1RhaWxPcHRzKTtcclxuICAgIHRoaXMuaXNWYWxpZFRhaWxDb25uZWN0aW9uTWFzayA9IG5ldyBmYWJyaWMuQ2lyY2xlKGlzVmFsaWRNYXNrT3B0cyk7XHJcbiAgICBhcnJvd1RhaWwub24oJ21vdmluZycsICgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVQYXRoKCdzdGFydCcsIGFycm93VGFpbC5sZWZ0LCBhcnJvd1RhaWwudG9wLCBmYWxzZSk7XHJcbiAgICAgIHRoaXMuX2NoZWNrRXh0cmVtaXR5Q2FuQmVDb25uZWN0ZWQoJ3N0YXJ0Jyk7XHJcbiAgICB9KTtcclxuICAgIGFycm93VGFpbC5vbignbW92ZWQnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aCgnc3RhcnQnLCBhcnJvd1RhaWwubGVmdCwgYXJyb3dUYWlsLnRvcCwgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuaXNWYWxpZFRhaWxDb25uZWN0aW9uTWFzay5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgICAgdGhpcy5fY29ubmVjdERpc2Nvbm5lY3RFeHRyZW1pdHkoJ3N0YXJ0Jyk7XHJcbiAgICB9KTtcclxuICAgIGFycm93VGFpbC5vbignbW91c2Vkb3duJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLmJyaW5nVG9Gcm9udCgpO1xyXG4gICAgICB0aGlzLnRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KDEpO1xyXG5cclxuICAgICAgYXJyb3dUYWlsLm9uKCdtb3VzZXVwJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudG9nZ2xlQWxsQW5jaG9yc09wYWNpdHkoMCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbmplY3QoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgcGF0aCxcclxuICAgICAgY29udHJvbFBvaW50LFxyXG4gICAgICBjb250cm9sTGluZTEsXHJcbiAgICAgIGNvbnRyb2xMaW5lMixcclxuICAgICAgYXJyb3dIZWFkLFxyXG4gICAgICBhcnJvd1RhaWwsXHJcbiAgICAgIGlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2ssXHJcbiAgICAgIGlzVmFsaWRIZWFkQ29ubmVjdGlvbk1hc2ssXHJcbiAgICB9ID0gdGhpcztcclxuICAgIGNhbnZhcy5hZGQoY29udHJvbFBvaW50KTtcclxuICAgIGNhbnZhcy5hZGQoY29udHJvbExpbmUxKTtcclxuICAgIGNhbnZhcy5hZGQoY29udHJvbExpbmUyKTtcclxuICAgIGNhbnZhcy5hZGQoaXNWYWxpZFRhaWxDb25uZWN0aW9uTWFzayk7XHJcbiAgICBjYW52YXMuYWRkKGlzVmFsaWRIZWFkQ29ubmVjdGlvbk1hc2spO1xyXG4gICAgY2FudmFzLmFkZChhcnJvd0hlYWQpO1xyXG4gICAgY2FudmFzLmFkZChhcnJvd1RhaWwpO1xyXG5cclxuICAgIGNhbnZhcy5hZGQocGF0aCk7XHJcbiAgICB0aGlzLnVwZGF0ZVBhdGgoJ3N0YXJ0JywgcGF0aC5wYXRoWzBdWzFdLCBwYXRoLnBhdGhbMF1bMl0sIHRydWUpO1xyXG4gICAgdGhpcy51cGRhdGVQYXRoKCdlbmQnLCBwYXRoLnBhdGhbMV1bM10sIHBhdGgucGF0aFsxXVs0XSwgdHJ1ZSk7XHJcbiAgICB0aGlzLnVwZGF0ZVBhdGgoJ2NvbnRyb2wnLCBwYXRoLnBhdGhbMV1bMV0sIHBhdGgucGF0aFsxXVsyXSwgdHJ1ZSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBjb25uZWN0TGluayhsaW5rUG9pbnQsIHNoYXBlSWQsIGNhcmRpbmFsKSB7XHJcbiAgICAvLyBDaGVjayBub3QgYWxyZWFkeSBjb25uZWN0ZWRcclxuICAgIGlmICghdGhpcy5pc1ZhbGlkQ29ubmVjdGlvbihsaW5rUG9pbnQsIHNoYXBlSWQsIGNhcmRpbmFsKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBzaGFwZSA9IHRoaXMuY2FudmFzLmdldE9iamVjdHMoKVxyXG4gICAgICAuZmluZCgobykgPT4gby5pZCA9PT0gc2hhcGVJZCk7XHJcblxyXG4gICAgLy8gRGlzY29ubmVjdCBleGlzdGluZyBvYmplY3RcclxuICAgIHRoaXMuZGlzY29ubmVjdExpbmsobGlua1BvaW50KTtcclxuXHJcbiAgICAvLyBDb25uZWN0XHJcbiAgICB0aGlzW2xpbmtQb2ludF0gPSB7XHJcbiAgICAgIHNoYXBlLFxyXG4gICAgICBhbmNob3I6IGNhcmRpbmFsLFxyXG4gICAgICBoYW5kbGVyczoge1xyXG4gICAgICAgIG9uQW5jaG9yUG9zaXRpb25Nb2RpZnlpbmc6ICgpID0+IHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlUGF0aChsaW5rUG9pbnQsIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLmxlZnQsIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLnRvcCwgZmFsc2UpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25BbmNob3JQb3NpdGlvbk1vZGlmaWVkOiAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZVBhdGgobGlua1BvaW50LCBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5sZWZ0LCBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS50b3AsIHRydWUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ub3BhY2l0eSA9IDA7XHJcbiAgICBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5vbigncGc6cG9zaXRpb246bW9kaWZ5aW5nJywgdGhpc1tsaW5rUG9pbnRdLmhhbmRsZXJzLm9uQW5jaG9yUG9zaXRpb25Nb2RpZnlpbmcpO1xyXG4gICAgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ub24oJ3BnOnBvc2l0aW9uOm1vZGlmaWVkJywgdGhpc1tsaW5rUG9pbnRdLmhhbmRsZXJzLm9uQW5jaG9yUG9zaXRpb25Nb2RpZmllZCk7XHJcblxyXG4gICAgLy8gVXBkYXRlIExpbmtcclxuICAgIHRoaXMudXBkYXRlUGF0aChsaW5rUG9pbnQsIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLmxlZnQsIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLnRvcCwgdHJ1ZSwgZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgZGlzY29ubmVjdExpbmsobGlua1BvaW50KSB7XHJcbiAgICBpZiAodGhpc1tsaW5rUG9pbnRdKSB7XHJcbiAgICAgIHRoaXNbbGlua1BvaW50XS5zaGFwZS5hbmNob3JzW3RoaXNbbGlua1BvaW50XS5hbmNob3JdLm9mZigncGc6cG9zaXRpb246bW9kaWZ5aW5nJywgdGhpc1tsaW5rUG9pbnRdLmhhbmRsZXJzLm9uQW5jaG9yUG9zaXRpb25Nb2RpZnlpbmcpO1xyXG4gICAgICB0aGlzW2xpbmtQb2ludF0uc2hhcGUuYW5jaG9yc1t0aGlzW2xpbmtQb2ludF0uYW5jaG9yXS5vZmYoJ3BnOnBvc2l0aW9uOm1vZGlmaWVkJywgdGhpc1tsaW5rUG9pbnRdLmhhbmRsZXJzLm9uQW5jaG9yUG9zaXRpb25Nb2RpZmllZCk7XHJcbiAgICAgIGRlbGV0ZSB0aGlzW2xpbmtQb2ludF07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXNldEN1cnZhdHVyZSgpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgY29udHJvbFBvaW50LFxyXG4gICAgICBwYXRoLFxyXG4gICAgfSA9IHRoaXM7XHJcbiAgICBjb250cm9sUG9pbnQubGVmdCA9IChwYXRoLnBhdGhbMF1bMV0gKyBwYXRoLnBhdGhbMV1bM10pIC8gMjtcclxuICAgIGNvbnRyb2xQb2ludC50b3AgPSAocGF0aC5wYXRoWzBdWzJdICsgcGF0aC5wYXRoWzFdWzRdKSAvIDI7XHJcbiAgICBjb250cm9sUG9pbnQuc2V0Q29vcmRzKCk7XHJcbiAgICBjb250cm9sUG9pbnQuZmlyZSgnbW92ZWQnKTtcclxuICB9XHJcblxyXG4gIGJyaW5nVG9Gcm9udCgpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgY2FudmFzLFxyXG4gICAgICBwYXRoLFxyXG4gICAgICBjb250cm9sUG9pbnQsXHJcbiAgICAgIGFycm93SGVhZCxcclxuICAgICAgYXJyb3dUYWlsLFxyXG4gICAgfSA9IHRoaXM7XHJcbiAgICBjYW52YXMuYnJpbmdUb0Zyb250KHBhdGgpO1xyXG4gICAgY2FudmFzLmJyaW5nVG9Gcm9udChjb250cm9sUG9pbnQpO1xyXG4gICAgY2FudmFzLmJyaW5nVG9Gcm9udChhcnJvd0hlYWQpO1xyXG4gICAgY2FudmFzLmJyaW5nVG9Gcm9udChhcnJvd1RhaWwpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlUGF0aChsaW5rUG9pbnQsIHgsIHksIGNvbW1pdCwgcmVzZXRDdXJ2KSB7XHJcbiAgICBjb25zdCBwYXRoID0ge1xyXG4gICAgICBNOiB7XHJcbiAgICAgICAgeDogbGlua1BvaW50ID09PSAnc3RhcnQnID8geCA6IHRoaXMucGF0aC5wYXRoWzBdWzFdLFxyXG4gICAgICAgIHk6IGxpbmtQb2ludCA9PT0gJ3N0YXJ0JyA/IHkgOiB0aGlzLnBhdGgucGF0aFswXVsyXSxcclxuICAgICAgfSxcclxuICAgICAgUToge1xyXG4gICAgICAgIHgxOiBsaW5rUG9pbnQgPT09ICdjb250cm9sJyA/IHggOiB0aGlzLnBhdGgucGF0aFsxXVsxXSxcclxuICAgICAgICB5MTogbGlua1BvaW50ID09PSAnY29udHJvbCcgPyB5IDogdGhpcy5wYXRoLnBhdGhbMV1bMl0sXHJcbiAgICAgICAgeDI6IGxpbmtQb2ludCA9PT0gJ2VuZCcgPyB4IDogdGhpcy5wYXRoLnBhdGhbMV1bM10sXHJcbiAgICAgICAgeTI6IGxpbmtQb2ludCA9PT0gJ2VuZCcgPyB5IDogdGhpcy5wYXRoLnBhdGhbMV1bNF0sXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgaWYgKGNvbW1pdCkge1xyXG4gICAgICBjb25zdCBwYXRoU3RyID0gYE0gJHtwYXRoLk0ueH0gJHtwYXRoLk0ueX0gUSAke3BhdGguUS54MX0sICR7cGF0aC5RLnkxfSwgJHtwYXRoLlEueDJ9LCAke3BhdGguUS55Mn1gO1xyXG4gICAgICBjb25zdCBuZXdQYXRoID0gbmV3IGZhYnJpYy5QYXRoKHBhdGhTdHIsIHRoaXMuZGVmYXVsdFBhdGhPcHRpb25zKTtcclxuICAgICAgdGhpcy5jYW52YXMucmVtb3ZlKHRoaXMucGF0aCk7XHJcbiAgICAgIHRoaXMuY2FudmFzLmFkZChuZXdQYXRoKTtcclxuXHJcbiAgICAgIG5ld1BhdGgub24oJ21vdXNlb3ZlcicsIHRoaXMub25MaW5rTW91c2VPdmVyLmJpbmQodGhpcykpO1xyXG4gICAgICBuZXdQYXRoLm9uKCdtb3VzZW91dCcsIHRoaXMub25MaW5rTW91c2VPdXQuYmluZCh0aGlzKSk7XHJcbiAgICAgIG5ld1BhdGgub24oJ21vdXNlZG93bicsIHRoaXMuYnJpbmdUb0Zyb250LmJpbmQodGhpcykpO1xyXG4gICAgICBuZXdQYXRoLm9uKCdtb3ZpbmcnLCB0aGlzLm9uTGlua01vdmluZy5iaW5kKHRoaXMpKTtcclxuICAgICAgbmV3UGF0aC5vbignbW92ZWQnLCB0aGlzLm9uTGlua01vdmVkLmJpbmQodGhpcykpO1xyXG4gICAgICBjb25zdCB0b0JpbmQgPSBbXHJcbiAgICAgICAgdGhpcy5hcnJvd0hlYWQsXHJcbiAgICAgICAgdGhpcy5hcnJvd1RhaWwsXHJcbiAgICAgICAgdGhpcy5jb250cm9sUG9pbnQsXHJcbiAgICAgICAgdGhpcy5jb250cm9sTGluZTEsXHJcbiAgICAgICAgdGhpcy5jb250cm9sTGluZTIsXHJcbiAgICAgIF07XHJcbiAgICAgIGNvbnN0IGJvc3NUcmFuc2Zvcm0gPSBuZXdQYXRoLmNhbGNUcmFuc2Zvcm1NYXRyaXgoKTtcclxuICAgICAgY29uc3QgaW52ZXJ0ZWRCb3NzVHJhbnNmb3JtID0gZmFicmljLnV0aWwuaW52ZXJ0VHJhbnNmb3JtKGJvc3NUcmFuc2Zvcm0pO1xyXG4gICAgICB0b0JpbmQuZm9yRWFjaCgobykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRlc2lyZWRUcmFuc2Zvcm0gPSBmYWJyaWMudXRpbC5tdWx0aXBseVRyYW5zZm9ybU1hdHJpY2VzKFxyXG4gICAgICAgICAgaW52ZXJ0ZWRCb3NzVHJhbnNmb3JtLFxyXG4gICAgICAgICAgby5jYWxjVHJhbnNmb3JtTWF0cml4KCksXHJcbiAgICAgICAgKTtcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cclxuICAgICAgICBvLnJlbGF0aW9uc2hpcCA9IGRlc2lyZWRUcmFuc2Zvcm07XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5wYXRoID0gbmV3UGF0aDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGF0aC5zZXQoJ3BhdGgnLCBbXHJcbiAgICAgICAgWydNJywgcGF0aC5NLngsIHBhdGguTS55XSxcclxuICAgICAgICBbJ1EnLCBwYXRoLlEueDEsIHBhdGguUS55MSwgcGF0aC5RLngyLCBwYXRoLlEueTJdLFxyXG4gICAgICBdKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBVcGRhdGUgY29udHJvbCBsaW5lcywgYXJyb3cgaGVhZHMgYW5kIHRhaWxzXHJcbiAgICB0aGlzLmNvbnRyb2xMaW5lMS5zZXQoe1xyXG4gICAgICB4MTogdGhpcy5jb250cm9sUG9pbnQubGVmdCxcclxuICAgICAgeTE6IHRoaXMuY29udHJvbFBvaW50LnRvcCxcclxuICAgICAgeDI6IHRoaXMucGF0aC5wYXRoWzBdWzFdLFxyXG4gICAgICB5MjogdGhpcy5wYXRoLnBhdGhbMF1bMl0sXHJcbiAgICB9KTtcclxuICAgIHRoaXMuY29udHJvbExpbmUyLnNldCh7XHJcbiAgICAgIHgxOiB0aGlzLmNvbnRyb2xQb2ludC5sZWZ0LFxyXG4gICAgICB5MTogdGhpcy5jb250cm9sUG9pbnQudG9wLFxyXG4gICAgICB4MjogdGhpcy5wYXRoLnBhdGhbMV1bM10sXHJcbiAgICAgIHkyOiB0aGlzLnBhdGgucGF0aFsxXVs0XSxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgYXJyb3dIZWFkQW5nbGUgPSAoTWF0aC5hdGFuMih0aGlzLnBhdGgucGF0aFsxXVs0XSAtIHRoaXMucGF0aC5wYXRoWzFdWzJdLCB0aGlzLnBhdGgucGF0aFsxXVszXSAtIHRoaXMucGF0aC5wYXRoWzFdWzFdKSAqIDE4MCkgLyBNYXRoLlBJO1xyXG4gICAgdGhpcy5hcnJvd0hlYWQuYW5nbGUgPSBhcnJvd0hlYWRBbmdsZSArIDkwO1xyXG4gICAgdGhpcy5hcnJvd0hlYWQubGVmdCA9IHRoaXMucGF0aC5wYXRoWzFdWzNdO1xyXG4gICAgdGhpcy5hcnJvd0hlYWQudG9wID0gdGhpcy5wYXRoLnBhdGhbMV1bNF07XHJcbiAgICB0aGlzLmFycm93SGVhZC5zZXRDb29yZHMoKTtcclxuICAgIHRoaXMuYXJyb3dUYWlsLmxlZnQgPSB0aGlzLnBhdGgucGF0aFswXVsxXTtcclxuICAgIHRoaXMuYXJyb3dUYWlsLnRvcCA9IHRoaXMucGF0aC5wYXRoWzBdWzJdO1xyXG4gICAgdGhpcy5hcnJvd1RhaWwuc2V0Q29vcmRzKCk7XHJcblxyXG4gICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcclxuXHJcbiAgICAvLyBSZXNldCBjb250cm9sIHBvaW50XHJcbiAgICBpZiAocmVzZXRDdXJ2KSB7XHJcbiAgICAgIHRoaXMucmVzZXRDdXJ2YXR1cmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzVmFsaWRDb25uZWN0aW9uKGxpbmtQb2ludCwgc2hhcGVJZCwgY2FyZGluYWwpIHtcclxuICAgIGNvbnN0IHNoYXBlID0gdGhpcy5jYW52YXMuZ2V0T2JqZWN0cygpXHJcbiAgICAgIC5maW5kKChvKSA9PiBvLmlkID09PSBzaGFwZUlkKTtcclxuICAgIC8vIENoZWNrIG5vdCBhbHJlYWR5IGNvbm5lY3RlZFxyXG4gICAgaWYgKGxpbmtQb2ludCA9PT0gJ3N0YXJ0Jykge1xyXG4gICAgICBpZiAodGhpcy5zdGFydCAmJiB0aGlzLnN0YXJ0LnNoYXBlICYmIHRoaXMuc3RhcnQuc2hhcGUuaWQgPT09IHNoYXBlLmlkICYmIHRoaXMuc3RhcnQuY2FyZGluYWwgPT09IGNhcmRpbmFsKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyB0cnlpbmcgZW5kIHNldCB0aGUgc2FtZSBhbHJlYWR5IGNvbm5lY3RlZCBhbmNob3JcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5lbmQgJiYgdGhpcy5lbmQuc2hhcGUgJiYgdGhpcy5lbmQuc2hhcGUuaWQgPT09IHNoYXBlLmlkKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyB0cnlpbmcgZW5kIHNob3J0IGNpcmN1aXQgdGhlIHJlY3RhbmdsZVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGxpbmtQb2ludCA9PT0gJ2VuZCcpIHtcclxuICAgICAgaWYgKHRoaXMuZW5kICYmIHRoaXMuZW5kLnNoYXBlICYmIHRoaXMuZW5kLnNoYXBlLmlkID09PSBzaGFwZS5pZCAmJiB0aGlzLmVuZC5jYXJkaW5hbCA9PT0gY2FyZGluYWwpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIHRyeWluZyBlbmQgc2V0IHRoZSBzYW1lIGFscmVhZHkgY29ubmVjdGVkIGFuY2hvclxyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLnN0YXJ0ICYmIHRoaXMuc3RhcnQuc2hhcGUgJiYgdGhpcy5zdGFydC5zaGFwZS5pZCA9PT0gc2hhcGUuaWQpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIHRyeWluZyBlbmQgc2hvcnQgY2lyY3VpdCB0aGUgcmVjdGFuZ2xlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlQWxsQW5jaG9yc09wYWNpdHkob3BhY2l0eSkge1xyXG4gICAgY29uc3QgYW5jaG9ycyA9IHRoaXMuY2FudmFzLmdldE9iamVjdHMoKVxyXG4gICAgICAuZmlsdGVyKChvKSA9PiBvLnR5cGUgPT09ICdhbmNob3InKTtcclxuXHJcbiAgICAvLyBjb25zdCBwcm9taXNlcyA9IFtdO1xyXG4gICAgLy8gY29uc3QgcHJvbWlzZUZhY3RvcnkgPSBmdW5jdGlvbiAoYW5jaG9yKSB7XHJcbiAgICAvLyAgIHJldHVybiBmdW5jdGlvbiAocmVzb2x2ZSkge1xyXG4gICAgLy8gICAgIGFuY2hvci5hbmltYXRlKCdvcGFjaXR5Jywgb3BhY2l0eSwge1xyXG4gICAgLy8gICAgICAgZHVyYXRpb246IDMwMCxcclxuICAgIC8vICAgICAgIG9uQ2hhbmdlOiByZXNvbHZlLFxyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gICB9O1xyXG4gICAgLy8gfTtcclxuICAgIC8vIGZvciAobGV0IGEgPSAwOyBhIDwgYW5jaG9ycy5sZW5ndGg7IGEgKz0gMSkge1xyXG4gICAgLy8gICBpZiAobG9jayAhPT0gdW5kZWZpbmVkKSBhbmNob3JzW2FdLmxvY2tPcGFjaXR5ID0gbG9jaztcclxuICAgIC8vICAgcHJvbWlzZXMucHVzaChuZXcgUHJvbWlzZShwcm9taXNlRmFjdG9yeShhbmNob3JzW2FdKSkpO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCkgPT4ge1xyXG4gICAgLy8gICB0aGlzLmNhbnZhcy5yZW5kZXJBbGwoKTtcclxuICAgIC8vIH0pO1xyXG5cclxuICAgIGZvciAobGV0IGEgPSAwOyBhIDwgYW5jaG9ycy5sZW5ndGg7IGEgKz0gMSkge1xyXG4gICAgICAvLyBpZiAobG9jayAhPT0gdW5kZWZpbmVkKSBhbmNob3JzW2FdLmxvY2tPcGFjaXR5ID0gbG9jaztcclxuICAgICAgYW5jaG9yc1thXS5zZXQoJ29wYWNpdHknLCBvcGFjaXR5KTtcclxuICAgIH1cclxuICAgIHRoaXMuY2FudmFzLnJlbmRlckFsbCgpO1xyXG4gIH1cclxuXHJcbiAgb25MaW5rTW91c2VPdmVyKCkge1xyXG4gICAgdGhpcy5jb250cm9sUG9pbnQudG9nZ2xlT3BhY2l0eSgxKTtcclxuICAgIHRoaXMuY29udHJvbExpbmUxLnRvZ2dsZU9wYWNpdHkoMSk7XHJcbiAgICB0aGlzLmNvbnRyb2xMaW5lMi50b2dnbGVPcGFjaXR5KDEpO1xyXG4gIH1cclxuXHJcbiAgb25MaW5rTW91c2VPdXQoKSB7XHJcbiAgICB0aGlzLmNvbnRyb2xQb2ludC50b2dnbGVPcGFjaXR5KDApO1xyXG4gICAgdGhpcy5jb250cm9sTGluZTEudG9nZ2xlT3BhY2l0eSgwKTtcclxuICAgIHRoaXMuY29udHJvbExpbmUyLnRvZ2dsZU9wYWNpdHkoMCk7XHJcbiAgfVxyXG5cclxuICBvbkxpbmtNb3ZpbmcoKSB7XHJcbiAgICAvLyBNb3ZlIHN0YXJ0LCBlbmQsIGNvbnRyb2wgcG9pbnRzIGFsdG9nZXRoZXIgd2l0aCB0aGUgUGF0aFxyXG4gICAgY29uc3QgdG9VcGRhdGUgPSBbXHJcbiAgICAgIHRoaXMuYXJyb3dIZWFkLFxyXG4gICAgICB0aGlzLmFycm93VGFpbCxcclxuICAgICAgdGhpcy5jb250cm9sUG9pbnQsXHJcbiAgICAgIHRoaXMuY29udHJvbExpbmUxLFxyXG4gICAgICB0aGlzLmNvbnRyb2xMaW5lMixcclxuICAgIF07XHJcbiAgICB0b1VwZGF0ZS5mb3JFYWNoKChvKSA9PiB7XHJcbiAgICAgIGlmICghby5yZWxhdGlvbnNoaXApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgeyByZWxhdGlvbnNoaXAgfSA9IG87XHJcbiAgICAgIGNvbnN0IG5ld1RyYW5zZm9ybSA9IGZhYnJpYy51dGlsLm11bHRpcGx5VHJhbnNmb3JtTWF0cmljZXMoXHJcbiAgICAgICAgdGhpcy5wYXRoLmNhbGNUcmFuc2Zvcm1NYXRyaXgoKSxcclxuICAgICAgICByZWxhdGlvbnNoaXAsXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IG9wdCA9IGZhYnJpYy51dGlsLnFyRGVjb21wb3NlKG5ld1RyYW5zZm9ybSk7XHJcbiAgICAgIG8uc2V0KHtcclxuICAgICAgICBmbGlwWDogZmFsc2UsXHJcbiAgICAgICAgZmxpcFk6IGZhbHNlLFxyXG4gICAgICB9KTtcclxuICAgICAgby5zZXRQb3NpdGlvbkJ5T3JpZ2luKFxyXG4gICAgICAgIHsgeDogb3B0LnRyYW5zbGF0ZVgsIHk6IG9wdC50cmFuc2xhdGVZIH0sXHJcbiAgICAgICAgJ2NlbnRlcicsXHJcbiAgICAgICAgJ2NlbnRlcicsXHJcbiAgICAgICk7XHJcbiAgICAgIG8uc2V0KG9wdCk7XHJcbiAgICAgIG8uc2V0Q29vcmRzKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBGaW5hbGx5LCBjaGVjayB0aGUgc3RhcnQgb3IgZW5kIHBvaW50cyBjYW4gYmUgY29ubmVjdGVkLlxyXG4gICAgdGhpcy5fY2hlY2tFeHRyZW1pdHlDYW5CZUNvbm5lY3RlZCgnc3RhcnQnKTtcclxuICAgIHRoaXMuX2NoZWNrRXh0cmVtaXR5Q2FuQmVDb25uZWN0ZWQoJ2VuZCcpO1xyXG4gIH1cclxuXHJcbiAgb25MaW5rTW92ZWQoKSB7XHJcbiAgICAvLyBSZXVwZGF0ZSB0aGUgUGF0aCBhY2NvcmRpbmcgZW5kIHRoZSBuZXcgY29vcmRpbmF0ZXMgb2YgYWxsIGVsZW1lbnRzXHJcbiAgICBjb25zdCBwYXRoQ29vcmRzID0ge1xyXG4gICAgICBNOiB7XHJcbiAgICAgICAgeDogdGhpcy5hcnJvd1RhaWwubGVmdCxcclxuICAgICAgICB5OiB0aGlzLmFycm93VGFpbC50b3AsXHJcbiAgICAgIH0sXHJcbiAgICAgIFE6IHtcclxuICAgICAgICB4MTogdGhpcy5jb250cm9sUG9pbnQubGVmdCxcclxuICAgICAgICB5MTogdGhpcy5jb250cm9sUG9pbnQudG9wLFxyXG4gICAgICAgIHgyOiB0aGlzLmFycm93SGVhZC5sZWZ0LFxyXG4gICAgICAgIHkyOiB0aGlzLmFycm93SGVhZC50b3AsXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgY29uc3QgcGF0aFN0ciA9IGBNICR7cGF0aENvb3Jkcy5NLnh9ICR7cGF0aENvb3Jkcy5NLnl9IFEgJHtwYXRoQ29vcmRzLlEueDF9LCAke3BhdGhDb29yZHMuUS55MX0sICR7cGF0aENvb3Jkcy5RLngyfSwgJHtwYXRoQ29vcmRzLlEueTJ9YDtcclxuICAgIGNvbnN0IGNhY2EgPSBuZXcgZmFicmljLlBhdGgocGF0aFN0ciwge30pO1xyXG4gICAgdGhpcy51cGRhdGVQYXRoKCdzdGFydCcsIGNhY2EucGF0aFswXVsxXSwgY2FjYS5wYXRoWzBdWzJdLCBmYWxzZSk7XHJcbiAgICB0aGlzLnVwZGF0ZVBhdGgoJ2VuZCcsIGNhY2EucGF0aFsxXVszXSwgY2FjYS5wYXRoWzFdWzRdLCBmYWxzZSk7XHJcbiAgICB0aGlzLnVwZGF0ZVBhdGgoJ2NvbnRyb2wnLCBjYWNhLnBhdGhbMV1bMV0sIGNhY2EucGF0aFsxXVsyXSwgdHJ1ZSk7XHJcblxyXG4gICAgLy8gQ29ubmVjdCBvciBEaXNjb25uZWN0IGRlcGVuZGluZyBvbiBleHRyZW1pdGllcyBwb3NpdGlvbnNcclxuICAgIHRoaXMuaXNWYWxpZFRhaWxDb25uZWN0aW9uTWFzay5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgIHRoaXMuaXNWYWxpZEhlYWRDb25uZWN0aW9uTWFzay5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgIHRoaXMuX2Nvbm5lY3REaXNjb25uZWN0RXh0cmVtaXR5KCdzdGFydCcpO1xyXG4gICAgdGhpcy5fY29ubmVjdERpc2Nvbm5lY3RFeHRyZW1pdHkoJ2VuZCcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGVscGVyIGVuZCBkaXNwbGF5IGEgdmFsaWQgY2lyY2xlIG1hc2sgb24gc3BlY2lmaWMgY29uZGl0aW9ucy5cclxuICAgKiBJZiB0aGUgZXh0cmVtaXR5IGlzIHRvdWNoaW5nIGFuIGFuY2hvciBvZiBhIExpbmthYmxlU2hhcGUgc3RhcnQgd2hpY2ggaXQgaXMgbm90IHlldCBjb25uZWN0ZWQgPT4gc2hvdyBHUkVFTlxyXG4gICAqIElmIHRoZSBleHRyZW1pdHkgaXMgdG91Y2hpbmcgYW4gYW5jaG9yIG9mIGEgTGlua2FibGVTaGFwZSBzdGFydCB3aGljaCBpdCBpcyBhbHJlYWR5IGNvbm5lY3RlZCBieSB0aGUgb3RoZXIgZXh0cmVtaXR5ID0+IHNob3cgUkVEXHJcbiAgICogQHBhcmFtIGRpcmVjdGlvblxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX2NoZWNrRXh0cmVtaXR5Q2FuQmVDb25uZWN0ZWQoZGlyZWN0aW9uKSB7XHJcbiAgICBjb25zdCB7IGNhbnZhcyB9ID0gdGhpcztcclxuXHJcbiAgICBsZXQgZXh0cmVtaXR5O1xyXG4gICAgbGV0IG1hc2s7XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSAnc3RhcnQnKSB7XHJcbiAgICAgIGV4dHJlbWl0eSA9IHRoaXMuYXJyb3dUYWlsO1xyXG4gICAgICBtYXNrID0gdGhpcy5pc1ZhbGlkVGFpbENvbm5lY3Rpb25NYXNrO1xyXG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdlbmQnKSB7XHJcbiAgICAgIGV4dHJlbWl0eSA9IHRoaXMuYXJyb3dIZWFkO1xyXG4gICAgICBtYXNrID0gdGhpcy5pc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrO1xyXG4gICAgfVxyXG5cclxuICAgIG1hc2subGVmdCA9IGV4dHJlbWl0eS5sZWZ0O1xyXG4gICAgbWFzay50b3AgPSBleHRyZW1pdHkudG9wO1xyXG4gICAgbWFzay5zZXRDb29yZHMoKTtcclxuICAgIG1hc2suc2V0KCdvcGFjaXR5JywgMCk7XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgaW50ZXJzZWN0cyB3aXRoIGFuY2hvclxyXG4gICAgY29uc3QgYW5jaG9ycyA9IGNhbnZhcy5nZXRPYmplY3RzKClcclxuICAgICAgLmZpbHRlcigobykgPT4gby50eXBlID09PSAnYW5jaG9yJyk7XHJcbiAgICBleHRyZW1pdHkuc2V0KCdzdHJva2UnLCAnIzAwMCcpO1xyXG4gICAgZm9yIChsZXQgYSA9IDA7IGEgPCBhbmNob3JzLmxlbmd0aDsgYSArPSAxKSB7XHJcbiAgICAgIGlmIChleHRyZW1pdHkuaW50ZXJzZWN0c1dpdGhPYmplY3QoYW5jaG9yc1thXSkpIHtcclxuICAgICAgICBtYXNrLnNldCgnb3BhY2l0eScsIDAuNSk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZENvbm5lY3Rpb24oZGlyZWN0aW9uLCBhbmNob3JzW2FdLnNoYXBlSWQsIGFuY2hvcnNbYV0uY2FyZGluYWwpKSB7XHJcbiAgICAgICAgICBtYXNrLnNldCh7XHJcbiAgICAgICAgICAgIHN0cm9rZTogJyM1N2I4NTcnLFxyXG4gICAgICAgICAgICBmaWxsOiAnIzU3Yjg1NycsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGV4dHJlbWl0eS5zZXQoJ3N0cm9rZScsICcjNWY1Jyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG1hc2suc2V0KHtcclxuICAgICAgICAgICAgc3Ryb2tlOiAnI2VhNGYzNycsXHJcbiAgICAgICAgICAgIGZpbGw6ICcjZWE0ZjM3JyxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgZXh0cmVtaXR5LnNldCgnc3Ryb2tlJywgJyNlYTRmMzcnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhlbHBlciBlbmQgZXhlY3V0ZSBjb25uZWN0L2Rpc2Nvbm5lY3QgZGVwZW5kaW5nIG9uIHNwZWNpZmljIGNvbmRpdGlvbnMuXHJcbiAgICogSWYgdGhlIGV4dHJlbWl0eSB3YXMgY29ubmVjdGVkIEFORCBpdCBpcyBOT1QgdG91Y2hpbmcgdGhlIGFuY2hvciBhbnltb3JlID0+IGRpc2Nvbm5lY3QgaXQuXHJcbiAgICogSWYgdGhlIGV4dHJlbWl0eSB3YXMgZGlzY29ubmVjdGVkIEFORCBpdCBpcyB0b3VjaGluZyB0aGUgYW5jaG9yID0+IGNvbm5lY3QgaXQuXHJcbiAgICogQHBhcmFtIGRpcmVjdGlvblxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX2Nvbm5lY3REaXNjb25uZWN0RXh0cmVtaXR5KGRpcmVjdGlvbikge1xyXG4gICAgY29uc3QgeyBjYW52YXMgfSA9IHRoaXM7XHJcblxyXG4gICAgbGV0IGV4dHJlbWl0eTtcclxuICAgIGlmIChkaXJlY3Rpb24gPT09ICdzdGFydCcpIHtcclxuICAgICAgZXh0cmVtaXR5ID0gdGhpcy5hcnJvd1RhaWw7XHJcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ2VuZCcpIHtcclxuICAgICAgZXh0cmVtaXR5ID0gdGhpcy5hcnJvd0hlYWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgaW50ZXJzZWN0cyB3aXRoIGFuY2hvclxyXG4gICAgY29uc3QgYW5jaG9ycyA9IGNhbnZhcy5nZXRPYmplY3RzKClcclxuICAgICAgLmZpbHRlcigobykgPT4gby50eXBlID09PSAnYW5jaG9yJyk7XHJcbiAgICBmb3IgKGxldCBhID0gMDsgYSA8IGFuY2hvcnMubGVuZ3RoOyBhICs9IDEpIHtcclxuICAgICAgaWYgKGV4dHJlbWl0eS5pbnRlcnNlY3RzV2l0aE9iamVjdChhbmNob3JzW2FdKSkge1xyXG4gICAgICAgIHRoaXMuY29ubmVjdExpbmsoZGlyZWN0aW9uLCBhbmNob3JzW2FdLnNoYXBlSWQsIGFuY2hvcnNbYV0uY2FyZGluYWwpO1xyXG4gICAgICAgIC8vIGFuY2hvcnNbYV0uc2V0KCdzdHJva2UnLCAnIzAwMCcpO1xyXG4gICAgICAgIGV4dHJlbWl0eS5zZXQoJ3N0cm9rZScsICcjMDAwJyk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpc1tkaXJlY3Rpb25dICYmIGFuY2hvcnNbYV0gPT09IHRoaXNbZGlyZWN0aW9uXS5zaGFwZS5hbmNob3JzW3RoaXNbZGlyZWN0aW9uXS5hbmNob3JdKSB7XHJcbiAgICAgICAgLy8gSWYgdGhpcyBsaW5rIHdhcyBjb25uZWN0ZWQgZW5kIHRoaXMgYW5jaG9yIGFuZCBpdCBkb2Vzbid0IGludGVyc2VjdCBhbnltb3JlXHJcbiAgICAgICAgdGhpcy5kaXNjb25uZWN0TGluayhkaXJlY3Rpb24pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImNvbnN0IHsgZmFicmljIH0gPSB3aW5kb3c7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW5rYWJsZVNoYXBlIHtcclxuICAvKipcclxuICAgKiBBIExpbmthYmxlU2hhcGUgaXMgYW55IEZhYnJpYy5PYmplY3Qgc2hhcGUgb24gd2hpY2ggYW5jaG9ycyBhcmUgYXBwZW5kZWQgc28gdGhhdCBtdWx0aXBsZSBMaW5rIGNhbiBiZSBjb25uZWN0ZWQgdG8gaXQuXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIG9wdGlvbnNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7RmFicmljLkNhbnZhc30gICBvcHRpb25zLmNhbnZhcyAtIEZhYnJpYyBjYW52YXNcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgb3B0aW9ucy5pZCAtIFVuaXF1ZSBpZGVudGlmaWVyXHJcbiAgICpcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGlkLFxyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHNoYXBlLFxyXG4gICAgICBsZWZ0LFxyXG4gICAgICB0b3AsXHJcbiAgICAgIGFuZ2xlLFxyXG4gICAgfSA9IG9wdGlvbnM7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcblxyXG4gICAgLy8gU2V0IHNoYXBlXHJcbiAgICBzaGFwZS5zZXQoJ3R5cGUnLCAnbGlua2FibGVTaGFwZScpO1xyXG4gICAgc2hhcGUuc2V0KHtcclxuICAgICAgbGVmdCwgdG9wLCBpZCwgYW5nbGUsXHJcbiAgICB9KTtcclxuICAgIHRoaXMuc2hhcGUgPSBzaGFwZTtcclxuXHJcbiAgICAvLyBTaG93IGNvb3JkaW5hdGVzL2FuZ2xlIHdoZW4gbW92aW5nL3JvdGF0aW5nIG9iamVjdFxyXG4gICAgY29uc3QgbW9kaWZpY2F0aW9uQm94ID0gbmV3IGZhYnJpYy5SZWN0KHtcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICBzdHJva2U6ICcjNjY2JyxcclxuICAgICAgZmlsbDogJyNmZmYnLFxyXG4gICAgICB3aWR0aDogNzAsXHJcbiAgICAgIGhlaWdodDogMjAsXHJcbiAgICAgIHZlbnRlZDogZmFsc2UsXHJcbiAgICAgIHNlbGVjdGFibGU6IGZhbHNlLFxyXG4gICAgICBvcGFjaXR5OiAwLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBtb2RpZmljYXRpb25UZXh0ID0gbmV3IGZhYnJpYy5UZXh0KCcwLCAwJywge1xyXG4gICAgICBsZWZ0OiAwLFxyXG4gICAgICB0b3A6IDAsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgZm9udEZhbWlseTogJ0hlbHZldGljYScsXHJcbiAgICAgIGZvbnRTaXplOiAxMixcclxuICAgICAgYm9yZGVyU3Ryb2tlV2lkdGg6IDQsXHJcbiAgICAgIGV2ZW50ZWQ6IGZhbHNlLFxyXG4gICAgICBzZWxlY3RhYmxlOiBmYWxzZSxcclxuICAgICAgb3BhY2l0eTogMCxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgbW9kaWZpY2F0aW9uID0gdGhpcy5tb2RCb3ggPSBuZXcgZmFicmljLkdyb3VwKFttb2RpZmljYXRpb25Cb3gsIG1vZGlmaWNhdGlvblRleHRdLCB7XHJcbiAgICAgIGxlZnQ6IDAsXHJcbiAgICAgIHRvcDogMCxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICBldmVudGVkOiBmYWxzZSxcclxuICAgICAgc2VsZWN0YWJsZTogZmFsc2UsXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IG9uTW92aW5nID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCB7IHgsIHkgfSA9IHNoYXBlLmFDb29yZHMudGw7XHJcbiAgICAgIGNvbnN0IHhDb29yZHMgPSBbc2hhcGUuYUNvb3Jkcy50bC54LCBzaGFwZS5hQ29vcmRzLnRyLngsIHNoYXBlLmFDb29yZHMuYmwueCwgc2hhcGUuYUNvb3Jkcy5ici54XTtcclxuICAgICAgY29uc3QgeUNvb3JkcyA9IFtzaGFwZS5hQ29vcmRzLnRsLnksIHNoYXBlLmFDb29yZHMudHIueSwgc2hhcGUuYUNvb3Jkcy5ibC55LCBzaGFwZS5hQ29vcmRzLmJyLnldO1xyXG4gICAgICBtb2RpZmljYXRpb24ubGVmdCA9IChNYXRoLm1pbiguLi54Q29vcmRzKSArIE1hdGgubWF4KC4uLnhDb29yZHMpKSAvIDI7XHJcbiAgICAgIG1vZGlmaWNhdGlvbi50b3AgPSBNYXRoLnJvdW5kKE1hdGgubWF4KC4uLnlDb29yZHMpICsgMzApO1xyXG4gICAgICBtb2RpZmljYXRpb24uc2V0Q29vcmRzKCk7XHJcbiAgICAgIG1vZGlmaWNhdGlvbkJveC5zZXQoJ29wYWNpdHknLCAwLjcpO1xyXG4gICAgICBtb2RpZmljYXRpb25UZXh0LnNldCgnb3BhY2l0eScsIDEpO1xyXG4gICAgICBtb2RpZmljYXRpb25UZXh0LnNldCgndGV4dCcsIGAke01hdGgucm91bmQoeCl9LCAke01hdGgucm91bmQoeSl9YCk7XHJcbiAgICAgIGNhbnZhcy5icmluZ1RvRnJvbnQobW9kaWZpY2F0aW9uKTtcclxuICAgIH07XHJcbiAgICBjb25zdCBvbk1vdmVkID0gKCkgPT4ge1xyXG4gICAgICBtb2RpZmljYXRpb25Cb3guc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICAgIG1vZGlmaWNhdGlvblRleHQuc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb25Sb3RhdGluZyA9ICgpID0+IHtcclxuICAgICAgY29uc3QgeENvb3JkcyA9IFtzaGFwZS5hQ29vcmRzLnRsLngsIHNoYXBlLmFDb29yZHMudHIueCwgc2hhcGUuYUNvb3Jkcy5ibC54LCBzaGFwZS5hQ29vcmRzLmJyLnhdO1xyXG4gICAgICBjb25zdCB5Q29vcmRzID0gW3NoYXBlLmFDb29yZHMudGwueSwgc2hhcGUuYUNvb3Jkcy50ci55LCBzaGFwZS5hQ29vcmRzLmJsLnksIHNoYXBlLmFDb29yZHMuYnIueV07XHJcbiAgICAgIG1vZGlmaWNhdGlvbi5sZWZ0ID0gKE1hdGgubWluKC4uLnhDb29yZHMpICsgTWF0aC5tYXgoLi4ueENvb3JkcykpIC8gMjtcclxuICAgICAgbW9kaWZpY2F0aW9uLnRvcCA9IE1hdGgucm91bmQoTWF0aC5tYXgoLi4ueUNvb3JkcykgKyAzMCk7XHJcbiAgICAgIG1vZGlmaWNhdGlvbi5zZXRDb29yZHMoKTtcclxuICAgICAgbW9kaWZpY2F0aW9uQm94LnNldCgnb3BhY2l0eScsIDAuNyk7XHJcbiAgICAgIG1vZGlmaWNhdGlvblRleHQuc2V0KCdvcGFjaXR5JywgMSk7XHJcbiAgICAgIG1vZGlmaWNhdGlvblRleHQuc2V0KCd0ZXh0JywgYCR7TWF0aC5yb3VuZChzaGFwZS5hbmdsZSA+IDE4MCA/IHNoYXBlLmFuZ2xlIC0gMzYwIDogc2hhcGUuYW5nbGUpfcKwYCk7XHJcbiAgICAgIGNhbnZhcy5icmluZ1RvRnJvbnQobW9kaWZpY2F0aW9uKTtcclxuICAgIH07XHJcbiAgICBjb25zdCBvblJvdGF0ZWQgPSAoKSA9PiB7XHJcbiAgICAgIG1vZGlmaWNhdGlvbkJveC5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgICAgbW9kaWZpY2F0aW9uVGV4dC5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgIH07XHJcbiAgICBzaGFwZS5vbih7XHJcbiAgICAgIG1vdmluZzogb25Nb3ZpbmcsXHJcbiAgICAgIG1vdmVkOiBvbk1vdmVkLFxyXG4gICAgICByb3RhdGluZzogb25Sb3RhdGluZyxcclxuICAgICAgcm90YXRlZDogb25Sb3RhdGVkLFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQW5jaG9yIHBvaW50c1xyXG4gICAgdGhpcy5hbmNob3JzID0gdGhpcy5zaGFwZS5hbmNob3JzID0ge1xyXG4gICAgICBlYXN0OiB0aGlzLl9tYWtlQW5jaG9yUG9pbnQoJ2Vhc3QnKSxcclxuICAgICAgd2VzdDogdGhpcy5fbWFrZUFuY2hvclBvaW50KCd3ZXN0JyksXHJcbiAgICAgIC8vIG5vcnRoOiB0aGlzLl9tYWtlQW5jaG9yUG9pbnQoJ25vcnRoJyksXHJcbiAgICAgIC8vIHNvdXRoOiB0aGlzLl9tYWtlQW5jaG9yUG9pbnQoJ3NvdXRoJyksXHJcbiAgICAgIC8vIG5vcnRoZWFzdDogdGhpcy5fbWFrZUFuY2hvclBvaW50KCdub3J0aGVhc3QnKSxcclxuICAgICAgLy8gbm9ydGh3ZXN0OiB0aGlzLl9tYWtlQW5jaG9yUG9pbnQoJ25vcnRod2VzdCcpLFxyXG4gICAgICAvLyBzb3V0aGVhc3Q6IHRoaXMuX21ha2VBbmNob3JQb2ludCgnc291dGhlYXN0JyksXHJcbiAgICAgIC8vIHNvdXRod2VzdDogdGhpcy5fbWFrZUFuY2hvclBvaW50KCdzb3V0aHdlc3QnKSxcclxuICAgIH07XHJcblxyXG4gICAgLy8gRXZlbnRzIHJlbGF0ZWQgdG8gYW5jaG9yc1xyXG4gICAgc2hhcGUub24oe1xyXG4gICAgICBzZWxlY3RlZDogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudG9nZ2xlQW5jaG9yc09wYWNpdHkoMCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG1vdXNlb3ZlcjogKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNhbnZhcy5nZXRBY3RpdmVPYmplY3QoKSAhPT0gdGhpcy5zaGFwZSkge1xyXG4gICAgICAgICAgdGhpcy50b2dnbGVBbmNob3JzT3BhY2l0eSgxKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG1vdXNlb3V0OiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy50b2dnbGVBbmNob3JzT3BhY2l0eSgwKTtcclxuICAgICAgfSxcclxuICAgICAgbW92aW5nOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKGZhbHNlKTtcclxuICAgICAgfSxcclxuICAgICAgbW92ZWQ6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnJlZnJlc2hBbmNob3JzUG9zaXRpb24odHJ1ZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHJvdGF0aW5nOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKGZhbHNlKTtcclxuICAgICAgfSxcclxuICAgICAgcm90YXRlZDogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbih0cnVlKTtcclxuICAgICAgfSxcclxuICAgICAgc2NhbGluZzogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbihmYWxzZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHNjYWxlZDogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbih0cnVlKTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5qZWN0KCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHNoYXBlLFxyXG4gICAgICBhbmNob3JzLFxyXG4gICAgICBtb2RCb3gsXHJcbiAgICB9ID0gdGhpcztcclxuICAgIGNhbnZhcy5hZGQoc2hhcGUpO1xyXG4gICAgY2FudmFzLmFkZChtb2RCb3gpO1xyXG4gICAgT2JqZWN0LmtleXMoYW5jaG9ycykuZm9yRWFjaCgoY2FyZGluYWwpID0+IHtcclxuICAgICAgY2FudmFzLmFkZChhbmNob3JzW2NhcmRpbmFsXSk7XHJcbiAgICAgIGNhbnZhcy5icmluZ0ZvcndhcmQoYW5jaG9yc1tjYXJkaW5hbF0sIHRydWUpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnJlZnJlc2hBbmNob3JzUG9zaXRpb24odHJ1ZSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBtb3ZlKG9wdGlvbnMpIHtcclxuICAgIGlmIChvcHRpb25zLngpIHRoaXMuc2hhcGUuc2V0KCd0b3AnLCBvcHRpb25zLngpO1xyXG4gICAgaWYgKG9wdGlvbnMueSkgdGhpcy5zaGFwZS5zZXQoJ2xlZnQnLCBvcHRpb25zLnkpO1xyXG4gICAgdGhpcy5zaGFwZS5zZXRDb29yZHMoKTtcclxuICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgcm90YXRlKGFuZ2xlKSB7XHJcbiAgICB0aGlzLnNoYXBlLnJvdGF0ZShhbmdsZSk7XHJcbiAgICB0aGlzLnNoYXBlLnNldENvb3JkcygpO1xyXG4gICAgdGhpcy5yZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKCk7XHJcbiAgfVxyXG5cclxuICByZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKGNvbW1pdCkge1xyXG4gICAgT2JqZWN0LmtleXModGhpcy5hbmNob3JzKS5mb3JFYWNoKChjYXJkaW5hbCkgPT4ge1xyXG4gICAgICB0aGlzLl9zZXRBbmNob3JQb3NpdGlvblJlbGF0aXZlVG9SZWN0YW5nbGUoY2FyZGluYWwsIGNvbW1pdCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUFuY2hvcnNPcGFjaXR5KG9wYWNpdHkpIHtcclxuICAgIE9iamVjdC5rZXlzKHRoaXMuYW5jaG9ycykuZm9yRWFjaCgoY2FyZGluYWwpID0+IHtcclxuICAgICAgdGhpcy5hbmNob3JzW2NhcmRpbmFsXS50b2dnbGVPcGFjaXR5KG9wYWNpdHkpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBfc2V0QW5jaG9yUG9zaXRpb25SZWxhdGl2ZVRvUmVjdGFuZ2xlKGNhcmRpbmFsLCBjb21taXQpIHtcclxuICAgIGxldCBsZWZ0O1xyXG4gICAgbGV0IHRvcDtcclxuICAgIGNvbnN0IHsgc2hhcGUgfSA9IHRoaXM7XHJcbiAgICBjb25zdCBhcCA9IHRoaXMuYW5jaG9yc1tjYXJkaW5hbF07XHJcbiAgICBzd2l0Y2ggKGNhcmRpbmFsKSB7XHJcbiAgICAgIGNhc2UgJ2Vhc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IChzaGFwZS5hQ29vcmRzLnRyLnggKyBzaGFwZS5hQ29vcmRzLmJyLngpIC8gMjtcclxuICAgICAgICB0b3AgPSAoc2hhcGUuYUNvb3Jkcy50ci55ICsgc2hhcGUuYUNvb3Jkcy5ici55KSAvIDI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnd2VzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMudGwueCArIHNoYXBlLmFDb29yZHMuYmwueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLnRsLnkgKyBzaGFwZS5hQ29vcmRzLmJsLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMudGwueCArIHNoYXBlLmFDb29yZHMudHIueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLnRsLnkgKyBzaGFwZS5hQ29vcmRzLnRyLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMuYmwueCArIHNoYXBlLmFDb29yZHMuYnIueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLmJsLnkgKyBzaGFwZS5hQ29vcmRzLmJyLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aGVhc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IHNoYXBlLmFDb29yZHMudHIueDtcclxuICAgICAgICB0b3AgPSBzaGFwZS5hQ29vcmRzLnRyLnk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnbm9ydGh3ZXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSBzaGFwZS5hQ29vcmRzLnRsLng7XHJcbiAgICAgICAgdG9wID0gc2hhcGUuYUNvb3Jkcy50bC55O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRoZWFzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gc2hhcGUuYUNvb3Jkcy5ici54O1xyXG4gICAgICAgIHRvcCA9IHNoYXBlLmFDb29yZHMuYnIueTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aHdlc3QnOlxyXG4gICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgbGVmdCA9IHNoYXBlLmFDb29yZHMuYmwueDtcclxuICAgICAgICB0b3AgPSBzaGFwZS5hQ29vcmRzLmJsLnk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGFwLmxlZnQgPSBsZWZ0O1xyXG4gICAgYXAudG9wID0gdG9wO1xyXG4gICAgYXAuc2V0Q29vcmRzKCk7XHJcblxyXG4gICAgYXAuZmlyZShjb21taXQgPyAncGc6cG9zaXRpb246bW9kaWZpZWQnIDogJ3BnOnBvc2l0aW9uOm1vZGlmeWluZycpO1xyXG4gIH1cclxuXHJcbiAgX21ha2VBbmNob3JQb2ludChjYXJkaW5hbCkge1xyXG4gICAgbGV0IGxlZnQ7XHJcbiAgICBsZXQgdG9wO1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBzaGFwZSxcclxuICAgICAgaWQsXHJcbiAgICB9ID0gdGhpcztcclxuICAgIHN3aXRjaCAoY2FyZGluYWwpIHtcclxuICAgICAgY2FzZSAnZWFzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMudHIueCArIHNoYXBlLmFDb29yZHMuYnIueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLnRyLnkgKyBzaGFwZS5hQ29vcmRzLmJyLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICd3ZXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSAoc2hhcGUuYUNvb3Jkcy50bC54ICsgc2hhcGUuYUNvb3Jkcy5ibC54KSAvIDI7XHJcbiAgICAgICAgdG9wID0gKHNoYXBlLmFDb29yZHMudGwueSArIHNoYXBlLmFDb29yZHMuYmwueSkgLyAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRoJzoge1xyXG4gICAgICAgIGxlZnQgPSAoc2hhcGUuYUNvb3Jkcy50bC54ICsgc2hhcGUuYUNvb3Jkcy50ci54KSAvIDI7XHJcbiAgICAgICAgdG9wID0gKHNoYXBlLmFDb29yZHMudGwueSArIHNoYXBlLmFDb29yZHMudHIueSkgLyAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRoJzoge1xyXG4gICAgICAgIGxlZnQgPSAoc2hhcGUuYUNvb3Jkcy5ibC54ICsgc2hhcGUuYUNvb3Jkcy5ici54KSAvIDI7XHJcbiAgICAgICAgdG9wID0gKHNoYXBlLmFDb29yZHMuYmwueSArIHNoYXBlLmFDb29yZHMuYnIueSkgLyAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRoZWFzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gc2hhcGUuYUNvb3Jkcy50ci54O1xyXG4gICAgICAgIHRvcCA9IHNoYXBlLmFDb29yZHMudHIueTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aHdlc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IHNoYXBlLmFDb29yZHMudGwueDtcclxuICAgICAgICB0b3AgPSBzaGFwZS5hQ29vcmRzLnRsLnk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnc291dGhlYXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSBzaGFwZS5hQ29vcmRzLmJyLng7XHJcbiAgICAgICAgdG9wID0gc2hhcGUuYUNvb3Jkcy5ici55O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRod2VzdCc6XHJcbiAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICBsZWZ0ID0gc2hhcGUuYUNvb3Jkcy5ibC54O1xyXG4gICAgICAgIHRvcCA9IHNoYXBlLmFDb29yZHMuYmwueTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFwID0gbmV3IGZhYnJpYy5DaXJjbGUoe1xyXG4gICAgICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgICAgbGVmdCxcclxuICAgICAgdG9wLFxyXG4gICAgICBzdHJva2VXaWR0aDogMixcclxuICAgICAgcmFkaXVzOiA2LFxyXG4gICAgICBmaWxsOiAnIzc4YmVmYScsIC8vIDQyYTJkYSBkNWU4ZjJcclxuICAgICAgc3Ryb2tlOiAnIzc4YmVmYScsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgICAgc2VsZWN0YWJsZTogZmFsc2UsXHJcbiAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICAgIGlkOiBgJHtpZH1fJHtjYXJkaW5hbH1gLFxyXG4gICAgfSk7XHJcbiAgICBhcC50eXBlID0gJ2FuY2hvcic7XHJcbiAgICBhcC5zaGFwZUlkID0gaWQ7XHJcbiAgICBhcC5jYXJkaW5hbCA9IGNhcmRpbmFsO1xyXG4gICAgYXAub24oJ21vdXNlb3ZlcicsICgpID0+IHtcclxuICAgICAgYXAudG9nZ2xlT3BhY2l0eSgxKTtcclxuICAgIH0pO1xyXG4gICAgYXAub24oJ21vdXNlb3V0JywgKCkgPT4ge1xyXG4gICAgICBhcC50b2dnbGVPcGFjaXR5KDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYXAub24oJ21vdXNlZG93bicsIChvcHRpb25zKSA9PiB7XHJcbiAgICAgIHN3aXRjaCAob3B0aW9ucy5idXR0b24pIHtcclxuICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICB0aGlzLl9vbkFuY2hvclJpZ2h0Q2xpY2suY2FsbCh0aGlzLCBvcHRpb25zKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgIHRoaXMuX29uQW5jaG9yTWlkZGxlQ2xpY2suY2FsbCh0aGlzLCBvcHRpb25zKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTpcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgdGhpcy5fb25BbmNob3JMZWZ0Q2xpY2suY2FsbCh0aGlzLCBvcHRpb25zKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBhcDtcclxuICB9XHJcblxyXG4gIC8vIFNob3VsZCBiZSBpbXBsZW1lbnRlZCBieSBFeHRlbmRpbmcgQ2xhc3Nlc1xyXG4gIC8qIGVzbGludC1kaXNhYmxlIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXMgKi9cclxuICBfb25BbmNob3JMZWZ0Q2xpY2soLyogb3B0aW9ucyAqLykge31cclxuXHJcbiAgX29uQW5jaG9yTWlkZGxlQ2xpY2soLyogb3B0aW9ucyAqLykge31cclxuXHJcbiAgX29uQW5jaG9yUmlnaHRDbGljaygvKiBvcHRpb25zICovKSB7fVxyXG5cclxuICAvKiBlc2xpbnQtZGlzYWJsZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzICovXHJcbn1cclxuIiwiY29uc3QgeyBmYWJyaWMgfSA9IHdpbmRvdztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2Nlc3NHcmFwaCB7XHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0gb3B0aW9uc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtDYW52YXN9IG9wdGlvbnMuY2FudmFzIC0gRmFicmljSlMuQ2FudmFzIGluc3RhbmNlIC0gbWFuZGF0b3J5IGlmIG9wdGlvbnMuY2FudmFzT3B0cyBub3QgcHJvdmlkZWQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5jYW52YXNPcHRzIC0gRmFicmljSlMuQ2FudmFzI2luaXRpYWxpemUgcGFyYW1ldGVycyAtIG1hbmRhdG9yeSBpZiBvcHRpb25zLmNhbnZhcyBub3QgcHJvdmlkZWRcclxuICAgKiAgICAgICAgICAgICAgICAgU2VlIGh0dHA6Ly9mYWJyaWNqcy5jb20vZG9jcy9mYWJyaWMuQ2FudmFzLmh0bWwjaW5pdGlhbGl6ZSBmb3IgZGV0YWlsc1xyXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8U3RyaW5nfSBvcHRpb25zLmNhbnZhcy5lbCAtIDxjYW52YXM+IGVsZW1lbnQgdG8gaW5pdGlhbGl6ZSBpbnN0YW5jZSBvblxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLmNhbnZhcy5vcHRpb25zIC0gT3B0aW9ucyBvYmplY3RcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5ncmlkXSAtIGRpbWVuc2lvbnMgb2YgdGhlIGdyaWRcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICB0aGlzLmhhbmRsZXJzID0ge1xyXG4gICAgICBncmlkOiB7fSxcclxuICAgIH07XHJcblxyXG4gICAgLy8gSW5pdGlhbGl6ZSBDYW52YXNcclxuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuY2FudmFzID0gb3B0aW9ucy5jYW52YXMgPyBvcHRpb25zLmNhbnZhcyA6IG5ldyBmYWJyaWMuQ2FudmFzKG9wdGlvbnMuY2FudmFzT3B0cy5lbCwgb3B0aW9ucy5jYW52YXNPcHRzLm9wdGlvbnMpO1xyXG4gICAgY2FudmFzLnNldCgncHJlc2VydmVPYmplY3RTdGFja2luZycsIHRydWUpO1xyXG4gICAgLy8gY2FudmFzLnNldCgncmVuZGVyT25BZGRSZW1vdmUnLCBmYWxzZSk7XHJcbiAgICBjYW52YXMuc2V0KCdmaXJlUmlnaHRDbGljaycsIHRydWUpO1xyXG4gICAgY2FudmFzLnNldCgnZmlyZU1pZGRsZUNsaWNrJywgdHJ1ZSk7XHJcbiAgICBjYW52YXMuc2V0KCdzdG9wQ29udGV4dE1lbnUnLCB0cnVlKTtcclxuXHJcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZ3JpZCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgdGhpcy5zZXRHcmlkKHtcclxuICAgICAgICBncmlkOiBvcHRpb25zLmdyaWQsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGZhYnJpYy5PYmplY3QucHJvdG90eXBlLm9yaWdpblggPSBmYWJyaWMuT2JqZWN0LnByb3RvdHlwZS5vcmlnaW5ZID0gJ2NlbnRlcic7XHJcbiAgICBmYWJyaWMuT2JqZWN0LnByb3RvdHlwZS50b2dnbGVPcGFjaXR5ID0gZnVuY3Rpb24gdG9nZ2xlT3BhY2l0eShvcGFjaXR5LyogLCB0aW1lb3V0ICovKSB7XHJcbiAgICAgIC8vIHRoaXMuYW5pbWF0ZSgnb3BhY2l0eScsIG9wYWNpdHksIHtcclxuICAgICAgLy8gICBkdXJhdGlvbjogdGltZW91dCAhPT0gdW5kZWZpbmVkID8gdGltZW91dCA6IDMwMCxcclxuICAgICAgLy8gICBvbkNoYW5nZTogdGhpcy5jYW52YXMucmVuZGVyQWxsLmJpbmQodGhpcy5jYW52YXMpLFxyXG4gICAgICAvLyB9KTtcclxuICAgICAgdGhpcy5zZXQoJ29wYWNpdHknLCBvcGFjaXR5KTtcclxuICAgICAgdGhpcy5jYW52YXMucmVuZGVyQWxsKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNhbnZhcy5jYWxjT2Zmc2V0KCk7XHJcblxyXG4gICAgLy8gUHJldmVudCBub24gTGlua2FibGVTaGFwZSBvYmplY3RzIHRvIGJlIGdyb3VwZWQgZHVyaW5nIHNlbGVjdGlvblxyXG4gICAgY29uc3Qgb25TZWxlY3Rpb24gPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGFjdGl2ZSA9IGNhbnZhcy5nZXRBY3RpdmVPYmplY3QoKTtcclxuICAgICAgLy8gV2hlbiBtdWx0aSBzZWxlY3Rpb24sIHJlbW92ZSBhbnkgbm9uIExpbmthYmxlIFNoYXBlIG9iamVjdHNcclxuICAgICAgaWYgKGFjdGl2ZS50eXBlID09PSAnYWN0aXZlU2VsZWN0aW9uJykge1xyXG4gICAgICAgIGNvbnN0IG9iamVjdHMgPSBhY3RpdmUuZ2V0T2JqZWN0cygpO1xyXG4gICAgICAgIGlmIChvYmplY3RzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgIGNvbnN0IG9ubHlSZWN0ID0gb2JqZWN0cy5maWx0ZXIoKG8pID0+IG8udHlwZSA9PT0gJ2xpbmthYmxlU2hhcGUnKTtcclxuICAgICAgICAgIGNhbnZhcy5fZGlzY2FyZEFjdGl2ZU9iamVjdCgpO1xyXG4gICAgICAgICAgY29uc3Qgc2VsID0gbmV3IGZhYnJpYy5BY3RpdmVTZWxlY3Rpb24ob25seVJlY3QsIHtcclxuICAgICAgICAgICAgY2FudmFzLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBjYW52YXMuX3NldEFjdGl2ZU9iamVjdChzZWwpO1xyXG5cclxuICAgICAgICAgIC8vIFVwZGF0ZSBhbnkgbGlua3MgY29ubmVjdGVkIHRvIHRoZSBMaW5rYWJsZSBTaGFwZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjYW52YXMub24oe1xyXG4gICAgICAnc2VsZWN0aW9uOmNyZWF0ZWQnOiBvblNlbGVjdGlvbixcclxuICAgICAgJ3NlbGVjdGlvbjp1cGRhdGVkJzogb25TZWxlY3Rpb24sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCBjYW52YXMgdG8gaGF2ZSBhIGdyaWQuXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcclxuICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5ncmlkIC0gZ3JpZCBzcGFjaW5nIChwaXhlbHMpXHJcbiAgICovXHJcbiAgc2V0R3JpZChvcHRpb25zKSB7XHJcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZ3JpZCAhPT0gJ251bWJlcicgfHwgb3B0aW9ucy5ncmlkIDwgMCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnQgXCJncmlkXCIgaW4gUHJvY2Vzc0dyYXAjc2V0R3JpZC4gKHJlcXVpcmVkOiBOdW1iZXIgPiAwKScpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZ3JpZCA9IG9wdGlvbnMuZ3JpZDtcclxuICAgIGNvbnN0IHsgY2FudmFzIH0gPSB0aGlzO1xyXG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tbXVsdGktc3RyICovXHJcbiAgICBjb25zdCBkYXRhID0gYDxzdmcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj4gXFxcclxuICAgICAgICA8ZGVmcz4gXFxcclxuICAgICAgICAgICAgPHBhdHRlcm4gaWQ9XCJzbWFsbEdyaWRcIiB3aWR0aD1cIiR7dGhpcy5ncmlkfVwiIGhlaWdodD1cIiR7dGhpcy5ncmlkfVwiIHBhdHRlcm5Vbml0cz1cInVzZXJTcGFjZU9uVXNlXCI+IFxcXHJcbiAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTSAke3RoaXMuZ3JpZH0gMCBMIDAgMCAwICR7dGhpcy5ncmlkfVwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiZ3JheVwiIHN0cm9rZS13aWR0aD1cIjAuNVwiIC8+IFxcXHJcbiAgICAgICAgICAgIDwvcGF0dGVybj4gXFxcclxuICAgICAgICAgICAgPHBhdHRlcm4gaWQ9XCJncmlkXCIgd2lkdGg9XCIke3RoaXMuZ3JpZCAqIDV9XCIgaGVpZ2h0PVwiJHt0aGlzLmdyaWQgKiA1fVwiIHBhdHRlcm5Vbml0cz1cInVzZXJTcGFjZU9uVXNlXCI+IFxcXHJcbiAgICAgICAgICAgICAgICA8cmVjdCB3aWR0aD1cIiR7dGhpcy5ncmlkICogNX1cIiBoZWlnaHQ9XCIke3RoaXMuZ3JpZCAqIDV9XCIgZmlsbD1cInVybCgjc21hbGxHcmlkKVwiIC8+IFxcXHJcbiAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTSAke3RoaXMuZ3JpZCAqIDV9IDAgTCAwIDAgMCAke3RoaXMuZ3JpZCAqIDV9XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJncmF5XCIgc3Ryb2tlLXdpZHRoPVwiMVwiIC8+IFxcXHJcbiAgICAgICAgICAgIDwvcGF0dGVybj4gXFxcclxuICAgICAgICA8L2RlZnM+IFxcXHJcbiAgICAgICAgPHJlY3Qgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIGZpbGw9XCJ1cmwoI2dyaWQpXCIgLz4gXFxcclxuICAgIDwvc3ZnPmA7XHJcbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLW11bHRpLXN0ciAqL1xyXG5cclxuICAgIGNvbnN0IERPTVVSTCA9IHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTCB8fCB3aW5kb3c7XHJcbiAgICBjb25zdCBzdmcgPSBuZXcgQmxvYihbZGF0YV0sIHsgdHlwZTogJ2ltYWdlL3N2Zyt4bWw7Y2hhcnNldD11dGYtOCcgfSk7XHJcbiAgICBjb25zdCB1cmwgPSBET01VUkwuY3JlYXRlT2JqZWN0VVJMKHN2Zyk7XHJcbiAgICBmYWJyaWMudXRpbC5sb2FkSW1hZ2UodXJsLCAoaW1nKSA9PiB7XHJcbiAgICAgIGNvbnN0IGJnID0gbmV3IGZhYnJpYy5SZWN0KHtcclxuICAgICAgICB3aWR0aDogY2FudmFzLndpZHRoLCBoZWlnaHQ6IGNhbnZhcy5oZWlnaHQsIGV2ZW50ZWQ6IGZhbHNlLCBzZWxlY3RhYmxlOiBmYWxzZSxcclxuICAgICAgfSk7XHJcbiAgICAgIGJnLmZpbGwgPSBuZXcgZmFicmljLlBhdHRlcm4oeyBzb3VyY2U6IGltZyB9LFxyXG4gICAgICAgICgoKSA9PiB7IGJnLmRpcnR5ID0gdHJ1ZTsgY2FudmFzLnJlcXVlc3RSZW5kZXJBbGwoKTsgfSkpO1xyXG4gICAgICBiZy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICAgIGNhbnZhcy5zZXQoJ2JhY2tncm91bmRJbWFnZScsIGJnKTtcclxuXHJcbiAgICAgIC8vIFNuYXAgdG8gZ3JpZCBlZmZlY3RzXHJcbiAgICAgIGNhbnZhcy5vZmYodGhpcy5oYW5kbGVycy5ncmlkKTtcclxuICAgICAgdGhpcy5oYW5kbGVycy5ncmlkID0ge1xyXG4gICAgICAgICdvYmplY3Q6bW92aW5nJzogKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB7IGdyaWQgfSA9IHRoaXM7XHJcbiAgICAgICAgICBjb25zdCB7IHRhcmdldCB9ID0gZXZlbnQ7XHJcbiAgICAgICAgICBpZiAodGFyZ2V0LnR5cGUgIT09ICdsaW5rYWJsZVNoYXBlJykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBldmVudC50YXJnZXQuc2V0KHtcclxuICAgICAgICAgICAgbGVmdDogTWF0aC5yb3VuZChldmVudC50YXJnZXQubGVmdCAvIGdyaWQpICogZ3JpZCxcclxuICAgICAgICAgICAgdG9wOiBNYXRoLnJvdW5kKGV2ZW50LnRhcmdldC50b3AgLyBncmlkKSAqIGdyaWQsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgICdvYmplY3Q6c2NhbGluZyc6IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgeyBncmlkIH0gPSB0aGlzO1xyXG4gICAgICAgICAgY29uc3QgeyB0YXJnZXQgfSA9IGV2ZW50O1xyXG5cclxuICAgICAgICAgIGlmICh0YXJnZXQudHlwZSAhPT0gJ2xpbmthYmxlU2hhcGUnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zdCB3ID0gdGFyZ2V0LndpZHRoICogdGFyZ2V0LnNjYWxlWDtcclxuICAgICAgICAgIGNvbnN0IGggPSB0YXJnZXQuaGVpZ2h0ICogdGFyZ2V0LnNjYWxlWTtcclxuICAgICAgICAgIGNvbnN0IHNuYXAgPSB7IC8vIENsb3Nlc3Qgc25hcHBpbmcgcG9pbnRzXHJcbiAgICAgICAgICAgIHRvcDogTWF0aC5yb3VuZCh0YXJnZXQudG9wIC8gZ3JpZCkgKiBncmlkLFxyXG4gICAgICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKHRhcmdldC5sZWZ0IC8gZ3JpZCkgKiBncmlkLFxyXG4gICAgICAgICAgICBib3R0b206IE1hdGgucm91bmQoKHRhcmdldC50b3AgKyBoKSAvIGdyaWQpICogZ3JpZCxcclxuICAgICAgICAgICAgcmlnaHQ6IE1hdGgucm91bmQoKHRhcmdldC5sZWZ0ICsgdykgLyBncmlkKSAqIGdyaWQsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgY29uc3QgdGhyZXNob2xkID0gZ3JpZDtcclxuICAgICAgICAgIGNvbnN0IGRpc3QgPSB7IC8vIERpc3RhbmNlIGZyb20gc25hcHBpbmcgcG9pbnRzXHJcbiAgICAgICAgICAgIHRvcDogTWF0aC5hYnMoc25hcC50b3AgLSB0YXJnZXQudG9wKSxcclxuICAgICAgICAgICAgbGVmdDogTWF0aC5hYnMoc25hcC5sZWZ0IC0gdGFyZ2V0LmxlZnQpLFxyXG4gICAgICAgICAgICBib3R0b206IE1hdGguYWJzKHNuYXAuYm90dG9tIC0gdGFyZ2V0LnRvcCAtIGgpLFxyXG4gICAgICAgICAgICByaWdodDogTWF0aC5hYnMoc25hcC5yaWdodCAtIHRhcmdldC5sZWZ0IC0gdyksXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgY29uc3QgYXR0cnMgPSB7XHJcbiAgICAgICAgICAgIHNjYWxlWDogdGFyZ2V0LnNjYWxlWCxcclxuICAgICAgICAgICAgc2NhbGVZOiB0YXJnZXQuc2NhbGVZLFxyXG4gICAgICAgICAgICB0b3A6IHRhcmdldC50b3AsXHJcbiAgICAgICAgICAgIGxlZnQ6IHRhcmdldC5sZWZ0LFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHN3aXRjaCAodGFyZ2V0Ll9fY29ybmVyKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RsJzpcclxuICAgICAgICAgICAgICBpZiAoZGlzdC5sZWZ0IDwgZGlzdC50b3AgJiYgZGlzdC5sZWZ0IDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVggPSAodyAtIChzbmFwLmxlZnQgLSB0YXJnZXQubGVmdCkpIC8gdGFyZ2V0LndpZHRoO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVZID0gKGF0dHJzLnNjYWxlWCAvIHRhcmdldC5zY2FsZVgpICogdGFyZ2V0LnNjYWxlWTtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnRvcCA9IHRhcmdldC50b3AgKyAoaCAtIHRhcmdldC5oZWlnaHQgKiBhdHRycy5zY2FsZVkpO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMubGVmdCA9IHNuYXAubGVmdDtcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRpc3QudG9wIDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoaCAtIChzbmFwLnRvcCAtIHRhcmdldC50b3ApKSAvIHRhcmdldC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVggPSAoYXR0cnMuc2NhbGVZIC8gdGFyZ2V0LnNjYWxlWSkgKiB0YXJnZXQuc2NhbGVYO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMubGVmdCArPSAodyAtIHRhcmdldC53aWR0aCAqIGF0dHJzLnNjYWxlWCk7XHJcbiAgICAgICAgICAgICAgICBhdHRycy50b3AgPSBzbmFwLnRvcDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ210JzpcclxuICAgICAgICAgICAgICBpZiAoZGlzdC50b3AgPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWSA9IChoIC0gKHNuYXAudG9wIC0gdGFyZ2V0LnRvcCkpIC8gdGFyZ2V0LmhlaWdodDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnRvcCA9IHNuYXAudG9wO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAndHInOlxyXG4gICAgICAgICAgICAgIGlmIChkaXN0LnJpZ2h0IDwgZGlzdC50b3AgJiYgZGlzdC5yaWdodCA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVYID0gKHNuYXAucmlnaHQgLSB0YXJnZXQubGVmdCkgLyB0YXJnZXQud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoYXR0cnMuc2NhbGVYIC8gdGFyZ2V0LnNjYWxlWCkgKiB0YXJnZXQuc2NhbGVZO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMudG9wID0gdGFyZ2V0LnRvcCArIChoIC0gdGFyZ2V0LmhlaWdodCAqIGF0dHJzLnNjYWxlWSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChkaXN0LnRvcCA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVZID0gKGggLSAoc25hcC50b3AgLSB0YXJnZXQudG9wKSkgLyB0YXJnZXQuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVYID0gKGF0dHJzLnNjYWxlWSAvIHRhcmdldC5zY2FsZVkpICogdGFyZ2V0LnNjYWxlWDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnRvcCA9IHNuYXAudG9wO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbWwnOlxyXG4gICAgICAgICAgICAgIGlmIChkaXN0LmxlZnQgPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWCA9ICh3IC0gKHNuYXAubGVmdCAtIHRhcmdldC5sZWZ0KSkgLyB0YXJnZXQud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5sZWZ0ID0gc25hcC5sZWZ0O1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbXInOlxyXG4gICAgICAgICAgICAgIGlmIChkaXN0LnJpZ2h0IDwgdGhyZXNob2xkKSBhdHRycy5zY2FsZVggPSAoc25hcC5yaWdodCAtIHRhcmdldC5sZWZ0KSAvIHRhcmdldC53aWR0aDtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYmwnOlxyXG4gICAgICAgICAgICAgIGlmIChkaXN0LmxlZnQgPCBkaXN0LmJvdHRvbSAmJiBkaXN0LmxlZnQgPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWCA9ICh3IC0gKHNuYXAubGVmdCAtIHRhcmdldC5sZWZ0KSkgLyB0YXJnZXQud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoYXR0cnMuc2NhbGVYIC8gdGFyZ2V0LnNjYWxlWCkgKiB0YXJnZXQuc2NhbGVZO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMubGVmdCA9IHNuYXAubGVmdDtcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRpc3QuYm90dG9tIDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoc25hcC5ib3R0b20gLSB0YXJnZXQudG9wKSAvIHRhcmdldC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVggPSAoYXR0cnMuc2NhbGVZIC8gdGFyZ2V0LnNjYWxlWSkgKiB0YXJnZXQuc2NhbGVYO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMubGVmdCArPSAodyAtIHRhcmdldC53aWR0aCAqIGF0dHJzLnNjYWxlWCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtYic6XHJcbiAgICAgICAgICAgICAgaWYgKGRpc3QuYm90dG9tIDwgdGhyZXNob2xkKSBhdHRycy5zY2FsZVkgPSAoc25hcC5ib3R0b20gLSB0YXJnZXQudG9wKSAvIHRhcmdldC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JyJzpcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICBpZiAoZGlzdC5yaWdodCA8IGRpc3QuYm90dG9tICYmIGRpc3QucmlnaHQgPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWCA9IChzbmFwLnJpZ2h0IC0gdGFyZ2V0LmxlZnQpIC8gdGFyZ2V0LndpZHRoO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVZID0gKGF0dHJzLnNjYWxlWCAvIHRhcmdldC5zY2FsZVgpICogdGFyZ2V0LnNjYWxlWTtcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRpc3QuYm90dG9tIDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoc25hcC5ib3R0b20gLSB0YXJnZXQudG9wKSAvIHRhcmdldC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVggPSAoYXR0cnMuc2NhbGVZIC8gdGFyZ2V0LnNjYWxlWSkgKiB0YXJnZXQuc2NhbGVYO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRhcmdldC5zZXQoYXR0cnMpO1xyXG4gICAgICAgICAgdGFyZ2V0LnNldENvb3JkcygpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH07XHJcbiAgICAgIGlmICh0aGlzLmdyaWQgPiAwKSB7XHJcbiAgICAgICAgY2FudmFzLm9uKHRoaXMuaGFuZGxlcnMuZ3JpZCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=
