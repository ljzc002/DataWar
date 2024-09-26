var size_chess=3,size_chess_r=0.4,size_chess2=0.2;//单个算子的半径，圆角半径，算子之间的缝隙
var part_chessx=20,part_chessy=20;
var map_chessclass={},mcc={red:{},blue:{}};
var can_temp_chess=document.createElement("canvas");
can_temp_chess.width=128;
can_temp_chess.height=128;
var c_temp_chess=can_temp_chess.getContext("2d");
var count_chess=0;
var map_unittype={};
map_unittype.test_bubing={map:"bubing",param:{"X":"1-2-6","XX":"3-6-6","XXX":"9-18-6"},str:"",cost:3}
map_unittype.test_mibing={map:"bubing",param:{"X":"0-1-3","XX":"0-3-4","XXX":"1-9-3"},str:"militia",cost:1}
map_unittype.test_zjbing={map:"zjbing",param:{"X":"2-1-9","XX":"6-3-9","XXX":"20-9-9"},str:"",cost:10}
map_unittype.test_jxhbubing={map:"jxhbubing",param:{"X":"1-2-9","XX":"3-6-9","XXX":"9-18-9"},str:"",cost:7}
map_unittype.test_paobing={map:"paobing",param:{"X":"3-1-12","XX":"9-3-12","XXX":"27-9-12"},str:"",cost:20,dis:1}

var map_side={};
map_side.red={mat:"mat_red",textcolor:"rgb(252,225,170)",basecolor:"red"}
map_side.blue={mat:"mat_blue",textcolor:"rgb(252,225,170)",basecolor:"blue"}

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
    var count_unittype=0;
    for(var unittype in map_unittype)
    {
        var obj_unittype=map_unittype[unittype];
        //for(var i=0;i<3;i++)
        var count_level=0;
        for(var level in obj_unittype.param)
        {
            var class_chess=createChessClass(obj_unittype.map,map_mat[map_side.red.mat],map_side.red.textcolor,map_side.red.basecolor
                ,level,obj_unittype.param[level],obj_unittype.str);
            class_chess.position.x=(20*count_unittype);
            class_chess.position.y=500;
            class_chess.position.z=200+count_level*20;
            mcc.red[unittype+"_"+level]=class_chess;
            var class_chess=createChessClass(obj_unittype.map,map_mat[map_side.blue.mat],map_side.blue.textcolor,map_side.blue.basecolor
                ,level,obj_unittype.param[level],obj_unittype.str);
            class_chess.position.x=(20*count_unittype);
            class_chess.position.y=500;
            class_chess.position.z=300+count_level*20;
            mcc.blue[unittype+"_"+level]=class_chess;
            count_level++;
        }
        count_unittype++;
    }


    requestAnimationFrame(function(){
        createSomeChesses();
        //AI计算分为三个层次，一是初始棋子的选择和布置，二是蒙特卡罗树，三是评价函数
    })
}
function createSomeChesses()
{
    cz("blue","test_bubing","XXX",16,1);
    cz("red","test_bubing","XXX",15,1);
    cz("red","test_paobing","XXX",15,1);
}
