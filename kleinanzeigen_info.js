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
    const it = await get_ebay_item(title);
    const price_prefab = `
        <a class="aditem-main--middle--price-shipping--price" href="{link}" target="_blank" style="margin-left: 10px;">
            EBAY: {price} €             
         </a>
    `
    shipping_container.innerHTML = shipping_container.innerHTML + price_prefab.replace("{price}", it.price).replace("{link}", it.link);

    const ide = await get_idealo_item(title);
    if (ide) {
        const idealo_prefab = `
            <a class="aditem-main--middle--price-shipping--price" href="{link}" target="_blank" style="margin-left: 10px;">
                IDEALO: {price} €             
             </a>
        `
        shipping_container.innerHTML = shipping_container.innerHTML + idealo_prefab.replace("{price}", ide.price).replace("{link}", ide.link);
    }


}

for (let i = 0; i < items.length; i++) {
    processItem(items[i]);
}