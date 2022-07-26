var contaConNivTem_X = 0;
var nivel  = false;
var tema = "Tema";
let urlAgregarPDF_Y_Tema = "http://localhost/proyecto-lector-pdfs/controladores/";

//==========================================================================
//CREACION DE CONTENEDORES E INPUTS DE LOS NIVELES DE TEMAS
//==========================================================================
document.querySelector("#idBtnAgrNivTem").addEventListener("click", ()=>{

  if (nivel==true) {
    tema = "Sub Tema Nivel "+contaConNivTem_X;
    nivel = false;
  }
  let conCreTem = document.querySelector(".conCreTem");
  //let conBtnNivTem = document.querySelector(".conBtnNivTem");
  let conTxtNivTema = document.createElement("div")
  conTxtNivTema.setAttribute("class", `mb-3 col-xs-4 col-sm-3 conTxtNivTema_${contaConNivTem_X}`);
  conTxtNivTema.innerHTML = `
      <label for="" class="form-label datosDeLista_conTxtNivTema_${contaConNivTem_X}">${tema}</label>
      <input class="form-control" list="listaDatosDeLista_conTxtNivTema_${contaConNivTem_X}" id="datosDeLista_conTxtNivTema_${contaConNivTem_X}" placeholder="Agregar O Elejir Tema">
      <datalist id="listaDatosDeLista_conTxtNivTema_${contaConNivTem_X}">
        <option value="...">
      </datalist>
  `;
  conCreTem.appendChild(conTxtNivTema);
  // let strNivelTema = document.querySelector(`.datosDeLista_conTxtNivTema_${contaConNivTem_X}`);
  // console.log(strNivelTema.innerHTML)
  //CREAR TABLA NUEVA
  crearTablaNuevoNivel(`datosDeLista_conTxtNivTema_${contaConNivTem_X}`);
  nivel = true;
  contaConNivTem_X += 1;
});
//==========================================================================
//VERIFICAR LISTA TEMAS YA CREADAS INICIANDO LA PAGINA
//==========================================================================
document.addEventListener("DOMContentLoaded",()=>{

  listarTemasParte1();

  // listarTemasParte2();

  let strNivelTema = document.querySelector(`.datosDeLista_conTxtNivTema_${contaConNivTem_X}`);
  let strNivTem;
  if (strNivelTema == null) {
    strNivTem = 0;
  }
  validarExistenciaDeTemas_y_Niveles(strNivTem);
});
//==========================================================================
//VALIDAR TEMAS
//==========================================================================
function validarExistenciaDeTemas_y_Niveles(strNivTem){
  let noTemaNivel;
  console.log(strNivTem)
  if (strNivTem==0) {
    noTemaNivel = 0;
    console.log(noTemaNivel)
  }else {
    noTemaNivel = strNivTem.substr(-1);
    console.log(noTemaNivel)
  } 
}
//==========================================================================
//CREAR NUEVA TABLA DE NUEVO NIVEL
//==========================================================================
function crearTablaNuevoNivel(nombre){
  let objeto={
    funcionPhp: "crearTablaNuevoNivelC",
    nombre:nombre.toLowerCase()
  };
  //console.log(objeto)
  fetch(urlAgregarPDF_Y_Tema+'todoPDF.php', {
        method: 'POST',
        body: JSON.stringify(objeto),
        headers: {
          'Content-Type': 'application/json'// AQUI indicamos el formato
        }
      })
      .then(function(res) {
        return  res.json();
      })
      .then(function(dato) {
        console.log(dato);
      })
      .catch(function(error) {
        console.error(error);
      })
}
//==========================================================================
//AGREGAR TEMAS Y SI NO EXISTE CREAR TABLA EN BASE DE DATOS 
//==========================================================================
function agregarTemas(objeto){
  fetch(urlAgregarPDF_Y_Tema+'agregarPDF.php', {
      method: 'POST',
      body: JSON.stringify(objeto),
      headers: {
        'Content-Type': 'application/json'// AQUI indicamos el formato
      }
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
    })
    .catch(function(error) {
      console.error(error);
    })
}
var conNivel_1_Tema = 0;
//==========================================================================
//si existen datos de temas en la DB al iniciar pagina se mostraran 
//==========================================================================
function listarTemasParte1(){
  let nombre = "datosDeLista_conTxtNivTema_"; 
  let objeto={
    funcionPhp: "listarTemasParte1C",
    nombre:nombre.toLowerCase()
  };
  fetch(urlAgregarPDF_Y_Tema+'todoPDF.php', {
      method: 'POST',
      body: JSON.stringify(objeto),
      headers: {
        'Content-Type': 'application/json'// AQUI indicamos el formato
      }
    })
    .then(function(response) {

      return response.json();
    })
    .then(function(data) {
      //console.log(data);
      if (data != "noExistenTablas") {

        let conCreTem = document.querySelector(".conCreTem");
        for (nivelDeTema of data) {
          // console.log(nivelDeTema)
          if (contaConNivTem_X == 0) {
            tema="Tema";
            
          }else {
            tema="Sub Tema Nivel "+contaConNivTem_X;
          }
            // console.log(tema)
            let conTxtNivTema = document.createElement("div")
            conTxtNivTema.setAttribute("class", `mb-3 col-xs-4 col-sm-3 conTxtNivTema_${contaConNivTem_X}`);
            conTxtNivTema.innerHTML = `
                <label for="" class="form-label datosDeLista_conTxtNivTema_${contaConNivTem_X}">${tema}</label>
                <input class="form-control" list="listaDatosDeLista_conTxtNivTema_${contaConNivTem_X}" id="datosDeLista_conTxtNivTema_${contaConNivTem_X}" placeholder="Agregar O Elejir Tema">
                <datalist id="listaDatosDeLista_conTxtNivTema_${contaConNivTem_X}">
                  ${
                    listarEnCrearNuevos(nivelDeTema)
                  }
                  
                </datalist>
            `;
            conCreTem.appendChild(conTxtNivTema);
          contaConNivTem_X += 1;
          nivel = true;
          
        }
      }
        
    })
    .catch(function(error) {
      console.error(error);
    })
}
//==========================================================================
//FUNCION PARA PINTAR LOS TEMAS EN LA PRIMERA PARTE DE CREAR NUEVAS
//==========================================================================
function listarEnCrearNuevos(nivelDeTema){
  // console.log(nivelDeTema)
  let temasOpciones;
  for (dato of nivelDeTema) {
   temasOpciones += `
    <option value="${dato.nombre}">
   `;
  }
  return temasOpciones;
}
//==========================================================================
//FUNCION PARA PINTAR LOS TEMAS la SEGUNDA PARTE DE FORMA ESTRUCTURADA
//==========================================================================
function listarTemasParte2(){
  let nombre = "datosDeLista_conTxtNivTema_"; 
  let objeto={
    funcionPhp: "listarTemasParte2C",
    nombre:nombre.toLowerCase()
  };
  fetch(urlAgregarPDF_Y_Tema+'agregarPDF.php', {
      method: 'POST',
      body: JSON.stringify(objeto),
      headers: {
        'Content-Type': 'application/json'// AQUI indicamos el formato
      }
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
    })
    .catch(function(error) {
      console.error(error);
    })
  
}
//==========================================================================
function listarTemasEst(){
  
}
//==========================================================================

