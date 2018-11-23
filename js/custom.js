(function ($) {

  // to test if js is working
  // $('body').append('Hello World');
  // console.log(qod_vars);

  $(document).ready(function () {

    let lastPage = '';

    // get a random post and append content to the DOM
    $('#new-quote-btn').on('click', function (event) {
      event.preventDefault();

      // to check if click event is working
      // console.log('click');

      // call ajax request
      getQuote();
    });

    // get quote data
    function getQuote() {
      // to test if function is working
      // console.log('get quote');

      // this needs to happen before ajax request
      // get url of last page
      lastPage = document.URL;

      // create ajax request
      $.ajax({
        // don't need to get datatype unless there are errors
        method: 'GET',
        url: qod_vars.rest_url + 'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1'
      }).done(function (data) {
        // Append content to the DOM e.g. replace the quote content with rest api content
        // console.log(data);
        // console.log(data[0].title.rendered);
        // console.log(data[0].content.rendered);
        // console.log(data[0]._qod_quote_source);
        // console.log(data[0]._qod_quote_source_url);

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
          $('.source').append(`&nbsp;,<a href="${data[0]._qod_quote_source_url}">&nbsp;${data[0]._qod_quote_source}</a>`);
        } else if (data[0]._qod_quote_source.length > 0) {
          $('.source').append(`&nbsp;, ${data[0]._qod_quote_source}`);
        } else {
          $('.source').append(data[0]._qod_quote_source);
        }

        // could replace data[0] with the following:
        // const quote = data[0]
        // or const quote = data.shift(); 
        // shift() gets the first item in array

        // figure out the post slug
        const quote = data[0];

        // get the slug of quote and put it in the website address
        // need the home url so we can fix the bug of web address when hitting back
        history.pushState(null, null, qod_vars.home_url + '/' + quote.slug);



      }).fail(function (err) {
        // Append a message for the user or alert a message saying something went wrong
        console.log(err);
      });
    } // end of getQuote fx

    //  create event for window obj
    $(window).on('popstate', function () {
      // when hit back button, it will get the url of last page and refresh the page
      window.location.replace(lastPage);
    });


    // submit the form and create a new quote post
    $('#quote-submission-form').on('submit', function (event) {
      event.preventDefault();
      postQuote();
    });

    function postQuote() {
      // b4 ajax happens, set the values of the inputs
      // and use them in the ajax data
      const quoteTitle = $('#quote-author').val();
      const quoteContent = $('#quote-content').val();
      const quoteSource = $('#quote-source').val();
      const quoteSourceUrl = $('#quote-source-url').val();

      // check out slide 34 of wp ajax api
      $.ajax({
        method: 'POST',
        url: qod_vars.rest_url + 'wp/v2/posts',
        // this data obj is what is being sent and posted
        data: {
          // https://developer.wordpress.org/rest-api/reference/posts/#create-a-post
          // need to post this stuff title, quote, author
          title: quoteTitle,
          content: quoteContent,
          _qod_quote_source: quoteSource,
          _qod_quote_source_url: quoteSourceUrl,
          status: "publish"
        },
        // authentication
        beforeSend: function (xhr) {
          xhr.setRequestHeader('X-WP-Nonce', qod_vars.nonce);
        }
      }).done(function (response) {
        console.log(response);
        // 1. slideUp the form
        // 2. append a success msg
        $('#quote-submission-form').slideUp(1000);
        $('.quote-submission').append('<br>Thanks, your quote submission was received!');
      }).fail(function () {
        // output a msg to the user saying sth went wrong
        console.log('something went wrong');
      });
    } // end of postQuote fx

  }); // end of document ready

})(jQuery);