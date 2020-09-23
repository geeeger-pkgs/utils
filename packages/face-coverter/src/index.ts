export default class Converter {
  webUrl: string;

  staticPath: string;

  faceList: string[];

  regExpTemplate: string;

  constructor(
    faceList: string[],
    webUrl: string,
    staticPath: string,
    regExpTemplate = '\\[emot:faceId\\]'
  ) {
    this.faceList = faceList;
    this.webUrl = webUrl;
    this.staticPath = staticPath;
    this.regExpTemplate = regExpTemplate;
  }

  getPath(faceId: string): string {
    return `${this.webUrl + this.staticPath + faceId}.png`;
  }

  getImgTag(faceId: string): string {
    return `<img rel="${faceId}" src="${this.getPath(faceId)}">`;
  }

  convert(str: string): string {
    let result = str;
    this.faceList.forEach((faceId) => {
      const regExp = new RegExp(this.regExpTemplate.replace('faceId', faceId), 'g');
      result = result.replace(regExp, this.getImgTag(faceId));
    });
    return result;
  }
}
