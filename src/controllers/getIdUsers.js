const { where } = require("sequelize");
const { Users, Reviews, Professions } = require("../db");

module.exports = async (req, res) => {
  const { id } = req.params;
  try {
    let user;
    if (id) {
      user = await Users.findOne({
        where: {
          id,
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
    }
    if (!user) {
      throw new Error("El usuario no existe.");
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
