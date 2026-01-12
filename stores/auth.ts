import { defineStore } from "pinia";
// import { useApi } from "~/composables/useApi";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    // isLoggedIn: false,
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const api = useApi();
        const response: any = await api("/login", {
          method: "POST",
          body: { email, password },
        });

        //check if the reponse has the token in it
        if (response.token) {
          const token = useCookie("token");
          token.value = response.token;
          navigateTo("/");

          return true;
        }
      } catch (error) {
        console.error("Login failed:", error);
        return false;
      }
    },
    logout() {
      const token = useCookie("token");
      token.value = null;
      console.log("Logged out successfully");
      navigateTo("/login");
    },
  },
});
