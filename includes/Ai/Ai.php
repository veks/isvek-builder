<?php
/**
 * Ai class.
 *
 * @class   Ai
 * @version 1.0.0
 * @package Isvek\Plugin\Ai
 */

namespace Isvek\Plugin\Ai;

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'Isvek\Plugin\Ai\Ai' ) ) {

	/**
	 * Ai class.
	 */
	class Ai {

		/**
		 * Выполняет запрос к API модели GPT-4 для генерации текста на основе заданного текста.
		 *
		 * @since 1.0.0
		 *
		 * @param string $text Текст, на основе которого будет генерироваться новый текст.
		 *
		 * @return mixed Возвращает сгенерированный текст или false в случае ошибки.
		 */
		public static function gpt4( string $text = '' ) {
			$wp_remote_request = wp_remote_request(
				'https://nexra.aryahcr.cc/api/chat/gpt',
				[
					'timeout'     => 45,
					'method'      => 'POST',
					'redirection' => 1,
					'sslverify'   => false,
					'httpversion' => '1.0',
					'headers'     => [
						'Content-Type' => 'application/json',
					],
					'body'        => wp_json_encode(
						[
							'messages' => [
								[
									'role'    => 'user',
									'content' => $text,
								]
							],
							'prompt'   => $text,
							'model'    => 'GPT-4',
							'markdown' => false,
						]
					)
				]
			);

			if ( wp_remote_retrieve_response_code( $wp_remote_request ) == 200 ) {
				$response = json_decode( preg_replace( '/_+/', '', wp_remote_retrieve_body( $wp_remote_request ) ) );

				return $response->gpt;
			} else {
				return false;
			}
		}

		/**
		 * Выполняет запрос к сервису Bing для получения ответа на текстовый запрос.
		 *
		 * @since 1.0.0
		 *
		 * @param string $text Текст, для которого необходимо получить ответ от Bing.
		 *
		 * @return mixed Возвращает ответ от сервиса Bing или false в случае ошибки.
		 */
		public static function bing( string $text = '' ) {
			$wp_remote_request = wp_remote_request(
				'https://nexra.aryahcr.cc/api/chat/complements',
				[
					'timeout'     => 45,
					'method'      => 'POST',
					'redirection' => 1,
					'sslverify'   => false,
					'httpversion' => '1.0',
					'headers'     => [
						'Content-Type' => 'application/json',
					],
					'body'        => wp_json_encode(
						[
							'messages'           => [
								[
									'role'    => 'user',
									'content' => $text,
								]
							],
							'conversation_style' => 'Balanced',
							'markdown '          => false,
							'stream'             => false,
							'model'              => 'Bing'
						]
					)
				]
			);

			if ( wp_remote_retrieve_response_code( $wp_remote_request ) == 200 ) {
				$json     = preg_replace( '/[[:cntrl:]]/', '', wp_remote_retrieve_body( $wp_remote_request ) );
				$response = json_decode( $json );

				return $response->message;
			} else {
				return false;
			}
		}

		/**
		 * Отправляет текст для обработки GPT-3.5 Turbo и возвращает ответ.
		 *
		 * @since 1.0.0
		 *
		 * @param string $text Текст для обработки GPT-3.5 Turbo.
		 *
		 * @return mixed Ответ от GPT-3.5 Turbo или false, если запрос не удался.
		 */
		public static function gpt_3_5_turbo( string $text = '' ) {
			$wp_remote_request = wp_remote_request(
				'https://nexra.aryahcr.cc/api/chat/gpt',
				[
					'timeout'     => 45,
					'method'      => 'POST',
					'redirection' => 1,
					'sslverify'   => false,
					'httpversion' => '1.0',
					'headers'     => [
						'Content-Type' => 'application/json',
					],
					'body'        => wp_json_encode(
						[
							'messages' => [
								[
									'role'    => 'user',
									'content' => $text,
								]
							],
							'prompt'   => $text,
							'model'    => 'gpt-3.5-turbo',
							'markdown' => false,
						]
					)
				]
			);

			if ( wp_remote_retrieve_response_code( $wp_remote_request ) == 200 ) {
				$response = json_decode( preg_replace( '/_+/', '', wp_remote_retrieve_body( $wp_remote_request ) ) );

				return $response->gpt;
			} else {
				return false;
			}
		}
	}
}
