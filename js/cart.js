$.ajax({
    method: 'post',
    url: 'http://wxredwine.top:8080/ShopCartController/selectAll',
    contentType: 'application/json',
    //data:'[{"op0enid":"111","wineId":"111","wineNum":"10","winePrice":22300,"selStatus":true}]',
    success: function(res) {
        console.log(res);
        for (var i = 0; i < res.length; i++) {
            var goodsTpl = '<div class="cart-list">\n' +
                '        <div class="cart-content">\n' +
                '            <div class="pic"><img src="./img/cart/circle.png" class=circle></div>\n' +
                '            <img src="./img/cart/wine1.jpg" class="wine">\n' +
                '            <div class="cart-goods">\n' +
                '                <h3 class="cart-goods-name"></h3>\n' +
                '                <li class="cart-goods-score">评分：9分</li>\n' +
                '                <li class="cart-goods-price">¥' +
                '                   <span class="price">88</span>\n'+
                '                </li> \n' +
                '            </div>\n' +
                '        </div>\n' +
                '        <div class="cart-count">\n' +
                '            <div class="reduce">-</div>\n' +
                '            <div class="line"></div>\n' +
                '            <div class="number">1</div>\n' +
                '            <div class="line"></div>\n' +
                '            <div class="add">+</div>\n' +
                '        </div>\n' +
                '    </div>';
            $('.cart').html($('.cart')[0].innerHTML + goodsTpl);
        }
        for(var i = 0;i<res.length;i++){
            for(var attr in res[i]){
                // alert(attr);
                if(attr=='selStatus'&&res[i][attr]=='true'){
                    $('.circle').eq(i)[0].src = './img/cart/red-circle.png';
                }else{
                    $('.circle').eq(i)[0].src = './img/cart/circle.png';
                }
                if(attr=='wineImg'){
                    //     $('.wine').eq(i)[0].src = res[i][attr];
                }
                if(attr=='wineName'){
                    $('.cart-goods-name').eq(i).html(res[i][attr]);
                }
                if(attr=='wineScore'){
                    $('.cart-goods-score').eq(i).html('评分：'+res[i][attr]);
                }
                if(attr=='winePrice'){
                    $('.cart-goods-price .price').eq(i).html(+res[i][attr]);
                }
                if(attr=='wineNumber'){
                    $('.number').eq(i).html(res[i][attr]);
                }
            }
        }
        var goodsAccount = ' <div class="left">\n' +
            '            <div class="choose">\n' +
            '                <img src="img/cart/circle.png" class="circle">\n' +
            '                <span class="check-all">全选</span>\n' +
            '            </div>\n' +
            '            <span class="total-money">\n' +
            '                <span class="total">总计:</span>\n' +
            '                <span class="money">￥1314' +
            '</span>\n' +
            '            </span>\n' +
            '        </div>\n' +
            '        <div class="right">\n' +
            '            <span class="balance">去结算</span>\n' +
            '            <span class="amount">（3件）</span>\n' +
            '        </div>\n';
        $('account').insertAfter($('.cart-list').eq(res.length-1));
        $('.account').html(goodsAccount);
        var aCir = document.getElementsByClassName('circle');
        var oMoney = document.getElementsByClassName('money')[0];
        var oMount = document.getElementsByClassName('amount')[0];
        var aPri = document.getElementsByClassName('price');
        var aNum = document.getElementsByClassName('number');
        var cnt =0;
        var sum = 0;
        var num = 0;
        for(var i=0;i<aCir.length;i++){
            aCir[i].bOn = true;
            aCir[i].index = i;
            aCir[i].addEventListener('click',function(){
                if(this.bOn){
                    this.src='img/cart/red-circle.png';
                    cnt++;
                }else{
                    this.src='img/cart/circle.png';
                    cnt--;
                }
                this.bOn = !this.bOn;
                if(cnt==aCir.length-2){
                    aCir[aCir.length-1].src = 'img/cart/red-circle.png';
                }else{
                    aCir[aCir.length-1].src = 'img/cart/circle.png';
                }
                if(!this.bOn){
                    //console.log(parseInt(aPri[this.index-1].innerHTML));
                    //console.log(aNum[this.index-1].innerHTML);
                    sum += parseInt(aPri[this.index-1].innerHTML)*aNum[this.index-1].innerHTML;
                    oMoney.innerHTML =  '¥' + sum;
                    //console.log(sum);
                    //console.log(oMoney);
                    //oMount.innerHTML =
                }
                if(this.bOn){
                    sum -= parseInt(aPri[this.index-1].innerHTML)*aNum[this.index-1].innerHTML;
                    oMoney.innerHTML =  '¥' + sum;
                }
            });
        }
        var bOn1 = true;
        $('.circle').eq($('.circle').length-1).click(function(){
            if(bOn1){
                for(var i=0;i<$('.circle').length;i++){
                    $('.circle').eq(i)[0].src = 'img/cart/red-circle.png';
                }
                bOn1 = !bOn1;
            }else{
                for(var i=0;i<$('.circle').length;i++){
                    $('.circle').eq(i)[0].src = 'img/cart/circle.png';
                }
                bOn1 = !bOn1;
            }
        });

        var aNum = document.getElementsByClassName('number');
        var aAdd = document.getElementsByClassName('add');
        var aRed = document.getElementsByClassName('reduce');
        (function(){
            for(var i=0;i<aAdd.length;i++){
                aAdd[i].index=i;
                aAdd[i].cnt=1;
                aAdd[i].addEventListener('click',function(){
                    if(aNum[this.index].innerHTML>0) {
                        aNum[this.index].innerHTML =  this.cnt++;
                    }
                });
            }
            for(var j=0;j<aRed.length;j++){
                aRed[j].index=j;
                aRed[j].addEventListener('click',function(){
                    if(aNum[this.index].innerHTML>1) {
                        var cnt = aNum[this.index].innerHTML;
                        aNum[this.index].innerHTML = --cnt;
                    }
                });
            }
        })();


    }

    ,
    error: function(){

    }
});

