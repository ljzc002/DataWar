//使用命令进行控制
var obj_pos={};
var obj_hand={red:{},blue:{}};

//创造一个指定类型算子，放在一个格子里
//cz("blue","test_bubing","XXX",16,1);
function cz(color,type,level,i,j)
{
    try {
        var mesh=mcc[color][type+"_"+level];
        var obj=mesh.createInstance(color+"_"+type+"_"+level+"_"+count_chess);
        //obj.renderingGroupId = 2;//instance的renderingGroupId不生效！！
        count_chess++;
        obj.color=color;
        obj.type=type;
        obj.level=level;
        var unittype=map_unittype[type];
        var params=unittype.param[level].split("-");
        obj.ap=parseInt(params[0]);
        obj.dp=parseInt(params[1]);
        obj.ydl=parseInt(params[2]);
        obj.cydl=obj.ydl;
        obj.dis=unittype.dis;
        obj.cost=unittype.cost;
        obj.myData={};
        obj.myData.history=[];
        var x=i*width_grid*1.5+width_grid;
        var z;
        if(i%2==0)
        {
            z=-j*2*height_grid-2*height_grid;
        }
        else
        {
            z=-j*2*height_grid-height_grid;
        }

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
        arr_grids=[];
        var len=arr_mapgrid.length;
        part_mapx=len;
        for(var i=0;i<len;i++)//对于每一列！！
        {
            var arr2b=[];
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
                    arr2b.push(obj_grid);
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
                    arr2b.push(obj_grid);
                    //obj_grid.renderingGroupId = 2;
                    if(advancedTexture2) {
                        createText(obj_grid.position, i + "-" + j);
                    }
                }
            }
            arr_grids.push(arr2b);
        }
        switchGridMat();

    });
}

function ql()
{
    // for(var str_id in map_reached)
    // {
    //     var reached=map_reached[str_id];
    //     var path=reached.path;
    //     if(path.length==2)
    //     {
    //         deleteSpritelabel(path[1]);
    //         //updateSpritelabel(path[1], "", objSpriteManager.obj_pos, 0);
    //     }
    //     else
    //     {
    //         deleteSpritelabel(path[0]);
    //         //updateSpritelabel(chess_currnet, "", objSpriteManager.obj_pos, 0);
    //     }
    // }
    //直接清理所有地块！
    var len=arr_grids.length;
    for(var i=0;i<len;i++)
    {
        var arr2 = arr_grids[i];
        var len2 = arr2.length;
        for (var j = 0; j < len2; j++)
        {
            var instance_grid = arr2[j];
            deleteSpritelabel(instance_grid);
        }
    }
    map_reached={};
    map_reached2={};
    depth_findaround=0;
    chess_currnet=null;
    grid_currnet=null;
    var len=arr_attachment_zm.length;
    for(var i=0;i<len;i++)
    {
        var mesh=arr_attachment_zm[i];
        mesh.dispose();
        mesh=null;
    }
    arr_attachment_zm=[];
}
//根据调整后的顺序重新排列一个单元格中的chess
function cp(arr_chess)
{
    if(!arr_chess&&grid_currnet)
    {
        var x=grid_currnet.myData.i;
        var y=grid_currnet.myData.j;
        var str_id=x+"_"+y;
        arr_chess=obj_pos[str_id].arr_chess;
    }
    var len=arr_chess.length;
    for(var i=0;i<len;i++)
    {
        var chess=arr_chess[i];
        chess.position.y=1.1+i*1.1;
    }
}

