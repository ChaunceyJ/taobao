// const address = "http://localhost:8080/taobao_war/";

function rander() {
    var productid = getQueryVariable("product");
    document.getElementsByTagName("product-id")[0].innerText = productid;
    console.log(document.getElementsByTagName("product-id")[0].innerText);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            document.getElementsByClassName("perfume_name")[0].getElementsByTagName("h1")[0].innerText = obj["name"];
            document.getElementsByClassName("spec_img")[0].src=
                document.getElementsByClassName("pf_imgd")[0].getElementsByTagName("img")[0].src = obj["picture"];
            document.getElementsByClassName("pf_money")[0].getElementsByTagName("li")[1].innerText = "¥ "+obj["price"];
        }
    };
    xhttp.open("GET", address+"productInfo?id="+productid, true);
    xhttp.send();
    Ftest();
}

function add() {
    var number = document.getElementsByClassName("sp_sl")[0];
    // console.log(number);
    number.innerText = parseInt(number.innerText) + 1;
}

function reduce() {
    var number = document.getElementsByClassName("sp_sl")[0];
    if (number.innerText > 1){
        number.innerText = parseInt(number.innerText) - 1;
    }
}

function addShoppingCart3() {
    const productId = document.getElementsByTagName("product-id")[0].innerText;
    const number = parseInt(document.getElementsByClassName("sp_sl")[0].innerText);
    console.log(productId, number);
    if (!window.localStorage) {
        alert("您的浏览器不支持localStorage，无法使用购物车");
        return;
    }
    var expired = localStorage.getItem("expired");
    if (expired != null){
        if ( Date.now().toString() >= expired ) {
            console.log(Date.now().toString(), expired);
            localStorage.removeItem("shoppingCart");
        }
    }
    localStorage.setItem("expired", Date.now()+ 2*60*60*1000);
    var value = localStorage.getItem("shoppingCart");
    if (value != null){
        value = JSON.parse(value);
        console.log(value);
        if (value.hasOwnProperty(productId)){
            value[productId] = value[productId] + number;
        }else {
            value[productId] = number;
        }
    }else {
        value = {};
        value[productId] = number;
    }
    localStorage.setItem("shoppingCart", JSON.stringify(value));
    alert("添加成功。");
}

function buyOne3() {
    if (document.cookie.indexOf("userid=") == -1){
        window.location.href = "../html/login.html";
        return;
    }
    var price = document.getElementsByClassName("pf_money")[0].getElementsByTagName("li")[1].innerText;
    price = parseFloat(price.substring(1, price.length));
    var number = parseInt(document.getElementsByClassName("sp_sl")[0].innerText);
    var arrays = [];
    var obj = {};
    obj["product_id"] = document.getElementsByTagName("product-id")[0].innerText;
    obj["per_price"] = price;
    obj["number_of"] = number;
    obj["total_price"] = price*number;
    arrays.push(obj);
    console.log(arrays);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            // console.log(obj);
            if (obj.state == 1){
                alert("购买成功。")
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

function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(-1);
}