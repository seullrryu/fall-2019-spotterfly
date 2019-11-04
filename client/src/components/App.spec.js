import React from "react";
import App from "./App";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("App component", () => {
  it("it should render without fail", () => {
    const component = shallow(<App />);
    const wrapper = component.find(".App");
    expect(wrapper.length).toBe(1);
  });
});

describe("App component", () => {
  it("Name of project should read yada yada", () => {
    const component = shallow(<App />);
    expect(component.find("h1").text()).toBe("SPOTTERFLY");
  });
});

describe("App component", () => {
  it("Description of project should read yada yada", () => {
    const component = shallow(<App />);
    expect(component.find("p1").text()).toBe(
      "Share your playlists with people near you with similar tastes."
    );
  });
});

describe("App component", () => {
  it("footer should read yada yada", () => {
    const component = shallow(<App />);
    expect(component.find("footer").text()).toBe(
      "Copyright © Seulmin Ryu, Yena Park, Alexander Goldman, Zhongheng Sun 2019"
    );
  });
});

describe("App component", () => {
  it("button should exist", () => {
    const component = shallow(<App />);
    expect(component.find("button")).toBeTruthy();
  });
});
