(function(){

    var itemTmpl = '<div class="content-item">'+
                        '<img class="item-img" src=$url>'+
                        '$brand'+
                        '<div class="item-info">'+
                            '<p class="item-title">$name</p>'+
                            '<div class="item-desc clearfix">'+
                                '<div class="item-score">$item_score</div>'+
                                '<div class="item-count">月售&nbsp;&nbsp;&nbsp;$monthNum</div>'+
                                '<div class="item-distance">&nbsp;$distance</div>'+
                                '<div class="item-time">&nbsp;$delivery_time&nbsp;|</div>'+
                            '</div>'+
                            '<div class="item-minPrice">&min_price</div>'+
                            '<div class="item-promotion">$promotion</div>'+
                        '</div>'+
                    '</div>'
    /**
    * get restaurants list
    * param    
    */
    function getList(){
        $.get("../../json/homelist.json",function(data){
            console.log(data);
            var list=data.data.poilist||[];
            initContentList(list);
            toMenu();
        })
    };

    /**
    * render brand (new or brand)
    * param   {} data  
    */
    function getBrand(data){
        if(data.brand_type){
            return '<div class="brand brand-pin">品牌</div>';
        }else{
            return '<div class="brand brand-new">新品</div>';
        }
    }

    /**
    * render sold per month
    * param   {} data  
    */
    function getMonthNum(data){
        var num=data.month_sale_num;
        //if num>999, show "999+"
        if(num>999){
            return '999+';
        }else{
            return num;
        }
    }

    /**
    * render promotion
    * param   {} data  
    */
    function getPromotion(data){
        var array=data.discounts2;
        var str="";

        array.forEach(function(item,index){
            var _str='<div class="promotion-item">'+
                        '<img class="promotion-icon" src=$icon_url>'+
                        '<p class="promotion-item-info one-line">$info</p>'+
                    '</div>';
            _str=_str.replace("$icon_url",item.icon_url)
                     .replace("$info",item.info);

            str=str+_str;

        });

        return str;

    }


    /**
    * render data to dom
    * param   []  
    */
    function initContentList(list){
        list.forEach(function(item,index){
            var str=itemTmpl
                    .replace('$url',item.pic_url)
                    .replace('$name',item.name)
                    .replace('$distance',item.distance)
                    .replace('$delivery_time',item.mt_delivery_time)
                    .replace('&min_price',item.min_price_tip)

                    .replace('$brand',getBrand(item))

                    .replace('$monthNum',getMonthNum(item))

                    .replace('$promotion',getPromotion(item))

                    .replace('$item_score',new starScore(item.wm_poi_score).getStars());

            $(".list-wrap").append(str);
        });     
    }

    //跳转到menu
    function toMenu(){
        $('.content-item').on('click','.item-info',function(){
            window.location.href="../../menu/menu.html";
        })
    }

    function init(){
        getList();
    };
    init();
})();