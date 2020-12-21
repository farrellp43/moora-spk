import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import HeaderButton from "../../components/UI/HeaderButton";
import * as alternativeActions from "../../store/actions/alternative";
import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";
import CustomPicker from "../../components/UI/Pick";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const EditAlternativeScreen = (props) => {
  // console.log(props);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [akses, setAkses] = useState();

  const altId = props.navigation.getParam("alternativeId");
  const editedAlternative = useSelector((state) =>
    state.alternative.availableAlternatives.find(
      (alt) => alt.id_alternatif === altId
    )
  );
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      nama: editedAlternative ? editedAlternative.alternatif : "",
      vegetasi: editedAlternative ? editedAlternative.vegetasi_area : "",
      volume: editedAlternative ? editedAlternative.volume_material : "",
      luas: editedAlternative ? editedAlternative.luas : "",
      tampungan: editedAlternative ? editedAlternative.volume_tampungan : "",
      operasi: editedAlternative ? editedAlternative.lama_operasi : "",
      harga: editedAlternative ? editedAlternative.harga_air : "",
      akses: editedAlternative ? editedAlternative.akses_jalan : "",
    },
    inputValidities: {
      nama: editedAlternative ? true : false,
      vegetasi: editedAlternative ? true : false,
      volume: editedAlternative ? true : false,
      luas: editedAlternative ? true : false,
      tampungan: editedAlternative ? true : false,
      operasi: editedAlternative ? true : false,
      harga: editedAlternative ? true : false,
      akses: editedAlternative ? true : false,
    },
    formIsValid: editedAlternative ? true : false,
  });

  // console.log(formState);
  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  useEffect(() => {
    if (akses) {
      Alert.alert(`HAHAHA : ${akses}`);
    }
  }, [akses]);

  const submitHandler = useCallback(async () => {
    console.log(akses);
    // if (!formState.formIsValid) {
    //   Alert.alert("Wrong input!", "Please check your input again!", [
    //     { text: "Okay" },
    //   ]);
    //   return;
    // }
    setError(null);
    setIsLoading(true);
    try {
      if (editedAlternative) {
        await dispatch(
          alternativeActions.updateAlternative(
            altId,
            formState.inputValues.nama,
            +formState.inputValues.vegetasi,
            +formState.inputValues.volume,
            +formState.inputValues.luas,
            +formState.inputValues.tampungan,
            +formState.inputValues.operasi,
            +formState.inputValues.harga,
            akses
          )
        );
      } else {
        await dispatch(
          alternativeActions.createAlternative(
            formState.inputValues.nama,
            +formState.inputValues.vegetasi,
            +formState.inputValues.volume,
            +formState.inputValues.luas,
            +formState.inputValues.tampungan,
            +formState.inputValues.operasi,
            +formState.inputValues.harga,
            akses
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch, altId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  // console.log(editedAlternative);
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.form}>
      {/* <View style={styles.form}> */}
      <Input
        id="nama"
        label="Nama Alternatif"
        errorText="Please enter a valid name!"
        keyboardType="default"
        autoCapitalize="sentences"
        returnKeyType="next"
        onInputChange={inputChangeHandler}
        initialValue={editedAlternative ? editedAlternative.alternatif : ""}
        initiallyValid={!!editedAlternative}
        required
      />
      <Input
        id="vegetasi"
        label="Vegetasi Area"
        errorText="Please enter a valid number!"
        keyboardType="decimal-pad"
        returnKeyType="next"
        onInputChange={inputChangeHandler}
        initialValue={editedAlternative ? editedAlternative.vegetasi_area : ""}
        initiallyValid={!!editedAlternative}
        required
        min={1}
        max={5}
        maxLength={1}
      />
      <Input
        id="volume"
        label="Volume Material"
        errorText="Please enter a valid number!"
        keyboardType="decimal-pad"
        returnKeyType="next"
        onInputChange={inputChangeHandler}
        initialValue={
          editedAlternative ? editedAlternative.volume_material : ""
        }
        initiallyValid={!!editedAlternative}
        required
        min={1}
        max={5}
        maxLength={1}
      />
      <Input
        id="luas"
        label="Luas"
        errorText="Please enter a valid number!"
        keyboardType="decimal-pad"
        returnKeyType="next"
        onInputChange={inputChangeHandler}
        initialValue={editedAlternative ? editedAlternative.luas : ""}
        initiallyValid={!!editedAlternative}
        required
        min={1}
        max={5}
        maxLength={1}
      />
      <Input
        id="tampungan"
        label="Volume Tampungan"
        errorText="Please enter a valid number!"
        keyboardType="decimal-pad"
        returnKeyType="next"
        onInputChange={inputChangeHandler}
        initialValue={
          editedAlternative ? editedAlternative.volume_tampungan : ""
        }
        initiallyValid={!!editedAlternative}
        required
        min={1}
        max={5}
        maxLength={1}
      />
      <Input
        id="operasi"
        label="Lama Operasi"
        errorText="Please enter a valid number!"
        keyboardType="decimal-pad"
        returnKeyType="next"
        onInputChange={inputChangeHandler}
        initialValue={editedAlternative ? editedAlternative.lama_operasi : ""}
        initiallyValid={!!editedAlternative}
        required
        min={1}
        max={5}
        maxLength={1}
      />
      <Input
        id="harga"
        label="Harga Air/m3"
        errorText="Please enter a valid number!"
        keyboardType="decimal-pad"
        returnKeyType="next"
        onInputChange={inputChangeHandler}
        initialValue={editedAlternative ? editedAlternative.harga_air : ""}
        initiallyValid={!!editedAlternative}
        required
        min={1}
        max={5}
        maxLength={1}
      />
      {/* <Input
        id="akses"
        label="Akses Jalan"
        errorText="Please enter a valid number!"
        keyboardType="decimal-pad"
        onInputChange={inputChangeHandler}
        initialValue={editedAlternative ? editedAlternative.akses_jalan : ""}
        initiallyValid={!!editedAlternative}
        required
        min={1}
        max={5}
        maxLength={1}
      /> */}
      <CustomPicker
        label="Akses Jalan"
        data={[
          {
            name: "tersedia jalan aspal sampai site",
            value: 1,
          },
          {
            name: "jalan makadam/tanah sampai site",
            value: 2,
          },
          {
            name: "jalan setapak",
            value: 3,
          },
          {
            name: "tidak tersedia jalan",
            value: 4,
          },
        ]}
        onValueChange={(value) => {
          setAkses(value);
        }}
        selectedValue={editedAlternative ? editedAlternative.akses_jalan : null}
      />
      {/* </View> */}
    </ScrollView>
  );
};

EditAlternativeScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("alternativeId")
      ? "Edit Alternative"
      : "Add Alternative",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditAlternativeScreen;
