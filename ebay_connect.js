
const ebay_url = "https://www.ebay.de/sch/i.html?_nkw={query}";
async function get_ebay_item(title) {
    const url = ebay_url.replace("{query}", encodeURIComponent(title));
    const response = await fetch(url);
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    
    const srp_results = doc.querySelector('.srp-results');

    var items = [];

    for (let i = 0; i < srp_results.children.length; i++) {
        const item = srp_results.children[i];
        const title = item.querySelector('.s-item__title')?.textContent.trim();
        const link = item.querySelector('a')?.href;
        var price = item.querySelector('.s-item__price')?.textContent.trim();
        // if 'bis is in the price, take the first part
        if (price && price.includes('bis')) {
            price = price.split('bis')[0].trim();
        }
        // remove the euro sign / EUR and convert to number
        if (price) {
            price = price.replace('EUR', '').replace('€', '').replace('.', "").replace(',', '.').trim();
            price = parseFloat(price);
        } else {
            continue;
        }

        items.push({
            title: title,
            link: link,
            price: price
        });
        break;
    }

    return items[0]
}