import db from "../models/index";

let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.address || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                await db.Clinic.create({
                    name: data.name,
                    address: data.address,
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

let getAllClinic = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll({order: [['createdAt', 'DESC']]});
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

let getDetailClinicById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let data = await db.Clinic.findOne({
                    where: { id: inputId },
                    attributes: ['name','descriptionHTML', 'address', 'image'],
                    include: [
                        {
                            model: db.Doctor_Info,
                            where: { clinicId: inputId },
                            attributes: ['doctorId']
                        },
                    ],
                    raw: false,
                    nest: true
                })
                if (data && data.image) {
                    data.image = new Buffer.from(data.image, 'base64').toString('binary');
                }
                if (!data) data = {};
                // let data = await db.Clinic.findOne({
                //     where: { id: inputId },
                //     attributes: ['name', 'descriptionMarkdown', 'descriptionHTML', 'address']
                // })
                // if (data) {
                //     let doctorClinic = [];
                //     doctorClinic = await db.Doctor_Info.findAll({
                //         where: { clinicId: inputId },
                //         attributes: ['doctorId']
                //     })
                //     data.doctorClinic = doctorClinic
                // } else data = {};
                resolve({
                    errCode: 0,
                    errMessage: 'Ok',
                    data
                })
            }
        }
        catch (error) {
            reject(error);
        }
    })
}

let deleteClinic = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let clinicId = await db.Clinic.findOne({
                    where: { id: inputId}
                })
                if(!clinicId) {
                    resolve({
                        errCode: 2,
                        errMessage: `clinic isn't exist`
                    })
                }
                await db.Clinic.destroy({
                    where: { id: inputId}
                })
                resolve({
                    errCode: 0,
                    errMessage: `clinic is delete`,
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let editClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.name || !data.address) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter!'
                })
            }
            let clinic = await db.Clinic.findOne({
                where: { id: data.id },
                raw: false
            })
            if (clinic) {
                clinic.name = data.name;
                clinic.address = data.address;
                clinic.descriptionHTML = data.descriptionHTML;
                clinic.descriptionMarkdown = data.descriptionMarkdown;
                if (data.imageBase64) {
                    clinic.image = data.imageBase64;
                }
                await clinic.save();
                resolve({
                    errCode: 0,
                    errMessage: "Sua thanh cong",
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage:"Khong tim thay phong khám",
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let countClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let count = await db.Clinic.count()
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
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById,
    deleteClinic: deleteClinic,
    editClinic: editClinic,
    countClinic: countClinic
}