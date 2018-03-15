var oBtn=document.getElementsByClassName('send');
var oText=document.getElementsByClassName('text');
var oUl=document.getElementById('view');
oBtn.onclick=function(){
    if(oText.value==''){
        alert('输入内容不能为空');
    }
    else{
        oUl.innerHTML+='<li><div>'+oText.value+'</div></li>';
    }
    oText.value='';
}
