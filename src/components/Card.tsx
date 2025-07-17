import type { ReactNode } from "react";

interface CardProp {
  children: ReactNode;
  title?: string;
  subTitle?: string;
  icon?: ReactNode;
  hover?: boolean;
  glowEffect?: boolean;
  className?: string;
}
const Card = ({
  children,
  className = "",
  glowEffect = false,
  hover = false,
  icon,
  subTitle,
  title,
}: CardProp) => {
  return (
    <div
      className={`bg-blue-950 rounded-xl border border-blue-900 shadow-md p-6 transition-all cursor-pointer
        ${hover ? "hover:border-green-500 hover: shadow-lg hover:-translate-y-0.5" : ""}
        ${glowEffect ? "glow" : ""}
        ${className}


    `}
    >
      {(title || icon) && (
        <div className="flex items-center space-x-3 mb-4">
          {icon && (
            <div className="p-2 bg-primary-700/10 rounded-xl flex items-center justify-center">
              {icon}
            </div>
          )}
          {(title || subTitle) && (
            <div>
              {title && <h3 className="text-lg font-medium">{title}</h3>}
              {subTitle && <p className="text-sm text-gray-400">{subTitle}</p>}
            </div>
          )}
        </div>
      )}

      {children}
    </div>
  );
};

export default Card;
