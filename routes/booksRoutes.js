import { Router } from "express";

import booksControllers from "../controllers/booksControllers.js";

import validateBody from "../decorators/validateBody.js";
import { bookAddSchema, bookUpdateSchema } from "../schemas/schemaBook.js";

const addMiddleware = validateBody(bookAddSchema);
const updateMiddleware = validateBody(bookUpdateSchema);

const booksRouter = Router();

booksRouter.get("/", booksControllers.getBooks);

booksRouter.post("/", addMiddleware, booksControllers.addBook);

booksRouter.put(
  "/:id",

  updateMiddleware,
  booksControllers.updateBook
);

booksRouter.delete("/:id", booksControllers.deleteBook);

booksRouter.patch("/:id/borrow", booksControllers.toggleBook);

booksRouter.get("/search", booksControllers.searchBook);

export default booksRouter;
