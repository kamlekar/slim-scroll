(function(){
    scrollBar = {
        useSlimScroll: function(container){
            var html = container.innerHTML;
            container.innerHTML = "";

            this.wrapper = this.createElement("wrapper unselectable", "", container);
            this.content = this.createElement("content", html, this.wrapper);
            this.scrollBar = this.createElement("scrollBar", "", this.wrapper);

            this.wrapperHeight = this.wrapper.offsetHeight;
            this.scrollHeight = this.wrapper.scrollHeight;
            this.scrollPercentage = (this.wrapperHeight/this.scrollHeight) * 100;
            
            this.scrollBar.style.height = this.scrollPercentage + "%";
            
            // Attaching mouse events
            this.addEvent('mousedown', this.scrollBar, this.setScroll.bind(this));        

            // For scroll
            this.addEvent('scroll', this.wrapper, this.doScroll.bind(this));
        },
        createElement: function(className, html, parent){
            var div = document.createElement('div');
            div.className = className;
            div.innerHTML = html;
            parent.appendChild(div);
            return div;
        },
        setScroll: function(e){
            this.addEvent('mousemove', document, this.beginScroll.bind(this));
            this.addEvent('mouseup', document, this.endScroll.bind(this));

            // disable scroll event
            this.removeEvent('scroll', this.wrapper);
            this.offsetTop = this.wrapper.offsetTop;
            this.firstY = e.pageY;
        },
        beginScroll: function(e){
            // move the cursor position and also change the scrollPosition of the container.
            var wrapperScrollTop = this.wrapper.scrollTop;
            var top = (e.pageY - this.firstY);
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
