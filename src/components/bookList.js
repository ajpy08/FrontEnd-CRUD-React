import React from 'react'

const BookList = ({ book, setBook, books, setListUpdated }) => {

    /* #region  Handles para eventos */
    const handleDelete = (id) => {
        // query DELETE
        const requestInit = {
            method: 'DELETE'
        }
        fetch('http://localhost:9000/api/' + id, requestInit)
            .then(res => res.text())
            .then(res => console.log(res))

        setListUpdated(true)
    }

    let { titulo, autor, edicion } = book;
    const handleUpdate = (id) => {
        edicion = parseInt(edicion, 10)

        // validación de los datos
        if (titulo === '' || autor === '' || edicion <= 0) {
            alert('Todos los campos son obligatorios')
            return
        }

        // query PUT
        const requestInit = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        }
        fetch('http://localhost:9000/api/' + id, requestInit)
            .then(res => res.text())
            .then(res => console.log(res))

        // reiniciando state de libro
        setBook({
            titulo: '',
            autor: '',
            edicion: 0
        })

        setListUpdated(true)
    }
    /* #endregion */

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Edition</th>
                </tr>
            </thead>
            <tbody>
                {
                    books.map(b => (
                        <tr key={b.Id}>
                            <td>{b.Id}</td>
                            <td>{b.Titulo}</td>
                            <td>{b.Autor}</td>
                            <td>{b.Edicion}</td>
                            <td>
                                <div className="mb-3">
                                    <button onClick={() => { handleDelete(b.Id) }} className="btn btn-danger">Delete</button>
                                </div>
                                <div className="mb-3">
                                    <button onClick={() => { handleUpdate(b.Id) }} className="btn btn-dark">Update</button>
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

export default BookList;