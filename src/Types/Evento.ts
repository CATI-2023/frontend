export type Evento = {
  evento_id: number;
  ano: number;
  tema: string;
  data_inicio: string;
  data_fim: string;
  qtde_vagas: number;
  banner_base64: string;
  valor: number;
  vigente: boolean;
}