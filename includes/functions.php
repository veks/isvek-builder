<?php
/**
 * Функции isvek.
 *
 * @package Isvek\Plugin\Functions
 * @version 1.0.0
 */

defined( 'ABSPATH' ) || exit;

if ( ! function_exists( 'isvek_plugin_get_option_db' ) ) {

	/**
	 * Функция для получения опции из базы данных WordPress.
	 *
	 * Эта функция принимает имя опции, ключ и значение по умолчанию в качестве аргументов.
	 * Она получает значение опции из базы данных WordPress и возвращает его.
	 * Если имя опции или ключ не указаны, функция возвращает false.
	 * Если опция не существует, функция также возвращает false.
	 *
	 * @since 1.0.0
	 *
	 * @param string $key Ключ в опции для получения (по умолчанию пустой).
	 * @param mixed $default_value Значение по умолчанию, которое будет возвращено, если опция или ключ не существуют (по умолчанию null).
	 *
	 * @param string $option_name Имя опции для получения (по умолчанию пустое).
	 *
	 * @return mixed Возвращает значение опции или false, если опция или ключ не существуют.
	 * @global wpdb $wpdb WordPress database abstraction object.
	 */
	function isvek_plugin_get_option_db( string $option_name = '', string $key = '', $default_value = null ) {
		global $wpdb;

		if ( $option_name === '' && $key === '' ) {
			return false;
		}

		$option = $wpdb->get_var( $wpdb->prepare( "SELECT option_value FROM $wpdb->options WHERE option_name = %s", $option_name ) );
		$option = maybe_unserialize( $option );

		return array_get( $option, $key, $default_value );
	}
}

if ( ! function_exists( 'isvek_plugin_get_option' ) ) {

	/**
	 * Функция для получения опции из WordPress.
	 *
	 * Эта функция принимает имя опции, ключ и значение по умолчанию в качестве аргументов.
	 * Она получает значение опции из WordPress и возвращает его.
	 * Если имя опции или ключ не указаны, функция возвращает false.
	 * Если опция не существует, функция также возвращает false.
	 *
	 * @since 1.0.0
	 *
	 * @param string $key Ключ в опции для получения (по умолчанию пустой).
	 * @param mixed $default_value Значение по умолчанию, которое будет возвращено, если опция или ключ не существуют (по умолчанию false).
	 * @param string $option_name Имя опции для получения (по умолчанию пустое).
	 *
	 * @return mixed Возвращает значение опции или false, если опция или ключ не существуют.
	 */
	function isvek_plugin_get_option( string $option_name = '', string $key = '', $default_value = '' ) {
		if ( $option_name === '' && $key === '' ) {
			return false;
		}

		$option = get_option( $option_name );

		if ( false === $option ) {
			return false;
		}

		return array_get( $option, $key, $default_value );
	}
}

if ( ! function_exists( 'isvek_plugin_update_option' ) ) {

	/**
	 * Функция для обновления ключа опции в WordPress.
	 *
	 * Эта функция принимает ключ опции, значение, имя опции и флаг автозагрузки в качестве аргументов.
	 * Она получает значение опции из WordPress и обновляет его.
	 * Если имя опции или ключ не указаны, функция возвращает false.
	 * Если опция не существует, функция также возвращает false.
	 *
	 * @since 1.0.0
	 *
	 * @param string $key Ключ опции для обновления.
	 * @param string $value Новое значение для ключа (по умолчанию пустое).
	 * @param bool $autoload Флаг, указывающий, следует ли автоматически загружать опцию при старте WordPress (по умолчанию false).
	 * @param string $option_name Имя опции для обновления.
	 *
	 * @return false|void Возвращает false, если имя опции или ключ не указаны или если опция не существует.
	 */
	function isvek_plugin_update_option( string $option_name, string $key, string $value = '', bool $autoload = false ) {
		if ( $option_name === '' && $key === '' ) {
			return false;
		}

		$option = get_option( $option_name );

		if ( false === $option ) {
			return false;
		}

		update_option( $option_name, data_set( $option, $key, $value ), $autoload );
	}
}

