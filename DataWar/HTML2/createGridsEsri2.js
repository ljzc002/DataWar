var size_grid=4.5,size_grid2=0.5,height_grid=2;//正六边形外接圆的半径，单个单元格的厚度，单元格在纵向分为4段(五条线)
var part_mapx=19,part_mapy=19;
var map_gridclass={};
var map_gridclass2={};
var flag_mattype=1;
var width_grid=size_grid+size_grid2;
var height_grid=width_grid*Math.sin(Math.PI/3);
var arr_grids=[];//将这个数组调整为二维格式，避免单双数计算的麻烦

function createGrids2(type)
{
    createGrid();
    createGrid2();
    var count_grid=0
    for(var i=0;i<part_mapx;i++)//对于每一行<-改为对于每一列！！
    {
        var arr_temp=[];
        if(i%2==0)
        {
            for(var j=0;j<part_mapy;j++)
            {
                var obj_grid=map_gridclass[type].mesh.createInstance("grid_"+i+"_"+j);
                obj_grid.myType0="myGrid";
                obj_grid.myData={type:type,mountain:false,river:[false,false,false,false,false,false]
                ,railway:[false,false,false,false,false,false],i:i,j:j,index:count_grid};//从左上起按顺时针排列！！
                obj_grid.position.x=i*width_grid*1.5+width_grid;
                obj_grid.position.z=-j*2*height_grid-2*height_grid;
                obj_grid.position.y=0;
                initAttachment(obj_grid);
                arr_temp.push(obj_grid);
                if(advancedTexture2)
                {
                    createText(obj_grid.position,i+"-"+j);
                }
                count_grid++;
            }
        }
        else {
            for(var j=0;j<=part_mapy;j++)
            {
                var obj_grid=map_gridclass[type].mesh.createInstance("grid_"+i+"_"+j);
                obj_grid.myType0="myGrid";
                obj_grid.myData={type:type,mountain:false,river:[false,false,false,false,false,false]
                    ,railway:[false,false,false,false,false,false],i:i,j:j,index:count_grid};
                obj_grid.position.x=i*width_grid*1.5+width_grid;
                obj_grid.position.z=(-j*2)*height_grid-height_grid;
                obj_grid.position.y=0;
                initAttachment(obj_grid);
                arr_temp.push(obj_grid);
                if(advancedTexture2)
                {
                    createText(obj_grid.position,i+"-"+j);
                }
                count_grid++;
            }
        }
        arr_grids.push(arr_temp);
    }
}
function createGrid()
{
    //var h=height_grid/4;
    var arr_path=[];
    arr_path.push(createPath(size_grid+size_grid2,0));
    arr_path.push(createPath(size_grid+size_grid2,0.5));
    arr_path.push(createPath(size_grid+size_grid2*Math.cos(Math.PI/6),0.5+size_grid2*Math.sin(Math.PI/6)));
    arr_path.push(createPath(size_grid+size_grid2*Math.cos(Math.PI/3),0.5+size_grid2*Math.sin(Math.PI/3)));
    arr_path.push(createPath(size_grid+size_grid2*Math.cos(Math.PI/2),0.5+size_grid2*Math.sin(Math.PI/2)));
    var mesh_ribbon=BABYLON.MeshBuilder.CreateRibbon("mesh_ribbon",{pathArray:arr_path,closePath:false,closeArray:false});
    mesh_ribbon.renderingGroupId = 1;
    mesh_ribbon.sideOrientation=BABYLON.Mesh.DOUBLESIDE;
    var mesh_plate1=newland.pathtoplate(arr_path[0],"mesh_plate1",scene,1);//底
    mesh_plate1.renderingGroupId = 1;
    //mesh_ribbon.sideOrientation=BABYLON.Mesh.DOUBLESIDE;
    var mesh_plate2=newland.pathtoplate(arr_path[arr_path.length-1],"mesh_plate2",scene);//顶
    mesh_plate2.renderingGroupId = 1;

    var count_landtype=0;
    for(var key in map_landtype)
    {
        var landtype=map_landtype[key];
        var mesh_ribbona=mesh_ribbon.clone();
        var mesh_plate1a=mesh_plate1.clone();
        var mesh_plate2a=mesh_plate2.clone();
        mesh_ribbona.material=map_mat["mat_"+key];
        mesh_plate1a.material=map_mat["mat_"+key];
        mesh_plate2a.material=map_mat["mat_"+key+"2"];

        //这个merge参数会自动删除源网格！！
        var mesh_mergea=BABYLON.Mesh.MergeMeshes([mesh_ribbona, mesh_plate1a,mesh_plate2a], true, false, null, false, true);
        map_gridclass[key]={mesh:mesh_mergea,color:landtype.color};
        mesh_mergea.position.y=500;
        mesh_mergea.position.z=200;
        mesh_mergea.position.x=20*count_landtype;
        mesh_mergea.renderingGroupId = 1;
        count_landtype++
    }
    mesh_ribbon.dispose();
    mesh_plate1.dispose();
    mesh_plate2.dispose();
}
function createGrid2()
{
    //var h=height_grid/4;
    var arr_path=[];
    arr_path.push(createPath(size_grid+size_grid2,0));
    arr_path.push(createPath(size_grid+size_grid2,0.5));
    arr_path.push(createPath(size_grid+size_grid2*Math.cos(Math.PI/6),0.5+size_grid2*Math.sin(Math.PI/6)));
    arr_path.push(createPath(size_grid+size_grid2*Math.cos(Math.PI/3),0.5+size_grid2*Math.sin(Math.PI/3)));
    arr_path.push(createPath(size_grid+size_grid2*Math.cos(Math.PI/2),0.5+size_grid2*Math.sin(Math.PI/2)));
    var mesh_ribbon=BABYLON.MeshBuilder.CreateRibbon("mesh_ribbon",{pathArray:arr_path,closePath:false,closeArray:false});
    mesh_ribbon.renderingGroupId = 1;
    mesh_ribbon.sideOrientation=BABYLON.Mesh.DOUBLESIDE;
    var mesh_plate1=newland.pathtoplate(arr_path[0],"mesh_plate1",scene,1);//底
    mesh_plate1.renderingGroupId = 1;
    //mesh_ribbon.sideOrientation=BABYLON.Mesh.DOUBLESIDE;
    var mesh_plate2=newland.pathtoplate(arr_path[arr_path.length-1],"mesh_plate2",scene);//顶
    mesh_plate2.renderingGroupId = 1;

    var count_landtype=0;
    for(var key in map_landtype)
    {
        var landtype=map_landtype[key];
        var mesh_ribbona=mesh_ribbon.clone();
        var mesh_plate1a=mesh_plate1.clone();
        var mesh_plate2a=mesh_plate2.clone();
        mesh_ribbona.material=map_mat["mat_Clouds"];
        mesh_plate1a.material=map_mat["mat_"+key];
        mesh_plate2a.material=map_mat["mat_"+key];

        //这个merge参数会自动删除源网格！！
        var mesh_mergea=BABYLON.Mesh.MergeMeshes([mesh_ribbona, mesh_plate1a,mesh_plate2a], true, false, null, false, true);
        map_gridclass2[key]={mesh:mesh_mergea,color:landtype.color};
        mesh_mergea.position.y=500;
        mesh_mergea.position.z=200;
        mesh_mergea.position.x=20*count_landtype;
        mesh_mergea.renderingGroupId = 1;
        count_landtype++
    }
    mesh_ribbon.dispose();
    mesh_plate1.dispose();
    mesh_plate2.dispose();
}
function switchGridMat()
{
    var arr_grids2=[];
    if(flag_mattype==1)//如果原来是显示纹理的
    {
        flag_mattype=2;
        var len=arr_grids.length;
        for(var i=0;i<len;i++)
        {
            var arr2b=[];
            var arr2=arr_grids[i];
            var len2=arr2.length;
            for(var j=0;j<len2;j++)
            {
                var instance_grid=arr2[j];
                var type=instance_grid.myData.type;
                var obj_grid=map_gridclass2[type].mesh.createInstance(instance_grid.name);
                obj_grid.myType0="myGrid";
                obj_grid.myData=instance_grid.myData;
                obj_grid.myData.type=type;
                var pos=instance_grid.position;
                obj_grid.position.x=pos.x;
                obj_grid.position.z=pos.z;
                obj_grid.position.y=pos.y;
                initAttachment(obj_grid);
                arr2b.push(obj_grid);
                instance_grid.dispose();
            }
            arr_grids2.push(arr2b);
        }
    }
    else
    {
        flag_mattype=1;
        var len=arr_grids.length;
        for(var i=0;i<len;i++)
        {
            var arr2b=[];
            var arr2=arr_grids[i];
            var len2=arr2.length;
            for(var j=0;j<len2;j++)
            {
                var instance_grid=arr2[j];
                var type=instance_grid.myData.type;
                var obj_grid=map_gridclass[type].mesh.createInstance(instance_grid.name);
                obj_grid.myType0="myGrid";
                obj_grid.myData=instance_grid.myData;
                obj_grid.myData.type=type;
                var pos=instance_grid.position;
                obj_grid.position.x=pos.x;
                obj_grid.position.z=pos.z;
                obj_grid.position.y=pos.y;
                initAttachment(obj_grid);
                arr2b.push(obj_grid);
                instance_grid.dispose();
            }
            arr_grids2.push(arr2b);
        }
    }
    arr_grids=arr_grids2;
}
function createPath(r,y)
{
    var arr=[];
    for(var i=0;i<6;i++)
    {
        arr.push(new BABYLON.Vector3(Math.sin((Math.PI/3)*i+Math.PI/6)*r,y,Math.cos((Math.PI/3)*i+Math.PI/6)*r))
    }
    arr.push(arr[0].clone());
    return arr;
}

