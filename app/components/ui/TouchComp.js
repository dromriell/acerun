import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";

export default TouchComp =
  Platform.OS === "android" && Platform.Version >= 21
    ? TouchableNativeFeedback
    : TouchableOpacity;
