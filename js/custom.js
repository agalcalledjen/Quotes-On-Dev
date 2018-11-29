(function ($) {

  $(function () {

    let lastPage = '';
    const $post = $('.post');
    const quote = data[0];
    const $source = $('.source');

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
            ${quote.content.rendered}
          </div>
          <div class="entry-meta">
            <h2 class="entry-title">&mdash; ${quote.title.rendered}</h2>
            <span class="source">  
            </span>
          </div>`);

        if (quote._qod_quote_source_url.length > 0) {
          $source.append(`&nbsp;,<a href="${quote._qod_quote_source_url}">&nbsp;${quote._qod_quote_source}</a>`);
        } else if (quote._qod_quote_source.length > 0) {
          $source.append(`&nbsp;, ${quote._qod_quote_source}`);
        } else {
          $source.append(quote._qod_quote_source);
        }

        history.pushState(null, null, qod_vars.home_url + '/' + quote.slug);

      }).fail(function (err) {
        alert(err);
      });
    } // end of getQuote fx

    $(window).on('popstate', function () {
      window.location.replace(lastPage);
    });

    // submit the form and create a new quote post
    $('#quote-submission-form').on('submit', function (event) {
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
      }).done(function () {
        $('#quote-submission-form').slideUp(1000);
        $('.quote-submission').append('<br>Thanks, your quote submission was received!');
      }).fail(function () {
        alert('something went wrong');
      });
    } // end of postQuote fx

  }); // end of document ready

})(jQuery);