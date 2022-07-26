let urlLogin = "http://localhost/proyecto-lector-pdfs/agregarPDFhtmlV"
let registro_login = "http://localhost/proyecto-lector-pdfs/controladores/";
	
	console.log(document.querySelector("#idRegistro"))
if ( document.querySelector("#idRegistro") !== null ) {
	document.querySelector("#idRegistro").addEventListener("click", ()=>{
		let nombre = document.querySelector("#idNombre").value;
		let apellidoP = document.querySelector("#idapellidoP").value;
		let apellidoM = document.querySelector("#idapellidoM").value;
		let contrasenia = document.querySelector("#idcontrasenia").value;
		console.log(nombre)


		let objeto ={
			"funcionPhp" : "agregarUsuario",
			"nombre" : nombre,
			"apellidoP" : apellidoP,
			"apellidoM" : apellidoM,
			"contrasenia" : contrasenia
		}
		// console.log(objeto);
		fetch(registro_login+'todo_PDF_C.php', {
			method: 'POST',
			body: JSON.stringify(objeto),
			headers: {
				'Content-Type': 'application/json'// AQUI indicamos el formato
			}
		})
		.then(respuesta => respuesta.json())
		.then(decodificado => {
		     alert(decodificado);
		     window.location.replace(urlLogin);
		    
		});
	});
}

if (document.querySelector("#idsesion") !== null ) {
	document.querySelector("#idsesion").addEventListener("click", ()=>{
		let usuario = document.querySelector("#idUsuario").value;
		let contrasenia = document.querySelector("#idContrasenia").value;
	


		let objeto ={
			"funcionPhp" : "loginC",
			"usuario" : usuario,
			"contrasenia" : contrasenia
		}
		fetch(registro_login+'todo_PDF_C.php', {
			method: 'POST',
			body: JSON.stringify(objeto),
			headers: {
				'Content-Type': 'application/json'// AQUI indicamos el formato
			}
		})
		.then(respuesta => respuesta.json())
		.then(decodificado => {
		     console.log(decodificado);
		     if (decodificado == "no hay datos del usuario") {
		     	alert("no hay datos del usuario")
		     }else{
		     	window.location.href = decodificado;
		     }
		    
		});
	});
}