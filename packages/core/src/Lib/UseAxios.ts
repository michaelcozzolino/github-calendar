import type { StrictUseAxiosReturn, UseAxiosOptionsWithInitialData } from '@vueuse/integrations/useAxios';
import type { AxiosResponse }                                        from 'axios';

// todo: these types should stay in a package
export type ResponseNoContent = '';

export type DefaultStrictUseAxiosReturn<Response, Payload = unknown> = StrictUseAxiosReturn<
    Response,
    AxiosResponse<Response>,
    Payload,
    UseAxiosOptionsWithInitialData<Response>
>;

export type PromiseLikeStrictUseAxiosReturn<Response, Payload = unknown>
    = Promise<DefaultStrictUseAxiosReturn<Response, Payload>>
        & DefaultStrictUseAxiosReturn<Response, Payload>;
