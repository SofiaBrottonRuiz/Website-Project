

//FUNCIONES DE INDEXREADER  

let userId = null

function CargaDatosR(){
    //Recuperamos los datos del querystring del URL para poder hacer las operaciones
    const urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('userId');

    CargaProductosR();
    CargaPersonasR();
    CargaEntidadesR();
    CargaInfoUsuario();
}

function CargaProductosR(){
    //Hacemos una peticion GET a la ruta de los productos y trabajamos insertando en el DOM los elementos
    $.ajax({
        type: "GET",
        url: '/api/v1/products',
        headers: {"Authorization": localStorage.getItem('authHeader')},
        // dataType: 'json',
        success: function (data) {
            console.log(data);
            let i = 0
            while (i < data.products.length){
                let producto = {
                    id: data.products[i].product.id,
                    name: data.products[i].product.name,
                    birthDate: data.products[i].product.birthDate,
                    deathDate: data.products[i].product.deathDate,
                    imageUrl: data.products[i].product.imageUrl,
                    wikiUrl: data.products[i].product.wikiUrl,
                    entities: data.products[i].product.entities,
                    persons: data.products[i].product.persons
                };
                MostrarProductoR(producto);
                i += 1;
            }
        }
    })
}

function MostrarProductoR(item){
    let p = document.createElement("p");
    let text = document.createTextNode(item.name);
    let image = document.createElement("img");

    let detailsButton = document.createElement("button");
    detailsButton.name = "View";
    detailsButton.textContent = "View";
    detailsButton.setAttribute("onclick", "DetailsProductoR(\""+item.id+"\")")
    detailsButton.style.margin = "0 3px";

    image.src=item.imageUrl;
    image.className="imageProducto"

    p.appendChild(image);
    p.appendChild(text);
    p.appendChild(detailsButton);

    let producto = document.createElement("div");
    producto.className="producto";
    producto.id="producto-"+item.name;
    producto.appendChild(p);
    document.getElementById("div_productos").appendChild(producto);
}

function CargaPersonasR(){
    //Hacemos una peticion GET a la ruta de los personas y trabajamos insertando en el DOM los elementos
    $.ajax({
        type: "GET",
        url: '/api/v1/persons',
        headers: {"Authorization": localStorage.getItem('authHeader')},
        // dataType: 'json',
        success: function (data) {
            let i = 0
            while (i < data.persons.length) {
                let person = {
                    id: data.persons[i].person.id,
                    name: data.persons[i].person.name,
                    birthDate: data.persons[i].person.birthDate,
                    deathDate: data.persons[i].person.deathDate,
                    imageUrl: data.persons[i].person.imageUrl,
                    wikiUrl: data.persons[i].person.wikiUrl,
                    entities: data.persons[i].person.entities,
                    products: data.persons[i].person.products
                };
                MostrarPersonaR(person);
                i += 1;
            }
        }
    })
}

function MostrarPersonaR(item){
    let p = document.createElement("p");
    let text = document.createTextNode(item.name);
    let image = document.createElement("img");

    let detailsButton = document.createElement("button");
    detailsButton.name = "View";
    detailsButton.textContent = "View";
    detailsButton.setAttribute("onclick", "DetailsPersonaR(\""+item.id+"\")")
    detailsButton.style.margin = "0 3px";

    image.src=item.imageUrl;
    image.className="imagePersona"

    p.appendChild(image);
    p.appendChild(text);
    p.appendChild(detailsButton);

    let persona = document.createElement("div");
    persona.className="persona";
    persona.id="persona-"+item.name;
    persona.appendChild(p);
    document.getElementById("div_personas").appendChild(persona);
}

function CargaEntidadesR(){
    //Hacemos una peticion GET a la ruta de los entidades y trabajamos insertando en el DOM los elementos
    $.ajax({
        type: "GET",
        url: '/api/v1/entities',
        headers: {"Authorization": localStorage.getItem('authHeader')},
        // dataType: 'json',
        success: function (data) {
            let i = 0
            while (i < data.entities.length) {
                let entity = {
                    id: data.entities[i].entity.id,
                    name: data.entities[i].entity.name,
                    birthDate: data.entities[i].entity.birthDate,
                    deathDate: data.entities[i].entity.deathDate,
                    imageUrl: data.entities[i].entity.imageUrl,
                    wikiUrl: data.entities[i].entity.wikiUrl,
                    persons: data.entities[i].entity.persons,
                    products: data.entities[i].entity.products
                };
                MostrarEntidadR(entity);
                i += 1;
            }
        }
    })
}

