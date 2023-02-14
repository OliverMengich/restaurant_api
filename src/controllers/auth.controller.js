import { loginCustomer } from "../services/auth.services.js";
export const login = async (req, res) => {
    try {
        const token = await loginCustomer(req.body.email, req.body.password);
        if (token) {
            return res.json({
                token,
                // status: 'success'
            })
        }
        return res.status(401).json({error:'error encountered'})
    } catch (err) {
        console.log(err);
        return res.status(401).json({ error: err });
    }
};