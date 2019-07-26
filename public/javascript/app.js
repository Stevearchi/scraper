$.getJSON("/articles", data => {
    console.log(data);
    for (let i = 0; i < data.length; i++){
        let artSection = '<div class="row"> <div class="col-md-9"> <h2><a href="';
        artSection+= data[i].link + '">';
        artSection+= data[i].headline + "</a></h2>";
        artSection+= '</div> <div class="col-md-3"> <button class="" data-id=';
        artSection+= data[i]._id + ">View comments</button> </div> </div>";
        artSection+= '<div class="row"> <div class="col"><p>';
        artSection+= data[i].summary + '</p></div></div>'
        $("#articles").append(artSection);  
    }
    
})

//  <div class="row">
//                 <div class="col-md-9">
//                 </div>
//                 <div class="col-md-3" id="stuff">
//                     <button></button>
//                 </div>
//             </div>