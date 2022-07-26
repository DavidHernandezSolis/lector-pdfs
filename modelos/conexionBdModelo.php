<?php 
/**
 * 
 */
class ConexionBdMod{
	public function conectarMod(){
		$link= new PDO("mysql:host=localhost;dbname=proyecto-lectura-pdfs",
						"root",
						"",
						array(PDO::ATTR_ERRMODE=> PDO::ERRMODE_EXCEPTION,
								PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")
						);

		return $link;
	}
}

// $run =new ConexionBdMod();
// $run -> conectarMod();

// var_dump($run);