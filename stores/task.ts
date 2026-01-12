import { defineStore } from "pinia";

export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [] as Array<{ id: number; title: string; is_completed: boolean }>,
    filter: "",
  }),
  getters: {
    filteredTasks: (state) => {
      if (state.filter === "completed") {
        return state.tasks.filter((task) => task.is_completed);
      } else if (state.filter === "pending") {
        return state.tasks.filter((task) => !task.is_completed);
      } else {
        return state.tasks;
      }
    },
  },
  actions: {
    async fetch() {
      const api = useApi();
      const response: any = await api("/tasks");
      this.tasks = response;
    },
    async addTask(title: string) {
      const api = useApi();
      const response: any = await api("/tasks", {
        method: "POST",
        body: { title, user_id: 1 },
      });
      this.tasks.push(response);
      console.log(this.tasks);

      //   useTaskStore().fetch();
    },
    async toggleTaskCompletion(taskId: number) {
      const task = this.tasks.find((task) => task.id === taskId);
      if (task) {
        const api = useApi();
        const response: any = await api(`/tasks/${taskId}`, {
          method: "PATCH",
          body: { is_completed: !task.is_completed },
        });
        task.is_completed = response.is_completed;
      }
    },
    async deleteTask(taskId: number) {
      const api = useApi();
      await api(`/tasks/${taskId}`, {
        method: "DELETE",
      });
      this.tasks = this.tasks.filter((t) => t.id !== taskId);
    },
    setFilter(value: string) {
      this.filter = value;
    },
  },
});
