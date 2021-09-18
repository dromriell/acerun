import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Dimensions, Animated } from "react-native";

import AppColors from "../../../utils/AppColors";

import { HeaderText, SubHeaderText, BodyText } from "../../ui/AppText";
import { TouchComp } from "../../ui/TouchComp";

const screenWidth = Dimensions.get("screen").width;

const StrokeMenu = (props) => {
  const { isStrokeMenuOpen } = props;

  useEffect(() => {
    handleStrokeMenuToggle(isStrokeMenuOpen);
  }, [isStrokeMenuOpen]);

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
      duration: 500,
      useNativeDriver: true,
    }),
    Animated.timing(strokeYTranslateAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }),
  ]);

  const holeBubbleHideAnimation = Animated.parallel([
    Animated.timing(holeYTranslateAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }),
  ]);

  const penaltyBubbleHideAnimation = Animated.parallel([
    Animated.timing(penaltyXTranslateAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }),
    Animated.timing(penaltyYTranslateAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }),
  ]);

  // Bubble Show Animations
  const strokeBubbleShowAnimation = Animated.parallel([
    Animated.timing(strokeXTranslateAnim, {
      toValue: screenWidth * 0.33,
      duration: 250,
      useNativeDriver: true,
    }),
    Animated.timing(strokeYTranslateAnim, {
      toValue: -120,
      duration: 250,
      useNativeDriver: true,
    }),
  ]);

  const holeBubbleShowAnimation = Animated.parallel([
    Animated.timing(holeYTranslateAnim, {
      toValue: -160,
      duration: 300,
      useNativeDriver: true,
    }),
  ]);

  const penaltyBubbleShowAnimation = Animated.parallel([
    Animated.timing(penaltyXTranslateAnim, {
      toValue: -screenWidth * 0.33,
      duration: 350,
      useNativeDriver: true,
    }),
    Animated.timing(penaltyYTranslateAnim, {
      toValue: -120,
      duration: 350,
      useNativeDriver: true,
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

  const handleStrokeMenuToggle = () => {
    console.log("CHECK STATUS", isStrokeMenuOpen);
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
          <TouchComp useForeground>
            <View style={styles.bubble}>
              <SubHeaderText>STROKE</SubHeaderText>
            </View>
          </TouchComp>
        </Animated.View>
        <Animated.View
          style={{
            ...styles.bubbleContainer,
            ...styles.bubbleHole,
            transform: [{ translateY: holeYTranslateAnim }],
          }}
        >
          <TouchComp useForeground>
            <View style={styles.bubble}>
              <SubHeaderText>HOLE</SubHeaderText>
            </View>
          </TouchComp>
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
          <TouchComp useForeground>
            <View style={styles.bubble}>
              <SubHeaderText>PENALTY</SubHeaderText>
            </View>
          </TouchComp>
        </Animated.View>
      </View>
    </Animated.View>
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
    borderColor: AppColors.blue,
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
