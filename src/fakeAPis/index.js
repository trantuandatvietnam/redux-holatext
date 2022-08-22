import { createServer, Model } from "miragejs";

export const setupServer = () => {
  createServer({
    models: {
      todos: Model,
    },
    routes() {
      this.get("/api/todoList", (schema) => {
        return schema.todos.all();
      });
      this.post("/api/todoList", (schema, request) => {
        const payload = JSON.parse(request.requestBody);
        return schema.todos.create(payload);
      });
      this.post("/api/updateTodo", (schema, request) => {
        const payload = JSON.parse(request.requestBody);
        const currentTodo = schema.todos.find(payload.id);
        currentTodo.update(payload);
      });
    },
  });
};
