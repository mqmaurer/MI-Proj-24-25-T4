class BookDetail {
  static renderView(book) {
    let view = "";

    if (!book) {
      view = `
          <div class="container mt-4">
              <div class="alert  alert-warning">
                  No Book selected!!!
              </div>
          </div>
          `;
      document.querySelector("#viewSpace").innerHTML = view;
      return;
    }

    view = `
        <div class="container mt-4">
        <div class="card mx-auto" style="max-width: 25rem;">
          <i class="fas fa-book-reader text-primary mt-4 mx-auto" style="font-size: 70px"></i>
        <div class="card-body">
          <div class="text-center">Author: ${book.author}</div>
          <div class="text-center">Title: ${book.title}</div>
          <div class="text-center">ISBN: ${book.isbn}</div>
  
          <hr />
          <div>
            ${book.description}
          </div>
        </div>
      </div>
        <div />
          `;

    document.querySelector("#viewSpace").innerHTML = view;
  }
}

export default BookDetail;
