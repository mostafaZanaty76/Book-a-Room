$(function() {
    $('input, select').on('focus', function() {
        $(this).addClass('active-input');
    }).on('blur', function() {
        $(this).removeClass('active-input');
    });

    $('#country').on('change', function() {
        var country = $(this).val();
        var cities = {
            'Egypt': ['Cairo', 'Alexandria', ' Sharm El-Shaikh', 'Hurghada'],
            'Saudi Arabia': ['Riyadh', 'Jeddah', 'Dammam', 'Mecca'],
            'The UAE': ['Dubai', 'Abu Dhabi', 'Eye', 'Ras Al Khaimah'],
        };
        var cityDropdown = $('#city');
        cityDropdown.empty().append('<option value="">Select City</option>');
        if (country && cities.hasOwnProperty(country)) {
            $.each(cities[country], function(index, city) {
                cityDropdown.append('<option value="' + city + '">' + city + '</option>');
            });
        }
    });

    $('#bookingForm').on('submit', function(event) {
        event.preventDefault();
        var form = $(this);
        var name = $('#name').val();
        var phone = $('#phone').val();
        var checkInDate = new Date($('#checkInDate').val());
        var checkOutDate = new Date($('#checkOutDate').val());
        var country = $('#country').val();
        var city = $('#city').val();
        var rooms = $('#rooms').val();

        form.find('.error-message').hide();

        var isValid = true;

        if (!name) {
            $('#nameError').text('Please enter your name').show();
            isValid = false;
        }
        if (!phone || !phone.match(/^05\d{8}$/)) {
            $('#phoneError').text('Please enter a valid phone number').show();
            isValid = false;
        }
        if (!checkInDate || !checkOutDate || checkOutDate <= checkInDate) {
            $('#startDateError').text('Please select a valid start and end date').show();
            $('#endDateError').text('Please select a valid start and end date').show();
            isValid = false;
        }
        if (!country) {
            $('#countryError').text('Please select a country').show();
            isValid = false;
        }
        if (!city) {
            $('#cityError').text('Please select a city').show();
            isValid = false;
        }
        if (!rooms || rooms < 1) {
            $('#roomsError').text('Please enter a valid number of rooms').show();
            isValid = false;
        }

        if (isValid) {
            var timeDifference = checkOutDate.getTime() - checkInDate.getTime();
            var numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24)); 

            var confirmationMessage = name + ', thank you for your booking. You will be staying for ' + numberOfDays + ' days.';
            alert(confirmationMessage);
            form[0].reset(); 
        }
    });

    $('input, select').on('input change', function() {
        $(this).siblings('.error-message').hide();
    });

    function resetForm() {
        $('#bookingForm')[0].reset();
        $('.error-message').hide();
    }

    $('.withe').on('click', resetForm);
});
