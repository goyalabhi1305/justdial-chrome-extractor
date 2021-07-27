function create_notifications(e, t) {
    chrome.notifications.create(e, t)
}
$(function () {
    $("#loginForm").submit(function (e) {
        let t = jQuery('input[name="mobile"]').val(),
            s = jQuery('input[name="otp"]').val();  
        "" == t || "" == s ? ("" == t ? ($("input").css("border", "none"), $("input[name=mobile]").css("border", "1.5px solid #c50707"), $("input[name=mobile]").focus()) : "" == s && ($("input").css("border", "none"), $("input[name=otp]").css("border", "1.5px solid #c50707"), $("input[name=otp]").focus()), e.preventDefault()) : ($("input").css("border", "none"), e.preventDefault(), $.ajax({
            type: "POST",
            url: "https://goyral.com/jd/index.php",
            data: {
                mobile: t,
                type: "login",
                otp: s
            },
            dataType: "json",
            success: function (e) {
                "success" == e.type && (chrome.storage.sync.set({
                    userType: e.userType
                }), chrome.storage.sync.set({
                    uuid: e.data
                })), create_notifications("logincomplete", {
                    type: "basic",
                    iconUrl: "../images/icon_16.png",
                    title: e.type,
                    message: e.msg
                }), "success" == e.type && jQuery('input[name="mobile"]').val(""), jQuery('input[name="otp"]').val(""), $(".loginSection").append('<div class="alert alert-' + e.type + ' alert-dismissible fade show" role="alert"><strong>' + e.msg + '</strong><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'), "success" == e.type && (location.href = "./index.html")
            }
        }))
    }), $(".otpButton").click(function () {
        let e = jQuery('input[name="mobile"]').val();
        "" == e || 10 != e.length ? ($("input").css("border", "none"), $("input[name=mobile]").css("border", "1.5px solid #c50707"), $("input[name=mobile]").focus()) : ($("input").css("border", "none"), $(this).attr("disabled", "disabled"), $.ajax({
            type: "POST",
            url: "https://goyral.com/jd/index.php",
            data: {
                mobile: e,
                type: "send_otp",
                otp_type: "loginOTP"
            },
            dataType: "json",
            success: function (e) {
                $(".loginSection").append('<div class="alert alert-' + e.type + ' alert-dismissible fade show" role="alert" style="border-radius: 0px;"><strong>' + e.msg + '</strong><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'), "success" == e.type && ($("#otp").removeAttr("disabled"), $("#mobile").attr("disabled", "disabled"), $(".otpButton").parent().remove())
            }
        }))
    })
});