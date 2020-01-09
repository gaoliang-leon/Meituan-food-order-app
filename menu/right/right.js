(function(){
    var itemTmpl='<div class="right-item">'+
                    '<img class="item-img" src=$picture>'+
                    '<div class="item-content">'+
                        '<p class="item-title">$name</p>'+
                        '<p class="item-desc">$description</p>'+
                        '<p class="item-like">$praise_content</p>'+
                        '<p class="item-price">￥$min_price<span class="unit">/$unit</sapn></p>'+
                    '</div>'+
                    '<div class="select-content">'+
                        '<div class="minus"></div>'+
                        '<div class="count">$chooseCount</div>'+
                        '<div class="plus"></div>'+
                    '</div>'+
                 '</div>';
    // 不用getList，因为数据已经挂载在左侧item上了

    
    /*
    *init item content
    *param array
    */
    function initRightList(list){
        $('.right-list').html('');
        list.forEach(function(item,index){
            //因为json中没有chooseCount的值，先添加
            if(!item.chooseCount){
                item.chooseCount=0;
            }

            var str=itemTmpl.replace('$picture',item.picture)
                            .replace("$name",item.name)
                            .replace("$description",item.description)
                            .replace("$praise_content",item.praise_content)
                            .replace("$min_price",item.min_price)
                            .replace("$unit",item.unit)
                            .replace("$chooseCount",item.chooseCount);

            //数据挂载 .data('keyname',data)
            var $target=$(str);
            $target.data('itemData',item);

            $('.right-list').append($target);
        });
    }

    /*
    *render right title
    *param 
    */
    function initRightTitle(str){
        $(".right-title").text(str);
    }

    //select-content 添加增加减少数量功能
    function addClick(){
        $('.right-item').on('click','.plus',function(e){
            var $count=$(e.currentTarget).parent().find('.count');
            //屏幕显示的数量文本加1
            $count.text(parseInt($count.text()||'0')+1);
            //后台数据加1以保持同步(会直接修改获得的json数据)
            var $item=$(e.currentTarget).parents('.right-item')
            $item.data('itemData').chooseCount+=1;

            //与购物车联动
            window.ShopBar.renderItems();
        });
        $('.right-item').on('click','.minus',function(e){
            var $count=$(e.currentTarget).parent().find('.count');
            //如果已经是0.不进行操作
            if($count.text()==0){return};
            //屏幕显示的数量文本-1
            $count.text(parseInt($count.text()||'0')-1);
            //后台数据-1以保持同步
            var $item=$(e.currentTarget).parents('.right-item')
            $item.data('itemData').chooseCount-=1;

            window.ShopBar.renderItems();
        })
    }

    function init(data){
        initRightTitle(data.name);
        initRightList(data.spus||[]);
        addClick();
    };

    window.Right={
        refresh:init
    }

})();