Slim-scroll 
===========

Slim scroll is a replacement of default scrollbar provided by browsers. 
This plugin lets you design the scroll bar by using simple css properties. It is created using vanilla javascript and css.

###Info:

- To make it work, include `us-scroll.js` (_plugin_) in `head` tag and add the following css:
	
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
        height: 100%;
        overflow: auto;
        padding-right: 18px;
        width: 100%;
    }
    .scrollBarContainer{
        background-color: #E1E1E1;
        position: absolute;
        width: 5px;
        top: 0px;
        bottom: 0px;
        right: 0px;
    }
    .scrollBar {
        background-color: #999999;
        border-radius: 10px;
        opacity: 0.5;
        position: absolute;
        right: 0px;
        left: 0px;
        top: 0px;
        cursor: pointer;
    }
    .unselectable {
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: -moz-none;
        -o-user-select: none;
        user-select: none;
    }


- Just design the scrollbar as you want by changing the above styles in css. (_file is available in this repo_)

##[Demo](https://rawgit.com/venkateshwar/Ultimate-Slim-scroll/master/index.html)

###How to use:

    <script>
        window.onload = function(){  
            var element = document.getElementsByClassName('contentHolder')[0];

            // Apply slim scroll plugin
            scrollBar.useSlimScroll(element);
        }
    </script>


Please file issues if you find any.

