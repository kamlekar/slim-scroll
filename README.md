#Slim-scroll (_JavaScript Scroll Plugin_)


Slim scroll is a replacement of default scrollbar provided by browsers. This plugin lets you design the scroll-bar by using simple css properties. It is created using javascript and css.

[Download](https://github.com/venkateshwar/slim-scroll/releases/latest)&nbsp;&nbsp;| &nbsp;[Github](https://github.com/venkateshwar/slim-scroll/)

**Tested on**: IE9+, Chrome and Firefox.

##[Demo](https://rawgit.com/venkateshwar/slim-scroll/master/test/index.html)

###How to use:
- To make it work, include `slimscroll.js` (_plugin_) in `head` tag.
- Apply height to the container in fixed units or percentage.
- Just design the scrollbar as you want by applying css classes as explained below.
- [In IE8] Apply high specificity to override normal styles given to the scroll bar.

and then:

#####Method 1 (_with no added styles_):

    new slimScroll(Element);   // 'Element' is Javascript DOM object

#####Method 2 (_with added styles_):

or to add your own defined css styles:

    new slimScroll(Element, {
      'wrapperClass': '',

      'scrollBarClass': '',

      'scrollBarContainerClass': '',  

      'scrollBarContainerSpecialClass': '',

      'scrollBarMinHeight': '',

      'scrollBarFixedHeight': '',

      'keepFocus': true/false
    });

###Explanation of above properties:

- **wrapperClass** (*type - "string"*) : Mention wrapper class here.
- **scrollBarClass** (*type - "string"*) : Mention scroll bar class here.
- **scrollBarContainerClass** (*type - "string"*) : Mention scroll bar container class here.
- **scrollBarContainerSpecialClass** (*type - "string"*) : This property is used to mention a class which will be applied only when the user is scrolling the content. Could be helpful while applying animations to the scroll bar.
- **scrollBarMinHeight** (*type - "Integer"*) : Used to mention minimum scroll bar height here (without pixel unit)
- **scrollBarFixedHeight** (*type - "Integer"*) : Used to mention scroll bar fixed height (without pixel unit). This makes sure to show the scroll bar height fixed even when content inside the container is increased.
- **keepFocus** (*type - "Boolean"*) : Used to focus the container.

###To make this work on height resize:

    var customScroll = new slimScroll();
    window.onresize = customScroll.resetValues;  // pure javascript example.

###Note:

- Usage of the above mentioned properties is optional or as per need.
- Add [higher specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) css to override the custom styles which are being applied by the plugin.
- Don't override the styles which are given highest specificity (`!important`) by the plugin (_those styles are necessary to make this scroll plugin work_).


###How I got this thought:

I got this thought, when I found solution to hide the default scrollbar (_using css_) which was the requirement for a post on [Stackoverflow](http://stackoverflow.com/a/16671476/1577396).

The solution was simple but that is how I got this thought :).

---------------------------------

If you find any issue(s), please file [here](https://github.com/venkateshwar/slim-scroll/issues).
