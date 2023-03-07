const express = require('express');
const {
    getPrompts,
    getPrompt,
    createPrompt,
    deletePrompt,
    updatePrompt
} = require('../controllers/PromptController')

const router = express.Router();

//get all prompts
router.get('/', getPrompts);

//get single prompt
router.get('/:id', getPrompt)

//post a new prompt
router.post('/', createPrompt);

//delete a prompt
router.delete('/:id', deletePrompt)

//get all prompts
router.patch('/:id', updatePrompt)

module.exports = router;