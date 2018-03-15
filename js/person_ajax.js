$.ajax({
    method:'post',
    url:'http://oomforjmm.imwork.net:12965/personal/do',
    contentType:'application/json',
    data:'{"openid":"oEqFyvx8TdK-ETuv8esDuRJyDx7M"}',
    success:function(res){
        console.log(res);
        var jsonData = JSON.parse(res);
        for(var attr in jsonData) {
            if (attr == 'user') {
                for (var attr1 in jsonData[attr]) {
                    if (attr1 == 'nickname') {
                        $('.username a').html(jsonData[attr][attr1]);
                    }
                    if (attr1 == 'attentionNum') {
                        $('#flow-num').html(jsonData[attr][attr1]);
                    }
                    if (attr1 == 'fansNum') {
                        $('#flower-num').html(jsonData[attr][attr1]);
                    }
                    if (attr1 == 'headimgurl') {
                        $('.user-pic img')[0].src = jsonData[attr][attr1];
                    }
                }
            }
        }
    },
    error:function () {
        alert('加载失败，请重新加载');
    }
});

$('#flow-num').click(function(){
    $.ajax({
        type:'post',
        data:'1',
        contentType:'application/json',
        url:'http://oomforjmm.imwork.net:12965/personal/toList'
    });

});
$('#flower-num').click(function(){
    $.ajax({
        type:'post',
        data:'0',
        contentType:'application/json',
        url:'http://oomforjmm.imwork.net:12965/personal/toList'
    });
});