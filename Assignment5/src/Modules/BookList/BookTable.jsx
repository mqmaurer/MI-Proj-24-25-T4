// import React from 'react';
import { useNavigate } from 'react-router-dom';
//import BookDetail from '../BookDetail';

const BookTable = ({ books }) => {
      const navigate = useNavigate();

    const onDetailClick = (book) => {
     navigate('/details', { state: {book} });
    };

    const onRemoveClick = (book) => {
      books = books.filter((b) => b.isbn == book.isbn);
      console.log(books);
    };


    return (
        <table className="table table-striped mt-5">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Detail</th>
            <th>Delete</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.isbn} data-isbn={book.isbn}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>
                <a
                  className="fas fa-eye text-primary detail-button"
                  onClick={() => onDetailClick(book)}
                ></a>
              </td>
              <td>
                <a
                  className="fas fa-trash text-primary remove-button"
                  onClick={() => onRemoveClick(book.isbn)}
                ></a>
              </td>
              {/* <Rating
                rating={book.rating}
                isbn={book.isbn}
                onRatingClick={onRatingClick}
              /> */}
            </tr>
          ))}
        </tbody>
      </table>
    );
};

export default BookTable;