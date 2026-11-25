window.PORTFOLIO_PROJECTS = [
  {
    id: "flylow",
    index: "01",
    name: "FlyLow",
    group: "mobile-web",
    kind: "Web · Node + Python",
    liveUrl: "https://flylow.onrender.com/",
    tags: ["Node.js", "Express", "fast-flights", "Protobuf"],
    modules: ["server.js", "flightsService.js", "scripts/live_flights.py", "public/js/app.js"],
    en: {
      subtitle: "Flight Deal Finder & Sao Paulo International Radar",
      summary: "Live at flylow.onrender.com. Combines a Node.js/Express API with a Python fast-flights Google Flights scraper (30-min cache) to track domestic deals from Belo Horizonte (CNF/PLU) and international fares departing Sao Paulo under a configurable price cap.",
      problem: "Airline portals bury multi-passenger tax math and force repetitive origin searches when hunting low-cost South American fares.",
      pipeline: "Origin + SP Price Cap -> Python fast-flights / route cache -> Adult & Child tax math -> Deep links (Google Flights, Skyscanner, Kayak)"
    },
    pt: {
      subtitle: "Buscador de Passagens Baratas e Radar SP Exterior",
      summary: "Disponível em flylow.onrender.com. Combina uma API Node.js/Express com scraper Python fast-flights (cache de 30 min) para rastrear tarifas saindo de Belo Horizonte (CNF/PLU) e voos internacionais partindo de São Paulo abaixo de um teto configurável.",
      problem: "Portais aéreos escondem taxas por passageiro e exigem buscas manuais repetitivas para encontrar tarifas promocionais na América do Sul.",
      pipeline: "Origem + Teto SP -> Python fast-flights / cache -> Cálculo adulto e criança -> Links diretos (Google Flights, Skyscanner, Kayak)"
    }
  },
  {
    id: "radar-monitor",
    index: "02",
    name: "Radar Monitor",
    group: "mobile-web",
    kind: "Mobile · Flutter + OSM",
    tags: ["Flutter", "Dart", "Geolocator", "TTS", "OSM Overpass"],
    modules: ["lib/services/background_service.dart", "lib/services/intersection_service.dart", "lib/widgets/hud_view.dart", "geocode_radars.py"],
    en: {
      subtitle: "Speed-Camera Proximity & Mirrored Windshield HUD",
      summary: "Flutter Android background GPS monitor backed by 250 Belo Horizonte speed cameras geocoded via OpenStreetMap Nominatim/Overpass. Computes Haversine distance and bearing alignment, fires PT-BR voice alerts, and flips horizontally for windshield reflection.",
      problem: "Generic navigation apps clutter the screen and fail to filter opposite-lane speed cameras or project cleanly onto a car windshield at night.",
      pipeline: "OSM geocoder -> 250 BH coordinates -> Haversine + bearing filter -> TTS voice alert + mirrored HUD (rotationY pi)"
    },
    pt: {
      subtitle: "Alerta de Radares e HUD Espelhado para Para-brisa",
      summary: "Monitor GPS em segundo plano em Flutter com 250 radares de Belo Horizonte geocodificados via OpenStreetMap Nominatim/Overpass. Calcula distância Haversine e direção, emite alertas de voz em PT-BR e espelha a tela para projeção no para-brisa.",
      problem: "Apps de mapa poluem a tela e não filtram radares da pista oposta nem oferecem modo espelhado limpo para direção noturna.",
      pipeline: "Geocoder OSM -> 250 pontos em BH -> Filtro Haversine + ângulo -> Voz TTS + HUD espelhado (rotationY pi)"
    }
  },
  {
    id: "lebet",
    index: "03",
    name: "LeBet",
    group: "mobile-web",
    kind: "Mobile + AI · Flutter + Python",
    tags: ["Python", "Flutter", "Gemini 3.8 Flash", "The Odds API", "SQLite"],
    modules: ["calculator.py", "scraper.py", "analyzer.py", "lebet_app/lib/screens/"],
    en: {
      subtitle: "Quantitative +EV Odds Detector & 1/4 Kelly Companion",
      summary: "Strips bookmaker margin from global reference lines to identify positive Expected Value (+EV) discrepancies on retail sportsbooks, sizes stakes via 1/4 Kelly, evaluates match context with Gemini 3.8 Flash, and delivers alerts to Telegram and a Flutter Android app.",
      problem: "Manual line shopping across sportsbooks misses short-lived pricing inefficiencies and lacks disciplined bankroll sizing.",
      pipeline: "The Odds API -> Margin removal -> +EV & 1/4 Kelly math -> Gemini 3.8 Flash match context -> SQLite + Telegram + Flutter app"
    },
    pt: {
      subtitle: "Detector de Apostas de Valor (+EV) e App em Flutter",
      summary: "Compara as cotações de casas de referência global com casas tradicionais para encontrar apostas com vantagem matemática (+EV), calcula a fração ideal da banca pelo critério 1/4 Kelly, avalia o contexto da partida com o Gemini 3.8 Flash e envia alertas no Telegram e em App desenvolvido em Flutter.",
      problem: "Comparar cotações manualmente entre várias casas faz perder boas oportunidades e dificulta uma gestão de banca disciplinada.",
      pipeline: "The Odds API -> Remoção da margem -> Cálculo +EV e 1/4 Kelly -> Contexto da partida com Gemini 3.8 Flash -> SQLite + Telegram + App Flutter"
    }
  },
  {
    id: "rotafacil",
    index: "04",
    name: "Rota Fácil",
    group: "mobile-web",
    kind: "Mobile · Android Kotlin",
    tags: ["Kotlin", "Jetpack Compose", "AccessibilityService", "Waze & Maps"],
    modules: ["UberAccessibilityService.kt", "FloatingWidgetService.kt", "NavigationHelper.kt", "RideRepository.kt"],
    en: {
      subtitle: "Floating Ride Address Capture & 1-Tap Waze / Google Maps Routing",
      summary: "Native Android Jetpack Compose app paired with an AccessibilityService and snap-to-edge floating overlay for Uber Driver and 99. Reads pickup and drop-off addresses from the screen, normalizes street text, and launches either single-stop Waze navigation or a multi-stop Google Maps waypoint route in one tap.",
      problem: "Drivers waste seconds copying and typing pickup and destination addresses into external GPS apps between back-to-back trips.",
      pipeline: "Accessibility screen read -> Address normalization -> StateFlow floating card -> Waze URI / Google Maps multi-stop Intent"
    },
    pt: {
      subtitle: "Captura Flutuante de Endereços e Rotas 1-Toque no Waze / Maps",
      summary: "App nativo Android em Jetpack Compose com AccessibilityService e bolha flutuante acoplável para Uber Driver e 99. Lê origem e destino direto da tela, normaliza os endereços e abre com um toque o Waze ou uma rota com parada intermediária no Google Maps.",
      problem: "Motoristas perdem tempo copiando e digitando endereços de embarque e destino em navegadores externos entre corridas.",
      pipeline: "Leitura via Acessibilidade -> Normalização de texto -> Card flutuante StateFlow -> URI Waze / Intent Google Maps com parada"
    }
  },
  {
    id: "greeter",
    index: "05",
    name: "Greeter",
    group: "mobile-web",
    kind: "Desktop · Python Hotkeys",
    tags: ["Python", "keyboard", "pyperclip", "pystray", "OpenAI"],
    modules: ["greeter.pyw", "sentencereplacer.py"],
    en: {
      subtitle: "Global Clipboard Hotkeys for Bilingual Replies & Grammar Polish",
      summary: "Headless Windows systray assistant binding two system-wide hotkeys: Ctrl+Alt+A turns a copied user ticket message into a structured 3-part empathetic PT/EN greeting, while Ctrl+Alt+S rewrites any copied draft for grammar and clarity directly in the clipboard.",
      problem: "Switching browser tabs to draft polite bilingual replies or fix rushed grammar breaks focus during high-volume support shifts.",
      pipeline: "Global hotkey -> Clipboard read -> Language & intent prompt -> Clipboard write + desktop toast"
    },
    pt: {
      subtitle: "Atalhos Globais de Área de Transferência para Respostas e Revisão",
      summary: "Utilitário na bandeja do Windows com dois atalhos globais: Ctrl+Alt+A transforma a mensagem copiada de um ticket em saudação empática em 3 parágrafos (PT/EN), e Ctrl+Alt+S revisa gramática e clareza diretamente no clipboard.",
      problem: "Alternar abas para redigir respostas bilíngues ou revisar frases rápidas quebra o fluxo em turnos de suporte.",
      pipeline: "Atalho global -> Leitura do clipboard -> Prompt de idioma e tom -> Escrita no clipboard + toast"
    }
  },
  {
    id: "hittheclock",
    index: "06",
    name: "HitTheClock",
    group: "mobile-web",
    kind: "Desktop · Python + Playwright",
    tags: ["Python", "Playwright", "Selenium", "Tkinter", "pystray"],
    modules: ["hittheclock.pyw", "hittheclock.py", "teste_login.py"],
    en: {
      subtitle: "Weekday Time-Clock Automation & Shift Exit Calculator",
      summary: "Windows systray daemon that skips weekends, confirms via Tkinter modal before automating time-clock check-in via Playwright, appends timestamps to a local audit log, and computes exact end-of-shift exit time from lunch break duration.",
      problem: "Forgetting post-lunch punches or miscalculating end-of-day exit times on flexible 8-hour schedules creates HR adjustments.",
      pipeline: "Weekday guard -> Tkinter confirmation -> Playwright form fill -> Local timestamp log + exit time math"
    },
    pt: {
      subtitle: "Automação de Ponto em Dias Úteis e Cálculo de Saída",
      summary: "Daemon na bandeja do Windows que ignora fins de semana, solicita confirmação em modal Tkinter antes de registrar o ponto via Playwright, grava histórico local e calcula o horário exato de saída após o intervalo de almoço.",
      problem: "Esquecer o retorno do almoço ou calcular errado o fim da jornada flexível de 8h exige ajustes manuais.",
      pipeline: "Trava dia útil -> Confirmação Tkinter -> Automação Playwright -> Log local + cálculo de saída"
    }
  },
  {
    id: "jiramonitor",
    index: "07",
    name: "JiraMonitor",
    group: "support-ops",
    kind: "Web · Node + SSE + Gemini",
    tags: ["Node.js", "Express 5", "SSE", "@google/genai", "PowerShell Tray"],
    modules: ["server.js", "services/jiraService.js", "services/geminiService.js", "public/app.js"],
    en: {
      subtitle: "Real-Time Spreadsheet Ticket Monitor & Timeline Explorer",
      summary: "Spreadsheet-inspired local web dashboard streaming Jira updates over Server-Sent Events every 60 seconds. Separates Customer vs Engineering queues (ENG, INC, OPS, REQ, BUG), tracks linked blockers, stores private notes, exports CSV, and generates Gemini summaries.",
      problem: "Standard Jira boards hide chronological comment context and blur the handoff status between support analysts and engineering squads.",
      pipeline: "60s Jira REST poll -> Diff & SSE stream -> Customer / Engineering split -> Timeline drawer + Gemini summary"
    },
    pt: {
      subtitle: "Monitor de Tickets em Tempo Real com SSE e Resumos Gemini",
      summary: "Painel web estilo planilha conectado via Server-Sent Events com polling a cada 60 segundos. Separa filas de Cliente e Engenharia (ENG, INC, OPS, REQ, BUG), exibe linha do tempo cronológica, tickets vinculados, notas locais e resumos via Gemini.",
      problem: "Quadros padrão do Jira escondem o histórico cronológico de comentários e dificultam acompanhar dependências com a engenharia.",
      pipeline: "Polling Jira 60s -> Diff + stream SSE -> Aba Cliente / Engenharia -> Drawer de histórico + resumo Gemini"
    }
  },
  {
    id: "blocklymaster",
    index: "08",
    name: "BlocklyMaster",
    group: "support-ops",
    kind: "DevTool · JS + Claude Skill",
    tags: ["Vanilla JS", "Node.js CLI", "XML/Base64", "Claude Skill"],
    modules: ["blockly-inspector.html", "scripts/blockly.js", "build_customers_registry.js", "SKILL.md"],
    en: {
      subtitle: "Low-Code Blockly Payload Decoder, Linter & QAS/PRD Diff",
      summary: "Decodes compressed Base64 Blockly XML rules from low-code mobile configurations, resolves internal UUIDs to readable screen/field names, diffs QAS vs PRD payloads structurally, and flags silent bugs such as invalid dropdown operators or undeclared variables.",
      problem: "Compressed XML payloads are opaque to read by eye, causing silent runtime regressions between QAS and PRD environments.",
      pipeline: "Base64/XML inflate -> UUID symbol resolution -> Rule linter + QAS/PRD structural diff -> Validated patch output"
    },
    pt: {
      subtitle: "Decodificador, Linter e Diff QAS/PRD para Payloads Blockly",
      summary: "Decodifica regras Blockly em XML/Base64 comprimido, resolve UUIDs internos para nomes legíveis de telas e campos, compara payloads QAS vs PRD estruturalmente e aponta erros silenciosos como operadores inválidos ou variáveis não declaradas.",
      problem: "Payloads XML comprimidos são ilegíveis manualmente e geram regressões silenciosas entre QAS e PRD.",
      pipeline: "Inflate Base64/XML -> Resolução de UUIDs -> Linter de regras + diff QAS/PRD -> Patch validado"
    }
  },
  {
    id: "chatjira",
    index: "09",
    name: "ChatJira (Query Builder)",
    group: "support-ops",
    kind: "Web · Flask + Chart.js",
    tags: ["Python", "Flask", "Jira REST v2", "Chart.js", "Systray"],
    modules: ["jql_master.py", "jql_master.pyw", "index.html"],
    en: {
      subtitle: "Interactive JQL Query Builder & Analyst Resolution Analytics",
      summary: "Local Flask dashboard and Windows systray launcher that builds multi-filter JQL queries across customer vs internal queues, opened vs resolved dates, and analyst rosters, paginating Jira search results into Chart.js comparisons and rankings.",
      problem: "Writing complex JQL queries repeatedly for weekly SLA and analyst throughput reviews slows down support reporting.",
      pipeline: "Filter state -> Dynamic JQL string -> Paginated REST v2 search -> Project/Analyst aggregation + Chart.js"
    },
    pt: {
      subtitle: "Construtor Visual de JQL e Analytics de Resolução",
      summary: "Dashboard local em Flask com launcher na bandeja do Windows para montar consultas JQL por fila (cliente vs interna), datas de abertura/resolução e analistas, paginando buscas do Jira em gráficos Chart.js e rankings.",
      problem: "Escrever consultas JQL complexas manualmente para revisões semanais de SLA atrasa relatórios operacionais.",
      pipeline: "Filtros visuais -> String JQL dinâmica -> Paginação REST v2 -> Agregação por projeto/analista + Chart.js"
    }
  },
  {
    id: "csat",
    index: "10",
    name: "CSAT",
    group: "support-ops",
    kind: "Backend · Flask + Postgres",
    tags: ["Python", "Flask", "PostgreSQL", "ReportLab", "PT/EN/ES"],
    modules: ["csat_server.py", "csat_server_token.py", "templates/stats.html"],
    en: {
      subtitle: "1-Click Multi-Language Ticket Satisfaction Server",
      summary: "Flask microservice wired to ticket-closure emails to capture 1-click thumbs-up/down ratings in PT, EN, and ES. Guards against email-client link prefetching, prevents duplicate ticket votes in PostgreSQL, and serves live /stats plus ReportLab PDF exports.",
      problem: "Long external survey forms get ignored by end users, while naive GET links get triggered prematurely by corporate email scanners.",
      pipeline: "Signed link -> Prefetch guard + duplicate check -> PostgreSQL insert -> Live /stats + CSV/PDF export"
    },
    pt: {
      subtitle: "Coletor CSAT 1-Clique Multilíngue com PostgreSQL",
      summary: "Microsserviço Flask integrado ao fechamento de tickets para coletar avaliações 1-clique em PT, EN e ES. Protege contra prefetch de antivírus de e-mail, bloqueia votos duplicados no PostgreSQL e entrega painel /stats com exportação PDF ReportLab.",
      problem: "Formulários longos têm baixa adesão e links simples sofrem falsos cliques por scanners automáticos de e-mail.",
      pipeline: "Link assinado -> Proteção prefetch + trava duplicidade -> Insert PostgreSQL -> /stats ao vivo + CSV/PDF"
    }
  },
  {
    id: "bot-kb-gpt",
    index: "11",
    name: "BOT KB + GPT",
    group: "support-ops",
    kind: "Automation · Python + RAG",
    tags: ["Python", "OpenAI Embeddings", "Confluence CQL", "Jira REST", "NumPy"],
    modules: ["Bot_SupLive.py", "Conf+gpt_bot_me.py", "Conf_bot_all.py", "Bot_closure_systray.pyw"],
    en: {
      subtitle: "Semantic Ticket Triage & Confluence Knowledge Matcher",
      summary: "Automated support triage daemon (and companion systray utilities) that detects ticket language, embeds summaries with OpenAI to rank historical resolved tickets via cosine similarity, queries Confluence via layered CQL, and posts internal triage notes.",
      problem: "Analysts spend first-response minutes hunting across old resolved tickets and Confluence spaces for recurring error patterns.",
      pipeline: "New ticket poll -> langdetect -> Embedding cosine similarity + Confluence CQL -> Internal triage comment"
    },
    pt: {
      subtitle: "Triagem Semântica de Tickets e Busca em Base Confluence",
      summary: "Daemon automatizado de triagem (com utilitários de bandeja complementares) que detecta o idioma do chamado, gera embeddings para ranquear tickets históricos por similaridade de cosseno, consulta o Confluence via CQL e publica notas internas.",
      problem: "Analistas gastam minutos valiosos procurando incidentes resolvidos parecidos e artigos no Confluence em cada novo chamado.",
      pipeline: "Polling de novos tickets -> langdetect -> Similaridade cosseno + CQL Confluence -> Comentário interno"
    }
  },
  {
    id: "alertbot",
    index: "12",
    name: "AlertBot",
    group: "support-ops",
    kind: "Daemon · Python + New Relic",
    tags: ["Python", "New Relic", "Jira REST v3", "pystray", "plyer"],
    modules: ["alert_monitor.py", "alert_monitor.pyw"],
    en: {
      subtitle: "New Relic Incident Monitor, Context Enricher & Systray Alerter",
      summary: "Integrated with New Relic alert webhooks routed into Jira. Polls newly assigned alert tickets every 10 seconds, resolves tenant UUIDs to readable customer names, extracts Runbook and New Relic dashboard URLs, links the 3 latest sibling alerts, and triggers desktop toast notifications.",
      problem: "New Relic alert tickets arrive with raw tenant UUIDs and buried dashboard/runbook URLs during time-sensitive incidents.",
      pipeline: "New Relic -> 10s Jira poll -> UUID lookup + dashboard URL extract -> Sibling alert links + OS toast"
    },
    pt: {
      subtitle: "Monitor de Alertas New Relic na Bandeja com Contexto Automático",
      summary: "Integrado aos alertas do New Relic roteados para o Jira. Consulta novos alertas a cada 10 segundos, traduz UUIDs de tenant para nomes legíveis, extrai links de Runbook e dashboards do New Relic, vincula os 3 alertas recentes relacionados e dispara notificações toast no Windows.",
      problem: "Tickets gerados pelo New Relic chegam com UUIDs crus e links de diagnóstico enterrados no payload.",
      pipeline: "New Relic -> Polling Jira 10s -> Mapa UUID + URLs do dashboard -> Vínculo de alertas + Toast"
    }
  },
  {
    id: "testplan",
    index: "13",
    name: "TestPlan",
    group: "support-ops",
    kind: "Automation · Python + Excel/Docx",
    tags: ["Python", "openpyxl", "python-docx", "EN/PT", "UAT KPIs"],
    modules: ["build_excel_test_plans.py", "build_test_plans.py", "test_cases_data.py"],
    en: {
      subtitle: "Bilingual UAT Test Plan & Live KPI Workbook Generator",
      summary: "Programmatically transforms structured test-case dictionaries into styled bilingual (EN & PT) Word test guides and Excel UAT tracking workbooks equipped with a live 2-line Excel formula KPI header, dropdown status validation, and conditional formatting.",
      problem: "Maintaining consistent bilingual UAT test scripts and live pass/fail KPI rollups manually across releases is error-prone.",
      pipeline: "Structured test_cases_data.py -> python-docx guide + openpyxl workbook -> Formula KPI header + status dropdowns"
    },
    pt: {
      subtitle: "Gerador Bilíngue de Planos UAT em Word e Planilhas KPI",
      summary: "Converte dicionários estruturados de casos de teste em guias Word bilíngues (EN/PT) e planilhas Excel de homologação com cabeçalho KPI em fórmulas dinâmicas, validação de status por dropdown e formatação condicional.",
      problem: "Manter roteiros de UAT bilíngues e indicadores de aprovação atualizados manualmente entre releases gera inconsistências.",
      pipeline: "Dicionário test_cases_data.py -> Guia python-docx + planilha openpyxl -> Cabeçalho KPI + dropdowns de status"
    }
  }
];

