const { Users, Professions, Reviews } = require("../db");

module.exports = async (req, res) => {
  const { profession } = req.query;
  console.log(profession);

  try {
    if (!profession) {
      return res.status(400).json({
        error: "Ingrese una profesion",
      });
    }

    const idProfession = await Professions.findOne({
      where: { name: profession },
    });

    if (!idProfession) {
      return res.status(400).json({
        error: "Ingrese una profesion valida",
      });
    }

    const usuarios = await Users.findAll({
      where: {
        professionId: idProfession.dataValues.id,
      },
      attributes: { exclude: ["professionId", "createdAt", "updatedAt"] },
      include: [
        {
          model: Reviews,
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        },
        {
          model: Professions,
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        },
      ],
    });

    if (usuarios.length === 0) {
      return res.status(404).json({
        message: "No se encontraron usuarios con esa profesión",
      });
    }

    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
