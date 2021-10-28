import '@babel/polyfill';

import ProcessGraph from './src/ProcessGraph.js';

import LinkableShape from './src/LinkableShape.js';
import Container from './src/Container.js';
import ExpandableContainer from './src/ExpandableContainer.js';

import Link from './src/Link.js';
import CurvedLink from './src/CurvedLink.js';

window.pg = {
  ProcessGraph,
  LinkableShape,
  Container,
  ExpandableContainer,
  Link,
  CurvedLink,
};
