const request = require("request");
const fs = require("fs");


for(let i = 1; i <= 898; i++) {
    request(`https://pokeapi.co/api/v2/pokemon-species/${i}/`, function(error, response, body) {


        let file = `./data/pokemon-species/${i}.json`;
        body = JSON.stringify(body).replace(/\*/g, '');
        body = body.replace(/\\/g, '');
        body = body.substring(1, body.length - 1);

        fs.writeFile(file, body, function(err) {
            if(err) {
                console.error(err)
            }
        });
    });
}