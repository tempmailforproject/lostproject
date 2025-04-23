  const container = document.getElementById("container");
  const signUpButton = document.getElementById("signUp");
  const signInButton = document.getElementById("signIn");

  // Add event listeners to toggle the "active" class
  signUpButton.addEventListener("click", () => {
    container.classList.add("active");
  });

  signInButton.addEventListener("click", () => {
    container.classList.remove("active");
  });
