$(function () {
    load();
    $("#title").on("keydown", function (event) {
        if (event.keyCode === 13) {
            var local = getDate();
            local.push({
                title: $(this).val(),
                down: false
            });
            saveDate(local);
            load();
        }
    })
    $("ol").on("click", "a", function () {
        var date = getDate();
        var index = $(this).attr("id");
        date.splice(index, 1);
        saveDate(date);
        load();
    })
    $("ol,ul").on("click", "input", function () {
        var date = getDate();
        var index = $(this).siblings("a").attr("id");
        date[index].down = $(this).prop("checked");
        console.log(date);
        saveDate(date);
        load();        
    })

    function getDate() {
        var date = localStorage.getItem("todolist");
        if (date !== null) {
            return JSON.parse(date);
        } else {
            return [];
        }
    }

    function saveDate(date) {
        localStorage.setItem("todolist", JSON.stringify(date));
    }

    function load() {
        $("ol,ul").empty();
        var date = getDate();
        $.each(date, function (i, ele) {
            if (ele.down) {
                $("ul").prepend("<li><input type='checkbox' checked='checked'><p>" + ele.title + "</p><a href='javascript:;'id=" + i + "></a></li>");
            }else {
                $("ol").prepend("<li><input type='checkbox'><p>" + ele.title + "</p><a href='javascript:;'id=" + i + "></a></li>");
            }
        })
    }
})