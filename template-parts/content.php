<?php
/**
 * Template part for displaying posts.
 *
 * @package QOD_Starter_Theme
 */

// to get meta data from db
// similar to custom field 
$source = get_post_meta( get_the_ID(), '_qod_quote_source', true );
$source_url = get_post_meta( get_the_ID(), '_qod_quote_source_url', true );

// To test whether variables are working
// similar to console.log
// var_dump( $source_url );
// since we know the above variables are working, we can use them in our article below
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<div class="entry-content">
		<?php the_content(); ?>
	</div><!-- .entry-content -->

  <div class="entry-meta">
  <!-- &mdash: hyphen -->
    <?php the_title( '<h2 class="entry-title">&mdash; ', '</h2>' ); ?>

    <?php if( $source && $source_url ): ?>
    <!-- if both exist -->
      <span class="source">, <a href="<?php echo $source_url; ?>" target="_blank"><?php echo $source; ?></a></span>
    <?php elseif( $source ): ?>
    <!-- if only source exists -->
      <span class="source">, <?php echo $source; ?></span>
    <?php else: ?>
    <span class="source"></span>
    <?php endif; ?>

  </div><!-- .entry-meta -->

</article><!-- #post-## -->

<?php
  // if it is homepage or single post type, output a button
  if( is_home() || is_single() ): ?>
    <button type="button" id="new-quote-btn">Show Me Another!</button>
  <?php endif; ?>
