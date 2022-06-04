export class Product {
  constructor(
    name,
    price,
    screen,
    bCamera,
    fCamera,
    img,
    desc,
    quantity,
    type
  ) {
    this.name = name;
    this.price = price;
    this.screen = screen;
    this.backCamera = bCamera;
    this.frontCamera = fCamera;
    this.img = img;
    this.desc = desc;
    this.quantity = quantity;
    this.type = type;
  }
}
