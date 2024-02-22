var size_chess=3,size_chess_r=0.4,size_chess2=0.5;
var part_chessx=20,part_chessy=20;
var map_chessclass={}
var can_temp_chess=document.createElement("canvas");
can_temp_chess.width=128;
can_temp_chess.height=128;
var c_temp_chess=can_temp.getContext("2d");

function createChesses()//生成用于平面编辑和打印的算子阵列
{

    var class_chess=createChessClass("bubing",map_mat.mat_red,"red","XXX","4-6-6","001");
    class_chess.position.x=187.5;
    map_chessclass.bubing1={mesh:class_chess,color:{r:112,g:146,b:46}};
    class_chess.position.z=-108.25;
}

function createChessClass(picname,mat,basecolor,texttop,textbottom,textleft)
{
    var arr_path=[];
    arr_path.push(createPath2(4,size_chess,0));
    arr_path.push(createPath2(4,size_chess,0.5));
    arr_path.push(createPath2(4,size_chess,1));
    var mesh_ribbona=BABYLON.MeshBuilder.CreateRibbon("mesh_ribbon",{pathArray:arr_path,closePath:false,closeArray:false});
    mesh_ribbona.renderingGroupId = 1;
    mesh_ribbona.sideOrientation=BABYLON.Mesh.DOUBLESIDE;
    var mesh_plate1a=newland.pathtoplate(arr_path[0],"mesh_plate1",scene,1);//底
    mesh_plate1a.renderingGroupId = 1;
    var mesh_plate2a=newland.pathtoplate(arr_path[arr_path.length-1],"mesh_plate2",scene);//顶
    mesh_plate2a.renderingGroupId = 1;

    // var mesh_ribbona=mesh_ribbon.clone();
    // var mesh_plate1a=mesh_plate1.clone();
    // var mesh_plate2a=mesh_plate2.clone();
    mesh_ribbona.material=mat;
    mesh_plate1a.material=mat;

    var c=c_temp_chess;
    c.fillStyle=basecolor;
    c.fillRect(0,0,128,128);
    c.lineWidth=2;
    c.strokeStyle="black";
    var img=new Image();
    img.src="../ASSETS/IMAGE/CHESS/"+picname+".png"
    img.onload=function(){//这会破坏程序的同步性！
        c.drawImage(img,0,0);
        c.textAlign='center';
        c.font="20px";
        c.fillText(texttop,64,17);
        c.font="40px";
        c.fillText(textbottom,64,80);
        c.font="20px";
        c.save();
        c.rotate(Math.PI/2);
        c.fillText(textleft,64,20);
        c.restore();
    }

    mesh_plate2a.material=map_mat.mat_grass2;
    var mesh_mergea=BABYLON.Mesh.MergeMeshes([mesh_ribbona, mesh_plate1a,mesh_plate2a], true, false, null, false, true);

    return mesh_mergea
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