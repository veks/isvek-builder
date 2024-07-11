<?php
/**
 * Cards class.
 *
 * @class   Cards
 * @version 1.0.0
 * @package Isvek\Plugin\Block\Bootstrap5\Components
 */

namespace Isvek\Plugin\Block\Bootstrap5\Components;

use Isvek\Plugin\Block\BlockAbstract;
use WP_Block;

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'Isvek\Plugin\Block\Bootstrap5\Components\Cards' ) ) {

	/**
	 * Cards class.
	 */
	class Cards extends BlockAbstract {

		/**
		 * @var string
		 */
		public string $block_name = 'cards';

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
		 * @param array $attributes Атрибуты блока.
		 */
		public function render( array $attributes, string $content, WP_Block $block ) {
			return $content;
		}
	}
}
