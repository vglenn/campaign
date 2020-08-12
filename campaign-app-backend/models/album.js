const db = require("../util/database");

module.exports = class Album {
  constructor(id, albumTitle, albumArtist, albumGenre, yearReleased) {
    this.id = id;
    this.albumTitle = albumTitle;
    this.albumArtist = albumArtist;
    this.albumGenre = albumGenre;
    this.yearReleased = yearReleased;
  }

  save() {
    return db.execute(
      "INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)",
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  static deleteById(id) {}

  static fetchAll() {
    return db.execute("SELECT * FROM album_of_the_year");
  }

  static findByYear(year) {
    debugger;
    return db.execute(
      "SELECT * FROM album_of_the_year WHERE year_released = ?",
      [year]
    );
  }
};
