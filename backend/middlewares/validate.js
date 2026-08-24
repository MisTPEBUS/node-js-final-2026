import { z } from "zod";

const validate = (schema) => (req, res, next) => {
  try {
    const validated = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    req.validated = validated;

    return next();
  } catch (err) {
    return next(err);
  }
};

export default validate;
