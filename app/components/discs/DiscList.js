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
      const discData = disc.disc ? disc.disc : disc;
      return discData.type === discTypes[discType];
    });
    setDiscs(filteredDiscs);
  };

  const handleDiscSelect = (id, discData) => {
    if (props.onDiscSelect) {
      props.onDiscSelect(discData);
      return;
    }
    props.navigation.navigate("DiscDetail", {
      discId: id,
      userDiscId: discData.id,
    });
  };

  const renderDiscs = (itemData) => {
    const discDataId = itemData.item.disc
      ? itemData.item.disc.id
      : itemData.item.id;
    return (
      <DiscItem
        key={discDataId}
        discData={itemData.item}
        onPress={() => handleDiscSelect(discDataId, itemData.item)}
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
    flex: 1,
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
