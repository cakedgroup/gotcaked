import * as db from './db';

export function createEchoLog(msg: any, callback: (arg0: Error | null, arg1: { message: any } | null) => any) {
  const doc: {
    message: any
  } = { message: msg };
  db.echo.insert(doc, (err: Error | null, newDoc: { message: any }) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, newDoc);
    }
  });
}
export function queryEchos(containsString: any, callback: (arg0: Error | null, arg1: any) => void) {
  db.echo.find(containsString ? { message: new RegExp(containsString) } : {}, (err: Error | null, data: any) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
}
