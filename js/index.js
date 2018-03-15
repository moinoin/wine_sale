$('.title').eq(0).css({'display': 'block'});
$('.title').eq(1).css({'display': 'none'});
$('.title').eq(2).css({'display': 'none'});
$('.strict-houseSelections').eq(0).css({'display': 'block'});
$('.strict-houseSelections').eq(1).css({'display': 'none'});
$('.index-nav li').click(function () {
    $('.index-nav li').css('color', '#000000').eq($(this).index()).css('color', '#611c33');
    $('.title').css('display', 'none').eq($(this).index()).css('display', 'block');
    $('.index-nav-bar').css('display', 'none').eq($(this).index()).css('display', 'block');
});
$('.index-nav li').eq(2).click(function () {
    $('.re').css('color', '#fff');
    $('.re').css('background-color', '#fff');
});
$('.strict-nav li').click(function () {
    $('.strict-houseSelections').css('display', 'none').eq($(this).index()).css('display', 'block');
});
$('.index-nav li').click(function () {
    $('.recommend-nav li span').css('color', '#000000').eq($(this).index()).css('color', '#611c33');
});
$('.strict-nav1 li').click(function () {
    $('.strict-nav1 li span').css('color', '#000000').eq($(this).index()).css('color', '#611c33');
});

//轮播图的ajax
// $.ajax({
//     method: 'post',
//     url: 'http://lzhd.ngrok.cc/recommend/test',
//     contentType: 'application/json',
//     success: function (res) {
//         console.log(res);
//         for(var i=0;i<res.length;i++){
//             for(var attr in res[i]){
//                 if(attr='winImg'){
//                     $('.swiper-slide img').eq(i).attr('src',res[i][attr]);
//                 }
//             }
//         }
//     },
//     error: function () {
//         console.log('轮播图请求失败!');
//     }
// });
// 大V用户ajax
$.ajax({
    method: 'post',
    url: 'http://wxredwine.top:8080/moments/momentsList',
    data: '{"currentPage":"1"}',
    contentType: 'application/json',
    success: function (res) {
        var idZan = [];
        console.log(res);
        //动态生成res.length个朋友圈
        for (var i = 0; i < res.length; i++) {
            for (var attr in res[i]) {
                if (attr == 'nickname' && res[i][attr] != null) {
                    var userTpl = '<div class="persom">\n' +
                        '            <div class="img"><img src="" class="user" style="width: .84rem;height: .84rem"></div>\n' +
                        '            <div class="comm">\n' +
                        '                <div class="con">\n' +
                        '                    <h3 class="name1"></h3>\n' +
                        '                    <p class="par"></p>\n' +
                        '                </div>\n' +
                        '                <div class="picture">\n' +
                        '                </div>\n' +
                        '                <div class="zan-and-com">\n' +
                        '                    <div class="time"></div>\n' +
                        '                    <div class="right">\n' +
                        '                        <div class="zan">\n' +
                        '                            <img src="img/index/zan.png" style="width: .28rem; height: .24rem">\n' +
                        '                            <span class="zanzan">赞</span>\n' +
                        '                        </div>\n' +
                        '                        <a class="discuss" href="#">\n' +
                        '                            <img src="img/index/comme.png" class="comme" style="width: .28rem; height: .24rem">\n' +
                        '                            <span class="co">评论</span>\n' +
                        '                        </a>\n' +
                        '                    </div>\n' +
                        '                </div>\n' +
                        '                <div class="bar">\n' +
                        '                    <img src="img/index/zan1.png" class="xin" style="width: .22rem; height: .20rem"><span class="zan-person"></span>\n' +
                        '                </div>\n' +
                        '                <div class="comment-di"></div>\n' +
                        '            </div>\n' +
                        '            <div class="tran"></div>\n' +
                        '        </div>';
                    $('.largeV').html($('.largeV').html() + userTpl);//将生成的朋友圈放入largeV中
                }
            }
        }
        //渲染大V用户页面.
        for (var i = 0; i < res.length; i++) {
            for (var attr in res[i]) {
                if (attr == 'nickname' && res[i][attr] != null) {
                    $('.name1').eq(i).html(res[i][attr]);//渲染发朋友圈的用户名
                } else if (attr == 'cirId' && res[i][attr] != null) {
                    idZan.push('{"cirId":"' + res[i][attr] + '"}');
                } else if (attr == 'cirContent' && res[i][attr] != null) {
                    $('.par').eq(i).html(res[i][attr]);//渲染评论内容
                } else if (attr == 'supportList' && res[i][attr].length != 0) {//渲染点赞的人
                    var str = '';
                    for (var j = 0; j < res[i][attr].length; j++) {
                        for (var attr1 in res[i][attr][j]) {
                            if (attr1 == 'supNickname' && res[i][attr][j][attr1] == null) {
                                $('.comm .bar').eq(i).css('display', 'none');
                            }
                            if (attr1 == 'supNickname' && res[i][attr][j][attr1] != null) {
                                str += res[i][attr][j][attr1] + '&nbsp;&nbsp;.&nbsp;&nbsp;';
                            }
                        }
                    }
                    $('.zan-person').eq(i).html(str);
                } else if (attr == 'cirTime' && res[i][attr] != null) {
                    $('.time').eq(i).html(res[i][attr]);//渲染发圈时间
                } else if (attr == 'headimgurl' && res[i][attr] != null) {
                    $('.user').eq(i).attr('src', res[i][attr]);//渲染发朋友圈的用户头像
                } else if (attr == 'circlesFriendImagesList' && res[i][attr].length != 0) {//渲染发圈的评论的图片,最多九图
                    var oImg = '';
                    for (var j = 0; j < res[i][attr].length; j++) {
                        for (var attr1 in res[i][attr][j]) {
                            if (attr1 != 'cirImagesId' && res[i][attr][j][attr1] != null) {
                                //生成对应个数的朋友圈图片,放在oImg中
                                oImg += '<img src="' + res[i][attr][j][attr1] + '" class="aaa" style="width: 1.58rem; height: 1.58rem">';
                            }
                        }
                    }
                    $('.picture').eq(i).html(oImg);
                } else if (attr == 'commentList' && res[i][attr].length != 0) {//渲染评论的人
                    var str = '';
                    for (var j = 0; j < res[i][attr].length; j++) {
                        for (var attr1 in res[i][attr][j]) {
                            if (attr1 == 'comContent' && res[i][attr][j][attr1] == null) {
                                $('.comment-di').eq(i).css('display', 'none');
                            }
                            if (attr1 == 'comContent' && res[i][attr][j][attr1] != null) {
                                var at = 'comNickname';
                                str += '<div class="comment">' + res[i][attr][j][at] + '&nbsp;&nbsp;:&nbsp;&nbsp;' + res[i][attr][j][attr1] + '</div>';
                            }
                        }
                    }
                    $('.comment-di').eq(i).html(str);
                }
            }
        }

        // 大V用户点赞的时候将当前用户的用户名放在点赞栏中
        var aZan=document.getElementsByClassName('zan');//获取页面中点赞标签
        var aDiscuss=document.getElementsByClassName('discuss');//获取页面中评论标签
        var aZanperson=document.getElementsByClassName('zan-person');//获取页面中评论标签
        var string='';
        for (var i = 0; i<aZan.length;i++){
            aZan[i].index=i;
            aZan[i].addEventListener('click',function () {
                string=aZanperson[this.index].innerHTML;
                $.ajax({
                    method: 'post',
                    url: 'http://wxredwine.top:8080/moments/insertSupport',
                    data: '{"cirId":"1"}',//idZan[$(this).index()],
                    contentType: 'application/json',
                    success: function (res) {
                        console.log(res);
                        for(var attr in res){
                            if(attr=='supNickname'){
                                string+=res[attr];
                            }
                        }
                    },
                    error: function () {
                        console.log('大V用户点赞请求失败!');
                    }
                });
                //alert(string);
                // aZan[this.index].innerHTML=string;
            });
        }


        // 大V用户评论的时候将评论放在评论栏中
        $('.discuss').click(function () {
            // $.ajax({
            //     method: 'post',
            //     url: '',
            //     data: '{"cirId":"1"}',
            //     contentType: 'application/json',
            //     success: function (res) {
            //         console.log(res);
            //         // for(var attr in res){
            //         //     console.log(attr);
            //         //     if(attr=='supNickname'){
            //         //
            //         //     }
            //         // }
            //     },
            //     error: function () {
            //         console.log('大V用户点赞请求失败!');
            //     }
            // });
        });

        //点击朋友圈的图片可以查看大图
        $('.picture img').click(function () {
            //alert('朋友圈图片');
            var bigTu='<img src="">';
            // $('')

        });
    },
    error: function () {
        console.log('大V用户点赞请求失败!');
    }
});

