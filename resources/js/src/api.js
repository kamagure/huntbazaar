const axios = window.axios;

const BASE_API_URL = process.env.MIX_BASE_API_URL

export default {
  // get datetime data in Setting model
  getSetting: () =>
    axios.get(`${BASE_API_URL}/setting`),
  // update datetime data in Setting model, params `setting` is in JSON
  updateSetting: (setting) =>
    axios.put(`${BASE_API_URL}/change-time`, setting),
  getAllGuests: () => 
    axios.get(`${BASE_API_URL}/dashboard`),
  getDate: () => 
    axios.get(`${BASE_API_URL}/date`),
  getDesigner: () => 
    axios.get(`${BASE_API_URL}/designer`),
  updateGuest: (guest) => 
    axios.put(`${BASE_API_URL}/guest/fill`, guest),
}