(function ($) {
    var offset = 10,
        getFileInput = function (callback, options) {
            var div = $('<div class="jquery-prestige"></div>'),
                input = $('<input />', {
                    type: 'file',
                    name: (options.name || 'file'),
                    multiple: options.multiple ? 'multiple': false
                }).appendTo(div),
                css = options.css || {},
                width;

            div.css($.extend({
                'position': 'absolute',
                'top': '0px',
                'left': '0px',
                'width': '100%',
                'height': '100%',
                'opacity': '0',
                'z-index': '1',
                'overflow': 'hidden'
            }, css));

            input.css({
                'position': 'absolute',
                'margin-top': -offset + 'px',
                'margin-left': -offset + 'px',
                outline: '1px solid red'
            });

            div.on('mousemove', function (e) {
                var position = $(this).offset(),
                    top = e.pageY - position.top,
                    left = e.pageX - position.left;

                if (!width) {
                    width = input.width();
                }

                input.css({
                    top: top,
                    left: left - width + 2 * offset
                });
            });

            div.on('change', function (e) {
                $(this).remove();
                callback(e.target);
            });

            return div;
        };

    $.fn.prestige = function (callback, options) {
        var self = $(this),
            position;

        options = options || {};

        if (self.getComputed) {
            position = self.getComputed().position;
        }

        if (!position || position === 'static') {
            self.css({
                position: 'relative'
            });
        }

        self.on('mouseover', function () {
            var container = $(this),
                input = container.data('prestige');

            if (!input) {
                input = getFileInput(callback, options);
                input.on('change', function () {
                    container.removeData('prestige');
                });
                container.data('prestige', input);

                container.append(input);
            }
        });

        return this;
    };
}(jQuery));
