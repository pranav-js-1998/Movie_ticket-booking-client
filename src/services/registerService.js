// import axios from "axios";

// const register = async (formData) => {
//   try 
//   {
//     const response = await axios.post("https://localhost:7017/api/User/Create",formData);
//     return response.data;
//   } 
//   catch (error) 
//   {
//     throw error.response.data;
//   }
// };

// export default register;

import axios from 'axios';

class RegisterService {
  registerUser(data) {
    return axios.post(`https:/movietktbooking.azurewebsites.net/api/User/Create`, data)
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(error.response.data);
      });
  }
}

export default RegisterService;