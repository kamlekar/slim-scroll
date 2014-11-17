var scroll = (function(){
    var v = [],
        reposition = false,
        previousTop = false,
        w = "wrapper",c = "content",s = "scrollBar",
        S = "scrollBarContainer",u = " unselectable",
        // mac animation classes. pass empty string to make the scroll work normally.
        a = " animate",
        m = " mac",
        // properties
        cN = "className",oT = "offsetTop",pE = "parentNode",
        pS = "previousSibling", sE = "srcElement",
        cT = "currentTarget",sK = "scroll-k",U = "%",d = ".",

        useSlimScroll = function(C){
            if(C.offsetHeight < C.scrollHeight){
                var h = C.innerHTML,k = v.length;
                C.innerHTML = "";
                v[k] = {};
                v[k][w] = cE(w + u + m, h, C); //cE(w + u + m, "", C);
                // v[k][w].sA("unselectable","on"); /* IE8 unselectable fix */
                v[k][S] = cE(S + a, "", C);
                v[k][s] = cE(s, "", v[k][S]);


                v[k].wH = v[k][w].offsetHeight;
                v[k].sH = v[k][w].scrollHeight;
                v[k].sP = (v[k].wH/v[k].sH) * 100;
                // Manually set the height of the scrollbar (in percentage)
                v[k].sP1 = v[k].sP;

                v[k].rP1 = 100 - v[k].sP1;
                v[k].x = (v[k].sH - v[k].wH) * ((v[k].sP1 - v[k].sP)/(100 - v[k].sP));
                v[k].sH1 = Math.abs((v[k].x / (v[k].rP1)) + (v[k].sH/100));

                v[k][s].style.height = v[k].sP1 + U;

                //store the key 'k' in the container
                setAttr(sK, k);

                // Attaching mouse events
                addEvent('mousedown', v[k][s], beginScroll);
                addEvent('click', v[k][S], setScroll);

                // For scroll
                addEvent('scroll', v[k][w], doScroll);
                // content.onselectstart = function() { return false; }
            }
        },
        setAttr = function(p, k){
            v[k][w].setAttribute(p, k);
        },
        getAttr = function(e, p){
            if(!e){return false;}
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
            var e = e || event,el = e.target || event[sE],
                parentElement = el[pE],
                k = getAttr(el[pS], sK),i = v[k];

            if(!i || parentElement === i[S]){
                return false;
            }
            i[s][cN] = s;
            var ePageY = e.pageY || event.clientY,
                top = ((ePageY - i[w][pE][oT])/i.wH * 100) - i.sP1/2;
            if(top > i.rP1){
                top = i.rP1;
            }
            else if(top < 0){
                top = 0;
            }
            i[s].style.top = top + U;
            i[w].scrollTop = top * i.sH1;
            i[S][cN] = S + a;
        },
        beginScroll = function(e){
            var e = e || event,
                el = e[cT] || e[sE],
                k = getAttr(el[pE][pS], sK),i = v[k];

            addEvent('mousemove', document, moveScroll);
            addEvent('mouseup', document, endScroll);

            // disable scroll event
            removeEvent('scroll', i[w]);

            i[oT] = i[w][oT];
            i.firstY = e.pageY || event.clientY;

            if(!i.reposition){
                i.reposition = i[s][oT];
            }

            currentkey = k;
        },
        moveScroll = function(e){
            var e = e || event,
                k = currentkey,i = v[k],
                wrapperScrollTop = i[w].scrollTop,
                ePageY = e.pageY || event.clientY,
                top = i.reposition + ePageY - i.firstY;

            top = (top/i.wH * 100);
            if(i.rP1 < top){
                top = i.rP1;
            }
            if(!i.previousTop){
                i.previousTop = top + 1;
            }
            var blnThreshold = top >= 0 && i.firstY > i.offsetTop;
            if((i.previousTop > top && blnThreshold) || (blnThreshold && (wrapperScrollTop + i.wH !== i.sH))){
                i[s].style.top = top + U;
                i.previousTop = top;                
                var scrollTop = top * i.sH1;
                i[w].scrollTop = scrollTop;
            }

            v[k][S][cN] = S;
        },
        endScroll = function(e){
            var e = e || event,k = currentkey,i = v[k]; 

            removeEvent('mousemove', document);
            removeEvent('mouseup', document);

            i.reposition = 0;
            // Enable scroll event
            addEvent('scroll', i[w], doScroll);
            i[S][cN] = S + a;
        },
        doScroll = function(e){
            var e = e || event,wrapper = e[cT] || e[sE],
                k = getAttr(wrapper, sK),i = v[k];
            if(!i){return;}
            i[S][cN] = S;
            var scrollTop = i[w].scrollTop;
            var top = scrollTop/i.sH * 100;
            i[s].style.top = scrollTop/i.sH1 + U;
            i[S][cN] = S + a;
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
