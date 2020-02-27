const express = require('express');
let { verificaToken, verificaAdmin_Role } = require('../middlewares/auntenticacion');

let app = express();

let Categoria = require('../models/categoria');

app.get('/categoria', verificaToken, (req, res) => {
    //Mostrar todas las categorias
    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Categoria.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    categorias,
                    cuantos: conteo
                });
            })

        })
});

app.get('/categoria/:id', verificaToken, (req, res) => {
    //Mostrar una categoria por id
    let id = req.params.id;
    Categoria.findById(id, (err, categorias) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categorias) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no es correcto'
                }
            });
        }

        res.json({
            ok: true,
            categoria: categorias
        });
    });
});

//crar un anueva categoria

app.post('/categoria', [verificaToken], (req, res) => {
    let descripcion = req.body.descripcion;
    let usuario = req.usuario._id;
    let categoria = new Categoria({
        descripcion,
        usuario
    });
    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});
//modificar una categoria

app.put('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    };

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    //solo un administrador puede borrar categorias
    let id = req.params.id;
    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Categoria Borrada'
        });
    });
});



module.exports = app;