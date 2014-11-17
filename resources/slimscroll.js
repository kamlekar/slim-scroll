var scroll = (function(){
    var v = [],
        reposition = false,
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
            if(C.offsetHeight < C.scrollHeight){
                var h = C.innerHTML;
                C.innerHTML = "";
                var k = v.length;
                v[k] = {};
                v[k].wrapper = createElement(w + u + m, "", C);
                v[k].content = createElement(c, h, v[k].wrapper);
                // content.setAttribute("unselectable","on"); /* IE8 unselectable fix */
                v[k].sbc = createElement(S + a, "", v[k].wrapper);
                v[k].scrollBar = createElement(s, "", v[k].sbc);


                v[k].wH = v[k].wrapper.offsetHeight;
                v[k].sH = v[k].wrapper.scrollHeight;
                v[k].sP = (v[k].wH/v[k].sH) * 100;
                // Manually set the height of the scrollbar (in percentage)
                v[k].sP1 = v[k].sP;

                v[k].rP1 = 100 - v[k].sP1;
                v[k].x = (v[k].sH - v[k].wH) * ((v[k].sP1 - v[k].sP)/(100 - v[k].sP));
                v[k].sH1 = Math.abs((v[k].x / (v[k].rP1)) + (v[k].sH/100));

                // register global v


                v[k].scrollBar.style.height = v[k].sP1 + "%";

                //store the key 'k' in the container

                setAttribute('scroll-k', k);

                // Attaching mouse events
                addEvent('mousedown', v[k].scrollBar, beginScroll);
                addEvent('click', v[k].sbc, setScroll);

                // For scroll
                addEvent('scroll', v[k].wrapper, doScroll);
                // content.onselectstart = function() { return false; }
            }
        },
        setAttribute = function(p, k){
            v[k].wrapper.setAttribute(p, k);
        },
        getAttribute = function(k, p){
            return v[k].wrapper.getAttribute(p);
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

            var sbc = e.currentTarget;
            var scrollBar = sbc.querySelector('.scrollBar');
            var wrapper = sbc.parentElement;

            var k = getAttribute(k, 'scroll-k');

            v[k].scrollBar.className = s;
            var el = e.target || event.srcElement;
            var parentElement = el.parentElement || el.parentNode;
            if(parentElement === v[k].sbc){
                return false;
            }
            var ePageY = e.pageY || event.clientY;
            var top = ((ePageY - v[k].wrapper.parentElement.offsetTop)/v[k].wH * 100) - v[k].sP1/2;
            if(top > v[k].rP1){
                top = v[k].rP1;
            }
            else if(top < 0){
                top = 0;
            }
            v[k].scrollBar.style.top = top + "%";
            v[k].wrapper.scrollTop = top * v[k].sH1;
            v[k].sbc.className = S + a;
        },
        beginScroll = function(e){
            var e = e || event;

            // Elements
            var scrollBar = e.currentTarget;
            var sbc = scrollBar.parentElement;
            var wrapper = sbc.parentElement;

            var k = getAttribute(k, 'scroll-k');

            addEvent('mousemove', document, moveScroll);
            addEvent('mouseup', document, endScroll);

            // disable scroll event
            removeEvent('scroll', v[k].wrapper);

            v[k].offsetTop = v[k].wrapper.offsetTop;
            v[k].firstY = e.pageY || event.clientY;

            if(!v[k].reposition){
                v[k].reposition = scrollBar.offsetTop;
            }

            currentkey = k;
        },
        moveScroll = function(e){
            var e = e || event;
            // move the cursor position and also change the scrollPosition of the container.
            var k = currentkey; 

            var wrapperScrollTop = v[k].wrapper.scrollTop;
            var ePageY = e.pageY || event.clientY;
            var top = v[k].reposition + ePageY - v[k].firstY;
            top = (top/v[k].wH * 100);
            if(v[k].rP1 < top){
                top = v[k].rP1;
            }
            if(!v[k].previousTop){
                v[k].previousTop = top + 1;
            }
            var blnThreshold = top >= 0 && v[k].firstY > v[k].offsetTop;
            if((v[k].previousTop > top && blnThreshold) || (blnThreshold && (wrapperScrollTop + v[k].wH !== v[k].sH))){
                v[k].scrollBar.style.top = top + "%";
                v[k].previousTop = top;                
                var scrollTop = top * v[k].sH1;
                v[k].wrapper.scrollTop = scrollTop;
            }

            v[k].sbc.className = S;
        },
        endScroll = function(e){
            var e = e || event;

            var k = currentkey; 

            removeEvent('mousemove', document);
            removeEvent('mouseup', document);

            v[k].reposition = 0;

            // Enable scroll event
            addEvent('scroll', v[k].wrapper, doScroll);
            v[k].sbc.className = S + a;
        },
        doScroll = function(e){
            var e = e || event;


            var wrapper = e.currentTarget;

            var k = getAttribute(k, 'scroll-k');

            v[k].sbc.className = S;
            var scrollTop = v[k].wrapper.scrollTop;
            var top = scrollTop/v[k].sH * 100;
            v[k].scrollBar.style.top = scrollTop/v[k].sH1 + "%";
            v[k].sbc.className = S + a;
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
