import React from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";

import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";

const AlternativeDetailScreen = (props) => {
  const alterId = props.navigation.getParam("alternativeId");
  const selectedAlternative = useSelector((state) =>
    state.alternative.availableAlternatives.find(
      (alter) => alter.id_alternatif === alterId
    )
  );

  return (
    <ScrollView>
      <Card style={styles.cardItem}>
        <Text style={styles.kriteria}>Nama Alternatif</Text>
        <Text style={styles.description}>{selectedAlternative.alternatif}</Text>
      </Card>
      <Card style={styles.cardItem}>
        <Text style={styles.kriteria}>Vegetasi Area</Text>
        <Text style={styles.description}>
          {selectedAlternative.vegetasi_area}
        </Text>
      </Card>
      <Card style={styles.cardItem}>
        <Text style={styles.kriteria}>Volume Material</Text>
        <Text style={styles.description}>
          {selectedAlternative.volume_material}
        </Text>
      </Card>
      <Card style={styles.cardItem}>
        <Text style={styles.kriteria}>Luas</Text>
        <Text style={styles.description}>{selectedAlternative.luas}</Text>
      </Card>
      <Card style={styles.cardItem}>
        <Text style={styles.kriteria}>Volume Tampungan</Text>
        <Text style={styles.description}>
          {selectedAlternative.volume_tampungan}
        </Text>
      </Card>
      <Card style={styles.cardItem}>
        <Text style={styles.kriteria}>Lama Operasi</Text>
        <Text style={styles.description}>
          {selectedAlternative.lama_operasi}
        </Text>
      </Card>
      <Card style={styles.cardItem}>
        <Text style={styles.kriteria}>Harga Air/m3</Text>
        <Text style={styles.description}>{selectedAlternative.harga_air}</Text>
      </Card>
      <Card style={styles.cardItem}>
        <Text style={styles.kriteria}>Akses Jalan</Text>
        <Text style={styles.description}>
          {selectedAlternative.akses_jalan}
        </Text>
      </Card>
    </ScrollView>
  );
};

AlternativeDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("alternativeTitle"),
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

export default AlternativeDetailScreen;