if ( ! function_exists( 'isvek_plugin_is_active_block_widget' ) ) {

	/**
	 * Функция для проверки активности виджета блока.
	 *
	 * Эта функция проверяет, активен ли указанный блок в виджетах.
	 *
	 * @since 1.0.0
	 *
	 * @param string $block_name Имя блока для проверки.
	 *
	 * @return bool Возвращает true, если блок активен, и false в противном случае.
	 */
	function isvek_plugin_is_active_block_widget( string $block_name ): bool {
		$widget_blocks = get_option( 'widget_block' );

		foreach ( (array) $widget_blocks as $widget_block ) {
			if ( ! empty( $widget_block['content'] ) && has_block( $block_name, $widget_block['content'] ) ) {
				return true;
			}
		}

		return false;
	}
}

if ( ! function_exists( 'isvek_plugin_mb_ucfirst' ) ) {

	/**
	 * Заглавная буква первого символа строки.
	 *
	 * Эта функция принимает строку в качестве первого аргумента и возвращает строку с первым
	 * символом с заглавной буквы. Она использует функции `mb_strtoupper()` и `mb_substr()`, чтобы
	 * капитализации первого символа и извлечения остальной части строки, соответственно.
	 *
	 * Функция принимает необязательный второй аргумент `$encoding', который указывает.
	 * Кодировку символов, которую следует использовать. Если этот аргумент не указан, функция использует `'UTF-8''
	 * в качестве кодировки по умолчанию.
	 *
	 * Функция также принимает необязательный третий аргумент `$lower_str_end`, который указывает.
	 * Следует ли преобразовывать оставшуюся часть строки в нижний регистр. Если этот аргумент равен `true`, функция
	 * использует функцию `mb_strtolower()` для преобразования остальной части строки в нижний регистр.
	 *
	 * @since 1.0.0
	 *
	 * @param string $str Строка, которую нужно преобразовать в заглавную.
	 * @param string $encoding [optional] Используемая кодировка символов. По умолчанию `'UTF-8''.
	 * @param bool $lower_str_end [необязательно] Преобразовывать ли остальную часть строки в нижний регистр.
	 *
	 * @return string Результирующая строка после капитализации первого символа.
	 */
	function isvek_plugin_mb_ucfirst( string $str, string $encoding = 'UTF-8', bool $lower_str_end = false ): string {
		$first_letter = mb_strtoupper( mb_substr( $str, 0, 1, $encoding ), $encoding );

		if ( $lower_str_end ) {
			$str_end = mb_strtolower( mb_substr( $str, 1, mb_strlen( $str, $encoding ), $encoding ), $encoding );
		} else {
			$str_end = mb_substr( $str, 1, mb_strlen( $str, $encoding ), $encoding );
		}

		return $first_letter . $str_end;
	}
}

if ( ! function_exists( 'isvek_plugin_object_to_array' ) ) {

	/**
	 * Преобразует объект в массив.
	 *
	 * Эта функция принимает объект в качестве аргумента и преобразует его в массив. Если входные данные не являются
	 * объект, она просто возвращает входное значение без изменений. Если входные данные являются массивом, функция
	 * рекурсивно применяется к каждому элементу массива.
	 *
	 * @since 1.0.0
	 *
	 * @param mixed $object Объект для преобразования в массив.
	 *
	 * @return array Результирующий массив после преобразования объекта.
	 */
	function isvek_plugin_object_to_array( $object ): array {
		if ( is_array( $object ) || is_object( $object ) ) {
			$result = [];

			foreach ( $object as $key => $value ) {
				$result[ $key ] = ( is_array( $value ) || is_object( $value ) ) ? isvek_plugin_object_to_array( $value ) : $value;
			}

			return $result;
		}

		return $object;
	}
}

