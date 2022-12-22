import request from "supertest";
import { app, db } from "../app";

beforeAll(async () => {
  db.data ||= { notes: [] };
  db.write();
});

afterAll(async () => {
  db.data.notes = [];
  db.write();
});

describe("Test POST notes /", () => {
  const note = {
    title: "Notes",
    description: "Note Description here",
  };
  const noteMissingProperties = {
    title: "Notes",
    // description: "Note Description here"
  };
  const noteMissingProperties2 = {
    // title: "Notes",
    description: "Note Description here",
  };

  test("It should respond with 201 created", async () => {
    const response = await request(app)
      .post("/note")
      .send(note)
      .expect("Content-Type", /json/)
      .expect(201);
  });

  test("It should catch missing required propertieties Title", async () => {
    const response = await request(app)
      .post("/note")
      .send(noteMissingProperties)
      .expect("Content-Type", /json/)
      .expect(422);
  });
  test("It should catch missing required properties description", async () => {
    const response = await request(app)
      .post("/note")
      .send(noteMissingProperties2)
      .expect("Content-Type", /json/)
      .expect(422);
  });
});
describe("Test GET notes /", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200);
  });
  test("gettinng single note", async () => {
    const note = {
      title: "Notes",
      description: "Note Description here",
    };
    const response = await request(app)
      .post("/note")
      .send(note)
      .expect("Content-Type", /json/)
      .expect(201);

    const succes = await request(app)
      .get(`/note/${response.body.id}`)
      .expect("Content-Type", /json/)
      .expect(200);
  });
  test("gettinng single note not found", async () => {
    const succes = await request(app)
      .get(`/note/131312313`)
      .expect("Content-Type", /json/)
      .expect(400);
  });
});

describe("Test PUT notes /", () => {
  const note = {
    title: "Notes",
    description: "Note Description here",
  };

  test("testing put ", async () => {
    const response = await request(app)
      .post("/note")
      .send(note)
      .expect("Content-Type", /json/)
      .expect(201);

    const changed = await request(app)
      .put(`/note/${response.body.id}`)
      .send(note)
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
describe("Test Delete notes /", () => {
  const note = {
    title: "Notes",
    description: "Note Description here",
  };

  test("It should respond with 200 ", async () => {
    const response = await request(app)
      .post("/note")
      .send(note)
      .expect("Content-Type", /json/)
      .expect(201);

    const deleted = await request(app)
      .delete(`/note/${response.body.id}`)
      .expect("Content-Type", /json/)
      .expect(202);
  });
});
