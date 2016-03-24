var fireBaseRef = new Firebase("https://comment-wk16.firebaseio.com/")

fireBaseRef.on('child_added', function(snapshot) {
	// // store all current comments from firebase
	var fbData = snapshot.val()

	// create text nodes for username and comment
    var textusername = document.createTextNode("Username: " + fbData.username)
    var textcomment = document.createTextNode("Comment: " + fbData.comment)

    // create new elements
    var newLi = document.createElement("li")
	var newH3 = document.createElement("h3")
	var newP = document.createElement("p")

	// append username to new h3 tag
	newH3.appendChild(textusername)
	// append comment to new p tag
	newP.appendChild(textcomment)
	// append the new h3 tag to the li
	newLi.appendChild(newH3)
	// append the new p tag to the li
	newLi.appendChild(newP)

	// Add class to li tag
	newLi.className = "list-group-item"

	// append li with all data to the element with id="commentList"
	document.getElementById("commentList").appendChild(newLi)
})

function addComment() {
	// get the username and comment and store in variables
	var username = document.getElementById("username").value,
	    comment = document.getElementById("comment").value

	// stop form from being submitted if empty
    if(!username || !comment || username == "undefined" || comment == "undefined") {return}

    // add the new comment as an object to firebase
	fireBaseRef.push({username: username, comment: comment}, function(error) {
		// alert the error if there is one
        if (error !== null) {
            alert(error);
        }
    })
}

// add event listener to the element with id="addComment"
document.getElementById('addComment').addEventListener('click', addComment, false)