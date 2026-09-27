import { KnownPlace, PresetTrip } from '../types';

export const KNOWN_PLACES: KnownPlace[] = [
  {
    id: 'casa',
    name: 'Casa (Clima Bom)',
    shortName: 'Casa (Clima Bom)',
    category: 'home',
    address: 'R. Quinze, 101',
    neighborhood: 'Clima Bom, Maceió - AL, 57063-505',
    latitude: -9.5806165,
    longitude: -35.7859235,
    notes: 'R. Quinze, 101 - Clima Bom, Maceió - AL, 57063-505',
    icon: '🏠',
    googleMapsUrl: 'https://maps.app.goo.gl/K19FWyw3wnwGwuT67?g_st=ac'
  },
  {
    id: 'orizon',
    name: 'Ecoparque Maceió (Orizon)',
    shortName: 'Ecoparque Maceió',
    category: 'work',
    address: 'Ecoparque Maceió',
    neighborhood: 'Benedito Bentes, Maceió - AL',
    latitude: -9.556395,
    longitude: -35.7281169,
    notes: 'Ecoparque Maceió - Benedito Bentes (Estágio Orizon).',
    icon: '🏢',
    googleMapsUrl: 'https://maps.app.goo.gl/JNkffNj8avAdyx138?g_st=ac'
  },
  {
    id: 'terminal_bb',
    name: 'Terminal Integrado Benedito Bentes',
    shortName: 'Terminal B. Bentes',
    category: 'transit',
    address: 'Av. Cachoeira do Meirim, s/n',
    neighborhood: 'Benedito Bentes, Maceió - AL',
    latitude: -9.5518,
    longitude: -35.7289,
    notes: 'Ponto nevrálgico de integração. Van do estágio desce aqui por volta de 14:20.',
    icon: '🚌'
  },
  {
    id: 'ufal',
    name: 'UFAL - Campus A.C. Simões',
    shortName: 'UFAL',
    category: 'study',
    address: 'Av. Lourival Melo Mota, s/n',
    neighborhood: 'Tabuleiro do Martins / Cidade Universitária, Maceió - AL',
    latitude: -9.5558,
    longitude: -35.7749,
    notes: 'Campus Universitário. Linhas 0901, 0903 e Circular 4000.',
    icon: '🎓'
  },
  {
    id: 'paripueira',
    name: 'Paripueira (Fim de Semana)',
    shortName: 'Paripueira',
    category: 'weekend',
    address: 'R. do Angelim, 650',
    neighborhood: 'Paripueira - AL, 57935-000',
    latitude: -9.4588859,
    longitude: -35.5434108,
    notes: 'R. do Angelim, 650, Paripueira - AL, 57935-000.',
    icon: '🌴',
    googleMapsUrl: 'https://maps.app.goo.gl/iD6XBagvTPHdpCb7A?g_st=ac'
  },
  {
    id: 'patio_maceio',
    name: 'Shopping Pátio Maceió',
    shortName: 'Shopping Pátio',
    category: 'shopping',
    address: 'Av. Menino Marcelo, 3800',
    neighborhood: 'Cidade Universitária, Maceió - AL',
    latitude: -9.5601,
    longitude: -35.7482,
    notes: 'Shopping mais próximo da parte alta e Benedito Bentes.',
    icon: '🛍️'
  },
  {
    id: 'maceio_shopping',
    name: 'Maceió Shopping',
    shortName: 'Maceió Shopping',
    category: 'shopping',
    address: 'Av. Comendador Gustavo Paiva, 2990',
    neighborhood: 'Mangabeiras, Maceió - AL',
    latitude: -9.6482,
    longitude: -35.7118,
    notes: 'Região da Mangabeiras / Cruz das Almas.',
    icon: '🛍️'
  },
  {
    id: 'parque_shopping',
    name: 'Parque Shopping Maceió',
    shortName: 'Parque Shopping',
    category: 'shopping',
    address: 'Av. Comendador Gustavo Paiva, 5945',
    neighborhood: 'Cruz das Almas, Maceió - AL',
    latitude: -9.6258,
    longitude: -35.7011,
    notes: 'Shopping beira-mar norte.',
    icon: '🛍️'
  },
  {
    id: 'lucio_costa',
    name: 'Residencial Lúcio Costa',
    shortName: 'Lúcio Costa',
    category: 'family',
    address: 'Conjunto Habitacional Lúcio Costa',
    neighborhood: 'Maceió - AL',
    latitude: -9.5710,
    longitude: -35.7490,
    notes: 'Destino familiar conhecido.',
    icon: '🏡'
  },
  {
    id: 'vila_madalena',
    name: 'Residencial Vila Madalena',
    shortName: 'Vila Madalena',
    category: 'family',
    address: 'Residencial Vila Madalena',
    neighborhood: 'Maceió - AL',
    latitude: -9.5650,
    longitude: -35.7420,
    notes: 'Destino familiar frequente.',
    icon: '🏡'
  }
];

