export type Language = "en" | "pl";

// English is the source of truth; `Dictionary` is inferred from it so the
// Polish translation must provide exactly the same keys.
export const en = {
  nav: {
    portfolio: "Portfolio",
    game: "Hiring? Play the game",
    gameShort: "Play",
    language: "Language",
  },
  hero: {
    titleLine1: "Fast,",
    titleEmphasis: "reliable",
    titleLine3: "web apps.",
    intro:
      "Hi, I'm Bartosz Ciąpała - a senior full-stack developer. I build fast, reliable web platforms with clean architecture and a thoughtful, user-friendly interface.",
    exploreCta: "Commercial Projects",
    privateProjectsCta: "Private Projects",
    contactCta: "Get in Touch",
    github: "GitHub",
    badgeRole: "Senior Full-Stack",
    badgeStack: "React • Vue • Node • AI",
    contact: {
      eyebrow: "Contact",
      title: "Let's build something.",
      subtitle: "Reach out directly by phone, email, or LinkedIn.",
      close: "Close contact popup",
      phone: "Phone",
      email: "Email",
      linkedin: "LinkedIn",
    },
  },
  projects: {
    visit: "Visit website",
    workwear: {
      title: "Workwear Express",
      subtitle: "E-commerce Portal",
      paragraphs: [
        "Workwear Express is a UK-based workwear e-commerce company with a mature, high-impact sales platform. This became my most important long-term project, where I had the biggest influence on both product development and engineering standards.",
        "I worked on the ongoing development of the core React, RxJS and Magento sales system, delivering new business features from client requirements and proactive team initiatives. These improvements directly supported the company's commercial growth and day-to-day sales operations.",
        "I also delivered a dedicated B2B portal from scratch as a separate client request. By integrating AI assistants into the development workflow, the team was able to respond quickly to new business needs while keeping the implementation maintainable.",
        "My role evolved with the project: early on I received detailed code reviews from senior engineers, and over time I became the person reviewing others' work, helping the team keep quality high while the platform, company, and sales operation continued to grow.",
      ],
      panelTitle: "Long-Term Product Ownership",
      panelSubtitle: "The areas where I had the biggest impact.",
    },
    vayner: {
      title: "VaynerMedia",
      subtitle: "E-commerce Framework",
      paragraphs: [
        "VaynerMedia is part of VaynerX, a large US-based group of companies building brands, media, and business outcomes for global partners. I contributed to this ecosystem as a developer responsible for both public-facing agency work and internal e-commerce tooling.",
        "I worked on the VaynerMedia website itself, helping deliver a polished digital presence for one of the group's most recognizable agencies. At the same time, I built an internal Vue.js and Shopify framework designed to rapidly generate e-commerce platforms for agency clients.",
        "The framework standardized repeatable storefront architecture while still allowing each brand to keep its own identity. It significantly optimized the development process and was successfully used for brands including Greyson Clothiers, UTZ Snacks, and Great Garden Plants.",
        "This was one of my most important agency projects because it placed my work inside a global organization with large-scale delivery expectations, where reusable engineering directly supported faster client launches.",
      ],
    },
    videri: {
      title: "Videri",
      subtitle: "Presentation App",
      paragraphs: [
        "Videri needed a dynamic, high-impact presentation tool that went far beyond standard slide decks. Stepping into the role of Tech Lead, I took full autonomous ownership of the project's realization - from direct client architecture sessions to final deployment.",
        "The core technical challenge was building a flawless, synchronized real-time experience. I engineered a robust solution utilizing the HTML5 Canvas API backed by a Node.js real-time event layer.",
        "The application featured a custom real-time image generator, manipulating pixel data on the fly to respond to presenter inputs. This created a deeply immersive, highly responsive presentation environment that captivated strategic stakeholders.",
      ],
    },
    sofomo: {
      title: "Sofomo",
      subtitle: "Company Website",
      paragraphs: [
        "Sofomo is a software development partner that embeds senior engineers into client teams. I'm part of Sofomo as a Senior Software Engineer, and I also co-created the company's own marketing website.",
        "The site is a fast, animated showcase of Sofomo's team, services, and approach - the digital business card that introduces the company to potential clients and partners.",
        "I focused on smooth motion, a clean responsive layout, and performance, so the page feels as polished as the engineering work it represents.",
      ],
    },
  },
  privateProjects: {
    eyebrow: "Open source",
    titleLead: "Private",
    titleEmphasis: "projects.",
    subtitle:
      "Things I build after hours to explore ideas and sharpen my craft - full projects living on my GitHub.",
    featured: "Side project",
    viewCode: "View on GitHub",
    items: [
      {
        title: "Retro Arcade Platform",
        subtitle: "Real-time multiplayer",
        paragraphs: [
          "A full-stack, real-time multiplayer arcade with classic games like Pong and Bomberman, wrapped in a nostalgic 80s CRT aesthetic built entirely with Tailwind CSS v4.",
          "Both games run on a server-authoritative Node.js engine to prevent cheating: continuous vector physics and paddle collisions for Pong, plus grid-based movement, 3-second bomb fuses and dynamic fire propagation for Bomberman.",
          "Players connect over raw WebSockets for instant matchmaking and in-game chat, with secure JWT + bcrypt auth, an ELO ranking updated after every match, and a live global leaderboard backed by PostgreSQL and Prisma.",
        ],
      },
    ],
  },
  workwearImpact: {
    areas: [
      {
        title: "Main Platform",
        description: "Ongoing React, RxJS and Magento development for the core sales system.",
      },
      {
        title: "B2B Portal",
        description: "A dedicated business portal delivered from scratch for a new client need.",
      },
      {
        title: "Code Review",
        description: "At first I received code reviews from senior devs; later I reviewed the team's code and kept quality high.",
      },
      {
        title: "AI Workflow",
        description: "Integrated AI assistants into delivery to move faster without lowering code quality.",
      },
    ],
  },
  framework: {
    eyebrow: "VaynerX Ecosystem",
    subtitle: "Projects for a global agency — from brand websites to reusable e-commerce solutions.",
    workstreams: [
      {
        title: "VaynerMedia Website",
        description: "Public-facing agency presence for a major global organization.",
      },
      {
        title: "Internal Framework",
        description: "Reusable Vue.js and Shopify foundation for faster e-commerce launches.",
      },
    ],
    generatedLabel: "Generated storefronts",
  },
  canvas: {
    socket: "Socket.io Events",
    liveDemo: "Live Demo",
    engineTitle: "HTML5 Canvas Engine",
    engineSubtitle: "Real-time synchronized presentation demo",
    soundOn: "Sound on",
    soundOff: "Sound off",
    soundOnAria: "Turn demo sound on",
    soundOffAria: "Turn demo sound off",
  },
  leadership: {
    titleLine1: "Engineering",
    titleEmphasis: "Philosophy",
    intro:
      "Writing code is only half the job. Elevating the entire team's standards, architecture, and workflow is where true leverage is created.",
    mentorship: {
      title: "Mentorship & Growth",
      desc: "Actively guiding developers to turn raw technical potential into high-impact, autonomous engineering execution.",
    },
    standards: {
      title: "Architectural Standards",
      desc: "Enforcing clean architecture, rigorous state management, and proactive optimization across the entire stack.",
    },
    philosophies: [
      {
        title: "Pragmatic Architecture",
        desc: "Focusing on business value over theoretical perfection. Clean code is a means to an end - scalable, maintainable, and highly performant user experiences.",
      },
      {
        title: "Knowledge Amplification",
        desc: "For me, code review isn't just checking code - it's the best way for the whole team to learn. I like fixing things as we go and sharing what I know with others.",
      },
      {
        title: "AI-Augmented Execution",
        desc: "Pioneering modern workflows by integrating LLMs, Cursor, and Copilot natively into our processes, drastically reducing boilerplate and accelerating delivery.",
      },
    ],
  },
  journey: {
    eyebrow: "Journey",
    titleLead: "Evolution of an",
    titleEmphasis: "Engineer.",
    descriptions: [
      "Leading the development of complex web applications and B2B/B2C e-commerce platforms. Driving technical standards, performing code reviews, and mentoring teams while integrating AI tools into the daily workflow.",
      "Implemented pixel-perfect landing pages and web apps, integrated CMS solutions and APIs, and focused on performance optimization and SEO.",
      "Designed and built custom web solutions from the ground up for individual clients and small businesses, handling both frontend and backend architecture.",
      "Crafted high-end marketing and advertising materials, establishing a strong foundation in visual design, typography, and pixel-perfect layouts.",
    ],
  },
  game: {
    eyebrow: "Hiring?",
    titleLead: "Play",
    titleEmphasis: "Delivery Dash.",
    intro:
      "A retro neon arcade mini-game for recruiters and HR teams. Pick an avatar, enter your city, then move around the grid to grab technologies and dodge the bugs. Build combos, survive, and compete for the best score in your city.",
    badges: ["Canvas arcade engine", "City validation", "Shared leaderboard", "Powered by Neon"],
    stats: {
      games: "games played",
      best: "best score",
      cities: "cities tracked",
    },
    setup: {
      title: "Create your player",
      subtitle:
        "City input accepts variants like Krakow, Kraków or KRAKOW and stores one canonical city.",
      name: "Name",
      namePlaceholder: "Recruiter name",
      company: "Company",
      companyPlaceholder: "Company name",
      city: "City",
      cityPlaceholder: "Kraków",
      cityHintEnter: "Enter a city to start.",
      cityHintSaved: "Will be saved as {city}.",
      avatar: "Avatar",
      fullscreen: "Play in fullscreen",
      start: "Start the arcade run",
    },
    avatars: [
      { label: "Talent Scout", description: "Finds the right signal fast." },
      { label: "System Architect", description: "Builds for scale and clarity." },
      { label: "Delivery Hero", description: "Turns ideas into releases." },
      { label: "Team Mentor", description: "Raises the whole team's level." },
    ],
    playing: {
      hint: "Move with your mouse, touch, or WASD / arrow keys. Grab skills, dodge bugs, keep the combo alive.",
    },
    finished: {
      complete: "Run complete",
      pts: "pts",
      bestCombo: "Best combo streak: {combo}. Saved to the shared leaderboard.",
      playAgain: "Play again",
      changePlayer: "Change player",
    },
    leaderboard: {
      title: "City leaderboard",
      subtitle: "Best scores grouped by normalized city names.",
    },
    topPlayers: {
      title: "Top players",
      empty: "No scores yet. Be the first recruiter on the board.",
    },
    canvasHud: {
      score: "SCORE",
      combo: "combo",
      streak: "streak",
      hintTouch: "Joystick to move · grab skills · gold clears bugs",
      hintDesktop: "Mouse / WASD to move · grab skills · gold clears bugs",
      fullscreenEnter: "Enter fullscreen",
      fullscreenExit: "Exit fullscreen",
    },
    loading: "Loading recruiter game...",
  },
  footer: {
    rights: "Engineered with intention.",
  },
} ;

