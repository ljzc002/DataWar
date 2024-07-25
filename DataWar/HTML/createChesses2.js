var size_chess=3,size_chess_r=0.4,size_chess2=0.2;//单个算子的半径，圆角半径，算子之间的缝隙
var part_chessx=20,part_chessy=20;
var map_chessclass={},mcc={red:{},blue:{}};
var can_temp_chess=document.createElement("canvas");
can_temp_chess.width=128;
can_temp_chess.height=128;
var c_temp_chess=can_temp_chess.getContext("2d");
var count_chess=0;

function createChesses()//生成用于平面编辑和打印的算子阵列
{
    var arr_chess=[]
    var class_chess=createChessClass("bubing",map_mat.mat_yellow2,"red","rgb(252,225,170)","XXX","4-6-6","");
    //class_chess.position.x=187.5;
    class_chess.position.y=-100;
    map_chessclass.bubing1={mesh:class_chess};
    class_chess.position.z=200;
    for(var i=0;i<10;i++)
    {
        arr_chess.push(class_chess.createInstance("chess_"+arr_chess.length));
    }

    var class_chess=createChessClass("bubing",map_mat.mat_yellow2,"red","rgb(252,225,170)","XXX","1-3-3","militia");
    class_chess.position.x+=20;
    class_chess.position.y=-100;
    map_chessclass.bubing2={mesh:class_chess};
    class_chess.position.z=200;
    for(var i=0;i<10;i++)
    {
        arr_chess.push(class_chess.createInstance("chess_"+arr_chess.length));
    }

    var class_chess=createChessClass("zjbing",map_mat.mat_yellow2,"red","rgb(252,225,170)","XXX","5-3-6","");
    class_chess.position.x+=40;
    class_chess.position.y=-100;
    map_chessclass.zjbing1={mesh:class_chess};
    class_chess.position.z=200;
    for(var i=0;i<10;i++)
    {
        arr_chess.push(class_chess.createInstance("chess_"+arr_chess.length));
    }

    var class_chess=createChessClass("jxhbubing",map_mat.mat_red,"rgb(252,225,170)","red","XXX","3-7-9","");
    class_chess.position.x+=60;
    class_chess.position.y=-100;
    map_chessclass.jxhbubing1={mesh:class_chess};
    class_chess.position.z=200;
    for(var i=0;i<10;i++)
    {
        arr_chess.push(class_chess.createInstance("chess_"+arr_chess.length));
    }

    var class_chess=createChessClass("zjbing",map_mat.mat_red,"rgb(252,225,170)","red","XXX","7-4-9","");
    class_chess.position.x+=80;
    class_chess.position.y=-100;
    map_chessclass.zjbing2={mesh:class_chess};
    class_chess.position.z=200;
    for(var i=0;i<10;i++)
    {
        arr_chess.push(class_chess.createInstance("chess_"+arr_chess.length));
    }

    var class_chess=createChessClass("paobing",map_mat.mat_red,"rgb(252,225,170)","red","XXX","12-3-12","");
    class_chess.position.x+=100;
    class_chess.position.y=-100;
    map_chessclass.paobing1={mesh:class_chess};
    class_chess.position.z=200;
    for(var i=0;i<10;i++)
    {
        arr_chess.push(class_chess.createInstance("chess_"+arr_chess.length));
    }
    drawChess(arr_chess);

}
function drawChess(arr)
{
    var len=arr.length;
    var size=size_chess*2+size_chess2;
    for(var i=0;i<len;i++)
    {
        var row_y=Math.floor(i/part_chessx);//纵向行数
        var row_x=i%part_chessx;//横向列数
        if(row_y<part_mapy)//没有超出设计边界
        {
            var obj=arr[i];
            obj.position.y=0;
            obj.position.x=row_x*size;
            obj.position.z=-row_y*size;
        }
    }
}

