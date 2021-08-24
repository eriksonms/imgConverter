const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const sizeOf = require('image-size');

const imgHarmonizer = async (moveFrom, moveTo) => {
    try {
        const re = /(\.jpg|\.jpeg|\.bmp|\.gif|\.png|\.eps|\.tif|\.tiff)$/i;
        const files = await fs.promises.readdir(moveFrom);
        for (const file of files) { 
            if (file.match(re)) {
                // console.log('FILES:', files)
                const filename = file.split('.').slice(0, -1).join('.');
                const dimensions = await sizeOf(`${moveFrom}/${file}`);
                console.log(dimensions.width, dimensions.height);
                if (dimensions.width > 1024 || dimensions.height > 1024) {
                    await sharp(`${moveFrom}/${file}`)
                        .resize({
                            width: 1024,
                            height: 1024,
                            fit: 'inside',
                            position: sharp.strategy.entropy,
                        })
                        .png()
                        .toFile(`${moveTo}/${filename}.png`)
                        .then(function (_info) {
                            console.log(_info);
                        })
                        .catch(function (err) {
                            console.log(`${err} while resizing, please check file ${file} `);
                        });
                } else {
                    await sharp(`${moveFrom}/${file}`)
                        .png()
                        .toFile(`${moveTo}/${filename}.png`)
                        .then(function (_info) {
                            console.log(_info);
                        })
                        .catch(function (err) {
                            console.log(`${err} while converting, please check file ${file} `);
                        });
                }
            }else{
                console.log(`${file} is NOT a supported file!`)
            }

        }
    } catch (e) {
        console.error('ERROR:', e);
    }
}

module.exports = {
    imgHarmonizer,
}