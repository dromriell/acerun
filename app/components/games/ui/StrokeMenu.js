import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  Pressable,
} from "react-native";

import AppColors from "../../../utils/AppColors";

import { SubHeaderText } from "../../ui/AppText";

const screenWidth = Dimensions.get("screen").width;

const StrokeMenu = (props) => {
  const { isStrokeMenuOpen, handleStrokeRecord } = props;

  useEffect(() => {
    handleStrokeMenuToggle(isStrokeMenuOpen);
  }, [isStrokeMenuOpen]);

  //#region ~~~~~ ANIMATIONS ~~~~~

  // Animation values for bubble field
  const yscale = useRef(new Animated.Value(0)).current;
  const yTranslateAnim = useRef(new Animated.Value(0)).current;
  const zIndexAnim = useRef(new Animated.Value(0)).current;

  // Bubble animation values
  const strokeYTranslateAnim = useRef(new Animated.Value(0)).current;
  const strokeXTranslateAnim = useRef(new Animated.Value(0)).current;

  const holeYTranslateAnim = useRef(new Animated.Value(0)).current;

  const penaltyYTranslateAnim = useRef(new Animated.Value(0)).current;
  const penaltyXTranslateAnim = useRef(new Animated.Value(0)).current;

  //Bubble hide animations
  const strokeBubbleHideAnimation = Animated.parallel([
    Animated.timing(strokeXTranslateAnim, {
      toValue: 0,
      duration: 400,
      easing: Easing.back(),
      useNativeDriver: true,
    }),
    Animated.timing(strokeYTranslateAnim, {
      toValue: 0,
      duration: 400,
      easing: Easing.back(),
      useNativeDriver: true,
    }),
  ]);

  const holeBubbleHideAnimation = Animated.parallel([
    Animated.timing(holeYTranslateAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }),
  ]);

  const penaltyBubbleHideAnimation = Animated.parallel([
    Animated.timing(penaltyXTranslateAnim, {
      toValue: 0,
      duration: 400,
      easing: Easing.back(),
      useNativeDriver: true,
    }),
    Animated.timing(penaltyYTranslateAnim, {
      toValue: 0,
      duration: 400,
      easing: Easing.back(),
      useNativeDriver: true,
    }),
  ]);

  // Bubble Show Animations
  const strokeBubbleShowAnimation = Animated.parallel([
    Animated.timing(strokeXTranslateAnim, {
      toValue: screenWidth * 0.33,
      duration: 400,
      useNativeDriver: true,
      easing: Easing.elastic(0.9),
    }),
    Animated.timing(strokeYTranslateAnim, {
      toValue: -120,
      duration: 400,
      useNativeDriver: true,
      easing: Easing.elastic(0.0),
    }),
  ]);

  const holeBubbleShowAnimation = Animated.parallel([
    Animated.timing(holeYTranslateAnim, {
      toValue: -160,
      duration: 450,
      useNativeDriver: true,
      easing: Easing.bounce,
    }),
  ]);

  const penaltyBubbleShowAnimation = Animated.parallel([
    Animated.timing(penaltyXTranslateAnim, {
      toValue: -screenWidth * 0.33,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.elastic(0.9),
    }),
    Animated.timing(penaltyYTranslateAnim, {
      toValue: -120,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.elastic(0.1),
    }),
  ]);

  const hideMenu = () => {
    Animated.sequence([
      Animated.parallel([
        strokeBubbleHideAnimation,
        holeBubbleHideAnimation,
        penaltyBubbleHideAnimation,
      ]),
      Animated.parallel([
        Animated.timing(yTranslateAnim, {
          toValue: 75,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(yscale, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(zIndexAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  const showMenu = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(yTranslateAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(yscale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(zIndexAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        strokeBubbleShowAnimation,
        holeBubbleShowAnimation,
        penaltyBubbleShowAnimation,
      ]),
    ]).start();
  };
  //#endregion

  const handleStrokeMenuToggle = () => {
    if (isStrokeMenuOpen) {
      showMenu();
    } else {
      hideMenu();
    }
  };

  return (
    <Animated.View
      style={{
        ...styles.container,
        transform: [
          { translateY: yTranslateAnim },
          { scaleY: yscale },
          //  { rotateZ: interpolateRotation },
        ],
        zIndex: zIndexAnim,
      }}
    >
      <View style={styles.bubbleField}>
        <Animated.View
          style={{
            ...styles.bubbleContainer,
            ...styles.bubbleStroke,
            transform: [
              { translateX: strokeXTranslateAnim },
              { translateY: strokeYTranslateAnim },
            ],
          }}
        >
          <MenuBubble onPressComplete={handleStrokeRecord} type="STROKE" />
        </Animated.View>
        <Animated.View
          style={{
            ...styles.bubbleContainer,
            ...styles.bubbleHole,
            transform: [{ translateY: holeYTranslateAnim }],
          }}
        >
          <MenuBubble onPressComplete={handleStrokeRecord} type="HOLE" />
        </Animated.View>
        <Animated.View
          style={{
            ...styles.bubbleContainer,
            ...styles.bubblePenalty,
            transform: [
              { translateX: penaltyXTranslateAnim },
              { translateY: penaltyYTranslateAnim },
            ],
          }}
        >
          <MenuBubble onPressComplete={handleStrokeRecord} type="PENALTY" />
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const MenuBubble = (props) => {
  const { type, onPressComplete } = props;
  // Bubble animation values
  const scaleXAnim = useRef(new Animated.Value(0)).current;
  const scaleYAnim = useRef(new Animated.Value(0)).current;

  const overlayGrowAnimation = Animated.parallel([
    Animated.timing(scaleXAnim, {
      toValue: 1,
      duration: 970,
      easing: Easing.elastic(),
      useNativeDriver: true,
    }),
    Animated.timing(scaleYAnim, {
      toValue: 1,
      duration: 970,
      easing: Easing.elastic(),
      useNativeDriver: true,
    }),
  ]);

  const overlayShrinkAnimation = Animated.parallel([
    Animated.timing(scaleXAnim, {
      toValue: 0,
      duration: 150,
      easing: Easing.back(),
      useNativeDriver: true,
    }),
    Animated.timing(scaleYAnim, {
      toValue: 0,
      duration: 150,
      easing: Easing.back(),
      useNativeDriver: true,
    }),
  ]);

  return (
    <Pressable
      onPressIn={() => {
        overlayGrowAnimation.start();
      }}
      delayLongPress={600}
      onLongPress={() => onPressComplete(type)}
      onPressOut={() => {
        overlayShrinkAnimation.start();
      }}
    >
      <View style={styles.bubble}>
        <Animated.View
          style={{
            width: "100%",
            position: "absolute",
            height: "100%",
            opacity: 0.5,
            borderRadius: 100,
            backgroundColor: AppColors.primary,
            transform: [{ scaleX: scaleXAnim }, { scaleY: scaleYAnim }],
          }}
        ></Animated.View>
        <SubHeaderText>{type}</SubHeaderText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 166,
    left: 0,
    alignItems: "center",
    height: 150,
    width: "100%",
    overflow: "hidden",
  },
  bubbleField: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  bubbleContainer: {
    position: "absolute",
    borderRadius: 100,
    overflow: "hidden",
  },
  bubble: {
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: AppColors.accent,
    borderColor: AppColors.primary,
    borderWidth: 2,
    overflow: "hidden",
  },
  bubbleStroke: {
    flex: 1,
    left: screenWidth * 0.5 - 40,
    bottom: -100,
  },
  bubbleHole: {
    bottom: -100,
    left: screenWidth * 0.5 - 40,
  },
  bubblePenalty: {
    left: screenWidth * 0.5 - 40,
    bottom: -100,
  },
});

export default StrokeMenu;
