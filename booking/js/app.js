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
    this.price = 100;
    this.places = [];
    this.placeNums = [];
  }

  draw() {
    const placeList = document.querySelector(".places-container");
    for (let i = 1; i < 45; i++) {
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
      this.placeNums.push(el.firstChild.data);

      const price = document.querySelector(".places-price");
      const palces = document.querySelector(".places-quantity");
      const placeNum = document.querySelector(".places-number");
      const sum = this.places.length * this.price;

      price.innerHTML = `Стоимость: ${sum} рублей`;
      placeNum.innerHTML = `Место: ${this.placeNums}`;
      palces.innerHTML = `Количество выбранных мест: ${this.places.length}`;
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
