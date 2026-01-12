export default defineNuxtRouteMiddleware((to, from) => {
  if (!useCookie("token").value && to.path !== "/login") {
    return navigateTo("/login");
  } else if (useCookie("token").value && to.path === "/login") {
    return navigateTo("/task");
  }
});
