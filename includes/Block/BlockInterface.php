<?php
/**
 * BlockInterface interface.
 *
 * @interface   BlockInterface
 * @version 1.0.0
 * @package Isvek\Plugin\Block
 */

namespace Isvek\Plugin\Block;

use WP_Block;

if ( ! interface_exists( 'Isvek\Plugin\Block\BlockInterface' ) ) {

	/**
	 * Интерфейс BlockInterface.
	 *
	 * Этот интерфейс определяет методы, которые должны быть реализованы в классе блока.
	 *
	 * @since 1.0.0
	 */
	interface BlockInterface {

		/**
		 * Метод для регистрации.
		 *
		 * @since 1.0.0
		 */
		public function register();

		/**
		 * Метод для инициализации.
		 *
		 * @since 1.0.0
		 */
		public function init();

		/**
		 * Метод для добавления скриптов в административной части.
		 *
		 * @since 1.0.0
		 */
		public function admin_enqueue_scripts();

		/**
		 * Метод для добавления скриптов.
		 *
		 * @since 1.0.0
		 */
		public function enqueue_scripts();

		/**
		 * Метод для отображения блока.
		 *
		 * @since 1.0.0
		 *
		 * @param array $attributes Атрибуты блока.
		 * @param string $content Содержимое блока.
		 * @param WP_Block $block Объект блока.
		 */
		public function render( array $attributes, string $content, WP_Block $block );
	}
}
