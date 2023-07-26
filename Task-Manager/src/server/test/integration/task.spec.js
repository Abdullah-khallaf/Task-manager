import session from "supertest-session";
import server from "../../app.js";

let req;

beforeAll(async () => {
  await session(server).post("/api/v1/user/signup").send({
    email: "user@email.com",
    user_name: "user",
    first_name: "f-user",
    last_name: "l-user",
    password: "123456",
  });
});

afterAll(async () => {
  await session(server).delete("/api/v1/user/deleteAll");
});

beforeEach(async () => {
  req = session(server);
  await req.post("/api/v1/user/login").send({
    email: "user@email.com",
    password: "123456",
  });
});

afterEach(async () => {
  await req.delete("/api/v1/task/deleteAll");
});

describe("task resource", () => {
  describe("POST /task", () => {
    it("should return 201 created", async () => {
      const res = await req.post("/api/v1/task").send({
        name: "task1",
      });
      expect(res.status).toBe(201);
      expect(res.body.data.task).toHaveProperty("name", "task1");
    });
  });

  describe("PATCH /task", () => {
    it("should return 200 ok", async () => {
      const task = await req.post("/api/v1/task").send({
        name: "task1",
      });
      const taskId = task.body.data.task.id;
      const res = await req.patch("/api/v1/task").send({
        id: taskId,
        name: "task1-updated",
      });

      expect(res.status).toBe(200);
      expect(res.body.message).toMatch("task is updated");
    });
  });

  describe("get /task", () => {
    it("should return 200 ok", async () => {
      const task1 = await req.post("/api/v1/task").send({
        name: "task1",
      });
      const task2 = await req.post("/api/v1/task").send({
        name: "task2",
      });

      const res = await req.get("/api/v1/task");

      expect(res.status).toBe(200);
      expect(res.body.data.tasks.length).toBe(2);
      expect(res.body.data.tasks[1]).toMatchObject({ name: "task2" });
    });
  });

  describe("DELETE /task", () => {
    it("should return 204 no content", async () => {
      const task1 = await req.post("/api/v1/task").send({
        name: "task1",
      });
      const taskId = task1.body.data.task.id;
      const res = await req.delete("/api/v1/task").send({ id: taskId });

      expect(res.status).toBe(204);
    });
  });

  describe("DELETE /task/deleteAll", () => {
    it("should return 200", async () => {
      await req.post("/api/v1/task").send({
        name: "task1",
      });
      await req.post("/api/v1/task").send({
        name: "task2",
      });
      const res = await req.delete("/api/v1/task/deleteAll");

      expect(res.body.message).toMatch("2 tasks is deleted");
    });
  });
});
