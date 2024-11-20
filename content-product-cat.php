<?php
/**
 * The template for displaying product category thumbnails within loops
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/content-product-cat.php.
 *
 * @see     https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 4.7.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
?>
<li <?php wc_product_cat_class( '', $category ); ?>>
    <?php
    // Check if the category is "Jigsaw Puzzles" by ID
    if ( $category->term_id == 25 ) {
        // Link to the external URL instead of the category archive
        echo '<a href="https://jigsawgallery.com.au/collections/lotje-mcdonald?fbclid=IwAR1cNAywAyebL0l1Jz5NP9lEZ2a5ES6uSzLfif9jlzo2Qto-URgDHDYi-Nc" target="_blank">';
    } else {
        // Default category link
        echo '<a href="' . esc_url( get_term_link( $category, 'product_cat' ) ) . '">';
    }

    /**
     * The woocommerce_before_subcategory hook.
     *
     * @hooked woocommerce_template_loop_category_link_open - 10
     */
    do_action( 'woocommerce_before_subcategory', $category );

    /**
     * The woocommerce_before_subcategory_title hook.
     *
     * @hooked woocommerce_subcategory_thumbnail - 10
     */
    do_action( 'woocommerce_before_subcategory_title', $category );

    /**
     * The woocommerce_shop_loop_subcategory_title hook.
     *
     * @hooked woocommerce_template_loop_category_title - 10
     */
    do_action( 'woocommerce_shop_loop_subcategory_title', $category );

    /**
     * The woocommerce_after_subcategory_title hook.
     */
    do_action( 'woocommerce_after_subcategory_title', $category );

    /**
     * Close the category link.
     */
    echo '</a>';

    /**
     * The woocommerce_after_subcategory hook.
     *
     * @hooked woocommerce_template_loop_category_link_close - 10
     */
    do_action( 'woocommerce_after_subcategory', $category );
    ?>
</li>
