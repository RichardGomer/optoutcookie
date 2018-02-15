// Give page a chance to get ready
window.setTimeout(function(){

    document.querySelector('button.main-view__option-button').click();

    // Wait for opt-out to become available
    var waitOO = window.setInterval(function()
    {
        var sa = document.querySelector('.select-all a');

        if(!sa)
            return;

        window.clearInterval(waitOO);
        sa.click(); // Select all
        window.setTimeout(function(){ document.querySelector('.submit-choices-btn').click(); }, 1500); // Submit

    }, 1000); // Wait 1s then click apply

    // Wait for opt-outs to complete, can take a while
    var waitDone = window.setInterval(function(){

        // Opt-outs are complete when the viewResults element appears
        var viewResults = document.querySelector('.viewResults');
        if(viewResults != null)
        {
            window.clearInterval(waitDone);

            // Send the done message
            chrome.runtime.sendMessage({naiDone: true});
        }
    }, 2000);

}, 3000);
