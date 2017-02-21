document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('submitUser');

    button.addEventListener('click', function() {
      var input = document.getElementById('username');

      chrome.tabs.executeScript(null, {
        code: "if($('#hiddenuser-196').length){$('#hiddenuser-196').html('" + input.value + "');} else{console.log('doesnt exist'); hdiv = document.createElement('div'); $(hdiv).attr('id', 'hiddenuser-196').html('" + input.value + "'); $(document.body).append(hdiv); $(hdiv).css('display', 'none');}  "
      }, function(result) {
        console.log(result);
      });
    });
});