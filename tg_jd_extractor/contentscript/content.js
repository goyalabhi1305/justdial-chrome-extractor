function getMobile(e) {
    let o = document.querySelectorAll(".contact-info span a")[e].querySelectorAll("span").length;
    mobile = "";
    for (let t = 0; t < o; t++) {
        let o = document.querySelectorAll(".contact-info span a")[e].querySelectorAll("span")[t].getAttribute("class");
        "mobilesv icon-dc" == o ? mobile = mobile.concat("+") : "mobilesv icon-ba" == o ? mobile = mobile.concat("-") : "mobilesv icon-fe" == o ? mobile = mobile.concat("(") : "mobilesv icon-hg" == o ? mobile = mobile.concat(")") : "mobilesv icon-acb" == o ? mobile = mobile.concat("0") : "mobilesv icon-yz" == o ? mobile = mobile.concat("1") : "mobilesv icon-wx" == o ? mobile = mobile.concat("2") : "mobilesv icon-vu" == o ? mobile = mobile.concat("3") : "mobilesv icon-ts" == o ? mobile = mobile.concat("4") : "mobilesv icon-rq" == o ? mobile = mobile.concat("5") : "mobilesv icon-po" == o ? mobile = mobile.concat("6") : "mobilesv icon-nm" == o ? mobile = mobile.concat("7") : "mobilesv icon-lk" == o ? mobile = mobile.concat("8") : "mobilesv icon-ji" == o && (mobile = mobile.concat("9"))
    }
    let t = mobile.indexOf("-"),
        n = mobile.length;
    return mobile = mobile.substring(t + 1, n), mobile
}

function create_notifications(e, o) {
    chrome.runtime.sendMessage({
        value: e,
        type: "scrap_complete",
        notificationOption: o
    })
}
$(function () {
    let e = 0,
        o = 0,
        t = "",
        n = "not";
    currentPage = 1;
    let l = document.querySelectorAll("li.cntanr").length;
    if (null == document.querySelector("#srchpagination") ? pageLength = 1 : pageLength = document.querySelector("#srchpagination").lastChild.previousElementSibling.innerText, pageLength > 1)
        for (let e = 0; e < document.querySelector("#srchpagination").childElementCount; e++) allPage = document.querySelector("#srchpagination").children, "SPAN" == allPage[e].tagName && (currentPage = allPage[e].innerText);
    let c = [""],
        a = [""],
        r = [""],
        s = [""];

    function m() {
        var e = $(window).scrollTop() + $(window).height();
        for (i = 0; i < 40; i++) e += 676, $("html, body").animate({
            scrollTop: e
        }, 3e3)
    }

    function u() {
        setTimeout(function () {
            if (l > e) ! function (e) {
                setTimeout(function () {
                    document.getElementsByClassName("lng_cont_name").length > 0 ? c[o] = document.getElementsByClassName("lng_cont_name")[e].innerText : c[o] = "", document.querySelectorAll(".contact-info span a").length > 0 ? r[o] = getMobile(e) : r[o] = "", document.getElementsByClassName("cont_fl_addr").length > 0 ? (a[o] = document.getElementsByClassName("cont_fl_addr")[e].innerText, a[o] = a[o].split("#").join("")) : a[o] = "", document.querySelectorAll(".store-name a").length > 0 ? s[o] = document.querySelectorAll(".store-name a")[e].getAttribute("href") : s[o] = "";
                    let t = JSON.stringify({
                        name: c,
                        address: a,
                        phone: r,
                        url: s
                    });
                    chrome.storage.local.set({
                        [n]: t
                    }), o++
                }, 1e3)
            }(e), e++, u();
            else if (lastCard = document.querySelectorAll(".cntanr").length, parseInt(pageLength) > parseInt(currentPage) && e == lastCard) {
                chrome.storage.sync.set({
                    process: n
                });
                for (let e = 0; e < document.querySelector("#srchpagination").childElementCount; e++) allPage = document.querySelector("#srchpagination").children, "SPAN" == allPage[e].tagName && (chrome.runtime.sendMessage({
                    value: "",
                    type: "wipe_cache"
                }), allPage[e].nextSibling.click())
            } else l = document.querySelectorAll("li.cntanr").length, u()
        }, 1e3)
    }
    chrome.storage.sync.get("searchKeyword", function (e) {
        n = e.searchKeyword, chrome.storage.sync.remove("searchKeyword")
    }), chrome.storage.sync.get("userType", function (e) {
        "demo" == e.userType && (t = "demo")
    }), "demo" != t && setTimeout(function () {
        "not" != n && void 0 !== n ? (m(), n = n.replace(" ", "_"), chrome.storage.local.get("key", function (e) {
            if (e.key) output = JSON.parse(e.key), output.key[output.key.length] = n, key = output.key, scrapData = JSON.stringify({
                key: key
            }), chrome.storage.local.set({
                key: scrapData
            }), u();
            else {
                let e = JSON.stringify({
                    key: [n]
                });
                chrome.storage.local.set({
                    key: e
                }), u()
            }
        })) : chrome.storage.sync.get("process", function (e) {
            process = e.process, chrome.storage.sync.remove("process"), "undefined" != typeof process && (n = process, chrome.storage.local.get(n, function (e) {
                output = JSON.parse(e[n]);
                for (var t = 0; t < output.name.length; t++) c[o] = output.name[t], r[o] = output.phone[t], a[o] = output.address[t], s[o] = output.url[t], o++;
                m(), u()
            }))
        })
    }, 1e3)
});