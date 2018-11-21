<?php
/**
 * The template for displaying the footer.
 *
 * @package QOD_Starter_Theme
 */

?>

			</div><!-- #content -->

			<footer id="colophon" class="site-footer" role="contentinfo">
        
        <nav id="site-navigation" class="main-navigation" role="navigation">
					<button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><?php echo esc_html( 'Primary Menu' ); ?></button>
					<?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_id' => 'primary-menu', 'depth' => 1) ); ?>
				</nav><!-- #site-navigation -->
				
        <div class="site-info">
          <span>Brought to you by</span>
					<a href="<?php echo esc_url( 'https://nejmal.github.com/project-05' ); ?>"><?php printf( esc_html( ' Jennifer Lam' ) ); ?></a>
				</div><!-- .site-info -->
			
      </footer><!-- #colophon -->
		</div><!-- #page -->

		<?php wp_footer(); ?>

	</body>
</html>
