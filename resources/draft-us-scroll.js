
    function useSlimScroll(container){
        var html = container.innerHTML;
        container.innerHTML = "";

        this.wrapper = createElement("wrapper unselectable", "", container);
        this.content = createElement("content", html, wrapper);
        this.scrollBar = createElement("scrollBar", "", wrapper);

        this.wrapperHeight = wrapper.offsetHeight;
        this.scrollHeight = wrapper.scrollHeight;
        this.scrollPercentage = (wrapperHeight/scrollHeight) * 100;
        
        this.scrollBar.style.height = scrollPercentage + "%";
        
        // Attaching mouse events
        addEvent('mousedown', scrollBar, setScroll.bind(useSlimScroll));        

        // For scroll
        addEvent('scroll', wrapper, doScroll.bind(useSlimScroll));



        function createElement(className, html, parent){
            var div = document.createElement('div');
            div.className = className;
            div.innerHTML = html;
            parent.appendChild(div);
            return div;
        }
        function setScroll(e){
            addEvent('mousemove', document, this.beginScroll.bind(useSlimScroll));
            this.addEvent('mouseup', document, this.endScroll.bind(useSlimScroll));

            // disable scroll event
            this.removeEvent('scroll', this.wrapper);
            this.offsetTop = this.wrapper.offsetTop;
            this.firstY = e.pageY;
        }
        function beginScroll(e){
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
        }
        function endScroll(e){
            this.removeEvent('mousemove', document);
            this.removeEvent('mouseup', document);

            // Enable scroll event
            this.addEvent('scroll', this.wrapper, this.doScroll.bind(useSlimScroll));
        }
        function doScroll(e){
            var element = e.currentTarget;
            var scrollTop = element.scrollTop;
            var top = scrollTop/this.scrollHeight * 100;
            this.scrollBar.style.top = top + "%";
        }
        function addEvent(event, element, func){
            element['on' + event] = func;
            // element.addEventListener(event, func, false);
        }
        function removeEvent(event, element){
            element['on' + event] = null;
            // element.removeEventListener(event, func, false);
        }
    }
        
    

