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

// Remove 'Additional Information' tab from product page
add_filter('woocommerce_product_tabs', 'remove_additional_information_tab', 98);
function remove_additional_information_tab($tabs) {
    // Remove the additional information tab
    unset($tabs['additional_information']);
    return $tabs;
}

// Add custom js file in order to make jigsaw category link open in a new tab
function my_custom_enqueue_scripts() {
    wp_enqueue_script('my-custom-script', get_stylesheet_directory_uri() . '/custom-script.js', array(), false, true);
}
add_action('wp_enqueue_scripts', 'my_custom_enqueue_scripts', 99);

// custom product variations
function my_custom_enqueue_scripts_2() {
    wp_enqueue_script('custom-conditional-rendering', get_stylesheet_directory_uri() . '/js/custom-conditional-rendering.js', array(), false, true);
}
add_action('wp_enqueue_scripts', 'my_custom_enqueue_scripts_2', 99);


// Refresh shipping zone on address change 
add_action( 'woocommerce_after_checkout_form', 'refresh_shipping_on_address_change' );

function refresh_shipping_on_address_change() {
    wc_enqueue_js("
        jQuery( function( $ ) {
            $('form.checkout').on( 'change', 'select#billing_state, #shipping_postcode, #shipping_country', function() {
                $('body').trigger('update_checkout');
            });
        });
    ");
}

// show empty product categories
const galleryCategoryId = 359;
const calendarCategoryId = 23;
const puzzlesCategoryId = 383;
const greetingCardsCategoryId = 402;

add_filter('woocommerce_product_subcategories_hide_empty', 'custom_hide_empty_categories', 10, 1);
function custom_hide_empty_categories($hide_empty) {
    return false;
}
add_filter('woocommerce_product_subcategories_args', 'custom_include_specific_category', 10, 1);
function custom_include_specific_category($args) {
    if (is_shop()) {
        $args['include'] = array(galleryCategoryId, calendarCategoryId, puzzlesCategoryId, greetingCardsCategoryId); 
    }
    return $args;
}

// make jigsaw puzzles category an external link 
add_filter('term_link', 'custom_category_link', 10, 3);
function custom_category_link($url, $term, $taxonomy) {
    if ($taxonomy === 'product_cat' && $term->slug === 'puzzles') {
        return 'https://jigsawgallery.com.au/collections/lotje-mcdonald?fbclid=IwAR1cNAywAyebL0l1Jz5NP9lEZ2a5ES6uSzLfif9jlzo2Qto-URgDHDYi-Nc';
    }
    return $url;
}

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

 // REMOVE ADDRESS FROM LOCAL PICKUP
 
// Function to remove billing and shipping addresses for local pickup orders
function hide_address_for_local_pickup( $order_id ) {
    $order = wc_get_order( $order_id );

    // Check if the shipping method is 'Local Pickup'
    $shipping_methods = $order->get_shipping_methods();
    $is_local_pickup = false;
    foreach ( $shipping_methods as $shipping_method ) {
        if ( strpos( $shipping_method->get_method_id(), 'local_pickup' ) !== false ) {
            $is_local_pickup = true;
            break;
        }
    }

    // Remove addresses if it's a local pickup
    if ( $is_local_pickup ) {
        add_filter( 'woocommerce_order_get_formatted_billing_address', '__return_empty_string', 10, 2 );
        add_filter( 'woocommerce_order_get_formatted_shipping_address', '__return_empty_string', 10, 2 );
    }
}
add_action( 'woocommerce_thankyou', 'hide_address_for_local_pickup', 10, 1 );
add_action( 'woocommerce_view_order', 'hide_address_for_local_pickup', 10, 1 );
add_action( 'woocommerce_checkout_order_processed', 'hide_address_for_local_pickup', 10, 1 );

// Optionally hide the addresses on the email as well
function hide_address_for_local_pickup_in_email( $order, $sent_to_admin, $plain_text, $email ) {
    // Check if the shipping method is 'Local Pickup'
    $shipping_methods = $order->get_shipping_methods();
    $is_local_pickup = false;
    foreach ( $shipping_methods as $shipping_method ) {
        if ( strpos( $shipping_method->get_method_id(), 'local_pickup' ) !== false ) {
            $is_local_pickup = true;
            break;
        }
    }

    // Remove addresses if it's a local pickup
    if ( $is_local_pickup ) {
        add_filter( 'woocommerce_order_get_formatted_billing_address', '__return_empty_string', 10, 2 );
        add_filter( 'woocommerce_order_get_formatted_shipping_address', '__return_empty_string', 10, 2 );
    }
}
add_action( 'woocommerce_email_order_details', 'hide_address_for_local_pickup_in_email', 10, 4 );


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
