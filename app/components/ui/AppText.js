import React from "react";
import { Text, StyleSheet } from "react-native";

export const BodyText = (props) => {
  const { color, size, centered, width } = props;
  return (
    <Text
      {...props}
      style={{
        ...styles.subHeader,
        ...props.style,
        ...(props.capitalize ? styles.capitalize : {}),
        ...(color ? { color: color } : {}),
        ...(size ? { fontSize: size } : {}),
        ...(width ? { width: width } : {}),
        ...(centered ? { textAlign: "center" } : {}),
      }}
    >
      {props.children}
    </Text>
  );
};

export const SubHeaderText = (props) => {
  const { color, size, centered, width } = props;

  return (
    <Text
      {...props}
      style={{
        ...styles.subHeader,
        ...props.style,
        ...(props.capitalize ? styles.capitalize : {}),
        ...(color ? { color: color } : {}),
        ...(size ? { fontSize: size } : {}),
        ...(width ? { width: width } : {}),
        ...(centered ? { textAlign: "center" } : {}),
      }}
    >
      {props.children}
    </Text>
  );
};

export const HeaderText = (props) => {
  const { color, size, centered, width } = props;

  return (
    <Text
      {...props}
      style={{
        ...styles.subHeader,
        ...props.style,
        ...(props.capitalize ? styles.capitalize : {}),
        ...(color ? { color: color } : {}),
        ...(size ? { fontSize: size } : {}),
        ...(width ? { width: width } : {}),
        ...(centered ? { textAlign: "center" } : {}),
      }}
    >
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  body: {
    fontFamily: "TitilliumWeb_400Regular",
    fontSize: 16,
  },
  subHeader: {
    fontFamily: "TitilliumWeb_600SemiBold",
    fontSize: 18,
  },
  header: {
    fontFamily: "TitilliumWeb_700Bold",
    fontSize: 21,
  },
  capitalize: {
    textTransform: "capitalize",
  },
});
