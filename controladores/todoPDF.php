<?php 
require_once "../modelos/todoPDF_M.php";

class Pdf{

	//Crear una nueva tabla al agregar nuevo nivel de tema
	//=======================================================
	public function crearTablaNuevoNivelC($nombreT)
	{
		//echo json_encode($nombreT);
		$respuesta =PDFModelo::crearTablaNuevoNivelM($nombreT);
	}

	//enlistar los temas y niveles que ya existen en lista 1 agregar nivel de tema
	//=======================================================
	public function listarTemasParte1C($nombreT)
	{
		$nivelesTablas=array();
		$tabla=true;
		for ($i=0; $tabla == true; $i++) { 
			$nombre = $nombreT.$i;
			$respuesta = PDFModelo::verificarExistenciaTablaM($nombre, 1);
			if ($respuesta > 0) { //si la tabla existe la consulta traera una fila
				$datosTabla = PDFModelo::verificarExistenciaTablaM($nombre, 2);
				$nivelesTablas[]=$datosTabla;
			}else{
				$tabla = false;
				if ($i == 0) {
					echo json_encode("noExistenTablas");
				}
			}
			
		}
		echo json_encode($nivelesTablas);
	}

	//enlistar los temas y niveles que ya existen en lista 2
	//=======================================================
	public function listarTemasParte2C($nombreT)
	{
		$nivelesTablas=array();
		$tabla=true;
		for ($i=0; $tabla == true; $i++) { 
			$nombre = $nombreT.$i;
			$respuesta = PDFModelo::verificarExistenciaTablaM($nombre, 1);
			if ($respuesta > 0) { //si la tabla existe la consulta traera una fila
				$datosTabla = PDFModelo::verificarExistenciaTablaM($nombre, 2);
				$nivelesTablas[]=$datosTabla;
			}else{
				$tabla = false;
				if ($i == 0) {
					echo json_encode("noExistenTablas");
				}
			}
			
		}
		echo json_encode($nivelesTablas);
		// while ($fila=$stm->fetch(PDO::FETCH_ASSOC)) { $nivelesTablas[]=$nombre;
		// 	$registros[]=$fila;
		// }
		// $respuesta =PDFModelo::listarTemasParte1M($nombreT);
		// $nivelesTablas = [];
	}




	//===============================
	 public function ensayar($dato){
	 	echo json_encode($dato);
	 }
	 //-----------------------------------
	//LISTAR temas
	//-----------------------------------
	public function listarTemas($infoTabla)
	{
		
		$respuesta =PDFModelo::listarTemasM($infoTabla["tabla"]);
		
	}
	//-----------------------------------
	//agregar temas
	//-----------------------------------
	public function agregarTemas($info)
	{
		
		$respuesta = PDFModelo::agregarTemasM($info);

	}
}

//======================================================
//RECIBIR PETICIONES DE agregarPDF.js
//======================================================
header("Content-type: appliaction/json; charset=utf-8");
$info=json_decode(file_get_contents("php://input"),true);

$funcion=$info['funcionPhp'];

if ($funcion == "listarTemas") {

	$ensayar =Pdf::listarTemas($info);
	
}else if($funcion == "agregarTemas"){

	$ensayar =Pdf::agregarTemas($info);

}else if($funcion== "crearTablaNuevoNivelC"){

	$ejecutarFun =Pdf::crearTablaNuevoNivelC($info['nombre']);

}else if($funcion== "listarTemasParte1C"){

	$ejecutarFun =Pdf::listarTemasParte1C($info['nombre']);

}else if($funcion== "listarTemasParte2C"){

	$ejecutarFun =Pdf::listarTemasParte2C($info['nombre']);

}