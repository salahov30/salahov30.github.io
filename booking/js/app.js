const createElement = (tag, props, ...children) => {
  const element = document.createElement(tag);

  Object.keys(props).forEach(key => {
    if (key.startsWith("data-")) {
      element.setAttribute(key, props[key]);
    } else {
      element[key] = props[key];
    }
  });

  children.forEach(child => {
    if (typeof child === "string") {
      child = document.createTextNode(child);
    }
    element.appendChild(child);
  });

  return element;
};

class Places {
  constructor(price, quantity, max) {
    this.selectPlaces = [];
    this.pricePlace = price;
    this.quantityPlace = quantity;
    this.maxQuantitySelectPlaces = max;
  }

  draw() {
    const placeList = document.querySelector(".places-container");
    for (let i = 1; i < this.quantityPlace + 1; i++) {
      const placeItem = createElement(
        "button",
        { className: "place-item" },
        `${i}`
      );
      placeList.appendChild(placeItem);
    }
  }

  select() {
    const placeItem = document.querySelectorAll(".place-item");
    const palcesQuantity = document.querySelector(".places-quantity");
    const totalPrice = document.querySelector(".places-price");
    const priceTicket = document.querySelector(".price-ticket");

    palcesQuantity.style.display = "none";
    totalPrice.style.display = "none";
    priceTicket.innerHTML = `Цена билета ${this.pricePlace} р.`;

    const onClick = item => {
      palcesQuantity.style.display = "block";
      totalPrice.style.display = "block";
      if (this.selectPlaces.length < this.maxQuantitySelectPlaces) {
        if (item.className === "place-item") {
          item.classList.add("select");
          this.selectPlaces.push(item);
        } else {
          item.classList.remove("select");
          let index = this.selectPlaces.indexOf(item);
          this.selectPlaces.splice(index, 1);
        }

        const amount = this.selectPlaces.length * this.pricePlace;

        palcesQuantity.innerHTML = `Выбранно мест: ${this.selectPlaces.length}`;
        totalPrice.innerHTML = `Итог: ${amount} р.`;
      } else {
        alert("Выбрано максимальное количество мест");
      }
    };

    placeItem.forEach(item => {
      item.addEventListener(
        "click",
        () => {
          onClick(item);
        },
        false
      );
    });
  }
}

const places = new Places(120, 46, 6);
places.draw();
places.select();
