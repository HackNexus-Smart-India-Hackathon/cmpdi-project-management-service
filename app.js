import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// import projectRoutes from "./routes/projectRoutes.js";
import formRoutes from "./routes/formRoutes.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/api/projects", projectRoutes);
app.use("/api/forms", formRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
