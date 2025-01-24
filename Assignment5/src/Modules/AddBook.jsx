const AddBook = () => {
  return (
    <div className="container mt-4">
      <form id="book-form">
        <div class="form-group">
          <label htmlFor="author">Author</label>
          <input type="text" id="author" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="title">Titel</label>
          <input type="text" id="title" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="isbn">ISBN</label>
          <input type="text" id="isbn" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary btn-block add-button">
          <i className="fas fa-plus"></i> Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
