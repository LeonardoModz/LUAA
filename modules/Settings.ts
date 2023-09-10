import LocalStorage from "./LocalStorage";

export default class Settings {
    constructor(
        public config = {
            storage_key: "_goofyuglifier",
            default_settings: {
                ["settings"]: {
                    ["test_checkbox"]: false,
                    ["test_slider"]: "50",
                    ["watermark"]: "",
                    ["protect_watermark"]: false,
                    ["tester_access_key"]: "",
                    ["beautify_output"]: false,
                }
            }
        }
    ) {
        if (!LocalStorage.Exists(this.config.storage_key)) {
            LocalStorage.Create(this.config.storage_key, this.config.default_settings)
        }
    }

    init() {
        const _settings = LocalStorage.GetKey(this.config.storage_key, "settings")
        document.querySelectorAll(".setting").forEach(setting => {
            const input: HTMLInputElement = setting.querySelector("input"),
                setting_id = $(input).attr("id")
            input.addEventListener("input", (e) => {
                const [setting_name, setting_id, value] = this.HandleInput(e, setting)
                this.UpdateSetting(setting_name, setting_id, value)
            })
            if (_settings[setting_id]) {
                const value = _settings[setting_id]
                switch (input.type) {
                    case "checkbox":
                        input.checked = value
                        break;
                    case "range":
                        const range_text: HTMLElement = setting.querySelector(".slider-value"),
                            range_text_value = range_text.attributes.getNamedItem("value-type").value || ""
                        range_text.innerText = `${value}${range_text_value}`
                        input.value = value
                        break;
                    case "text":
                        input.value = value
                        break;
                    case "password":
                        input.value = value
                        break;
                    default:
                        console.warn(`Invalid input type <${input.type}>`)
                        break;
                }
            }
        })
    }

    HandleInput(e: Event, setting: Element): [string, string, boolean | string | number] {
        const name: HTMLElement = setting.querySelector(".setting-name"),
            setting_id = $(setting.querySelector("input")).attr("id"),
            input: HTMLInputElement = setting.querySelector("input")

        let new_value: boolean | string | number
        if (e.target instanceof HTMLInputElement && e.target.type === "range") {
            const range_text: HTMLElement = setting.querySelector(".slider-value"),
                range_text_value = range_text.attributes.getNamedItem("value-type").value || ""
            new_value = input.value
            range_text.innerText = `${input.value}${range_text_value}`
            //console.log(`${name.innerText}: ${input.value}${range_text_value}`);
        } else if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
            new_value = input.checked
            //console.log(`${name.innerText}: ${input.checked}`);
        } else if (e.target instanceof HTMLInputElement && e.target.type === "text" || "password") {
            new_value = input.value
            //console.log(`${name.innerText}: ${input.value}`);
        }
        return [name.innerText, setting_id, new_value]
    }

    UpdateSetting(name: string, id: string, value: boolean | string | number) {
        LocalStorage.Edit(this.config.storage_key, "settings", id, value)
    }
}