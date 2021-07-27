$(function () {
    $("#scrap").click(function () {
        chrome.storage.sync.remove("process"), chrome.storage.sync.get("userType", function (e) {
            if (void 0 !== e.userType)
                if ("demo" != e.userType) {
                    let e = $("#keyword").val(),
                        a = $("#location").val(),
                        r = $("#url").val();
                    if ("" == r) "" == a ? ($("#location").css("border", "2px solid rgb(226, 75, 75)"), $("#location").focus()) : "" == e ? ($("#keyword").css("border", "2px solid rgb(226, 75, 75)"), $("#keyword").focus()) : ($(this).attr("disabled", "disabled"), chrome.storage.sync.get("uuid", function (t) {
                        $("#scrap").attr("disabled", "disabled");
                        let s = t.uuid;
                        s || (s = ""), $.ajax({
                            type: "POST",
                            url: "https://developers.touristerguide.com/jd-ex/",
                            data: {
                                uuid: s,
                                type: "check_validity"
                            },
                            dataType: "json",
                            success: function (t) {
                                $("#scrap").removeAttr("disabled");
                                $(".scrapSection").append('<div class="alert alert-' + t.type + ' alert-dismissible fade show" role="alert" style="position: fixed; left: 0; top: 0; right: 0; height: inherit; border-radius: 0; padding-bottom: 18px;"><strong>Abhi 1' + t.msg + '!</strong><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'), "success" == t.type ? chrome.runtime.sendMessage({
                                    type: "scrap",
                                    value: e,
                                    location: a
                                }) : $("#scrap").removeAttr("disabled")
                            }
                        })
                    }));
                    else {
                        var t = r.replace("http://", "").replace("https://", "").split(/[\/?#]/)[0],
                            s = new URL(r).pathname;
                        0 !== t.indexOf("www.justdial.com") ? alert("plz enter correct url") : "" == (s = s.split("/"))[1] && "" == s[2] ? alert("plz enter correct url") : (a = s[1], e = s[2], $(this).attr("disabled", "disabled"), chrome.storage.sync.get("uuid", function (t) {
                            $("#scrap").attr("disabled", "disabled");
                            let s = t.uuid;
                            s || (s = ""), $.ajax({
                                type: "POST",
                                url: "https://developers.touristerguide.com/jd-ex/",
                                data: {
                                    uuid: s,
                                    type: "check_validity"
                                },
                                dataType: "json",
                                success: function (t) {
                                    $("#scrap").removeAttr("disabled")
                                    $(".scrapSection").append('<div class="alert alert-' + t.type + ' alert-dismissible fade show" role="alert" style="position: fixed; left: 0; top: 0; right: 0; height: inherit; border-radius: 0; padding-bottom: 18px;"><strong>Abhi 2' + t.msg + '!</strong><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'), "success" == t.type ? chrome.runtime.sendMessage({
                                        type: "scrap",
                                        value: e,
                                        location: a
                                    }) : $("#scrap").removeAttr("disabled")
                                }
                            })
                        }))
                    }
                } else $(".scrapSection").append('<div class="alert alert-primary alert-dismissible fade show" role="alert" style="position: fixed; left: 0; top: 0; right: 0; height: inherit; border-radius: 0; padding-bottom: 18px;"><strong>Demo User, </strong> Any Query Call +91 8052808784<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
            else $(".scrapSection").append('<div class="alert alert-primary alert-dismissible fade show" role="alert" style="position: fixed; left: 0; top: 0; right: 0; height: inherit; border-radius: 0; padding-bottom: 18px;"><strong>Demo User, </strong> Any Query Call +91 8052808784<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
        })
    }), chrome.storage.sync.get("userType", function (e) {
        if (void 0 !== e.userType)
            if ("demo" != e.userType) {
                $("#register").remove(), $("#login").parent().remove();
                var t = document.createElement("div");
                // t.setAttribute("class", "col-md-12 button-section"), t.innerHTML = '<a target="_blank" href="./option.html" id="show_record">Show Records </a>';
                var s = document.querySelector("#scrap").parentNode.parentNode,
                    a = document.querySelector("#scrap").parentNode;
                s.insertBefore(t, a.nextSibling)
            } else $(".scrapSection").append('<div class="alert alert-primary alert-dismissible fade show" role="alert" style="position: fixed; left: 0; top: 0; right: 0; height: inherit; border-radius: 0; padding-bottom: 18px;"><strong>Demo User, </strong> Any Query Call +91 8052808784<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
    })
});