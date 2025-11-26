import { mount } from "@vue/test-utils";
import DestroyButton from "./03_DestroyButton.vue";

describe("03_DestroyButton.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(DestroyButton);
    const button = wrapper.get('[data-testid="DestroyButton"]');
    expect(button.exists()).toBe(true);
    expect(button.attributes("aria-label")).toBe("Delete");
    expect(button.attributes("type")).toBe("button");
    expect(button.text()).toBe("×");
  });

  it("emits `destroy` event when clicked", async () => {
    const wrapper = mount(DestroyButton);
    const button = wrapper.get('[data-testid="DestroyButton"]');
    await button.trigger("click");
    expect(wrapper.emitted("destroy")).toBeTruthy();
    expect(wrapper.emitted("destroy").length).toBe(1);
  });
});