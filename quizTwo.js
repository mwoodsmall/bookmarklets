//programatically click send poll
var index = 0;
var questionDone = 'questionDone';
var answerOneDone = 'answerOneDone';
var answerTwoDone = 'answerTwoDone';
var answerThreeDone = 'answerThreeDone';
var question1 = {
        question : 'When the code below is executed within the address bar, what will happen?  javascript:alert("This is a test")'  
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
        }, 50);   
    },
    doCoolAnimations = function (){
        var pos = $('#fancybox-wrap').position();
        $('head').append('<style> .dance{ -webkit-animation: dance 5s 1} </style>');
        $('head').append('<style> @-webkit-keyframes dance {0%   {top:  100px;left: 100px;-webkit-transform: rotate(135deg);}25%  {top:  250px;left: 250px;-webkit-transform: rotate(135deg);}50%  {top:  100px;left: 250px;-webkit-transform: rotate(0deg);}75%  {top:  250px;left: 100px;-webkit-transform: rotate(-135deg);}100% {top: ' +pos.top + 'px;left: ' +pos.left + 'px;-webkit-transform: rotate(0deg);}} </style>');

        $('#fancybox-wrap').addClass('dance');
    };
    

try{
    $('.js-send-poll').click();
    doCoolAnimations();
    setTimeout(function (){
        autoType(question1.question, ko.dataFor(document.getElementById('sendPoll')).question, questionDone);
    }, 5000);
}
catch(err){
    doCoolAnimations();
    setTimeout(function (){
        autoType(question1.question, ko.dataFor(document.getElementById('sendPoll')).question, questionDone);
    }, 5000);
}

//event listeners for other stuffs
$(document).on(questionDone, function(e){
    autoType("The code will be executued within the context of the page, displaying an alert dialog with the value 'This is a test'", ko.dataFor(document.getElementById('sendPoll')).possibleAnswersMC()[0].custom_answer, answerOneDone );
});

$(document).on(answerOneDone, function(e){
    autoType("The code will return a new document and then be executed thus creating a blank page with an alert dialog with the value 'This is a test'", ko.dataFor(document.getElementById('sendPoll')).possibleAnswersMC()[1].custom_answer, answerTwoDone );
});

$(document).on(answerTwoDone, function(e){
    autoType("I'm not quite sure :(", ko.dataFor(document.getElementById('sendPoll')).possibleAnswersMC()[2].custom_answer, answerThreeDone );
});

$(document).on(answerThreeDone, function(e){
    $(document).unbind(questionDone);
    $(document).unbind(answerOneDone);
    $(document).unbind(answerTwoDone);
    $(document).unbind(answerThreeDone);
    ko.dataFor(document.getElementById('sendPoll')).sendClick();
    $('#fancybox-wrap').removeClass('dance');
    index = 0;
});


//populate the field










//ko.dataFor(document.getElementById('sendPoll')).possibleAnswersMC()[0].custom_answer('Yes');
//ko.dataFor(document.getElementById('sendPoll')).possibleAnswersMC()[1].custom_answer('No');
//ko.dataFor(document.getElementById('sendPoll')).possibleAnswersMC()[2].custom_answer('Maybe So');