(function(){
    var itemTmpl='<div class="star-score">$starstr</div>';

    function _getStars(){
        var _score=this.score.toString();

        var scoreArr=_score.split(".");

        var fullstar=parseInt(scoreArr[0]);

        var halfstar=parseInt(scoreArr[1])>=5?1:0;

        var nullstar=5-fullstar-halfstar;

        var starstr="";

        for(var i=0;i<fullstar;i++){
            starstr+='<div class="star fullstar"></div>';
        }
        for(var j=0;j<halfstar;j++){
            starstr+='<div class="star halfstar"></div>';
        }
        for(var k=0;k<nullstar;k++){
            starstr+='<div class="star nullstar"></div>';
        }

        return itemTmpl.replace("$starstr",starstr);
    }
    //定义一个构造函数，把score和_getStars暴露出去在全局中也可以调用
    window.starScore=function(score){
        this.score=score||"";
        this.getStars=_getStars;
    }
})()