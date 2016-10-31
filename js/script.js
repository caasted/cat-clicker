var count = 0;

$(document).ready(function () {
    var $counter = $('#counter');
    $(".photo").click(function () {
        count = count + 1;
        $counter.text(count);
    });
})
