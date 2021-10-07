import { createStore, applyMiddleware } from "redux";
//allows the browser to cashe the store
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./root-reducer";

// import sagas
import { fetchCollectionsStart } from "./shop/shop.sagas";

// Create the saga middleware for handling async events
const sagaMiddleware = createSagaMiddleware();

// pass saga in middlewares that will be applied
const middlewares = [sagaMiddleware];

/**
 * the LOGGER is a middleware that catches the action and logs it to us,
 * so we can see the state before and after updates
 * we leave the logger empty, so in production it doesnt show anything
 * then we specify that it is needed only fo development
 */
if (process.env.NODE_ENV === "development") middlewares.push(logger);

export const store = createStore(
    rootReducer, // mount root reducer on the Store
    applyMiddleware(...middlewares)); // mount middlewares on the Store

// run sagas
sagaMiddleware.run(fetchCollectionsStart);

//creates a persistent version of the store
export const persistor = persistStore(store);

export default { store, persistor };
