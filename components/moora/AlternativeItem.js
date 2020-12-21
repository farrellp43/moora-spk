import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../../constants/Colors";

const AlternativeItem = (props) => {
  return (
    <View style={styles.itemContainer}>
      {/* <TouchableOpacity style={{ flex: 1 }}> */}
      <TouchableOpacity
        onPress={props.onSelect}
        onLongPress={props.onLongSelect}
        style={{ flex: 1 }}
      >
        <View style={styles.alternativeItem}>
          <View style={styles.itemId}>
            {/* <Text style={styles.id}>{props.id}</Text> */}
          </View>
          <View style={styles.actions}>
            <View style={styles.itemTitle}>
              <Text style={styles.title}>{props.title}</Text>
            </View>
            <View>{props.children}</View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "white",
    height: 50,
    width: "100%",
    marginVertical: 10,
    elevation: 1,
    borderRadius: 25,
    overflow: "hidden",
  },
  alternativeItem: {
    flexDirection: "row",
    marginTop: 5,
    marginLeft: 5,
  },
  itemId: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryColor,
    justifyContent: "center",
    alignItems: "center",
  },
  id: {
    fontSize: 18,
    color: "white",
    fontFamily: "open-sans-bold",
  },
  itemTitle: {
    marginLeft: 10,
    justifyContent: "center",
  },
  title: {
    fontFamily: "open-sans",
    fontSize: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default AlternativeItem;
