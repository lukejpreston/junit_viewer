$(document).ready(function() {
    $(".btn").on("click", function() {
        var idSplit = this.id.split("_")
        if (idSplit[0] == "s") {
            $(this)
                .parent()
                .children(".cont")
                .slideToggle(200);
        } else {
            $(this)
                .parent()
                .children("#r_" + idSplit[1])
                .slideToggle(200);
        }
    });
});