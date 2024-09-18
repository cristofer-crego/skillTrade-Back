const { Users, Professions, Reviews } = require("../db");
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  const { profession } = req.params;
  console.log("soy la profesion", profession);

  try {
    if (!profession) {
      return res.status(400).json({
        error: "Ingrese una profesion",
      });
    }

    const professionMatches = await Professions.findAll({
      where: {
        name: { [Op.iLike]: `%${profession}%` }, // Búsqueda insensible a mayúsculas/minúsculas
      },
    });

    // Obtener todos los `professionId` coincidentes
    const professionIds = professionMatches.map((profession) => profession.id);

    const usuarios = await Users.findAll({
      where: {
        [Op.or]: [
          { professionId: { [Op.in]: professionIds } },
          { name: { [Op.iLike]: `%${profession}%` } }, // Búsqueda parcial en el nombre
          { description: { [Op.iLike]: `%${profession}%` } }, // Búsqueda parcial en la descripción
        ],
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
        message: "No se encontraron usuarios con esos datos",
      });
    }

    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
