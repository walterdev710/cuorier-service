import axios from "axios";

export const authApi = {
   login: (params) => axios.post(
      "http://nurmuhammad.narzullayev.uz/api/v1/auth/login",
      params,
      {
         headers: {
            "Content-Type": "application/json"
         }
      }
   )
}
