/*jslint onevar:off*/

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

    return area;
};

function getFileInput() {
    var input = $('<input type="file">');

    input.css({
        'position': 'absolute',
        'z-index': '20000',
        'opacity': '0.5',
        'outline': '1px solid red',
        'text-align': 'right'
    });

    input.attr('width', '10');

    return input;
}

var input = getFileInput();
$(document).one('mouseover', '.prestige', function (e) {
    var area = $(this).area(),
        handler = function (e) {
            var point = {
                top: e.pageY - 12,
                left: e.pageX - 12
            };
            if (area.inside(e)) {
                input.css(point);
                $(document.body).append(input);
            } else {
                input.remove();
            }
        };

    $(document).on('mousemove', handler);
});
