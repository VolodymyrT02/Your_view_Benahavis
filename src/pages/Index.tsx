import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { X, ChevronLeft, ChevronRight, Play, MessageCircle, Send, ChevronDown, Globe, RefreshCw } from "lucide-react";

import heroImage from "@/assets/hero-image.jpg";
import livingSpace from "@/assets/IMG_1404.jpg";
import terraceView from "@/assets/IMG_1459.jpg";
import kitchenModern from "@/assets/IMG_1461.jpg";
import loungeView from "@/assets/IMG_1462.jpg";
import readingCorner from "@/assets/IMG_1464.jpg";
import guestRoom from "@/assets/IMG_1465.jpg";
import masterSuite from "@/assets/IMG_1468.jpg";
import bathroomLuxury from "@/assets/IMG_1469.jpg";
import propertyTourVideo from "@/assets/property-tour.mp4";

const GALLERY_IMAGES = [
  { src: livingSpace, alt: "Open living space connected to the terrace" },
  { src: terraceView, alt: "Terrace with panoramic valley view" },
  { src: kitchenModern, alt: "Modern kitchen and dining area" },
  { src: loungeView, alt: "Second level lounge with natural light" },
  { src: readingCorner, alt: "Cozy reading corner next to the window" },
  { src: guestRoom, alt: "Guest bedroom with terrace access" },
  { src: masterSuite, alt: "Master suite with mountain view" },
  { src: bathroomLuxury, alt: "Main bathroom with walk-in shower" },
] as const;

const TELEGRAM_USERNAME = "realestate_MarbellaSpain";
const WHATSAPP_NUMBER = "34624430070";
const VIDEO_POSTER_NAME = "property-tour-poster.jpg";
const SITE_URL = "https://volodymyrt02.github.io/Your_view_Benahavis/";

type LanguageKey = "en" | "es" | "ru" | "uk";

type LandingCopy = {
  hero: {
    title: string;
    text: string;
    parameters: string;
  };
  gallery: {
    text: string;
  };
  video: {
    text: string;
  };
  location: {
    text: string;
  };
  final: {
    text: string;
    whatsapp: string;
    telegram: string;
  };
};

