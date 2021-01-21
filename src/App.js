import React, { Fragment, useState, useEffect } from 'react'
import Navbar from './components/navbar';
import BookList from './components/bookList'
import Form from './components/form'

function App() {
  /* #region  Hook useState */
  const [book, setBook] = useState({
    titulo: '',
    autor: '',
    edicion: 0
  })

  const [books, setBooks] = useState([])
  const [listUpdated, setListUpdated] = useState(false)
  /* #endregion */


  /* #region  Hook useEffect */
  // es como un constructor es lo que se ejecuta al inicio
  useEffect(() => {
    const getBooks = () => {
      fetch('http://localhost:9000/api')
        .then(res => res.json())
        .then(res => setBooks(res))
      // .then(res => console.log(res))
    }
    getBooks()
    setListUpdated(false)
  }, [listUpdated])
  /* #endregion */

  return (
    <Fragment>
      <Navbar brand='Library App' />
      <div className="container">
        <div className="row">
          <div className="col-7">
            <h2 style={{ textAlign: "center" }}>Book List</h2>
            <BookList book={book} setBook={setBook} books={books} setListUpdated={setListUpdated} />
          </div>
          <div className="col-5">
            <h2 style={{ textAlign: "center" }}>Book Form</h2>
            <Form book={book} setBook={setBook} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
