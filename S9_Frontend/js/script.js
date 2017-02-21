// nav bar resizing
$(document).ready(function() {
  $(window).scroll(function(e) {
    var top = $(document).scrollTop()

    if (top > 225 && $('#nav').hasClass('transparent')) {
      $('#nav').removeClass('transparent');
    } else if (top <= 225 && !($('#nav').hasClass('transparent'))){
      $('#nav').addClass('transparent');
    }
  });
})

// specify backend url
var user_url = "http://localhost:8080/api/users/";

// insert table when username is submitted
function insertTable() {
  var user = $('#input').val() || 'no-username';

  $.get(user_url+user, function(data) {
      console.log(data);

      if ($('#table-body tr').length > 0) {
        $("#table-body").empty();
      } 

      // add rows

      for (var i = 0; i < data.urlhistory.length; i++) {
        console.log(data.urlhistory[i]);
        var taxonomyString = "";

        for (var j = 0; j < data.urlhistory[i].taxonomy.length; j++) {
          taxonomyString += data.urlhistory[i].taxonomy[j].label + " ";
        }
        var tableString = '<tr>'+
          '<th scope="row" class="col-md-3"><a target="_blank" href="' + 
          data.urlhistory[i].url + '">' + data.urlhistory[i].url + '</th>' +
          '<td class="col-md-3">' + data.urlhistory[i].author + '</td>' +
          '<td class="col-md-2">'+ data.urlhistory[i].docSentiment.type +
          ' (' + data.urlhistory[i].docSentiment.score + ')</td>' +
          '<td class="col-md-2">' + taxonomyString +'</td>' +
          '<td class="col-md-2">' + data.urlhistory[i].score + '</td>' +
          '</tr>';

        $( "#table-body" ).append( tableString );
      }
  })
} 