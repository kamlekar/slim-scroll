Slim-scroll (_Javascript scroll plugin_)
======================================

Slim scroll is a replacement of default scrollbar provided by browsers. 
This plugin lets you design the scroll bar by using simple css properties. It is created using vanilla javascript and css.

**Tested on**: IE8+, Chrome and Firefox.

##[Demo](https://rawgit.com/venkateshwar/slim-scroll/master/index.html)

###Info:

- To make it work, include `slimscroll.js` (_plugin_) in `head` tag and add the following css:
	
		.contentHolder {
		    display: inline-block;
		    line-height: 15px;
		    overflow: hidden;
		    position: relative;
		    height: 200px;
		    width: 380px;
		    border: 1px solid #CCC;
		    margin-top: 20px;
		}
		.wrapper {
		    overflow: auto;
		    position: absolute;
		    left: 0px;
		    top: 0px;
		    right: -18px;
		    bottom: 0px;
		    padding: 5px;
		    padding-right: 3px;
		}
		.scrollBarContainer{
		    background-color: #E1E1E1;
		    position: absolute;
		    top: 0px;
		    bottom: 0px;
		    right: 0px;
		    width: 5px;
		    cursor: pointer;
		}
		.scrollBar {
		    background-color: #999999;
		    border-radius: 10px;
		    opacity: 0.5;
		    position: absolute;
		    right: 0px;
		    left: 0px;
		    top: 0px;
		}


- Just design the scrollbar as you want by changing the above styles in css. (_file is available in this repo_)

###Note: 

Some of the styles in the above css are necessary to let the scroll work.


###How to use:

    <script>
        window.onload = function(){  
            var element = document.getElementsByClassName('contentHolder')[0];
            // /* For IE8 */ var element = document.querySelector('.contentHolder');
			
			// Apply slim scroll plugin
            scrollBar.useSlimScroll(element);
        }
    </script>

If you find any issues, please file them in issues section.

