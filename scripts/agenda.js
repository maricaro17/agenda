const form = document.getElementById("form");
const listar = document.getElementById("listarAgenda");
const btnBuscar = document.getElementById("btn-search");
const mostrarBusq = document.getElementById("mostrarBusq");
const enviar = document.getElementById("enviar");
const containerButton = document.getElementById("container-button");
const inputSearch = document.getElementById("search");
let citaSustentacion = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!e.target.children["container-button"].children["modificar"]) {
    agendar();
  }
  form.reset();
});

const agendar = () => {
  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellido").value;
  let correo = document.getElementById("correo").value;
  let fecha = document.getElementById("fecha").value;
  let hora = document.getElementById("hora").value;
  let observacion = document.getElementById("obser").value;
  console.table(nombre, apellido, correo, fecha, hora, observacion);

  let agregarAgenda = {
    id: Math.round(Math.random() * (100 - 1) + 1),
    nombre,
    apellido,
    correo,
    fecha,
    hora,
    observacion,
  };

  console.table(agregarAgenda);

  //Busqueda de que es lo que existe en el localStorage Key
  const key = JSON.parse(localStorage.getItem("Agenda"));

  if (key !== null) {
    key.unshift(agregarAgenda);
    localStorage.setItem("Agenda", JSON.stringify(key));
  } else {
    citaSustentacion.unshift(agregarAgenda);
    localStorage.setItem("Agenda", JSON.stringify(citaSustentacion));
  }
  listarLocalStorage();
};

//listar

const listarLocalStorage = () => {
  listar.innerHTML = "";
  const TodolodeLocalStorage = JSON.parse(localStorage.getItem("Agenda"));
  TodolodeLocalStorage.map((agenda) => {
    const { id, nombre, apellido, correo, fecha, hora, observacion } = agenda;

    listar.innerHTML += `
                    <td>${id}</td>
                    <td>${nombre}</td>
                    <td>${apellido}</td>
                    <td>${correo}</td>
                    <td>${fecha}</td>
                    <td>${hora}</td>
                    <td>${observacion}</td>
                    <td>
                    <button class="btn btn-success" id=${id}><img id=${id} height= "20px" src="https://res.cloudinary.com/danimel/image/upload/v1646015685/edit_nh7sll.png" ></button>
                    <button class="btn btn-danger" id=${id}><img id=${id} height= "20px" src="https://res.cloudinary.com/danimel/image/upload/v1646015682/trash_2_vcdean.png" ></button>
                    </td>
        `;
  });
};

//eliminar
listar.addEventListener("click", (e) => {
  console.log(e.target.classList);
  const btnEditar = e.target.classList.contains("btn-success");
  const btnEliminar = e.target.classList.contains("btn-danger");
  const id = e.target.id;
  //  console.log(btnEliminar,  id)
  const LS = JSON.parse(localStorage.getItem("Agenda"));

  const buscarId = LS.find((datos) => datos.id === Number(id));
  //   console.log(buscarId)

  if (btnEliminar) {
    LS.forEach((el, index) => {
      if (el.id === buscarId.id) {
        console.log("lo encontre");
        LS.splice(index, 1);
        console.log(LS);
        localStorage.setItem("Agenda", JSON.stringify(LS));
        listarLocalStorage();
      }
    });
  }

  // Editar
  if (btnEditar) {
    const row = LS.find((item) => item.id === buscarId.id);
    document.getElementById("nombre").value = row.nombre;
    document.getElementById("apellido").value = row.apellido;
    document.getElementById("correo").value = row.correo;
    document.getElementById("fecha").value = row.fecha;
    document.getElementById("hora").value = row.hora;
    document.getElementById("obser").value = row.observacion;
    enviar.setAttribute("disabled", "true");
    const modify = document.createElement("button");
    modify.textContent = "Modificar";
    modify.className = "btn btn-success";
    modify.id = "modificar";
    containerButton.appendChild(modify);
    modify.onclick = () => {
      row.nombre = document.getElementById("nombre").value;
      row.apellido = document.getElementById("apellido").value;
      row.correo = document.getElementById("correo").value;
      row.fecha = document.getElementById("fecha").value;
      row.hora = document.getElementById("hora").value;
      row.observacion = document.getElementById("obser").value;
      LS.map((item) => {
        if (item.id === row.id) {
          item = row;
        }
        return item;
      });
      localStorage.setItem("Agenda", JSON.stringify(LS));
      listarLocalStorage();
    };
  }
});
//--------BUSCAR------//
btnBuscar.addEventListener("click", (e) => {
  e.preventDefault();

  let buscar = document.getElementById("search").value;
  console.log(buscar);

  const todaDataLS = JSON.parse(localStorage.getItem("Agenda"));

  let filtrado = todaDataLS.filter(
    (toda) => toda.nombre.toLowerCase() === buscar.toLowerCase()
  );
  console.log(filtrado);

  let filtrarTodos = todaDataLS.filter((toda) =>
    toda.nombre.toUpperCase().includes(buscar.toUpperCase())
  );
  console.log(filtrarTodos);

  mostrarBusq.innerHTML = "";
  filtrarTodos.length === 0
    ? alert("No existe el nombre")
    : filtrarTodos.map((mostrar) => {
        const { nombre, apellido, fecha, hora } = mostrar;

        mostrarBusq.innerHTML += `

        
            <h1>${nombre} ${apellido}  </h1>
            <h3>${fecha}</h3>
            <h3>${hora}</h3>
        `;
      });
  inputSearch.value = "";
});
