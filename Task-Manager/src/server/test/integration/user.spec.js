import session from "supertest-session";
import server from "../../app.js";

let req;
beforeEach(() => {
  req = session(server);
});
afterEach(async () => {
  await req.delete("/api/v1/user/deleteAll");
});

describe("user resource", () => {
  describe("POST /user/signup", () => {
    it("should return 400 bad request", async () => {
      const res = await req.post("/api/v1/user/signup").send({
        user_name: "user",
        first_name: "f-user",
        last_name: "l-user",
        password: "123456",
      });

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch("provide your information");
    });

    it("should return 201 created", async () => {
      const res = await req.post("/api/v1/user/signup").send({
        email: "user@email.com",
        user_name: "user",
        first_name: "f-user",
        last_name: "l-user",
        password: "123456",
      });

      expect(res.status).toBe(201);
      expect(res.body.data.user).toMatchObject({
        email: "user@email.com",
        user_name: "user",
      });
      expect(res.body.data.user).not.toHaveProperty("password");
    });
  });

  describe("POST /user/login", () => {
    it("should return 400 bad request", async () => {
      await req.post("/api/v1/user/signup").send({
        email: "user@email.com",
        user_name: "user",
        first_name: "f-user",
        last_name: "l-user",
        password: "123456",
      });

      const res = await req.post("/api/v1/user/login").send({
        email: "user@email.com",
      });

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch("provide email and password");
    });

    it("should return 401 unauthorize", async () => {
      const res = await req.post("/api/v1/user/login").send({
        email: "user@email.com",
        password: "123456",
      });

      expect(res.status).toBe(401);
      expect(res.body.message).toMatch("incorrect email or password");
    });

    it("should return 401 unauthorize", async () => {
      await req.post("/api/v1/user/signup").send({
        email: "user@email.com",
        user_name: "user",
        first_name: "f-user",
        last_name: "l-user",
        password: "123456",
      });
      const res = await req.post("/api/v1/user/login").send({
        email: "user@email.com",
        password: "incorrect pass",
      });

      expect(res.status).toBe(401);
      expect(res.body.message).toMatch("incorrect email or password");
    });

    it("should return 200 ok", async () => {
      await req.post("/api/v1/user/signup").send({
        email: "user@email.com",
        user_name: "user",
        first_name: "f-user",
        last_name: "l-user",
        password: "123456",
      });
      const res = await req.post("/api/v1/user/login").send({
        email: "user@email.com",
        password: "123456",
      });

      expect(res.status).toBe(200);
      expect(res.body.data.user).toBeDefined();
    });
  });

  describe("GET /user/logout", () => {
    it("should return 200 ok", async () => {
      await req.post("/api/v1/user/signup").send({
        email: "user@email.com",
        user_name: "user",
        first_name: "f-user",
        last_name: "l-user",
        password: "123456",
      });
      await req.post("/api/v1/user/login").send({
        email: "user@email.com",
        password: "123456",
      });

      const res = await req.get("/api/v1/user/logout");

      expect(res.status).toBe(200);
      expect(res.body.message).toMatch("logged out");
      expect(req.session).not.toBeDefined();
    });
  });
});