//严选品牌ajax
function ajaxRedWhiteWine(id, oDiv, oDiv1, oDiv2) {
    $.ajax({
        method: 'post',
        url: 'http://wxredwine.top:8080/redGrapes/viewBrand',
        data: id,
        contentType: 'application/json',
        success: function (res) {
            console.log(res);
            $('.strict-houseSelections-red').html('');
            $('.strict-houseSelections-white').html('');
            var userTpl = '<div class="index-houseSelections">\n' +
                '                <div class="index-title" href="">\n' +
                '                    <span class="index-title-bar"></span>\n' +
                '                    <span class="ti">&nbsp;高分品牌&nbsp;</span>\n' +
                '                    <a href="rank.html"><img src="img/index/more1.png" style="width: .21rem; height: .24rem;"></a>\n' +
                '                </div>\n' +
                '                <div class="content1">\n' +
                '                </div>\n' +
                '            </div>';
            var contTpl = '<div class="index-content index-content1">\n' +
                '                        <a class="index-wine" href="product_details.html">\n' +
                '                            <div class="img" style="width: 2.26rem; height: 2.22rem; overflow: hidden;"><img class="index-wine-img" src=""></div>\n' +
                '                            <div class="word">\n' +
                '                                <div class="name2 name">品牌名</div>\n' +
                '                            </div>\n' +
                '                        </a>\n' +
                '                    </div>';
            var arr = ['高分品牌', '高销量品牌', '高产品牌', '华夏品牌', '海外品牌'];
            for (var i = 0; i < res.length; i++) {
                $(oDiv).html($(oDiv)[0].innerHTML + userTpl);
                var content = '';
                for (var j = 0; j < res[i].length; j++) {
                    content += contTpl;
                    $(oDiv2).html(content);
                }
                $(oDiv1).eq(i).html('&nbsp;' + arr[i] + '&nbsp;');
            }
            var count = -1;
            var temp, tempImg;
            for (var i = 0; i < res.length; i++) {
                for (var j = 0; j < res[i].length; j++) {
                    for (var attr in res[i][j]) {
                        if (attr == 'wineBrand') {
                            temp = res[i][j][attr];
                        } else if (attr == 'wineImg') {
                            tempImg = res[i][j][attr];
                        }
                    }
                    count++;
                    $('.name2').eq(count).html(temp);
                    $('.index-wine-img').eq(count).attr('src', tempImg);
                }
            }
        },
        error: function () {
            console.log('严选品牌请求失败!');
        }
    });
}

