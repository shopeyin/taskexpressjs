//jest.setTimeout(30000);
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const request = require("supertest");
// const app = require("../app");
// const Task = require("../models/Task");
// dotenv.config({ path: "./config.env" });

// beforeAll(async () => {
//   await mongoose.connect(process.env.DATABASE);
// });

// afterAll(async () => {
//   await mongoose.connection.close();
// });

// describe("Task API", () => {
//   it("should fetch all tasks", async () => {
//     const res = await request(app).get("/api/v1/tasks");

//     expect(res.statusCode).toBe(200);
//     expect(res.body.success).toBe(true);
//     expect(res.body.data.length).toBeGreaterThan(0);
//   });

//   // it("should create a new task", async () => {
//   //   const res = await request(app).post("/api/v1/tasks").send({
//   //     title: "Book Driving appointment",
//   //     description:
//   //       "Call clinic and schedule check-up for next week, preferably morning hours",
//   //     dueDateTime: "2025-08-02T14:00:00Z",
//   //   });

//   //   expect(res.statusCode).toBe(201);
//   //   expect(res.body.data.title).toBe("Book Driving appointment");
//   // });

//   it("should fetch a single task by ID", async () => {
//     const res = await request(app).get(
//       `/api/v1/tasks/689c06cf6a164f7d6adbce07`
//     );
//     expect(res.statusCode).toBe(200);
//     expect(res.body.success).toBe(true);
//     expect(res.body.data._id).toBe("689c06cf6a164f7d6adbce07");
//   });

//   it("should update a task", async () => {
//     const res = await request(app)
//       .patch(`/api/v1/tasks/689c06cf6a164f7d6adbce07`)
//       .send({ title: "Updated Task Title" });

//     expect(res.statusCode).toBe(200);
//     expect(res.body.data.title).toBe("Updated Task Title");
//   });

//   it("should delete a task", async () => {
//     const res = await request(app).delete(
//       `/api/v1/tasks/689c06cf6a164f7d6adbce07`
//     );

//     expect(res.statusCode).toBe(200);
//     expect(res.body.success).toBe(true);
//     expect(res.body.message).toBe("Task deleted successfully");

//     // Try to fetch the deleted task
//     const check = await request(app).get(
//       `/api/v1/tasks/689c06cf6a164f7d6adbce07`
//     );
//     expect(check.statusCode).toBe(404);
//   });
// });

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const request = require("supertest");
const app = require("../app");
const Task = require("../models/Task");
dotenv.config({ path: "./config.env" });

let mongoServer;
let createdTaskId;

jest.setTimeout(140000); // Total test time

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  // Clean all collections after each test so we start fresh
  await Task.deleteMany();
});

//INTEGRATION
describe("Task API (In-Memory DB)", () => {
  it("should create a new task", async () => {
    const res = await request(app).post("/api/v1/tasks").send({
      title: "Book Makeup appointment",
      description:
        "Call clinic and schedule check-up for next week, preferably morning hours",
      dueDateTime: "2025-08-02T14:00:00Z",
    });
    // console.log(res.body.data);
    expect(res.statusCode).toBe(201);
    expect(res.body.data.title).toBe("Book Makeup appointmentss");
    createdTaskId = res.body.data._id;
  });

  it("should fetch all tasks", async () => {
    const task = await Task.create({
      title: "Single Task",
      description: "Test get single task",
      dueDateTime: new Date(),
    });
    const res = await request(app).get("/api/v1/tasks");
    //console.log(res.body.data);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(1); // only the fresh task
  });

  it("should fetch a single task by ID", async () => {
    const task = await Task.create({
      title: "Single Task",
      description: "Test get single task",
      dueDateTime: new Date(),
    });

    const res = await request(app).get(`/api/v1/tasks/${task._id}`);
    console.log(res.body.data);
    expect(res.statusCode).toBe(200);
    expect(res.body.data._id).toBe(task._id.toString());
  });

  it("should update a task", async () => {
    const task = await Task.create({
      title: "Old Title",
      description: "Update test",
      dueDateTime: new Date(),
    });

    const res = await request(app)
      .patch(`/api/v1/tasks/${task._id}`)
      .send({ title: "New Title" });
    console.log(res.body.data);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.title).toBe("New Title");
  });

  it("should delete a task", async () => {
    const task = await Task.create({
      title: "Delete Me",
      description: "Delete test",
      dueDateTime: new Date(),
    });

    const res = await request(app).delete(`/api/v1/tasks/${task._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Task deleted successfully");
    const check = await request(app).get(`/api/v1/tasks/${task._id}`);
    expect(check.statusCode).toBe(404);
  });
});

// END-TO-END

// END-TO-END
// describe("Task API E2E", () => {
//   it("should create, fetch, update, and delete a task", async () => {
//     // 1️⃣ Create a task
//     const createRes = await request(app)
//       .post("/api/v1/tasks")
//       .send({ title: "E2E Task", description: "Test E2E flow" });
//     expect(createRes.statusCode).toBe(201);
//     const taskId = createRes.body.data._id;

//     // 2️⃣ Fetch the task
//     const fetchRes = await request(app).get(`/api/v1/tasks/${taskId}`);
//     expect(fetchRes.statusCode).toBe(200);
//     expect(fetchRes.body.data.title).toBe("E2E Task");

//     // 3️⃣ Update the task
//     const updateRes = await request(app)
//       .patch(`/api/v1/tasks/${taskId}`)
//       .send({ title: "Updated E2E Task" });
//     expect(updateRes.statusCode).toBe(200);
//     expect(updateRes.body.data.title).toBe("Updated E2E Task");

//     // 4️⃣ Delete the task
//     const deleteRes = await request(app).delete(`/api/v1/tasks/${taskId}`);
//     expect(deleteRes.statusCode).toBe(200);

//     // 5️⃣ Ensure task no longer exists
//     const fetchDeleted = await request(app).get(`/api/v1/tasks/${taskId}`);
//     expect(fetchDeleted.statusCode).toBe(404);
//   });
// });
