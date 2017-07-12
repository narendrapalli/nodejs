
var util = require('util');
var greetings = ["hi", "hey", "hello", "nice to meet you"];

process.argv.slice(2).forEach(function(val, index, array){
    if(greetings.indexOf(val) > -1){
        console.log("Hi, I am miora, what can i do for you");
    } else if(val.indexOf("help") > -1){
        console.log("You can type \n hi, to great me \n ...");
    } else if(val.indexOf("input") > -1){
        process.stdin.resume();
        process.stdin.setEncoding('utf8');

        process.stdin.on('data', function(text){
            console.log('received data : ',util.inspect(text));
            if(text === 'quit\r\n'){
                done();
            }
        });
        function done(){
            console.log("Now that process.stdin is paused, ther is nothing..");
            process.exit();
        }
    }
    else {
        consolse.log("I can't help you, should I provide you with options?");
    }
});