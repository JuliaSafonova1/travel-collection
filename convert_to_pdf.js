const puppeteer = require('puppeteer');
const path = require('path');

async function convertHTMLToPDF() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Загружаем HTML файл
    const htmlPath = path.join(__dirname, 'travel_collection.html');
    await page.goto(`file://${htmlPath}`, {
        waitUntil: 'networkidle0'
    });
    
    // Ждем загрузки всех изображений
    await page.waitForTimeout(2000);
    
    // Генерируем PDF с сохранением ссылок
    await page.pdf({
        path: path.join(__dirname, 'travel_collection.pdf'),
        format: 'A4',
        printBackground: true,
        margin: {
            top: '20mm',
            right: '20mm',
            bottom: '20mm',
            left: '20mm'
        },
        displayHeaderFooter: false,
        preferCSSPageSize: true
    });
    
    console.log('PDF успешно создан: travel_collection.pdf');
    await browser.close();
}

convertHTMLToPDF().catch(console.error); 