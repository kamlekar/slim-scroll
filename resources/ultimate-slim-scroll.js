// var ScrollBar = {
//     body: document.getElementsByTagName('body')[0],
//     mouseDown: false,
//     scrollKit: function (element) {
//         this.Y = element.offsetTop;
//         this.h = element.offsetHeight;
//         //replacing html
//         var html = element.innerHTML;
//         element.innerHTML = "";
//         //Creating elements
//         var contentWrapper = document.createElement('div');
//         contentWrapper.className = "contentWrapper unselectable";
//         contentWrapper.onselectstart = "return false;";
//         contentWrapper.ondragstart = "return false;";
//         var textContainer = document.createElement('span');
//         textContainer.className = "textContainer";
//         textContainer.innerHTML = html;
//         var scrollBarElement = document.createElement('div');
//         scrollBarElement.className = "scroll-bar";
//         contentWrapper.appendChild(textContainer);
//         contentWrapper.appendChild(scrollBarElement);
//         element.appendChild(contentWrapper);
//         //assigning elements as global variables
//         this.contentWrapper = contentWrapper;
//         this.textContainer = textContainer;
//         this.scrollBarElement = scrollBarElement;

//         var body = this.body;
//         var height = contentWrapper.offsetHeight;
//         var scrollHeight = contentWrapper.scrollHeight;
//         this.sH = scrollHeight;
//         var scrollPercentage = (height / scrollHeight);
//         if (scrollHeight > height + 5) {
//             scrollBarElement.style.height = (height * scrollPercentage) + "px";
//             scrollBarElement.style.top = "10px";
//             contentWrapper.onscroll = this.scrollBar.bind(this);
//             scrollBarElement.onmousedown = this.scrollMouseDown.bind(this);
//             body.onmousemove = this.scrollMouseMove.bind(this);
//             body.onmouseup = this.scrollMouseUp.bind(this);
//         } else {
//             Element.hide(scrollBarElement);
//         }
//     },
//     scrollBar: function (e) {
//         var elem = e.currentTarget;
//         var height = elem.offsetHeight;
//         var scrollHeight = elem.scrollHeight;
//         var scrollTop = elem.scrollTop;
//         var percentage = (height / scrollHeight);
//         this.percentage = percentage;
//         var barPosition = 10 + scrollTop * percentage;
//         var scrollBar = this.scrollBarElement;
//         scrollBar.style.top = barPosition + "px";
//     },
//     scrollMouseDown: function (e) {
//         this.mouseDown = true;
//     },
//     scrollMouseMove: function (e) {
//         if (this.mouseDown) {
//             var contentWrapper = this.contentWrapper;
//             var y1 = e.pageY - this.Y;
//             var h = this.h;
//             if (y1 >= 0 && y1 <= h) {
//                 var cP = (y1 / h);
//                 contentWrapper.scrollTop = this.sH * cP;
//             }
//         }
//     },
//     scrollMouseUp: function (e) {
//         this.mouseDown = false;
//     }
// }

// window.onload = function(){
//     var element = document.getElementsByClassName('contentHolder')[0];
//     ScrollBar.scrollKit(element);
// }




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
        $(document).on('mousedown', this.scrollBar, this.setScroll.bind(this));        

        // For scroll
        // $(document).on('scroll', contentHolder, this.goScroll.bind(this));
        this.wrapper.onscroll = this.goScroll.bind(this);
    },
    setScroll: function(e){
        $(document).on('mousemove', 'body', this.beginScroll.bind(this));
        $(document).on('mouseup', 'body', this.endScroll.bind(this));

        this.firstY = e.pageY;
    },
    beginScroll: function(e){
        // move the cursor position and also change the scrollPosition of the container.
        var top = e.pageY - this.firstY;
        if(top > 0){
            $(this.scrollBar).css({
                'top': top + "px"
            });
        }
    },
    endScroll: function(e){
        $(document).off('mousemove', 'body');
        $(document).off('mouseup', 'body');
    },
    goScroll: function(e){
        console.log($(e.target).scrollTop(), this.scrollHeight, (this.scrollBarHeight * $(e.target).scrollTop()/100));
        var top = (this.scrollBarHeight * $(e.target).scrollTop()/100);
        $(this.scrollBar).css({
            'top': top + "%"
        });
    }
}

window.onload = function(){
    var element = document.getElementsByClassName('contentHolder')[0];
    ScrollBar.scrollKit(element);
}
