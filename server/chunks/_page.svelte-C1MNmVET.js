import { p as push, e as ensure_array_like, h as head, c as pop } from './index-LnAWvjNs.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { stringify } from 'nbtify';

function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx$1(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}

const replacements = {
  translate: /* @__PURE__ */ new Map([
    [true, "yes"],
    [false, "no"]
  ])
};
function attr(name, value, is_boolean = false) {
  if (value == null || !value && is_boolean || value === "" && name === "class") return "";
  const normalized = name in replacements && replacements[name].get(value) || value;
  const assignment = is_boolean ? "" : `="${escape_html(normalized, true)}"`;
  return ` ${name}${assignment}`;
}
function clsx(value) {
  if (typeof value === "object") {
    return clsx$1(value);
  } else {
    return value ?? "";
  }
}
function importLevelV1(data) {
  console.log(stringify(data, { space: 4 }));
  const level = data.level;
  return {
    name: data.name?.valueOf(),
    version: data.version?.valueOf(),
    level: {
      sections: level.sections.length,
      width: level.totalX?.valueOf()
    }
  };
}
function importLevel(data) {
  const version = data.version;
  if (!version) return importLevelV0(data);
  switch (version.valueOf()) {
    case 1:
      return importLevelV1(data);
  }
}
function importLevelV0(data) {
  console.log(data);
  return;
}
function FileInput($$payload, $$props) {
  push();
  let highlight = false;
  $$payload.out += `<label id="dropContainer"${attr("class", clsx([{ highlight }]) + " svelte-1bqry9t")} for="hotbars">Drop your hotbar.nbt or command_storage_*.dat here or <div id="dropContainerClick" class="svelte-1bqry9t">click here</div> to select the file(s). <input type="file" name="hotbars" id="hotbars" hidden accept=".nbt, .dat" multiple></label>`;
  pop();
}
function Level($$payload, $$props) {
  push();
  let { level } = $$props;
  let levelToDisplay = importLevel(level);
  if (levelToDisplay) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="level svelte-xt904n"><span class="level-name svelte-xt904n">${escape_html(levelToDisplay.name)}</span> <span class="level-info level-sections svelte-xt904n">sections: ${escape_html(levelToDisplay.level.sections)}</span> <span class="level-info level-size svelte-xt904n">width: ${escape_html(levelToDisplay.level.width)}</span> <span class="level-info level-version svelte-xt904n">v${escape_html(levelToDisplay.version)}</span></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function _page($$payload, $$props) {
  push();
  let importedLevels = [];
  const each_array = ensure_array_like(importedLevels);
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Tunnel Rats Map Sharer</title>`;
  });
  $$payload.out += `<h1>Tunnel Rats Map Sharer</h1> `;
  FileInput($$payload);
  $$payload.out += `<!----> <div class="foundLevelWrapper svelte-1hmvaxy"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let level = each_array[$$index];
    Level($$payload, { level });
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-C1MNmVET.js.map
