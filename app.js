$(function(){

  var state = {
    url: "https://www.googleapis.com/youtube/v3/search",
    nxtPage: "",
    query: "",
    videos: "",
  };

  /* ============== State Functions =============== */

  function getRequest(state, success) {
    var data = {
      part:"snippet",
      key: "AIzaSyA_51CEBbUUfa2nKy9LVg0Mr-p26lD_FXw",
      q: state.query,
      type: "video",
      maxResults: 6,
      pageToken: state.nxtPage
    };

    $.getJSON(state.url, data, success);
  }

  /* ============== Render Functions =============== */
  function displayThumbnails(data){
    state.nxtPage = data.nextPageToken;
    var thumbnailSection = $('.js-thumbnails');
    var secondRow = 0;
    for (let i = 0; i < 2; i++){
      state.videos+='<div class="row">';
      for(let i = secondRow; i < secondRow + 3; i++){
        state.videos+=`<div class="col-4">
          <div class="movie js-movie">
            <img src="`+ data.items[i].snippet.thumbnails.medium.url + `" id="` + data.items[i].id.videoId + `">
            <p>`+ data.items[i].snippet.title + `<br /><a href="https://www.youtube.com/channel/` + data.items[i].snippet.channelId + `" target="_blank">View Channel</a></p>
          </div>
        </div>`;
      }
      state.videos+='</div>';
      secondRow = 3;
    }
    console.log(data);
    thumbnailSection.html(state.videos);
  }

  function renderPlayer(player, vidId){
    var vid = `<iframe width="560" height="315" src="https://www.youtube.com/embed/` + vidId + `?autoplay=1" frameborder="0" allowfullscreen></iframe>`;
    player.html(vid);
  }
  /* ============== Event Listeners =============== */
  $('.js-form').submit(function(e){
    e.preventDefault();
    state.query = $(this).find('.js-submit').val();
    getRequest(state, displayThumbnails);
    $('.js-next').removeClass('hidden');
  });

  $('.js-thumbnails').on('click', '.js-movie img', function(){
    var vidId = this.id;
    renderPlayer($('.js-player'), vidId);
    $('.js-player').removeClass('hidden');
  });

  $('.js-show-more').click(function(){
    getRequest( state, displayThumbnails);
  })

  $('.js-player').click(function(){
    $('.js-player').addClass('hidden');
    $('.js-player').html('');
  });
  
})