function createChessClass(picname,mat,textcolor,basecolor,texttop,textbottom,textleft)
{
    var arr_path=[];
    arr_path.push(createPath3(4,size_chess,size_chess_r,0));
    arr_path.push(createPath3(4,size_chess,size_chess_r,0.5));//为算子设置厚度将影响打印效果！
    arr_path.push(createPath3(4,size_chess-size_chess_r+size_chess_r*Math.cos(Math.PI/6),size_chess_r*Math.cos(Math.PI/6),0.5+size_chess_r*Math.sin(Math.PI/6)));
    arr_path.push(createPath3(4,size_chess-size_chess_r+size_chess_r*Math.cos(Math.PI/3),size_chess_r*Math.cos(Math.PI/3),0.5+size_chess_r*Math.sin(Math.PI/3)));
    arr_path.push(createPath3(4,size_chess-size_chess_r+size_chess_r*Math.cos(Math.PI/2),size_chess_r*Math.cos(Math.PI/2),0.5+size_chess_r*Math.sin(Math.PI/2)));
    var mesh_ribbona=BABYLON.MeshBuilder.CreateRibbon("mesh_ribbon",{pathArray:arr_path,closePath:false,closeArray:false});
    mesh_ribbona.renderingGroupId = 1;
    mesh_ribbona.sideOrientation=BABYLON.Mesh.DOUBLESIDE;
    var mesh_plate1a=newland.pathtoplate(arr_path[0],"mesh_plate1",scene,1);//底
    mesh_plate1a.renderingGroupId = 1;
    var mesh_plate2a=newland.pathtoplate(arr_path[arr_path.length-1],"mesh_plate2",scene);//顶
    mesh_plate2a.renderingGroupId = 1;

    mesh_ribbona.material=mat;
    mesh_plate1a.material=mat;

    var c=c_temp_chess;
    c.fillStyle=basecolor;
    c.fillRect(0,0,128,128);
    c.lineWidth=2;
    c.strokeStyle=textcolor;
    if(picname=="bubing")
    {
        c.strokeRect(40,34,48,30);
        c.beginPath();
        c.moveTo(40,34);
        c.lineTo(88,64);
        c.moveTo(40,64);
        c.lineTo(88,34);
        c.closePath();
        c.stroke();
    }
    else if(picname=="zjbing")
    {
        c.strokeRect(40,34,48,30);
        c.beginPath();
        c.moveTo(52,43);
        c.lineTo(76,43);
        c.stroke();
        c.beginPath();
        //参数false表示从右侧开始顺时针绘制到这个弧度，true则表示逆时针绘制到这个位置（实际会绘制1.5PI！）
        c.arc(76,49,6,0,Math.PI/2,false);
        c.stroke();
        c.beginPath();
        c.arc(76,49,6,0,-Math.PI/2,true);//-0.5PI是上面
        c.stroke();
        c.beginPath();
        c.moveTo(76,55);
        c.lineTo(52,55);
        c.stroke();
        c.beginPath();
        c.arc(52,49,6,-Math.PI/2,Math.PI/2,true);
        c.stroke();
    }
    else if(picname=="jxhbubing")
    {
        c.strokeRect(40,34,48,30);
        c.beginPath();
        c.moveTo(40,34);
        c.lineTo(88,64);
        c.moveTo(40,64);
        c.lineTo(88,34);
        c.closePath();
        c.stroke();
        c.beginPath();
        c.moveTo(52,43);
        c.lineTo(76,43);
        c.arc(76,49,6,-Math.PI/2,Math.PI/2,false);
        c.moveTo(76,55);
        c.lineTo(52,55);
        c.arc(52,49,6,Math.PI/2,-Math.PI/2,false);
        c.stroke();
    }
    else if(picname=="paobing")
    {
        c.strokeRect(40,34,48,30);
        c.beginPath();
        c.arc(64,49,6,0,Math.PI*2,true);
        c.fillStyle=textcolor;
        c.fill();
    }
    c.fillStyle=textcolor;
    c.textAlign='center';
    c.font="20px sans-serif";
    c.fillText(texttop,64,25);
    c.font="34px sans-serif";
    c.fillText(textbottom,64,110);
    c.font="20px sans-serif";
    c.save();
    c.textAlign='left';
    c.translate(64,64);
    c.rotate(-Math.PI/2);
    c.fillText(textleft,0,-40);
    c.restore();

    var mat_picname=new BABYLON.StandardMaterial("mat_"+picname,scene);
    mat_picname.diffuseTexture = new BABYLON.Texture(can_temp_chess.toDataURL(), scene);
    mat_picname.backFaceCulling=false;
    mat_picname.useLogarithmicDepth = true;//正交相机不支持对数深度！！
    mat_picname.freeze();

    mesh_plate2a.material=mat_picname;
    var mesh_mergea=BABYLON.Mesh.MergeMeshes([mesh_ribbona, mesh_plate1a,mesh_plate2a], true, false, null, false, true);
    mesh_mergea.renderingGroupId = 2;
    return mesh_mergea;
}
function createPath2(part,r,y)
{
    var arr=[];
    for(var i=0;i<part;i++)
    {
        arr.push(new BABYLON.Vector3(Math.sin((Math.PI/(part/2))*i+Math.PI/part)*r,y,Math.cos((Math.PI/(part/2))*i+Math.PI/part)*r))
    }
    arr.push(arr[0].clone());
    return arr;
}
//圆分为几段(也作为圆角的段数！（不包括两侧端点的圆弧段数！）)，整体半径，边缘圆角半径，路径高度
function createPath3(part,size,r,y)
{
    var arr=[];
    //外角与内角之间的距离，将外角向量减去这个长度就是圆角的圆心！
    var rad_w=(Math.PI-Math.PI*2/(part))/2;
    var size_d=r*Math.cos(rad_w)*2;
    //var part2=part+2;
    for(var i=0;i<part;i++)
    {
        var rad_o=(Math.PI/(part/2))*i+Math.PI/part;
        var x_o=Math.sin((Math.PI/(part/2))*i+Math.PI/part)*(size-size_d);
        var z_o=Math.cos((Math.PI/(part/2))*i+Math.PI/part)*(size-size_d);
        //var v_o=new BABYLON.Vector3(x_o,y,z_o);
        for(var j=0;j<=part;j++)
        {
            arr.push(new BABYLON.Vector3(x_o+Math.sin((rad_w*2/part)*j+rad_o-rad_w)*r,y,z_o+Math.cos((rad_w*2/part)*j+rad_o-rad_w)*r))
        }
    }
    arr.push(arr[0].clone());
    return arr;
}

