import { useEffect, useRef } from 'react';

interface Adfit {
  display: (unit: string) => void;
  destroy: (unit: string) => void;
  refresh: (unit: string) => void;
}

declare global {
  interface Window {
    adfit?: Adfit;
  }
}

function KakaoAdFit({ unit, width, height, disabled }: any) {
  const scriptElementWrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) return;
    if (scriptElementWrapper.current) {
      const script = document.createElement('script');
      script.setAttribute('src', 'https://t1.daumcdn.net/kas/static/ba.min.js');
      script.setAttribute('charset', 'utf-8');
      script.setAttribute('async', 'true');

      scriptElementWrapper.current.appendChild(script);
    }
    return () => {
      const globalAdfit = 'adfit' in window ? window.adfit : null;
      if (globalAdfit) globalAdfit.destroy(unit);
    };
  }, []);

  return (
    <div ref={scriptElementWrapper}>
      <ins
        className='kakao_ad_area'
        style={{ display: 'none' }}
        data-ad-unit={unit}
        data-ad-width={width}
        data-ad-height={height}
      ></ins>
    </div>
  );
}

export default KakaoAdFit;
