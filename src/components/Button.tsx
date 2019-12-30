import React from "react";

type ButtonProps = {
  label: string;
  action: () => void;
};

export class Button extends React.Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return <button onClick={this.props.action}>{this.props.label}</button>;
  }
}
