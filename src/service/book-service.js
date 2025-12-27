import { validate } from "../validation/validation.js";
import {
  createBookValidation,
  getBookValidation,
  borrowBookValidation,
  returnBookValidation,
} from "../validation/book-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const createBook = async (request) => {
  const book = validate(createBookValidation, request);

  return prismaClient.book.create({
    data: {
      title: book.title,
      author: book.author,
      stock: book.stock,
      totalStock: book.stock, // ✅ DIISI DARI stock
    },
    select: {
      title: true,
      author: true,
      stock: true,
      totalStock: true,
    },
  });
};

const getBook = async (bookId) => {
  const id = validate(getBookValidation, Number(bookId));

  const book = await prismaClient.book.findUnique({
    where: { id },
    select: { id: true, title: true, author: true, stock: true },
  });

  if (!book) throw new ResponseError(404, "Book not found");
  return book;
};

const getAllBook = async () => {
  return prismaClient.book.findMany({
    select: {
      id: true,
      title: true,
      author: true,
      stock: true,
    },
  });
};

const borrow = async (request) => {
  const reqVal = validate(borrowBookValidation, request);
  const memberId = reqVal.member_id;
  const bookId = reqVal.book_id;

  return prismaClient.$transaction(async (tx) => {
    // 1) check member exists
    const member = await tx.member.findUnique({
      where: { id: memberId },
      select: { id: true, quota: true },
    });

    if (!member) {
      throw new ResponseError(
        404,
        "Member tidak ditemukan",
        "ZYD-ERR-404-MEMBER"
      );
    }

    // 2) check book exists + stock
    const book = await tx.book.findUnique({
      where: { id: bookId },
      select: { id: true, stock: true },
    });

    if (!book || book.stock <= 0) {
      throw new ResponseError(400, "Stok buku habis", "ZYD-ERR-001");
    }

    // 3) check active borrow count vs quota
    const activeBorrowCount = await tx.borrow.count({
      where: {
        memberId,
        returnedAt: null,
      },
    });

    if (activeBorrowCount >= member.quota) {
      throw new ResponseError(400, "Kuota pinjam member habis", "ZYD-ERR-002");
    }

    // 4) create borrow
    const borrowRow = await tx.borrow.create({
      data: {
        memberId,
        bookId,
      },
      select: {
        id: true,
        memberId: true,
        bookId: true,
        borrowedAt: true,
        returnedAt: true,
      },
    });

    // 5) decrement stock
    await tx.book.update({
      where: { id: bookId },
      data: { stock: { decrement: 1 } },
    });

    return {
      borrow_id: borrowRow.id,
      member_id: borrowRow.memberId,
      book_id: borrowRow.bookId,
      status: "BORROWED",
      borrowed_at: borrowRow.borrowedAt,
    };
  });
};

const returnBook = async (request) => {
  const { member_id, book_id } = validate(returnBookValidation, request);

  return prismaClient.$transaction(async (tx) => {
    // 1️⃣ cari borrow aktif
    const borrow = await tx.borrow.findFirst({
      where: {
        memberId: member_id,
        bookId: book_id,
        returnedAt: null,
      },
      select: {
        id: true,
        borrowedAt: true,
      },
    });

    if (!borrow) {
      throw new ResponseError(
        400,
        "Buku tidak sedang dipinjam atau sudah dikembalikan",
        "ZYD-ERR-005"
      );
    }

    // 2️⃣ update returnedAt
    await tx.borrow.update({
      where: { id: borrow.id },
      data: { returnedAt: new Date() },
    });

    // 3️⃣ tambah stok buku
    await tx.book.update({
      where: { id: book_id },
      data: { stock: { increment: 1 } },
    });

    return {
      member_id,
      book_id,
      status: "RETURNED",
      borrowed_at: borrow.borrowedAt,
      returned_at: new Date(),
    };
  });
};

export default {
  getBook,
  getAllBook,
  createBook,
  borrow,
  returnBook,
};
