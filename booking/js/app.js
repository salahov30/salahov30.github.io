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
  constructor() {
    this.price = 120;
    this.places = [];
  }

  draw() {
    const placeList = document.querySelector(".places-row");
    for (let i = 1; i < 41; i++) {
      const placeItem = createElement(
        "button",
        { className: "place-item" },
        `${i}`
      );
      placeList.appendChild(placeItem);
    }
  }

  select() {
    const place = document.querySelectorAll(".place-item");
    const onClick = el => {
      el.disabled = true;
      this.places.push(el);
      const total = document.querySelector(".booking-price");
      const sum = this.places.length * this.price;
      total.innerHTML = `Стоимость: ${sum} рублей`;
    };

    place.forEach(item => {
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
const places = new Places();
places.draw();
places.select();
