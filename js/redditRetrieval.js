var newMemeSet;
var ownedMemes = [];

//refresh set of memes
function reloadNewMemes() {
    var s = document.createElement("script");
    s.src = "http://www.reddit.com/r/memes/new.json?limit=200&amp;jsonp=getRandomMemeCallback";
    document.body.appendChild(s);
}

//get a random meme from the 
function getRandomMemeCallback(data) {
    if(newMemeSet == null) {
      newMemeSet = data;
      document.getElementById("memeImage").src = getRandomMeme().imgURL;
    } else
      newMemeSet = data;
}

//get random meme from current meme set
function getRandomMeme() {
    if(newMemeSet == null) return "err | meme set not initialised";

    var index = Math.floor(Math.random() * newMemeSet.data.children.length);
    var permalink = newMemeSet.data.children[index].data.permalink;
    var title = newMemeSet.data.children[index].data.title;
    var score = newMemeSet.data.children[index].data.score;
    var imgUrl = newMemeSet.data.children[index].data.url;
    var time = newMemeSet.data.children[index].data.created;


    return new Meme(title, permalink, imgUrl, time, score);
}

setInterval(reloadNewMemes, 10000);
reloadNewMemes();

function updateMemeCallback(data) {
    var score = data[0].data.children[0].data.score;
    var permalink = data[0].data.children[0].data.permalink;

    for(var i = 0; i < ownedMemes.length; i++) {
        if(ownedMemes[i].permalink == permalink) {
            ownedMemes[i].score = score;
            break;
        }
    }
}

function updateMemeData(meme) {
    var s = document.createElement("script");
    s.src = "http://www.reddit.com" + meme.permalink + ".json?jsonp=updateMemeCallback";
    document.body.appendChild(s);
}

// Note: when bought meme, add to ownedMemes array