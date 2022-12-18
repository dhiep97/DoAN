import db from "../models/index";

let createHandbook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.title || !data.author || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                await db.Handbook.create({
                    title: data.title,
                    author: data.author,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })
                
                resolve({
                    errCode: 0,
                    errMessage: 'Ok'
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getAllHandbook = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Handbook.findAll({order: [['createdAt', 'DESC']]});
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer.from(item.image, 'base64').toString('binary');
                })
            }
            resolve({
                errCode: 0,
                errMessage: 'Ok',
                data
            })
        } catch (error) {
            reject(error);
        }
    })
}

let getDetailHandbookById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let data = await db.Handbook.findOne({
                    where: { id: inputId },
                })
                if (!data) {}
                resolve({
                    errCode: 0,
                    errMessage: 'Ok',
                    data,
                })
                
            }
        } catch (error) {
            reject(error);
        }
    })
}

let deleteHandbook = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let handBookId = await db.Handbook.findOne({
                    where: { id: inputId}
                })
                if(!handBookId) {
                    resolve({
                        errCode: 2,
                        errMessage: `handbook isn't exist`
                    })
                }
                await db.Handbook.destroy({
                    where: { id: inputId}
                })
                resolve({
                    errCode: 0,
                    errMessage: `handbook is delete`,
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let editHandbook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.author || !data.title) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter!'
                })
            }
            let handbook = await db.Handbook.findOne({
                where: { id: data.id },
                raw: false
            })
            if (handbook) {
                handbook.title = data.title;
                handbook.author = data.author;
                handbook.descriptionHTML = data.descriptionHTML;
                handbook.descriptionMarkdown = data.descriptionMarkdown;
                if (data.imageBase64) {
                    handbook.image = data.imageBase64;
                }
                await handbook.save();
                resolve({
                    errCode: 0,
                    errMessage: "Sua thanh cong",
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage:"Khong tim thay bai viet",
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let countHandbook = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let count = await db.Handbook.count()
            resolve({
                errCode: 0,
                count: count,
            });
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createHandbook: createHandbook,
    getAllHandbook: getAllHandbook,
    getDetailHandbookById: getDetailHandbookById,
    deleteHandbook: deleteHandbook,
    editHandbook: editHandbook,
    countHandbook: countHandbook
}