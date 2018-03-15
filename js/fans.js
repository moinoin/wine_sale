$('.flow').click(function () {
    $('#border2').css('border-bottom','0px');
    $('#border1').css('border-bottom',' 0.03rem solid #611c33');
    $('.section-flower').css('display','none');
});
$('.flower').click(function () {
    $('#border1').css('border-bottom','0px');
    $('#border2').css('border-bottom',' 0.03rem solid #611c33');
    $('.section-flow').css('display','none');
});
$('.flow').click(function(){
    $.ajax({
        type:'post',
        data:'1',
        url:'http://oomforjmm.imwork.net:12965/personal/toList'
    });
});
$('.flower').click(function(){
    $.ajax({
        type:'post',
        data:'0',
        url:'http://oomforjmm.imwork.net:12965/personal/toList'
    });
});

$.ajax({
    type:'post',
    data:'2',
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

// function request(data){
//     var jsonData=data;
//     var sAttention='';
//     var sFans='';
//     for(var attr in jsonData) {
//         if (attr == 'type') {
//             if (jsonData[attr] == '1') {
//                 showAttention();
//             } else {
//                 showFans();
//             }
//         } else if (attr == 'attentionList') {
//             //先创建关注页面的li
//             for (var i = 0; i < jsonData[attr].length; i++) {
//                 sAttention += '<li>< a href="">\n' +///////////////////跳转href
//                     '<span class="attention-pic">< img src="img/follows_show/fans_pic.png" style="width:1.34rem;height:1.34rem;"></span>\n' +
//                     '<span class="attention-name">关注昵称</span>\n' +
//                     '</a></li>';
//             }
//             $('.attention').html(sAttention);
//             //渲染li
//             for (var i = 0; i < jsonData[attr].length; i++) {
//                 for (var attr1 in jsonData[attr][i]) {
//                     if (attr1 == 'attentionHeadimg') {
//                         $('.user-pic').eq(i).find('img')[0].src = jsonData[attr][i][attr1];
//                     } else if (attr1 == 'attentionName') {
//                         $('.username').html(jsonData[attr][i][attr1]);
//                     } else if (attr1 == 'attentionId') {
//                         //给li绑定此人id,方便点击给后台交互
//                         $('.attention li').eq(i)[0].attentionId = jsonData[attr][i][attr1];
//                     }
//                 }
//             }
//             $('.attention li').click(function () {
//                 $.ajax({
//                     type: 'post',
//                     url: 'http://oomforjmm.imwork.net:12965/personal/other',
//                     data: this.attentionId//////////////////将关注人id用json对象传给后台
//                 });
//             });
//         });