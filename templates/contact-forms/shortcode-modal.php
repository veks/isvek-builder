<button
	type="button"
	class="<?php echo esc_attr( $classNameModalButton); ?>"
	data-bs-toggle="modal"
	data-bs-target="#<?php echo esc_attr( $settings->post_type ); ?>-modal-<?php echo esc_attr( $id ); ?>">
	<?php echo esc_attr( $nameModalButton ); ?>
</button>
<div class="modal fade" id="<?php echo esc_attr( $settings->post_type ); ?>-modal-<?php echo esc_attr( $id ); ?>"
	 tabindex="-1"
	 aria-labelledby="<?php echo esc_attr( $settings->post_type ); ?>-label-<?php echo esc_attr( $id ); ?>"
	 aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title"><?php echo esc_html( get_the_title( $id ) ?? 'Заголовок' ); ?></h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
			</div>
			<div class="modal-body bg-white">
				<?php include( __DIR__ . '/shortcode.php' ); ?>
			</div>
			<div class="modal-footer p-1">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Закрыть">
					Закрыть
				</button>
			</div>
		</div>
	</div>
</div>
