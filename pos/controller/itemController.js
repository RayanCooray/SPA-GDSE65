import {ItemModel} from "../model/itemModel.js";
import {ItemAPI} from "../db/ItemAPI.js";


//item form
const item_Code = $('#itemCode');
const description = $('#description');
const unit_price = $('#unitPrice');
const qty = $('#qty');
const item_btns = $('#item_btn button');
const item_search = $('#item_search input');
const item_search_select = $('#item_search select');
const url = 'http://localhost:8080/poss/item'

const itemApi = new ItemAPI();
item_Code.val(generateItemID());



//add item
item_btns.eq(0).on('click', () => {
   let itemCode = item_Code.val().trim();
   let desc = description.val().trim();
   let price = parseFloat(unit_price.val().trim());
   let qty_val = parseInt(qty.val());

   if (validate(itemCode, 'item code') && validate(desc, 'description') &&
   validate(price, 'unit price') && validate(qty_val, 'qty on hand')) {

       let itemModel = new ItemModel(itemCode, desc, price, qty_val);

       itemApi.saveitem(itemModel).then(r => {
           Swal.fire(
               r,`Successful`,`Success`
           )
           loadItemTable();
           clearInputs();
       })
   }
});



//update item
item_btns.eq(1).on('click', () => {
    let itemCode = item_Code.val().trim();
    let desc = description.val().trim();
    let price = parseFloat(unit_price.val().trim());
    let qty_val = parseInt(qty.val());

    if (validate(itemCode, 'item code') && validate(desc, 'description') &&
        validate(price, 'unit price') && validate(qty_val, 'qty on hand')) {

        let item = new ItemModel(itemCode, desc, price, qty_val);
        // let index = getItemIndex(itemCode);

        itemApi.updateItem(item)
            .then((responseText) => {
                Swal.fire(
                    responseText,
                    'Successful',
                    'success'
                )
                loadItemTable();
                clearInputs();

            })
            .catch((error) => {
                showError('Update Unsucessfull', error);
            });
        clearInputs();
    }
});


//
// //delete item
item_btns.eq(2).on('click', () => {
    let itemCode = item_Code.val().trim();


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
            itemApi.deleteItem(itemCode)
                .then((responseText) => {
                    Swal.fire(
                        responseText,
                        'Successful',
                        'success'
                    )
                    loadItemTable()
                    clearInputs();
                })
                .catch((error) => {
                    console.log(error);
                    showError('Customer delete Unsucessfull', error);
                });
        }
    });
});
//


// //item search
// item_search.on('input', function (){
//     let option = item_search_select.find(':selected').text();
//     let searchTerm = item_search.val().trim();
//     let matchingItems = item_db.filter(item => item[option] === searchTerm);
//
//     if (matchingItems.length > 0){
//         $('tbody').eq(1).empty();
//         matchingItems.forEach(item => {
//             $('tbody').eq(1).append(
//                 `<tr>
//                     <th scope="row">${item.item_code}</th>
//                     <td>${item.description}</td>
//                     <td>${item.unit_price}</td>
//                     <td>${item.qty}</td>
//                  </tr>`
//             );
//         });
//     }else{
//         loadItemTable();
//     }
// });

//load item
$('tbody').eq(1).on('click', 'tr', function() {
    const item_code_Value = $(this).find('th').text();

    if (item_code_Value) {
        itemApi.getItem(item_code_Value)
            .then((responseText) => {
                let item = JSON.parse(responseText);
                item_Code.val(item.item_code);
                description.val(item.description);
                unit_price.val(item.unit_price);
                qty.val(item.qty);
            })
            .catch((error) => {
                console.log(error);
                showError('Save Unsucessfull', error);
            });
    }
});
//
//load the item table
const loadItemTable = function () {
    itemApi.getAllItem()
        .then((responseText) => {
            let item_db = JSON.parse(responseText);
            console.log(item_db===null);
            $('tbody').eq(1).empty();
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
            });
        })
        .catch((error) => {
            console.log(error);
            showError('fetch Unsuccessful', error);
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
function generateItemID(){
    itemApi.generateItemID().then((itemId) =>{
        item_Code.val(JSON.parse(itemId));
    }).catch((error)=>{
        showError('Fetching Error', 'Error generating customer ID');
        console.error('Error generating customer ID:',error);
    })
}
function clearInputs(){
    item_Code.val('');
    description.val('');
    unit_price.val('');
    qty.val('');
    generateItemID();
}
function showError(title, text) {
    Swal.fire({
        icon: 'error',
        title: title,
        text: text,
        footer: '<a href="">Why do I have this issue?</a>'
    });
}