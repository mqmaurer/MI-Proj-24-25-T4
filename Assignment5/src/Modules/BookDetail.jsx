import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookReader } from '@fortawesome/free-solid-svg-icons'

const BookDetail = ({ book }) => {
    if (!book) {
        return (
            <div className="container mt-4">
                <div className="alert alert-warning">
                    No Book selected!!!
                </div>
            </div>
        )
    }

    return (
        <div className="container mt-4">
            <div className="card mx-auto" style={{ maxWidth: '25rem' }}>
                <FontAwesomeIcon
                    icon={faBookReader}
                    className="text-primary mt-4 mx-auto"
                    style={{ fontSize: '70px' }}
                />
                <div className="card-body">
                    <div className="text-center">Author: {book.author}</div>
                    <div className="text-center">Title: {book.title}</div>
                    <div className="text-center">ISBN: {book.isbn}</div>

                    <hr />
                    <div>
                        {book.description}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookDetail