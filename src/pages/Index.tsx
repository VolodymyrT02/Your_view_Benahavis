import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { X, ChevronLeft, ChevronRight, Play, MessageCircle, Send, ChevronDown, Globe } from 'lucide-react';

// Import hero image
import heroImage from '@/assets/hero-image.jpg';

// Import gallery images
import interiorLiving from '@/assets/interior-living.jpg';
import terraceDining from '@/assets/terrace-dining.jpg';
import kitchenModern from '@/assets/kitchen-modern.jpg';
import bedroomMaster from '@/assets/bedroom-master.jpg';
import bathroomLuxury from '@/assets/bathroom-luxury.jpg';

// Gallery images array
const galleryImages = [
  interiorLiving,
  terraceDining,
  kitchenModern,
  bedroomMaster,
  bathroomLuxury
];

// Language content
const content = {
  en: {
    hero: {
      title: "Your View, Your Home",
      text: "A light-filled home with panoramic views of the sea and mountains — designed for peaceful family living away from the rush. Breakfasts on the terrace, open living areas for time together, and private rooms for rest. Comfort and calm just a short drive from the coast.",
      parameters: "315 m² built • 95 m² terrace • 57 m² plot • 3 bedrooms • 2 bathrooms"
    },
    gallery: {
      text: "An open living space flowing onto the terrace — perfect for everyday life, entertaining friends, and spending time as a family."
    },
    video: {
      text: "The terrace as an extension of the living room: sunsets over the valley, fresh air, and moments to truly unwind."
    },
    location: {
      text: "A quiet valley in Benahavís with panoramic views — just ~15 minutes from the beaches, promenade, the shopping & entertainment center in Puerto Banús. Secluded and green, yet close to everything the Costa del Sol has to offer."
    },
    final: {
      text: "If this feels like the place for you, connect with us via your preferred messenger. We'll share more photos, videos, floorplans, and full details.",
      whatsapp: "Contact via WhatsApp",
      telegram: "Contact via Telegram"
    }
  },
  es: {
    hero: {
      title: "Your View, Your Home",
      text: "Un hogar luminoso con vistas panorámicas al mar y a las montañas — pensado para una vida familiar tranquila, lejos del ajetreo. Desayunos en la terraza, zonas abiertas para compartir momentos y espacios privados para el descanso. Confort y serenidad a pocos minutos de la costa.",
      parameters: "315 m² construidos • 95 m² de terraza • 57 m² de parcela • 3 dormitorios • 2 baños"
    },
    gallery: {
      text: "Un espacio de día abierto que se extiende a la terraza — ideal para la vida diaria, recibir amigos y compartir en familia."
    },
    video: {
      text: "La terraza como extensión del salón: atardeceres sobre el valle, aire fresco y el momento perfecto para relajarse."
    },
    location: {
      text: "Un valle tranquilo en Benahavís con vistas panorámicas — a solo ~15 minutos de las playas, el paseo marítimo, el centro comercial y de ocio en Puerto Banús. Rodeado de naturaleza pero cerca de todo lo que ofrece la Costa del Sol."
    },
    final: {
      text: "Si siente que este es su lugar, conéctese con nosotros en su mensajero preferido. Le enviaremos más fotos, vídeos, planos y todos los detalles.",
      whatsapp: "Contactar por WhatsApp",
      telegram: "Contactar por Telegram"
    }
  },
  ru: {
    hero: {
      title: "Your View, Your Home",
      text: "Светлый дом с панорамными видами на море и горы — пространство для спокойной семейной жизни без спешки. Террасы для завтраков на свежем воздухе, открытые зоны для совместного времени и уединённые комнаты для отдыха. Комфорт и тишина всего в короткой поездке от побережья.",
      parameters: "315 м² общая площадь • 95 м² терраса • 57 м² участок • 3 спальни • 2 ванные"
    },
    gallery: {
      text: "Единое дневное пространство с выходом на террасу — удобно для повседневной жизни, встреч с друзьями и семейного общения."
    },
    video: {
      text: "Терраса как продолжение гостиной: закаты над долиной, свежий воздух и моменты, когда можно по-настоящему расслабиться."
    },
    location: {
      text: "Тихая долина Benahavís с панорамными видами — всего ~15 минут до пляжей, променада, центра шопинга и развлечений в Puerto Banús. Уединённое окружение природы рядом со всей инфраструктурой побережья."
    },
    final: {
      text: "Если вам откликается это ощущение «наш дом», напишите нам в удобный мессенджер. Мы поделимся фото, видео, планировками и всеми деталями.",
      whatsapp: "Связаться через WhatsApp",
      telegram: "Связаться через Telegram"
    }
  },
  uk: {
    hero: {
      title: "Your View, Your Home",
      text: "Світлий дім із панорамними краєвидами на море та гори — простір для спокійного сімейного життя без поспіху. Тераси для сніданків на свіжому повітрі, відкриті зони для часу разом і затишні кімнати для відпочинку. Комфорт і тиша лише за кілька хвилин від узбережжя.",
      parameters: "315 м² забудови • 95 м² тераса • 57 м² ділянка • 3 спальні • 2 ванні кімнати"
    },
    gallery: {
      text: "Єдиний денний простір із виходом на терасу — зручно для повсякденного життя, зустрічей із друзями та сімейного спілкування."
    },
    video: {
      text: "Тераса як продовження вітальні: заходи сонця над долиною, свіже повітря та миті справжнього відпочинку."
    },
    location: {
      text: "Тиха долина Benahavís із панорамними краєвидами — лише ~15 хвилин до пляжів, променаду, центру шопінгу та розваг в Puerto Banús. У затишку природи та поруч з усією інфраструктурою узбережжя."
    },
    final: {
      text: "Якщо це місце відгукується у вас як «наш дім» — напишіть нам у зручний месенджер. Ми надішлемо більше фото, відео, плани та всі деталі.",
      whatsapp: "Зв'язатися через WhatsApp",
      telegram: "Зв'язатися через Telegram"
    }
  }
};

const Index = () => {
  // [LANGUAGE DETECTION] State and detection logic
  const [currentLang, setCurrentLang] = useState('en');
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  // [LANGUAGE DETECTION] Default to English
  useEffect(() => {
    setCurrentLang('en');
  }, []);

  // [GALLERY] Navigation functions
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // [GALLERY] Keyboard navigation and touch support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!galleryOpen) return;
      
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') setGalleryOpen(false);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (!galleryOpen) return;
      setStartX(e.touches[0].clientX);
      setStartY(e.touches[0].clientY);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!galleryOpen) return;
      
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = startX - endX;
      const diffY = startY - endY;
      
      // Check if horizontal swipe is more significant than vertical
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          nextImage(); // Swipe left - next image
        } else {
          prevImage(); // Swipe right - previous image
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [galleryOpen, startX, startY]);

  // [FINAL BUTTONS] Setup messenger links with language detection
  useEffect(() => {
    const setupMessengerLinks = () => {
      const msgTexts = {
        en: "I'm interested in the townhouse in Benahavís — Your View, Your Home. Please send detailed information.",
        es: "Me interesa el adosado en Benahavís — Your View, Your Home. Envíenme información detallada.",
        ru: "Меня заинтересовал таунхаус в Бенахависе — Your View, Your Home. Пришлите детальную информацию.",
        uk: "Мене зацікавив таунхаус у Бенахавісі — Your View, Your Home. Надішліть детальну інформацію."
      };

      const text = msgTexts[currentLang as keyof typeof msgTexts] || msgTexts.en;

      // Update WhatsApp link with prefilled message
      const waBtn = document.getElementById('btn-wa') as HTMLAnchorElement;
      if (waBtn) {
        const waUrl = new URL('https://wa.me/1234567890'); // TODO: Replace with actual number
        waUrl.searchParams.set('text', text);
        waBtn.href = waUrl.toString();
      }

      // Update Telegram link with start parameter
      const tgBtn = document.getElementById('btn-tg') as HTMLAnchorElement;
      if (tgBtn) {
        const tgUrl = new URL('https://t.me/YourBot'); // TODO: Replace with actual bot
        tgUrl.searchParams.set('start', currentLang);
        tgBtn.href = tgUrl.toString();
      }
    };

    setupMessengerLinks();
  }, [currentLang]);

  const currentContent = content[currentLang as keyof typeof content];

  const languageNames = {
    en: 'English',
    es: 'Español', 
    ru: 'Русский',
    uk: 'Українська'
  };

  return (
    <div className="min-h-screen bg-background">
      {/* [LANGUAGE SELECTOR] */}
      <div className="fixed top-4 right-4 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 bg-background/95 backdrop-blur-sm border shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Globe size={16} />
              {languageNames[currentLang as keyof typeof languageNames]}
              <ChevronDown size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-background border shadow-lg">
            {Object.keys(content).map((lang) => (
              <DropdownMenuItem
                key={lang}
                onClick={() => setCurrentLang(lang)}
                className={`cursor-pointer ${currentLang === lang ? 'bg-accent text-accent-foreground' : ''}`}
              >
                {languageNames[lang as keyof typeof languageNames]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* [HERO SECTION] Main hero area */}
      <section className="container mx-auto px-4 pt-16 pb-8">
        <div className="text-center mb-8">
          <h1 className="hero-title">{currentContent.hero.title}</h1>
          <p className="hero-text">{currentContent.hero.text}</p>
          <div className="parameters">{currentContent.hero.parameters}</div>
        </div>

        {/* [HERO] Main image */}
        <div className="max-w-6xl mx-auto">
          <Card className="overflow-hidden shadow-[var(--shadow-strong)] rounded-2xl">
            <img
              src={heroImage}
              alt="Luxury townhouse in Benahavís with panoramic views"
              className="w-full h-[400px] md:h-[600px] object-cover"
            />
          </Card>
        </div>
      </section>

      {/* [GALLERY SECTION] Image gallery with carousel */}
      <section className="container mx-auto px-4 py-8">
        <p className="section-text mb-6">{currentContent.gallery.text}</p>
        
        {/* [GALLERY] First image display */}
        <div className="max-w-4xl mx-auto">
          <img
            src={galleryImages[0]}
            alt="Interior living space"
            className="gallery-image w-full h-[300px] md:h-[500px] object-cover"
            onClick={() => {
              setCurrentImageIndex(0);
              setGalleryOpen(true);
            }}
          />
        </div>
      </section>

      {/* [GALLERY] Fullscreen carousel overlay */}
      {galleryOpen && (
        <div className="fullscreen-overlay">
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            onClick={() => setGalleryOpen(false)}
          >
            <X size={32} />
          </button>
          
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            onClick={prevImage}
          >
            <ChevronLeft size={48} />
          </button>
          
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            onClick={nextImage}
          >
            <ChevronRight size={48} />
          </button>

          <img
            src={galleryImages[currentImageIndex]}
            alt={`Gallery image ${currentImageIndex + 1}`}
            className="max-w-full max-h-full object-contain"
          />
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
            {currentImageIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}

      {/* [VIDEO SECTION] Video block */}
      <section className="container mx-auto px-4 py-8">
        <p className="section-text mb-6">{currentContent.video.text}</p>
        
        {/* [VIDEO] Placeholder thumbnail */}
        <div className="max-w-4xl mx-auto">
          <div 
            className="relative gallery-image bg-secondary h-[300px] md:h-[500px] flex items-center justify-center cursor-pointer group"
            onClick={() => setVideoOpen(true)}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300 rounded-xl"></div>
            <Play size={80} className="text-white drop-shadow-lg z-10" />
            <div className="absolute bottom-4 left-4 text-white font-medium">
              Video Tour: Terrace &amp; Views
            </div>
          </div>
        </div>
      </section>

      {/* [VIDEO] Fullscreen player overlay */}
      {videoOpen && (
        <div className="fullscreen-overlay">
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            onClick={() => setVideoOpen(false)}
          >
            <X size={32} />
          </button>
          
          <div className="max-w-4xl w-full text-center text-white">
            <p className="mb-4">Video player would be implemented here</p>
            <p className="text-sm opacity-75">/video-block/ folder content</p>
          </div>
        </div>
      )}

      {/* [LOCATION SECTION] Google Maps */}
      <section className="container mx-auto px-4 py-8">
        <p className="section-text mb-6">{currentContent.location.text}</p>
        
        {/* [LOCATION] Google Maps iframe */}
        <div className="max-w-6xl mx-auto">
          <Card className="overflow-hidden shadow-[var(--shadow-strong)] rounded-2xl">
            <iframe
              src="https://maps.app.goo.gl/oEDasyBq29438Mum6"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[400px] md:h-[500px]"
            ></iframe>
          </Card>
        </div>
      </section>

      {/* [FINAL SECTION] CTA with messenger buttons */}
      <section className="container mx-auto px-4 py-8 pb-24">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-lg md:text-xl leading-relaxed mb-8">
            {currentContent.final.text}
          </p>
          
          {/* [FINAL BUTTONS] Messenger buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              id="btn-wa"
              href="https://wa.me/1234567890"
              className="btn-whatsapp flex items-center gap-2 min-w-[200px] justify-center"
            >
              <MessageCircle size={20} />
              {currentContent.final.whatsapp}
            </a>
            
            <a
              id="btn-tg"
              href="https://t.me/YourBot"
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
