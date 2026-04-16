import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOrder, setSortBy, fetchBooks } from "../State/bookSlice";

const App = () => {
  const { list, loading, error, sortBy, order } = useSelector(
    (state) => state.books
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const sortedBooks = [...(list || [])]
    .filter((book) => book?.volumeInfo)
    .sort((a, b) => {
      const infoA = a.volumeInfo || {};
      const infoB = b.volumeInfo || {};

      let valA = "";
      let valB = "";

      if (sortBy === "title") {
        valA = infoA.title || "";
        valB = infoB.title || "";
      } else if (sortBy === "author") {
        valA = (infoA.authors && infoA.authors[0]) || "";
        valB = (infoB.authors && infoB.authors[0]) || "";
      } else {
        valA = infoA.publisher || "";
        valB = infoB.publisher || "";
      }

      return order === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });

 return (
  <div>
    <h1>Books List</h1>

    {/* SORT */}
    <label>Sort by:</label>
    <select
      value={sortBy}
      onChange={(e) => dispatch(setSortBy(e.target.value))}
    >
      <option value="title">Title</option>
      <option value="author">Author</option>
      <option value="publisher">Publisher</option>
    </select>

    {/* ORDER */}
    <label>Order:</label>
    <select
      value={order}
      onChange={(e) => dispatch(setOrder(e.target.value))}
    >
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>

    {loading && <p>Loading...</p>}
    {error && <p>{error}</p>}

    <table border="1">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Publisher</th>
          <th>ISBN</th>
        </tr>
      </thead>

      <tbody>
        {(sortedBooks || []).slice(0, 60).map((book, index) => {
          const info = book.volumeInfo || {};
          return (
            <tr key={index}>
              <td>{info.title || "N/A"}</td>
              <td>{info.authors ? info.authors.join(", ") : "N/A"}</td>
              <td>{info.publisher || "N/A"}</td>
              <td>
                {info.industryIdentifiers?.[0]?.identifier || "N/A"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default App;