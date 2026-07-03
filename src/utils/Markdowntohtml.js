import { marked } from "marked";

marked.setOptions({
    gfm: true, // enables tables + task lists
    breaks: false,
});

/**
 * Converts a markdown string into HTML that Tiptap's schema will parse correctly.
 *
 * Why this exists: `marked`'s default output is *valid HTML* but not always
 * *Tiptap-compatible HTML*. Two cases in particular break silently:
 *
 * 1. GFM task lists (`- [ ] foo`) — marked renders a plain
 *    `<li><input type="checkbox"> foo</li>`, but Tiptap's TaskList/TaskItem
 *    extensions only recognize `<ul data-type="taskList"><li data-type="taskItem"
 *    data-checked="..."><label><input type="checkbox">...</label><div>...</div></li></ul>`.
 *    A raw `<input>` isn't valid content for a regular list item's schema,
 *    so without this conversion the checkbox (and often the whole line)
 *    just vanishes when the content is set on the editor.
 *
 * 2. Tables — these mostly work as-is (Tiptap's Table extension parses
 *    standard <table>/<tr>/<th>/<td> tags), so they're left untouched here.
 *
 * @param {string} markdown
 * @returns {string} HTML safe to pass to `editor.commands.setContent(...)`
 */
export function markdownToHtml(markdown) {
    let html = marked.parse(markdown || "");

    html = convertTaskLists(html);

    return html;
}

/**
 * Finds <ul> blocks made entirely of checkbox <li> items and rewrites them
 * into the exact structure Tiptap's TaskList/TaskItem parseHTML rules match.
 *
 * Note: this handles single-level task lists (the common case across the
 * template library). Nested checklists inside a checklist item are not
 * re-nested by this pass — they'll still render, just as a flat list.
 */
function convertTaskLists(html) {
    const taskListBlock =
        /<ul>\s*((?:<li>\s*<input[^>]*type="checkbox"[^>]*>[\s\S]*?<\/li>\s*)+)<\/ul>/g;

    return html.replace(taskListBlock, (_match, itemsHtml) => {
        const itemPattern =
            /<li>\s*<input([^>]*)type="checkbox"([^>]*)>\s*([\s\S]*?)<\/li>/g;

        const items = itemsHtml.replace(
            itemPattern,
            (_liMatch, before, after, rest) => {
                const checked = /checked/i.test(before) || /checked/i.test(after);
                const content = rest.trim() || "&nbsp;";

                return (
                    `<li data-type="taskItem" data-checked="${checked}">` +
                    `<label><input type="checkbox"${checked ? " checked" : ""}><span></span></label>` +
                    `<div><p>${content}</p></div>` +
                    `</li>`
                );
            },
        );

        return `<ul data-type="taskList">${items}</ul>`;
    });
}