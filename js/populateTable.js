
function addToTable(meme){
  var Notd = document.createElement("td");
  var Titletd = document.createElement("td");
  var Linktd = document.createElement("td");
  var link = document.createElement('a');
  var Valuetd = document.createElement("td");
  var Changetd = document.createElement("td");
  var Memetr = document.createElement("tr");

  Memetr.id = "meme-"+meme.id;
  link.href = "https://www.reddit.com"+meme.permalink;
  link.innerHTML = "LINK";
  Notd.innerHTML = meme.id;
  Titletd.innerHTML = meme.title;
  Linktd.appendChild(link);
  Valuetd.innerHTML = meme.getValue().toFixed(4);
  Changetd.innerHTML = meme.getChange();

  Memetr.appendChild(Notd);
  Memetr.appendChild(Titletd);
  Memetr.appendChild(Linktd);
  Memetr.appendChild(Valuetd);
  Memetr.appendChild(Changetd);
  document.getElementById("OwnedMemes").appendChild(Memetr); 
}

function removeFromTable(meme){
  let query = "meme-"+meme.id;
  let row = document.getElementById(query);
  row.parentElement.removeChild(row);
}

function updateValuesTable(){
  if (ownedMemes.length === 0) return "err | empty meme ownership";
  //update each row in the table
  for (let i = 0; i<ownedMemes.length; i++) {
    removeFromTable(ownedMemes[i]);
    ownedMemes[i].updateData();
    addToTable(ownedMemes[i]);
  }
}

// setInterval(updateValuesTable, 2000);