var map_reached={};//已经到达过的格子
var map_reached2={};
var arr_attachment_zm=[];//用于表示注目棋子移动范围的网格和线段
var chess_currnet=null;
var grid_currnet=null;
var arr_grid_target={};//可yd
var arr_grid_target2={};//可yc
//选择一个棋子，显示这个棋子的所有可能的移动位置
//zm(16,1)
function zm(x,y,i)
{
    var str_id=x+"_"+y;
    var arr_chess=obj_pos[str_id].arr_chess;
    var len=arr_chess.length;
    if(!i)
    {
        if(chess_currnet&&chess_currnet.name==arr_chess[len-1].name)
        {//如果在已经注目最顶层chess时无参数操作，则切换注目到下一个chess
            i=len-2;
        }
        else{
            i=len-1;
        }
    }
    //111111112222222222222
    if(i!=(len-1))
    {//如果注目的不是最上面的chess，则把注目的chess移动到最上面，把原来在最上面的移动到最下面
        var chess0=arr_chess.pop();//原本顶层的
        var chess2=arr_chess.splice(i,1)[0];
        arr_chess.unshift(chess0);
        arr_chess.push(chess2);
        cp(arr_chess)
    }
    var chess=arr_chess[len-1];

    //var params=map_unittype[chess.type].param[chess.level].split("-");
    var ydl=chess.cydl;//params[2];//移动力
    ql();
    chess_currnet=chess;
    if(ydl>0)//如果还没移动过
    {
        var grid0=arr_grids[x][y];
        grid_currnet=grid0;
        map_reached[str_id]={ydl_sy:ydl,path:[grid0]};//在这里保存剩余移动力！
        //var grid0=arr_grids[x][y];
        //add_arr_attachment_zm(arr_attachment_zm.length,ydl,grid0);完成所有距离比对后统一绘制附件
        //对于每个到达的地块要绘制一个标志表明可达，标志的格式为index（cost），标志后续要可点击交互
        findAround(x,y,ydl,chess.color);//可移动到的区域
        findAround2(x,y,chess.dis);//可间接攻击到的区域
        var count_str_id=0;
        for(var str_id in map_reached)
        {
            var reached=map_reached[str_id];
            var path=reached.path;
            if(path.length==2)//地块连线
            {
                var line=BABYLON.MeshBuilder.CreateDashedLines("line_zm",{points:[path[0].position,path[1].position]})
                line.renderingGroupId=2;
                arr_attachment_zm.push(line);
            }
            arr_grid_target[count_str_id]={index:count_str_id,ydlCost:ydl-reached.ydl_sy,grid:path[path.length-1]};
            //地块文字
            var str_temp=count_str_id+"-"+reached.ydl_sy;
            var reached2=map_reached2[str_id];//如果这个地块同时也可间接攻击
            if(reached2)
            {
                str_temp=str_temp+"."+reached2.dis;
                arr_grid_target2[count_str_id]={index:count_str_id,grid:path[path.length-1]};
            }
            //@@@@在进行快速AI计算时，这些标签的渲染需要省略！！！！
            if(path.length==2)
            {
                addSpritelabel(path[1], objSpriteManager.m, str_temp.length, 2, 1.5,objSpriteManager.ma,1);
                updateSpritelabel(path[1], str_temp, objSpriteManager.obj_pos, 0);
            }
            else
            {
                addSpritelabel(path[0], objSpriteManager.m, str_temp.length, 2, 1.5,objSpriteManager.ma,1)
                updateSpritelabel(path[0], str_temp, objSpriteManager.obj_pos, 0);
            }
            count_str_id++;
        }
        for(var str_id in map_reached2)
        {
            var reached=map_reached[str_id];
            if(!reached)
            {//对于上一次循环没有处理到的地块（可间接攻击但不可到达）
                var reached2=map_reached2[str_id];
                var str_temp=count_str_id+"."+reached2.dis;
                addSpritelabel(reached2.grid, objSpriteManager.m, str_temp.length, 2, 1.5,objSpriteManager.ma,1)
                updateSpritelabel(reached2.grid, str_temp, objSpriteManager.obj_pos, 0);
                arr_grid_target2[count_str_id]={index:count_str_id,grid:reached2.grid};
                count_str_id++;
            }
        }
    }
    var myData=chess.myData;
    console.log(myData.history);//输出chess的history对象
}

