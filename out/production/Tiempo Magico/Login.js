function calcularEdad(fechaNacimiento) {
  const hoy = new Date();
  const cumple = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - cumple.getFullYear();
  const m = hoy.getMonth() - cumple.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < cumple.getDate())) {
    edad--;
  }
  return edad;
}

// Cambio de pestañas
const tabReg = document.getElementById("tab-reg");
const tabLogin = document.getElementById("tab-login");
const regArea = document.getElementById("reg-area");
const loginArea = document.getElementById("login-area");

tabReg.addEventListener("click", () => {
  tabReg.classList.add("active");
  tabLogin.classList.remove("active");
  regArea.style.display = "block";
  loginArea.style.display = "none";
});

tabLogin.addEventListener("click", () => {
  tabLogin.classList.add("active");
  tabReg.classList.remove("active");
  loginArea.style.display = "block";
  regArea.style.display = "none";
});

// Registro
const fechaInput = document.getElementById("fecha");
const edadInput = document.getElementById("edad");
const btnRegister = document.getElementById("btnRegister");
const regMessage = document.getElementById("regMessage");

fechaInput.addEventListener("change", () => {
  if (fechaInput.value) {
    edadInput.value = calcularEdad(fechaInput.value);
  }
});

btnRegister.addEventListener("click", () => {
  const nombre = document.getElementById("nombre").value.trim();
  const apellidos = document.getElementById("apellidos").value.trim();
  const fecha = fechaInput.value;
  const edad = parseInt(edadInput.value, 10);
  const telefono = document.getElementById("telefono").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!nombre || !apellidos || !fecha || !edad || !telefono || !correo || !password) {
    regMessage.textContent = "Por favor completa todos los campos.";
    regMessage.className = "error";
    return;
  }

  if (edad < 4 || edad > 10) {
    regMessage.textContent = "La edad debe estar entre 4 y 10 años.";
    regMessage.className = "error";
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  usuarios.push({ nombre, apellidos, fecha, edad, telefono, correo, password });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  regMessage.textContent = `¡Bienvenido/a ${nombre}! Tu cuenta fue creada con éxito.`;
  regMessage.className = "success";
  document.getElementById("registerForm").reset();
});

// Login
const btnLogin = document.getElementById("btnLogin");
const loginCorreo = document.getElementById("loginCorreo");
const loginNombre = document.getElementById("loginNombre");
const loginPass = document.getElementById("loginPass");
const loginMessage = document.getElementById("loginMessage");

btnLogin.addEventListener("click", () => {
  const correo = loginCorreo.value.trim();
  const nombre = loginNombre.value.trim();
  const pass = loginPass.value.trim();

  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  const encontrado = usuarios.find(
    (u) =>
      u.correo === correo &&
      u.nombre.toLowerCase() === nombre.toLowerCase() &&
      u.password === pass
  );

  if (encontrado) {
    loginMessage.textContent = `¡Hola ${nombre}! Has iniciado sesión correctamente.`;
    loginMessage.className = "success";
  } else {
    loginMessage.textContent = "Datos incorrectos. Revisa correo, nombre o contraseña.";
    loginMessage.className = "error";
  }
});
