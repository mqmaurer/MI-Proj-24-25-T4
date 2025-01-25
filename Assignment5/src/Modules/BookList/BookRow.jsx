import React from 'react';
import PropTypes from 'prop-types';

const BookRow = ({ book }) => {
    return (
        <div className="book-row">
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>{book.year}</p>
        </div>
    );
};

BookRow.propTypes = {
    book: PropTypes.shape({
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
    }).isRequired,
};

export default BookRow;