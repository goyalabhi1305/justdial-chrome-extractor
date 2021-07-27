function create_notifications(e, t) {
    chrome.notifications.create(e, t)
}
$(function () {
    $("#registerForm").submit(function (e) {
        let t = jQuery('input[name="name"]').val(),
            s = jQuery('input[name="mobile"]').val(),
            n = jQuery('input[name="otp"]').val(),
            a = jQuery('input[name="sponsor"]').val();
        "" == t || "" == s || "" == n ? ("" == t ? ($("input").css("border", "none"), $("input[name=name]").css("border", "1.5px solid #c50707"), $("input[name=name]").focus()) : "" == s ? ($("input").css("border", "none"), $("input[name=mobile]").css("border", "1.5px solid #c50707"), $("input[name=mobile]").focus()) : "" == n && ($("input").css("border", "none"), $("input[name=otp]").css("border", "1.5px solid #c50707"), $("input[name=otp]").focus()), e.preventDefault()) : ($("input").css("border", "none"), e.preventDefault(), $.ajax({
            type: "POST",
            url: "https://goyral.com/jd/index.php",
            data: {
                name: t,
                mobile: s,
                type: "registration",
                otp: n,
                sponsor: a
            },
            dataType: "json",
            success: function (e) {
                console.log(e), "success" == e.type && (jQuery('input[name="name"]').val(""), jQuery('input[name="mobile"]').val(""), jQuery('input[name="otp"]').val(""), jQuery('input[name="dealer"]').val(""), jQuery('input[name="sponsor"]').val(""), chrome.storage.sync.set({
                    uuid: e.data
                }), chrome.storage.sync.set({
                    userType: "register"
                }));
                let t = {
                    type: "basic",
                    iconUrl: "../images/icon_16.png",
                    title: e.type,
                    message: e.msg + ". Any Query call or whatsapp our support +918052808784"
                };
                create_notifications(e.msg, t), $(".registerSection").append('<div class="alert alert-' + e.type + ' alert-dismissible fade show" role="alert"><strong>' + e.msg + '</strong><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'), "success" == e.type && (location.href = "./index.html")
            }
        }))
    }), $(".otpButton").click(function () {
        let e = jQuery('input[name="mobile"]').val();
        "" == e ? ($("input").css("border", "none"), $("input[name=mobile]").css("border", "1.5px solid #c50707"), $("input[name=mobile]").focus()) : ($(".otpButton").attr("disabled", "disabled"), $.ajax({
            type: "POST",
            url: "https://goyral.com/jd/index.php",
            data: {
                mobile: e,
                type: "send_otp"
            },
            dataType: "json",
            success: function (e) {
                $(".registerSection").append('<div class="alert alert-' + e.type + ' alert-dismissible fade show" role="alert" style="border-radius: 0px;"><strong>' + e.msg + '</strong><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'), "success" == e.type ? ($("#mobile").attr("disabled", "disabled"), $(".otpButton").parent().remove(), $("input[name=otp]").removeAttr("disabled")) : $(".otpButton").removeAttr("disabled")
            }
        }))
    })
});