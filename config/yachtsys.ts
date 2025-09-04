export const yachtsysConfig = {
  // Replace these with your actual values
  channelCode: 'XXXXX',
  baseUrl: '##urlr##',
  theme: 'navy', // Options: navy, teal, sage, turquoise
  language: 'EN', // Options: EN, ES, RU
  orderLanguage: 'EN', // Options: EN, ES, RU
} as const

// Helper function to get the theme CSS URL
export function getYachtSysThemeUrl() {
  return `${yachtsysConfig.baseUrl}/App_Themes/mobile/themes/yf_${yachtsysConfig.theme}.css`
}

// Helper function to get the bundle CSS URL
export function getYachtSysBundleCssUrl() {
  return `${yachtsysConfig.baseUrl}/App_Themes/mobile/yf_mobile_bundle_css.min.css`
}

// Helper function to get the bundle JS URL
export function getYachtSysBundleJsUrl() {
  return `${yachtsysConfig.baseUrl}/js/yf_mobile_bundle_js.min.js`
} 