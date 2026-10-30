import { useContext } from "react";
import { FiFeather, FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const colTitle = "text-xs font-medium uppercase tracking-[0.2em] text-sage";
const colLink = "text-sm text-mute transition hover:text-clay";
const socialBtn =
  "grid size-10 place-items-center rounded-full border border-line bg-raised text-mute transition hover:border-clay hover:text-clay";

export default function Footer() {
  const { userLoggedIn } = useContext(AuthContext);
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-8xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-2xl bg-clay text-canvas">
                <FiFeather className="size-5" />
              </span>
              <span className="font-display text-xl font-bold tracking-tight">
                Social App
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mute">
              Share a thought, start a conversation, and watch it grow into
              something bigger than a post.
            </p>
          </div>

          {/* Explore */}
          <div>
            {userLoggedIn ? (
              <>
                <h3 className={colTitle}>Explore</h3>
              </>
            ) : (
              <>
                <h3 className={colTitle}>Join Us</h3>
              </>
            )}

            <ul className="mt-4 space-y-3">
              {userLoggedIn ? (
                <>
                  <li>
                    <Link to="/" className={colLink}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile" className={colLink}>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/change-password" className={colLink}>
                      Change password
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/register" className={colLink}>
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" className={colLink}>
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className={colTitle}>Legal</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#" className={colLink}>
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className={colLink}>
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className={colLink}>
                  Help center
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-line pt-6 sm:flex-row">
          <p className="text-xs text-mute">
            © 2026 Social App. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="GitHub" className={socialBtn}>
              <FiGithub />
            </a>
            <a href="#" aria-label="Twitter" className={socialBtn}>
              <FaXTwitter />
            </a>
            <a href="#" aria-label="LinkedIn" className={socialBtn}>
              <FiLinkedin />
            </a>
            <a href="#" aria-label="Instagram" className={socialBtn}>
              <FiInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
