const copyToClipBoard = (text: string): void => {
  const copyElement = document.body.appendChild(
    document.createElement("textarea")
  );
  copyElement.style.position = "absolute";
  copyElement.style.left = "-9999px";
  copyElement.setAttribute("readonly", "");
  copyElement.value = text;
  copyElement.select();
  console.log(text);

  debugger;
  document.execCommand("Copy");
  copyElement.parentElement?.removeChild(copyElement);
};

export default copyToClipBoard;
