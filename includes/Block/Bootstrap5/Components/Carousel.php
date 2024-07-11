<?php
/**
 * Carousel class.
 *
 * @class   Carousel
 * @version 1.0.0
 * @package Isvek\Plugin\Block\Bootstrap5\Components
 */

namespace Isvek\Plugin\Block\Bootstrap5\Components;

use Isvek\Plugin\Block\BlockAbstract;
use WP_Block;

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'Isvek\Plugin\Block\Bootstrap5\Components\Carousel' ) ) {

	/**
	 * Carousel class.
	 */
	class Carousel extends BlockAbstract {

		/**
		 * @var string
		 */
		public string $block_name = 'carousel';

		/**
		 * Метод для инициализации.
		 *
		 * @since 1.0.0
		 */
		public function init() {
			$this->block_dir_path = $this->get_blocks_dir_path( 'bootstrap5/components' );
		}

		/**
		 * Метод для добавления скриптов в административной части.
		 *
		 * @since 1.0.0
		 */
		public function admin_enqueue_scripts() {
			// TODO: Implement admin_enqueue_scripts() method.
		}

		/**
		 * Метод для добавления скриптов.
		 *
		 * @since 1.0.0
		 */
		public function enqueue_scripts() {
			// TODO: Implement enqueue_scripts() method.
		}

		/**
		 * Метод для отображения блока.
		 *
		 * @since 1.0.0
		 *
		 * @param string $content Содержимое блока.
		 * @param WP_Block $block Объект блока.
		 *
		 * @param array $attributes Атрибуты блока.
		 */
		public function render( array $attributes, string $content, WP_Block $block ): string {
			$className           = isset( $attributes['className'] ) ? '' . esc_attr( $attributes['className'] ) : '';
			$carouselVariantDark = $attributes['carouselVariantDark'] ? ' carousel-dark' : '';
			$carouselFade        = $attributes['carouselFade'] ? ' carousel-fade' : '';
			$carouselWrap        = $attributes['carouselWrap'] ? 'true' : 'false';
			$carouselPause       = $attributes['carouselPause'] ? 'hover' : 'false';
			$html                = '<div id="carousel-' . $attributes['blockId'] . '"
										class="' . $className . 'carousel' . $carouselVariantDark . ' slide' . $carouselFade . '"
										data-bs-ride="carousel"
										data-bs-interval="' . ( $attributes['carouselInterval'] * 1000 ) . '"
										data-bs-wrap="' . $carouselWrap . '"
										data-bs-pause="' . $carouselPause . '">';
			$html                .= '<div class="carousel-inner">';
			$count               = 0;

			if ( ! empty( $attributes['carouselImages'] ) ) {

				if ( $attributes['carouselIndicators'] ) {

					$html .= '<div class="carousel-indicators">';

					for ( $i = 0; $i < count( $attributes['carouselImages'] ); $i ++ ) {
						if ( $i === 0 ) {
							$html .= '<button type="button" data-bs-target="#carousel-' . $attributes['blockId'] . '" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>';
						} else {
							$html .= '<button type="button" data-bs-target="#carousel-' . $attributes['blockId'] . '" data-bs-slide-to="' . $i . '" aria-label="Slide ' . $i . '"></button>';
						}
					}
					$html .= '</div>';
				}

				foreach ( $attributes['carouselImages'] as $image ) {
					$active = $count === 0 ? ' active' : '';

					$html .= '<div class="carousel-item' . $active . '">';

					if ( $attributes['carouselUrl'] ) {
						if ( filter_var( $image['url'], FILTER_VALIDATE_URL ) !== false ) {
							$html .= '<a href="' . $image['url'] . '" class="stretched-link">';
						}
					}

					$html .= wp_get_attachment_image(
						$image['id'],
						'full',
						false,
						[
							'class' => 'd-block img-fluid w-100',
							'href'  => $image['url']
						]
					);

					if ( $attributes['carouselCaption'] ) {

						$html .= '<div class="carousel-caption d-none d-md-block">';

						if ( ! empty( $image['caption'] ) ) {
							$html .= '<h5>' . $image['caption'] . '</h5>';
						}

						if ( ! empty( $image['description'] ) ) {
							$html .= '<p>' . $image['description'] . '</p>';
						}

						$html .= '</div>';
					}

					if ( $attributes['carouselUrl'] ) {
						if ( filter_var( $image['url'], FILTER_VALIDATE_URL ) !== false ) {
							$html .= '</a>';
						}
					}

					$html .= '</div>';
					$count ++;
				}
			}

			$html .= '</div>';

			if ( $attributes['carouselControls'] ) {
				$html .= '<button class="position-absolute stretched-no-link carousel-control-prev" type="button" data-bs-target="#carousel-' . $attributes['blockId'] . '" data-bs-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span></button>';
				$html .= '<button class="position-absolute stretched-no-link carousel-control-next" type="button" data-bs-target="#carousel-' . $attributes['blockId'] . '" data-bs-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span></button>';
			}

			$html .= '</div>';

			return $html;
		}
	}
}
