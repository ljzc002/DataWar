//初始化用到的各种材质
var map_landtype={};
map_landtype.Water={color:{r:26,g:91,b:171},key:"Water"};//包括海河湖
map_landtype.Trees={color:{r:53,g:130,b:33},key:"Trees",cost:4};
map_landtype.FloodedVegetation={color:{r:135,g:209,b:158},key:"FloodedVegetation"};//淹没植被，季节性淹没
map_landtype.Crops={color:{r:255,g:219,b:92},key:"Crops"};//农作物，不到树木高度
map_landtype.BuiltArea={color:{r:237,g:2,b:42},key:"BuiltArea",cost:2};
map_landtype.BareGround={color:{r:237,g:233,b:228},key:"BareGround"};//荒原（没有植被的沙石）
map_landtype.SnowIce={color:{r:242,g:250,b:255},key:"SnowIce"};
map_landtype.Clouds={color:{r:200,g:200,b:200},key:"Clouds"};//因为被云遮挡而未知
map_landtype.Rangeland={color:{r:239,g:207,b:168},key:"Rangeland",cost:2};//放牧地（这里的颜色是根据Esri数据的颜色确定的，而非由纹理图片提取）

function initMaterial()
{
    var mat_frame=new BABYLON.StandardMaterial("mat_frame",scene);
    mat_frame.sideOrientation=BABYLON.Mesh.DOUBLESIDE;
    mat_frame.backFaceCulling=false;
    mat_frame.freeze();
    mat_frame.wireframe=true;
    map_mat.mat_frame=mat_frame;

    var mat_alpha=new BABYLON.StandardMaterial("mat_alpha",scene);
    mat_alpha.alpha=0.3;
    mat_alpha.diffuseColor=new BABYLON.Color3(153/255,217/255,234/255);
    mat_alpha.freeze();
    map_mat.mat_alpha=mat_alpha;

    var mat_debug=new BABYLON.StandardMaterial("mat_debug",scene);
    mat_debug.alpha=0.2;
    mat_debug.diffuseColor=new BABYLON.Color3(0.1,0.2,1);
    mat_debug.useLogarithmicDepth = true;
    mat_debug.freeze();
    map_mat.mat_debug=mat_debug;

    var mat_red=new BABYLON.StandardMaterial("mat_red",scene);
    mat_red.diffuseColor=new BABYLON.Color3(1,0,0);
    mat_red.useLogarithmicDepth = true;
    mat_red.freeze();
    map_mat.mat_red=mat_red;
    var mat_green=new BABYLON.StandardMaterial("mat_green",scene);
    mat_green.diffuseColor=new BABYLON.Color3(0,1,0);
    mat_green.useLogarithmicDepth = true;
    mat_green.freeze();
    map_mat.mat_green=mat_green;
    var mat_blue=new BABYLON.StandardMaterial("mat_blue",scene);
    mat_blue.diffuseColor=new BABYLON.Color3(0,0,1);
    mat_blue.useLogarithmicDepth = true;
    mat_blue.freeze();
    map_mat.mat_blue=mat_blue;
    var mat_yellow2=new BABYLON.StandardMaterial("mat_yellow2",scene);
    mat_yellow2.diffuseColor=new BABYLON.Color3(252/255,225/255,170/255);
    mat_yellow2.useLogarithmicDepth = true;//对数深度和非对数深度混用，会造成深度显示的不确定性！?(对数深度的一般比常规深度更浅)
    mat_yellow2.freeze();
    map_mat.mat_yellow2=mat_yellow2;
    var mat_black=new BABYLON.StandardMaterial("mat_black",scene);
    mat_black.diffuseColor=new BABYLON.Color3(0,0,0);
    mat_black.useLogarithmicDepth = true;
    mat_black.freeze();
    map_mat.mat_black=mat_black;

    for(var key in map_landtype)
    {
        var landtype=map_landtype[key];
        var mat=new BABYLON.StandardMaterial("mat_"+key,scene);
        mat.diffuseColor=new BABYLON.Color3(landtype.color.r/255,landtype.color.g/255,landtype.color.b/255);
        mat.backFaceCulling=false;
        mat.useLogarithmicDepth = true;
        mat.freeze();
        map_mat["mat_"+key]=mat;
        var mat2=new BABYLON.StandardMaterial("mat_"+key+"2",scene);
        mat2.diffuseTexture = new BABYLON.Texture("../ASSETS/IMAGE/LANDTYPE/esri/"+key+".png", scene);
        mat2.backFaceCulling=false;
        mat2.useLogarithmicDepth = true;
        mat2.freeze();
        map_mat["mat_"+key+"2"]=mat2;
    }

}

