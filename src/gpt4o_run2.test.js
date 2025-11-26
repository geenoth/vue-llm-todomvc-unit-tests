import { mount } from "@vue/test-utils";
import FilterLink_All from "./09_FilterLink_All.vue";

describe("09_FilterLink_All Component", () => {
  it("renders correctly with default props", () => {
    const wrapper = mount(FilterLink_All, {
      props: { active: false }
    });
    const link = wrapper.find('[data-testid="FilterLink_All"]');
    expect(link.exists()).toBe(true);
    expect(link.text()).toBe("All");
    expect(link.classes()).not.toContain("selected");
  });

  it("renders as active when active prop is true", () => {
    const wrapper = mount(FilterLink_All, {
      props: { active: true }
    });
    const link = wrapper.find('[data-testid="FilterLink_All"]');
    expect(link.classes()).toContain("selected");
  });

  it("renders as inactive when active prop is false", () => {
    const wrapper = mount(FilterLink_All, {
      props: { active: false }
    });
    const link = wrapper.find('[data-testid="FilterLink_All"]');
    expect(link.classes()).not.toContain("selected");
  });

  it("emits select event with 'all' payload on click", async () => {
    const wrapper = mount(FilterLink_All);
    const link = wrapper.find('[data-testid="FilterLink_All"]');
    await link.trigger("click");
    expect(wrapper.emitted().select).toBeTruthy();
    expect(wrapper.emitted().select[0]).toEqual(["all"]);
  });

  it("prevents default behavior on click", async () => {
    const wrapper = mount(FilterLink_All);
    const link = wrapper.find('[data-testid="FilterLink_All"]');
    const preventDefault = jest.fn();
    await link.trigger("click", { preventDefault });
    expect(preventDefault).toHaveBeenCalled();
  });

  it("does not emit select event when not clicked", () => {
    const wrapper = mount(FilterLink_All);
    expect(wrapper.emitted().select).toBeFalsy();
  });
});