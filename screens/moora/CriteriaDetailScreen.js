import React from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";

const CriteriaDetailScreen = (props) => {
  const criterId = props.navigation.getParam("criteriaId");
  const selectedCriteria = useSelector((state) =>
    state.criteria.availableCriterias.find(
      (criter) => criter.id_kriteria === criterId
    )
  );

  return (
    <ScrollView>
      <Card style={styles.cardItem}>
        <Text style={styles.kriteria}>Nama Kriteria</Text>
        <Text style={styles.description}>{selectedCriteria.kriteria}</Text>
      </Card>
      <Card style={styles.cardItem}>
        <Text style={styles.kriteria}>Tipe</Text>
        <Text style={styles.description}>{selectedCriteria.tipe}</Text>
      </Card>
      <Card style={styles.cardItem}>
        <Text style={styles.kriteria}>Bobot</Text>
        <Text style={styles.description}>{selectedCriteria.bobot}</Text>
      </Card>
    </ScrollView>
  );
};

CriteriaDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("criteriaTitle"),
  };
};

const styles = StyleSheet.create({
  cardItem: {
    margin: 15,
    padding: 10,
    alignItems: "center",
  },
  kriteria: {
    fontSize: 16,
    color: Colors.primaryColor,
    textAlign: "center",
    fontFamily: "open-sans-bold",
  },
  description: {
    fontFamily: "open-sans",
    fontSize: 16,
    textAlign: "center",
  },
});

export default CriteriaDetailScreen;
