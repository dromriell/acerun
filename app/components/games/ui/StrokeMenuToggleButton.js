import React, { useEffect, useRef } from "react";
import { View, Animated, Easing, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { TouchComp } from "../../ui/TouchComp";
import AppColors from "../../../utils/AppColors";

const StrokeMenuToggleButton = (props) => {
  const { isStrokeMenuOpen, setIsStrokeMenuOpen } = props;
  const firstRender = useRef(true);

  const rotateButtonAnim = useRef(new Animated.Value(0)).current;

  const rotateInterpolate = rotateButtonAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "135deg"],
  });

  const rotateToCancelButtonAnimation = Animated.parallel([
    Animated.timing(rotateButtonAnim, {
      toValue: 1,
      duration: 150,
      easing: Easing.bounce,
      useNativeDriver: true,
    }),
  ]);

  const rotateToAddButtonAnimation = Animated.parallel([
    Animated.timing(rotateButtonAnim, {
      toValue: 0,
      duration: 150,
      easing: Easing.bounce,
      useNativeDriver: true,
    }),
  ]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (!isStrokeMenuOpen) {
      rotateToAddButtonAnimation.start();
    } else {
      rotateToCancelButtonAnimation.start();
    }
  }, [isStrokeMenuOpen]);

  const handleStrokeMenuToggle = () => {
    setIsStrokeMenuOpen(!isStrokeMenuOpen);
  };

  return (
    <View style={styles.strokeMenu}>
      <Animated.View
        style={{
          ...styles.strokeButtonContainer,
          transform: [{ rotateZ: rotateInterpolate }],
        }}
      >
        <TouchComp onPress={handleStrokeMenuToggle}>
          <Ionicons
            name="add-circle-sharp"
            color={isStrokeMenuOpen ? AppColors.red : AppColors.accent}
            style={styles.strokeButton}
            size={55}
          />
        </TouchComp>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  strokeMenu: {
    width: "20%",
    position: "relative",
    alignItems: "center",
  },
  strokeButtonContainer: {
    position: "absolute",
    flexDirection: "row",
    width: 50,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  strokeButton: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StrokeMenuToggleButton;
