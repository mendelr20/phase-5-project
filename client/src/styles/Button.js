import styled from "styled-components";

const COLORS = {
  primary: {
    "--main": "tan",
    "--accent": "white",
  },
  secondary: {
    "--main": "lavenderblush",
    "--accent": "indigo",
  },
};

function Button({ variant = "fill", color = "primary", ...props }) {
  let Component;
  if (variant === "fill") {
    Component = FillButton;
  } else if (variant === "outline") {
    Component = OutlineButton;
  }

  return <Component style={COLORS[color]} {...props} />;
}

const ButtonBase = styled.button`
  cursor: pointer;
  font-size: 1rem;
  border: 1px solid transparent;
  border-radius: 6px;
  padding: 12px 24px;
  text-decoration: none;
`;

const FillButton = styled(ButtonBase)`
  background-color: var(--main);
  text-align: center;
  color: var(--accent);

  &:hover {
    opacity: 0.9;
  }
`;

const OutlineButton = styled(ButtonBase)`
  background-color: white;
  color: var(--main);
  border: 2px solid var(--main);
  padding: 12px 24px; /* Match padding of ButtonBase */
  &:hover {
    background: hsl(235deg 85% 97%);
  }
`;

export default Button;
