(function(){
	count= 0;
	var startQuiz = function(){
		var spText = spanish[count].innerHTML;
		var spTextElement = document.getElementById('spText');
		spTextElement.innerHTML = '<h3 style="margin-top:75px; margin-bottom:75px; font-size:50px; text-align:center; width:100%">'+spText+'<h3>';	
	};
	var cardClick = function(e){
		var enTextElement = document.getElementById('enText');
		var spTextElement = document.getElementById('spText');
		if(enTextElement.innerHTML === ""){
			enTextElement.innerHTML = '<h3 style="margin-top:25px; margin-bottom:75px; font-size:50px; text-align:center; width:100%">'+english[count]+'<h3>';
		}
		else{
			count++;
			spTextElement.innerHTML = '<h3 style="margin-top:75px; margin-bottom:75px; font-size:50px; text-align:center; width:100%">'+spanish[count].innerHTML+'<h3>';
			enTextElement.innerHTML = "";
		}
	};
	var setUpPage = function(){
		var height = document.height;
		var width = $(window).width();
		var maskStyle = 'position:absolute; top:0; left:0;background-color:black; opacity:0.7;width:'+width+'px;height:'+height+'px;';
		var cardStyle = 'border-radius: 5px; position:absolute; top:200px; left:'+((width/2)-300)+'px;min-height:400px; width:600px; background-color:white;';
		var mask = document.createElement('div');
		var card = document.createElement('div');
		var spanishText = document.createElement('div');
			spanishText.setAttribute('id', 'spText');
		var englishText = document.createElement('div');
			englishText.setAttribute('id', 'enText');
		var seperator = document.createElement('hr');
		mask.setAttribute('style', maskStyle);
		mask.setAttribute('id', 'mask');
		card.setAttribute('style', cardStyle);
		card.setAttribute('id', 'card');
		card.appendChild(spanishText);
		card.appendChild(seperator);
		card.appendChild(englishText);
		document.body.appendChild(mask);
		document.body.appendChild(card);
		var myCard = document.getElementById('card');
			myCard.onclick = cardClick;
			
		$('#mask').click(function(){
			$('#mask').remove();
			$('#card').remove();
		})
	};

	spanish = document.getElementsByClassName("lexeme");
	english = [];
	var temp = $('.hint-table table tbody');
	var tempString = "";
	for(var i = 0; i<temp.length; i++){
		var children = $(temp[i]).children('tr');
		if(children.length > 1){
			for(var j = 0; j<2; j++){
				tempString += j<children.length-1? $(children[j]).children('td')[0].innerText+'<br/>': $(children[j]).children('td')[0].innerText;
			}
		}
		else{
			tempString = children[0].innerText;
		}
		console.log(tempString);
		english.push(tempString);
		tempString = "";
	}
	var dictionary = [];
	for(var i = 0; i < spanish.length; i++){
		dictionary[spanish[i]] = english[i];
	}
	setUpPage();
	startQuiz(dictionary, spanish);	
})()