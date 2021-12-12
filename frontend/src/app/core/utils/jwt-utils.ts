import { JWTContent } from "src/app/models/user.model";

//Function to get JWTContent from JWTToken
export function parseJWT(token: string): JWTContent {
  if (token === null) {
    return null;
  } else {
    let jwtData = token.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData: JWTContent = JSON.parse(decodedJwtJsonData);
    return decodedJwtData;
  }
}

export function isTokenExpired(token: string): boolean {
  let decodedJwtData: JWTContent = parseJWT(token);
  if (decodedJwtData === null) {
    return true;
  } else {
    let date = new Date(0);
    date.setUTCSeconds(decodedJwtData.exp);
    let now = new Date();
    return now.valueOf() > date.valueOf();
  }
}
