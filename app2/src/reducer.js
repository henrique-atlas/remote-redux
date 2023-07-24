const initialState = {
  appName: 'remoteApp',
};

const CHANGE_APP_NAME = 'CHANGE_APP_NAME';
const CHANGE_MAIN_PROPERTY = 'CHANGE_MAIN_PROPERTY'

const changeAppNameAction = appName => {
  return { type: CHANGE_APP_NAME, payload: appName };
};

const changeMainPropertyAction = propName => {
  return { type: CHANGE_MAIN_PROPERTY, payload: propName };
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_APP_NAME: {
      return {
        ...state,
        appName: action.payload,
      };
    }
  }
  return state;
};

export { changeAppNameAction, changeMainPropertyAction };
export default reducer;
