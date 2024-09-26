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
        onMouseDblClick(evt);//用鼠标双击选取地块可以避免拖动屏幕时误触地块，以实现更精细的视角控制
        // ，但简单的地块属性编辑似乎用不到这样的精细控制，所以还是使用单击更为简单
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
var grid_current;
function onMouseDown(evt)//也许它相对于onMouseClick，对触屏的支持更好？
{
    if(div_right)//暂时不进行控制模式的限制
    {
        evt.preventDefault();
        if(evt.button==2)//左键选取
        {
            //下面的是锁定鼠标状态的检测射线！！！！
            //var v_pick=camera0.node_pick.position.clone();
            //var m_view=camera0.getWorldMatrix();
            //var v_pick2=BABYLON.Vector3.TransformCoordinates(v_pick,m_view);
            //var ray =BABYLON.Ray.CreateNewFromTo(camera0.position,v_pick2);//用射线进行碰撞检测，生成的射线将只包含这两个顶点之间的线段
            //var pickInfo=scene.pickWithRay(ray,(mesh)=>(mesh.myType0=="myGrid"));//此时只编辑地图，还没有棋子
            var pickInfo = scene.pick(scene.pointerX, scene.pointerY, (mesh)=>(mesh.myType0=="myGrid"), false, camera0);
            var mesh=pickInfo.pickedMesh;
            var distance=pickInfo.distance;
            if(mesh&&distance<1000){
                //选取地块后在右侧显示地块的属性，并编辑
                if(grid_current&&grid_current.name!=mesh.name)
                {

                    div_right.innerHTML="";

                }
                if(!grid_current||grid_current.name!=mesh.name)
                {
                    grid_current=mesh;
                    var myData=mesh.myData;
                    var p=document.createElement("p");
                    p.innerText=mesh.name;
                    div_right.appendChild(p);
                    //var br=document.createElement("br");
                    //div_right.appendChild(br);

                    var p=document.createElement("p");
                    p.innerText="山地";
                    div_right.appendChild(p);
                    //var br=document.createElement("br");
                    //div_right.appendChild(br);
                    var input=document.createElement("input");
                    input.type="checkbox";
                    input.checked=myData.mountain;//初始值
                    input.onchange=function(e){
                        myData.mountain=e.target.checked;//value;//这个事件响应里要处理地块的值的变化，要修改地块的显示样式，最终通过arr_grids和ij计算导出数组
                        initAttachment(mesh);
                    }
                    div_right.appendChild(input);
                    var br=document.createElement("br");
                    div_right.appendChild(br);

                    var p=document.createElement("p");
                    p.innerText="河流";
                    div_right.appendChild(p);
                    var input=document.createElement("input");
                    input.type="checkbox";
                    input.checked=myData.river[0];
                    input.onchange=function(e){
                        myData.river[0]=e.target.checked;//
                        initAttachment(mesh);
                    }
                    div_right.appendChild(input);
                    var input=document.createElement("input");
                    input.type="checkbox";
                    input.checked=myData.river[1];
                    input.onchange=function(e){
                        myData.river[1]=e.target.checked;//
                        initAttachment(mesh);
                    }
                    div_right.appendChild(input);
                    var input=document.createElement("input");
                    input.type="checkbox";
                    input.checked=myData.river[2];
                    input.onchange=function(e){
                        myData.river[2]=e.target.checked;//
                        initAttachment(mesh);
                    }
                    div_right.appendChild(input);
                    var br=document.createElement("br");
                    div_right.appendChild(br);
                    var input=document.createElement("input");
                    input.type="checkbox";
                    input.checked=myData.river[5];
                    input.onchange=function(e){
                        myData.river[5]=e.target.checked;//
                        initAttachment(mesh);
                    }
                    div_right.appendChild(input);
                    var input=document.createElement("input");
                    input.type="checkbox";
                    input.checked=myData.river[4];
                    input.onchange=function(e){
                        myData.river[4]=e.target.checked;//
                        initAttachment(mesh);
                    }
                    div_right.appendChild(input);
                    var input=document.createElement("input");
                    input.type="checkbox";
                    input.checked=myData.river[3];
                    input.onchange=function(e){
                        myData.river[3]=e.target.checked;//
                        initAttachment(mesh);
                    }
                    div_right.appendChild(input);
                    var br=document.createElement("br");
                    div_right.appendChild(br);

                    var p=document.createElement("p");
                    p.innerText="铁路";
                    div_right.appendChild(p);
                    var input=document.createElement("input");
                    input.type="checkbox";
                    input.checked=myData.railway[0];
                    input.onchange=function(e){
                        myData.railway[0]=e.target.checked;//
                        initAttachment(mesh);
                    }
                    div_right.appendChild(input);
                    var input=document.createElement("input");
                    input.type="checkbox";
                    input.checked=myData.railway[1];
                    input.onchange=function(e){
                        myData.railway[1]=e.target.checked;//
                        initAttachment(mesh);
                    }
                    div_right.appendChild(input);
                    var input=document.createElement("input");
                    input.type="checkbox";
                    input.checked=myData.railway[2];
                    input.onchange=function(e){
                        myData.railway[2]=e.target.checked;//
                        initAttachment(mesh);
                    }
                    div_right.appendChild(input);
                    var br=document.createElement("br");
                    div_right.appendChild(br);
                    var input=document.createElement("input");
                    input.type="checkbox";
                    input.checked=myData.railway[5];
                    input.onchange=function(e){
                        myData.railway[5]=e.target.checked;//
                        initAttachment(mesh);
                    }
                    div_right.appendChild(input);
                    var input=document.createElement("input");
                    input.type="checkbox";
                    input.checked=myData.railway[4];
                    input.onchange=function(e){
                        myData.railway[4]=e.target.checked;//
                        initAttachment(mesh);
                    }
                    div_right.appendChild(input);
                    var input=document.createElement("input");
                    input.type="checkbox";
                    input.checked=myData.railway[3];
                    input.onchange=function(e){
                        myData.railway[3]=e.target.checked;//
                        initAttachment(mesh);
                    }
                    div_right.appendChild(input);
                    var br=document.createElement("br");
                    div_right.appendChild(br);

                    var p=document.createElement("p");
                    p.innerText="地形";
                    div_right.appendChild(p);
                    for(var key in map_landtype)
                    {
                        var landtype=map_landtype[key];
                        var input=document.createElement("input");
                        input.type="radio";
                        input.name="map_landtype";
                        input.id=key;
                        var str_color="rgb("+landtype.color.r+","+landtype.color.g+","+landtype.color.b+")";
                        input.style.accentColor=str_color;
                        input.style.borderColor=str_color;
                        //input.style.backgroundColor=str_color;
                        //input.style.color=str_color;
                        if(key==myData.type)
                        {
                            input.checked=true;
                        }
                        input.onchange=function(e){
                            myData.type=e.target.id;
                            var type=myData.type;
                            if(flag_mattype==1)//如果原来是显示纹理的
                            {
                                var obj_grid=map_gridclass[type].mesh.createInstance(mesh.name);
                                obj_grid.myType0="myGrid";
                                obj_grid.myData=mesh.myData;
                                var pos=mesh.position;
                                obj_grid.position.x=pos.x;
                                obj_grid.position.z=pos.z;
                                obj_grid.position.y=pos.y;
                                initAttachment(obj_grid);
                                mesh.dispose();
                                arr_grids.splice(obj_grid.myData.index,1,obj_grid);

                            }
                            else
                            {
                                var obj_grid=map_gridclass2[type].mesh.createInstance(mesh.name);
                                obj_grid.myType0="myGrid";
                                obj_grid.myData=mesh.myData;
                                var pos=mesh.position;
                                obj_grid.position.x=pos.x;
                                obj_grid.position.z=pos.z;
                                obj_grid.position.y=pos.y;
                                initAttachment(obj_grid);
                                mesh.dispose();
                                arr_grids.splice(obj_grid.myData.index,1,obj_grid);
                            }
                        }

                        div_right.appendChild(input);
                    }

                }
            }
        }
    }
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
    else if(key=="b")
    {
        if(switchGridMat)
        {
            switchGridMat();
        }
    }
}
function onMouseWheel(event){
    var delta =event.wheelDelta/120;
}
function onContextMenu(evt)
{

}
