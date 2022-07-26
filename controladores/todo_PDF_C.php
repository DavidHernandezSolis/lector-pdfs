<?php  
require_once "../modelos/todo_PDF_M.php";

class Pdf{
	public function guardarTemasC($tema,$idUsuario)
	{
		// echo json_encode($formData);
		$respuesta =new PDFModelo();
		$respuesta->guardarTemasM($tema,$idUsuario);
	}

	public function listarTemasC($idUsuario)
	{			
		$respuesta = new PDFModelo();
		$respuesta->listarTemasM($idUsuario);
	}
	
	public function listarPdfC($id_tema)
	{
		$respuesta = new PDFModelo();
		$respuesta->listarPdfM($id_tema);
	}


	//============================================0
	//de aqui agrege

	public function eliminarPDF_C($id_pdf)
	{
		$respuesta = new PDFModelo();
		$respuesta->eliminarPDF_M($id_pdf);
	}

	public function eliminarPDFs_De_Tema_C($id_tema)
	{
		$respuesta = new PDFModelo();
		$respuesta->eliminarPDFs_De_Tema_M($id_tema);
	}

	public function guardarEdicionTemaC($id_tema, $nombreT)
	{
		$respuesta = new PDFModelo();
		$respuesta->guardarEdicionTemaM($id_tema, $nombreT);
	}

	public function agregarUsuarioC($info)
	{
		$res =new PDFModelo();
		$res->agregarUsuarioM($info);
	}


	public function loginC($info)
	{
		$res =new PDFModelo();
		$res = $res->loginM($info);
		// session_start();
		if ($res !== false) {
			session_start();
			// echo json_encode($res["IdUsuario"]);

			$_SESSION["idUser"] = $res['IdUsuario'];
			$_SESSION["nombreUser"] = $res['Nombre'];
			// echo json_encode($res);
			echo json_encode ("http://localhost/proyecto-lector-pdfs/agregarPDFhtmlV");
		}else{
			echo json_encode("no hay datos del usuario");
		}
		
	}






}
header("Content-type: appliaction/json; charset=utf-8");
$info=json_decode(file_get_contents("php://input"),true);

$funcion=$info['funcionPhp'];

if ($funcion == "guardarTemasC") {

	$guardarTemasC =new Pdf();
	$guardarTemasC->guardarTemasC($info['nombreTema'], $info['idUsuario']);
	
}else if($funcion == "listarTemasC"){

	$listarTemasC = new Pdf();
	$listarTemasC->listarTemasC($info['idUsuario']);
	
}else if($funcion == "listarTemasCA"){

	$listarTemasC = new Pdf();
	$listarTemasC->listarTemasC("");
	
}else if($funcion == "listarPdfC"){

	$listarPdfC =new Pdf();
	$listarPdfC->listarPdfC($info['id_tema']);
	
}
//de aqui agrege
else if($funcion == "agregarUsuario"){

	$agregarU =new Pdf();
	$agregarU->agregarUsuarioC($info);
	
}
else if($funcion == "loginC"){

	$inicio=new Pdf();
	$inicio->loginC($info);
	
}

else if($funcion == "eliminarPDF_C"){

	$eliminarPDF_C=new Pdf();
	$eliminarPDF_C->eliminarPDF_C($info['id_pdf']);
	
}
else if($funcion == "eliminarPDFs_De_Tema"){

	$eliminarPDFs_De_Tema=new Pdf();
	$eliminarPDFs_De_Tema->eliminarPDFs_De_Tema_C($info['id_tema']);
	
}
else if($funcion == "guardarEdicionTemaC"){

	$guardarEdicionTemaC=new Pdf();
	$guardarEdicionTemaC->guardarEdicionTemaC($info['id_tema'],$info['nombreTema']);
	
}