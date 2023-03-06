const Prompt = require('../models/promptModel');
const ai = require('openai');
const mongoose = require('mongoose');

//OPENAI configuration and init
const configuration = new ai.Configuration({
    //organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_KEY
})
const openai = new ai.OpenAIApi(configuration);


//get all prompts
const getPrompts = async (req, res) => {
    try {
        const prompts = await Prompt.find({}).sort({createdAt: -1});
        res.status(200).json(prompts);
    } catch (err) {
        console.log(err);
        res.status(404).json(err);
    }
}

//get single prompt
const getPrompt = async (req, res) => {
    const {id} = req.params;
    //check if the ID is a vald ID - otherwise mongoose will return a response and send to browser
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error: 'No such prompt'});

    try {
        const prompt = await Prompt.findById(id);
        if(!prompt) return res.status(404).json({error: 'No such prompt'});
        return res.status(200).json(prompt);
    } catch (err) {
        console.log(err);
        res.status(404).json(err);
    }
}

//post a new prompt
const createPrompt = async (req, res) => {
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
}

//delete a prompt


//update a prompt


module.exports = {
    getPrompts,
    getPrompt,
    createPrompt
}