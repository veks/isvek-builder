<?php
/**
 * TelegramBot class.
 *
 * @class   TelegramBot
 * @version 1.0.0
 * @package Isvek\Plugin\TelegramBot
 */

namespace Isvek\Plugin\TelegramBot;

defined( 'ABSPATH' ) || exit;

use Longman\TelegramBot\Exception\TelegramException;
use Longman\TelegramBot\Request;
use Longman\TelegramBot\Telegram;
use WP_Error;
use WP_REST_Request;
use WP_REST_Response;

/**
 * TelegramBot class.
 */
class TelegramBot {

	/**
	 * @var string
	 */
	protected string $namespace = 'ip_telegram_bot/v1';

	/**
	 * @var string
	 */
	protected string $option_name = 'isvek_plugin_settings_telegram_bot';

	/**
	 * @var Telegram
	 */
	protected Telegram $telegram;

	/**
	 * @var string|null
	 */
	protected ?string $hook_url = '';

	/**
	 * @var string|null
	 */
	protected string $api_key;

	/**
	 * @var string|null
	 */
	protected string $secret_key = '';

	/**
	 * @var string|null
	 */
	protected string $bot_username = '';

	/**
	 * Конструктор класса.
	 *
	 * Этот конструктор инициализирует свойства класса на основе настроек плагина и создает новый объект Telegram.
	 * Он также добавляет действие 'rest_api_init', которое вызывает функцию 'rest_api_init'.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		$this->secret_key   = isvek_plugin_get_option( $this->option_name, 'secret_key' );
		$this->api_key      = isvek_plugin_get_option( $this->option_name, 'api_key' );
		$this->bot_username = isvek_plugin_get_option( $this->option_name, 'bot_username' );
		$this->hook_url     = home_url( "/wp-json/$this->namespace/hook/$this->secret_key", 'https' );

		if ( ! empty( $this->secret_key ) && ! empty( $this->api_key ) && ! empty( $this->bot_username ) ) {
			try {
				$this->telegram = new Telegram( $this->api_key, $this->bot_username );

				add_action( 'rest_api_init', [ $this, 'rest_api_init' ] );
				add_filter( 'isvek_plugin_telegram_send_message', [ $this, 'send_message' ], 10, 2 );

			} catch ( TelegramException $e ) {
				error_log( $e->getMessage() );
			}
		}
	}

	/**
	 * Функция для инициализации REST API маршрутов.
	 *
	 * Эта функция регистрирует несколько маршрутов REST API для обработки веб-хуков Telegram.
	 * Каждый маршрут связан с определенной функцией обратного вызова и имеет свои собственные параметры и разрешения.
	 *
	 * @since 1.0.0
	 */
	public function rest_api_init() {
		register_rest_route(
			$this->namespace,
			'set_web_hook/(?P<secret_key>[\w\-]+)', [
				'methods'             => [ 'GET' ],
				'callback'            => [ $this, 'set_web_hook' ],
				'permission_callback' => [ $this, 'permissions_callback' ],
				'args'                => [
					'secret_key' => [
						'type'     => 'string',
						'required' => true,
					]
				]
			]
		);

		register_rest_route(
			$this->namespace,
			'delete_web_hook/(?P<secret_key>[\w\-]+)', [
				'methods'             => [ 'GET' ],
				'callback'            => [ $this, 'delete_web_hook' ],
				'permission_callback' => [ $this, 'permissions_callback' ],
				'args'                => [
					'secret_key' => [
						'type'     => 'string',
						'required' => true,
					]
				]
			]
		);

		register_rest_route(
			$this->namespace,
			'hook/(?P<secret_key>[\w\-]+)', [
				'methods'             => [ 'GET', 'POST' ],
				'callback'            => [ $this, 'hook' ],
				'permission_callback' => '__return_true',
				'args'                => [
					'secret_key' => [
						'type'     => 'string',
						'required' => true,
					]
				]
			]
		);

		register_rest_route(
			$this->namespace,
			'web_hook_info/(?P<secret_key>[\w\-]+)', [
				'methods'             => [ 'GET' ],
				'callback'            => [ $this, 'web_hook_info' ],
				'permission_callback' => [ $this, 'permissions_callback' ],
				'args'                => [
					'secret_key' => [
						'type'     => 'string',
						'required' => true,
					]
				]
			]
		);
	}

	/**
	 * Функция обратного вызова для проверки разрешений.
	 *
	 * Эта функция проверяет, имеет ли текущий пользователь роль 'administrator'.
	 *
	 * @since 1.0.0
	 *
	 * @param WP_REST_Request $request Текущий запрос REST.
	 *
	 * @return bool Возвращает true, если текущий пользователь является администратором, иначе false.
	 */
	public function permissions_callback( WP_REST_Request $request ): bool {
		return current_user_can( 'administrator' );
	}

	/**
	 * Функция обратного вызова для установки веб-хука.
	 *
	 * Эта функция устанавливает веб-хук Telegram, если переданный секретный ключ совпадает с секретным ключом этого класса.
	 * В случае ошибки она возвращает объект WP_Error с сообщением об ошибке.
	 *
	 * @since 1.0.0
	 *
	 * @param WP_REST_Request $request Текущий запрос REST.
	 *
	 * @return WP_REST_Response|WP_Error Возвращает объект WP_REST_Response в случае успеха или объект WP_Error в случае ошибки.
	 */
	public function set_web_hook( WP_REST_Request $request ) {
		$secret_key = $request->get_param( 'secret_key' );

		if ( $this->secret_key === $secret_key ) {
			try {
				return rest_ensure_response( $this->telegram->setWebhook( $this->hook_url ) );
			} catch ( TelegramException $e ) {
				return new WP_Error( 'error', $e->getMessage(), [ 'status' => 404 ] );
			}
		} else {
			return new WP_Error( 'error', 'Подходящий маршрут для URL и метода запроса не найден.', [ 'status' => 404 ] );
		}
	}

