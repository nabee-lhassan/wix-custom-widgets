import { registerUser } from 'backend/api.jsw'; 
import { allUsers } from 'backend/api.jsw'; 
import wixWindow from 'wix-window';

$w.onReady(function () {


    var responseMSG = $w("#responseMSG");
    responseMSG.text = ""; 

    $w("#registerButton").onClick(() => {
        var firstName = $w("#input1").value;  
        var lastName = $w("#input2").value;    
        var email = $w("#input3").value;           
        var phoneNumber = $w("#input4").value = 'none';     
        var password = $w("#input5").value;

        $w("#createLoaderImage").show(); 

        if (!email || !password || !firstName || !lastName) {
            console.log(" Please fill all fields");
            
            $w("#createLoaderImage").hide();
           wixWindow.openLightbox("error popup", {
           message: "Please fill out the fields"
            });

            return;
        }

        allUsers()
            .then(data => {
                let usersEmail = data.users.map(user => user.email);
                console.log(usersEmail);

                if (usersEmail.includes(email)) {
                    wixWindow.openLightbox("error popup");
                    console.log('email already exist');
                    $w("#createLoaderImage").hide();
                } else {

                    if (password.length < 8){
                        $w("#createLoaderImage").hide();
                        responseMSG.text = "Please enter Minimum 8 charactor"
                                responseMSG.style.color = "green";

                    }else{

                        var userDetails = {
                        first_name: firstName,
                        last_name: lastName,
                        email: email,
                        phone_number: phoneNumber,
                        password: password
                    };

                    console.log(" Sending Data to Backend:", userDetails);

                    registerUser(userDetails)
                        .then(response => {
                            console.log(" Response Received:", response);
                            $w("#createLoaderImage").hide();

                            if (response.success) {
                                console.log('Registration Successful', response);
                                console.log(response.message || " Registration Successful!"); 

                               

                                $w("#registerButton").disable;
                                wixWindow.openLightbox("Register successfull");
                               
                                // responseMSG.text = response.message;
                                // responseMSG.style.color = "green";
                                


                            } else {
                                console.log(' Error:', response.error);
                                console.log(response.error || " Registration Failed!"); 
                                responseMSG.text = response.error || " Registration Failed!";
                            }
                        })
                        .catch(err => {
                            $w("#createLoaderImage").hide();
                            console.log('API Call Error:', err);
                            console.log(" Error: " + err.message);  
                        });

                        responseMSG.text = ""
                                responseMSG.style.color = "";
                    }

                    
                }
            })
            .catch(err => console.error(err));
    });
});
