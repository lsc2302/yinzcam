$(document).ready(function() {
    $('#users-list').on('click', '.user-info .user-info-detail', function(event){
        let targetName = event.target.innerText.trim();
        $.ajax({
            url:'waste1.json',
            // url: 'https://api.github.com/users/'+targetName+'/gists',
            type: 'GET',
            success: function (response) {
                let user_info = (
                    response.reduce(function (previousValue, currentValue) {
                            return previousValue +  `
                                    <div class="card user-gist-info">
                                        <div class="card-body user-gist-info-detail">
                                            <span>${currentValue.description}</span>
                                            <span>${currentValue.url}</span>
                                        </div>
                                    </div>
                                `
                        }
                        , ``)
                );
                $('.user-followers').css('display','none');
                $('.user-gists').css('display','none');
                $(event.currentTarget).parent().find('.user-gists').html(user_info).css('display','block');
            }
        });
    });
})