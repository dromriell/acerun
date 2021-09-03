import React from "react";
import { StyleSheet, View } from "react-native";
import {
  VictoryArea,
  VictoryBar,
  VictoryPolarAxis,
  VictoryChart,
  VictoryTheme,
} from "victory-native";
import AppColors from "../../utils/AppColors";

const DiscRatingChart = (props) => {
  return (
    <View style={styles.container}>
      <VictoryChart polar theme={VictoryTheme.material}>
        {["Speed", "Glide", "Turn", "Fade"].map((d, i) => {
          return (
            <VictoryPolarAxis
              dependentAxis
              key={i}
              label={d}
              labelPlacement="perpendicular"
              style={{
                tickLabels: { fill: "none" },
                grid: { stroke: AppColors.accent },
              }}
              axisValue={d}
            />
          );
        })}
        <VictoryArea
          style={{ data: { fill: AppColors.primaryTrans, width: 25 } }}
          data={[
            { x: "Turn", y: 0.3 },
            { x: "Glide", y: 0.4 },
            { x: "Fade", y: 0.4 },
            { x: "Speed", y: 0.8 },
          ]}
        />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DiscRatingChart;
