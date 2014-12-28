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

function marquee() {
    var figure = document.getElementsByClassName('marquee');
    var img = figure[0].getElementsByTagName('IMG'); 
    var arrLeft = document.getElementsByClassName('arr-left');
    var arrRight = document.getElementsByClassName('arr-right');
    var index = visited = 0;
    var autoShow = null;
    
    initEvent();
    autoShowStart();
    
    function initEvent() {
        figure[0].style.height = "700px";
        figure[0].style.overflow = "hidden";
        figure[0].style.position = "relative";
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
        for(var j = 0; j < arrLeft.length; j++) {
            arrLeft[j].onclick = movePicLast;
            arrRight[j].onclick = movePicNext;
        }
    }
    
    function movePicNext() {
        var next = index + 1;
        if (next === img.length) {
            next = 0;
        }
        moveLeftOut(img[index],1000);
        moveRightIn(img[next],1000);
        index = next;
    }
    
    function movePicLast() {
        var last = index - 1;
        if (last < 0) {
            last = img.length - 1;
        }
        img[last].style.left = "-100%";
        alert
        moveLeftIn(img[last],1000);
        moveRightOut(img[index],1000);
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
        var move = setInterval(function(){
            if (direction === "right") {
                elem_x += speed/200;
                elem.style.left = elem_x + "%";
                if (elem_x > baundary) {
                    elem_x = end;
                    elem.style.left = elem_x + "%";
                    clearInterval(move);
                }
            } else {
                elem_x -= speed/200;
                elem.style.left = elem_x + "%";
                if (elem_x < baundary) {
                    elem_x = end;
                    elem.style.left = elem_x + "%";
                    clearInterval(move);
                }
            }
        },1);
    }    
    
}

