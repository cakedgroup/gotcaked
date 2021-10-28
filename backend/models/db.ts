import Datastore from 'nedb';
export const echo = new Datastore({ filename: './databases/echo.db', autoload: true });
