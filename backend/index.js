// backend/index.js
const express = require("express");
const cors = require("cors");
const { AppDataSource } = require("./data-source");
const { Task } = require("./src/entity/Task");

const app = express();
app.use(cors());
app.use(express.json());

AppDataSource.initialize().then(() => {
  const taskRepo = AppDataSource.getRepository(Task);

  app.get("/tasks", async (req, res) => {
    const tasks = await taskRepo.find();
    res.json(tasks);
  });

  app.post("/tasks", async (req, res) => {
    const task = taskRepo.create(req.body);
    const result = await taskRepo.save(task);
    res.status(201).json(result);
  });

  app.put("/tasks/:id", async (req, res) => {
    await taskRepo.update(req.params.id, req.body);
    const updated = await taskRepo.findOneBy({ id: req.params.id });
    res.json(updated);
  });

  app.delete("/tasks/:id", async (req, res) => {
    await taskRepo.delete(req.params.id);
    res.status(204).send();
  });

  app.listen(5000, () => console.log("API listening on port 5000"));
});
