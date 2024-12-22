document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("google-login")
    .addEventListener("click", function () {
      console.log("--------clicked");
      window.location.href = `http://localhost:4002/api/v1/auth/google/login`;
    });
});
