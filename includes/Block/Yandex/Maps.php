<?php
/**
 * Maps class.
 *
 * @class   Maps
 * @version 1.0.0
 * @package Isvek\Plugin\Block\Yandex
 */

namespace Isvek\Plugin\Block\Yandex;

use Isvek\Plugin\Block\BlockAbstract;
use WP_Block;

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'Isvek\Plugin\Block\Yandex\Maps' ) ) {

	/**
	 * YandexMaps class.
	 */
	class Maps extends BlockAbstract {

		/**
		 * @var string
		 */
		public string $block_name = 'yandex-maps';

		/**
		 * Метод для инициализации.
		 *
		 * @since 1.0.0
		 */
		public function init() {
			// TODO: Implement init() method.
		}

		/**
		 * Метод для добавления скриптов в административной части.
		 *
		 * @since 1.0.0
		 */
		public function admin_enqueue_scripts() {
			wp_localize_script(
				'isvek-plugin-blocks-yandex-maps-editor-script',
				'isvekPluginYandexMapsArgs',
				[
					'key' => isvek_plugin_get_option( $this->block_option_name, 'yandex-maps-key' )
				]
			);
		}

		/**
		 * Метод для добавления скриптов.
		 *
		 * @since 1.0.0
		 */
		public function enqueue_scripts() {
			wp_register_script(
				$this->block_category_slug . '-' . $this->block_name,
				$this->dir_url_js . 'yandex-maps.min.js',
				false,
				$this->get_version(),
				true
			);

			wp_localize_script(
				$this->block_category_slug . '-' . $this->block_name,
				'isvekPluginYandexMapsArgs',
				[
					'key' => isvek_plugin_get_option( $this->block_option_name, 'yandex-maps-key' )
				]
			);

			if ( has_block( $this->block_category_slug . "/" . $this->block_name ) || isvek_plugin_is_active_block_widget( $this->block_category_slug . "/" . $this->block_name ) ) {
				wp_enqueue_script( $this->block_category_slug . '-' . $this->block_name );
			}
		}

		/**
		 * Метод для отображения блока.
		 *
		 * @since 1.0.0
		 *
		 * @param array $attributes Атрибуты блока.
		 * @param string $content Содержимое блока.
		 * @param WP_Block $block Объект блока.
		 */
		public function render( array $attributes, string $content, WP_Block $block ): string {
			$className = isset( $attributes['className'] ) ? array_to_css_classes( [ esc_attr( $attributes['className'] ) ] ) : '';

			return sprintf(
				'<div
							id="yandex-maps"
							class="yandex-maps%8$s yandex-maps-%9$s"
							style="width: %1$d%%; height: %2$dpx;"
							data-yandex-maps-coords="%3$s, %4$s"
							data-yandex-maps-zoom="%5$s"
							data-yandex-maps-placemarkColor="%6$s"
							data-yandex-maps-address="%7$s"><div class="yandex-maps-placeholder placeholder-glow w-100 h-100"><p class="placeholder w-100 h-100"></p></div></div>',
				$attributes['width'],
				$attributes['height'],
				$attributes['coords'][0],
				$attributes['coords'][1],
				$attributes['zoom'],
				$attributes['placemarkColor'],
				$attributes['address'],
				$className,
				$attributes['blockId']
			);
		}
	}
}
