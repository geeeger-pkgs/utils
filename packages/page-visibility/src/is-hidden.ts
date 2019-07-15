/**
 * see
 * [api](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API#Example)
 * [caniuse](https://caniuse.com/#search=page%20Visibility)
 * prefix moz used in firefox v10-v17,
 * prefix webkit chrome v14-v32 opera v15-v19 android browser 4.4-4.4.4
 * so, we would not support these perfix
 */

export default function isHidden() {
    return document.hidden;
}
