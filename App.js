import React from "react";

import NavigationRouter from "./app/navigation/NavigationRouter";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import AppLoading from "expo-app-loading";
import {
  useFonts,
  TitilliumWeb_400Regular,
  TitilliumWeb_600SemiBold,
  TitilliumWeb_700Bold,
} from "@expo-google-fonts/titillium-web";

import discsReducer from "./app/store/reducers/discsReducer";
import authReducer from "./app/store/reducers/authReducer";
import eventReducer from "./app/store/reducers/eventReducer";

const rootReducer = combineReducers({
  discs: discsReducer,
  auth: authReducer,
  events: eventReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  let [isFontsLoaded] = useFonts({
    TitilliumWeb_400Regular,
    TitilliumWeb_600SemiBold,
    TitilliumWeb_700Bold,
  });

  if (!isFontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <NavigationRouter />
    </Provider>
  );
}
