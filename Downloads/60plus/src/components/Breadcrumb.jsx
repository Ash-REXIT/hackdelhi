import { Link } from "react-router-dom";

/**
 * Reusable Breadcrumb component
 *
 * Usage:
 *   <Breadcrumb items={[{ label: "About Us" }]} />
 *   <Breadcrumb items={[{ label: "Subscription" }]} />
 *   <Breadcrumb items={[{ label: "Services", href: "/subscription" }, { label: "Monthly Doctor Visit" }]} />
 *
 * Props:
 *   items: Array of { label: string, href?: string }
 *          - Last item is always plain text (current page), no href needed
 *          - Middle items can have href for clickable links
 */
export default function Breadcrumb({ items = [] }) {
  return (
    <>
      <style>{`
        .bc-wrapper {
          max-width: 1000px;
          width: 100%;
          margin: 20px 0 10px;
          padding: 0 24px;
          font-family: 'Nunito Sans', sans-serif;
          font-size: 14px;
          color: rgba(26, 10, 46, 0.65);
          box-sizing: border-box;
          text-align: left;
        }
        .bc-wrapper a {
          color: #8235d0;
          text-decoration: none;
          font-weight: 700;
        }
        .bc-wrapper a:hover {
          text-decoration: underline;
        }
        .bc-sep {
          margin: 0 8px;
          color: rgba(26, 10, 46, 0.4);
        }
        .bc-current {
          color: rgba(26, 10, 46, 0.65);
        }
      `}</style>

      <div className="bc-wrapper">
        {/* Home is always first */}
        <Link to="/">Home</Link>

        {items.map((item, index) => (
          <span key={index}>
            <span className="bc-sep">&gt;</span>
            {item.href ? (
              <Link to={item.href}>{item.label}</Link>
            ) : (
              <span className="bc-current">{item.label}</span>
            )}
          </span>
        ))}
      </div>
    </>
  );
}