export class ItemAPI {
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
    saveitem(item){
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
            http.open("POST", "http://localhost:8080/poss/item", true);
            http.setRequestHeader("Content-Type","application/json");
            http.send(JSON.stringify(item));
        });
    }


    // updateitem(item){
    //     return new Promise((resolve, reject) => {
    //         const http = new XMLHttpRequest();
    //         http.onreadystatechange = () => {
    //             if (http.readyState === 4) {
    //                 if (http.status === 200) {
    //                     resolve(http.responseText);
    //                 } else {
    //                     reject(new Error(`HTTP request failed with status ${http.status}`));
    //                 }
    //             }
    //         }
    //         http.open("POST", "http://localhost:8080/poss/item", true);
    //         http.setRequestHeader("Content-Type","application/json");
    //         http.send(JSON.stringify(item));
    //     });
    // }

    getAllItem(){
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
            http.open("GET", "http://localhost:8080/poss/item?action=getAllItem", true);
            http.send();
        });
    }

    generateItemID(){
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

            http.open("GET", "http://localhost:8080/poss/item?action=generateItemID", true);
            http.send();
        });
    }


     getItem(item_code_Value) {
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
             http.open("GET", "http://localhost:8080/poss/item?action=getItem&item_code_Value="+item_code_Value, true);
             http.send();
         });
    }

    updateItem(item) {
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
            http.open("PUT", "http://localhost:8080/poss/item", true);
            http.setRequestHeader("Content-Type","application/json");
            http.send(JSON.stringify(item));
        });

    }

    deleteItem(itemCode) {
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
            http.open("DELETE", "http://localhost:8080/poss/item?itemCode="+itemCode, true);
            http.send();
        });
    }
}