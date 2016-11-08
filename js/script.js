$(function () {

    var model = {
        activeCat: 0, 
        init: function() {
            if (!localStorage.catclicker) {
                localStorage.catclicker = JSON.stringify([]);
                octopus.addAllCats();
            }
        }, 
        add: function(obj) {
            var data = JSON.parse(localStorage.catclicker);
            data.push(obj);
            localStorage.catclicker = JSON.stringify(data);
        }, 
        get: function() {
            return JSON.parse(localStorage.catclicker);
        }, 
        incrementClicks: function() {
            var data = JSON.parse(localStorage.catclicker);
            for (var i = 0; i < data.length; i++) {
                if (data[i]['id'] == model.activeCat) {
                    data[i]['clicks'] = data[i]['clicks'] + 1;
                    break;
                }
            }
            localStorage.catclicker = JSON.stringify(data);
        }, 
        getActive: function() {
            return model.activeCat;
        }, 
        setActive: function(newCat) {
            model.activeCat = newCat;
        }
    };

    var octopus = {
        addAllCats: function() {
            var cats = ['Fluffy', 'Ralph', 'Bob', 'Tom', 'Sven', 'Lucious', 'Frank'];
            for (var i = 0; i < cats.length; i++) {
                model.add({
                    id: i, 
                    name: cats[i], 
                    photo: "images/cat" + i + ".jpg", 
                    clicks: 0
                });
            }
        }, 
        getCats: function() {
            return model.get();
        }, 
        getCatByID: function(catID) {
            var data = model.get();
            for (var i = 0; i < data.length; i++) {
                if (data[i].id == catID) {
                    return data[i];
                }
            }
            return 'Cat ID Not Found';
        }, 
        updateClicks: function(catID) {
            model.incrementClicks(catID);
        }, 
        init: function() {
            model.init();
            view.init();
        }, 
        getActive: function() {
            return model.getActive();
        }, 
        setActive: function(newCat) {
            model.setActive(newCat);
        }
    };

    var view = {
        init: function() {
            view.renderSelector();
            view.renderViewer(0);

            $("#cat-viewer").click(function (event) {
                octopus.updateClicks();
                view.renderViewer(octopus.getActive());
            });
        }, 
        renderSelector: function() {
            var data = octopus.getCats()
            var $selector = $('#cat-selector');
            for (var i = 0; i < data.length; i++) {
                var elem = document.createElement('div');
                elem.textContent = data[i].name;
                
                elem.addEventListener('click', (function(i) {
                    return function() {
                        octopus.setActive(i);
                        view.renderViewer(i);
                    };
                })(i));

                $selector.append(elem);
            }
        }, 
        renderViewer: function(catID) {
            cat = octopus.getCatByID(catID);
            var elem = document.getElementById('cat-viewer');
            elem.innerHTML = '<h3 id="cat-name">' + 
                cat.name + 
                '</h3><img class="photo" id="cat-photo" src="' + 
                cat.photo + '">' + 
                '<h3 id="counter-header">Clicker Counter: ' + 
                cat.clicks + '</h3>';
        }
    };

    octopus.init();
});


