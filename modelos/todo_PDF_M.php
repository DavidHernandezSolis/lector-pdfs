<?php 

require_once "conexionBdModelo.php";

/**
 * 
 */
class PDFModelo extends ConexionBdMod{
    public function subirPDF_M($tabla, $nombre, $url, $id_tema )
    {
        // echo $url;
        $stmtinsert = ConexionBdMod::conectarMod()->prepare("INSERT INTO $tabla (nombre_contenido, url_contenido, fkey_id_tema) VALUES (?,?,?)");

            $stmtinsert -> bindParam(1, $nombre);
            $stmtinsert -> bindParam(2, $url);
            $stmtinsert -> bindParam(3, $id_tema);
            $stmtinsert = $stmtinsert -> execute();
             if ($stmtinsert == true) {
               echo "exitoso";

             } else {
               echo "error";
             }
            $stmtinsert = Null;
    }

    public function guardarTemasM($tema , $idUsuario)
    {
        $stmtinsert = ConexionBdMod::conectarMod()->prepare("INSERT INTO tema (nombre_tema, descripcion_tema, fkey_idUsuario) VALUES (?,?, ?)");
        $descripcion = "descripcion";
        $stmtinsert -> bindParam(1, $tema);
        $stmtinsert -> bindParam(2, $descripcion);
        $stmtinsert -> bindParam(3, $idUsuario);
        $stmtinsert = $stmtinsert -> execute();
        if ($stmtinsert == true) {
            echo json_encode("exitoso");

        } else {
            echo json_encode("error");
        }
        $stmtinsert = Null;
    }

    public function listarTemasM($idUsuario)
    {
        // echo $idUsuario;

        if ($idUsuario == "") {
            $stm = ConexionBdMod::conectarMod()->prepare("SELECT * FROM tema");
        }else{
            $stm = ConexionBdMod::conectarMod()->prepare("SELECT * FROM tema WHERE fkey_idUsuario=$idUsuario ");
        }
        $stm -> execute();
        $stm= $stm -> fetchAll();
        $resgistros=[];
        foreach ($stm as $fila => $value) {
            $id = $value["id_tema"];
            $stms = ConexionBdMod::conectarMod()->prepare("SELECT * FROM contenido WHERE fkey_id_tema = $id");
            $stms -> execute();
            $stms= $stms -> fetchAll();
            // $resgistros=[count($stms)];
            if (count($stms) > 0) {
                array_push($resgistros,[$value,$stms]);
            }else{
                array_push($resgistros,[$value,"Sin Pdf"]);
            }
        }
        echo json_encode($resgistros);
        $stm=null;
    }
    public function listarPdfM($id_tema)
    {
        $stm = ConexionBdMod::conectarMod()->prepare("SELECT * FROM contenido WHERE fkey_id_tema = $id_tema");
        $stm -> execute();
        $stm= $stm -> fetchAll();
        echo json_encode($stm);
        $stm=null;
    }


    //=================================000000
    //de aqui agrege

    public function eliminarPDF_M($id_pdf)
    {
        $stmtinsert = ConexionBdMod::conectarMod()->prepare("DELETE FROM contenido WHERE id_contenido = $id_pdf");
        $stmtinsert = $stmtinsert -> execute();
        if ($stmtinsert == true) {
            echo json_encode("eliminado");

        } else {
            echo json_encode("error");
        }
        $stmtinsert = Null;
    }


    public function eliminarPDFs_De_Tema_M($id_tema)
    {
        $stmtinsert = ConexionBdMod::conectarMod()->prepare("DELETE FROM contenido WHERE fkey_id_tema  = $id_tema");
        $stmtinsert = $stmtinsert -> execute();
        if ($stmtinsert == true) {
            $stm = ConexionBdMod::conectarMod()->prepare("DELETE FROM tema WHERE id_tema = $id_tema");
            $stm = $stm -> execute();
            if ($stm == true) {
                echo json_encode("tema y pdfs eliminados");
                
            }else{
                 echo json_encode("error al eliminar tema");
            }
             $stm = Null;
            
        } else {
            echo json_encode("error al eliminar PDFs del tema ");
        }
        $stmtinsert = Null;

    }


    public function guardarEdicionTemaM($id_tema, $nombreT)
    {
                 // echo json_encode($nombreT);

            $stm = ConexionBdMod::conectarMod()->prepare("UPDATE tema SET nombre_tema='$nombreT' WHERE  id_tema = $id_tema");
            $stm = $stm -> execute();
            if ($stm == true) {
                echo json_encode("edición Guardada");
                
            }else{
                 echo json_encode("error al guardar edición");
            }
             $stm = Null;
    }

    public function agregarUsuarioM($info)
    {
        
        $stmtinsert = ConexionBdMod::conectarMod()->prepare("INSERT INTO usuario (Nombre, ApellidoP, ApellidoM, contrasenia) VALUES (?, ?, ?, ?)");
        $stmtinsert -> bindParam(1, $info['nombre']);
        $stmtinsert -> bindParam(2, $info['apellidoP']);
        $stmtinsert -> bindParam(3, $info['apellidoM']);
        $stmtinsert -> bindParam(4, $info['contrasenia']);
        $stmtinsert = $stmtinsert -> execute();
        if ($stmtinsert == true) {
            echo json_encode("registrado");
        } else {
            echo json_encode("error");
        }
        $stmtinsert = Null;
    }

    public function loginM($info)
    {
        $nombre = $info['usuario'];
        $contrasenia = $info['contrasenia'];
        $stm = ConexionBdMod::conectarMod()->prepare("SELECT * FROM `usuario` WHERE `Nombre` = '$nombre' and  contrasenia = '$contrasenia' ");
        $stm -> execute();
        $stm= $stm -> fetch();
        return $stm;
       
        $stm=null;
    }
}