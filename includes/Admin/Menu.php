<?php
/**
 * Menu class.
 *
 * @class       Menu
 * @version     1.0.0
 * @package     Isvek\Plugin\Admin
 */

namespace Isvek\Plugin\Admin;

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'Isvek\Plugin\Admin\Menu' ) ) {

	/**
	 * Menu class.
	 */
	class Menu extends Admin {

		/**
		 * @var int
		 */
		protected int $position = 80;

		/**
		 * Конструктор.
		 *
		 * @return void
		 * @since 1.0.0
		 */
		public function __construct() {
			if ( is_admin() ) {
				add_action( 'admin_menu', [ $this, 'admin_menu' ] );
			}
		}

		/**
		 * Добавляем меню.
		 *
		 * @return void
		 *
		 * @since 1.0.0
		 */
		public function admin_menu() {
			add_menu_page(
				'Плагин ' . $this->get_name(),
				$this->get_name(),
				$this->get_capability(),
				$this->get_slug(),
				[ $this, 'page' ],
				null,
				$this->position
			);
		}

		/**
		 * Функция для отображения страницы настроек плагина.
		 *
		 * Эта функция отображает страницу настроек плагина.
		 *
		 * @since 1.0.0
		 */
		public function page() {
			include_once __DIR__ . '/views/html-admin-page-main.php';
		}
	}
}
