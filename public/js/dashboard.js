const deleteBtns = document.querySelectorAll(".deleteBtn");

deleteBtns.forEach((btn) => {
  btn.addEventListener("click", async (event) => {
    event.preventDefault();

    const id = btn.getAttribute("postId");
    console.log(id);
  });
});
