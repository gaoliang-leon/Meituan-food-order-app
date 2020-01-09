(function(){
    // set up a template to be append to DOM
    var itemTmpl= '<div class="category-item">'+
                        '<img class="item-icon" src=$url >'+
                        '<p class="item-name"> $name </p>'+
                    '</div>';


    function categoryInit(){

        $.get('../json/head.json',function(data){
             // console.log(data);
            var list= data.data.primary_filter.splice(0,8);
            list.forEach(function(item,index){
                var str=itemTmpl.replace('$url',item.url).replace('$name',item.name);

                $('.category').append(str);
            })
            

        })
    };

    function addClick(){
        $('.category').on('click','.category-item',function(){
            alert("1");
        });
    }

    function init(){
        categoryInit();
        addClick();
    }
    init();
})();


