import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../models/index.js";
import { showError } from "../../lib/index.js";

class AuthController {
    register = async (req, res, next) => {
        try {
            const { name, email, password, phone, address } = req.body;
            const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(12));
            await User.create({ name, email, password: hash, phone, address });
            res.status(201).json({
                success: 'Thank you for registering with us.'
            });
        } catch (error) {
            showError(error, next);
        }
    };

    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email }).exec();
            if (user!=null) {
                if (bcrypt.compareSync(password, user.password)) {
                    const token = jwt.sign(
                        {
                            userId: user._id,
                            expiresIn: '30d' // Example expiration time
                        },
                        process.env.JWT_SECRET
                    );
                    res.json({ token,user });
                } else {
                    next({
                        message: 'Incorrect password',
                        status: 401 // Unauthorized
                    });
                }
            } else {
                next({
                    message: 'Email not registered',
                    status: 404 // Not Found
                });
            }
        } catch (error) {
            showError(error, next);
        }
    };
}

export default new AuthController();
