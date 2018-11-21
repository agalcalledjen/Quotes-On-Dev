<?php
/**
 * The template for displaying a page submit.
 *
 * @package QOD_Starter_Theme
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

			<section class="quote-submission">
        <header class="entry-header">
          <?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
        </header>

        <!-- we only want logged in ppl to make submissions, use wp methods and if stmts -->
        <?php if( is_user_logged_in() && current_user_can( 'edit_posts' ) ): ?>
          <!-- if those conditions are met, create a form -->
          <div class="quote-submission-wrapper">
            <form name="quoteForm" id="quote-submission-form">
              <div>
                <label for="quote-author">Author of Quote</label>
                <input type="text" name="quote_author" id="quote-author">
              </div>
              <div>
                <label for="quote-content">Quote</label>
                <textarea name="quote" id="quote-content" cols="20" rows="3"></textarea>
              </div>
              <div>
                <label for="quote-source">Where did you find this quote? (e.g. book name)</label>
                <input type="text" name="quote_source" id="quote-source">
              </div>
              <div>
                <label for="quote-source-url">Provide the URL of the quote source, if available.</label>
                <input type="url" name="quote_source_url" id="quote-source-url">
              </div>
              <input type="submit" value="Submit Quote">
            </form>
          </div><!-- .quote-submission-wrapper -->


          <?php else: ?>
          <p>Sorry, you must be logged in to submit a quote.</p>
          <p>
            <!-- %1s, 1 is saying get 1st value and s means string, so it will get esc_url -->
            <!-- %2s, 2 get 2nd value, click here to login and s is string -->
            <!-- http://php.net/manual/en/function.sprintf.php -->
            <?php echo sprintf( '<a href="%1s">%2s</a>', esc_url( wp_login_url() ), 'Click here to login.' ); ?>
          </p>
        <?php endif; ?>

      </section>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
