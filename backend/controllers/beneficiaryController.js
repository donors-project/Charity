const Beneficiary = require("../models/beneficiary");

const getAllAds = async (req, res) => {
  try {
    // const ads = await Beneficiary.findByPk(req.params.id);
    const ads = await Beneficiary.findAll({
      where: { user_id: req.params.id }, // استبدل beneficiary_id بالحقل المطلوب
    });
    if (!ads) {
      console.log("there is no ads to show");
    }
    console.log(ads.rows);
    res.status(200).json(ads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving users" });
  }
};

module.exports = { getAllAds };
