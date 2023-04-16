import defaultSettings from '@/settings'

const title = defaultSettings.title || '本地生活服务管理后台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
