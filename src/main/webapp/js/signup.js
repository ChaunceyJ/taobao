// const address = "http://localhost:8080/taobao_war/";
const address = "http://47.103.27.88:8080/taobao/";

var okUserName = false;
var okNickName = false;
var okPass = false;
var okTopass = false;

//user名字
function isuserName() {
    okUserName = false;
    var username = document.getElementById("username").value;
    var userNameHint = document.getElementById("li_username").nextElementSibling;
    userNameHint.innerHTML = "";
    //4-15位字符，可由英文、数字或符号“_”组成
    var ret = /[a-zA-Z0-9\-]{4,15}/;
    if (ret.test(username)) {
        ischeckName(username, userNameHint);
    } else {
        userNameHint.style.color = "red";
        userNameHint.innerHTML = "请输入正确的用户名";
    }
}
// 验证用户名是否重复
function ischeckName(name, hint) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            // console.log(obj.state);
            if (obj.state == 1){
                hint.style.color = "red";
                hint.innerHTML = "该用户名已经注册，请重新填写";
            } else if (obj.state == 0){
                okUserName = true;
            }
        }else if (this.readyState == 4 && this.status == 400){
            alert("验证失败，服务器走丢了");
        }
    };
    // console.log(address+"isCheckName?user_name="+name);
    xhttp.open("GET", address+"isCheckName?user_name="+name, true);
    xhttp.send();
}

//nick名字
function isNickName() {
    okNickName = false;
    var name = document.getElementById("nickname").value;
    var nameHint = document.getElementById("li_nickname").nextElementSibling;
    nameHint.innerHTML = "";
    //1-50位字符，可由英文、数字或符号“_”组成
    var ret = /[a-zA-Z0-9\-]{1,50}/;
    if (!ret.test(name)) {
        nameHint.style.color = "red";
        nameHint.innerHTML = "请输入正确的用户名";
    }else {
        okNickName = true;
    }
}

// 注册密码
function isPass() {
    okPass = false;
    var value = document.getElementById("userpass").value;
    var hint = document.getElementById("li_pass").nextElementSibling;
    hint.innerHTML = "";
    // 6-20位的组合
    var ret = /^[\da-zA-Z]{6,20}$/
    if (!ret.test(value)) {
        hint.style.color = "red";
        hint.innerHTML = "请输入正确的密码";
    }else {
        okPass = true;
    }
}

function isTopass() {
    okTopass = false;
    var hint = document.getElementById("li_to_pass").nextElementSibling;
    hint.innerHTML = "";
    if (document.getElementById("userpass").value != document.getElementById("topass").value) {
        hint.style.color = "red";
        hint.innerHTML = "两次密码不一致";
    }else {
        okTopass = true;
    }
}

function signup() {
    // console.log(okUserName, okNickName, okPass, okTopass);
    if (!(okUserName && okNickName && okPass && okTopass)){
       alert("输入不符合要求");
       return;
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            console.log(obj);
            if (obj.state == 1){
                // 获取当前时间
                let s = new Date();
                // 设置保存时间
                s.setDate(s.getDate() + 1);
                // cookie
                document.cookie = "userid=" + obj.userid + /*";expires=" + s.toGMTString()+*/";path=/";
                document.cookie = "username=" + obj.username + /*";expires=" + s.toGMTString()+*/";path=/";
                document.cookie = "nickname=" + obj.nickname + /*";expires=" + s.toGMTString()+*/";path=/";
                window.location.href = "../html/index.html";
            } else if (obj.state == 0){
                alert("注册失败，请稍后尝试");
            }
        }else if (this.readyState == 4 && this.status == 400){
            alert("注册失败，服务器走丢了");
        }
    };
    xhttp.open("POST", address+"signup", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader("charset", "utf-8");
    xhttp.send("user_name="+document.getElementById("username").value
        +"&nick_name="+document.getElementById("nickname").value
        +"&password="+document.getElementById("userpass").value
    );
}