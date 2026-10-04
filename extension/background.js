// PDFTara Chrome Extension - Background Service Worker

const PDFTara_URL = 'https://PDFTara.devtoolcafe.com/en';

// Create context menu when extension is installed
chrome.runtime.onInstalled.addListener(() => {
    // Create main context menu item
    chrome.contextMenus.create({
        id: 'PDFTara-open',
        title: 'Open with PDFTara',
        contexts: ['link', 'page']
    });

    // Create submenu for specific tools
    chrome.contextMenus.create({
        id: 'PDFTara-merge',
        parentId: 'PDFTara-open',
        title: 'Merge PDFs',
        contexts: ['link', 'page']
    });

    chrome.contextMenus.create({
        id: 'PDFTara-compress',
        parentId: 'PDFTara-open',
        title: 'Compress PDF',
        contexts: ['link', 'page']
    });

    chrome.contextMenus.create({
        id: 'PDFTara-convert',
        parentId: 'PDFTara-open',
        title: 'Convert to PDF',
        contexts: ['link', 'page']
    });

    chrome.contextMenus.create({
        id: 'PDFTara-all-tools',
        parentId: 'PDFTara-open',
        title: 'All Tools →',
        contexts: ['link', 'page']
    });

    console.log('PDFTara context menus created');
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    let url = PDFTara_URL;

    switch (info.menuItemId) {
        case 'PDFTara-merge':
            url = `${PDFTara_URL}/tools/merge-pdf`;
            break;
        case 'PDFTara-compress':
            url = `${PDFTara_URL}/tools/compress-pdf`;
            break;
        case 'PDFTara-convert':
            url = `${PDFTara_URL}/tools/jpg-to-pdf`;
            break;
        case 'PDFTara-all-tools':
        case 'PDFTara-open':
            url = PDFTara_URL;
            break;
        default:
            url = PDFTara_URL;
    }

    // Open PDFTara in a new tab
    chrome.tabs.create({ url: url });
});

// Log when service worker starts
console.log('PDFTara background service worker started');
