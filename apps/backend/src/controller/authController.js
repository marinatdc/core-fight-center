import { login } from "../service/authService.js";

export async function loginController(req, res) {
  try {
    const result = await login(req.body);

    return res.json(result);
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
}