export function ThemeSwitcher() {
  let theme = "default";

  document
    .querySelector("#jumbotron-icon")
    .addEventListener("click", switchTheme);

  function switchTheme() {
    addLoadingScreen();

    setTimeout(function () {
      let $stylesheet = document.querySelector("#stylesheet");
      if (theme === "default") {
        $stylesheet.setAttribute("href", "src/assets/css/bootstrap.dark.css");
        theme = "dark";
      } else {
        $stylesheet.setAttribute("href", "src/assets/css/bootstrap.default.css");
        theme = "default";
      }
    }, 1000);
  }

  function addLoadingScreen() {
    const $loadingScreen = document.createElement("div");
    $loadingScreen.setAttribute(
      "style",
      "height: 100vh; width: 100vw; position: absolute; top: 0; background: white"
    );

    // align spinner horizontal and vertical in center
    $loadingScreen.classList.add(
      "d-flex",
      "justify-content-center",
      "align-items-center"
    );

    $loadingScreen.innerHTML = `
    <div style="width: 200px">
        <div class="spinner-grow" style="width: 150px; height: 150px; color: #78C2AD" role="status">
            
        </div>
    </div>
    `;

    const $body = document.querySelector("body");
    $body.appendChild($loadingScreen);

    // removes loading screen after 3000ms
    setTimeout(function () {
      $loadingScreen.remove();
    }, 3000);
  }

  return {
    switchTheme: switchTheme,
  };
}