export type Dictionary = typeof en;

export const pl: Dictionary = {
  nav: {
    portfolio: "Portfolio",
    game: "Rekrutujesz? Zagraj",
    gameShort: "Zagraj",
    language: "Język",
  },
  hero: {
    titleLine1: "Szybkie,",
    titleEmphasis: "niezawodne",
    titleLine3: "aplikacje.",
    intro:
      "Cześć, jestem Bartosz Ciąpała - senior full-stack developer. Buduję szybkie i niezawodne platformy internetowe z czystą architekturą i przemyślanym, przyjaznym interfejsem.",
    exploreCta: "Projekty komercyjne",
    privateProjectsCta: "Projekty prywatne",
    contactCta: "Skontaktuj się",
    github: "GitHub",
    badgeRole: "Senior Full-Stack",
    badgeStack: "React • Vue • Node • AI",
    contact: {
      eyebrow: "Kontakt",
      title: "Zbudujmy coś razem.",
      subtitle: "Napisz lub zadzwoń - telefon, e-mail lub LinkedIn.",
      close: "Zamknij okno kontaktu",
      phone: "Telefon",
      email: "E-mail",
      linkedin: "LinkedIn",
    },
  },
  projects: {
    visit: "Zobacz stronę",
    workwear: {
      title: "Workwear Express",
      subtitle: "Portal e-commerce",
      paragraphs: [
        "Workwear Express to brytyjska firma e-commerce z branży odzieży roboczej, z dojrzałą, wysoce dochodową platformą sprzedażową. To mój najważniejszy, długofalowy projekt, w którym miałem największy wpływ zarówno na rozwój produktu, jak i na standardy inżynierskie.",
        "Zajmowałem się bieżącym rozwojem głównego systemu sprzedażowego (React, RxJS, Magento), wdrażając nowe funkcje biznesowe - zarówno na podstawie wymagań klienta, jak i proaktywnych inicjatyw zespołu. Te usprawnienia bezpośrednio wspierały wzrost sprzedaży i codzienną działalność firmy.",
        "Zrealizowałem też od zera dedykowany portal B2B jako osobne zlecenie klienta. Dzięki wdrożeniu asystentów AI do procesu deweloperskiego zespół mógł błyskawicznie odpowiadać na nowe potrzeby biznesowe, zachowując przy tym łatwość utrzymania kodu.",
        "Moja rola ewoluowała wraz z projektem: na początku otrzymywałem szczegółowe code review od starszych inżynierów, a z czasem to ja recenzowałem pracę innych, pomagając zespołowi utrzymać wysoką jakość, gdy platforma, firma i sprzedaż nieustannie rosły.",
      ],
      panelTitle: "Długofalowa odpowiedzialność za produkt",
      panelSubtitle: "Obszary, w których miałem największy wkład.",
    },
    vayner: {
      title: "VaynerMedia",
      subtitle: "Framework e-commerce",
      paragraphs: [
        "VaynerMedia jest częścią VaynerX - dużej amerykańskiej grupy firm budującej marki, media i realne efekty biznesowe dla globalnych partnerów. Współtworzyłem ten ekosystem jako programista odpowiedzialny zarówno za pracę agencyjną „na zewnątrz”, jak i wewnętrzne narzędzia e-commerce.",
        "Pracowałem nad samą stroną VaynerMedia, współtworząc dopracowaną obecność cyfrową jednej z najbardziej rozpoznawalnych agencji grupy. Równolegle budowałem wewnętrzny framework (Vue.js, Shopify) do szybkiego, masowego generowania platform e-commerce dla klientów agencji.",
        "Framework ustandaryzował powtarzalną architekturę sklepów, pozwalając jednocześnie każdej marce zachować własną tożsamość. Znacząco zoptymalizował proces deweloperski i został z powodzeniem użyty dla marek takich jak Greyson Clothiers, UTZ Snacks i Great Garden Plants.",
        "To jeden z moich najważniejszych projektów agencyjnych, bo osadził moją pracę w globalnej organizacji o dużej skali dostarczania, gdzie wielokrotnie używalna inżynieria bezpośrednio przyspieszała starty klientów.",
      ],
    },
    videri: {
      title: "Videri",
      subtitle: "Aplikacja prezentacyjna",
      paragraphs: [
        "Videri potrzebowało dynamicznego, efektownego narzędzia prezentacyjnego, wykraczającego daleko poza standardowe slajdy. Wchodząc w rolę Tech Leada, przejąłem pełną, samodzielną odpowiedzialność za realizację projektu - od sesji architektonicznych z klientem aż po wdrożenie.",
        "Głównym wyzwaniem technicznym było zbudowanie bezbłędnego, zsynchronizowanego doświadczenia w czasie rzeczywistym. Stworzyłem solidne rozwiązanie oparte na HTML5 Canvas API i warstwie zdarzeń czasu rzeczywistego w Node.js.",
        "Aplikacja zawierała autorski generator obrazów w czasie rzeczywistym, manipulujący danymi pikseli „w locie” w odpowiedzi na działania prezentera. Stworzyło to głęboko wciągające, bardzo responsywne środowisko prezentacji, które zachwyciło kluczowych interesariuszy.",
      ],
    },
    sofomo: {
      title: "Sofomo",
      subtitle: "Strona firmowa",
      paragraphs: [
        "Sofomo to firma dostarczająca doświadczonych programistów do zespołów klientów. Jestem częścią Sofomo jako Senior Software Engineer i dodatkowo współtworzyłem firmową stronę marketingową.",
        "Strona to szybka, animowana wizytówka zespołu, usług i podejścia Sofomo - cyfrowa wizytówka, która przedstawia firmę potencjalnym klientom i partnerom.",
        "Postawiłem na płynne animacje, czysty, responsywny layout i wydajność, żeby strona była tak dopracowana jak inżynieria, którą reprezentuje.",
      ],
    },
  },
  privateProjects: {
    eyebrow: "Open source",
    titleLead: "Prywatne",
    titleEmphasis: "projekty.",
    subtitle:
      "Rzeczy, które buduję po godzinach, żeby eksperymentować z pomysłami i szlifować warsztat - pełne projekty dostępne na moim GitHubie.",
    featured: "Projekt prywatny",
    viewCode: "Zobacz na GitHubie",
    items: [
      {
        title: "Retro Arcade Platform",
        subtitle: "Gra wieloosobowa w czasie rzeczywistym",
        paragraphs: [
          "Pełnoprawna, wieloosobowa platforma arcade działająca w czasie rzeczywistym, z klasykami takimi jak Pong i Bomberman, ubrana w nostalgiczną estetykę CRT z lat 80. i zbudowana w całości na Tailwind CSS v4.",
          "Obie gry działają na autorytatywnym serwerze w Node.js, co uniemożliwia oszukiwanie: ciągła fizyka wektorowa i kolizje paletek w Pongu oraz ruch po siatce, 3-sekundowe lonty bomb i dynamiczna propagacja ognia w Bombermanie.",
          "Gracze łączą się przez surowe WebSockety - błyskawiczny matchmaking i czat w grze - z bezpiecznym logowaniem JWT + bcrypt, rankingiem ELO aktualizowanym po każdym meczu i globalnym rankingiem opartym na PostgreSQL i Prisma.",
        ],
      },
    ],
  },
  workwearImpact: {
    areas: [
      {
        title: "Główna platforma",
        description: "Bieżący rozwój głównego systemu sprzedażowego w React, RxJS i Magento.",
      },
      {
        title: "Portal B2B",
        description: "Dedykowany portal biznesowy dostarczony od zera pod nową potrzebę klienta.",
      },
      {
        title: "Code review",
        description: "Najpierw dostawałem code review od starszych programistów, z czasem sam recenzowałem kod zespołu i pilnowałem jakości.",
      },
      {
        title: "Praca z AI",
        description: "Wdrożenie asystentów AI do procesu, by pracować szybciej bez utraty jakości kodu.",
      },
    ],
  },
  framework: {
    eyebrow: "Ekosystem VaynerX",
    subtitle: "Projekty dla globalnej agencji - od stron marek po rozwiązania e-commerce wielokrotnego użytku.",
    workstreams: [
      {
        title: "Strona VaynerMedia",
        description: "Publiczna obecność cyfrowa dużej, globalnej organizacji.",
      },
      {
        title: "Wewnętrzny framework",
        description: "Wielokrotnie używalna baza Vue.js i Shopify dla szybszych startów e-commerce.",
      },
    ],
    generatedLabel: "Wygenerowane sklepy",
  },
  canvas: {
    socket: "Socket.io",
    liveDemo: "Demo na żywo",
    engineTitle: "Silnik HTML5 Canvas",
    engineSubtitle: "Zsynchronizowane demo prezentacji w czasie rzeczywistym",
    soundOn: "Włącz dźwięk",
    soundOff: "Wyłącz dźwięk",
    soundOnAria: "Włącz dźwięk demo",
    soundOffAria: "Wyłącz dźwięk demo",
  },
  leadership: {
    titleLine1: "Filozofia",
    titleEmphasis: "inżynierii",
    intro:
      "Pisanie kodu to tylko połowa pracy. Prawdziwą dźwignię daje podnoszenie standardów, architektury i procesów całego zespołu.",
    mentorship: {
      title: "Mentoring i rozwój",
      desc: "Aktywne prowadzenie programistów, by zamienić surowy potencjał techniczny w samodzielną, wpływową inżynierię.",
    },
    standards: {
      title: "Standardy architektoniczne",
      desc: "Dbanie o czystą architekturę, rygorystyczne zarządzanie stanem i proaktywną optymalizację w całym stacku.",
    },
    philosophies: [
      {
        title: "Pragmatyczna architektura",
        desc: "Skupienie na wartości biznesowej ponad teoretyczną perfekcją. Czysty kod to środek do celu - skalowalne, łatwe w utrzymaniu i wydajne doświadczenia użytkownika.",
      },
      {
        title: "Wzmacnianie wiedzy",
        desc: "Code review traktuję nie tylko jako sprawdzanie kodu, ale jako najlepszy sposób, żeby cały zespół się czegoś nauczył. Lubię poprawiać rzeczy na bieżąco i dzielić się tym, co sam wiem.",
      },
      {
        title: "Realizacja wspierana przez AI",
        desc: "Wprowadzanie nowoczesnych procesów przez natywną integrację LLM-ów, Cursora i Copilota, co drastycznie ogranicza boilerplate i przyspiesza dostarczanie.",
      },
    ],
  },
  journey: {
    eyebrow: "Ścieżka",
    titleLead: "Moja droga",
    titleEmphasis: "zawodowa.",
    descriptions: [
      "Prowadzenie rozwoju złożonych aplikacji webowych oraz platform e-commerce B2B/B2C. Wyznaczanie standardów technicznych, prowadzenie code review i mentoring zespołów przy jednoczesnej integracji narzędzi AI w codziennej pracy.",
      "Wdrażanie dopracowanych co do piksela landing page'y i aplikacji webowych, integracja rozwiązań CMS i API oraz nacisk na optymalizację wydajności i SEO.",
      "Projektowanie i budowanie autorskich rozwiązań webowych od podstaw dla klientów indywidualnych i małych firm, obejmujące architekturę frontendu i backendu.",
      "Tworzenie wysokiej klasy materiałów marketingowych i reklamowych, budujące solidne podstawy w projektowaniu wizualnym, typografii i dopracowanych układach.",
    ],
  },
  game: {
    eyebrow: "Rekrutujesz?",
    titleLead: "Zagraj w",
    titleEmphasis: "Delivery Dash.",
    intro:
      "Retro-neonowa mini-gra arcade dla rekruterów i zespołów HR. Wybierz avatar, wpisz swoje miasto, a potem poruszaj się po planszy, zbierając technologie i unikając bugów. Buduj combo, przetrwaj i walcz o najlepszy wynik dla swojego miasta.",
    badges: ["Silnik arcade na canvasie", "Walidacja miast", "Wspólny ranking", "Napędzane przez Neon"],
    stats: {
      games: "rozegrane gry",
      best: "najlepszy wynik",
      cities: "śledzone miasta",
    },
    setup: {
      title: "Stwórz swojego gracza",
      subtitle:
        "Pole miasta akceptuje warianty typu Krakow, Kraków czy KRAKOW i zapisuje jedną, kanoniczną nazwę.",
      name: "Imię",
      namePlaceholder: "Imię rekrutera",
      company: "Firma",
      companyPlaceholder: "Nazwa firmy",
      city: "Miasto",
      cityPlaceholder: "Kraków",
      cityHintEnter: "Wpisz miasto, aby zacząć.",
      cityHintSaved: "Zostanie zapisane jako {city}.",
      avatar: "Avatar",
      fullscreen: "Graj na pełnym ekranie",
      start: "Rozpocznij grę",
    },
    avatars: [
      { label: "Łowca talentów", description: "Szybko wyłapuje właściwy sygnał." },
      { label: "Architekt systemów", description: "Buduje z myślą o skali i klarowności." },
      { label: "Bohater wdrożeń", description: "Zamienia pomysły w wydania." },
      { label: "Mentor zespołu", description: "Podnosi poziom całego zespołu." },
    ],
    playing: {
      hint: "Steruj myszą, dotykiem lub WASD / strzałkami. Zbieraj technologie, unikaj bugów, utrzymuj combo.",
    },
    finished: {
      complete: "Koniec rundy",
      pts: "pkt",
      bestCombo: "Najlepsza seria combo: {combo}. Zapisano we wspólnym rankingu.",
      playAgain: "Zagraj ponownie",
      changePlayer: "Zmień gracza",
    },
    leaderboard: {
      title: "Ranking miast",
      subtitle: "Najlepsze wyniki pogrupowane wg znormalizowanych nazw miast.",
    },
    topPlayers: {
      title: "Najlepsi gracze",
      empty: "Brak wyników. Bądź pierwszym rekruterem w rankingu.",
    },
    canvasHud: {
      score: "WYNIK",
      combo: "combo",
      streak: "seria",
      hintTouch: "Joystick steruje · zbieraj technologie · złoto czyści bugi",
      hintDesktop: "Mysz / WASD steruje · zbieraj technologie · złoto czyści bugi",
      fullscreenEnter: "Pełny ekran",
      fullscreenExit: "Wyjdź z pełnego ekranu",
    },
    loading: "Ładowanie gry dla rekruterów...",
  },
  footer: {
    rights: "Zaprojektowane z intencją.",
  },
};

export const dictionaries: Record<Language, Dictionary> = { en, pl };
