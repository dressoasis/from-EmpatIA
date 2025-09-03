// ======================================================
// 🎯 Reference to the Login Form
// ======================================================
const formLogin = document.getElementById("form-login");

// ======================================================
// 🎯 Event: Submit Login Form
// - Prevents default form submission
// - Calls login function with email and password
// ======================================================
formLogin.addEventListener("submit", function (event) {
  event.preventDefault();

  const inputEmail = formLogin.email.value.trim();
  const inputPassword = formLogin.password.value;

  login(inputEmail, inputPassword);
});

// ======================================================
// 🎯 Function: Login
// - Sends POST request to backend login endpoint
// - Stores minimal logged-in user info in localStorage
// - Redirects to dashboard on success
// ======================================================
async function login(email, password) {
  try {
    // --- Send login request to backend ---
    let response = await fetch(
      `http://127.0.0.1:8000/auth/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
      { method: "POST" }
    );

    let data = await response.json();

    if (response.ok) {
      console.log("Login successful:", data);

      // --- Store minimal user info in localStorage ---
      const logerUser = {
        full_name: data.full_name,
        username: data.username,
        national_id: data.national_id,
        user_profile: data.user_profile
      };
      localStorage.setItem("logerUser", JSON.stringify(logerUser));

      // --- Redirect to dashboard ---
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
