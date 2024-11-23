function NavUpdater() {
  const $navigation = document.querySelector("#navigation");

  function updateActiveInNav(hash) {
    // remove old active class from tab
    $navigation.querySelectorAll(".nav-link").forEach(function ($link) {
      $link.classList.remove("active");
    });

    // add new active class to clicked tab
    let $clickedTab = $navigation.querySelector(`[href='${hash}'`);

    const booksDetailRoute = /details\/[0-9]*/;
    if (booksDetailRoute.test(hash)) {
      $clickedTab = $navigation.querySelector("[href='#/details'");
    }

    if ($clickedTab) {
      $clickedTab.classList.add("active");
    }
  }

  return {
    updateActiveInNav: updateActiveInNav,
  };
}
