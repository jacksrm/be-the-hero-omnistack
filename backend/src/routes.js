const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const OngsController = require('./controllers/OngsController');
const IncidentsController = require('./controllers/IncidentsController');
const ProfileController = require('./controllers/ProfileController');
const SessionsController = require('./controllers/SessionsController');

const routes = express.Router();

/**
 * rota LIST para listar todos os casos de uma determinada ONG
 */
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().alphanum().required(),
    }).unknown()
}), ProfileController.index);

/**
 * rota LIST para listar todos os casos cadastrados
 */
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), IncidentsController.index);

/**
 * rota CREATE para adicionar casos das ONGs
 */
routes.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required().min(5),
        description: Joi.string().required().min(5),
        value: Joi.number().required()
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), IncidentsController.create);

/**
 * rota DELETE para deletar os casos das ONGs
 */
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentsController.delete);

/**
 * rota LIST para listar as ONGs cadastradas
 */
routes.get('/ongs', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), OngsController.index);

/** 
 * rota CREATE para criação e cadastro da ONG
 */
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngsController.create);

/**
 * rota DELETE para testes no servidor
 */ 
routes.delete('/ongs/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().alphanum().required()
    })
}), OngsController.delete);

/**
 * rota LOGIN para login da ONG 
 */
routes.post('/sessions' , celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().alphanum().required()
    })
}), SessionsController.create);

module.exports = routes;