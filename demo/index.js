// Start app

const main = async function main() {
  const {
    ProcessGraph,
  } = window.pg;

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
  window.demoPG = processGraph;

  // Initialize Chooser
  const draggableContainer = document.getElementById('pg-chooser-container');
  draggableContainer.addEventListener('dragstart', (event) => {
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    event.dataTransfer.setDragImage(img, 0, 0);

    processGraph.setSelectedChooserType({
      id: 'container',
      label: 'General System',
      icon: 'caca',
    });
  });
  const draggableLink = document.getElementById('pg-chooser-link');
  draggableLink.addEventListener('dragstart', (event) => {
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    event.dataTransfer.setDragImage(img, 0, 0);

    processGraph.setSelectedChooserType({
      id: 'link',
      label: 'Product Flow',
      icon: 'caca',
    });
  });

  // Create objects
  const objects = {
    containers: [
      {
        id: 'r1',
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
            index: 1,
            img: {
              src: 'caca',
            },
            hideText: false,
          },
          {
            id: 'c12',
            index: 2,
            img: {
              src: 'caca',
            },
            hideText: false,
          },
          {
            id: 'c13',
            index: 3,
            img: {
              src: 'caca',
            },
            hideText: false,
          },
        ],
      },
      {
        id: 'r2',
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
            index: 1,
            img: {
              src: 'caca',
            },
            hideText: false,
          },
          {
            id: 'c22',
            index: 2,
            img: {
              src: 'caca',
            },
            hideText: false,
          },
          {
            id: 'c23',
            index: 3,
            img: {
              src: 'caca',
            },
            hideText: false,
          },
        ],
      },
    ],
    links: [
      {
        id: 'cl_r1_r3',
        start: {
          id: 'r1',
          cardinal: 'east',
        },
        end: {
          id: 'r2',
          cardinal: 'west',
        },
      },
      {
        id: 'cl_floating',
        start: {
          x: 100,
          y: 200,
        },
        end: {
          x: 150,
          y: 300,
        },
      },
    ],
  };
  await processGraph.load(objects);
};
window.addEventListener('load', main);
