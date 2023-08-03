import axios from "axios";

const BookingService = {
  bookTicket: (data) => {
    return axios
      .post("https://movietktbooking.azurewebsites.net/api/Ticket/Book", data, {
        headers: {
          Authorization: "bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        return response.data;
      });
  },
};

export default BookingService;
