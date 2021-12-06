import * as sqlite from 'sqlite3';

export const db = new sqlite.Database('./databases/db.sqlite', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to SQlite database.');
        createTables();
    }
});

function createTables() {
    //Create tables
    //Category
    db.run(`CREATE TABLE IF NOT EXISTS category (
        name TEXT PRIMARY KEY,
        description TEXT);`, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Category table created.');
        }
    });
    //Tag
    db.run(`CREATE TABLE IF NOT EXISTS tag (
        name TEXT PRIMARY KEY,
        description TEXT);`, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Tag table created.');
        }
    });
    //User
    db.run(`CREATE TABLE IF NOT EXISTS user (
        id VARCHAR(36) PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        description TEXT,
        picture_uri TEXT,
        email TEXT,
        role TEXT,
        password TEXT);`, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('User table created.');
        }
    });
    //Recipe
    db.run(`CREATE TABLE IF NOT EXISTS recipe (
        id VARCHAR(36) PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        preparation TEXT,
        createdAt DATE,
        difficulty TEXT,
        time NUMBER,
        category_id VARCHAR(36) NOT NULL,
        user_id VARCHAR(36) NOT NULL,
        FOREIGN KEY (category_id) REFERENCES category(id),
        FOREIGN KEY (user_id) REFERENCES user(id));`, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Recipe table created.');
        }
    });
    //RecipePicture
    db.run(`CREATE TABLE IF NOT EXISTS recipe_picture (
        picture_id VARCHAR(36) PRIMARY KEY,
        recipe_id VARCHAR(36) NOT NULL,
        FOREIGN KEY (recipe_id) REFERENCES recipe(id));`, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('RecipePicture table created.');
        }
    });
    //RecipeTag
    db.run(`CREATE TABLE IF NOT EXISTS recipe_tag (
        recipe_id VARCHAR(36) NOT NULL,
        tag_name TEXT NOT NULL,
        FOREIGN KEY (recipe_id) REFERENCES recipe(id),
        FOREIGN KEY (tag_name) REFERENCES tag(name));`, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('RecipeTag table created.');
        }
    });
    //Ingredient
    db.run(`CREATE TABLE IF NOT EXISTS ingredient (
        id VARCHAR(36) PRIMARY KEY,
        name TEXT NOT NULL,
        amount NUMBER,
        unit TEXT,
        recipe_id VARCHAR(36) NOT NULL,
        FOREIGN KEY (recipe_id) REFERENCES recipe(id));`, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Ingredient table created.');
        }
    });
    //Comments
    db.run(`CREATE TABLE IF NOT EXISTS comment (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        recipe_id VARCHAR(36) NOT NULL,
        text TEXT,
        time DATETIME NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user(id),
        FOREIGN KEY (recipe_id) REFERENCES recipe(id));`, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Comment table created.');
        }
    });
    //Rating
    db.run(`CREATE TABLE IF NOT EXISTS rating (
        user_id VARCHAR(36) NOT NULL,
        recipe_id VARCHAR(36) NOT NULL,
        vote NUMBER NOT NULL,
        PRIMARY KEY (user_id, recipe_id),
        FOREIGN KEY (user_id) REFERENCES user(id),
        FOREIGN KEY (recipe_id) REFERENCES recipe(id));`, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Rating table created.');
        }
    });
    //JWT-Blacklist
    db.run(`CREATE TABLE IF NOT EXISTS jwt_blacklist (
        id VARCHAR(36) PRIMARY KEY,
        jwt TEXT NOT NULL);`, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('JWT-Blacklist table created.');
        }
    });
}