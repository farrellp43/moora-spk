import Alternative from "../../models/alternative";

export const DELETE_ALTERNATIVE = "DELETE_ALTERNATIVE";
export const CREATE_ALTERNATIVE = "CREATE_ALTERNATIVE";
export const UPDATE_ALTERNATIVE = "UPDATE_ALTERNATIVE";
export const SET_ALTERNATIVE = "SET_ALTERNATIVE";

export const fetchAlternatives = () => {
  return async (dispatch) => {
    //any async code you want!
    try {
      const response = await fetch(
        "https://farrell-moora.firebaseio.com/alternative.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!!");
      }

      const resData = await response.json();
      const loadedAlternatives = [];

      for (const key in resData) {
        loadedAlternatives.push(
          new Alternative(
            key,
            resData[key].alternatif,
            resData[key].vegetasi_area,
            resData[key].volume_material,
            resData[key].luas,
            resData[key].volume_tampungan,
            resData[key].lama_operasi,
            resData[key].harga_air,
            resData[key].akses_jalan
          )
        );
      }

      dispatch({ type: SET_ALTERNATIVE, alternatives: loadedAlternatives });
    } catch (err) {
      //send to custom analytic server
      throw err;
    }
  };
};

export const deleteAlternative = (alternativeId) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://farrell-moora.firebaseio.com/alternative/${alternativeId}.json`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!!");
    }

    dispatch({ type: DELETE_ALTERNATIVE, aid: alternativeId });
  };
};

export const createAlternative = (
  alternatif,
  vegetasi_area,
  volume_material,
  luas,
  volume_tampungan,
  lama_operasi,
  harga_air,
  akses_jalan
) => {
  return async (dispatch) => {
    //any async code you want!
    const response = await fetch(
      "https://farrell-moora.firebaseio.com/alternative.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          alternatif,
          vegetasi_area,
          volume_material,
          luas,
          volume_tampungan,
          lama_operasi,
          harga_air,
          akses_jalan,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_ALTERNATIVE,
      alternativeData: {
        id: resData.name,
        alternatif,
        vegetasi_area,
        volume_material,
        luas,
        volume_tampungan,
        lama_operasi,
        harga_air,
        akses_jalan,
      },
    });
  };
};

export const updateAlternative = (
  id_alternatif,
  alternatif,
  vegetasi_area,
  volume_material,
  luas,
  volume_tampungan,
  lama_operasi,
  harga_air,
  akses_jalan
) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://farrell-moora.firebaseio.com/alternative/${id_alternatif}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          alternatif,
          vegetasi_area,
          volume_material,
          luas,
          volume_tampungan,
          lama_operasi,
          harga_air,
          akses_jalan,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!!");
    }

    dispatch({
      type: UPDATE_ALTERNATIVE,
      aid: id_alternatif,
      alternativeData: {
        alternatif,
        vegetasi_area,
        volume_material,
        luas,
        volume_tampungan,
        lama_operasi,
        harga_air,
        akses_jalan,
      },
    });
  };
};
