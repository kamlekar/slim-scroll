var scroll = (function(){
    var v = [],E = 'e',
        w = "wrapper",s = "scrollBar",S = "scrollBarContainer",a = "",m = "",
        // properties
        cN = "className",oT = "offsetTop",pE = "parentElement", pN = "parentNode",
        pS = "previousSibling", sE = "srcElement",iH = "innerHTML",
        cT = "currentTarget",sK = "scroll-k",U = "%",d = ".",

        useSlimScroll = function(C, p){
            if(C.offsetHeight < C.scrollHeight){
                var h = C[iH],k = v.length, z = v[k] = {}, q = z[E] = {};
                // setting user defined classes
                q.w = p && p.wrapperClass ? p.wrapperClass : w;
                q.s = p && p.scrollBarClass ? p.scrollBarClass : s;
                q.S = p && p.scrollBarContainerClass ? p.scrollBarContainerClass : S;
                q.a = p && p.scrollBarContainerSpecialClass ? " " + p.scrollBarContainerSpecialClass : " " + a;

                C[iH] = "";
                z[w] = cE(q.w, h, C);
                z[S] = cE(q.S + q.a, "", C);
                z[s] = cE(q.s, "", z[S]);
                z.wH = z[w].offsetHeight;
                z.sH = z[w].scrollHeight;
                z.sP = (z.wH/z.sH) * 100;
                // Manually set the height of the scrollbar (in percentage)
                z.sP1 = z.sP;
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
                k = getAttr(el[pS], sK),i = v[k];

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
            i[S][cN] = i[E].S + i[E].a;
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

            i[S][cN] = i[E].S;
        },
        endScroll = function(e){
            var e = e || event,k = currentkey,i = v[k]; 

            removeEvent('mousemove', document);
            removeEvent('mouseup', document);

            i.reposition = 0;
            i[S][cN] = i[E].S + i[E].a;
        },
        doScroll = function(e){
            var e = e || event,
                k = getAttr((e[cT] || e[sE]), sK),i = v[k];
            if(!i){return;}
            i[S][cN] = i[E].S;
            var scrollTop = i[w].scrollTop;
            var top = scrollTop/i.sH * 100;
            i[s].style.top = scrollTop/i.sH1 + U;
            i[S][cN] = i[E].S + i[E].a;
        },
        addEvent = function(e, el, func){
            el['on' + e] = func;
            // el.addEventListener(e, func, false);
        },
        removeEvent = function(e, el){
            el['on' + e] = null;
            // el.removeEventListener(e, func, false);
        },
        addCSSRule = function(sheet, selector, rules, index) {
            if(sheet.insertRule) {
                sheet.insertRule(selector + "{" + rules + "}", index);
            }
            else if(sheet.addRule) {
                sheet.addRule(selector, rules, index);
            }
        },
        insertCss = function(){
            // Inserting css rules
            // Link: http://davidwalsh.name/add-rules-stylesheets
            var imp = " !important",
                pAbsolute = "position:absolute"+imp,
                // classes
                wrapper = pAbsolute+";overflow:auto"+imp+";left:0px"+imp+";top:0px"+imp+";right:-18px"+imp+";bottom:0px"+imp+";padding-right:8px"+imp+";",
                scrollBarContainer = pAbsolute+";top:0px"+imp+";bottom:0px"+imp+";right:0px"+imp+";left:auto"+imp+";width:5px"+imp+";cursor:pointer"+imp+";padding-right:0px"+imp+";",
                scrollBar = pAbsolute+";top:0px;left:0px;right:0px"+imp+";",
                //creating a sheet
                style = document.createElement('style');
            try{
                // WebKit hack :(
                style.appendChild(document.createTextNode(""));
                var head = document.head || document.getElementsByTagName('head')[0];
                head.appendChild(style);
                // adding above css to the sheet
                addCSSRule(style.sheet, ".slimScroll > div", wrapper, 0);
                addCSSRule(style.sheet, ".slimScroll > div + div", scrollBarContainer, 0);
                addCSSRule(style.sheet, ".slimScroll > div + div > div", scrollBar, 0);
            }
            catch(ex){
                console.log('Slimscroll fallback classes needed: Add Important css styles as mentioned in the read me file. (Read the "note" in "How to use" section');
            }
        };
        insertCss();
    return {
        useSlimScroll : useSlimScroll
    }
})();
