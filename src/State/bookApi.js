const API_KEY = "pumG564AAxuSAFESgmKh8OOXeaCXWdlIJAaxUT6rq3R9PGsv";

export const fetchBooksAPI = async () => {
  const response = await fetch(
    `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  const data = await response.json();

  const lists = data.results.lists;

  // flatten books
  const books = lists.flatMap((list) =>
    list.books.map((book) => ({
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      isbn: book.primary_isbn13,
    }))
  );

  return books;
};