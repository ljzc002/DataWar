//使用命令进行控制
var obj_pos={};
var obj_hand={red:{},blue:{}};

//创造一个指定类型算子，放在一个格子里
function cz(color,type,i,j)
{
    try {
        var mesh=mcc[color][type];
        var obj=mesh.createInstance(color+"_"+type+"_"+count_chess);
        //obj.renderingGroupId = 2;//instance的renderingGroupId不生效！！
        count_chess++;
        obj.color=color;
        obj.type=type;
        var x=i*width_grid*1.5+width_grid;
        var z=-j*2*height_grid-2*height_grid;
        var grid_chess=obj_pos[i+"_"+j];
        if(!grid_chess)//如果这个单元格里还没有算子
        {
            obj.position=new BABYLON.Vector3(x,1.1,z);
            obj_pos[i+"_"+j]={arr_chess:[obj]};
        }
        else
        {
            obj.position=new BABYLON.Vector3(x,grid_chess.arr_chess.length*1.1+1.1,z);
            grid_chess.arr_chess.push(obj);
        }

    }catch(e)
    {
        console.error(e)
    }

}

//下载当前编辑的地图
function xzdt()
{
    var len=arr_grids.length;
    var arr_res=[];
    var arr_temp=[];
    var arr_temp2=[];
    for(var i=0;i<len;i++)
    {
        if(i%(part_mapy*2+1)==0)
        {
            arr_temp2=[];
            arr_temp=[];
        }
        if(i%(part_mapy*2+1)<part_mapy)
        {
            arr_temp.push(arr_grids[i].myData);
        }
        else
        {
            arr_temp2.push(arr_grids[i].myData);
        }
        if(i==len-1)
        {
            if(arr_temp.length>0)
            {
                arr_res.push(arr_temp);
                if(arr_temp2.length>0)
                {
                    arr_res.push(arr_temp2);
                }
            }
        }
        else if(i%(part_mapy*2+1)==(part_mapy*2))
        {
            if(arr_temp.length>0)
            {
                arr_res.push(arr_temp);
                if(arr_temp2.length>0)
                {
                    arr_res.push(arr_temp2);
                }
            }
        }
    }
    console.log(JSON.stringify(arr_res))

}
//加载地图
function jzdt(mapName)
{
    var url="map/"+mapName;
    newland.importScripts(url);
    createGrid();
    createGrid2();
    requestAnimationFrame(function(){
        var len=arr_mapgrid.length;
        part_mapx=len;
        for(var i=0;i<len;i++)//对于每一列！！
        {
            var arr2=arr_mapgrid[i];
            var len2=arr2.length;
            if(i==0)
            {
                part_mapy=len2;
            }
            if(i%2==0)
            {
                for(var j=0;j<len2-0;j++)
                {
                    var type=arr2[j].type;
                    var obj_grid=map_gridclass[type].mesh.createInstance("grid_"+i+"_"+j);
                    obj_grid.position.x=i*width_grid*1.5+width_grid;
                    obj_grid.position.z=-j*2*height_grid-2*height_grid;
                    obj_grid.position.y=0;
                    obj_grid.myType0="myGrid";
                    obj_grid.myData=arr2[j];
                    initAttachment(obj_grid);
                    arr_grids.push(obj_grid);
                    //obj_grid.renderingGroupId = 2;//babylon.js:1 BJS - [08:58:06]: Note - setting renderingGroupId of an instanced mesh has no effect on the scene
                    if(advancedTexture2)
                    {
                        createText(obj_grid.position,i+"-"+j);
                    }

                }
            }
            else {
                for(var j=0;j<len2-0;j++)
                {
                    var type=arr2[j].type;
                    var obj_grid=map_gridclass[type].mesh.createInstance("grid_"+i+"_"+j);
                    obj_grid.position.x=i*width_grid*1.5+width_grid;
                    obj_grid.position.z=(-j*2)*height_grid-height_grid;
                    obj_grid.position.y=0;
                    obj_grid.myType0="myGrid";
                    obj_grid.myData=arr2[j];
                    initAttachment(obj_grid);
                    arr_grids.push(obj_grid);
                    //obj_grid.renderingGroupId = 2;
                    if(advancedTexture2) {
                        createText(obj_grid.position, i + "-" + j);
                    }
                }
            }
        }


    });
}

//选择一个棋子，显示这个棋子的所有可能的移动位置
function zm(x,y,i)
{
    var arr_chess=obj_pos[x+"_"+y].arr_chess;
    var len=arr_chess.length;
    if(!i)
    {
        i=len-1;
    }

    var chess=arr_chess[i];


}