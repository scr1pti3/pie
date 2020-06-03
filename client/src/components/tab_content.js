import React, {useState} from 'react';
import {connect} from 'react-redux';
import {sectionActive} from '../actions/sectionActions';
import GridLayout, {WidthProvider} from 'react-grid-layout';
import Field from './field';

import './tab_content.scss';

const Grid = WidthProvider(GridLayout);

function Tablinks(props) {
  const handleClick = (e) => {
    e.target.parentElement.children.forEach((element) => {
      if(element.classList.contains('active')) element.classList.remove('active');
    });

    e.target.classList.add('active');
    props.sectionActive(props.section);
  }

  return (
    <div className={`tablinks ${props.className}`} onClick={handleClick}>
      {props.section.name}
    </div>
  );
}


function SectionContent(props) {
  const layout = [
    {i: 'a', x: 0, y: 0, w: 1, h: 2},
    {i: 'b', x: 1, y: 0, w: 1, h: 2},
    {i: 'c', x: 4, y: 0, w: 1, h: 2},
  ];
  let virtualLayout;
  return(
    <div id="section_content">
      <div className="container">
        <Grid className="layout" layout={layout} onLayoutChange={(layout) => virtualLayout=layout} cols={3} rowHeight={30} style={{height: 'inherit', overflow: 'auto'}}>
          <div key="a">a</div>
          <div key="b">b</div>
          <div key='c'><Field/></div>
        </Grid>
      </div>
    </div>
  )
}

function TabContent(props) {
  const sections = props.panel.sections || [];
  return (
    <div id="tab_content">
      <div className="section_tab">
        <div className="container">
          {
            sections.map((section,idx) => (
              <Tablinks key={section._id} className={(!idx) ? 'active' : ''} section={section} sectionActive={props.sectionActive}/>
            ))
          }
        </div>
      </div>
      <div id="section_options">
        <button className="options_button">New Section</button>
        <button className="options_button">New Field</button>
        <button className="options_button">Edit Mode</button>
        <button className="options_button">Save</button>
      </div>
      <SectionContent/>
    </div>
  );
}

const mapStateToProps = state => ({
  section: state.sections.activeSection,
  panel: state.panels.activePanel,
})

export default connect(mapStateToProps, {sectionActive})(TabContent);
