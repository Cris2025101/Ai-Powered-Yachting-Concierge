"use client"
import { useEffect, useState } from 'react'
import Script from 'next/script'
import { yachtsysConfig, getYachtSysThemeUrl, getYachtSysBundleCssUrl, getYachtSysBundleJsUrl } from '@/config/yachtsys'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

// Declare global types for YachtSys
declare global {
  interface Window {
    jQuery: any;
    channelconfig: string;
    SelectedValues: {
      Language: string;
      OrderLanguage: string;
    };
    YFClassic: (elementId: string) => void;
  }
}

export default function YachtResultsPage() {
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const router = useRouter();

  // Check if widget is configured
  const widgetConfigured =
    yachtsysConfig.channelCode !== 'XXXXX' &&
    yachtsysConfig.baseUrl !== '##urlr##';

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.jQuery &&
      window.YFClassic &&
      widgetConfigured
    ) {
      window.channelconfig = yachtsysConfig.channelCode;
      window.SelectedValues = {
        Language: yachtsysConfig.language,
        OrderLanguage: yachtsysConfig.orderLanguage,
      };
      window.YFClassic('YFpage');
      setWidgetLoaded(true);
    }
  }, [widgetConfigured]);

  return (
    <div className="min-h-screen bg-[#010A1E] relative overflow-hidden">
      {/* YachtSys Styles */}
      <link 
        rel="stylesheet" 
        href={getYachtSysBundleCssUrl()}
      />
      <link 
        rel="stylesheet" 
        href={getYachtSysThemeUrl()} 
        type="text/css"
      />

      {/* YachtSys Scripts */}
      <Script 
        src={getYachtSysBundleJsUrl()}
        strategy="beforeInteractive"
        onLoad={() => setWidgetLoaded(true)}
      />

      {/* Main Content */}
      <div className="relative z-10 pt-20 pb-16">
        <div className="backdrop-blur-2xl bg-[#0a0c19]/40 border border-white/15 rounded-2xl p-4 sm:p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4),_inset_0_1px_2px_rgba(255,255,255,0.1)] relative overflow-hidden max-w-4xl mx-auto">
          {/* Branding/Header */}
          <div className="flex flex-col items-center mb-8">
            {/* Optional: Add your logo here if desired */}
            {/* <Image src="/logo.svg" alt="Yaga Concierge Logo" width={64} height={64} className="mb-2" /> */}
            <h1 className="text-3xl font-bold text-white mb-2">Find Your Perfect Yacht</h1>
            <p className="text-white/70 max-w-xl text-center">
              Use our advanced search to explore the world's best yachts. Filter by type, size, price, and more.<br/>
              Start your next adventure with Yaga Concierge!
            </p>
            {/* Show Back to Home button here only if widget is configured */}
            {widgetConfigured && (
              <button
                className="mt-6 px-4 py-2 rounded-full bg-[#181c27] border border-white/20 text-white/80 hover:bg-[#23283a] transition-colors"
                onClick={() => router.push('/')}
              >
                Back to Home
              </button>
            )}
          </div>

          {/* YachtSys Container */}
          <div className="yf-main-wrapper" id="YFpage">
            {!widgetConfigured && (
              <div className="text-center text-white/80 py-12">
                <h2 className="text-2xl font-bold mb-2">Yacht Search Coming Soon!</h2>
                <p className="mb-6">
                  Our advanced yacht search engine will be available here as soon as we complete integration.<br/>
                  <span className="text-white/60 text-base">Tip: You can always return to the homepage or explore other features while we finish this section.</span>
                </p>
                {/* Show Back to Home button only if widget is not configured */}
                <button
                  className="mt-4 px-6 py-2 rounded-full bg-[#181c27] border border-white/20 text-white/80 hover:bg-[#23283a] transition-colors flex items-center mx-auto"
                  onClick={() => router.push('/')}
                >
                  Back to Home
                </button>
              </div>
            )}
            {widgetConfigured && !widgetLoaded && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                <span className="text-white/70">Loading yacht search...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 