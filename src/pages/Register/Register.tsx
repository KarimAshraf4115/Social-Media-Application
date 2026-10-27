import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import {
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiFeather,
  FiLoader,
  FiLock,
  FiMail,
  FiUser,
} from "react-icons/fi";
import {
  RegisterSchema,
  type RegisterSchemaType,
} from "../../schemas/Auth.schema";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet";

export default function Register() {
  const form = useForm<RegisterSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      dateOfBirth: "",
      gender: "male",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(RegisterSchema),

    mode: "onChange",
  });
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  function handleRegister(obj: RegisterSchemaType) {
    // console.log(obj);
    setisLoading(true);
    axios
      .post(`https://route-posts.routemisr.com/users/signup`, obj)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/login"); // programatic navigate
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setisLoading(false);
      });
  }
  const { register, handleSubmit, formState } = form; // watch , setError , getValues
  // register => name , ref (unconrolled) , onBlur , onChange
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <Helmet>
        <title>register</title>
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
            Where your
            <br />
            people <span className="text-clay">gather.</span>
          </h2>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-mute">
            Share a thought, start a conversation, and watch it grow into
            something bigger than a post.
          </p>
        </div>

        {/* decorative stacked post cards */}
        <div className="relative h-44">
          <div className="absolute left-0 top-4 w-72 -rotate-3 rounded-3xl border border-line bg-raised p-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-sage" />
              <div className="h-2 w-24 rounded-full bg-ink/80" />
            </div>
            <div className="mt-4 h-2 w-full rounded-full bg-mute/50" />
            <div className="mt-2 h-2 w-2/3 rounded-full bg-mute/50" />
          </div>
          <div className="absolute left-24 top-12 w-72 rotate-2 rounded-3xl border border-line bg-canvas p-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-clay" />
              <div className="h-2 w-20 rounded-full bg-ink/80" />
            </div>
            <div className="mt-4 h-2 w-full rounded-full bg-mute/50" />
            <div className="mt-2 h-2 w-1/2 rounded-full bg-mute/50" />
          </div>
        </div>
      </aside>

      <main className="flex items-center justify-center bg-canvas px-6 py-12">
        <div className="w-full max-w-md">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-sage">
            Create account
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">
            Join the Social App
          </h1>
          <p className="mt-2 mb-10 text-sm text-mute">
            It takes less than a minute. Tell us a little about yourself.
          </p>

          <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
            {/* Name */}
            <div className="relative">
              <input
                {...register("name")}
                type="text"
                id="name"
                className="peer block w-full rounded-2xl border border-line bg-raised pb-2 pl-11 pr-4 pt-6 text-sm text-ink placeholder-transparent transition focus:border-clay focus:outline-none focus:ring-4 focus:ring-clay/15"
                placeholder=" "
              />
              <FiUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mute transition peer-focus:text-clay" />
              <label
                htmlFor="name"
                className="pointer-events-none absolute left-11 top-4 origin-left text-sm text-mute transition-all duration-200 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-clay peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px]"
              >
                Name
              </label>
            </div>
            {formState.errors.name?.message && formState.touchedFields.name && (
              <p className="mt-1.5 px-1 text-xs text-clay">
                {formState.errors.name?.message}
              </p>
            )}

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
            {formState.errors.email?.message &&
              formState.touchedFields.email && (
                <p className=" px-1 text-xs text-clay">
                  {formState.errors.email?.message}
                </p>
              )}

            {/* Date of birth (label stays floated: date inputs always show a value mask) */}
            <div className="relative">
              <input
                type="date"
                {...register("dateOfBirth")}
                id="dateOfBirth"
                className="peer block w-full rounded-2xl border border-line bg-raised pb-2 pl-11 pr-4 pt-6 text-sm text-ink transition [color-scheme:dark] focus:border-clay focus:outline-none focus:ring-4 focus:ring-clay/15"
                placeholder=" "
              />
              <FiCalendar className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mute transition peer-focus:text-clay" />
              <label
                htmlFor="dateOfBirth"
                className="pointer-events-none absolute left-11 top-2 text-[11px] text-mute transition peer-focus:text-clay"
              >
                Date of Birth
              </label>
            </div>
            {formState.errors.dateOfBirth?.message &&
              formState.touchedFields.dateOfBirth && (
                <p className="mt-1.5 px-1 text-xs text-clay">
                  {formState.errors.dateOfBirth?.message}
                </p>
              )}

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

            {formState.errors.password?.message &&
              formState.touchedFields.password && (
                <p
                  className="mt-1.5 px-1 text-xs text-clay"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {formState.errors.password?.message}
                </p>
              )}

            {/* Confirm password */}
            <div className="relative">
              <input
                type="password"
                {...register("rePassword")}
                id="rePassword"
                className="peer block w-full rounded-2xl border border-line bg-raised pb-2 pl-11 pr-4 pt-6 text-sm text-ink placeholder-transparent transition focus:border-clay focus:outline-none focus:ring-4 focus:ring-clay/15"
                placeholder=" "
              />
              <FiCheckCircle className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mute transition peer-focus:text-clay" />
              <label
                htmlFor="rePassword"
                className="pointer-events-none absolute left-11 top-4 origin-left text-sm text-mute transition-all duration-200 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-clay peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px]"
              >
                Confirm password
              </label>
            </div>

            {formState.errors.rePassword?.message &&
              formState.touchedFields.rePassword && (
                <p className="mt-1.5 px-1 text-xs text-clay">
                  {formState.errors.rePassword?.message}
                </p>
              )}

            {/* Gender — segmented pills */}
            <fieldset>
              <legend className="mb-2 px-1 text-xs text-mute">Gender</legend>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    id="male"
                    type="radio"
                    {...register("gender")}
                    defaultValue="male"
                    className="peer sr-only"
                    defaultChecked
                  />
                  <label
                    htmlFor="male"
                    className="flex cursor-pointer select-none items-center justify-center gap-2 rounded-2xl border border-line bg-raised py-3 text-sm font-medium text-mute transition hover:border-mute peer-checked:border-clay peer-checked:bg-clay/10 peer-checked:text-clay peer-focus-visible:ring-4 peer-focus-visible:ring-clay/15"
                  >
                    <BsGenderMale />
                    Male
                  </label>
                </div>
                <div>
                  <input
                    id="female"
                    type="radio"
                    {...register("gender")}
                    defaultValue="female"
                    className="peer sr-only"
                  />
                  <label
                    htmlFor="female"
                    className="flex cursor-pointer select-none items-center justify-center gap-2 rounded-2xl border border-line bg-raised py-3 text-sm font-medium text-mute transition hover:border-mute peer-checked:border-clay peer-checked:bg-clay/10 peer-checked:text-clay peer-focus-visible:ring-4 peer-focus-visible:ring-clay/15"
                  >
                    <BsGenderFemale />
                    Female
                  </label>
                </div>
              </div>
            </fieldset>

            <button
              disabled={isLoading}
              type="submit"
              className="group mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-clay px-4 py-3.5 text-sm font-bold text-canvas transition hover:bg-clay-hover focus:outline-none focus:ring-4 focus:ring-clay/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-clay disabled:active:scale-100"
            >
              {isLoading ? (
                <>
                  <FiLoader className="animate-spin" /> Creating account...
                </>
              ) : (
                <>
                  Create account{" "}
                  <FiArrowRight className="transition group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-mute">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-sage hover:text-clay">
              Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
