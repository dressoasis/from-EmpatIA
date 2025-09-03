// Reference to the login form
const formLogin = document.getElementById("form-login");

formLogin.addEventListener("submit", function (event) {
    event.preventDefault();
    const inputEmail = formLogin.email.value;
    const inputPassword = formLogin.password.value;
    login(inputEmail, inputPassword);
});

async function login(email, password) {
  try {
    let response = await fetch(
      `http://127.0.0.1:8000/auth/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
      { method: "POST" }
    );

    let data = await response.json();

    if (response.ok) {
      console.log("Login successful:", data);

      // --- Create logerUser with selected fields from backend response ---
      const logerUser = {
        full_name: data.full_name,
        username: data.username,
        national_id: data.national_id,
        user_profile: data.user_profile
      };

      localStorage.setItem("logerUser", JSON.stringify(logerUser));

      window.location.href = "../views/dashboard.html";
    } else if (response.status === 401) {
      alert("Incorrect credentials");
    } else {
      alert(data.detail || "An error occurred");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Error connecting to the server");
  }
}
