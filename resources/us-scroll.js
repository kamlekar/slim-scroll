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
        $(document).on('mousedown', '.scrollBar', this.setScroll.bind(this));        

        // For scroll
        // $(document).on('scroll', contentHolder, this.goScroll.bind(this));
        this.wrapper.onscroll = this.goScroll.bind(this);
    },
    setScroll: function(e){
        $(document).on('mousemove', 'body', this.beginScroll.bind(this));
        $(document).on('mouseup', 'body', this.endScroll.bind(this));

        // disable scroll event
        this.wrapper.onscroll = null;
        this.offsetTop = this.wrapper.offsetTop;
        this.firstY = e.pageY;
    },
    beginScroll: function(e){
        // move the cursor position and also change the scrollPosition of the container.
        var wrapperScrollTop = $(this.wrapper).scrollTop();
        var top = (e.pageY - this.firstY); 
        if(!this.previousTop){
            this.previousTop = top + 1;
        }

        if((this.previousTop > top && top >= 0 && this.firstY > this.offsetTop) || (this.firstY > this.offsetTop && top >= 0 && (wrapperScrollTop + this.wrapperHeight !== this.scrollHeight))){
            var threshold = 100 - this.scrollPercentage;
            $(this.scrollBar).css({
                'top': top + "px"
            });
            this.previousTop = top;
            var scrollTop = (top/this.wrapperHeight * 100) * this.scrollHeight /100;
            $(this.wrapper).scrollTop(scrollTop);
        }
    },
    endScroll: function(e){
        $(document).off('mousemove', 'body');
        $(document).off('mouseup', 'body');

        // Enable scroll event
        this.wrapper.onscroll = this.goScroll.bind(this);  
    },
    goScroll: function(e){
        var self = $(e.target);
        var scrollTop = self.scrollTop();
        var top = scrollTop/this.scrollHeight * 100;
        $(this.scrollBar).css({
            'top': top + "%"
        });
    }
}

window.onload = function(){
    var element = document.getElementsByClassName('contentHolder')[0];
    ScrollBar.scrollKit(element);
}
