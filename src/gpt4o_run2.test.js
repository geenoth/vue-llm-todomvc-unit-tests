import { mount } from "@vue/test-utils";
import FilterLink_Active from "./10_FilterLink_Active.vue";

describe("10_FilterLink_Active Component", () => {
  it("renders correctly with default props", () => {
    const wrapper = mount(FilterLink_Active, {
      props: { active: false }
    });
    const link = wrapper.find('[data-testid="FilterLink_Active"]');
    expect(link.exists()).toBe(true);
    expect(link.text()).toBe("Active");
    expect(link.classes()).not.toContain("selected");
  });

  it("renders as active when active prop is true", () => {
    const wrapper = mount(FilterLink_Active, {
      props: { active: true }
    });
    const link = wrapper.find('[data-testid="FilterLink_Active"]');
    expect(link.classes()).toContain("selected");
  });

  it("renders as inactive when active prop is false", () => {
    const wrapper = mount(FilterLink_Active, {
      props: { active: false }
    });
    const link = wrapper.find('[data-testid="FilterLink_Active"]');
    expect(link.classes()).not.toContain("selected");
  });

  it("emits select event with 'active' payload on click", async () => {
    const wrapper = mount(FilterLink_Active);
    const link = wrapper.find('[data-testid="FilterLink_Active"]');
    await link.trigger("click");
    expect(wrapper.emitted().select).toBeTruthy();
    expect(wrapper.emitted().select[0]).toEqual(["active"]);
  });

  it("prevents default behavior on click", async () => {
    const wrapper = mount(FilterLink_Active);
    const link = wrapper.find('[data-testid="FilterLink_Active"]');
    const preventDefault = jest.fn();
    await link.trigger("click", { preventDefault });
    expect(preventDefault).toHaveBeenCalled();
  });

  it("does not emit select event when not clicked", () => {
    const wrapper = mount(FilterLink_Active);
    expect(wrapper.emitted().select).toBeFalsy();
  });
});