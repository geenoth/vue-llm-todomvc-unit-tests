import { mount } from "@vue/test-utils";
import ClearCompletedButton from "./04_ClearCompletedButton.vue";

describe("04_ClearCompletedButton.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(ClearCompletedButton, {
      props: { hasCompleted: false },
    });
    const button = wrapper.get('[data-testid="ClearCompletedButton"]');
    expect(button.exists()).toBe(true);
    expect(button.attributes("type")).toBe("button");
    expect(button.text()).toBe("Clear completed");
  });

  it("button is disabled when `hasCompleted` is false", () => {
    const wrapper = mount(ClearCompletedButton, {
      props: { hasCompleted: false },
    });
    const button = wrapper.get('[data-testid="ClearCompletedButton"]');
    expect(button.attributes("disabled")).toBeDefined();
  });

  it("button is enabled when `hasCompleted` is true", () => {
    const wrapper = mount(ClearCompletedButton, {
      props: { hasCompleted: true },
    });
    const button = wrapper.get('[data-testid="ClearCompletedButton"]');
    expect(button.attributes("disabled")).toBeUndefined();
  });

  it("emits `clear` event when clicked and `hasCompleted` is true", async () => {
    const wrapper = mount(ClearCompletedButton, {
      props: { hasCompleted: true },
    });
    const button = wrapper.get('[data-testid="ClearCompletedButton"]');
    await button.trigger("click");
    expect(wrapper.emitted("clear")).toBeTruthy();
    expect(wrapper.emitted("clear").length).toBe(1);
  });

  it("does not emit `clear` event when clicked and `hasCompleted` is false", async () => {
    const wrapper = mount(ClearCompletedButton, {
      props: { hasCompleted: false },
    });
    const button = wrapper.get('[data-testid="ClearCompletedButton"]');
    await button.trigger("click");
    expect(wrapper.emitted("clear")).toBeFalsy();
  });
});