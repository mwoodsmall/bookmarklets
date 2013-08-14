//programatically click send poll
var index = 0;
var questionDone = 'questionDone';
var answerOneDone = 'answerOneDone';
var answerTwoDone = 'answerTwoDone';
var answerThreeDone = 'answerThreeDone';
var question1 = {
        question : 'Have you ever written a bookmarklet?'  
    },
    
    autoType = function(word, observableFunc, trigger){
        setTimeout(function(){
            var val = word[index];
            observableFunc(observableFunc() + val);  
            index++;
            if(index === word.length){
                index = 0;
                $(document).trigger(trigger);
            }
            else{
                autoType(word, observableFunc,trigger);
            }
        }, 100);   
    };

try{
    $('.js-send-poll').click();
    autoType(question1.question, ko.dataFor(document.getElementById('sendPoll')).question, questionDone);
}
catch(err){
    autoType(question1.question, ko.dataFor(document.getElementById('sendPoll')).question, questionDone);
}

//event listeners for other stuffs
$(document).on(questionDone, function(e){
    autoType("Yes", ko.dataFor(document.getElementById('sendPoll')).possibleAnswersMC()[0].custom_answer, answerOneDone );
});

$(document).on(answerOneDone, function(e){
    autoType("No", ko.dataFor(document.getElementById('sendPoll')).possibleAnswersMC()[1].custom_answer, answerTwoDone );
});

$(document).on(answerTwoDone, function(e){
    autoType("Maybe So", ko.dataFor(document.getElementById('sendPoll')).possibleAnswersMC()[2].custom_answer, answerThreeDone );
});

$(document).on(answerThreeDone, function(e){
    ko.dataFor(document.getElementById('sendPoll')).sendClick();
    $(document).unbind(questionDone);
    $(document).unbind(answerOneDone);
    $(document).unbind(answerTwoDone);
    $(document).unbind(answerThreeDone);
    index=0;
});


//populate the field




//ko.dataFor(document.getElementById('sendPoll')).possibleAnswersMC()[0].custom_answer('Yes');
//ko.dataFor(document.getElementById('sendPoll')).possibleAnswersMC()[1].custom_answer('No');
//ko.dataFor(document.getElementById('sendPoll')).possibleAnswersMC()[2].custom_answer('Maybe So');