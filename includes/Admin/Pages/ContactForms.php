<?php
/**
 * ContactForms class.
 *
 * @class   ContactForms
 * @version 1.0.0
 * @package Isvek\Plugin\Admin\Pages
 */

namespace Isvek\Plugin\Admin\Pages;

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'Isvek\Plugin\Admin\Pages\ContactForms' ) ) {

	/**
	 * ContactForms class.
	 */
	class ContactForms {

		/**
		 * @var string
		 */
		protected string $id = 'contact_forms';

		/**
		 * @var string
		 */
		protected string $title = 'Контактная форма';

		/**
		 * @var string
		 */
		protected string $option_group = 'isvek_plugin_settings_option_group_contact_forms';

		/**
		 * @var string
		 */
		protected string $option_name = 'isvek_plugin_settings_contact_forms';

		/**
		 * @var string
		 */
		protected string $section_id = 'isvek_plugin_settings_section_contact_forms';

		/**
		 * Конструктор класса.
		 *
		 * Если текущий пользователь является администратором, добавляет фильтры для настроек плагина.
		 *
		 * @since 1.0.0
		 */
		public function __construct() {
			if ( is_admin() ) {
				add_filter( 'isvek_plugin_settings_tabs_array', [ $this, 'add_settings_page' ] );
				add_filter( 'isvek_plugin_options', [ $this, 'add_option' ] );
				add_filter( 'isvek_plugin_settings', [ $this, 'add_setting' ] );
				add_filter( 'isvek_plugin_validate_' . $this->option_name, [ $this, 'settings_validate' ] );
			}
		}

		/**
		 * Добавляет страницу настроек.
		 *
		 * Эта функция добавляет новую страницу настроек с идентификатором и заголовком текущего объекта.
		 *
		 * @since 1.0.0
		 *
		 * @param array $pages Массив существующих страниц настроек.
		 *
		 * @return array Массив страниц настроек после добавления новой страницы.
		 *
		 */
		public function add_settings_page( array $pages ): array {
			$pages[ $this->id ] = $this->title;

			return $pages;
		}

		/**
		 * Добавляет настройку.
		 *
		 * Эта функция добавляет новую настройку с идентификатором, названием группы опций, названием опции, разделом и полями текущего объекта.
		 *
		 * @since 1.0.0
		 *
		 * @param array $settings Массив существующих настроек.
		 *
		 * @return array Массив настроек после добавления новой настройки.
		 *
		 */
		public function add_setting( array $settings ): array {
			$settings[] = [
				'tab_id'       => $this->id,
				'option_group' => $this->option_group,
				'option_name'  => $this->option_name,
				'section'      => [
					'id'    => $this->section_id,
					'title' => $this->title,
					'order' => 1,
				],
				'fields'       => [
					[
						'id'      => 'google_key',
						'title'   => 'Ключ сайта google',
						'type'    => 'text',
						'desc'    => 'Ключ предназначен для использования в HTML-коде.',
						'default' => '',
					],
					[
						'id'      => 'google_secret_key',
						'title'   => 'Секретный ключ google',
						'type'    => 'text',
						'desc'    => 'Секретный ключ для обмена данными между сайтом и сервисом reCAPTCHA.',
						'link'    => [
							'text'   => 'Получить ключ',
							'url'    => 'https://www.google.com/recaptcha/admin/',
							'target' => true,
						],
						'default' => '',
					],
					[
						'id'      => 'google_script_load_timeout',
						'title'   => 'Время ожидания загрузки скрипта google reCAPTCHA',
						'type'    => 'select',
						'desc'    => 'Выберите время через, которое загрузится скрипт google reCAPTCHA (Помогает при прохождении google Speed page).',
						'choices' => $this->google_script_load_timeout(),
						'default' => 3,
					],
					[
						'id'      => 'google_scope',
						'title'   => 'Интерпретация счета',
						'type'    => 'select',
						'desc'    => 'reCAPTCHA v3 возвращает оценку (1,0 - скорее всего, хорошее взаимодействие, 0,0 - скорее всего, бот). В зависимости от оценки вы можете предпринимать различные действия в контексте сайта.',
						'choices' => $this->google_scope(),
						'link'    => [
							'text'   => 'Интерпретация счета',
							'url'    => 'https://developers.google.com/recaptcha/docs/v3#interpreting_the_score',
							'target' => true,
						],
						'default' => 0.9,
					],
					[
						'id'      => 'email',
						'title'   => 'Адрес email',
						'type'    => 'text',
						'desc'    => 'Куда будут отправляться письма.',
						'default' => get_option( 'admin_email' ),
					],
					[
						'id'      => 'noreply_email',
						'title'   => 'Адрес noreply',
						'type'    => 'text',
						'desc'    => 'От кого будут отправляться письма пример: noreply@example.ru',
						'default' => 'noreply@example.ru',
					],
					[
						'id'      => 'telegram_send_massage',
						'title'   => 'Отправка сообщений в телеграм',
						'label'   => 'Хочу отправлять сообщения',
						'type'    => 'checkbox',
						'default' => 1,
					],
				]
			];

			return $settings;
		}

		/**
		 * Область применения гугл.
		 *
		 * @since 1.0.0
		 *
		 * @return array
		 */
		public function google_script_load_timeout(): array {
			$array = [];

			for ( $i = 0; $i <= 6; $i ++ ) {
				$array[ $i ] = $i . ' сек.';
			}

			return $array;
		}

		/**
		 * Scope google.
		 *
		 * @since 1.0.0
		 *
		 * @return array
		 */
		public function google_scope(): array {
			$array = [];

			for ( $i = 0.1; $i <= 1; $i = round( $i + ( 1 / pow( 10, 1 ) ), 1 ) ) {
				if ( $i == 1 ) {
					$array["1.0"] = '1.0';
				} else {
					$array["$i"] = $i;
				}
			}

			return $array;
		}

		/**
		 * Добавляет опцию.
		 *
		 * Эта функция добавляет новую опцию с именем текущего объекта и значениями по умолчанию для редакторов кода шапки и подвала.
		 *
		 * @since 1.0.0
		 *
		 * @param array $options Массив существующих опций.
		 *
		 * @return array Массив опций после добавления новой опции.
		 *
		 */
		public function add_option( array $options ): array {
			$options[ $this->option_name ] = [
				'google_key'                 => '',
				'google_secret_key'          => '',
				'google_scope'               => 0.9,
				'google_script_load_timeout' => 3,
				'email'                      => get_option( 'admin_email' ),
				'noreply_email'              => 'noreply@example.ru',
				'telegram_send_massage'      => 1,
			];

			return $options;
		}

		/**
		 * Проверяет входные данные настроек.
		 *
		 * Эта функция проверяет входные данные настроек и возвращает их. В настоящее время она не выполняет никакой проверки,
		 * и возвращает входные данные без изменений.
		 *
		 * @since 1.0.0
		 *
		 * @param array $input Массив входных данных настроек.
		 *
		 * @return array Массив проверенных входных данных настроек.
		 *
		 */
		public function settings_validate( array $input ): array {
			$new_input = [];

			foreach ( $input as $key => $value ) {
				if ( $value === '' ) {
					add_settings_error( $this->option_name, $key, "Поле {$key} не должно быть пустым." );
				} else if ( $key === 'google_script_load_timeout' && ! preg_match( '/^[0-6]$/', $value ) ) {
					add_settings_error( $this->option_name, $key, 'Не верное время ожидания загрузки скрипта google reCAPTCHA.' );
				} else if ( $key === 'google_scope' && ! preg_match( '/^[+]?^[0-1]+([.][0-9]+)$/', $value ) ) {
					add_settings_error( $this->option_name, $key, 'Введите правильно интерпретацию счета.' );
				} else if ( $key === 'email' && ! is_email( $value ) ) {
					add_settings_error( $this->option_name, $key, 'Введённый адрес email не является корректным. Пожалуйста, введите корректный адрес email.' );
				} else if ( $key === 'noreply_email' && ! is_email( $value ) ) {
					add_settings_error( $this->option_name, $key, 'Введённый адрес noreply-email не является корректным. Пожалуйста, введите корректный адрес email.' );
				} else {
					$new_input[ $key ] = in_array( $key, [
						'email',
						'noreply_email'
					], true ) ? sanitize_email( $value ) : sanitize_text_field( $value );
				}
			}

			return $new_input;
		}
	}
}
