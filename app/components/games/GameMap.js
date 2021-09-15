import React, { useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { SubHeaderText } from "../ui/AppText";

const GameMap = (props) => {
  const { holeData } = props;
  const mapRef = useRef();
  const mapRegion = {
    latitude: holeData.center.lat,
    longitude: holeData.center.lng,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };
  useEffect(() => {
    console.log("MAP HOLE DATA", holeData);
    mapRef.current.setMapBoundaries(
      {
        latitude: holeData.center.lat + 0.0005,
        longitude: holeData.center.lng - 0.0005,
      },
      {
        latitude: holeData.center.lat - 0.0005,
        longitude: holeData.center.lng + 0.0005,
      }
    );
  }, []);

  return (
    <MapView
      ref={mapRef}
      region={mapRegion}
      style={styles.map}
      minZoomLevel={18} // default => 0
      maxZoomLevel={22} // default => 20
      mapType="satellite"
      scrollEnabled={true}
    />
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default GameMap;
