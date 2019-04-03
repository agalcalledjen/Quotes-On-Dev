(function ($) {

  $(function () {

    let lastPage = '';
    const $post = $('.post');
    const $quoteForm = $('#quote-submission-form');

    // get a random post and append content to the DOM
    $('#new-quote-btn').on('click', function (event) {
      event.preventDefault();

      getQuote();
    });

    // get quote data
    function getQuote() {
      lastPage = document.URL;

      $.ajax({
        method: 'GET',
        url: qod_vars.rest_url + 'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1'
      }).done(function (data) {
        $post.empty();

        $post.append(
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

        // could use this instead of data[0] every time
        const quote = data[0];

        history.pushState(null, null, qod_vars.home_url + '/' + quote.slug);

      }).fail(function () {
        alert('Oops!');
      });
    } // end of getQuote fx

    $(window).on('popstate', function () {
      window.location.replace(lastPage);
    });

    // submit the form and create a new quote post
    $quoteForm.on('submit', function (event) {
      event.preventDefault();
      postQuote();
    });

    function postQuote() {
      const quoteTitle = $('#quote-author').val();
      const quoteContent = $('#quote-content').val();
      const quoteSource = $('#quote-source').val();
      const quoteSourceUrl = $('#quote-source-url').val();

      $.ajax({
        method: 'POST',
        url: qod_vars.rest_url + 'wp/v2/posts',
        data: {
          title: quoteTitle,
          content: quoteContent,
          _qod_quote_source: quoteSource,
          _qod_quote_source_url: quoteSourceUrl,
          status: "pending"
        },
        // authentication
        beforeSend: function (xhr) {
          xhr.setRequestHeader('X-WP-Nonce', qod_vars.nonce);
        }
      }).done(function (response) {
        console.log(response);
        $quoteForm.slideUp(1000);
        $('.quote-submission').append('<br>Thanks, your quote submission was received!');
      }).fail(function () {
        $('.entry-header').append('<br><h2>Something went wrong!</h2>');
      });
    } // end of postQuote fx

  }); // end of document ready

})(jQuery);