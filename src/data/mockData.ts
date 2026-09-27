import { KnownPlace, PresetTrip } from '../types';

export const KNOWN_PLACES: KnownPlace[] = [
  {
    id: 'casa',
    name: 'Casa (Clima Bom)',
    shortName: 'Casa',
    category: 'home',
    address: 'Rua Quinze, 101',
    neighborhood: 'Clima Bom, Maceió - AL',
    latitude: -9.5772,
    longitude: -35.7725,
    notes: 'Ponto de referência: Próximo à rua principal do Clima Bom.',
    icon: '🏠'
  },
  {
    id: 'orizon',
    name: 'Orizon / Ecoparque Maceió',
    shortName: 'Orizon (Ecoparque)',
    category: 'work',
    address: 'Ecoparque Maceió - Estrada AL-105 / Rua Em Projeto 7257, s/n',
    neighborhood: 'Benedito Bentes, Maceió - AL, CEP 57084-415',
    latitude: -9.5583,
    longitude: -35.6880,
    notes: 'Local do estágio no Ecoparque Maceió (CTR Benedito Bentes). Início às 08:00. Saída da van às 14:00 para o Terminal.',
    icon: '🏢'
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
    address: 'Centro de Paripueira',
    neighborhood: 'Litoral Norte, AL',
    latitude: -9.4678,
    longitude: -35.5539,
    notes: 'Ônibus sai da UFAL na sexta-feira às 22:00.',
    icon: '🌴'
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
    name: 'Casa → Orizon (Estágio)',
    originId: 'casa',
    destinationId: 'orizon',
    originName: 'Casa (Clima Bom)',
    destinationName: 'Orizon / Ecoparque',
    estimatedTotalMinutes: 45,
    routineHint: 'Segunda a Sexta • Manhã cedo (06:30 - 07:30)',
    steps: [
      {
        id: 'co_1',
        stepNumber: 1,
        type: 'walk',
        title: 'Sair de Casa',
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
            label: '🏠 Voltar para Casa',
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
    name: 'Terminal Benedito Bentes → Casa',
    originId: 'terminal_bb',
    destinationId: 'casa',
    originName: 'Terminal B. Bentes',
    destinationName: 'Casa (Clima Bom)',
    estimatedTotalMinutes: 30,
    routineHint: 'Volta para casa a partir do Terminal',
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
        title: 'Chegada em Casa',
        instruction: 'Você chegou em casa! Rua Quinze, 101. Bom descanso ❤️',
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
    destinationName: 'Paripueira',
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
        instruction: 'Você chegou em Paripueira! Bom fim de semana ❤️',
        detail: 'Desembarque no ponto central seguro.',
        locationName: 'Centro de Paripueira',
        estimatedMinutes: 5
      }
    ]
  },
  {
    id: 'paripueira_casa',
    name: 'Paripueira → Casa (Domingo)',
    originId: 'paripueira',
    destinationId: 'casa',
    originName: 'Paripueira',
    destinationName: 'Casa (Clima Bom)',
    estimatedTotalMinutes: 60,
    routineHint: 'Domingo • Tarde / Noite retorno a Maceió',
    steps: [
      {
        id: 'pc_1',
        stepNumber: 1,
        type: 'walk',
        title: 'Dirigir-se ao ponto de Paripueira',
        instruction: 'Vá até o ponto de ônibus intermunicipal com destino a Maceió.',
        detail: 'Aguarde o ônibus sentido Centro / Rodoviária / Maceió.',
        locationName: 'Ponto Central de Paripueira',
        estimatedMinutes: 10
      },
      {
        id: 'pc_2',
        stepNumber: 2,
        type: 'bus',
        title: 'Embarque sentido Maceió',
        instruction: 'Embarque no ônibus. Se for pegar Uber a partir de Maceió, use o botão direto para a Rua Quinze.',
        detail: 'Trajeto pela AL-101 Norte até a entrada de Maceió.',
        locationName: 'Ônibus Intermunicipal',
        estimatedMinutes: 45
      },
      {
        id: 'pc_3',
        stepNumber: 3,
        type: 'arrive',
        title: 'Chegada em Casa',
        instruction: 'Bem-vinda de volta para casa! ❤️',
        detail: 'Rua Quinze, 101, Clima Bom.',
        locationName: 'Casa',
        estimatedMinutes: 5
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
    'Terminal Colina dos Eucaliptos'
  ],
  verifiedLines: [
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
