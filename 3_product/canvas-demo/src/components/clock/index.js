/**
 * Created by Tiny on 2018/3/2.
 */
import './index.scss';                   //引入sass文件
function index(){
    $(function(){
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        var canvasWidth = 200;
        var canvasHeight = 200;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        var r = canvasWidth / 2;
        ctx.translate(r,r);         //重新映射画布上的（0,0）位置，这里将（0,0）位置移动到（r,r)位置

        function drawCircle(radius){
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.arc(0, 0, radius - ctx.lineWidth /2, 0, 2 * Math.PI, false);       //因为起始位置已经移动，所以圆心是0,0
            ctx.stroke();
        }
        function drawNumber(radius){
            var num = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
            var x = 0;      //坐标X
            var y = 0;      //坐标Y
            var rad = 0;        //弧度
            ctx.font = '18px';      //设置字体大小
            ctx.textAlign = 'center';       //设置文本内容的当前对齐方式
            ctx.textBaseline = 'middle';        //设置绘制文本时使用的当前文本基线
            num.forEach(function(number, i){
                rad = 2 * Math.PI / 12 * i;     //当前数字的弧度，3点是0
                x = Math.cos(rad) * (radius - 30);      //当前数字所在的坐标X
                y = Math.sin(rad) * (radius - 30);      //当前数字所在的坐标Y
                ctx.fillText(number, x, y, 30);     //写文字
            })
            //画数字后面的点
            for(var i=0; i<=60; i++){
                rad = 2 * Math.PI / 60 * i;     //60个点
                x = Math.cos(rad) * (radius - 18);      //当前点所在的坐标X
                y = Math.sin(rad) * (radius - 18);      //当前点所在的坐标Y
                ctx.beginPath();
                if(i % 5 === 0){
                    ctx.fillStyle = '#000000';
                }else{
                    ctx.fillStyle = '#cccccc';
                }
                ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
                ctx.fill();
            }
        }

        function init(){
            drawCircle(r);
            drawNumber(r);
        }
        init();
    })

    return {
        name: 'index',
        //tpl: tpl
    }
}

export default index;
