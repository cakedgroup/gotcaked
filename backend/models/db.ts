import * as sqlite from 'sqlite3';



export const db = new sqlite.Database('./databases/db.sqlite', (err) => {
    if (err) {
        console.error(err.message);
    }else {
        console.log('Connected to SQlite database.');
        createTables();
    }
});

function createTables(){
    //Create tables
    //Category
    db.run(`CREATE TABLE IF NOT EXISTS category (
        id VARCHAR(36) PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        description TEXT);`, (err) => {
        if (err) {
            console.error(err.message);
        }else {
            console.log('Category table created.');
        }
    });
    //Tag
    db.run(`CREATE TABLE IF NOT EXISTS tag (
        id VARCHAR(36) PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        description TEXT);`, (err) => {
        if (err) {
            console.error(err.message);
        }else {
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
        password TEXT);`, (err) => {
        if (err) {
            console.error(err.message);
        }else {
            console.log('User table created.');
        }        
    });
    //Recipe
    db.run(`CREATE TABLE IF NOT EXISTS recipe (
        id VARCHAR(36) PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        preparation TEXT,
        category_id VARCHAR(36) NOT NULL,
        user_id VARCHAR(36) NOT NULL,
        FOREIGN KEY (category_id) REFERENCES category(id),
        FOREIGN KEY (user_id) REFERENCES user(id));`, (err) => {
        if (err) {
            console.error(err.message);
        }else {
            console.log('Recipe table created.');
        }        
    });
    //RecipeTag
    db.run(`CREATE TABLE IF NOT EXISTS recipe_tag (
        recipe_id VARCHAR(36) NOT NULL,
        tag_id VARCHAR(36) NOT NULL,
        FOREIGN KEY (recipe_id) REFERENCES recipe(id),
        FOREIGN KEY (tag_id) REFERENCES tag(id));`, (err) => {
        if (err) {
            console.error(err.message);
        }else {
            console.log('RecipeTag table created.');
        }        
    });
    //Comments
    db.run(`CREATE TABLE IF NOT EXISTS comment (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        recipe_id VARCHAR(36) NOT NULL,
        comment TEXT,
        time DATETIME NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user(id),
        FOREIGN KEY (recipe_id) REFERENCES recipe(id));`, (err) => {
        if (err) {
            console.error(err.message);
        }else {
            console.log('Comment table created.');
        }        
    });
}