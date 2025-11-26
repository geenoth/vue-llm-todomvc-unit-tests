import { mount } from "@vue/test-utils";
import FilterLink_All from "./09_FilterLink_All.vue";

describe("09_FilterLink_All.vue", () => {
  it("renders correctly with default props", () => {
    const wrapper = mount(FilterLink_All, {
      props: { active: false },
    });
    const link = wrapper.get('[data-testid="FilterLink_All"]');
    expect(link.exists()).toBe(true);
    expect(link.text()).toBe("All");
    expect(link.element.href).toContain("#");
    expect(link.classes()).not.toContain("selected");
  });

  it("applies the `selected` class when `active` prop is true", () => {
    const wrapper = mount(FilterLink_All, {
      props: { active: true },
    });
    const link = wrapper.get('[data-testid="FilterLink_All"]');
    expect(link.classes()).toContain("selected");
  });

  it("does not apply the `selected` class when `active` prop is false", () => {
    const wrapper = mount(FilterLink_All, {
      props: { active: false },
    });
    const link = wrapper.get('[data-testid="FilterLink_All"]');
    expect(link.classes()).not.toContain("selected");
  });

  it("emits `select` event with 'all' when clicked", async () => {
    const wrapper = mount(FilterLink_All);
    const link = wrapper.get('[data-testid="FilterLink_All"]');
    await link.trigger("click");
    expect(wrapper.emitted("select")).toBeTruthy();
    expect(wrapper.emitted("select")[0]).toEqual(["all"]);
  });

  it("prevents default action on click", async () => {
    const wrapper = mount(FilterLink_All);
    const link = wrapper.get('[data-testid="FilterLink_All"]');
    const event = await link.trigger("click", {
      preventDefault: jest.fn(),
    });
    expect(event.preventDefault).toHaveBeenCalled();
  });
});