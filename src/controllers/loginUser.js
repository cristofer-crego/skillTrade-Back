const { Users } = require('../db')
const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken')
const SECRET_KEY = process.env.JWT_SECRET_KEY

const loginUser = async (req, res) =>{
    try{
        let { email, password} = req.body

        const existingUser = await Users.findOne({ where: { email } });

        if (!existingUser) {
            return res.status(404).json({ error: "Email no encontrado" });
        }

        const isValid = bcrypt.compareSync(password, existingUser.password);

        if (isValid){
            const token = jwt.sign({ id: existingUser.id, email: existingUser.email}, SECRET_KEY, {expiresIn: '1h'})

            res.cookie('token', token, {
                httpOnly: false,  //solo accesible a través de HTTP
                secure: process.env.NODE_ENV === 'production', // solo se envía a través de HTTPS en producción
                sameSite: 'Strict',  //protección contra CSRF
                maxAge: 3600000,
              });
              const { password, ...userWithoutPassword } = existingUser.dataValues;
              return res.status(200).json({ message: 'login realizado', user: userWithoutPassword });
        }
        else{
            return res.status(401).json({error: 'Contraseña incorrecta'});
        }
    } catch (error){
        console.error(error);
        return res.status(500).json({error: 'Error de servidor'})
    }
}

module.exports = loginUser;

// *******************CODIGO CRISTOFER*******************
// const { Users, Reviews, Professions } = require("../db");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const SECRET_KEY = process.env.JWT_SECRET_KEY;

// const loginUser = async (req, res) => {
//   try {
//     let { email, password } = req.body;
//     console.log(email, password);

//     const existingUser = await Users.findOne({ where: { email } });

//     if (!existingUser) {
//       return res.status(404).json({ error: "Email no encontrado" });
//     }

//     const isValid = bcrypt.compareSync(password, existingUser.password);

//     if (isValid) {
//       const token = jwt.sign(
//         { id: existingUser.id, email: existingUser.email },
//         SECRET_KEY,
//         { expiresIn: "1h" }
//       );
//       const user = await Users.findAll({
//         where: {
//           email: email,
//         },
//         attributes: { exclude: ["professionId", "createdAt", "updatedAt"] },
//         include: [
//           {
//             model: Reviews,
//             attributes: { exclude: ["id", "createdAt", "updatedAt"] },
//           },
//           {
//             model: Professions,
//             attributes: { exclude: ["id", "createdAt", "updatedAt"] },
//           },
//         ],
//       });
//       res.cookie("token", token, {
//         httpOnly: true, //solo accesible a través de HTTP
//         secure: process.env.NODE_ENV === "production", // solo se envía a través de HTTPS en producción
//         sameSite: "Strict", //protección contra CSRF
//         maxAge: 3600000,
//       });
//       return res.status(200).json({ message: "login realizado", user });
//     } else {
//       return res.status(401).json({ error: "Contraseña incorrecta" });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Error de servidor" });
//   }
// };

// module.exports = loginUser;