export const PRESET_TRIPS: PresetTrip[] = [
  {
    id: 'casa_orizon',
    name: 'Casa (Clima Bom) → Orizon (Estágio)',
    originId: 'casa',
    destinationId: 'orizon',
    originName: 'Casa (Clima Bom)',
    destinationName: 'Orizon Ecoparque Maceió',
    estimatedTotalMinutes: 45,
    routineHint: 'Segunda a Sexta • Manhã cedo (06:30 - 07:30)',
    steps: [
      {
        id: 'co_1',
        stepNumber: 1,
        type: 'walk',
        title: 'Sair de Casa (Clima Bom)',
        instruction: 'Saia com calma e caminhe até o ponto de embarque combinado.',
        detail: 'Rua Quinze em direção à rua principal do Clima Bom.',
        locationName: 'Clima Bom',
        distanceMeters: 200,
        estimatedMinutes: 5
      },
      {
        id: 'co_2',
        stepNumber: 2,
        type: 'bus',
        title: 'Embarcar no transporte do Estágio',
        instruction: 'Aguarde o transporte do estágio. O estágio começa às 08:00.',
        detail: 'Confira se é o veículo correto antes de subir.',
        locationName: 'Ponto de Embarque',
        estimatedMinutes: 35
      },
      {
        id: 'co_3',
        stepNumber: 3,
        type: 'arrive',
        title: 'Chegada na Orizon',
        instruction: 'Você chegou na Orizon! Tenha um ótimo dia de trabalho ❤️',
        detail: 'Ecoparque Maceió.',
        locationName: 'Orizon / Ecoparque',
        estimatedMinutes: 5
      }
    ]
  },
  {
    id: 'orizon_terminal',
    name: 'Orizon → Terminal Benedito Bentes (Van 14h)',
    originId: 'orizon',
    destinationId: 'terminal_bb',
    originName: 'Orizon / Ecoparque',
    destinationName: 'Terminal B. Bentes',
    estimatedTotalMinutes: 30,
    routineHint: 'Segunda a Sexta • Fim do expediente às 14:00',
    steps: [
      {
        id: 'ot_1',
        stepNumber: 1,
        type: 'van',
        title: 'Embarcar na Van do Estágio',
        instruction: 'Entre na van da Orizon que sai por volta das 14:00.',
        detail: 'A van leva direto para o Terminal Integrado Benedito Bentes.',
        locationName: 'Portaria Orizon',
        estimatedMinutes: 5
      },
      {
        id: 'ot_2',
        stepNumber: 2,
        type: 'van',
        title: 'Permanecer na Van',
        instruction: 'Pode relaxar na van. Não precisa descer em nenhum ponto da rodovia.',
        detail: 'Aguarde até a van entrar no Terminal Benedito Bentes.',
        locationName: 'Trajeto Rodovia AL-101 / Benedito Bentes',
        estimatedMinutes: 20
      },
      {
        id: 'ot_3',
        stepNumber: 3,
        type: 'decision',
        title: 'Chegada no Terminal: Escolha seu próximo destino',
        instruction: 'Você desceu no Terminal Benedito Bentes. Para onde você vai agora?',
        detail: 'Escolha se vai para a UFAL estudar ou voltar para Casa descansar.',
        locationName: 'Terminal Integrado Benedito Bentes',
        estimatedMinutes: 5,
        decisionOptions: [
          {
            id: 'go_ufal',
            label: '🎓 Ir para a UFAL',
            targetTripId: 'terminal_ufal',
            icon: '🎓'
          },
          {
            id: 'go_casa',
            label: '🏠 Voltar para Casa (Clima Bom)',
            targetTripId: 'terminal_casa',
            icon: '🏠'
          },
          {
            id: 'go_patio',
            label: '🛍️ Ir ao Shopping Pátio',
            targetTripId: 'terminal_patio',
            icon: '🛍️'
          }
        ]
      }
    ]
  },
  {
    id: 'terminal_ufal',
    name: 'Terminal Benedito Bentes → UFAL',
    originId: 'terminal_bb',
    destinationId: 'ufal',
    originName: 'Terminal B. Bentes',
    destinationName: 'UFAL - Campus A.C. Simões',
    estimatedTotalMinutes: 35,
    routineHint: 'Tarde após as 14h • Aulas na universidade',
    steps: [
      {
        id: 'tu_1',
        stepNumber: 1,
        type: 'walk',
        title: 'Localizar Plataforma Linha 0901 ou 0903',
        instruction: 'Procure a baia dos ônibus com letreiro: "Eustáquio Gomes / Via UFAL".',
        detail: 'As duas linhas que atendem a UFAL a partir daqui são a 0901 e a 0903 da Real Transportes.',
        locationName: 'Terminal Benedito Bentes',
        busLine: '0901 ou 0903',
        busLineName: 'Eustáquio Gomes / T.I. Benedito Bentes (Via UFAL)',
        targetPlatform: 'Baia de Integração Oeste',
        warningNote: '🚨 ATENÇÃO: Olhe o letreiro luminoso do ônibus: precisa dizer "VIA UFAL". Não pegue se estiver apenas Eustáquio direto.',
        distanceMeters: 50,
        estimatedMinutes: 5
      },
      {
        id: 'tu_2',
        stepNumber: 2,
        type: 'bus',
        title: 'Embarcar no Ônibus (0901 ou 0903)',
        instruction: 'Passe na catraca de integração. Não pague novamente se usou a integração Vamu.',
        detail: 'Linha 0901 / 0903.',
        locationName: 'Terminal Benedito Bentes',
        estimatedMinutes: 5
      },
      {
        id: 'tu_3',
        stepNumber: 3,
        type: 'bus',
        title: 'Permanecer no Ônibus até a UFAL',
        instruction: 'Fique sentada tranquila. Não desça ainda.',
        detail: 'O ônibus vai passar pelo Hospital Metropolitano e seguir para o Campus A.C. Simões.',
        locationName: 'Trajeto Av. Menino Marcelo / BR-104',
        warningNote: 'Fique atenta quando avistar os portões grandes da UFAL à esquerda.',
        estimatedMinutes: 20
      },
      {
        id: 'tu_4',
        stepNumber: 4,
        type: 'arrive',
        title: 'Descer na Portaria Principal da UFAL',
        instruction: 'Puxe a cordinha e desça no ponto da entrada da UFAL.',
        detail: 'Você chegou à faculdade com segurança! ❤️',
        locationName: 'Campus A.C. Simões - Portaria',
        estimatedMinutes: 5
      }
    ]
  },
  {
    id: 'terminal_casa',
    name: 'Terminal Benedito Bentes → Casa (Clima Bom)',
    originId: 'terminal_bb',
    destinationId: 'casa',
    originName: 'Terminal B. Bentes',
    destinationName: 'Casa (Clima Bom)',
    estimatedTotalMinutes: 30,
    routineHint: 'Volta para Casa (Clima Bom) a partir do Terminal',
    steps: [
      {
        id: 'tc_1',
        stepNumber: 1,
        type: 'walk',
        title: 'Procurar linha sentido Clima Bom',
        instruction: 'Procure a plataforma de ônibus que vão em direção ao Clima Bom / Feirinha.',
        detail: 'Se preferir pedir Uber para evitar trocas, use o botão Uber seguro abaixo!',
        locationName: 'Terminal Benedito Bentes',
        estimatedMinutes: 5
      },
      {
        id: 'tc_2',
        stepNumber: 2,
        type: 'bus',
        title: 'Embarcar sentido Clima Bom',
        instruction: 'Confirme com o motorista antes de passar a catraca: "Passa perto da Rua Quinze?".',
        detail: 'Descer na parada de referência do Clima Bom.',
        locationName: 'Terminal Benedito Bentes',
        estimatedMinutes: 20
      },
      {
        id: 'tc_3',
        stepNumber: 3,
        type: 'arrive',
        title: 'Chegada em Casa (Clima Bom)',
        instruction: 'Você chegou em Casa (Clima Bom)! Rua Quinze, 101. Bom descanso ❤️',
        detail: 'Viagem finalizada com sucesso.',
        locationName: 'Rua Quinze, 101, Clima Bom',
        estimatedMinutes: 5
      }
    ]
  },
  {
    id: 'ufal_paripueira',
    name: 'UFAL → Paripueira (Sexta 22h)',
    originId: 'ufal',
    destinationId: 'paripueira',
    originName: 'UFAL',
    destinationName: 'Paripueira (R. do Angelim, 650)',
    estimatedTotalMinutes: 55,
    routineHint: 'Sexta-feira • Noite por volta das 22:00',
    steps: [
      {
        id: 'up_1',
        stepNumber: 1,
        type: 'walk',
        title: 'Ir para o ponto de saída do ônibus da UFAL',
        instruction: 'Caminhe até o ponto de parada do ônibus universitário/intermunicipal para Paripueira.',
        detail: 'Saída prevista em torno das 22:00.',
        locationName: 'Ponto UFAL',
        distanceMeters: 150,
        estimatedMinutes: 10
      },
      {
        id: 'up_2',
        stepNumber: 2,
        type: 'bus',
        title: 'Embarcar no ônibus de Paripueira',
        instruction: 'Entre no ônibus e mande uma mensagem rápida pro Welbert se quiser avisar que entrou.',
        detail: 'Viagem tranquila rumo ao litoral norte.',
        locationName: 'Ponto UFAL',
        estimatedMinutes: 40
      },
      {
        id: 'up_3',
        stepNumber: 3,
        type: 'arrive',
        title: 'Chegada em Paripueira',
        instruction: 'Você chegou em Paripueira (R. do Angelim, 650)! Bom fim de semana ❤️',
        detail: 'R. do Angelim, 650 - Paripueira.',
        locationName: 'R. do Angelim, 650, Paripueira',
        estimatedMinutes: 5
      }
    ]
  },
  {
    id: 'paripueira_casa',
    name: 'Paripueira → Maceió Shopping → Casa (R. Quinze, 101) (Domingo)',
    originId: 'paripueira',
    destinationId: 'casa',
    originName: 'Paripueira (R. do Angelim, 650)',
    destinationName: 'Casa (Rua Quinze, 101)',
    estimatedTotalMinutes: 90,
    routineHint: 'Domingo • Retorno de Paripueira via Maceió Shopping até a Rua Quinze',
    steps: [
      {
        id: 'pc_1',
        stepNumber: 1,
        type: 'walk',
        title: 'Sair da R. do Angelim até o ponto em Paripueira',
        instruction: 'Saia da R. do Angelim, 650 com calma e caminhe até o ponto do transporte intermunicipal na avenida principal de Paripueira.',
        detail: 'Rua do Angelim sentido avenida/centro de Paripueira.',
        locationName: 'Ponto Paripueira (R. do Angelim / Centro)',
        distanceMeters: 200,
        estimatedMinutes: 5
      },
      {
        id: 'pc_2',
        stepNumber: 2,
        type: 'bus',
        title: 'Embarcar no Intermunicipal até o Maceió Shopping',
        instruction: 'Embarque no ônibus ou van intermunicipal sentido Maceió (via Litoral Norte). Ao subir, confirme com o cobrador/motorista: "Desço no Maceió Shopping".',
        detail: 'O ônibus desce pela rodovia AL-101 Norte passando por Ipioca, Guaxuma, Jacarecica e Cruz das Almas até chegar à Av. Comendador Gustavo Paiva.',
        warningNote: 'Fique atenta quando avistar o Parque Shopping / Cruz das Almas. Logo em seguida, o ônibus entra na Mangabeiras e para em frente ao Maceió Shopping.',
        locationName: 'Trajeto AL-101 Norte ➔ Maceió Shopping',
        estimatedMinutes: 45
      },
      {
        id: 'pc_3',
        stepNumber: 3,
        type: 'walk',
        title: 'Descer na parada do Maceió Shopping',
        instruction: 'Puxe a cordinha ou avise ao motorista para descer no ponto em frente ao Maceió Shopping (Av. Comendador Gustavo Paiva). Você já está em Maceió! Respire fundo ❤️',
        detail: 'Parada de ônibus em frente ao Maceió Shopping (Mangabeiras).',
        locationName: 'Maceió Shopping - Av. Comendador Gustavo Paiva',
        distanceMeters: 50,
        estimatedMinutes: 5
      },
      {
        id: 'pc_4',
        stepNumber: 4,
        type: 'bus',
        title: 'Localizar e Embarcar no Ônibus sentido Clima Bom',
        instruction: 'No ponto do shopping na Av. Comendador Gustavo Paiva, aguarde o ônibus sentido Clima Bom (ex: Linha 0716 - Clima Bom / Ponta Verde via Mangabeiras / Shopping, ou linha urbana com letreiro "Clima Bom"). Ao subir, confirme: "Passa perto da Rua Quinze?".',
        detail: 'Linha 0716 ou ônibus urbano sentido Clima Bom (sobe para a parte alta de Maceió).',
        busLine: '0716 ou Linha Clima Bom',
        busLineName: 'Clima Bom / Ponta Verde (Via Shopping / Mangabeiras)',
        targetPlatform: 'Ponto Av. Comendador Gustavo Paiva (em frente ao shopping)',
        warningNote: '🚨 ATENÇÃO: Olhe o letreiro luminoso do ônibus: precisa dizer sentido "CLIMA BOM". Se preferir conforto ou já estiver cansada/noite, use o botão de Uber seguro abaixo.',
        locationName: 'Ponto do Maceió Shopping',
        estimatedMinutes: 10
      },
      {
        id: 'pc_5',
        stepNumber: 5,
        type: 'bus',
        title: 'Permanecer no Ônibus até o Clima Bom',
        instruction: 'Fique sentada tranquila. O ônibus vai subir para a parte alta da cidade e entrar no bairro do Clima Bom. Quando começar a passar pelos comércios e pela avenida principal do bairro, prepare-se para o seu ponto.',
        detail: 'Avenida principal do Clima Bom, trecho de acesso à Rua Quinze.',
        warningNote: 'Pode mandar uma mensagem ou avisar o Welbert pelo WhatsApp de que já está no Clima Bom.',
        locationName: 'Trajeto Mangabeiras ➔ Clima Bom',
        estimatedMinutes: 25
      },
      {
        id: 'pc_6',
        stepNumber: 6,
        type: 'walk',
        title: 'Descer no Ponto e Caminhar até a Rua Quinze, 101',
        instruction: 'Puxe a cordinha e desça no ponto mais próximo da Rua Quinze. Caminhe devagar e atenta até o número 101 da Rua Quinze. Qualquer dúvida, ligue direto pro Welbert!',
        detail: 'Rua Quinze, 101 - Clima Bom, Maceió - AL, 57063-505.',
        distanceMeters: 150,
        locationName: 'Rua Quinze, 101, Clima Bom',
        estimatedMinutes: 5
      },
      {
        id: 'pc_7',
        stepNumber: 7,
        type: 'arrive',
        title: 'Chegada em Casa (Rua Quinze, 101)! ❤️',
        instruction: 'Você chegou em Casa (Clima Bom)! Parabéns por fazer o trajeto com calma e atenção. Tome um banho gostoso e descanse bastante para a semana. O Welbert te ama! ❤️🏠',
        detail: 'R. Quinze, 101 - Clima Bom, Maceió - AL, 57063-505.',
        locationName: 'Casa (Clima Bom) - R. Quinze, 101',
        estimatedMinutes: 2
      }
    ]
  },
  {
    id: 'maceio_shopping_casa',
    name: 'Maceió Shopping → Casa (Rua Quinze, 101)',
    originId: 'maceio_shopping',
    destinationId: 'casa',
    originName: 'Maceió Shopping',
    destinationName: 'Casa (Rua Quinze, 101)',
    estimatedTotalMinutes: 45,
    routineHint: 'Retorno do shopping para Casa (Clima Bom) via Ônibus 0716 ou Uber',
    steps: [
      {
        id: 'msc_1',
        stepNumber: 1,
        type: 'walk',
        title: 'Dirigir-se ao ponto do Maceió Shopping',
        instruction: 'Vá até o ponto de parada de ônibus na Av. Comendador Gustavo Paiva (em frente à entrada principal do Maceió Shopping).',
        detail: 'Ponto na calçada do Maceió Shopping sentido Centro / Tabuleiro / Parte Alta.',
        locationName: 'Maceió Shopping - Av. Gustavo Paiva',
        distanceMeters: 80,
        estimatedMinutes: 5
      },
      {
        id: 'msc_2',
        stepNumber: 2,
        type: 'bus',
        title: 'Embarcar no Ônibus sentido Clima Bom',
        instruction: 'Aguarde o ônibus com destino ao Clima Bom (ex: Linha 0716 - Clima Bom / Ponta Verde via Shopping ou linha com letreiro "Clima Bom").',
        detail: 'Confirme com o motorista antes de subir: "Passa perto da Rua Quinze?".',
        busLine: '0716 ou Linha Clima Bom',
        busLineName: 'Clima Bom / Ponta Verde (Via Shopping)',
        warningNote: 'Verifique se o letreiro marca sentido "CLIMA BOM". Se a espera estiver longa, use o botão de Uber seguro.',
        locationName: 'Ponto do Maceió Shopping',
        estimatedMinutes: 10
      },
      {
        id: 'msc_3',
        stepNumber: 3,
        type: 'bus',
        title: 'Permanecer no Ônibus até o Clima Bom',
        instruction: 'Relaxe na viagem enquanto o ônibus sobe a ladeira para a parte alta e entra no Clima Bom.',
        detail: 'Av. Menino Marcelo / Via principal do Clima Bom.',
        locationName: 'Trajeto Mangabeiras ➔ Clima Bom',
        estimatedMinutes: 25
      },
      {
        id: 'msc_4',
        stepNumber: 4,
        type: 'walk',
        title: 'Descer e caminhar até a Rua Quinze, 101',
        instruction: 'Puxe a cordinha e desça no ponto mais próximo da Rua Quinze. Caminhe até o número 101.',
        detail: 'Rua Quinze, 101 - Clima Bom.',
        distanceMeters: 150,
        locationName: 'Rua Quinze, 101, Clima Bom',
        estimatedMinutes: 5
      },
      {
        id: 'msc_5',
        stepNumber: 5,
        type: 'arrive',
        title: 'Chegada em Casa (Rua Quinze, 101)! ❤️',
        instruction: 'Você chegou bem em casa! Bom descanso! ❤️',
        detail: 'R. Quinze, 101 - Clima Bom, Maceió - AL, 57063-505.',
        locationName: 'Casa (Clima Bom)',
        estimatedMinutes: 2
      }
    ]
  }
];

