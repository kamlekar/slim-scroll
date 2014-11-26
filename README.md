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

    useSlimScroll(Element);   // 'Element' is Javascript DOM object

#####Method 2:

or to add your own defined css styles:

	useSlimScroll(Element, {
		'wrapperClass': '',  /* Add wrapper class here */

		'scrollBarClass': '',  /* Add scroll bar class here */

		'scrollBarContainerClass': '',  /* Add class to scroll bar container here */

		/* You can use the below property to apply different styles to the scrollbar while scrolling. */
		'scrollBarContainerSpecialClass': ''  
	});

#####Note:

To make this work in IE8, add the below classes in your css file:

    /* Fallback css */
    
	.slimScroll > div {
		position: absolute !important;
		overflow: auto !important;
		left: 0px!important;
		top:0px !important;
		right: -18px !important;
		bottom: 0px !important;
		padding-right: 8px !important;
	}

	.slimScroll > div + div {
        position: absolute !important;
        top: 0px !important;
        bottom: 0px !important;
        right: 0px !important;
        left: auto !important;
        width: 5px !important;
        cursor: pointer !important;
        padding-right: 0px !important;
    }

	.slimScroll > div + div > div {
        position:absolute !important;
        top:0px;
        left:0px;
        right:0px;
    }

###How I got this thought:

I got this thought, when I found solution to hide the default scrollbar (_using css_) which was the requirement for a post on [Stackoverflow](http://stackoverflow.com/a/16671476/1577396).

The solution was simple but that is how I got this thought :).

---------------------------------

If you find any issues, please file them in issues section.

