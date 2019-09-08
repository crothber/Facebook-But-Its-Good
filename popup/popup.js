chrome.storage.local.get("blacklist", function(i) {
    document.getElementById("blacklist").value = i.blacklist.join('\n');
});
chrome.storage.local.get("show_me_news", function(i) {
    document.getElementById("news-checkbox").checked = i.show_me_news;
});
chrome.storage.local.get("show_me_duolingo", function(i) {
    document.getElementById("duolingo-checkbox").checked = i.show_me_duolingo;
});
chrome.storage.local.get("duolingo_username", function(i) {
    if (typeof i.duolingo_username != "undefined") {
        document.getElementById("duolingo-username").value = i.duolingo_username;
    }
});
chrome.storage.local.get("duolingo_password", function(i) {
    if (i.duolingo_username != "undefined") {
        document.getElementById("duolingo-password").value = i.duolingo_password;
    }
});

document.getElementById("duolingo-checkbox").onclick = function() {
    if (document.getElementById("duolingo-checkbox").checked) {
        document.getElementById("duolingo-more").style.display="block";
    } else {
        document.getElementById("duolingo-more").style.display="none";
    }
}

// TODO: save changes automatically, without user needing to hit the submit button
document.getElementById('options-submit-button').onclick = function() {
    var blacklist = document.getElementById("blacklist").value.split('\n');
    chrome.storage.local.set({"blacklist": blacklist});
    
    var show_me_news = document.getElementById("news-checkbox").checked;
    chrome.storage.local.set({"show_me_news": show_me_news});

    var show_me_duolingo = document.getElementById("duolingo-checkbox").checked;
    chrome.storage.local.set({"show_me_duolingo": show_me_duolingo});

    var duolingo_username = document.getElementById("duolingo-username").value;
    chrome.storage.local.set({"duolingo_username": duolingo_username});

    var duolingo_password = document.getElementById("duolingo-password").value;
    chrome.storage.local.set({"duolingo_password": duolingo_password});
};