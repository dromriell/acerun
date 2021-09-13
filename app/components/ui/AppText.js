import React from "react";
import { Text, StyleSheet } from "react-native";

export const BodyText = (props) => {
  return (
    <Text
      {...props}
      style={{
        ...styles.body,
        ...props.style,
        ...(props.capitalize ? styles.capitalize : {}),
      }}
    >
      {props.children}
    </Text>
  );
};

export const SubHeaderText = (props) => {
  return (
    <Text
      {...props}
      style={{
        ...styles.subHeader,
        ...props.style,
        ...(props.capitalize ? styles.capitalize : {}),
      }}
    >
      {props.children}
    </Text>
  );
};

export const HeaderText = (props) => {
  return (
    <Text
      {...props}
      style={{
        ...styles.header,
        ...props.style,
        ...(props.capitalize ? styles.capitalize : {}),
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
