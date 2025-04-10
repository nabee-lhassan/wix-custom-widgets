
import wixStorage from 'wix-storage';
import wixLocation from 'wix-location';

$w.onReady(function () {
  
    const token = wixStorage.session.getItem("userToken");

    
    const firstName = wixStorage.session.getItem("userName");
    if (firstName) {
        $w("#welcomeMessage").text = `Welcome, ${firstName}`;
    } else {
        $w("#welcomeMessage").text = "Welcome!";
    }

    
});