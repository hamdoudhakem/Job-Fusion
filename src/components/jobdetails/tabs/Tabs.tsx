import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

import styles from "./tabs.style";
import { COLORS, SIZES } from "../../../constants";

const TabButton = ({
  name,
  activeTab,
  onHandleSearchType,
}: {
  name: string;
  activeTab: string;
  onHandleSearchType: (item: string) => void;
}) => (
  <TouchableOpacity
    style={[
      styles.btn,
      {
        backgroundColor: name === activeTab ? COLORS.primary : "#F3F4F8",
        marginBottom: 5,
        marginTop: 3,
        marginRight: 3,
        marginLeft: 4,
      },
    ]}
    onPress={() => onHandleSearchType(name)}
  >
    <Text
      style={[
        styles.btnText,
        { color: name === activeTab ? "#C3BFCC" : "#AAA9B8" },
      ]}
    >
      {name}
    </Text>
  </TouchableOpacity>
);

const Tabs = ({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: string[];
  activeTab: string;
  setActiveTab: (item: string) => void;
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        renderItem={({ item }) => (
          <TabButton
            name={item}
            activeTab={activeTab}
            onHandleSearchType={() => setActiveTab(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        contentContainerStyle={{ columnGap: SIZES.small / 2 }}
      />
    </View>
  );
};

export default Tabs;
