import {
  MODIFY_SECTION,
  GET_SECTIONS,
  DELETE_SECTION,
  ACTIVE_SECTION
} from './types';

export const sectionActive = (section) => dispatch => {
  dispatch({
    type: ACTIVE_SECTION,
    payload: section
  })
};
