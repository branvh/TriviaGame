//trivia list items
var trivia = [{
    question: 'Which US President played football at Michigan?',
    choices: ['Gerald Ford', 'Richard Nixon', 'Dwigth Eisenhower', 'Ronald Regan'],
    answer: 'Gerald Ford'
}, {
    question: 'Michigan players have won multiple Heisman trophies over the years. Which of the following Michigan legends did *not* win the Heisman?',
    choices: ['Tom Harmon', 'Charles Woodson', 'Tom Brady', 'Desmond Howard'],
    answer: 'Tom Brady'
}, {
    question: 'Wolverine fans generally regard Bo Schembechler, who coached the team from 1969-1989, as the best Michigan coach ever. Which of the following is *not* true of Bo\'s tenure?',
    choices: ['He had a record of 194-48-5 at Michigan.', 'As a collegiate player, he was coached by Woody Hayes, who would become his nemesis.', 'He won or shared 13 Big Ten titles at Michigan.', 'He won a national championship.'],
    answer: 'He won a national championship.'
}, {
    question: 'Bob Ufer was a legendary broadcaster for Michigan football (1945-1981). He was known for his unique way of saying things, and was a Michigan fan through and through. Which of the following did he *never* say?',
    choices: ['All of us up here in the water wonderland never forget that Ohio is still a four-letter word.', ' Bless his cotton pickin\' maize and blue heart.', 'You\'ve just got to love ol\' Woody Hayes, a fine man.', 'Football is a religion and Saturday is the holy day of obligations.'],
    answer: 'You\'ve just got to love ol\' Woody Hayes, a fine man.'
}, {
    question: 'The Wolverines play in a stadium which, after renovations in 2010, had an official capacity of 109,951 fans (but has held over 115,000 for a game). After those renovations it was the largest stadium in the USA, and third largest in the world. What is this stadium known as?',
    choices: ['The Wolverine Bowl', 'GM Stadium', 'The Big House', 'Schembehler Field'],
    answer: 'The Big House'
}, {
    question: 'Which of the following star quarterbacks at Michigan never played in the NFL?',
    choices: ['Jim Harbaugh', 'Rick Leach', 'Elvis Grbac', 'John Navarre'],
    answer: 'Rick Leach'
}, {
    question: 'Every year Michigan plays another Big Ten team for the coveted "Little Brown Jug". What team is this?',
    choices: ['Michigan State', 'Purdue', 'Wisconsin', 'Minnesota'],
    answer: 'Minnesota'
}, {
    question: 'On November 18, 2006, Michigan, then ranked #2, played another team, then ranked #1, for the Big Ten championship, and a shot at the national championship. Who beat Michigan 42-39 in this match, called the "game of the century"?',
    choices: ['Ohio State', 'Michigan State', 'Penn State', 'Wisconsin'],
    answer: 'Ohio State'
}, {
    question: 'Many people remember that Michigan won the national championship in 1997, which was their first championship in many years. How many times did Michigan win the national championships before 1950?',
    choices: ['9', '10', '8', '7'],
    answer: '10'
}, {
    question: 'Michigan was the first NCAA football team of all schools in any division to win 900 games. Of those first 900 victories, which team did Michigan defeat the most times?',
    choices: ['Ohio State', 'Illinois', 'Minnesota', 'Wisconsin'],
    answer: 'Minnesota'
}];

