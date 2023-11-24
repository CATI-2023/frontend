export type palestras = {
  tema: string;
  descricao: string;
  data: string;
  evento_id_reference: number;
};

export type participantesList = { participantes: participante[] };

export type participante = {
  participante_id?: number;
  nome: string;
  foto?: string;
  cpf?: string;
  telefone?: string;
  email?: string;
  senha?: string;
  organizacao?: boolean;
};

export type frequencia = {
  frequencia_id?: number;
  inscricao_evento_id_reference?: number;
  inscricao_evento?: inscricaoEventoGet;
  data?: string;
};

export type patrocinadores = {
  patrocinador_id?: number;
  evento_id_reference?: number;
  razao_social: string;
  nivel: "OURO" | "PRATA" | "BRONZE";
  banner_base64: string;
  email: string;
  telefone: string;
  evento?: evento;
};
export type apoiadores = { patrocinadores: patrocinadores[] };

export type colaboradoresIndex = {
  razao_social: string;
  nivel: "OURO" | "PRATA" | "BRONZE";
  banner_base64: string;
};

export type evento = {
  ano?: number;
  tema?: string;
  data_inicio: string;
  data_fim: string;
  qtde_vagas?: number;
  banner_base64?: string;
  valor?: number;
  evento_id?: number;
  vigente?: boolean;
};

export type eventos = { eventos: evento[] };

export type miniCursos = {
  minicursos: minicurso[];
};

export type minicurso = {
  titulo: string;
  valor: number;
  descricao: string;
  qtde_vagas: number;
  data: string;
  evento_id_reference?: number;
  ministrante_participante_id_reference?: number;
  ministrante?: participante;
  evento?: evento;
  minicurso_id?: number;
};

export type ministrante = {
  nome?: string;
  participante_id?: number;
};

export type noticia = {
  texto: string;
  titutlo: string;
  subtitulo: string;
  chapeu: string;
  autor: string;
  data_publicacao: string;
  suspensa: boolean;
  evento_id_reference: number;
};
export type inscricaoEvento = {
  evento_id_reference?: number;
  participante_id_reference?: number;
  observacoes?: string;
  pagamento_id_reference?: number;
};

export type inscricaoEventoGet = {
  inscricao_evento_id?: number;
  observacoes?: string;
  evento_id_reference?: number;
  evento?: evento;
  participante_id_reference?: number;
  participante?: participante;
  pagamento_id_reference?: number;
  pagamento?: {
    pagamento_id?: number;
    status?: "APROVADO" | "PENDENTE" | "RECUSADO";
    comprovante_base64?: string;
  };
};

export type pagamentos = {
  status: "APROVADO" | "PENDENTE" | "RECUSADO";
  comprovante_base64: string;
};

export type ParticipanteAuth = {
  participante_id: number;
  nome: string;
  foto: string;
  cpf: string;
  telefone: string;
  organizacao: boolean;
  email: string;
  excluido?: string;
  InscricaoEvento: InscricaoEvento[];
};

export type InscricaoEvento = {
  inscricao_evento_id: number;
  observacoes: string;
  evento_id_reference: number;
  participante_id_reference: number;
  pagamento_id_reference: number;
  criado_em: string;
  alterado_em: string;
  excluido?: string;
  pagamento: Pagamento;
  evento: evento;
};

export type Pagamento = {
  pagamento_id: number;
  status: "APROVADO" | "PENDENTE" | "RECUSADO";
  comprovante_base64: string;
  criado_em: string;
  alterado_em: string;
  excluido?: string;
};
