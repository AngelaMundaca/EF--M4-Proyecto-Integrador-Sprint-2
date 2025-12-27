const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("results");

// DICCIONARIO ESPAÑOL - INGLÉS//
const diccionarioIngredientes = {
  // Carnes
  pollo: "chicken",
  carne: "beef",
  vacuno: "beef",
  cerdo: "pork",
  longaniza: "sausage",

  // Mariscos
  almejas: "clams",
  almeja: "clams",
  mejillones: "mussels",
  mejillon: "mussels",

  // Verduras y legumbres
  cebolla: "onion",
  ajo: "garlic",
  papa: "potato",
  papas: "potato",
  patata: "potato",
  zanahoria: "carrot",
  zapallo: "pumpkin",
  tomate: "tomato",
  choclo: "corn",
  maiz: "corn",
  arvejas: "peas",
  porotos: "beans",
  repollo: "cabbage",

  // Granos y harinas
  arroz: "rice",
  harina: "flour",
  masa: "dough",

  // Lácteos y huevos
  huevo: "egg",
  huevos: "egg",
  leche: "milk",
  mantequilla: "butter",
  queso: "cheese",

  // Otros
  aceite: "oil",
  aceituna: "olives",
  pasas: "raisins",
  azucar: "sugar",
  albahaca: "basil",
  cilantro: "coriander",
  comino: "cumin",
  aji: "chili",
  ají: "chili"
};

// FUNCIÓN DE TRADUCCIÓN // 
const traducirIngrediente = (ingrediente) => {
  const palabra = ingrediente.toLowerCase().trim();
  return diccionarioIngredientes[palabra] || palabra;
};

// CLASE RECETA // 
class Receta {
  constructor({ idMeal, strMeal, strMealThumb }) {
    this.id = idMeal;
    this.nombre = strMeal;
    this.imagen = strMealThumb;
  }
}

// EVENTO FORMULARIO // 
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const ingredienteUsuario = searchInput.value.trim();

  if (ingredienteUsuario === "") {
    mostrarMensaje("Por favor ingresa un ingrediente.");
    return;
  }

  // Traducción antes de llamar a la API
  const ingredienteAPI = traducirIngrediente(ingredienteUsuario);

  buscarRecetas(ingredienteAPI);
});

// FUNCIÓN ASÍNCRONA PARA BUSCAR RECETAS // 
const buscarRecetas = async (ingrediente) => {
  limpiarResultados();

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`
    );

    const data = await response.json();

    if (!data.meals) {
      mostrarMensaje(
        "Lo sentimos, no se encontraron recetas. Intenta con otro ingrediente."
      );
      return;
    }

    renderizarRecetas(data.meals);

  } catch (error) {
    mostrarMensaje("Ocurrió un error al conectar con la API.");
    console.error(error);
  }
};

// RENDERIZADO DE RECETAS // 
const renderizarRecetas = (recetas) => {
  recetas.forEach((item) => {
    const receta = new Receta(item);

    const col = document.createElement("div");
    col.className = "col-lg-4 col-md-6";

    col.innerHTML = `
      <div class="card h-100">
        <img src="${receta.imagen}" class="card-img-top" alt="${receta.nombre}">
        <div class="card-body">
          <h5 class="card-title">${receta.nombre}</h5>
          <a href="#" class="btn btn-primary">Ver receta</a>
        </div>
      </div>
    `;

    resultsContainer.appendChild(col);
  });
};

// LIMPIAR RESULTADOS // 
const limpiarResultados = () => {
  resultsContainer.innerHTML = "";
};

// MOSTRAR MENSAJES // 
const mostrarMensaje = (mensaje) => {
  resultsContainer.innerHTML = `
    <div class="col-12">
      <p class="text-center">${mensaje}</p>
    </div>
  `;
};