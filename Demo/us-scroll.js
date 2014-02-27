var ScrollBar = Class.create();
ScrollBar.prototype = {
    initialize: function () {
        this.scrollKit();
        var element = this.contentHolder;
        this.Y = element.offsetTop;
        this.h = element.getHeight();
    },
    contentHolder: $$('.contentHolder')[0],
    contentWrapper: $$('.contentWrapper')[0],
    scrollBarElement: $$('.scroll-bar')[0],
    body: $$('body')[0],
    mouseDown: false,
    scrollKit: function () {
        var scrollElement = this.contentWrapper;
        var scrollBarElement = this.scrollBarElement;
        var body = this.body;
        var height = scrollElement.offsetHeight;
        var scrollHeight = scrollElement.scrollHeight;
        this.sH = scrollHeight;
        var scrollPercentage = (height / scrollHeight);
        if (scrollHeight > height + 5) {
            scrollBarElement.setStyle({
                height: (height * scrollPercentage) + "px",
                top: "10px"
            });
            Event.observe(scrollElement, 'scroll', this.scrollBar.bind(this));
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
        var scrollBar = this.scrollBarElement;
        scrollBar.setStyle({
            top: barPosition + "px"
        });
    },
    scrollMouseDown: function (e) {
        this.mouseDown = true;
    },
    scrollMouseMove: function (e) {
        if (this.mouseDown) {
            var scrollElement = this.contentWrapper;
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


document.observe("dom:loaded", function() {
	var scrollBar = new ScrollBar();
});
