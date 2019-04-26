var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
// 用户touchstart或mousedown 的起始位置
var startPosition = {x:undefined,y:undefined};
var isPressDown = false;
// 画笔
var brush = document.getElementById('brush');
// 橡皮擦
var eraser = document.getElementById('eraser');
// 全屏清除
var clear = document.getElementById('clear');
// 保存canvas 图片
var save = document.getElementById('save');
// 是否使用了橡皮擦
var isEraser = false;
// 画笔颜色
var brushColor = 'black';
var black = document.getElementById('black');
var red = document.getElementById('red');
var blue = document.getElementById('blue');
var green = document.getElementById('green');
var yellow = document.getElementById('yellow');
// 画笔粗细
var brushWidth = 4;
var lw1 = document.getElementById('lw1');
var lw2 = document.getElementById('lw2');
var lw3 = document.getElementById('lw3');
var lw4 = document.getElementById('lw4');
initCanvasSize();
// 监听用户，如果用户重新改变了窗口的宽高，则重新初始化画布的大小
window.onresize = function () {
    initCanvasSize();
}
listenToUser();
// 画笔点击
brush.onclick = function () {
    isEraser = false;
    brush.classList.add('active');
    eraser.classList.remove('active');
}
// 画笔颜色点击
black.onclick = function(){
    black.classList.add('active');
    red.classList.remove('active');
    blue.classList.remove('active');
    green.classList.remove('active');
    yellow.classList.remove('active');
    brushColor = 'black';
}
red.onclick = function(){
    red.classList.add('active');
    black.classList.remove('active');
    blue.classList.remove('active');
    green.classList.remove('active');
    yellow.classList.remove('active');
    brushColor = 'red';
}
blue.onclick = function(){
    blue.classList.add('active');
    red.classList.remove('active');
    black.classList.remove('active');
    green.classList.remove('active');
    yellow.classList.remove('active');
    brushColor = 'blue';
}
green.onclick = function(){
    green.classList.add('active');
    red.classList.remove('active');
    blue.classList.remove('active');
    black.classList.remove('active');
    yellow.classList.remove('active');
    brushColor = 'green';
}
yellow.onclick = function(){
    yellow.classList.add('active');
    red.classList.remove('active');
    blue.classList.remove('active');
    green.classList.remove('active');
    black.classList.remove('active');
    brushColor = 'yellow';
}
// 画笔粗细点击
lw1.onclick = function(){
    lw1.classList.add('active');
    lw2.classList.remove('active');
    lw3.classList.remove('active');
    lw4.classList.remove('active');
    brushWidth = 4;
}
lw2.onclick = function(){
    lw2.classList.add('active');
    lw1.classList.remove('active');
    lw3.classList.remove('active');
    lw4.classList.remove('active');
    brushWidth = 6;
}
lw3.onclick = function(){
    lw3.classList.add('active');
    lw2.classList.remove('active');
    lw1.classList.remove('active');
    lw4.classList.remove('active');
    brushWidth = 8;
}
lw4.onclick = function(){
    lw4.classList.add('active');
    lw2.classList.remove('active');
    lw3.classList.remove('active');
    lw1.classList.remove('active');
    brushWidth = 10;
}
// 橡皮擦点击
eraser.onclick = function () {
    isEraser = true;
    eraser.classList.add('active');
    brush.classList.remove('active');
}
// 全屏清除点击
clear.onclick = function () {
    context.beginPath();
    context.clearRect(0,0,canvas.width,canvas.height);
    context.fill();
    context.closePath();
}
// 保存
save.onclick = function () {
    var url = canvas.toDataURL('image/png');
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = 'CanvasImage';
    a.target = '_blank';
    a.click();
}
// 监听用户
function listenToUser() {
    // 特性检测
    if(document.body.ontouchstart!==undefined){
        // 如果ontouchstart!==undefined,说明用户是触屏设备
        // 监听用户的touchstart事件
        canvas.ontouchstart = function (touchStart) {
            isPressDown = true;
            var x = touchStart.touches[0].clientX;
            var y = touchStart.touches[0].clientY;
            if(isEraser){
                erase(x,y);
            }else{
                startPosition.x = x;
                startPosition.y = y;
                drawCircle(x,y,brushWidth/2.2,brushColor);
            }
        }
        // 监听用户的touchmove事件
        canvas.ontouchmove = function (touchMove) {
            if(isPressDown){
                var x = touchMove.touches[0].clientX;
                var y = touchMove.touches[0].clientY;
                if(isEraser){
                    erase(x,y);
                }else{
                    drawCircle(x,y,brushWidth/2.2,brushColor);
                    drawLine(startPosition.x,startPosition.y,x,y,brushColor,brushWidth);
                    startPosition.x = x;
                    startPosition.y = y;
                }
            }
        }
        // 监听用户的touchend事件
        canvas.ontouchend = function () {
            isPressDown = false;
        }
    }else{
        // 用户是PC设备
        // 监听用户的onmousedown事件
        canvas.onmousedown = function (mouseDown) {
            isPressDown = true;
            var x = mouseDown.clientX;
            var y  = mouseDown.clientY;
            if(isEraser){
                erase(x,y);
            }else{
                startPosition.x = x;
                startPosition.y = y;
                drawCircle(x,y,brushWidth/2.2,brushColor);
            }
        }
        // 监听用户的onmousemove事件
        canvas.onmousemove = function (mouseMove) {
            if(isPressDown){
                var x = mouseMove.clientX;
                var y = mouseMove.clientY;
                if(isEraser){
                    erase(x,y);
                }else{
                    drawCircle(x,y,brushWidth/2.2,brushColor);
                    drawLine(startPosition.x,startPosition.y,x,y,brushColor,brushWidth);
                    startPosition.x = x;
                    startPosition.y = y;
                }
            }
        }
        // 监听用户的onmouseup事件
        canvas.onmouseup = function () {
            isPressDown = false;
        }
    }
}
// 初始化canvas画布的大小
function initCanvasSize() {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
}
// 用canvas画一个圆
function drawCircle(x,y,radius,color) {
    context.beginPath();
    context.fillStyle = color;
    context.arc(x,y,radius,0,Math.PI*2);
    context.fill();
    context.closePath();
}
// 用canvas画一条线
function drawLine(startX,startY,endX,endY,color,lineWidth) {
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.moveTo(startX,startY);
    context.lineTo(endX,endY);
    context.stroke();
    context.closePath();
}
// 使用eraser擦除
function erase(x,y) {
    context.beginPath();
    context.clearRect(x-15,y-15,30,30);
    context.fill();
    context.closePath();
}