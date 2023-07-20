let userId = null
let idEntidad = null
let etagString = null

function Carga(){
    //Recuperamos los datos del querystring del URL
    const urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('userId');
    idEntidad = urlParams.get('idEntidad');

    CargaInfoUsuario();
    getEtag();
    RellenarForm();
    RelacionesConPersonas();
    RelacionesConProductos();
    ProductosDisponibles();
    PersonasDisponibles();
}

function EditEntity() {
    let entidad = {};

    rellenarEntidad();

    function rellenarEntidad() {
        entidad = {
            name: $("#NombreEntidad").val(),
            birthDate: $("#BirthDate").val(),
            deathDate: $("#DeathDate").val(),
            imageUrl: $("#ImageUrl").val(),
            wikiUrl: $("#WikiUrl").val()
        };
    }


    //Para poder hacer un PUT necesitamos el Etag y este le conseguimos de la cabecera de respuesta de un GET a ese recurso en concreto

    if (etagString === null) {
        alert("No se ha podido obtener el Etag del producto, esto pasa a veces, intentalo de nuevo");
    } else {
        let parsedEtag = etagString;
        parsedEtag = parsedEtag.substring(6);
        console.log(parsedEtag);

        $.ajax({
            type: "PUT",
            url: '/api/v1/entities/' + idEntidad,
            headers: {"Authorization": localStorage.getItem('authHeader') , "if-Match": parsedEtag},
            data: entidad,
            // dataType: 'json',
            success: function (data) {
                location.replace("http://127.0.0.1:8000/FrontEnd/Writer/IndexWriter.html?userId="+ userId);
            }
        });
    }
}

function Volver(){
    location.replace("http://127.0.0.1:8000/FrontEnd/Writer/IndexWriter.html?userId="+ userId);
}

function getEtag() {
    let request = new XMLHttpRequest();
    request.open("GET", "http://127.0.0.1:8000/api/v1/entities/" + idEntidad, true);
    request.send();

    let arr = null;
    request.onreadystatechange = function () {
        if (this.readyState === this.HEADERS_RECEIVED) {

            // Get the raw header string
            let headers = request.getAllResponseHeaders();
            // Convert the header string into an array
            // of individual headers
            arr = headers.trim().split(/[\r\n]+/);
            let i = 0
            while(i < arr.length){
                if(arr[i].substring(0,4) === "etag"){
                    etagString = arr[i];
                }
                i += 1;
            }
        }
    }
}

function RellenarForm(){
    $.ajax({
        type: "GET",
        url: '/api/v1/entities/'+idEntidad,
        headers: {"Authorization": localStorage.getItem('authHeader')},
        // dataType: 'json',
        success: function (data) {
            $("#NombreEntidad").val(data.entity.name);
            $("#BirthDate").val(data.entity.birthDate)
            $("#DeathDate").val(data.entity.deathDate)
            $("#ImageUrl").val(data.entity.imageUrl)
            $("#WikiUrl").val(data.entity.wikiUrl)
        }
    })
}

function RelacionesConPersonas(){
    $.ajax({
        type: "GET",
        url: '/api/v1/entities/' + idEntidad + "/persons",
        headers: {"Authorization": localStorage.getItem('authHeader')},
        // dataType: 'json',
        success: function (data) {
            let i = 0
            while (i < data.persons.length) {
                let p = document.createElement("p");
                let text = document.createTextNode("Nombre: " + data.persons[i].person.name + " ");

                let deleteButton = document.createElement("button");
                deleteButton.name = "Eliminar relacion";
                deleteButton.textContent = "Eliminar relacion";
                deleteButton.setAttribute("onclick", "DeleteRelacionPersona("+data.persons[i].person.id+")")

                p.appendChild(text);
                p.appendChild(deleteButton);

                document.getElementById("relaciones_personasAux").appendChild(p);
                i += 1;
            }
        }
    });
}

function DeleteRelacionPersona(id){
    $.ajax({
        type: "PUT",
        url: '/api/v1/entities/' + idEntidad + "/persons/rem/" + id,
        headers: {"Authorization": localStorage.getItem('authHeader')},
        // dataType: 'json',
        success: function (data) {
            alert("Editado")
            location.replace("http://127.0.0.1:8000/FrontEnd/Elementos/editEntidad.html?userId=" +userId+ "&idEntidad=" + idEntidad);
        }
    });
}

