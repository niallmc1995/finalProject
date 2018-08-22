const Post = require("../models/post");

//exporting the created post and sending the request to the host
exports.createPost = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + "/images/" + req.file.filename,
      creator: req.userData.userId,
      memeLink: req.body.memeLink
    });
    post.save().then(createdPost => {
      res.status(201).json({
        message: "Post added successfully",
        post: {
          ...createdPost,
          id: createdPost._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating A Post Failed"
      });
    });
  };

  //exporting the updated post and sending the request to the host
  exports.updatePost = (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath,
      memeLink: req.body.memeLink,
      creator: req.userData.userId
    });
    
    // conditional statement letting me know if the post was updated successfully or not
    Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post).then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not Authorized!" });

      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Could not update post"
      });
    });
  };

  exports.getPosts =  (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();
    let fetchedPosts;
    if (pageSize && currentPage) {
      postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    postQuery
      .then(documents => {
        fetchedPosts = documents;
        return Post.count();
      })
      .then(count => {
        res.status(200).json({
          message: "Posts fetched successfully!",
          posts: fetchedPosts,
          maxPosts: count
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Could not fetch posts"
        });
      });
  };

  //handling retrieving the post/s
  exports.getPost =  (req, res, next) => {
    Post.findById(req.params.id).then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    }).catch(error => {
      res.status(500).json({
        message: "Could not fetch post"
      });
    });;
  };

  exports.deletePost =  (req, res, next) => {
    Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not Authorized!" });
  
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Could not fetch posts"
      });
    });
  };