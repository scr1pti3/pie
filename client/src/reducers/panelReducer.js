import {CREATE_PANEL, GET_PANELS, ACTIVE_PANEL} from '../actions/types';

const initialState = {
  panels: [],
  panel: null,
  activePanel: {},
};

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_PANELS:
      return {
        ...state,
        panels: action.payload
      }
    case ACTIVE_PANEL:
      return {
        ...state,
        activePanel: action.payload
      }
    default:
      return state;
  }
}
