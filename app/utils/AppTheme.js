import { DefaultTheme } from "@react-navigation/native";
import AppColors from "./AppColors";

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: AppColors.darkGrey,
  },
};
