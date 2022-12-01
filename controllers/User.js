import Users from "../models/UserModel.js";
import argon2  from "argon2";

export const getUsers = async(req, res) =>{
    try{
        const response = await Users.findAll({
            attributes: ['id','uuid', 'name', 'email', 'role'] // untuk membatasi response yang ditampilkan
        });
        res.status(200).json(response);
    }catch(error){
        res.status(500).json({msg : error.message})
    }
}

export const getUserById = async(req, res) =>{
    try{
        const response = await Users.findOne({
            where: {
                uuid : req.params.id
            }
        });
        res.status(200).json(response);
    }catch(error){
        res.status(500).json({msg : error.message})
    }
    
}

export const createUser = async(req, res) =>{
    const {name, email, password, confPassword, role} = req.body;
    if(password !== confPassword ) return req.status(400).json({msg: "password tidak sama"});
    const hashPassword = await argon2.hash(password);
    try{
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        });
        res.status(201).json({msg:"berhasil registrasi"});
    }catch(error){
        res.status(400).json({msg : error.message})
    }

}

export const updateUser = async(req, res) =>{
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });

    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});

    const {name, email, password, confPassword, role} = req.body;
    let hashPassword;
    if(password === "" || password === null){
        hashPassword = user.password
    }else{
        hashPassword = await argon2.hash(password);
    }

    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});

    try {
        await Users.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        },{
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        res.status(400).json({msg: "gagal update"});
    }
}

export const deleteUser = async(req, res) =>{
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    try {
        await Users.destroy({
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "delete user berhasil"});
    } catch (error) {
        res.status(400).json({msg: "gagal delete user"});
    }
    
}