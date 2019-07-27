let articleId;

$("#commentArea").hide();
$(document).ready(function () {

    $.getJSON("/articles", (data) => {

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

    })

    $(document).on('click', '#submitCom', () => {
        event.preventDefault();
        //Save the id from the button tag
        console.log(articleId)
        $.post("/addComment/" + articleId, {comment: $('#commentField').val()}, (data, status) =>{
           console.log(data);
           console.log(status)
        })

    })



})