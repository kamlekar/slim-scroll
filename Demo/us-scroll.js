var ScrollBar = Class.create();
ScrollBar.prototype = {
    initialize: function () {
        this.scrollKit();
        var element = $$('.contentHolder')[0];
        this.Y = element.offsetTop;
        this.h = element.getHeight();
    },
    mouseDown: false,
    scrollKit: function () {
        var scrollElement = $$('.contentWrapper')[0];
        var body = $$('body')[0];
        var height = scrollElement.offsetHeight;
        var scrollHeight = scrollElement.scrollHeight;
        this.sH = scrollHeight;
        var scrollPercentage = (height / scrollHeight);
        var scrollBarElement = $$('.scroll-bar')[0];
        if (scrollHeight > height + 5) {
            scrollBarElement.setStyle({
                height: (height * scrollPercentage) + "px",
                top: "10px"
            });
            Event.observe(scrollElement, 'scroll', this.scrollBar);
            Event.observe(scrollBarElement, 'mousedown', this.scrollMouseDown.bind(this));
            Event.observe(body, 'mousemove', this.scrollMouseMove.bind(this));
            Event.observe(body, 'mouseup', this.scrollMouseUp.bind(this));
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
        var scrollBar = $$('.scroll-bar')[0];
        scrollBar.setStyle({
            top: barPosition + "px"
        });
    },
    scrollMouseDown: function (e) {
        this.mouseDown = true;
    },
    scrollMouseMove: function (e) {
        if (this.mouseDown) {
            var scrollElement = $$('.contentWrapper')[0];
            var y1 = e.pageY - this.Y;
            var h = this.h;
            if (y1 >= 0 && y1 <= h) {
                var cP = (y1 / h);
                scrollElement.scrollTop = this.sH * cP;
            }
        }
    },
    scrollMouseUp: function (e) {
        this.mouseDown = false;
    }
}

var scrollBar = new ScrollBar();
