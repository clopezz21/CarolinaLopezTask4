import { cardTemplate } from "../templates/cardTemplate.js";
import { filterTemplate } from "../templates/filterTemplate.js";

const API_URL = "https://amazing-events.herokuapp.com/api/events";
const $ = (element) => document.getElementById(element);

async function readApi(url) {
  try {
    const response = await fetch(url);
    if (response.status === 200) {
      return await response.json();
    }
  } catch (error) {
    console.error(error);
  }
}

async function generateEventCards(filters = []) {
  const json = await readApi(API_URL);
  const container = $("container-cards");

  // limpio el contendio anterior
  container.innerHTML = ``;

  // si no hay ningún filtro, imprimir todos los eventos
  if (filters.length === 0) {
    json.events.forEach((event) => {
      container.innerHTML += cardTemplate(event);
    });
  }

  // si el filtro no esta vacio, imprimir los eventos con dicho filtro
  if (filters.length > 0) {
    json.events.forEach((event) => {
      filters.forEach((filter) => {
        if (event.category === filter) {
          container.innerHTML += cardTemplate(event);
        }
      });
    });
  }
}

async function uniqueCategories() {
  const json = await readApi(API_URL);
  const categories = [];

  // si la categoria no existe, se añade al array
  json.events.forEach((event) => {
    if (!categories.includes(event.category)) {
      categories.push(event.category);
    }
  });

  return categories;
}

async function generateFilterOptions() {
  const categories = await uniqueCategories();
  const container = $("container-categories");

  // imprimir el boton para filtrar
  categories.forEach((category) => {
    container.innerHTML += filterTemplate(category);
  });
}

// array donde guardo las categorias por las que quiero filtrar
const filterCheckedOptions = [];

// capturo el click del usuario
$("container-categories").addEventListener("click", async function (e) {
  // comprobar el valor de la captura
  if (e.target.value !== undefined) {
    // si el boton no estaba checkeado, lo añado al array
    if (e.target.checked) {
      filterCheckedOptions.push(e.target.value);
    }

    // si el boton ya estaba checkeado, elimino el valor del array
    if (!e.target.checked) {
      const index = filterCheckedOptions.indexOf(e.target.value);
      filterCheckedOptions.splice(index, 1);
    }
  }

  generateEventCards(filterCheckedOptions);
});

$("searchbox").addEventListener("keyup", () => {
  const input = $("searchbox");
  const filter = input.value.toUpperCase();
  const cardContainer = $("container-cards");
  const cards = cardContainer.getElementsByClassName("card");

  for (const card of cards) {
    const title = card.querySelector("h3.card-title");

    if (title.innerHTML.toUpperCase().indexOf(filter) > -1) {
      card.parentElement.style.display = "";
    } else {
      card.parentElement.style.display = "none";
    }
  }
});

// nada mas cargar la pagina genero el contenido dinamicamente
document.addEventListener("DOMContentLoaded", function () {
  generateEventCards();
  generateFilterOptions();
});
