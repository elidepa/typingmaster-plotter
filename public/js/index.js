$(document).ready( () => {
   $.ajax({
      url: "http://localhost:3000/wpm/54",
      success:  (response, status) => {
         $('#loading-gif').hide();
         $('#result').html(response);
      }
   })
})