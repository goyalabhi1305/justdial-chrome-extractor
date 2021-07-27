let demo = "";

function create_notifications(e, t) {
    chrome.notifications.create(e, t)
}
chrome.runtime.onMessage.addListener(function (e, t, o) {
    if ("scrap" == e.type) chrome.storage.sync.get("userType", function (t) {
        if (t.userType)
            if ("demo" == t.userType) {
                demo = "expire", create_notifications("softwareexpire", {
                    type: "basic",
                    iconUrl: "../images/icon_16.png",
                    title: "Demo User",
                    message: "Your Demo Period Expire Plz Purchase Software to more extraction"
                })
            } else {
                create_notifications("extractionstart", {
                    type: "basic",
                    iconUrl: "../images/icon_16.png",
                    title: "Full User",
                    message: "Extraction Start, if you check extracted data goto option menu right click on extension"
                })
            }
        else {
            create_notifications("extractionstart", {
                type: "basic",
                iconUrl: "../images/icon_16.png",
                title: "Demo User",
                message: "Your Demo Period Activated Maximum 20 number will scrap in demo period"
            }), chrome.storage.sync.set({
                userType: "demo"
            })
        }
        if ("expire" != demo) {
            let t = e.value.split(" "),
                o = "";
            for (let e = 0; e < t.length; e++) o += t[e] + "-";
            let a = o.substr(0, o.length - 1),
                i = "https://www.justdial.com/" + encodeURI(e.location) + "/" + encodeURI(a);
            chrome.storage.sync.set({
                searchKeyword: e.location + "_" + e.value
            }), chrome.tabs.create({
                url: i
            })
        }
    });
    else if ("scrap_complete" == e.type) create_notifications("datadownload", e.notificationOption), window.open("chrome-extension://oendnfbkjengepgfmifkmgheeidadlii/html/option.html");
    else if ("demo_user" == e.type) {
        create_notifications("demouser", {
            type: "basic",
            iconUrl: "../images/icon_16.png",
            title: e.value,
            message: "Your Software " + e.value
        })
    } else if ("download_file" == e.type) {
        let t = e.value;
        chrome.storage.local.get(t, function (e) {
            output = JSON.parse(e[t]), downloadFile = "S.No.,Name,Address,Phone,Website\r\n";
            let o = [];
            for (let e = 0; e < output.name.length; e++) o.push(output.phone[e].replace(/,/g, ""));
            let a = 1,
                i = [];
            $.each(o, function (e, t) {
                if (-1 === $.inArray(t, i)) {
                    i.push(t);
                    let o = a;
                    a++;
                    let r = output.name[e].replace(/,/g, ""),
                        n = output.address[e].replace(/,/g, ""),
                        c = output.phone[e].replace(/,/g, ""),
                        s = output.url[e].replace(/,/g, "");
                    downloadFile = downloadFile + o + "," + r + "," + n + "," + c + "," + s + "\r\n"
                }
            });
            var r = new Date;
            let n = "goyral jd extractor/" + t + "_" + r.getDate() + "_" + ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][r.getMonth()] + "_" + r.getFullYear() + ".csv";
            chrome.downloads.download({
                url: "data:text/csv;charset=utf-8," + downloadFile,
                filename: n
            })
        })
    } else "wipe_cache" == e.type && chrome.browsingData.remove({
        since: 0,
        origins: ["https://www.justdial.com"]
    }, {
        appcache: !0,
        cache: !0,
        cacheStorage: !0,
        cookies: !0
    })
});