	/**
	 * Функция обратного вызова для удаления веб-хука.
	 *
	 * Эта функция удаляет веб-хук Telegram, если переданный секретный ключ совпадает с секретным ключом этого класса.
	 * В случае ошибки она возвращает объект WP_Error с сообщением об ошибке.
	 *
	 * @since 1.0.0
	 *
	 * @param WP_REST_Request $request Текущий запрос REST.
	 *
	 * @return WP_REST_Response|WP_Error Возвращает объект WP_REST_Response в случае успеха или объект WP_Error в случае ошибки.
	 */
	public function delete_web_hook( WP_REST_Request $request ) {
		$secret_key = $request->get_param( 'secret_key' );

		if ( $this->secret_key === $secret_key ) {
			try {
				return rest_ensure_response( $this->telegram->deleteWebhook() );
			} catch ( TelegramException $e ) {
				return new WP_Error( 'error', $e->getMessage(), [ 'status' => 404 ] );
			}
		} else {
			return new WP_Error( 'error', 'Подходящий маршрут для URL и метода запроса не найден.', [ 'status' => 404 ] );
		}
	}

	/**
	 * Функция обратного вызова для обработки веб-хука.
	 *
	 * Эта функция обрабатывает входящие обновления от Telegram, если переданный секретный ключ совпадает с секретным ключом этого класса.
	 * Она включает администраторов, добавляет пути команд и включает ограничитель.
	 * В случае ошибки она возвращает объект WP_Error с сообщением об ошибке.
	 *
	 * @since 1.0.0
	 *
	 * @param WP_REST_Request $request Текущий запрос REST.
	 *
	 * @return WP_REST_Response|WP_Error Возвращает объект WP_REST_Response в случае успеха или объект WP_Error в случае ошибки.
	 */
	public function hook( WP_REST_Request $request ) {
		$secret_key = $request->get_param( 'secret_key' );

		if ( $this->secret_key === $secret_key ) {
			try {
				$admins = isvek_plugin_get_option( $this->option_name, 'admins' );

				if ( ! empty( $admins ) ) {
					$explode_admins = explode( ',', $admins );
					$this->telegram->enableAdmins( $explode_admins );
				}

				$this->telegram->addCommandsPaths( [ __DIR__ . '/Commands' ] );
				$this->telegram->enableLimiter( [ 'enabled' => true ] );

				return rest_ensure_response( $this->telegram->handle() );
			} catch ( TelegramException $e ) {
				return new WP_Error( 'error', $e->getMessage(), [ 'status' => 404 ] );
			}
		} else {
			return new WP_Error( 'error', 'Подходящий маршрут для URL и метода запроса не найден.', [ 'status' => 404 ] );
		}
	}

	/**
	 * Функция обратного вызова для получения информации о веб-хуке.
	 *
	 * Эта функция возвращает информацию о текущем веб-хуке Telegram, если переданный секретный ключ совпадает с секретным ключом этого класса.
	 * В случае ошибки она возвращает объект WP_Error с сообщением об ошибке.
	 *
	 * @since 1.0.0
	 *
	 * @param WP_REST_Request $request Текущий запрос REST.
	 *
	 * @return WP_REST_Response|WP_Error Возвращает объект WP_REST_Response в случае успеха или объект WP_Error в случае ошибки.
	 */
	public function web_hook_info( WP_REST_Request $request ) {
		$secret_key = $request->get_param( 'secret_key' );

		if ( $this->secret_key === $secret_key ) {
			try {
				return rest_ensure_response( Request::getWebhookInfo() );
			} catch ( TelegramException $e ) {
				return new WP_Error( 'error', $e->getMessage(), [ 'status' => 404 ] );
			}
		} else {
			return new WP_Error( 'error', 'Подходящий маршрут для URL и метода запроса не найден.', [ 'status' => 404 ] );
		}
	}

	/**
	 * Метод для отправки сообщения подписчикам.
	 *
	 * Этот метод принимает текст сообщения и разметку ответа в качестве аргументов.
	 * Он получает список подписчиков из опции 'isvek_plugin_telegram_bot_subscribers' и отправляет каждому подписчику сообщение.
	 * Если текст сообщения не указан, сообщение не будет отправлено.
	 * Если разметка ответа указана, она будет добавлена к сообщению.
	 *
	 * @since 1.0.0
	 *
	 * @param string $text Текст сообщения (по умолчанию пустой).
	 * @param mixed $reply_markup Разметка ответа.
	 */
	public function send_message( string $text, $reply_markup ) {
		$subscribers = get_option( 'isvek_plugin_telegram_bot_subscribers' ) ?? [];

		if ( is_array( $subscribers ) && ! empty( $subscribers ) ) {
			foreach ( $subscribers as $id => $value ) {
				$data['chat_id']    = $id;
				$data['text']       = $text;
				$data['parse_mode'] = 'html';

				if ( ! empty( $reply_markup ) ) {
					$data['reply_markup'] = $reply_markup;
				}

				try {
					Request::sendMessage( $data );
				} catch ( TelegramException $e ) {
					error_log( $e->getMessage() );
				}
			}
		}
	}
}
