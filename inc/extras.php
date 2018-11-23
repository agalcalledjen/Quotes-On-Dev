<?php
/**
 * Custom functions that act independently of the theme templates.
 *
 * @package QOD_Starter_Theme
 */

/**
 * Removes Comments from admin menu.
 */
function qod_remove_admin_menus() {
    remove_menu_page( 'edit-comments.php' );
}
add_action( 'admin_menu', 'qod_remove_admin_menus' );

/**
 * Removes comments support from Posts and Pages.
 */
function qod_remove_comment_support() {
    remove_post_type_support( 'post', 'comments' );
    remove_post_type_support( 'page', 'comments' );
}
add_action( 'init', 'qod_remove_comment_support', 100 );

/**
 * Removes Comments from admin bar.
 */
function qod_admin_bar_render() {
    global $wp_admin_bar;
    $wp_admin_bar->remove_menu('comments');
}
add_action( 'wp_before_admin_bar_render', 'qod_admin_bar_render' );

/**
 * Removes Comments-related metaboxes.
 */
function qod_remove_comments_meta_boxes() {
	remove_meta_box( 'commentstatusdiv', 'post', 'normal' );
	remove_meta_box( 'commentsdiv', 'post', 'normal' );
	remove_meta_box( 'trackbacksdiv', 'post', 'normal' );
}
add_action( 'admin_init', 'qod_remove_comments_meta_boxes' );

/**
 * Filter the Post Archives including the default blog loop
 */
function qod_modify_archives( $query ) {
  // use if stmt to modify only homepage, single post and to make sure it's the main query
  // we don't want it to mess with other queries
  if( is_home() || is_single() && !is_admin() && $query->is_main_query ){
    // if those conditions are met, order posts randomly
    $query->set( 'orderby', 'rand' );
    // if those if conditions are met, only show one post
    $query->set( 'posts_per_page', 1 );
    // optional, order by ascending
    $query->set( 'order', 'ASC' );
  }

  // modifying archives
  if( 
    is_tag() && 
    !is_admin() && $query->is_main_query() ){
      $query->set( 'posts_per_page', 10 );
  } elseif (
    is_archive() && 
    !is_admin() && $query->is_main_query() ) {
      $query->set( 'posts_per_page', 5 );
  }
}
// pre_get_posts runs before getting the actual posts
add_action( 'pre_get_posts', 'qod_modify_archives' );

