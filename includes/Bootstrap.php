<?php
/**
 * Bootstrap class.
 *
 * @class   Bootstrap
 * @version 1.0.0
 * @package Isvek\Plugin
 */

namespace Isvek\Plugin;

use Isvek\Plugin\Traits\Utility;

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'Isvek\Plugin\Bootstrap' ) ) {

	/**
	 * Bootstrap class.
	 */
	class Bootstrap {
		use Utility;
	}
}

