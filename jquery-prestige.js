(function ($) {
    var getFileInput = function (area) {
        var input = $('<div><input type="file" class="jquery-prestige"><div>');

        input.css({
            'position': 'absolute',
            'opacity': '0.5',
            'z-index': '20000',
            'width': '24px',
            'overflow': 'hidden'
        });

        input.find('input').css({
            'text-align': 'right'
        });

        input.attr('width', '10');

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
                            input.css(point);
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
