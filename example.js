

   javascript:(function(){
        var doCoolAnimations = function (){
            var pos = $('#fancybox-wrap').position();
            $('head').append('<style> .dance{ -webkit-animation: dance 5s 1} </style>');
            $('head').append('<style> @-webkit-keyframes dance {0%   {-webkit-transform: rotate(360deg);} 50%{-webkit-transform: rotate(-360deg);}} </style>');

            $('body').addClass('dance');
        };
    
        doCoolAnimations();
   })();
    

