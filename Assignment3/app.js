import { Controller } from "./src/controller/controller.js";

// Just for testing purposes
const testData = [
  {
    author: "Max",
    title: "Hello World",
    isbn: "123-4567-89-X",
    description:
      "First Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,  sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.  ",
  },
  {
    author: "Fritz",
    title: "Hello Dave",
    isbn: "123-4567-89-1",
    description:
      "Second  Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,  sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.  ",
  },
  {
    author: "Mike",
    title: "Crazy Game",
    isbn: "123-4567-89-2",
    description:
      "Third Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,  sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.  ",
  },
];
localStorage.setItem("books", JSON.stringify(testData));

// Start the app
document.addEventListener("DOMContentLoaded", function () {
  Controller();
});