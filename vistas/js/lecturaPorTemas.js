let urlLecturaPDF_Y_Tema = "http://localhost/proyecto-lector-pdfs/controladores/";
let lecturaContadorOl_1_li = 0;


var textoPdfHoja;//obtendra el texto de la hoja en la que se encuentra y su valor camviara por lo mismo.
var textoPdfCompleto=[];//obtendra todo el texto del pdf para leero
let abrirPdfEscuchado = "null"; //variable que me permitira saber si el pdf se a abierto en el canvas y poder indicar su pusteriorior lectura

var pdfs_a_existentes=[]; //va aguardar todos los nombred de los pdfs 
let mostrarSoloCanvasContador=0;
let mostrarCanvasYleerContador=0;
let pdfAbierto=0;
let hoja_o_pdf_completo=0;
var reproduccionVozActivo = false;

var contadorPaginasEnVoz = 1;

nombreAsistente =`luna`;
canDeCarDe_nomAsis = 5; //INDICE 5. ==== LA CANTIDAD ES 4 DE LUNA PERO
//AL OBTENER UN DATO CON SLICE OBTENDRE CADA CARACTER EN UN ARRAY COMENZANDO DESDE 0, 
//ENCONTRANDOSE A EN INDICE 3
//Y AGREGANDO EL ESPACIO EN BLANCO PARA EL COMEINZO DE LA PALABRA QUE SE QUIERE OBTENER, 
//EL ESPACIO ESTARA EN EL INDICE 4,
//POR LO TANTO EL INDICE 5 INDICA EL INICIO DE LA OTRA PALABRA A OBTENER.


//=======================================================================================================
//LISTARde temas Agregar PDF
//==========================================================================
let listaTemaContenedor = document.querySelector(".listaTemaContenedorLectura");
if (listaTemaContenedor != null) {
	let listaTemaContenedorPdfLectura = document.querySelector(".listaTemaContenedorLectura");
	listaTemaContenedor.innerHTML="";
	let objeto ={
			funcionPhp : "listarTemasCA"
		}
		fetch(urlLecturaPDF_Y_Tema+'todo_PDF_C.php', {
			method: 'POST',
			body: JSON.stringify(objeto),
			headers: {
				'Content-Type': 'application/json'// AQUI indicamos el formato
			}
		})
		.then(respuesta => respuesta.json())
		.then(decodificado => {
		    // console.log(decodificado);
		    
		    // console.log(listaTemaContenedor)
		    if (decodificado.length != 0) {
		    	for (tema of decodificado) {
		    		
			    	lecturaContadorOl_1_li += 1;
			    	let contenedorDePDF = "ol_1_li_"+lecturaContadorOl_1_li+"_ol_2";
			    	let contenedor_Li = document.createElement("li");
			    	contenedor_Li.setAttribute("class", ` temario temas  list-group-item mt-2 ol_1_li_${lecturaContadorOl_1_li}`);
				    contenedor_Li.innerHTML=`
				    	<span>${tema[0].nombre_tema}</span>
						<div class="row container">
							<ol  class="${contenedorDePDF}">
								${listarPDF(tema[1])}
							</ol>
						</div>
				    `;
				    listaTemaContenedorPdfLectura.appendChild(contenedor_Li);
		    	}
		    }else {
		    	// console.log("sin temas")
		    }
		});
}

//========================================================================================================
//LISTARde pdf en LISTARde temas Agregar PDF
//==========================================================================
function listarPDF(arrayPDF){
	let contadorPDF =0;
	// console.log(">>>");
	// console.log(arrayPDF[0])
	let listaTemaContenedorPDF ="";
	if (arrayPDF == "Sin Pdf") {
		return `<li class="mb-2 mt-2 badge bg-primary text-wrap">${arrayPDF}</li>`;
	}else {
		for (pdf of arrayPDF) {

			pdfs_a_existentes.push(pdf.nombre_contenido.slice(0,-4))
			// console.log(pdf.nombre_contenido);
			contadorPDF += 1;
			listaTemaContenedorPDF+=`
			<li class="mb-4 mt-2 ol_2_${contadorPDF}" >
				<span class="subrayar" onclick="mostrarPDFenCanvasClic('${pdf.nombre_contenido.slice(0,-4)}', 'btn${pdf.nombre_contenido.slice(0,-4)}')">${pdf.nombre_contenido.slice(0,-4)}</span>
				<span class="${pdf.nombre_contenido}" style="display:none;">${pdf.id_contenido}</span>
				<button style="display:none;" id="btn${pdf.nombre_contenido.slice(0,-4)}" onclick="btnlecturaHojaPdf('${pdf.nombre_contenido.slice(0,-4)}', 'btn${pdf.nombre_contenido.slice(0,-4)}')" type="button" class="btnsReproducir colorFondoGuardar zoom btn btn-outline-danger  colorFondo colocarDerecha"  >
					<i class="fa-solid fa-volume-high"></i>
				</button>
			</li>
						`;
		}
		contadorPDF =0;
		return listaTemaContenedorPDF;
	}		
}

