import { createStore,applyMiddleware } from "redux";

//allows the browser to cashe the store
import {persistStore} from 'redux-persist';

import logger from "redux-logger";

import rootReducer from "./root-reducer";

const middlewares=[logger];

export const store=createStore(rootReducer,applyMiddleware(...middlewares));

//creates a persistent version of the store
export const persistor=persistStore(store);

export default {store,persistor};