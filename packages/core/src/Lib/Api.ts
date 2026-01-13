import type { UseAxiosOptionsBase }             from '@vueuse/integrations/useAxios';
import type { MaybeRefOrGetter }                from 'vue';
import type { PromiseLikeStrictUseAxiosReturn } from '@/Lib/UseAxios';
import type { GitHubContributionsResponse }     from '@/Types/GitHubCalendar';
import { useAxios  }                            from '@vueuse/integrations/useAxios';
import {  toValue }                             from 'vue';

class Api {
    public getGitHubContributions(
        username: MaybeRefOrGetter<string>,
        years: MaybeRefOrGetter<[number, number]>, // [start, end] year
        options: UseAxiosOptionsBase<GitHubContributionsResponse>,
    ): PromiseLikeStrictUseAxiosReturn<GitHubContributionsResponse> {
        return useAxios(
            `https://github-contributions-api.jogruber.de/v4/${toValue(username)}`,
            { method: 'GET', params: { y: toValue(years) } },
            { initialData: { total: {}, contributions: [] }, immediate: true, ...options },
        );
    }
}

export default new Api();
