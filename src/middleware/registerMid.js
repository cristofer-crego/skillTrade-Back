function registerMid(req, res, next) {
  let {
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
    //TODO  validaciones Mail
    // Validar longitud del email
    email = email.trim();
    if (email.length < 8 || email.length > 25) {
      throw new Error("El email debe tener entre 8 y 25 caracteres.");
    }

    // Validar formato del email (dominio y estructura básica)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      throw new Error("El email debe tener un dominio válido.");
    }

    //TODO validaciones Password

    password = password.trim();

    // Validar longitud de la contraseña
    if (password.length < 8 || password.length > 15) {
      throw new Error("La contraseña debe tener entre 8 y 15 caracteres.");
    }

    // Validar que contenga al menos una letra mayúscula, un número y un carácter especial
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

    if (!passwordRegex.test(password)) {
      throw new Error(
        "La contraseña debe contener al menos una letra mayúscula, un número y un carácter especial."
      );
    }

    //todo  validaciones de todos los campos
    function isEmpty(field, fieldName) {
      if (!field || field.trim().length === 0) {
        throw new Error(`El campo '${fieldName}' no puede estar vacío.`);
      }
    }

    // Validar cada campo
    isEmpty(name, "name");
    isEmpty(last_name, "last_name");
    // isEmpty(image, "image");
    // isEmpty(birthdate, "birthdate");
    // isEmpty(description, "description");
    isEmpty(password, "password");
    isEmpty(email, "email");
    // isEmpty(tel, "tel");
    // isEmpty(Instagram, "Instagram");
    isEmpty(professionId, "professionId");
    isEmpty(sexo, "sexo");

    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

module.exports = registerMid;
