import Controller from "./controller/controller";

// Just for testing purposes
const testData = [
  {
    author: "Max",
    title: "Hello World",
    isbn: "123-4567-89-2",
    description:
      "First Lorem ipsum dolor sit amet, consetetur sadipscing elitr",
  },
  {
    author: "Mike",
    title: "Crazy Game",
    isbn: "123-4567-89-X",
    description:
      "Third Lorem ipsum dolor sit amet, consetetur sadipscing elitr",
  },
  {
    author: "Fritz",
    title: "Hello Dave",
    isbn: "123-4567-89-5",
    description:
      "Second Lorem ipsum dolor sit amet, consetetur sadipscing elitr",
  },
  {
    author: "Adam",
    title: "Hello Adam",
    isbn: "123-4567-87-8",
    description:
      "Second Lorem ipsum dolor sit amet, consetetur sadipscing elitr",
  },
  {
    author: "Zlatan",
    title: "Hello Zlatan",
    isbn: "123-4567-87-7",
    description:
      "Second Lorem ipsum dolor sit amet, consetetur sadipscing elitr",
  },
];
localStorage.setItem("books", JSON.stringify(testData));

// Start the app
document.addEventListener("DOMContentLoaded", () => {
  const controller = new Controller();
  controller.init();
});
