import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  Platform,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Text,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import AlternativeItem from "../../components/moora/AlternativeItem";
import * as criteriaActions from "../../store/actions/criteria";
import Colors from "../../constants/Colors";

const CriteriaScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const criteria = useSelector((state) => state.criteria.availableCriterias);

  const dispatch = useDispatch();

  const loadCriterias = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(criteriaActions.fetchCriterias());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadCriterias
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadCriterias]);

  useEffect(() => {
    setIsLoading(true);
    loadCriterias().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadCriterias]);

  const editCriteriaHandler = (id_kriteria) => {
    props.navigation.navigate("EditCriteria", {
      criteriaId: id_kriteria,
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred</Text>
        <Button
          title="Try again"
          onPress={loadCriterias}
          color={Colors.primaryColor}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  if (!isLoading && criteria.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No criterias found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadCriterias}
      refreshing={isRefreshing}
      data={criteria}
      keyExtractor={(item) => item.id_kriteria}
      renderItem={(itemData) => (
        <AlternativeItem
          id={itemData.item.id_kriteria.toUpperCase()}
          title={itemData.item.kriteria}
          onSelect={() => {
            props.navigation.navigate("CriteriaDetail", {
              criteriaId: itemData.item.id_kriteria,
              criteriaTitle: itemData.item.kriteria,
            });
          }}
          onLongSelect={() => {
            Alert.alert("What do you want to do?", "Edit or delete?", [
              {
                text: "EDIT",
                style: "default",
                onPress: () => {
                  editCriteriaHandler(itemData.item.id_kriteria);
                },
              },
              {
                text: "CANCEL",
                style: "cancel",
              },
            ]);
          }}
        ></AlternativeItem>
      )}
    />
  );
};

CriteriaScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Criterias",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => {
            navData.navigation.navigate("EditCriteria");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default CriteriaScreen;
