<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Titulo</title>

	<?php 
		/*============================================
		MANTENDRA LA RUTA FIJA DEL PROYECTO
		============================================*/

		// solicitar una respuesta de una funcion
		//$url = RutaModelo::rutaMod();
		//var_dump($url);

		// Ejecutar una funcion de manera imediata
		// $rutaFija = new RutaModelo();
		// $rutaFija -> rutaMod();
		// var_dump($rutaFija);

		
		
	?>
	<link href="vistas/css/bootstrap.min.css" rel="stylesheet" >
	<link href="vistas/css/secciones.css" rel="stylesheet" >
	<link href="vistas/css/all.css" rel="stylesheet" >
<!-- SE COLOCA PRIMERO PUESTO A QUE SE UTILIZARA PARA LA MANIPULACION DE LOS PDF Y SUSU PROCESOS -->
<script type="text/javascript" src="vistas/js/pdf.js" ></script>

	
</head>
<body class="colorFondoLista " style="margin: 0px;">
	<header class="container-fluid" style="background-color:#204866 ;">

		<?php 
			// =============================
			// COLOCANDO EL ENCABEZADO
			include "modulos/encabezado.php";
		?>
	</header>
	<main class=" pb-5 mb-5">
		<?php 
			//En caso de usar varios modulos de main o pagina cumpleta// =============================
			//array para guardar las rutas ruta/ruta1/ruta2
			$rutas = array();
			$ruta = null;
			//verificar si se encuantra una variable get de la url amigable.
			if (isset($_GET["url"])){
				
				// echo ($_GET['ruta']);
				
				$ruta = explode("/",$_GET["url"]);
				

				if ($ruta != null){
					if ($ruta[0] == "lecturaPorTemas" || $ruta[0] == "agregarPDFhtmlV" 
					|| $ruta[0] == "salir" || $ruta[0] == "registro"  ) {
						$ruta[0];
					 	include_once "modulos/".$ruta[0].".php";
					} else {
						include_once "modulos/error404.php";
					}
				}  
			}else {
				include_once "modulos/lecturaPorTemas.php";
			}

		?>
	</main>
	<footer style="background-color:#204866 ;" class="    border-top textoBlanco footer">
		<?php 
			include_once "modulos/footer.php";
		 ?>
	</footer>

<script type="text/javascript" src="vistas/js/popper.min.js" ></script>
<script type="text/javascript" src="vistas/js/bootstrap.min.js" ></script>
<script type="text/javascript" src="vistas/js/all.js" ></script>
<script type="text/javascript" src="vistas/js/login_registro.js" ></script>

</body>
</html>