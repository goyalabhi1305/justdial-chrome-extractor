! function (e) {
    e.fn.extend({
        tableHTMLExport: function (t) {
            var n = {
                separator: ",",
                newline: "\r\n",
                ignoreColumns: "",
                ignoreRows: "",
                type: "csv",
                htmlContent: !1,
                consoleLog: !1,
                trimContent: !0,
                quoteFields: !0,
                filename: "tableHTMLExport.csv"
            };

            function o(e) {
                return n.htmlContent ? content_data = e.html().trim() : content_data = e.text().trim(), content_data
            }

            function r(e, t) {
                e = e.replace(".csv", ""), chrome.runtime.sendMessage({
                    value: e,
                    type: "download_file"
                })
            }

            function a(n) {
                var r = [];
                e(n).find("thead").find("tr").not(t.ignoreRows).each(function () {
                    var n = [];
                    e(this).find("th").not(t.ignoreColumns).each(function (t, r) {
                        "none" != e(this).css("display") && n.push(o(e(this)))
                    }), r.push(n)
                });
                var a = [];
                return e(n).find("tbody").find("tr").not(t.ignoreRows).each(function () {
                    var n = [];
                    e(this).find("td").not(t.ignoreColumns).each(function (t, r) {
                        "none" != e(this).css("display") && n.push(o(e(this)))
                    }), a.push(n)
                }), {
                    header: r[0],
                    data: a
                }
            }
            var s;
            if ("csv" == (t = e.extend(n, t)).type || "txt" == t.type) {
                var l = this.filter("table");
                if (l.length <= 0) throw new Error("tableHTMLExport must be called on a <table> element");
                if (l.length > 1) throw new Error("converting multiple table elements at once is not supported yet");
                s = function (n) {
                    var o = "S.No" + t.separator + "Name" + t.separator + "Address" + t.separator + "Phone" + t.separator + "Website" + t.separator + t.newline,
                        r = e("#example").DataTable().rows().data();
                    for (i = 0; i < r.length; i++) {
                        for (j = 0; j < 8; j++) content = e.trim(r[i][j]), 3 == j || 4 == j ? (content = e(content).text(), o += content) : o += '"' + content + '"', o += t.separator;
                        o += t.newline
                    }
                    return o
                }(), n.consoleLog && console.log(s), r(t.filename)
            } else if ("json" == t.type) {
                var c = a(this);
                n.consoleLog && console.log(JSON.stringify(c)), s = JSON.stringify(c), r(t.filename)
            } else if ("pdf" == t.type) {
                c = a(this);
                n.consoleLog && console.log(c);
                var f = new jsPDF("p", "pt");
                f.autoTable(c.header, c.data), f.save(t.filename)
            }
            return this
        }
    })
}(jQuery);