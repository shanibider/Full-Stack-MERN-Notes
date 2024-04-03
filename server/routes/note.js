import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the notes.
router.get("/", async (req, res) => {
  let collection = await db.collection("notes");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single note by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("notes");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new note.
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      title: req.body.title,
      content: req.body.content,
    };
    let collection = await db.collection("notes");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding note");
  }
});

// This section will help you update a note by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        title: req.body.title,
        content: req.body.content,
      },
    };

    let collection = await db.collection("notes");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating note");
  }
});

// This section will help you delete a note
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("notes");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting note");
  }
});

export default router;
