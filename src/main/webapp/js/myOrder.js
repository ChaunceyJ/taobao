// const address = "http://localhost:8080/taobao_war/";
const address = "http://47.103.27.88:8080/taobao/";

function exeute() {
    if (document.cookie.indexOf("userid=") != -1) {
        var tr_text = document.getElementsByClassName("tr_text")[0];
        tr_text.innerHTML = getCookie("nickname")+"，欢迎光临";
        getOrder();
    }else {
        window.location.href = "../html/login.html";
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

function getOrder() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            var parent = document.getElementsByClassName("cart_item")[0];
            if (obj.length > 0){
                document.getElementsByClassName("empty")[0].style.display = "none";
            }
            for (var i = 0, len = obj.length; i < len; i++){
                var template = document.getElementsByClassName("item")[0].innerHTML;
                var item = obj[i];
                template = template.replace("{productid}", item["productid"])
                    .replace("{productname}", item["productname"])
                    .replace("{imgsrc}", item["imgsrc"])
                    .replace("{perPrice}", item["perPrice"].toFixed(2))
                    .replace("{number}", item["number"])
                    .replace("{totalPrice}", (item["totalPrice"]).toFixed(2))
                    .replace("{buyTime}", item["buyTime"]);
                var newli = document.createElement("li");
                newli.className = "item box_size";
                newli.innerHTML = template;
                newli.style.display = "block";
                parent.appendChild(newli);
            }

        }
    };
    xhttp.cookie = document.cookie;
    xhttp.open("GET", address+"getOrder", true);
    xhttp.send();
}