import moviesController from "./moviesController.js";
import express from "express";

const router = express.Router();

router.get("/", moviesController.index)
router.get("/:slug", moviesController.show)

export default router;
