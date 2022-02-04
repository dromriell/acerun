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

const ratingConstants = {
  max: {
    turn: 0,
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
    turn: [0, -2, -5],
    fade: [0, 2.5, 5],
  },
};

/**
 * Normalizes disc flight ratings to be used and displayed
 * on a DiscRatingChart (radar chart).
 */
const normalizeFlightRatings = (flightData) => {
  const normalizedFlightData = flightData.map((discRating) => {
    return Object.keys(discRating).map((key) => {
      const ratingRange =
        key !== "turn"
          ? ratingConstants.max[key] + 1 - ratingConstants.min[key]
          : ratingConstants.max[key] - 1 + ratingConstants.min[key];
      // Add 0.25 to value as padding for display on chart. Prevents values
      // from overlapping at the axis centers.
      const value = discRating[key] / ratingRange + 0.25;
      return { x: key, y: value };
    });
  });
  return normalizedFlightData;
};

const DiscRatingChart = (props) => {
  const { data } = props;
  const discsData =
    data.length > 0
      ? data.map((disc) => {
          return {
            turn: disc.turn,
            glide: disc.glide,
            fade: disc.fade,
            speed: disc.speed,
          };
        })
      : [{ turn: 0, glide: 0, fade: 0, speed: 0 }];

  const discChartData = normalizeFlightRatings(discsData);
  const maxima = ratingConstants.max;

  return (
    <View style={styles.container}>
      <VictoryChart
        polar
        theme={VictoryTheme.material}
        domain={{ y: [0, 1.25] }}
      >
        <VictoryGroup
          colorScale={
            data.length > 0
              ? [AppColors.accent, "orange", "tomato"]
              : [AppColors.grey]
          }
          style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
        >
          {discChartData.map((disc, i) => {
            return <VictoryArea key={i} data={disc} />;
          })}
        </VictoryGroup>
        {Object.keys(maxima).map((key, i) => {
          return (
            <VictoryPolarAxis
              maxDomain={ratingConstants.max[key]}
              minDomain={ratingConstants.min[key]}
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
                return ratingConstants.ticks[key][i];
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
