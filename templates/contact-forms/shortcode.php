<form
	class="<?php echo esc_attr( $settings->post_type ); ?> <?php echo esc_attr( $settings->post_type ); ?>-id-<?php echo esc_attr( $id ); ?> mb-2"
	novalidate>
	<div class="animate__animated animate__fadeIn alert mb-3 d-none" role="alert"></div>
	<?php if ( ! empty( $fields ) ) : ?>
		<div class="row g-3">
			<?php foreach ( $fields as $key => $field ) : ?>
				<?php
				if ( $field['data']['type'] === 'get_the_ID' ) {
					$type_value = get_the_ID();
				} elseif ( $field['data']['type'] === 'product_get_id' ) {
					global $product;

					$type_value = ! empty( $product ) ? $product->get_id() : '';
				} elseif ( $field['data']['type'] === 'product_get_sku' ) {
					global $product;

					$type_value = ! empty( $product ) ? $product->get_sku() : '';
				} elseif ( $field['data']['type'] === 'filter' && ! empty( $field['data']['filter_name'] ) ) {
					$type_value = apply_filters( $field['data']['filter_name'], '' );
				} else {
					$type_value = '';
				}
				?>
				<?php if ( $field['type'] !== 'hidden' ) : ?>
					<div class="col-md-<?php echo esc_attr( $field['width'] ?? '12' ); ?>">
				<?php endif; ?>
				<?php if ( $field['type'] !== 'hidden' ) : ?>
					<label class="form-label"
						   for="field-<?php echo esc_attr( esc_attr( $id ) ); ?>-<?php echo esc_attr( esc_attr( $key ) ); ?>">
						<?php echo esc_html( $field['label'] ?? 'Метка' ); ?><?php echo ! empty( $field['validation']['required'] ) ? "<span class='text-danger ms-1'>*</span>" : ''; ?>
					</label>
				<?php endif; ?>
				<?php if ( $field['type'] === 'hidden' ) : ?>
					<input type="<?php echo esc_attr( $field['type'] ?? 'hidden' ); ?>"
						   name="<?php echo esc_attr( $field['name'] ); ?>"
						   id="field-<?php echo esc_attr( $id ); ?>-<?php echo esc_attr( $key ); ?>"
						   value="<?php echo esc_attr( $type_value ); ?>"
					>
				<?php elseif ( $field['type'] === 'textarea' ) : ?>
					<textarea
						name="<?php echo esc_attr( $field['name'] ); ?>"
						id="field-<?php echo esc_attr( $id ); ?>-<?php echo esc_attr( $key ); ?>"
						class="form-control"
						rows="<?php echo esc_attr( $field['rows'] ?? '3' ); ?>"
						placeholder="<?php echo esc_attr( $field['placeholder'] ?? '' ); ?>"
						<?php echo esc_attr( $field['validation']['required'] ? 'required' : '' ); ?>><?php echo $type_value; ?></textarea>
					<div class="invalid-feedback"></div>
				<?php elseif ( $field['type'] === 'email' ) : ?>
					<input
						type="<?php echo esc_attr( $field['type'] ?? 'email' ); ?>"
						name="<?php echo esc_attr( $field['name'] ); ?>"
						id="field-<?php echo esc_attr( $id ); ?>-<?php echo esc_attr( $key ); ?>"
						class="form-control"
						value="<?php echo esc_attr( $type_value ); ?>"
						placeholder="<?php echo esc_attr( $field['placeholder'] ?? '' ); ?>"
						pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
						<?php echo esc_attr( $field['validation']['required'] ? 'required' : '' ); ?>>
					<div class="invalid-feedback"></div>
				<?php elseif ( $field['type'] === 'tel' ) : ?>
					<input
						type="<?php echo esc_attr( $field['type'] ?? 'tel' ); ?>"
						name="<?php echo esc_attr( $field['name'] ); ?>"
						id="field-<?php echo esc_attr( $id ); ?>-<?php echo esc_attr( $key ); ?>"
						class="form-control"
						value="<?php echo esc_attr( $type_value ); ?>"
						placeholder="<?php echo esc_attr( ! empty( $field['placeholder'] ) ? $field['placeholder'] : '8 (___) ___-__-__' ); ?>"
						pattern="^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$"
						<?php echo esc_attr( $field['validation']['required'] ? 'required' : '' ); ?>>
					<div class="invalid-feedback"></div>
				<?php elseif ( $field['type'] === 'text' ) : ?>
					<input
						type="<?php echo esc_attr( $field['type'] ?? 'text' ); ?>"
						name="<?php echo esc_attr( $field['name'] ); ?>"
						id="field-<?php echo esc_attr( $id ); ?>-<?php echo esc_attr( $key ); ?>"
						class="form-control"
						value="<?php echo esc_attr( $type_value ); ?>"
						placeholder="<?php echo esc_attr( $field['placeholder'] ?? '' ); ?>"
						<?php echo esc_attr( $field['validation']['required'] ? 'required' : '' ); ?>>
					<div class="invalid-feedback"></div>
				<?php elseif ( $field['type'] === 'number' ) : ?>
					<input
						type="<?php echo esc_attr( $field['type'] ?? 'text' ); ?>"
						name="<?php echo esc_attr( $field['name'] ); ?>"
						id="field-<?php echo esc_attr( $id ); ?>-<?php echo esc_attr( $key ); ?>"
						class="form-control"
						value="<?php echo esc_attr( $type_value ); ?>"
						placeholder="<?php echo esc_attr( $field['placeholder'] ?? '' ); ?>"
						min="<?php echo esc_attr( $field['min'] ?? 1 ); ?>"
						max="<?php echo esc_attr( $field['max'] ?? 100 ); ?>"
						step="<?php echo esc_attr( $field['step'] ?? 1 ); ?>"
						<?php echo esc_attr( $field['validation']['required'] ? 'required' : '' ); ?>>
					<div class="invalid-feedback"></div>
				<?php else : ?>
					<input
						type="<?php echo esc_attr( $field['type'] ?? 'text' ); ?>"
						name="<?php echo esc_attr( $field['name'] ); ?>"
						id="field-<?php echo esc_attr( $id ); ?>-<?php echo esc_attr( $key ); ?>"
						class="form-control"
						value="<?php echo esc_attr( $type_value ); ?>"
						placeholder="<?php echo esc_attr( $field['placeholder'] ?? '' ); ?>"
						<?php echo esc_attr( $field['validation']['required'] ? 'required' : '' ); ?>>
				<?php endif; ?>
				<?php if ( ! empty( $field['description'] ) ) : ?>
					<div id="helpBlock" class="form-text"><?php echo esc_html( $field['description'] ); ?></div>
				<?php endif; ?>
				<?php if ( $field['type'] !== 'hidden' ) : ?>
					</div>
				<?php endif; ?>
			<?php endforeach; ?>
			<div class="col-12 mb-3">
				<div class="form-check">
					<input
						type="checkbox"
						name="agree"
						id="field-agree-<?php echo $id; ?>"
						class="form-check-input"
						value="" required>
					<label class="form-check-label" for="field-agree-<?php echo $id; ?>">
						С <a href="<?php echo esc_url( get_privacy_policy_url() ); ?>" target="_blank">политикой
							обработки персональных данных</a> ознакомлен и согласен.<span
							class="text-danger ms-1">*</span>
					</label>
					<div class="invalid-feedback"></div>
				</div>
			</div>
			<input type="hidden" name="reCAPTCHA">
			<input type="hidden" name="action" value="<?php echo esc_attr( $settings->action ); ?>">
			<input type="hidden" name="id" value="<?php echo esc_attr( $id ); ?>">
			<?php echo wp_nonce_field( $settings->action, $settings->nonce, true, false ); ?>
		</div>
	<?php endif; ?>

	<?php if ( $isModal ) : ?>
		<button type="submit" class="<?php echo esc_attr( $classNameButton ); ?>"
				aria-label="<?php echo esc_html( $nameButton ); ?>">
			<?php echo $nameButton; ?>
		</button>
	<?php else : ?>
		<div class="d-flex justify-content-end">
			<button type="submit" class="<?php echo esc_attr( $classNameButton ); ?>"
					aria-label="<?php echo esc_html( $nameButton ); ?>">
				<?php echo $nameButton; ?>
			</button>
		</div>
	<?php endif; ?>
</form>

