import { mount } from "@vue/test-utils";
import RemainingCounter from "./12_RemainingCounter.vue";

describe("12_RemainingCounter Component", () => {
  it("renders correctly with default props", () => {
    const wrapper = mount(RemainingCounter);
    const counter = wrapper.find('[data-testid="RemainingCounter"]');
    expect(counter.exists()).toBe(true);
    expect(counter.text()).toBe("0 items left");
  });

  it("renders correctly with count = 1", () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 1 }
    });
    const counter = wrapper.find('[data-testid="RemainingCounter"]');
    expect(counter.text()).toBe("1 item left");
  });

  it("renders correctly with count > 1", () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 5 }
    });
    const counter = wrapper.find('[data-testid="RemainingCounter"]');
    expect(counter.text()).toBe("5 items left");
  });

  it("renders correctly with count = 0", () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 0 }
    });
    const counter = wrapper.find('[data-testid="RemainingCounter"]');
    expect(counter.text()).toBe("0 items left");
  });

  it("updates dynamically when count prop changes", async () => {
    const wrapper = mount(RemainingCounter, {
      props: { count: 2 }
    });
    const counter = wrapper.find('[data-testid="RemainingCounter"]');
    expect(counter.text()).toBe("2 items left");

    await wrapper.setProps({ count: 1 });
    expect(counter.text()).toBe("1 item left");

    await wrapper.setProps({ count: 0 });
    expect(counter.text()).toBe("0 items left");
  });
});