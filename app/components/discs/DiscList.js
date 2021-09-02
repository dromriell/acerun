import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";

import DiscListHeader from "./DiscListHeader";
import DiscItem from "./DiscItem";

const discTypes = {
  dist: "dist_dr",
  frwy: "frwy_dr",
  mid: "mid",
  putt: "putt",
};

const DiscList = (props) => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [discs, setDiscs] = useState(props.data);

  const handleFilterSelect = (discType) => {
    setSelectedFilter(discType);
    if (discType === "all") {
      setDiscs(props.data);
      return;
    }
    const filteredDiscs = props.data.filter((disc) => {
      return disc.disc.type === discTypes[discType];
    });
    setDiscs(filteredDiscs);
  };

  const handleDiscSelect = (discData) => {
    props.navigation.navigate("DiscDetail", {
      discAction: {
        status: props.listType,
      },
      discData: discData,
    });
  };

  const renderDiscs = (itemData) => {
    const discData = itemData.item;
    return (
      <DiscItem
        discName={discData.disc.name}
        imageUri={discData.disc.img_url}
        onPress={() => handleDiscSelect(discData)}
      />
    );
  };

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={discs}
        renderItem={renderDiscs}
        style={styles.discList}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.listRow}
        ListHeaderComponent={
          <DiscListHeader
            selectedFilter={selectedFilter}
            onPress={handleFilterSelect}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  discList: {
    width: "100%",
  },
  listRow: {
    flex: 1,
    justifyContent: "space-around",
  },
});

export default DiscList;