export const MACEIO_TRANSIT_INFO = {
  activeAgency: 'DMTT (Superintendência Municipal de Transportes e Trânsito de Maceió)',
  ticketing: 'Cartão Vamu Mobilidade (Integração Temporal de até 90 min nas linhas urbanas)',
  mainHubs: [
    'Terminal Integrado Benedito Bentes (Parte Alta)',
    'Terminal Eustáquio Gomes',
    'Campus UFAL A.C. Simões (Circular interno 4000)',
    'Terminal Colina dos Eucaliptos',
    'Maceió Shopping / Mangabeiras (Conexão Litoral Norte ↔ Parte Alta)'
  ],
  verifiedLines: [
    {
      code: '0716',
      name: 'Clima Bom / Ponta Verde (Via Maceió Shopping / Mangabeiras)',
      operator: 'Cidade de Maceió / DMTT',
      frequencyMinutes: '~30-40 min',
      notes: 'Ligação direta entre Maceió Shopping (Mangabeiras) e o bairro Clima Bom'
    },
    {
      code: '0901',
      name: 'Eustáquio Gomes / T.I. Benedito Bentes (Via UFAL / Hosp. Metropolitano)',
      operator: 'Real Transportes Urbanos',
      frequencyMinutes: '~55 min',
      notes: 'Conexão direta recomendada Terminal B. Bentes ↔ UFAL'
    },
    {
      code: '0903',
      name: 'Eustáquio Gomes / T.I. Benedito Bentes (Via UFAL)',
      operator: 'Real Transportes Urbanos',
      frequencyMinutes: '~75 min',
      notes: 'Alternativa direta Terminal B. Bentes ↔ UFAL'
    },
    {
      code: '4000',
      name: 'Circular UFAL (Interno Campus A.C. Simões)',
      operator: 'DMTT / Frota Circular',
      frequencyMinutes: '15-20 min',
      notes: 'Sem cobrança de tarifa, circula dentro dos centros e institutos da UFAL'
    }
  ]
};
