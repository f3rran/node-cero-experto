"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = require("../controllers/usuarioController");
const router = express_1.Router();
router.get('/', usuarioController_1.getUsuarios);
router.get('/:id', usuarioController_1.getUsuario);
router.post('/', usuarioController_1.postUsuario);
router.put('/:id', usuarioController_1.putUsuario);
router.delete('/:id', usuarioController_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuario.js.map