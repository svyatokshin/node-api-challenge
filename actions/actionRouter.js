const express = require('express');

const Actions = require('../data/helpers/actionModel');

const router = express.Router();

// GET

router.get('/', (req, res) => {
    Actions.get()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        console.error("Error retrieiving Actions Data", err);
        res.status(500).json({
            message: "Error retrieving Action Data"
        })
    })
})

// GET by ID

router.get('/:id', (req, res) => {
    const id = req.params.id;

    Actions.get(id)
    .then(posts => {
        console.log(post)
        if(post === null) {
            res.status(404).json({
                message: "The action with specified ID does not exist"
            })
        } else {
            res.status(200).json(post);
        }
    })
    .catch(err => {
        res.status(500).json({
            message: "Error retrieving Data for Specified ID"
        })
    })
})

// POST 

router.post("/", (req, res) => {
  let data = req.body;

  if (!data.project_id || !data.description) {
    res.status(400).json({
      error: "Please provide both a project_id and description"
    });
  } else {
          Actions.insert(data)
            .then(action => {
              res.status(200).json(action);
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: "There was an Error"
              });
            });
        }
});



// DELETE

router.delete('/:id', (req, res) => {
    
    Actions.remove(req.params.id)
    .then(post => {
        if(post) {
            res.status(200).json({message: "deleted "})
        } else {
            res.status(404).json({message: "Specified ID does not exist"})
        }
    })
    .catch(error => {
        res.status(500).json({
            message: "There was an error saving your changes"
        })
    })
})

// PUT 

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const data = req.body;
    
    if(!req.body.project_id || !req.body.description) {
        res.status(404).json({
             message: "Please provide both a project_id and description"
            })
    } else {
        Actions.update(id, data)
    .then(action => {
        res.status(200).json(action);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "There was an error saving your changes"
        })
    })
    }
    
    
})

module.exports = router;