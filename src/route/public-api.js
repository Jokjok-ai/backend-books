import express from "express";
import bookController from "../controller/book-controller.js";
import healthController from "../controller/health-controller.js";
import memberController from "../controller/member-controller.js";

const publicRouter = new express.Router();

publicRouter.get("/ping", healthController.ping);

publicRouter.post("/api/members", memberController.create);
publicRouter.get("/api/members/:memberId", memberController.get);

publicRouter.post("/api/addbook", bookController.createBook);
publicRouter.get("/api/listbook", bookController.getAllBook);
publicRouter.post("/api/borrow", bookController.borrow);
publicRouter.post("/api/return", bookController.returnBook);
publicRouter.get("/api/getbook/:bookId", bookController.getBook);

export { publicRouter };
