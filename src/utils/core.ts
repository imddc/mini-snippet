// 创建不区分大小写的正则表达式
export function createRegexNoCase(str: string) {
  return new RegExp(str, 'i')
}
