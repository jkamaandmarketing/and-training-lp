/**
 * アンドトレーニング 共通コンポーネント
 * CTAバナー・フッターを一元管理
 */

(function() {
  'use strict';

  // ===== 設定（変更時はここだけ編集） =====
  const CONFIG = {
    appStore: {
      url: 'https://apps.apple.com/jp/app/%E3%82%A2%E3%83%B3%E3%83%89%E3%83%88%E3%83%AC%E3%83%BC%E3%83%8B%E3%83%B3%E3%82%B0/id6755945883?ppid=caa8cc86-67e9-4e5c-9ebb-9b9373c036e6',
      badge: '/images/image_03.svg',
      alt: 'Download on the App Store'
    },
    googlePlay: {
      url: 'https://play.google.com/store/apps/details?id=app.andtraining.official',
      badge: '/images/image_04.svg',
      alt: 'Get it on Google Play'
    },
    company: {
      url: 'https://and-marketing.co.jp/',
      name: '運営会社'
    },
    privacy: {
      url: 'https://and-marketing.co.jp/privacy_policy_andtraining/',
      name: 'プライバシーポリシー'
    }
  };

  // ===== フッター直前CTAバナー =====
  function renderFooterCTA() {
    return `
<!-- App CTA Banner -->
<section class="app-cta-banner">
  <div class="container">
    <div class="app-cta-inner">
      <div class="app-cta-text">
        <p class="app-cta-name">アンドトレーニング</p>
        <p class="app-cta-desc">筋トレの記録・分析・継続をもっとスマートに</p>
      </div>
      <div class="app-cta-buttons">
        <a href="${CONFIG.appStore.url}" target="_blank" rel="noopener" class="app-cta-badge">
          <img src="${CONFIG.appStore.badge}" alt="${CONFIG.appStore.alt}" height="40">
        </a>
        <a href="${CONFIG.googlePlay.url}" target="_blank" rel="noopener" class="app-cta-badge">
          <img src="${CONFIG.googlePlay.badge}" alt="${CONFIG.googlePlay.alt}" height="40">
        </a>
      </div>
    </div>
  </div>
</section>
`;
  }

  // ===== 記事末尾CTA（用語集ページ用） =====
  function renderArticleCTA(text) {
    return `
    <!-- 記事末尾CTA -->
    <div class="article-cta">
      <p class="article-cta-text">${text}</p>
      <div class="article-cta-buttons">
        <a href="${CONFIG.appStore.url}" target="_blank" rel="noopener" class="article-cta-badge">
          <img src="${CONFIG.appStore.badge}" alt="${CONFIG.appStore.alt}" height="40">
        </a>
        <a href="${CONFIG.googlePlay.url}" target="_blank" rel="noopener" class="article-cta-badge">
          <img src="${CONFIG.googlePlay.badge}" alt="${CONFIG.googlePlay.alt}" height="40">
        </a>
      </div>
    </div>
`;
  }

  // ===== フッター =====
  function renderFooter() {
    return `
<!-- ===== FOOTER ===== -->
<footer>
  <div class="container">
    <div class="footer-copy">© 2025 アンドトレーニング. All rights reserved.</div>
    <div style="margin-top:10px;display:flex;gap:20px;justify-content:center;">
      <a href="${CONFIG.company.url}" target="_blank" rel="noopener noreferrer" style="font-size:.75rem;color:#555;text-decoration:underline;letter-spacing:.04em;transition:color .2s;" onmouseover="this.style.color='#888'" onmouseout="this.style.color='#555'">${CONFIG.company.name}</a>
      <a href="${CONFIG.privacy.url}" target="_blank" rel="noopener noreferrer" style="font-size:.75rem;color:#555;text-decoration:underline;letter-spacing:.04em;transition:color .2s;" onmouseover="this.style.color='#888'" onmouseout="this.style.color='#555'">${CONFIG.privacy.name}</a>
    </div>
  </div>
</footer>
`;
  }

  // ===== 自動挿入 =====
  document.addEventListener('DOMContentLoaded', function() {
    // フッター直前CTAを挿入
    const ctaPlaceholder = document.getElementById('common-cta');
    if (ctaPlaceholder) {
      ctaPlaceholder.outerHTML = renderFooterCTA();
    }

    // 記事末尾CTAを挿入（data-cta-text属性から文言を取得）
    const articleCtaPlaceholder = document.getElementById('article-cta');
    if (articleCtaPlaceholder) {
      const ctaText = articleCtaPlaceholder.getAttribute('data-cta-text');
      if (ctaText) {
        articleCtaPlaceholder.outerHTML = renderArticleCTA(ctaText);
      }
    }

    // フッターを挿入
    const footerPlaceholder = document.getElementById('common-footer');
    if (footerPlaceholder) {
      footerPlaceholder.outerHTML = renderFooter();
    }
  });

  // グローバルに公開（必要に応じて手動呼び出し用）
  window.AndTraining = {
    CONFIG: CONFIG,
    renderFooterCTA: renderFooterCTA,
    renderArticleCTA: renderArticleCTA,
    renderFooter: renderFooter
  };
})();
