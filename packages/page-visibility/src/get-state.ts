/**
 * see [Document visibilityState](https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilityState)
 */
export default function getState(): string {
    // if (document.visibilityState === 'prerender') {
    //     return 'hidden';
    // }

    // prefer to use value visible and hidden
    // [see](https://www.w3.org/TR/page-visibility/#dom-document-visibilitystate)
    // value prerender deprecated(not recommend value)
    // value unloaded deprecated (not recommend value)
    return document.visibilityState;
}
