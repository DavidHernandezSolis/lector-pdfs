<div class="container-fluid subNav">
	<div class="bd-subnavbar row justify-content-center ">
		<div class="col-4 textoAdaptable">
			<center><h3 >Lectura de PDF </h3></center>
		</div>	
	</div>
</div>
<div class="container-fluid bg-light mt-1 pb-5" >
	<div class="row pt-5">
		<div class="col-xs-12 col-sm-12 col-md-4 ">
			<div class=" sticky-lg-top "> <span class="colorFondoNegro textoAdaptable hidden" id="nombrePDFMostrar" style="padding: 10px;">  </span></div>
			<ol  class="list-group-flush list-group-numbered lista  listaTemaContenedorLectura lista1 contParList">
				
			</ol>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-8 mt-2 " id="">		
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
								<!-- <input type="range" id="zoom" class="zoom " name="cowbell" min="100" max="300" value="100" step="50" disabled> -->
								<button class="btn textoBlanco zoomTexoBlanco" id="btnZoomMenos" disabled>
									<i class="fa-solid fa-minus"></i>
								</button>
								<button class="btn textoBlanco zoomTexoBlanco" id="btnZoomMas" disabled>
									<i class="fa-solid fa-plus"></i>
								</button>
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
								<h3 class="hiddenH3">AQUI SE VISUALIZARA EL PDF</h3>
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


<script type="text/javascript" src="vistas/js/lecturaPorTemas.js" ></script>