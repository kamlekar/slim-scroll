var scroll = (function(){
        var useSlimScroll = function(container){

            // Polyfill for IE8
            if (!Function.prototype.bind) {
                Function.prototype.bind = function(oThis) {
                    if (typeof this !== 'function') {
                        // closest thing possible to the ECMAScript 5
                        // internal IsCallable function
                        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
                    }

                    var aArgs   = Array.prototype.slice.call(arguments, 1),
                        fToBind = this,
                        fNOP    = function() {},
                        fBound  = function() {
                            return fToBind.apply(this instanceof fNOP && oThis
                                ? this
                                : oThis,
                                aArgs.concat(Array.prototype.slice.call(arguments)));
                        };

                    fNOP.prototype = this.prototype;
                    fBound.prototype = new fNOP();

                    return fBound;
                };
            }


            var html = container.innerHTML;
            container.innerHTML = "";

            var e = {
                w: "wrapper",
                u: " unselectable",
                c: "content",
                S: "scrollBarContainer",
                s: "scrollBar"
            }
            wrapper = createElement(e.w + e.u, "", container);
            content = createElement(e.c, html, wrapper);
            // content.setAttribute("unselectable","on");
            scrollBarContainer = createElement(e.S, "", wrapper);
            scrollBar = createElement(e.s, "", scrollBarContainer);

            wrapperHeight = wrapper.offsetHeight;
            scrollHeight = wrapper.scrollHeight;
            scrollPercentage = (wrapperHeight/scrollHeight) * 100;

            scrollBar.style.height = scrollPercentage + "%";

            // Attaching mouse events
            addEvent('mousedown', scrollBar, beginScroll.bind(scroll));
            addEvent('click', scrollBarContainer, setScroll.bind(scroll));

            // For scroll
            addEvent('scroll', wrapper, doScroll.bind(scroll));
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
            var top = ((ePageY - wrapper.parentElement.offsetTop)/wrapperHeight * 100) - scrollPercentage/2;
            var threshold = 100 - scrollPercentage;
            if(top > threshold){
                top = threshold;
            }
            else if(top < 0){
                top = 0;
            }
            scrollBar.style.top = top + "%";
        },
        beginScroll = function(e){
            var e = e || event;
            addEvent('mousemove', document, moveScroll.bind(scroll));
            addEvent('mouseup', document, endScroll.bind(scroll));

            // disable scroll event
            removeEvent('scroll', wrapper);
            offsetTop = wrapper.offsetTop;
            firstY = e.pageY || event.clientY;
            if(!this.reposition){
                reposition = scrollBar.offsetTop;
            }
        },
        moveScroll = function(e){
            var e = e || event;
            // move the cursor position and also change the scrollPosition of the container.
            var wrapperScrollTop = wrapper.scrollTop;
            var ePageY = e.pageY || event.clientY;
            var top = reposition + ePageY - firstY;
            top = (top/wrapperHeight * 100);
            if(!scroll.previousTop){
                scroll.previousTop = top + 1;
            }
            var blnThreshold = top >= 0 && firstY > offsetTop;
            if((scroll.previousTop > top && blnThreshold) || (blnThreshold && (wrapperScrollTop + wrapperHeight !== scrollHeight))){
                var threshold = 100 - scrollPercentage;
                scrollBar.style.top = top + "%";
                scroll.previousTop = top;
                var scrollTop = top * scrollHeight /100;
                wrapper.scrollTop = scrollTop;
            }
        },
        endScroll = function(e){
            removeEvent('mousemove', document);
            removeEvent('mouseup', document);
            scroll.reposition = 0;
            // Enable scroll event
            addEvent('scroll', wrapper, doScroll.bind(scroll));
        },
        doScroll = function(e){
            var element = e.currentTarget;
            var scrollTop = element.scrollTop;
            var top = scrollTop/scrollHeight * 100;
            scrollBar.style.top = top + "%";
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
