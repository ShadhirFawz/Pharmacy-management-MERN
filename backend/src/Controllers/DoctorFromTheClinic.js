const Medicine = require("../Models/medicine");



// Search for medicine by name
// Temporarily allow unauthenticated access (for testing purposes)
const GetMedicineByDoctor = async (req, res) => {
  const { username, Name } = req.params;
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', true);

  try {
    const info = await Medicine.findOne({ Name: Name }, { _id: 0, ActiveIngredients: 0, Picture: 0, MedicalUse: 0 });
    if (!info) {
      return res.status(400).json({ error: "This medicine does not exist!" })
    }
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


const GetAllMedicines = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', true);
  const { DoctorUsername } = req.params;

  try {
    const allMedicines = await Medicine.find({}, { _id: 0, ActiveIngredients: 0, Price: 0, Picture: 0, MedicalUse: 0 });
    
    if (allMedicines.length === 0) {
      return res.status(404).json({ error: "No medicines found!" });
    }
    
    res.status(200).json(allMedicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { GetMedicineByDoctor, GetAllMedicines };