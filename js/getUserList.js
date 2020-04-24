import {Trie} from "./trie.js";

let userData = [];
$(document).ready(function() {
        $.ajax({
            url: 'https://api.github.com/users?since=1',
            type: 'GET',
            success: function (response) {
                $("#users-list").append(
                    response.reduce(function (previousValue, currentValue) {
                            return previousValue + `
                    <div class="card user-info">
                        <div class="card-body user-info-detail">
                            <img src=${currentValue.avatar_url} class="avatar-display">
                            <span class="login-display">User: ${currentValue.login}</span>
                        </div>
                        <span class="followers-btn">followers</span>
                        <div class="user-repos"></div>
                        <div class="user-followers"></div>
                    </div>
                `
                        }
                        , ``)
                );
                userData = userData.concat(response);
                localStorage.setItem('curPage', 1);
            }
        });

        $('#users-list-container').scroll(function () {
            let scrollTop = $(this).scrollTop();
            let scrollHeight = $('#users-list').height()+vh(1);
            let windowHeight = $(this).height();
            if (parseInt(scrollTop + windowHeight) >= parseInt(scrollHeight)-2) {
                getMoreUserInfo();
            }
        });

        $('#search').click(function(){
        let userSelected = $(' input').val();
        if(userSelected === ''){
            window.location.reload();
        }
        else{
            let userAvatar = '';
            for(let i=0;i<userData.length;i++){
                if(userData[i]['login']=== userSelected){
                    userAvatar = userData[i]['avatar_url'];
                }
            }
            $("#users-list").html(`
                    <div class="card user-info">
                        <div class="card-body user-info-detail">
                            <img src=${userAvatar} class="avatar-display">
                            <span class="login-display">User: ${userSelected}</span>
                        </div>
                        <span class="followers-btn">followers</span>
                        <div class="user-repos"></div>
                        <div class="user-followers"></div>
                    </div>
                `)
        }
    });

    $('#input').on('input',
        debounce(
            function(){
                let curInput = $(this).context.value;
                if(curInput === ''){
                    $('#options').css('display','none');
                }
                else{
                    let data = new Trie();
                    for (let obj of userData){
                        data.insert(obj['login']);
                    }
                    let optionData = data.get_start(curInput);
                    let options = optionData.reduce(function(previousValue, currentValue){
                            return previousValue+ `<li value=${currentValue.toString()}>${currentValue}</li>`
                        }
                        ,``);
                    $('#options').click(function(event){
                        $(' input').val(event.target.innerText);
                        $('#options').css('display','none');
                    });
                    if(optionData.length&&optionData.length !== 0){
                        $('#options ul').html(options);
                        $('#options').css('display','block');
                    }else{
                        $('#options ul').html('');
                        $('#options').css('display','none');

                    }
                }
            }
            ,200)
    );

    }
);

function getMoreUserInfo(){
    let curPage = localStorage.getItem('curPage');
    $.ajax({
        url:'https://api.github.com/users?since='+(curPage+1).toString(),
        type: 'GET',
        success: function (response) {
            $("#users-list").append(
                response.reduce(function(previousValue, currentValue){
                        return previousValue+`
                    <div class="card user-info">
                        <div class="card-body">
                            <img src=${currentValue.avatar_url}>
                            <span>User: ${currentValue.login}</span>
                        </div>
                    </div>
                `
                    }
                    ,``)
            );
            localStorage.setItem('curPage',curPage+1);
            userData = userData.concat(response);
        }
    })
}

function vh(v) {
    let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (v * h) / 100;
}

function debounce(fun, time) {
    let timer = null;
    return function () {
        let inp = this;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fun.call(inp);
        }, time)
    }
}

