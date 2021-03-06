/*首页轮播图*/
var chefElement = {
    bgColor1:'#cccccc',
    bgColor2:'#4d3e90',
    animationSpeed:1,
    minSpeed:5,
    stopTime:5000,

    //获取页面元素
    prev:document.getElementById('prev'),
    next:document.getElementById('next'),
    parent:document.getElementById('parent'),
    ul:document.getElementById('img_list'),
    li:document.getElementById('img_list').getElementsByTagName('li'),
    arc:document.getElementById('m_arcbox'),
    liWidth:document.getElementById('img_list').getElementsByTagName('li')[0].offsetWidth,
    type:true,
    nextTimer:null,
    prevTimer:null,
    parent_n:null
};
//初始化小圆点/指定放图片的盒子 ul 的宽度
var elemSpan = (function(){
    chefElement.ul.style.width = chefElement.liWidth*chefElement.li.length+'px';
    for(var i = 0;i<chefElement.li.length;i++){
        chefElement.li[i].index = i;
        var span = document.createElement('span');
        span.className = 'span';
        span.index = i;
        span.style.background = chefElement.bgColor1;
        // span.innerHTML = i+1;
        chefElement.arc.appendChild(span);
    }
    var objSpan = chefElement.arc.getElementsByTagName('span');

    //创建完以后第一个小圆点显示指定的颜色
    objSpan[0].style.background = chefElement.bgColor2;
    return objSpan;
})();

//给每个小圆点添加事件
chefElement.arc.onmouseover = function(ev){
    var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    if(target.nodeName.toLowerCase() == "span"){
        if(chefElement.type){
            showImg(target.index);
            changeBackgroundColor(target)
            chefElement.type = true;
        }
    }
}

//改变小圆点的背景颜色
function changeBackgroundColor(obj){
    for(var i = 0;i<elemSpan.length;i++){
        elemSpan[i].style.background = chefElement.bgColor1;
    }
    elemSpan[obj.index].style.background = chefElement.bgColor2;
}

//根据参数显示对应的图片。
function showImg(inde){
    var this_li = chefElement.li[0].index;

    //把第一个元素放到最后面。
    if(inde>this_li){
        var x = inde-this_li;
        for(var y = 0;y<x;y++){
            chefElement.ul.appendChild(chefElement.li[0]);
        }
    }

    //把最后一个元素放到第一的位置
    if(inde<this_li){
        var x_x = this_li-inde;
        for(var g = 0;g<x_x;g++){
            chefElement.ul.insertBefore(chefElement.li[chefElement.li.length-1],chefElement.li[0]);
        }
    }
}

chefElement.prev.onclick = function(){
    if(chefElement.type){
        clearInterval(chefElement.prevTimer);
        chefElement.ul.insertBefore(chefElement.li[chefElement.li.length-1],chefElement.li[0]);
        chefElement.liWidth = chefElement.li[0].offsetWidth;
        chefElement.ul.style.left = '-'+chefElement.liWidth+'px';
        chefElement.prevTimer = setInterval(pre,chefElement.animationSpeed);
        chefElement.type = false;
        changeBackgroundColor(chefElement.li[0]);
    }
};
next.onclick = function(){
    if(chefElement.type){
        chefElement.liWidth = 0;
        clearInterval(chefElement.nextTimer);
        chefElement.nextTimer = setInterval(nex,chefElement.animationSpeed);
        chefElement.type = false;
        changeBackgroundColor(chefElement.li[1]);
    }
};

//next动画函数
function nex(){
    chefElement.ul.style.left = '-'+chefElement.liWidth+ 'px';
    chefElement.liWidth += chefElement.minSpeed ;
    if(chefElement.liWidth >= chefElement.li[0].offsetWidth){
        clearInterval(chefElement.nextTimer);
        chefElement.ul.appendChild(chefElement.li[0]);
        chefElement.ul.style.left = 0;
        chefElement.type = true;
    }
}

//prev动画函数
function pre(){
    chefElement.ul.style.left = '-'+chefElement.liWidth+'px';
    chefElement.liWidth -= chefElement.minSpeed ;
    if(chefElement.liWidth <= -1){
        chefElement.ul.style.left = 0;
        clearInterval(chefElement.prevTimer);
        chefElement.type = true;
    }
}

chefElement.parent.onmouseover = function(){
    clearInterval(chefElement.parent_n);
};
chefElement.parent.onmouseout = function(){
    chefElement.parent_n = setInterval(next.onclick,chefElement.stopTime);
};

//动画播放
chefElement.parent_n = setInterval(next.onclick,chefElement.stopTime);




