//gameplay object
var game = {

    //gameplay variables
    currentTime: 0,
    counter: '',
    maxTime: 12,
    score: 0,
    incorrect: 0,
    questions: 0,
    choice: true,
    currentQuestion: 0,
    currentItem: '',
    questionOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    //game methods
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

        //set game status = active
        game.active = true;

        //add click event listener
        game.clickListener();

        //create a randomized question list
        game.questionOrder = game.randomOrder();

        //current question rest to array item 0
        game.currentQuestion = 0;

        //reset counter
        game.counter = '';
        game.currentItem = '';

        //reset game timer
        game.currentTime = game.maxTime;

        //display all gameplay class items; hide all outcome display class items
        $('.gameplay').show();
        $('.outcome').hide();

        //reset score (correct answers) and incorrect answer count
        game.score = 0;
        game.incorrect = 0;

        //start timer
        game.startTimer();

        //update screen display
        game.diplayQuestion();

    },
    clickListener: function() {

        $('.answer').on('click', function() {

            game.answerCheck(this);

        });

    },
    removeClickListener: function () {
    	$('.answer').off('click');
    },
    startTimer: function() {

        //update time remaining every second
        game.counter = setInterval(game.count, 1000);

    },
    count: function() {

        //reduce current time by one second
        game.currentTime--;

        console.log(game.currentTime);

        //update game time
        game.displayTime();

        //check to ensure that game should still be running
        if (game.currentTime === 0) {

            game.stopTimer();

            game.endGame();

        }

    },
    stopTimer: function() {

        //Use clearInterval to stop the count here
        clearInterval(game.counter);


    },
    displayTime: function() {

        //get current time in required format
        var now = game.timeConverter(game.currentTime);

        //update page content with current time remaining
        document.getElementById('time').innerHTML = now;

    },
    timeConverter: function(t) {

        ///return 00:00 time format
        //assume max time won't be set to be more than 60 minutes..
        var minutes = Math.floor(t / 60);
        var seconds = t - minutes * 60;

        //zero pad the minutes, as needed
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        var display = minutes + ':' + seconds;

        return display;

    },
    answerCheck: function(selection) {

        //temporarily remove event listener to prevent multiple clicks
        game.removeClickListener();

        //capture selected item and current answer
        var selected = selection.textContent;
        var ans = game.currentItem['answer'];
        var message = '';

        //determine if answer correct
        if (selected === ans) {

            //update score
            game.score++;
            message = 'Go Blue!';

        } else {

            //wrong answer
            game.incorrect++;
            message = 'Wrong answer!';

        }

        //quickly display question outcome
        game.displayOutcome(message);

        //add back event listener
        game.clickListener();

        //move to next question, as appropriate
        game.nextQuestion();

    },
    displayOutcome: function(message) {

        //prevent questions from showing up after game ends..
        if (game.currentTime > 2) {

            //hide question, briefly
            $('.questionlist').fadeOut().delay(2000).fadeIn();

            // show question response outcome for 1 second
            $('#outcome').html(message).fadeIn().delay(1000).fadeOut();
        }


    },
    diplayQuestion: function() {

        //grab the first randomly selected question array element
        game.currentItem = trivia[game.questionOrder[game.currentQuestion]];

        var q = game.currentItem['question'];
        var select = game.currentItem['choices'];

        //grab question DOM element and ensure that we have all nodes..
        var qNode = document.getElementById('question');
        var choiceNodes = document.getElementsByClassName('answer');

        //set question content
        qNode.textContent = q;

        //display answer choices
        for (var i = 0; i < choiceNodes.length; i++) {

            choiceNodes[i].innerHTML = select[i];

        }

        //move on to next question - only if we aren't at end of array
        if (game.currentQuestion === trivia.length - 1) {
            return;
        } else {
            game.currentQuestion++;
        }

    },
    nextQuestion: function() {

        //don't display any more questions if the game is over OR we've run out of questions
        if (game.currentTime === 0 || (game.currentQuestion === trivia.length - 1)) {

            //stop the timer first
            game.stopTimer();

            //nothing else to do - so move to end game module
            game.endGame();

        } else if (game.currentTime > 1) {
            //don't show question again if too little time remaining

            //move on to next question
            game.diplayQuestion();

        }


    },
    endGame: function() {

    	//remove click listener and/or ensure it was removed and not added twice
    	game.removeClickListener();

        // display all outcome class items; hide all gameplay class items
        $('.gameplay').hide();

        var timeComment = $('#time-element');

        if (game.currentTime === 0) {

            timeComment.html('Time is up!')

        } else {

            timeComment.html('You finished before the buzzer!');

        }

        $('.outcome').show();
        $('#correctAnswers').html('You had ' + '<em>' + game.score + '</em> correct, Tom Brady would be proud!');
        $('#incorrectAnswers').html('You had ' + '<em>' + game.incorrect + '</em> wrong, like a buckeye!');
    }
};


$(document).ready(function() {

    //init function
    game.init();

    //validate answer event listener
    // $('.answer').on('click', function() {

    //     game.answerCheck(this);

    // });

    //restart game event listener
    $('#reset').on('click', game.init);

});


/*TO DO LIST


ERRORS
delays can continue after the game ends...

*/
