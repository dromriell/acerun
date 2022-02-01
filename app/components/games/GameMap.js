import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Image, Platform } from "react-native";
import { useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";

import { BodyText, SubHeaderText } from "../ui/AppText";
import AppColors from "../../utils/AppColors";

const GameMap = (props) => {
  const { holeData, currentStrokes } = props;
  const { tee_box, center, basket } = holeData;

  const mapRef = useRef();
  const mapRegion = {
    latitude: holeData.center.lat,
    longitude: holeData.center.lng,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const camera = {
    center: {
      latitude: holeData.center.lat,
      longitude: holeData.center.lng,
    },
    pitch: 10,
    heading: holeData.heading,
    zoom: 18,
    altitude: 50,
  };

  useEffect(() => {
      if (!mapRef || !center || Platform.OS === 'ios') {
          return
      }
    mapRef.current.setMapBoundaries(
      {
        latitude: center.lat + 0.0005,
        longitude: center.lng - 0.0005,
      },
      {
        latitude: center.lat - 0.0005,
        longitude: center.lng + 0.0005,
      }
    );
  }, [center]);

  return (
    <MapView
      ref={mapRef}
      region={mapRegion}
      style={styles.map}
      minZoomLevel={18} // default => 0
      maxZoomLevel={22} // default => 20
      mapType="satellite"
      scrollEnabled={true}
      camera={camera}
    >
      <Marker
        coordinate={{ latitude: basket.lat, longitude: basket.lng }}
        tracksViewChanges={false}
        image={require("../../assets/icons/map/basketIcon.png")}
      />
      <Marker
        coordinate={{ latitude: tee_box.lat, longitude: tee_box.lng }}
        tracksViewChanges={false}
        image={require("../../assets/icons/map/teeBoxIcon.png")}
      />
      {currentStrokes.map((stroke, i) => {
        return (
          <Marker
            key={`stroke-${i}`}
            tracksViewChanges={false}
            coordinate={{
              latitude: stroke.lat,
              longitude: stroke.lng,
            }}
            image={
              stroke.type === "penalty"
                ? require("../../assets/icons/map/penaltyIcon.png")
                : require("../../assets/icons/map/strokeIcon.png")
            }
          >
            <BodyText
              color={AppColors.white}
              size={18}
              style={styles.strokeMarker}
            >
              {i + 1}
            </BodyText>
          </Marker>
        );
      })}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  markerIcon: {
    height: 15,
    width: 15,
    resizeMode: "contain",
  },
  strokeMarker: {
    width: 40,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default GameMap;
