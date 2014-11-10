(function(){
    scrollBar = {
        useSlimScroll: function(container){

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

            this.wrapper = this.createElement("wrapper unselectable", "", container);
            this.content = this.createElement("content", html, this.wrapper);
            this.content.setAttribute("unselectable","on");
            this.scrollBarContainer = this.createElement("scrollBarContainer", "", this.wrapper);
            this.scrollBar = this.createElement("scrollBar", "", this.scrollBarContainer);

            this.wrapperHeight = this.wrapper.offsetHeight;
            this.scrollHeight = this.wrapper.scrollHeight;
            this.scrollPercentage = (this.wrapperHeight/this.scrollHeight) * 100;

            this.scrollBar.style.height = this.scrollPercentage + "%";

            // Attaching mouse events
            this.addEvent('mousedown', this.scrollBar, this.beginScroll.bind(this));
            this.addEvent('click', this.scrollBarContainer, this.setScroll.bind(this));

            // For scroll
            this.addEvent('scroll', this.wrapper, this.doScroll.bind(this));
            // this.content.onselectstart = function() { return false; }
        },
        createElement: function(className, html, parent){
            var div = document.createElement('div');
            div.className = className;
            div.innerHTML = html;
            parent.appendChild(div);
            return div;
        },
        setScroll: function(e){
            var e = e || event;
            var el = e.target || event.srcElement;
            var parentElement = el.parentElement || el.parentNode;
            if(parentElement === this.scrollBarContainer){
                return false;
            }
            var ePageY = e.pageY || event.clientY;
            var top = ((ePageY - this.wrapper.parentElement.offsetTop)/this.wrapperHeight * 100) - this.scrollPercentage/2;
            var threshold = 100 - this.scrollPercentage;
            if(top > threshold){
                top = threshold;
            }
            else if(top < 0){
                top = 0;
            }
            this.scrollBar.style.top = top + "%";
        },
        beginScroll: function(e){
            var e = e || event;
            this.addEvent('mousemove', document, this.moveScroll.bind(this));
            this.addEvent('mouseup', document, this.endScroll.bind(this));

            // disable scroll event
            this.removeEvent('scroll', this.wrapper);
            this.offsetTop = this.wrapper.offsetTop;
            this.firstY = e.pageY || event.clientY;
            if(!this.reposition){
                this.reposition = this.scrollBar.offsetTop;
            }
        },
        moveScroll: function(e){
            var e = e || event;
            // move the cursor position and also change the scrollPosition of the container.
            var wrapperScrollTop = this.wrapper.scrollTop;
            var ePageY = e.pageY || event.clientY;
            var top = this.reposition + ePageY - this.firstY;
            top = (top/this.wrapperHeight * 100);
            if(!this.previousTop){
                this.previousTop = top + 1;
            }
            var blnThreshold = top >= 0 && this.firstY > this.offsetTop;
            if((this.previousTop > top && blnThreshold) || (blnThreshold && (wrapperScrollTop + this.wrapperHeight !== this.scrollHeight))){
                var threshold = 100 - this.scrollPercentage;
                this.scrollBar.style.top = top + "%";
                this.previousTop = top;
                var scrollTop = top * this.scrollHeight /100;
                this.wrapper.scrollTop = scrollTop;
            }
        },
        endScroll: function(e){
            this.removeEvent('mousemove', document);
            this.removeEvent('mouseup', document);
            this.reposition = 0;
            // Enable scroll event
            this.addEvent('scroll', this.wrapper, this.doScroll.bind(this));
        },
        doScroll: function(e){
            var element = e.currentTarget;
            var scrollTop = element.scrollTop;
            var top = scrollTop/this.scrollHeight * 100;
            this.scrollBar.style.top = top + "%";
        },
        addEvent: function(event, element, func){
            element['on' + event] = func;
            // element.addEventListener(event, func, false);
        },
        removeEvent: function(event, element){
            element['on' + event] = null;
            // element.removeEventListener(event, func, false);
        },
    }
})(window);
