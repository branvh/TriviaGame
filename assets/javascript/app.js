/*

You'll create a trivia game that shows only one question until
 the player answers it or their time runs out.

If the player selects the correct answer, show a screen congratulating 
them for choosing the right option. After a few seconds, display the next question 
-- do this without user input.

The scenario is similar for wrong answers and time-outs.

If the player runs out of time, tell the player that time's up and display
 the correct answer. Wait a few seconds, then show the next question.

If the player chooses the wrong answer, tell the player they selected the 
wrong option and then display the correct answer. Wait a few seconds, then show the next question.

On the final screen, show the number of correct answers, incorrect answers, 
and an option to restart the game (without reloading the page).

*/

//question object
//sample - accesor notation trivia[0]['choices'][3] = 'Ronald Regan'
var trivia = [{
    question: 'Which US President played football at Michigan?',
    choices: ['Gerald Ford', 'Richard Nixon', 'Dwigth Eisenhower', 'Ronald Regan'],
    answer: 'Gerald Ford',
    asked: 0
}, {
    question: 'Michigan players have won multiple Heisman trophies over the years. Which of the following Michigan legends did *not* win the Heisman?',
    choices: ['Tom Harmon', 'Charles Woodson', 'Tom Brady', 'Desmond Howard'],
    answer: 'Tom Brady',
    asked: 0
}, {
    question: 'Wolverine fans generally regard Bo Schembechler, who coached the team from 1969-1989, as the best Michigan coach ever. Which of the following is *not* true of Bo\'s tenure?',
    choices: ['He had a record of 194-48-5 at Michigan.', 'As a collegiate player, he was coached by Woody Hayes, who would become his nemesis.', 'He won or shared 13 Big Ten titles at Michigan.', 'He won a national championship.'],
    answer: 'He won a national championship.',
    asked: 0
}, {
    question: 'Bob Ufer was a legendary broadcaster for Michigan football (1945-1981). He was known for his unique way of saying things, and was a Michigan fan through and through. Which of the following did he *never* say?',
    choices: ['All of us up here in the water wonderland never forget that Ohio is still a four-letter word.', ' Bless his cotton pickin\' maize and blue heart.', 'You\'ve just got to love ol\' Woody Hayes, a fine man.', 'Football is a religion and Saturday is the holy day of obligations.'],
    answer: 'You\'ve just got to love ol\' Woody Hayes, a fine man.',
    asked: 0
}, {
    question: 'The Wolverines play in a stadium which, after renovations in 2010, had an official capacity of 109,951 fans (but has held over 115,000 for a game). After those renovations it was the largest stadium in the USA, and third largest in the world. What is this stadium known as?',
    choices: ['The Wolverine Bowl', 'GM Stadium', 'The Big House', 'Schembehler Field'],
    answer: 'The Big House',
    asked: 0
}, {
    question: 'Which of the following star quarterbacks at Michigan never played in the NFL?',
    choices: ['Jim Harbaugh', 'Rick Leach', 'Elvis Grbac', 'John Navarre'],
    answer: 'Rick Leach',
    asked: 0
}, {
    question: 'Every year Michigan plays another Big Ten team for the coveted "Little Brown Jug". What team is this?',
    choices: ['Michigan State', 'Purdue', 'Wisconsin', 'Minnesota'],
    answer: 'Minnesota',
    asked: 0
}, {
    question: 'On November 18, 2006, Michigan, then ranked #2, played another team, then ranked #1, for the Big Ten championship, and a shot at the national championship. Who beat Michigan 42-39 in this match, called the "game of the century"?',
    choices: ['Ohio State', 'Michigan State', 'Penn State', 'Wisconsin'],
    answer: 'Ohio State',
    asked: 0
}, {
    question: 'Many people remember that Michigan won the national championship in 1997, which was their first championship in many years. How many times did Michigan win the national championships before 1950?',
    choices: ['9', '10', '8', '7'],
    answer: '10',
    asked: 0
}, {
    question: 'Michigan was the first NCAA football team of all schools in any division to win 900 games. Of those first 900 victories, which team did Michigan defeat the most times?',
    choices: ['Ohio State', 'Illinois', 'Minnesota', 'Wisconsin'],
    answer: 'Minnesota',
    asked: 0
}];

var game = {

    time: 0,
    maxTime: 120,
    score: 0,
    questions: 0,
    choice: true,
    currentQuestion: 0,
    questionOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    randomOrder: function() {
        //Durstenfeld shuffle algorithm

        //variable to hold / udate question order array
        var q;
        questions = trivia.length;

        //ensure that questionOrder array = trivia length
        if (trivia.length > game.questionOrder.length) {

            for (var i = (game.questionOrder.length + 1); i < trivia.length; i++)

                game.questionOrder.push(i);

        }

        //randomize questions so don't always show up in same order
        for (var i = questions - 1; i > 0; i--) {

            var j = Math.floor(Math.random() * (i + 1));
            var temp = game.questionOrder[i];
            game.questionOrder[i] = game.questionOrder[j];
            game.questionOrder[j] = temp;

        }
 		//provide randomized list of question to game
        return game.questionOrder;

    },
    init: function() {

    	//create a randomized question list
    	game.questionOrder = game.randomOrder();

    	//reset game timer
    	game.time = game.maxTime;

    	//reset score
    	game.score = 0;

    	//start timer
    	game.timer();

   		//update screen display
   		game.updateScreen();

    },
    timer: function() {

    	
    	
    },
    answerCheck: function() {},
    updateScreen: function() {},
    endGame: function() {}
};


//timer function
//don't let go below zero
//display in 00:00
//if time = 0, stop game
//display a reset button which runs init then hides

//on-click of .answer class
//check answer
//if correct, 
//else, highlight correct answer for 1 sec and move on
//also - display that answer incorrect

$(document).ready(function() {

    //init function

    //validate answer event listener
    $('.answer').on('click', game.answerCheck);

    //restart game event listener
    $('#reset').on('click', function() {


    });

});
