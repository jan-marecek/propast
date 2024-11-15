import { _, addMessages, init } from "svelte-i18n";
import en from "../../lang/en.json";
import cs from "../../lang/cs.json";

// ...
function initi18n() {
  addMessages("en", en);
  addMessages("cs", cs);
  init({
    fallbackLocale: "en",
    //initialLocale: getLocaleFromNavigator()
    initialLocale: "en",
  });
}

export { initi18n, _ };
