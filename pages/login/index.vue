<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Login Page</h1>
        <p class="text-gray-500 mt-2">Please login to your account</p>
      </div>

      <!-- Form -->
      <form class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="email@example.com"
            v-model="formData.email"
            required
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="********"
            v-model="formData.password"
            required
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          @click="handleSubmit"
          type="button"
          class="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
import { ref } from "vue";

const formData = ref({
  email: "",
  password: "",
});

const handleSubmit = () => {
  console.log("Form Data:", formData.value); //testng

  if (!formData.value.email || !formData.value.password) {
    alert("Please fill in all fields.");
  } else {
    useAuthStore().login(formData.value.email, formData.value.password);
    // console.log("Login successful!");
  }
};
</script>
