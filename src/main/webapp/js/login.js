const address = "http://localhost:8080/taobao_war/";

function login() {
    var xhttp = new XMLHttpRequest();
    var name = document.getElementById("userName").value;
    var password = document.getElementById("userPass").value;
    console.log(name, password);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            console.log(results);
            if (results.success == 1) {
                // 获取当前时间
                let s = new Date();
                // 设置保存时间
                s.setDate(s.getDate() + 10);
                // cookie
                document.cookie = "userid=" + results.userid + /*";expires=" + s.toGMTString()+*/";path=/";
                document.cookie = "username=" + results.username + /*";expires=" + s.toGMTString()+*/";path=/";
                document.cookie = "nickname=" + results.nickname + /*";expires=" + s.toGMTString()+*/";path=/";
                window.location.href = "../html/index.html";
            } else {
                alert("登入失败，用户名或密码错误");
            }
        }else if (this.readyState == 4 && this.status == 400){
            alert("登入失败，服务器走丢了");
        }
    };
    xhttp.open("POST", address+"login", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("user_name="+name+"&password="+password);
}

function Ftest1() {
    if (document.cookie.indexOf("userid=") != -1){
    window.location.href = "../html/index.html";
    }else {
        console.log(-1);
    }
}

