import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async(req, res)=>{
    const user = await Users.findOne({
        where: {
            email: req.body.email
        }
    })

    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    const verifyPassword = await argon2.verify(user.password, req.body.password);// cek password antara form input dengan database
    if(!verifyPassword) return res.status(400).json({msg:"password salah"});
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    res.status(200).json({uuid,name, email,role});
}

export const Logout =  async(req, res) =>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg:"Tidak dapat logout"});
        res.status(200).json({msg:"Anda berhasil logout"});
    })
}

export const LoginKembali = async(req, res)=>{
    if(!req.session.userId) return res.status(401).json({msg:"harap login terlebih dahulu"});
    const user = await Users.findOne({
        attributes: ['uuid','name','email','role'],
        where: {
            uuid: req.session.userId
        }
    })

    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    res.status(200).json(user);
}