const content: Record<LanguageKey, LandingCopy> = {
  en: {
    hero: {
      title: "Your View, Your Home",
      text:
        "A light-filled townhouse with panoramic views of the sea and mountains — designed for peaceful family living away from the rush. Breakfasts on the terrace, open living areas for time together, and private rooms for rest. Comfort and calm just a short drive from the coast.",
      parameters: "315 m² built • 95 m² terrace • 57 m² plot • 3 bedrooms • 2 bathrooms",
    },
    gallery: {
      text: "An open living space flowing onto the terrace — perfect for everyday life, entertaining friends, and spending time as a family.",
    },
    video: {
      text: "The terrace as an extension of the living room: sunsets over the valley, fresh air, and moments to truly unwind.",
    },
    location: {
      text: "A quiet valley in Benahavís with panoramic views — just ~15 minutes from the beaches, promenade, the shopping & entertainment center in Puerto Banús. Secluded and green, yet close to everything the Costa del Sol has to offer.",
    },
    final: {
      text: "If this feels like the place for you, connect with us via your preferred messenger. We'll share more photos, videos, floorplans, and full details.",
      whatsapp: "Contact via WhatsApp",
      telegram: "Contact via Telegram",
    },
  },
  es: {
    hero: {
      title: "Your View, Your Home",
      text:
        "Un adosado luminoso con vistas panorámicas al mar y a las montañas — pensado para una vida familiar tranquila, lejos del ajetreo. Desayunos en la terraza, zonas abiertas para compartir momentos y espacios privados para el descanso. Confort y serenidad a pocos minutos de la costa.",
      parameters: "315 m² construidos • 95 m² de terraza • 57 m² de parcela • 3 dormitorios • 2 baños",
    },
    gallery: {
      text: "Un espacio de día abierto que se extiende a la terraza — ideal para la vida diaria, recibir amigos y compartir en familia.",
    },
    video: {
      text: "La terraza como extensión del salón: atardeceres sobre el valle, aire fresco y el momento perfecto para relajarse.",
    },
    location: {
      text: "Un valle tranquilo en Benahavís con vistas panorámicas — a solo ~15 minutos de las playas, el paseo marítimo, el centro comercial y de ocio en Puerto Banús. Rodeado de naturaleza pero cerca de todo lo que ofrece la Costa del Sol.",
    },
    final: {
      text: "Si siente que este es su lugar, conéctese con nosotros en su mensajero preferido. Le enviaremos más fotos, vídeos, planos y todos los detalles.",
      whatsapp: "Contactar por WhatsApp",
      telegram: "Contactar por Telegram",
    },
  },
  ru: {
    hero: {
      title: "Your View, Your Home",
      text:
        "Светлый таунхаус с панорамными видами на море и горы — пространство для спокойной семейной жизни без спешки. Террасы для завтраков на свежем воздухе, открытые зоны для совместного времени и уединённые комнаты для отдыха. Комфорт и тишина всего в короткой поездке от побережья.",
      parameters: "315 м² общая площадь • 95 м² терраса • 57 м² участок • 3 спальни • 2 ванные",
    },
    gallery: {
      text: "Единое дневное пространство с выходом на террасу — удобно для повседневной жизни, встреч с друзьями и семейного общения.",
    },
    video: {
      text: "Терраса как продолжение гостиной: закаты над долиной, свежий воздух и моменты, когда можно по-настоящему расслабиться.",
    },
    location: {
      text: "Тихая долина Benahavís с панорамными видами — всего ~15 минут до пляжей, променада, центра шопинга и развлечений в Puerto Banús. Уединённое окружение природы рядом со всей инфраструктурой побережья.",
    },
    final: {
      text: "Если вам откликается это ощущение «наш дом», напишите нам в удобный мессенджер. Мы поделимся фото, видео, планировками и всеми деталями.",
      whatsapp: "Связаться через WhatsApp",
      telegram: "Связаться через Telegram",
    },
  },
  uk: {
    hero: {
      title: "Your View, Your Home",
      text:
        "Світлий таунхаус із панорамними краєвидами на море та гори — простір для спокійного сімейного життя без поспіху. Тераси для сніданків на свіжому повітрі, відкриті зони для часу разом і затишні кімнати для відпочинку. Комфорт і тиша лише за кілька хвилин від узбережжя.",
      parameters: "315 м² забудови • 95 м² тераса • 57 м² ділянка • 3 спальні • 2 ванні кімнати",
    },
    gallery: {
      text: "Єдиний денний простір із виходом на терасу — зручно для повсякденного життя, зустрічей із друзями та сімейного спілкування.",
    },
    video: {
      text: "Тераса як продовження вітальні: заходи сонця над долиною, свіже повітря та миті справжнього відпочинку.",
    },
    location: {
      text: "Тиха долина Benahavís із панорамними краєвидами — лише ~15 хвилин до пляжів, променаду, центру шопінгу та розваг в Puerto Banús. У затишку природи та поруч з усією інфраструктурою узбережжя.",
    },
    final: {
      text: "Якщо це місце відгукується у вас як «наш дім» — напишіть нам у зручний месенджер. Ми надішлемо більше фото, відео, плани та всі деталі.",
      whatsapp: "Зв'язатися через WhatsApp",
      telegram: "Зв'язатися через Telegram",
    },
  },
};

const languageNames: Record<LanguageKey, string> = {
  en: "English",
  es: "Español",
  ru: "Русский",
  uk: "Українська",
};

const messageTemplates: Record<LanguageKey, string> = {
  en: "I'm interested in the townhouse in Benahavís — Your View, Your Home. Please send detailed information.",
  es: "Me interesa el adosado en Benahavís — Your View, Your Home. Envíenme información detallada.",
  ru: "Меня заинтересовал таунхаус в Бенахависе — Your View, Your Home. Пришлите детальную информацию.",
  uk: "Мене зацікавив таунхаус у Бенахавісі — Your View, Your Home. Надішліть детальну інформацію.",
};

const videoStatusMessages = {
  loading: {
    en: "Loading the property tour…",
    es: "Cargando el tour de la propiedad…",
    ru: "Загружаем видео-тур…",
    uk: "Завантажуємо відеотур…",
  },
  error: {
    en: "We could not load the video. Reload the page or press “Try again”.",
    es: "No se pudo cargar el video. Recarga la página o pulsa «Reintentar».",
    ru: "Не удалось загрузить видео. Обновите страницу или нажмите «Повторить».",
    uk: "Не вдалося завантажити відео. Оновіть сторінку або натисніть «Спробувати ще раз».",
  },
} as const;

