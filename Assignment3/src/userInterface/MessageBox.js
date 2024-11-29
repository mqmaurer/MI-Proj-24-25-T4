export function MessageBox(messageBoxId, animator) {
  const $messageBox = document.querySelector(messageBoxId);
  const animaterRef = animator;

  function showMessage(message, className) {
    const $message = document.createElement("div");
    $message.innerHTML = message;
    $message.classList.add(className, "alert");

    $messageBox.appendChild($message);

    animaterRef.showElement($messageBox);

    //  Clear in 2 seconds
    setTimeout(function () {
      animaterRef.hideElement($messageBox, function () {
        $message.remove();
      });
    }, 3000);
  }

  return {
    showMessage: showMessage,
  };
}
