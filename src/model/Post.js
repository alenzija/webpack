//const str = 'str';

export default class Post {
  constructor(title, img) {
    this.date = new Date();
    this.img = img;
    this.title = title;
  }
  toString() {
    return JSON.stringify({
      date: this.date.toJSON(),
      img: this.img,
      title: this.title,
    });
  }
}
