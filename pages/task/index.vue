<template>
  <!-- back to main page -->
  <button
    @click="useAuthStore().logout()"
    class="inline-block mb-4 bg-red-500 text-white px-4 py-2 rounded hover:underline m-10"
  >
    logout
  </button>
  <div class="max-w-lg mx-auto mt-10 p-4 bg-white shadow rounded">
    <h1 class="text-2xl font-bold mb-6 text-center">Task List</h1>

    <!-- Add Task -->
    <div class="flex gap-2 mb-4">
      <input
        type="text"
        v-model="newTask"
        placeholder="Enter new task"
        class="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        @click="useTaskStore().addTask(newTask), (newTask = '')"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Add
      </button>
    </div>

    <!-- Filter Buttons -->
    <div class="flex gap-2 mb-4">
      <button
        @click="useTaskStore().setFilter('all')"
        class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
      >
        All
      </button>
      <button
        @click="useTaskStore().setFilter('completed')"
        class="px-4 py-2 rounded bg-green-200 hover:bg-green-300"
      >
        Completed
      </button>
      <button
        @click="useTaskStore().setFilter('pending')"
        class="px-4 py-2 rounded bg-red-200 hover:bg-red-300"
      >
        Pending
      </button>
    </div>
    <ul class="space-y-2">
      <li
        v-for="task in tasks"
        :key="task.id"
        class="flex items-center justify-between p-2 border rounded hover:bg-gray-50 transition"
      >
        <div class="flex items-center gap-2">
          <button
            @click="useTaskStore().toggleTaskCompletion(task.id)"
            :class="task.is_completed ? 'bg-green-500' : 'bg-gray-300'"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
          >
            <span
              :class="task.is_completed ? 'translate-x-6' : 'translate-x-1'"
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
            ></span>
          </button>
          <span :class="task.is_completed ? 'text-green-600' : 'text-red-600'">
            {{ task.title }} - {{ task.is_completed ? "Completed" : "Pending" }}
          </span>
        </div>
        <button
          @click="useTaskStore().deleteTask(task.id)"
          class="text-red-500 hover:text-red-700 font-semibold"
        >
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
import { ref, computed } from "vue";

const newTask = ref("");
const tasks = computed(() => useTaskStore().filteredTasks);

onMounted(async () => {
  useTaskStore().fetch();
});
</script>
