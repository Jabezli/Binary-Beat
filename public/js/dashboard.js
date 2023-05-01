const deleteBtns = document.querySelectorAll(".deleteBtn");

deleteBtns.forEach((btn) => {
  btn.addEventListener("click", async (event) => {
    event.preventDefault();

    const id = btn.getAttribute("postId");
    console.log(id);

    const response = await fetch("/api/post", {
      method: "DELETE",
      body: JSON.stringify({ post_id: id }),
      headers: { "Content-type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    }
  });
});
