class BookView{constructor(){this.app=document.querySelector("#app")}displayAddBookForm(){this.app.innerHTML=` 
      <div id="error-message" class="alert alert-dismissible alert-danger mb-3" style="display:none; max-width: 50rem; margin: 0 auto;"></div>
      <div class="card border-primary mb-3" style="max-width: 60rem; margin: 0 auto;">
          <form id="addBookForm">
            <div class="row m-3">
                <div class="col">
                  <label for="author" class="form-label">Author</label>
                  <input type="text" id="author" name="author" class="form-control">
                </div>
            </div>
            <div class="row m-3">
                <div class="col">
                  <label for="title" class="form-label">Title</label>
                  <input type="text" id="title" name="title" class="form-control">
                </div>
            </div>
            <div class="row m-3">
                <div class="col">
                  <label for="isbn" class="form-label">ISBN</label>
                  <input type="text" id="isbn" name="isbn" class="form-control">
                </div>
            </div>
            <div class="row m-3">
                <div class="col">
                  <label for="description" class="form-label">Description</label>
                  <textarea id="description" name="description" class="form-control"></textarea>
                </div>
            </div>
            <div class="row">
                <div class="text-center m-3">
                    <button type="submit" class="btn btn-primary">Add Book</button>
                </div>
            </div>
          </form>
      </div>`}displayBookList(a){return 0===a.length?void(this.app.innerHTML=`
        <h2>Book List</h2>
        <p>No books available yet.</p>`):void(this.app.innerHTML=`
      <div id="success-message" class="alert alert-dismissible alert-success mb-3" style="display:none; max-width: 50rem;margin: 0 auto;"></div>
      <h2>Book List</h2>
      <table class="table table-hover" is="list" style="max-width: 95vw; margin: 0 auto;">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Details</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody id="bookList">
          ${a.map((a,b)=>`
            <tr id="bookDetail-${b}" class="table-light">
              <td>${a.title}</td>
              <td>${a.author}</td>
              <td>${a.isbn}</td>
              <td><button data-index="${b}" class="details-button" id="detailsButton" onclick="location.hash='details-${b}'"> <i class="fa-solid fa-circle-info"></i></button></td>
              <td><button data-index="${b}" class="delete-button" id="deleteButton"> <i class="fa-solid fa-trash-can"></i></button></td>
            </tr>`).join("")}
        </tbody>
      </table>`,this.app.querySelectorAll(".delete-button").forEach(a=>{a.addEventListener("click",a=>{const b=a.target.closest("button").dataset.index;this.handleDeleteBook(b)})}))}displayZeroDetails(){this.app.innerHTML=`
      <h2>Nothing found here!</h2>
      <p>Please make sure to select a book at <a href=#list>Book List</a>.<br>
        Details will then be shown here!</p>`}displayBookDetails(a){this.app.innerHTML=`
    <div class="tab-content mt-3">
      <div class="card border-primary mb-3" style="max-width: 40rem; margin: 0 auto;">
        <div class="card-header">
          <i class="fa-solid fa-circle-info info-icon"></i>
          <p class="card-text">Author: ${a.author}</p>
          <p class="card-text">Title: ${a.title}</p>
          <p class="card-text">ISBN: ${a.isbn}</p>
        </div>
        <div class="card-body book-info text-break">
          <p>${a.description}</p>
        </div>
      </div>
    </div>`}displayErrorPage(){this.app.innerHTML=`
        <h2>404</h2>
        <h4>UH OH! You're lost.</h4>
        <p>The page you are looking for does not exist.<br>
          How you got here is a mystery.<br>
          If you want a safer place to stay, just go to <a href=#list>Book List</a>.
        </p>`}bindAddBook(a){document.querySelector("#addBookForm").addEventListener("submit",b=>{b.preventDefault();const c=document.querySelector("#title").value,d=document.querySelector("#author").value,e=document.querySelector("#isbn").value,f=document.querySelector("#description").value;a(c,d,e,f)})}setOnDeleteBook(a){this.onDeleteBook=a}handleDeleteBook(a){"function"==typeof this.onDeleteBook&&this.onDeleteBook(a)}}