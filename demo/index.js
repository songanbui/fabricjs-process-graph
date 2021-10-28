// Start app

const main = async function main() {
  const {
    ProcessGraph, CurvedLink, ExpandableContainer,
  } = window.pg;

  // Initialize Chooser
  let choosenType = 'container';
  const draggableContainer = document.getElementById('pg-chooser-container');
  draggableContainer.addEventListener('dragstart', (event) => {
    choosenType = 'container';
  });
  const draggableLink = document.getElementById('pg-chooser-link');
  draggableLink.addEventListener('dragstart', (event) => {
    choosenType = 'link';
  });

  // Initialize Process Graph
  const processGraph = new ProcessGraph({
    canvasOpts: {
      el: 'pg-canvas',
      options: {
        width: 1400,
        height: 600,
      },
    },
    grid: 20,
  });
  const { canvas } = processGraph;
  let tmpDragObject = null;
  canvas.on('dragenter', async (event) => {
    if (tmpDragObject === null) {
      switch (choosenType) {
        case 'link':
          tmpDragObject = new CurvedLink({
            canvas,
            start: {
              x: 0,
              y: 0,
            },
            end: {
              x: 200,
              y: 0,
            },
          });
          tmpDragObject.path.set('opacity', 0.3);
          tmpDragObject.inject(canvas);
          break;
        case 'container':
        default:
          tmpDragObject = new ExpandableContainer({
            id: `${Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}`,
            canvas,
            angle: 0,
            label: 'General System',
            img: {
              src: 'caca',
            },
            left: 0,
            top: 0,
            childWidth: 72,
            childHeight: 42,
            children: [],
          });
          await tmpDragObject.load();
          tmpDragObject.shape.set('opacity', 0.3);
          tmpDragObject.inject();
          break;
      }
    }
    event.e.preventDefault();
  });

  canvas.on('dragover', (event) => {
    if (tmpDragObject !== null) {
      switch (choosenType) {
        case 'link':
          tmpDragObject.updatePath({
            start: {
              x: event.e.x - 50,
              y: event.e.y,
            },
            end: {
              x: event.e.x + 50,
              y: event.e.y,
            },
            commit: false,
          });
          tmpDragObject.arrowHead.fire('moving');
          tmpDragObject.arrowTail.fire('moving');
          break;
        case 'container':
        default:
          if (tmpDragObject.isLoaded) {
            let x = event.e.x - (tmpDragObject.shape.width / 2);
            let y = event.e.y - (tmpDragObject.shape.height / 2);
            if (processGraph.grid) {
              x = Math.round(x / processGraph.grid) * processGraph.grid;
              y = Math.round(y / processGraph.grid) * processGraph.grid;
            }
            tmpDragObject.move({
              x,
              y,
              moving: true,
              skipCollision: true,
            });
          }
          break;
      }
    }
  });

  canvas.on('dragleave', (event) => {
    console.log('dragleave');
    // // remove tmp
    // if (tmpDragObject) {
    //   console.log('dragleave2');
    //   tmpDragObject.remove();
    //   tmpDragObject = null;
    // }
    // event.e.preventDefault();
  });

  canvas.on('drop', async (event) => {
    // remove tmp
    if (tmpDragObject !== null) {
      console.log('drop');
      tmpDragObject.remove();
      tmpDragObject = null;
    }

    let obj;
    switch (choosenType) {
      case 'link':
        obj = new CurvedLink({
          canvas,
          start: {
            x: event.e.x - 50,
            y: event.e.y,
          },
          end: {
            x: event.e.x + 50,
            y: event.e.y,
          },
        });
        obj.inject(canvas);
        obj.arrowHead.fire('moved');
        obj.arrowTail.fire('moved');
        break;
      case 'container':
      default:
        obj = new ExpandableContainer({
          id: `${Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}`,
          canvas,
          angle: 0,
          label: 'General System',
          img: {
            src: 'caca',
          },
          left: event.e.x,
          top: event.e.y,
          childWidth: 72,
          childHeight: 42,
          children: [
            {
              id: 'c12',
              label: '2',
              index: 2,
              img: {
                src: 'caca',
              },
              hideText: false,
            },
          ],
        });
        await obj.load();
        obj.inject();
        obj.move({
          x: event.e.x - (obj.shape.width / 2),
          y: event.e.y - (obj.shape.height / 2),
          moving: false,
        });
        break;
    }
    event.e.preventDefault();
  });

  // Create objects
  const r1 = new ExpandableContainer({
    id: 'r1',
    canvas,
    left: 400,
    top: 50,
    angle: 0,
    label: 'Set CPU to MB socket',
    img: {
      src: 'caca',
    },
    childWidth: 72,
    childHeight: 42,
    children: [
      {
        id: 'c11',
        label: '1',
        index: 1,
        img: {
          src: 'caca',
        },
        hideText: false,
      },
      {
        id: 'c12',
        label: '2',
        index: 2,
        img: {
          src: 'caca',
        },
        hideText: false,
      },
      {
        id: 'c13',
        label: '3',
        index: 3,
        img: {
          src: 'caca',
        },
        hideText: false,
      },
    ],
  });
  await r1.load();
  r1.inject();

  const r2 = new ExpandableContainer({
    id: 'r2',
    canvas,
    left: 800,
    top: 150,
    angle: 0,
    label: 'Insert RAM',
    img: {
      src: 'caca',
    },
    childWidth: 72,
    childHeight: 42,
    children: [
      {
        id: 'c21',
        label: '1',
        index: 1,
        img: {
          src: 'caca',
        },
        hideText: false,
      },
      {
        id: 'c22',
        label: '2',
        index: 2,
        img: {
          src: 'caca',
        },
        hideText: false,
      },
      {
        id: 'c23',
        label: '3',
        index: 3,
        img: {
          src: 'caca',
        },
        hideText: false,
      },
    ],
  });
  await r2.load();
  r2.inject();

  const cl121 = new CurvedLink({
    id: 'cl_r1_r3',
    canvas,
  }).inject();
  cl121.connectLink('start', r1.id, 'east');
  cl121.connectLink('end', r2.id, 'west');
};
window.addEventListener('load', main);
