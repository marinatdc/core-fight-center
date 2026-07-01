export async function login(data) {
  const { email, password } = data;

  if (
    email === "admin@corefightcenter.com" &&
    password === "123456"
  ) {
    return {
      token: "fake-jwt",
      user: {
        name: "Admin",
        email,
      },
    };
  }

  throw new Error("Credenciais inválidas");
}