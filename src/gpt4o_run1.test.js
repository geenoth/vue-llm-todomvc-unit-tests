import { mount } from "@vue/test-utils";
import EditTodoInput from "./02_EditTodoInput.vue";

describe("EditTodoInput.vue", () => {
  it("renders correctly with default props", () => {
    const wrapper = mount(EditTodoInput, {
      props: { modelValue: "", placeholder: "Edit todo" },
    });
    const input = wrapper.get('[data-testid="EditTodoInput"]');
    expect(input.exists()).toBe(true);
    expect(input.attributes("placeholder")).toBe("Edit todo");
    expect(input.element.value).toBe("");
    expect(input.classes()).toContain("edit-todo-input");
  });

  it("sets the input value to the modelValue prop", async () => {
    const wrapper = mount(EditTodoInput, {
      props: { modelValue: "New Todo" },
    });
    const input = wrapper.get('[data-testid="EditTodoInput"]');
    expect(input.element.value).toBe("New Todo");
  });

  it("emits input value changes via `update:modelValue` and `save` on Enter", async () => {
    const wrapper = mount(EditTodoInput, {
      props: { modelValue: "" },
    });
    const input = wrapper.get('[data-testid="EditTodoInput"]');
    await input.setValue("Updated Todo");
    await input.trigger("keydown.enter");
    expect(wrapper.emitted("update:modelValue")[0]).toEqual(["Updated Todo"]);
    expect(wrapper.emitted("save")[0]).toEqual(["Updated Todo"]);
  });

  it("emits `cancel` event on Escape key press", async () => {
    const wrapper = mount(EditTodoInput, {
      props: { modelValue: "Todo to Edit" },
    });
    const input = wrapper.get('[data-testid="EditTodoInput"]');
    await input.trigger("keydown.esc");
    expect(wrapper.emitted("cancel")).toBeTruthy();
  });

  it("emits `save` event on blur with trimmed input value", async () => {
    const wrapper = mount(EditTodoInput, {
      props: { modelValue: "" },
    });
    const input = wrapper.get('[data-testid="EditTodoInput"]');
    await input.setValue("   Trimmed Todo   ");
    await input.trigger("blur");
    expect(wrapper.emitted("save")[0]).toEqual(["Trimmed Todo"]);
    expect(wrapper.emitted("update:modelValue")[0]).toEqual(["Trimmed Todo"]);
  });

  it("updates the input value when the `modelValue` prop changes", async () => {
    const wrapper = mount(EditTodoInput, {
      props: { modelValue: "Initial Value" },
    });
    const input = wrapper.get('[data-testid="EditTodoInput"]');
    expect(input.element.value).toBe("Initial Value");
    await wrapper.setProps({ modelValue: "Updated Value" });
    expect(input.element.value).toBe("Updated Value");
  });
});