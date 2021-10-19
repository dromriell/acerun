import * as React from "react";
import * as Font from "expo-font";

import { createIconSetFromFontello } from "@expo/vector-icons";
import fontelloConfig from "./config.json";

const GameIcons = createIconSetFromFontello(
  fontelloConfig,
  "game-icons",
  "game-icons.ttf"
);

export default GameIcons;
