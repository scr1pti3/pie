import {CREATE_PANEL, GET_PANELS, ACTIVE_PANEL} from './types';
import axios from 'axios';


export const getPanels = () => async dispatch => {
  const response = await axios.get('/api/panels')

  dispatch({
    type: GET_PANELS,
    payload: response.data
  })
}

export const getActivePanel = (panel) => dispatch => {
  dispatch({
    type: ACTIVE_PANEL,
    payload: panel
  })
}
