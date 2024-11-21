const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/artistas/');  // Pasta onde as fotos serão armazenadas
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);  // Extrai a extensão da imagem
    const filename = Date.now() + ext;  // Gera um nome único para a imagem
    cb(null, filename);
  }
});

// Função de upload
const upload = multer({ 
  storage: storage, 
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de tamanho da imagem (5MB)
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/; // Tipos de arquivos permitidos
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);  // Arquivo permitido
    } else {
      cb(new Error('Formato de arquivo inválido. Apenas imagens são permitidas.'));
    }
  }
});

module.exports = upload;
