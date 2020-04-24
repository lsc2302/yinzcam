$(document).ready(function() {
    //request for user repo info
    $('#users-list').on('click', '.user-info .user-info-detail', function(event){
        let targetName = event.target.innerText.trim().substr(6);
        $.ajax({
            url: 'https://api.github.com/users/'+targetName+'/repos',
            type: 'GET',
            success: function (response) {
                let user_info = (
                    response.reduce(function (previousValue, currentValue) {
                            return previousValue +  `
                                    <div class="card user-repo-info">
                                        <div class="card-body user-repo-info-detail">
                                            <span>Repo Name: ${currentValue.name}</span><br/>
                                        </div>
                                    </div>
                                `
                        }
                        , ``)
                );
                $('.user-followers').css('display','none');
                $('.user-repos').css('display','none');
                $(event.currentTarget).parent().find('.user-repos').html(user_info).css('display','block');
            }
        });
    });
})