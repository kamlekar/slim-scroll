var ScrollBar = {
    body: document.getElementsByTagName('body')[0],
    mouseDown: false,
    scrollKit: function (element) {
        this.Y = element.offsetTop;
        this.h = element.offsetHeight;
        //replacing html
        var html = element.innerHTML;
        element.innerHTML = "";
        //Creating elements
        var contentWrapper = document.createElement('div');
        contentWrapper.className = "contentWrapper unselectable";
        contentWrapper.onselectstart = "return false;";
        contentWrapper.ondragstart = "return false;";
        var textContainer = document.createElement('span');
        textContainer.className = "textContainer";
        textContainer.innerHTML = html;
        var scrollBarElement = document.createElement('div');
        scrollBarElement.className = "scroll-bar";
        contentWrapper.appendChild(textContainer);
        contentWrapper.appendChild(scrollBarElement);
        element.appendChild(contentWrapper);
        //assigning elements as global variables
        this.contentWrapper = contentWrapper;
        this.textContainer = textContainer;
        this.scrollBarElement = scrollBarElement;

        var body = this.body;
        var height = contentWrapper.offsetHeight;
        var scrollHeight = contentWrapper.scrollHeight;
        this.sH = scrollHeight;
        var scrollPercentage = (height / scrollHeight);
        if (scrollHeight > height + 5) {
            scrollBarElement.style.height = (height * scrollPercentage) + "px";
            scrollBarElement.style.top = "10px";
            contentWrapper.onscroll = this.scrollBar.bind(this);
            scrollBarElement.onmousedown = this.scrollMouseDown.bind(this);
            body.onmousemove = this.scrollMouseMove.bind(this);
            body.onmouseup = this.scrollMouseUp.bind(this);
        } else {
            Element.hide(scrollBarElement);
        }
    },
    scrollBar: function (e) {
        var elem = e.currentTarget;
        var height = elem.offsetHeight;
        var scrollHeight = elem.scrollHeight;
        var scrollTop = elem.scrollTop;
        var percentage = (height / scrollHeight);
        this.percentage = percentage;
        var barPosition = 10 + scrollTop * percentage;
        var scrollBar = this.scrollBarElement;
        scrollBar.style.top = barPosition + "px";
    },
    scrollMouseDown: function (e) {
        this.mouseDown = true;
    },
    scrollMouseMove: function (e) {
        if (this.mouseDown) {
            var contentWrapper = this.contentWrapper;
            var y1 = e.pageY - this.Y;
            var h = this.h;
            if (y1 >= 0 && y1 <= h) {
                var cP = (y1 / h);
                contentWrapper.scrollTop = this.sH * cP;
            }
        }
    },
    scrollMouseUp: function (e) {
        this.mouseDown = false;
    }
}

var element = document.getElementsByClassName('contentHolder')[0];
ScrollBar.scrollKit(element);