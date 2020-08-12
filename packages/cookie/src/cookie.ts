interface SetObject {
    setCookieKey: string;
    setCookieValue: string;
}

interface DelObject {
    delCookieKey: string;
    delCookieValue: string;
}

export default class Cookie {
    public static getCookie(key: string): string {
        const reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`);

        const result: any = document.cookie.match(reg);

        if (result !== null) {
            return result[2];
        }
        return '';
    }

    public static setCookie(
        key: string,
        value: string,
        expire: number = 30 * 24 * 60 * 60,
    ): SetObject {
        const exp = new Date();

        exp.setTime(exp.getTime() + expire);

        document.cookie = `${key}=${escape(
            value,
        )};expires=${exp.toUTCString()}`;

        return { setCookieKey: key, setCookieValue: value };
    }

    public static delCookie(key: string): DelObject {
        const date = new Date();

        const delValue = this.getCookie(key);

        document.cookie = `${key}=;expires=${date.toUTCString()}`;

        return {
            delCookieKey: key,
            delCookieValue: delValue,
        };
    }
}
