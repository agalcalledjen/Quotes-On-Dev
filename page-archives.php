<?php
/**
 * The template for displaying archives.
 *
 * @package QOD_Starter_Theme
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

      <section class="browse-archives">
        <header class="entry-header">
          <?php the_title('<h1 class="entry-title">', '</h1>'); ?>
        </header> 

        <!-- holds all the authors -->
        <div class="post-archives">
          <h2>Quote Authors</h2>
          <ul>
            <!-- create custom loop -->
            <?php 
              // -1 means get all of the posts
              // think of css grid
              //  use -1 to get last one
              $posts = get_posts( 'posts_per_page=-1' );
              // setup_postdata allows us to use template tags
              foreach( $posts as $post ) : setup_postdata( $post );
            ?>

            <!-- every time we loop thru this, we want to output a list item -->
            <li>
              <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
            </li>

            <?php endforeach; wp_reset_postdata(); ?>
            <!-- bc we're using a custom loop, we want to use a reset it at end of loop so we don't mess with the other data -->
          </ul>
        </div><!-- .post-archives -->

        <div class="cat-archives">
          <h2>Categories</h2>
          <ul>
            <!-- title_li= title of list item will be empty -->
            <?php wp_list_categories( 'title_li=' ); ?>
          </ul>
        </div><!-- .cat-archives -->

        <div class="tag-archives">
          <h2>Tags</h2>
          <?php 
            // gets all the tags and by default will list them in diff sizes depending on how many times tags are used, so we use an array to make them all the same size
            wp_tag_cloud( array( 
              'smallest' => 1,
              'largest' => 1,
              'unit' => 'rem',
              'format' => 'list'
             ) ); 
          ?>
        </div><!-- .tag-archives -->
      </section>

      <!-- create custom loop -->
      
		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
