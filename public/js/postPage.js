const sendBtn = document.querySelector(".sendBtn");

const leaveComment = async () => {
  try {
    const comment = document.querySelector(".commentContent").value;
    console.log(comment);
    const pathName = location.pathname.split("/post/");
    const postNum = parseInt(pathName[1]);

    console.log(postNum);

    if (comment) {
      const response = await fetch("/api/comment/", {
        method: "POST",
        body: JSON.stringify({ comment, post_id: postNum }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        console.log(response.ok);
        document.location.reload();
      } else {
        alert("Please login before leaving comment.");
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
