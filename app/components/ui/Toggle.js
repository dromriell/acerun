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
      <BodyText color={labelColor}>{labelLeft}</BodyText>
      <View style={styles.toggle}>
        <Switch
          trackColor={trackColor}
          thumbColor={thumbColor}
          onValueChange={onValueChange}
          value={value}
        />
      </View>
      <BodyText color={labelColor}>{labelRight}</BodyText>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "20%",
  },
  toggle: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Toggle;
