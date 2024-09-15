const { Users, Professions } = require("../db");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  try {
    let {
      name,
      last_name,
      // image,
      birthdate,
      // description,
      password,
      email,
      // tel,
      // Instagram,
      professionId,
      // sexo,
    } = req.body;

    let existingProfession = await Professions.findOne({
      where: { name: professionId },
    });

    if (!existingProfession) {
      existingProfession = await Professions.create({ name: professionId });
    }

    const existingUser = await Users.findOne({
      where: { email, professionId: existingProfession.id },
    });

    if (existingUser) {
      throw new Error("El usuario ya existe.");
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);

      const newUser = await Users.create({
        name,
        last_name,
        // image,
        birthdate,
        password: hashedPassword,
        // description,
        email,
        // tel,
        // Instagram,
        professionId: existingProfession.id,
        // sexo,
      });
      return res
        .status(200)
        .json({ message: "Usuario cargado con exito", newUser });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};
