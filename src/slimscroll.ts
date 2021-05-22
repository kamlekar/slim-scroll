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
  wrraper?: HTMLElement;
  scrollBarContainer?: HTMLElement;
  scrollHeight?: number;
  height?: number;
  scrollInPercentage?: number;
  scrollInPercentageOne?: number;
  scrollBarHeight?: number;

}

class SlimScroll {
  instance: Instance = {};
  scrollContainer: HTMLElement;
  options: Options;
  initDone?: boolean;
  initInProcess?: boolean;
  isSlimScrollInserted?: boolean;
  scrollElementMark: string = 'data-slimscroll';
  constructor(scrollContainer: HTMLElement, options: Options) {
    this.scrollContainer = scrollContainer;
    this.options = options;
  }

  // Initial function
  init() {
    this.removeSlimScroll();
    if(this.scrollBarVisible()){
        this.initDone = true;
        this.initInProcess = true;
        this.setAttribute(this.scrollContainer, this.scrollElementMark, '1');
        insertCss();
        const options = this.options;
        var h = C[iH], q = i.E = {};
        // setting user defined classes
        q.w = options.wrapperClass || "";
        q.s = options.scrollBarClass || "";
        q.S = options.scrollBarContainerClass || "";
        q.a = options.scrollBarContainerSpecialClass ? " " + options.scrollBarContainerSpecialClass : "";
        q.mH = options.scrollBarMinHeight || 25;
        q.sH = options.scrollBarFixedHeight;  // could be undefined

        C[iH] = "";
        i[w] = cE(q.w, h, C);
        i[S] = cE(q.S + q.a, "", C);
        i[s] = cE(q.s, "", i[S]);
        setAttr(i[s], 'data-scrollbar', '1');
        assignValues();

        placeIt();
        if(payload.keepFocus){
            setAttr(i[w], 'tabindex', '-1');
            i[w].focus();
        }
        // Attaching mouse events
        addEvent('mousedown', i[s], beginScroll);
        addEvent('click', i[S], setScroll);
        // For scroll
        addEvent('scroll', i[w], doScroll);
        // addEvent('selectstart', i[S], function(){return;});
        this.initInProcess = false;
    }
    else{
        removeSlimScroll();
        return;     // don't do any further operations
    }
  },

  scrollBarVisible(x?: HTMLElement) {
    if(!x) x = this.scrollContainer;
    return x.offsetHeight < x.scrollHeight;
  },

  removeSlimScroll() {
    const C = this.scrollContainer;
    C.removeAttribute(this.scrollElementMark);  //reset
    if(this.isSlimScrollInserted){
        var insideContent = C.firstChild.innerHTML;
        if(insideContent){
            C.innerHTML = insideContent;
        }
    }
    this.isSlimScrollInserted = false;
    this.initDone = false;

  },

  assignValues() {
    const obj = this.instance;
    if(!this.initInProcess){
      if(!this.initDone){    // If i object is empty
          this.init();       // Initialize again
      }

      if(!scrollBarVisible(i[w])){
          removeSlimScroll();
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
