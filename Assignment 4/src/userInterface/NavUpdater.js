class NavUpdater {
  constructor() {
    this.$navigation = document.querySelector("#navigation");
  }

  updateActiveInNav(hash) {
    // remove old active class from tab
    this.$navigation.querySelectorAll(".nav-link").forEach(($link) => {
      $link.classList.remove("active");
    });

    // add new active class to clicked tab
    let $clickedTab = this.$navigation.querySelector(`[href='${hash}'`);

    const booksDetailRoute = /details\/[0-9]*/;
    if (booksDetailRoute.test(hash)) {
      $clickedTab = this.$navigation.querySelector("[href='#/details'");
    }

    if ($clickedTab) {
      $clickedTab.classList.add("active");
    }
  }
}

export default NavUpdater;
