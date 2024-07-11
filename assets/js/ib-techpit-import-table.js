(function ($) {

  list = {

    /** added method display
     * for getting first sets of data
     **/

    display: function () {
      setTimeout(function () {
        $.ajax({
          url: ajaxurl,
          dataType: 'json',
          data: {
            action: '_ajax_isvek_plugin_techpit_import_table_display',
            _ajax_isvek_plugin_techpit_table_nonce: $('#_ajax_isvek_plugin_techpit_table_nonce').val()
          },
          success: function (response) {
            $('#isvek-plugin-techpit-table-display').html(response.display)

            $('tbody').on('click', '.toggle-row', function (e) {
              e.preventDefault()
              $(this).closest('tr').toggleClass('is-expanded')
            })

            list.init()
          },
          error: function (error) {
            console.log(error.statusText)
          }
        })
      }, 500)
    },

    init: function () {

      var timer
      var delay = 500

      $('.isvek-plugin-techpit-run').on('click', function (e) {
        e.preventDefault()

        var action = $(this).data('isvek-plugin-techpit-action')

        alert(`Событие ${action} запланировано в ближайшее время.`)

        list.update({
          current_action: 'run',
          slug: action
        })
      })

      $('.isvek-plugin-techpit-stop').on('click', function (e) {
        e.preventDefault()

        var action = $(this).data('isvek-plugin-techpit-action')

        alert(`Событие ${action} будет остановлено ближайшее время.`)

        list.update({
          current_action: 'stop',
          slug: action
        })
      })

      $('.tablenav-pages a, .manage-column.sortable a, .manage-column.sorted a').on('click', function (e) {
        e.preventDefault()
      })

      $('#isvek-plugin-techpit-table-display').on('submit', function (e) {

        e.preventDefault()

      })

    },

    /** AJAX call
     *
     * Send the call and replace table parts with updated version!
     *
     * @param    object    data The data to pass through AJAX
     */
    update: function (data = '') {
      $.ajax({
        url: ajaxurl,
        data: $.extend(
          {
            action: '_ajax_isvek_plugin_techpit_import_table_callback',
            _ajax_isvek_plugin_techpit_table_nonce: $('#_ajax_isvek_plugin_techpit_table_nonce').val(),
          },
          data
        ),
        success: function (response) {

          var response = $.parseJSON(response)

          if (response.rows.length)
            $('#the-list').html(response.rows)
          if (response.column_headers.length)
            $('thead tr, tfoot tr').html(response.column_headers)

          list.init()
        }
      })

      setInterval(function () {

      }, 5000)
    },

    /**
     * Filter the URL Query to extract variables
     *
     * @see http://css-tricks.com/snippets/javascript/get-url-variables/
     *
     * @param    string    query The URL query part containing the variables
     * @param    string    variable Name of the variable we want to get
     *
     * @return   string|boolean The variable value if available, false else.
     */
    __query: function (query, variable) {

      var vars = query.split('&')
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (pair[0] == variable)
          return pair[1]
      }
      return false
    },
  }

  list.display()

})(jQuery)
