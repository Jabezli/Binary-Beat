const formSubmit = document.querySelector(".loginForm");

const signupFormHandler = async function (event) {
  event.preventDefault();

  const usernameEl = document.querySelector(".username");
  const passwordEl = document.querySelector(".password");

  const response = await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify({
      username: usernameEl.value,
      password: passwordEl.value,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/login");
  } else {
    alert("Failed to sign up");
  }
};

formSubmit.addEventListener("submit", signupFormHandler);
