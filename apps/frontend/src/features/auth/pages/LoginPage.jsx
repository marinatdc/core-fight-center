import { useState } from "react";
import { Eye, EyeOff, Zap, Mail, Lock } from "lucide-react";
import Input from "../../../components/Input/Input.jsx";
import bg from "../../../assets/bg.png";


export function LoginPage() {
  const [showPassword, setShowPassword] =
    useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      console.log("LOGIN OK:", data);

      alert("Login realizado!");

    } catch (error) {
      alert(error.message);

    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        relative
        flex
        min-h-screen
        overflow-hidden
        text-(--color-text-primary)
        bg-cover
        bg-center
        bg-no-repeat
      "

      style={{
        backgroundImage: `url(${bg})`,
      }}
    >

      {/*CONTENT*/}
      <div
        className="
          relative
          z-10
          flex
          w-full
          items-center
          justify-center
          padding
          px-(--spacing-container)
        "
      >
        <main className="flex flex-col w-full max-w-105 gap-10">

          <div className="flex flex-col gap-4 mb-(--spacing-stack-lg) text-center">

            <h1
              className="
                  relative
                  uppercase
                  tracking-tight
                "
              style={{
                fontFamily:
                  "var(--font-heading)",
                fontSize:
                  "50px",
                fontWeight:
                  "var(--text-headline-lg-weight)",
                lineHeight:
                  "var(--text-headline-lg-line-height)",
                color:
                  "var(--color-primary)",
                textShadow: `
                    0 0 60px rgba(242, 202, 80, 0.5),
                    0 0 100px rgba(242, 202, 80, 0.3),
                    0 0 160px rgba(242, 202, 80, 0.15)
                `,
              }}
            >
              Core{" "}
              <span
                style={{
                  color:
                    "var(--color-primary-fixed)",
                  textShadow: `
                        0 0 40px rgba(255, 224, 136, 0.5),
                        0 0 90px rgba(255, 224, 136, 0.3),
                        0 0 160px rgba(255, 224, 136, 0.15)
                    `,
                }}
              >
                Fight
              </span>{" "}
              Center
            </h1>

            <p
              className="
                mt-3
                uppercase
              "
              style={{
                fontSize:
                  "var(--text-label-sm-size)",
                fontWeight:
                  "var(--text-label-sm-weight)",
                lineHeight:
                  "var(--text-label-sm-line-height)",
                letterSpacing: "0.2em",
                color:
                  "var(--color-text-secondary)",
              }}
            >
              Portal de acesso da equipe
            </p>
          </div>

          <div
            className="
            flex
            flex-col
            items-center
            relative
            overflow-hidden
            backdrop-blur-xl
            "
            style={{
              borderRadius:
                "var(--radius-lg)",

              border: `1px solid var(--color-border)`,

              padding: "40px 0px",

              background:
                "var(--color-surface-dim)",

              boxShadow:
                "var(--shadow-lg)",
            }}
          >

            <div className="flex flex-col gap-8 w-full max-w-90">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-8 w-auto"
              >
                {/*EMAIL*/}
                <Input
                  id="email"
                  label="E-mail"
                  type="email"
                  placeholder="nome@corefightcenter.com"
                  icon={Mail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {/*SENHA*/}
                <Input
                  id="password"
                  label="Senha"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  icon={Lock}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff
                          size={18}
                          color="var(--color-text-secondary)"
                        />
                      ) : (
                        <Eye
                          size={18}
                          color="var(--color-text-secondary)"
                        />
                      )}
                    </button>
                  }
                />

                {/*BOTÃO*/}
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    mt-2
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    uppercase
                    transition-all
                    hover:brightness-110
                    active:scale-[0.98]
                    disabled:opacity-70
                    cursor-pointer
                  "
                  style={{
                    borderRadius:
                      "var(--radius)",

                    background:
                      "var(--color-primary-active)",

                    padding:
                      "10px 20px",

                    fontFamily:
                      "var(--font-heading)",

                    fontSize:
                      "20px",

                    fontWeight: 600,

                    letterSpacing:
                      "-0.02em",

                    color:
                      "var(--color-on-primary)",

                    boxShadow:
                      "0 0 24px rgba(242,202,80,0.18)",
                  }}
                >
                  {loading ? (
                    <>
                      <div
                        className="
                          h-5
                          w-5
                          animate-spin
                          rounded-full
                          border-2
                          border-black
                          border-t-transparent
                        "
                      />
                      autenticando...
                    </>
                  ) : (
                    <>
                      Entrar

                      <Zap size={18} />
                    </>
                  )}
                </button>
              </form>

              {/*STATUS*/}
              <div
                className="
                  flex
                  flex-row
                  mt-5
                  items-center
                  justify-center
                  gap-6
                "
                style={{
                  borderTop: `1px solid var(--color-border)`,
                  paddingTop: "15px",
                }}
              >
                <StatusItem label="Acesso Admin" />

                <StatusItem label="Acesso Instrutor" />
              </div>
            </div>
          </div>

          {/*FOOTER*/}
          <footer className="mt-(--spacing-stack-lg) text-center">
            <p
              className="uppercase"
              style={{
                fontSize:
                  "var(--text-label-sm-size)",

                color:
                  "var(--color-text-muted)",

                letterSpacing:
                  "-0.01em",
              }}
            >
              © 2026 Core Fight Center.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}

/* =========================================================
 * STATUS ITEM
 * Isso futuramente vai para:
 * components/AuthStatusItem.jsx
 * ========================================================= */
function StatusItem({ label }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="
          h-2
          w-2
          animate-pulse
          rounded-full
        "
        style={{
          background:
            "var(--color-primary)",
        }}
      />

      <span
        style={{
          fontSize:
            "var(--text-label-sm-size)",

          color:
            "var(--color-text-secondary)",
        }}
      >
        {label}
      </span>
    </div>
  );
}