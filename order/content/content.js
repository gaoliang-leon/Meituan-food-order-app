(function(){

    var itemTmpl='<div class="order-item">'+
                    '<div class="order-detail">'+
                        '<img class="order-item-pic" src=$poi_pic>'+
                        '<div class="order-item-desc">'+
                            '<div class="item-top">'+
                                '<p class="item-title one-line">$poi_name</p>'+
                                '<div class="arrow"></div>'+
                                '<div class="order-status">$status_description</div>'+
                            '</div>'+
                            '<div class="item-bottom">$getProduct</div>'+
                        '</div>'+
                    '</div>'+
                    '$getComment'+
                 '</div>'

    /**
    * require json data
    *@param
    */
    function getList(){
        $.get("../../json/orders.json",function(data){
            console.log(data);
            var list=data.data.digestlist||[];
            initContent(list);
        })
    }
    /**
    * get totalPrice
    *@param {}
    */
    function getTotalPrice(data){
        var str='<div class="product-item">'+
                    '<span>...</sapn>'+
                    '<div class="product-total-count">'+
                        '总计'+data.product_count+'个菜，实付'+'<span class="total-price">￥'+data.total+'</sapn>'+
                        '</div>'+
                 '</div>';
        return str;
    }
    /**
    * render product
    *@param {}
    */
    function getProduct(data){
        var list=data.product_list||[];
        list.push({type:"more"});
        var str="";
        list.forEach(function(item){
            
            if(item.type==="more"){
                //注意这里参数是data而不是item，因为totalprice是在data中
                str+=getTotalPrice(data);
            }else{
                str+='<div class="product-item">'+
                        item.product_name+
                        '<div class="product-count">x'+item.product_count+'</div>'+
                     '</div>'   
            }
        })
        return str;
    }
    /**
    * getComment
    *@param {}
    */
    function getComment(data){
        var comment=!data.is_comment;//is_comment 为0代表没评价过，1代表评价过了
        if(comment){
            return '<div class="comment clearfix">'+
                        '<div class="comment-btn">评价</div>'+
                    '</div>'
        }else{
            return '<div class="comment clearfix">'+
                        '<div class="comment-btn">已评价</div>'+
                    '</div>';
        }
    }
    /**
    * render list
    *@param [] 
    */
    function initContent(list){
        list.forEach(function(item){
            var str=itemTmpl.replace("$poi_pic",item.poi_pic)
                            .replace("$poi_name",item.poi_name)
                            .replace("$status_description",item.status_description)
                            .replace("$getProduct",getProduct(item))
                            .replace("$getComment",getComment(item));

            $(".order-list").append(str);
        });
    };
    /**
    * init
    *@param
    */
    function init(){
        getList();
    }
    init();
})()