const router = require('express').Router();
const userModel = require('../models/user');

//validation
const Joi = require('@hapi/joi');

//create schema for validation
const schema = {
	name: Joi.string()
		.min(6)
		.required(),
	email: Joi.string()
		.min(6)
		.required()
		.email(),
	password: Joi.string()
		.min(6)
		.required()
};

router.post('/register', async (req, res) => {
	//validate data before making a user

	const { error } = Joi.validate(req.body, schema);
	//extracting the error message from Joi
	if (error) return res.status(400).send(error.details[0].message);

	const user = new userModel({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	});

	try {
		const savedUser = await user.save();
		res.send(savedUser);
	} catch (err) {
		res.status(400).send(err);
	}
});

module.exports = router;