//寻找一个六角格坐标周围的六个单元格，判断这里是否有格子、是否已计算过、是否可到达
function findAround(x,y,ydl,color)//yd范围计算
{

    var grid0=arr_grids[x][y];
    var arr_around=[];
    if(x%2==0)
    {//这里的顺序最好与河流和铁路的配置顺序相同！！！！//从左上起按顺时针排列！！<-但还要再反过来！！！！
        //arr_around=[[x-1,y],[x-1,y+1],[x,y-1],[x,y+1],[x+1,y],[x+1,y+1]];
        //arr_around=[[x-1,y],[x,y-1],[x+1,y],[x+1,y+1],[x,y+1],[x-1,y+1]];
        arr_around=[[x+1,y+1],[x,y+1],[x-1,y+1],[x-1,y],[x,y-1],[x+1,y]];
    }
    else
    {
        //arr_around=[[x-1,y-1],[x-1,y],[x,y-1],[x,y+1],[x+1,y-1],[x+1,y]];
        //arr_around=[[x-1,y-1],[x,y-1],[x+1,y-1],[x+1,y],[x,y+1],[x-1,y]];
        arr_around=[[x+1,y],[x,y+1],[x-1,y],[x-1,y-1],[x,y-1],[x+1,y-1]];
    }
    var len=arr_around.length;
    for(var i=0;i<len;i++)//对于注目地块周围的每个地块
    {
        var around=arr_around[i]
        if(arr_grids[around[0]]&&arr_grids[around[0]][around[1]])//存在这个地块
        {
            var str_id=around[0]+"_"+around[1];
            var grid=arr_grids[around[0]][around[1]];
            var cost=map_landtype[grid.myData.type].cost;
            var myData=grid.myData;
            if(myData.river[i])
            {
                cost*=2;
            }
            if(myData.railway[i])
            {
                cost=1;
            }
            if(cost<=ydl)
            {
                var ydl2=ydl-cost;
                if(!map_reached[str_id]||map_reached[str_id].ydl_sy<ydl2)//这个地块尚未被更短的到达过！
                {
                    map_reached[str_id]={ydl_sy:ydl2,path:[grid0,grid]};
                    if(obj_pos[str_id])
                    {
                        var arr_chess=obj_pos[str_id].arr_chess;
                        if(arr_chess&&arr_chess.length>0)
                        {
                            if(arr_chess[0].color!=color)
                            {
                                continue;
                            }
                        }
                    }

                    findAround(around[0],around[1],ydl2,color);//如果到达的不是敌占区，则递归进行寻路
                }
            }
            else
            {//移动力不足以到达这个地块
                continue;
            }

        }
    }
}
var depth_findaround=0;
function findAround2(x,y,dis)//yc范围计算
{
    depth_findaround++;//递归深度
    if(depth_findaround<=dis)
    {
        var arr_around=[];
        if(x%2==0)
        {//这里的顺序最好与河流和铁路的配置顺序相同！！！！//从左上起按顺时针排列！！<-但还要再反过来！！！！
            arr_around=[[x+1,y+1],[x,y+1],[x-1,y+1],[x-1,y],[x,y-1],[x+1,y]];
        }
        else
        {
            arr_around=[[x+1,y],[x,y+1],[x-1,y],[x-1,y-1],[x,y-1],[x+1,y-1]];
        }
        var len=arr_around.length;
        for(var i=0;i<len;i++)//对于注目地块周围的每个地块
        {
            var around=arr_around[i]
            if(arr_grids[around[0]]&&arr_grids[around[0]][around[1]])//存在这个地块
            {
                var str_id=around[0]+"_"+around[1];
                var grid=arr_grids[around[0]][around[1]];
                map_reached2[str_id]={dis:depth_findaround,grid:grid};
                if(depth_findaround<dis)
                {
                    findAround2(around[0],around[1],dis)
                }
            }
        }
    }

    //for(var i=1;i<=dis;i++)
    //{

    //}
}

var count_hh=0;
//进入下一回合，目前只需恢复所有chess的c移动力
function xyhh()
{
    for(var str_id in obj_pos)
    {
        var arr_chess=obj_pos[str_id].arr_chess;
        var len=arr_chess.length;
        for(var i=0;i<len;i++)
        {
            var chess=arr_chess[i];
            chess.cydl=chess.ydl;
        }
    }
    count_hh++;
}

