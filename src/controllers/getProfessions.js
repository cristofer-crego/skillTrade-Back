const { Professions } = require("../db");

const getProfessions = async (req, res) => {
  try {
    const professions = await Professions.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    return res.status(200).json(professions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al obtener las profesiones" });
  }
};

module.exports = getProfessions;
