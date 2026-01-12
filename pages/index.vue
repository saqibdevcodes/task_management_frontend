<template>
  <button
    @click="useAuthStore().logout()"
    class="inline-block mb-4 bg-red-500 text-white px-4 py-2 rounded hover:underline m-10"
  >
    logout
  </button>
  <div class="flex flex-col items-center justify-center p-4">
    <div class="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">
        Welcome to the Dashboard
      </h1>
      <p class="text-gray-500 mb-6">
        You are now logged in. Navigate to your tasks below.
      </p>

      <NuxtLink
        to="/task"
        class="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition"
      >
        Go to Tasks
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>
