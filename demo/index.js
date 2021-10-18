// Start app
const main = function main() {
  const { ProcessGraph, Container } = window.pg;

  // Initialize Process Graph
  const processGraph = new ProcessGraph({
    canvasOpts: {
      el: 'pg-canvas',
      options: {
        width: 1400,
        height: 600,
      },
    },
    grid: 10,
  });
  const { canvas } = processGraph;

  // Create objects
  new Container({
    id: 'r1',
    canvas,
    left: 200,
    top: 50,
    angle: 0,
    label: 'Set CPU to MB socket',
  }).inject();
  new Container({
    id: 'r2',
    canvas,
    left: 600,
    top: 50,
    angle: 0,
    label: 'Screw MB to Case',
  }).inject();
  new Container({
    id: 'r3',
    canvas,
    left: 1050,
    top: 150,
    angle: 45,
    label: 'Insert RAM',
  }).inject();
  new Container({
    id: 'r4',
    canvas,
    left: 900,
    top: 300,
    angle: 90,
    label: 'Insert M.2 SSD',
  }).inject();
  new Container({
    id: 'r5',
    canvas,
    left: 600,
    top: 300,
    angle: 90,
    label: 'Apply thermal paste to CPU',
  }).inject();
  new Container({
    id: 'r6',
    canvas,
    left: 300,
    top: 300,
    angle: 90,
    label: 'Screw CPU cooler',
  }).inject();
};
window.addEventListener('load', main);