if ( ! function_exists( 'isvek_plugin_declension_word' ) ) {

	/**
	 * Возвращает склонение слова в зависимости от числа.
	 *
	 * @since 1.0.0
	 *
	 * @param int $number Число для определения склонения.
	 * @param array $word Массив слов в различных формах склонения.
	 *
	 * @return string Слово с соответствующим склонением.
	 */
	function isvek_plugin_declension_word( int $number, array $word ): string {
		$ar = [ 2, 0, 1, 1, 1, 2 ];

		return $word[ ( $number % 100 > 4 && $number % 100 < 20 ) ? 2 : $ar[ min( $number % 10, 5 ) ] ];
	}
}

if ( ! function_exists( 'isvek_plugin_array_replace_recursive_overwrite' ) ) {

	/**
	 * Рекурсивно заменяет элементы массива $a элементами массива $b с возможностью перезаписи.
	 *
	 * @since 1.0.0
	 *
	 * @param array $a Первый массив.
	 * @param array $b Второй массив.
	 *
	 * @return array Объединенный массив.
	 */
	function isvek_plugin_array_replace_recursive_overwrite( array $a, array $b ): array {
		$args = func_get_args();
		$res  = array_shift( $args );
		while ( ! empty( $args ) ) {
			$next = array_shift( $args );
			// if(count($next)==0) return NULL;//patch
			foreach ( $next as $k => $v ) {
				if ( is_integer( $k ) ) {
					if ( $k == 0 ) {
						$res = [];
					} //added
					isset( $res[ $k ] ) ? $res[] = $v : $res[ $k ] = $v;
				} elseif ( is_array( $v ) && isset( $res[ $k ] ) && is_array( $res[ $k ] ) ) {
					$res[ $k ] = isvek_plugin_array_replace_recursive_overwrite( $res[ $k ], $v );
				} else {
					$res[ $k ] = $v;
				}
			}
		}

		return $res;
	}
}

if ( ! function_exists( 'isvek_plugin_locate_template' ) ) {

	/**
	 * Определяет путь к шаблону плагина.
	 *
	 * Функция ищет указанный шаблон и возвращает его путь. Если шаблон не найден, возвращается путь к шаблону по умолчанию.
	 *
	 * @since 1.0.0
	 *
	 * @param string $template_name Имя шаблона.
	 * @param string $template_path Путь к шаблонам. По умолчанию 'templates/'.
	 * @param string $default_path Путь к шаблонам по умолчанию. По умолчанию 'templates/' в папке плагина.
	 *
	 * @return string Путь к найденному шаблону.
	 */
	function isvek_plugin_locate_template( string $template_name, string $template_path = '', string $default_path = '' ): string {
		if ( ! $template_path ) {
			$template_path = 'templates/';
		}

		if ( ! $default_path ) {
			$default_path = plugin_dir_path( ISVEK_PLUGIN_FILE ) . 'templates/';
		}

		$template = locate_template( [ $template_path . $template_name, $template_name ] );

		if ( ! $template ) {
			$template = $default_path . $template_name;
		}

		return apply_filters( 'isvek_plugin_locate_template', $template, $template_name, $template_path, $default_path );
	}
}

if ( ! function_exists( 'isvek_plugin_get_template' ) ) {

	/**
	 * Возвращает и подключает шаблон из плагина.
	 *
	 * @since 1.0.0
	 *
	 * @param string $template_name Название шаблона.
	 * @param array $args Аргументы для использования в шаблоне.
	 * @param string $template_path Путь к шаблону.
	 * @param string $default_path Путь по умолчанию для шаблона.
	 */
	function isvek_plugin_get_template( string $template_name, array $args = [], string $template_path = '', string $default_path = '' ) {

		if ( isset( $args ) && is_array( $args ) ) {
			extract( $args );
		}

		$template_file = isvek_plugin_locate_template( $template_name, $template_path, $default_path );

		if ( ! file_exists( $template_file ) ) {
			_doing_it_wrong( __FUNCTION__, sprintf( '<code>%s</code> не существует.', $template_file ), '1.0.0' );

			return;
		}

		include $template_file;
	}
}

