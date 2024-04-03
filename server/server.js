import cors from "cors";
import notes from "./routes/note.js";
import express from "express";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/note", notes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
