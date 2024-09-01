import * as booksServices from "../services/booksServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

const getBooks = async (req, res) => {
  const { query } = req.query;
  console.log(query);

  const result = await booksServices.all();

  res.json(result);
};

const addBook = async (req, res) => {
  const result = await booksServices.add(req.body);
  res.status(201).json(result);
};

const updateBook = async (req, res) => {
  const { id } = req.params;

  const result = await booksServices.updateBookById(id, req.body);
  if (!result) {
    throw HttpError(404, `Book with ${id} not found`);
  }

  res.json(result);
};

const deleteBook = async (req, res) => {
  const { id } = req.params;

  const result = await booksServices.deleteBookById(id);
  if (!result) {
    throw HttpError(404, `Book with ${id} not found`);
  }

  res.json({ message: "Delete success" });
};

const toggleBook = async (req, res) => {
  const { id } = req.params;

  const result = await booksServices.updateBookBorrowed(id);
  if (!result) {
    throw HttpError(404, `Book with ${id} not found`);
  }
  res.json(result);
};

const searchBook = async (req, res) => {
  const { query } = req.query;
  const result = await booksServices.searchBookName(query, query);

  res.json(result);
};

export default {
  getBooks: ctrlWrapper(getBooks),
  addBook: ctrlWrapper(addBook),
  updateBook: ctrlWrapper(updateBook),
  deleteBook: ctrlWrapper(deleteBook),
  toggleBook: ctrlWrapper(toggleBook),
  searchBook: ctrlWrapper(searchBook),
};
