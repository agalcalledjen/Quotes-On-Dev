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
  if( is_home() || is_single() && !is_admin() && $query->is_main_query ){
    $query->set( 'orderby', 'rand' );
    $query->set( 'posts_per_page', 1 );
    $query->set( 'order', 'ASC' );
  }

  // modifying archives
 
  if (
    is_archive() && 
    !is_admin() && $query->is_main_query() ) {
      $query->set( 'posts_per_page', 5 );
  }

  if( 
    is_search() && 
    !is_admin() && $query->is_main_query() ){
      $query->set( 'posts_per_page', 10 );
  }

}
add_action( 'pre_get_posts', 'qod_modify_archives' );

/**
 * Remove pages from search results
 */ 
function qod_modify_search($query) {
  if ( $query->is_main_query() && is_search() && !is_admin()) {
      $query->set( 'post_type', 'post' );
  }
  return $query;
}
add_filter( 'pre_get_posts','qod_modify_search' );

