$(document).ready(function(){
    //request for user follower info
    $('#users-list').on('click', '.user-info .followers-btn', function(event){
        let targetName = $(event.target).parent().find('.login-display').text().trim().substr(6);
        $.ajax({
            url: 'https://api.github.com/users/'+targetName+'/followers',
            type: 'GET',
            success: function (response) {
                let user_gist_info = (
                    response.reduce(function (previousValue, currentValue) {
                            return previousValue +  `
                                    <div class="card user-info user-followers-info">
                                        <div class="card-body user-followers-info-detail">
                                            <span>Follower： ${currentValue.login}</span>
                                        </div>
                                    </div>
                                `
                        }
                        , ``)
                );
                $('.user-repos').css('display','none');
                $('.user-followers').css('display','none');
                $(event.target).parent().find('.user-followers').html(user_gist_info).toggle();
            }
        });
    })
})