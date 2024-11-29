import { NotFound } from "../view/NotFound.js";
import { NavUpdater } from "../userInterface/NavUpdater.js";

export function Router() {
  const routes = [];

  const notFoundView = NotFound();
  const navUpdater = NavUpdater();

  window.onhashchange = function () {
    determineCurrentRouteAndExecuteCallback();
  };

  function determineCurrentRouteAndExecuteCallback() {
    const hash = location.hash;

    if (hash === "") {
      location.hash = "#/books";
      location.reload();
    }

    let foundRouteObject;

    for (let index = 0; index < routes.length; index++) {
      const routeObject = routes[index];
      if (hash.includes(routeObject.route)) {
        foundRouteObject = routeObject;
      }
    }

    if (foundRouteObject) {
      foundRouteObject.callback();
      navUpdater.updateActiveInNav(hash);
    } else {
      notFoundView.renderView();
    }
  }

  function addRoute(route, callback) {
    routes.push({ route, callback });
  }

  return {
    determineCurrentRouteAndExecuteCallback:
      determineCurrentRouteAndExecuteCallback,
    addRoute: addRoute,
  };
}
