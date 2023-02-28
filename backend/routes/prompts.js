const express = require('express');

const router = express.Router();


//get all prompts
router.get('/', (req, res) => {
    res.json({mssg: 'GET all prompts'});
})

//get single prompt
router.get('/:id', (req, res) => {
    res.json({mssg: `GET single prompt: ${req.params.id}`});
})

//post a new prompt
router.post('/', (req, res) => {
    res.json({mssg: 'POST new prompt'});
})

//delete a prompt
router.delete('/:id', (req, res) => {
    res.json({mssg: `DELETE single prompt: ${req.params.id}`});
})

//get all prompts
router.patch('/:id', (req, res) => {
    res.json({mssg: `UPDATE single prompt: ${req.params.id}`});
})

module.exports = router;