
function validarRegistro() {
    const formRegister = document.querySelector("#form-register"); // ← acá usa el id con #

    const inputName = formRegister.name.value.trim();
    const inputEmail = formRegister.email.value.trim();
    const inputPassword = formRegister.password.value;
    const inputConfirmPassword = formRegister.confirmPassword.value;

    // Validación
    if (!inputName || !inputEmail || !inputPassword || !inputConfirmPassword) {
        alert("Por favor completa todos los campos.");
        return;
    }
    if (inputPassword !== inputConfirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // Guardar en localStorage
    const userData = { name: inputName, email: inputEmail, password: inputPassword };
    localStorage.setItem("registerUser", JSON.stringify(userData));

    // Redirigir solo si todo está correcto
    window.location.href = "entrance_survey.html";
}

function registrarUsuario(event) {
  event.preventDefault(); // Evita recargar la página

  const form = document.querySelector("#form-inscrip");

  // --- 1. Información básica ---
  const nombre = form.nombre.value.trim();
  const edad = form.edad.value ? parseInt(form.edad.value.trim(), 10) : null;
  const genero = form.genero.value ? form.genero.value.toLowerCase() : null;
  const ciudad = form.ciudad.value.trim() || null;
  const telefono = form.telefono.value.trim() || null;
  const emergencia = form.emergencia.value.trim() || null;

  // --- 2. Preferencias ---
  const frecuencia_uso = [...form.querySelectorAll("input[name='frecuencia']:checked")]
    .map(el => el.value.toLowerCase().replace(/\s+/g, "_"));
  const expectativas = [...form.querySelectorAll("input[name='expectativas']:checked")]
    .map(el => el.value.toLowerCase().replace(/\s+/g, "_"));

  // --- 3. Antecedentes ---
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

  // --- 4. Estado emocional ---
  const estado_emocional = [
    { emocion: "ansiedad", frecuencia: (form.ansiedad.value || "").toLowerCase().replace(/\s+/g, "_") },
    { emocion: "estres", frecuencia: (form.estres.value || "").toLowerCase().replace(/\s+/g, "_") },
    { emocion: "tristeza", frecuencia: (form.tristeza.value || "").toLowerCase().replace(/\s+/g, "_") }
  ];

  // --- 5. Pregunta adicional ---
  const experiencia = form.experiencia.value.trim() || null;

  // --- 6. Consentimiento ---
  const consentimiento = form.consentimiento.checked;

  // --- 7. Metadatos ---
  const metadata = {
    timestamp: new Date().toISOString(),
    form_version: "1.0",
    language: "es"
  };

  // --- Crear objeto final ---
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

  console.log("Datos optimizados:", datosInscripcion);

  // --- Obtener datos del usuario desde localStorage ---
  const storedUser = JSON.parse(localStorage.getItem("registerUser"));
  console.log( storedUser)
  if (!storedUser) {
    alert("No se encontró información del usuario en localStorage");
    return;
  }

  
  // --- Preparar objeto para enviar al backend ---
  const payload = {
    user: {
      full_name: form.nombre.value,
      username: storedUser.name|| null,
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
  console.log(payload)
// --- Hacer fetch al endpoint --- 
document.getElementById("loader").classList.remove("d-none");
fetch("http://127.0.0.1:8000/auth/registerUser", { // endpoint único
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    user: payload.user,
    inscripcion: payload.inscripcion
  }) // enviamos ambos objetos juntos
})
  .then(res => {
    if (!res.ok) throw new Error("Error al registrar usuario e inscripción");
    return res.json();
  })
  .then(data => {
    console.log("Successful full registration:", data);
    document.getElementById("loader").classList.add("d-none");

    // --- Remove the previous registerUser from localStorage ---
    localStorage.removeItem("registerUser");

    // --- Create logerUser with only the required fields ---
    const logerUser = {
      full_name: payload.user.full_name,
      username: payload.user.username,
      national_id: payload.user.national_id,
      user_profile: payload.user.user_profile
    };

    localStorage.setItem("logerUser", JSON.stringify(logerUser));

    // --- Redirect to dashboard after successful registration ---
    window.location.href = "../views/dashboard.html";
  })

    .catch(err => {
    console.error(err);
    document.getElementById("loader").classList.add("d-none");
    alert("Ocurrió un error al registrar el usuario.");
    });


}


