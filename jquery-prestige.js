(function ($) {
    var offset = 10,
        getFileInput = function (callback) {
        var div = $('<div class="jquery-prestige"></div>'),
            input = $('<input type="file">)').appendTo(div);

        div.css({
            'position': 'absolute',
            'top': '0px',
            'left': '0px',
            'width': '100%',
            'height': '100%',
            'opacity': '0',
            'z-index': '20000',
            'overflow': 'hidden'
        });

        input.css({
            'position': 'absolute',
            'margin-top': -offset + 'px',
            'margin-left': -offset + 'px',
            'text-align': 'right'
        });

        div.on('mousemove', function (e) {
            var top = e.offsetY,
                left = e.offsetX,
                relative;

            if (!$(e.target).hasClass('.jquery-prestige')) {
                relative = $(e.target).position();
                top += relative.top - offset;
                left += relative.left - offset;
            }

            input.css({
                top: top,
                left: left
            });
        });

        div.on('mouseout', function () {
            $(this).hide();
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
                input = getFileInput(callback);
                input.on('change', function (e) {
                    self.removeData('prestige');
                });
                self.data('prestige', input);

                self.append(input);
            }

            input.show();
        });
    };
}(jQuery));
