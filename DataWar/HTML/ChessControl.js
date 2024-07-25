var node_temp,pso_stack;
var lastPointerX,lastPointerY;
var flag_view="free"
var obj_keystate=[];
var flag_moved=false;//在拖拽模式下有没有移动，如果没移动则等同于click
var point0,point;//拖拽时点下的第一个点

function InitMouse()
{
    canvas.addEventListener("blur",function(evt){//监听失去焦点
        releaseKeyStateOut();
    })
    canvas.addEventListener("focus",function(evt){//改为监听获得焦点，因为调试失去焦点时事件的先后顺序不好说
        releaseKeyStateIn();
    })

    canvas.addEventListener("click", function(evt) {//这个监听也会在点击GUI按钮时触发！！
        onMouseClick(evt);//
    }, false);
    canvas.addEventListener("dblclick", function(evt) {//是否要用到鼠标双击？？
        onMouseDblClick(evt);//
    }, false);
    scene.onPointerMove=onMouseMove;
    scene.onPointerDown=onMouseDown;
    scene.onPointerUp=onMouseUp;

    window.addEventListener("keydown", onKeyDown, false);//按键按下
    window.addEventListener("keyup", onKeyUp, false);//按键抬起
    window.onmousewheel=onMouseWheel;
    window.addEventListener("resize", function () {
        if (engine) {
            engine.resize();
            //调整窗口大小后，重新计算正交相机比例
            //requestAnimationFrame(function(){
                // var sizex=engine._gl.drawingBufferWidth;
                // var sizey=engine._gl.drawingBufferHeight;
                // rate_window=sizex/sizey;
                // //camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
                // camera.orthoLeft = 0-100*rate_window;
                // camera.orthoRight = 0+100*rate_window;
                // camera.orthoTop =  0+100;
                // camera.orthoBottom = 0-100;
            //})
        }
    },false);
    document.oncontextmenu = function(evt){
        //点击右键后要执行的代码
        onContextMenu(evt);
        return false;//阻止浏览器的默认弹窗行为
    }


    node_temp=new BABYLON.TransformNode("node_temp",scene);//用来提取相机的姿态矩阵
    node_temp.rotation=camera0.rotation;

    pso_stack=camera0.position.clone();
}

function releaseKeyStateOut()
{
    for(var key in obj_keystate)
    {
        obj_keystate[key]=0;
    }
}
function releaseKeyStateIn(evt)
{
    for(var key in obj_keystate)
    {
        obj_keystate[key]=0;
    }
    lastPointerX=scene.pointerX;
    lastPointerY=scene.pointerY;

}
function onMouseClick(evt)
{
    // if(flag_view=="locked") {
    //     //ThrowSomeBall();
    //     var pickInfo = scene.pick(scene.pointerX, scene.pointerY, null, false, camera0);
    // }
}
function onMouseDblClick(evt)
{
    //var pickInfo = scene.pick(scene.pointerX, scene.pointerY, null, false, camera0);
}
function onMouseMove(evt)
{

}
function onMouseDown(evt)
{

}
function onMouseUp(evt)
{

}
function onKeyDown(event)
{
    event.preventDefault();
    var key = event.key;
    obj_keystate[key] = 1;
    if(obj_keystate["Shift"]==1)
    {
        obj_keystate[key.toLowerCase()] = 1;
    }
}
function onKeyUp(event)
{
    event.preventDefault();
    var key = event.key;

    obj_keystate[key] = 0;
    if(obj_keystate["Shift"]==1)
    {
        obj_keystate[key.toLowerCase()] = 0;
    }
    if(key=="v")
    {
        if(switchText)
        {
            switchText();
        }
    }
}
function onMouseWheel(event){
    var delta =event.wheelDelta/120;
}
function onContextMenu(evt)
{

}
