var openPerson,otherPerson;
$.ajax({
    type:'post',
    url:'http://oomforjmm.imwork.net:12965/personal/test2',
    contentType:'application/json',
    success:function(res){
        openPerson='';
        otherPerson='';
        console.log(res);
        var jsonData=JSON.parse(res);
        for(var attr in jsonData){
            if(attr=='isAt'){
                //进别人页面看是否关注，1为关注，0为未关注,关注为true,未关注为false
                if(jsonData[attr]=='1'){
                    $('.add-attention').html('&nbsp;&nbsp;&nbsp;已关注').css('color','#575454');
                    tab=true;
                }else{
                    $('.add-attention').html('+&nbsp;&nbsp;&nbsp;关注').css('color','#1b1a1a');
                    tab=false;
                }
            }else if(attr=='otherId'){
                //由于前期的问题，openPerson存储的为页面展示人的id
                openPerson=jsonData[attr];
            }else if(attr=='user'){
                for(var attr1 in jsonData[attr]){
                    if(attr1=='headimgurl'){
                        $('.user-pic img')[0].src=jsonData[attr][attr1];
                    }else if(attr1=='nickname'){
                        $('.user-name').html(jsonData[attr][attr1]);
                    }else if(attr1=='attentionNum'){
                        $('.follow-num').html(jsonData[attr][attr1]);
                    }else if(attr1=='fansNum'){
                        $('.following-num').html(jsonData[attr][attr1]);
                    }else if (attr1== 'sex'){
                        if (jsonData[attr][attr1]=='1'){
                            $('.center-wine-class .title .text').html('他所购买的酒品中');
                        }else{
                            $('.center-wine-class .title .text').html('她所购买的酒品中');
                        }
                    }else if(attr1=='openId'){
                        //由于前期的问题，otherPerson存储的为浏览该页面人的id
                        otherPerson=jsonData[attr][attr1];
                    }
                }
            }else if(attr == 'placeRatio'){
                $('.place-ratio').html(jsonData[attr]);
            }else if(attr == 'place'){
                $('.place').html(jsonData[attr]);
            }else if(attr == 'brandRatio'){
                $('.brand-ratio').html(jsonData[attr]);
            }else if(attr == 'brand'){
                $('.brand').html(jsonData[attr]);
            }else if(attr == 'yearRatio'){
                $('.year-ratio').html(jsonData[attr]);
            }else if(attr == 'time'){
                $('.year').html(jsonData[attr]);
            }
        }
    },
    error:function(){
        //$('.center-section').html('未能加载');
    }
});

var tab;
$('.add-all').click(function () {
    //未关注时点击关注，显示已关注，则为true
    if(tab) {
        $.ajax({
            method: 'post',
            url: 'http://oomforjmm.imwork.net:12965/personal/do',
            contentType: 'application/json',
            data: '{"openid":"oEqFyvx8TdK-ETuv8esDuRJyDx7M"}',
            success: function (res) {
                if(res='succ'){
                    $('#follow').css('color','#575454');
                    $('#follow').html('&nbsp;&nbsp;&nbsp;已关注');
                    $('#flower-num').html(parseInt($('#flower-num').html())+1);
                }
            }
        });
    }
    else{// 点击已关注，表示取消关注，则为false
        $.ajax({
            method: 'post',
            url: 'http://oomforjmm.imwork.net:12965/personal/do',
            contentType: 'application/json',
            data: '{"openid":"oEqFyvx8TdK-ETuv8esDuRJyDx7M"}',
            success: function (res) {
                if(res='succ'){
                    $('#follow').html('+&nbsp;&nbsp;&nbsp;关注').css('color','#1b1a1a');
                    $('#flower-num').html(parseInt($('#flower-num').html())-1);
                }
            }
        });
    }
    tab=!tab;
});