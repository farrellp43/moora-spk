import CRITERIAS from "../../data/dummy-data2";
import {
  CREATE_CRITERIA,
  DELETE_CRITERIA,
  SET_CRITERIA,
  UPDATE_CRITERIA,
} from "../actions/criteria";
import Criteria from "../../models/criteria";

const initialState = {
  availableCriterias: CRITERIAS,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CRITERIA:
      return {
        availableCriterias: action.criterias
      }
    case CREATE_CRITERIA:
      const newCriteria = new Criteria(
        action.criteriaData.id,
        action.criteriaData.kriteria,
        action.criteriaData.tipe,
        action.criteriaData.bobot
      );
      return {
        ...state,
        availableCriterias: state.availableCriterias.concat(newCriteria),
      };
    case UPDATE_CRITERIA:
      const criteriaIndex = state.availableCriterias.findIndex(
        (cri) => cri.id_kriteria === action.cid
      );
      const updatedCriteria = new Criteria(
        action.cid,
        action.criteriaData.kriteria,
        action.criteriaData.tipe,
        action.criteriaData.bobot
      );
      const updatedAvailableCriterias = [...state.availableCriterias];
      updatedAvailableCriterias[criteriaIndex] = updatedCriteria;
      return {
        ...state,
        availableCriterias: updatedAvailableCriterias,
      };
    case DELETE_CRITERIA:
      return {
        ...state,
        availableCriterias: state.availableCriterias.filter(
          (criteria) => criteria.id_kriteria !== action.cid
        ),
      };
  }
  return state;
};
