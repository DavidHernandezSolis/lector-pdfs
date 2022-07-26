<?php 

require_once "conexionBdModelo.php";

/**
 * 
 */
class PDFModelo extends ConexionBdMod
{
	//================================================================================
	//CREAR NUEVA TABLA PARA LA CREACION DE NUEVO NIVEL DE TEMA
	//================================================================================
	public function crearTablaNuevoNivelM($nombreT)
	{
		$stms = ConexionBdMod::conectarMod()->prepare("SHOW TABLES like '".$nombreT."'");
		$stms -> execute();
		//echo json_encode($stms->rowCount());
		if ($stms->rowCount() < 1){
			$stm = ConexionBdMod::conectarMod()->prepare("CREATE TABLE $nombreT ( 
				`id_Tema` INT NOT NULL AUTO_INCREMENT , 
				`nombre` VARCHAR(50) NOT NULL , 
				`materia` VARCHAR(50) NOT NULL , 
				`nivelTema` VARCHAR(50) NOT NULL , 
				PRIMARY KEY (`id_Tema`)) ENGINE = InnoDB");
			$stm -> execute();
			echo json_encode("success");
			$stm=null;			
		}else{
			echo json_encode("existe");
			$stms=null;
		}

	}
	
	//================================================================================
	//LISTAR TODOS LOS TEMAS DE LOS NIVELES EXISTENTES AL CARGAR LA PAGINA
	//================================================================================
	public function verificarExistenciaTablaM($nombreT, $proceso)
	{
		if ($proceso == 1) {
			$stms = ConexionBdMod::conectarMod()->prepare("SHOW TABLES like '".$nombreT."'");
			$stms -> execute();
			return ($stms->rowCount());
			$stms=null;	
		}else if ($proceso == 2) {
			$stm = ConexionBdMod::conectarMod()->prepare("SELECT * FROM $nombreT");
			$stm -> execute();
	
			return $stm -> fetchAll();

			$stm=null;
		}
		

		// 	//Obtener los registros de la tabla
		// 	

		// //Cerrar conexion con la BD
		// $stm=null;
		// $con=null;

		
		// echo json_encode($registros);
	}

//-----------------------------------
//LISTAR temas
//-----------------------------------
	static public function listarTemasM($tabla)
	{
		$stm = ConexionBdMod::conectarMod()->prepare("SELECT * FROM $tabla");
		$stm -> execute();
		//Preparar las sentencia SQL (SELECT)
			// $stm=$con->prepare("SELECT * FROM tbl_libros");

			// //Ejecutar la setencia SQL
			// $stm->execute();

			//Obtener los registros de la tabla
			$resgistros=array();
			while ($fila=$stm->fetch(PDO::FETCH_ASSOC)) {
				$registros[]=$fila;
			}

		//Cerrar conexion con la BD
		$stm=null;
		$con=null;

		
		echo json_encode($registros);

	}
	//=======================================
	public function agregarTemasM($info){
		$tabla = $info['tabla'];
		$stm = ConexionBdMod::conectarMod()->prepare("SHOW TABLES like $tabla");
		$stm -> execute();
		if ($stm->rowCount() < 1){
			echo son_encode("tabla no existe");
		}


		// $stmt = Conexion::conectar()->prepare("SELECT * FROM `usuario` WHERE  Correo = ? AND Contrasena = ? ");
		// $stmt -> bindParam(1, $DatosControl["correo"]);
		// $stmt -> bindParam(2, $DatosControl["contra1"]);
	 // 	$stmt -> execute();

	 	// if ($stmt->rowCount() < 1){

	 	// 	$stmtinsert = Conexion::conectar()->prepare("INSERT INTO `usuario` (`Nombre`, `Apellido`, `Correo`, `Contrasena`, `Domicilio`, `Colonia`, `Calle`, `Telefono`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

		 //  	$stmtinsert -> bindParam(1, $DatosControl["nombre"]);
		 //  	$stmtinsert -> bindParam(2, $DatosControl["apellido"]);
		 //  	$stmtinsert -> bindParam(3, $DatosControl["correo"]);
		 //  	$stmtinsert -> bindParam(4, $DatosControl["contra1"]);
		 //  	$stmtinsert -> bindParam(5, $DatosControl["municipio"]);
		 //  	$stmtinsert -> bindParam(6, $DatosControl["colonia"]);
		 //  	$stmtinsert -> bindParam(7, $DatosControl["calle"]);
		 //  	$stmtinsert -> bindParam(8, $DatosControl["telefono"]);

			// $stmtinsert = $stmtinsert -> execute();

		 //    if ($stmtinsert == true) {
		 //  	   return "true";
		 //    } else {
		 //  	   return "falso";
		 //    }

		 //    $stmtinsert = Null;
	 		
	 	// }else{
	 	// 	return "existe";
	 	// }
	}
}