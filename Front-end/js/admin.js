
const xhttp = new XMLHttpRequest();
const endPointRoot = "https://comp4537-jeffrey.com/assignment1/API/v1/";

let resource = "quote/";
xhttp.open("GET", endPointRoot + resource, true);
xhttp.send();

let count = 0;

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
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
            inputQuote.id = "quote" + i;
            
            tempDiv.appendChild(inputQuote);
            
            let inputName = document.createElement("INPUT");
            inputName.setAttribute("type", "text");
            inputName.value = resObj[i].name;
            inputName.id = "name" + i;
            
            tempDiv.appendChild(inputName);
            
            let delBtn = document.createElement("BUTTON");
            delBtn.textContent = "delete";
            delBtn.onclick = function() {
                delClick(resObj[i].quoteId, i);
            }
            
            tempDiv.appendChild(delBtn);
            
            let updateBtn = document.createElement("BUTTON");
            updateBtn.textContent = "update in DB";
            updateBtn.onclick = function() {
                updateClick(resObj[i].quoteId, i);
            }
            
            tempDiv.appendChild(updateBtn);
            
            content.appendChild(document.createElement("BR"));
            count = i + 1;
        }
        let btnDiv = document.getElementById("btnDiv");
        
        let addBtn = document.createElement("BUTTON");
        addBtn.textContent = "add new quote";
        addBtn.onclick = function() {
            addClick(count);
        }
        btnDiv.appendChild(addBtn);
    }  
};

function delClick(id, index) {
    console.log(index + ": from delete");
    let resource = "quote/";
    //console.log(resObj);
    
    xhttp.open("DELETE", endPointRoot + resource + id, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("msg").innerHTML = this.responseText;
            document.getElementById("div" + index).remove();
        }
    }
}

function updateClick(id, index) {
    console.log(index + ": from update");
    let resource = "quote/";
    
    let newQuote = document.getElementById("quote" + index);
    let newName = document.getElementById("name" + index);
    /**
     * console.log(endPointRoot + resource + id);
     * console.log("new quote: " + newQuote.value);
     * console.log("new name: " + newName.value);
    */
    
    xhttp.open("PUT", endPointRoot + resource + id, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    let sendObj = {};
    sendObj.quote = newQuote.value;
    sendObj.name = newName.value;
    
    xhttp.send(JSON.stringify(sendObj))
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("msg").innerHTML = this.responseText;
        }
    }
}

function addNew(index) {
    let resource = "quote/";
    xhttp.open("POST", endPointRoot + resource, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    let sendObj = {};
    sendObj.quote = document.getElementById("quote" + index).value;
    sendObj.name = document.getElementById("name" + index).value;
    
    //console.log(JSON.stringify(sendObj));
    
    xhttp.send(JSON.stringify(sendObj));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("msg").innerHTML = this.responseText;
            document.getElementById("add" + index).remove();
            count++;
            let tempDiv = document.getElementById("div" + index);
            let delBtn = document.createElement("BUTTON");
            delBtn.textContent = "delete";
            delBtn.onclick = function() {
                delClick(index, index);
            }
            
            tempDiv.appendChild(delBtn);
            
            let updateBtn = document.createElement("BUTTON");
            updateBtn.textContent = "update in DB";
            updateBtn.onclick = function() {
                updateClick(index, index);
            }
            
            tempDiv.appendChild(updateBtn);
        }
    }
    
}

function addClick(index) {
    let content = document.getElementById("content");
    let tempDiv = document.createElement("div");
    tempDiv.id = "div" + index;
    content.appendChild(tempDiv);
            
    let inputQuote = document.createElement("INPUT");
    inputQuote.setAttribute("type", "text");
    inputQuote.id = "quote" + index;
    
    tempDiv.appendChild(inputQuote);
        
    let inputName = document.createElement("INPUT");
    inputName.setAttribute("type", "text");
    inputName.id = "name" + index;
    
    tempDiv.appendChild(inputName);
            
    let addBtn = document.createElement("BUTTON");
    addBtn.textContent = "add in DB";
    addBtn.id = "add" + index;
    addBtn.onclick = function() {
        addNew(index);
    }
            
    tempDiv.appendChild(addBtn);
            
    content.appendChild(document.createElement("BR"));
    
}
