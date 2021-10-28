import * as echoModel from '../models/echo'

export function saveEcho(message: any, callback: (arg0: Error | null, arg1: { message: any } | null) => any) {
  echoModel.createEchoLog(message, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
}
export function listEchos(containsString: any, callback: (arg0: Error | null, arg1: any) => void) {
  echoModel.queryEchos(containsString, (err: Error | null, data: any) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
}
