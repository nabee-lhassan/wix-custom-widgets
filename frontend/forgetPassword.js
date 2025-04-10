import { forgetpass } from 'backend/forgetPassword.jsw';

$w.onReady(function () {
    $w('#forget-submit').onClick(() => {
        const userEmail = {
            email: $w('#forget-email').value
        };

        forgetpass(userEmail)
            .then(response => {
                console.log(response);

                if (response.success) {
                    console.log('Password Reset Request Successful');
                    console.log(response.message || "Request sent successfully!");
                } else {
                    console.log('Password Reset Failed');
                    console.log(response.message || "Failed to send reset request.");
                }
            })
            .catch(error => {
                console.log('Frontend Error:', error);
            });
    });
});
