import type { ComputedRef, MaybeRefOrGetter } from 'vue';
import { computed,  toValue }                 from 'vue';

export function useGitHub(username: MaybeRefOrGetter<string>): {
    useContributionsOverviewUrl: (from: MaybeRefOrGetter<string>, to?: MaybeRefOrGetter<string>) => ComputedRef<string>;
    profileUrl:                  ComputedRef<string>;
    profilePicUrl:               ComputedRef<string>;
} {
    const baseUrl = 'https://github.com/';

    const profileUrl = computed((): string => `${baseUrl}${toValue(username)}`);
    const profilePicUrl = computed((): string => `${profileUrl.value}.png`);

    function useContributionsOverviewUrl(
        from: MaybeRefOrGetter<string>,
        to?: MaybeRefOrGetter<string>,
    ): ComputedRef<string> {
        return computed(() => {
            const url = `${baseUrl}{toValue(username)}?tab=overview&from=${toValue(from)}`;

            if (to === undefined) {
                return url;
            }

            return `${url}&to=${toValue(to)}`;
        });
    }

    return { useContributionsOverviewUrl, profileUrl, profilePicUrl };
}
