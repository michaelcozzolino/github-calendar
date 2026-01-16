import { defineCustomElement } from 'vue';
import cssStyle                from '@/index.css?inline';
import GitHubCalendar          from '@/UI/GitHubCalendar.ce.vue';

// todo: this helper might be inside a package as i need it for flyonui-vue too
export function defineGitHubCalendar(name: string = 'github-calendar'): void {
    const webComponent = defineCustomElement(
        GitHubCalendar,
        { styles: [cssStyle.replaceAll(':root', ':host')] },
    );

    if (customElements.get(name) === undefined) {
        customElements.define(name, webComponent);

        return;
    }

    throw new Error(`Custom element ${name} is already defined.`);
}
