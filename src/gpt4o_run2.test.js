import { mount } from "@vue/test-utils";
import FilterLink_Completed from "./11_FilterLink_Completed.vue";

describe("11_FilterLink_Completed Component", () => {
  it("renders correctly with default props", () => {
    const wrapper = mount(FilterLink_Completed, {
      props: { active: false }
    });
    const link = wrapper.find('[data-testid="FilterLink_Completed"]');
    expect(link.exists()).toBe(true);
    expect(link.text()).toBe("Completed");
    expect(link.classes()).not.toContain("selected");
  });

  it("renders as active when active prop is true", () => {
    const wrapper = mount(FilterLink_Completed, {
      props: { active: true }
    });
    const link = wrapper.find('[data-testid="FilterLink_Completed"]');
    expect(link.classes()).toContain("selected");
  });

  it("renders as inactive when active prop is false", () => {
    const wrapper = mount(FilterLink_Completed, {
      props: { active: false }
    });
    const link = wrapper.find('[data-testid="FilterLink_Completed"]');
    expect(link.classes()).not.toContain("selected");
  });

  it("emits select event with 'completed' payload on click", async () => {
    const wrapper = mount(FilterLink_Completed);
    const link = wrapper.find('[data-testid="FilterLink_Completed"]');
    await link.trigger("click");
    expect(wrapper.emitted().select).toBeTruthy();
    expect(wrapper.emitted().select[0]).toEqual(["completed"]);
  });

  it("prevents default behavior on click", async () => {
    const wrapper = mount(FilterLink_Completed);
    const link = wrapper.find('[data-testid="FilterLink_Completed"]');
    const preventDefault = jest.fn();
    await link.trigger("click", { preventDefault });
    expect(preventDefault).toHaveBeenCalled();
  });

  it("does not emit select event when not clicked", () => {
    const wrapper = mount(FilterLink_Completed);
    expect(wrapper.emitted().select).toBeFalsy();
  });
});