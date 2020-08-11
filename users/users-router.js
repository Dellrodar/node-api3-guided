const express = require("express");
const users = require("./users-model");
const { checkUserID, validatePost } = require("../middleware/user");
const router = express.Router()

router.get("/users", (req, res) => {
  const options = {
    sortBy: req.query.sortBy,
    limit: req.query.limit,
  }

  users.find(options)
    .then((users) => {
      res.status(200).json(users)
    })
    .catch(next)
})

router.get("/users/:id", checkUserID(), (req, res) => {
  res.status(200).json(req.user)
})

router.post("/users", validatePost(), (req, res) => {
  users.add(req.body)
    .then((user) => {
      res.status(201).json(user)
    })
    .catch(next)
  // console.log(error)
  // res.status(500).json({
  // 	message: "Error adding the user",
  // })
})

router.put("/users/:id", validatePost(), checkUserID(), (req, res) => {

  users.update(req.params.id, req.body)
    .then((user) => {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({
          message: "The user could not be found",
        })
      }
    })
    .catch(next)
})

router.delete("/users/:id", checkUserID(), (req, res) => {
  users.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: "The user has been nuked",
        })
      } else {
        res.status(404).json({
          message: "The user could not be found",
        })
      }
    })
    .catch(next)
})

router.get("/users/:id/posts", checkUserID(), (req, res) => {
  users.findUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch(next)
})

router.get("/users/:id/posts/:postId", checkUserID, (req, res) => {
  users.findUserPostById(req.params.id, req.params.postId)
    .then((post) => {
      if (post) {
        res.json(post)
      } else {
        res.status(404).json({
          message: "Post was not found",
        })
      }
    })
    .catch(next)
})

router.post("/users/:id/posts", checkUserID(), (req, res) => {
  if (!req.body.text) {
    return res.status(400).json({
      message: "Need a value for text",
    })
  }

  users.addUserPost(req.params.id, req.body)
    .then((post) => {
      res.status(201).json(post)
    })
    .catch(next)
})

module.exports = router