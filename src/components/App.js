import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOrder, setSortBy, fetchBooks } from "../State/bookSlice";

const App = () => {
    const dispatch = useDispatch();

  const { books, loading, error, sortBy, order } = useSelector(
    (state) => state.books
  );

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  // sorting logic
  const sortedBooks = [...books].sort((a, b) => {
    const valA = a[sortBy]?.toLowerCase() || "";
    const valB = b[sortBy]?.toLowerCase() || "";

    if (order === "asc") return valA > valB ? 1 : -1;
    return valA < valB ? 1 : -1;
  });

  return (
    <div>
      <h1>Books List</h1>

      {/* MUST be first select */}
      <select onChange={(e) => dispatch(setSortBy(e.target.value))}>
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="publisher">Publisher</option>
      </select>

      {/* MUST be second select */}
      <select onChange={(e) => dispatch(setOrder(e.target.value))}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* Cypress expects table */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
          </tr>
        </thead>

        <tbody>
          {sortedBooks.map((book, index) => (
            <tr key={index}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.isbn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )};

export default App;