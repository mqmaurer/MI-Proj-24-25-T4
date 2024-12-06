import anime from "animejs/lib/anime.es.js";

class Animator {
  static moveToRight(element, callback) {
    anime({
      targets: element,
      translateX: 5000,
      easing: "easeInQuad",
      complete() {
        callback();
      },
    });
  }

  static showElement(element) {
    anime({
      targets: element,
      opacity: [0, 1],
    });
  }

  static hideElement(element, callback) {
    anime({
      targets: element,
      opacity: [1, 0],
      complete() {
        callback();
      },
    });
  }
}

export default Animator;
