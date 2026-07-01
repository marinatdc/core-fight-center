import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      icon: Icon,
      rightElement,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col space-y-2 gap-2">
        {label && (
          <label
            htmlFor={props.id}
            className="uppercase"
            style={{
              fontSize: "var(--text-label-sm-size)",
              fontWeight: "var(--text-label-sm-weight)",
              lineHeight: "var(--text-label-sm-line-height)",
              letterSpacing: "0.15em",
              color: "var(--color-text-secondary)"
            }}
          >
            {label}
          </label>
        )}

        <div className="relative group">
          {Icon && (
            <Icon
              size={18}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                transition-colors
                group-focus-within:text-(--color-primary)
              "
              color="var(--color-text-secondary)"
            />
          )}

          <input
            ref={ref}
            {...props}
            className={`w-full outline-none transition-all ${className}`}
            style={{
              borderRadius: "var(--radius)",
              border: "1px solid var(--color-input-border)",
              background: "var(--color-input-bg)",
              padding: Icon
                ? "14px 44px 14px 42px"
                : "14px 16px",
              color: "var(--color-text-primary)",
            }}
          />

          {rightElement && (
            <div
              className="absolute
              right-3
              top-1/2
              -translate-y-1/2
              flex
              items-center
              justify-center
              cursor-pointer
              "
            >
              {rightElement}
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default Input;