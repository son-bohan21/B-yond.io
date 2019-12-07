console.log('Youtube.js is working');
$(document).ready(function(){
    console.log('Document ready')
    var key="AIzaSyD1gUivzx6Li7wAoRLvzq3gpi2i-hboArw";
    var channelId= "UCHjMHgqs8GO0qYPL4JMMBvw";
    var URL= "https://www.googleapis.com/youtube/v3/search";
    
    var searchOptions = {
    part: 'snippet,id',
    key: key,
    maxResults: 20,
    channelId: channelId,
    order: 'date'
  };
    
     loadVids(searchOptions);
  
   function loadVids(options) {
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
    
    $('#top-menu-search-input').keypress(function( event ) {
        console.log(event)
      if ( event.which == 13 ) {
         $("#top-menu-search-button").click();
      }
    
      
    });
  
  
  function resultsLoop(data) {
      $('#video-list').children().remove();
    
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
    
  $('#top-menu-search-button').on('click', function(e) {
      e.preventDefault();
      var searchQuery = $('#top-menu-search-input').val().trim();
      if (searchQuery.length === 0) {
          console.log('there is nothing to search, dont play with me bro');
          return;
      }
      
      console.log('top menu button was clicked, searchQuery: ', searchQuery);
      
      var topBarSearchOptions = {
        part: 'snippet,id',
        q: searchQuery,
        key: key,
        maxResults: 50,
        order: 'date',
        i18nLanguage: 'en'
      };
      
         loadVids(topBarSearchOptions);
  })    
})