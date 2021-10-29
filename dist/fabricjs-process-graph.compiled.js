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
      this.disconnectLink('start');
      this.disconnectLink('end');
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
        commit: true
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
    key: "setActive",
    value: function setActive(active) {
      var path = this.path,
          arrowHead = this.arrowHead,
          arrowTail = this.arrowTail;

      if (active) {
        path.set('stroke', '#78befa');
        arrowHead.set('stroke', '#78befa');
        arrowTail.set('stroke', '#78befa');
      } else {
        path.set('stroke', '#999');
        arrowHead.set('stroke', '#999');
        arrowTail.set('stroke', '#999');
      }
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
    _this.children = {};
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

                if (!(!isChild && Array.isArray(options.children) && options.children.length)) {
                  _context.next = 33;
                  break;
                }

                _context.next = 33;
                return this.addChildren(options.children);

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
    key: "addChildren",
    value: function () {
      var _addChildren = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(children) {
        var canvas, shape, shapes, initialOpts, existing, padding, margin, c, child, index, childContainer;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                canvas = this.canvas, shape = this.shape, shapes = this.shapes, initialOpts = this.initialOpts;
                existing = Object.keys(this.children); // Calculate new dimensions

                padding = 10;
                margin = 10;
                c = 0;

              case 5:
                if (!(c < children.length)) {
                  _context3.next = 17;
                  break;
                }

                child = children[c];

                if (child.id in this.children) {
                  _context3.next = 14;
                  break;
                }

                index = typeof child.index === 'number' ? child.index : existing.length + (c + 1);
                childContainer = new ExpandableContainer({
                  canvas: canvas,
                  id: child.id,
                  left: shape.left + padding + (initialOpts.child.width + margin) * c + (c === children.length ? -margin : 0),
                  top: shape.top + padding + shapes.image.height + margin,
                  angle: 0,
                  label: child.label ? child.label : index.toString(),
                  img: {
                    src: child.img.src
                  },
                  width: initialOpts.child.width,
                  height: initialOpts.child.height,
                  hideText: child.hideText
                }); // eslint-disable-next-line no-await-in-loop

                _context3.next = 12;
                return childContainer.load(true);

              case 12:
                this.children[child.id] = childContainer;
                this.children[child.id].index = index;

              case 14:
                c += 1;
                _context3.next = 5;
                break;

              case 17:
                shape.addWithUpdate();
                shape.setCoords();
                canvas.renderAll();

              case 20:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function addChildren(_x3) {
        return _addChildren.apply(this, arguments);
      }

      return addChildren;
    }()
  }, {
    key: "setActive",
    value: function setActive(active) {
      if (active) {
        this.shapes.rect.set('stroke', '#78befa');
        this.shapes.rect.set('fill', '#78befa');
        this.shapes.text.set('fill', '#fff');
      } else {
        this.shapes.rect.set('stroke', '#666');
        this.shapes.rect.set('fill', '#fff');
        this.shapes.text.set('fill', '#000');
      }
    }
  }, {
    key: "expand",
    value: function expand() {
      if (Object.keys(this.children).length !== 0 && this.isExpanded === false) {
        var canvas = this.canvas,
            shape = this.shape,
            shapes = this.shapes,
            initialOpts = this.initialOpts;
        var children = Object.values(this.children); // Calculate new dimensions

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
        shapes.text.setCoords(); // Add children containers in index order

        var sorted = children.sort(function (c1, c2) {
          return c1.index > c2.index;
        });

        for (var c = 0; c < sorted.length; c += 1) {
          var child = sorted[c];
          child.shape.left = shape.left + padding + (initialOpts.child.width + margin) * c + (c === sorted.length ? -margin : 0);
          child.shape.top = shape.top + padding + shapes.image.height + margin;
          shape.addWithUpdate(child.shape);
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
      if (Object.keys(this.children).length !== 0 && this.isExpanded === true) {
        var canvas = this.canvas,
            shape = this.shape,
            shapes = this.shapes,
            initialOpts = this.initialOpts;
        var children = Object.values(this.children); // Calculate new dimensions

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
          child.left = shape.left + padding + (initialOpts.child.width + margin) * c + (c === children.length ? -margin : 0);
          child.top = shape.top + padding + shapes.image.height + margin;
          shape.remove(child.shape);
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

      function _onAnchorRightClick(_x4) {
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
    this.dragGhostObject = null;
    this.dragGhostLinkEast = null;
    this.dragGhostLinkWest = null;
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
                  start: {
                    x: x - 50,
                    y: y
                  },
                  end: {
                    x: x + 50,
                    y: y
                  }
                });

              case 9:
                this.dragGhostObject = _context4.sent;
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
                this.dragGhostObject = _context4.sent;
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
        var canvas, canvasAbsolutePosition, x, y, type, grid, hasCollision, linkIds, c, link, hasEnoughClearance, ids, _c, container;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                canvas = this.canvas; // The immersiveFrame in which this PG is injected is messing up the mouse x,y coordinates.

                canvasAbsolutePosition = this.canvas.upperCanvasEl.getBoundingClientRect();
                x = event.e.x - canvasAbsolutePosition.left;
                y = event.e.y - canvasAbsolutePosition.top;

                if (!(this.dragGhostObject !== null)) {
                  _context5.next = 15;
                  break;
                }

                type = this.selectedChooserType.id;
                _context5.t0 = type;
                _context5.next = _context5.t0 === 'link' ? 9 : _context5.t0 === 'container' ? 13 : 13;
                break;

              case 9:
                this.dragGhostObject.updatePath({
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
                this.dragGhostObject.arrowHead.fire('moving');
                this.dragGhostObject.arrowTail.fire('moving');
                return _context5.abrupt("break", 15);

              case 13:
                if (this.dragGhostObject.isLoaded) {
                  x -= this.dragGhostObject.shape.width / 2;
                  y -= this.dragGhostObject.shape.height / 2; // Grid effects

                  if (this.grid) {
                    grid = this.grid;
                    x = Math.round(x / grid) * grid;
                    y = Math.round(y / grid) * grid;
                  } // Move object


                  this.dragGhostObject.move({
                    x: x,
                    y: y,
                    moving: true,
                    skipCollision: true
                  });
                  hasCollision = false; // Detect intersection with Links

                  linkIds = Object.keys(canvas.links);

                  for (c = 0; c < linkIds.length; c += 1) {
                    link = canvas.links[linkIds[c]];
                    link.setActive(false);

                    if (!hasCollision && link.path.intersectsWithObject(this.dragGhostObject.shape)) {
                      hasEnoughClearance = !link.start.shape.intersectsWithObject(this.dragGhostObject.shape) && !link.end.shape.intersectsWithObject(this.dragGhostObject.shape);

                      if (hasEnoughClearance) {
                        link.setActive(true);
                        hasCollision = true;
                      }
                    }
                  } // Detect intersection with Containers


                  ids = Object.keys(canvas.linkableShapes);

                  for (_c = 0; _c < ids.length; _c += 1) {
                    container = canvas.linkableShapes[ids[_c]];
                    container.setActive(false);

                    if (!hasCollision && container.id !== this.dragGhostObject.id && container.shape.intersectsWithObject(this.dragGhostObject.shape)) {
                      container.setActive(true);
                      hasCollision = true;
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
                if (!(this.dragGhostObject !== null)) {
                  _context6.next = 10;
                  break;
                }

                type = this.selectedChooserType.id;
                _context6.t0 = type;
                _context6.next = _context6.t0 === 'link' ? 5 : _context6.t0 === 'container' ? 8 : 8;
                break;

              case 5:
                this.removeLink({
                  id: this.dragGhostObject.id
                });
                this.dragGhostObject = null;
                return _context6.abrupt("break", 10);

              case 8:
                if (this.dragGhostObject.isLoaded) {
                  this.removeContainer({
                    id: this.dragGhostObject.id
                  });
                  this.dragGhostObject = null;
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
        var canvas, canvasAbsolutePosition, x, y, type, added, ids, c, container, opts, newContainer, grid, linkIds, _c2, link, hasEnoughClearance;

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
                if (this.dragGhostObject !== null) {
                  this.removeLink({
                    id: this.dragGhostObject.id
                  });
                  this.dragGhostObject = null;
                } // Instantiate new object


                _context7.next = 11;
                return this.addLink({
                  id: "".concat(Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)),
                  start: {
                    x: x - 50,
                    y: y
                  },
                  end: {
                    x: x + 50,
                    y: y
                  },
                  isTemporary: false
                });

              case 11:
                return _context7.abrupt("break", 57);

              case 12:
                added = false; // Add as Child Container if intersecting with an existing Container

                ids = Object.keys(canvas.linkableShapes);
                c = 0;

              case 15:
                if (!(c < ids.length)) {
                  _context7.next = 27;
                  break;
                }

                container = canvas.linkableShapes[ids[c]];
                container.setActive(false);

                if (!(!added && container.id !== this.dragGhostObject.id && container.shape.intersectsWithObject(this.dragGhostObject.shape))) {
                  _context7.next = 24;
                  break;
                }

                _context7.next = 21;
                return container.addChildren([{
                  id: "".concat(Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)),
                  img: {
                    src: 'caca'
                  },
                  hideText: false
                }]);

              case 21:
                container.collapse();
                container.expand();
                added = true;

              case 24:
                c += 1;
                _context7.next = 15;
                break;

              case 27:
                // Remove ghost object
                if (this.dragGhostObject !== null) {
                  this.removeContainer({
                    id: this.dragGhostObject.id
                  });
                  this.dragGhostObject = null;
                } // Add as new normal Container


                if (added) {
                  _context7.next = 56;
                  break;
                }

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
                _context7.next = 32;
                return this.addContainer(opts);

              case 32:
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
                }); // Detect intersection with Links

                linkIds = Object.keys(canvas.links);
                _c2 = 0;

              case 40:
                if (!(_c2 < linkIds.length)) {
                  _context7.next = 55;
                  break;
                }

                link = canvas.links[linkIds[_c2]];
                link.setActive(false);

                if (!(!added && link.path.intersectsWithObject(newContainer.shape))) {
                  _context7.next = 52;
                  break;
                }

                hasEnoughClearance = !link.start.shape.intersectsWithObject(newContainer.shape) && !link.end.shape.intersectsWithObject(newContainer.shape);

                if (!hasEnoughClearance) {
                  _context7.next = 52;
                  break;
                }

                _context7.next = 48;
                return this.addLink({
                  id: "".concat(Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)),
                  start: {
                    id: link.start.shape.id,
                    cardinal: link.start.anchor
                  },
                  end: {
                    id: newContainer.id,
                    cardinal: newContainer.shape.left > link.start.shape.left ? 'west' : 'east'
                  },
                  isTemporary: false
                });

              case 48:
                _context7.next = 50;
                return this.addLink({
                  id: "".concat(Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)),
                  start: {
                    id: newContainer.id,
                    cardinal: newContainer.shape.left > link.start.shape.left ? 'east' : 'west'
                  },
                  end: {
                    id: link.end.shape.id,
                    cardinal: link.end.anchor
                  },
                  isTemporary: false
                });

              case 50:
                // Remove old link
                this.removeLink({
                  id: link.id
                });
                added = true;

              case 52:
                _c2 += 1;
                _context7.next = 40;
                break;

              case 55:
                added = true;

              case 56:
                return _context7.abrupt("break", 57);

              case 57:
                event.e.preventDefault();

              case 58:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsInNyYy9Db250YWluZXIuanMiLCJzcmMvQ3VydmVkTGluay5qcyIsInNyYy9FeHBhbmRhYmxlQ29udGFpbmVyLmpzIiwic3JjL0xpbmsuanMiLCJzcmMvTGlua2FibGVTaGFwZS5qcyIsInNyYy9Qcm9jZXNzR3JhcGguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0VBOztBQUVBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7O0FBVEE7QUFXQSxNQUFNLENBQUMsRUFBUCxHQUFZO0FBQ1YsRUFBQSxZQUFZLEVBQVosd0JBRFU7QUFFVixFQUFBLGFBQWEsRUFBYix5QkFGVTtBQUdWLEVBQUEsU0FBUyxFQUFULHFCQUhVO0FBSVYsRUFBQSxtQkFBbUIsRUFBbkIsK0JBSlU7QUFLVixFQUFBLElBQUksRUFBSixnQkFMVTtBQU1WLEVBQUEsVUFBVSxFQUFWO0FBTlUsQ0FBWjs7Ozs7Ozs7Ozs7O0FDWEE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLGNBQXNCLE1BQXRCO0FBQUEsSUFBUSxNQUFSLFdBQVEsTUFBUjtBQUFBLElBQWdCLENBQWhCLFdBQWdCLENBQWhCOztJQUVxQixTOzs7OztBQUNuQjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFLHFCQUFZLE9BQVosRUFBcUI7QUFBQTs7QUFBQTs7QUFDbkIsUUFBTSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBWCxDQUFnQjtBQUMzQixNQUFBLElBQUksRUFBRSxDQURxQjtBQUUzQixNQUFBLEdBQUcsRUFBRSxDQUZzQjtBQUczQixNQUFBLE9BQU8sRUFBRSxNQUhrQjtBQUkzQixNQUFBLE9BQU8sRUFBRSxLQUprQjtBQUszQixNQUFBLFdBQVcsRUFBRSxDQUxjO0FBTTNCLE1BQUEsTUFBTSxFQUFFLE1BTm1CO0FBTzNCLE1BQUEsSUFB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QTtBQUFBOztBQUFBO0FBcUpRLGdCQUFBLEtBQUssR0FBRyxJQUFSOztBQXJKUjtBQUFBOztBQUFBO0FBNEpFLGdCQUFBLEtBQUssQ0FBQyxDQUFOLENBQVEsY0FBUjs7QUE1SkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIGltcG9ydCAnQGJhYmVsL3BvbHlmaWxsJztcclxuXHJcbmltcG9ydCBQcm9jZXNzR3JhcGggZnJvbSAnLi9zcmMvUHJvY2Vzc0dyYXBoLmpzJztcclxuXHJcbmltcG9ydCBMaW5rYWJsZVNoYXBlIGZyb20gJy4vc3JjL0xpbmthYmxlU2hhcGUuanMnO1xyXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gJy4vc3JjL0NvbnRhaW5lci5qcyc7XHJcbmltcG9ydCBFeHBhbmRhYmxlQ29udGFpbmVyIGZyb20gJy4vc3JjL0V4cGFuZGFibGVDb250YWluZXIuanMnO1xyXG5cclxuaW1wb3J0IExpbmsgZnJvbSAnLi9zcmMvTGluay5qcyc7XHJcbmltcG9ydCBDdXJ2ZWRMaW5rIGZyb20gJy4vc3JjL0N1cnZlZExpbmsuanMnO1xyXG5cclxud2luZG93LnBnID0ge1xyXG4gIFByb2Nlc3NHcmFwaCxcclxuICBMaW5rYWJsZVNoYXBlLFxyXG4gIENvbnRhaW5lcixcclxuICBFeHBhbmRhYmxlQ29udGFpbmVyLFxyXG4gIExpbmssXHJcbiAgQ3VydmVkTGluayxcclxufTtcclxuIiwiaW1wb3J0IExpbmthYmxlU2hhcGUgZnJvbSAnLi9MaW5rYWJsZVNoYXBlLmpzJztcclxuaW1wb3J0IEN1cnZlZExpbmsgZnJvbSAnLi9DdXJ2ZWRMaW5rLmpzJztcclxuXHJcbmNvbnN0IHsgZmFicmljLCBfIH0gPSB3aW5kb3c7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250YWluZXIgZXh0ZW5kcyBMaW5rYWJsZVNoYXBlIHtcclxuICAvKipcclxuICAgKiBBIENvbnRhaW5lciBpcyBhIFJlY3Qgd2l0aCBhbiBJVGV4dC4gQ2FuIGJlIGV4cGFuZGVkIHRvIHJldmVhbCBjb250YWluZWQgU2hhcGVzLlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBvcHRpb25zXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0ZhYnJpYy5DYW52YXN9ICAgb3B0aW9ucy5jYW52YXMgLSBGYWJyaWMgY2FudmFzXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG9wdGlvbnMuaWQgLSBVbmlxdWUgaWRlbnRpZmllclxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBvcHRpb25zLndpZHRoXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIG9wdGlvbnMuaGVpZ2h0XHJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG9wdGlvbnMubGFiZWxcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICBjb25zdCByZWN0ID0gbmV3IGZhYnJpYy5SZWN0KHtcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBvcmlnaW5YOiAnbGVmdCcsXHJcbiAgICAgIG9yaWdpblk6ICd0b3AnLFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgc3Ryb2tlOiAnIzAwMCcsXHJcbiAgICAgIGZpbGw6ICcjZmZmJyxcclxuICAgICAgcng6IDEwLFxyXG4gICAgICByeTogMTAsXHJcbiAgICAgIHdpZHRoOiBvcHRpb25zLndpZHRoID8gb3B0aW9ucy53aWR0aCA6IDIwMCxcclxuICAgICAgaGVpZ2h0OiBvcHRpb25zLmhlaWdodCA/IG9wdGlvbnMuaGVpZ2h0IDogMTAwLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCB0ZXh0ID0gbmV3IGZhYnJpYy5UZXh0Ym94KG9wdGlvbnMubGFiZWwsIHtcclxuICAgICAgbGVmdDogcmVjdC53aWR0aCAvIDIsXHJcbiAgICAgIHRvcDogcmVjdC5oZWlnaHQgLyAyLFxyXG4gICAgICBzdHlsZXM6IHsgfSxcclxuICAgICAgZm9udFNpemU6IDE0LFxyXG4gICAgICBmb250RmFtaWx5OiAnSGVsdmV0aWNhJyxcclxuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICB3aWR0aDogMTkwLFxyXG4gICAgICBoZWlnaHQ6IDkwLFxyXG4gICAgICBzcGxpdEJ5R3JhcGhlbWU6IHRydWUsXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGdyb3VwID0gbmV3IGZhYnJpYy5Hcm91cChbcmVjdCwgdGV4dF0sIHtcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBvcmlnaW5YOiAnbGVmdCcsXHJcbiAgICAgIG9yaWdpblk6ICd0b3AnLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBuZXdPcHRpb25zID0gXy5jbG9uZURlZXAoXy5vbWl0KG9wdGlvbnMsIFsnY2FudmFzJywgJ3NoYXBlJ10pKTtcclxuICAgIG5ld09wdGlvbnMuY2FudmFzID0gb3B0aW9ucy5jYW52YXM7XHJcbiAgICBuZXdPcHRpb25zLnNoYXBlID0gZ3JvdXA7XHJcbiAgICBzdXBlcihuZXdPcHRpb25zKTtcclxuXHJcbiAgICBncm91cC5vbih7XHJcbiAgICAgIHNjYWxpbmc6ICgpID0+IHtcclxuICAgICAgICAvLyBXaGVuIHNjYWxpbmcsIGtlZXAgdGV4dCBzYW1lIHNpemUgYXMgaW5pdGlhbFxyXG4gICAgICAgIGlmIChncm91cC5zY2FsZVggPCAxKSB7XHJcbiAgICAgICAgICB0ZXh0LnNjYWxlWCA9IDEgKyAoMSAtIGdyb3VwLnNjYWxlWCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRleHQuc2NhbGVYID0gMSAvIChncm91cC5zY2FsZVgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZ3JvdXAuc2NhbGVZIDwgMSkge1xyXG4gICAgICAgICAgdGV4dC5zY2FsZVkgPSAxICsgKDEgLSBncm91cC5zY2FsZVkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0ZXh0LnNjYWxlWSA9IDEgLyAoZ3JvdXAuc2NhbGVZKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jYW52YXMucmVuZGVyQWxsKCk7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIF9vbkFuY2hvclJpZ2h0Q2xpY2sob3B0aW9ucykge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBpZCwgbGVmdCwgdG9wLCBhbmdsZSwgY2FudmFzLCB3aWR0aCwgaGVpZ2h0LFxyXG4gICAgfSA9IHRoaXMuc2hhcGU7XHJcbiAgICBjb25zdCBhcCA9IG9wdGlvbnMudGFyZ2V0O1xyXG4gICAgY29uc3QgeyBjYXJkaW5hbCB9ID0gYXA7XHJcbiAgICBjb25zdCBzcGFjaW5nID0gNTA7XHJcblxyXG4gICAgY29uc3QgbmV4dENvbnRhaW5lciA9IG5ldyBDb250YWluZXIoe1xyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIGlkOiBgJHtpZH1fbmV4dF8ke2NhcmRpbmFsfV8ke01hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMSl9YCxcclxuICAgICAgbGVmdCxcclxuICAgICAgdG9wLFxyXG4gICAgICBhbmdsZSxcclxuICAgICAgbGFiZWw6IGAke2lkfV9uZXh0XyR7Y2FyZGluYWx9YCxcclxuICAgIH0pO1xyXG4gICAgbmV4dENvbnRhaW5lci5pbmplY3QoKTtcclxuXHJcbiAgICBjb25zdCBuZXdPcHRpb25zID0ge307XHJcbiAgICBsZXQgdGFyZ2V0Q2FyZGluYWw7XHJcbiAgICBzd2l0Y2ggKGNhcmRpbmFsKSB7XHJcbiAgICAgIGNhc2UgJ2Vhc3QnOiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnd2VzdCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gdG9wO1xyXG4gICAgICAgIG5ld09wdGlvbnMueCA9IGxlZnQgKyB3aWR0aCArIHNwYWNpbmc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnd2VzdCc6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICdlYXN0JztcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSB0b3A7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gbGVmdCAtIHdpZHRoIC0gc3BhY2luZztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aCc6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICdzb3V0aCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gdG9wIC0gaGVpZ2h0IC0gc3BhY2luZztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSBsZWZ0O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRoJzoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ25vcnRoJztcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSB0b3AgKyBoZWlnaHQgKyBzcGFjaW5nO1xyXG4gICAgICAgIG5ld09wdGlvbnMueCA9IGxlZnQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnbm9ydGhlYXN0Jzoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ3NvdXRod2VzdCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gdG9wIC0gaGVpZ2h0IC0gc3BhY2luZztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSBsZWZ0ICsgd2lkdGggKyBzcGFjaW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRod2VzdCc6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICdzb3V0aGVhc3QnO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IHRvcCAtIGhlaWdodCAtIHNwYWNpbmc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gbGVmdCAtIHdpZHRoIC0gc3BhY2luZztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aGVhc3QnOiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnbm9ydGh3ZXN0JztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSB0b3AgKyBoZWlnaHQgKyBzcGFjaW5nO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IGxlZnQgKyB3aWR0aCArIHNwYWNpbmc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnc291dGh3ZXN0JzpcclxuICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ25vcnRoZWFzdCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gdG9wICsgaGVpZ2h0ICsgc3BhY2luZztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSBsZWZ0IC0gd2lkdGggLSBzcGFjaW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBuZXh0Q29udGFpbmVyLm1vdmUobmV3T3B0aW9ucyk7XHJcbiAgICAvLyBuZXh0Q29udGFpbmVyLnJvdGF0ZShhbmdsZSk7XHJcblxyXG4gICAgY29uc3QgbmV3TGluayA9IG5ldyBDdXJ2ZWRMaW5rKHtcclxuICAgICAgY2FudmFzLFxyXG4gICAgICBzdGFydDoge1xyXG4gICAgICAgIHg6IGFwLmxlZnQsXHJcbiAgICAgICAgeTogYXAudG9wLFxyXG4gICAgICB9LFxyXG4gICAgICBlbmQ6IHtcclxuICAgICAgICB4OiBuZXh0Q29udGFpbmVyLmFuY2hvcnNbdGFyZ2V0Q2FyZGluYWxdLmxlZnQsXHJcbiAgICAgICAgeTogbmV4dENvbnRhaW5lci5hbmNob3JzW3RhcmdldENhcmRpbmFsXS50b3AsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICAgIG5ld0xpbmsuaW5qZWN0KGNhbnZhcyk7XHJcbiAgICBuZXdMaW5rLmNvbm5lY3RMaW5rKCdzdGFydCcsIGFwLnNoYXBlSWQsIGFwLmNhcmRpbmFsKTtcclxuICAgIG5ld0xpbmsuY29ubmVjdExpbmsoJ2VuZCcsIG5leHRDb250YWluZXIuYW5jaG9yc1t0YXJnZXRDYXJkaW5hbF0uc2hhcGVJZCwgbmV4dENvbnRhaW5lci5hbmNob3JzW3RhcmdldENhcmRpbmFsXS5jYXJkaW5hbCk7XHJcbiAgfVxyXG5cclxuICBfb25BbmNob3JMZWZ0Q2xpY2sob3B0aW9ucykge1xyXG4gICAgY29uc3QgYXAgPSBvcHRpb25zLnRhcmdldDtcclxuICAgIGNvbnN0IHsgY2FudmFzIH0gPSB0aGlzO1xyXG5cclxuICAgIC8vIERpc2FibGUgdGhlIG11bHRpIHNlbGVjdGlvbiB3aGVuIG1vdmluZyBtb3VzZVxyXG4gICAgdGhpcy5jYW52YXMuc2VsZWN0aW9uID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3Qgb3Bwb3NpdGVDYXJkaW5hbCA9IHtcclxuICAgICAgZWFzdDogJ3dlc3QnLFxyXG4gICAgICB3ZXN0OiAnZWFzdCcsXHJcbiAgICAgIG5vcnRoOiAnc291dGgnLFxyXG4gICAgICBzb3V0aDogJ25vcnRoJyxcclxuICAgIH07XHJcbiAgICBjb25zdCBuZXdMaW5rID0gbmV3IEN1cnZlZExpbmsoe1xyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgeDogYXAubGVmdCxcclxuICAgICAgICB5OiBhcC50b3AsXHJcbiAgICAgICAgZGlyZWN0aW9uOiBhcC5jYXJkaW5hbCxcclxuICAgICAgfSxcclxuICAgICAgZW5kOiB7XHJcbiAgICAgICAgeDogYXAubGVmdCxcclxuICAgICAgICB5OiBhcC50b3AsXHJcbiAgICAgICAgZGlyZWN0aW9uOiBvcHBvc2l0ZUNhcmRpbmFsW2FwLmNhcmRpbmFsXSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgbmV3TGluay5pbmplY3QoY2FudmFzKTtcclxuICAgIG5ld0xpbmsuY29ubmVjdExpbmsoJ3N0YXJ0JywgYXAuc2hhcGVJZCwgYXAuY2FyZGluYWwpO1xyXG4gICAgbmV3TGluay5hcnJvd0hlYWQuZmlyZSgnbW91c2Vkb3duJyk7XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZU1vdmUgPSAoZXZlbnQpID0+IHtcclxuICAgICAgbmV3TGluay5hcnJvd0hlYWQubGVmdCA9IGV2ZW50LnBvaW50ZXIueDtcclxuICAgICAgbmV3TGluay5hcnJvd0hlYWQudG9wID0gZXZlbnQucG9pbnRlci55O1xyXG4gICAgICBuZXdMaW5rLmFycm93SGVhZC5maXJlKCdtb3ZpbmcnKTtcclxuICAgIH07XHJcbiAgICBjYW52YXMub24oJ21vdXNlOm1vdmUnLCBvbk1vdXNlTW92ZSk7XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZUNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAvLyBFbmFibGUgYmFjayB0aGUgbXVsdGkgc2VsZWN0aW9uIHdoZW4gbW92aW5nIG1vdXNlXHJcbiAgICAgIHRoaXMuY2FudmFzLnNlbGVjdGlvbiA9IHRydWU7XHJcblxyXG4gICAgICBuZXdMaW5rLmFycm93SGVhZC5maXJlKCdtb3ZlZCcpO1xyXG4gICAgICBuZXdMaW5rLmFycm93SGVhZC5maXJlKCdtb3VzZXVwJyk7XHJcbiAgICAgIGNhbnZhcy5vZmYoJ21vdXNlOm1vdmUnLCBvbk1vdXNlTW92ZSk7XHJcbiAgICAgIGNhbnZhcy5vZmYoJ21vdXNlOnVwJywgb25Nb3VzZUNsaWNrKTtcclxuICAgIH07XHJcbiAgICBjYW52YXMub24oJ21vdXNlOnVwJywgb25Nb3VzZUNsaWNrKTtcclxuICB9XHJcbn1cclxuIiwiY29uc3QgeyBmYWJyaWMgfSA9IHdpbmRvdztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1cnZlZExpbmsge1xyXG4gIC8qKlxyXG4gICAqIEEgTGluayBpcyBhIEZhYnJpYy5QYXRoIG9iamVjdCB3aG9zZSBTdGFydCBhbmQgRW5kIHBvaW50cyBjYW4gYmUgY29ubmVjdGVkIGVuZCBhbnkgYW5jaG9yIG9mIHR3byBMaW5rYWJsZVNoYXBlLlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBvcHRpb25zXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0ZhYnJpYy5DYW52YXN9ICAgb3B0aW9ucy5jYW52YXMgLSBGYWJyaWMgY2FudmFzXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG9wdGlvbnMuaWQgLSBVbmlxdWUgaWRlbnRpZmllclxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLnN0YXJ0XSAtIENvb3JkaW5hdGVzIG9mIHRoZSBzdGFydCBwb2ludFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBbb3B0aW9ucy5zdGFydC54XSAtIFggYXhpcyBjb29yZGluYXRlIG9mIHRoZSBzdGFydCBwb2ludFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBbb3B0aW9ucy5zdGFydC55XSAtIFkgYXhpcyBjb29yZGluYXRlIG9mIHRoZSBzdGFydCBwb2ludFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBbb3B0aW9ucy5zdGFydC5kaXJlY3Rpb25dIC1cclxuICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgW29wdGlvbnMuZW5kLnhdIC0gWCBheGlzIGNvb3JkaW5hdGUgb2YgdGhlIGVuZCBwb2ludFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBbb3B0aW9ucy5lbmQueV0gLSBZIGF4aXMgY29vcmRpbmF0ZSBvZiB0aGUgZW5kIHBvaW50XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIFtvcHRpb25zLmVuZC5kaXJlY3Rpb25dIC1cclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuY3VzdG9tXSAtIE9wdGlvbnMgZW5kIGN1c3RvbWl6ZSB0aGUgZGlmZmVyZW50IHNoYXBlcyBvZiB0aGUgTGlua1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLmN1c3RvbS5wYXRoXSAtIGJlemllciBxdWFkcmF0aWMgY3VydmVcclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuY3VzdG9tLnN0YXJ0UG9pbnRdIC0gYWthIGFycm93VGFpbFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBbb3B0aW9ucy5jdXN0b20uZW5kUG9pbnRdIC0gYWthIGFycm93SGVhZFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgaWQsXHJcbiAgICAgIGNhbnZhcyxcclxuICAgIH0gPSBvcHRpb25zO1xyXG4gICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICB0aGlzLmRpcmVjdGlvbiA9IHtcclxuICAgICAgc3RhcnQ6IG9wdGlvbnMgJiYgb3B0aW9ucy5zdGFydCAmJiBvcHRpb25zLnN0YXJ0LmRpcmVjdGlvbiA/IG9wdGlvbnMuc3RhcnQuZGlyZWN0aW9uIDogJ2Vhc3QnLFxyXG4gICAgICBlbmQ6IG9wdGlvbnMgJiYgb3B0aW9ucy5lbmQgJiYgb3B0aW9ucy5lbmQuZGlyZWN0aW9uID8gb3B0aW9ucy5lbmQuZGlyZWN0aW9uIDogJ3dlc3QnLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHN0YXJ0ID0ge1xyXG4gICAgICB4OiBvcHRpb25zICYmIG9wdGlvbnMuc3RhcnQgJiYgb3B0aW9ucy5zdGFydC54ID8gb3B0aW9ucy5zdGFydC54IDogMCxcclxuICAgICAgeTogb3B0aW9ucyAmJiBvcHRpb25zLnN0YXJ0ICYmIG9wdGlvbnMuc3RhcnQueSA/IG9wdGlvbnMuc3RhcnQueSA6IDAsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgZW5kID0ge1xyXG4gICAgICB4OiBvcHRpb25zICYmIG9wdGlvbnMuZW5kICYmIG9wdGlvbnMuZW5kLnggPyBvcHRpb25zLmVuZC54IDogMCxcclxuICAgICAgeTogb3B0aW9ucyAmJiBvcHRpb25zLmVuZCAmJiBvcHRpb25zLmVuZC55ID8gb3B0aW9ucy5lbmQueSA6IDAsXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFBhdGgsIGEgYmV6aWVyIGN1YmljIGN1cnZlXHJcbiAgICBjb25zdCB7IHBhdGhDb29yZHNBcnJheSB9ID0gdGhpcy5jb21wdXRlUGF0aENvb3Jkcyh7XHJcbiAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgeDogc3RhcnQueCxcclxuICAgICAgICB5OiBzdGFydC55LFxyXG4gICAgICAgIGRpcmVjdGlvbjogdGhpcy5kaXJlY3Rpb24uc3RhcnQsXHJcbiAgICAgIH0sXHJcbiAgICAgIGVuZDoge1xyXG4gICAgICAgIHg6IGVuZC54LFxyXG4gICAgICAgIHk6IGVuZC55LFxyXG4gICAgICAgIGRpcmVjdGlvbjogdGhpcy5kaXJlY3Rpb24uZW5kLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBwYXRoT3B0cyA9IHRoaXMuZGVmYXVsdFBhdGhPcHRpb25zID0ge1xyXG4gICAgICBmaWxsOiAnJyxcclxuICAgICAgc3Ryb2tlOiAob3B0aW9ucy5jdXN0b20gJiYgb3B0aW9ucy5jdXN0b20ucGF0aCAmJiBvcHRpb25zLmN1c3RvbS5wYXRoLnN0cm9rZSkgPyBvcHRpb25zLmN1c3RvbS5wYXRoLnN0cm9rZSA6ICcjOTk5JyxcclxuICAgICAgc3Ryb2tlV2lkdGg6IChvcHRpb25zLmN1c3RvbSAmJiBvcHRpb25zLmN1c3RvbS5wYXRoICYmIG9wdGlvbnMuY3VzdG9tLnBhdGguc3Ryb2tlV2lkdGgpID8gb3B0aW9ucy5jdXN0b20ucGF0aC5zdHJva2VXaWR0aCA6IDIsXHJcbiAgICAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgICBoYXNCb3JkZXJzOiB0cnVlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAgIHBlclBpeGVsVGFyZ2V0RmluZDogdHJ1ZSxcclxuICAgIH07XHJcbiAgICBjb25zdCBwYXRoID0gbmV3IGZhYnJpYy5QYXRoKHBhdGhDb29yZHNBcnJheSwgcGF0aE9wdHMpO1xyXG4gICAgdGhpcy5wYXRoID0gcGF0aDtcclxuXHJcbiAgICAvLyBFbmQgcG9pbnQgKGFycm93SGVhZClcclxuICAgIGNvbnN0IGlzVmFsaWRNYXNrT3B0cyA9IHtcclxuICAgICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAgIGxlZnQ6IDAsXHJcbiAgICAgIHRvcDogMCxcclxuICAgICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAgIHJhZGl1czogMTYsXHJcbiAgICAgIGZpbGw6ICcjNTdiODU3JywgLy8gZWE0ZjM3XHJcbiAgICAgIHN0cm9rZTogJyM1N2I4NTcnLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAgIHNlbGVjdGFibGU6IGZhbHNlLFxyXG4gICAgICBvcGFjaXR5OiAwLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGFycm93SGVhZE9wdHMgPSB7XHJcbiAgICAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgICB3aWR0aDogMTAsXHJcbiAgICAgIGhlaWdodDogMTAsXHJcbiAgICAgIGxlZnQ6IGVuZC54LFxyXG4gICAgICB0b3A6IGVuZC55LFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgZmlsbDogJyNkZGQnLFxyXG4gICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICBzdHJva2U6ICcjOTk5JyxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgICBoYXNCb3JkZXJzOiBmYWxzZSxcclxuICAgICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGFycm93SGVhZCA9IHRoaXMuYXJyb3dIZWFkID0gbmV3IGZhYnJpYy5UcmlhbmdsZShhcnJvd0hlYWRPcHRzKTtcclxuICAgIHRoaXMuaXNWYWxpZEhlYWRDb25uZWN0aW9uTWFzayA9IG5ldyBmYWJyaWMuQ2lyY2xlKGlzVmFsaWRNYXNrT3B0cyk7XHJcbiAgICBhcnJvd0hlYWQub24oJ21vdmluZycsICgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVQYXRoKHtcclxuICAgICAgICBlbmQ6IHtcclxuICAgICAgICAgIHg6IGFycm93SGVhZC5sZWZ0LFxyXG4gICAgICAgICAgeTogYXJyb3dIZWFkLnRvcCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbW1pdDogZmFsc2UsXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLl9jaGVja0V4dHJlbWl0eUNhbkJlQ29ubmVjdGVkKCdlbmQnKTtcclxuICAgIH0pO1xyXG4gICAgYXJyb3dIZWFkLm9uKCdtb3ZlZCcsICgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVQYXRoKHtcclxuICAgICAgICBlbmQ6IHtcclxuICAgICAgICAgIHg6IGFycm93SGVhZC5sZWZ0LFxyXG4gICAgICAgICAgeTogYXJyb3dIZWFkLnRvcCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbW1pdDogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuaXNWYWxpZEhlYWRDb25uZWN0aW9uTWFzay5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgICAgdGhpcy5fY29ubmVjdERpc2Nvbm5lY3RFeHRyZW1pdHkoJ2VuZCcpO1xyXG4gICAgfSk7XHJcbiAgICBhcnJvd0hlYWQub24oJ21vdXNlZG93bicsICgpID0+IHtcclxuICAgICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcclxuICAgICAgdGhpcy50b2dnbGVBbGxBbmNob3JzT3BhY2l0eSgxKTtcclxuXHJcbiAgICAgIGFycm93SGVhZC5vbignbW91c2V1cCcsICgpID0+IHtcclxuICAgICAgICB0aGlzLnRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KDApO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFN0YXJ0IHBvaW50IChhcnJvd1RhaWwpXHJcbiAgICBjb25zdCBhcnJvd1RhaWxPcHRzID0ge1xyXG4gICAgICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgICAgd2lkdGg6IDEwLFxyXG4gICAgICBoZWlnaHQ6IDEwLFxyXG4gICAgICBsZWZ0OiBzdGFydC54LFxyXG4gICAgICB0b3A6IHN0YXJ0LnksXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICBmaWxsOiAnI2RkZCcsXHJcbiAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgIHN0cm9rZTogJyM5OTknLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIHNlbGVjdGFibGU6IHRydWUsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgYXJyb3dUYWlsID0gdGhpcy5hcnJvd1RhaWwgPSBuZXcgZmFicmljLlJlY3QoYXJyb3dUYWlsT3B0cyk7XHJcbiAgICB0aGlzLmlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2sgPSBuZXcgZmFicmljLkNpcmNsZShpc1ZhbGlkTWFza09wdHMpO1xyXG4gICAgYXJyb3dUYWlsLm9uKCdtb3ZpbmcnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aCh7XHJcbiAgICAgICAgc3RhcnQ6IHtcclxuICAgICAgICAgIHg6IGFycm93VGFpbC5sZWZ0LFxyXG4gICAgICAgICAgeTogYXJyb3dUYWlsLnRvcCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbW1pdDogZmFsc2UsXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLl9jaGVja0V4dHJlbWl0eUNhbkJlQ29ubmVjdGVkKCdzdGFydCcpO1xyXG4gICAgfSk7XHJcbiAgICBhcnJvd1RhaWwub24oJ21vdmVkJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhdGgoe1xyXG4gICAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgICB4OiBhcnJvd1RhaWwubGVmdCxcclxuICAgICAgICAgIHk6IGFycm93VGFpbC50b3AsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21taXQ6IHRydWUsXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2suc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICAgIHRoaXMuX2Nvbm5lY3REaXNjb25uZWN0RXh0cmVtaXR5KCdzdGFydCcpO1xyXG4gICAgfSk7XHJcbiAgICBhcnJvd1RhaWwub24oJ21vdXNlZG93bicsICgpID0+IHtcclxuICAgICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcclxuICAgICAgdGhpcy50b2dnbGVBbGxBbmNob3JzT3BhY2l0eSgxKTtcclxuXHJcbiAgICAgIGFycm93VGFpbC5vbignbW91c2V1cCcsICgpID0+IHtcclxuICAgICAgICB0aGlzLnRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KDApO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5qZWN0KCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBpZCxcclxuICAgICAgY2FudmFzLFxyXG4gICAgICBwYXRoLFxyXG4gICAgICBhcnJvd0hlYWQsXHJcbiAgICAgIGFycm93VGFpbCxcclxuICAgICAgaXNWYWxpZFRhaWxDb25uZWN0aW9uTWFzayxcclxuICAgICAgaXNWYWxpZEhlYWRDb25uZWN0aW9uTWFzayxcclxuICAgIH0gPSB0aGlzO1xyXG4gICAgY2FudmFzLmFkZChpc1ZhbGlkVGFpbENvbm5lY3Rpb25NYXNrKTtcclxuICAgIGNhbnZhcy5hZGQoaXNWYWxpZEhlYWRDb25uZWN0aW9uTWFzayk7XHJcbiAgICBjYW52YXMuYWRkKGFycm93SGVhZCk7XHJcbiAgICBjYW52YXMuYWRkKGFycm93VGFpbCk7XHJcblxyXG4gICAgY2FudmFzLmFkZChwYXRoKTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZVBhdGgoe1xyXG4gICAgICBzdGFydDoge1xyXG4gICAgICAgIHg6IHBhdGgucGF0aFswXVsxXSxcclxuICAgICAgICB5OiBwYXRoLnBhdGhbMF1bMl0sXHJcbiAgICAgIH0sXHJcbiAgICAgIGVuZDoge1xyXG4gICAgICAgIHg6IHBhdGgucGF0aFsyXVs1XSxcclxuICAgICAgICB5OiBwYXRoLnBhdGhbMl1bNl0sXHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbW1pdDogdHJ1ZSxcclxuICAgIH0pO1xyXG5cclxuICAgIGNhbnZhcy5saW5rc1tpZF0gPSB0aGlzO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBpZCxcclxuICAgICAgY2FudmFzLFxyXG4gICAgICBwYXRoLFxyXG4gICAgICBhcnJvd0hlYWQsXHJcbiAgICAgIGFycm93VGFpbCxcclxuICAgICAgaXNWYWxpZFRhaWxDb25uZWN0aW9uTWFzayxcclxuICAgICAgaXNWYWxpZEhlYWRDb25uZWN0aW9uTWFzayxcclxuICAgIH0gPSB0aGlzO1xyXG4gICAgY2FudmFzLnJlbW92ZShpc1ZhbGlkVGFpbENvbm5lY3Rpb25NYXNrKTtcclxuICAgIGNhbnZhcy5yZW1vdmUoaXNWYWxpZEhlYWRDb25uZWN0aW9uTWFzayk7XHJcbiAgICBjYW52YXMucmVtb3ZlKGFycm93SGVhZCk7XHJcbiAgICBjYW52YXMucmVtb3ZlKGFycm93VGFpbCk7XHJcbiAgICBjYW52YXMucmVtb3ZlKHBhdGgpO1xyXG5cclxuICAgIHRoaXMuZGlzY29ubmVjdExpbmsoJ3N0YXJ0Jyk7XHJcbiAgICB0aGlzLmRpc2Nvbm5lY3RMaW5rKCdlbmQnKTtcclxuICAgIGRlbGV0ZSBjYW52YXMubGlua3NbaWRdO1xyXG4gIH1cclxuXHJcbiAgY29ubmVjdExpbmsobGlua1BvaW50LCBzaGFwZUlkLCBjYXJkaW5hbCkge1xyXG4gICAgLy8gQ2hlY2sgbm90IGFscmVhZHkgY29ubmVjdGVkXHJcbiAgICBpZiAoIXRoaXMuaXNWYWxpZENvbm5lY3Rpb24obGlua1BvaW50LCBzaGFwZUlkLCBjYXJkaW5hbCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgc2hhcGUgPSB0aGlzLmNhbnZhcy5nZXRPYmplY3RzKClcclxuICAgICAgLmZpbmQoKG8pID0+IG8uaWQgPT09IHNoYXBlSWQpO1xyXG5cclxuICAgIC8vIERpc2Nvbm5lY3QgZXhpc3Rpbmcgb2JqZWN0XHJcbiAgICB0aGlzLmRpc2Nvbm5lY3RMaW5rKGxpbmtQb2ludCk7XHJcblxyXG4gICAgLy8gQ29ubmVjdFxyXG4gICAgdGhpcy5kaXJlY3Rpb25bbGlua1BvaW50XSA9IGNhcmRpbmFsO1xyXG4gICAgdGhpc1tsaW5rUG9pbnRdID0ge1xyXG4gICAgICBzaGFwZSxcclxuICAgICAgYW5jaG9yOiBjYXJkaW5hbCxcclxuICAgICAgaGFuZGxlcnM6IHtcclxuICAgICAgICBvbkFuY2hvclBvc2l0aW9uTW9kaWZ5aW5nOiAoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBvcHRzID0ge1xyXG4gICAgICAgICAgICBjb21taXQ6IGZhbHNlLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIG9wdHNbbGlua1BvaW50XSA9IHtcclxuICAgICAgICAgICAgeDogc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ubGVmdCxcclxuICAgICAgICAgICAgeTogc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0udG9wLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHRoaXMudXBkYXRlUGF0aChvcHRzKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQW5jaG9yUG9zaXRpb25Nb2RpZmllZDogKCkgPT4ge1xyXG4gICAgICAgICAgY29uc3Qgb3B0cyA9IHtcclxuICAgICAgICAgICAgY29tbWl0OiB0cnVlLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIG9wdHNbbGlua1BvaW50XSA9IHtcclxuICAgICAgICAgICAgeDogc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ubGVmdCxcclxuICAgICAgICAgICAgeTogc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0udG9wLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHRoaXMudXBkYXRlUGF0aChvcHRzKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICAgIC8vIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLm9wYWNpdHkgPSAwO1xyXG4gICAgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ub24oJ3BnOnBvc2l0aW9uOm1vZGlmeWluZycsIHRoaXNbbGlua1BvaW50XS5oYW5kbGVycy5vbkFuY2hvclBvc2l0aW9uTW9kaWZ5aW5nKTtcclxuICAgIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLm9uKCdwZzpwb3NpdGlvbjptb2RpZmllZCcsIHRoaXNbbGlua1BvaW50XS5oYW5kbGVycy5vbkFuY2hvclBvc2l0aW9uTW9kaWZpZWQpO1xyXG5cclxuICAgIC8vIFVwZGF0ZSBMaW5rXHJcbiAgICBjb25zdCBvcHRzID0ge1xyXG4gICAgICBjb21taXQ6IHRydWUsXHJcbiAgICB9O1xyXG4gICAgb3B0c1tsaW5rUG9pbnRdID0ge1xyXG4gICAgICB4OiBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5sZWZ0LFxyXG4gICAgICB5OiBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS50b3AsXHJcbiAgICB9O1xyXG4gICAgdGhpcy51cGRhdGVQYXRoKG9wdHMpO1xyXG4gIH1cclxuXHJcbiAgZGlzY29ubmVjdExpbmsobGlua1BvaW50KSB7XHJcbiAgICBpZiAodGhpc1tsaW5rUG9pbnRdKSB7XHJcbiAgICAgIHRoaXNbbGlua1BvaW50XS5zaGFwZS5hbmNob3JzW3RoaXNbbGlua1BvaW50XS5hbmNob3JdLm9mZigncGc6cG9zaXRpb246bW9kaWZ5aW5nJywgdGhpc1tsaW5rUG9pbnRdLmhhbmRsZXJzLm9uQW5jaG9yUG9zaXRpb25Nb2RpZnlpbmcpO1xyXG4gICAgICB0aGlzW2xpbmtQb2ludF0uc2hhcGUuYW5jaG9yc1t0aGlzW2xpbmtQb2ludF0uYW5jaG9yXS5vZmYoJ3BnOnBvc2l0aW9uOm1vZGlmaWVkJywgdGhpc1tsaW5rUG9pbnRdLmhhbmRsZXJzLm9uQW5jaG9yUG9zaXRpb25Nb2RpZmllZCk7XHJcbiAgICAgIGRlbGV0ZSB0aGlzW2xpbmtQb2ludF07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBicmluZ1RvRnJvbnQoKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgcGF0aCxcclxuICAgICAgYXJyb3dIZWFkLFxyXG4gICAgICBhcnJvd1RhaWwsXHJcbiAgICB9ID0gdGhpcztcclxuICAgIGNhbnZhcy5icmluZ1RvRnJvbnQocGF0aCk7XHJcbiAgICBjYW52YXMuYnJpbmdUb0Zyb250KGFycm93SGVhZCk7XHJcbiAgICBjYW52YXMuYnJpbmdUb0Zyb250KGFycm93VGFpbCk7XHJcbiAgfVxyXG5cclxuICBzZXRBY3RpdmUoYWN0aXZlKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHBhdGgsXHJcbiAgICAgIGFycm93SGVhZCxcclxuICAgICAgYXJyb3dUYWlsLFxyXG4gICAgfSA9IHRoaXM7XHJcblxyXG4gICAgaWYgKGFjdGl2ZSkge1xyXG4gICAgICBwYXRoLnNldCgnc3Ryb2tlJywgJyM3OGJlZmEnKTtcclxuICAgICAgYXJyb3dIZWFkLnNldCgnc3Ryb2tlJywgJyM3OGJlZmEnKTtcclxuICAgICAgYXJyb3dUYWlsLnNldCgnc3Ryb2tlJywgJyM3OGJlZmEnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHBhdGguc2V0KCdzdHJva2UnLCAnIzk5OScpO1xyXG4gICAgICBhcnJvd0hlYWQuc2V0KCdzdHJva2UnLCAnIzk5OScpO1xyXG4gICAgICBhcnJvd1RhaWwuc2V0KCdzdHJva2UnLCAnIzk5OScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29tcHV0ZVBhdGhDb29yZHMob3B0aW9ucykge1xyXG4gICAgLy8gTWFnaWUgbWFnaWUsIGV0IHZvcyBpZMOpZXMgb250IGR1IGfDqW5pZSAhXHJcblxyXG4gICAgY29uc3Qgc3RhcnQgPSB7XHJcbiAgICAgIHg6IG9wdGlvbnMuc3RhcnQueCxcclxuICAgICAgeTogb3B0aW9ucy5zdGFydC55LFxyXG4gICAgICBkaXJlY3Rpb246IG9wdGlvbnMuc3RhcnQgJiYgb3B0aW9ucy5zdGFydC5kaXJlY3Rpb24gPyBvcHRpb25zLnN0YXJ0LmRpcmVjdGlvbiA6IHRoaXMuZGlyZWN0aW9uLnN0YXJ0LFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGVuZCA9IHtcclxuICAgICAgeDogb3B0aW9ucy5lbmQueCxcclxuICAgICAgeTogb3B0aW9ucy5lbmQueSxcclxuICAgICAgZGlyZWN0aW9uOiBvcHRpb25zLmVuZCAmJiBvcHRpb25zLmVuZC5kaXJlY3Rpb24gPyBvcHRpb25zLmVuZC5kaXJlY3Rpb24gOiB0aGlzLmRpcmVjdGlvbi5lbmQsXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIENlbnRlciBwb2ludFxyXG4gICAgLy8gSWYgTGluayBpcyBjb25uZWN0ZWQsIGNlbnRlciBpcyBjYWxjdWxhdGVkIGJldHdlZW4gdGhlIHR3byBsaW5rZWQgc2hhcGVzXHJcbiAgICAvLyBJZiBub3QsIGl0IGlzIGNhbGN1bGF0ZWQgYmV0d2VlbiBsaW5rIHN0YXJ0IGFuZCBlbmQgcG9pbnRzXHJcbiAgICBjb25zdCBjZW50ZXIgPSB7XHJcbiAgICAgIHg6ICgoc3RhcnQueCArIGVuZC54KSAvIDIpLFxyXG4gICAgICB5OiAoKHN0YXJ0LnkgKyBlbmQueSkgLyAyKSxcclxuICAgIH07XHJcblxyXG4gICAgLy8gQ09NTUVOVEVEOiBEb2Vzbid0IHdvcmsgd2VsbCB3aGVuIGxpbmtlZCBzaGFwZSBpcyByb3RhdGVkXHJcbiAgICAvLyBpZiAodGhpcy5zdGFydCAmJiB0aGlzLmVuZCAmJiBzdGFydC5kaXJlY3Rpb24gIT09IGVuZC5kaXJlY3Rpb24pIHtcclxuICAgIC8vICAgY2VudGVyID0ge1xyXG4gICAgLy8gICAgIHg6ICh0aGlzLnN0YXJ0LnNoYXBlLmdldENlbnRlclBvaW50KCkueCArIHRoaXMuZW5kLnNoYXBlLmdldENlbnRlclBvaW50KCkueCkgLyAyLFxyXG4gICAgLy8gICAgIHk6ICh0aGlzLnN0YXJ0LnNoYXBlLmdldENlbnRlclBvaW50KCkueSArIHRoaXMuZW5kLnNoYXBlLmdldENlbnRlclBvaW50KCkueSkgLyAyLFxyXG4gICAgLy8gICB9O1xyXG4gICAgLy8gfVxyXG5cclxuICAgIGNvbnN0IGNvbnRyb2xzID0ge1xyXG4gICAgICBzdGFydDoge1xyXG4gICAgICAgIHg6IHN0YXJ0LngsXHJcbiAgICAgICAgeTogc3RhcnQueSxcclxuICAgICAgfSxcclxuICAgICAgZW5kOiB7XHJcbiAgICAgICAgeDogZW5kLngsXHJcbiAgICAgICAgeTogZW5kLnksXHJcbiAgICAgIH0sXHJcbiAgICAgIGNlbnRlcjE6IHtcclxuICAgICAgICB4OiBjZW50ZXIueCxcclxuICAgICAgICB5OiBjZW50ZXIueSxcclxuICAgICAgfSxcclxuICAgICAgY2VudGVyMjoge1xyXG4gICAgICAgIHg6IGNlbnRlci54LFxyXG4gICAgICAgIHk6IGNlbnRlci55LFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICAgIHN3aXRjaCAob3B0aW9ucy5zdGFydC5kaXJlY3Rpb24pIHtcclxuICAgICAgY2FzZSAnbm9ydGgnOlxyXG4gICAgICAgIGNvbnRyb2xzLnN0YXJ0LnkgLT0gTWF0aC5hYnMoc3RhcnQueSAtIGNlbnRlci55KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnc291dGgnOlxyXG4gICAgICAgIGNvbnRyb2xzLnN0YXJ0LnkgKz0gTWF0aC5hYnMoc3RhcnQueSAtIGNlbnRlci55KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnZWFzdCc6XHJcbiAgICAgICAgY29udHJvbHMuc3RhcnQueCArPSBNYXRoLmFicyhzdGFydC54IC0gY2VudGVyLngpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd3ZXN0JzpcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb250cm9scy5zdGFydC54IC09IE1hdGguYWJzKHN0YXJ0LnggLSBjZW50ZXIueCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICBzd2l0Y2ggKG9wdGlvbnMuZW5kLmRpcmVjdGlvbikge1xyXG4gICAgICBjYXNlICdub3J0aCc6XHJcbiAgICAgICAgY29udHJvbHMuZW5kLnkgLT0gTWF0aC5hYnMoZW5kLnkgLSBjZW50ZXIueSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3NvdXRoJzpcclxuICAgICAgICBjb250cm9scy5lbmQueSArPSBNYXRoLmFicyhlbmQueSAtIGNlbnRlci55KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnZWFzdCc6XHJcbiAgICAgICAgY29udHJvbHMuZW5kLnggKz0gTWF0aC5hYnMoZW5kLnggLSBjZW50ZXIueCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3dlc3QnOlxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbnRyb2xzLmVuZC54IC09IE1hdGguYWJzKGVuZC54IC0gY2VudGVyLngpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzdGFydC5kaXJlY3Rpb24gPT09IGVuZC5kaXJlY3Rpb24pIHtcclxuICAgICAgLy8gY29uc3QgZGVsdGFYID0gTWF0aC5hYnMoc3RhcnQueCAtIGVuZC54KSAvIDI7XHJcbiAgICAgIC8vIGNvbnN0IGRlbHRhWSA9IE1hdGguYWJzKHN0YXJ0LnkgLSBlbmQueSkgLyAyO1xyXG4gICAgICAvLyBjb25zdCBkZWx0YVggPSA0MCArIE1hdGguYWJzKHN0YXJ0LnggLSBlbmQueCkgLyA0O1xyXG4gICAgICAvLyBjb25zdCBkZWx0YVkgPSA0MCArIE1hdGguYWJzKHN0YXJ0LnkgLSBlbmQueSkgLyA0O1xyXG4gICAgICBjb25zdCBkZWx0YVggPSA0MDtcclxuICAgICAgY29uc3QgZGVsdGFZID0gNDA7XHJcblxyXG4gICAgICBpZiAoc3RhcnQuZGlyZWN0aW9uID09PSAnc291dGgnIHx8IHN0YXJ0LmRpcmVjdGlvbiA9PT0gJ25vcnRoJykge1xyXG4gICAgICAgIC8vIElmIGxpbmsgaXMgY29ubmVjdGVkIHRvIHR3byBzaGFwZXNcclxuICAgICAgICAvLyBJZiBzaGFwZXMgYXJlIGhvcml6b250YWxseSBhbGlnbmVkIChpLmUuIG9uIHRvcCBvZiBlYWNoIG90aGVyKSwgd2UgbW92ZSB0aGUgTGluayBjZW50ZXIgcG9pbnQgYSBiaXQgdG8gdGhlIGxlZnRcclxuICAgICAgICBpZiAodGhpcy5zdGFydCAmJiB0aGlzLmVuZCkge1xyXG4gICAgICAgICAgLy8gSWYgc2hhcGVzIGFyZSB2ZXJ0aWNhbGx5IGFsaWduZWQgKGkuZS4gbmV4dCB0byBlYWNoIG90aGVyKSwgd2UgbW92ZSB0aGUgTGluayBjZW50ZXIgcG9pbnQgYSBiaXQgdG8gdGhlIHRvcFxyXG4gICAgICAgICAgaWYgKE1hdGguYWJzKHN0YXJ0LnkgLSBlbmQueSkgPCAxMCkge1xyXG4gICAgICAgICAgICBjZW50ZXIueCAtPSAoKHRoaXMuc3RhcnQuc2hhcGUud2lkdGggKyB0aGlzLmVuZC5zaGFwZS53aWR0aCkgLyAyKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNlbnRlci55ICs9IChzdGFydC5kaXJlY3Rpb24gPT09ICdzb3V0aCcgPyBkZWx0YVkgOiAtZGVsdGFZKTtcclxuICAgICAgICBjb250cm9scy5zdGFydC55ID0gc3RhcnQueSArIChzdGFydC5kaXJlY3Rpb24gPT09ICdzb3V0aCcgPyBkZWx0YVkgOiAtZGVsdGFZKTtcclxuICAgICAgICBjb250cm9scy5lbmQueSA9IGVuZC55ICsgKHN0YXJ0LmRpcmVjdGlvbiA9PT0gJ3NvdXRoJyA/IGRlbHRhWSA6IC1kZWx0YVkpO1xyXG4gICAgICAgIGNvbnRyb2xzLmNlbnRlcjEueCA9IGNlbnRlci54O1xyXG4gICAgICAgIGNvbnRyb2xzLmNlbnRlcjIueCA9IGNlbnRlci54O1xyXG4gICAgICAgIGNvbnRyb2xzLmNlbnRlcjEueSA9IGNvbnRyb2xzLnN0YXJ0Lnk7XHJcbiAgICAgICAgY29udHJvbHMuY2VudGVyMi55ID0gY29udHJvbHMuZW5kLnk7XHJcbiAgICAgIH0gZWxzZSBpZiAoc3RhcnQuZGlyZWN0aW9uID09PSAnZWFzdCcgfHwgc3RhcnQuZGlyZWN0aW9uID09PSAnd2VzdCcpIHtcclxuICAgICAgICAvLyBJZiBsaW5rIGlzIGNvbm5lY3RlZCB0byB0d28gc2hhcGVzXHJcbiAgICAgICAgaWYgKHRoaXMuc3RhcnQgJiYgdGhpcy5lbmQpIHtcclxuICAgICAgICAgIC8vIElmIHNoYXBlcyBhcmUgdmVydGljYWxseSBhbGlnbmVkIChpLmUuIG5leHQgdG8gZWFjaCBvdGhlciksIHdlIG1vdmUgdGhlIExpbmsgY2VudGVyIHBvaW50IGEgYml0IHRvIHRoZSB0b3BcclxuICAgICAgICAgIGlmIChNYXRoLmFicyhzdGFydC55IC0gZW5kLnkpIDwgMTApIHtcclxuICAgICAgICAgICAgY2VudGVyLnkgLT0gKCh0aGlzLnN0YXJ0LnNoYXBlLmhlaWdodCArIHRoaXMuZW5kLnNoYXBlLmhlaWdodCkgLyAyKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNlbnRlci54ICs9IChzdGFydC5kaXJlY3Rpb24gPT09ICdlYXN0JyA/IGRlbHRhWCA6IC1kZWx0YVgpO1xyXG4gICAgICAgIGNvbnRyb2xzLnN0YXJ0LnggPSBzdGFydC54ICsgKHN0YXJ0LmRpcmVjdGlvbiA9PT0gJ2Vhc3QnID8gZGVsdGFYIDogLWRlbHRhWCk7XHJcbiAgICAgICAgY29udHJvbHMuZW5kLnggPSBlbmQueCArIChzdGFydC5kaXJlY3Rpb24gPT09ICdlYXN0JyA/IGRlbHRhWCA6IC1kZWx0YVgpO1xyXG4gICAgICAgIGNvbnRyb2xzLmNlbnRlcjEueCA9IGNvbnRyb2xzLnN0YXJ0Lng7XHJcbiAgICAgICAgY29udHJvbHMuY2VudGVyMi54ID0gY29udHJvbHMuZW5kLng7XHJcbiAgICAgICAgY29udHJvbHMuY2VudGVyMS55ID0gY2VudGVyLnk7XHJcbiAgICAgICAgY29udHJvbHMuY2VudGVyMi55ID0gY2VudGVyLnk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoc3RhcnQuZGlyZWN0aW9uID09PSAnc291dGgnIHx8IHN0YXJ0LmRpcmVjdGlvbiA9PT0gJ25vcnRoJykge1xyXG4gICAgICBjb250cm9scy5jZW50ZXIxLnggPSBjZW50ZXIueDtcclxuICAgICAgY29udHJvbHMuY2VudGVyMS55ID0gY29udHJvbHMuc3RhcnQueTtcclxuICAgICAgY29udHJvbHMuY2VudGVyMi54ID0gY2VudGVyLng7XHJcbiAgICAgIGNvbnRyb2xzLmNlbnRlcjIueSA9IGNvbnRyb2xzLmVuZC55O1xyXG4gICAgfSBlbHNlIGlmIChzdGFydC5kaXJlY3Rpb24gPT09ICdlYXN0JyB8fCBzdGFydC5kaXJlY3Rpb24gPT09ICd3ZXN0Jykge1xyXG4gICAgICBjb250cm9scy5jZW50ZXIxLnggPSBjb250cm9scy5zdGFydC54O1xyXG4gICAgICBjb250cm9scy5jZW50ZXIxLnkgPSBjZW50ZXIueTtcclxuICAgICAgY29udHJvbHMuY2VudGVyMi54ID0gY29udHJvbHMuZW5kLng7XHJcbiAgICAgIGNvbnRyb2xzLmNlbnRlcjIueSA9IGNlbnRlci55O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIElmIGxpbmsgaXMgY29ubmVjdGVkIHRvIGxpbmtlZCBzaGFwZXMgYW5kIHRoZXkgYXJlIHJvdGF0ZWQsIHBlcmZvcm0gdGhlIHJvdGF0aW9uIG9uIHRoZSBjb250cm9scyBwb2ludHNcclxuICAgIC8vIFRPRE86IHRvIGltcHJvdmVcclxuICAgIGlmICh0aGlzLnN0YXJ0ICYmIHRoaXMuc3RhcnQuc2hhcGUgJiYgdGhpcy5zdGFydC5zaGFwZS5hbmdsZSkge1xyXG4gICAgICBjb25zdCBhbmdsZSA9ICgodGhpcy5zdGFydC5zaGFwZS5hbmdsZSAqIE1hdGguUEkpIC8gMTgwKTtcclxuXHJcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSBuZXcgZmFicmljLlBvaW50KGNvbnRyb2xzLnN0YXJ0LngsIGNvbnRyb2xzLnN0YXJ0LnkpO1xyXG4gICAgICBjb25zdCBvcmlnaW4gPSBuZXcgZmFicmljLlBvaW50KHN0YXJ0LngsIHN0YXJ0LnkpO1xyXG4gICAgICBjb25zdCByb3RhdGVkQ29udHJvbCA9IGZhYnJpYy51dGlsLnJvdGF0ZVBvaW50KGNvbnRyb2wsIG9yaWdpbiwgYW5nbGUpO1xyXG5cclxuICAgICAgY29udHJvbHMuc3RhcnQueCA9IHJvdGF0ZWRDb250cm9sLng7XHJcbiAgICAgIGNvbnRyb2xzLnN0YXJ0LnkgPSByb3RhdGVkQ29udHJvbC55O1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZW5kICYmIHRoaXMuZW5kLnNoYXBlICYmIHRoaXMuZW5kLnNoYXBlLmFuZ2xlKSB7XHJcbiAgICAgIGNvbnN0IGFuZ2xlID0gKCh0aGlzLmVuZC5zaGFwZS5hbmdsZSAqIE1hdGguUEkpIC8gMTgwKTtcclxuXHJcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSBuZXcgZmFicmljLlBvaW50KGNvbnRyb2xzLmVuZC54LCBjb250cm9scy5lbmQueSk7XHJcbiAgICAgIGNvbnN0IG9yaWdpbiA9IG5ldyBmYWJyaWMuUG9pbnQoZW5kLngsIGVuZC55KTtcclxuICAgICAgY29uc3Qgcm90YXRlZENvbnRyb2wgPSBmYWJyaWMudXRpbC5yb3RhdGVQb2ludChjb250cm9sLCBvcmlnaW4sIGFuZ2xlKTtcclxuXHJcbiAgICAgIGNvbnRyb2xzLmVuZC54ID0gcm90YXRlZENvbnRyb2wueDtcclxuICAgICAgY29udHJvbHMuZW5kLnkgPSByb3RhdGVkQ29udHJvbC55O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFZpc3VhbCBkZWJ1Z1xyXG4gICAgLy8gdGhpcy5jYW52YXMuYWRkKG5ldyBmYWJyaWMuQ2lyY2xlKHtcclxuICAgIC8vICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAvLyAgIGxlZnQ6IGNvbnRyb2xzLmVuZC54LFxyXG4gICAgLy8gICB0b3A6IGNvbnRyb2xzLmVuZC55LFxyXG4gICAgLy8gICBzdHJva2VXaWR0aDogMSxcclxuICAgIC8vICAgcmFkaXVzOiAyLFxyXG4gICAgLy8gICBmaWxsOiAnIzc4YmVmYScsXHJcbiAgICAvLyAgIHN0cm9rZTogJyM3OGJlZmEnLFxyXG4gICAgLy8gICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgIC8vICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAvLyAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgLy8gICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAvLyAgIHNlbGVjdGFibGU6IHRydWUsXHJcbiAgICAvLyAgIG9wYWNpdHk6IDEsXHJcbiAgICAvLyB9KSk7XHJcbiAgICAvLyB0aGlzLmNhbnZhcy5hZGQobmV3IGZhYnJpYy5DaXJjbGUoe1xyXG4gICAgLy8gICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgIC8vICAgbGVmdDogY2VudGVyLngsXHJcbiAgICAvLyAgIHRvcDogY2VudGVyLnksXHJcbiAgICAvLyAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgLy8gICByYWRpdXM6IDIsXHJcbiAgICAvLyAgIGZpbGw6ICcjZmYyJyxcclxuICAgIC8vICAgc3Ryb2tlOiAnI2ZmMicsXHJcbiAgICAvLyAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgLy8gICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgIC8vICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAvLyAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgIC8vICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgIC8vICAgb3BhY2l0eTogMSxcclxuICAgIC8vIH0pKTtcclxuICAgIC8vIHRoaXMuY2FudmFzLmFkZChuZXcgZmFicmljLkNpcmNsZSh7XHJcbiAgICAvLyAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgLy8gICBsZWZ0OiBjb250cm9scy5zdGFydC54LFxyXG4gICAgLy8gICB0b3A6IGNvbnRyb2xzLnN0YXJ0LnksXHJcbiAgICAvLyAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgLy8gICByYWRpdXM6IDIsXHJcbiAgICAvLyAgIGZpbGw6ICcjZjIyJyxcclxuICAgIC8vICAgc3Ryb2tlOiAnI2YyMicsXHJcbiAgICAvLyAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgLy8gICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgIC8vICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAvLyAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgIC8vICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgIC8vICAgb3BhY2l0eTogMSxcclxuICAgIC8vIH0pKTtcclxuXHJcbiAgICBjb25zdCBjb29yZHMgPSB7XHJcbiAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgeDogc3RhcnQueCxcclxuICAgICAgICB5OiBzdGFydC55LFxyXG4gICAgICB9LFxyXG4gICAgICBlbmQ6IHtcclxuICAgICAgICB4OiBlbmQueCxcclxuICAgICAgICB5OiBlbmQueSxcclxuICAgICAgfSxcclxuICAgICAgY2VudGVyLFxyXG4gICAgICBjb250cm9sczoge1xyXG4gICAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgICB4OiBjb250cm9scy5zdGFydC54LFxyXG4gICAgICAgICAgeTogY29udHJvbHMuc3RhcnQueSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVuZDoge1xyXG4gICAgICAgICAgeDogY29udHJvbHMuZW5kLngsXHJcbiAgICAgICAgICB5OiBjb250cm9scy5lbmQueSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNlbnRlcjE6IHtcclxuICAgICAgICAgIHg6IGNvbnRyb2xzLmNlbnRlcjEueCxcclxuICAgICAgICAgIHk6IGNvbnRyb2xzLmNlbnRlcjEueSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNlbnRlcjI6IHtcclxuICAgICAgICAgIHg6IGNvbnRyb2xzLmNlbnRlcjIueCxcclxuICAgICAgICAgIHk6IGNvbnRyb2xzLmNlbnRlcjIueSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHBhdGhDb29yZHNBcnJheSA9IFtcclxuICAgICAgWydNJywgY29vcmRzLnN0YXJ0LngsIGNvb3Jkcy5zdGFydC55XSxcclxuICAgICAgWydDJywgY29vcmRzLmNvbnRyb2xzLnN0YXJ0LngsIGNvb3Jkcy5jb250cm9scy5zdGFydC55LCBjb29yZHMuY29udHJvbHMuY2VudGVyMS54LCBjb29yZHMuY29udHJvbHMuY2VudGVyMS55LCBjb29yZHMuY2VudGVyLngsIGNvb3Jkcy5jZW50ZXIueV0sXHJcbiAgICAgIFsnQycsIGNvb3Jkcy5jb250cm9scy5jZW50ZXIyLngsIGNvb3Jkcy5jb250cm9scy5jZW50ZXIyLnksIGNvb3Jkcy5jb250cm9scy5lbmQueCwgY29vcmRzLmNvbnRyb2xzLmVuZC55LCBjb29yZHMuZW5kLngsIGNvb3Jkcy5lbmQueV0sXHJcbiAgICBdO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcGF0aENvb3JkczogY29vcmRzLFxyXG4gICAgICBwYXRoQ29vcmRzQXJyYXksXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0gb3B0aW9uc1xyXG4gICAqIEBwYXJhbSBvcHRpb25zLnN0YXJ0LnhcclxuICAgKiBAcGFyYW0gb3B0aW9ucy5zdGFydC55XHJcbiAgICogQHBhcmFtIG9wdGlvbnMuZW5kLnhcclxuICAgKiBAcGFyYW0gb3B0aW9ucy5lbmQueVxyXG4gICAqIEBwYXJhbSBvcHRpb25zLmNvbW1pdFxyXG4gICAqL1xyXG4gIHVwZGF0ZVBhdGgob3B0aW9ucykge1xyXG4gICAgY29uc3Qgc3RhcnQgPSB7XHJcbiAgICAgIHg6IG9wdGlvbnMuc3RhcnQgJiYgb3B0aW9ucy5zdGFydC54ID8gb3B0aW9ucy5zdGFydC54IDogdGhpcy5wYXRoLnBhdGhbMF1bMV0sXHJcbiAgICAgIHk6IG9wdGlvbnMuc3RhcnQgJiYgb3B0aW9ucy5zdGFydC55ID8gb3B0aW9ucy5zdGFydC55IDogdGhpcy5wYXRoLnBhdGhbMF1bMl0sXHJcbiAgICAgIGRpcmVjdGlvbjogb3B0aW9ucy5zdGFydCAmJiBvcHRpb25zLnN0YXJ0LmRpcmVjdGlvbiA/IG9wdGlvbnMuc3RhcnQuZGlyZWN0aW9uIDogdGhpcy5kaXJlY3Rpb24uc3RhcnQsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgZW5kID0ge1xyXG4gICAgICB4OiBvcHRpb25zLmVuZCAmJiBvcHRpb25zLmVuZC54ID8gb3B0aW9ucy5lbmQueCA6IHRoaXMucGF0aC5wYXRoWzJdWzVdLFxyXG4gICAgICB5OiBvcHRpb25zLmVuZCAmJiBvcHRpb25zLmVuZC55ID8gb3B0aW9ucy5lbmQueSA6IHRoaXMucGF0aC5wYXRoWzJdWzZdLFxyXG4gICAgICBkaXJlY3Rpb246IG9wdGlvbnMuZW5kICYmIG9wdGlvbnMuZW5kLmRpcmVjdGlvbiA/IG9wdGlvbnMuZW5kLmRpcmVjdGlvbiA6IHRoaXMuZGlyZWN0aW9uLmVuZCxcclxuICAgIH07XHJcbiAgICBjb25zdCB7IHBhdGhDb29yZHNBcnJheSB9ID0gdGhpcy5jb21wdXRlUGF0aENvb3Jkcyh7XHJcbiAgICAgIHN0YXJ0LCBlbmQsXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAob3B0aW9ucy5jb21taXQpIHtcclxuICAgICAgY29uc3QgbmV3UGF0aCA9IG5ldyBmYWJyaWMuUGF0aChwYXRoQ29vcmRzQXJyYXksIHRoaXMuZGVmYXVsdFBhdGhPcHRpb25zKTtcclxuICAgICAgdGhpcy5jYW52YXMucmVtb3ZlKHRoaXMucGF0aCk7XHJcbiAgICAgIHRoaXMuY2FudmFzLmFkZChuZXdQYXRoKTtcclxuXHJcbiAgICAgIG5ld1BhdGgub24oJ21vdXNlZG93bicsIHRoaXMuYnJpbmdUb0Zyb250LmJpbmQodGhpcykpO1xyXG4gICAgICBuZXdQYXRoLm9uKCdtb3ZpbmcnLCB0aGlzLm9uTGlua01vdmluZy5iaW5kKHRoaXMpKTtcclxuICAgICAgbmV3UGF0aC5vbignbW92ZWQnLCB0aGlzLm9uTGlua01vdmVkLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgY29uc3QgdG9CaW5kID0gW1xyXG4gICAgICAgIHRoaXMuYXJyb3dIZWFkLFxyXG4gICAgICAgIHRoaXMuYXJyb3dUYWlsLFxyXG4gICAgICBdO1xyXG4gICAgICBjb25zdCBib3NzVHJhbnNmb3JtID0gbmV3UGF0aC5jYWxjVHJhbnNmb3JtTWF0cml4KCk7XHJcbiAgICAgIGNvbnN0IGludmVydGVkQm9zc1RyYW5zZm9ybSA9IGZhYnJpYy51dGlsLmludmVydFRyYW5zZm9ybShib3NzVHJhbnNmb3JtKTtcclxuICAgICAgdG9CaW5kLmZvckVhY2goKG8pID0+IHtcclxuICAgICAgICBjb25zdCBkZXNpcmVkVHJhbnNmb3JtID0gZmFicmljLnV0aWwubXVsdGlwbHlUcmFuc2Zvcm1NYXRyaWNlcyhcclxuICAgICAgICAgIGludmVydGVkQm9zc1RyYW5zZm9ybSxcclxuICAgICAgICAgIG8uY2FsY1RyYW5zZm9ybU1hdHJpeCgpLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXHJcbiAgICAgICAgby5yZWxhdGlvbnNoaXAgPSBkZXNpcmVkVHJhbnNmb3JtO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMucGF0aCA9IG5ld1BhdGg7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhdGguc2V0KCdwYXRoJywgcGF0aENvb3Jkc0FycmF5KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBVcGRhdGUgY29udHJvbCBsaW5lcywgYXJyb3cgaGVhZHMgYW5kIHRhaWxzXHJcbiAgICBjb25zdCBhcnJvd0hlYWRBbmdsZSA9IChNYXRoLmF0YW4yKHRoaXMucGF0aC5wYXRoWzJdWzZdIC0gdGhpcy5wYXRoLnBhdGhbMl1bNF0sIHRoaXMucGF0aC5wYXRoWzJdWzVdIC0gdGhpcy5wYXRoLnBhdGhbMl1bM10pICogMTgwKSAvIE1hdGguUEk7XHJcbiAgICB0aGlzLmFycm93SGVhZC5hbmdsZSA9IGFycm93SGVhZEFuZ2xlICsgOTA7XHJcbiAgICB0aGlzLmFycm93SGVhZC5sZWZ0ID0gdGhpcy5wYXRoLnBhdGhbMl1bNV07XHJcbiAgICB0aGlzLmFycm93SGVhZC50b3AgPSB0aGlzLnBhdGgucGF0aFsyXVs2XTtcclxuICAgIHRoaXMuYXJyb3dIZWFkLnNldENvb3JkcygpO1xyXG4gICAgdGhpcy5hcnJvd1RhaWwubGVmdCA9IHRoaXMucGF0aC5wYXRoWzBdWzFdO1xyXG4gICAgdGhpcy5hcnJvd1RhaWwudG9wID0gdGhpcy5wYXRoLnBhdGhbMF1bMl07XHJcbiAgICB0aGlzLmFycm93VGFpbC5zZXRDb29yZHMoKTtcclxuXHJcbiAgICB0aGlzLmJyaW5nVG9Gcm9udCgpO1xyXG4gIH1cclxuXHJcbiAgaXNWYWxpZENvbm5lY3Rpb24obGlua1BvaW50LCBzaGFwZUlkLCBjYXJkaW5hbCkge1xyXG4gICAgY29uc3Qgc2hhcGUgPSB0aGlzLmNhbnZhcy5nZXRPYmplY3RzKClcclxuICAgICAgLmZpbmQoKG8pID0+IG8uaWQgPT09IHNoYXBlSWQpO1xyXG4gICAgLy8gQ2hlY2sgbm90IGFscmVhZHkgY29ubmVjdGVkXHJcbiAgICBpZiAobGlua1BvaW50ID09PSAnc3RhcnQnKSB7XHJcbiAgICAgIGlmICh0aGlzLnN0YXJ0ICYmIHRoaXMuc3RhcnQuc2hhcGUgJiYgdGhpcy5zdGFydC5zaGFwZS5pZCA9PT0gc2hhcGUuaWQgJiYgdGhpcy5zdGFydC5jYXJkaW5hbCA9PT0gY2FyZGluYWwpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIHRyeWluZyBlbmQgc2V0IHRoZSBzYW1lIGFscmVhZHkgY29ubmVjdGVkIGFuY2hvclxyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLmVuZCAmJiB0aGlzLmVuZC5zaGFwZSAmJiB0aGlzLmVuZC5zaGFwZS5pZCA9PT0gc2hhcGUuaWQpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIHRyeWluZyBlbmQgc2hvcnQgY2lyY3VpdCB0aGUgcmVjdGFuZ2xlXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAobGlua1BvaW50ID09PSAnZW5kJykge1xyXG4gICAgICBpZiAodGhpcy5lbmQgJiYgdGhpcy5lbmQuc2hhcGUgJiYgdGhpcy5lbmQuc2hhcGUuaWQgPT09IHNoYXBlLmlkICYmIHRoaXMuZW5kLmNhcmRpbmFsID09PSBjYXJkaW5hbCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTsgLy8gdHJ5aW5nIGVuZCBzZXQgdGhlIHNhbWUgYWxyZWFkeSBjb25uZWN0ZWQgYW5jaG9yXHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuc3RhcnQgJiYgdGhpcy5zdGFydC5zaGFwZSAmJiB0aGlzLnN0YXJ0LnNoYXBlLmlkID09PSBzaGFwZS5pZCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTsgLy8gdHJ5aW5nIGVuZCBzaG9ydCBjaXJjdWl0IHRoZSByZWN0YW5nbGVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVBbGxBbmNob3JzT3BhY2l0eShvcGFjaXR5KSB7XHJcbiAgICByZXR1cm47XHJcblxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVucmVhY2hhYmxlXHJcbiAgICBjb25zdCBhbmNob3JzID0gdGhpcy5jYW52YXMuZ2V0T2JqZWN0cygpXHJcbiAgICAgIC5maWx0ZXIoKG8pID0+IG8udHlwZSA9PT0gJ2FuY2hvcicpO1xyXG5cclxuICAgIC8vIGNvbnN0IHByb21pc2VzID0gW107XHJcbiAgICAvLyBjb25zdCBwcm9taXNlRmFjdG9yeSA9IGZ1bmN0aW9uIChhbmNob3IpIHtcclxuICAgIC8vICAgcmV0dXJuIGZ1bmN0aW9uIChyZXNvbHZlKSB7XHJcbiAgICAvLyAgICAgYW5jaG9yLmFuaW1hdGUoJ29wYWNpdHknLCBvcGFjaXR5LCB7XHJcbiAgICAvLyAgICAgICBkdXJhdGlvbjogMzAwLFxyXG4gICAgLy8gICAgICAgb25DaGFuZ2U6IHJlc29sdmUsXHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyAgIH07XHJcbiAgICAvLyB9O1xyXG4gICAgLy8gZm9yIChsZXQgYSA9IDA7IGEgPCBhbmNob3JzLmxlbmd0aDsgYSArPSAxKSB7XHJcbiAgICAvLyAgIGlmIChsb2NrICE9PSB1bmRlZmluZWQpIGFuY2hvcnNbYV0ubG9ja09wYWNpdHkgPSBsb2NrO1xyXG4gICAgLy8gICBwcm9taXNlcy5wdXNoKG5ldyBQcm9taXNlKHByb21pc2VGYWN0b3J5KGFuY2hvcnNbYV0pKSk7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiB7XHJcbiAgICAvLyAgIHRoaXMuY2FudmFzLnJlbmRlckFsbCgpO1xyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgZm9yIChsZXQgYSA9IDA7IGEgPCBhbmNob3JzLmxlbmd0aDsgYSArPSAxKSB7XHJcbiAgICAgIC8vIGlmIChsb2NrICE9PSB1bmRlZmluZWQpIGFuY2hvcnNbYV0ubG9ja09wYWNpdHkgPSBsb2NrO1xyXG4gICAgICBhbmNob3JzW2FdLnNldCgnb3BhY2l0eScsIG9wYWNpdHkpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jYW52YXMucmVuZGVyQWxsKCk7XHJcbiAgfVxyXG5cclxuICBvbkxpbmtNb3ZpbmcoKSB7XHJcbiAgICAvLyBNb3ZlIHN0YXJ0LCBlbmQsIGNvbnRyb2wgcG9pbnRzIGFsdG9nZXRoZXIgd2l0aCB0aGUgUGF0aFxyXG4gICAgY29uc3QgdG9VcGRhdGUgPSBbXHJcbiAgICAgIHRoaXMuYXJyb3dIZWFkLFxyXG4gICAgICB0aGlzLmFycm93VGFpbCxcclxuICAgIF07XHJcblxyXG4gICAgY29uc3Qga2VlcEhlYWRBbmdsZSA9IHRoaXMuYXJyb3dIZWFkLmFuZ2xlO1xyXG4gICAgY29uc3Qga2VlcFRhaWxBbmdsZSA9IHRoaXMuYXJyb3dUYWlsLmFuZ2xlO1xyXG5cclxuICAgIHRvVXBkYXRlLmZvckVhY2goKG8pID0+IHtcclxuICAgICAgaWYgKCFvLnJlbGF0aW9uc2hpcCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCB7IHJlbGF0aW9uc2hpcCB9ID0gbztcclxuICAgICAgY29uc3QgbmV3VHJhbnNmb3JtID0gZmFicmljLnV0aWwubXVsdGlwbHlUcmFuc2Zvcm1NYXRyaWNlcyhcclxuICAgICAgICB0aGlzLnBhdGguY2FsY1RyYW5zZm9ybU1hdHJpeCgpLFxyXG4gICAgICAgIHJlbGF0aW9uc2hpcCxcclxuICAgICAgKTtcclxuICAgICAgY29uc3Qgb3B0ID0gZmFicmljLnV0aWwucXJEZWNvbXBvc2UobmV3VHJhbnNmb3JtKTtcclxuICAgICAgby5zZXQoe1xyXG4gICAgICAgIGZsaXBYOiBmYWxzZSxcclxuICAgICAgICBmbGlwWTogZmFsc2UsXHJcbiAgICAgIH0pO1xyXG4gICAgICBvLnNldFBvc2l0aW9uQnlPcmlnaW4oXHJcbiAgICAgICAgeyB4OiBvcHQudHJhbnNsYXRlWCwgeTogb3B0LnRyYW5zbGF0ZVkgfSxcclxuICAgICAgICAnY2VudGVyJyxcclxuICAgICAgICAnY2VudGVyJyxcclxuICAgICAgKTtcclxuICAgICAgby5zZXQob3B0KTtcclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXHJcbiAgICAgIG8uYW5nbGUgPSAobyA9PT0gdGhpcy5hcnJvd0hlYWQpID8ga2VlcEhlYWRBbmdsZSA6IGtlZXBUYWlsQW5nbGU7IC8vIHByZXNlcnZlIHByZXZpb3VzIGFuZ2xlXHJcblxyXG4gICAgICBvLnNldENvb3JkcygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gRmluYWxseSwgY2hlY2sgdGhlIHN0YXJ0IG9yIGVuZCBwb2ludHMgY2FuIGJlIGNvbm5lY3RlZC5cclxuICAgIHRoaXMuX2NoZWNrRXh0cmVtaXR5Q2FuQmVDb25uZWN0ZWQoJ3N0YXJ0Jyk7XHJcbiAgICB0aGlzLl9jaGVja0V4dHJlbWl0eUNhbkJlQ29ubmVjdGVkKCdlbmQnKTtcclxuICB9XHJcblxyXG4gIG9uTGlua01vdmVkKCkge1xyXG4gICAgLy8gUmV1cGRhdGUgdGhlIFBhdGggYWNjb3JkaW5nIGVuZCB0aGUgbmV3IGNvb3JkaW5hdGVzIG9mIGFsbCBlbGVtZW50c1xyXG4gICAgdGhpcy51cGRhdGVQYXRoKHtcclxuICAgICAgc3RhcnQ6IHtcclxuICAgICAgICB4OiB0aGlzLmFycm93VGFpbC5sZWZ0LFxyXG4gICAgICAgIHk6IHRoaXMuYXJyb3dUYWlsLnRvcCxcclxuICAgICAgfSxcclxuICAgICAgZW5kOiB7XHJcbiAgICAgICAgeDogdGhpcy5hcnJvd0hlYWQubGVmdCxcclxuICAgICAgICB5OiB0aGlzLmFycm93SGVhZC50b3AsXHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbW1pdDogdHJ1ZSxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIENvbm5lY3Qgb3IgRGlzY29ubmVjdCBkZXBlbmRpbmcgb24gZXh0cmVtaXRpZXMgcG9zaXRpb25zXHJcbiAgICB0aGlzLmlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2suc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICB0aGlzLmlzVmFsaWRIZWFkQ29ubmVjdGlvbk1hc2suc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICB0aGlzLl9jb25uZWN0RGlzY29ubmVjdEV4dHJlbWl0eSgnc3RhcnQnKTtcclxuICAgIHRoaXMuX2Nvbm5lY3REaXNjb25uZWN0RXh0cmVtaXR5KCdlbmQnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhlbHBlciBlbmQgZGlzcGxheSBhIHZhbGlkIGNpcmNsZSBtYXNrIG9uIHNwZWNpZmljIGNvbmRpdGlvbnMuXHJcbiAgICogSWYgdGhlIGV4dHJlbWl0eSBpcyB0b3VjaGluZyBhbiBhbmNob3Igb2YgYSBMaW5rYWJsZVNoYXBlIHN0YXJ0IHdoaWNoIGl0IGlzIG5vdCB5ZXQgY29ubmVjdGVkID0+IHNob3cgR1JFRU5cclxuICAgKiBJZiB0aGUgZXh0cmVtaXR5IGlzIHRvdWNoaW5nIGFuIGFuY2hvciBvZiBhIExpbmthYmxlU2hhcGUgc3RhcnQgd2hpY2ggaXQgaXMgYWxyZWFkeSBjb25uZWN0ZWQgYnkgdGhlIG90aGVyIGV4dHJlbWl0eSA9PiBzaG93IFJFRFxyXG4gICAqIEBwYXJhbSBkaXJlY3Rpb25cclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9jaGVja0V4dHJlbWl0eUNhbkJlQ29ubmVjdGVkKGRpcmVjdGlvbikge1xyXG4gICAgY29uc3QgeyBjYW52YXMgfSA9IHRoaXM7XHJcblxyXG4gICAgbGV0IGV4dHJlbWl0eTtcclxuICAgIGxldCBtYXNrO1xyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3N0YXJ0Jykge1xyXG4gICAgICBleHRyZW1pdHkgPSB0aGlzLmFycm93VGFpbDtcclxuICAgICAgbWFzayA9IHRoaXMuaXNWYWxpZFRhaWxDb25uZWN0aW9uTWFzaztcclxuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnZW5kJykge1xyXG4gICAgICBleHRyZW1pdHkgPSB0aGlzLmFycm93SGVhZDtcclxuICAgICAgbWFzayA9IHRoaXMuaXNWYWxpZEhlYWRDb25uZWN0aW9uTWFzaztcclxuICAgIH1cclxuXHJcbiAgICBtYXNrLmxlZnQgPSBleHRyZW1pdHkubGVmdDtcclxuICAgIG1hc2sudG9wID0gZXh0cmVtaXR5LnRvcDtcclxuICAgIG1hc2suc2V0Q29vcmRzKCk7XHJcbiAgICBtYXNrLnNldCgnb3BhY2l0eScsIDApO1xyXG5cclxuICAgIC8vIENoZWNrIGlmIGludGVyc2VjdHMgd2l0aCBhbmNob3JcclxuICAgIGNvbnN0IGFuY2hvcnMgPSBjYW52YXMuZ2V0T2JqZWN0cygpXHJcbiAgICAgIC5maWx0ZXIoKG8pID0+IG8udHlwZSA9PT0gJ2FuY2hvcicpO1xyXG4gICAgZm9yIChsZXQgYSA9IDA7IGEgPCBhbmNob3JzLmxlbmd0aDsgYSArPSAxKSB7XHJcbiAgICAgIGlmIChleHRyZW1pdHkuaW50ZXJzZWN0c1dpdGhPYmplY3QoYW5jaG9yc1thXSkpIHtcclxuICAgICAgICBtYXNrLnNldCgnb3BhY2l0eScsIDAuNSk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZENvbm5lY3Rpb24oZGlyZWN0aW9uLCBhbmNob3JzW2FdLnNoYXBlSWQsIGFuY2hvcnNbYV0uY2FyZGluYWwpKSB7XHJcbiAgICAgICAgICBtYXNrLnNldCh7XHJcbiAgICAgICAgICAgIHN0cm9rZTogJyM1N2I4NTcnLFxyXG4gICAgICAgICAgICBmaWxsOiAnIzU3Yjg1NycsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGNvbnN0IG9wdHMgPSB7XHJcbiAgICAgICAgICAgIGNvbW1pdDogZmFsc2UsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgb3B0c1tkaXJlY3Rpb25dID0ge1xyXG4gICAgICAgICAgICB4OiBleHRyZW1pdHkubGVmdCxcclxuICAgICAgICAgICAgeTogZXh0cmVtaXR5LnRvcCxcclxuICAgICAgICAgICAgZGlyZWN0aW9uOiBhbmNob3JzW2FdLmNhcmRpbmFsLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHRoaXMudXBkYXRlUGF0aChvcHRzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbWFzay5zZXQoe1xyXG4gICAgICAgICAgICBzdHJva2U6ICcjZWE0ZjM3JyxcclxuICAgICAgICAgICAgZmlsbDogJyNlYTRmMzcnLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIZWxwZXIgZW5kIGV4ZWN1dGUgY29ubmVjdC9kaXNjb25uZWN0IGRlcGVuZGluZyBvbiBzcGVjaWZpYyBjb25kaXRpb25zLlxyXG4gICAqIElmIHRoZSBleHRyZW1pdHkgd2FzIGNvbm5lY3RlZCBBTkQgaXQgaXMgTk9UIHRvdWNoaW5nIHRoZSBhbmNob3IgYW55bW9yZSA9PiBkaXNjb25uZWN0IGl0LlxyXG4gICAqIElmIHRoZSBleHRyZW1pdHkgd2FzIGRpc2Nvbm5lY3RlZCBBTkQgaXQgaXMgdG91Y2hpbmcgdGhlIGFuY2hvciA9PiBjb25uZWN0IGl0LlxyXG4gICAqIEBwYXJhbSBkaXJlY3Rpb25cclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9jb25uZWN0RGlzY29ubmVjdEV4dHJlbWl0eShkaXJlY3Rpb24pIHtcclxuICAgIGNvbnN0IHsgY2FudmFzIH0gPSB0aGlzO1xyXG5cclxuICAgIGxldCBleHRyZW1pdHk7XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSAnc3RhcnQnKSB7XHJcbiAgICAgIGV4dHJlbWl0eSA9IHRoaXMuYXJyb3dUYWlsO1xyXG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09ICdlbmQnKSB7XHJcbiAgICAgIGV4dHJlbWl0eSA9IHRoaXMuYXJyb3dIZWFkO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENoZWNrIGlmIGludGVyc2VjdHMgd2l0aCBhbmNob3JcclxuICAgIGNvbnN0IGFuY2hvcnMgPSBjYW52YXMuZ2V0T2JqZWN0cygpXHJcbiAgICAgIC5maWx0ZXIoKG8pID0+IG8udHlwZSA9PT0gJ2FuY2hvcicpO1xyXG4gICAgZm9yIChsZXQgYSA9IDA7IGEgPCBhbmNob3JzLmxlbmd0aDsgYSArPSAxKSB7XHJcbiAgICAgIGlmIChleHRyZW1pdHkuaW50ZXJzZWN0c1dpdGhPYmplY3QoYW5jaG9yc1thXSkpIHtcclxuICAgICAgICB0aGlzLmNvbm5lY3RMaW5rKGRpcmVjdGlvbiwgYW5jaG9yc1thXS5zaGFwZUlkLCBhbmNob3JzW2FdLmNhcmRpbmFsKTtcclxuICAgICAgICAvLyBhbmNob3JzW2FdLnNldCgnc3Ryb2tlJywgJyMwMDAnKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzW2RpcmVjdGlvbl0gJiYgYW5jaG9yc1thXSA9PT0gdGhpc1tkaXJlY3Rpb25dLnNoYXBlLmFuY2hvcnNbdGhpc1tkaXJlY3Rpb25dLmFuY2hvcl0pIHtcclxuICAgICAgICAvLyBJZiB0aGlzIGxpbmsgd2FzIGNvbm5lY3RlZCBlbmQgdGhpcyBhbmNob3IgYW5kIGl0IGRvZXNuJ3QgaW50ZXJzZWN0IGFueW1vcmVcclxuICAgICAgICB0aGlzLmRpc2Nvbm5lY3RMaW5rKGRpcmVjdGlvbik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IExpbmthYmxlU2hhcGUgZnJvbSAnLi9MaW5rYWJsZVNoYXBlLmpzJztcclxuaW1wb3J0IEN1cnZlZExpbmsgZnJvbSAnLi9DdXJ2ZWRMaW5rLmpzJztcclxuXHJcbmNvbnN0IHsgZmFicmljLCBfIH0gPSB3aW5kb3c7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFeHBhbmRhYmxlQ29udGFpbmVyIGV4dGVuZHMgTGlua2FibGVTaGFwZSB7XHJcbiAgLyoqXHJcbiAgICogQSBDb250YWluZXIgaXMgYSBSZWN0IHdpdGggYW4gSVRleHQuIENhbiBiZSBleHBhbmRlZCB0byByZXZlYWwgY29udGFpbmVkIFNoYXBlcy5cclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgb3B0aW9uc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtGYWJyaWMuQ2FudmFzfSAgIG9wdGlvbnMuY2FudmFzIC0gRmFicmljIGNhbnZhc1xyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICBvcHRpb25zLmlkIC0gVW5pcXVlIGlkZW50aWZpZXIgKHBoeXNpY2FsIGlkIG9mIHRoZSBvYmplY3QpXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIG9wdGlvbnMud2lkdGhcclxuICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgb3B0aW9ucy5oZWlnaHRcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgb3B0aW9ucy5sYWJlbFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBvcHRpb25zLmltZ1xyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICBvcHRpb25zLmltZy5zcmMgLSBVUkwgb2YgYW4gaWNvbiAocmVwcmVzZW50aW5nIHRoZSB0eXBlIG9mIHRoZSBvYmplY3QpXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIG9wdGlvbnMuY2hpbGRXaWR0aFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBvcHRpb25zLmNoaWxkSGVpZ2h0XHJcbiAgICogQHBhcmFtIHtBcnJheX0gICAgICAgICAgIG9wdGlvbnMuY2hpbGRyZW5cclxuICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgb3B0aW9ucy5jaGlsZHJlbi4kLmlkIC0gVW5pcXVlIGNoaWxkcmVuIGlkZW50aWZpZXIgKHBoeXNpY2FsIGlkIG9mIHRoZSBjaGlsZClcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgb3B0aW9ucy5jaGlsZHJlbi4kLmxhYmVsXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgICAgIG9wdGlvbnMuY2hpbGRyZW4uJC5pbmRleFxyXG4gICAqIEBwYXJhbiB7T2JqZWN0fSAgICAgICAgICBvcHRpb25zLmNoaWxkcmVuLiQuaW1nXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgIG9wdGlvbnMuY2hpbGRyZW4uJC5pbWcuc3JjIC0gVVJMIG9mIGFuIGljb24gKHJlcHJlc2VudGluZyB0aGUgdHlwZSBvZiB0aGUgb2JqZWN0KVxyXG4gICAqXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgY29uc3QgZ3JvdXAgPSBuZXcgZmFicmljLkdyb3VwKFtdLCB7XHJcbiAgICAgIGxlZnQ6IG9wdGlvbnMubGVmdCxcclxuICAgICAgdG9wOiBvcHRpb25zLnRvcCxcclxuICAgICAgb3JpZ2luWDogJ2xlZnQnLFxyXG4gICAgICBvcmlnaW5ZOiAndG9wJyxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgbmV3T3B0aW9ucyA9IF8uY2xvbmVEZWVwKF8ub21pdChvcHRpb25zLCBbJ2NhbnZhcycsICdzaGFwZSddKSk7XHJcbiAgICBuZXdPcHRpb25zLmNhbnZhcyA9IG9wdGlvbnMuY2FudmFzO1xyXG4gICAgbmV3T3B0aW9ucy5zaGFwZSA9IGdyb3VwO1xyXG4gICAgc3VwZXIobmV3T3B0aW9ucyk7XHJcblxyXG4gICAgdGhpcy5zaGFwZXMgPSB7fTtcclxuICAgIHRoaXMuY2hpbGRyZW4gPSB7fTtcclxuICAgIHRoaXMuaXNFeHBhbmRlZCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgbG9hZChpc0NoaWxkKSB7XHJcbiAgICBjb25zdCB7IG9wdGlvbnMsIHNoYXBlIH0gPSB0aGlzO1xyXG5cclxuICAgIHRoaXMuaXNMb2FkZWQgPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdCBzaGFwZVBvcyA9IHtcclxuICAgICAgbGVmdDogdGhpcy5zaGFwZS5sZWZ0LFxyXG4gICAgICB0b3A6IHRoaXMuc2hhcGUudG9wLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHBhZGRpbmcgPSAxMDtcclxuICAgIGNvbnN0IG1hcmdpbiA9IDEwO1xyXG4gICAgY29uc3QgcmVjdE9wdHMgPSB7XHJcbiAgICAgIGxlZnQ6IDAsXHJcbiAgICAgIHRvcDogMCxcclxuICAgICAgb3JpZ2luWDogJ2xlZnQnLFxyXG4gICAgICBvcmlnaW5ZOiAndG9wJyxcclxuICAgICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAgIHN0cm9rZTogJyM2NjYnLFxyXG4gICAgICBmaWxsOiAnI2ZmZicsXHJcbiAgICAgIHJ4OiA0LFxyXG4gICAgICByeTogNCxcclxuICAgIH07XHJcbiAgICBsZXQgaW1nT3B0cztcclxuICAgIGlmIChpc0NoaWxkKSB7XHJcbiAgICAgIHJlY3RPcHRzLndpZHRoID0gb3B0aW9ucy53aWR0aCA/IG9wdGlvbnMud2lkdGggOiA3MDtcclxuICAgICAgcmVjdE9wdHMuaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQgPyBvcHRpb25zLmhlaWdodCA6IDcwO1xyXG4gICAgICAvLyBpbWdPcHRzID0ge1xyXG4gICAgICAvLyAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICAvLyAgIG9yaWdpblk6ICd0b3AnLFxyXG4gICAgICAvLyAgIGxlZnQ6IHJlY3RPcHRzLndpZHRoIC8gMixcclxuICAgICAgLy8gICB0b3A6IHBhZGRpbmcsXHJcbiAgICAgIC8vICAgd2lkdGg6IDIyLFxyXG4gICAgICAvLyAgIGhlaWdodDogMjIsXHJcbiAgICAgIC8vIH07XHJcbiAgICAgIGltZ09wdHMgPSB7XHJcbiAgICAgICAgb3JpZ2luWDogJ2xlZnQnLFxyXG4gICAgICAgIG9yaWdpblk6ICd0b3AnLFxyXG4gICAgICAgIGxlZnQ6IHBhZGRpbmcsXHJcbiAgICAgICAgdG9wOiBwYWRkaW5nLFxyXG4gICAgICAgIHdpZHRoOiAyMixcclxuICAgICAgICBoZWlnaHQ6IDIyLFxyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaW1nT3B0cyA9IHtcclxuICAgICAgICBvcmlnaW5YOiAnbGVmdCcsXHJcbiAgICAgICAgb3JpZ2luWTogJ3RvcCcsXHJcbiAgICAgICAgbGVmdDogcGFkZGluZyxcclxuICAgICAgICB0b3A6IHBhZGRpbmcsXHJcbiAgICAgICAgd2lkdGg6IDIyLFxyXG4gICAgICAgIGhlaWdodDogMjIsXHJcbiAgICAgIH07XHJcbiAgICAgIHJlY3RPcHRzLndpZHRoID0gb3B0aW9ucy53aWR0aCA/IG9wdGlvbnMud2lkdGggOiAyMDA7XHJcbiAgICAgIHJlY3RPcHRzLmhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0ID8gb3B0aW9ucy5oZWlnaHQgOiAoaW1nT3B0cy5oZWlnaHQgKyBwYWRkaW5nICogMik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ3JlYXRlIFJlY3Qgc2hhcGVcclxuICAgIGNvbnN0IHJlY3QgPSBuZXcgZmFicmljLlJlY3QocmVjdE9wdHMpO1xyXG4gICAgdGhpcy5zaGFwZS5hZGRXaXRoVXBkYXRlKHJlY3QpO1xyXG4gICAgdGhpcy5zaGFwZXMucmVjdCA9IHJlY3Q7XHJcblxyXG4gICAgbGV0IHRleHRPcHRzO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5pbWcgJiYgdGhpcy5vcHRpb25zLmltZy5zcmMpIHtcclxuICAgICAgLy8gTG9hZCBpbWFnZSBhbmQgY3JlYXRlIEltYWdlIHNoYXBlXHJcbiAgICAgIGNvbnN0IG9JbWcgPSBhd2FpdCB0aGlzLl9sb2FkSW1hZ2UodGhpcy5vcHRpb25zLmltZy5zcmMpO1xyXG4gICAgICBvSW1nLnNldChpbWdPcHRzKTtcclxuICAgICAgdGhpcy5zaGFwZS5hZGRXaXRoVXBkYXRlKG9JbWcpO1xyXG4gICAgICB0aGlzLnNoYXBlcy5pbWFnZSA9IG9JbWc7XHJcblxyXG4gICAgICBpZiAoaXNDaGlsZCkge1xyXG4gICAgICAgIC8vIEFsaWduIHRoZSB0ZXh0IHdpdGhpbiB0aGUgcmVjdGFuZ2xlLCB1bmRlciB0aGUgaW1hZ2VcclxuICAgICAgICAvLyBDZW50ZXIgdGhlIHRleHQgaW4gdGhlIHJlY3RcclxuICAgICAgICAvLyB0ZXh0T3B0cyA9IHtcclxuICAgICAgICAvLyAgIHN0eWxlczogeyB9LFxyXG4gICAgICAgIC8vICAgZm9udFNpemU6IDE0LFxyXG4gICAgICAgIC8vICAgZm9udEZhbWlseTogJ0hlbHZldGljYScsXHJcbiAgICAgICAgLy8gICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgIC8vICAgc3BsaXRCeUdyYXBoZW1lOiB0cnVlLFxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgICAvLyAgIG9yaWdpblk6ICd0b3AnLFxyXG4gICAgICAgIC8vICAgbGVmdDogcmVjdC53aWR0aCAvIDIsXHJcbiAgICAgICAgLy8gICB0b3A6IHBhZGRpbmcgKyBpbWdPcHRzLmhlaWdodCArIG1hcmdpbixcclxuICAgICAgICAvLyAgIHdpZHRoOiByZWN0T3B0cy53aWR0aCAtIHBhZGRpbmcgKiAyLFxyXG4gICAgICAgIC8vICAgaGVpZ2h0OiByZWN0T3B0cy5oZWlnaHQgLSBwYWRkaW5nICogMixcclxuICAgICAgICAvLyB9O1xyXG5cclxuICAgICAgICB0ZXh0T3B0cyA9IHtcclxuICAgICAgICAgIHN0eWxlczogeyB9LFxyXG4gICAgICAgICAgZm9udFNpemU6IDE0LFxyXG4gICAgICAgICAgZm9udEZhbWlseTogJ0hlbHZldGljYScsXHJcbiAgICAgICAgICB0ZXh0QWxpZ246ICdsZWZ0JyxcclxuICAgICAgICAgIHNwbGl0QnlHcmFwaGVtZTogdHJ1ZSxcclxuICAgICAgICAgIGZpbGw6ICcjMDAwJyxcclxuICAgICAgICAgIG9yaWdpblg6ICdsZWZ0JyxcclxuICAgICAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICAgICAgbGVmdDogcGFkZGluZyArIG9JbWcud2lkdGggKyBtYXJnaW4sXHJcbiAgICAgICAgICB0b3A6IHBhZGRpbmcgKyBvSW1nLmhlaWdodCAvIDIsXHJcbiAgICAgICAgICB3aWR0aDogcmVjdC53aWR0aCAtIHBhZGRpbmcgLSBvSW1nLndpZHRoIC0gbWFyZ2luICogMixcclxuICAgICAgICAgIGhlaWdodDogb0ltZy5oZWlnaHQsXHJcbiAgICAgICAgfTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBBbGlnbiB0aGUgdGV4dCB3aXRoIHRoZSBpbWFnZVxyXG4gICAgICAgIHRleHRPcHRzID0ge1xyXG4gICAgICAgICAgc3R5bGVzOiB7IH0sXHJcbiAgICAgICAgICBmb250U2l6ZTogMTQsXHJcbiAgICAgICAgICBmb250RmFtaWx5OiAnSGVsdmV0aWNhJyxcclxuICAgICAgICAgIHRleHRBbGlnbjogJ2xlZnQnLFxyXG4gICAgICAgICAgc3BsaXRCeUdyYXBoZW1lOiB0cnVlLFxyXG4gICAgICAgICAgZmlsbDogJyMwMDAnLFxyXG4gICAgICAgICAgb3JpZ2luWDogJ2xlZnQnLFxyXG4gICAgICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgICAgICBsZWZ0OiBwYWRkaW5nICsgb0ltZy53aWR0aCArIG1hcmdpbixcclxuICAgICAgICAgIHRvcDogcGFkZGluZyArIG9JbWcuaGVpZ2h0IC8gMixcclxuICAgICAgICAgIHdpZHRoOiByZWN0LndpZHRoIC0gcGFkZGluZyAtIG9JbWcud2lkdGggLSBtYXJnaW4gKiAyLFxyXG4gICAgICAgICAgaGVpZ2h0OiBvSW1nLmhlaWdodCxcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBDZW50ZXIgdGhlIHRleHQgaW4gdGhlIHJlY3RcclxuICAgICAgdGV4dE9wdHMgPSB7XHJcbiAgICAgICAgc3R5bGVzOiB7IH0sXHJcbiAgICAgICAgZm9udFNpemU6IDE0LFxyXG4gICAgICAgIGZvbnRGYW1pbHk6ICdIZWx2ZXRpY2EnLFxyXG4gICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgc3BsaXRCeUdyYXBoZW1lOiB0cnVlLFxyXG4gICAgICAgIGZpbGw6ICcjMDAwJyxcclxuICAgICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgICBsZWZ0OiByZWN0LndpZHRoIC8gMixcclxuICAgICAgICB0b3A6IHJlY3QuaGVpZ2h0IC8gMixcclxuICAgICAgICB3aWR0aDogcmVjdE9wdHMud2lkdGggLSBwYWRkaW5nICogMixcclxuICAgICAgICBoZWlnaHQ6IHJlY3RPcHRzLmhlaWdodCAtIHBhZGRpbmcgKiAyLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENyZWF0ZSBUZXh0Ym94IHNoYXBlXHJcbiAgICBjb25zdCB0ZXh0ID0gbmV3IGZhYnJpYy5UZXh0Ym94KG9wdGlvbnMubGFiZWwsIHRleHRPcHRzKTtcclxuICAgIGlmICghb3B0aW9ucy5oaWRlVGV4dCkge1xyXG4gICAgICB0aGlzLnNoYXBlLmFkZFdpdGhVcGRhdGUodGV4dCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNoYXBlcy50ZXh0ID0gdGV4dDtcclxuXHJcbiAgICAvLyBSZXBvc2l0aW9uIHRoZSBncm91cCBhY2NvcmRpbmdseVxyXG4gICAgdGhpcy5zaGFwZS5sZWZ0ID0gc2hhcGVQb3MubGVmdDtcclxuICAgIHRoaXMuc2hhcGUudG9wID0gc2hhcGVQb3MudG9wO1xyXG4gICAgdGhpcy5zaGFwZS5zZXRDb29yZHMoKTtcclxuICAgIHRoaXMuY2FudmFzLnJlbmRlckFsbCgpO1xyXG5cclxuICAgIC8vIFNldCB0aGUgc2hhcGUgYXMgbm90IHNlbGVjdGFibGUgaWYgaXQgaXMgYSBjaGlsZFxyXG4gICAgaWYgKGlzQ2hpbGQpIHtcclxuICAgICAgdGhpcy5zaGFwZS5zZWxlY3RhYmxlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVtZW1iZXIgaW5pdGlhbCBvcHRpb25zIGFzIGNvbGxhcHNlZFxyXG4gICAgdGhpcy5pbml0aWFsT3B0cyA9IHtcclxuICAgICAgcmVjdDoge1xyXG4gICAgICAgIHdpZHRoOiByZWN0T3B0cy53aWR0aCxcclxuICAgICAgICBoZWlnaHQ6IHJlY3RPcHRzLmhlaWdodCxcclxuICAgICAgfSxcclxuICAgICAgY2hpbGQ6IHtcclxuICAgICAgICB3aWR0aDogb3B0aW9ucy5jaGlsZFdpZHRoID8gb3B0aW9ucy5jaGlsZFdpZHRoIDogNzAsXHJcbiAgICAgICAgaGVpZ2h0OiBvcHRpb25zLmNoaWxkSGVpZ2h0ID8gb3B0aW9ucy5jaGlsZEhlaWdodCA6IDcwLFxyXG4gICAgICAgIC8vIHdpZHRoOiBvcHRpb25zLmNoaWxkV2lkdGggPyBvcHRpb25zLmNoaWxkV2lkdGggOiA1MixcclxuICAgICAgICAvLyBoZWlnaHQ6IG9wdGlvbnMuY2hpbGRXaWR0aCA/IG9wdGlvbnMuY2hpbGRXaWR0aCA6IDUyLFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDb25zdHJ1Y3QgY2hpbGRyZW4gaWYgdGhpcyBpcyBhIG5vcm1hbCAocGFyZW50KSBDb250YWluZXJcclxuICAgIGlmICghaXNDaGlsZCAmJiBBcnJheS5pc0FycmF5KG9wdGlvbnMuY2hpbGRyZW4pICYmIG9wdGlvbnMuY2hpbGRyZW4ubGVuZ3RoKSB7XHJcbiAgICAgIGF3YWl0IHRoaXMuYWRkQ2hpbGRyZW4ob3B0aW9ucy5jaGlsZHJlbik7XHJcbiAgICB9XHJcblxyXG4gICAgc2hhcGUub24oe1xyXG4gICAgICBzY2FsaW5nOiAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRleHQpIHtcclxuICAgICAgICAgIC8vIFdoZW4gc2NhbGluZywga2VlcCB0ZXh0IHNhbWUgc2l6ZSBhcyBpbml0aWFsXHJcbiAgICAgICAgICBpZiAoc2hhcGUuc2NhbGVYIDwgMSkge1xyXG4gICAgICAgICAgICB0ZXh0LnNjYWxlWCA9IDEgKyAoMSAtIHNoYXBlLnNjYWxlWCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0ZXh0LnNjYWxlWCA9IDEgLyAoc2hhcGUuc2NhbGVYKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChzaGFwZS5zY2FsZVkgPCAxKSB7XHJcbiAgICAgICAgICAgIHRleHQuc2NhbGVZID0gMSArICgxIC0gc2hhcGUuc2NhbGVZKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRleHQuc2NhbGVZID0gMSAvIChzaGFwZS5zY2FsZVkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5jYW52YXMucmVuZGVyQWxsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBtb3VzZWRibGNsaWNrOiAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFeHBhbmRlZCkge1xyXG4gICAgICAgICAgdGhpcy5jb2xsYXBzZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmV4cGFuZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuaXNMb2FkZWQgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgX2xvYWRJbWFnZShzcmMpIHtcclxuICAgIGNvbnN0IHVybCA9IHNyYyB8fCB0aGlzLm9wdGlvbnMuaW1nLnNyYztcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICBmYWJyaWMuSW1hZ2UuZnJvbVVSTCh1cmwsIChvSW1nKSA9PiB7XHJcbiAgICAgICAgcmVzb2x2ZShvSW1nKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGFkZENoaWxkcmVuKGNoaWxkcmVuKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGNhbnZhcywgc2hhcGUsIHNoYXBlcywgaW5pdGlhbE9wdHMsXHJcbiAgICB9ID0gdGhpcztcclxuICAgIGNvbnN0IGV4aXN0aW5nID0gT2JqZWN0LmtleXModGhpcy5jaGlsZHJlbik7XHJcblxyXG4gICAgLy8gQ2FsY3VsYXRlIG5ldyBkaW1lbnNpb25zXHJcbiAgICBjb25zdCBwYWRkaW5nID0gMTA7XHJcbiAgICBjb25zdCBtYXJnaW4gPSAxMDtcclxuXHJcbiAgICBmb3IgKGxldCBjID0gMDsgYyA8IGNoaWxkcmVuLmxlbmd0aDsgYyArPSAxKSB7XHJcbiAgICAgIGNvbnN0IGNoaWxkID0gY2hpbGRyZW5bY107XHJcbiAgICAgIGlmICghKGNoaWxkLmlkIGluIHRoaXMuY2hpbGRyZW4pKSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSAodHlwZW9mIGNoaWxkLmluZGV4ID09PSAnbnVtYmVyJykgPyBjaGlsZC5pbmRleCA6IGV4aXN0aW5nLmxlbmd0aCArIChjICsgMSk7XHJcbiAgICAgICAgY29uc3QgY2hpbGRDb250YWluZXIgPSBuZXcgRXhwYW5kYWJsZUNvbnRhaW5lcih7XHJcbiAgICAgICAgICBjYW52YXMsXHJcbiAgICAgICAgICBpZDogY2hpbGQuaWQsXHJcbiAgICAgICAgICBsZWZ0OiBzaGFwZS5sZWZ0ICsgcGFkZGluZyArIChpbml0aWFsT3B0cy5jaGlsZC53aWR0aCArIG1hcmdpbikgKiBjICsgKGMgPT09IGNoaWxkcmVuLmxlbmd0aCA/IC1tYXJnaW4gOiAwKSxcclxuICAgICAgICAgIHRvcDogc2hhcGUudG9wICsgcGFkZGluZyArIHNoYXBlcy5pbWFnZS5oZWlnaHQgKyBtYXJnaW4sXHJcbiAgICAgICAgICBhbmdsZTogMCxcclxuICAgICAgICAgIGxhYmVsOiBjaGlsZC5sYWJlbCA/IGNoaWxkLmxhYmVsIDogaW5kZXgudG9TdHJpbmcoKSxcclxuICAgICAgICAgIGltZzoge1xyXG4gICAgICAgICAgICBzcmM6IGNoaWxkLmltZy5zcmMsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgd2lkdGg6IGluaXRpYWxPcHRzLmNoaWxkLndpZHRoLFxyXG4gICAgICAgICAgaGVpZ2h0OiBpbml0aWFsT3B0cy5jaGlsZC5oZWlnaHQsXHJcbiAgICAgICAgICBoaWRlVGV4dDogY2hpbGQuaGlkZVRleHQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWF3YWl0LWluLWxvb3BcclxuICAgICAgICBhd2FpdCBjaGlsZENvbnRhaW5lci5sb2FkKHRydWUpO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5bY2hpbGQuaWRdID0gY2hpbGRDb250YWluZXI7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbltjaGlsZC5pZF0uaW5kZXggPSBpbmRleDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2hhcGUuYWRkV2l0aFVwZGF0ZSgpO1xyXG4gICAgc2hhcGUuc2V0Q29vcmRzKCk7XHJcbiAgICBjYW52YXMucmVuZGVyQWxsKCk7XHJcbiAgfVxyXG5cclxuICBzZXRBY3RpdmUoYWN0aXZlKSB7XHJcbiAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgIHRoaXMuc2hhcGVzLnJlY3Quc2V0KCdzdHJva2UnLCAnIzc4YmVmYScpO1xyXG4gICAgICB0aGlzLnNoYXBlcy5yZWN0LnNldCgnZmlsbCcsICcjNzhiZWZhJyk7XHJcbiAgICAgIHRoaXMuc2hhcGVzLnRleHQuc2V0KCdmaWxsJywgJyNmZmYnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2hhcGVzLnJlY3Quc2V0KCdzdHJva2UnLCAnIzY2NicpO1xyXG4gICAgICB0aGlzLnNoYXBlcy5yZWN0LnNldCgnZmlsbCcsICcjZmZmJyk7XHJcbiAgICAgIHRoaXMuc2hhcGVzLnRleHQuc2V0KCdmaWxsJywgJyMwMDAnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGV4cGFuZCgpIHtcclxuICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLmNoaWxkcmVuKS5sZW5ndGggIT09IDAgJiYgdGhpcy5pc0V4cGFuZGVkID09PSBmYWxzZSkge1xyXG4gICAgICBjb25zdCB7XHJcbiAgICAgICAgY2FudmFzLCBzaGFwZSwgc2hhcGVzLCBpbml0aWFsT3B0cyxcclxuICAgICAgfSA9IHRoaXM7XHJcbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gT2JqZWN0LnZhbHVlcyh0aGlzLmNoaWxkcmVuKTtcclxuXHJcbiAgICAgIC8vIENhbGN1bGF0ZSBuZXcgZGltZW5zaW9uc1xyXG4gICAgICBjb25zdCBwYWRkaW5nID0gMTA7XHJcbiAgICAgIGNvbnN0IG1hcmdpbiA9IDEwO1xyXG4gICAgICBjb25zdCBvbGRSZWN0V2lkdGggPSBzaGFwZXMucmVjdC53aWR0aDtcclxuICAgICAgY29uc3Qgb2xkUmVjdEhlaWdodCA9IHNoYXBlcy5yZWN0LmhlaWdodDtcclxuXHJcbiAgICAgIGNvbnN0IG5ld1JlY3RXaWR0aCA9IE1hdGgubWF4KHBhZGRpbmcgKiAyICsgY2hpbGRyZW4ubGVuZ3RoICogaW5pdGlhbE9wdHMuY2hpbGQud2lkdGhcclxuICAgICAgICArIChjaGlsZHJlbi5sZW5ndGggLSAxKSAqIG1hcmdpbiwgaW5pdGlhbE9wdHMucmVjdC53aWR0aCk7XHJcbiAgICAgIGNvbnN0IG5ld1JlY3RIZWlnaHQgPSBjaGlsZHJlbi5sZW5ndGggPiAwID8gcGFkZGluZyArIHNoYXBlcy5pbWFnZS5oZWlnaHQgKyBtYXJnaW5cclxuICAgICAgICArIGluaXRpYWxPcHRzLmNoaWxkLmhlaWdodCArIHBhZGRpbmcgOiBpbml0aWFsT3B0cy5yZWN0LmhlaWdodDtcclxuXHJcbiAgICAgIC8vIFVwZGF0ZSBhbGwgb3RoZXIgY29udGFpbmVycyB0aGF0IGFyZSBiZWxvdyBhbmQvb3Igb24gdGhlIHJpZ2h0IG9mIHRoZSBjdXJyZW50IHNoYXBlLCB0byBhdm9pZCBjb2xsaXNpb25cclxuICAgICAgc2hhcGVzLnJlY3Qub3BhY2l0eSA9IDAuNztcclxuICAgICAgY29uc3Qgb3RoZXJTaGFwZXMgPSBPYmplY3QudmFsdWVzKGNhbnZhcy5saW5rYWJsZVNoYXBlcyk7XHJcbiAgICAgIGlmIChvdGhlclNoYXBlcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgY29uc3QgZGVsdGFYID0gbmV3UmVjdFdpZHRoIC0gb2xkUmVjdFdpZHRoO1xyXG4gICAgICAgIGNvbnN0IGRlbHRhWSA9IG5ld1JlY3RIZWlnaHQgLSBvbGRSZWN0SGVpZ2h0O1xyXG4gICAgICAgIGZvciAobGV0IG8gPSAwOyBvIDwgb3RoZXJTaGFwZXMubGVuZ3RoOyBvICs9IDEpIHtcclxuICAgICAgICAgIGNvbnN0IHNoYXBlVG9Nb3ZlID0gb3RoZXJTaGFwZXNbb107XHJcbiAgICAgICAgICBpZiAoc2hhcGVUb01vdmUuaWQgIT09IHRoaXMuaWQpIHtcclxuICAgICAgICAgICAgLy8gSWYgZXhwYW5kZWQgU2hhcGUgaXMgYWJvdmUgQU5EIG9uIHRoZSBsZWZ0IG9mIHRoZSBjdXJyZW50IHNoYXBlXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNoYXBlLmFDb29yZHMuYnIueCA8PSBzaGFwZVRvTW92ZS5zaGFwZS5hQ29vcmRzLnRsLnggJiYgdGhpcy5zaGFwZS5hQ29vcmRzLmJyLnkgPD0gc2hhcGVUb01vdmUuc2hhcGUuYUNvb3Jkcy50bC55KSB7XHJcbiAgICAgICAgICAgICAgc2hhcGVUb01vdmUubW92ZSh7XHJcbiAgICAgICAgICAgICAgICB4OiBzaGFwZVRvTW92ZS5zaGFwZS5sZWZ0ICsgZGVsdGFYLFxyXG4gICAgICAgICAgICAgICAgeTogc2hhcGVUb01vdmUuc2hhcGUudG9wICsgZGVsdGFZLFxyXG4gICAgICAgICAgICAgICAgbW92aW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNraXBDb2xsaXNpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zaGFwZS5hQ29vcmRzLmJsLnkgPCBzaGFwZVRvTW92ZS5zaGFwZS5hQ29vcmRzLnRsLnkpIHsgLy8gSWYgZXhwYW5kZWQgU2hhcGUgaXMgYWJvdmUgdGhlIGN1cnJlbnQgc2hhcGVcclxuICAgICAgICAgICAgICBpZiAodGhpcy5zaGFwZS5hQ29vcmRzLnRsLnggPCBzaGFwZVRvTW92ZS5zaGFwZS5hQ29vcmRzLnRyLngpIHtcclxuICAgICAgICAgICAgICAgIHNoYXBlVG9Nb3ZlLm1vdmUoe1xyXG4gICAgICAgICAgICAgICAgICB5OiBzaGFwZVRvTW92ZS5zaGFwZS50b3AgKyBkZWx0YVksXHJcbiAgICAgICAgICAgICAgICAgIG1vdmluZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgIHNraXBDb2xsaXNpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zaGFwZS5hQ29vcmRzLnRyLnggPCBzaGFwZVRvTW92ZS5zaGFwZS5hQ29vcmRzLnRsLngpIHsgLy8gSWYgZXhwYW5kZWQgU2hhcGUgaXMgb24gdGhlIGxlZnQgb2YgdGhlIGN1cnJlbnQgc2hhcGVcclxuICAgICAgICAgICAgICBpZiAodGhpcy5zaGFwZS5hQ29vcmRzLnRsLnkgPCBzaGFwZVRvTW92ZS5zaGFwZS5hQ29vcmRzLmJsLnkpIHtcclxuICAgICAgICAgICAgICAgIHNoYXBlVG9Nb3ZlLm1vdmUoe1xyXG4gICAgICAgICAgICAgICAgICB4OiBzaGFwZVRvTW92ZS5zaGFwZS5sZWZ0ICsgZGVsdGFYLFxyXG4gICAgICAgICAgICAgICAgICBtb3Zpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICBza2lwQ29sbGlzaW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBSZXNpemUgZXhpc3Rpbmcgc2hhcGVzXHJcbiAgICAgIHNoYXBlcy5yZWN0LndpZHRoID0gbmV3UmVjdFdpZHRoO1xyXG4gICAgICBzaGFwZXMucmVjdC5oZWlnaHQgPSBuZXdSZWN0SGVpZ2h0O1xyXG4gICAgICBzaGFwZXMucmVjdC5zZXRDb29yZHMoKTtcclxuICAgICAgc2hhcGVzLnRleHQud2lkdGggPSBuZXdSZWN0V2lkdGggLSAoc2hhcGVzLmltYWdlLndpZHRoICsgcGFkZGluZyArIG1hcmdpbik7XHJcbiAgICAgIHNoYXBlcy50ZXh0LnRleHRBbGlnbiA9ICdsZWZ0JztcclxuICAgICAgc2hhcGVzLnRleHQuc2V0Q29vcmRzKCk7XHJcblxyXG4gICAgICAvLyBBZGQgY2hpbGRyZW4gY29udGFpbmVycyBpbiBpbmRleCBvcmRlclxyXG4gICAgICBjb25zdCBzb3J0ZWQgPSBjaGlsZHJlbi5zb3J0KChjMSwgYzIpID0+IGMxLmluZGV4ID4gYzIuaW5kZXgpO1xyXG4gICAgICBmb3IgKGxldCBjID0gMDsgYyA8IHNvcnRlZC5sZW5ndGg7IGMgKz0gMSkge1xyXG4gICAgICAgIGNvbnN0IGNoaWxkID0gc29ydGVkW2NdO1xyXG4gICAgICAgIGNoaWxkLnNoYXBlLmxlZnQgPSBzaGFwZS5sZWZ0ICsgcGFkZGluZ1xyXG4gICAgICAgICAgKyAoaW5pdGlhbE9wdHMuY2hpbGQud2lkdGggKyBtYXJnaW4pICogYyArIChjID09PSBzb3J0ZWQubGVuZ3RoID8gLW1hcmdpbiA6IDApO1xyXG4gICAgICAgIGNoaWxkLnNoYXBlLnRvcCA9IHNoYXBlLnRvcCArIHBhZGRpbmcgKyBzaGFwZXMuaW1hZ2UuaGVpZ2h0ICsgbWFyZ2luO1xyXG4gICAgICAgIHNoYXBlLmFkZFdpdGhVcGRhdGUoY2hpbGQuc2hhcGUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBVcGRhdGUgdGhlIGNvbnRhaW5lciBjb29yZHNcclxuICAgICAgc2hhcGUuYWRkV2l0aFVwZGF0ZSgpO1xyXG4gICAgICBzaGFwZS5zZXRDb29yZHMoKTtcclxuICAgICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcclxuICAgICAgdGhpcy5zaGFwZS5maXJlKCdtb2RpZmllZCcpO1xyXG5cclxuICAgICAgY2FudmFzLnJlbmRlckFsbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaXNFeHBhbmRlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBjb2xsYXBzZSgpIHtcclxuICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLmNoaWxkcmVuKS5sZW5ndGggIT09IDAgJiYgdGhpcy5pc0V4cGFuZGVkID09PSB0cnVlKSB7XHJcbiAgICAgIGNvbnN0IHtcclxuICAgICAgICBjYW52YXMsIHNoYXBlLCBzaGFwZXMsIGluaXRpYWxPcHRzLFxyXG4gICAgICB9ID0gdGhpcztcclxuICAgICAgY29uc3QgY2hpbGRyZW4gPSBPYmplY3QudmFsdWVzKHRoaXMuY2hpbGRyZW4pO1xyXG5cclxuICAgICAgLy8gQ2FsY3VsYXRlIG5ldyBkaW1lbnNpb25zXHJcbiAgICAgIGNvbnN0IHBhZGRpbmcgPSAxMDtcclxuICAgICAgY29uc3QgbWFyZ2luID0gMTA7XHJcbiAgICAgIGNvbnN0IG9sZFJlY3RXaWR0aCA9IHNoYXBlcy5yZWN0LndpZHRoO1xyXG4gICAgICBjb25zdCBvbGRSZWN0SGVpZ2h0ID0gc2hhcGVzLnJlY3QuaGVpZ2h0O1xyXG5cclxuICAgICAgY29uc3QgbmV3UmVjdFdpZHRoID0gaW5pdGlhbE9wdHMucmVjdC53aWR0aDtcclxuICAgICAgY29uc3QgbmV3UmVjdEhlaWdodCA9IGluaXRpYWxPcHRzLnJlY3QuaGVpZ2h0O1xyXG5cclxuICAgICAgLy8gVXBkYXRlIGFsbCBvdGhlciBjb250YWluZXJzIHRoYXQgYXJlIGJlbG93IGFuZC9vciBvbiB0aGUgcmlnaHQgb2YgdGhlIGN1cnJlbnQgc2hhcGUsIHRvIGF2b2lkIGNvbGxpc2lvblxyXG4gICAgICBzaGFwZXMucmVjdC5vcGFjaXR5ID0gMTtcclxuICAgICAgY29uc3Qgb3RoZXJTaGFwZXMgPSBPYmplY3QudmFsdWVzKGNhbnZhcy5saW5rYWJsZVNoYXBlcyk7XHJcbiAgICAgIGlmIChvdGhlclNoYXBlcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgY29uc3QgZGVsdGFYID0gbmV3UmVjdFdpZHRoIC0gb2xkUmVjdFdpZHRoO1xyXG4gICAgICAgIGNvbnN0IGRlbHRhWSA9IG5ld1JlY3RIZWlnaHQgLSBvbGRSZWN0SGVpZ2h0O1xyXG4gICAgICAgIGZvciAobGV0IG8gPSAwOyBvIDwgb3RoZXJTaGFwZXMubGVuZ3RoOyBvICs9IDEpIHtcclxuICAgICAgICAgIGNvbnN0IHNoYXBlVG9Nb3ZlID0gb3RoZXJTaGFwZXNbb107XHJcbiAgICAgICAgICBpZiAob3RoZXJTaGFwZXNbb10uaWQgIT09IHRoaXMuaWQpIHtcclxuICAgICAgICAgICAgLy8gSWYgZXhwYW5kZWQgU2hhcGUgaXMgYWJvdmUgQU5EIG9uIHRoZSBsZWZ0IG9mIHRoZSBjdXJyZW50IHNoYXBlXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNoYXBlLmFDb29yZHMuYnIueCA8PSBzaGFwZVRvTW92ZS5zaGFwZS5hQ29vcmRzLnRsLnggJiYgdGhpcy5zaGFwZS5hQ29vcmRzLmJyLnkgPD0gc2hhcGVUb01vdmUuc2hhcGUuYUNvb3Jkcy50bC55KSB7XHJcbiAgICAgICAgICAgICAgc2hhcGVUb01vdmUubW92ZSh7XHJcbiAgICAgICAgICAgICAgICB4OiBzaGFwZVRvTW92ZS5zaGFwZS5sZWZ0ICsgZGVsdGFYLFxyXG4gICAgICAgICAgICAgICAgeTogc2hhcGVUb01vdmUuc2hhcGUudG9wICsgZGVsdGFZLFxyXG4gICAgICAgICAgICAgICAgbW92aW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNraXBDb2xsaXNpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zaGFwZS5hQ29vcmRzLmJsLnkgPCBzaGFwZVRvTW92ZS5zaGFwZS5hQ29vcmRzLnRsLnkpIHsgLy8gSWYgZXhwYW5kZWQgU2hhcGUgaXMgYWJvdmUgdGhlIGN1cnJlbnQgc2hhcGVcclxuICAgICAgICAgICAgICBpZiAodGhpcy5zaGFwZS5hQ29vcmRzLnRsLnggPCBzaGFwZVRvTW92ZS5zaGFwZS5hQ29vcmRzLnRyLngpIHtcclxuICAgICAgICAgICAgICAgIHNoYXBlVG9Nb3ZlLm1vdmUoe1xyXG4gICAgICAgICAgICAgICAgICB5OiBzaGFwZVRvTW92ZS5zaGFwZS50b3AgKyBkZWx0YVksXHJcbiAgICAgICAgICAgICAgICAgIG1vdmluZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgIHNraXBDb2xsaXNpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zaGFwZS5hQ29vcmRzLnRyLnggPCBzaGFwZVRvTW92ZS5zaGFwZS5hQ29vcmRzLnRsLngpIHsgLy8gSWYgZXhwYW5kZWQgU2hhcGUgaXMgb24gdGhlIGxlZnQgb2YgdGhlIGN1cnJlbnQgc2hhcGVcclxuICAgICAgICAgICAgICBpZiAodGhpcy5zaGFwZS5hQ29vcmRzLnRsLnkgPCBzaGFwZVRvTW92ZS5zaGFwZS5hQ29vcmRzLmJsLnkpIHtcclxuICAgICAgICAgICAgICAgIHNoYXBlVG9Nb3ZlLm1vdmUoe1xyXG4gICAgICAgICAgICAgICAgICB4OiBzaGFwZVRvTW92ZS5zaGFwZS5sZWZ0ICsgZGVsdGFYLFxyXG4gICAgICAgICAgICAgICAgICBtb3Zpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICBza2lwQ29sbGlzaW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBSZXNpemUgZXhpc3Rpbmcgc2hhcGVzXHJcbiAgICAgIHNoYXBlcy5yZWN0LndpZHRoID0gbmV3UmVjdFdpZHRoO1xyXG4gICAgICBzaGFwZXMucmVjdC5oZWlnaHQgPSBuZXdSZWN0SGVpZ2h0O1xyXG4gICAgICBzaGFwZXMucmVjdC5zZXRDb29yZHMoKTtcclxuICAgICAgc2hhcGVzLnRleHQud2lkdGggPSBuZXdSZWN0V2lkdGggLSAoc2hhcGVzLmltYWdlLndpZHRoICsgcGFkZGluZyAqIDIgKyBtYXJnaW4pO1xyXG4gICAgICBzaGFwZXMudGV4dC50ZXh0QWxpZ24gPSAnbGVmdCc7XHJcbiAgICAgIHNoYXBlcy50ZXh0LnNldENvb3JkcygpO1xyXG5cclxuICAgICAgLy8gUmVtb3ZlIGNoaWxkcmVuIGNvbnRhaW5lcnNcclxuICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCBjaGlsZHJlbi5sZW5ndGg7IGMgKz0gMSkge1xyXG4gICAgICAgIGNvbnN0IGNoaWxkID0gY2hpbGRyZW5bY107XHJcbiAgICAgICAgY2hpbGQubGVmdCA9IHNoYXBlLmxlZnQgKyBwYWRkaW5nXHJcbiAgICAgICAgICArIChpbml0aWFsT3B0cy5jaGlsZC53aWR0aCArIG1hcmdpbikgKiBjICsgKGMgPT09IGNoaWxkcmVuLmxlbmd0aCA/IC1tYXJnaW4gOiAwKTtcclxuICAgICAgICBjaGlsZC50b3AgPSBzaGFwZS50b3AgKyBwYWRkaW5nICsgc2hhcGVzLmltYWdlLmhlaWdodCArIG1hcmdpbjtcclxuICAgICAgICBzaGFwZS5yZW1vdmUoY2hpbGQuc2hhcGUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBVcGRhdGUgdGhlIGNvbnRhaW5lciBjb29yZHNcclxuICAgICAgc2hhcGUuYWRkV2l0aFVwZGF0ZSgpO1xyXG4gICAgICBzaGFwZS5zZXRDb29yZHMoKTtcclxuICAgICAgdGhpcy5zaGFwZS5maXJlKCdtb2RpZmllZCcpO1xyXG5cclxuICAgICAgY2FudmFzLnJlbmRlckFsbCgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pc0V4cGFuZGVkID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBhc3luYyBfb25BbmNob3JSaWdodENsaWNrKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgaWQsIGxlZnQsIHRvcCwgYW5nbGUsIGNhbnZhcywgd2lkdGgsIGhlaWdodCxcclxuICAgIH0gPSB0aGlzLnNoYXBlO1xyXG4gICAgY29uc3QgYXAgPSBvcHRpb25zLnRhcmdldDtcclxuICAgIGNvbnN0IHsgY2FyZGluYWwgfSA9IGFwO1xyXG4gICAgY29uc3Qgc3BhY2luZyA9IDEwMDtcclxuXHJcbiAgICBjb25zdCBuZXh0SWQgPSBgJHtpZH1fbmV4dF8ke2NhcmRpbmFsfV8ke01hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMSl9YDtcclxuICAgIGNvbnN0IGxhYmVsID0gYCR7aWR9X25leHRfJHtjYXJkaW5hbH1gO1xyXG4gICAgY29uc3QgbmV4dENvbnRhaW5lck9wdHMgPSBfLmNsb25lRGVlcChfLm9taXQodGhpcy5vcHRpb25zLCBbJ2NhbnZhcycsICdzaGFwZSddKSk7XHJcbiAgICBuZXh0Q29udGFpbmVyT3B0cy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICBuZXh0Q29udGFpbmVyT3B0cy5pZCA9IG5leHRJZDtcclxuICAgIG5leHRDb250YWluZXJPcHRzLmxlZnQgPSBsZWZ0O1xyXG4gICAgbmV4dENvbnRhaW5lck9wdHMudG9wID0gdG9wO1xyXG4gICAgbmV4dENvbnRhaW5lck9wdHMuYW5nbGUgPSBhbmdsZTtcclxuICAgIG5leHRDb250YWluZXJPcHRzLmxhYmVsID0gbGFiZWw7XHJcbiAgICBuZXh0Q29udGFpbmVyT3B0cy5jaGlsZHJlbiA9IFtdO1xyXG5cclxuICAgIGNvbnN0IG5leHRDb250YWluZXIgPSBuZXcgRXhwYW5kYWJsZUNvbnRhaW5lcihuZXh0Q29udGFpbmVyT3B0cyk7XHJcbiAgICBhd2FpdCBuZXh0Q29udGFpbmVyLmxvYWQoKTtcclxuICAgIG5leHRDb250YWluZXIuaW5qZWN0KCk7XHJcblxyXG4gICAgY29uc3QgbmV3T3B0aW9ucyA9IHt9O1xyXG4gICAgbGV0IHRhcmdldENhcmRpbmFsO1xyXG4gICAgc3dpdGNoIChjYXJkaW5hbCkge1xyXG4gICAgICBjYXNlICdlYXN0Jzoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ3dlc3QnO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IHRvcDtcclxuICAgICAgICBuZXdPcHRpb25zLnggPSBsZWZ0ICsgd2lkdGggKyBzcGFjaW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3dlc3QnOiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnZWFzdCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gdG9wO1xyXG4gICAgICAgIG5ld09wdGlvbnMueCA9IGxlZnQgLSB3aWR0aCAtIHNwYWNpbmc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnbm9ydGgnOiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnc291dGgnO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IHRvcCAtIGhlaWdodCAtIHNwYWNpbmc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gbGVmdDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aCc6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICdub3J0aCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gdG9wICsgaGVpZ2h0ICsgc3BhY2luZztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSBsZWZ0O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRoZWFzdCc6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICdzb3V0aHdlc3QnO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IHRvcCAtIGhlaWdodCAtIHNwYWNpbmc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gbGVmdCArIHdpZHRoICsgc3BhY2luZztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aHdlc3QnOiB7XHJcbiAgICAgICAgdGFyZ2V0Q2FyZGluYWwgPSAnc291dGhlYXN0JztcclxuICAgICAgICBuZXdPcHRpb25zLnkgPSB0b3AgLSBoZWlnaHQgLSBzcGFjaW5nO1xyXG4gICAgICAgIG5ld09wdGlvbnMueCA9IGxlZnQgLSB3aWR0aCAtIHNwYWNpbmc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnc291dGhlYXN0Jzoge1xyXG4gICAgICAgIHRhcmdldENhcmRpbmFsID0gJ25vcnRod2VzdCc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy55ID0gdG9wICsgaGVpZ2h0ICsgc3BhY2luZztcclxuICAgICAgICBuZXdPcHRpb25zLnggPSBsZWZ0ICsgd2lkdGggKyBzcGFjaW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRod2VzdCc6XHJcbiAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICB0YXJnZXRDYXJkaW5hbCA9ICdub3J0aGVhc3QnO1xyXG4gICAgICAgIG5ld09wdGlvbnMueSA9IHRvcCArIGhlaWdodCArIHNwYWNpbmc7XHJcbiAgICAgICAgbmV3T3B0aW9ucy54ID0gbGVmdCAtIHdpZHRoIC0gc3BhY2luZztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgbmV4dENvbnRhaW5lci5tb3ZlKG5ld09wdGlvbnMpO1xyXG4gICAgLy8gbmV4dENvbnRhaW5lci5yb3RhdGUoYW5nbGUpO1xyXG5cclxuICAgIGNvbnN0IG5ld0xpbmsgPSBuZXcgQ3VydmVkTGluayh7XHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgc3RhcnQ6IHtcclxuICAgICAgICB4OiBhcC5sZWZ0LFxyXG4gICAgICAgIHk6IGFwLnRvcCxcclxuICAgICAgfSxcclxuICAgICAgZW5kOiB7XHJcbiAgICAgICAgeDogbmV4dENvbnRhaW5lci5hbmNob3JzW3RhcmdldENhcmRpbmFsXS5sZWZ0LFxyXG4gICAgICAgIHk6IG5leHRDb250YWluZXIuYW5jaG9yc1t0YXJnZXRDYXJkaW5hbF0udG9wLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgICBuZXdMaW5rLmluamVjdChjYW52YXMpO1xyXG4gICAgbmV3TGluay5jb25uZWN0TGluaygnc3RhcnQnLCBhcC5zaGFwZUlkLCBhcC5jYXJkaW5hbCk7XHJcbiAgICBuZXdMaW5rLmNvbm5lY3RMaW5rKCdlbmQnLCBuZXh0Q29udGFpbmVyLmFuY2hvcnNbdGFyZ2V0Q2FyZGluYWxdLnNoYXBlSWQsXHJcbiAgICAgIG5leHRDb250YWluZXIuYW5jaG9yc1t0YXJnZXRDYXJkaW5hbF0uY2FyZGluYWwpO1xyXG4gIH1cclxuXHJcbiAgX29uQW5jaG9yTGVmdENsaWNrKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGFwID0gb3B0aW9ucy50YXJnZXQ7XHJcbiAgICBjb25zdCB7IGNhbnZhcyB9ID0gdGhpcztcclxuXHJcbiAgICAvLyBEaXNhYmxlIHRoZSBtdWx0aSBzZWxlY3Rpb24gd2hlbiBtb3ZpbmcgbW91c2VcclxuICAgIHRoaXMuY2FudmFzLnNlbGVjdGlvbiA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0IG9wcG9zaXRlQ2FyZGluYWwgPSB7XHJcbiAgICAgIGVhc3Q6ICd3ZXN0JyxcclxuICAgICAgd2VzdDogJ2Vhc3QnLFxyXG4gICAgICBub3J0aDogJ3NvdXRoJyxcclxuICAgICAgc291dGg6ICdub3J0aCcsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgbmV3TGluayA9IG5ldyBDdXJ2ZWRMaW5rKHtcclxuICAgICAgY2FudmFzLFxyXG4gICAgICBzdGFydDoge1xyXG4gICAgICAgIHg6IGFwLmxlZnQsXHJcbiAgICAgICAgeTogYXAudG9wLFxyXG4gICAgICAgIGRpcmVjdGlvbjogYXAuY2FyZGluYWwsXHJcbiAgICAgIH0sXHJcbiAgICAgIGVuZDoge1xyXG4gICAgICAgIHg6IGFwLmxlZnQsXHJcbiAgICAgICAgeTogYXAudG9wLFxyXG4gICAgICAgIGRpcmVjdGlvbjogb3Bwb3NpdGVDYXJkaW5hbFthcC5jYXJkaW5hbF0sXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICAgIG5ld0xpbmsuaW5qZWN0KGNhbnZhcyk7XHJcbiAgICBuZXdMaW5rLmNvbm5lY3RMaW5rKCdzdGFydCcsIGFwLnNoYXBlSWQsIGFwLmNhcmRpbmFsKTtcclxuICAgIG5ld0xpbmsuYXJyb3dIZWFkLmZpcmUoJ21vdXNlZG93bicpO1xyXG5cclxuICAgIGNvbnN0IG9uTW91c2VNb3ZlID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgIG5ld0xpbmsuYXJyb3dIZWFkLmxlZnQgPSBldmVudC5wb2ludGVyLng7XHJcbiAgICAgIG5ld0xpbmsuYXJyb3dIZWFkLnRvcCA9IGV2ZW50LnBvaW50ZXIueTtcclxuICAgICAgbmV3TGluay5hcnJvd0hlYWQuZmlyZSgnbW92aW5nJyk7XHJcbiAgICB9O1xyXG4gICAgY2FudmFzLm9uKCdtb3VzZTptb3ZlJywgb25Nb3VzZU1vdmUpO1xyXG5cclxuICAgIGNvbnN0IG9uTW91c2VDbGljayA9ICgpID0+IHtcclxuICAgICAgLy8gRW5hYmxlIGJhY2sgdGhlIG11bHRpIHNlbGVjdGlvbiB3aGVuIG1vdmluZyBtb3VzZVxyXG4gICAgICB0aGlzLmNhbnZhcy5zZWxlY3Rpb24gPSB0cnVlO1xyXG5cclxuICAgICAgbmV3TGluay5hcnJvd0hlYWQuZmlyZSgnbW92ZWQnKTtcclxuICAgICAgbmV3TGluay5hcnJvd0hlYWQuZmlyZSgnbW91c2V1cCcpO1xyXG4gICAgICBjYW52YXMub2ZmKCdtb3VzZTptb3ZlJywgb25Nb3VzZU1vdmUpO1xyXG4gICAgICBjYW52YXMub2ZmKCdtb3VzZTp1cCcsIG9uTW91c2VDbGljayk7XHJcbiAgICB9O1xyXG4gICAgY2FudmFzLm9uKCdtb3VzZTp1cCcsIG9uTW91c2VDbGljayk7XHJcbiAgfVxyXG59XHJcbiIsImNvbnN0IHsgZmFicmljIH0gPSB3aW5kb3c7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW5rIHtcclxuICAvKipcclxuICAgKiBBIExpbmsgaXMgYSBGYWJyaWMuUGF0aCBvYmplY3Qgd2hvc2UgU3RhcnQgYW5kIEVuZCBwb2ludHMgY2FuIGJlIGNvbm5lY3RlZCBlbmQgYW55IGFuY2hvciBvZiB0d28gTGlua2FibGVTaGFwZS5cclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgb3B0aW9uc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtGYWJyaWMuQ2FudmFzfSAgIG9wdGlvbnMuY2FudmFzIC0gRmFicmljIGNhbnZhc1xyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICBvcHRpb25zLmlkIC0gVW5pcXVlIGlkZW50aWZpZXJcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBbb3B0aW9ucy5zdGFydF0gLSBDb29yZGluYXRlcyBvZiB0aGUgc3RhcnQgcG9pbnRcclxuICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgW29wdGlvbnMuc3RhcnQueF0gLSBYIGF4aXMgY29vcmRpbmF0ZSBvZiB0aGUgc3RhcnQgcG9pbnRcclxuICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgW29wdGlvbnMuc3RhcnQueV0gLSBZIGF4aXMgY29vcmRpbmF0ZSBvZiB0aGUgc3RhcnQgcG9pbnRcclxuICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgICAgW29wdGlvbnMuZW5kLnhdIC0gWCBheGlzIGNvb3JkaW5hdGUgb2YgdGhlIGVuZCBwb2ludFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICAgICBbb3B0aW9ucy5lbmQueV0gLSBZIGF4aXMgY29vcmRpbmF0ZSBvZiB0aGUgZW5kIHBvaW50XHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLmN1c3RvbV0gLSBPcHRpb25zIGVuZCBjdXN0b21pemUgdGhlIGRpZmZlcmVudCBzaGFwZXMgb2YgdGhlIExpbmtcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICBbb3B0aW9ucy5jdXN0b20ucGF0aF0gLSBiZXppZXIgcXVhZHJhdGljIGN1cnZlXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLmN1c3RvbS5jb250cm9sUG9pbnRdIC0gYmV6aWVyIHF1YWRyYXRpYyBjdXJ2ZSBjb250cm9sIHBvaW50XHJcbiAgICogQHBhcmFtIHtMaW5lfSAgICAgICAgICAgIFtvcHRpb25zLmN1c3RvbS5jb250cm9sTGluZV0gLSB2aXN1YWwgbGluZXMgc3RhcnQgdGhlIGNvbnRyb2wgcG9pbnQgZW5kIHRoZSBzdGFydCZlbmQgcG9pbnRzXHJcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgIFtvcHRpb25zLmN1c3RvbS5zdGFydFBvaW50XSAtIGFrYSBhcnJvd1RhaWxcclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgW29wdGlvbnMuY3VzdG9tLmVuZFBvaW50XSAtIGFrYSBhcnJvd0hlYWRcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGlkLFxyXG4gICAgICBjYW52YXMsXHJcbiAgICB9ID0gb3B0aW9ucztcclxuICAgIGNvbnN0IHgxID0gb3B0aW9ucyAmJiBvcHRpb25zLnN0YXJ0ICYmIG9wdGlvbnMuc3RhcnQueCA/IG9wdGlvbnMuc3RhcnQueCA6IDA7XHJcbiAgICBjb25zdCB5MSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5zdGFydCAmJiBvcHRpb25zLnN0YXJ0LnkgPyBvcHRpb25zLnN0YXJ0LnkgOiAwO1xyXG4gICAgY29uc3QgeDIgPSBvcHRpb25zICYmIG9wdGlvbnMuZW5kICYmIG9wdGlvbnMuZW5kLnggPyBvcHRpb25zLmVuZC54IDogMDtcclxuICAgIGNvbnN0IHkyID0gb3B0aW9ucyAmJiBvcHRpb25zLmVuZCAmJiBvcHRpb25zLmVuZC55ID8gb3B0aW9ucy5lbmQueSA6IDA7XHJcbiAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuXHJcbiAgICAvLyBQYXRoLCBhIGJlemllciBxdWFkcmF0aWMgY3VydmVcclxuICAgIGNvbnN0IHBhdGhDb29yZHMgPSB7XHJcbiAgICAgIE06IHtcclxuICAgICAgICB4OiB4MSwgLy8gc3RhcnQgeFxyXG4gICAgICAgIHk6IHkxLCAvLyBzdGFydCB5XHJcbiAgICAgIH0sXHJcbiAgICAgIFE6IHtcclxuICAgICAgICB4MTogKHgxICsgeDIpIC8gMiwgLy8gY29udHJvbCB4XHJcbiAgICAgICAgeTE6ICh5MSArIHkyKSAvIDIsIC8vIGNvbnRyb2wgeVxyXG4gICAgICAgIHgyLCAvLyBlbmQgeFxyXG4gICAgICAgIHkyLCAvLyBlbmQgeVxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHBhdGhPcHRzID0gdGhpcy5kZWZhdWx0UGF0aE9wdGlvbnMgPSB7XHJcbiAgICAgIGZpbGw6ICcnLFxyXG4gICAgICBzdHJva2U6IChvcHRpb25zLmN1c3RvbSAmJiBvcHRpb25zLmN1c3RvbS5wYXRoICYmIG9wdGlvbnMuY3VzdG9tLnBhdGguc3Ryb2tlV2lkdGgpID8gb3B0aW9ucy5jdXN0b20ucGF0aC5zdHJva2UgOiAnIzAwMCcsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAob3B0aW9ucy5jdXN0b20gJiYgb3B0aW9ucy5jdXN0b20ucGF0aCAmJiBvcHRpb25zLmN1c3RvbS5wYXRoLnN0cm9rZVdpZHRoKSA/IG9wdGlvbnMuY3VzdG9tLnBhdGguc3Ryb2tlV2lkdGggOiAyLFxyXG4gICAgICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgICAgaGFzQm9yZGVyczogdHJ1ZSxcclxuICAgICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgICBwZXJQaXhlbFRhcmdldEZpbmQ6IHRydWUsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgcGF0aFN0ciA9IGBNICR7cGF0aENvb3Jkcy5NLnh9ICR7cGF0aENvb3Jkcy5NLnl9IFEgJHtwYXRoQ29vcmRzLlEueDF9LCAke3BhdGhDb29yZHMuUS55MX0sICR7cGF0aENvb3Jkcy5RLngyfSwgJHtwYXRoQ29vcmRzLlEueTJ9YDtcclxuICAgIGNvbnN0IHBhdGggPSBuZXcgZmFicmljLlBhdGgocGF0aFN0ciwgcGF0aE9wdHMpO1xyXG4gICAgdGhpcy5wYXRoID0gcGF0aDtcclxuXHJcbiAgICAvLyBDb250cm9sIHBvaW50IGFuZCBsaW5lcyBmb3IgdGhlIHF1YWRyYXRpYyBjdXJ2ZVxyXG4gICAgY29uc3QgY29udHJvbFBvaW50ID0gdGhpcy5jb250cm9sUG9pbnQgPSBuZXcgZmFicmljLkNpcmNsZSh7XHJcbiAgICAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgICBsZWZ0OiBwYXRoQ29vcmRzLlEueDEsXHJcbiAgICAgIHRvcDogcGF0aENvb3Jkcy5RLnkxLFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgcmFkaXVzOiA2LFxyXG4gICAgICBmaWxsOiAnIzc4YmVmYScsXHJcbiAgICAgIHN0cm9rZTogJyM3OGJlZmEnLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAgIHNlbGVjdGFibGU6IHRydWUsXHJcbiAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICB9KTtcclxuICAgIGNvbnRyb2xQb2ludC5vbignbW91c2VvdmVyJywgdGhpcy5vbkxpbmtNb3VzZU92ZXIuYmluZCh0aGlzKSk7XHJcbiAgICBjb250cm9sUG9pbnQub24oJ21vdXNlb3V0JywgdGhpcy5vbkxpbmtNb3VzZU91dC5iaW5kKHRoaXMpKTtcclxuICAgIGNvbnRyb2xQb2ludC5vbignbW92aW5nJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhdGgoJ2NvbnRyb2wnLCB0aGlzLmNvbnRyb2xQb2ludC5sZWZ0LCB0aGlzLmNvbnRyb2xQb2ludC50b3AsIGZhbHNlKTtcclxuICAgIH0pO1xyXG4gICAgY29udHJvbFBvaW50Lm9uKCdtb3ZlZCcsICgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVQYXRoKCdjb250cm9sJywgdGhpcy5jb250cm9sUG9pbnQubGVmdCwgdGhpcy5jb250cm9sUG9pbnQudG9wLCB0cnVlKTtcclxuICAgIH0pO1xyXG4gICAgY29udHJvbFBvaW50Lm9uKCdtb3VzZWRvd24nLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuYnJpbmdUb0Zyb250KCk7XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGNvbnRyb2xMaW5lT3B0cyA9IHtcclxuICAgICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAgIHN0cm9rZURhc2hBcnJheTogWzUsIDVdLFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgc3Ryb2tlOiAnIzc4YmVmYScsXHJcbiAgICAgIHNlbGVjdGFibGU6IGZhbHNlLFxyXG4gICAgICBoYXNCb3JkZXJzOiBmYWxzZSxcclxuICAgICAgaGFzQ29udHJvbHM6IGZhbHNlLFxyXG4gICAgICBldmVudGVkOiBmYWxzZSxcclxuICAgICAgb3BhY2l0eTogMCxcclxuICAgIH07XHJcbiAgICBjb25zdCBjb250cm9sTGluZTEgPSB0aGlzLmNvbnRyb2xMaW5lMSA9IG5ldyBmYWJyaWMuTGluZShbY29udHJvbFBvaW50LmxlZnQsIGNvbnRyb2xQb2ludC50b3AsIHgxLCB5MV0sIGNvbnRyb2xMaW5lT3B0cyk7XHJcbiAgICBjb250cm9sTGluZTEub24oJ21vdXNlb3ZlcicsIHRoaXMub25MaW5rTW91c2VPdmVyLmJpbmQodGhpcykpO1xyXG4gICAgY29udHJvbExpbmUxLm9uKCdtb3VzZW91dCcsIHRoaXMub25MaW5rTW91c2VPdXQuYmluZCh0aGlzKSk7XHJcbiAgICBjb25zdCBjb250cm9sTGluZTIgPSB0aGlzLmNvbnRyb2xMaW5lMiA9IG5ldyBmYWJyaWMuTGluZShbY29udHJvbFBvaW50LmxlZnQsIGNvbnRyb2xQb2ludC50b3AsIHgyLCB5Ml0sIGNvbnRyb2xMaW5lT3B0cyk7XHJcbiAgICBjb250cm9sTGluZTIub24oJ21vdXNlb3ZlcicsIHRoaXMub25MaW5rTW91c2VPdmVyLmJpbmQodGhpcykpO1xyXG4gICAgY29udHJvbExpbmUyLm9uKCdtb3VzZW91dCcsIHRoaXMub25MaW5rTW91c2VPdXQuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgLy8gRW5kIHBvaW50IChhcnJvd0hlYWQpXHJcbiAgICBjb25zdCBpc1ZhbGlkTWFza09wdHMgPSB7XHJcbiAgICAgIG9iamVjdENhY2hpbmc6IGZhbHNlLFxyXG4gICAgICBsZWZ0OiBwYXRoQ29vcmRzLlEueDIsXHJcbiAgICAgIHRvcDogcGF0aENvb3Jkcy5RLnkyLFxyXG4gICAgICBzdHJva2VXaWR0aDogMSxcclxuICAgICAgcmFkaXVzOiAxNixcclxuICAgICAgZmlsbDogJyM1N2I4NTcnLCAvLyBlYTRmMzdcclxuICAgICAgc3Ryb2tlOiAnIzU3Yjg1NycsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgICAgc2VsZWN0YWJsZTogZmFsc2UsXHJcbiAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgYXJyb3dIZWFkT3B0cyA9IHtcclxuICAgICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAgIHdpZHRoOiAxMCxcclxuICAgICAgaGVpZ2h0OiAxMCxcclxuICAgICAgbGVmdDogcGF0aENvb3Jkcy5RLngyLFxyXG4gICAgICB0b3A6IHBhdGhDb29yZHMuUS55MixcclxuICAgICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAgIGZpbGw6ICcjMDAwJyxcclxuICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgc3Ryb2tlOiAnIzAwMCcsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgICAgaGFzQm9yZGVyczogZmFsc2UsXHJcbiAgICAgIGhhc0NvbnRyb2xzOiBmYWxzZSxcclxuICAgIH07XHJcbiAgICBjb25zdCBhcnJvd0hlYWQgPSB0aGlzLmFycm93SGVhZCA9IG5ldyBmYWJyaWMuVHJpYW5nbGUoYXJyb3dIZWFkT3B0cyk7XHJcbiAgICB0aGlzLmlzVmFsaWRIZWFkQ29ubmVjdGlvbk1hc2sgPSBuZXcgZmFicmljLkNpcmNsZShpc1ZhbGlkTWFza09wdHMpO1xyXG4gICAgYXJyb3dIZWFkLm9uKCdtb3ZpbmcnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aCgnZW5kJywgYXJyb3dIZWFkLmxlZnQsIGFycm93SGVhZC50b3AsIGZhbHNlKTtcclxuICAgICAgdGhpcy5fY2hlY2tFeHRyZW1pdHlDYW5CZUNvbm5lY3RlZCgnZW5kJyk7XHJcbiAgICB9KTtcclxuICAgIGFycm93SGVhZC5vbignbW92ZWQnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aCgnZW5kJywgYXJyb3dIZWFkLmxlZnQsIGFycm93SGVhZC50b3AsIHRydWUpO1xyXG4gICAgICB0aGlzLmlzVmFsaWRIZWFkQ29ubmVjdGlvbk1hc2suc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICAgIHRoaXMuX2Nvbm5lY3REaXNjb25uZWN0RXh0cmVtaXR5KCdlbmQnKTtcclxuICAgIH0pO1xyXG4gICAgYXJyb3dIZWFkLm9uKCdtb3VzZWRvd24nLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuYnJpbmdUb0Zyb250KCk7XHJcbiAgICAgIHRoaXMudG9nZ2xlQWxsQW5jaG9yc09wYWNpdHkoMSk7XHJcblxyXG4gICAgICBhcnJvd0hlYWQub24oJ21vdXNldXAnLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy50b2dnbGVBbGxBbmNob3JzT3BhY2l0eSgwKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBTdGFydCBwb2ludCAoYXJyb3dUYWlsKVxyXG4gICAgY29uc3QgYXJyb3dUYWlsT3B0cyA9IHtcclxuICAgICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAgIHdpZHRoOiAxMCxcclxuICAgICAgaGVpZ2h0OiAxMCxcclxuICAgICAgbGVmdDogcGF0aENvb3Jkcy5NLngsXHJcbiAgICAgIHRvcDogcGF0aENvb3Jkcy5NLnksXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICBmaWxsOiAnI2ZmZicsXHJcbiAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgIHN0cm9rZTogJyMwMDAnLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIHNlbGVjdGFibGU6IHRydWUsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgYXJyb3dUYWlsID0gdGhpcy5hcnJvd1RhaWwgPSBuZXcgZmFicmljLlJlY3QoYXJyb3dUYWlsT3B0cyk7XHJcbiAgICB0aGlzLmlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2sgPSBuZXcgZmFicmljLkNpcmNsZShpc1ZhbGlkTWFza09wdHMpO1xyXG4gICAgYXJyb3dUYWlsLm9uKCdtb3ZpbmcnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGF0aCgnc3RhcnQnLCBhcnJvd1RhaWwubGVmdCwgYXJyb3dUYWlsLnRvcCwgZmFsc2UpO1xyXG4gICAgICB0aGlzLl9jaGVja0V4dHJlbWl0eUNhbkJlQ29ubmVjdGVkKCdzdGFydCcpO1xyXG4gICAgfSk7XHJcbiAgICBhcnJvd1RhaWwub24oJ21vdmVkJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhdGgoJ3N0YXJ0JywgYXJyb3dUYWlsLmxlZnQsIGFycm93VGFpbC50b3AsIHRydWUpO1xyXG4gICAgICB0aGlzLmlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2suc2V0KCdvcGFjaXR5JywgMCk7XHJcbiAgICAgIHRoaXMuX2Nvbm5lY3REaXNjb25uZWN0RXh0cmVtaXR5KCdzdGFydCcpO1xyXG4gICAgfSk7XHJcbiAgICBhcnJvd1RhaWwub24oJ21vdXNlZG93bicsICgpID0+IHtcclxuICAgICAgdGhpcy5icmluZ1RvRnJvbnQoKTtcclxuICAgICAgdGhpcy50b2dnbGVBbGxBbmNob3JzT3BhY2l0eSgxKTtcclxuXHJcbiAgICAgIGFycm93VGFpbC5vbignbW91c2V1cCcsICgpID0+IHtcclxuICAgICAgICB0aGlzLnRvZ2dsZUFsbEFuY2hvcnNPcGFjaXR5KDApO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5qZWN0KCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBpZCxcclxuICAgICAgY2FudmFzLFxyXG4gICAgICBwYXRoLFxyXG4gICAgICBjb250cm9sUG9pbnQsXHJcbiAgICAgIGNvbnRyb2xMaW5lMSxcclxuICAgICAgY29udHJvbExpbmUyLFxyXG4gICAgICBhcnJvd0hlYWQsXHJcbiAgICAgIGFycm93VGFpbCxcclxuICAgICAgaXNWYWxpZFRhaWxDb25uZWN0aW9uTWFzayxcclxuICAgICAgaXNWYWxpZEhlYWRDb25uZWN0aW9uTWFzayxcclxuICAgIH0gPSB0aGlzO1xyXG4gICAgY2FudmFzLmFkZChjb250cm9sUG9pbnQpO1xyXG4gICAgY2FudmFzLmFkZChjb250cm9sTGluZTEpO1xyXG4gICAgY2FudmFzLmFkZChjb250cm9sTGluZTIpO1xyXG4gICAgY2FudmFzLmFkZChpc1ZhbGlkVGFpbENvbm5lY3Rpb25NYXNrKTtcclxuICAgIGNhbnZhcy5hZGQoaXNWYWxpZEhlYWRDb25uZWN0aW9uTWFzayk7XHJcbiAgICBjYW52YXMuYWRkKGFycm93SGVhZCk7XHJcbiAgICBjYW52YXMuYWRkKGFycm93VGFpbCk7XHJcblxyXG4gICAgY2FudmFzLmFkZChwYXRoKTtcclxuICAgIHRoaXMudXBkYXRlUGF0aCgnc3RhcnQnLCBwYXRoLnBhdGhbMF1bMV0sIHBhdGgucGF0aFswXVsyXSwgdHJ1ZSk7XHJcbiAgICB0aGlzLnVwZGF0ZVBhdGgoJ2VuZCcsIHBhdGgucGF0aFsxXVszXSwgcGF0aC5wYXRoWzFdWzRdLCB0cnVlKTtcclxuICAgIHRoaXMudXBkYXRlUGF0aCgnY29udHJvbCcsIHBhdGgucGF0aFsxXVsxXSwgcGF0aC5wYXRoWzFdWzJdLCB0cnVlKTtcclxuXHJcbiAgICBjYW52YXMubGlua3NbaWRdID0gdGhpcztcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGNvbm5lY3RMaW5rKGxpbmtQb2ludCwgc2hhcGVJZCwgY2FyZGluYWwpIHtcclxuICAgIC8vIENoZWNrIG5vdCBhbHJlYWR5IGNvbm5lY3RlZFxyXG4gICAgaWYgKCF0aGlzLmlzVmFsaWRDb25uZWN0aW9uKGxpbmtQb2ludCwgc2hhcGVJZCwgY2FyZGluYWwpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHNoYXBlID0gdGhpcy5jYW52YXMuZ2V0T2JqZWN0cygpXHJcbiAgICAgIC5maW5kKChvKSA9PiBvLmlkID09PSBzaGFwZUlkKTtcclxuXHJcbiAgICAvLyBEaXNjb25uZWN0IGV4aXN0aW5nIG9iamVjdFxyXG4gICAgdGhpcy5kaXNjb25uZWN0TGluayhsaW5rUG9pbnQpO1xyXG5cclxuICAgIC8vIENvbm5lY3RcclxuICAgIHRoaXNbbGlua1BvaW50XSA9IHtcclxuICAgICAgc2hhcGUsXHJcbiAgICAgIGFuY2hvcjogY2FyZGluYWwsXHJcbiAgICAgIGhhbmRsZXJzOiB7XHJcbiAgICAgICAgb25BbmNob3JQb3NpdGlvbk1vZGlmeWluZzogKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVQYXRoKGxpbmtQb2ludCwgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ubGVmdCwgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0udG9wLCBmYWxzZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkFuY2hvclBvc2l0aW9uTW9kaWZpZWQ6ICgpID0+IHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlUGF0aChsaW5rUG9pbnQsIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLmxlZnQsIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLnRvcCwgdHJ1ZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgICAvLyBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5vcGFjaXR5ID0gMDtcclxuICAgIHNoYXBlLmFuY2hvcnNbY2FyZGluYWxdLm9uKCdwZzpwb3NpdGlvbjptb2RpZnlpbmcnLCB0aGlzW2xpbmtQb2ludF0uaGFuZGxlcnMub25BbmNob3JQb3NpdGlvbk1vZGlmeWluZyk7XHJcbiAgICBzaGFwZS5hbmNob3JzW2NhcmRpbmFsXS5vbigncGc6cG9zaXRpb246bW9kaWZpZWQnLCB0aGlzW2xpbmtQb2ludF0uaGFuZGxlcnMub25BbmNob3JQb3NpdGlvbk1vZGlmaWVkKTtcclxuXHJcbiAgICAvLyBVcGRhdGUgTGlua1xyXG4gICAgdGhpcy51cGRhdGVQYXRoKGxpbmtQb2ludCwgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0ubGVmdCwgc2hhcGUuYW5jaG9yc1tjYXJkaW5hbF0udG9wLCB0cnVlLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBkaXNjb25uZWN0TGluayhsaW5rUG9pbnQpIHtcclxuICAgIGlmICh0aGlzW2xpbmtQb2ludF0pIHtcclxuICAgICAgdGhpc1tsaW5rUG9pbnRdLnNoYXBlLmFuY2hvcnNbdGhpc1tsaW5rUG9pbnRdLmFuY2hvcl0ub2ZmKCdwZzpwb3NpdGlvbjptb2RpZnlpbmcnLCB0aGlzW2xpbmtQb2ludF0uaGFuZGxlcnMub25BbmNob3JQb3NpdGlvbk1vZGlmeWluZyk7XHJcbiAgICAgIHRoaXNbbGlua1BvaW50XS5zaGFwZS5hbmNob3JzW3RoaXNbbGlua1BvaW50XS5hbmNob3JdLm9mZigncGc6cG9zaXRpb246bW9kaWZpZWQnLCB0aGlzW2xpbmtQb2ludF0uaGFuZGxlcnMub25BbmNob3JQb3NpdGlvbk1vZGlmaWVkKTtcclxuICAgICAgZGVsZXRlIHRoaXNbbGlua1BvaW50XTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlc2V0Q3VydmF0dXJlKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBjb250cm9sUG9pbnQsXHJcbiAgICAgIHBhdGgsXHJcbiAgICB9ID0gdGhpcztcclxuICAgIGNvbnRyb2xQb2ludC5sZWZ0ID0gKHBhdGgucGF0aFswXVsxXSArIHBhdGgucGF0aFsxXVszXSkgLyAyO1xyXG4gICAgY29udHJvbFBvaW50LnRvcCA9IChwYXRoLnBhdGhbMF1bMl0gKyBwYXRoLnBhdGhbMV1bNF0pIC8gMjtcclxuICAgIGNvbnRyb2xQb2ludC5zZXRDb29yZHMoKTtcclxuICAgIGNvbnRyb2xQb2ludC5maXJlKCdtb3ZlZCcpO1xyXG4gIH1cclxuXHJcbiAgYnJpbmdUb0Zyb250KCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIHBhdGgsXHJcbiAgICAgIGNvbnRyb2xQb2ludCxcclxuICAgICAgYXJyb3dIZWFkLFxyXG4gICAgICBhcnJvd1RhaWwsXHJcbiAgICB9ID0gdGhpcztcclxuICAgIGNhbnZhcy5icmluZ1RvRnJvbnQocGF0aCk7XHJcbiAgICBjYW52YXMuYnJpbmdUb0Zyb250KGNvbnRyb2xQb2ludCk7XHJcbiAgICBjYW52YXMuYnJpbmdUb0Zyb250KGFycm93SGVhZCk7XHJcbiAgICBjYW52YXMuYnJpbmdUb0Zyb250KGFycm93VGFpbCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVQYXRoKGxpbmtQb2ludCwgeCwgeSwgY29tbWl0LCByZXNldEN1cnYpIHtcclxuICAgIGNvbnN0IHBhdGggPSB7XHJcbiAgICAgIE06IHtcclxuICAgICAgICB4OiBsaW5rUG9pbnQgPT09ICdzdGFydCcgPyB4IDogdGhpcy5wYXRoLnBhdGhbMF1bMV0sXHJcbiAgICAgICAgeTogbGlua1BvaW50ID09PSAnc3RhcnQnID8geSA6IHRoaXMucGF0aC5wYXRoWzBdWzJdLFxyXG4gICAgICB9LFxyXG4gICAgICBROiB7XHJcbiAgICAgICAgeDE6IGxpbmtQb2ludCA9PT0gJ2NvbnRyb2wnID8geCA6IHRoaXMucGF0aC5wYXRoWzFdWzFdLFxyXG4gICAgICAgIHkxOiBsaW5rUG9pbnQgPT09ICdjb250cm9sJyA/IHkgOiB0aGlzLnBhdGgucGF0aFsxXVsyXSxcclxuICAgICAgICB4MjogbGlua1BvaW50ID09PSAnZW5kJyA/IHggOiB0aGlzLnBhdGgucGF0aFsxXVszXSxcclxuICAgICAgICB5MjogbGlua1BvaW50ID09PSAnZW5kJyA/IHkgOiB0aGlzLnBhdGgucGF0aFsxXVs0XSxcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgICBpZiAoY29tbWl0KSB7XHJcbiAgICAgIGNvbnN0IHBhdGhTdHIgPSBgTSAke3BhdGguTS54fSAke3BhdGguTS55fSBRICR7cGF0aC5RLngxfSwgJHtwYXRoLlEueTF9LCAke3BhdGguUS54Mn0sICR7cGF0aC5RLnkyfWA7XHJcbiAgICAgIGNvbnN0IG5ld1BhdGggPSBuZXcgZmFicmljLlBhdGgocGF0aFN0ciwgdGhpcy5kZWZhdWx0UGF0aE9wdGlvbnMpO1xyXG4gICAgICB0aGlzLmNhbnZhcy5yZW1vdmUodGhpcy5wYXRoKTtcclxuICAgICAgdGhpcy5jYW52YXMuYWRkKG5ld1BhdGgpO1xyXG5cclxuICAgICAgbmV3UGF0aC5vbignbW91c2VvdmVyJywgdGhpcy5vbkxpbmtNb3VzZU92ZXIuYmluZCh0aGlzKSk7XHJcbiAgICAgIG5ld1BhdGgub24oJ21vdXNlb3V0JywgdGhpcy5vbkxpbmtNb3VzZU91dC5iaW5kKHRoaXMpKTtcclxuICAgICAgbmV3UGF0aC5vbignbW91c2Vkb3duJywgdGhpcy5icmluZ1RvRnJvbnQuYmluZCh0aGlzKSk7XHJcbiAgICAgIG5ld1BhdGgub24oJ21vdmluZycsIHRoaXMub25MaW5rTW92aW5nLmJpbmQodGhpcykpO1xyXG4gICAgICBuZXdQYXRoLm9uKCdtb3ZlZCcsIHRoaXMub25MaW5rTW92ZWQuYmluZCh0aGlzKSk7XHJcbiAgICAgIGNvbnN0IHRvQmluZCA9IFtcclxuICAgICAgICB0aGlzLmFycm93SGVhZCxcclxuICAgICAgICB0aGlzLmFycm93VGFpbCxcclxuICAgICAgICB0aGlzLmNvbnRyb2xQb2ludCxcclxuICAgICAgICB0aGlzLmNvbnRyb2xMaW5lMSxcclxuICAgICAgICB0aGlzLmNvbnRyb2xMaW5lMixcclxuICAgICAgXTtcclxuICAgICAgY29uc3QgYm9zc1RyYW5zZm9ybSA9IG5ld1BhdGguY2FsY1RyYW5zZm9ybU1hdHJpeCgpO1xyXG4gICAgICBjb25zdCBpbnZlcnRlZEJvc3NUcmFuc2Zvcm0gPSBmYWJyaWMudXRpbC5pbnZlcnRUcmFuc2Zvcm0oYm9zc1RyYW5zZm9ybSk7XHJcbiAgICAgIHRvQmluZC5mb3JFYWNoKChvKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZGVzaXJlZFRyYW5zZm9ybSA9IGZhYnJpYy51dGlsLm11bHRpcGx5VHJhbnNmb3JtTWF0cmljZXMoXHJcbiAgICAgICAgICBpbnZlcnRlZEJvc3NUcmFuc2Zvcm0sXHJcbiAgICAgICAgICBvLmNhbGNUcmFuc2Zvcm1NYXRyaXgoKSxcclxuICAgICAgICApO1xyXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxyXG4gICAgICAgIG8ucmVsYXRpb25zaGlwID0gZGVzaXJlZFRyYW5zZm9ybTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLnBhdGggPSBuZXdQYXRoO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYXRoLnNldCgncGF0aCcsIFtcclxuICAgICAgICBbJ00nLCBwYXRoLk0ueCwgcGF0aC5NLnldLFxyXG4gICAgICAgIFsnUScsIHBhdGguUS54MSwgcGF0aC5RLnkxLCBwYXRoLlEueDIsIHBhdGguUS55Ml0sXHJcbiAgICAgIF0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFVwZGF0ZSBjb250cm9sIGxpbmVzLCBhcnJvdyBoZWFkcyBhbmQgdGFpbHNcclxuICAgIHRoaXMuY29udHJvbExpbmUxLnNldCh7XHJcbiAgICAgIHgxOiB0aGlzLmNvbnRyb2xQb2ludC5sZWZ0LFxyXG4gICAgICB5MTogdGhpcy5jb250cm9sUG9pbnQudG9wLFxyXG4gICAgICB4MjogdGhpcy5wYXRoLnBhdGhbMF1bMV0sXHJcbiAgICAgIHkyOiB0aGlzLnBhdGgucGF0aFswXVsyXSxcclxuICAgIH0pO1xyXG4gICAgdGhpcy5jb250cm9sTGluZTIuc2V0KHtcclxuICAgICAgeDE6IHRoaXMuY29udHJvbFBvaW50LmxlZnQsXHJcbiAgICAgIHkxOiB0aGlzLmNvbnRyb2xQb2ludC50b3AsXHJcbiAgICAgIHgyOiB0aGlzLnBhdGgucGF0aFsxXVszXSxcclxuICAgICAgeTI6IHRoaXMucGF0aC5wYXRoWzFdWzRdLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBhcnJvd0hlYWRBbmdsZSA9IChNYXRoLmF0YW4yKHRoaXMucGF0aC5wYXRoWzFdWzRdIC0gdGhpcy5wYXRoLnBhdGhbMV1bMl0sIHRoaXMucGF0aC5wYXRoWzFdWzNdIC0gdGhpcy5wYXRoLnBhdGhbMV1bMV0pICogMTgwKSAvIE1hdGguUEk7XHJcbiAgICB0aGlzLmFycm93SGVhZC5hbmdsZSA9IGFycm93SGVhZEFuZ2xlICsgOTA7XHJcbiAgICB0aGlzLmFycm93SGVhZC5sZWZ0ID0gdGhpcy5wYXRoLnBhdGhbMV1bM107XHJcbiAgICB0aGlzLmFycm93SGVhZC50b3AgPSB0aGlzLnBhdGgucGF0aFsxXVs0XTtcclxuICAgIHRoaXMuYXJyb3dIZWFkLnNldENvb3JkcygpO1xyXG4gICAgdGhpcy5hcnJvd1RhaWwubGVmdCA9IHRoaXMucGF0aC5wYXRoWzBdWzFdO1xyXG4gICAgdGhpcy5hcnJvd1RhaWwudG9wID0gdGhpcy5wYXRoLnBhdGhbMF1bMl07XHJcbiAgICB0aGlzLmFycm93VGFpbC5zZXRDb29yZHMoKTtcclxuXHJcbiAgICB0aGlzLmJyaW5nVG9Gcm9udCgpO1xyXG5cclxuICAgIC8vIFJlc2V0IGNvbnRyb2wgcG9pbnRcclxuICAgIGlmIChyZXNldEN1cnYpIHtcclxuICAgICAgdGhpcy5yZXNldEN1cnZhdHVyZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNWYWxpZENvbm5lY3Rpb24obGlua1BvaW50LCBzaGFwZUlkLCBjYXJkaW5hbCkge1xyXG4gICAgY29uc3Qgc2hhcGUgPSB0aGlzLmNhbnZhcy5nZXRPYmplY3RzKClcclxuICAgICAgLmZpbmQoKG8pID0+IG8uaWQgPT09IHNoYXBlSWQpO1xyXG4gICAgLy8gQ2hlY2sgbm90IGFscmVhZHkgY29ubmVjdGVkXHJcbiAgICBpZiAobGlua1BvaW50ID09PSAnc3RhcnQnKSB7XHJcbiAgICAgIGlmICh0aGlzLnN0YXJ0ICYmIHRoaXMuc3RhcnQuc2hhcGUgJiYgdGhpcy5zdGFydC5zaGFwZS5pZCA9PT0gc2hhcGUuaWQgJiYgdGhpcy5zdGFydC5jYXJkaW5hbCA9PT0gY2FyZGluYWwpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIHRyeWluZyBlbmQgc2V0IHRoZSBzYW1lIGFscmVhZHkgY29ubmVjdGVkIGFuY2hvclxyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLmVuZCAmJiB0aGlzLmVuZC5zaGFwZSAmJiB0aGlzLmVuZC5zaGFwZS5pZCA9PT0gc2hhcGUuaWQpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIHRyeWluZyBlbmQgc2hvcnQgY2lyY3VpdCB0aGUgcmVjdGFuZ2xlXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAobGlua1BvaW50ID09PSAnZW5kJykge1xyXG4gICAgICBpZiAodGhpcy5lbmQgJiYgdGhpcy5lbmQuc2hhcGUgJiYgdGhpcy5lbmQuc2hhcGUuaWQgPT09IHNoYXBlLmlkICYmIHRoaXMuZW5kLmNhcmRpbmFsID09PSBjYXJkaW5hbCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTsgLy8gdHJ5aW5nIGVuZCBzZXQgdGhlIHNhbWUgYWxyZWFkeSBjb25uZWN0ZWQgYW5jaG9yXHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuc3RhcnQgJiYgdGhpcy5zdGFydC5zaGFwZSAmJiB0aGlzLnN0YXJ0LnNoYXBlLmlkID09PSBzaGFwZS5pZCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTsgLy8gdHJ5aW5nIGVuZCBzaG9ydCBjaXJjdWl0IHRoZSByZWN0YW5nbGVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVBbGxBbmNob3JzT3BhY2l0eShvcGFjaXR5KSB7XHJcbiAgICBjb25zdCBhbmNob3JzID0gdGhpcy5jYW52YXMuZ2V0T2JqZWN0cygpXHJcbiAgICAgIC5maWx0ZXIoKG8pID0+IG8udHlwZSA9PT0gJ2FuY2hvcicpO1xyXG5cclxuICAgIC8vIGNvbnN0IHByb21pc2VzID0gW107XHJcbiAgICAvLyBjb25zdCBwcm9taXNlRmFjdG9yeSA9IGZ1bmN0aW9uIChhbmNob3IpIHtcclxuICAgIC8vICAgcmV0dXJuIGZ1bmN0aW9uIChyZXNvbHZlKSB7XHJcbiAgICAvLyAgICAgYW5jaG9yLmFuaW1hdGUoJ29wYWNpdHknLCBvcGFjaXR5LCB7XHJcbiAgICAvLyAgICAgICBkdXJhdGlvbjogMzAwLFxyXG4gICAgLy8gICAgICAgb25DaGFuZ2U6IHJlc29sdmUsXHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyAgIH07XHJcbiAgICAvLyB9O1xyXG4gICAgLy8gZm9yIChsZXQgYSA9IDA7IGEgPCBhbmNob3JzLmxlbmd0aDsgYSArPSAxKSB7XHJcbiAgICAvLyAgIGlmIChsb2NrICE9PSB1bmRlZmluZWQpIGFuY2hvcnNbYV0ubG9ja09wYWNpdHkgPSBsb2NrO1xyXG4gICAgLy8gICBwcm9taXNlcy5wdXNoKG5ldyBQcm9taXNlKHByb21pc2VGYWN0b3J5KGFuY2hvcnNbYV0pKSk7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiB7XHJcbiAgICAvLyAgIHRoaXMuY2FudmFzLnJlbmRlckFsbCgpO1xyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgZm9yIChsZXQgYSA9IDA7IGEgPCBhbmNob3JzLmxlbmd0aDsgYSArPSAxKSB7XHJcbiAgICAgIC8vIGlmIChsb2NrICE9PSB1bmRlZmluZWQpIGFuY2hvcnNbYV0ubG9ja09wYWNpdHkgPSBsb2NrO1xyXG4gICAgICBhbmNob3JzW2FdLnNldCgnb3BhY2l0eScsIG9wYWNpdHkpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jYW52YXMucmVuZGVyQWxsKCk7XHJcbiAgfVxyXG5cclxuICBvbkxpbmtNb3VzZU92ZXIoKSB7XHJcbiAgICB0aGlzLmNvbnRyb2xQb2ludC50b2dnbGVPcGFjaXR5KDEpO1xyXG4gICAgdGhpcy5jb250cm9sTGluZTEudG9nZ2xlT3BhY2l0eSgxKTtcclxuICAgIHRoaXMuY29udHJvbExpbmUyLnRvZ2dsZU9wYWNpdHkoMSk7XHJcbiAgfVxyXG5cclxuICBvbkxpbmtNb3VzZU91dCgpIHtcclxuICAgIHRoaXMuY29udHJvbFBvaW50LnRvZ2dsZU9wYWNpdHkoMCk7XHJcbiAgICB0aGlzLmNvbnRyb2xMaW5lMS50b2dnbGVPcGFjaXR5KDApO1xyXG4gICAgdGhpcy5jb250cm9sTGluZTIudG9nZ2xlT3BhY2l0eSgwKTtcclxuICB9XHJcblxyXG4gIG9uTGlua01vdmluZygpIHtcclxuICAgIC8vIE1vdmUgc3RhcnQsIGVuZCwgY29udHJvbCBwb2ludHMgYWx0b2dldGhlciB3aXRoIHRoZSBQYXRoXHJcbiAgICBjb25zdCB0b1VwZGF0ZSA9IFtcclxuICAgICAgdGhpcy5hcnJvd0hlYWQsXHJcbiAgICAgIHRoaXMuYXJyb3dUYWlsLFxyXG4gICAgICB0aGlzLmNvbnRyb2xQb2ludCxcclxuICAgICAgdGhpcy5jb250cm9sTGluZTEsXHJcbiAgICAgIHRoaXMuY29udHJvbExpbmUyLFxyXG4gICAgXTtcclxuICAgIHRvVXBkYXRlLmZvckVhY2goKG8pID0+IHtcclxuICAgICAgaWYgKCFvLnJlbGF0aW9uc2hpcCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCB7IHJlbGF0aW9uc2hpcCB9ID0gbztcclxuICAgICAgY29uc3QgbmV3VHJhbnNmb3JtID0gZmFicmljLnV0aWwubXVsdGlwbHlUcmFuc2Zvcm1NYXRyaWNlcyhcclxuICAgICAgICB0aGlzLnBhdGguY2FsY1RyYW5zZm9ybU1hdHJpeCgpLFxyXG4gICAgICAgIHJlbGF0aW9uc2hpcCxcclxuICAgICAgKTtcclxuICAgICAgY29uc3Qgb3B0ID0gZmFicmljLnV0aWwucXJEZWNvbXBvc2UobmV3VHJhbnNmb3JtKTtcclxuICAgICAgby5zZXQoe1xyXG4gICAgICAgIGZsaXBYOiBmYWxzZSxcclxuICAgICAgICBmbGlwWTogZmFsc2UsXHJcbiAgICAgIH0pO1xyXG4gICAgICBvLnNldFBvc2l0aW9uQnlPcmlnaW4oXHJcbiAgICAgICAgeyB4OiBvcHQudHJhbnNsYXRlWCwgeTogb3B0LnRyYW5zbGF0ZVkgfSxcclxuICAgICAgICAnY2VudGVyJyxcclxuICAgICAgICAnY2VudGVyJyxcclxuICAgICAgKTtcclxuICAgICAgby5zZXQob3B0KTtcclxuICAgICAgby5zZXRDb29yZHMoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEZpbmFsbHksIGNoZWNrIHRoZSBzdGFydCBvciBlbmQgcG9pbnRzIGNhbiBiZSBjb25uZWN0ZWQuXHJcbiAgICB0aGlzLl9jaGVja0V4dHJlbWl0eUNhbkJlQ29ubmVjdGVkKCdzdGFydCcpO1xyXG4gICAgdGhpcy5fY2hlY2tFeHRyZW1pdHlDYW5CZUNvbm5lY3RlZCgnZW5kJyk7XHJcbiAgfVxyXG5cclxuICBvbkxpbmtNb3ZlZCgpIHtcclxuICAgIC8vIFJldXBkYXRlIHRoZSBQYXRoIGFjY29yZGluZyBlbmQgdGhlIG5ldyBjb29yZGluYXRlcyBvZiBhbGwgZWxlbWVudHNcclxuICAgIGNvbnN0IHBhdGhDb29yZHMgPSB7XHJcbiAgICAgIE06IHtcclxuICAgICAgICB4OiB0aGlzLmFycm93VGFpbC5sZWZ0LFxyXG4gICAgICAgIHk6IHRoaXMuYXJyb3dUYWlsLnRvcCxcclxuICAgICAgfSxcclxuICAgICAgUToge1xyXG4gICAgICAgIHgxOiB0aGlzLmNvbnRyb2xQb2ludC5sZWZ0LFxyXG4gICAgICAgIHkxOiB0aGlzLmNvbnRyb2xQb2ludC50b3AsXHJcbiAgICAgICAgeDI6IHRoaXMuYXJyb3dIZWFkLmxlZnQsXHJcbiAgICAgICAgeTI6IHRoaXMuYXJyb3dIZWFkLnRvcCxcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgICBjb25zdCBwYXRoU3RyID0gYE0gJHtwYXRoQ29vcmRzLk0ueH0gJHtwYXRoQ29vcmRzLk0ueX0gUSAke3BhdGhDb29yZHMuUS54MX0sICR7cGF0aENvb3Jkcy5RLnkxfSwgJHtwYXRoQ29vcmRzLlEueDJ9LCAke3BhdGhDb29yZHMuUS55Mn1gO1xyXG4gICAgY29uc3QgY2FjYSA9IG5ldyBmYWJyaWMuUGF0aChwYXRoU3RyLCB7fSk7XHJcbiAgICB0aGlzLnVwZGF0ZVBhdGgoJ3N0YXJ0JywgY2FjYS5wYXRoWzBdWzFdLCBjYWNhLnBhdGhbMF1bMl0sIGZhbHNlKTtcclxuICAgIHRoaXMudXBkYXRlUGF0aCgnZW5kJywgY2FjYS5wYXRoWzFdWzNdLCBjYWNhLnBhdGhbMV1bNF0sIGZhbHNlKTtcclxuICAgIHRoaXMudXBkYXRlUGF0aCgnY29udHJvbCcsIGNhY2EucGF0aFsxXVsxXSwgY2FjYS5wYXRoWzFdWzJdLCB0cnVlKTtcclxuXHJcbiAgICAvLyBDb25uZWN0IG9yIERpc2Nvbm5lY3QgZGVwZW5kaW5nIG9uIGV4dHJlbWl0aWVzIHBvc2l0aW9uc1xyXG4gICAgdGhpcy5pc1ZhbGlkVGFpbENvbm5lY3Rpb25NYXNrLnNldCgnb3BhY2l0eScsIDApO1xyXG4gICAgdGhpcy5pc1ZhbGlkSGVhZENvbm5lY3Rpb25NYXNrLnNldCgnb3BhY2l0eScsIDApO1xyXG4gICAgdGhpcy5fY29ubmVjdERpc2Nvbm5lY3RFeHRyZW1pdHkoJ3N0YXJ0Jyk7XHJcbiAgICB0aGlzLl9jb25uZWN0RGlzY29ubmVjdEV4dHJlbWl0eSgnZW5kJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIZWxwZXIgZW5kIGRpc3BsYXkgYSB2YWxpZCBjaXJjbGUgbWFzayBvbiBzcGVjaWZpYyBjb25kaXRpb25zLlxyXG4gICAqIElmIHRoZSBleHRyZW1pdHkgaXMgdG91Y2hpbmcgYW4gYW5jaG9yIG9mIGEgTGlua2FibGVTaGFwZSBzdGFydCB3aGljaCBpdCBpcyBub3QgeWV0IGNvbm5lY3RlZCA9PiBzaG93IEdSRUVOXHJcbiAgICogSWYgdGhlIGV4dHJlbWl0eSBpcyB0b3VjaGluZyBhbiBhbmNob3Igb2YgYSBMaW5rYWJsZVNoYXBlIHN0YXJ0IHdoaWNoIGl0IGlzIGFscmVhZHkgY29ubmVjdGVkIGJ5IHRoZSBvdGhlciBleHRyZW1pdHkgPT4gc2hvdyBSRURcclxuICAgKiBAcGFyYW0gZGlyZWN0aW9uXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBfY2hlY2tFeHRyZW1pdHlDYW5CZUNvbm5lY3RlZChkaXJlY3Rpb24pIHtcclxuICAgIGNvbnN0IHsgY2FudmFzIH0gPSB0aGlzO1xyXG5cclxuICAgIGxldCBleHRyZW1pdHk7XHJcbiAgICBsZXQgbWFzaztcclxuICAgIGlmIChkaXJlY3Rpb24gPT09ICdzdGFydCcpIHtcclxuICAgICAgZXh0cmVtaXR5ID0gdGhpcy5hcnJvd1RhaWw7XHJcbiAgICAgIG1hc2sgPSB0aGlzLmlzVmFsaWRUYWlsQ29ubmVjdGlvbk1hc2s7XHJcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ2VuZCcpIHtcclxuICAgICAgZXh0cmVtaXR5ID0gdGhpcy5hcnJvd0hlYWQ7XHJcbiAgICAgIG1hc2sgPSB0aGlzLmlzVmFsaWRIZWFkQ29ubmVjdGlvbk1hc2s7XHJcbiAgICB9XHJcblxyXG4gICAgbWFzay5sZWZ0ID0gZXh0cmVtaXR5LmxlZnQ7XHJcbiAgICBtYXNrLnRvcCA9IGV4dHJlbWl0eS50b3A7XHJcbiAgICBtYXNrLnNldENvb3JkcygpO1xyXG4gICAgbWFzay5zZXQoJ29wYWNpdHknLCAwKTtcclxuXHJcbiAgICAvLyBDaGVjayBpZiBpbnRlcnNlY3RzIHdpdGggYW5jaG9yXHJcbiAgICBjb25zdCBhbmNob3JzID0gY2FudmFzLmdldE9iamVjdHMoKVxyXG4gICAgICAuZmlsdGVyKChvKSA9PiBvLnR5cGUgPT09ICdhbmNob3InKTtcclxuICAgIGV4dHJlbWl0eS5zZXQoJ3N0cm9rZScsICcjMDAwJyk7XHJcbiAgICBmb3IgKGxldCBhID0gMDsgYSA8IGFuY2hvcnMubGVuZ3RoOyBhICs9IDEpIHtcclxuICAgICAgaWYgKGV4dHJlbWl0eS5pbnRlcnNlY3RzV2l0aE9iamVjdChhbmNob3JzW2FdKSkge1xyXG4gICAgICAgIG1hc2suc2V0KCdvcGFjaXR5JywgMC41KTtcclxuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkQ29ubmVjdGlvbihkaXJlY3Rpb24sIGFuY2hvcnNbYV0uc2hhcGVJZCwgYW5jaG9yc1thXS5jYXJkaW5hbCkpIHtcclxuICAgICAgICAgIG1hc2suc2V0KHtcclxuICAgICAgICAgICAgc3Ryb2tlOiAnIzU3Yjg1NycsXHJcbiAgICAgICAgICAgIGZpbGw6ICcjNTdiODU3JyxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgZXh0cmVtaXR5LnNldCgnc3Ryb2tlJywgJyM1ZjUnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbWFzay5zZXQoe1xyXG4gICAgICAgICAgICBzdHJva2U6ICcjZWE0ZjM3JyxcclxuICAgICAgICAgICAgZmlsbDogJyNlYTRmMzcnLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBleHRyZW1pdHkuc2V0KCdzdHJva2UnLCAnI2VhNGYzNycpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGVscGVyIGVuZCBleGVjdXRlIGNvbm5lY3QvZGlzY29ubmVjdCBkZXBlbmRpbmcgb24gc3BlY2lmaWMgY29uZGl0aW9ucy5cclxuICAgKiBJZiB0aGUgZXh0cmVtaXR5IHdhcyBjb25uZWN0ZWQgQU5EIGl0IGlzIE5PVCB0b3VjaGluZyB0aGUgYW5jaG9yIGFueW1vcmUgPT4gZGlzY29ubmVjdCBpdC5cclxuICAgKiBJZiB0aGUgZXh0cmVtaXR5IHdhcyBkaXNjb25uZWN0ZWQgQU5EIGl0IGlzIHRvdWNoaW5nIHRoZSBhbmNob3IgPT4gY29ubmVjdCBpdC5cclxuICAgKiBAcGFyYW0gZGlyZWN0aW9uXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBfY29ubmVjdERpc2Nvbm5lY3RFeHRyZW1pdHkoZGlyZWN0aW9uKSB7XHJcbiAgICBjb25zdCB7IGNhbnZhcyB9ID0gdGhpcztcclxuXHJcbiAgICBsZXQgZXh0cmVtaXR5O1xyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3N0YXJ0Jykge1xyXG4gICAgICBleHRyZW1pdHkgPSB0aGlzLmFycm93VGFpbDtcclxuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnZW5kJykge1xyXG4gICAgICBleHRyZW1pdHkgPSB0aGlzLmFycm93SGVhZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGVjayBpZiBpbnRlcnNlY3RzIHdpdGggYW5jaG9yXHJcbiAgICBjb25zdCBhbmNob3JzID0gY2FudmFzLmdldE9iamVjdHMoKVxyXG4gICAgICAuZmlsdGVyKChvKSA9PiBvLnR5cGUgPT09ICdhbmNob3InKTtcclxuICAgIGZvciAobGV0IGEgPSAwOyBhIDwgYW5jaG9ycy5sZW5ndGg7IGEgKz0gMSkge1xyXG4gICAgICBpZiAoZXh0cmVtaXR5LmludGVyc2VjdHNXaXRoT2JqZWN0KGFuY2hvcnNbYV0pKSB7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0TGluayhkaXJlY3Rpb24sIGFuY2hvcnNbYV0uc2hhcGVJZCwgYW5jaG9yc1thXS5jYXJkaW5hbCk7XHJcbiAgICAgICAgLy8gYW5jaG9yc1thXS5zZXQoJ3N0cm9rZScsICcjMDAwJyk7XHJcbiAgICAgICAgZXh0cmVtaXR5LnNldCgnc3Ryb2tlJywgJyMwMDAnKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzW2RpcmVjdGlvbl0gJiYgYW5jaG9yc1thXSA9PT0gdGhpc1tkaXJlY3Rpb25dLnNoYXBlLmFuY2hvcnNbdGhpc1tkaXJlY3Rpb25dLmFuY2hvcl0pIHtcclxuICAgICAgICAvLyBJZiB0aGlzIGxpbmsgd2FzIGNvbm5lY3RlZCBlbmQgdGhpcyBhbmNob3IgYW5kIGl0IGRvZXNuJ3QgaW50ZXJzZWN0IGFueW1vcmVcclxuICAgICAgICB0aGlzLmRpc2Nvbm5lY3RMaW5rKGRpcmVjdGlvbik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiY29uc3QgeyBmYWJyaWMgfSA9IHdpbmRvdztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpbmthYmxlU2hhcGUge1xyXG4gIC8qKlxyXG4gICAqIEEgTGlua2FibGVTaGFwZSBpcyBhbnkgRmFicmljLk9iamVjdCBzaGFwZSBvbiB3aGljaCBhbmNob3JzIGFyZSBhcHBlbmRlZCBzbyB0aGF0IG11bHRpcGxlIExpbmsgY2FuIGJlIGNvbm5lY3RlZCB0byBpdC5cclxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgb3B0aW9uc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtGYWJyaWMuQ2FudmFzfSAgIG9wdGlvbnMuY2FudmFzIC0gRmFicmljIGNhbnZhc1xyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICBvcHRpb25zLmlkIC0gVW5pcXVlIGlkZW50aWZpZXJcclxuICAgKlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgaWQsXHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgc2hhcGUsXHJcbiAgICAgIGxlZnQsXHJcbiAgICAgIHRvcCxcclxuICAgICAgYW5nbGUsXHJcbiAgICB9ID0gb3B0aW9ucztcclxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuXHJcbiAgICAvLyBTZXQgc2hhcGVcclxuICAgIHNoYXBlLnNldCgndHlwZScsICdsaW5rYWJsZVNoYXBlJyk7XHJcbiAgICBzaGFwZS5zZXQoe1xyXG4gICAgICBsZWZ0LCB0b3AsIGlkLCBhbmdsZSxcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zaGFwZSA9IHNoYXBlO1xyXG5cclxuICAgIC8vIFNob3cgY29vcmRpbmF0ZXMvYW5nbGUgd2hlbiBtb3Zpbmcvcm90YXRpbmcgb2JqZWN0XHJcbiAgICBjb25zdCBtb2RpZmljYXRpb25Cb3ggPSBuZXcgZmFicmljLlJlY3Qoe1xyXG4gICAgICBsZWZ0OiAwLFxyXG4gICAgICB0b3A6IDAsXHJcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxyXG4gICAgICBvcmlnaW5ZOiAnY2VudGVyJyxcclxuICAgICAgc3Ryb2tlV2lkdGg6IDEsXHJcbiAgICAgIHN0cm9rZTogJyM2NjYnLFxyXG4gICAgICBmaWxsOiAnI2ZmZicsXHJcbiAgICAgIHdpZHRoOiA3MCxcclxuICAgICAgaGVpZ2h0OiAyMCxcclxuICAgICAgdmVudGVkOiBmYWxzZSxcclxuICAgICAgc2VsZWN0YWJsZTogZmFsc2UsXHJcbiAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IG1vZGlmaWNhdGlvblRleHQgPSBuZXcgZmFicmljLlRleHQoJzAsIDAnLCB7XHJcbiAgICAgIGxlZnQ6IDAsXHJcbiAgICAgIHRvcDogMCxcclxuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXHJcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxyXG4gICAgICBmb250RmFtaWx5OiAnSGVsdmV0aWNhJyxcclxuICAgICAgZm9udFNpemU6IDEyLFxyXG4gICAgICBib3JkZXJTdHJva2VXaWR0aDogNCxcclxuICAgICAgZXZlbnRlZDogZmFsc2UsXHJcbiAgICAgIHNlbGVjdGFibGU6IGZhbHNlLFxyXG4gICAgICBvcGFjaXR5OiAwLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBtb2RpZmljYXRpb24gPSB0aGlzLm1vZEJveCA9IG5ldyBmYWJyaWMuR3JvdXAoW21vZGlmaWNhdGlvbkJveCwgbW9kaWZpY2F0aW9uVGV4dF0sIHtcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIGV2ZW50ZWQ6IGZhbHNlLFxyXG4gICAgICBzZWxlY3RhYmxlOiBmYWxzZSxcclxuICAgIH0pO1xyXG4gICAgY29uc3Qgb25Nb3ZpbmcgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHsgeCwgeSB9ID0gc2hhcGUuYUNvb3Jkcy50bDtcclxuICAgICAgY29uc3QgeENvb3JkcyA9IFtzaGFwZS5hQ29vcmRzLnRsLngsIHNoYXBlLmFDb29yZHMudHIueCwgc2hhcGUuYUNvb3Jkcy5ibC54LCBzaGFwZS5hQ29vcmRzLmJyLnhdO1xyXG4gICAgICBjb25zdCB5Q29vcmRzID0gW3NoYXBlLmFDb29yZHMudGwueSwgc2hhcGUuYUNvb3Jkcy50ci55LCBzaGFwZS5hQ29vcmRzLmJsLnksIHNoYXBlLmFDb29yZHMuYnIueV07XHJcbiAgICAgIG1vZGlmaWNhdGlvbi5sZWZ0ID0gKE1hdGgubWluKC4uLnhDb29yZHMpICsgTWF0aC5tYXgoLi4ueENvb3JkcykpIC8gMjtcclxuICAgICAgbW9kaWZpY2F0aW9uLnRvcCA9IE1hdGgucm91bmQoTWF0aC5tYXgoLi4ueUNvb3JkcykgKyAzMCk7XHJcbiAgICAgIG1vZGlmaWNhdGlvbi5zZXRDb29yZHMoKTtcclxuICAgICAgbW9kaWZpY2F0aW9uQm94LnNldCgnb3BhY2l0eScsIDAuNyk7XHJcbiAgICAgIG1vZGlmaWNhdGlvblRleHQuc2V0KCdvcGFjaXR5JywgMSk7XHJcbiAgICAgIG1vZGlmaWNhdGlvblRleHQuc2V0KCd0ZXh0JywgYCR7TWF0aC5yb3VuZCh4KX0sICR7TWF0aC5yb3VuZCh5KX1gKTtcclxuICAgICAgY2FudmFzLmJyaW5nVG9Gcm9udChtb2RpZmljYXRpb24pO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IG9uTW92ZWQgPSAoKSA9PiB7XHJcbiAgICAgIG1vZGlmaWNhdGlvbkJveC5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgICAgbW9kaWZpY2F0aW9uVGV4dC5zZXQoJ29wYWNpdHknLCAwKTtcclxuICAgIH07XHJcbiAgICBjb25zdCBvblJvdGF0aW5nID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCB4Q29vcmRzID0gW3NoYXBlLmFDb29yZHMudGwueCwgc2hhcGUuYUNvb3Jkcy50ci54LCBzaGFwZS5hQ29vcmRzLmJsLngsIHNoYXBlLmFDb29yZHMuYnIueF07XHJcbiAgICAgIGNvbnN0IHlDb29yZHMgPSBbc2hhcGUuYUNvb3Jkcy50bC55LCBzaGFwZS5hQ29vcmRzLnRyLnksIHNoYXBlLmFDb29yZHMuYmwueSwgc2hhcGUuYUNvb3Jkcy5ici55XTtcclxuICAgICAgbW9kaWZpY2F0aW9uLmxlZnQgPSAoTWF0aC5taW4oLi4ueENvb3JkcykgKyBNYXRoLm1heCguLi54Q29vcmRzKSkgLyAyO1xyXG4gICAgICBtb2RpZmljYXRpb24udG9wID0gTWF0aC5yb3VuZChNYXRoLm1heCguLi55Q29vcmRzKSArIDMwKTtcclxuICAgICAgbW9kaWZpY2F0aW9uLnNldENvb3JkcygpO1xyXG4gICAgICBtb2RpZmljYXRpb25Cb3guc2V0KCdvcGFjaXR5JywgMC43KTtcclxuICAgICAgbW9kaWZpY2F0aW9uVGV4dC5zZXQoJ29wYWNpdHknLCAxKTtcclxuICAgICAgbW9kaWZpY2F0aW9uVGV4dC5zZXQoJ3RleHQnLCBgJHtNYXRoLnJvdW5kKHNoYXBlLmFuZ2xlID4gMTgwID8gc2hhcGUuYW5nbGUgLSAzNjAgOiBzaGFwZS5hbmdsZSl9wrBgKTtcclxuICAgICAgY2FudmFzLmJyaW5nVG9Gcm9udChtb2RpZmljYXRpb24pO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IG9uUm90YXRlZCA9ICgpID0+IHtcclxuICAgICAgbW9kaWZpY2F0aW9uQm94LnNldCgnb3BhY2l0eScsIDApO1xyXG4gICAgICBtb2RpZmljYXRpb25UZXh0LnNldCgnb3BhY2l0eScsIDApO1xyXG4gICAgfTtcclxuICAgIHNoYXBlLm9uKHtcclxuICAgICAgbW92aW5nOiBvbk1vdmluZyxcclxuICAgICAgbW92ZWQ6IG9uTW92ZWQsXHJcbiAgICAgIHJvdGF0aW5nOiBvblJvdGF0aW5nLFxyXG4gICAgICByb3RhdGVkOiBvblJvdGF0ZWQsXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBBbmNob3IgcG9pbnRzXHJcbiAgICB0aGlzLmFuY2hvcnMgPSB0aGlzLnNoYXBlLmFuY2hvcnMgPSB7XHJcbiAgICAgIGVhc3Q6IHRoaXMuX21ha2VBbmNob3JQb2ludCgnZWFzdCcpLFxyXG4gICAgICB3ZXN0OiB0aGlzLl9tYWtlQW5jaG9yUG9pbnQoJ3dlc3QnKSxcclxuICAgICAgLy8gbm9ydGg6IHRoaXMuX21ha2VBbmNob3JQb2ludCgnbm9ydGgnKSxcclxuICAgICAgLy8gc291dGg6IHRoaXMuX21ha2VBbmNob3JQb2ludCgnc291dGgnKSxcclxuICAgICAgLy8gbm9ydGhlYXN0OiB0aGlzLl9tYWtlQW5jaG9yUG9pbnQoJ25vcnRoZWFzdCcpLFxyXG4gICAgICAvLyBub3J0aHdlc3Q6IHRoaXMuX21ha2VBbmNob3JQb2ludCgnbm9ydGh3ZXN0JyksXHJcbiAgICAgIC8vIHNvdXRoZWFzdDogdGhpcy5fbWFrZUFuY2hvclBvaW50KCdzb3V0aGVhc3QnKSxcclxuICAgICAgLy8gc291dGh3ZXN0OiB0aGlzLl9tYWtlQW5jaG9yUG9pbnQoJ3NvdXRod2VzdCcpLFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBFdmVudHMgcmVsYXRlZCB0byBhbmNob3JzXHJcbiAgICBzaGFwZS5vbih7XHJcbiAgICAgIHNlbGVjdGVkOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy50b2dnbGVBbmNob3JzT3BhY2l0eSgxKTtcclxuICAgICAgfSxcclxuICAgICAgbW91c2VvdmVyOiAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FudmFzLmdldEFjdGl2ZU9iamVjdCgpICE9PSB0aGlzLnNoYXBlKSB7XHJcbiAgICAgICAgICB0aGlzLnRvZ2dsZUFuY2hvcnNPcGFjaXR5KDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgbW91c2VvdXQ6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnRvZ2dsZUFuY2hvcnNPcGFjaXR5KDEpO1xyXG4gICAgICB9LFxyXG4gICAgICBtb2RpZnlpbmc6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnJlZnJlc2hBbmNob3JzUG9zaXRpb24oZmFsc2UpO1xyXG4gICAgICB9LFxyXG4gICAgICBtb2RpZmllZDogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbih0cnVlKTtcclxuICAgICAgfSxcclxuICAgICAgbW92aW5nOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKGZhbHNlKTtcclxuICAgICAgfSxcclxuICAgICAgbW92ZWQ6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnJlZnJlc2hBbmNob3JzUG9zaXRpb24odHJ1ZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHJvdGF0aW5nOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKGZhbHNlKTtcclxuICAgICAgfSxcclxuICAgICAgcm90YXRlZDogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbih0cnVlKTtcclxuICAgICAgfSxcclxuICAgICAgc2NhbGluZzogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbihmYWxzZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHNjYWxlZDogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbih0cnVlKTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5qZWN0KCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBpZCxcclxuICAgICAgY2FudmFzLFxyXG4gICAgICBzaGFwZSxcclxuICAgICAgYW5jaG9ycyxcclxuICAgICAgbW9kQm94LFxyXG4gICAgfSA9IHRoaXM7XHJcbiAgICBjYW52YXMuYWRkKHNoYXBlKTtcclxuICAgIGNhbnZhcy5hZGQobW9kQm94KTtcclxuICAgIE9iamVjdC5rZXlzKGFuY2hvcnMpLmZvckVhY2goKGNhcmRpbmFsKSA9PiB7XHJcbiAgICAgIGNhbnZhcy5hZGQoYW5jaG9yc1tjYXJkaW5hbF0pO1xyXG4gICAgICBjYW52YXMuYnJpbmdGb3J3YXJkKGFuY2hvcnNbY2FyZGluYWxdLCB0cnVlKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5yZWZyZXNoQW5jaG9yc1Bvc2l0aW9uKHRydWUpO1xyXG5cclxuICAgIGNhbnZhcy5saW5rYWJsZVNoYXBlc1tpZF0gPSB0aGlzO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBpZCxcclxuICAgICAgY2FudmFzLFxyXG4gICAgICBzaGFwZSxcclxuICAgICAgYW5jaG9ycyxcclxuICAgICAgbW9kQm94LFxyXG4gICAgfSA9IHRoaXM7XHJcbiAgICBjYW52YXMucmVtb3ZlKHNoYXBlKTtcclxuICAgIGNhbnZhcy5yZW1vdmUobW9kQm94KTtcclxuICAgIE9iamVjdC5rZXlzKGFuY2hvcnMpLmZvckVhY2goKGNhcmRpbmFsKSA9PiB7XHJcbiAgICAgIGNhbnZhcy5yZW1vdmUoYW5jaG9yc1tjYXJkaW5hbF0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGVsZXRlIGNhbnZhcy5saW5rYWJsZVNoYXBlc1tpZF07XHJcbiAgfVxyXG5cclxuICBtb3ZlKG9wdGlvbnMsIGl0ZXIpIHtcclxuICAgIGNvbnN0IHsgY2FudmFzLCBzaGFwZSB9ID0gdGhpcztcclxuXHJcbiAgICAvLyBNb3ZlIHRoZSBzaGFwZSBhbmQgdXBkYXRlIGNvb3JkcyBhbmQgYW5jaG9yc1xyXG4gICAgbGV0IGxlZnQgPSBvcHRpb25zLnggfHwgc2hhcGUubGVmdDtcclxuICAgIGxldCB0b3AgPSBvcHRpb25zLnkgfHwgc2hhcGUudG9wO1xyXG4gICAgdGhpcy5zaGFwZS5zZXQoJ2xlZnQnLCBsZWZ0KTtcclxuICAgIHRoaXMuc2hhcGUuc2V0KCd0b3AnLCB0b3ApO1xyXG4gICAgdGhpcy5zaGFwZS5zZXRDb29yZHMoKTtcclxuICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbigpO1xyXG4gICAgdGhpcy5zaGFwZS5maXJlKG9wdGlvbnMubW92aW5nID8gJ21vdmluZycgOiAnbW92ZWQnKTtcclxuXHJcbiAgICAvLyBQcmV2ZW50IExpbmthYmxlU2hhcGUgdG8gb3ZlcmxhcCB3aXRoIGVhY2ggb3RoZXJcclxuICAgIGNvbnN0IGNsZWFyYW5jZSA9IDEwO1xyXG4gICAgc2hhcGUuc2V0Q29vcmRzKCk7IC8vIFNldHMgY29ybmVyIHBvc2l0aW9uIGNvb3JkaW5hdGVzIGJhc2VkIG9uIGN1cnJlbnQgYW5nbGUsIHdpZHRoIGFuZCBoZWlnaHRcclxuICAgIGxldCBpc0ludGVyc2VjdGluZyA9IGZhbHNlO1xyXG4gICAgaWYgKCFvcHRpb25zLnNraXBDb2xsaXNpb24pIHtcclxuICAgICAgY29uc3Qgb3RoZXJTaGFwZXMgPSBPYmplY3QudmFsdWVzKGNhbnZhcy5saW5rYWJsZVNoYXBlcyk7XHJcbiAgICAgIGZvciAobGV0IG8gPSAwOyBvIDwgb3RoZXJTaGFwZXMubGVuZ3RoOyBvICs9IDEpIHtcclxuICAgICAgICBjb25zdCB0YXJnID0gb3RoZXJTaGFwZXNbb10uc2hhcGU7XHJcblxyXG4gICAgICAgIGlmICh0YXJnICE9PSBzaGFwZSkge1xyXG4gICAgICAgICAgaWYgKHNoYXBlLmludGVyc2VjdHNXaXRoT2JqZWN0KHRhcmcpKSB7XHJcbiAgICAgICAgICAgIGlzSW50ZXJzZWN0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29uc3Qgc0IgPSBzaGFwZS5hQ29vcmRzLmJsLnk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNUID0gc2hhcGUuYUNvb3Jkcy50bC55O1xyXG4gICAgICAgICAgICBjb25zdCBzUiA9IHNoYXBlLmFDb29yZHMudHIueDtcclxuICAgICAgICAgICAgY29uc3Qgc0wgPSBzaGFwZS5hQ29vcmRzLnRsLng7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0QiA9IHRhcmcuYUNvb3Jkcy5ibC55O1xyXG4gICAgICAgICAgICBjb25zdCB0VCA9IHRhcmcuYUNvb3Jkcy50bC55O1xyXG4gICAgICAgICAgICBjb25zdCB0UiA9IHRhcmcuYUNvb3Jkcy50ci54O1xyXG4gICAgICAgICAgICBjb25zdCB0TCA9IHRhcmcuYUNvb3Jkcy50bC54O1xyXG5cclxuICAgICAgICAgICAgaWYgKHNCIC0gdFQgPiBjbGVhcmFuY2UpIHtcclxuICAgICAgICAgICAgICB0b3AgPSB0VCAtIHNoYXBlLmhlaWdodCAtIGNsZWFyYW5jZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzVCAtIHRCIDwgY2xlYXJhbmNlKSB7XHJcbiAgICAgICAgICAgICAgdG9wID0gdEIgKyBjbGVhcmFuY2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc1IgLSB0TCA+IGNsZWFyYW5jZSkge1xyXG4gICAgICAgICAgICAgIGxlZnQgPSB0TCAtIHNoYXBlLndpZHRoIC0gY2xlYXJhbmNlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNMIC0gdFIgPCBjbGVhcmFuY2UpIHtcclxuICAgICAgICAgICAgICBsZWZ0ID0gdFIgKyBjbGVhcmFuY2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgaXRlcmF0aW9uID0gaXRlciB8fCAwO1xyXG4gICAgaWYgKGlzSW50ZXJzZWN0aW5nICYmIGl0ZXJhdGlvbiA8IDEwMCkge1xyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cclxuICAgICAgaXRlcmF0aW9uICs9IDE7XHJcbiAgICAgIHRoaXMubW92ZSh7XHJcbiAgICAgICAgeDogbGVmdCxcclxuICAgICAgICB5OiB0b3AsXHJcbiAgICAgICAgbW92aW5nOiBvcHRpb25zLm1vdmluZyxcclxuICAgICAgfSwgaXRlcmF0aW9uKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJvdGF0ZShhbmdsZSkge1xyXG4gICAgdGhpcy5zaGFwZS5yb3RhdGUoYW5nbGUpO1xyXG4gICAgdGhpcy5zaGFwZS5zZXRDb29yZHMoKTtcclxuICAgIHRoaXMucmVmcmVzaEFuY2hvcnNQb3NpdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgcmVmcmVzaEFuY2hvcnNQb3NpdGlvbihjb21taXQpIHtcclxuICAgIE9iamVjdC5rZXlzKHRoaXMuYW5jaG9ycykuZm9yRWFjaCgoY2FyZGluYWwpID0+IHtcclxuICAgICAgdGhpcy5fc2V0QW5jaG9yUG9zaXRpb25SZWxhdGl2ZVRvUmVjdGFuZ2xlKGNhcmRpbmFsLCBjb21taXQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVBbmNob3JzT3BhY2l0eShvcGFjaXR5KSB7XHJcbiAgICBPYmplY3Qua2V5cyh0aGlzLmFuY2hvcnMpLmZvckVhY2goKGNhcmRpbmFsKSA9PiB7XHJcbiAgICAgIHRoaXMuYW5jaG9yc1tjYXJkaW5hbF0udG9nZ2xlT3BhY2l0eShvcGFjaXR5KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYnJpbmdUb0Zyb250KCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBjYW52YXMsIHNoYXBlLCBtb2RCb3gsIGFuY2hvcnMsXHJcbiAgICB9ID0gdGhpcztcclxuICAgIHNoYXBlLmJyaW5nVG9Gcm9udCgpO1xyXG4gICAgbW9kQm94LmJyaW5nVG9Gcm9udCgpO1xyXG4gICAgT2JqZWN0LmtleXMoYW5jaG9ycykuZm9yRWFjaCgoY2FyZGluYWwpID0+IHtcclxuICAgICAgY2FudmFzLmJyaW5nVG9Gcm9udChhbmNob3JzW2NhcmRpbmFsXSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIF9zZXRBbmNob3JQb3NpdGlvblJlbGF0aXZlVG9SZWN0YW5nbGUoY2FyZGluYWwsIGNvbW1pdCkge1xyXG4gICAgbGV0IGxlZnQ7XHJcbiAgICBsZXQgdG9wO1xyXG4gICAgY29uc3QgeyBzaGFwZSB9ID0gdGhpcztcclxuICAgIGNvbnN0IGFwID0gdGhpcy5hbmNob3JzW2NhcmRpbmFsXTtcclxuICAgIHN3aXRjaCAoY2FyZGluYWwpIHtcclxuICAgICAgY2FzZSAnZWFzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMudHIueCArIHNoYXBlLmFDb29yZHMuYnIueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLnRyLnkgKyBzaGFwZS5hQ29vcmRzLmJyLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICd3ZXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSAoc2hhcGUuYUNvb3Jkcy50bC54ICsgc2hhcGUuYUNvb3Jkcy5ibC54KSAvIDI7XHJcbiAgICAgICAgdG9wID0gKHNoYXBlLmFDb29yZHMudGwueSArIHNoYXBlLmFDb29yZHMuYmwueSkgLyAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRoJzoge1xyXG4gICAgICAgIGxlZnQgPSAoc2hhcGUuYUNvb3Jkcy50bC54ICsgc2hhcGUuYUNvb3Jkcy50ci54KSAvIDI7XHJcbiAgICAgICAgdG9wID0gKHNoYXBlLmFDb29yZHMudGwueSArIHNoYXBlLmFDb29yZHMudHIueSkgLyAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRoJzoge1xyXG4gICAgICAgIGxlZnQgPSAoc2hhcGUuYUNvb3Jkcy5ibC54ICsgc2hhcGUuYUNvb3Jkcy5ici54KSAvIDI7XHJcbiAgICAgICAgdG9wID0gKHNoYXBlLmFDb29yZHMuYmwueSArIHNoYXBlLmFDb29yZHMuYnIueSkgLyAyO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ25vcnRoZWFzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gc2hhcGUuYUNvb3Jkcy50ci54O1xyXG4gICAgICAgIHRvcCA9IHNoYXBlLmFDb29yZHMudHIueTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aHdlc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IHNoYXBlLmFDb29yZHMudGwueDtcclxuICAgICAgICB0b3AgPSBzaGFwZS5hQ29vcmRzLnRsLnk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnc291dGhlYXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSBzaGFwZS5hQ29vcmRzLmJyLng7XHJcbiAgICAgICAgdG9wID0gc2hhcGUuYUNvb3Jkcy5ici55O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRod2VzdCc6XHJcbiAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICBsZWZ0ID0gc2hhcGUuYUNvb3Jkcy5ibC54O1xyXG4gICAgICAgIHRvcCA9IHNoYXBlLmFDb29yZHMuYmwueTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgYXAubGVmdCA9IGxlZnQ7XHJcbiAgICBhcC50b3AgPSB0b3A7XHJcbiAgICBhcC5zZXRDb29yZHMoKTtcclxuXHJcbiAgICBhcC5maXJlKGNvbW1pdCA/ICdwZzpwb3NpdGlvbjptb2RpZmllZCcgOiAncGc6cG9zaXRpb246bW9kaWZ5aW5nJyk7XHJcbiAgfVxyXG5cclxuICBfbWFrZUFuY2hvclBvaW50KGNhcmRpbmFsKSB7XHJcbiAgICBsZXQgbGVmdDtcclxuICAgIGxldCB0b3A7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHNoYXBlLFxyXG4gICAgICBpZCxcclxuICAgICAgY2FudmFzLFxyXG4gICAgfSA9IHRoaXM7XHJcbiAgICBzd2l0Y2ggKGNhcmRpbmFsKSB7XHJcbiAgICAgIGNhc2UgJ2Vhc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IChzaGFwZS5hQ29vcmRzLnRyLnggKyBzaGFwZS5hQ29vcmRzLmJyLngpIC8gMjtcclxuICAgICAgICB0b3AgPSAoc2hhcGUuYUNvb3Jkcy50ci55ICsgc2hhcGUuYUNvb3Jkcy5ici55KSAvIDI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnd2VzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMudGwueCArIHNoYXBlLmFDb29yZHMuYmwueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLnRsLnkgKyBzaGFwZS5hQ29vcmRzLmJsLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMudGwueCArIHNoYXBlLmFDb29yZHMudHIueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLnRsLnkgKyBzaGFwZS5hQ29vcmRzLnRyLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aCc6IHtcclxuICAgICAgICBsZWZ0ID0gKHNoYXBlLmFDb29yZHMuYmwueCArIHNoYXBlLmFDb29yZHMuYnIueCkgLyAyO1xyXG4gICAgICAgIHRvcCA9IChzaGFwZS5hQ29vcmRzLmJsLnkgKyBzaGFwZS5hQ29vcmRzLmJyLnkpIC8gMjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdub3J0aGVhc3QnOiB7XHJcbiAgICAgICAgbGVmdCA9IHNoYXBlLmFDb29yZHMudHIueDtcclxuICAgICAgICB0b3AgPSBzaGFwZS5hQ29vcmRzLnRyLnk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnbm9ydGh3ZXN0Jzoge1xyXG4gICAgICAgIGxlZnQgPSBzaGFwZS5hQ29vcmRzLnRsLng7XHJcbiAgICAgICAgdG9wID0gc2hhcGUuYUNvb3Jkcy50bC55O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3NvdXRoZWFzdCc6IHtcclxuICAgICAgICBsZWZ0ID0gc2hhcGUuYUNvb3Jkcy5ici54O1xyXG4gICAgICAgIHRvcCA9IHNoYXBlLmFDb29yZHMuYnIueTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdzb3V0aHdlc3QnOlxyXG4gICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgbGVmdCA9IHNoYXBlLmFDb29yZHMuYmwueDtcclxuICAgICAgICB0b3AgPSBzaGFwZS5hQ29vcmRzLmJsLnk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBjb25zdCBhcCA9IG5ldyBmYWJyaWMuQ2lyY2xlKHtcclxuICAgIC8vICAgb2JqZWN0Q2FjaGluZzogZmFsc2UsXHJcbiAgICAvLyAgIGxlZnQsXHJcbiAgICAvLyAgIHRvcCxcclxuICAgIC8vICAgc3Ryb2tlV2lkdGg6IDIsXHJcbiAgICAvLyAgIHJhZGl1czogNixcclxuICAgIC8vICAgZmlsbDogJyM3OGJlZmEnLCAvLyA0MmEyZGEgZDVlOGYyXHJcbiAgICAvLyAgIHN0cm9rZTogJyM3OGJlZmEnLFxyXG4gICAgLy8gICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgIC8vICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAvLyAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgLy8gICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAvLyAgIHNlbGVjdGFibGU6IGZhbHNlLFxyXG4gICAgLy8gICBvcGFjaXR5OiAwLFxyXG4gICAgLy8gICBpZDogYCR7aWR9XyR7Y2FyZGluYWx9YCxcclxuICAgIC8vIH0pO1xyXG4gICAgY29uc3QgYXAgPSBuZXcgZmFicmljLlJlY3Qoe1xyXG4gICAgICBvYmplY3RDYWNoaW5nOiBmYWxzZSxcclxuICAgICAgd2lkdGg6IDEwLFxyXG4gICAgICBoZWlnaHQ6IDEwLFxyXG4gICAgICBsZWZ0LFxyXG4gICAgICB0b3AsXHJcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxyXG4gICAgICBmaWxsOiAnI2RkZCcsXHJcbiAgICAgIHN0cm9rZTogJyM5OTknLFxyXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcclxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgIGhhc0JvcmRlcnM6IGZhbHNlLFxyXG4gICAgICBoYXNDb250cm9sczogZmFsc2UsXHJcbiAgICAgIHNlbGVjdGFibGU6IGZhbHNlLFxyXG4gICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICBpZDogYCR7aWR9XyR7Y2FyZGluYWx9YCxcclxuICAgIH0pO1xyXG4gICAgYXAudHlwZSA9ICdhbmNob3InO1xyXG4gICAgYXAuc2hhcGVJZCA9IGlkO1xyXG4gICAgYXAuY2FyZGluYWwgPSBjYXJkaW5hbDtcclxuICAgIGFwLm9uKCdtb3VzZW92ZXInLCAoKSA9PiB7XHJcbiAgICAgIGFwLnNldCgnZmlsbCcsICcjNzhiZWZhJyk7XHJcbiAgICAgIGFwLnNldCgnc3Ryb2tlJywgJyM3OGJlZmEnKTtcclxuICAgICAgY2FudmFzLnJlbmRlckFsbCgpO1xyXG4gICAgfSk7XHJcbiAgICBhcC5vbignbW91c2VvdXQnLCAoKSA9PiB7XHJcbiAgICAgIGFwLnNldCgnZmlsbCcsICcjZGRkJyk7XHJcbiAgICAgIGFwLnNldCgnc3Ryb2tlJywgJyM5OTknKTtcclxuICAgICAgY2FudmFzLnJlbmRlckFsbCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYXAub24oJ21vdXNlZG93bicsIChvcHRpb25zKSA9PiB7XHJcbiAgICAgIHN3aXRjaCAob3B0aW9ucy5idXR0b24pIHtcclxuICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICB0aGlzLl9vbkFuY2hvclJpZ2h0Q2xpY2suY2FsbCh0aGlzLCBvcHRpb25zKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgIHRoaXMuX29uQW5jaG9yTWlkZGxlQ2xpY2suY2FsbCh0aGlzLCBvcHRpb25zKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTpcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgdGhpcy5fb25BbmNob3JMZWZ0Q2xpY2suY2FsbCh0aGlzLCBvcHRpb25zKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBhcDtcclxuICB9XHJcblxyXG4gIC8vIFNob3VsZCBiZSBpbXBsZW1lbnRlZCBieSBFeHRlbmRpbmcgQ2xhc3Nlc1xyXG4gIC8qIGVzbGludC1kaXNhYmxlIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXMgKi9cclxuICBfb25BbmNob3JMZWZ0Q2xpY2soLyogb3B0aW9ucyAqLykge31cclxuXHJcbiAgX29uQW5jaG9yTWlkZGxlQ2xpY2soLyogb3B0aW9ucyAqLykge31cclxuXHJcbiAgX29uQW5jaG9yUmlnaHRDbGljaygvKiBvcHRpb25zICovKSB7fVxyXG5cclxuICAvKiBlc2xpbnQtZGlzYWJsZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzICovXHJcbn1cclxuIiwiaW1wb3J0IEV4cGFuZGFibGVDb250YWluZXIgZnJvbSAnLi9FeHBhbmRhYmxlQ29udGFpbmVyLmpzJztcclxuaW1wb3J0IEN1cnZlZExpbmsgZnJvbSAnLi9DdXJ2ZWRMaW5rLmpzJztcclxuXHJcbmNvbnN0IHsgZmFicmljLCBfIH0gPSB3aW5kb3c7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9jZXNzR3JhcGgge1xyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQHBhcmFtIG9wdGlvbnNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Q2FudmFzfSBvcHRpb25zLmNhbnZhcyAtIEZhYnJpY0pTLkNhbnZhcyBpbnN0YW5jZSAtIG1hbmRhdG9yeSBpZiBvcHRpb25zLmNhbnZhc09wdHMgbm90IHByb3ZpZGVkLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuY2FudmFzT3B0cyAtIEZhYnJpY0pTLkNhbnZhcyNpbml0aWFsaXplIHBhcmFtZXRlcnMgLSBtYW5kYXRvcnkgaWYgb3B0aW9ucy5jYW52YXMgbm90IHByb3ZpZGVkXHJcbiAgICogICAgICAgICAgICAgICAgIFNlZSBodHRwOi8vZmFicmljanMuY29tL2RvY3MvZmFicmljLkNhbnZhcy5odG1sI2luaXRpYWxpemUgZm9yIGRldGFpbHNcclxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fFN0cmluZ30gb3B0aW9ucy5jYW52YXMuZWwgLSA8Y2FudmFzPiBlbGVtZW50IHRvIGluaXRpYWxpemUgaW5zdGFuY2Ugb25cclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5jYW52YXMub3B0aW9ucyAtIE9wdGlvbnMgb2JqZWN0XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZ3JpZF0gLSBkaW1lbnNpb25zIG9mIHRoZSBncmlkXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgdGhpcy5oYW5kbGVycyA9IHtcclxuICAgICAgZ3JpZDoge30sXHJcbiAgICB9O1xyXG4gICAgdGhpcy5kcmFnR2hvc3RPYmplY3QgPSBudWxsO1xyXG4gICAgdGhpcy5kcmFnR2hvc3RMaW5rRWFzdCA9IG51bGw7XHJcbiAgICB0aGlzLmRyYWdHaG9zdExpbmtXZXN0ID0gbnVsbDtcclxuICAgIHRoaXMuc2VsZWN0ZWRDaG9vc2VyVHlwZSA9IG51bGw7XHJcblxyXG4gICAgLy8gSW5pdGlhbGl6ZSBDYW52YXNcclxuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuY2FudmFzID0gb3B0aW9ucy5jYW52YXMgPyBvcHRpb25zLmNhbnZhcyA6IG5ldyBmYWJyaWMuQ2FudmFzKG9wdGlvbnMuY2FudmFzT3B0cy5lbCwgb3B0aW9ucy5jYW52YXNPcHRzLm9wdGlvbnMpO1xyXG4gICAgY2FudmFzLnNldCgncHJlc2VydmVPYmplY3RTdGFja2luZycsIHRydWUpO1xyXG4gICAgLy8gY2FudmFzLnNldCgncmVuZGVyT25BZGRSZW1vdmUnLCBmYWxzZSk7XHJcbiAgICBjYW52YXMuc2V0KCdmaXJlUmlnaHRDbGljaycsIHRydWUpO1xyXG4gICAgY2FudmFzLnNldCgnZmlyZU1pZGRsZUNsaWNrJywgdHJ1ZSk7XHJcbiAgICBjYW52YXMuc2V0KCdzdG9wQ29udGV4dE1lbnUnLCB0cnVlKTtcclxuICAgIGNhbnZhcy5saW5rYWJsZVNoYXBlcyA9IHt9O1xyXG4gICAgY2FudmFzLmxpbmtzID0ge307XHJcblxyXG4gICAgLy8gU2V0IGdyaWRcclxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5ncmlkID09PSAnbnVtYmVyJykge1xyXG4gICAgICB0aGlzLnNldEdyaWQoe1xyXG4gICAgICAgIGdyaWQ6IG9wdGlvbnMuZ3JpZCxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZmFicmljLk9iamVjdC5wcm90b3R5cGUub3JpZ2luWCA9IGZhYnJpYy5PYmplY3QucHJvdG90eXBlLm9yaWdpblkgPSAnY2VudGVyJztcclxuICAgIGZhYnJpYy5PYmplY3QucHJvdG90eXBlLnRvZ2dsZU9wYWNpdHkgPSBmdW5jdGlvbiB0b2dnbGVPcGFjaXR5KG9wYWNpdHkvKiAsIHRpbWVvdXQgKi8pIHtcclxuICAgICAgLy8gdGhpcy5hbmltYXRlKCdvcGFjaXR5Jywgb3BhY2l0eSwge1xyXG4gICAgICAvLyAgIGR1cmF0aW9uOiB0aW1lb3V0ICE9PSB1bmRlZmluZWQgPyB0aW1lb3V0IDogMzAwLFxyXG4gICAgICAvLyAgIG9uQ2hhbmdlOiB0aGlzLmNhbnZhcy5yZW5kZXJBbGwuYmluZCh0aGlzLmNhbnZhcyksXHJcbiAgICAgIC8vIH0pO1xyXG4gICAgICB0aGlzLnNldCgnb3BhY2l0eScsIG9wYWNpdHkpO1xyXG4gICAgICB0aGlzLmNhbnZhcy5yZW5kZXJBbGwoKTtcclxuICAgIH07XHJcblxyXG4gICAgY2FudmFzLmNhbGNPZmZzZXQoKTtcclxuXHJcbiAgICAvLyBQcmV2ZW50IG5vbiBMaW5rYWJsZVNoYXBlIG9iamVjdHMgdG8gYmUgZ3JvdXBlZCBkdXJpbmcgc2VsZWN0aW9uXHJcbiAgICBjb25zdCBvblNlbGVjdGlvbiA9ICgpID0+IHtcclxuICAgICAgY29uc3QgYWN0aXZlID0gY2FudmFzLmdldEFjdGl2ZU9iamVjdCgpO1xyXG4gICAgICAvLyBXaGVuIG11bHRpIHNlbGVjdGlvbiwgcmVtb3ZlIGFueSBub24gTGlua2FibGUgU2hhcGUgb2JqZWN0c1xyXG4gICAgICBpZiAoYWN0aXZlLnR5cGUgPT09ICdhY3RpdmVTZWxlY3Rpb24nKSB7XHJcbiAgICAgICAgY29uc3Qgb2JqZWN0cyA9IGFjdGl2ZS5nZXRPYmplY3RzKCk7XHJcbiAgICAgICAgaWYgKG9iamVjdHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgY29uc3Qgb25seVJlY3QgPSBvYmplY3RzLmZpbHRlcigobykgPT4gby50eXBlID09PSAnbGlua2FibGVTaGFwZScpO1xyXG4gICAgICAgICAgY2FudmFzLl9kaXNjYXJkQWN0aXZlT2JqZWN0KCk7XHJcbiAgICAgICAgICBjb25zdCBzZWwgPSBuZXcgZmFicmljLkFjdGl2ZVNlbGVjdGlvbihvbmx5UmVjdCwge1xyXG4gICAgICAgICAgICBjYW52YXMsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGNhbnZhcy5fc2V0QWN0aXZlT2JqZWN0KHNlbCk7XHJcblxyXG4gICAgICAgICAgLy8gVXBkYXRlIGFueSBsaW5rcyBjb25uZWN0ZWQgdG8gdGhlIExpbmthYmxlIFNoYXBlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNhbnZhcy5vbih7XHJcbiAgICAgICdzZWxlY3Rpb246Y3JlYXRlZCc6IG9uU2VsZWN0aW9uLFxyXG4gICAgICAnc2VsZWN0aW9uOnVwZGF0ZWQnOiBvblNlbGVjdGlvbixcclxuICAgICAgZHJhZ2VudGVyOiB0aGlzLm9uRHJhZ0VudGVyLmJpbmQodGhpcyksXHJcbiAgICAgIGRyYWdvdmVyOiB0aGlzLm9uRHJhZ092ZXIuYmluZCh0aGlzKSxcclxuICAgICAgZHJhZ2xlYXZlOiB0aGlzLm9uRHJhZ0xlYXZlLmJpbmQodGhpcyksXHJcbiAgICAgIGRyb3A6IHRoaXMub25Ecm9wLmJpbmQodGhpcyksXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCBjYW52YXMgdG8gaGF2ZSBhIGdyaWQuXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcclxuICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5ncmlkIC0gZ3JpZCBzcGFjaW5nIChwaXhlbHMpXHJcbiAgICovXHJcbiAgc2V0R3JpZChvcHRpb25zKSB7XHJcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZ3JpZCAhPT0gJ251bWJlcicgfHwgb3B0aW9ucy5ncmlkIDwgMCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnQgXCJncmlkXCIgaW4gUHJvY2Vzc0dyYXAjc2V0R3JpZC4gKHJlcXVpcmVkOiBOdW1iZXIgPiAwKScpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZ3JpZCA9IG9wdGlvbnMuZ3JpZDtcclxuICAgIGNvbnN0IHsgY2FudmFzIH0gPSB0aGlzO1xyXG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tbXVsdGktc3RyICovXHJcbiAgICBjb25zdCBkYXRhID0gYDxzdmcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj4gXFxcclxuICAgICAgICA8ZGVmcz4gXFxcclxuICAgICAgICAgICAgPHBhdHRlcm4gaWQ9XCJzbWFsbEdyaWRcIiB3aWR0aD1cIiR7dGhpcy5ncmlkfVwiIGhlaWdodD1cIiR7dGhpcy5ncmlkfVwiIHBhdHRlcm5Vbml0cz1cInVzZXJTcGFjZU9uVXNlXCI+IFxcXHJcbiAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTSAke3RoaXMuZ3JpZH0gMCBMIDAgMCAwICR7dGhpcy5ncmlkfVwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiZ3JheVwiIHN0cm9rZS13aWR0aD1cIjAuNVwiIC8+IFxcXHJcbiAgICAgICAgICAgIDwvcGF0dGVybj4gXFxcclxuICAgICAgICAgICAgPHBhdHRlcm4gaWQ9XCJncmlkXCIgd2lkdGg9XCIke3RoaXMuZ3JpZCAqIDV9XCIgaGVpZ2h0PVwiJHt0aGlzLmdyaWQgKiA1fVwiIHBhdHRlcm5Vbml0cz1cInVzZXJTcGFjZU9uVXNlXCI+IFxcXHJcbiAgICAgICAgICAgICAgICA8cmVjdCB3aWR0aD1cIiR7dGhpcy5ncmlkICogNX1cIiBoZWlnaHQ9XCIke3RoaXMuZ3JpZCAqIDV9XCIgZmlsbD1cInVybCgjc21hbGxHcmlkKVwiIC8+IFxcXHJcbiAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTSAke3RoaXMuZ3JpZCAqIDV9IDAgTCAwIDAgMCAke3RoaXMuZ3JpZCAqIDV9XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJncmF5XCIgc3Ryb2tlLXdpZHRoPVwiMVwiIC8+IFxcXHJcbiAgICAgICAgICAgIDwvcGF0dGVybj4gXFxcclxuICAgICAgICA8L2RlZnM+IFxcXHJcbiAgICAgICAgPHJlY3Qgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIGZpbGw9XCJ1cmwoI2dyaWQpXCIgLz4gXFxcclxuICAgIDwvc3ZnPmA7XHJcbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLW11bHRpLXN0ciAqL1xyXG5cclxuICAgIGNvbnN0IERPTVVSTCA9IHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTCB8fCB3aW5kb3c7XHJcbiAgICBjb25zdCBzdmcgPSBuZXcgQmxvYihbZGF0YV0sIHsgdHlwZTogJ2ltYWdlL3N2Zyt4bWw7Y2hhcnNldD11dGYtOCcgfSk7XHJcbiAgICBjb25zdCB1cmwgPSBET01VUkwuY3JlYXRlT2JqZWN0VVJMKHN2Zyk7XHJcbiAgICBmYWJyaWMudXRpbC5sb2FkSW1hZ2UodXJsLCAoaW1nKSA9PiB7XHJcbiAgICAgIGNvbnN0IGJnID0gbmV3IGZhYnJpYy5SZWN0KHtcclxuICAgICAgICB3aWR0aDogY2FudmFzLndpZHRoLCBoZWlnaHQ6IGNhbnZhcy5oZWlnaHQsIGV2ZW50ZWQ6IGZhbHNlLCBzZWxlY3RhYmxlOiBmYWxzZSxcclxuICAgICAgfSk7XHJcbiAgICAgIGJnLmZpbGwgPSBuZXcgZmFicmljLlBhdHRlcm4oeyBzb3VyY2U6IGltZyB9LFxyXG4gICAgICAgICgoKSA9PiB7IGJnLmRpcnR5ID0gdHJ1ZTsgY2FudmFzLnJlcXVlc3RSZW5kZXJBbGwoKTsgfSkpO1xyXG4gICAgICBiZy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICAgIGNhbnZhcy5zZXQoJ2JhY2tncm91bmRJbWFnZScsIGJnKTtcclxuXHJcbiAgICAgIC8vIFNuYXAgdG8gZ3JpZCBlZmZlY3RzXHJcbiAgICAgIGNhbnZhcy5vZmYodGhpcy5oYW5kbGVycy5ncmlkKTtcclxuICAgICAgdGhpcy5oYW5kbGVycy5ncmlkID0ge1xyXG4gICAgICAgICdvYmplY3Q6bW92aW5nJzogKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB7IGdyaWQgfSA9IHRoaXM7XHJcbiAgICAgICAgICBjb25zdCBzaGFwZSA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICAgIGlmIChzaGFwZS50eXBlICE9PSAnbGlua2FibGVTaGFwZScpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNhbnZhcy5saW5rYWJsZVNoYXBlc1tzaGFwZS5pZF0ubW92ZSh7XHJcbiAgICAgICAgICAgIHg6IE1hdGgucm91bmQoc2hhcGUubGVmdCAvIGdyaWQpICogZ3JpZCxcclxuICAgICAgICAgICAgeTogTWF0aC5yb3VuZChzaGFwZS50b3AgLyBncmlkKSAqIGdyaWQsXHJcbiAgICAgICAgICAgIG1vdmluZzogdHJ1ZSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJ29iamVjdDpzY2FsaW5nJzogKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB7IGdyaWQgfSA9IHRoaXM7XHJcbiAgICAgICAgICBjb25zdCB7IHRhcmdldCB9ID0gZXZlbnQ7XHJcblxyXG4gICAgICAgICAgaWYgKHRhcmdldC50eXBlICE9PSAnbGlua2FibGVTaGFwZScpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnN0IHcgPSB0YXJnZXQud2lkdGggKiB0YXJnZXQuc2NhbGVYO1xyXG4gICAgICAgICAgY29uc3QgaCA9IHRhcmdldC5oZWlnaHQgKiB0YXJnZXQuc2NhbGVZO1xyXG4gICAgICAgICAgY29uc3Qgc25hcCA9IHsgLy8gQ2xvc2VzdCBzbmFwcGluZyBwb2ludHNcclxuICAgICAgICAgICAgdG9wOiBNYXRoLnJvdW5kKHRhcmdldC50b3AgLyBncmlkKSAqIGdyaWQsXHJcbiAgICAgICAgICAgIGxlZnQ6IE1hdGgucm91bmQodGFyZ2V0LmxlZnQgLyBncmlkKSAqIGdyaWQsXHJcbiAgICAgICAgICAgIGJvdHRvbTogTWF0aC5yb3VuZCgodGFyZ2V0LnRvcCArIGgpIC8gZ3JpZCkgKiBncmlkLFxyXG4gICAgICAgICAgICByaWdodDogTWF0aC5yb3VuZCgodGFyZ2V0LmxlZnQgKyB3KSAvIGdyaWQpICogZ3JpZCxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBjb25zdCB0aHJlc2hvbGQgPSBncmlkO1xyXG4gICAgICAgICAgY29uc3QgZGlzdCA9IHsgLy8gRGlzdGFuY2UgZnJvbSBzbmFwcGluZyBwb2ludHNcclxuICAgICAgICAgICAgdG9wOiBNYXRoLmFicyhzbmFwLnRvcCAtIHRhcmdldC50b3ApLFxyXG4gICAgICAgICAgICBsZWZ0OiBNYXRoLmFicyhzbmFwLmxlZnQgLSB0YXJnZXQubGVmdCksXHJcbiAgICAgICAgICAgIGJvdHRvbTogTWF0aC5hYnMoc25hcC5ib3R0b20gLSB0YXJnZXQudG9wIC0gaCksXHJcbiAgICAgICAgICAgIHJpZ2h0OiBNYXRoLmFicyhzbmFwLnJpZ2h0IC0gdGFyZ2V0LmxlZnQgLSB3KSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBjb25zdCBhdHRycyA9IHtcclxuICAgICAgICAgICAgc2NhbGVYOiB0YXJnZXQuc2NhbGVYLFxyXG4gICAgICAgICAgICBzY2FsZVk6IHRhcmdldC5zY2FsZVksXHJcbiAgICAgICAgICAgIHRvcDogdGFyZ2V0LnRvcCxcclxuICAgICAgICAgICAgbGVmdDogdGFyZ2V0LmxlZnQsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgc3dpdGNoICh0YXJnZXQuX19jb3JuZXIpIHtcclxuICAgICAgICAgICAgY2FzZSAndGwnOlxyXG4gICAgICAgICAgICAgIGlmIChkaXN0LmxlZnQgPCBkaXN0LnRvcCAmJiBkaXN0LmxlZnQgPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWCA9ICh3IC0gKHNuYXAubGVmdCAtIHRhcmdldC5sZWZ0KSkgLyB0YXJnZXQud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoYXR0cnMuc2NhbGVYIC8gdGFyZ2V0LnNjYWxlWCkgKiB0YXJnZXQuc2NhbGVZO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMudG9wID0gdGFyZ2V0LnRvcCArIChoIC0gdGFyZ2V0LmhlaWdodCAqIGF0dHJzLnNjYWxlWSk7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5sZWZ0ID0gc25hcC5sZWZ0O1xyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlzdC50b3AgPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWSA9IChoIC0gKHNuYXAudG9wIC0gdGFyZ2V0LnRvcCkpIC8gdGFyZ2V0LmhlaWdodDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWCA9IChhdHRycy5zY2FsZVkgLyB0YXJnZXQuc2NhbGVZKSAqIHRhcmdldC5zY2FsZVg7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5sZWZ0ICs9ICh3IC0gdGFyZ2V0LndpZHRoICogYXR0cnMuc2NhbGVYKTtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnRvcCA9IHNuYXAudG9wO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbXQnOlxyXG4gICAgICAgICAgICAgIGlmIChkaXN0LnRvcCA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVZID0gKGggLSAoc25hcC50b3AgLSB0YXJnZXQudG9wKSkgLyB0YXJnZXQuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgYXR0cnMudG9wID0gc25hcC50b3A7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd0cic6XHJcbiAgICAgICAgICAgICAgaWYgKGRpc3QucmlnaHQgPCBkaXN0LnRvcCAmJiBkaXN0LnJpZ2h0IDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVggPSAoc25hcC5yaWdodCAtIHRhcmdldC5sZWZ0KSAvIHRhcmdldC53aWR0aDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWSA9IChhdHRycy5zY2FsZVggLyB0YXJnZXQuc2NhbGVYKSAqIHRhcmdldC5zY2FsZVk7XHJcbiAgICAgICAgICAgICAgICBhdHRycy50b3AgPSB0YXJnZXQudG9wICsgKGggLSB0YXJnZXQuaGVpZ2h0ICogYXR0cnMuc2NhbGVZKTtcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRpc3QudG9wIDwgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoaCAtIChzbmFwLnRvcCAtIHRhcmdldC50b3ApKSAvIHRhcmdldC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVggPSAoYXR0cnMuc2NhbGVZIC8gdGFyZ2V0LnNjYWxlWSkgKiB0YXJnZXQuc2NhbGVYO1xyXG4gICAgICAgICAgICAgICAgYXR0cnMudG9wID0gc25hcC50b3A7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtbCc6XHJcbiAgICAgICAgICAgICAgaWYgKGRpc3QubGVmdCA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVYID0gKHcgLSAoc25hcC5sZWZ0IC0gdGFyZ2V0LmxlZnQpKSAvIHRhcmdldC53aWR0aDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLmxlZnQgPSBzbmFwLmxlZnQ7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtcic6XHJcbiAgICAgICAgICAgICAgaWYgKGRpc3QucmlnaHQgPCB0aHJlc2hvbGQpIGF0dHJzLnNjYWxlWCA9IChzbmFwLnJpZ2h0IC0gdGFyZ2V0LmxlZnQpIC8gdGFyZ2V0LndpZHRoO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdibCc6XHJcbiAgICAgICAgICAgICAgaWYgKGRpc3QubGVmdCA8IGRpc3QuYm90dG9tICYmIGRpc3QubGVmdCA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVYID0gKHcgLSAoc25hcC5sZWZ0IC0gdGFyZ2V0LmxlZnQpKSAvIHRhcmdldC53aWR0aDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWSA9IChhdHRycy5zY2FsZVggLyB0YXJnZXQuc2NhbGVYKSAqIHRhcmdldC5zY2FsZVk7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5sZWZ0ID0gc25hcC5sZWZ0O1xyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlzdC5ib3R0b20gPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWSA9IChzbmFwLmJvdHRvbSAtIHRhcmdldC50b3ApIC8gdGFyZ2V0LmhlaWdodDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWCA9IChhdHRycy5zY2FsZVkgLyB0YXJnZXQuc2NhbGVZKSAqIHRhcmdldC5zY2FsZVg7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5sZWZ0ICs9ICh3IC0gdGFyZ2V0LndpZHRoICogYXR0cnMuc2NhbGVYKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ21iJzpcclxuICAgICAgICAgICAgICBpZiAoZGlzdC5ib3R0b20gPCB0aHJlc2hvbGQpIGF0dHJzLnNjYWxlWSA9IChzbmFwLmJvdHRvbSAtIHRhcmdldC50b3ApIC8gdGFyZ2V0LmhlaWdodDtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYnInOlxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgIGlmIChkaXN0LnJpZ2h0IDwgZGlzdC5ib3R0b20gJiYgZGlzdC5yaWdodCA8IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMuc2NhbGVYID0gKHNuYXAucmlnaHQgLSB0YXJnZXQubGVmdCkgLyB0YXJnZXQud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5zY2FsZVkgPSAoYXR0cnMuc2NhbGVYIC8gdGFyZ2V0LnNjYWxlWCkgKiB0YXJnZXQuc2NhbGVZO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlzdC5ib3R0b20gPCB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWSA9IChzbmFwLmJvdHRvbSAtIHRhcmdldC50b3ApIC8gdGFyZ2V0LmhlaWdodDtcclxuICAgICAgICAgICAgICAgIGF0dHJzLnNjYWxlWCA9IChhdHRycy5zY2FsZVkgLyB0YXJnZXQuc2NhbGVZKSAqIHRhcmdldC5zY2FsZVg7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGFyZ2V0LnNldChhdHRycyk7XHJcbiAgICAgICAgICB0YXJnZXQuc2V0Q29vcmRzKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfTtcclxuICAgICAgaWYgKHRoaXMuZ3JpZCA+IDApIHtcclxuICAgICAgICBjYW52YXMub24odGhpcy5oYW5kbGVycy5ncmlkKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RzXHJcbiAgICogQHBhcmFtIHtBcnJheX0gb2JqZWN0cy5jb250YWluZXJzXHJcbiAgICogQHBhcmFtIHtBcnJheX0gb2JqZWN0cy5saW5rc1xyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAqL1xyXG4gIGFzeW5jIGxvYWQob2JqZWN0cykge1xyXG4gICAgY29uc3QgeyBjYW52YXMgfSA9IHRoaXM7XHJcblxyXG4gICAgLy8gQ29udGFpbmVyc1xyXG4gICAgZm9yIChsZXQgYyA9IDA7IGMgPCBvYmplY3RzLmNvbnRhaW5lcnMubGVuZ3RoOyBjICs9IDEpIHtcclxuICAgICAgY29uc3Qgb3B0cyA9IF8uY2xvbmVEZWVwKG9iamVjdHMuY29udGFpbmVyc1tjXSk7XHJcbiAgICAgIG9wdHMuY2FudmFzID0gY2FudmFzO1xyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxyXG4gICAgICBhd2FpdCB0aGlzLmFkZENvbnRhaW5lcihvcHRzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBMaW5rc1xyXG4gICAgZm9yIChsZXQgbCA9IDA7IGwgPCBvYmplY3RzLmxpbmtzLmxlbmd0aDsgbCArPSAxKSB7XHJcbiAgICAgIGNvbnN0IG9wdHMgPSBfLmNsb25lRGVlcChvYmplY3RzLmxpbmtzW2xdKTtcclxuICAgICAgb3B0cy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXHJcbiAgICAgIGF3YWl0IHRoaXMuYWRkTGluayhvcHRzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGFkZENvbnRhaW5lcihvcHRpb25zKSB7XHJcbiAgICBjb25zdCB7IGNhbnZhcyB9ID0gdGhpcztcclxuICAgIGNvbnN0IGNvbnRhaW5lck9wdHMgPSB7XHJcbiAgICAgIGlkOiBvcHRpb25zLmlkLFxyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIGxlZnQ6IG9wdGlvbnMubGVmdCB8fCAwLFxyXG4gICAgICB0b3A6IG9wdGlvbnMudG9wIHx8IDAsXHJcbiAgICAgIGFuZ2xlOiAwLFxyXG4gICAgICBsYWJlbDogb3B0aW9ucy5sYWJlbCxcclxuICAgICAgaW1nOiB7XHJcbiAgICAgICAgc3JjOiBvcHRpb25zLmltZy5zcmMsXHJcbiAgICAgIH0sXHJcbiAgICAgIGNoaWxkV2lkdGg6IDcyLFxyXG4gICAgICBjaGlsZEhlaWdodDogNDIsXHJcbiAgICAgIGNoaWxkcmVuOiBBcnJheS5pc0FycmF5KG9wdGlvbnMuY2hpbGRyZW4pID8gb3B0aW9ucy5jaGlsZHJlbiA6IFtdLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IG5ldyBFeHBhbmRhYmxlQ29udGFpbmVyKGNvbnRhaW5lck9wdHMpO1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWF3YWl0LWluLWxvb3BcclxuICAgIGF3YWl0IGNvbnRhaW5lci5sb2FkKCk7XHJcbiAgICBjb250YWluZXIuY29sbGFwc2UoKTtcclxuICAgIGNvbnRhaW5lci5pbmplY3QoKTtcclxuICAgIGlmIChvcHRpb25zLmlzVGVtcG9yYXJ5KSB7XHJcbiAgICAgIGNvbnRhaW5lci5zaGFwZS5zZXQoJ29wYWNpdHknLCAwLjUpO1xyXG4gICAgfVxyXG4gICAgaWYgKG9wdGlvbnMueCAmJiBvcHRpb25zLnkpIHtcclxuICAgICAgY29udGFpbmVyLm1vdmUoe1xyXG4gICAgICAgIHg6IG9wdGlvbnMueCxcclxuICAgICAgICB5OiBvcHRpb25zLnksXHJcbiAgICAgICAgbW92aW5nOiBmYWxzZSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBjYW52YXMubGlua2FibGVTaGFwZXNbb3B0aW9ucy5pZF0gPSBjb250YWluZXI7XHJcbiAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlQ29udGFpbmVyKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHsgY2FudmFzIH0gPSB0aGlzO1xyXG4gICAgaWYgKG9wdGlvbnMuaWQgaW4gY2FudmFzLmxpbmthYmxlU2hhcGVzKSB7XHJcbiAgICAgIGNhbnZhcy5saW5rYWJsZVNoYXBlc1tvcHRpb25zLmlkXS5yZW1vdmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGFkZExpbmsob3B0aW9ucykge1xyXG4gICAgY29uc3QgeyBjYW52YXMgfSA9IHRoaXM7XHJcbiAgICBjb25zdCBsaW5rT3B0cyA9IHtcclxuICAgICAgaWQ6IG9wdGlvbnMuaWQsXHJcbiAgICAgIGNhbnZhcyxcclxuICAgICAgc3RhcnQ6IHtcclxuICAgICAgICB4OiBvcHRpb25zLnN0YXJ0LnggfHwgMCxcclxuICAgICAgICB5OiBvcHRpb25zLnN0YXJ0LnkgfHwgMCxcclxuICAgICAgfSxcclxuICAgICAgZW5kOiB7XHJcbiAgICAgICAgeDogb3B0aW9ucy5lbmQueCB8fCAwLFxyXG4gICAgICAgIHk6IG9wdGlvbnMuZW5kLnkgfHwgMCxcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgICBjb25zdCBsaW5rID0gbmV3IEN1cnZlZExpbmsobGlua09wdHMpO1xyXG4gICAgbGluay5pbmplY3QoY2FudmFzKTtcclxuXHJcbiAgICBpZiAoIW9wdGlvbnMuaXNUZW1wb3JhcnkpIHtcclxuICAgICAgbGluay5hcnJvd0hlYWQuZmlyZSgnbW92ZWQnKTtcclxuICAgICAgbGluay5hcnJvd1RhaWwuZmlyZSgnbW92ZWQnKTtcclxuXHJcbiAgICAgIGlmIChvcHRpb25zLnN0YXJ0ICYmIG9wdGlvbnMuc3RhcnQuaWQgJiYgb3B0aW9ucy5zdGFydC5jYXJkaW5hbCkge1xyXG4gICAgICAgIGxpbmsuY29ubmVjdExpbmsoJ3N0YXJ0Jywgb3B0aW9ucy5zdGFydC5pZCwgb3B0aW9ucy5zdGFydC5jYXJkaW5hbCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG9wdGlvbnMuZW5kICYmIG9wdGlvbnMuZW5kLmlkICYmIG9wdGlvbnMuZW5kLmNhcmRpbmFsKSB7XHJcbiAgICAgICAgbGluay5jb25uZWN0TGluaygnZW5kJywgb3B0aW9ucy5lbmQuaWQsIG9wdGlvbnMuZW5kLmNhcmRpbmFsKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2FudmFzLmxpbmtzW29wdGlvbnMuaWRdID0gbGluaztcclxuXHJcbiAgICByZXR1cm4gbGluaztcclxuICB9XHJcblxyXG4gIHJlbW92ZUxpbmsob3B0aW9ucykge1xyXG4gICAgY29uc3QgeyBjYW52YXMgfSA9IHRoaXM7XHJcbiAgICBpZiAob3B0aW9ucy5pZCBpbiBjYW52YXMubGlua3MpIHtcclxuICAgICAgY2FudmFzLmxpbmtzW29wdGlvbnMuaWRdLnJlbW92ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZXhwYW5kKGlkKSB7XHJcbiAgICBjb25zdCB7IGNhbnZhcyB9ID0gdGhpcztcclxuICAgIGlmIChpZCBpbiBjYW52YXMubGlua2FibGVTaGFwZXMpIHtcclxuICAgICAgY2FudmFzLmxpbmthYmxlU2hhcGVzW2lkXS5leHBhbmQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbGxhcHNlKGlkKSB7XHJcbiAgICBjb25zdCB7IGNhbnZhcyB9ID0gdGhpcztcclxuICAgIGlmIChpZCBpbiBjYW52YXMubGlua2FibGVTaGFwZXMpIHtcclxuICAgICAgY2FudmFzLmxpbmthYmxlU2hhcGVzW2lkXS5jb2xsYXBzZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0U2VsZWN0ZWRDaG9vc2VyVHlwZSh0eXBlKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkQ2hvb3NlclR5cGUgPSB0eXBlO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgb25EcmFnRW50ZXIoZXZlbnQpIHtcclxuICAgIC8vIFRoZSBpZnJhbWUgaW4gd2hpY2ggdGhpcyBjYW52YXMgaXMgaW5qZWN0ZWQgaXMgbWVzc2luZyB1cCB0aGUgbW91c2UgeCx5IGNvb3JkaW5hdGVzLlxyXG4gICAgY29uc3QgY2FudmFzQWJzb2x1dGVQb3NpdGlvbiA9IHRoaXMuY2FudmFzLnVwcGVyQ2FudmFzRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBjb25zdCB4ID0gZXZlbnQuZS54IC0gY2FudmFzQWJzb2x1dGVQb3NpdGlvbi5sZWZ0O1xyXG4gICAgY29uc3QgeSA9IGV2ZW50LmUueSAtIGNhbnZhc0Fic29sdXRlUG9zaXRpb24udG9wO1xyXG5cclxuICAgIGNvbnN0IHR5cGUgPSB0aGlzLnNlbGVjdGVkQ2hvb3NlclR5cGUuaWQ7XHJcbiAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgY2FzZSAnbGluayc6XHJcbiAgICAgICAgdGhpcy5kcmFnR2hvc3RPYmplY3QgPSBhd2FpdCB0aGlzLmFkZExpbmsoe1xyXG4gICAgICAgICAgaWQ6IGAke01hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMSl9YCxcclxuICAgICAgICAgIHN0YXJ0OiB7XHJcbiAgICAgICAgICAgIHg6IHggLSA1MCxcclxuICAgICAgICAgICAgeSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBlbmQ6IHtcclxuICAgICAgICAgICAgeDogeCArIDUwLFxyXG4gICAgICAgICAgICB5LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnY29udGFpbmVyJzpcclxuICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgIHRoaXMuZHJhZ0dob3N0T2JqZWN0ID0gYXdhaXQgdGhpcy5hZGRDb250YWluZXIoe1xyXG4gICAgICAgICAgaWQ6IGAke01hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMSl9YCxcclxuICAgICAgICAgIGxhYmVsOiB0aGlzLnNlbGVjdGVkQ2hvb3NlclR5cGUubGFiZWwsXHJcbiAgICAgICAgICBpbWc6IHtcclxuICAgICAgICAgICAgc3JjOiB0aGlzLnNlbGVjdGVkQ2hvb3NlclR5cGUuaWNvbixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB4OiAwLFxyXG4gICAgICAgICAgeTogMCxcclxuICAgICAgICAgIGlzVGVtcG9yYXJ5OiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBldmVudC5lLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBvbkRyYWdPdmVyKGV2ZW50KSB7XHJcbiAgICBjb25zdCB7IGNhbnZhcyB9ID0gdGhpcztcclxuICAgIC8vIFRoZSBpbW1lcnNpdmVGcmFtZSBpbiB3aGljaCB0aGlzIFBHIGlzIGluamVjdGVkIGlzIG1lc3NpbmcgdXAgdGhlIG1vdXNlIHgseSBjb29yZGluYXRlcy5cclxuICAgIGNvbnN0IGNhbnZhc0Fic29sdXRlUG9zaXRpb24gPSB0aGlzLmNhbnZhcy51cHBlckNhbnZhc0VsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgbGV0IHggPSBldmVudC5lLnggLSBjYW52YXNBYnNvbHV0ZVBvc2l0aW9uLmxlZnQ7XHJcbiAgICBsZXQgeSA9IGV2ZW50LmUueSAtIGNhbnZhc0Fic29sdXRlUG9zaXRpb24udG9wO1xyXG5cclxuICAgIGlmICh0aGlzLmRyYWdHaG9zdE9iamVjdCAhPT0gbnVsbCkge1xyXG4gICAgICBjb25zdCB0eXBlID0gdGhpcy5zZWxlY3RlZENob29zZXJUeXBlLmlkO1xyXG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICBjYXNlICdsaW5rJzpcclxuICAgICAgICAgIHRoaXMuZHJhZ0dob3N0T2JqZWN0LnVwZGF0ZVBhdGgoe1xyXG4gICAgICAgICAgICBzdGFydDoge1xyXG4gICAgICAgICAgICAgIHg6IHggLSA1MCxcclxuICAgICAgICAgICAgICB5LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbmQ6IHtcclxuICAgICAgICAgICAgICB4OiB4ICsgNTAsXHJcbiAgICAgICAgICAgICAgeSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29tbWl0OiBmYWxzZSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdGhpcy5kcmFnR2hvc3RPYmplY3QuYXJyb3dIZWFkLmZpcmUoJ21vdmluZycpO1xyXG4gICAgICAgICAgdGhpcy5kcmFnR2hvc3RPYmplY3QuYXJyb3dUYWlsLmZpcmUoJ21vdmluZycpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnY29udGFpbmVyJzpcclxuICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICBpZiAodGhpcy5kcmFnR2hvc3RPYmplY3QuaXNMb2FkZWQpIHtcclxuICAgICAgICAgICAgeCAtPSAodGhpcy5kcmFnR2hvc3RPYmplY3Quc2hhcGUud2lkdGggLyAyKTtcclxuICAgICAgICAgICAgeSAtPSAodGhpcy5kcmFnR2hvc3RPYmplY3Quc2hhcGUuaGVpZ2h0IC8gMik7XHJcblxyXG4gICAgICAgICAgICAvLyBHcmlkIGVmZmVjdHNcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ3JpZCkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IHsgZ3JpZCB9ID0gdGhpcztcclxuICAgICAgICAgICAgICB4ID0gTWF0aC5yb3VuZCh4IC8gZ3JpZCkgKiBncmlkO1xyXG4gICAgICAgICAgICAgIHkgPSBNYXRoLnJvdW5kKHkgLyBncmlkKSAqIGdyaWQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIE1vdmUgb2JqZWN0XHJcbiAgICAgICAgICAgIHRoaXMuZHJhZ0dob3N0T2JqZWN0Lm1vdmUoe1xyXG4gICAgICAgICAgICAgIHgsXHJcbiAgICAgICAgICAgICAgeSxcclxuICAgICAgICAgICAgICBtb3Zpbmc6IHRydWUsXHJcbiAgICAgICAgICAgICAgc2tpcENvbGxpc2lvbjogdHJ1ZSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgaGFzQ29sbGlzaW9uID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAvLyBEZXRlY3QgaW50ZXJzZWN0aW9uIHdpdGggTGlua3NcclxuICAgICAgICAgICAgY29uc3QgbGlua0lkcyA9IE9iamVjdC5rZXlzKGNhbnZhcy5saW5rcyk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgbGlua0lkcy5sZW5ndGg7IGMgKz0gMSkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGxpbmsgPSBjYW52YXMubGlua3NbbGlua0lkc1tjXV07XHJcbiAgICAgICAgICAgICAgbGluay5zZXRBY3RpdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgIGlmICghaGFzQ29sbGlzaW9uICYmIGxpbmsucGF0aC5pbnRlcnNlY3RzV2l0aE9iamVjdCh0aGlzLmRyYWdHaG9zdE9iamVjdC5zaGFwZSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhhc0Vub3VnaENsZWFyYW5jZSA9ICFsaW5rLnN0YXJ0LnNoYXBlLmludGVyc2VjdHNXaXRoT2JqZWN0KHRoaXMuZHJhZ0dob3N0T2JqZWN0LnNoYXBlKVxyXG4gICAgICAgICAgICAgICAgICAmJiAhbGluay5lbmQuc2hhcGUuaW50ZXJzZWN0c1dpdGhPYmplY3QodGhpcy5kcmFnR2hvc3RPYmplY3Quc2hhcGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGhhc0Vub3VnaENsZWFyYW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICBsaW5rLnNldEFjdGl2ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgaGFzQ29sbGlzaW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIERldGVjdCBpbnRlcnNlY3Rpb24gd2l0aCBDb250YWluZXJzXHJcbiAgICAgICAgICAgIGNvbnN0IGlkcyA9IE9iamVjdC5rZXlzKGNhbnZhcy5saW5rYWJsZVNoYXBlcyk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgaWRzLmxlbmd0aDsgYyArPSAxKSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gY2FudmFzLmxpbmthYmxlU2hhcGVzW2lkc1tjXV07XHJcbiAgICAgICAgICAgICAgY29udGFpbmVyLnNldEFjdGl2ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgaWYgKCFoYXNDb2xsaXNpb24gJiYgY29udGFpbmVyLmlkICE9PSB0aGlzLmRyYWdHaG9zdE9iamVjdC5pZFxyXG4gICAgICAgICAgICAgICAgJiYgY29udGFpbmVyLnNoYXBlLmludGVyc2VjdHNXaXRoT2JqZWN0KHRoaXMuZHJhZ0dob3N0T2JqZWN0LnNoYXBlKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnNldEFjdGl2ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIGhhc0NvbGxpc2lvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGV2ZW50LmUucHJldmVudERlZmF1bHQoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIG9uRHJhZ0xlYXZlKGV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5kcmFnR2hvc3RPYmplY3QgIT09IG51bGwpIHtcclxuICAgICAgY29uc3QgdHlwZSA9IHRoaXMuc2VsZWN0ZWRDaG9vc2VyVHlwZS5pZDtcclxuICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgY2FzZSAnbGluayc6XHJcbiAgICAgICAgICB0aGlzLnJlbW92ZUxpbmsoe1xyXG4gICAgICAgICAgICBpZDogdGhpcy5kcmFnR2hvc3RPYmplY3QuaWQsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHRoaXMuZHJhZ0dob3N0T2JqZWN0ID0gbnVsbDtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ2NvbnRhaW5lcic6XHJcbiAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgaWYgKHRoaXMuZHJhZ0dob3N0T2JqZWN0LmlzTG9hZGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQ29udGFpbmVyKHtcclxuICAgICAgICAgICAgICBpZDogdGhpcy5kcmFnR2hvc3RPYmplY3QuaWQsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmRyYWdHaG9zdE9iamVjdCA9IG51bGw7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGV2ZW50LmUucHJldmVudERlZmF1bHQoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIG9uRHJvcChldmVudCkge1xyXG4gICAgY29uc3QgeyBjYW52YXMgfSA9IHRoaXM7XHJcbiAgICAvLyBUaGUgaW1tZXJzaXZlRnJhbWUgaW4gd2hpY2ggdGhpcyBQRyBpcyBpbmplY3RlZCBpcyBtZXNzaW5nIHVwIHRoZSBtb3VzZSB4LHkgY29vcmRpbmF0ZXMuXHJcbiAgICBjb25zdCBjYW52YXNBYnNvbHV0ZVBvc2l0aW9uID0gdGhpcy5jYW52YXMudXBwZXJDYW52YXNFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGxldCB4ID0gZXZlbnQuZS54IC0gY2FudmFzQWJzb2x1dGVQb3NpdGlvbi5sZWZ0O1xyXG4gICAgbGV0IHkgPSBldmVudC5lLnkgLSBjYW52YXNBYnNvbHV0ZVBvc2l0aW9uLnRvcDtcclxuXHJcbiAgICBjb25zdCB0eXBlID0gdGhpcy5zZWxlY3RlZENob29zZXJUeXBlLmlkO1xyXG4gICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgIGNhc2UgJ2xpbmsnOlxyXG4gICAgICAgIC8vIFJlbW92ZSBnaG9zdCBvYmplY3RcclxuICAgICAgICBpZiAodGhpcy5kcmFnR2hvc3RPYmplY3QgIT09IG51bGwpIHtcclxuICAgICAgICAgIHRoaXMucmVtb3ZlTGluayh7XHJcbiAgICAgICAgICAgIGlkOiB0aGlzLmRyYWdHaG9zdE9iamVjdC5pZCxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdGhpcy5kcmFnR2hvc3RPYmplY3QgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSW5zdGFudGlhdGUgbmV3IG9iamVjdFxyXG4gICAgICAgIGF3YWl0IHRoaXMuYWRkTGluayh7XHJcbiAgICAgICAgICBpZDogYCR7TWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMCkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygxKX1gLFxyXG4gICAgICAgICAgc3RhcnQ6IHtcclxuICAgICAgICAgICAgeDogeCAtIDUwLFxyXG4gICAgICAgICAgICB5LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGVuZDoge1xyXG4gICAgICAgICAgICB4OiB4ICsgNTAsXHJcbiAgICAgICAgICAgIHksXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgaXNUZW1wb3Jhcnk6IGZhbHNlLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnY29udGFpbmVyJzpcclxuICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgIGxldCBhZGRlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBBZGQgYXMgQ2hpbGQgQ29udGFpbmVyIGlmIGludGVyc2VjdGluZyB3aXRoIGFuIGV4aXN0aW5nIENvbnRhaW5lclxyXG4gICAgICAgIGNvbnN0IGlkcyA9IE9iamVjdC5rZXlzKGNhbnZhcy5saW5rYWJsZVNoYXBlcyk7XHJcbiAgICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCBpZHMubGVuZ3RoOyBjICs9IDEpIHtcclxuICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGNhbnZhcy5saW5rYWJsZVNoYXBlc1tpZHNbY11dO1xyXG4gICAgICAgICAgY29udGFpbmVyLnNldEFjdGl2ZShmYWxzZSk7XHJcbiAgICAgICAgICBpZiAoIWFkZGVkICYmIGNvbnRhaW5lci5pZCAhPT0gdGhpcy5kcmFnR2hvc3RPYmplY3QuaWRcclxuICAgICAgICAgICAgJiYgY29udGFpbmVyLnNoYXBlLmludGVyc2VjdHNXaXRoT2JqZWN0KHRoaXMuZHJhZ0dob3N0T2JqZWN0LnNoYXBlKSkge1xyXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxyXG4gICAgICAgICAgICBhd2FpdCBjb250YWluZXIuYWRkQ2hpbGRyZW4oW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlkOiBgJHtNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKS50b1N0cmluZygxNikuc3Vic3RyaW5nKDEpfWAsXHJcbiAgICAgICAgICAgICAgICBpbWc6IHtcclxuICAgICAgICAgICAgICAgICAgc3JjOiAnY2FjYScsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgaGlkZVRleHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICBjb250YWluZXIuY29sbGFwc2UoKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmV4cGFuZCgpO1xyXG4gICAgICAgICAgICBhZGRlZCA9IHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZW1vdmUgZ2hvc3Qgb2JqZWN0XHJcbiAgICAgICAgaWYgKHRoaXMuZHJhZ0dob3N0T2JqZWN0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICB0aGlzLnJlbW92ZUNvbnRhaW5lcih7XHJcbiAgICAgICAgICAgIGlkOiB0aGlzLmRyYWdHaG9zdE9iamVjdC5pZCxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdGhpcy5kcmFnR2hvc3RPYmplY3QgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWRkIGFzIG5ldyBub3JtYWwgQ29udGFpbmVyXHJcbiAgICAgICAgaWYgKCFhZGRlZCkge1xyXG4gICAgICAgICAgY29uc3Qgb3B0cyA9IHtcclxuICAgICAgICAgICAgaWQ6IGAke01hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMSl9YCxcclxuICAgICAgICAgICAgbGFiZWw6IHRoaXMuc2VsZWN0ZWRDaG9vc2VyVHlwZS5sYWJlbCxcclxuICAgICAgICAgICAgaW1nOiB7XHJcbiAgICAgICAgICAgICAgc3JjOiB0aGlzLnNlbGVjdGVkQ2hvb3NlclR5cGUuaWNvbixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgeCxcclxuICAgICAgICAgICAgeSxcclxuICAgICAgICAgICAgaXNUZW1wb3Jhcnk6IGZhbHNlLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIGNvbnN0IG5ld0NvbnRhaW5lciA9IGF3YWl0IHRoaXMuYWRkQ29udGFpbmVyKG9wdHMpO1xyXG5cclxuICAgICAgICAgIC8vIENhbGN1bGF0ZSBuZXcgcG9zaXRpb25cclxuICAgICAgICAgIHggLT0gKG5ld0NvbnRhaW5lci5zaGFwZS53aWR0aCAvIDIpO1xyXG4gICAgICAgICAgeSAtPSAobmV3Q29udGFpbmVyLnNoYXBlLmhlaWdodCAvIDIpO1xyXG5cclxuICAgICAgICAgIC8vIEdyaWQgZWZmZWN0c1xyXG4gICAgICAgICAgaWYgKHRoaXMuZ3JpZCkge1xyXG4gICAgICAgICAgICBjb25zdCB7IGdyaWQgfSA9IHRoaXM7XHJcbiAgICAgICAgICAgIHggPSBNYXRoLnJvdW5kKHggLyBncmlkKSAqIGdyaWQ7XHJcbiAgICAgICAgICAgIHkgPSBNYXRoLnJvdW5kKHkgLyBncmlkKSAqIGdyaWQ7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gTW92ZSBvYmplY3QgdW5kZXIgdGhlIG1vdXNlIGN1cnNvclxyXG4gICAgICAgICAgbmV3Q29udGFpbmVyLm1vdmUoe1xyXG4gICAgICAgICAgICB4LFxyXG4gICAgICAgICAgICB5LFxyXG4gICAgICAgICAgICBtb3Zpbmc6IHRydWUsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIG5ld0NvbnRhaW5lci5tb3ZlKHsgLy8gZm9yIGhhbmRsaW5nIGNvbGxpc2lvbnNcclxuICAgICAgICAgICAgbW92aW5nOiBmYWxzZSxcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIC8vIERldGVjdCBpbnRlcnNlY3Rpb24gd2l0aCBMaW5rc1xyXG4gICAgICAgICAgY29uc3QgbGlua0lkcyA9IE9iamVjdC5rZXlzKGNhbnZhcy5saW5rcyk7XHJcbiAgICAgICAgICBmb3IgKGxldCBjID0gMDsgYyA8IGxpbmtJZHMubGVuZ3RoOyBjICs9IDEpIHtcclxuICAgICAgICAgICAgY29uc3QgbGluayA9IGNhbnZhcy5saW5rc1tsaW5rSWRzW2NdXTtcclxuICAgICAgICAgICAgbGluay5zZXRBY3RpdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoIWFkZGVkICYmIGxpbmsucGF0aC5pbnRlcnNlY3RzV2l0aE9iamVjdChuZXdDb250YWluZXIuc2hhcGUpKSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgaGFzRW5vdWdoQ2xlYXJhbmNlID0gIWxpbmsuc3RhcnQuc2hhcGUuaW50ZXJzZWN0c1dpdGhPYmplY3QobmV3Q29udGFpbmVyLnNoYXBlKVxyXG4gICAgICAgICAgICAgICAgJiYgIWxpbmsuZW5kLnNoYXBlLmludGVyc2VjdHNXaXRoT2JqZWN0KG5ld0NvbnRhaW5lci5zaGFwZSk7XHJcbiAgICAgICAgICAgICAgaWYgKGhhc0Vub3VnaENsZWFyYW5jZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIHR3byBuZXcgbGlua3MgdGhhdCB3aWxsIHJlcGxhY2UgdGhlIG92ZXJsYXBwZWQgb25lXHJcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5hZGRMaW5rKHtcclxuICAgICAgICAgICAgICAgICAgaWQ6IGAke01hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMSl9YCxcclxuICAgICAgICAgICAgICAgICAgc3RhcnQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogbGluay5zdGFydC5zaGFwZS5pZCxcclxuICAgICAgICAgICAgICAgICAgICBjYXJkaW5hbDogbGluay5zdGFydC5hbmNob3IsXHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIGVuZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBuZXdDb250YWluZXIuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FyZGluYWw6IG5ld0NvbnRhaW5lci5zaGFwZS5sZWZ0ID4gbGluay5zdGFydC5zaGFwZS5sZWZ0ID8gJ3dlc3QnIDogJ2Vhc3QnLFxyXG4gICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICBpc1RlbXBvcmFyeTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmFkZExpbmsoe1xyXG4gICAgICAgICAgICAgICAgICBpZDogYCR7TWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMCkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygxKX1gLFxyXG4gICAgICAgICAgICAgICAgICBzdGFydDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBuZXdDb250YWluZXIuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FyZGluYWw6IG5ld0NvbnRhaW5lci5zaGFwZS5sZWZ0ID4gbGluay5zdGFydC5zaGFwZS5sZWZ0ID8gJ2Vhc3QnIDogJ3dlc3QnLFxyXG4gICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICBlbmQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogbGluay5lbmQuc2hhcGUuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FyZGluYWw6IGxpbmsuZW5kLmFuY2hvcixcclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgaXNUZW1wb3Jhcnk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIG9sZCBsaW5rXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUxpbmsoe1xyXG4gICAgICAgICAgICAgICAgICBpZDogbGluay5pZCxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYWRkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGFkZGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnQuZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH1cclxufVxyXG4iXX0=
