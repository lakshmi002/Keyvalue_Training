import express from "express";
export const book = express.Router();

let books = [
    {
      id: 1,
      title: "Sample Book 1",
      author: "John Doe",
      chapters: [
        { id: 11, title: "Book 1 Chapter 1" },
        { id: 12, title: "Book 1 Chapter 2" },
        { id: 13, title: "Book 1 Chapter 3" },
        { id: 14, title: "Book 1 Chapter 4" },
        { id: 15, title: "Book 1 Chapter 5" },
        { id: 16, title: "Book 1 Chapter 6" },
      ],
    },
    {
      id: 2,
      title: "Sample Book 2",
      author: "Jane Smith",
      chapters: [
        { id: 21, title: "Book 2 Chapter 1" },
        { id: 22, title: "Book 2 Chapter 2" },
        { id: 23, title: "Book 2 Chapter 3" },
        { id: 24, title: "Book 2 Chapter 4" },
        { id: 25, title: "Book 2 Chapter 5" },
        { id: 26, title: "Book 2 Chapter 6" },
        { id: 27, title: "Book 2 Chapter 7" },
      ],
    },
  ];
  
  let bookIdCount = books.length;
  
  function withoutProperty<T extends object>(obj: T, property: keyof T): Omit<T, keyof T> {
    const { [property]: _, ...rest } = obj;
    return rest as Omit<T, keyof T>;
  }

// RESTful routes
// GET all books
book.get("/", (req, res) => {
    let booksList: any[] = [];
    books.forEach((book) => {
      booksList.push(withoutProperty(book, "chapters"));
    });
    res.json(booksList);
  });
  
  // GET a specific book by ID
  book.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find((book) => book.id === id);
    if (book) {
      res.json(withoutProperty(book, "chapters"));
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  });
  
  // POST a new book
  book.post("/", (req, res) => {
    const { title, author } = req.body;
    bookIdCount += 1;
    const newBook = { id: bookIdCount, title, author };
    books.push(newBook as any);
    res.status(201).json(newBook);
  });
  
  // PUT (Update) an existing book by ID
//   book.put("/books/:id", (req, res) => {
//     const id = parseInt(req.params.id);
//     const { title, author } = req.body;
//     const bookIndex = books.findIndex((book) => book.id === id);
//     if (bookIndex !== -1) {
//       books[bookIndex] = { id, title, author };
//       res.json(books[bookIndex]);
//     } else {
//       res.status(404).json({ message: "Book not found" });
//     }
//   });
  
  // DELETE a book by ID
  book.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    books = books.filter((book) => book.id !== id);
  
    res.sendStatus(204);
    //   res.json({ message: "Book deleted successfully" });
  });
  
  book.get("/:id/chapters", (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find((book) => book.id === id);
    if (book) {
      res.json(book.chapters);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  });
  
  book.get("/:id/chapters/:chapterId", (req, res) => {
    const id = parseInt(req.params.id);
    const chapterId = parseInt(req.params.chapterId);
    const book = books.find((book) => book.id === id);
    if (book) {
      const chapter = book.chapters.find((chapter) => chapter.id === chapterId);
      res.json(chapter);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  });

  export const time = new Date()
  //export default book;