function MostrarEntidadR(item){
    let p = document.createElement("p");
    let text = document.createTextNode(item.name);
    let image = document.createElement("img");


    let detailsButton = document.createElement("button");
    detailsButton.name = "View";
    detailsButton.textContent = "View";
    detailsButton.setAttribute("onclick", "DetailsEntidadR(\""+item.id+"\")");
    detailsButton.style.margin = "0 3px";

    image.src=item.imageUrl;
    image.className="imageEntidad";

    p.appendChild(image);
    p.appendChild(text);
    p.appendChild(detailsButton);

    let entidad = document.createElement("div");
    entidad.className="entidad";
    entidad.id="entidad-"+item.name;
    entidad.appendChild(p);
    document.getElementById("div_entidades").appendChild(entidad);
}

function CargaInfoUsuario(){
    $.ajax({
        type: "GET",
        url: '/api/v1/users/' + userId,
        headers: {"Authorization": localStorage.getItem('authHeader')},
     // dataType: 'json',
        success: function (data) {
            let p = document.createElement("p");
            let text = document.createTextNode("User: " +data.user.username+ " - Role: " +data.user.role);
            p.appendChild(text);
            document.getElementById("div_info_usuario").appendChild(p);
        }
    });
}



//Funciones de los botones de details

function DetailsProductoR(idProducto){
    location.replace("http://127.0.0.1:8000/FrontEnd/Elementos/DetallesProductos.html?idProducto=" +idProducto+ "&userId=" +userId);
}

function DetailsPersonaR(idPersona){
    location.replace("http://127.0.0.1:8000/FrontEnd/Elementos/DetallesPersonas.html?idPersona=" +idPersona+ "&userId=" +userId);
}

function DetailsEntidadR(idEntidad){
    location.replace("http://127.0.0.1:8000/FrontEnd/Elementos/DetallesEntidades.html?idEntidad=" +idEntidad+ "&userId=" +userId);
}



//-------------------------------------------------------------------------------------------------------
//FUNCIONES DE INDEXWRITER