const videoRetryLabels = {
  en: "Try again",
  es: "Reintentar",
  ru: "Повторить",
  uk: "Спробувати ще раз",
} as const;

const detectInitialLanguage = (): LanguageKey => {
  if (typeof navigator === "undefined") {
    return "en";
  }

  const browserLang = navigator.language.slice(0, 2).toLowerCase();
  if (browserLang === "es" || browserLang === "ru" || browserLang === "uk") {
    return browserLang;
  }

  return "en";
};

const Index: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<LanguageKey>(() => detectInitialLanguage());
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoPoster, setVideoPoster] = useState<string | undefined>(undefined);
  const slideshowTimer = useRef<number | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const currentContent = content[currentLang];

  const messageText = useMemo(() => messageTemplates[currentLang] ?? messageTemplates.en, [currentLang]);
  const encodedMessage = useMemo(() => encodeURIComponent(messageText), [messageText]);

  const whatsappLink = useMemo(() => {
    const url = new URL(`https://wa.me/${WHATSAPP_NUMBER}`);
    url.searchParams.set("text", messageText);
    return url.toString();
  }, [messageText]);

  const telegramDeepLink = useMemo(
    () => `tg://resolve?domain=${TELEGRAM_USERNAME}&text=${encodedMessage}`,
    [encodedMessage],
  );

  const telegramWebFallback = useMemo(() => {
    const fallbackUrl = new URL("https://t.me/share/url");
    fallbackUrl.searchParams.set("url", SITE_URL);
    fallbackUrl.searchParams.set("text", messageText);
    return fallbackUrl.toString();
  }, [messageText]);

  const handleTelegramClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();

      const isMobile = /android|iphone|ipad|ipod/i.test(navigator.userAgent);

      if (isMobile) {
        window.location.href = telegramDeepLink;
        const timer = window.setTimeout(() => {
          window.location.href = telegramWebFallback;
        }, 1400);

        const cancelFallback = () => window.clearTimeout(timer);
        window.addEventListener("focus", cancelFallback, { once: true });
        window.addEventListener("pagehide", cancelFallback, { once: true });
        return;
      }

      const deepLinkWindow = window.open(telegramDeepLink, "_blank", "noopener,noreferrer");
      const timer = window.setTimeout(() => {
        if (!deepLinkWindow || deepLinkWindow.closed) {
          window.open(telegramWebFallback, "_blank", "noopener,noreferrer");
        }
      }, 1200);

      const cancelFallback = () => window.clearTimeout(timer);
      window.addEventListener("focus", cancelFallback, { once: true });
      window.addEventListener("pagehide", cancelFallback, { once: true });
    },
    [telegramDeepLink, telegramWebFallback],
  );

  const goToNextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  }, []);

  const goToPrevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  }, []);

  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    const [{ clientX, clientY }] = Array.from(event.touches);
    touchStart.current = { x: clientX, y: clientY };
  }, []);

  const handleTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      if (!touchStart.current) return;

      const { clientX: endX, clientY: endY } = event.changedTouches[0];
      const diffX = touchStart.current.x - endX;
      const diffY = touchStart.current.y - endY;

      touchStart.current = null;

      if (Math.abs(diffX) < 50 || Math.abs(diffX) <= Math.abs(diffY)) {
        return;
      }

      if (diffX > 0) {
        goToNextImage();
      } else {
        goToPrevImage();
      }
    },
    [goToNextImage, goToPrevImage],
  );

  useEffect(() => {
    if (!galleryOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goToNextImage();
      if (event.key === "ArrowLeft") goToPrevImage();
      if (event.key === "Escape") setGalleryOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [galleryOpen, goToNextImage, goToPrevImage]);

  useEffect(() => {
    if (galleryOpen || GALLERY_IMAGES.length < 2) {
      return undefined;
    }

    slideshowTimer.current = window.setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    }, 5000);

    return () => {
      if (slideshowTimer.current) {
        window.clearInterval(slideshowTimer.current);
        slideshowTimer.current = null;
      }
    };
  }, [galleryOpen]);

  useEffect(() => {
    if (videoOpen) {
      setVideoReady(false);
      setVideoError(false);
      requestAnimationFrame(() => videoRef.current?.load());
      return;
    }

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [videoOpen]);

  useEffect(() => {
    let cancelled = false;
    const posterPath = `${import.meta.env.BASE_URL}${VIDEO_POSTER_NAME}`;

    const setPoster = (value: string) => {
      if (!cancelled) {
        setVideoPoster(value);
      }
    };

    const extractFrame = () => {
      const tempVideo = document.createElement("video");
      tempVideo.muted = true;
      tempVideo.playsInline = true;
      tempVideo.preload = "auto";
      tempVideo.crossOrigin = "anonymous";
      tempVideo.src = propertyTourVideo;

      const handleLoadedData = () => {
        const canvas = document.createElement("canvas");
        const width = tempVideo.videoWidth || 1280;
        const height = tempVideo.videoHeight || 720;
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");

        if (context) {
          context.drawImage(tempVideo, 0, 0, width, height);
          setPoster(canvas.toDataURL("image/jpeg"));
        }

        tempVideo.removeEventListener("loadeddata", handleLoadedData);
        tempVideo.src = "";
      };

      tempVideo.addEventListener("loadeddata", handleLoadedData);
      tempVideo.load();
    };

    const tryLoadPoster = async () => {
      try {
        const response = await fetch(posterPath, { method: "HEAD" });
        if (response.ok) {
          setPoster(posterPath);
          return;
        }
      } catch (error) {
        // ignored — fallback below will generate poster on the client
      }

      extractFrame();
    };

    tryLoadPoster();

    return () => {
      cancelled = true;
    };
  }, []);

  const onVideoError = useCallback(() => {
    setVideoError(true);
    setVideoReady(false);
  }, []);

  const onVideoLoaded = useCallback((event: React.SyntheticEvent<HTMLVideoElement>) => {
    setVideoReady(true);
    setVideoError(false);
    event.currentTarget.play().catch(() => {
      /* Автовоспроизведение может быть заблокировано — пользователь нажмёт сам */
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-4 right-4 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-background/95 backdrop-blur-sm border shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Globe size={16} />
              {languageNames[currentLang]}
              <ChevronDown size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-background border shadow-lg">
            {Object.entries(languageNames).map(([lang, name]) => (
              <DropdownMenuItem
                key={lang}
                onClick={() => setCurrentLang(lang as LanguageKey)}
                className={`cursor-pointer ${currentLang === lang ? "bg-accent text-accent-foreground" : ""}`}
              >
                {name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <section className="container mx-auto px-4 pt-16 pb-8">
        <div className="text-center mb-8">
          <h1 className="hero-title">{currentContent.hero.title}</h1>
          <p className="hero-text">{currentContent.hero.text}</p>
          <div className="parameters">{currentContent.hero.parameters}</div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden shadow-[var(--shadow-strong)] rounded-2xl">
            <img
              src={heroImage}
              alt="Luxury townhouse in Benahavís with panoramic views"
              className="w-full h-[320px] sm:h-[380px] md:h-[520px] lg:h-[560px] object-cover"
              loading="eager"
              decoding="async"
            />
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <p className="section-text mb-6">{currentContent.gallery.text}</p>

        <div className="max-w-4xl mx-auto">
          <div
            className="relative"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={GALLERY_IMAGES[currentImageIndex].src}
              alt={GALLERY_IMAGES[currentImageIndex].alt}
              className="gallery-image w-full h-[260px] sm:h-[320px] md:h-[480px] lg:h-[520px] object-cover rounded-xl"
              onClick={() => setGalleryOpen(true)}
              loading="lazy"
              decoding="async"
            />

            <div className="pointer-events-none absolute inset-0 hidden md:flex items-center justify-between px-4">
              <button
                className="pointer-events-auto w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                onClick={(event) => {
                  event.stopPropagation();
                  goToPrevImage();
                }}
                aria-label="Previous photo"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="pointer-events-auto w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                onClick={(event) => {
                  event.stopPropagation();
                  goToNextImage();
                }}
                aria-label="Next photo"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {GALLERY_IMAGES.map((_, index) => (
                <button
                  key={GALLERY_IMAGES[index].alt}
                  type="button"
                  className={`pointer-events-auto h-2.5 rounded-full transition-all ${
                    currentImageIndex === index ? "bg-white w-6" : "bg-white/50 w-2.5"
                  }`}
                  onClick={(event) => {
                    event.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  aria-label={`Go to photo ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {galleryOpen && (
        <div className="fullscreen-overlay" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            onClick={() => setGalleryOpen(false)}
          >
            <X size={32} />
          </button>

          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            onClick={goToPrevImage}
            aria-label="Previous photo"
          >
            <ChevronLeft size={48} />
          </button>

          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            onClick={goToNextImage}
            aria-label="Next photo"
          >
            <ChevronRight size={48} />
          </button>

          <img
            src={GALLERY_IMAGES[currentImageIndex].src}
            alt={GALLERY_IMAGES[currentImageIndex].alt}
            className="max-w-full max-h-full object-contain"
            loading="lazy"
            decoding="async"
          />

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
            {currentImageIndex + 1} / {GALLERY_IMAGES.length}
          </div>
        </div>
      )}

      <section className="container mx-auto px-4 py-8">
        <p className="section-text mb-6">{currentContent.video.text}</p>

        <div className="max-w-4xl mx-auto">
          <div
            className="relative gallery-image h-[260px] sm:h-[320px] md:h-[480px] lg:h-[520px] flex items-center justify-center cursor-pointer group overflow-hidden rounded-xl"
            onClick={() => setVideoOpen(true)}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 group-hover:opacity-90"
              style={{
                backgroundImage: videoPoster ? `url(${videoPoster})` : undefined,
                backgroundColor: videoPoster ? undefined : "var(--secondary)",
              }}
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300" />
            <Play size={80} className="text-white drop-shadow-lg z-10" />
            <div className="absolute bottom-4 left-4 text-white font-medium z-10">Video Tour: Terrace &amp; Views</div>
          </div>
        </div>
      </section>

      {videoOpen && (
        <div className="fullscreen-overlay">
          <button className="absolute top-4 right-4 text-white hover:text-gray-300 z-10" onClick={() => setVideoOpen(false)}>
            <X size={32} />
          </button>

          <div className="relative max-w-4xl w-full">
            <video
              ref={videoRef}
              controls
              preload="auto"
              className="w-full h-auto rounded-lg bg-black"
              poster={videoPoster}
              onLoadedData={onVideoLoaded}
              onError={onVideoError}
            >
              <source src={propertyTourVideo} type="video/mp4" />
            </video>

            {!videoReady && !videoError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-lg bg-black/70 text-white text-center p-8">
                <Play size={48} className="opacity-70" />
                <p className="text-base md:text-lg">{videoStatusMessages.loading[currentLang]}</p>
              </div>
            )}

            {videoError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-lg bg-black/80 text-white text-center p-8">
                <RefreshCw size={40} className="opacity-80" />
                <p className="text-base md:text-lg">{videoStatusMessages.error[currentLang]}</p>
                <Button
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-black"
                  onClick={() => {
                    setVideoError(false);
                    setVideoReady(false);
                    requestAnimationFrame(() => videoRef.current?.load());
                  }}
                >
                  {videoRetryLabels[currentLang]}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      <section className="container mx-auto px-4 py-8">
        <p className="section-text mb-6">{currentContent.location.text}</p>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden shadow-[var(--shadow-strong)] rounded-2xl">
            <iframe
              title="Townhouse location in Benahavís"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3186.1!2d-5.034492!3d36.491103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDI5JzI4LjAiTiA1wrAwMicwNC4yIlc!5e1!3m2!1sen!2ses!4v1609459200000!5m2!1sen!2ses&maptype=satellite&markers=36.491103,-5.034492&zoom=16"
              width="100%"
              height="360"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[400px] md:h-[500px]"
            />
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 pb-24">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl leading-relaxed mb-8 font-semibold italic">
            {currentContent.final.text}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp flex items-center gap-2 min-w-[200px] justify-center"
            >
              <MessageCircle size={20} />
              {currentContent.final.whatsapp}
            </a>

            <a
              href={telegramDeepLink}
              onClick={handleTelegramClick}
              className="btn-telegram flex items-center gap-2 min-w-[200px] justify-center"
            >
              <Send size={20} />
              {currentContent.final.telegram}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
