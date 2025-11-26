import { mount } from "@vue/test-utils";
import DestroyButton from "./03_DestroyButton.vue";

describe("03_DestroyButton Component", () => {
  it("renders correctly with proper attributes", () => {
    const wrapper = mount(DestroyButton);
    const button = wrapper.find('[data-testid="DestroyButton"]');
    expect(button.exists()).toBe(true);
    expect(button.attributes("type")).toBe("button");
    expect(button.attributes("aria-label")).toBe("Delete");
    expect(button.text()).toBe("×");
  });

  it("emits destroy event on click", async () => {
    const wrapper = mount(DestroyButton);
    const button = wrapper.find('[data-testid="DestroyButton"]');
    await button.trigger("click");
    expect(wrapper.emitted().destroy).toBeTruthy();
    expect(wrapper.emitted().destroy.length).toBe(1);
  });

  it("does not emit destroy event when not clicked", () => {
    const wrapper = mount(DestroyButton);
    expect(wrapper.emitted().destroy).toBeFalsy();
  });
});