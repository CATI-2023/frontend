import { CSSProperties } from "react";
import "./style.css";
type Props = {
  title: string;
  style?: CSSProperties;
  href?: string;
  download?: boolean;
  target?: "_blank" | "_self" | "_parent" | "_top" | undefined;
}
export function ButtonDefault({title = "", style, href = "", download = false, target}: Props) {
  return (
    <>
        <a href={href} className="button-subscribe-second-section" style={style} download={download} target={target}>
          {title}
        </a>
    </>
  );
}
