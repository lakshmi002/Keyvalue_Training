import { book, time} from "./bookRoutes";

import express, { Request, Response } from "express";
import loggerMiddleware from "./logger/loggerMiddleware";
import bodyParser from "body-parser";
import dataSource from "./db/data-source.db";
import employeeRouter from "./routes/employee.routes";
import HttpException from "./exception/http.exception";
import 'reflect-metadata';
import departmentRouter from "./routes/department.route";
//import book from "./bookRoutes";

const app = express();
const PORT = 3000;
// Middleware to parse JSON requests
//app.use(express.json());
app.use(bodyParser.json());
app.use(loggerMiddleware);
app.use('/books',book);
app.use('/employee', employeeRouter);
app.use('/department',departmentRouter);

// app.use((err:any, req:any, res:any, next:any) => {
//   console.error(err.stack);
//   res.status(500).send({ error: err.message });
// });

app.use((err: Error, req: any, res: any, next:any) => {
  console.error(err.stack);
  if (err instanceof HttpException) {
      res.status(err.status).send({ error: err.message, code: err.status });
      return;
}
res.status(500).send({ error: err.message });
});

// Define types for Book and Chapter
// interface Chapter {
//   id: number;
//   title: string;
// }

// interface Book {
//   id: number;
//   title: string;
//   author: string;
//   chapters: Chapter[];
// }

// // Simple in-memory database to store data
// let books: Book[] = [
//   {
//     id: 1,
//     title: "Sample Book 1",
//     author: "John Doe",
//     chapters: [
//       { id: 11, title: "Book 1 Chapter 1" },
//       { id: 12, title: "Book 1 Chapter 2" },
//       { id: 13, title: "Book 1 Chapter 3" },
//       { id: 14, title: "Book 1 Chapter 4" },
//       { id: 15, title: "Book 1 Chapter 5" },
//       { id: 16, title: "Book 1 Chapter 6" },
//     ],
//   },
//   {
//     id: 2,
//     title: "Sample Book 2",
//     author: "Jane Smith",
//     chapters: [
//       { id: 21, title: "Book 2 Chapter 1" },
//       { id: 22, title: "Book 2 Chapter 2" },
//       { id: 23, title: "Book 2 Chapter 3" },
//       { id: 24, title: "Book 2 Chapter 4" },
//       { id: 25, title: "Book 2 Chapter 5" },
//       { id: 26, title: "Book 2 Chapter 6" },
//       { id: 27, title: "Book 2 Chapter 7" },
//     ],
//   },
// ];

// let bookIdCount = books.length;

// function withoutProperty<T extends object, K extends keyof T>(obj: T, property: K): Omit<T, K> {
//   const { [property]: unused, ...rest } = obj;
//   return rest;
// }

// // app.get("/book", (req: Request, res: Response) => {
// //   let booksList = books.map((book) => withoutProperty(book, "chapters"));
// //   res.json(booksList);
// // });

// // app.get("/getBookById", (req: Request, res: Response) => {
// //   const id = parseInt(req.query.id as string);
// //   const book = books.find((book) => book.id === id);
// //   if (book) {
// //     res.json(withoutProperty(book, "chapters"));
// //   } else {
// //     res.status(404).json({ message: "Book not found" });
// //   }
// // });

// // app.post("/createBook", (req: Request, res: Response) => {
// //   const { title, author } = req.body;
// //   bookIdCount += 1;
// //   const newBook: Book = { id: bookIdCount, title, author, chapters: [] };
// //   books.push(newBook);
// //   res.status(201).json(newBook);
// // });

// // RESTful routes
// // GET all books
// // app.get("/books", (req: Request, res: Response) => {
// //   let booksList = books.map((book) => withoutProperty(book, "chapters"));
// //   res.json(booksList);
// // });

// // // GET a specific book by ID
// // app.get("/books/:id", (req: Request, res: Response) => {
// //   const id = parseInt(req.params.id);
// //   const book = books.find((book) => book.id === id);
// //   if (book) {
// //     res.json(withoutProperty(book, "chapters"));
// //   } else {
// //     res.status(404).json({ message: "Book not found" });
// //   }
// // });
// { Request, Response }
// // // POST a new book
// // app.post("/books", (req: Request, res: Response) => {
// //   const { title, author } = req.body;
// //   bookIdCount += 1;
// //   const newBook: Book = { id: bookIdCount, title, author, chapters: [] };
// //   books.push(newBook);
// //   res.status(201).json(newBook);
// // });

// // // PUT (Update) an existing book by ID
// // app.put("/books/:id", (req: Request, res: Response) => {
// //   const id = parseInt(req.params.id);
// //   const { title, author } = req.body;
// //   const bookIndex = books.findIndex((book) => book.id === id);
// //   if (bookIndex !== -1) {
// //     books[bookIndex] = { id, title, author, chapters: [] };
// //     res.json(books[bookIndex]);
// //   } else {
// //     res.status(404).json({ message: "Book not found" });
// //   }
// // });

// // // DELETE a book by ID
// // app.delete("/books/:id", (req: Request, res: Response) => {
// //   const id = parseInt(req.params.id);
// //   books = books.filter((book) => book.id !== id);
// //   res.sendStatus(204);
// // });

// // app.get("/books/:id/chapters", (req: Request, res: Response) => {
// //   const id = parseInt(req.params.id);
// //   const book = books.find((book) => book.id === id);
// //   if (book) {
// //     res.json(book.chapters);
// //   } else {
// //     res.status(404).json({ message: "Book not found" });
// //   }
// // });

// // app.get("/books/:id/chapters/:chapterId", (req: Request, res: Response) => {
// //   const id = parseInt(req.params.id);
// //   const chapterId = parseInt(req.params.chapterId);
// //   const book = books.find((book) => book.id === id);
// //   if (book) {
// //     const chapter = book.chapters.find((chapter) => chapter.id === chapterId);
// //     res.json(chapter);
// //   } else {
// //     res.status(404).json({ message: "Book not found" });
// //   }
// // });


(async () => {
    try {
      await dataSource.initialize();
    } catch (e) {
      console.log("Failed to connect to db", e);
      process.exit(1);
    }
  
    app.listen(3001, () => {
      console.log("server listening to 3001");
    });
  })();

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

