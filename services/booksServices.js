import * as fs from "node:fs/promises";
import * as path from "node:path";
import { nanoid } from "nanoid";

const booksPath = path.resolve("db", "books.json");

const updateBooks = (books) =>
  fs.writeFile(booksPath, JSON.stringify(books, null, 2));

export const all = async () => {
  const data = await fs.readFile(booksPath, "utf-8");
  return JSON.parse(data);
};

export const add = async (data) => {
  const books = await all();
  const newBook = {
    id: nanoid(),
    isBorrowed: false,
    ...data,
  };
  books.push(newBook);
  await updateBooks(books);

  return newBook;
};

export const updateBookById = async (id, data) => {
  const books = await all();
  const index = books.findIndex((inx) => inx.id === id);
  if (index === -1) {
    return null;
  }

  books[index] = { ...books[index], ...data };

  await updateBooks(books);

  return books[index];
};

export const deleteBookById = async (id) => {
  const books = await all();
  const index = books.findIndex((inx) => inx.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = books.splice(index, 1);

  await updateBooks(books);

  return result;
};

export const updateBookBorrowed = async (id) => {
  const books = await all();
  const index = books.findIndex((inx) => inx.id === id);
  if (index === -1) {
    return null;
  }

  const currentBook = books[index];

  currentBook.isBorrowed = !currentBook.isBorrowed;

  await updateBooks(books);

  return currentBook;
};

export const searchBookName = async (bookName) => {
  const books = await all();
  const filterBook = books.filter(
    (item) =>
      item.title.includes(bookName.toLowerCase()) ||
      item.isbn.includes(bookName)
  );

  return filterBook;
};
