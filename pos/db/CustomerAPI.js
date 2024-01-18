export class CustomerAPI {
    // saveitem(item){
    //     // return new Promise((resolve,reject)=>{
    //     //     const Http =()=>{
    //     //         Http.onreadystatechange = () => {
    //     //         if (Http.readyState===4 && Http.status===200){
    //     //             resolve(Http.responseText);
    //     //         }else {
    //     //             reject(new Error(`Http Request Failed With status ${http.status}`))
    //     //         }
    //     //     }
    //     //     }
    //     //     Http.open("POST","http://localhost:8080/poss/item",true);
    //     //     Http.setRequestHeader('Content-Type', 'application/json');
    //     //     Http.send(JSON.stringify(item));
    //     // })
    //     return new Promise((resolve, reject) => {
    //         const http = new XMLHttpRequest();
    //         http.onreadystatechange = () => {
    //             if (http.readyState === 4) {
    //                 if (http.status === 200) {
    //                     resolve(http.responseText);
    //                 } else {
    //                     reject(new Error(`Http Request Failed With status ${http.status}`))
    //                 }
    //             }
    //         }
    //         http.open("POST", "http://localhost:8080/poss/item", true);
    //         http.setRequestHeader("Content-Type","application/json");
    //         http.send(JSON.stringify(item));
    //     });
    //
    // }
    savecustomer(customer){
        return new Promise((resolve, reject) => {
            const http = new XMLHttpRequest();
            http.onreadystatechange = () => {
                if (http.readyState === 4) {
                    if (http.status === 200) {
                        resolve(http.responseText);
                    } else {
                        reject(new Error(`HTTP request failed with status ${http.status}`));
                    }
                }
            }
            http.open("POST", "http://localhost:8080/poss/customer", true);
            http.setRequestHeader("Content-Type","application/json");
            http.send(JSON.stringify(customer));
        });
    }

    getCustomer(customerIdValue) {
        return new Promise((resolve,reject)=>{
            const http = new XMLHttpRequest();
            http.onreadystatechange = () => {
                if (http.readyState === 4) {
                    if (http.status === 200) {
                        resolve(http.responseText);
                    } else {
                        reject(new Error(`HTTP request failed with status ${http.status}`));
                    }
                }
            }
            http.open("GET", "http://localhost:8080/poss/customer?action=getCustomer&customerId="+customerIdValue, true);
            http.send();
        });
    }

    getAllCustomer(){
        return new Promise((resolve,reject)=>{
            const http = new XMLHttpRequest();
            http.onreadystatechange = () => {
                if (http.readyState === 4) {
                    if (http.status === 200) {
                        resolve(http.responseText);
                    } else {
                        reject(new Error(`HTTP request failed with status ${http.status}`));
                    }
                }
            }
            http.open("GET", "http://localhost:8080/poss/customer?action=getAllCustomer", true);
            http.send();
        });
    }

    generateCustomerId(){
        return new Promise((resolve, reject)=>{

            const http = new XMLHttpRequest();

            http.onreadystatechange = ()=>{
                if (http.readyState===4){
                    if(http.status===200){
                        resolve(http.responseText);
                    }else {
                        console.error('Error:', http.status, http.statusText);
                        reject(new Error(`HTTP request failed with status ${http.status}`));
                    }
                }
            }

            http.open("GET", "http://localhost:8080/poss/customer?action=generateCustomerId", true);
            http.send();
        });
    }


    updateCustomer(customer) {
        return new Promise((resolve, reject)=>{
            const http = new XMLHttpRequest();
            http.onreadystatechange = () => {
                if (http.readyState === 4) {
                    if (http.status === 200) {
                        resolve(http.responseText);
                    } else {
                        reject(new Error(`HTTP request failed with status ${http.status}`));
                    }
                }
            }
            http.open("PUT", "http://localhost:8080/poss/customer", true);
            http.setRequestHeader("Content-Type","application/json");
            http.send(JSON.stringify(customer));
        });

    }

    deleteCustomer(customerIdValue) {
        return new Promise((resolve, reject) => {
            const http = new XMLHttpRequest();
            http.onreadystatechange = () => {
                if (http.readyState === 4) {
                    if (http.status === 200) {
                        resolve(http.responseText);
                    } else {
                        reject(new Error(`HTTP request failed with status ${http.status}`));
                    }
                }
            }
            http.open("DELETE", "http://localhost:8080/poss/customer?customerIdValue="+customerIdValue, true);
            http.send();
        });

    }
}