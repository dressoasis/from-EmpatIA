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
        let response = await fetch(`http://127.0.0.1:8000/auth/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
            method: "POST"
        });
        let data = await response.json();

        if (response.ok) {
            alert(data.message);
            window.location.href = "../views/dashboard.html";
        } else if (response.status === 401) {
            alert("Credenciales incorrectas");
        } else {
            alert(data.detail || "Ocurrió un error");
        }
    } catch (error) {
        alert("Error de conexión con el servidor");
    }
}