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
    mat_debug.freeze();
    map_mat.mat_debug=mat_debug;

    var mat_green=new BABYLON.StandardMaterial("mat_green",scene);
    //mat_debug.alpha=0.2;
    mat_green.diffuseColor=new BABYLON.Color3(0,1,0);
    mat_green.freeze();
    map_mat.mat_green=mat_green;

    var mat_grass=new BABYLON.StandardMaterial("mat_grass",scene);
    mat_grass.diffuseColor=new BABYLON.Color3(112/255,146/255,46/255);
    mat_grass.freeze();
    mat_grass.backFaceCulling=false;
    map_mat.mat_grass=mat_grass;
    var mat_grass2=new BABYLON.StandardMaterial("mat_grass2",scene);
    mat_grass2.diffuseTexture = new BABYLON.Texture("../ASSETS/IMAGE/LANDTYPE/grass.jpg", scene);
    mat_grass2.backFaceCulling=false;
    //mat_grass2.useLogarithmicDepth = true;//正交相机不支持对数深度！！
    mat_grass2.freeze();
    map_mat.mat_grass2=mat_grass2;

    var mat_stone=new BABYLON.StandardMaterial("mat_stone",scene);
    mat_stone.diffuseColor=new BABYLON.Color3(82/255,81/255,74/255);
    mat_stone.backFaceCulling=false;
    mat_stone.freeze();
    map_mat.mat_stone=mat_stone;
    var mat_stone2=new BABYLON.StandardMaterial("mat_stone2",scene);
    mat_stone2.diffuseTexture = new BABYLON.Texture("../ASSETS/IMAGE/LANDTYPE/stone.png", scene);
    mat_stone2.backFaceCulling=false;
    //mat_stone2.useLogarithmicDepth = true;
    mat_stone2.freeze();
    map_mat.mat_stone2=mat_stone2;
}