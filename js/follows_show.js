
//跳转页面之后优先展示其中一个选项卡
$.ajax({
    type:'post',
    data:'1',
    url:'http://oomforjmm.imwork.net:12965/personal/getList',
    contentType:'application/json',
    success:function(res){
        console.log(res);
        var a=JSON.parse(res);
        request(a);
    },
    error:function(){
        alert(456);
    }
});
//点击关注/粉丝给后台传不同的数据,并请求数据
$('.flow').click(function(){
    showAttention();
    $.ajax({
        type:'post',
        data:'1',
        contentType:'application/json',
        url:'http://oomforjmm.imwork.net:12965/personal/getList',//////////////
        success:function(res){
            //console.log(res);
            var a=JSON.parse(res);
            request(a);
        }
    });
});
$('.flower').click(function(){
    showFans();
    $.ajax({
        type:'post',
        data:'0',
        contentType:'application/json',
        url:'http://oomforjmm.imwork.net:12965/personal/getList',//////////////
        success:function(res){
            //console.log(res);
            var a=JSON.parse(res);
            request(a);
        }
    });
});

//点击关注/粉丝，添加样式，分别展示
function showAttention(){
    $('.flow').find('div').css('border-bottom','0.03rem solid #611c33');
    $('.flower').find('div').css('border-bottom','0');
    $('.section-flow').css('display','block');
    $('.fans').css('display','none');
}
function showFans(){
    $('.flower').find('div').css('border-bottom','0.03rem solid #611c33');
    $('.flow').find('div').css('border-bottom','0');
    $('.section-flow').css('display','none');
    $('.fans').css('display','block');
}


//处理获取到的数据
function request(data){
    var jsonData=data;
    var sAttention='';
    var sFans='';
    for(var attr in jsonData) {
        if(attr == 'type'){
            if(jsonData[attr]=='1'){
                showAttention();
            }else{
                showFans();
            }
        }else if(attr=='attentionList'){
            //先创建关注页面的li
            for(var i=0;i<jsonData[attr].length;i++){
                sAttention+='<li><a href="other-person.html">\n'+ //跳转
                    '<span class="user-pic"><img src="img/person/userpic.png" style="width:1rem;height:1rem;"></span>\n'+
                    '<span class="username">大脸猫爱吃鱼</span>\n'+
                    '</a></li>';
            }
            $('.section-flow').html(sAttention);
            //渲染li
            for(var i=0;i<jsonData[attr].length;i++){
                for(var attr1 in jsonData[attr][i]){
                    if(attr1=='fansHeadimg') {
                        $('.user-pic').eq(i).find('img')[0].src = jsonData[attr][i][attr1];
                    }else if(attr1=='fansName'){
                        $('.username').html(jsonData[attr][i][attr1]);
                    }else if(attr1=='attentionId'){
                        //给li绑定此人id,方便点击给后台交互
                        $('.section-flow li').eq(i)[0].attentionId=jsonData[attr][i][attr1];
                    }
                }
            }
            //点击li，给后台标记
            $('.section-flow li').click(function(){
                $.ajax({
                    type:'post',
                    url:'http://oomforjmm.imwork.net:12965/personal/other',
                    data:this.attentionId,//将关注人id用json对象传给后台
                    contentType:'application.json'
                });
            });
        }else if(attr=='fansList'){
            //创建粉丝页面的li
            for(var i=0;i<jsonData[attr].length;i++){
                sFans+='<li><a href="others-person.html">\n'+
                    '<span class="fans-pic"><img src="img/peroson/userpic.jpg" style="width:1rem;height:1rem;"></span>\n'+
                    '<span class="fans-name"></span>'+
                    '</a></li>';
            }
            $('.fans').html(sFans);
            //渲染li
            for(var i=0;i<jsonData[attr].length;i++){
                for(var attr1 in jsonData[attr][i]){
                    if(attr1=='fansHeadimg') {
                        $('.fans-pic').eq(i).find('img')[0].src = jsonData[attr][i][attr1];
                    }else if(attr1=='fansName'){
                        $('.fans-name').html(jsonData[attr][i][attr1]);
                    }
                }
            }
            //点击li，给后台标记
            $('.fans li').click(function(){
                $.ajax({
                    type:'post',
                    url:'http://oomforjmm.imwork.net:12965/personal/other',
                    data:this.attentionId,//将关注人id用json对象传给后台
                    contentType:'application/json'
                });
            });
        }
    }
}
