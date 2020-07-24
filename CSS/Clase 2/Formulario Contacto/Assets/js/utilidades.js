let form = document.getElementById("formData")


function GetDatos(e) {
    e.preventDefault();
    let nombre = document.getElementById("Nombre").value;
    let correo = document.getElementById("Correo").value;
    let asunto = document.getElementById("Asunto").value;
    let mensaje = document.getElementById("Mensaje").value;
    if ((nombre) || (correo) || (asunto) || (mensaje)) {
        if (nombre.trim().length < 3)
            alert("el nombre debe ser mayor que 3 caracteres")
        else if (mensaje.trim().length < 10)
            alert("El mensaje debe tener un minimo de 10 caracteres");
        else
            console.log(`Nuevo Mensaje del recipiente ${correo}
            Nombre: ${nombre} con un asunto de: ${asunto}. El siguiente mensaje es ${mensaje}`);
    } else
        alert("los campos deben estar completados")

}
form.addEventListener("submit", GetDatos);