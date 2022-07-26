<div class="container-fluid subNav lista">
	<div class="bd-subnavbar row justify-content-end pb-2">
		<div class="col-4 textoAdaptable  mt-2" >
			<center><h3 class="fontPoppins">Agregar PDF</h3></center>
		</div>
		<div class="col-4  mt-2  "  >
			<button class="btn  btn-outline-success btnGuardar zoom colocarDerecha" type="button " >
				<span><i class="fa-solid fa-circle-plus fa-sm"></i>Guardar</span>
			</button>
		</div>	
	</div>
</div>
		
<div class="container-fluid bg-light mt-1 pb-5 	" >
	<div class="row mt-3 justify-content-center conCreTem" style="border-color: black; margin-bottom: 0px;">
		<!-- <div class="col-xs-4 col-sm-3 conNivTem_X">
			<label for="datosDeLista" class="form-label">Tema </label>
			<input class="form-control" list="listaDeTemas" id="datosDeLista" placeholder="Agregar O Elejir Tema">
			<datalist id="listaDeTemas">
			  <option value="Tema 1">
			  <option value="Tema 2">
			  <option value="Tema 3">
			  <option value="Tema 4">
			  <option value="Tema 5">
			</datalist>
		</div> -->
	</div>
	<div class="row  justify-content-center conBtnNivTem" style="border-color: black; margin-top: 0px;">
		<div class="col-xs-4 col-sm-3 d-flex align-items-center " style="padding-top: 2%;" >
			<button class="btn agregarSubSeccion btnAgrNivTem" type="button " id="idBtnAgrNivTem">
				<span><i class="fa-solid fa-circle-plus fa-sm"></i>Agregar Nivel De Tema</span>
			</button>
		</div>
	</div>
	<hr style="color: black;margin-top: 0px; " />
	<div class="row pt-2">
		<div class="col-6 listarTemasEstructurado">
			<ol class="list-group-flush list-group-numbered lista  listaTemaContenedor lista1 "   nivedelista="tema_Nivel_1">
				<!-- <li class="list-group-item mt-2">
						<span class="">
							seccion x
						</span>
						<button type="button" class="zoom btn btn-outline-success  colorFondo colocarDerecha" idbtnEdiSec" >
							<i class="fa-solid fa-pen-to-square fa-sm"></i>
						</button>
						<button type="button" class="zoom  btn btn-outline-secondary colorFondo colocarDerecha" id="btnElimSec" >
							<i class="fa-solid fa-trash-can fa-sm"> </i>
						</button>
						<div class="row container">
							<ul type="none">
								<li class="list-group-item mt-2 bordes_izq_aba">Nombre pdf 1
									<button type="button" class=" zoom btn btn-outline-secondary colorFondo colocarDerecha" id="btnElimSec" >
										<i class="fa-solid fa-trash-can fa-sm"> </i>
									</button>
								</li>
								<li class="list-group-item mt-2 bordes_izq_aba">Nombre pdf 2 
									<button type="button" class="btn btn-outline-secondary colorFondo colocarDerecha" id="btnElimSec" >
										<i class="fa-solid fa-trash-can fa-sm"> </i>
									</button>
								</li>
								<li class="list-group-item mt-2 bordes_izq_aba">
									<button type="button" class="agregarSubSeccion fondoBlanco"  id=""  data-bs-toggle="modal" data-bs-target="#subir_pdf">
										<span class="">
											<i class="fa-solid fa-circle-plus fa-sm"></i>
											 Agregar PDF
										</span>
									</button>
								</li>
							</ul>
						</div> -->
						<!-- sub -->						
						<!-- <div class="row">
							<ol class="list-group-flush list-group-numbered">
								<li class="list-group-item mt-2">
									<span class="">
										seccion x
									</span>
									<button type="button" class="zoom btn btn-outline-success  colorFondo colocarDerecha" idbtnEdiSec" >
										<i class="fa-solid fa-pen-to-square fa-sm"></i>
									</button>
									<button type="button" class="zoom btn btn-outline-secondary colorFondo colocarDerecha" id="btnElimSec" >
										<i class="fa-solid fa-trash-can fa-sm"> </i>
									</button>
								  	<div class="row container">
										<ul type="none">
											<li class="list-group-item mt-2 bordes_izq_aba">Nombre pdf 1 
												<button type="button" class="zoom btn btn-outline-secondary colorFondo colocarDerecha" id="btnElimSec" >
													<i class="fa-solid fa-trash-can fa-sm"> </i>
												</button>
											</li>
											<li class="list-group-item mt-2 bordes_izq_aba">Nombre pdf 2 
												<button type="button" class=" zoom btn btn-outline-secondary colorFondo colocarDerecha" id="btnElimSec" >
													<i class="fa-solid fa-trash-can fa-sm"> </i>
												</button>
											</li>
											<li class="list-group-item mt-2 bordes_izq_aba">
												<button type="button" class=" zoom agregarSubSeccion fondoBlanco"  id=""  data-bs-toggle="modal" data-bs-target="#subir_pdf">
													<span class="">
														<i class="fa-solid fa-circle-plus fa-sm"></i>
														 Agregar PDF
													</span>
												</button>
											</li>
										</ul>
									</div> -->
									<!-- sub-sub -->									
								  	<!-- <div class="row">
										<ol class="list-group-flush list-group-numbered">
											<li class="list-group-item mt-2">
												<span class="">
													seccion x
												</span>
												<button type="button" class="zoom btn btn-outline-success  colorFondo colocarDerecha" idbtnEdiSec" >
													<i class="fa-solid fa-pen-to-square fa-sm"></i>
												</button>
												<button type="button" class=" zoom btn btn-outline-secondary colorFondo colocarDerecha" id="btnElimSec" >
													<i class="fa-solid fa-trash-can fa-sm"> </i>
												</button>
											  	<div class="row container">
													<ul type="none">
														<li class="list-group-item mt-2 bordes_izq_aba">Nombre pdf 1 
															<button type="button" class=" zoom btn btn-outline-secondary colorFondo colocarDerecha" id="btnElimSec" >
																<i class="fa-solid fa-trash-can fa-sm"> </i>
															</button>
														</li>
														<li class="list-group-item mt-2 bordes_izq_aba">Nombre pdf 2 
															<button type="button" class=" zoom btn btn-outline-secondary colorFondo colocarDerecha" id="btnElimSec" >
																<i class="fa-solid fa-trash-can fa-sm"> </i>
															</button>
														</li>
														<li class="list-group-item mt-2 bordes_izq_aba">
															<button type="button" class="zoom agregarSubSeccion fondoBlanco"  id=""  data-bs-toggle="modal" data-bs-target="#subir_pdf">
																<span class="">
																	<i class="fa-solid fa-circle-plus fa-sm"></i>
																	 Agregar PDF
																</span>
															</button>
														</li>
													</ul>
												</div>
										  	</li>
										  	<li class="list-group-item mt-2">
											  	<button type="button" class=" zoom agregarSubSeccion fondoBlanco"  id=""  data-bs-toggle="modal" data-bs-target="#sub_subtema">
													<span class="">
														<i class="fa-solid fa-circle-plus fa-sm"></i>
														Agregar sub-subtema
													</span>
												</button>
										  	</li>
										  </ol>
									</div>
							  	</li>
							  	<li class="list-group-item mt-2">
								  	<button type="button" class="agregarSubSeccion fondoBlanco"  id=""  data-bs-toggle="modal" data-bs-target="#subtema">
										<span class="">
											<i class="fa-solid fa-circle-plus fa-sm"></i>
											Agregar subtema
										</span>
									</button>
							  	</li>
							  </ol>
						</div>
				</li> -->

				<li class="list-group-item mt-2 liAgregarTemaMadre">
					<button type="button" class="agregarSubSeccion fondoBlanco agregarTema"  id=""  data-bs-toggle="modal" data-bs-target="#tema">
						<span class="">
							<i class="fa-solid fa-circle-plus fa-sm"></i>
							Agregar tema
						</span>
					</button>
				</li>
			</ol>
		</div>
		<div class="col-6">
			<div class="pdf textoAdaptable mt-2">
				<iframe src="">
				
				</iframe>
				<br>
				<span>aqui colocar el pdf</span>
			</div>
		</div>
	</div>	
