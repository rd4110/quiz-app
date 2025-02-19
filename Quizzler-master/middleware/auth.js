const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
	try {
		const token = req.header('x-auth-token');
		if (!token)
			return res
				.status(401)
				.json({ msg: 'authentication token required. Auth denied' });
		const verified = jwt.verify(token, process.env.JWT_SECRET);
		if (!verified)
			return res
				.status(401)
				.json({ msg: 'token verification failed. Auth denied' });
		// req.user = verified;
		console.log('user id:', verified.id);
		req.user = verified.id;
		next();
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
module.exports = auth;
