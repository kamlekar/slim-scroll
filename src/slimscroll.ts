type Options = {
  wrapperClass: string;
  scrollBarClass: string;
  scrollBarContainerClass: string;
  scrollBarContainerSpecialClass: string;
  scrollBarMinHeight: number;
  scrollBarFixedHeight?: number;
  keepFocus: boolean;
};

type Instance = {
  wrapper: HTMLElement;
  scrollBarContainer: HTMLElement;
  scrollBar: HTMLElement;
  scrollHeight?: number;
  height: number;
  scrollInPercentage?: number;
  scrollInPercentageOne?: number;
  scrollBarHeight?: number;
  options?: Options;
  offsetTop?: number;
  firstY?: number;
  reposition?: number;
};

class SlimScroll {
  instance: Instance;
  scrollContainer: HTMLElement;
  options: Options = {
    wrapperClass: '',
    scrollBarClass: '',
    scrollBarContainerClass: '',
    scrollBarContainerSpecialClass: '',
    scrollBarMinHeight: 25,
    scrollBarFixedHeight: 0,
    keepFocus: false
  };
  initDone?: boolean;
  initInProcess?: boolean;
  isSlimScrollInserted?: boolean;
  scrollElementMark: string = 'data-slimscroll';
  constructor(scrollContainer: HTMLElement, options: Options) {
    this.removeSlimScroll();
    if(this.scrollBarVisible()){
      this.scrollContainer = scrollContainer;
      const {
        wrapperClass = '',
        scrollBarClass = '',
        scrollBarContainerSpecialClass,
        scrollBarMinHeight = 25,
        scrollBarFixedHeight
      } = options;
      this.options = {
        ...options,
        wrapperClass,
        scrollBarClass,
        scrollBarContainerClass: `${scrollBarContainerSpecialClass? ' ' + scrollBarContainerSpecialClass: ''}`,
        scrollBarContainerSpecialClass,
        scrollBarMinHeight,
        scrollBarFixedHeight
      };

      this.init();
    }
  }

  // Initial function
  init() {
    this.removeSlimScroll();
    if(this.scrollBarVisible()){
        this.initDone = true;
        this.initInProcess = true;
        this.setAttribute(this.scrollContainer, this.scrollElementMark, '1');
        this.insertCss();
        const options = this.options;
        const C = this.scrollContainer;
        var h = C.innerHTML;
        
        C.innerHTML = "";
        const scrollBarContainer = this.createElement(options.scrollBarContainerClass + options.scrollBarContainerSpecialClass, "", C);
        this.instance = {
          wrapper: this.createElement(options.wrapperClass, h, C),
          scrollBarContainer,
          scrollBar: this.createElement(options.scrollBarClass, "", scrollBarContainer),
          height: 0
        };
        let i: Instance = this.instance;
        this.setAttribute(i.scrollBar, 'data-scrollbar', '1');
        this.assignValues();

        this.placeIt(i.wrapper);
        if(options.keepFocus){
            this.setAttribute(i.wrapper, 'tabindex', '-1');
            i.wrapper.focus();
        }
        // Attaching mouse events
        this.addEvent('mousedown', i.scrollBar, this.beginScroll);
        this.addEvent('click', i.scrollBarContainer, this.setScroll);
        // For scroll
        this.addEvent('scroll', i.wrapper, this.doScroll);
        // addEvent('selectstart', i[S], function(){return;});
        this.initInProcess = false;
    }
    else{
        this.removeSlimScroll();
        return;     // don't do any further operations
    }
  };

  setScroll(e: MouseEvent) {
    var e = e || window.event;
    var el = (e.target || window.event?.srcElement) as HTMLElement;
    var p = el.parentElement || el.parentNode;
    var i = this.instance;
    var q = i.options;

    if(!i || p === i.scrollBarContainer) return;
    var eY = e.pageY || (window.event as any)?.clientY,
        top = ((eY - this.getTop(i[w][pE] || i[w][pN]))/i.h * 100) - i.sP1/2;
    if(top > i.rP1) top = i.rP1;
    else if(top < 0) top = 0;
    i[s].style.top = top + U;
    i[w][sT] = top * i.sH1;
    addClass(i[S], q.S + q.a);
  },

  beginScroll(event: MouseEvent) {
    this.clearSelection();
    var i = this.instance;
    var e = event || window.event,
        el = event.currentTarget || event.srcElement;

    this.addEvent('mousemove', document as any, this.moveScroll);
    this.addEvent('mouseup', document as any, this.endScroll);

    i.offsetTop = this.getTop(i.wrapper);
    i.firstY = e.pageY || event.clientY;
    if(!i.reposition) i.reposition = this.getReposition(i.scrollBar, i.height);
    // Disable text selection while dragging the scrollbar
    return false;
  };
  
  getTop = function(element: HTMLElement){
    var t = document.documentElement.scrollTop;
    return element.getBoundingClientRect().top + (t?t:document.body.scrollTop);
  };

  clearSelection() {
    // removing selected text
    // Link: http://stackoverflow.com/a/3171348
    var sel = window.getSelection ? window.getSelection() : (document as any).selection;
    if (sel) {
        if (sel.removeAllRanges) sel.removeAllRanges();
        else if (sel.empty) sel.empty();
    }
  };

  getReposition = function(element: HTMLElement, height: number){
    var x = parseInt(element.style.top.replace(U,""),10) * height/100;
    return x?x:0;
  };
  
