import React from "react";
import { View, Switch, StyleSheet } from "react-native";

import { BodyText } from "./AppText";

const Toggle = (props) => {
  const {
    labelLeft,
    labelRight,
    trackColor,
    thumbColor,
    value,
    onValueChange,
    labelColor,
    style,
  } = props;
  return (
    <View style={{ ...styles.toggleContainer, ...style }}>
      <BodyText style={styles.text} color={labelColor}>
        {labelLeft}
      </BodyText>
      <View style={styles.toggle}>
        <Switch
          trackColor={trackColor}
          thumbColor={thumbColor}
          onValueChange={onValueChange}
          value={value}
          iosBackgroundColor={trackColor}
        />
      </View>
      <BodyText style={styles.text} color={labelColor}>
        {labelRight}
      </BodyText>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    height: "70%",
    transform: [{ rotateZ: "90deg" }, { scaleX: 1 }, { scaleY: 0.9 }],
  },
  toggle: {
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    transform: [{ rotateZ: "-90deg" }, { scaleY: 0.7 }, { scaleX: 1 }],
    paddingHorizontal: 5,
  },
});

export default Toggle;
