var scroll = (function(){
    var v = [],
        reposition = false,
        previousTop = false,
        w = "wrapper",
        c = "content",
        s = "scrollBar",
        S = "scrollBarContainer",
        u = " unselectable",
        // mac animation classes. pass empty string to make the scroll work normally.
        a = " animate",
        m = " mac",
        // properties
        cN = "className",
        oT = "offsetTop",
        pE = "parentElement",
        cT = "currentTarget",
        sK = "scroll-k",
        U = "%",
        d = ".",
        useSlimScroll = function(C){
            if(C.offsetHeight < C.scrollHeight){
                var h = C.innerHTML,
                    k = v.length;
                C.innerHTML = "";
                v[k] = {};
                v[k][w] = cE(w + u + m, "", C);
                v[k][c] = cE(c, h, v[k][w]);
                // v[k][c].sA("unselectable","on"); /* IE8 unselectable fix */
                v[k].sbc = cE(S + a, "", v[k][w]);
                v[k].scrollBar = cE(s, "", v[k].sbc);


                v[k].wH = v[k][w].offsetHeight;
                v[k].sH = v[k][w].scrollHeight;
                v[k].sP = (v[k].wH/v[k].sH) * 100;
                // Manually set the height of the scrollbar (in percentage)
                v[k].sP1 = v[k].sP;

                v[k].rP1 = 100 - v[k].sP1;
                v[k].x = (v[k].sH - v[k].wH) * ((v[k].sP1 - v[k].sP)/(100 - v[k].sP));
                v[k].sH1 = Math.abs((v[k].x / (v[k].rP1)) + (v[k].sH/100));

                // register global v


                v[k].scrollBar.style.height = v[k].sP1 + U;

                //store the key 'k' in the container

                setAttr(sK, k);

                // Attaching mouse events
                addEvent('mousedown', v[k].scrollBar, beginScroll);
                addEvent('click', v[k].sbc, setScroll);

                // For scroll
                addEvent('scroll', v[k][w], doScroll);
                // content.onselectstart = function() { return false; }
            }
        },
        setAttr = function(p, k){
            v[k][w].setAttribute(p, k);
        },
        getAttr = function(e, p){
            return e.getAttribute(p);
        },
        cE = function(c, h, p){
            var div = document.createElement('div');
            div[cN] = c;
            div.innerHTML = h;
            p.appendChild(div);
            return div;
        },
        setScroll = function(e){
            var e = e || event,
                el = e.target || event.srcElement,
                parentElement = el[pE] || el.parentNode,
                k = getAttr(e[cT][pE], sK);

            if(!v[k] || parentElement === v[k].sbc){
                return false;
            }
            v[k].scrollBar[cN] = s;
            var ePageY = e.pageY || event.clientY,
                top = ((ePageY - v[k][w][pE][oT])/v[k].wH * 100) - v[k].sP1/2;
            if(top > v[k].rP1){
                top = v[k].rP1;
            }
            else if(top < 0){
                top = 0;
            }
            v[k].scrollBar.style.top = top + U;
            v[k][w].scrollTop = top * v[k].sH1;
            v[k].sbc[cN] = S + a;
        },
        beginScroll = function(e){
            var e = e || event,
                k = getAttr(e[cT][pE][pE], sK);

            addEvent('mousemove', document, moveScroll);
            addEvent('mouseup', document, endScroll);

            // disable scroll event
            removeEvent('scroll', v[k][w]);

            v[k][oT] = v[k][w][oT];
            v[k].firstY = e.pageY || event.clientY;

            if(!v[k].reposition){
                v[k].reposition = v[k].scrollBar[oT];
            }

            currentkey = k;
        },
        moveScroll = function(e){
            var e = e || event,
                k = currentkey,
                wrapperScrollTop = v[k][w].scrollTop,
                ePageY = e.pageY || event.clientY,
                top = v[k].reposition + ePageY - v[k].firstY;

            top = (top/v[k].wH * 100);
            if(v[k].rP1 < top){
                top = v[k].rP1;
            }
            if(!v[k].previousTop){
                v[k].previousTop = top + 1;
            }
            var blnThreshold = top >= 0 && v[k].firstY > v[k].offsetTop;
            if((v[k].previousTop > top && blnThreshold) || (blnThreshold && (wrapperScrollTop + v[k].wH !== v[k].sH))){
                v[k].scrollBar.style.top = top + U;
                v[k].previousTop = top;                
                var scrollTop = top * v[k].sH1;
                v[k][w].scrollTop = scrollTop;
            }

            v[k].sbc[cN] = S;
        },
        endScroll = function(e){
            var e = e || event,
                k = currentkey; 

            removeEvent('mousemove', document);
            removeEvent('mouseup', document);

            v[k].reposition = 0;

            // Enable scroll event
            addEvent('scroll', v[k][w], doScroll);
            v[k].sbc[cN] = S + a;
        },
        doScroll = function(e){
            var e = e || event,
                wrapper = e[cT],
                k = getAttr(wrapper, sK);

            v[k].sbc[cN] = S;
            var scrollTop = v[k][w].scrollTop;
            var top = scrollTop/v[k].sH * 100;
            v[k].scrollBar.style.top = scrollTop/v[k].sH1 + U;
            v[k].sbc[cN] = S + a;
        },
        addEvent = function(e, el, func){
            el['on' + e] = func;
            // el.addEventListener(e, func, false);
        },
        removeEvent = function(e, el){
            el['on' + e] = null;
            // el.removeEventListener(e, func, false);
        };
    return {
        useSlimScroll : useSlimScroll
    }
})();