// $.ajax({
//     method: 'post',
//     url: 'http://wxredwine.top:8080/ShopCartController/selectAll',
//     contentType: 'application/json',
//     //data:'[{"op0enid":"111","wineId":"111","wineNum":"10","winePrice":22300,"selStatus":true}]',
//     success: function(res) {
//         console.log(res);
//         for (var i = 0; i < res.length; i++) {
//             var goodsTpl = '<div class="cart-list">\n' +
//                 '        <div class="cart-content">\n' +
//                 '            <div class="pic"><img src="./img/cart/circle.png" class=circle></div>\n' +
//                 '            <img src="./img/cart/wine1.jpg" class="wine">\n' +
//                 '            <div class="cart-goods">\n' +
//                 '                <h3 class="cart-goods-name"></h3>\n' +
//                 '                <li class="cart-goods-score">评分：9分</li>\n' +
//                 '                <li class="cart-goods-price">¥' +
//                 '                   <span class="price">88</span>\n'+
//                 '                </li> \n' +
//                 '            </div>\n' +
//                 '        </div>\n' +
//                 '        <div class="cart-count">\n' +
//                 '            <div class="reduce">-</div>\n' +
//                 '            <div class="line"></div>\n' +
//                 '            <div class="number">1</div>\n' +
//                 '            <div class="line"></div>\n' +
//                 '            <div class="add">+</div>\n' +
//                 '        </div>\n' +
//                 '    </div>';
//             $('.cart').html($('.cart')[0].innerHTML + goodsTpl);
//         }
//         for(var i = 0;i<res.length;i++){
//             for(var attr in res[i]){
//                 // alert(attr);
//                 if(attr=='selStatus'&&res[i][attr]=='true'){
//                     $('.circle').eq(i)[0].src = './img/cart/red-circle.png';
//                 }else{
//                     $('.circle').eq(i)[0].src = './img/cart/circle.png';
//                 }
//                 if(attr=='wineImg'){
//                     //     $('.wine').eq(i)[0].src = res[i][attr];
//                 }
//                 if(attr=='wineName'){
//                     $('.cart-goods-name').eq(i).html(res[i][attr]);
//                 }
//                 if(attr=='wineScore'){
//                     $('.cart-goods-score').eq(i).html('评分：'+res[i][attr]);
//                 }
//                 if(attr=='winePrice'){
//                     $('.cart-goods-price').eq(i).html('￥'+res[i][attr]);
//                 }
//                 if(attr=='wineNumber'){
//                     $('.number').eq(i).html(res[i][attr]);
//                 }
//             }
//         }
//         var goodsAccount = ' <div class="left">\n' +
//             '            <div class="choose">\n' +
//             '                <img src="img/cart/circle.png" class="circle">\n' +
//             '                <span class="check-all">全选</span>\n' +
//             '            </div>\n' +
//             '            <span class="total-money">\n' +
//             '                <span class="total">总计:</span>\n' +
//             '                <span class="money">￥1314' +
//             '</span>\n' +
//             '            </span>\n' +
//             '        </div>\n' +
//             '        <div class="right">\n' +
//             '            <span class="balance">去结算</span>\n' +
//             '            <span class="amount">（3件）</span>\n' +
//             '        </div>\n';
//         $('<div class="account"></div>').insertAfter($('.cart-list').eq(res.length-1));
//         $('.account').html(goodsAccount);
//         var aCir = document.getElementsByClassName('circle');
//         var oMoney = document.getElementsByClassName('money')[0];
//         var aMount = document.getElementsByClassName('amount')[0];
//         var aPri = document.getElementsByClassName('price');
//         var aNum = document.getElementsByClassName('number');
//         var cnt =0;
//         var sum = 0;
//         var num = 0;
//         for(var i=0;i<aCir.length;i++){
//             aCir[i].bOn = true;
//             aCir[i].addEventListener('click',function(){
//                 if(this.bOn){
//                     this.src='img/cart/red-circle.png';
//                     cnt++;
//
//                 }else{
//                     this.src='img/cart/circle.png';
//                     cnt--;
//                 }
//                 this.bOn = !this.bOn;
//                 if(cnt==aCir.length-2){
//                     aCir[aCir.length-1].src = 'img/cart/red-circle.png';
//                 }else{
//                     aCir[aCir.length-1].src = 'img/cart/circle.png';
//                 }
//                 if(!this.bOn){
//                     //console.log(parseInt(aPri[this.index-1].innerHTML));
//                     //console.log(aNum[this.index-1].innerHTML);
//                     sum += parseInt(aPri[this.index-1].innerHTML)*aNum[this.index-1].innerHTML;
//                     oMoney.innerHTML =  '¥' + sum;
//                     //console.log(sum);
//                     //console.log(oMoney);
//                     //oMount.innerHTML =
//                 }
//             });
//         }
//         var bOn1 = true;
//         $('.circle').eq($('.circle').length-1).click(function(){
//             if(bOn1){
//                 for(var i=0;i<$('.circle').length;i++){
//                     $('.circle').eq(i)[0].src = 'img/cart/red-circle.png';
//                 }
//                 bOn1 = !bOn1;
//             }else{
//                 for(var i=0;i<$('.circle').length;i++){
//                     $('.circle').eq(i)[0].src = 'img/cart/circle.png';
//                 }
//                 bOn1 = !bOn1;
//             }
//         });
//
//         var aNum = document.getElementsByClassName('number');
//         var aAdd = document.getElementsByClassName('add');
//         var aRed = document.getElementsByClassName('reduce');
//         (function(){
//             for(var i=0;i<aAdd.length;i++){
//                 aAdd[i].index=i;
//                 aAdd[i].cnt=1;
//                 aAdd[i].addEventListener('click',function(){
//                     if(aNum[this.index].innerHTML>0) {
//                         aNum[this.index].innerHTML =  this.cnt++;
//                     }
//                 });
//             }
//             for(var j=0;j<aRed.length;j++){
//                 aRed[j].index=j;
//                 aRed[j].addEventListener('click',function(){
//                     if(aNum[this.index].innerHTML>1) {
//                         var cnt = aNum[this.index].innerHTML;
//                         aNum[this.index].innerHTML = --cnt;
//                     }
//                 });
//             }
//         })();
//
//
//     }
//
//     ,
//     error: function(){
//
//     }
// });
