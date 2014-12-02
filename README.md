Slim-scroll (_Javascript scroll plugin_)
========================================

Slim scroll is a replacement of default scrollbar provided by browsers.
This plugin lets you design the scroll bar by using simple css properties. It is created using vanilla javascript and css.

**Tested on**: IE8+, Chrome and Firefox.

##[Demo](https://rawgit.com/venkateshwar/slim-scroll/master/index.html)

###Info:

- To make it work, include `slimscroll.js` (_plugin_) in `head` tag.
- Just design the scrollbar as you want by changing the above styles in css.

###Note:

Some of the styles in the above css are necessary to let the scroll work.


###How to use:

- Add `slimScroll` class to the elements which need this slim scroll component.

and then:

#####Method 1:

    scroll.useSlimScroll(Element);   // 'Element' is Javascript DOM object

#####Method 2:

or to add your own defined css styles:

    scroll.useSlimScroll(Element, {
      'wrapperClass': '',

      'scrollBarClass': '',

      'scrollBarContainerClass': '',  

      'scrollBarContainerSpecialClass': '',

      'scrollBarMinHeight': '',

      'scrollBarFixedHeight': '',
    });

###Explanation of above properties:

- **wrapperClass ** (*type - "string"*) : Mention wrapper class here.
- **scrollBarClass** (*type - "string"*) : Mention scroll bar class here.
- **scrollBarContainerClass** (*type - "string"*) : Mention scroll bar container class here.
- **scrollBarContainerSpecialClass** (*type - "string"*) : This property is used to mention a class which will be applied only when the user is scrolling the content. Could be helpful while applying animations to the scroll bar.
- **scrollBarMinHeight** (*type - "Integer"*) : Used to mention minimum scroll bar height here (without pixel unit)
- **scrollBarFixedHeight** (*type - "Integer"*) : Used to mention scroll bar fixed height (without pixel unit). This makes sure to show the scroll bar height fixed even when content inside the container increased.

###Note:

- Add a background-color to the scroll-bar element's class, to make the scroll bar visible :)
- Usage of the above mentioned properties is optional or as needed.


###How I got this thought:

I got this thought, when I found solution to hide the default scrollbar (_using css_) which was the requirement for a post on [Stackoverflow](http://stackoverflow.com/a/16671476/1577396).

The solution was simple but that is how I got this thought :).

---------------------------------

If you find any issues, please file them in issues section.
