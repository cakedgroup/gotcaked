import { JWTContent } from "src/app/models/user.model";

//Function to get JWTContent from JWTToken
export function parseJWT(token: string): JWTContent {
  if (token === null) {
    return null;
  } else {
    let jwt = token;
    let jwtData = jwt.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData: JWTContent = JSON.parse(decodedJwtJsonData);
    return decodedJwtData;
  }
}
