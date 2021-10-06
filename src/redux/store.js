import { createStore,applyMiddleware } from "redux";
//allows the browser to cashe the store
import {persistStore} from 'redux-persist';
import logger from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "./root-reducer";

/**
 * the LOGGER is a middleware that catches the action and logs it to us, 
 * so we can see the state before and after updates
 * we leave the logger empty, so in production it doesnt show anything
 * then we specify that it is needed only fo development
 */
const middlewares=[thunk];

if(process.env.NODE_ENV === "development") middlewares.push(logger)

export const store=createStore(rootReducer,applyMiddleware(...middlewares));

//creates a persistent version of the store
export const persistor=persistStore(store);

export default {store,persistor};