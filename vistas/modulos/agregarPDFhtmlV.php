<?php 
	
	
	if (!isset($_SESSION["idUser"]) ) {
		
 ?>
<!-- login -->
<div class="container-fluid subNav lista">
	<div class="bd-subnavbar row justify-content-center pb-2">
		<div class="col-4 textoAdaptable  mt-2" >
			<center><h3 class="fontPoppins ">INICIAR SESION</h3></center>
		</div>
			
	</div>
</div>
		
<div class="container-fluid bg-light mt-1 pb-5 	" >
	<div class="row justify-content-center  pb-2 pt-2" >
		<div class="card col-sm-10 col-md-5">
			<div class="card-header textoBlanco " style="background-color:#204866 ; text-align: center;">
			   <h5>Bienvenido</h5>
			</div>
		  	<div class="card-body">
		    	<div class="form-floating mb-3">
					<div class="input-group  mb-3">
						<span class="input-group-text" id="idUsuario_">Usuario &nbsp &nbsp &nbsp</span>
					  	<input type="text" class="form-control" aria-label="idUsuario_" aria-describedby="idUsuario_" id="idUsuario">
					</div>
					<div class="input-group  mb-3">
						<span class="input-group-text" id="idContra">Contraseñia</span>
					  	<input type="password" class="form-control" aria-label="idContra" aria-describedby="idContra" id="idContrasenia">
					</div>
					<div class="input-group  mb-3  justify-content-between">
						<div>
					    	<a href="registro">Registrarse</a>
						</div>
						<div class=" ">
					    	<button class="btn btn-primary" type="submit" id="idsesion"> &nbsp iniciar &nbsp</button>
						</div>
					</div>
		  	</div>
		</div>
	</div>
</div>



<?php 
	}else{
		$idUsuario = $_SESSION["idUser"];
		$nombreUsuario = $_SESSION["nombreUser"];
 ?>

<!-- Agregar pdf -->
<div class="container-fluid subNav lista">
	<div class="bd-subnavbar row justify-content-center pb-2">
		<div class="col-4 textoAdaptable  mt-2" >
			<center><h3 class="fontPoppins ">Agregar PDF </h3></center>
		</div>
			
	</div>
</div>
		
<div class="container-fluid bg-light mt-1 pb-5 	" >
	<div class="row justify-content-center lista pb-2 pt-2" >
		<div class="col-6" >
			<input  type="text" class=" form-control form-control-sm " id="idTxtTema" placeholder="nombre de tema">
			<input  type="text" class=" form-control form-control-sm " id="idTxtIdUsuario" value="<?php echo $idUsuario; ?>" style="display: none;" >
		</div>
		<div class="col-auto" >
			<button  type="button" class="  btn  colorFondoGuardar colocarDerecha btnSinPading " id="idBtnGuardarTema" >
				Guardar<i class="fa-solid fa-cloud-arrow-up fa-lg"></i>
			</button>
		</div>
	</div>
	<div class="row pt-2">
		<div class="col-xs-12 col-sm-12 col-md-4 listarTemasEstructurado">
			<div class=" sticky-lg-top "> <span class="colorFondoNegro textoAdaptable hidden" id="nombrePDFMostrar" style="padding: 10px;">  </span></div>
			<ol  class="list-group-flush list-group-numbered lista  listaTemaContenedor lista1 contParList">
			<!-- AQUI SE COLOCA EL CODIGO GENERADO POR JAVASCRIPT PARA LISTAR TEMAS, PDF Y MAS sticky-lg-top -->
			</ol>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-8 " id="" >		
			<div class="row  contenedorpdfpanCompleta sticky-lg-top" id="contenedorpdfpanCompleta" >
				<div class="col ">
					<div class="row justify-content-center colorFondoNegro " >
						<div class="col-xs-12 col-sm-5 col-md-5 col-lg-5 ">
							<center>
								<button id="anterior" class="btn textoBlanco sinEfectoFocusBorder zoomTexoBlanco ">
									Anterior
								</button>
								<span id="numPaginas" class="">
									0 de 0
								</span>
								<button id="siguiente" class="btn textoBlanco sinEfectoFocusBorder zoomTexoBlanco ">
									Siguiente
								</button>
							</center>
						</div>
						<div class="col-xs-12 col-sm-5 col-md-5 col-lg-5 ">
							<center class="" style="padding-top: 8px;">
								<span id="zoomValue">100%</span>
								<input type="range" id="zoom" class="zoom " name="cowbell" min="100" max="300" value="100" step="50" disabled>
							</center>
						</div>
						<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 ">
								<button id="pantallaCompleta" class="btn textoBlanco sinEfectoFocusBorder zoomTexoBlanco  colocarDerecha" >
									<i class="fa-solid fa-expand"></i>
								</button>
						</div>
					</div>
					<div class="row  textoAdaptable  colorFondoNegro " >
						<div class="contenedorpdfX">
							<center class=" ">
								<h3 class="hiddenH3">SELECCIONA UN PDF DE LA LISTA</h3>
								<canvas class="vista_pdf " >

								</canvas>
							</center>
							
						</div>
						
					</div>
				</div>				
			</div>
		</div>
	</div>	
</div>



<script type="text/javascript" src="vistas/js/agregar_PDF_V.js" ></script>
<?php 
	}
 ?>