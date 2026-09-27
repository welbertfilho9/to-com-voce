export const FULL_ARCHITECTURE_DOCUMENT = `# Dossiê Completo de Produto, Arquitetura e Engenharia: Copiloto de Deslocamento Urbano

---

## 1. Visão do Produto
O **"Estou com Você"** é um copiloto pessoal de mobilidade e segurança urbana projetado especificamente para pessoas com desorientação espacial e ansiedade de deslocamento. Ao contrário de aplicativos de navegação genéricos (como Google Maps ou Waze) que sobrecarregam a usuária com mapas densos, dezenas de linhas e nós viários complexos, o produto opera como um guia passo a passo ("O que fazer agora?"), decompondo trajetos complexos em micro-etapas compreensíveis com linguagem acolhedora e suporte remoto sob demanda.

---

## 2. Problema
Pessoas com desafios de orientação espacial enfrentam estresse severo em pontos de decisão urbana:
* Dificuldade de identificar o sentido correto do ônibus (embarcar na direção oposta);
* Ansiedade em terminais integrados (múltiplas baias, plataformas confusas);
* Dúvida sobre o momento exato de dar o sinal de descida;
* Pedir corridas por aplicativo (Uber) para endereços equivocados por preenchimento automático incorreto;
* Desorientação após desembarques;
* Sobrecarga cognitiva ao tentar decifrar mapas cartográficos tradicionais enquanto caminha na rua.

---

## 3. Público e Contexto de Uso
* **Usuária Primária (Tonton):** Jovem residente em Maceió (Alagoas), estudante/estagiária, usuária de iPhone 14 com restrição severa de armazenamento livre, que transita diariamente entre Clima Bom, Orizon/Ecoparque, Terminal Integrado Benedito Bentes, Campus UFAL e Paripueira.
* **Acompanhante Remoto (Welbert):** Namorado e estudante de engenharia em Diadema (SP), prestando apoio remoto sem recorrer à vigilância invasiva ou infantilizadora.
* **Contexto Físico:** Uso em movimento, sob sol ou chuva, dentro de ônibus em movimento com vibração, caminhando em calçadas irregulares, com conexão 4G/5G oscilante.

---

## 4. Proposta de Solução
Uma **Progressive Web App (PWA) ultraleve** com pegada de armazenamento inferior a 1 MB no iPhone 14. O app substitui a complexidade cartográfica pelo paradigma de **"Guia de Uma Ação por Vez"**:
1. **Rede de Âncoras:** Locais seguros e conhecidos funcionam como refúgios imediatos.
2. **Pontos de Decisão Explícitos:** O app interrompe a rota nos nós críticos (ex.: ao pisar no Terminal Benedito Bentes) e pergunta: *"Para onde você vai agora?"*.
3. **Botão de Pânico Acolhedor (SOS):** Um toque dispara acolhimento imediato, calcula o local conhecido mais próximo, e permite acionar Welbert com coordenadas prontas.
4. **Uber Anti-Erro:** Deep link com validação pré-voo em duas etapas do endereço exato.
5. **Acompanhamento Sob Demanda:** Telemetria ativada apenas durante viagens iniciadas ativamente pela usuária, desligando-se sozinha na chegada.

---

## 5. Principais Funcionalidades
* **Sugestão Inteligente de Rotina:** Reconhece dia e horário (08h Estágio, 14h Van/Terminal, Sexta 22h Paripueira, Domingo Retorno).
* **Guia Passo a Passo (Micro-Etapas):** Tela minimalista com apenas a ação atual e botão *"Já fiz isso"*.
* **Botão 🆘 ESTOU PERDIDA:** Interface de socorro com banner anti-pânico, endereço do refúgio mais próximo e discador direto.
* **Botão 📍 ONDE ESTOU?:** Resumo humano imediato da posição e compartilhamento em 1 toque.
* **Uber Seguro:** Travamento de endereço físico exato antes de invocar a URL universal da Uber.
* **Painel do Acompanhante:** Dashboard em tempo real com indicador de status 🟢/🟡/🟠/🔴, etapa atual e telemetria sem rastreamento contínuo intrusivo.

---

## 6. Fluxo Completo da Usuária
\`\`\`
[Abre App no Safari/Home Screen]
       │
       ▼
[Sugestão de Rotina ou Seleciona Destino Conhecido]
       │
       ▼
[Escolhe: Modo Normal OU Modo Acompanhada com Welbert]
       │
       ▼
[Etapa 1: Caminhar até ponto / van] ──(Toca "Já fiz isso")──► [Etapa 2: Embarque no ônibus correto]
       │                                                                   │
       ▼                                                                   ▼
[Ponto de Decisão: Terminal Integrado] ◄──────────────────────────────────┘
       │
       ├─► [Opção 1: UFAL] ─► [Guia Linha 0901/0903] ─► [Alerta de Descida] ─► [Chegada: Fim]
       ├─► [Opção 2: Casa] ─► [Guia Ônibus / Uber Seguro] ─────────────────► [Chegada: Fim]
       └─► [Botão 🆘 em qualquer momento] ─► [Tela de Calma + Discagem / WhatsApp]
\`\`\`

---

## 7. Fluxo Completo do Acompanhante
1. Recebe aviso no WhatsApp ou acessa o link do dashboard web.
2. Visualiza cartão de status: 🟢 Rota normal | 🟡 Parada longa | 🟠 Desvio de rota | 🔴 SOS.
3. Lê a ação exata que a namorada está executando (ex: *"Aguardando ônibus 0901 no Terminal"*).
4. Em caso de SOS, recebe as coordenadas exatas já formatadas para o Google Maps e chamada em 1 toque.
5. Quando ela conclui a viagem, a sessão é encerrada e a telemetria é desativada.

---

## 8. Telas Necessárias
1. **Tela Principal (Home / Copiloto):** Card de rotina sugerida, botão de início rápido, lista de destinos frequentes, botão Uber e os 2 botões de emergência fixos.
2. **Tela de Viagem Ativa:** Card da etapa atual com barra de progresso, orientações de sentido/letreiro, botão de avanço e botão de emergência.
3. **Modal 🆘 ESTOU PERDIDA:** Mensagem de acolhimento, local mais próximo, discagem direta para Welbert e WhatsApp.
4. **Modal 📍 ONDE ESTOU?:** Bairro, ponto conhecido mais próximo, precisão do sinal GPS e botão de copiar.
5. **Modal Uber Seguro:** Seleção do destino, visualização do endereço completo em destaque, checkbox de confirmação e botão de abertura do app nativo da Uber.
6. **Modal Ponto de Decisão:** Interface simplificada exibida em entroncamentos (ex: Terminal).
7. **Painel do Welbert (Companion Dashboard):** Visualização remota de status, etapa atual, nível de bateria e simulador de testes.

---

## 9. UX/UI & Design Emocional
* **Ergonomia para Uso em Movimento:** Botões com altura mínima de 56px, fontes legíveis sob luz solar (mínimo 16px para textos de leitura rápida), cores com contraste WCAG AAA.
* **Microcópia Acolhedora:** Textos breves com tom de carinho e segurança (*"Calma. Estou com você."*, *"Você está indo bem."*, *"Você chegou. ❤️"*).
* **Prevenção de Ansiedade:** Não exibir mapas rodoviários girando caoticamente; priorizar setas cardeais (N/S/L/O) e nomes de locais familiares.

---

## 10. Arquitetura Técnica
* **Frontend:** React 19 + TypeScript + Vite (construído como Progressive Web App com Service Worker leve).
* **Estilização:** Tailwind CSS v4 para bundle CSS minúsculo (< 30 KB comprimido).
* **Armazenamento de Dados & Realtime:** Supabase (PostgreSQL + PostgREST + Supabase Realtime via WebSockets) ou Firebase Firestore.
* **Hospedagem / Edge:** Vercel ou Cloud Run (Node.js/Express proxy).
* **Pegada no Dispositivo:** Código estático em cache (~200 KB) + dados voláteis em memória/localStorage (< 50 KB). Nenhuma base vetorial local pesada.

---

## 11. Banco de Dados (PostgreSQL / Supabase Schema)
\`\`\`sql
-- Extensões para geoespacial leve se necessário
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Perfis de usuário (Tonton e Welbert)
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role VARCHAR(20) NOT NULL CHECK (role IN ('traveler', 'companion')),
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lugares Conhecidos (Âncoras de segurança)
CREATE TABLE known_places (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  short_name VARCHAR(50) NOT NULL,
  category VARCHAR(30) NOT NULL,
  address TEXT NOT NULL,
  neighborhood VARCHAR(100) NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  notes TEXT,
  icon VARCHAR(10),
  is_active BOOLEAN DEFAULT TRUE
);

-- Sessões de Viagem Ativa (Apenas viagens em curso)
CREATE TABLE active_journeys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  traveler_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  origin_name VARCHAR(100) NOT NULL,
  destination_name VARCHAR(100) NOT NULL,
  destination_lat DOUBLE PRECISION NOT NULL,
  destination_lng DOUBLE PRECISION NOT NULL,
  current_step_index INT DEFAULT 0,
  total_steps INT NOT NULL,
  status VARCHAR(20) DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'cancelled')),
  safety_status VARCHAR(20) DEFAULT 'normal' CHECK (safety_status IN ('normal', 'delay', 'deviation', 'sos')),
  accompanied BOOLEAN DEFAULT TRUE,
  current_lat DOUBLE PRECISION,
  current_lng DOUBLE PRECISION,
  accuracy_meters DOUBLE PRECISION,
  battery_level INT,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Eventos de SOS
CREATE TABLE sos_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  journey_id UUID REFERENCES active_journeys(id) ON DELETE SET NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  nearest_place_name VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);
\`\`\`

---

## 12. Estrutura das Entidades
* **User/Profile:** Representa a usuária (Tonton) ou o acompanhante (Welbert).
* **KnownPlace:** Ponto geográfico de ancoragem com endereço textual exato.
* **PresetTrip:** Roteiro padrão composto por uma sequência ordenada de \`JourneyStep\`.
* **JourneyStep:** Unidade atômica de instrução (tipo, instrução clara, ponto de embarque, linha de ônibus, alerta de sentido).
* **ActiveJourney:** Estado volátil da viagem atual com coordenadas e etapa corrente.
* **SosAlert:** Disparo de emergência com contexto imediato para assistência.

---

## 13. APIs
* **GET /api/places:** Retorna os locais conhecidos.
* **GET /api/routines/suggest:** Calcula a sugestão com base no fuso de Maceió (-03:00).
* **POST /api/journey/start:** Cria uma nova viagem ativa.
* **PATCH /api/journey/:id/step:** Avança a etapa atual.
* **PATCH /api/journey/:id/telemetry:** Atualiza coordenadas e status de segurança (se viagem acompanhada).
* **POST /api/journey/:id/finish:** Encerra e apaga telemetria da viagem.
* **POST /api/sos:** Registra disparo de socorro e dispara Web Push / WhatsApp payload.

---

## 14. Integração com Mapas
* **Princípio:** Evitar WebGL pesado (como Mapbox GL de centenas de MB em cache) para respeitar o iPhone 14 sem espaço.
* **Abordagem Adotada:** 
  1. Renderização de orientação textual com bússola vetorial leve.
  2. Embed leve de OpenStreetMap (Leaflet estático) ou Google Maps Static API sob demanda.
  3. Links externos universais para abertura de pontos específicos no aplicativo nativo Google Maps / Apple Maps do iOS quando ela quiser inspecionar a rua.

---

## 15. Integração com Transporte de Maceió
* **Diagnóstico Técnico Real:**
  - O órgão gestor municipal é a **DMTT (Superintendência Municipal de Transportes e Trânsito)**.
  - A bilhetagem e cartões são operados pelo sistema **Vamu Mobilidade** (com integração temporal de 90 min).
  - O aplicativo oficial em Maceió é o **Cittamobi**, porém o Cittamobi **não possui API pública aberta e gratuita** para desenvolvedores independentes.
  - A DMTT também **não disponibiliza um feed GTFS-RT (Real-Time) aberto**.
* **Solução de Engenharia para o MVP:**
  - Mapear cirurgicamente as rotas e linhas reais que Tonton utiliza:
    * **Linha 0901:** Eustáquio Gomes / T.I. Benedito Bentes (Via UFAL / Hospital Metropolitano) - Real Transportes.
    * **Linha 0903:** Eustáquio Gomes / T.I. Benedito Bentes (Via UFAL) - Real Transportes.
    * **Linha 4000:** Circular UFAL (gratuito dentro do Campus A.C. Simões).
  - Alimentar os dados dessas linhas diretamente nas etapas com alertas de letreiro e plataformas.

---

## 16. Integração com Uber (Anti-Erro de Endereço)
* **Problema:** Ao abrir o Uber na rua, o aplicativo muitas vezes seleciona a localização do momento de forma imprecisa ou a usuária digita parte do nome e seleciona o bairro errado.
* **Solução Técnica - Deep Link Universal:**
  \`\`\`
  https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[latitude]=-9.5772&dropoff[longitude]=-35.7725&dropoff[nickname]=Casa&dropoff[formatted_address]=Rua%20Quinze%2C%20101%20-%20Clima%20Bom
  \`\`\`
* A tela da nossa PWA exige uma confirmação visual prévia (*"Confirmo que quero ir para: Rua Quinze, 101, Clima Bom"*), garantindo que ela não clique em um destino trocado antes de o Uber ser aberto com o destino travado.

---

## 17. Notificações
* **No iOS 16.4+ (iPhone 14):** Notificações Web Push são suportadas em PWAs instaladas na Tela de Início (Home Screen).
* **Estratégia Híbrida de Confiança Máxima:**
  - Como o Safari suspende processos em background e o Web Push pode sofrer atrasos de rede celular, o canal primário para alertas críticos de SOS é a geração de links pré-formatados com discagem e envio imediato no **WhatsApp** (\`https://wa.me/...\`) e discagem telefônica direta (\`tel:...\`).
  - O painel web de Welbert faz polling/WebSocket e emite alertas visuais e sonoros instantâneos no navegador dele.

---

## 18. Geolocalização
* **API Utilizada:** \`navigator.geolocation.getCurrentPosition\` e \`navigator.geolocation.watchPosition\`.
* **Configuração:** \`{ enableHighAccuracy: true, timeout: 15000, maximumAge: 30000 }\`.
* **Cálculos Matemáticos Implementados:**
  - Fórmula de Haversine para cálculo de distância métrica ponto a ponto.
  - Cálculo de Azimute/Rumo (Bearing) para converter diferença de coordenadas em rumo cardeal (N, NE, L, SE, S, SO, O, NO).
  - Algoritmo de filtragem de ruído: Se a precisão reportada for superior a 70m, desativar alertas de desvio de rota para prevenir falso alarme.

---

## 19. Comportamento no iPhone 14
* **iPhone 14 (iOS 17/18):** Excelente desempenho de CPU, tela OLED de alta taxa de contraste, excelente recepção GPS com suporte a redes GNSS múltiplas.
* **Gargalo Real Identificado:** Armazenamento quase esgotado (< 1-2 GB livres).
* **Impactos de Engenharia no iOS com Pouco Espaço:**
  1. O iOS WebKit pode purgar dados de IndexedDB e LocalStorage se a partição do sistema atingir níveis críticos de emergência de disco.
  2. Solução: Manter todas as rotas e configurações essenciais no próprio código estático (HTML/JS) da PWA e no backend, sem depender de banco de dados offline pesado no aparelho.

---

## 20. Limitações da PWA no iOS (Safari)
1. **Background Execution:** Quando o Safari/PWA é minimizado ou a tela é bloqueada, o iOS suspende a execução do JavaScript em 10 a 30 segundos. **Nenhuma PWA tem autorização para ler GPS continuamente com a tela desligada.**
2. **Wake Lock API:** No iOS Safari, a Wake Lock API tem suporte restrito. A usuária deve manter a tela ativa ou abrir o app ao mudar de etapa.
3. **Por que isso é benéfico neste caso?**
   Elimina a ilusão de que o app fará rastreamento 24h e força o design correto: a usuária consulta o app nos **pontos de decisão**, preservando bateria e não criando dependência de vigilância passiva invisível.

---

## 21. Privacidade e Segurança
* **Princípio da Minimização:** O app não grava histórico de trilha de GPS. Coordenadas enviadas durante a viagem são sobrescritas no registro de sessão ativa e apagadas após o encerramento da viagem.
* **Controle da Usuária:**
  - Modo Normal: Telemetria fica 100% restrita ao navegador dela.
  - Modo Acompanhada: Telemetria sincronizada com Welbert mediante chave de sessão compartilhada.
  - Nenhuma informação de deslocamento é indexável publicamente ou compartilhada com anunciantes.

---

## 22. Conformidade com a LGPD (Lei Geral de Proteção de Dados)
* **Base Legal:** Consentimento inequívoco e legítimo interesse (segurança e proteção da vida da titular).
* **Direitos do Titular:** Opção clara de exclusão total de dados com 1 clique.
* **Minimização e Finalidade:** Coleta restrita a dados estritamente operacionais de deslocamento.

---

## 23. Escopo do MVP (Minimum Viable Product)
O menor produto viável que já resolve o problema com perfeição:
1. PWA responsiva instalável no iPhone 14.
2. 10 Lugares Conhecidos de Maceió pré-cadastrados (Casa, Orizon, Terminal, UFAL, etc.).
3. 6 Roteiros guiados passo a passo das viagens diárias (incluindo ônibus 0901/0903 e van 14h).
4. Botão 🆘 ESTOU PERDIDA com discagem direta e WhatsApp formatado.
5. Botão 📍 ONDE ESTOU? com distância do refúgio mais próximo.
6. Lançador de Uber seguro com endereço pré-validado.
7. Painel do Welbert com espelhamento da etapa e status de segurança.
8. Pegada de dados no iPhone inferior a 500 KB.

---

## 24. Funcionalidades para a Versão 2 (Futuro)
* Autenticação Supabase com login social simples.
* Cadastro dinâmico de novos locais conhecidos pela própria usuária.
* Compartilhamento temporário de link de viagem com outros contatos de confiança (ex: familiares).
* Integração com áudio narrado (TTS curto com voz do Welbert pré-gravada ou voz acolhedora para quem prefere ouvir pelo fone).

---

## 25. Funcionalidades que NÃO Valem a Pena (Descartadas)
* ❌ Rastreamento contínuo em background 24 horas por dia (inviável em PWA, invasivo, drena bateria e gera ansiedade).
* ❌ Renderização cartográfica 3D vetorial própria (consome centenas de MB de cache, trava o iPhone sem espaço).
* ❌ Agente conversacional de inteligência artificial durante a emergência (a usuária nervosa precisa de botões grandes e objetivos, não de conversar com um robô).
* ❌ Gamificação ou rede social de deslocamento (ruído inútil para a proposta central).

---

## 26. Riscos Técnicos e Mitigações
* **Risco 1: iOS fechar a PWA por falta de memória RAM/Disco.**
  *Mitigação:* Bundle JS minificado (< 150 KB gzipped), zero dependências gráficas pesadas.
* **Risco 2: Falta de sinal de celular (4G) em trechos da rodovia.**
  *Mitigação:* As rotas e instruções de ônibus ficam salvas na memória do app (Cache First), funcionando mesmo sem internet.
* **Risco 3: Falso positivo em desvio de rota.**
  *Mitigação:* Verificação de raio de precisão do GPS antes de acusar qualquer alerta de rota.

---

## 27. Custos Estimados de Infraestrutura
* **Frontend (Vercel ou Cloudflare Pages):** Gratuito (Hobby Tier com folga para uso do casal).
* **Banco de Dados (Supabase Free Tier):** Gratuito (500 MB de banco, enquanto nosso app consome menos de 5 MB).
* **Mapas (OpenStreetMap / Google Maps Links Universais):** Gratuito (R$ 0,00).
* **Custo Total de Operação:** **R$ 0,00 / mês**.

---

## 28. Roadmap de Desenvolvimento
* **Semana 1:** Validação da UX, testes de usabilidade no Safari do iPhone 14 e testes no Terminal Benedito Bentes.
* **Semana 2:** Conexão com banco Supabase e sincronização remota WebSocket para o Painel do Welbert.
* **Semana 3:** Refinamento dos pontos de ônibus das linhas 0901 e 0903 com testes de campo em Maceió.
* **Semana 4:** Adição de atalhos rápidos e publicação no domínio definitivo.

---

## 29. Plano de Implementação Passo a Passo
1. Testar o protótipo interativo atual com a Tonton no Safari do iPhone dela.
2. Coletar o número oficial de telefone de ambos para os botões de ligação e WhatsApp.
3. Adicionar o app à Tela de Início do iPhone dela (PWA Standalone).
4. Configurar as variáveis de ambiente e o banco de dados Supabase para sincronização em tempo real.
5. Realizar o primeiro trajeto de teste assistido: Casa → Orizon ou Terminal → UFAL.

---

## 30. Arquitetura de Pastas Recomendada
\`\`\`
/estou-com-voce
├── public/
│   ├── manifest.json
│   └── icons/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── TontonView.tsx
│   │   ├── WelbertView.tsx
│   │   ├── LostModal.tsx
│   │   ├── WhereAmIModal.tsx
│   │   ├── UberModal.tsx
│   │   ├── DecisionPointModal.tsx
│   │   └── PlacesList.tsx
│   ├── data/
│   │   └── mockData.ts
│   ├── services/
│   │   ├── geolocation.ts
│   │   ├── uber.ts
│   │   ├── routineEngine.ts
│   │   └── storage.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
└── package.json
\`\`\`

---

## 31. Estratégia de Testes
* **Testes de Usabilidade em Campo:** Acompanhamento de uma viagem real entre o Terminal e a UFAL.
* **Testes de Falha de Rede:** Simulação com modo avião ativado no iPhone para garantir leitura offline das instruções.
* **Testes de Resposta do Uber:** Validação se o deep link abre o app nativo da Uber com o endereço correto do Clima Bom e da Orizon.

---

## 32. Estratégia de Deploy
* Deploy contínuo na Vercel conectado à branch \`main\` do repositório no GitHub.
* Domínio customizado ou subdomínio gratuito seguro com certificado SSL HTTPS (obrigatório para Service Workers e Geolocalização).

---

## 33. Estratégia de GitHub & Portfólio
* Repositório público com README estruturado com capturas de tela, diagrama de arquitetura C4, explicação do problema de mobilidade urbana em Maceió e decisões de engenharia sob restrição de hardware (iPhone com pouco espaço).
* Demonstração de competências: React, TypeScript, PWA, REST/Realtime, UX centrada no usuário, acessibilidade e respeito à privacidade (LGPD).

---

## 34. Sugestões de Nomes para o Produto
1. **Estou com Você** *(Opção recomendada: transmite acolhimento emocional e segurança sem parecer aplicativo hospitalar ou corporativo)*
2. **Copiloto Maceió**
3. **Guia Tonton**
4. **Vem Comigo**
5. **Caminho Seguro**
`;
