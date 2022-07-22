import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { authSlice } from "../modules/auth/auth.slice";
import { authApi } from "../modules/auth/auth.api";
import { userApi } from "../modules/users/api/user.api";

import { deviceApi } from "../modules/devices/device.api";
import { coolApi } from "../modules/users/api/cool.api";
import { familyApi } from "../modules/users/api/family.api";
import { sermonApi } from "../modules/sermons/api/sermon.api";

import { childDedicationApi } from "../modules/ministry/api/child-dedication.api";
import { prayerApi } from "../modules/ministry/api/prayer.api";
import { baptismApi } from "../modules/ministry/api/baptism.api";
import { sermonParticipantApi } from "../modules/sermons/api/sermon-participant.api";
import { companyApi } from "../modules/company/api/company.api";
import { orderApi } from "../modules/orders/api/order.api";
import { productApi } from "../modules/company copy/api/product.api";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["authSlice", "businessSlice"],
};

const reducers = {
  /** Auth Module */
  [authSlice.name]: authSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,

  /* Company Module */
  [companyApi.reducerPath]: companyApi.reducer,

  /** User Module */
  [userApi.reducerPath]: userApi.reducer,
  [coolApi.reducerPath]: coolApi.reducer,
  [familyApi.reducerPath]: familyApi.reducer,

  /* Order Module */
  [orderApi.reducerPath]: orderApi.reducer,

  /* Device Module */
  [deviceApi.reducerPath]: deviceApi.reducer,

  /* Sermon Module */
  [sermonApi.reducerPath]: sermonApi.reducer,
  [sermonParticipantApi.reducerPath]: sermonParticipantApi.reducer,

  /* Ministry Module */
  [baptismApi.reducerPath]: baptismApi.reducer,
  [childDedicationApi.reducerPath]: childDedicationApi.reducer,
  [prayerApi.reducerPath]: prayerApi.reducer,

  // produtapi
  [productApi.reducerPath]: productApi.reducer,
};

export const rootReducer: Reducer<RootState> = (state, action) => {
  //   if (action.type === RESET_STATE_ACTION_TYPE) {
  //     state = {} as RootState;
  //   }
  if (action.type === FLUSH) {
    // }
    state = undefined;
  }

  if (action.type === REHYDRATE) {
    state = {
      ...state,
      ...action.payload,
    };
  }
  if (action.type === PERSIST) {
    state = {
      ...state,
      ...action.payload,
    };
  }
  if (action.type === PURGE) {
    state = undefined;
  }

  return combinedReducer(state, action);
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          // ignore reduxt persist actions
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
      //   thunk: {
      //     extraArgument:,
      //   },
    }).concat([authApi.middleware]),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof combinedReducer>;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
