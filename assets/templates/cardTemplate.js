const cardTemplate = (event) =>
  `
        <div class="hidde col-md-6 col-lg-4 mb-4">
            <div class="card my-3 h-100">
                <div class="card-thumbnail">
                    <img src="${event.image}" class="img-fluid" alt="thumbnail">
                </div>
                <div class="card-body">
                    <h3 class="card-title">
                        <p class="text-secondary">${event.name}</p>
                    </h3>
                    <p class="card-text">${event.description}</p>
                    <p class="card-price mt-3 fs-5">
                        <strong>Price:</strong>
                        ${event.price} €
                    </p>
                    <a href="details.html">
                        <button class="btn btn-danger" type="submit" name="id" value="${event._id}">Read More</button>
                    </a>
                </div>
            </div>
        </div>
    `;

export { cardTemplate };
