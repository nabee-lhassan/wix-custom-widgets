import { loginUser } from 'backend/api.jsw';
import wixStorage from 'wix-storage'; //  Wix storage import karein
import wixWindow from 'wix-window';

import wixLocation from 'wix-location';

$w.onReady(function () {

  
    

var responseMSG = $w("#responseMSG");
 responseMSG.text = ""; 



    $w("#loginButton").onClick(() => {
        const email = $w("#logemailInput").value;
        const password = $w("#logpasswordInput").value;

        // display Loader

        $w('#loginLoaderImage').show()
        

        if (!email || !password) {
            responseMSG.text = " Please enter email and password";
            return;
        }

        const credentials = { email, password };

        console.log(" Sending Login Request:", credentials);

        loginUser(credentials)
            .then(response => {
                console.log(" Response Received:", response);
                if (response.success) {
                    responseMSG.text = response.message;
                    responseMSG.style.color = "green";

                    //  Save user info in Wix Session Storage
                    wixStorage.session.setItem("userToken", response.token);
                    wixStorage.session.setItem("firstName", response.firstName);
                    wixStorage.session.setItem("lastName", response.lastName);
                    wixStorage.session.setItem("email", response.email);
                    wixStorage.session.setItem("account_type", response.account_type);
                    wixStorage.session.setItem("credits", response.credits);
                    wixStorage.session.setItem("subscribe_for_news", response.subscribe_for_news);
                    // wixStorage.session.setItem("purchased_credits",  response.purchased_credits);
                    
                    
                    wixLocation.to("/welcome");

                } else {
                    // responseMSG.text = response.error;
                    // responseMSG.style.color = "red";

                    wixWindow.openLightbox("error popup", {
                    message: response.error
            });
                    
                }

                // hide loader

                $w('#loginLoaderImage').hide()
            })
            .catch(err => {
                console.log('API Call Error:', err);
                wixWindow.openLightbox("Email Already Exists", {
           message: err.message
            });
                responseMSG.text = "Error: " + err.message;
                responseMSG.style.color = "red";

                // hide loader


                $w('#loginLoaderImage').hide()
            });
    });

});
