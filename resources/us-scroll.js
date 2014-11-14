var scroll = (function(){
    var reposition = false,
        previousTop = false,
        w = "wrapper",
        u = " unselectable",
        c = "content",
        S = "scrollBarContainer",
        s = "scrollBar",
        // mac animation classes. pass empty string to make the scroll work normal.
        a = " animate",
        m = " mac"
        useSlimScroll = function(C){
            var h = C.innerHTML;
            C.innerHTML = "";
            wrapper = createElement(w + u + m, "", C);
            content = createElement(c, h, wrapper);
            // content.setAttribute("unselectable","on"); /* IE8 unselectable fix */
            sbc = createElement(S + a, "", wrapper);
            scrollBar = createElement(s, "", sbc);

            wH = wrapper.offsetHeight;
            sH = wrapper.scrollHeight;
            sP = (wH/sH) * 100;
            // Manually set the height of the scrollbar (in percentage)
            sP1 = sP;  

            rP1 = 100 - sP1;
            var x = (sH - wH) * ((sP1 - sP)/(100 - sP));
            sH1 = Math.abs((x / (rP1)) + (sH/100));

            scrollBar.style.height = sP1 + "%";

            // Attaching mouse events
            addEvent('mousedown', scrollBar, beginScroll);
            addEvent('click', sbc, setScroll);

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
            scrollBar.className = s;
            var el = e.target || event.srcElement;
            var parentElement = el.parentElement || el.parentNode;
            if(parentElement === sbc){
                return false;
            }
            var ePageY = e.pageY || event.clientY;
            var top = ((ePageY - wrapper.parentElement.offsetTop)/wH * 100) - sP1/2;
            if(top > rP1){
                top = rP1;
            }
            else if(top < 0){
                top = 0;
            }
            scrollBar.style.top = top + "%";
            wrapper.scrollTop = top * sH1;
            sbc.className = S + a;
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
            top = (top/wH * 100);
            if(rP1 < top){
                top = rP1;
            }
            if(!previousTop){
                previousTop = top + 1;
            }
            var blnThreshold = top >= 0 && firstY > offsetTop;
            if((previousTop > top && blnThreshold) || (blnThreshold && (wrapperScrollTop + wH !== sH))){
                scrollBar.style.top = top + "%";
                previousTop = top;                
                var scrollTop = top * sH1;
                wrapper.scrollTop = scrollTop;
            }
            sbc.className = S;
        },
        endScroll = function(e){
            removeEvent('mousemove', document);
            removeEvent('mouseup', document);
            reposition = 0;
            // Enable scroll event
            addEvent('scroll', wrapper, doScroll);
            sbc.className = S + a;
        },
        doScroll = function(e){
            sbc.className = S;
            var element = e.currentTarget;
            var scrollTop = element.scrollTop;
            var top = scrollTop/sH * 100;
            scrollBar.style.top = scrollTop/sH1 + "%";
            sbc.className = S + a;
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
