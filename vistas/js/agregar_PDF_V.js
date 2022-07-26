var contadorOl_1_li = 0; 
var contadorPDF = 0;
let urlAgregarPDF_Y_Tema = "http://localhost/proyecto-lector-pdfs/controladores/";


//==========================================================================
//CREACION de temas
//==========================================================================
let btnGuardarTema = document.getElementById("idBtnGuardarTema");
// console.log(btnGuardarTema)
btnGuardarTema.addEventListener("click", (event)=>{
	let nombreTema = document.querySelector("#idTxtTema").value;
	let idUsuario = document.querySelector("#idTxtIdUsuario").value;

	console.log(idUsuario);
	document.getElementById("idTxtTema").value = "";
	if (nombreTema != "") {
		let objeto ={
			nombreTema: nombreTema,
			idUsuario: idUsuario,
			funcionPhp : "guardarTemasC"
		}
		fetch(urlAgregarPDF_Y_Tema+'todo_PDF_C.php', {
			method: 'POST',
			body: JSON.stringify(objeto),
			headers: {
				'Content-Type': 'application/json'// AQUI indicamos el formato
			}
		})
		.then(respuesta => respuesta.json())
		.then(decodificado => {

		    alert(decodificado);
		    if (decodificado == "exitoso") {
		    	listarTemas();
		    }
		});
	}else{
		alert("ingrese el nombre del tema")
	}
});
//==========================================================================
//LISTAR temas Agregar PDF
//==========================================================================
function listarTemas(){
	let listaTemaContenedor = document.querySelector(".listaTemaContenedor");
	listaTemaContenedor.innerHTML="";
	let idUsuario = document.querySelector("#idTxtIdUsuario").value;

	let objeto ={
			idUsuario: idUsuario,
			funcionPhp : "listarTemasC"
		}
		fetch(urlAgregarPDF_Y_Tema+'todo_PDF_C.php', {
			method: 'POST',
			body: JSON.stringify(objeto),
			headers: {
				'Content-Type': 'application/json'// AQUI indicamos el formato
			}
		})
		.then(respuesta => respuesta.json())
		.then(decodificado => {
		    console.log(decodificado);
		    
		    console.log(listaTemaContenedor)
		    if (decodificado.length != 0) {
		    	for (tema of decodificado) {
		    		console.log()
			    	contadorOl_1_li += 1;
			    	let contenedorDePDF = "ol_1_li_"+contadorOl_1_li+"_ol_2";
			    	let contenedor_Li = document.createElement("li");
			    	contenedor_Li.setAttribute("class", `list-group-item mt-2 ol_1_li_${contadorOl_1_li}`);
				    contenedor_Li.innerHTML=`
				    	<span id="idSpanTemaEditar${tema[0].nombre_tema}" style="display:block;">${tema[0].nombre_tema}</span>
				    	<input  type="text" class=" form-control form-control-sm " id="idTxtTemaEditar${tema[0].nombre_tema}" placeholder="${tema[0].nombre_tema}" style="display:none;">
						<button onclick="eliminarLiTema('ol_1_li_${contadorOl_1_li}','${tema[0].id_tema}','idTxtTemaEditar${contadorOl_1_li}')" type="button" class=" colorBtnEliminar zoom btn btn-outline-danger  colorFondo colocarDerecha" id="btnElimTem" >
							<i class="fa-solid fa-trash-can fa-sm"> </i>
						</button>
						<button style="display:block;" onclick="editarLiTema('ol_1_li_${contadorOl_1_li}','${tema[0].id_tema}','idTxtTemaEditar${tema[0].nombre_tema}', 'idSpanTemaEditar${tema[0].nombre_tema}',this,'idBtnGuardar${tema[0].nombre_tema}')" type="button" class=" colorBtnEditar zoom btn btn-outline-success  colorFondo colocarDerecha" id="btnEdiTem" >
							<i class="fa-solid fa-pen-to-square fa-sm"></i>
						</button>
						<button style="display:none;" type="button" class="  btn  colorFondoGuardar  btnSinPading " id="idBtnGuardar${tema[0].nombre_tema}" >
							Guardar<i class="fa-solid fa-cloud-arrow-up fa-lg"></i>
						</button>
						<div class="mt-2">
							<label for="ol_1_li_${contadorOl_1_li}_inpFile" class="form-label">Seleccione los Archivos</label>
							<input onchange="agregarFileX('ol_1_li_${contadorOl_1_li}_inpFile', '${contenedorDePDF}','${tema[0].id_tema}')" class="form-control form-control-sm" type="file" name="files" id="ol_1_li_${contadorOl_1_li}_inpFile" >
						</div>
						<div class="row container">
							<ol  class="${contenedorDePDF}">
								${listarPDF(tema[1])}
							</ol>
						</div>
				    `;
				    listaTemaContenedor.appendChild(contenedor_Li);
		    	}
		    }else {
		    	console.log("sin temas")
		    }
		});
}
//==========================================================================
//INVOCAR LISTAR AL INICIAR LA PAGINA 
//==========================================================================
document.addEventListener("DOMContentLoaded", ()=>{
	listarTemas();
});