//============================================================================
//escuchar la hoja de pdf que se visualiza
var contaLectorPdfHojaBtn = 0;
function btnlecturaHojaPdf(nombrePDF, id){

	
	if (contaLectorPdfHojaBtn == 0) {
		lecturaPdf(nombrePDF)
		setTimeout(function () {
			asistenteDice(textoPdfHoja);
		}, 1000);
		
	}else{
		setTimeout(function () {
			asistenteDice(textoPdfHoja);
		}, 1000);

	}	
contaLectorPdfHojaBtn = 1;
document.getElementById(id).style.display = "block";

}
function mostrarPDFenCanvasClic(nombrePDF, idBtn){

	contaLectorPdfHojaBtn = 0
	mostrarPDFenCanvas(nombrePDF, idBtn);
	
}



//================================================================================================================
//					 	  PROCESOS PARA LA LECTURA DE LOS TEXTOS - TEXTO A VOZ 
//============================================================================
let utterance = new SpeechSynthesisUtterance();
//============================================================================
//funcion donde recibira el texto que sabina leera
//============================================================================
asistenteDice("Hola, Bienvenido. Mi nombre es... " + nombreAsistente);
function asistenteDice(texto){

	// console.log(texto)
	speechSynthesis.getVoices();
	setTimeout(function () {
	    var vozIndex = speechSynthesis.getVoices().findIndex(function (voice) {
	    	return voice.name === 'Microsoft Sabina - Spanish (Mexico)';
		});
		utterance.voice = speechSynthesis.getVoices()[vozIndex];
		utterance.text = texto;
		speechSynthesis.speak(utterance);
		
													//para 

	}, 1000);
	// console.log(utterance)

}

const detenerVoz = () => {
    // Cancela la reproducción de la voz
    speechSynthesis.cancel()
};
  const continuaVoz = () => {
    // resume la reproducción de la voz
    speechSynthesis.resume();
}
const pausarVoz = () => {
    // resume la reproducción de la voz
    speechSynthesis.pause();
}

//=================================
//================================================================================================================




//================================================================================================================
//					 	PROCESOS PARA EL RECONOCIMIENTO DE VOZ- DE VOZ A TEXTO
//============================================================================
// PASO 1 ::: DETECTAR EL NAVEGADOR
const elNavegadorEsCompatible = ()=>{
	if (navigator.userAgent.indexOf("Chrome") ||  navigator.userAgent.indexOf("Edge") ||  navigator.userAgent.indexOf("Safari")) return true;
	alert('El Navegador no es compatible con el Reconocimiento de voz');
	return  false;
}

//============================================================================
// PASO 2 ::: SI EL NAVEGADOR ES COMPATIBLE CONFIGURAR EL RECONOCIMIENTO DE VOZ
 var recognition;
