const logout = document.getElementById("logout");

const logoutHandler = async (event) => {
  event.preventDefault();
  console.log("clicked");
  const response = await fetch("/api/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  }
};

logout.addEventListener("click", logoutHandler);
