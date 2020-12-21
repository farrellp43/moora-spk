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
import * as alternativeActions from "../../store/actions/alternative";
import Colors from "../../constants/Colors";

const AlternativeScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const alternative = useSelector(
    (state) => state.alternative.availableAlternatives
  );
  const dispatch = useDispatch();

  const loadAlternatives = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(alternativeActions.fetchAlternatives());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadAlternatives
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadAlternatives]);

  useEffect(() => {
    setIsLoading(true);
    loadAlternatives().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadAlternatives]);

  const editAlternativeHandler = (id_alternatif) => {
    props.navigation.navigate("EditAlternative", {
      alternativeId: id_alternatif,
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred</Text>
        <Button
          title="Try again"
          onPress={loadAlternatives}
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

  if (!isLoading && alternative.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No alternatives found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadAlternatives}
      refreshing={isRefreshing}
      data={alternative}
      keyExtractor={(item) => item.id_alternatif}
      renderItem={(itemData) => (
        <AlternativeItem
          id={itemData.item.id_alternatif.toUpperCase()}
          title={itemData.item.alternatif}
          onSelect={() => {
            props.navigation.navigate("AlternativeDetail", {
              alternativeId: itemData.item.id_alternatif,
              alternativeTitle: itemData.item.alternatif,
            });
          }}
          onLongSelect={() => {
            Alert.alert("What do you want to do?", "Edit or delete?", [
              {
                text: "EDIT",
                style: "default",
                onPress: () => {
                  editAlternativeHandler(itemData.item.id_alternatif);
                },
              },
              {
                text: "DELETE",
                style: "destructive",
                onPress: () => {
                  Alert.alert(
                    "Delete alternative",
                    "Are you sure you want to delete this item?",
                    [
                      {
                        text: "CANCEL",
                        style: "cancel",
                        onPress: () => console.log("Cancel delete alternative"),
                      },
                      {
                        text: "DELETE",
                        style: "destructive",
                        onPress: () => {
                          dispatch(
                            alternativeActions.deleteAlternative(
                              itemData.item.id_alternatif
                            )
                          );
                        },
                      },
                    ]
                  );
                },
              },
            ]);
          }}
        >
          {/* <TouchableOpacity
            onPress={() => {
              dispatch(
                alternativeActions.deleteAlternative(
                  itemData.item.id_alternatif
                )
              );
            }}
            style={styles.deleteButton}
          >
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              size={26}
              color="#ff7675"
            />
          </TouchableOpacity> */}
        </AlternativeItem>
      )}
    />
  );
};

AlternativeScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Alternatives",
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
            navData.navigation.navigate("EditAlternative");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default AlternativeScreen;
