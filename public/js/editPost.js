const submitBtn = document.querySelector("#submitBtn");

const editHandler = async () => {
  const title = document.querySelector(".postTitle").value;
  const body = document.querySelector(".postBody").value;

  const pathName = location.pathname.split("dashboard/post/");

  const postNum = parseInt(pathName[1]);

  if (title && body) {
    const response = await fetch("/api/post", {
      method: "PUT",
      body: JSON.stringify({ title, body, post_id: postNum }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    }
  }
};

submitBtn.addEventListener("click", editHandler);
