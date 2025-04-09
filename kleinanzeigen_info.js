// find all items in the list if they exist 

const items = document.querySelectorAll('.ad-listitem');

console.log("LEN: " + items.length)


async function processItem(item) {
    var title = "";
    var link = "";
    var shipping_container;
    try {
        title = item.querySelector('.ellipsis').textContent.trim();
        link = item.querySelector('.ellipsis').href;
        shipping_container = item.querySelector('.aditem-main--middle--price-shipping');
    } catch (e) {
        return;
    }
    fill_in(title, shipping_container);
}   


async function fill_in(title, shipping_container) {
    const it = await get_ebay_item(title);
    if (it) {
        const sanitizedPrice = DOMPurify.sanitize(it.price);
        const sanitizedLink = DOMPurify.sanitize(it.link);
        const ebayLink = document.createElement('a');
        ebayLink.className = "aditem-main--middle--price-shipping--price";
        ebayLink.href = sanitizedLink;
        ebayLink.target = "_blank";
        ebayLink.style.marginLeft = "10px";
        ebayLink.textContent = `EBAY: ${sanitizedPrice} €`;
        shipping_container.appendChild(ebayLink);
    }

    const ide = await get_idealo_item(title);
    if (ide) {
        const sanitizedIdePrice = DOMPurify.sanitize(ide.price);
        const sanitizedIdeLink = DOMPurify.sanitize(ide.link);
        const idealoLink = document.createElement('a');
        idealoLink.className = "aditem-main--middle--price-shipping--price";
        idealoLink.href = sanitizedIdeLink;
        idealoLink.target = "_blank";
        idealoLink.style.marginLeft = "10px";
        idealoLink.textContent = `IDEALO: ${sanitizedIdePrice} €`;
        shipping_container.appendChild(idealoLink);
    }
}


for (let i = 0; i < items.length; i++) {
    processItem(items[i]);
}



try {
// main Title
var title = document.querySelector('.boxedarticle--title');
var shipping_container = document.querySelector('.boxedarticle--flex--container');
fill_in(title, shipping_container);

} catch {

}