//==========================================================================
//EDITAR TEMA -------FALTA
//==========================================================================
function editarLiTema(classContenedorLista, id_tema, idInputTema, idSpan , btn, btnGuardar){
	console.log(btn);
	console.log(document.getElementById(idInputTema));
	console.log(document.getElementById(idSpan));
	
	document.getElementById(btnGuardar).style.display = 'block';
	btn.style.display = 'none';
	document.getElementById(idInputTema).style.display = 'block';
	document.getElementById(idSpan).style.display = 'none';
	document.getElementById(btnGuardar).addEventListener("click", ()=>{
		let tema = document.getElementById(idInputTema).value;
		
		let objeto ={
			id_tema: id_tema,
			nombreTema: tema,
			funcionPhp : "guardarEdicionTemaC"
		}
		fetch(urlAgregarPDF_Y_Tema+'todo_PDF_C.php', {
			method: 'POST',
			body: JSON.stringify(objeto),
			headers: {
				'Content-Type': 'application/json'// AQUI indicamos el formato
			}
		})
		.then(respuesta => respuesta.json())
		.then(decodificado => {
		    alert(decodificado);
		    if (decodificado == "edición Guardada") {
		    		document.getElementById(btnGuardar).style.display = 'none';
					btn.style.display = 'block';
					document.getElementById(idInputTema).style.display = 'none';
					document.getElementById(idSpan).style.display = 'block';
		    		listarTemas();
		    }
		});
	});

}
//==========================================================================
//BORRAR TEMA -------FALTA
//==========================================================================
function eliminarLiTema(classContenedorLista, id_tema){
	let objeto ={
			id_tema: id_tema,
			funcionPhp : "eliminarPDFs_De_Tema"
		}
		fetch(urlAgregarPDF_Y_Tema+'todo_PDF_C.php', {
			method: 'POST',
			body: JSON.stringify(objeto),
			headers: {
				'Content-Type': 'application/json'// AQUI indicamos el formato
			}
		})
		.then(respuesta => respuesta.json())
		.then(decodificado => {
			alert(decodificado);
			if (decodificado == "tema y pdfs eliminados") {
				
				listarTemas();
			}
			
		});

}
//==========================================================================
//LISTARde pdf en LISTARde temas Agregar PDF
//==========================================================================
function listarPDF(arrayPDF){
	console.log(">>>");
	console.log(arrayPDF[0])
	let listaTemaContenedorPDF ="";
	if (arrayPDF == "Sin Pdf") {
		return `<li class="mb-2 mt-2 badge bg-primary text-wrap">${arrayPDF}</li>`;
	}else {
		for (pdf of arrayPDF) {
			console.log(pdf.nombre_contenido);
			contadorPDF += 1;
			listaTemaContenedorPDF+=`
			<li class="mb-4 mt-2 ol_2_${contadorPDF} zoom " >
				<span class="subrayar" onclick="mostrarPDFenCanvas('${pdf.nombre_contenido.slice(0,-4)}')">${pdf.nombre_contenido}</span>
				<button onclick="eliminarLiPdf('ol_2_${contadorPDF}','${pdf.id_contenido}')" type="button" class=" colorBtnEliminar zoom btn btn-outline-danger  colorFondo colocarDerecha" id="btnElimTem" >
					<i class="fa-solid fa-trash-can fa-sm"> </i>
				</button>
			</li>
						`;
		}
		contadorPDF =0;
		return listaTemaContenedorPDF;
	}		
}

//==========================================================================
//BORRAR PDF 
//==========================================================================
function eliminarLiPdf(classContenedorLista, id_pdf){
	let objeto ={
			id_pdf: id_pdf,
			funcionPhp : "eliminarPDF_C"
		}
		fetch(urlAgregarPDF_Y_Tema+'todo_PDF_C.php', {
			method: 'POST',
			body: JSON.stringify(objeto),
			headers: {
				'Content-Type': 'application/json'// AQUI indicamos el formato
			}
		})
		.then(respuesta => respuesta.json())
		.then(decodificado => {
			alert(decodificado);
			if (decodificado == "eliminado") {
				
				listarTemas();
			}
			
		});

}

