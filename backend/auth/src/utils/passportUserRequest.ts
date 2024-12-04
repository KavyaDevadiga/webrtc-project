import { passportUserInterface } from "@src/interfaces";

export const isPassportUserInterface = (
  request: any
): request is passportUserInterface.PassportUserInterface =>
  (request as passportUserInterface.PassportUserInterface).user !== undefined;
