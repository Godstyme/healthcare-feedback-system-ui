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

   async logout() {
      const response = await api.post("/auth/logout");
      return response.data;
   }
}

export default new AuthService();