//==========================================================================
//subir pdf -------FALTA verificra si el archivo ya existe
//==========================================================================
function agregarFileX(idFile, contenedorDePDF, id_tema) { 
	// console.log(this.event);
	inputFile= this.event.target.files;
	// console.log(this.event.target.files.length)
	if (this.event.target.files.length > 0) {
		let formData = new FormData();
		formData.append("archivo", inputFile[0]); // En la posición 0; es decir, el primer elemento
		formData.append("id_tema", id_tema); // En la posición 0; es decir, el primer elemento
		// console.log(formData)
		fetch(urlAgregarPDF_Y_Tema+'subir_PDF_C.php', {
			method: 'POST',
			body: formData
		})
			.then(respuesta => respuesta.text())
		       .then(decodificado => {
		            	alert(decodificado);
		            	if (decodificado == "exitoso") {
			    			listarTemas();
		            	}else {
		            		alert(decodificado)
		            	}
		                // console.log(decodificado);

		        });
		            
	} else {
		// El usuario no ha seleccionado archivos
		alert("Selecciona un archivo");
	}		
} 

//==========================================================================
//VIZUALIZAR EL PDF EN PANTALLA COMPLETA
//==========================================================================
document.querySelector("#pantallaCompleta").addEventListener("click", ()=>{
	
  	var contenedorpdf = document.getElementById("contenedorpdfpanCompleta");
    
	if (!document.webkitFullscreenElement) {
	    if (contenedorpdf.mozRequestFullScreen) {
	        contenedorpdf.mozRequestFullScreen();
	    } else {
	        contenedorpdf.webkitRequestFullscreen();
	    }
	} else {
	     document.webkitExitFullscreen();
	}
});
//==========================================================================
//VIZUALIZAR EL PDF 
//==========================================================================
const btnAnterior= document.querySelector("#anterior");
const btnSiguiente = document.querySelector("#siguiente");
const spnNumPaginas = document.querySelector("#numPaginas");
const btnZoom = document.querySelector("#zoom");
const vista_pdfCanvas = document.querySelector(".vista_pdf");
let pdfActual = {}
function iniciarPDFactual() {
	pdfActual = {
		file: null,
		countOfPages: 0,
		currentPage: 1,
		zoom: 1
	}
}

function cargarPDF(datoPDF){
	btnZoom.disabled = false;

    pdfjsLib.GlobalWorkerOptions.workerSrc = "vistas/js/pdf.worker.js";
	const pdfFile = pdfjsLib.getDocument(`vistas/archivos/${datoPDF}.pdf`);
	iniciarPDFactual();
	pdfFile.promise.then((doc) => {
		pdfActual.file = doc;
		pdfActual.countOfPages = doc.numPages;
		if (document.querySelector('.hiddenH3')) {
			document.querySelector('.hiddenH3').remove();
			// statement
		}
		renderPaginaActual();
	});
}

function renderPaginaActual(){
	pdfActual.file.getPage(pdfActual.currentPage).then((page) => {
		var context = vista_pdfCanvas.getContext('2d');
		var viewport = page.getViewport({ scale: pdfActual.zoom});
		vista_pdfCanvas.height = viewport.height;
		vista_pdfCanvas.width = viewport.width;

		var renderContext = {
			canvasContext: context,
			viewport: viewport
		};
		page.render(renderContext);
	});
	spnNumPaginas.innerHTML = pdfActual.currentPage + ' of ' + pdfActual.countOfPages;
}

btnAnterior.addEventListener("click", ()=>{
	const validacionDePagina = pdfActual.currentPage - 1 > 0;
	if (validacionDePagina) {
		pdfActual.currentPage -= 1;
		renderPaginaActual();
	}
});
btnSiguiente.addEventListener("click", ()=>{
	const validacionDePagina = pdfActual.currentPage < pdfActual.countOfPages;
	if (validacionDePagina) {
		pdfActual.currentPage += 1;
		renderPaginaActual();
	}
});
btnZoom.addEventListener('input', () => {
	if (pdfActual.file) {
		document.getElementById('zoomValue').innerHTML = btnZoom.value + "%";
		pdfActual.zoom = parseInt(btnZoom.value) / 100;
		renderPaginaActual();
	}
});

function mostrarPDFenCanvas(datoPDF){
	document.querySelector("#nombrePDFMostrar").style.display = "block";
	document.querySelector("#nombrePDFMostrar").innerHTML=datoPDF;
	
 	cargarPDF(datoPDF);
}
