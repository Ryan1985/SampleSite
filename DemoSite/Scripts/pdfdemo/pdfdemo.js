// If absolute URL from the remote server is provided, configure the CORS
// header on that server.
var url = '../Files/demoFile.pdf';

// Loaded via <script> tag, create shortcut to access PDF.js exports.
//var pdfjs = window['pdfjs-dist/build/pdf'];

// The workerSrc property shall be specified.
PDFJS.workerSrc = '../Scripts/pdfjs/pdf.worker.js';
PDFJS.cMapUrl = '../Scripts/pdfjs/cmaps/';
PDFJS.cMapPacked = 1;




// Asynchronous download of PDF
var loadingTask = PDFJS.getDocument(url);
var pdfObject = null;
var currentPageNumber = 1;


function renderPage(direction) {
    if (direction < 0) {
        currentPageNumber = currentPageNumber - 1;
    }
    else if (direction > 0) {
        currentPageNumber = currentPageNumber + 1;
    }
    else {
        currentPageNumber = 1;
    }
    
    pdfObject.getPage(currentPageNumber).then(function (page) {
        console.log('Page loaded');
        document.getElementById('page_num').textContent = currentPageNumber;
        var scale = 1;
        var viewport = page.getViewport(scale);

        // Prepare canvas using PDF page dimensions
        var canvas = document.getElementById('the-canvas');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        var renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        var renderTask = page.render(renderContext);
        renderTask.then(function () {
            console.log('Page rendered');
        });
    });
}


loadingTask.promise.then(function (pdf) {
    console.log('PDF loaded');
    document.getElementById('page_count').textContent = pdf.numPages;
    pdfObject = pdf;
    // Fetch the first page
    renderPage();
}, function (reason) {
    // PDF loading error
    console.error(reason);
});