if ( ! function_exists( 'isvek_plugin_get_template_html' ) ) {

	/**
	 * Возвращает HTML содержимое указанного шаблона плагина.
	 *
	 * Данная функция буферизирует вывод шаблона с помощью obstart(), затем вызывает isvekplugingettemplate()
	 * для получения содержимого шаблона с переданными аргументами. В конце возвращает буферизированное содержимое с помощью obgetclean().
	 *
	 * @since 1.0.0
	 *
	 * @param string $template_name Имя шаблона для получения содержимого.
	 * @param array $args Массив аргументов, которые могут быть переданы в шаблон.
	 * @param string $template_path Путь к шаблонам (необязательно).
	 * @param string $default_path Путь по умолчанию к шаблонам (необязательно).
	 *
	 * @return string Возвращает HTML содержимое указанного шаблона.
	 */
	function isvek_plugin_get_template_html( string $template_name, array $args = [], string $template_path = '', string $default_path = '' ): string {
		ob_start();

		isvek_plugin_get_template( $template_name, $args, $template_path, $default_path );

		return ob_get_clean();
	}
}

if ( ! function_exists( 'isvek_plugin_activation_hook' ) ) {

	/**
	 * Хук активации плагина.
	 *
	 * Эта функция вызывает действие 'isvek_plugin_activation_hook' при активации плагина.
	 *
	 * @since 1.0.0
	 */
	function isvek_plugin_activation_hook() {
		do_action( 'isvek_plugin_activation_hook' );
	}
}

if ( ! function_exists( 'isvek_plugin_deactivation_hook' ) ) {

	/**
	 * Хук деактивации плагина.
	 *
	 * Эта функция вызывает действие 'isvek_plugin_deactivation_hook' при деактивации плагина.
	 *
	 * @since 1.0.0
	 */
	function isvek_plugin_deactivation_hook() {
		do_action( 'isvek_plugin_deactivation_hook' );
	}
}

if ( ! function_exists( 'isvek_plugin_uninstall_hook' ) ) {

	/**
	 * Хук деинсталляции плагина.
	 *
	 * Эта функция вызывает действие 'isvek_plugin_uninstall_hook' при деинсталляции плагина.
	 *
	 * @since 1.0.0
	 */
	function isvek_plugin_uninstall_hook() {
		do_action( 'isvek_plugin_uninstall_hook' );
	}
}

if ( ! function_exists( 'isvek_plugin_print_r' ) ) {

	/**
	 * Выводит или возвращает отформатированное представление переменной.
	 *
	 * Эта функция выводит или возвращает отформатированное представление переменной в элементе <pre>.
	 * Если указан параметр $return, значение переменной возвращается вместо вывода на экран.
	 *
	 * @since 1.0.0
	 *
	 * @param bool $return Флаг, указывающий, следует ли возвращать значение вместо вывода на экран.
	 *
	 * @param mixed $value Переменная для вывода.
	 *
	 * @return string|void Отформатированное представление переменной, если указан параметр $return. Иначе null.
	 */
	function isvek_plugin_print_r( $value, bool $return = false ) {
		if ( $return ) {
			return '<pre>' . print_r( $value ?? '', true ) . '</pre>';
		} else {
			echo '<pre>' . print_r( $value ?? '', true ) . '</pre>';
		}
	}
}

if ( ! function_exists( 'isvek_plugin_telegram_send_message' ) ) {

	/**
	 * Отправляет сообщение в Telegram.
	 *
	 * Эта функция применяет фильтр 'ip_telegram_send_message' к тексту сообщения и объекту reply_markup,
	 * и возвращает результат. Функция не отправляет сообщение напрямую, а предоставляет возможность другим
	 * функциям или плагинам изменить сообщение или обработать его отправку.
	 *
	 * @since 1.0.0
	 *
	 * @param mixed $reply_markup Объект reply_markup для сообщения.
	 *
	 * @param string $text Текст сообщения.
	 *
	 * @return mixed Результат применения фильтра 'ip_telegram_send_message'.
	 */
	function isvek_plugin_telegram_send_message( string $text = '', $reply_markup = false ) {
		return apply_filters( 'isvek_plugin_telegram_send_message', $text, $reply_markup );
	}
}
