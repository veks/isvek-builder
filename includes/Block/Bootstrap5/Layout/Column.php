<?php
/**
 * Column class.
 *
 * @class   Column
 * @version 1.0.0
 * @package Isvek\Plugin\Block\Bootstrap5\Layout
 */

namespace Isvek\Plugin\Block\Bootstrap5\Layout;

use Isvek\Plugin\Block\BlockAbstract;
use WP_Block;

if ( ! class_exists( 'Isvek\Plugin\Block\Bootstrap5\Layout\Column' ) ) {

	/**
	 * Columns class.
	 */
	class Column extends BlockAbstract {

		/**
		 * @var string
		 */
		public string $block_name = 'column';

		/**
		 * Инициализирует функцию.
		 *
		 * Устанавливает путь к директории блоков.
		 *
		 * @since 1.0.0
		 */
		public function init() {
			$this->block_dir_path = $this->get_blocks_dir_path( 'bootstrap5/layout' );
		}

		/**
		 * Загружает скрипты и стили для административной части (административной панели).
		 *
		 * Этот метод позволяет загружать необходимые скрипты и стили для корректного функционирования административной части WordPress.
		 *
		 * @since 1.0.0
		 */
		public function admin_enqueue_scripts() {
			// TODO: Implement admin_enqueue_scripts() method.
		}

		/**
		 * Загружает все необходимые скрипты и стили для работы плагина.
		 *
		 * Метод enqueue_scripts() отвечает за добавление всех необходимых скриптов и стилей для
		 * работы плагина на странице. Этот метод вызывается во время инициализации плагина.
		 *
		 * @since 1.0.0
		 */
		public function enqueue_scripts() {
			// TODO: Implement enqueue_scripts() method.
		}

		/**
		 * Отображает содержимое блока.
		 *
		 * Метод отображает содержимое блока согласно переданным атрибутам и содержимому.
		 *
		 * @since 1.0.0
		 *
		 * @param string $content Содержимое блока.
		 * @param WP_Block $block Объект блока, содержащий информацию о блоке.
		 * @param array $attributes Ассоциативный массив атрибутов блока.
		 *
		 * @return string Возвращает содержимое блока.
		 */
		public function render( array $attributes, string $content, WP_Block $block ): string {
			return $content;
		}
	}
}