//准备各个算子类，但不放置
function prepareChesses()
{
    var class_chess=createChessClass("bubing",map_mat.mat_yellow2,"red","rgb(252,225,170)","XXX","4-6-6","");
    //class_chess.position.x=187.5;
    class_chess.position.y=500;
    class_chess.position.z=200;
    mcc.red["b1"]=class_chess;

    var class_chess=createChessClass("bubing",map_mat.mat_yellow2,"red","rgb(252,225,170)","XXX","1-3-3","militia");
    class_chess.position.x+=20;
    class_chess.position.y=500;
    //map_chessclass.bubing2={mesh:class_chess};
    class_chess.position.z=200;
    mcc.red["b2"]=class_chess;

    var class_chess=createChessClass("zjbing",map_mat.mat_yellow2,"red","rgb(252,225,170)","XXX","5-3-6","");
    class_chess.position.x+=40;
    class_chess.position.y=500;
    //map_chessclass.zjbing1={mesh:class_chess};
    class_chess.position.z=200;
    mcc.red["z1"]=class_chess;

    var class_chess=createChessClass("jxhbubing",map_mat.mat_red,"rgb(252,225,170)","red","XXX","3-7-9","");
    class_chess.position.x+=60;
    class_chess.position.y=500;
    //map_chessclass.jxhbubing1={mesh:class_chess};
    class_chess.position.z=200;
    mcc.blue["j1"]=class_chess;

    var class_chess=createChessClass("zjbing",map_mat.mat_red,"rgb(252,225,170)","red","XXX","7-4-9","");
    class_chess.position.x+=80;
    class_chess.position.y=500;
    //map_chessclass.zjbing2={mesh:class_chess};
    class_chess.position.z=200;
    mcc.blue["z2"]=class_chess;

    var class_chess=createChessClass("paobing",map_mat.mat_red,"rgb(252,225,170)","red","XXX","12-3-12","");
    class_chess.position.x+=100;
    class_chess.position.y=500;
    //map_chessclass.paobing1={mesh:class_chess};
    class_chess.position.z=200;
    mcc.blue["p1"]=class_chess;

    requestAnimationFrame(function(){
        createSomeChesses();
    })
}
function createSomeChesses()
{
    cz("red","b1",20,20);
    cz("red","b2",20,20);
}