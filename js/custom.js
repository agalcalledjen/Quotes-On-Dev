(function ($) {

  // to test if js is working
  // $('body').append('Hello World');
  // console.log(qod_vars);

  $(document).ready(function () {



    // get a random post and append content to the DOM
    $('#new-quote-btn').on('click', function (event) {
      event.preventDefault();

      // to check if click event is working
      // console.log('click');

      // call ajax request
      getQuote();
    });

    function getQuote() {
      // to test if function is working
      // console.log('get quote');

      // create ajax request
      $.ajax({
        // don't need to get datatype unless there are errors
        method: 'GET',
        url: qod_vars.rest_url + 'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1'
      }).done(function (data) {
        // Append content to the DOM e.g. replace the quote content with rest api content
        console.log(data);
        console.log(data[0].title.rendered);
        console.log(data[0].content.rendered);
        console.log(data[0]._qod_quote_source);
        console.log(data[0]._qod_quote_source_url);

        // filter out articles with pictures and only show 12 of them
        // let articles = data.results.filter((item) => {
        //   return item.multimedia.length > 4;
        // }).slice(0, 12);

        // loop thru each article and add the following
        $('.post').empty();

        $('.post').append(
          `<div class="entry-content">
            ${data[0].content.rendered}
          </div>
          <div class="entry-meta">
            <h2 class="entry-title">&mdash; ${data[0].title.rendered}</h2>
            <span class="source">  
            </span>
          </div>`);

        if (data[0]._qod_quote_source_url.length > 0) {
          $('.source').append(`,<a href="${data[0]._qod_quote_source_url}">&nbsp;${data[0]._qod_quote_source}</a>`);
        } else {
          $('.source').append(data[0]._qod_quote_source);
        }

        // loop thru each article and add the following
        // $('.entry-content').empty();
        // $('.entry-content').append(`${data[0].content.rendered}`);

        // $('.entry-meta').empty();
        // $('.entry-meta').append(`<h2 class="entry-title">${data[0].title.rendered}</h2>`);



      }).fail(function (err) {
        // Append a message for the user or alert a message saying something went wrong
        console.log(err);
      });
    } // end of getQuote fx

  });

})(jQuery);