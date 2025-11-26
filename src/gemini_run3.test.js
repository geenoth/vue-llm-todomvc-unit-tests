import { mount } from "@vue/test-utils";
import ClearCompletedButton from "./04_ClearCompletedButton.vue";

describe("04_ClearCompletedButton Component", () => {
  it("renders correctly with proper attributes", () => {
    const wrapper = mount(ClearCompletedButton, {
      props: { hasCompleted: false }
    });
    const button = wrapper.find('[data-testid="ClearCompletedButton"]');
    expect(button.exists()).toBe(true);
    expect(button.attributes("type")).toBe("button");
    expect(button.text()).toBe("Clear completed");
    expect(button.attributes("disabled")).toBeDefined();
  });

  it("is enabled when hasCompleted is true", () => {
    const wrapper = mount(ClearCompletedButton, {
      props: { hasCompleted: true }
    });
    const button = wrapper.find('[data-testid="ClearCompletedButton"]');
    expect(button.attributes("disabled")).toBeUndefined();
  });

  it("is disabled when hasCompleted is false", () => {
    const wrapper = mount(ClearCompletedButton, {
      props: { hasCompleted: false }
    });
    const button = wrapper.find('[data-testid="ClearCompletedButton"]');
    expect(button.attributes("disabled")).toBeDefined();
  });

  it("emits clear event on click when hasCompleted is true", async () => {
    const wrapper = mount(ClearCompletedButton, {
      props: { hasCompleted: true }
    });
    const button = wrapper.find('[data-testid="ClearCompletedButton"]');
    await button.trigger("click");
    expect(wrapper.emitted().clear).toBeTruthy();
    expect(wrapper.emitted().clear.length).toBe(1);
  });

  it("does not emit clear event on click when hasCompleted is false", async () => {
    const wrapper = mount(ClearCompletedButton, {
      props: { hasCompleted: false }
    });
    const button = wrapper.find('[data-testid="ClearCompletedButton"]');
    await button.trigger("click");
    expect(wrapper.emitted().clear).toBeFalsy();
  });

  it("does not emit clear event when not clicked", () => {
    const wrapper = mount(ClearCompletedButton, {
      props: { hasCompleted: true }
    });
    expect(wrapper.emitted().clear).toBeFalsy();
  });
});