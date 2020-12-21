import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Picker } from "@react-native-picker/picker";

const CustomPicker = (props) => {
  const [value, setValue] = useState(props.selectedValue);
  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <Picker
        selectedValue={value}
        style={{ height: 50, width: "100%" }}
        onValueChange={(newValue) => {
          setValue(newValue);
          props.onValueChange(newValue);
        }}
      >
        {props.data.map((value, index) => (
          <Picker.Item key={index} label={value.name} value={value.value} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    color: "black",
    marginVertical: 8,
  },
});

export default CustomPicker;
