
var step_move=50;//先暂时设置一个固定的步长，有时间再按照视野范围计算动态步长！！
function initGuiControl()
{
    advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("ui1");

    //右侧的运动控制按钮
    var panel2=new BABYLON.GUI.Rectangle();
    panel2.width=0.25;
    panel2.top="50px";
    panel2.height=0.25;
    panel2.horizontalAlignment=BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    panel2.verticalAlignment=BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    panel2.thickness=0
    advancedTexture.addControl(panel2);
    global_panel2=panel2;
    var button_fw=BABYLON.GUI.Button.CreateSimpleButton("button_fw","复位");
    //button_fw.width=0.2;
    button_fw.height="40px";
    button_fw.width="40px";
    //button_fw.top="10px";
    button_fw.left="-20px";
    button_fw.color="white";
    button_fw.cornerRadius=20;
    button_fw.background="green";
    button_fw.onPointerUpObservable.add(function(){
         if(!flag_cfollowm)
         {

                 camera.position=pos_camera0.clone();
                 camera.rotation=rot_camera0.clone();
         }
    });
    panel2.addControl(button_fw);

    var button_fw=BABYLON.GUI.Button.CreateSimpleButton("button_q","前");
    //button_fw.width=0.2;
    button_fw.height="40px";
    button_fw.width="40px";
    button_fw.left="-20px";
    button_fw.top="-40px";

    button_fw.color="white";
    button_fw.cornerRadius=20;
    button_fw.background="green";
    button_fw.onPointerUpObservable.add(function(){
        if(!flag_cfollowm)
        {
                camera.position.z=camera.position.z+step_move;
        }
    });
    panel2.addControl(button_fw);

    var button_fw=BABYLON.GUI.Button.CreateSimpleButton("button_h","后");
    //button_fw.width=0.2;
    button_fw.height="40px";
    button_fw.width="40px";
    button_fw.left="-20px";
    button_fw.top="40px";
    button_fw.color="white";
    button_fw.cornerRadius=20;
    button_fw.background="green";
    button_fw.onPointerUpObservable.add(function(){
        if(!flag_cfollowm)
        {

                camera.position.z=camera.position.z-step_move;
        }
    });
    panel2.addControl(button_fw);

    var button_fw=BABYLON.GUI.Button.CreateSimpleButton("button_s","上");
    //button_fw.width=0.2;
    button_fw.height="40px";
    button_fw.width="40px";
    button_fw.left="60px";
    button_fw.top="-40px";
    button_fw.color="white";
    button_fw.cornerRadius=20;
    button_fw.background="green";
    button_fw.onPointerUpObservable.add(function(){
        if(!flag_cfollowm)
        {

                camera.position.y=camera.position.y+step_move;
        }
    });
    panel2.addControl(button_fw);

    var button_fw=BABYLON.GUI.Button.CreateSimpleButton("button_x","下");
    //button_fw.width=0.2;
    button_fw.height="40px";
    button_fw.width="40px";
    button_fw.left="60px";
    button_fw.top="40px";
    button_fw.color="white";
    button_fw.cornerRadius=20;
    button_fw.background="green";
    button_fw.onPointerUpObservable.add(function(){
        if(!flag_cfollowm)
        {

                camera.position.y=camera.position.y-step_move;
        }
    });
    panel2.addControl(button_fw);

    var button_fw=BABYLON.GUI.Button.CreateSimpleButton("button_z","左");
    //button_fw.width=0.2;
    button_fw.height="40px";
    button_fw.width="40px";
    button_fw.left="-60px";
    //button_fw.top="-40px";
    button_fw.color="white";
    button_fw.cornerRadius=20;
    button_fw.background="green";
    button_fw.onPointerUpObservable.add(function(){
        if(!flag_cfollowm)
        {

                camera.position.x=camera.position.x-step_move;

        }
    });
    panel2.addControl(button_fw);

    var button_fw=BABYLON.GUI.Button.CreateSimpleButton("button_y","右");
    //button_fw.width=0.2;
    button_fw.height="40px";
    button_fw.width="40px";
    button_fw.left="20px";
    button_fw.color="white";
    button_fw.cornerRadius=20;
    button_fw.background="green";
    button_fw.onPointerUpObservable.add(function(){
        if(!flag_cfollowm)
        {

                camera.position.x=camera.position.x+step_move;
        }
    });
    panel2.addControl(button_fw);

    initGuiControl2();
}
function initGuiControl2()
{//左侧用来提示导航信息的文本区域
    var panel=new BABYLON.GUI.StackPanel();
    panel.width=0.25;
    panel.horizontalAlignment=BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    panel.verticalAlignment=BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    advancedTexture.addControl(panel);
    global_panel_text=panel;
    panel.isPickable=false;
}
