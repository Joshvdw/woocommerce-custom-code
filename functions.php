<?php

//  adding theme support for altering woocommerce files
add_theme_support('woocommerce');

/* enqueue scripts and style from parent theme */

function my_theme_enqueue_styles() {
    wp_register_style( 'parent-style', get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array( 'parent-style' ),
        wp_get_theme()->get('Version')
    );
}
add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_styles' );

// Remove the category count for WooCommerce categories
add_filter( 'woocommerce_subcategory_count_html', '__return_null' );

// Add custom js file in order to make jigsaw category link open in a new tab
function my_custom_enqueue_scripts() {
    wp_enqueue_script('my-custom-script', get_stylesheet_directory_uri() . '/custom-script.js', array(), false, true);
}
add_action('wp_enqueue_scripts', 'my_custom_enqueue_scripts', 99);


// change search placeholder
function html5_search_form( $form ) { 
     $form = '<section class="search"><form role="search" method="get" id="search-form" action="' . home_url( '/' ) . '" >
    <label class="screen-reader-text" for="s">' . __('',  'domain') . '</label>
     <input type="search" value="' . get_search_query() . '" name="s" id="s" placeholder="search products..." />
     <input type="submit" id="searchsubmit" value="'. esc_attr__('Go', 'domain') .'" />
     </form></section>';
     return $form;
}
 add_filter( 'get_search_form', 'html5_search_form' );

// /**
// * apply_filters
// * @link https://developer.wordpress.org/reference/hooks/login_redirect/
// * Filters the login redirect URL.
// * @param String $redirect_to The redirect destination URL.
// * @param String $requested_redirect_to The requested redirect destination URL passed as a parameter.
// * @param Object $user WP_User object if login was successful, WP_Error object otherwise.
// */
// add_filter( 'login_redirect', function ( $redirect_to, $requested_redirect_to, $user ) {

//   if ( $user && is_object( $user ) && is_a( $user, 'WP_User' ) && $user->has_cap( 'update_core' ) )

//     return $redirect_to = esc_url( home_url() );

// }, 10, 3 );