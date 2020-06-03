import React from 'react';
import SideTab from './side_tab.js';
import TabContent from './tab_content.js';
import './container.scss';

function Container(props) {
  return (
    <div id="container">
      <SideTab id="side_tab"/>
      <TabContent id="tab_content"/>
    </div>
  )
}

export default Container;
