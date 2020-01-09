(function(){
    // 顶部模版字符串
    var itemTopTmpl = '<div class="choose-content hide">'+
                          '<div class="content-top">'+
                            '<div class="clear-car">清空购物车</div>'+
                          '</div>'+
                      '</div>';

    // 底部模版字符串
    var itemBottomTmpl = '<div class="bottom-content">'+
                            '<div class="shop-icon">'+
                              '<div class="dot-num hide"></div>'+
                            '</div>'+
                            '<div class="price-content">'+
                                '<p class="total-price">¥<span class="total-price-span">0</span></p>'+
                                '<p class="other-price">另需配送&nbsp;¥<span class="shipping-fee">0</span></p>'+
                            '</div>'+
                            '<div class="submit-btn">去结算</div>'+
                        '</div>';

    //transfer to jquery obj to use loaded data
    var $strBottom=$(itemBottomTmpl);
    var $strTop=$(itemTopTmpl);


    //向购物车渲染条目
    function renderItems(){
        //每次点击清除掉原有的
        $strTop.find('.choose-item').remove();

        var list=window.food_spu_tags||[];
        var tmpl='<div class="choose-item">'+
                    '<div class="item-name">$name</div>'+
                    '<div class="price">￥<span class="total">$price</span></div>'+
                    '<div class="select-content">'+
                        '<div class="minus"></div>'+
                        '<div class="count">$chooseCount</div>'+
                        '<div class="plus"></div>'+
                    '</div>'+
                '</div>';

        var totalPrice=0;

        list.forEach(function(item){
            item.spus.forEach(function(_item){
                //如果有菜品数量大于0，就渲染这条数据
                if(_item.chooseCount>0){
                    //每个菜品的总价
                    var price=_item.min_price*_item.chooseCount;
                    var row=tmpl.replace('$name',_item.name)
                                .replace('$price',price)
                                .replace('$chooseCount',_item.chooseCount);
                    //所有菜品的总价
                    totalPrice+=price;
                    //将数据挂载到choose-item上,为了修改购物车中加减时的数据
                    var $row=$(row);
                    $row.data('itemData',_item);    

                    $strTop.append($row);
                }
            })
            //改变总价
            changeTotalPrice(totalPrice);

            //改变红点个数
            changeDot();

        })
    }
    //change shipping fee
    function changeShipping(str){
        $strBottom.find('.shipping-fee').text(str);
    }
    //change total fee
    function changeTotalPrice(str){
        $strBottom.find('.total-price-span').text(str);
    }

    //更改红点
    function changeDot(){
        $count=$strTop.find('.count');
        var total=0;
        for(var i=0;i<$count.length;i++){
            total+=parseInt($($count[i]).text());
        }
        if(total>0){
            $('.dot-num').show().text(total);
        }else{
            $('.dot-num').hide();
        }
    }

    //购物车点击事件
    function addClick(){
        //点击购物车显示购物车详情
        $('.shop-bar').on('click','.shop-icon',function(){
            $('.mask').toggle();
            $strTop.toggle();

        })
        //点击增加菜品数量
        $strTop.on('click','.plus',function(e){
             var $count=$(e.currentTarget).parent().find('.count');
            //屏幕显示的数量文本加1
            $count.text(parseInt($count.text()||'0')+1);
            //后台数据加1以保持同步(会直接修改获得的json数据)
            var $item=$(e.currentTarget).parents('.choose-item');
            $item.data('itemData').chooseCount+=1;
            //数据改动后重新渲染
            renderItems();

            //找到当前右侧详情的数据，进行联动（之所以是left-item是因为这个元素的click事件是刷新右边数据）
            $('.left-item.active').click();
        });
        //点击减少菜品数量
        $strTop.on('click','.minus',function(e){
             var $count=$(e.currentTarget).parent().find('.count');
             if($count.text()==0){return};
            //屏幕显示的数量文本-1
            $count.text(parseInt($count.text()||'0')-1);
            //后台数据-1以保持同步(会直接修改获得的json数据)
            var $item=$(e.currentTarget).parents('.choose-item');
            $item.data('itemData').chooseCount-=1;
            //数据改动后重新渲染
            renderItems();

            //找到当前右侧详情的数据，进行联动
            $('.left-item.active').click();
        })

         //清空购物车
   
        $('.clear-car').on('click',function(){
            var $items=$strTop.find('.choose-item');
            for(var i=0;i<$items.length;i++){
                //先转化为jquery对象
               $($items[i]).data('itemData').chooseCount=0;
            }
            renderItems();
            $('.left-item.active').click();
        })
    }

       
        
    

    //初始化购物车
    function init(){
        $(".shop-bar").append($strTop);
        $(".shop-bar").append($strBottom);
        addClick();
    }
    init();

    //暴露部分接口，方便right.js中点击加减按钮时将商品同步渲染到购物车
    window.ShopBar={
        renderItems:renderItems,
        changeShipping:changeShipping
    }
})();