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
        var rem = canvasWidth / 200;            //缩放比例

        function drawCircle(radius){
            ctx.save();
            ctx.translate(r,r);         //重新映射画布上的（0,0）位置，这里将（0,0）位置移动到（r,r)位置
            ctx.lineWidth = 10 * rem;
            ctx.beginPath();
            ctx.arc(0, 0, radius - ctx.lineWidth / 2, 0, 2 * Math.PI, false);       //因为起始位置已经移动，所以圆心是0,0
            ctx.stroke();
        }
        function drawNumber(radius){
            var num = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
            var x = 0;      //坐标X
            var y = 0;      //坐标Y
            var rad = 0;        //弧度
            ctx.font = 18 * rem + 'px';      //设置字体大小
            ctx.textAlign = 'center';       //设置文本内容的当前对齐方式
            ctx.textBaseline = 'middle';        //设置绘制文本时使用的当前文本基线
            num.forEach(function(number, i){
                rad = 2 * Math.PI / 12 * i;     //当前数字的弧度，3点是0
                x = Math.cos(rad) * (radius - 30 * rem);      //当前数字所在的坐标X
                y = Math.sin(rad) * (radius - 30 * rem);      //当前数字所在的坐标Y
                ctx.fillText(number, x, y, 30);     //写文字
            })
            //画数字后面的点
            for(var i=0; i<=60; i++){
                rad = 2 * Math.PI / 60 * i;     //60个点
                x = Math.cos(rad) * (radius - 18 * rem);      //当前点所在的坐标X
                y = Math.sin(rad) * (radius - 18 * rem);      //当前点所在的坐标Y
                ctx.beginPath();
                if(i % 5 === 0){
                    ctx.fillStyle = '#000000';
                }else{
                    ctx.fillStyle = '#cccccc';
                }
                ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
                ctx.fill();
            }
        }
        function drawHour(hour, minute){
            ctx.save();     //保存当前环境状态
            ctx.beginPath();
            var rad = 2 * Math.PI / 12 * hour;      //旋转的弧度，根据参数计算
            var mrad = 2 * Math.PI / 12 / 60 * minute;      //旋转的弧度，根据参数计算分钟数引起的时针弧度
            ctx.rotate(rad + mrad);
            ctx.lineWidth = 6;          //设置线的宽度
            ctx.lineCap = 'round';      //设置线的结束端点样式
            ctx.moveTo(0, 10);          //移动到初始位置
            ctx.lineTo(0, -r / 2 - rem);      //移动到目标位置
            ctx.stroke();               //画线
            ctx.restore();      //返回之前保存过的路径状态和属性
        }
        function drawMinute(minute){
            ctx.save();     //保存当前环境状态
            ctx.beginPath();
            var rad = 2 * Math.PI / 60 * minute;      //旋转的弧度，根据参数计算
            ctx.rotate(rad);
            ctx.lineWidth = 3;          //设置线的宽度
            ctx.lineCap = 'round';      //设置线的结束端点样式
            ctx.moveTo(0, 10);          //移动到初始位置
            ctx.lineTo(0, -r / 2 - 20 * rem);      //移动到目标位置
            ctx.stroke();               //画线
            ctx.restore();      //返回之前保存过的路径状态和属性
        }
        function drawSecond(second){
            ctx.save();     //保存当前环境状态
            ctx.beginPath();
            ctx.fillStyle = '#c14543';
            var rad = 2 * Math.PI / 60 * second;      //旋转的弧度，根据参数计算
            ctx.rotate(rad);
            ctx.moveTo(-2, 20);          //移动到初始位置
            ctx.lineTo(2, 20);      //移动到目标位置
            ctx.lineTo(1, -r / 2 - 30 * rem);      //移动到目标位置
            ctx.lineTo(-1, -r / 2 - 30 * rem);      //移动到目标位置
            ctx.fill();               //画线
            ctx.restore();      //返回之前保存过的路径状态和属性
        }
        function drawDot(){
            ctx.save();     //保存当前环境状态
            ctx.beginPath();
            ctx.fillStyle = '#ffffff';
            ctx.arc(0, 0, 2 * rem, 0, Math.PI * 2, false);
            ctx.fill();               //画线
            ctx.restore();      //返回之前保存过的路径状态和属性
        }

        function init(){
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            var now = new Date();
            var hour = now.getHours();
            var minute = now.getMinutes();
            var second = now.getSeconds();
            drawCircle(r);
            drawNumber(r);
            drawHour(hour,minute);
            drawMinute(minute);
            drawSecond(second);
            drawDot();
            ctx.restore();
        }
        init();
        setInterval(init,1000)
    })

    return {
        name: 'index',
        //tpl: tpl
    }
}

export default index;
