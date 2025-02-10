import { passportUserInterface } from "@src/interfaces";

export const isPassportUserInterface = (
  request: any
): request is passportUserInterface.PassportUserInterface => {
  console.log(JSON.stringify(request.user));
  return (
    (request as passportUserInterface.PassportUserInterface).user !== undefined
  );
};
