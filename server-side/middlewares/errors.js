function Error(error, req, res, next) {
  switch (error.name) {
    case "SequelizeValidationError":
      const errors = error.errors.map((err) => err.message);
      res.status(400).json({
        message: errors[0],
      });
      break;
    case "SequelizeUniqueConstraintError":
      const errors2 = error.errors.map((err) => err.message);
      res.status(400).json({
        message: errors2[0],
      });
      break;
    case "email/password invalid":
      res.status(401).json({
        message: "error invalid username or email or password",
      });
      break;
    case "status is same":
        res.status(400).json({
          message: `status is same with ${error.status}`,
      });
      break;
    case "invalid token":
      res.status(401).json({
        message: "error invalid token",
      });
      break;
    case "invalid status":
      res.status(401).json({
        message: "error invalid status",
      });
      break;
    case "JsonWebTokenError":
      res.status(401).json({
        message: "error invalid token",
      });
      break;
    case "data not found":
      res.status(401).json({
        message: "data not found",
      });
      break;
    case "not found movies":
      res.status(404).json({
        message: "not found movies",
      });
      break;
    case "cannot created history":
      res.status(403).json({
        message: "cannot created history",
      });
      break;
    case `forbiden`:
      res.status(403).json({
        message: `cannot delete movies from id ${error.id}`,
      });
      break;
    default:
      res.status(500).json({
        message: "internal server error",
      });
      break;
  }
}

module.exports = Error;
