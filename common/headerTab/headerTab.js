(function(){
    var itemTmpl='<a class="$key headerTab-item" href="../$key/$key.html">$text</a>';

    function init(){
        var items=[{
            key:'menu',
            text:'点菜'   
        },{
            key:'comment',
            text:'评价' 
        },{
            key:'restaurant',
            text:'商家' 
        }];

        var str='';

        items.forEach(function(item){
            str+=itemTmpl.replace('$text',item.text)
                         .replace(/\$key/g,item.key);
        });

        $(".tab-bar").append(str);
    };
    init();
})()