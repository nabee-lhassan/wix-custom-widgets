import location from 'wix-location';
import { searchProperty } from 'backend/searchProperty.jsw';
import wixStorage from 'wix-storage';
import wixWindow from 'wix-window';

$w.onReady(function () {
    // Get current page path
    const currentPath = location.path;
    const pageTitle = currentPath[0] || "Home";

    // Set page title if path is "searchproperty"
    if (pageTitle === "searchproperty") {
        $w('#page-title').text = 'Search Property';
    }

    // Handle search button click
    $w('#buttonSearch').onClick(() => {
        // Get stored user token from session
        const userToken = wixStorage.session.getItem("userToken");

        console.log("User Token:", userToken); // For debugging

        if (!userToken) {
            console.log("User not logged in or token missing.");
            return;
        }

        // Collect form values
        const data = {
            address: $w('#address').value,
            postcode: $w('#postcode').value
        };

        // Call backend function
        searchProperty(data, userToken )
            .then(response => {
                

                if (response.success) {

                    if(response.street_data){
                         console.log('Search successful:', response);
                    $w('#sectionProperty').show()
					$w('#PropertyName').text = 'Addredd :' + ' ' + response.search_details.search_address
					$w('#propertyType').text = 'Type :' + ' ' + response.street_data.data.type
					$w('#UsedCredits').text = 'Credits Deducted :' + ' ' +  String(response.credits_deducted) 
                    }else{
                        console.log('Insuficiant Credit')

                         wixWindow.openLightbox("error popup", {
           message: "Insuficiant Credit"
            });
                        
                    }
                  


                    // You can display this message on UI if needed
                } else {
                    console.log('Search failed:', response.message);
                }
            })
            .catch(error => {
                console.log('Frontend Error:', error.message);
            });
    });
});
