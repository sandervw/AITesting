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
    try {

        let start = Date.now();
        //get response obj from openAI API
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo", //GPT 3.5 : https://platform.openai.com/docs/models/gpt-3-5
            messages: [{
                role: "user",
                content: prompt
            }],
            temperature: 0.9, //used to determine how varied the responses are : 0 is same every time
            max_tokens: 1000,
        })
        const responseTime = Date.now() - start;
        
        //data contains the main object with ID, model, usage, and choices
        let results = '';
        const [...rest] = [response.data];
        rest[0].choices.forEach((choice) => {
            //Append any returned messages to the output
            results += choice.message.content;
        })

        //Add response to the DB
        await Prompt.create({promptType, prompt, 'response': results, responseTime});
        res.status(200).json(results);

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