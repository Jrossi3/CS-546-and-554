(function ($) {
    // Let's start writing AJAX calls!
  
    var showList = $('#showList'),
        show = $('#show'),
        searchForm = $('#searchForm'),
        searchTerm = $('#search_term'),
        heading = $('#the-heading'),
        homeLink = $('#homeLink'),
        name = $('#name'),
        img1 = $('#img'),
        dl = $('#dlList')

    var requestConfig = {
        method: 'GET',
        url: 'http://api.tvmaze.com/shows'
    };
    $.ajax(requestConfig).then(function (responseMessage) {
        for (let i = 0; i < responseMessage.length; i++){
            link = responseMessage[i]._links.self.href
            console.log(link)
            showList.append("<li><a href="+link+">"+responseMessage[i].name+"</a></li>")
        }
        homeLink.hide()
    });
    $("#showList").on("click", function(event){
        showList.hide()
        heading.hide()
        homeLink.show()
        event.preventDefault()
        console.log(event.target)
        var href = $(event.target).attr('href');
        var help = {
            url: href
        }
        $.ajax(help).then(function(x){
            console.log(x)
            console.log(x.name)
            name.append("<p>"+x.name+"</p>")
            imgSource = x.image.medium
            if(!imgSource){
                imgSource = ""
            }
            var image = new Image();
            image.src = imgSource;
            img1.append(image)
            dl.append("<p style='font-weight:bold'>"+"Languages</p>")
            dl.append("<p>"+x.language+"</p>")
            dl.append("<p style='font-weight:bold'>"+"Genres</p>")
            if(x.genres.length==0){
                x.genres = "N/A"
                dl.append("<p>"+x.genres+"</p>")
            } else {
                for (let i = 0; i < x.genres.length; i++){
                    dl.append("<ul>"+x.genres[i]+"</ul>")
                }
            }
            dl.append("<p style='font-weight:bold'>"+"Average Rating</p>")
            if (typeof x.rating.average == 'object'){
                x.rating.average = "N/A"
            }
            dl.append("<p>"+x.rating.average+"</p>")
            dl.append("<p style='font-weight:bold'>"+"Network</p>")
            if (typeof x.network.name == 'object'){
                x.network.name = "N/A"
            }
            dl.append("<p>"+x.network.name+"</p>")
            dl.append("<p style='font-weight:bold'>"+"Summary</p>")
            if (typeof x.summary == 'object'){
                x.summary = "N/A"
            }
            dl.append("<p>"+x.summary+"</p>")
        })
    })
    
    $("#buttonSubmit").on("click",function(event){
        homeLink.show()
        if(!searchTerm.val()){
            alert("Must put a value!")
        }else{
            showList.empty()
            show.hide()
            event.preventDefault()
            var searchBox = {
                method: 'GET',
                url: 'http://api.tvmaze.com/search/shows?q=' + searchTerm.val()
            };
            $.ajax(searchBox).then(function (responseMessage) {
                console.log(responseMessage)
                for(let i = 0; i < responseMessage.length; i++){
                    link = responseMessage[i].show._links.self.href
                    showList.append("<ul><a href="+link+">"+responseMessage[i].show.name+"</a></ul>")
                }
            });
        }
        
    })
    showList.show()

})(window.jQuery);