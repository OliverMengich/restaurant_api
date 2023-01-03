import { loginCustomer } from "../services/auth.services.js";
export const login = async (req, res) => {
    try {
        const encrypted = await loginCustomer(req.body.email, req.body.password);
        if (encrypted) {
            return res.json({
                encrypted,
                status: 'success'
            })
        }
        return res.json({error:'error encountered'})
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};