import { createIconSet } from "@expo/vector-icons";
import gameIconsConfig from "../fonts/config.json";

// const glyphMap = gameIconsConfig.glyphs[0].search

const GameIcons = createIconSet(
  gameIconsConfig,
  "Game-Icons",
  "custom-icon-font.ttf"
);

export default GameIcons;
