(function ($) {
    var getFileInput = function (area) {
        var input = $('<div class="jquery-prestige"><input type="file"><div>'),
            d = area.dimensions;

        input.css({
            'position': 'absolute',
            'top': d.top + 'px',
            'left': d.left + 'px',
            'width': d.right - d.left + 'px',
            'height': d.bottom - d.top + 'px',
            'opacity': '0',
            'z-index': '20000',
            'overflow': 'hidden'
        });

        input.find('input').css({
            'position': 'absolute',
            'margin-top': '-10px',
            'margin-left': '-10px',
            'text-align': 'right'
        });

        return input;
    };

    // Helper to determine when an event is inside an elements coordinates
    $.fn.area = function () {
        var offset = this.offset(),
            height = this.height(),
            width = this.width(),
            area = {
                top: offset.top,
                right: offset.left + width,
                bottom: offset.top + height,
                left: offset.left
            };

        area.inside = function (event) {
            var left = event.pageX,
                top = event.pageY;
            return left < area.right &&
                left > area.left &&
                top < area.bottom &&
                top > area.top;
        };

        area.dimensions = area;

        return area;
    };

    $.fn.prestige = function (callback, options) {
        var self = $(this);

        self.on('mouseover', function (e) {
            if (!self.data('prestige')) {
                var area = self.area(),
                    input = getFileInput(area),
                    handler = function (e) {
                        var point = {
                                top: e.pageY - 12,
                                left: e.pageX - 12
                            },
                            input = self.data('prestige');

                        if (area.inside(e)) {
                            input.show();
                            input.find('input').css(point);
                        } else {
                            input.hide();
                        }
                    };

                self.data('prestige', input);

                input.on('change', function (e) {
                    $(document).off('mousemove', handler);
                    self.removeData('prestige');
                    this.remove();
                    callback(e.target);
                });

                $(document.body).append(input);

                $(document).on('mousemove', handler);
            }
        });
    };
}(window.jQuery));
