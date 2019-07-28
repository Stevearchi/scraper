$(document).ready(function () {

    let articleId;

    $("#commentArea").hide();

    // function which displays comments for a given article
    const displayComments = (article) => {
        const comArea = $(comments);
        comArea.empty();
        $.get('/comments/' + article)
        .then (articleWithComments => {

            // console.log(articleWithComments)
            articleWithComments.comments.forEach(comment => {
                console.log('Comments: ' , comment.comment)
                comArea.append("<p>", comment.comment, "</p>")
            });
        })
       
    }



    $.getJSON("/articles", (data) => {
        // display summary and headline for all articles in DB as links to the articles on NPR.org
        for (let i = 0; i < data.length; i++) {
            let artSection = '<div class="row"> <div class="col-md-9"> <h2><a href="';
            artSection += data[i].link + '">';
            artSection += data[i].headline + "</a></h2>";
            artSection += '</div> <div class="col-md-3"> <button class="comButton" data-id=';
            artSection += data[i]._id + ">View comments</button> </div> </div>";
            artSection += '<div class="row"> <div class="col"><p>';
            artSection += data[i].summary + '</p></div></div>';
            $("#articles").append(artSection);

        }

    })

    $(document).on('click', '.comButton', function () {
        // event.preventDefault();
        articleId = $(this).data("id")
        $.get("/comments/" + articleId, data => {

        })

        $("#commentArea").show();
        displayComments(articleId);
    })

    $(document).on('click', '#submitCom', () => {
        event.preventDefault();
        //Save the id from the button tag
        $.post("/addComment/" + articleId, { comment: $('#commentField').val().trim() }, (data, status) => {
  
            displayComments(articleId);
            $('#commentField').val() = "";
        })
    })
});