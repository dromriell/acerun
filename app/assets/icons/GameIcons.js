import { createIconSet } from "@expo/vector-icons"
import gameIconsConfig from '../fonts/config.json'

console.log('test', gameIconsConfig)
// const glyphMap = gameIconsConfig.glyphs[0].search

const GameIcons = createIconSet(gameIconsConfig, 'Game-Icons', 'custom-icon-font.ttf')

export default GameIcons