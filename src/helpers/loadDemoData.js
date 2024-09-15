const { Users, Reviews } = require("../db");
const bcrypt = require("bcrypt");
const usersDemo = require("./usersDemo");
const reviewsDemo = require("./reviewsDemo");
const loadDemoData = async () => {
  try {
    // Mapea sobre los usuarios para hashear las contraseñas antes de insertarlos
    const usersWithHashedPasswords = await Promise.all(
      usersDemo.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return {
          ...user,
          password: hashedPassword,
        };
      })
    );

    // Inserta los usuarios en la base de datos
    await Users.bulkCreate(usersWithHashedPasswords);

    await Reviews.bulkCreate(reviewsDemo);
    console.log("Usuarios creados con éxito");
  } catch (error) {
    console.error("Error al crear usuarios: ", error);
  }
};

module.exports = loadDemoData;
