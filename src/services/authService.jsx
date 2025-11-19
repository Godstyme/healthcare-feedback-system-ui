import api from "./axiosInstance";

class AuthService {
   async login(email, password) {
      const response = await api.post("/auth/login", {
         email,
         password,
      });
      return response.data;
   }

   async register(data) {
      const response = await api.post("/auth/register", data);
      return response.data;
   }

   // async logout() {
   //    const response = await api.post("/auth/logout");
   //    return response.data;
   // }
   async logout() {
      const token = localStorage.getItem("access_token");

      const response = await api.post(
         "/auth/logout",
         {},
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );

      return response.data;
   }

}

export default new AuthService();

