import { mount } from "@vue/test-utils";
import EditTodoInput from "./02_EditTodoInput.vue";

describe("02_EditTodoInput.vue", () => {
  it("renders correctly with default props", () => {
    const wrapper = mount(EditTodoInput, {
      props: { modelValue: "", placeholder: "Edit todo" },
    });
    const input = wrapper.get('[data-testid="EditTodoInput"]');
    expect(input.exists()).toBe(true);
    expect(input.classes()).toContain("edit-todo-input");
    expect(input.attributes("placeholder")).toBe("Edit todo");
    expect(input.element.value).toBe("");
  });

  it("binds the text value to the modelValue prop", async () => {
    const wrapper = mount(EditTodoInput, {
      props: { modelValue: "Sample Todo" },
    });
    const input = wrapper.get('[data-testid="EditTodoInput"]');
    expect(input.element.value).toBe("Sample Todo");
  });

  it("emits an `update:modelValue` and `save` event on Enter key press", async () => {
    const wrapper = mount(EditTodoInput, {
      props: { modelValue: "" },
    });
    const input = wrapper.get('[data-testid="EditTodoInput"]');
    await input.setValue("New Todo");
    await input.trigger("keydown.enter");
    expect(wrapper.emitted("update:modelValue")[0]).toEqual(["New Todo"]);
    expect(wrapper.emitted("save")[0]).toEqual(["New Todo"]);
  });

  it("emits a `cancel` event on Escape key press", async () => {
    const wrapper = mount(EditTodoInput, {
      props: { modelValue: "Todo to Edit" },
    });
    const input = wrapper.get('[data-testid="EditTodoInput"]');
    await input.trigger("keydown.esc");
    expect(wrapper.emitted("cancel")).toBeTruthy();
  });

  it("emits an `update:modelValue` and `save` event on blur", async () => {
    const wrapper = mount(EditTodoInput, {
      props: { modelValue: "" },
    });
    const input = wrapper.get('[data-testid="EditTodoInput"]');
    await input.setValue("Updated Todo");
    await input.trigger("blur");
    expect(wrapper.emitted("update:modelValue")[0]).toEqual(["Updated Todo"]);
    expect(wrapper.emitted("save")[0]).toEqual(["Updated Todo"]);
  });

  it("trims the input value when emitting events", async () => {
    const wrapper = mount(EditTodoInput, {
      props: { modelValue: "" },
    });
    const input = wrapper.get('[data-testid="EditTodoInput"]');
    await input.setValue("   Trimmed Value   ");
    await input.trigger("keydown.enter");
    expect(wrapper.emitted("update:modelValue")[0]).toEqual(["Trimmed Value"]);
    expect(wrapper.emitted("save")[0]).toEqual(["Trimmed Value"]);
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