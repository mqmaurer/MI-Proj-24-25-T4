import NotFound from "../view/NotFound";
import NavUpdater from "../userInterface/NavUpdater";

class Router {
  constructor() {
    this.routes = [];

    this.notFoundView = new NotFound();
    this.navUpdater = new NavUpdater();

    window.onhashchange = () => {
      this.determineCurrentRouteAndExecuteCallback();
    };
  }

  determineCurrentRouteAndExecuteCallback() {
    const { hash } = window.location;

    if (hash === "") {
      window.location.hash = "#/books";
      window.location.reload();
    }

    let foundRouteObject;

    this.routes.forEach((routeObject) => {
      if (hash.includes(routeObject.route)) {
        foundRouteObject = routeObject;
      }
    });

    if (foundRouteObject) {
      foundRouteObject.callback();
      this.navUpdater.updateActiveInNav(hash);
    } else {
      this.notFoundView.renderView();
    }
  }

  addRoute(route, callback) {
    this.routes.push({ route, callback });
  }
}

export default Router;
