import axios from "axios";

class TicketService {
  getTickets() {
    return axios
      .get(`https://movietktbooking.azurewebsites.net/api/Ticket/Reterive`)
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(error);
      });
  }
}

export default TicketService;
