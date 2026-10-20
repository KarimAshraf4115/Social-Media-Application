import { useContext, useState } from "react";
import {
  FiBell,
  FiChevronDown,
  FiFeather,
  FiHome,
  FiKey,
  FiLogOut,
  FiMenu,
  FiSearch,
  FiUser,
  FiX,
} from "react-icons/fi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const linkBase =
  "flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition";
const linkIdle = "text-mute hover:bg-raised hover:text-ink";
const linkActive = "bg-clay/10 text-clay";

const menuItem =
  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink transition hover:bg-raised";

export default function Navbar() {
  const [isMobOn, setisMobOn] = useState(false);
  const { userLoggedIn, setUserLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate()
  function Logout() {
    localStorage.removeItem("userToken")
    setUserLoggedIn(null)
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas">
      <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* mobile menu toggle (CSS only) */}
        <input id="nav-toggle" type="checkbox" className="peer sr-only" />

        {/* Brand */}
        <Link to="/" className="flex shrink-0 items-center gap-3">
          <span className="grid size-10 place-items-center rounded-2xl bg-clay text-canvas">
            <FiFeather className="size-5" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight">
            Social App
          </span>
        </Link>

        {/* Search (desktop) */}
        {userLoggedIn ? (
          <>
            {" "}
            <div className="relative hidden max-w-sm flex-1 lg:block">
              <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mute" />
              <input
                type="search"
                placeholder="Search posts or people"
                className="w-full rounded-2xl border border-line bg-raised py-2.5 pl-11 pr-4 text-sm text-ink placeholder:text-mute transition focus:border-clay focus:outline-none focus:ring-4 focus:ring-clay/15"
              />
            </div>
          </>
        ) : (
          <></>
        )}

        {/* Links (desktop) — swap Link for NavLink to get real active state */}
        <div className="flex items-center">
          <div className="hidden items-center gap-1 lg:flex">
            {userLoggedIn ? (
              <>
                {" "}
                <NavLink to="/" end className="navbar-link flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition text-mute hover:bg-raised hover:text-ink">
                  <FiHome /> Home
                </NavLink>
                <NavLink to="/profile" className="navbar-link flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition text-mute hover:bg-raised hover:text-ink">
                  <FiUser /> Profile
                </NavLink>
                <button onClick={() => Logout()} className={`${linkBase} ${linkIdle}`}>
                  <FiUser /> Logout
                </button>
              </>
            ) : (
              <>
                {" "}
                <NavLink to="/register"  className={`navbar-link ${linkBase} ${linkIdle}`}>
                  <FiUser /> Register
                </NavLink>
                <NavLink to="/login"  className={`navbar-link ${linkBase} ${linkIdle}`}>
                  <FiUser /> Login
                </NavLink>
              </>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center">
            {userLoggedIn ? (
              <>
                {" "}
                <div className="flex items-center gap-2">
                  {/* Notifications */}
                  <button
                    type="button"
                    aria-label="Notifications"
                    className="relative grid size-10 place-items-center rounded-full text-mute transition hover:bg-raised hover:text-ink"
                  >
                    <FiBell className="size-5" />
                    <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-clay ring-2 ring-canvas" />
                  </button>

                  {/* Avatar dropdown (opens on focus, no state) */}
                  <div className="group relative">
                    <button
                      type="button"
                      className="flex items-center gap-2 rounded-full border border-line bg-raised p-1 sm:pr-3 transition hover:border-mute focus:outline-none focus:ring-4 focus:ring-clay/15"
                    >
                      <span className="grid size-8 place-items-center rounded-full bg-clay text-sm font-bold text-canvas">
                        U
                      </span>
                      <FiChevronDown className="hidden text-mute transition group-focus-within:rotate-180 sm:block" />
                    </button>

                    <div className="invisible absolute right-0 top-full mt-2 w-60 translate-y-1 rounded-2xl border border-line bg-surface p-2 opacity-0 transition group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      <div className="px-3 py-2">
                        <p className="text-sm font-medium text-ink">
                          User name
                        </p>
                        <p className="text-xs text-mute">user@email.com</p>
                      </div>
                      <div className="my-2 h-px bg-line" />
                      <Link to="/profile" className={menuItem}>
                        <FiUser className="text-mute" /> Profile
                      </Link>
                      <Link to="/change-password" className={menuItem}>
                        <FiKey className="text-mute" /> Change password
                      </Link>
                      <div className="my-2 h-px bg-line" />
                      <button type="button" className={`${menuItem} text-clay`}>
                        <FiLogOut /> Log out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}

            {/* Hamburger (mobile / tablet) */}
            <label
              htmlFor="nav-toggle"
              aria-label="Toggle menu"
              className="grid size-10 cursor-pointer place-items-center rounded-full text-ink transition hover:bg-raised lg:hidden"
              onClick={() => setisMobOn(!isMobOn)}
            >
              {isMobOn ? (
                <FiX className="i-close size-5" />
              ) : (
                <FiMenu className="i-menu size-5" />
              )}
            </label>
          </div>
        </div>

        {/* Mobile panel */}
        {isMobOn ? (
          <div className="absolute inset-x-0 top-full hidden border-b border-line bg-surface p-4 peer-checked:block lg:hidden">
            {userLoggedIn ? (
              <>
                <div className="relative mb-3">
                  {" "}
                  <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mute" />
                  <input
                    type="search"
                    placeholder="Search posts or people"
                    className="w-full rounded-2xl border border-line bg-raised py-2.5 pl-11 pr-4 text-sm text-ink placeholder:text-mute transition focus:border-clay focus:outline-none focus:ring-4 focus:ring-clay/15"
                  />
                </div>
              </>
            ) : (
              ""
            )}
            <div className="flex flex-col gap-1">
              {userLoggedIn ? (
                <>
                  {" "}
                  <NavLink to="/" end className={`navbar-link ${linkBase} ${linkActive}`}>
                    <FiHome /> Home
                  </NavLink>
                  <NavLink to="/profile" className={`navbar-link ${linkBase} ${linkIdle}`}>
                    <FiUser /> Profile
                  </NavLink>
                  <button onClick={() => Logout()} className={`${linkBase} ${linkIdle}`}>
                    <FiUser /> Logout
                  </button>
                </>
              ) : (
                <>
                  {" "}
                  <Link to="/register" className={`${linkBase} ${linkIdle}`}>
                    <FiUser /> Register
                  </Link>
                  <Link to="/login" className={`${linkBase} ${linkIdle}`}>
                    <FiUser /> Login
                  </Link>
                </>
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </nav>
    </header>
  );
}
