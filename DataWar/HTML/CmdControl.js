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