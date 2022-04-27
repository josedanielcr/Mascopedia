/* Creating a class called post. */
const { v4: uuidv4 } = require('uuid');

const PostModel = class Post {

    id;
    doc;
    authorName;
    authorEmail;
    title; //editar
    text; //editar 
    breed;
    likes;
    breedType;


    constructor(authorName, authorEmail, title, text, breed, breedType) {
        this.id = uuidv4();
        this.doc = "post";
        this.authorName = authorName;
        this.authorEmail = authorEmail;
        this.title = title;
        this.text = text;
        this.breed = breed;
        this.breedType = breedType;


    }

}

module.exports = {
    PostModel
}