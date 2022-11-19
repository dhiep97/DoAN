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

let getDetailSpecialtyById = (inputId, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId || !location) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let data = {};
                if (location === 'ALL') {
                    data = await db.Specialty.findOne({
                        where: { id: inputId },
                        attributes: ['descriptionMarkdown', 'descriptionHTML', 'name'],
                        include: [
                            {
                                model: db.Doctor_Info,
                                where: { specialtyId: inputId },
                                attributes: ['doctorId', 'provinceId']
                            },
                        ],
                        raw: false,
                        nest: true
                    })
                } else {
                    data = await db.Specialty.findOne({
                        where: { id: inputId },
                        attributes: ['descriptionMarkdown', 'descriptionHTML', 'name'],
                        include: [
                            {
                                model: db.Doctor_Info,
                                where: { specialtyId: inputId, provinceId: location },
                                attributes: ['doctorId', 'provinceId']
                            },
                        ],
                        raw: false,
                        nest: true
                    })
                }
                // data = await db.Specialty.findOne({
                //     where: { id: inputId },
                //     attributes: ['descriptionMarkdown', 'descriptionHTML', 'name'],
                // })
                // if (data) {
                //     let doctorSpecialty = [];
                //     if (location === 'ALL') {
                //         doctorSpecialty = await db.Doctor_Info.findAll({
                //             where: { specialtyId: inputId },
                //             attributes: ['doctorId', 'provinceId']
                //         })
                //     } else {
                //         doctorSpecialty = await db.Doctor_Info.findAll({
                //             where: {
                //                 specialtyId: inputId,
                //                 provinceId: location
                //             },
                //             attributes: ['doctorId', 'provinceId']
                //         })
                //     }
                //     data.doctorSpecialty = doctorSpecialty;
                // } else data = {};
                resolve({
                    errCode: 0,
                    errMessage: 'Ok',
                    data
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById
}