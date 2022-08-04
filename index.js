const axios = require("axios");

const key='AIzaSyCFw9clTmDeSnnXxhC6WFxJAnVYbhYMf7Y';

const languages=['en','ru','ja','en'];

exports.handler = async (event) => {
    console.log(event);
    var body = JSON.parse(event.body);
    
    //translate from English
    //var results = await executeTranslate("ja", "Test Message Here!");
    
    var toTranslate = body.toTranslate;
    for (var i = 0; i < languages.length; i++)
    {
        var results = await executeTranslate(languages[i], toTranslate);
        toTranslate = results.translations[0].translatedText;
    }
    
    
    //const [translation] = await translate.translate("Test Message Here!", "ja");
    //console.log(translation);
    

    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify(toTranslate),
    };
    return response;
};





async function executeTranslate(language, phraseToTranslate)
{
    try {
        const response = await axios.post(`https://translation.googleapis.com/language/translate/v2?key=${key}`, { //body
            target: language,
            format: "text",
            q: phraseToTranslate
        }, 
        {
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        //console.log(JSON.stringify(error.data));
        throw new Error("Unable to translate: " + error);
    }
}
