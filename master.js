import wixStorage from 'wix-storage'; 
import wixLocation from 'wix-location';

$w.onReady(function () {
    
    var userNameText = $w("#userNameText");
    userNameText.text = "";


    const savedUserName = wixStorage.session.getItem("firstName");
    const userToken = wixStorage.session.getItem("userToken"); // Token check karna zaroori hai


    

    $w('#searchAproperty').onClick((event) => {

         if (userToken) {
        wixLocation.to("/dashboard");
         
        return; 
    } else if(!userToken){

        wixLocation.to("/create-new-account");
         
        return; 

    }  
})

    const currentPath = wixLocation.path.join("/"); 

    if (userToken && currentPath === "login") {
        wixLocation.to("/welcome"); 
        return; 

    }else if(userToken && currentPath === "create-new-account"){
        wixLocation.to("/dashboard"); 
        return;
    
    }else if(!userToken && currentPath === "packages" || !userToken && currentPath === "dashboard" ){
        wixLocation.to("/login"); 
        return;
    
    }else if( !userToken && currentPath === "welcome"){
        wixLocation.to("/create-new-account"); 
        return;
    }



    if (savedUserName) {
        userNameText.text = "LogOut";
        $w('#horizontalMenu1').show()
        
        userNameText.onClick(() => {
            wixStorage.session.clear(); 
            wixLocation.to("/login");
            console.log("LogOut Button Clicked"); 
        });
    } else {
        userNameText.text = "Login";
        $w('#horizontalMenu1').hide()
        userNameText.onClick(() => {
            wixLocation.to("/login");
            console.log("Login Button Clicked"); 
        });
    }
});










