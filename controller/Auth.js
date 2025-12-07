const { User } = require("../model/User");


exports.createUser = async (req, res) => {
  const user = new User(req.body)
  try {
   const doc = await user.save()
   res.status(201).json(doc)
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.loginUser = async (req, res) => {
  try {
    console.log('LOGIN REQUEST BODY:', req.body);

    const { email, password } = req.body;

    // 1) Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    // 2) Find user
    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res.status(401).json({ message: 'no such user' });
    }

    // 3) Check password (plain text for now)
    if (user.password !== password) {
      return res.status(401).json({ message: 'invalid credentials' });
    }

    // 4) Success
    return res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name,
      addresses: user.addresses,
    });
  } catch (err) {
    console.error('LOGIN ERROR:', err);
    return res.status(500).json({ message: 'server error', error: err.message });
  }
};


