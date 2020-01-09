(function(){

    var itemTmpl='<a class="bottombar-item $key" href="../$key/$key.html">'+
                    '<div class="bottombar-item-icon"></div>'+
                    '<div class="bottombar-item-name">$text</div>'+
                 '</a>';

    function init(){
        var bottomItemArr=[
        {
            key:'index',
            text:'首页'
        },
        {
            key:'order',
            text:'订单'
        },
        {
            key:'my',
            text:'我的'
        }
        ];  

        var str='';
        bottomItemArr.forEach(function(item){
            str+=itemTmpl.replace('$text',item.text)
                         .replace(/\$key/g,item.key);
        });

        $('.bottombar').append(str);

        //判断当前页面的位置，设置激活图片
        var arr=window.location.pathname.split('/');
        var path=arr[arr.length-1].replace(".html","");
        
        if(path){
            $("a."+path).addClass("active")
        };
    }
               
    init();
})()