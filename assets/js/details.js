import { detailsTemplate } from "../templates/detailsTemplate.js";

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

async function printDetails() {
  const json = await readApi(API_URL);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");

  const container = $("container-details");

  json.events.forEach((event) => {
    if (event._id.toString() === id) {
      container.innerHTML = detailsTemplate(event);
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  printDetails();
});
