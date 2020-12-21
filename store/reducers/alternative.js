import ALTERNATIVES from "../../data/dummy-data";
import {
  CREATE_ALTERNATIVE,
  DELETE_ALTERNATIVE,
  SET_ALTERNATIVE,
  UPDATE_ALTERNATIVE,
} from "../actions/alternative";
import Alternative from "../../models/alternative";

const initialState = {
  availableAlternatives: ALTERNATIVES,
};

const getLastId = () => {
  let lastElement = ALTERNATIVES[ALTERNATIVES.length - 1];
  let lastIncrementedNumber = lastElement.id_alternatif.substr(
    1,
    lastElement.id_alternatif.length - 1
  );

  return `a${parseInt(lastIncrementedNumber) + 1}`;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALTERNATIVE:
      return {
        availableAlternatives: action.alternatives,
      };
    case CREATE_ALTERNATIVE:
      const newAlternative = new Alternative(
        action.alternativeData.id,
        action.alternativeData.alternatif,
        action.alternativeData.vegetasi_area,
        action.alternativeData.volume_material,
        action.alternativeData.luas,
        action.alternativeData.volume_tampungan,
        action.alternativeData.lama_operasi,
        action.alternativeData.harga_air,
        action.alternativeData.akses_jalan
      );
      return {
        ...state,
        availableAlternatives: state.availableAlternatives.concat(
          newAlternative
        ),
      };
    case UPDATE_ALTERNATIVE:
      const alternativeIndex = state.availableAlternatives.findIndex(
        (alt) => alt.id_alternatif === action.aid
      );
      const updatedAlternative = new Alternative(
        action.aid,
        action.alternativeData.alternatif,
        action.alternativeData.vegetasi_area,
        action.alternativeData.volume_material,
        action.alternativeData.luas,
        action.alternativeData.volume_tampungan,
        action.alternativeData.lama_operasi,
        action.alternativeData.harga_air,
        action.alternativeData.akses_jalan
      );
      const updatedAvailableAlternatives = [...state.availableAlternatives];
      updatedAvailableAlternatives[alternativeIndex] = updatedAlternative;
      return {
        ...state,
        availableAlternatives: updatedAvailableAlternatives,
      };
    case DELETE_ALTERNATIVE:
      return {
        ...state,
        availableAlternatives: state.availableAlternatives.filter(
          (alternative) => alternative.id_alternatif !== action.aid
        ),
      };
  }
  return state;
};
