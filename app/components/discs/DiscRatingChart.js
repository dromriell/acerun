import React from "react";
import { StyleSheet, View } from "react-native";
import {
  VictoryArea,
  VictoryGroup,
  VictoryPolarAxis,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
} from "victory-native";
import AppColors from "../../utils/AppColors";

const flightValueRanges = {
  max: {
    turn: 1,
    glide: 7,
    fade: 5,
    speed: 14,
  },
  min: {
    speed: 1,
    glide: 1,
    turn: -5,
    fade: 0,
  },
  ticks: {
    speed: [1, 7, 14],
    glide: [1, 3.5, 7],
    turn: [1, -2, -5],
    fade: [0, 2.5, 5],
  },
};

const discsData = [
  { turn: 1, glide: 4, fade: 0, speed: 11 },
  { turn: -2.5, glide: 4, fade: 1, speed: 7 },
];

const processData = (data) => {
  const makeDataArray = (d) => {
    return Object.keys(d).map((key) => {
      const valueCount =
        flightValueRanges.max[key] + 1 - flightValueRanges.min[key];
      const value =
        key !== "turn" ? d[key] / valueCount : 1 - (d[key] + 6) / valueCount;
      console.log(key, d[key], value);
      return { x: key, y: value + 0.25 };
    });
  };
  return data.map((datum) => makeDataArray(datum));
};

const DiscRatingChart = (props) => {
  const data = processData(discsData);
  const maxima = flightValueRanges.max;
  const minima = flightValueRanges.min;

  return (
    <View style={styles.container}>
      <VictoryChart
        polar
        theme={VictoryTheme.material}
        domain={{ y: [0, 1.25] }}
      >
        <VictoryGroup
          colorScale={[AppColors.accent, "orange", "tomato"]}
          style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
        >
          {data.map((data, i) => {
            return <VictoryArea key={i} data={data} />;
          })}
        </VictoryGroup>
        {Object.keys(maxima).map((key, i) => {
          return (
            <VictoryPolarAxis
              maxDomain={flightValueRanges.max[key]}
              minDomain={flightValueRanges.min[key]}
              key={i}
              dependentAxis
              style={{
                axisLabel: { padding: 25, fill: AppColors.white },
                axis: {
                  stroke: AppColors.primary,
                  strokeWidth: 0.5,
                  opacity: 0.8,
                },
                grid: {
                  stroke: AppColors.primary,
                  strokeWidth: 0.7,
                  opacity: 0.5,
                },
              }}
              tickLabelComponent={
                <VictoryLabel
                  labelPlacement="vertical"
                  style={{ fill: AppColors.white }}
                />
              }
              labelPlacement="perpendicular"
              axisValue={i + 1}
              label={key.toUpperCase()}
              tickFormat={(t, i) => {
                return flightValueRanges.ticks[key][i];
              }}
              tickValues={[0.25, 0.75, 1.25]}
            />
          );
        })}
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "black",
    borderRadius: 200,
  },
});

export default DiscRatingChart;
