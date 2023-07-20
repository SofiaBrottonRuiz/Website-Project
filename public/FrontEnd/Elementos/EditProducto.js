let userId = null
let idProducto = null
let etagString = null

function Carga(){
    //Recuperamos los datos del querystring del URL
    const urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('userId');
    idProducto = urlParams.get('idProducto');

    CargaInfoUsuario()
    getEtag();
    RellenarForm();
    RelacionesConPersonas();
    RelacionesConEntidades();
    PersonasDisponibles();
    EntidadesDisponibles();
}

function EditProduct() {
    let producto = {};

    rellenarProducto();

    function rellenarProducto() {
        producto = {
            name: $("#NombreProducto").val(),
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
            url: '/api/v1/products/' + idProducto,
            headers: {"Authorization": localStorage.getItem('authHeader') , "if-Match": parsedEtag},
            data: producto,
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
    request.open("GET", "http://127.0.0.1:8000/api/v1/products/" + idProducto, true);
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
        url: '/api/v1/products/'+idProducto,
        headers: {"Authorization": localStorage.getItem('authHeader')},
        // dataType: 'json',
        success: function (data) {
            $("#NombreProducto").val(data.product.name);
            $("#BirthDate").val(data.product.birthDate)
            $("#DeathDate").val(data.product.deathDate)
            $("#ImageUrl").val(data.product.imageUrl)
            $("#WikiUrl").val(data.product.wikiUrl)
        }
    })
}

function RelacionesConPersonas(){
    $.ajax({
        type: "GET",
        url: '/api/v1/products/' + idProducto + "/persons",
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

                document.getElementById("relaciones_personas").appendChild(p);
                i += 1;
            }
        }
    });
}

function DeleteRelacionPersona(id){
    $.ajax({
        type: "PUT",
        url: '/api/v1/products/' + idProducto + "/persons/rem/" + id,
        headers: {"Authorization": localStorage.getItem('authHeader')},
        // dataType: 'json',
        success: function (data) {
            location.replace("http://127.0.0.1:8000/FrontEnd/Elementos/EditProducto.html?userId=" +userId+ "&idProducto=" + idProducto);
        }
    });
}

function RelacionesConEntidades(){
    $.ajax({
        type: "GET",
        url: '/api/v1/products/' + idProducto + "/entities",
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
        url: '/api/v1/products/' + idProducto + "/entities/rem/" + id,
        headers: {"Authorization": localStorage.getItem('authHeader')},
        // dataType: 'json',
        success: function (data) {
            location.replace("http://127.0.0.1:8000/FrontEnd/Elementos/EditProducto.html?userId=" +userId+ "&idProducto=" + idProducto);
        }
    });
}

function PersonasDisponibles(){
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

function EntidadesDisponibles(){
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

function CrearRelacionPersona(){
    let idPersona = $("#NuevaRelacionPersona").val();

    $.ajax({
        type: "PUT",
        url: '/api/v1/products/' + idProducto + "/persons/add/" + idPersona,
        headers: {"Authorization": localStorage.getItem('authHeader')},
        // dataType: 'json',
        success: function () {
            location.replace("http://127.0.0.1:8000/FrontEnd/Elementos/EditProducto.html?userId=" +userId+ "&idProducto=" + idProducto);
        }
    });
}

function CrearRelacionEntidad(){
    let idEntidad = $("#NuevaRelacionEntidad").val();

    $.ajax({
        type: "PUT",
        url: '/api/v1/products/' + idProducto + "/entities/add/" + idEntidad,
        headers: {"Authorization": localStorage.getItem('authHeader')},
        // dataType: 'json',
        success: function () {
            location.replace("http://127.0.0.1:8000/FrontEnd/Elementos/EditProducto.html?userId=" +userId+ "&idProducto=" + idProducto);
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
