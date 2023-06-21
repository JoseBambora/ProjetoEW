$(document).ready(function() {
    $('#myfile').change(function(e) {
      var fileName = e.target.files[0].name;
      $('label[for="myfile"] b').text(fileName);
    });
});