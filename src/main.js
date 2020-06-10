const $siteList = $(".siteList");
const $lastLi = $("li.last");
const x = localStorage.getItem('x');
const xObject = JSON.parse(x);
const hashMap = xObject || [
    { logo: 'A', url: "https://www.acfun.cn" },
    { logo: 'B', url: "https://www.bilibili.com" },
    { logo: 'C', url: "https://www.cnblogs.com" },
    { logo: 'D', url: "https://www.douban.com" }

];
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')    //删除 / 开头的内容
}
const render = () => {
    $siteList.find("li:not(.last)").remove();
    hashMap.forEach((node, index) => {
        const $li = $(`
        <li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
        </li>
        `).insertBefore($lastLi);

        $li.on('click', () => {
            window.open(node.url, "_self");
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation();
            hashMap.splice(index, 1);
            render();
        })

    });
    // for (let i = 0; i < hashMap.length; i++) {
    //     hue = i * 30;
    //     $("div.site").css('background-color', `hsl(${hue},65%,75%)`);  //hsl颜色变化
    // }

    $("div.site").each((index, element) => {
        $(element).css('background-color', `hsl(${index * 30},65%,75%)`)
    })


}
render();

$('.addButton').on('click', () => {
    let url = window.prompt("添加网址：");
    if (url.indexOf("http") !== 0) {
        if (url.indexOf("www.") === -1) {
            url = 'https://www.' + url;
        } else {
            url = 'https://' + url;
        }
    }

    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        url: url,
    });
    render();
});

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap);
    localStorage.setItem('x', string);
}
// input框获取焦点
let focusStatus = false;
$('input').focus(() => {
    focusStatus = true;
});
// input框失去焦点
$('input').blur(() => {
    focusStatus = false;
});
$(document).on('keypress', (e) => {
    //input框获取焦点关闭键盘功能
    if (!focusStatus) {
        const key = e.key;
        for (let i = 0; i < hashMap.length; i++) {
            if (hashMap[i].logo.toLowerCase() === key) {
                window.open(hashMap[i].url, "_blank")
            }
        }
    }

})