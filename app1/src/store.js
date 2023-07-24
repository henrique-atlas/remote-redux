import { combineReducers, createStore, compose } from 'redux';

const initialState = {
  appName: 'host',
  simpleProperty: 'test'
};

const CHANGE_MAIN_PROPERTY = 'CHANGE_MAIN_PROPERTY'

const hostReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_MAIN_PROPERTY: {
      return {
        ...state,
        simpleProperty: action.payload,
      };
    }
    default:
      return state;
  }
};

const staticReducers = {
  host: hostReducer,
};

/**
 * Cf. redux docs:
 * https://redux.js.org/recipes/code-splitting/#defining-an-injectreducer-function
 */
export default function configureStore(initialState) {
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  const enhancer = composeEnhancers();
  const store = createStore(createReducer(), enhancer);

  store.asyncReducers = {};

  store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
  };

  return store;
}

function createReducer(asyncReducers) {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });
}

export const store = configureStore();
