import {
  FiArrowRight,
  FiFeather,
  FiLoader,
  FiLock,
  FiMail,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { LoginSchema, type LoginSchemaType } from "../../schemas/Auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
import { Helmet } from "react-helmet";

export default function Login() {
  const form = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },

    resolver: zodResolver(LoginSchema),

    mode: "onChange",
  });

  const [isLoading, setisLoading] = useState(false);
  const { userLoggedIn, setUserLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogin(obj: LoginSchemaType) {
    // console.log(obj);
    setisLoading(true);
    axios
      .post(`https://route-posts.routemisr.com/users/signin`, obj)
      .then((res) => {
        toast.success(res.data.message);
        console.log(res.data.data.token);
        localStorage.setItem("userToken", res.data.data.token);
        setUserLoggedIn(res.data.data.token);
        navigate("/"); // programatic navigate
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setisLoading(false);
      });
  }

  const { register, handleSubmit, formState } = form; // watch , setError , getValues

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <Helmet>
        <title>login</title>
      </Helmet>
      <aside className="relative hidden overflow-hidden border-r border-line bg-surface lg:flex lg:flex-col lg:justify-between lg:p-14">
        <div className="pointer-events-none absolute -bottom-28 -right-28 size-96 rounded-full bg-clay/15" />
        <div className="pointer-events-none absolute -top-20 -left-20 size-72 rounded-full bg-sage/10" />

        <div className="relative flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-clay text-canvas">
            <FiFeather className="size-5" />
          </span>
          <span className="font-display text-2xl font-bold tracking-tight">
            Social App
          </span>
        </div>

        <div className="relative">
          <h2 className="font-display text-6xl font-bold leading-[1.05] tracking-tight">
            Good to see
            <br />
            you <span className="text-clay">again.</span>
          </h2>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-mute">
            Pick up the conversation right where you left it.
          </p>
        </div>

        {/* decorative thread: a post with two replies */}
        <div className="relative h-60">
          <div className="absolute left-0 top-0 w-80 rounded-3xl border border-line bg-raised p-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-sage" />
              <div className="h-2 w-24 rounded-full bg-ink/80" />
            </div>
            <div className="mt-4 h-2 w-full rounded-full bg-mute/50" />
            <div className="mt-2 h-2 w-3/4 rounded-full bg-mute/50" />
          </div>
          <div className="absolute left-8 top-28 flex w-72 items-center gap-3 rounded-3xl border border-line bg-canvas p-3">
            <div className="size-7 shrink-0 rounded-full bg-clay" />
            <div className="w-full">
              <div className="h-2 w-16 rounded-full bg-ink/80" />
              <div className="mt-2 h-2 w-full rounded-full bg-mute/50" />
            </div>
          </div>
          <div className="absolute left-16 top-44 flex w-72 items-center gap-3 rounded-3xl border border-line bg-canvas p-3">
            <div className="size-7 shrink-0 rounded-full bg-sage" />
            <div className="w-full">
              <div className="h-2 w-20 rounded-full bg-ink/80" />
              <div className="mt-2 h-2 w-2/3 rounded-full bg-mute/50" />
            </div>
          </div>
        </div>
      </aside>

      <main className="flex items-center justify-center bg-canvas px-6 py-12">
        <div className="w-full max-w-md">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-sage">
            Log in
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">
            Welcome back
          </h1>
          <p className="mt-2 mb-10 text-sm text-mute">
            Enter your email and password to continue.
          </p>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                {...register("email")}
                id="email"
                className="peer block w-full rounded-2xl border border-line bg-raised pb-2 pl-11 pr-4 pt-6 text-sm text-ink placeholder-transparent transition focus:border-clay focus:outline-none focus:ring-4 focus:ring-clay/15"
                placeholder=" "
              />
              <FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mute transition peer-focus:text-clay" />
              <label
                htmlFor="email"
                className="pointer-events-none absolute left-11 top-4 origin-left text-sm text-mute transition-all duration-200 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-clay peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px]"
              >
                Email
              </label>
            </div>
            <p className="px-1 text-xs text-clay">
              {formState.errors.email?.message}
            </p>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                {...register("password")}
                id="password"
                className="peer block w-full rounded-2xl border border-line bg-raised pb-2 pl-11 pr-4 pt-6 text-sm text-ink placeholder-transparent transition focus:border-clay focus:outline-none focus:ring-4 focus:ring-clay/15"
                placeholder=" "
              />
              <FiLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mute transition peer-focus:text-clay" />
              <label
                htmlFor="password"
                className="pointer-events-none absolute left-11 top-4 origin-left text-sm text-mute transition-all duration-200 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-clay peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px]"
              >
                Password
              </label>
            </div>
            <p
              className="px-1 text-xs text-clay"
              style={{ whiteSpace: "pre-line" }}
            >
              {formState.errors.password?.message}
            </p>

            <button
              type="submit"
              disabled={isLoading}
              className="group mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-clay px-4 py-3.5 text-sm font-bold text-canvas transition hover:bg-clay-hover focus:outline-none focus:ring-4 focus:ring-clay/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-clay disabled:active:scale-100"
            >
              {isLoading ? (
                <>
                  {" "}
                  <FiLoader className="animate-spin" /> Logging in...{" "}
                </>
              ) : (
                <>
                  {" "}
                  Log in{" "}
                  <FiArrowRight className="transition group-hover:translate-x-1" />{" "}
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-mute">
            New here?{" "}
            <Link
              to="/register"
              className="font-medium text-sage hover:text-clay"
            >
              Create an account
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
