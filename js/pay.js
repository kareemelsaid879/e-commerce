document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('purchaseForm');
    const nameInput = document.getElementById('name');
    const phoneinput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const addressInput = document.getElementById('address');
    const cityInput = document.getElementById('city');
    const countrySelect = document.getElementById('country');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const addressError = document.getElementById('addressError');
    const cityError = document.getElementById('cityError');
    const countryError = document.getElementById('countryError');
    let cart_header_cnt= document.getElementsByClassName("count_item_header")
    for (var i=0 ; i<cart_header_cnt.length ;i++){
                cart_header_cnt[i].textContent=localStorage.getItem('cartcount')
            }
    // console.log('Hi '+nameInput.value+`, your purchased h as been done .
    //     we will call you on `+ phoneinput.value+ ` . your address is `
    //     +addressInput.value+ ` . your order will be handed for in ` +Date())

    form.addEventListener('submit', function(event) {
        let isValid = true;

        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Please enter your full name.';
            isValid = false;
        } else {
            nameError.textContent = '';
        }

        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Please enter your email address.';
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address.';
            isValid = false;
        } else {
            emailError.textContent = '';
        }

        if (addressInput.value.trim() === '') {
            addressError.textContent = 'Please enter your shipping address.';
            isValid = false;
        } else {
            addressError.textContent = '';
        }

        // if (cityInput.value.trim() === '') {
        //     cityError.textContent = 'Please enter your city.';
        //     isValid = false;
        // } else {
        //     cityError.textContent = '';
        // }

        // if (countrySelect.value === '') {
        //     countryError.textContent = 'Please select your country.';
        //     isValid = false;
        // } else {
        //     countryError.textContent = '';
        // }

        if (!isValid) {
            event.preventDefault(); // Prevent form submission if there are errors
        } else {
            // You would typically send the form data to a server here
            event.preventDefault();
            const now = new Date();
            const fiveDaysLater = new Date(now);
            fiveDaysLater.setDate(now.getDate() + 5);
            
            window.alert(`Hi ${nameInput.value}, your purchase process with ${localStorage.getItem("total_pay")} has been done .
                we will call you on ${phoneinput.value} . your address is ${addressInput.value} . 
                your order will be handed over by ${fiveDaysLater.toLocaleDateString()}` );
                localStorage.setItem('cartcount','0')
                localStorage.setItem('cartproducts','empty')
            setTimeout(() => form.submit(), 100);
        }
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});