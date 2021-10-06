import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";

import { BodyText, SubHeaderText } from "../ui/AppText";

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
      // region={mapRegion}
      style={styles.map}
      minZoomLevel={18} // default => 0
      maxZoomLevel={22} // default => 20
      mapType="satellite"
      scrollEnabled={true}
      camera={camera}
    >
      <Marker coordinate={{ latitude: basket.lat, longitude: basket.lng }}>
        <Image
          source={require("../../assets/icons/map/disc-golf-basket.png")}
          resizeMethod="resize"
          resizeMode="contain"
          style={{ height: 40, width: 40 }}
        />
      </Marker>
      <Marker coordinate={{ latitude: tee_box.lat, longitude: tee_box.lng }}>
        <Image
          source={require("../../assets/icons/map/thrust-bend.png")}
          resizeMethod="scale"
          resizeMode="contain"
          style={{ height: 35, width: 35 }}
        />
      </Marker>
      {currentStrokes.map((stroke, i) => {
        const strokeIcon =
          stroke.throw === "penalty"
            ? "../../assets/icons/map/penalty.png"
            : "../../assets/icons/map/stroke.png";
        return (
          <Marker
            key={`stroke-${i}`}
            coordinate={{
              latitude: stroke.lat,
              longitude: stroke.lng,
            }}
          >
            {stroke.throw === "penalty" ? (
              <Image
                source={require("../../assets/icons/map/penalty.png")}
                resizeMethod="resize"
                resizeMode="contain"
                style={{ height: 30, width: 30 }}
              />
            ) : (
              <Image
                source={require("../../assets/icons/map/stroke.png")}
                resizeMethod="resize"
                resizeMode="contain"
                style={{ height: 30, width: 30 }}
              />
            )}
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
});

export default GameMap;
