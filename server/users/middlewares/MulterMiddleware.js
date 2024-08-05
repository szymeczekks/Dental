const multer = require('multer');


const storage = multer.diskStorage({

    // my destination here
    destination: function(req, file, cb) {

        cb(null, `${__dirname}/images/`)
    },
    // my custom filename here
    filename: function(req, file, cb) {

        //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        //cb(null, file.fieldname + '-' + uniqueSuffix)
        const id = req.query.id;

        console.log(id);

        cb(null, `employee_${id}.png`);
    }
});

// my mimetype check here
const fileFilter = (req, file, cb) => {

    if (!file.mimetype.includes('image')) {
        return cb(new Error('not an image'));
    }
    cb(null, true);
};


// also field name here image has to correspond to image on the frontend
// formData.append("image", image);

const upload = multer({
    storage: storage,
    fileFilter
}).single('file');


module.exports = upload;