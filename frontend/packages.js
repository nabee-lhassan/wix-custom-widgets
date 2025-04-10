import { getPackages } from "backend/packages.jsw";
import wixLocation from 'wix-location';

$w.onReady(function () {
    // **Table ke previous data clear karna**
    $w("#packageTable").rows = [];

    

    getPackages()
        .then(data => {
            console.log("Fetched Data:", data.data); // Debugging ke liye
            $w('#packageLoader').hide()
            $w('#packageTable').show()
            

            if (!data.data || data.data.length === 0) {
                console.log("No data found.");
                return;
            }

            // **Table Data Format**
            let tableData = data.data.map(e => {
                return {
                    "event": e.package_name,
                    "description": e.package_description,
                    "credits": e.credits,
                    "price": `$${e.price}`, // Price ko formatted rakho
                    "id": e.id // ID for redirection
                };
            });

            // **Table ko update karo**
            $w("#packageTable").rows = tableData;

            // **Row Click Event**
            $w("#packageTable").onRowSelect(event => {
                console.log("working")
                
                const selectedRow = event.rowData;
                console.log(selectedRow.id)
                
                
                    wixLocation.to(`/packagedetail?id=${selectedRow.id}`);

                // if (selectedRow && selectedRow.id) {
                //     wixLocation.to(`/packageDetail?id=${selectedRow.id}`);
                // }
            });

        })
        .catch(error => {
            console.log('Error in data fetching:', error);
             $w('#packageLoader').hide()
            
        });
});
