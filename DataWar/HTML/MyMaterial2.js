//初始化用到的各种材质
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
    //mat_yellow2.useLogarithmicDepth = true;//对数深度和非对数深度混用，会造成深度显示的不确定性！?(对数深度的一般比常规深度更浅)
    mat_yellow2.freeze();
    map_mat.mat_yellow2=mat_yellow2;

    var mat_grass=new BABYLON.StandardMaterial("mat_grass",scene);
    mat_grass.diffuseColor=new BABYLON.Color3(112/255,146/255,46/255);
    mat_grass.backFaceCulling=false;
    mat_grass.useLogarithmicDepth = true;
    mat_grass.freeze();
    map_mat.mat_grass=mat_grass;
    var mat_grass2=new BABYLON.StandardMaterial("mat_grass2",scene);
    mat_grass2.diffuseTexture = new BABYLON.Texture("../ASSETS/IMAGE/LANDTYPE/grass2.png", scene);
    mat_grass2.backFaceCulling=false;
    mat_grass2.useLogarithmicDepth = true;//正交相机不支持对数深度！！
    mat_grass2.freeze();
    map_mat.mat_grass2=mat_grass2;

    var mat_stone=new BABYLON.StandardMaterial("mat_stone",scene);
    mat_stone.diffuseColor=new BABYLON.Color3(82/255,81/255,74/255);
    mat_stone.backFaceCulling=false;
    mat_stone.useLogarithmicDepth = true;
    mat_stone.freeze();
    map_mat.mat_stone=mat_stone;
    var mat_stone2=new BABYLON.StandardMaterial("mat_stone2",scene);
    mat_stone2.diffuseTexture = new BABYLON.Texture("../ASSETS/IMAGE/LANDTYPE/stone.png", scene);
    mat_stone2.backFaceCulling=false;
    mat_stone2.useLogarithmicDepth = true;
    mat_stone2.freeze();
    map_mat.mat_stone2=mat_stone2;

    var mat_lake=new BABYLON.StandardMaterial("mat_lake",scene);
    mat_lake.diffuseColor=new BABYLON.Color3(93/255,143/255,180/255);
    mat_lake.backFaceCulling=false;
    mat_lake.useLogarithmicDepth = true;
    mat_lake.freeze();
    map_mat.mat_lake=mat_lake;
    var mat_lake2=new BABYLON.StandardMaterial("mat_lake2",scene);
    mat_lake2.diffuseTexture = new BABYLON.Texture("../ASSETS/IMAGE/LANDTYPE/lake.png", scene);
    mat_lake2.backFaceCulling=false;
    mat_lake2.useLogarithmicDepth = true;
    mat_lake2.freeze();
    map_mat.mat_lake2=mat_lake2;

    var mat_yulin=new BABYLON.StandardMaterial("mat_yulin",scene);
    mat_yulin.diffuseColor=new BABYLON.Color3(33/255,68/255,44/255);
    mat_yulin.backFaceCulling=false;
    mat_yulin.useLogarithmicDepth = true;
    mat_yulin.freeze();
    map_mat.mat_yulin=mat_yulin;
    var mat_yulin2=new BABYLON.StandardMaterial("mat_yulin2",scene);
    mat_yulin2.diffuseTexture = new BABYLON.Texture("../ASSETS/IMAGE/LANDTYPE/yulin.png", scene);
    mat_yulin2.backFaceCulling=false;
    mat_yulin2.useLogarithmicDepth = true;
    mat_yulin2.freeze();
    map_mat.mat_yulin2=mat_yulin2;

    var mat_city=new BABYLON.StandardMaterial("mat_city",scene);
    //mat_city.diffuseColor=new BABYLON.Color3(88/255,87/255,86/255);
    mat_city.diffuseColor=new BABYLON.Color3(147/255,151/255,140/255);
    mat_city.backFaceCulling=false;
    mat_city.useLogarithmicDepth = true;
    mat_city.freeze();
    map_mat.mat_city=mat_city;
    var mat_city2=new BABYLON.StandardMaterial("mat_city2",scene);
    mat_city2.diffuseTexture = new BABYLON.Texture("../ASSETS/IMAGE/LANDTYPE/city2.png", scene);
    mat_city2.backFaceCulling=false;
    mat_city2.useLogarithmicDepth = true;
    mat_city2.freeze();
    map_mat.mat_city2=mat_city2;

    var mat_village=new BABYLON.StandardMaterial("mat_village",scene);
    mat_village.diffuseColor=new BABYLON.Color3(133/255,130/255,71/255);
    mat_village.backFaceCulling=false;
    mat_village.useLogarithmicDepth = true;
    mat_village.freeze();
    map_mat.mat_village=mat_village;
    var mat_village2=new BABYLON.StandardMaterial("mat_village2",scene);
    mat_village2.diffuseTexture = new BABYLON.Texture("../ASSETS/IMAGE/LANDTYPE/village.png", scene);
    mat_village2.backFaceCulling=false;
    mat_village2.useLogarithmicDepth = true;
    mat_village2.freeze();
    map_mat.mat_village2=mat_village2;
}

function initMaterial2()
{

}