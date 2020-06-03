import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {getPanels, getActivePanel} from '../actions/panelActions';

import './side_tab.scss';

function Tablinks(props) {
  const [isOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!isOpen);

  let tablinkContent = '';
  if(isOpen) tablinkContent = (
    <div className="tablinks-content">
    {
      props.panels.map(panel => <a key={panel._id} onClick={() => props.getActivePanel(panel)}>
        {panel.name}
      </a>)
    }
      <a>Create new panel</a>
    </div>
  )
  else tablinkContent = '';

  return(
    <div className="tablinks">
      <button className="tablinks-name" onClick={toggle}>{props.name}</button>
      { tablinkContent }
    </div>
  )
}

function VerticalTab(props) {
  useEffect(() => {
      props.getPanels();
  }, []);

  return (
    <div id="side_tab">
      <h1 id="home">PieMS</h1>
      <Tablinks name="Panels" panels={props.panels} getActivePanel={props.getActivePanel}/>
    </div>
  )
}

const mapStateToProps = state => ({
  panels: state.panels.panels
});

export default connect(mapStateToProps, {getPanels, getActivePanel})(VerticalTab);
