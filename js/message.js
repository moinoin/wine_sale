$.ajax({
    type: 'post',
    data: '{"sendId":"2"}',
    url: 'http://zhouhao.ngrok.cc/message/messagePage',
    contentType: 'application/json',
    success: function (res) {
        console.log(res);
        var arrData = res;
        for (var i = 0; i < arrData[0].length; i++) {
            var goodsTPL ='<div class="message-1">\n'+'<div class="message-left">\n'
                + '<img class="user-pic" src="">\n' +
                '</div>\n' +
                '<div class="message-right">\n' +
                '<span class="user-name">\n' + '</span>\n' +
                '<div class="user-pro">\n' +
                '<img  class="official" src="">\n' +
                '<img  class="business" src="">\n' +
                '<img  class="friends" src="">\n' +
                '</div>\n' +
                '<div class="message-content">\n' + '</div>\n' +
                '</div>\n'+'</div>';
            $('.message').html($('.message')[0].innerHTML + goodsTPL);
        }
        for (var i = 0; i < arrData.length; i++) {
            for (var j = 0; j < arrData[i].length; j++) {
                for (var attr in arrData[i][j]) {
                    if (attr == 'nickname') {
                        $('.user-name').eq(j).html(arrData[i][j][attr]);
                    }
                    if (attr =='headimgurl') {
                        $('.user-pic').eq(j)[0].src = arrData[i][j][attr];
                    }
                    if (attr == 'userIdentity') {
                        $('.user-pro').eq(j).html(arrData[i][j][attr]);
                    }
                    if (attr == 'messageContent') {
                        $('.message-content').eq(j).html(arrData[i][j][attr]);
                    }
                }
            }
        }
    }
});
