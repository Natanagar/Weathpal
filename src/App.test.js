import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Enzyme, {shallow, render, mount} from "enzyme";
import App from "./App";

//configuration Enzyme
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({adapter: new Adapter()});

describe("component App", () => {
  it("component was rendered without mistakes", () => {
    const defaultProps = {};
    const component = shallow(<App {...defaultProps}/>);
    expect(component).toMatchSnapshot();
  });
});
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
