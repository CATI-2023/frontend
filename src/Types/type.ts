export type palestras = {
  tema: string;
  descricao: string;
  data: string;
  evento_id_reference: number;
};

export type participantes = {
  id?: number;
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
export type apoiadores = {
  nome: string;
};
export type evento = {
  ano: number;
  tema: string;
  data_Inicio: string;
  data_Fim: string;
  qtde_vagas: number;
  banner_url: string;
};
export type mini_curso = {
  titulo: string;
  valor: number;
  descricao: string;
  qtde_vagas: number;
  data: string;
  evento_id_reference: number;
  ministrante_participante_id_reference: number;
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
  evento_id_reference: number;
  participante_id_reference: number;
  observacoes: string;
  pagamento_id_reference: number;
};
export type inscricaoEventoGet = {
  observacoes: string;
  evento: {
    evento_id: number;
    ano: number;
    tema: string;
    data_inicio: string;
    data_fim: string;
    qtde_vagas: number;
    banner_base64: string;
    valor: number;
  };
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
  participante_id: number
  nome: string
  foto: string
  cpf: string
  telefone: string
  organizacao: boolean
  email: string
  excluido?: string
  InscricaoEvento: InscricaoEvento[]
}

export type InscricaoEvento = {
  inscricao_evento_id: number
  observacoes: string
  evento_id_reference: number
  participante_id_reference: number
  pagamento_id_reference: number
  criado_em: string
  alterado_em: string
  excluido?: string
  pagamento: Pagamento
}

export type Pagamento = {
  pagamento_id: number
  status: "APROVADO" | "PENDENTE" | "RECUSADO"
  comprovante_base64: string
  criado_em: string
  alterado_em: string
  excluido?: string 
}