function RelacionesConProductos(){
    $.ajax({
        type: "GET",
        url: '/api/v1/entities/' + idEntidad + "/products",
        headers: {"Authorization": localStorage.getItem('authHeader')},
        // dataType: 'json',
        success: function (data) {
            let i = 0
            while (i < data.products.length) {
                let p = document.createElement("p");
                let text = document.createTextNode("Nombre: " + data.products[i].product.name + " ");

                let deleteButton = document.createElement("button");
                deleteButton.name = "Eliminar relacion";
                deleteButton.textContent = "Eliminar relacion";
                deleteButton.setAttribute("onclick", "DeleteRelacionProducto("+data.products[i].product.id+")")

                p.appendChild(text);
                p.appendChild(deleteButton);

                document.getElementById("relaciones_productos").appendChild(p);
                i += 1;
            }
        }
    });
}

function DeleteRelacionProducto(id){
    $.ajax({
        type: "PUT",
        url: '/api/v1/entities/' + idEntidad + "/products/rem/" + id,
        headers: {"Authorization": localStorage.getItem('authHeader')},
        // dataType: 'json',
        success: function () {
            location.replace("http://127.0.0.1:8000/FrontEnd/Elementos/EditEntidad.html?userId=" +userId+ "&idEntidad=" + idEntidad);
        }
    });
}

function  ProductosDisponibles(){
    $.ajax({
        type: "GET",
        url: '/api/v1/products',
        headers: {"Authorization": localStorage.getItem('authHeader')},
        // dataType: 'json',
        success: function (data) {
            let i = 0
            while (i < data.products.length) {
                let option = document.createElement("option");
                let text = document.createTextNode(data.products[i].product.name);

                option.appendChild(text)
                option.value = data.products[i].product.id;
                document.getElementById("NuevaRelacionProducto").appendChild(option);

                i += 1;
            }
        }
    });
}

function  PersonasDisponibles(){
    $.ajax({
        type: "GET",
        url: '/api/v1/persons',
        headers: {"Authorization": localStorage.getItem('authHeader')},
        // dataType: 'json',
        success: function (data) {
            let i = 0
            while (i < data.persons.length) {
                let option = document.createElement("option");
                let text = document.createTextNode(data.persons[i].person.name);

                option.appendChild(text)
                option.value = data.persons[i].person.id;
                document.getElementById("NuevaRelacionPersona").appendChild(option);

                i += 1;
            }
        }
    });
}

function CrearRelacionProducto(){
    let idProducto = $("#NuevaRelacionProducto").val();

    $.ajax({
        type: "PUT",
        url: '/api/v1/entities/' + idEntidad + "/products/add/" + idProducto,
        headers: {"Authorization": localStorage.getItem('authHeader')},
        // dataType: 'json',
        success: function () {
            location.replace("http://127.0.0.1:8000/FrontEnd/Elementos/EditEntidad.html?userId=" +userId+ "&idEntidad=" + idEntidad);
        }
    });
}

function CrearRelacionPersona(){
    let idPersona = $("#NuevaRelacionPersona").val();

    $.ajax({
        type: "PUT",
        url: '/api/v1/entities/' + idEntidad + "/persons/add/" + idPersona,
        headers: {"Authorization": localStorage.getItem('authHeader')},
        // dataType: 'json',
        success: function () {
            location.replace("http://127.0.0.1:8000/FrontEnd/Elementos/EditEntidad.html?userId=" +userId+ "&idEntidad=" + idEntidad);
        }
    });
}

function CargaInfoUsuario(){
    $.ajax({
        type: "GET",
        url: '/api/v1/users/' + userId,
        headers: {"Authorization": localStorage.getItem('authHeader')},
        // dataType: 'json',
        success: function (data) {
            userRole = data.user.role;

            let p = document.createElement("p");
            let text = document.createTextNode("User: " +data.user.username+ " - Role: " +data.user.role);
            p.appendChild(text);
            document.getElementById("div_info_usuario").appendChild(p);
        }
    });
}