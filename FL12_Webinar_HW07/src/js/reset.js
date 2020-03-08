const reset = () => {
  const resetBtn = document.getElementById("reset");
  resetBtn.addEventListener("click", () => {
    location.reload();
  });
};
reset();

export { reset };
