var newMemeSet;
var ownedMemes = [];
var currentMeme;
var memeIDCount = 1;

var PURCHASE_FEE_RATIO = 1.15;

var subredditList = ["memes", "dankmemes", "historymemes", "reactionpics", "historymemes", "comedycemetery", "dankmemes", "indianpeoplefacebook", "wheredidthesodago", "2meirl4meirl", "wholesomememes"]
var sortTypes = ["controversial", "rising", "new"];

//refresh set of memes
function reloadNewMemes() {
    var s = document.createElement("script");
    
    var sub = subredditList[Math.floor(Math.random()*subredditList.length)];
    var sort = sortTypes[Math.floor(Math.random()*sortTypes.length)];
    
    s.src = "http://www.reddit.com/r/" + sub + "/" + sort + ".json?limit=200&amp;jsonp=getRandomMemeCallback";
    
    document.body.appendChild(s);
    document.body.removeChild(s);
}

//get a random meme from the 
function getRandomMemeCallback(data) {
    if(newMemeSet == null) {
      newMemeSet = data;
      updateGraphics();
      
    } else
      newMemeSet = data;
}

//get random meme from current meme set
function getRandomMeme() {
    if(newMemeSet == null) return "err | meme set not initialised";

    while(true) {
        var index = Math.floor(Math.random() * newMemeSet.data.children.length);
        var permalink = newMemeSet.data.children[index].data.permalink;
        var title = newMemeSet.data.children[index].data.title;
        var score = newMemeSet.data.children[index].data.score;
        var imgUrl = newMemeSet.data.children[index].data.url;
        var time = newMemeSet.data.children[index].data.created;
        var id = memeIDCount++;
        
        var m = new Meme(title, permalink, imgUrl, time, score, id);

        for(var i = 0; i < ownedMemes.length; i++) {
            if(ownedMemes[i].permalink == m.permalink) continue;
        }
        
        if(imgUrl.endsWith(".jpg"))
            return m;
    }
}

setInterval(reloadNewMemes, 10000);
reloadNewMemes();

function updateMemeCallback(data) {
    var score = data[0].data.children[0].data.score;
    var permalink = data[0].data.children[0].data.permalink;

    for(var i = 0; i < ownedMemes.length; i++) {
        if(ownedMemes[i].permalink == permalink) {
            ownedMemes[i].prevScore = ownedMemes[i].score;
            ownedMemes[i].change = score - ownedMemes[i].prevScore;
            ownedMemes[i].score = score;
            break;
        }
    }
}

function updateMemeData(meme) {
    var s = document.createElement("script");
    s.src = "http://www.reddit.com" + meme.permalink + ".json?jsonp=updateMemeCallback";
    document.body.appendChild(s);
    document.body.removeChild(s);
}

// Note: when bought meme, add to ownedMemes array

function updateGraphics() {
    currentMeme = getRandomMeme();
    document.getElementById("memeTitle").innerHTML = currentMeme.title;
    document.getElementById("memeImage").src = currentMeme.imgURL;
    document.getElementById("memeCost").innerHTML = Math.floor(currentMeme.score * PURCHASE_FEE_RATIO);
}
