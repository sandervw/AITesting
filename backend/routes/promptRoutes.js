const express = require('express');
const {
    getPrompts,
    getPrompt,
    createPrompt
} = require('../controllers/PromptController')

const router = express.Router();

//get all prompts
router.get('/', getPrompts);

//get single prompt
router.get('/:id', getPrompt)

//post a new prompt
router.post('/', createPrompt);

//delete a prompt
router.delete('/:id', (req, res) => {
    res.json({mssg: `DELETE single prompt: ${req.params.id}`});
})

//get all prompts
router.patch('/:id', (req, res) => {
    res.json({mssg: `UPDATE single prompt: ${req.params.id}`});
})

module.exports = router;