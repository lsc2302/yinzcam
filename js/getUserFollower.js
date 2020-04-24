$(document).ready(function(){
    $('#users-list').on('click', '.user-info .followers-btn', function(event){
        let targetName = $(event.target).parent().find('.login-display').text();
        $.ajax({
            url:'waste3.json',
            // url: 'https://api.github.com/users/'+targetName+'/followers',
            type: 'GET',
            success: function (response) {
                let user_gist_info = (
                    response.reduce(function (previousValue, currentValue) {
                            return previousValue +  `
                                    <div class="card user-info user-followers-info">
                                        <div class="card-body user-followers-info-detail">
                                            <span>${currentValue.login}</span>
                                        </div>
                                    </div>
                                `
                        }
                        , ``)
                );
                $('.user-gists').css('display','none');
                $('.user-followers').css('display','none');
                $(event.target).parent().find('.user-followers').html(user_gist_info).css('display','block');
            }
        });
    })
})