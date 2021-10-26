(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _ProcessGraph = _interopRequireDefault(require("./src/ProcessGraph.js"));

var _LinkableShape = _interopRequireDefault(require("./src/LinkableShape.js"));

var _Container = _interopRequireDefault(require("./src/Container.js"));

var _ExpandableContainer = _interopRequireDefault(require("./src/ExpandableContainer.js"));

var _Link = _interopRequireDefault(require("./src/Link.js"));

var _CurvedLink = _interopRequireDefault(require("./src/CurvedLink.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
                  stroke: '#000',
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
                  _context.next = 19;
                  break;
                }

                _context.next = 12;
                return this._loadImage(this.options.img.src);

              case 12:
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

                _context.next = 20;
                break;

              case 19:
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

              case 20:
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
                  _context.next = 32;
                  break;
                }

                _context.next = 32;
                return this.constructChildren();

              case 32:
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
                return _context.abrupt("return", this);

              case 34:
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
        var newRectHeight = children.length > 0 ? padding + shapes.image.height + margin + initialOpts.child.height + padding : initialOpts.rect.height; // Resize existing shapes

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
        canvas.renderAll();
        this.shape.fire('modified'); // Update all other containers that are below and/or on the right of the current shape, to avoid collision

        shapes.rect.opacity = 0.7;
        var otherShapes = Object.values(canvas.linkableShapes);

        if (otherShapes.length > 1) {
          var deltaX = newRectWidth - oldRectWidth;
          var deltaY = newRectHeight - oldRectHeight;

          for (var o = 0; o < otherShapes.length; o += 1) {
            var shapeToMove = otherShapes[o];

            if (shapeToMove.id !== this.id) {
              if (this.shape.left <= shapeToMove.shape.aCoords.br.x && this.shape.top <= shapeToMove.shape.aCoords.br.y) {
                shapeToMove.move({
                  x: shapeToMove.shape.left + deltaX,
                  y: shapeToMove.shape.top + deltaY,
                  moving: false
                });
              }
            }
          }
        }
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
        var newRectHeight = initialOpts.rect.height; // Resize existing shapes

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
        canvas.renderAll();
        this.shape.fire('modified'); // Update all other containers that are below and/or on the right of the current shape, to avoid collision

        shapes.rect.opacity = 1;
        var otherShapes = Object.values(canvas.linkableShapes);

        if (otherShapes.length > 1) {
          var deltaX = newRectWidth - oldRectWidth;
          var deltaY = newRectHeight - oldRectHeight;

          for (var o = 0; o < otherShapes.length; o += 1) {
            var shapeToMove = otherShapes[o];

            if (otherShapes[o].id !== this.id) {
              if (this.shape.left <= shapeToMove.shape.aCoords.br.x && this.shape.top <= shapeToMove.shape.aCoords.br.y) {
                shapeToMove.move({
                  x: shapeToMove.shape.left + deltaX,
                  y: shapeToMove.shape.top + deltaY,
                  moving: false
                });
              }
            }
          }
        }
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
                spacing = 50;
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
                newOptions.x = top;
                newOptions.y = left + width + spacing;
                return _context4.abrupt("break", 54);

              case 26:
                targetCardinal = 'east';
                newOptions.x = top;
                newOptions.y = left - width - spacing;
                return _context4.abrupt("break", 54);

              case 30:
                targetCardinal = 'south';
                newOptions.x = top - height - spacing;
                newOptions.y = left;
                return _context4.abrupt("break", 54);

              case 34:
                targetCardinal = 'north';
                newOptions.x = top + height + spacing;
                newOptions.y = left;
                return _context4.abrupt("break", 54);

              case 38:
                targetCardinal = 'southwest';
                newOptions.x = top - height - spacing;
                newOptions.y = left + width + spacing;
                return _context4.abrupt("break", 54);

              case 42:
                targetCardinal = 'southeast';
                newOptions.x = top - height - spacing;
                newOptions.y = left - width - spacing;
                return _context4.abrupt("break", 54);

              case 46:
                targetCardinal = 'northwest';
                newOptions.x = top + height + spacing;
                newOptions.y = left + width + spacing;
                return _context4.abrupt("break", 54);

              case 50:
                targetCardinal = 'northeast';
                newOptions.x = top + height + spacing;
                newOptions.y = left - width - spacing;
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
      if (options.x) this.shape.set('left', options.x);
      if (options.y) this.shape.set('top', options.y);
      if (options.originX) this.shape.set('originX', options.originX);
      if (options.originY) this.shape.set('originY', options.originY);
      this.shape.setCoords();
      this.refreshAnchorsPosition();
      this.shape.fire(options.moving ? 'moving' : 'moved');
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
    canvas.link = {}; // Set grid

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsInNyYy9Db250YWluZXIuanMiLCJzcmMvQ3VydmVkTGluay5qcyIsInNyYy9FeHBhbmRhYmxlQ29udGFpbmVyLmpzIiwic3JjL0xpbmsuanMiLCJzcmMvTGlua2FibGVTaGFwZS5qcyIsInNyYy9Qcm9jZXNzR3JhcGguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOztBQUVBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7O0FBRUEsTUFBTSxDQUFDLEVBQVAsR0FBWTtBQUNWLEVBQUEsWUFBWSxFQUFaLHdCQURVO0FBRVYsRUFBQSxhQUFhLEVBQWIseUJBRlU7QUFHVixFQUFBLFNBQVMsRUFBVCxxQkFIVTtBQUlWLEVBQUEsbUJBQW1CLEVBQW5CLCtCQUpVO0FBS1YsRUFBQSxJQUFJLEVBQUosZ0JBTFU7QUFNVixFQUFBLFVBQVUsRUFBVjtBQU5VLENBQVo7Ozs7Ozs7Ozs7OztBQ1RBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxjQUFzQixNQUF0QjtBQUFBLElBQVEsTUFBUixXQUFRLE1BQVI7QUFBQSxJQUFnQixDQUFoQixXQUFnQixDQUFoQjs7SUFFcUIsUzs7Ozs7QUFDbkI7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRSxxQkFBWSxPQUFaLEVBQXFCO0FBQUE7O0FBQUE7O0FBQ25CLFFBQU0sSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLElBQVgsQ0FBZ0I7QUFDM0IsTUFBQSxJQUFJLEVBQUUsQ0FEcUI7QUFFM0IsTUFBQSxHQUFHLEVBQUUsQ0FGc0I7QUFHM0IsTUFBQSxPQUFPLEVBQUUsTUFIa0I7QUFJM0IsTUFBQSxPQUFPLEVBQUUsS0FKa0I7QUFLM0IsTUFBQSxXQUFXLEVBQUUsQ0FMYztBQU0zQixNQUFBLE1BQU0sRUFBRSxNQU5tQjtBQU8zQixNQUFBLElBQUksRUFB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LEdBQWUsQ0FBQyxJQUFJLENBQUMsS0FBTCxHQUFhLE1BQU0sQ0FBQyxJQUFyQixJQUE2QixNQUFNLENBQUMsS0FBbkQ7QUFDQSxrQkFBQSxLQUFLLENBQUMsTUFBTixHQUFnQixLQUFLLENBQUMsTUFBTixHQUFlLE1BQU0sQ0FBQyxNQUF2QixHQUFpQyxNQUFNLENBQUMsTUFBdkQ7QUFDRCxpQkFIRCxNQUdPLElBQUksSUFBSSxDQUFDLE1BQUwsR0FBYyxTQUFsQixFQUE2QjtBQUNsQyxrQkFBQSxLQUFLLENBQUMsTUFBTixHQUFlLENBQUMsSUFBSSxDQUFDLE1BQUwsR0FBYyxNQUFNLENBQUMsR0FBdEIsSUFBNkIsTUFBTSxDQUFDLE1BQW5EO0FBQ0Esa0JBQUEsS0FBSyxDQUFDLE1BQU4sR0FBZ0IsS0FBSyxDQUFDLE1BQU4sR0FBZSxNQUFNLENBQUMsTUFBdkIsR0FBaUMsTUFBTSxDQUFDLE1BQXZEO0FBQ0Q7O0FBQ0Q7QUEvREo7O0FBaUVBLFlBQUEsTUFBTSxDQUFDLEdBQVAsQ0FBVyxLQUFYO0FBQ0EsWUFBQSxNQUFNLENBQUMsU0FBUDtBQUNEO0FBNUdrQixTQUFyQjs7QUE4R0EsWUFBSSxLQUFJLENBQUMsSUFBTCxHQUFZLENBQWhCLEVBQW1CO0FBQ2pCLFVBQUEsTUFBTSxDQUFDLEVBQVAsQ0FBVSxLQUFJLENBQUMsUUFBTCxDQUFjLElBQXhCO0FBQ0Q7QUFDRixPQTVIRDtBQTZIRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBQcm9jZXNzR3JhcGggZnJvbSAnLi9zcmMvUHJvY2Vzc0dyYXBoLmpzJztcclxuXHJcbmltcG9ydCBMaW5rYWJsZVNoYXBlIGZyb20gJy4vc3JjL0xpbmthYmxlU2hhcGUuanMnO1xyXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gJy4vc3JjL0NvbnRhaW5lci5qcyc7XHJcbmltcG9ydCBFeHBhbmRhYmxlQ29udGFpbmVyIGZyb20gJy4vc3JjL0V4cGFuZGFibGVDb250YWluZXIuanMnO1xyXG5cclxuaW1wb3J0IExpbmsgZnJvbSAnLi9zcmMvTGluay5qcyc7XHJcbmltcG9ydCBDdXJ2ZWRMaW5rIGZyb20gJy4vc3JjL0N1cnZlZExpbmsuanMnO1xyXG5cclxud2luZG93LnBnID0ge1xyXG4gIFByb2Nlc3NHcmFwaCxcclxuICBMaW5rYWJsZVNoYXBlLFxyXG4gIENvbnRhaW5lcixcclxuICBFeHBhbmRhYmxlQ29udGFpbmVyLFxyXG4gIExpbmssXHJcbiAgQ3VydmVkTGluayxcclxufTtcclxuIiwiaW1wb3J0IExpbmthYmxlU2hhcGUgZnJvbSAnLi9MaW5rYWJsZVNoYXBlLmpzJztcclxuaW1wb3J0IEN1cnZlZExpbmsgZnJvbSAnLi9DdXJ2ZWRMaW5rLmpzJztcclxuXHJcbmNvbnN0IHsgZmFicmljLCBfIH0gPSB3aW5kb3c7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250YWluZXIgZXh0ZW5kcyBMaW5rYWJsZVNoYXBlIHtcclxuICAvKipcclxuICAgKiBBIENvbnRhaW5lciBpcyBhIFJlY3Qgd2l0aCBhbiBJVGV4dC4gQ2FuIGJlIGV4cGFuZGVkIHRvIHJldmVhbCBjb250YWluZWQgU2hhcGVzLlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBvcHRpb25zXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0ZhYnJpYy5DYW52YXN9ICAgb3B0aW9ucy5jYW52YXMgLSBGYWJyaWMgY2FudmFzXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG9wdGlvbnMuaWQgLSBVbmlxdWUgaWRlbnRpZmllclxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBvcHRpb25zLndpZHRoXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIG9wdGlvbnMuaGVpZ2h0XHJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG9wdGlvbnMubGFiZWxcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICBjb25zdCByZWN0ID0gbmV3IGZhYnJpYy5SZWN0KHtcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBvcmlnaW5YOiAnbGVmdCcsXHJcbiAgICAgIG9yaWdpblk6ICd0b3AnLFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgc3Ryb2tlOiAnIzAwMCcsXHJcbiAgICAgIGZpbGw6ICcjZmZmJyxcclxuICAgICAgcng6IDEwLFxyXG4gICAgICByeTogMTAsXHJcbiAgICAgIHdpZHRoOiBvcHRpb25zLndpZHRoID8gb3B0aW9ucy53aWR0aCA6IDIwMCxcclxuICAgICAgaGVpZ2h0OiBvcHRpb25zLmhlaWdodCA/IG9wdGlvbnMuaGVpZ2h0IDogMTAwLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCB0ZXh0ID0gbmV3IGZhYnJpYy5UZXh0Ym94KG9wdGlvbnMubGFiZWwsIHtcclxuICAgICAgbGVmdDogcmVjdC53aWR0aCAvIDIsXHJcbiAgICAgIHRvcDogcmVjdC5oZWlnaHQgLyAyLFxyXG4gICAgICBzdHlsZXM6IHsgfSxcclxuICAgICAgZm9udFNpemU6IDE0LFxyXG4gICAgICBmb250RmFtaWx5OiAnSGVsdmV0aWNhJyxcclxuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICB3aWR0aDogMTkwLFxyXG4gICAgICBoZWlnaHQ6IDkwLFxyXG4gICAgICBzcGxpdEJ5R3JhcGhlbWU6IHRydWUsXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGdyb3VwID0gbmV3IGZhYnJpYy5Hcm91cChbcmVjdCwgdGV4dF0sIHtcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBvcmlnaW5YOiAnbGVmdCcsXHJcbiAgICAgIG9yaWdpblk6ICd0b3AnLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBuZXdPcHRpb25zID0gXy5jbG9uZURlZXAoXy5vbWl0KG9wdGlvbnMsIFsnY2FudmFzJywgJ3NoYXBlJ10pKTtcclxuICAgIG5ld09wdGlvbnMuY2FudmFzID0gb3B0aW9ucy5jYW52YXM7XHJcbiAgICBuZXdPcHRpb25zLnNoYXBlID0gZ3JvdXA7XHJcbiAgICBzdXBlcihuZXdPcHRpb25zKTtcclxuXHJcbiAgICBncm91cC5vbih7XHJcbiAgICAgIHNjYWxpbmc6ICgpID0+IHtcclxuICAgICAgICAvLyBXaGVuIHNjYWxpbmcsIGtlZXAgdGV4dCBzYW1lIHNpemUgYXMgaW5pdGlhbFxyXG4gICAgICAgIGlmIChncm91cC5zY2FsZVggPCAxKSB7XHJcbiAgICAgICAgICB0ZXh0LnNjYWxlWCA9IDEgKyAoMSAtIGdyb3VwLnNjYWxlWCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRleHQuc2NhbGVYID0gMSAvIChncm91cC5zY2FsZVgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZ3JvdXAuc2NhbGVZIDwgMSkge1xyXG4gICAgICAgICAgdGV4dC5zY2FsZVkgPSAxICsgKDEgLSBncm91cC5zY2FsZVkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0ZXh0LnNjYWxlWSA9IDEgLyAoZ3JvdXAuc2NhbGVZKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jYW52YXMucmVuZGVyQWxsKCk7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIF9vbkFuY2hvclJpZ2h0Q2xpY2sob3B0aW9ucykge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBpZCwgbGVmdCwgdG9wLCBhbmdsZSwgY2FudmFzLCB3aWR0aCwgaGVpZ2h0LFxyXG4gICAgfSA9IHRoaXMuc2hhcGU7XHJcbiAgICBjb25zdCBhcCA9IG9wdGlvbnMudGFyZ2V0O1xyXG4gICAgY29uc3QgeyBjYXJkaW5hbCB9ID0gYXA7XHJcbiAgICBjb25zdCBzcGFjaW5nID0gNTA7XHJcblxyXG4gICAgY29uc3QgbmV4dENvbnRhaW5lciA9IG5ldyBDb250YWluZXIoe1xyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIGlkOiBgJHtpZH1fbmV4dF8ke2NhcmRpbmFsfV8ke01hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMSl9YCxcclxuICAgICAgbGVmdCxcclxuICAgICAgdG9wLFxyXG4gICAgICBhbmdsZSxcclxuICAgICAgbGFiZWw6IGAke2lkfV9uZXh0XyR7Y2FyZGluYWx9YCxcclxuICAgIH0pO1xyXG4gICAgbmV4dENvbnRhaW5lci5pbmplY3QoKTtcclxuXHJcbiAgICBjb25zdCBuZXdPcHRpb25zID0ge307XHJcbiAgICBsZXQgdGFyZ2V0Q2FyZGluYWw7XHJcbiAgICBzd2l0Y2ggKGNhcmRpbmFsKSB7XHJcbiAgICAgIGNhc2UgJ2Vhc3QnOiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnd2VzdCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gdG9wO1xyXG4gICAgICAgIG5ld09wdGlvbnMueCA9IGxlZnQgKyB3aWR0aCArIHNwYWNpbmc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnd2VzdCc6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICdlYXN0JztcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSB0b3A7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gbGVmdCAtIHdpZHRoIC0gc3BhY2luZztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aCc6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICdzb3V0aCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gdG9wIC0gaGVpZ2h0IC0gc3BhY2luZztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSBsZWZ0O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRoJzoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ25vcnRoJztcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSB0b3AgKyBoZWlnaHQgKyBzcGFjaW5nO1xyXG4gICAgICAgIG5ld09wdGlvbnMueCA9IGxlZnQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnbm9ydGhlYXN0Jzoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ3NvdXRod2VzdCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gdG9wIC0gaGVpZ2h0IC0gc3BhY2luZztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSBsZWZ0ICsgd2lkdGggKyBzcGFjaW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRod2VzdCc6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICdzb3V0aGVhc3QnO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IHRvcCAtIGhlaWdodCAtIHNwYWNpbmc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gbGVmdCAtIHdpZHRoIC0gc3BhY2luZztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aGVhc3QnOiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnbm9ydGh3ZXN0JztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSB0b3AgKyBoZWlnaHQgKyBzcGFjaW5nO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IGxlZnQgKyB3aWR0aCArIHNwYWNpbmc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnc291dGh3ZXN0JzpcclxuICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ25vcnRoZWFzdCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gdG9wICsgaGVpZ2h0ICsgc3BhY2luZztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSBsZWZ0IC0gd2lkdGggLSBzcGFjaW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBuZXh0Q29udGFpbmVyLm1vdmUobmV3T3B0aW9ucyk7XHJcbiAgICAvLyBuZXh0Q29udGFpbmVyLnJvdGF0ZShhbmdsZSk7XHJcblxyXG4gICAgY29uc3QgbmV3TGluayA9IG5ldyBDdXJ2ZWRMaW5rKHtcclxuICAgICAgY2FudmFzLFxyXG4gICAgICBzdGFydDoge1xyXG4gICAgICAgIHg6IGFwLmxlZnQsXHJcbiAgICAgICAgeTogYXAudG9wLFxyXG4gICAgICB9LFxyXG4gICAgICBlbmQ6IHtcclxuICAgICAgICB4OiBuZXh0Q29udGFpbmVyLmFuY2hvcnNbdGFyZ2V0Q2FyZGluYWxdLmxlZnQsXHJcbiAgICAgICAgeTogbmV4dENvbnRhaW5lci5hbmNob3JzW3RhcmdldENhcmRpbmFsXS50b3AsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICAgIG5ld0xpbmsuaW5qZWN0KGNhbnZhcyk7XHJcbiAgICBuZXdMaW5rLmNvbm5lY3RMaW5rKCdzdGFydCcsIGFwLnNoYXBlSWQsIGFwLmNhcmRpbmFsKTtcclxuICAgIG5ld0xpbmsuY29ubmVjdExpbmsoJ2VuZCcsIG5leHRDb250YWluZXIuYW5jaG9yc1t0YXJnZXRDYXJkaW5hbF0uc2hhcGVJZCwgbmV4dENvbnRhaW5lci5hbmNob3JzW3RhcmdldENhcmRpbmFsXS5jYXJkaW5hbCk7XHJcbiAgfVxyXG5cclxuICBfb25BbmNob3JMZWZ0Q2xpY2sob3B0aW9ucykge1xyXG4gICAgY29uc3QgYXAgPSBvcHRpb25zLnRhcmdldDtcclxuICAgIGNvbnN0IHsgY2FudmFzIH0gPSB0aGlzO1xyXG5cclxuICAgIC8vIERpc2FibGUgdGhlIG11bHRpIHNlbGVjdGlvbiB3aGVuIG1vdmluZyBtb3VzZVxyXG4gICAgdGhpcy5jYW52YXMuc2VsZWN0aW9uID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3Qgb3Bwb3NpdGVDYXJkaW5hbCA9IHtcclxuICAgICAgZWFzdDogJ3dlc3QnLFxyXG4gICAgICB3ZXN0OiAnZWFzdCcsXHJcbiAgICAgIG5vcnRoOiAnc291dGgnLFxyXG4gICAgICBzb3V0aDogJ25vcnRoJyxcclxuICAgIH07XHJcbiAgICBjb25zdCBuZXdMaW5rID0gbmV3IEN1cnZlZExpbmsoe1xyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgeDogYXAubGVmdCxcclxuICAgICAgICB5OiBhcC50b3AsXHJcbiAgICAgICAgZGlyZWN0aW9uOiBhcC5jYXJkaW5hbCxcclxuICAgICAgfSxcclxuICAgICAgZW5kOiB7XHJcbiAgICAgICAgeDogYXAubGVmdCxcclxuICAgICAgICB5OiBhcC50b3AsXHJcbiAgICAgICAgZGlyZWN0aW9uOiBvcHBvc2l0ZUNhcmRpbmFsW2FwLmNhcmRpbmFsXSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgbmV3TGluay5pbmplY3QoY2FudmFzKTtcclxuICAgIG5ld0xpbmsuY29ubmVjdExpbmsoJ3N0YXJ0JywgYXAuc2hhcGVJZCwgYXAuY2FyZGluYWwpO1xyXG4gICAgbmV3TGluay5hcnJvd0hlYWQuZmlyZSgnbW91c2Vkb3duJyk7XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZU1vdmUgPSAoZXZlbnQpID0+IHtcclxuICAgICAgbmV3TGluay5hcnJvd0hlYWQubGVmdCA9IGV2ZW50LnBvaW50ZXIueDtcclxuICAgICAgbmV3TGluay5hcnJvd0hlYWQudG9wID0gZXZlbnQucG9pbnRlci55O1xyXG4gICAgICBuZXdMaW5rLmFycm93SGVhZC5maXJlKCdtb3ZpbmcnKTtcclxuICAgIH07XHJcbiAgICBjYW52YXMub24oJ21vdXNlOm1vdmUnLCBvbk1vdXNlTW92ZSk7XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZUNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAvLyBFbmFibGUgYmFjayB0aGUgbXVsdGkgc2VsZWN0aW9uIHdoZW4gbW92aW5nIG1vdXNlXHJcbiAgICAgIHRoaXMuY2FudmFzLnNlbGVjdGlvbiA9IHRydWU7XHJcblxyXG4gICAgICBuZXdMaW5rLmFycm93SGVhZC5maXJlKCdtb3ZlZCcpO1xyXG4gICAgICBuZXdMaW5rLmFycm93SGVhZC5maXJlKCdtb3VzZXVwJyk7XHJcbiAgICAgIGNhbnZhcy5vZmYoJ21vdXNlOm1vdmUnLCBvbk1vdXNlTW92ZSk7XHJcbiAgICAgIGNhbnZhcy5vZmYoJ21vdXNlOnVwJywgb25Nb3VzZUNsaWNrKTtcclxuICAgIH07XHJcbiAgICBjYW52YXMub24oJ21vdXNlOnVwJywgb25Nb3VzZUNsaWNrKTtcclxuICB9XHJcbn1cclxuIiwiY29uc3QgeyBmYWJyaWMgfSA9IHdpbmRvdztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1cnZlZExpbmsge1xyXG4gIC8qKlxyXG4gICAqIEEgTGluayBpcyBhIEZhYnJpYy5QYXRoIG9iamVjdCB3aG9zZSBTdGFydCBhbmQgRW5kIHBvaW50cyBjYW4gYmUgY29ubmVjdGVkIGVuZCBhbnkgYW5jaG9yIG9mIHR3byBMaW5rYWJsZVNoYXBlLlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBvcHRpb25zXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0ZhYnJpYy5DYW52YXN9ICAgb3B0aW9ucy5jYW52YXMgLSBGYWJyaWMgY2FudmFzXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG9wdGlvbnMuaWQgLSBVbmlxdWUgaWRlbnRpZmllclxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLnN0YXJ0XSAtIENvb3JkaW5hdGVzIG9mIHRoZSBzdGFydCBwb2ludFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBbb3B0aW9ucy5zdGFydC54XSAtIFggYXhpcyBjb29yZGluYXRlIG9mIHRoZSBzdGFydCBwb2ludFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBbb3B0aW9ucy5zdGFydC55XSAtIFkgYXhpcyBjb29yZGluYXRlIG9mIHRoZSBzdGFydCBwb2ludFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBbb3B0aW9ucy5zdGFydC5kaXJlY3Rpb25dIC1cclxuICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgW29wdGlvbnMuZW5kLnhdIC0gWCBheGlzIGNvb3JkaW5hdGUgb2YgdGhlIGVuZCBwb2ludFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBbb3B0aW9ucy5lbmQueV0gLSBZIGF4aXMgY29vcmRpbmF0ZSBvZiB0aGUgZW5kIHBvaW50XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIFtvcHRpb25zLmVuZC5kaXJlY3Rpb25dIC1cclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuY3VzdG9tXSAtIE9wdGlvbnMgZW5kIGN1c3RvbWl6ZSB0aGUgZGlmZmVyZW50IHNoYXBlcyBvZiB0aGUgTGlua1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLmN1c3RvbS5wYXRoXSAtIGJlemllciBxdWFkcmF0aWMgY3VydmVcclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuY3VzdG9tLnN0YXJ0UG9pbnRdIC0gYWthIGFycm93VGFpbFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBbb3B0aW9ucy5jdXN0b20uZW5kUG9pbnRdIC0gYWthIGFycm93SGVhZFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgaWQsXHJcbiAgICAgIGNhbnZhcyxcclxuICAgIH0gPSBvcHRpb25zO1xyXG4gICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICB0aGlzLmRpcmVjdGlvbiA9IHtcclxuICAgICAgc3RhcnQ6IG9wdGlvbnMgJiYgb3B0aW9ucy5zdGFydCAmJiBvcHRpb25zLnN0YXJ0LmRpcmVjdGlvbiA/IG9wdGlvbnMuc3RhcnQuZGlyZWN0aW9uIDogJ2Vhc3QnLFxyXG4gICAgICBlbmQ6IG9wdGlvbnMgJiYgb3B0aW9ucy5lbmQgJiYgb3B0aW9ucy5lbmQuZGlyZWN0aW9uID8gb3B0aW9ucy5lbmQuZGlyZWN0aW9uIDogJ3dlc3QnLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHN0YXJ0ID0ge1xyXG4gICAgICB4OiBvcHRpb25zICYmIG9wdGlvbnMuc3RhcnQgJiYgb3B0aW9ucy5zdGFydC54ID8gb3B0aW9ucy5zdGFydC54IDogMCxcclxuICAgICAgeTogb3B0aW9ucyAmJiBvcHRpb25zLnN0YXJ0ICYmIG9wdGlvbnMuc3RhcnQueSA/IG9wdGlvbnMuc3RhcnQueSA6IDAsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgZW5kID0ge1xyXG4gICAgICB4OiBvcHRpb25zICYmIG9wdGlvbnMuZW5kICYmIG9wdGlvbnMuZW5kLnggPyBvcHRpb25zLmVuZC54IDogMCxcclxuICAgICAgeTogb3B0aW9ucyAmJiBvcHRpb25zLmVuZCAmJiBvcHRpb25zLmVuZC55ID8gb3B0aW9ucy5lbmQueSA6IDAsXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFBhdGgsIGEgYmV6aWVyIGN1YmljIGN1cnZlXHJcbiAgICBjb25zdCB7IHBhdGhDb29yZHNBcnJheSB9ID0gdGhpcy5jb21wdXRlUGF0aENvb3Jkcyh7XHJcbiAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgeDogc3RhcnQueCxcclxuICAgICAgICB5OiBzdGFydC55LFxyXG4gICAgICAgIGRpcmVjdGlvbjogdGhpcy5kaXJlY3Rpb24uc3RhcnQsXHJcbiAgICAgIH0sXHJcbiAgICAgIGVuZDoge1xyXG4gICAgICAgIHg6IGVuZC54LFxyXG4gICAgICAgIHk6IGVuZC55LFxyXG4gICAgICAgIGRpcmVjdGlvbjogdGhpcy5kaXJlY3Rpb24uZW5kLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBwYXRoT3B0cyA9IHRoaXMuZGVmYXVsdFBhdGhPcHRpb25zID0ge1xyXG4gICAgICBmaWxsOiAnJyxcclxuICAgICAgc3Ryb2tlOiAob3B0aW9ucy5jdXN0b20gJiYgb3B0aW9ucy5jdXN0b20ucGF0aCAmJiBvcHRpb25zLmN1c3RvbS5wYXRoLnN0cm9rZSkgPyBvcHRpb25zLmN1c3RvbS5wYXRoLnN0cm9rZSA6ICcjMDAwJyxcclxuICAgICAgc3Ryb2tlV2lkdGg6IChvcHRpb25zLmN1c3RvbSAmJiBvcHRpb25zLmN1c3RvbS5wYXRoICYmIG9wdGlvbnMuY3VzdG9tLnBhdGguc3Ryb2tlV2lkdGgpID8gb3B0aW9ucy5jdXN0b20ucGF0aC5zdHJva2VXaWR0aCA6IDIsXHJcbiAgICAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgICBoYXNCb3JkZXJzOiB0cnVlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAgIHBlclBpeGVsVGFyZ2V0RmluZDogdHJ1ZSxcclxuICAgIH07XHJcbiAgICBjb25zdCBwYXRoID0gbmV3IGZhYnJpYy5QYXRoKHBhdGhDb29yZHNBcnJheSwgcGF0aE9wdHMpO1xyXG4gICAgdGhpcy5wYXRoID0gcGF0aDtcclxuXHJcbiAgICAvLyBFbmQgcG9pbnQgKGFycm93SGVhZClcclxuICAgIGNvbnN0IGlzVmFsaWRNYXNrT3B0cyA9IHtcclxuICAgICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAgIGxlZnQ6IDAsXHJcbiAgICAgIHRvcDogMCxcclxuICAgICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAgIHJhZGl1czogMTYsXHJcbiAgICAgIGZpbGw6ICcjNTdiODU3JywgLy8gZWE0ZjM3XHJcbiAgICAgIHN0cm9rZTogJyM1N2I4NTcnLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAgIHNlbGVjdGFibGU6IGZhbHNlLFxyXG4gICAgICBvcGFjaXR5OiAwLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGFycm93SGVhZE9wdHMgPSB7XHJcbiAgICAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgICB3aWR0aDogMTAsXHJcbiAgICAgIGhlaWdodDogMTAsXHJcbiAgICAgIGxlZnQ6IGVuZC54LFxyXG4gICAgICB0b3A6IGVuZC55LFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgZmlsbDogJyMwMDAnLFxyXG4gICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICBzdHJva2U6ICcjMDAwJyxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgICBoYXNCb3JkZXJzOiBmYWxzZSxcclxuICAgICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGFycm93SGVhZCA9IHRoaXMuYXJyb3dIZWFkID0gbmV3IGZhYnJpYy5UcmlhbmdsZShhcnJvd0hlYWRPcHRzKTtcclxuICAgIHRoaXMuaXNWYWxpZEhlYWRDb25uZWN0aW9uTWFzayA9IG5ldyBmYWJyaWMuQ2lyY2xlKGlzVmFsaWRNYXNrT3B0cyk7XHJcbiAgICBhcnJvd0hlYWQub24oJ21vdmluZycsICgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVQYXRoKHtcclxuICAgICAgICBlbmQ6IHtcclxuICAgICAgICAgIHg6IGFycm93SGVhZC5sZWZ0LFxyXG4gICAgICAgICAgeTogYXJyb3dIZWFkLnRvcCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbW1pdDogZmFsc2UsXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLl9jaGVja0V4dHJlbWl0eUNhbkJlQ29ubmVjdGVkKCdlbmQnKTtcclxuICAgIH0pO1xyXG4gICAgYXJyb3dIZWFkLm9uKCdtb3ZlZCcsICgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVQYXRoKHtcclxuICAgICAgICBlbmQ6IHtcclxuICAgICAgICAgIHg6IGFycm93SGVhZC5sZWZ0LFxyXG4gICAgICAgICAgeTogYXJyb3dIZWFkLnRvcCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbW1pdDogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuaXNWYWxpZEhlYWRDb25uZWN0aW9uTWFzay5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgICAgdGhpcy5fY29ubmVjdERpc2Nvbm5lY3RFeHRyZW1pdHkoJ2VuZCcpO1xyXG4gICAgfSk7XHJcbiAgICBhcnJvd0hlYWQub24oJ21vdXNlZG93bicsICgpID0+IHtcclxuICAgICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcclxuICAgICAgdGhpcy50b2dnbGVBbGxBbmNob3JzT3BhY2l0eSgxKTtcclxuXHJcbiAgICAgIGFycm93SGVhZC5vbignbW91c2V1cCcsICgpID0+IHtcclxuICAgICAgICB0aGlzLnRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KDApO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFN0YXJ0IHBvaW50IChhcnJvd1RhaWwpXHJcbiAgICBjb25zdCBhcnJvd1RhaWxPcHRzID0ge1xyXG4gICAgICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgICAgd2lkdGg6IDEwLFxyXG4gICAgICBoZWlnaHQ6IDEwLFxyXG4gICAgICBsZWZ0OiBzdGFydC54LFxyXG4gICAgICB0b3A6IHN0YXJ0LnksXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICBmaWxsOiAnI2ZmZicsXHJcbiAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgIHN0cm9rZTogJyMwMDAnLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIHNlbGVjdGFibGU6IHRydWUsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgYXJyb3dUYWlsID0gdGhpcy5hcnJvd1RhaWwgPSBuZXcgZmFicmljLlJlY3QoYXJyb3dUYWlsT3B0cyk7XHJcbiAgICB0aGlzLmlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2sgPSBuZXcgZmFicmljLkNpcmNsZShpc1ZhbGlkTWFza09wdHMpO1xyXG4gICAgYXJyb3dUYWlsLm9uKCdtb3ZpbmcnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aCh7XHJcbiAgICAgICAgc3RhcnQ6IHtcclxuICAgICAgICAgIHg6IGFycm93VGFpbC5sZWZ0LFxyXG4gICAgICAgICAgeTogYXJyb3dUYWlsLnRvcCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbW1pdDogZmFsc2UsXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLl9jaGVja0V4dHJlbWl0eUNhbkJlQ29ubmVjdGVkKCdzdGFydCcpO1xyXG4gICAgfSk7XHJcbiAgICBhcnJvd1RhaWwub24oJ21vdmVkJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhdGgoe1xyXG4gICAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgICB4OiBhcnJvd1RhaWwubGVmdCxcclxuICAgICAgICAgIHk6IGFycm93VGFpbC50b3AsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21taXQ6IHRydWUsXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2suc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICAgIHRoaXMuX2Nvbm5lY3REaXNjb25uZWN0RXh0cmVtaXR5KCdzdGFydCcpO1xyXG4gICAgfSk7XHJcbiAgICBhcnJvd1RhaWwub24oJ21vdXNlZG93bicsICgpID0+IHtcclxuICAgICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcclxuICAgICAgdGhpcy50b2dnbGVBbGxBbmNob3JzT3BhY2l0eSgxKTtcclxuXHJcbiAgICAgIGFycm93VGFpbC5vbignbW91c2V1cCcsICgpID0+IHtcclxuICAgICAgICB0aGlzLnRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KDApO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5qZWN0KCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHBhdGgsXHJcbiAgICAgIGFycm93SGVhZCxcclxuICAgICAgYXJyb3dUYWlsLFxyXG4gICAgICBpc1ZhbGlkVGFpbENvbm5lY3Rpb25NYXNrLFxyXG4gICAgICBpc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrLFxyXG4gICAgfSA9IHRoaXM7XHJcbiAgICBjYW52YXMuYWRkKGlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2spO1xyXG4gICAgY2FudmFzLmFkZChpc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrKTtcclxuICAgIGNhbnZhcy5hZGQoYXJyb3dIZWFkKTtcclxuICAgIGNhbnZhcy5hZGQoYXJyb3dUYWlsKTtcclxuXHJcbiAgICBjYW52YXMuYWRkKHBhdGgpO1xyXG5cclxuICAgIHRoaXMudXBkYXRlUGF0aCh7XHJcbiAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgeDogcGF0aC5wYXRoWzBdWzFdLFxyXG4gICAgICAgIHk6IHBhdGgucGF0aFswXVsyXSxcclxuICAgICAgfSxcclxuICAgICAgZW5kOiB7XHJcbiAgICAgICAgeDogcGF0aC5wYXRoWzJdWzVdLFxyXG4gICAgICAgIHk6IHBhdGgucGF0aFsyXVs2XSxcclxuICAgICAgfSxcclxuICAgICAgY29tbWl0OiB0cnVlLFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBjb25uZWN0TGluayhsaW5rUG9pbnQsIHNoYXBlSWQsIGNhcmRpbmFsKSB7XHJcbiAgICAvLyBDaGVjayBub3QgYWxyZWFkeSBjb25uZWN0ZWRcclxuICAgIGlmICghdGhpcy5pc1ZhbGlkQ29ubmVjdGlvbihsaW5rUG9pbnQsIHNoYXBlSWQsIGNhcmRpbmFsKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBzaGFwZSA9IHRoaXMuY2FudmFzLmdldE9iamVjdHMoKVxyXG4gICAgICAuZmluZCgobykgPT4gby5pZCA9PT0gc2hhcGVJZCk7XHJcblxyXG4gICAgLy8gRGlzY29ubmVjdCBleGlzdGluZyBvYmplY3RcclxuICAgIHRoaXMuZGlzY29ubmVjdExpbmsobGlua1BvaW50KTtcclxuXHJcbiAgICAvLyBDb25uZWN0XHJcbiAgICB0aGlzLmRpcmVjdGlvbltsaW5rUG9pbnRdID0gY2FyZGluYWw7XHJcbiAgICB0aGlzW2xpbmtQb2ludF0gPSB7XHJcbiAgICAgIHNoYXBlLFxyXG4gICAgICBhbmNob3I6IGNhcmRpbmFsLFxyXG4gICAgICBoYW5kbGVyczoge1xyXG4gICAgICAgIG9uQW5jaG9yUG9zaXRpb25Nb2RpZnlpbmc6ICgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IG9wdHMgPSB7XHJcbiAgICAgICAgICAgIGNvbW1pdDogZmFsc2UsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgb3B0c1tsaW5rUG9pbnRdID0ge1xyXG4gICAgICAgICAgICB4OiBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5sZWZ0LFxyXG4gICAgICAgICAgICB5OiBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS50b3AsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVQYXRoKG9wdHMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25BbmNob3JQb3NpdGlvbk1vZGlmaWVkOiAoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBvcHRzID0ge1xyXG4gICAgICAgICAgICBjb21taXQ6IHRydWUsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgb3B0c1tsaW5rUG9pbnRdID0ge1xyXG4gICAgICAgICAgICB4OiBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5sZWZ0LFxyXG4gICAgICAgICAgICB5OiBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS50b3AsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVQYXRoKG9wdHMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ub3BhY2l0eSA9IDA7XHJcbiAgICBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5vbigncGc6cG9zaXRpb246bW9kaWZ5aW5nJywgdGhpc1tsaW5rUG9pbnRdLmhhbmRsZXJzLm9uQW5jaG9yUG9zaXRpb25Nb2RpZnlpbmcpO1xyXG4gICAgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ub24oJ3BnOnBvc2l0aW9uOm1vZGlmaWVkJywgdGhpc1tsaW5rUG9pbnRdLmhhbmRsZXJzLm9uQW5jaG9yUG9zaXRpb25Nb2RpZmllZCk7XHJcblxyXG4gICAgLy8gVXBkYXRlIExpbmtcclxuICAgIGNvbnN0IG9wdHMgPSB7XHJcbiAgICAgIGNvbW1pdDogZmFsc2UsXHJcbiAgICB9O1xyXG4gICAgb3B0c1tsaW5rUG9pbnRdID0ge1xyXG4gICAgICB4OiBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5sZWZ0LFxyXG4gICAgICB5OiBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS50b3AsXHJcbiAgICB9O1xyXG4gICAgdGhpcy51cGRhdGVQYXRoKG9wdHMpO1xyXG4gIH1cclxuXHJcbiAgZGlzY29ubmVjdExpbmsobGlua1BvaW50KSB7XHJcbiAgICBpZiAodGhpc1tsaW5rUG9pbnRdKSB7XHJcbiAgICAgIHRoaXNbbGlua1BvaW50XS5zaGFwZS5hbmNob3JzW3RoaXNbbGlua1BvaW50XS5hbmNob3JdLm9mZigncGc6cG9zaXRpb246bW9kaWZ5aW5nJywgdGhpc1tsaW5rUG9pbnRdLmhhbmRsZXJzLm9uQW5jaG9yUG9zaXRpb25Nb2RpZnlpbmcpO1xyXG4gICAgICB0aGlzW2xpbmtQb2ludF0uc2hhcGUuYW5jaG9yc1t0aGlzW2xpbmtQb2ludF0uYW5jaG9yXS5vZmYoJ3BnOnBvc2l0aW9uOm1vZGlmaWVkJywgdGhpc1tsaW5rUG9pbnRdLmhhbmRsZXJzLm9uQW5jaG9yUG9zaXRpb25Nb2RpZmllZCk7XHJcbiAgICAgIGRlbGV0ZSB0aGlzW2xpbmtQb2ludF07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBicmluZ1RvRnJvbnQoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgcGF0aCxcclxuICAgICAgYXJyb3dIZWFkLFxyXG4gICAgICBhcnJvd1RhaWwsXHJcbiAgICB9ID0gdGhpcztcclxuICAgIGNhbnZhcy5icmluZ1RvRnJvbnQocGF0aCk7XHJcbiAgICBjYW52YXMuYnJpbmdUb0Zyb250KGFycm93SGVhZCk7XHJcbiAgICBjYW52YXMuYnJpbmdUb0Zyb250KGFycm93VGFpbCk7XHJcbiAgfVxyXG5cclxuICBjb21wdXRlUGF0aENvb3JkcyhvcHRpb25zKSB7XHJcbiAgICAvLyBNYWdpZSBtYWdpZSwgZXQgdm9zIGlkw6llcyBvbnQgZHUgZ8OpbmllICFcclxuXHJcbiAgICBjb25zdCBzdGFydCA9IHtcclxuICAgICAgeDogb3B0aW9ucy5zdGFydC54LFxyXG4gICAgICB5OiBvcHRpb25zLnN0YXJ0LnksXHJcbiAgICAgIGRpcmVjdGlvbjogb3B0aW9ucy5zdGFydCAmJiBvcHRpb25zLnN0YXJ0LmRpcmVjdGlvbiA/IG9wdGlvbnMuc3RhcnQuZGlyZWN0aW9uIDogdGhpcy5kaXJlY3Rpb24uc3RhcnQsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgZW5kID0ge1xyXG4gICAgICB4OiBvcHRpb25zLmVuZC54LFxyXG4gICAgICB5OiBvcHRpb25zLmVuZC55LFxyXG4gICAgICBkaXJlY3Rpb246IG9wdGlvbnMuZW5kICYmIG9wdGlvbnMuZW5kLmRpcmVjdGlvbiA/IG9wdGlvbnMuZW5kLmRpcmVjdGlvbiA6IHRoaXMuZGlyZWN0aW9uLmVuZCxcclxuICAgIH07XHJcblxyXG4gICAgLy8gQ2VudGVyIHBvaW50XHJcbiAgICAvLyBJZiBMaW5rIGlzIGNvbm5lY3RlZCwgY2VudGVyIGlzIGNhbGN1bGF0ZWQgYmV0d2VlbiB0aGUgdHdvIGxpbmtlZCBzaGFwZXNcclxuICAgIC8vIElmIG5vdCwgaXQgaXMgY2FsY3VsYXRlZCBiZXR3ZWVuIGxpbmsgc3RhcnQgYW5kIGVuZCBwb2ludHNcclxuICAgIGNvbnN0IGNlbnRlciA9IHtcclxuICAgICAgeDogKChzdGFydC54ICsgZW5kLngpIC8gMiksXHJcbiAgICAgIHk6ICgoc3RhcnQueSArIGVuZC55KSAvIDIpLFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDT01NRU5URUQ6IERvZXNuJ3Qgd29yayB3ZWxsIHdoZW4gbGlua2VkIHNoYXBlIGlzIHJvdGF0ZWRcclxuICAgIC8vIGlmICh0aGlzLnN0YXJ0ICYmIHRoaXMuZW5kICYmIHN0YXJ0LmRpcmVjdGlvbiAhPT0gZW5kLmRpcmVjdGlvbikge1xyXG4gICAgLy8gICBjZW50ZXIgPSB7XHJcbiAgICAvLyAgICAgeDogKHRoaXMuc3RhcnQuc2hhcGUuZ2V0Q2VudGVyUG9pbnQoKS54ICsgdGhpcy5lbmQuc2hhcGUuZ2V0Q2VudGVyUG9pbnQoKS54KSAvIDIsXHJcbiAgICAvLyAgICAgeTogKHRoaXMuc3RhcnQuc2hhcGUuZ2V0Q2VudGVyUG9pbnQoKS55ICsgdGhpcy5lbmQuc2hhcGUuZ2V0Q2VudGVyUG9pbnQoKS55KSAvIDIsXHJcbiAgICAvLyAgIH07XHJcbiAgICAvLyB9XHJcblxyXG4gICAgY29uc3QgY29udHJvbHMgPSB7XHJcbiAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgeDogc3RhcnQueCxcclxuICAgICAgICB5OiBzdGFydC55LFxyXG4gICAgICB9LFxyXG4gICAgICBlbmQ6IHtcclxuICAgICAgICB4OiBlbmQueCxcclxuICAgICAgICB5OiBlbmQueSxcclxuICAgICAgfSxcclxuICAgICAgY2VudGVyMToge1xyXG4gICAgICAgIHg6IGNlbnRlci54LFxyXG4gICAgICAgIHk6IGNlbnRlci55LFxyXG4gICAgICB9LFxyXG4gICAgICBjZW50ZXIyOiB7XHJcbiAgICAgICAgeDogY2VudGVyLngsXHJcbiAgICAgICAgeTogY2VudGVyLnksXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgc3dpdGNoIChvcHRpb25zLnN0YXJ0LmRpcmVjdGlvbikge1xyXG4gICAgICBjYXNlICdub3J0aCc6XHJcbiAgICAgICAgY29udHJvbHMuc3RhcnQueSAtPSBNYXRoLmFicyhzdGFydC55IC0gY2VudGVyLnkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdzb3V0aCc6XHJcbiAgICAgICAgY29udHJvbHMuc3RhcnQueSArPSBNYXRoLmFicyhzdGFydC55IC0gY2VudGVyLnkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdlYXN0JzpcclxuICAgICAgICBjb250cm9scy5zdGFydC54ICs9IE1hdGguYWJzKHN0YXJ0LnggLSBjZW50ZXIueCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3dlc3QnOlxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbnRyb2xzLnN0YXJ0LnggLT0gTWF0aC5hYnMoc3RhcnQueCAtIGNlbnRlci54KTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHN3aXRjaCAob3B0aW9ucy5lbmQuZGlyZWN0aW9uKSB7XHJcbiAgICAgIGNhc2UgJ25vcnRoJzpcclxuICAgICAgICBjb250cm9scy5lbmQueSAtPSBNYXRoLmFicyhlbmQueSAtIGNlbnRlci55KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnc291dGgnOlxyXG4gICAgICAgIGNvbnRyb2xzLmVuZC55ICs9IE1hdGguYWJzKGVuZC55IC0gY2VudGVyLnkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdlYXN0JzpcclxuICAgICAgICBjb250cm9scy5lbmQueCArPSBNYXRoLmFicyhlbmQueCAtIGNlbnRlci54KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnd2VzdCc6XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29udHJvbHMuZW5kLnggLT0gTWF0aC5hYnMoZW5kLnggLSBjZW50ZXIueCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHN0YXJ0LmRpcmVjdGlvbiA9PT0gZW5kLmRpcmVjdGlvbikge1xyXG4gICAgICAvLyBjb25zdCBkZWx0YVggPSBNYXRoLmFicyhzdGFydC54IC0gZW5kLngpIC8gMjtcclxuICAgICAgLy8gY29uc3QgZGVsdGFZID0gTWF0aC5hYnMoc3RhcnQueSAtIGVuZC55KSAvIDI7XHJcbiAgICAgIC8vIGNvbnN0IGRlbHRhWCA9IDQwICsgTWF0aC5hYnMoc3RhcnQueCAtIGVuZC54KSAvIDQ7XHJcbiAgICAgIC8vIGNvbnN0IGRlbHRhWSA9IDQwICsgTWF0aC5hYnMoc3RhcnQueSAtIGVuZC55KSAvIDQ7XHJcbiAgICAgIGNvbnN0IGRlbHRhWCA9IDQwO1xyXG4gICAgICBjb25zdCBkZWx0YVkgPSA0MDtcclxuXHJcbiAgICAgIGlmIChzdGFydC5kaXJlY3Rpb24gPT09ICdzb3V0aCcgfHwgc3RhcnQuZGlyZWN0aW9uID09PSAnbm9ydGgnKSB7XHJcbiAgICAgICAgLy8gSWYgbGluayBpcyBjb25uZWN0ZWQgdG8gdHdvIHNoYXBlc1xyXG4gICAgICAgIC8vIElmIHNoYXBlcyBhcmUgaG9yaXpvbnRhbGx5IGFsaWduZWQgKGkuZS4gb24gdG9wIG9mIGVhY2ggb3RoZXIpLCB3ZSBtb3ZlIHRoZSBMaW5rIGNlbnRlciBwb2ludCBhIGJpdCB0byB0aGUgbGVmdFxyXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0ICYmIHRoaXMuZW5kKSB7XHJcbiAgICAgICAgICAvLyBJZiBzaGFwZXMgYXJlIHZlcnRpY2FsbHkgYWxpZ25lZCAoaS5lLiBuZXh0IHRvIGVhY2ggb3RoZXIpLCB3ZSBtb3ZlIHRoZSBMaW5rIGNlbnRlciBwb2ludCBhIGJpdCB0byB0aGUgdG9wXHJcbiAgICAgICAgICBpZiAoTWF0aC5hYnMoc3RhcnQueSAtIGVuZC55KSA8IDEwKSB7XHJcbiAgICAgICAgICAgIGNlbnRlci54IC09ICgodGhpcy5zdGFydC5zaGFwZS53aWR0aCArIHRoaXMuZW5kLnNoYXBlLndpZHRoKSAvIDIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2VudGVyLnkgKz0gKHN0YXJ0LmRpcmVjdGlvbiA9PT0gJ3NvdXRoJyA/IGRlbHRhWSA6IC1kZWx0YVkpO1xyXG4gICAgICAgIGNvbnRyb2xzLnN0YXJ0LnkgPSBzdGFydC55ICsgKHN0YXJ0LmRpcmVjdGlvbiA9PT0gJ3NvdXRoJyA/IGRlbHRhWSA6IC1kZWx0YVkpO1xyXG4gICAgICAgIGNvbnRyb2xzLmVuZC55ID0gZW5kLnkgKyAoc3RhcnQuZGlyZWN0aW9uID09PSAnc291dGgnID8gZGVsdGFZIDogLWRlbHRhWSk7XHJcbiAgICAgICAgY29udHJvbHMuY2VudGVyMS54ID0gY2VudGVyLng7XHJcbiAgICAgICAgY29udHJvbHMuY2VudGVyMi54ID0gY2VudGVyLng7XHJcbiAgICAgICAgY29udHJvbHMuY2VudGVyMS55ID0gY29udHJvbHMuc3RhcnQueTtcclxuICAgICAgICBjb250cm9scy5jZW50ZXIyLnkgPSBjb250cm9scy5lbmQueTtcclxuICAgICAgfSBlbHNlIGlmIChzdGFydC5kaXJlY3Rpb24gPT09ICdlYXN0JyB8fCBzdGFydC5kaXJlY3Rpb24gPT09ICd3ZXN0Jykge1xyXG4gICAgICAgIC8vIElmIGxpbmsgaXMgY29ubmVjdGVkIHRvIHR3byBzaGFwZXNcclxuICAgICAgICBpZiAodGhpcy5zdGFydCAmJiB0aGlzLmVuZCkge1xyXG4gICAgICAgICAgLy8gSWYgc2hhcGVzIGFyZSB2ZXJ0aWNhbGx5IGFsaWduZWQgKGkuZS4gbmV4dCB0byBlYWNoIG90aGVyKSwgd2UgbW92ZSB0aGUgTGluayBjZW50ZXIgcG9pbnQgYSBiaXQgdG8gdGhlIHRvcFxyXG4gICAgICAgICAgaWYgKE1hdGguYWJzKHN0YXJ0LnkgLSBlbmQueSkgPCAxMCkge1xyXG4gICAgICAgICAgICBjZW50ZXIueSAtPSAoKHRoaXMuc3RhcnQuc2hhcGUuaGVpZ2h0ICsgdGhpcy5lbmQuc2hhcGUuaGVpZ2h0KSAvIDIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2VudGVyLnggKz0gKHN0YXJ0LmRpcmVjdGlvbiA9PT0gJ2Vhc3QnID8gZGVsdGFYIDogLWRlbHRhWCk7XHJcbiAgICAgICAgY29udHJvbHMuc3RhcnQueCA9IHN0YXJ0LnggKyAoc3RhcnQuZGlyZWN0aW9uID09PSAnZWFzdCcgPyBkZWx0YVggOiAtZGVsdGFYKTtcclxuICAgICAgICBjb250cm9scy5lbmQueCA9IGVuZC54ICsgKHN0YXJ0LmRpcmVjdGlvbiA9PT0gJ2Vhc3QnID8gZGVsdGFYIDogLWRlbHRhWCk7XHJcbiAgICAgICAgY29udHJvbHMuY2VudGVyMS54ID0gY29udHJvbHMuc3RhcnQueDtcclxuICAgICAgICBjb250cm9scy5jZW50ZXIyLnggPSBjb250cm9scy5lbmQueDtcclxuICAgICAgICBjb250cm9scy5jZW50ZXIxLnkgPSBjZW50ZXIueTtcclxuICAgICAgICBjb250cm9scy5jZW50ZXIyLnkgPSBjZW50ZXIueTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChzdGFydC5kaXJlY3Rpb24gPT09ICdzb3V0aCcgfHwgc3RhcnQuZGlyZWN0aW9uID09PSAnbm9ydGgnKSB7XHJcbiAgICAgIGNvbnRyb2xzLmNlbnRlcjEueCA9IGNlbnRlci54O1xyXG4gICAgICBjb250cm9scy5jZW50ZXIxLnkgPSBjb250cm9scy5zdGFydC55O1xyXG4gICAgICBjb250cm9scy5jZW50ZXIyLnggPSBjZW50ZXIueDtcclxuICAgICAgY29udHJvbHMuY2VudGVyMi55ID0gY29udHJvbHMuZW5kLnk7XHJcbiAgICB9IGVsc2UgaWYgKHN0YXJ0LmRpcmVjdGlvbiA9PT0gJ2Vhc3QnIHx8IHN0YXJ0LmRpcmVjdGlvbiA9PT0gJ3dlc3QnKSB7XHJcbiAgICAgIGNvbnRyb2xzLmNlbnRlcjEueCA9IGNvbnRyb2xzLnN0YXJ0Lng7XHJcbiAgICAgIGNvbnRyb2xzLmNlbnRlcjEueSA9IGNlbnRlci55O1xyXG4gICAgICBjb250cm9scy5jZW50ZXIyLnggPSBjb250cm9scy5lbmQueDtcclxuICAgICAgY29udHJvbHMuY2VudGVyMi55ID0gY2VudGVyLnk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSWYgbGluayBpcyBjb25uZWN0ZWQgdG8gbGlua2VkIHNoYXBlcyBhbmQgdGhleSBhcmUgcm90YXRlZCwgcGVyZm9ybSB0aGUgcm90YXRpb24gb24gdGhlIGNvbnRyb2xzIHBvaW50c1xyXG4gICAgLy8gVE9ETzogdG8gaW1wcm92ZVxyXG4gICAgaWYgKHRoaXMuc3RhcnQgJiYgdGhpcy5zdGFydC5zaGFwZSAmJiB0aGlzLnN0YXJ0LnNoYXBlLmFuZ2xlKSB7XHJcbiAgICAgIGNvbnN0IGFuZ2xlID0gKCh0aGlzLnN0YXJ0LnNoYXBlLmFuZ2xlICogTWF0aC5QSSkgLyAxODApO1xyXG5cclxuICAgICAgY29uc3QgY29udHJvbCA9IG5ldyBmYWJyaWMuUG9pbnQoY29udHJvbHMuc3RhcnQueCwgY29udHJvbHMuc3RhcnQueSk7XHJcbiAgICAgIGNvbnN0IG9yaWdpbiA9IG5ldyBmYWJyaWMuUG9pbnQoc3RhcnQueCwgc3RhcnQueSk7XHJcbiAgICAgIGNvbnN0IHJvdGF0ZWRDb250cm9sID0gZmFicmljLnV0aWwucm90YXRlUG9pbnQoY29udHJvbCwgb3JpZ2luLCBhbmdsZSk7XHJcblxyXG4gICAgICBjb250cm9scy5zdGFydC54ID0gcm90YXRlZENvbnRyb2wueDtcclxuICAgICAgY29udHJvbHMuc3RhcnQueSA9IHJvdGF0ZWRDb250cm9sLnk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5lbmQgJiYgdGhpcy5lbmQuc2hhcGUgJiYgdGhpcy5lbmQuc2hhcGUuYW5nbGUpIHtcclxuICAgICAgY29uc3QgYW5nbGUgPSAoKHRoaXMuZW5kLnNoYXBlLmFuZ2xlICogTWF0aC5QSSkgLyAxODApO1xyXG5cclxuICAgICAgY29uc3QgY29udHJvbCA9IG5ldyBmYWJyaWMuUG9pbnQoY29udHJvbHMuZW5kLngsIGNvbnRyb2xzLmVuZC55KTtcclxuICAgICAgY29uc3Qgb3JpZ2luID0gbmV3IGZhYnJpYy5Qb2ludChlbmQueCwgZW5kLnkpO1xyXG4gICAgICBjb25zdCByb3RhdGVkQ29udHJvbCA9IGZhYnJpYy51dGlsLnJvdGF0ZVBvaW50KGNvbnRyb2wsIG9yaWdpbiwgYW5nbGUpO1xyXG5cclxuICAgICAgY29udHJvbHMuZW5kLnggPSByb3RhdGVkQ29udHJvbC54O1xyXG4gICAgICBjb250cm9scy5lbmQueSA9IHJvdGF0ZWRDb250cm9sLnk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVmlzdWFsIGRlYnVnXHJcbiAgICAvLyB0aGlzLmNhbnZhcy5hZGQobmV3IGZhYnJpYy5DaXJjbGUoe1xyXG4gICAgLy8gICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgIC8vICAgbGVmdDogY29udHJvbHMuZW5kLngsXHJcbiAgICAvLyAgIHRvcDogY29udHJvbHMuZW5kLnksXHJcbiAgICAvLyAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgLy8gICByYWRpdXM6IDIsXHJcbiAgICAvLyAgIGZpbGw6ICcjNzhiZWZhJyxcclxuICAgIC8vICAgc3Ryb2tlOiAnIzc4YmVmYScsXHJcbiAgICAvLyAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgLy8gICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgIC8vICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAvLyAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgIC8vICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgIC8vICAgb3BhY2l0eTogMSxcclxuICAgIC8vIH0pKTtcclxuICAgIC8vIHRoaXMuY2FudmFzLmFkZChuZXcgZmFicmljLkNpcmNsZSh7XHJcbiAgICAvLyAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgLy8gICBsZWZ0OiBjZW50ZXIueCxcclxuICAgIC8vICAgdG9wOiBjZW50ZXIueSxcclxuICAgIC8vICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAvLyAgIHJhZGl1czogMixcclxuICAgIC8vICAgZmlsbDogJyNmZjInLFxyXG4gICAgLy8gICBzdHJva2U6ICcjZmYyJyxcclxuICAgIC8vICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAvLyAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgLy8gICBoYXNCb3JkZXJzOiBmYWxzZSxcclxuICAgIC8vICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgLy8gICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgLy8gICBvcGFjaXR5OiAxLFxyXG4gICAgLy8gfSkpO1xyXG4gICAgLy8gdGhpcy5jYW52YXMuYWRkKG5ldyBmYWJyaWMuQ2lyY2xlKHtcclxuICAgIC8vICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAvLyAgIGxlZnQ6IGNvbnRyb2xzLnN0YXJ0LngsXHJcbiAgICAvLyAgIHRvcDogY29udHJvbHMuc3RhcnQueSxcclxuICAgIC8vICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAvLyAgIHJhZGl1czogMixcclxuICAgIC8vICAgZmlsbDogJyNmMjInLFxyXG4gICAgLy8gICBzdHJva2U6ICcjZjIyJyxcclxuICAgIC8vICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAvLyAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgLy8gICBoYXNCb3JkZXJzOiBmYWxzZSxcclxuICAgIC8vICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgLy8gICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgLy8gICBvcGFjaXR5OiAxLFxyXG4gICAgLy8gfSkpO1xyXG5cclxuICAgIGNvbnN0IGNvb3JkcyA9IHtcclxuICAgICAgc3RhcnQ6IHtcclxuICAgICAgICB4OiBzdGFydC54LFxyXG4gICAgICAgIHk6IHN0YXJ0LnksXHJcbiAgICAgIH0sXHJcbiAgICAgIGVuZDoge1xyXG4gICAgICAgIHg6IGVuZC54LFxyXG4gICAgICAgIHk6IGVuZC55LFxyXG4gICAgICB9LFxyXG4gICAgICBjZW50ZXIsXHJcbiAgICAgIGNvbnRyb2xzOiB7XHJcbiAgICAgICAgc3RhcnQ6IHtcclxuICAgICAgICAgIHg6IGNvbnRyb2xzLnN0YXJ0LngsXHJcbiAgICAgICAgICB5OiBjb250cm9scy5zdGFydC55LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW5kOiB7XHJcbiAgICAgICAgICB4OiBjb250cm9scy5lbmQueCxcclxuICAgICAgICAgIHk6IGNvbnRyb2xzLmVuZC55LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2VudGVyMToge1xyXG4gICAgICAgICAgeDogY29udHJvbHMuY2VudGVyMS54LFxyXG4gICAgICAgICAgeTogY29udHJvbHMuY2VudGVyMS55LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2VudGVyMjoge1xyXG4gICAgICAgICAgeDogY29udHJvbHMuY2VudGVyMi54LFxyXG4gICAgICAgICAgeTogY29udHJvbHMuY2VudGVyMi55LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgY29uc3QgcGF0aENvb3Jkc0FycmF5ID0gW1xyXG4gICAgICBbJ00nLCBjb29yZHMuc3RhcnQueCwgY29vcmRzLnN0YXJ0LnldLFxyXG4gICAgICBbJ0MnLCBjb29yZHMuY29udHJvbHMuc3RhcnQueCwgY29vcmRzLmNvbnRyb2xzLnN0YXJ0LnksIGNvb3Jkcy5jb250cm9scy5jZW50ZXIxLngsIGNvb3Jkcy5jb250cm9scy5jZW50ZXIxLnksIGNvb3Jkcy5jZW50ZXIueCwgY29vcmRzLmNlbnRlci55XSxcclxuICAgICAgWydDJywgY29vcmRzLmNvbnRyb2xzLmNlbnRlcjIueCwgY29vcmRzLmNvbnRyb2xzLmNlbnRlcjIueSwgY29vcmRzLmNvbnRyb2xzLmVuZC54LCBjb29yZHMuY29udHJvbHMuZW5kLnksIGNvb3Jkcy5lbmQueCwgY29vcmRzLmVuZC55XSxcclxuICAgIF07XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBwYXRoQ29vcmRzOiBjb29yZHMsXHJcbiAgICAgIHBhdGhDb29yZHNBcnJheSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqIEBwYXJhbSBvcHRpb25zXHJcbiAgICogQHBhcmFtIG9wdGlvbnMuc3RhcnQueFxyXG4gICAqIEBwYXJhbSBvcHRpb25zLnN0YXJ0LnlcclxuICAgKiBAcGFyYW0gb3B0aW9ucy5lbmQueFxyXG4gICAqIEBwYXJhbSBvcHRpb25zLmVuZC55XHJcbiAgICogQHBhcmFtIG9wdGlvbnMuY29tbWl0XHJcbiAgICovXHJcbiAgdXBkYXRlUGF0aChvcHRpb25zKSB7XHJcbiAgICBjb25zdCBzdGFydCA9IHtcclxuICAgICAgeDogb3B0aW9ucy5zdGFydCAmJiBvcHRpb25zLnN0YXJ0LnggPyBvcHRpb25zLnN0YXJ0LnggOiB0aGlzLnBhdGgucGF0aFswXVsxXSxcclxuICAgICAgeTogb3B0aW9ucy5zdGFydCAmJiBvcHRpb25zLnN0YXJ0LnkgPyBvcHRpb25zLnN0YXJ0LnkgOiB0aGlzLnBhdGgucGF0aFswXVsyXSxcclxuICAgICAgZGlyZWN0aW9uOiBvcHRpb25zLnN0YXJ0ICYmIG9wdGlvbnMuc3RhcnQuZGlyZWN0aW9uID8gb3B0aW9ucy5zdGFydC5kaXJlY3Rpb24gOiB0aGlzLmRpcmVjdGlvbi5zdGFydCxcclxuICAgIH07XHJcbiAgICBjb25zdCBlbmQgPSB7XHJcbiAgICAgIHg6IG9wdGlvbnMuZW5kICYmIG9wdGlvbnMuZW5kLnggPyBvcHRpb25zLmVuZC54IDogdGhpcy5wYXRoLnBhdGhbMl1bNV0sXHJcbiAgICAgIHk6IG9wdGlvbnMuZW5kICYmIG9wdGlvbnMuZW5kLnkgPyBvcHRpb25zLmVuZC55IDogdGhpcy5wYXRoLnBhdGhbMl1bNl0sXHJcbiAgICAgIGRpcmVjdGlvbjogb3B0aW9ucy5lbmQgJiYgb3B0aW9ucy5lbmQuZGlyZWN0aW9uID8gb3B0aW9ucy5lbmQuZGlyZWN0aW9uIDogdGhpcy5kaXJlY3Rpb24uZW5kLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHsgcGF0aENvb3Jkc0FycmF5IH0gPSB0aGlzLmNvbXB1dGVQYXRoQ29vcmRzKHtcclxuICAgICAgc3RhcnQsIGVuZCxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChvcHRpb25zLmNvbW1pdCkge1xyXG4gICAgICBjb25zdCBuZXdQYXRoID0gbmV3IGZhYnJpYy5QYXRoKHBhdGhDb29yZHNBcnJheSwgdGhpcy5kZWZhdWx0UGF0aE9wdGlvbnMpO1xyXG4gICAgICB0aGlzLmNhbnZhcy5yZW1vdmUodGhpcy5wYXRoKTtcclxuICAgICAgdGhpcy5jYW52YXMuYWRkKG5ld1BhdGgpO1xyXG5cclxuICAgICAgbmV3UGF0aC5vbignbW91c2Vkb3duJywgdGhpcy5icmluZ1RvRnJvbnQuYmluZCh0aGlzKSk7XHJcbiAgICAgIG5ld1BhdGgub24oJ21vdmluZycsIHRoaXMub25MaW5rTW92aW5nLmJpbmQodGhpcykpO1xyXG4gICAgICBuZXdQYXRoLm9uKCdtb3ZlZCcsIHRoaXMub25MaW5rTW92ZWQuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICBjb25zdCB0b0JpbmQgPSBbXHJcbiAgICAgICAgdGhpcy5hcnJvd0hlYWQsXHJcbiAgICAgICAgdGhpcy5hcnJvd1RhaWwsXHJcbiAgICAgIF07XHJcbiAgICAgIGNvbnN0IGJvc3NUcmFuc2Zvcm0gPSBuZXdQYXRoLmNhbGNUcmFuc2Zvcm1NYXRyaXgoKTtcclxuICAgICAgY29uc3QgaW52ZXJ0ZWRCb3NzVHJhbnNmb3JtID0gZmFicmljLnV0aWwuaW52ZXJ0VHJhbnNmb3JtKGJvc3NUcmFuc2Zvcm0pO1xyXG4gICAgICB0b0JpbmQuZm9yRWFjaCgobykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRlc2lyZWRUcmFuc2Zvcm0gPSBmYWJyaWMudXRpbC5tdWx0aXBseVRyYW5zZm9ybU1hdHJpY2VzKFxyXG4gICAgICAgICAgaW52ZXJ0ZWRCb3NzVHJhbnNmb3JtLFxyXG4gICAgICAgICAgby5jYWxjVHJhbnNmb3JtTWF0cml4KCksXHJcbiAgICAgICAgKTtcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cclxuICAgICAgICBvLnJlbGF0aW9uc2hpcCA9IGRlc2lyZWRUcmFuc2Zvcm07XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5wYXRoID0gbmV3UGF0aDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGF0aC5zZXQoJ3BhdGgnLCBwYXRoQ29vcmRzQXJyYXkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFVwZGF0ZSBjb250cm9sIGxpbmVzLCBhcnJvdyBoZWFkcyBhbmQgdGFpbHNcclxuICAgIGNvbnN0IGFycm93SGVhZEFuZ2xlID0gKE1hdGguYXRhbjIodGhpcy5wYXRoLnBhdGhbMl1bNl0gLSB0aGlzLnBhdGgucGF0aFsyXVs0XSwgdGhpcy5wYXRoLnBhdGhbMl1bNV0gLSB0aGlzLnBhdGgucGF0aFsyXVszXSkgKiAxODApIC8gTWF0aC5QSTtcclxuICAgIHRoaXMuYXJyb3dIZWFkLmFuZ2xlID0gYXJyb3dIZWFkQW5nbGUgKyA5MDtcclxuICAgIHRoaXMuYXJyb3dIZWFkLmxlZnQgPSB0aGlzLnBhdGgucGF0aFsyXVs1XTtcclxuICAgIHRoaXMuYXJyb3dIZWFkLnRvcCA9IHRoaXMucGF0aC5wYXRoWzJdWzZdO1xyXG4gICAgdGhpcy5hcnJvd0hlYWQuc2V0Q29vcmRzKCk7XHJcbiAgICB0aGlzLmFycm93VGFpbC5sZWZ0ID0gdGhpcy5wYXRoLnBhdGhbMF1bMV07XHJcbiAgICB0aGlzLmFycm93VGFpbC50b3AgPSB0aGlzLnBhdGgucGF0aFswXVsyXTtcclxuICAgIHRoaXMuYXJyb3dUYWlsLnNldENvb3JkcygpO1xyXG5cclxuICAgIHRoaXMuYnJpbmdUb0Zyb250KCk7XHJcbiAgfVxyXG5cclxuICBpc1ZhbGlkQ29ubmVjdGlvbihsaW5rUG9pbnQsIHNoYXBlSWQsIGNhcmRpbmFsKSB7XHJcbiAgICBjb25zdCBzaGFwZSA9IHRoaXMuY2FudmFzLmdldE9iamVjdHMoKVxyXG4gICAgICAuZmluZCgobykgPT4gby5pZCA9PT0gc2hhcGVJZCk7XHJcbiAgICAvLyBDaGVjayBub3QgYWxyZWFkeSBjb25uZWN0ZWRcclxuICAgIGlmIChsaW5rUG9pbnQgPT09ICdzdGFydCcpIHtcclxuICAgICAgaWYgKHRoaXMuc3RhcnQgJiYgdGhpcy5zdGFydC5zaGFwZSAmJiB0aGlzLnN0YXJ0LnNoYXBlLmlkID09PSBzaGFwZS5pZCAmJiB0aGlzLnN0YXJ0LmNhcmRpbmFsID09PSBjYXJkaW5hbCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTsgLy8gdHJ5aW5nIGVuZCBzZXQgdGhlIHNhbWUgYWxyZWFkeSBjb25uZWN0ZWQgYW5jaG9yXHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuZW5kICYmIHRoaXMuZW5kLnNoYXBlICYmIHRoaXMuZW5kLnNoYXBlLmlkID09PSBzaGFwZS5pZCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTsgLy8gdHJ5aW5nIGVuZCBzaG9ydCBjaXJjdWl0IHRoZSByZWN0YW5nbGVcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChsaW5rUG9pbnQgPT09ICdlbmQnKSB7XHJcbiAgICAgIGlmICh0aGlzLmVuZCAmJiB0aGlzLmVuZC5zaGFwZSAmJiB0aGlzLmVuZC5zaGFwZS5pZCA9PT0gc2hhcGUuaWQgJiYgdGhpcy5lbmQuY2FyZGluYWwgPT09IGNhcmRpbmFsKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyB0cnlpbmcgZW5kIHNldCB0aGUgc2FtZSBhbHJlYWR5IGNvbm5lY3RlZCBhbmNob3JcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5zdGFydCAmJiB0aGlzLnN0YXJ0LnNoYXBlICYmIHRoaXMuc3RhcnQuc2hhcGUuaWQgPT09IHNoYXBlLmlkKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyB0cnlpbmcgZW5kIHNob3J0IGNpcmN1aXQgdGhlIHJlY3RhbmdsZVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KG9wYWNpdHkpIHtcclxuICAgIGNvbnN0IGFuY2hvcnMgPSB0aGlzLmNhbnZhcy5nZXRPYmplY3RzKClcclxuICAgICAgLmZpbHRlcigobykgPT4gby50eXBlID09PSAnYW5jaG9yJyk7XHJcblxyXG4gICAgLy8gY29uc3QgcHJvbWlzZXMgPSBbXTtcclxuICAgIC8vIGNvbnN0IHByb21pc2VGYWN0b3J5ID0gZnVuY3Rpb24gKGFuY2hvcikge1xyXG4gICAgLy8gICByZXR1cm4gZnVuY3Rpb24gKHJlc29sdmUpIHtcclxuICAgIC8vICAgICBhbmNob3IuYW5pbWF0ZSgnb3BhY2l0eScsIG9wYWNpdHksIHtcclxuICAgIC8vICAgICAgIGR1cmF0aW9uOiAzMDAsXHJcbiAgICAvLyAgICAgICBvbkNoYW5nZTogcmVzb2x2ZSxcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vICAgfTtcclxuICAgIC8vIH07XHJcbiAgICAvLyBmb3IgKGxldCBhID0gMDsgYSA8IGFuY2hvcnMubGVuZ3RoOyBhICs9IDEpIHtcclxuICAgIC8vICAgaWYgKGxvY2sgIT09IHVuZGVmaW5lZCkgYW5jaG9yc1thXS5sb2NrT3BhY2l0eSA9IGxvY2s7XHJcbiAgICAvLyAgIHByb21pc2VzLnB1c2gobmV3IFByb21pc2UocHJvbWlzZUZhY3RvcnkoYW5jaG9yc1thXSkpKTtcclxuICAgIC8vIH1cclxuICAgIC8vIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IHtcclxuICAgIC8vICAgdGhpcy5jYW52YXMucmVuZGVyQWxsKCk7XHJcbiAgICAvLyB9KTtcclxuXHJcbiAgICBmb3IgKGxldCBhID0gMDsgYSA8IGFuY2hvcnMubGVuZ3RoOyBhICs9IDEpIHtcclxuICAgICAgLy8gaWYgKGxvY2sgIT09IHVuZGVmaW5lZCkgYW5jaG9yc1thXS5sb2NrT3BhY2l0eSA9IGxvY2s7XHJcbiAgICAgIGFuY2hvcnNbYV0uc2V0KCdvcGFjaXR5Jywgb3BhY2l0eSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNhbnZhcy5yZW5kZXJBbGwoKTtcclxuICB9XHJcblxyXG4gIG9uTGlua01vdmluZygpIHtcclxuICAgIC8vIE1vdmUgc3RhcnQsIGVuZCwgY29udHJvbCBwb2ludHMgYWx0b2dldGhlciB3aXRoIHRoZSBQYXRoXHJcbiAgICBjb25zdCB0b1VwZGF0ZSA9IFtcclxuICAgICAgdGhpcy5hcnJvd0hlYWQsXHJcbiAgICAgIHRoaXMuYXJyb3dUYWlsLFxyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdCBrZWVwSGVhZEFuZ2xlID0gdGhpcy5hcnJvd0hlYWQuYW5nbGU7XHJcbiAgICBjb25zdCBrZWVwVGFpbEFuZ2xlID0gdGhpcy5hcnJvd1RhaWwuYW5nbGU7XHJcblxyXG4gICAgdG9VcGRhdGUuZm9yRWFjaCgobykgPT4ge1xyXG4gICAgICBpZiAoIW8ucmVsYXRpb25zaGlwKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHsgcmVsYXRpb25zaGlwIH0gPSBvO1xyXG4gICAgICBjb25zdCBuZXdUcmFuc2Zvcm0gPSBmYWJyaWMudXRpbC5tdWx0aXBseVRyYW5zZm9ybU1hdHJpY2VzKFxyXG4gICAgICAgIHRoaXMucGF0aC5jYWxjVHJhbnNmb3JtTWF0cml4KCksXHJcbiAgICAgICAgcmVsYXRpb25zaGlwLFxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBvcHQgPSBmYWJyaWMudXRpbC5xckRlY29tcG9zZShuZXdUcmFuc2Zvcm0pO1xyXG4gICAgICBvLnNldCh7XHJcbiAgICAgICAgZmxpcFg6IGZhbHNlLFxyXG4gICAgICAgIGZsaXBZOiBmYWxzZSxcclxuICAgICAgfSk7XHJcbiAgICAgIG8uc2V0UG9zaXRpb25CeU9yaWdpbihcclxuICAgICAgICB7IHg6IG9wdC50cmFuc2xhdGVYLCB5OiBvcHQudHJhbnNsYXRlWSB9LFxyXG4gICAgICAgICdjZW50ZXInLFxyXG4gICAgICAgICdjZW50ZXInLFxyXG4gICAgICApO1xyXG4gICAgICBvLnNldChvcHQpO1xyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cclxuICAgICAgby5hbmdsZSA9IChvID09PSB0aGlzLmFycm93SGVhZCkgPyBrZWVwSGVhZEFuZ2xlIDoga2VlcFRhaWxBbmdsZTsgLy8gcHJlc2VydmUgcHJldmlvdXMgYW5nbGVcclxuXHJcbiAgICAgIG8uc2V0Q29vcmRzKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBGaW5hbGx5LCBjaGVjayB0aGUgc3RhcnQgb3IgZW5kIHBvaW50cyBjYW4gYmUgY29ubmVjdGVkLlxyXG4gICAgdGhpcy5fY2hlY2tFeHRyZW1pdHlDYW5CZUNvbm5lY3RlZCgnc3RhcnQnKTtcclxuICAgIHRoaXMuX2NoZWNrRXh0cmVtaXR5Q2FuQmVDb25uZWN0ZWQoJ2VuZCcpO1xyXG4gIH1cclxuXHJcbiAgb25MaW5rTW92ZWQoKSB7XHJcbiAgICAvLyBSZXVwZGF0ZSB0aGUgUGF0aCBhY2NvcmRpbmcgZW5kIHRoZSBuZXcgY29vcmRpbmF0ZXMgb2YgYWxsIGVsZW1lbnRzXHJcbiAgICB0aGlzLnVwZGF0ZVBhdGgoe1xyXG4gICAgICBzdGFydDoge1xyXG4gICAgICAgIHg6IHRoaXMuYXJyb3dUYWlsLmxlZnQsXHJcbiAgICAgICAgeTogdGhpcy5hcnJvd1RhaWwudG9wLFxyXG4gICAgICB9LFxyXG4gICAgICBlbmQ6IHtcclxuICAgICAgICB4OiB0aGlzLmFycm93SGVhZC5sZWZ0LFxyXG4gICAgICAgIHk6IHRoaXMuYXJyb3dIZWFkLnRvcCxcclxuICAgICAgfSxcclxuICAgICAgY29tbWl0OiB0cnVlLFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQ29ubmVjdCBvciBEaXNjb25uZWN0IGRlcGVuZGluZyBvbiBleHRyZW1pdGllcyBwb3NpdGlvbnNcclxuICAgIHRoaXMuaXNWYWxpZFRhaWxDb25uZWN0aW9uTWFzay5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgIHRoaXMuaXNWYWxpZEhlYWRDb25uZWN0aW9uTWFzay5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgIHRoaXMuX2Nvbm5lY3REaXNjb25uZWN0RXh0cmVtaXR5KCdzdGFydCcpO1xyXG4gICAgdGhpcy5fY29ubmVjdERpc2Nvbm5lY3RFeHRyZW1pdHkoJ2VuZCcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGVscGVyIGVuZCBkaXNwbGF5IGEgdmFsaWQgY2lyY2xlIG1hc2sgb24gc3BlY2lmaWMgY29uZGl0aW9ucy5cclxuICAgKiBJZiB0aGUgZXh0cmVtaXR5IGlzIHRvdWNoaW5nIGFuIGFuY2hvciBvZiBhIExpbmthYmxlU2hhcGUgc3RhcnQgd2hpY2ggaXQgaXMgbm90IHlldCBjb25uZWN0ZWQgPT4gc2hvdyBHUkVFTlxyXG4gICAqIElmIHRoZSBleHRyZW1pdHkgaXMgdG91Y2hpbmcgYW4gYW5jaG9yIG9mIGEgTGlua2FibGVTaGFwZSBzdGFydCB3aGljaCBpdCBpcyBhbHJlYWR5IGNvbm5lY3RlZCBieSB0aGUgb3RoZXIgZXh0cmVtaXR5ID0+IHNob3cgUkVEXHJcbiAgICogQHBhcmFtIGRpcmVjdGlvblxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX2NoZWNrRXh0cmVtaXR5Q2FuQmVDb25uZWN0ZWQoZGlyZWN0aW9uKSB7XHJcbiAgICBjb25zdCB7IGNhbnZhcyB9ID0gdGhpcztcclxuXHJcbiAgICBsZXQgZXh0cmVtaXR5O1xyXG4gICAgbGV0IG1hc2s7XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSAnc3RhcnQnKSB7XHJcbiAgICAgIGV4dHJlbWl0eSA9IHRoaXMuYXJyb3dUYWlsO1xyXG4gICAgICBtYXNrID0gdGhpcy5pc1ZhbGlkVGFpbENvbm5lY3Rpb25NYXNrO1xyXG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdlbmQnKSB7XHJcbiAgICAgIGV4dHJlbWl0eSA9IHRoaXMuYXJyb3dIZWFkO1xyXG4gICAgICBtYXNrID0gdGhpcy5pc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrO1xyXG4gICAgfVxyXG5cclxuICAgIG1hc2subGVmdCA9IGV4dHJlbWl0eS5sZWZ0O1xyXG4gICAgbWFzay50b3AgPSBleHRyZW1pdHkudG9wO1xyXG4gICAgbWFzay5zZXRDb29yZHMoKTtcclxuICAgIG1hc2suc2V0KCdvcGFjaXR5JywgMCk7XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgaW50ZXJzZWN0cyB3aXRoIGFuY2hvclxyXG4gICAgY29uc3QgYW5jaG9ycyA9IGNhbnZhcy5nZXRPYmplY3RzKClcclxuICAgICAgLmZpbHRlcigobykgPT4gby50eXBlID09PSAnYW5jaG9yJyk7XHJcbiAgICBleHRyZW1pdHkuc2V0KCdzdHJva2UnLCAnIzAwMCcpO1xyXG4gICAgZm9yIChsZXQgYSA9IDA7IGEgPCBhbmNob3JzLmxlbmd0aDsgYSArPSAxKSB7XHJcbiAgICAgIGlmIChleHRyZW1pdHkuaW50ZXJzZWN0c1dpdGhPYmplY3QoYW5jaG9yc1thXSkpIHtcclxuICAgICAgICBtYXNrLnNldCgnb3BhY2l0eScsIDAuNSk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZENvbm5lY3Rpb24oZGlyZWN0aW9uLCBhbmNob3JzW2FdLnNoYXBlSWQsIGFuY2hvcnNbYV0uY2FyZGluYWwpKSB7XHJcbiAgICAgICAgICBtYXNrLnNldCh7XHJcbiAgICAgICAgICAgIHN0cm9rZTogJyM1N2I4NTcnLFxyXG4gICAgICAgICAgICBmaWxsOiAnIzU3Yjg1NycsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGV4dHJlbWl0eS5zZXQoJ3N0cm9rZScsICcjNWY1Jyk7XHJcbiAgICAgICAgICBjb25zdCBvcHRzID0ge1xyXG4gICAgICAgICAgICBjb21taXQ6IGZhbHNlLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIG9wdHNbZGlyZWN0aW9uXSA9IHtcclxuICAgICAgICAgICAgeDogZXh0cmVtaXR5LmxlZnQsXHJcbiAgICAgICAgICAgIHk6IGV4dHJlbWl0eS50b3AsXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbjogYW5jaG9yc1thXS5jYXJkaW5hbCxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZVBhdGgob3B0cyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG1hc2suc2V0KHtcclxuICAgICAgICAgICAgc3Ryb2tlOiAnI2VhNGYzNycsXHJcbiAgICAgICAgICAgIGZpbGw6ICcjZWE0ZjM3JyxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgZXh0cmVtaXR5LnNldCgnc3Ryb2tlJywgJyNlYTRmMzcnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhlbHBlciBlbmQgZXhlY3V0ZSBjb25uZWN0L2Rpc2Nvbm5lY3QgZGVwZW5kaW5nIG9uIHNwZWNpZmljIGNvbmRpdGlvbnMuXHJcbiAgICogSWYgdGhlIGV4dHJlbWl0eSB3YXMgY29ubmVjdGVkIEFORCBpdCBpcyBOT1QgdG91Y2hpbmcgdGhlIGFuY2hvciBhbnltb3JlID0+IGRpc2Nvbm5lY3QgaXQuXHJcbiAgICogSWYgdGhlIGV4dHJlbWl0eSB3YXMgZGlzY29ubmVjdGVkIEFORCBpdCBpcyB0b3VjaGluZyB0aGUgYW5jaG9yID0+IGNvbm5lY3QgaXQuXHJcbiAgICogQHBhcmFtIGRpcmVjdGlvblxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX2Nvbm5lY3REaXNjb25uZWN0RXh0cmVtaXR5KGRpcmVjdGlvbikge1xyXG4gICAgY29uc3QgeyBjYW52YXMgfSA9IHRoaXM7XHJcblxyXG4gICAgbGV0IGV4dHJlbWl0eTtcclxuICAgIGlmIChkaXJlY3Rpb24gPT09ICdzdGFydCcpIHtcclxuICAgICAgZXh0cmVtaXR5ID0gdGhpcy5hcnJvd1RhaWw7XHJcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ2VuZCcpIHtcclxuICAgICAgZXh0cmVtaXR5ID0gdGhpcy5hcnJvd0hlYWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgaW50ZXJzZWN0cyB3aXRoIGFuY2hvclxyXG4gICAgY29uc3QgYW5jaG9ycyA9IGNhbnZhcy5nZXRPYmplY3RzKClcclxuICAgICAgLmZpbHRlcigobykgPT4gby50eXBlID09PSAnYW5jaG9yJyk7XHJcbiAgICBmb3IgKGxldCBhID0gMDsgYSA8IGFuY2hvcnMubGVuZ3RoOyBhICs9IDEpIHtcclxuICAgICAgaWYgKGV4dHJlbWl0eS5pbnRlcnNlY3RzV2l0aE9iamVjdChhbmNob3JzW2FdKSkge1xyXG4gICAgICAgIHRoaXMuY29ubmVjdExpbmsoZGlyZWN0aW9uLCBhbmNob3JzW2FdLnNoYXBlSWQsIGFuY2hvcnNbYV0uY2FyZGluYWwpO1xyXG4gICAgICAgIC8vIGFuY2hvcnNbYV0uc2V0KCdzdHJva2UnLCAnIzAwMCcpO1xyXG4gICAgICAgIGV4dHJlbWl0eS5zZXQoJ3N0cm9rZScsICcjMDAwJyk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpc1tkaXJlY3Rpb25dICYmIGFuY2hvcnNbYV0gPT09IHRoaXNbZGlyZWN0aW9uXS5zaGFwZS5hbmNob3JzW3RoaXNbZGlyZWN0aW9uXS5hbmNob3JdKSB7XHJcbiAgICAgICAgLy8gSWYgdGhpcyBsaW5rIHdhcyBjb25uZWN0ZWQgZW5kIHRoaXMgYW5jaG9yIGFuZCBpdCBkb2Vzbid0IGludGVyc2VjdCBhbnltb3JlXHJcbiAgICAgICAgdGhpcy5kaXNjb25uZWN0TGluayhkaXJlY3Rpb24pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBMaW5rYWJsZVNoYXBlIGZyb20gJy4vTGlua2FibGVTaGFwZS5qcyc7XHJcbmltcG9ydCBDdXJ2ZWRMaW5rIGZyb20gJy4vQ3VydmVkTGluay5qcyc7XHJcblxyXG5jb25zdCB7IGZhYnJpYywgXyB9ID0gd2luZG93O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhwYW5kYWJsZUNvbnRhaW5lciBleHRlbmRzIExpbmthYmxlU2hhcGUge1xyXG4gIC8qKlxyXG4gICAqIEEgQ29udGFpbmVyIGlzIGEgUmVjdCB3aXRoIGFuIElUZXh0LiBDYW4gYmUgZXhwYW5kZWQgdG8gcmV2ZWFsIGNvbnRhaW5lZCBTaGFwZXMuXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIG9wdGlvbnNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7RmFicmljLkNhbnZhc30gICBvcHRpb25zLmNhbnZhcyAtIEZhYnJpYyBjYW52YXNcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgb3B0aW9ucy5pZCAtIFVuaXF1ZSBpZGVudGlmaWVyIChwaHlzaWNhbCBpZCBvZiB0aGUgb2JqZWN0KVxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBvcHRpb25zLndpZHRoXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIG9wdGlvbnMuaGVpZ2h0XHJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG9wdGlvbnMubGFiZWxcclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgb3B0aW9ucy5pbWdcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgb3B0aW9ucy5pbWcuc3JjIC0gVVJMIG9mIGFuIGljb24gKHJlcHJlc2VudGluZyB0aGUgdHlwZSBvZiB0aGUgb2JqZWN0KVxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBvcHRpb25zLmNoaWxkV2lkdGhcclxuICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgb3B0aW9ucy5jaGlsZEhlaWdodFxyXG4gICAqIEBwYXJhbSB7QXJyYXl9ICAgICAgICAgICBvcHRpb25zLmNoaWxkcmVuXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG9wdGlvbnMuY2hpbGRyZW4uJC5pZCAtIFVuaXF1ZSBjaGlsZHJlbiBpZGVudGlmaWVyIChwaHlzaWNhbCBpZCBvZiB0aGUgY2hpbGQpXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG9wdGlvbnMuY2hpbGRyZW4uJC5sYWJlbFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBvcHRpb25zLmNoaWxkcmVuLiQuaW5kZXhcclxuICAgKiBAcGFyYW4ge09iamVjdH0gICAgICAgICAgb3B0aW9ucy5jaGlsZHJlbi4kLmltZ1xyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICBvcHRpb25zLmNoaWxkcmVuLiQuaW1nLnNyYyAtIFVSTCBvZiBhbiBpY29uIChyZXByZXNlbnRpbmcgdGhlIHR5cGUgb2YgdGhlIG9iamVjdClcclxuICAgKlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGdyb3VwID0gbmV3IGZhYnJpYy5Hcm91cChbXSwge1xyXG4gICAgICBsZWZ0OiBvcHRpb25zLmxlZnQsXHJcbiAgICAgIHRvcDogb3B0aW9ucy50b3AsXHJcbiAgICAgIG9yaWdpblg6ICdsZWZ0JyxcclxuICAgICAgb3JpZ2luWTogJ3RvcCcsXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IG5ld09wdGlvbnMgPSBfLmNsb25lRGVlcChfLm9taXQob3B0aW9ucywgWydjYW52YXMnLCAnc2hhcGUnXSkpO1xyXG4gICAgbmV3T3B0aW9ucy5jYW52YXMgPSBvcHRpb25zLmNhbnZhcztcclxuICAgIG5ld09wdGlvbnMuc2hhcGUgPSBncm91cDtcclxuICAgIHN1cGVyKG5ld09wdGlvbnMpO1xyXG5cclxuICAgIHRoaXMuc2hhcGVzID0ge307XHJcbiAgICB0aGlzLmNoaWxkcmVuID0gQXJyYXkuaXNBcnJheShvcHRpb25zLmNoaWxkcmVuKSA/IG9wdGlvbnMuY2hpbGRyZW4gOiBbXTtcclxuICAgIHRoaXMuaXNFeHBhbmRlZCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgbG9hZChpc0NoaWxkKSB7XHJcbiAgICBjb25zdCB7IG9wdGlvbnMsIHNoYXBlIH0gPSB0aGlzO1xyXG5cclxuICAgIGNvbnN0IHNoYXBlUG9zID0ge1xyXG4gICAgICBsZWZ0OiB0aGlzLnNoYXBlLmxlZnQsXHJcbiAgICAgIHRvcDogdGhpcy5zaGFwZS50b3AsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgcGFkZGluZyA9IDEwO1xyXG4gICAgY29uc3QgbWFyZ2luID0gMTA7XHJcbiAgICBjb25zdCByZWN0T3B0cyA9IHtcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBvcmlnaW5YOiAnbGVmdCcsXHJcbiAgICAgIG9yaWdpblk6ICd0b3AnLFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgc3Ryb2tlOiAnIzAwMCcsXHJcbiAgICAgIGZpbGw6ICcjZmZmJyxcclxuICAgICAgcng6IDQsXHJcbiAgICAgIHJ5OiA0LFxyXG4gICAgfTtcclxuICAgIGxldCBpbWdPcHRzO1xyXG4gICAgaWYgKGlzQ2hpbGQpIHtcclxuICAgICAgcmVjdE9wdHMud2lkdGggPSBvcHRpb25zLndpZHRoID8gb3B0aW9ucy53aWR0aCA6IDcwO1xyXG4gICAgICByZWN0T3B0cy5oZWlnaHQgPSBvcHRpb25zLmhlaWdodCA/IG9wdGlvbnMuaGVpZ2h0IDogNzA7XHJcbiAgICAgIC8vIGltZ09wdHMgPSB7XHJcbiAgICAgIC8vICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIC8vICAgb3JpZ2luWTogJ3RvcCcsXHJcbiAgICAgIC8vICAgbGVmdDogcmVjdE9wdHMud2lkdGggLyAyLFxyXG4gICAgICAvLyAgIHRvcDogcGFkZGluZyxcclxuICAgICAgLy8gICB3aWR0aDogMjIsXHJcbiAgICAgIC8vICAgaGVpZ2h0OiAyMixcclxuICAgICAgLy8gfTtcclxuICAgICAgaW1nT3B0cyA9IHtcclxuICAgICAgICBvcmlnaW5YOiAnbGVmdCcsXHJcbiAgICAgICAgb3JpZ2luWTogJ3RvcCcsXHJcbiAgICAgICAgbGVmdDogcGFkZGluZyxcclxuICAgICAgICB0b3A6IHBhZGRpbmcsXHJcbiAgICAgICAgd2lkdGg6IDIyLFxyXG4gICAgICAgIGhlaWdodDogMjIsXHJcbiAgICAgIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpbWdPcHRzID0ge1xyXG4gICAgICAgIG9yaWdpblg6ICdsZWZ0JyxcclxuICAgICAgICBvcmlnaW5ZOiAndG9wJyxcclxuICAgICAgICBsZWZ0OiBwYWRkaW5nLFxyXG4gICAgICAgIHRvcDogcGFkZGluZyxcclxuICAgICAgICB3aWR0aDogMjIsXHJcbiAgICAgICAgaGVpZ2h0OiAyMixcclxuICAgICAgfTtcclxuICAgICAgcmVjdE9wdHMud2lkdGggPSBvcHRpb25zLndpZHRoID8gb3B0aW9ucy53aWR0aCA6IDIwMDtcclxuICAgICAgcmVjdE9wdHMuaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQgPyBvcHRpb25zLmhlaWdodCA6IChpbWdPcHRzLmhlaWdodCArIHBhZGRpbmcgKiAyKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDcmVhdGUgUmVjdCBzaGFwZVxyXG4gICAgY29uc3QgcmVjdCA9IG5ldyBmYWJyaWMuUmVjdChyZWN0T3B0cyk7XHJcbiAgICB0aGlzLnNoYXBlLmFkZFdpdGhVcGRhdGUocmVjdCk7XHJcbiAgICB0aGlzLnNoYXBlcy5yZWN0ID0gcmVjdDtcclxuXHJcbiAgICBsZXQgdGV4dE9wdHM7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmltZyAmJiB0aGlzLm9wdGlvbnMuaW1nLnNyYykge1xyXG4gICAgICAvLyBMb2FkIGltYWdlIGFuZCBjcmVhdGUgSW1hZ2Ugc2hhcGVcclxuICAgICAgY29uc3Qgb0ltZyA9IGF3YWl0IHRoaXMuX2xvYWRJbWFnZSh0aGlzLm9wdGlvbnMuaW1nLnNyYyk7XHJcbiAgICAgIG9JbWcuc2V0KGltZ09wdHMpO1xyXG4gICAgICB0aGlzLnNoYXBlLmFkZFdpdGhVcGRhdGUob0ltZyk7XHJcbiAgICAgIHRoaXMuc2hhcGVzLmltYWdlID0gb0ltZztcclxuXHJcbiAgICAgIGlmIChpc0NoaWxkKSB7XHJcbiAgICAgICAgLy8gQWxpZ24gdGhlIHRleHQgd2l0aGluIHRoZSByZWN0YW5nbGUsIHVuZGVyIHRoZSBpbWFnZVxyXG4gICAgICAgIC8vIENlbnRlciB0aGUgdGV4dCBpbiB0aGUgcmVjdFxyXG4gICAgICAgIC8vIHRleHRPcHRzID0ge1xyXG4gICAgICAgIC8vICAgc3R5bGVzOiB7IH0sXHJcbiAgICAgICAgLy8gICBmb250U2l6ZTogMTQsXHJcbiAgICAgICAgLy8gICBmb250RmFtaWx5OiAnSGVsdmV0aWNhJyxcclxuICAgICAgICAvLyAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgLy8gICBzcGxpdEJ5R3JhcGhlbWU6IHRydWUsXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICAgIC8vICAgb3JpZ2luWTogJ3RvcCcsXHJcbiAgICAgICAgLy8gICBsZWZ0OiByZWN0LndpZHRoIC8gMixcclxuICAgICAgICAvLyAgIHRvcDogcGFkZGluZyArIGltZ09wdHMuaGVpZ2h0ICsgbWFyZ2luLFxyXG4gICAgICAgIC8vICAgd2lkdGg6IHJlY3RPcHRzLndpZHRoIC0gcGFkZGluZyAqIDIsXHJcbiAgICAgICAgLy8gICBoZWlnaHQ6IHJlY3RPcHRzLmhlaWdodCAtIHBhZGRpbmcgKiAyLFxyXG4gICAgICAgIC8vIH07XHJcblxyXG4gICAgICAgIHRleHRPcHRzID0ge1xyXG4gICAgICAgICAgc3R5bGVzOiB7IH0sXHJcbiAgICAgICAgICBmb250U2l6ZTogMTQsXHJcbiAgICAgICAgICBmb250RmFtaWx5OiAnSGVsdmV0aWNhJyxcclxuICAgICAgICAgIHRleHRBbGlnbjogJ2xlZnQnLFxyXG4gICAgICAgICAgc3BsaXRCeUdyYXBoZW1lOiB0cnVlLFxyXG5cclxuICAgICAgICAgIG9yaWdpblg6ICdsZWZ0JyxcclxuICAgICAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICAgICAgbGVmdDogcGFkZGluZyArIG9JbWcud2lkdGggKyBtYXJnaW4sXHJcbiAgICAgICAgICB0b3A6IHBhZGRpbmcgKyBvSW1nLmhlaWdodCAvIDIsXHJcbiAgICAgICAgICB3aWR0aDogcmVjdC53aWR0aCAtIHBhZGRpbmcgLSBvSW1nLndpZHRoIC0gbWFyZ2luICogMixcclxuICAgICAgICAgIGhlaWdodDogb0ltZy5oZWlnaHQsXHJcbiAgICAgICAgfTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBBbGlnbiB0aGUgdGV4dCB3aXRoIHRoZSBpbWFnZVxyXG4gICAgICAgIHRleHRPcHRzID0ge1xyXG4gICAgICAgICAgc3R5bGVzOiB7IH0sXHJcbiAgICAgICAgICBmb250U2l6ZTogMTQsXHJcbiAgICAgICAgICBmb250RmFtaWx5OiAnSGVsdmV0aWNhJyxcclxuICAgICAgICAgIHRleHRBbGlnbjogJ2xlZnQnLFxyXG4gICAgICAgICAgc3BsaXRCeUdyYXBoZW1lOiB0cnVlLFxyXG5cclxuICAgICAgICAgIG9yaWdpblg6ICdsZWZ0JyxcclxuICAgICAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICAgICAgbGVmdDogcGFkZGluZyArIG9JbWcud2lkdGggKyBtYXJnaW4sXHJcbiAgICAgICAgICB0b3A6IHBhZGRpbmcgKyBvSW1nLmhlaWdodCAvIDIsXHJcbiAgICAgICAgICB3aWR0aDogcmVjdC53aWR0aCAtIHBhZGRpbmcgLSBvSW1nLndpZHRoIC0gbWFyZ2luICogMixcclxuICAgICAgICAgIGhlaWdodDogb0ltZy5oZWlnaHQsXHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gQ2VudGVyIHRoZSB0ZXh0IGluIHRoZSByZWN0XHJcbiAgICAgIHRleHRPcHRzID0ge1xyXG4gICAgICAgIHN0eWxlczogeyB9LFxyXG4gICAgICAgIGZvbnRTaXplOiAxNCxcclxuICAgICAgICBmb250RmFtaWx5OiAnSGVsdmV0aWNhJyxcclxuICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgIHNwbGl0QnlHcmFwaGVtZTogdHJ1ZSxcclxuXHJcbiAgICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgICAgbGVmdDogcmVjdC53aWR0aCAvIDIsXHJcbiAgICAgICAgdG9wOiByZWN0LmhlaWdodCAvIDIsXHJcbiAgICAgICAgd2lkdGg6IHJlY3RPcHRzLndpZHRoIC0gcGFkZGluZyAqIDIsXHJcbiAgICAgICAgaGVpZ2h0OiByZWN0T3B0cy5oZWlnaHQgLSBwYWRkaW5nICogMixcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDcmVhdGUgVGV4dGJveCBzaGFwZVxyXG4gICAgY29uc3QgdGV4dCA9IG5ldyBmYWJyaWMuVGV4dGJveChvcHRpb25zLmxhYmVsLCB0ZXh0T3B0cyk7XHJcbiAgICBpZiAoIW9wdGlvbnMuaGlkZVRleHQpIHtcclxuICAgICAgdGhpcy5zaGFwZS5hZGRXaXRoVXBkYXRlKHRleHQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zaGFwZXMudGV4dCA9IHRleHQ7XHJcblxyXG4gICAgLy8gUmVwb3NpdGlvbiB0aGUgZ3JvdXAgYWNjb3JkaW5nbHlcclxuICAgIHRoaXMuc2hhcGUubGVmdCA9IHNoYXBlUG9zLmxlZnQ7XHJcbiAgICB0aGlzLnNoYXBlLnRvcCA9IHNoYXBlUG9zLnRvcDtcclxuICAgIHRoaXMuc2hhcGUuc2V0Q29vcmRzKCk7XHJcbiAgICB0aGlzLmNhbnZhcy5yZW5kZXJBbGwoKTtcclxuXHJcbiAgICAvLyBTZXQgdGhlIHNoYXBlIGFzIG5vdCBzZWxlY3RhYmxlIGlmIGl0IGlzIGEgY2hpbGRcclxuICAgIGlmIChpc0NoaWxkKSB7XHJcbiAgICAgIHRoaXMuc2hhcGUuc2VsZWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbWVtYmVyIGluaXRpYWwgb3B0aW9ucyBhcyBjb2xsYXBzZWRcclxuICAgIHRoaXMuaW5pdGlhbE9wdHMgPSB7XHJcbiAgICAgIHJlY3Q6IHtcclxuICAgICAgICB3aWR0aDogcmVjdE9wdHMud2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OiByZWN0T3B0cy5oZWlnaHQsXHJcbiAgICAgIH0sXHJcbiAgICAgIGNoaWxkOiB7XHJcbiAgICAgICAgd2lkdGg6IG9wdGlvbnMuY2hpbGRXaWR0aCA/IG9wdGlvbnMuY2hpbGRXaWR0aCA6IDcwLFxyXG4gICAgICAgIGhlaWdodDogb3B0aW9ucy5jaGlsZEhlaWdodCA/IG9wdGlvbnMuY2hpbGRIZWlnaHQgOiA3MCxcclxuICAgICAgICAvLyB3aWR0aDogb3B0aW9ucy5jaGlsZFdpZHRoID8gb3B0aW9ucy5jaGlsZFdpZHRoIDogNTIsXHJcbiAgICAgICAgLy8gaGVpZ2h0OiBvcHRpb25zLmNoaWxkV2lkdGggPyBvcHRpb25zLmNoaWxkV2lkdGggOiA1MixcclxuICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgLy8gQ29uc3RydWN0IGNoaWxkcmVuIGlmIHRoaXMgaXMgYSBub3JtYWwgKHBhcmVudCkgQ29udGFpbmVyXHJcbiAgICBpZiAoIWlzQ2hpbGQpIHtcclxuICAgICAgYXdhaXQgdGhpcy5jb25zdHJ1Y3RDaGlsZHJlbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHNoYXBlLm9uKHtcclxuICAgICAgc2NhbGluZzogKCkgPT4ge1xyXG4gICAgICAgIGlmICh0ZXh0KSB7XHJcbiAgICAgICAgICAvLyBXaGVuIHNjYWxpbmcsIGtlZXAgdGV4dCBzYW1lIHNpemUgYXMgaW5pdGlhbFxyXG4gICAgICAgICAgaWYgKHNoYXBlLnNjYWxlWCA8IDEpIHtcclxuICAgICAgICAgICAgdGV4dC5zY2FsZVggPSAxICsgKDEgLSBzaGFwZS5zY2FsZVgpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGV4dC5zY2FsZVggPSAxIC8gKHNoYXBlLnNjYWxlWCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoc2hhcGUuc2NhbGVZIDwgMSkge1xyXG4gICAgICAgICAgICB0ZXh0LnNjYWxlWSA9IDEgKyAoMSAtIHNoYXBlLnNjYWxlWSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0ZXh0LnNjYWxlWSA9IDEgLyAoc2hhcGUuc2NhbGVZKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuY2FudmFzLnJlbmRlckFsbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgbW91c2VkYmxjbGljazogKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRXhwYW5kZWQpIHtcclxuICAgICAgICAgIHRoaXMuY29sbGFwc2UoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5leHBhbmQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgX2xvYWRJbWFnZShzcmMpIHtcclxuICAgIGNvbnN0IHVybCA9IHNyYyB8fCB0aGlzLm9wdGlvbnMuaW1nLnNyYztcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICBmYWJyaWMuSW1hZ2UuZnJvbVVSTCh1cmwsIChvSW1nKSA9PiB7XHJcbiAgICAgICAgcmVzb2x2ZShvSW1nKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGNvbnN0cnVjdENoaWxkcmVuKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBjYW52YXMsIHNoYXBlLCBzaGFwZXMsIGNoaWxkcmVuLCBpbml0aWFsT3B0cyxcclxuICAgIH0gPSB0aGlzO1xyXG5cclxuICAgIC8vIENhbGN1bGF0ZSBuZXcgZGltZW5zaW9uc1xyXG4gICAgY29uc3QgcGFkZGluZyA9IDEwO1xyXG4gICAgY29uc3QgbWFyZ2luID0gMTA7XHJcblxyXG4gICAgZm9yIChsZXQgYyA9IDA7IGMgPCBjaGlsZHJlbi5sZW5ndGg7IGMgKz0gMSkge1xyXG4gICAgICBjb25zdCBjaGlsZCA9IGNoaWxkcmVuW2NdO1xyXG4gICAgICBjb25zdCBjaGlsZENvbnRhaW5lciA9IG5ldyBFeHBhbmRhYmxlQ29udGFpbmVyKHtcclxuICAgICAgICBjYW52YXMsXHJcbiAgICAgICAgaWQ6IGNoaWxkLmlkLFxyXG4gICAgICAgIGxlZnQ6IHNoYXBlLmxlZnQgKyBwYWRkaW5nICsgKGluaXRpYWxPcHRzLmNoaWxkLndpZHRoICsgbWFyZ2luKSAqIGMgKyAoYyA9PT0gY2hpbGRyZW4ubGVuZ3RoID8gLW1hcmdpbiA6IDApLFxyXG4gICAgICAgIHRvcDogc2hhcGUudG9wICsgcGFkZGluZyArIHNoYXBlcy5pbWFnZS5oZWlnaHQgKyBtYXJnaW4sXHJcbiAgICAgICAgYW5nbGU6IDAsXHJcbiAgICAgICAgbGFiZWw6IGNoaWxkLmxhYmVsLFxyXG4gICAgICAgIGltZzoge1xyXG4gICAgICAgICAgc3JjOiBjaGlsZC5pbWcuc3JjLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgd2lkdGg6IGluaXRpYWxPcHRzLmNoaWxkLndpZHRoLFxyXG4gICAgICAgIGhlaWdodDogaW5pdGlhbE9wdHMuY2hpbGQuaGVpZ2h0LFxyXG4gICAgICAgIGhpZGVUZXh0OiBjaGlsZC5oaWRlVGV4dCxcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXHJcbiAgICAgIGF3YWl0IGNoaWxkQ29udGFpbmVyLmxvYWQodHJ1ZSk7XHJcbiAgICAgIGNoaWxkLmNvbnRhaW5lciA9IGNoaWxkQ29udGFpbmVyO1xyXG4gICAgfVxyXG4gICAgc2hhcGUuYWRkV2l0aFVwZGF0ZSgpO1xyXG4gICAgc2hhcGUuc2V0Q29vcmRzKCk7XHJcbiAgICBjYW52YXMucmVuZGVyQWxsKCk7XHJcbiAgfVxyXG5cclxuICBleHBhbmQoKSB7XHJcbiAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggIT09IDAgJiYgdGhpcy5pc0V4cGFuZGVkID09PSBmYWxzZSkge1xyXG4gICAgICBjb25zdCB7XHJcbiAgICAgICAgY2FudmFzLCBzaGFwZSwgc2hhcGVzLCBjaGlsZHJlbiwgaW5pdGlhbE9wdHMsXHJcbiAgICAgIH0gPSB0aGlzO1xyXG5cclxuICAgICAgLy8gQ2FsY3VsYXRlIG5ldyBkaW1lbnNpb25zXHJcbiAgICAgIGNvbnN0IHBhZGRpbmcgPSAxMDtcclxuICAgICAgY29uc3QgbWFyZ2luID0gMTA7XHJcbiAgICAgIGNvbnN0IG9sZFJlY3RXaWR0aCA9IHNoYXBlcy5yZWN0LndpZHRoO1xyXG4gICAgICBjb25zdCBvbGRSZWN0SGVpZ2h0ID0gc2hhcGVzLnJlY3QuaGVpZ2h0O1xyXG5cclxuICAgICAgY29uc3QgbmV3UmVjdFdpZHRoID0gTWF0aC5tYXgocGFkZGluZyAqIDIgKyBjaGlsZHJlbi5sZW5ndGggKiBpbml0aWFsT3B0cy5jaGlsZC53aWR0aFxyXG4gICAgICAgICsgKGNoaWxkcmVuLmxlbmd0aCAtIDEpICogbWFyZ2luLCBpbml0aWFsT3B0cy5yZWN0LndpZHRoKTtcclxuICAgICAgY29uc3QgbmV3UmVjdEhlaWdodCA9IGNoaWxkcmVuLmxlbmd0aCA+IDAgPyBwYWRkaW5nICsgc2hhcGVzLmltYWdlLmhlaWdodCArIG1hcmdpblxyXG4gICAgICAgICsgaW5pdGlhbE9wdHMuY2hpbGQuaGVpZ2h0ICsgcGFkZGluZyA6IGluaXRpYWxPcHRzLnJlY3QuaGVpZ2h0O1xyXG5cclxuICAgICAgLy8gUmVzaXplIGV4aXN0aW5nIHNoYXBlc1xyXG4gICAgICBzaGFwZXMucmVjdC53aWR0aCA9IG5ld1JlY3RXaWR0aDtcclxuICAgICAgc2hhcGVzLnJlY3QuaGVpZ2h0ID0gbmV3UmVjdEhlaWdodDtcclxuICAgICAgc2hhcGVzLnJlY3Quc2V0Q29vcmRzKCk7XHJcbiAgICAgIHNoYXBlcy50ZXh0LndpZHRoID0gbmV3UmVjdFdpZHRoIC0gKHNoYXBlcy5pbWFnZS53aWR0aCArIHBhZGRpbmcgKyBtYXJnaW4pO1xyXG4gICAgICBzaGFwZXMudGV4dC50ZXh0QWxpZ24gPSAnbGVmdCc7XHJcbiAgICAgIHNoYXBlcy50ZXh0LnNldENvb3JkcygpO1xyXG5cclxuICAgICAgLy8gQWRkIGNoaWxkcmVuIGNvbnRhaW5lcnNcclxuICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCBjaGlsZHJlbi5sZW5ndGg7IGMgKz0gMSkge1xyXG4gICAgICAgIGNvbnN0IGNoaWxkID0gY2hpbGRyZW5bY107XHJcbiAgICAgICAgY2hpbGQuY29udGFpbmVyLnNoYXBlLmxlZnQgPSBzaGFwZS5sZWZ0ICsgcGFkZGluZ1xyXG4gICAgICAgICAgKyAoaW5pdGlhbE9wdHMuY2hpbGQud2lkdGggKyBtYXJnaW4pICogYyArIChjID09PSBjaGlsZHJlbi5sZW5ndGggPyAtbWFyZ2luIDogMCk7XHJcbiAgICAgICAgY2hpbGQuY29udGFpbmVyLnNoYXBlLnRvcCA9IHNoYXBlLnRvcCArIHBhZGRpbmcgKyBzaGFwZXMuaW1hZ2UuaGVpZ2h0ICsgbWFyZ2luO1xyXG4gICAgICAgIHNoYXBlLmFkZFdpdGhVcGRhdGUoY2hpbGQuY29udGFpbmVyLnNoYXBlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gVXBkYXRlIHRoZSBjb250YWluZXIgY29vcmRzXHJcbiAgICAgIHNoYXBlLmFkZFdpdGhVcGRhdGUoKTtcclxuICAgICAgc2hhcGUuc2V0Q29vcmRzKCk7XHJcbiAgICAgIHRoaXMuYnJpbmdUb0Zyb250KCk7XHJcbiAgICAgIGNhbnZhcy5yZW5kZXJBbGwoKTtcclxuICAgICAgdGhpcy5zaGFwZS5maXJlKCdtb2RpZmllZCcpO1xyXG5cclxuICAgICAgLy8gVXBkYXRlIGFsbCBvdGhlciBjb250YWluZXJzIHRoYXQgYXJlIGJlbG93IGFuZC9vciBvbiB0aGUgcmlnaHQgb2YgdGhlIGN1cnJlbnQgc2hhcGUsIHRvIGF2b2lkIGNvbGxpc2lvblxyXG4gICAgICBzaGFwZXMucmVjdC5vcGFjaXR5ID0gMC43O1xyXG4gICAgICBjb25zdCBvdGhlclNoYXBlcyA9IE9iamVjdC52YWx1ZXMoY2FudmFzLmxpbmthYmxlU2hhcGVzKTtcclxuICAgICAgaWYgKG90aGVyU2hhcGVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICBjb25zdCBkZWx0YVggPSBuZXdSZWN0V2lkdGggLSBvbGRSZWN0V2lkdGg7XHJcbiAgICAgICAgY29uc3QgZGVsdGFZID0gbmV3UmVjdEhlaWdodCAtIG9sZFJlY3RIZWlnaHQ7XHJcbiAgICAgICAgZm9yIChsZXQgbyA9IDA7IG8gPCBvdGhlclNoYXBlcy5sZW5ndGg7IG8gKz0gMSkge1xyXG4gICAgICAgICAgY29uc3Qgc2hhcGVUb01vdmUgPSBvdGhlclNoYXBlc1tvXTtcclxuICAgICAgICAgIGlmIChzaGFwZVRvTW92ZS5pZCAhPT0gdGhpcy5pZCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zaGFwZS5sZWZ0IDw9IHNoYXBlVG9Nb3ZlLnNoYXBlLmFDb29yZHMuYnIueCAmJiB0aGlzLnNoYXBlLnRvcCA8PSBzaGFwZVRvTW92ZS5zaGFwZS5hQ29vcmRzLmJyLnkpIHtcclxuICAgICAgICAgICAgICBzaGFwZVRvTW92ZS5tb3ZlKHtcclxuICAgICAgICAgICAgICAgIHg6IHNoYXBlVG9Nb3ZlLnNoYXBlLmxlZnQgKyBkZWx0YVgsXHJcbiAgICAgICAgICAgICAgICB5OiBzaGFwZVRvTW92ZS5zaGFwZS50b3AgKyBkZWx0YVksXHJcbiAgICAgICAgICAgICAgICBtb3Zpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pc0V4cGFuZGVkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGNvbGxhcHNlKCkge1xyXG4gICAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoICE9PSAwICYmIHRoaXMuaXNFeHBhbmRlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICBjb25zdCB7XHJcbiAgICAgICAgY2FudmFzLCBzaGFwZSwgc2hhcGVzLCBjaGlsZHJlbiwgaW5pdGlhbE9wdHMsXHJcbiAgICAgIH0gPSB0aGlzO1xyXG5cclxuICAgICAgLy8gQ2FsY3VsYXRlIG5ldyBkaW1lbnNpb25zXHJcbiAgICAgIGNvbnN0IHBhZGRpbmcgPSAxMDtcclxuICAgICAgY29uc3QgbWFyZ2luID0gMTA7XHJcbiAgICAgIGNvbnN0IG9sZFJlY3RXaWR0aCA9IHNoYXBlcy5yZWN0LndpZHRoO1xyXG4gICAgICBjb25zdCBvbGRSZWN0SGVpZ2h0ID0gc2hhcGVzLnJlY3QuaGVpZ2h0O1xyXG5cclxuICAgICAgY29uc3QgbmV3UmVjdFdpZHRoID0gaW5pdGlhbE9wdHMucmVjdC53aWR0aDtcclxuICAgICAgY29uc3QgbmV3UmVjdEhlaWdodCA9IGluaXRpYWxPcHRzLnJlY3QuaGVpZ2h0O1xyXG5cclxuICAgICAgLy8gUmVzaXplIGV4aXN0aW5nIHNoYXBlc1xyXG4gICAgICBzaGFwZXMucmVjdC53aWR0aCA9IG5ld1JlY3RXaWR0aDtcclxuICAgICAgc2hhcGVzLnJlY3QuaGVpZ2h0ID0gbmV3UmVjdEhlaWdodDtcclxuICAgICAgc2hhcGVzLnJlY3Quc2V0Q29vcmRzKCk7XHJcbiAgICAgIHNoYXBlcy50ZXh0LndpZHRoID0gbmV3UmVjdFdpZHRoIC0gKHNoYXBlcy5pbWFnZS53aWR0aCArIHBhZGRpbmcgKiAyICsgbWFyZ2luKTtcclxuICAgICAgc2hhcGVzLnRleHQudGV4dEFsaWduID0gJ2xlZnQnO1xyXG4gICAgICBzaGFwZXMudGV4dC5zZXRDb29yZHMoKTtcclxuXHJcbiAgICAgIC8vIFJlbW92ZSBjaGlsZHJlbiBjb250YWluZXJzXHJcbiAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgY2hpbGRyZW4ubGVuZ3RoOyBjICs9IDEpIHtcclxuICAgICAgICBjb25zdCBjaGlsZCA9IGNoaWxkcmVuW2NdO1xyXG4gICAgICAgIGNoaWxkLmNvbnRhaW5lci5sZWZ0ID0gc2hhcGUubGVmdCArIHBhZGRpbmdcclxuICAgICAgICAgICsgKGluaXRpYWxPcHRzLmNoaWxkLndpZHRoICsgbWFyZ2luKSAqIGMgKyAoYyA9PT0gY2hpbGRyZW4ubGVuZ3RoID8gLW1hcmdpbiA6IDApO1xyXG4gICAgICAgIGNoaWxkLmNvbnRhaW5lci50b3AgPSBzaGFwZS50b3AgKyBwYWRkaW5nICsgc2hhcGVzLmltYWdlLmhlaWdodCArIG1hcmdpbjtcclxuICAgICAgICBzaGFwZS5yZW1vdmUoY2hpbGQuY29udGFpbmVyLnNoYXBlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gVXBkYXRlIHRoZSBjb250YWluZXIgY29vcmRzXHJcbiAgICAgIHNoYXBlLmFkZFdpdGhVcGRhdGUoKTtcclxuICAgICAgc2hhcGUuc2V0Q29vcmRzKCk7XHJcbiAgICAgIGNhbnZhcy5yZW5kZXJBbGwoKTtcclxuICAgICAgdGhpcy5zaGFwZS5maXJlKCdtb2RpZmllZCcpO1xyXG5cclxuICAgICAgLy8gVXBkYXRlIGFsbCBvdGhlciBjb250YWluZXJzIHRoYXQgYXJlIGJlbG93IGFuZC9vciBvbiB0aGUgcmlnaHQgb2YgdGhlIGN1cnJlbnQgc2hhcGUsIHRvIGF2b2lkIGNvbGxpc2lvblxyXG4gICAgICBzaGFwZXMucmVjdC5vcGFjaXR5ID0gMTtcclxuICAgICAgY29uc3Qgb3RoZXJTaGFwZXMgPSBPYmplY3QudmFsdWVzKGNhbnZhcy5saW5rYWJsZVNoYXBlcyk7XHJcbiAgICAgIGlmIChvdGhlclNoYXBlcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgY29uc3QgZGVsdGFYID0gbmV3UmVjdFdpZHRoIC0gb2xkUmVjdFdpZHRoO1xyXG4gICAgICAgIGNvbnN0IGRlbHRhWSA9IG5ld1JlY3RIZWlnaHQgLSBvbGRSZWN0SGVpZ2h0O1xyXG4gICAgICAgIGZvciAobGV0IG8gPSAwOyBvIDwgb3RoZXJTaGFwZXMubGVuZ3RoOyBvICs9IDEpIHtcclxuICAgICAgICAgIGNvbnN0IHNoYXBlVG9Nb3ZlID0gb3RoZXJTaGFwZXNbb107XHJcbiAgICAgICAgICBpZiAob3RoZXJTaGFwZXNbb10uaWQgIT09IHRoaXMuaWQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hhcGUubGVmdCA8PSBzaGFwZVRvTW92ZS5zaGFwZS5hQ29vcmRzLmJyLnggJiYgdGhpcy5zaGFwZS50b3AgPD0gc2hhcGVUb01vdmUuc2hhcGUuYUNvb3Jkcy5ici55KSB7XHJcbiAgICAgICAgICAgICAgc2hhcGVUb01vdmUubW92ZSh7XHJcbiAgICAgICAgICAgICAgICB4OiBzaGFwZVRvTW92ZS5zaGFwZS5sZWZ0ICsgZGVsdGFYLFxyXG4gICAgICAgICAgICAgICAgeTogc2hhcGVUb01vdmUuc2hhcGUudG9wICsgZGVsdGFZLFxyXG4gICAgICAgICAgICAgICAgbW92aW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5pc0V4cGFuZGVkID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBhc3luYyBfb25BbmNob3JSaWdodENsaWNrKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgaWQsIGxlZnQsIHRvcCwgYW5nbGUsIGNhbnZhcywgd2lkdGgsIGhlaWdodCxcclxuICAgIH0gPSB0aGlzLnNoYXBlO1xyXG4gICAgY29uc3QgYXAgPSBvcHRpb25zLnRhcmdldDtcclxuICAgIGNvbnN0IHsgY2FyZGluYWwgfSA9IGFwO1xyXG4gICAgY29uc3Qgc3BhY2luZyA9IDUwO1xyXG5cclxuICAgIGNvbnN0IG5leHRJZCA9IGAke2lkfV9uZXh0XyR7Y2FyZGluYWx9XyR7TWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMCkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygxKX1gO1xyXG4gICAgY29uc3QgbGFiZWwgPSBgJHtpZH1fbmV4dF8ke2NhcmRpbmFsfWA7XHJcbiAgICBjb25zdCBuZXh0Q29udGFpbmVyT3B0cyA9IF8uY2xvbmVEZWVwKF8ub21pdCh0aGlzLm9wdGlvbnMsIFsnY2FudmFzJywgJ3NoYXBlJ10pKTtcclxuICAgIG5leHRDb250YWluZXJPcHRzLmNhbnZhcyA9IGNhbnZhcztcclxuICAgIG5leHRDb250YWluZXJPcHRzLmlkID0gbmV4dElkO1xyXG4gICAgbmV4dENvbnRhaW5lck9wdHMubGVmdCA9IGxlZnQ7XHJcbiAgICBuZXh0Q29udGFpbmVyT3B0cy50b3AgPSB0b3A7XHJcbiAgICBuZXh0Q29udGFpbmVyT3B0cy5hbmdsZSA9IGFuZ2xlO1xyXG4gICAgbmV4dENvbnRhaW5lck9wdHMubGFiZWwgPSBsYWJlbDtcclxuICAgIG5leHRDb250YWluZXJPcHRzLmNoaWxkcmVuID0gW107XHJcblxyXG4gICAgY29uc3QgbmV4dENvbnRhaW5lciA9IG5ldyBFeHBhbmRhYmxlQ29udGFpbmVyKG5leHRDb250YWluZXJPcHRzKTtcclxuICAgIGF3YWl0IG5leHRDb250YWluZXIubG9hZCgpO1xyXG4gICAgbmV4dENvbnRhaW5lci5pbmplY3QoKTtcclxuXHJcbiAgICBjb25zdCBuZXdPcHRpb25zID0ge307XHJcbiAgICBsZXQgdGFyZ2V0Q2FyZGluYWw7XHJcbiAgICBzd2l0Y2ggKGNhcmRpbmFsKSB7XHJcbiAgICAgIGNhc2UgJ2Vhc3QnOiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnd2VzdCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gdG9wO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IGxlZnQgKyB3aWR0aCArIHNwYWNpbmc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnd2VzdCc6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICdlYXN0JztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSB0b3A7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gbGVmdCAtIHdpZHRoIC0gc3BhY2luZztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aCc6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICdzb3V0aCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gdG9wIC0gaGVpZ2h0IC0gc3BhY2luZztcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSBsZWZ0O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRoJzoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ25vcnRoJztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSB0b3AgKyBoZWlnaHQgKyBzcGFjaW5nO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IGxlZnQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnbm9ydGhlYXN0Jzoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ3NvdXRod2VzdCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gdG9wIC0gaGVpZ2h0IC0gc3BhY2luZztcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSBsZWZ0ICsgd2lkdGggKyBzcGFjaW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRod2VzdCc6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICdzb3V0aGVhc3QnO1xyXG4gICAgICAgIG5ld09wdGlvbnMueCA9IHRvcCAtIGhlaWdodCAtIHNwYWNpbmc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gbGVmdCAtIHdpZHRoIC0gc3BhY2luZztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aGVhc3QnOiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnbm9ydGh3ZXN0JztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSB0b3AgKyBoZWlnaHQgKyBzcGFjaW5nO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IGxlZnQgKyB3aWR0aCArIHNwYWNpbmc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnc291dGh3ZXN0JzpcclxuICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ25vcnRoZWFzdCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gdG9wICsgaGVpZ2h0ICsgc3BhY2luZztcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSBsZWZ0IC0gd2lkdGggLSBzcGFjaW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBuZXh0Q29udGFpbmVyLm1vdmUobmV3T3B0aW9ucyk7XHJcbiAgICAvLyBuZXh0Q29udGFpbmVyLnJvdGF0ZShhbmdsZSk7XHJcblxyXG4gICAgY29uc3QgbmV3TGluayA9IG5ldyBDdXJ2ZWRMaW5rKHtcclxuICAgICAgY2FudmFzLFxyXG4gICAgICBzdGFydDoge1xyXG4gICAgICAgIHg6IGFwLmxlZnQsXHJcbiAgICAgICAgeTogYXAudG9wLFxyXG4gICAgICB9LFxyXG4gICAgICBlbmQ6IHtcclxuICAgICAgICB4OiBuZXh0Q29udGFpbmVyLmFuY2hvcnNbdGFyZ2V0Q2FyZGluYWxdLmxlZnQsXHJcbiAgICAgICAgeTogbmV4dENvbnRhaW5lci5hbmNob3JzW3RhcmdldENhcmRpbmFsXS50b3AsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICAgIG5ld0xpbmsuaW5qZWN0KGNhbnZhcyk7XHJcbiAgICBuZXdMaW5rLmNvbm5lY3RMaW5rKCdzdGFydCcsIGFwLnNoYXBlSWQsIGFwLmNhcmRpbmFsKTtcclxuICAgIG5ld0xpbmsuY29ubmVjdExpbmsoJ2VuZCcsIG5leHRDb250YWluZXIuYW5jaG9yc1t0YXJnZXRDYXJkaW5hbF0uc2hhcGVJZCxcclxuICAgICAgbmV4dENvbnRhaW5lci5hbmNob3JzW3RhcmdldENhcmRpbmFsXS5jYXJkaW5hbCk7XHJcbiAgfVxyXG5cclxuICBfb25BbmNob3JMZWZ0Q2xpY2sob3B0aW9ucykge1xyXG4gICAgY29uc3QgYXAgPSBvcHRpb25zLnRhcmdldDtcclxuICAgIGNvbnN0IHsgY2FudmFzIH0gPSB0aGlzO1xyXG5cclxuICAgIC8vIERpc2FibGUgdGhlIG11bHRpIHNlbGVjdGlvbiB3aGVuIG1vdmluZyBtb3VzZVxyXG4gICAgdGhpcy5jYW52YXMuc2VsZWN0aW9uID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3Qgb3Bwb3NpdGVDYXJkaW5hbCA9IHtcclxuICAgICAgZWFzdDogJ3dlc3QnLFxyXG4gICAgICB3ZXN0OiAnZWFzdCcsXHJcbiAgICAgIG5vcnRoOiAnc291dGgnLFxyXG4gICAgICBzb3V0aDogJ25vcnRoJyxcclxuICAgIH07XHJcbiAgICBjb25zdCBuZXdMaW5rID0gbmV3IEN1cnZlZExpbmsoe1xyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgeDogYXAubGVmdCxcclxuICAgICAgICB5OiBhcC50b3AsXHJcbiAgICAgICAgZGlyZWN0aW9uOiBhcC5jYXJkaW5hbCxcclxuICAgICAgfSxcclxuICAgICAgZW5kOiB7XHJcbiAgICAgICAgeDogYXAubGVmdCxcclxuICAgICAgICB5OiBhcC50b3AsXHJcbiAgICAgICAgZGlyZWN0aW9uOiBvcHBvc2l0ZUNhcmRpbmFsW2FwLmNhcmRpbmFsXSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgbmV3TGluay5pbmplY3QoY2FudmFzKTtcclxuICAgIG5ld0xpbmsuY29ubmVjdExpbmsoJ3N0YXJ0JywgYXAuc2hhcGVJZCwgYXAuY2FyZGluYWwpO1xyXG4gICAgbmV3TGluay5hcnJvd0hlYWQuZmlyZSgnbW91c2Vkb3duJyk7XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZU1vdmUgPSAoZXZlbnQpID0+IHtcclxuICAgICAgbmV3TGluay5hcnJvd0hlYWQubGVmdCA9IGV2ZW50LnBvaW50ZXIueDtcclxuICAgICAgbmV3TGluay5hcnJvd0hlYWQudG9wID0gZXZlbnQucG9pbnRlci55O1xyXG4gICAgICBuZXdMaW5rLmFycm93SGVhZC5maXJlKCdtb3ZpbmcnKTtcclxuICAgIH07XHJcbiAgICBjYW52YXMub24oJ21vdXNlOm1vdmUnLCBvbk1vdXNlTW92ZSk7XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZUNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAvLyBFbmFibGUgYmFjayB0aGUgbXVsdGkgc2VsZWN0aW9uIHdoZW4gbW92aW5nIG1vdXNlXHJcbiAgICAgIHRoaXMuY2FudmFzLnNlbGVjdGlvbiA9IHRydWU7XHJcblxyXG4gICAgICBuZXdMaW5rLmFycm93SGVhZC5maXJlKCdtb3ZlZCcpO1xyXG4gICAgICBuZXdMaW5rLmFycm93SGVhZC5maXJlKCdtb3VzZXVwJyk7XHJcbiAgICAgIGNhbnZhcy5vZmYoJ21vdXNlOm1vdmUnLCBvbk1vdXNlTW92ZSk7XHJcbiAgICAgIGNhbnZhcy5vZmYoJ21vdXNlOnVwJywgb25Nb3VzZUNsaWNrKTtcclxuICAgIH07XHJcbiAgICBjYW52YXMub24oJ21vdXNlOnVwJywgb25Nb3VzZUNsaWNrKTtcclxuICB9XHJcbn1cclxuIiwiY29uc3QgeyBmYWJyaWMgfSA9IHdpbmRvdztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpbmsge1xyXG4gIC8qKlxyXG4gICAqIEEgTGluayBpcyBhIEZhYnJpYy5QYXRoIG9iamVjdCB3aG9zZSBTdGFydCBhbmQgRW5kIHBvaW50cyBjYW4gYmUgY29ubmVjdGVkIGVuZCBhbnkgYW5jaG9yIG9mIHR3byBMaW5rYWJsZVNoYXBlLlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBvcHRpb25zXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0ZhYnJpYy5DYW52YXN9ICAgb3B0aW9ucy5jYW52YXMgLSBGYWJyaWMgY2FudmFzXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG9wdGlvbnMuaWQgLSBVbmlxdWUgaWRlbnRpZmllclxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLnN0YXJ0XSAtIENvb3JkaW5hdGVzIG9mIHRoZSBzdGFydCBwb2ludFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBbb3B0aW9ucy5zdGFydC54XSAtIFggYXhpcyBjb29yZGluYXRlIG9mIHRoZSBzdGFydCBwb2ludFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBbb3B0aW9ucy5zdGFydC55XSAtIFkgYXhpcyBjb29yZGluYXRlIG9mIHRoZSBzdGFydCBwb2ludFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBbb3B0aW9ucy5lbmQueF0gLSBYIGF4aXMgY29vcmRpbmF0ZSBvZiB0aGUgZW5kIHBvaW50XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIFtvcHRpb25zLmVuZC55XSAtIFkgYXhpcyBjb29yZGluYXRlIG9mIHRoZSBlbmQgcG9pbnRcclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuY3VzdG9tXSAtIE9wdGlvbnMgZW5kIGN1c3RvbWl6ZSB0aGUgZGlmZmVyZW50IHNoYXBlcyBvZiB0aGUgTGlua1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLmN1c3RvbS5wYXRoXSAtIGJlemllciBxdWFkcmF0aWMgY3VydmVcclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuY3VzdG9tLmNvbnRyb2xQb2ludF0gLSBiZXppZXIgcXVhZHJhdGljIGN1cnZlIGNvbnRyb2wgcG9pbnRcclxuICAgKiBAcGFyYW0ge0xpbmV9ICAgICAgICAgICAgW29wdGlvbnMuY3VzdG9tLmNvbnRyb2xMaW5lXSAtIHZpc3VhbCBsaW5lcyBzdGFydCB0aGUgY29udHJvbCBwb2ludCBlbmQgdGhlIHN0YXJ0JmVuZCBwb2ludHNcclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuY3VzdG9tLnN0YXJ0UG9pbnRdIC0gYWthIGFycm93VGFpbFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBbb3B0aW9ucy5jdXN0b20uZW5kUG9pbnRdIC0gYWthIGFycm93SGVhZFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgaWQsXHJcbiAgICAgIGNhbnZhcyxcclxuICAgIH0gPSBvcHRpb25zO1xyXG4gICAgY29uc3QgeDEgPSBvcHRpb25zICYmIG9wdGlvbnMuc3RhcnQgJiYgb3B0aW9ucy5zdGFydC54ID8gb3B0aW9ucy5zdGFydC54IDogMDtcclxuICAgIGNvbnN0IHkxID0gb3B0aW9ucyAmJiBvcHRpb25zLnN0YXJ0ICYmIG9wdGlvbnMuc3RhcnQueSA/IG9wdGlvbnMuc3RhcnQueSA6IDA7XHJcbiAgICBjb25zdCB4MiA9IG9wdGlvbnMgJiYgb3B0aW9ucy5lbmQgJiYgb3B0aW9ucy5lbmQueCA/IG9wdGlvbnMuZW5kLnggOiAwO1xyXG4gICAgY29uc3QgeTIgPSBvcHRpb25zICYmIG9wdGlvbnMuZW5kICYmIG9wdGlvbnMuZW5kLnkgPyBvcHRpb25zLmVuZC55IDogMDtcclxuICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xyXG5cclxuICAgIC8vIFBhdGgsIGEgYmV6aWVyIHF1YWRyYXRpYyBjdXJ2ZVxyXG4gICAgY29uc3QgcGF0aENvb3JkcyA9IHtcclxuICAgICAgTToge1xyXG4gICAgICAgIHg6IHgxLCAvLyBzdGFydCB4XHJcbiAgICAgICAgeTogeTEsIC8vIHN0YXJ0IHlcclxuICAgICAgfSxcclxuICAgICAgUToge1xyXG4gICAgICAgIHgxOiAoeDEgKyB4MikgLyAyLCAvLyBjb250cm9sIHhcclxuICAgICAgICB5MTogKHkxICsgeTIpIC8gMiwgLy8gY29udHJvbCB5XHJcbiAgICAgICAgeDIsIC8vIGVuZCB4XHJcbiAgICAgICAgeTIsIC8vIGVuZCB5XHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgY29uc3QgcGF0aE9wdHMgPSB0aGlzLmRlZmF1bHRQYXRoT3B0aW9ucyA9IHtcclxuICAgICAgZmlsbDogJycsXHJcbiAgICAgIHN0cm9rZTogKG9wdGlvbnMuY3VzdG9tICYmIG9wdGlvbnMuY3VzdG9tLnBhdGggJiYgb3B0aW9ucy5jdXN0b20ucGF0aC5zdHJva2VXaWR0aCkgPyBvcHRpb25zLmN1c3RvbS5wYXRoLnN0cm9rZSA6ICcjMDAwJyxcclxuICAgICAgc3Ryb2tlV2lkdGg6IChvcHRpb25zLmN1c3RvbSAmJiBvcHRpb25zLmN1c3RvbS5wYXRoICYmIG9wdGlvbnMuY3VzdG9tLnBhdGguc3Ryb2tlV2lkdGgpID8gb3B0aW9ucy5jdXN0b20ucGF0aC5zdHJva2VXaWR0aCA6IDIsXHJcbiAgICAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgICBoYXNCb3JkZXJzOiB0cnVlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAgIHBlclBpeGVsVGFyZ2V0RmluZDogdHJ1ZSxcclxuICAgIH07XHJcbiAgICBjb25zdCBwYXRoU3RyID0gYE0gJHtwYXRoQ29vcmRzLk0ueH0gJHtwYXRoQ29vcmRzLk0ueX0gUSAke3BhdGhDb29yZHMuUS54MX0sICR7cGF0aENvb3Jkcy5RLnkxfSwgJHtwYXRoQ29vcmRzLlEueDJ9LCAke3BhdGhDb29yZHMuUS55Mn1gO1xyXG4gICAgY29uc3QgcGF0aCA9IG5ldyBmYWJyaWMuUGF0aChwYXRoU3RyLCBwYXRoT3B0cyk7XHJcbiAgICB0aGlzLnBhdGggPSBwYXRoO1xyXG5cclxuICAgIC8vIENvbnRyb2wgcG9pbnQgYW5kIGxpbmVzIGZvciB0aGUgcXVhZHJhdGljIGN1cnZlXHJcbiAgICBjb25zdCBjb250cm9sUG9pbnQgPSB0aGlzLmNvbnRyb2xQb2ludCA9IG5ldyBmYWJyaWMuQ2lyY2xlKHtcclxuICAgICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAgIGxlZnQ6IHBhdGhDb29yZHMuUS54MSxcclxuICAgICAgdG9wOiBwYXRoQ29vcmRzLlEueTEsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICByYWRpdXM6IDYsXHJcbiAgICAgIGZpbGw6ICcjNzhiZWZhJyxcclxuICAgICAgc3Ryb2tlOiAnIzc4YmVmYScsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgICAgb3BhY2l0eTogMCxcclxuICAgIH0pO1xyXG4gICAgY29udHJvbFBvaW50Lm9uKCdtb3VzZW92ZXInLCB0aGlzLm9uTGlua01vdXNlT3Zlci5iaW5kKHRoaXMpKTtcclxuICAgIGNvbnRyb2xQb2ludC5vbignbW91c2VvdXQnLCB0aGlzLm9uTGlua01vdXNlT3V0LmJpbmQodGhpcykpO1xyXG4gICAgY29udHJvbFBvaW50Lm9uKCdtb3ZpbmcnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aCgnY29udHJvbCcsIHRoaXMuY29udHJvbFBvaW50LmxlZnQsIHRoaXMuY29udHJvbFBvaW50LnRvcCwgZmFsc2UpO1xyXG4gICAgfSk7XHJcbiAgICBjb250cm9sUG9pbnQub24oJ21vdmVkJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhdGgoJ2NvbnRyb2wnLCB0aGlzLmNvbnRyb2xQb2ludC5sZWZ0LCB0aGlzLmNvbnRyb2xQb2ludC50b3AsIHRydWUpO1xyXG4gICAgfSk7XHJcbiAgICBjb250cm9sUG9pbnQub24oJ21vdXNlZG93bicsICgpID0+IHtcclxuICAgICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcclxuICAgIH0pO1xyXG4gICAgY29uc3QgY29udHJvbExpbmVPcHRzID0ge1xyXG4gICAgICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgICAgc3Ryb2tlRGFzaEFycmF5OiBbNSwgNV0sXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICBzdHJva2U6ICcjNzhiZWZhJyxcclxuICAgICAgc2VsZWN0YWJsZTogZmFsc2UsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAgIGV2ZW50ZWQ6IGZhbHNlLFxyXG4gICAgICBvcGFjaXR5OiAwLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGNvbnRyb2xMaW5lMSA9IHRoaXMuY29udHJvbExpbmUxID0gbmV3IGZhYnJpYy5MaW5lKFtjb250cm9sUG9pbnQubGVmdCwgY29udHJvbFBvaW50LnRvcCwgeDEsIHkxXSwgY29udHJvbExpbmVPcHRzKTtcclxuICAgIGNvbnRyb2xMaW5lMS5vbignbW91c2VvdmVyJywgdGhpcy5vbkxpbmtNb3VzZU92ZXIuYmluZCh0aGlzKSk7XHJcbiAgICBjb250cm9sTGluZTEub24oJ21vdXNlb3V0JywgdGhpcy5vbkxpbmtNb3VzZU91dC5iaW5kKHRoaXMpKTtcclxuICAgIGNvbnN0IGNvbnRyb2xMaW5lMiA9IHRoaXMuY29udHJvbExpbmUyID0gbmV3IGZhYnJpYy5MaW5lKFtjb250cm9sUG9pbnQubGVmdCwgY29udHJvbFBvaW50LnRvcCwgeDIsIHkyXSwgY29udHJvbExpbmVPcHRzKTtcclxuICAgIGNvbnRyb2xMaW5lMi5vbignbW91c2VvdmVyJywgdGhpcy5vbkxpbmtNb3VzZU92ZXIuYmluZCh0aGlzKSk7XHJcbiAgICBjb250cm9sTGluZTIub24oJ21vdXNlb3V0JywgdGhpcy5vbkxpbmtNb3VzZU91dC5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAvLyBFbmQgcG9pbnQgKGFycm93SGVhZClcclxuICAgIGNvbnN0IGlzVmFsaWRNYXNrT3B0cyA9IHtcclxuICAgICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAgIGxlZnQ6IHBhdGhDb29yZHMuUS54MixcclxuICAgICAgdG9wOiBwYXRoQ29vcmRzLlEueTIsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICByYWRpdXM6IDE2LFxyXG4gICAgICBmaWxsOiAnIzU3Yjg1NycsIC8vIGVhNGYzN1xyXG4gICAgICBzdHJva2U6ICcjNTdiODU3JyxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICBoYXNCb3JkZXJzOiBmYWxzZSxcclxuICAgICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgICBzZWxlY3RhYmxlOiBmYWxzZSxcclxuICAgICAgb3BhY2l0eTogMCxcclxuICAgIH07XHJcbiAgICBjb25zdCBhcnJvd0hlYWRPcHRzID0ge1xyXG4gICAgICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgICAgd2lkdGg6IDEwLFxyXG4gICAgICBoZWlnaHQ6IDEwLFxyXG4gICAgICBsZWZ0OiBwYXRoQ29vcmRzLlEueDIsXHJcbiAgICAgIHRvcDogcGF0aENvb3Jkcy5RLnkyLFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgZmlsbDogJyMwMDAnLFxyXG4gICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICBzdHJva2U6ICcjMDAwJyxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgICBoYXNCb3JkZXJzOiBmYWxzZSxcclxuICAgICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGFycm93SGVhZCA9IHRoaXMuYXJyb3dIZWFkID0gbmV3IGZhYnJpYy5UcmlhbmdsZShhcnJvd0hlYWRPcHRzKTtcclxuICAgIHRoaXMuaXNWYWxpZEhlYWRDb25uZWN0aW9uTWFzayA9IG5ldyBmYWJyaWMuQ2lyY2xlKGlzVmFsaWRNYXNrT3B0cyk7XHJcbiAgICBhcnJvd0hlYWQub24oJ21vdmluZycsICgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVQYXRoKCdlbmQnLCBhcnJvd0hlYWQubGVmdCwgYXJyb3dIZWFkLnRvcCwgZmFsc2UpO1xyXG4gICAgICB0aGlzLl9jaGVja0V4dHJlbWl0eUNhbkJlQ29ubmVjdGVkKCdlbmQnKTtcclxuICAgIH0pO1xyXG4gICAgYXJyb3dIZWFkLm9uKCdtb3ZlZCcsICgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVQYXRoKCdlbmQnLCBhcnJvd0hlYWQubGVmdCwgYXJyb3dIZWFkLnRvcCwgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuaXNWYWxpZEhlYWRDb25uZWN0aW9uTWFzay5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgICAgdGhpcy5fY29ubmVjdERpc2Nvbm5lY3RFeHRyZW1pdHkoJ2VuZCcpO1xyXG4gICAgfSk7XHJcbiAgICBhcnJvd0hlYWQub24oJ21vdXNlZG93bicsICgpID0+IHtcclxuICAgICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcclxuICAgICAgdGhpcy50b2dnbGVBbGxBbmNob3JzT3BhY2l0eSgxKTtcclxuXHJcbiAgICAgIGFycm93SGVhZC5vbignbW91c2V1cCcsICgpID0+IHtcclxuICAgICAgICB0aGlzLnRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KDApO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFN0YXJ0IHBvaW50IChhcnJvd1RhaWwpXHJcbiAgICBjb25zdCBhcnJvd1RhaWxPcHRzID0ge1xyXG4gICAgICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgICAgd2lkdGg6IDEwLFxyXG4gICAgICBoZWlnaHQ6IDEwLFxyXG4gICAgICBsZWZ0OiBwYXRoQ29vcmRzLk0ueCxcclxuICAgICAgdG9wOiBwYXRoQ29vcmRzLk0ueSxcclxuICAgICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAgIGZpbGw6ICcjZmZmJyxcclxuICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgc3Ryb2tlOiAnIzAwMCcsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgIH07XHJcbiAgICBjb25zdCBhcnJvd1RhaWwgPSB0aGlzLmFycm93VGFpbCA9IG5ldyBmYWJyaWMuUmVjdChhcnJvd1RhaWxPcHRzKTtcclxuICAgIHRoaXMuaXNWYWxpZFRhaWxDb25uZWN0aW9uTWFzayA9IG5ldyBmYWJyaWMuQ2lyY2xlKGlzVmFsaWRNYXNrT3B0cyk7XHJcbiAgICBhcnJvd1RhaWwub24oJ21vdmluZycsICgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVQYXRoKCdzdGFydCcsIGFycm93VGFpbC5sZWZ0LCBhcnJvd1RhaWwudG9wLCBmYWxzZSk7XHJcbiAgICAgIHRoaXMuX2NoZWNrRXh0cmVtaXR5Q2FuQmVDb25uZWN0ZWQoJ3N0YXJ0Jyk7XHJcbiAgICB9KTtcclxuICAgIGFycm93VGFpbC5vbignbW92ZWQnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aCgnc3RhcnQnLCBhcnJvd1RhaWwubGVmdCwgYXJyb3dUYWlsLnRvcCwgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuaXNWYWxpZFRhaWxDb25uZWN0aW9uTWFzay5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgICAgdGhpcy5fY29ubmVjdERpc2Nvbm5lY3RFeHRyZW1pdHkoJ3N0YXJ0Jyk7XHJcbiAgICB9KTtcclxuICAgIGFycm93VGFpbC5vbignbW91c2Vkb3duJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLmJyaW5nVG9Gcm9udCgpO1xyXG4gICAgICB0aGlzLnRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KDEpO1xyXG5cclxuICAgICAgYXJyb3dUYWlsLm9uKCdtb3VzZXVwJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudG9nZ2xlQWxsQW5jaG9yc09wYWNpdHkoMCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbmplY3QoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGlkLFxyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHBhdGgsXHJcbiAgICAgIGNvbnRyb2xQb2ludCxcclxuICAgICAgY29udHJvbExpbmUxLFxyXG4gICAgICBjb250cm9sTGluZTIsXHJcbiAgICAgIGFycm93SGVhZCxcclxuICAgICAgYXJyb3dUYWlsLFxyXG4gICAgICBpc1ZhbGlkVGFpbENvbm5lY3Rpb25NYXNrLFxyXG4gICAgICBpc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrLFxyXG4gICAgfSA9IHRoaXM7XHJcbiAgICBjYW52YXMuYWRkKGNvbnRyb2xQb2ludCk7XHJcbiAgICBjYW52YXMuYWRkKGNvbnRyb2xMaW5lMSk7XHJcbiAgICBjYW52YXMuYWRkKGNvbnRyb2xMaW5lMik7XHJcbiAgICBjYW52YXMuYWRkKGlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2spO1xyXG4gICAgY2FudmFzLmFkZChpc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrKTtcclxuICAgIGNhbnZhcy5hZGQoYXJyb3dIZWFkKTtcclxuICAgIGNhbnZhcy5hZGQoYXJyb3dUYWlsKTtcclxuXHJcbiAgICBjYW52YXMuYWRkKHBhdGgpO1xyXG4gICAgdGhpcy51cGRhdGVQYXRoKCdzdGFydCcsIHBhdGgucGF0aFswXVsxXSwgcGF0aC5wYXRoWzBdWzJdLCB0cnVlKTtcclxuICAgIHRoaXMudXBkYXRlUGF0aCgnZW5kJywgcGF0aC5wYXRoWzFdWzNdLCBwYXRoLnBhdGhbMV1bNF0sIHRydWUpO1xyXG4gICAgdGhpcy51cGRhdGVQYXRoKCdjb250cm9sJywgcGF0aC5wYXRoWzFdWzFdLCBwYXRoLnBhdGhbMV1bMl0sIHRydWUpO1xyXG5cclxuICAgIGNhbnZhcy5saW5rc1tpZF0gPSB0aGlzO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgY29ubmVjdExpbmsobGlua1BvaW50LCBzaGFwZUlkLCBjYXJkaW5hbCkge1xyXG4gICAgLy8gQ2hlY2sgbm90IGFscmVhZHkgY29ubmVjdGVkXHJcbiAgICBpZiAoIXRoaXMuaXNWYWxpZENvbm5lY3Rpb24obGlua1BvaW50LCBzaGFwZUlkLCBjYXJkaW5hbCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgc2hhcGUgPSB0aGlzLmNhbnZhcy5nZXRPYmplY3RzKClcclxuICAgICAgLmZpbmQoKG8pID0+IG8uaWQgPT09IHNoYXBlSWQpO1xyXG5cclxuICAgIC8vIERpc2Nvbm5lY3QgZXhpc3Rpbmcgb2JqZWN0XHJcbiAgICB0aGlzLmRpc2Nvbm5lY3RMaW5rKGxpbmtQb2ludCk7XHJcblxyXG4gICAgLy8gQ29ubmVjdFxyXG4gICAgdGhpc1tsaW5rUG9pbnRdID0ge1xyXG4gICAgICBzaGFwZSxcclxuICAgICAgYW5jaG9yOiBjYXJkaW5hbCxcclxuICAgICAgaGFuZGxlcnM6IHtcclxuICAgICAgICBvbkFuY2hvclBvc2l0aW9uTW9kaWZ5aW5nOiAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZVBhdGgobGlua1BvaW50LCBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5sZWZ0LCBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS50b3AsIGZhbHNlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQW5jaG9yUG9zaXRpb25Nb2RpZmllZDogKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVQYXRoKGxpbmtQb2ludCwgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ubGVmdCwgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0udG9wLCB0cnVlKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICAgIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLm9wYWNpdHkgPSAwO1xyXG4gICAgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ub24oJ3BnOnBvc2l0aW9uOm1vZGlmeWluZycsIHRoaXNbbGlua1BvaW50XS5oYW5kbGVycy5vbkFuY2hvclBvc2l0aW9uTW9kaWZ5aW5nKTtcclxuICAgIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLm9uKCdwZzpwb3NpdGlvbjptb2RpZmllZCcsIHRoaXNbbGlua1BvaW50XS5oYW5kbGVycy5vbkFuY2hvclBvc2l0aW9uTW9kaWZpZWQpO1xyXG5cclxuICAgIC8vIFVwZGF0ZSBMaW5rXHJcbiAgICB0aGlzLnVwZGF0ZVBhdGgobGlua1BvaW50LCBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5sZWZ0LCBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS50b3AsIHRydWUsIGZhbHNlKTtcclxuICB9XHJcblxyXG4gIGRpc2Nvbm5lY3RMaW5rKGxpbmtQb2ludCkge1xyXG4gICAgaWYgKHRoaXNbbGlua1BvaW50XSkge1xyXG4gICAgICB0aGlzW2xpbmtQb2ludF0uc2hhcGUuYW5jaG9yc1t0aGlzW2xpbmtQb2ludF0uYW5jaG9yXS5vZmYoJ3BnOnBvc2l0aW9uOm1vZGlmeWluZycsIHRoaXNbbGlua1BvaW50XS5oYW5kbGVycy5vbkFuY2hvclBvc2l0aW9uTW9kaWZ5aW5nKTtcclxuICAgICAgdGhpc1tsaW5rUG9pbnRdLnNoYXBlLmFuY2hvcnNbdGhpc1tsaW5rUG9pbnRdLmFuY2hvcl0ub2ZmKCdwZzpwb3NpdGlvbjptb2RpZmllZCcsIHRoaXNbbGlua1BvaW50XS5oYW5kbGVycy5vbkFuY2hvclBvc2l0aW9uTW9kaWZpZWQpO1xyXG4gICAgICBkZWxldGUgdGhpc1tsaW5rUG9pbnRdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVzZXRDdXJ2YXR1cmUoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGNvbnRyb2xQb2ludCxcclxuICAgICAgcGF0aCxcclxuICAgIH0gPSB0aGlzO1xyXG4gICAgY29udHJvbFBvaW50LmxlZnQgPSAocGF0aC5wYXRoWzBdWzFdICsgcGF0aC5wYXRoWzFdWzNdKSAvIDI7XHJcbiAgICBjb250cm9sUG9pbnQudG9wID0gKHBhdGgucGF0aFswXVsyXSArIHBhdGgucGF0aFsxXVs0XSkgLyAyO1xyXG4gICAgY29udHJvbFBvaW50LnNldENvb3JkcygpO1xyXG4gICAgY29udHJvbFBvaW50LmZpcmUoJ21vdmVkJyk7XHJcbiAgfVxyXG5cclxuICBicmluZ1RvRnJvbnQoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgcGF0aCxcclxuICAgICAgY29udHJvbFBvaW50LFxyXG4gICAgICBhcnJvd0hlYWQsXHJcbiAgICAgIGFycm93VGFpbCxcclxuICAgIH0gPSB0aGlzO1xyXG4gICAgY2FudmFzLmJyaW5nVG9Gcm9udChwYXRoKTtcclxuICAgIGNhbnZhcy5icmluZ1RvRnJvbnQoY29udHJvbFBvaW50KTtcclxuICAgIGNhbnZhcy5icmluZ1RvRnJvbnQoYXJyb3dIZWFkKTtcclxuICAgIGNhbnZhcy5icmluZ1RvRnJvbnQoYXJyb3dUYWlsKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVBhdGgobGlua1BvaW50LCB4LCB5LCBjb21taXQsIHJlc2V0Q3Vydikge1xyXG4gICAgY29uc3QgcGF0aCA9IHtcclxuICAgICAgTToge1xyXG4gICAgICAgIHg6IGxpbmtQb2ludCA9PT0gJ3N0YXJ0JyA/IHggOiB0aGlzLnBhdGgucGF0aFswXVsxXSxcclxuICAgICAgICB5OiBsaW5rUG9pbnQgPT09ICdzdGFydCcgPyB5IDogdGhpcy5wYXRoLnBhdGhbMF1bMl0sXHJcbiAgICAgIH0sXHJcbiAgICAgIFE6IHtcclxuICAgICAgICB4MTogbGlua1BvaW50ID09PSAnY29udHJvbCcgPyB4IDogdGhpcy5wYXRoLnBhdGhbMV1bMV0sXHJcbiAgICAgICAgeTE6IGxpbmtQb2ludCA9PT0gJ2NvbnRyb2wnID8geSA6IHRoaXMucGF0aC5wYXRoWzFdWzJdLFxyXG4gICAgICAgIHgyOiBsaW5rUG9pbnQgPT09ICdlbmQnID8geCA6IHRoaXMucGF0aC5wYXRoWzFdWzNdLFxyXG4gICAgICAgIHkyOiBsaW5rUG9pbnQgPT09ICdlbmQnID8geSA6IHRoaXMucGF0aC5wYXRoWzFdWzRdLFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICAgIGlmIChjb21taXQpIHtcclxuICAgICAgY29uc3QgcGF0aFN0ciA9IGBNICR7cGF0aC5NLnh9ICR7cGF0aC5NLnl9IFEgJHtwYXRoLlEueDF9LCAke3BhdGguUS55MX0sICR7cGF0aC5RLngyfSwgJHtwYXRoLlEueTJ9YDtcclxuICAgICAgY29uc3QgbmV3UGF0aCA9IG5ldyBmYWJyaWMuUGF0aChwYXRoU3RyLCB0aGlzLmRlZmF1bHRQYXRoT3B0aW9ucyk7XHJcbiAgICAgIHRoaXMuY2FudmFzLnJlbW92ZSh0aGlzLnBhdGgpO1xyXG4gICAgICB0aGlzLmNhbnZhcy5hZGQobmV3UGF0aCk7XHJcblxyXG4gICAgICBuZXdQYXRoLm9uKCdtb3VzZW92ZXInLCB0aGlzLm9uTGlua01vdXNlT3Zlci5iaW5kKHRoaXMpKTtcclxuICAgICAgbmV3UGF0aC5vbignbW91c2VvdXQnLCB0aGlzLm9uTGlua01vdXNlT3V0LmJpbmQodGhpcykpO1xyXG4gICAgICBuZXdQYXRoLm9uKCdtb3VzZWRvd24nLCB0aGlzLmJyaW5nVG9Gcm9udC5iaW5kKHRoaXMpKTtcclxuICAgICAgbmV3UGF0aC5vbignbW92aW5nJywgdGhpcy5vbkxpbmtNb3ZpbmcuYmluZCh0aGlzKSk7XHJcbiAgICAgIG5ld1BhdGgub24oJ21vdmVkJywgdGhpcy5vbkxpbmtNb3ZlZC5iaW5kKHRoaXMpKTtcclxuICAgICAgY29uc3QgdG9CaW5kID0gW1xyXG4gICAgICAgIHRoaXMuYXJyb3dIZWFkLFxyXG4gICAgICAgIHRoaXMuYXJyb3dUYWlsLFxyXG4gICAgICAgIHRoaXMuY29udHJvbFBvaW50LFxyXG4gICAgICAgIHRoaXMuY29udHJvbExpbmUxLFxyXG4gICAgICAgIHRoaXMuY29udHJvbExpbmUyLFxyXG4gICAgICBdO1xyXG4gICAgICBjb25zdCBib3NzVHJhbnNmb3JtID0gbmV3UGF0aC5jYWxjVHJhbnNmb3JtTWF0cml4KCk7XHJcbiAgICAgIGNvbnN0IGludmVydGVkQm9zc1RyYW5zZm9ybSA9IGZhYnJpYy51dGlsLmludmVydFRyYW5zZm9ybShib3NzVHJhbnNmb3JtKTtcclxuICAgICAgdG9CaW5kLmZvckVhY2goKG8pID0+IHtcclxuICAgICAgICBjb25zdCBkZXNpcmVkVHJhbnNmb3JtID0gZmFicmljLnV0aWwubXVsdGlwbHlUcmFuc2Zvcm1NYXRyaWNlcyhcclxuICAgICAgICAgIGludmVydGVkQm9zc1RyYW5zZm9ybSxcclxuICAgICAgICAgIG8uY2FsY1RyYW5zZm9ybU1hdHJpeCgpLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXHJcbiAgICAgICAgby5yZWxhdGlvbnNoaXAgPSBkZXNpcmVkVHJhbnNmb3JtO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMucGF0aCA9IG5ld1BhdGg7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhdGguc2V0KCdwYXRoJywgW1xyXG4gICAgICAgIFsnTScsIHBhdGguTS54LCBwYXRoLk0ueV0sXHJcbiAgICAgICAgWydRJywgcGF0aC5RLngxLCBwYXRoLlEueTEsIHBhdGguUS54MiwgcGF0aC5RLnkyXSxcclxuICAgICAgXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVXBkYXRlIGNvbnRyb2wgbGluZXMsIGFycm93IGhlYWRzIGFuZCB0YWlsc1xyXG4gICAgdGhpcy5jb250cm9sTGluZTEuc2V0KHtcclxuICAgICAgeDE6IHRoaXMuY29udHJvbFBvaW50LmxlZnQsXHJcbiAgICAgIHkxOiB0aGlzLmNvbnRyb2xQb2ludC50b3AsXHJcbiAgICAgIHgyOiB0aGlzLnBhdGgucGF0aFswXVsxXSxcclxuICAgICAgeTI6IHRoaXMucGF0aC5wYXRoWzBdWzJdLFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmNvbnRyb2xMaW5lMi5zZXQoe1xyXG4gICAgICB4MTogdGhpcy5jb250cm9sUG9pbnQubGVmdCxcclxuICAgICAgeTE6IHRoaXMuY29udHJvbFBvaW50LnRvcCxcclxuICAgICAgeDI6IHRoaXMucGF0aC5wYXRoWzFdWzNdLFxyXG4gICAgICB5MjogdGhpcy5wYXRoLnBhdGhbMV1bNF0sXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGFycm93SGVhZEFuZ2xlID0gKE1hdGguYXRhbjIodGhpcy5wYXRoLnBhdGhbMV1bNF0gLSB0aGlzLnBhdGgucGF0aFsxXVsyXSwgdGhpcy5wYXRoLnBhdGhbMV1bM10gLSB0aGlzLnBhdGgucGF0aFsxXVsxXSkgKiAxODApIC8gTWF0aC5QSTtcclxuICAgIHRoaXMuYXJyb3dIZWFkLmFuZ2xlID0gYXJyb3dIZWFkQW5nbGUgKyA5MDtcclxuICAgIHRoaXMuYXJyb3dIZWFkLmxlZnQgPSB0aGlzLnBhdGgucGF0aFsxXVszXTtcclxuICAgIHRoaXMuYXJyb3dIZWFkLnRvcCA9IHRoaXMucGF0aC5wYXRoWzFdWzRdO1xyXG4gICAgdGhpcy5hcnJvd0hlYWQuc2V0Q29vcmRzKCk7XHJcbiAgICB0aGlzLmFycm93VGFpbC5sZWZ0ID0gdGhpcy5wYXRoLnBhdGhbMF1bMV07XHJcbiAgICB0aGlzLmFycm93VGFpbC50b3AgPSB0aGlzLnBhdGgucGF0aFswXVsyXTtcclxuICAgIHRoaXMuYXJyb3dUYWlsLnNldENvb3JkcygpO1xyXG5cclxuICAgIHRoaXMuYnJpbmdUb0Zyb250KCk7XHJcblxyXG4gICAgLy8gUmVzZXQgY29udHJvbCBwb2ludFxyXG4gICAgaWYgKHJlc2V0Q3Vydikge1xyXG4gICAgICB0aGlzLnJlc2V0Q3VydmF0dXJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc1ZhbGlkQ29ubmVjdGlvbihsaW5rUG9pbnQsIHNoYXBlSWQsIGNhcmRpbmFsKSB7XHJcbiAgICBjb25zdCBzaGFwZSA9IHRoaXMuY2FudmFzLmdldE9iamVjdHMoKVxyXG4gICAgICAuZmluZCgobykgPT4gby5pZCA9PT0gc2hhcGVJZCk7XHJcbiAgICAvLyBDaGVjayBub3QgYWxyZWFkeSBjb25uZWN0ZWRcclxuICAgIGlmIChsaW5rUG9pbnQgPT09ICdzdGFydCcpIHtcclxuICAgICAgaWYgKHRoaXMuc3RhcnQgJiYgdGhpcy5zdGFydC5zaGFwZSAmJiB0aGlzLnN0YXJ0LnNoYXBlLmlkID09PSBzaGFwZS5pZCAmJiB0aGlzLnN0YXJ0LmNhcmRpbmFsID09PSBjYXJkaW5hbCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTsgLy8gdHJ5aW5nIGVuZCBzZXQgdGhlIHNhbWUgYWxyZWFkeSBjb25uZWN0ZWQgYW5jaG9yXHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuZW5kICYmIHRoaXMuZW5kLnNoYXBlICYmIHRoaXMuZW5kLnNoYXBlLmlkID09PSBzaGFwZS5pZCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTsgLy8gdHJ5aW5nIGVuZCBzaG9ydCBjaXJjdWl0IHRoZSByZWN0YW5nbGVcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChsaW5rUG9pbnQgPT09ICdlbmQnKSB7XHJcbiAgICAgIGlmICh0aGlzLmVuZCAmJiB0aGlzLmVuZC5zaGFwZSAmJiB0aGlzLmVuZC5zaGFwZS5pZCA9PT0gc2hhcGUuaWQgJiYgdGhpcy5lbmQuY2FyZGluYWwgPT09IGNhcmRpbmFsKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyB0cnlpbmcgZW5kIHNldCB0aGUgc2FtZSBhbHJlYWR5IGNvbm5lY3RlZCBhbmNob3JcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5zdGFydCAmJiB0aGlzLnN0YXJ0LnNoYXBlICYmIHRoaXMuc3RhcnQuc2hhcGUuaWQgPT09IHNoYXBlLmlkKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyB0cnlpbmcgZW5kIHNob3J0IGNpcmN1aXQgdGhlIHJlY3RhbmdsZVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KG9wYWNpdHkpIHtcclxuICAgIGNvbnN0IGFuY2hvcnMgPSB0aGlzLmNhbnZhcy5nZXRPYmplY3RzKClcclxuICAgICAgLmZpbHRlcigobykgPT4gby50eXBlID09PSAnYW5jaG9yJyk7XHJcblxyXG4gICAgLy8gY29uc3QgcHJvbWlzZXMgPSBbXTtcclxuICAgIC8vIGNvbnN0IHByb21pc2VGYWN0b3J5ID0gZnVuY3Rpb24gKGFuY2hvcikge1xyXG4gICAgLy8gICByZXR1cm4gZnVuY3Rpb24gKHJlc29sdmUpIHtcclxuICAgIC8vICAgICBhbmNob3IuYW5pbWF0ZSgnb3BhY2l0eScsIG9wYWNpdHksIHtcclxuICAgIC8vICAgICAgIGR1cmF0aW9uOiAzMDAsXHJcbiAgICAvLyAgICAgICBvbkNoYW5nZTogcmVzb2x2ZSxcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vICAgfTtcclxuICAgIC8vIH07XHJcbiAgICAvLyBmb3IgKGxldCBhID0gMDsgYSA8IGFuY2hvcnMubGVuZ3RoOyBhICs9IDEpIHtcclxuICAgIC8vICAgaWYgKGxvY2sgIT09IHVuZGVmaW5lZCkgYW5jaG9yc1thXS5sb2NrT3BhY2l0eSA9IGxvY2s7XHJcbiAgICAvLyAgIHByb21pc2VzLnB1c2gobmV3IFByb21pc2UocHJvbWlzZUZhY3RvcnkoYW5jaG9yc1thXSkpKTtcclxuICAgIC8vIH1cclxuICAgIC8vIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IHtcclxuICAgIC8vICAgdGhpcy5jYW52YXMucmVuZGVyQWxsKCk7XHJcbiAgICAvLyB9KTtcclxuXHJcbiAgICBmb3IgKGxldCBhID0gMDsgYSA8IGFuY2hvcnMubGVuZ3RoOyBhICs9IDEpIHtcclxuICAgICAgLy8gaWYgKGxvY2sgIT09IHVuZGVmaW5lZCkgYW5jaG9yc1thXS5sb2NrT3BhY2l0eSA9IGxvY2s7XHJcbiAgICAgIGFuY2hvcnNbYV0uc2V0KCdvcGFjaXR5Jywgb3BhY2l0eSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNhbnZhcy5yZW5kZXJBbGwoKTtcclxuICB9XHJcblxyXG4gIG9uTGlua01vdXNlT3ZlcigpIHtcclxuICAgIHRoaXMuY29udHJvbFBvaW50LnRvZ2dsZU9wYWNpdHkoMSk7XHJcbiAgICB0aGlzLmNvbnRyb2xMaW5lMS50b2dnbGVPcGFjaXR5KDEpO1xyXG4gICAgdGhpcy5jb250cm9sTGluZTIudG9nZ2xlT3BhY2l0eSgxKTtcclxuICB9XHJcblxyXG4gIG9uTGlua01vdXNlT3V0KCkge1xyXG4gICAgdGhpcy5jb250cm9sUG9pbnQudG9nZ2xlT3BhY2l0eSgwKTtcclxuICAgIHRoaXMuY29udHJvbExpbmUxLnRvZ2dsZU9wYWNpdHkoMCk7XHJcbiAgICB0aGlzLmNvbnRyb2xMaW5lMi50b2dnbGVPcGFjaXR5KDApO1xyXG4gIH1cclxuXHJcbiAgb25MaW5rTW92aW5nKCkge1xyXG4gICAgLy8gTW92ZSBzdGFydCwgZW5kLCBjb250cm9sIHBvaW50cyBhbHRvZ2V0aGVyIHdpdGggdGhlIFBhdGhcclxuICAgIGNvbnN0IHRvVXBkYXRlID0gW1xyXG4gICAgICB0aGlzLmFycm93SGVhZCxcclxuICAgICAgdGhpcy5hcnJvd1RhaWwsXHJcbiAgICAgIHRoaXMuY29udHJvbFBvaW50LFxyXG4gICAgICB0aGlzLmNvbnRyb2xMaW5lMSxcclxuICAgICAgdGhpcy5jb250cm9sTGluZTIsXHJcbiAgICBdO1xyXG4gICAgdG9VcGRhdGUuZm9yRWFjaCgobykgPT4ge1xyXG4gICAgICBpZiAoIW8ucmVsYXRpb25zaGlwKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHsgcmVsYXRpb25zaGlwIH0gPSBvO1xyXG4gICAgICBjb25zdCBuZXdUcmFuc2Zvcm0gPSBmYWJyaWMudXRpbC5tdWx0aXBseVRyYW5zZm9ybU1hdHJpY2VzKFxyXG4gICAgICAgIHRoaXMucGF0aC5jYWxjVHJhbnNmb3JtTWF0cml4KCksXHJcbiAgICAgICAgcmVsYXRpb25zaGlwLFxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBvcHQgPSBmYWJyaWMudXRpbC5xckRlY29tcG9zZShuZXdUcmFuc2Zvcm0pO1xyXG4gICAgICBvLnNldCh7XHJcbiAgICAgICAgZmxpcFg6IGZhbHNlLFxyXG4gICAgICAgIGZsaXBZOiBmYWxzZSxcclxuICAgICAgfSk7XHJcbiAgICAgIG8uc2V0UG9zaXRpb25CeU9yaWdpbihcclxuICAgICAgICB7IHg6IG9wdC50cmFuc2xhdGVYLCB5OiBvcHQudHJhbnNsYXRlWSB9LFxyXG4gICAgICAgICdjZW50ZXInLFxyXG4gICAgICAgICdjZW50ZXInLFxyXG4gICAgICApO1xyXG4gICAgICBvLnNldChvcHQpO1xyXG4gICAgICBvLnNldENvb3JkcygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gRmluYWxseSwgY2hlY2sgdGhlIHN0YXJ0IG9yIGVuZCBwb2ludHMgY2FuIGJlIGNvbm5lY3RlZC5cclxuICAgIHRoaXMuX2NoZWNrRXh0cmVtaXR5Q2FuQmVDb25uZWN0ZWQoJ3N0YXJ0Jyk7XHJcbiAgICB0aGlzLl9jaGVja0V4dHJlbWl0eUNhbkJlQ29ubmVjdGVkKCdlbmQnKTtcclxuICB9XHJcblxyXG4gIG9uTGlua01vdmVkKCkge1xyXG4gICAgLy8gUmV1cGRhdGUgdGhlIFBhdGggYWNjb3JkaW5nIGVuZCB0aGUgbmV3IGNvb3JkaW5hdGVzIG9mIGFsbCBlbGVtZW50c1xyXG4gICAgY29uc3QgcGF0aENvb3JkcyA9IHtcclxuICAgICAgTToge1xyXG4gICAgICAgIHg6IHRoaXMuYXJyb3dUYWlsLmxlZnQsXHJcbiAgICAgICAgeTogdGhpcy5hcnJvd1RhaWwudG9wLFxyXG4gICAgICB9LFxyXG4gICAgICBROiB7XHJcbiAgICAgICAgeDE6IHRoaXMuY29udHJvbFBvaW50LmxlZnQsXHJcbiAgICAgICAgeTE6IHRoaXMuY29udHJvbFBvaW50LnRvcCxcclxuICAgICAgICB4MjogdGhpcy5hcnJvd0hlYWQubGVmdCxcclxuICAgICAgICB5MjogdGhpcy5hcnJvd0hlYWQudG9wLFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHBhdGhTdHIgPSBgTSAke3BhdGhDb29yZHMuTS54fSAke3BhdGhDb29yZHMuTS55fSBRICR7cGF0aENvb3Jkcy5RLngxfSwgJHtwYXRoQ29vcmRzLlEueTF9LCAke3BhdGhDb29yZHMuUS54Mn0sICR7cGF0aENvb3Jkcy5RLnkyfWA7XHJcbiAgICBjb25zdCBjYWNhID0gbmV3IGZhYnJpYy5QYXRoKHBhdGhTdHIsIHt9KTtcclxuICAgIHRoaXMudXBkYXRlUGF0aCgnc3RhcnQnLCBjYWNhLnBhdGhbMF1bMV0sIGNhY2EucGF0aFswXVsyXSwgZmFsc2UpO1xyXG4gICAgdGhpcy51cGRhdGVQYXRoKCdlbmQnLCBjYWNhLnBhdGhbMV1bM10sIGNhY2EucGF0aFsxXVs0XSwgZmFsc2UpO1xyXG4gICAgdGhpcy51cGRhdGVQYXRoKCdjb250cm9sJywgY2FjYS5wYXRoWzFdWzFdLCBjYWNhLnBhdGhbMV1bMl0sIHRydWUpO1xyXG5cclxuICAgIC8vIENvbm5lY3Qgb3IgRGlzY29ubmVjdCBkZXBlbmRpbmcgb24gZXh0cmVtaXRpZXMgcG9zaXRpb25zXHJcbiAgICB0aGlzLmlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2suc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICB0aGlzLmlzVmFsaWRIZWFkQ29ubmVjdGlvbk1hc2suc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICB0aGlzLl9jb25uZWN0RGlzY29ubmVjdEV4dHJlbWl0eSgnc3RhcnQnKTtcclxuICAgIHRoaXMuX2Nvbm5lY3REaXNjb25uZWN0RXh0cmVtaXR5KCdlbmQnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhlbHBlciBlbmQgZGlzcGxheSBhIHZhbGlkIGNpcmNsZSBtYXNrIG9uIHNwZWNpZmljIGNvbmRpdGlvbnMuXHJcbiAgICogSWYgdGhlIGV4dHJlbWl0eSBpcyB0b3VjaGluZyBhbiBhbmNob3Igb2YgYSBMaW5rYWJsZVNoYXBlIHN0YXJ0IHdoaWNoIGl0IGlzIG5vdCB5ZXQgY29ubmVjdGVkID0+IHNob3cgR1JFRU5cclxuICAgKiBJZiB0aGUgZXh0cmVtaXR5IGlzIHRvdWNoaW5nIGFuIGFuY2hvciBvZiBhIExpbmthYmxlU2hhcGUgc3RhcnQgd2hpY2ggaXQgaXMgYWxyZWFkeSBjb25uZWN0ZWQgYnkgdGhlIG90aGVyIGV4dHJlbWl0eSA9PiBzaG93IFJFRFxyXG4gICAqIEBwYXJhbSBkaXJlY3Rpb25cclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9jaGVja0V4dHJlbWl0eUNhbkJlQ29ubmVjdGVkKGRpcmVjdGlvbikge1xyXG4gICAgY29uc3QgeyBjYW52YXMgfSA9IHRoaXM7XHJcblxyXG4gICAgbGV0IGV4dHJlbWl0eTtcclxuICAgIGxldCBtYXNrO1xyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3N0YXJ0Jykge1xyXG4gICAgICBleHRyZW1pdHkgPSB0aGlzLmFycm93VGFpbDtcclxuICAgICAgbWFzayA9IHRoaXMuaXNWYWxpZFRhaWxDb25uZWN0aW9uTWFzaztcclxuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnZW5kJykge1xyXG4gICAgICBleHRyZW1pdHkgPSB0aGlzLmFycm93SGVhZDtcclxuICAgICAgbWFzayA9IHRoaXMuaXNWYWxpZEhlYWRDb25uZWN0aW9uTWFzaztcclxuICAgIH1cclxuXHJcbiAgICBtYXNrLmxlZnQgPSBleHRyZW1pdHkubGVmdDtcclxuICAgIG1hc2sudG9wID0gZXh0cmVtaXR5LnRvcDtcclxuICAgIG1hc2suc2V0Q29vcmRzKCk7XHJcbiAgICBtYXNrLnNldCgnb3BhY2l0eScsIDApO1xyXG5cclxuICAgIC8vIENoZWNrIGlmIGludGVyc2VjdHMgd2l0aCBhbmNob3JcclxuICAgIGNvbnN0IGFuY2hvcnMgPSBjYW52YXMuZ2V0T2JqZWN0cygpXHJcbiAgICAgIC5maWx0ZXIoKG8pID0+IG8udHlwZSA9PT0gJ2FuY2hvcicpO1xyXG4gICAgZXh0cmVtaXR5LnNldCgnc3Ryb2tlJywgJyMwMDAnKTtcclxuICAgIGZvciAobGV0IGEgPSAwOyBhIDwgYW5jaG9ycy5sZW5ndGg7IGEgKz0gMSkge1xyXG4gICAgICBpZiAoZXh0cmVtaXR5LmludGVyc2VjdHNXaXRoT2JqZWN0KGFuY2hvcnNbYV0pKSB7XHJcbiAgICAgICAgbWFzay5zZXQoJ29wYWNpdHknLCAwLjUpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWRDb25uZWN0aW9uKGRpcmVjdGlvbiwgYW5jaG9yc1thXS5zaGFwZUlkLCBhbmNob3JzW2FdLmNhcmRpbmFsKSkge1xyXG4gICAgICAgICAgbWFzay5zZXQoe1xyXG4gICAgICAgICAgICBzdHJva2U6ICcjNTdiODU3JyxcclxuICAgICAgICAgICAgZmlsbDogJyM1N2I4NTcnLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBleHRyZW1pdHkuc2V0KCdzdHJva2UnLCAnIzVmNScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBtYXNrLnNldCh7XHJcbiAgICAgICAgICAgIHN0cm9rZTogJyNlYTRmMzcnLFxyXG4gICAgICAgICAgICBmaWxsOiAnI2VhNGYzNycsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGV4dHJlbWl0eS5zZXQoJ3N0cm9rZScsICcjZWE0ZjM3Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIZWxwZXIgZW5kIGV4ZWN1dGUgY29ubmVjdC9kaXNjb25uZWN0IGRlcGVuZGluZyBvbiBzcGVjaWZpYyBjb25kaXRpb25zLlxyXG4gICAqIElmIHRoZSBleHRyZW1pdHkgd2FzIGNvbm5lY3RlZCBBTkQgaXQgaXMgTk9UIHRvdWNoaW5nIHRoZSBhbmNob3IgYW55bW9yZSA9PiBkaXNjb25uZWN0IGl0LlxyXG4gICAqIElmIHRoZSBleHRyZW1pdHkgd2FzIGRpc2Nvbm5lY3RlZCBBTkQgaXQgaXMgdG91Y2hpbmcgdGhlIGFuY2hvciA9PiBjb25uZWN0IGl0LlxyXG4gICAqIEBwYXJhbSBkaXJlY3Rpb25cclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9jb25uZWN0RGlzY29ubmVjdEV4dHJlbWl0eShkaXJlY3Rpb24pIHtcclxuICAgIGNvbnN0IHsgY2FudmFzIH0gPSB0aGlzO1xyXG5cclxuICAgIGxldCBleHRyZW1pdHk7XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSAnc3RhcnQnKSB7XHJcbiAgICAgIGV4dHJlbWl0eSA9IHRoaXMuYXJyb3dUYWlsO1xyXG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdlbmQnKSB7XHJcbiAgICAgIGV4dHJlbWl0eSA9IHRoaXMuYXJyb3dIZWFkO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENoZWNrIGlmIGludGVyc2VjdHMgd2l0aCBhbmNob3JcclxuICAgIGNvbnN0IGFuY2hvcnMgPSBjYW52YXMuZ2V0T2JqZWN0cygpXHJcbiAgICAgIC5maWx0ZXIoKG8pID0+IG8udHlwZSA9PT0gJ2FuY2hvcicpO1xyXG4gICAgZm9yIChsZXQgYSA9IDA7IGEgPCBhbmNob3JzLmxlbmd0aDsgYSArPSAxKSB7XHJcbiAgICAgIGlmIChleHRyZW1pdHkuaW50ZXJzZWN0c1dpdGhPYmplY3QoYW5jaG9yc1thXSkpIHtcclxuICAgICAgICB0aGlzLmNvbm5lY3RMaW5rKGRpcmVjdGlvbiwgYW5jaG9yc1thXS5zaGFwZUlkLCBhbmNob3JzW2FdLmNhcmRpbmFsKTtcclxuICAgICAgICAvLyBhbmNob3JzW2FdLnNldCgnc3Ryb2tlJywgJyMwMDAnKTtcclxuICAgICAgICBleHRyZW1pdHkuc2V0KCdzdHJva2UnLCAnIzAwMCcpO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXNbZGlyZWN0aW9uXSAmJiBhbmNob3JzW2FdID09PSB0aGlzW2RpcmVjdGlvbl0uc2hhcGUuYW5jaG9yc1t0aGlzW2RpcmVjdGlvbl0uYW5jaG9yXSkge1xyXG4gICAgICAgIC8vIElmIHRoaXMgbGluayB3YXMgY29ubmVjdGVkIGVuZCB0aGlzIGFuY2hvciBhbmQgaXQgZG9lc24ndCBpbnRlcnNlY3QgYW55bW9yZVxyXG4gICAgICAgIHRoaXMuZGlzY29ubmVjdExpbmsoZGlyZWN0aW9uKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJjb25zdCB7IGZhYnJpYyB9ID0gd2luZG93O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlua2FibGVTaGFwZSB7XHJcbiAgLyoqXHJcbiAgICogQSBMaW5rYWJsZVNoYXBlIGlzIGFueSBGYWJyaWMuT2JqZWN0IHNoYXBlIG9uIHdoaWNoIGFuY2hvcnMgYXJlIGFwcGVuZGVkIHNvIHRoYXQgbXVsdGlwbGUgTGluayBjYW4gYmUgY29ubmVjdGVkIHRvIGl0LlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBvcHRpb25zXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0ZhYnJpYy5DYW52YXN9ICAgb3B0aW9ucy5jYW52YXMgLSBGYWJyaWMgY2FudmFzXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG9wdGlvbnMuaWQgLSBVbmlxdWUgaWRlbnRpZmllclxyXG4gICAqXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBpZCxcclxuICAgICAgY2FudmFzLFxyXG4gICAgICBzaGFwZSxcclxuICAgICAgbGVmdCxcclxuICAgICAgdG9wLFxyXG4gICAgICBhbmdsZSxcclxuICAgIH0gPSBvcHRpb25zO1xyXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xyXG5cclxuICAgIC8vIFNldCBzaGFwZVxyXG4gICAgc2hhcGUuc2V0KCd0eXBlJywgJ2xpbmthYmxlU2hhcGUnKTtcclxuICAgIHNoYXBlLnNldCh7XHJcbiAgICAgIGxlZnQsIHRvcCwgaWQsIGFuZ2xlLFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNoYXBlID0gc2hhcGU7XHJcblxyXG4gICAgLy8gU2hvdyBjb29yZGluYXRlcy9hbmdsZSB3aGVuIG1vdmluZy9yb3RhdGluZyBvYmplY3RcclxuICAgIGNvbnN0IG1vZGlmaWNhdGlvbkJveCA9IG5ldyBmYWJyaWMuUmVjdCh7XHJcbiAgICAgIGxlZnQ6IDAsXHJcbiAgICAgIHRvcDogMCxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgc3Ryb2tlOiAnIzY2NicsXHJcbiAgICAgIGZpbGw6ICcjZmZmJyxcclxuICAgICAgd2lkdGg6IDcwLFxyXG4gICAgICBoZWlnaHQ6IDIwLFxyXG4gICAgICB2ZW50ZWQ6IGZhbHNlLFxyXG4gICAgICBzZWxlY3RhYmxlOiBmYWxzZSxcclxuICAgICAgb3BhY2l0eTogMCxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgbW9kaWZpY2F0aW9uVGV4dCA9IG5ldyBmYWJyaWMuVGV4dCgnMCwgMCcsIHtcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIGZvbnRGYW1pbHk6ICdIZWx2ZXRpY2EnLFxyXG4gICAgICBmb250U2l6ZTogMTIsXHJcbiAgICAgIGJvcmRlclN0cm9rZVdpZHRoOiA0LFxyXG4gICAgICBldmVudGVkOiBmYWxzZSxcclxuICAgICAgc2VsZWN0YWJsZTogZmFsc2UsXHJcbiAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IG1vZGlmaWNhdGlvbiA9IHRoaXMubW9kQm94ID0gbmV3IGZhYnJpYy5Hcm91cChbbW9kaWZpY2F0aW9uQm94LCBtb2RpZmljYXRpb25UZXh0XSwge1xyXG4gICAgICBsZWZ0OiAwLFxyXG4gICAgICB0b3A6IDAsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgZXZlbnRlZDogZmFsc2UsXHJcbiAgICAgIHNlbGVjdGFibGU6IGZhbHNlLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBvbk1vdmluZyA9ICgpID0+IHtcclxuICAgICAgY29uc3QgeyB4LCB5IH0gPSBzaGFwZS5hQ29vcmRzLnRsO1xyXG4gICAgICBjb25zdCB4Q29vcmRzID0gW3NoYXBlLmFDb29yZHMudGwueCwgc2hhcGUuYUNvb3Jkcy50ci54LCBzaGFwZS5hQ29vcmRzLmJsLngsIHNoYXBlLmFDb29yZHMuYnIueF07XHJcbiAgICAgIGNvbnN0IHlDb29yZHMgPSBbc2hhcGUuYUNvb3Jkcy50bC55LCBzaGFwZS5hQ29vcmRzLnRyLnksIHNoYXBlLmFDb29yZHMuYmwueSwgc2hhcGUuYUNvb3Jkcy5ici55XTtcclxuICAgICAgbW9kaWZpY2F0aW9uLmxlZnQgPSAoTWF0aC5taW4oLi4ueENvb3JkcykgKyBNYXRoLm1heCguLi54Q29vcmRzKSkgLyAyO1xyXG4gICAgICBtb2RpZmljYXRpb24udG9wID0gTWF0aC5yb3VuZChNYXRoLm1heCguLi55Q29vcmRzKSArIDMwKTtcclxuICAgICAgbW9kaWZpY2F0aW9uLnNldENvb3JkcygpO1xyXG4gICAgICBtb2RpZmljYXRpb25Cb3guc2V0KCdvcGFjaXR5JywgMC43KTtcclxuICAgICAgbW9kaWZpY2F0aW9uVGV4dC5zZXQoJ29wYWNpdHknLCAxKTtcclxuICAgICAgbW9kaWZpY2F0aW9uVGV4dC5zZXQoJ3RleHQnLCBgJHtNYXRoLnJvdW5kKHgpfSwgJHtNYXRoLnJvdW5kKHkpfWApO1xyXG4gICAgICBjYW52YXMuYnJpbmdUb0Zyb250KG1vZGlmaWNhdGlvbik7XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb25Nb3ZlZCA9ICgpID0+IHtcclxuICAgICAgbW9kaWZpY2F0aW9uQm94LnNldCgnb3BhY2l0eScsIDApO1xyXG4gICAgICBtb2RpZmljYXRpb25UZXh0LnNldCgnb3BhY2l0eScsIDApO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IG9uUm90YXRpbmcgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHhDb29yZHMgPSBbc2hhcGUuYUNvb3Jkcy50bC54LCBzaGFwZS5hQ29vcmRzLnRyLngsIHNoYXBlLmFDb29yZHMuYmwueCwgc2hhcGUuYUNvb3Jkcy5ici54XTtcclxuICAgICAgY29uc3QgeUNvb3JkcyA9IFtzaGFwZS5hQ29vcmRzLnRsLnksIHNoYXBlLmFDb29yZHMudHIueSwgc2hhcGUuYUNvb3Jkcy5ibC55LCBzaGFwZS5hQ29vcmRzLmJyLnldO1xyXG4gICAgICBtb2RpZmljYXRpb24ubGVmdCA9IChNYXRoLm1pbiguLi54Q29vcmRzKSArIE1hdGgubWF4KC4uLnhDb29yZHMpKSAvIDI7XHJcbiAgICAgIG1vZGlmaWNhdGlvbi50b3AgPSBNYXRoLnJvdW5kKE1hdGgubWF4KC4uLnlDb29yZHMpICsgMzApO1xyXG4gICAgICBtb2RpZmljYXRpb24uc2V0Q29vcmRzKCk7XHJcbiAgICAgIG1vZGlmaWNhdGlvbkJveC5zZXQoJ29wYWNpdHknLCAwLjcpO1xyXG4gICAgICBtb2RpZmljYXRpb25UZXh0LnNldCgnb3BhY2l0eScsIDEpO1xyXG4gICAgICBtb2RpZmljYXRpb25UZXh0LnNldCgndGV4dCcsIGAke01hdGgucm91bmQoc2hhcGUuYW5nbGUgPiAxODAgPyBzaGFwZS5hbmdsZSAtIDM2MCA6IHNoYXBlLmFuZ2xlKX3CsGApO1xyXG4gICAgICBjYW52YXMuYnJpbmdUb0Zyb250KG1vZGlmaWNhdGlvbik7XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb25Sb3RhdGVkID0gKCkgPT4ge1xyXG4gICAgICBtb2RpZmljYXRpb25Cb3guc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICAgIG1vZGlmaWNhdGlvblRleHQuc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICB9O1xyXG4gICAgc2hhcGUub24oe1xyXG4gICAgICBtb3Zpbmc6IG9uTW92aW5nLFxyXG4gICAgICBtb3ZlZDogb25Nb3ZlZCxcclxuICAgICAgcm90YXRpbmc6IG9uUm90YXRpbmcsXHJcbiAgICAgIHJvdGF0ZWQ6IG9uUm90YXRlZCxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEFuY2hvciBwb2ludHNcclxuICAgIHRoaXMuYW5jaG9ycyA9IHRoaXMuc2hhcGUuYW5jaG9ycyA9IHtcclxuICAgICAgZWFzdDogdGhpcy5fbWFrZUFuY2hvclBvaW50KCdlYXN0JyksXHJcbiAgICAgIHdlc3Q6IHRoaXMuX21ha2VBbmNob3JQb2ludCgnd2VzdCcpLFxyXG4gICAgICAvLyBub3J0aDogdGhpcy5fbWFrZUFuY2hvclBvaW50KCdub3J0aCcpLFxyXG4gICAgICAvLyBzb3V0aDogdGhpcy5fbWFrZUFuY2hvclBvaW50KCdzb3V0aCcpLFxyXG4gICAgICAvLyBub3J0aGVhc3Q6IHRoaXMuX21ha2VBbmNob3JQb2ludCgnbm9ydGhlYXN0JyksXHJcbiAgICAgIC8vIG5vcnRod2VzdDogdGhpcy5fbWFrZUFuY2hvclBvaW50KCdub3J0aHdlc3QnKSxcclxuICAgICAgLy8gc291dGhlYXN0OiB0aGlzLl9tYWtlQW5jaG9yUG9pbnQoJ3NvdXRoZWFzdCcpLFxyXG4gICAgICAvLyBzb3V0aHdlc3Q6IHRoaXMuX21ha2VBbmNob3JQb2ludCgnc291dGh3ZXN0JyksXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEV2ZW50cyByZWxhdGVkIHRvIGFuY2hvcnNcclxuICAgIHNoYXBlLm9uKHtcclxuICAgICAgc2VsZWN0ZWQ6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnRvZ2dsZUFuY2hvcnNPcGFjaXR5KDApO1xyXG4gICAgICB9LFxyXG4gICAgICBtb3VzZW92ZXI6ICgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5jYW52YXMuZ2V0QWN0aXZlT2JqZWN0KCkgIT09IHRoaXMuc2hhcGUpIHtcclxuICAgICAgICAgIHRoaXMudG9nZ2xlQW5jaG9yc09wYWNpdHkoMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBtb3VzZW91dDogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudG9nZ2xlQW5jaG9yc09wYWNpdHkoMCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG1vZGlmeWluZzogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbihmYWxzZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG1vZGlmaWVkOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKHRydWUpO1xyXG4gICAgICB9LFxyXG4gICAgICBtb3Zpbmc6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnJlZnJlc2hBbmNob3JzUG9zaXRpb24oZmFsc2UpO1xyXG4gICAgICB9LFxyXG4gICAgICBtb3ZlZDogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbih0cnVlKTtcclxuICAgICAgfSxcclxuICAgICAgcm90YXRpbmc6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnJlZnJlc2hBbmNob3JzUG9zaXRpb24oZmFsc2UpO1xyXG4gICAgICB9LFxyXG4gICAgICByb3RhdGVkOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKHRydWUpO1xyXG4gICAgICB9LFxyXG4gICAgICBzY2FsaW5nOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKGZhbHNlKTtcclxuICAgICAgfSxcclxuICAgICAgc2NhbGVkOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKHRydWUpO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbmplY3QoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGlkLFxyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHNoYXBlLFxyXG4gICAgICBhbmNob3JzLFxyXG4gICAgICBtb2RCb3gsXHJcbiAgICB9ID0gdGhpcztcclxuICAgIGNhbnZhcy5hZGQoc2hhcGUpO1xyXG4gICAgY2FudmFzLmFkZChtb2RCb3gpO1xyXG4gICAgT2JqZWN0LmtleXMoYW5jaG9ycykuZm9yRWFjaCgoY2FyZGluYWwpID0+IHtcclxuICAgICAgY2FudmFzLmFkZChhbmNob3JzW2NhcmRpbmFsXSk7XHJcbiAgICAgIGNhbnZhcy5icmluZ0ZvcndhcmQoYW5jaG9yc1tjYXJkaW5hbF0sIHRydWUpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnJlZnJlc2hBbmNob3JzUG9zaXRpb24odHJ1ZSk7XHJcblxyXG4gICAgY2FudmFzLmxpbmthYmxlU2hhcGVzW2lkXSA9IHRoaXM7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICByZW1vdmUoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGlkLFxyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHNoYXBlLFxyXG4gICAgICBhbmNob3JzLFxyXG4gICAgICBtb2RCb3gsXHJcbiAgICB9ID0gdGhpcztcclxuICAgIGNhbnZhcy5yZW1vdmUoc2hhcGUpO1xyXG4gICAgY2FudmFzLnJlbW92ZShtb2RCb3gpO1xyXG4gICAgT2JqZWN0LmtleXMoYW5jaG9ycykuZm9yRWFjaCgoY2FyZGluYWwpID0+IHtcclxuICAgICAgY2FudmFzLnJlbW92ZShhbmNob3JzW2NhcmRpbmFsXSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkZWxldGUgY2FudmFzLmxpbmthYmxlU2hhcGVzW2lkXTtcclxuICB9XHJcblxyXG4gIG1vdmUob3B0aW9ucykge1xyXG4gICAgaWYgKG9wdGlvbnMueCkgdGhpcy5zaGFwZS5zZXQoJ2xlZnQnLCBvcHRpb25zLngpO1xyXG4gICAgaWYgKG9wdGlvbnMueSkgdGhpcy5zaGFwZS5zZXQoJ3RvcCcsIG9wdGlvbnMueSk7XHJcbiAgICBpZiAob3B0aW9ucy5vcmlnaW5YKSB0aGlzLnNoYXBlLnNldCgnb3JpZ2luWCcsIG9wdGlvbnMub3JpZ2luWCk7XHJcbiAgICBpZiAob3B0aW9ucy5vcmlnaW5ZKSB0aGlzLnNoYXBlLnNldCgnb3JpZ2luWScsIG9wdGlvbnMub3JpZ2luWSk7XHJcbiAgICB0aGlzLnNoYXBlLnNldENvb3JkcygpO1xyXG4gICAgdGhpcy5yZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKCk7XHJcbiAgICB0aGlzLnNoYXBlLmZpcmUob3B0aW9ucy5tb3ZpbmcgPyAnbW92aW5nJyA6ICdtb3ZlZCcpO1xyXG4gIH1cclxuXHJcbiAgcm90YXRlKGFuZ2xlKSB7XHJcbiAgICB0aGlzLnNoYXBlLnJvdGF0ZShhbmdsZSk7XHJcbiAgICB0aGlzLnNoYXBlLnNldENvb3JkcygpO1xyXG4gICAgdGhpcy5yZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKCk7XHJcbiAgfVxyXG5cclxuICByZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKGNvbW1pdCkge1xyXG4gICAgT2JqZWN0LmtleXModGhpcy5hbmNob3JzKS5mb3JFYWNoKChjYXJkaW5hbCkgPT4ge1xyXG4gICAgICB0aGlzLl9zZXRBbmNob3JQb3NpdGlvblJlbGF0aXZlVG9SZWN0YW5nbGUoY2FyZGluYWwsIGNvbW1pdCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUFuY2hvcnNPcGFjaXR5KG9wYWNpdHkpIHtcclxuICAgIE9iamVjdC5rZXlzKHRoaXMuYW5jaG9ycykuZm9yRWFjaCgoY2FyZGluYWwpID0+IHtcclxuICAgICAgdGhpcy5hbmNob3JzW2NhcmRpbmFsXS50b2dnbGVPcGFjaXR5KG9wYWNpdHkpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBicmluZ1RvRnJvbnQoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGNhbnZhcywgc2hhcGUsIG1vZEJveCwgYW5jaG9ycyxcclxuICAgIH0gPSB0aGlzO1xyXG4gICAgc2hhcGUuYnJpbmdUb0Zyb250KCk7XHJcbiAgICBtb2RCb3guYnJpbmdUb0Zyb250KCk7XHJcbiAgICBPYmplY3Qua2V5cyhhbmNob3JzKS5mb3JFYWNoKChjYXJkaW5hbCkgPT4ge1xyXG4gICAgICBjYW52YXMuYnJpbmdUb0Zyb250KGFuY2hvcnNbY2FyZGluYWxdKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgX3NldEFuY2hvclBvc2l0aW9uUmVsYXRpdmVUb1JlY3RhbmdsZShjYXJkaW5hbCwgY29tbWl0KSB7XHJcbiAgICBsZXQgbGVmdDtcclxuICAgIGxldCB0b3A7XHJcbiAgICBjb25zdCB7IHNoYXBlIH0gPSB0aGlzO1xyXG4gICAgY29uc3QgYXAgPSB0aGlzLmFuY2hvcnNbY2FyZGluYWxdO1xyXG4gICAgc3dpdGNoIChjYXJkaW5hbCkge1xyXG4gICAgICBjYXNlICdlYXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSAoc2hhcGUuYUNvb3Jkcy50ci54ICsgc2hhcGUuYUNvb3Jkcy5ici54KSAvIDI7XHJcbiAgICAgICAgdG9wID0gKHNoYXBlLmFDb29yZHMudHIueSArIHNoYXBlLmFDb29yZHMuYnIueSkgLyAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3dlc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IChzaGFwZS5hQ29vcmRzLnRsLnggKyBzaGFwZS5hQ29vcmRzLmJsLngpIC8gMjtcclxuICAgICAgICB0b3AgPSAoc2hhcGUuYUNvb3Jkcy50bC55ICsgc2hhcGUuYUNvb3Jkcy5ibC55KSAvIDI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnbm9ydGgnOiB7XHJcbiAgICAgICAgbGVmdCA9IChzaGFwZS5hQ29vcmRzLnRsLnggKyBzaGFwZS5hQ29vcmRzLnRyLngpIC8gMjtcclxuICAgICAgICB0b3AgPSAoc2hhcGUuYUNvb3Jkcy50bC55ICsgc2hhcGUuYUNvb3Jkcy50ci55KSAvIDI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnc291dGgnOiB7XHJcbiAgICAgICAgbGVmdCA9IChzaGFwZS5hQ29vcmRzLmJsLnggKyBzaGFwZS5hQ29vcmRzLmJyLngpIC8gMjtcclxuICAgICAgICB0b3AgPSAoc2hhcGUuYUNvb3Jkcy5ibC55ICsgc2hhcGUuYUNvb3Jkcy5ici55KSAvIDI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnbm9ydGhlYXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSBzaGFwZS5hQ29vcmRzLnRyLng7XHJcbiAgICAgICAgdG9wID0gc2hhcGUuYUNvb3Jkcy50ci55O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRod2VzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gc2hhcGUuYUNvb3Jkcy50bC54O1xyXG4gICAgICAgIHRvcCA9IHNoYXBlLmFDb29yZHMudGwueTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aGVhc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IHNoYXBlLmFDb29yZHMuYnIueDtcclxuICAgICAgICB0b3AgPSBzaGFwZS5hQ29vcmRzLmJyLnk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnc291dGh3ZXN0JzpcclxuICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgIGxlZnQgPSBzaGFwZS5hQ29vcmRzLmJsLng7XHJcbiAgICAgICAgdG9wID0gc2hhcGUuYUNvb3Jkcy5ibC55O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBhcC5sZWZ0ID0gbGVmdDtcclxuICAgIGFwLnRvcCA9IHRvcDtcclxuICAgIGFwLnNldENvb3JkcygpO1xyXG5cclxuICAgIGFwLmZpcmUoY29tbWl0ID8gJ3BnOnBvc2l0aW9uOm1vZGlmaWVkJyA6ICdwZzpwb3NpdGlvbjptb2RpZnlpbmcnKTtcclxuICB9XHJcblxyXG4gIF9tYWtlQW5jaG9yUG9pbnQoY2FyZGluYWwpIHtcclxuICAgIGxldCBsZWZ0O1xyXG4gICAgbGV0IHRvcDtcclxuICAgIGNvbnN0IHtcclxuICAgICAgc2hhcGUsXHJcbiAgICAgIGlkLFxyXG4gICAgfSA9IHRoaXM7XHJcbiAgICBzd2l0Y2ggKGNhcmRpbmFsKSB7XHJcbiAgICAgIGNhc2UgJ2Vhc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IChzaGFwZS5hQ29vcmRzLnRyLnggKyBzaGFwZS5hQ29vcmRzLmJyLngpIC8gMjtcclxuICAgICAgICB0b3AgPSAoc2hhcGUuYUNvb3Jkcy50ci55ICsgc2hhcGUuYUNvb3Jkcy5ici55KSAvIDI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnd2VzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMudGwueCArIHNoYXBlLmFDb29yZHMuYmwueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLnRsLnkgKyBzaGFwZS5hQ29vcmRzLmJsLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMudGwueCArIHNoYXBlLmFDb29yZHMudHIueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLnRsLnkgKyBzaGFwZS5hQ29vcmRzLnRyLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMuYmwueCArIHNoYXBlLmFDb29yZHMuYnIueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLmJsLnkgKyBzaGFwZS5hQ29vcmRzLmJyLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aGVhc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IHNoYXBlLmFDb29yZHMudHIueDtcclxuICAgICAgICB0b3AgPSBzaGFwZS5hQ29vcmRzLnRyLnk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnbm9ydGh3ZXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSBzaGFwZS5hQ29vcmRzLnRsLng7XHJcbiAgICAgICAgdG9wID0gc2hhcGUuYUNvb3Jkcy50bC55O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRoZWFzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gc2hhcGUuYUNvb3Jkcy5ici54O1xyXG4gICAgICAgIHRvcCA9IHNoYXBlLmFDb29yZHMuYnIueTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aHdlc3QnOlxyXG4gICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgbGVmdCA9IHNoYXBlLmFDb29yZHMuYmwueDtcclxuICAgICAgICB0b3AgPSBzaGFwZS5hQ29vcmRzLmJsLnk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhcCA9IG5ldyBmYWJyaWMuQ2lyY2xlKHtcclxuICAgICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAgIGxlZnQsXHJcbiAgICAgIHRvcCxcclxuICAgICAgc3Ryb2tlV2lkdGg6IDIsXHJcbiAgICAgIHJhZGl1czogNixcclxuICAgICAgZmlsbDogJyM3OGJlZmEnLCAvLyA0MmEyZGEgZDVlOGYyXHJcbiAgICAgIHN0cm9rZTogJyM3OGJlZmEnLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAgIHNlbGVjdGFibGU6IGZhbHNlLFxyXG4gICAgICBvcGFjaXR5OiAwLFxyXG4gICAgICBpZDogYCR7aWR9XyR7Y2FyZGluYWx9YCxcclxuICAgIH0pO1xyXG4gICAgYXAudHlwZSA9ICdhbmNob3InO1xyXG4gICAgYXAuc2hhcGVJZCA9IGlkO1xyXG4gICAgYXAuY2FyZGluYWwgPSBjYXJkaW5hbDtcclxuICAgIGFwLm9uKCdtb3VzZW92ZXInLCAoKSA9PiB7XHJcbiAgICAgIGFwLnRvZ2dsZU9wYWNpdHkoMSk7XHJcbiAgICB9KTtcclxuICAgIGFwLm9uKCdtb3VzZW91dCcsICgpID0+IHtcclxuICAgICAgYXAudG9nZ2xlT3BhY2l0eSgwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGFwLm9uKCdtb3VzZWRvd24nLCAob3B0aW9ucykgPT4ge1xyXG4gICAgICBzd2l0Y2ggKG9wdGlvbnMuYnV0dG9uKSB7XHJcbiAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgdGhpcy5fb25BbmNob3JSaWdodENsaWNrLmNhbGwodGhpcywgb3B0aW9ucyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICB0aGlzLl9vbkFuY2hvck1pZGRsZUNsaWNrLmNhbGwodGhpcywgb3B0aW9ucyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIHRoaXMuX29uQW5jaG9yTGVmdENsaWNrLmNhbGwodGhpcywgb3B0aW9ucyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gYXA7XHJcbiAgfVxyXG5cclxuICAvLyBTaG91bGQgYmUgaW1wbGVtZW50ZWQgYnkgRXh0ZW5kaW5nIENsYXNzZXNcclxuICAvKiBlc2xpbnQtZGlzYWJsZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzICovXHJcbiAgX29uQW5jaG9yTGVmdENsaWNrKC8qIG9wdGlvbnMgKi8pIHt9XHJcblxyXG4gIF9vbkFuY2hvck1pZGRsZUNsaWNrKC8qIG9wdGlvbnMgKi8pIHt9XHJcblxyXG4gIF9vbkFuY2hvclJpZ2h0Q2xpY2soLyogb3B0aW9ucyAqLykge31cclxuXHJcbiAgLyogZXNsaW50LWRpc2FibGUgY2xhc3MtbWV0aG9kcy11c2UtdGhpcyAqL1xyXG59XHJcbiIsImNvbnN0IHsgZmFicmljIH0gPSB3aW5kb3c7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9jZXNzR3JhcGgge1xyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQHBhcmFtIG9wdGlvbnNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Q2FudmFzfSBvcHRpb25zLmNhbnZhcyAtIEZhYnJpY0pTLkNhbnZhcyBpbnN0YW5jZSAtIG1hbmRhdG9yeSBpZiBvcHRpb25zLmNhbnZhc09wdHMgbm90IHByb3ZpZGVkLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuY2FudmFzT3B0cyAtIEZhYnJpY0pTLkNhbnZhcyNpbml0aWFsaXplIHBhcmFtZXRlcnMgLSBtYW5kYXRvcnkgaWYgb3B0aW9ucy5jYW52YXMgbm90IHByb3ZpZGVkXHJcbiAgICogICAgICAgICAgICAgICAgIFNlZSBodHRwOi8vZmFicmljanMuY29tL2RvY3MvZmFicmljLkNhbnZhcy5odG1sI2luaXRpYWxpemUgZm9yIGRldGFpbHNcclxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fFN0cmluZ30gb3B0aW9ucy5jYW52YXMuZWwgLSA8Y2FudmFzPiBlbGVtZW50IHRvIGluaXRpYWxpemUgaW5zdGFuY2Ugb25cclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5jYW52YXMub3B0aW9ucyAtIE9wdGlvbnMgb2JqZWN0XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZ3JpZF0gLSBkaW1lbnNpb25zIG9mIHRoZSBncmlkXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgdGhpcy5oYW5kbGVycyA9IHtcclxuICAgICAgZ3JpZDoge30sXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEluaXRpYWxpemUgQ2FudmFzXHJcbiAgICBjb25zdCBjYW52YXMgPSB0aGlzLmNhbnZhcyA9IG9wdGlvbnMuY2FudmFzID8gb3B0aW9ucy5jYW52YXMgOiBuZXcgZmFicmljLkNhbnZhcyhvcHRpb25zLmNhbnZhc09wdHMuZWwsIG9wdGlvbnMuY2FudmFzT3B0cy5vcHRpb25zKTtcclxuICAgIGNhbnZhcy5zZXQoJ3ByZXNlcnZlT2JqZWN0U3RhY2tpbmcnLCB0cnVlKTtcclxuICAgIC8vIGNhbnZhcy5zZXQoJ3JlbmRlck9uQWRkUmVtb3ZlJywgZmFsc2UpO1xyXG4gICAgY2FudmFzLnNldCgnZmlyZVJpZ2h0Q2xpY2snLCB0cnVlKTtcclxuICAgIGNhbnZhcy5zZXQoJ2ZpcmVNaWRkbGVDbGljaycsIHRydWUpO1xyXG4gICAgY2FudmFzLnNldCgnc3RvcENvbnRleHRNZW51JywgdHJ1ZSk7XHJcbiAgICBjYW52YXMubGlua2FibGVTaGFwZXMgPSB7fTtcclxuICAgIGNhbnZhcy5saW5rID0ge307XHJcblxyXG4gICAgLy8gU2V0IGdyaWRcclxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5ncmlkID09PSAnbnVtYmVyJykge1xyXG4gICAgICB0aGlzLnNldEdyaWQoe1xyXG4gICAgICAgIGdyaWQ6IG9wdGlvbnMuZ3JpZCxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZmFicmljLk9iamVjdC5wcm90b3R5cGUub3JpZ2luWCA9IGZhYnJpYy5PYmplY3QucHJvdG90eXBlLm9yaWdpblkgPSAnY2VudGVyJztcclxuICAgIGZhYnJpYy5PYmplY3QucHJvdG90eXBlLnRvZ2dsZU9wYWNpdHkgPSBmdW5jdGlvbiB0b2dnbGVPcGFjaXR5KG9wYWNpdHkvKiAsIHRpbWVvdXQgKi8pIHtcclxuICAgICAgLy8gdGhpcy5hbmltYXRlKCdvcGFjaXR5Jywgb3BhY2l0eSwge1xyXG4gICAgICAvLyAgIGR1cmF0aW9uOiB0aW1lb3V0ICE9PSB1bmRlZmluZWQgPyB0aW1lb3V0IDogMzAwLFxyXG4gICAgICAvLyAgIG9uQ2hhbmdlOiB0aGlzLmNhbnZhcy5yZW5kZXJBbGwuYmluZCh0aGlzLmNhbnZhcyksXHJcbiAgICAgIC8vIH0pO1xyXG4gICAgICB0aGlzLnNldCgnb3BhY2l0eScsIG9wYWNpdHkpO1xyXG4gICAgICB0aGlzLmNhbnZhcy5yZW5kZXJBbGwoKTtcclxuICAgIH07XHJcblxyXG4gICAgY2FudmFzLmNhbGNPZmZzZXQoKTtcclxuXHJcbiAgICAvLyBQcmV2ZW50IG5vbiBMaW5rYWJsZVNoYXBlIG9iamVjdHMgdG8gYmUgZ3JvdXBlZCBkdXJpbmcgc2VsZWN0aW9uXHJcbiAgICBjb25zdCBvblNlbGVjdGlvbiA9ICgpID0+IHtcclxuICAgICAgY29uc3QgYWN0aXZlID0gY2FudmFzLmdldEFjdGl2ZU9iamVjdCgpO1xyXG4gICAgICAvLyBXaGVuIG11bHRpIHNlbGVjdGlvbiwgcmVtb3ZlIGFueSBub24gTGlua2FibGUgU2hhcGUgb2JqZWN0c1xyXG4gICAgICBpZiAoYWN0aXZlLnR5cGUgPT09ICdhY3RpdmVTZWxlY3Rpb24nKSB7XHJcbiAgICAgICAgY29uc3Qgb2JqZWN0cyA9IGFjdGl2ZS5nZXRPYmplY3RzKCk7XHJcbiAgICAgICAgaWYgKG9iamVjdHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgY29uc3Qgb25seVJlY3QgPSBvYmplY3RzLmZpbHRlcigobykgPT4gby50eXBlID09PSAnbGlua2FibGVTaGFwZScpO1xyXG4gICAgICAgICAgY2FudmFzLl9kaXNjYXJkQWN0aXZlT2JqZWN0KCk7XHJcbiAgICAgICAgICBjb25zdCBzZWwgPSBuZXcgZmFicmljLkFjdGl2ZVNlbGVjdGlvbihvbmx5UmVjdCwge1xyXG4gICAgICAgICAgICBjYW52YXMsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGNhbnZhcy5fc2V0QWN0aXZlT2JqZWN0KHNlbCk7XHJcblxyXG4gICAgICAgICAgLy8gVXBkYXRlIGFueSBsaW5rcyBjb25uZWN0ZWQgdG8gdGhlIExpbmthYmxlIFNoYXBlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNhbnZhcy5vbih7XHJcbiAgICAgICdzZWxlY3Rpb246Y3JlYXRlZCc6IG9uU2VsZWN0aW9uLFxyXG4gICAgICAnc2VsZWN0aW9uOnVwZGF0ZWQnOiBvblNlbGVjdGlvbixcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IGNhbnZhcyB0byBoYXZlIGEgZ3JpZC5cclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLmdyaWQgLSBncmlkIHNwYWNpbmcgKHBpeGVscylcclxuICAgKi9cclxuICBzZXRHcmlkKG9wdGlvbnMpIHtcclxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5ncmlkICE9PSAnbnVtYmVyJyB8fCBvcHRpb25zLmdyaWQgPCAwKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudCBcImdyaWRcIiBpbiBQcm9jZXNzR3JhcCNzZXRHcmlkLiAocmVxdWlyZWQ6IE51bWJlciA+IDApJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5ncmlkID0gb3B0aW9ucy5ncmlkO1xyXG4gICAgY29uc3QgeyBjYW52YXMgfSA9IHRoaXM7XHJcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1tdWx0aS1zdHIgKi9cclxuICAgIGNvbnN0IGRhdGEgPSBgPHN2ZyB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPiBcXFxyXG4gICAgICAgIDxkZWZzPiBcXFxyXG4gICAgICAgICAgICA8cGF0dGVybiBpZD1cInNtYWxsR3JpZFwiIHdpZHRoPVwiJHt0aGlzLmdyaWR9XCIgaGVpZ2h0PVwiJHt0aGlzLmdyaWR9XCIgcGF0dGVyblVuaXRzPVwidXNlclNwYWNlT25Vc2VcIj4gXFxcclxuICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNICR7dGhpcy5ncmlkfSAwIEwgMCAwIDAgJHt0aGlzLmdyaWR9XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJncmF5XCIgc3Ryb2tlLXdpZHRoPVwiMC41XCIgLz4gXFxcclxuICAgICAgICAgICAgPC9wYXR0ZXJuPiBcXFxyXG4gICAgICAgICAgICA8cGF0dGVybiBpZD1cImdyaWRcIiB3aWR0aD1cIiR7dGhpcy5ncmlkICogNX1cIiBoZWlnaHQ9XCIke3RoaXMuZ3JpZCAqIDV9XCIgcGF0dGVyblVuaXRzPVwidXNlclNwYWNlT25Vc2VcIj4gXFxcclxuICAgICAgICAgICAgICAgIDxyZWN0IHdpZHRoPVwiJHt0aGlzLmdyaWQgKiA1fVwiIGhlaWdodD1cIiR7dGhpcy5ncmlkICogNX1cIiBmaWxsPVwidXJsKCNzbWFsbEdyaWQpXCIgLz4gXFxcclxuICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNICR7dGhpcy5ncmlkICogNX0gMCBMIDAgMCAwICR7dGhpcy5ncmlkICogNX1cIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImdyYXlcIiBzdHJva2Utd2lkdGg9XCIxXCIgLz4gXFxcclxuICAgICAgICAgICAgPC9wYXR0ZXJuPiBcXFxyXG4gICAgICAgIDwvZGVmcz4gXFxcclxuICAgICAgICA8cmVjdCB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgZmlsbD1cInVybCgjZ3JpZClcIiAvPiBcXFxyXG4gICAgPC9zdmc+YDtcclxuICAgIC8qIGVzbGludC1lbmFibGUgbm8tbXVsdGktc3RyICovXHJcblxyXG4gICAgY29uc3QgRE9NVVJMID0gd2luZG93LlVSTCB8fCB3aW5kb3cud2Via2l0VVJMIHx8IHdpbmRvdztcclxuICAgIGNvbnN0IHN2ZyA9IG5ldyBCbG9iKFtkYXRhXSwgeyB0eXBlOiAnaW1hZ2Uvc3ZnK3htbDtjaGFyc2V0PXV0Zi04JyB9KTtcclxuICAgIGNvbnN0IHVybCA9IERPTVVSTC5jcmVhdGVPYmplY3RVUkwoc3ZnKTtcclxuICAgIGZhYnJpYy51dGlsLmxvYWRJbWFnZSh1cmwsIChpbWcpID0+IHtcclxuICAgICAgY29uc3QgYmcgPSBuZXcgZmFicmljLlJlY3Qoe1xyXG4gICAgICAgIHdpZHRoOiBjYW52YXMud2lkdGgsIGhlaWdodDogY2FudmFzLmhlaWdodCwgZXZlbnRlZDogZmFsc2UsIHNlbGVjdGFibGU6IGZhbHNlLFxyXG4gICAgICB9KTtcclxuICAgICAgYmcuZmlsbCA9IG5ldyBmYWJyaWMuUGF0dGVybih7IHNvdXJjZTogaW1nIH0sXHJcbiAgICAgICAgKCgpID0+IHsgYmcuZGlydHkgPSB0cnVlOyBjYW52YXMucmVxdWVzdFJlbmRlckFsbCgpOyB9KSk7XHJcbiAgICAgIGJnLmNhbnZhcyA9IGNhbnZhcztcclxuICAgICAgY2FudmFzLnNldCgnYmFja2dyb3VuZEltYWdlJywgYmcpO1xyXG5cclxuICAgICAgLy8gU25hcCB0byBncmlkIGVmZmVjdHNcclxuICAgICAgY2FudmFzLm9mZih0aGlzLmhhbmRsZXJzLmdyaWQpO1xyXG4gICAgICB0aGlzLmhhbmRsZXJzLmdyaWQgPSB7XHJcbiAgICAgICAgJ29iamVjdDptb3ZpbmcnOiAoZXZlbnQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHsgZ3JpZCB9ID0gdGhpcztcclxuICAgICAgICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBldmVudDtcclxuICAgICAgICAgIGlmICh0YXJnZXQudHlwZSAhPT0gJ2xpbmthYmxlU2hhcGUnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGV2ZW50LnRhcmdldC5zZXQoe1xyXG4gICAgICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKGV2ZW50LnRhcmdldC5sZWZ0IC8gZ3JpZCkgKiBncmlkLFxyXG4gICAgICAgICAgICB0b3A6IE1hdGgucm91bmQoZXZlbnQudGFyZ2V0LnRvcCAvIGdyaWQpICogZ3JpZCxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJ29iamVjdDpzY2FsaW5nJzogKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB7IGdyaWQgfSA9IHRoaXM7XHJcbiAgICAgICAgICBjb25zdCB7IHRhcmdldCB9ID0gZXZlbnQ7XHJcblxyXG4gICAgICAgICAgaWYgKHRhcmdldC50eXBlICE9PSAnbGlua2FibGVTaGFwZScpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnN0IHcgPSB0YXJnZXQud2lkdGggKiB0YXJnZXQuc2NhbGVYO1xyXG4gICAgICAgICAgY29uc3QgaCA9IHRhcmdldC5oZWlnaHQgKiB0YXJnZXQuc2NhbGVZO1xyXG4gICAgICAgICAgY29uc3Qgc25hcCA9IHsgLy8gQ2xvc2VzdCBzbmFwcGluZyBwb2ludHNcclxuICAgICAgICAgICAgdG9wOiBNYXRoLnJvdW5kKHRhcmdldC50b3AgLyBncmlkKSAqIGdyaWQsXHJcbiAgICAgICAgICAgIGxlZnQ6IE1hdGgucm91bmQodGFyZ2V0LmxlZnQgLyBncmlkKSAqIGdyaWQsXHJcbiAgICAgICAgICAgIGJvdHRvbTogTWF0aC5yb3VuZCgodGFyZ2V0LnRvcCArIGgpIC8gZ3JpZCkgKiBncmlkLFxyXG4gICAgICAgICAgICByaWdodDogTWF0aC5yb3VuZCgodGFyZ2V0LmxlZnQgKyB3KSAvIGdyaWQpICogZ3JpZCxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBjb25zdCB0aHJlc2hvbGQgPSBncmlkO1xyXG4gICAgICAgICAgY29uc3QgZGlzdCA9IHsgLy8gRGlzdGFuY2UgZnJvbSBzbmFwcGluZyBwb2ludHNcclxuICAgICAgICAgICAgdG9wOiBNYXRoLmFicyhzbmFwLnRvcCAtIHRhcmdldC50b3ApLFxyXG4gICAgICAgICAgICBsZWZ0OiBNYXRoLmFicyhzbmFwLmxlZnQgLSB0YXJnZXQubGVmdCksXHJcbiAgICAgICAgICAgIGJvdHRvbTogTWF0aC5hYnMoc25hcC5ib3R0b20gLSB0YXJnZXQudG9wIC0gaCksXHJcbiAgICAgICAgICAgIHJpZ2h0OiBNYXRoLmFicyhzbmFwLnJpZ2h0IC0gdGFyZ2V0LmxlZnQgLSB3KSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBjb25zdCBhdHRycyA9IHtcclxuICAgICAgICAgICAgc2NhbGVYOiB0YXJnZXQuc2NhbGVYLFxyXG4gICAgICAgICAgICBzY2FsZVk6IHRhcmdldC5zY2FsZVksXHJcbiAgICAgICAgICAgIHRvcDogdGFyZ2V0LnRvcCxcclxuICAgICAgICAgICAgbGVmdDogdGFyZ2V0LmxlZnQsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgc3dpdGNoICh0YXJnZXQuX19jb3JuZXIpIHtcclxuICAgICAgICAgICAgY2FzZSAndGwnOlxyXG4gICAgICAgICAgICAgIGlmIChkaXN0LmxlZnQgPCBkaXN0LnRvcCAmJiBkaXN0LmxlZnQgPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWCA9ICh3IC0gKHNuYXAubGVmdCAtIHRhcmdldC5sZWZ0KSkgLyB0YXJnZXQud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoYXR0cnMuc2NhbGVYIC8gdGFyZ2V0LnNjYWxlWCkgKiB0YXJnZXQuc2NhbGVZO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMudG9wID0gdGFyZ2V0LnRvcCArIChoIC0gdGFyZ2V0LmhlaWdodCAqIGF0dHJzLnNjYWxlWSk7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5sZWZ0ID0gc25hcC5sZWZ0O1xyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlzdC50b3AgPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWSA9IChoIC0gKHNuYXAudG9wIC0gdGFyZ2V0LnRvcCkpIC8gdGFyZ2V0LmhlaWdodDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWCA9IChhdHRycy5zY2FsZVkgLyB0YXJnZXQuc2NhbGVZKSAqIHRhcmdldC5zY2FsZVg7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5sZWZ0ICs9ICh3IC0gdGFyZ2V0LndpZHRoICogYXR0cnMuc2NhbGVYKTtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnRvcCA9IHNuYXAudG9wO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbXQnOlxyXG4gICAgICAgICAgICAgIGlmIChkaXN0LnRvcCA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVZID0gKGggLSAoc25hcC50b3AgLSB0YXJnZXQudG9wKSkgLyB0YXJnZXQuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgYXR0cnMudG9wID0gc25hcC50b3A7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd0cic6XHJcbiAgICAgICAgICAgICAgaWYgKGRpc3QucmlnaHQgPCBkaXN0LnRvcCAmJiBkaXN0LnJpZ2h0IDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVggPSAoc25hcC5yaWdodCAtIHRhcmdldC5sZWZ0KSAvIHRhcmdldC53aWR0aDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWSA9IChhdHRycy5zY2FsZVggLyB0YXJnZXQuc2NhbGVYKSAqIHRhcmdldC5zY2FsZVk7XHJcbiAgICAgICAgICAgICAgICBhdHRycy50b3AgPSB0YXJnZXQudG9wICsgKGggLSB0YXJnZXQuaGVpZ2h0ICogYXR0cnMuc2NhbGVZKTtcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRpc3QudG9wIDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoaCAtIChzbmFwLnRvcCAtIHRhcmdldC50b3ApKSAvIHRhcmdldC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVggPSAoYXR0cnMuc2NhbGVZIC8gdGFyZ2V0LnNjYWxlWSkgKiB0YXJnZXQuc2NhbGVYO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMudG9wID0gc25hcC50b3A7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtbCc6XHJcbiAgICAgICAgICAgICAgaWYgKGRpc3QubGVmdCA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVYID0gKHcgLSAoc25hcC5sZWZ0IC0gdGFyZ2V0LmxlZnQpKSAvIHRhcmdldC53aWR0aDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLmxlZnQgPSBzbmFwLmxlZnQ7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtcic6XHJcbiAgICAgICAgICAgICAgaWYgKGRpc3QucmlnaHQgPCB0aHJlc2hvbGQpIGF0dHJzLnNjYWxlWCA9IChzbmFwLnJpZ2h0IC0gdGFyZ2V0LmxlZnQpIC8gdGFyZ2V0LndpZHRoO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdibCc6XHJcbiAgICAgICAgICAgICAgaWYgKGRpc3QubGVmdCA8IGRpc3QuYm90dG9tICYmIGRpc3QubGVmdCA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVYID0gKHcgLSAoc25hcC5sZWZ0IC0gdGFyZ2V0LmxlZnQpKSAvIHRhcmdldC53aWR0aDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWSA9IChhdHRycy5zY2FsZVggLyB0YXJnZXQuc2NhbGVYKSAqIHRhcmdldC5zY2FsZVk7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5sZWZ0ID0gc25hcC5sZWZ0O1xyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlzdC5ib3R0b20gPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWSA9IChzbmFwLmJvdHRvbSAtIHRhcmdldC50b3ApIC8gdGFyZ2V0LmhlaWdodDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWCA9IChhdHRycy5zY2FsZVkgLyB0YXJnZXQuc2NhbGVZKSAqIHRhcmdldC5zY2FsZVg7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5sZWZ0ICs9ICh3IC0gdGFyZ2V0LndpZHRoICogYXR0cnMuc2NhbGVYKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ21iJzpcclxuICAgICAgICAgICAgICBpZiAoZGlzdC5ib3R0b20gPCB0aHJlc2hvbGQpIGF0dHJzLnNjYWxlWSA9IChzbmFwLmJvdHRvbSAtIHRhcmdldC50b3ApIC8gdGFyZ2V0LmhlaWdodDtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYnInOlxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgIGlmIChkaXN0LnJpZ2h0IDwgZGlzdC5ib3R0b20gJiYgZGlzdC5yaWdodCA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVYID0gKHNuYXAucmlnaHQgLSB0YXJnZXQubGVmdCkgLyB0YXJnZXQud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoYXR0cnMuc2NhbGVYIC8gdGFyZ2V0LnNjYWxlWCkgKiB0YXJnZXQuc2NhbGVZO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlzdC5ib3R0b20gPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWSA9IChzbmFwLmJvdHRvbSAtIHRhcmdldC50b3ApIC8gdGFyZ2V0LmhlaWdodDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWCA9IChhdHRycy5zY2FsZVkgLyB0YXJnZXQuc2NhbGVZKSAqIHRhcmdldC5zY2FsZVg7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGFyZ2V0LnNldChhdHRycyk7XHJcbiAgICAgICAgICB0YXJnZXQuc2V0Q29vcmRzKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfTtcclxuICAgICAgaWYgKHRoaXMuZ3JpZCA+IDApIHtcclxuICAgICAgICBjYW52YXMub24odGhpcy5oYW5kbGVycy5ncmlkKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
