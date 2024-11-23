function NotFound() {
  const $viewSpace = document.querySelector("#viewSpace");

  function renderView() {
    const view = `
            <div class="container mt-4">
                404 - Not Found
            </div>
            `;

    $viewSpace.innerHTML = view;
  }

  return {
    renderView: renderView,
  };
}
