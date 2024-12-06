class NotFound {
  constructor() {
    this.$viewSpace = document.querySelector("#viewSpace");
  }

  renderView() {
    const view = `
            <div class="container mt-4">
                404 - Not Found
            </div>
            `;

    this.$viewSpace.innerHTML = view;
  }
}

export default NotFound;
