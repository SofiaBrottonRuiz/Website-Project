let userId = null
let idPersona = null
let etagString = null

function Carga(){
    //Recuperamos los datos del querystring del URL
    const urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('userId');
    idPersona = urlParams.get('idPersona');

    CargaInfoUsuario()
    getEtag();
    RellenarForm();
    RelacionesConProductos();
    RelacionesConEntidades();
    ProductosDisponibles();
    EntidadesDisponibles();
}

function EditPerson() {
    let producto = {};

    rellenarPersona();

    function rellenarPersona() {
        persona = {
            name: $("#NombrePersona").val(),
            birthDate: $("#BirthDate").val(),
            deathDate: $("#DeathDate").val(),
            imageUrl: $("#ImageUrl").val(),
            wikiUrl: $("#WikiUrl").val()
            //persons: $("#Persons").val(),
            //entities: $("#Entities").val()
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
            url: '/api/v1/persons/' + idPersona,
            headers: {"Authorization": localStorage.getItem('authHeader') , "if-Match": parsedEtag},
            data: persona,
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
    request.open("GET", "http://127.0.0.1:8000/api/v1/persons/" + idPersona, true);
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
        url: '/api/v1/persons/'+idPersona,
        headers: {"Authorization": localStorage.getItem('authHeader')},
        // dataType: 'json',
        success: function (data) {
            $("#NombrePersona").val(data.person.name);
            $("#BirthDate").val(data.person.birthDate)
            $("#DeathDate").val(data.person.deathDate)
            $("#ImageUrl").val(data.person.imageUrl)
            $("#WikiUrl").val(data.person.wikiUrl)
        }
    })
}

function RelacionesConProductos(){
    $.ajax({
        type: "GET",
        url: '/api/v1/persons/' + idPersona + "/products",
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
        url: '/api/v1/persons/' + idPersona + "/products/rem/" + id,
        headers: {"Authorization": localStorage.getItem('authHeader')},
        // dataType: 'json',
        success: function (data) {
            location.replace("http://127.0.0.1:8000/FrontEnd/Elementos/EditPersona.html?userId=" +userId+ "&idPersona=" + idPersona);
        }
    });
}

function RelacionesConEntidades(){
    $.ajax({
        type: "GET",
        url: '/api/v1/persons/' + idPersona + "/entities",
        headers: {"Authorization": localStorage.getItem('authHeader')},
        // dataType: 'json',
        success: function (data) {
            let i = 0
            while (i < data.entities.length) {
                let p = document.createElement("p");
                let text = document.createTextNode("Nombre: " + data.entities[i].entity.name + " ");

                let deleteButton = document.createElement("button");
                deleteButton.name = "Eliminar relacion";
                deleteButton.textContent = "Eliminar relacion";
                deleteButton.setAttribute("onclick", "DeleteRelacionEntidad("+data.entities[i].entity.id+")")

                p.appendChild(text);
                p.appendChild(deleteButton);

                document.getElementById("relaciones_entidades").appendChild(p);
                i += 1;
            }
        }
    });
}

function DeleteRelacionEntidad(id){
    $.ajax({
        type: "PUT",
        url: '/api/v1/persons/' + idPersona + "/entities/rem/" + id,
        headers: {"Authorization": localStorage.getItem('authHeader')},
        // dataType: 'json',
        success: function (data) {
            location.replace("http://127.0.0.1:8000/FrontEnd/Elementos/EditPersona.html?userId=" +userId+ "&idPersona=" + idPersona);
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

function  EntidadesDisponibles(){
    $.ajax({
        type: "GET",
        url: '/api/v1/entities',
        headers: {"Authorization": localStorage.getItem('authHeader')},
        // dataType: 'json',
        success: function (data) {
            let i = 0
            while (i < data.entities.length) {
                let option = document.createElement("option");
                let text = document.createTextNode(data.entities[i].entity.name);

                option.appendChild(text)
                option.value = data.entities[i].entity.id;
                document.getElementById("NuevaRelacionEntidad").appendChild(option);

                i += 1;
            }
        }
    });
}

function CrearRelacionProducto(){
    let idProducto = $("#NuevaRelacionProducto").val();

    $.ajax({
        type: "PUT",
        url: '/api/v1/persons/' + idPersona + "/products/add/" + idProducto,
        headers: {"Authorization": localStorage.getItem('authHeader')},
        // dataType: 'json',
        success: function () {
            location.replace("http://127.0.0.1:8000/FrontEnd/Elementos/EditPersona.html?userId=" +userId+ "&idPersona=" + idPersona);
        }
    });
}

function CrearRelacionEntidad(){
    let idEntidad = $("#NuevaRelacionEntidad").val();

    $.ajax({
        type: "PUT",
        url: '/api/v1/persons/' + idPersona + "/entities/add/" + idEntidad,
        headers: {"Authorization": localStorage.getItem('authHeader')},
        // dataType: 'json',
        success: function () {
            location.replace("http://127.0.0.1:8000/FrontEnd/Elementos/EditPersona.html?userId=" +userId+ "&idPersona=" + idPersona);
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