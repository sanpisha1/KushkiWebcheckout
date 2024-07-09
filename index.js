function obtenerDatos(){

    var environment = document.getElementById('environment').value;
    var name = document.getElementById('name').value;
    var amount = document.getElementById('amount').value;
    var privateMerchantId = document.getElementById('privateMerchantId').value;
    var currency = document.getElementById('currency').value;
    var checkboxes = document.querySelectorAll('input[name="pmethod"]:checked');
    var selectedValues = [];
    checkboxes.forEach(function(checkbox) {
        selectedValues.push(checkbox.value);
    });

    if (!name || !amount || !privateMerchantId) {
      alert("Please fill all the fields!!");
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Private-Merchant-Id", privateMerchantId);

    raw ={
      "kind": "webcheckout",
      "contactDetail": {
        "name": name
      },
      "redirectURL": "https://api-docs.kushkipagos.com/docs/online-payments/services-by-country",
      "products": [
        {
          "description": "TEST",
          "name": "Testing product",
          "quantity": 1,
          "unitPrice": parseInt(amount)
        }
      ],
      "paymentConfig": {
        "amount": {
          "subtotalIva": parseInt(amount),
          "subtotalIva0": 0,
          "iva": 0,
          "currency": currency
        },
        "paymentMethod": selectedValues
      }
    };

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: 'follow'
      };

    fetch(environment,requestOptions)
    .then(response => response.json())
    .then(result => {

        if(!result.webcheckoutUrl){
          alert("Something went wrong, review your fields!"); 
          document.getElementById('result').style.display = 'block';
          document.getElementById('result').innerHTML = JSON.stringify(result, null, 2);
        }
        else{
          alert("You will be redirect to webcheckout!"); 

          setTimeout(function() {
            window.location.href = result.webcheckoutUrl;
            
          }, 1000);
        }
    })
    .catch(error => console.log('error', error));

    }