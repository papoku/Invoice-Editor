import axios from "axios";
import { API_URL } from "../helpers/helpers";
import { UPDATE_ROW } from "../actions/types";
import { FETCH_ROW } from "../actions/types";

// fetch action to load data from database
export const fetchInvoiceList = () => {
  return function(dispatch) {
    axios
      .get(`${API_URL}/invoicelist`)
      .then(response => {
        dispatch({
          type: FETCH_ROW,
          payload: response.data
        });
      })
      .catch(error => {
        console.log("Error while sending action", error);
      });
  };
};

// update invoice list in database
export const updateInvoiceList = (data, oldData) => {
    return function(dispatch) {
      const newRow = Object.assign({}, oldData, {[data.name]:data.value});
      axios
        .put(`${API_URL}/invoicelist/${data.uniqueId}`, {...newRow}, { headers: { 'Content-Type': 'application/json' }})
        .then(response => {
          dispatch({
            type: UPDATE_ROW,
            payload: response.data
          });
        })
        .catch(error => {
          console.log("Error while sending action", error);
        });
    };
  };