window.PORTFOLIO_SAMPLES = {
  flylowRoutes: [
    { id: "cnf-sdu-la", origin: "CNF", dest: "SDU", destCity: "Rio de Janeiro", airline: "LATAM", code: "LA-3142", basePrice: 320, rtFactor: 1.85, taxAdult: 38.5, taxChild: 38.5, childDiscount: 0.2, durationMin: 65, dep: "07:15", arr: "08:20", aircraft: "Airbus A320", intl: false },
    { id: "cnf-cgh-la", origin: "CNF", dest: "CGH", destCity: "Sao Paulo", airline: "LATAM", code: "LA-3024", basePrice: 340, rtFactor: 1.8, taxAdult: 39, taxChild: 39, childDiscount: 0.2, durationMin: 75, dep: "06:40", arr: "07:55", aircraft: "Airbus A320", intl: false },
    { id: "cnf-bsb-g3", origin: "CNF", dest: "BSB", destCity: "Brasilia", airline: "GOL", code: "G3-1780", basePrice: 310, rtFactor: 1.85, taxAdult: 38, taxChild: 38, childDiscount: 0.2, durationMin: 75, dep: "13:00", arr: "14:15", aircraft: "Boeing 737-800", intl: false },
    { id: "cnf-vix-ad", origin: "CNF", dest: "VIX", destCity: "Vitoria", airline: "Azul", code: "AD-2611", basePrice: 210, rtFactor: 1.88, taxAdult: 35, taxChild: 35, childDiscount: 0.2, durationMin: 60, dep: "11:20", arr: "12:20", aircraft: "ATR 72-600", intl: false },
    { id: "gru-eze-fo", origin: "GRU", dest: "EZE", destCity: "Buenos Aires", airline: "Flybondi", code: "FO-5801", basePrice: 460, rtFactor: 1.85, taxAdult: 180, taxChild: 180, childDiscount: 0.2, durationMin: 180, dep: "11:15", arr: "14:15", aircraft: "Boeing 737-800", intl: true },
    { id: "gru-aep-ja", origin: "GRU", dest: "AEP", destCity: "Buenos Aires (Aeroparque)", airline: "JetSMART", code: "JA-3951", basePrice: 460, rtFactor: 1.85, taxAdult: 180, taxChild: 180, childDiscount: 0.2, durationMin: 180, dep: "08:30", arr: "11:30", aircraft: "Airbus A320neo", intl: true },
    { id: "gru-scl-h2", origin: "GRU", dest: "SCL", destCity: "Santiago", airline: "Sky Airline", code: "H2-621", basePrice: 480, rtFactor: 1.85, taxAdult: 190, taxChild: 190, childDiscount: 0.2, durationMin: 240, dep: "16:40", arr: "20:40", aircraft: "Airbus A320neo", intl: true },
    { id: "gru-scl-la", origin: "GRU", dest: "SCL", destCity: "Santiago", airline: "LATAM", code: "LA-751", basePrice: 480, rtFactor: 1.85, taxAdult: 195, taxChild: 195, childDiscount: 0.2, durationMin: 240, dep: "07:15", arr: "11:15", aircraft: "Boeing 787 Dreamliner", intl: true },
    { id: "gru-mvd-g3", origin: "GRU", dest: "MVD", destCity: "Montevideo", airline: "GOL", code: "G3-7640", basePrice: 690, rtFactor: 1.85, taxAdult: 175, taxChild: 175, childDiscount: 0.2, durationMin: 165, dep: "09:45", arr: "12:30", aircraft: "Boeing 737 MAX 8", intl: true },
    { id: "gru-lim-la", origin: "GRU", dest: "LIM", destCity: "Lima", airline: "LATAM", code: "LA-2455", basePrice: 1120, rtFactor: 1.85, taxAdult: 210, taxChild: 210, childDiscount: 0.2, durationMin: 310, dep: "18:10", arr: "21:20", aircraft: "Airbus A320neo", intl: true }
  ],
  radarsBH: [
    { street: "Av. Amazonas, Nº 5385", dir: "Bairro/Centro", limit: 60, lat: -19.931873, lon: -43.987732 },
    { street: "Av. Antônio Abrahão Caram, Nº 242", dir: "Liberdade/São Luiz", limit: 60, lat: -19.859974, lon: -43.962624 },
    { street: "Av. Barão Homem de Melo, Nº 3.191", dir: "Estoril/Nova Suíssa", limit: 60, lat: -19.93458, lon: -43.97183 },
    { street: "Av. do Contorno, nº 4023", dir: "Savassi/Santa Efigênia", limit: 60, lat: -19.92922, lon: -43.921646 }
  ],
  lebetMatches: [
    {
      id: "nba-lal-gsw",
      league: "NBA",
      match: "Los Angeles Lakers vs Golden State Warriors",
      pick: "Golden State Warriors",
      softBook: "DraftKings",
      softOdd: 2.35,
      sharpBook: "Pinnacle",
      sharpHomeOdd: 1.72,
      sharpAwayOdd: 2.24,
      verdictEn: "High value (Confidence 83%) — Golden State holds a 2-day rest edge while Lakers interior defense faces questionable mobility.",
      verdictPt: "Alto valor (Confiança 83%) — Golden State chega com 2 dias extras de descanso, enquanto os Lakers têm dúvida na defesa de garrafão."
    },
    {
      id: "bra-cam-fla",
      league: "Brasileirao Serie A",
      match: "Atletico-MG vs Flamengo",
      pick: "Atletico-MG (ML)",
      softBook: "Betano",
      softOdd: 2.75,
      sharpBook: "Pinnacle",
      sharpHomeOdd: 2.52,
      sharpAwayOdd: 1.61,
      verdictEn: "Moderate edge (Confidence 76%) — Home side full starting midfield confirmed; retail book lagging global reference movement.",
      verdictPt: "Vantagem moderada (Confiança 76%) — Meio-campo titular confirmado em casa e a casa tradicional ainda não corrigiu a cotação."
    },
    {
      id: "ucl-rma-ars",
      league: "UEFA Champions League",
      match: "Real Madrid vs Arsenal",
      pick: "Arsenal (+0.5 / X2)",
      softBook: "Bet365",
      softOdd: 2.15,
      sharpBook: "Pinnacle",
      sharpHomeOdd: 1.88,
      sharpAwayOdd: 2.02,
      verdictEn: "Measured value (Confidence 72%) — Balanced expected goals profile keeps the offered price above fair probability.",
      verdictPt: "Valor equilibrado (Confiança 72%) — Os números recentes das equipes deixam a cotação oferecida acima da chance real do evento."
    }
  ],
  rotafacilRides: [
    {
      id: "uber-savassi",
      sourceApp: "Uber Driver",
      fare: "R$ 28,40",
      distance: "9.2 km",
      pickup: "Rua Pernambuco, 1070 - Savassi, Belo Horizonte",
      dropoff: "Av. Fleming, 900 - Ouro Preto, Belo Horizonte"
    },
    {
      id: "99-centro",
      sourceApp: "99 Motorista",
      fare: "R$ 42,80",
      distance: "16.5 km",
      pickup: "Av. Afonso Pena, 1500 - Centro, Belo Horizonte",
      dropoff: "Av. Cristiano Machado, 4000 - União, Belo Horizonte"
    },
    {
      id: "uber-buritis",
      sourceApp: "Uber Driver",
      fare: "R$ 19,90",
      distance: "5.4 km",
      pickup: "Av. Professor Mário Werneck, 1685 - Buritis",
      dropoff: "BH Shopping - Belvedere, Belo Horizonte"
    }
  ],
  jiraTickets: [
    {
      key: "ACME-418",
      queue: "customer",
      priority: "High",
      status: "Awaiting Customer",
      statusTone: "warning",
      summary: "Offline sync queue stalls after batch attachment upload",
      reporter: "Marina Costa",
      updatedAgo: "18m ago",
      linked: [{ key: "ENG-904", rel: "is blocked by", status: "Under Dev" }],
      timeline: [
        { date: "Today 09:42", text: "Requested fresh diagnostic bundle from mobile device build 4.18.2" },
        { date: "Yesterday", text: "Status changed: In Triage -> Awaiting Customer" },
        { date: "23 Nov", text: "Customer attached 3 PNG logs showing HTTP 413 payload threshold" }
      ],
      aiSummaryEn: "Client batch upload exceeds 10 MB proxy ceiling. Engineering fix tracked under ENG-904; awaiting customer confirmation on chunking flag.",
      aiSummaryPt: "Upload em lote excede limite de 10 MB no proxy. Correção de engenharia em ENG-904; aguardando confirmação do cliente sobre chunking."
    },
    {
      key: "ACME-422",
      queue: "customer",
      priority: "Medium",
      status: "In Triage",
      statusTone: "accent",
      summary: "Validation rule skips required signature on work order close",
      reporter: "Lucas Mendes",
      updatedAgo: "1h ago",
      linked: [{ key: "ENG-911", rel: "relates to", status: "PM Review" }],
      timeline: [
        { date: "Today 08:55", text: "Reproduced conditional branch inside ON_SAVE rule" },
        { date: "24 Nov", text: "Ticket opened via customer portal" }
      ],
      aiSummaryEn: "Conditional dropdown check falls back to default operator when field is empty. Ready for patch verification in QAS.",
      aiSummaryPt: "Condição de dropdown cai para operador padrão quando campo está vazio. Pronto para validar patch em QAS."
    },
    {
      key: "ENG-904",
      queue: "engineering",
      priority: "High",
      status: "Under Dev",
      statusTone: "positive",
      summary: "Support chunked multipart uploads in mobile sync worker",
      reporter: "Core Squad",
      updatedAgo: "32m ago",
      linked: [{ key: "ACME-418", rel: "blocks", status: "Awaiting Customer" }],
      timeline: [
        { date: "Today 09:30", text: "PR #148 merged to release/4.19 staging branch" },
        { date: "23 Nov", text: "Status changed: Estimate -> Under Dev" }
      ],
      aiSummaryEn: "Multipart upload chunking (2 MB parts) merged to staging; scheduled for regression sign-off.",
      aiSummaryPt: "Upload multipart em blocos de 2 MB mesclado em staging; aguardando validação de regressão."
    },
    {
      key: "INC-712",
      queue: "engineering",
      priority: "Low",
      status: "Waiting Validation",
      statusTone: "warning",
      summary: "Normalize timezone offset in scheduled PDF report header",
      reporter: "Platform Ops",
      updatedAgo: "3h ago",
      linked: [],
      timeline: [
        { date: "Today 06:40", text: "Deployed hotfix build to QAS environment" },
        { date: "22 Nov", text: "Root cause isolated to UTC fallback on worker container" }
      ],
      aiSummaryEn: "Timezone header now respects tenant IANA locale in QAS; awaiting support sign-off.",
      aiSummaryPt: "Cabeçalho de fuso horário agora respeita locale IANA em QAS; aguardando validação."
    }
  ],
  blocklyPayloads: {
    valid: {
      labelEn: "Valid workflow rule",
      labelPt: "Regra válida",
      xml: `<xml xmlns="https://developers.google.com/blockly/xml">\n  <variables><variable id="v1">orderStatus</variable></variables>\n  <block type="event_on_save" id="b1">\n    <statement name="DO">\n      <block type="controls_if" id="b2">\n        <value name="IF0"><block type="logic_compare"><field name="OP">EQ</field><value name="A"><block type="variables_get"><field name="VAR">orderStatus</field></block></value><value name="B"><block type="text"><field name="TEXT">APPROVED</field></block></value></block></value>\n        <statement name="DO0"><block type="field_set_required"><field name="TARGET">WorkOrder.Signature</field><field name="VALUE">TRUE</field></block></statement>\n      </block>\n    </statement>\n  </block>\n</xml>`,
      outline: [
        "ON_SAVE -> if (orderStatus == 'APPROVED')",
        "  then setRequired(WorkOrder.Signature, true)"
      ],
      issues: []
    },
    buggy: {
      labelEn: "Buggy dropdown + undeclared var",
      labelPt: "Dropdown inválido + variável",
      xml: `<xml xmlns="https://developers.google.com/blockly/xml">\n  <variables></variables>\n  <block type="event_on_save" id="b1">\n    <statement name="DO">\n      <block type="controls_if" id="b2">\n        <value name="IF0"><block type="logic_compare"><field name="OP">GREATER</field><value name="A"><block type="variables_get"><field name="VAR">retryCount</field></block></value><value name="B"><block type="math_number"><field name="NUM">3</field></block></value></block></value>\n        <statement name="DO0"><block type="field_set_required" disabled="true"><field name="TARGET"></field></block></statement>\n      </block>\n    </statement>\n  </block>\n</xml>`,
      outline: [
        "ON_SAVE -> if (retryCount [INVALID_OP:GREATER] 3)",
        "  [DISABLED] setRequired(<empty_target>)"
      ],
      issues: [
        { severity: "negative", msgEn: "Invalid dropdown OP 'GREATER' (runtime silently falls back to 'EQUAL'; expected 'GT').", msgPt: "Operador inválido 'GREATER' (runtime cai silenciosamente para 'EQUAL'; esperado 'GT')." },
        { severity: "warning", msgEn: "Undeclared variable 'retryCount' missing from <variables> header.", msgPt: "Variável 'retryCount' não declarada no bloco <variables>." },
        { severity: "warning", msgEn: "Disabled block 'field_set_required' has empty TARGET field.", msgPt: "Bloco desabilitado 'field_set_required' está com campo TARGET vazio." }
      ]
    },
    diff: {
      labelEn: "QAS vs PRD structural diff",
      labelPt: "Diff estrutural QAS vs PRD",
      xml: `QAS (v18): ON_SAVE -> if (orderStatus == 'APPROVED') -> setRequired(WorkOrder.Signature, true) + notifySync()\nPRD (v17): ON_SAVE -> if (orderStatus == 'APPROVED') -> setRequired(WorkOrder.Signature, true)`,
      outline: [
        "  ON_SAVE -> if (orderStatus == 'APPROVED')",
        "    setRequired(WorkOrder.Signature, true)",
        "+   notifySync()  [Added in QAS v18]"
      ],
      issues: [
        { severity: "accent", msgEn: "1 added statement block in QAS: notifySync() before commit.", msgPt: "1 bloco adicionado em QAS: notifySync() antes do commit." }
      ]
    }
  }
};
