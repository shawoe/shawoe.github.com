addLoadEvent(marquee());

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}

function getClassElems(clazz, node) {
    if (!node) {
        node = document;
    }        
    if (node.getElementsByClassName) {
        return node.getElementsByClassName(clazz);
    } else {
        var results = new Array();
        var elems = node.getElementsByTagName('*');
        for (var i = 0; i < elems.length; i++) {
            if (elems[i].className.indexOf(clazz) != -1) {
                results[results.length] = elems[i];
            }
        }
        return results;
    }
}

function marquee() {
    var figure = getClassElems('marquee');
    var img = figure[0].getElementsByTagName('IMG'); 
    var numDiv = getClassElems('num'); 
    var num = numDiv[0].getElementsByTagName('SPAN'); 
    var arrLeft = getClassElems('arr-left');
    var arrRight = getClassElems('arr-right');
    var index = visited = 0;
    var autoShow = null;
    
    initEvent();
    autoShowStart();
    
    function initEvent() {
        figure[0].style.height = img[0].offsetHeight + "px";
        figure[0].style.overflow = "hidden";
        figure[0].style.position = "relative";
        numDiv[0].style.display = "block";
        num[0].style.background = "rgba(256,20,20,0.5)";
        for (var i = 0; i<img.length; i++) {
            img[i].style.position = "absolute";
            if (i===0) {
                img[0].style.left = "0%";
            } else {
                img[i].style.left = "100%";
            }            
        }
        figure[0].onmouseover = function() {
            autoShowStop();
            arrLeft[0].style.display = "block";
            arrRight[0].style.display = "block";
        }
        figure[0].onmouseout = function() {
            autoShowStart();
            arrLeft[0].style.display = "none";
            arrRight[0].style.display = "none";
        }
        for (var j = 0; j < figure.length; j++) {
            arrLeft[j].onclick = movePicLast;
            arrRight[j].onclick = movePicNext;
        }
        for (var k = 0; k < num.length; k++) {
            num[k].onclick = selectPic;
        }
    }
    
    function selectPic() {
        var selected = parseInt(this.innerText) - 1;
        while (selected > index) {
            movePicNext();
        }
        while (selected < index) {
            movePicLast();
        }
    }
    
    function movePicNext() {
        var next = index + 1;
        if (next === img.length) {
            next = 0;
        }
        moveLeftOut(img[index],1000);
        moveRightIn(img[next],1000);
        num[index].style.background = "rgba(100,100,100,0.3)";
        num[next].style.background = "rgba(256,20,20,0.5)";
        index = next;
    }
    
    function movePicLast() {
        var last = index - 1;
        if (last < 0) {
            last = img.length - 1;
        }
        img[last].style.left = "-100%";
        moveLeftIn(img[last],1000);
        moveRightOut(img[index],1000);
        num[index].style.background = "rgba(100,100,100,0.3)";
        num[last].style.background = "rgba(256,20,20,0.5)";
        index = last;
    }
    
    function autoShowStart() {
        autoShow = setInterval(function(){
            movePicNext();
        },3000);
    }

    function autoShowStop() {
        clearInterval(autoShow);
    }
    
    function moveLeftIn(elem,speed) {
        move(elem,speed,"right",0,0);
    }
    
    function moveRightOut(elem,speed) {
        move(elem,speed,"right",100,100);
    }
    
    function moveLeftOut(elem,speed) {
        move(elem,speed,"left",-100,100);
    }
    
    function moveRightIn(elem,speed) {
        move(elem,speed,"left",0,0);
    }
    
    function move(elem,speed,direction,baundary,end) {
        var elem_x = parseInt(elem.style.left);
        if (elem.move) {
            clearInterval(elem.move);
        }
        elem.move = setInterval(function(){
            if (direction === "right") {
                elem_x += speed/200;
                elem.style.left = elem_x + "%";
                if (elem_x > baundary) {
                    elem_x = end;
                    elem.style.left = elem_x + "%";
                    clearInterval(elem.move);
                }
            } else {
                elem_x -= speed/200;
                elem.style.left = elem_x + "%";
                if (elem_x < baundary) {
                    elem_x = end;
                    elem.style.left = elem_x + "%";
                    clearInterval(elem.move);
                }
            }
        },1);
    }    
    
}

