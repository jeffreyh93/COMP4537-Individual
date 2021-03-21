const xhttp = new XMLHttpRequest();
const endPointRoot = "https://comp4537-jeffrey.com/assignment1/API/v1/";
const resource = "quote/";

function getAll() {
    xhttp.open("GET", endPointRoot + resource, true);
    xhttp.send();

    let count = 0;

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let resObj = JSON.parse(this.responseText);
        
            let content = document.getElementById("content");
            for (let i = 0; i < resObj.length; i++) {
                let tempDiv = document.createElement("div");
                tempDiv.id = "div" + i;
                content.appendChild(tempDiv);
            
                //console.log(i + ": " + resObj[i].quote + ", " + resObj[i].name)
                let inputQuote = document.createElement("INPUT");
                inputQuote.setAttribute("type", "text");
                inputQuote.value = resObj[i].quote;
                inputQuote.readOnly = true;
                inputQuote.id = "quote" + i;
            
                tempDiv.appendChild(inputQuote);
            
                let inputName = document.createElement("INPUT");
                inputName.setAttribute("type", "text");
                inputName.value = resObj[i].name;
                inputName.readOnly = true;
                inputName.id = "name" + i;
            
                tempDiv.appendChild(inputName);
            
                content.appendChild(document.createElement("BR"));
            
            }
        }
    }
}

function getNewest() {
    xhttp.open("GET", endPointRoot + resource + "1", true);
    xhttp.send();
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let resObj = JSON.parse(this.responseText);
        
            let content = document.getElementById("content");
            let tempDiv = document.createElement("div");
            content.appendChild(tempDiv);
            
            let inputQuote = document.createElement("INPUT");
            inputQuote.setAttribute("type", "text");
            inputQuote.value = resObj[0].quote;
            inputQuote.readOnly = true;
            
            tempDiv.appendChild(inputQuote);
            
            let inputName = document.createElement("INPUT");
            inputName.setAttribute("type", "text");
            inputName.value = resObj[0].name;
            inputName.readOnly = true;
            
            tempDiv.appendChild(inputName);
            
            content.appendChild(document.createElement("BR"));
        }
    }
}