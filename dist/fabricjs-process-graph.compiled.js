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
                  moving: false,
                  skipCollision: true
                });
              }
            }
          }
        }

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
      var canvas = this.canvas,
          shape = this.shape; // Prevent LinkableShape to overlap with each other

      var left = options.x || shape.left;
      var top = options.y || shape.top;
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

      this.shape.set('left', left);
      this.shape.set('top', top);
      this.shape.setCoords();
      this.refreshAnchorsPosition();
      this.shape.fire(options.moving ? 'moving' : 'moved');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsInNyYy9Db250YWluZXIuanMiLCJzcmMvQ3VydmVkTGluay5qcyIsInNyYy9FeHBhbmRhYmxlQ29udGFpbmVyLmpzIiwic3JjL0xpbmsuanMiLCJzcmMvTGlua2FibGVTaGFwZS5qcyIsInNyYy9Qcm9jZXNzR3JhcGguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOztBQUVBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7O0FBRUEsTUFBTSxDQUFDLEVBQVAsR0FBWTtBQUNWLEVBQUEsWUFBWSxFQUFaLHdCQURVO0FBRVYsRUFBQSxhQUFhLEVBQWIseUJBRlU7QUFHVixFQUFBLFNBQVMsRUFBVCxxQkFIVTtBQUlWLEVBQUEsbUJBQW1CLEVBQW5CLCtCQUpVO0FBS1YsRUFBQSxJQUFJLEVBQUosZ0JBTFU7QUFNVixFQUFBLFVBQVUsRUFBVjtBQU5VLENBQVo7Ozs7Ozs7Ozs7OztBQ1RBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxjQUFzQixNQUF0QjtBQUFBLElBQVEsTUFBUixXQUFRLE1BQVI7QUFBQSxJQUFnQixDQUFoQixXQUFnQixDQUFoQjs7SUFFcUIsUzs7Ozs7QUFDbkI7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRSxxQkFBWSxPQUFaLEVBQXFCO0FBQUE7O0FBQUE7O0FBQ25CLFFBQU0sSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLElBQVgsQ0FBZ0I7QUFDM0IsTUFBQSxJQUFJLEVBQUUsQ0FEcUI7QUFFM0IsTUFBQSxHQUFHLEVBQUUsQ0FGc0I7QUFHM0IsTUFBQSxPQUFPLEVBQUUsTUFIa0I7QUFJM0IsTUFBQSxPQUFPLEVBQUUsS0FKa0I7QUFLM0IsTUFBQSxXQUFXLEVBQUUsQ0FMYztBQU0zQixNQUFBLE1BQU0sRUFBRSxNQU5tQjtBQU8zQixNQUFBLElBQUksRUFB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YyxNQUFNLENBQUMsR0FBdEIsSUFBNkIsTUFBTSxDQUFDLE1BQW5EO0FBQ0Esa0JBQUEsS0FBSyxDQUFDLE1BQU4sR0FBZ0IsS0FBSyxDQUFDLE1BQU4sR0FBZSxNQUFNLENBQUMsTUFBdkIsR0FBaUMsTUFBTSxDQUFDLE1BQXZEO0FBQ0Q7O0FBQ0Q7QUEvREo7O0FBaUVBLFlBQUEsTUFBTSxDQUFDLEdBQVAsQ0FBVyxLQUFYO0FBQ0EsWUFBQSxNQUFNLENBQUMsU0FBUDtBQUNEO0FBOUdrQixTQUFyQjs7QUFnSEEsWUFBSSxLQUFJLENBQUMsSUFBTCxHQUFZLENBQWhCLEVBQW1CO0FBQ2pCLFVBQUEsTUFBTSxDQUFDLEVBQVAsQ0FBVSxLQUFJLENBQUMsUUFBTCxDQUFjLElBQXhCO0FBQ0Q7QUFDRixPQTlIRDtBQStIRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBQcm9jZXNzR3JhcGggZnJvbSAnLi9zcmMvUHJvY2Vzc0dyYXBoLmpzJztcclxuXHJcbmltcG9ydCBMaW5rYWJsZVNoYXBlIGZyb20gJy4vc3JjL0xpbmthYmxlU2hhcGUuanMnO1xyXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gJy4vc3JjL0NvbnRhaW5lci5qcyc7XHJcbmltcG9ydCBFeHBhbmRhYmxlQ29udGFpbmVyIGZyb20gJy4vc3JjL0V4cGFuZGFibGVDb250YWluZXIuanMnO1xyXG5cclxuaW1wb3J0IExpbmsgZnJvbSAnLi9zcmMvTGluay5qcyc7XHJcbmltcG9ydCBDdXJ2ZWRMaW5rIGZyb20gJy4vc3JjL0N1cnZlZExpbmsuanMnO1xyXG5cclxud2luZG93LnBnID0ge1xyXG4gIFByb2Nlc3NHcmFwaCxcclxuICBMaW5rYWJsZVNoYXBlLFxyXG4gIENvbnRhaW5lcixcclxuICBFeHBhbmRhYmxlQ29udGFpbmVyLFxyXG4gIExpbmssXHJcbiAgQ3VydmVkTGluayxcclxufTtcclxuIiwiaW1wb3J0IExpbmthYmxlU2hhcGUgZnJvbSAnLi9MaW5rYWJsZVNoYXBlLmpzJztcclxuaW1wb3J0IEN1cnZlZExpbmsgZnJvbSAnLi9DdXJ2ZWRMaW5rLmpzJztcclxuXHJcbmNvbnN0IHsgZmFicmljLCBfIH0gPSB3aW5kb3c7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250YWluZXIgZXh0ZW5kcyBMaW5rYWJsZVNoYXBlIHtcclxuICAvKipcclxuICAgKiBBIENvbnRhaW5lciBpcyBhIFJlY3Qgd2l0aCBhbiBJVGV4dC4gQ2FuIGJlIGV4cGFuZGVkIHRvIHJldmVhbCBjb250YWluZWQgU2hhcGVzLlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBvcHRpb25zXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0ZhYnJpYy5DYW52YXN9ICAgb3B0aW9ucy5jYW52YXMgLSBGYWJyaWMgY2FudmFzXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG9wdGlvbnMuaWQgLSBVbmlxdWUgaWRlbnRpZmllclxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBvcHRpb25zLndpZHRoXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIG9wdGlvbnMuaGVpZ2h0XHJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG9wdGlvbnMubGFiZWxcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICBjb25zdCByZWN0ID0gbmV3IGZhYnJpYy5SZWN0KHtcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBvcmlnaW5YOiAnbGVmdCcsXHJcbiAgICAgIG9yaWdpblk6ICd0b3AnLFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgc3Ryb2tlOiAnIzAwMCcsXHJcbiAgICAgIGZpbGw6ICcjZmZmJyxcclxuICAgICAgcng6IDEwLFxyXG4gICAgICByeTogMTAsXHJcbiAgICAgIHdpZHRoOiBvcHRpb25zLndpZHRoID8gb3B0aW9ucy53aWR0aCA6IDIwMCxcclxuICAgICAgaGVpZ2h0OiBvcHRpb25zLmhlaWdodCA/IG9wdGlvbnMuaGVpZ2h0IDogMTAwLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCB0ZXh0ID0gbmV3IGZhYnJpYy5UZXh0Ym94KG9wdGlvbnMubGFiZWwsIHtcclxuICAgICAgbGVmdDogcmVjdC53aWR0aCAvIDIsXHJcbiAgICAgIHRvcDogcmVjdC5oZWlnaHQgLyAyLFxyXG4gICAgICBzdHlsZXM6IHsgfSxcclxuICAgICAgZm9udFNpemU6IDE0LFxyXG4gICAgICBmb250RmFtaWx5OiAnSGVsdmV0aWNhJyxcclxuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICB3aWR0aDogMTkwLFxyXG4gICAgICBoZWlnaHQ6IDkwLFxyXG4gICAgICBzcGxpdEJ5R3JhcGhlbWU6IHRydWUsXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGdyb3VwID0gbmV3IGZhYnJpYy5Hcm91cChbcmVjdCwgdGV4dF0sIHtcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBvcmlnaW5YOiAnbGVmdCcsXHJcbiAgICAgIG9yaWdpblk6ICd0b3AnLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBuZXdPcHRpb25zID0gXy5jbG9uZURlZXAoXy5vbWl0KG9wdGlvbnMsIFsnY2FudmFzJywgJ3NoYXBlJ10pKTtcclxuICAgIG5ld09wdGlvbnMuY2FudmFzID0gb3B0aW9ucy5jYW52YXM7XHJcbiAgICBuZXdPcHRpb25zLnNoYXBlID0gZ3JvdXA7XHJcbiAgICBzdXBlcihuZXdPcHRpb25zKTtcclxuXHJcbiAgICBncm91cC5vbih7XHJcbiAgICAgIHNjYWxpbmc6ICgpID0+IHtcclxuICAgICAgICAvLyBXaGVuIHNjYWxpbmcsIGtlZXAgdGV4dCBzYW1lIHNpemUgYXMgaW5pdGlhbFxyXG4gICAgICAgIGlmIChncm91cC5zY2FsZVggPCAxKSB7XHJcbiAgICAgICAgICB0ZXh0LnNjYWxlWCA9IDEgKyAoMSAtIGdyb3VwLnNjYWxlWCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRleHQuc2NhbGVYID0gMSAvIChncm91cC5zY2FsZVgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZ3JvdXAuc2NhbGVZIDwgMSkge1xyXG4gICAgICAgICAgdGV4dC5zY2FsZVkgPSAxICsgKDEgLSBncm91cC5zY2FsZVkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0ZXh0LnNjYWxlWSA9IDEgLyAoZ3JvdXAuc2NhbGVZKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jYW52YXMucmVuZGVyQWxsKCk7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIF9vbkFuY2hvclJpZ2h0Q2xpY2sob3B0aW9ucykge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBpZCwgbGVmdCwgdG9wLCBhbmdsZSwgY2FudmFzLCB3aWR0aCwgaGVpZ2h0LFxyXG4gICAgfSA9IHRoaXMuc2hhcGU7XHJcbiAgICBjb25zdCBhcCA9IG9wdGlvbnMudGFyZ2V0O1xyXG4gICAgY29uc3QgeyBjYXJkaW5hbCB9ID0gYXA7XHJcbiAgICBjb25zdCBzcGFjaW5nID0gNTA7XHJcblxyXG4gICAgY29uc3QgbmV4dENvbnRhaW5lciA9IG5ldyBDb250YWluZXIoe1xyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIGlkOiBgJHtpZH1fbmV4dF8ke2NhcmRpbmFsfV8ke01hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMSl9YCxcclxuICAgICAgbGVmdCxcclxuICAgICAgdG9wLFxyXG4gICAgICBhbmdsZSxcclxuICAgICAgbGFiZWw6IGAke2lkfV9uZXh0XyR7Y2FyZGluYWx9YCxcclxuICAgIH0pO1xyXG4gICAgbmV4dENvbnRhaW5lci5pbmplY3QoKTtcclxuXHJcbiAgICBjb25zdCBuZXdPcHRpb25zID0ge307XHJcbiAgICBsZXQgdGFyZ2V0Q2FyZGluYWw7XHJcbiAgICBzd2l0Y2ggKGNhcmRpbmFsKSB7XHJcbiAgICAgIGNhc2UgJ2Vhc3QnOiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnd2VzdCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gdG9wO1xyXG4gICAgICAgIG5ld09wdGlvbnMueCA9IGxlZnQgKyB3aWR0aCArIHNwYWNpbmc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnd2VzdCc6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICdlYXN0JztcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSB0b3A7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gbGVmdCAtIHdpZHRoIC0gc3BhY2luZztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aCc6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICdzb3V0aCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gdG9wIC0gaGVpZ2h0IC0gc3BhY2luZztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSBsZWZ0O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRoJzoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ25vcnRoJztcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSB0b3AgKyBoZWlnaHQgKyBzcGFjaW5nO1xyXG4gICAgICAgIG5ld09wdGlvbnMueCA9IGxlZnQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnbm9ydGhlYXN0Jzoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ3NvdXRod2VzdCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gdG9wIC0gaGVpZ2h0IC0gc3BhY2luZztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSBsZWZ0ICsgd2lkdGggKyBzcGFjaW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRod2VzdCc6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICdzb3V0aGVhc3QnO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IHRvcCAtIGhlaWdodCAtIHNwYWNpbmc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gbGVmdCAtIHdpZHRoIC0gc3BhY2luZztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aGVhc3QnOiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnbm9ydGh3ZXN0JztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSB0b3AgKyBoZWlnaHQgKyBzcGFjaW5nO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IGxlZnQgKyB3aWR0aCArIHNwYWNpbmc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnc291dGh3ZXN0JzpcclxuICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ25vcnRoZWFzdCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gdG9wICsgaGVpZ2h0ICsgc3BhY2luZztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSBsZWZ0IC0gd2lkdGggLSBzcGFjaW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBuZXh0Q29udGFpbmVyLm1vdmUobmV3T3B0aW9ucyk7XHJcbiAgICAvLyBuZXh0Q29udGFpbmVyLnJvdGF0ZShhbmdsZSk7XHJcblxyXG4gICAgY29uc3QgbmV3TGluayA9IG5ldyBDdXJ2ZWRMaW5rKHtcclxuICAgICAgY2FudmFzLFxyXG4gICAgICBzdGFydDoge1xyXG4gICAgICAgIHg6IGFwLmxlZnQsXHJcbiAgICAgICAgeTogYXAudG9wLFxyXG4gICAgICB9LFxyXG4gICAgICBlbmQ6IHtcclxuICAgICAgICB4OiBuZXh0Q29udGFpbmVyLmFuY2hvcnNbdGFyZ2V0Q2FyZGluYWxdLmxlZnQsXHJcbiAgICAgICAgeTogbmV4dENvbnRhaW5lci5hbmNob3JzW3RhcmdldENhcmRpbmFsXS50b3AsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICAgIG5ld0xpbmsuaW5qZWN0KGNhbnZhcyk7XHJcbiAgICBuZXdMaW5rLmNvbm5lY3RMaW5rKCdzdGFydCcsIGFwLnNoYXBlSWQsIGFwLmNhcmRpbmFsKTtcclxuICAgIG5ld0xpbmsuY29ubmVjdExpbmsoJ2VuZCcsIG5leHRDb250YWluZXIuYW5jaG9yc1t0YXJnZXRDYXJkaW5hbF0uc2hhcGVJZCwgbmV4dENvbnRhaW5lci5hbmNob3JzW3RhcmdldENhcmRpbmFsXS5jYXJkaW5hbCk7XHJcbiAgfVxyXG5cclxuICBfb25BbmNob3JMZWZ0Q2xpY2sob3B0aW9ucykge1xyXG4gICAgY29uc3QgYXAgPSBvcHRpb25zLnRhcmdldDtcclxuICAgIGNvbnN0IHsgY2FudmFzIH0gPSB0aGlzO1xyXG5cclxuICAgIC8vIERpc2FibGUgdGhlIG11bHRpIHNlbGVjdGlvbiB3aGVuIG1vdmluZyBtb3VzZVxyXG4gICAgdGhpcy5jYW52YXMuc2VsZWN0aW9uID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3Qgb3Bwb3NpdGVDYXJkaW5hbCA9IHtcclxuICAgICAgZWFzdDogJ3dlc3QnLFxyXG4gICAgICB3ZXN0OiAnZWFzdCcsXHJcbiAgICAgIG5vcnRoOiAnc291dGgnLFxyXG4gICAgICBzb3V0aDogJ25vcnRoJyxcclxuICAgIH07XHJcbiAgICBjb25zdCBuZXdMaW5rID0gbmV3IEN1cnZlZExpbmsoe1xyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgeDogYXAubGVmdCxcclxuICAgICAgICB5OiBhcC50b3AsXHJcbiAgICAgICAgZGlyZWN0aW9uOiBhcC5jYXJkaW5hbCxcclxuICAgICAgfSxcclxuICAgICAgZW5kOiB7XHJcbiAgICAgICAgeDogYXAubGVmdCxcclxuICAgICAgICB5OiBhcC50b3AsXHJcbiAgICAgICAgZGlyZWN0aW9uOiBvcHBvc2l0ZUNhcmRpbmFsW2FwLmNhcmRpbmFsXSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgbmV3TGluay5pbmplY3QoY2FudmFzKTtcclxuICAgIG5ld0xpbmsuY29ubmVjdExpbmsoJ3N0YXJ0JywgYXAuc2hhcGVJZCwgYXAuY2FyZGluYWwpO1xyXG4gICAgbmV3TGluay5hcnJvd0hlYWQuZmlyZSgnbW91c2Vkb3duJyk7XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZU1vdmUgPSAoZXZlbnQpID0+IHtcclxuICAgICAgbmV3TGluay5hcnJvd0hlYWQubGVmdCA9IGV2ZW50LnBvaW50ZXIueDtcclxuICAgICAgbmV3TGluay5hcnJvd0hlYWQudG9wID0gZXZlbnQucG9pbnRlci55O1xyXG4gICAgICBuZXdMaW5rLmFycm93SGVhZC5maXJlKCdtb3ZpbmcnKTtcclxuICAgIH07XHJcbiAgICBjYW52YXMub24oJ21vdXNlOm1vdmUnLCBvbk1vdXNlTW92ZSk7XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZUNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAvLyBFbmFibGUgYmFjayB0aGUgbXVsdGkgc2VsZWN0aW9uIHdoZW4gbW92aW5nIG1vdXNlXHJcbiAgICAgIHRoaXMuY2FudmFzLnNlbGVjdGlvbiA9IHRydWU7XHJcblxyXG4gICAgICBuZXdMaW5rLmFycm93SGVhZC5maXJlKCdtb3ZlZCcpO1xyXG4gICAgICBuZXdMaW5rLmFycm93SGVhZC5maXJlKCdtb3VzZXVwJyk7XHJcbiAgICAgIGNhbnZhcy5vZmYoJ21vdXNlOm1vdmUnLCBvbk1vdXNlTW92ZSk7XHJcbiAgICAgIGNhbnZhcy5vZmYoJ21vdXNlOnVwJywgb25Nb3VzZUNsaWNrKTtcclxuICAgIH07XHJcbiAgICBjYW52YXMub24oJ21vdXNlOnVwJywgb25Nb3VzZUNsaWNrKTtcclxuICB9XHJcbn1cclxuIiwiY29uc3QgeyBmYWJyaWMgfSA9IHdpbmRvdztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1cnZlZExpbmsge1xyXG4gIC8qKlxyXG4gICAqIEEgTGluayBpcyBhIEZhYnJpYy5QYXRoIG9iamVjdCB3aG9zZSBTdGFydCBhbmQgRW5kIHBvaW50cyBjYW4gYmUgY29ubmVjdGVkIGVuZCBhbnkgYW5jaG9yIG9mIHR3byBMaW5rYWJsZVNoYXBlLlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBvcHRpb25zXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0ZhYnJpYy5DYW52YXN9ICAgb3B0aW9ucy5jYW52YXMgLSBGYWJyaWMgY2FudmFzXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG9wdGlvbnMuaWQgLSBVbmlxdWUgaWRlbnRpZmllclxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLnN0YXJ0XSAtIENvb3JkaW5hdGVzIG9mIHRoZSBzdGFydCBwb2ludFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBbb3B0aW9ucy5zdGFydC54XSAtIFggYXhpcyBjb29yZGluYXRlIG9mIHRoZSBzdGFydCBwb2ludFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBbb3B0aW9ucy5zdGFydC55XSAtIFkgYXhpcyBjb29yZGluYXRlIG9mIHRoZSBzdGFydCBwb2ludFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBbb3B0aW9ucy5zdGFydC5kaXJlY3Rpb25dIC1cclxuICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgW29wdGlvbnMuZW5kLnhdIC0gWCBheGlzIGNvb3JkaW5hdGUgb2YgdGhlIGVuZCBwb2ludFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBbb3B0aW9ucy5lbmQueV0gLSBZIGF4aXMgY29vcmRpbmF0ZSBvZiB0aGUgZW5kIHBvaW50XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIFtvcHRpb25zLmVuZC5kaXJlY3Rpb25dIC1cclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuY3VzdG9tXSAtIE9wdGlvbnMgZW5kIGN1c3RvbWl6ZSB0aGUgZGlmZmVyZW50IHNoYXBlcyBvZiB0aGUgTGlua1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLmN1c3RvbS5wYXRoXSAtIGJlemllciBxdWFkcmF0aWMgY3VydmVcclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuY3VzdG9tLnN0YXJ0UG9pbnRdIC0gYWthIGFycm93VGFpbFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBbb3B0aW9ucy5jdXN0b20uZW5kUG9pbnRdIC0gYWthIGFycm93SGVhZFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgaWQsXHJcbiAgICAgIGNhbnZhcyxcclxuICAgIH0gPSBvcHRpb25zO1xyXG4gICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICB0aGlzLmRpcmVjdGlvbiA9IHtcclxuICAgICAgc3RhcnQ6IG9wdGlvbnMgJiYgb3B0aW9ucy5zdGFydCAmJiBvcHRpb25zLnN0YXJ0LmRpcmVjdGlvbiA/IG9wdGlvbnMuc3RhcnQuZGlyZWN0aW9uIDogJ2Vhc3QnLFxyXG4gICAgICBlbmQ6IG9wdGlvbnMgJiYgb3B0aW9ucy5lbmQgJiYgb3B0aW9ucy5lbmQuZGlyZWN0aW9uID8gb3B0aW9ucy5lbmQuZGlyZWN0aW9uIDogJ3dlc3QnLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHN0YXJ0ID0ge1xyXG4gICAgICB4OiBvcHRpb25zICYmIG9wdGlvbnMuc3RhcnQgJiYgb3B0aW9ucy5zdGFydC54ID8gb3B0aW9ucy5zdGFydC54IDogMCxcclxuICAgICAgeTogb3B0aW9ucyAmJiBvcHRpb25zLnN0YXJ0ICYmIG9wdGlvbnMuc3RhcnQueSA/IG9wdGlvbnMuc3RhcnQueSA6IDAsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgZW5kID0ge1xyXG4gICAgICB4OiBvcHRpb25zICYmIG9wdGlvbnMuZW5kICYmIG9wdGlvbnMuZW5kLnggPyBvcHRpb25zLmVuZC54IDogMCxcclxuICAgICAgeTogb3B0aW9ucyAmJiBvcHRpb25zLmVuZCAmJiBvcHRpb25zLmVuZC55ID8gb3B0aW9ucy5lbmQueSA6IDAsXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFBhdGgsIGEgYmV6aWVyIGN1YmljIGN1cnZlXHJcbiAgICBjb25zdCB7IHBhdGhDb29yZHNBcnJheSB9ID0gdGhpcy5jb21wdXRlUGF0aENvb3Jkcyh7XHJcbiAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgeDogc3RhcnQueCxcclxuICAgICAgICB5OiBzdGFydC55LFxyXG4gICAgICAgIGRpcmVjdGlvbjogdGhpcy5kaXJlY3Rpb24uc3RhcnQsXHJcbiAgICAgIH0sXHJcbiAgICAgIGVuZDoge1xyXG4gICAgICAgIHg6IGVuZC54LFxyXG4gICAgICAgIHk6IGVuZC55LFxyXG4gICAgICAgIGRpcmVjdGlvbjogdGhpcy5kaXJlY3Rpb24uZW5kLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBwYXRoT3B0cyA9IHRoaXMuZGVmYXVsdFBhdGhPcHRpb25zID0ge1xyXG4gICAgICBmaWxsOiAnJyxcclxuICAgICAgc3Ryb2tlOiAob3B0aW9ucy5jdXN0b20gJiYgb3B0aW9ucy5jdXN0b20ucGF0aCAmJiBvcHRpb25zLmN1c3RvbS5wYXRoLnN0cm9rZSkgPyBvcHRpb25zLmN1c3RvbS5wYXRoLnN0cm9rZSA6ICcjMDAwJyxcclxuICAgICAgc3Ryb2tlV2lkdGg6IChvcHRpb25zLmN1c3RvbSAmJiBvcHRpb25zLmN1c3RvbS5wYXRoICYmIG9wdGlvbnMuY3VzdG9tLnBhdGguc3Ryb2tlV2lkdGgpID8gb3B0aW9ucy5jdXN0b20ucGF0aC5zdHJva2VXaWR0aCA6IDIsXHJcbiAgICAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgICBoYXNCb3JkZXJzOiB0cnVlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAgIHBlclBpeGVsVGFyZ2V0RmluZDogdHJ1ZSxcclxuICAgIH07XHJcbiAgICBjb25zdCBwYXRoID0gbmV3IGZhYnJpYy5QYXRoKHBhdGhDb29yZHNBcnJheSwgcGF0aE9wdHMpO1xyXG4gICAgdGhpcy5wYXRoID0gcGF0aDtcclxuXHJcbiAgICAvLyBFbmQgcG9pbnQgKGFycm93SGVhZClcclxuICAgIGNvbnN0IGlzVmFsaWRNYXNrT3B0cyA9IHtcclxuICAgICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAgIGxlZnQ6IDAsXHJcbiAgICAgIHRvcDogMCxcclxuICAgICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAgIHJhZGl1czogMTYsXHJcbiAgICAgIGZpbGw6ICcjNTdiODU3JywgLy8gZWE0ZjM3XHJcbiAgICAgIHN0cm9rZTogJyM1N2I4NTcnLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAgIHNlbGVjdGFibGU6IGZhbHNlLFxyXG4gICAgICBvcGFjaXR5OiAwLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGFycm93SGVhZE9wdHMgPSB7XHJcbiAgICAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgICB3aWR0aDogMTAsXHJcbiAgICAgIGhlaWdodDogMTAsXHJcbiAgICAgIGxlZnQ6IGVuZC54LFxyXG4gICAgICB0b3A6IGVuZC55LFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgZmlsbDogJyMwMDAnLFxyXG4gICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICBzdHJva2U6ICcjMDAwJyxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgICBoYXNCb3JkZXJzOiBmYWxzZSxcclxuICAgICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGFycm93SGVhZCA9IHRoaXMuYXJyb3dIZWFkID0gbmV3IGZhYnJpYy5UcmlhbmdsZShhcnJvd0hlYWRPcHRzKTtcclxuICAgIHRoaXMuaXNWYWxpZEhlYWRDb25uZWN0aW9uTWFzayA9IG5ldyBmYWJyaWMuQ2lyY2xlKGlzVmFsaWRNYXNrT3B0cyk7XHJcbiAgICBhcnJvd0hlYWQub24oJ21vdmluZycsICgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVQYXRoKHtcclxuICAgICAgICBlbmQ6IHtcclxuICAgICAgICAgIHg6IGFycm93SGVhZC5sZWZ0LFxyXG4gICAgICAgICAgeTogYXJyb3dIZWFkLnRvcCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbW1pdDogZmFsc2UsXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLl9jaGVja0V4dHJlbWl0eUNhbkJlQ29ubmVjdGVkKCdlbmQnKTtcclxuICAgIH0pO1xyXG4gICAgYXJyb3dIZWFkLm9uKCdtb3ZlZCcsICgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVQYXRoKHtcclxuICAgICAgICBlbmQ6IHtcclxuICAgICAgICAgIHg6IGFycm93SGVhZC5sZWZ0LFxyXG4gICAgICAgICAgeTogYXJyb3dIZWFkLnRvcCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbW1pdDogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuaXNWYWxpZEhlYWRDb25uZWN0aW9uTWFzay5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgICAgdGhpcy5fY29ubmVjdERpc2Nvbm5lY3RFeHRyZW1pdHkoJ2VuZCcpO1xyXG4gICAgfSk7XHJcbiAgICBhcnJvd0hlYWQub24oJ21vdXNlZG93bicsICgpID0+IHtcclxuICAgICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcclxuICAgICAgdGhpcy50b2dnbGVBbGxBbmNob3JzT3BhY2l0eSgxKTtcclxuXHJcbiAgICAgIGFycm93SGVhZC5vbignbW91c2V1cCcsICgpID0+IHtcclxuICAgICAgICB0aGlzLnRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KDApO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFN0YXJ0IHBvaW50IChhcnJvd1RhaWwpXHJcbiAgICBjb25zdCBhcnJvd1RhaWxPcHRzID0ge1xyXG4gICAgICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgICAgd2lkdGg6IDEwLFxyXG4gICAgICBoZWlnaHQ6IDEwLFxyXG4gICAgICBsZWZ0OiBzdGFydC54LFxyXG4gICAgICB0b3A6IHN0YXJ0LnksXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICBmaWxsOiAnI2ZmZicsXHJcbiAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgIHN0cm9rZTogJyMwMDAnLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIHNlbGVjdGFibGU6IHRydWUsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgYXJyb3dUYWlsID0gdGhpcy5hcnJvd1RhaWwgPSBuZXcgZmFicmljLlJlY3QoYXJyb3dUYWlsT3B0cyk7XHJcbiAgICB0aGlzLmlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2sgPSBuZXcgZmFicmljLkNpcmNsZShpc1ZhbGlkTWFza09wdHMpO1xyXG4gICAgYXJyb3dUYWlsLm9uKCdtb3ZpbmcnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aCh7XHJcbiAgICAgICAgc3RhcnQ6IHtcclxuICAgICAgICAgIHg6IGFycm93VGFpbC5sZWZ0LFxyXG4gICAgICAgICAgeTogYXJyb3dUYWlsLnRvcCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbW1pdDogZmFsc2UsXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLl9jaGVja0V4dHJlbWl0eUNhbkJlQ29ubmVjdGVkKCdzdGFydCcpO1xyXG4gICAgfSk7XHJcbiAgICBhcnJvd1RhaWwub24oJ21vdmVkJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhdGgoe1xyXG4gICAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgICB4OiBhcnJvd1RhaWwubGVmdCxcclxuICAgICAgICAgIHk6IGFycm93VGFpbC50b3AsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21taXQ6IHRydWUsXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2suc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICAgIHRoaXMuX2Nvbm5lY3REaXNjb25uZWN0RXh0cmVtaXR5KCdzdGFydCcpO1xyXG4gICAgfSk7XHJcbiAgICBhcnJvd1RhaWwub24oJ21vdXNlZG93bicsICgpID0+IHtcclxuICAgICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcclxuICAgICAgdGhpcy50b2dnbGVBbGxBbmNob3JzT3BhY2l0eSgxKTtcclxuXHJcbiAgICAgIGFycm93VGFpbC5vbignbW91c2V1cCcsICgpID0+IHtcclxuICAgICAgICB0aGlzLnRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KDApO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5qZWN0KCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHBhdGgsXHJcbiAgICAgIGFycm93SGVhZCxcclxuICAgICAgYXJyb3dUYWlsLFxyXG4gICAgICBpc1ZhbGlkVGFpbENvbm5lY3Rpb25NYXNrLFxyXG4gICAgICBpc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrLFxyXG4gICAgfSA9IHRoaXM7XHJcbiAgICBjYW52YXMuYWRkKGlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2spO1xyXG4gICAgY2FudmFzLmFkZChpc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrKTtcclxuICAgIGNhbnZhcy5hZGQoYXJyb3dIZWFkKTtcclxuICAgIGNhbnZhcy5hZGQoYXJyb3dUYWlsKTtcclxuXHJcbiAgICBjYW52YXMuYWRkKHBhdGgpO1xyXG5cclxuICAgIHRoaXMudXBkYXRlUGF0aCh7XHJcbiAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgeDogcGF0aC5wYXRoWzBdWzFdLFxyXG4gICAgICAgIHk6IHBhdGgucGF0aFswXVsyXSxcclxuICAgICAgfSxcclxuICAgICAgZW5kOiB7XHJcbiAgICAgICAgeDogcGF0aC5wYXRoWzJdWzVdLFxyXG4gICAgICAgIHk6IHBhdGgucGF0aFsyXVs2XSxcclxuICAgICAgfSxcclxuICAgICAgY29tbWl0OiB0cnVlLFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBjb25uZWN0TGluayhsaW5rUG9pbnQsIHNoYXBlSWQsIGNhcmRpbmFsKSB7XHJcbiAgICAvLyBDaGVjayBub3QgYWxyZWFkeSBjb25uZWN0ZWRcclxuICAgIGlmICghdGhpcy5pc1ZhbGlkQ29ubmVjdGlvbihsaW5rUG9pbnQsIHNoYXBlSWQsIGNhcmRpbmFsKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBzaGFwZSA9IHRoaXMuY2FudmFzLmdldE9iamVjdHMoKVxyXG4gICAgICAuZmluZCgobykgPT4gby5pZCA9PT0gc2hhcGVJZCk7XHJcblxyXG4gICAgLy8gRGlzY29ubmVjdCBleGlzdGluZyBvYmplY3RcclxuICAgIHRoaXMuZGlzY29ubmVjdExpbmsobGlua1BvaW50KTtcclxuXHJcbiAgICAvLyBDb25uZWN0XHJcbiAgICB0aGlzLmRpcmVjdGlvbltsaW5rUG9pbnRdID0gY2FyZGluYWw7XHJcbiAgICB0aGlzW2xpbmtQb2ludF0gPSB7XHJcbiAgICAgIHNoYXBlLFxyXG4gICAgICBhbmNob3I6IGNhcmRpbmFsLFxyXG4gICAgICBoYW5kbGVyczoge1xyXG4gICAgICAgIG9uQW5jaG9yUG9zaXRpb25Nb2RpZnlpbmc6ICgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IG9wdHMgPSB7XHJcbiAgICAgICAgICAgIGNvbW1pdDogZmFsc2UsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgb3B0c1tsaW5rUG9pbnRdID0ge1xyXG4gICAgICAgICAgICB4OiBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5sZWZ0LFxyXG4gICAgICAgICAgICB5OiBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS50b3AsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVQYXRoKG9wdHMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25BbmNob3JQb3NpdGlvbk1vZGlmaWVkOiAoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBvcHRzID0ge1xyXG4gICAgICAgICAgICBjb21taXQ6IHRydWUsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgb3B0c1tsaW5rUG9pbnRdID0ge1xyXG4gICAgICAgICAgICB4OiBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5sZWZ0LFxyXG4gICAgICAgICAgICB5OiBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS50b3AsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVQYXRoKG9wdHMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ub3BhY2l0eSA9IDA7XHJcbiAgICBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5vbigncGc6cG9zaXRpb246bW9kaWZ5aW5nJywgdGhpc1tsaW5rUG9pbnRdLmhhbmRsZXJzLm9uQW5jaG9yUG9zaXRpb25Nb2RpZnlpbmcpO1xyXG4gICAgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ub24oJ3BnOnBvc2l0aW9uOm1vZGlmaWVkJywgdGhpc1tsaW5rUG9pbnRdLmhhbmRsZXJzLm9uQW5jaG9yUG9zaXRpb25Nb2RpZmllZCk7XHJcblxyXG4gICAgLy8gVXBkYXRlIExpbmtcclxuICAgIGNvbnN0IG9wdHMgPSB7XHJcbiAgICAgIGNvbW1pdDogZmFsc2UsXHJcbiAgICB9O1xyXG4gICAgb3B0c1tsaW5rUG9pbnRdID0ge1xyXG4gICAgICB4OiBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5sZWZ0LFxyXG4gICAgICB5OiBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS50b3AsXHJcbiAgICB9O1xyXG4gICAgdGhpcy51cGRhdGVQYXRoKG9wdHMpO1xyXG4gIH1cclxuXHJcbiAgZGlzY29ubmVjdExpbmsobGlua1BvaW50KSB7XHJcbiAgICBpZiAodGhpc1tsaW5rUG9pbnRdKSB7XHJcbiAgICAgIHRoaXNbbGlua1BvaW50XS5zaGFwZS5hbmNob3JzW3RoaXNbbGlua1BvaW50XS5hbmNob3JdLm9mZigncGc6cG9zaXRpb246bW9kaWZ5aW5nJywgdGhpc1tsaW5rUG9pbnRdLmhhbmRsZXJzLm9uQW5jaG9yUG9zaXRpb25Nb2RpZnlpbmcpO1xyXG4gICAgICB0aGlzW2xpbmtQb2ludF0uc2hhcGUuYW5jaG9yc1t0aGlzW2xpbmtQb2ludF0uYW5jaG9yXS5vZmYoJ3BnOnBvc2l0aW9uOm1vZGlmaWVkJywgdGhpc1tsaW5rUG9pbnRdLmhhbmRsZXJzLm9uQW5jaG9yUG9zaXRpb25Nb2RpZmllZCk7XHJcbiAgICAgIGRlbGV0ZSB0aGlzW2xpbmtQb2ludF07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBicmluZ1RvRnJvbnQoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgcGF0aCxcclxuICAgICAgYXJyb3dIZWFkLFxyXG4gICAgICBhcnJvd1RhaWwsXHJcbiAgICB9ID0gdGhpcztcclxuICAgIGNhbnZhcy5icmluZ1RvRnJvbnQocGF0aCk7XHJcbiAgICBjYW52YXMuYnJpbmdUb0Zyb250KGFycm93SGVhZCk7XHJcbiAgICBjYW52YXMuYnJpbmdUb0Zyb250KGFycm93VGFpbCk7XHJcbiAgfVxyXG5cclxuICBjb21wdXRlUGF0aENvb3JkcyhvcHRpb25zKSB7XHJcbiAgICAvLyBNYWdpZSBtYWdpZSwgZXQgdm9zIGlkw6llcyBvbnQgZHUgZ8OpbmllICFcclxuXHJcbiAgICBjb25zdCBzdGFydCA9IHtcclxuICAgICAgeDogb3B0aW9ucy5zdGFydC54LFxyXG4gICAgICB5OiBvcHRpb25zLnN0YXJ0LnksXHJcbiAgICAgIGRpcmVjdGlvbjogb3B0aW9ucy5zdGFydCAmJiBvcHRpb25zLnN0YXJ0LmRpcmVjdGlvbiA/IG9wdGlvbnMuc3RhcnQuZGlyZWN0aW9uIDogdGhpcy5kaXJlY3Rpb24uc3RhcnQsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgZW5kID0ge1xyXG4gICAgICB4OiBvcHRpb25zLmVuZC54LFxyXG4gICAgICB5OiBvcHRpb25zLmVuZC55LFxyXG4gICAgICBkaXJlY3Rpb246IG9wdGlvbnMuZW5kICYmIG9wdGlvbnMuZW5kLmRpcmVjdGlvbiA/IG9wdGlvbnMuZW5kLmRpcmVjdGlvbiA6IHRoaXMuZGlyZWN0aW9uLmVuZCxcclxuICAgIH07XHJcblxyXG4gICAgLy8gQ2VudGVyIHBvaW50XHJcbiAgICAvLyBJZiBMaW5rIGlzIGNvbm5lY3RlZCwgY2VudGVyIGlzIGNhbGN1bGF0ZWQgYmV0d2VlbiB0aGUgdHdvIGxpbmtlZCBzaGFwZXNcclxuICAgIC8vIElmIG5vdCwgaXQgaXMgY2FsY3VsYXRlZCBiZXR3ZWVuIGxpbmsgc3RhcnQgYW5kIGVuZCBwb2ludHNcclxuICAgIGNvbnN0IGNlbnRlciA9IHtcclxuICAgICAgeDogKChzdGFydC54ICsgZW5kLngpIC8gMiksXHJcbiAgICAgIHk6ICgoc3RhcnQueSArIGVuZC55KSAvIDIpLFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDT01NRU5URUQ6IERvZXNuJ3Qgd29yayB3ZWxsIHdoZW4gbGlua2VkIHNoYXBlIGlzIHJvdGF0ZWRcclxuICAgIC8vIGlmICh0aGlzLnN0YXJ0ICYmIHRoaXMuZW5kICYmIHN0YXJ0LmRpcmVjdGlvbiAhPT0gZW5kLmRpcmVjdGlvbikge1xyXG4gICAgLy8gICBjZW50ZXIgPSB7XHJcbiAgICAvLyAgICAgeDogKHRoaXMuc3RhcnQuc2hhcGUuZ2V0Q2VudGVyUG9pbnQoKS54ICsgdGhpcy5lbmQuc2hhcGUuZ2V0Q2VudGVyUG9pbnQoKS54KSAvIDIsXHJcbiAgICAvLyAgICAgeTogKHRoaXMuc3RhcnQuc2hhcGUuZ2V0Q2VudGVyUG9pbnQoKS55ICsgdGhpcy5lbmQuc2hhcGUuZ2V0Q2VudGVyUG9pbnQoKS55KSAvIDIsXHJcbiAgICAvLyAgIH07XHJcbiAgICAvLyB9XHJcblxyXG4gICAgY29uc3QgY29udHJvbHMgPSB7XHJcbiAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgeDogc3RhcnQueCxcclxuICAgICAgICB5OiBzdGFydC55LFxyXG4gICAgICB9LFxyXG4gICAgICBlbmQ6IHtcclxuICAgICAgICB4OiBlbmQueCxcclxuICAgICAgICB5OiBlbmQueSxcclxuICAgICAgfSxcclxuICAgICAgY2VudGVyMToge1xyXG4gICAgICAgIHg6IGNlbnRlci54LFxyXG4gICAgICAgIHk6IGNlbnRlci55LFxyXG4gICAgICB9LFxyXG4gICAgICBjZW50ZXIyOiB7XHJcbiAgICAgICAgeDogY2VudGVyLngsXHJcbiAgICAgICAgeTogY2VudGVyLnksXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgc3dpdGNoIChvcHRpb25zLnN0YXJ0LmRpcmVjdGlvbikge1xyXG4gICAgICBjYXNlICdub3J0aCc6XHJcbiAgICAgICAgY29udHJvbHMuc3RhcnQueSAtPSBNYXRoLmFicyhzdGFydC55IC0gY2VudGVyLnkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdzb3V0aCc6XHJcbiAgICAgICAgY29udHJvbHMuc3RhcnQueSArPSBNYXRoLmFicyhzdGFydC55IC0gY2VudGVyLnkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdlYXN0JzpcclxuICAgICAgICBjb250cm9scy5zdGFydC54ICs9IE1hdGguYWJzKHN0YXJ0LnggLSBjZW50ZXIueCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3dlc3QnOlxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbnRyb2xzLnN0YXJ0LnggLT0gTWF0aC5hYnMoc3RhcnQueCAtIGNlbnRlci54KTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHN3aXRjaCAob3B0aW9ucy5lbmQuZGlyZWN0aW9uKSB7XHJcbiAgICAgIGNhc2UgJ25vcnRoJzpcclxuICAgICAgICBjb250cm9scy5lbmQueSAtPSBNYXRoLmFicyhlbmQueSAtIGNlbnRlci55KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnc291dGgnOlxyXG4gICAgICAgIGNvbnRyb2xzLmVuZC55ICs9IE1hdGguYWJzKGVuZC55IC0gY2VudGVyLnkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdlYXN0JzpcclxuICAgICAgICBjb250cm9scy5lbmQueCArPSBNYXRoLmFicyhlbmQueCAtIGNlbnRlci54KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnd2VzdCc6XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29udHJvbHMuZW5kLnggLT0gTWF0aC5hYnMoZW5kLnggLSBjZW50ZXIueCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHN0YXJ0LmRpcmVjdGlvbiA9PT0gZW5kLmRpcmVjdGlvbikge1xyXG4gICAgICAvLyBjb25zdCBkZWx0YVggPSBNYXRoLmFicyhzdGFydC54IC0gZW5kLngpIC8gMjtcclxuICAgICAgLy8gY29uc3QgZGVsdGFZID0gTWF0aC5hYnMoc3RhcnQueSAtIGVuZC55KSAvIDI7XHJcbiAgICAgIC8vIGNvbnN0IGRlbHRhWCA9IDQwICsgTWF0aC5hYnMoc3RhcnQueCAtIGVuZC54KSAvIDQ7XHJcbiAgICAgIC8vIGNvbnN0IGRlbHRhWSA9IDQwICsgTWF0aC5hYnMoc3RhcnQueSAtIGVuZC55KSAvIDQ7XHJcbiAgICAgIGNvbnN0IGRlbHRhWCA9IDQwO1xyXG4gICAgICBjb25zdCBkZWx0YVkgPSA0MDtcclxuXHJcbiAgICAgIGlmIChzdGFydC5kaXJlY3Rpb24gPT09ICdzb3V0aCcgfHwgc3RhcnQuZGlyZWN0aW9uID09PSAnbm9ydGgnKSB7XHJcbiAgICAgICAgLy8gSWYgbGluayBpcyBjb25uZWN0ZWQgdG8gdHdvIHNoYXBlc1xyXG4gICAgICAgIC8vIElmIHNoYXBlcyBhcmUgaG9yaXpvbnRhbGx5IGFsaWduZWQgKGkuZS4gb24gdG9wIG9mIGVhY2ggb3RoZXIpLCB3ZSBtb3ZlIHRoZSBMaW5rIGNlbnRlciBwb2ludCBhIGJpdCB0byB0aGUgbGVmdFxyXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0ICYmIHRoaXMuZW5kKSB7XHJcbiAgICAgICAgICAvLyBJZiBzaGFwZXMgYXJlIHZlcnRpY2FsbHkgYWxpZ25lZCAoaS5lLiBuZXh0IHRvIGVhY2ggb3RoZXIpLCB3ZSBtb3ZlIHRoZSBMaW5rIGNlbnRlciBwb2ludCBhIGJpdCB0byB0aGUgdG9wXHJcbiAgICAgICAgICBpZiAoTWF0aC5hYnMoc3RhcnQueSAtIGVuZC55KSA8IDEwKSB7XHJcbiAgICAgICAgICAgIGNlbnRlci54IC09ICgodGhpcy5zdGFydC5zaGFwZS53aWR0aCArIHRoaXMuZW5kLnNoYXBlLndpZHRoKSAvIDIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2VudGVyLnkgKz0gKHN0YXJ0LmRpcmVjdGlvbiA9PT0gJ3NvdXRoJyA/IGRlbHRhWSA6IC1kZWx0YVkpO1xyXG4gICAgICAgIGNvbnRyb2xzLnN0YXJ0LnkgPSBzdGFydC55ICsgKHN0YXJ0LmRpcmVjdGlvbiA9PT0gJ3NvdXRoJyA/IGRlbHRhWSA6IC1kZWx0YVkpO1xyXG4gICAgICAgIGNvbnRyb2xzLmVuZC55ID0gZW5kLnkgKyAoc3RhcnQuZGlyZWN0aW9uID09PSAnc291dGgnID8gZGVsdGFZIDogLWRlbHRhWSk7XHJcbiAgICAgICAgY29udHJvbHMuY2VudGVyMS54ID0gY2VudGVyLng7XHJcbiAgICAgICAgY29udHJvbHMuY2VudGVyMi54ID0gY2VudGVyLng7XHJcbiAgICAgICAgY29udHJvbHMuY2VudGVyMS55ID0gY29udHJvbHMuc3RhcnQueTtcclxuICAgICAgICBjb250cm9scy5jZW50ZXIyLnkgPSBjb250cm9scy5lbmQueTtcclxuICAgICAgfSBlbHNlIGlmIChzdGFydC5kaXJlY3Rpb24gPT09ICdlYXN0JyB8fCBzdGFydC5kaXJlY3Rpb24gPT09ICd3ZXN0Jykge1xyXG4gICAgICAgIC8vIElmIGxpbmsgaXMgY29ubmVjdGVkIHRvIHR3byBzaGFwZXNcclxuICAgICAgICBpZiAodGhpcy5zdGFydCAmJiB0aGlzLmVuZCkge1xyXG4gICAgICAgICAgLy8gSWYgc2hhcGVzIGFyZSB2ZXJ0aWNhbGx5IGFsaWduZWQgKGkuZS4gbmV4dCB0byBlYWNoIG90aGVyKSwgd2UgbW92ZSB0aGUgTGluayBjZW50ZXIgcG9pbnQgYSBiaXQgdG8gdGhlIHRvcFxyXG4gICAgICAgICAgaWYgKE1hdGguYWJzKHN0YXJ0LnkgLSBlbmQueSkgPCAxMCkge1xyXG4gICAgICAgICAgICBjZW50ZXIueSAtPSAoKHRoaXMuc3RhcnQuc2hhcGUuaGVpZ2h0ICsgdGhpcy5lbmQuc2hhcGUuaGVpZ2h0KSAvIDIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2VudGVyLnggKz0gKHN0YXJ0LmRpcmVjdGlvbiA9PT0gJ2Vhc3QnID8gZGVsdGFYIDogLWRlbHRhWCk7XHJcbiAgICAgICAgY29udHJvbHMuc3RhcnQueCA9IHN0YXJ0LnggKyAoc3RhcnQuZGlyZWN0aW9uID09PSAnZWFzdCcgPyBkZWx0YVggOiAtZGVsdGFYKTtcclxuICAgICAgICBjb250cm9scy5lbmQueCA9IGVuZC54ICsgKHN0YXJ0LmRpcmVjdGlvbiA9PT0gJ2Vhc3QnID8gZGVsdGFYIDogLWRlbHRhWCk7XHJcbiAgICAgICAgY29udHJvbHMuY2VudGVyMS54ID0gY29udHJvbHMuc3RhcnQueDtcclxuICAgICAgICBjb250cm9scy5jZW50ZXIyLnggPSBjb250cm9scy5lbmQueDtcclxuICAgICAgICBjb250cm9scy5jZW50ZXIxLnkgPSBjZW50ZXIueTtcclxuICAgICAgICBjb250cm9scy5jZW50ZXIyLnkgPSBjZW50ZXIueTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChzdGFydC5kaXJlY3Rpb24gPT09ICdzb3V0aCcgfHwgc3RhcnQuZGlyZWN0aW9uID09PSAnbm9ydGgnKSB7XHJcbiAgICAgIGNvbnRyb2xzLmNlbnRlcjEueCA9IGNlbnRlci54O1xyXG4gICAgICBjb250cm9scy5jZW50ZXIxLnkgPSBjb250cm9scy5zdGFydC55O1xyXG4gICAgICBjb250cm9scy5jZW50ZXIyLnggPSBjZW50ZXIueDtcclxuICAgICAgY29udHJvbHMuY2VudGVyMi55ID0gY29udHJvbHMuZW5kLnk7XHJcbiAgICB9IGVsc2UgaWYgKHN0YXJ0LmRpcmVjdGlvbiA9PT0gJ2Vhc3QnIHx8IHN0YXJ0LmRpcmVjdGlvbiA9PT0gJ3dlc3QnKSB7XHJcbiAgICAgIGNvbnRyb2xzLmNlbnRlcjEueCA9IGNvbnRyb2xzLnN0YXJ0Lng7XHJcbiAgICAgIGNvbnRyb2xzLmNlbnRlcjEueSA9IGNlbnRlci55O1xyXG4gICAgICBjb250cm9scy5jZW50ZXIyLnggPSBjb250cm9scy5lbmQueDtcclxuICAgICAgY29udHJvbHMuY2VudGVyMi55ID0gY2VudGVyLnk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSWYgbGluayBpcyBjb25uZWN0ZWQgdG8gbGlua2VkIHNoYXBlcyBhbmQgdGhleSBhcmUgcm90YXRlZCwgcGVyZm9ybSB0aGUgcm90YXRpb24gb24gdGhlIGNvbnRyb2xzIHBvaW50c1xyXG4gICAgLy8gVE9ETzogdG8gaW1wcm92ZVxyXG4gICAgaWYgKHRoaXMuc3RhcnQgJiYgdGhpcy5zdGFydC5zaGFwZSAmJiB0aGlzLnN0YXJ0LnNoYXBlLmFuZ2xlKSB7XHJcbiAgICAgIGNvbnN0IGFuZ2xlID0gKCh0aGlzLnN0YXJ0LnNoYXBlLmFuZ2xlICogTWF0aC5QSSkgLyAxODApO1xyXG5cclxuICAgICAgY29uc3QgY29udHJvbCA9IG5ldyBmYWJyaWMuUG9pbnQoY29udHJvbHMuc3RhcnQueCwgY29udHJvbHMuc3RhcnQueSk7XHJcbiAgICAgIGNvbnN0IG9yaWdpbiA9IG5ldyBmYWJyaWMuUG9pbnQoc3RhcnQueCwgc3RhcnQueSk7XHJcbiAgICAgIGNvbnN0IHJvdGF0ZWRDb250cm9sID0gZmFicmljLnV0aWwucm90YXRlUG9pbnQoY29udHJvbCwgb3JpZ2luLCBhbmdsZSk7XHJcblxyXG4gICAgICBjb250cm9scy5zdGFydC54ID0gcm90YXRlZENvbnRyb2wueDtcclxuICAgICAgY29udHJvbHMuc3RhcnQueSA9IHJvdGF0ZWRDb250cm9sLnk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5lbmQgJiYgdGhpcy5lbmQuc2hhcGUgJiYgdGhpcy5lbmQuc2hhcGUuYW5nbGUpIHtcclxuICAgICAgY29uc3QgYW5nbGUgPSAoKHRoaXMuZW5kLnNoYXBlLmFuZ2xlICogTWF0aC5QSSkgLyAxODApO1xyXG5cclxuICAgICAgY29uc3QgY29udHJvbCA9IG5ldyBmYWJyaWMuUG9pbnQoY29udHJvbHMuZW5kLngsIGNvbnRyb2xzLmVuZC55KTtcclxuICAgICAgY29uc3Qgb3JpZ2luID0gbmV3IGZhYnJpYy5Qb2ludChlbmQueCwgZW5kLnkpO1xyXG4gICAgICBjb25zdCByb3RhdGVkQ29udHJvbCA9IGZhYnJpYy51dGlsLnJvdGF0ZVBvaW50KGNvbnRyb2wsIG9yaWdpbiwgYW5nbGUpO1xyXG5cclxuICAgICAgY29udHJvbHMuZW5kLnggPSByb3RhdGVkQ29udHJvbC54O1xyXG4gICAgICBjb250cm9scy5lbmQueSA9IHJvdGF0ZWRDb250cm9sLnk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVmlzdWFsIGRlYnVnXHJcbiAgICAvLyB0aGlzLmNhbnZhcy5hZGQobmV3IGZhYnJpYy5DaXJjbGUoe1xyXG4gICAgLy8gICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgIC8vICAgbGVmdDogY29udHJvbHMuZW5kLngsXHJcbiAgICAvLyAgIHRvcDogY29udHJvbHMuZW5kLnksXHJcbiAgICAvLyAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgLy8gICByYWRpdXM6IDIsXHJcbiAgICAvLyAgIGZpbGw6ICcjNzhiZWZhJyxcclxuICAgIC8vICAgc3Ryb2tlOiAnIzc4YmVmYScsXHJcbiAgICAvLyAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgLy8gICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgIC8vICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAvLyAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgIC8vICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgIC8vICAgb3BhY2l0eTogMSxcclxuICAgIC8vIH0pKTtcclxuICAgIC8vIHRoaXMuY2FudmFzLmFkZChuZXcgZmFicmljLkNpcmNsZSh7XHJcbiAgICAvLyAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgLy8gICBsZWZ0OiBjZW50ZXIueCxcclxuICAgIC8vICAgdG9wOiBjZW50ZXIueSxcclxuICAgIC8vICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAvLyAgIHJhZGl1czogMixcclxuICAgIC8vICAgZmlsbDogJyNmZjInLFxyXG4gICAgLy8gICBzdHJva2U6ICcjZmYyJyxcclxuICAgIC8vICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAvLyAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgLy8gICBoYXNCb3JkZXJzOiBmYWxzZSxcclxuICAgIC8vICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgLy8gICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgLy8gICBvcGFjaXR5OiAxLFxyXG4gICAgLy8gfSkpO1xyXG4gICAgLy8gdGhpcy5jYW52YXMuYWRkKG5ldyBmYWJyaWMuQ2lyY2xlKHtcclxuICAgIC8vICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAvLyAgIGxlZnQ6IGNvbnRyb2xzLnN0YXJ0LngsXHJcbiAgICAvLyAgIHRvcDogY29udHJvbHMuc3RhcnQueSxcclxuICAgIC8vICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAvLyAgIHJhZGl1czogMixcclxuICAgIC8vICAgZmlsbDogJyNmMjInLFxyXG4gICAgLy8gICBzdHJva2U6ICcjZjIyJyxcclxuICAgIC8vICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAvLyAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgLy8gICBoYXNCb3JkZXJzOiBmYWxzZSxcclxuICAgIC8vICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgLy8gICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgLy8gICBvcGFjaXR5OiAxLFxyXG4gICAgLy8gfSkpO1xyXG5cclxuICAgIGNvbnN0IGNvb3JkcyA9IHtcclxuICAgICAgc3RhcnQ6IHtcclxuICAgICAgICB4OiBzdGFydC54LFxyXG4gICAgICAgIHk6IHN0YXJ0LnksXHJcbiAgICAgIH0sXHJcbiAgICAgIGVuZDoge1xyXG4gICAgICAgIHg6IGVuZC54LFxyXG4gICAgICAgIHk6IGVuZC55LFxyXG4gICAgICB9LFxyXG4gICAgICBjZW50ZXIsXHJcbiAgICAgIGNvbnRyb2xzOiB7XHJcbiAgICAgICAgc3RhcnQ6IHtcclxuICAgICAgICAgIHg6IGNvbnRyb2xzLnN0YXJ0LngsXHJcbiAgICAgICAgICB5OiBjb250cm9scy5zdGFydC55LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW5kOiB7XHJcbiAgICAgICAgICB4OiBjb250cm9scy5lbmQueCxcclxuICAgICAgICAgIHk6IGNvbnRyb2xzLmVuZC55LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2VudGVyMToge1xyXG4gICAgICAgICAgeDogY29udHJvbHMuY2VudGVyMS54LFxyXG4gICAgICAgICAgeTogY29udHJvbHMuY2VudGVyMS55LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2VudGVyMjoge1xyXG4gICAgICAgICAgeDogY29udHJvbHMuY2VudGVyMi54LFxyXG4gICAgICAgICAgeTogY29udHJvbHMuY2VudGVyMi55LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgY29uc3QgcGF0aENvb3Jkc0FycmF5ID0gW1xyXG4gICAgICBbJ00nLCBjb29yZHMuc3RhcnQueCwgY29vcmRzLnN0YXJ0LnldLFxyXG4gICAgICBbJ0MnLCBjb29yZHMuY29udHJvbHMuc3RhcnQueCwgY29vcmRzLmNvbnRyb2xzLnN0YXJ0LnksIGNvb3Jkcy5jb250cm9scy5jZW50ZXIxLngsIGNvb3Jkcy5jb250cm9scy5jZW50ZXIxLnksIGNvb3Jkcy5jZW50ZXIueCwgY29vcmRzLmNlbnRlci55XSxcclxuICAgICAgWydDJywgY29vcmRzLmNvbnRyb2xzLmNlbnRlcjIueCwgY29vcmRzLmNvbnRyb2xzLmNlbnRlcjIueSwgY29vcmRzLmNvbnRyb2xzLmVuZC54LCBjb29yZHMuY29udHJvbHMuZW5kLnksIGNvb3Jkcy5lbmQueCwgY29vcmRzLmVuZC55XSxcclxuICAgIF07XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBwYXRoQ29vcmRzOiBjb29yZHMsXHJcbiAgICAgIHBhdGhDb29yZHNBcnJheSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqIEBwYXJhbSBvcHRpb25zXHJcbiAgICogQHBhcmFtIG9wdGlvbnMuc3RhcnQueFxyXG4gICAqIEBwYXJhbSBvcHRpb25zLnN0YXJ0LnlcclxuICAgKiBAcGFyYW0gb3B0aW9ucy5lbmQueFxyXG4gICAqIEBwYXJhbSBvcHRpb25zLmVuZC55XHJcbiAgICogQHBhcmFtIG9wdGlvbnMuY29tbWl0XHJcbiAgICovXHJcbiAgdXBkYXRlUGF0aChvcHRpb25zKSB7XHJcbiAgICBjb25zdCBzdGFydCA9IHtcclxuICAgICAgeDogb3B0aW9ucy5zdGFydCAmJiBvcHRpb25zLnN0YXJ0LnggPyBvcHRpb25zLnN0YXJ0LnggOiB0aGlzLnBhdGgucGF0aFswXVsxXSxcclxuICAgICAgeTogb3B0aW9ucy5zdGFydCAmJiBvcHRpb25zLnN0YXJ0LnkgPyBvcHRpb25zLnN0YXJ0LnkgOiB0aGlzLnBhdGgucGF0aFswXVsyXSxcclxuICAgICAgZGlyZWN0aW9uOiBvcHRpb25zLnN0YXJ0ICYmIG9wdGlvbnMuc3RhcnQuZGlyZWN0aW9uID8gb3B0aW9ucy5zdGFydC5kaXJlY3Rpb24gOiB0aGlzLmRpcmVjdGlvbi5zdGFydCxcclxuICAgIH07XHJcbiAgICBjb25zdCBlbmQgPSB7XHJcbiAgICAgIHg6IG9wdGlvbnMuZW5kICYmIG9wdGlvbnMuZW5kLnggPyBvcHRpb25zLmVuZC54IDogdGhpcy5wYXRoLnBhdGhbMl1bNV0sXHJcbiAgICAgIHk6IG9wdGlvbnMuZW5kICYmIG9wdGlvbnMuZW5kLnkgPyBvcHRpb25zLmVuZC55IDogdGhpcy5wYXRoLnBhdGhbMl1bNl0sXHJcbiAgICAgIGRpcmVjdGlvbjogb3B0aW9ucy5lbmQgJiYgb3B0aW9ucy5lbmQuZGlyZWN0aW9uID8gb3B0aW9ucy5lbmQuZGlyZWN0aW9uIDogdGhpcy5kaXJlY3Rpb24uZW5kLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHsgcGF0aENvb3Jkc0FycmF5IH0gPSB0aGlzLmNvbXB1dGVQYXRoQ29vcmRzKHtcclxuICAgICAgc3RhcnQsIGVuZCxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChvcHRpb25zLmNvbW1pdCkge1xyXG4gICAgICBjb25zdCBuZXdQYXRoID0gbmV3IGZhYnJpYy5QYXRoKHBhdGhDb29yZHNBcnJheSwgdGhpcy5kZWZhdWx0UGF0aE9wdGlvbnMpO1xyXG4gICAgICB0aGlzLmNhbnZhcy5yZW1vdmUodGhpcy5wYXRoKTtcclxuICAgICAgdGhpcy5jYW52YXMuYWRkKG5ld1BhdGgpO1xyXG5cclxuICAgICAgbmV3UGF0aC5vbignbW91c2Vkb3duJywgdGhpcy5icmluZ1RvRnJvbnQuYmluZCh0aGlzKSk7XHJcbiAgICAgIG5ld1BhdGgub24oJ21vdmluZycsIHRoaXMub25MaW5rTW92aW5nLmJpbmQodGhpcykpO1xyXG4gICAgICBuZXdQYXRoLm9uKCdtb3ZlZCcsIHRoaXMub25MaW5rTW92ZWQuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICBjb25zdCB0b0JpbmQgPSBbXHJcbiAgICAgICAgdGhpcy5hcnJvd0hlYWQsXHJcbiAgICAgICAgdGhpcy5hcnJvd1RhaWwsXHJcbiAgICAgIF07XHJcbiAgICAgIGNvbnN0IGJvc3NUcmFuc2Zvcm0gPSBuZXdQYXRoLmNhbGNUcmFuc2Zvcm1NYXRyaXgoKTtcclxuICAgICAgY29uc3QgaW52ZXJ0ZWRCb3NzVHJhbnNmb3JtID0gZmFicmljLnV0aWwuaW52ZXJ0VHJhbnNmb3JtKGJvc3NUcmFuc2Zvcm0pO1xyXG4gICAgICB0b0JpbmQuZm9yRWFjaCgobykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRlc2lyZWRUcmFuc2Zvcm0gPSBmYWJyaWMudXRpbC5tdWx0aXBseVRyYW5zZm9ybU1hdHJpY2VzKFxyXG4gICAgICAgICAgaW52ZXJ0ZWRCb3NzVHJhbnNmb3JtLFxyXG4gICAgICAgICAgby5jYWxjVHJhbnNmb3JtTWF0cml4KCksXHJcbiAgICAgICAgKTtcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cclxuICAgICAgICBvLnJlbGF0aW9uc2hpcCA9IGRlc2lyZWRUcmFuc2Zvcm07XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5wYXRoID0gbmV3UGF0aDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGF0aC5zZXQoJ3BhdGgnLCBwYXRoQ29vcmRzQXJyYXkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFVwZGF0ZSBjb250cm9sIGxpbmVzLCBhcnJvdyBoZWFkcyBhbmQgdGFpbHNcclxuICAgIGNvbnN0IGFycm93SGVhZEFuZ2xlID0gKE1hdGguYXRhbjIodGhpcy5wYXRoLnBhdGhbMl1bNl0gLSB0aGlzLnBhdGgucGF0aFsyXVs0XSwgdGhpcy5wYXRoLnBhdGhbMl1bNV0gLSB0aGlzLnBhdGgucGF0aFsyXVszXSkgKiAxODApIC8gTWF0aC5QSTtcclxuICAgIHRoaXMuYXJyb3dIZWFkLmFuZ2xlID0gYXJyb3dIZWFkQW5nbGUgKyA5MDtcclxuICAgIHRoaXMuYXJyb3dIZWFkLmxlZnQgPSB0aGlzLnBhdGgucGF0aFsyXVs1XTtcclxuICAgIHRoaXMuYXJyb3dIZWFkLnRvcCA9IHRoaXMucGF0aC5wYXRoWzJdWzZdO1xyXG4gICAgdGhpcy5hcnJvd0hlYWQuc2V0Q29vcmRzKCk7XHJcbiAgICB0aGlzLmFycm93VGFpbC5sZWZ0ID0gdGhpcy5wYXRoLnBhdGhbMF1bMV07XHJcbiAgICB0aGlzLmFycm93VGFpbC50b3AgPSB0aGlzLnBhdGgucGF0aFswXVsyXTtcclxuICAgIHRoaXMuYXJyb3dUYWlsLnNldENvb3JkcygpO1xyXG5cclxuICAgIHRoaXMuYnJpbmdUb0Zyb250KCk7XHJcbiAgfVxyXG5cclxuICBpc1ZhbGlkQ29ubmVjdGlvbihsaW5rUG9pbnQsIHNoYXBlSWQsIGNhcmRpbmFsKSB7XHJcbiAgICBjb25zdCBzaGFwZSA9IHRoaXMuY2FudmFzLmdldE9iamVjdHMoKVxyXG4gICAgICAuZmluZCgobykgPT4gby5pZCA9PT0gc2hhcGVJZCk7XHJcbiAgICAvLyBDaGVjayBub3QgYWxyZWFkeSBjb25uZWN0ZWRcclxuICAgIGlmIChsaW5rUG9pbnQgPT09ICdzdGFydCcpIHtcclxuICAgICAgaWYgKHRoaXMuc3RhcnQgJiYgdGhpcy5zdGFydC5zaGFwZSAmJiB0aGlzLnN0YXJ0LnNoYXBlLmlkID09PSBzaGFwZS5pZCAmJiB0aGlzLnN0YXJ0LmNhcmRpbmFsID09PSBjYXJkaW5hbCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTsgLy8gdHJ5aW5nIGVuZCBzZXQgdGhlIHNhbWUgYWxyZWFkeSBjb25uZWN0ZWQgYW5jaG9yXHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuZW5kICYmIHRoaXMuZW5kLnNoYXBlICYmIHRoaXMuZW5kLnNoYXBlLmlkID09PSBzaGFwZS5pZCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTsgLy8gdHJ5aW5nIGVuZCBzaG9ydCBjaXJjdWl0IHRoZSByZWN0YW5nbGVcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChsaW5rUG9pbnQgPT09ICdlbmQnKSB7XHJcbiAgICAgIGlmICh0aGlzLmVuZCAmJiB0aGlzLmVuZC5zaGFwZSAmJiB0aGlzLmVuZC5zaGFwZS5pZCA9PT0gc2hhcGUuaWQgJiYgdGhpcy5lbmQuY2FyZGluYWwgPT09IGNhcmRpbmFsKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyB0cnlpbmcgZW5kIHNldCB0aGUgc2FtZSBhbHJlYWR5IGNvbm5lY3RlZCBhbmNob3JcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5zdGFydCAmJiB0aGlzLnN0YXJ0LnNoYXBlICYmIHRoaXMuc3RhcnQuc2hhcGUuaWQgPT09IHNoYXBlLmlkKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyB0cnlpbmcgZW5kIHNob3J0IGNpcmN1aXQgdGhlIHJlY3RhbmdsZVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KG9wYWNpdHkpIHtcclxuICAgIGNvbnN0IGFuY2hvcnMgPSB0aGlzLmNhbnZhcy5nZXRPYmplY3RzKClcclxuICAgICAgLmZpbHRlcigobykgPT4gby50eXBlID09PSAnYW5jaG9yJyk7XHJcblxyXG4gICAgLy8gY29uc3QgcHJvbWlzZXMgPSBbXTtcclxuICAgIC8vIGNvbnN0IHByb21pc2VGYWN0b3J5ID0gZnVuY3Rpb24gKGFuY2hvcikge1xyXG4gICAgLy8gICByZXR1cm4gZnVuY3Rpb24gKHJlc29sdmUpIHtcclxuICAgIC8vICAgICBhbmNob3IuYW5pbWF0ZSgnb3BhY2l0eScsIG9wYWNpdHksIHtcclxuICAgIC8vICAgICAgIGR1cmF0aW9uOiAzMDAsXHJcbiAgICAvLyAgICAgICBvbkNoYW5nZTogcmVzb2x2ZSxcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vICAgfTtcclxuICAgIC8vIH07XHJcbiAgICAvLyBmb3IgKGxldCBhID0gMDsgYSA8IGFuY2hvcnMubGVuZ3RoOyBhICs9IDEpIHtcclxuICAgIC8vICAgaWYgKGxvY2sgIT09IHVuZGVmaW5lZCkgYW5jaG9yc1thXS5sb2NrT3BhY2l0eSA9IGxvY2s7XHJcbiAgICAvLyAgIHByb21pc2VzLnB1c2gobmV3IFByb21pc2UocHJvbWlzZUZhY3RvcnkoYW5jaG9yc1thXSkpKTtcclxuICAgIC8vIH1cclxuICAgIC8vIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IHtcclxuICAgIC8vICAgdGhpcy5jYW52YXMucmVuZGVyQWxsKCk7XHJcbiAgICAvLyB9KTtcclxuXHJcbiAgICBmb3IgKGxldCBhID0gMDsgYSA8IGFuY2hvcnMubGVuZ3RoOyBhICs9IDEpIHtcclxuICAgICAgLy8gaWYgKGxvY2sgIT09IHVuZGVmaW5lZCkgYW5jaG9yc1thXS5sb2NrT3BhY2l0eSA9IGxvY2s7XHJcbiAgICAgIGFuY2hvcnNbYV0uc2V0KCdvcGFjaXR5Jywgb3BhY2l0eSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNhbnZhcy5yZW5kZXJBbGwoKTtcclxuICB9XHJcblxyXG4gIG9uTGlua01vdmluZygpIHtcclxuICAgIC8vIE1vdmUgc3RhcnQsIGVuZCwgY29udHJvbCBwb2ludHMgYWx0b2dldGhlciB3aXRoIHRoZSBQYXRoXHJcbiAgICBjb25zdCB0b1VwZGF0ZSA9IFtcclxuICAgICAgdGhpcy5hcnJvd0hlYWQsXHJcbiAgICAgIHRoaXMuYXJyb3dUYWlsLFxyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdCBrZWVwSGVhZEFuZ2xlID0gdGhpcy5hcnJvd0hlYWQuYW5nbGU7XHJcbiAgICBjb25zdCBrZWVwVGFpbEFuZ2xlID0gdGhpcy5hcnJvd1RhaWwuYW5nbGU7XHJcblxyXG4gICAgdG9VcGRhdGUuZm9yRWFjaCgobykgPT4ge1xyXG4gICAgICBpZiAoIW8ucmVsYXRpb25zaGlwKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHsgcmVsYXRpb25zaGlwIH0gPSBvO1xyXG4gICAgICBjb25zdCBuZXdUcmFuc2Zvcm0gPSBmYWJyaWMudXRpbC5tdWx0aXBseVRyYW5zZm9ybU1hdHJpY2VzKFxyXG4gICAgICAgIHRoaXMucGF0aC5jYWxjVHJhbnNmb3JtTWF0cml4KCksXHJcbiAgICAgICAgcmVsYXRpb25zaGlwLFxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBvcHQgPSBmYWJyaWMudXRpbC5xckRlY29tcG9zZShuZXdUcmFuc2Zvcm0pO1xyXG4gICAgICBvLnNldCh7XHJcbiAgICAgICAgZmxpcFg6IGZhbHNlLFxyXG4gICAgICAgIGZsaXBZOiBmYWxzZSxcclxuICAgICAgfSk7XHJcbiAgICAgIG8uc2V0UG9zaXRpb25CeU9yaWdpbihcclxuICAgICAgICB7IHg6IG9wdC50cmFuc2xhdGVYLCB5OiBvcHQudHJhbnNsYXRlWSB9LFxyXG4gICAgICAgICdjZW50ZXInLFxyXG4gICAgICAgICdjZW50ZXInLFxyXG4gICAgICApO1xyXG4gICAgICBvLnNldChvcHQpO1xyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cclxuICAgICAgby5hbmdsZSA9IChvID09PSB0aGlzLmFycm93SGVhZCkgPyBrZWVwSGVhZEFuZ2xlIDoga2VlcFRhaWxBbmdsZTsgLy8gcHJlc2VydmUgcHJldmlvdXMgYW5nbGVcclxuXHJcbiAgICAgIG8uc2V0Q29vcmRzKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBGaW5hbGx5LCBjaGVjayB0aGUgc3RhcnQgb3IgZW5kIHBvaW50cyBjYW4gYmUgY29ubmVjdGVkLlxyXG4gICAgdGhpcy5fY2hlY2tFeHRyZW1pdHlDYW5CZUNvbm5lY3RlZCgnc3RhcnQnKTtcclxuICAgIHRoaXMuX2NoZWNrRXh0cmVtaXR5Q2FuQmVDb25uZWN0ZWQoJ2VuZCcpO1xyXG4gIH1cclxuXHJcbiAgb25MaW5rTW92ZWQoKSB7XHJcbiAgICAvLyBSZXVwZGF0ZSB0aGUgUGF0aCBhY2NvcmRpbmcgZW5kIHRoZSBuZXcgY29vcmRpbmF0ZXMgb2YgYWxsIGVsZW1lbnRzXHJcbiAgICB0aGlzLnVwZGF0ZVBhdGgoe1xyXG4gICAgICBzdGFydDoge1xyXG4gICAgICAgIHg6IHRoaXMuYXJyb3dUYWlsLmxlZnQsXHJcbiAgICAgICAgeTogdGhpcy5hcnJvd1RhaWwudG9wLFxyXG4gICAgICB9LFxyXG4gICAgICBlbmQ6IHtcclxuICAgICAgICB4OiB0aGlzLmFycm93SGVhZC5sZWZ0LFxyXG4gICAgICAgIHk6IHRoaXMuYXJyb3dIZWFkLnRvcCxcclxuICAgICAgfSxcclxuICAgICAgY29tbWl0OiB0cnVlLFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQ29ubmVjdCBvciBEaXNjb25uZWN0IGRlcGVuZGluZyBvbiBleHRyZW1pdGllcyBwb3NpdGlvbnNcclxuICAgIHRoaXMuaXNWYWxpZFRhaWxDb25uZWN0aW9uTWFzay5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgIHRoaXMuaXNWYWxpZEhlYWRDb25uZWN0aW9uTWFzay5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgIHRoaXMuX2Nvbm5lY3REaXNjb25uZWN0RXh0cmVtaXR5KCdzdGFydCcpO1xyXG4gICAgdGhpcy5fY29ubmVjdERpc2Nvbm5lY3RFeHRyZW1pdHkoJ2VuZCcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGVscGVyIGVuZCBkaXNwbGF5IGEgdmFsaWQgY2lyY2xlIG1hc2sgb24gc3BlY2lmaWMgY29uZGl0aW9ucy5cclxuICAgKiBJZiB0aGUgZXh0cmVtaXR5IGlzIHRvdWNoaW5nIGFuIGFuY2hvciBvZiBhIExpbmthYmxlU2hhcGUgc3RhcnQgd2hpY2ggaXQgaXMgbm90IHlldCBjb25uZWN0ZWQgPT4gc2hvdyBHUkVFTlxyXG4gICAqIElmIHRoZSBleHRyZW1pdHkgaXMgdG91Y2hpbmcgYW4gYW5jaG9yIG9mIGEgTGlua2FibGVTaGFwZSBzdGFydCB3aGljaCBpdCBpcyBhbHJlYWR5IGNvbm5lY3RlZCBieSB0aGUgb3RoZXIgZXh0cmVtaXR5ID0+IHNob3cgUkVEXHJcbiAgICogQHBhcmFtIGRpcmVjdGlvblxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX2NoZWNrRXh0cmVtaXR5Q2FuQmVDb25uZWN0ZWQoZGlyZWN0aW9uKSB7XHJcbiAgICBjb25zdCB7IGNhbnZhcyB9ID0gdGhpcztcclxuXHJcbiAgICBsZXQgZXh0cmVtaXR5O1xyXG4gICAgbGV0IG1hc2s7XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSAnc3RhcnQnKSB7XHJcbiAgICAgIGV4dHJlbWl0eSA9IHRoaXMuYXJyb3dUYWlsO1xyXG4gICAgICBtYXNrID0gdGhpcy5pc1ZhbGlkVGFpbENvbm5lY3Rpb25NYXNrO1xyXG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdlbmQnKSB7XHJcbiAgICAgIGV4dHJlbWl0eSA9IHRoaXMuYXJyb3dIZWFkO1xyXG4gICAgICBtYXNrID0gdGhpcy5pc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrO1xyXG4gICAgfVxyXG5cclxuICAgIG1hc2subGVmdCA9IGV4dHJlbWl0eS5sZWZ0O1xyXG4gICAgbWFzay50b3AgPSBleHRyZW1pdHkudG9wO1xyXG4gICAgbWFzay5zZXRDb29yZHMoKTtcclxuICAgIG1hc2suc2V0KCdvcGFjaXR5JywgMCk7XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgaW50ZXJzZWN0cyB3aXRoIGFuY2hvclxyXG4gICAgY29uc3QgYW5jaG9ycyA9IGNhbnZhcy5nZXRPYmplY3RzKClcclxuICAgICAgLmZpbHRlcigobykgPT4gby50eXBlID09PSAnYW5jaG9yJyk7XHJcbiAgICBleHRyZW1pdHkuc2V0KCdzdHJva2UnLCAnIzAwMCcpO1xyXG4gICAgZm9yIChsZXQgYSA9IDA7IGEgPCBhbmNob3JzLmxlbmd0aDsgYSArPSAxKSB7XHJcbiAgICAgIGlmIChleHRyZW1pdHkuaW50ZXJzZWN0c1dpdGhPYmplY3QoYW5jaG9yc1thXSkpIHtcclxuICAgICAgICBtYXNrLnNldCgnb3BhY2l0eScsIDAuNSk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZENvbm5lY3Rpb24oZGlyZWN0aW9uLCBhbmNob3JzW2FdLnNoYXBlSWQsIGFuY2hvcnNbYV0uY2FyZGluYWwpKSB7XHJcbiAgICAgICAgICBtYXNrLnNldCh7XHJcbiAgICAgICAgICAgIHN0cm9rZTogJyM1N2I4NTcnLFxyXG4gICAgICAgICAgICBmaWxsOiAnIzU3Yjg1NycsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGV4dHJlbWl0eS5zZXQoJ3N0cm9rZScsICcjNWY1Jyk7XHJcbiAgICAgICAgICBjb25zdCBvcHRzID0ge1xyXG4gICAgICAgICAgICBjb21taXQ6IGZhbHNlLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIG9wdHNbZGlyZWN0aW9uXSA9IHtcclxuICAgICAgICAgICAgeDogZXh0cmVtaXR5LmxlZnQsXHJcbiAgICAgICAgICAgIHk6IGV4dHJlbWl0eS50b3AsXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbjogYW5jaG9yc1thXS5jYXJkaW5hbCxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZVBhdGgob3B0cyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG1hc2suc2V0KHtcclxuICAgICAgICAgICAgc3Ryb2tlOiAnI2VhNGYzNycsXHJcbiAgICAgICAgICAgIGZpbGw6ICcjZWE0ZjM3JyxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgZXh0cmVtaXR5LnNldCgnc3Ryb2tlJywgJyNlYTRmMzcnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhlbHBlciBlbmQgZXhlY3V0ZSBjb25uZWN0L2Rpc2Nvbm5lY3QgZGVwZW5kaW5nIG9uIHNwZWNpZmljIGNvbmRpdGlvbnMuXHJcbiAgICogSWYgdGhlIGV4dHJlbWl0eSB3YXMgY29ubmVjdGVkIEFORCBpdCBpcyBOT1QgdG91Y2hpbmcgdGhlIGFuY2hvciBhbnltb3JlID0+IGRpc2Nvbm5lY3QgaXQuXHJcbiAgICogSWYgdGhlIGV4dHJlbWl0eSB3YXMgZGlzY29ubmVjdGVkIEFORCBpdCBpcyB0b3VjaGluZyB0aGUgYW5jaG9yID0+IGNvbm5lY3QgaXQuXHJcbiAgICogQHBhcmFtIGRpcmVjdGlvblxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX2Nvbm5lY3REaXNjb25uZWN0RXh0cmVtaXR5KGRpcmVjdGlvbikge1xyXG4gICAgY29uc3QgeyBjYW52YXMgfSA9IHRoaXM7XHJcblxyXG4gICAgbGV0IGV4dHJlbWl0eTtcclxuICAgIGlmIChkaXJlY3Rpb24gPT09ICdzdGFydCcpIHtcclxuICAgICAgZXh0cmVtaXR5ID0gdGhpcy5hcnJvd1RhaWw7XHJcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ2VuZCcpIHtcclxuICAgICAgZXh0cmVtaXR5ID0gdGhpcy5hcnJvd0hlYWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgaW50ZXJzZWN0cyB3aXRoIGFuY2hvclxyXG4gICAgY29uc3QgYW5jaG9ycyA9IGNhbnZhcy5nZXRPYmplY3RzKClcclxuICAgICAgLmZpbHRlcigobykgPT4gby50eXBlID09PSAnYW5jaG9yJyk7XHJcbiAgICBmb3IgKGxldCBhID0gMDsgYSA8IGFuY2hvcnMubGVuZ3RoOyBhICs9IDEpIHtcclxuICAgICAgaWYgKGV4dHJlbWl0eS5pbnRlcnNlY3RzV2l0aE9iamVjdChhbmNob3JzW2FdKSkge1xyXG4gICAgICAgIHRoaXMuY29ubmVjdExpbmsoZGlyZWN0aW9uLCBhbmNob3JzW2FdLnNoYXBlSWQsIGFuY2hvcnNbYV0uY2FyZGluYWwpO1xyXG4gICAgICAgIC8vIGFuY2hvcnNbYV0uc2V0KCdzdHJva2UnLCAnIzAwMCcpO1xyXG4gICAgICAgIGV4dHJlbWl0eS5zZXQoJ3N0cm9rZScsICcjMDAwJyk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpc1tkaXJlY3Rpb25dICYmIGFuY2hvcnNbYV0gPT09IHRoaXNbZGlyZWN0aW9uXS5zaGFwZS5hbmNob3JzW3RoaXNbZGlyZWN0aW9uXS5hbmNob3JdKSB7XHJcbiAgICAgICAgLy8gSWYgdGhpcyBsaW5rIHdhcyBjb25uZWN0ZWQgZW5kIHRoaXMgYW5jaG9yIGFuZCBpdCBkb2Vzbid0IGludGVyc2VjdCBhbnltb3JlXHJcbiAgICAgICAgdGhpcy5kaXNjb25uZWN0TGluayhkaXJlY3Rpb24pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBMaW5rYWJsZVNoYXBlIGZyb20gJy4vTGlua2FibGVTaGFwZS5qcyc7XHJcbmltcG9ydCBDdXJ2ZWRMaW5rIGZyb20gJy4vQ3VydmVkTGluay5qcyc7XHJcblxyXG5jb25zdCB7IGZhYnJpYywgXyB9ID0gd2luZG93O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhwYW5kYWJsZUNvbnRhaW5lciBleHRlbmRzIExpbmthYmxlU2hhcGUge1xyXG4gIC8qKlxyXG4gICAqIEEgQ29udGFpbmVyIGlzIGEgUmVjdCB3aXRoIGFuIElUZXh0LiBDYW4gYmUgZXhwYW5kZWQgdG8gcmV2ZWFsIGNvbnRhaW5lZCBTaGFwZXMuXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIG9wdGlvbnNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7RmFicmljLkNhbnZhc30gICBvcHRpb25zLmNhbnZhcyAtIEZhYnJpYyBjYW52YXNcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgb3B0aW9ucy5pZCAtIFVuaXF1ZSBpZGVudGlmaWVyIChwaHlzaWNhbCBpZCBvZiB0aGUgb2JqZWN0KVxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBvcHRpb25zLndpZHRoXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIG9wdGlvbnMuaGVpZ2h0XHJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG9wdGlvbnMubGFiZWxcclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgb3B0aW9ucy5pbWdcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgb3B0aW9ucy5pbWcuc3JjIC0gVVJMIG9mIGFuIGljb24gKHJlcHJlc2VudGluZyB0aGUgdHlwZSBvZiB0aGUgb2JqZWN0KVxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBvcHRpb25zLmNoaWxkV2lkdGhcclxuICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgb3B0aW9ucy5jaGlsZEhlaWdodFxyXG4gICAqIEBwYXJhbSB7QXJyYXl9ICAgICAgICAgICBvcHRpb25zLmNoaWxkcmVuXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG9wdGlvbnMuY2hpbGRyZW4uJC5pZCAtIFVuaXF1ZSBjaGlsZHJlbiBpZGVudGlmaWVyIChwaHlzaWNhbCBpZCBvZiB0aGUgY2hpbGQpXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG9wdGlvbnMuY2hpbGRyZW4uJC5sYWJlbFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBvcHRpb25zLmNoaWxkcmVuLiQuaW5kZXhcclxuICAgKiBAcGFyYW4ge09iamVjdH0gICAgICAgICAgb3B0aW9ucy5jaGlsZHJlbi4kLmltZ1xyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICBvcHRpb25zLmNoaWxkcmVuLiQuaW1nLnNyYyAtIFVSTCBvZiBhbiBpY29uIChyZXByZXNlbnRpbmcgdGhlIHR5cGUgb2YgdGhlIG9iamVjdClcclxuICAgKlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGdyb3VwID0gbmV3IGZhYnJpYy5Hcm91cChbXSwge1xyXG4gICAgICBsZWZ0OiBvcHRpb25zLmxlZnQsXHJcbiAgICAgIHRvcDogb3B0aW9ucy50b3AsXHJcbiAgICAgIG9yaWdpblg6ICdsZWZ0JyxcclxuICAgICAgb3JpZ2luWTogJ3RvcCcsXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IG5ld09wdGlvbnMgPSBfLmNsb25lRGVlcChfLm9taXQob3B0aW9ucywgWydjYW52YXMnLCAnc2hhcGUnXSkpO1xyXG4gICAgbmV3T3B0aW9ucy5jYW52YXMgPSBvcHRpb25zLmNhbnZhcztcclxuICAgIG5ld09wdGlvbnMuc2hhcGUgPSBncm91cDtcclxuICAgIHN1cGVyKG5ld09wdGlvbnMpO1xyXG5cclxuICAgIHRoaXMuc2hhcGVzID0ge307XHJcbiAgICB0aGlzLmNoaWxkcmVuID0gQXJyYXkuaXNBcnJheShvcHRpb25zLmNoaWxkcmVuKSA/IG9wdGlvbnMuY2hpbGRyZW4gOiBbXTtcclxuICAgIHRoaXMuaXNFeHBhbmRlZCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgbG9hZChpc0NoaWxkKSB7XHJcbiAgICBjb25zdCB7IG9wdGlvbnMsIHNoYXBlIH0gPSB0aGlzO1xyXG5cclxuICAgIHRoaXMuaXNMb2FkZWQgPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdCBzaGFwZVBvcyA9IHtcclxuICAgICAgbGVmdDogdGhpcy5zaGFwZS5sZWZ0LFxyXG4gICAgICB0b3A6IHRoaXMuc2hhcGUudG9wLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHBhZGRpbmcgPSAxMDtcclxuICAgIGNvbnN0IG1hcmdpbiA9IDEwO1xyXG4gICAgY29uc3QgcmVjdE9wdHMgPSB7XHJcbiAgICAgIGxlZnQ6IDAsXHJcbiAgICAgIHRvcDogMCxcclxuICAgICAgb3JpZ2luWDogJ2xlZnQnLFxyXG4gICAgICBvcmlnaW5ZOiAndG9wJyxcclxuICAgICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAgIHN0cm9rZTogJyMwMDAnLFxyXG4gICAgICBmaWxsOiAnI2ZmZicsXHJcbiAgICAgIHJ4OiA0LFxyXG4gICAgICByeTogNCxcclxuICAgIH07XHJcbiAgICBsZXQgaW1nT3B0cztcclxuICAgIGlmIChpc0NoaWxkKSB7XHJcbiAgICAgIHJlY3RPcHRzLndpZHRoID0gb3B0aW9ucy53aWR0aCA/IG9wdGlvbnMud2lkdGggOiA3MDtcclxuICAgICAgcmVjdE9wdHMuaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQgPyBvcHRpb25zLmhlaWdodCA6IDcwO1xyXG4gICAgICAvLyBpbWdPcHRzID0ge1xyXG4gICAgICAvLyAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICAvLyAgIG9yaWdpblk6ICd0b3AnLFxyXG4gICAgICAvLyAgIGxlZnQ6IHJlY3RPcHRzLndpZHRoIC8gMixcclxuICAgICAgLy8gICB0b3A6IHBhZGRpbmcsXHJcbiAgICAgIC8vICAgd2lkdGg6IDIyLFxyXG4gICAgICAvLyAgIGhlaWdodDogMjIsXHJcbiAgICAgIC8vIH07XHJcbiAgICAgIGltZ09wdHMgPSB7XHJcbiAgICAgICAgb3JpZ2luWDogJ2xlZnQnLFxyXG4gICAgICAgIG9yaWdpblk6ICd0b3AnLFxyXG4gICAgICAgIGxlZnQ6IHBhZGRpbmcsXHJcbiAgICAgICAgdG9wOiBwYWRkaW5nLFxyXG4gICAgICAgIHdpZHRoOiAyMixcclxuICAgICAgICBoZWlnaHQ6IDIyLFxyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaW1nT3B0cyA9IHtcclxuICAgICAgICBvcmlnaW5YOiAnbGVmdCcsXHJcbiAgICAgICAgb3JpZ2luWTogJ3RvcCcsXHJcbiAgICAgICAgbGVmdDogcGFkZGluZyxcclxuICAgICAgICB0b3A6IHBhZGRpbmcsXHJcbiAgICAgICAgd2lkdGg6IDIyLFxyXG4gICAgICAgIGhlaWdodDogMjIsXHJcbiAgICAgIH07XHJcbiAgICAgIHJlY3RPcHRzLndpZHRoID0gb3B0aW9ucy53aWR0aCA/IG9wdGlvbnMud2lkdGggOiAyMDA7XHJcbiAgICAgIHJlY3RPcHRzLmhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0ID8gb3B0aW9ucy5oZWlnaHQgOiAoaW1nT3B0cy5oZWlnaHQgKyBwYWRkaW5nICogMik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ3JlYXRlIFJlY3Qgc2hhcGVcclxuICAgIGNvbnN0IHJlY3QgPSBuZXcgZmFicmljLlJlY3QocmVjdE9wdHMpO1xyXG4gICAgdGhpcy5zaGFwZS5hZGRXaXRoVXBkYXRlKHJlY3QpO1xyXG4gICAgdGhpcy5zaGFwZXMucmVjdCA9IHJlY3Q7XHJcblxyXG4gICAgbGV0IHRleHRPcHRzO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5pbWcgJiYgdGhpcy5vcHRpb25zLmltZy5zcmMpIHtcclxuICAgICAgLy8gTG9hZCBpbWFnZSBhbmQgY3JlYXRlIEltYWdlIHNoYXBlXHJcbiAgICAgIGNvbnN0IG9JbWcgPSBhd2FpdCB0aGlzLl9sb2FkSW1hZ2UodGhpcy5vcHRpb25zLmltZy5zcmMpO1xyXG4gICAgICBvSW1nLnNldChpbWdPcHRzKTtcclxuICAgICAgdGhpcy5zaGFwZS5hZGRXaXRoVXBkYXRlKG9JbWcpO1xyXG4gICAgICB0aGlzLnNoYXBlcy5pbWFnZSA9IG9JbWc7XHJcblxyXG4gICAgICBpZiAoaXNDaGlsZCkge1xyXG4gICAgICAgIC8vIEFsaWduIHRoZSB0ZXh0IHdpdGhpbiB0aGUgcmVjdGFuZ2xlLCB1bmRlciB0aGUgaW1hZ2VcclxuICAgICAgICAvLyBDZW50ZXIgdGhlIHRleHQgaW4gdGhlIHJlY3RcclxuICAgICAgICAvLyB0ZXh0T3B0cyA9IHtcclxuICAgICAgICAvLyAgIHN0eWxlczogeyB9LFxyXG4gICAgICAgIC8vICAgZm9udFNpemU6IDE0LFxyXG4gICAgICAgIC8vICAgZm9udEZhbWlseTogJ0hlbHZldGljYScsXHJcbiAgICAgICAgLy8gICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgIC8vICAgc3BsaXRCeUdyYXBoZW1lOiB0cnVlLFxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgICAvLyAgIG9yaWdpblk6ICd0b3AnLFxyXG4gICAgICAgIC8vICAgbGVmdDogcmVjdC53aWR0aCAvIDIsXHJcbiAgICAgICAgLy8gICB0b3A6IHBhZGRpbmcgKyBpbWdPcHRzLmhlaWdodCArIG1hcmdpbixcclxuICAgICAgICAvLyAgIHdpZHRoOiByZWN0T3B0cy53aWR0aCAtIHBhZGRpbmcgKiAyLFxyXG4gICAgICAgIC8vICAgaGVpZ2h0OiByZWN0T3B0cy5oZWlnaHQgLSBwYWRkaW5nICogMixcclxuICAgICAgICAvLyB9O1xyXG5cclxuICAgICAgICB0ZXh0T3B0cyA9IHtcclxuICAgICAgICAgIHN0eWxlczogeyB9LFxyXG4gICAgICAgICAgZm9udFNpemU6IDE0LFxyXG4gICAgICAgICAgZm9udEZhbWlseTogJ0hlbHZldGljYScsXHJcbiAgICAgICAgICB0ZXh0QWxpZ246ICdsZWZ0JyxcclxuICAgICAgICAgIHNwbGl0QnlHcmFwaGVtZTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICBvcmlnaW5YOiAnbGVmdCcsXHJcbiAgICAgICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgICAgIGxlZnQ6IHBhZGRpbmcgKyBvSW1nLndpZHRoICsgbWFyZ2luLFxyXG4gICAgICAgICAgdG9wOiBwYWRkaW5nICsgb0ltZy5oZWlnaHQgLyAyLFxyXG4gICAgICAgICAgd2lkdGg6IHJlY3Qud2lkdGggLSBwYWRkaW5nIC0gb0ltZy53aWR0aCAtIG1hcmdpbiAqIDIsXHJcbiAgICAgICAgICBoZWlnaHQ6IG9JbWcuaGVpZ2h0LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gQWxpZ24gdGhlIHRleHQgd2l0aCB0aGUgaW1hZ2VcclxuICAgICAgICB0ZXh0T3B0cyA9IHtcclxuICAgICAgICAgIHN0eWxlczogeyB9LFxyXG4gICAgICAgICAgZm9udFNpemU6IDE0LFxyXG4gICAgICAgICAgZm9udEZhbWlseTogJ0hlbHZldGljYScsXHJcbiAgICAgICAgICB0ZXh0QWxpZ246ICdsZWZ0JyxcclxuICAgICAgICAgIHNwbGl0QnlHcmFwaGVtZTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICBvcmlnaW5YOiAnbGVmdCcsXHJcbiAgICAgICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgICAgIGxlZnQ6IHBhZGRpbmcgKyBvSW1nLndpZHRoICsgbWFyZ2luLFxyXG4gICAgICAgICAgdG9wOiBwYWRkaW5nICsgb0ltZy5oZWlnaHQgLyAyLFxyXG4gICAgICAgICAgd2lkdGg6IHJlY3Qud2lkdGggLSBwYWRkaW5nIC0gb0ltZy53aWR0aCAtIG1hcmdpbiAqIDIsXHJcbiAgICAgICAgICBoZWlnaHQ6IG9JbWcuaGVpZ2h0LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIENlbnRlciB0aGUgdGV4dCBpbiB0aGUgcmVjdFxyXG4gICAgICB0ZXh0T3B0cyA9IHtcclxuICAgICAgICBzdHlsZXM6IHsgfSxcclxuICAgICAgICBmb250U2l6ZTogMTQsXHJcbiAgICAgICAgZm9udEZhbWlseTogJ0hlbHZldGljYScsXHJcbiAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICBzcGxpdEJ5R3JhcGhlbWU6IHRydWUsXHJcblxyXG4gICAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICAgIGxlZnQ6IHJlY3Qud2lkdGggLyAyLFxyXG4gICAgICAgIHRvcDogcmVjdC5oZWlnaHQgLyAyLFxyXG4gICAgICAgIHdpZHRoOiByZWN0T3B0cy53aWR0aCAtIHBhZGRpbmcgKiAyLFxyXG4gICAgICAgIGhlaWdodDogcmVjdE9wdHMuaGVpZ2h0IC0gcGFkZGluZyAqIDIsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ3JlYXRlIFRleHRib3ggc2hhcGVcclxuICAgIGNvbnN0IHRleHQgPSBuZXcgZmFicmljLlRleHRib3gob3B0aW9ucy5sYWJlbCwgdGV4dE9wdHMpO1xyXG4gICAgaWYgKCFvcHRpb25zLmhpZGVUZXh0KSB7XHJcbiAgICAgIHRoaXMuc2hhcGUuYWRkV2l0aFVwZGF0ZSh0ZXh0KTtcclxuICAgIH1cclxuICAgIHRoaXMuc2hhcGVzLnRleHQgPSB0ZXh0O1xyXG5cclxuICAgIC8vIFJlcG9zaXRpb24gdGhlIGdyb3VwIGFjY29yZGluZ2x5XHJcbiAgICB0aGlzLnNoYXBlLmxlZnQgPSBzaGFwZVBvcy5sZWZ0O1xyXG4gICAgdGhpcy5zaGFwZS50b3AgPSBzaGFwZVBvcy50b3A7XHJcbiAgICB0aGlzLnNoYXBlLnNldENvb3JkcygpO1xyXG4gICAgdGhpcy5jYW52YXMucmVuZGVyQWxsKCk7XHJcblxyXG4gICAgLy8gU2V0IHRoZSBzaGFwZSBhcyBub3Qgc2VsZWN0YWJsZSBpZiBpdCBpcyBhIGNoaWxkXHJcbiAgICBpZiAoaXNDaGlsZCkge1xyXG4gICAgICB0aGlzLnNoYXBlLnNlbGVjdGFibGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZW1lbWJlciBpbml0aWFsIG9wdGlvbnMgYXMgY29sbGFwc2VkXHJcbiAgICB0aGlzLmluaXRpYWxPcHRzID0ge1xyXG4gICAgICByZWN0OiB7XHJcbiAgICAgICAgd2lkdGg6IHJlY3RPcHRzLndpZHRoLFxyXG4gICAgICAgIGhlaWdodDogcmVjdE9wdHMuaGVpZ2h0LFxyXG4gICAgICB9LFxyXG4gICAgICBjaGlsZDoge1xyXG4gICAgICAgIHdpZHRoOiBvcHRpb25zLmNoaWxkV2lkdGggPyBvcHRpb25zLmNoaWxkV2lkdGggOiA3MCxcclxuICAgICAgICBoZWlnaHQ6IG9wdGlvbnMuY2hpbGRIZWlnaHQgPyBvcHRpb25zLmNoaWxkSGVpZ2h0IDogNzAsXHJcbiAgICAgICAgLy8gd2lkdGg6IG9wdGlvbnMuY2hpbGRXaWR0aCA/IG9wdGlvbnMuY2hpbGRXaWR0aCA6IDUyLFxyXG4gICAgICAgIC8vIGhlaWdodDogb3B0aW9ucy5jaGlsZFdpZHRoID8gb3B0aW9ucy5jaGlsZFdpZHRoIDogNTIsXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENvbnN0cnVjdCBjaGlsZHJlbiBpZiB0aGlzIGlzIGEgbm9ybWFsIChwYXJlbnQpIENvbnRhaW5lclxyXG4gICAgaWYgKCFpc0NoaWxkKSB7XHJcbiAgICAgIGF3YWl0IHRoaXMuY29uc3RydWN0Q2hpbGRyZW4oKTtcclxuICAgIH1cclxuXHJcbiAgICBzaGFwZS5vbih7XHJcbiAgICAgIHNjYWxpbmc6ICgpID0+IHtcclxuICAgICAgICBpZiAodGV4dCkge1xyXG4gICAgICAgICAgLy8gV2hlbiBzY2FsaW5nLCBrZWVwIHRleHQgc2FtZSBzaXplIGFzIGluaXRpYWxcclxuICAgICAgICAgIGlmIChzaGFwZS5zY2FsZVggPCAxKSB7XHJcbiAgICAgICAgICAgIHRleHQuc2NhbGVYID0gMSArICgxIC0gc2hhcGUuc2NhbGVYKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRleHQuc2NhbGVYID0gMSAvIChzaGFwZS5zY2FsZVgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHNoYXBlLnNjYWxlWSA8IDEpIHtcclxuICAgICAgICAgICAgdGV4dC5zY2FsZVkgPSAxICsgKDEgLSBzaGFwZS5zY2FsZVkpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGV4dC5zY2FsZVkgPSAxIC8gKHNoYXBlLnNjYWxlWSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmNhbnZhcy5yZW5kZXJBbGwoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG1vdXNlZGJsY2xpY2s6ICgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5pc0V4cGFuZGVkKSB7XHJcbiAgICAgICAgICB0aGlzLmNvbGxhcHNlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuZXhwYW5kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5pc0xvYWRlZCA9IHRydWU7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBhc3luYyBfbG9hZEltYWdlKHNyYykge1xyXG4gICAgY29uc3QgdXJsID0gc3JjIHx8IHRoaXMub3B0aW9ucy5pbWcuc3JjO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIGZhYnJpYy5JbWFnZS5mcm9tVVJMKHVybCwgKG9JbWcpID0+IHtcclxuICAgICAgICByZXNvbHZlKG9JbWcpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgY29uc3RydWN0Q2hpbGRyZW4oKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGNhbnZhcywgc2hhcGUsIHNoYXBlcywgY2hpbGRyZW4sIGluaXRpYWxPcHRzLFxyXG4gICAgfSA9IHRoaXM7XHJcblxyXG4gICAgLy8gQ2FsY3VsYXRlIG5ldyBkaW1lbnNpb25zXHJcbiAgICBjb25zdCBwYWRkaW5nID0gMTA7XHJcbiAgICBjb25zdCBtYXJnaW4gPSAxMDtcclxuXHJcbiAgICBmb3IgKGxldCBjID0gMDsgYyA8IGNoaWxkcmVuLmxlbmd0aDsgYyArPSAxKSB7XHJcbiAgICAgIGNvbnN0IGNoaWxkID0gY2hpbGRyZW5bY107XHJcbiAgICAgIGNvbnN0IGNoaWxkQ29udGFpbmVyID0gbmV3IEV4cGFuZGFibGVDb250YWluZXIoe1xyXG4gICAgICAgIGNhbnZhcyxcclxuICAgICAgICBpZDogY2hpbGQuaWQsXHJcbiAgICAgICAgbGVmdDogc2hhcGUubGVmdCArIHBhZGRpbmcgKyAoaW5pdGlhbE9wdHMuY2hpbGQud2lkdGggKyBtYXJnaW4pICogYyArIChjID09PSBjaGlsZHJlbi5sZW5ndGggPyAtbWFyZ2luIDogMCksXHJcbiAgICAgICAgdG9wOiBzaGFwZS50b3AgKyBwYWRkaW5nICsgc2hhcGVzLmltYWdlLmhlaWdodCArIG1hcmdpbixcclxuICAgICAgICBhbmdsZTogMCxcclxuICAgICAgICBsYWJlbDogY2hpbGQubGFiZWwsXHJcbiAgICAgICAgaW1nOiB7XHJcbiAgICAgICAgICBzcmM6IGNoaWxkLmltZy5zcmMsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB3aWR0aDogaW5pdGlhbE9wdHMuY2hpbGQud2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OiBpbml0aWFsT3B0cy5jaGlsZC5oZWlnaHQsXHJcbiAgICAgICAgaGlkZVRleHQ6IGNoaWxkLmhpZGVUZXh0LFxyXG4gICAgICB9KTtcclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWF3YWl0LWluLWxvb3BcclxuICAgICAgYXdhaXQgY2hpbGRDb250YWluZXIubG9hZCh0cnVlKTtcclxuICAgICAgY2hpbGQuY29udGFpbmVyID0gY2hpbGRDb250YWluZXI7XHJcbiAgICB9XHJcbiAgICBzaGFwZS5hZGRXaXRoVXBkYXRlKCk7XHJcbiAgICBzaGFwZS5zZXRDb29yZHMoKTtcclxuICAgIGNhbnZhcy5yZW5kZXJBbGwoKTtcclxuICB9XHJcblxyXG4gIGV4cGFuZCgpIHtcclxuICAgIGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCAhPT0gMCAmJiB0aGlzLmlzRXhwYW5kZWQgPT09IGZhbHNlKSB7XHJcbiAgICAgIGNvbnN0IHtcclxuICAgICAgICBjYW52YXMsIHNoYXBlLCBzaGFwZXMsIGNoaWxkcmVuLCBpbml0aWFsT3B0cyxcclxuICAgICAgfSA9IHRoaXM7XHJcblxyXG4gICAgICAvLyBDYWxjdWxhdGUgbmV3IGRpbWVuc2lvbnNcclxuICAgICAgY29uc3QgcGFkZGluZyA9IDEwO1xyXG4gICAgICBjb25zdCBtYXJnaW4gPSAxMDtcclxuICAgICAgY29uc3Qgb2xkUmVjdFdpZHRoID0gc2hhcGVzLnJlY3Qud2lkdGg7XHJcbiAgICAgIGNvbnN0IG9sZFJlY3RIZWlnaHQgPSBzaGFwZXMucmVjdC5oZWlnaHQ7XHJcblxyXG4gICAgICBjb25zdCBuZXdSZWN0V2lkdGggPSBNYXRoLm1heChwYWRkaW5nICogMiArIGNoaWxkcmVuLmxlbmd0aCAqIGluaXRpYWxPcHRzLmNoaWxkLndpZHRoXHJcbiAgICAgICAgKyAoY2hpbGRyZW4ubGVuZ3RoIC0gMSkgKiBtYXJnaW4sIGluaXRpYWxPcHRzLnJlY3Qud2lkdGgpO1xyXG4gICAgICBjb25zdCBuZXdSZWN0SGVpZ2h0ID0gY2hpbGRyZW4ubGVuZ3RoID4gMCA/IHBhZGRpbmcgKyBzaGFwZXMuaW1hZ2UuaGVpZ2h0ICsgbWFyZ2luXHJcbiAgICAgICAgKyBpbml0aWFsT3B0cy5jaGlsZC5oZWlnaHQgKyBwYWRkaW5nIDogaW5pdGlhbE9wdHMucmVjdC5oZWlnaHQ7XHJcblxyXG4gICAgICAvLyBSZXNpemUgZXhpc3Rpbmcgc2hhcGVzXHJcbiAgICAgIHNoYXBlcy5yZWN0LndpZHRoID0gbmV3UmVjdFdpZHRoO1xyXG4gICAgICBzaGFwZXMucmVjdC5oZWlnaHQgPSBuZXdSZWN0SGVpZ2h0O1xyXG4gICAgICBzaGFwZXMucmVjdC5zZXRDb29yZHMoKTtcclxuICAgICAgc2hhcGVzLnRleHQud2lkdGggPSBuZXdSZWN0V2lkdGggLSAoc2hhcGVzLmltYWdlLndpZHRoICsgcGFkZGluZyArIG1hcmdpbik7XHJcbiAgICAgIHNoYXBlcy50ZXh0LnRleHRBbGlnbiA9ICdsZWZ0JztcclxuICAgICAgc2hhcGVzLnRleHQuc2V0Q29vcmRzKCk7XHJcblxyXG4gICAgICAvLyBBZGQgY2hpbGRyZW4gY29udGFpbmVyc1xyXG4gICAgICBmb3IgKGxldCBjID0gMDsgYyA8IGNoaWxkcmVuLmxlbmd0aDsgYyArPSAxKSB7XHJcbiAgICAgICAgY29uc3QgY2hpbGQgPSBjaGlsZHJlbltjXTtcclxuICAgICAgICBjaGlsZC5jb250YWluZXIuc2hhcGUubGVmdCA9IHNoYXBlLmxlZnQgKyBwYWRkaW5nXHJcbiAgICAgICAgICArIChpbml0aWFsT3B0cy5jaGlsZC53aWR0aCArIG1hcmdpbikgKiBjICsgKGMgPT09IGNoaWxkcmVuLmxlbmd0aCA/IC1tYXJnaW4gOiAwKTtcclxuICAgICAgICBjaGlsZC5jb250YWluZXIuc2hhcGUudG9wID0gc2hhcGUudG9wICsgcGFkZGluZyArIHNoYXBlcy5pbWFnZS5oZWlnaHQgKyBtYXJnaW47XHJcbiAgICAgICAgc2hhcGUuYWRkV2l0aFVwZGF0ZShjaGlsZC5jb250YWluZXIuc2hhcGUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBVcGRhdGUgdGhlIGNvbnRhaW5lciBjb29yZHNcclxuICAgICAgc2hhcGUuYWRkV2l0aFVwZGF0ZSgpO1xyXG4gICAgICBzaGFwZS5zZXRDb29yZHMoKTtcclxuICAgICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcclxuICAgICAgdGhpcy5zaGFwZS5maXJlKCdtb2RpZmllZCcpO1xyXG5cclxuICAgICAgLy8gVXBkYXRlIGFsbCBvdGhlciBjb250YWluZXJzIHRoYXQgYXJlIGJlbG93IGFuZC9vciBvbiB0aGUgcmlnaHQgb2YgdGhlIGN1cnJlbnQgc2hhcGUsIHRvIGF2b2lkIGNvbGxpc2lvblxyXG4gICAgICBzaGFwZXMucmVjdC5vcGFjaXR5ID0gMC43O1xyXG4gICAgICBjb25zdCBvdGhlclNoYXBlcyA9IE9iamVjdC52YWx1ZXMoY2FudmFzLmxpbmthYmxlU2hhcGVzKTtcclxuICAgICAgaWYgKG90aGVyU2hhcGVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICBjb25zdCBkZWx0YVggPSBuZXdSZWN0V2lkdGggLSBvbGRSZWN0V2lkdGg7XHJcbiAgICAgICAgY29uc3QgZGVsdGFZID0gbmV3UmVjdEhlaWdodCAtIG9sZFJlY3RIZWlnaHQ7XHJcbiAgICAgICAgZm9yIChsZXQgbyA9IDA7IG8gPCBvdGhlclNoYXBlcy5sZW5ndGg7IG8gKz0gMSkge1xyXG4gICAgICAgICAgY29uc3Qgc2hhcGVUb01vdmUgPSBvdGhlclNoYXBlc1tvXTtcclxuICAgICAgICAgIGlmIChzaGFwZVRvTW92ZS5pZCAhPT0gdGhpcy5pZCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zaGFwZS5sZWZ0IDw9IHNoYXBlVG9Nb3ZlLnNoYXBlLmFDb29yZHMuYnIueCAmJiB0aGlzLnNoYXBlLnRvcCA8PSBzaGFwZVRvTW92ZS5zaGFwZS5hQ29vcmRzLmJyLnkpIHtcclxuICAgICAgICAgICAgICBzaGFwZVRvTW92ZS5tb3ZlKHtcclxuICAgICAgICAgICAgICAgIHg6IHNoYXBlVG9Nb3ZlLnNoYXBlLmxlZnQgKyBkZWx0YVgsXHJcbiAgICAgICAgICAgICAgICB5OiBzaGFwZVRvTW92ZS5zaGFwZS50b3AgKyBkZWx0YVksXHJcbiAgICAgICAgICAgICAgICBtb3Zpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2tpcENvbGxpc2lvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgY2FudmFzLnJlbmRlckFsbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaXNFeHBhbmRlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBjb2xsYXBzZSgpIHtcclxuICAgIGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCAhPT0gMCAmJiB0aGlzLmlzRXhwYW5kZWQgPT09IHRydWUpIHtcclxuICAgICAgY29uc3Qge1xyXG4gICAgICAgIGNhbnZhcywgc2hhcGUsIHNoYXBlcywgY2hpbGRyZW4sIGluaXRpYWxPcHRzLFxyXG4gICAgICB9ID0gdGhpcztcclxuXHJcbiAgICAgIC8vIENhbGN1bGF0ZSBuZXcgZGltZW5zaW9uc1xyXG4gICAgICBjb25zdCBwYWRkaW5nID0gMTA7XHJcbiAgICAgIGNvbnN0IG1hcmdpbiA9IDEwO1xyXG4gICAgICBjb25zdCBvbGRSZWN0V2lkdGggPSBzaGFwZXMucmVjdC53aWR0aDtcclxuICAgICAgY29uc3Qgb2xkUmVjdEhlaWdodCA9IHNoYXBlcy5yZWN0LmhlaWdodDtcclxuXHJcbiAgICAgIGNvbnN0IG5ld1JlY3RXaWR0aCA9IGluaXRpYWxPcHRzLnJlY3Qud2lkdGg7XHJcbiAgICAgIGNvbnN0IG5ld1JlY3RIZWlnaHQgPSBpbml0aWFsT3B0cy5yZWN0LmhlaWdodDtcclxuXHJcbiAgICAgIC8vIFJlc2l6ZSBleGlzdGluZyBzaGFwZXNcclxuICAgICAgc2hhcGVzLnJlY3Qud2lkdGggPSBuZXdSZWN0V2lkdGg7XHJcbiAgICAgIHNoYXBlcy5yZWN0LmhlaWdodCA9IG5ld1JlY3RIZWlnaHQ7XHJcbiAgICAgIHNoYXBlcy5yZWN0LnNldENvb3JkcygpO1xyXG4gICAgICBzaGFwZXMudGV4dC53aWR0aCA9IG5ld1JlY3RXaWR0aCAtIChzaGFwZXMuaW1hZ2Uud2lkdGggKyBwYWRkaW5nICogMiArIG1hcmdpbik7XHJcbiAgICAgIHNoYXBlcy50ZXh0LnRleHRBbGlnbiA9ICdsZWZ0JztcclxuICAgICAgc2hhcGVzLnRleHQuc2V0Q29vcmRzKCk7XHJcblxyXG4gICAgICAvLyBSZW1vdmUgY2hpbGRyZW4gY29udGFpbmVyc1xyXG4gICAgICBmb3IgKGxldCBjID0gMDsgYyA8IGNoaWxkcmVuLmxlbmd0aDsgYyArPSAxKSB7XHJcbiAgICAgICAgY29uc3QgY2hpbGQgPSBjaGlsZHJlbltjXTtcclxuICAgICAgICBjaGlsZC5jb250YWluZXIubGVmdCA9IHNoYXBlLmxlZnQgKyBwYWRkaW5nXHJcbiAgICAgICAgICArIChpbml0aWFsT3B0cy5jaGlsZC53aWR0aCArIG1hcmdpbikgKiBjICsgKGMgPT09IGNoaWxkcmVuLmxlbmd0aCA/IC1tYXJnaW4gOiAwKTtcclxuICAgICAgICBjaGlsZC5jb250YWluZXIudG9wID0gc2hhcGUudG9wICsgcGFkZGluZyArIHNoYXBlcy5pbWFnZS5oZWlnaHQgKyBtYXJnaW47XHJcbiAgICAgICAgc2hhcGUucmVtb3ZlKGNoaWxkLmNvbnRhaW5lci5zaGFwZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFVwZGF0ZSB0aGUgY29udGFpbmVyIGNvb3Jkc1xyXG4gICAgICBzaGFwZS5hZGRXaXRoVXBkYXRlKCk7XHJcbiAgICAgIHNoYXBlLnNldENvb3JkcygpO1xyXG4gICAgICB0aGlzLnNoYXBlLmZpcmUoJ21vZGlmaWVkJyk7XHJcblxyXG4gICAgICAvLyBVcGRhdGUgYWxsIG90aGVyIGNvbnRhaW5lcnMgdGhhdCBhcmUgYmVsb3cgYW5kL29yIG9uIHRoZSByaWdodCBvZiB0aGUgY3VycmVudCBzaGFwZSwgdG8gYXZvaWQgY29sbGlzaW9uXHJcbiAgICAgIHNoYXBlcy5yZWN0Lm9wYWNpdHkgPSAxO1xyXG4gICAgICBjb25zdCBvdGhlclNoYXBlcyA9IE9iamVjdC52YWx1ZXMoY2FudmFzLmxpbmthYmxlU2hhcGVzKTtcclxuICAgICAgaWYgKG90aGVyU2hhcGVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICBjb25zdCBkZWx0YVggPSBuZXdSZWN0V2lkdGggLSBvbGRSZWN0V2lkdGg7XHJcbiAgICAgICAgY29uc3QgZGVsdGFZID0gbmV3UmVjdEhlaWdodCAtIG9sZFJlY3RIZWlnaHQ7XHJcbiAgICAgICAgZm9yIChsZXQgbyA9IDA7IG8gPCBvdGhlclNoYXBlcy5sZW5ndGg7IG8gKz0gMSkge1xyXG4gICAgICAgICAgY29uc3Qgc2hhcGVUb01vdmUgPSBvdGhlclNoYXBlc1tvXTtcclxuICAgICAgICAgIGlmIChvdGhlclNoYXBlc1tvXS5pZCAhPT0gdGhpcy5pZCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zaGFwZS5sZWZ0IDw9IHNoYXBlVG9Nb3ZlLnNoYXBlLmFDb29yZHMuYnIueCAmJiB0aGlzLnNoYXBlLnRvcCA8PSBzaGFwZVRvTW92ZS5zaGFwZS5hQ29vcmRzLmJyLnkpIHtcclxuICAgICAgICAgICAgICBzaGFwZVRvTW92ZS5tb3ZlKHtcclxuICAgICAgICAgICAgICAgIHg6IHNoYXBlVG9Nb3ZlLnNoYXBlLmxlZnQgKyBkZWx0YVgsXHJcbiAgICAgICAgICAgICAgICB5OiBzaGFwZVRvTW92ZS5zaGFwZS50b3AgKyBkZWx0YVksXHJcbiAgICAgICAgICAgICAgICBtb3Zpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjYW52YXMucmVuZGVyQWxsKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmlzRXhwYW5kZWQgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGFzeW5jIF9vbkFuY2hvclJpZ2h0Q2xpY2sob3B0aW9ucykge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBpZCwgbGVmdCwgdG9wLCBhbmdsZSwgY2FudmFzLCB3aWR0aCwgaGVpZ2h0LFxyXG4gICAgfSA9IHRoaXMuc2hhcGU7XHJcbiAgICBjb25zdCBhcCA9IG9wdGlvbnMudGFyZ2V0O1xyXG4gICAgY29uc3QgeyBjYXJkaW5hbCB9ID0gYXA7XHJcbiAgICBjb25zdCBzcGFjaW5nID0gNTA7XHJcblxyXG4gICAgY29uc3QgbmV4dElkID0gYCR7aWR9X25leHRfJHtjYXJkaW5hbH1fJHtNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKS50b1N0cmluZygxNikuc3Vic3RyaW5nKDEpfWA7XHJcbiAgICBjb25zdCBsYWJlbCA9IGAke2lkfV9uZXh0XyR7Y2FyZGluYWx9YDtcclxuICAgIGNvbnN0IG5leHRDb250YWluZXJPcHRzID0gXy5jbG9uZURlZXAoXy5vbWl0KHRoaXMub3B0aW9ucywgWydjYW52YXMnLCAnc2hhcGUnXSkpO1xyXG4gICAgbmV4dENvbnRhaW5lck9wdHMuY2FudmFzID0gY2FudmFzO1xyXG4gICAgbmV4dENvbnRhaW5lck9wdHMuaWQgPSBuZXh0SWQ7XHJcbiAgICBuZXh0Q29udGFpbmVyT3B0cy5sZWZ0ID0gbGVmdDtcclxuICAgIG5leHRDb250YWluZXJPcHRzLnRvcCA9IHRvcDtcclxuICAgIG5leHRDb250YWluZXJPcHRzLmFuZ2xlID0gYW5nbGU7XHJcbiAgICBuZXh0Q29udGFpbmVyT3B0cy5sYWJlbCA9IGxhYmVsO1xyXG4gICAgbmV4dENvbnRhaW5lck9wdHMuY2hpbGRyZW4gPSBbXTtcclxuXHJcbiAgICBjb25zdCBuZXh0Q29udGFpbmVyID0gbmV3IEV4cGFuZGFibGVDb250YWluZXIobmV4dENvbnRhaW5lck9wdHMpO1xyXG4gICAgYXdhaXQgbmV4dENvbnRhaW5lci5sb2FkKCk7XHJcbiAgICBuZXh0Q29udGFpbmVyLmluamVjdCgpO1xyXG5cclxuICAgIGNvbnN0IG5ld09wdGlvbnMgPSB7fTtcclxuICAgIGxldCB0YXJnZXRDYXJkaW5hbDtcclxuICAgIHN3aXRjaCAoY2FyZGluYWwpIHtcclxuICAgICAgY2FzZSAnZWFzdCc6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICd3ZXN0JztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSB0b3A7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gbGVmdCArIHdpZHRoICsgc3BhY2luZztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICd3ZXN0Jzoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ2Vhc3QnO1xyXG4gICAgICAgIG5ld09wdGlvbnMueCA9IHRvcDtcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSBsZWZ0IC0gd2lkdGggLSBzcGFjaW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRoJzoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ3NvdXRoJztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSB0b3AgLSBoZWlnaHQgLSBzcGFjaW5nO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IGxlZnQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnc291dGgnOiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnbm9ydGgnO1xyXG4gICAgICAgIG5ld09wdGlvbnMueCA9IHRvcCArIGhlaWdodCArIHNwYWNpbmc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gbGVmdDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aGVhc3QnOiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnc291dGh3ZXN0JztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSB0b3AgLSBoZWlnaHQgLSBzcGFjaW5nO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IGxlZnQgKyB3aWR0aCArIHNwYWNpbmc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnbm9ydGh3ZXN0Jzoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ3NvdXRoZWFzdCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gdG9wIC0gaGVpZ2h0IC0gc3BhY2luZztcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSBsZWZ0IC0gd2lkdGggLSBzcGFjaW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRoZWFzdCc6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICdub3J0aHdlc3QnO1xyXG4gICAgICAgIG5ld09wdGlvbnMueCA9IHRvcCArIGhlaWdodCArIHNwYWNpbmc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gbGVmdCArIHdpZHRoICsgc3BhY2luZztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aHdlc3QnOlxyXG4gICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnbm9ydGhlYXN0JztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSB0b3AgKyBoZWlnaHQgKyBzcGFjaW5nO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IGxlZnQgLSB3aWR0aCAtIHNwYWNpbmc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIG5leHRDb250YWluZXIubW92ZShuZXdPcHRpb25zKTtcclxuICAgIC8vIG5leHRDb250YWluZXIucm90YXRlKGFuZ2xlKTtcclxuXHJcbiAgICBjb25zdCBuZXdMaW5rID0gbmV3IEN1cnZlZExpbmsoe1xyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgeDogYXAubGVmdCxcclxuICAgICAgICB5OiBhcC50b3AsXHJcbiAgICAgIH0sXHJcbiAgICAgIGVuZDoge1xyXG4gICAgICAgIHg6IG5leHRDb250YWluZXIuYW5jaG9yc1t0YXJnZXRDYXJkaW5hbF0ubGVmdCxcclxuICAgICAgICB5OiBuZXh0Q29udGFpbmVyLmFuY2hvcnNbdGFyZ2V0Q2FyZGluYWxdLnRvcCxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgbmV3TGluay5pbmplY3QoY2FudmFzKTtcclxuICAgIG5ld0xpbmsuY29ubmVjdExpbmsoJ3N0YXJ0JywgYXAuc2hhcGVJZCwgYXAuY2FyZGluYWwpO1xyXG4gICAgbmV3TGluay5jb25uZWN0TGluaygnZW5kJywgbmV4dENvbnRhaW5lci5hbmNob3JzW3RhcmdldENhcmRpbmFsXS5zaGFwZUlkLFxyXG4gICAgICBuZXh0Q29udGFpbmVyLmFuY2hvcnNbdGFyZ2V0Q2FyZGluYWxdLmNhcmRpbmFsKTtcclxuICB9XHJcblxyXG4gIF9vbkFuY2hvckxlZnRDbGljayhvcHRpb25zKSB7XHJcbiAgICBjb25zdCBhcCA9IG9wdGlvbnMudGFyZ2V0O1xyXG4gICAgY29uc3QgeyBjYW52YXMgfSA9IHRoaXM7XHJcblxyXG4gICAgLy8gRGlzYWJsZSB0aGUgbXVsdGkgc2VsZWN0aW9uIHdoZW4gbW92aW5nIG1vdXNlXHJcbiAgICB0aGlzLmNhbnZhcy5zZWxlY3Rpb24gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdCBvcHBvc2l0ZUNhcmRpbmFsID0ge1xyXG4gICAgICBlYXN0OiAnd2VzdCcsXHJcbiAgICAgIHdlc3Q6ICdlYXN0JyxcclxuICAgICAgbm9ydGg6ICdzb3V0aCcsXHJcbiAgICAgIHNvdXRoOiAnbm9ydGgnLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IG5ld0xpbmsgPSBuZXcgQ3VydmVkTGluayh7XHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgc3RhcnQ6IHtcclxuICAgICAgICB4OiBhcC5sZWZ0LFxyXG4gICAgICAgIHk6IGFwLnRvcCxcclxuICAgICAgICBkaXJlY3Rpb246IGFwLmNhcmRpbmFsLFxyXG4gICAgICB9LFxyXG4gICAgICBlbmQ6IHtcclxuICAgICAgICB4OiBhcC5sZWZ0LFxyXG4gICAgICAgIHk6IGFwLnRvcCxcclxuICAgICAgICBkaXJlY3Rpb246IG9wcG9zaXRlQ2FyZGluYWxbYXAuY2FyZGluYWxdLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgICBuZXdMaW5rLmluamVjdChjYW52YXMpO1xyXG4gICAgbmV3TGluay5jb25uZWN0TGluaygnc3RhcnQnLCBhcC5zaGFwZUlkLCBhcC5jYXJkaW5hbCk7XHJcbiAgICBuZXdMaW5rLmFycm93SGVhZC5maXJlKCdtb3VzZWRvd24nKTtcclxuXHJcbiAgICBjb25zdCBvbk1vdXNlTW92ZSA9IChldmVudCkgPT4ge1xyXG4gICAgICBuZXdMaW5rLmFycm93SGVhZC5sZWZ0ID0gZXZlbnQucG9pbnRlci54O1xyXG4gICAgICBuZXdMaW5rLmFycm93SGVhZC50b3AgPSBldmVudC5wb2ludGVyLnk7XHJcbiAgICAgIG5ld0xpbmsuYXJyb3dIZWFkLmZpcmUoJ21vdmluZycpO1xyXG4gICAgfTtcclxuICAgIGNhbnZhcy5vbignbW91c2U6bW92ZScsIG9uTW91c2VNb3ZlKTtcclxuXHJcbiAgICBjb25zdCBvbk1vdXNlQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgIC8vIEVuYWJsZSBiYWNrIHRoZSBtdWx0aSBzZWxlY3Rpb24gd2hlbiBtb3ZpbmcgbW91c2VcclxuICAgICAgdGhpcy5jYW52YXMuc2VsZWN0aW9uID0gdHJ1ZTtcclxuXHJcbiAgICAgIG5ld0xpbmsuYXJyb3dIZWFkLmZpcmUoJ21vdmVkJyk7XHJcbiAgICAgIG5ld0xpbmsuYXJyb3dIZWFkLmZpcmUoJ21vdXNldXAnKTtcclxuICAgICAgY2FudmFzLm9mZignbW91c2U6bW92ZScsIG9uTW91c2VNb3ZlKTtcclxuICAgICAgY2FudmFzLm9mZignbW91c2U6dXAnLCBvbk1vdXNlQ2xpY2spO1xyXG4gICAgfTtcclxuICAgIGNhbnZhcy5vbignbW91c2U6dXAnLCBvbk1vdXNlQ2xpY2spO1xyXG4gIH1cclxufVxyXG4iLCJjb25zdCB7IGZhYnJpYyB9ID0gd2luZG93O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGluayB7XHJcbiAgLyoqXHJcbiAgICogQSBMaW5rIGlzIGEgRmFicmljLlBhdGggb2JqZWN0IHdob3NlIFN0YXJ0IGFuZCBFbmQgcG9pbnRzIGNhbiBiZSBjb25uZWN0ZWQgZW5kIGFueSBhbmNob3Igb2YgdHdvIExpbmthYmxlU2hhcGUuXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIG9wdGlvbnNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7RmFicmljLkNhbnZhc30gICBvcHRpb25zLmNhbnZhcyAtIEZhYnJpYyBjYW52YXNcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgb3B0aW9ucy5pZCAtIFVuaXF1ZSBpZGVudGlmaWVyXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuc3RhcnRdIC0gQ29vcmRpbmF0ZXMgb2YgdGhlIHN0YXJ0IHBvaW50XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIFtvcHRpb25zLnN0YXJ0LnhdIC0gWCBheGlzIGNvb3JkaW5hdGUgb2YgdGhlIHN0YXJ0IHBvaW50XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIFtvcHRpb25zLnN0YXJ0LnldIC0gWSBheGlzIGNvb3JkaW5hdGUgb2YgdGhlIHN0YXJ0IHBvaW50XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIFtvcHRpb25zLmVuZC54XSAtIFggYXhpcyBjb29yZGluYXRlIG9mIHRoZSBlbmQgcG9pbnRcclxuICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgW29wdGlvbnMuZW5kLnldIC0gWSBheGlzIGNvb3JkaW5hdGUgb2YgdGhlIGVuZCBwb2ludFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBbb3B0aW9ucy5jdXN0b21dIC0gT3B0aW9ucyBlbmQgY3VzdG9taXplIHRoZSBkaWZmZXJlbnQgc2hhcGVzIG9mIHRoZSBMaW5rXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuY3VzdG9tLnBhdGhdIC0gYmV6aWVyIHF1YWRyYXRpYyBjdXJ2ZVxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBbb3B0aW9ucy5jdXN0b20uY29udHJvbFBvaW50XSAtIGJlemllciBxdWFkcmF0aWMgY3VydmUgY29udHJvbCBwb2ludFxyXG4gICAqIEBwYXJhbSB7TGluZX0gICAgICAgICAgICBbb3B0aW9ucy5jdXN0b20uY29udHJvbExpbmVdIC0gdmlzdWFsIGxpbmVzIHN0YXJ0IHRoZSBjb250cm9sIHBvaW50IGVuZCB0aGUgc3RhcnQmZW5kIHBvaW50c1xyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBbb3B0aW9ucy5jdXN0b20uc3RhcnRQb2ludF0gLSBha2EgYXJyb3dUYWlsXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLmN1c3RvbS5lbmRQb2ludF0gLSBha2EgYXJyb3dIZWFkXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBpZCxcclxuICAgICAgY2FudmFzLFxyXG4gICAgfSA9IG9wdGlvbnM7XHJcbiAgICBjb25zdCB4MSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5zdGFydCAmJiBvcHRpb25zLnN0YXJ0LnggPyBvcHRpb25zLnN0YXJ0LnggOiAwO1xyXG4gICAgY29uc3QgeTEgPSBvcHRpb25zICYmIG9wdGlvbnMuc3RhcnQgJiYgb3B0aW9ucy5zdGFydC55ID8gb3B0aW9ucy5zdGFydC55IDogMDtcclxuICAgIGNvbnN0IHgyID0gb3B0aW9ucyAmJiBvcHRpb25zLmVuZCAmJiBvcHRpb25zLmVuZC54ID8gb3B0aW9ucy5lbmQueCA6IDA7XHJcbiAgICBjb25zdCB5MiA9IG9wdGlvbnMgJiYgb3B0aW9ucy5lbmQgJiYgb3B0aW9ucy5lbmQueSA/IG9wdGlvbnMuZW5kLnkgOiAwO1xyXG4gICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcblxyXG4gICAgLy8gUGF0aCwgYSBiZXppZXIgcXVhZHJhdGljIGN1cnZlXHJcbiAgICBjb25zdCBwYXRoQ29vcmRzID0ge1xyXG4gICAgICBNOiB7XHJcbiAgICAgICAgeDogeDEsIC8vIHN0YXJ0IHhcclxuICAgICAgICB5OiB5MSwgLy8gc3RhcnQgeVxyXG4gICAgICB9LFxyXG4gICAgICBROiB7XHJcbiAgICAgICAgeDE6ICh4MSArIHgyKSAvIDIsIC8vIGNvbnRyb2wgeFxyXG4gICAgICAgIHkxOiAoeTEgKyB5MikgLyAyLCAvLyBjb250cm9sIHlcclxuICAgICAgICB4MiwgLy8gZW5kIHhcclxuICAgICAgICB5MiwgLy8gZW5kIHlcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgICBjb25zdCBwYXRoT3B0cyA9IHRoaXMuZGVmYXVsdFBhdGhPcHRpb25zID0ge1xyXG4gICAgICBmaWxsOiAnJyxcclxuICAgICAgc3Ryb2tlOiAob3B0aW9ucy5jdXN0b20gJiYgb3B0aW9ucy5jdXN0b20ucGF0aCAmJiBvcHRpb25zLmN1c3RvbS5wYXRoLnN0cm9rZVdpZHRoKSA/IG9wdGlvbnMuY3VzdG9tLnBhdGguc3Ryb2tlIDogJyMwMDAnLFxyXG4gICAgICBzdHJva2VXaWR0aDogKG9wdGlvbnMuY3VzdG9tICYmIG9wdGlvbnMuY3VzdG9tLnBhdGggJiYgb3B0aW9ucy5jdXN0b20ucGF0aC5zdHJva2VXaWR0aCkgPyBvcHRpb25zLmN1c3RvbS5wYXRoLnN0cm9rZVdpZHRoIDogMixcclxuICAgICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAgIHNlbGVjdGFibGU6IHRydWUsXHJcbiAgICAgIGhhc0JvcmRlcnM6IHRydWUsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgICAgcGVyUGl4ZWxUYXJnZXRGaW5kOiB0cnVlLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHBhdGhTdHIgPSBgTSAke3BhdGhDb29yZHMuTS54fSAke3BhdGhDb29yZHMuTS55fSBRICR7cGF0aENvb3Jkcy5RLngxfSwgJHtwYXRoQ29vcmRzLlEueTF9LCAke3BhdGhDb29yZHMuUS54Mn0sICR7cGF0aENvb3Jkcy5RLnkyfWA7XHJcbiAgICBjb25zdCBwYXRoID0gbmV3IGZhYnJpYy5QYXRoKHBhdGhTdHIsIHBhdGhPcHRzKTtcclxuICAgIHRoaXMucGF0aCA9IHBhdGg7XHJcblxyXG4gICAgLy8gQ29udHJvbCBwb2ludCBhbmQgbGluZXMgZm9yIHRoZSBxdWFkcmF0aWMgY3VydmVcclxuICAgIGNvbnN0IGNvbnRyb2xQb2ludCA9IHRoaXMuY29udHJvbFBvaW50ID0gbmV3IGZhYnJpYy5DaXJjbGUoe1xyXG4gICAgICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgICAgbGVmdDogcGF0aENvb3Jkcy5RLngxLFxyXG4gICAgICB0b3A6IHBhdGhDb29yZHMuUS55MSxcclxuICAgICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAgIHJhZGl1czogNixcclxuICAgICAgZmlsbDogJyM3OGJlZmEnLFxyXG4gICAgICBzdHJva2U6ICcjNzhiZWZhJyxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICBoYXNCb3JkZXJzOiBmYWxzZSxcclxuICAgICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgICBvcGFjaXR5OiAwLFxyXG4gICAgfSk7XHJcbiAgICBjb250cm9sUG9pbnQub24oJ21vdXNlb3ZlcicsIHRoaXMub25MaW5rTW91c2VPdmVyLmJpbmQodGhpcykpO1xyXG4gICAgY29udHJvbFBvaW50Lm9uKCdtb3VzZW91dCcsIHRoaXMub25MaW5rTW91c2VPdXQuYmluZCh0aGlzKSk7XHJcbiAgICBjb250cm9sUG9pbnQub24oJ21vdmluZycsICgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVQYXRoKCdjb250cm9sJywgdGhpcy5jb250cm9sUG9pbnQubGVmdCwgdGhpcy5jb250cm9sUG9pbnQudG9wLCBmYWxzZSk7XHJcbiAgICB9KTtcclxuICAgIGNvbnRyb2xQb2ludC5vbignbW92ZWQnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aCgnY29udHJvbCcsIHRoaXMuY29udHJvbFBvaW50LmxlZnQsIHRoaXMuY29udHJvbFBvaW50LnRvcCwgdHJ1ZSk7XHJcbiAgICB9KTtcclxuICAgIGNvbnRyb2xQb2ludC5vbignbW91c2Vkb3duJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLmJyaW5nVG9Gcm9udCgpO1xyXG4gICAgfSk7XHJcbiAgICBjb25zdCBjb250cm9sTGluZU9wdHMgPSB7XHJcbiAgICAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgICBzdHJva2VEYXNoQXJyYXk6IFs1LCA1XSxcclxuICAgICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAgIHN0cm9rZTogJyM3OGJlZmEnLFxyXG4gICAgICBzZWxlY3RhYmxlOiBmYWxzZSxcclxuICAgICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgICAgZXZlbnRlZDogZmFsc2UsXHJcbiAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgY29udHJvbExpbmUxID0gdGhpcy5jb250cm9sTGluZTEgPSBuZXcgZmFicmljLkxpbmUoW2NvbnRyb2xQb2ludC5sZWZ0LCBjb250cm9sUG9pbnQudG9wLCB4MSwgeTFdLCBjb250cm9sTGluZU9wdHMpO1xyXG4gICAgY29udHJvbExpbmUxLm9uKCdtb3VzZW92ZXInLCB0aGlzLm9uTGlua01vdXNlT3Zlci5iaW5kKHRoaXMpKTtcclxuICAgIGNvbnRyb2xMaW5lMS5vbignbW91c2VvdXQnLCB0aGlzLm9uTGlua01vdXNlT3V0LmJpbmQodGhpcykpO1xyXG4gICAgY29uc3QgY29udHJvbExpbmUyID0gdGhpcy5jb250cm9sTGluZTIgPSBuZXcgZmFicmljLkxpbmUoW2NvbnRyb2xQb2ludC5sZWZ0LCBjb250cm9sUG9pbnQudG9wLCB4MiwgeTJdLCBjb250cm9sTGluZU9wdHMpO1xyXG4gICAgY29udHJvbExpbmUyLm9uKCdtb3VzZW92ZXInLCB0aGlzLm9uTGlua01vdXNlT3Zlci5iaW5kKHRoaXMpKTtcclxuICAgIGNvbnRyb2xMaW5lMi5vbignbW91c2VvdXQnLCB0aGlzLm9uTGlua01vdXNlT3V0LmJpbmQodGhpcykpO1xyXG5cclxuICAgIC8vIEVuZCBwb2ludCAoYXJyb3dIZWFkKVxyXG4gICAgY29uc3QgaXNWYWxpZE1hc2tPcHRzID0ge1xyXG4gICAgICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgICAgbGVmdDogcGF0aENvb3Jkcy5RLngyLFxyXG4gICAgICB0b3A6IHBhdGhDb29yZHMuUS55MixcclxuICAgICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAgIHJhZGl1czogMTYsXHJcbiAgICAgIGZpbGw6ICcjNTdiODU3JywgLy8gZWE0ZjM3XHJcbiAgICAgIHN0cm9rZTogJyM1N2I4NTcnLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAgIHNlbGVjdGFibGU6IGZhbHNlLFxyXG4gICAgICBvcGFjaXR5OiAwLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGFycm93SGVhZE9wdHMgPSB7XHJcbiAgICAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgICB3aWR0aDogMTAsXHJcbiAgICAgIGhlaWdodDogMTAsXHJcbiAgICAgIGxlZnQ6IHBhdGhDb29yZHMuUS54MixcclxuICAgICAgdG9wOiBwYXRoQ29vcmRzLlEueTIsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICBmaWxsOiAnIzAwMCcsXHJcbiAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgIHN0cm9rZTogJyMwMDAnLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIHNlbGVjdGFibGU6IHRydWUsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgYXJyb3dIZWFkID0gdGhpcy5hcnJvd0hlYWQgPSBuZXcgZmFicmljLlRyaWFuZ2xlKGFycm93SGVhZE9wdHMpO1xyXG4gICAgdGhpcy5pc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrID0gbmV3IGZhYnJpYy5DaXJjbGUoaXNWYWxpZE1hc2tPcHRzKTtcclxuICAgIGFycm93SGVhZC5vbignbW92aW5nJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhdGgoJ2VuZCcsIGFycm93SGVhZC5sZWZ0LCBhcnJvd0hlYWQudG9wLCBmYWxzZSk7XHJcbiAgICAgIHRoaXMuX2NoZWNrRXh0cmVtaXR5Q2FuQmVDb25uZWN0ZWQoJ2VuZCcpO1xyXG4gICAgfSk7XHJcbiAgICBhcnJvd0hlYWQub24oJ21vdmVkJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhdGgoJ2VuZCcsIGFycm93SGVhZC5sZWZ0LCBhcnJvd0hlYWQudG9wLCB0cnVlKTtcclxuICAgICAgdGhpcy5pc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrLnNldCgnb3BhY2l0eScsIDApO1xyXG4gICAgICB0aGlzLl9jb25uZWN0RGlzY29ubmVjdEV4dHJlbWl0eSgnZW5kJyk7XHJcbiAgICB9KTtcclxuICAgIGFycm93SGVhZC5vbignbW91c2Vkb3duJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLmJyaW5nVG9Gcm9udCgpO1xyXG4gICAgICB0aGlzLnRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KDEpO1xyXG5cclxuICAgICAgYXJyb3dIZWFkLm9uKCdtb3VzZXVwJywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudG9nZ2xlQWxsQW5jaG9yc09wYWNpdHkoMCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU3RhcnQgcG9pbnQgKGFycm93VGFpbClcclxuICAgIGNvbnN0IGFycm93VGFpbE9wdHMgPSB7XHJcbiAgICAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgICB3aWR0aDogMTAsXHJcbiAgICAgIGhlaWdodDogMTAsXHJcbiAgICAgIGxlZnQ6IHBhdGhDb29yZHMuTS54LFxyXG4gICAgICB0b3A6IHBhdGhDb29yZHMuTS55LFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgZmlsbDogJyNmZmYnLFxyXG4gICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICBzdHJva2U6ICcjMDAwJyxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgICBoYXNCb3JkZXJzOiBmYWxzZSxcclxuICAgICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGFycm93VGFpbCA9IHRoaXMuYXJyb3dUYWlsID0gbmV3IGZhYnJpYy5SZWN0KGFycm93VGFpbE9wdHMpO1xyXG4gICAgdGhpcy5pc1ZhbGlkVGFpbENvbm5lY3Rpb25NYXNrID0gbmV3IGZhYnJpYy5DaXJjbGUoaXNWYWxpZE1hc2tPcHRzKTtcclxuICAgIGFycm93VGFpbC5vbignbW92aW5nJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhdGgoJ3N0YXJ0JywgYXJyb3dUYWlsLmxlZnQsIGFycm93VGFpbC50b3AsIGZhbHNlKTtcclxuICAgICAgdGhpcy5fY2hlY2tFeHRyZW1pdHlDYW5CZUNvbm5lY3RlZCgnc3RhcnQnKTtcclxuICAgIH0pO1xyXG4gICAgYXJyb3dUYWlsLm9uKCdtb3ZlZCcsICgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVQYXRoKCdzdGFydCcsIGFycm93VGFpbC5sZWZ0LCBhcnJvd1RhaWwudG9wLCB0cnVlKTtcclxuICAgICAgdGhpcy5pc1ZhbGlkVGFpbENvbm5lY3Rpb25NYXNrLnNldCgnb3BhY2l0eScsIDApO1xyXG4gICAgICB0aGlzLl9jb25uZWN0RGlzY29ubmVjdEV4dHJlbWl0eSgnc3RhcnQnKTtcclxuICAgIH0pO1xyXG4gICAgYXJyb3dUYWlsLm9uKCdtb3VzZWRvd24nLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuYnJpbmdUb0Zyb250KCk7XHJcbiAgICAgIHRoaXMudG9nZ2xlQWxsQW5jaG9yc09wYWNpdHkoMSk7XHJcblxyXG4gICAgICBhcnJvd1RhaWwub24oJ21vdXNldXAnLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy50b2dnbGVBbGxBbmNob3JzT3BhY2l0eSgwKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGluamVjdCgpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgaWQsXHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgcGF0aCxcclxuICAgICAgY29udHJvbFBvaW50LFxyXG4gICAgICBjb250cm9sTGluZTEsXHJcbiAgICAgIGNvbnRyb2xMaW5lMixcclxuICAgICAgYXJyb3dIZWFkLFxyXG4gICAgICBhcnJvd1RhaWwsXHJcbiAgICAgIGlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2ssXHJcbiAgICAgIGlzVmFsaWRIZWFkQ29ubmVjdGlvbk1hc2ssXHJcbiAgICB9ID0gdGhpcztcclxuICAgIGNhbnZhcy5hZGQoY29udHJvbFBvaW50KTtcclxuICAgIGNhbnZhcy5hZGQoY29udHJvbExpbmUxKTtcclxuICAgIGNhbnZhcy5hZGQoY29udHJvbExpbmUyKTtcclxuICAgIGNhbnZhcy5hZGQoaXNWYWxpZFRhaWxDb25uZWN0aW9uTWFzayk7XHJcbiAgICBjYW52YXMuYWRkKGlzVmFsaWRIZWFkQ29ubmVjdGlvbk1hc2spO1xyXG4gICAgY2FudmFzLmFkZChhcnJvd0hlYWQpO1xyXG4gICAgY2FudmFzLmFkZChhcnJvd1RhaWwpO1xyXG5cclxuICAgIGNhbnZhcy5hZGQocGF0aCk7XHJcbiAgICB0aGlzLnVwZGF0ZVBhdGgoJ3N0YXJ0JywgcGF0aC5wYXRoWzBdWzFdLCBwYXRoLnBhdGhbMF1bMl0sIHRydWUpO1xyXG4gICAgdGhpcy51cGRhdGVQYXRoKCdlbmQnLCBwYXRoLnBhdGhbMV1bM10sIHBhdGgucGF0aFsxXVs0XSwgdHJ1ZSk7XHJcbiAgICB0aGlzLnVwZGF0ZVBhdGgoJ2NvbnRyb2wnLCBwYXRoLnBhdGhbMV1bMV0sIHBhdGgucGF0aFsxXVsyXSwgdHJ1ZSk7XHJcblxyXG4gICAgY2FudmFzLmxpbmtzW2lkXSA9IHRoaXM7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBjb25uZWN0TGluayhsaW5rUG9pbnQsIHNoYXBlSWQsIGNhcmRpbmFsKSB7XHJcbiAgICAvLyBDaGVjayBub3QgYWxyZWFkeSBjb25uZWN0ZWRcclxuICAgIGlmICghdGhpcy5pc1ZhbGlkQ29ubmVjdGlvbihsaW5rUG9pbnQsIHNoYXBlSWQsIGNhcmRpbmFsKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBzaGFwZSA9IHRoaXMuY2FudmFzLmdldE9iamVjdHMoKVxyXG4gICAgICAuZmluZCgobykgPT4gby5pZCA9PT0gc2hhcGVJZCk7XHJcblxyXG4gICAgLy8gRGlzY29ubmVjdCBleGlzdGluZyBvYmplY3RcclxuICAgIHRoaXMuZGlzY29ubmVjdExpbmsobGlua1BvaW50KTtcclxuXHJcbiAgICAvLyBDb25uZWN0XHJcbiAgICB0aGlzW2xpbmtQb2ludF0gPSB7XHJcbiAgICAgIHNoYXBlLFxyXG4gICAgICBhbmNob3I6IGNhcmRpbmFsLFxyXG4gICAgICBoYW5kbGVyczoge1xyXG4gICAgICAgIG9uQW5jaG9yUG9zaXRpb25Nb2RpZnlpbmc6ICgpID0+IHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlUGF0aChsaW5rUG9pbnQsIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLmxlZnQsIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLnRvcCwgZmFsc2UpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25BbmNob3JQb3NpdGlvbk1vZGlmaWVkOiAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZVBhdGgobGlua1BvaW50LCBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5sZWZ0LCBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS50b3AsIHRydWUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ub3BhY2l0eSA9IDA7XHJcbiAgICBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5vbigncGc6cG9zaXRpb246bW9kaWZ5aW5nJywgdGhpc1tsaW5rUG9pbnRdLmhhbmRsZXJzLm9uQW5jaG9yUG9zaXRpb25Nb2RpZnlpbmcpO1xyXG4gICAgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ub24oJ3BnOnBvc2l0aW9uOm1vZGlmaWVkJywgdGhpc1tsaW5rUG9pbnRdLmhhbmRsZXJzLm9uQW5jaG9yUG9zaXRpb25Nb2RpZmllZCk7XHJcblxyXG4gICAgLy8gVXBkYXRlIExpbmtcclxuICAgIHRoaXMudXBkYXRlUGF0aChsaW5rUG9pbnQsIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLmxlZnQsIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLnRvcCwgdHJ1ZSwgZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgZGlzY29ubmVjdExpbmsobGlua1BvaW50KSB7XHJcbiAgICBpZiAodGhpc1tsaW5rUG9pbnRdKSB7XHJcbiAgICAgIHRoaXNbbGlua1BvaW50XS5zaGFwZS5hbmNob3JzW3RoaXNbbGlua1BvaW50XS5hbmNob3JdLm9mZigncGc6cG9zaXRpb246bW9kaWZ5aW5nJywgdGhpc1tsaW5rUG9pbnRdLmhhbmRsZXJzLm9uQW5jaG9yUG9zaXRpb25Nb2RpZnlpbmcpO1xyXG4gICAgICB0aGlzW2xpbmtQb2ludF0uc2hhcGUuYW5jaG9yc1t0aGlzW2xpbmtQb2ludF0uYW5jaG9yXS5vZmYoJ3BnOnBvc2l0aW9uOm1vZGlmaWVkJywgdGhpc1tsaW5rUG9pbnRdLmhhbmRsZXJzLm9uQW5jaG9yUG9zaXRpb25Nb2RpZmllZCk7XHJcbiAgICAgIGRlbGV0ZSB0aGlzW2xpbmtQb2ludF07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXNldEN1cnZhdHVyZSgpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgY29udHJvbFBvaW50LFxyXG4gICAgICBwYXRoLFxyXG4gICAgfSA9IHRoaXM7XHJcbiAgICBjb250cm9sUG9pbnQubGVmdCA9IChwYXRoLnBhdGhbMF1bMV0gKyBwYXRoLnBhdGhbMV1bM10pIC8gMjtcclxuICAgIGNvbnRyb2xQb2ludC50b3AgPSAocGF0aC5wYXRoWzBdWzJdICsgcGF0aC5wYXRoWzFdWzRdKSAvIDI7XHJcbiAgICBjb250cm9sUG9pbnQuc2V0Q29vcmRzKCk7XHJcbiAgICBjb250cm9sUG9pbnQuZmlyZSgnbW92ZWQnKTtcclxuICB9XHJcblxyXG4gIGJyaW5nVG9Gcm9udCgpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgY2FudmFzLFxyXG4gICAgICBwYXRoLFxyXG4gICAgICBjb250cm9sUG9pbnQsXHJcbiAgICAgIGFycm93SGVhZCxcclxuICAgICAgYXJyb3dUYWlsLFxyXG4gICAgfSA9IHRoaXM7XHJcbiAgICBjYW52YXMuYnJpbmdUb0Zyb250KHBhdGgpO1xyXG4gICAgY2FudmFzLmJyaW5nVG9Gcm9udChjb250cm9sUG9pbnQpO1xyXG4gICAgY2FudmFzLmJyaW5nVG9Gcm9udChhcnJvd0hlYWQpO1xyXG4gICAgY2FudmFzLmJyaW5nVG9Gcm9udChhcnJvd1RhaWwpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlUGF0aChsaW5rUG9pbnQsIHgsIHksIGNvbW1pdCwgcmVzZXRDdXJ2KSB7XHJcbiAgICBjb25zdCBwYXRoID0ge1xyXG4gICAgICBNOiB7XHJcbiAgICAgICAgeDogbGlua1BvaW50ID09PSAnc3RhcnQnID8geCA6IHRoaXMucGF0aC5wYXRoWzBdWzFdLFxyXG4gICAgICAgIHk6IGxpbmtQb2ludCA9PT0gJ3N0YXJ0JyA/IHkgOiB0aGlzLnBhdGgucGF0aFswXVsyXSxcclxuICAgICAgfSxcclxuICAgICAgUToge1xyXG4gICAgICAgIHgxOiBsaW5rUG9pbnQgPT09ICdjb250cm9sJyA/IHggOiB0aGlzLnBhdGgucGF0aFsxXVsxXSxcclxuICAgICAgICB5MTogbGlua1BvaW50ID09PSAnY29udHJvbCcgPyB5IDogdGhpcy5wYXRoLnBhdGhbMV1bMl0sXHJcbiAgICAgICAgeDI6IGxpbmtQb2ludCA9PT0gJ2VuZCcgPyB4IDogdGhpcy5wYXRoLnBhdGhbMV1bM10sXHJcbiAgICAgICAgeTI6IGxpbmtQb2ludCA9PT0gJ2VuZCcgPyB5IDogdGhpcy5wYXRoLnBhdGhbMV1bNF0sXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgaWYgKGNvbW1pdCkge1xyXG4gICAgICBjb25zdCBwYXRoU3RyID0gYE0gJHtwYXRoLk0ueH0gJHtwYXRoLk0ueX0gUSAke3BhdGguUS54MX0sICR7cGF0aC5RLnkxfSwgJHtwYXRoLlEueDJ9LCAke3BhdGguUS55Mn1gO1xyXG4gICAgICBjb25zdCBuZXdQYXRoID0gbmV3IGZhYnJpYy5QYXRoKHBhdGhTdHIsIHRoaXMuZGVmYXVsdFBhdGhPcHRpb25zKTtcclxuICAgICAgdGhpcy5jYW52YXMucmVtb3ZlKHRoaXMucGF0aCk7XHJcbiAgICAgIHRoaXMuY2FudmFzLmFkZChuZXdQYXRoKTtcclxuXHJcbiAgICAgIG5ld1BhdGgub24oJ21vdXNlb3ZlcicsIHRoaXMub25MaW5rTW91c2VPdmVyLmJpbmQodGhpcykpO1xyXG4gICAgICBuZXdQYXRoLm9uKCdtb3VzZW91dCcsIHRoaXMub25MaW5rTW91c2VPdXQuYmluZCh0aGlzKSk7XHJcbiAgICAgIG5ld1BhdGgub24oJ21vdXNlZG93bicsIHRoaXMuYnJpbmdUb0Zyb250LmJpbmQodGhpcykpO1xyXG4gICAgICBuZXdQYXRoLm9uKCdtb3ZpbmcnLCB0aGlzLm9uTGlua01vdmluZy5iaW5kKHRoaXMpKTtcclxuICAgICAgbmV3UGF0aC5vbignbW92ZWQnLCB0aGlzLm9uTGlua01vdmVkLmJpbmQodGhpcykpO1xyXG4gICAgICBjb25zdCB0b0JpbmQgPSBbXHJcbiAgICAgICAgdGhpcy5hcnJvd0hlYWQsXHJcbiAgICAgICAgdGhpcy5hcnJvd1RhaWwsXHJcbiAgICAgICAgdGhpcy5jb250cm9sUG9pbnQsXHJcbiAgICAgICAgdGhpcy5jb250cm9sTGluZTEsXHJcbiAgICAgICAgdGhpcy5jb250cm9sTGluZTIsXHJcbiAgICAgIF07XHJcbiAgICAgIGNvbnN0IGJvc3NUcmFuc2Zvcm0gPSBuZXdQYXRoLmNhbGNUcmFuc2Zvcm1NYXRyaXgoKTtcclxuICAgICAgY29uc3QgaW52ZXJ0ZWRCb3NzVHJhbnNmb3JtID0gZmFicmljLnV0aWwuaW52ZXJ0VHJhbnNmb3JtKGJvc3NUcmFuc2Zvcm0pO1xyXG4gICAgICB0b0JpbmQuZm9yRWFjaCgobykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRlc2lyZWRUcmFuc2Zvcm0gPSBmYWJyaWMudXRpbC5tdWx0aXBseVRyYW5zZm9ybU1hdHJpY2VzKFxyXG4gICAgICAgICAgaW52ZXJ0ZWRCb3NzVHJhbnNmb3JtLFxyXG4gICAgICAgICAgby5jYWxjVHJhbnNmb3JtTWF0cml4KCksXHJcbiAgICAgICAgKTtcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cclxuICAgICAgICBvLnJlbGF0aW9uc2hpcCA9IGRlc2lyZWRUcmFuc2Zvcm07XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5wYXRoID0gbmV3UGF0aDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGF0aC5zZXQoJ3BhdGgnLCBbXHJcbiAgICAgICAgWydNJywgcGF0aC5NLngsIHBhdGguTS55XSxcclxuICAgICAgICBbJ1EnLCBwYXRoLlEueDEsIHBhdGguUS55MSwgcGF0aC5RLngyLCBwYXRoLlEueTJdLFxyXG4gICAgICBdKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBVcGRhdGUgY29udHJvbCBsaW5lcywgYXJyb3cgaGVhZHMgYW5kIHRhaWxzXHJcbiAgICB0aGlzLmNvbnRyb2xMaW5lMS5zZXQoe1xyXG4gICAgICB4MTogdGhpcy5jb250cm9sUG9pbnQubGVmdCxcclxuICAgICAgeTE6IHRoaXMuY29udHJvbFBvaW50LnRvcCxcclxuICAgICAgeDI6IHRoaXMucGF0aC5wYXRoWzBdWzFdLFxyXG4gICAgICB5MjogdGhpcy5wYXRoLnBhdGhbMF1bMl0sXHJcbiAgICB9KTtcclxuICAgIHRoaXMuY29udHJvbExpbmUyLnNldCh7XHJcbiAgICAgIHgxOiB0aGlzLmNvbnRyb2xQb2ludC5sZWZ0LFxyXG4gICAgICB5MTogdGhpcy5jb250cm9sUG9pbnQudG9wLFxyXG4gICAgICB4MjogdGhpcy5wYXRoLnBhdGhbMV1bM10sXHJcbiAgICAgIHkyOiB0aGlzLnBhdGgucGF0aFsxXVs0XSxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgYXJyb3dIZWFkQW5nbGUgPSAoTWF0aC5hdGFuMih0aGlzLnBhdGgucGF0aFsxXVs0XSAtIHRoaXMucGF0aC5wYXRoWzFdWzJdLCB0aGlzLnBhdGgucGF0aFsxXVszXSAtIHRoaXMucGF0aC5wYXRoWzFdWzFdKSAqIDE4MCkgLyBNYXRoLlBJO1xyXG4gICAgdGhpcy5hcnJvd0hlYWQuYW5nbGUgPSBhcnJvd0hlYWRBbmdsZSArIDkwO1xyXG4gICAgdGhpcy5hcnJvd0hlYWQubGVmdCA9IHRoaXMucGF0aC5wYXRoWzFdWzNdO1xyXG4gICAgdGhpcy5hcnJvd0hlYWQudG9wID0gdGhpcy5wYXRoLnBhdGhbMV1bNF07XHJcbiAgICB0aGlzLmFycm93SGVhZC5zZXRDb29yZHMoKTtcclxuICAgIHRoaXMuYXJyb3dUYWlsLmxlZnQgPSB0aGlzLnBhdGgucGF0aFswXVsxXTtcclxuICAgIHRoaXMuYXJyb3dUYWlsLnRvcCA9IHRoaXMucGF0aC5wYXRoWzBdWzJdO1xyXG4gICAgdGhpcy5hcnJvd1RhaWwuc2V0Q29vcmRzKCk7XHJcblxyXG4gICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcclxuXHJcbiAgICAvLyBSZXNldCBjb250cm9sIHBvaW50XHJcbiAgICBpZiAocmVzZXRDdXJ2KSB7XHJcbiAgICAgIHRoaXMucmVzZXRDdXJ2YXR1cmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzVmFsaWRDb25uZWN0aW9uKGxpbmtQb2ludCwgc2hhcGVJZCwgY2FyZGluYWwpIHtcclxuICAgIGNvbnN0IHNoYXBlID0gdGhpcy5jYW52YXMuZ2V0T2JqZWN0cygpXHJcbiAgICAgIC5maW5kKChvKSA9PiBvLmlkID09PSBzaGFwZUlkKTtcclxuICAgIC8vIENoZWNrIG5vdCBhbHJlYWR5IGNvbm5lY3RlZFxyXG4gICAgaWYgKGxpbmtQb2ludCA9PT0gJ3N0YXJ0Jykge1xyXG4gICAgICBpZiAodGhpcy5zdGFydCAmJiB0aGlzLnN0YXJ0LnNoYXBlICYmIHRoaXMuc3RhcnQuc2hhcGUuaWQgPT09IHNoYXBlLmlkICYmIHRoaXMuc3RhcnQuY2FyZGluYWwgPT09IGNhcmRpbmFsKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyB0cnlpbmcgZW5kIHNldCB0aGUgc2FtZSBhbHJlYWR5IGNvbm5lY3RlZCBhbmNob3JcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5lbmQgJiYgdGhpcy5lbmQuc2hhcGUgJiYgdGhpcy5lbmQuc2hhcGUuaWQgPT09IHNoYXBlLmlkKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyB0cnlpbmcgZW5kIHNob3J0IGNpcmN1aXQgdGhlIHJlY3RhbmdsZVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGxpbmtQb2ludCA9PT0gJ2VuZCcpIHtcclxuICAgICAgaWYgKHRoaXMuZW5kICYmIHRoaXMuZW5kLnNoYXBlICYmIHRoaXMuZW5kLnNoYXBlLmlkID09PSBzaGFwZS5pZCAmJiB0aGlzLmVuZC5jYXJkaW5hbCA9PT0gY2FyZGluYWwpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIHRyeWluZyBlbmQgc2V0IHRoZSBzYW1lIGFscmVhZHkgY29ubmVjdGVkIGFuY2hvclxyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLnN0YXJ0ICYmIHRoaXMuc3RhcnQuc2hhcGUgJiYgdGhpcy5zdGFydC5zaGFwZS5pZCA9PT0gc2hhcGUuaWQpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIHRyeWluZyBlbmQgc2hvcnQgY2lyY3VpdCB0aGUgcmVjdGFuZ2xlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlQWxsQW5jaG9yc09wYWNpdHkob3BhY2l0eSkge1xyXG4gICAgY29uc3QgYW5jaG9ycyA9IHRoaXMuY2FudmFzLmdldE9iamVjdHMoKVxyXG4gICAgICAuZmlsdGVyKChvKSA9PiBvLnR5cGUgPT09ICdhbmNob3InKTtcclxuXHJcbiAgICAvLyBjb25zdCBwcm9taXNlcyA9IFtdO1xyXG4gICAgLy8gY29uc3QgcHJvbWlzZUZhY3RvcnkgPSBmdW5jdGlvbiAoYW5jaG9yKSB7XHJcbiAgICAvLyAgIHJldHVybiBmdW5jdGlvbiAocmVzb2x2ZSkge1xyXG4gICAgLy8gICAgIGFuY2hvci5hbmltYXRlKCdvcGFjaXR5Jywgb3BhY2l0eSwge1xyXG4gICAgLy8gICAgICAgZHVyYXRpb246IDMwMCxcclxuICAgIC8vICAgICAgIG9uQ2hhbmdlOiByZXNvbHZlLFxyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gICB9O1xyXG4gICAgLy8gfTtcclxuICAgIC8vIGZvciAobGV0IGEgPSAwOyBhIDwgYW5jaG9ycy5sZW5ndGg7IGEgKz0gMSkge1xyXG4gICAgLy8gICBpZiAobG9jayAhPT0gdW5kZWZpbmVkKSBhbmNob3JzW2FdLmxvY2tPcGFjaXR5ID0gbG9jaztcclxuICAgIC8vICAgcHJvbWlzZXMucHVzaChuZXcgUHJvbWlzZShwcm9taXNlRmFjdG9yeShhbmNob3JzW2FdKSkpO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCkgPT4ge1xyXG4gICAgLy8gICB0aGlzLmNhbnZhcy5yZW5kZXJBbGwoKTtcclxuICAgIC8vIH0pO1xyXG5cclxuICAgIGZvciAobGV0IGEgPSAwOyBhIDwgYW5jaG9ycy5sZW5ndGg7IGEgKz0gMSkge1xyXG4gICAgICAvLyBpZiAobG9jayAhPT0gdW5kZWZpbmVkKSBhbmNob3JzW2FdLmxvY2tPcGFjaXR5ID0gbG9jaztcclxuICAgICAgYW5jaG9yc1thXS5zZXQoJ29wYWNpdHknLCBvcGFjaXR5KTtcclxuICAgIH1cclxuICAgIHRoaXMuY2FudmFzLnJlbmRlckFsbCgpO1xyXG4gIH1cclxuXHJcbiAgb25MaW5rTW91c2VPdmVyKCkge1xyXG4gICAgdGhpcy5jb250cm9sUG9pbnQudG9nZ2xlT3BhY2l0eSgxKTtcclxuICAgIHRoaXMuY29udHJvbExpbmUxLnRvZ2dsZU9wYWNpdHkoMSk7XHJcbiAgICB0aGlzLmNvbnRyb2xMaW5lMi50b2dnbGVPcGFjaXR5KDEpO1xyXG4gIH1cclxuXHJcbiAgb25MaW5rTW91c2VPdXQoKSB7XHJcbiAgICB0aGlzLmNvbnRyb2xQb2ludC50b2dnbGVPcGFjaXR5KDApO1xyXG4gICAgdGhpcy5jb250cm9sTGluZTEudG9nZ2xlT3BhY2l0eSgwKTtcclxuICAgIHRoaXMuY29udHJvbExpbmUyLnRvZ2dsZU9wYWNpdHkoMCk7XHJcbiAgfVxyXG5cclxuICBvbkxpbmtNb3ZpbmcoKSB7XHJcbiAgICAvLyBNb3ZlIHN0YXJ0LCBlbmQsIGNvbnRyb2wgcG9pbnRzIGFsdG9nZXRoZXIgd2l0aCB0aGUgUGF0aFxyXG4gICAgY29uc3QgdG9VcGRhdGUgPSBbXHJcbiAgICAgIHRoaXMuYXJyb3dIZWFkLFxyXG4gICAgICB0aGlzLmFycm93VGFpbCxcclxuICAgICAgdGhpcy5jb250cm9sUG9pbnQsXHJcbiAgICAgIHRoaXMuY29udHJvbExpbmUxLFxyXG4gICAgICB0aGlzLmNvbnRyb2xMaW5lMixcclxuICAgIF07XHJcbiAgICB0b1VwZGF0ZS5mb3JFYWNoKChvKSA9PiB7XHJcbiAgICAgIGlmICghby5yZWxhdGlvbnNoaXApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgeyByZWxhdGlvbnNoaXAgfSA9IG87XHJcbiAgICAgIGNvbnN0IG5ld1RyYW5zZm9ybSA9IGZhYnJpYy51dGlsLm11bHRpcGx5VHJhbnNmb3JtTWF0cmljZXMoXHJcbiAgICAgICAgdGhpcy5wYXRoLmNhbGNUcmFuc2Zvcm1NYXRyaXgoKSxcclxuICAgICAgICByZWxhdGlvbnNoaXAsXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IG9wdCA9IGZhYnJpYy51dGlsLnFyRGVjb21wb3NlKG5ld1RyYW5zZm9ybSk7XHJcbiAgICAgIG8uc2V0KHtcclxuICAgICAgICBmbGlwWDogZmFsc2UsXHJcbiAgICAgICAgZmxpcFk6IGZhbHNlLFxyXG4gICAgICB9KTtcclxuICAgICAgby5zZXRQb3NpdGlvbkJ5T3JpZ2luKFxyXG4gICAgICAgIHsgeDogb3B0LnRyYW5zbGF0ZVgsIHk6IG9wdC50cmFuc2xhdGVZIH0sXHJcbiAgICAgICAgJ2NlbnRlcicsXHJcbiAgICAgICAgJ2NlbnRlcicsXHJcbiAgICAgICk7XHJcbiAgICAgIG8uc2V0KG9wdCk7XHJcbiAgICAgIG8uc2V0Q29vcmRzKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBGaW5hbGx5LCBjaGVjayB0aGUgc3RhcnQgb3IgZW5kIHBvaW50cyBjYW4gYmUgY29ubmVjdGVkLlxyXG4gICAgdGhpcy5fY2hlY2tFeHRyZW1pdHlDYW5CZUNvbm5lY3RlZCgnc3RhcnQnKTtcclxuICAgIHRoaXMuX2NoZWNrRXh0cmVtaXR5Q2FuQmVDb25uZWN0ZWQoJ2VuZCcpO1xyXG4gIH1cclxuXHJcbiAgb25MaW5rTW92ZWQoKSB7XHJcbiAgICAvLyBSZXVwZGF0ZSB0aGUgUGF0aCBhY2NvcmRpbmcgZW5kIHRoZSBuZXcgY29vcmRpbmF0ZXMgb2YgYWxsIGVsZW1lbnRzXHJcbiAgICBjb25zdCBwYXRoQ29vcmRzID0ge1xyXG4gICAgICBNOiB7XHJcbiAgICAgICAgeDogdGhpcy5hcnJvd1RhaWwubGVmdCxcclxuICAgICAgICB5OiB0aGlzLmFycm93VGFpbC50b3AsXHJcbiAgICAgIH0sXHJcbiAgICAgIFE6IHtcclxuICAgICAgICB4MTogdGhpcy5jb250cm9sUG9pbnQubGVmdCxcclxuICAgICAgICB5MTogdGhpcy5jb250cm9sUG9pbnQudG9wLFxyXG4gICAgICAgIHgyOiB0aGlzLmFycm93SGVhZC5sZWZ0LFxyXG4gICAgICAgIHkyOiB0aGlzLmFycm93SGVhZC50b3AsXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgY29uc3QgcGF0aFN0ciA9IGBNICR7cGF0aENvb3Jkcy5NLnh9ICR7cGF0aENvb3Jkcy5NLnl9IFEgJHtwYXRoQ29vcmRzLlEueDF9LCAke3BhdGhDb29yZHMuUS55MX0sICR7cGF0aENvb3Jkcy5RLngyfSwgJHtwYXRoQ29vcmRzLlEueTJ9YDtcclxuICAgIGNvbnN0IGNhY2EgPSBuZXcgZmFicmljLlBhdGgocGF0aFN0ciwge30pO1xyXG4gICAgdGhpcy51cGRhdGVQYXRoKCdzdGFydCcsIGNhY2EucGF0aFswXVsxXSwgY2FjYS5wYXRoWzBdWzJdLCBmYWxzZSk7XHJcbiAgICB0aGlzLnVwZGF0ZVBhdGgoJ2VuZCcsIGNhY2EucGF0aFsxXVszXSwgY2FjYS5wYXRoWzFdWzRdLCBmYWxzZSk7XHJcbiAgICB0aGlzLnVwZGF0ZVBhdGgoJ2NvbnRyb2wnLCBjYWNhLnBhdGhbMV1bMV0sIGNhY2EucGF0aFsxXVsyXSwgdHJ1ZSk7XHJcblxyXG4gICAgLy8gQ29ubmVjdCBvciBEaXNjb25uZWN0IGRlcGVuZGluZyBvbiBleHRyZW1pdGllcyBwb3NpdGlvbnNcclxuICAgIHRoaXMuaXNWYWxpZFRhaWxDb25uZWN0aW9uTWFzay5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgIHRoaXMuaXNWYWxpZEhlYWRDb25uZWN0aW9uTWFzay5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgIHRoaXMuX2Nvbm5lY3REaXNjb25uZWN0RXh0cmVtaXR5KCdzdGFydCcpO1xyXG4gICAgdGhpcy5fY29ubmVjdERpc2Nvbm5lY3RFeHRyZW1pdHkoJ2VuZCcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGVscGVyIGVuZCBkaXNwbGF5IGEgdmFsaWQgY2lyY2xlIG1hc2sgb24gc3BlY2lmaWMgY29uZGl0aW9ucy5cclxuICAgKiBJZiB0aGUgZXh0cmVtaXR5IGlzIHRvdWNoaW5nIGFuIGFuY2hvciBvZiBhIExpbmthYmxlU2hhcGUgc3RhcnQgd2hpY2ggaXQgaXMgbm90IHlldCBjb25uZWN0ZWQgPT4gc2hvdyBHUkVFTlxyXG4gICAqIElmIHRoZSBleHRyZW1pdHkgaXMgdG91Y2hpbmcgYW4gYW5jaG9yIG9mIGEgTGlua2FibGVTaGFwZSBzdGFydCB3aGljaCBpdCBpcyBhbHJlYWR5IGNvbm5lY3RlZCBieSB0aGUgb3RoZXIgZXh0cmVtaXR5ID0+IHNob3cgUkVEXHJcbiAgICogQHBhcmFtIGRpcmVjdGlvblxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX2NoZWNrRXh0cmVtaXR5Q2FuQmVDb25uZWN0ZWQoZGlyZWN0aW9uKSB7XHJcbiAgICBjb25zdCB7IGNhbnZhcyB9ID0gdGhpcztcclxuXHJcbiAgICBsZXQgZXh0cmVtaXR5O1xyXG4gICAgbGV0IG1hc2s7XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSAnc3RhcnQnKSB7XHJcbiAgICAgIGV4dHJlbWl0eSA9IHRoaXMuYXJyb3dUYWlsO1xyXG4gICAgICBtYXNrID0gdGhpcy5pc1ZhbGlkVGFpbENvbm5lY3Rpb25NYXNrO1xyXG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdlbmQnKSB7XHJcbiAgICAgIGV4dHJlbWl0eSA9IHRoaXMuYXJyb3dIZWFkO1xyXG4gICAgICBtYXNrID0gdGhpcy5pc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrO1xyXG4gICAgfVxyXG5cclxuICAgIG1hc2subGVmdCA9IGV4dHJlbWl0eS5sZWZ0O1xyXG4gICAgbWFzay50b3AgPSBleHRyZW1pdHkudG9wO1xyXG4gICAgbWFzay5zZXRDb29yZHMoKTtcclxuICAgIG1hc2suc2V0KCdvcGFjaXR5JywgMCk7XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgaW50ZXJzZWN0cyB3aXRoIGFuY2hvclxyXG4gICAgY29uc3QgYW5jaG9ycyA9IGNhbnZhcy5nZXRPYmplY3RzKClcclxuICAgICAgLmZpbHRlcigobykgPT4gby50eXBlID09PSAnYW5jaG9yJyk7XHJcbiAgICBleHRyZW1pdHkuc2V0KCdzdHJva2UnLCAnIzAwMCcpO1xyXG4gICAgZm9yIChsZXQgYSA9IDA7IGEgPCBhbmNob3JzLmxlbmd0aDsgYSArPSAxKSB7XHJcbiAgICAgIGlmIChleHRyZW1pdHkuaW50ZXJzZWN0c1dpdGhPYmplY3QoYW5jaG9yc1thXSkpIHtcclxuICAgICAgICBtYXNrLnNldCgnb3BhY2l0eScsIDAuNSk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZENvbm5lY3Rpb24oZGlyZWN0aW9uLCBhbmNob3JzW2FdLnNoYXBlSWQsIGFuY2hvcnNbYV0uY2FyZGluYWwpKSB7XHJcbiAgICAgICAgICBtYXNrLnNldCh7XHJcbiAgICAgICAgICAgIHN0cm9rZTogJyM1N2I4NTcnLFxyXG4gICAgICAgICAgICBmaWxsOiAnIzU3Yjg1NycsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGV4dHJlbWl0eS5zZXQoJ3N0cm9rZScsICcjNWY1Jyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG1hc2suc2V0KHtcclxuICAgICAgICAgICAgc3Ryb2tlOiAnI2VhNGYzNycsXHJcbiAgICAgICAgICAgIGZpbGw6ICcjZWE0ZjM3JyxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgZXh0cmVtaXR5LnNldCgnc3Ryb2tlJywgJyNlYTRmMzcnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhlbHBlciBlbmQgZXhlY3V0ZSBjb25uZWN0L2Rpc2Nvbm5lY3QgZGVwZW5kaW5nIG9uIHNwZWNpZmljIGNvbmRpdGlvbnMuXHJcbiAgICogSWYgdGhlIGV4dHJlbWl0eSB3YXMgY29ubmVjdGVkIEFORCBpdCBpcyBOT1QgdG91Y2hpbmcgdGhlIGFuY2hvciBhbnltb3JlID0+IGRpc2Nvbm5lY3QgaXQuXHJcbiAgICogSWYgdGhlIGV4dHJlbWl0eSB3YXMgZGlzY29ubmVjdGVkIEFORCBpdCBpcyB0b3VjaGluZyB0aGUgYW5jaG9yID0+IGNvbm5lY3QgaXQuXHJcbiAgICogQHBhcmFtIGRpcmVjdGlvblxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX2Nvbm5lY3REaXNjb25uZWN0RXh0cmVtaXR5KGRpcmVjdGlvbikge1xyXG4gICAgY29uc3QgeyBjYW52YXMgfSA9IHRoaXM7XHJcblxyXG4gICAgbGV0IGV4dHJlbWl0eTtcclxuICAgIGlmIChkaXJlY3Rpb24gPT09ICdzdGFydCcpIHtcclxuICAgICAgZXh0cmVtaXR5ID0gdGhpcy5hcnJvd1RhaWw7XHJcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ2VuZCcpIHtcclxuICAgICAgZXh0cmVtaXR5ID0gdGhpcy5hcnJvd0hlYWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgaW50ZXJzZWN0cyB3aXRoIGFuY2hvclxyXG4gICAgY29uc3QgYW5jaG9ycyA9IGNhbnZhcy5nZXRPYmplY3RzKClcclxuICAgICAgLmZpbHRlcigobykgPT4gby50eXBlID09PSAnYW5jaG9yJyk7XHJcbiAgICBmb3IgKGxldCBhID0gMDsgYSA8IGFuY2hvcnMubGVuZ3RoOyBhICs9IDEpIHtcclxuICAgICAgaWYgKGV4dHJlbWl0eS5pbnRlcnNlY3RzV2l0aE9iamVjdChhbmNob3JzW2FdKSkge1xyXG4gICAgICAgIHRoaXMuY29ubmVjdExpbmsoZGlyZWN0aW9uLCBhbmNob3JzW2FdLnNoYXBlSWQsIGFuY2hvcnNbYV0uY2FyZGluYWwpO1xyXG4gICAgICAgIC8vIGFuY2hvcnNbYV0uc2V0KCdzdHJva2UnLCAnIzAwMCcpO1xyXG4gICAgICAgIGV4dHJlbWl0eS5zZXQoJ3N0cm9rZScsICcjMDAwJyk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpc1tkaXJlY3Rpb25dICYmIGFuY2hvcnNbYV0gPT09IHRoaXNbZGlyZWN0aW9uXS5zaGFwZS5hbmNob3JzW3RoaXNbZGlyZWN0aW9uXS5hbmNob3JdKSB7XHJcbiAgICAgICAgLy8gSWYgdGhpcyBsaW5rIHdhcyBjb25uZWN0ZWQgZW5kIHRoaXMgYW5jaG9yIGFuZCBpdCBkb2Vzbid0IGludGVyc2VjdCBhbnltb3JlXHJcbiAgICAgICAgdGhpcy5kaXNjb25uZWN0TGluayhkaXJlY3Rpb24pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImNvbnN0IHsgZmFicmljIH0gPSB3aW5kb3c7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW5rYWJsZVNoYXBlIHtcclxuICAvKipcclxuICAgKiBBIExpbmthYmxlU2hhcGUgaXMgYW55IEZhYnJpYy5PYmplY3Qgc2hhcGUgb24gd2hpY2ggYW5jaG9ycyBhcmUgYXBwZW5kZWQgc28gdGhhdCBtdWx0aXBsZSBMaW5rIGNhbiBiZSBjb25uZWN0ZWQgdG8gaXQuXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIG9wdGlvbnNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7RmFicmljLkNhbnZhc30gICBvcHRpb25zLmNhbnZhcyAtIEZhYnJpYyBjYW52YXNcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgb3B0aW9ucy5pZCAtIFVuaXF1ZSBpZGVudGlmaWVyXHJcbiAgICpcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGlkLFxyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHNoYXBlLFxyXG4gICAgICBsZWZ0LFxyXG4gICAgICB0b3AsXHJcbiAgICAgIGFuZ2xlLFxyXG4gICAgfSA9IG9wdGlvbnM7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcblxyXG4gICAgLy8gU2V0IHNoYXBlXHJcbiAgICBzaGFwZS5zZXQoJ3R5cGUnLCAnbGlua2FibGVTaGFwZScpO1xyXG4gICAgc2hhcGUuc2V0KHtcclxuICAgICAgbGVmdCwgdG9wLCBpZCwgYW5nbGUsXHJcbiAgICB9KTtcclxuICAgIHRoaXMuc2hhcGUgPSBzaGFwZTtcclxuXHJcbiAgICAvLyBTaG93IGNvb3JkaW5hdGVzL2FuZ2xlIHdoZW4gbW92aW5nL3JvdGF0aW5nIG9iamVjdFxyXG4gICAgY29uc3QgbW9kaWZpY2F0aW9uQm94ID0gbmV3IGZhYnJpYy5SZWN0KHtcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICBzdHJva2U6ICcjNjY2JyxcclxuICAgICAgZmlsbDogJyNmZmYnLFxyXG4gICAgICB3aWR0aDogNzAsXHJcbiAgICAgIGhlaWdodDogMjAsXHJcbiAgICAgIHZlbnRlZDogZmFsc2UsXHJcbiAgICAgIHNlbGVjdGFibGU6IGZhbHNlLFxyXG4gICAgICBvcGFjaXR5OiAwLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBtb2RpZmljYXRpb25UZXh0ID0gbmV3IGZhYnJpYy5UZXh0KCcwLCAwJywge1xyXG4gICAgICBsZWZ0OiAwLFxyXG4gICAgICB0b3A6IDAsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgZm9udEZhbWlseTogJ0hlbHZldGljYScsXHJcbiAgICAgIGZvbnRTaXplOiAxMixcclxuICAgICAgYm9yZGVyU3Ryb2tlV2lkdGg6IDQsXHJcbiAgICAgIGV2ZW50ZWQ6IGZhbHNlLFxyXG4gICAgICBzZWxlY3RhYmxlOiBmYWxzZSxcclxuICAgICAgb3BhY2l0eTogMCxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgbW9kaWZpY2F0aW9uID0gdGhpcy5tb2RCb3ggPSBuZXcgZmFicmljLkdyb3VwKFttb2RpZmljYXRpb25Cb3gsIG1vZGlmaWNhdGlvblRleHRdLCB7XHJcbiAgICAgIGxlZnQ6IDAsXHJcbiAgICAgIHRvcDogMCxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICBldmVudGVkOiBmYWxzZSxcclxuICAgICAgc2VsZWN0YWJsZTogZmFsc2UsXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IG9uTW92aW5nID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCB7IHgsIHkgfSA9IHNoYXBlLmFDb29yZHMudGw7XHJcbiAgICAgIGNvbnN0IHhDb29yZHMgPSBbc2hhcGUuYUNvb3Jkcy50bC54LCBzaGFwZS5hQ29vcmRzLnRyLngsIHNoYXBlLmFDb29yZHMuYmwueCwgc2hhcGUuYUNvb3Jkcy5ici54XTtcclxuICAgICAgY29uc3QgeUNvb3JkcyA9IFtzaGFwZS5hQ29vcmRzLnRsLnksIHNoYXBlLmFDb29yZHMudHIueSwgc2hhcGUuYUNvb3Jkcy5ibC55LCBzaGFwZS5hQ29vcmRzLmJyLnldO1xyXG4gICAgICBtb2RpZmljYXRpb24ubGVmdCA9IChNYXRoLm1pbiguLi54Q29vcmRzKSArIE1hdGgubWF4KC4uLnhDb29yZHMpKSAvIDI7XHJcbiAgICAgIG1vZGlmaWNhdGlvbi50b3AgPSBNYXRoLnJvdW5kKE1hdGgubWF4KC4uLnlDb29yZHMpICsgMzApO1xyXG4gICAgICBtb2RpZmljYXRpb24uc2V0Q29vcmRzKCk7XHJcbiAgICAgIG1vZGlmaWNhdGlvbkJveC5zZXQoJ29wYWNpdHknLCAwLjcpO1xyXG4gICAgICBtb2RpZmljYXRpb25UZXh0LnNldCgnb3BhY2l0eScsIDEpO1xyXG4gICAgICBtb2RpZmljYXRpb25UZXh0LnNldCgndGV4dCcsIGAke01hdGgucm91bmQoeCl9LCAke01hdGgucm91bmQoeSl9YCk7XHJcbiAgICAgIGNhbnZhcy5icmluZ1RvRnJvbnQobW9kaWZpY2F0aW9uKTtcclxuICAgIH07XHJcbiAgICBjb25zdCBvbk1vdmVkID0gKCkgPT4ge1xyXG4gICAgICBtb2RpZmljYXRpb25Cb3guc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICAgIG1vZGlmaWNhdGlvblRleHQuc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb25Sb3RhdGluZyA9ICgpID0+IHtcclxuICAgICAgY29uc3QgeENvb3JkcyA9IFtzaGFwZS5hQ29vcmRzLnRsLngsIHNoYXBlLmFDb29yZHMudHIueCwgc2hhcGUuYUNvb3Jkcy5ibC54LCBzaGFwZS5hQ29vcmRzLmJyLnhdO1xyXG4gICAgICBjb25zdCB5Q29vcmRzID0gW3NoYXBlLmFDb29yZHMudGwueSwgc2hhcGUuYUNvb3Jkcy50ci55LCBzaGFwZS5hQ29vcmRzLmJsLnksIHNoYXBlLmFDb29yZHMuYnIueV07XHJcbiAgICAgIG1vZGlmaWNhdGlvbi5sZWZ0ID0gKE1hdGgubWluKC4uLnhDb29yZHMpICsgTWF0aC5tYXgoLi4ueENvb3JkcykpIC8gMjtcclxuICAgICAgbW9kaWZpY2F0aW9uLnRvcCA9IE1hdGgucm91bmQoTWF0aC5tYXgoLi4ueUNvb3JkcykgKyAzMCk7XHJcbiAgICAgIG1vZGlmaWNhdGlvbi5zZXRDb29yZHMoKTtcclxuICAgICAgbW9kaWZpY2F0aW9uQm94LnNldCgnb3BhY2l0eScsIDAuNyk7XHJcbiAgICAgIG1vZGlmaWNhdGlvblRleHQuc2V0KCdvcGFjaXR5JywgMSk7XHJcbiAgICAgIG1vZGlmaWNhdGlvblRleHQuc2V0KCd0ZXh0JywgYCR7TWF0aC5yb3VuZChzaGFwZS5hbmdsZSA+IDE4MCA/IHNoYXBlLmFuZ2xlIC0gMzYwIDogc2hhcGUuYW5nbGUpfcKwYCk7XHJcbiAgICAgIGNhbnZhcy5icmluZ1RvRnJvbnQobW9kaWZpY2F0aW9uKTtcclxuICAgIH07XHJcbiAgICBjb25zdCBvblJvdGF0ZWQgPSAoKSA9PiB7XHJcbiAgICAgIG1vZGlmaWNhdGlvbkJveC5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgICAgbW9kaWZpY2F0aW9uVGV4dC5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgIH07XHJcbiAgICBzaGFwZS5vbih7XHJcbiAgICAgIG1vdmluZzogb25Nb3ZpbmcsXHJcbiAgICAgIG1vdmVkOiBvbk1vdmVkLFxyXG4gICAgICByb3RhdGluZzogb25Sb3RhdGluZyxcclxuICAgICAgcm90YXRlZDogb25Sb3RhdGVkLFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQW5jaG9yIHBvaW50c1xyXG4gICAgdGhpcy5hbmNob3JzID0gdGhpcy5zaGFwZS5hbmNob3JzID0ge1xyXG4gICAgICBlYXN0OiB0aGlzLl9tYWtlQW5jaG9yUG9pbnQoJ2Vhc3QnKSxcclxuICAgICAgd2VzdDogdGhpcy5fbWFrZUFuY2hvclBvaW50KCd3ZXN0JyksXHJcbiAgICAgIC8vIG5vcnRoOiB0aGlzLl9tYWtlQW5jaG9yUG9pbnQoJ25vcnRoJyksXHJcbiAgICAgIC8vIHNvdXRoOiB0aGlzLl9tYWtlQW5jaG9yUG9pbnQoJ3NvdXRoJyksXHJcbiAgICAgIC8vIG5vcnRoZWFzdDogdGhpcy5fbWFrZUFuY2hvclBvaW50KCdub3J0aGVhc3QnKSxcclxuICAgICAgLy8gbm9ydGh3ZXN0OiB0aGlzLl9tYWtlQW5jaG9yUG9pbnQoJ25vcnRod2VzdCcpLFxyXG4gICAgICAvLyBzb3V0aGVhc3Q6IHRoaXMuX21ha2VBbmNob3JQb2ludCgnc291dGhlYXN0JyksXHJcbiAgICAgIC8vIHNvdXRod2VzdDogdGhpcy5fbWFrZUFuY2hvclBvaW50KCdzb3V0aHdlc3QnKSxcclxuICAgIH07XHJcblxyXG4gICAgLy8gRXZlbnRzIHJlbGF0ZWQgdG8gYW5jaG9yc1xyXG4gICAgc2hhcGUub24oe1xyXG4gICAgICBzZWxlY3RlZDogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudG9nZ2xlQW5jaG9yc09wYWNpdHkoMCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG1vdXNlb3ZlcjogKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNhbnZhcy5nZXRBY3RpdmVPYmplY3QoKSAhPT0gdGhpcy5zaGFwZSkge1xyXG4gICAgICAgICAgdGhpcy50b2dnbGVBbmNob3JzT3BhY2l0eSgxKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG1vdXNlb3V0OiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy50b2dnbGVBbmNob3JzT3BhY2l0eSgwKTtcclxuICAgICAgfSxcclxuICAgICAgbW9kaWZ5aW5nOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKGZhbHNlKTtcclxuICAgICAgfSxcclxuICAgICAgbW9kaWZpZWQ6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnJlZnJlc2hBbmNob3JzUG9zaXRpb24odHJ1ZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG1vdmluZzogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbihmYWxzZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG1vdmVkOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKHRydWUpO1xyXG4gICAgICB9LFxyXG4gICAgICByb3RhdGluZzogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbihmYWxzZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHJvdGF0ZWQ6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnJlZnJlc2hBbmNob3JzUG9zaXRpb24odHJ1ZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHNjYWxpbmc6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnJlZnJlc2hBbmNob3JzUG9zaXRpb24oZmFsc2UpO1xyXG4gICAgICB9LFxyXG4gICAgICBzY2FsZWQ6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnJlZnJlc2hBbmNob3JzUG9zaXRpb24odHJ1ZSk7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGluamVjdCgpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgaWQsXHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgc2hhcGUsXHJcbiAgICAgIGFuY2hvcnMsXHJcbiAgICAgIG1vZEJveCxcclxuICAgIH0gPSB0aGlzO1xyXG4gICAgY2FudmFzLmFkZChzaGFwZSk7XHJcbiAgICBjYW52YXMuYWRkKG1vZEJveCk7XHJcbiAgICBPYmplY3Qua2V5cyhhbmNob3JzKS5mb3JFYWNoKChjYXJkaW5hbCkgPT4ge1xyXG4gICAgICBjYW52YXMuYWRkKGFuY2hvcnNbY2FyZGluYWxdKTtcclxuICAgICAgY2FudmFzLmJyaW5nRm9yd2FyZChhbmNob3JzW2NhcmRpbmFsXSwgdHJ1ZSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbih0cnVlKTtcclxuXHJcbiAgICBjYW52YXMubGlua2FibGVTaGFwZXNbaWRdID0gdGhpcztcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHJlbW92ZSgpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgaWQsXHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgc2hhcGUsXHJcbiAgICAgIGFuY2hvcnMsXHJcbiAgICAgIG1vZEJveCxcclxuICAgIH0gPSB0aGlzO1xyXG4gICAgY2FudmFzLnJlbW92ZShzaGFwZSk7XHJcbiAgICBjYW52YXMucmVtb3ZlKG1vZEJveCk7XHJcbiAgICBPYmplY3Qua2V5cyhhbmNob3JzKS5mb3JFYWNoKChjYXJkaW5hbCkgPT4ge1xyXG4gICAgICBjYW52YXMucmVtb3ZlKGFuY2hvcnNbY2FyZGluYWxdKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRlbGV0ZSBjYW52YXMubGlua2FibGVTaGFwZXNbaWRdO1xyXG4gIH1cclxuXHJcbiAgbW92ZShvcHRpb25zKSB7XHJcbiAgICBjb25zdCB7IGNhbnZhcywgc2hhcGUgfSA9IHRoaXM7XHJcblxyXG4gICAgLy8gUHJldmVudCBMaW5rYWJsZVNoYXBlIHRvIG92ZXJsYXAgd2l0aCBlYWNoIG90aGVyXHJcbiAgICBsZXQgbGVmdCA9IG9wdGlvbnMueCB8fCBzaGFwZS5sZWZ0O1xyXG4gICAgbGV0IHRvcCA9IG9wdGlvbnMueSB8fCBzaGFwZS50b3A7XHJcbiAgICBjb25zdCBjbGVhcmFuY2UgPSAxMDtcclxuICAgIHNoYXBlLnNldENvb3JkcygpOyAvLyBTZXRzIGNvcm5lciBwb3NpdGlvbiBjb29yZGluYXRlcyBiYXNlZCBvbiBjdXJyZW50IGFuZ2xlLCB3aWR0aCBhbmQgaGVpZ2h0XHJcbiAgICBsZXQgaXNJbnRlcnNlY3RpbmcgPSBmYWxzZTtcclxuICAgIGlmICghb3B0aW9ucy5za2lwQ29sbGlzaW9uKSB7XHJcbiAgICAgIGNvbnN0IG90aGVyU2hhcGVzID0gT2JqZWN0LnZhbHVlcyhjYW52YXMubGlua2FibGVTaGFwZXMpO1xyXG4gICAgICBmb3IgKGxldCBvID0gMDsgbyA8IG90aGVyU2hhcGVzLmxlbmd0aDsgbyArPSAxKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZyA9IG90aGVyU2hhcGVzW29dLnNoYXBlO1xyXG5cclxuICAgICAgICBpZiAodGFyZyAhPT0gc2hhcGUpIHtcclxuICAgICAgICAgIGlmIChzaGFwZS5pbnRlcnNlY3RzV2l0aE9iamVjdCh0YXJnKSkge1xyXG4gICAgICAgICAgICBpc0ludGVyc2VjdGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHNCID0gc2hhcGUuYUNvb3Jkcy5ibC55O1xyXG4gICAgICAgICAgICBjb25zdCBzVCA9IHNoYXBlLmFDb29yZHMudGwueTtcclxuICAgICAgICAgICAgY29uc3Qgc1IgPSBzaGFwZS5hQ29vcmRzLnRyLng7XHJcbiAgICAgICAgICAgIGNvbnN0IHNMID0gc2hhcGUuYUNvb3Jkcy50bC54O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdEIgPSB0YXJnLmFDb29yZHMuYmwueTtcclxuICAgICAgICAgICAgY29uc3QgdFQgPSB0YXJnLmFDb29yZHMudGwueTtcclxuICAgICAgICAgICAgY29uc3QgdFIgPSB0YXJnLmFDb29yZHMudHIueDtcclxuICAgICAgICAgICAgY29uc3QgdEwgPSB0YXJnLmFDb29yZHMudGwueDtcclxuXHJcbiAgICAgICAgICAgIGlmIChzQiAtIHRUID4gY2xlYXJhbmNlKSB7XHJcbiAgICAgICAgICAgICAgdG9wID0gdFQgLSBzaGFwZS5oZWlnaHQgLSBjbGVhcmFuY2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc1QgLSB0QiA8IGNsZWFyYW5jZSkge1xyXG4gICAgICAgICAgICAgIHRvcCA9IHRCICsgY2xlYXJhbmNlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNSIC0gdEwgPiBjbGVhcmFuY2UpIHtcclxuICAgICAgICAgICAgICBsZWZ0ID0gdEwgLSBzaGFwZS53aWR0aCAtIGNsZWFyYW5jZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzTCAtIHRSIDwgY2xlYXJhbmNlKSB7XHJcbiAgICAgICAgICAgICAgbGVmdCA9IHRSICsgY2xlYXJhbmNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zaGFwZS5zZXQoJ2xlZnQnLCBsZWZ0KTtcclxuICAgIHRoaXMuc2hhcGUuc2V0KCd0b3AnLCB0b3ApO1xyXG4gICAgdGhpcy5zaGFwZS5zZXRDb29yZHMoKTtcclxuICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbigpO1xyXG4gICAgdGhpcy5zaGFwZS5maXJlKG9wdGlvbnMubW92aW5nID8gJ21vdmluZycgOiAnbW92ZWQnKTtcclxuXHJcbiAgICBpZiAoaXNJbnRlcnNlY3RpbmcpIHtcclxuICAgICAgdGhpcy5tb3ZlKHtcclxuICAgICAgICB4OiBsZWZ0LFxyXG4gICAgICAgIHk6IHRvcCxcclxuICAgICAgICBtb3Zpbmc6IG9wdGlvbnMubW92aW5nLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJvdGF0ZShhbmdsZSkge1xyXG4gICAgdGhpcy5zaGFwZS5yb3RhdGUoYW5nbGUpO1xyXG4gICAgdGhpcy5zaGFwZS5zZXRDb29yZHMoKTtcclxuICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgcmVmcmVzaEFuY2hvcnNQb3NpdGlvbihjb21taXQpIHtcclxuICAgIE9iamVjdC5rZXlzKHRoaXMuYW5jaG9ycykuZm9yRWFjaCgoY2FyZGluYWwpID0+IHtcclxuICAgICAgdGhpcy5fc2V0QW5jaG9yUG9zaXRpb25SZWxhdGl2ZVRvUmVjdGFuZ2xlKGNhcmRpbmFsLCBjb21taXQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVBbmNob3JzT3BhY2l0eShvcGFjaXR5KSB7XHJcbiAgICBPYmplY3Qua2V5cyh0aGlzLmFuY2hvcnMpLmZvckVhY2goKGNhcmRpbmFsKSA9PiB7XHJcbiAgICAgIHRoaXMuYW5jaG9yc1tjYXJkaW5hbF0udG9nZ2xlT3BhY2l0eShvcGFjaXR5KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYnJpbmdUb0Zyb250KCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBjYW52YXMsIHNoYXBlLCBtb2RCb3gsIGFuY2hvcnMsXHJcbiAgICB9ID0gdGhpcztcclxuICAgIHNoYXBlLmJyaW5nVG9Gcm9udCgpO1xyXG4gICAgbW9kQm94LmJyaW5nVG9Gcm9udCgpO1xyXG4gICAgT2JqZWN0LmtleXMoYW5jaG9ycykuZm9yRWFjaCgoY2FyZGluYWwpID0+IHtcclxuICAgICAgY2FudmFzLmJyaW5nVG9Gcm9udChhbmNob3JzW2NhcmRpbmFsXSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIF9zZXRBbmNob3JQb3NpdGlvblJlbGF0aXZlVG9SZWN0YW5nbGUoY2FyZGluYWwsIGNvbW1pdCkge1xyXG4gICAgbGV0IGxlZnQ7XHJcbiAgICBsZXQgdG9wO1xyXG4gICAgY29uc3QgeyBzaGFwZSB9ID0gdGhpcztcclxuICAgIGNvbnN0IGFwID0gdGhpcy5hbmNob3JzW2NhcmRpbmFsXTtcclxuICAgIHN3aXRjaCAoY2FyZGluYWwpIHtcclxuICAgICAgY2FzZSAnZWFzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMudHIueCArIHNoYXBlLmFDb29yZHMuYnIueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLnRyLnkgKyBzaGFwZS5hQ29vcmRzLmJyLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICd3ZXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSAoc2hhcGUuYUNvb3Jkcy50bC54ICsgc2hhcGUuYUNvb3Jkcy5ibC54KSAvIDI7XHJcbiAgICAgICAgdG9wID0gKHNoYXBlLmFDb29yZHMudGwueSArIHNoYXBlLmFDb29yZHMuYmwueSkgLyAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRoJzoge1xyXG4gICAgICAgIGxlZnQgPSAoc2hhcGUuYUNvb3Jkcy50bC54ICsgc2hhcGUuYUNvb3Jkcy50ci54KSAvIDI7XHJcbiAgICAgICAgdG9wID0gKHNoYXBlLmFDb29yZHMudGwueSArIHNoYXBlLmFDb29yZHMudHIueSkgLyAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRoJzoge1xyXG4gICAgICAgIGxlZnQgPSAoc2hhcGUuYUNvb3Jkcy5ibC54ICsgc2hhcGUuYUNvb3Jkcy5ici54KSAvIDI7XHJcbiAgICAgICAgdG9wID0gKHNoYXBlLmFDb29yZHMuYmwueSArIHNoYXBlLmFDb29yZHMuYnIueSkgLyAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRoZWFzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gc2hhcGUuYUNvb3Jkcy50ci54O1xyXG4gICAgICAgIHRvcCA9IHNoYXBlLmFDb29yZHMudHIueTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aHdlc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IHNoYXBlLmFDb29yZHMudGwueDtcclxuICAgICAgICB0b3AgPSBzaGFwZS5hQ29vcmRzLnRsLnk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnc291dGhlYXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSBzaGFwZS5hQ29vcmRzLmJyLng7XHJcbiAgICAgICAgdG9wID0gc2hhcGUuYUNvb3Jkcy5ici55O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRod2VzdCc6XHJcbiAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICBsZWZ0ID0gc2hhcGUuYUNvb3Jkcy5ibC54O1xyXG4gICAgICAgIHRvcCA9IHNoYXBlLmFDb29yZHMuYmwueTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgYXAubGVmdCA9IGxlZnQ7XHJcbiAgICBhcC50b3AgPSB0b3A7XHJcbiAgICBhcC5zZXRDb29yZHMoKTtcclxuXHJcbiAgICBhcC5maXJlKGNvbW1pdCA/ICdwZzpwb3NpdGlvbjptb2RpZmllZCcgOiAncGc6cG9zaXRpb246bW9kaWZ5aW5nJyk7XHJcbiAgfVxyXG5cclxuICBfbWFrZUFuY2hvclBvaW50KGNhcmRpbmFsKSB7XHJcbiAgICBsZXQgbGVmdDtcclxuICAgIGxldCB0b3A7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHNoYXBlLFxyXG4gICAgICBpZCxcclxuICAgIH0gPSB0aGlzO1xyXG4gICAgc3dpdGNoIChjYXJkaW5hbCkge1xyXG4gICAgICBjYXNlICdlYXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSAoc2hhcGUuYUNvb3Jkcy50ci54ICsgc2hhcGUuYUNvb3Jkcy5ici54KSAvIDI7XHJcbiAgICAgICAgdG9wID0gKHNoYXBlLmFDb29yZHMudHIueSArIHNoYXBlLmFDb29yZHMuYnIueSkgLyAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3dlc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IChzaGFwZS5hQ29vcmRzLnRsLnggKyBzaGFwZS5hQ29vcmRzLmJsLngpIC8gMjtcclxuICAgICAgICB0b3AgPSAoc2hhcGUuYUNvb3Jkcy50bC55ICsgc2hhcGUuYUNvb3Jkcy5ibC55KSAvIDI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnbm9ydGgnOiB7XHJcbiAgICAgICAgbGVmdCA9IChzaGFwZS5hQ29vcmRzLnRsLnggKyBzaGFwZS5hQ29vcmRzLnRyLngpIC8gMjtcclxuICAgICAgICB0b3AgPSAoc2hhcGUuYUNvb3Jkcy50bC55ICsgc2hhcGUuYUNvb3Jkcy50ci55KSAvIDI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnc291dGgnOiB7XHJcbiAgICAgICAgbGVmdCA9IChzaGFwZS5hQ29vcmRzLmJsLnggKyBzaGFwZS5hQ29vcmRzLmJyLngpIC8gMjtcclxuICAgICAgICB0b3AgPSAoc2hhcGUuYUNvb3Jkcy5ibC55ICsgc2hhcGUuYUNvb3Jkcy5ici55KSAvIDI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnbm9ydGhlYXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSBzaGFwZS5hQ29vcmRzLnRyLng7XHJcbiAgICAgICAgdG9wID0gc2hhcGUuYUNvb3Jkcy50ci55O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRod2VzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gc2hhcGUuYUNvb3Jkcy50bC54O1xyXG4gICAgICAgIHRvcCA9IHNoYXBlLmFDb29yZHMudGwueTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aGVhc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IHNoYXBlLmFDb29yZHMuYnIueDtcclxuICAgICAgICB0b3AgPSBzaGFwZS5hQ29vcmRzLmJyLnk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnc291dGh3ZXN0JzpcclxuICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgIGxlZnQgPSBzaGFwZS5hQ29vcmRzLmJsLng7XHJcbiAgICAgICAgdG9wID0gc2hhcGUuYUNvb3Jkcy5ibC55O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYXAgPSBuZXcgZmFicmljLkNpcmNsZSh7XHJcbiAgICAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgICBsZWZ0LFxyXG4gICAgICB0b3AsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAyLFxyXG4gICAgICByYWRpdXM6IDYsXHJcbiAgICAgIGZpbGw6ICcjNzhiZWZhJywgLy8gNDJhMmRhIGQ1ZThmMlxyXG4gICAgICBzdHJva2U6ICcjNzhiZWZhJyxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICBoYXNCb3JkZXJzOiBmYWxzZSxcclxuICAgICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgICBzZWxlY3RhYmxlOiBmYWxzZSxcclxuICAgICAgb3BhY2l0eTogMCxcclxuICAgICAgaWQ6IGAke2lkfV8ke2NhcmRpbmFsfWAsXHJcbiAgICB9KTtcclxuICAgIGFwLnR5cGUgPSAnYW5jaG9yJztcclxuICAgIGFwLnNoYXBlSWQgPSBpZDtcclxuICAgIGFwLmNhcmRpbmFsID0gY2FyZGluYWw7XHJcbiAgICBhcC5vbignbW91c2VvdmVyJywgKCkgPT4ge1xyXG4gICAgICBhcC50b2dnbGVPcGFjaXR5KDEpO1xyXG4gICAgfSk7XHJcbiAgICBhcC5vbignbW91c2VvdXQnLCAoKSA9PiB7XHJcbiAgICAgIGFwLnRvZ2dsZU9wYWNpdHkoMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhcC5vbignbW91c2Vkb3duJywgKG9wdGlvbnMpID0+IHtcclxuICAgICAgc3dpdGNoIChvcHRpb25zLmJ1dHRvbikge1xyXG4gICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgIHRoaXMuX29uQW5jaG9yUmlnaHRDbGljay5jYWxsKHRoaXMsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgdGhpcy5fb25BbmNob3JNaWRkbGVDbGljay5jYWxsKHRoaXMsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICB0aGlzLl9vbkFuY2hvckxlZnRDbGljay5jYWxsKHRoaXMsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGFwO1xyXG4gIH1cclxuXHJcbiAgLy8gU2hvdWxkIGJlIGltcGxlbWVudGVkIGJ5IEV4dGVuZGluZyBDbGFzc2VzXHJcbiAgLyogZXNsaW50LWRpc2FibGUgY2xhc3MtbWV0aG9kcy11c2UtdGhpcyAqL1xyXG4gIF9vbkFuY2hvckxlZnRDbGljaygvKiBvcHRpb25zICovKSB7fVxyXG5cclxuICBfb25BbmNob3JNaWRkbGVDbGljaygvKiBvcHRpb25zICovKSB7fVxyXG5cclxuICBfb25BbmNob3JSaWdodENsaWNrKC8qIG9wdGlvbnMgKi8pIHt9XHJcblxyXG4gIC8qIGVzbGludC1kaXNhYmxlIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXMgKi9cclxufVxyXG4iLCJjb25zdCB7IGZhYnJpYyB9ID0gd2luZG93O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvY2Vzc0dyYXBoIHtcclxuICAvKipcclxuICAgKlxyXG4gICAqIEBwYXJhbSBvcHRpb25zXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0NhbnZhc30gb3B0aW9ucy5jYW52YXMgLSBGYWJyaWNKUy5DYW52YXMgaW5zdGFuY2UgLSBtYW5kYXRvcnkgaWYgb3B0aW9ucy5jYW52YXNPcHRzIG5vdCBwcm92aWRlZC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLmNhbnZhc09wdHMgLSBGYWJyaWNKUy5DYW52YXMjaW5pdGlhbGl6ZSBwYXJhbWV0ZXJzIC0gbWFuZGF0b3J5IGlmIG9wdGlvbnMuY2FudmFzIG5vdCBwcm92aWRlZFxyXG4gICAqICAgICAgICAgICAgICAgICBTZWUgaHR0cDovL2ZhYnJpY2pzLmNvbS9kb2NzL2ZhYnJpYy5DYW52YXMuaHRtbCNpbml0aWFsaXplIGZvciBkZXRhaWxzXHJcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudHxTdHJpbmd9IG9wdGlvbnMuY2FudmFzLmVsIC0gPGNhbnZhcz4gZWxlbWVudCB0byBpbml0aWFsaXplIGluc3RhbmNlIG9uXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuY2FudmFzLm9wdGlvbnMgLSBPcHRpb25zIG9iamVjdFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmdyaWRdIC0gZGltZW5zaW9ucyBvZiB0aGUgZ3JpZFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIHRoaXMuaGFuZGxlcnMgPSB7XHJcbiAgICAgIGdyaWQ6IHt9LFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBJbml0aWFsaXplIENhbnZhc1xyXG4gICAgY29uc3QgY2FudmFzID0gdGhpcy5jYW52YXMgPSBvcHRpb25zLmNhbnZhcyA/IG9wdGlvbnMuY2FudmFzIDogbmV3IGZhYnJpYy5DYW52YXMob3B0aW9ucy5jYW52YXNPcHRzLmVsLCBvcHRpb25zLmNhbnZhc09wdHMub3B0aW9ucyk7XHJcbiAgICBjYW52YXMuc2V0KCdwcmVzZXJ2ZU9iamVjdFN0YWNraW5nJywgdHJ1ZSk7XHJcbiAgICAvLyBjYW52YXMuc2V0KCdyZW5kZXJPbkFkZFJlbW92ZScsIGZhbHNlKTtcclxuICAgIGNhbnZhcy5zZXQoJ2ZpcmVSaWdodENsaWNrJywgdHJ1ZSk7XHJcbiAgICBjYW52YXMuc2V0KCdmaXJlTWlkZGxlQ2xpY2snLCB0cnVlKTtcclxuICAgIGNhbnZhcy5zZXQoJ3N0b3BDb250ZXh0TWVudScsIHRydWUpO1xyXG4gICAgY2FudmFzLmxpbmthYmxlU2hhcGVzID0ge307XHJcbiAgICBjYW52YXMubGluayA9IHt9O1xyXG5cclxuICAgIC8vIFNldCBncmlkXHJcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZ3JpZCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgdGhpcy5zZXRHcmlkKHtcclxuICAgICAgICBncmlkOiBvcHRpb25zLmdyaWQsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGZhYnJpYy5PYmplY3QucHJvdG90eXBlLm9yaWdpblggPSBmYWJyaWMuT2JqZWN0LnByb3RvdHlwZS5vcmlnaW5ZID0gJ2NlbnRlcic7XHJcbiAgICBmYWJyaWMuT2JqZWN0LnByb3RvdHlwZS50b2dnbGVPcGFjaXR5ID0gZnVuY3Rpb24gdG9nZ2xlT3BhY2l0eShvcGFjaXR5LyogLCB0aW1lb3V0ICovKSB7XHJcbiAgICAgIC8vIHRoaXMuYW5pbWF0ZSgnb3BhY2l0eScsIG9wYWNpdHksIHtcclxuICAgICAgLy8gICBkdXJhdGlvbjogdGltZW91dCAhPT0gdW5kZWZpbmVkID8gdGltZW91dCA6IDMwMCxcclxuICAgICAgLy8gICBvbkNoYW5nZTogdGhpcy5jYW52YXMucmVuZGVyQWxsLmJpbmQodGhpcy5jYW52YXMpLFxyXG4gICAgICAvLyB9KTtcclxuICAgICAgdGhpcy5zZXQoJ29wYWNpdHknLCBvcGFjaXR5KTtcclxuICAgICAgdGhpcy5jYW52YXMucmVuZGVyQWxsKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNhbnZhcy5jYWxjT2Zmc2V0KCk7XHJcblxyXG4gICAgLy8gUHJldmVudCBub24gTGlua2FibGVTaGFwZSBvYmplY3RzIHRvIGJlIGdyb3VwZWQgZHVyaW5nIHNlbGVjdGlvblxyXG4gICAgY29uc3Qgb25TZWxlY3Rpb24gPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGFjdGl2ZSA9IGNhbnZhcy5nZXRBY3RpdmVPYmplY3QoKTtcclxuICAgICAgLy8gV2hlbiBtdWx0aSBzZWxlY3Rpb24sIHJlbW92ZSBhbnkgbm9uIExpbmthYmxlIFNoYXBlIG9iamVjdHNcclxuICAgICAgaWYgKGFjdGl2ZS50eXBlID09PSAnYWN0aXZlU2VsZWN0aW9uJykge1xyXG4gICAgICAgIGNvbnN0IG9iamVjdHMgPSBhY3RpdmUuZ2V0T2JqZWN0cygpO1xyXG4gICAgICAgIGlmIChvYmplY3RzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgIGNvbnN0IG9ubHlSZWN0ID0gb2JqZWN0cy5maWx0ZXIoKG8pID0+IG8udHlwZSA9PT0gJ2xpbmthYmxlU2hhcGUnKTtcclxuICAgICAgICAgIGNhbnZhcy5fZGlzY2FyZEFjdGl2ZU9iamVjdCgpO1xyXG4gICAgICAgICAgY29uc3Qgc2VsID0gbmV3IGZhYnJpYy5BY3RpdmVTZWxlY3Rpb24ob25seVJlY3QsIHtcclxuICAgICAgICAgICAgY2FudmFzLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBjYW52YXMuX3NldEFjdGl2ZU9iamVjdChzZWwpO1xyXG5cclxuICAgICAgICAgIC8vIFVwZGF0ZSBhbnkgbGlua3MgY29ubmVjdGVkIHRvIHRoZSBMaW5rYWJsZSBTaGFwZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjYW52YXMub24oe1xyXG4gICAgICAnc2VsZWN0aW9uOmNyZWF0ZWQnOiBvblNlbGVjdGlvbixcclxuICAgICAgJ3NlbGVjdGlvbjp1cGRhdGVkJzogb25TZWxlY3Rpb24sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCBjYW52YXMgdG8gaGF2ZSBhIGdyaWQuXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcclxuICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5ncmlkIC0gZ3JpZCBzcGFjaW5nIChwaXhlbHMpXHJcbiAgICovXHJcbiAgc2V0R3JpZChvcHRpb25zKSB7XHJcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZ3JpZCAhPT0gJ251bWJlcicgfHwgb3B0aW9ucy5ncmlkIDwgMCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnQgXCJncmlkXCIgaW4gUHJvY2Vzc0dyYXAjc2V0R3JpZC4gKHJlcXVpcmVkOiBOdW1iZXIgPiAwKScpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZ3JpZCA9IG9wdGlvbnMuZ3JpZDtcclxuICAgIGNvbnN0IHsgY2FudmFzIH0gPSB0aGlzO1xyXG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tbXVsdGktc3RyICovXHJcbiAgICBjb25zdCBkYXRhID0gYDxzdmcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj4gXFxcclxuICAgICAgICA8ZGVmcz4gXFxcclxuICAgICAgICAgICAgPHBhdHRlcm4gaWQ9XCJzbWFsbEdyaWRcIiB3aWR0aD1cIiR7dGhpcy5ncmlkfVwiIGhlaWdodD1cIiR7dGhpcy5ncmlkfVwiIHBhdHRlcm5Vbml0cz1cInVzZXJTcGFjZU9uVXNlXCI+IFxcXHJcbiAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTSAke3RoaXMuZ3JpZH0gMCBMIDAgMCAwICR7dGhpcy5ncmlkfVwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiZ3JheVwiIHN0cm9rZS13aWR0aD1cIjAuNVwiIC8+IFxcXHJcbiAgICAgICAgICAgIDwvcGF0dGVybj4gXFxcclxuICAgICAgICAgICAgPHBhdHRlcm4gaWQ9XCJncmlkXCIgd2lkdGg9XCIke3RoaXMuZ3JpZCAqIDV9XCIgaGVpZ2h0PVwiJHt0aGlzLmdyaWQgKiA1fVwiIHBhdHRlcm5Vbml0cz1cInVzZXJTcGFjZU9uVXNlXCI+IFxcXHJcbiAgICAgICAgICAgICAgICA8cmVjdCB3aWR0aD1cIiR7dGhpcy5ncmlkICogNX1cIiBoZWlnaHQ9XCIke3RoaXMuZ3JpZCAqIDV9XCIgZmlsbD1cInVybCgjc21hbGxHcmlkKVwiIC8+IFxcXHJcbiAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTSAke3RoaXMuZ3JpZCAqIDV9IDAgTCAwIDAgMCAke3RoaXMuZ3JpZCAqIDV9XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJncmF5XCIgc3Ryb2tlLXdpZHRoPVwiMVwiIC8+IFxcXHJcbiAgICAgICAgICAgIDwvcGF0dGVybj4gXFxcclxuICAgICAgICA8L2RlZnM+IFxcXHJcbiAgICAgICAgPHJlY3Qgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIGZpbGw9XCJ1cmwoI2dyaWQpXCIgLz4gXFxcclxuICAgIDwvc3ZnPmA7XHJcbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLW11bHRpLXN0ciAqL1xyXG5cclxuICAgIGNvbnN0IERPTVVSTCA9IHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTCB8fCB3aW5kb3c7XHJcbiAgICBjb25zdCBzdmcgPSBuZXcgQmxvYihbZGF0YV0sIHsgdHlwZTogJ2ltYWdlL3N2Zyt4bWw7Y2hhcnNldD11dGYtOCcgfSk7XHJcbiAgICBjb25zdCB1cmwgPSBET01VUkwuY3JlYXRlT2JqZWN0VVJMKHN2Zyk7XHJcbiAgICBmYWJyaWMudXRpbC5sb2FkSW1hZ2UodXJsLCAoaW1nKSA9PiB7XHJcbiAgICAgIGNvbnN0IGJnID0gbmV3IGZhYnJpYy5SZWN0KHtcclxuICAgICAgICB3aWR0aDogY2FudmFzLndpZHRoLCBoZWlnaHQ6IGNhbnZhcy5oZWlnaHQsIGV2ZW50ZWQ6IGZhbHNlLCBzZWxlY3RhYmxlOiBmYWxzZSxcclxuICAgICAgfSk7XHJcbiAgICAgIGJnLmZpbGwgPSBuZXcgZmFicmljLlBhdHRlcm4oeyBzb3VyY2U6IGltZyB9LFxyXG4gICAgICAgICgoKSA9PiB7IGJnLmRpcnR5ID0gdHJ1ZTsgY2FudmFzLnJlcXVlc3RSZW5kZXJBbGwoKTsgfSkpO1xyXG4gICAgICBiZy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICAgIGNhbnZhcy5zZXQoJ2JhY2tncm91bmRJbWFnZScsIGJnKTtcclxuXHJcbiAgICAgIC8vIFNuYXAgdG8gZ3JpZCBlZmZlY3RzXHJcbiAgICAgIGNhbnZhcy5vZmYodGhpcy5oYW5kbGVycy5ncmlkKTtcclxuICAgICAgdGhpcy5oYW5kbGVycy5ncmlkID0ge1xyXG4gICAgICAgICdvYmplY3Q6bW92aW5nJzogKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB7IGdyaWQgfSA9IHRoaXM7XHJcbiAgICAgICAgICBjb25zdCBzaGFwZSA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICAgIGlmIChzaGFwZS50eXBlICE9PSAnbGlua2FibGVTaGFwZScpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNhbnZhcy5saW5rYWJsZVNoYXBlc1tzaGFwZS5pZF0ubW92ZSh7XHJcbiAgICAgICAgICAgIHg6IE1hdGgucm91bmQoc2hhcGUubGVmdCAvIGdyaWQpICogZ3JpZCxcclxuICAgICAgICAgICAgeTogTWF0aC5yb3VuZChzaGFwZS50b3AgLyBncmlkKSAqIGdyaWQsXHJcbiAgICAgICAgICAgIG1vdmluZzogdHJ1ZSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJ29iamVjdDpzY2FsaW5nJzogKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB7IGdyaWQgfSA9IHRoaXM7XHJcbiAgICAgICAgICBjb25zdCB7IHRhcmdldCB9ID0gZXZlbnQ7XHJcblxyXG4gICAgICAgICAgaWYgKHRhcmdldC50eXBlICE9PSAnbGlua2FibGVTaGFwZScpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnN0IHcgPSB0YXJnZXQud2lkdGggKiB0YXJnZXQuc2NhbGVYO1xyXG4gICAgICAgICAgY29uc3QgaCA9IHRhcmdldC5oZWlnaHQgKiB0YXJnZXQuc2NhbGVZO1xyXG4gICAgICAgICAgY29uc3Qgc25hcCA9IHsgLy8gQ2xvc2VzdCBzbmFwcGluZyBwb2ludHNcclxuICAgICAgICAgICAgdG9wOiBNYXRoLnJvdW5kKHRhcmdldC50b3AgLyBncmlkKSAqIGdyaWQsXHJcbiAgICAgICAgICAgIGxlZnQ6IE1hdGgucm91bmQodGFyZ2V0LmxlZnQgLyBncmlkKSAqIGdyaWQsXHJcbiAgICAgICAgICAgIGJvdHRvbTogTWF0aC5yb3VuZCgodGFyZ2V0LnRvcCArIGgpIC8gZ3JpZCkgKiBncmlkLFxyXG4gICAgICAgICAgICByaWdodDogTWF0aC5yb3VuZCgodGFyZ2V0LmxlZnQgKyB3KSAvIGdyaWQpICogZ3JpZCxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBjb25zdCB0aHJlc2hvbGQgPSBncmlkO1xyXG4gICAgICAgICAgY29uc3QgZGlzdCA9IHsgLy8gRGlzdGFuY2UgZnJvbSBzbmFwcGluZyBwb2ludHNcclxuICAgICAgICAgICAgdG9wOiBNYXRoLmFicyhzbmFwLnRvcCAtIHRhcmdldC50b3ApLFxyXG4gICAgICAgICAgICBsZWZ0OiBNYXRoLmFicyhzbmFwLmxlZnQgLSB0YXJnZXQubGVmdCksXHJcbiAgICAgICAgICAgIGJvdHRvbTogTWF0aC5hYnMoc25hcC5ib3R0b20gLSB0YXJnZXQudG9wIC0gaCksXHJcbiAgICAgICAgICAgIHJpZ2h0OiBNYXRoLmFicyhzbmFwLnJpZ2h0IC0gdGFyZ2V0LmxlZnQgLSB3KSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBjb25zdCBhdHRycyA9IHtcclxuICAgICAgICAgICAgc2NhbGVYOiB0YXJnZXQuc2NhbGVYLFxyXG4gICAgICAgICAgICBzY2FsZVk6IHRhcmdldC5zY2FsZVksXHJcbiAgICAgICAgICAgIHRvcDogdGFyZ2V0LnRvcCxcclxuICAgICAgICAgICAgbGVmdDogdGFyZ2V0LmxlZnQsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgc3dpdGNoICh0YXJnZXQuX19jb3JuZXIpIHtcclxuICAgICAgICAgICAgY2FzZSAndGwnOlxyXG4gICAgICAgICAgICAgIGlmIChkaXN0LmxlZnQgPCBkaXN0LnRvcCAmJiBkaXN0LmxlZnQgPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWCA9ICh3IC0gKHNuYXAubGVmdCAtIHRhcmdldC5sZWZ0KSkgLyB0YXJnZXQud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoYXR0cnMuc2NhbGVYIC8gdGFyZ2V0LnNjYWxlWCkgKiB0YXJnZXQuc2NhbGVZO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMudG9wID0gdGFyZ2V0LnRvcCArIChoIC0gdGFyZ2V0LmhlaWdodCAqIGF0dHJzLnNjYWxlWSk7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5sZWZ0ID0gc25hcC5sZWZ0O1xyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlzdC50b3AgPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWSA9IChoIC0gKHNuYXAudG9wIC0gdGFyZ2V0LnRvcCkpIC8gdGFyZ2V0LmhlaWdodDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWCA9IChhdHRycy5zY2FsZVkgLyB0YXJnZXQuc2NhbGVZKSAqIHRhcmdldC5zY2FsZVg7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5sZWZ0ICs9ICh3IC0gdGFyZ2V0LndpZHRoICogYXR0cnMuc2NhbGVYKTtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnRvcCA9IHNuYXAudG9wO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbXQnOlxyXG4gICAgICAgICAgICAgIGlmIChkaXN0LnRvcCA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVZID0gKGggLSAoc25hcC50b3AgLSB0YXJnZXQudG9wKSkgLyB0YXJnZXQuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgYXR0cnMudG9wID0gc25hcC50b3A7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd0cic6XHJcbiAgICAgICAgICAgICAgaWYgKGRpc3QucmlnaHQgPCBkaXN0LnRvcCAmJiBkaXN0LnJpZ2h0IDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVggPSAoc25hcC5yaWdodCAtIHRhcmdldC5sZWZ0KSAvIHRhcmdldC53aWR0aDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWSA9IChhdHRycy5zY2FsZVggLyB0YXJnZXQuc2NhbGVYKSAqIHRhcmdldC5zY2FsZVk7XHJcbiAgICAgICAgICAgICAgICBhdHRycy50b3AgPSB0YXJnZXQudG9wICsgKGggLSB0YXJnZXQuaGVpZ2h0ICogYXR0cnMuc2NhbGVZKTtcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRpc3QudG9wIDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoaCAtIChzbmFwLnRvcCAtIHRhcmdldC50b3ApKSAvIHRhcmdldC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVggPSAoYXR0cnMuc2NhbGVZIC8gdGFyZ2V0LnNjYWxlWSkgKiB0YXJnZXQuc2NhbGVYO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMudG9wID0gc25hcC50b3A7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtbCc6XHJcbiAgICAgICAgICAgICAgaWYgKGRpc3QubGVmdCA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVYID0gKHcgLSAoc25hcC5sZWZ0IC0gdGFyZ2V0LmxlZnQpKSAvIHRhcmdldC53aWR0aDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLmxlZnQgPSBzbmFwLmxlZnQ7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtcic6XHJcbiAgICAgICAgICAgICAgaWYgKGRpc3QucmlnaHQgPCB0aHJlc2hvbGQpIGF0dHJzLnNjYWxlWCA9IChzbmFwLnJpZ2h0IC0gdGFyZ2V0LmxlZnQpIC8gdGFyZ2V0LndpZHRoO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdibCc6XHJcbiAgICAgICAgICAgICAgaWYgKGRpc3QubGVmdCA8IGRpc3QuYm90dG9tICYmIGRpc3QubGVmdCA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVYID0gKHcgLSAoc25hcC5sZWZ0IC0gdGFyZ2V0LmxlZnQpKSAvIHRhcmdldC53aWR0aDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWSA9IChhdHRycy5zY2FsZVggLyB0YXJnZXQuc2NhbGVYKSAqIHRhcmdldC5zY2FsZVk7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5sZWZ0ID0gc25hcC5sZWZ0O1xyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlzdC5ib3R0b20gPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWSA9IChzbmFwLmJvdHRvbSAtIHRhcmdldC50b3ApIC8gdGFyZ2V0LmhlaWdodDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWCA9IChhdHRycy5zY2FsZVkgLyB0YXJnZXQuc2NhbGVZKSAqIHRhcmdldC5zY2FsZVg7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5sZWZ0ICs9ICh3IC0gdGFyZ2V0LndpZHRoICogYXR0cnMuc2NhbGVYKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ21iJzpcclxuICAgICAgICAgICAgICBpZiAoZGlzdC5ib3R0b20gPCB0aHJlc2hvbGQpIGF0dHJzLnNjYWxlWSA9IChzbmFwLmJvdHRvbSAtIHRhcmdldC50b3ApIC8gdGFyZ2V0LmhlaWdodDtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYnInOlxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgIGlmIChkaXN0LnJpZ2h0IDwgZGlzdC5ib3R0b20gJiYgZGlzdC5yaWdodCA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVYID0gKHNuYXAucmlnaHQgLSB0YXJnZXQubGVmdCkgLyB0YXJnZXQud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoYXR0cnMuc2NhbGVYIC8gdGFyZ2V0LnNjYWxlWCkgKiB0YXJnZXQuc2NhbGVZO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlzdC5ib3R0b20gPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWSA9IChzbmFwLmJvdHRvbSAtIHRhcmdldC50b3ApIC8gdGFyZ2V0LmhlaWdodDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWCA9IChhdHRycy5zY2FsZVkgLyB0YXJnZXQuc2NhbGVZKSAqIHRhcmdldC5zY2FsZVg7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGFyZ2V0LnNldChhdHRycyk7XHJcbiAgICAgICAgICB0YXJnZXQuc2V0Q29vcmRzKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfTtcclxuICAgICAgaWYgKHRoaXMuZ3JpZCA+IDApIHtcclxuICAgICAgICBjYW52YXMub24odGhpcy5oYW5kbGVycy5ncmlkKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