</div>


	
	<!-- Modal Tema-->
	<div class="modal fade" id="tema" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
	 	<div class="modal-dialog">
		    <div class="modal-content">
			    <div class="modal-header">
			        <h5 class="modal-title" id="staticBackdropLabel">Nuevo Tema</h5>
			    </div>
			    <div class="modal-body">
			    	<span class=""> Agregar el nombre para el nuevo tema.</span>
			       	<div class="mt-3 mb-3 row ">
					    <!-- <label for="idTxtNueSec" class="col-sm-2 col-form-label ">X.X.Y :</label> -->
					    <div class="col- ">
					      <input type="text" class="form-control " id="idTxtTema" >
					    </div>
					</div>
			    </div>
	      		<div class="modal-footer">
	        		<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
	        		<button type="button" class="btn btn-primary" id="agregarTemaNivel_1" data-bs-dismiss="modal">Guardar</button>
	      		</div>
	    	</div>
	  	</div>
	</div>

	


	<!-- Modal subirPDF-->
	<div class="modal fade" id="subir_pdf" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
	 	<div class="modal-dialog">
		    <div class="modal-content">
			    <div class="modal-header">
			        <h5 class="modal-title" id="staticBackdropLabel">Nuevo PDF</h5>
			    </div>
			    <div class="modal-body">
			    	<span class=""> Agregar el nuevo PDF</span>
			       	<div class="mt-3 mb-3 row ">
					    <!-- <label for="idTxtNueSec" class="col-sm-2 col-form-label ">X.X.Y :</label> -->
					    <div class="col- ">
					      <input type="text" class="form-control " id="idTxtNueSec" >
					    </div>
					</div>
			    </div>
	      		<div class="modal-footer">
	        		<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
	        		<button type="button" class="btn btn-primary">Guardar</button>
	      		</div>
	    	</div>
	  	</div>
	</div>
