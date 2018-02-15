
var _cookies = {nai: [], adchoices: []};

var run = function(){
    var p = runNAI();

}

var runNAI = function(){

    return new Promise(function(resolve, reject)
    {
        chrome.tabs.create({url: "http://optout.networkadvertising.org/"}, function(tab)
        {
            console.log("Running NAI opt-out script");
            chrome.tabs.executeScript(tab.id, {file: 'content_nai.js'});

            chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse)
            {
                if(!sender.tab)
                    return;

                if(msg.naiDone === true)
                {
                    console.log("NAI opt-out completed");
                    chrome.tabs.remove(tab.id);
                    chrome.cookies.getAll({}, function(cookies){
                        _cookies.nai = cookies;
                        console.log("Logged NAI cookies", _cookies.nai);
                        resolve();
                    });
                }
            });
        });
    });
}

var clearCookies = function(){

    return new Promise(function(resolve, reject)
    {
        chrome.cookies.getAll({}, function(cookies){
            for(var i in cookies)
            {
                var c = cookies[i];
                chrome.cookies.remove(c);
            }
            resolve();
        });
    });
}

// Give the browser time to settle down, before we begin
window.setTimeout(run, 1000);
