const express = require('express');

const Projects = require('../data/helpers/projectModel');

const router = express.Router();

// GET
router.get('/', (req,res) => {
    Projects.get()
      .then(post => {
          res.status(200).json(post)
      })
      .catch(err => {
        res.status(500).json({
            message: 'There was an error retrieving a list of projects.'
        })
    })
})


// GET by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;

  Projects.get(id)
    .then(post => {
      console.log(post);
      if (post.length < 1) {
        res.status(404).json({
          message: "The Project with specified ID does not exist"
        });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an error while retrieving project."
      });
    });
});

// GET ALL ACTIONS
router.get('/:id/actions', (req,res) => {
    const id = req.params.id;

    Projects.getProjectActions(id)
      .then(post => {
          console.log(post)
          if (!id) {
              res.status(404).json({
                  message: "The Project does not exist"
              })
          } else {
              res.status(200).json(post)
          }
          
      })
      .catch(err => {
        res.status(500).json({
            message:'There was an error while retrieving project actions.'
        })
    })
})

// POST
router.post('/', (req,res) =>{
    let data = req.body;
    if (!data.name || !data.description) {
        res.status(404).json({
            message: "Please provide both a name and description"
           })
    } else {
        Projects.insert(data)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json({
                message: 'There was an error with post'
            })
        })
    }
    
      
      
})

// PUT
router.put("/:id", (req,res) => {
    let data = req.body;
    let id = req.params.id;

    if (!data.name || !data.description) {
        res.status(404).json({
            message: "Please provide both a name and description"
           })
    } else {
        Projects.update(id, data)
        .then(post => {
            if(post) {
               res.status(200).json(post) 
            } else {
                res.status(404).json({
                    message: "The Project with Specified ID does not exist"
                })
            }
            
        })
        .catch(err => {
            res.status(500).json({
                Message: 'There was an error updating the project.'
            })
        })
    }
    
})

// DELETE
router.delete('/:id', (req,res)=>{
    let id = req.params.id;
    Projects.remove(id)
    .then(post => {
        if (post) {
           res.status(200).json({
               message: "Deleted Post"
           }) 
        } else {
            res.status(404).json({
                message: "The specified ID does not exist"
            })
        }
        
    })
    .catch(err => {
        res.status(500).json({
            Message: 'There was an error removing the project.'
        })
    })
})



module.exports = router;