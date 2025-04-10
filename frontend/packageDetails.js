import wixLocation from 'wix-location';
import wixWindow from 'wix-window';
import wixStorage from 'wix-storage'; 



$w.onReady(function () {
    let query = wixLocation.query;
    let packageId = query.id; // Query se ID extract karna
    


   

    console.log('package id', packageId);

    if (!packageId) {
        console.log("No package ID found!");
            wixWindow.openLightbox("error popup", {
                    message: "No package found"
            });
        return;
    }

    // Laravel API se package details fetch karna
    fetch(`https://forestgreen-rail-905681.hostingersite.com/api/packages`)
        .then(response => response.json())
        .then(data => {
            const packageData = data.data.find(pkg => pkg.id == packageId);

            if (packageData) {
                console.log("Fetched Package Data:", packageData);
               
              $w('#packageDetail-card').show()
                
                // UI Update
                $w("#D-package-title").text = packageData.package_name;
                $w("#D-package-description").text = packageData.package_description;
                $w("#D-package-credits").text = "Credits :" + packageData.credits;
                $w("#D-package-price").text = "$" + packageData.price;

                $w('#payNow').onClick(e=> {

                //  getting username from lockal storage
                 const savedUserName = wixStorage.session.getItem("firstName");
                 const userToken = wixStorage.session.getItem("userToken");

                 const pakageName =  packageData.package_name ;
                //  const pakageName =  $w("#D-package-title").text;
                 const pakageDes =  packageData.package_description;
                //  const pakageDes =  $w("#D-package-description").text;
                 const pakageCredits =   packageData.credits;
                //  const pakageCredits =   $w("#D-package-credits").text;
                 const pakagePrice =   packageData.price;
                //  const pakagePrice =   $w("#D-package-price").text;
                

                wixWindow.openLightbox("paymen-popup", 
                { 
                 
                 savedUserName: savedUserName,
                 userToken: userToken,
                 pakageName: pakageName,
                 pakageDes : pakageDes,
                 pakageCredits : pakageCredits,
                 pakagePrice : pakagePrice

                }
                
                
                );


                // console.log(pakageName, pakageDes, pakagePrice , stripeToken)
                    
                })




            } else {
                console.log("No package found with the given ID.");
                 
                   wixWindow.openLightbox("error popup", {
                    message: "No package found"
            });
                
            }
        })
        .catch(error => {
            console.log("Error fetching package details:", error);
        });
});