var advancedTexture2,width_map,height_map,mesh_floor_text;
var objSpriteManager;
//绘制整体化的gui用来表示单元格的索引
function initText()
{
    width_map=width_grid*1.5*part_mapx;
    height_map=height_grid*2*(part_mapy+1);

    mesh_floor_text=BABYLON.MeshBuilder.CreatePlane("mesh_floor_text",{width:width_map
        ,height:height_map},scene);
    mesh_floor_text.rotation.x=Math.PI/2;
    mesh_floor_text.position=new BABYLON.Vector3(width_map/2,1.2,-height_map/2);
    mesh_floor_text.renderingGroupId=1;
    advancedTexture2 = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(mesh_floor_text,width_map*5,height_map*5);
    mesh_floor_text.advancedTexture2=advancedTexture2;

    objSpriteManager = createSpritelabel(24, "#00ff00", 20000);
    //addSpritelabel(c_node.mesh_p, objSpriteManager.m, 10, 20, 4,objSpriteManager.ma,tile.TY)
}
function createText(pos,text)
{
    // var panel2 = new BABYLON.GUI.StackPanel();//panel2默认零点在中间
    // panel2.left=(pos.x-width_map/2)*5+"px";
    // panel2.top=(-pos.z-height_map/2)*5-10+"px";
    // panel2.width="50px";
    // panel2.height="12px";//规定StackPanel的高度会报警告！？
    // advancedTexture2.addControl(panel2);
    var textblock = new BABYLON.GUI.TextBlock();
    textblock.text = text;
    textblock.color="white";
    textblock.fontSize="12px"
    //panel2.addControl(textblock);

    textblock.left=(pos.x-width_map/2)*5+"px";
    textblock.top=(-pos.z-height_map/2)*5-10+"px";
    textblock.width="50px";
    //textblock.height="12px";
    advancedTexture2.addControl(textblock);
}
function switchText()
{
    if(mesh_floor_text.renderingGroupId==2)
    {
        mesh_floor_text.renderingGroupId=0;
    }
    else
    {
        mesh_floor_text.renderingGroupId=2;
    }
}

