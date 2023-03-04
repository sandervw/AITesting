const express = require('express');
const Prompt = require('../models/promptModel');
const ai = require('openai');
//import {Configuration, OpenAIApi} from 'openai';

const router = express.Router();

//OPENAI configuration and init
const configuration = new ai.Configuration({
    //organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_KEY
})
const openai = new ai.OpenAIApi(configuration);

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
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo", //GPT 3.5 : https://platform.openai.com/docs/models/gpt-3-5
            messages: [{
                role: "user",
                content: prompt
            }],
            temperature: 0.9, //used to determine how varied the responses are : 0 is same every time
            max_tokens: 1000,
        })
        console.log(promptType, prompt, responseTime);
        //const result = await Prompt.create({promptType, prompt, response, responseTime});
        res.status(200).json(response.data);
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