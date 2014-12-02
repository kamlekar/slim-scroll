var scroll = (function(){
    var v = [],
        w = "wrapper",s = "scrollBar",S = "scrollBarContainer",a = "",m = "",
        // properties
        cN = "className",oT = "offsetTop",pE = "parentElement",pes= "previousElementSibling", 
        iH = "innerHTML",cT = "currentTarget",sK = "scroll-k",U = "%",d = ".",
        // IE8 properties 
        // (Dev note: remove these variables from all over the code to exclude IE8 compatibility)
        pN = "parentNode",pS = "previousSibling",sE = "srcElement",
        // Initial function
        useSlimScroll = function(C, p){
            if(C.offsetHeight < C.scrollHeight){
                var h = C[iH],k = v.length, z = v[k] = {}, q = z.E = {};
                // setting user defined classes
                p = p || {};
                q.w = p.wrapperClass || w;
                q.s = p.scrollBarClass || s;
                q.S = p.scrollBarContainerClass || S;
                q.a = " " + (p.scrollBarContainerSpecialClass || a);
                q.mH = p.scrollBarMinHeight || 25;
                q.sH = p.scrollBarFixedHeight;  // could be undefined

                C[iH] = "";
                z[w] = cE(q.w, h, C);
                z[S] = cE(q.S + q.a, "", C);
                z[s] = cE(q.s, "", z[S]);
                z.wH = z[w].offsetHeight;
                z.sH = z[w].scrollHeight;
                z.sP = (z.wH/z.sH) * 100;
                // z.sbh is scroll bar height in pixels without pixel unit.
                z.sbh = z.sP * z.wH/100;
                // Manually set the height of the scrollbar (in percentage)
                // if user hasn't provided the fixed scroll height value
                if(!q.sH){
                    z.sP1 = z.sbh < q.mH? (q.mH/z.wH * 100): z.sP;
                }
                else{
                    z.sP1 = q.sH/z.wH * 100;
                }
                z.rP1 = 100 - z.sP1;
                z.x = (z.sH - z.wH) * ((z.sP1 - z.sP)/(100 - z.sP));
                z.sH1 = Math.abs((z.x / (z.rP1)) + (z.sH/100));
                z[s].style.height = z.sP1 + U;
                //store the key 'k' in the container
                z[w].setAttribute(sK, k);

                // Attaching mouse events
                addEvent('mousedown', z[s], beginScroll);
                addEvent('click', z[S], setScroll);

                // For scroll
                addEvent('scroll', z[w], doScroll);
            }
        },
        // Start of private functions
        getAttr = function(e, p){
            if(!e){return;}
            return e.getAttribute(p);            
        },
        cE = function(c, h, p){
            var d = document.createElement('div');
            d[cN] = c;
            d[iH] = h;
            p.appendChild(d);
            return d;
        },
        setScroll = function(e){
            var e = e || event,el = e.target || event[sE],
                p = el[pE] || el[pN],
                k = getAttr(el[pS] || el[pes], sK),i = v[k];

            if(!i || p === i[S]){return;}
            var eY = e.pageY || event.clientY,
                top = ((eY - (i[w][pE] || i[w][pN])[oT])/i.wH * 100) - i.sP1/2;
            if(top > i.rP1){
                top = i.rP1;
            }
            else if(top < 0){
                top = 0;
            }
            i[s].style.top = top + U;
            i[w].scrollTop = top * i.sH1;
            i[S][cN] = i.E.S + i.E.a;
        },
        beginScroll = function(e){
            // removing selected text
            // Link: http://stackoverflow.com/a/3171348
            var sel = window.getSelection ? window.getSelection() : document.selection;
            if (sel) {
                if (sel.removeAllRanges) {
                    sel.removeAllRanges();
                } else if (sel.empty) {
                    sel.empty();
                }
            }
            var e = e || event,
                el = e[cT] || e[sE],
                k = getAttr((el[pE] || el[pN])[pS], sK),i = v[k];

            addEvent('mousemove', document, moveScroll);
            addEvent('mouseup', document, endScroll);

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
                eY = e.pageY || event.clientY,
                top = (i.reposition + eY - i.firstY)/i.wH * 100;

            if(i.rP1 < top){
                top = i.rP1;
            }
            if(!i.previousTop){
                i.previousTop = top + 1;
            }
            var blnThreshold = top >= 0 && i.firstY > i.offsetTop;
            if((i.previousTop > top && blnThreshold) || (blnThreshold && (i[w].scrollTop + i.wH !== i.sH))){
                i[s].style.top = top + U;
                i.previousTop = top;   
                i[w].scrollTop = top * i.sH1;
            }
            i[S][cN] = i.E.S;
        },
        endScroll = function(e){
            var e = e || event,k = currentkey,i = v[k]; 

            removeEvent('mousemove', document);
            removeEvent('mouseup', document);

            i.reposition = 0;
            i[S][cN] = i.E.S + i.E.a;
        },
        doScroll = function(e){
            var e = e || event,
                k = getAttr((e[cT] || e[sE]), sK),i = v[k];
            if(!i){return;}
            i[S][cN] = i.E.S;
            var scrollTop = i[w].scrollTop;
            i[s].style.top = scrollTop/i.sH1 + U;
            i[S][cN] = i.E.S + i.E.a;
        },
        addEvent = function(e, el, func){
            el['on' + e] = func;
            // el.addEventListener(e, func, false);
        },
        removeEvent = function(e, el){
            el['on' + e] = null;
            // el.removeEventListener(e, func, false);
        },
        addCSSRule = function(S, s, r, i) {
            if(S.insertRule) {
                S.insertRule(s + "{" + r + "}", i);
            }
            else if(S.addRule) {
                S.addRule(s, r, i);
            }
        },
        insertCss = function(){
            // Inserting css rules
            // Link: http://davidwalsh.name/add-rules-stylesheets
            var slim = ".slimScroll",
                imp = " !important",
                pA = "position:absolute"+imp,
                // classes
                w = pA+";overflow:auto"+imp+";left:0px"+imp+";top:0px"+imp+";right:-18px"+imp+";bottom:0px"+imp+";padding-right:8px"+imp+";",
                S = pA+";top:0px"+imp+";bottom:0px"+imp+";right:0px"+imp+";left:auto"+imp+";width:5px"+imp+";cursor:pointer"+imp+";padding-right:0px"+imp+";",
                s = pA+";top:0px;left:0px;right:0px"+imp+";",
                //creating a sheet
                style = document.createElement('style');
            try{
                // WebKit hack :(
                style.appendChild(document.createTextNode(""));
                document.head.appendChild(style);
                var sheet = style.sheet;
                // adding above css to the sheet
                addCSSRule(sheet, slim + " > div", w, 0);
                addCSSRule(sheet, slim + " > div + div", S, 0);
                addCSSRule(sheet, slim + " > div + div > div", s, 0);
            }
            catch(ex){
                var head = document.getElementsByTagName('head')[0];
                head.appendChild(style);
                style.styleSheet.cssText = slim + " > div {" + w + "} " + slim + " > div + div {" + S + "} " + slim + " > div + div > div {" + s + "}";
            }
        }();
    return {
        useSlimScroll : useSlimScroll
    }
})();
