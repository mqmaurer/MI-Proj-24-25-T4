import Animator from "./Animator";

export default class MessageBox {
  static showMessage(message, className) {
    const $messageBox = document.querySelector("#message-box");
    const $message = document.createElement("div");

    $message.innerHTML = message;
    $message.classList.add(className, "alert");

    $messageBox.appendChild($message);

    Animator.showElement($messageBox);

    //  Clear in 2 seconds
    setTimeout(() => {
      Animator.hideElement($messageBox, () => {
        $message.remove();
      });
    }, 3000);
  }
}
