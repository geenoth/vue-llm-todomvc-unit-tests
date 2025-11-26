import { mount } from "@vue/test-utils";
import FilterLink_Active from "./10_FilterLink_Active.vue";

describe("10_FilterLink_Active.vue", () => {
  it("renders correctly with default props", () => {
    const wrapper = mount(FilterLink_Active, {
      props: { active: false },
    });
    const link = wrapper.get('[data-testid="FilterLink_Active"]');
    expect(link.exists()).toBe(true);
    expect(link.text()).toBe("Active");
    expect(link.element.href).toContain("#");
    expect(link.classes()).not.toContain("selected");
  });

  it("applies the `selected` class when `active` prop is true", () => {
    const wrapper = mount(FilterLink_Active, {
      props: { active: true },
    });
    const link = wrapper.get('[data-testid="FilterLink_Active"]');
    expect(link.classes()).toContain("selected");
  });

  it("does not apply the `selected` class when `active` prop is false", () => {
    const wrapper = mount(FilterLink_Active, {
      props: { active: false },
    });
    const link = wrapper.get('[data-testid="FilterLink_Active"]');
    expect(link.classes()).not.toContain("selected");
  });

  it("emits `select` event with 'active' when clicked", async () => {
    const wrapper = mount(FilterLink_Active);
    const link = wrapper.get('[data-testid="FilterLink_Active"]');
    await link.trigger("click");
    expect(wrapper.emitted("select")).toBeTruthy();
    expect(wrapper.emitted("select")[0]).toEqual(["active"]);
  });

  it("prevents default action on click", async () => {
    const wrapper = mount(FilterLink_Active);
    const link = wrapper.get('[data-testid="FilterLink_Active"]');
    const event = await link.trigger("click", {
      preventDefault: jest.fn(),
    });
    expect(event.preventDefault).toHaveBeenCalled();
  });
});