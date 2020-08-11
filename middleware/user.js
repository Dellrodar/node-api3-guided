const users = require("../users/users-model")

const checkUserID = () => {
  return (req, res, next) => {
    users.findById(req.params.id)
      .then((user) => {
        if (user) {
          req.user = user;
          next()
        }
        res.status(404).json({
          message: "User not found",
        })
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({
          message: "Error retrieving the user",
        })
      })
  }
}

const validatePost = () => {
  return (req, res, next) => {
    if (!req.body.name || !req.body.email) {
      return res.status(400).json({
        message: "Missing user name or email",
      })
    }
    next()
  }
}

module.exports = {
  checkUserID,
  validatePost,
}