function initAttachment(instace_grid)
{
    var arr_att=instace_grid.arr_att;
    if(arr_att&&arr_att.length>0)
    {
        var len=arr_att.length;
        for(var i=0;i<len;i++)
        {
            var att=arr_att[i];
            att.dispose();
        }
    }
    arr_att=[];
    var myData=instace_grid.myData;
    if(myData.mountain)
    {
        //instace_grid.scaling.y=10;这样改不好看
        const cone = BABYLON.MeshBuilder.CreateCylinder("cone", {diameterBottom:size_grid,height:width_grid,diameterTop:0}, scene);
        cone.parent=instace_grid;
        cone.renderingGroupId=1;
        cone.position.y=2;
        cone.material=map_mat.mat_Clouds;
        arr_att.push(cone);
    }
    else
    {
        //instace_grid.scaling.y=1;
    }
    var arr_river=myData.river;
    for(var i=0;i<6;i++)
    {
        if(arr_river[i])
        {
            var mesh_river=new BABYLON.MeshBuilder.CreatePlane("plane_att",{width:(width_grid-size_grid2),height: size_grid2},scene);
            mesh_river.parent=instace_grid;
            mesh_river.renderingGroupId=2;
            mesh_river.position.y=0.9;
            mesh_river.material=map_mat.mat_blue;
            //height_grid
            var rad=Math.PI*(5/6)-i*Math.PI/3;
            mesh_river.position.x=(height_grid-size_grid2)*Math.cos(rad);
            mesh_river.position.z=(height_grid-size_grid2)*Math.sin(rad);
            mesh_river.rotation.x=Math.PI/2;
            mesh_river.rotation.y=-(rad-Math.PI/2);
            arr_att.push(mesh_river)
        }
    }
    var arr_river=myData.railway;
    for(var i=0;i<6;i++)
    {
        if(arr_river[i])
        {
            var mesh_river=new BABYLON.MeshBuilder.CreatePlane("plane_att",{width:height_grid,height: size_grid2},scene);
            mesh_river.parent=instace_grid;
            mesh_river.renderingGroupId=2;
            mesh_river.position.y=1;
            mesh_river.material=map_mat.mat_black;
            //height_grid
            var rad=Math.PI*(5/6)-i*Math.PI/3;
            mesh_river.position.x=height_grid*Math.cos(rad)/2;
            mesh_river.position.z=height_grid*Math.sin(rad)/2;
            mesh_river.rotation.x=Math.PI/2;
            mesh_river.rotation.y=-(rad);
            arr_att.push(mesh_river)
        }
    }
    instace_grid.arr_att=arr_att;
//为一个网格配置一定数量的Sprite，其位置在mesh上h处，每个Sprite的尺寸为size
    //addSpritelabel(instace_grid, objSpriteManager.m, 10, 2, 2,objSpriteManager.ma,1)
}