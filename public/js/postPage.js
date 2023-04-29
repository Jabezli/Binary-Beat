const editBtn = document.querySelector(".editPost");
const deleteBtn = document.querySelector(".deletePost");

const editHandler = async () => {
  const titleEl = document.getElementById("postTitle").value;
  const bodyEl = document.getElementById("postBody").value;

  const pathName = location.pathname.split("/post/");

  const postNum = parseInt(pathName[1]);

  console.log(pathName);
  console.log(postNum);

  if (titleEl && bodyEl) {
    const res = await fetch('/api/post', {
      method: 'PUT',
      body: JSON.stringify({ title, content, post_id: postNum }),
      headers: { 'Content-Type': 'application/json' },
    });
  //   titleEl.innerHTML = post.title;
  //   bodyEl.innerHTML = post.body;

  //   titleEl.contentEditable = true;
  //   bodyEl.contentEditable = true;

  //   editBtn.textContent = "Save";
};

editBtn.addEventListener("click", () => {
  editHandler();
  titleEl.contentEditable = false;
  bodyEl.contentEditable = false;

  editBtn.textContent = "Edit Post";
});
