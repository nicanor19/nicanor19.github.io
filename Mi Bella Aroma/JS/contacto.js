document.getElementById("formulario").addEventListener("submit", Crear);

function Crear(e) {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  let informacion = {
    name,
    email,
    subject,
    message,
  };

  if (localStorage.getItem("informacion") === null) {
    let informaciones = [];
    informaciones.push(informacion);
    localStorage.setItem("informacion", JSON.stringify(informaciones));
  } else {
    let informaciones = JSON.parse(localStorage.getItem("informacion"));
    informaciones.push(informacion);
    localStorage.setItem("informacion", JSON.stringify(informaciones));
  }
  
  document.getElementById("formulario").reset();
  e.preventDefault();
}