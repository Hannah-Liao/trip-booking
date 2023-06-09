import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ success: false, message: "You are not authorised" })
    }

    //token exist ,verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ success: false, message: "token is invalid" })
        }
        req.user = user
    })

    next()
}

export const verifyAdmin = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ success: false, message: "You are not authorised" })
    }

    //token exist ,verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ success: false, message: "token is invalid" })
        }
        req.user = user
    })

    if (req.user.role === "admin") {
        next()
    } else {
        return res.status(401).json({ success: false, message: "You are not authorised" })
    }

}