  addEvent = function(eventName: string, element: HTMLElement, callback: Function){
    element['on' + eventName] = callback;
    // el.addEventListener(e, func, false);
  };

  createElement(c: string, h: string, p: HTMLElement) {
    var d = document.createElement('div');
    this.addClass(d, c);
    d.innerHTML = h;
    p.appendChild(d);
    return d;
  };

  scrollBarVisible(x?: HTMLElement) {
    if(!x) x = this.scrollContainer;
    return x.offsetHeight < x.scrollHeight;
  };

  removeSlimScroll() {
    const C = this.scrollContainer;
    C.removeAttribute(this.scrollElementMark);  //reset
    if(this.isSlimScrollInserted){
        var insideContent = (C.firstChild as HTMLElement)?.innerHTML || '';
        if(insideContent){
            C.innerHTML = insideContent;
        }
    }
    this.isSlimScrollInserted = false;
    this.initDone = false;
  };

  placeIt(wrapperElement: HTMLElement) {
    // Show the default scrollbar to get the scrollbar width
    const i = this.instance;
    wrapperElement.style.overflow = "";
    var scrollBarWidth = wrapperElement.offsetWidth - wrapperElement.clientWidth;
    // Stretching the inner container so that the default scrollbar is completely invisible
    wrapperElement.style.right = -scrollBarWidth + "px";
    this.isSlimScrollInserted = true;
    if(this.options.keepFocus){
        this.setAttribute(wrapperElement, 'tabindex', '-1');
        wrapperElement.focus();
    }
  };

  insertCss() {
    if(!window.slimScrollStylesApplied){
        if(this.isSlimScrollInserted){
            this.initInProcess = false;
            return;
        }
        // Inserting css rules
        // Link: http://davidwalsh.name/add-rules-stylesheets
        var slim = `[${this.scrollElementMark}]`,
            imp = " !important",
            pA = `position:absolute${imp}`,
            // classes
            w = `
              ${pA};
              left: 0px;
              right:0px;
              top:0px${imp};
              bottom:0px${imp};
              overflow: auto${imp};
              padding-right:8px${imp};
            `,
            S = `
              ${pA};
              right:0px;
              left:auto;
              width:5px;
              top:0px${imp};
              bottom:0px${imp};
              cursor:pointer${imp};
              padding-right:0px${imp};
            `,
            s = `
              ${pA};
              background-color:#999;
              top:0px;
              left:0px;
              right:0px;
            `,
            //creating a sheet
            style = document.createElement('style'),
            scrollBar = "[data-scrollbar]";
        try{
            // WebKit hack :(
            style.appendChild(document.createTextNode(""));
        }catch(ex){}

        var head =  document.head || document.getElementsByTagName('head')[0];

        // adding above css to the sheet
        head.insertBefore(style, (head.hasChildNodes())
                            ? head.childNodes[0]
                            : null);
        var sheet = style.sheet;
        if(sheet){
            this.addCSSRule(sheet, slim+">div", w, 0);
            this.addCSSRule(sheet, slim+">div+div", S, 0);
            this.addCSSRule(sheet, scrollBar, s, 0);
        }
        else{
            // For old browsers
            (style as any).styleSheet = `
              ${slim} > div {
                ${w}
              }
              ${slim} > div + div {
                ${S}
              }
              ${slim} > div + div > div {
                ${s}
              }
            `;
        }
        this.isSlimScrollInserted = true;
        window.slimScrollStylesApplied = true;
    }
  };

  addCSSRule = function(S: CSSStyleSheet, s: string, r: string, i: number) {
    if(S.insertRule) S.insertRule(s + "{" + r + "}", i);
    else if(S.addRule) S.addRule(s, r, i);
  };

  assignValues() {
    const obj = this.instance;
    if(!this.initInProcess){
      if(!this.initDone){    // If i object is empty
          this.init();       // Initialize again
      }

      if(!this.scrollBarVisible(obj.wrapper)){
          this.removeSlimScroll();
          return;
      }
    }

    // hide the scrollbar temporarily to take the calculations correctly
    obj.wrraper.setAttribute("style", "overflow: hidden !important");
    var q = obj.E;
    i.h = i[S].offsetHeight;
    i.sH = i[w].scrollHeight;
    i.sP = (i.h/i.sH) * 100;
    // i.sbh is scroll bar height in pixels without pixel unit.
    i.sbh = i.sP * i.h/100;
    // Manually set the height of the scrollbar (in percentage)
    // if user hasn't provided the fixed scroll height value
    if(!q.sH) i.sP1 = i.sbh < q.mH? (q.mH/i.h * 100): i.sP;
    else i.sP1 = q.sH/i.h * 100;

    i.rP1 = 100 - i.sP1;
    i.x = (i.sH - i.h) * ((i.sP1 - i.sP)/(100 - i.sP));
    i.sH1 = Math.abs((i.x / (i.rP1)) + (i.sH/100));
    i[s].style.height = i.sP1 + U;

    i.reposition = getReposition(i[s], i.h);
  }

  setAttribute(element: HTMLElement, key: string, value: string) {
    element.setAttribute(key, value);
  }

  getAttribute(element: HTMLElement, key: string){
    if(!element) return;
    return element.getAttribute(key);
  }

  addClass(element: HTMLElement, classString: string) {
    if(classString.length) {
      element.className = classString;
    }
  }
}
