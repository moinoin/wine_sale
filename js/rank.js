// $('.select').on('click', function () {
//     $('.ask').show();
// });
// $('.buy, .dislike').on('click', function () {
//     $('.ask').hide();
// });
// $.ajax({
//     type: 'post',
//     data: '{"sendId":"2"}',
//     url: 'http://zhouhao.ngrok.cc/message/messagePage',
//     contentType: 'application/json',
//     success: function (res) {
//         console.log(res);
//         var arrData = res;
//         for (var i = 0; i < arrData[0].length; i++) {
//             var goodsTPL = '<div class="content-1">/n'+
//                 '<div class="left">/n'+
//                 '<img src="">/n'+
//                 '</div>/n'+
//                 '<div class="middle">/n'+
//                 '<span class="wine-name">/n'+'</span>/n'+
//                 '<div class="wine-message">/n'+
//                 '<span class="grade">/n'+'</span>/n'+
//            '<span class="price">/n'+'</span>/n'+
//                 '</div>/n'+
//                 '</div>/n'+
//                 '<div class="right">/n'+
//                 '<img class="select" src="img/rank/select.png" >/n'+
//                 '</div>/n'+
//                 '</div>/n';
//             $('rank').html($('rank')[0].innerHTML + goodsTPL);
//         }
//         for (var i = 0; i < arrData.length; i++) {
//             for (var j = 0; j < arrData[i].length; j++) {
//                 for (var attr in arrData[i][j]) {
//                     if (attr == 'nickname') {
//                         $('.user-name').eq(j).html(arrData[i][j][attr]);
//                         // console.log(arrData[i][j][attr]);
//                     }
//                     if (attr == 'headimgurl') {
//                         $('.user-pic').eq(j)[0].src = arrData[i][j][attr];
//                     }
//                     if (attr == 'userIdentity') {
//                         $('.user-pro').eq(j).html(arrData[i][j][attr]);
//                     }
//                     if (attr == 'messageContent') {
//                         $('.message-content').eq(j).html(arrData[i][j][attr]);
//                     }
//                 }
//             }
//         }
//     }
// })