    (function(w){
        ScrollBar = {
            scrollKit: function(contentHolder){
                var html = contentHolder.innerHTML;
                contentHolder.innerHTML = "";

                this.wrapper = document.createElement('div');
                this.wrapper.className = "wrapper unselectable";

                this.content = document.createElement('div');
                this.content.className = "content";
                this.content.innerHTML = html;
                this.wrapper.appendChild(this.content);


                this.scrollBar = document.createElement('div');
                this.scrollBar.className = "scrollBar";
                this.wrapper.appendChild(this.scrollBar);

                contentHolder.appendChild(this.wrapper);

                this.wrapperHeight = this.wrapper.offsetHeight;
                this.scrollHeight = this.wrapper.scrollHeight;
                this.scrollPercentage = (this.wrapperHeight/this.scrollHeight) * 100;
                
                this.scrollBar.style.height = this.scrollPercentage + "%";
                
                // Attaching mouse events
                this.scrollBar.onmousedown = this.setScroll.bind(this);        

                // For scroll
                this.wrapper.addEventListener('scroll', this.goScroll.bind(this));
            },
            setScroll: function(e){
                document.addEventListener('mousemove', this.beginScroll.bind(this));
                document.addEventListener('mouseup', this.endScroll.bind(this));

                // disable scroll event
                this.wrapper.onscroll = null;
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
                document.removeEventListener('mousemove', this.beginScroll.bind(this), true);
                document.removeEventListener('mouseup', this.endScroll.bind(this), true);

                // Enable scroll event
                this.wrapper.removeEventListener('scroll', this.goScroll.bind(this));  
            },
            goScroll: function(e){
                var element = e.currentTarget;
                var scrollTop = element.scrollTop;
                var top = scrollTop/this.scrollHeight * 100;
                this.scrollBar.style.top = top + "%";
            }
        }
    })(window);
