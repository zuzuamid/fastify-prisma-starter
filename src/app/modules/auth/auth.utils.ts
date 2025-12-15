import jwt, { JwtPayload, Secret } from "jsonwebtoken";

import { IJwtPayload } from "./auth.interface";

export const createToken = (
  jwtPayload: IJwtPayload,
  secret: Secret,
  expiresIn: string | number | any
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};

// Improvement commit 47

// Improvement commit 146

// Improvement commit 201

// Improvement commit 219
