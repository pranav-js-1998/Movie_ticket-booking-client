import axios from "axios";

const TheatreService = {
  getTheatre: () => {
    return axios
      .get("https://movietktbooking.azurewebsites.net/api/Theatre/Reterive/All")
      .then((response) => {
        return response.data;
      });
  },
  getTheatreById: (id) => {
    return axios
      .get(`https://movietktbooking.azurewebsites.net/api/Theatre/Reterive/${id}`)
      .then((response) => {
        return response.data;
      });
  },
};

export default TheatreService;
