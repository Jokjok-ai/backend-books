import bookService from "../service/book-service.js";

const createBook = async (req, res, next) => {
  console.log("createBook HIT");

  try {
    const result = await bookService.createBook(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getAllBook = async (req, res, next) => {
  console.log("LISTBOOK HIT");

  try {
    const result = await bookService.getAllBook();

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getBook = async (req, res, next) => {
  try {
    const result = await bookService.getBook(req.params.bookId);
    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

const borrow = async (req, res, next) => {
  try {
    const result = await bookService.borrow(req.body);
    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

const returnBook = async (req, res, next) => {
  try {
    const result = await bookService.returnBook(req.body);
    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

export default {
  createBook,
  getAllBook,
  getBook,
  borrow,
  returnBook,
};