function listarTemasHtml(data){
  console.log(data)
  let listaTemaContenedor = document.querySelector(".listaTemaContenedor");
  let liAgregarTemaMadre = document.querySelector(".liAgregarTemaMadre");
  console.log(listaTemaContenedor)
  console.log(liAgregarTemaMadre)
  for (tema of data) {
    conNivel_1_Tema += 1;
    let idListaMadre ="idTema"+conNivel_1_Tema;
    let crearLista =  document.createElement("li");
          crearLista.setAttribute("class", "list-group-item mt-2 ");
          crearLista.setAttribute("id",idListaMadre);
          crearLista.innerHTML = `
            <span class="">
                ${tema.Materia}
              </span>
              <button type="button" class="zoom btn btn-outline-success  colorFondo colocarDerecha" idbtnEdiSec" >
                <i class="fa-solid fa-pen-to-square fa-sm"></i>
              </button>
              <button type="button" class="zoom  btn btn-outline-secondary colorFondo colocarDerecha" id="btnElimSec" >
                <i class="fa-solid fa-trash-can fa-sm"> </i>
              </button>
              <div class="row container">
                <ul type="none" class="${idListaMadre}_listaPDF_">
                  <li class="list-group-item mt-2 bordes_izq_aba">
                    <button type="button" onclick="agregarPDF('${idListaMadre}_listaPDF_')" class="agregarSubSeccion fondoBlanco"  id=""  data-bs-toggle="modal" data-bs-target="#subir_pdf">
                      <span class="">
                        <i class="fa-solid fa-circle-plus fa-sm"></i>
                         Agregar PDF
                      </span>
                    </button>
                  </li>
                </ul>
              </div>
              <div class="row  mt-2">
                <button type="button" onclick="agregarNivelTema()" class="agregarSubSeccionAdicional fondoBlanco agregarTema fondoVerdeAgregarOtroTema"  id=""  >
                  <span class="">
                    <i class="fa-solid fa-circle-plus fa-sm"></i>
                    Agregar otro nivel de TEMA
                  </span>
                </button>
              </div>
          `;
          
          listaTemaContenedor.insertBefore(crearLista, liAgregarTemaMadre);
   
  }
}






















//==========================================================================
//
//==========================================================================

//==========================================================================
//
//==========================================================================
function agregarNivelTema(){
  var conNivelTema

}

//==========================================================================
//
//==========================================================================
function eliminarTema(nombre){
  fetch(urlAgregarPDF_Y_Tema+'agregarPDF.php', {
      method: 'POST',
      body: JSON.stringify(objeto),
      headers: {
        'Content-Type': 'application/json'// AQUI indicamos el formato
      }
    })
    .then(function(response) {
      return response.text();
    })
    .then(function(data) {
      console.log(data);
    })
    .catch(function(error) {
      console.error(error);
    })
} 
//==========================================================================
//
//==========================================================================
function editarTema(nombre){
  fetch(urlAgregarPDF_Y_Tema+'agregarPDF.php', {
      method: 'POST',
      body: JSON.stringify(objeto),
      headers: {
        'Content-Type': 'application/json'// AQUI indicamos el formato
      }
    })
    .then(function(response) {
      return response.text();
    })
    .then(function(data) {
      console.log(data);
    })
    .catch(function(error) {
      console.error(error);
    })
}



function ensayar() {
  let objeto = {
    "funcionPhp": "ensayar",
    "nombre": "Jean Carlo",
    "apellido": "Castaño Millan",
    "Telefono": 31222020
  };
  
}

// document.addEventListener("DOMContentLoaded", ()=>{
//   let objeto={
//     funcionPhp: "listarTemas",
//     tabla: "tema"
//   };
//   listarTema(objeto);
// });
// document.querySelector("#agregarTemaNivel_1").addEventListener("click", ()=>{
//   let nombre=document.querySelector("#idTxtTema").value;
//   let objeto={
//     funcionPhp: "agregarTemas",
//     tabla: "tema",
//     nombre:nombre
//   };
//   console.log(objeto);
//   agregarTemas(objeto);
// });