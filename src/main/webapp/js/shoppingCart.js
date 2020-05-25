const address = "http://localhost:8080/taobao_war/";

function exeute() {
    if (document.cookie.indexOf("username=") != -1) {
        var tr_text = document.getElementsByClassName("tr_text")[0];
        tr_text.innerHTML = getCookie("nickname")+"，欢迎光临";
    }
    showProduct();
}

//获取指定名称的cookie的值
function getCookie(objName){
    var arrStr = document.cookie.split("; ");
    for(var i = 0;i < arrStr.length;i ++){
        var temp = arrStr[i].split("=");
        if(temp[0] == objName) {
            // console.log(temp[0], temp[1])
            return temp[1];
        }
    }
}

function reduce(obj) {
    var item = obj.parentNode.parentNode.childNodes;
    var number = obj.parentNode.childNodes[3];
    var productid = item[3].innerText;
    if (number.innerText > 1){
        number.innerText = number.innerText - 1;
        localStorage.setItem("expired", Date.now()+ 2*60*60*1000);
        var value = localStorage.getItem("shoppingCart");
        value = JSON.parse(value);
        value[productid] = number.innerText;
        localStorage.setItem("shoppingCart", JSON.stringify(value));
        updateAdd_up(item, number.innerText);
    }
     // console.log(productid, item)
}

function add(obj) {
    var item = obj.parentNode.parentNode.childNodes;
    var number = obj.parentNode.childNodes[3];
    var productid = item[3].innerText;
    number.innerText = parseInt(number.innerText) + 1;
    localStorage.setItem("expired", Date.now()+ 2*60*60*1000);
    var value = localStorage.getItem("shoppingCart");
    value = JSON.parse(value);
    value[productid] = number.innerText;
    localStorage.setItem("shoppingCart", JSON.stringify(value));
    updateAdd_up(item, number.innerText);
}

function updateAdd_up(obj, num) {
    obj[13].innerText = (parseFloat(obj[9].innerText) * parseInt(num)).toFixed(2);
    checkProduct();
}

function checkProduct() {
    var checkboxs = document.getElementsByClassName("item_a");
    var totalNum = 0;
    var totalPrice = 0.0;
    for (var i = 1, len = checkboxs.length; i < len; i++){
      var item = checkboxs[i];
        if (item.checked){
            totalNum += parseInt(item.parentNode.childNodes[11].childNodes[3].innerText);
            totalPrice += parseFloat(item.parentNode.childNodes[13].innerText);
            console.log(item.parentNode.childNodes[11].childNodes[3].innerText,
                item.parentNode.childNodes[13].innerText);
        }
    };

    document.getElementsByClassName("cB_sl")[0].childNodes[1].innerText = totalNum;
    document.getElementsByClassName("cB_add")[0].innerText = totalPrice.toFixed(2)
}

function allSelect() {
    var checkboxs = document.getElementsByClassName("item_a");
    var allBox = document.getElementsByClassName("allBox")[0];
    for (var i = 1, len = checkboxs.length; i < len; i++){
        var item = checkboxs[i];
        item.checked = allBox.checked;
    };
    checkProduct();
}

function buyProducts() {
    if (document.cookie.indexOf("userid=") == -1){
        window.location.href = "../html/login.html";
        return
    }
    var items = document.getElementsByClassName("item");
    var arrays = [];
    for (var i = 1, len = items.length; i < len; i++){
        var item = items[i].childNodes;
        console.log(item);
        if (item[1].checked){
            var obj = {};
            obj["product_id"] = item[3].innerText;
            obj["per_price"] = item[9].innerText;
            obj["number_of"] = item[11].childNodes[3].innerText;
            obj["total_price"] = item[13].innerText;
            arrays.push(obj);
        }
    }
    if (arrays.length > 0){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var obj = JSON.parse(this.responseText);
                // console.log(obj);
                if (obj.state == 1){
                    var lists = obj.list;
                    for (var i = 0, len = lists.length; i < len; i++){
                        deleteProduct(lists[i]);
                    }
                    //重新渲染
                    window.location.reload();
                }else {
                    alert("购买失败。");
                }
            }
        };
        xhttp.cookie = document.cookie;
        xhttp.open("POST", address+"buy", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("charset", "utf-8");
        xhttp.send("data="+JSON.stringify(arrays));
    }
}

function deleteProduct(productid) {
    localStorage.setItem("expired", Date.now()+ 2*60*60*1000);
    var value = localStorage.getItem("shoppingCart");
    value = JSON.parse(value);
    delete value[productid];
    localStorage.setItem("shoppingCart", JSON.stringify(value));
}

function showProduct() {
    var value = localStorage.getItem("shoppingCart");
    value = JSON.parse(value);
    var keys = [];
    for (var key in value){
        keys.push(key);
    }
    if (keys.length > 0){
        document.getElementsByClassName("empty")[0].style.display = "none";
        document.getElementsByClassName("carBotton")[0].style.display = "block";
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var obj = JSON.parse(this.responseText);
                var parent = document.getElementsByClassName("cart_item")[0];
                var value = localStorage.getItem("shoppingCart");
                value = JSON.parse(value);
                for (var i = 0, len = obj.length; i < len; i++){
                    var item = obj[i];
                    parent.appendChild(createLiItem(item["productid"], item["productname"], item["imgsrc"], item["perPrice"], value[item["productid"]]));
                }
            }
        };
        xhttp.open("POST", address+"productInfo", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("charset", "utf-8");
        xhttp.send("data="+JSON.stringify(keys));
    };
    // parent.appendChild(createLiItem(121212, "1231243141"));
    // console.log(parent);
}

function createLiItem(productid, productname, imgsrc, perPrice, number) {
    var template = document.getElementsByClassName("item")[0].innerHTML;
    template = template.replace("{productid}", productid).replace("{productname}", productname)
        .replace("{imgsrc}", imgsrc).replace("{perPrice}", perPrice.toFixed(2))
        .replace("{number}", number).replace("{totalPrice}", (perPrice*number).toFixed(2));
    var newli = document.createElement("li");
    newli.className = "item box_size";
    newli.innerHTML = template;
    newli.style.display = "block";
    return newli;

}

function deleteProductButton(obj) {
    var item = obj.parentNode.parentNode;
    var parent = item.parentNode;
    deleteProduct(item.childNodes[3].innerText);
    parent.removeChild(item);
    if (parent.getElementsByTagName("li").length == 1){// 1 or 0 ***
        document.getElementsByClassName("empty")[0].style.display = "block";
        document.getElementsByClassName("carBotton")[0].style.display = "none";
    };
}
