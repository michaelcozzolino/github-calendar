import type { ComputedRef, MaybeRefOrGetter } from "vue";
import { useDateFormat }                      from "@vueuse/core";

export function formatDate(date: MaybeRefOrGetter<Date>): ComputedRef<string> {
    return useDateFormat(date, 'YYYY-MM-DD')
}
