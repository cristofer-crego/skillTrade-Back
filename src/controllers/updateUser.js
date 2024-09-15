const { Users, Professions } = require("../db");
const { Sequelize } = require("sequelize");
const { Op } = Sequelize;
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  const {
    id,
    name,
    last_name,
    image,
    birthdate,
    description,
    password,
    email,
    tel,
    Instagram,
    professionId,
    sexo,
  } = req.body;
  try {
    const searchUser = await Users.findOne({
      where: {
        email,
        id: { [Op.not]: id },
      },
    });
    if (searchUser) {
      throw new Error(
        "El email que estas ingresando ya se encuentra en uso por otro usuario"
      );
    }
    let hashedPassword = password;
    if (password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    const updateUser = await Users.update(
      {
        name,
        last_name,
        image,
        birthdate,
        description,
        password: hashedPassword,
        email,
        tel,
        Instagram,
        professionId,
        sexo,
      },
      {
        where: {
          id,
        },
      }
    );
    if (updateUser[0] > 0) {
      const searchUpdateUser = await Users.findOne({
        where: { id },
      });
      return res
        .status(200)
        .json({ message: "Datos actulizados", searchUpdateUser });
    } else {
      throw new Error("Error al modificar los datos");
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};
