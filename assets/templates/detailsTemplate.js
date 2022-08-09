const detailsTemplate = (event) =>
  `
    <section class="text-center mt-3">
        <article class="details-header cartel">
            <h3 id="title" class="title">${event.name}</h3>
            <h5 id="place" class="place">${event.place}</h5>
            <img id="image" class="bd-placeholder-img bd-placeholder-img-lg img-fluid custom-img"
                alt="event-photo" src="${event.image}">
            <h5 class="date">
                <strong>Date: </strong>
                <span id="date">${event.date}</span>
            </h5>
        </article>
        <article class="details-body">
            <div class="synopsis mt-3">
                <p>
                    <strong>Description: </strong>
                    <span id="description">${event.description}</span>
                </p>
            </div>
            <div class="row data">
                <p class="col">
                    <strong>Capacity: </strong>
                    <span id="capacity">${event.capacity}</span>
                </p>
                <p class="col">
                    <strong>Category: </strong>
                    <span id="category">${event.category}</span>
                </p>
                <p class="col">
                    ${
                      event.assistance
                        ? `<strong>Asisstance:</strong> ${event.assistance}`
                        : `<strong>Estimate:</strong> ${event.estimate}`
                    }
                </p>
                <p class="col">
                    <strong>Price: </strong>
                    <span id="price">${event.price}</span>€
                </p>
            </div>
        </article>
    </section>
  `;

export { detailsTemplate };
