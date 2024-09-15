const { Reviews } = require ('../db');

module.exports = async (req, res) =>{
    try {
        let {
            review,
            id_user
        } = req.body

        if (!id_user){
            return res.status(400).json({error: 'Id de usuario no proporcionado.'})
        }

    const newReview = await Reviews.create ({
        review,
        id_user
    });

    return res.status(200).json(newReview)
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: error.message})
    }
}