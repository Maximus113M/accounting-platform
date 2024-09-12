import { defineStore } from "pinia";
import { useSettingsState } from "./state";
import * as actions from "./actions";
export const useSettingsStore = defineStore("settings-store", {
  state: () => ({ ...useSettingsState() }),
  actions: { ...actions },
  getters: {},
});
