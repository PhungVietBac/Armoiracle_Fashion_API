const clothesService = require('../services/clothes_service');
const styleService = require('../services/style_service');
async function getAllClothes(req, res) {
    try {
        const clothes = await clothesService.getAllClothes();
        res.json(clothes);

    }
    catch (e) {
        res.status(500).json({error: e.message});
    }
}
async function getClothesbyID(req, res) {
    try {
        const {id} = req.params;
        const clothes = await clothesService.getClothesbyID(id);
        if (!clothes) {
            return res.status(404).json({error: "Clothes not found"});
        }
        res.json(clothes);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
}

async function getClothesBy(req, res) {
    try {
        const {field} = req.params;
        const {value} = req.query;
        if (!["name", "size", "color", "material", "brand", "weather", "type"].includes(field)){
            return res.status(400).json({error: "Invalid field"});
        }
        
        const clothes = await clothesService.getClothesBy(field, value);
        if (clothes.length === 0) {
            return res.status(404).json({error: "No clothes found"});
        } 
        res.json(clothes);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
    
    
}
async function createClothes(req, res) {
        try {
            const clothes = req.body;
            const newClothes = await clothesService.createClothes(clothes);
            res.status(201).json(newClothes);
        } catch (e){
            res.status(500).json({error: e.message});
        }
}

async function getStylesByClothes(req, res) {
    try {
        const {id} = req.params;

        const clothes = await clothesService.getClothesbyID(id);
        if (!clothes) {
            return res.status(404).json({error: "Clothes not found"});
        }

        const styleIds = await clothesService.getStyleIdsByClothes(id);
        if (styleIds.length === 0) {
            return res.status(404).json({error: "No styles found for this clothes"});
        }

        const styles = await Promise.all(
            styleIds.map(async (styleId) => {
                const style = await styleService.getStyleById(styleId);
                return style;
            })
        );
        
        res.json(styles);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
}
module.exports = {
        getAllClothes,
        getClothesBy,
        getClothesbyID,
        createClothes,
        getStylesByClothes
    }