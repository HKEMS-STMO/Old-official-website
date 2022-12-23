for(var i=1;i<17;i++){
    $('section').append('<div></div>');
    
}
$('section div').append("<img class='hole' src='image/hole.png'  >");
$('section div').append('<img class="mouse" src="image/mouse.png">');

// 设置初始状态千学都没出现

 $('.mouse').hide();

//千学出现
                   // [1,4] [0, 3)
// 随机出现的千学数目 [1 16]  (0, 15]  向上取整
var num
// 
//千学位置[0  15]  索引 index
 var index
 var object;
setInterval(function(){
    num=Math.ceil(Math.random()*2);
    for(var i=1; i<=num ;i++){
        //随机出现的千学位置[0  15]  索引
       index=Math.floor(Math.random()*16);
      object=$('section div:nth-of-type('+(index+1)+') .mouse')
   
      object.slideDown();
      object.delay(2000).slideUp();
    }
    
},2000);


// score 记录敲到千学的分数
var score=0;
$('.mouse').click(function(){
   
    $(this).hide();
    score+=1;
    $(" <span id='count'>得分 为"+score+"</span>").replaceAll('span');
    $('#dazhong').append('<audio src="audio/dazhong.mp3" autoplay="autoplay" ></audio>');
    setTimeout(function(){
        $('#dazhong').empty();
    },2000);
});
