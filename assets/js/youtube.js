console.log('Youtube.js is working');
$(document).ready(function(){
    console.log('Document ready')
    var key="AIzaSyD1gUivzx6Li7wAoRLvzq3gpi2i-hboArw";
    var channelId= "UCHjMHgqs8GO0qYPL4JMMBvw";
    var URL= "https://www.googleapis.com/youtube/v3/search";
    
    var options = {
    part: 'snippet,id',
    key: key,
    maxResults: 20,
    channelId: channelId,
    order: 'date'
  };
    
     loadVids();
  
   function loadVids() {
          $.getJSON(URL, options, function (data) {
              var id = data.items[0].id.videoId;
              mainVid(id);
              resultsLoop(data);
          });
      }
    
    function mainVid(id) {
    $('#video-player').html(`
     <iframe width="700" height="350" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    `);
  }
  
  
  function resultsLoop(data) {
    
    $.each(data.items, function (i, item) {
      
      var thumb = item.snippet.thumbnails.medium.url;
      var title = item.snippet.title;
      var desc = item.snippet.description.substring(0, 100);
      var vid = item.id.videoId;
      
      
      
      $('#video-list').append(`

<div class="video media-object" data-key="${vid}">
    <div class="media-object-section">
        <img src="${thumb}" alt="" class="thumb">
    </div>

    <div class="media-object-section">
        <h5>${title}</h5>
        <p>${desc}</p>
    </div>
</div>
<hr>

     
      `);
    });
  }
  
  // CLICK EVENT
  $('#video-list').on('click', '.video', function () {
      var id = $(this).attr('data-key');
      console.log("click event, id: ", id);
    mainVid(id);
  });
    
})