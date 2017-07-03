(function ($) {
    $.fn.printHtml = function () {
        var printHtml = $(this).html();
        var head = '';
        $('style, link').each(function () {
            head += styleToAbs(this);
        });
        var printWindow = window.open();
        $(printWindow.document.head).html(head);
        $(printWindow.document.body).html(printHtml);
        setTimeout(function () {
            printWindow.print();
            printWindow.close();
        }, 250);
    };

    function styleToAbs(el) {
        var url;
        var clone = $(el).clone()[0];
        var linkHost;

        if (clone.nodeName.toLowerCase() === 'link') {
            clone.href = relToAbs(clone.href);
        }

        return clone.outerHTML;
    }

    var _link = document.createElement('a');

    function relToAbs(href) {        
        _link.href = href;
        var linkHost = _link.host;

        if (linkHost.indexOf('/') === -1 && _link.pathname.indexOf('/') !== 0) {
            linkHost += '/';
        }

        return _link.protocol + "//" + linkHost + _link.pathname + _link.search;
    }
}(jQuery));
