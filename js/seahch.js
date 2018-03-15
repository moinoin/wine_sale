var oSear =document.getElementById('sear');
//显示模糊搜索
function showTips(){
    $('.history')[0].style.display = 'none';
    $('#tips')[0].style.display='block';
    $('.list')[0].style.display='none';
};
//显示商品列表
function showList(){
    $('.history')[0].style.display = 'none';
    $('#tips')[0].style.display='none';
    $('.list')[0].style.display='block';
};
//显示历史记录
showHistory();
function showHistory(){
    $('.history')[0].style.display='block';
    $('#tips')[0].style.display='none';
    $('.list')[0].style.display='none';
    showHistoryList();
}
//返回设置
$('.back')[0].onclick = function(){
    if($('.list')[0].style.display === 'block'){
        $('.history')[0].style.display = 'none';
        $('#tips')[0].style.display='block';
        $('.list')[0].style.display='none';
    }else if($('#tips')[0].style.display==='block'){
        $('.history')[0].style.display = 'block';
        $('#tips')[0].style.display='none';
        $('.list')[0].style.display='none';
        showHistoryList();
    }else if($('.history')[0].style.display = 'block'){
        var att=document.createAttribute('href');
        att.value='./index.html';
        $('a')[0].setAttributeNode(att);
    }
};
//输入框文字改变时，显示提示列表
$('#sear').on('input active',function(){
    if(oSear.value!==''){
        showTips();
        $.ajax({
            method: 'post',
            url: 'http://wxredwine.top:8080/search/searchString',
            contentType: 'application/json',
            data:'{"key":"'+oSear.value+'"}',
            success: function (data) {
                console.log(data);
                //模糊匹配
                var aTipList = document.getElementById('tips');
                for(var i=0;i<data.length;i++){
                    aTipList.innerHTML +='<li>'+data[i]+'</li>';
                };
                //点击其中一个提示，内容复制到搜索框并跳转至相关商品列表
                $('#tips li').click(function(){
                    oSear.value = $(this).html();
                    Goodslist();
                });
            },
            error:function(){

            },
        });
    }else{
        showHistory();
    }
});
//清空搜索框 显示历史记录
// $('.header span')[0].onclick = function(){
//     oSear.value='';
//     showHistory();
// };
//显示商品列表
function Goodslist() {
    showList();
    $.ajax({
        method: 'post',
        url: 'http://wxredwine.top:8080/search/searchWine',
        contentType: 'application/json',
        data: '{"currentPage":"1","key":"oSear.value "}',
        success: function (data) {
            console.log(data);
            //cookie存储历史记录
            var sValue=oSear.value;
            sHistoryList =sHistoryList +sValue+',';
            setCookie('history',sHistoryList,1);
            var res =data;
            for (var i = 0; i < res.length; i++) {
                var goodsList = '<a id="details"><div class="container">\n' +
                    '<div style="width: 3.25rem; height:2.3rem;overflow: hidden;float: left;text-align: center;line-height:2.3rem; ">' + '\n ' +
                    '<img class="image" src="" style="width: 48%"> ' + '</img>\n' +
                    '</div>'+'\n' +
                    '<div class="right">' +
                    '<p class="name" style="color:darkred;">' + '</p>' +
                    '<p class="price" style="color:darkred;">' + '</p>' +
                    '<p class="capacity" style="color:darkred;">' + '</p>' +
                    '<p class="score" style="color:darkred;">' + '</p>' +
                    '</div>' +
                    '</div></a>';

            };
            $('.list').html(goodsList);
            for(var i=0;i<res.length;i++){
                for (var attr in res[i]) {
                    //console.log(res[i][attr]);
                    if (attr === 'winImg') {
                        $('.image').eq(i)[0].src = res[i][attr];
                    }else if (attr === 'winName') {
                        //console.log(res[i][attr]);
                        $('.name').eq(i).html(res[i][attr]);
                    }else if (attr === 'winPrice') {
                        $('.price').eq(i).html('价格：' + res[i][attr]);
                    }else if (attr === 'wineCapacity') {
                        $('.capacity').eq(i).html('库存量：' + res[i][attr]);
                    }else if (attr === 'wineScore') {
                        $('.score').eq(i).html('评分：' + res[i][attr]);
                    }
                }
            }
            //点击某一商品跳转到该商品详情页
            $('.container').each(function(i){
                $('.container').eq(i)[0].onclick = function () {
                    console.log(res[$(this).index()].winId);
                    var id= res[$(this).index()].winId;
                    var gotopage = './product_details.html'+'?'+'id';
                    var attr=document.createAttribute('href');
                    attr.value= 'gotopage';
                    $('#details')[0].setAttributeNode(attr);
                };
            });

        },
        error: function () {

        }
    });
};

//封装cookie
function setCookie(key,value,days){
    var oDate = new Date();
    oDate.setDate(oDate.getDate()+(days*24*60*60*1000));
    var expires = 'expires=' +oDate.toUTCString();
    document.cookie = key+'='+value+';'+expires;
}
function getCookie(key){
    var arr1 = document.cookie.split(';');
    for(var i=0;i<arr1.length;i++){
        var arr2 = arr1[i].split('=');
        if(arr2[0]===key){
            return decodeURI(arr2[1]);
        }
    }
}
//点击搜索显示相关商品列表,cookie存下搜索历史
$('#btn')[0].onclick = function(){
    if(oSear.value ===''){
        showHistory();
    }else if(oSear.value !==''){
        Goodslist;
        getHistory();//获取历史记录
    };
};


//显示历史记录页面
function showHistoryList(){
    getHistory();
    if(arrHistory.length!==0){
        if(arrHistory.length<=6){
            for(var i=0;i<6;i++){
                $('#history')[0].innerHTML += '<li>'+'\n'+
                    '<span class="text">'+arrHistory[i]+ '</span>'+'\n'+
                    '<span class="del">'+'x'+'</span>'+ '\n'+
                    '</li>';
            }
        }else if(arrHistory.length>6){
            for(var j=0;j<5;j++){

            }
        }
    }
    //删除历史记录
    $('.del').click(function(){
        //页面删除
        $(this)[0].parentNode.remove();
        //cookie删除
        arrHistory.splice(i,1); //删除   i表示删除起始位置  1表示删除数量
        return false;
    });
    //点击历史记录,其值写进搜索框，并进行搜索
    $('#history li .text').click(function(){
        oSear.value =$(this).html();
        Goodslist();
        getHistory();
    });
}

//获取cookie历史记录
var sHistoryList = getCookie('history');
var arrHistory=[];
function getHistory(){
    arrHistory = decodeURI(sHistoryList).split(',');  //把字符串转化成数组
    arrHistory.reverse();
    //重复的历史记录去重，并将此记录移至首位
    for(var j=0;j<arrHistory.length;j++){
        for(var k=j+1;k<arrHistory.length;k++){
            if(arrHistory[k]===arrHistory[j]){
                arrHistory.splice(k,1);
                k--;
            }
        }
    }
    arrHistory.shift();
    if(arrHistory.length>=6){
        arrHistory.splice(5,k-6);
    }
    return arrHistory;
}

//页面删除全部历史记录
$('#rubby')[0].onclick = function(){
    if(confirm('确认删除历史搜索')){
        $('#History')[0].childNodes.remove();
    }
};







