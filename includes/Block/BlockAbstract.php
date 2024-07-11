<?php
/**
 * BlockAbstract abstract class.
 *
 * @abstract BlockAbstract
 * @version 1.0.0
 * @package Isvek\Plugin\Block
 */

namespace Isvek\Plugin\Block;

use Isvek\Plugin\Traits\Utility;
use WP_Block;

if ( ! class_exists( 'Isvek\Plugin\Block\BlockAbstract' ) ) {

	/**
	 * Абстрактный класс BlockAbstract.
	 *
	 * Этот абстрактный класс реализует интерфейс BlockInterface и определяет общие методы и свойства для блоков.
	 *
	 * @since 1.0.0
	 */
	abstract class BlockAbstract implements BlockInterface {

		use Utility;

		/**
		 * @var string
		 */
		public string $block_name;

		/**
		 * @var string
		 */
		protected string $block_option_name = 'isvek_plugin_settings_blocks';

		/**
		 * @var string
		 */
		protected string $block_dir_path;

		/**
		 * @var string
		 */
		protected string $block_category_slug;

		/**
		 * @var string
		 */
		protected string $dir_url_js;

		/**
		 * Конструктор класса.
		 *
		 * Этот конструктор инициализирует объект класса и добавляет необходимые действия WordPress.
		 *
		 * @since 1.0.0
		 */
		public function __construct() {
			$this->block_category_slug = $this->get_block_category_slug();
			$this->block_dir_path      = $this->get_blocks_dir_path();
			$this->dir_url_js          = $this->get_dir_url_js();

			add_action( 'init', [ $this, 'register' ], 11 );
			add_action( 'admin_enqueue_scripts', [ $this, 'admin_enqueue_scripts' ], 100 );
			add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ], 100 );

			$this->init();
		}

		/**
		 * Метод для регистрации блока.
		 *
		 * @since 1.0.0
		 */
		public function register() {
			if ( isset( $this->block_name ) ) {
				/*register_block_type_from_metadata(
					$this->block_dir_path . $this->block_name,
					[
						'render_callback' => [ $this, 'render' ]
					]
				);*/
				register_block_type(
					$this->block_dir_path . $this->block_name,
					[
						'render_callback' => [ $this, 'render' ]
					]
				);
			}
		}

		/**
		 * Абстрактный метод для инициализации.
		 *
		 * @since 1.0.0
		 */
		abstract public function init();

		/**
		 * Абстрактный метод для добавления скриптов в административной части.
		 *
		 * @since 1.0.0
		 */
		abstract function admin_enqueue_scripts();

		/**
		 * Абстрактный метод для добавления скриптов.
		 *
		 * @since 1.0.0
		 */
		abstract function enqueue_scripts();

		/**
		 * Абстрактный метод для отображения блока.
		 *
		 * @since 1.0.0
		 *
		 * @param array $attributes Атрибуты блока.
		 * @param string $content Содержимое блока.
		 * @param WP_Block $block Объект блока.
		 */
		abstract function render( array $attributes, string $content, WP_Block $block );
	}
}
