module.exports = () => {
  return (req, res, next) => {
    const agent = req.headers["user-agent"];

    if (/postman/i.test(agent)) {
      //client is postman, deny access
      return res.status(418). json({
        message: "No postman allowed!",
      });
    }
    next();
  }
}