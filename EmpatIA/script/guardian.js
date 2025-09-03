function checkSession() {

    let checkUser = localStorage.getItem("logerUser")

    if (checkUser === null) {
    window.location.href="login.html"

    }
}

checkSession()