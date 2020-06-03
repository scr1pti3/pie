import {combineReducers} from 'redux';
import panelReducer from './panelReducer';
import sectionReducer from './sectionReducer';

export default combineReducers({
  panels: panelReducer,
  sections: sectionReducer
})
