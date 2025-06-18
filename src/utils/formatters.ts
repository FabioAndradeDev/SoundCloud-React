/**
 * Formata segundos em uma string de tempo (min:seg).
 * @param seconds - A duração em segundos.
 * @returns A string formatada.
 */
export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Formata uma string de data para o padrão local (dd/mm/aaaa).
 * @param dateString - A data em formato de string.
 * @returns A data formatada.
 */
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR');
}; 