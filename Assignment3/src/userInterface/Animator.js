import anime from "animejs";

export function Animator() {
  function moveToRight(element, callback) {
    anime({
      targets: element,
      translateX: 5000,
      easing: "easeInQuad",
      complete: function () {
        callback();
      },
    });
  }

  function showElement(element) {
    anime({
      targets: element,
      opacity: [0, 1],
    });
  }

  function hideElement(element, callback) {
    anime({
      targets: element,
      opacity: [1, 0],
      complete: function () {
        callback();
      },
    });
  }

  return {
    moveToRight: moveToRight,
    showElement: showElement,
    hideElement: hideElement,
  };
}
