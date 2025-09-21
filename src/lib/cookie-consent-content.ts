export type ConsentCategory = 'necessary' | 'analytics' | 'advertising';

export interface ConsentToggleCopy {
  label: string;
  description: string;
}

export interface ConsentLayerCopy {
  title: string;
  description: string;
  buttons: {
    acceptAll: string;
    rejectAll: string;
    customize: string;
    save: string;
    back: string;
  };
  toggles: Record<ConsentCategory, ConsentToggleCopy>;
  legalLinks: {
    privacyPolicy: string;
    cookiesPolicy: string;
    managePreferences: string;
  };
}

export interface ConsentLocaleCopy {
  locale: string;
  firstLayer: {
    title: string;
    message: string;
    buttons: {
      acceptAll: string;
      rejectAll: string;
      customize: string;
    };
    links: {
      privacyPolicy: string;
      cookiesNotice: string;
    };
  };
  secondLayer: ConsentLayerCopy;
  footerLink: string;
}

const CONSENT_LOCALES: Record<string, ConsentLocaleCopy> = {
  en: {
    locale: 'en',
    firstLayer: {
      title: 'Cookies & Control',
      message:
        'We use essential cookies to run this site and, with your consent, analytics and advertising technologies. You can accept all, keep only necessary cookies, or customise your preferences. See the Cookies Notice for details. The English version prevails.',
      buttons: {
        acceptAll: 'Accept all cookie files',
        rejectAll: 'Accept only necessary cookie files',
        customize: 'Customise cookies',
      },
      links: {
        privacyPolicy: 'Privacy Policy',
        cookiesNotice: 'Cookies Notice',
      },
    },
    secondLayer: {
      title: 'Cookie preferences',
      description:
        'Adjust how we use cookies and similar technologies. Necessary cookies are always on because they enable core site functionality.',
      buttons: {
        acceptAll: 'Accept all',
        rejectAll: 'Only necessary',
        customize: 'Customise',
        save: 'Save selections',
        back: 'Back',
      },
      toggles: {
        necessary: {
          label: 'Necessary',
          description: 'Required for site stability, security, and delivering services explicitly requested by you.',
        },
        analytics: {
          label: 'Analytics & measurement',
          description: 'Helps us understand performance and improve the experience with anonymised usage data.',
        },
        advertising: {
          label: 'Advertising & personalisation',
          description: 'Allows personalised offers, remarketing, and audience measurement across our marketing channels.',
        },
      },
      legalLinks: {
        privacyPolicy: 'Privacy Policy',
        cookiesPolicy: 'Cookies Notice',
        managePreferences: 'Save selections',
      },
    },
    footerLink: 'Change cookie settings',
  },
  es: {
    locale: 'es',
    firstLayer: {
      title: 'Cookies y control',
      message:
        'Utilizamos cookies esenciales para que el sitio funcione y, con tu consentimiento, tecnologías de analítica y publicidad. Puedes aceptar todo, mantener solo las necesarias o personalizar tus preferencias. Consulta el Aviso de cookies para más detalles. La versión en inglés prevalece.',
      buttons: {
        acceptAll: 'Aceptar todos los archivos de cookies',
        rejectAll: 'Aceptar solo los archivos de cookies necesarios',
        customize: 'Configurar cookies',
      },
      links: {
        privacyPolicy: 'Política de privacidad',
        cookiesNotice: 'Aviso de cookies',
      },
    },
    secondLayer: {
      title: 'Preferencias de cookies',
      description:
        'Ajusta cómo usamos cookies y tecnologías similares. Las cookies necesarias siempre están activas porque permiten la funcionalidad básica del sitio.',
      buttons: {
        acceptAll: 'Aceptar todo',
        rejectAll: 'Solo necesarias',
        customize: 'Personalizar',
        save: 'Guardar selección',
        back: 'Atrás',
      },
      toggles: {
        necessary: {
          label: 'Necesarias',
          description: 'Obligatorias para la estabilidad del sitio, la seguridad y los servicios que solicitas explícitamente.',
        },
        analytics: {
          label: 'Analítica y medición',
          description: 'Nos ayuda a comprender el rendimiento y mejorar la experiencia con datos de uso agregados.',
        },
        advertising: {
          label: 'Publicidad y personalización',
          description: 'Permite ofertas personalizadas, remarketing y medición de audiencias en nuestros canales de marketing.',
        },
      },
      legalLinks: {
        privacyPolicy: 'Política de privacidad',
        cookiesPolicy: 'Aviso de cookies',
        managePreferences: 'Guardar selección',
      },
    },
    footerLink: 'Cambiar la configuración de cookies',
  },
  ru: {
    locale: 'ru',
    firstLayer: {
      title: 'Настройки cookies',
      message:
        'Мы используем обязательные cookies для работы сайта и, с вашего согласия, аналитику и рекламу. Вы можете принять всё, оставить только необходимые или настроить предпочтения. Подробнее — в уведомлении о cookies. Английская версия политики имеет приоритет.',
      buttons: {
        acceptAll: 'принять все файлы куки',
        rejectAll: 'принять только необходимые файлы куки',
        customize: 'настроить куки',
      },
      links: {
        privacyPolicy: 'Политика конфиденциальности',
        cookiesNotice: 'Уведомление о cookies',
      },
    },
    secondLayer: {
      title: 'Предпочтения cookies',
      description:
        'Настройте использование cookies и аналогичных технологий. Необходимые cookies всегда включены, так как обеспечивают работу сайта.',
      buttons: {
        acceptAll: 'Принять всё',
        rejectAll: 'Только необходимые',
        customize: 'Настроить',
        save: 'Сохранить выбор',
        back: 'Назад',
      },
      toggles: {
        necessary: {
          label: 'Необходимые',
          description: 'Обеспечивают стабильность сайта, безопасность и оказание запрошенных вами услуг.',
        },
        analytics: {
          label: 'Аналитика / измерение',
          description: 'Помогает понимать эффективность и улучшать опыт на основе агрегированных данных.',
        },
        advertising: {
          label: 'Реклама / персонализация',
          description: 'Позволяет персонализированные предложения, ремаркетинг и оценку аудиторий в наших каналах.',
        },
      },
      legalLinks: {
        privacyPolicy: 'Политика конфиденциальности',
        cookiesPolicy: 'Уведомление о cookies',
        managePreferences: 'Сохранить выбор',
      },
    },
    footerLink: 'Изменить настройки cookies',
  },
  uk: {
    locale: 'uk',
    firstLayer: {
      title: 'Налаштування cookies',
      message:
        'Ми використовуємо обов’язкові cookies для роботи сайту та, за вашою згодою, аналітику й рекламу. Ви можете прийняти все, залишити лише необхідні або налаштувати вподобання. Деталі — в повідомленні про cookies. Пріоритет має англомовна версія політики.',
      buttons: {
        acceptAll: 'Прийняти всі файли cookies',
        rejectAll: 'Прийняти лише необхідні файли cookies',
        customize: 'Налаштувати cookies',
      },
      links: {
        privacyPolicy: 'Політика конфіденційності',
        cookiesNotice: 'Повідомлення про cookies',
      },
    },
    secondLayer: {
      title: 'Переваги cookies',
      description:
        'Відкоригуйте використання cookies та подібних технологій. Необхідні cookies завжди увімкнені, адже забезпечують базову роботу сайту.',
      buttons: {
        acceptAll: 'Прийняти все',
        rejectAll: 'Лише необхідні',
        customize: 'Налаштувати',
        save: 'Зберегти вибір',
        back: 'Назад',
      },
      toggles: {
        necessary: {
          label: 'Необхідні',
          description: 'Забезпечують стабільність, безпеку та виконання запитаних вами послуг.',
        },
        analytics: {
          label: 'Аналітика та вимірювання',
          description: 'Допомагає розуміти ефективність і покращувати досвід на основі агрегованих даних.',
        },
        advertising: {
          label: 'Реклама та персоналізація',
          description: 'Дозволяє персоналізовані пропозиції, ремаркетинг та оцінку аудиторій у наших каналах.',
        },
      },
      legalLinks: {
        privacyPolicy: 'Політика конфіденційності',
        cookiesPolicy: 'Повідомлення про cookies',
        managePreferences: 'Зберегти вибір',
      },
    },
    footerLink: 'Змінити налаштування cookies',
  },
};

export const supportedConsentLocales = Object.keys(CONSENT_LOCALES);

export function getConsentCopy(locale: string): ConsentLocaleCopy {
  return CONSENT_LOCALES[locale] ?? CONSENT_LOCALES.en;
}

export type SupportedConsentLocale = keyof typeof CONSENT_LOCALES;
