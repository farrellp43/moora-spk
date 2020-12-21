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
import * as criteriaActions from "../../store/actions/criteria";
import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";

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

const EditCriteriaScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const criId = props.navigation.getParam("criteriaId");
  const editedCriteria = useSelector((state) =>
    state.criteria.availableCriterias.find((cri) => cri.id_kriteria === criId)
  );
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      nama: editedCriteria ? editedCriteria.kriteria : "",
      tipe: editedCriteria ? editedCriteria.tipe : "",
      bobot: editedCriteria ? editedCriteria.bobot : "",
    },
    inputValidities: {
      nama: editedCriteria ? true : false,
      tipe: editedCriteria ? true : false,
      bobot: editedCriteria ? true : false,
    },
    formIsValid: editedCriteria ? true : false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check your input again!", [
        { text: "Okay" },
      ]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      if (editedCriteria) {
        dispatch(
          criteriaActions.updateCriteria(
            criId,
            formState.inputValues.nama,
            formState.inputValues.tipe,
            +formState.inputValues.bobot
          )
        );
      } else {
        dispatch(
          criteriaActions.createCriteria(
            formState.inputValues.nama,
            formState.inputValues.tipe,
            +formState.inputValues.bobot
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);

  }, [dispatch, criId, formState]);

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

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          id="nama"
          label="Nama Kriteria"
          errorText="Please enter a valid name!"
          keyboardType="default"
          autoCapitalize="sentences"
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={editedCriteria ? editedCriteria.kriteria : ""}
          initiallyValid={!!editedCriteria}
          required
        />
        <Input
          id="tipe"
          label="Tipe"
          errorText="Please enter a valid type!"
          keyboardType="default"
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={editedCriteria ? editedCriteria.tipe : ""}
          initiallyValid={!!editedCriteria}
          required
        />
        <Input
          id="bobot"
          label="Bobot"
          errorText="Please enter a valid number!"
          keyboardType="decimal-pad"
          onInputChange={inputChangeHandler}
          initialValue={editedCriteria ? editedCriteria.bobot : ""}
          initiallyValid={!!editedCriteria}
          required
        />
      </View>
    </ScrollView>
  );
};

EditCriteriaScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("criteriaId")
      ? "Edit Criteria"
      : "Add Criteria",
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

export default EditCriteriaScreen;
