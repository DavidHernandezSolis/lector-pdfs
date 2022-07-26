<?php 
require_once "../modelos/todo_PDF_M.php";
///vistas/archivos
		$id_tema = $_POST["id_tema"]; 
		$archivo = $_FILES["archivo"];
		// echo $archivo["name"];
		$direccion = '/proyecto-lector-pdfs\vistas\archivos';
		$nombre = $archivo["name"];
		$url=$_SERVER["DOCUMENT_ROOT"].$direccion."/".$nombre;
		// echo $url;
		$resultado = move_uploaded_file($archivo["tmp_name"],$_SERVER["DOCUMENT_ROOT"].$direccion."/".$nombre);
		if ($resultado) {
		   // echo "Subido con éxito";
		    $respuesta =new PDFModelo();
			$respuesta->subirPDF_M("contenido", $nombre, $url, $id_tema );
		   
		    // echo $_FILES["tema"];
		} else {
		    echo "Error al subir archivo";
		}