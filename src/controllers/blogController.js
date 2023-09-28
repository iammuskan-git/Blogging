const models = require('../models');
const Validator = require('fastest-validator');

const { Blog } = models;

exports.insert = (req, res) => {
    const blog = {
        title: req.body.title,
        content: req.body.content,
        image_url: req.body.image_url,
        category_id: req.body.category_id,
        user_id: req.body.user_id
    }
    const schema = {
        title: { type: "string", optional: false, max: "100" },
        content: { type: "string", optional: false, max: "500" },
        category_id: { type: "number", optional: false }
    }

    const v = new Validator();
    const validationResponse = v.validate(blog, schema);
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        })
    }

    Blog.create(blog).then(result => {
        res.status(201).json({
            message: "Blog created successfully!!!",
            blog: result
        })
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        })
    })
}

exports.readAnyOne = (req, res) => {
    const id = req.params.id;

    Blog.findByPk(id).then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: "Blog not found"
            })
        }

    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!!!",
            error: error
        })
    });
}


exports.readAll = (req, res) => {
    Blog.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!!!",
            error: error
        })
    });
}


exports.updateBlog = (req, res) => {
    const id = req.params.id;

    const updatedBlog = {
        title: req.body.title,
        content: req.body.content,
        image_url: req.body.image_url,
        category_id: req.body.category_id,
    }

    const user_id = 1;

    const schema = {
        title: { type: "string", optional: false, max: "100" },
        content: { type: "string", optional: false, max: "500" },
        category_id: { type: "number", optional: false }
    }

    const v = new Validator();
    const validationResponse = v.validate(updatedBlog, schema);
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        })
    }

    Blog.update(updatedBlog, { where: { id: id, user_id: user_id } }).then(result => {

        if (result) {
            res.status(200).json({
                message: "Blog updated sucessfully!!!",
                blog: updatedBlog
            })
        } else {
            res.status(404).json({
                message: "Blog not found!"
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!!!",
            error: error
        })
    });
}



exports.deleteBlog = (req, res) => {
    const id = req.params.id;
    const user_id = 1;

    Blog.destroy({ where: { id: id, user_id: user_id } }).then(result => {
        if (result) {
            res.status(200).json({
                message: "Blog deleted successfully!!!",
            })
        } else {
            res.status(404).json({
                message: "Blog not found!"
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!!!",
            error: error
        })
    });
}