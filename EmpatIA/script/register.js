// ======================================================
// 🎯 Function: Validate Basic Registration Form
// - Checks if all required fields are filled
// - Ensures password and confirmation match
// - Stores basic user info in localStorage
// - Redirects to entrance survey on success
// ======================================================
function validarRegistro() {
  const formRegister = document.querySelector("#form-register");

  const inputName = formRegister.name.value.trim();
  const inputEmail = formRegister.email.value.trim();
  const inputPassword = formRegister.password.value;
  const inputConfirmPassword = formRegister.confirmPassword.value;

  // --- Validation ---
  if (!inputName || !inputEmail || !inputPassword || !inputConfirmPassword) {
    alert("Please fill in all fields.");
    return;
  }
  if (inputPassword !== inputConfirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  // --- Store basic user info in localStorage ---
  const userData = { name: inputName, email: inputEmail, password: inputPassword };
  localStorage.setItem("registerUser", JSON.stringify(userData));

  // --- Redirect to entrance survey ---
  window.location.href = "entrance_survey.html";
}


// ======================================================
// 🎯 Function: Register Full User and Survey Data
// - Collects form data from registration + survey
// - Structures it into organized object
// - Sends payload to backend
// - Updates localStorage with logged-in user info
// - Redirects to dashboard on success
// ======================================================
function registrarUsuario(event) {
  event.preventDefault(); // Prevent page reload

  const form = document.querySelector("#form-inscrip");

  // ================== 1. Basic Information ==================
  const nombre = form.nombre.value.trim();
  const edad = form.edad.value ? parseInt(form.edad.value.trim(), 10) : null;
  const genero = form.genero.value ? form.genero.value.toLowerCase() : null;
  const ciudad = form.ciudad.value.trim() || null;
  const telefono = form.telefono.value.trim() || null;
  const emergencia = form.emergencia.value.trim() || null;

  // ================== 2. Preferences ==================
  const frecuencia_uso = [...form.querySelectorAll("input[name='frecuencia']:checked")]
    .map(el => el.value.toLowerCase().replace(/\s+/g, "_"));
  const expectativas = [...form.querySelectorAll("input[name='expectativas']:checked")]
    .map(el => el.value.toLowerCase().replace(/\s+/g, "_"));

  // ================== 3. Medical and Psychological Background ==================
  const psicoterapia = form.psicoterapia.value === "Sí";
  const psicoterapia_motivo = psicoterapia ? (form.psicoterapia_motivo.value.trim() || null) : null;

  let diagnosticos = [...form.querySelectorAll("input[name='diagnosticos']:checked")]
    .map(el => el.value.toLowerCase());
  const diagnostico_otro = form.diagnostico_otro.value.trim();
  if (diagnosticos.includes("otro") && diagnostico_otro) {
    diagnosticos = [`otro: ${diagnostico_otro.toLowerCase()}`];
  }

  const medicacion = form.medicacion.value === "Sí";
  const condiciones_medicas = form.condiciones.value === "Sí";
  const condiciones_detalle = condiciones_medicas ? (form.condiciones_detalle.value.trim() || null) : null;
  const antecedentes_extra = form.antecedentes_extra.value.trim() || null;

  // ================== 4. Emotional State ==================
  const estado_emocional = [
    { emocion: "ansiedad", frecuencia: (form.ansiedad.value || "").toLowerCase().replace(/\s+/g, "_") },
    { emocion: "estres", frecuencia: (form.estres.value || "").toLowerCase().replace(/\s+/g, "_") },
    { emocion: "tristeza", frecuencia: (form.tristeza.value || "").toLowerCase().replace(/\s+/g, "_") }
  ];

  // ================== 5. Additional Question ==================
  const experiencia = form.experiencia.value.trim() || null;

  // ================== 6. Consent ==================
  const consentimiento = form.consentimiento.checked;

  // ================== 7. Metadata ==================
  const metadata = {
    timestamp: new Date().toISOString(),
    form_version: "1.0",
    language: "es"
  };

  // ================== 8. Create Final Survey Object ==================
  const datosInscripcion = {
    nombre,
    edad,
    genero,
    ciudad,
    telefono,
    emergencia,
    frecuencia_uso,
    expectativas,
    antecedentes: {
      psicoterapia,
      psicoterapia_motivo,
      diagnosticos,
      medicacion,
      condiciones_medicas,
      condiciones_detalle,
      antecedentes_extra,
    },
    estado_emocional,
    experiencia,
    consentimiento,
    metadata
  };

  console.log("Optimized survey data:", datosInscripcion);

  // ================== 9. Get Basic User Info from localStorage ==================
  const storedUser = JSON.parse(localStorage.getItem("registerUser"));
  if (!storedUser) {
    alert("No user data found in localStorage");
    return;
  }

  // ================== 10. Prepare Payload for Backend ==================
  const payload = {
    user: {
      full_name: form.nombre.value,
      username: storedUser.name || null,
      email: storedUser.email,
      password_user: storedUser.password,
      national_id: form.identificacion.value || "00000000",
      age: datosInscripcion.edad || 18,
      id_genre: "1",
      country: "Colombia",
      city: datosInscripcion.ciudad || "Ciudad",
      phone: datosInscripcion.telefono || "0000000000",
      emergency_contact: datosInscripcion.emergencia || null,
      address: form.direccion.value || null,
      user_profile: "-"
    },
    inscripcion: datosInscripcion
  };

  console.log(payload);

  // ================== 11. Send Data to Backend ==================
  document.getElementById("loader").classList.remove("d-none");

fetch("http://127.0.0.1:8000/auth/registerUser", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    user: payload.user,
    inscripcion: payload.inscripcion
  })
})
  .then(res => {
    if (!res.ok) throw new Error("Error registering user and survey");
    return res.json();
  })
  .then(data => {
    console.log("Successful full registration:", data);
    document.getElementById("loader").classList.add("d-none");

    // --- Remove previous registerUser from localStorage ---
    localStorage.removeItem("registerUser");

    // --- Save logged-in user info in localStorage ---
    const logerUser = {
      full_name: payload.user.full_name,
      username: payload.user.username,
      national_id: payload.user.national_id,
      user_profile: data.user_profile_doc_id   // 👈 usar lo que devuelve el backend
    };
    localStorage.setItem("logerUser", JSON.stringify(logerUser));

    // --- Redirect to dashboard ---
    window.location.href = "../views/dashboard.html";
  })
  .catch(err => {
    console.error(err);
    document.getElementById("loader").classList.add("d-none");
    alert("An error occurred while registering the user.");
  });

  }
