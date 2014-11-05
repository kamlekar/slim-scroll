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
        var top = this.scrollBar.style.top;
        console.log("top", parseInt(top, 10));
        top = top.length?parseInt(top, 10)*100/this.wrapperHeight: 0;
        // console.log(this.firstY);
        console.log('top percent', top, (e.pageY - this.firstY)/this.wrapperHeight * 100);
        top += (e.pageY - this.firstY)/this.wrapperHeight * 100; 
        var threshold = 100 - this.scrollPercentage;
        console.log(top);
        if(top > 0 && top <= threshold){
            $(this.scrollBar).css({
                'top': top + "%"
            });
            var scrollTop = top * this.scrollHeight /100;
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
