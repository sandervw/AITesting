const express = require('express');
const Prompt = require('../models/promptModel');

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
router.post('/', async (req, res) => {
    const {promptType, prompt} = req.body;
    const responseTime = 0;
    //TODO start tracking response time
    //TODO call GPT API with prompt
    const response = 'TODO';
    console.log(promptType, prompt, response, responseTime);

    try {
        const result = await Prompt.create({promptType, prompt, response, responseTime});
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(400).json({error: err.message});
    }
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