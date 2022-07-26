<nav class="navbar navbar-expand textoBlanco">
  <div class="container-fluid row">
    <a class="navbar-brand col-auto textoBlanco" href="#">icono</a>
    <div class=" colocarDerecha col-auto" id="navbarNavDropdown">
      <ul class="navbar-nav colocarDerecha">
        <li class="nav-item colocarDerecha">
          <a class="nav-link textoBlanco zoom etiquetaBlanco" href="agregarPDFhtmlV">Agregar PDF</a>
        </li>
        <li class="nav-item colocarDerecha">
          <a class="nav-link colocarDerecha textoBlanco zoom etiquetaBlanco" href="lecturaPorTemas">Lectura PDF</a>
        </li>
        <?php 
        session_start();
        
        if (isset($_SESSION["idUser"]) ) {
          
       ?>
        <li class="nav-item colocarDerecha">
          <a class="nav-link colocarDerecha textoBlanco zoom etiquetaBlanco" href="salir">Salir</a>
        </li>
      <?php 
        }
       ?>
      </ul>
    </div>
  </div>
</nav>