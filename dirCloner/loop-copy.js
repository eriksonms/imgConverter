const fs = require('fs');
const path = require('path');
const imgConv = require('./imgConv')

const dirCloneSync = async (from, to) => {


    if (!fs.existsSync(to)) fs.mkdirSync(to);
    const files = fs.readdirSync(from)
    const re = /(\.jpg|\.jpeg|\.bmp|\.gif|\.png|\.eps|\.tif|\.tiff)$/i;
    const imgGroup = [];
    for (const element of files) {
        if (element.match(re)) {
            imgGroup.push(element)
        }
        if (!fs.lstatSync(path.join(from, element)).isFile()) {
            if (!fs.existsSync(`${to}/${element}`)) fs.mkdirSync(`${to}/${element}`);
            imgConv.imgHarmonizer(`${from}/${element}`, `${to}/${element}`)
        } else {
            imgConv.imgHarmonizer(`${from}/${imgGroup}`, `${to}/${imgGroup}`)
        }

    };
}
module.exports = {
    dirCloneSync,
}