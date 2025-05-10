// const EXPRESS = require('express');
// const ROUTER = EXPRESS.Router();
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const dbModule = require('../server'); 
// const { ObjectId } = require('mongodb');

// ROUTER.use(async (req, res, next) => {
//     try {
//         if (req.method !== 'GET') {
//             const jwtToken = req.query.jwtToken || req.body.jwtToken;
//             const userId = await checkUserAccess(jwtToken);
//             if (!userId) return res.status(404).json({ message: 'User not found' });
//             req.query.userId = userId;
//             const db = await dbModule.getDb();
//             const furnitureCard = await db.collection('furniturecards').findOne({ _id: new ObjectId(req.query.furnitureCardId) });
//             if (!furnitureCard) return res.status(404).json({ message: 'Furniture card not found' });
//         }
//         next();
//     } catch (error) {
//         res.status(500).json({ message: 'Error validating user access: ' + error.message });
//     }
// });


// function ensureProjectAndColorDirectories(furnitureCardId, color) {
//     if (!furnitureCardId || !color) {
//         throw new Error('furnitureCardId or color is missing');
//     }

//     const projectDir = path.join(__dirname, '..', 'uploads', 'cards', furnitureCardId);
//     const colorDir = path.join(projectDir, color);

//     if (!fs.existsSync(projectDir)) {
//         fs.mkdirSync(projectDir, { recursive: true });
//     }

//     if (!fs.existsSync(colorDir)) {
//         fs.mkdirSync(colorDir);
//     }

//     return colorDir;
// }


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const { furnitureCardId, color } = req.query;

//         if (!furnitureCardId || !color) {
//             return cb(new Error('furnitureCardId or color is missing'));
//         }

//         const colorDir = ensureProjectAndColorDirectories(furnitureCardId, color);
//         cb(null, colorDir);
//     },
//     filename: (req, file, cb) => {
//         const extension = path.extname(file.originalname).toLowerCase() || '.jpg';
//         const fileName = Date.now() + extension;
//         cb(null, fileName);
//     }
// });


// const upload = multer({ storage: storage }).array('images', 10);

// ROUTER.get('/', async (req, res) => {
//     try {
//         const { furnitureCardId, color } = req.query;
        
//         const MAIN_IMAGE_NAME = IMAGES_FURNITURE_ITEM.images[IMAGES_FURNITURE_ITEM.idMainImage].filename;
//         const directory = path.join(__dirname, '..', 'uploads', 'cards', furnitureCardId, color);
//         const filePath = path.join(directory, MAIN_IMAGE_NAME);

//         if (!fs.existsSync(filePath)) {
//             return res.status(404).json({ message: 'File not found' });
//         }
//         res.sendFile(filePath);
//     } catch (err) {
        
//         res.status(500).json({ message: 'Error fetching images: ' + err.message });
//     }
// });


// ROUTER.post('/', (req, res) => {
//     upload(req, res, async (err) => {
//         if (err) {
//             return res.status(500).json({ message: 'Error uploading images: ' + err.message });
//         }

//         try {
//             if (!req.files || req.files.length === 0) {
//                 return res.status(400).json({ message: 'No images uploaded' });
//             }

//             const { furnitureCardId, color, idMainImage } = req.query;



//             let FURNITURE_CARD_ITEM = await db.collection('furniturecards').findOne({ _id: new ObjectId(furnitureCardId) });
//             const INDEX_COLOR = FURNITURE_CARD_ITEM.colors.findIndex(colorData => colorData.color === color);
//             const idFurnitureImages = INSERT_RESULT.insertedId;
//             FURNITURE_CARD_ITEM.colors[INDEX_COLOR].idImages = idFurnitureImages;

//             await db.collection('furniturecards').updateOne({ _id: new ObjectId(furnitureCardId) }, { $set: { colors: FURNITURE_CARD_ITEM.colors } });
//             res.status(200).json({ message: 'Images uploaded successfully!' });
//         } catch (err) {
//             res.status(500).json({ message: 'Error processing request: ' + err.message });
//         }
//     });
// });

// module.exports = ROUTER;
