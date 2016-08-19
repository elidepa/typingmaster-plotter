$(document).ready( () => {
   $.ajax({
      url: "http://localhost:3000/error/0025",
      success:  (response, status) => {
         $('#loading-gif').hide();
         $('#result').html(response);
      }
   })
})