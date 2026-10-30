import { useForm } from "react-hook-form";
import { FiLoader, FiLock, FiSave, FiX } from "react-icons/fi";

export type ChangePasswordForm = {
  password: string;
  newPassword: string;
};

type ChangePasswordModalProps = {
  onSubmit: (data: ChangePasswordForm) => void;
  onClose: () => void;
  isPending?: boolean;
};

const input =
  "peer block w-full rounded-2xl border border-line bg-raised pb-2 pl-11 pr-4 pt-6 text-sm text-ink placeholder-transparent transition focus:border-clay focus:outline-none focus:ring-4 focus:ring-clay/15";
const icon =
  "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mute transition peer-focus:text-clay";
const label =
  "pointer-events-none absolute left-11 top-4 origin-left text-sm text-mute transition-all duration-200 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-clay peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px]";

export default function ChangePasswordModal({
  onSubmit,
  onClose,
  isPending = false,
}: ChangePasswordModalProps) {
  const { register, handleSubmit, getValues, formState } =
    useForm<ChangePasswordForm>({
      defaultValues: { password: "", newPassword: "" },
      mode: "onChange",
    });
  const { errors } = formState;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 grid place-items-center bg-canvas/60 p-4 backdrop-blur-md"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="change-password-title"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-3xl border border-line bg-surface"
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-5">
          <h2
            id="change-password-title"
            className="font-display text-lg font-bold tracking-tight text-ink"
          >
            Change password
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="grid size-9 place-items-center rounded-full text-mute transition hover:bg-raised hover:text-ink focus:outline-none focus:ring-4 focus:ring-clay/30"
          >
            <FiX className="size-5" />
          </button>
        </header>

        {/* The form wraps body + footer so the Save button can submit it */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
            <p className="text-sm text-mute">
              Enter your current password, then choose a new one.
            </p>

            {/* Current password */}
            <div>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  placeholder=" "
                  className={input}
                  {...register("password", {
                    required: "Current password is required",
                  })}
                />
                <FiLock className={icon} />
                <label htmlFor="password" className={label}>
                  Current password
                </label>
              </div>
              {errors.password && (
                <p className="mt-1.5 px-1 text-xs text-clay">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* New password */}
            <div>
              <div className="relative">
                <input
                  id="newPassword"
                  type="password"
                  placeholder=" "
                  className={input}
                  {...register("newPassword", {
                    required: "New password is required",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                      message: `Password does not meet requirements. It must contain:
                  • At least 8 characters
                  • At least one uppercase letter (A-Z)
                  • At least one lowercase letter (a-z)
                  • At least one number (0-9)
                  • At least one special character (e.g., ! @ # $ % ^ & *)).`,
                    },
                    validate: (value) =>
                      value !== getValues("password") ||
                      "New password must be different from the current one",
                  })}
                />
                <FiLock className={icon} />
                <label htmlFor="newPassword" className={label}>
                  New password
                </label>
              </div>
              {errors.newPassword && (
                <p className="mt-1.5 px-1 text-xs text-clay">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <footer className="flex items-center justify-end gap-2 border-t border-line px-4 py-3 sm:px-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-line px-5 py-2 text-sm font-medium text-ink transition hover:bg-raised"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 rounded-2xl bg-clay px-5 py-2 text-sm font-medium text-canvas transition hover:bg-clay-hover focus:outline-none focus:ring-4 focus:ring-clay/30 disabled:cursor-wait disabled:bg-clay/70"
            >
              Save
              {isPending ? (
                <FiLoader className="size-4 animate-spin" />
              ) : (
                <FiSave className="size-4" />
              )}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
