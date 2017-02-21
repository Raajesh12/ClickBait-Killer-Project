var url = "http://localhost:8080/api/alchemy";
var user_url = "http://localhost:8080/api/users/";

chrome.extension.sendMessage({}, function(response) {

	var readyStateCheckInterval = setInterval(function() {

	if (document.readyState === "complete") {

		clearInterval(readyStateCheckInterval);
		console.log("Hello. This message was sent from scripts/inject.js");

		// inject font

		var styleNode           = document.createElement ("style");
		styleNode.type          = "text/css";
		styleNode.textContent   = "@font-face { font-family: YOUR_FONT; src: url('"
										          + chrome.extension.getURL ("https://fonts.googleapis.com/css?family=Open+Sans")
										          + "'); }";

document.head.appendChild (styleNode);

		var popup = $('<div/>', {
  		'class':'popup-196',
  		'html':'<p class="displayText"><span class="emphasis">Percent Clickbait: </span><span id = "percent_clickbait"></span><p class="displayText"><span class="emphasis">General Sentiment</span>: <span id="p_sentiment"></span></p><p class="displayText"><span class="emphasis">Author</span>: <span id="p_author"></span></p><hr>'
  	});

		$('body').append(popup);
		var poppedUp = false;

	  $("[href]").hover(function(event){

	     var el = $(this); // hovered element
	    
	     setTimeout(function(){ 

	      if (el.is(':hover')){
	      	var a_href = $(el).attr('href');
	      	var a_href2 = a_href;

	      	if(a_href.charAt(0) == '/'){
	      		a_href2 = document.location.protocol + "//" + document.location.host + a_href;
	      	}
	      	
	      	var link_text = $(el).text();
	      	var user = $('#hiddenuser-196').html() || 'no-username';

	        var requestURL = {
        	 	inputstyle: "url",
        	 	input: a_href2,
        		method: "threespecial",
        		name: user
        	}

        	var requestLink = {
        	 	inputstyle: "text",
        	 	input: link_text,
        		method: "taxonomy"
        	}

	        $.post(url, requestURL, function(dataBackArticle) {

	        	$.post(url, requestLink, function(dataBackLink) {

	        		
              var sentiment = dataBackArticle.response.docSentiment.type;
              var author = dataBackArticle.response.author;
              //console.log(author);
              
              var taxonomyArticle = dataBackArticle.response.taxonomy;
              var taxonomyTitle = dataBackLink.response.taxonomy;
              
              var e_constant = Number(Math.E);
              var tau = 0.75;
              var sum_relevancy = 0;
              var minimum_entries = Math.min(taxonomyArticle.length, taxonomyTitle.length)

              var taxonomyTitleEntrySplit = taxonomyTitle[0].label.split("/");
              var taxonomyArticleEntrySplit = taxonomyArticle[0].label.split("/");
              var matches = 0;
              var max_matches = 0;
              var best_article_index = 0;
              var best_title_index = 0;

              for(var x = 0; x < taxonomyTitle.length; x++){
                for (var y = 0; y < taxonomyArticle.length; y++){ 
                  matches = 0; 
                  var min_branch_length = Math.min(taxonomyTitle[x].label.split("/").length, taxonomyArticle[y].label.split("/").length);
                  for (var k = 1; k<min_branch_length; k++){
                    if (taxonomyTitle[x].label.split("/")[k] == taxonomyArticle[y].label.split("/")[k]){
                      matches = matches + 1;
                      console.log("Matching taxonomy:" + taxonomyTitleEntrySplit[k]);
                    }
                    else
                      break;
                  }   

		              if (matches>max_matches){

		                max_matches = matches;  //max_matches and best_index are used now instead of matches and 0, respectively
		                best_article_index = y;
		                best_title_index = x;

		              }

                }
              }

		          
		          console.log("best score:" + taxonomyArticle[best_article_index].score);
		          var Q = .1* Number(taxonomyArticle[best_article_index].score) + .9;
		          sum_relevancy = sum_relevancy + Number(taxonomyArticle[best_article_index].score) * (1 - Q*Math.pow(e_constant, -1*(max_matches/0.7213475)));

              var sum_scores = 0;

              sum_scores = Number(taxonomyArticle[best_article_index].score); //added
              console.log("Sum_scores:"+ sum_scores);

              var sum_relevancy_weighted = (100 - (100 * (sum_relevancy/sum_scores)));
              var sum_relevancy_weighted_two_decimals = sum_relevancy_weighted.toFixed(2);

		        	//console.log(dataBackLink);
		        	$('#percent_clickbait').text(sum_relevancy_weighted_two_decimals);

		        	$.ajax({
		        		type: 'PUT',
		        		url: user_url+user,
		        		data: {
			        		score: sum_relevancy_weighted_two_decimals
			        	}
		        	}, function(err) {
		        		if (err) {
		        			console.log(err);
		        		} else {
		        			console.log('Add score to user');
		        		}
		        		
		        	})

		        	if(sum_relevancy_weighted < 33.33){
		        		$('#percent_clickbait').addClass("low");
		        	} else if(sum_relevancy_weighted < 66.66){
		        		$('#percent_clickbait').addClass("medium");
		        	} else{
		        		$('#percent_clickbait').addClass("high");
		        	}

		        	$('#p_sentiment').text(sentiment);
		        	$('#p_author').text(author);

		        	$('.popup-196').css('visibility', 'visible');
			        $('.popup-196').offset({
			          left: event.pageX,
			          top: event.pageY
			        });

			        if (!poppedUp){
			        	console.log("Going to append");
			        	$('.popup-196').append('<iframe id = "window" src = "' + a_href2 + '" ></iframe>')
			        	 poppedUp = true;
			        }

			        $('body').append('<img id = "xbutton" style="z-index:999;" src="https://static.dpaw.wa.gov.au/static/libs/ionicons/1.2/src/icon-close-circled.svg"></img>')
			        $("#xbutton").offset({
			        	left: event.pageX + 10,
			        	top: event.pageY + 10
			        });
	    			});
     			}, "json");
   	 		}
	  	}, 2000);
	  }, function(){  

    	console.log("You left the link!"); 

		  $('#xbutton').click(function(){

	      	$('#window').remove();
	      	$('.popup-196').css('visibility', 'hidden');
	      	$('#xbutton').remove();
	      	poppedUp = false;
	      	$('#percent_clickbait').removeClass("low");
	      	$('#percent_clickbait').removeClass("medium");
	      	$('#percent_clickbait').removeClass("high");

	      });
		  });
		}
	}, 10);
});


function remove_hyphens(str) {
  var newstr = "";
  for (var i=0; i<str.length;i++){
    if (str.charAt(i)=='-'){
      newstr+= " ";
    }
    else
      newstr+= str.charAt(i);
  }    
  return newstr;          // The function returns the product of p1 and p2
}