//获取元素
var getElem=function(selector){
    return document.querySelector(selector);
}

var getAllElem=function(selector){
    return document.querySelectorAll(selector);
}

//获取元素样式
var getCls=function(element){
    return element.getAttribute("class");
}

//设置元素样式
var setCls=function(element,cls){
    return element.setAttribute("class",cls);
}

//伪元素添加样式
var addCls=function(element,cls){
    var baseCls=getCls(element);
    if(baseCls.indexOf(cls)===-1){
        setCls(element,baseCls+" "+cls);
    }
    return;
}

//删除元素样式
var delCls=function(element,cls){
    var baseCls=getCls(element);
    if(baseCls.indexOf(cls)>-1){
        setCls(element,baseCls.split(cls).join(" ").replace(/\s+/g," "));
    }
    return;
}

//定义需要设置动画的元素
var screenAnimateElements={
    ".screen-header":[
        ".screen-header",
    ],
    ".screen-1":[
        ".screen-1__heading",
        ".screen-1__subheading",
    ],
    ".screen-2":[
        ".screen-2__heading",
        ".screen-2__heading-tip",
        ".screen-2__subheading",
        ".screen-2__bg_i_2",
    ],
    ".screen-3":[
        ".screen-3__bg",
        ".screen-3__heading",
        ".screen-3__heading-tip",
        ".screen-3__subheading",
        ".screen-3__content",
    ],
    ".screen-4":[
        ".screen-4__heading",
        ".screen-4__heading-tip",
        ".screen-4__subheading",
        ".screen-4__content-item_i_1",
        ".screen-4__content-item_i_2",
        ".screen-4__content-item_i_3",
        ".screen-4__content-item_i_4",
    ],
    ".screen-5":[
        ".screen-5__bg",
        ".screen-5__heading",
        ".screen-5__heading-tip",
        ".screen-5__subheading",
    ]
};

//设置屏幕动画初始化
function setScreenAnimateInit(screenCls){
    var screen=document.querySelector(screenCls);               //获取当前屏的元素
    var animateElements=screenAnimateElements[screenCls];       //设置动画的元素
    for(var i=0;i<animateElements.length;i++){                  //遍历设置动画的元素
        var element=document.querySelector(animateElements[i]); //获取每一个设置动画的元素
        var baseCls=element.getAttribute("class");              //获取每一个元素已有的样式
        element.setAttribute("class",baseCls+" "+animateElements[i].substr(1)+"_animate_init");
        //为每一个元素的class属性添加初始化样式
    }
}

//当页面加载完毕执行初始化
window.onload=function(){
    for(k in screenAnimateElements){        //遍历当前屏元素
        if(k==".screen-header"){            //跳过页面头部
            continue;
        }
        if(k==".screen-1"){                 //跳过第一屏
            continue;
        }
        setScreenAnimateInit(k);            //执行初始化
    }
}

//设置动画播放
function playScreenAnimateDone(screenCls){
    var screen=document.querySelector(screenCls);
    var animateElements=screenAnimateElements[screenCls];
    for(var i=0;i<animateElements.length;i++){
        var element=document.querySelector(animateElements[i]);
        var baseCls=element.getAttribute("class");
        element.setAttribute("class",baseCls.replace("_animate_init","_animate_done"));
        //使每一个元素由初始化变为完成
    }
}

//页面头部和第一屏默认播放
setTimeout(function(){playScreenAnimateDone(".screen-header");},100);
setTimeout(function(){playScreenAnimateDone(".screen-1");},100);

var navItems=getAllElem(".header__nav-item");           //获取导航栏每一个元素
var outLineItems=getAllElem(".outline__item");          //获取侧边导航每一个元素
var navTip = getElem('.header__nav-tip');               //获取导航项下划线

//双向绑定
var switchNavItemsActive=function(idx){
    for(var i=0;i<navItems.length;i++){                         //遍历导航项
        delCls(navItems[i],"header__nav-item_status_active");   //清除所有导航项激活样式
        navTip.style.left = 0 +'px';                            //设置下划线不变
    }
    addCls(navItems[idx],"header__nav-item_status_active");     //为当前（idx）导航项添加激活样式
    navTip.style.left = (idx * 105)+'px';                       //设置下划线移动到当前导航项

    for(var i=0;i<outLineItems.length;i++){                     //遍历侧边导航项
        delCls(outLineItems[i],"outline__item_status_active");  //清除所有侧边导航项激活样式
    }
    addCls(outLineItems[idx],"outline__item_status_active");    //为当前（idx）侧边导航项添加激活样式
      
}

//默认使第一个导航项激活
switchNavItemsActive(0);

//设置滚动条样式
window.onscroll=function(){
    var top=document.documentElement.scrollTop||document.body.scrollTop;        //获取当前滚动条高度
    // console.log(top)
    if(top>60){
        addCls(getElem(".screen-header"),"screen-header_status_white");         //超出页头部分范围为添加样式
        addCls(getElem(".outline"),"outline_status_in");                        //同时侧边导航出现
    }
    else {
        delCls(getElem(".screen-header"),"screen-header_status_white");         //否则删除样式
        delCls(getElem(".outline"),"outline_status_in");                        //侧边导航隐藏
        switchNavItemsActive(0);                                                //第一个导航项激活
    }

    if(top>(640*1-100)){
        playScreenAnimateDone(".screen-2");                 //播放第二屏动画
        switchNavItemsActive(1);                            //第二个导航项激活
    }
    if(top>(640*2-100)){
        playScreenAnimateDone(".screen-3");                 //播放第三屏动画
        switchNavItemsActive(2);                            //第三个导航项激活
    }
    if(top>(640*3-100)){
        playScreenAnimateDone(".screen-4");                 //播放第四屏动画
        switchNavItemsActive(3);                            //第四个导航项激活
    }
    if(top>(640*4-100)){
        playScreenAnimateDone(".screen-5");                 //播放第五屏动画
        switchNavItemsActive(4);                            //第五个导航项激活
    }
    
}

//点击导航项进行页面跳转
var setNavJump=function(i,lib){
    var item=lib[i];                                        //获取每一个元素
    item.onclick=function(){
        if(document.documentElement.scrollTop){             
            document.documentElement.scrollTop=i*640+1;     //点击时滚动条位置改变
        }
        else{
            document.body.scrollTop=i*640+1;
        }
    }
}

//遍历导航项，点击跳转
for(var i=0;i<navItems.length;i++){
    setNavJump(i,navItems);
}

//遍历侧边导航项，点击跳转
for(var i=0;i<outLineItems.length;i++){
    setNavJump(i,outLineItems);
}

//滑动门
var setTip = function(idx,lib){
    lib[idx].onmouseover=function(){
        navTip.style.left = ( idx * 105 )+'px';     //鼠标经过下划线位置改变
    }
    var currentIdx=0;
    lib[idx].onmouseout=function(){                 //鼠标离开时回到当前位置
        for(var i=0;i<lib.length;i++){              //遍历元素
            if(getCls(lib[i]).indexOf("header__nav-item_status_active")>-1){
                currentIdx=i;                       //当当前元素为激活状态时，获取当前索引
                break;
            }
        }
        navTip.style.left = ( currentIdx * 105 )+'px';  //下划线移动到当前位置
    }

}

//遍历导航项，滑动
for(var i=0;i<navItems.length;i++){
    setTip(i,navItems);
}

//获取页面底部按钮，点击则回到页面上方
var learnBtn=getElem(".screen-learn__button");
learnBtn.onclick=function(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}