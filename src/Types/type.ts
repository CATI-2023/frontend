import { Evento } from "./Evento";

export type palestras = {
  tema: string;
  descricao: string;
  data: string;
  evento_id_reference: number;
};

export type participantes = {
  participantes: participante[];
};


export type participante = {
  participante_id?: number;
  nome?: string;
  foto?: string;
  cpf?: string;
  telefone?: string;
  email?: string;
  senha?: string;
  organizacao?: boolean;
};
export type presenca = {
  participante_id_reference: number;
};
export type patrocinadores = {
  patrocinador_id?: number;
  evento_id_reference?: number;
  razao_social: string;
  nivel: "OURO" | "PRATA" | "BRONZE";
  banner_base64: string;
  email: string;
  telefone: string;
};
export type apoiadores = { patrocinadores: patrocinadores[] };

export type evento = {
  ano: number;
  tema: string;
  data_Inicio: string;
  data_Fim: string;
  qtde_vagas: number;
  banner_url: string;
  evento_id?: number;
};
export type eventos = {eventos: evento[]}

export type miniCursos = {
  minicursos: mini_curso[];
};

export type mini_curso = {
  titulo: string;
  valor: number ;
  descricao: string;
  qtde_vagas: number;
  data: string ;
  evento_id_reference?: number;
  ministrante_participante_id_reference?: number;
  ministrante? : ministrante;
  minicurso_id?: number;
};

export type ministrante = {
  nome?: string,
  participante_id?: number
}

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
  evento_id_reference: number;
  participante_id_reference: number;
  observacoes: string;
  pagamento_id_reference: number;
};
export type inscricaoEventoGet = {
  observacoes: string;
  evento: Evento;
  participante: {
    participante_id: number;
    nome: string;
    cpf: string;
    telefone: string;
    email: string;
    organizacao: boolean;
  };
  pagamento: {
    pagamento_id: number;
    status: "APROVADO" | "PENDENTE" | "RECUSADO";
    comprovante_base64: string;
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
  evento: Evento;
};

export type Pagamento = {
  pagamento_id: number;
  status: "APROVADO" | "PENDENTE" | "RECUSADO";
  comprovante_base64: string;
  criado_em: string;
  alterado_em: string;
  excluido?: string;
};