function CargaDatos(){
    //Recuperamos los datos del querystring del URL para poder hacer las operaciones
    const urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('userId');

    CargaInfoUsuario();
    CargaProductos();
    CargaPersonas();
    CargaEntidades();
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


function CargaProductos(){
    //Hacemos una peticion GET a la ruta de los productos y trabajamos insertando en el DOM los elementos
    $.ajax({
        type: "GET",
        url: '/api/v1/products',
        headers: {"Authorization": localStorage.getItem('authHeader')},
        // dataType: 'json',
        success: function (data) {
            let i = 0
            while (i < data.products.length){
                let producto = {
                    id: data.products[i].product.id,
                    name: data.products[i].product.name,
                    birthDate: data.products[i].product.birthDate,
                    deathDate: data.products[i].product.deathDate,
                    imageUrl: data.products[i].product.imageUrl,
                    wikiUrl: data.products[i].product.wikiUrl,
                    entities: data.products[i].product.entities,
                    persons: data.products[i].product.persons
                };
                MostrarProducto(producto);
                i += 1;
            }
        }
    });
}

function MostrarProducto(item){
    let p = document.createElement("p");
    let text = document.createTextNode(item.name);
    let image = document.createElement("img");

    let deleteButton = document.createElement("button");
    deleteButton.name = "Delete";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("onclick", "DeleteProducto("+item.id+")")
    deleteButton.style.margin = "0 3px";

    let editButton = document.createElement("button");
    editButton.name = "Edit";
    editButton.textContent = "Edit";
    editButton.setAttribute("onclick", "EditProducto("+item.id+")")
    editButton.style.margin = "0 3px";

    let detailsButton = document.createElement("button");
    detailsButton.name = "View";
    detailsButton.textContent = "View";
    detailsButton.setAttribute("onclick", "DetailsProducto("+item.id+")")
    detailsButton.style.margin = "0 3px";

    image.src=item.imageUrl;
    image.className="imageProducto"

    p.appendChild(image);
    p.appendChild(text);
    p.appendChild(detailsButton);
    p.appendChild(editButton);
    p.appendChild(deleteButton);

    let producto = document.createElement("div");
    producto.className="producto";
    producto.id="producto-"+item.name;
    producto.appendChild(p);
    document.getElementById("div_productos").appendChild(producto);
}

function CargaPersonas(){
    //Hacemos una peticion GET a la ruta de los personas y trabajamos insertando en el DOM los elementos
    $.ajax({
        type: "GET",
        url: '/api/v1/persons',
        headers: {"Authorization": localStorage.getItem('authHeader')},
        // dataType: 'json',
        success: function (data) {
            let i = 0
            while (i < data.persons.length) {
                let person = {
                    id: data.persons[i].person.id,
                    name: data.persons[i].person.name,
                    birthDate: data.persons[i].person.birthDate,
                    deathDate: data.persons[i].person.deathDate,
                    imageUrl: data.persons[i].person.imageUrl,
                    wikiUrl: data.persons[i].person.wikiUrl,
                    entities: data.persons[i].person.entities,
                    products: data.persons[i].person.products
                };
                MostrarPersona(person);
                i += 1;
            }
        }
    })
}

function MostrarPersona(item){
    let p = document.createElement("p");
    let text = document.createTextNode(item.name);
    let image = document.createElement("img");

    let deleteButton = document.createElement("button");
    deleteButton.name = "Delete";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("onclick", "DeletePersona("+item.id+")")
    deleteButton.style.margin = "0 3px";

    let editButton = document.createElement("button");
    editButton.name = "Edit";
    editButton.textContent = "Edit";
    editButton.setAttribute("onclick", "EditPersona("+item.id+")")
    editButton.style.margin = "0 3px";

    let detailsButton = document.createElement("button");
    detailsButton.name = "View";
    detailsButton.textContent = "View";
    detailsButton.setAttribute("onclick", "DetailsPersona("+item.id+")")
    detailsButton.style.margin = "0 3px";

    image.src=item.imageUrl;
    image.className="imagePersona"

    p.appendChild(image);
    p.appendChild(text);
    p.appendChild(detailsButton);
    p.appendChild(editButton);
    p.appendChild(deleteButton);

    let persona = document.createElement("div");
    persona.className="persona";
    persona.id="persona-"+item.name;
    persona.appendChild(p);
    document.getElementById("div_personas").appendChild(persona);
}

function CargaEntidades(){
    //Hacemos una peticion GET a la ruta de los entidades y trabajamos insertando en el DOM los elementos
    $.ajax({
        type: "GET",
        url: '/api/v1/entities',
        headers: {"Authorization": localStorage.getItem('authHeader')},
        // dataType: 'json',
        success: function (data) {
            let i = 0
            while (i < data.entities.length) {
                let entity = {
                    id: data.entities[i].entity.id,
                    name: data.entities[i].entity.name,
                    birthDate: data.entities[i].entity.birthDate,
                    deathDate: data.entities[i].entity.deathDate,
                    imageUrl: data.entities[i].entity.imageUrl,
                    wikiUrl: data.entities[i].entity.wikiUrl,
                    persons: data.entities[i].entity.persons,
                    products: data.entities[i].entity.products
                };
                MostrarEntidad(entity);
                i += 1;
            }
        }
    })
}

function MostrarEntidad(item){
    let p = document.createElement("p");
    let text = document.createTextNode(item.name);
    let image = document.createElement("img");

    let deleteButton = document.createElement("button");
    deleteButton.name = "Delete";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("onclick", "DeleteEntidad("+item.id+")")
    deleteButton.style.margin = "0 3px";


    let editButton = document.createElement("button");
    editButton.name = "Edit";
    editButton.textContent = "Edit";
    editButton.setAttribute("onclick", "EditEntidad("+item.id+")")
    editButton.style.margin = "0 3px";

    let detailsButton = document.createElement("button");
    detailsButton.name = "View";
    detailsButton.textContent = "View";
    detailsButton.setAttribute("onclick", "DetailsEntidad("+item.id+")")
    detailsButton.style.margin = "0 3px";

    image.src=item.imageUrl;
    image.className="imageEntidad"

    p.appendChild(image);
    p.appendChild(text);
    p.appendChild(detailsButton);
    p.appendChild(editButton);
    p.appendChild(deleteButton);

    let entidad = document.createElement("div");
    entidad.className="entidad";
    entidad.id="entidad-"+item.name;
    entidad.appendChild(p);
    document.getElementById("div_entidades").appendChild(entidad);
}

//Funciones de los botones de details

function DetailsProducto(idProducto){
    location.replace("http://127.0.0.1:8000/FrontEnd/Elementos/DetallesProductos.html?idProducto=" +idProducto+ "&userId=" +userId);
}

function DetailsPersona(idPersona){
    location.replace("http://127.0.0.1:8000/FrontEnd/Elementos/DetallesPersonas.html?idPersona=" +idPersona+ "&userId=" +userId);
}

function DetailsEntidad(idEntidad){
    location.replace("http://127.0.0.1:8000/FrontEnd/Elementos/DetallesEntidades.html?idEntidad=" +idEntidad+ "&userId=" +userId);
}


//Funciones de los botones crear

function CreateProducto(){
    location.replace("http://127.0.0.1:8000/FrontEnd/Elementos/CrearProducto.html?userId="+userId);
}

function CreatePersona(){
    location.replace("http://127.0.0.1:8000/FrontEnd/Elementos/CrearPersona.html?userId="+userId);
}

function CreateEntidad(){
    location.replace("http://127.0.0.1:8000/FrontEnd/Elementos/CrearEntidad.html?userId="+userId);
}

//Funciones de los botones delete


function DeletePersona(personaId){
    if(!personaId){
        alert("Por favor, ingresa el ID de la persona.");
        return;
    }

    $.ajax({
        type: "DELETE",
        url: `/api/v1/persons/${personaId}`,
        headers: {"Authorization": localStorage.getItem('authHeader')},
        success: function (data) {
            console.log(data);
            alert("La persona ha sido eliminada exitosamente.");
            ClearFormPersona();
            location.replace("http://127.0.0.1:8000/FrontEnd/Writer/IndexWriter.html?userId="+userId);
        },
        error: function (xhr, status, error) {
            console.error(xhr.responseText);
            alert("Ha ocurrido un problema al eliminar la persona.");
        }
    });
}

function DeleteProducto(productoId){
    if(!productoId){
        alert("Por favor, ingresa el ID del producto.");
        return;
    }

    $.ajax({
        type: "DELETE",
        url: `/api/v1/products/${productoId}`,
        headers: {"Authorization": localStorage.getItem('authHeader')},
        success: function (data) {
            console.log(data);
            alert("El producto ha sido eliminado exitosamente.");
            ClearFormProducto();
            location.replace("http://127.0.0.1:8000/FrontEnd/Writer/IndexWriter.html?userId="+userId);
        },
        error: function (xhr, status, error) {
            console.error(xhr.responseText);
            alert("Ha ocurrido un problema al eliminar el producto.");
        }
    });
}


function DeleteEntidad(entidadId){
    if(!entidadId){
        alert("Por favor, ingresa el ID de la entidad.");
        return;
    }

    $.ajax({
        type: "DELETE",
        url: `/api/v1/entities/${entidadId}`,
        headers: {"Authorization": localStorage.getItem('authHeader')},
        success: function (data) {
            console.log(data);
            alert("La entidad ha sido eliminada exitosamente.");
            ClearFormEntidad();
            location.replace("http://127.0.0.1:8000/FrontEnd/Writer/IndexWriter.html?userId="+userId);
        },
        error: function (xhr, status, error) {
            console.error(xhr.responseText);
            alert("Ha ocurrido un problema al eliminar la entidad.");
        }
    });
}

function ClearFormPersona() {
    $("#PersonaId").val("");
}

function ClearFormProducto() {
    $("#ProductoId").val("");
}

function ClearFormEntidad() {
    $("#EntidadId").val("");
}



// // POPUP

// function showPopup(count) {
//   document.getElementById("inactiveCount").textContent = count;
//   document.getElementById("inactiveAccountsPopup").style.display = "block";
// }

// function hidePopup() {
//   document.getElementById("inactiveAccountsPopup").style.display = "none";
// }

// function showInactiveAccountsPopup() {
//     // Make an AJAX request to retrieve the count of inactive accounts
//     $.ajax({
//       url: "/api/v1/users", // Update the endpoint URL if needed
//       type: "GET",
//       success: function(data) {
//         var users = data.users;
  
//         if (Array.isArray(users)) {
//           var inactiveCount = 0;
  
//           // Iterate over the users and count the inactive accounts
//           users.forEach(function(user) {
//             if (!user.isActive || !user.hasIsActive('active')) {
//               inactiveCount++;
//             }
//           });
  
//           // Display the inactive accounts popup with the count
//           showPopup(inactiveCount);
//         } else {
//           console.log("Invalid response structure. Expected 'users' array.");
//         }
//       },
//       error: function(xhr, status, error) {
//         console.log("Error retrieving user data:", error);
//       }
//     });
//   }
  






//Funciones de los botones edit

function EditProducto(id){
    location.replace("http://127.0.0.1:8000/FrontEnd/Elementos/EditProducto.html?userId=" +userId+ "&idProducto=" + id);
}

function EditPersona(id){
    location.replace("http://127.0.0.1:8000/FrontEnd/Elementos/EditPersona.html?userId=" +userId+ "&idPersona=" + id);
}

function EditEntidad(id){
    location.replace("http://127.0.0.1:8000/FrontEnd/Elementos/EditEntidad.html?userId=" +userId+ "&idEntidad=" + id);
}



// LOGIN
function Login() {
    let usernameForm = document.getElementById("username").value;
    let passwordForm = document.getElementById("password").value;
    let xhr = new XMLHttpRequest();
    let loginData = {
        "username": usernameForm,
        "password": passwordForm
    };
    xhr.open("POST", "http://127.0.0.1:8000/access_token", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onload = function() {
        if (xhr.status === 200) {
          
            let authHeader = xhr.getResponseHeader('Authorization');
            access_token = authHeader.split(' ')[1]; // Quitar 'Bearer '
            let data = JSON.parse(atob(access_token.split('.')[1]));
            // meter los datos en username, userId y userRole
            username = data.sub;
            userId = data.uid;
            estado = data.state;
            console.log(userId);
            console.log(username);
            console.log(data);
            console.log(data.state);
            if(data.state == "inactive")
                estado = "inactive";
            else
                estado = "active";
            console.log(data.scopes);
            if(data.scopes.includes("writer"))
                userRole = "writer";
            else
                userRole = "reader";
            console.log(userRole);
            localStorage.setItem('authHeader', authHeader);
            Entrar(userId, estado, userRole);
        } else {
            alert("Error: " + xhr.status);
            start();
        }
    };
    xhr.send(JSON.stringify(loginData));
}

function Entrar(userId, state, userRole) {
    if (state === "active") {
        if (userRole === "writer") {
            // showInactiveAccountsPopup();
            location.replace("http://127.0.0.1:8000/FrontEnd/Writer/IndexWriter.html?userId=" + userId);
        } else {
            location.replace("http://127.0.0.1:8000/FrontEnd/Reader/IndexReader.html?userId=" + userId);
        }
    } else {
        alert("Lo sentimos. Tu cuenta ha sido desactivada temporalmente.");
    }
}





// REGISTER
function GoSignUp(){
    location.replace("http://127.0.0.1:8000/FrontEnd/Register.html");
}

function VolverPortada(){
    location.replace("http://127.0.0.1:8000/FrontEnd/Portada.html");
}

function initialize() {
    const signupForm = document.getElementById("form_signup");
    signupForm.addEventListener("submit", signUpUser);
}

function signUpUser(event) {
    event.preventDefault();

    const username = document.getElementById("NombreUsuario").value;
    const email = document.getElementById("Email").value;
    const password = document.getElementById("Contraseña").value;
    const birthDate = document.getElementById("BirthDate").value;

    const user = {
        username: username,
        email: email,
        password: password,
        birthDate: birthDate
    };

    // Perform an AJAX request to check username availability
    $.ajax({
        type: "GET",
        url: `http://127.0.0.1:8000/api/v1/users/username/${username}`,
        complete: function (xhr) {
            if (xhr.status===404) {
                // Username is available, proceed with signup
                performSignup(user);
                console.log("Llamamos a signup")
            } else {
                // Username already exists, display an error message and refresh the page
                alert("El usuario ya existe.");
                window.location.reload();
            }
        },
       
    });
}

function performSignup(user) {
    // Perform your signup logic here, e.g., make an API call
    // using AJAX to send the data to the server and process the response

    // Example AJAX call using jQuery:
    $.ajax({
        type: "POST",
        url: `http://127.0.0.1:8000/api/v1/users`,
        dataType: 'json',
        data: user,
        success: function (data, status, response) {
            // Handle successful signup, e.g., redirect to a success page
            alert("Registro completado con éxito!");
            window.location.href = "Portada.html";
        },
        error: function (xhr, status, error) {
            // Handle signup error, e.g., display an error message
            alert("Registro falló. Porfavor intentalo de nuevo.");
            console.error(error);
        }
    });
}






// PERFIL
function Perfil(){
    location.replace("http://127.0.0.1:8000/FrontEnd/Writer/PerfilWriter.html?userId=" +userId);
}
function PerfilR(){
    location.replace("http://127.0.0.1:8000/FrontEnd/Reader/PerfilReader.html?userId=" +userId);
}


//GESTION
function Gestion(){
    location.replace("http://127.0.0.1:8000/FrontEnd/Writer/GestionUsuarios.html?userId=" +userId);
}


//LOGOUT

function Logout() {
    event.preventDefault();

    // Clear any user session data or access tokens
    // For example, if you are using localStorage, you can remove the stored data like this:
    localStorage.removeItem("accessToken");

    // Redirect the user to the login page
    window.location.href = "../Portada.html";
}