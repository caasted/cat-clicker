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
                if (data[i]['id'] == this.activeCat) {
                    data[i]['clicks'] = data[i]['clicks'] + 1;
                    break;
                }
            }
            localStorage.catclicker = JSON.stringify(data);
        }, 
        modify: function(name, photo, clicks) {
            var data = JSON.parse(localStorage.catclicker);
            for (var i = 0; i < data.length; i++) {
                if (data[i]['id'] == this.activeCat) {
                    data[i]['name'] = name;
                    data[i]['photo'] = photo;
                    data[i]['clicks'] = clicks;
                    break;
                }
            }
            localStorage.catclicker = JSON.stringify(data);
        }, getActive: function() {
            return this.activeCat;
        }, 
        setActive: function(selectedCat) {
            this.activeCat = selectedCat;
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
        getActiveCat: function() {
            var data = model.get();
            for (var i = 0; i < data.length; i++) {
                if (data[i].id == model.activeCat) {
                    return data[i];
                }
            }
            return 'Cat ID Not Found';
        }, 
        updateClicks: function() {
            model.incrementClicks();
        }, 
        init: function() {
            model.init();
            view.init();
        }, 
        getActive: function() {
            return model.getActive();
        }, 
        setActive: function(selectedCat) {
            model.setActive(selectedCat);
        }, 
        modify: function(name, photo, clicks) {
            model.modify(name, photo, clicks);
        }
    };

    var view = {
        init: function() {
            this.renderSelector();
            this.renderViewer();

            var form = document.getElementById('admin-form');
                form.innerHTML = '<form>Name: <input type="text" id="name" ' + 
                    'value=""><br>' + 
                    'ImageURL: <input type="text" id="photo" ' + 
                    'value=""><br>' + 
                    '# Clicks: <input type="text" id="clicks" ' + 
                    'value=""></form>' + 
                    '<button type="button" id="cancel-update">Cancel</button>' + 
                    '<button type="button" id="submit-update">Submit</button>'
            this.renderAdmin();

            $("#cat-viewer").click(function (event) {
                octopus.updateClicks();
                view.renderViewer();
            });

            $("#admin-toggle").click(function (event) {
                view.adminVisible = !view.adminVisible;
                view.renderAdmin();
            });

            $("#cancel-update").click(function (event) {
                view.adminVisible = !view.adminVisible;
                view.renderAdmin();
            });

            $("#submit-update").click(function (event) {
                octopus.modify(document.getElementById('name').value, 
                    document.getElementById('photo').value, 
                    parseInt(document.getElementById('clicks').value));
                view.renderViewer();
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
                        view.renderViewer();
                        view.renderAdmin();
                    };
                })(i));

                $selector.append(elem);
            }
        }, 
        renderViewer: function() {
            cat = octopus.getActiveCat();
            var elem = document.getElementById('cat-viewer');
            elem.innerHTML = '<h3 id="cat-name">' + 
                cat.name + 
                '</h3><img class="cat-photo" id="cat-photo" src="' + 
                cat.photo + '">' + 
                '<h3 id="counter-header">Clicker Counter: ' + 
                cat.clicks + '</h3>';
        }, 
        renderAdmin: function() {
            var elem = document.getElementById('admin-toggle');
            elem.innerHTML = '<button type="button">Admin</button>'
            if (this.adminVisible) {
                var form = document.getElementById('admin-form');
                form.style.display = 'block';
                cat = octopus.getActiveCat();
                var name = document.getElementById('name');
                var photo = document.getElementById('photo');
                var clicks = document.getElementById('clicks');
                name.value = cat.name;
                photo.value = cat.photo;
                clicks.value = cat.clicks;
            } else {
                var form = document.getElementById('admin-form');
                form.style.display = 'none';
            }

        }, 
        adminVisible: false
    };

    octopus.init();
});


