import LinkableShape from '../src/LinkableShape.js';

const { fabric } = window;

// Utilities to create complex shapes
function createTextBox(label) {
  const rect = new fabric.Rect({
    left: 0,
    top: 0,
    originX: 'left',
    originY: 'top',
    strokeWidth: 6,
    stroke: '#666',
    fill: '#ff5',
    width: 250,
    height: 150,
  });
  const text = new fabric.IText(label, {
    left: 125,
    top: 30,
    fontSize: 20,
    textAlign: 'center',
    originX: 'center',
    originY: 'center',
  });
  const group = new fabric.Group([rect, text], {
    left: 0,
    top: 0,
    originX: 'center',
    originY: 'center',
  });
  return group;
}
function createTextCircle(label) {
  const circle = new fabric.Circle({
    left: 0,
    top: 0,
    strokeWidth: 6,
    radius: 100,
    fill: '#ff5',
    stroke: '#666',
    originX: 'center',
    originY: 'center',
  });
  const text = new fabric.IText(label, {
    left: 0,
    top: 0,
    fontSize: 20,
    textAlign: 'center',
    originX: 'center',
    originY: 'center',
  });
  const group = new fabric.Group([circle, text], {
    left: 0,
    top: 0,
    originX: 'center',
    originY: 'center',
  });
  return group;
}

// Start app
const main = function main() {
  // Initialize Canvas
  const canvas = new fabric.Canvas('pg-canvas', {
    width: 1400,
    height: 600,
    preserveObjectStacking: true,
  });
    // fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
  fabric.Object.prototype.toggleOpacity = function (opacity, timeout) {
    this.animate('opacity', opacity, {
      duration: timeout !== undefined ? timeout : 300,
      onChange: this.canvas.renderAll.bind(canvas),
    });
  };
  canvas.calcOffset();
  const onSelection = () => {
    const active = canvas.getActiveObject();
    console.log(active.type);
    // When multi selection, remove any non Rectangle objects
    if (active.type === 'activeSelection') {
      const objects = active.getObjects();
      if (objects.length > 1) {
        const onlyRect = objects.filter((o) => o.type === 'connectableShape');
        canvas._discardActiveObject();
        const sel = new fabric.ActiveSelection(onlyRect, {
          canvas,
        });
        canvas._setActiveObject(sel);
      }
    }
  };
  canvas.on({
    'selection:created': onSelection,
    'selection:updated': onSelection,
    'object:moving': () => {},
    'object:added': () => {},
    // 'selection:cleared': onSelectionCleared
  });

  // Create objects
  new LinkableShape({
    id: 'r1',
    canvas,
    left: 200,
    top: 100,
    angle: 0,
    shape: createTextCircle('Set CPU to MB socket'),
  }).inject();
  new LinkableShape({
    id: 'r2',
    canvas,
    left: 700,
    top: 100,
    angle: 0,
    shape: createTextBox('Screw MB to Case'),
  }).inject();
  new LinkableShape({
    id: 'r3',
    canvas,
    left: 1200,
    top: 200,
    angle: 45,
    shape: createTextBox('Insert RAM'),
  }).inject();
  new LinkableShape({
    id: 'r4',
    canvas,
    left: 900,
    top: 400,
    angle: 90,
    shape: createTextBox('Insert M.2 SSD'),
  }).inject();
  new LinkableShape({
    id: 'r5',
    canvas,
    left: 600,
    top: 400,
    angle: 90,
    shape: createTextBox('Apply thermal paste to CPU'),
  }).inject();
  new LinkableShape({
    id: 'r6',
    canvas,
    left: 300,
    top: 400,
    angle: 90,
    shape: createTextBox('Screw CPU cooler'),
  }).inject();
};
window.addEventListener('load', main);
