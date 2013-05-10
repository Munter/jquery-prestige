(function ($) {
    var offset = 10,
        getFileInput = function (callback, options) {
            var div = $('<div class="jquery-prestige"></div>'),
                input = $('<input type="file" name="' + (options.name || 'file') + '">)').appendTo(div),
                css = options.css || {},
                width;

            div.css($.extend({
                'position': 'absolute',
                'top': '0px',
                'left': '0px',
                'width': '100%',
                'height': '100%',
                'opacity': '0',
                'z-index': '9998',
                'overflow': 'hidden'
            }, css));

            input.css({
                'position': 'absolute',
                'margin-top': -offset + 'px',
                'margin-left': -offset + 'px',
                outline: '1px solid red'
            });

            div.on('mousemove', function (e) {
                var top = e.offsetY,
                    left = e.offsetX,
                    relative;

                if (!width) {
                    width = input.width();
                }

                if (!$(e.target).hasClass('.jquery-prestige')) {
                    relative = $(e.target).position();
                    top += relative.top;
                    left += relative.left;
                }

                input.css({
                    top: top - offset,
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

        self.on('mouseover', function (e) {
            var input = self.data('prestige');

            if (!input) {
                input = getFileInput(callback, options);
                input.on('change', function (e) {
                    self.removeData('prestige');
                });
                self.data('prestige', input);

                self.append(input);
            }
        });

        return this;
    };
}(jQuery));
