import db from "../models/index";

let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                await db.Specialty.create({
                    name: data.name,
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

let getAllSpecialty = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll();
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

let getDetailSpecialtyById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let data = await db.Specialty.findOne({
                    where: { id: inputId },
                    attributes: ['descriptionMarkdown', 'descriptionHTML', 'name', 'image'],
                    include: [
                        {
                            model: db.Doctor_Info,
                            where: {specialtyId: inputId},
                            attributes: ['doctorId'],
                        }
                    ],
                })
                if (!data) {
                        data = await db.Specialty.findOne({
                        where: { id: inputId },
                        attributes: ['descriptionMarkdown', 'descriptionHTML', 'name', 'image'],
                    })
                }
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

let deleteSpecialty = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let specialtyId = await db.Specialty.findOne({
                    where: { id: inputId}
                })
                if(!specialtyId) {
                    resolve({
                        errCode: 2,
                        errMessage: `handbook isn't exist`
                    })
                }
                await db.Specialty.destroy({
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

let editSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.name) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter!'
                })
            }
            let specialty = await db.Specialty.findOne({
                where: { id: data.id },
                raw: false
            })
            if (specialty) {
                specialty.name = data.name;
                specialty.descriptionHTML = data.descriptionHTML;
                specialty.descriptionMarkdown = data.descriptionMarkdown;
                if (data.imageBase64) {
                    specialty.image = data.imageBase64;
                }
                await specialty.save();
                resolve({
                    errCode: 0,
                    errMessage: "Sua thanh cong",
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage:"Khong tim thay chuyen khoa",
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById,
    deleteSpecialty: deleteSpecialty,
    editSpecialty: editSpecialty
}