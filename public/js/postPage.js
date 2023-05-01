const sendBtn = document.querySelector(".sendBtn");

const leaveComment = async () => {
  try {
    const comment = document.querySelector(".commentContent").value;

    const pathName = location.pathname.split("/post/");
    const postNum = parseInt(pathName[1]);

    if (comment) {
      const response = await fetch("/api/comment/", {
        method: "POST",
        body: JSON.stringify({ comment, post_id: postNum }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        document.location.reload();
      }
    } else {
      alert("Oops! Looks like you forgot to type your comment!");
      return;
    }
  } catch (err) {
    console.error(err);
  }
};

sendBtn.addEventListener("click", leaveComment);
