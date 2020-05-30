// const address = "http://localhost:8080/taobao_war/";
const address = "http://47.103.27.88:8080/taobao/";


// 轮播
function show_lunbo() {
    var imgs = document.getElementsByClassName("img-box")[0].getElementsByTagName("img");
    var labels = document.getElementsByClassName("label-box")[0].getElementsByTagName("li");
    var times = new Date().getSeconds();
    show_img_highlight(imgs[times%3], labels[times%3]);
    hide_img_highlight(imgs[(times+1)%3], labels[(times+1)%3]);
    hide_img_highlight(imgs[(times+2)%3], labels[(times+2)%3]);
};

function show_img_highlight(img, label) {
    img.style.opacity = 1;
    label.style.background = "#222";
    label.firstChild.style.color = "#fff";
}

function hide_img_highlight(img, label) {
    img.style.opacity = 0;
    label.style.background = "#aaa6a6";
    label.firstChild.style.color = "#000";
}

//类目菜单
function show_kind_box() {
    var box = document.getElementsByClassName("kind_boxno")[0];
    box.style.display = "block";
}

function hide_kind_box() {
    var box = document.getElementsByClassName("kind_boxno")[0];
    box.style.display = "none";
}

//修改倒计时
function changeTime() {
    var day3 = new Date();
    day3.setTime(day3.getTime()+24*60*60*1000);
    var end_time = new Date("2020-"+(day3.getMonth()+1)+"-"+(day3.getDate())+" 00:00:00").getTime(); //终止时间
    var diff_time=parseInt((end_time- new Date().getTime())/1000);// 倒计时时间差
    var h = Math.floor(diff_time / 3600);
    var m = Math.floor((diff_time / 60 % 60));
    var s = Math.floor((diff_time % 60));
    document.getElementsByClassName("hour")[0].innerHTML = h;
    document.getElementsByClassName("minit")[0].innerHTML = m;
    document.getElementsByClassName("second")[0].innerHTML = s;
}

function exeute() {
    loadDoc();
    Ftest();
}

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText).results;
            //single 单品
            var super_als = document.getElementsByClassName("super_a");
            var super_imgs = document.getElementsByClassName("super_img");
            for (var i = 0, len = super_als.length; i < len; i++){
                super_als[i].childNodes[1].innerHTML = obj[i].product_id;
                super_imgs[i].getElementsByTagName("img")[0].src = obj[i].picture;
                super_als[i].getElementsByClassName("sp-tx")[0].innerHTML = obj[i].product_name;
                super_als[i].getElementsByClassName("sp_price")[0].innerHTML = "¥"+obj[i].now_price
                    +"<i> ¥"+obj[i].old_price+"</i>";
                super_als[i].getElementsByClassName("sp_r")[0].style.width = (obj[i].remind_total/obj[i].all_total*100)+"%";
            }
            var bur_xs = document.getElementsByClassName("bur_x");
            var burx_imgs = document.getElementsByClassName("burx_img");
            for (var i = 0, len = bur_xs.length; i < len; i++){
                burx_imgs[i].src = obj[i].picture;
                bur_xs[i].childNodes[1].innerHTML = obj[i].product_id;
                bur_xs[i].childNodes[3].innerHTML = obj[i].product_name;
                bur_xs[i].childNodes[5].innerHTML = "¥"+obj[i].now_price;
            }
            // console.log(bur_xs);
            var top_text = document.getElementsByClassName("top_text");
            for (var i = 0, len = top_text.length; i < len; i++){
                top_text[i].nextElementSibling.src = obj[i].picture;
            }
        }
    };
    xhttp.open("GET", address+"getAllProduct", true);
    xhttp.send();
}

function Ftest() {
    if (document.cookie.indexOf("username=") != -1) {
        var tr_text = document.getElementsByClassName("tr_text")[0];
        tr_text.innerHTML = getCookie("nickname")+"，欢迎光临";
    }
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

//加入购物车1
function addShoppingCart1(obj) {
    var productid = obj.parentNode.parentNode.childNodes[1].innerText;
    console.log(productid);
    addShoppingCart(productid);
}
//加入购物车2
function addShoppingCart2(obj) {
    var productid = obj.parentNode.childNodes[1].innerText;
    console.log(productid);
    addShoppingCart(productid);
}
//加入购物车主要函数
function addShoppingCart(productId) {
    /*//login
    if (document.cookie.indexOf("userid=") != -1) {
        // var userId = getCookie("userid");
        console.log(document.cookie);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // console.log(this.responseText);
            }else if (this.readyState == 4 && this.status == 400){
                alert("登入失败，服务器走丢了");
            }
        }
        xhttp.cookie = document.cookie;
        xhttp.open("GET", address+"addShopingCart?product_id="+productId, true);
        xhttp.send();
    }else {// not login*/
        if (!window.localStorage) {
            alert("您的浏览器不支持localStorage，无法使用购物车");
        } else {
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
                    value[productId] = value[productId] + 1;
                }else {
                    value[productId] = 1;
                }
            }else {
                value = {};
                value[productId] = 1;
            }
            localStorage.setItem("shoppingCart", JSON.stringify(value));
            alert("添加成功。");
        // }
    }
}

function gotoDetails1(obj) {
    var productid = obj.parentNode.parentNode.childNodes[1].innerText;
    window.location.href = "../html/details.html?product="+productid;
}

function gotoDetails2(obj) {
    var productid = obj.parentNode.childNodes[1].innerText;
    window.location.href = "../html/details.html?product="+productid;
}

//购买1
function buyOne1(obj) {
    var productid = obj.parentNode.parentNode.childNodes[1].innerText;
    var price = obj.parentNode.childNodes[7].childNodes[0].textContent;
    var price = parseFloat(price.substring(1, price.length));
    buyOne(productid, price);
}
//购买2
function buyOne2(obj) {
    var productid = obj.parentNode.childNodes[1].innerText;
    var price = obj.parentNode.childNodes[5].textContent;
    var price = parseFloat(price.substring(1, price.length));
    console.log(price);
    buyOne(productid, price);
}
//购买主要函数
function buyOne(productid, per_price) {
    if (document.cookie.indexOf("userid=") == -1){
        window.location.href = "../html/login.html";
        return;
    }
    var arrays = [];
    var obj = {};
    obj["product_id"] = productid;
    obj["per_price"] = per_price;
    obj["number_of"] = 1;
    obj["total_price"] = per_price;
    arrays.push(obj);
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