var obj_random6={1:1,2:2,3:3,4:4,5:5,6:6};
//移动，要把一个棋子移动到另一个地块，要处理起止地块的堆叠变化（和平移动），要进行概率计算（非和平移动）
function yd(index,isAll,isAllAll)//isAll:是否让这个grid中符合cydl条件的所有单位一同行动，isAllAll是否让所有能到达这个目标的单位一同行动
{
    if(chess_currnet&&chess_currnet.cydl>0)
    {
        var arr_chess_start=[];
        //起始点
        var xs=grid_currnet.myData.i;
        var ys=grid_currnet.myData.j;
        var str_ids=xs+"_"+ys;
        var arr_chesss=obj_pos[str_ids].arr_chess;
        //目标点
        var grid_target=arr_grid_target[index].grid;
        var xe=grid_target.myData.i;
        var ye=grid_target.myData.j;
        var str_ide=xe+"_"+ye;
        var arr_chesse=obj_pos[str_ide].arr_chess;
        if(isAll)
        {
            if(!isAllAll)
            {
                var ydlCost=arr_grid_target[index].ydlCost;
                //var len=arr_chesss;
                for(var i=0;i<arr_chesss.len;i++)
                {
                    var chess=arr_chesss[i];
                    if(chess.cydl>=ydlCost)//如果可以协同行动
                    {
                        arr_chesss.splice(i,1);
                        arr_chess_start.push(chess);
                        chess.cydl=0;
                    }
                }
                cp(arr_chesss);
            }
            else
            {
                for(var str_id in obj_pos)//在所有的格子中遍历可以到达目标点的chess
                {
                    var arr_chess=obj_pos[str_id];
                    //var len=arr_chess.length;
                    for(var i=0;i<arr_chess.length;i++)//对于每个棋子
                    {
                        var chess=arr_chess[i];
                        if(chess.color!=chess_currnet.color)
                        {
                            break;
                        }
                        else
                        {
                            if(chess.cydl>0)
                            {
                                var arr=str_id.split("_");
                                var x=arr[0];
                                var y=arr[0];
                                findAround(x,y,chess.cydl,chess_currnet.color);
                                if(map_reached[str_ide])//如果这个chess能够到达目标地块
                                {
                                    arr_chesss.splice(i,1);
                                    chess.cydl=0;
                                    arr_chess_start.push(chess);
                                }
                            }

                        }
                    }
                    cp(arr_chess);
                }
            }
        }
        else {
            arr_chesss.pop();
            arr_chess_start=[chess_currnet];
            chess_currnet.cydl=0;
            cp(arr_chesss);
        }

            if(!arr_chesse||arr_chesse.length==0||arr_chesse[0].color==chess_currnet.color) {
                //和平移动
                if(!arr_chesse) {
                    arr_chesse=[];
                }
                arr_chesse.concat(arr_chess_start);
                cp(arr_chesse);
            }
            else
            {//攻击移动《-如何处理协同移动问题？！
                var arr1=[],arr2=[];//将这两个数组通过ls传给stage
                var len=arr_chess_start.length;
                var sum_ap=0;
                for(var i=0;i<len;i++)
                {
                    var chess=arr_chess_start[i];
                    sum_ap+=chess.ap;
                    arr1.push({index:i,type:chess.type,level:chess.level,ap:chess.ap,dp:chess.dp,ydl:chess.ydl,dis:chess.dis,cost:chess.cost})
                }
                var len=arr_chesse.length;
                var sum_dp=0;
                for(var i=0;i<len;i++)
                {
                    var chess=arr_chesse[i];
                    sum_dp+=chess.dp;
                    arr2.push({index:i,type:chess.type,level:chess.level,ap:chess.ap,dp:chess.dp,ydl:chess.ydl,dis:chess.dis,cost:chess.cost})
                }
                //localStorage.setItem("arr1",arr1);
                //localStorage.setItem("arr2",arr2);
                var random=newland.RandomChooseFromObj(obj_random6).key;
                var myWindow=window.open("stage/stage.html#"+count_hh+"@"+str_ide+"@"+sum_ap+"@"+sum_dp+"@"+random,"_blank");
                myWindow.arr1=arr1;
                myWindow.arr2=arr2;
                var res =myWindow.queryTable();//接收到随机计算结果后，对相关chess进行修改，包括位置变化、种类更换、资源释放、增加历史等
            }

            chess_currnet.cydl=0;



    }
}

//间接(远程)攻击，要进行概率计算
function yc()
{

}

//释放chess，但是要保留相关history
function sf()
{

}