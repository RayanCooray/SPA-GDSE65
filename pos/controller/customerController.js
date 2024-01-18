import {CustomerModel} from "../model/customerModel.js";
import {CustomerAPI} from "../db/CustomerAPI.js";

//customer form
const customer_Id = $('#customerId');
const full_name = $('#fullname');
const address = $('#address');
const salary = $('#salary');
const customer_btn = $('#customer_btn button');
const  customer_search = $('#customer_search input');
const  customer_search_select = $('#customer_search select');

// populateCustomerTable();

const customerAPI = new CustomerAPI();
customer_Id.val(generateCustomerId());

//add customer
customer_btn.eq(0).on('click', () => {
    let customerId = customer_Id.val().trim();
    let fullName = full_name.val().trim();
    let addressVal = address.val().trim();
    let salaryVal = parseFloat(salary.val().trim());

    if (validate(customerId,'customer Id') && validate(fullName,'full name') &&
        validate(addressVal,'address') && validate(salaryVal,'salary')) {

        let customerModel = new CustomerModel(customerId, fullName, addressVal, salaryVal);
        customerAPI.savecustomer(customerModel).then(r => {
            Swal.fire(
                r,`Successful`,`Success`
            )
            loadCustomerTable();
            clearInputs();
        });
    }
});



//update customer
customer_btn.eq(1).on('click', () => {
    let customerId = customer_Id.val().trim();
    let fullName = full_name.val().trim();
    let addressVal = address.val().trim();
    let salaryVal = parseFloat(salary.val().trim());

    if (validate(customerId,'customer Id') && validate(fullName,'full name') &&
        validate(addressVal,'address') && validate(salaryVal,'salary')) {

        let customer = new CustomerModel(customerId, fullName, addressVal, salaryVal);
        let index = getCustomerIndex(customerId);

        customerAPI.updateCustomer(customer)
            .then((responseText) => {
                Swal.fire(
                    responseText,
                    'Successful ',
                    'success'
                )
                loadCustomerTable();
                clearInputs();

            })
            .catch((error) => {
                showError('Update Unsucessfull', error);
            });
        clearInputs();


    }
});



//delete customer
customer_btn.eq(2).on('click', () => {
    // let customerId = customer_Id.val().trim();
    // if (validate(customerId, 'customer Id')) {
    //     let index = getCustomerIndex(customerId);
    //
    // }
    let customerIdValue = customer_Id.val().trim();
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete'
    }).then((result) => {
        if (result.isConfirmed) {
            customerAPI.deleteCustomer(customerIdValue)
                .then((responseText) => {
                    Swal.fire(
                        responseText,
                        'Successful',
                        'success'
                    )
                    loadCustomerTable()
                    clearInputs();
                })
                .catch((error) => {
                    console.log(error);
                    showError('Customer delete Unsucessfull', error);
                });
        }
    });
});

//customer search
// customer_search.on('input', function() {
//     let option = customer_search_select.find(":selected").text();
//     let searchTerm = customer_search.val().trim();
//     // let matchingCustomers = customer_db.filter(customer => customer[option] === searchTerm);
//
//     if (matchingCustomers.length > 0) {
//         $('tbody').eq(0).empty();
//         matchingCustomers.forEach(customer => {
//             $('tbody').eq(0).append(
//                 `<tr>
//                     <th scope="row">${customer.customer_id}</th>
//                     <td>${customer.name}</td>
//                     <td>${customer.address}</td>
//                     <td>${customer.salary}</td>
//                 </tr>`
//             );
//         });
//     } else {
//         loadCustomerTable();
//     }
// });
//load customer


$('tbody').eq(0).on('click', 'tr', function(){
    const customerIdValue = $(this).find('th').text();

    if (customerIdValue) {
        customerAPI.getCustomer(customerIdValue)
            .then((responseText) => {
                let customer = JSON.parse(responseText);
                customer_Id.val(customer.customer_id);
                full_name.val(customer.name);
                address.val(customer.address);
                salary.val(customer.salary);
            })
            .catch((error) => {
                console.log(error);
                showError('Save Unsucessfull', error);
            });
    }
});

//load the customer table
const loadCustomerTable = function () {
    customerAPI.getAllCustomer()
        .then((responseText) => {
            let customer_db = JSON.parse(responseText);
            console.log(customer_db===null);
            $('tbody').eq(0).empty();
            customer_db.forEach((customer) => {
                console.log(customer.customer_id);
                $('tbody').eq(0).append(
                    `<tr>
                        <th row='span'>${customer.customer_id}</th>
                        <td>${customer.name}</td>
                        <td>${customer.address}</td>
                        <td>${customer.salary}</td>
                    </tr>`
                );
            });
        })
        .catch((error) => {
            console.log(error);
            showError('fetch Unsuccessful', error);
        });
}
const getCustomerIndex = function (customerId) {
    // return customer_db.findIndex(customer => customer.customer_id === customerId);
}
function generateCustomerId(){
    customerAPI.generateCustomerId().then((custId) =>{
        customer_Id.val(JSON.parse(custId));
    }).catch((error)=>{
        showError('Fetching Error', 'Error generating customer ID');
        console.error('Error generating customer ID:',error);
    })
}
function clearInputs(){
    full_name.val('');
    address.val('');
    salary.val('');
    generateCustomerId();
}
function showError(title, text) {
    Swal.fire({
        icon: 'error',
        title: title,
        text: text,
        footer: '<a href="">Why do I have this issue?</a>'
    });
}
function validate(value, field_name){
    if (!value){
        Swal.fire({
            icon: 'warning',
            title: `Please enter the ${field_name}!`
        });
        return false;
    }
    return true;
}

export class CustomerControll {
}