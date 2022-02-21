import axios from "axios";

const token = localStorage.getItem("token");

export const adminApi = {
   // getAll: () => axios.get(
   //    "http://nurmuhammad.narzullayev.uz/api/v1/auth/register",
   //    {
   //       headers: {
   //          'Content-Type': 'application/json',
   //          'Authorization': `Bearer ${token}`
   //       }
   //    }
   // ),
   // getOne: (id) => axios.get(
   //    `http://nurmuhammad.narzullayev.uz/api/v1/register${id}`,
   //    {
   //       headers: {
   //          'Content-Type': 'application/json',
   //          'Authorization': `Bearer ${token}`
   //       }
   //    }
   // ),
   create: (params) => axios.post(
      "http://nurmuhammad.narzullayev.uz/api/v1/auth/register",
      params,
      {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
         }
      }
   
   )
}