(function ($) {
    $.fn.getComputed = function (property) {
        var dom = this.get(0),
            camelize = function (a, b) {
                return b.toUpperCase();
            },
            returns = {},
            prop,
            style;

        // Good browsers
        if (window.getComputedStyle) {
            style = window.getComputedStyle(dom, null);
            Array.prototype.forEach.call(style, function (property) {
                returns[property] = style.getPropertyValue(property);
            });
            return returns;
        }

        // IE
        if (dom.currentStyle) {
            style = dom.currentStyle;
            for (prop in style) {
                returns[prop] = style[prop];
            }
            return returns;
        }

        if (dom.style) {
            style = dom.style;
            for (prop in style) {
                if (typeof style[prop] !== 'function') {
                    returns[prop] = style[prop];
                }
            }
            return returns;
        }

        return returns;
    };
}(jQuery));

