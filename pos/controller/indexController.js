// navigation
import {CustomerAPI} from "../db/CustomerAPI.js";
import {ItemAPI} from "../db/ItemAPI.js";

const customerAPI = new CustomerAPI();
const itemapi = new ItemAPI();


$('#customer').css('display','none');
$('#item').css('display','none');
$('#order').css('display','none');
$('#order_details').css('display','none');

$('#home_nav').on('click', () => {
    $('#home').css('display', 'block');
    $('#customer').css('display', 'none');
    $('#item').css('display', 'none');
    $('#order').css('display', 'none');
    $('#order_details').css('display','none');

    $('#home_nav').addClass('active-page');
    $('#customer_nav').removeClass('active-page');
    $('#item_nav').removeClass('active-page');
    $('#order_nav').removeClass('active-page');
    $('#order_details_nav').removeClass('active-page');
});

$('#customer_nav, #customer_link').on('click', () => {
    $('#home').css('display', 'none');
    $('#customer').css('display', 'block');
    $('#item').css('display', 'none');
    $('#order').css('display', 'none');
    $('#order_details').css('display','none');
    loadCustomerTable();

    $('#home_nav').removeClass('active-page');
    $('#customer_nav').addClass('active-page');
    $('#item_nav').removeClass('active-page');
    $('#order_nav').removeClass('active-page');
    $('#order_details_nav').removeClass('active-page');
});

$('#item_nav, #item_link').on('click', () => {
    $('#home').css('display', 'none');
    $('#customer').css('display', 'none');
    $('#item').css('display', 'block');
    $('#order').css('display', 'none');
    $('#order_details').css('display','none');
    loadItemTable()

    $('#home_nav').removeClass('active-page');
    $('#customer_nav').removeClass('active-page');
    $('#item_nav').addClass('active-page');
    $('#order_nav').removeClass('active-page');
    $('#order_details_nav').removeClass('active-page');
});

$('#order_nav, #order_link').on('click', () => {
    $('#home').css('display', 'none');
    $('#customer').css('display', 'none');
    $('#item').css('display', 'none');
    $('#order').css('display', 'block');
    $('#order_details').css('display','none');
    loadCustomerTable();
    loadItemTable();

    $('#home_nav').removeClass('active-page');
    $('#customer_nav').removeClass('active-page');
    $('#item_nav').removeClass('active-page');
    $('#order_nav').addClass('active-page');
    $('#order_details_nav').removeClass('active-page');

});

$('#order_details_nav').on('click', () => {
    $('#home').css('display', 'none');
    $('#customer').css('display', 'none');
    $('#item').css('display', 'none');
    $('#order').css('display', 'none');
    $('#order_details').css('display','block');

    $('#home_nav').removeClass('active-page');
    $('#customer_nav').removeClass('active-page');
    $('#item_nav').removeClass('active-page');
    $('#order_nav').removeClass('active-page');
    $('#order_details_nav').addClass('active-page');
});



// Get the canvas element
const ctx = document.getElementById('lineChart').getContext('2d');

// Define data
const data = {
    labels: ['January', 'March', 'May', 'July', 'September','November'],
    datasets: [{
        label: 'Revenue',
        data: [50000, 75000, 88000, 65000, 121000,96000],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: '#D000F7',
        borderWidth: 3
    }]
};

// Define chart options
const options = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
};

// Create the line chart
const myChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
});
myChart.update();

const count = $('.count');

/*export function setCounts(){
    count.eq(0).text(customer_db.length);
    count.eq(1).text(item_db.length);
    count.eq(2).text(order_db.length);
}*/

// setCounts();

const loadCustomerTable = function () {
    customerAPI.getAllCustomer()
        .then((responseText) => {
            let customer_db = JSON.parse(responseText);
            console.log(customer_db===null);
            $('tbody').eq(0).empty();
            $("#custId").empty();
            customer_db.forEach((customer) => {
                console.log("Done",customer.customer_id);
                $('tbody').eq(0).append(
                    `<tr>
                        <th row='span'>${customer.customer_id}</th>
                        <td>${customer.name}</td>
                        <td>${customer.address}</td>
                        <td>${customer.salary}</td>
                    </tr>`
                );

                let recode = `<option class="options">${customer.customer_id}</option>`
                $("#custId").append(recode);

                $("#custId").prop("selectedIndex", -1);

            });
        })
        .catch((error) => {
            console.log(error);
            showError('fetch Unsuccessful', error);
        });
}





const loadItemTable = function () {
    itemapi.getAllItem()
        .then((responseText) => {
            let item_db = JSON.parse(responseText);
            console.log(item_db===null);
            $('tbody').eq(1).empty();
            $("#item_Id").empty();
            item_db.forEach((item) => {
                console.log(item.item_code);
                $('tbody').eq(1).append(
                    `<tr>
                        <th row='span'>${item.item_code}</th>
                        <td>${item.description}</td>
                        <td>${item.unit_price}</td>
                        <td>${item.qty}</td>
                    </tr>`
                );
                let recode1 = `<option class="options">${item.item_code}</option>`
                $("#item_Id").append(recode1);
            });
        })
        .catch((error) => {
            console.log(error);
            showError('fetch Unsuccessful', error);
        });
}

