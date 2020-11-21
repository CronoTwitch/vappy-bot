const errorMessage = "Syntax Error. Use !roll ydx [+/-] z, where x is size of die, y is times to roll, and z is an optional modifier for addition or subtraction.";

//Dice rolling.
module.exports = {
    name: 'roll',
    description: 'rng plz!',
    execute(msg, args) {
        console.log(args);
        //If no arguments, return an error. i.e., !roll
        if(args.length == 0){
            msg.reply(errorMessage);
            return;
        }
        //If argument is help, post this. i.e., !roll help
        if(args[0] == "help"){
            msg.reply("\nUse !roll ydx [+/-] z, where x is size of die, y is times to roll, and z is an optional modifier for addition or subtraction. Example: `!roll 1d8 + 2`");
            return;
        }
        //If the first argument doesn't include 'd', error.
        //i.e., !roll 34342
        //Prolly needs to be further iterated so you don't have
        //something like, !roll 1d, or !roll derp, etc.
        if(!args[0].includes('d')){
            msg.reply(errorMessage);
            return;
        }
        //If arguments length is only 2, that means its
        //not possible for there to be a third operator, so
        //error. i.e., !roll 1d6 +
        if(args.length == 2){
            msg.reply(errorMessage);
            return;
        }
        //If second operator isn't a + or a - character, or
        //the third operator can't be parsed as an integer,
        //then error. i.e., !roll 1d6 234 3, or !roll 1d6 + dsfa
        if(args.length > 1){
            if(!args[1].includes('+') && !args[1].includes('-')){
                msg.reply(errorMessage + "\nError: Second argument was not `+` or `-`");
                return;
            } else if(!Number.isInteger(parseInt(args[2]))){
                msg.reply(errorMessage + "\nError: Third agrument was not an integer.");
                return;
            }
        }

        //Split the 'd' into two numbers on each side of it
        dice = args[0].split('d');
        var i;
        result = "\nResult: ("
        numResult = 0;
        //For each roll, get a random number from 1 to x, where
        //x is the sides of the die
        for(i = 0; i < dice[0]; ++i){
            temp = Math.floor(Math.random() * dice[1]) + 1;
            result += temp;
            numResult += temp;
            if (i < dice[0] - 1){
               result += " + ";
             }
         }

        //Output parse handling.
        result += ")";

        //console.log(args.length);
        if (args.length > 1){
            if (args[1] == '+'){
                numResult += parseInt(args[2]);
                result += " + " + args[2] + ' = ' + numResult;
            } else {
                numResult -= parseInt(args[2]);
                result += " - " + args[2] + ' = ' + numResult;
            }
        }
            
        //Give the output!
        if (i > 1 && args.length == 1){
            msg.reply(result + " = " + numResult);
        } else {
            msg.reply(result);
        }
        

    },
  };