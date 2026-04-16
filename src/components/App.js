
import React,{useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';
import { setOrder,setSortBy,fetchBooks } from "../State/bookSlice";
import './../styles/App.css';

const App = () => {
  const {list,loading,error,sortBy,order} = useSelector((state) => state.books);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  },[dispatch]);

  const sortedBooks = [...list].sort((a,b) => {
    const infoA = a.volumeInfo || {};
    const infoB = b.volumeInfo || {};
     
    let valA = "";
    let valB = "";

    if(sortBy === 'title') {
       valA = infoA.title || "";
       valB = infoB.title || "";
    }else if(sortBy === 'author'){
       valA = (infoA.authors && infoA.authors[0]) || "";
      valB = (infoB.authors && infoB.authors[0]) || "";

    }else{
      valA = infoA.publisher || "";
      valB = infoB.publisher || "";
    }

    return order === "asc"
      ? valA.localeCompare(valB)
      : valB.localeCompare(valA);
  });

  return (
    <div>
       <h2>Books List</h2>

      {/* MUST MATCH CYPRESS SELECTORS */}
      <select
        value={sortBy}
        onChange={(e) => dispatch(setSortBy(e.target.value))}
      >
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="publisher">Publisher</option>
      </select>

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
          {sortedBooks.map((book, index) => {
            const info = book.volumeInfo || {};
            return (
              <tr key={index}>
                <td>{info.title}</td>
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
  )
}

export default App;
