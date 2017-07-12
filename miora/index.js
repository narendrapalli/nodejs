#! /usr/bin/env node 

var program = require("commander");
var prompt = require("prompt");
var colors = require("colors");
var tree = {};

program
    .version('0.0.1')
    .option('-i, --info', 'Add more info')
    .option('-U, --upper', 'Transform all the output in uppercase')

program.on('--help',function(){
    console.log('   Example:');
    console.log(' ');
    console.log('   $ events -h');
    console.log('   $ events tick');
    console.log('');
    console.log('Events is a program to show the viewer how cli programs and events work in node');
});

program
    .command('hi')
    .description('this is the greeting command')
    .action(function(options){
        print('Hi, Welcome to out program, I am miora! Nice to meet you')
    });

program
    .command('input [save]')
    .description('run a questionary to find the animal you have in your heard!')
    .option("-q, --question [mode]", "The question miora needs to start with, overrides the default question.")
    .action(function(save, options){
        var question = options.question || "is your animal a fish?";
        save = save || "memory";
        if(save == "memory"){
            print(colors.america("we will start with saving in memory!\n"));
            print(question);
        
            prompt.start();
            prompt.get(['answer'], function(err, result){
                print("result : "+ result.answer);
                if(result.answer == "yes"){
                    console.log("great we made it :)")
                } else if (result.answer == "no"){
                    console.log("What was the question that we were supposed to ask instead");
                    prompt.get('question', function(err, result){
                        tree.no = result;
                    });
                }
            })
        } else {
            print("can not save it to "+ save);
        }
    });

program.on('error',function(err, command){
    console.log(' ');
    console.log(colors.red('    Error:', err.message));
    command.outputUsage();
    command.outputCommands();
    command.outputOptions();
    console.log();
    process.exit(1);
});

program
    .command('fire [msg]')
    .description('this fires an event')
    .action(function(msg, options){
        process.emit("gunfire", msg);
    });

process.on('gunfire', function(msg){
    console.log("GUNFIRE : ", msg);
});

function print(s){
    if(program.upper) 
        s = s.toUpperCase();
    console.log(s);
}

program.parse(process.argv);
