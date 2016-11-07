var cats = ['Fluffy', 'Ralph', 'Bob', 'Tom', 'Sven', 'Lucious', 'Frank'];
var clicks = [0, 0, 0, 0, 0, 0, 0];
var activeCat = 0;

$(document).ready(function () {

    var $catName = $('#cat-name');
    var $catPhoto = $('#cat-photo');
    var $selector = $('#selector');
    var $counter = $('#counter');

    for (var i = 0; i < cats.length; i++) {
    	var elem = document.createElement('div');
    	elem.textContent = cats[i];
		
    	elem.addEventListener('click', (function(clickedCat) {
    		return function() {
	       		$catName.text(cats[clickedCat]);
    			$catPhoto.attr('src', "images/cat" + clickedCat + ".jpg");
        		$counter.text(clicks[clickedCat]);
        		activeCat = clickedCat;
    		};
    	})(i));

    	$selector.append(elem);
    }

    $("#cat-photo").click(function (event) {
    	clicks[activeCat] += 1;
		$counter.text(clicks[activeCat]);        
    });

})
