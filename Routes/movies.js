import moviesController from "./moviesController.js";
import express from "express";

const router = express.Router();

router.get("/", moviesController.index)
router.get("/:id", moviesController.show)

export default router;
