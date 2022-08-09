const filterTemplate = (category) =>
  `
        <div class="form-check form-check-inline">
            <input type="checkbox" value="${category}" id="${category}" class="form-check-input">
            <label for="${category}" class="form-check-label">
                <b>${category}</b>
            </label>
        </div>
    `;

export { filterTemplate };
