{
    
    let ReviewHim = function() {
        let newPostForm = $('#new-post-form');

        console.log(newPostForm);

        newPostForm.submit(function(event) {
            event.preventDefault();
            
            $.ajax({
                type : 'post',
                url : '/posts/create',
                data : newPostForm.serialize(),
                success : function(data) {
                    let newPost = newPostDom(data.data.post);
                    $('#innerMain>ul').prepend(newPost);
                    deletePost( $(' .delete-post-btn', newPost));
                },
                error : function(err) {
                    console.log(`Error :: ${err.responseText}`);
                }
            })

        });
    }
    
    
    
    // submit button handler through AJAX
    let createPost = function() {
        let newPostForm = $('#new-post-form');

        console.log(newPostForm);

        newPostForm.submit(function(event) {
            event.preventDefault();
            
            $.ajax({
                type : 'post',
                url : '/posts/create',
                data : newPostForm.serialize(),
                success : function(data) {
                    let newPost = newPostDom(data.data.post);
                    $('#innerMain>ul').prepend(newPost);
                    deletePost( $(' .delete-post-btn', newPost));
                },
                error : function(err) {
                    console.log(`Error :: ${err.responseText}`);
                }
            })

        });
    }

    // method to create a post in DOM 
    let newPostDom = function(post) {
        console.log("This is the post ::: ", post);
        return $(`<li id="post-${post._id} " class="postLi"> 
                    <div class="postheader">
                        <div class="userDetails">
                            <h1> ${post.user.name}  </h1>
                        </div>
                        <a class="DeletePost delete-post-btn" href="/posts/destroy/${post.id}">Delete</a>
                    </div>
                    
                    <div class="postContent">
                        <p> ${ post.content } </p>
                    </div>             
                
                    <div class="post-comments">
                        <form action="/comments/create" method="POST">
                            <input type="text" name="content" placeholder="Type here to add comment..." required>
                            <input type="hidden" name="post" value="${post._id}">
                            <input type="submit" value="Add Comment">
                        </form>
                        <div class="post-comments-list">
                            <ul class="commentUl" id="post-comments-${ post._id }">
                            </ul>
                        </div>
                    </div>
                </li> `
    )}

    let deletePost = function(deleteLink) {
        $(deletePost).click(function(event){
            event.preventDefault();

            $.ajax({
                type : 'GET',
                url : $(deleteLink).prop('href'),
                success : function(data){
                    $(`#post-${data.post._id}`).remove();
                },
                error : function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    
    createPost();
}