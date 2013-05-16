Prestige
========
A jQuery plugin that lets you make any DOM-element into a clickable file input easily.


Usage
-----
Setting up prestige is simple. Run it on any number of selected DOM-elements, give it a callback and you are done.
The callbacks first argument is the file input that was changed by the user.

Example:
``` javascript
$('#myButton').prestige(function (input) {
    console.log('File path:', input.value);
});
```

Caveat: The file input is removed from the DOM immediately after the callback function has been called.


== License
MIT
