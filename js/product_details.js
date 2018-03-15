$('.reduce').click(function(){
    if($('.number').html()>1){
        $('.number')[0].innerHTML --;
    }
});
$('.add').click(function(){
    $('.number')[0].innerHTML ++;
});

$('.account').click(function(){
    $('.hide').css({'display':'block'});
    $('.black').css({'display':'block'});
    $('.hide').animate({bottom: 0});
});
$('.goods-count').click(function(){
    $('.hide').css({'display':'block'});
    $('.black').css({'display':'block'});
    $('.hide').animate({bottom: 0});
});
$('.fault').click(function(){
    $('.black').css({'display':'none'});
    $('.hide').animate({bottom: -7.4+'rem'});
});
$('.black').click(function(){;
    $('.black').css({'display':'none'});
    $('.hide').animate({bottom: -7.4+'rem'});
});