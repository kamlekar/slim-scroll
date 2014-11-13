var scroll = (function(){
    var reposition = false,
        previousTop = false,
        useSlimScroll = function(C){
            var h = C.innerHTML,
                w = "wrapper",
                u = " unselectable",
                c = "content",
                S = "scrollBarContainer",
                s = "scrollBar";

            C.innerHTML = "";
            wrapper = createElement(w + u, "", C);
            content = createElement(c, h, wrapper);
            // content.setAttribute("unselectable","on"); /* IE8 unselectable fix */
            scrollBarContainer = createElement(S, "", wrapper);
            scrollBar = createElement(s, "", scrollBarContainer);

            wrapperHeight = wrapper.offsetHeight;
            scrollHeight = wrapper.scrollHeight;
            scrollPercentage = (wrapperHeight/scrollHeight) * 100;
            userScrollPercentage = scrollPercentage; 

            remainingUserPercentage = 100 - userScrollPercentage;
            var x = (scrollHeight - wrapperHeight) * ((userScrollPercentage - scrollPercentage)/(100 - scrollPercentage));
            sH = ((x / (remainingUserPercentage)) + (scrollHeight/100));
            console.log(sH);

            scrollBar.style.height = userScrollPercentage + "%";

            // Attaching mouse events
            addEvent('mousedown', scrollBar, beginScroll);
            addEvent('click', scrollBarContainer, setScroll);

            // For scroll
            addEvent('scroll', wrapper, doScroll);
            // content.onselectstart = function() { return false; }
        },
        createElement = function(className, html, parent){
            var div = document.createElement('div');
            div.className = className;
            div.innerHTML = html;
            parent.appendChild(div);
            return div;
        },
        setScroll = function(e){
            var e = e || event;
            var el = e.target || event.srcElement;
            var parentElement = el.parentElement || el.parentNode;
            if(parentElement === scrollBarContainer){
                return false;
            }
            var ePageY = e.pageY || event.clientY;
            var top = ((ePageY - wrapper.parentElement.offsetTop)/wrapperHeight * 100) - userScrollPercentage/2;
            var threshold = remainingUserPercentage;
            if(top > threshold){
                top = threshold;
            }
            else if(top < 0){
                top = 0;
            }
            scrollBar.style.top = top + "%";
            wrapper.scrollTop = top * sH;
        },
        beginScroll = function(e){
            var e = e || event;
            addEvent('mousemove', document, moveScroll);
            addEvent('mouseup', document, endScroll);

            // disable scroll event
            removeEvent('scroll', wrapper);
            offsetTop = wrapper.offsetTop;
            firstY = e.pageY || event.clientY;
            if(!reposition){
                reposition = scrollBar.offsetTop;
            }
        },
        moveScroll = function(e){
            var e = e || event;
            // move the cursor position and also change the scrollPosition of the container.
            var wrapperScrollTop = wrapper.scrollTop;
            var ePageY = e.pageY || event.clientY;
            var top = reposition + ePageY - firstY;
            var threshold = remainingUserPercentage;
            top = (top/wrapperHeight * 100);
            if(threshold < top){
                top = threshold;
            }
            if(!previousTop){
                previousTop = top + 1;
            }
            var blnThreshold = top >= 0 && firstY > offsetTop;
            if((previousTop > top && blnThreshold) || (blnThreshold && (wrapperScrollTop + wrapperHeight !== scrollHeight))){
                var threshold = 100 - scrollPercentage;
                scrollBar.style.top = top + "%";
                previousTop = top;                
                var scrollTop = top * sH;
                wrapper.scrollTop = scrollTop;
            }
        },
        endScroll = function(e){
            removeEvent('mousemove', document);
            removeEvent('mouseup', document);
            reposition = 0;
            // Enable scroll event
            addEvent('scroll', wrapper, doScroll);
        },
        doScroll = function(e){
            var element = e.currentTarget;
            var scrollTop = element.scrollTop;
            var top = scrollTop/scrollHeight * 100;
            scrollBar.style.top = scrollTop/sH + "%"; //top + "%";
        },
        addEvent = function(event, element, func){
            element['on' + event] = func;
            // element.addEventListener(event, func, false);
        },
        removeEvent = function(event, element){
            element['on' + event] = null;
            // element.removeEventListener(event, func, false);
        };
    return {
        useSlimScroll : useSlimScroll
    }
})();
