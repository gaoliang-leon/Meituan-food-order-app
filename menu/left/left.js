(function(){
    var itemTmpl='<div class="left-item">'+
                    '<div class="item-content">$getItemContent</div>'+
                 '</div>';
    /*
    *request data
    *param
    */
    function getList(){
        $.get("../../json/food.json",function(data){
            console.log(data);
            // var list=data.data.food_spu_tags||[];
            // initItemContent(list);
            //把数据暴露到全局，这样shopBar里也可以取到。
            window.food_spu_tags=data.data.food_spu_tags||[];
            initItemContent(window.food_spu_tags);

            window.ShopBar.changeShipping(data.data.poi_info.shipping_fee);
        })
    };

    /*
    *render item content
    *param obj
    */
    function getItemContent(data){
        if(data.icon){
            return '<img class="item-icon" src='+data.icon+'>'+data.name;
        }else{
            return data.name;
        }
    };
    /*
    *init item content
    *param array
    */
    function initItemContent(list){
        list.forEach(function(item,index){
            var str=itemTmpl.replace('$getItemContent',getItemContent(item));

            //数据挂载带left-item .data('keyname',data)
            var $target=$(str);
            $target.data('itemData',item);

            $('.left-bar').append($target);
        })

        //触发一下第一个条目的点击，默认显示第一个
        $('.left-item').first().click();
    }

    /*
    *add event click
    *param 
    */
    function addClick(){
        $(".menu-inner").on('click','.left-item',function(e){
            //添加active class
            $(e.currentTarget).addClass('active');
            $(e.currentTarget).siblings().removeClass('active');

            //获取left-item上的数据
            var data=$(e.currentTarget).data('itemData');
            //将数据传给右侧列表
            window.Right.refresh(data);
        })
    }

    function init(){
        getList();
        addClick();
    };
    init();
})();