let userId = null
let entidadId = null
let userRole = null

function CargaDetails(){
    //Recuperamos los datos del querystring del URL
    const urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('userId');
    entidadId = urlParams.get('idEntidad');

    CargaInfoUsuario();
    DetallesEntidad();
    ProductosEntidad();
    PersonasEntidad();
}

function DetallesEntidad(){
    $.ajax({
        type: "GET",
        url: '/api/v1/entities/' + entidadId ,
        headers: {"Authorization": localStorage.getItem('authHeader')},
        // dataType: 'json',
        success: function (data) {
 
            let h2 = document.createElement("h2");
            let text_h2 = document.createTextNode(data.entity.name);
            h2.appendChild(text_h2);
            h2.style.color = "black";
            h2.style.fontSize = "30px";
            document.getElementById("div_informacion").appendChild(h2);

            let h4_1 = document.createElement("h4");
            let text_h4_1 = document.createTextNode("Birth Date = " +data.entity.birthDate);
            h4_1.appendChild(text_h4_1);
            document.getElementById("div_informacion").appendChild(h4_1);

            let h4_2 = document.createElement("h4");
            let text_h4_2 = document.createTextNode("Death Date = " +data.entity.deathDate);
            h4_2.appendChild(text_h4_2);
            document.getElementById("div_informacion").appendChild(h4_2);

            let image = document.createElement("img");
            image.src = data.entity.imageUrl;
            image.style.width = "450";
            image.style.height = "450";
            image.alt = name;
            document.getElementById("div_informacion").appendChild(image);

            let iframe = document.createElement("iframe");
            iframe.src = data.entity.wikiUrl;
            iframe.title = "Wiki " +data.entity.name;
            iframe.width = "600";
            iframe.height = "600";
            document.getElementById("div_wiki").appendChild(iframe);
        }
    });
}

function ProductosEntidad(){
    let titulo = document.createElement("h3");
    let text_titulo = document.createTextNode("Productos relacionados");
    titulo.appendChild(text_titulo);
    document.getElementById("div_productos").appendChild(titulo);

    $.ajax({
        type: "GET",
        url: '/api/v1/entities/' + entidadId + "/products",
        headers: {"Authorization": localStorage.getItem('authHeader')},
        // dataType: 'json',
        success: function (data) {
            let i = 0
            while (i < data.products.length) {
                let p = document.createElement("p");
                let text = document.createTextNode(data.products[i].product.name);
                let image = document.createElement("img");

                let detailsButton = document.createElement("button");
                detailsButton.name = "View";
                detailsButton.textContent = "View";
                detailsButton.setAttribute("onclick", "DetailsProducto("+data.products[i].product.id+")")

                image.src=data.products[i].product.imageUrl;
                image.className="imageProducto"

                p.appendChild(image);
                p.appendChild(text);
                p.appendChild(detailsButton);

                document.getElementById("div_productos").appendChild(p);
                i += 1;
            }
        }
    });
}

function DetailsProducto(id){
    location.replace("http://127.0.0.1:8000/FrontEnd/Elementos/DetallesProductos.html?userId="+ userId + "&idProducto=" + id);
}

function PersonasEntidad(){
    let titulo = document.createElement("h3");
    let text_titulo = document.createTextNode("Personas relacionadas");
    titulo.appendChild(text_titulo);
    document.getElementById("div_personas").appendChild(titulo);

    $.ajax({
        type: "GET",
        url: '/api/v1/entities/' + entidadId + "/persons",
        headers: {"Authorization": localStorage.getItem('authHeader')},
        // dataType: 'json',
        success: function (data) {
            let i = 0
            while (i < data.persons.length) {
                let p = document.createElement("p");
                let text = document.createTextNode(data.persons[i].person.name);
                let image = document.createElement("img");

                let detailsButton = document.createElement("button");
                detailsButton.name = "View";
                detailsButton.textContent = "View";
                detailsButton.setAttribute("onclick", "DetailsPersona("+data.persons[i].person.id+")")

                image.src=data.persons[i].person.imageUrl;
                image.className="imagePersona"

                p.appendChild(image);
                p.appendChild(text);
                p.appendChild(detailsButton);

                document.getElementById("div_personas").appendChild(p);
                i += 1;
            }
        }
    });
}

function DetailsPersona(id){
    location.replace("http://127.0.0.1:8000/FrontEnd/Elementos/DetallesPersonas.html?userId="+ userId + "&idPersona=" + id);
}

function CargaInfoUsuario(){
    $.ajax({
        type: "GET",
        url: '/api/v1/users/' + userId,
        headers: {"Authorization": localStorage.getItem('authHeader')},
        // dataType: 'json',
        success: function (data) {
            userRole = data.user.role;
            console.log(userRole);
            let p = document.createElement("p");
            document.getElementById("div_info_usuario").appendChild(p);
        }
    });
}

function Volver() {
    var previousPage = document.referrer;
    
    if (previousPage) {
      // If there is a previous page, go back to it
      location.href = previousPage;
    } else {
      // If there is no previous page, redirect to a default page
      location.replace("http://127.0.0.1:8000/FrontEnd/Portada.html");
    }
}