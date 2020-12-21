import Criteria from "../../models/criteria";

// export const DELETE_CRITERIA = "DELETE_CRITERIA";
export const CREATE_CRITERIA = "CREATE_CRITERIA";
export const UPDATE_CRITERIA = "UPDATE_CRITERIA";
export const SET_CRITERIA = "SET_CRITERIA";

export const fetchCriterias = () => {
  return async (dispatch) => {
    //any async code you want!
    try {
      const response = await fetch(
        "https://farrell-moora.firebaseio.com/criteria.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!!");
      }

      const resData = await response.json();
      const loadedCriterias = [];

      for (const key in resData) {
        loadedCriterias.push(
          new Criteria(
            key,
            resData[key].kriteria,
            resData[key].tipe,
            resData[key].bobot
          )
        );
      }

      dispatch({ type: SET_CRITERIA, criterias: loadedCriterias });
    } catch (err) {
      //send to custom analytic server
      throw err;
    }
  };
};

// export const deleteCriteria = (criteriaId) => {
//   return { type: DELETE_CRITERIA, cid: criteriaId };
// };

export const createCriteria = (kriteria, tipe, bobot) => {
  return async (dispatch) => {
    //any async code you want!
    const response = await fetch(
      "https://farrell-moora.firebaseio.com/criteria.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kriteria,
          tipe,
          bobot,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_CRITERIA,
      criteriaData: {
        id: resData.name,
        kriteria,
        tipe,
        bobot,
      },
    });
  };
};

export const updateCriteria = (id_kriteria, kriteria, tipe, bobot) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://farrell-moora.firebaseio.com/criteria/${id_kriteria}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kriteria,
          tipe,
          bobot,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!!");
    }
    dispatch({
      type: UPDATE_CRITERIA,
      cid: id_kriteria,
      criteriaData: {
        kriteria,
        tipe,
        bobot,
      },
    });
  };
};
