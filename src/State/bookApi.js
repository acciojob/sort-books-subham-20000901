const API_KEY = "pumG564AAxuSAFESgmKh8OOXeaCXWdlIJAaxUT6rq3R9PGsv";

export const fetchBooksAPI = async () => {
  const res = await fetch(
    `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${API_KEY}`
  );

  const data = await res.json();

  const lists = data?.results?.lists || [];

  const books = lists.flatMap((list) =>
    (list.books || []).map((book) => ({
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      isbn: book.primary_isbn13,
    }))
  );

  return books.slice(0, 60);
};