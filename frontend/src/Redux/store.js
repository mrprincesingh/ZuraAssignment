import {
    applyMiddleware,
    legacy_createStore,
    combineReducers,
    compose,
  } from "redux";
  import thunk from "redux-thunk";
  import { reducer as projectContext } from "./projectContext/reducer"
  import {reducer1 as MediaContext} from "./uploadContext/reducer"

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const rootRuducer = combineReducers({projectContext ,MediaContext  });

  export const store = legacy_createStore(
    rootRuducer,
    composeEnhancers(applyMiddleware(thunk))
  );
