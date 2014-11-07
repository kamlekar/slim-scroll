var  ScrollBar = {
    scrollKit: function(contentHolder){
        this.content = contentHolder.getElementsByClassName('content')[0];
        this.wrapper = contentHolder.getElementsByClassName('wrapper')[0];
        this.scrollBar = contentHolder.getElementsByClassName('scrollBar')[0];
        this.wrapperHeight = this.wrapper.offsetHeight;
        this.scrollHeight = this.wrapper.scrollHeight;
        this.scrollPercentage = (this.wrapperHeight/this.scrollHeight) * 100;
        
        this.scrollBarHeight = (this.scrollPercentage * this.wrapperHeight/100);
        this.scrollBar.style.height = this.scrollBarHeight + "px";
        
        // Attaching mouse events
        this.scrollBar.onmousedown = this.setScroll.bind(this);        

        // For scroll
        this.wrapper.onscroll = this.goScroll.bind(this);
    },
    setScroll: function(e){
        document.onmousemove = this.beginScroll.bind(this);
        document.onmouseup = this.endScroll.bind(this);

        // disable scroll event
        this.wrapper.onscroll = null;
        this.offsetTop = this.wrapper.offsetTop;
        this.firstY = e.pageY;
    },
    beginScroll: function(e){
        // move the cursor position and also change the scrollPosition of the container.
        var wrapperScrollTop = this.wrapper.scrollTop;
        var top = (e.pageY - this.firstY); 
        if(!this.previousTop){
            this.previousTop = top + 1;
        }
        var blnThreshold = top >= 0 && this.firstY > this.offsetTop;
        if((this.previousTop > top && blnThreshold) || (blnThreshold && (wrapperScrollTop + this.wrapperHeight !== this.scrollHeight))){
            var threshold = 100 - this.scrollPercentage;
            this.scrollBar.style.top = top + "px";
            this.previousTop = top;
            var scrollTop = (top/this.wrapperHeight * 100) * this.scrollHeight /100;
            this.wrapper.scrollTop = scrollTop;
        }
    },
    endScroll: function(e){
        document.onmousemove = null;
        document.onmouseup = null;

        // Enable scroll event
        this.wrapper.onscroll = this.goScroll.bind(this);  
    },
    goScroll: function(e){
        var element = e.currentTarget;
        var scrollTop = element.scrollTop;
        var top = scrollTop/this.scrollHeight * 100;
        this.scrollBar.style.top = top + "%";
    }
}

window.onload = function(){
    var element = document.getElementsByClassName('contentHolder')[0];
    ScrollBar.scrollKit(element);
}
