var size_grid=4.5,size_grid2=0.5,height_grid=2;//正六边形外接圆的半径，单个单元格的厚度，单元格在纵向分为4段(五条线)
var part_mapx=50,part_mapy=50;
var map_gridclass={}
var width_grid=size_grid+size_grid2;
var height_grid=width_grid*Math.sin(Math.PI/3);

var map_landtype={}
function createGridsFromMap()
{
    createGrid();
    for(var i=0;i<part_mapx;i++)//对于每一列！！
    {
        var arr2=arr_mapgrid[i];
        if(i%2==0)
        {
            for(var j=0;j<part_mapy;j++)
            {
                var type=arr2[j];
                var obj_grid=map_gridclass[type].mesh.createInstance("grid_"+i+"_"+j);
                obj_grid.position.x=i*width_grid*1.5+width_grid;
                obj_grid.position.z=-j*2*height_grid-2*height_grid;
                obj_grid.position.y=0;
                //obj_grid.renderingGroupId = 2;//babylon.js:1 BJS - [08:58:06]: Note - setting renderingGroupId of an instanced mesh has no effect on the scene
                if(advancedTexture2)
                {
                    createText(obj_grid.position,i+"-"+j);
                }

            }
        }
        else {
            for(var j=0;j<=part_mapy;j++)
            {
                var type=arr2[j];
                var obj_grid=map_gridclass[type].mesh.createInstance("grid_"+i+"_"+j);
                obj_grid.position.x=i*width_grid*1.5+width_grid;
                obj_grid.position.z=(-j*2)*height_grid-height_grid;
                obj_grid.position.y=0;
                //obj_grid.renderingGroupId = 2;
                if(advancedTexture2) {
                    createText(obj_grid.position, i + "-" + j);
                }
            }
        }
    }
}
function createGrids()
{
    createGrid();
    for(var i=0;i<part_mapx;i++)//对于每一行<-改为对于每一列！！
    {
        if(i%2==0)
        {
            for(var j=0;j<part_mapy;j++)
            {
                var obj_grid=newland.RandomChooseFromObj(map_gridclass).value.mesh.createInstance("grid_"+i+"_"+j);
                obj_grid.position.x=i*width_grid*1.5+width_grid;
                obj_grid.position.z=-j*2*height_grid-2*height_grid;
                obj_grid.position.y=0;
            }
        }
        else {
            for(var j=0;j<=part_mapy;j++)
            {
                var obj_grid=newland.RandomChooseFromObj(map_gridclass).value.mesh.createInstance("grid_"+i+"_"+j);
                obj_grid.position.x=i*width_grid*1.5+width_grid;
                obj_grid.position.z=(-j*2)*height_grid-height_grid;
                obj_grid.position.y=0;
            }
        }
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

    var mesh_ribbona=mesh_ribbon.clone();
    var mesh_plate1a=mesh_plate1.clone();
    var mesh_plate2a=mesh_plate2.clone();
    mesh_ribbona.material=map_mat.mat_grass;
    mesh_plate1a.material=map_mat.mat_grass;
    mesh_plate2a.material=map_mat.mat_grass2;

    var mesh_ribbonb=mesh_ribbon.clone();
    var mesh_plate1b=mesh_plate1.clone();
    var mesh_plate2b=mesh_plate2.clone();
    mesh_ribbonb.material=map_mat.mat_stone;
    mesh_plate1b.material=map_mat.mat_stone;
    mesh_plate2b.material=map_mat.mat_stone2;

    var mesh_ribbonc=mesh_ribbon.clone();
    var mesh_plate1c=mesh_plate1.clone();
    var mesh_plate2c=mesh_plate2.clone();
    mesh_ribbonc.material=map_mat.mat_lake;
    mesh_plate1c.material=map_mat.mat_lake;
    mesh_plate2c.material=map_mat.mat_lake2;

    var mesh_ribbond=mesh_ribbon.clone();
    var mesh_plate1d=mesh_plate1.clone();
    var mesh_plate2d=mesh_plate2.clone();
    mesh_ribbond.material=map_mat.mat_yulin;
    mesh_plate1d.material=map_mat.mat_yulin;
    mesh_plate2d.material=map_mat.mat_yulin2;

    //这个merge参数会自动删除源网格！！
    var mesh_mergea=BABYLON.Mesh.MergeMeshes([mesh_ribbona, mesh_plate1a,mesh_plate2a], true, false, null, false, true);
    //mesh_mergea.position.x+=20;
    map_gridclass.grass={mesh:mesh_mergea,color:{r:112,g:146,b:46}};
    mesh_mergea.position.y=-100;
    mesh_mergea.position.z=200;
    mesh_mergea.renderingGroupId = 1;

    var mesh_mergeb=BABYLON.Mesh.MergeMeshes([mesh_ribbonb, mesh_plate1b,mesh_plate2b], true, false, null, false, true);
    map_gridclass.stone={mesh:mesh_mergeb,color:{r:82,g:81,b:74}};
    mesh_mergeb.position.x+=20;
    mesh_mergeb.position.y=-100;
    mesh_mergeb.position.z=200;
    mesh_mergeb.renderingGroupId = 1;

    var mesh_mergec=BABYLON.Mesh.MergeMeshes([mesh_ribbonc, mesh_plate1c,mesh_plate2c], true, false, null, false, true);
    map_gridclass.lake={mesh:mesh_mergec,color:{r:93,g:143,b:180}};
    mesh_mergec.position.x+=40;
    mesh_mergec.position.y=-100;
    mesh_mergec.position.z=200;
    mesh_mergec.renderingGroupId = 1;

    var mesh_merged=BABYLON.Mesh.MergeMeshes([mesh_ribbond, mesh_plate1d,mesh_plate2d], true, false, null, false, true);
    map_gridclass.yulin={mesh:mesh_merged,color:{r:33,g:68,b:44}};
    mesh_merged.position.x+=60;
    mesh_merged.position.y=-100;
    mesh_merged.position.z=200;

    var mesh_ribbond=mesh_ribbon.clone();
    var mesh_plate1d=mesh_plate1.clone();
    var mesh_plate2d=mesh_plate2.clone();
    mesh_ribbond.material=map_mat.mat_city;
    mesh_plate1d.material=map_mat.mat_city;
    mesh_plate2d.material=map_mat.mat_city2;
    var mesh_merged=BABYLON.Mesh.MergeMeshes([mesh_ribbond, mesh_plate1d,mesh_plate2d], true, false, null, false, true);
    map_gridclass.city={mesh:mesh_merged,color:{r:147,g:151,b:140}};
    mesh_merged.position.x+=80;
    mesh_merged.position.y=-100;
    mesh_merged.position.z=200;
    mesh_merged.renderingGroupId = 1;

    var mesh_ribbond=mesh_ribbon.clone();
    var mesh_plate1d=mesh_plate1.clone();
    var mesh_plate2d=mesh_plate2.clone();
    mesh_ribbond.material=map_mat.mat_village;
    mesh_plate1d.material=map_mat.mat_village;
    mesh_plate2d.material=map_mat.mat_village2;
    var mesh_merged=BABYLON.Mesh.MergeMeshes([mesh_ribbond, mesh_plate1d,mesh_plate2d], true, false, null, false, true);
    map_gridclass.village={mesh:mesh_merged,color:{r:133,g:130,b:71}};
    mesh_merged.position.x+=100;
    mesh_merged.position.y=-100;
    mesh_merged.position.z=200;
    mesh_merged.renderingGroupId = 1;

    mesh_ribbon.dispose();
    mesh_plate1.dispose();
    mesh_plate2.dispose();
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
//绘制整体化的gui用来表示单元格的索引
function initText()
{
    width_map=width_grid*1.5*part_mapx;
    height_map=height_grid*2*(part_mapy+1);

    mesh_floor_text=BABYLON.MeshBuilder.CreatePlane("mesh_floor_text",{width:width_map
        ,height:height_map},scene);
    mesh_floor_text.rotation.x=Math.PI/2;
    mesh_floor_text.position=new BABYLON.Vector3(width_map/2,1.2,-height_map/2);
    mesh_floor_text.renderingGroupId=2;
    advancedTexture2 = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(mesh_floor_text,width_map*5,height_map*5);
    mesh_floor_text.advancedTexture2=advancedTexture2;
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