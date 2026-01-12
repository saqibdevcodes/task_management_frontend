export const useApi = () => {
  const config = useRuntimeConfig();
  const token = useCookie<string | null>("token");

  const api = $fetch.create({
    baseURL: "http://localhost:8000/api",

    onRequest({ options }) {
      if (token.value) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token.value}`,
        } as any;
      }
    },

    onResponseError({ response }) {
      if (response.status === 401) {
        token.value = null;
        navigateTo("/login");
      }
    },
  });

  return api;
};