//进入严选品牌位于红葡萄酒的选项卡
ajaxRedWhiteWine('{"wine_class":"1"}', '.strict-houseSelections-red', '.strict-houseSelections-red .ti', '.strict-houseSelections-red .content1');
//点击红葡萄酒选项卡
$('.strict-nav1 .red').click(function () {
    ajaxRedWhiteWine('{"wine_class":"1"}', '.strict-houseSelections-red', '.strict-houseSelections-red .ti', '.strict-houseSelections-red .content1');
});
//点击白葡萄酒选项卡
$('.strict-nav1 .white').click(function () {
    ajaxRedWhiteWine('{"wine_class":"2"}', '.strict-houseSelections-white', '.strict-houseSelections-white .ti', '.strict-houseSelections-white .content1');
});

// 个性推荐ajax
$.ajax({
    method: 'post',
    url: 'http://wxredwine.top:8080/redWineRecommend/recommendView',
    data: '{"openid":"1"}',
    contentType: 'application/json',
    success: function (res) {
        console.log(res);
        for (var i = 0; i < res.length; i++) {
            var personTpl = '<div class="index-title">\n' +
                '                <span class="index-title-bar"></span>\n' +
                '                <span>&nbsp;推荐酒单&nbsp;</span>\n' +
                '                <a href="rank.html"><img src="img/index/more.png" style="width: .21rem; height: .24rem;"></a>\n' +
                '            </div>\n' +
                '            <div class="content">\n' +
                '            </div>';
            var personContent = ' <div class="index-content">\n' +
                '                    <a class="index-wine" href="product_details.html">\n' +
                '                        <div class="img"  style="width: 3.6rem; height: 2.95rem; overflow: hidden;"><img src="" style="width: 50%;"></div>\n' +
                '                        <div class="word">\n' +
                '                            <div class="name">酒单名</div>\n' +
                '                            <div class="recomm">推荐理由xxxxxxxxxxxxxxxx</div>\n' +
                '                        </div>\n' +
                '                    </a>\n' +
                '                </div>';
            var con = '';
            $('.recommend .index-houseSelections').html($('.recommend .index-houseSelections').html() + personTpl);
            for (var attr in res[i]) {
                con += personContent;
            }
            $('.recommend .index-houseSelections .content').html(con);
        }
        var count = -1;
        var temp, tempImg,tempHref;
        for (var i = 0; i < res.length; i++) {
            for (var j = 0; j < res[i].length; j++) {
                for (var attr in res[i][j]) {
                    if (attr == 'winName') {
                        temp = res[i][j][attr];
                    } else if (attr == 'winImg') {
                        tempImg = res[i][j][attr];
                    }else if(attr == 'winId'){
                        tempHref = res[i][j][attr];
                    }
                }
                count++;
                $('.recommend .index-houseSelections .content .name').eq(count).html(temp);
                $('.recommend .index-houseSelections .index-wine img').eq(count).attr('src', tempImg);
                $('.recommend .index-houseSelections .index-wine').eq(count).attr('href', './product_details.html?winId='+tempHref);
            }
        }

    },
    error: function () {
        console.log('个性推荐请求失败!');
    }
});