import { PRESET_TRIPS } from '../data/mockData';
import { PresetTrip } from '../types';

export interface RoutineSuggestion {
  trip: PresetTrip;
  title: string;
  subtitle: string;
  reason: string;
  timeContext: string;
}

/**
 * Predicts the most likely intended trip based on current time & weekday in Maceió (UTC-3)
 */
export function getSmartRoutineSuggestion(now: Date = new Date()): RoutineSuggestion | null {
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 5 = Friday, 6 = Saturday
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const timeVal = hour + minutes / 60;

  // Monday to Friday morning (06:00 - 08:30): Going to Orizon
  if (day >= 1 && day <= 5 && timeVal >= 6.0 && timeVal < 9.0) {
    const trip = PRESET_TRIPS.find(t => t.id === 'casa_orizon') || PRESET_TRIPS[0];
    return {
      trip,
      title: 'Bom dia, meu amor ❤️',
      subtitle: 'Hora de ir para o estágio na Orizon',
      reason: 'Seu estágio começa às 08:00.',
      timeContext: 'Segunda a Sexta • Manhã'
    };
  }

  // Monday to Friday afternoon (13:30 - 15:30): Leaving Orizon
  if (day >= 1 && day <= 5 && timeVal >= 13.5 && timeVal < 15.5) {
    const trip = PRESET_TRIPS.find(t => t.id === 'orizon_terminal') || PRESET_TRIPS[1];
    return {
      trip,
      title: 'Hora de voltar! 🚐',
      subtitle: 'A van costuma sair às 14:00 para o Terminal Benedito Bentes',
      reason: 'No Terminal você poderá decidir se vai para a UFAL ou direto para Casa.',
      timeContext: 'Segunda a Sexta • 14h'
    };
  }

  // Friday night (20:30 - 23:59): Leaving UFAL to Paripueira
  if (day === 5 && timeVal >= 20.5 && timeVal <= 23.99) {
    const trip = PRESET_TRIPS.find(t => t.id === 'ufal_paripueira') || PRESET_TRIPS[4];
    return {
      trip,
      title: 'Sexta-feira à noite! 🌴',
      subtitle: 'Ônibus da UFAL para Paripueira (~22h)',
      reason: 'Hora de ir curtir o fim de semana descansando em Paripueira.',
      timeContext: 'Sexta • ~22h'
    };
  }

  // Sunday afternoon/evening (14:00 - 22:30): Returning to Maceió
  if (day === 0 && timeVal >= 14.0 && timeVal < 23.0) {
    const trip = PRESET_TRIPS.find(t => t.id === 'paripueira_casa') || PRESET_TRIPS[5];
    return {
      trip,
      title: 'Volta para Maceió 🏠',
      subtitle: 'Retorno de Paripueira para Casa (Clima Bom)',
      reason: 'Preparando a semana com calma.',
      timeContext: 'Domingo • Tarde/Noite'
    };
  }

  // Default fallback: Terminal to UFAL or Terminal to Casa during day
  if (day >= 1 && day <= 5 && timeVal >= 14.5 && timeVal < 18.0) {
    const trip = PRESET_TRIPS.find(t => t.id === 'terminal_ufal') || PRESET_TRIPS[2];
    return {
      trip,
      title: 'Ir para a UFAL 🎓',
      subtitle: 'Terminal Benedito Bentes → Campus A.C. Simões',
      reason: 'Linha 0901 ou 0903 no Terminal.',
      timeContext: 'Tarde de Estudos'
    };
  }

  return null;
}
