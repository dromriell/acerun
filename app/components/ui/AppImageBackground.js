import React from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AppColors from "../../utils/AppColors";

/**
 * Component for filling parent container with an image
 * background. Takes an image prop that needs to be a path
 * (either require or uri).
 */
const AppImageBackground = (props) => {
  const { image, imageStyle, gradientStyle } = props;

  return (
    <ImageBackground
      source={image}
      style={{ ...styles.backgroundImage, ...imageStyle }}
    >
      <LinearGradient
        colors={[AppColors.black, AppColors.black, AppColors.primary]}
        style={{ ...styles.backgroundGradient, gradientStyle }}
        start={{ x: 0.1, y: 0.1 }}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    height: "100%",
    width: "100%",
    flex: 1,
  },
  backgroundGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    opacity: 0.7,
  },
});

export default AppImageBackground;
