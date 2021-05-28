//JOI Validation Middleware.

const validationMiddleware = (schema, property) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property]); //req['body']

    const valid = error == null; //if valid

    if (valid) {
      console.log("Data Format Validated");
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(","); //details property is in array for error.details.
      console.log("Data Validation error : ", message);

      res.status(422).json({
        error: message,
      });
    }
  };
};

export default validationMiddleware;
