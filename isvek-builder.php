<?php
/**
 * Plugin Name: Isvek Builder
 * Plugin URI: http://isvek.ru/
 * Description: Дополнение к теме isvek-theme.
 * Version: 1.0.0
 * Author: veks
 * Requires PHP: 7.4
 * Domain Path: /languages
 * Author URI: https://github.com/veks
 * License: GPLv2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 *
 * @package   Isvek\Plugin
 * @author    vek
 * @copyright 2023 Isvek
 * @license   GPL-2.0-or-later
 */

defined( 'ABSPATH' ) || exit;

/**
 * Константы
 */
if ( ! defined( 'ISVEK_PLUGIN_FILE' ) ) {
	define( 'ISVEK_PLUGIN_FILE', __FILE__ );
}

/**
 * Isvek Plugin работает только в версии PHP 7.4 или новее.
 */
if ( version_compare( PHP_VERSION, '7.4', '<' ) ) {
	add_action( 'admin_notices', function () {
		echo sprintf(
			'<div class="notice notice-error is-dismissible"><p>Для работы плагина <strong>Isvek</strong> требуется минимум версия <strong>%1$s</strong> PHP. У Вас <strong>%2$s</strong> PHP версия.</p></div>',
			'7.4',
			PHP_VERSION
		);
	} );
} else {
	define( 'ISVEK_PLUGIN_VERSION', '1.0.0' );
	define( 'ISVEK_PLUGIN_DB_VERSION', '168' );
	define( 'ISVEK_PLUGIN_DB_OLD_VERSION', false );

	if ( is_readable( __DIR__ . '/vendor/autoload.php' ) ) {
		require __DIR__ . '/vendor/autoload.php';
	}

	if ( class_exists( 'Isvek\Plugin\Loader' ) ) {
		register_activation_hook( ISVEK_PLUGIN_FILE, 'isvek_plugin_activation_hook' );
		register_deactivation_hook( ISVEK_PLUGIN_FILE, 'isvek_deactivation_hook' );
		register_uninstall_hook( ISVEK_PLUGIN_FILE, 'isvek_plugin_uninstall_hook' );

		$loader = new Isvek\Plugin\Loader();

		$loader->set( [
			Isvek\Plugin\Setup::class,

			/**
			 * Admin
			 */
			Isvek\Plugin\Admin\Menu::class,
			Isvek\Plugin\Admin\Settings::class,
			Isvek\Plugin\Admin\Pages\Basic::class,
			Isvek\Plugin\Admin\Pages\Blocks::class,
			Isvek\Plugin\Admin\Pages\ContactForms::class,
			Isvek\Plugin\Admin\Pages\TelegramBot::class,

			/**
			 * ContactForms
			 */
			Isvek\Plugin\ContactForms\ContactForms::class,

			/**
			 * TelegramBot
			 */
			Isvek\Plugin\TelegramBot\TelegramBot::class,

			/**
			 * Blocks
			 */
			Isvek\Plugin\Block\Bootstrap5\Components\Carousel::class,
			Isvek\Plugin\Block\Bootstrap5\Components\Cards::class,
			Isvek\Plugin\Block\Bootstrap5\Layout\Container::class,
			Isvek\Plugin\Block\Bootstrap5\Layout\Row::class,
			Isvek\Plugin\Block\Bootstrap5\Layout\Column::class,
			Isvek\Plugin\Block\ContactForms\ContactForms::class,
			Isvek\Plugin\Block\ContactForms\ContactFormsBuilder::class,
			Isvek\Plugin\Block\Yandex\Maps::class,

			/**
			 * AI
			 */
			Isvek\Plugin\Ai\PhpDoc\PhpDoc::class
		] )->init();
	}
}
