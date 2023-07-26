import session from "supertest-session";
import server from "../../app.js";

let req;
beforeEach(() => {
  req = session(server);
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
      expect(res.body.message).toMatch('provide your information');
    });
  });
});
