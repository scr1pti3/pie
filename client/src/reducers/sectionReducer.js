import {ACTIVE_SECTION} from '../actions/types';

const initialState = {
  sections: [],
  section: {},
  isActive: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case ACTIVE_SECTION:
      return {
        ...state,
        activeSection: action.payload
      }
    default:
      return state;
  }
}
