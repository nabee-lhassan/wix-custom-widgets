import wixWindow from 'wix-window';

$w.onReady(function () {
    let receivedData = wixWindow.lightbox.getContext(); // Lightbox me pass kiya gaya data lo
    if (receivedData && receivedData.message) {
        $w('#popupMSG').text = receivedData.message; // Lightbox ke text ko update karo
    }
});
