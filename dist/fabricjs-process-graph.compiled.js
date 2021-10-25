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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsInNyYy9Db250YWluZXIuanMiLCJzcmMvQ3VydmVkTGluay5qcyIsInNyYy9MaW5rLmpzIiwic3JjL0xpbmthYmxlU2hhcGUuanMiLCJzcmMvUHJvY2Vzc0dyYXBoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLE1BQU0sQ0FBQyxFQUFQLEdBQVk7QUFDVixFQUFBLFlBQVksRUFBWix3QkFEVTtBQUVWLEVBQUEsU0FBUyxFQUFULHFCQUZVO0FBR1YsRUFBQSxJQUFJLEVBQUosZ0JBSFU7QUFJVixFQUFBLGFBQWEsRUFBYix5QkFKVTtBQUtWLEVBQUEsVUFBVSxFQUFWO0FBTFUsQ0FBWjs7Ozs7Ozs7Ozs7O0FDTkE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLGNBQXNCLE1BQXRCO0FBQUEsSUFBUSxNQUFSLFdBQVEsTUFBUjtBQUFBLElBQWdCLENBQWhCLFdBQWdCLENBQWhCOztJQUVxQixTOzs7OztBQUNuQjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFLHFCQUFZLE9BQVosRUFBcUI7QUFBQTs7QUFBQTs7QUFDbkIsUUFBTSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBWCxDQUFnQjtBQUMzQixNQUFBLElBQUksRUFBRSxDQURxQjtBQUUzQixNQUFBLEdBQUcsRUFBRSxDQUZzQjtBQUczQixNQUFBLE9BQU8sRUFBRSxNQUhrQjtBQUkzQixNQUFBLE9BQU8sRUFBRSxLQUprQjtBQUszQixNQUFBLFdBQVcsRUFBRSxDQUxjO0FBTTNCLE1BQUEsTUFBTSxFQUFFLE1BTm1CO0FBTzNCLE1BQUEsSUFBSSxFQUFFLE1BUHFCO0FBUTNCLE1BQUEsRUFBRSxFQUFFLEVBUnVCO0FBUzNCLE1BQUEsRUFBRSxFQUFFLEVBVHVCO0FB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LEdBQWEsSUFBSSxDQUFDLE1BQWxCLElBQTRCLElBQUksQ0FBQyxLQUFMLEdBQWEsU0FBN0MsRUFBd0Q7QUFDdEQsa0JBQUEsS0FBSyxDQUFDLE1BQU4sR0FBZSxDQUFDLElBQUksQ0FBQyxLQUFMLEdBQWEsTUFBTSxDQUFDLElBQXJCLElBQTZCLE1BQU0sQ0FBQyxLQUFuRDtBQUNBLGtCQUFBLEtBQUssQ0FBQyxNQUFOLEdBQWdCLEtBQUssQ0FBQyxNQUFOLEdBQWUsTUFBTSxDQUFDLE1BQXZCLEdBQWlDLE1BQU0sQ0FBQyxNQUF2RDtBQUNELGlCQUhELE1BR08sSUFBSSxJQUFJLENBQUMsTUFBTCxHQUFjLFNBQWxCLEVBQTZCO0FBQ2xDLGtCQUFBLEtBQUssQ0FBQyxNQUFOLEdBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTCxHQUFjLE1BQU0sQ0FBQyxHQUF0QixJQUE2QixNQUFNLENBQUMsTUFBbkQ7QUFDQSxrQkFBQSxLQUFLLENBQUMsTUFBTixHQUFnQixLQUFLLENBQUMsTUFBTixHQUFlLE1BQU0sQ0FBQyxNQUF2QixHQUFpQyxNQUFNLENBQUMsTUFBdkQ7QUFDRDs7QUFDRDtBQS9ESjs7QUFpRUEsWUFBQSxNQUFNLENBQUMsR0FBUCxDQUFXLEtBQVg7QUFDQSxZQUFBLE1BQU0sQ0FBQyxTQUFQO0FBQ0Q7QUE1R2tCLFNBQXJCOztBQThHQSxZQUFJLEtBQUksQ0FBQyxJQUFMLEdBQVksQ0FBaEIsRUFBbUI7QUFDakIsVUFBQSxNQUFNLENBQUMsRUFBUCxDQUFVLEtBQUksQ0FBQyxRQUFMLENBQWMsSUFBeEI7QUFDRDtBQUNGLE9BNUhEO0FBNkhEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IENvbnRhaW5lciBmcm9tICcuL3NyYy9Db250YWluZXIuanMnO1xyXG5pbXBvcnQgUHJvY2Vzc0dyYXBoIGZyb20gJy4vc3JjL1Byb2Nlc3NHcmFwaC5qcyc7XHJcbmltcG9ydCBMaW5rIGZyb20gJy4vc3JjL0xpbmsuanMnO1xyXG5pbXBvcnQgTGlua2FibGVTaGFwZSBmcm9tICcuL3NyYy9MaW5rYWJsZVNoYXBlLmpzJztcclxuaW1wb3J0IEN1cnZlZExpbmsgZnJvbSAnLi9zcmMvQ3VydmVkTGluay5qcyc7XHJcblxyXG53aW5kb3cucGcgPSB7XHJcbiAgUHJvY2Vzc0dyYXBoLFxyXG4gIENvbnRhaW5lcixcclxuICBMaW5rLFxyXG4gIExpbmthYmxlU2hhcGUsXHJcbiAgQ3VydmVkTGluayxcclxufTtcclxuIiwiaW1wb3J0IExpbmthYmxlU2hhcGUgZnJvbSAnLi9MaW5rYWJsZVNoYXBlLmpzJztcclxuaW1wb3J0IEN1cnZlZExpbmsgZnJvbSAnLi9DdXJ2ZWRMaW5rLmpzJztcclxuXHJcbmNvbnN0IHsgZmFicmljLCBfIH0gPSB3aW5kb3c7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250YWluZXIgZXh0ZW5kcyBMaW5rYWJsZVNoYXBlIHtcclxuICAvKipcclxuICAgKiBBIENvbnRhaW5lciBpcyBhIFJlY3Qgd2l0aCBhbiBJVGV4dC4gQ2FuIGJlIGV4cGFuZGVkIHRvIHJldmVhbCBjb250YWluZWQgU2hhcGVzLlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBvcHRpb25zXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0ZhYnJpYy5DYW52YXN9ICAgb3B0aW9ucy5jYW52YXMgLSBGYWJyaWMgY2FudmFzXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG9wdGlvbnMuaWQgLSBVbmlxdWUgaWRlbnRpZmllclxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBvcHRpb25zLndpZHRoXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIG9wdGlvbnMuaGVpZ2h0XHJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG9wdGlvbnMubGFiZWxcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICBjb25zdCByZWN0ID0gbmV3IGZhYnJpYy5SZWN0KHtcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBvcmlnaW5YOiAnbGVmdCcsXHJcbiAgICAgIG9yaWdpblk6ICd0b3AnLFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgc3Ryb2tlOiAnIzAwMCcsXHJcbiAgICAgIGZpbGw6ICcjZmZmJyxcclxuICAgICAgcng6IDEwLFxyXG4gICAgICByeTogMTAsXHJcbiAgICAgIHdpZHRoOiBvcHRpb25zLndpZHRoID8gb3B0aW9ucy53aWR0aCA6IDIwMCxcclxuICAgICAgaGVpZ2h0OiBvcHRpb25zLmhlaWdodCA/IG9wdGlvbnMuaGVpZ2h0IDogMTAwLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCB0ZXh0ID0gbmV3IGZhYnJpYy5UZXh0Ym94KG9wdGlvbnMubGFiZWwsIHtcclxuICAgICAgbGVmdDogcmVjdC53aWR0aCAvIDIsXHJcbiAgICAgIHRvcDogcmVjdC5oZWlnaHQgLyAyLFxyXG4gICAgICBzdHlsZXM6IHsgfSxcclxuICAgICAgZm9udFNpemU6IDE0LFxyXG4gICAgICBmb250RmFtaWx5OiAnSGVsdmV0aWNhJyxcclxuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICB3aWR0aDogMTkwLFxyXG4gICAgICBoZWlnaHQ6IDkwLFxyXG4gICAgICBzcGxpdEJ5R3JhcGhlbWU6IHRydWUsXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGdyb3VwID0gbmV3IGZhYnJpYy5Hcm91cChbcmVjdCwgdGV4dF0sIHtcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBvcmlnaW5YOiAnbGVmdCcsXHJcbiAgICAgIG9yaWdpblk6ICd0b3AnLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBuZXdPcHRpb25zID0gXy5jbG9uZURlZXAoXy5vbWl0KG9wdGlvbnMsIFsnY2FudmFzJywgJ3NoYXBlJ10pKTtcclxuICAgIG5ld09wdGlvbnMuY2FudmFzID0gb3B0aW9ucy5jYW52YXM7XHJcbiAgICBuZXdPcHRpb25zLnNoYXBlID0gZ3JvdXA7XHJcbiAgICBzdXBlcihuZXdPcHRpb25zKTtcclxuXHJcbiAgICBncm91cC5vbih7XHJcbiAgICAgIHNjYWxpbmc6ICgpID0+IHtcclxuICAgICAgICAvLyBXaGVuIHNjYWxpbmcsIGtlZXAgdGV4dCBzYW1lIHNpemUgYXMgaW5pdGlhbFxyXG4gICAgICAgIGlmIChncm91cC5zY2FsZVggPCAxKSB7XHJcbiAgICAgICAgICB0ZXh0LnNjYWxlWCA9IDEgKyAoMSAtIGdyb3VwLnNjYWxlWCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRleHQuc2NhbGVYID0gMSAvIChncm91cC5zY2FsZVgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZ3JvdXAuc2NhbGVZIDwgMSkge1xyXG4gICAgICAgICAgdGV4dC5zY2FsZVkgPSAxICsgKDEgLSBncm91cC5zY2FsZVkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0ZXh0LnNjYWxlWSA9IDEgLyAoZ3JvdXAuc2NhbGVZKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jYW52YXMucmVuZGVyQWxsKCk7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIF9vbkFuY2hvclJpZ2h0Q2xpY2sob3B0aW9ucykge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBpZCwgbGVmdCwgdG9wLCBhbmdsZSwgY2FudmFzLCB3aWR0aCwgaGVpZ2h0LFxyXG4gICAgfSA9IHRoaXMuc2hhcGU7XHJcbiAgICBjb25zdCBhcCA9IG9wdGlvbnMudGFyZ2V0O1xyXG4gICAgY29uc3QgeyBjYXJkaW5hbCB9ID0gYXA7XHJcbiAgICBjb25zdCBzcGFjaW5nID0gNTA7XHJcblxyXG4gICAgY29uc3QgbmV4dENvbnRhaW5lciA9IG5ldyBDb250YWluZXIoe1xyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIGlkOiBgJHtpZH1fbmV4dF8ke2NhcmRpbmFsfV8ke01hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMSl9YCxcclxuICAgICAgbGVmdCxcclxuICAgICAgdG9wLFxyXG4gICAgICBhbmdsZSxcclxuICAgICAgbGFiZWw6IGAke2lkfV9uZXh0XyR7Y2FyZGluYWx9YCxcclxuICAgIH0pO1xyXG4gICAgbmV4dENvbnRhaW5lci5pbmplY3QoKTtcclxuXHJcbiAgICBjb25zdCBuZXdPcHRpb25zID0ge307XHJcbiAgICBsZXQgdGFyZ2V0Q2FyZGluYWw7XHJcbiAgICBzd2l0Y2ggKGNhcmRpbmFsKSB7XHJcbiAgICAgIGNhc2UgJ2Vhc3QnOiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnd2VzdCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gdG9wO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IGxlZnQgKyB3aWR0aCArIHNwYWNpbmc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnd2VzdCc6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICdlYXN0JztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSB0b3A7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gbGVmdCAtIHdpZHRoIC0gc3BhY2luZztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aCc6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICdzb3V0aCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gdG9wIC0gaGVpZ2h0IC0gc3BhY2luZztcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSBsZWZ0O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRoJzoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ25vcnRoJztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSB0b3AgKyBoZWlnaHQgKyBzcGFjaW5nO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IGxlZnQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnbm9ydGhlYXN0Jzoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ3NvdXRod2VzdCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gdG9wIC0gaGVpZ2h0IC0gc3BhY2luZztcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSBsZWZ0ICsgd2lkdGggKyBzcGFjaW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRod2VzdCc6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICdzb3V0aGVhc3QnO1xyXG4gICAgICAgIG5ld09wdGlvbnMueCA9IHRvcCAtIGhlaWdodCAtIHNwYWNpbmc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gbGVmdCAtIHdpZHRoIC0gc3BhY2luZztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aGVhc3QnOiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnbm9ydGh3ZXN0JztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSB0b3AgKyBoZWlnaHQgKyBzcGFjaW5nO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IGxlZnQgKyB3aWR0aCArIHNwYWNpbmc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnc291dGh3ZXN0JzpcclxuICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ25vcnRoZWFzdCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gdG9wICsgaGVpZ2h0ICsgc3BhY2luZztcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSBsZWZ0IC0gd2lkdGggLSBzcGFjaW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBuZXh0Q29udGFpbmVyLm1vdmUobmV3T3B0aW9ucyk7XHJcbiAgICAvLyBuZXh0Q29udGFpbmVyLnJvdGF0ZShhbmdsZSk7XHJcblxyXG4gICAgY29uc3QgbmV3TGluayA9IG5ldyBDdXJ2ZWRMaW5rKHtcclxuICAgICAgY2FudmFzLFxyXG4gICAgICBzdGFydDoge1xyXG4gICAgICAgIHg6IGFwLmxlZnQsXHJcbiAgICAgICAgeTogYXAudG9wLFxyXG4gICAgICB9LFxyXG4gICAgICBlbmQ6IHtcclxuICAgICAgICB4OiBuZXh0Q29udGFpbmVyLmFuY2hvcnNbdGFyZ2V0Q2FyZGluYWxdLmxlZnQsXHJcbiAgICAgICAgeTogbmV4dENvbnRhaW5lci5hbmNob3JzW3RhcmdldENhcmRpbmFsXS50b3AsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICAgIG5ld0xpbmsuaW5qZWN0KGNhbnZhcyk7XHJcbiAgICBuZXdMaW5rLmNvbm5lY3RMaW5rKCdzdGFydCcsIGFwLnNoYXBlSWQsIGFwLmNhcmRpbmFsKTtcclxuICAgIG5ld0xpbmsuY29ubmVjdExpbmsoJ2VuZCcsIG5leHRDb250YWluZXIuYW5jaG9yc1t0YXJnZXRDYXJkaW5hbF0uc2hhcGVJZCwgbmV4dENvbnRhaW5lci5hbmNob3JzW3RhcmdldENhcmRpbmFsXS5jYXJkaW5hbCk7XHJcbiAgfVxyXG5cclxuICBfb25BbmNob3JMZWZ0Q2xpY2sob3B0aW9ucykge1xyXG4gICAgY29uc3QgYXAgPSBvcHRpb25zLnRhcmdldDtcclxuICAgIGNvbnN0IHsgY2FudmFzIH0gPSB0aGlzO1xyXG5cclxuICAgIC8vIERpc2FibGUgdGhlIG11bHRpIHNlbGVjdGlvbiB3aGVuIG1vdmluZyBtb3VzZVxyXG4gICAgdGhpcy5jYW52YXMuc2VsZWN0aW9uID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3Qgb3Bwb3NpdGVDYXJkaW5hbCA9IHtcclxuICAgICAgZWFzdDogJ3dlc3QnLFxyXG4gICAgICB3ZXN0OiAnZWFzdCcsXHJcbiAgICAgIG5vcnRoOiAnc291dGgnLFxyXG4gICAgICBzb3V0aDogJ25vcnRoJyxcclxuICAgIH07XHJcbiAgICBjb25zdCBuZXdMaW5rID0gbmV3IEN1cnZlZExpbmsoe1xyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgeDogYXAubGVmdCxcclxuICAgICAgICB5OiBhcC50b3AsXHJcbiAgICAgICAgZGlyZWN0aW9uOiBhcC5jYXJkaW5hbCxcclxuICAgICAgfSxcclxuICAgICAgZW5kOiB7XHJcbiAgICAgICAgeDogYXAubGVmdCxcclxuICAgICAgICB5OiBhcC50b3AsXHJcbiAgICAgICAgZGlyZWN0aW9uOiBvcHBvc2l0ZUNhcmRpbmFsW2FwLmNhcmRpbmFsXSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgbmV3TGluay5pbmplY3QoY2FudmFzKTtcclxuICAgIG5ld0xpbmsuY29ubmVjdExpbmsoJ3N0YXJ0JywgYXAuc2hhcGVJZCwgYXAuY2FyZGluYWwpO1xyXG4gICAgbmV3TGluay5hcnJvd0hlYWQuZmlyZSgnbW91c2Vkb3duJyk7XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZU1vdmUgPSAoZXZlbnQpID0+IHtcclxuICAgICAgbmV3TGluay5hcnJvd0hlYWQubGVmdCA9IGV2ZW50LnBvaW50ZXIueDtcclxuICAgICAgbmV3TGluay5hcnJvd0hlYWQudG9wID0gZXZlbnQucG9pbnRlci55O1xyXG4gICAgICBuZXdMaW5rLmFycm93SGVhZC5maXJlKCdtb3ZpbmcnKTtcclxuICAgIH07XHJcbiAgICBjYW52YXMub24oJ21vdXNlOm1vdmUnLCBvbk1vdXNlTW92ZSk7XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZUNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAvLyBFbmFibGUgYmFjayB0aGUgbXVsdGkgc2VsZWN0aW9uIHdoZW4gbW92aW5nIG1vdXNlXHJcbiAgICAgIHRoaXMuY2FudmFzLnNlbGVjdGlvbiA9IHRydWU7XHJcblxyXG4gICAgICBuZXdMaW5rLmFycm93SGVhZC5maXJlKCdtb3ZlZCcpO1xyXG4gICAgICBuZXdMaW5rLmFycm93SGVhZC5maXJlKCdtb3VzZXVwJyk7XHJcbiAgICAgIGNhbnZhcy5vZmYoJ21vdXNlOm1vdmUnLCBvbk1vdXNlTW92ZSk7XHJcbiAgICAgIGNhbnZhcy5vZmYoJ21vdXNlOnVwJywgb25Nb3VzZUNsaWNrKTtcclxuICAgIH07XHJcbiAgICBjYW52YXMub24oJ21vdXNlOnVwJywgb25Nb3VzZUNsaWNrKTtcclxuICB9XHJcbn1cclxuIiwiY29uc3QgeyBmYWJyaWMgfSA9IHdpbmRvdztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1cnZlZExpbmsge1xyXG4gIC8qKlxyXG4gICAqIEEgTGluayBpcyBhIEZhYnJpYy5QYXRoIG9iamVjdCB3aG9zZSBTdGFydCBhbmQgRW5kIHBvaW50cyBjYW4gYmUgY29ubmVjdGVkIGVuZCBhbnkgYW5jaG9yIG9mIHR3byBMaW5rYWJsZVNoYXBlLlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBvcHRpb25zXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0ZhYnJpYy5DYW52YXN9ICAgb3B0aW9ucy5jYW52YXMgLSBGYWJyaWMgY2FudmFzXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG9wdGlvbnMuaWQgLSBVbmlxdWUgaWRlbnRpZmllclxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLnN0YXJ0XSAtIENvb3JkaW5hdGVzIG9mIHRoZSBzdGFydCBwb2ludFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBbb3B0aW9ucy5zdGFydC54XSAtIFggYXhpcyBjb29yZGluYXRlIG9mIHRoZSBzdGFydCBwb2ludFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBbb3B0aW9ucy5zdGFydC55XSAtIFkgYXhpcyBjb29yZGluYXRlIG9mIHRoZSBzdGFydCBwb2ludFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBbb3B0aW9ucy5zdGFydC5kaXJlY3Rpb25dIC1cclxuICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgW29wdGlvbnMuZW5kLnhdIC0gWCBheGlzIGNvb3JkaW5hdGUgb2YgdGhlIGVuZCBwb2ludFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBbb3B0aW9ucy5lbmQueV0gLSBZIGF4aXMgY29vcmRpbmF0ZSBvZiB0aGUgZW5kIHBvaW50XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIFtvcHRpb25zLmVuZC5kaXJlY3Rpb25dIC1cclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuY3VzdG9tXSAtIE9wdGlvbnMgZW5kIGN1c3RvbWl6ZSB0aGUgZGlmZmVyZW50IHNoYXBlcyBvZiB0aGUgTGlua1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLmN1c3RvbS5wYXRoXSAtIGJlemllciBxdWFkcmF0aWMgY3VydmVcclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuY3VzdG9tLnN0YXJ0UG9pbnRdIC0gYWthIGFycm93VGFpbFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBbb3B0aW9ucy5jdXN0b20uZW5kUG9pbnRdIC0gYWthIGFycm93SGVhZFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgaWQsXHJcbiAgICAgIGNhbnZhcyxcclxuICAgIH0gPSBvcHRpb25zO1xyXG4gICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICB0aGlzLmRpcmVjdGlvbiA9IHtcclxuICAgICAgc3RhcnQ6IG9wdGlvbnMgJiYgb3B0aW9ucy5zdGFydCAmJiBvcHRpb25zLnN0YXJ0LmRpcmVjdGlvbiA/IG9wdGlvbnMuc3RhcnQuZGlyZWN0aW9uIDogJ2Vhc3QnLFxyXG4gICAgICBlbmQ6IG9wdGlvbnMgJiYgb3B0aW9ucy5lbmQgJiYgb3B0aW9ucy5lbmQuZGlyZWN0aW9uID8gb3B0aW9ucy5lbmQuZGlyZWN0aW9uIDogJ3dlc3QnLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHN0YXJ0ID0ge1xyXG4gICAgICB4OiBvcHRpb25zICYmIG9wdGlvbnMuc3RhcnQgJiYgb3B0aW9ucy5zdGFydC54ID8gb3B0aW9ucy5zdGFydC54IDogMCxcclxuICAgICAgeTogb3B0aW9ucyAmJiBvcHRpb25zLnN0YXJ0ICYmIG9wdGlvbnMuc3RhcnQueSA/IG9wdGlvbnMuc3RhcnQueSA6IDAsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgZW5kID0ge1xyXG4gICAgICB4OiBvcHRpb25zICYmIG9wdGlvbnMuZW5kICYmIG9wdGlvbnMuZW5kLnggPyBvcHRpb25zLmVuZC54IDogMCxcclxuICAgICAgeTogb3B0aW9ucyAmJiBvcHRpb25zLmVuZCAmJiBvcHRpb25zLmVuZC55ID8gb3B0aW9ucy5lbmQueSA6IDAsXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFBhdGgsIGEgYmV6aWVyIGN1YmljIGN1cnZlXHJcbiAgICBjb25zdCB7IHBhdGhDb29yZHNBcnJheSB9ID0gdGhpcy5jb21wdXRlUGF0aENvb3Jkcyh7XHJcbiAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgeDogc3RhcnQueCxcclxuICAgICAgICB5OiBzdGFydC55LFxyXG4gICAgICAgIGRpcmVjdGlvbjogdGhpcy5kaXJlY3Rpb24uc3RhcnQsXHJcbiAgICAgIH0sXHJcbiAgICAgIGVuZDoge1xyXG4gICAgICAgIHg6IGVuZC54LFxyXG4gICAgICAgIHk6IGVuZC55LFxyXG4gICAgICAgIGRpcmVjdGlvbjogdGhpcy5kaXJlY3Rpb24uZW5kLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBwYXRoT3B0cyA9IHRoaXMuZGVmYXVsdFBhdGhPcHRpb25zID0ge1xyXG4gICAgICBmaWxsOiAnJyxcclxuICAgICAgc3Ryb2tlOiAob3B0aW9ucy5jdXN0b20gJiYgb3B0aW9ucy5jdXN0b20ucGF0aCAmJiBvcHRpb25zLmN1c3RvbS5wYXRoLnN0cm9rZSkgPyBvcHRpb25zLmN1c3RvbS5wYXRoLnN0cm9rZSA6ICcjMDAwJyxcclxuICAgICAgc3Ryb2tlV2lkdGg6IChvcHRpb25zLmN1c3RvbSAmJiBvcHRpb25zLmN1c3RvbS5wYXRoICYmIG9wdGlvbnMuY3VzdG9tLnBhdGguc3Ryb2tlV2lkdGgpID8gb3B0aW9ucy5jdXN0b20ucGF0aC5zdHJva2VXaWR0aCA6IDIsXHJcbiAgICAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgICBoYXNCb3JkZXJzOiB0cnVlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAgIHBlclBpeGVsVGFyZ2V0RmluZDogdHJ1ZSxcclxuICAgIH07XHJcbiAgICBjb25zdCBwYXRoID0gbmV3IGZhYnJpYy5QYXRoKHBhdGhDb29yZHNBcnJheSwgcGF0aE9wdHMpO1xyXG4gICAgdGhpcy5wYXRoID0gcGF0aDtcclxuXHJcbiAgICAvLyBFbmQgcG9pbnQgKGFycm93SGVhZClcclxuICAgIGNvbnN0IGlzVmFsaWRNYXNrT3B0cyA9IHtcclxuICAgICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAgIGxlZnQ6IDAsXHJcbiAgICAgIHRvcDogMCxcclxuICAgICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAgIHJhZGl1czogMTYsXHJcbiAgICAgIGZpbGw6ICcjNTdiODU3JywgLy8gZWE0ZjM3XHJcbiAgICAgIHN0cm9rZTogJyM1N2I4NTcnLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAgIHNlbGVjdGFibGU6IGZhbHNlLFxyXG4gICAgICBvcGFjaXR5OiAwLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGFycm93SGVhZE9wdHMgPSB7XHJcbiAgICAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgICB3aWR0aDogMTAsXHJcbiAgICAgIGhlaWdodDogMTAsXHJcbiAgICAgIGxlZnQ6IGVuZC54LFxyXG4gICAgICB0b3A6IGVuZC55LFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgZmlsbDogJyMwMDAnLFxyXG4gICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICBzdHJva2U6ICcjMDAwJyxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgICBoYXNCb3JkZXJzOiBmYWxzZSxcclxuICAgICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGFycm93SGVhZCA9IHRoaXMuYXJyb3dIZWFkID0gbmV3IGZhYnJpYy5UcmlhbmdsZShhcnJvd0hlYWRPcHRzKTtcclxuICAgIHRoaXMuaXNWYWxpZEhlYWRDb25uZWN0aW9uTWFzayA9IG5ldyBmYWJyaWMuQ2lyY2xlKGlzVmFsaWRNYXNrT3B0cyk7XHJcbiAgICBhcnJvd0hlYWQub24oJ21vdmluZycsICgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVQYXRoKHtcclxuICAgICAgICBlbmQ6IHtcclxuICAgICAgICAgIHg6IGFycm93SGVhZC5sZWZ0LFxyXG4gICAgICAgICAgeTogYXJyb3dIZWFkLnRvcCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbW1pdDogZmFsc2UsXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLl9jaGVja0V4dHJlbWl0eUNhbkJlQ29ubmVjdGVkKCdlbmQnKTtcclxuICAgIH0pO1xyXG4gICAgYXJyb3dIZWFkLm9uKCdtb3ZlZCcsICgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVQYXRoKHtcclxuICAgICAgICBlbmQ6IHtcclxuICAgICAgICAgIHg6IGFycm93SGVhZC5sZWZ0LFxyXG4gICAgICAgICAgeTogYXJyb3dIZWFkLnRvcCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbW1pdDogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuaXNWYWxpZEhlYWRDb25uZWN0aW9uTWFzay5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgICAgdGhpcy5fY29ubmVjdERpc2Nvbm5lY3RFeHRyZW1pdHkoJ2VuZCcpO1xyXG4gICAgfSk7XHJcbiAgICBhcnJvd0hlYWQub24oJ21vdXNlZG93bicsICgpID0+IHtcclxuICAgICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcclxuICAgICAgdGhpcy50b2dnbGVBbGxBbmNob3JzT3BhY2l0eSgxKTtcclxuXHJcbiAgICAgIGFycm93SGVhZC5vbignbW91c2V1cCcsICgpID0+IHtcclxuICAgICAgICB0aGlzLnRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KDApO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFN0YXJ0IHBvaW50IChhcnJvd1RhaWwpXHJcbiAgICBjb25zdCBhcnJvd1RhaWxPcHRzID0ge1xyXG4gICAgICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgICAgd2lkdGg6IDEwLFxyXG4gICAgICBoZWlnaHQ6IDEwLFxyXG4gICAgICBsZWZ0OiBzdGFydC54LFxyXG4gICAgICB0b3A6IHN0YXJ0LnksXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICBmaWxsOiAnI2ZmZicsXHJcbiAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgIHN0cm9rZTogJyMwMDAnLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIHNlbGVjdGFibGU6IHRydWUsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgYXJyb3dUYWlsID0gdGhpcy5hcnJvd1RhaWwgPSBuZXcgZmFicmljLlJlY3QoYXJyb3dUYWlsT3B0cyk7XHJcbiAgICB0aGlzLmlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2sgPSBuZXcgZmFicmljLkNpcmNsZShpc1ZhbGlkTWFza09wdHMpO1xyXG4gICAgYXJyb3dUYWlsLm9uKCdtb3ZpbmcnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aCh7XHJcbiAgICAgICAgc3RhcnQ6IHtcclxuICAgICAgICAgIHg6IGFycm93VGFpbC5sZWZ0LFxyXG4gICAgICAgICAgeTogYXJyb3dUYWlsLnRvcCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbW1pdDogZmFsc2UsXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLl9jaGVja0V4dHJlbWl0eUNhbkJlQ29ubmVjdGVkKCdzdGFydCcpO1xyXG4gICAgfSk7XHJcbiAgICBhcnJvd1RhaWwub24oJ21vdmVkJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhdGgoe1xyXG4gICAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgICB4OiBhcnJvd1RhaWwubGVmdCxcclxuICAgICAgICAgIHk6IGFycm93VGFpbC50b3AsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21taXQ6IHRydWUsXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2suc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICAgIHRoaXMuX2Nvbm5lY3REaXNjb25uZWN0RXh0cmVtaXR5KCdzdGFydCcpO1xyXG4gICAgfSk7XHJcbiAgICBhcnJvd1RhaWwub24oJ21vdXNlZG93bicsICgpID0+IHtcclxuICAgICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcclxuICAgICAgdGhpcy50b2dnbGVBbGxBbmNob3JzT3BhY2l0eSgxKTtcclxuXHJcbiAgICAgIGFycm93VGFpbC5vbignbW91c2V1cCcsICgpID0+IHtcclxuICAgICAgICB0aGlzLnRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KDApO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5qZWN0KCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHBhdGgsXHJcbiAgICAgIGFycm93SGVhZCxcclxuICAgICAgYXJyb3dUYWlsLFxyXG4gICAgICBpc1ZhbGlkVGFpbENvbm5lY3Rpb25NYXNrLFxyXG4gICAgICBpc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrLFxyXG4gICAgfSA9IHRoaXM7XHJcbiAgICBjYW52YXMuYWRkKGlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2spO1xyXG4gICAgY2FudmFzLmFkZChpc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrKTtcclxuICAgIGNhbnZhcy5hZGQoYXJyb3dIZWFkKTtcclxuICAgIGNhbnZhcy5hZGQoYXJyb3dUYWlsKTtcclxuXHJcbiAgICBjYW52YXMuYWRkKHBhdGgpO1xyXG5cclxuICAgIHRoaXMudXBkYXRlUGF0aCh7XHJcbiAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgeDogcGF0aC5wYXRoWzBdWzFdLFxyXG4gICAgICAgIHk6IHBhdGgucGF0aFswXVsyXSxcclxuICAgICAgfSxcclxuICAgICAgZW5kOiB7XHJcbiAgICAgICAgeDogcGF0aC5wYXRoWzJdWzVdLFxyXG4gICAgICAgIHk6IHBhdGgucGF0aFsyXVs2XSxcclxuICAgICAgfSxcclxuICAgICAgY29tbWl0OiB0cnVlLFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBjb25uZWN0TGluayhsaW5rUG9pbnQsIHNoYXBlSWQsIGNhcmRpbmFsKSB7XHJcbiAgICAvLyBDaGVjayBub3QgYWxyZWFkeSBjb25uZWN0ZWRcclxuICAgIGlmICghdGhpcy5pc1ZhbGlkQ29ubmVjdGlvbihsaW5rUG9pbnQsIHNoYXBlSWQsIGNhcmRpbmFsKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBzaGFwZSA9IHRoaXMuY2FudmFzLmdldE9iamVjdHMoKVxyXG4gICAgICAuZmluZCgobykgPT4gby5pZCA9PT0gc2hhcGVJZCk7XHJcblxyXG4gICAgLy8gRGlzY29ubmVjdCBleGlzdGluZyBvYmplY3RcclxuICAgIHRoaXMuZGlzY29ubmVjdExpbmsobGlua1BvaW50KTtcclxuXHJcbiAgICAvLyBDb25uZWN0XHJcbiAgICB0aGlzLmRpcmVjdGlvbltsaW5rUG9pbnRdID0gY2FyZGluYWw7XHJcbiAgICB0aGlzW2xpbmtQb2ludF0gPSB7XHJcbiAgICAgIHNoYXBlLFxyXG4gICAgICBhbmNob3I6IGNhcmRpbmFsLFxyXG4gICAgICBoYW5kbGVyczoge1xyXG4gICAgICAgIG9uQW5jaG9yUG9zaXRpb25Nb2RpZnlpbmc6ICgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IG9wdHMgPSB7XHJcbiAgICAgICAgICAgIGNvbW1pdDogZmFsc2UsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgb3B0c1tsaW5rUG9pbnRdID0ge1xyXG4gICAgICAgICAgICB4OiBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5sZWZ0LFxyXG4gICAgICAgICAgICB5OiBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS50b3AsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVQYXRoKG9wdHMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25BbmNob3JQb3NpdGlvbk1vZGlmaWVkOiAoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBvcHRzID0ge1xyXG4gICAgICAgICAgICBjb21taXQ6IHRydWUsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgb3B0c1tsaW5rUG9pbnRdID0ge1xyXG4gICAgICAgICAgICB4OiBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5sZWZ0LFxyXG4gICAgICAgICAgICB5OiBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS50b3AsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVQYXRoKG9wdHMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ub3BhY2l0eSA9IDA7XHJcbiAgICBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5vbigncGc6cG9zaXRpb246bW9kaWZ5aW5nJywgdGhpc1tsaW5rUG9pbnRdLmhhbmRsZXJzLm9uQW5jaG9yUG9zaXRpb25Nb2RpZnlpbmcpO1xyXG4gICAgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ub24oJ3BnOnBvc2l0aW9uOm1vZGlmaWVkJywgdGhpc1tsaW5rUG9pbnRdLmhhbmRsZXJzLm9uQW5jaG9yUG9zaXRpb25Nb2RpZmllZCk7XHJcblxyXG4gICAgLy8gVXBkYXRlIExpbmtcclxuICAgIGNvbnN0IG9wdHMgPSB7XHJcbiAgICAgIGNvbW1pdDogZmFsc2UsXHJcbiAgICB9O1xyXG4gICAgb3B0c1tsaW5rUG9pbnRdID0ge1xyXG4gICAgICB4OiBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5sZWZ0LFxyXG4gICAgICB5OiBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS50b3AsXHJcbiAgICB9O1xyXG4gICAgdGhpcy51cGRhdGVQYXRoKG9wdHMpO1xyXG4gIH1cclxuXHJcbiAgZGlzY29ubmVjdExpbmsobGlua1BvaW50KSB7XHJcbiAgICBpZiAodGhpc1tsaW5rUG9pbnRdKSB7XHJcbiAgICAgIHRoaXNbbGlua1BvaW50XS5zaGFwZS5hbmNob3JzW3RoaXNbbGlua1BvaW50XS5hbmNob3JdLm9mZigncGc6cG9zaXRpb246bW9kaWZ5aW5nJywgdGhpc1tsaW5rUG9pbnRdLmhhbmRsZXJzLm9uQW5jaG9yUG9zaXRpb25Nb2RpZnlpbmcpO1xyXG4gICAgICB0aGlzW2xpbmtQb2ludF0uc2hhcGUuYW5jaG9yc1t0aGlzW2xpbmtQb2ludF0uYW5jaG9yXS5vZmYoJ3BnOnBvc2l0aW9uOm1vZGlmaWVkJywgdGhpc1tsaW5rUG9pbnRdLmhhbmRsZXJzLm9uQW5jaG9yUG9zaXRpb25Nb2RpZmllZCk7XHJcbiAgICAgIGRlbGV0ZSB0aGlzW2xpbmtQb2ludF07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBicmluZ1RvRnJvbnQoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgcGF0aCxcclxuICAgICAgYXJyb3dIZWFkLFxyXG4gICAgICBhcnJvd1RhaWwsXHJcbiAgICB9ID0gdGhpcztcclxuICAgIGNhbnZhcy5icmluZ1RvRnJvbnQocGF0aCk7XHJcbiAgICBjYW52YXMuYnJpbmdUb0Zyb250KGFycm93SGVhZCk7XHJcbiAgICBjYW52YXMuYnJpbmdUb0Zyb250KGFycm93VGFpbCk7XHJcbiAgfVxyXG5cclxuICBjb21wdXRlUGF0aENvb3JkcyhvcHRpb25zKSB7XHJcbiAgICAvLyBNYWdpZSBtYWdpZSwgZXQgdm9zIGlkw6llcyBvbnQgZHUgZ8OpbmllICFcclxuXHJcbiAgICBjb25zdCBzdGFydCA9IHtcclxuICAgICAgeDogb3B0aW9ucy5zdGFydC54LFxyXG4gICAgICB5OiBvcHRpb25zLnN0YXJ0LnksXHJcbiAgICAgIGRpcmVjdGlvbjogb3B0aW9ucy5zdGFydCAmJiBvcHRpb25zLnN0YXJ0LmRpcmVjdGlvbiA/IG9wdGlvbnMuc3RhcnQuZGlyZWN0aW9uIDogdGhpcy5kaXJlY3Rpb24uc3RhcnQsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgZW5kID0ge1xyXG4gICAgICB4OiBvcHRpb25zLmVuZC54LFxyXG4gICAgICB5OiBvcHRpb25zLmVuZC55LFxyXG4gICAgICBkaXJlY3Rpb246IG9wdGlvbnMuZW5kICYmIG9wdGlvbnMuZW5kLmRpcmVjdGlvbiA/IG9wdGlvbnMuZW5kLmRpcmVjdGlvbiA6IHRoaXMuZGlyZWN0aW9uLmVuZCxcclxuICAgIH07XHJcblxyXG4gICAgLy8gQ2VudGVyIHBvaW50XHJcbiAgICAvLyBJZiBMaW5rIGlzIGNvbm5lY3RlZCwgY2VudGVyIGlzIGNhbGN1bGF0ZWQgYmV0d2VlbiB0aGUgdHdvIGxpbmtlZCBzaGFwZXNcclxuICAgIC8vIElmIG5vdCwgaXQgaXMgY2FsY3VsYXRlZCBiZXR3ZWVuIGxpbmsgc3RhcnQgYW5kIGVuZCBwb2ludHNcclxuICAgIGNvbnN0IGNlbnRlciA9IHtcclxuICAgICAgeDogKChzdGFydC54ICsgZW5kLngpIC8gMiksXHJcbiAgICAgIHk6ICgoc3RhcnQueSArIGVuZC55KSAvIDIpLFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDT01NRU5URUQ6IERvZXNuJ3Qgd29yayB3ZWxsIHdoZW4gbGlua2VkIHNoYXBlIGlzIHJvdGF0ZWRcclxuICAgIC8vIGlmICh0aGlzLnN0YXJ0ICYmIHRoaXMuZW5kICYmIHN0YXJ0LmRpcmVjdGlvbiAhPT0gZW5kLmRpcmVjdGlvbikge1xyXG4gICAgLy8gICBjZW50ZXIgPSB7XHJcbiAgICAvLyAgICAgeDogKHRoaXMuc3RhcnQuc2hhcGUuZ2V0Q2VudGVyUG9pbnQoKS54ICsgdGhpcy5lbmQuc2hhcGUuZ2V0Q2VudGVyUG9pbnQoKS54KSAvIDIsXHJcbiAgICAvLyAgICAgeTogKHRoaXMuc3RhcnQuc2hhcGUuZ2V0Q2VudGVyUG9pbnQoKS55ICsgdGhpcy5lbmQuc2hhcGUuZ2V0Q2VudGVyUG9pbnQoKS55KSAvIDIsXHJcbiAgICAvLyAgIH07XHJcbiAgICAvLyB9XHJcblxyXG4gICAgY29uc3QgY29udHJvbHMgPSB7XHJcbiAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgeDogc3RhcnQueCxcclxuICAgICAgICB5OiBzdGFydC55LFxyXG4gICAgICB9LFxyXG4gICAgICBlbmQ6IHtcclxuICAgICAgICB4OiBlbmQueCxcclxuICAgICAgICB5OiBlbmQueSxcclxuICAgICAgfSxcclxuICAgICAgY2VudGVyMToge1xyXG4gICAgICAgIHg6IGNlbnRlci54LFxyXG4gICAgICAgIHk6IGNlbnRlci55LFxyXG4gICAgICB9LFxyXG4gICAgICBjZW50ZXIyOiB7XHJcbiAgICAgICAgeDogY2VudGVyLngsXHJcbiAgICAgICAgeTogY2VudGVyLnksXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgc3dpdGNoIChvcHRpb25zLnN0YXJ0LmRpcmVjdGlvbikge1xyXG4gICAgICBjYXNlICdub3J0aCc6XHJcbiAgICAgICAgY29udHJvbHMuc3RhcnQueSAtPSBNYXRoLmFicyhzdGFydC55IC0gY2VudGVyLnkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdzb3V0aCc6XHJcbiAgICAgICAgY29udHJvbHMuc3RhcnQueSArPSBNYXRoLmFicyhzdGFydC55IC0gY2VudGVyLnkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdlYXN0JzpcclxuICAgICAgICBjb250cm9scy5zdGFydC54ICs9IE1hdGguYWJzKHN0YXJ0LnggLSBjZW50ZXIueCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3dlc3QnOlxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbnRyb2xzLnN0YXJ0LnggLT0gTWF0aC5hYnMoc3RhcnQueCAtIGNlbnRlci54KTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHN3aXRjaCAob3B0aW9ucy5lbmQuZGlyZWN0aW9uKSB7XHJcbiAgICAgIGNhc2UgJ25vcnRoJzpcclxuICAgICAgICBjb250cm9scy5lbmQueSAtPSBNYXRoLmFicyhlbmQueSAtIGNlbnRlci55KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnc291dGgnOlxyXG4gICAgICAgIGNvbnRyb2xzLmVuZC55ICs9IE1hdGguYWJzKGVuZC55IC0gY2VudGVyLnkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdlYXN0JzpcclxuICAgICAgICBjb250cm9scy5lbmQueCArPSBNYXRoLmFicyhlbmQueCAtIGNlbnRlci54KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnd2VzdCc6XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29udHJvbHMuZW5kLnggLT0gTWF0aC5hYnMoZW5kLnggLSBjZW50ZXIueCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHN0YXJ0LmRpcmVjdGlvbiA9PT0gZW5kLmRpcmVjdGlvbikge1xyXG4gICAgICAvLyBjb25zdCBkZWx0YVggPSBNYXRoLmFicyhzdGFydC54IC0gZW5kLngpIC8gMjtcclxuICAgICAgLy8gY29uc3QgZGVsdGFZID0gTWF0aC5hYnMoc3RhcnQueSAtIGVuZC55KSAvIDI7XHJcbiAgICAgIC8vIGNvbnN0IGRlbHRhWCA9IDQwICsgTWF0aC5hYnMoc3RhcnQueCAtIGVuZC54KSAvIDQ7XHJcbiAgICAgIC8vIGNvbnN0IGRlbHRhWSA9IDQwICsgTWF0aC5hYnMoc3RhcnQueSAtIGVuZC55KSAvIDQ7XHJcbiAgICAgIGNvbnN0IGRlbHRhWCA9IDQwO1xyXG4gICAgICBjb25zdCBkZWx0YVkgPSA0MDtcclxuXHJcbiAgICAgIGlmIChzdGFydC5kaXJlY3Rpb24gPT09ICdzb3V0aCcgfHwgc3RhcnQuZGlyZWN0aW9uID09PSAnbm9ydGgnKSB7XHJcbiAgICAgICAgLy8gSWYgbGluayBpcyBjb25uZWN0ZWQgdG8gdHdvIHNoYXBlc1xyXG4gICAgICAgIC8vIElmIHNoYXBlcyBhcmUgaG9yaXpvbnRhbGx5IGFsaWduZWQgKGkuZS4gb24gdG9wIG9mIGVhY2ggb3RoZXIpLCB3ZSBtb3ZlIHRoZSBMaW5rIGNlbnRlciBwb2ludCBhIGJpdCB0byB0aGUgbGVmdFxyXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0ICYmIHRoaXMuZW5kKSB7XHJcbiAgICAgICAgICAvLyBJZiBzaGFwZXMgYXJlIHZlcnRpY2FsbHkgYWxpZ25lZCAoaS5lLiBuZXh0IHRvIGVhY2ggb3RoZXIpLCB3ZSBtb3ZlIHRoZSBMaW5rIGNlbnRlciBwb2ludCBhIGJpdCB0byB0aGUgdG9wXHJcbiAgICAgICAgICBpZiAoTWF0aC5hYnMoc3RhcnQueSAtIGVuZC55KSA8IDEwKSB7XHJcbiAgICAgICAgICAgIGNlbnRlci54IC09ICgodGhpcy5zdGFydC5zaGFwZS53aWR0aCArIHRoaXMuZW5kLnNoYXBlLndpZHRoKSAvIDIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2VudGVyLnkgKz0gKHN0YXJ0LmRpcmVjdGlvbiA9PT0gJ3NvdXRoJyA/IGRlbHRhWSA6IC1kZWx0YVkpO1xyXG4gICAgICAgIGNvbnRyb2xzLnN0YXJ0LnkgPSBzdGFydC55ICsgKHN0YXJ0LmRpcmVjdGlvbiA9PT0gJ3NvdXRoJyA/IGRlbHRhWSA6IC1kZWx0YVkpO1xyXG4gICAgICAgIGNvbnRyb2xzLmVuZC55ID0gZW5kLnkgKyAoc3RhcnQuZGlyZWN0aW9uID09PSAnc291dGgnID8gZGVsdGFZIDogLWRlbHRhWSk7XHJcbiAgICAgICAgY29udHJvbHMuY2VudGVyMS54ID0gY2VudGVyLng7XHJcbiAgICAgICAgY29udHJvbHMuY2VudGVyMi54ID0gY2VudGVyLng7XHJcbiAgICAgICAgY29udHJvbHMuY2VudGVyMS55ID0gY29udHJvbHMuc3RhcnQueTtcclxuICAgICAgICBjb250cm9scy5jZW50ZXIyLnkgPSBjb250cm9scy5lbmQueTtcclxuICAgICAgfSBlbHNlIGlmIChzdGFydC5kaXJlY3Rpb24gPT09ICdlYXN0JyB8fCBzdGFydC5kaXJlY3Rpb24gPT09ICd3ZXN0Jykge1xyXG4gICAgICAgIC8vIElmIGxpbmsgaXMgY29ubmVjdGVkIHRvIHR3byBzaGFwZXNcclxuICAgICAgICBpZiAodGhpcy5zdGFydCAmJiB0aGlzLmVuZCkge1xyXG4gICAgICAgICAgLy8gSWYgc2hhcGVzIGFyZSB2ZXJ0aWNhbGx5IGFsaWduZWQgKGkuZS4gbmV4dCB0byBlYWNoIG90aGVyKSwgd2UgbW92ZSB0aGUgTGluayBjZW50ZXIgcG9pbnQgYSBiaXQgdG8gdGhlIHRvcFxyXG4gICAgICAgICAgaWYgKE1hdGguYWJzKHN0YXJ0LnkgLSBlbmQueSkgPCAxMCkge1xyXG4gICAgICAgICAgICBjZW50ZXIueSAtPSAoKHRoaXMuc3RhcnQuc2hhcGUuaGVpZ2h0ICsgdGhpcy5lbmQuc2hhcGUuaGVpZ2h0KSAvIDIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2VudGVyLnggKz0gKHN0YXJ0LmRpcmVjdGlvbiA9PT0gJ2Vhc3QnID8gZGVsdGFYIDogLWRlbHRhWCk7XHJcbiAgICAgICAgY29udHJvbHMuc3RhcnQueCA9IHN0YXJ0LnggKyAoc3RhcnQuZGlyZWN0aW9uID09PSAnZWFzdCcgPyBkZWx0YVggOiAtZGVsdGFYKTtcclxuICAgICAgICBjb250cm9scy5lbmQueCA9IGVuZC54ICsgKHN0YXJ0LmRpcmVjdGlvbiA9PT0gJ2Vhc3QnID8gZGVsdGFYIDogLWRlbHRhWCk7XHJcbiAgICAgICAgY29udHJvbHMuY2VudGVyMS54ID0gY29udHJvbHMuc3RhcnQueDtcclxuICAgICAgICBjb250cm9scy5jZW50ZXIyLnggPSBjb250cm9scy5lbmQueDtcclxuICAgICAgICBjb250cm9scy5jZW50ZXIxLnkgPSBjZW50ZXIueTtcclxuICAgICAgICBjb250cm9scy5jZW50ZXIyLnkgPSBjZW50ZXIueTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChzdGFydC5kaXJlY3Rpb24gPT09ICdzb3V0aCcgfHwgc3RhcnQuZGlyZWN0aW9uID09PSAnbm9ydGgnKSB7XHJcbiAgICAgIGNvbnRyb2xzLmNlbnRlcjEueCA9IGNlbnRlci54O1xyXG4gICAgICBjb250cm9scy5jZW50ZXIxLnkgPSBjb250cm9scy5zdGFydC55O1xyXG4gICAgICBjb250cm9scy5jZW50ZXIyLnggPSBjZW50ZXIueDtcclxuICAgICAgY29udHJvbHMuY2VudGVyMi55ID0gY29udHJvbHMuZW5kLnk7XHJcbiAgICB9IGVsc2UgaWYgKHN0YXJ0LmRpcmVjdGlvbiA9PT0gJ2Vhc3QnIHx8IHN0YXJ0LmRpcmVjdGlvbiA9PT0gJ3dlc3QnKSB7XHJcbiAgICAgIGNvbnRyb2xzLmNlbnRlcjEueCA9IGNvbnRyb2xzLnN0YXJ0Lng7XHJcbiAgICAgIGNvbnRyb2xzLmNlbnRlcjEueSA9IGNlbnRlci55O1xyXG4gICAgICBjb250cm9scy5jZW50ZXIyLnggPSBjb250cm9scy5lbmQueDtcclxuICAgICAgY29udHJvbHMuY2VudGVyMi55ID0gY2VudGVyLnk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSWYgbGluayBpcyBjb25uZWN0ZWQgdG8gbGlua2VkIHNoYXBlcyBhbmQgdGhleSBhcmUgcm90YXRlZCwgcGVyZm9ybSB0aGUgcm90YXRpb24gb24gdGhlIGNvbnRyb2xzIHBvaW50c1xyXG4gICAgLy8gVE9ETzogdG8gaW1wcm92ZVxyXG4gICAgaWYgKHRoaXMuc3RhcnQgJiYgdGhpcy5zdGFydC5zaGFwZSAmJiB0aGlzLnN0YXJ0LnNoYXBlLmFuZ2xlKSB7XHJcbiAgICAgIGNvbnN0IGFuZ2xlID0gKCh0aGlzLnN0YXJ0LnNoYXBlLmFuZ2xlICogTWF0aC5QSSkgLyAxODApO1xyXG5cclxuICAgICAgY29uc3QgY29udHJvbCA9IG5ldyBmYWJyaWMuUG9pbnQoY29udHJvbHMuc3RhcnQueCwgY29udHJvbHMuc3RhcnQueSk7XHJcbiAgICAgIGNvbnN0IG9yaWdpbiA9IG5ldyBmYWJyaWMuUG9pbnQoc3RhcnQueCwgc3RhcnQueSk7XHJcbiAgICAgIGNvbnN0IHJvdGF0ZWRDb250cm9sID0gZmFicmljLnV0aWwucm90YXRlUG9pbnQoY29udHJvbCwgb3JpZ2luLCBhbmdsZSk7XHJcblxyXG4gICAgICBjb250cm9scy5zdGFydC54ID0gcm90YXRlZENvbnRyb2wueDtcclxuICAgICAgY29udHJvbHMuc3RhcnQueSA9IHJvdGF0ZWRDb250cm9sLnk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5lbmQgJiYgdGhpcy5lbmQuc2hhcGUgJiYgdGhpcy5lbmQuc2hhcGUuYW5nbGUpIHtcclxuICAgICAgY29uc3QgYW5nbGUgPSAoKHRoaXMuZW5kLnNoYXBlLmFuZ2xlICogTWF0aC5QSSkgLyAxODApO1xyXG5cclxuICAgICAgY29uc3QgY29udHJvbCA9IG5ldyBmYWJyaWMuUG9pbnQoY29udHJvbHMuZW5kLngsIGNvbnRyb2xzLmVuZC55KTtcclxuICAgICAgY29uc3Qgb3JpZ2luID0gbmV3IGZhYnJpYy5Qb2ludChlbmQueCwgZW5kLnkpO1xyXG4gICAgICBjb25zdCByb3RhdGVkQ29udHJvbCA9IGZhYnJpYy51dGlsLnJvdGF0ZVBvaW50KGNvbnRyb2wsIG9yaWdpbiwgYW5nbGUpO1xyXG5cclxuICAgICAgY29udHJvbHMuZW5kLnggPSByb3RhdGVkQ29udHJvbC54O1xyXG4gICAgICBjb250cm9scy5lbmQueSA9IHJvdGF0ZWRDb250cm9sLnk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVmlzdWFsIGRlYnVnXHJcbiAgICAvLyB0aGlzLmNhbnZhcy5hZGQobmV3IGZhYnJpYy5DaXJjbGUoe1xyXG4gICAgLy8gICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgIC8vICAgbGVmdDogY29udHJvbHMuZW5kLngsXHJcbiAgICAvLyAgIHRvcDogY29udHJvbHMuZW5kLnksXHJcbiAgICAvLyAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgLy8gICByYWRpdXM6IDIsXHJcbiAgICAvLyAgIGZpbGw6ICcjNzhiZWZhJyxcclxuICAgIC8vICAgc3Ryb2tlOiAnIzc4YmVmYScsXHJcbiAgICAvLyAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgLy8gICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgIC8vICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAvLyAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgIC8vICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgIC8vICAgb3BhY2l0eTogMSxcclxuICAgIC8vIH0pKTtcclxuICAgIC8vIHRoaXMuY2FudmFzLmFkZChuZXcgZmFicmljLkNpcmNsZSh7XHJcbiAgICAvLyAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgLy8gICBsZWZ0OiBjZW50ZXIueCxcclxuICAgIC8vICAgdG9wOiBjZW50ZXIueSxcclxuICAgIC8vICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAvLyAgIHJhZGl1czogMixcclxuICAgIC8vICAgZmlsbDogJyNmZjInLFxyXG4gICAgLy8gICBzdHJva2U6ICcjZmYyJyxcclxuICAgIC8vICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAvLyAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgLy8gICBoYXNCb3JkZXJzOiBmYWxzZSxcclxuICAgIC8vICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgLy8gICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgLy8gICBvcGFjaXR5OiAxLFxyXG4gICAgLy8gfSkpO1xyXG4gICAgLy8gdGhpcy5jYW52YXMuYWRkKG5ldyBmYWJyaWMuQ2lyY2xlKHtcclxuICAgIC8vICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAvLyAgIGxlZnQ6IGNvbnRyb2xzLnN0YXJ0LngsXHJcbiAgICAvLyAgIHRvcDogY29udHJvbHMuc3RhcnQueSxcclxuICAgIC8vICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAvLyAgIHJhZGl1czogMixcclxuICAgIC8vICAgZmlsbDogJyNmMjInLFxyXG4gICAgLy8gICBzdHJva2U6ICcjZjIyJyxcclxuICAgIC8vICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAvLyAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgLy8gICBoYXNCb3JkZXJzOiBmYWxzZSxcclxuICAgIC8vICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgLy8gICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgLy8gICBvcGFjaXR5OiAxLFxyXG4gICAgLy8gfSkpO1xyXG5cclxuICAgIGNvbnN0IGNvb3JkcyA9IHtcclxuICAgICAgc3RhcnQ6IHtcclxuICAgICAgICB4OiBzdGFydC54LFxyXG4gICAgICAgIHk6IHN0YXJ0LnksXHJcbiAgICAgIH0sXHJcbiAgICAgIGVuZDoge1xyXG4gICAgICAgIHg6IGVuZC54LFxyXG4gICAgICAgIHk6IGVuZC55LFxyXG4gICAgICB9LFxyXG4gICAgICBjZW50ZXIsXHJcbiAgICAgIGNvbnRyb2xzOiB7XHJcbiAgICAgICAgc3RhcnQ6IHtcclxuICAgICAgICAgIHg6IGNvbnRyb2xzLnN0YXJ0LngsXHJcbiAgICAgICAgICB5OiBjb250cm9scy5zdGFydC55LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW5kOiB7XHJcbiAgICAgICAgICB4OiBjb250cm9scy5lbmQueCxcclxuICAgICAgICAgIHk6IGNvbnRyb2xzLmVuZC55LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2VudGVyMToge1xyXG4gICAgICAgICAgeDogY29udHJvbHMuY2VudGVyMS54LFxyXG4gICAgICAgICAgeTogY29udHJvbHMuY2VudGVyMS55LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2VudGVyMjoge1xyXG4gICAgICAgICAgeDogY29udHJvbHMuY2VudGVyMi54LFxyXG4gICAgICAgICAgeTogY29udHJvbHMuY2VudGVyMi55LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgY29uc3QgcGF0aENvb3Jkc0FycmF5ID0gW1xyXG4gICAgICBbJ00nLCBjb29yZHMuc3RhcnQueCwgY29vcmRzLnN0YXJ0LnldLFxyXG4gICAgICBbJ0MnLCBjb29yZHMuY29udHJvbHMuc3RhcnQueCwgY29vcmRzLmNvbnRyb2xzLnN0YXJ0LnksIGNvb3Jkcy5jb250cm9scy5jZW50ZXIxLngsIGNvb3Jkcy5jb250cm9scy5jZW50ZXIxLnksIGNvb3Jkcy5jZW50ZXIueCwgY29vcmRzLmNlbnRlci55XSxcclxuICAgICAgWydDJywgY29vcmRzLmNvbnRyb2xzLmNlbnRlcjIueCwgY29vcmRzLmNvbnRyb2xzLmNlbnRlcjIueSwgY29vcmRzLmNvbnRyb2xzLmVuZC54LCBjb29yZHMuY29udHJvbHMuZW5kLnksIGNvb3Jkcy5lbmQueCwgY29vcmRzLmVuZC55XSxcclxuICAgIF07XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBwYXRoQ29vcmRzOiBjb29yZHMsXHJcbiAgICAgIHBhdGhDb29yZHNBcnJheSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqIEBwYXJhbSBvcHRpb25zXHJcbiAgICogQHBhcmFtIG9wdGlvbnMuc3RhcnQueFxyXG4gICAqIEBwYXJhbSBvcHRpb25zLnN0YXJ0LnlcclxuICAgKiBAcGFyYW0gb3B0aW9ucy5lbmQueFxyXG4gICAqIEBwYXJhbSBvcHRpb25zLmVuZC55XHJcbiAgICogQHBhcmFtIG9wdGlvbnMuY29tbWl0XHJcbiAgICovXHJcbiAgdXBkYXRlUGF0aChvcHRpb25zKSB7XHJcbiAgICBjb25zdCBzdGFydCA9IHtcclxuICAgICAgeDogb3B0aW9ucy5zdGFydCAmJiBvcHRpb25zLnN0YXJ0LnggPyBvcHRpb25zLnN0YXJ0LnggOiB0aGlzLnBhdGgucGF0aFswXVsxXSxcclxuICAgICAgeTogb3B0aW9ucy5zdGFydCAmJiBvcHRpb25zLnN0YXJ0LnkgPyBvcHRpb25zLnN0YXJ0LnkgOiB0aGlzLnBhdGgucGF0aFswXVsyXSxcclxuICAgICAgZGlyZWN0aW9uOiBvcHRpb25zLnN0YXJ0ICYmIG9wdGlvbnMuc3RhcnQuZGlyZWN0aW9uID8gb3B0aW9ucy5zdGFydC5kaXJlY3Rpb24gOiB0aGlzLmRpcmVjdGlvbi5zdGFydCxcclxuICAgIH07XHJcbiAgICBjb25zdCBlbmQgPSB7XHJcbiAgICAgIHg6IG9wdGlvbnMuZW5kICYmIG9wdGlvbnMuZW5kLnggPyBvcHRpb25zLmVuZC54IDogdGhpcy5wYXRoLnBhdGhbMl1bNV0sXHJcbiAgICAgIHk6IG9wdGlvbnMuZW5kICYmIG9wdGlvbnMuZW5kLnkgPyBvcHRpb25zLmVuZC55IDogdGhpcy5wYXRoLnBhdGhbMl1bNl0sXHJcbiAgICAgIGRpcmVjdGlvbjogb3B0aW9ucy5lbmQgJiYgb3B0aW9ucy5lbmQuZGlyZWN0aW9uID8gb3B0aW9ucy5lbmQuZGlyZWN0aW9uIDogdGhpcy5kaXJlY3Rpb24uZW5kLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHsgcGF0aENvb3Jkc0FycmF5IH0gPSB0aGlzLmNvbXB1dGVQYXRoQ29vcmRzKHtcclxuICAgICAgc3RhcnQsIGVuZCxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChvcHRpb25zLmNvbW1pdCkge1xyXG4gICAgICBjb25zdCBuZXdQYXRoID0gbmV3IGZhYnJpYy5QYXRoKHBhdGhDb29yZHNBcnJheSwgdGhpcy5kZWZhdWx0UGF0aE9wdGlvbnMpO1xyXG4gICAgICB0aGlzLmNhbnZhcy5yZW1vdmUodGhpcy5wYXRoKTtcclxuICAgICAgdGhpcy5jYW52YXMuYWRkKG5ld1BhdGgpO1xyXG5cclxuICAgICAgbmV3UGF0aC5vbignbW91c2Vkb3duJywgdGhpcy5icmluZ1RvRnJvbnQuYmluZCh0aGlzKSk7XHJcbiAgICAgIG5ld1BhdGgub24oJ21vdmluZycsIHRoaXMub25MaW5rTW92aW5nLmJpbmQodGhpcykpO1xyXG4gICAgICBuZXdQYXRoLm9uKCdtb3ZlZCcsIHRoaXMub25MaW5rTW92ZWQuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICBjb25zdCB0b0JpbmQgPSBbXHJcbiAgICAgICAgdGhpcy5hcnJvd0hlYWQsXHJcbiAgICAgICAgdGhpcy5hcnJvd1RhaWwsXHJcbiAgICAgIF07XHJcbiAgICAgIGNvbnN0IGJvc3NUcmFuc2Zvcm0gPSBuZXdQYXRoLmNhbGNUcmFuc2Zvcm1NYXRyaXgoKTtcclxuICAgICAgY29uc3QgaW52ZXJ0ZWRCb3NzVHJhbnNmb3JtID0gZmFicmljLnV0aWwuaW52ZXJ0VHJhbnNmb3JtKGJvc3NUcmFuc2Zvcm0pO1xyXG4gICAgICB0b0JpbmQuZm9yRWFjaCgobykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRlc2lyZWRUcmFuc2Zvcm0gPSBmYWJyaWMudXRpbC5tdWx0aXBseVRyYW5zZm9ybU1hdHJpY2VzKFxyXG4gICAgICAgICAgaW52ZXJ0ZWRCb3NzVHJhbnNmb3JtLFxyXG4gICAgICAgICAgby5jYWxjVHJhbnNmb3JtTWF0cml4KCksXHJcbiAgICAgICAgKTtcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cclxuICAgICAgICBvLnJlbGF0aW9uc2hpcCA9IGRlc2lyZWRUcmFuc2Zvcm07XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5wYXRoID0gbmV3UGF0aDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGF0aC5zZXQoJ3BhdGgnLCBwYXRoQ29vcmRzQXJyYXkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFVwZGF0ZSBjb250cm9sIGxpbmVzLCBhcnJvdyBoZWFkcyBhbmQgdGFpbHNcclxuICAgIGNvbnN0IGFycm93SGVhZEFuZ2xlID0gKE1hdGguYXRhbjIodGhpcy5wYXRoLnBhdGhbMl1bNl0gLSB0aGlzLnBhdGgucGF0aFsyXVs0XSwgdGhpcy5wYXRoLnBhdGhbMl1bNV0gLSB0aGlzLnBhdGgucGF0aFsyXVszXSkgKiAxODApIC8gTWF0aC5QSTtcclxuICAgIHRoaXMuYXJyb3dIZWFkLmFuZ2xlID0gYXJyb3dIZWFkQW5nbGUgKyA5MDtcclxuICAgIHRoaXMuYXJyb3dIZWFkLmxlZnQgPSB0aGlzLnBhdGgucGF0aFsyXVs1XTtcclxuICAgIHRoaXMuYXJyb3dIZWFkLnRvcCA9IHRoaXMucGF0aC5wYXRoWzJdWzZdO1xyXG4gICAgdGhpcy5hcnJvd0hlYWQuc2V0Q29vcmRzKCk7XHJcbiAgICB0aGlzLmFycm93VGFpbC5sZWZ0ID0gdGhpcy5wYXRoLnBhdGhbMF1bMV07XHJcbiAgICB0aGlzLmFycm93VGFpbC50b3AgPSB0aGlzLnBhdGgucGF0aFswXVsyXTtcclxuICAgIHRoaXMuYXJyb3dUYWlsLnNldENvb3JkcygpO1xyXG5cclxuICAgIHRoaXMuYnJpbmdUb0Zyb250KCk7XHJcbiAgfVxyXG5cclxuICBpc1ZhbGlkQ29ubmVjdGlvbihsaW5rUG9pbnQsIHNoYXBlSWQsIGNhcmRpbmFsKSB7XHJcbiAgICBjb25zdCBzaGFwZSA9IHRoaXMuY2FudmFzLmdldE9iamVjdHMoKVxyXG4gICAgICAuZmluZCgobykgPT4gby5pZCA9PT0gc2hhcGVJZCk7XHJcbiAgICAvLyBDaGVjayBub3QgYWxyZWFkeSBjb25uZWN0ZWRcclxuICAgIGlmIChsaW5rUG9pbnQgPT09ICdzdGFydCcpIHtcclxuICAgICAgaWYgKHRoaXMuc3RhcnQgJiYgdGhpcy5zdGFydC5zaGFwZSAmJiB0aGlzLnN0YXJ0LnNoYXBlLmlkID09PSBzaGFwZS5pZCAmJiB0aGlzLnN0YXJ0LmNhcmRpbmFsID09PSBjYXJkaW5hbCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTsgLy8gdHJ5aW5nIGVuZCBzZXQgdGhlIHNhbWUgYWxyZWFkeSBjb25uZWN0ZWQgYW5jaG9yXHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuZW5kICYmIHRoaXMuZW5kLnNoYXBlICYmIHRoaXMuZW5kLnNoYXBlLmlkID09PSBzaGFwZS5pZCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTsgLy8gdHJ5aW5nIGVuZCBzaG9ydCBjaXJjdWl0IHRoZSByZWN0YW5nbGVcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChsaW5rUG9pbnQgPT09ICdlbmQnKSB7XHJcbiAgICAgIGlmICh0aGlzLmVuZCAmJiB0aGlzLmVuZC5zaGFwZSAmJiB0aGlzLmVuZC5zaGFwZS5pZCA9PT0gc2hhcGUuaWQgJiYgdGhpcy5lbmQuY2FyZGluYWwgPT09IGNhcmRpbmFsKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyB0cnlpbmcgZW5kIHNldCB0aGUgc2FtZSBhbHJlYWR5IGNvbm5lY3RlZCBhbmNob3JcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5zdGFydCAmJiB0aGlzLnN0YXJ0LnNoYXBlICYmIHRoaXMuc3RhcnQuc2hhcGUuaWQgPT09IHNoYXBlLmlkKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyB0cnlpbmcgZW5kIHNob3J0IGNpcmN1aXQgdGhlIHJlY3RhbmdsZVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KG9wYWNpdHkpIHtcclxuICAgIGNvbnN0IGFuY2hvcnMgPSB0aGlzLmNhbnZhcy5nZXRPYmplY3RzKClcclxuICAgICAgLmZpbHRlcigobykgPT4gby50eXBlID09PSAnYW5jaG9yJyk7XHJcblxyXG4gICAgLy8gY29uc3QgcHJvbWlzZXMgPSBbXTtcclxuICAgIC8vIGNvbnN0IHByb21pc2VGYWN0b3J5ID0gZnVuY3Rpb24gKGFuY2hvcikge1xyXG4gICAgLy8gICByZXR1cm4gZnVuY3Rpb24gKHJlc29sdmUpIHtcclxuICAgIC8vICAgICBhbmNob3IuYW5pbWF0ZSgnb3BhY2l0eScsIG9wYWNpdHksIHtcclxuICAgIC8vICAgICAgIGR1cmF0aW9uOiAzMDAsXHJcbiAgICAvLyAgICAgICBvbkNoYW5nZTogcmVzb2x2ZSxcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vICAgfTtcclxuICAgIC8vIH07XHJcbiAgICAvLyBmb3IgKGxldCBhID0gMDsgYSA8IGFuY2hvcnMubGVuZ3RoOyBhICs9IDEpIHtcclxuICAgIC8vICAgaWYgKGxvY2sgIT09IHVuZGVmaW5lZCkgYW5jaG9yc1thXS5sb2NrT3BhY2l0eSA9IGxvY2s7XHJcbiAgICAvLyAgIHByb21pc2VzLnB1c2gobmV3IFByb21pc2UocHJvbWlzZUZhY3RvcnkoYW5jaG9yc1thXSkpKTtcclxuICAgIC8vIH1cclxuICAgIC8vIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IHtcclxuICAgIC8vICAgdGhpcy5jYW52YXMucmVuZGVyQWxsKCk7XHJcbiAgICAvLyB9KTtcclxuXHJcbiAgICBmb3IgKGxldCBhID0gMDsgYSA8IGFuY2hvcnMubGVuZ3RoOyBhICs9IDEpIHtcclxuICAgICAgLy8gaWYgKGxvY2sgIT09IHVuZGVmaW5lZCkgYW5jaG9yc1thXS5sb2NrT3BhY2l0eSA9IGxvY2s7XHJcbiAgICAgIGFuY2hvcnNbYV0uc2V0KCdvcGFjaXR5Jywgb3BhY2l0eSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNhbnZhcy5yZW5kZXJBbGwoKTtcclxuICB9XHJcblxyXG4gIG9uTGlua01vdmluZygpIHtcclxuICAgIC8vIE1vdmUgc3RhcnQsIGVuZCwgY29udHJvbCBwb2ludHMgYWx0b2dldGhlciB3aXRoIHRoZSBQYXRoXHJcbiAgICBjb25zdCB0b1VwZGF0ZSA9IFtcclxuICAgICAgdGhpcy5hcnJvd0hlYWQsXHJcbiAgICAgIHRoaXMuYXJyb3dUYWlsLFxyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdCBrZWVwSGVhZEFuZ2xlID0gdGhpcy5hcnJvd0hlYWQuYW5nbGU7XHJcbiAgICBjb25zdCBrZWVwVGFpbEFuZ2xlID0gdGhpcy5hcnJvd1RhaWwuYW5nbGU7XHJcblxyXG4gICAgdG9VcGRhdGUuZm9yRWFjaCgobykgPT4ge1xyXG4gICAgICBpZiAoIW8ucmVsYXRpb25zaGlwKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHsgcmVsYXRpb25zaGlwIH0gPSBvO1xyXG4gICAgICBjb25zdCBuZXdUcmFuc2Zvcm0gPSBmYWJyaWMudXRpbC5tdWx0aXBseVRyYW5zZm9ybU1hdHJpY2VzKFxyXG4gICAgICAgIHRoaXMucGF0aC5jYWxjVHJhbnNmb3JtTWF0cml4KCksXHJcbiAgICAgICAgcmVsYXRpb25zaGlwLFxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBvcHQgPSBmYWJyaWMudXRpbC5xckRlY29tcG9zZShuZXdUcmFuc2Zvcm0pO1xyXG4gICAgICBvLnNldCh7XHJcbiAgICAgICAgZmxpcFg6IGZhbHNlLFxyXG4gICAgICAgIGZsaXBZOiBmYWxzZSxcclxuICAgICAgfSk7XHJcbiAgICAgIG8uc2V0UG9zaXRpb25CeU9yaWdpbihcclxuICAgICAgICB7IHg6IG9wdC50cmFuc2xhdGVYLCB5OiBvcHQudHJhbnNsYXRlWSB9LFxyXG4gICAgICAgICdjZW50ZXInLFxyXG4gICAgICAgICdjZW50ZXInLFxyXG4gICAgICApO1xyXG4gICAgICBvLnNldChvcHQpO1xyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cclxuICAgICAgby5hbmdsZSA9IChvID09PSB0aGlzLmFycm93SGVhZCkgPyBrZWVwSGVhZEFuZ2xlIDoga2VlcFRhaWxBbmdsZTsgLy8gcHJlc2VydmUgcHJldmlvdXMgYW5nbGVcclxuXHJcbiAgICAgIG8uc2V0Q29vcmRzKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBGaW5hbGx5LCBjaGVjayB0aGUgc3RhcnQgb3IgZW5kIHBvaW50cyBjYW4gYmUgY29ubmVjdGVkLlxyXG4gICAgdGhpcy5fY2hlY2tFeHRyZW1pdHlDYW5CZUNvbm5lY3RlZCgnc3RhcnQnKTtcclxuICAgIHRoaXMuX2NoZWNrRXh0cmVtaXR5Q2FuQmVDb25uZWN0ZWQoJ2VuZCcpO1xyXG4gIH1cclxuXHJcbiAgb25MaW5rTW92ZWQoKSB7XHJcbiAgICAvLyBSZXVwZGF0ZSB0aGUgUGF0aCBhY2NvcmRpbmcgZW5kIHRoZSBuZXcgY29vcmRpbmF0ZXMgb2YgYWxsIGVsZW1lbnRzXHJcbiAgICB0aGlzLnVwZGF0ZVBhdGgoe1xyXG4gICAgICBzdGFydDoge1xyXG4gICAgICAgIHg6IHRoaXMuYXJyb3dUYWlsLmxlZnQsXHJcbiAgICAgICAgeTogdGhpcy5hcnJvd1RhaWwudG9wLFxyXG4gICAgICB9LFxyXG4gICAgICBlbmQ6IHtcclxuICAgICAgICB4OiB0aGlzLmFycm93SGVhZC5sZWZ0LFxyXG4gICAgICAgIHk6IHRoaXMuYXJyb3dIZWFkLnRvcCxcclxuICAgICAgfSxcclxuICAgICAgY29tbWl0OiB0cnVlLFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQ29ubmVjdCBvciBEaXNjb25uZWN0IGRlcGVuZGluZyBvbiBleHRyZW1pdGllcyBwb3NpdGlvbnNcclxuICAgIHRoaXMuaXNWYWxpZFRhaWxDb25uZWN0aW9uTWFzay5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgIHRoaXMuaXNWYWxpZEhlYWRDb25uZWN0aW9uTWFzay5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgIHRoaXMuX2Nvbm5lY3REaXNjb25uZWN0RXh0cmVtaXR5KCdzdGFydCcpO1xyXG4gICAgdGhpcy5fY29ubmVjdERpc2Nvbm5lY3RFeHRyZW1pdHkoJ2VuZCcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGVscGVyIGVuZCBkaXNwbGF5IGEgdmFsaWQgY2lyY2xlIG1hc2sgb24gc3BlY2lmaWMgY29uZGl0aW9ucy5cclxuICAgKiBJZiB0aGUgZXh0cmVtaXR5IGlzIHRvdWNoaW5nIGFuIGFuY2hvciBvZiBhIExpbmthYmxlU2hhcGUgc3RhcnQgd2hpY2ggaXQgaXMgbm90IHlldCBjb25uZWN0ZWQgPT4gc2hvdyBHUkVFTlxyXG4gICAqIElmIHRoZSBleHRyZW1pdHkgaXMgdG91Y2hpbmcgYW4gYW5jaG9yIG9mIGEgTGlua2FibGVTaGFwZSBzdGFydCB3aGljaCBpdCBpcyBhbHJlYWR5IGNvbm5lY3RlZCBieSB0aGUgb3RoZXIgZXh0cmVtaXR5ID0+IHNob3cgUkVEXHJcbiAgICogQHBhcmFtIGRpcmVjdGlvblxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX2NoZWNrRXh0cmVtaXR5Q2FuQmVDb25uZWN0ZWQoZGlyZWN0aW9uKSB7XHJcbiAgICBjb25zdCB7IGNhbnZhcyB9ID0gdGhpcztcclxuXHJcbiAgICBsZXQgZXh0cmVtaXR5O1xyXG4gICAgbGV0IG1hc2s7XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSAnc3RhcnQnKSB7XHJcbiAgICAgIGV4dHJlbWl0eSA9IHRoaXMuYXJyb3dUYWlsO1xyXG4gICAgICBtYXNrID0gdGhpcy5pc1ZhbGlkVGFpbENvbm5lY3Rpb25NYXNrO1xyXG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdlbmQnKSB7XHJcbiAgICAgIGV4dHJlbWl0eSA9IHRoaXMuYXJyb3dIZWFkO1xyXG4gICAgICBtYXNrID0gdGhpcy5pc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrO1xyXG4gICAgfVxyXG5cclxuICAgIG1hc2subGVmdCA9IGV4dHJlbWl0eS5sZWZ0O1xyXG4gICAgbWFzay50b3AgPSBleHRyZW1pdHkudG9wO1xyXG4gICAgbWFzay5zZXRDb29yZHMoKTtcclxuICAgIG1hc2suc2V0KCdvcGFjaXR5JywgMCk7XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgaW50ZXJzZWN0cyB3aXRoIGFuY2hvclxyXG4gICAgY29uc3QgYW5jaG9ycyA9IGNhbnZhcy5nZXRPYmplY3RzKClcclxuICAgICAgLmZpbHRlcigobykgPT4gby50eXBlID09PSAnYW5jaG9yJyk7XHJcbiAgICBleHRyZW1pdHkuc2V0KCdzdHJva2UnLCAnIzAwMCcpO1xyXG4gICAgZm9yIChsZXQgYSA9IDA7IGEgPCBhbmNob3JzLmxlbmd0aDsgYSArPSAxKSB7XHJcbiAgICAgIGlmIChleHRyZW1pdHkuaW50ZXJzZWN0c1dpdGhPYmplY3QoYW5jaG9yc1thXSkpIHtcclxuICAgICAgICBtYXNrLnNldCgnb3BhY2l0eScsIDAuNSk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZENvbm5lY3Rpb24oZGlyZWN0aW9uLCBhbmNob3JzW2FdLnNoYXBlSWQsIGFuY2hvcnNbYV0uY2FyZGluYWwpKSB7XHJcbiAgICAgICAgICBtYXNrLnNldCh7XHJcbiAgICAgICAgICAgIHN0cm9rZTogJyM1N2I4NTcnLFxyXG4gICAgICAgICAgICBmaWxsOiAnIzU3Yjg1NycsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGV4dHJlbWl0eS5zZXQoJ3N0cm9rZScsICcjNWY1Jyk7XHJcbiAgICAgICAgICBjb25zdCBvcHRzID0ge1xyXG4gICAgICAgICAgICBjb21taXQ6IGZhbHNlLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIG9wdHNbZGlyZWN0aW9uXSA9IHtcclxuICAgICAgICAgICAgeDogZXh0cmVtaXR5LmxlZnQsXHJcbiAgICAgICAgICAgIHk6IGV4dHJlbWl0eS50b3AsXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbjogYW5jaG9yc1thXS5jYXJkaW5hbCxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZVBhdGgob3B0cyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG1hc2suc2V0KHtcclxuICAgICAgICAgICAgc3Ryb2tlOiAnI2VhNGYzNycsXHJcbiAgICAgICAgICAgIGZpbGw6ICcjZWE0ZjM3JyxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgZXh0cmVtaXR5LnNldCgnc3Ryb2tlJywgJyNlYTRmMzcnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhlbHBlciBlbmQgZXhlY3V0ZSBjb25uZWN0L2Rpc2Nvbm5lY3QgZGVwZW5kaW5nIG9uIHNwZWNpZmljIGNvbmRpdGlvbnMuXHJcbiAgICogSWYgdGhlIGV4dHJlbWl0eSB3YXMgY29ubmVjdGVkIEFORCBpdCBpcyBOT1QgdG91Y2hpbmcgdGhlIGFuY2hvciBhbnltb3JlID0+IGRpc2Nvbm5lY3QgaXQuXHJcbiAgICogSWYgdGhlIGV4dHJlbWl0eSB3YXMgZGlzY29ubmVjdGVkIEFORCBpdCBpcyB0b3VjaGluZyB0aGUgYW5jaG9yID0+IGNvbm5lY3QgaXQuXHJcbiAgICogQHBhcmFtIGRpcmVjdGlvblxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX2Nvbm5lY3REaXNjb25uZWN0RXh0cmVtaXR5KGRpcmVjdGlvbikge1xyXG4gICAgY29uc3QgeyBjYW52YXMgfSA9IHRoaXM7XHJcblxyXG4gICAgbGV0IGV4dHJlbWl0eTtcclxuICAgIGlmIChkaXJlY3Rpb24gPT09ICdzdGFydCcpIHtcclxuICAgICAgZXh0cmVtaXR5ID0gdGhpcy5hcnJvd1RhaWw7XHJcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ2VuZCcpIHtcclxuICAgICAgZXh0cmVtaXR5ID0gdGhpcy5hcnJvd0hlYWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgaW50ZXJzZWN0cyB3aXRoIGFuY2hvclxyXG4gICAgY29uc3QgYW5jaG9ycyA9IGNhbnZhcy5nZXRPYmplY3RzKClcclxuICAgICAgLmZpbHRlcigobykgPT4gby50eXBlID09PSAnYW5jaG9yJyk7XHJcbiAgICBmb3IgKGxldCBhID0gMDsgYSA8IGFuY2hvcnMubGVuZ3RoOyBhICs9IDEpIHtcclxuICAgICAgaWYgKGV4dHJlbWl0eS5pbnRlcnNlY3RzV2l0aE9iamVjdChhbmNob3JzW2FdKSkge1xyXG4gICAgICAgIHRoaXMuY29ubmVjdExpbmsoZGlyZWN0aW9uLCBhbmNob3JzW2FdLnNoYXBlSWQsIGFuY2hvcnNbYV0uY2FyZGluYWwpO1xyXG4gICAgICAgIC8vIGFuY2hvcnNbYV0uc2V0KCdzdHJva2UnLCAnIzAwMCcpO1xyXG4gICAgICAgIGV4dHJlbWl0eS5zZXQoJ3N0cm9rZScsICcjMDAwJyk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpc1tkaXJlY3Rpb25dICYmIGFuY2hvcnNbYV0gPT09IHRoaXNbZGlyZWN0aW9uXS5zaGFwZS5hbmNob3JzW3RoaXNbZGlyZWN0aW9uXS5hbmNob3JdKSB7XHJcbiAgICAgICAgLy8gSWYgdGhpcyBsaW5rIHdhcyBjb25uZWN0ZWQgZW5kIHRoaXMgYW5jaG9yIGFuZCBpdCBkb2Vzbid0IGludGVyc2VjdCBhbnltb3JlXHJcbiAgICAgICAgdGhpcy5kaXNjb25uZWN0TGluayhkaXJlY3Rpb24pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImNvbnN0IHsgZmFicmljIH0gPSB3aW5kb3c7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW5rIHtcclxuICAvKipcclxuICAgKiBBIExpbmsgaXMgYSBGYWJyaWMuUGF0aCBvYmplY3Qgd2hvc2UgU3RhcnQgYW5kIEVuZCBwb2ludHMgY2FuIGJlIGNvbm5lY3RlZCBlbmQgYW55IGFuY2hvciBvZiB0d28gTGlua2FibGVTaGFwZS5cclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgb3B0aW9uc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtGYWJyaWMuQ2FudmFzfSAgIG9wdGlvbnMuY2FudmFzIC0gRmFicmljIGNhbnZhc1xyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICBvcHRpb25zLmlkIC0gVW5pcXVlIGlkZW50aWZpZXJcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBbb3B0aW9ucy5zdGFydF0gLSBDb29yZGluYXRlcyBvZiB0aGUgc3RhcnQgcG9pbnRcclxuICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgW29wdGlvbnMuc3RhcnQueF0gLSBYIGF4aXMgY29vcmRpbmF0ZSBvZiB0aGUgc3RhcnQgcG9pbnRcclxuICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgW29wdGlvbnMuc3RhcnQueV0gLSBZIGF4aXMgY29vcmRpbmF0ZSBvZiB0aGUgc3RhcnQgcG9pbnRcclxuICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgW29wdGlvbnMuZW5kLnhdIC0gWCBheGlzIGNvb3JkaW5hdGUgb2YgdGhlIGVuZCBwb2ludFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBbb3B0aW9ucy5lbmQueV0gLSBZIGF4aXMgY29vcmRpbmF0ZSBvZiB0aGUgZW5kIHBvaW50XHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLmN1c3RvbV0gLSBPcHRpb25zIGVuZCBjdXN0b21pemUgdGhlIGRpZmZlcmVudCBzaGFwZXMgb2YgdGhlIExpbmtcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBbb3B0aW9ucy5jdXN0b20ucGF0aF0gLSBiZXppZXIgcXVhZHJhdGljIGN1cnZlXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLmN1c3RvbS5jb250cm9sUG9pbnRdIC0gYmV6aWVyIHF1YWRyYXRpYyBjdXJ2ZSBjb250cm9sIHBvaW50XHJcbiAgICogQHBhcmFtIHtMaW5lfSAgICAgICAgICAgIFtvcHRpb25zLmN1c3RvbS5jb250cm9sTGluZV0gLSB2aXN1YWwgbGluZXMgc3RhcnQgdGhlIGNvbnRyb2wgcG9pbnQgZW5kIHRoZSBzdGFydCZlbmQgcG9pbnRzXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLmN1c3RvbS5zdGFydFBvaW50XSAtIGFrYSBhcnJvd1RhaWxcclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuY3VzdG9tLmVuZFBvaW50XSAtIGFrYSBhcnJvd0hlYWRcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGlkLFxyXG4gICAgICBjYW52YXMsXHJcbiAgICB9ID0gb3B0aW9ucztcclxuICAgIGNvbnN0IHgxID0gb3B0aW9ucyAmJiBvcHRpb25zLnN0YXJ0ICYmIG9wdGlvbnMuc3RhcnQueCA/IG9wdGlvbnMuc3RhcnQueCA6IDA7XHJcbiAgICBjb25zdCB5MSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5zdGFydCAmJiBvcHRpb25zLnN0YXJ0LnkgPyBvcHRpb25zLnN0YXJ0LnkgOiAwO1xyXG4gICAgY29uc3QgeDIgPSBvcHRpb25zICYmIG9wdGlvbnMuZW5kICYmIG9wdGlvbnMuZW5kLnggPyBvcHRpb25zLmVuZC54IDogMDtcclxuICAgIGNvbnN0IHkyID0gb3B0aW9ucyAmJiBvcHRpb25zLmVuZCAmJiBvcHRpb25zLmVuZC55ID8gb3B0aW9ucy5lbmQueSA6IDA7XHJcbiAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuXHJcbiAgICAvLyBQYXRoLCBhIGJlemllciBxdWFkcmF0aWMgY3VydmVcclxuICAgIGNvbnN0IHBhdGhDb29yZHMgPSB7XHJcbiAgICAgIE06IHtcclxuICAgICAgICB4OiB4MSwgLy8gc3RhcnQgeFxyXG4gICAgICAgIHk6IHkxLCAvLyBzdGFydCB5XHJcbiAgICAgIH0sXHJcbiAgICAgIFE6IHtcclxuICAgICAgICB4MTogKHgxICsgeDIpIC8gMiwgLy8gY29udHJvbCB4XHJcbiAgICAgICAgeTE6ICh5MSArIHkyKSAvIDIsIC8vIGNvbnRyb2wgeVxyXG4gICAgICAgIHgyLCAvLyBlbmQgeFxyXG4gICAgICAgIHkyLCAvLyBlbmQgeVxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHBhdGhPcHRzID0gdGhpcy5kZWZhdWx0UGF0aE9wdGlvbnMgPSB7XHJcbiAgICAgIGZpbGw6ICcnLFxyXG4gICAgICBzdHJva2U6IChvcHRpb25zLmN1c3RvbSAmJiBvcHRpb25zLmN1c3RvbS5wYXRoICYmIG9wdGlvbnMuY3VzdG9tLnBhdGguc3Ryb2tlV2lkdGgpID8gb3B0aW9ucy5jdXN0b20ucGF0aC5zdHJva2UgOiAnIzAwMCcsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAob3B0aW9ucy5jdXN0b20gJiYgb3B0aW9ucy5jdXN0b20ucGF0aCAmJiBvcHRpb25zLmN1c3RvbS5wYXRoLnN0cm9rZVdpZHRoKSA/IG9wdGlvbnMuY3VzdG9tLnBhdGguc3Ryb2tlV2lkdGggOiAyLFxyXG4gICAgICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgICAgaGFzQm9yZGVyczogdHJ1ZSxcclxuICAgICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgICBwZXJQaXhlbFRhcmdldEZpbmQ6IHRydWUsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgcGF0aFN0ciA9IGBNICR7cGF0aENvb3Jkcy5NLnh9ICR7cGF0aENvb3Jkcy5NLnl9IFEgJHtwYXRoQ29vcmRzLlEueDF9LCAke3BhdGhDb29yZHMuUS55MX0sICR7cGF0aENvb3Jkcy5RLngyfSwgJHtwYXRoQ29vcmRzLlEueTJ9YDtcclxuICAgIGNvbnN0IHBhdGggPSBuZXcgZmFicmljLlBhdGgocGF0aFN0ciwgcGF0aE9wdHMpO1xyXG4gICAgdGhpcy5wYXRoID0gcGF0aDtcclxuXHJcbiAgICAvLyBDb250cm9sIHBvaW50IGFuZCBsaW5lcyBmb3IgdGhlIHF1YWRyYXRpYyBjdXJ2ZVxyXG4gICAgY29uc3QgY29udHJvbFBvaW50ID0gdGhpcy5jb250cm9sUG9pbnQgPSBuZXcgZmFicmljLkNpcmNsZSh7XHJcbiAgICAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgICBsZWZ0OiBwYXRoQ29vcmRzLlEueDEsXHJcbiAgICAgIHRvcDogcGF0aENvb3Jkcy5RLnkxLFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgcmFkaXVzOiA2LFxyXG4gICAgICBmaWxsOiAnIzc4YmVmYScsXHJcbiAgICAgIHN0cm9rZTogJyM3OGJlZmEnLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAgIHNlbGVjdGFibGU6IHRydWUsXHJcbiAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICB9KTtcclxuICAgIGNvbnRyb2xQb2ludC5vbignbW91c2VvdmVyJywgdGhpcy5vbkxpbmtNb3VzZU92ZXIuYmluZCh0aGlzKSk7XHJcbiAgICBjb250cm9sUG9pbnQub24oJ21vdXNlb3V0JywgdGhpcy5vbkxpbmtNb3VzZU91dC5iaW5kKHRoaXMpKTtcclxuICAgIGNvbnRyb2xQb2ludC5vbignbW92aW5nJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhdGgoJ2NvbnRyb2wnLCB0aGlzLmNvbnRyb2xQb2ludC5sZWZ0LCB0aGlzLmNvbnRyb2xQb2ludC50b3AsIGZhbHNlKTtcclxuICAgIH0pO1xyXG4gICAgY29udHJvbFBvaW50Lm9uKCdtb3ZlZCcsICgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVQYXRoKCdjb250cm9sJywgdGhpcy5jb250cm9sUG9pbnQubGVmdCwgdGhpcy5jb250cm9sUG9pbnQudG9wLCB0cnVlKTtcclxuICAgIH0pO1xyXG4gICAgY29udHJvbFBvaW50Lm9uKCdtb3VzZWRvd24nLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuYnJpbmdUb0Zyb250KCk7XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGNvbnRyb2xMaW5lT3B0cyA9IHtcclxuICAgICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAgIHN0cm9rZURhc2hBcnJheTogWzUsIDVdLFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgc3Ryb2tlOiAnIzc4YmVmYScsXHJcbiAgICAgIHNlbGVjdGFibGU6IGZhbHNlLFxyXG4gICAgICBoYXNCb3JkZXJzOiBmYWxzZSxcclxuICAgICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgICBldmVudGVkOiBmYWxzZSxcclxuICAgICAgb3BhY2l0eTogMCxcclxuICAgIH07XHJcbiAgICBjb25zdCBjb250cm9sTGluZTEgPSB0aGlzLmNvbnRyb2xMaW5lMSA9IG5ldyBmYWJyaWMuTGluZShbY29udHJvbFBvaW50LmxlZnQsIGNvbnRyb2xQb2ludC50b3AsIHgxLCB5MV0sIGNvbnRyb2xMaW5lT3B0cyk7XHJcbiAgICBjb250cm9sTGluZTEub24oJ21vdXNlb3ZlcicsIHRoaXMub25MaW5rTW91c2VPdmVyLmJpbmQodGhpcykpO1xyXG4gICAgY29udHJvbExpbmUxLm9uKCdtb3VzZW91dCcsIHRoaXMub25MaW5rTW91c2VPdXQuYmluZCh0aGlzKSk7XHJcbiAgICBjb25zdCBjb250cm9sTGluZTIgPSB0aGlzLmNvbnRyb2xMaW5lMiA9IG5ldyBmYWJyaWMuTGluZShbY29udHJvbFBvaW50LmxlZnQsIGNvbnRyb2xQb2ludC50b3AsIHgyLCB5Ml0sIGNvbnRyb2xMaW5lT3B0cyk7XHJcbiAgICBjb250cm9sTGluZTIub24oJ21vdXNlb3ZlcicsIHRoaXMub25MaW5rTW91c2VPdmVyLmJpbmQodGhpcykpO1xyXG4gICAgY29udHJvbExpbmUyLm9uKCdtb3VzZW91dCcsIHRoaXMub25MaW5rTW91c2VPdXQuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgLy8gRW5kIHBvaW50IChhcnJvd0hlYWQpXHJcbiAgICBjb25zdCBpc1ZhbGlkTWFza09wdHMgPSB7XHJcbiAgICAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgICBsZWZ0OiBwYXRoQ29vcmRzLlEueDIsXHJcbiAgICAgIHRvcDogcGF0aENvb3Jkcy5RLnkyLFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgcmFkaXVzOiAxNixcclxuICAgICAgZmlsbDogJyM1N2I4NTcnLCAvLyBlYTRmMzdcclxuICAgICAgc3Ryb2tlOiAnIzU3Yjg1NycsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgICAgc2VsZWN0YWJsZTogZmFsc2UsXHJcbiAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgYXJyb3dIZWFkT3B0cyA9IHtcclxuICAgICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAgIHdpZHRoOiAxMCxcclxuICAgICAgaGVpZ2h0OiAxMCxcclxuICAgICAgbGVmdDogcGF0aENvb3Jkcy5RLngyLFxyXG4gICAgICB0b3A6IHBhdGhDb29yZHMuUS55MixcclxuICAgICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAgIGZpbGw6ICcjMDAwJyxcclxuICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgc3Ryb2tlOiAnIzAwMCcsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgIH07XHJcbiAgICBjb25zdCBhcnJvd0hlYWQgPSB0aGlzLmFycm93SGVhZCA9IG5ldyBmYWJyaWMuVHJpYW5nbGUoYXJyb3dIZWFkT3B0cyk7XHJcbiAgICB0aGlzLmlzVmFsaWRIZWFkQ29ubmVjdGlvbk1hc2sgPSBuZXcgZmFicmljLkNpcmNsZShpc1ZhbGlkTWFza09wdHMpO1xyXG4gICAgYXJyb3dIZWFkLm9uKCdtb3ZpbmcnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aCgnZW5kJywgYXJyb3dIZWFkLmxlZnQsIGFycm93SGVhZC50b3AsIGZhbHNlKTtcclxuICAgICAgdGhpcy5fY2hlY2tFeHRyZW1pdHlDYW5CZUNvbm5lY3RlZCgnZW5kJyk7XHJcbiAgICB9KTtcclxuICAgIGFycm93SGVhZC5vbignbW92ZWQnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aCgnZW5kJywgYXJyb3dIZWFkLmxlZnQsIGFycm93SGVhZC50b3AsIHRydWUpO1xyXG4gICAgICB0aGlzLmlzVmFsaWRIZWFkQ29ubmVjdGlvbk1hc2suc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICAgIHRoaXMuX2Nvbm5lY3REaXNjb25uZWN0RXh0cmVtaXR5KCdlbmQnKTtcclxuICAgIH0pO1xyXG4gICAgYXJyb3dIZWFkLm9uKCdtb3VzZWRvd24nLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuYnJpbmdUb0Zyb250KCk7XHJcbiAgICAgIHRoaXMudG9nZ2xlQWxsQW5jaG9yc09wYWNpdHkoMSk7XHJcblxyXG4gICAgICBhcnJvd0hlYWQub24oJ21vdXNldXAnLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy50b2dnbGVBbGxBbmNob3JzT3BhY2l0eSgwKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBTdGFydCBwb2ludCAoYXJyb3dUYWlsKVxyXG4gICAgY29uc3QgYXJyb3dUYWlsT3B0cyA9IHtcclxuICAgICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAgIHdpZHRoOiAxMCxcclxuICAgICAgaGVpZ2h0OiAxMCxcclxuICAgICAgbGVmdDogcGF0aENvb3Jkcy5NLngsXHJcbiAgICAgIHRvcDogcGF0aENvb3Jkcy5NLnksXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICBmaWxsOiAnI2ZmZicsXHJcbiAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgIHN0cm9rZTogJyMwMDAnLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIHNlbGVjdGFibGU6IHRydWUsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgYXJyb3dUYWlsID0gdGhpcy5hcnJvd1RhaWwgPSBuZXcgZmFicmljLlJlY3QoYXJyb3dUYWlsT3B0cyk7XHJcbiAgICB0aGlzLmlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2sgPSBuZXcgZmFicmljLkNpcmNsZShpc1ZhbGlkTWFza09wdHMpO1xyXG4gICAgYXJyb3dUYWlsLm9uKCdtb3ZpbmcnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aCgnc3RhcnQnLCBhcnJvd1RhaWwubGVmdCwgYXJyb3dUYWlsLnRvcCwgZmFsc2UpO1xyXG4gICAgICB0aGlzLl9jaGVja0V4dHJlbWl0eUNhbkJlQ29ubmVjdGVkKCdzdGFydCcpO1xyXG4gICAgfSk7XHJcbiAgICBhcnJvd1RhaWwub24oJ21vdmVkJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhdGgoJ3N0YXJ0JywgYXJyb3dUYWlsLmxlZnQsIGFycm93VGFpbC50b3AsIHRydWUpO1xyXG4gICAgICB0aGlzLmlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2suc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICAgIHRoaXMuX2Nvbm5lY3REaXNjb25uZWN0RXh0cmVtaXR5KCdzdGFydCcpO1xyXG4gICAgfSk7XHJcbiAgICBhcnJvd1RhaWwub24oJ21vdXNlZG93bicsICgpID0+IHtcclxuICAgICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcclxuICAgICAgdGhpcy50b2dnbGVBbGxBbmNob3JzT3BhY2l0eSgxKTtcclxuXHJcbiAgICAgIGFycm93VGFpbC5vbignbW91c2V1cCcsICgpID0+IHtcclxuICAgICAgICB0aGlzLnRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KDApO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5qZWN0KCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHBhdGgsXHJcbiAgICAgIGNvbnRyb2xQb2ludCxcclxuICAgICAgY29udHJvbExpbmUxLFxyXG4gICAgICBjb250cm9sTGluZTIsXHJcbiAgICAgIGFycm93SGVhZCxcclxuICAgICAgYXJyb3dUYWlsLFxyXG4gICAgICBpc1ZhbGlkVGFpbENvbm5lY3Rpb25NYXNrLFxyXG4gICAgICBpc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrLFxyXG4gICAgfSA9IHRoaXM7XHJcbiAgICBjYW52YXMuYWRkKGNvbnRyb2xQb2ludCk7XHJcbiAgICBjYW52YXMuYWRkKGNvbnRyb2xMaW5lMSk7XHJcbiAgICBjYW52YXMuYWRkKGNvbnRyb2xMaW5lMik7XHJcbiAgICBjYW52YXMuYWRkKGlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2spO1xyXG4gICAgY2FudmFzLmFkZChpc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrKTtcclxuICAgIGNhbnZhcy5hZGQoYXJyb3dIZWFkKTtcclxuICAgIGNhbnZhcy5hZGQoYXJyb3dUYWlsKTtcclxuXHJcbiAgICBjYW52YXMuYWRkKHBhdGgpO1xyXG4gICAgdGhpcy51cGRhdGVQYXRoKCdzdGFydCcsIHBhdGgucGF0aFswXVsxXSwgcGF0aC5wYXRoWzBdWzJdLCB0cnVlKTtcclxuICAgIHRoaXMudXBkYXRlUGF0aCgnZW5kJywgcGF0aC5wYXRoWzFdWzNdLCBwYXRoLnBhdGhbMV1bNF0sIHRydWUpO1xyXG4gICAgdGhpcy51cGRhdGVQYXRoKCdjb250cm9sJywgcGF0aC5wYXRoWzFdWzFdLCBwYXRoLnBhdGhbMV1bMl0sIHRydWUpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgY29ubmVjdExpbmsobGlua1BvaW50LCBzaGFwZUlkLCBjYXJkaW5hbCkge1xyXG4gICAgLy8gQ2hlY2sgbm90IGFscmVhZHkgY29ubmVjdGVkXHJcbiAgICBpZiAoIXRoaXMuaXNWYWxpZENvbm5lY3Rpb24obGlua1BvaW50LCBzaGFwZUlkLCBjYXJkaW5hbCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgc2hhcGUgPSB0aGlzLmNhbnZhcy5nZXRPYmplY3RzKClcclxuICAgICAgLmZpbmQoKG8pID0+IG8uaWQgPT09IHNoYXBlSWQpO1xyXG5cclxuICAgIC8vIERpc2Nvbm5lY3QgZXhpc3Rpbmcgb2JqZWN0XHJcbiAgICB0aGlzLmRpc2Nvbm5lY3RMaW5rKGxpbmtQb2ludCk7XHJcblxyXG4gICAgLy8gQ29ubmVjdFxyXG4gICAgdGhpc1tsaW5rUG9pbnRdID0ge1xyXG4gICAgICBzaGFwZSxcclxuICAgICAgYW5jaG9yOiBjYXJkaW5hbCxcclxuICAgICAgaGFuZGxlcnM6IHtcclxuICAgICAgICBvbkFuY2hvclBvc2l0aW9uTW9kaWZ5aW5nOiAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZVBhdGgobGlua1BvaW50LCBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5sZWZ0LCBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS50b3AsIGZhbHNlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQW5jaG9yUG9zaXRpb25Nb2RpZmllZDogKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVQYXRoKGxpbmtQb2ludCwgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ubGVmdCwgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0udG9wLCB0cnVlKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICAgIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLm9wYWNpdHkgPSAwO1xyXG4gICAgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ub24oJ3BnOnBvc2l0aW9uOm1vZGlmeWluZycsIHRoaXNbbGlua1BvaW50XS5oYW5kbGVycy5vbkFuY2hvclBvc2l0aW9uTW9kaWZ5aW5nKTtcclxuICAgIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLm9uKCdwZzpwb3NpdGlvbjptb2RpZmllZCcsIHRoaXNbbGlua1BvaW50XS5oYW5kbGVycy5vbkFuY2hvclBvc2l0aW9uTW9kaWZpZWQpO1xyXG5cclxuICAgIC8vIFVwZGF0ZSBMaW5rXHJcbiAgICB0aGlzLnVwZGF0ZVBhdGgobGlua1BvaW50LCBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5sZWZ0LCBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS50b3AsIHRydWUsIGZhbHNlKTtcclxuICB9XHJcblxyXG4gIGRpc2Nvbm5lY3RMaW5rKGxpbmtQb2ludCkge1xyXG4gICAgaWYgKHRoaXNbbGlua1BvaW50XSkge1xyXG4gICAgICB0aGlzW2xpbmtQb2ludF0uc2hhcGUuYW5jaG9yc1t0aGlzW2xpbmtQb2ludF0uYW5jaG9yXS5vZmYoJ3BnOnBvc2l0aW9uOm1vZGlmeWluZycsIHRoaXNbbGlua1BvaW50XS5oYW5kbGVycy5vbkFuY2hvclBvc2l0aW9uTW9kaWZ5aW5nKTtcclxuICAgICAgdGhpc1tsaW5rUG9pbnRdLnNoYXBlLmFuY2hvcnNbdGhpc1tsaW5rUG9pbnRdLmFuY2hvcl0ub2ZmKCdwZzpwb3NpdGlvbjptb2RpZmllZCcsIHRoaXNbbGlua1BvaW50XS5oYW5kbGVycy5vbkFuY2hvclBvc2l0aW9uTW9kaWZpZWQpO1xyXG4gICAgICBkZWxldGUgdGhpc1tsaW5rUG9pbnRdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVzZXRDdXJ2YXR1cmUoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGNvbnRyb2xQb2ludCxcclxuICAgICAgcGF0aCxcclxuICAgIH0gPSB0aGlzO1xyXG4gICAgY29udHJvbFBvaW50LmxlZnQgPSAocGF0aC5wYXRoWzBdWzFdICsgcGF0aC5wYXRoWzFdWzNdKSAvIDI7XHJcbiAgICBjb250cm9sUG9pbnQudG9wID0gKHBhdGgucGF0aFswXVsyXSArIHBhdGgucGF0aFsxXVs0XSkgLyAyO1xyXG4gICAgY29udHJvbFBvaW50LnNldENvb3JkcygpO1xyXG4gICAgY29udHJvbFBvaW50LmZpcmUoJ21vdmVkJyk7XHJcbiAgfVxyXG5cclxuICBicmluZ1RvRnJvbnQoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgcGF0aCxcclxuICAgICAgY29udHJvbFBvaW50LFxyXG4gICAgICBhcnJvd0hlYWQsXHJcbiAgICAgIGFycm93VGFpbCxcclxuICAgIH0gPSB0aGlzO1xyXG4gICAgY2FudmFzLmJyaW5nVG9Gcm9udChwYXRoKTtcclxuICAgIGNhbnZhcy5icmluZ1RvRnJvbnQoY29udHJvbFBvaW50KTtcclxuICAgIGNhbnZhcy5icmluZ1RvRnJvbnQoYXJyb3dIZWFkKTtcclxuICAgIGNhbnZhcy5icmluZ1RvRnJvbnQoYXJyb3dUYWlsKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVBhdGgobGlua1BvaW50LCB4LCB5LCBjb21taXQsIHJlc2V0Q3Vydikge1xyXG4gICAgY29uc3QgcGF0aCA9IHtcclxuICAgICAgTToge1xyXG4gICAgICAgIHg6IGxpbmtQb2ludCA9PT0gJ3N0YXJ0JyA/IHggOiB0aGlzLnBhdGgucGF0aFswXVsxXSxcclxuICAgICAgICB5OiBsaW5rUG9pbnQgPT09ICdzdGFydCcgPyB5IDogdGhpcy5wYXRoLnBhdGhbMF1bMl0sXHJcbiAgICAgIH0sXHJcbiAgICAgIFE6IHtcclxuICAgICAgICB4MTogbGlua1BvaW50ID09PSAnY29udHJvbCcgPyB4IDogdGhpcy5wYXRoLnBhdGhbMV1bMV0sXHJcbiAgICAgICAgeTE6IGxpbmtQb2ludCA9PT0gJ2NvbnRyb2wnID8geSA6IHRoaXMucGF0aC5wYXRoWzFdWzJdLFxyXG4gICAgICAgIHgyOiBsaW5rUG9pbnQgPT09ICdlbmQnID8geCA6IHRoaXMucGF0aC5wYXRoWzFdWzNdLFxyXG4gICAgICAgIHkyOiBsaW5rUG9pbnQgPT09ICdlbmQnID8geSA6IHRoaXMucGF0aC5wYXRoWzFdWzRdLFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICAgIGlmIChjb21taXQpIHtcclxuICAgICAgY29uc3QgcGF0aFN0ciA9IGBNICR7cGF0aC5NLnh9ICR7cGF0aC5NLnl9IFEgJHtwYXRoLlEueDF9LCAke3BhdGguUS55MX0sICR7cGF0aC5RLngyfSwgJHtwYXRoLlEueTJ9YDtcclxuICAgICAgY29uc3QgbmV3UGF0aCA9IG5ldyBmYWJyaWMuUGF0aChwYXRoU3RyLCB0aGlzLmRlZmF1bHRQYXRoT3B0aW9ucyk7XHJcbiAgICAgIHRoaXMuY2FudmFzLnJlbW92ZSh0aGlzLnBhdGgpO1xyXG4gICAgICB0aGlzLmNhbnZhcy5hZGQobmV3UGF0aCk7XHJcblxyXG4gICAgICBuZXdQYXRoLm9uKCdtb3VzZW92ZXInLCB0aGlzLm9uTGlua01vdXNlT3Zlci5iaW5kKHRoaXMpKTtcclxuICAgICAgbmV3UGF0aC5vbignbW91c2VvdXQnLCB0aGlzLm9uTGlua01vdXNlT3V0LmJpbmQodGhpcykpO1xyXG4gICAgICBuZXdQYXRoLm9uKCdtb3VzZWRvd24nLCB0aGlzLmJyaW5nVG9Gcm9udC5iaW5kKHRoaXMpKTtcclxuICAgICAgbmV3UGF0aC5vbignbW92aW5nJywgdGhpcy5vbkxpbmtNb3ZpbmcuYmluZCh0aGlzKSk7XHJcbiAgICAgIG5ld1BhdGgub24oJ21vdmVkJywgdGhpcy5vbkxpbmtNb3ZlZC5iaW5kKHRoaXMpKTtcclxuICAgICAgY29uc3QgdG9CaW5kID0gW1xyXG4gICAgICAgIHRoaXMuYXJyb3dIZWFkLFxyXG4gICAgICAgIHRoaXMuYXJyb3dUYWlsLFxyXG4gICAgICAgIHRoaXMuY29udHJvbFBvaW50LFxyXG4gICAgICAgIHRoaXMuY29udHJvbExpbmUxLFxyXG4gICAgICAgIHRoaXMuY29udHJvbExpbmUyLFxyXG4gICAgICBdO1xyXG4gICAgICBjb25zdCBib3NzVHJhbnNmb3JtID0gbmV3UGF0aC5jYWxjVHJhbnNmb3JtTWF0cml4KCk7XHJcbiAgICAgIGNvbnN0IGludmVydGVkQm9zc1RyYW5zZm9ybSA9IGZhYnJpYy51dGlsLmludmVydFRyYW5zZm9ybShib3NzVHJhbnNmb3JtKTtcclxuICAgICAgdG9CaW5kLmZvckVhY2goKG8pID0+IHtcclxuICAgICAgICBjb25zdCBkZXNpcmVkVHJhbnNmb3JtID0gZmFicmljLnV0aWwubXVsdGlwbHlUcmFuc2Zvcm1NYXRyaWNlcyhcclxuICAgICAgICAgIGludmVydGVkQm9zc1RyYW5zZm9ybSxcclxuICAgICAgICAgIG8uY2FsY1RyYW5zZm9ybU1hdHJpeCgpLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXHJcbiAgICAgICAgby5yZWxhdGlvbnNoaXAgPSBkZXNpcmVkVHJhbnNmb3JtO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMucGF0aCA9IG5ld1BhdGg7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhdGguc2V0KCdwYXRoJywgW1xyXG4gICAgICAgIFsnTScsIHBhdGguTS54LCBwYXRoLk0ueV0sXHJcbiAgICAgICAgWydRJywgcGF0aC5RLngxLCBwYXRoLlEueTEsIHBhdGguUS54MiwgcGF0aC5RLnkyXSxcclxuICAgICAgXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVXBkYXRlIGNvbnRyb2wgbGluZXMsIGFycm93IGhlYWRzIGFuZCB0YWlsc1xyXG4gICAgdGhpcy5jb250cm9sTGluZTEuc2V0KHtcclxuICAgICAgeDE6IHRoaXMuY29udHJvbFBvaW50LmxlZnQsXHJcbiAgICAgIHkxOiB0aGlzLmNvbnRyb2xQb2ludC50b3AsXHJcbiAgICAgIHgyOiB0aGlzLnBhdGgucGF0aFswXVsxXSxcclxuICAgICAgeTI6IHRoaXMucGF0aC5wYXRoWzBdWzJdLFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmNvbnRyb2xMaW5lMi5zZXQoe1xyXG4gICAgICB4MTogdGhpcy5jb250cm9sUG9pbnQubGVmdCxcclxuICAgICAgeTE6IHRoaXMuY29udHJvbFBvaW50LnRvcCxcclxuICAgICAgeDI6IHRoaXMucGF0aC5wYXRoWzFdWzNdLFxyXG4gICAgICB5MjogdGhpcy5wYXRoLnBhdGhbMV1bNF0sXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGFycm93SGVhZEFuZ2xlID0gKE1hdGguYXRhbjIodGhpcy5wYXRoLnBhdGhbMV1bNF0gLSB0aGlzLnBhdGgucGF0aFsxXVsyXSwgdGhpcy5wYXRoLnBhdGhbMV1bM10gLSB0aGlzLnBhdGgucGF0aFsxXVsxXSkgKiAxODApIC8gTWF0aC5QSTtcclxuICAgIHRoaXMuYXJyb3dIZWFkLmFuZ2xlID0gYXJyb3dIZWFkQW5nbGUgKyA5MDtcclxuICAgIHRoaXMuYXJyb3dIZWFkLmxlZnQgPSB0aGlzLnBhdGgucGF0aFsxXVszXTtcclxuICAgIHRoaXMuYXJyb3dIZWFkLnRvcCA9IHRoaXMucGF0aC5wYXRoWzFdWzRdO1xyXG4gICAgdGhpcy5hcnJvd0hlYWQuc2V0Q29vcmRzKCk7XHJcbiAgICB0aGlzLmFycm93VGFpbC5sZWZ0ID0gdGhpcy5wYXRoLnBhdGhbMF1bMV07XHJcbiAgICB0aGlzLmFycm93VGFpbC50b3AgPSB0aGlzLnBhdGgucGF0aFswXVsyXTtcclxuICAgIHRoaXMuYXJyb3dUYWlsLnNldENvb3JkcygpO1xyXG5cclxuICAgIHRoaXMuYnJpbmdUb0Zyb250KCk7XHJcblxyXG4gICAgLy8gUmVzZXQgY29udHJvbCBwb2ludFxyXG4gICAgaWYgKHJlc2V0Q3Vydikge1xyXG4gICAgICB0aGlzLnJlc2V0Q3VydmF0dXJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc1ZhbGlkQ29ubmVjdGlvbihsaW5rUG9pbnQsIHNoYXBlSWQsIGNhcmRpbmFsKSB7XHJcbiAgICBjb25zdCBzaGFwZSA9IHRoaXMuY2FudmFzLmdldE9iamVjdHMoKVxyXG4gICAgICAuZmluZCgobykgPT4gby5pZCA9PT0gc2hhcGVJZCk7XHJcbiAgICAvLyBDaGVjayBub3QgYWxyZWFkeSBjb25uZWN0ZWRcclxuICAgIGlmIChsaW5rUG9pbnQgPT09ICdzdGFydCcpIHtcclxuICAgICAgaWYgKHRoaXMuc3RhcnQgJiYgdGhpcy5zdGFydC5zaGFwZSAmJiB0aGlzLnN0YXJ0LnNoYXBlLmlkID09PSBzaGFwZS5pZCAmJiB0aGlzLnN0YXJ0LmNhcmRpbmFsID09PSBjYXJkaW5hbCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTsgLy8gdHJ5aW5nIGVuZCBzZXQgdGhlIHNhbWUgYWxyZWFkeSBjb25uZWN0ZWQgYW5jaG9yXHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuZW5kICYmIHRoaXMuZW5kLnNoYXBlICYmIHRoaXMuZW5kLnNoYXBlLmlkID09PSBzaGFwZS5pZCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTsgLy8gdHJ5aW5nIGVuZCBzaG9ydCBjaXJjdWl0IHRoZSByZWN0YW5nbGVcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChsaW5rUG9pbnQgPT09ICdlbmQnKSB7XHJcbiAgICAgIGlmICh0aGlzLmVuZCAmJiB0aGlzLmVuZC5zaGFwZSAmJiB0aGlzLmVuZC5zaGFwZS5pZCA9PT0gc2hhcGUuaWQgJiYgdGhpcy5lbmQuY2FyZGluYWwgPT09IGNhcmRpbmFsKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyB0cnlpbmcgZW5kIHNldCB0aGUgc2FtZSBhbHJlYWR5IGNvbm5lY3RlZCBhbmNob3JcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5zdGFydCAmJiB0aGlzLnN0YXJ0LnNoYXBlICYmIHRoaXMuc3RhcnQuc2hhcGUuaWQgPT09IHNoYXBlLmlkKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyB0cnlpbmcgZW5kIHNob3J0IGNpcmN1aXQgdGhlIHJlY3RhbmdsZVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KG9wYWNpdHkpIHtcclxuICAgIGNvbnN0IGFuY2hvcnMgPSB0aGlzLmNhbnZhcy5nZXRPYmplY3RzKClcclxuICAgICAgLmZpbHRlcigobykgPT4gby50eXBlID09PSAnYW5jaG9yJyk7XHJcblxyXG4gICAgLy8gY29uc3QgcHJvbWlzZXMgPSBbXTtcclxuICAgIC8vIGNvbnN0IHByb21pc2VGYWN0b3J5ID0gZnVuY3Rpb24gKGFuY2hvcikge1xyXG4gICAgLy8gICByZXR1cm4gZnVuY3Rpb24gKHJlc29sdmUpIHtcclxuICAgIC8vICAgICBhbmNob3IuYW5pbWF0ZSgnb3BhY2l0eScsIG9wYWNpdHksIHtcclxuICAgIC8vICAgICAgIGR1cmF0aW9uOiAzMDAsXHJcbiAgICAvLyAgICAgICBvbkNoYW5nZTogcmVzb2x2ZSxcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vICAgfTtcclxuICAgIC8vIH07XHJcbiAgICAvLyBmb3IgKGxldCBhID0gMDsgYSA8IGFuY2hvcnMubGVuZ3RoOyBhICs9IDEpIHtcclxuICAgIC8vICAgaWYgKGxvY2sgIT09IHVuZGVmaW5lZCkgYW5jaG9yc1thXS5sb2NrT3BhY2l0eSA9IGxvY2s7XHJcbiAgICAvLyAgIHByb21pc2VzLnB1c2gobmV3IFByb21pc2UocHJvbWlzZUZhY3RvcnkoYW5jaG9yc1thXSkpKTtcclxuICAgIC8vIH1cclxuICAgIC8vIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IHtcclxuICAgIC8vICAgdGhpcy5jYW52YXMucmVuZGVyQWxsKCk7XHJcbiAgICAvLyB9KTtcclxuXHJcbiAgICBmb3IgKGxldCBhID0gMDsgYSA8IGFuY2hvcnMubGVuZ3RoOyBhICs9IDEpIHtcclxuICAgICAgLy8gaWYgKGxvY2sgIT09IHVuZGVmaW5lZCkgYW5jaG9yc1thXS5sb2NrT3BhY2l0eSA9IGxvY2s7XHJcbiAgICAgIGFuY2hvcnNbYV0uc2V0KCdvcGFjaXR5Jywgb3BhY2l0eSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNhbnZhcy5yZW5kZXJBbGwoKTtcclxuICB9XHJcblxyXG4gIG9uTGlua01vdXNlT3ZlcigpIHtcclxuICAgIHRoaXMuY29udHJvbFBvaW50LnRvZ2dsZU9wYWNpdHkoMSk7XHJcbiAgICB0aGlzLmNvbnRyb2xMaW5lMS50b2dnbGVPcGFjaXR5KDEpO1xyXG4gICAgdGhpcy5jb250cm9sTGluZTIudG9nZ2xlT3BhY2l0eSgxKTtcclxuICB9XHJcblxyXG4gIG9uTGlua01vdXNlT3V0KCkge1xyXG4gICAgdGhpcy5jb250cm9sUG9pbnQudG9nZ2xlT3BhY2l0eSgwKTtcclxuICAgIHRoaXMuY29udHJvbExpbmUxLnRvZ2dsZU9wYWNpdHkoMCk7XHJcbiAgICB0aGlzLmNvbnRyb2xMaW5lMi50b2dnbGVPcGFjaXR5KDApO1xyXG4gIH1cclxuXHJcbiAgb25MaW5rTW92aW5nKCkge1xyXG4gICAgLy8gTW92ZSBzdGFydCwgZW5kLCBjb250cm9sIHBvaW50cyBhbHRvZ2V0aGVyIHdpdGggdGhlIFBhdGhcclxuICAgIGNvbnN0IHRvVXBkYXRlID0gW1xyXG4gICAgICB0aGlzLmFycm93SGVhZCxcclxuICAgICAgdGhpcy5hcnJvd1RhaWwsXHJcbiAgICAgIHRoaXMuY29udHJvbFBvaW50LFxyXG4gICAgICB0aGlzLmNvbnRyb2xMaW5lMSxcclxuICAgICAgdGhpcy5jb250cm9sTGluZTIsXHJcbiAgICBdO1xyXG4gICAgdG9VcGRhdGUuZm9yRWFjaCgobykgPT4ge1xyXG4gICAgICBpZiAoIW8ucmVsYXRpb25zaGlwKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHsgcmVsYXRpb25zaGlwIH0gPSBvO1xyXG4gICAgICBjb25zdCBuZXdUcmFuc2Zvcm0gPSBmYWJyaWMudXRpbC5tdWx0aXBseVRyYW5zZm9ybU1hdHJpY2VzKFxyXG4gICAgICAgIHRoaXMucGF0aC5jYWxjVHJhbnNmb3JtTWF0cml4KCksXHJcbiAgICAgICAgcmVsYXRpb25zaGlwLFxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBvcHQgPSBmYWJyaWMudXRpbC5xckRlY29tcG9zZShuZXdUcmFuc2Zvcm0pO1xyXG4gICAgICBvLnNldCh7XHJcbiAgICAgICAgZmxpcFg6IGZhbHNlLFxyXG4gICAgICAgIGZsaXBZOiBmYWxzZSxcclxuICAgICAgfSk7XHJcbiAgICAgIG8uc2V0UG9zaXRpb25CeU9yaWdpbihcclxuICAgICAgICB7IHg6IG9wdC50cmFuc2xhdGVYLCB5OiBvcHQudHJhbnNsYXRlWSB9LFxyXG4gICAgICAgICdjZW50ZXInLFxyXG4gICAgICAgICdjZW50ZXInLFxyXG4gICAgICApO1xyXG4gICAgICBvLnNldChvcHQpO1xyXG4gICAgICBvLnNldENvb3JkcygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gRmluYWxseSwgY2hlY2sgdGhlIHN0YXJ0IG9yIGVuZCBwb2ludHMgY2FuIGJlIGNvbm5lY3RlZC5cclxuICAgIHRoaXMuX2NoZWNrRXh0cmVtaXR5Q2FuQmVDb25uZWN0ZWQoJ3N0YXJ0Jyk7XHJcbiAgICB0aGlzLl9jaGVja0V4dHJlbWl0eUNhbkJlQ29ubmVjdGVkKCdlbmQnKTtcclxuICB9XHJcblxyXG4gIG9uTGlua01vdmVkKCkge1xyXG4gICAgLy8gUmV1cGRhdGUgdGhlIFBhdGggYWNjb3JkaW5nIGVuZCB0aGUgbmV3IGNvb3JkaW5hdGVzIG9mIGFsbCBlbGVtZW50c1xyXG4gICAgY29uc3QgcGF0aENvb3JkcyA9IHtcclxuICAgICAgTToge1xyXG4gICAgICAgIHg6IHRoaXMuYXJyb3dUYWlsLmxlZnQsXHJcbiAgICAgICAgeTogdGhpcy5hcnJvd1RhaWwudG9wLFxyXG4gICAgICB9LFxyXG4gICAgICBROiB7XHJcbiAgICAgICAgeDE6IHRoaXMuY29udHJvbFBvaW50LmxlZnQsXHJcbiAgICAgICAgeTE6IHRoaXMuY29udHJvbFBvaW50LnRvcCxcclxuICAgICAgICB4MjogdGhpcy5hcnJvd0hlYWQubGVmdCxcclxuICAgICAgICB5MjogdGhpcy5hcnJvd0hlYWQudG9wLFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHBhdGhTdHIgPSBgTSAke3BhdGhDb29yZHMuTS54fSAke3BhdGhDb29yZHMuTS55fSBRICR7cGF0aENvb3Jkcy5RLngxfSwgJHtwYXRoQ29vcmRzLlEueTF9LCAke3BhdGhDb29yZHMuUS54Mn0sICR7cGF0aENvb3Jkcy5RLnkyfWA7XHJcbiAgICBjb25zdCBjYWNhID0gbmV3IGZhYnJpYy5QYXRoKHBhdGhTdHIsIHt9KTtcclxuICAgIHRoaXMudXBkYXRlUGF0aCgnc3RhcnQnLCBjYWNhLnBhdGhbMF1bMV0sIGNhY2EucGF0aFswXVsyXSwgZmFsc2UpO1xyXG4gICAgdGhpcy51cGRhdGVQYXRoKCdlbmQnLCBjYWNhLnBhdGhbMV1bM10sIGNhY2EucGF0aFsxXVs0XSwgZmFsc2UpO1xyXG4gICAgdGhpcy51cGRhdGVQYXRoKCdjb250cm9sJywgY2FjYS5wYXRoWzFdWzFdLCBjYWNhLnBhdGhbMV1bMl0sIHRydWUpO1xyXG5cclxuICAgIC8vIENvbm5lY3Qgb3IgRGlzY29ubmVjdCBkZXBlbmRpbmcgb24gZXh0cmVtaXRpZXMgcG9zaXRpb25zXHJcbiAgICB0aGlzLmlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2suc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICB0aGlzLmlzVmFsaWRIZWFkQ29ubmVjdGlvbk1hc2suc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICB0aGlzLl9jb25uZWN0RGlzY29ubmVjdEV4dHJlbWl0eSgnc3RhcnQnKTtcclxuICAgIHRoaXMuX2Nvbm5lY3REaXNjb25uZWN0RXh0cmVtaXR5KCdlbmQnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhlbHBlciBlbmQgZGlzcGxheSBhIHZhbGlkIGNpcmNsZSBtYXNrIG9uIHNwZWNpZmljIGNvbmRpdGlvbnMuXHJcbiAgICogSWYgdGhlIGV4dHJlbWl0eSBpcyB0b3VjaGluZyBhbiBhbmNob3Igb2YgYSBMaW5rYWJsZVNoYXBlIHN0YXJ0IHdoaWNoIGl0IGlzIG5vdCB5ZXQgY29ubmVjdGVkID0+IHNob3cgR1JFRU5cclxuICAgKiBJZiB0aGUgZXh0cmVtaXR5IGlzIHRvdWNoaW5nIGFuIGFuY2hvciBvZiBhIExpbmthYmxlU2hhcGUgc3RhcnQgd2hpY2ggaXQgaXMgYWxyZWFkeSBjb25uZWN0ZWQgYnkgdGhlIG90aGVyIGV4dHJlbWl0eSA9PiBzaG93IFJFRFxyXG4gICAqIEBwYXJhbSBkaXJlY3Rpb25cclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9jaGVja0V4dHJlbWl0eUNhbkJlQ29ubmVjdGVkKGRpcmVjdGlvbikge1xyXG4gICAgY29uc3QgeyBjYW52YXMgfSA9IHRoaXM7XHJcblxyXG4gICAgbGV0IGV4dHJlbWl0eTtcclxuICAgIGxldCBtYXNrO1xyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3N0YXJ0Jykge1xyXG4gICAgICBleHRyZW1pdHkgPSB0aGlzLmFycm93VGFpbDtcclxuICAgICAgbWFzayA9IHRoaXMuaXNWYWxpZFRhaWxDb25uZWN0aW9uTWFzaztcclxuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnZW5kJykge1xyXG4gICAgICBleHRyZW1pdHkgPSB0aGlzLmFycm93SGVhZDtcclxuICAgICAgbWFzayA9IHRoaXMuaXNWYWxpZEhlYWRDb25uZWN0aW9uTWFzaztcclxuICAgIH1cclxuXHJcbiAgICBtYXNrLmxlZnQgPSBleHRyZW1pdHkubGVmdDtcclxuICAgIG1hc2sudG9wID0gZXh0cmVtaXR5LnRvcDtcclxuICAgIG1hc2suc2V0Q29vcmRzKCk7XHJcbiAgICBtYXNrLnNldCgnb3BhY2l0eScsIDApO1xyXG5cclxuICAgIC8vIENoZWNrIGlmIGludGVyc2VjdHMgd2l0aCBhbmNob3JcclxuICAgIGNvbnN0IGFuY2hvcnMgPSBjYW52YXMuZ2V0T2JqZWN0cygpXHJcbiAgICAgIC5maWx0ZXIoKG8pID0+IG8udHlwZSA9PT0gJ2FuY2hvcicpO1xyXG4gICAgZXh0cmVtaXR5LnNldCgnc3Ryb2tlJywgJyMwMDAnKTtcclxuICAgIGZvciAobGV0IGEgPSAwOyBhIDwgYW5jaG9ycy5sZW5ndGg7IGEgKz0gMSkge1xyXG4gICAgICBpZiAoZXh0cmVtaXR5LmludGVyc2VjdHNXaXRoT2JqZWN0KGFuY2hvcnNbYV0pKSB7XHJcbiAgICAgICAgbWFzay5zZXQoJ29wYWNpdHknLCAwLjUpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWRDb25uZWN0aW9uKGRpcmVjdGlvbiwgYW5jaG9yc1thXS5zaGFwZUlkLCBhbmNob3JzW2FdLmNhcmRpbmFsKSkge1xyXG4gICAgICAgICAgbWFzay5zZXQoe1xyXG4gICAgICAgICAgICBzdHJva2U6ICcjNTdiODU3JyxcclxuICAgICAgICAgICAgZmlsbDogJyM1N2I4NTcnLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBleHRyZW1pdHkuc2V0KCdzdHJva2UnLCAnIzVmNScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBtYXNrLnNldCh7XHJcbiAgICAgICAgICAgIHN0cm9rZTogJyNlYTRmMzcnLFxyXG4gICAgICAgICAgICBmaWxsOiAnI2VhNGYzNycsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGV4dHJlbWl0eS5zZXQoJ3N0cm9rZScsICcjZWE0ZjM3Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIZWxwZXIgZW5kIGV4ZWN1dGUgY29ubmVjdC9kaXNjb25uZWN0IGRlcGVuZGluZyBvbiBzcGVjaWZpYyBjb25kaXRpb25zLlxyXG4gICAqIElmIHRoZSBleHRyZW1pdHkgd2FzIGNvbm5lY3RlZCBBTkQgaXQgaXMgTk9UIHRvdWNoaW5nIHRoZSBhbmNob3IgYW55bW9yZSA9PiBkaXNjb25uZWN0IGl0LlxyXG4gICAqIElmIHRoZSBleHRyZW1pdHkgd2FzIGRpc2Nvbm5lY3RlZCBBTkQgaXQgaXMgdG91Y2hpbmcgdGhlIGFuY2hvciA9PiBjb25uZWN0IGl0LlxyXG4gICAqIEBwYXJhbSBkaXJlY3Rpb25cclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9jb25uZWN0RGlzY29ubmVjdEV4dHJlbWl0eShkaXJlY3Rpb24pIHtcclxuICAgIGNvbnN0IHsgY2FudmFzIH0gPSB0aGlzO1xyXG5cclxuICAgIGxldCBleHRyZW1pdHk7XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSAnc3RhcnQnKSB7XHJcbiAgICAgIGV4dHJlbWl0eSA9IHRoaXMuYXJyb3dUYWlsO1xyXG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdlbmQnKSB7XHJcbiAgICAgIGV4dHJlbWl0eSA9IHRoaXMuYXJyb3dIZWFkO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENoZWNrIGlmIGludGVyc2VjdHMgd2l0aCBhbmNob3JcclxuICAgIGNvbnN0IGFuY2hvcnMgPSBjYW52YXMuZ2V0T2JqZWN0cygpXHJcbiAgICAgIC5maWx0ZXIoKG8pID0+IG8udHlwZSA9PT0gJ2FuY2hvcicpO1xyXG4gICAgZm9yIChsZXQgYSA9IDA7IGEgPCBhbmNob3JzLmxlbmd0aDsgYSArPSAxKSB7XHJcbiAgICAgIGlmIChleHRyZW1pdHkuaW50ZXJzZWN0c1dpdGhPYmplY3QoYW5jaG9yc1thXSkpIHtcclxuICAgICAgICB0aGlzLmNvbm5lY3RMaW5rKGRpcmVjdGlvbiwgYW5jaG9yc1thXS5zaGFwZUlkLCBhbmNob3JzW2FdLmNhcmRpbmFsKTtcclxuICAgICAgICAvLyBhbmNob3JzW2FdLnNldCgnc3Ryb2tlJywgJyMwMDAnKTtcclxuICAgICAgICBleHRyZW1pdHkuc2V0KCdzdHJva2UnLCAnIzAwMCcpO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXNbZGlyZWN0aW9uXSAmJiBhbmNob3JzW2FdID09PSB0aGlzW2RpcmVjdGlvbl0uc2hhcGUuYW5jaG9yc1t0aGlzW2RpcmVjdGlvbl0uYW5jaG9yXSkge1xyXG4gICAgICAgIC8vIElmIHRoaXMgbGluayB3YXMgY29ubmVjdGVkIGVuZCB0aGlzIGFuY2hvciBhbmQgaXQgZG9lc24ndCBpbnRlcnNlY3QgYW55bW9yZVxyXG4gICAgICAgIHRoaXMuZGlzY29ubmVjdExpbmsoZGlyZWN0aW9uKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJjb25zdCB7IGZhYnJpYyB9ID0gd2luZG93O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlua2FibGVTaGFwZSB7XHJcbiAgLyoqXHJcbiAgICogQSBMaW5rYWJsZVNoYXBlIGlzIGFueSBGYWJyaWMuT2JqZWN0IHNoYXBlIG9uIHdoaWNoIGFuY2hvcnMgYXJlIGFwcGVuZGVkIHNvIHRoYXQgbXVsdGlwbGUgTGluayBjYW4gYmUgY29ubmVjdGVkIHRvIGl0LlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBvcHRpb25zXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0ZhYnJpYy5DYW52YXN9ICAgb3B0aW9ucy5jYW52YXMgLSBGYWJyaWMgY2FudmFzXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG9wdGlvbnMuaWQgLSBVbmlxdWUgaWRlbnRpZmllclxyXG4gICAqXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBpZCxcclxuICAgICAgY2FudmFzLFxyXG4gICAgICBzaGFwZSxcclxuICAgICAgbGVmdCxcclxuICAgICAgdG9wLFxyXG4gICAgICBhbmdsZSxcclxuICAgIH0gPSBvcHRpb25zO1xyXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xyXG5cclxuICAgIC8vIFNldCBzaGFwZVxyXG4gICAgc2hhcGUuc2V0KCd0eXBlJywgJ2xpbmthYmxlU2hhcGUnKTtcclxuICAgIHNoYXBlLnNldCh7XHJcbiAgICAgIGxlZnQsIHRvcCwgaWQsIGFuZ2xlLFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNoYXBlID0gc2hhcGU7XHJcblxyXG4gICAgLy8gU2hvdyBjb29yZGluYXRlcy9hbmdsZSB3aGVuIG1vdmluZy9yb3RhdGluZyBvYmplY3RcclxuICAgIGNvbnN0IG1vZGlmaWNhdGlvbkJveCA9IG5ldyBmYWJyaWMuUmVjdCh7XHJcbiAgICAgIGxlZnQ6IDAsXHJcbiAgICAgIHRvcDogMCxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgc3Ryb2tlOiAnIzY2NicsXHJcbiAgICAgIGZpbGw6ICcjZmZmJyxcclxuICAgICAgd2lkdGg6IDcwLFxyXG4gICAgICBoZWlnaHQ6IDIwLFxyXG4gICAgICB2ZW50ZWQ6IGZhbHNlLFxyXG4gICAgICBzZWxlY3RhYmxlOiBmYWxzZSxcclxuICAgICAgb3BhY2l0eTogMCxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgbW9kaWZpY2F0aW9uVGV4dCA9IG5ldyBmYWJyaWMuVGV4dCgnMCwgMCcsIHtcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIGZvbnRGYW1pbHk6ICdIZWx2ZXRpY2EnLFxyXG4gICAgICBmb250U2l6ZTogMTIsXHJcbiAgICAgIGJvcmRlclN0cm9rZVdpZHRoOiA0LFxyXG4gICAgICBldmVudGVkOiBmYWxzZSxcclxuICAgICAgc2VsZWN0YWJsZTogZmFsc2UsXHJcbiAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IG1vZGlmaWNhdGlvbiA9IHRoaXMubW9kQm94ID0gbmV3IGZhYnJpYy5Hcm91cChbbW9kaWZpY2F0aW9uQm94LCBtb2RpZmljYXRpb25UZXh0XSwge1xyXG4gICAgICBsZWZ0OiAwLFxyXG4gICAgICB0b3A6IDAsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgZXZlbnRlZDogZmFsc2UsXHJcbiAgICAgIHNlbGVjdGFibGU6IGZhbHNlLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBvbk1vdmluZyA9ICgpID0+IHtcclxuICAgICAgY29uc3QgeyB4LCB5IH0gPSBzaGFwZS5hQ29vcmRzLnRsO1xyXG4gICAgICBjb25zdCB4Q29vcmRzID0gW3NoYXBlLmFDb29yZHMudGwueCwgc2hhcGUuYUNvb3Jkcy50ci54LCBzaGFwZS5hQ29vcmRzLmJsLngsIHNoYXBlLmFDb29yZHMuYnIueF07XHJcbiAgICAgIGNvbnN0IHlDb29yZHMgPSBbc2hhcGUuYUNvb3Jkcy50bC55LCBzaGFwZS5hQ29vcmRzLnRyLnksIHNoYXBlLmFDb29yZHMuYmwueSwgc2hhcGUuYUNvb3Jkcy5ici55XTtcclxuICAgICAgbW9kaWZpY2F0aW9uLmxlZnQgPSAoTWF0aC5taW4oLi4ueENvb3JkcykgKyBNYXRoLm1heCguLi54Q29vcmRzKSkgLyAyO1xyXG4gICAgICBtb2RpZmljYXRpb24udG9wID0gTWF0aC5yb3VuZChNYXRoLm1heCguLi55Q29vcmRzKSArIDMwKTtcclxuICAgICAgbW9kaWZpY2F0aW9uLnNldENvb3JkcygpO1xyXG4gICAgICBtb2RpZmljYXRpb25Cb3guc2V0KCdvcGFjaXR5JywgMC43KTtcclxuICAgICAgbW9kaWZpY2F0aW9uVGV4dC5zZXQoJ29wYWNpdHknLCAxKTtcclxuICAgICAgbW9kaWZpY2F0aW9uVGV4dC5zZXQoJ3RleHQnLCBgJHtNYXRoLnJvdW5kKHgpfSwgJHtNYXRoLnJvdW5kKHkpfWApO1xyXG4gICAgICBjYW52YXMuYnJpbmdUb0Zyb250KG1vZGlmaWNhdGlvbik7XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb25Nb3ZlZCA9ICgpID0+IHtcclxuICAgICAgbW9kaWZpY2F0aW9uQm94LnNldCgnb3BhY2l0eScsIDApO1xyXG4gICAgICBtb2RpZmljYXRpb25UZXh0LnNldCgnb3BhY2l0eScsIDApO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IG9uUm90YXRpbmcgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHhDb29yZHMgPSBbc2hhcGUuYUNvb3Jkcy50bC54LCBzaGFwZS5hQ29vcmRzLnRyLngsIHNoYXBlLmFDb29yZHMuYmwueCwgc2hhcGUuYUNvb3Jkcy5ici54XTtcclxuICAgICAgY29uc3QgeUNvb3JkcyA9IFtzaGFwZS5hQ29vcmRzLnRsLnksIHNoYXBlLmFDb29yZHMudHIueSwgc2hhcGUuYUNvb3Jkcy5ibC55LCBzaGFwZS5hQ29vcmRzLmJyLnldO1xyXG4gICAgICBtb2RpZmljYXRpb24ubGVmdCA9IChNYXRoLm1pbiguLi54Q29vcmRzKSArIE1hdGgubWF4KC4uLnhDb29yZHMpKSAvIDI7XHJcbiAgICAgIG1vZGlmaWNhdGlvbi50b3AgPSBNYXRoLnJvdW5kKE1hdGgubWF4KC4uLnlDb29yZHMpICsgMzApO1xyXG4gICAgICBtb2RpZmljYXRpb24uc2V0Q29vcmRzKCk7XHJcbiAgICAgIG1vZGlmaWNhdGlvbkJveC5zZXQoJ29wYWNpdHknLCAwLjcpO1xyXG4gICAgICBtb2RpZmljYXRpb25UZXh0LnNldCgnb3BhY2l0eScsIDEpO1xyXG4gICAgICBtb2RpZmljYXRpb25UZXh0LnNldCgndGV4dCcsIGAke01hdGgucm91bmQoc2hhcGUuYW5nbGUgPiAxODAgPyBzaGFwZS5hbmdsZSAtIDM2MCA6IHNoYXBlLmFuZ2xlKX3CsGApO1xyXG4gICAgICBjYW52YXMuYnJpbmdUb0Zyb250KG1vZGlmaWNhdGlvbik7XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb25Sb3RhdGVkID0gKCkgPT4ge1xyXG4gICAgICBtb2RpZmljYXRpb25Cb3guc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICAgIG1vZGlmaWNhdGlvblRleHQuc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICB9O1xyXG4gICAgc2hhcGUub24oe1xyXG4gICAgICBtb3Zpbmc6IG9uTW92aW5nLFxyXG4gICAgICBtb3ZlZDogb25Nb3ZlZCxcclxuICAgICAgcm90YXRpbmc6IG9uUm90YXRpbmcsXHJcbiAgICAgIHJvdGF0ZWQ6IG9uUm90YXRlZCxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEFuY2hvciBwb2ludHNcclxuICAgIHRoaXMuYW5jaG9ycyA9IHRoaXMuc2hhcGUuYW5jaG9ycyA9IHtcclxuICAgICAgZWFzdDogdGhpcy5fbWFrZUFuY2hvclBvaW50KCdlYXN0JyksXHJcbiAgICAgIHdlc3Q6IHRoaXMuX21ha2VBbmNob3JQb2ludCgnd2VzdCcpLFxyXG4gICAgICAvLyBub3J0aDogdGhpcy5fbWFrZUFuY2hvclBvaW50KCdub3J0aCcpLFxyXG4gICAgICAvLyBzb3V0aDogdGhpcy5fbWFrZUFuY2hvclBvaW50KCdzb3V0aCcpLFxyXG4gICAgICAvLyBub3J0aGVhc3Q6IHRoaXMuX21ha2VBbmNob3JQb2ludCgnbm9ydGhlYXN0JyksXHJcbiAgICAgIC8vIG5vcnRod2VzdDogdGhpcy5fbWFrZUFuY2hvclBvaW50KCdub3J0aHdlc3QnKSxcclxuICAgICAgLy8gc291dGhlYXN0OiB0aGlzLl9tYWtlQW5jaG9yUG9pbnQoJ3NvdXRoZWFzdCcpLFxyXG4gICAgICAvLyBzb3V0aHdlc3Q6IHRoaXMuX21ha2VBbmNob3JQb2ludCgnc291dGh3ZXN0JyksXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEV2ZW50cyByZWxhdGVkIHRvIGFuY2hvcnNcclxuICAgIHNoYXBlLm9uKHtcclxuICAgICAgc2VsZWN0ZWQ6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnRvZ2dsZUFuY2hvcnNPcGFjaXR5KDApO1xyXG4gICAgICB9LFxyXG4gICAgICBtb3VzZW92ZXI6ICgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5jYW52YXMuZ2V0QWN0aXZlT2JqZWN0KCkgIT09IHRoaXMuc2hhcGUpIHtcclxuICAgICAgICAgIHRoaXMudG9nZ2xlQW5jaG9yc09wYWNpdHkoMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBtb3VzZW91dDogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudG9nZ2xlQW5jaG9yc09wYWNpdHkoMCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG1vZGlmeWluZzogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbihmYWxzZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG1vZGlmaWVkOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKHRydWUpO1xyXG4gICAgICB9LFxyXG4gICAgICBtb3Zpbmc6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnJlZnJlc2hBbmNob3JzUG9zaXRpb24oZmFsc2UpO1xyXG4gICAgICB9LFxyXG4gICAgICBtb3ZlZDogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbih0cnVlKTtcclxuICAgICAgfSxcclxuICAgICAgcm90YXRpbmc6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnJlZnJlc2hBbmNob3JzUG9zaXRpb24oZmFsc2UpO1xyXG4gICAgICB9LFxyXG4gICAgICByb3RhdGVkOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKHRydWUpO1xyXG4gICAgICB9LFxyXG4gICAgICBzY2FsaW5nOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKGZhbHNlKTtcclxuICAgICAgfSxcclxuICAgICAgc2NhbGVkOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKHRydWUpO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbmplY3QoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgc2hhcGUsXHJcbiAgICAgIGFuY2hvcnMsXHJcbiAgICAgIG1vZEJveCxcclxuICAgIH0gPSB0aGlzO1xyXG4gICAgY2FudmFzLmFkZChzaGFwZSk7XHJcbiAgICBjYW52YXMuYWRkKG1vZEJveCk7XHJcbiAgICBPYmplY3Qua2V5cyhhbmNob3JzKS5mb3JFYWNoKChjYXJkaW5hbCkgPT4ge1xyXG4gICAgICBjYW52YXMuYWRkKGFuY2hvcnNbY2FyZGluYWxdKTtcclxuICAgICAgY2FudmFzLmJyaW5nRm9yd2FyZChhbmNob3JzW2NhcmRpbmFsXSwgdHJ1ZSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbih0cnVlKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIG1vdmUob3B0aW9ucykge1xyXG4gICAgaWYgKG9wdGlvbnMueCkgdGhpcy5zaGFwZS5zZXQoJ3RvcCcsIG9wdGlvbnMueCk7XHJcbiAgICBpZiAob3B0aW9ucy55KSB0aGlzLnNoYXBlLnNldCgnbGVmdCcsIG9wdGlvbnMueSk7XHJcbiAgICB0aGlzLnNoYXBlLnNldENvb3JkcygpO1xyXG4gICAgdGhpcy5yZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKCk7XHJcbiAgfVxyXG5cclxuICByb3RhdGUoYW5nbGUpIHtcclxuICAgIHRoaXMuc2hhcGUucm90YXRlKGFuZ2xlKTtcclxuICAgIHRoaXMuc2hhcGUuc2V0Q29vcmRzKCk7XHJcbiAgICB0aGlzLnJlZnJlc2hBbmNob3JzUG9zaXRpb24oKTtcclxuICB9XHJcblxyXG4gIHJlZnJlc2hBbmNob3JzUG9zaXRpb24oY29tbWl0KSB7XHJcbiAgICBPYmplY3Qua2V5cyh0aGlzLmFuY2hvcnMpLmZvckVhY2goKGNhcmRpbmFsKSA9PiB7XHJcbiAgICAgIHRoaXMuX3NldEFuY2hvclBvc2l0aW9uUmVsYXRpdmVUb1JlY3RhbmdsZShjYXJkaW5hbCwgY29tbWl0KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlQW5jaG9yc09wYWNpdHkob3BhY2l0eSkge1xyXG4gICAgT2JqZWN0LmtleXModGhpcy5hbmNob3JzKS5mb3JFYWNoKChjYXJkaW5hbCkgPT4ge1xyXG4gICAgICB0aGlzLmFuY2hvcnNbY2FyZGluYWxdLnRvZ2dsZU9wYWNpdHkob3BhY2l0eSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGJyaW5nVG9Gcm9udCgpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgY2FudmFzLCBzaGFwZSwgbW9kQm94LCBhbmNob3JzLFxyXG4gICAgfSA9IHRoaXM7XHJcbiAgICBzaGFwZS5icmluZ1RvRnJvbnQoKTtcclxuICAgIG1vZEJveC5icmluZ1RvRnJvbnQoKTtcclxuICAgIE9iamVjdC5rZXlzKGFuY2hvcnMpLmZvckVhY2goKGNhcmRpbmFsKSA9PiB7XHJcbiAgICAgIGNhbnZhcy5icmluZ1RvRnJvbnQoYW5jaG9yc1tjYXJkaW5hbF0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBfc2V0QW5jaG9yUG9zaXRpb25SZWxhdGl2ZVRvUmVjdGFuZ2xlKGNhcmRpbmFsLCBjb21taXQpIHtcclxuICAgIGxldCBsZWZ0O1xyXG4gICAgbGV0IHRvcDtcclxuICAgIGNvbnN0IHsgc2hhcGUgfSA9IHRoaXM7XHJcbiAgICBjb25zdCBhcCA9IHRoaXMuYW5jaG9yc1tjYXJkaW5hbF07XHJcbiAgICBzd2l0Y2ggKGNhcmRpbmFsKSB7XHJcbiAgICAgIGNhc2UgJ2Vhc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IChzaGFwZS5hQ29vcmRzLnRyLnggKyBzaGFwZS5hQ29vcmRzLmJyLngpIC8gMjtcclxuICAgICAgICB0b3AgPSAoc2hhcGUuYUNvb3Jkcy50ci55ICsgc2hhcGUuYUNvb3Jkcy5ici55KSAvIDI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnd2VzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMudGwueCArIHNoYXBlLmFDb29yZHMuYmwueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLnRsLnkgKyBzaGFwZS5hQ29vcmRzLmJsLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMudGwueCArIHNoYXBlLmFDb29yZHMudHIueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLnRsLnkgKyBzaGFwZS5hQ29vcmRzLnRyLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMuYmwueCArIHNoYXBlLmFDb29yZHMuYnIueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLmJsLnkgKyBzaGFwZS5hQ29vcmRzLmJyLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aGVhc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IHNoYXBlLmFDb29yZHMudHIueDtcclxuICAgICAgICB0b3AgPSBzaGFwZS5hQ29vcmRzLnRyLnk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnbm9ydGh3ZXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSBzaGFwZS5hQ29vcmRzLnRsLng7XHJcbiAgICAgICAgdG9wID0gc2hhcGUuYUNvb3Jkcy50bC55O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRoZWFzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gc2hhcGUuYUNvb3Jkcy5ici54O1xyXG4gICAgICAgIHRvcCA9IHNoYXBlLmFDb29yZHMuYnIueTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aHdlc3QnOlxyXG4gICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgbGVmdCA9IHNoYXBlLmFDb29yZHMuYmwueDtcclxuICAgICAgICB0b3AgPSBzaGFwZS5hQ29vcmRzLmJsLnk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGFwLmxlZnQgPSBsZWZ0O1xyXG4gICAgYXAudG9wID0gdG9wO1xyXG4gICAgYXAuc2V0Q29vcmRzKCk7XHJcblxyXG4gICAgYXAuZmlyZShjb21taXQgPyAncGc6cG9zaXRpb246bW9kaWZpZWQnIDogJ3BnOnBvc2l0aW9uOm1vZGlmeWluZycpO1xyXG4gIH1cclxuXHJcbiAgX21ha2VBbmNob3JQb2ludChjYXJkaW5hbCkge1xyXG4gICAgbGV0IGxlZnQ7XHJcbiAgICBsZXQgdG9wO1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBzaGFwZSxcclxuICAgICAgaWQsXHJcbiAgICB9ID0gdGhpcztcclxuICAgIHN3aXRjaCAoY2FyZGluYWwpIHtcclxuICAgICAgY2FzZSAnZWFzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMudHIueCArIHNoYXBlLmFDb29yZHMuYnIueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLnRyLnkgKyBzaGFwZS5hQ29vcmRzLmJyLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICd3ZXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSAoc2hhcGUuYUNvb3Jkcy50bC54ICsgc2hhcGUuYUNvb3Jkcy5ibC54KSAvIDI7XHJcbiAgICAgICAgdG9wID0gKHNoYXBlLmFDb29yZHMudGwueSArIHNoYXBlLmFDb29yZHMuYmwueSkgLyAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRoJzoge1xyXG4gICAgICAgIGxlZnQgPSAoc2hhcGUuYUNvb3Jkcy50bC54ICsgc2hhcGUuYUNvb3Jkcy50ci54KSAvIDI7XHJcbiAgICAgICAgdG9wID0gKHNoYXBlLmFDb29yZHMudGwueSArIHNoYXBlLmFDb29yZHMudHIueSkgLyAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRoJzoge1xyXG4gICAgICAgIGxlZnQgPSAoc2hhcGUuYUNvb3Jkcy5ibC54ICsgc2hhcGUuYUNvb3Jkcy5ici54KSAvIDI7XHJcbiAgICAgICAgdG9wID0gKHNoYXBlLmFDb29yZHMuYmwueSArIHNoYXBlLmFDb29yZHMuYnIueSkgLyAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRoZWFzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gc2hhcGUuYUNvb3Jkcy50ci54O1xyXG4gICAgICAgIHRvcCA9IHNoYXBlLmFDb29yZHMudHIueTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aHdlc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IHNoYXBlLmFDb29yZHMudGwueDtcclxuICAgICAgICB0b3AgPSBzaGFwZS5hQ29vcmRzLnRsLnk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnc291dGhlYXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSBzaGFwZS5hQ29vcmRzLmJyLng7XHJcbiAgICAgICAgdG9wID0gc2hhcGUuYUNvb3Jkcy5ici55O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRod2VzdCc6XHJcbiAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICBsZWZ0ID0gc2hhcGUuYUNvb3Jkcy5ibC54O1xyXG4gICAgICAgIHRvcCA9IHNoYXBlLmFDb29yZHMuYmwueTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFwID0gbmV3IGZhYnJpYy5DaXJjbGUoe1xyXG4gICAgICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgICAgbGVmdCxcclxuICAgICAgdG9wLFxyXG4gICAgICBzdHJva2VXaWR0aDogMixcclxuICAgICAgcmFkaXVzOiA2LFxyXG4gICAgICBmaWxsOiAnIzc4YmVmYScsIC8vIDQyYTJkYSBkNWU4ZjJcclxuICAgICAgc3Ryb2tlOiAnIzc4YmVmYScsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgICAgc2VsZWN0YWJsZTogZmFsc2UsXHJcbiAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICAgIGlkOiBgJHtpZH1fJHtjYXJkaW5hbH1gLFxyXG4gICAgfSk7XHJcbiAgICBhcC50eXBlID0gJ2FuY2hvcic7XHJcbiAgICBhcC5zaGFwZUlkID0gaWQ7XHJcbiAgICBhcC5jYXJkaW5hbCA9IGNhcmRpbmFsO1xyXG4gICAgYXAub24oJ21vdXNlb3ZlcicsICgpID0+IHtcclxuICAgICAgYXAudG9nZ2xlT3BhY2l0eSgxKTtcclxuICAgIH0pO1xyXG4gICAgYXAub24oJ21vdXNlb3V0JywgKCkgPT4ge1xyXG4gICAgICBhcC50b2dnbGVPcGFjaXR5KDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYXAub24oJ21vdXNlZG93bicsIChvcHRpb25zKSA9PiB7XHJcbiAgICAgIHN3aXRjaCAob3B0aW9ucy5idXR0b24pIHtcclxuICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICB0aGlzLl9vbkFuY2hvclJpZ2h0Q2xpY2suY2FsbCh0aGlzLCBvcHRpb25zKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgIHRoaXMuX29uQW5jaG9yTWlkZGxlQ2xpY2suY2FsbCh0aGlzLCBvcHRpb25zKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTpcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgdGhpcy5fb25BbmNob3JMZWZ0Q2xpY2suY2FsbCh0aGlzLCBvcHRpb25zKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBhcDtcclxuICB9XHJcblxyXG4gIC8vIFNob3VsZCBiZSBpbXBsZW1lbnRlZCBieSBFeHRlbmRpbmcgQ2xhc3Nlc1xyXG4gIC8qIGVzbGludC1kaXNhYmxlIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXMgKi9cclxuICBfb25BbmNob3JMZWZ0Q2xpY2soLyogb3B0aW9ucyAqLykge31cclxuXHJcbiAgX29uQW5jaG9yTWlkZGxlQ2xpY2soLyogb3B0aW9ucyAqLykge31cclxuXHJcbiAgX29uQW5jaG9yUmlnaHRDbGljaygvKiBvcHRpb25zICovKSB7fVxyXG5cclxuICAvKiBlc2xpbnQtZGlzYWJsZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzICovXHJcbn1cclxuIiwiY29uc3QgeyBmYWJyaWMgfSA9IHdpbmRvdztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2Nlc3NHcmFwaCB7XHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0gb3B0aW9uc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtDYW52YXN9IG9wdGlvbnMuY2FudmFzIC0gRmFicmljSlMuQ2FudmFzIGluc3RhbmNlIC0gbWFuZGF0b3J5IGlmIG9wdGlvbnMuY2FudmFzT3B0cyBub3QgcHJvdmlkZWQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5jYW52YXNPcHRzIC0gRmFicmljSlMuQ2FudmFzI2luaXRpYWxpemUgcGFyYW1ldGVycyAtIG1hbmRhdG9yeSBpZiBvcHRpb25zLmNhbnZhcyBub3QgcHJvdmlkZWRcclxuICAgKiAgICAgICAgICAgICAgICAgU2VlIGh0dHA6Ly9mYWJyaWNqcy5jb20vZG9jcy9mYWJyaWMuQ2FudmFzLmh0bWwjaW5pdGlhbGl6ZSBmb3IgZGV0YWlsc1xyXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8U3RyaW5nfSBvcHRpb25zLmNhbnZhcy5lbCAtIDxjYW52YXM+IGVsZW1lbnQgdG8gaW5pdGlhbGl6ZSBpbnN0YW5jZSBvblxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLmNhbnZhcy5vcHRpb25zIC0gT3B0aW9ucyBvYmplY3RcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5ncmlkXSAtIGRpbWVuc2lvbnMgb2YgdGhlIGdyaWRcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICB0aGlzLmhhbmRsZXJzID0ge1xyXG4gICAgICBncmlkOiB7fSxcclxuICAgIH07XHJcblxyXG4gICAgLy8gSW5pdGlhbGl6ZSBDYW52YXNcclxuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuY2FudmFzID0gb3B0aW9ucy5jYW52YXMgPyBvcHRpb25zLmNhbnZhcyA6IG5ldyBmYWJyaWMuQ2FudmFzKG9wdGlvbnMuY2FudmFzT3B0cy5lbCwgb3B0aW9ucy5jYW52YXNPcHRzLm9wdGlvbnMpO1xyXG4gICAgY2FudmFzLnNldCgncHJlc2VydmVPYmplY3RTdGFja2luZycsIHRydWUpO1xyXG4gICAgLy8gY2FudmFzLnNldCgncmVuZGVyT25BZGRSZW1vdmUnLCBmYWxzZSk7XHJcbiAgICBjYW52YXMuc2V0KCdmaXJlUmlnaHRDbGljaycsIHRydWUpO1xyXG4gICAgY2FudmFzLnNldCgnZmlyZU1pZGRsZUNsaWNrJywgdHJ1ZSk7XHJcbiAgICBjYW52YXMuc2V0KCdzdG9wQ29udGV4dE1lbnUnLCB0cnVlKTtcclxuXHJcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZ3JpZCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgdGhpcy5zZXRHcmlkKHtcclxuICAgICAgICBncmlkOiBvcHRpb25zLmdyaWQsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGZhYnJpYy5PYmplY3QucHJvdG90eXBlLm9yaWdpblggPSBmYWJyaWMuT2JqZWN0LnByb3RvdHlwZS5vcmlnaW5ZID0gJ2NlbnRlcic7XHJcbiAgICBmYWJyaWMuT2JqZWN0LnByb3RvdHlwZS50b2dnbGVPcGFjaXR5ID0gZnVuY3Rpb24gdG9nZ2xlT3BhY2l0eShvcGFjaXR5LyogLCB0aW1lb3V0ICovKSB7XHJcbiAgICAgIC8vIHRoaXMuYW5pbWF0ZSgnb3BhY2l0eScsIG9wYWNpdHksIHtcclxuICAgICAgLy8gICBkdXJhdGlvbjogdGltZW91dCAhPT0gdW5kZWZpbmVkID8gdGltZW91dCA6IDMwMCxcclxuICAgICAgLy8gICBvbkNoYW5nZTogdGhpcy5jYW52YXMucmVuZGVyQWxsLmJpbmQodGhpcy5jYW52YXMpLFxyXG4gICAgICAvLyB9KTtcclxuICAgICAgdGhpcy5zZXQoJ29wYWNpdHknLCBvcGFjaXR5KTtcclxuICAgICAgdGhpcy5jYW52YXMucmVuZGVyQWxsKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNhbnZhcy5jYWxjT2Zmc2V0KCk7XHJcblxyXG4gICAgLy8gUHJldmVudCBub24gTGlua2FibGVTaGFwZSBvYmplY3RzIHRvIGJlIGdyb3VwZWQgZHVyaW5nIHNlbGVjdGlvblxyXG4gICAgY29uc3Qgb25TZWxlY3Rpb24gPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGFjdGl2ZSA9IGNhbnZhcy5nZXRBY3RpdmVPYmplY3QoKTtcclxuICAgICAgLy8gV2hlbiBtdWx0aSBzZWxlY3Rpb24sIHJlbW92ZSBhbnkgbm9uIExpbmthYmxlIFNoYXBlIG9iamVjdHNcclxuICAgICAgaWYgKGFjdGl2ZS50eXBlID09PSAnYWN0aXZlU2VsZWN0aW9uJykge1xyXG4gICAgICAgIGNvbnN0IG9iamVjdHMgPSBhY3RpdmUuZ2V0T2JqZWN0cygpO1xyXG4gICAgICAgIGlmIChvYmplY3RzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgIGNvbnN0IG9ubHlSZWN0ID0gb2JqZWN0cy5maWx0ZXIoKG8pID0+IG8udHlwZSA9PT0gJ2xpbmthYmxlU2hhcGUnKTtcclxuICAgICAgICAgIGNhbnZhcy5fZGlzY2FyZEFjdGl2ZU9iamVjdCgpO1xyXG4gICAgICAgICAgY29uc3Qgc2VsID0gbmV3IGZhYnJpYy5BY3RpdmVTZWxlY3Rpb24ob25seVJlY3QsIHtcclxuICAgICAgICAgICAgY2FudmFzLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBjYW52YXMuX3NldEFjdGl2ZU9iamVjdChzZWwpO1xyXG5cclxuICAgICAgICAgIC8vIFVwZGF0ZSBhbnkgbGlua3MgY29ubmVjdGVkIHRvIHRoZSBMaW5rYWJsZSBTaGFwZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjYW52YXMub24oe1xyXG4gICAgICAnc2VsZWN0aW9uOmNyZWF0ZWQnOiBvblNlbGVjdGlvbixcclxuICAgICAgJ3NlbGVjdGlvbjp1cGRhdGVkJzogb25TZWxlY3Rpb24sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCBjYW52YXMgdG8gaGF2ZSBhIGdyaWQuXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcclxuICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5ncmlkIC0gZ3JpZCBzcGFjaW5nIChwaXhlbHMpXHJcbiAgICovXHJcbiAgc2V0R3JpZChvcHRpb25zKSB7XHJcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZ3JpZCAhPT0gJ251bWJlcicgfHwgb3B0aW9ucy5ncmlkIDwgMCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnQgXCJncmlkXCIgaW4gUHJvY2Vzc0dyYXAjc2V0R3JpZC4gKHJlcXVpcmVkOiBOdW1iZXIgPiAwKScpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZ3JpZCA9IG9wdGlvbnMuZ3JpZDtcclxuICAgIGNvbnN0IHsgY2FudmFzIH0gPSB0aGlzO1xyXG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tbXVsdGktc3RyICovXHJcbiAgICBjb25zdCBkYXRhID0gYDxzdmcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj4gXFxcclxuICAgICAgICA8ZGVmcz4gXFxcclxuICAgICAgICAgICAgPHBhdHRlcm4gaWQ9XCJzbWFsbEdyaWRcIiB3aWR0aD1cIiR7dGhpcy5ncmlkfVwiIGhlaWdodD1cIiR7dGhpcy5ncmlkfVwiIHBhdHRlcm5Vbml0cz1cInVzZXJTcGFjZU9uVXNlXCI+IFxcXHJcbiAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTSAke3RoaXMuZ3JpZH0gMCBMIDAgMCAwICR7dGhpcy5ncmlkfVwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiZ3JheVwiIHN0cm9rZS13aWR0aD1cIjAuNVwiIC8+IFxcXHJcbiAgICAgICAgICAgIDwvcGF0dGVybj4gXFxcclxuICAgICAgICAgICAgPHBhdHRlcm4gaWQ9XCJncmlkXCIgd2lkdGg9XCIke3RoaXMuZ3JpZCAqIDV9XCIgaGVpZ2h0PVwiJHt0aGlzLmdyaWQgKiA1fVwiIHBhdHRlcm5Vbml0cz1cInVzZXJTcGFjZU9uVXNlXCI+IFxcXHJcbiAgICAgICAgICAgICAgICA8cmVjdCB3aWR0aD1cIiR7dGhpcy5ncmlkICogNX1cIiBoZWlnaHQ9XCIke3RoaXMuZ3JpZCAqIDV9XCIgZmlsbD1cInVybCgjc21hbGxHcmlkKVwiIC8+IFxcXHJcbiAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTSAke3RoaXMuZ3JpZCAqIDV9IDAgTCAwIDAgMCAke3RoaXMuZ3JpZCAqIDV9XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJncmF5XCIgc3Ryb2tlLXdpZHRoPVwiMVwiIC8+IFxcXHJcbiAgICAgICAgICAgIDwvcGF0dGVybj4gXFxcclxuICAgICAgICA8L2RlZnM+IFxcXHJcbiAgICAgICAgPHJlY3Qgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIGZpbGw9XCJ1cmwoI2dyaWQpXCIgLz4gXFxcclxuICAgIDwvc3ZnPmA7XHJcbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLW11bHRpLXN0ciAqL1xyXG5cclxuICAgIGNvbnN0IERPTVVSTCA9IHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTCB8fCB3aW5kb3c7XHJcbiAgICBjb25zdCBzdmcgPSBuZXcgQmxvYihbZGF0YV0sIHsgdHlwZTogJ2ltYWdlL3N2Zyt4bWw7Y2hhcnNldD11dGYtOCcgfSk7XHJcbiAgICBjb25zdCB1cmwgPSBET01VUkwuY3JlYXRlT2JqZWN0VVJMKHN2Zyk7XHJcbiAgICBmYWJyaWMudXRpbC5sb2FkSW1hZ2UodXJsLCAoaW1nKSA9PiB7XHJcbiAgICAgIGNvbnN0IGJnID0gbmV3IGZhYnJpYy5SZWN0KHtcclxuICAgICAgICB3aWR0aDogY2FudmFzLndpZHRoLCBoZWlnaHQ6IGNhbnZhcy5oZWlnaHQsIGV2ZW50ZWQ6IGZhbHNlLCBzZWxlY3RhYmxlOiBmYWxzZSxcclxuICAgICAgfSk7XHJcbiAgICAgIGJnLmZpbGwgPSBuZXcgZmFicmljLlBhdHRlcm4oeyBzb3VyY2U6IGltZyB9LFxyXG4gICAgICAgICgoKSA9PiB7IGJnLmRpcnR5ID0gdHJ1ZTsgY2FudmFzLnJlcXVlc3RSZW5kZXJBbGwoKTsgfSkpO1xyXG4gICAgICBiZy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICAgIGNhbnZhcy5zZXQoJ2JhY2tncm91bmRJbWFnZScsIGJnKTtcclxuXHJcbiAgICAgIC8vIFNuYXAgdG8gZ3JpZCBlZmZlY3RzXHJcbiAgICAgIGNhbnZhcy5vZmYodGhpcy5oYW5kbGVycy5ncmlkKTtcclxuICAgICAgdGhpcy5oYW5kbGVycy5ncmlkID0ge1xyXG4gICAgICAgICdvYmplY3Q6bW92aW5nJzogKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB7IGdyaWQgfSA9IHRoaXM7XHJcbiAgICAgICAgICBjb25zdCB7IHRhcmdldCB9ID0gZXZlbnQ7XHJcbiAgICAgICAgICBpZiAodGFyZ2V0LnR5cGUgIT09ICdsaW5rYWJsZVNoYXBlJykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBldmVudC50YXJnZXQuc2V0KHtcclxuICAgICAgICAgICAgbGVmdDogTWF0aC5yb3VuZChldmVudC50YXJnZXQubGVmdCAvIGdyaWQpICogZ3JpZCxcclxuICAgICAgICAgICAgdG9wOiBNYXRoLnJvdW5kKGV2ZW50LnRhcmdldC50b3AgLyBncmlkKSAqIGdyaWQsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgICdvYmplY3Q6c2NhbGluZyc6IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgeyBncmlkIH0gPSB0aGlzO1xyXG4gICAgICAgICAgY29uc3QgeyB0YXJnZXQgfSA9IGV2ZW50O1xyXG5cclxuICAgICAgICAgIGlmICh0YXJnZXQudHlwZSAhPT0gJ2xpbmthYmxlU2hhcGUnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zdCB3ID0gdGFyZ2V0LndpZHRoICogdGFyZ2V0LnNjYWxlWDtcclxuICAgICAgICAgIGNvbnN0IGggPSB0YXJnZXQuaGVpZ2h0ICogdGFyZ2V0LnNjYWxlWTtcclxuICAgICAgICAgIGNvbnN0IHNuYXAgPSB7IC8vIENsb3Nlc3Qgc25hcHBpbmcgcG9pbnRzXHJcbiAgICAgICAgICAgIHRvcDogTWF0aC5yb3VuZCh0YXJnZXQudG9wIC8gZ3JpZCkgKiBncmlkLFxyXG4gICAgICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKHRhcmdldC5sZWZ0IC8gZ3JpZCkgKiBncmlkLFxyXG4gICAgICAgICAgICBib3R0b206IE1hdGgucm91bmQoKHRhcmdldC50b3AgKyBoKSAvIGdyaWQpICogZ3JpZCxcclxuICAgICAgICAgICAgcmlnaHQ6IE1hdGgucm91bmQoKHRhcmdldC5sZWZ0ICsgdykgLyBncmlkKSAqIGdyaWQsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgY29uc3QgdGhyZXNob2xkID0gZ3JpZDtcclxuICAgICAgICAgIGNvbnN0IGRpc3QgPSB7IC8vIERpc3RhbmNlIGZyb20gc25hcHBpbmcgcG9pbnRzXHJcbiAgICAgICAgICAgIHRvcDogTWF0aC5hYnMoc25hcC50b3AgLSB0YXJnZXQudG9wKSxcclxuICAgICAgICAgICAgbGVmdDogTWF0aC5hYnMoc25hcC5sZWZ0IC0gdGFyZ2V0LmxlZnQpLFxyXG4gICAgICAgICAgICBib3R0b206IE1hdGguYWJzKHNuYXAuYm90dG9tIC0gdGFyZ2V0LnRvcCAtIGgpLFxyXG4gICAgICAgICAgICByaWdodDogTWF0aC5hYnMoc25hcC5yaWdodCAtIHRhcmdldC5sZWZ0IC0gdyksXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgY29uc3QgYXR0cnMgPSB7XHJcbiAgICAgICAgICAgIHNjYWxlWDogdGFyZ2V0LnNjYWxlWCxcclxuICAgICAgICAgICAgc2NhbGVZOiB0YXJnZXQuc2NhbGVZLFxyXG4gICAgICAgICAgICB0b3A6IHRhcmdldC50b3AsXHJcbiAgICAgICAgICAgIGxlZnQ6IHRhcmdldC5sZWZ0LFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHN3aXRjaCAodGFyZ2V0Ll9fY29ybmVyKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RsJzpcclxuICAgICAgICAgICAgICBpZiAoZGlzdC5sZWZ0IDwgZGlzdC50b3AgJiYgZGlzdC5sZWZ0IDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVggPSAodyAtIChzbmFwLmxlZnQgLSB0YXJnZXQubGVmdCkpIC8gdGFyZ2V0LndpZHRoO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVZID0gKGF0dHJzLnNjYWxlWCAvIHRhcmdldC5zY2FsZVgpICogdGFyZ2V0LnNjYWxlWTtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnRvcCA9IHRhcmdldC50b3AgKyAoaCAtIHRhcmdldC5oZWlnaHQgKiBhdHRycy5zY2FsZVkpO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMubGVmdCA9IHNuYXAubGVmdDtcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRpc3QudG9wIDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoaCAtIChzbmFwLnRvcCAtIHRhcmdldC50b3ApKSAvIHRhcmdldC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVggPSAoYXR0cnMuc2NhbGVZIC8gdGFyZ2V0LnNjYWxlWSkgKiB0YXJnZXQuc2NhbGVYO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMubGVmdCArPSAodyAtIHRhcmdldC53aWR0aCAqIGF0dHJzLnNjYWxlWCk7XHJcbiAgICAgICAgICAgICAgICBhdHRycy50b3AgPSBzbmFwLnRvcDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ210JzpcclxuICAgICAgICAgICAgICBpZiAoZGlzdC50b3AgPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWSA9IChoIC0gKHNuYXAudG9wIC0gdGFyZ2V0LnRvcCkpIC8gdGFyZ2V0LmhlaWdodDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnRvcCA9IHNuYXAudG9wO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAndHInOlxyXG4gICAgICAgICAgICAgIGlmIChkaXN0LnJpZ2h0IDwgZGlzdC50b3AgJiYgZGlzdC5yaWdodCA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVYID0gKHNuYXAucmlnaHQgLSB0YXJnZXQubGVmdCkgLyB0YXJnZXQud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoYXR0cnMuc2NhbGVYIC8gdGFyZ2V0LnNjYWxlWCkgKiB0YXJnZXQuc2NhbGVZO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMudG9wID0gdGFyZ2V0LnRvcCArIChoIC0gdGFyZ2V0LmhlaWdodCAqIGF0dHJzLnNjYWxlWSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChkaXN0LnRvcCA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVZID0gKGggLSAoc25hcC50b3AgLSB0YXJnZXQudG9wKSkgLyB0YXJnZXQuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVYID0gKGF0dHJzLnNjYWxlWSAvIHRhcmdldC5zY2FsZVkpICogdGFyZ2V0LnNjYWxlWDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnRvcCA9IHNuYXAudG9wO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbWwnOlxyXG4gICAgICAgICAgICAgIGlmIChkaXN0LmxlZnQgPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWCA9ICh3IC0gKHNuYXAubGVmdCAtIHRhcmdldC5sZWZ0KSkgLyB0YXJnZXQud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5sZWZ0ID0gc25hcC5sZWZ0O1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbXInOlxyXG4gICAgICAgICAgICAgIGlmIChkaXN0LnJpZ2h0IDwgdGhyZXNob2xkKSBhdHRycy5zY2FsZVggPSAoc25hcC5yaWdodCAtIHRhcmdldC5sZWZ0KSAvIHRhcmdldC53aWR0aDtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYmwnOlxyXG4gICAgICAgICAgICAgIGlmIChkaXN0LmxlZnQgPCBkaXN0LmJvdHRvbSAmJiBkaXN0LmxlZnQgPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWCA9ICh3IC0gKHNuYXAubGVmdCAtIHRhcmdldC5sZWZ0KSkgLyB0YXJnZXQud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoYXR0cnMuc2NhbGVYIC8gdGFyZ2V0LnNjYWxlWCkgKiB0YXJnZXQuc2NhbGVZO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMubGVmdCA9IHNuYXAubGVmdDtcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRpc3QuYm90dG9tIDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoc25hcC5ib3R0b20gLSB0YXJnZXQudG9wKSAvIHRhcmdldC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVggPSAoYXR0cnMuc2NhbGVZIC8gdGFyZ2V0LnNjYWxlWSkgKiB0YXJnZXQuc2NhbGVYO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMubGVmdCArPSAodyAtIHRhcmdldC53aWR0aCAqIGF0dHJzLnNjYWxlWCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtYic6XHJcbiAgICAgICAgICAgICAgaWYgKGRpc3QuYm90dG9tIDwgdGhyZXNob2xkKSBhdHRycy5zY2FsZVkgPSAoc25hcC5ib3R0b20gLSB0YXJnZXQudG9wKSAvIHRhcmdldC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JyJzpcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICBpZiAoZGlzdC5yaWdodCA8IGRpc3QuYm90dG9tICYmIGRpc3QucmlnaHQgPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWCA9IChzbmFwLnJpZ2h0IC0gdGFyZ2V0LmxlZnQpIC8gdGFyZ2V0LndpZHRoO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVZID0gKGF0dHJzLnNjYWxlWCAvIHRhcmdldC5zY2FsZVgpICogdGFyZ2V0LnNjYWxlWTtcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRpc3QuYm90dG9tIDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoc25hcC5ib3R0b20gLSB0YXJnZXQudG9wKSAvIHRhcmdldC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVggPSAoYXR0cnMuc2NhbGVZIC8gdGFyZ2V0LnNjYWxlWSkgKiB0YXJnZXQuc2NhbGVYO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRhcmdldC5zZXQoYXR0cnMpO1xyXG4gICAgICAgICAgdGFyZ2V0LnNldENvb3JkcygpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH07XHJcbiAgICAgIGlmICh0aGlzLmdyaWQgPiAwKSB7XHJcbiAgICAgICAgY2FudmFzLm9uKHRoaXMuaGFuZGxlcnMuZ3JpZCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=
