function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}

function getTable() {
    let table = document.querySelectorAll("table.wp-list-table")[0];
    let list = table.querySelectorAll('td.email');

    let arr = Array.from(list).map(row => {
        let text = row.firstChild.textContent.split(' ');
        return text[text.length - 2];
    });
    exportExcel(removeDuplicates(arr));
}

function exportExcel(arr) {
    let url = "data:application/csv," + encodeURIComponent(arr.join('\n'));
    let a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "email-list.csv");
    a.click();
}

function waitForElementToDisplay(selector, callback, checkFrequencyInMs, timeoutInMs) {
    var startTimeInMs = Date.now();

    (function loopSearch() {
        if (document.querySelector(selector) != null) {
            callback();
            return;
        } else {
            setTimeout(function () {
                if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs)
                    return;
                loopSearch();
            }, checkFrequencyInMs);
        }
    })();
}

waitForElementToDisplay("table.wp-list-table", function () {
    const a = document.createElement('a');

    a.addEventListener('click', getTable);
    a.textContent = 'Exportar';
    a.classList = 'button';

    let btn = document.getElementById('post-query-submit');
    btn.parentNode.insertBefore(a, btn.nextSibling);
}, 1000, 9000);