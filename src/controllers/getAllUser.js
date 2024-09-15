const { Users, Reviews, Professions } = require("../db");

module.exports = async (req, res) => {
  const { name } = req.query;
  try {
    let user;
    if (!name) {
      user = await Users.findAll({
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
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