obtenerPalabrasEscuchadas();
function obtenerPalabrasEscuchadas(){
	if(elNavegadorEsCompatible()){
		// 2.1 Esta api tiene nombres distintos según el navegador porque aún está en fase experimental, por eso las listamos todas e instanciamos la primera que consiga
		  recognition = new (window.SpeechRecognition ||  window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
		            
		// 2.2 Definimos el idioma a escuchar https://en.wikipedia.org/wiki/Language_localisation#:~:text=Examples%20of%20language%20tags

		recognition.lang = "es-MX";
		// 2.3 Configuramos que cuando termine de reconocer algo vuelva a escuchar

		recognition.onend = event => {setTimeout(function () {
			recognition.start();
		}, 1000);  };
		// // 2.3 Pasamos la función que se llamará cuando haya un resultado del reconocimiento de voz
		recognition.onresult = resultado => { manejarResultado(resultado); /*webkitSpeechRecognition.end;*/}; 
		// 2.4 Empezamos a escuchar
		recognition.start();
		// console.log(recognition)
		
		
		
		
	
	}
}

//============================================================================
// PASO 3 DEFINIMOS LA FUNCIÓN QUE MANEJARÁ RESULTADO DEL RECONOCIMIENTO DE VOZ
//===========================================================================
const manejarResultado = (resultado) => {
	 
	let textoResultado = resultado.results[0][0].transcript.toLowerCase().trim();
	console.log( ">>" + textoResultado)

	let abriPdfEnCanvas= textoResultado.slice(canDeCarDe_nomAsis)
	let leerPdf_y_abrirCanvas= textoResultado.slice(canDeCarDe_nomAsis)
	let nombre_PDF=""
	
		// IDENTIFICAR SI EL PDF SERA PRIMERO SOLO ABIERTO EN EL CANVAS Y LUEGO TENER OPCION DE LEER POR HOJA O COMPLETO,
		//O SI LA ABRIRA Y LEERA CEL PDF CUMPLETO CUANDO MENCIONAN CON PREFICO LEER Y NOMBRE O SOLO EL NOMBRE DEL PDF
		if (pdfs_a_existentes.indexOf(abriPdfEnCanvas.slice(6)) !== -1 ) { 
			//el el indice 6 comienza nombre de pdf despues de
			//la pablabra abrir .				

			mostrarSoloCanvasContador = 1;
			mostrarCanvasYleerContador = 0;
			nombre_PDF = abriPdfEnCanvas.slice(6);

		}else if (pdfs_a_existentes.indexOf(leerPdf_y_abrirCanvas.slice(8)) !== -1) {
			//el el indice 8 comienza nombre de pdf despues de
			//la pablabra lectura .

			mostrarCanvasYleerContador = 1;
			mostrarSoloCanvasContador = 0;
			nombre_PDF = leerPdf_y_abrirCanvas.slice(8);

		}else if (pdfs_a_existentes.indexOf(textoResultado.slice(canDeCarDe_nomAsis)) !== -1 ) {
			//el numero de indice esta almacenado en "canDeCarDe_nomAsis" y es donde comienza 
			// el nombre de pdf, despues de la pablabra LUNA .

			nombre_PDF = textoResultado.slice(canDeCarDe_nomAsis);

		}else if (pdfs_a_existentes.indexOf(textoResultado) !== -1 ) {
			//el numero nombre de pdf se encunetra en el array que contiene los nombresde los

			nombre_PDF = textoResultado;

		}

		reproduccionVozActivo = speechSynthesis.speaking; //devolvera true si se esta reproduciendo 

		console.log(reproduccionVozActivo);

	if (reproduccionVozActivo == true) { //	SI LA VOZ ESTA hABLANDO O EN COLA ACEPTARA CANCELAR, PAUSAR, CONTINUAR
				//- CANCELAR LECTURA
		if (textoResultado.indexOf("cancelar") == true || textoResultado ==`${nombreAsistente} cancelar` || textoResultado== `${nombreAsistente} cancelar lectura`
		|| textoResultado== 'cancelar' ) {
			
			detenerVoz();
			
			hoja_o_pdf_completo=0;
		}
		//- PAUSAR LECTURA
		else if (textoResultado.indexOf("pausar") == true || textoResultado ==`${nombreAsistente} pausar` || textoResultado== `${nombreAsistente} pausar lectura`
			|| textoResultado ==`${nombreAsistente} espera` || textoResultado =='pausar') {
				
				pausarVoz();
			
			hoja_o_pdf_completo=0;
		}
		//- CONTINUAR LECTURA
		else if (textoResultado.indexOf("continuar") == true || textoResultado ==`${nombreAsistente} continuar` 
			|| textoResultado== `${nombreAsistente} continuar lectura`
			|| textoResultado ==`${nombreAsistente} seguir` 
			|| textoResultado== `${nombreAsistente} seguir lectura`
			|| textoResultado== 'continuar' ) {
				
				continuaVoz();
			
			hoja_o_pdf_completo=0;

		}
		else if (textoResultado ==`${nombreAsistente} reiniciar` || textoResultado == `${nombreAsistente} reiniciar lectura`
		|| textoResultado == 'reiniciar' ) {
			detenerVoz();
			if (pdfAbierto == 1) {
				detenerVoz();
				if (hoja_o_pdf_completo == 1) {
					asistenteDice("colocar texto pdf completo o iniciar lectura corrida desde pagina 1");//===========>
				} else if (hoja_o_pdf_completo == 2) {
					asistenteDice(textoPdfHoja)
				}


			}else{

				asistenteDice("para reiniciar es necesario existir una lectura en proceso");
				
			}
		}

		reproduccionVozActivo = false;
	}else if (reproduccionVozActivo == false) {//SI LA REPRODUCCION DE VOZ NO ESTA ACTIVA ENTONCES ACEPTARA TODOS LOS COMANDOS NEMOS LOS MENCIONADOS ANTERIORMENTE 
		
		//EVALUAR SI ESTA SALUDANDO
		if (textoResultado == `${nombreAsistente}` || textoResultado == `hola ${nombreAsistente}` 
			|| textoResultado == `ola ${nombreAsistente}`) {

	        	asistenteDice(": ¿en qué puedo ayudarle?");
	        	mostrarSoloCanvasContador = 0;
				mostrarCanvasYleerContador = 0;
				pdfAbierto = 0;
				hoja_o_pdf_completo=0;

		}
		//OPTENCION DE AYUDA PARA LOS NIÑO
		else if (textoResultado == `${nombreAsistente} ayuda` || textoResultado == `${nombreAsistente} comandos`
			|| textoResultado == `${nombreAsistente} ayuda por favor` || textoResultado == `${nombreAsistente} comandos porfavor`
			|| textoResultado == `${nombreAsistente} opciones` || textoResultado ==`${nombreAsistente} opciones por favor` ) {

				// recognition.stop();
				asistenteDice(`
								.Para Abrir el pdf puede decir. :\n
									abrir, seguido del nombre del pdf.\n
								.Para escuchar lectura de la hoja del pdf puede decir. :
									reproducir, \n
									repetir, \n
									leer, \n
									escuchar \n
								.Para cambiar hoja a siguiente del pdf puede decir. :
									siguiente,  \n
								.Para cambiar hoja a anterior del pdf puede decir. :
									anterior  \n	
								.Para pausar lectura decir:\n
									pausar  . \n
								.Para continuar lectura decir:\n
									continuar  .\n
								.Para cancelar lectura decir:\n
									cancelar  .\n
								.Si quiere volver a escuchar las opciones de ayuda en cualquier momento puede decir. :\n
									ayuda,  . \n
									comandos,  .\n
									opciones  .\n
								ES IMPORTANTE QUE ANTES DE CUALQUIER COMANDO MENCIONE : ${nombreAsistente}
								a excepciòn de pausar, continuar, cancelar, reiniciar.
							`);
			mostrarSoloCanvasContador = 0;
			mostrarCanvasYleerContador = 0;
			
			hoja_o_pdf_completo=0;

			
		}
		//ABRIR Y LEER EL PDF POR COMPLETO BASANDONOS EN EL NOMBRE DE PDF QUE MENCIONO
		else if (textoResultado == (nombreAsistente + nombre_PDF)) { //falta lectura cumpleta

			asistenteDice("pdf " + nombre_PDF+ "abierto. Comenzando lectura");
			lecturaPdf(nombre_PDF);//ABRIR  PDF EN CANVAS
			
			mostrarSoloCanvasContador = 0;
			mostrarCanvasYleerContador = 0;
			pdfAbierto = 1;
			hoja_o_pdf_completo = 1;

			contaLectorPdfHojaBtn = 1//CONTADOR DEL BTN CON ICONO DE SONIDO ==> PARA LEER TEXTO HOJA SI ES DISTINTO A 0

		}
		//ABRIR Y LEER EL PDF POR COMPLETO BASANDONOS EN EL COMANDO " escuchar " SEGUIDO DEL NOMBRE DEL PDF
		else if (mostrarCanvasYleerContador == 1 ) {  //falta lectura cumpleta
			console.log(">>>>")
			console.log(nombre_PDF)
			asistenteDice("pdf " + nombre_PDF+ "abierto. Comenzando lectura");

			lecturaPdf(nombre_PDF);//ABRIR  PDF EN CANVAS
			
			mostrarSoloCanvasContador = 0;
			mostrarCanvasYleerContador = 0;
			pdfAbierto = 1;
			hoja_o_pdf_completo=1;

			contaLectorPdfHojaBtn = 1//CONTADOR DEL BTN CON ICONO DE SONIDO ==> PARA LEER TEXTO HOJA SI ES DISTINTO A 0
		}
		//ABRIR EL PDF EN EL CANVAS, PARA ASI DESPUES TENER LA OPCION DE PODER LEER POR HOJA
		else if (mostrarSoloCanvasContador == 1  || nombre_PDF == textoResultado) {  

			lecturaPdf(nombre_PDF);//ABRIR  PDF EN CANVAS
			asistenteDice("pdf " + nombre_PDF+ "abierto");
			mostrarCanvasYleerContador = 0;
			mostrarSoloCanvasContador = 0;
			pdfAbierto = 1;
			hoja_o_pdf_completo=2;

			contaLectorPdfHojaBtn = 1//CONTADOR DEL BTN CON ICONO DE SONIDO ==> PARA LEER TEXTO HOJA SI ES DISTINTO A 0


		}
		//COMENZAR LECTURA DE TEXTOS DE HOJAS DE PDF
		else if (textoResultado ==`${nombreAsistente} iniciar` || textoResultado ==`${nombreAsistente} repetir`
			|| textoResultado == `${nombreAsistente} leer` || textoResultado == `${nombreAsistente} escuchar`
			|| textoResultado ==`${nombreAsistente} comenzar` || textoResultado ==`${nombreAsistente} reproducir`) {
			
			// if (mostrarSoloCanvasContador == 1 || pdfAbierto == 1) {

				asistenteDice(textoPdfHoja);
				
			// }else{

			// 	asistenteDice("primero elija un pdf para poder escucharla")

			// }
			hoja_o_pdf_completo=2;
		}
		// - HOJA SIGUIENTE
		else if (textoResultado ==`${nombreAsistente} siguiente` ) {
			
			if (pdfAbierto == 1) {

				//codigo para invocar el cambio de hoja a siguiente 
				document.querySelector("#siguiente").click();
				
			}else{

				asistenteDice("primero elija un pdf para poder cambiar")
				
			}
			hoja_o_pdf_completo=0;
		}
		//- HOJA ANTERIOR
		else if (textoResultado ==`${nombreAsistente} anterior`|| textoResultado== `${nombreAsistente} atràs` ) {
			
			if (pdfAbierto == 1) {

				//codigo para invocar el cambio de hoja a anterior 
				document.querySelector("#anterior").click();
				
			}else{

				asistenteDice("primero elija un pdf para poder cambiar ")
				
			}
			hoja_o_pdf_completo=0;
		}
		else if (textoResultado.startsWith(`${nombreAsistente}`) == true ){

			asistenteDice("una disculpa, no pude entenderle, vuelva a intentarlo.");

		}
	}

}





//================================================================================================================
//PROCESOS PARA EL TRATAMIENTO DEL PDF - (TANTO PARA SU VIZUALIZACION - COMO- PARA SO ESTRACCION DE TEXTO)- PRINCIPALMENTE
//EL TRATAMIENTO DEL PDF SE REALIZA CON PDF.JS
//============================================================================

//=======================================================
//TRAER EL WORKER PARA PDF.JS
pdfjsLib.GlobalWorkerOptions.workerSrc = "vistas/js/pdf.worker.js";

//==========================================================================
//obtener acccion de btn para escuchar lectura 
//LE DE CARGAR PDF AL CANVAS para obtener el texto a leer
//AL DECIR LECTURA DE PDF EN ESTA FUNCION ME REFIERO A LA LECTURA INTERNA PARA 
//LA OBTENCION DE DATOS
//==========================================================================
function lecturaPdf(nombrePDF){//LECTURA INTERNA PARA LA OBTENCION DE DATOS
	mostrarPDFenCanvas(nombrePDF);
	//darLecturaDElPdfPorHoja(nombrePDF);


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
//VIZUALIZAR EL PDF - PAGINA SIGUIENTE- ANTERIOR Y ZOOM 
//==========================================================================
//====================================================================
//OBTENER LOS DATOS DE LOS ELEMENTOS HYML CON LOS QUE INTERACTUARA PARA SU TRATAMIENTO
const btnAnterior= document.querySelector("#anterior");
const btnSiguiente = document.querySelector("#siguiente");
const spnNumPaginas = document.querySelector("#numPaginas");
// const btnZoom = document.querySelector("#zoom");
const btnZoomMenos = document.querySelector("#btnZoomMenos");
const btnZoomMas = document.querySelector("#btnZoomMas");
const vista_pdfCanvas = document.querySelector(".vista_pdf");
let pdfActual = {}
var datoZoom = 100;
function iniciarPDFactual() {
	pdfActual = {
		file: null,
		countOfPages: 0,
		currentPage: 1,
		zoom: 1
	}
}
//====================================================================
//FUNCION PRINCIPAL PARA OBTENER LOS DATOS DEL PDF
//====================================================================
function cargarPDF(datoPDF, texto_hoja_o_pdf){
	// console.log(datoPDF + texto_hoja_o_pdf)
	pdfAbierto =1;
	btnZoomMenos.disabled =  false;
	btnZoomMas.disabled = false
	datoZoom = 100;

	let pdfFile = pdfjsLib.getDocument(`vistas/archivos/${datoPDF}.pdf`);
	iniciarPDFactual();
		pdfFile.promise.then((doc) => {
			pdfActual.file = doc;
			pdfActual.countOfPages = doc.numPages;
			if (document.querySelector('.hiddenH3')) {
				document.querySelector('.hiddenH3').remove();
				// statement
			}
			renderPaginaActual();

			
		}).catch((error)=>{
			console.error(error)
		});
	// btnZoom.value=100;
	document.getElementById('zoomValue').innerHTML = datoZoom + "%";

}
//==============================================================================
//FUNCION PRINCIPAL PARA MOSTRAR UNA PAGINA EN EL CANVAS 
//==============================================================================
function renderPaginaActual(){//para vizualizar  la pagina del  pdf en el canvas
	// console.log(texto_hoja_o_pdf)
	


		pdfActual.file.getPage(pdfActual.currentPage).then((page) => {
			
			getPageText(page);
			
			
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
//====================================================================
//PROCESOS PARA OBTENER EL TEXTO DE UNA PAGINA INVOCADA CUANDO YA SE A OBTENIDO UNA PAGINA
function getPageText(page){//funcion que obtiene el texto de 1 pagina
	page.getTextContent().then(function (textContent) {
                    var textItems = textContent.items;
                    var finalString = "";

                    // Concatenar la cadena del elemento a la cadena final
                    for (let i = 0; i < textItems.length; i++) {
                        var item = textItems[i];
                        if (item.str.includes(".") ) {
                        	finalString += item.str.replace(".", ".\n") + " ";

                        	// finalString += item.str + " ";
                         //    finalString += "\n \n"
                        }
                        else {
                        	finalString += item.str + " ";
                        }
                    }

			textoPdfHoja = finalString;
				
  });
}


btnAnterior.addEventListener("click", ()=>{
	const validacionDePagina = pdfActual.currentPage - 1 > 0;
	if (validacionDePagina) {
		pdfActual.currentPage -= 1;
		renderPaginaActual();
	}else {
		asistenteDice("esta fue la primera página")
	}
});
btnSiguiente.addEventListener("click", ()=>{
	const validacionDePagina = pdfActual.currentPage < pdfActual.countOfPages;
	if (validacionDePagina) {
		pdfActual.currentPage += 1;
		renderPaginaActual();
	}else{
		asistenteDice("esta fue la ultima página")
	}
});
btnZoomMenos.addEventListener('click', () => {
	if (pdfActual.file && datoZoom >= 100) {
		datoZoom -= 20;
		document.getElementById('zoomValue').innerHTML = datoZoom + "%";
		pdfActual.zoom -= .2;
		renderPaginaActual();
		// console.log(datoZoom);
	}
});
btnZoomMas.addEventListener('click', () => {
	if (pdfActual.file && datoZoom <= 290) {
		datoZoom += 20;
		document.getElementById('zoomValue').innerHTML = datoZoom + "%";
		pdfActual.zoom += .2;
		renderPaginaActual();
		// console.log(datoZoom)
	}
});

function mostrarPDFenCanvas(datoPDF, idBtn){
	console.log(idBtn)
	console.log(contaLectorPdfHojaBtn)
	if (idBtn !== "" && contaLectorPdfHojaBtn === 0 ) {
		
		
		let todosbtns = document.querySelectorAll(".btnsReproducir")
		for (variable of todosbtns) {
			if (variable.id == idBtn) {
				document.getElementById(idBtn).style.display = "block";
			}else {
				variable.style.display = "none"
			}
		}

	}
	document.querySelector("#nombrePDFMostrar").style.display = "block";
	document.querySelector("#nombrePDFMostrar").innerHTML=datoPDF;
	
 	cargarPDF(datoPDF);
}

// function lecturaPdfClic(nombrePDF, texto_hoja_o_pdf){
//  	lecturaPdf(nombrePDF, texto_hoja_o_pdf);
//  	asistenteDice(textoPdfCompleto)
//  	textoPdfCompleto=[]
// }