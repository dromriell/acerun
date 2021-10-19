import React from "react";
import { View, StyleSheet } from "react-native";
import { BodyText } from "./AppText";
import AppColors from "../../utils/AppColors";

const UpdateBadge = (props) => {
  const { message, color, size } = props;
  return (
    <View style={{ ...styles.updateBadge, ...props.style }}>
      <BodyText color={color} size={size}>
        {message}
      </BodyText>
    </View>
  );
};

const styles = StyleSheet.create({
  updateBadge: {
    position: "absolute",
    width: "75%",
    alignItems: "center",
    top: 20,
    backgroundColor: AppColors.accent,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    zIndex: 200,
  },
});

export default UpdateBadge;
