const submitBtn = document.getElementById("submitBtn");

const createPost = async (event) => {
  event.preventDefault();

  const title = document.querySelector(".postTitle").value;
  const body = document.querySelector(".postBody").value;
  console.log(title, body);
  const response = await fetch("/api/post", {
    method: "POST",
    body: JSON.stringify({ title, body }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  }
};

submitBtn.addEventListener("click", createPost);
